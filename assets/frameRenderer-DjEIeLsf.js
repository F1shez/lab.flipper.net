var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
const config = {
  width: 128,
  height: 64,
  activeColor: "black",
  inactiveColor: "#ff8201"
};
class FrameRenderer {
  constructor(canvas, width = config.width, height = config.height) {
    __publicField(this, "canvas");
    __publicField(this, "ctx");
    this.canvas = canvas;
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.lineWidth = 1;
    this.ctx.lineCap = "square";
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.fillStyle = config.inactiveColor;
    this.ctx.fillRect(0, 0, width, height);
    this.ctx.fillStyle = config.activeColor;
  }
  getCanvas() {
    return this.canvas;
  }
  renderFrame({
    data,
    scale = 1,
    activeColor = config.activeColor,
    inactiveColor = config.inactiveColor
  }) {
    if (!data) {
      return;
    }
    for (let x = 0; x < 128; x++) {
      for (let y = 0; y < 64; y++) {
        const i = Math.floor(y / 8) * 128 + x;
        const z = y & 7;
        const dataAt = data.at(i);
        if (dataAt && dataAt & 1 << z) {
          this.ctx.fillStyle = activeColor;
        } else {
          this.ctx.fillStyle = inactiveColor;
        }
        this.ctx.fillRect(x * scale, y * scale, scale, scale);
      }
    }
  }
}
export {
  FrameRenderer as F
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVSZW5kZXJlci1EakVJZUxzZi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NoYXJlZC9saWIvZmxpcHBlckpzL2ZyYW1lUmVuZGVyZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgY29uZmlnID0ge1xuICB3aWR0aDogMTI4LFxuICBoZWlnaHQ6IDY0LFxuICBhY3RpdmVDb2xvcjogJ2JsYWNrJyxcbiAgaW5hY3RpdmVDb2xvcjogJyNmZjgyMDEnXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZyYW1lUmVuZGVyZXIge1xuICBwcml2YXRlIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnRcbiAgcHJpdmF0ZSBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRFxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQsXG4gICAgd2lkdGggPSBjb25maWcud2lkdGgsXG4gICAgaGVpZ2h0ID0gY29uZmlnLmhlaWdodFxuICApIHtcbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhc1xuICAgIHRoaXMuY2FudmFzLndpZHRoID0gd2lkdGhcbiAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSBoZWlnaHRcbiAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJykhXG5cbiAgICB0aGlzLmN0eC5saW5lV2lkdGggPSAxXG4gICAgdGhpcy5jdHgubGluZUNhcCA9ICdzcXVhcmUnXG4gICAgdGhpcy5jdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2VcbiAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBjb25maWcuaW5hY3RpdmVDb2xvclxuICAgIHRoaXMuY3R4LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpXG4gICAgdGhpcy5jdHguZmlsbFN0eWxlID0gY29uZmlnLmFjdGl2ZUNvbG9yXG4gIH1cblxuICBwdWJsaWMgZ2V0Q2FudmFzKCkge1xuICAgIHJldHVybiB0aGlzLmNhbnZhc1xuICB9XG5cbiAgcHVibGljIHJlbmRlckZyYW1lKHtcbiAgICBkYXRhLFxuICAgIHNjYWxlID0gMSxcbiAgICBhY3RpdmVDb2xvciA9IGNvbmZpZy5hY3RpdmVDb2xvcixcbiAgICBpbmFjdGl2ZUNvbG9yID0gY29uZmlnLmluYWN0aXZlQ29sb3JcbiAgfToge1xuICAgIGRhdGE6IFVpbnQ4QXJyYXlcbiAgICBzY2FsZT86IG51bWJlclxuICAgIGFjdGl2ZUNvbG9yPzogc3RyaW5nXG4gICAgaW5hY3RpdmVDb2xvcj86IHN0cmluZ1xuICB9KSB7XG4gICAgaWYgKCFkYXRhKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IDEyODsgeCsrKSB7XG4gICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IDY0OyB5KyspIHtcbiAgICAgICAgY29uc3QgaSA9IE1hdGguZmxvb3IoeSAvIDgpICogMTI4ICsgeFxuICAgICAgICBjb25zdCB6ID0geSAmIDdcblxuICAgICAgICBjb25zdCBkYXRhQXQgPSBkYXRhLmF0KGkpXG4gICAgICAgIGlmIChkYXRhQXQgJiYgZGF0YUF0ICYgKDEgPDwgeikpIHtcbiAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBhY3RpdmVDb2xvclxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IGluYWN0aXZlQ29sb3JcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KHggKiBzY2FsZSwgeSAqIHNjYWxlLCBzY2FsZSwgc2NhbGUpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBTSxTQUFTO0FBQUEsRUFDYixPQUFPO0FBQUEsRUFDUCxRQUFRO0FBQUEsRUFDUixhQUFhO0FBQUEsRUFDYixlQUFlO0FBQ2pCO0FBRUEsTUFBcUIsY0FBYztBQUFBLEVBSWpDLFlBQ0UsUUFDQSxRQUFRLE9BQU8sT0FDZixTQUFTLE9BQU8sUUFDaEI7QUFQTTtBQUNBO0FBT04sU0FBSyxTQUFTO0FBQ2QsU0FBSyxPQUFPLFFBQVE7QUFDcEIsU0FBSyxPQUFPLFNBQVM7QUFDckIsU0FBSyxNQUFNLEtBQUssT0FBTyxXQUFXLElBQUk7QUFFdEMsU0FBSyxJQUFJLFlBQVk7QUFDckIsU0FBSyxJQUFJLFVBQVU7QUFDbkIsU0FBSyxJQUFJLHdCQUF3QjtBQUNqQyxTQUFLLElBQUksWUFBWSxPQUFPO0FBQzVCLFNBQUssSUFBSSxTQUFTLEdBQUcsR0FBRyxPQUFPLE1BQU07QUFDckMsU0FBSyxJQUFJLFlBQVksT0FBTztBQUFBLEVBQzlCO0FBQUEsRUFFTyxZQUFZO0FBQ2pCLFdBQU8sS0FBSztBQUFBLEVBQ2Q7QUFBQSxFQUVPLFlBQVk7QUFBQSxJQUNqQjtBQUFBLElBQ0EsUUFBUTtBQUFBLElBQ1IsY0FBYyxPQUFPO0FBQUEsSUFDckIsZ0JBQWdCLE9BQU87QUFBQSxFQUFBLEdBTXRCO0FBQ0QsUUFBSSxDQUFDLE1BQU07QUFDVDtBQUFBLElBQ0Y7QUFFQSxhQUFTLElBQUksR0FBRyxJQUFJLEtBQUssS0FBSztBQUM1QixlQUFTLElBQUksR0FBRyxJQUFJLElBQUksS0FBSztBQUMzQixjQUFNLElBQUksS0FBSyxNQUFNLElBQUksQ0FBQyxJQUFJLE1BQU07QUFDcEMsY0FBTSxJQUFJLElBQUk7QUFFZCxjQUFNLFNBQVMsS0FBSyxHQUFHLENBQUM7QUFDeEIsWUFBSSxVQUFVLFNBQVUsS0FBSyxHQUFJO0FBQy9CLGVBQUssSUFBSSxZQUFZO0FBQUEsUUFDdkIsT0FBTztBQUNMLGVBQUssSUFBSSxZQUFZO0FBQUEsUUFDdkI7QUFFQSxhQUFLLElBQUksU0FBUyxJQUFJLE9BQU8sSUFBSSxPQUFPLE9BQU8sS0FBSztBQUFBLE1BQ3REO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjsifQ==
