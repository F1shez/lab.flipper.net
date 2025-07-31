(function() {
  "use strict";
  function MessageStream() {
    return new ReadableStream({
      start(controller) {
        self.addEventListener("message", (ev) => controller.enqueue(ev.data));
      }
    });
  }
  function message(worker, id) {
    return new Promise((resolve) => {
      worker.addEventListener("message", function f({ data }) {
        if (data.id !== id) {
          return;
        }
        worker.removeEventListener("message", f);
        resolve(data);
      });
    });
  }
  function clamp(min, v, max) {
    if (v < min) {
      return min;
    }
    if (v > max) {
      return max;
    }
    return v;
  }
  function linearBrightnessN0F8(r, g, b) {
    return 0.21 * r + 0.72 * g + 0.07 * b;
  }
  function srgbBrightnessN0F8(r, g, b) {
    return linearBrightnessN0F8(
      srgbToLinear(r),
      srgbToLinear(g),
      srgbToLinear(b)
    );
  }
  function srgbBrightnessU8(r, g, b) {
    return srgbBrightnessN0F8(r / 255, g / 255, b / 255);
  }
  class Image {
    constructor(data, width, height) {
      this.data = data;
      this.width = width;
      this.height = height;
    }
    static empty(width, height) {
      const buffer = new this.BUFFER_TYPE(width * height * this.NUM_CHANNELS);
      buffer.fill(0);
      return new this(buffer, width, height);
    }
    pixelIndex(x, y) {
      return y * this.width + x;
    }
    pixelForIndex(i) {
      return {
        x: i % this.width,
        y: Math.floor(i / this.width)
      };
    }
    pixel(nth) {
      return new this.data.constructor(
        this.data.buffer,
        this.data.byteOffset + nth * this.constructor.NUM_CHANNELS * this.data.BYTES_PER_ELEMENT,
        this.constructor.NUM_CHANNELS
      );
    }
    wrapCoordinates({ x, y }) {
      x = x % this.width;
      if (x < 0) x += this.width;
      y = y % this.height;
      if (y < 0) y += this.height;
      return { x, y };
    }
    /**
     * @param {number} x
     * @param {number} y
     * @returns {Float32Array}
     */
    pixelAt(x, y, { wrap = false } = {}) {
      if (wrap) {
        ({ x, y } = this.wrapCoordinates({ x, y }));
      } else {
        x = clamp(0, x, this.width - 1);
        y = clamp(0, y, this.height - 1);
      }
      const nth = this.pixelIndex(x, y);
      return this.pixel(nth);
    }
    valueAt({ x, y, channel = 0 }, { wrap = false } = {}) {
      if (wrap) {
        ({ x, y } = this.wrapCoordinates({ x, y }));
      }
      return this.data[this.pixelIndex(x, y) * this.constructor.NUM_CHANNELS + channel];
    }
    setValueAt({ x, y, channel = 0 }, v, { wrap = false } = {}) {
      if (wrap) {
        ({ x, y } = this.wrapCoordinates({ x, y }));
      }
      this.data[this.pixelIndex(x, y) * this.constructor.NUM_CHANNELS + channel] = v;
    }
    copy() {
      return new this.constructor(this.data.slice(), this.width, this.height);
    }
    mapSelf(f) {
      this.data.forEach(
        (v, i, arr) => arr[i] = f(v, { ...this.pixelForIndex(i), i })
      );
      return this;
    }
    isInBounds(x, y) {
      if (x < 0 || y < 0) {
        return false;
      }
      if (x >= this.width || y >= this.height) {
        return false;
      }
      return true;
    }
    randomPixel() {
      const i = Math.floor(Math.random() * this.width * this.height);
      return this.pixel(i);
    }
    toSrgbSelf() {
      for (const { pixel } of this.allPixels()) {
        pixel.set(pixel.map(linearToSrgb));
      }
      return this;
    }
    toLinearSelf() {
      for (const { pixel } of this.allPixels()) {
        pixel.set(pixel.map(srgbToLinear));
      }
      return this;
    }
    *allCoordinates() {
      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          yield { x, y };
        }
      }
    }
    /**
     * @returns {Iterable<{x: number, y: number, i: number, pixel: Float32Array}>}
     */
    *allPixels() {
      let i = 0;
      for (const { x, y } of this.allCoordinates()) {
        yield { x, y, i, pixel: this.pixelAt(x, y) };
        i++;
      }
    }
    convolve(other) {
      console.assert(
        other.width % 2 === 1 && other.height % 2 === 1,
        "Convolution matrix must have odd size"
      );
      const result = this.copy();
      const offsetX = Math.floor(other.width / 2);
      const offsetY = Math.floor(other.height / 2);
      for (const p of this.allCoordinates()) {
        let sum = 0;
        for (const q of other.allCoordinates()) {
          const x = p.x + q.x - offsetX;
          const y = p.y + q.y - offsetY;
          sum += this.valueAt({ x, y }, { wrap: true }) * other.valueAt(q);
        }
        result.setValueAt(p, sum);
      }
      return result;
    }
    max() {
      let max;
      for (const i of this.allPixels()) {
        if (!max || max.pixel[0] < i.pixel[0]) {
          max = i;
        }
      }
      return max;
    }
    min() {
      let min;
      for (const i of this.allPixels()) {
        if (!min || min.pixel[0] > i.pixel[0]) {
          min = i;
        }
      }
      return min;
    }
    toComplex() {
      const result = ImageComplexF64.empty(this.width, this.height);
      for (const p of result.allCoordinates()) {
        result.setValueAt(p, { re: this.valueAt(p), im: 0 });
      }
      return result;
    }
  }
  function nextOdd(n) {
    if (n % 2 === 0) {
      return n + 1;
    }
    return n;
  }
  class RGBAImageU8 extends Image {
    static get BUFFER_TYPE() {
      return Uint8ClampedArray;
    }
    static get NUM_CHANNELS() {
      return 4;
    }
    static fromImageData(imgData) {
      return new RGBAImageU8(
        new Uint8ClampedArray(imgData.data),
        imgData.width,
        imgData.height
      );
    }
    toImageData() {
      return new ImageData(this.data.slice(), this.width, this.height);
    }
  }
  const gaussCache = /* @__PURE__ */ new Map();
  const fftGaussCache = /* @__PURE__ */ new Map();
  class GrayImageF32N0F8 extends Image {
    static get BUFFER_TYPE() {
      return Float32Array;
    }
    static get NUM_CHANNELS() {
      return 1;
    }
    static gaussianKernel(stdDev, {
      width = nextOdd(Math.ceil(6 * stdDev)),
      height = nextOdd(Math.ceil(6 * stdDev))
    } = {}) {
      const key = `${stdDev}:${width}:${height}`;
      if (gaussCache.has(key)) {
        return gaussCache.get(key).copy();
      }
      const img = GrayImageF32N0F8.empty(width, height);
      const factor = 1 / (2 * Math.PI * stdDev ** 2);
      for (const { x, y, pixel } of img.allPixels()) {
        pixel[0] = factor * Math.exp(
          -((x - Math.floor(width / 2)) ** 2 + (y - Math.floor(width / 2)) ** 2) / (2 * stdDev ** 2)
        );
      }
      gaussCache.set(key, img.copy());
      return img;
    }
    static fromImageData(sourceImage) {
      sourceImage = RGBAImageU8.fromImageData(sourceImage);
      const img = new GrayImageF32N0F8(
        new Float32Array(sourceImage.width * sourceImage.height),
        sourceImage.width,
        sourceImage.height
      );
      for (let i = 0; i < sourceImage.width * sourceImage.height; i++) {
        img.data[i] = srgbBrightnessU8(...sourceImage.pixel(i));
      }
      return img;
    }
    normalizeSelf() {
      const sum = this.data.reduce((sum2, v) => sum2 + v, 0);
      this.mapSelf((v) => v / sum);
      return this;
    }
    toImageData() {
      const data = new Uint8ClampedArray(this.data.length * 4);
      for (let i = 0; i < this.data.length; i++) {
        data[i * 4 + 0] = linearToSrgb(this.data[i]) * 255;
        data[i * 4 + 1] = linearToSrgb(this.data[i]) * 255;
        data[i * 4 + 2] = linearToSrgb(this.data[i]) * 255;
        data[i * 4 + 3] = 255;
      }
      return new ImageData(data, this.width, this.height);
    }
    gaussianBlur(stdDev, { kernelWidth, kernelHeight } = {}) {
      const kernel = GrayImageF32N0F8.gaussianKernel(stdDev, {
        width: kernelWidth,
        height: kernelHeight
      });
      return this.convolve(kernel);
    }
    fftGaussianBlur(stdDev, { kernelWidth, kernelHeight } = {}) {
      kernelWidth = this.width;
      kernelHeight = this.height;
      const key = `${stdDev}:${kernelWidth}:${kernelHeight}`;
      if (!fftGaussCache.has(key)) {
        const kernel = GrayImageF32N0F8.gaussianKernel(stdDev, {
          width: kernelWidth,
          height: kernelHeight
        }).toComplex().fftSelf().centerSelf();
        fftGaussCache.set(key, kernel);
      }
      return this.toComplex().fftSelf().centerSelf().multiplySelf(fftGaussCache.get(key)).centerSelf().ifftSelf().centerSelf().abs();
    }
    clampSelf({ min = 0, max = 1 } = {}) {
      return this.mapSelf((v) => clamp(min, v, max));
    }
  }
  const gamma = 2.4;
  function srgbToLinear(v) {
    if (v <= 0.04045) {
      return v / 12.95;
    }
    return Math.pow((v + 0.055) / 1.055, gamma);
  }
  function linearToSrgb(v) {
    if (v <= 31308e-7) {
      return 12.95 * v;
    }
    return 1.055 * Math.pow(v, 1 / gamma) - 0.055;
  }
  function bitReverse(x, numBits) {
    x = (x & 1431655765) << 1 | (x & 2863311530) >> 1;
    x = (x & 858993459) << 2 | (x & 3435973836) >> 2;
    x = (x & 252645135) << 4 | (x & 4042322160) >> 4;
    x = (x & 16711935) << 8 | (x & 4278255360) >> 8;
    x = (x & 65535) << 16 | (x & 4294901760) >> 16;
    return x >>> 32 - numBits;
  }
  class ImageComplexF64 extends Image {
    static get BUFFER_TYPE() {
      return Float64Array;
    }
    static get NUM_CHANNELS() {
      return 2;
    }
    real() {
      const img = GrayImageF32N0F8.empty(this.width, this.height);
      for (const p of img.allCoordinates()) {
        const { re } = this.valueAt(p);
        img.setValueAt(p, re);
      }
      return img;
    }
    imaginary() {
      const img = GrayImageF32N0F8.empty(this.width, this.height);
      for (const p of img.allCoordinates()) {
        const { im } = this.valueAt(p);
        img.setValueAt(p, im);
      }
      return img;
    }
    abs() {
      const img = GrayImageF32N0F8.empty(this.width, this.height);
      for (const p of img.allCoordinates()) {
        const { re, im } = this.valueAt(p);
        img.setValueAt(p, Math.sqrt(re ** 2 + im ** 2));
      }
      return img;
    }
    valueAt({ x, y }, { wrap = false } = {}) {
      if (wrap) {
        ({ x, y } = this.wrapCoordinates({ x, y }));
      }
      const offset = this.pixelIndex(x, y) * this.constructor.NUM_CHANNELS;
      const re = this.data[offset + 0];
      const im = this.data[offset + 1];
      return { re, im };
    }
    setValueAt({ x, y }, { re, im }, { wrap = false } = {}) {
      if (wrap) {
        ({ x, y } = this.wrapCoordinates({ x, y }));
      }
      const offset = this.pixelIndex(x, y) * this.constructor.NUM_CHANNELS;
      this.data[offset + 0] = re;
      this.data[offset + 1] = im;
    }
    multiplySelf(other) {
      console.assert(
        this.width === other.width && this.height === other.height,
        "Images need to be same size"
      );
      for (const p of this.allCoordinates()) {
        const v1 = this.valueAt(p);
        const v2 = other.valueAt(p);
        this.setValueAt(p, {
          re: v1.re * v2.re + v1.im * v2.im,
          im: v1.re * v2.im + v1.im * v2.re
        });
      }
      return this;
    }
    centerSelf() {
      console.assert(
        this.width % 2 === 0 && this.height % 2 === 0,
        "width and height must be even"
      );
      const halfWidth = this.width / 2;
      const halfHeight = this.height / 2;
      for (const p1 of this.allCoordinates()) {
        if (p1.x === 0 && p1.y === halfHeight) {
          break;
        }
        const v1 = this.valueAt(p1, { wrap: true });
        const p2 = { x: p1.x + halfWidth, y: p1.y + halfHeight };
        const v2 = this.valueAt(p2, { wrap: true });
        this.setValueAt(p1, v2, { wrap: true });
        this.setValueAt(p2, v1, { wrap: true });
      }
      return this;
    }
    uncenterSelf() {
      console.assert(
        this.width % 2 === 0 && this.height % 2 === 0,
        "width and height must be even"
      );
      return this.centerSelf();
    }
    _fft1Self(start, num, inc, sign = -1) {
      const bits = Math.log2(num);
      for (let i = 0; i < num; i++) {
        const bi = bitReverse(i, bits);
        if (i >= bi) {
          continue;
        }
        const p1 = { x: start.x + i * inc.x, y: start.y + i * inc.y };
        const p2 = { x: start.x + bi * inc.x, y: start.y + bi * inc.y };
        const v1 = this.valueAt(p1);
        const v2 = this.valueAt(p2);
        this.setValueAt(p1, v2);
        this.setValueAt(p2, v1);
      }
      for (let s = 1; s <= bits; s++) {
        const m = 2 ** s;
        const wm = Complex.fromEuler(1, sign * 2 * Math.PI / m);
        for (let k = 0; k < num; k += m) {
          const w = Complex.fromEuler(1, 0);
          for (let j = 0; j < m / 2; j++) {
            const pt = {
              x: start.x + (k + j + m / 2) * inc.x,
              y: start.y + (k + j + m / 2) * inc.y
            };
            const t = w.copy().multiplySelf(this.valueAt(pt));
            const pu = {
              x: start.x + (k + j) * inc.x,
              y: start.y + (k + j) * inc.y
            };
            const u = Complex.fromCartesianObject(this.valueAt(pu));
            this.setValueAt(pu, u.copy().addSelf(t));
            this.setValueAt(pt, u.copy().subtractSelf(t));
            w.multiplySelf(wm);
          }
        }
      }
      return this;
    }
    fftSelf() {
      return this._fft2Self(-1);
    }
    mapSelf(f) {
      for (const c of this.allCoordinates()) {
        this.setValueAt(c, f(this.valueAt(c)));
      }
      return this;
    }
    ifftSelf() {
      const n = this.width * this.height;
      return this._fft2Self(1).mapSelf((v) => {
        v.re /= n;
        v.im /= n;
        return v;
      });
    }
    _fft2Self(sign = -1) {
      console.assert(this.width === this.height, "Can only fft square images");
      const numBits = Math.log2(this.width);
      console.assert(
        numBits === Math.floor(numBits),
        "Can only fft images whose size is a power of 2"
      );
      for (let y = 0; y < this.height; y++) {
        this._fft1Self({ x: 0, y }, this.width, { x: 1, y: 0 }, sign);
      }
      for (let x = 0; x < this.width; x++) {
        this._fft1Self({ x, y: 0 }, this.height, { x: 0, y: 1 }, sign);
      }
      return this;
    }
  }
  class Complex {
    constructor(re, im) {
      this.re = re;
      this.im = im;
    }
    static fromCartesianObject({ re = 0, im = 0 } = {}) {
      return new Complex(re, im);
    }
    static fromEuler(r = 0, phi = 0) {
      return new Complex(r * Math.cos(phi), r * Math.sin(phi));
    }
    copy() {
      return new Complex(this.re, this.im);
    }
    addSelf(other) {
      this.re += other.re;
      this.im += other.im;
      return this;
    }
    subtractSelf(other) {
      this.re -= other.re;
      this.im -= other.im;
      return this;
    }
    multiplySelf(other) {
      const { re, im } = this;
      this.re = re * other.re - im * other.im;
      this.im = re * other.im + im * other.re;
      return this;
    }
  }
  function weightGenerator(length, ratio) {
    return Array.from({ length }, (_, i) => Math.pow(ratio, i / (length - 1)));
  }
  function* hilbertCurve(n) {
    if (n === 1) {
      yield "A";
      return;
    }
    for (const instr of hilbertCurve(n - 1)) {
      switch (instr) {
        case "A":
          yield* "+BF-AFA-FB+".split("");
          break;
        case "B":
          yield* "-AF+BFB+FA-".split("");
          break;
        default:
          yield instr;
      }
    }
  }
  function* lsystem2coordinates(it) {
    let direction = 0;
    let x = 0;
    let y = 0;
    yield { x, y };
    for (const instr of it) {
      switch (instr) {
        case "F":
          x += Math.cos(direction);
          y += Math.sin(direction);
          yield { x: Math.round(x), y: Math.round(y) };
          break;
        case "+":
          direction += Math.PI / 2;
          break;
        case "-":
          direction -= Math.PI / 2;
          break;
      }
    }
  }
  function* hilbertCurveGenerator(width, height) {
    const n = Math.ceil(Math.log2(Math.max(width, height)));
    yield* lsystem2coordinates(hilbertCurve(n + 1));
  }
  const numBayerLevels = 4;
  const bayerLevels = message(self, "bayerlevels").then(
    ({ bayerLevels: bayerLevels2 }) => bayerLevels2.map((bl) => Object.setPrototypeOf(bl, GrayImageF32N0F8.prototype))
  );
  const pipeline = [
    {
      id: "quantized",
      title: "Quantized",
      async process(grayscale) {
        return grayscale.copy().mapSelf((v) => v > 0.5 ? 1 : 0);
      }
    },
    {
      id: "random",
      title: "Dithering",
      async process(grayscale) {
        return grayscale.copy().mapSelf((v) => v > Math.random() ? 1 : 0);
      }
    },
    ...Array.from({ length: numBayerLevels }, (_, level) => {
      return {
        id: `bayer-${level}`,
        title: `Bayer Level ${level}`,
        async process(grayscale, { bayerLevels: bayerLevels2 }) {
          const bayerLevel = (await bayerLevels2)[level];
          return grayscale.copy().mapSelf(
            (v, { x, y }) => v > bayerLevel.valueAt({ x, y }, { wrap: true }) ? 1 : 0
          );
        }
      };
    }),
    {
      id: "errdiff2d",
      title: "Simple Error Diffusion",
      async process(grayscale) {
        return matrixErrorDiffusion(
          grayscale.copy(),
          new GrayImageF32N0F8(new Float32Array([0, 1, 1, 0]), 2, 2),
          (v) => v > 0.5 ? 1 : 0
        );
      }
    },
    {
      id: "floydsteinberg",
      title: "Floyd-Steinberg Diffusion",
      async process(grayscale) {
        return matrixErrorDiffusion(
          grayscale.copy(),
          new GrayImageF32N0F8(new Float32Array([0, 0, 7, 1, 5, 3]), 3, 2),
          (v) => v > 0.5 ? 1 : 0
        );
      }
    },
    {
      id: "jjn",
      title: "Jarvis-Judice-Ninke Diffusion",
      async process(grayscale) {
        return matrixErrorDiffusion(
          grayscale.copy(),
          new GrayImageF32N0F8(
            new Float32Array([0, 0, 0, 7, 5, 3, 5, 7, 5, 3, 1, 3, 5, 3, 1]),
            5,
            3
          ),
          (v) => v > 0.5 ? 1 : 0
        );
      }
    },
    {
      id: "atkinson",
      title: "Atkinson Dither",
      async process(grayscale) {
        return matrixErrorDiffusion(
          grayscale.copy(),
          new GrayImageF32N0F8(
            new Float32Array([0, 0, 1 / 8, 1 / 8, 1 / 8, 1 / 8, 1 / 8, 0, 0, 1 / 8, 0, 0]),
            4,
            3
          ),
          (v) => v > 0.5 ? 1 : 0,
          { normalize: false }
        );
      }
    },
    {
      id: "riemersma",
      title: "Riemersma Dither",
      async process(grayscale) {
        return curveErrorDiffusion(
          grayscale.copy(),
          hilbertCurveGenerator,
          weightGenerator(32, 1 / 8),
          (v) => v > 0.5 ? 1 : 0
        );
      }
    }
    /* {
      id: 'mybluenoise',
      title: () =>
        `Blue Noise (${
          myBluenoiseDuration
            ? `${myBluenoiseDuration.toFixed(1)}ms`
            : 'takes a bit...'
        })`,
      async process (grayscale) {
        const bluenoise = await myBluenoisePromise
        const result = grayscale.copy()
        for (const { x, y, pixel } of result.allPixels()) {
          pixel[0] = pixel[0] + bluenoise.pixelAt(x, y, { wrap: true })[0] - 0.5
          pixel[0] = pixel[0] > 0.5 ? 1.0 : 0.0
        }
        return result
      }
    } */
  ];
  function curveErrorDiffusion(img, curve, weights, quantF) {
    const curveIt = curve(img.width, img.height);
    const errors = Array.from(weights, () => 0);
    for (const p of curveIt) {
      if (!img.isInBounds(p.x, p.y)) {
        continue;
      }
      const original = img.valueAt(p);
      const quantized = quantF(
        original + errors.reduce((sum, c, i) => sum + c * weights[i])
      );
      errors.pop();
      errors.unshift(original - quantized);
      img.setValueAt(p, quantized);
    }
    return img;
  }
  function matrixErrorDiffusion(img, diffusor, quantizeFunc, { normalize = true } = {}) {
    if (normalize) {
      diffusor.normalizeSelf();
    }
    for (const { x, y, pixel } of img.allPixels()) {
      const original = pixel[0];
      const quantized = quantizeFunc(original);
      pixel[0] = quantized;
      const error = original - quantized;
      for (const {
        x: diffX,
        y: diffY,
        pixel: diffPixel
      } of diffusor.allPixels()) {
        const offsetX = diffX - Math.floor((diffusor.width - 1) / 2);
        const offsetY = diffY;
        if (img.isInBounds(x + offsetX, y + offsetY)) {
          const pixel2 = img.pixelAt(x + offsetX, y + offsetY);
          pixel2[0] = pixel2[0] + error * diffPixel[0];
        }
      }
    }
    return img;
  }
  async function init() {
    const reader = MessageStream().getReader();
    while (true) {
      const {
        value: { image, id }
      } = await reader.read();
      if (id !== "image") {
        continue;
      }
      postMessage({
        type: "result",
        id: "original",
        title: "Original",
        imageData: image
      });
      const grayscale = GrayImageF32N0F8.fromImageData(image);
      postMessage({
        type: "result",
        id: "grayscale",
        title: "Grayscale",
        imageData: grayscale.toImageData()
      });
      for (const step of pipeline) {
        let title = step.title;
        if (typeof step.title === "function") {
          title = step.title();
        }
        postMessage({
          type: "started",
          id: step.id,
          title
        });
        const result = await step.process(grayscale, { bayerLevels });
        if (typeof step.title === "function") {
          title = step.title();
        }
        postMessage({
          type: "result",
          title,
          id: step.id,
          imageData: result.toImageData()
        });
      }
    }
  }
  init();
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ub2Nocm9tZS13b3JrZXItVkVva05hWHUuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9zaGFyZWQvbGliL3V0aWxzL2RpdGhlcnB1bmsvd29ya2VyLXV0aWxzLmpzIiwiLi4vc3JjL3NoYXJlZC9saWIvdXRpbHMvZGl0aGVycHVuay9pbWFnZS11dGlscy5qcyIsIi4uL3NyYy9zaGFyZWQvbGliL3V0aWxzL2RpdGhlcnB1bmsvY3VydmUtdXRpbHMuanMiLCIuLi9zcmMvc2hhcmVkL2xpYi91dGlscy9kaXRoZXJwdW5rL21vbm9jaHJvbWUtd29ya2VyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBNZXNzYWdlU3RyZWFtICgpIHtcbiAgcmV0dXJuIG5ldyBSZWFkYWJsZVN0cmVhbSh7XG4gICAgc3RhcnQgKGNvbnRyb2xsZXIpIHtcbiAgICAgIHNlbGYuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGV2ID0+IGNvbnRyb2xsZXIuZW5xdWV1ZShldi5kYXRhKSlcbiAgICB9XG4gIH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtZXNzYWdlICh3b3JrZXIsIGlkKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICB3b3JrZXIuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGZ1bmN0aW9uIGYgKHsgZGF0YSB9KSB7XG4gICAgICBpZiAoZGF0YS5pZCAhPT0gaWQpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICB3b3JrZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGYpXG4gICAgICByZXNvbHZlKGRhdGEpXG4gICAgfSlcbiAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVpZCAoKSB7XG4gIHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiAxNiB9LCAoKSA9PlxuICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NikudG9TdHJpbmcoMTYpXG4gICkuam9pbignJylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5leHRFdmVudCAodGFyZ2V0LCBuYW1lKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+XG4gICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgcmVzb2x2ZSwgeyBvbmNlOiB0cnVlIH0pXG4gIClcbn1cbiIsImV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbWFnZUZpbGVUb0ltYWdlRGF0YSAodXJsKSB7XG4gIGNvbnN0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gIGltZy5zcmMgPSB1cmxcbiAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGltZy5vbmxvYWQgPSByZXNvbHZlXG4gICAgaW1nLm9uZXJyb3IgPSByZWplY3RcbiAgfSlcbiAgcmV0dXJuIGltYWdlVG9JbWFnZURhdGEoaW1nKVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYmxvYlRvSW1hZ2VEYXRhIChibG9iKSB7XG4gIGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYilcbiAgcmV0dXJuIGltYWdlRmlsZVRvSW1hZ2VEYXRhKHVybClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGltYWdlVG9JbWFnZURhdGEgKGltZykge1xuICBjb25zdCBjdnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuICBjdnMud2lkdGggPSBpbWcubmF0dXJhbFdpZHRoXG4gIGN2cy5oZWlnaHQgPSBpbWcubmF0dXJhbEhlaWdodFxuICBjb25zdCBjdHggPSBjdnMuZ2V0Q29udGV4dCgnMmQnKVxuICBjdHguZHJhd0ltYWdlKGltZywgMCwgMClcbiAgcmV0dXJuIGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgY3ZzLndpZHRoLCBjdnMuaGVpZ2h0KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaW1hZ2VEYXRhVG9DYW52YXMgKGltZ0RhdGEpIHtcbiAgY29uc3QgY3ZzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcbiAgY3ZzLndpZHRoID0gaW1nRGF0YS53aWR0aFxuICBjdnMuaGVpZ2h0ID0gaW1nRGF0YS5oZWlnaHRcbiAgY29uc3QgY3R4ID0gY3ZzLmdldENvbnRleHQoJzJkJylcbiAgY3R4LnB1dEltYWdlRGF0YShpbWdEYXRhLCAwLCAwKVxuICByZXR1cm4gY3ZzXG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW1hZ2VEYXRhVG9QTkcgKGltZ0RhdGEpIHtcbiAgY29uc3QgY3ZzID0gaW1hZ2VEYXRhVG9DYW52YXMoaW1nRGF0YSlcbiAgY29uc3QgYmxvYiA9IGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gY3ZzLnRvQmxvYihyZXNvbHZlLCAnaW1hZ2UvcG5nJykpXG4gIHJldHVybiBibG9iXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGFtcCAobWluLCB2LCBtYXgpIHtcbiAgaWYgKHYgPCBtaW4pIHtcbiAgICByZXR1cm4gbWluXG4gIH1cbiAgaWYgKHYgPiBtYXgpIHtcbiAgICByZXR1cm4gbWF4XG4gIH1cbiAgcmV0dXJuIHZcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxpbmVhckJyaWdodG5lc3NOMEY4IChyLCBnLCBiKSB7XG4gIHJldHVybiAwLjIxICogciArIDAuNzIgKiBnICsgMC4wNyAqIGJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNyZ2JCcmlnaHRuZXNzTjBGOCAociwgZywgYikge1xuICByZXR1cm4gbGluZWFyQnJpZ2h0bmVzc04wRjgoXG4gICAgc3JnYlRvTGluZWFyKHIpLFxuICAgIHNyZ2JUb0xpbmVhcihnKSxcbiAgICBzcmdiVG9MaW5lYXIoYilcbiAgKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3JnYkJyaWdodG5lc3NVOCAociwgZywgYikge1xuICByZXR1cm4gc3JnYkJyaWdodG5lc3NOMEY4KHIgLyAyNTUsIGcgLyAyNTUsIGIgLyAyNTUpXG59XG5cbmV4cG9ydCBjbGFzcyBJbWFnZSB7XG4gIGNvbnN0cnVjdG9yIChkYXRhLCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdGhpcy5kYXRhID0gZGF0YVxuICAgIHRoaXMud2lkdGggPSB3aWR0aFxuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0XG4gIH1cblxuICBzdGF0aWMgZW1wdHkgKHdpZHRoLCBoZWlnaHQpIHtcbiAgICBjb25zdCBidWZmZXIgPSBuZXcgdGhpcy5CVUZGRVJfVFlQRSh3aWR0aCAqIGhlaWdodCAqIHRoaXMuTlVNX0NIQU5ORUxTKVxuICAgIGJ1ZmZlci5maWxsKDApXG4gICAgcmV0dXJuIG5ldyB0aGlzKGJ1ZmZlciwgd2lkdGgsIGhlaWdodClcbiAgfVxuXG4gIHBpeGVsSW5kZXggKHgsIHkpIHtcbiAgICByZXR1cm4geSAqIHRoaXMud2lkdGggKyB4XG4gIH1cblxuICBwaXhlbEZvckluZGV4IChpKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IGkgJSB0aGlzLndpZHRoLFxuICAgICAgeTogTWF0aC5mbG9vcihpIC8gdGhpcy53aWR0aClcbiAgICB9XG4gIH1cblxuICBwaXhlbCAobnRoKSB7XG4gICAgcmV0dXJuIG5ldyB0aGlzLmRhdGEuY29uc3RydWN0b3IoXG4gICAgICB0aGlzLmRhdGEuYnVmZmVyLFxuICAgICAgdGhpcy5kYXRhLmJ5dGVPZmZzZXQgK1xuICAgICAgICBudGggKiB0aGlzLmNvbnN0cnVjdG9yLk5VTV9DSEFOTkVMUyAqIHRoaXMuZGF0YS5CWVRFU19QRVJfRUxFTUVOVCxcbiAgICAgIHRoaXMuY29uc3RydWN0b3IuTlVNX0NIQU5ORUxTXG4gICAgKVxuICB9XG5cbiAgd3JhcENvb3JkaW5hdGVzICh7IHgsIHkgfSkge1xuICAgIHggPSB4ICUgdGhpcy53aWR0aFxuICAgIGlmICh4IDwgMCkgeCArPSB0aGlzLndpZHRoXG4gICAgeSA9IHkgJSB0aGlzLmhlaWdodFxuICAgIGlmICh5IDwgMCkgeSArPSB0aGlzLmhlaWdodFxuICAgIHJldHVybiB7IHgsIHkgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4XG4gICAqIEBwYXJhbSB7bnVtYmVyfSB5XG4gICAqIEByZXR1cm5zIHtGbG9hdDMyQXJyYXl9XG4gICAqL1xuICBwaXhlbEF0ICh4LCB5LCB7IHdyYXAgPSBmYWxzZSB9ID0ge30pIHtcbiAgICBpZiAod3JhcCkge1xuICAgICAgKHsgeCwgeSB9ID0gdGhpcy53cmFwQ29vcmRpbmF0ZXMoeyB4LCB5IH0pKVxuICAgIH0gZWxzZSB7XG4gICAgICB4ID0gY2xhbXAoMCwgeCwgdGhpcy53aWR0aCAtIDEpXG4gICAgICB5ID0gY2xhbXAoMCwgeSwgdGhpcy5oZWlnaHQgLSAxKVxuICAgIH1cbiAgICBjb25zdCBudGggPSB0aGlzLnBpeGVsSW5kZXgoeCwgeSlcbiAgICByZXR1cm4gdGhpcy5waXhlbChudGgpXG4gIH1cblxuICB2YWx1ZUF0ICh7IHgsIHksIGNoYW5uZWwgPSAwIH0sIHsgd3JhcCA9IGZhbHNlIH0gPSB7fSkge1xuICAgIGlmICh3cmFwKSB7XG4gICAgICAoeyB4LCB5IH0gPSB0aGlzLndyYXBDb29yZGluYXRlcyh7IHgsIHkgfSkpXG4gICAgfVxuICAgIHJldHVybiB0aGlzLmRhdGFbXG4gICAgICB0aGlzLnBpeGVsSW5kZXgoeCwgeSkgKiB0aGlzLmNvbnN0cnVjdG9yLk5VTV9DSEFOTkVMUyArIGNoYW5uZWxcbiAgICBdXG4gIH1cblxuICBzZXRWYWx1ZUF0ICh7IHgsIHksIGNoYW5uZWwgPSAwIH0sIHYsIHsgd3JhcCA9IGZhbHNlIH0gPSB7fSkge1xuICAgIGlmICh3cmFwKSB7XG4gICAgICAoeyB4LCB5IH0gPSB0aGlzLndyYXBDb29yZGluYXRlcyh7IHgsIHkgfSkpXG4gICAgfVxuICAgIHRoaXMuZGF0YVtcbiAgICAgIHRoaXMucGl4ZWxJbmRleCh4LCB5KSAqIHRoaXMuY29uc3RydWN0b3IuTlVNX0NIQU5ORUxTICsgY2hhbm5lbFxuICAgIF0gPSB2XG4gIH1cblxuICBjb3B5ICgpIHtcbiAgICByZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3IodGhpcy5kYXRhLnNsaWNlKCksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KVxuICB9XG5cbiAgbWFwU2VsZiAoZikge1xuICAgIHRoaXMuZGF0YS5mb3JFYWNoKFxuICAgICAgKHYsIGksIGFycikgPT4gKGFycltpXSA9IGYodiwgeyAuLi50aGlzLnBpeGVsRm9ySW5kZXgoaSksIGkgfSkpXG4gICAgKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBpc0luQm91bmRzICh4LCB5KSB7XG4gICAgaWYgKHggPCAwIHx8IHkgPCAwKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgaWYgKHggPj0gdGhpcy53aWR0aCB8fCB5ID49IHRoaXMuaGVpZ2h0KSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIHJhbmRvbVBpeGVsICgpIHtcbiAgICBjb25zdCBpID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy53aWR0aCAqIHRoaXMuaGVpZ2h0KVxuICAgIHJldHVybiB0aGlzLnBpeGVsKGkpXG4gIH1cblxuICB0b1NyZ2JTZWxmICgpIHtcbiAgICBmb3IgKGNvbnN0IHsgcGl4ZWwgfSBvZiB0aGlzLmFsbFBpeGVscygpKSB7XG4gICAgICBwaXhlbC5zZXQocGl4ZWwubWFwKGxpbmVhclRvU3JnYikpXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICB0b0xpbmVhclNlbGYgKCkge1xuICAgIGZvciAoY29uc3QgeyBwaXhlbCB9IG9mIHRoaXMuYWxsUGl4ZWxzKCkpIHtcbiAgICAgIHBpeGVsLnNldChwaXhlbC5tYXAoc3JnYlRvTGluZWFyKSlcbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gICphbGxDb29yZGluYXRlcyAoKSB7XG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLmhlaWdodDsgeSsrKSB7XG4gICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMud2lkdGg7IHgrKykge1xuICAgICAgICB5aWVsZCB7IHgsIHkgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7SXRlcmFibGU8e3g6IG51bWJlciwgeTogbnVtYmVyLCBpOiBudW1iZXIsIHBpeGVsOiBGbG9hdDMyQXJyYXl9Pn1cbiAgICovXG4gICphbGxQaXhlbHMgKCkge1xuICAgIGxldCBpID0gMFxuICAgIGZvciAoY29uc3QgeyB4LCB5IH0gb2YgdGhpcy5hbGxDb29yZGluYXRlcygpKSB7XG4gICAgICB5aWVsZCB7IHgsIHksIGksIHBpeGVsOiB0aGlzLnBpeGVsQXQoeCwgeSkgfVxuICAgICAgaSsrXG4gICAgfVxuICB9XG5cbiAgY29udm9sdmUgKG90aGVyKSB7XG4gICAgY29uc29sZS5hc3NlcnQoXG4gICAgICBvdGhlci53aWR0aCAlIDIgPT09IDEgJiYgb3RoZXIuaGVpZ2h0ICUgMiA9PT0gMSxcbiAgICAgICdDb252b2x1dGlvbiBtYXRyaXggbXVzdCBoYXZlIG9kZCBzaXplJ1xuICAgIClcblxuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuY29weSgpXG4gICAgY29uc3Qgb2Zmc2V0WCA9IE1hdGguZmxvb3Iob3RoZXIud2lkdGggLyAyKVxuICAgIGNvbnN0IG9mZnNldFkgPSBNYXRoLmZsb29yKG90aGVyLmhlaWdodCAvIDIpXG4gICAgZm9yIChjb25zdCBwIG9mIHRoaXMuYWxsQ29vcmRpbmF0ZXMoKSkge1xuICAgICAgbGV0IHN1bSA9IDBcbiAgICAgIGZvciAoY29uc3QgcSBvZiBvdGhlci5hbGxDb29yZGluYXRlcygpKSB7XG4gICAgICAgIGNvbnN0IHggPSBwLnggKyBxLnggLSBvZmZzZXRYXG4gICAgICAgIGNvbnN0IHkgPSBwLnkgKyBxLnkgLSBvZmZzZXRZXG4gICAgICAgIHN1bSArPSB0aGlzLnZhbHVlQXQoeyB4LCB5IH0sIHsgd3JhcDogdHJ1ZSB9KSAqIG90aGVyLnZhbHVlQXQocSlcbiAgICAgIH1cbiAgICAgIHJlc3VsdC5zZXRWYWx1ZUF0KHAsIHN1bSlcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgbWF4ICgpIHtcbiAgICBsZXQgbWF4XG4gICAgZm9yIChjb25zdCBpIG9mIHRoaXMuYWxsUGl4ZWxzKCkpIHtcbiAgICAgIGlmICghbWF4IHx8IG1heC5waXhlbFswXSA8IGkucGl4ZWxbMF0pIHtcbiAgICAgICAgbWF4ID0gaVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbWF4XG4gIH1cblxuICBtaW4gKCkge1xuICAgIGxldCBtaW5cbiAgICBmb3IgKGNvbnN0IGkgb2YgdGhpcy5hbGxQaXhlbHMoKSkge1xuICAgICAgaWYgKCFtaW4gfHwgbWluLnBpeGVsWzBdID4gaS5waXhlbFswXSkge1xuICAgICAgICBtaW4gPSBpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtaW5cbiAgfVxuXG4gIHRvQ29tcGxleCAoKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gSW1hZ2VDb21wbGV4RjY0LmVtcHR5KHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KVxuICAgIC8vIGNvbnN0IGMgPSBuZXcgQ29tcGxleCgpXG4gICAgZm9yIChjb25zdCBwIG9mIHJlc3VsdC5hbGxDb29yZGluYXRlcygpKSB7XG4gICAgICByZXN1bHQuc2V0VmFsdWVBdChwLCB7IHJlOiB0aGlzLnZhbHVlQXQocCksIGltOiAwIH0pXG4gICAgfVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxufVxuXG5mdW5jdGlvbiBuZXh0T2RkIChuKSB7XG4gIGlmIChuICUgMiA9PT0gMCkge1xuICAgIHJldHVybiBuICsgMVxuICB9XG4gIHJldHVybiBuXG59XG5cbmV4cG9ydCBjbGFzcyBSR0JBSW1hZ2VVOCBleHRlbmRzIEltYWdlIHtcbiAgc3RhdGljIGdldCBCVUZGRVJfVFlQRSAoKSB7XG4gICAgcmV0dXJuIFVpbnQ4Q2xhbXBlZEFycmF5XG4gIH1cblxuICBzdGF0aWMgZ2V0IE5VTV9DSEFOTkVMUyAoKSB7XG4gICAgcmV0dXJuIDRcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSW1hZ2VEYXRhIChpbWdEYXRhKSB7XG4gICAgcmV0dXJuIG5ldyBSR0JBSW1hZ2VVOChcbiAgICAgIG5ldyBVaW50OENsYW1wZWRBcnJheShpbWdEYXRhLmRhdGEpLFxuICAgICAgaW1nRGF0YS53aWR0aCxcbiAgICAgIGltZ0RhdGEuaGVpZ2h0XG4gICAgKVxuICB9XG5cbiAgdG9JbWFnZURhdGEgKCkge1xuICAgIHJldHVybiBuZXcgSW1hZ2VEYXRhKHRoaXMuZGF0YS5zbGljZSgpLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodClcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUkdCSW1hZ2VGMzJOMEY4IGV4dGVuZHMgSW1hZ2Uge1xuICBzdGF0aWMgZ2V0IEJVRkZFUl9UWVBFICgpIHtcbiAgICByZXR1cm4gRmxvYXQzMkFycmF5XG4gIH1cblxuICBzdGF0aWMgZ2V0IE5VTV9DSEFOTkVMUyAoKSB7XG4gICAgcmV0dXJuIDNcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSW1hZ2VEYXRhIChzb3VyY2VJbWFnZSwgeyBsaW5lYXJpemUgPSB0cnVlIH0gPSB7fSkge1xuICAgIGNvbnN0IGltZyA9IG5ldyB0aGlzKFxuICAgICAgbmV3IHRoaXMuQlVGRkVSX1RZUEUoXG4gICAgICAgIHNvdXJjZUltYWdlLndpZHRoICogc291cmNlSW1hZ2UuaGVpZ2h0ICogdGhpcy5OVU1fQ0hBTk5FTFNcbiAgICAgICksXG4gICAgICBzb3VyY2VJbWFnZS53aWR0aCxcbiAgICAgIHNvdXJjZUltYWdlLmhlaWdodFxuICAgIClcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNvdXJjZUltYWdlLndpZHRoICogc291cmNlSW1hZ2UuaGVpZ2h0OyBpKyspIHtcbiAgICAgIGlmIChsaW5lYXJpemUpIHtcbiAgICAgICAgaW1nLmRhdGFbMyAqIGkgKyAwXSA9IHNyZ2JUb0xpbmVhcihzb3VyY2VJbWFnZS5kYXRhWzQgKiBpICsgMF0gLyAyNTUpXG4gICAgICAgIGltZy5kYXRhWzMgKiBpICsgMV0gPSBzcmdiVG9MaW5lYXIoc291cmNlSW1hZ2UuZGF0YVs0ICogaSArIDFdIC8gMjU1KVxuICAgICAgICBpbWcuZGF0YVszICogaSArIDJdID0gc3JnYlRvTGluZWFyKHNvdXJjZUltYWdlLmRhdGFbNCAqIGkgKyAyXSAvIDI1NSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGltZy5kYXRhWzMgKiBpICsgMF0gPSBzb3VyY2VJbWFnZS5kYXRhWzQgKiBpICsgMF0gLyAyNTVcbiAgICAgICAgaW1nLmRhdGFbMyAqIGkgKyAxXSA9IHNvdXJjZUltYWdlLmRhdGFbNCAqIGkgKyAxXSAvIDI1NVxuICAgICAgICBpbWcuZGF0YVszICogaSArIDJdID0gc291cmNlSW1hZ2UuZGF0YVs0ICogaSArIDJdIC8gMjU1XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpbWdcbiAgfVxuXG4gIG1hcFNlbGYgKGYpIHtcbiAgICBmb3IgKGNvbnN0IHAgb2YgdGhpcy5hbGxQaXhlbHMoKSkge1xuICAgICAgcC5waXhlbC5zZXQoZihwLnBpeGVsLCBwKSlcbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3tkZWxpbmVhcml6ZTogYm9vbGVhbn19XG4gICAqL1xuICB0b0ltYWdlRGF0YSAoeyBkZWxpbmVhcml6ZSA9IHRydWUgfSA9IHt9KSB7XG4gICAgY29uc3QgaW1nID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KHRoaXMud2lkdGggKiB0aGlzLmhlaWdodCAqIDQpXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLndpZHRoICogdGhpcy5oZWlnaHQ7IGkrKykge1xuICAgICAgLy8gQ2xhbXBpbmcgYW5kIGZsb29y4oCZaW5nIGlzIGRvbmUgaW1wbGljaXRseSBieSBVaW50OENsYW1wZWRBcnJheVxuICAgICAgaWYgKGRlbGluZWFyaXplKSB7XG4gICAgICAgIGltZ1s0ICogaSArIDBdID0gbGluZWFyVG9TcmdiKHRoaXMuZGF0YVszICogaSArIDBdKSAqIDI1NVxuICAgICAgICBpbWdbNCAqIGkgKyAxXSA9IGxpbmVhclRvU3JnYih0aGlzLmRhdGFbMyAqIGkgKyAxXSkgKiAyNTVcbiAgICAgICAgaW1nWzQgKiBpICsgMl0gPSBsaW5lYXJUb1NyZ2IodGhpcy5kYXRhWzMgKiBpICsgMl0pICogMjU1XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbWdbNCAqIGkgKyAwXSA9IHRoaXMuZGF0YVszICogaSArIDBdICogMjU1XG4gICAgICAgIGltZ1s0ICogaSArIDFdID0gdGhpcy5kYXRhWzMgKiBpICsgMV0gKiAyNTVcbiAgICAgICAgaW1nWzQgKiBpICsgMl0gPSB0aGlzLmRhdGFbMyAqIGkgKyAyXSAqIDI1NVxuICAgICAgfVxuICAgICAgaW1nWzQgKiBpICsgM10gPSAyNTVcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBJbWFnZURhdGEoaW1nLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodClcbiAgfVxuXG4gIHRvR3JheSAoKSB7XG4gICAgY29uc3QgaW1nID0gR3JheUltYWdlRjMyTjBGOC5lbXB0eSh0aGlzLndpZHRoLCB0aGlzLmhlaWdodClcbiAgICBmb3IgKGNvbnN0IHsgeCwgeSwgcGl4ZWwgfSBvZiB0aGlzLmFsbFBpeGVscygpKSB7XG4gICAgICBpbWcuc2V0VmFsdWVBdCh7IHgsIHkgfSwgbGluZWFyQnJpZ2h0bmVzc04wRjgoLi4ucGl4ZWwpKVxuICAgIH1cbiAgICByZXR1cm4gaW1nXG4gIH1cbn1cblxuY29uc3QgZ2F1c3NDYWNoZSA9IG5ldyBNYXAoKVxuY29uc3QgZmZ0R2F1c3NDYWNoZSA9IG5ldyBNYXAoKVxuXG5leHBvcnQgY2xhc3MgR3JheUltYWdlRjMyTjBGOCBleHRlbmRzIEltYWdlIHtcbiAgc3RhdGljIGdldCBCVUZGRVJfVFlQRSAoKSB7XG4gICAgcmV0dXJuIEZsb2F0MzJBcnJheVxuICB9XG5cbiAgc3RhdGljIGdldCBOVU1fQ0hBTk5FTFMgKCkge1xuICAgIHJldHVybiAxXG4gIH1cblxuICBzdGF0aWMgZ2F1c3NpYW5LZXJuZWwgKFxuICAgIHN0ZERldixcbiAgICB7XG4gICAgICB3aWR0aCA9IG5leHRPZGQoTWF0aC5jZWlsKDYgKiBzdGREZXYpKSxcbiAgICAgIGhlaWdodCA9IG5leHRPZGQoTWF0aC5jZWlsKDYgKiBzdGREZXYpKVxuICAgIH0gPSB7fVxuICApIHtcbiAgICBjb25zdCBrZXkgPSBgJHtzdGREZXZ9OiR7d2lkdGh9OiR7aGVpZ2h0fWBcbiAgICBpZiAoZ2F1c3NDYWNoZS5oYXMoa2V5KSkge1xuICAgICAgcmV0dXJuIGdhdXNzQ2FjaGUuZ2V0KGtleSkuY29weSgpXG4gICAgfVxuICAgIGNvbnN0IGltZyA9IEdyYXlJbWFnZUYzMk4wRjguZW1wdHkod2lkdGgsIGhlaWdodClcbiAgICBjb25zdCBmYWN0b3IgPSAxIC8gKDIgKiBNYXRoLlBJICogc3RkRGV2ICoqIDIpXG4gICAgZm9yIChjb25zdCB7IHgsIHksIHBpeGVsIH0gb2YgaW1nLmFsbFBpeGVscygpKSB7XG4gICAgICBwaXhlbFswXSA9XG4gICAgICAgIGZhY3RvciAqXG4gICAgICAgIE1hdGguZXhwKFxuICAgICAgICAgIC0oXG4gICAgICAgICAgICAoeCAtIE1hdGguZmxvb3Iod2lkdGggLyAyKSkgKiogMiArXG4gICAgICAgICAgICAoeSAtIE1hdGguZmxvb3Iod2lkdGggLyAyKSkgKiogMlxuICAgICAgICAgICkgL1xuICAgICAgICAgICAgKDIgKiBzdGREZXYgKiogMilcbiAgICAgICAgKVxuICAgIH1cbiAgICBnYXVzc0NhY2hlLnNldChrZXksIGltZy5jb3B5KCkpXG4gICAgcmV0dXJuIGltZ1xuICB9XG5cbiAgc3RhdGljIGZyb21JbWFnZURhdGEgKHNvdXJjZUltYWdlKSB7XG4gICAgc291cmNlSW1hZ2UgPSBSR0JBSW1hZ2VVOC5mcm9tSW1hZ2VEYXRhKHNvdXJjZUltYWdlKVxuXG4gICAgY29uc3QgaW1nID0gbmV3IEdyYXlJbWFnZUYzMk4wRjgoXG4gICAgICBuZXcgRmxvYXQzMkFycmF5KHNvdXJjZUltYWdlLndpZHRoICogc291cmNlSW1hZ2UuaGVpZ2h0KSxcbiAgICAgIHNvdXJjZUltYWdlLndpZHRoLFxuICAgICAgc291cmNlSW1hZ2UuaGVpZ2h0XG4gICAgKVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc291cmNlSW1hZ2Uud2lkdGggKiBzb3VyY2VJbWFnZS5oZWlnaHQ7IGkrKykge1xuICAgICAgaW1nLmRhdGFbaV0gPSBzcmdiQnJpZ2h0bmVzc1U4KC4uLnNvdXJjZUltYWdlLnBpeGVsKGkpKVxuICAgIH1cbiAgICByZXR1cm4gaW1nXG4gIH1cblxuICBub3JtYWxpemVTZWxmICgpIHtcbiAgICBjb25zdCBzdW0gPSB0aGlzLmRhdGEucmVkdWNlKChzdW0sIHYpID0+IHN1bSArIHYsIDApXG4gICAgdGhpcy5tYXBTZWxmKHYgPT4gdiAvIHN1bSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgdG9JbWFnZURhdGEgKCkge1xuICAgIGNvbnN0IGRhdGEgPSBuZXcgVWludDhDbGFtcGVkQXJyYXkodGhpcy5kYXRhLmxlbmd0aCAqIDQpXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGRhdGFbaSAqIDQgKyAwXSA9IGxpbmVhclRvU3JnYih0aGlzLmRhdGFbaV0pICogMjU1XG4gICAgICBkYXRhW2kgKiA0ICsgMV0gPSBsaW5lYXJUb1NyZ2IodGhpcy5kYXRhW2ldKSAqIDI1NVxuICAgICAgZGF0YVtpICogNCArIDJdID0gbGluZWFyVG9TcmdiKHRoaXMuZGF0YVtpXSkgKiAyNTVcbiAgICAgIGRhdGFbaSAqIDQgKyAzXSA9IDI1NVxuICAgIH1cbiAgICByZXR1cm4gbmV3IEltYWdlRGF0YShkYXRhLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodClcbiAgfVxuXG4gIGdhdXNzaWFuQmx1ciAoc3RkRGV2LCB7IGtlcm5lbFdpZHRoLCBrZXJuZWxIZWlnaHQgfSA9IHt9KSB7XG4gICAgY29uc3Qga2VybmVsID0gR3JheUltYWdlRjMyTjBGOC5nYXVzc2lhbktlcm5lbChzdGREZXYsIHtcbiAgICAgIHdpZHRoOiBrZXJuZWxXaWR0aCxcbiAgICAgIGhlaWdodDoga2VybmVsSGVpZ2h0XG4gICAgfSlcbiAgICByZXR1cm4gdGhpcy5jb252b2x2ZShrZXJuZWwpXG4gIH1cblxuICBmZnRHYXVzc2lhbkJsdXIgKHN0ZERldiwgeyBrZXJuZWxXaWR0aCwga2VybmVsSGVpZ2h0IH0gPSB7fSkge1xuICAgIC8vIEZvciBub3cuLi5cbiAgICBrZXJuZWxXaWR0aCA9IHRoaXMud2lkdGhcbiAgICBrZXJuZWxIZWlnaHQgPSB0aGlzLmhlaWdodFxuICAgIGNvbnN0IGtleSA9IGAke3N0ZERldn06JHtrZXJuZWxXaWR0aH06JHtrZXJuZWxIZWlnaHR9YFxuICAgIGlmICghZmZ0R2F1c3NDYWNoZS5oYXMoa2V5KSkge1xuICAgICAgY29uc3Qga2VybmVsID0gR3JheUltYWdlRjMyTjBGOC5nYXVzc2lhbktlcm5lbChzdGREZXYsIHtcbiAgICAgICAgd2lkdGg6IGtlcm5lbFdpZHRoLFxuICAgICAgICBoZWlnaHQ6IGtlcm5lbEhlaWdodFxuICAgICAgfSlcbiAgICAgICAgLnRvQ29tcGxleCgpXG4gICAgICAgIC5mZnRTZWxmKClcbiAgICAgICAgLmNlbnRlclNlbGYoKVxuICAgICAgZmZ0R2F1c3NDYWNoZS5zZXQoa2V5LCBrZXJuZWwpXG4gICAgfVxuICAgIHJldHVybiB0aGlzLnRvQ29tcGxleCgpXG4gICAgICAuZmZ0U2VsZigpXG4gICAgICAuY2VudGVyU2VsZigpXG4gICAgICAubXVsdGlwbHlTZWxmKGZmdEdhdXNzQ2FjaGUuZ2V0KGtleSkpXG4gICAgICAuY2VudGVyU2VsZigpXG4gICAgICAuaWZmdFNlbGYoKVxuICAgICAgLmNlbnRlclNlbGYoKVxuICAgICAgLmFicygpXG4gIH1cblxuICBjbGFtcFNlbGYgKHsgbWluID0gMCwgbWF4ID0gMSB9ID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5tYXBTZWxmKHYgPT4gY2xhbXAobWluLCB2LCBtYXgpKVxuICB9XG59XG5cbmNvbnN0IGdhbW1hID0gMi40XG5cbmV4cG9ydCBmdW5jdGlvbiBzcmdiVG9MaW5lYXIgKHYpIHtcbiAgaWYgKHYgPD0gMC4wNDA0NSkge1xuICAgIHJldHVybiB2IC8gMTIuOTVcbiAgfVxuICByZXR1cm4gTWF0aC5wb3coKHYgKyAwLjA1NSkgLyAxLjA1NSwgZ2FtbWEpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaW5lYXJUb1NyZ2IgKHYpIHtcbiAgaWYgKHYgPD0gMC4wMDMxMzA4KSB7XG4gICAgcmV0dXJuIDEyLjk1ICogdlxuICB9XG4gIHJldHVybiAxLjA1NSAqIE1hdGgucG93KHYsIDEgLyBnYW1tYSkgLSAwLjA1NVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYml0UmV2ZXJzZSAoeCwgbnVtQml0cykge1xuICAvLyBPaC1zby1jbGV2ZXIgYml0LWhhY2tlcnlcbiAgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNjAyMjY4NDUvcmV2ZXJzZS1iaXRzLWphdmFzY3JpcHRcbiAgeCA9ICgoeCAmIDB4NTU1NTU1NTUpIDw8IDEpIHwgKCh4ICYgMHhhYWFhYWFhYSkgPj4gMSlcbiAgeCA9ICgoeCAmIDB4MzMzMzMzMzMpIDw8IDIpIHwgKCh4ICYgMHhjY2NjY2NjYykgPj4gMilcbiAgeCA9ICgoeCAmIDB4MGYwZjBmMGYpIDw8IDQpIHwgKCh4ICYgMHhmMGYwZjBmMCkgPj4gNClcbiAgeCA9ICgoeCAmIDB4MDBmZjAwZmYpIDw8IDgpIHwgKCh4ICYgMHhmZjAwZmYwMCkgPj4gOClcbiAgeCA9ICgoeCAmIDB4MDAwMGZmZmYpIDw8IDE2KSB8ICgoeCAmIDB4ZmZmZjAwMDApID4+IDE2KVxuXG4gIC8vIFNsaWdodCBhbWVuZG1lbnQgaGVyZTogVGhlIGZ1bmN0aW9uIGFzc3VtZXMgMzIgYml0IGFyZSBwcmVzZW50XG4gIC8vIHRvIHJldmVyc2UsIGJ1dCB3ZSBvbmx5IHdhbnQgYG51bUJpdHNgLiBTbyBzaGlmdCBpbiB0aGUgZW5kIGFjY29yZGluZ2x5LlxuICByZXR1cm4geCA+Pj4gKDMyIC0gbnVtQml0cylcbn1cblxuZXhwb3J0IGNsYXNzIEltYWdlQ29tcGxleEY2NCBleHRlbmRzIEltYWdlIHtcbiAgc3RhdGljIGdldCBCVUZGRVJfVFlQRSAoKSB7XG4gICAgcmV0dXJuIEZsb2F0NjRBcnJheVxuICB9XG5cbiAgc3RhdGljIGdldCBOVU1fQ0hBTk5FTFMgKCkge1xuICAgIHJldHVybiAyXG4gIH1cblxuICByZWFsICgpIHtcbiAgICBjb25zdCBpbWcgPSBHcmF5SW1hZ2VGMzJOMEY4LmVtcHR5KHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KVxuICAgIGZvciAoY29uc3QgcCBvZiBpbWcuYWxsQ29vcmRpbmF0ZXMoKSkge1xuICAgICAgY29uc3QgeyByZSB9ID0gdGhpcy52YWx1ZUF0KHApXG4gICAgICBpbWcuc2V0VmFsdWVBdChwLCByZSlcbiAgICB9XG4gICAgcmV0dXJuIGltZ1xuICB9XG5cbiAgaW1hZ2luYXJ5ICgpIHtcbiAgICBjb25zdCBpbWcgPSBHcmF5SW1hZ2VGMzJOMEY4LmVtcHR5KHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KVxuICAgIGZvciAoY29uc3QgcCBvZiBpbWcuYWxsQ29vcmRpbmF0ZXMoKSkge1xuICAgICAgY29uc3QgeyBpbSB9ID0gdGhpcy52YWx1ZUF0KHApXG4gICAgICBpbWcuc2V0VmFsdWVBdChwLCBpbSlcbiAgICB9XG4gICAgcmV0dXJuIGltZ1xuICB9XG5cbiAgYWJzICgpIHtcbiAgICBjb25zdCBpbWcgPSBHcmF5SW1hZ2VGMzJOMEY4LmVtcHR5KHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KVxuICAgIGZvciAoY29uc3QgcCBvZiBpbWcuYWxsQ29vcmRpbmF0ZXMoKSkge1xuICAgICAgY29uc3QgeyByZSwgaW0gfSA9IHRoaXMudmFsdWVBdChwKVxuICAgICAgaW1nLnNldFZhbHVlQXQocCwgTWF0aC5zcXJ0KHJlICoqIDIgKyBpbSAqKiAyKSlcbiAgICB9XG4gICAgcmV0dXJuIGltZ1xuICB9XG5cbiAgdmFsdWVBdCAoeyB4LCB5IH0sIHsgd3JhcCA9IGZhbHNlIH0gPSB7fSkge1xuICAgIGlmICh3cmFwKSB7XG4gICAgICAoeyB4LCB5IH0gPSB0aGlzLndyYXBDb29yZGluYXRlcyh7IHgsIHkgfSkpXG4gICAgfVxuICAgIGNvbnN0IG9mZnNldCA9IHRoaXMucGl4ZWxJbmRleCh4LCB5KSAqIHRoaXMuY29uc3RydWN0b3IuTlVNX0NIQU5ORUxTXG4gICAgY29uc3QgcmUgPSB0aGlzLmRhdGFbb2Zmc2V0ICsgMF1cbiAgICBjb25zdCBpbSA9IHRoaXMuZGF0YVtvZmZzZXQgKyAxXVxuICAgIHJldHVybiB7IHJlLCBpbSB9XG4gIH1cblxuICBzZXRWYWx1ZUF0ICh7IHgsIHkgfSwgeyByZSwgaW0gfSwgeyB3cmFwID0gZmFsc2UgfSA9IHt9KSB7XG4gICAgaWYgKHdyYXApIHtcbiAgICAgICh7IHgsIHkgfSA9IHRoaXMud3JhcENvb3JkaW5hdGVzKHsgeCwgeSB9KSlcbiAgICB9XG4gICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5waXhlbEluZGV4KHgsIHkpICogdGhpcy5jb25zdHJ1Y3Rvci5OVU1fQ0hBTk5FTFNcbiAgICB0aGlzLmRhdGFbb2Zmc2V0ICsgMF0gPSByZVxuICAgIHRoaXMuZGF0YVtvZmZzZXQgKyAxXSA9IGltXG4gIH1cblxuICBtdWx0aXBseVNlbGYgKG90aGVyKSB7XG4gICAgY29uc29sZS5hc3NlcnQoXG4gICAgICB0aGlzLndpZHRoID09PSBvdGhlci53aWR0aCAmJiB0aGlzLmhlaWdodCA9PT0gb3RoZXIuaGVpZ2h0LFxuICAgICAgJ0ltYWdlcyBuZWVkIHRvIGJlIHNhbWUgc2l6ZSdcbiAgICApXG4gICAgZm9yIChjb25zdCBwIG9mIHRoaXMuYWxsQ29vcmRpbmF0ZXMoKSkge1xuICAgICAgY29uc3QgdjEgPSB0aGlzLnZhbHVlQXQocClcbiAgICAgIGNvbnN0IHYyID0gb3RoZXIudmFsdWVBdChwKVxuICAgICAgdGhpcy5zZXRWYWx1ZUF0KHAsIHtcbiAgICAgICAgcmU6IHYxLnJlICogdjIucmUgKyB2MS5pbSAqIHYyLmltLFxuICAgICAgICBpbTogdjEucmUgKiB2Mi5pbSArIHYxLmltICogdjIucmVcbiAgICAgIH0pXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBjZW50ZXJTZWxmICgpIHtcbiAgICBjb25zb2xlLmFzc2VydChcbiAgICAgIHRoaXMud2lkdGggJSAyID09PSAwICYmIHRoaXMuaGVpZ2h0ICUgMiA9PT0gMCxcbiAgICAgICd3aWR0aCBhbmQgaGVpZ2h0IG11c3QgYmUgZXZlbidcbiAgICApXG5cbiAgICBjb25zdCBoYWxmV2lkdGggPSB0aGlzLndpZHRoIC8gMlxuICAgIGNvbnN0IGhhbGZIZWlnaHQgPSB0aGlzLmhlaWdodCAvIDJcbiAgICBmb3IgKGNvbnN0IHAxIG9mIHRoaXMuYWxsQ29vcmRpbmF0ZXMoKSkge1xuICAgICAgaWYgKHAxLnggPT09IDAgJiYgcDEueSA9PT0gaGFsZkhlaWdodCkge1xuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgY29uc3QgdjEgPSB0aGlzLnZhbHVlQXQocDEsIHsgd3JhcDogdHJ1ZSB9KVxuICAgICAgY29uc3QgcDIgPSB7IHg6IHAxLnggKyBoYWxmV2lkdGgsIHk6IHAxLnkgKyBoYWxmSGVpZ2h0IH1cbiAgICAgIGNvbnN0IHYyID0gdGhpcy52YWx1ZUF0KHAyLCB7IHdyYXA6IHRydWUgfSlcbiAgICAgIHRoaXMuc2V0VmFsdWVBdChwMSwgdjIsIHsgd3JhcDogdHJ1ZSB9KVxuICAgICAgdGhpcy5zZXRWYWx1ZUF0KHAyLCB2MSwgeyB3cmFwOiB0cnVlIH0pXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICB1bmNlbnRlclNlbGYgKCkge1xuICAgIGNvbnNvbGUuYXNzZXJ0KFxuICAgICAgdGhpcy53aWR0aCAlIDIgPT09IDAgJiYgdGhpcy5oZWlnaHQgJSAyID09PSAwLFxuICAgICAgJ3dpZHRoIGFuZCBoZWlnaHQgbXVzdCBiZSBldmVuJ1xuICAgIClcbiAgICAvLyBJdOKAmXMgaXRzIG93biBpbnZlcnNlISFcbiAgICByZXR1cm4gdGhpcy5jZW50ZXJTZWxmKClcbiAgfVxuXG4gIF9mZnQxU2VsZiAoc3RhcnQsIG51bSwgaW5jLCBzaWduID0gLTEpIHtcbiAgICBjb25zdCBiaXRzID0gTWF0aC5sb2cyKG51bSlcbiAgICAvLyBSZS1hcnJhbmdlIGRhdGEgdG8gYml0LXJldmVyc2VkIG9yZGVyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW07IGkrKykge1xuICAgICAgY29uc3QgYmkgPSBiaXRSZXZlcnNlKGksIGJpdHMpXG4gICAgICBpZiAoaSA+PSBiaSkge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuICAgICAgY29uc3QgcDEgPSB7IHg6IHN0YXJ0LnggKyBpICogaW5jLngsIHk6IHN0YXJ0LnkgKyBpICogaW5jLnkgfVxuICAgICAgY29uc3QgcDIgPSB7IHg6IHN0YXJ0LnggKyBiaSAqIGluYy54LCB5OiBzdGFydC55ICsgYmkgKiBpbmMueSB9XG4gICAgICBjb25zdCB2MSA9IHRoaXMudmFsdWVBdChwMSlcbiAgICAgIGNvbnN0IHYyID0gdGhpcy52YWx1ZUF0KHAyKVxuICAgICAgdGhpcy5zZXRWYWx1ZUF0KHAxLCB2MilcbiAgICAgIHRoaXMuc2V0VmFsdWVBdChwMiwgdjEpXG4gICAgfVxuXG4gICAgZm9yIChsZXQgcyA9IDE7IHMgPD0gYml0czsgcysrKSB7XG4gICAgICBjb25zdCBtID0gMiAqKiBzXG4gICAgICBjb25zdCB3bSA9IENvbXBsZXguZnJvbUV1bGVyKDEsIChzaWduICogMiAqIE1hdGguUEkpIC8gbSlcbiAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgbnVtOyBrICs9IG0pIHtcbiAgICAgICAgY29uc3QgdyA9IENvbXBsZXguZnJvbUV1bGVyKDEsIDApXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbSAvIDI7IGorKykge1xuICAgICAgICAgIGNvbnN0IHB0ID0ge1xuICAgICAgICAgICAgeDogc3RhcnQueCArIChrICsgaiArIG0gLyAyKSAqIGluYy54LFxuICAgICAgICAgICAgeTogc3RhcnQueSArIChrICsgaiArIG0gLyAyKSAqIGluYy55XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHQgPSB3LmNvcHkoKS5tdWx0aXBseVNlbGYodGhpcy52YWx1ZUF0KHB0KSlcbiAgICAgICAgICBjb25zdCBwdSA9IHtcbiAgICAgICAgICAgIHg6IHN0YXJ0LnggKyAoayArIGopICogaW5jLngsXG4gICAgICAgICAgICB5OiBzdGFydC55ICsgKGsgKyBqKSAqIGluYy55XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHUgPSBDb21wbGV4LmZyb21DYXJ0ZXNpYW5PYmplY3QodGhpcy52YWx1ZUF0KHB1KSlcbiAgICAgICAgICB0aGlzLnNldFZhbHVlQXQocHUsIHUuY29weSgpLmFkZFNlbGYodCkpXG4gICAgICAgICAgdGhpcy5zZXRWYWx1ZUF0KHB0LCB1LmNvcHkoKS5zdWJ0cmFjdFNlbGYodCkpXG4gICAgICAgICAgdy5tdWx0aXBseVNlbGYod20pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGZmdFNlbGYgKCkge1xuICAgIHJldHVybiB0aGlzLl9mZnQyU2VsZigtMSlcbiAgfVxuXG4gIG1hcFNlbGYgKGYpIHtcbiAgICBmb3IgKGNvbnN0IGMgb2YgdGhpcy5hbGxDb29yZGluYXRlcygpKSB7XG4gICAgICB0aGlzLnNldFZhbHVlQXQoYywgZih0aGlzLnZhbHVlQXQoYykpKVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgaWZmdFNlbGYgKCkge1xuICAgIGNvbnN0IG4gPSB0aGlzLndpZHRoICogdGhpcy5oZWlnaHRcbiAgICByZXR1cm4gdGhpcy5fZmZ0MlNlbGYoMSkubWFwU2VsZih2ID0+IHtcbiAgICAgIHYucmUgLz0gblxuICAgICAgdi5pbSAvPSBuXG4gICAgICByZXR1cm4gdlxuICAgIH0pXG4gIH1cblxuICBfZmZ0MlNlbGYgKHNpZ24gPSAtMSkge1xuICAgIGNvbnNvbGUuYXNzZXJ0KHRoaXMud2lkdGggPT09IHRoaXMuaGVpZ2h0LCAnQ2FuIG9ubHkgZmZ0IHNxdWFyZSBpbWFnZXMnKVxuICAgIGNvbnN0IG51bUJpdHMgPSBNYXRoLmxvZzIodGhpcy53aWR0aClcbiAgICBjb25zb2xlLmFzc2VydChcbiAgICAgIG51bUJpdHMgPT09IE1hdGguZmxvb3IobnVtQml0cyksXG4gICAgICAnQ2FuIG9ubHkgZmZ0IGltYWdlcyB3aG9zZSBzaXplIGlzIGEgcG93ZXIgb2YgMidcbiAgICApXG5cbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuaGVpZ2h0OyB5KyspIHtcbiAgICAgIHRoaXMuX2ZmdDFTZWxmKHsgeDogMCwgeSB9LCB0aGlzLndpZHRoLCB7IHg6IDEsIHk6IDAgfSwgc2lnbilcbiAgICB9XG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLndpZHRoOyB4KyspIHtcbiAgICAgIHRoaXMuX2ZmdDFTZWxmKHsgeCwgeTogMCB9LCB0aGlzLmhlaWdodCwgeyB4OiAwLCB5OiAxIH0sIHNpZ24pXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENvbXBsZXgge1xuICBjb25zdHJ1Y3RvciAocmUsIGltKSB7XG4gICAgdGhpcy5yZSA9IHJlXG4gICAgdGhpcy5pbSA9IGltXG4gIH1cblxuICBzdGF0aWMgZnJvbUNhcnRlc2lhbk9iamVjdCAoeyByZSA9IDAsIGltID0gMCB9ID0ge30pIHtcbiAgICByZXR1cm4gbmV3IENvbXBsZXgocmUsIGltKVxuICB9XG5cbiAgc3RhdGljIGZyb21FdWxlciAociA9IDAsIHBoaSA9IDApIHtcbiAgICByZXR1cm4gbmV3IENvbXBsZXgociAqIE1hdGguY29zKHBoaSksIHIgKiBNYXRoLnNpbihwaGkpKVxuICB9XG5cbiAgY29weSAoKSB7XG4gICAgcmV0dXJuIG5ldyBDb21wbGV4KHRoaXMucmUsIHRoaXMuaW0pXG4gIH1cblxuICBhZGRTZWxmIChvdGhlcikge1xuICAgIHRoaXMucmUgKz0gb3RoZXIucmVcbiAgICB0aGlzLmltICs9IG90aGVyLmltXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHN1YnRyYWN0U2VsZiAob3RoZXIpIHtcbiAgICB0aGlzLnJlIC09IG90aGVyLnJlXG4gICAgdGhpcy5pbSAtPSBvdGhlci5pbVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBtdWx0aXBseVNlbGYgKG90aGVyKSB7XG4gICAgY29uc3QgeyByZSwgaW0gfSA9IHRoaXNcbiAgICB0aGlzLnJlID0gcmUgKiBvdGhlci5yZSAtIGltICogb3RoZXIuaW1cbiAgICB0aGlzLmltID0gcmUgKiBvdGhlci5pbSArIGltICogb3RoZXIucmVcbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gd2VpZ2h0R2VuZXJhdG9yIChsZW5ndGgsIHJhdGlvKSB7XG4gIHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoIH0sIChfLCBpKSA9PiBNYXRoLnBvdyhyYXRpbywgaSAvIChsZW5ndGggLSAxKSkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiogaGlsYmVydEN1cnZlIChuKSB7XG4gIGlmIChuID09PSAxKSB7XG4gICAgeWllbGQgJ0EnXG4gICAgcmV0dXJuXG4gIH1cbiAgZm9yIChjb25zdCBpbnN0ciBvZiBoaWxiZXJ0Q3VydmUobiAtIDEpKSB7XG4gICAgc3dpdGNoIChpbnN0cikge1xuICAgICAgY2FzZSAnQSc6XG4gICAgICAgIHlpZWxkICogJytCRi1BRkEtRkIrJy5zcGxpdCgnJylcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ0InOlxuICAgICAgICB5aWVsZCAqICctQUYrQkZCK0ZBLScuc3BsaXQoJycpXG4gICAgICAgIGJyZWFrXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB5aWVsZCBpbnN0clxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24qIGxzeXN0ZW0yY29vcmRpbmF0ZXMgKGl0KSB7XG4gIGxldCBkaXJlY3Rpb24gPSAwXG4gIGxldCB4ID0gMFxuICBsZXQgeSA9IDBcbiAgeWllbGQgeyB4LCB5IH1cblxuICBmb3IgKGNvbnN0IGluc3RyIG9mIGl0KSB7XG4gICAgc3dpdGNoIChpbnN0cikge1xuICAgICAgY2FzZSAnRic6XG4gICAgICAgIHggKz0gTWF0aC5jb3MoZGlyZWN0aW9uKVxuICAgICAgICB5ICs9IE1hdGguc2luKGRpcmVjdGlvbilcbiAgICAgICAgeWllbGQgeyB4OiBNYXRoLnJvdW5kKHgpLCB5OiBNYXRoLnJvdW5kKHkpIH1cbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJysnOlxuICAgICAgICBkaXJlY3Rpb24gKz0gTWF0aC5QSSAvIDJcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJy0nOlxuICAgICAgICBkaXJlY3Rpb24gLT0gTWF0aC5QSSAvIDJcbiAgICAgICAgYnJlYWtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uKiBoaWxiZXJ0Q3VydmVHZW5lcmF0b3IgKHdpZHRoLCBoZWlnaHQpIHtcbiAgY29uc3QgbiA9IE1hdGguY2VpbChNYXRoLmxvZzIoTWF0aC5tYXgod2lkdGgsIGhlaWdodCkpKVxuICB5aWVsZCAqIGxzeXN0ZW0yY29vcmRpbmF0ZXMoaGlsYmVydEN1cnZlKG4gKyAxKSlcbn1cbiIsImltcG9ydCB7IE1lc3NhZ2VTdHJlYW0sIG1lc3NhZ2UgfSBmcm9tICcuL3dvcmtlci11dGlscy5qcydcbmltcG9ydCB7IEdyYXlJbWFnZUYzMk4wRjggfSBmcm9tICcuL2ltYWdlLXV0aWxzLmpzJ1xuaW1wb3J0IHsgaGlsYmVydEN1cnZlR2VuZXJhdG9yLCB3ZWlnaHRHZW5lcmF0b3IgfSBmcm9tICcuL2N1cnZlLXV0aWxzLmpzJ1xuXG4vKiBsZXQgbXlCbHVlbm9pc2VEdXJhdGlvblxuY29uc3QgbXlCbHVlbm9pc2VQcm9taXNlID0gbWVzc2FnZShzZWxmLCAnYmx1ZW5vaXNlJykudGhlbihcbiAgKHsgbWFzaywgZHVyYXRpb24gfSkgPT4ge1xuICAgIG15Qmx1ZW5vaXNlRHVyYXRpb24gPSBkdXJhdGlvblxuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihtYXNrLCBHcmF5SW1hZ2VGMzJOMEY4LnByb3RvdHlwZSlcbiAgICByZXR1cm4gbWFza1xuICB9XG4pICovXG5cbmNvbnN0IG51bUJheWVyTGV2ZWxzID0gNFxuY29uc3QgYmF5ZXJMZXZlbHMgPSBtZXNzYWdlKHNlbGYsICdiYXllcmxldmVscycpLnRoZW4oKHsgYmF5ZXJMZXZlbHMgfSkgPT5cbiAgYmF5ZXJMZXZlbHMubWFwKGJsID0+IE9iamVjdC5zZXRQcm90b3R5cGVPZihibCwgR3JheUltYWdlRjMyTjBGOC5wcm90b3R5cGUpKVxuKVxuXG5jb25zdCBwaXBlbGluZSA9IFtcbiAge1xuICAgIGlkOiAncXVhbnRpemVkJyxcbiAgICB0aXRsZTogJ1F1YW50aXplZCcsXG4gICAgYXN5bmMgcHJvY2VzcyAoZ3JheXNjYWxlKSB7XG4gICAgICByZXR1cm4gZ3JheXNjYWxlLmNvcHkoKS5tYXBTZWxmKHYgPT4gKHYgPiAwLjUgPyAxLjAgOiAwLjApKVxuICAgIH1cbiAgfSxcbiAge1xuICAgIGlkOiAncmFuZG9tJyxcbiAgICB0aXRsZTogJ0RpdGhlcmluZycsXG4gICAgYXN5bmMgcHJvY2VzcyAoZ3JheXNjYWxlKSB7XG4gICAgICByZXR1cm4gZ3JheXNjYWxlLmNvcHkoKS5tYXBTZWxmKHYgPT4gKHYgPiBNYXRoLnJhbmRvbSgpID8gMS4wIDogMC4wKSlcbiAgICB9XG4gIH0sXG4gIC4uLkFycmF5LmZyb20oeyBsZW5ndGg6IG51bUJheWVyTGV2ZWxzIH0sIChfLCBsZXZlbCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBpZDogYGJheWVyLSR7bGV2ZWx9YCxcbiAgICAgIHRpdGxlOiBgQmF5ZXIgTGV2ZWwgJHtsZXZlbH1gLFxuICAgICAgYXN5bmMgcHJvY2VzcyAoZ3JheXNjYWxlLCB7IGJheWVyTGV2ZWxzIH0pIHtcbiAgICAgICAgY29uc3QgYmF5ZXJMZXZlbCA9IChhd2FpdCBiYXllckxldmVscylbbGV2ZWxdXG4gICAgICAgIHJldHVybiBncmF5c2NhbGVcbiAgICAgICAgICAuY29weSgpXG4gICAgICAgICAgLm1hcFNlbGYoKHYsIHsgeCwgeSB9KSA9PlxuICAgICAgICAgICAgdiA+IGJheWVyTGV2ZWwudmFsdWVBdCh7IHgsIHkgfSwgeyB3cmFwOiB0cnVlIH0pID8gMS4wIDogMC4wXG4gICAgICAgICAgKVxuICAgICAgfVxuICAgIH1cbiAgfSksXG4gIHtcbiAgICBpZDogJ2VycmRpZmYyZCcsXG4gICAgdGl0bGU6ICdTaW1wbGUgRXJyb3IgRGlmZnVzaW9uJyxcbiAgICBhc3luYyBwcm9jZXNzIChncmF5c2NhbGUpIHtcbiAgICAgIHJldHVybiBtYXRyaXhFcnJvckRpZmZ1c2lvbihcbiAgICAgICAgZ3JheXNjYWxlLmNvcHkoKSxcbiAgICAgICAgbmV3IEdyYXlJbWFnZUYzMk4wRjgobmV3IEZsb2F0MzJBcnJheShbMCwgMSwgMSwgMF0pLCAyLCAyKSxcbiAgICAgICAgdiA9PiAodiA+IDAuNSA/IDEuMCA6IDAuMClcbiAgICAgIClcbiAgICB9XG4gIH0sXG4gIHtcbiAgICBpZDogJ2Zsb3lkc3RlaW5iZXJnJyxcbiAgICB0aXRsZTogJ0Zsb3lkLVN0ZWluYmVyZyBEaWZmdXNpb24nLFxuICAgIGFzeW5jIHByb2Nlc3MgKGdyYXlzY2FsZSkge1xuICAgICAgcmV0dXJuIG1hdHJpeEVycm9yRGlmZnVzaW9uKFxuICAgICAgICBncmF5c2NhbGUuY29weSgpLFxuICAgICAgICBuZXcgR3JheUltYWdlRjMyTjBGOChuZXcgRmxvYXQzMkFycmF5KFswLCAwLCA3LCAxLCA1LCAzXSksIDMsIDIpLFxuICAgICAgICB2ID0+ICh2ID4gMC41ID8gMS4wIDogMC4wKVxuICAgICAgKVxuICAgIH1cbiAgfSxcbiAge1xuICAgIGlkOiAnampuJyxcbiAgICB0aXRsZTogJ0phcnZpcy1KdWRpY2UtTmlua2UgRGlmZnVzaW9uJyxcbiAgICBhc3luYyBwcm9jZXNzIChncmF5c2NhbGUpIHtcbiAgICAgIHJldHVybiBtYXRyaXhFcnJvckRpZmZ1c2lvbihcbiAgICAgICAgZ3JheXNjYWxlLmNvcHkoKSxcbiAgICAgICAgbmV3IEdyYXlJbWFnZUYzMk4wRjgoXG4gICAgICAgICAgbmV3IEZsb2F0MzJBcnJheShbMCwgMCwgMCwgNywgNSwgMywgNSwgNywgNSwgMywgMSwgMywgNSwgMywgMV0pLFxuICAgICAgICAgIDUsXG4gICAgICAgICAgM1xuICAgICAgICApLFxuICAgICAgICB2ID0+ICh2ID4gMC41ID8gMS4wIDogMC4wKVxuICAgICAgKVxuICAgIH1cbiAgfSxcbiAge1xuICAgIGlkOiAnYXRraW5zb24nLFxuICAgIHRpdGxlOiAnQXRraW5zb24gRGl0aGVyJyxcbiAgICBhc3luYyBwcm9jZXNzIChncmF5c2NhbGUpIHtcbiAgICAgIHJldHVybiBtYXRyaXhFcnJvckRpZmZ1c2lvbihcbiAgICAgICAgZ3JheXNjYWxlLmNvcHkoKSxcbiAgICAgICAgbmV3IEdyYXlJbWFnZUYzMk4wRjgoXG4gICAgICAgICAgbmV3IEZsb2F0MzJBcnJheShbMCwgMCwgMSAvIDgsIDEgLyA4LCAxIC8gOCwgMSAvIDgsIDEgLyA4LCAwLCAwLCAxIC8gOCwgMCwgMF0pLFxuICAgICAgICAgIDQsXG4gICAgICAgICAgM1xuICAgICAgICApLFxuICAgICAgICB2ID0+ICh2ID4gMC41ID8gMS4wIDogMC4wKSxcbiAgICAgICAgeyBub3JtYWxpemU6IGZhbHNlIH1cbiAgICAgIClcbiAgICB9XG4gIH0sXG4gIHtcbiAgICBpZDogJ3JpZW1lcnNtYScsXG4gICAgdGl0bGU6ICdSaWVtZXJzbWEgRGl0aGVyJyxcbiAgICBhc3luYyBwcm9jZXNzIChncmF5c2NhbGUpIHtcbiAgICAgIHJldHVybiBjdXJ2ZUVycm9yRGlmZnVzaW9uKFxuICAgICAgICBncmF5c2NhbGUuY29weSgpLFxuICAgICAgICBoaWxiZXJ0Q3VydmVHZW5lcmF0b3IsXG4gICAgICAgIHdlaWdodEdlbmVyYXRvcigzMiwgMSAvIDgpLFxuICAgICAgICB2ID0+ICh2ID4gMC41ID8gMS4wIDogMC4wKVxuICAgICAgKVxuICAgIH1cbiAgfVxuICAvKiB7XG4gICAgaWQ6ICdteWJsdWVub2lzZScsXG4gICAgdGl0bGU6ICgpID0+XG4gICAgICBgQmx1ZSBOb2lzZSAoJHtcbiAgICAgICAgbXlCbHVlbm9pc2VEdXJhdGlvblxuICAgICAgICAgID8gYCR7bXlCbHVlbm9pc2VEdXJhdGlvbi50b0ZpeGVkKDEpfW1zYFxuICAgICAgICAgIDogJ3Rha2VzIGEgYml0Li4uJ1xuICAgICAgfSlgLFxuICAgIGFzeW5jIHByb2Nlc3MgKGdyYXlzY2FsZSkge1xuICAgICAgY29uc3QgYmx1ZW5vaXNlID0gYXdhaXQgbXlCbHVlbm9pc2VQcm9taXNlXG4gICAgICBjb25zdCByZXN1bHQgPSBncmF5c2NhbGUuY29weSgpXG4gICAgICBmb3IgKGNvbnN0IHsgeCwgeSwgcGl4ZWwgfSBvZiByZXN1bHQuYWxsUGl4ZWxzKCkpIHtcbiAgICAgICAgcGl4ZWxbMF0gPSBwaXhlbFswXSArIGJsdWVub2lzZS5waXhlbEF0KHgsIHksIHsgd3JhcDogdHJ1ZSB9KVswXSAtIDAuNVxuICAgICAgICBwaXhlbFswXSA9IHBpeGVsWzBdID4gMC41ID8gMS4wIDogMC4wXG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0XG4gICAgfVxuICB9ICovXG5dXG5cbmZ1bmN0aW9uIGN1cnZlRXJyb3JEaWZmdXNpb24gKGltZywgY3VydmUsIHdlaWdodHMsIHF1YW50Rikge1xuICBjb25zdCBjdXJ2ZUl0ID0gY3VydmUoaW1nLndpZHRoLCBpbWcuaGVpZ2h0KVxuICBjb25zdCBlcnJvcnMgPSBBcnJheS5mcm9tKHdlaWdodHMsICgpID0+IDApXG4gIGZvciAoY29uc3QgcCBvZiBjdXJ2ZUl0KSB7XG4gICAgaWYgKCFpbWcuaXNJbkJvdW5kcyhwLngsIHAueSkpIHtcbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuICAgIGNvbnN0IG9yaWdpbmFsID0gaW1nLnZhbHVlQXQocClcbiAgICBjb25zdCBxdWFudGl6ZWQgPSBxdWFudEYoXG4gICAgICBvcmlnaW5hbCArIGVycm9ycy5yZWR1Y2UoKHN1bSwgYywgaSkgPT4gc3VtICsgYyAqIHdlaWdodHNbaV0pXG4gICAgKVxuICAgIGVycm9ycy5wb3AoKVxuICAgIGVycm9ycy51bnNoaWZ0KG9yaWdpbmFsIC0gcXVhbnRpemVkKVxuICAgIGltZy5zZXRWYWx1ZUF0KHAsIHF1YW50aXplZClcbiAgfVxuICByZXR1cm4gaW1nXG59XG5cbmZ1bmN0aW9uIG1hdHJpeEVycm9yRGlmZnVzaW9uIChpbWcsIGRpZmZ1c29yLCBxdWFudGl6ZUZ1bmMsIHsgbm9ybWFsaXplID0gdHJ1ZSB9ID0ge30pIHtcbiAgaWYgKG5vcm1hbGl6ZSkge1xuICAgIGRpZmZ1c29yLm5vcm1hbGl6ZVNlbGYoKVxuICB9XG4gIGZvciAoY29uc3QgeyB4LCB5LCBwaXhlbCB9IG9mIGltZy5hbGxQaXhlbHMoKSkge1xuICAgIGNvbnN0IG9yaWdpbmFsID0gcGl4ZWxbMF1cbiAgICBjb25zdCBxdWFudGl6ZWQgPSBxdWFudGl6ZUZ1bmMob3JpZ2luYWwpXG4gICAgcGl4ZWxbMF0gPSBxdWFudGl6ZWRcbiAgICBjb25zdCBlcnJvciA9IG9yaWdpbmFsIC0gcXVhbnRpemVkXG4gICAgZm9yIChjb25zdCB7XG4gICAgICB4OiBkaWZmWCxcbiAgICAgIHk6IGRpZmZZLFxuICAgICAgcGl4ZWw6IGRpZmZQaXhlbFxuICAgIH0gb2YgZGlmZnVzb3IuYWxsUGl4ZWxzKCkpIHtcbiAgICAgIGNvbnN0IG9mZnNldFggPSBkaWZmWCAtIE1hdGguZmxvb3IoKGRpZmZ1c29yLndpZHRoIC0gMSkgLyAyKVxuICAgICAgY29uc3Qgb2Zmc2V0WSA9IGRpZmZZXG4gICAgICBpZiAoaW1nLmlzSW5Cb3VuZHMoeCArIG9mZnNldFgsIHkgKyBvZmZzZXRZKSkge1xuICAgICAgICBjb25zdCBwaXhlbCA9IGltZy5waXhlbEF0KHggKyBvZmZzZXRYLCB5ICsgb2Zmc2V0WSlcbiAgICAgICAgcGl4ZWxbMF0gPSBwaXhlbFswXSArIGVycm9yICogZGlmZlBpeGVsWzBdXG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBpbWdcbn1cblxuYXN5bmMgZnVuY3Rpb24gaW5pdCAoKSB7XG4gIGNvbnN0IHJlYWRlciA9IE1lc3NhZ2VTdHJlYW0oKS5nZXRSZWFkZXIoKVxuXG4gIHdoaWxlICh0cnVlKSB7XG4gICAgY29uc3Qge1xuICAgICAgdmFsdWU6IHsgaW1hZ2UsIGlkIH1cbiAgICB9ID0gYXdhaXQgcmVhZGVyLnJlYWQoKVxuICAgIGlmIChpZCAhPT0gJ2ltYWdlJykge1xuICAgICAgY29udGludWVcbiAgICB9XG5cbiAgICBwb3N0TWVzc2FnZSh7XG4gICAgICB0eXBlOiAncmVzdWx0JyxcbiAgICAgIGlkOiAnb3JpZ2luYWwnLFxuICAgICAgdGl0bGU6ICdPcmlnaW5hbCcsXG4gICAgICBpbWFnZURhdGE6IGltYWdlXG4gICAgfSlcblxuICAgIGNvbnN0IGdyYXlzY2FsZSA9IEdyYXlJbWFnZUYzMk4wRjguZnJvbUltYWdlRGF0YShpbWFnZSlcbiAgICBwb3N0TWVzc2FnZSh7XG4gICAgICB0eXBlOiAncmVzdWx0JyxcbiAgICAgIGlkOiAnZ3JheXNjYWxlJyxcbiAgICAgIHRpdGxlOiAnR3JheXNjYWxlJyxcbiAgICAgIGltYWdlRGF0YTogZ3JheXNjYWxlLnRvSW1hZ2VEYXRhKClcbiAgICB9KVxuXG4gICAgZm9yIChjb25zdCBzdGVwIG9mIHBpcGVsaW5lKSB7XG4gICAgICBsZXQgdGl0bGUgPSBzdGVwLnRpdGxlXG4gICAgICBpZiAodHlwZW9mIHN0ZXAudGl0bGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGl0bGUgPSBzdGVwLnRpdGxlKClcbiAgICAgIH1cbiAgICAgIHBvc3RNZXNzYWdlKHtcbiAgICAgICAgdHlwZTogJ3N0YXJ0ZWQnLFxuICAgICAgICBpZDogc3RlcC5pZCxcbiAgICAgICAgdGl0bGVcbiAgICAgIH0pXG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBzdGVwLnByb2Nlc3MoZ3JheXNjYWxlLCB7IGJheWVyTGV2ZWxzIH0pXG4gICAgICBpZiAodHlwZW9mIHN0ZXAudGl0bGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGl0bGUgPSBzdGVwLnRpdGxlKClcbiAgICAgIH1cbiAgICAgIHBvc3RNZXNzYWdlKHtcbiAgICAgICAgdHlwZTogJ3Jlc3VsdCcsXG4gICAgICAgIHRpdGxlLFxuICAgICAgICBpZDogc3RlcC5pZCxcbiAgICAgICAgaW1hZ2VEYXRhOiByZXN1bHQudG9JbWFnZURhdGEoKVxuICAgICAgfSlcbiAgICB9XG4gIH1cbn1cbmluaXQoKVxuIl0sIm5hbWVzIjpbInN1bSIsImJheWVyTGV2ZWxzIiwicGl4ZWwiXSwibWFwcGluZ3MiOiI7O0FBQU8sV0FBUyxnQkFBaUI7QUFDL0IsV0FBTyxJQUFJLGVBQWU7QUFBQSxNQUN4QixNQUFPLFlBQVk7QUFDakIsYUFBSyxpQkFBaUIsV0FBVyxRQUFNLFdBQVcsUUFBUSxHQUFHLElBQUksQ0FBQztBQUFBLE1BQ3BFO0FBQUEsSUFDSixDQUFHO0FBQUEsRUFDSDtBQUVPLFdBQVMsUUFBUyxRQUFRLElBQUk7QUFDbkMsV0FBTyxJQUFJLFFBQVEsYUFBVztBQUM1QixhQUFPLGlCQUFpQixXQUFXLFNBQVMsRUFBRyxFQUFFLEtBQUksR0FBSTtBQUN2RCxZQUFJLEtBQUssT0FBTyxJQUFJO0FBQ2xCO0FBQUEsUUFDRjtBQUNBLGVBQU8sb0JBQW9CLFdBQVcsQ0FBQztBQUN2QyxnQkFBUSxJQUFJO0FBQUEsTUFDZCxDQUFDO0FBQUEsSUFDSCxDQUFDO0FBQUEsRUFDSDtBQ29CTyxXQUFTLE1BQU8sS0FBSyxHQUFHLEtBQUs7QUFDbEMsUUFBSSxJQUFJLEtBQUs7QUFDWCxhQUFPO0FBQUEsSUFDVDtBQUNBLFFBQUksSUFBSSxLQUFLO0FBQ1gsYUFBTztBQUFBLElBQ1Q7QUFDQSxXQUFPO0FBQUEsRUFDVDtBQUVPLFdBQVMscUJBQXNCLEdBQUcsR0FBRyxHQUFHO0FBQzdDLFdBQU8sT0FBTyxJQUFJLE9BQU8sSUFBSSxPQUFPO0FBQUEsRUFDdEM7QUFFTyxXQUFTLG1CQUFvQixHQUFHLEdBQUcsR0FBRztBQUMzQyxXQUFPO0FBQUEsTUFDTCxhQUFhLENBQUM7QUFBQSxNQUNkLGFBQWEsQ0FBQztBQUFBLE1BQ2QsYUFBYSxDQUFDO0FBQUEsSUFDbEI7QUFBQSxFQUNBO0FBRU8sV0FBUyxpQkFBa0IsR0FBRyxHQUFHLEdBQUc7QUFDekMsV0FBTyxtQkFBbUIsSUFBSSxLQUFLLElBQUksS0FBSyxJQUFJLEdBQUc7QUFBQSxFQUNyRDtBQUFBLEVBRU8sTUFBTSxNQUFNO0FBQUEsSUFDakIsWUFBYSxNQUFNLE9BQU8sUUFBUTtBQUNoQyxXQUFLLE9BQU87QUFDWixXQUFLLFFBQVE7QUFDYixXQUFLLFNBQVM7QUFBQSxJQUNoQjtBQUFBLElBRUEsT0FBTyxNQUFPLE9BQU8sUUFBUTtBQUMzQixZQUFNLFNBQVMsSUFBSSxLQUFLLFlBQVksUUFBUSxTQUFTLEtBQUssWUFBWTtBQUN0RSxhQUFPLEtBQUssQ0FBQztBQUNiLGFBQU8sSUFBSSxLQUFLLFFBQVEsT0FBTyxNQUFNO0FBQUEsSUFDdkM7QUFBQSxJQUVBLFdBQVksR0FBRyxHQUFHO0FBQ2hCLGFBQU8sSUFBSSxLQUFLLFFBQVE7QUFBQSxJQUMxQjtBQUFBLElBRUEsY0FBZSxHQUFHO0FBQ2hCLGFBQU87QUFBQSxRQUNMLEdBQUcsSUFBSSxLQUFLO0FBQUEsUUFDWixHQUFHLEtBQUssTUFBTSxJQUFJLEtBQUssS0FBSztBQUFBLE1BQ2xDO0FBQUEsSUFDRTtBQUFBLElBRUEsTUFBTyxLQUFLO0FBQ1YsYUFBTyxJQUFJLEtBQUssS0FBSztBQUFBLFFBQ25CLEtBQUssS0FBSztBQUFBLFFBQ1YsS0FBSyxLQUFLLGFBQ1IsTUFBTSxLQUFLLFlBQVksZUFBZSxLQUFLLEtBQUs7QUFBQSxRQUNsRCxLQUFLLFlBQVk7QUFBQSxNQUN2QjtBQUFBLElBQ0U7QUFBQSxJQUVBLGdCQUFpQixFQUFFLEdBQUcsS0FBSztBQUN6QixVQUFJLElBQUksS0FBSztBQUNiLFVBQUksSUFBSSxFQUFHLE1BQUssS0FBSztBQUNyQixVQUFJLElBQUksS0FBSztBQUNiLFVBQUksSUFBSSxFQUFHLE1BQUssS0FBSztBQUNyQixhQUFPLEVBQUUsR0FBRyxFQUFDO0FBQUEsSUFDZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQU9BLFFBQVMsR0FBRyxHQUFHLEVBQUUsT0FBTyxNQUFLLElBQUssSUFBSTtBQUNwQyxVQUFJLE1BQU07QUFDUixTQUFDLEVBQUUsR0FBRyxNQUFNLEtBQUssZ0JBQWdCLEVBQUUsR0FBRyxHQUFHO0FBQUEsTUFDM0MsT0FBTztBQUNMLFlBQUksTUFBTSxHQUFHLEdBQUcsS0FBSyxRQUFRLENBQUM7QUFDOUIsWUFBSSxNQUFNLEdBQUcsR0FBRyxLQUFLLFNBQVMsQ0FBQztBQUFBLE1BQ2pDO0FBQ0EsWUFBTSxNQUFNLEtBQUssV0FBVyxHQUFHLENBQUM7QUFDaEMsYUFBTyxLQUFLLE1BQU0sR0FBRztBQUFBLElBQ3ZCO0FBQUEsSUFFQSxRQUFTLEVBQUUsR0FBRyxHQUFHLFVBQVUsRUFBQyxHQUFJLEVBQUUsT0FBTyxNQUFLLElBQUssSUFBSTtBQUNyRCxVQUFJLE1BQU07QUFDUixTQUFDLEVBQUUsR0FBRyxNQUFNLEtBQUssZ0JBQWdCLEVBQUUsR0FBRyxHQUFHO0FBQUEsTUFDM0M7QUFDQSxhQUFPLEtBQUssS0FDVixLQUFLLFdBQVcsR0FBRyxDQUFDLElBQUksS0FBSyxZQUFZLGVBQWUsT0FDOUQ7QUFBQSxJQUNFO0FBQUEsSUFFQSxXQUFZLEVBQUUsR0FBRyxHQUFHLFVBQVUsS0FBSyxHQUFHLEVBQUUsT0FBTyxNQUFLLElBQUssQ0FBQSxHQUFJO0FBQzNELFVBQUksTUFBTTtBQUNSLFNBQUMsRUFBRSxHQUFHLE1BQU0sS0FBSyxnQkFBZ0IsRUFBRSxHQUFHLEdBQUc7QUFBQSxNQUMzQztBQUNBLFdBQUssS0FDSCxLQUFLLFdBQVcsR0FBRyxDQUFDLElBQUksS0FBSyxZQUFZLGVBQWUsT0FDOUQsSUFBUTtBQUFBLElBQ047QUFBQSxJQUVBLE9BQVE7QUFDTixhQUFPLElBQUksS0FBSyxZQUFZLEtBQUssS0FBSyxNQUFLLEdBQUksS0FBSyxPQUFPLEtBQUssTUFBTTtBQUFBLElBQ3hFO0FBQUEsSUFFQSxRQUFTLEdBQUc7QUFDVixXQUFLLEtBQUs7QUFBQSxRQUNSLENBQUMsR0FBRyxHQUFHLFFBQVMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxLQUFLLGNBQWMsQ0FBQyxHQUFHLEVBQUMsQ0FBRTtBQUFBLE1BQ25FO0FBQ0ksYUFBTztBQUFBLElBQ1Q7QUFBQSxJQUVBLFdBQVksR0FBRyxHQUFHO0FBQ2hCLFVBQUksSUFBSSxLQUFLLElBQUksR0FBRztBQUNsQixlQUFPO0FBQUEsTUFDVDtBQUNBLFVBQUksS0FBSyxLQUFLLFNBQVMsS0FBSyxLQUFLLFFBQVE7QUFDdkMsZUFBTztBQUFBLE1BQ1Q7QUFDQSxhQUFPO0FBQUEsSUFDVDtBQUFBLElBRUEsY0FBZTtBQUNiLFlBQU0sSUFBSSxLQUFLLE1BQU0sS0FBSyxPQUFNLElBQUssS0FBSyxRQUFRLEtBQUssTUFBTTtBQUM3RCxhQUFPLEtBQUssTUFBTSxDQUFDO0FBQUEsSUFDckI7QUFBQSxJQUVBLGFBQWM7QUFDWixpQkFBVyxFQUFFLE1BQUssS0FBTSxLQUFLLFVBQVMsR0FBSTtBQUN4QyxjQUFNLElBQUksTUFBTSxJQUFJLFlBQVksQ0FBQztBQUFBLE1BQ25DO0FBQ0EsYUFBTztBQUFBLElBQ1Q7QUFBQSxJQUVBLGVBQWdCO0FBQ2QsaUJBQVcsRUFBRSxNQUFLLEtBQU0sS0FBSyxVQUFTLEdBQUk7QUFDeEMsY0FBTSxJQUFJLE1BQU0sSUFBSSxZQUFZLENBQUM7QUFBQSxNQUNuQztBQUNBLGFBQU87QUFBQSxJQUNUO0FBQUEsSUFFQSxDQUFDLGlCQUFrQjtBQUNqQixlQUFTLElBQUksR0FBRyxJQUFJLEtBQUssUUFBUSxLQUFLO0FBQ3BDLGlCQUFTLElBQUksR0FBRyxJQUFJLEtBQUssT0FBTyxLQUFLO0FBQ25DLGdCQUFNLEVBQUUsR0FBRyxFQUFDO0FBQUEsUUFDZDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFLQSxDQUFDLFlBQWE7QUFDWixVQUFJLElBQUk7QUFDUixpQkFBVyxFQUFFLEdBQUcsRUFBQyxLQUFNLEtBQUssZUFBYyxHQUFJO0FBQzVDLGNBQU0sRUFBRSxHQUFHLEdBQUcsR0FBRyxPQUFPLEtBQUssUUFBUSxHQUFHLENBQUMsRUFBQztBQUMxQztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFFQSxTQUFVLE9BQU87QUFDZixjQUFRO0FBQUEsUUFDTixNQUFNLFFBQVEsTUFBTSxLQUFLLE1BQU0sU0FBUyxNQUFNO0FBQUEsUUFDOUM7QUFBQSxNQUNOO0FBRUksWUFBTSxTQUFTLEtBQUssS0FBSTtBQUN4QixZQUFNLFVBQVUsS0FBSyxNQUFNLE1BQU0sUUFBUSxDQUFDO0FBQzFDLFlBQU0sVUFBVSxLQUFLLE1BQU0sTUFBTSxTQUFTLENBQUM7QUFDM0MsaUJBQVcsS0FBSyxLQUFLLGtCQUFrQjtBQUNyQyxZQUFJLE1BQU07QUFDVixtQkFBVyxLQUFLLE1BQU0sa0JBQWtCO0FBQ3RDLGdCQUFNLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSTtBQUN0QixnQkFBTSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUk7QUFDdEIsaUJBQU8sS0FBSyxRQUFRLEVBQUUsR0FBRyxFQUFDLEdBQUksRUFBRSxNQUFNLEtBQUksQ0FBRSxJQUFJLE1BQU0sUUFBUSxDQUFDO0FBQUEsUUFDakU7QUFDQSxlQUFPLFdBQVcsR0FBRyxHQUFHO0FBQUEsTUFDMUI7QUFDQSxhQUFPO0FBQUEsSUFDVDtBQUFBLElBRUEsTUFBTztBQUNMLFVBQUk7QUFDSixpQkFBVyxLQUFLLEtBQUssYUFBYTtBQUNoQyxZQUFJLENBQUMsT0FBTyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEdBQUc7QUFDckMsZ0JBQU07QUFBQSxRQUNSO0FBQUEsTUFDRjtBQUNBLGFBQU87QUFBQSxJQUNUO0FBQUEsSUFFQSxNQUFPO0FBQ0wsVUFBSTtBQUNKLGlCQUFXLEtBQUssS0FBSyxhQUFhO0FBQ2hDLFlBQUksQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsR0FBRztBQUNyQyxnQkFBTTtBQUFBLFFBQ1I7QUFBQSxNQUNGO0FBQ0EsYUFBTztBQUFBLElBQ1Q7QUFBQSxJQUVBLFlBQWE7QUFDWCxZQUFNLFNBQVMsZ0JBQWdCLE1BQU0sS0FBSyxPQUFPLEtBQUssTUFBTTtBQUU1RCxpQkFBVyxLQUFLLE9BQU8sa0JBQWtCO0FBQ3ZDLGVBQU8sV0FBVyxHQUFHLEVBQUUsSUFBSSxLQUFLLFFBQVEsQ0FBQyxHQUFHLElBQUksRUFBQyxDQUFFO0FBQUEsTUFDckQ7QUFDQSxhQUFPO0FBQUEsSUFDVDtBQUFBLEVBQ0Y7QUFFQSxXQUFTLFFBQVMsR0FBRztBQUNuQixRQUFJLElBQUksTUFBTSxHQUFHO0FBQ2YsYUFBTyxJQUFJO0FBQUEsSUFDYjtBQUNBLFdBQU87QUFBQSxFQUNUO0FBQUEsRUFFTyxNQUFNLG9CQUFvQixNQUFNO0FBQUEsSUFDckMsV0FBVyxjQUFlO0FBQ3hCLGFBQU87QUFBQSxJQUNUO0FBQUEsSUFFQSxXQUFXLGVBQWdCO0FBQ3pCLGFBQU87QUFBQSxJQUNUO0FBQUEsSUFFQSxPQUFPLGNBQWUsU0FBUztBQUM3QixhQUFPLElBQUk7QUFBQSxRQUNULElBQUksa0JBQWtCLFFBQVEsSUFBSTtBQUFBLFFBQ2xDLFFBQVE7QUFBQSxRQUNSLFFBQVE7QUFBQSxNQUNkO0FBQUEsSUFDRTtBQUFBLElBRUEsY0FBZTtBQUNiLGFBQU8sSUFBSSxVQUFVLEtBQUssS0FBSyxNQUFLLEdBQUksS0FBSyxPQUFPLEtBQUssTUFBTTtBQUFBLElBQ2pFO0FBQUEsRUFDRjtBQXNFQSxRQUFNLGFBQWEsb0JBQUksSUFBRztBQUMxQixRQUFNLGdCQUFnQixvQkFBSSxJQUFHO0FBQUEsRUFFdEIsTUFBTSx5QkFBeUIsTUFBTTtBQUFBLElBQzFDLFdBQVcsY0FBZTtBQUN4QixhQUFPO0FBQUEsSUFDVDtBQUFBLElBRUEsV0FBVyxlQUFnQjtBQUN6QixhQUFPO0FBQUEsSUFDVDtBQUFBLElBRUEsT0FBTyxlQUNMLFFBQ0E7QUFBQSxNQUNFLFFBQVEsUUFBUSxLQUFLLEtBQUssSUFBSSxNQUFNLENBQUM7QUFBQSxNQUNyQyxTQUFTLFFBQVEsS0FBSyxLQUFLLElBQUksTUFBTSxDQUFDO0FBQUEsSUFDNUMsSUFBUSxDQUFBLEdBQ0o7QUFDQSxZQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksS0FBSyxJQUFJLE1BQU07QUFDeEMsVUFBSSxXQUFXLElBQUksR0FBRyxHQUFHO0FBQ3ZCLGVBQU8sV0FBVyxJQUFJLEdBQUcsRUFBRSxLQUFJO0FBQUEsTUFDakM7QUFDQSxZQUFNLE1BQU0saUJBQWlCLE1BQU0sT0FBTyxNQUFNO0FBQ2hELFlBQU0sU0FBUyxLQUFLLElBQUksS0FBSyxLQUFLLFVBQVU7QUFDNUMsaUJBQVcsRUFBRSxHQUFHLEdBQUcsTUFBSyxLQUFNLElBQUksYUFBYTtBQUM3QyxjQUFNLENBQUMsSUFDTCxTQUNBLEtBQUs7QUFBQSxVQUNILEdBQ0csSUFBSSxLQUFLLE1BQU0sUUFBUSxDQUFDLE1BQU0sS0FDOUIsSUFBSSxLQUFLLE1BQU0sUUFBUSxDQUFDLE1BQU0sTUFFOUIsSUFBSSxVQUFVO0FBQUEsUUFDM0I7QUFBQSxNQUNJO0FBQ0EsaUJBQVcsSUFBSSxLQUFLLElBQUksS0FBSSxDQUFFO0FBQzlCLGFBQU87QUFBQSxJQUNUO0FBQUEsSUFFQSxPQUFPLGNBQWUsYUFBYTtBQUNqQyxvQkFBYyxZQUFZLGNBQWMsV0FBVztBQUVuRCxZQUFNLE1BQU0sSUFBSTtBQUFBLFFBQ2QsSUFBSSxhQUFhLFlBQVksUUFBUSxZQUFZLE1BQU07QUFBQSxRQUN2RCxZQUFZO0FBQUEsUUFDWixZQUFZO0FBQUEsTUFDbEI7QUFDSSxlQUFTLElBQUksR0FBRyxJQUFJLFlBQVksUUFBUSxZQUFZLFFBQVEsS0FBSztBQUMvRCxZQUFJLEtBQUssQ0FBQyxJQUFJLGlCQUFpQixHQUFHLFlBQVksTUFBTSxDQUFDLENBQUM7QUFBQSxNQUN4RDtBQUNBLGFBQU87QUFBQSxJQUNUO0FBQUEsSUFFQSxnQkFBaUI7QUFDZixZQUFNLE1BQU0sS0FBSyxLQUFLLE9BQU8sQ0FBQ0EsTUFBSyxNQUFNQSxPQUFNLEdBQUcsQ0FBQztBQUNuRCxXQUFLLFFBQVEsT0FBSyxJQUFJLEdBQUc7QUFDekIsYUFBTztBQUFBLElBQ1Q7QUFBQSxJQUVBLGNBQWU7QUFDYixZQUFNLE9BQU8sSUFBSSxrQkFBa0IsS0FBSyxLQUFLLFNBQVMsQ0FBQztBQUN2RCxlQUFTLElBQUksR0FBRyxJQUFJLEtBQUssS0FBSyxRQUFRLEtBQUs7QUFDekMsYUFBSyxJQUFJLElBQUksQ0FBQyxJQUFJLGFBQWEsS0FBSyxLQUFLLENBQUMsQ0FBQyxJQUFJO0FBQy9DLGFBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxhQUFhLEtBQUssS0FBSyxDQUFDLENBQUMsSUFBSTtBQUMvQyxhQUFLLElBQUksSUFBSSxDQUFDLElBQUksYUFBYSxLQUFLLEtBQUssQ0FBQyxDQUFDLElBQUk7QUFDL0MsYUFBSyxJQUFJLElBQUksQ0FBQyxJQUFJO0FBQUEsTUFDcEI7QUFDQSxhQUFPLElBQUksVUFBVSxNQUFNLEtBQUssT0FBTyxLQUFLLE1BQU07QUFBQSxJQUNwRDtBQUFBLElBRUEsYUFBYyxRQUFRLEVBQUUsYUFBYSxhQUFZLElBQUssQ0FBQSxHQUFJO0FBQ3hELFlBQU0sU0FBUyxpQkFBaUIsZUFBZSxRQUFRO0FBQUEsUUFDckQsT0FBTztBQUFBLFFBQ1AsUUFBUTtBQUFBLE1BQ2QsQ0FBSztBQUNELGFBQU8sS0FBSyxTQUFTLE1BQU07QUFBQSxJQUM3QjtBQUFBLElBRUEsZ0JBQWlCLFFBQVEsRUFBRSxhQUFhLGFBQVksSUFBSyxDQUFBLEdBQUk7QUFFM0Qsb0JBQWMsS0FBSztBQUNuQixxQkFBZSxLQUFLO0FBQ3BCLFlBQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxXQUFXLElBQUksWUFBWTtBQUNwRCxVQUFJLENBQUMsY0FBYyxJQUFJLEdBQUcsR0FBRztBQUMzQixjQUFNLFNBQVMsaUJBQWlCLGVBQWUsUUFBUTtBQUFBLFVBQ3JELE9BQU87QUFBQSxVQUNQLFFBQVE7QUFBQSxRQUNoQixDQUFPLEVBQ0UsVUFBUyxFQUNULFFBQU8sRUFDUCxXQUFVO0FBQ2Isc0JBQWMsSUFBSSxLQUFLLE1BQU07QUFBQSxNQUMvQjtBQUNBLGFBQU8sS0FBSyxVQUFTLEVBQ2xCLFFBQU8sRUFDUCxXQUFVLEVBQ1YsYUFBYSxjQUFjLElBQUksR0FBRyxDQUFDLEVBQ25DLFdBQVUsRUFDVixTQUFRLEVBQ1IsV0FBVSxFQUNWLElBQUc7QUFBQSxJQUNSO0FBQUEsSUFFQSxVQUFXLEVBQUUsTUFBTSxHQUFHLE1BQU0sRUFBQyxJQUFLLElBQUk7QUFDcEMsYUFBTyxLQUFLLFFBQVEsT0FBSyxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUM7QUFBQSxJQUM3QztBQUFBLEVBQ0Y7QUFFQSxRQUFNLFFBQVE7QUFFUCxXQUFTLGFBQWMsR0FBRztBQUMvQixRQUFJLEtBQUssU0FBUztBQUNoQixhQUFPLElBQUk7QUFBQSxJQUNiO0FBQ0EsV0FBTyxLQUFLLEtBQUssSUFBSSxTQUFTLE9BQU8sS0FBSztBQUFBLEVBQzVDO0FBRU8sV0FBUyxhQUFjLEdBQUc7QUFDL0IsUUFBSSxLQUFLLFVBQVc7QUFDbEIsYUFBTyxRQUFRO0FBQUEsSUFDakI7QUFDQSxXQUFPLFFBQVEsS0FBSyxJQUFJLEdBQUcsSUFBSSxLQUFLLElBQUk7QUFBQSxFQUMxQztBQUVPLFdBQVMsV0FBWSxHQUFHLFNBQVM7QUFHdEMsU0FBTSxJQUFJLGVBQWUsS0FBTyxJQUFJLGVBQWU7QUFDbkQsU0FBTSxJQUFJLGNBQWUsS0FBTyxJQUFJLGVBQWU7QUFDbkQsU0FBTSxJQUFJLGNBQWUsS0FBTyxJQUFJLGVBQWU7QUFDbkQsU0FBTSxJQUFJLGFBQWUsS0FBTyxJQUFJLGVBQWU7QUFDbkQsU0FBTSxJQUFJLFVBQWUsTUFBUSxJQUFJLGVBQWU7QUFJcEQsV0FBTyxNQUFPLEtBQUs7QUFBQSxFQUNyQjtBQUFBLEVBRU8sTUFBTSx3QkFBd0IsTUFBTTtBQUFBLElBQ3pDLFdBQVcsY0FBZTtBQUN4QixhQUFPO0FBQUEsSUFDVDtBQUFBLElBRUEsV0FBVyxlQUFnQjtBQUN6QixhQUFPO0FBQUEsSUFDVDtBQUFBLElBRUEsT0FBUTtBQUNOLFlBQU0sTUFBTSxpQkFBaUIsTUFBTSxLQUFLLE9BQU8sS0FBSyxNQUFNO0FBQzFELGlCQUFXLEtBQUssSUFBSSxrQkFBa0I7QUFDcEMsY0FBTSxFQUFFLEdBQUUsSUFBSyxLQUFLLFFBQVEsQ0FBQztBQUM3QixZQUFJLFdBQVcsR0FBRyxFQUFFO0FBQUEsTUFDdEI7QUFDQSxhQUFPO0FBQUEsSUFDVDtBQUFBLElBRUEsWUFBYTtBQUNYLFlBQU0sTUFBTSxpQkFBaUIsTUFBTSxLQUFLLE9BQU8sS0FBSyxNQUFNO0FBQzFELGlCQUFXLEtBQUssSUFBSSxrQkFBa0I7QUFDcEMsY0FBTSxFQUFFLEdBQUUsSUFBSyxLQUFLLFFBQVEsQ0FBQztBQUM3QixZQUFJLFdBQVcsR0FBRyxFQUFFO0FBQUEsTUFDdEI7QUFDQSxhQUFPO0FBQUEsSUFDVDtBQUFBLElBRUEsTUFBTztBQUNMLFlBQU0sTUFBTSxpQkFBaUIsTUFBTSxLQUFLLE9BQU8sS0FBSyxNQUFNO0FBQzFELGlCQUFXLEtBQUssSUFBSSxrQkFBa0I7QUFDcEMsY0FBTSxFQUFFLElBQUksR0FBRSxJQUFLLEtBQUssUUFBUSxDQUFDO0FBQ2pDLFlBQUksV0FBVyxHQUFHLEtBQUssS0FBSyxNQUFNLElBQUksTUFBTSxDQUFDLENBQUM7QUFBQSxNQUNoRDtBQUNBLGFBQU87QUFBQSxJQUNUO0FBQUEsSUFFQSxRQUFTLEVBQUUsR0FBRyxFQUFDLEdBQUksRUFBRSxPQUFPLE1BQUssSUFBSyxJQUFJO0FBQ3hDLFVBQUksTUFBTTtBQUNSLFNBQUMsRUFBRSxHQUFHLE1BQU0sS0FBSyxnQkFBZ0IsRUFBRSxHQUFHLEdBQUc7QUFBQSxNQUMzQztBQUNBLFlBQU0sU0FBUyxLQUFLLFdBQVcsR0FBRyxDQUFDLElBQUksS0FBSyxZQUFZO0FBQ3hELFlBQU0sS0FBSyxLQUFLLEtBQUssU0FBUyxDQUFDO0FBQy9CLFlBQU0sS0FBSyxLQUFLLEtBQUssU0FBUyxDQUFDO0FBQy9CLGFBQU8sRUFBRSxJQUFJLEdBQUU7QUFBQSxJQUNqQjtBQUFBLElBRUEsV0FBWSxFQUFFLEdBQUcsRUFBQyxHQUFJLEVBQUUsSUFBSSxHQUFFLEdBQUksRUFBRSxPQUFPLE1BQUssSUFBSyxDQUFBLEdBQUk7QUFDdkQsVUFBSSxNQUFNO0FBQ1IsU0FBQyxFQUFFLEdBQUcsTUFBTSxLQUFLLGdCQUFnQixFQUFFLEdBQUcsR0FBRztBQUFBLE1BQzNDO0FBQ0EsWUFBTSxTQUFTLEtBQUssV0FBVyxHQUFHLENBQUMsSUFBSSxLQUFLLFlBQVk7QUFDeEQsV0FBSyxLQUFLLFNBQVMsQ0FBQyxJQUFJO0FBQ3hCLFdBQUssS0FBSyxTQUFTLENBQUMsSUFBSTtBQUFBLElBQzFCO0FBQUEsSUFFQSxhQUFjLE9BQU87QUFDbkIsY0FBUTtBQUFBLFFBQ04sS0FBSyxVQUFVLE1BQU0sU0FBUyxLQUFLLFdBQVcsTUFBTTtBQUFBLFFBQ3BEO0FBQUEsTUFDTjtBQUNJLGlCQUFXLEtBQUssS0FBSyxrQkFBa0I7QUFDckMsY0FBTSxLQUFLLEtBQUssUUFBUSxDQUFDO0FBQ3pCLGNBQU0sS0FBSyxNQUFNLFFBQVEsQ0FBQztBQUMxQixhQUFLLFdBQVcsR0FBRztBQUFBLFVBQ2pCLElBQUksR0FBRyxLQUFLLEdBQUcsS0FBSyxHQUFHLEtBQUssR0FBRztBQUFBLFVBQy9CLElBQUksR0FBRyxLQUFLLEdBQUcsS0FBSyxHQUFHLEtBQUssR0FBRztBQUFBLFFBQ3ZDLENBQU87QUFBQSxNQUNIO0FBQ0EsYUFBTztBQUFBLElBQ1Q7QUFBQSxJQUVBLGFBQWM7QUFDWixjQUFRO0FBQUEsUUFDTixLQUFLLFFBQVEsTUFBTSxLQUFLLEtBQUssU0FBUyxNQUFNO0FBQUEsUUFDNUM7QUFBQSxNQUNOO0FBRUksWUFBTSxZQUFZLEtBQUssUUFBUTtBQUMvQixZQUFNLGFBQWEsS0FBSyxTQUFTO0FBQ2pDLGlCQUFXLE1BQU0sS0FBSyxrQkFBa0I7QUFDdEMsWUFBSSxHQUFHLE1BQU0sS0FBSyxHQUFHLE1BQU0sWUFBWTtBQUNyQztBQUFBLFFBQ0Y7QUFDQSxjQUFNLEtBQUssS0FBSyxRQUFRLElBQUksRUFBRSxNQUFNLEtBQUksQ0FBRTtBQUMxQyxjQUFNLEtBQUssRUFBRSxHQUFHLEdBQUcsSUFBSSxXQUFXLEdBQUcsR0FBRyxJQUFJLFdBQVU7QUFDdEQsY0FBTSxLQUFLLEtBQUssUUFBUSxJQUFJLEVBQUUsTUFBTSxLQUFJLENBQUU7QUFDMUMsYUFBSyxXQUFXLElBQUksSUFBSSxFQUFFLE1BQU0sS0FBSSxDQUFFO0FBQ3RDLGFBQUssV0FBVyxJQUFJLElBQUksRUFBRSxNQUFNLEtBQUksQ0FBRTtBQUFBLE1BQ3hDO0FBQ0EsYUFBTztBQUFBLElBQ1Q7QUFBQSxJQUVBLGVBQWdCO0FBQ2QsY0FBUTtBQUFBLFFBQ04sS0FBSyxRQUFRLE1BQU0sS0FBSyxLQUFLLFNBQVMsTUFBTTtBQUFBLFFBQzVDO0FBQUEsTUFDTjtBQUVJLGFBQU8sS0FBSyxXQUFVO0FBQUEsSUFDeEI7QUFBQSxJQUVBLFVBQVcsT0FBTyxLQUFLLEtBQUssT0FBTyxJQUFJO0FBQ3JDLFlBQU0sT0FBTyxLQUFLLEtBQUssR0FBRztBQUUxQixlQUFTLElBQUksR0FBRyxJQUFJLEtBQUssS0FBSztBQUM1QixjQUFNLEtBQUssV0FBVyxHQUFHLElBQUk7QUFDN0IsWUFBSSxLQUFLLElBQUk7QUFDWDtBQUFBLFFBQ0Y7QUFDQSxjQUFNLEtBQUssRUFBRSxHQUFHLE1BQU0sSUFBSSxJQUFJLElBQUksR0FBRyxHQUFHLE1BQU0sSUFBSSxJQUFJLElBQUksRUFBQztBQUMzRCxjQUFNLEtBQUssRUFBRSxHQUFHLE1BQU0sSUFBSSxLQUFLLElBQUksR0FBRyxHQUFHLE1BQU0sSUFBSSxLQUFLLElBQUksRUFBQztBQUM3RCxjQUFNLEtBQUssS0FBSyxRQUFRLEVBQUU7QUFDMUIsY0FBTSxLQUFLLEtBQUssUUFBUSxFQUFFO0FBQzFCLGFBQUssV0FBVyxJQUFJLEVBQUU7QUFDdEIsYUFBSyxXQUFXLElBQUksRUFBRTtBQUFBLE1BQ3hCO0FBRUEsZUFBUyxJQUFJLEdBQUcsS0FBSyxNQUFNLEtBQUs7QUFDOUIsY0FBTSxJQUFJLEtBQUs7QUFDZixjQUFNLEtBQUssUUFBUSxVQUFVLEdBQUksT0FBTyxJQUFJLEtBQUssS0FBTSxDQUFDO0FBQ3hELGlCQUFTLElBQUksR0FBRyxJQUFJLEtBQUssS0FBSyxHQUFHO0FBQy9CLGdCQUFNLElBQUksUUFBUSxVQUFVLEdBQUcsQ0FBQztBQUNoQyxtQkFBUyxJQUFJLEdBQUcsSUFBSSxJQUFJLEdBQUcsS0FBSztBQUM5QixrQkFBTSxLQUFLO0FBQUEsY0FDVCxHQUFHLE1BQU0sS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLElBQUk7QUFBQSxjQUNuQyxHQUFHLE1BQU0sS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLElBQUk7QUFBQSxZQUMvQztBQUNVLGtCQUFNLElBQUksRUFBRSxLQUFJLEVBQUcsYUFBYSxLQUFLLFFBQVEsRUFBRSxDQUFDO0FBQ2hELGtCQUFNLEtBQUs7QUFBQSxjQUNULEdBQUcsTUFBTSxLQUFLLElBQUksS0FBSyxJQUFJO0FBQUEsY0FDM0IsR0FBRyxNQUFNLEtBQUssSUFBSSxLQUFLLElBQUk7QUFBQSxZQUN2QztBQUNVLGtCQUFNLElBQUksUUFBUSxvQkFBb0IsS0FBSyxRQUFRLEVBQUUsQ0FBQztBQUN0RCxpQkFBSyxXQUFXLElBQUksRUFBRSxLQUFJLEVBQUcsUUFBUSxDQUFDLENBQUM7QUFDdkMsaUJBQUssV0FBVyxJQUFJLEVBQUUsS0FBSSxFQUFHLGFBQWEsQ0FBQyxDQUFDO0FBQzVDLGNBQUUsYUFBYSxFQUFFO0FBQUEsVUFDbkI7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUNBLGFBQU87QUFBQSxJQUNUO0FBQUEsSUFFQSxVQUFXO0FBQ1QsYUFBTyxLQUFLLFVBQVUsRUFBRTtBQUFBLElBQzFCO0FBQUEsSUFFQSxRQUFTLEdBQUc7QUFDVixpQkFBVyxLQUFLLEtBQUssa0JBQWtCO0FBQ3JDLGFBQUssV0FBVyxHQUFHLEVBQUUsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBQUEsTUFDdkM7QUFDQSxhQUFPO0FBQUEsSUFDVDtBQUFBLElBRUEsV0FBWTtBQUNWLFlBQU0sSUFBSSxLQUFLLFFBQVEsS0FBSztBQUM1QixhQUFPLEtBQUssVUFBVSxDQUFDLEVBQUUsUUFBUSxPQUFLO0FBQ3BDLFVBQUUsTUFBTTtBQUNSLFVBQUUsTUFBTTtBQUNSLGVBQU87QUFBQSxNQUNULENBQUM7QUFBQSxJQUNIO0FBQUEsSUFFQSxVQUFXLE9BQU8sSUFBSTtBQUNwQixjQUFRLE9BQU8sS0FBSyxVQUFVLEtBQUssUUFBUSw0QkFBNEI7QUFDdkUsWUFBTSxVQUFVLEtBQUssS0FBSyxLQUFLLEtBQUs7QUFDcEMsY0FBUTtBQUFBLFFBQ04sWUFBWSxLQUFLLE1BQU0sT0FBTztBQUFBLFFBQzlCO0FBQUEsTUFDTjtBQUVJLGVBQVMsSUFBSSxHQUFHLElBQUksS0FBSyxRQUFRLEtBQUs7QUFDcEMsYUFBSyxVQUFVLEVBQUUsR0FBRyxHQUFHLEVBQUMsR0FBSSxLQUFLLE9BQU8sRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFDLEdBQUksSUFBSTtBQUFBLE1BQzlEO0FBQ0EsZUFBUyxJQUFJLEdBQUcsSUFBSSxLQUFLLE9BQU8sS0FBSztBQUNuQyxhQUFLLFVBQVUsRUFBRSxHQUFHLEdBQUcsRUFBQyxHQUFJLEtBQUssUUFBUSxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUMsR0FBSSxJQUFJO0FBQUEsTUFDL0Q7QUFDQSxhQUFPO0FBQUEsSUFDVDtBQUFBLEVBQ0Y7QUFBQSxFQUVPLE1BQU0sUUFBUTtBQUFBLElBQ25CLFlBQWEsSUFBSSxJQUFJO0FBQ25CLFdBQUssS0FBSztBQUNWLFdBQUssS0FBSztBQUFBLElBQ1o7QUFBQSxJQUVBLE9BQU8sb0JBQXFCLEVBQUUsS0FBSyxHQUFHLEtBQUssRUFBQyxJQUFLLElBQUk7QUFDbkQsYUFBTyxJQUFJLFFBQVEsSUFBSSxFQUFFO0FBQUEsSUFDM0I7QUFBQSxJQUVBLE9BQU8sVUFBVyxJQUFJLEdBQUcsTUFBTSxHQUFHO0FBQ2hDLGFBQU8sSUFBSSxRQUFRLElBQUksS0FBSyxJQUFJLEdBQUcsR0FBRyxJQUFJLEtBQUssSUFBSSxHQUFHLENBQUM7QUFBQSxJQUN6RDtBQUFBLElBRUEsT0FBUTtBQUNOLGFBQU8sSUFBSSxRQUFRLEtBQUssSUFBSSxLQUFLLEVBQUU7QUFBQSxJQUNyQztBQUFBLElBRUEsUUFBUyxPQUFPO0FBQ2QsV0FBSyxNQUFNLE1BQU07QUFDakIsV0FBSyxNQUFNLE1BQU07QUFDakIsYUFBTztBQUFBLElBQ1Q7QUFBQSxJQUVBLGFBQWMsT0FBTztBQUNuQixXQUFLLE1BQU0sTUFBTTtBQUNqQixXQUFLLE1BQU0sTUFBTTtBQUNqQixhQUFPO0FBQUEsSUFDVDtBQUFBLElBRUEsYUFBYyxPQUFPO0FBQ25CLFlBQU0sRUFBRSxJQUFJLE9BQU87QUFDbkIsV0FBSyxLQUFLLEtBQUssTUFBTSxLQUFLLEtBQUssTUFBTTtBQUNyQyxXQUFLLEtBQUssS0FBSyxNQUFNLEtBQUssS0FBSyxNQUFNO0FBQ3JDLGFBQU87QUFBQSxJQUNUO0FBQUEsRUFDRjtBQzdyQk8sV0FBUyxnQkFBaUIsUUFBUSxPQUFPO0FBQzlDLFdBQU8sTUFBTSxLQUFLLEVBQUUsT0FBTSxHQUFJLENBQUMsR0FBRyxNQUFNLEtBQUssSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFLENBQUM7QUFBQSxFQUMzRTtBQUVPLFlBQVUsYUFBYyxHQUFHO0FBQ2hDLFFBQUksTUFBTSxHQUFHO0FBQ1gsWUFBTTtBQUNOO0FBQUEsSUFDRjtBQUNBLGVBQVcsU0FBUyxhQUFhLElBQUksQ0FBQyxHQUFHO0FBQ3ZDLGNBQVEsT0FBSztBQUFBLFFBQ1gsS0FBSztBQUNILGlCQUFRLGNBQWMsTUFBTSxFQUFFO0FBQzlCO0FBQUEsUUFDRixLQUFLO0FBQ0gsaUJBQVEsY0FBYyxNQUFNLEVBQUU7QUFDOUI7QUFBQSxRQUNGO0FBQ0UsZ0JBQU07QUFBQSxNQUNkO0FBQUEsSUFDRTtBQUFBLEVBQ0Y7QUFFTyxZQUFVLG9CQUFxQixJQUFJO0FBQ3hDLFFBQUksWUFBWTtBQUNoQixRQUFJLElBQUk7QUFDUixRQUFJLElBQUk7QUFDUixVQUFNLEVBQUUsR0FBRyxFQUFDO0FBRVosZUFBVyxTQUFTLElBQUk7QUFDdEIsY0FBUSxPQUFLO0FBQUEsUUFDWCxLQUFLO0FBQ0gsZUFBSyxLQUFLLElBQUksU0FBUztBQUN2QixlQUFLLEtBQUssSUFBSSxTQUFTO0FBQ3ZCLGdCQUFNLEVBQUUsR0FBRyxLQUFLLE1BQU0sQ0FBQyxHQUFHLEdBQUcsS0FBSyxNQUFNLENBQUMsRUFBQztBQUMxQztBQUFBLFFBQ0YsS0FBSztBQUNILHVCQUFhLEtBQUssS0FBSztBQUN2QjtBQUFBLFFBQ0YsS0FBSztBQUNILHVCQUFhLEtBQUssS0FBSztBQUN2QjtBQUFBLE1BQ1I7QUFBQSxJQUNFO0FBQUEsRUFDRjtBQUVPLFlBQVUsc0JBQXVCLE9BQU8sUUFBUTtBQUNyRCxVQUFNLElBQUksS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLElBQUksT0FBTyxNQUFNLENBQUMsQ0FBQztBQUN0RCxXQUFRLG9CQUFvQixhQUFhLElBQUksQ0FBQyxDQUFDO0FBQUEsRUFDakQ7QUNwQ0EsUUFBTSxpQkFBaUI7QUFDdkIsUUFBTSxjQUFjLFFBQVEsTUFBTSxhQUFhLEVBQUU7QUFBQSxJQUFLLENBQUMsRUFBRSxhQUFBQyxhQUFXLE1BQ2xFQSxhQUFZLElBQUksUUFBTSxPQUFPLGVBQWUsSUFBSSxpQkFBaUIsU0FBUyxDQUFDO0FBQUEsRUFDN0U7QUFFQSxRQUFNLFdBQVc7QUFBQSxJQUNmO0FBQUEsTUFDRSxJQUFJO0FBQUEsTUFDSixPQUFPO0FBQUEsTUFDUCxNQUFNLFFBQVMsV0FBVztBQUN4QixlQUFPLFVBQVUsS0FBSSxFQUFHLFFBQVEsT0FBTSxJQUFJLE1BQU0sSUFBTSxDQUFJO0FBQUEsTUFDNUQ7QUFBQSxJQUNKO0FBQUEsSUFDRTtBQUFBLE1BQ0UsSUFBSTtBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsTUFBTSxRQUFTLFdBQVc7QUFDeEIsZUFBTyxVQUFVLE9BQU8sUUFBUSxPQUFNLElBQUksS0FBSyxPQUFNLElBQUssSUFBTSxDQUFJO0FBQUEsTUFDdEU7QUFBQSxJQUNKO0FBQUEsSUFDRSxHQUFHLE1BQU0sS0FBSyxFQUFFLFFBQVEsa0JBQWtCLENBQUMsR0FBRyxVQUFVO0FBQ3RELGFBQU87QUFBQSxRQUNMLElBQUksU0FBUyxLQUFLO0FBQUEsUUFDbEIsT0FBTyxlQUFlLEtBQUs7QUFBQSxRQUMzQixNQUFNLFFBQVMsV0FBVyxFQUFFLGFBQUFBLGFBQVcsR0FBSTtBQUN6QyxnQkFBTSxjQUFjLE1BQU1BLGNBQWEsS0FBSztBQUM1QyxpQkFBTyxVQUNKLEtBQUksRUFDSjtBQUFBLFlBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFDLE1BQ2pCLElBQUksV0FBVyxRQUFRLEVBQUUsR0FBRyxLQUFLLEVBQUUsTUFBTSxNQUFNLElBQUksSUFBTTtBQUFBLFVBQ3JFO0FBQUEsUUFDTTtBQUFBLE1BQ047QUFBQSxJQUNFLENBQUM7QUFBQSxJQUNEO0FBQUEsTUFDRSxJQUFJO0FBQUEsTUFDSixPQUFPO0FBQUEsTUFDUCxNQUFNLFFBQVMsV0FBVztBQUN4QixlQUFPO0FBQUEsVUFDTCxVQUFVLEtBQUk7QUFBQSxVQUNkLElBQUksaUJBQWlCLElBQUksYUFBYSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLFVBQ3pELE9BQU0sSUFBSSxNQUFNLElBQU07QUFBQSxRQUM5QjtBQUFBLE1BQ0k7QUFBQSxJQUNKO0FBQUEsSUFDRTtBQUFBLE1BQ0UsSUFBSTtBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsTUFBTSxRQUFTLFdBQVc7QUFDeEIsZUFBTztBQUFBLFVBQ0wsVUFBVSxLQUFJO0FBQUEsVUFDZCxJQUFJLGlCQUFpQixJQUFJLGFBQWEsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsVUFDL0QsT0FBTSxJQUFJLE1BQU0sSUFBTTtBQUFBLFFBQzlCO0FBQUEsTUFDSTtBQUFBLElBQ0o7QUFBQSxJQUNFO0FBQUEsTUFDRSxJQUFJO0FBQUEsTUFDSixPQUFPO0FBQUEsTUFDUCxNQUFNLFFBQVMsV0FBVztBQUN4QixlQUFPO0FBQUEsVUFDTCxVQUFVLEtBQUk7QUFBQSxVQUNkLElBQUk7QUFBQSxZQUNGLElBQUksYUFBYSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFBQSxZQUM5RDtBQUFBLFlBQ0E7QUFBQSxVQUNWO0FBQUEsVUFDUSxPQUFNLElBQUksTUFBTSxJQUFNO0FBQUEsUUFDOUI7QUFBQSxNQUNJO0FBQUEsSUFDSjtBQUFBLElBQ0U7QUFBQSxNQUNFLElBQUk7QUFBQSxNQUNKLE9BQU87QUFBQSxNQUNQLE1BQU0sUUFBUyxXQUFXO0FBQ3hCLGVBQU87QUFBQSxVQUNMLFVBQVUsS0FBSTtBQUFBLFVBQ2QsSUFBSTtBQUFBLFlBQ0YsSUFBSSxhQUFhLENBQUMsR0FBRyxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztBQUFBLFlBQzdFO0FBQUEsWUFDQTtBQUFBLFVBQ1Y7QUFBQSxVQUNRLE9BQU0sSUFBSSxNQUFNLElBQU07QUFBQSxVQUN0QixFQUFFLFdBQVcsTUFBSztBQUFBLFFBQzFCO0FBQUEsTUFDSTtBQUFBLElBQ0o7QUFBQSxJQUNFO0FBQUEsTUFDRSxJQUFJO0FBQUEsTUFDSixPQUFPO0FBQUEsTUFDUCxNQUFNLFFBQVMsV0FBVztBQUN4QixlQUFPO0FBQUEsVUFDTCxVQUFVLEtBQUk7QUFBQSxVQUNkO0FBQUEsVUFDQSxnQkFBZ0IsSUFBSSxJQUFJLENBQUM7QUFBQSxVQUN6QixPQUFNLElBQUksTUFBTSxJQUFNO0FBQUEsUUFDOUI7QUFBQSxNQUNJO0FBQUEsSUFDSjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBbUJBO0FBRUEsV0FBUyxvQkFBcUIsS0FBSyxPQUFPLFNBQVMsUUFBUTtBQUN6RCxVQUFNLFVBQVUsTUFBTSxJQUFJLE9BQU8sSUFBSSxNQUFNO0FBQzNDLFVBQU0sU0FBUyxNQUFNLEtBQUssU0FBUyxNQUFNLENBQUM7QUFDMUMsZUFBVyxLQUFLLFNBQVM7QUFDdkIsVUFBSSxDQUFDLElBQUksV0FBVyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUc7QUFDN0I7QUFBQSxNQUNGO0FBQ0EsWUFBTSxXQUFXLElBQUksUUFBUSxDQUFDO0FBQzlCLFlBQU0sWUFBWTtBQUFBLFFBQ2hCLFdBQVcsT0FBTyxPQUFPLENBQUMsS0FBSyxHQUFHLE1BQU0sTUFBTSxJQUFJLFFBQVEsQ0FBQyxDQUFDO0FBQUEsTUFDbEU7QUFDSSxhQUFPLElBQUc7QUFDVixhQUFPLFFBQVEsV0FBVyxTQUFTO0FBQ25DLFVBQUksV0FBVyxHQUFHLFNBQVM7QUFBQSxJQUM3QjtBQUNBLFdBQU87QUFBQSxFQUNUO0FBRUEsV0FBUyxxQkFBc0IsS0FBSyxVQUFVLGNBQWMsRUFBRSxZQUFZLEtBQUksSUFBSyxJQUFJO0FBQ3JGLFFBQUksV0FBVztBQUNiLGVBQVMsY0FBYTtBQUFBLElBQ3hCO0FBQ0EsZUFBVyxFQUFFLEdBQUcsR0FBRyxNQUFLLEtBQU0sSUFBSSxhQUFhO0FBQzdDLFlBQU0sV0FBVyxNQUFNLENBQUM7QUFDeEIsWUFBTSxZQUFZLGFBQWEsUUFBUTtBQUN2QyxZQUFNLENBQUMsSUFBSTtBQUNYLFlBQU0sUUFBUSxXQUFXO0FBQ3pCLGlCQUFXO0FBQUEsUUFDVCxHQUFHO0FBQUEsUUFDSCxHQUFHO0FBQUEsUUFDSCxPQUFPO0FBQUEsTUFDYixLQUFTLFNBQVMsYUFBYTtBQUN6QixjQUFNLFVBQVUsUUFBUSxLQUFLLE9BQU8sU0FBUyxRQUFRLEtBQUssQ0FBQztBQUMzRCxjQUFNLFVBQVU7QUFDaEIsWUFBSSxJQUFJLFdBQVcsSUFBSSxTQUFTLElBQUksT0FBTyxHQUFHO0FBQzVDLGdCQUFNQyxTQUFRLElBQUksUUFBUSxJQUFJLFNBQVMsSUFBSSxPQUFPO0FBQ2xELFVBQUFBLE9BQU0sQ0FBQyxJQUFJQSxPQUFNLENBQUMsSUFBSSxRQUFRLFVBQVUsQ0FBQztBQUFBLFFBQzNDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFDQSxXQUFPO0FBQUEsRUFDVDtBQUVBLGlCQUFlLE9BQVE7QUFDckIsVUFBTSxTQUFTLGNBQWEsRUFBRyxVQUFTO0FBRXhDLFdBQU8sTUFBTTtBQUNYLFlBQU07QUFBQSxRQUNKLE9BQU8sRUFBRSxPQUFPLEdBQUU7QUFBQSxNQUN4QixJQUFRLE1BQU0sT0FBTyxLQUFJO0FBQ3JCLFVBQUksT0FBTyxTQUFTO0FBQ2xCO0FBQUEsTUFDRjtBQUVBLGtCQUFZO0FBQUEsUUFDVixNQUFNO0FBQUEsUUFDTixJQUFJO0FBQUEsUUFDSixPQUFPO0FBQUEsUUFDUCxXQUFXO0FBQUEsTUFDakIsQ0FBSztBQUVELFlBQU0sWUFBWSxpQkFBaUIsY0FBYyxLQUFLO0FBQ3RELGtCQUFZO0FBQUEsUUFDVixNQUFNO0FBQUEsUUFDTixJQUFJO0FBQUEsUUFDSixPQUFPO0FBQUEsUUFDUCxXQUFXLFVBQVUsWUFBVztBQUFBLE1BQ3RDLENBQUs7QUFFRCxpQkFBVyxRQUFRLFVBQVU7QUFDM0IsWUFBSSxRQUFRLEtBQUs7QUFDakIsWUFBSSxPQUFPLEtBQUssVUFBVSxZQUFZO0FBQ3BDLGtCQUFRLEtBQUssTUFBSztBQUFBLFFBQ3BCO0FBQ0Esb0JBQVk7QUFBQSxVQUNWLE1BQU07QUFBQSxVQUNOLElBQUksS0FBSztBQUFBLFVBQ1Q7QUFBQSxRQUNSLENBQU87QUFDRCxjQUFNLFNBQVMsTUFBTSxLQUFLLFFBQVEsV0FBVyxFQUFFLFlBQVcsQ0FBRTtBQUM1RCxZQUFJLE9BQU8sS0FBSyxVQUFVLFlBQVk7QUFDcEMsa0JBQVEsS0FBSyxNQUFLO0FBQUEsUUFDcEI7QUFDQSxvQkFBWTtBQUFBLFVBQ1YsTUFBTTtBQUFBLFVBQ047QUFBQSxVQUNBLElBQUksS0FBSztBQUFBLFVBQ1QsV0FBVyxPQUFPLFlBQVc7QUFBQSxRQUNyQyxDQUFPO0FBQUEsTUFDSDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0EsT0FBSTs7In0=
