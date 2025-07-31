(function() {
  "use strict";
  function MessageStream() {
    return new ReadableStream({
      start(controller) {
        self.addEventListener("message", (ev) => controller.enqueue(ev.data));
      }
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
  const bayerCache = [new GrayImageF32N0F8(new Float32Array([0, 3, 2, 1]), 2, 2)];
  function calculateBayerLevel(level) {
    if (!bayerCache[level]) {
      const bayerSize = 2 ** (level + 1);
      const bayer = GrayImageF32N0F8.empty(bayerSize, bayerSize);
      const prevLevel = calculateBayerLevel(level - 1);
      const halfSize = bayerSize / 2;
      for (const { x, y, pixel } of bayer.allPixels()) {
        const quadrantX = x >= bayerSize / 2 ? 1 : 0;
        const quadrantY = y >= bayerSize / 2 ? 1 : 0;
        pixel[0] = 4 * prevLevel.pixelAt(x % halfSize, y % halfSize)[0] + bayerCache[0].pixelAt(quadrantX, quadrantY)[0];
      }
      bayerCache[level] = bayer;
    }
    return bayerCache[level];
  }
  async function init() {
    const reader = MessageStream().getReader();
    while (true) {
      const {
        value: { level, id }
      } = await reader.read();
      const bayer = calculateBayerLevel(level);
      const size = bayer.width ** 2;
      postMessage({ id, result: bayer.copy().mapSelf((v) => v / size) });
    }
  }
  init();
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmF5ZXItd29ya2VyLURqeXhxUnZPLmpzIiwic291cmNlcyI6WyIuLi9zcmMvc2hhcmVkL2xpYi91dGlscy9kaXRoZXJwdW5rL3dvcmtlci11dGlscy5qcyIsIi4uL3NyYy9zaGFyZWQvbGliL3V0aWxzL2RpdGhlcnB1bmsvaW1hZ2UtdXRpbHMuanMiLCIuLi9zcmMvc2hhcmVkL2xpYi91dGlscy9kaXRoZXJwdW5rL2JheWVyLXdvcmtlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gTWVzc2FnZVN0cmVhbSAoKSB7XG4gIHJldHVybiBuZXcgUmVhZGFibGVTdHJlYW0oe1xuICAgIHN0YXJ0IChjb250cm9sbGVyKSB7XG4gICAgICBzZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBldiA9PiBjb250cm9sbGVyLmVucXVldWUoZXYuZGF0YSkpXG4gICAgfVxuICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWVzc2FnZSAod29ya2VyLCBpZCkge1xuICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgd29ya2VyLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbiBmICh7IGRhdGEgfSkge1xuICAgICAgaWYgKGRhdGEuaWQgIT09IGlkKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgd29ya2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmKVxuICAgICAgcmVzb2x2ZShkYXRhKVxuICAgIH0pXG4gIH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1aWQgKCkge1xuICByZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogMTYgfSwgKCkgPT5cbiAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTYpLnRvU3RyaW5nKDE2KVxuICApLmpvaW4oJycpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBuZXh0RXZlbnQgKHRhcmdldCwgbmFtZSkge1xuICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PlxuICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKG5hbWUsIHJlc29sdmUsIHsgb25jZTogdHJ1ZSB9KVxuICApXG59XG4iLCJleHBvcnQgYXN5bmMgZnVuY3Rpb24gaW1hZ2VGaWxlVG9JbWFnZURhdGEgKHVybCkge1xuICBjb25zdCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICBpbWcuc3JjID0gdXJsXG4gIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBpbWcub25sb2FkID0gcmVzb2x2ZVxuICAgIGltZy5vbmVycm9yID0gcmVqZWN0XG4gIH0pXG4gIHJldHVybiBpbWFnZVRvSW1hZ2VEYXRhKGltZylcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGJsb2JUb0ltYWdlRGF0YSAoYmxvYikge1xuICBjb25zdCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpXG4gIHJldHVybiBpbWFnZUZpbGVUb0ltYWdlRGF0YSh1cmwpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbWFnZVRvSW1hZ2VEYXRhIChpbWcpIHtcbiAgY29uc3QgY3ZzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcbiAgY3ZzLndpZHRoID0gaW1nLm5hdHVyYWxXaWR0aFxuICBjdnMuaGVpZ2h0ID0gaW1nLm5hdHVyYWxIZWlnaHRcbiAgY29uc3QgY3R4ID0gY3ZzLmdldENvbnRleHQoJzJkJylcbiAgY3R4LmRyYXdJbWFnZShpbWcsIDAsIDApXG4gIHJldHVybiBjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIGN2cy53aWR0aCwgY3ZzLmhlaWdodClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGltYWdlRGF0YVRvQ2FudmFzIChpbWdEYXRhKSB7XG4gIGNvbnN0IGN2cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG4gIGN2cy53aWR0aCA9IGltZ0RhdGEud2lkdGhcbiAgY3ZzLmhlaWdodCA9IGltZ0RhdGEuaGVpZ2h0XG4gIGNvbnN0IGN0eCA9IGN2cy5nZXRDb250ZXh0KCcyZCcpXG4gIGN0eC5wdXRJbWFnZURhdGEoaW1nRGF0YSwgMCwgMClcbiAgcmV0dXJuIGN2c1xufVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGltYWdlRGF0YVRvUE5HIChpbWdEYXRhKSB7XG4gIGNvbnN0IGN2cyA9IGltYWdlRGF0YVRvQ2FudmFzKGltZ0RhdGEpXG4gIGNvbnN0IGJsb2IgPSBhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IGN2cy50b0Jsb2IocmVzb2x2ZSwgJ2ltYWdlL3BuZycpKVxuICByZXR1cm4gYmxvYlxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xhbXAgKG1pbiwgdiwgbWF4KSB7XG4gIGlmICh2IDwgbWluKSB7XG4gICAgcmV0dXJuIG1pblxuICB9XG4gIGlmICh2ID4gbWF4KSB7XG4gICAgcmV0dXJuIG1heFxuICB9XG4gIHJldHVybiB2XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaW5lYXJCcmlnaHRuZXNzTjBGOCAociwgZywgYikge1xuICByZXR1cm4gMC4yMSAqIHIgKyAwLjcyICogZyArIDAuMDcgKiBiXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzcmdiQnJpZ2h0bmVzc04wRjggKHIsIGcsIGIpIHtcbiAgcmV0dXJuIGxpbmVhckJyaWdodG5lc3NOMEY4KFxuICAgIHNyZ2JUb0xpbmVhcihyKSxcbiAgICBzcmdiVG9MaW5lYXIoZyksXG4gICAgc3JnYlRvTGluZWFyKGIpXG4gIClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNyZ2JCcmlnaHRuZXNzVTggKHIsIGcsIGIpIHtcbiAgcmV0dXJuIHNyZ2JCcmlnaHRuZXNzTjBGOChyIC8gMjU1LCBnIC8gMjU1LCBiIC8gMjU1KVxufVxuXG5leHBvcnQgY2xhc3MgSW1hZ2Uge1xuICBjb25zdHJ1Y3RvciAoZGF0YSwgd2lkdGgsIGhlaWdodCkge1xuICAgIHRoaXMuZGF0YSA9IGRhdGFcbiAgICB0aGlzLndpZHRoID0gd2lkdGhcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodFxuICB9XG5cbiAgc3RhdGljIGVtcHR5ICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgY29uc3QgYnVmZmVyID0gbmV3IHRoaXMuQlVGRkVSX1RZUEUod2lkdGggKiBoZWlnaHQgKiB0aGlzLk5VTV9DSEFOTkVMUylcbiAgICBidWZmZXIuZmlsbCgwKVxuICAgIHJldHVybiBuZXcgdGhpcyhidWZmZXIsIHdpZHRoLCBoZWlnaHQpXG4gIH1cblxuICBwaXhlbEluZGV4ICh4LCB5KSB7XG4gICAgcmV0dXJuIHkgKiB0aGlzLndpZHRoICsgeFxuICB9XG5cbiAgcGl4ZWxGb3JJbmRleCAoaSkge1xuICAgIHJldHVybiB7XG4gICAgICB4OiBpICUgdGhpcy53aWR0aCxcbiAgICAgIHk6IE1hdGguZmxvb3IoaSAvIHRoaXMud2lkdGgpXG4gICAgfVxuICB9XG5cbiAgcGl4ZWwgKG50aCkge1xuICAgIHJldHVybiBuZXcgdGhpcy5kYXRhLmNvbnN0cnVjdG9yKFxuICAgICAgdGhpcy5kYXRhLmJ1ZmZlcixcbiAgICAgIHRoaXMuZGF0YS5ieXRlT2Zmc2V0ICtcbiAgICAgICAgbnRoICogdGhpcy5jb25zdHJ1Y3Rvci5OVU1fQ0hBTk5FTFMgKiB0aGlzLmRhdGEuQllURVNfUEVSX0VMRU1FTlQsXG4gICAgICB0aGlzLmNvbnN0cnVjdG9yLk5VTV9DSEFOTkVMU1xuICAgIClcbiAgfVxuXG4gIHdyYXBDb29yZGluYXRlcyAoeyB4LCB5IH0pIHtcbiAgICB4ID0geCAlIHRoaXMud2lkdGhcbiAgICBpZiAoeCA8IDApIHggKz0gdGhpcy53aWR0aFxuICAgIHkgPSB5ICUgdGhpcy5oZWlnaHRcbiAgICBpZiAoeSA8IDApIHkgKz0gdGhpcy5oZWlnaHRcbiAgICByZXR1cm4geyB4LCB5IH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge251bWJlcn0geFxuICAgKiBAcGFyYW0ge251bWJlcn0geVxuICAgKiBAcmV0dXJucyB7RmxvYXQzMkFycmF5fVxuICAgKi9cbiAgcGl4ZWxBdCAoeCwgeSwgeyB3cmFwID0gZmFsc2UgfSA9IHt9KSB7XG4gICAgaWYgKHdyYXApIHtcbiAgICAgICh7IHgsIHkgfSA9IHRoaXMud3JhcENvb3JkaW5hdGVzKHsgeCwgeSB9KSlcbiAgICB9IGVsc2Uge1xuICAgICAgeCA9IGNsYW1wKDAsIHgsIHRoaXMud2lkdGggLSAxKVxuICAgICAgeSA9IGNsYW1wKDAsIHksIHRoaXMuaGVpZ2h0IC0gMSlcbiAgICB9XG4gICAgY29uc3QgbnRoID0gdGhpcy5waXhlbEluZGV4KHgsIHkpXG4gICAgcmV0dXJuIHRoaXMucGl4ZWwobnRoKVxuICB9XG5cbiAgdmFsdWVBdCAoeyB4LCB5LCBjaGFubmVsID0gMCB9LCB7IHdyYXAgPSBmYWxzZSB9ID0ge30pIHtcbiAgICBpZiAod3JhcCkge1xuICAgICAgKHsgeCwgeSB9ID0gdGhpcy53cmFwQ29vcmRpbmF0ZXMoeyB4LCB5IH0pKVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5kYXRhW1xuICAgICAgdGhpcy5waXhlbEluZGV4KHgsIHkpICogdGhpcy5jb25zdHJ1Y3Rvci5OVU1fQ0hBTk5FTFMgKyBjaGFubmVsXG4gICAgXVxuICB9XG5cbiAgc2V0VmFsdWVBdCAoeyB4LCB5LCBjaGFubmVsID0gMCB9LCB2LCB7IHdyYXAgPSBmYWxzZSB9ID0ge30pIHtcbiAgICBpZiAod3JhcCkge1xuICAgICAgKHsgeCwgeSB9ID0gdGhpcy53cmFwQ29vcmRpbmF0ZXMoeyB4LCB5IH0pKVxuICAgIH1cbiAgICB0aGlzLmRhdGFbXG4gICAgICB0aGlzLnBpeGVsSW5kZXgoeCwgeSkgKiB0aGlzLmNvbnN0cnVjdG9yLk5VTV9DSEFOTkVMUyArIGNoYW5uZWxcbiAgICBdID0gdlxuICB9XG5cbiAgY29weSAoKSB7XG4gICAgcmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yKHRoaXMuZGF0YS5zbGljZSgpLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodClcbiAgfVxuXG4gIG1hcFNlbGYgKGYpIHtcbiAgICB0aGlzLmRhdGEuZm9yRWFjaChcbiAgICAgICh2LCBpLCBhcnIpID0+IChhcnJbaV0gPSBmKHYsIHsgLi4udGhpcy5waXhlbEZvckluZGV4KGkpLCBpIH0pKVxuICAgIClcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgaXNJbkJvdW5kcyAoeCwgeSkge1xuICAgIGlmICh4IDwgMCB8fCB5IDwgMCkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIGlmICh4ID49IHRoaXMud2lkdGggfHwgeSA+PSB0aGlzLmhlaWdodCkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICByYW5kb21QaXhlbCAoKSB7XG4gICAgY29uc3QgaSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMud2lkdGggKiB0aGlzLmhlaWdodClcbiAgICByZXR1cm4gdGhpcy5waXhlbChpKVxuICB9XG5cbiAgdG9TcmdiU2VsZiAoKSB7XG4gICAgZm9yIChjb25zdCB7IHBpeGVsIH0gb2YgdGhpcy5hbGxQaXhlbHMoKSkge1xuICAgICAgcGl4ZWwuc2V0KHBpeGVsLm1hcChsaW5lYXJUb1NyZ2IpKVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgdG9MaW5lYXJTZWxmICgpIHtcbiAgICBmb3IgKGNvbnN0IHsgcGl4ZWwgfSBvZiB0aGlzLmFsbFBpeGVscygpKSB7XG4gICAgICBwaXhlbC5zZXQocGl4ZWwubWFwKHNyZ2JUb0xpbmVhcikpXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAqYWxsQ29vcmRpbmF0ZXMgKCkge1xuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5oZWlnaHQ7IHkrKykge1xuICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLndpZHRoOyB4KyspIHtcbiAgICAgICAgeWllbGQgeyB4LCB5IH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge0l0ZXJhYmxlPHt4OiBudW1iZXIsIHk6IG51bWJlciwgaTogbnVtYmVyLCBwaXhlbDogRmxvYXQzMkFycmF5fT59XG4gICAqL1xuICAqYWxsUGl4ZWxzICgpIHtcbiAgICBsZXQgaSA9IDBcbiAgICBmb3IgKGNvbnN0IHsgeCwgeSB9IG9mIHRoaXMuYWxsQ29vcmRpbmF0ZXMoKSkge1xuICAgICAgeWllbGQgeyB4LCB5LCBpLCBwaXhlbDogdGhpcy5waXhlbEF0KHgsIHkpIH1cbiAgICAgIGkrK1xuICAgIH1cbiAgfVxuXG4gIGNvbnZvbHZlIChvdGhlcikge1xuICAgIGNvbnNvbGUuYXNzZXJ0KFxuICAgICAgb3RoZXIud2lkdGggJSAyID09PSAxICYmIG90aGVyLmhlaWdodCAlIDIgPT09IDEsXG4gICAgICAnQ29udm9sdXRpb24gbWF0cml4IG11c3QgaGF2ZSBvZGQgc2l6ZSdcbiAgICApXG5cbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLmNvcHkoKVxuICAgIGNvbnN0IG9mZnNldFggPSBNYXRoLmZsb29yKG90aGVyLndpZHRoIC8gMilcbiAgICBjb25zdCBvZmZzZXRZID0gTWF0aC5mbG9vcihvdGhlci5oZWlnaHQgLyAyKVxuICAgIGZvciAoY29uc3QgcCBvZiB0aGlzLmFsbENvb3JkaW5hdGVzKCkpIHtcbiAgICAgIGxldCBzdW0gPSAwXG4gICAgICBmb3IgKGNvbnN0IHEgb2Ygb3RoZXIuYWxsQ29vcmRpbmF0ZXMoKSkge1xuICAgICAgICBjb25zdCB4ID0gcC54ICsgcS54IC0gb2Zmc2V0WFxuICAgICAgICBjb25zdCB5ID0gcC55ICsgcS55IC0gb2Zmc2V0WVxuICAgICAgICBzdW0gKz0gdGhpcy52YWx1ZUF0KHsgeCwgeSB9LCB7IHdyYXA6IHRydWUgfSkgKiBvdGhlci52YWx1ZUF0KHEpXG4gICAgICB9XG4gICAgICByZXN1bHQuc2V0VmFsdWVBdChwLCBzdW0pXG4gICAgfVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIG1heCAoKSB7XG4gICAgbGV0IG1heFxuICAgIGZvciAoY29uc3QgaSBvZiB0aGlzLmFsbFBpeGVscygpKSB7XG4gICAgICBpZiAoIW1heCB8fCBtYXgucGl4ZWxbMF0gPCBpLnBpeGVsWzBdKSB7XG4gICAgICAgIG1heCA9IGlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1heFxuICB9XG5cbiAgbWluICgpIHtcbiAgICBsZXQgbWluXG4gICAgZm9yIChjb25zdCBpIG9mIHRoaXMuYWxsUGl4ZWxzKCkpIHtcbiAgICAgIGlmICghbWluIHx8IG1pbi5waXhlbFswXSA+IGkucGl4ZWxbMF0pIHtcbiAgICAgICAgbWluID0gaVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbWluXG4gIH1cblxuICB0b0NvbXBsZXggKCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IEltYWdlQ29tcGxleEY2NC5lbXB0eSh0aGlzLndpZHRoLCB0aGlzLmhlaWdodClcbiAgICAvLyBjb25zdCBjID0gbmV3IENvbXBsZXgoKVxuICAgIGZvciAoY29uc3QgcCBvZiByZXN1bHQuYWxsQ29vcmRpbmF0ZXMoKSkge1xuICAgICAgcmVzdWx0LnNldFZhbHVlQXQocCwgeyByZTogdGhpcy52YWx1ZUF0KHApLCBpbTogMCB9KVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cbn1cblxuZnVuY3Rpb24gbmV4dE9kZCAobikge1xuICBpZiAobiAlIDIgPT09IDApIHtcbiAgICByZXR1cm4gbiArIDFcbiAgfVxuICByZXR1cm4gblxufVxuXG5leHBvcnQgY2xhc3MgUkdCQUltYWdlVTggZXh0ZW5kcyBJbWFnZSB7XG4gIHN0YXRpYyBnZXQgQlVGRkVSX1RZUEUgKCkge1xuICAgIHJldHVybiBVaW50OENsYW1wZWRBcnJheVxuICB9XG5cbiAgc3RhdGljIGdldCBOVU1fQ0hBTk5FTFMgKCkge1xuICAgIHJldHVybiA0XG4gIH1cblxuICBzdGF0aWMgZnJvbUltYWdlRGF0YSAoaW1nRGF0YSkge1xuICAgIHJldHVybiBuZXcgUkdCQUltYWdlVTgoXG4gICAgICBuZXcgVWludDhDbGFtcGVkQXJyYXkoaW1nRGF0YS5kYXRhKSxcbiAgICAgIGltZ0RhdGEud2lkdGgsXG4gICAgICBpbWdEYXRhLmhlaWdodFxuICAgIClcbiAgfVxuXG4gIHRvSW1hZ2VEYXRhICgpIHtcbiAgICByZXR1cm4gbmV3IEltYWdlRGF0YSh0aGlzLmRhdGEuc2xpY2UoKSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpXG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFJHQkltYWdlRjMyTjBGOCBleHRlbmRzIEltYWdlIHtcbiAgc3RhdGljIGdldCBCVUZGRVJfVFlQRSAoKSB7XG4gICAgcmV0dXJuIEZsb2F0MzJBcnJheVxuICB9XG5cbiAgc3RhdGljIGdldCBOVU1fQ0hBTk5FTFMgKCkge1xuICAgIHJldHVybiAzXG4gIH1cblxuICBzdGF0aWMgZnJvbUltYWdlRGF0YSAoc291cmNlSW1hZ2UsIHsgbGluZWFyaXplID0gdHJ1ZSB9ID0ge30pIHtcbiAgICBjb25zdCBpbWcgPSBuZXcgdGhpcyhcbiAgICAgIG5ldyB0aGlzLkJVRkZFUl9UWVBFKFxuICAgICAgICBzb3VyY2VJbWFnZS53aWR0aCAqIHNvdXJjZUltYWdlLmhlaWdodCAqIHRoaXMuTlVNX0NIQU5ORUxTXG4gICAgICApLFxuICAgICAgc291cmNlSW1hZ2Uud2lkdGgsXG4gICAgICBzb3VyY2VJbWFnZS5oZWlnaHRcbiAgICApXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzb3VyY2VJbWFnZS53aWR0aCAqIHNvdXJjZUltYWdlLmhlaWdodDsgaSsrKSB7XG4gICAgICBpZiAobGluZWFyaXplKSB7XG4gICAgICAgIGltZy5kYXRhWzMgKiBpICsgMF0gPSBzcmdiVG9MaW5lYXIoc291cmNlSW1hZ2UuZGF0YVs0ICogaSArIDBdIC8gMjU1KVxuICAgICAgICBpbWcuZGF0YVszICogaSArIDFdID0gc3JnYlRvTGluZWFyKHNvdXJjZUltYWdlLmRhdGFbNCAqIGkgKyAxXSAvIDI1NSlcbiAgICAgICAgaW1nLmRhdGFbMyAqIGkgKyAyXSA9IHNyZ2JUb0xpbmVhcihzb3VyY2VJbWFnZS5kYXRhWzQgKiBpICsgMl0gLyAyNTUpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbWcuZGF0YVszICogaSArIDBdID0gc291cmNlSW1hZ2UuZGF0YVs0ICogaSArIDBdIC8gMjU1XG4gICAgICAgIGltZy5kYXRhWzMgKiBpICsgMV0gPSBzb3VyY2VJbWFnZS5kYXRhWzQgKiBpICsgMV0gLyAyNTVcbiAgICAgICAgaW1nLmRhdGFbMyAqIGkgKyAyXSA9IHNvdXJjZUltYWdlLmRhdGFbNCAqIGkgKyAyXSAvIDI1NVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaW1nXG4gIH1cblxuICBtYXBTZWxmIChmKSB7XG4gICAgZm9yIChjb25zdCBwIG9mIHRoaXMuYWxsUGl4ZWxzKCkpIHtcbiAgICAgIHAucGl4ZWwuc2V0KGYocC5waXhlbCwgcCkpXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHt7ZGVsaW5lYXJpemU6IGJvb2xlYW59fVxuICAgKi9cbiAgdG9JbWFnZURhdGEgKHsgZGVsaW5lYXJpemUgPSB0cnVlIH0gPSB7fSkge1xuICAgIGNvbnN0IGltZyA9IG5ldyBVaW50OENsYW1wZWRBcnJheSh0aGlzLndpZHRoICogdGhpcy5oZWlnaHQgKiA0KVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy53aWR0aCAqIHRoaXMuaGVpZ2h0OyBpKyspIHtcbiAgICAgIC8vIENsYW1waW5nIGFuZCBmbG9vcuKAmWluZyBpcyBkb25lIGltcGxpY2l0bHkgYnkgVWludDhDbGFtcGVkQXJyYXlcbiAgICAgIGlmIChkZWxpbmVhcml6ZSkge1xuICAgICAgICBpbWdbNCAqIGkgKyAwXSA9IGxpbmVhclRvU3JnYih0aGlzLmRhdGFbMyAqIGkgKyAwXSkgKiAyNTVcbiAgICAgICAgaW1nWzQgKiBpICsgMV0gPSBsaW5lYXJUb1NyZ2IodGhpcy5kYXRhWzMgKiBpICsgMV0pICogMjU1XG4gICAgICAgIGltZ1s0ICogaSArIDJdID0gbGluZWFyVG9TcmdiKHRoaXMuZGF0YVszICogaSArIDJdKSAqIDI1NVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW1nWzQgKiBpICsgMF0gPSB0aGlzLmRhdGFbMyAqIGkgKyAwXSAqIDI1NVxuICAgICAgICBpbWdbNCAqIGkgKyAxXSA9IHRoaXMuZGF0YVszICogaSArIDFdICogMjU1XG4gICAgICAgIGltZ1s0ICogaSArIDJdID0gdGhpcy5kYXRhWzMgKiBpICsgMl0gKiAyNTVcbiAgICAgIH1cbiAgICAgIGltZ1s0ICogaSArIDNdID0gMjU1XG4gICAgfVxuICAgIHJldHVybiBuZXcgSW1hZ2VEYXRhKGltZywgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpXG4gIH1cblxuICB0b0dyYXkgKCkge1xuICAgIGNvbnN0IGltZyA9IEdyYXlJbWFnZUYzMk4wRjguZW1wdHkodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpXG4gICAgZm9yIChjb25zdCB7IHgsIHksIHBpeGVsIH0gb2YgdGhpcy5hbGxQaXhlbHMoKSkge1xuICAgICAgaW1nLnNldFZhbHVlQXQoeyB4LCB5IH0sIGxpbmVhckJyaWdodG5lc3NOMEY4KC4uLnBpeGVsKSlcbiAgICB9XG4gICAgcmV0dXJuIGltZ1xuICB9XG59XG5cbmNvbnN0IGdhdXNzQ2FjaGUgPSBuZXcgTWFwKClcbmNvbnN0IGZmdEdhdXNzQ2FjaGUgPSBuZXcgTWFwKClcblxuZXhwb3J0IGNsYXNzIEdyYXlJbWFnZUYzMk4wRjggZXh0ZW5kcyBJbWFnZSB7XG4gIHN0YXRpYyBnZXQgQlVGRkVSX1RZUEUgKCkge1xuICAgIHJldHVybiBGbG9hdDMyQXJyYXlcbiAgfVxuXG4gIHN0YXRpYyBnZXQgTlVNX0NIQU5ORUxTICgpIHtcbiAgICByZXR1cm4gMVxuICB9XG5cbiAgc3RhdGljIGdhdXNzaWFuS2VybmVsIChcbiAgICBzdGREZXYsXG4gICAge1xuICAgICAgd2lkdGggPSBuZXh0T2RkKE1hdGguY2VpbCg2ICogc3RkRGV2KSksXG4gICAgICBoZWlnaHQgPSBuZXh0T2RkKE1hdGguY2VpbCg2ICogc3RkRGV2KSlcbiAgICB9ID0ge31cbiAgKSB7XG4gICAgY29uc3Qga2V5ID0gYCR7c3RkRGV2fToke3dpZHRofToke2hlaWdodH1gXG4gICAgaWYgKGdhdXNzQ2FjaGUuaGFzKGtleSkpIHtcbiAgICAgIHJldHVybiBnYXVzc0NhY2hlLmdldChrZXkpLmNvcHkoKVxuICAgIH1cbiAgICBjb25zdCBpbWcgPSBHcmF5SW1hZ2VGMzJOMEY4LmVtcHR5KHdpZHRoLCBoZWlnaHQpXG4gICAgY29uc3QgZmFjdG9yID0gMSAvICgyICogTWF0aC5QSSAqIHN0ZERldiAqKiAyKVxuICAgIGZvciAoY29uc3QgeyB4LCB5LCBwaXhlbCB9IG9mIGltZy5hbGxQaXhlbHMoKSkge1xuICAgICAgcGl4ZWxbMF0gPVxuICAgICAgICBmYWN0b3IgKlxuICAgICAgICBNYXRoLmV4cChcbiAgICAgICAgICAtKFxuICAgICAgICAgICAgKHggLSBNYXRoLmZsb29yKHdpZHRoIC8gMikpICoqIDIgK1xuICAgICAgICAgICAgKHkgLSBNYXRoLmZsb29yKHdpZHRoIC8gMikpICoqIDJcbiAgICAgICAgICApIC9cbiAgICAgICAgICAgICgyICogc3RkRGV2ICoqIDIpXG4gICAgICAgIClcbiAgICB9XG4gICAgZ2F1c3NDYWNoZS5zZXQoa2V5LCBpbWcuY29weSgpKVxuICAgIHJldHVybiBpbWdcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSW1hZ2VEYXRhIChzb3VyY2VJbWFnZSkge1xuICAgIHNvdXJjZUltYWdlID0gUkdCQUltYWdlVTguZnJvbUltYWdlRGF0YShzb3VyY2VJbWFnZSlcblxuICAgIGNvbnN0IGltZyA9IG5ldyBHcmF5SW1hZ2VGMzJOMEY4KFxuICAgICAgbmV3IEZsb2F0MzJBcnJheShzb3VyY2VJbWFnZS53aWR0aCAqIHNvdXJjZUltYWdlLmhlaWdodCksXG4gICAgICBzb3VyY2VJbWFnZS53aWR0aCxcbiAgICAgIHNvdXJjZUltYWdlLmhlaWdodFxuICAgIClcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNvdXJjZUltYWdlLndpZHRoICogc291cmNlSW1hZ2UuaGVpZ2h0OyBpKyspIHtcbiAgICAgIGltZy5kYXRhW2ldID0gc3JnYkJyaWdodG5lc3NVOCguLi5zb3VyY2VJbWFnZS5waXhlbChpKSlcbiAgICB9XG4gICAgcmV0dXJuIGltZ1xuICB9XG5cbiAgbm9ybWFsaXplU2VsZiAoKSB7XG4gICAgY29uc3Qgc3VtID0gdGhpcy5kYXRhLnJlZHVjZSgoc3VtLCB2KSA9PiBzdW0gKyB2LCAwKVxuICAgIHRoaXMubWFwU2VsZih2ID0+IHYgLyBzdW0pXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHRvSW1hZ2VEYXRhICgpIHtcbiAgICBjb25zdCBkYXRhID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KHRoaXMuZGF0YS5sZW5ndGggKiA0KVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBkYXRhW2kgKiA0ICsgMF0gPSBsaW5lYXJUb1NyZ2IodGhpcy5kYXRhW2ldKSAqIDI1NVxuICAgICAgZGF0YVtpICogNCArIDFdID0gbGluZWFyVG9TcmdiKHRoaXMuZGF0YVtpXSkgKiAyNTVcbiAgICAgIGRhdGFbaSAqIDQgKyAyXSA9IGxpbmVhclRvU3JnYih0aGlzLmRhdGFbaV0pICogMjU1XG4gICAgICBkYXRhW2kgKiA0ICsgM10gPSAyNTVcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBJbWFnZURhdGEoZGF0YSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpXG4gIH1cblxuICBnYXVzc2lhbkJsdXIgKHN0ZERldiwgeyBrZXJuZWxXaWR0aCwga2VybmVsSGVpZ2h0IH0gPSB7fSkge1xuICAgIGNvbnN0IGtlcm5lbCA9IEdyYXlJbWFnZUYzMk4wRjguZ2F1c3NpYW5LZXJuZWwoc3RkRGV2LCB7XG4gICAgICB3aWR0aDoga2VybmVsV2lkdGgsXG4gICAgICBoZWlnaHQ6IGtlcm5lbEhlaWdodFxuICAgIH0pXG4gICAgcmV0dXJuIHRoaXMuY29udm9sdmUoa2VybmVsKVxuICB9XG5cbiAgZmZ0R2F1c3NpYW5CbHVyIChzdGREZXYsIHsga2VybmVsV2lkdGgsIGtlcm5lbEhlaWdodCB9ID0ge30pIHtcbiAgICAvLyBGb3Igbm93Li4uXG4gICAga2VybmVsV2lkdGggPSB0aGlzLndpZHRoXG4gICAga2VybmVsSGVpZ2h0ID0gdGhpcy5oZWlnaHRcbiAgICBjb25zdCBrZXkgPSBgJHtzdGREZXZ9OiR7a2VybmVsV2lkdGh9OiR7a2VybmVsSGVpZ2h0fWBcbiAgICBpZiAoIWZmdEdhdXNzQ2FjaGUuaGFzKGtleSkpIHtcbiAgICAgIGNvbnN0IGtlcm5lbCA9IEdyYXlJbWFnZUYzMk4wRjguZ2F1c3NpYW5LZXJuZWwoc3RkRGV2LCB7XG4gICAgICAgIHdpZHRoOiBrZXJuZWxXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiBrZXJuZWxIZWlnaHRcbiAgICAgIH0pXG4gICAgICAgIC50b0NvbXBsZXgoKVxuICAgICAgICAuZmZ0U2VsZigpXG4gICAgICAgIC5jZW50ZXJTZWxmKClcbiAgICAgIGZmdEdhdXNzQ2FjaGUuc2V0KGtleSwga2VybmVsKVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy50b0NvbXBsZXgoKVxuICAgICAgLmZmdFNlbGYoKVxuICAgICAgLmNlbnRlclNlbGYoKVxuICAgICAgLm11bHRpcGx5U2VsZihmZnRHYXVzc0NhY2hlLmdldChrZXkpKVxuICAgICAgLmNlbnRlclNlbGYoKVxuICAgICAgLmlmZnRTZWxmKClcbiAgICAgIC5jZW50ZXJTZWxmKClcbiAgICAgIC5hYnMoKVxuICB9XG5cbiAgY2xhbXBTZWxmICh7IG1pbiA9IDAsIG1heCA9IDEgfSA9IHt9KSB7XG4gICAgcmV0dXJuIHRoaXMubWFwU2VsZih2ID0+IGNsYW1wKG1pbiwgdiwgbWF4KSlcbiAgfVxufVxuXG5jb25zdCBnYW1tYSA9IDIuNFxuXG5leHBvcnQgZnVuY3Rpb24gc3JnYlRvTGluZWFyICh2KSB7XG4gIGlmICh2IDw9IDAuMDQwNDUpIHtcbiAgICByZXR1cm4gdiAvIDEyLjk1XG4gIH1cbiAgcmV0dXJuIE1hdGgucG93KCh2ICsgMC4wNTUpIC8gMS4wNTUsIGdhbW1hKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbGluZWFyVG9TcmdiICh2KSB7XG4gIGlmICh2IDw9IDAuMDAzMTMwOCkge1xuICAgIHJldHVybiAxMi45NSAqIHZcbiAgfVxuICByZXR1cm4gMS4wNTUgKiBNYXRoLnBvdyh2LCAxIC8gZ2FtbWEpIC0gMC4wNTVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJpdFJldmVyc2UgKHgsIG51bUJpdHMpIHtcbiAgLy8gT2gtc28tY2xldmVyIGJpdC1oYWNrZXJ5XG4gIC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzYwMjI2ODQ1L3JldmVyc2UtYml0cy1qYXZhc2NyaXB0XG4gIHggPSAoKHggJiAweDU1NTU1NTU1KSA8PCAxKSB8ICgoeCAmIDB4YWFhYWFhYWEpID4+IDEpXG4gIHggPSAoKHggJiAweDMzMzMzMzMzKSA8PCAyKSB8ICgoeCAmIDB4Y2NjY2NjY2MpID4+IDIpXG4gIHggPSAoKHggJiAweDBmMGYwZjBmKSA8PCA0KSB8ICgoeCAmIDB4ZjBmMGYwZjApID4+IDQpXG4gIHggPSAoKHggJiAweDAwZmYwMGZmKSA8PCA4KSB8ICgoeCAmIDB4ZmYwMGZmMDApID4+IDgpXG4gIHggPSAoKHggJiAweDAwMDBmZmZmKSA8PCAxNikgfCAoKHggJiAweGZmZmYwMDAwKSA+PiAxNilcblxuICAvLyBTbGlnaHQgYW1lbmRtZW50IGhlcmU6IFRoZSBmdW5jdGlvbiBhc3N1bWVzIDMyIGJpdCBhcmUgcHJlc2VudFxuICAvLyB0byByZXZlcnNlLCBidXQgd2Ugb25seSB3YW50IGBudW1CaXRzYC4gU28gc2hpZnQgaW4gdGhlIGVuZCBhY2NvcmRpbmdseS5cbiAgcmV0dXJuIHggPj4+ICgzMiAtIG51bUJpdHMpXG59XG5cbmV4cG9ydCBjbGFzcyBJbWFnZUNvbXBsZXhGNjQgZXh0ZW5kcyBJbWFnZSB7XG4gIHN0YXRpYyBnZXQgQlVGRkVSX1RZUEUgKCkge1xuICAgIHJldHVybiBGbG9hdDY0QXJyYXlcbiAgfVxuXG4gIHN0YXRpYyBnZXQgTlVNX0NIQU5ORUxTICgpIHtcbiAgICByZXR1cm4gMlxuICB9XG5cbiAgcmVhbCAoKSB7XG4gICAgY29uc3QgaW1nID0gR3JheUltYWdlRjMyTjBGOC5lbXB0eSh0aGlzLndpZHRoLCB0aGlzLmhlaWdodClcbiAgICBmb3IgKGNvbnN0IHAgb2YgaW1nLmFsbENvb3JkaW5hdGVzKCkpIHtcbiAgICAgIGNvbnN0IHsgcmUgfSA9IHRoaXMudmFsdWVBdChwKVxuICAgICAgaW1nLnNldFZhbHVlQXQocCwgcmUpXG4gICAgfVxuICAgIHJldHVybiBpbWdcbiAgfVxuXG4gIGltYWdpbmFyeSAoKSB7XG4gICAgY29uc3QgaW1nID0gR3JheUltYWdlRjMyTjBGOC5lbXB0eSh0aGlzLndpZHRoLCB0aGlzLmhlaWdodClcbiAgICBmb3IgKGNvbnN0IHAgb2YgaW1nLmFsbENvb3JkaW5hdGVzKCkpIHtcbiAgICAgIGNvbnN0IHsgaW0gfSA9IHRoaXMudmFsdWVBdChwKVxuICAgICAgaW1nLnNldFZhbHVlQXQocCwgaW0pXG4gICAgfVxuICAgIHJldHVybiBpbWdcbiAgfVxuXG4gIGFicyAoKSB7XG4gICAgY29uc3QgaW1nID0gR3JheUltYWdlRjMyTjBGOC5lbXB0eSh0aGlzLndpZHRoLCB0aGlzLmhlaWdodClcbiAgICBmb3IgKGNvbnN0IHAgb2YgaW1nLmFsbENvb3JkaW5hdGVzKCkpIHtcbiAgICAgIGNvbnN0IHsgcmUsIGltIH0gPSB0aGlzLnZhbHVlQXQocClcbiAgICAgIGltZy5zZXRWYWx1ZUF0KHAsIE1hdGguc3FydChyZSAqKiAyICsgaW0gKiogMikpXG4gICAgfVxuICAgIHJldHVybiBpbWdcbiAgfVxuXG4gIHZhbHVlQXQgKHsgeCwgeSB9LCB7IHdyYXAgPSBmYWxzZSB9ID0ge30pIHtcbiAgICBpZiAod3JhcCkge1xuICAgICAgKHsgeCwgeSB9ID0gdGhpcy53cmFwQ29vcmRpbmF0ZXMoeyB4LCB5IH0pKVxuICAgIH1cbiAgICBjb25zdCBvZmZzZXQgPSB0aGlzLnBpeGVsSW5kZXgoeCwgeSkgKiB0aGlzLmNvbnN0cnVjdG9yLk5VTV9DSEFOTkVMU1xuICAgIGNvbnN0IHJlID0gdGhpcy5kYXRhW29mZnNldCArIDBdXG4gICAgY29uc3QgaW0gPSB0aGlzLmRhdGFbb2Zmc2V0ICsgMV1cbiAgICByZXR1cm4geyByZSwgaW0gfVxuICB9XG5cbiAgc2V0VmFsdWVBdCAoeyB4LCB5IH0sIHsgcmUsIGltIH0sIHsgd3JhcCA9IGZhbHNlIH0gPSB7fSkge1xuICAgIGlmICh3cmFwKSB7XG4gICAgICAoeyB4LCB5IH0gPSB0aGlzLndyYXBDb29yZGluYXRlcyh7IHgsIHkgfSkpXG4gICAgfVxuICAgIGNvbnN0IG9mZnNldCA9IHRoaXMucGl4ZWxJbmRleCh4LCB5KSAqIHRoaXMuY29uc3RydWN0b3IuTlVNX0NIQU5ORUxTXG4gICAgdGhpcy5kYXRhW29mZnNldCArIDBdID0gcmVcbiAgICB0aGlzLmRhdGFbb2Zmc2V0ICsgMV0gPSBpbVxuICB9XG5cbiAgbXVsdGlwbHlTZWxmIChvdGhlcikge1xuICAgIGNvbnNvbGUuYXNzZXJ0KFxuICAgICAgdGhpcy53aWR0aCA9PT0gb3RoZXIud2lkdGggJiYgdGhpcy5oZWlnaHQgPT09IG90aGVyLmhlaWdodCxcbiAgICAgICdJbWFnZXMgbmVlZCB0byBiZSBzYW1lIHNpemUnXG4gICAgKVxuICAgIGZvciAoY29uc3QgcCBvZiB0aGlzLmFsbENvb3JkaW5hdGVzKCkpIHtcbiAgICAgIGNvbnN0IHYxID0gdGhpcy52YWx1ZUF0KHApXG4gICAgICBjb25zdCB2MiA9IG90aGVyLnZhbHVlQXQocClcbiAgICAgIHRoaXMuc2V0VmFsdWVBdChwLCB7XG4gICAgICAgIHJlOiB2MS5yZSAqIHYyLnJlICsgdjEuaW0gKiB2Mi5pbSxcbiAgICAgICAgaW06IHYxLnJlICogdjIuaW0gKyB2MS5pbSAqIHYyLnJlXG4gICAgICB9KVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgY2VudGVyU2VsZiAoKSB7XG4gICAgY29uc29sZS5hc3NlcnQoXG4gICAgICB0aGlzLndpZHRoICUgMiA9PT0gMCAmJiB0aGlzLmhlaWdodCAlIDIgPT09IDAsXG4gICAgICAnd2lkdGggYW5kIGhlaWdodCBtdXN0IGJlIGV2ZW4nXG4gICAgKVxuXG4gICAgY29uc3QgaGFsZldpZHRoID0gdGhpcy53aWR0aCAvIDJcbiAgICBjb25zdCBoYWxmSGVpZ2h0ID0gdGhpcy5oZWlnaHQgLyAyXG4gICAgZm9yIChjb25zdCBwMSBvZiB0aGlzLmFsbENvb3JkaW5hdGVzKCkpIHtcbiAgICAgIGlmIChwMS54ID09PSAwICYmIHAxLnkgPT09IGhhbGZIZWlnaHQpIHtcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHYxID0gdGhpcy52YWx1ZUF0KHAxLCB7IHdyYXA6IHRydWUgfSlcbiAgICAgIGNvbnN0IHAyID0geyB4OiBwMS54ICsgaGFsZldpZHRoLCB5OiBwMS55ICsgaGFsZkhlaWdodCB9XG4gICAgICBjb25zdCB2MiA9IHRoaXMudmFsdWVBdChwMiwgeyB3cmFwOiB0cnVlIH0pXG4gICAgICB0aGlzLnNldFZhbHVlQXQocDEsIHYyLCB7IHdyYXA6IHRydWUgfSlcbiAgICAgIHRoaXMuc2V0VmFsdWVBdChwMiwgdjEsIHsgd3JhcDogdHJ1ZSB9KVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgdW5jZW50ZXJTZWxmICgpIHtcbiAgICBjb25zb2xlLmFzc2VydChcbiAgICAgIHRoaXMud2lkdGggJSAyID09PSAwICYmIHRoaXMuaGVpZ2h0ICUgMiA9PT0gMCxcbiAgICAgICd3aWR0aCBhbmQgaGVpZ2h0IG11c3QgYmUgZXZlbidcbiAgICApXG4gICAgLy8gSXTigJlzIGl0cyBvd24gaW52ZXJzZSEhXG4gICAgcmV0dXJuIHRoaXMuY2VudGVyU2VsZigpXG4gIH1cblxuICBfZmZ0MVNlbGYgKHN0YXJ0LCBudW0sIGluYywgc2lnbiA9IC0xKSB7XG4gICAgY29uc3QgYml0cyA9IE1hdGgubG9nMihudW0pXG4gICAgLy8gUmUtYXJyYW5nZSBkYXRhIHRvIGJpdC1yZXZlcnNlZCBvcmRlclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtOyBpKyspIHtcbiAgICAgIGNvbnN0IGJpID0gYml0UmV2ZXJzZShpLCBiaXRzKVxuICAgICAgaWYgKGkgPj0gYmkpIHtcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cbiAgICAgIGNvbnN0IHAxID0geyB4OiBzdGFydC54ICsgaSAqIGluYy54LCB5OiBzdGFydC55ICsgaSAqIGluYy55IH1cbiAgICAgIGNvbnN0IHAyID0geyB4OiBzdGFydC54ICsgYmkgKiBpbmMueCwgeTogc3RhcnQueSArIGJpICogaW5jLnkgfVxuICAgICAgY29uc3QgdjEgPSB0aGlzLnZhbHVlQXQocDEpXG4gICAgICBjb25zdCB2MiA9IHRoaXMudmFsdWVBdChwMilcbiAgICAgIHRoaXMuc2V0VmFsdWVBdChwMSwgdjIpXG4gICAgICB0aGlzLnNldFZhbHVlQXQocDIsIHYxKVxuICAgIH1cblxuICAgIGZvciAobGV0IHMgPSAxOyBzIDw9IGJpdHM7IHMrKykge1xuICAgICAgY29uc3QgbSA9IDIgKiogc1xuICAgICAgY29uc3Qgd20gPSBDb21wbGV4LmZyb21FdWxlcigxLCAoc2lnbiAqIDIgKiBNYXRoLlBJKSAvIG0pXG4gICAgICBmb3IgKGxldCBrID0gMDsgayA8IG51bTsgayArPSBtKSB7XG4gICAgICAgIGNvbnN0IHcgPSBDb21wbGV4LmZyb21FdWxlcigxLCAwKVxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG0gLyAyOyBqKyspIHtcbiAgICAgICAgICBjb25zdCBwdCA9IHtcbiAgICAgICAgICAgIHg6IHN0YXJ0LnggKyAoayArIGogKyBtIC8gMikgKiBpbmMueCxcbiAgICAgICAgICAgIHk6IHN0YXJ0LnkgKyAoayArIGogKyBtIC8gMikgKiBpbmMueVxuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCB0ID0gdy5jb3B5KCkubXVsdGlwbHlTZWxmKHRoaXMudmFsdWVBdChwdCkpXG4gICAgICAgICAgY29uc3QgcHUgPSB7XG4gICAgICAgICAgICB4OiBzdGFydC54ICsgKGsgKyBqKSAqIGluYy54LFxuICAgICAgICAgICAgeTogc3RhcnQueSArIChrICsgaikgKiBpbmMueVxuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCB1ID0gQ29tcGxleC5mcm9tQ2FydGVzaWFuT2JqZWN0KHRoaXMudmFsdWVBdChwdSkpXG4gICAgICAgICAgdGhpcy5zZXRWYWx1ZUF0KHB1LCB1LmNvcHkoKS5hZGRTZWxmKHQpKVxuICAgICAgICAgIHRoaXMuc2V0VmFsdWVBdChwdCwgdS5jb3B5KCkuc3VidHJhY3RTZWxmKHQpKVxuICAgICAgICAgIHcubXVsdGlwbHlTZWxmKHdtKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBmZnRTZWxmICgpIHtcbiAgICByZXR1cm4gdGhpcy5fZmZ0MlNlbGYoLTEpXG4gIH1cblxuICBtYXBTZWxmIChmKSB7XG4gICAgZm9yIChjb25zdCBjIG9mIHRoaXMuYWxsQ29vcmRpbmF0ZXMoKSkge1xuICAgICAgdGhpcy5zZXRWYWx1ZUF0KGMsIGYodGhpcy52YWx1ZUF0KGMpKSlcbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGlmZnRTZWxmICgpIHtcbiAgICBjb25zdCBuID0gdGhpcy53aWR0aCAqIHRoaXMuaGVpZ2h0XG4gICAgcmV0dXJuIHRoaXMuX2ZmdDJTZWxmKDEpLm1hcFNlbGYodiA9PiB7XG4gICAgICB2LnJlIC89IG5cbiAgICAgIHYuaW0gLz0gblxuICAgICAgcmV0dXJuIHZcbiAgICB9KVxuICB9XG5cbiAgX2ZmdDJTZWxmIChzaWduID0gLTEpIHtcbiAgICBjb25zb2xlLmFzc2VydCh0aGlzLndpZHRoID09PSB0aGlzLmhlaWdodCwgJ0NhbiBvbmx5IGZmdCBzcXVhcmUgaW1hZ2VzJylcbiAgICBjb25zdCBudW1CaXRzID0gTWF0aC5sb2cyKHRoaXMud2lkdGgpXG4gICAgY29uc29sZS5hc3NlcnQoXG4gICAgICBudW1CaXRzID09PSBNYXRoLmZsb29yKG51bUJpdHMpLFxuICAgICAgJ0NhbiBvbmx5IGZmdCBpbWFnZXMgd2hvc2Ugc2l6ZSBpcyBhIHBvd2VyIG9mIDInXG4gICAgKVxuXG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLmhlaWdodDsgeSsrKSB7XG4gICAgICB0aGlzLl9mZnQxU2VsZih7IHg6IDAsIHkgfSwgdGhpcy53aWR0aCwgeyB4OiAxLCB5OiAwIH0sIHNpZ24pXG4gICAgfVxuICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy53aWR0aDsgeCsrKSB7XG4gICAgICB0aGlzLl9mZnQxU2VsZih7IHgsIHk6IDAgfSwgdGhpcy5oZWlnaHQsIHsgeDogMCwgeTogMSB9LCBzaWduKVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDb21wbGV4IHtcbiAgY29uc3RydWN0b3IgKHJlLCBpbSkge1xuICAgIHRoaXMucmUgPSByZVxuICAgIHRoaXMuaW0gPSBpbVxuICB9XG5cbiAgc3RhdGljIGZyb21DYXJ0ZXNpYW5PYmplY3QgKHsgcmUgPSAwLCBpbSA9IDAgfSA9IHt9KSB7XG4gICAgcmV0dXJuIG5ldyBDb21wbGV4KHJlLCBpbSlcbiAgfVxuXG4gIHN0YXRpYyBmcm9tRXVsZXIgKHIgPSAwLCBwaGkgPSAwKSB7XG4gICAgcmV0dXJuIG5ldyBDb21wbGV4KHIgKiBNYXRoLmNvcyhwaGkpLCByICogTWF0aC5zaW4ocGhpKSlcbiAgfVxuXG4gIGNvcHkgKCkge1xuICAgIHJldHVybiBuZXcgQ29tcGxleCh0aGlzLnJlLCB0aGlzLmltKVxuICB9XG5cbiAgYWRkU2VsZiAob3RoZXIpIHtcbiAgICB0aGlzLnJlICs9IG90aGVyLnJlXG4gICAgdGhpcy5pbSArPSBvdGhlci5pbVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBzdWJ0cmFjdFNlbGYgKG90aGVyKSB7XG4gICAgdGhpcy5yZSAtPSBvdGhlci5yZVxuICAgIHRoaXMuaW0gLT0gb3RoZXIuaW1cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgbXVsdGlwbHlTZWxmIChvdGhlcikge1xuICAgIGNvbnN0IHsgcmUsIGltIH0gPSB0aGlzXG4gICAgdGhpcy5yZSA9IHJlICogb3RoZXIucmUgLSBpbSAqIG90aGVyLmltXG4gICAgdGhpcy5pbSA9IHJlICogb3RoZXIuaW0gKyBpbSAqIG90aGVyLnJlXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxufVxuIiwiaW1wb3J0IHsgTWVzc2FnZVN0cmVhbSB9IGZyb20gJy4vd29ya2VyLXV0aWxzLmpzJ1xuaW1wb3J0IHsgR3JheUltYWdlRjMyTjBGOCB9IGZyb20gJy4vaW1hZ2UtdXRpbHMuanMnXG5cbmNvbnN0IGJheWVyQ2FjaGUgPSBbbmV3IEdyYXlJbWFnZUYzMk4wRjgobmV3IEZsb2F0MzJBcnJheShbMCwgMywgMiwgMV0pLCAyLCAyKV1cblxuZnVuY3Rpb24gY2FsY3VsYXRlQmF5ZXJMZXZlbCAobGV2ZWwpIHtcbiAgaWYgKCFiYXllckNhY2hlW2xldmVsXSkge1xuICAgIGNvbnN0IGJheWVyU2l6ZSA9IDIgKiogKGxldmVsICsgMSlcbiAgICBjb25zdCBiYXllciA9IEdyYXlJbWFnZUYzMk4wRjguZW1wdHkoYmF5ZXJTaXplLCBiYXllclNpemUpXG4gICAgY29uc3QgcHJldkxldmVsID0gY2FsY3VsYXRlQmF5ZXJMZXZlbChsZXZlbCAtIDEpXG4gICAgY29uc3QgaGFsZlNpemUgPSBiYXllclNpemUgLyAyXG4gICAgZm9yIChjb25zdCB7IHgsIHksIHBpeGVsIH0gb2YgYmF5ZXIuYWxsUGl4ZWxzKCkpIHtcbiAgICAgIGNvbnN0IHF1YWRyYW50WCA9IHggPj0gYmF5ZXJTaXplIC8gMiA/IDEgOiAwXG4gICAgICBjb25zdCBxdWFkcmFudFkgPSB5ID49IGJheWVyU2l6ZSAvIDIgPyAxIDogMFxuICAgICAgcGl4ZWxbMF0gPVxuICAgICAgICA0ICogcHJldkxldmVsLnBpeGVsQXQoeCAlIGhhbGZTaXplLCB5ICUgaGFsZlNpemUpWzBdICtcbiAgICAgICAgYmF5ZXJDYWNoZVswXS5waXhlbEF0KHF1YWRyYW50WCwgcXVhZHJhbnRZKVswXVxuICAgIH1cbiAgICBiYXllckNhY2hlW2xldmVsXSA9IGJheWVyXG4gIH1cbiAgcmV0dXJuIGJheWVyQ2FjaGVbbGV2ZWxdXG59XG5cbmFzeW5jIGZ1bmN0aW9uIGluaXQgKCkge1xuICBjb25zdCByZWFkZXIgPSBNZXNzYWdlU3RyZWFtKCkuZ2V0UmVhZGVyKClcblxuICB3aGlsZSAodHJ1ZSkge1xuICAgIGNvbnN0IHtcbiAgICAgIHZhbHVlOiB7IGxldmVsLCBpZCB9XG4gICAgfSA9IGF3YWl0IHJlYWRlci5yZWFkKClcblxuICAgIGNvbnN0IGJheWVyID0gY2FsY3VsYXRlQmF5ZXJMZXZlbChsZXZlbClcbiAgICBjb25zdCBzaXplID0gYmF5ZXIud2lkdGggKiogMlxuICAgIHBvc3RNZXNzYWdlKHsgaWQsIHJlc3VsdDogYmF5ZXIuY29weSgpLm1hcFNlbGYodiA9PiB2IC8gc2l6ZSkgfSlcbiAgfVxufVxuaW5pdCgpXG4iXSwibmFtZXMiOlsic3VtIl0sIm1hcHBpbmdzIjoiOztBQUFPLFdBQVMsZ0JBQWlCO0FBQy9CLFdBQU8sSUFBSSxlQUFlO0FBQUEsTUFDeEIsTUFBTyxZQUFZO0FBQ2pCLGFBQUssaUJBQWlCLFdBQVcsUUFBTSxXQUFXLFFBQVEsR0FBRyxJQUFJLENBQUM7QUFBQSxNQUNwRTtBQUFBLElBQ0osQ0FBRztBQUFBLEVBQ0g7QUNnQ08sV0FBUyxNQUFPLEtBQUssR0FBRyxLQUFLO0FBQ2xDLFFBQUksSUFBSSxLQUFLO0FBQ1gsYUFBTztBQUFBLElBQ1Q7QUFDQSxRQUFJLElBQUksS0FBSztBQUNYLGFBQU87QUFBQSxJQUNUO0FBQ0EsV0FBTztBQUFBLEVBQ1Q7QUFFTyxXQUFTLHFCQUFzQixHQUFHLEdBQUcsR0FBRztBQUM3QyxXQUFPLE9BQU8sSUFBSSxPQUFPLElBQUksT0FBTztBQUFBLEVBQ3RDO0FBRU8sV0FBUyxtQkFBb0IsR0FBRyxHQUFHLEdBQUc7QUFDM0MsV0FBTztBQUFBLE1BQ0wsYUFBYSxDQUFDO0FB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
