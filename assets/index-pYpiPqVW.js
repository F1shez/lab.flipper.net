import { G as GenericPageLayout } from "./GenericPageLayout-CL0iQIrR.js";
import { d as defineComponent, a as ref, S as onMounted, w as watch, U as onBeforeUnmount, _ as _export_sfc, n as createElementBlock, f as openBlock, p as createBaseVNode, j as createVNode, Q as QBtn, F as Fragment, c as computed, aB as Notify, e as createBlock, i as createCommentVNode, g as withCtx, k as QIcon, l as createTextVNode } from "./index-BXn1qSjA.js";
import { Q as QFile } from "./QFile-0l0Wo5F5.js";
import { Q as QSelect } from "./QSelect--lwtQ9LH.js";
import { Q as QInput } from "./QInput-B42UgMmF.js";
import { u as useNumbersOnly } from "./useNumberOnly-DgLME2Yk.js";
import "./axios-Djb__N3o.js";
import { k as useFlipperStore } from "./KeypadButton.vue_vue_type_style_index_0_scoped_4cc0fc91_lang-B0Vue97M.js";
import "./QSpace-CENODZda.js";
import "./QToolbar-D5FagYN5.js";
import "./use-file-dom-props-CkTfPNnd.js";
import "./_commonjsHelpers-BruQt46T.js";
import "./private.use-form-DlR7USk8.js";
import "./QMenu-OiOcQlb1.js";
/**
    Determine divisor and SI prefix.

    @author Christian W. Zuckschwerdt <zany@triq.net>
    @copyright Christian W. Zuckschwerdt, 2019
    @license
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 2 of the License, or
    (at your option) any later version.
*/
const autoranges = [
  { name: "yotta", scale: 1e24, prefix: "Y" },
  { name: "zetta", scale: 1e21, prefix: "Z" },
  { name: "exa", scale: 1e18, prefix: "E" },
  { name: "peta", scale: 1e15, prefix: "P" },
  { name: "tera", scale: 1e12, prefix: "T" },
  { name: "giga", scale: 1e9, prefix: "G" },
  { name: "mega", scale: 1e6, prefix: "M" },
  { name: "kilo", scale: 1e3, prefix: "k" },
  { name: "", scale: 1, prefix: "" },
  { name: "milli", scale: 1e-3, prefix: "m" },
  { name: "micro", scale: 1e-6, prefix: "µ" },
  { name: "nano", scale: 1e-9, prefix: "n" },
  { name: "pico", scale: 1e-12, prefix: "p" },
  { name: "femto", scale: 1e-15, prefix: "f" },
  { name: "atto", scale: 1e-18, prefix: "a" },
  { name: "zepto", scale: 1e-21, prefix: "z" },
  { name: "yocto", scale: 1e-24, prefix: "y" }
];
function autorange(num, min_int = 10) {
  if (num === 0) {
    return autoranges[8];
  }
  num = num / min_int;
  for (let i = 0; i < autoranges.length; ++i) {
    if (num >= autoranges[i].scale) {
      return autoranges[i];
    }
  }
  return autoranges[autoranges.length - 1];
}
const autoranges_time = [
  { name: "year", scale: 31557513, prefix: "Y" },
  { name: "month", scale: 2635200, prefix: "M" },
  { name: "day", scale: 86400, prefix: "D" },
  { name: "hour", scale: 3600, prefix: "h" },
  { name: "minute", scale: 60, prefix: "m" },
  { name: "second", scale: 1, prefix: "s" },
  { name: "milli", scale: 1e-3, prefix: "ms" },
  { name: "micro", scale: 1e-6, prefix: "µs" },
  { name: "nano", scale: 1e-9, prefix: "ns" },
  { name: "pico", scale: 1e-12, prefix: "ps" },
  { name: "femto", scale: 1e-15, prefix: "fs" },
  { name: "atto", scale: 1e-18, prefix: "as" },
  { name: "zepto", scale: 1e-21, prefix: "zs" },
  { name: "yocto", scale: 1e-24, prefix: "ys" }
];
function autorange_time(num, min_int = 10) {
  if (num === 0) {
    return autoranges_time[8];
  }
  num = num / min_int;
  for (let i = 0; i < autoranges_time.length; ++i) {
    if (num >= autoranges_time[i].scale) {
      return autoranges_time[i];
    }
  }
  return autoranges_time[autoranges_time.length - 1];
}
/**
    @file Bitbuffer JS.

    @author Christian W. Zuckschwerdt <zany@triq.net>
    @copyright Christian W. Zuckschwerdt, 2020
    @license
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 2 of the License, or
    (at your option) any later version.
*/
class Bitbuffer {
  constructor(bytes = [], len = 0) {
    if (Array.isArray(bytes)) {
      this.bytes = bytes;
      this.len = len || bytes.length * 8;
    } else {
      this.fromString(bytes);
    }
  }
  fromString(s) {
    this.bytes = [];
    this.len = 0;
    let len = -1;
    s = s.trim();
    if (s.startsWith("{")) {
      const end = s.indexOf("}");
      if (end < 0) return;
      len = parseInt(s.slice(1), 10);
      s = s.slice(end + 1);
    }
    if (s.startsWith("0x")) {
      s = s.slice(2);
    }
    for (const c of s) {
      const n = parseInt(c, 16);
      this.pushNibble(n);
    }
    if (len >= 0) {
      this.len = len;
    }
  }
  pushZero() {
    this.push(0);
  }
  pushOne() {
    this.push(1);
  }
  pushSymbol(s) {
    if (s === "0") {
      this.push(0);
    } else if (s === "1") {
      this.push(1);
    }
  }
  push(bit) {
    bit = bit ? 128 : 0;
    this.bytes[~~(this.len / 8)] |= bit >> this.len % 8;
    this.len += 1;
  }
  pushNibble(n) {
    for (let j = 3; j >= 0; --j) {
      this.push(n >> j & 1);
    }
  }
  pushByte(n) {
    for (let j = 7; j >= 0; --j) {
      this.push(n >> j & 1);
    }
  }
  pushBreak() {
    const b = ~~((this.len + 7) / 8);
    this.bytes[b] = -1;
    this.len = (b + 1) * 8;
  }
  toBitArray() {
    const bits = [];
    for (let j = 0; j < this.len; ++j) {
      const byte = this.bytes[~~(j / 8)] || 0;
      const bit = byte >> 7 - j % 8 & 1;
      bits.push(bit);
    }
    return bits;
  }
  toHexString() {
    let s = `{${this.len}}`;
    for (let j = 0; j < this.len; j += 8) {
      const b = this.bytes[~~(j / 8)] || 0;
      if (b < 0) {
        s += " / ";
      } else {
        s += " ";
        s += (b >> 4).toString(16).toUpperCase();
        if (j + 4 < this.len) {
          s += (b & 15).toString(16).toUpperCase();
        }
      }
    }
    return s;
  }
}
/**
    @file Pulse Slicer JS.

    @author Christian W. Zuckschwerdt <zany@triq.net>
    @copyright Christian W. Zuckschwerdt, 2020
    @license
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 2 of the License, or
    (at your option) any later version.
*/
function sliceGuess(pulses, guess) {
  if (guess.modulation === "PCM") {
    return slicePCM(pulses, guess);
  } else if (guess.modulation === "MC") {
    return sliceMC(pulses, guess);
  } else if (guess.modulation === "PPM") {
    return slicePPM(pulses, guess);
  } else if (guess.modulation === "PWM") {
    return slicePWM(pulses, guess);
  } else if (guess.modulation === "DM") {
    return sliceDM(pulses, guess);
  } else if (guess.modulation === "NRZI") {
    return sliceNRZI(pulses, guess);
  } else if (guess.modulation === "CMI") {
    return sliceCMI(pulses, guess);
  } else if (guess.modulation === "PIWM") {
    return slicePIWM(pulses, guess);
  } else {
    return [];
  }
}
function slicePCM(pulses, guess) {
  if (!guess.long || guess.long === guess.short) {
    return sliceNRZ(pulses, guess);
  } else {
    return sliceRZ(pulses, guess);
  }
}
function sliceNRZ(pulses, guess) {
  const short = guess.short;
  const gap = guess.gap;
  const bits = new Bitbuffer();
  const hints = [];
  let x = 0;
  for (let j = 0; j < pulses.length; j += 1) {
    const symbol = 1 - j % 2;
    const w = pulses[j];
    if (gap && w > gap) {
      bits.pushBreak();
    } else {
      const cnt = ~~(w / short + 0.5);
      for (let k = 0; k < cnt; ++k) {
        hints.push([x + w / cnt * k, x + w / cnt * (k + 1), symbol]);
        bits.push(symbol);
      }
    }
    x += w;
  }
  return { hints, bits };
}
function sliceRZ(pulses, guess) {
  const short = guess.short;
  const long = guess.long;
  const gap = guess.gap;
  const shortl = short * 0.5;
  const shortu = short * 1.5;
  const bits = new Bitbuffer();
  const hints = [];
  let x = 0;
  for (let j = 0; j < pulses.length; j += 2) {
    const m = pulses[j];
    const s = pulses[j + 1];
    if (m < shortl || m > shortu) {
      bits.pushBreak();
      x += m + s;
      continue;
    }
    let onew = m * long / short;
    let zs = s + m - onew;
    if (zs < long / 2) {
      onew = m + s;
      zs = 0;
    }
    hints.push([x, x + onew, "1"]);
    bits.pushOne();
    x += onew;
    if (gap && s > gap) {
      bits.pushBreak();
      x += zs;
      continue;
    }
    const cnt = ~~(zs / long + 0.5);
    for (let k = 0; k < cnt; ++k) {
      hints.push([x + zs * k / cnt, x + zs * (k + 1) / cnt, "0"]);
      bits.pushZero();
    }
    x += zs;
  }
  return { hints, bits };
}
function slicePPM(pulses, guess) {
  const short = guess.short;
  const long = guess.long;
  const sync = guess.sync;
  const gap = guess.gap;
  const shortl = short * 0.5;
  const shortu = short * 1.5;
  const longl = long * 0.5;
  const longu = long * 1.5;
  const syncl = sync * 0.5;
  const syncu = sync * 1.5;
  const bits = new Bitbuffer();
  const hints = [];
  let x = 0;
  for (let j = 0; j < pulses.length; j += 2) {
    const m = pulses[j];
    const s = pulses[j + 1];
    const x0 = x;
    x += m + s;
    if (s > shortl && s < shortu) {
      hints.push([x0, x, "1"]);
      bits.pushOne();
    } else if (s > longl && s < longu) {
      hints.push([x0, x, "0"]);
      bits.pushZero();
    } else if (s > syncl && s < syncu) {
      hints.push([x0, x, "X"]);
      bits.pushBreak();
    } else if (gap && s > gap) {
      bits.pushBreak();
    }
  }
  return { hints, bits };
}
function slicePWM(pulses, guess) {
  const short = guess.short;
  const long = guess.long;
  const sync = guess.sync;
  const gap = guess.gap;
  const shortl = short * 0.5;
  const shortu = short * 1.5;
  const longl = long * 0.5;
  const longu = long * 1.5;
  const syncl = sync * 0.5;
  const syncu = sync * 1.5;
  const bits = new Bitbuffer();
  const hints = [];
  let x = 0;
  for (let j = 0; j < pulses.length; j += 2) {
    const m = pulses[j];
    const s = pulses[j + 1];
    const x0 = x;
    let x1 = x + m + s;
    if (s > gap) {
      x1 = x + m + gap;
    }
    x += m + s;
    if (m > shortl && m < shortu) {
      hints.push([x0, x1, "1"]);
      bits.pushOne();
    } else if (m > longl && m < longu) {
      hints.push([x0, x1, "0"]);
      bits.pushZero();
    } else if (m > syncl && m < syncu) {
      hints.push([x0, x1, "X"]);
      bits.pushBreak();
    }
    if (gap && s > gap) {
      bits.pushBreak();
    }
  }
  return { hints, bits };
}
function manchesterAligned(pulses, offset, short) {
  for (let j = offset; j < pulses.length; j += 2) {
    const mw = pulses[j];
    const cw = ~~(mw / short + 0.5);
    if (cw > 1) return 0;
    const sw = pulses[j + 1];
    const sc = ~~(sw / short + 0.5);
    if (sc > 1) return 1;
  }
  return 0;
}
function sliceMC(pulses, guess) {
  const short = guess.short;
  const bits = new Bitbuffer();
  const hints = [];
  let aligned = manchesterAligned(pulses, 0, short);
  let x = 0;
  let x1 = 0;
  for (let j = 0; j < pulses.length; j += 2) {
    const mark = pulses[j];
    const mcnt = ~~(mark / short + 0.5);
    const space = pulses[j + 1];
    const scnt = ~~(space / short + 0.5);
    if (mcnt === 1) {
      if (!aligned) {
        hints.push([x1, x + mark, "0"]);
        bits.pushZero();
        x1 = x + mark;
      } else {
        x1 = x;
      }
      aligned = !aligned;
    } else if (mcnt === 2) {
      if (!aligned) {
        hints.push([x1, x + mark / 2, "0"]);
        bits.pushZero();
        x1 = x + mark / 2;
      } else {
        bits.pushBreak();
        x1 = x + mark / 2;
      }
      aligned = false;
    } else if (mcnt > 2) {
      if (!aligned) {
        hints.push([x1, x + mark / mcnt, "0"]);
        bits.pushZero();
        x1 = x + mark - mark / mcnt;
      } else {
        x1 = x + mark - mark / mcnt;
      }
      bits.pushBreak();
      aligned = manchesterAligned(pulses, j + 1, short);
    }
    if (scnt === 1) {
      if (!aligned) {
        hints.push([x1, x + mark + space, "1"]);
        bits.pushOne();
        x1 = x + mark + space;
      } else {
        x1 = x + mark;
      }
      aligned = !aligned;
    } else if (scnt === 2) {
      if (!aligned) {
        hints.push([x1, x + mark + space / 2, "1"]);
        bits.pushOne();
        x1 = x + mark + space / 2;
      } else {
        bits.pushBreak();
        x1 = x + mark + space / 2;
      }
      aligned = false;
    } else if (scnt > 2) {
      if (!aligned) {
        hints.push([x1, x + mark + space / scnt, "1"]);
        bits.pushOne();
        x1 = x + mark + space - space / scnt;
      } else {
        x1 = x + mark + space - space / scnt;
      }
      bits.pushBreak();
      aligned = manchesterAligned(pulses, j + 1, short);
    }
    x += mark + space;
  }
  return { hints, bits };
}
function sliceDM(pulses, guess) {
  const short = guess.short;
  const bits = new Bitbuffer();
  const hints = [];
  let x = 0;
  let x1 = null;
  for (let j = 0; j < pulses.length; j += 2) {
    const mark = pulses[j];
    const mcnt = ~~(mark / short + 0.5);
    const space = pulses[j + 1];
    const scnt = ~~(space / short + 0.5);
    if (!x1 && mcnt === 1 && scnt === 1) {
      hints.push([x, x + mark + space, "0"]);
      bits.pushZero();
    } else if (mcnt === 1 && scnt === 1) {
      hints.push([x1, x + mark, "0"]);
      bits.pushZero();
      x1 = x + mark;
    } else if (x1 && mcnt === 1 && scnt === 2) {
      hints.push([x1, x + mark, "0"]);
      bits.pushZero();
      hints.push([x + mark, x + mark + space, "1"]);
      bits.pushOne();
      x1 = null;
    } else if (mcnt === 2 && scnt === 1) {
      hints.push([x, x + mark, "1"]);
      bits.pushOne();
      x1 = x + mark;
    } else if (mcnt === 2 && scnt === 2) {
      hints.push([x, x + mark, "1"]);
      bits.pushOne();
      hints.push([x + mark, x + mark + space, "1"]);
      bits.pushOne();
    } else if (!x1 && mcnt === 1) {
      hints.push([x, x + mark + short, "0"]);
      bits.pushZero();
      bits.pushBreak();
    } else if (!x1 && mcnt === 2) {
      hints.push([x, x + mark, "1"]);
      bits.pushOne();
      bits.pushBreak();
    } else {
      if (x1) {
        hints.push([x1, x1 + short * 2, "0"]);
        bits.pushZero();
      }
      x1 = null;
      bits.pushBreak();
    }
    x += mark + space;
  }
  return { hints, bits };
}
function sliceNRZI(pulses, guess) {
  const short = guess.short;
  const bits = new Bitbuffer();
  const hints = [];
  let x = 0;
  let x1 = 0;
  for (let j = 0; j < pulses.length; j += 1) {
    const w = pulses[j];
    const cnt = ~~(w / short + 0.5);
    if (x1) {
      hints.push([x1, x + short / 2, "1"]);
      bits.pushOne();
    }
    x1 = x + short / 2;
    for (let k = 1; k < cnt; ++k) {
      hints.push([x1, x1 + w / cnt, "0"]);
      bits.pushZero();
      x1 += w / cnt;
    }
    x += w;
  }
  return { hints, bits };
}
function sliceCMI(pulses, guess) {
  const short = guess.short;
  const bits = new Bitbuffer();
  const hints = [];
  let x = 0;
  let x1 = null;
  for (let j = 0; j < pulses.length; j += 2) {
    const mark = pulses[j];
    const mcnt = ~~(mark / short + 0.5);
    const space = pulses[j + 1];
    const scnt = ~~(space / short + 0.5);
    if (mcnt === 1 && scnt === 1) {
      if (!x1) x1 = x - mark;
      hints.push([x1, x + mark, "0"]);
      bits.pushZero();
      x1 = x + mark;
    } else if (mcnt === 1 && scnt === 2) {
      if (!x1) x1 = x - mark;
      hints.push([x1, x + mark, "0"]);
      bits.pushZero();
      x1 = x + mark + space;
      hints.push([x + mark, x1, "1"]);
      bits.pushOne();
    } else if (mcnt === 1 && scnt === 3) {
      if (!x1) x1 = x - mark;
      hints.push([x1, x + mark, "0"]);
      bits.pushZero();
      x1 = x + mark + space * 2 / 3;
      hints.push([x + mark, x1, "1"]);
      bits.pushOne();
    } else if (mcnt === 2 && scnt === 1) {
      hints.push([x1, x + mark, "1"]);
      bits.pushOne();
      x1 = x + mark;
    } else if (mcnt === 2 && scnt === 2) {
      hints.push([x1, x + mark, "1"]);
      bits.pushOne();
      x1 = x + mark + space;
      hints.push([x + mark, x1, "1"]);
      bits.pushOne();
    } else if (mcnt === 2 && scnt === 3) {
      hints.push([x1, x + mark, "1"]);
      bits.pushOne();
      x1 = x + mark + space * 2 / 3;
      hints.push([x + mark, x1, "1"]);
      bits.pushOne();
    } else if (mcnt === 3 && scnt === 1) {
      hints.push([x1, x + mark / 3, "0"]);
      bits.pushZero();
      hints.push([x + mark / 3, x + mark, "1"]);
      bits.pushOne();
      x1 = x + mark;
    } else if (mcnt === 3 && scnt === 2) {
      hints.push([x1, x + mark / 3, "0"]);
      bits.pushZero();
      hints.push([x + mark / 3, x + mark, "1"]);
      bits.pushOne();
      x1 = x + mark + space;
      hints.push([x + mark, x1, "1"]);
      bits.pushOne();
    } else if (mcnt === 3 && scnt === 3) {
      hints.push([x1, x + mark / 3, "0"]);
      bits.pushZero();
      hints.push([x, x + mark / 3, "1"]);
      bits.pushOne();
      hints.push([x + mark / 3, x + mark, "1"]);
      bits.pushOne();
      hints.push([x + mark, x + mark + space * 3 / 2, "1"]);
      bits.pushOne();
      x1 = x + mark + space * 3 / 2;
    } else if (mcnt === 1) {
      hints.push([x1, x + mark, "0"]);
      bits.pushZero();
      bits.pushBreak();
      x1 = x + mark;
    } else if (mcnt === 2) {
      hints.push([x1, x + mark, "1"]);
      bits.pushOne();
      bits.pushBreak();
      x1 = x + mark;
    } else {
      bits.pushBreak();
    }
    x += mark + space;
  }
  return { hints, bits };
}
function slicePIWM(pulses, guess) {
  const short = guess.short;
  const bits = new Bitbuffer();
  const hints = [];
  let x = 0;
  for (let j = 0; j < pulses.length; j += 1) {
    const w = pulses[j];
    const cnt = ~~(w / short + 0.5);
    if (cnt === 1) {
      hints.push([x, x + w, "1"]);
      bits.pushOne();
    } else if (cnt === 2) {
      hints.push([x, x + w, "0"]);
      bits.pushZero();
    } else {
      bits.pushBreak();
    }
    x += w;
  }
  return { hints, bits };
}
const selector$1 = (elementOrSelector) => {
  if (!elementOrSelector) {
    return null;
  }
  if (typeof elementOrSelector === "string") {
    return document.querySelector(elementOrSelector);
  }
  return elementOrSelector;
};
const getBoundaries = (data, width, transform2) => {
  const maxRightSide = width * transform2.k;
  const pulseInOneX = data.width / maxRightSide;
  const leftSide = ~~(transform2.x * -1);
  const rightSide = ~~(transform2.x * -1 + width);
  const leftPulse = leftSide * pulseInOneX;
  const rightPulse = rightSide * pulseInOneX;
  return { leftPulse, rightPulse, pulseInOneX };
};
const combiningPulses = (data, pulseInOneX) => {
  const pulses = [];
  let prevX = 0;
  for (let i = 0; i < data.pulses.length; i++) {
    if (i % 2 !== 0) {
      if (data.pulses[i] >= pulseInOneX * 10) {
        pulses.push(prevX);
        pulses.push(data.pulses[i]);
        prevX = 0;
        continue;
      }
    }
    prevX += data.pulses[i];
  }
  if (prevX !== 0) {
    pulses.push(prevX);
  }
  return pulses;
};
const filterPulses = (data, sum, prevX, skipPulse, leftPulse, rightPulse) => {
  const pulses = data.filter((d) => {
    const minX = sum;
    sum += d;
    const maxX = sum;
    if (maxX >= leftPulse && minX <= rightPulse) return true;
    if (minX < leftPulse) {
      prevX += d;
      skipPulse += 1;
    }
    return false;
  });
  return { pulses, sum, prevX, skipPulse };
};
const drawFill = (context, x, y, width, height, color2) => {
  context.beginPath();
  context.fillStyle = color2;
  context.fillRect(x, y, width, height);
  context.closePath();
};
const drawLine = (context, coordinates, options) => {
  context.beginPath();
  context.lineWidth = options.lineWidth;
  context.strokeStyle = options.strokeStyle;
  context.moveTo(...coordinates.start);
  context.lineTo(...coordinates.end);
  context.stroke();
  context.closePath();
};
const drawText = (context, text, x, y, options) => {
  context.beginPath();
  context.fillStyle = options.color;
  context.font = options.font;
  context.textAlign = options.align;
  context.textBaseline = options.baseline;
  context.fillText(text, x, y);
  context.closePath();
};
const drawHint = (context, x, height, options) => {
  context.lineWidth = options.hintLine;
  context.strokeStyle = options.hintStroke;
  context.setLineDash(options.hintDash);
  context.beginPath();
  context.moveTo(x, 0);
  context.lineTo(x, height);
  context.stroke();
  context.setLineDash([]);
};
/**
    @file Hexbuffer JS.

    @author Christian W. Zuckschwerdt <zany@triq.net>
    @copyright Christian W. Zuckschwerdt, 2020
    @license
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 2 of the License, or
    (at your option) any later version.
*/
function dec2hex(i, w = 2) {
  return (i + 65536).toString(16).substr(-w).toUpperCase().replaceAll(".", "");
}
class Hexbuffer {
  constructor(line = "") {
    this.fromString(line);
  }
  fromString(s) {
    this.line = s.replace(/\s/g, "");
    this.index = 0;
  }
  hasNibble() {
    return this.index + 1 <= this.line.length;
  }
  hasByte() {
    return this.index + 2 <= this.line.length;
  }
  hasWord() {
    return this.index + 4 <= this.line.length;
  }
  peekNibble() {
    return parseInt(this.line.substr(this.index, 1), 16);
  }
  peekByte() {
    return parseInt(this.line.substr(this.index, 2), 16);
  }
  peekWord() {
    return parseInt(this.line.substr(this.index, 4), 16);
  }
  getNibble() {
    const r = parseInt(this.line.substr(this.index, 1), 16);
    this.index += 1;
    return r;
  }
  getByte() {
    const r = parseInt(this.line.substr(this.index, 2), 16);
    this.index += 2;
    return r;
  }
  getWord() {
    const r = parseInt(this.line.substr(this.index, 4), 16);
    this.index += 4;
    return r;
  }
  pushNibble(v) {
    this.line += dec2hex(v, 1);
  }
  pushByte(v) {
    this.line += dec2hex(v, 2);
  }
  pushWord(v) {
    this.line += dec2hex(v, 4);
  }
}
/**
    @file Histogram JS.

    @author Christian W. Zuckschwerdt <zany@triq.net>
    @copyright Christian W. Zuckschwerdt, 2020
    @license
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 2 of the License, or
    (at your option) any later version.
*/
const max_hist_bins = 16;
class Bin {
  constructor(num) {
    if (typeof num !== "undefined") {
      this.count = 1;
      this.sum = num;
      this.mean = num;
      this.devi = 0;
      this.min = num;
      this.max = num;
    } else {
      this.count = 0;
      this.sum = 0;
      this.mean = null;
      this.devi = 0;
      this.min = null;
      this.max = null;
    }
  }
  add(num) {
    this.count++;
    this.sum += num;
    this.mean = this.sum / this.count;
    this.min = this.min === null ? num : Math.min(num, this.min);
    this.max = this.max === null ? num : Math.max(num, this.max);
    this.devi = (this.max - this.min) / 2;
  }
  fuse(bin) {
    this.count += bin.count;
    this.sum += bin.sum;
    this.mean = this.sum / this.count;
    this.min = Math.min(this.min, bin.min);
    this.max = Math.max(this.max, bin.max);
    this.devi = (this.max - this.min) / 2;
  }
  contains(num) {
    return num >= this.min && num <= this.max;
  }
}
class Histogram {
  constructor(data, tolerance = 0.2) {
    this.bins = [];
    this.histogram_sum(data, tolerance);
  }
  get length() {
    return this.bins.length;
  }
  /// Generate a histogram (unsorted)
  histogram_sum(data, tolerance = 0.2) {
    const len = data.length;
    for (let n = 0; n < len; ++n) {
      let bin;
      for (bin = 0; bin < this.bins.length; ++bin) {
        const bn = data[n];
        const bm = this.bins[bin].mean;
        if (Math.abs(bn - bm) < tolerance * Math.max(bn, bm)) {
          this.bins[bin].add(data[n]);
          break;
        }
      }
      if (bin === this.bins.length && bin < max_hist_bins) {
        this.bins.push(new Bin(data[n]));
      }
    }
  }
  /// Delete bin from histogram
  delete_bin(index) {
    this.bins.splice(index, 1);
  }
  /// Swap two bins in histogram
  swap_bins(index1, index2) {
    if (index1 < this.bins.length && index2 < this.bins.length) {
      const tempbin = this.bins[index1];
      this.bins[index1] = this.bins[index2];
      this.bins[index2] = tempbin;
    }
  }
  /// Sort histogram with mean value (order lowest to highest)
  sort_mean() {
    if (this.bins.length < 2) return;
    for (let n = 0; n < this.bins.length - 1; ++n) {
      for (let m = n + 1; m < this.bins.length; ++m) {
        if (this.bins[m].mean < this.bins[n].mean) {
          this.swap_bins(m, n);
        }
      }
    }
  }
  /// Sort histogram with count value (order lowest to highest)
  sort_count() {
    if (this.bins.length < 2) return;
    for (let n = 0; n < this.bins.length - 1; ++n) {
      for (let m = n + 1; m < this.bins.length; ++m) {
        if (this.bins[m].count < this.bins[n].count) {
          this.swap_bins(m, n);
        }
      }
    }
  }
  /// Fuse histogram bins with means within tolerance
  fuse_bins(tolerance = 0.2) {
    if (this.bins.length < 2) return;
    for (let n = 0; n < this.bins.length - 1; ++n) {
      for (let m = n + 1; m < this.bins.length; ++m) {
        const bn = this.bins[n].mean;
        const bm = this.bins[m].mean;
        if (Math.abs(bn - bm) < tolerance * Math.max(bn, bm)) {
          this.bins[n].fuse(this.bins[m]);
          this.delete_bin(m);
          m--;
        }
      }
    }
  }
  /// Trim zero-width bins
  trim_bins(tolerance = 0) {
    for (let n = 0; n < this.bins.length; ++n) {
      if (this.bins[n].mean <= tolerance) {
        this.delete_bin(n);
      }
    }
  }
  /// Find bin index
  find_bin_index(width) {
    for (let n = 0; n < this.bins.length; ++n) {
      if (this.bins[n].contains(width)) {
        return n;
      }
    }
    return -1;
  }
  /// Print a histogram
  console_print() {
    for (let n = 0; n < this.bins.length; ++n) {
      const b = this.bins[n];
      console.log(
        `[${n}] ${b.count} × ${b.mean.toFixed(1)} ±${b.devi.toFixed(1)} µs [${b.min};${b.max}]`
      );
    }
  }
  string_print(separator = ", ") {
    const ret = [];
    for (let n = 0; n < this.bins.length; ++n) {
      const b = this.bins[n];
      ret.push(
        `${b.count}× ${b.mean.toFixed(1)} <small>±${b.devi.toFixed(
          1
        )}</small> µs`
      );
    }
    return ret.join(separator);
  }
}
class Analyzer {
  constructor(data, tolerance = 0.2) {
    this.analyse_pulses(data, tolerance);
    this.create_rfraw(data);
  }
  /// Create histograms from pulse data
  analyse_pulses(data, messages, tolerance = 0.2) {
    this.pulses = [];
    this.gaps = [];
    this.periods = [];
    this.pulse_sum = 0;
    this.gap_sum = 0;
    for (let j = 0; j < data.length - 2; j += 2) {
      const m2 = data[j];
      const s = data[j + 1];
      this.pulses.push(m2);
      this.gaps.push(s);
      this.periods.push(m2 + s);
      this.pulse_sum += m2;
      this.gap_sum += s;
    }
    const m = data[data.length - 2];
    this.pulses.push(m);
    this.pulse_sum += m;
    this.pulse_gap_ratio = this.pulse_sum / this.gap_sum;
    this.pulse_gap_skew = this.pulse_gap_ratio - 1;
    this.hist_pulses = new Histogram(this.pulses, tolerance);
    this.hist_gaps = new Histogram(this.gaps, tolerance);
    this.hist_periods = new Histogram(this.periods, tolerance);
    this.hist_timings = new Histogram(data, tolerance);
    this.hist_pulses.trim_bins(tolerance);
    this.hist_gaps.trim_bins(tolerance);
    this.hist_periods.trim_bins(tolerance);
    this.hist_timings.trim_bins(tolerance);
    this.hist_pulses.fuse_bins(tolerance);
    this.hist_gaps.fuse_bins(tolerance);
    this.hist_periods.fuse_bins(tolerance);
    this.hist_timings.fuse_bins(tolerance);
  }
  guess() {
    const pulses = this.hist_pulses;
    const gaps = this.hist_gaps;
    const periods = this.hist_periods;
    pulses.sort_mean();
    gaps.sort_mean();
    if (pulses.bins.length > 0 && pulses.bins[0].mean === 0) {
      pulses.delete_bin(0);
    }
    if (this.pulses.length === 1) {
      return {
        name: "Single pulse detected. Probably Frequency Shift Keying or just noise..."
      };
    } else if (pulses.length === 1 && gaps.length === 1) {
      return {
        name: "Un-modulated signal. Maybe a preamble..."
      };
    } else if (pulses.length === 1 && gaps.length > 1) {
      return {
        name: "Pulse Position Modulation with fixed pulse width",
        modulation: "PPM",
        short: gaps.bins[0].mean,
        long: gaps.bins[1].mean,
        gap: gaps.bins[1].max * 1.2,
        // Set limit above next lower gap
        reset: gaps.bins[gaps.length - 1].max * 1.2
        // Set limit above biggest gap
      };
    } else if (pulses.length === 2 && gaps.length === 1) {
      const short = pulses.bins[0].mean;
      const long = pulses.bins[1].mean;
      return {
        name: "Pulse Width Modulation with fixed gap",
        modulation: "PWM",
        short,
        long,
        tolerance: (long - short) * 0.4,
        reset: gaps.bins[gaps.length - 1].max * 1.2
        // Set limit above biggest gap
      };
    } else if (pulses.length === 2 && gaps.length === 2 && periods.length === 1) {
      const short = pulses.bins[0].mean;
      const long = pulses.bins[1].mean;
      return {
        name: "Pulse Width Modulation with fixed period",
        modulation: "PWM",
        short,
        long,
        tolerance: (long - short) * 0.4,
        reset: gaps.bins[gaps.length - 1].max * 1.2
        // Set limit above biggest gap
      };
    } else if (pulses.length === 2 && gaps.length === 2 && periods.length === 3) {
      const short = pulses.bins[0].mean;
      return {
        name: "Manchester coding (PCM)",
        modulation: "MC",
        short,
        // Assume shortest pulse is half period
        long: short,
        // Not used
        reset: gaps.bins[gaps.length - 1].max * 1.2
        // Set limit above biggest gap
      };
    } else if (pulses.length === 2 && gaps.length >= 3) {
      const short = pulses.bins[0].mean;
      const long = pulses.bins[1].mean;
      return {
        name: "Pulse Width Modulation with multiple packets",
        modulation: "PWM",
        short,
        long,
        gap: gaps.bins[1].max * 1.2,
        // Set limit above second gap
        tolerance: (long - short) * 0.4,
        reset: gaps.bins[gaps.length - 1].max * 1.2
        // Set limit above biggest gap
      };
    } else if (pulses.length >= 3 && gaps.length >= 3 && Math.abs(pulses.bins[1].mean - 2 * pulses.bins[0].mean) <= pulses.bins[0].mean / 8 && // Pulses are multiples of shortest pulse
    Math.abs(pulses.bins[2].mean - 3 * pulses.bins[0].mean) <= pulses.bins[0].mean / 8 && Math.abs(gaps.bins[0].mean - pulses.bins[0].mean) <= pulses.bins[0].mean / 8 && // Gaps are multiples of shortest pulse
    Math.abs(gaps.bins[1].mean - 2 * pulses.bins[0].mean) <= pulses.bins[0].mean / 8 && Math.abs(gaps.bins[2].mean - 3 * pulses.bins[0].mean) <= pulses.bins[0].mean / 8) {
      return {
        name: "Pulse Code Modulation (Not Return to Zero)",
        modulation: "PCM",
        short: pulses.bins[0].mean,
        // Shortest pulse is bit width
        long: pulses.bins[0].mean,
        // Bit period equal to pulse length (NRZ)
        reset: pulses.bins[0].mean * 1024
        // No limit to run of zeros...
      };
    } else if (pulses.length === 3) {
      pulses.sort_count();
      const p1 = pulses.bins[1].mean;
      const p2 = pulses.bins[2].mean;
      const short = p1 < p2 ? p1 : p2;
      const long = p1 < p2 ? p2 : p1;
      return {
        name: "Pulse Width Modulation with sync/delimiter",
        modulation: "PWM",
        short,
        long,
        sync: pulses.bins[0].mean,
        // Set to lowest count pulse width
        reset: gaps.bins[gaps.length - 1].max * 1.2
        // Set limit above biggest gap
      };
    } else {
      return {
        name: "No clue..."
      };
    }
  }
  create_rfraw(data) {
    const timings = this.hist_timings;
    if (timings.bins.length < 1) {
      return "";
    }
    if (timings.bins.length > 8) {
      return "";
    }
    if (data.length > 494) {
      return "";
    }
    const raw = new Hexbuffer();
    for (const b of timings.bins) {
      raw.pushWord(b.mean);
    }
    for (let j = 0; j < data.length - 1; j += 2) {
      const m = data[j];
      const s = data[j + 1];
      const mi = timings.find_bin_index(m);
      const si = timings.find_bin_index(s);
      raw.pushNibble(mi | 8);
      raw.pushNibble(si);
    }
    raw.pushByte(85);
    const raw0 = new Hexbuffer();
    raw0.pushByte(170);
    raw0.pushByte(176);
    raw0.pushByte(2 + raw.line.length / 2 - 1);
    raw0.pushByte(timings.bins.length);
    raw0.pushByte(1);
    const raw1 = new Hexbuffer();
    raw1.pushByte(170);
    raw1.pushByte(177);
    raw1.pushByte(timings.bins.length);
    this.rfrawB0 = raw0.line + raw.line;
    this.rfrawB1 = raw1.line + raw.line;
  }
  console_log() {
  }
  print_plain(messages) {
    const guess = this.guess();
    messages.innerHTML = `
        <div>Pulses: ${this.hist_pulses.string_print()}</div>
        <div>Gaps: ${this.hist_gaps.string_print()}</div>
        <div>Periods: ${this.hist_periods.string_print()}</div>
        <div>Timings: ${this.hist_timings.string_print()}</div>
        <div>${guess.name}</div>
        `;
  }
  /*
  const locale = new Intl.NumberFormat().resolvedOptions().locale
  const formatter = new Intl.NumberFormat(locale, {
      style: 'percent',
      signDisplay: 'exceptZero',
      maximumFractionDigits: 1,
  })
  formatter.format(0.5)
  */
  print(timings, messages) {
    const guess = this.guess();
    if (timings) {
      timings.innerHTML = `<table>
            <tr><th align="left">Pulses</th><td>${this.hist_pulses.string_print(
        "</td><td>"
      )}</td></tr>
            <tr><th align="left">Gaps</th><td>${this.hist_gaps.string_print(
        "</td><td>"
      )}</td></tr>
            <tr><th align="left">Periods</th><td>${this.hist_periods.string_print(
        "</td><td>"
      )}</td></tr>
            <tr><th align="left">Timings</th><td>${this.hist_timings.string_print(
        "</td><td>"
      )}</td></tr>
            </table>
            `;
    }
    if (messages) {
      messages.innerHTML = `
            <div><small>DC bias (Pulse/Gap skew): ${(this.pulse_gap_skew * 100).toFixed(1)}%</small><br>
            Guessing modulation: <strong>${guess.name}</strong><br>
            modulation: <strong>${guess.modulation || "unknown"}</strong>
            short: <strong>${guess.short ? guess.short.toFixed(1) : "-"}</strong>
            long: <strong>${guess.long ? guess.long.toFixed(1) : "-"}</strong>
            sync: <strong>${guess.sync ? guess.sync.toFixed(1) : "-"}</strong>
            gap: <strong>${guess.gap ? guess.gap.toFixed(1) : "-"}</strong>
            reset: <strong>${guess.reset ? guess.reset.toFixed(1) : "-"}</strong><br>
            <small>RfRaw (rx): <strong>${this.rfrawB1 ? this.rfrawB1 : "-"}</strong></small><br>
            <small>RfRaw (tx): <strong>${this.rfrawB0 ? this.rfrawB0 : "-"}</strong></small>
            </div>
            `;
    }
  }
}
const defaults = {
  selector: "#flipperPlotter",
  height: 300,
  margin: {
    top: 50,
    right: 0,
    bottom: 50,
    left: 0
  },
  breakpoints: {
    zoom: 10,
    pulseInOneX: 75
  },
  theme: {
    spaceFill: "#fafafa",
    combiningFill: "#e6ecee",
    hiFill: "#e0efe0",
    hiStroke: "#3c3",
    hiLine: 4,
    loStroke: "#c33",
    loLine: 4,
    edgeStroke: "#ccc",
    edgeLine: 1,
    hintLine: 1,
    hintStroke: "#aaf",
    hintDash: [3, 2],
    hintAltLine: 3,
    hintAltStroke: "#c55",
    hintAltDash: [3, 2],
    yHintLo: 115,
    yHintHi: 35,
    fontSize: 10,
    fontColor: "black",
    fontAlign: "center",
    fontBaseline: "middle"
  }
};
const styles = {
  relativePosition: "position: relative;",
  fullWidth: "width: 100% !important; margin-left: 0 !important; margin-right: 0 !important;",
  absoluteTopLeft: "position: absolute; top: 0; left: 0;"
};
const slicerOptions = [
  // { text: 'off', value: '' },
  { text: "PCM", value: "PCM" },
  { text: "PWM", value: "PWM" },
  { text: "PPM", value: "PPM" },
  { text: "MC", value: "MC" },
  { text: "DM", value: "DM" },
  { text: "NRZI", value: "NRZI" },
  { text: "CMI", value: "CMI" },
  { text: "PIWM", value: "PIWM" }
];
const constants$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  defaults,
  slicerOptions,
  styles
}, Symbol.toStringTag, { value: "Module" }));
function ascending$1(a, b) {
  return a == null || b == null ? NaN : a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}
function descending(a, b) {
  return a == null || b == null ? NaN : b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
}
function bisector(f) {
  let compare1, compare2, delta;
  if (f.length !== 2) {
    compare1 = ascending$1;
    compare2 = (d, x) => ascending$1(f(d), x);
    delta = (d, x) => f(d) - x;
  } else {
    compare1 = f === ascending$1 || f === descending ? f : zero$1;
    compare2 = f;
    delta = f;
  }
  function left(a, x, lo = 0, hi = a.length) {
    if (lo < hi) {
      if (compare1(x, x) !== 0) return hi;
      do {
        const mid = lo + hi >>> 1;
        if (compare2(a[mid], x) < 0) lo = mid + 1;
        else hi = mid;
      } while (lo < hi);
    }
    return lo;
  }
  function right(a, x, lo = 0, hi = a.length) {
    if (lo < hi) {
      if (compare1(x, x) !== 0) return hi;
      do {
        const mid = lo + hi >>> 1;
        if (compare2(a[mid], x) <= 0) lo = mid + 1;
        else hi = mid;
      } while (lo < hi);
    }
    return lo;
  }
  function center2(a, x, lo = 0, hi = a.length) {
    const i = left(a, x, lo, hi - 1);
    return i > lo && delta(a[i - 1], x) > -delta(a[i], x) ? i - 1 : i;
  }
  return { left, center: center2, right };
}
function zero$1() {
  return 0;
}
function number$2(x) {
  return x === null ? NaN : +x;
}
const ascendingBisect = bisector(ascending$1);
const bisectRight = ascendingBisect.right;
bisector(number$2).center;
const e10 = Math.sqrt(50), e5 = Math.sqrt(10), e2 = Math.sqrt(2);
function tickSpec(start2, stop, count) {
  const step = (stop - start2) / Math.max(0, count), power = Math.floor(Math.log10(step)), error = step / Math.pow(10, power), factor = error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1;
  let i1, i2, inc;
  if (power < 0) {
    inc = Math.pow(10, -power) / factor;
    i1 = Math.round(start2 * inc);
    i2 = Math.round(stop * inc);
    if (i1 / inc < start2) ++i1;
    if (i2 / inc > stop) --i2;
    inc = -inc;
  } else {
    inc = Math.pow(10, power) * factor;
    i1 = Math.round(start2 / inc);
    i2 = Math.round(stop / inc);
    if (i1 * inc < start2) ++i1;
    if (i2 * inc > stop) --i2;
  }
  if (i2 < i1 && 0.5 <= count && count < 2) return tickSpec(start2, stop, count * 2);
  return [i1, i2, inc];
}
function ticks(start2, stop, count) {
  stop = +stop, start2 = +start2, count = +count;
  if (!(count > 0)) return [];
  if (start2 === stop) return [start2];
  const reverse = stop < start2, [i1, i2, inc] = reverse ? tickSpec(stop, start2, count) : tickSpec(start2, stop, count);
  if (!(i2 >= i1)) return [];
  const n = i2 - i1 + 1, ticks2 = new Array(n);
  if (reverse) {
    if (inc < 0) for (let i = 0; i < n; ++i) ticks2[i] = (i2 - i) / -inc;
    else for (let i = 0; i < n; ++i) ticks2[i] = (i2 - i) * inc;
  } else {
    if (inc < 0) for (let i = 0; i < n; ++i) ticks2[i] = (i1 + i) / -inc;
    else for (let i = 0; i < n; ++i) ticks2[i] = (i1 + i) * inc;
  }
  return ticks2;
}
function tickIncrement(start2, stop, count) {
  stop = +stop, start2 = +start2, count = +count;
  return tickSpec(start2, stop, count)[2];
}
function tickStep(start2, stop, count) {
  stop = +stop, start2 = +start2, count = +count;
  const reverse = stop < start2, inc = reverse ? tickIncrement(stop, start2, count) : tickIncrement(start2, stop, count);
  return (reverse ? -1 : 1) * (inc < 0 ? 1 / -inc : inc);
}
function identity$4(x) {
  return x;
}
var top = 1, epsilon = 1e-6;
function translateX(x) {
  return "translate(" + x + ",0)";
}
function number$1(scale) {
  return (d) => +scale(d);
}
function center(scale, offset) {
  offset = Math.max(0, scale.bandwidth() - offset * 2) / 2;
  if (scale.round()) offset = Math.round(offset);
  return (d) => +scale(d) + offset;
}
function entering() {
  return !this.__axis;
}
function axis(orient, scale) {
  var tickArguments = [], tickValues = null, tickFormat2 = null, tickSizeInner = 6, tickSizeOuter = 6, tickPadding = 3, offset = typeof window !== "undefined" && window.devicePixelRatio > 1 ? 0 : 0.5, k = -1, x = "y", transform2 = translateX;
  function axis2(context) {
    var values = tickValues == null ? scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain() : tickValues, format2 = tickFormat2 == null ? scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments) : identity$4 : tickFormat2, spacing = Math.max(tickSizeInner, 0) + tickPadding, range = scale.range(), range0 = +range[0] + offset, range1 = +range[range.length - 1] + offset, position = (scale.bandwidth ? center : number$1)(scale.copy(), offset), selection2 = context.selection ? context.selection() : context, path = selection2.selectAll(".domain").data([null]), tick = selection2.selectAll(".tick").data(values, scale).order(), tickExit = tick.exit(), tickEnter = tick.enter().append("g").attr("class", "tick"), line = tick.select("line"), text = tick.select("text");
    path = path.merge(path.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor"));
    tick = tick.merge(tickEnter);
    line = line.merge(tickEnter.append("line").attr("stroke", "currentColor").attr(x + "2", k * tickSizeInner));
    text = text.merge(tickEnter.append("text").attr("fill", "currentColor").attr(x, k * spacing).attr("dy", "0em"));
    if (context !== selection2) {
      path = path.transition(context);
      tick = tick.transition(context);
      line = line.transition(context);
      text = text.transition(context);
      tickExit = tickExit.transition(context).attr("opacity", epsilon).attr("transform", function(d) {
        return isFinite(d = position(d)) ? transform2(d + offset) : this.getAttribute("transform");
      });
      tickEnter.attr("opacity", epsilon).attr("transform", function(d) {
        var p = this.parentNode.__axis;
        return transform2((p && isFinite(p = p(d)) ? p : position(d)) + offset);
      });
    }
    tickExit.remove();
    path.attr("d", tickSizeOuter ? "M" + range0 + "," + k * tickSizeOuter + "V" + offset + "H" + range1 + "V" + k * tickSizeOuter : "M" + range0 + "," + offset + "H" + range1);
    tick.attr("opacity", 1).attr("transform", function(d) {
      return transform2(position(d) + offset);
    });
    line.attr(x + "2", k * tickSizeInner);
    text.attr(x, k * spacing).text(format2);
    selection2.filter(entering).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", "middle");
    selection2.each(function() {
      this.__axis = position;
    });
  }
  axis2.scale = function(_) {
    return arguments.length ? (scale = _, axis2) : scale;
  };
  axis2.ticks = function() {
    return tickArguments = Array.from(arguments), axis2;
  };
  axis2.tickArguments = function(_) {
    return arguments.length ? (tickArguments = _ == null ? [] : Array.from(_), axis2) : tickArguments.slice();
  };
  axis2.tickValues = function(_) {
    return arguments.length ? (tickValues = _ == null ? null : Array.from(_), axis2) : tickValues && tickValues.slice();
  };
  axis2.tickFormat = function(_) {
    return arguments.length ? (tickFormat2 = _, axis2) : tickFormat2;
  };
  axis2.tickSize = function(_) {
    return arguments.length ? (tickSizeInner = tickSizeOuter = +_, axis2) : tickSizeInner;
  };
  axis2.tickSizeInner = function(_) {
    return arguments.length ? (tickSizeInner = +_, axis2) : tickSizeInner;
  };
  axis2.tickSizeOuter = function(_) {
    return arguments.length ? (tickSizeOuter = +_, axis2) : tickSizeOuter;
  };
  axis2.tickPadding = function(_) {
    return arguments.length ? (tickPadding = +_, axis2) : tickPadding;
  };
  axis2.offset = function(_) {
    return arguments.length ? (offset = +_, axis2) : offset;
  };
  return axis2;
}
function axisTop(scale) {
  return axis(top, scale);
}
var noop = { value: () => {
} };
function dispatch() {
  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
    if (!(t = arguments[i] + "") || t in _ || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
    _[t] = [];
  }
  return new Dispatch(_);
}
function Dispatch(_) {
  this._ = _;
}
function parseTypenames$1(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    return { type: t, name };
  });
}
Dispatch.prototype = dispatch.prototype = {
  constructor: Dispatch,
  on: function(typename, callback) {
    var _ = this._, T = parseTypenames$1(typename + "", _), t, i = -1, n = T.length;
    if (arguments.length < 2) {
      while (++i < n) if ((t = (typename = T[i]).type) && (t = get$1(_[t], typename.name))) return t;
      return;
    }
    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
    while (++i < n) {
      if (t = (typename = T[i]).type) _[t] = set$1(_[t], typename.name, callback);
      else if (callback == null) for (t in _) _[t] = set$1(_[t], typename.name, null);
    }
    return this;
  },
  copy: function() {
    var copy2 = {}, _ = this._;
    for (var t in _) copy2[t] = _[t].slice();
    return new Dispatch(copy2);
  },
  call: function(type, that) {
    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  },
  apply: function(type, that, args) {
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  }
};
function get$1(type, name) {
  for (var i = 0, n = type.length, c; i < n; ++i) {
    if ((c = type[i]).name === name) {
      return c.value;
    }
  }
}
function set$1(type, name, callback) {
  for (var i = 0, n = type.length; i < n; ++i) {
    if (type[i].name === name) {
      type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
      break;
    }
  }
  if (callback != null) type.push({ name, value: callback });
  return type;
}
var xhtml = "http://www.w3.org/1999/xhtml";
const namespaces = {
  svg: "http://www.w3.org/2000/svg",
  xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function namespace(name) {
  var prefix = name += "", i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
  return namespaces.hasOwnProperty(prefix) ? { space: namespaces[prefix], local: name } : name;
}
function creatorInherit(name) {
  return function() {
    var document2 = this.ownerDocument, uri = this.namespaceURI;
    return uri === xhtml && document2.documentElement.namespaceURI === xhtml ? document2.createElement(name) : document2.createElementNS(uri, name);
  };
}
function creatorFixed(fullname) {
  return function() {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}
function creator(name) {
  var fullname = namespace(name);
  return (fullname.local ? creatorFixed : creatorInherit)(fullname);
}
function none() {
}
function selector(selector2) {
  return selector2 == null ? none : function() {
    return this.querySelector(selector2);
  };
}
function selection_select(select2) {
  if (typeof select2 !== "function") select2 = selector(select2);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select2.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }
  return new Selection$1(subgroups, this._parents);
}
function array(x) {
  return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
}
function empty() {
  return [];
}
function selectorAll(selector2) {
  return selector2 == null ? empty : function() {
    return this.querySelectorAll(selector2);
  };
}
function arrayAll(select2) {
  return function() {
    return array(select2.apply(this, arguments));
  };
}
function selection_selectAll(select2) {
  if (typeof select2 === "function") select2 = arrayAll(select2);
  else select2 = selectorAll(select2);
  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select2.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }
  return new Selection$1(subgroups, parents);
}
function matcher(selector2) {
  return function() {
    return this.matches(selector2);
  };
}
function childMatcher(selector2) {
  return function(node) {
    return node.matches(selector2);
  };
}
var find = Array.prototype.find;
function childFind(match) {
  return function() {
    return find.call(this.children, match);
  };
}
function childFirst() {
  return this.firstElementChild;
}
function selection_selectChild(match) {
  return this.select(match == null ? childFirst : childFind(typeof match === "function" ? match : childMatcher(match)));
}
var filter = Array.prototype.filter;
function children() {
  return Array.from(this.children);
}
function childrenFilter(match) {
  return function() {
    return filter.call(this.children, match);
  };
}
function selection_selectChildren(match) {
  return this.selectAll(match == null ? children : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
}
function selection_filter(match) {
  if (typeof match !== "function") match = matcher(match);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }
  return new Selection$1(subgroups, this._parents);
}
function sparse(update) {
  return new Array(update.length);
}
function selection_enter() {
  return new Selection$1(this._enter || this._groups.map(sparse), this._parents);
}
function EnterNode(parent, datum2) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum2;
}
EnterNode.prototype = {
  constructor: EnterNode,
  appendChild: function(child) {
    return this._parent.insertBefore(child, this._next);
  },
  insertBefore: function(child, next) {
    return this._parent.insertBefore(child, next);
  },
  querySelector: function(selector2) {
    return this._parent.querySelector(selector2);
  },
  querySelectorAll: function(selector2) {
    return this._parent.querySelectorAll(selector2);
  }
};
function constant$2(x) {
  return function() {
    return x;
  };
}
function bindIndex(parent, group, enter, update, exit, data) {
  var i = 0, node, groupLength = group.length, dataLength = data.length;
  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }
  for (; i < groupLength; ++i) {
    if (node = group[i]) {
      exit[i] = node;
    }
  }
}
function bindKey(parent, group, enter, update, exit, data, key) {
  var i, node, nodeByKeyValue = /* @__PURE__ */ new Map(), groupLength = group.length, dataLength = data.length, keyValues = new Array(groupLength), keyValue;
  for (i = 0; i < groupLength; ++i) {
    if (node = group[i]) {
      keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
      if (nodeByKeyValue.has(keyValue)) {
        exit[i] = node;
      } else {
        nodeByKeyValue.set(keyValue, node);
      }
    }
  }
  for (i = 0; i < dataLength; ++i) {
    keyValue = key.call(parent, data[i], i, data) + "";
    if (node = nodeByKeyValue.get(keyValue)) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue.delete(keyValue);
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }
  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && nodeByKeyValue.get(keyValues[i]) === node) {
      exit[i] = node;
    }
  }
}
function datum(node) {
  return node.__data__;
}
function selection_data(value, key) {
  if (!arguments.length) return Array.from(this, datum);
  var bind = key ? bindKey : bindIndex, parents = this._parents, groups = this._groups;
  if (typeof value !== "function") value = constant$2(value);
  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j], group = groups[j], groupLength = group.length, data = arraylike(value.call(parent, parent && parent.__data__, j, parents)), dataLength = data.length, enterGroup = enter[j] = new Array(dataLength), updateGroup = update[j] = new Array(dataLength), exitGroup = exit[j] = new Array(groupLength);
    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1) i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength) ;
        previous._next = next || null;
      }
    }
  }
  update = new Selection$1(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
}
function arraylike(data) {
  return typeof data === "object" && "length" in data ? data : Array.from(data);
}
function selection_exit() {
  return new Selection$1(this._exit || this._groups.map(sparse), this._parents);
}
function selection_join(onenter, onupdate, onexit) {
  var enter = this.enter(), update = this, exit = this.exit();
  if (typeof onenter === "function") {
    enter = onenter(enter);
    if (enter) enter = enter.selection();
  } else {
    enter = enter.append(onenter + "");
  }
  if (onupdate != null) {
    update = onupdate(update);
    if (update) update = update.selection();
  }
  if (onexit == null) exit.remove();
  else onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
}
function selection_merge(context) {
  var selection2 = context.selection ? context.selection() : context;
  for (var groups0 = this._groups, groups1 = selection2._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }
  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }
  return new Selection$1(merges, this._parents);
}
function selection_order() {
  for (var groups = this._groups, j = -1, m = groups.length; ++j < m; ) {
    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0; ) {
      if (node = group[i]) {
        if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }
  return this;
}
function selection_sort(compare) {
  if (!compare) compare = ascending;
  function compareNode(a, b) {
    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
  }
  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        sortgroup[i] = node;
      }
    }
    sortgroup.sort(compareNode);
  }
  return new Selection$1(sortgroups, this._parents).order();
}
function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}
function selection_call() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}
function selection_nodes() {
  return Array.from(this);
}
function selection_node() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node) return node;
    }
  }
  return null;
}
function selection_size() {
  let size = 0;
  for (const node of this) ++size;
  return size;
}
function selection_empty() {
  return !this.node();
}
function selection_each(callback) {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
  }
  return this;
}
function attrRemove$1(name) {
  return function() {
    this.removeAttribute(name);
  };
}
function attrRemoveNS$1(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant$1(name, value) {
  return function() {
    this.setAttribute(name, value);
  };
}
function attrConstantNS$1(fullname, value) {
  return function() {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}
function attrFunction$1(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttribute(name);
    else this.setAttribute(name, v);
  };
}
function attrFunctionNS$1(fullname, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
    else this.setAttributeNS(fullname.space, fullname.local, v);
  };
}
function selection_attr(name, value) {
  var fullname = namespace(name);
  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
  }
  return this.each((value == null ? fullname.local ? attrRemoveNS$1 : attrRemove$1 : typeof value === "function" ? fullname.local ? attrFunctionNS$1 : attrFunction$1 : fullname.local ? attrConstantNS$1 : attrConstant$1)(fullname, value));
}
function defaultView(node) {
  return node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView;
}
function styleRemove$1(name) {
  return function() {
    this.style.removeProperty(name);
  };
}
function styleConstant$1(name, value, priority) {
  return function() {
    this.style.setProperty(name, value, priority);
  };
}
function styleFunction$1(name, value, priority) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.style.removeProperty(name);
    else this.style.setProperty(name, v, priority);
  };
}
function selection_style(name, value, priority) {
  return arguments.length > 1 ? this.each((value == null ? styleRemove$1 : typeof value === "function" ? styleFunction$1 : styleConstant$1)(name, value, priority == null ? "" : priority)) : styleValue(this.node(), name);
}
function styleValue(node, name) {
  return node.style.getPropertyValue(name) || defaultView(node).getComputedStyle(node, null).getPropertyValue(name);
}
function propertyRemove(name) {
  return function() {
    delete this[name];
  };
}
function propertyConstant(name, value) {
  return function() {
    this[name] = value;
  };
}
function propertyFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) delete this[name];
    else this[name] = v;
  };
}
function selection_property(name, value) {
  return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name, value)) : this.node()[name];
}
function classArray(string) {
  return string.trim().split(/^|\s+/);
}
function classList(node) {
  return node.classList || new ClassList(node);
}
function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute("class") || "");
}
ClassList.prototype = {
  add: function(name) {
    var i = this._names.indexOf(name);
    if (i < 0) {
      this._names.push(name);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function(name) {
    var i = this._names.indexOf(name);
    if (i >= 0) {
      this._names.splice(i, 1);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function(name) {
    return this._names.indexOf(name) >= 0;
  }
};
function classedAdd(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.add(names[i]);
}
function classedRemove(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.remove(names[i]);
}
function classedTrue(names) {
  return function() {
    classedAdd(this, names);
  };
}
function classedFalse(names) {
  return function() {
    classedRemove(this, names);
  };
}
function classedFunction(names, value) {
  return function() {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}
function selection_classed(name, value) {
  var names = classArray(name + "");
  if (arguments.length < 2) {
    var list = classList(this.node()), i = -1, n = names.length;
    while (++i < n) if (!list.contains(names[i])) return false;
    return true;
  }
  return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names, value));
}
function textRemove() {
  this.textContent = "";
}
function textConstant$1(value) {
  return function() {
    this.textContent = value;
  };
}
function textFunction$1(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}
function selection_text(value) {
  return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction$1 : textConstant$1)(value)) : this.node().textContent;
}
function htmlRemove() {
  this.innerHTML = "";
}
function htmlConstant(value) {
  return function() {
    this.innerHTML = value;
  };
}
function htmlFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}
function selection_html(value) {
  return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
}
function raise() {
  if (this.nextSibling) this.parentNode.appendChild(this);
}
function selection_raise() {
  return this.each(raise);
}
function lower() {
  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function selection_lower() {
  return this.each(lower);
}
function selection_append(name) {
  var create2 = typeof name === "function" ? name : creator(name);
  return this.select(function() {
    return this.appendChild(create2.apply(this, arguments));
  });
}
function constantNull() {
  return null;
}
function selection_insert(name, before) {
  var create2 = typeof name === "function" ? name : creator(name), select2 = before == null ? constantNull : typeof before === "function" ? before : selector(before);
  return this.select(function() {
    return this.insertBefore(create2.apply(this, arguments), select2.apply(this, arguments) || null);
  });
}
function remove() {
  var parent = this.parentNode;
  if (parent) parent.removeChild(this);
}
function selection_remove() {
  return this.each(remove);
}
function selection_cloneShallow() {
  var clone = this.cloneNode(false), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function selection_cloneDeep() {
  var clone = this.cloneNode(true), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function selection_clone(deep) {
  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
}
function selection_datum(value) {
  return arguments.length ? this.property("__data__", value) : this.node().__data__;
}
function contextListener(listener) {
  return function(event) {
    listener.call(this, event, this.__data__);
  };
}
function parseTypenames(typenames) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    return { type: t, name };
  });
}
function onRemove(typename) {
  return function() {
    var on = this.__on;
    if (!on) return;
    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
      } else {
        on[++i] = o;
      }
    }
    if (++i) on.length = i;
    else delete this.__on;
  };
}
function onAdd(typename, value, options) {
  return function() {
    var on = this.__on, o, listener = contextListener(value);
    if (on) for (var j = 0, m = on.length; j < m; ++j) {
      if ((o = on[j]).type === typename.type && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
        this.addEventListener(o.type, o.listener = listener, o.options = options);
        o.value = value;
        return;
      }
    }
    this.addEventListener(typename.type, listener, options);
    o = { type: typename.type, name: typename.name, value, listener, options };
    if (!on) this.__on = [o];
    else on.push(o);
  };
}
function selection_on(typename, value, options) {
  var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;
  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
      for (i = 0, o = on[j]; i < n; ++i) {
        if ((t = typenames[i]).type === o.type && t.name === o.name) {
          return o.value;
        }
      }
    }
    return;
  }
  on = value ? onAdd : onRemove;
  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options));
  return this;
}
function dispatchEvent(node, type, params) {
  var window2 = defaultView(node), event = window2.CustomEvent;
  if (typeof event === "function") {
    event = new event(type, params);
  } else {
    event = window2.document.createEvent("Event");
    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
    else event.initEvent(type, false, false);
  }
  node.dispatchEvent(event);
}
function dispatchConstant(type, params) {
  return function() {
    return dispatchEvent(this, type, params);
  };
}
function dispatchFunction(type, params) {
  return function() {
    return dispatchEvent(this, type, params.apply(this, arguments));
  };
}
function selection_dispatch(type, params) {
  return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type, params));
}
function* selection_iterator() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) yield node;
    }
  }
}
var root = [null];
function Selection$1(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}
function selection() {
  return new Selection$1([[document.documentElement]], root);
}
function selection_selection() {
  return this;
}
Selection$1.prototype = selection.prototype = {
  constructor: Selection$1,
  select: selection_select,
  selectAll: selection_selectAll,
  selectChild: selection_selectChild,
  selectChildren: selection_selectChildren,
  filter: selection_filter,
  data: selection_data,
  enter: selection_enter,
  exit: selection_exit,
  join: selection_join,
  merge: selection_merge,
  selection: selection_selection,
  order: selection_order,
  sort: selection_sort,
  call: selection_call,
  nodes: selection_nodes,
  node: selection_node,
  size: selection_size,
  empty: selection_empty,
  each: selection_each,
  attr: selection_attr,
  style: selection_style,
  property: selection_property,
  classed: selection_classed,
  text: selection_text,
  html: selection_html,
  raise: selection_raise,
  lower: selection_lower,
  append: selection_append,
  insert: selection_insert,
  remove: selection_remove,
  clone: selection_clone,
  datum: selection_datum,
  on: selection_on,
  dispatch: selection_dispatch,
  [Symbol.iterator]: selection_iterator
};
function select(selector2) {
  return typeof selector2 === "string" ? new Selection$1([[document.querySelector(selector2)]], [document.documentElement]) : new Selection$1([[selector2]], root);
}
function create$1(name) {
  return select(creator(name).call(document.documentElement));
}
function sourceEvent(event) {
  let sourceEvent2;
  while (sourceEvent2 = event.sourceEvent) event = sourceEvent2;
  return event;
}
function pointer(event, node) {
  event = sourceEvent(event);
  if (node === void 0) node = event.currentTarget;
  if (node) {
    var svg = node.ownerSVGElement || node;
    if (svg.createSVGPoint) {
      var point = svg.createSVGPoint();
      point.x = event.clientX, point.y = event.clientY;
      point = point.matrixTransform(node.getScreenCTM().inverse());
      return [point.x, point.y];
    }
    if (node.getBoundingClientRect) {
      var rect = node.getBoundingClientRect();
      return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
    }
  }
  return [event.pageX, event.pageY];
}
const nonpassivecapture = { capture: true, passive: false };
function noevent$1(event) {
  event.preventDefault();
  event.stopImmediatePropagation();
}
function dragDisable(view) {
  var root2 = view.document.documentElement, selection2 = select(view).on("dragstart.drag", noevent$1, nonpassivecapture);
  if ("onselectstart" in root2) {
    selection2.on("selectstart.drag", noevent$1, nonpassivecapture);
  } else {
    root2.__noselect = root2.style.MozUserSelect;
    root2.style.MozUserSelect = "none";
  }
}
function yesdrag(view, noclick) {
  var root2 = view.document.documentElement, selection2 = select(view).on("dragstart.drag", null);
  if (noclick) {
    selection2.on("click.drag", noevent$1, nonpassivecapture);
    setTimeout(function() {
      selection2.on("click.drag", null);
    }, 0);
  }
  if ("onselectstart" in root2) {
    selection2.on("selectstart.drag", null);
  } else {
    root2.style.MozUserSelect = root2.__noselect;
    delete root2.__noselect;
  }
}
function define(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}
function Color() {
}
var darker = 0.7;
var brighter = 1 / darker;
var reI = "\\s*([+-]?\\d+)\\s*", reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", reHex = /^#([0-9a-f]{3,8})$/, reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`), reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`), reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`), reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`), reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`), reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);
var named = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
define(Color, color, {
  copy(channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: color_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHex8: color_formatHex8,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});
function color_formatHex() {
  return this.rgb().formatHex();
}
function color_formatHex8() {
  return this.rgb().formatHex8();
}
function color_formatHsl() {
  return hslConvert(this).formatHsl();
}
function color_formatRgb() {
  return this.rgb().formatRgb();
}
function color(format2) {
  var m, l;
  format2 = (format2 + "").trim().toLowerCase();
  return (m = reHex.exec(format2)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) : l === 3 ? new Rgb(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) : l === 8 ? rgba(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) : l === 4 ? rgba(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) : null) : (m = reRgbInteger.exec(format2)) ? new Rgb(m[1], m[2], m[3], 1) : (m = reRgbPercent.exec(format2)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : (m = reRgbaInteger.exec(format2)) ? rgba(m[1], m[2], m[3], m[4]) : (m = reRgbaPercent.exec(format2)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : (m = reHslPercent.exec(format2)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) : (m = reHslaPercent.exec(format2)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) : named.hasOwnProperty(format2) ? rgbn(named[format2]) : format2 === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(n) {
  return new Rgb(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}
function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb();
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}
function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}
function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}
define(Rgb, rgb, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatHex8: rgb_formatHex8,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));
function rgb_formatHex() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
}
function rgb_formatHex8() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function rgb_formatRgb() {
  const a = clampa(this.opacity);
  return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
}
function clampa(opacity) {
  return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
}
function clampi(value) {
  return Math.max(0, Math.min(255, Math.round(value) || 0));
}
function hex(value) {
  value = clampi(value);
  return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;
  else if (l <= 0 || l >= 1) h = s = NaN;
  else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}
function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl();
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, min = Math.min(r, g, b), max = Math.max(r, g, b), h = NaN, s = max - min, l = (max + min) / 2;
  if (s) {
    if (r === max) h = (g - b) / s + (g < b) * 6;
    else if (g === max) h = (b - r) / s + 2;
    else h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}
function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}
function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}
define(Hsl, hsl, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb() {
    var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  clamp() {
    return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl() {
    const a = clampa(this.opacity);
    return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
  }
}));
function clamph(value) {
  value = (value || 0) % 360;
  return value < 0 ? value + 360 : value;
}
function clampt(value) {
  return Math.max(0, Math.min(1, value || 0));
}
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}
const constant$1 = (x) => () => x;
function linear$1(a, d) {
  return function(t) {
    return a + t * d;
  };
}
function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
    return Math.pow(a + t * b, y);
  };
}
function gamma(y) {
  return (y = +y) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y) : constant$1(isNaN(a) ? b : a);
  };
}
function nogamma(a, b) {
  var d = b - a;
  return d ? linear$1(a, d) : constant$1(isNaN(a) ? b : a);
}
const interpolateRgb = function rgbGamma(y) {
  var color2 = gamma(y);
  function rgb$1(start2, end) {
    var r = color2((start2 = rgb(start2)).r, (end = rgb(end)).r), g = color2(start2.g, end.g), b = color2(start2.b, end.b), opacity = nogamma(start2.opacity, end.opacity);
    return function(t) {
      start2.r = r(t);
      start2.g = g(t);
      start2.b = b(t);
      start2.opacity = opacity(t);
      return start2 + "";
    };
  }
  rgb$1.gamma = rgbGamma;
  return rgb$1;
}(1);
function numberArray(a, b) {
  if (!b) b = [];
  var n = a ? Math.min(b.length, a.length) : 0, c = b.slice(), i;
  return function(t) {
    for (i = 0; i < n; ++i) c[i] = a[i] * (1 - t) + b[i] * t;
    return c;
  };
}
function isNumberArray(x) {
  return ArrayBuffer.isView(x) && !(x instanceof DataView);
}
function genericArray(a, b) {
  var nb = b ? b.length : 0, na = a ? Math.min(nb, a.length) : 0, x = new Array(na), c = new Array(nb), i;
  for (i = 0; i < na; ++i) x[i] = interpolate$1(a[i], b[i]);
  for (; i < nb; ++i) c[i] = b[i];
  return function(t) {
    for (i = 0; i < na; ++i) c[i] = x[i](t);
    return c;
  };
}
function date(a, b) {
  var d = /* @__PURE__ */ new Date();
  return a = +a, b = +b, function(t) {
    return d.setTime(a * (1 - t) + b * t), d;
  };
}
function interpolateNumber(a, b) {
  return a = +a, b = +b, function(t) {
    return a * (1 - t) + b * t;
  };
}
function object(a, b) {
  var i = {}, c = {}, k;
  if (a === null || typeof a !== "object") a = {};
  if (b === null || typeof b !== "object") b = {};
  for (k in b) {
    if (k in a) {
      i[k] = interpolate$1(a[k], b[k]);
    } else {
      c[k] = b[k];
    }
  }
  return function(t) {
    for (k in i) c[k] = i[k](t);
    return c;
  };
}
var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, reB = new RegExp(reA.source, "g");
function zero(b) {
  return function() {
    return b;
  };
}
function one(b) {
  return function(t) {
    return b(t) + "";
  };
}
function interpolateString(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i = -1, s = [], q = [];
  a = a + "", b = b + "";
  while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) {
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs;
      else s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) {
      if (s[i]) s[i] += bm;
      else s[++i] = bm;
    } else {
      s[++i] = null;
      q.push({ i, x: interpolateNumber(am, bm) });
    }
    bi = reB.lastIndex;
  }
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs;
    else s[++i] = bs;
  }
  return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function(t) {
    for (var i2 = 0, o; i2 < b; ++i2) s[(o = q[i2]).i] = o.x(t);
    return s.join("");
  });
}
function interpolate$1(a, b) {
  var t = typeof b, c;
  return b == null || t === "boolean" ? constant$1(b) : (t === "number" ? interpolateNumber : t === "string" ? (c = color(b)) ? (b = c, interpolateRgb) : interpolateString : b instanceof color ? interpolateRgb : b instanceof Date ? date : isNumberArray(b) ? numberArray : Array.isArray(b) ? genericArray : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object : interpolateNumber)(a, b);
}
function interpolateRound(a, b) {
  return a = +a, b = +b, function(t) {
    return Math.round(a * (1 - t) + b * t);
  };
}
var degrees = 180 / Math.PI;
var identity$3 = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function decompose(a, b, c, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees,
    skewX: Math.atan(skewX) * degrees,
    scaleX,
    scaleY
  };
}
var svgNode;
function parseCss(value) {
  const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
  return m.isIdentity ? identity$3 : decompose(m.a, m.b, m.c, m.d, m.e, m.f);
}
function parseSvg(value) {
  if (value == null) return identity$3;
  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate())) return identity$3;
  value = value.matrix;
  return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
}
function interpolateTransform(parse, pxComma, pxParen, degParen) {
  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }
  function translate(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q.push({ i: i - 4, x: interpolateNumber(xa, xb) }, { i: i - 2, x: interpolateNumber(ya, yb) });
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }
  function rotate(a, b, s, q) {
    if (a !== b) {
      if (a - b > 180) b += 360;
      else if (b - a > 180) a += 360;
      q.push({ i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: interpolateNumber(a, b) });
    } else if (b) {
      s.push(pop(s) + "rotate(" + b + degParen);
    }
  }
  function skewX(a, b, s, q) {
    if (a !== b) {
      q.push({ i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: interpolateNumber(a, b) });
    } else if (b) {
      s.push(pop(s) + "skewX(" + b + degParen);
    }
  }
  function scale(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({ i: i - 4, x: interpolateNumber(xa, xb) }, { i: i - 2, x: interpolateNumber(ya, yb) });
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }
  return function(a, b) {
    var s = [], q = [];
    a = parse(a), b = parse(b);
    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
    rotate(a.rotate, b.rotate, s, q);
    skewX(a.skewX, b.skewX, s, q);
    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
    a = b = null;
    return function(t) {
      var i = -1, n = q.length, o;
      while (++i < n) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  };
}
var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");
var epsilon2 = 1e-12;
function cosh(x) {
  return ((x = Math.exp(x)) + 1 / x) / 2;
}
function sinh(x) {
  return ((x = Math.exp(x)) - 1 / x) / 2;
}
function tanh(x) {
  return ((x = Math.exp(2 * x)) - 1) / (x + 1);
}
const interpolateZoom = function zoomRho(rho, rho2, rho4) {
  function zoom2(p0, p1) {
    var ux0 = p0[0], uy0 = p0[1], w0 = p0[2], ux1 = p1[0], uy1 = p1[1], w1 = p1[2], dx = ux1 - ux0, dy = uy1 - uy0, d2 = dx * dx + dy * dy, i, S;
    if (d2 < epsilon2) {
      S = Math.log(w1 / w0) / rho;
      i = function(t) {
        return [
          ux0 + t * dx,
          uy0 + t * dy,
          w0 * Math.exp(rho * t * S)
        ];
      };
    } else {
      var d1 = Math.sqrt(d2), b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1), b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1), r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0), r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
      S = (r1 - r0) / rho;
      i = function(t) {
        var s = t * S, coshr0 = cosh(r0), u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
        return [
          ux0 + u * dx,
          uy0 + u * dy,
          w0 * coshr0 / cosh(rho * s + r0)
        ];
      };
    }
    i.duration = S * 1e3 * rho / Math.SQRT2;
    return i;
  }
  zoom2.rho = function(_) {
    var _1 = Math.max(1e-3, +_), _2 = _1 * _1, _4 = _2 * _2;
    return zoomRho(_1, _2, _4);
  };
  return zoom2;
}(Math.SQRT2, 2, 4);
var frame = 0, timeout$1 = 0, interval = 0, pokeDelay = 1e3, taskHead, taskTail, clockLast = 0, clockNow = 0, clockSkew = 0, clock = typeof performance === "object" && performance.now ? performance : Date, setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) {
  setTimeout(f, 17);
};
function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}
function clearNow() {
  clockNow = 0;
}
function Timer() {
  this._call = this._time = this._next = null;
}
Timer.prototype = timer.prototype = {
  constructor: Timer,
  restart: function(callback, delay, time) {
    if (typeof callback !== "function") throw new TypeError("callback is not a function");
    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail !== this) {
      if (taskTail) taskTail._next = this;
      else taskHead = this;
      taskTail = this;
    }
    this._call = callback;
    this._time = time;
    sleep();
  },
  stop: function() {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep();
    }
  }
};
function timer(callback, delay, time) {
  var t = new Timer();
  t.restart(callback, delay, time);
  return t;
}
function timerFlush() {
  now();
  ++frame;
  var t = taskHead, e;
  while (t) {
    if ((e = clockNow - t._time) >= 0) t._call.call(void 0, e);
    t = t._next;
  }
  --frame;
}
function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  frame = timeout$1 = 0;
  try {
    timerFlush();
  } finally {
    frame = 0;
    nap();
    clockNow = 0;
  }
}
function poke() {
  var now2 = clock.now(), delay = now2 - clockLast;
  if (delay > pokeDelay) clockSkew -= delay, clockLast = now2;
}
function nap() {
  var t0, t1 = taskHead, t2, time = Infinity;
  while (t1) {
    if (t1._call) {
      if (time > t1._time) time = t1._time;
      t0 = t1, t1 = t1._next;
    } else {
      t2 = t1._next, t1._next = null;
      t1 = t0 ? t0._next = t2 : taskHead = t2;
    }
  }
  taskTail = t0;
  sleep(time);
}
function sleep(time) {
  if (frame) return;
  if (timeout$1) timeout$1 = clearTimeout(timeout$1);
  var delay = time - clockNow;
  if (delay > 24) {
    if (time < Infinity) timeout$1 = setTimeout(wake, time - clock.now() - clockSkew);
    if (interval) interval = clearInterval(interval);
  } else {
    if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
    frame = 1, setFrame(wake);
  }
}
function timeout(callback, delay, time) {
  var t = new Timer();
  delay = delay == null ? 0 : +delay;
  t.restart((elapsed) => {
    t.stop();
    callback(elapsed + delay);
  }, delay, time);
  return t;
}
var emptyOn = dispatch("start", "end", "cancel", "interrupt");
var emptyTween = [];
var CREATED = 0;
var SCHEDULED = 1;
var STARTING = 2;
var STARTED = 3;
var RUNNING = 4;
var ENDING = 5;
var ENDED = 6;
function schedule(node, name, id2, index, group, timing) {
  var schedules = node.__transition;
  if (!schedules) node.__transition = {};
  else if (id2 in schedules) return;
  create(node, id2, {
    name,
    index,
    // For context during callback.
    group,
    // For context during callback.
    on: emptyOn,
    tween: emptyTween,
    time: timing.time,
    delay: timing.delay,
    duration: timing.duration,
    ease: timing.ease,
    timer: null,
    state: CREATED
  });
}
function init(node, id2) {
  var schedule2 = get(node, id2);
  if (schedule2.state > CREATED) throw new Error("too late; already scheduled");
  return schedule2;
}
function set(node, id2) {
  var schedule2 = get(node, id2);
  if (schedule2.state > STARTED) throw new Error("too late; already running");
  return schedule2;
}
function get(node, id2) {
  var schedule2 = node.__transition;
  if (!schedule2 || !(schedule2 = schedule2[id2])) throw new Error("transition not found");
  return schedule2;
}
function create(node, id2, self) {
  var schedules = node.__transition, tween;
  schedules[id2] = self;
  self.timer = timer(schedule2, 0, self.time);
  function schedule2(elapsed) {
    self.state = SCHEDULED;
    self.timer.restart(start2, self.delay, self.time);
    if (self.delay <= elapsed) start2(elapsed - self.delay);
  }
  function start2(elapsed) {
    var i, j, n, o;
    if (self.state !== SCHEDULED) return stop();
    for (i in schedules) {
      o = schedules[i];
      if (o.name !== self.name) continue;
      if (o.state === STARTED) return timeout(start2);
      if (o.state === RUNNING) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("interrupt", node, node.__data__, o.index, o.group);
        delete schedules[i];
      } else if (+i < id2) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("cancel", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }
    }
    timeout(function() {
      if (self.state === STARTED) {
        self.state = RUNNING;
        self.timer.restart(tick, self.delay, self.time);
        tick(elapsed);
      }
    });
    self.state = STARTING;
    self.on.call("start", node, node.__data__, self.index, self.group);
    if (self.state !== STARTING) return;
    self.state = STARTED;
    tween = new Array(n = self.tween.length);
    for (i = 0, j = -1; i < n; ++i) {
      if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
        tween[++j] = o;
      }
    }
    tween.length = j + 1;
  }
  function tick(elapsed) {
    var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1), i = -1, n = tween.length;
    while (++i < n) {
      tween[i].call(node, t);
    }
    if (self.state === ENDING) {
      self.on.call("end", node, node.__data__, self.index, self.group);
      stop();
    }
  }
  function stop() {
    self.state = ENDED;
    self.timer.stop();
    delete schedules[id2];
    for (var i in schedules) return;
    delete node.__transition;
  }
}
function interrupt(node, name) {
  var schedules = node.__transition, schedule2, active, empty2 = true, i;
  if (!schedules) return;
  name = name == null ? null : name + "";
  for (i in schedules) {
    if ((schedule2 = schedules[i]).name !== name) {
      empty2 = false;
      continue;
    }
    active = schedule2.state > STARTING && schedule2.state < ENDING;
    schedule2.state = ENDED;
    schedule2.timer.stop();
    schedule2.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule2.index, schedule2.group);
    delete schedules[i];
  }
  if (empty2) delete node.__transition;
}
function selection_interrupt(name) {
  return this.each(function() {
    interrupt(this, name);
  });
}
function tweenRemove(id2, name) {
  var tween0, tween1;
  return function() {
    var schedule2 = set(this, id2), tween = schedule2.tween;
    if (tween !== tween0) {
      tween1 = tween0 = tween;
      for (var i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1 = tween1.slice();
          tween1.splice(i, 1);
          break;
        }
      }
    }
    schedule2.tween = tween1;
  };
}
function tweenFunction(id2, name, value) {
  var tween0, tween1;
  if (typeof value !== "function") throw new Error();
  return function() {
    var schedule2 = set(this, id2), tween = schedule2.tween;
    if (tween !== tween0) {
      tween1 = (tween0 = tween).slice();
      for (var t = { name, value }, i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1[i] = t;
          break;
        }
      }
      if (i === n) tween1.push(t);
    }
    schedule2.tween = tween1;
  };
}
function transition_tween(name, value) {
  var id2 = this._id;
  name += "";
  if (arguments.length < 2) {
    var tween = get(this.node(), id2).tween;
    for (var i = 0, n = tween.length, t; i < n; ++i) {
      if ((t = tween[i]).name === name) {
        return t.value;
      }
    }
    return null;
  }
  return this.each((value == null ? tweenRemove : tweenFunction)(id2, name, value));
}
function tweenValue(transition, name, value) {
  var id2 = transition._id;
  transition.each(function() {
    var schedule2 = set(this, id2);
    (schedule2.value || (schedule2.value = {}))[name] = value.apply(this, arguments);
  });
  return function(node) {
    return get(node, id2).value[name];
  };
}
function interpolate(a, b) {
  var c;
  return (typeof b === "number" ? interpolateNumber : b instanceof color ? interpolateRgb : (c = color(b)) ? (b = c, interpolateRgb) : interpolateString)(a, b);
}
function attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}
function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant(name, interpolate2, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = this.getAttribute(name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate2(string00 = string0, value1);
  };
}
function attrConstantNS(fullname, interpolate2, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = this.getAttributeNS(fullname.space, fullname.local);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate2(string00 = string0, value1);
  };
}
function attrFunction(name, interpolate2, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttribute(name);
    string0 = this.getAttribute(name);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate2(string00 = string0, value1));
  };
}
function attrFunctionNS(fullname, interpolate2, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
    string0 = this.getAttributeNS(fullname.space, fullname.local);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate2(string00 = string0, value1));
  };
}
function transition_attr(name, value) {
  var fullname = namespace(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate;
  return this.attrTween(name, typeof value === "function" ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, tweenValue(this, "attr." + name, value)) : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname) : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value));
}
function attrInterpolate(name, i) {
  return function(t) {
    this.setAttribute(name, i.call(this, t));
  };
}
function attrInterpolateNS(fullname, i) {
  return function(t) {
    this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
  };
}
function attrTweenNS(fullname, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);
    return t0;
  }
  tween._value = value;
  return tween;
}
function attrTween(name, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);
    return t0;
  }
  tween._value = value;
  return tween;
}
function transition_attrTween(name, value) {
  var key = "attr." + name;
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error();
  var fullname = namespace(name);
  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
}
function delayFunction(id2, value) {
  return function() {
    init(this, id2).delay = +value.apply(this, arguments);
  };
}
function delayConstant(id2, value) {
  return value = +value, function() {
    init(this, id2).delay = value;
  };
}
function transition_delay(value) {
  var id2 = this._id;
  return arguments.length ? this.each((typeof value === "function" ? delayFunction : delayConstant)(id2, value)) : get(this.node(), id2).delay;
}
function durationFunction(id2, value) {
  return function() {
    set(this, id2).duration = +value.apply(this, arguments);
  };
}
function durationConstant(id2, value) {
  return value = +value, function() {
    set(this, id2).duration = value;
  };
}
function transition_duration(value) {
  var id2 = this._id;
  return arguments.length ? this.each((typeof value === "function" ? durationFunction : durationConstant)(id2, value)) : get(this.node(), id2).duration;
}
function easeConstant(id2, value) {
  if (typeof value !== "function") throw new Error();
  return function() {
    set(this, id2).ease = value;
  };
}
function transition_ease(value) {
  var id2 = this._id;
  return arguments.length ? this.each(easeConstant(id2, value)) : get(this.node(), id2).ease;
}
function easeVarying(id2, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (typeof v !== "function") throw new Error();
    set(this, id2).ease = v;
  };
}
function transition_easeVarying(value) {
  if (typeof value !== "function") throw new Error();
  return this.each(easeVarying(this._id, value));
}
function transition_filter(match) {
  if (typeof match !== "function") match = matcher(match);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }
  return new Transition(subgroups, this._parents, this._name, this._id);
}
function transition_merge(transition) {
  if (transition._id !== this._id) throw new Error();
  for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }
  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }
  return new Transition(merges, this._parents, this._name, this._id);
}
function start(name) {
  return (name + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    if (i >= 0) t = t.slice(0, i);
    return !t || t === "start";
  });
}
function onFunction(id2, name, listener) {
  var on0, on1, sit = start(name) ? init : set;
  return function() {
    var schedule2 = sit(this, id2), on = schedule2.on;
    if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);
    schedule2.on = on1;
  };
}
function transition_on(name, listener) {
  var id2 = this._id;
  return arguments.length < 2 ? get(this.node(), id2).on.on(name) : this.each(onFunction(id2, name, listener));
}
function removeFunction(id2) {
  return function() {
    var parent = this.parentNode;
    for (var i in this.__transition) if (+i !== id2) return;
    if (parent) parent.removeChild(this);
  };
}
function transition_remove() {
  return this.on("end.remove", removeFunction(this._id));
}
function transition_select(select2) {
  var name = this._name, id2 = this._id;
  if (typeof select2 !== "function") select2 = selector(select2);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select2.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
        schedule(subgroup[i], name, id2, i, subgroup, get(node, id2));
      }
    }
  }
  return new Transition(subgroups, this._parents, name, id2);
}
function transition_selectAll(select2) {
  var name = this._name, id2 = this._id;
  if (typeof select2 !== "function") select2 = selectorAll(select2);
  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        for (var children2 = select2.call(node, node.__data__, i, group), child, inherit2 = get(node, id2), k = 0, l = children2.length; k < l; ++k) {
          if (child = children2[k]) {
            schedule(child, name, id2, k, children2, inherit2);
          }
        }
        subgroups.push(children2);
        parents.push(node);
      }
    }
  }
  return new Transition(subgroups, parents, name, id2);
}
var Selection = selection.prototype.constructor;
function transition_selection() {
  return new Selection(this._groups, this._parents);
}
function styleNull(name, interpolate2) {
  var string00, string10, interpolate0;
  return function() {
    var string0 = styleValue(this, name), string1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : interpolate0 = interpolate2(string00 = string0, string10 = string1);
  };
}
function styleRemove(name) {
  return function() {
    this.style.removeProperty(name);
  };
}
function styleConstant(name, interpolate2, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = styleValue(this, name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate2(string00 = string0, value1);
  };
}
function styleFunction(name, interpolate2, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0 = styleValue(this, name), value1 = value(this), string1 = value1 + "";
    if (value1 == null) string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate2(string00 = string0, value1));
  };
}
function styleMaybeRemove(id2, name) {
  var on0, on1, listener0, key = "style." + name, event = "end." + key, remove2;
  return function() {
    var schedule2 = set(this, id2), on = schedule2.on, listener = schedule2.value[key] == null ? remove2 || (remove2 = styleRemove(name)) : void 0;
    if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);
    schedule2.on = on1;
  };
}
function transition_style(name, value, priority) {
  var i = (name += "") === "transform" ? interpolateTransformCss : interpolate;
  return value == null ? this.styleTween(name, styleNull(name, i)).on("end.style." + name, styleRemove(name)) : typeof value === "function" ? this.styleTween(name, styleFunction(name, i, tweenValue(this, "style." + name, value))).each(styleMaybeRemove(this._id, name)) : this.styleTween(name, styleConstant(name, i, value), priority).on("end.style." + name, null);
}
function styleInterpolate(name, i, priority) {
  return function(t) {
    this.style.setProperty(name, i.call(this, t), priority);
  };
}
function styleTween(name, value, priority) {
  var t, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);
    return t;
  }
  tween._value = value;
  return tween;
}
function transition_styleTween(name, value, priority) {
  var key = "style." + (name += "");
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error();
  return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
}
function textConstant(value) {
  return function() {
    this.textContent = value;
  };
}
function textFunction(value) {
  return function() {
    var value1 = value(this);
    this.textContent = value1 == null ? "" : value1;
  };
}
function transition_text(value) {
  return this.tween("text", typeof value === "function" ? textFunction(tweenValue(this, "text", value)) : textConstant(value == null ? "" : value + ""));
}
function textInterpolate(i) {
  return function(t) {
    this.textContent = i.call(this, t);
  };
}
function textTween(value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && textInterpolate(i);
    return t0;
  }
  tween._value = value;
  return tween;
}
function transition_textTween(value) {
  var key = "text";
  if (arguments.length < 1) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error();
  return this.tween(key, textTween(value));
}
function transition_transition() {
  var name = this._name, id0 = this._id, id1 = newId();
  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        var inherit2 = get(node, id0);
        schedule(node, name, id1, i, group, {
          time: inherit2.time + inherit2.delay + inherit2.duration,
          delay: 0,
          duration: inherit2.duration,
          ease: inherit2.ease
        });
      }
    }
  }
  return new Transition(groups, this._parents, name, id1);
}
function transition_end() {
  var on0, on1, that = this, id2 = that._id, size = that.size();
  return new Promise(function(resolve, reject) {
    var cancel = { value: reject }, end = { value: function() {
      if (--size === 0) resolve();
    } };
    that.each(function() {
      var schedule2 = set(this, id2), on = schedule2.on;
      if (on !== on0) {
        on1 = (on0 = on).copy();
        on1._.cancel.push(cancel);
        on1._.interrupt.push(cancel);
        on1._.end.push(end);
      }
      schedule2.on = on1;
    });
    if (size === 0) resolve();
  });
}
var id = 0;
function Transition(groups, parents, name, id2) {
  this._groups = groups;
  this._parents = parents;
  this._name = name;
  this._id = id2;
}
function newId() {
  return ++id;
}
var selection_prototype = selection.prototype;
Transition.prototype = {
  constructor: Transition,
  select: transition_select,
  selectAll: transition_selectAll,
  selectChild: selection_prototype.selectChild,
  selectChildren: selection_prototype.selectChildren,
  filter: transition_filter,
  merge: transition_merge,
  selection: transition_selection,
  transition: transition_transition,
  call: selection_prototype.call,
  nodes: selection_prototype.nodes,
  node: selection_prototype.node,
  size: selection_prototype.size,
  empty: selection_prototype.empty,
  each: selection_prototype.each,
  on: transition_on,
  attr: transition_attr,
  attrTween: transition_attrTween,
  style: transition_style,
  styleTween: transition_styleTween,
  text: transition_text,
  textTween: transition_textTween,
  remove: transition_remove,
  tween: transition_tween,
  delay: transition_delay,
  duration: transition_duration,
  ease: transition_ease,
  easeVarying: transition_easeVarying,
  end: transition_end,
  [Symbol.iterator]: selection_prototype[Symbol.iterator]
};
function cubicInOut(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var defaultTiming = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: cubicInOut
};
function inherit(node, id2) {
  var timing;
  while (!(timing = node.__transition) || !(timing = timing[id2])) {
    if (!(node = node.parentNode)) {
      throw new Error(`transition ${id2} not found`);
    }
  }
  return timing;
}
function selection_transition(name) {
  var id2, timing;
  if (name instanceof Transition) {
    id2 = name._id, name = name._name;
  } else {
    id2 = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
  }
  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        schedule(node, name, id2, i, group, timing || inherit(node, id2));
      }
    }
  }
  return new Transition(groups, this._parents, name, id2);
}
selection.prototype.interrupt = selection_interrupt;
selection.prototype.transition = selection_transition;
function formatDecimal(x) {
  return Math.abs(x = Math.round(x)) >= 1e21 ? x.toLocaleString("en").replace(/,/g, "") : x.toString(10);
}
function formatDecimalParts(x, p) {
  if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null;
  var i, coefficient = x.slice(0, i);
  return [
    coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
    +x.slice(i + 1)
  ];
}
function exponent(x) {
  return x = formatDecimalParts(Math.abs(x)), x ? x[1] : NaN;
}
function formatGroup(grouping, thousands) {
  return function(value, width) {
    var i = value.length, t = [], j = 0, g = grouping[0], length = 0;
    while (i > 0 && g > 0) {
      if (length + g + 1 > width) g = Math.max(1, width - length);
      t.push(value.substring(i -= g, i + g));
      if ((length += g + 1) > width) break;
      g = grouping[j = (j + 1) % grouping.length];
    }
    return t.reverse().join(thousands);
  };
}
function formatNumerals(numerals) {
  return function(value) {
    return value.replace(/[0-9]/g, function(i) {
      return numerals[+i];
    });
  };
}
var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function formatSpecifier(specifier) {
  if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
  var match;
  return new FormatSpecifier({
    fill: match[1],
    align: match[2],
    sign: match[3],
    symbol: match[4],
    zero: match[5],
    width: match[6],
    comma: match[7],
    precision: match[8] && match[8].slice(1),
    trim: match[9],
    type: match[10]
  });
}
formatSpecifier.prototype = FormatSpecifier.prototype;
function FormatSpecifier(specifier) {
  this.fill = specifier.fill === void 0 ? " " : specifier.fill + "";
  this.align = specifier.align === void 0 ? ">" : specifier.align + "";
  this.sign = specifier.sign === void 0 ? "-" : specifier.sign + "";
  this.symbol = specifier.symbol === void 0 ? "" : specifier.symbol + "";
  this.zero = !!specifier.zero;
  this.width = specifier.width === void 0 ? void 0 : +specifier.width;
  this.comma = !!specifier.comma;
  this.precision = specifier.precision === void 0 ? void 0 : +specifier.precision;
  this.trim = !!specifier.trim;
  this.type = specifier.type === void 0 ? "" : specifier.type + "";
}
FormatSpecifier.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function formatTrim(s) {
  out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
    switch (s[i]) {
      case ".":
        i0 = i1 = i;
        break;
      case "0":
        if (i0 === 0) i0 = i;
        i1 = i;
        break;
      default:
        if (!+s[i]) break out;
        if (i0 > 0) i0 = 0;
        break;
    }
  }
  return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
}
var prefixExponent;
function formatPrefixAuto(x, p) {
  var d = formatDecimalParts(x, p);
  if (!d) return x + "";
  var coefficient = d[0], exponent2 = d[1], i = exponent2 - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent2 / 3))) * 3) + 1, n = coefficient.length;
  return i === n ? coefficient : i > n ? coefficient + new Array(i - n + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + formatDecimalParts(x, Math.max(0, p + i - 1))[0];
}
function formatRounded(x, p) {
  var d = formatDecimalParts(x, p);
  if (!d) return x + "";
  var coefficient = d[0], exponent2 = d[1];
  return exponent2 < 0 ? "0." + new Array(-exponent2).join("0") + coefficient : coefficient.length > exponent2 + 1 ? coefficient.slice(0, exponent2 + 1) + "." + coefficient.slice(exponent2 + 1) : coefficient + new Array(exponent2 - coefficient.length + 2).join("0");
}
const formatTypes = {
  "%": (x, p) => (x * 100).toFixed(p),
  "b": (x) => Math.round(x).toString(2),
  "c": (x) => x + "",
  "d": formatDecimal,
  "e": (x, p) => x.toExponential(p),
  "f": (x, p) => x.toFixed(p),
  "g": (x, p) => x.toPrecision(p),
  "o": (x) => Math.round(x).toString(8),
  "p": (x, p) => formatRounded(x * 100, p),
  "r": formatRounded,
  "s": formatPrefixAuto,
  "X": (x) => Math.round(x).toString(16).toUpperCase(),
  "x": (x) => Math.round(x).toString(16)
};
function identity$2(x) {
  return x;
}
var map = Array.prototype.map, prefixes = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function formatLocale(locale2) {
  var group = locale2.grouping === void 0 || locale2.thousands === void 0 ? identity$2 : formatGroup(map.call(locale2.grouping, Number), locale2.thousands + ""), currencyPrefix = locale2.currency === void 0 ? "" : locale2.currency[0] + "", currencySuffix = locale2.currency === void 0 ? "" : locale2.currency[1] + "", decimal = locale2.decimal === void 0 ? "." : locale2.decimal + "", numerals = locale2.numerals === void 0 ? identity$2 : formatNumerals(map.call(locale2.numerals, String)), percent = locale2.percent === void 0 ? "%" : locale2.percent + "", minus = locale2.minus === void 0 ? "−" : locale2.minus + "", nan = locale2.nan === void 0 ? "NaN" : locale2.nan + "";
  function newFormat(specifier) {
    specifier = formatSpecifier(specifier);
    var fill = specifier.fill, align = specifier.align, sign = specifier.sign, symbol = specifier.symbol, zero2 = specifier.zero, width = specifier.width, comma = specifier.comma, precision = specifier.precision, trim = specifier.trim, type = specifier.type;
    if (type === "n") comma = true, type = "g";
    else if (!formatTypes[type]) precision === void 0 && (precision = 12), trim = true, type = "g";
    if (zero2 || fill === "0" && align === "=") zero2 = true, fill = "0", align = "=";
    var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "", suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";
    var formatType = formatTypes[type], maybeSuffix = /[defgprs%]/.test(type);
    precision = precision === void 0 ? 6 : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));
    function format2(value) {
      var valuePrefix = prefix, valueSuffix = suffix, i, n, c;
      if (type === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value;
        var valueNegative = value < 0 || 1 / value < 0;
        value = isNaN(value) ? nan : formatType(Math.abs(value), precision);
        if (trim) value = formatTrim(value);
        if (valueNegative && +value === 0 && sign !== "+") valueNegative = false;
        valuePrefix = (valueNegative ? sign === "(" ? sign : minus : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
        valueSuffix = (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");
        if (maybeSuffix) {
          i = -1, n = value.length;
          while (++i < n) {
            if (c = value.charCodeAt(i), 48 > c || c > 57) {
              valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
              value = value.slice(0, i);
              break;
            }
          }
        }
      }
      if (comma && !zero2) value = group(value, Infinity);
      var length = valuePrefix.length + value.length + valueSuffix.length, padding = length < width ? new Array(width - length + 1).join(fill) : "";
      if (comma && zero2) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";
      switch (align) {
        case "<":
          value = valuePrefix + value + valueSuffix + padding;
          break;
        case "=":
          value = valuePrefix + padding + value + valueSuffix;
          break;
        case "^":
          value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);
          break;
        default:
          value = padding + valuePrefix + value + valueSuffix;
          break;
      }
      return numerals(value);
    }
    format2.toString = function() {
      return specifier + "";
    };
    return format2;
  }
  function formatPrefix2(specifier, value) {
    var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)), e = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3, k = Math.pow(10, -e), prefix = prefixes[8 + e / 3];
    return function(value2) {
      return f(k * value2) + prefix;
    };
  }
  return {
    format: newFormat,
    formatPrefix: formatPrefix2
  };
}
var locale;
var format;
var formatPrefix;
defaultLocale({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function defaultLocale(definition) {
  locale = formatLocale(definition);
  format = locale.format;
  formatPrefix = locale.formatPrefix;
  return locale;
}
function precisionFixed(step) {
  return Math.max(0, -exponent(Math.abs(step)));
}
function precisionPrefix(step, value) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step)));
}
function precisionRound(step, max) {
  step = Math.abs(step), max = Math.abs(max) - step;
  return Math.max(0, exponent(max) - exponent(step)) + 1;
}
function initRange(domain, range) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(domain);
      break;
    default:
      this.range(range).domain(domain);
      break;
  }
  return this;
}
function constants(x) {
  return function() {
    return x;
  };
}
function number(x) {
  return +x;
}
var unit = [0, 1];
function identity$1(x) {
  return x;
}
function normalize(a, b) {
  return (b -= a = +a) ? function(x) {
    return (x - a) / b;
  } : constants(isNaN(b) ? NaN : 0.5);
}
function clamper(a, b) {
  var t;
  if (a > b) t = a, a = b, b = t;
  return function(x) {
    return Math.max(a, Math.min(b, x));
  };
}
function bimap(domain, range, interpolate2) {
  var d0 = domain[0], d1 = domain[1], r0 = range[0], r1 = range[1];
  if (d1 < d0) d0 = normalize(d1, d0), r0 = interpolate2(r1, r0);
  else d0 = normalize(d0, d1), r0 = interpolate2(r0, r1);
  return function(x) {
    return r0(d0(x));
  };
}
function polymap(domain, range, interpolate2) {
  var j = Math.min(domain.length, range.length) - 1, d = new Array(j), r = new Array(j), i = -1;
  if (domain[j] < domain[0]) {
    domain = domain.slice().reverse();
    range = range.slice().reverse();
  }
  while (++i < j) {
    d[i] = normalize(domain[i], domain[i + 1]);
    r[i] = interpolate2(range[i], range[i + 1]);
  }
  return function(x) {
    var i2 = bisectRight(domain, x, 1, j) - 1;
    return r[i2](d[i2](x));
  };
}
function copy(source, target) {
  return target.domain(source.domain()).range(source.range()).interpolate(source.interpolate()).clamp(source.clamp()).unknown(source.unknown());
}
function transformer() {
  var domain = unit, range = unit, interpolate2 = interpolate$1, transform2, untransform, unknown, clamp = identity$1, piecewise, output, input;
  function rescale() {
    var n = Math.min(domain.length, range.length);
    if (clamp !== identity$1) clamp = clamper(domain[0], domain[n - 1]);
    piecewise = n > 2 ? polymap : bimap;
    output = input = null;
    return scale;
  }
  function scale(x) {
    return x == null || isNaN(x = +x) ? unknown : (output || (output = piecewise(domain.map(transform2), range, interpolate2)))(transform2(clamp(x)));
  }
  scale.invert = function(y) {
    return clamp(untransform((input || (input = piecewise(range, domain.map(transform2), interpolateNumber)))(y)));
  };
  scale.domain = function(_) {
    return arguments.length ? (domain = Array.from(_, number), rescale()) : domain.slice();
  };
  scale.range = function(_) {
    return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
  };
  scale.rangeRound = function(_) {
    return range = Array.from(_), interpolate2 = interpolateRound, rescale();
  };
  scale.clamp = function(_) {
    return arguments.length ? (clamp = _ ? true : identity$1, rescale()) : clamp !== identity$1;
  };
  scale.interpolate = function(_) {
    return arguments.length ? (interpolate2 = _, rescale()) : interpolate2;
  };
  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };
  return function(t, u) {
    transform2 = t, untransform = u;
    return rescale();
  };
}
function continuous() {
  return transformer()(identity$1, identity$1);
}
function tickFormat(start2, stop, count, specifier) {
  var step = tickStep(start2, stop, count), precision;
  specifier = formatSpecifier(specifier == null ? ",f" : specifier);
  switch (specifier.type) {
    case "s": {
      var value = Math.max(Math.abs(start2), Math.abs(stop));
      if (specifier.precision == null && !isNaN(precision = precisionPrefix(step, value))) specifier.precision = precision;
      return formatPrefix(specifier, value);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      if (specifier.precision == null && !isNaN(precision = precisionRound(step, Math.max(Math.abs(start2), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
      break;
    }
    case "f":
    case "%": {
      if (specifier.precision == null && !isNaN(precision = precisionFixed(step))) specifier.precision = precision - (specifier.type === "%") * 2;
      break;
    }
  }
  return format(specifier);
}
function linearish(scale) {
  var domain = scale.domain;
  scale.ticks = function(count) {
    var d = domain();
    return ticks(d[0], d[d.length - 1], count == null ? 10 : count);
  };
  scale.tickFormat = function(count, specifier) {
    var d = domain();
    return tickFormat(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
  };
  scale.nice = function(count) {
    if (count == null) count = 10;
    var d = domain();
    var i0 = 0;
    var i1 = d.length - 1;
    var start2 = d[i0];
    var stop = d[i1];
    var prestep;
    var step;
    var maxIter = 10;
    if (stop < start2) {
      step = start2, start2 = stop, stop = step;
      step = i0, i0 = i1, i1 = step;
    }
    while (maxIter-- > 0) {
      step = tickIncrement(start2, stop, count);
      if (step === prestep) {
        d[i0] = start2;
        d[i1] = stop;
        return domain(d);
      } else if (step > 0) {
        start2 = Math.floor(start2 / step) * step;
        stop = Math.ceil(stop / step) * step;
      } else if (step < 0) {
        start2 = Math.ceil(start2 * step) / step;
        stop = Math.floor(stop * step) / step;
      } else {
        break;
      }
      prestep = step;
    }
    return scale;
  };
  return scale;
}
function linear() {
  var scale = continuous();
  scale.copy = function() {
    return copy(scale, linear());
  };
  initRange.apply(scale, arguments);
  return linearish(scale);
}
const constant = (x) => () => x;
function ZoomEvent(type, {
  sourceEvent: sourceEvent2,
  target,
  transform: transform2,
  dispatch: dispatch2
}) {
  Object.defineProperties(this, {
    type: { value: type, enumerable: true, configurable: true },
    sourceEvent: { value: sourceEvent2, enumerable: true, configurable: true },
    target: { value: target, enumerable: true, configurable: true },
    transform: { value: transform2, enumerable: true, configurable: true },
    _: { value: dispatch2 }
  });
}
function Transform(k, x, y) {
  this.k = k;
  this.x = x;
  this.y = y;
}
Transform.prototype = {
  constructor: Transform,
  scale: function(k) {
    return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
  },
  translate: function(x, y) {
    return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);
  },
  apply: function(point) {
    return [point[0] * this.k + this.x, point[1] * this.k + this.y];
  },
  applyX: function(x) {
    return x * this.k + this.x;
  },
  applyY: function(y) {
    return y * this.k + this.y;
  },
  invert: function(location) {
    return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
  },
  invertX: function(x) {
    return (x - this.x) / this.k;
  },
  invertY: function(y) {
    return (y - this.y) / this.k;
  },
  rescaleX: function(x) {
    return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));
  },
  rescaleY: function(y) {
    return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var identity = new Transform(1, 0, 0);
transform.prototype = Transform.prototype;
function transform(node) {
  while (!node.__zoom) if (!(node = node.parentNode)) return identity;
  return node.__zoom;
}
function nopropagation(event) {
  event.stopImmediatePropagation();
}
function noevent(event) {
  event.preventDefault();
  event.stopImmediatePropagation();
}
function defaultFilter(event) {
  return (!event.ctrlKey || event.type === "wheel") && !event.button;
}
function defaultExtent() {
  var e = this;
  if (e instanceof SVGElement) {
    e = e.ownerSVGElement || e;
    if (e.hasAttribute("viewBox")) {
      e = e.viewBox.baseVal;
      return [[e.x, e.y], [e.x + e.width, e.y + e.height]];
    }
    return [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]];
  }
  return [[0, 0], [e.clientWidth, e.clientHeight]];
}
function defaultTransform() {
  return this.__zoom || identity;
}
function defaultWheelDelta(event) {
  return -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 2e-3) * (event.ctrlKey ? 10 : 1);
}
function defaultTouchable() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function defaultConstrain(transform2, extent, translateExtent) {
  var dx0 = transform2.invertX(extent[0][0]) - translateExtent[0][0], dx1 = transform2.invertX(extent[1][0]) - translateExtent[1][0], dy0 = transform2.invertY(extent[0][1]) - translateExtent[0][1], dy1 = transform2.invertY(extent[1][1]) - translateExtent[1][1];
  return transform2.translate(
    dx1 > dx0 ? (dx0 + dx1) / 2 : Math.min(0, dx0) || Math.max(0, dx1),
    dy1 > dy0 ? (dy0 + dy1) / 2 : Math.min(0, dy0) || Math.max(0, dy1)
  );
}
function zoom() {
  var filter2 = defaultFilter, extent = defaultExtent, constrain = defaultConstrain, wheelDelta = defaultWheelDelta, touchable = defaultTouchable, scaleExtent = [0, Infinity], translateExtent = [[-Infinity, -Infinity], [Infinity, Infinity]], duration = 250, interpolate2 = interpolateZoom, listeners = dispatch("start", "zoom", "end"), touchstarting, touchfirst, touchending, touchDelay = 500, wheelDelay = 150, clickDistance2 = 0, tapDistance = 10;
  function zoom2(selection2) {
    selection2.property("__zoom", defaultTransform).on("wheel.zoom", wheeled, { passive: false }).on("mousedown.zoom", mousedowned).on("dblclick.zoom", dblclicked).filter(touchable).on("touchstart.zoom", touchstarted).on("touchmove.zoom", touchmoved).on("touchend.zoom touchcancel.zoom", touchended).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  zoom2.transform = function(collection, transform2, point, event) {
    var selection2 = collection.selection ? collection.selection() : collection;
    selection2.property("__zoom", defaultTransform);
    if (collection !== selection2) {
      schedule2(collection, transform2, point, event);
    } else {
      selection2.interrupt().each(function() {
        gesture(this, arguments).event(event).start().zoom(null, typeof transform2 === "function" ? transform2.apply(this, arguments) : transform2).end();
      });
    }
  };
  zoom2.scaleBy = function(selection2, k, p, event) {
    zoom2.scaleTo(selection2, function() {
      var k0 = this.__zoom.k, k1 = typeof k === "function" ? k.apply(this, arguments) : k;
      return k0 * k1;
    }, p, event);
  };
  zoom2.scaleTo = function(selection2, k, p, event) {
    zoom2.transform(selection2, function() {
      var e = extent.apply(this, arguments), t0 = this.__zoom, p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p, p1 = t0.invert(p0), k1 = typeof k === "function" ? k.apply(this, arguments) : k;
      return constrain(translate(scale(t0, k1), p0, p1), e, translateExtent);
    }, p, event);
  };
  zoom2.translateBy = function(selection2, x, y, event) {
    zoom2.transform(selection2, function() {
      return constrain(this.__zoom.translate(
        typeof x === "function" ? x.apply(this, arguments) : x,
        typeof y === "function" ? y.apply(this, arguments) : y
      ), extent.apply(this, arguments), translateExtent);
    }, null, event);
  };
  zoom2.translateTo = function(selection2, x, y, p, event) {
    zoom2.transform(selection2, function() {
      var e = extent.apply(this, arguments), t = this.__zoom, p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p;
      return constrain(identity.translate(p0[0], p0[1]).scale(t.k).translate(
        typeof x === "function" ? -x.apply(this, arguments) : -x,
        typeof y === "function" ? -y.apply(this, arguments) : -y
      ), e, translateExtent);
    }, p, event);
  };
  function scale(transform2, k) {
    k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], k));
    return k === transform2.k ? transform2 : new Transform(k, transform2.x, transform2.y);
  }
  function translate(transform2, p0, p1) {
    var x = p0[0] - p1[0] * transform2.k, y = p0[1] - p1[1] * transform2.k;
    return x === transform2.x && y === transform2.y ? transform2 : new Transform(transform2.k, x, y);
  }
  function centroid(extent2) {
    return [(+extent2[0][0] + +extent2[1][0]) / 2, (+extent2[0][1] + +extent2[1][1]) / 2];
  }
  function schedule2(transition, transform2, point, event) {
    transition.on("start.zoom", function() {
      gesture(this, arguments).event(event).start();
    }).on("interrupt.zoom end.zoom", function() {
      gesture(this, arguments).event(event).end();
    }).tween("zoom", function() {
      var that = this, args = arguments, g = gesture(that, args).event(event), e = extent.apply(that, args), p = point == null ? centroid(e) : typeof point === "function" ? point.apply(that, args) : point, w = Math.max(e[1][0] - e[0][0], e[1][1] - e[0][1]), a = that.__zoom, b = typeof transform2 === "function" ? transform2.apply(that, args) : transform2, i = interpolate2(a.invert(p).concat(w / a.k), b.invert(p).concat(w / b.k));
      return function(t) {
        if (t === 1) t = b;
        else {
          var l = i(t), k = w / l[2];
          t = new Transform(k, p[0] - l[0] * k, p[1] - l[1] * k);
        }
        g.zoom(null, t);
      };
    });
  }
  function gesture(that, args, clean) {
    return !clean && that.__zooming || new Gesture(that, args);
  }
  function Gesture(that, args) {
    this.that = that;
    this.args = args;
    this.active = 0;
    this.sourceEvent = null;
    this.extent = extent.apply(that, args);
    this.taps = 0;
  }
  Gesture.prototype = {
    event: function(event) {
      if (event) this.sourceEvent = event;
      return this;
    },
    start: function() {
      if (++this.active === 1) {
        this.that.__zooming = this;
        this.emit("start");
      }
      return this;
    },
    zoom: function(key, transform2) {
      if (this.mouse && key !== "mouse") this.mouse[1] = transform2.invert(this.mouse[0]);
      if (this.touch0 && key !== "touch") this.touch0[1] = transform2.invert(this.touch0[0]);
      if (this.touch1 && key !== "touch") this.touch1[1] = transform2.invert(this.touch1[0]);
      this.that.__zoom = transform2;
      this.emit("zoom");
      return this;
    },
    end: function() {
      if (--this.active === 0) {
        delete this.that.__zooming;
        this.emit("end");
      }
      return this;
    },
    emit: function(type) {
      var d = select(this.that).datum();
      listeners.call(
        type,
        this.that,
        new ZoomEvent(type, {
          sourceEvent: this.sourceEvent,
          target: zoom2,
          transform: this.that.__zoom,
          dispatch: listeners
        }),
        d
      );
    }
  };
  function wheeled(event, ...args) {
    if (!filter2.apply(this, arguments)) return;
    var g = gesture(this, args).event(event), t = this.__zoom, k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], t.k * Math.pow(2, wheelDelta.apply(this, arguments)))), p = pointer(event);
    if (g.wheel) {
      if (g.mouse[0][0] !== p[0] || g.mouse[0][1] !== p[1]) {
        g.mouse[1] = t.invert(g.mouse[0] = p);
      }
      clearTimeout(g.wheel);
    } else if (t.k === k) return;
    else {
      g.mouse = [p, t.invert(p)];
      interrupt(this);
      g.start();
    }
    noevent(event);
    g.wheel = setTimeout(wheelidled, wheelDelay);
    g.zoom("mouse", constrain(translate(scale(t, k), g.mouse[0], g.mouse[1]), g.extent, translateExtent));
    function wheelidled() {
      g.wheel = null;
      g.end();
    }
  }
  function mousedowned(event, ...args) {
    if (touchending || !filter2.apply(this, arguments)) return;
    var currentTarget = event.currentTarget, g = gesture(this, args, true).event(event), v = select(event.view).on("mousemove.zoom", mousemoved, true).on("mouseup.zoom", mouseupped, true), p = pointer(event, currentTarget), x0 = event.clientX, y0 = event.clientY;
    dragDisable(event.view);
    nopropagation(event);
    g.mouse = [p, this.__zoom.invert(p)];
    interrupt(this);
    g.start();
    function mousemoved(event2) {
      noevent(event2);
      if (!g.moved) {
        var dx = event2.clientX - x0, dy = event2.clientY - y0;
        g.moved = dx * dx + dy * dy > clickDistance2;
      }
      g.event(event2).zoom("mouse", constrain(translate(g.that.__zoom, g.mouse[0] = pointer(event2, currentTarget), g.mouse[1]), g.extent, translateExtent));
    }
    function mouseupped(event2) {
      v.on("mousemove.zoom mouseup.zoom", null);
      yesdrag(event2.view, g.moved);
      noevent(event2);
      g.event(event2).end();
    }
  }
  function dblclicked(event, ...args) {
    if (!filter2.apply(this, arguments)) return;
    var t0 = this.__zoom, p0 = pointer(event.changedTouches ? event.changedTouches[0] : event, this), p1 = t0.invert(p0), k1 = t0.k * (event.shiftKey ? 0.5 : 2), t1 = constrain(translate(scale(t0, k1), p0, p1), extent.apply(this, args), translateExtent);
    noevent(event);
    if (duration > 0) select(this).transition().duration(duration).call(schedule2, t1, p0, event);
    else select(this).call(zoom2.transform, t1, p0, event);
  }
  function touchstarted(event, ...args) {
    if (!filter2.apply(this, arguments)) return;
    var touches = event.touches, n = touches.length, g = gesture(this, args, event.changedTouches.length === n).event(event), started, i, t, p;
    nopropagation(event);
    for (i = 0; i < n; ++i) {
      t = touches[i], p = pointer(t, this);
      p = [p, this.__zoom.invert(p), t.identifier];
      if (!g.touch0) g.touch0 = p, started = true, g.taps = 1 + !!touchstarting;
      else if (!g.touch1 && g.touch0[2] !== p[2]) g.touch1 = p, g.taps = 0;
    }
    if (touchstarting) touchstarting = clearTimeout(touchstarting);
    if (started) {
      if (g.taps < 2) touchfirst = p[0], touchstarting = setTimeout(function() {
        touchstarting = null;
      }, touchDelay);
      interrupt(this);
      g.start();
    }
  }
  function touchmoved(event, ...args) {
    if (!this.__zooming) return;
    var g = gesture(this, args).event(event), touches = event.changedTouches, n = touches.length, i, t, p, l;
    noevent(event);
    for (i = 0; i < n; ++i) {
      t = touches[i], p = pointer(t, this);
      if (g.touch0 && g.touch0[2] === t.identifier) g.touch0[0] = p;
      else if (g.touch1 && g.touch1[2] === t.identifier) g.touch1[0] = p;
    }
    t = g.that.__zoom;
    if (g.touch1) {
      var p0 = g.touch0[0], l0 = g.touch0[1], p1 = g.touch1[0], l1 = g.touch1[1], dp = (dp = p1[0] - p0[0]) * dp + (dp = p1[1] - p0[1]) * dp, dl = (dl = l1[0] - l0[0]) * dl + (dl = l1[1] - l0[1]) * dl;
      t = scale(t, Math.sqrt(dp / dl));
      p = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
      l = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
    } else if (g.touch0) p = g.touch0[0], l = g.touch0[1];
    else return;
    g.zoom("touch", constrain(translate(t, p, l), g.extent, translateExtent));
  }
  function touchended(event, ...args) {
    if (!this.__zooming) return;
    var g = gesture(this, args).event(event), touches = event.changedTouches, n = touches.length, i, t;
    nopropagation(event);
    if (touchending) clearTimeout(touchending);
    touchending = setTimeout(function() {
      touchending = null;
    }, touchDelay);
    for (i = 0; i < n; ++i) {
      t = touches[i];
      if (g.touch0 && g.touch0[2] === t.identifier) delete g.touch0;
      else if (g.touch1 && g.touch1[2] === t.identifier) delete g.touch1;
    }
    if (g.touch1 && !g.touch0) g.touch0 = g.touch1, delete g.touch1;
    if (g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);
    else {
      g.end();
      if (g.taps === 2) {
        t = pointer(t, this);
        if (Math.hypot(touchfirst[0] - t[0], touchfirst[1] - t[1]) < tapDistance) {
          var p = select(this).on("dblclick.zoom");
          if (p) p.apply(this, arguments);
        }
      }
    }
  }
  zoom2.wheelDelta = function(_) {
    return arguments.length ? (wheelDelta = typeof _ === "function" ? _ : constant(+_), zoom2) : wheelDelta;
  };
  zoom2.filter = function(_) {
    return arguments.length ? (filter2 = typeof _ === "function" ? _ : constant(!!_), zoom2) : filter2;
  };
  zoom2.touchable = function(_) {
    return arguments.length ? (touchable = typeof _ === "function" ? _ : constant(!!_), zoom2) : touchable;
  };
  zoom2.extent = function(_) {
    return arguments.length ? (extent = typeof _ === "function" ? _ : constant([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), zoom2) : extent;
  };
  zoom2.scaleExtent = function(_) {
    return arguments.length ? (scaleExtent[0] = +_[0], scaleExtent[1] = +_[1], zoom2) : [scaleExtent[0], scaleExtent[1]];
  };
  zoom2.translateExtent = function(_) {
    return arguments.length ? (translateExtent[0][0] = +_[0][0], translateExtent[1][0] = +_[1][0], translateExtent[0][1] = +_[0][1], translateExtent[1][1] = +_[1][1], zoom2) : [[translateExtent[0][0], translateExtent[0][1]], [translateExtent[1][0], translateExtent[1][1]]];
  };
  zoom2.constrain = function(_) {
    return arguments.length ? (constrain = _, zoom2) : constrain;
  };
  zoom2.duration = function(_) {
    return arguments.length ? (duration = +_, zoom2) : duration;
  };
  zoom2.interpolate = function(_) {
    return arguments.length ? (interpolate2 = _, zoom2) : interpolate2;
  };
  zoom2.on = function() {
    var value = listeners.on.apply(listeners, arguments);
    return value === listeners ? zoom2 : value;
  };
  zoom2.clickDistance = function(_) {
    return arguments.length ? (clickDistance2 = (_ = +_) * _, zoom2) : Math.sqrt(clickDistance2);
  };
  zoom2.tapDistance = function(_) {
    return arguments.length ? (tapDistance = +_, zoom2) : tapDistance;
  };
  return zoom2;
}
class FlipperPlotter {
  get slicerOptions() {
    return slicerOptions;
  }
  constructor(options = {}) {
    if (!options.data) {
      console.error(new Error("Required data missing for flipperPlotter"));
      return;
    } else {
      this.data = options.data;
    }
    if (options.parent) {
      this.parent = selector$1(options.parent);
    } else {
      this.parent = selector$1(defaults.selector);
    }
    if (options.timings) {
      this.timings = selector$1(options.timings);
    }
    if (options.messages) {
      this.messages = selector$1(options.messages);
    }
    if (!this.parent) {
      console.error(new Error("Missing mount element for flipperPlotter"));
      return;
    }
    this.setTheme(options.theme);
    this.processData(this.data);
    this.initialPlotter(options);
    window.onresize = () => {
      this.destroy();
      this.initialPlotter();
    };
  }
  initialPlotter() {
    this.createNode();
    this.initialCanvas();
    this.drawCanvas();
  }
  setTheme(options) {
    this.theme = { ...defaults.theme, ...options };
  }
  setSlicer(params) {
    if (params && params.modulation) {
      this.slicer = params;
    } else if (this.data && this.data.modulation) {
      this.slicer = this.data;
    } else {
      this.slicer = this.guess;
    }
    if (!this.data.pulses || !this.data.pulses.length) return;
    this.setSlicerData(this.data.pulses, this.slicer);
    this.redrawHintsCanvas(transform(this.labelCanvasNode));
  }
  setSlicerData(pulses, slicer) {
    const slice = sliceGuess(pulses, slicer);
    const timings = this.timingsNode;
    const messages = this.messagesNode;
    this.analyzer.print(timings, messages);
    if (slice.hints) {
      this.data.hints = slice.hints;
      this.altHints = this.getAltHints(slice.hints);
    }
    if (slice.bits) {
      this.data.bits = slice.bits;
      if (messages) {
        messages.innerHTML += `<div>Bits: <strong>${slice.bits.toHexString()}</strong></div>`;
      }
    }
  }
  getAltHints(hints) {
    const altHints = [];
    if (hints) {
      let prevHint;
      for (let i = 0; i < hints.length; i++) {
        const d = hints[i];
        const x0 = d[0];
        if (i > 0 && prevHint[1] !== x0) {
          altHints.push([prevHint[1], x0]);
        }
        prevHint = d;
      }
    }
    return altHints;
  }
  createNode() {
    const flipperPlotter = select(this.parent);
    this.flipperPlotterNode = flipperPlotter.node();
    this.axisSvg = create$1("svg");
    const axisSvgNode = this.axisSvg.node();
    const wrapper = create$1("div").attr(
      "style",
      styles.relativePosition + styles.fullWidth
    );
    const wrapperNode = wrapper.node();
    const labelCanvas = create$1("canvas").attr(
      "style",
      styles.absoluteTopLeft + styles.fullWidth
    );
    this.labelCanvasNode = labelCanvas.node();
    const hintsCanvas = create$1("canvas").attr(
      "style",
      styles.absoluteTopLeft + styles.fullWidth
    );
    this.hintsCanvasNode = hintsCanvas.node();
    const pulsesCanvas = create$1("canvas").attr("style", styles.fullWidth);
    this.pulsesCanvasNode = pulsesCanvas.node();
    let timingsDiv;
    if (this.timings) {
      timingsDiv = select(this.timings);
    } else {
      timingsDiv = create$1("div");
    }
    this.timingsNode = timingsDiv.node();
    let messagesDiv;
    if (this.messages) {
      messagesDiv = select(this.messages);
    } else {
      messagesDiv = create$1("div");
    }
    this.messagesNode = messagesDiv.node();
    this.flipperPlotterNode.append(axisSvgNode);
    wrapperNode.append(this.hintsCanvasNode);
    wrapperNode.append(this.labelCanvasNode);
    wrapperNode.append(this.pulsesCanvasNode);
    this.flipperPlotterNode.append(wrapperNode);
    if (!this.timings) {
      this.flipperPlotterNode.append(this.timingsNode);
    }
    if (!this.messages) {
      this.flipperPlotterNode.append(this.messagesNode);
    }
  }
  initialCanvas() {
    this.width = this.pulsesCanvasNode.clientWidth;
    this.height = defaults.height;
    this.context = this.context2d(
      this.pulsesCanvasNode,
      this.width,
      this.height
    );
    this.labelContext = this.context2d(
      this.labelCanvasNode,
      this.width,
      this.height
    );
    this.hintsContext = this.context2d(
      this.hintsCanvasNode,
      this.width,
      this.height
    );
  }
  processData(data) {
    let width = 0;
    for (let j = 0; j < this.data.pulses.length; ++j) {
      width += this.data.pulses[j];
    }
    this.data.width = width;
    this.data.hints = [];
    this.altHints = [];
    this.analyzer = new Analyzer(data.pulses);
    this.guess = this.analyzer.guess();
    this.slicer = this.guess;
    this.setSlicerData(data.pulses, this.slicer);
  }
  context2d(canvas, width, height, dpi) {
    const context = canvas.getContext("2d", { desynchronized: true });
    if (dpi == null) dpi = window.devicePixelRatio;
    canvas.width = Math.floor(width * dpi);
    canvas.height = Math.floor(height * dpi);
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    context.scale(dpi, dpi);
    return context;
  }
  drawAllHints(transform2) {
    const { leftPulse, rightPulse } = getBoundaries(
      this.data,
      this.width,
      transform2
    );
    const hints = this.data.hints.filter((d) => {
      const x0 = d[0];
      const x1 = d[1];
      if (x0 >= leftPulse && x0 <= rightPulse) return true;
      if (x1 >= leftPulse && x1 <= rightPulse) return true;
      return false;
    });
    let prevHint;
    for (let i = 0; i < hints.length; i += 1) {
      const hint = hints[i];
      const x0 = hint[0];
      const x1 = hint[1];
      if (prevHint !== x0 && x0 >= 0 && x0 < this.data.width) {
        drawHint(
          this.hintsContext,
          x0 * (transform2.k / this.maxZoom) + transform2.x,
          this.height,
          {
            hintLine: this.theme.hintLine,
            hintStroke: this.theme.hintStroke,
            hintDash: this.theme.hintDash
          }
        );
      }
      if (x1 >= 0 && x1 < this.data.width) {
        drawHint(
          this.hintsContext,
          x1 * (transform2.k / this.maxZoom) + transform2.x,
          this.height,
          {
            hintLine: this.theme.hintLine,
            hintStroke: this.theme.hintStroke,
            hintDash: this.theme.hintDash
          }
        );
      }
      prevHint = x1;
    }
    const altHints = this.altHints.filter((d) => {
      const x0 = d[0];
      const x1 = d[1];
      if (x0 >= leftPulse && x0 <= rightPulse) return true;
      if (x1 >= leftPulse && x1 <= rightPulse) return true;
      return false;
    });
    prevHint = null;
    for (let i = 0; i < altHints.length; i += 1) {
      const hint = altHints[i];
      const x0 = hint[0];
      const x1 = hint[1];
      if (prevHint !== x0 && x0 >= 0 && x0 < this.data.width) {
        drawHint(
          this.hintsContext,
          x0 * (transform2.k / this.maxZoom) + transform2.x,
          this.height,
          {
            hintLine: this.theme.hintAltLine,
            hintStroke: this.theme.hintAltStroke,
            hintDash: this.theme.hintAltDash
          }
        );
      }
      if (x1 >= 0 && x1 < this.data.width) {
        drawHint(
          this.hintsContext,
          x1 * (transform2.k / this.maxZoom) + transform2.x,
          this.height,
          {
            hintLine: this.theme.hintAltLine,
            hintStroke: this.theme.hintAltStroke,
            hintDash: this.theme.hintAltDash
          }
        );
      }
      prevHint = x1;
    }
  }
  zoomed(transform2) {
    if (transform2.x > 0) transform2.x = 0;
    if (transform2.x + this.width * transform2.k < this.width) {
      transform2.x = this.width - this.width * transform2.k;
    }
    this.xScale = transform2.rescaleX(this.xScaleCopy);
    const currentRange = autorange(this.data.width / transform2.k);
    const currentTimeRange = autorange_time(this.data.width / 1e6 / transform2.k);
    this.axisSvg.select(".x-axis").call(
      axisTop(this.xScale).ticks(this.width / 100).tickFormat(
        (x) => (x / currentRange.scale).toFixed(2).replace(/[.,]00$/, "") + `${currentTimeRange.prefix}`
      )
    );
    this.labelContext.save();
    this.labelContext.clearRect(0, 0, this.width, this.height);
    this.hintsContext.save();
    this.hintsContext.clearRect(0, 0, this.width, this.height);
    this.context.save();
    this.context.clearRect(0, 0, this.width, this.height);
    drawFill(
      this.context,
      0,
      -1,
      this.width,
      this.barHeight + this.margin.top + this.margin.bottom,
      this.theme.spaceFill
    );
    let prevX = 0;
    let skipPulse = 0;
    let sum = 0;
    const { leftPulse, rightPulse, pulseInOneX } = getBoundaries(
      this.data,
      this.width,
      transform2
    );
    if (transform2.k < this.breakpointZoom) {
      this.pulses = combiningPulses(this.data, pulseInOneX);
      ({
        pulses: this.pulses,
        sum,
        prevX,
        skipPulse
      } = filterPulses(
        this.pulses,
        sum,
        prevX,
        skipPulse,
        leftPulse,
        rightPulse
      ));
    } else {
      ({
        pulses: this.pulses,
        sum,
        prevX,
        skipPulse
      } = filterPulses(
        this.data.pulses,
        sum,
        prevX,
        skipPulse,
        leftPulse,
        rightPulse
      ));
    }
    for (let i = 0; i < this.pulses.length; i++) {
      const x = this.pulses[i];
      if (x) {
        if ((i + skipPulse) % 2 === 0) {
          drawFill(
            this.context,
            prevX * (transform2.k / this.maxZoom) + transform2.x,
            this.margin.top,
            x * (transform2.k / this.maxZoom),
            this.barHeight,
            transform2.k < this.breakpointZoom ? this.theme.combiningFill : this.theme.hiFill
          );
          drawLine(
            this.context,
            {
              start: [
                prevX * (transform2.k / this.maxZoom) + transform2.x,
                this.height - this.barHeight - this.margin.top + this.theme.hiLine / 2
              ],
              end: [
                (prevX + x) * (transform2.k / this.maxZoom) + transform2.x,
                this.height - this.barHeight - this.margin.top + this.theme.hiLine / 2
              ]
            },
            {
              lineWidth: this.theme.hiLine,
              strokeStyle: this.theme.hiStroke
            }
          );
        } else {
          drawLine(
            this.context,
            {
              start: [
                prevX * (transform2.k / this.maxZoom) + transform2.x,
                this.height - this.margin.top - this.theme.loLine / 2
              ],
              end: [
                (prevX + x) * (transform2.k / this.maxZoom) + transform2.x,
                this.height - this.margin.top - this.theme.loLine / 2
              ]
            },
            {
              lineWidth: this.theme.loLine,
              strokeStyle: this.theme.loStroke
            }
          );
        }
        const w = x * (this.width * transform2.k / this.data.width);
        if (w > this.theme.fontSize * 4) {
          drawText(
            this.labelContext,
            x,
            (prevX + x / 2) * (transform2.k / this.maxZoom) + transform2.x,
            this.height / 2,
            {
              color: this.theme.fontColor,
              font: `${this.theme.fontSize}px sans-serif`,
              align: this.theme.fontAlign,
              baseline: this.theme.fontBaseline
            }
          );
        }
        if (pulseInOneX <= this.breakpointPulseInOneX && transform2.k >= this.breakpointZoom && (i + skipPulse) % 2 === 0) {
          drawLine(
            this.context,
            {
              start: [
                prevX * (transform2.k / this.maxZoom) + transform2.x,
                this.height - this.margin.top
              ],
              end: [
                prevX * (transform2.k / this.maxZoom) + transform2.x,
                this.height - this.barHeight - this.margin.top
              ]
            },
            {
              lineWidth: this.theme.edgeLine,
              strokeStyle: this.theme.hiStroke
            }
          );
          drawLine(
            this.context,
            {
              start: [
                (prevX + x) * (transform2.k / this.maxZoom) + transform2.x,
                this.height - this.barHeight - this.margin.top
              ],
              end: [
                (prevX + x) * (transform2.k / this.maxZoom) + transform2.x,
                this.height - this.margin.top
              ]
            },
            {
              lineWidth: this.theme.edgeLine,
              strokeStyle: this.theme.loStroke
            }
          );
        }
        prevX = prevX + x;
      }
    }
    this.drawAllHints(transform2);
    this.labelContext.restore();
    this.hintsContext.restore();
    this.context.restore();
  }
  redrawHintsCanvas(transform2) {
    this.hintsContext.save();
    this.hintsContext.clearRect(0, 0, this.width, this.height);
    this.drawAllHints(transform2);
    this.hintsContext.restore();
  }
  drawCanvas() {
    this.margin = defaults.margin;
    this.barHeight = this.height - this.margin.top - this.margin.bottom;
    this.pulses = [];
    this.breakpointZoom = defaults.breakpoints.zoom;
    this.breakpointPulseInOneX = defaults.breakpoints.pulseInOneX;
    const minZoom = 1;
    this.maxZoom = this.data.width / this.width;
    this.xScale = linear().range([0, this.width]).domain([0, this.data.width]);
    this.xScaleCopy = this.xScale.copy();
    const xAxis = axisTop(this.xScale).ticks(this.width / 100).tickFormat((x) => `(${x.toFixed(1)})`);
    const labelСanvas = select(this.labelCanvasNode).style("cursor", "grab").call(
      zoom().scaleExtent([minZoom, this.maxZoom]).on("start", () => {
        labelСanvas.style("cursor", "grabbing");
      }).on("zoom", (e) => {
        if (e.sourceEvent.type === "wheel") {
          labelСanvas.style("cursor", "ns-resize");
        }
        this.zoomed(e.transform);
      }).on("end", () => {
        labelСanvas.style("cursor", "grab");
      })
    );
    const axisHeight = 18;
    this.axisSvg.attr("viebox", [0, 0, this.width, axisHeight]).attr("width", this.width).attr("height", axisHeight);
    this.axisSvg.append("g").classed("x-axis", true).call(xAxis);
    select(".x-axis").attr("transform", `translate(${[0, axisHeight]})`);
    this.zoomed(transform(this.labelCanvasNode));
  }
  destroy() {
    this.flipperPlotterNode.innerHTML = "";
  }
}
class FlipperPlotterOffscreen {
  get slicerOptions() {
    return slicerOptions;
  }
  constructor(options = {}) {
    if (!options.data) {
      console.error(new Error("Required data missing for flipperPlotter"));
      return;
    } else {
      this.data = options.data;
    }
    if (options.parent) {
      this.parent = selector$1(options.parent);
    } else {
      this.parent = selector$1(defaults.selector);
    }
    if (options.timings) {
      this.timings = selector$1(options.timings);
    }
    if (options.messages) {
      this.messages = selector$1(options.messages);
    }
    if (!this.parent) {
      console.error(new Error("Missing mount element for flipperPlotter"));
      return;
    }
    this.initialPlotter(options);
    window.onresize = () => {
      this.destroy();
      this.initialPlotter(options);
    };
  }
  initialPlotter(options) {
    this.createWorker();
    this.setTheme(options.theme);
    this.createNode();
    this.initialCanvas();
    this.processData(this.data);
    this.drawCanvas();
  }
  createWorker() {
    this.worker = new Worker(new URL(
      /* @vite-ignore */
      "/lab.flipper.net/assets/worker-Dq4K2VG6.js",
      import.meta.url
    ), {
      type: "module"
    });
  }
  setTheme(options) {
    this.theme = { ...defaults.theme, ...options };
    this.worker.postMessage({ message: "setTheme", theme: this.theme });
  }
  setSlicer(params) {
    if (params && params.modulation) {
      this.slicer = params;
    } else if (this.data && this.data.modulation) {
      this.slicer = this.data;
    } else {
      this.slicer = this.guess;
    }
    if (!this.data.pulses || !this.data.pulses.length) return;
    this.setSlicerData(this.data.pulses, this.slicer);
    this.redrawHintsCanvas(transform(this.labelCanvasNode));
  }
  setSlicerData(pulses, slicer) {
    const slice = sliceGuess(pulses, slicer);
    const timings = this.timingsNode;
    const messages = this.messagesNode;
    this.analyzer.print(timings, messages);
    if (slice.hints) {
      this.data.hints = slice.hints;
      this.altHints = this.getAltHints(slice.hints);
      this.worker.postMessage({
        message: "setAltHints",
        altHints: JSON.stringify(this.altHints)
      });
    }
    if (slice.bits) {
      this.data.bits = slice.bits;
      if (messages) {
        messages.innerHTML += `<div>Bits: <strong>${slice.bits.toHexString()}</strong></div>`;
      }
    }
  }
  getAltHints(hints) {
    const altHints = [];
    if (hints) {
      let prevHint;
      for (let i = 0; i < hints.length; i++) {
        const d = hints[i];
        const x0 = d[0];
        if (i > 0 && prevHint[1] !== x0) {
          altHints.push([prevHint[1], x0]);
        }
        prevHint = d;
      }
    }
    return altHints;
  }
  createNode() {
    const flipperPlotter = select(this.parent);
    this.flipperPlotterNode = flipperPlotter.node();
    this.axisSvg = create$1("svg");
    const axisSvgNode = this.axisSvg.node();
    const wrapper = create$1("div").attr(
      "style",
      styles.relativePosition + styles.fullWidth
    );
    const wrapperNode = wrapper.node();
    const labelCanvas = create$1("canvas").attr(
      "style",
      styles.absoluteTopLeft + styles.fullWidth
    );
    this.labelCanvasNode = labelCanvas.node();
    const hintsCanvas = create$1("canvas").attr(
      "style",
      styles.absoluteTopLeft + styles.fullWidth
    );
    this.hintsCanvasNode = hintsCanvas.node();
    const pulsesCanvas = create$1("canvas").attr("style", styles.fullWidth);
    this.pulsesCanvasNode = pulsesCanvas.node();
    let timingsDiv;
    if (this.timings) {
      timingsDiv = select(this.timings);
    } else {
      timingsDiv = create$1("div");
    }
    this.timingsNode = timingsDiv.node();
    let messagesDiv;
    if (this.messages) {
      messagesDiv = select(this.messages);
    } else {
      messagesDiv = create$1("div");
    }
    this.messagesNode = messagesDiv.node();
    this.flipperPlotterNode.append(axisSvgNode);
    wrapperNode.append(this.hintsCanvasNode);
    wrapperNode.append(this.labelCanvasNode);
    wrapperNode.append(this.pulsesCanvasNode);
    this.flipperPlotterNode.append(wrapperNode);
    if (!this.timings) {
      this.flipperPlotterNode.append(this.timingsNode);
    }
    if (!this.messages) {
      this.flipperPlotterNode.append(this.messagesNode);
    }
  }
  initialCanvas() {
    this.width = this.pulsesCanvasNode.clientWidth;
    this.height = defaults.height;
    this.worker.postMessage({
      message: "setConfigContext",
      width: this.width,
      height: this.height,
      dpi: window.devicePixelRatio
    });
    this.pulsesOffscreen = this.pulsesCanvasNode.transferControlToOffscreen();
    this.worker.postMessage(
      { message: "getContext", canvas: this.pulsesOffscreen },
      [this.pulsesOffscreen]
    );
    this.labelOffscreen = this.labelCanvasNode.transferControlToOffscreen();
    this.worker.postMessage(
      { message: "getLabelContext", canvas: this.labelOffscreen },
      [this.labelOffscreen]
    );
    this.hintsOffscreen = this.hintsCanvasNode.transferControlToOffscreen();
    this.worker.postMessage(
      { message: "getHintsContext", canvas: this.hintsOffscreen },
      [this.hintsOffscreen]
    );
  }
  processData(data) {
    let width = 0;
    for (let j = 0; j < this.data.pulses.length; ++j) {
      width += this.data.pulses[j];
    }
    this.data.width = width;
    this.data.hints = [];
    this.altHints = [];
    if (!this.slicer) {
      this.analyzer = new Analyzer(data.pulses);
      this.guess = this.analyzer.guess();
      this.slicer = this.guess;
    }
    this.setSlicerData(data.pulses, this.slicer);
    this.worker.postMessage({
      message: "setData",
      data: JSON.stringify(this.data)
    });
  }
  zoomed(transform2) {
    if (transform2.x > 0) transform2.x = 0;
    if (transform2.x + this.width * transform2.k < this.width) {
      transform2.x = this.width - this.width * transform2.k;
    }
    this.xScale = transform2.rescaleX(this.xScaleCopy);
    const currentRange = autorange(this.data.width / transform2.k);
    const currentTimeRange = autorange_time(this.data.width / 1e6 / transform2.k);
    this.axisSvg.select(".x-axis").call(
      axisTop(this.xScale).ticks(this.width / 100).tickFormat(
        (x) => (x / currentRange.scale).toFixed(2).replace(/[.,]00$/, "") + `${currentTimeRange.prefix}`
      )
    );
    this.worker.postMessage({ message: "zoomed", transform: transform2 });
  }
  redrawHintsCanvas(transform2) {
    this.worker.postMessage({ message: "redrawHintsCanvas", transform: transform2 });
  }
  drawCanvas() {
    this.margin = defaults.margin;
    this.barHeight = this.height - this.margin.top - this.margin.bottom;
    this.worker.postMessage({
      message: "setBarHeight",
      barHeight: this.barHeight
    });
    const minZoom = 1;
    const maxZoom = this.data.width / this.width;
    this.worker.postMessage({ message: "setMaxZoom", maxZoom });
    this.xScale = linear().range([0, this.width]).domain([0, this.data.width]);
    this.xScaleCopy = this.xScale.copy();
    const xAxis = axisTop(this.xScale).ticks(this.width / 100).tickFormat((x) => `(${x.toFixed(1)})`);
    select(this.pulsesCanvasNode).attr("width", this.width).attr("height", this.height).call(
      zoom().scaleExtent([minZoom, maxZoom]).on("zoom", ({ transform: transform2 }) => this.zoomed(transform2))
    );
    const labelСanvas = select(this.labelCanvasNode).attr("width", this.width).attr("height", this.height).style("cursor", "grab").call(
      zoom().scaleExtent([minZoom, maxZoom]).on("start", () => {
        labelСanvas.style("cursor", "grabbing");
      }).on("zoom", (e) => {
        if (e.sourceEvent.type === "wheel") {
          labelСanvas.style("cursor", "ns-resize");
        }
        this.zoomed(e.transform);
      }).on("end", () => {
        labelСanvas.style("cursor", "grab");
      })
    );
    const axisHeight = 18;
    this.axisSvg.attr("viebox", [0, 0, this.width, axisHeight]).attr("width", this.width).attr("height", axisHeight);
    this.axisSvg.append("g").classed("x-axis", true).call(xAxis);
    select(".x-axis").attr("transform", `translate(${[0, axisHeight]})`);
    this.zoomed(identity);
  }
  destroy() {
    this.worker.terminate();
    this.flipperPlotterNode.innerHTML = "";
  }
}
const PulsePlotterLib = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Constants: constants$1,
  FlipperPlotter,
  FlipperPlotterOffscreen
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Plotter",
  props: ["data", "offscreen"],
  setup(__props, { expose: __expose }) {
    __expose();
    const { FlipperPlotter: FlipperPlotter2, FlipperPlotterOffscreen: FlipperPlotterOffscreen2 } = PulsePlotterLib;
    const props = __props;
    const timings = ref(null);
    const bits = ref(null);
    const plot = ref();
    const slicerOptions2 = ref();
    const currentSlicer = ref({
      modulation: "",
      short: 0,
      long: 0,
      sync: 0,
      gap: 0
    });
    const onSlice = () => {
      var _a;
      (_a = plot.value) == null ? void 0 : _a.setSlicer(currentSlicer.value);
    };
    const draw = () => {
      const config = {
        data: props.data,
        timings: timings.value,
        messages: bits.value
      };
      if (props.offscreen) {
        plot.value = new FlipperPlotterOffscreen2(config);
      } else {
        plot.value = new FlipperPlotter2(config);
      }
      slicerOptions2.value = plot.value.slicerOptions;
      currentSlicer.value = plot.value.slicer;
    };
    onMounted(() => {
      draw();
    });
    watch(
      () => props.data,
      () => {
        var _a;
        (_a = plot.value) == null ? void 0 : _a.destroy();
        draw();
      }
    );
    onBeforeUnmount(() => {
      var _a;
      (_a = plot.value) == null ? void 0 : _a.destroy();
    });
    const __returned__ = { FlipperPlotter: FlipperPlotter2, FlipperPlotterOffscreen: FlipperPlotterOffscreen2, props, timings, bits, plot, slicerOptions: slicerOptions2, currentSlicer, onSlice, draw, get useNumbersOnly() {
      return useNumbersOnly;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$1 = { class: "full-width" };
const _hoisted_2 = { class: "row q-col-gutter-md q-mb-md" };
const _hoisted_3 = { class: "col-2 flex" };
const _hoisted_4 = { class: "column" };
const _hoisted_5 = {
  ref: "timings",
  class: "q-mb-md"
};
const _hoisted_6 = { ref: "bits" };
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(Fragment, null, [
    _cache[5] || (_cache[5] = createBaseVNode("div", {
      id: "flipperPlotter",
      class: "full-width q-mb-md"
    }, null, -1)),
    createBaseVNode("div", _hoisted_1$1, [
      createBaseVNode("div", _hoisted_2, [
        createVNode(QSelect, {
          class: "col-1",
          modelValue: $setup.currentSlicer.modulation,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.currentSlicer.modulation = $event),
          options: $setup.slicerOptions,
          "option-value": "value",
          "option-label": "text",
          "emit-value": "",
          label: "Slicer"
        }, null, 8, ["modelValue", "options"]),
        createVNode(QInput, {
          class: "col-1",
          modelValue: $setup.currentSlicer.short,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.currentSlicer.short = $event),
          modelModifiers: { number: true, trim: true },
          onKeypress: $setup.useNumbersOnly,
          type: "text",
          label: "Short"
        }, null, 8, ["modelValue", "onKeypress"]),
        createVNode(QInput, {
          class: "col-1",
          modelValue: $setup.currentSlicer.long,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.currentSlicer.long = $event),
          modelModifiers: { number: true, trim: true },
          onKeypress: $setup.useNumbersOnly,
          type: "text",
          label: "Long"
        }, null, 8, ["modelValue", "onKeypress"]),
        createVNode(QInput, {
          class: "col-1",
          modelValue: $setup.currentSlicer.sync,
          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.currentSlicer.sync = $event),
          modelModifiers: { number: true, trim: true },
          onKeypress: $setup.useNumbersOnly,
          type: "text",
          label: "Sync"
        }, null, 8, ["modelValue", "onKeypress"]),
        createVNode(QInput, {
          class: "col-1",
          modelValue: $setup.currentSlicer.gap,
          "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.currentSlicer.gap = $event),
          modelModifiers: { number: true, trim: true },
          onKeypress: $setup.useNumbersOnly,
          type: "text",
          label: "Gap"
        }, null, 8, ["modelValue", "onKeypress"]),
        createBaseVNode("div", _hoisted_3, [
          createVNode(QBtn, {
            color: "primary",
            icon: "content_cut",
            label: "Slice",
            size: "md",
            unelevated: "",
            onClick: $setup.onSlice
          })
        ])
      ]),
      createBaseVNode("div", _hoisted_4, [
        createBaseVNode("div", _hoisted_5, null, 512),
        createBaseVNode("div", _hoisted_6, null, 512)
      ])
    ])
  ], 64);
}
const PulsePlotter$2 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__file", "Plotter.vue"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Plotter",
  setup(__props, { expose: __expose }) {
    __expose();
    const flipperStore = useFlipperStore();
    const fileToPass = computed(() => flipperStore.fileToPass);
    const flags = ref({
      offscreenCanvasSupported: true,
      dragging: false
    });
    const filetype = ref();
    const showPlotter = ref(false);
    const data = ref();
    const notifyForWrongFile = () => {
      Notify.create({
        type: "negative",
        message: "Wrong file type. Only <b>SubGhz RAW</b>, <b>RFID RAW</b> and <b>Infrared signals</b> files are accepted.",
        html: true
      });
    };
    const switchFiletype = async ({
      file,
      isBuffer
    } = {
      isBuffer: false
    }) => {
      if (!file) {
        return;
      }
      let buffer;
      if (isBuffer) {
        buffer = file;
      } else if (file instanceof File) {
        buffer = await file.arrayBuffer();
      } else {
        throw new Error("Unsupported file type");
      }
      const text = new TextDecoder().decode(buffer).split(/\r?\n/);
      if (text[0].startsWith("RIFL")) {
        return processRfid(new Uint8Array(buffer));
      }
      const firstLine = text[0].trim();
      if (firstLine.includes("Flipper SubGhz RAW File")) {
        return processSubGhz(text);
      } else if (firstLine.includes("IR signals file")) {
        return processIr(text);
      } else {
        notifyForWrongFile();
      }
    };
    const processSubGhz = (text) => {
      filetype.value = "subghz";
      let frequency, rawData = "";
      for (const line of text) {
        if (line.startsWith("Frequency")) {
          frequency = Number(line.split(" ")[1]);
        } else if (line.startsWith("RAW_Data")) {
          let raw = line.replaceAll("RAW_Data: ", " ");
          const deviations = raw.match(/(\s\d+\s\d+)|(\s-\d+\s-\d+)/g);
          if (deviations) {
            for (const match of deviations) {
              const s = match.trim().split(" ");
              if (s[1].startsWith("-")) {
                s.splice(1, 0, "1");
              } else {
                s.splice(1, 0, "-1");
              }
              raw = raw.replace(match, " " + s.join(" "));
              console.log(`Fixed deviation:${match} ->${" " + s.join(" ")}`);
            }
          }
          rawData += raw;
        }
      }
      rawData = rawData.trim();
      if (rawData.startsWith("-")) {
        rawData = "0 " + rawData;
      }
      rawData = rawData.replaceAll("-", "").split(" ");
      rawData = rawData.map((e) => Number(e));
      if (frequency) {
        data.value = {
          centerfreq_Hz: frequency,
          pulses: rawData
        };
      }
      onShowPlotter();
    };
    const uploadedFile = ref();
    watch(
      () => uploadedFile.value,
      (newFile) => {
        signalOptions.value = [];
        currentSignal.value = void 0;
        switchFiletype({
          file: newFile
        });
      }
    );
    const signalOptions = ref([]);
    const currentSignal = ref();
    watch(
      () => currentSignal.value,
      (newSignal) => {
        var _a;
        if (newSignal) {
          if (newSignal.frequency && ((_a = newSignal.data) == null ? void 0 : _a.length)) {
            data.value = {
              centerfreq_Hz: newSignal.frequency,
              pulses: newSignal.data
            };
          }
        }
      }
    );
    const processIr = (text) => {
      filetype.value = "ir";
      let signals = [], i = -1;
      for (const line of text) {
        if (line.startsWith("#")) {
          i++;
          signals[i] = {};
        } else if (line.startsWith("name")) {
          signals[i].name = line.split(" ")[1];
        } else if (line.startsWith("type")) {
          signals[i].type = line.split(" ")[1];
        } else if (line.startsWith("frequency")) {
          signals[i].frequency = Number(line.split(" ")[1]);
        } else if (line.startsWith("data")) {
          signals[i].data = line.split(": ")[1];
        }
      }
      signals = signals.filter((e) => e.type === "raw");
      if (signals.length === 0) {
        notifyForWrongFile();
        return;
      }
      for (const signal of signals) {
        signal.data = signal.data.split(" ");
        signal.data = signal.data.map((e) => Number(e));
      }
      signalOptions.value = signals;
      currentSignal.value = signals[0];
      onShowPlotter();
    };
    const processRfid = (rawData) => {
      filetype.value = "rfid";
      const sliceView = (from, to) => {
        const view = new DataView(new ArrayBuffer(to - from));
        rawData.slice(from, to).reverse().forEach((b, i) => {
          view.setUint8(i, b);
        });
        return view;
      };
      const header = {
        magic: sliceView(0, 4).getUint32(0),
        version: sliceView(4, 8).getUint32(0),
        frequency: sliceView(8, 12).getFloat32(0),
        dutyCycle: sliceView(12, 16).getFloat32(0),
        maxBufferSize: sliceView(16, 20).getUint32(0)
      };
      const readVarInt = (buffer) => {
        let value = 0;
        let length = 0;
        let currentByte;
        while (true) {
          currentByte = buffer[length];
          value |= (currentByte & 127) << length * 7;
          length += 1;
          if (length > 5) {
            throw new Error("VarInt exceeds allowed bounds.");
          }
          if ((currentByte & 128) !== 128) break;
        }
        return { value, length };
      };
      let dataOffset = 20, bufferSize = sliceView(dataOffset, dataOffset + 4).getUint32(0);
      const varints = [];
      if (bufferSize > header.maxBufferSize) {
        throw new Error(
          `Buffer size (${bufferSize}) exceeds max_buffer_size (${header.maxBufferSize})`
        );
      }
      while (rawData.length > dataOffset) {
        const buffer = rawData.slice(dataOffset, dataOffset + bufferSize);
        let bufferOffset = 4;
        while (bufferOffset < buffer.length) {
          const varint = readVarInt(buffer.slice(bufferOffset));
          bufferOffset += varint.length;
          varints.push(varint.value);
        }
        dataOffset += bufferSize + 4;
        bufferSize = sliceView(dataOffset, dataOffset + 4).getUint32(0);
      }
      data.value = {
        centerfreq_Hz: header.frequency,
        pulses: varints
      };
      onShowPlotter();
    };
    const onShowPlotter = () => {
      showPlotter.value = true;
    };
    onMounted(() => {
      if (fileToPass.value) {
        switchFiletype({
          file: fileToPass.value.data,
          isBuffer: true
        });
      }
      if (typeof OffscreenCanvas !== "undefined") {
        flags.value.offscreenCanvasSupported = true;
      } else {
        flags.value.offscreenCanvasSupported = false;
      }
    });
    const __returned__ = { flipperStore, fileToPass, flags, filetype, showPlotter, data, notifyForWrongFile, switchFiletype, processSubGhz, uploadedFile, signalOptions, currentSignal, processIr, processRfid, onShowPlotter, get PulsePlotter() {
      return PulsePlotter$2;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = { class: "column items-start" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(QFile, {
      outlined: "",
      modelValue: $setup.uploadedFile,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.uploadedFile = $event),
      label: "Drop or select file",
      class: "q-py-md",
      style: { "min-width": "200px" }
    }, {
      prepend: withCtx(() => [
        createVNode(QIcon, { name: "file_upload" })
      ]),
      _: 1
    }, 8, ["modelValue"]),
    $setup.currentSignal ? (openBlock(), createBlock(QSelect, {
      key: 0,
      class: "q-mb-md",
      modelValue: $setup.currentSignal,
      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.currentSignal = $event),
      options: $setup.signalOptions,
      "option-label": "name",
      label: "Select signal",
      style: { "min-width": "200px" }
    }, null, 8, ["modelValue", "options"])) : createCommentVNode("", true),
    $setup.showPlotter ? (openBlock(), createBlock($setup["PulsePlotter"], {
      key: 1,
      data: $setup.data,
      offscreen: $setup.flags.offscreenCanvasSupported
    }, null, 8, ["data", "offscreen"])) : createCommentVNode("", true)
  ]);
}
const PulsePlotter$1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "Plotter.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PulsePlotter",
  setup(__props, { expose: __expose }) {
    __expose();
    const __returned__ = { get GenericPageLayout() {
      return GenericPageLayout;
    }, get PulsePlotter() {
      return PulsePlotter$1;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock($setup["GenericPageLayout"], {
    title: "Pulse Plotter",
    icon: "flipper:subtools",
    description: "Raw Sub-GHz/Infrared/RFID pulse plotter"
  }, {
    info: withCtx(() => _cache[0] || (_cache[0] = [
      createBaseVNode("h6", { class: "q-mt-none q-mb-sm" }, "About Pulse plotter", -1),
      createBaseVNode("p", null, " Sub-GHz/RFID/Infrared signal plotter, or Pulse plotter in short, is a tool to visualize raw signals (aka pulses) from various sources. Aside from visualizing saved signals, it can also be helpful to analyze raw captures. ", -1),
      createBaseVNode("p", null, [
        createTextVNode(" Accepted file formats are: "),
        createBaseVNode("ul", { class: "q-mt-none q-pl-lg" }, [
          createBaseVNode("li", null, [
            createTextVNode("Sub-GHz RAW captures ("),
            createBaseVNode("b", null, ".sub"),
            createTextVNode(")")
          ]),
          createBaseVNode("li", null, [
            createTextVNode("RFID RAW captures ("),
            createBaseVNode("b", null, ".raw"),
            createTextVNode(")")
          ]),
          createBaseVNode("li", null, [
            createTextVNode("Infrared signal/remote files ("),
            createBaseVNode("b", null, ".ir"),
            createTextVNode(")")
          ]),
          createBaseVNode("li", null, [
            createTextVNode("other "),
            createBaseVNode("b", null, "Flipper File Format RAW"),
            createTextVNode("-compatible files")
          ])
        ])
      ], -1),
      createBaseVNode("p", null, "After parsing the file, plotter will try to guess signal modulation. You can also use the slicer to figure it out manually.", -1),
      createBaseVNode("p", { class: "q-mb-none" }, [
        createBaseVNode("a", {
          href: "https://docs.flipper.net/sub-ghz/read-raw",
          target: "_blank"
        }, "Read more about capturing RAW signals"),
        createTextVNode(" on Flipper Docs ")
      ], -1)
    ])),
    default: withCtx(() => [
      createVNode($setup["PulsePlotter"])
    ]),
    _: 1
  });
}
const PulsePlotter = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "PulsePlotter.vue"]]);
export {
  PulsePlotter as PulsePlotterPage
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgtcFlwaVBxVlcuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9lbnRpdGllcy9QdWxzZVBsb3R0ZXIvbGliL2F1dG9yYW5nZS5qcyIsIi4uLy4uLy4uL3NyYy9lbnRpdGllcy9QdWxzZVBsb3R0ZXIvbGliL2JpdGJ1ZmZlci5qcyIsIi4uLy4uLy4uL3NyYy9lbnRpdGllcy9QdWxzZVBsb3R0ZXIvbGliL3NsaWNlci5qcyIsIi4uLy4uLy4uL3NyYy9lbnRpdGllcy9QdWxzZVBsb3R0ZXIvbGliL3V0aWxzLmpzIiwiLi4vLi4vLi4vc3JjL2VudGl0aWVzL1B1bHNlUGxvdHRlci9saWIvaGV4YnVmZmVyLmpzIiwiLi4vLi4vLi4vc3JjL2VudGl0aWVzL1B1bHNlUGxvdHRlci9saWIvaGlzdG9ncmFtLmpzIiwiLi4vLi4vLi4vc3JjL2VudGl0aWVzL1B1bHNlUGxvdHRlci9saWIvY29uc3RhbnRzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLWFycmF5L3NyYy9hc2NlbmRpbmcuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtYXJyYXkvc3JjL2Rlc2NlbmRpbmcuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtYXJyYXkvc3JjL2Jpc2VjdG9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLWFycmF5L3NyYy9udW1iZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtYXJyYXkvc3JjL2Jpc2VjdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1hcnJheS9zcmMvdGlja3MuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtYXhpcy9zcmMvaWRlbnRpdHkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtYXhpcy9zcmMvYXhpcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1kaXNwYXRjaC9zcmMvZGlzcGF0Y2guanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9uYW1lc3BhY2VzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvbmFtZXNwYWNlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvY3JlYXRvci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdG9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL3NlbGVjdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL2FycmF5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0b3JBbGwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vc2VsZWN0QWxsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvbWF0Y2hlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9zZWxlY3RDaGlsZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9zZWxlY3RDaGlsZHJlbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9maWx0ZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vc3BhcnNlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL2VudGVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvY29uc3RhbnQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vZGF0YS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9leGl0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL2pvaW4uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vbWVyZ2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vb3JkZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vc29ydC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9jYWxsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL25vZGVzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL25vZGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vc2l6ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9lbXB0eS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9lYWNoLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL2F0dHIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy93aW5kb3cuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vc3R5bGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vcHJvcGVydHkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vY2xhc3NlZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi90ZXh0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL2h0bWwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vcmFpc2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vbG93ZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vYXBwZW5kLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL2luc2VydC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9yZW1vdmUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vY2xvbmUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vZGF0dW0uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vZGlzcGF0Y2guanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vaXRlcmF0b3IuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3QuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9jcmVhdGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zb3VyY2VFdmVudC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3BvaW50ZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtZHJhZy9zcmMvbm9ldmVudC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1kcmFnL3NyYy9ub2RyYWcuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtY29sb3Ivc3JjL2RlZmluZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1jb2xvci9zcmMvY29sb3IuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL2NvbnN0YW50LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9jb2xvci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvcmdiLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9udW1iZXJBcnJheS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvYXJyYXkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL2RhdGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL251bWJlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvb2JqZWN0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9zdHJpbmcuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL3ZhbHVlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9yb3VuZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvdHJhbnNmb3JtL2RlY29tcG9zZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvdHJhbnNmb3JtL3BhcnNlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy90cmFuc2Zvcm0vaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL3pvb20uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdGltZXIvc3JjL3RpbWVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXRpbWVyL3NyYy90aW1lb3V0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vc2NoZWR1bGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvaW50ZXJydXB0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3NlbGVjdGlvbi9pbnRlcnJ1cHQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi90d2Vlbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL2ludGVycG9sYXRlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vYXR0ci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL2F0dHJUd2Vlbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL2RlbGF5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vZHVyYXRpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9lYXNlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vZWFzZVZhcnlpbmcuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9maWx0ZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9tZXJnZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL29uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vcmVtb3ZlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vc2VsZWN0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vc2VsZWN0QWxsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vc2VsZWN0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vc3R5bGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9zdHlsZVR3ZWVuLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vdGV4dC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL3RleHRUd2Vlbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL3RyYW5zaXRpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9lbmQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1lYXNlL3NyYy9jdWJpYy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy9zZWxlY3Rpb24vdHJhbnNpdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy9zZWxlY3Rpb24vaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtZm9ybWF0L3NyYy9mb3JtYXREZWNpbWFsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLWZvcm1hdC9zcmMvZXhwb25lbnQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtZm9ybWF0L3NyYy9mb3JtYXRHcm91cC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1mb3JtYXQvc3JjL2Zvcm1hdE51bWVyYWxzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLWZvcm1hdC9zcmMvZm9ybWF0U3BlY2lmaWVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLWZvcm1hdC9zcmMvZm9ybWF0VHJpbS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1mb3JtYXQvc3JjL2Zvcm1hdFByZWZpeEF1dG8uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtZm9ybWF0L3NyYy9mb3JtYXRSb3VuZGVkLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLWZvcm1hdC9zcmMvZm9ybWF0VHlwZXMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtZm9ybWF0L3NyYy9pZGVudGl0eS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1mb3JtYXQvc3JjL2xvY2FsZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1mb3JtYXQvc3JjL2RlZmF1bHRMb2NhbGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtZm9ybWF0L3NyYy9wcmVjaXNpb25GaXhlZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1mb3JtYXQvc3JjL3ByZWNpc2lvblByZWZpeC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1mb3JtYXQvc3JjL3ByZWNpc2lvblJvdW5kLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNjYWxlL3NyYy9pbml0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNjYWxlL3NyYy9jb25zdGFudC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS9zcmMvbnVtYmVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNjYWxlL3NyYy9jb250aW51b3VzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNjYWxlL3NyYy90aWNrRm9ybWF0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXNjYWxlL3NyYy9saW5lYXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtem9vbS9zcmMvY29uc3RhbnQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtem9vbS9zcmMvZXZlbnQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtem9vbS9zcmMvdHJhbnNmb3JtLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2QzLXpvb20vc3JjL25vZXZlbnQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZDMtem9vbS9zcmMvem9vbS5qcyIsIi4uLy4uLy4uL3NyYy9lbnRpdGllcy9QdWxzZVBsb3R0ZXIvbGliL2ZsaXBwZXJQbG90dGVyLmpzIiwiLi4vLi4vLi4vc3JjL2VudGl0aWVzL1B1bHNlUGxvdHRlci9saWIvZmxpcHBlclBsb3R0ZXJPZmZzY3JlZW4uanMiLCIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvUHVsc2VQbG90dGVyL1Bsb3R0ZXIvdWkvUGxvdHRlci52dWUiLCIuLi8uLi8uLi9zcmMvd2lkZ2V0cy9QdWxzZVBsb3R0ZXIvdWkvUGxvdHRlci52dWUiLCIuLi8uLi8uLi9zcmMvcGFnZXMvUHVsc2VQbG90dGVyL3VpL1B1bHNlUGxvdHRlci52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gICAgRGV0ZXJtaW5lIGRpdmlzb3IgYW5kIFNJIHByZWZpeC5cblxuICAgIEBhdXRob3IgQ2hyaXN0aWFuIFcuIFp1Y2tzY2h3ZXJkdCA8emFueUB0cmlxLm5ldD5cbiAgICBAY29weXJpZ2h0IENocmlzdGlhbiBXLiBadWNrc2Nod2VyZHQsIDIwMTlcbiAgICBAbGljZW5zZVxuICAgIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gICAgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAgICB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAyIG9mIHRoZSBMaWNlbnNlLCBvclxuICAgIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4qL1xuXG5jb25zdCBhdXRvcmFuZ2VzID0gW1xuICB7IG5hbWU6ICd5b3R0YScsIHNjYWxlOiAxZTI0LCBwcmVmaXg6ICdZJyB9LFxuICB7IG5hbWU6ICd6ZXR0YScsIHNjYWxlOiAxZTIxLCBwcmVmaXg6ICdaJyB9LFxuICB7IG5hbWU6ICdleGEnLCBzY2FsZTogMWUxOCwgcHJlZml4OiAnRScgfSxcbiAgeyBuYW1lOiAncGV0YScsIHNjYWxlOiAxZTE1LCBwcmVmaXg6ICdQJyB9LFxuICB7IG5hbWU6ICd0ZXJhJywgc2NhbGU6IDFlMTIsIHByZWZpeDogJ1QnIH0sXG4gIHsgbmFtZTogJ2dpZ2EnLCBzY2FsZTogMWU5LCBwcmVmaXg6ICdHJyB9LFxuICB7IG5hbWU6ICdtZWdhJywgc2NhbGU6IDFlNiwgcHJlZml4OiAnTScgfSxcbiAgeyBuYW1lOiAna2lsbycsIHNjYWxlOiAxZTMsIHByZWZpeDogJ2snIH0sXG4gIHsgbmFtZTogJycsIHNjYWxlOiAxLCBwcmVmaXg6ICcnIH0sXG4gIHsgbmFtZTogJ21pbGxpJywgc2NhbGU6IDFlLTMsIHByZWZpeDogJ20nIH0sXG4gIHsgbmFtZTogJ21pY3JvJywgc2NhbGU6IDFlLTYsIHByZWZpeDogJ8K1JyB9LFxuICB7IG5hbWU6ICduYW5vJywgc2NhbGU6IDFlLTksIHByZWZpeDogJ24nIH0sXG4gIHsgbmFtZTogJ3BpY28nLCBzY2FsZTogMWUtMTIsIHByZWZpeDogJ3AnIH0sXG4gIHsgbmFtZTogJ2ZlbXRvJywgc2NhbGU6IDFlLTE1LCBwcmVmaXg6ICdmJyB9LFxuICB7IG5hbWU6ICdhdHRvJywgc2NhbGU6IDFlLTE4LCBwcmVmaXg6ICdhJyB9LFxuICB7IG5hbWU6ICd6ZXB0bycsIHNjYWxlOiAxZS0yMSwgcHJlZml4OiAneicgfSxcbiAgeyBuYW1lOiAneW9jdG8nLCBzY2FsZTogMWUtMjQsIHByZWZpeDogJ3knIH1cbl1cblxuLyoqIERldGVybWluZSBkaXZpc29yIGFuZCBTSSBwcmVmaXguICovXG5mdW5jdGlvbiBhdXRvcmFuZ2UobnVtLCBtaW5faW50ID0gMTAuMCkge1xuICBpZiAobnVtID09PSAwLjApIHtcbiAgICByZXR1cm4gYXV0b3Jhbmdlc1s4XVxuICB9XG5cbiAgbnVtID0gbnVtIC8gbWluX2ludFxuICBmb3IgKGxldCBpID0gMDsgaSA8IGF1dG9yYW5nZXMubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAobnVtID49IGF1dG9yYW5nZXNbaV0uc2NhbGUpIHtcbiAgICAgIHJldHVybiBhdXRvcmFuZ2VzW2ldXG4gICAgfVxuICB9XG4gIHJldHVybiBhdXRvcmFuZ2VzW2F1dG9yYW5nZXMubGVuZ3RoIC0gMV1cbn1cblxuZXhwb3J0IHsgYXV0b3JhbmdlIH1cblxuY29uc3QgYXV0b3Jhbmdlc190aW1lID0gW1xuICB7IG5hbWU6ICd5ZWFyJywgc2NhbGU6IDMxNTU3NTEzLCBwcmVmaXg6ICdZJyB9LFxuICB7IG5hbWU6ICdtb250aCcsIHNjYWxlOiAyNjM1MjAwLCBwcmVmaXg6ICdNJyB9LFxuICB7IG5hbWU6ICdkYXknLCBzY2FsZTogODY0MDAsIHByZWZpeDogJ0QnIH0sXG4gIHsgbmFtZTogJ2hvdXInLCBzY2FsZTogMzYwMCwgcHJlZml4OiAnaCcgfSxcbiAgeyBuYW1lOiAnbWludXRlJywgc2NhbGU6IDYwLCBwcmVmaXg6ICdtJyB9LFxuICB7IG5hbWU6ICdzZWNvbmQnLCBzY2FsZTogMSwgcHJlZml4OiAncycgfSxcbiAgeyBuYW1lOiAnbWlsbGknLCBzY2FsZTogMWUtMywgcHJlZml4OiAnbXMnIH0sXG4gIHsgbmFtZTogJ21pY3JvJywgc2NhbGU6IDFlLTYsIHByZWZpeDogJ8K1cycgfSxcbiAgeyBuYW1lOiAnbmFubycsIHNjYWxlOiAxZS05LCBwcmVmaXg6ICducycgfSxcbiAgeyBuYW1lOiAncGljbycsIHNjYWxlOiAxZS0xMiwgcHJlZml4OiAncHMnIH0sXG4gIHsgbmFtZTogJ2ZlbXRvJywgc2NhbGU6IDFlLTE1LCBwcmVmaXg6ICdmcycgfSxcbiAgeyBuYW1lOiAnYXR0bycsIHNjYWxlOiAxZS0xOCwgcHJlZml4OiAnYXMnIH0sXG4gIHsgbmFtZTogJ3plcHRvJywgc2NhbGU6IDFlLTIxLCBwcmVmaXg6ICd6cycgfSxcbiAgeyBuYW1lOiAneW9jdG8nLCBzY2FsZTogMWUtMjQsIHByZWZpeDogJ3lzJyB9XG5dXG5cbi8qKiBEZXRlcm1pbmUgU0kgZGl2aXNvciBvciBTZXhhZ2VzaW1hbCBtdWx0aXBsaWVyIGFuZCBzdWZmaXguICovXG5mdW5jdGlvbiBhdXRvcmFuZ2VfdGltZShudW0sIG1pbl9pbnQgPSAxMC4wKSB7XG4gIGlmIChudW0gPT09IDAuMCkge1xuICAgIHJldHVybiBhdXRvcmFuZ2VzX3RpbWVbOF1cbiAgfVxuXG4gIG51bSA9IG51bSAvIG1pbl9pbnRcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhdXRvcmFuZ2VzX3RpbWUubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAobnVtID49IGF1dG9yYW5nZXNfdGltZVtpXS5zY2FsZSkge1xuICAgICAgcmV0dXJuIGF1dG9yYW5nZXNfdGltZVtpXVxuICAgIH1cbiAgfVxuICByZXR1cm4gYXV0b3Jhbmdlc190aW1lW2F1dG9yYW5nZXNfdGltZS5sZW5ndGggLSAxXVxufVxuXG5leHBvcnQgeyBhdXRvcmFuZ2VfdGltZSB9XG4iLCIvKipcbiAgICBAZmlsZSBCaXRidWZmZXIgSlMuXG5cbiAgICBAYXV0aG9yIENocmlzdGlhbiBXLiBadWNrc2Nod2VyZHQgPHphbnlAdHJpcS5uZXQ+XG4gICAgQGNvcHlyaWdodCBDaHJpc3RpYW4gVy4gWnVja3NjaHdlcmR0LCAyMDIwXG4gICAgQGxpY2Vuc2VcbiAgICBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICAgIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gICAgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMiBvZiB0aGUgTGljZW5zZSwgb3JcbiAgICAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuKi9cblxuLy8gZnVuY3Rpb24gZGVjMmhleChpKSB7XG4vLyAgICByZXR1cm4gKGkgKyAweDEwMCkudG9TdHJpbmcoMTYpLnN1YnN0cigtMikudG9VcHBlckNhc2UoKVxuLy8gfVxuXG5leHBvcnQgY2xhc3MgQml0YnVmZmVyIHtcbiAgY29uc3RydWN0b3IgKGJ5dGVzID0gW10sIGxlbiA9IDApIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShieXRlcykpIHtcbiAgICAgIHRoaXMuYnl0ZXMgPSBieXRlc1xuICAgICAgdGhpcy5sZW4gPSBsZW4gfHwgYnl0ZXMubGVuZ3RoICogOFxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZyb21TdHJpbmcoYnl0ZXMpXG4gICAgfVxuICB9XG5cbiAgZnJvbVN0cmluZyAocykge1xuICAgIHRoaXMuYnl0ZXMgPSBbXVxuICAgIHRoaXMubGVuID0gMFxuICAgIGxldCBsZW4gPSAtMVxuICAgIHMgPSBzLnRyaW0oKVxuICAgIC8vIHBhcnNlIGxlbmd0aFxuICAgIGlmIChzLnN0YXJ0c1dpdGgoJ3snKSkge1xuICAgICAgY29uc3QgZW5kID0gcy5pbmRleE9mKCd9JylcbiAgICAgIGlmIChlbmQgPCAwKSByZXR1cm5cbiAgICAgIGxlbiA9IHBhcnNlSW50KHMuc2xpY2UoMSksIDEwKVxuICAgICAgcyA9IHMuc2xpY2UoZW5kICsgMSlcbiAgICB9XG4gICAgLy8gc2tpcCAweCBwcmVmaXhcbiAgICBpZiAocy5zdGFydHNXaXRoKCcweCcpKSB7XG4gICAgICBzID0gcy5zbGljZSgyKVxuICAgIH1cbiAgICAvLyBwYXJzZSBuaWJibGVzXG4gICAgZm9yIChjb25zdCBjIG9mIHMpIHtcbiAgICAgIGNvbnN0IG4gPSBwYXJzZUludChjLCAxNilcbiAgICAgIHRoaXMucHVzaE5pYmJsZShuKVxuICAgIH1cbiAgICAvLyBzZXQgbGVuZ3RoIGlmIGdpdmVuXG4gICAgaWYgKGxlbiA+PSAwKSB7XG4gICAgICB0aGlzLmxlbiA9IGxlblxuICAgIH1cbiAgfVxuXG4gIHB1c2haZXJvICgpIHtcbiAgICB0aGlzLnB1c2goMClcbiAgfVxuXG4gIHB1c2hPbmUgKCkge1xuICAgIHRoaXMucHVzaCgxKVxuICB9XG5cbiAgcHVzaFN5bWJvbCAocykge1xuICAgIGlmIChzID09PSAnMCcpIHtcbiAgICAgIHRoaXMucHVzaCgwKVxuICAgIH0gZWxzZSBpZiAocyA9PT0gJzEnKSB7XG4gICAgICB0aGlzLnB1c2goMSlcbiAgICB9XG4gIH1cblxuICBwdXNoIChiaXQpIHtcbiAgICBiaXQgPSBiaXQgPyAweDgwIDogMFxuICAgIHRoaXMuYnl0ZXNbfn4odGhpcy5sZW4gLyA4KV0gfD0gYml0ID4+IHRoaXMubGVuICUgOFxuICAgIHRoaXMubGVuICs9IDFcbiAgfVxuXG4gIHB1c2hOaWJibGUgKG4pIHtcbiAgICBmb3IgKGxldCBqID0gMzsgaiA+PSAwOyAtLWopIHtcbiAgICAgIHRoaXMucHVzaCgobiA+PiBqKSAmIDEpXG4gICAgfVxuICB9XG5cbiAgcHVzaEJ5dGUgKG4pIHtcbiAgICBmb3IgKGxldCBqID0gNzsgaiA+PSAwOyAtLWopIHtcbiAgICAgIHRoaXMucHVzaCgobiA+PiBqKSAmIDEpXG4gICAgfVxuICB9XG5cbiAgcHVzaEJyZWFrICgpIHtcbiAgICBjb25zdCBiID0gfn4oKHRoaXMubGVuICsgNykgLyA4KVxuICAgIHRoaXMuYnl0ZXNbYl0gPSAtMVxuICAgIHRoaXMubGVuID0gKGIgKyAxKSAqIDhcbiAgfVxuXG4gIHRvQml0QXJyYXkgKCkge1xuICAgIGNvbnN0IGJpdHMgPSBbXVxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5sZW47ICsraikge1xuICAgICAgY29uc3QgYnl0ZSA9IHRoaXMuYnl0ZXNbfn4oaiAvIDgpXSB8fCAwXG4gICAgICBjb25zdCBiaXQgPSAoYnl0ZSA+PiAoNyAtIChqICUgOCkpKSAmIDFcbiAgICAgIGJpdHMucHVzaChiaXQpXG4gICAgfVxuICAgIHJldHVybiBiaXRzXG4gIH1cblxuICB0b0hleFN0cmluZyAoKSB7XG4gICAgbGV0IHMgPSBgeyR7dGhpcy5sZW59fWBcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMubGVuOyBqICs9IDgpIHtcbiAgICAgIGNvbnN0IGIgPSB0aGlzLmJ5dGVzW35+KGogLyA4KV0gfHwgMFxuICAgICAgaWYgKGIgPCAwKSB7XG4gICAgICAgIHMgKz0gJyAvICdcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHMgKz0gJyAnXG4gICAgICAgIHMgKz0gKGIgPj4gNCkudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKClcbiAgICAgICAgaWYgKGogKyA0IDwgdGhpcy5sZW4pIHtcbiAgICAgICAgICBzICs9IChiICYgMHhmKS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzXG4gIH1cbn1cbiIsIi8qKlxuICAgIEBmaWxlIFB1bHNlIFNsaWNlciBKUy5cblxuICAgIEBhdXRob3IgQ2hyaXN0aWFuIFcuIFp1Y2tzY2h3ZXJkdCA8emFueUB0cmlxLm5ldD5cbiAgICBAY29weXJpZ2h0IENocmlzdGlhbiBXLiBadWNrc2Nod2VyZHQsIDIwMjBcbiAgICBAbGljZW5zZVxuICAgIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gICAgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAgICB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAyIG9mIHRoZSBMaWNlbnNlLCBvclxuICAgIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4qL1xuXG5pbXBvcnQgeyBCaXRidWZmZXIgfSBmcm9tICcuL2JpdGJ1ZmZlci5qcydcblxuZXhwb3J0IGZ1bmN0aW9uIHNsaWNlR3Vlc3MgKHB1bHNlcywgZ3Vlc3MpIHtcbiAgaWYgKGd1ZXNzLm1vZHVsYXRpb24gPT09ICdQQ00nKSB7XG4gICAgcmV0dXJuIHNsaWNlUENNKHB1bHNlcywgZ3Vlc3MpXG4gIH0gZWxzZSBpZiAoZ3Vlc3MubW9kdWxhdGlvbiA9PT0gJ01DJykge1xuICAgIHJldHVybiBzbGljZU1DKHB1bHNlcywgZ3Vlc3MpXG4gIH0gZWxzZSBpZiAoZ3Vlc3MubW9kdWxhdGlvbiA9PT0gJ1BQTScpIHtcbiAgICByZXR1cm4gc2xpY2VQUE0ocHVsc2VzLCBndWVzcylcbiAgfSBlbHNlIGlmIChndWVzcy5tb2R1bGF0aW9uID09PSAnUFdNJykge1xuICAgIHJldHVybiBzbGljZVBXTShwdWxzZXMsIGd1ZXNzKVxuICB9IGVsc2UgaWYgKGd1ZXNzLm1vZHVsYXRpb24gPT09ICdETScpIHtcbiAgICByZXR1cm4gc2xpY2VETShwdWxzZXMsIGd1ZXNzKVxuICB9IGVsc2UgaWYgKGd1ZXNzLm1vZHVsYXRpb24gPT09ICdOUlpJJykge1xuICAgIHJldHVybiBzbGljZU5SWkkocHVsc2VzLCBndWVzcylcbiAgfSBlbHNlIGlmIChndWVzcy5tb2R1bGF0aW9uID09PSAnQ01JJykge1xuICAgIHJldHVybiBzbGljZUNNSShwdWxzZXMsIGd1ZXNzKVxuICB9IGVsc2UgaWYgKGd1ZXNzLm1vZHVsYXRpb24gPT09ICdQSVdNJykge1xuICAgIHJldHVybiBzbGljZVBJV00ocHVsc2VzLCBndWVzcylcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gW11cbiAgfVxufVxuXG4vLyByZXR1cm5lZCBoaW50cyBhcnJheSBjb250YWlucyB0cmlwbGVzIG9mIHN0YXJ0LGVuZCxzeW1ib2xcblxuLy8vIFB1bHNlLWNvZGUgbW9kdWxhdGlvbiAoUENNKVxuLy8vIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1B1bHNlLWNvZGVfbW9kdWxhdGlvblxuLy8vIGVpdGhlciBOUlogb3IgUlpcbmV4cG9ydCBmdW5jdGlvbiBzbGljZVBDTSAocHVsc2VzLCBndWVzcykge1xuICBpZiAoIWd1ZXNzLmxvbmcgfHwgZ3Vlc3MubG9uZyA9PT0gZ3Vlc3Muc2hvcnQpIHtcbiAgICByZXR1cm4gc2xpY2VOUloocHVsc2VzLCBndWVzcylcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gc2xpY2VSWihwdWxzZXMsIGd1ZXNzKVxuICB9XG59XG5cbi8vLyBOUlooTCkgTlJaTCBOb24tcmV0dXJuLXRvLXplcm8gbGV2ZWxcbi8vLyBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9Ob24tcmV0dXJuLXRvLXplcm9cbmV4cG9ydCBmdW5jdGlvbiBzbGljZU5SWiAocHVsc2VzLCBndWVzcykge1xuICBjb25zdCBzaG9ydCA9IGd1ZXNzLnNob3J0XG4gIGNvbnN0IGdhcCA9IGd1ZXNzLmdhcFxuXG4gIGNvbnN0IGJpdHMgPSBuZXcgQml0YnVmZmVyKClcbiAgY29uc3QgaGludHMgPSBbXVxuXG4gIGxldCB4ID0gMFxuICBmb3IgKGxldCBqID0gMDsgaiA8IHB1bHNlcy5sZW5ndGg7IGogKz0gMSkge1xuICAgIGNvbnN0IHN5bWJvbCA9IDEgLSAoaiAlIDIpIC8vIGV2ZW46IDEsIG9kZDogMFxuICAgIGNvbnN0IHcgPSBwdWxzZXNbal0gLy8gbWFyayBvciBzcGFjZVxuICAgIGlmIChnYXAgJiYgdyA+IGdhcCkge1xuICAgICAgYml0cy5wdXNoQnJlYWsoKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBjbnQgPSB+fih3IC8gc2hvcnQgKyAwLjUpXG4gICAgICBmb3IgKGxldCBrID0gMDsgayA8IGNudDsgKytrKSB7XG4gICAgICAgIGhpbnRzLnB1c2goW3ggKyAodyAvIGNudCkgKiBrLCB4ICsgKHcgLyBjbnQpICogKGsgKyAxKSwgc3ltYm9sXSlcbiAgICAgICAgYml0cy5wdXNoKHN5bWJvbClcbiAgICAgIH1cbiAgICB9XG4gICAgeCArPSB3XG4gIH1cblxuICByZXR1cm4geyBoaW50cywgYml0cyB9XG59XG5cbi8vLyBSZXR1cm4tdG8temVybyBsZXZlbFxuLy8vIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1JldHVybi10by16ZXJvXG5leHBvcnQgZnVuY3Rpb24gc2xpY2VSWiAocHVsc2VzLCBndWVzcykge1xuICBjb25zdCBzaG9ydCA9IGd1ZXNzLnNob3J0XG4gIGNvbnN0IGxvbmcgPSBndWVzcy5sb25nXG4gIGNvbnN0IGdhcCA9IGd1ZXNzLmdhcFxuXG4gIGNvbnN0IHNob3J0bCA9IHNob3J0ICogMC41XG4gIGNvbnN0IHNob3J0dSA9IHNob3J0ICogMS41XG5cbiAgY29uc3QgYml0cyA9IG5ldyBCaXRidWZmZXIoKVxuICBjb25zdCBoaW50cyA9IFtdXG5cbiAgbGV0IHggPSAwXG4gIGZvciAobGV0IGogPSAwOyBqIDwgcHVsc2VzLmxlbmd0aDsgaiArPSAyKSB7XG4gICAgY29uc3QgbSA9IHB1bHNlc1tqXSAvLyBtYXJrXG4gICAgY29uc3QgcyA9IHB1bHNlc1tqICsgMV0gLy8gc3BhY2VcbiAgICBpZiAobSA8IHNob3J0bCB8fCBtID4gc2hvcnR1KSB7XG4gICAgICBiaXRzLnB1c2hCcmVhaygpXG4gICAgICB4ICs9IG0gKyBzXG4gICAgICBjb250aW51ZVxuICAgIH1cbiAgICBsZXQgb25ldyA9IChtICogbG9uZykgLyBzaG9ydCAvLyBlc3RpbWF0ZSB0aGUgMS1iaXQgd2lkdGhcbiAgICBsZXQgenMgPSBzICsgbSAtIG9uZXcgLy8gZXN0aW1hdGUgMC1iaXRzIHdpZHRoXG4gICAgaWYgKHpzIDwgbG9uZyAvIDIpIHtcbiAgICAgIG9uZXcgPSBtICsgcyAvLyBubyAwLWJpdHNcbiAgICAgIHpzID0gMFxuICAgIH1cbiAgICBoaW50cy5wdXNoKFt4LCB4ICsgb25ldywgJzEnXSlcbiAgICBiaXRzLnB1c2hPbmUoKVxuICAgIHggKz0gb25ld1xuICAgIGlmIChnYXAgJiYgcyA+IGdhcCkge1xuICAgICAgYml0cy5wdXNoQnJlYWsoKVxuICAgICAgeCArPSB6c1xuICAgICAgY29udGludWVcbiAgICB9XG4gICAgY29uc3QgY250ID0gfn4oenMgLyBsb25nICsgMC41KVxuICAgIGZvciAobGV0IGsgPSAwOyBrIDwgY250OyArK2spIHtcbiAgICAgIGhpbnRzLnB1c2goW3ggKyAoenMgKiBrKSAvIGNudCwgeCArICh6cyAqIChrICsgMSkpIC8gY250LCAnMCddKVxuICAgICAgYml0cy5wdXNoWmVybygpXG4gICAgfVxuICAgIHggKz0genNcbiAgfVxuXG4gIHJldHVybiB7IGhpbnRzLCBiaXRzIH1cbn1cblxuLy8vIFB1bHNlLXBvc2l0aW9uIG1vZHVsYXRpb24gKFBQTSlcbi8vLyBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9QdWxzZS1wb3NpdGlvbl9tb2R1bGF0aW9uXG5leHBvcnQgZnVuY3Rpb24gc2xpY2VQUE0gKHB1bHNlcywgZ3Vlc3MpIHtcbiAgY29uc3Qgc2hvcnQgPSBndWVzcy5zaG9ydFxuICBjb25zdCBsb25nID0gZ3Vlc3MubG9uZ1xuICBjb25zdCBzeW5jID0gZ3Vlc3Muc3luY1xuICBjb25zdCBnYXAgPSBndWVzcy5nYXBcblxuICBjb25zdCBzaG9ydGwgPSBzaG9ydCAqIDAuNVxuICBjb25zdCBzaG9ydHUgPSBzaG9ydCAqIDEuNVxuICBjb25zdCBsb25nbCA9IGxvbmcgKiAwLjVcbiAgY29uc3QgbG9uZ3UgPSBsb25nICogMS41XG4gIGNvbnN0IHN5bmNsID0gc3luYyAqIDAuNVxuICBjb25zdCBzeW5jdSA9IHN5bmMgKiAxLjVcblxuICBjb25zdCBiaXRzID0gbmV3IEJpdGJ1ZmZlcigpXG4gIGNvbnN0IGhpbnRzID0gW11cblxuICBsZXQgeCA9IDBcbiAgZm9yIChsZXQgaiA9IDA7IGogPCBwdWxzZXMubGVuZ3RoOyBqICs9IDIpIHtcbiAgICBjb25zdCBtID0gcHVsc2VzW2pdIC8vIG1hcmtcbiAgICBjb25zdCBzID0gcHVsc2VzW2ogKyAxXSAvLyBzcGFjZVxuICAgIGNvbnN0IHgwID0geFxuICAgIHggKz0gbSArIHNcbiAgICBpZiAocyA+IHNob3J0bCAmJiBzIDwgc2hvcnR1KSB7XG4gICAgICBoaW50cy5wdXNoKFt4MCwgeCwgJzEnXSlcbiAgICAgIGJpdHMucHVzaE9uZSgpXG4gICAgfSBlbHNlIGlmIChzID4gbG9uZ2wgJiYgcyA8IGxvbmd1KSB7XG4gICAgICBoaW50cy5wdXNoKFt4MCwgeCwgJzAnXSlcbiAgICAgIGJpdHMucHVzaFplcm8oKVxuICAgIH0gZWxzZSBpZiAocyA+IHN5bmNsICYmIHMgPCBzeW5jdSkge1xuICAgICAgaGludHMucHVzaChbeDAsIHgsICdYJ10pXG4gICAgICBiaXRzLnB1c2hCcmVhaygpXG4gICAgfSBlbHNlIGlmIChnYXAgJiYgcyA+IGdhcCkge1xuICAgICAgYml0cy5wdXNoQnJlYWsoKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7IGhpbnRzLCBiaXRzIH1cbn1cblxuLy8vIFB1bHNlLXdpZHRoIG1vZHVsYXRpb24gKFBXTSlcbi8vLyBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9QdWxzZS13aWR0aF9tb2R1bGF0aW9uXG5leHBvcnQgZnVuY3Rpb24gc2xpY2VQV00gKHB1bHNlcywgZ3Vlc3MpIHtcbiAgY29uc3Qgc2hvcnQgPSBndWVzcy5zaG9ydFxuICBjb25zdCBsb25nID0gZ3Vlc3MubG9uZ1xuICBjb25zdCBzeW5jID0gZ3Vlc3Muc3luY1xuICBjb25zdCBnYXAgPSBndWVzcy5nYXBcblxuICBjb25zdCBzaG9ydGwgPSBzaG9ydCAqIDAuNVxuICBjb25zdCBzaG9ydHUgPSBzaG9ydCAqIDEuNVxuICBjb25zdCBsb25nbCA9IGxvbmcgKiAwLjVcbiAgY29uc3QgbG9uZ3UgPSBsb25nICogMS41XG4gIGNvbnN0IHN5bmNsID0gc3luYyAqIDAuNVxuICBjb25zdCBzeW5jdSA9IHN5bmMgKiAxLjVcblxuICBjb25zdCBiaXRzID0gbmV3IEJpdGJ1ZmZlcigpXG4gIGNvbnN0IGhpbnRzID0gW11cblxuICBsZXQgeCA9IDBcbiAgZm9yIChsZXQgaiA9IDA7IGogPCBwdWxzZXMubGVuZ3RoOyBqICs9IDIpIHtcbiAgICBjb25zdCBtID0gcHVsc2VzW2pdIC8vIG1hcmtcbiAgICBjb25zdCBzID0gcHVsc2VzW2ogKyAxXSAvLyBzcGFjZVxuXG4gICAgY29uc3QgeDAgPSB4XG4gICAgbGV0IHgxID0geCArIG0gKyBzXG4gICAgLy8gYnJlYWsgb24gZ2Fwc1xuICAgIGlmIChzID4gZ2FwKSB7XG4gICAgICB4MSA9IHggKyBtICsgZ2FwXG4gICAgfVxuICAgIHggKz0gbSArIHNcblxuICAgIGlmIChtID4gc2hvcnRsICYmIG0gPCBzaG9ydHUpIHtcbiAgICAgIGhpbnRzLnB1c2goW3gwLCB4MSwgJzEnXSlcbiAgICAgIGJpdHMucHVzaE9uZSgpXG4gICAgfSBlbHNlIGlmIChtID4gbG9uZ2wgJiYgbSA8IGxvbmd1KSB7XG4gICAgICBoaW50cy5wdXNoKFt4MCwgeDEsICcwJ10pXG4gICAgICBiaXRzLnB1c2haZXJvKClcbiAgICB9IGVsc2UgaWYgKG0gPiBzeW5jbCAmJiBtIDwgc3luY3UpIHtcbiAgICAgIGhpbnRzLnB1c2goW3gwLCB4MSwgJ1gnXSlcbiAgICAgIGJpdHMucHVzaEJyZWFrKClcbiAgICB9XG4gICAgaWYgKGdhcCAmJiBzID4gZ2FwKSB7XG4gICAgICBiaXRzLnB1c2hCcmVhaygpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHsgaGludHMsIGJpdHMgfVxufVxuXG4vLy8gZ2V0IE1hbmNoZXN0ZXIgYWxpZ25tZW50LCAxIGlmIHdlIGFyZSBhdCB0aGUgc3RhcnQgb2YgYSBiaXQsIDAgaWYgd2UgYXJlIGluIHRoZSBtaWRkbGVcbmZ1bmN0aW9uIG1hbmNoZXN0ZXJBbGlnbmVkIChwdWxzZXMsIG9mZnNldCwgc2hvcnQpIHtcbiAgZm9yIChsZXQgaiA9IG9mZnNldDsgaiA8IHB1bHNlcy5sZW5ndGg7IGogKz0gMikge1xuICAgIGNvbnN0IG13ID0gcHVsc2VzW2pdIC8vIG1hcmtcbiAgICBjb25zdCBjdyA9IH5+KG13IC8gc2hvcnQgKyAwLjUpXG4gICAgaWYgKGN3ID4gMSkgcmV0dXJuIDAgLy8gbWlkZGxlXG4gICAgY29uc3Qgc3cgPSBwdWxzZXNbaiArIDFdIC8vIHNwYWNlXG4gICAgY29uc3Qgc2MgPSB+fihzdyAvIHNob3J0ICsgMC41KVxuICAgIGlmIChzYyA+IDEpIHJldHVybiAxIC8vIHN0YXJ0XG4gIH1cbiAgLy8gd2FybmluZywgbm8gYWxpZ25tZW50IGZvdW5kXG4gIHJldHVybiAwXG59XG5cbi8vLyBNYW5jaGVzdGVyIGNvZGUgKE1DKVxuLy8vIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL01hbmNoZXN0ZXJfY29kZVxuZXhwb3J0IGZ1bmN0aW9uIHNsaWNlTUMgKHB1bHNlcywgZ3Vlc3MpIHtcbiAgY29uc3Qgc2hvcnQgPSBndWVzcy5zaG9ydFxuICBjb25zdCBiaXRzID0gbmV3IEJpdGJ1ZmZlcigpXG4gIGNvbnN0IGhpbnRzID0gW11cblxuICAvLyBNYW5jaGVzdGVyIGFsaWduIHN0cmluZyBieSBmaW5kaW5nIHRoZSBwb3NpdGlvbiBvZiB0aGUgZmlyc3QgbG9uZyBwdWxzZSBvciBnYXBcbiAgbGV0IGFsaWduZWQgPSBtYW5jaGVzdGVyQWxpZ25lZChwdWxzZXMsIDAsIHNob3J0KVxuXG4gIGxldCB4ID0gMFxuICBsZXQgeDEgPSAwXG4gIGZvciAobGV0IGogPSAwOyBqIDwgcHVsc2VzLmxlbmd0aDsgaiArPSAyKSB7XG4gICAgY29uc3QgbWFyayA9IHB1bHNlc1tqXSAvLyBtYXJrXG4gICAgY29uc3QgbWNudCA9IH5+KG1hcmsgLyBzaG9ydCArIDAuNSlcbiAgICBjb25zdCBzcGFjZSA9IHB1bHNlc1tqICsgMV0gLy8gc3BhY2VcbiAgICBjb25zdCBzY250ID0gfn4oc3BhY2UgLyBzaG9ydCArIDAuNSlcblxuICAgIGlmIChtY250ID09PSAxKSB7XG4gICAgICBpZiAoIWFsaWduZWQpIHtcbiAgICAgICAgaGludHMucHVzaChbeDEsIHggKyBtYXJrLCAnMCddKVxuICAgICAgICBiaXRzLnB1c2haZXJvKClcbiAgICAgICAgeDEgPSB4ICsgbWFya1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gYWxpZ25lZFxuICAgICAgICB4MSA9IHhcbiAgICAgIH1cbiAgICAgIGFsaWduZWQgPSAhYWxpZ25lZFxuICAgIH0gZWxzZSBpZiAobWNudCA9PT0gMikge1xuICAgICAgaWYgKCFhbGlnbmVkKSB7XG4gICAgICAgIGhpbnRzLnB1c2goW3gxLCB4ICsgbWFyayAvIDIsICcwJ10pXG4gICAgICAgIGJpdHMucHVzaFplcm8oKVxuICAgICAgICB4MSA9IHggKyBtYXJrIC8gMlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gYWxpZ25lZFxuICAgICAgICAvLyBlcnJvclxuICAgICAgICBiaXRzLnB1c2hCcmVhaygpXG4gICAgICAgIHgxID0geCArIG1hcmsgLyAyXG4gICAgICB9XG4gICAgICBhbGlnbmVkID0gZmFsc2VcbiAgICB9IGVsc2UgaWYgKG1jbnQgPiAyKSB7XG4gICAgICBpZiAoIWFsaWduZWQpIHtcbiAgICAgICAgaGludHMucHVzaChbeDEsIHggKyBtYXJrIC8gbWNudCwgJzAnXSlcbiAgICAgICAgYml0cy5wdXNoWmVybygpXG4gICAgICAgIHgxID0geCArIG1hcmsgLSBtYXJrIC8gbWNudFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gYWxpZ25lZFxuICAgICAgICAvLyBlcnJvclxuICAgICAgICB4MSA9IHggKyBtYXJrIC0gbWFyayAvIG1jbnRcbiAgICAgIH1cbiAgICAgIGJpdHMucHVzaEJyZWFrKClcbiAgICAgIGFsaWduZWQgPSBtYW5jaGVzdGVyQWxpZ25lZChwdWxzZXMsIGogKyAxLCBzaG9ydClcbiAgICB9XG5cbiAgICBpZiAoc2NudCA9PT0gMSkge1xuICAgICAgaWYgKCFhbGlnbmVkKSB7XG4gICAgICAgIGhpbnRzLnB1c2goW3gxLCB4ICsgbWFyayArIHNwYWNlLCAnMSddKVxuICAgICAgICBiaXRzLnB1c2hPbmUoKVxuICAgICAgICB4MSA9IHggKyBtYXJrICsgc3BhY2VcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGFsaWduZWRcbiAgICAgICAgeDEgPSB4ICsgbWFya1xuICAgICAgfVxuICAgICAgYWxpZ25lZCA9ICFhbGlnbmVkXG4gICAgfSBlbHNlIGlmIChzY250ID09PSAyKSB7XG4gICAgICBpZiAoIWFsaWduZWQpIHtcbiAgICAgICAgaGludHMucHVzaChbeDEsIHggKyBtYXJrICsgc3BhY2UgLyAyLCAnMSddKVxuICAgICAgICBiaXRzLnB1c2hPbmUoKVxuICAgICAgICB4MSA9IHggKyBtYXJrICsgc3BhY2UgLyAyXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBhbGlnbmVkXG4gICAgICAgIC8vIGVycm9yXG4gICAgICAgIGJpdHMucHVzaEJyZWFrKClcbiAgICAgICAgeDEgPSB4ICsgbWFyayArIHNwYWNlIC8gMlxuICAgICAgfVxuICAgICAgYWxpZ25lZCA9IGZhbHNlXG4gICAgfSBlbHNlIGlmIChzY250ID4gMikge1xuICAgICAgaWYgKCFhbGlnbmVkKSB7XG4gICAgICAgIGhpbnRzLnB1c2goW3gxLCB4ICsgbWFyayArIHNwYWNlIC8gc2NudCwgJzEnXSlcbiAgICAgICAgYml0cy5wdXNoT25lKClcbiAgICAgICAgeDEgPSB4ICsgbWFyayArIHNwYWNlIC0gc3BhY2UgLyBzY250XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBhbGlnbmVkXG4gICAgICAgIC8vIGVycm9yXG4gICAgICAgIHgxID0geCArIG1hcmsgKyBzcGFjZSAtIHNwYWNlIC8gc2NudFxuICAgICAgfVxuICAgICAgYml0cy5wdXNoQnJlYWsoKVxuICAgICAgYWxpZ25lZCA9IG1hbmNoZXN0ZXJBbGlnbmVkKHB1bHNlcywgaiArIDEsIHNob3J0KVxuICAgIH1cblxuICAgIHggKz0gbWFyayArIHNwYWNlXG4gIH1cblxuICByZXR1cm4geyBoaW50cywgYml0cyB9XG59XG5cbi8vLyBEaWZmZXJlbnRpYWwgTWFuY2hlc3RlciBFbmNvZGluZyAoRE0pIGFrYSBCaXBoYXNlIE1hcmsgQ29kZSAoQ0MpXG4vLy8gaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvRGlmZmVyZW50aWFsX01hbmNoZXN0ZXJfZW5jb2RpbmdcbmV4cG9ydCBmdW5jdGlvbiBzbGljZURNIChwdWxzZXMsIGd1ZXNzKSB7XG4gIGNvbnN0IHNob3J0ID0gZ3Vlc3Muc2hvcnRcbiAgY29uc3QgYml0cyA9IG5ldyBCaXRidWZmZXIoKVxuICBjb25zdCBoaW50cyA9IFtdXG5cbiAgbGV0IHggPSAwXG4gIGxldCB4MSA9IG51bGxcbiAgZm9yIChsZXQgaiA9IDA7IGogPCBwdWxzZXMubGVuZ3RoOyBqICs9IDIpIHtcbiAgICBjb25zdCBtYXJrID0gcHVsc2VzW2pdIC8vIG1hcmtcbiAgICBjb25zdCBtY250ID0gfn4obWFyayAvIHNob3J0ICsgMC41KVxuICAgIGNvbnN0IHNwYWNlID0gcHVsc2VzW2ogKyAxXSAvLyBzcGFjZVxuICAgIGNvbnN0IHNjbnQgPSB+fihzcGFjZSAvIHNob3J0ICsgMC41KVxuXG4gICAgaWYgKCF4MSAmJiBtY250ID09PSAxICYmIHNjbnQgPT09IDEpIHtcbiAgICAgIGhpbnRzLnB1c2goW3gsIHggKyBtYXJrICsgc3BhY2UsICcwJ10pXG4gICAgICBiaXRzLnB1c2haZXJvKClcbiAgICB9IGVsc2UgaWYgKG1jbnQgPT09IDEgJiYgc2NudCA9PT0gMSkge1xuICAgICAgaGludHMucHVzaChbeDEsIHggKyBtYXJrLCAnMCddKVxuICAgICAgYml0cy5wdXNoWmVybygpXG4gICAgICB4MSA9IHggKyBtYXJrXG4gICAgfSBlbHNlIGlmICh4MSAmJiBtY250ID09PSAxICYmIHNjbnQgPT09IDIpIHtcbiAgICAgIGhpbnRzLnB1c2goW3gxLCB4ICsgbWFyaywgJzAnXSlcbiAgICAgIGJpdHMucHVzaFplcm8oKVxuICAgICAgaGludHMucHVzaChbeCArIG1hcmssIHggKyBtYXJrICsgc3BhY2UsICcxJ10pXG4gICAgICBiaXRzLnB1c2hPbmUoKVxuICAgICAgeDEgPSBudWxsXG4gICAgfSBlbHNlIGlmIChtY250ID09PSAyICYmIHNjbnQgPT09IDEpIHtcbiAgICAgIGhpbnRzLnB1c2goW3gsIHggKyBtYXJrLCAnMSddKVxuICAgICAgYml0cy5wdXNoT25lKClcbiAgICAgIHgxID0geCArIG1hcmtcbiAgICB9IGVsc2UgaWYgKG1jbnQgPT09IDIgJiYgc2NudCA9PT0gMikge1xuICAgICAgaGludHMucHVzaChbeCwgeCArIG1hcmssICcxJ10pXG4gICAgICBiaXRzLnB1c2hPbmUoKVxuICAgICAgaGludHMucHVzaChbeCArIG1hcmssIHggKyBtYXJrICsgc3BhY2UsICcxJ10pXG4gICAgICBiaXRzLnB1c2hPbmUoKVxuICAgIH0gZWxzZSBpZiAoIXgxICYmIG1jbnQgPT09IDEpIHtcbiAgICAgIC8vIGVycm9yXG4gICAgICBoaW50cy5wdXNoKFt4LCB4ICsgbWFyayArIHNob3J0LCAnMCddKVxuICAgICAgYml0cy5wdXNoWmVybygpXG4gICAgICBiaXRzLnB1c2hCcmVhaygpXG4gICAgfSBlbHNlIGlmICgheDEgJiYgbWNudCA9PT0gMikge1xuICAgICAgLy8gZXJyb3JcbiAgICAgIGhpbnRzLnB1c2goW3gsIHggKyBtYXJrLCAnMSddKVxuICAgICAgYml0cy5wdXNoT25lKClcbiAgICAgIGJpdHMucHVzaEJyZWFrKClcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZXJyb3IgKCF4MSAmJiBtY250ID09PSAxICYmIHNjbnQgPT09IDIpXG4gICAgICBpZiAoeDEpIHtcbiAgICAgICAgaGludHMucHVzaChbeDEsIHgxICsgc2hvcnQgKiAyLCAnMCddKVxuICAgICAgICBiaXRzLnB1c2haZXJvKClcbiAgICAgIH1cbiAgICAgIHgxID0gbnVsbFxuICAgICAgYml0cy5wdXNoQnJlYWsoKVxuICAgIH1cbiAgICB4ICs9IG1hcmsgKyBzcGFjZVxuICB9XG5cbiAgcmV0dXJuIHsgaGludHMsIGJpdHMgfVxufVxuXG4vLy8gTm9uLXJldHVybi10by16ZXJvLCBpbnZlcnRlZCAoTlJaSSkgaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTm9uLXJldHVybi10by16ZXJvI05SWklcbi8vLyBOUlooSSkgTlJaSSBOb24tcmV0dXJuLXRvLXplcm8gaW52ZXJ0ZWQgUmVmZXJzIHRvIGVpdGhlciBhbiBOUlooTSkgb3IgTlJaKFMpIGNvZGUuXG4vLy8gTlJaKE0pIE5SWk0gTm9uLXJldHVybi10by16ZXJvIG1hcmsgU2VyaWFsaXplciBtYXBwaW5nIHswOiBjb25zdGFudCwgMTogdG9nZ2xlfS5cbi8vLyBOUlooUykgTlJaUyBOb24tcmV0dXJuLXRvLXplcm8gc3BhY2UgU2VyaWFsaXplciBtYXBwaW5nIHswOiB0b2dnbGUsIDE6IGNvbnN0YW50fS5cbi8vLyBBIDEgaXMgdHJhbnNtaXR0ZWQgYXMgYSB0cmFuc2l0aW9uLCBhbmQgYSAwIGlzIHRyYW5zbWl0dGVkIGFzIG5vIHRyYW5zaXRpb24uXG5leHBvcnQgZnVuY3Rpb24gc2xpY2VOUlpJIChwdWxzZXMsIGd1ZXNzKSB7XG4gIGNvbnN0IHNob3J0ID0gZ3Vlc3Muc2hvcnRcbiAgY29uc3QgYml0cyA9IG5ldyBCaXRidWZmZXIoKVxuICBjb25zdCBoaW50cyA9IFtdXG5cbiAgbGV0IHggPSAwXG4gIGxldCB4MSA9IDBcbiAgZm9yIChsZXQgaiA9IDA7IGogPCBwdWxzZXMubGVuZ3RoOyBqICs9IDEpIHtcbiAgICBjb25zdCB3ID0gcHVsc2VzW2pdIC8vIG1hcmsgb3Igc3BhY2VcbiAgICBjb25zdCBjbnQgPSB+fih3IC8gc2hvcnQgKyAwLjUpXG4gICAgLy8gZXZlcnkgZWRnZSBpcyBhIDEsIGRvbid0IHVzZSB0aGUgZmlyc3QgZWRnZVxuICAgIGlmICh4MSkge1xuICAgICAgaGludHMucHVzaChbeDEsIHggKyBzaG9ydCAvIDIsICcxJ10pXG4gICAgICBiaXRzLnB1c2hPbmUoKVxuICAgIH1cbiAgICB4MSA9IHggKyBzaG9ydCAvIDJcbiAgICAvLyBjb3VudCBtaW51cyBvbmUgYW1vdW50cyBvZiAwXG4gICAgZm9yIChsZXQgayA9IDE7IGsgPCBjbnQ7ICsraykge1xuICAgICAgaGludHMucHVzaChbeDEsIHgxICsgdyAvIGNudCwgJzAnXSlcbiAgICAgIGJpdHMucHVzaFplcm8oKVxuICAgICAgeDEgKz0gdyAvIGNudFxuICAgIH1cbiAgICB4ICs9IHdcbiAgfVxuXG4gIHJldHVybiB7IGhpbnRzLCBiaXRzIH1cbn1cblxuLy8vIENvZGVkIE1hcmsgSW52ZXJzaW9uIChDTUkpIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0NvZGVkX21hcmtfaW52ZXJzaW9uXG4vLy8gZW5jb2RlcyB6ZXJvIGJpdHMgYXMgYSBoYWxmIGJpdCB0aW1lIG9mIHplcm8gZm9sbG93ZWQgYnkgYSBoYWxmIGJpdCB0aW1lIG9mIG9uZSxcbi8vLyBhbmQgb25lIGJpdHMgYXJlIGVuY29kZWQgYXMgYSBmdWxsIGJpdCB0aW1lIG9mIGEgY29uc3RhbnQgbGV2ZWwsXG4vLy8gdGhlIGxldmVsIHVzZWQgZm9yIG9uZSBiaXRzIGFsdGVybmF0ZXMgZWFjaCB0aW1lIG9uZSBpcyBjb2RlZC5cbmV4cG9ydCBmdW5jdGlvbiBzbGljZUNNSSAocHVsc2VzLCBndWVzcykge1xuICBjb25zdCBzaG9ydCA9IGd1ZXNzLnNob3J0XG4gIGNvbnN0IGJpdHMgPSBuZXcgQml0YnVmZmVyKClcbiAgY29uc3QgaGludHMgPSBbXVxuXG4gIGxldCB4ID0gMFxuICBsZXQgeDEgPSBudWxsXG4gIGZvciAobGV0IGogPSAwOyBqIDwgcHVsc2VzLmxlbmd0aDsgaiArPSAyKSB7XG4gICAgY29uc3QgbWFyayA9IHB1bHNlc1tqXSAvLyBtYXJrXG4gICAgY29uc3QgbWNudCA9IH5+KG1hcmsgLyBzaG9ydCArIDAuNSlcbiAgICBjb25zdCBzcGFjZSA9IHB1bHNlc1tqICsgMV0gLy8gc3BhY2VcbiAgICBjb25zdCBzY250ID0gfn4oc3BhY2UgLyBzaG9ydCArIDAuNSlcblxuICAgIGlmIChtY250ID09PSAxICYmIHNjbnQgPT09IDEpIHtcbiAgICAgIGlmICgheDEpIHgxID0geCAtIG1hcmsgLy8gZmlyc3QgYml0XG4gICAgICBoaW50cy5wdXNoKFt4MSwgeCArIG1hcmssICcwJ10pXG4gICAgICBiaXRzLnB1c2haZXJvKClcbiAgICAgIHgxID0geCArIG1hcmtcbiAgICB9IGVsc2UgaWYgKG1jbnQgPT09IDEgJiYgc2NudCA9PT0gMikge1xuICAgICAgaWYgKCF4MSkgeDEgPSB4IC0gbWFyayAvLyBmaXJzdCBiaXRcbiAgICAgIGhpbnRzLnB1c2goW3gxLCB4ICsgbWFyaywgJzAnXSlcbiAgICAgIGJpdHMucHVzaFplcm8oKVxuICAgICAgeDEgPSB4ICsgbWFyayArIHNwYWNlXG4gICAgICBoaW50cy5wdXNoKFt4ICsgbWFyaywgeDEsICcxJ10pXG4gICAgICBiaXRzLnB1c2hPbmUoKVxuICAgIH0gZWxzZSBpZiAobWNudCA9PT0gMSAmJiBzY250ID09PSAzKSB7XG4gICAgICBpZiAoIXgxKSB4MSA9IHggLSBtYXJrIC8vIGZpcnN0IGJpdFxuICAgICAgaGludHMucHVzaChbeDEsIHggKyBtYXJrLCAnMCddKVxuICAgICAgYml0cy5wdXNoWmVybygpXG4gICAgICB4MSA9IHggKyBtYXJrICsgKHNwYWNlICogMikgLyAzXG4gICAgICBoaW50cy5wdXNoKFt4ICsgbWFyaywgeDEsICcxJ10pXG4gICAgICBiaXRzLnB1c2hPbmUoKVxuICAgIH0gZWxzZSBpZiAobWNudCA9PT0gMiAmJiBzY250ID09PSAxKSB7XG4gICAgICBoaW50cy5wdXNoKFt4MSwgeCArIG1hcmssICcxJ10pXG4gICAgICBiaXRzLnB1c2hPbmUoKVxuICAgICAgeDEgPSB4ICsgbWFya1xuICAgIH0gZWxzZSBpZiAobWNudCA9PT0gMiAmJiBzY250ID09PSAyKSB7XG4gICAgICBoaW50cy5wdXNoKFt4MSwgeCArIG1hcmssICcxJ10pXG4gICAgICBiaXRzLnB1c2hPbmUoKVxuICAgICAgeDEgPSB4ICsgbWFyayArIHNwYWNlXG4gICAgICBoaW50cy5wdXNoKFt4ICsgbWFyaywgeDEsICcxJ10pXG4gICAgICBiaXRzLnB1c2hPbmUoKVxuICAgIH0gZWxzZSBpZiAobWNudCA9PT0gMiAmJiBzY250ID09PSAzKSB7XG4gICAgICBoaW50cy5wdXNoKFt4MSwgeCArIG1hcmssICcxJ10pXG4gICAgICBiaXRzLnB1c2hPbmUoKVxuICAgICAgeDEgPSB4ICsgbWFyayArIChzcGFjZSAqIDIpIC8gM1xuICAgICAgaGludHMucHVzaChbeCArIG1hcmssIHgxLCAnMSddKVxuICAgICAgYml0cy5wdXNoT25lKClcbiAgICB9IGVsc2UgaWYgKG1jbnQgPT09IDMgJiYgc2NudCA9PT0gMSkge1xuICAgICAgaGludHMucHVzaChbeDEsIHggKyBtYXJrIC8gMywgJzAnXSlcbiAgICAgIGJpdHMucHVzaFplcm8oKVxuICAgICAgaGludHMucHVzaChbeCArIG1hcmsgLyAzLCB4ICsgbWFyaywgJzEnXSlcbiAgICAgIGJpdHMucHVzaE9uZSgpXG4gICAgICB4MSA9IHggKyBtYXJrXG4gICAgfSBlbHNlIGlmIChtY250ID09PSAzICYmIHNjbnQgPT09IDIpIHtcbiAgICAgIGhpbnRzLnB1c2goW3gxLCB4ICsgbWFyayAvIDMsICcwJ10pXG4gICAgICBiaXRzLnB1c2haZXJvKClcbiAgICAgIGhpbnRzLnB1c2goW3ggKyBtYXJrIC8gMywgeCArIG1hcmssICcxJ10pXG4gICAgICBiaXRzLnB1c2hPbmUoKVxuICAgICAgeDEgPSB4ICsgbWFyayArIHNwYWNlXG4gICAgICBoaW50cy5wdXNoKFt4ICsgbWFyaywgeDEsICcxJ10pXG4gICAgICBiaXRzLnB1c2hPbmUoKVxuICAgIH0gZWxzZSBpZiAobWNudCA9PT0gMyAmJiBzY250ID09PSAzKSB7XG4gICAgICBoaW50cy5wdXNoKFt4MSwgeCArIG1hcmsgLyAzLCAnMCddKVxuICAgICAgYml0cy5wdXNoWmVybygpXG4gICAgICBoaW50cy5wdXNoKFt4LCB4ICsgbWFyayAvIDMsICcxJ10pXG4gICAgICBiaXRzLnB1c2hPbmUoKVxuICAgICAgaGludHMucHVzaChbeCArIG1hcmsgLyAzLCB4ICsgbWFyaywgJzEnXSlcbiAgICAgIGJpdHMucHVzaE9uZSgpXG4gICAgICBoaW50cy5wdXNoKFt4ICsgbWFyaywgeCArIG1hcmsgKyAoc3BhY2UgKiAzKSAvIDIsICcxJ10pXG4gICAgICBiaXRzLnB1c2hPbmUoKVxuICAgICAgeDEgPSB4ICsgbWFyayArIChzcGFjZSAqIDMpIC8gMlxuICAgIH0gZWxzZSBpZiAobWNudCA9PT0gMSkge1xuICAgICAgLy8gbGFzdCB6ZXJvXG4gICAgICBoaW50cy5wdXNoKFt4MSwgeCArIG1hcmssICcwJ10pXG4gICAgICBiaXRzLnB1c2haZXJvKClcbiAgICAgIGJpdHMucHVzaEJyZWFrKClcbiAgICAgIHgxID0geCArIG1hcmtcbiAgICB9IGVsc2UgaWYgKG1jbnQgPT09IDIpIHtcbiAgICAgIC8vIGxhc3Qgb25lXG4gICAgICBoaW50cy5wdXNoKFt4MSwgeCArIG1hcmssICcxJ10pXG4gICAgICBiaXRzLnB1c2hPbmUoKVxuICAgICAgYml0cy5wdXNoQnJlYWsoKVxuICAgICAgeDEgPSB4ICsgbWFya1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBlcnJvclxuICAgICAgYml0cy5wdXNoQnJlYWsoKVxuICAgIH1cbiAgICB4ICs9IG1hcmsgKyBzcGFjZVxuICB9XG5cbiAgcmV0dXJuIHsgaGludHMsIGJpdHMgfVxufVxuXG4vLy8gUHVsc2UtSW50ZXJ2YWwtV2lkdGggTW9kdWxhdGlvbiAoUElXTSlcbi8vLyBFeG90aWMgZGlmZmVyZW50aWFsIGNvZGluZ1xuZXhwb3J0IGZ1bmN0aW9uIHNsaWNlUElXTSAocHVsc2VzLCBndWVzcykge1xuICBjb25zdCBzaG9ydCA9IGd1ZXNzLnNob3J0XG4gIGNvbnN0IGJpdHMgPSBuZXcgQml0YnVmZmVyKClcbiAgY29uc3QgaGludHMgPSBbXVxuXG4gIGxldCB4ID0gMFxuICBmb3IgKGxldCBqID0gMDsgaiA8IHB1bHNlcy5sZW5ndGg7IGogKz0gMSkge1xuICAgIGNvbnN0IHcgPSBwdWxzZXNbal0gLy8gbWFyayBvciBzcGFjZVxuICAgIGNvbnN0IGNudCA9IH5+KHcgLyBzaG9ydCArIDAuNSlcblxuICAgIGlmIChjbnQgPT09IDEpIHtcbiAgICAgIGhpbnRzLnB1c2goW3gsIHggKyB3LCAnMSddKVxuICAgICAgYml0cy5wdXNoT25lKClcbiAgICB9IGVsc2UgaWYgKGNudCA9PT0gMikge1xuICAgICAgaGludHMucHVzaChbeCwgeCArIHcsICcwJ10pXG4gICAgICBiaXRzLnB1c2haZXJvKClcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZXJyb3JcbiAgICAgIGJpdHMucHVzaEJyZWFrKClcbiAgICB9XG4gICAgeCArPSB3XG4gIH1cblxuICByZXR1cm4geyBoaW50cywgYml0cyB9XG59XG4iLCJjb25zdCBzZWxlY3RvciA9IChlbGVtZW50T3JTZWxlY3RvcikgPT4ge1xuICBpZiAoIWVsZW1lbnRPclNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIGlmICh0eXBlb2YgZWxlbWVudE9yU2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWxlbWVudE9yU2VsZWN0b3IpXG4gIH1cblxuICByZXR1cm4gZWxlbWVudE9yU2VsZWN0b3Jcbn1cblxuY29uc3QgZ2V0Qm91bmRhcmllcyA9IChkYXRhLCB3aWR0aCwgdHJhbnNmb3JtKSA9PiB7XG4gIC8vIGNvbnN0IG1pbkxlZnRTaWRlID0gMFxuICBjb25zdCBtYXhSaWdodFNpZGUgPSB3aWR0aCAqIHRyYW5zZm9ybS5rXG4gIGNvbnN0IHB1bHNlSW5PbmVYID0gZGF0YS53aWR0aCAvIG1heFJpZ2h0U2lkZVxuICBjb25zdCBsZWZ0U2lkZSA9IH5+KHRyYW5zZm9ybS54ICogLTEpXG4gIGNvbnN0IHJpZ2h0U2lkZSA9IH5+KHRyYW5zZm9ybS54ICogLTEgKyB3aWR0aClcbiAgLy8gY29uc3QgcHVsc2VSYXRlID0gZGF0YS53aWR0aCAvIHRyYW5zZm9ybS5rXG4gIGNvbnN0IGxlZnRQdWxzZSA9IGxlZnRTaWRlICogcHVsc2VJbk9uZVhcbiAgY29uc3QgcmlnaHRQdWxzZSA9IHJpZ2h0U2lkZSAqIHB1bHNlSW5PbmVYXG5cbiAgcmV0dXJuIHsgbGVmdFB1bHNlLCByaWdodFB1bHNlLCBwdWxzZUluT25lWCB9XG59XG5cbmNvbnN0IGNvbWJpbmluZ1B1bHNlcyA9IChkYXRhLCBwdWxzZUluT25lWCkgPT4ge1xuICBjb25zdCBwdWxzZXMgPSBbXVxuICBsZXQgcHJldlggPSAwXG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLnB1bHNlcy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChpICUgMiAhPT0gMCkge1xuICAgICAgaWYgKGRhdGEucHVsc2VzW2ldID49IHB1bHNlSW5PbmVYICogMTApIHtcbiAgICAgICAgcHVsc2VzLnB1c2gocHJldlgpXG4gICAgICAgIHB1bHNlcy5wdXNoKGRhdGEucHVsc2VzW2ldKVxuICAgICAgICBwcmV2WCA9IDBcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwcmV2WCArPSBkYXRhLnB1bHNlc1tpXVxuICB9XG5cbiAgaWYgKHByZXZYICE9PSAwKSB7XG4gICAgcHVsc2VzLnB1c2gocHJldlgpXG4gIH1cblxuICByZXR1cm4gcHVsc2VzXG59XG5cbmNvbnN0IGZpbHRlclB1bHNlcyA9IChkYXRhLCBzdW0sIHByZXZYLCBza2lwUHVsc2UsIGxlZnRQdWxzZSwgcmlnaHRQdWxzZSkgPT4ge1xuICBjb25zdCBwdWxzZXMgPSBkYXRhLmZpbHRlcigoZCkgPT4ge1xuICAgIGNvbnN0IG1pblggPSBzdW1cbiAgICBzdW0gKz0gZFxuICAgIGNvbnN0IG1heFggPSBzdW1cbiAgICBpZiAobWF4WCA+PSBsZWZ0UHVsc2UgJiYgbWluWCA8PSByaWdodFB1bHNlKSByZXR1cm4gdHJ1ZVxuICAgIGlmIChtaW5YIDwgbGVmdFB1bHNlKSB7XG4gICAgICBwcmV2WCArPSBkXG4gICAgICBza2lwUHVsc2UgKz0gMVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfSlcblxuICByZXR1cm4geyBwdWxzZXMsIHN1bSwgcHJldlgsIHNraXBQdWxzZSB9XG59XG5cbmNvbnN0IGRyYXdGaWxsID0gKGNvbnRleHQsIHgsIHksIHdpZHRoLCBoZWlnaHQsIGNvbG9yKSA9PiB7XG4gIGNvbnRleHQuYmVnaW5QYXRoKClcbiAgY29udGV4dC5maWxsU3R5bGUgPSBjb2xvclxuICBjb250ZXh0LmZpbGxSZWN0KHgsIHksIHdpZHRoLCBoZWlnaHQpXG4gIGNvbnRleHQuY2xvc2VQYXRoKClcbn1cblxuY29uc3QgZHJhd0xpbmUgPSAoY29udGV4dCwgY29vcmRpbmF0ZXMsIG9wdGlvbnMpID0+IHtcbiAgY29udGV4dC5iZWdpblBhdGgoKVxuICBjb250ZXh0LmxpbmVXaWR0aCA9IG9wdGlvbnMubGluZVdpZHRoXG4gIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBvcHRpb25zLnN0cm9rZVN0eWxlXG4gIGNvbnRleHQubW92ZVRvKC4uLmNvb3JkaW5hdGVzLnN0YXJ0KVxuICBjb250ZXh0LmxpbmVUbyguLi5jb29yZGluYXRlcy5lbmQpXG4gIGNvbnRleHQuc3Ryb2tlKClcbiAgY29udGV4dC5jbG9zZVBhdGgoKVxufVxuXG5jb25zdCBkcmF3VGV4dCA9IChjb250ZXh0LCB0ZXh0LCB4LCB5LCBvcHRpb25zKSA9PiB7XG4gIGNvbnRleHQuYmVnaW5QYXRoKClcbiAgY29udGV4dC5maWxsU3R5bGUgPSBvcHRpb25zLmNvbG9yXG4gIGNvbnRleHQuZm9udCA9IG9wdGlvbnMuZm9udFxuICBjb250ZXh0LnRleHRBbGlnbiA9IG9wdGlvbnMuYWxpZ25cbiAgY29udGV4dC50ZXh0QmFzZWxpbmUgPSBvcHRpb25zLmJhc2VsaW5lXG4gIGNvbnRleHQuZmlsbFRleHQodGV4dCwgeCwgeSlcbiAgY29udGV4dC5jbG9zZVBhdGgoKVxufVxuXG5jb25zdCBkcmF3SGludCA9IChjb250ZXh0LCB4LCBoZWlnaHQsIG9wdGlvbnMpID0+IHtcbiAgY29udGV4dC5saW5lV2lkdGggPSBvcHRpb25zLmhpbnRMaW5lXG4gIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBvcHRpb25zLmhpbnRTdHJva2VcbiAgY29udGV4dC5zZXRMaW5lRGFzaChvcHRpb25zLmhpbnREYXNoKVxuICBjb250ZXh0LmJlZ2luUGF0aCgpXG4gIGNvbnRleHQubW92ZVRvKHgsIDApXG4gIGNvbnRleHQubGluZVRvKHgsIGhlaWdodClcbiAgY29udGV4dC5zdHJva2UoKVxuICBjb250ZXh0LnNldExpbmVEYXNoKFtdKVxufVxuXG5leHBvcnQge1xuICBzZWxlY3RvcixcbiAgZ2V0Qm91bmRhcmllcyxcbiAgY29tYmluaW5nUHVsc2VzLFxuICBmaWx0ZXJQdWxzZXMsXG4gIGRyYXdGaWxsLFxuICBkcmF3TGluZSxcbiAgZHJhd1RleHQsXG4gIGRyYXdIaW50XG59XG4iLCIvKipcbiAgICBAZmlsZSBIZXhidWZmZXIgSlMuXG5cbiAgICBAYXV0aG9yIENocmlzdGlhbiBXLiBadWNrc2Nod2VyZHQgPHphbnlAdHJpcS5uZXQ+XG4gICAgQGNvcHlyaWdodCBDaHJpc3RpYW4gVy4gWnVja3NjaHdlcmR0LCAyMDIwXG4gICAgQGxpY2Vuc2VcbiAgICBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICAgIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gICAgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMiBvZiB0aGUgTGljZW5zZSwgb3JcbiAgICAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuKi9cblxuZnVuY3Rpb24gZGVjMmhleCAoaSwgdyA9IDIpIHtcbiAgcmV0dXJuIChpICsgMHgxMDAwMCkudG9TdHJpbmcoMTYpLnN1YnN0cigtdykudG9VcHBlckNhc2UoKS5yZXBsYWNlQWxsKCcuJywgJycpXG59XG5cbmV4cG9ydCBjbGFzcyBIZXhidWZmZXIge1xuICBjb25zdHJ1Y3RvciAobGluZSA9ICcnKSB7XG4gICAgdGhpcy5mcm9tU3RyaW5nKGxpbmUpXG4gIH1cblxuICBmcm9tU3RyaW5nIChzKSB7XG4gICAgdGhpcy5saW5lID0gcy5yZXBsYWNlKC9cXHMvZywgJycpXG4gICAgdGhpcy5pbmRleCA9IDBcbiAgfVxuXG4gIGhhc05pYmJsZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5kZXggKyAxIDw9IHRoaXMubGluZS5sZW5ndGhcbiAgfVxuXG4gIGhhc0J5dGUgKCkge1xuICAgIHJldHVybiB0aGlzLmluZGV4ICsgMiA8PSB0aGlzLmxpbmUubGVuZ3RoXG4gIH1cblxuICBoYXNXb3JkICgpIHtcbiAgICByZXR1cm4gdGhpcy5pbmRleCArIDQgPD0gdGhpcy5saW5lLmxlbmd0aFxuICB9XG5cbiAgcGVla05pYmJsZSAoKSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KHRoaXMubGluZS5zdWJzdHIodGhpcy5pbmRleCwgMSksIDE2KVxuICB9XG5cbiAgcGVla0J5dGUgKCkge1xuICAgIHJldHVybiBwYXJzZUludCh0aGlzLmxpbmUuc3Vic3RyKHRoaXMuaW5kZXgsIDIpLCAxNilcbiAgfVxuXG4gIHBlZWtXb3JkICgpIHtcbiAgICByZXR1cm4gcGFyc2VJbnQodGhpcy5saW5lLnN1YnN0cih0aGlzLmluZGV4LCA0KSwgMTYpXG4gIH1cblxuICBnZXROaWJibGUgKCkge1xuICAgIGNvbnN0IHIgPSBwYXJzZUludCh0aGlzLmxpbmUuc3Vic3RyKHRoaXMuaW5kZXgsIDEpLCAxNilcbiAgICB0aGlzLmluZGV4ICs9IDFcbiAgICByZXR1cm4gclxuICB9XG5cbiAgZ2V0Qnl0ZSAoKSB7XG4gICAgY29uc3QgciA9IHBhcnNlSW50KHRoaXMubGluZS5zdWJzdHIodGhpcy5pbmRleCwgMiksIDE2KVxuICAgIHRoaXMuaW5kZXggKz0gMlxuICAgIHJldHVybiByXG4gIH1cblxuICBnZXRXb3JkICgpIHtcbiAgICBjb25zdCByID0gcGFyc2VJbnQodGhpcy5saW5lLnN1YnN0cih0aGlzLmluZGV4LCA0KSwgMTYpXG4gICAgdGhpcy5pbmRleCArPSA0XG4gICAgcmV0dXJuIHJcbiAgfVxuXG4gIHB1c2hOaWJibGUgKHYpIHtcbiAgICB0aGlzLmxpbmUgKz0gZGVjMmhleCh2LCAxKVxuICB9XG5cbiAgcHVzaEJ5dGUgKHYpIHtcbiAgICB0aGlzLmxpbmUgKz0gZGVjMmhleCh2LCAyKVxuICB9XG5cbiAgcHVzaFdvcmQgKHYpIHtcbiAgICB0aGlzLmxpbmUgKz0gZGVjMmhleCh2LCA0KVxuICB9XG59XG4iLCIvKipcbiAgICBAZmlsZSBIaXN0b2dyYW0gSlMuXG5cbiAgICBAYXV0aG9yIENocmlzdGlhbiBXLiBadWNrc2Nod2VyZHQgPHphbnlAdHJpcS5uZXQ+XG4gICAgQGNvcHlyaWdodCBDaHJpc3RpYW4gVy4gWnVja3NjaHdlcmR0LCAyMDIwXG4gICAgQGxpY2Vuc2VcbiAgICBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICAgIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gICAgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMiBvZiB0aGUgTGljZW5zZSwgb3JcbiAgICAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuKi9cblxuaW1wb3J0IHsgSGV4YnVmZmVyIH0gZnJvbSAnLi9oZXhidWZmZXIuanMnXG5cbi8qIGVzbGludCBuby1jb25zb2xlOiBcIm9mZlwiICovXG5cbmNvbnN0IG1heF9oaXN0X2JpbnMgPSAxNlxuXG4vLy8gSGlzdG9ncmFtIGRhdGEgZm9yIHNpbmdsZSBiaW5cbmNsYXNzIEJpbiB7XG4gIGNvbnN0cnVjdG9yKG51bSkge1xuICAgIGlmICh0eXBlb2YgbnVtICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5jb3VudCA9IDFcbiAgICAgIHRoaXMuc3VtID0gbnVtXG4gICAgICB0aGlzLm1lYW4gPSBudW1cbiAgICAgIHRoaXMuZGV2aSA9IDBcbiAgICAgIHRoaXMubWluID0gbnVtXG4gICAgICB0aGlzLm1heCA9IG51bVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvdW50ID0gMFxuICAgICAgdGhpcy5zdW0gPSAwXG4gICAgICB0aGlzLm1lYW4gPSBudWxsXG4gICAgICB0aGlzLmRldmkgPSAwXG4gICAgICB0aGlzLm1pbiA9IG51bGxcbiAgICAgIHRoaXMubWF4ID0gbnVsbFxuICAgIH1cbiAgfVxuXG4gIGFkZChudW0pIHtcbiAgICB0aGlzLmNvdW50KytcbiAgICB0aGlzLnN1bSArPSBudW1cbiAgICB0aGlzLm1lYW4gPSB0aGlzLnN1bSAvIHRoaXMuY291bnRcbiAgICB0aGlzLm1pbiA9IHRoaXMubWluID09PSBudWxsID8gbnVtIDogTWF0aC5taW4obnVtLCB0aGlzLm1pbilcbiAgICB0aGlzLm1heCA9IHRoaXMubWF4ID09PSBudWxsID8gbnVtIDogTWF0aC5tYXgobnVtLCB0aGlzLm1heClcbiAgICB0aGlzLmRldmkgPSAodGhpcy5tYXggLSB0aGlzLm1pbikgLyAyXG4gIH1cblxuICBmdXNlKGJpbikge1xuICAgIHRoaXMuY291bnQgKz0gYmluLmNvdW50XG4gICAgdGhpcy5zdW0gKz0gYmluLnN1bVxuICAgIHRoaXMubWVhbiA9IHRoaXMuc3VtIC8gdGhpcy5jb3VudFxuICAgIHRoaXMubWluID0gTWF0aC5taW4odGhpcy5taW4sIGJpbi5taW4pXG4gICAgdGhpcy5tYXggPSBNYXRoLm1heCh0aGlzLm1heCwgYmluLm1heClcbiAgICB0aGlzLmRldmkgPSAodGhpcy5tYXggLSB0aGlzLm1pbikgLyAyXG4gIH1cblxuICBjb250YWlucyhudW0pIHtcbiAgICByZXR1cm4gbnVtID49IHRoaXMubWluICYmIG51bSA8PSB0aGlzLm1heFxuICB9XG59XG5cbi8vLyBIaXN0b2dyYW0gZGF0YSBmb3IgYWxsIGJpbnNcbmV4cG9ydCBjbGFzcyBIaXN0b2dyYW0ge1xuICBjb25zdHJ1Y3RvcihkYXRhLCB0b2xlcmFuY2UgPSAwLjIpIHtcbiAgICB0aGlzLmJpbnMgPSBbXVxuICAgIHRoaXMuaGlzdG9ncmFtX3N1bShkYXRhLCB0b2xlcmFuY2UpXG4gIH1cblxuICBnZXQgbGVuZ3RoKCkge1xuICAgIHJldHVybiB0aGlzLmJpbnMubGVuZ3RoXG4gIH1cblxuICAvLy8gR2VuZXJhdGUgYSBoaXN0b2dyYW0gKHVuc29ydGVkKVxuICBoaXN0b2dyYW1fc3VtKGRhdGEsIHRvbGVyYW5jZSA9IDAuMikge1xuICAgIGNvbnN0IGxlbiA9IGRhdGEubGVuZ3RoXG4gICAgZm9yIChsZXQgbiA9IDA7IG4gPCBsZW47ICsrbikge1xuICAgICAgLy8gU2VhcmNoIGZvciBtYXRjaCBpbiBleGlzdGluZyBiaW5zXG4gICAgICBsZXQgYmluXG4gICAgICBmb3IgKGJpbiA9IDA7IGJpbiA8IHRoaXMuYmlucy5sZW5ndGg7ICsrYmluKSB7XG4gICAgICAgIGNvbnN0IGJuID0gZGF0YVtuXVxuICAgICAgICBjb25zdCBibSA9IHRoaXMuYmluc1tiaW5dLm1lYW5cbiAgICAgICAgaWYgKE1hdGguYWJzKGJuIC0gYm0pIDwgdG9sZXJhbmNlICogTWF0aC5tYXgoYm4sIGJtKSkge1xuICAgICAgICAgIHRoaXMuYmluc1tiaW5dLmFkZChkYXRhW25dKVxuICAgICAgICAgIGJyZWFrIC8vIE1hdGNoIGZvdW5kISBEYXRhIGFkZGVkIHRvIGV4aXN0aW5nIGJpblxuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBObyBtYXRjaCBmb3VuZD8gQWRkIG5ldyBiaW5cbiAgICAgIGlmIChiaW4gPT09IHRoaXMuYmlucy5sZW5ndGggJiYgYmluIDwgbWF4X2hpc3RfYmlucykge1xuICAgICAgICB0aGlzLmJpbnMucHVzaChuZXcgQmluKGRhdGFbbl0pKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vLyBEZWxldGUgYmluIGZyb20gaGlzdG9ncmFtXG4gIGRlbGV0ZV9iaW4oaW5kZXgpIHtcbiAgICB0aGlzLmJpbnMuc3BsaWNlKGluZGV4LCAxKVxuICB9XG5cbiAgLy8vIFN3YXAgdHdvIGJpbnMgaW4gaGlzdG9ncmFtXG4gIHN3YXBfYmlucyhpbmRleDEsIGluZGV4Mikge1xuICAgIGlmIChpbmRleDEgPCB0aGlzLmJpbnMubGVuZ3RoICYmIGluZGV4MiA8IHRoaXMuYmlucy5sZW5ndGgpIHtcbiAgICAgIC8vIEF2b2lkIG91dCBvZiBib3VuZHNcbiAgICAgIGNvbnN0IHRlbXBiaW4gPSB0aGlzLmJpbnNbaW5kZXgxXVxuICAgICAgdGhpcy5iaW5zW2luZGV4MV0gPSB0aGlzLmJpbnNbaW5kZXgyXVxuICAgICAgdGhpcy5iaW5zW2luZGV4Ml0gPSB0ZW1wYmluXG4gICAgfVxuICB9XG5cbiAgLy8vIFNvcnQgaGlzdG9ncmFtIHdpdGggbWVhbiB2YWx1ZSAob3JkZXIgbG93ZXN0IHRvIGhpZ2hlc3QpXG4gIHNvcnRfbWVhbigpIHtcbiAgICBpZiAodGhpcy5iaW5zLmxlbmd0aCA8IDIpIHJldHVybiAvLyBBdm9pZCB1bmRlcmZsb3dcbiAgICAvLyBDb21wYXJlIGFsbCBiaW5zIChidWJibGUgc29ydClcbiAgICBmb3IgKGxldCBuID0gMDsgbiA8IHRoaXMuYmlucy5sZW5ndGggLSAxOyArK24pIHtcbiAgICAgIGZvciAobGV0IG0gPSBuICsgMTsgbSA8IHRoaXMuYmlucy5sZW5ndGg7ICsrbSkge1xuICAgICAgICBpZiAodGhpcy5iaW5zW21dLm1lYW4gPCB0aGlzLmJpbnNbbl0ubWVhbikge1xuICAgICAgICAgIHRoaXMuc3dhcF9iaW5zKG0sIG4pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLy8gU29ydCBoaXN0b2dyYW0gd2l0aCBjb3VudCB2YWx1ZSAob3JkZXIgbG93ZXN0IHRvIGhpZ2hlc3QpXG4gIHNvcnRfY291bnQoKSB7XG4gICAgaWYgKHRoaXMuYmlucy5sZW5ndGggPCAyKSByZXR1cm4gLy8gQXZvaWQgdW5kZXJmbG93XG4gICAgLy8gQ29tcGFyZSBhbGwgYmlucyAoYnViYmxlIHNvcnQpXG4gICAgZm9yIChsZXQgbiA9IDA7IG4gPCB0aGlzLmJpbnMubGVuZ3RoIC0gMTsgKytuKSB7XG4gICAgICBmb3IgKGxldCBtID0gbiArIDE7IG0gPCB0aGlzLmJpbnMubGVuZ3RoOyArK20pIHtcbiAgICAgICAgaWYgKHRoaXMuYmluc1ttXS5jb3VudCA8IHRoaXMuYmluc1tuXS5jb3VudCkge1xuICAgICAgICAgIHRoaXMuc3dhcF9iaW5zKG0sIG4pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLy8gRnVzZSBoaXN0b2dyYW0gYmlucyB3aXRoIG1lYW5zIHdpdGhpbiB0b2xlcmFuY2VcbiAgZnVzZV9iaW5zKHRvbGVyYW5jZSA9IDAuMikge1xuICAgIGlmICh0aGlzLmJpbnMubGVuZ3RoIDwgMikgcmV0dXJuIC8vIEF2b2lkIHVuZGVyZmxvd1xuICAgIC8vIENvbXBhcmUgYWxsIGJpbnNcbiAgICBmb3IgKGxldCBuID0gMDsgbiA8IHRoaXMuYmlucy5sZW5ndGggLSAxOyArK24pIHtcbiAgICAgIGZvciAobGV0IG0gPSBuICsgMTsgbSA8IHRoaXMuYmlucy5sZW5ndGg7ICsrbSkge1xuICAgICAgICBjb25zdCBibiA9IHRoaXMuYmluc1tuXS5tZWFuXG4gICAgICAgIGNvbnN0IGJtID0gdGhpcy5iaW5zW21dLm1lYW5cbiAgICAgICAgLy8gaWYgd2l0aGluIHRvbGVyYW5jZVxuICAgICAgICBpZiAoTWF0aC5hYnMoYm4gLSBibSkgPCB0b2xlcmFuY2UgKiBNYXRoLm1heChibiwgYm0pKSB7XG4gICAgICAgICAgLy8gRnVzZSBkYXRhIGZvciBiaW5bbl0gYW5kIGJpblttXVxuICAgICAgICAgIHRoaXMuYmluc1tuXS5mdXNlKHRoaXMuYmluc1ttXSlcbiAgICAgICAgICAvLyBEZWxldGUgYmluW21dXG4gICAgICAgICAgdGhpcy5kZWxldGVfYmluKG0pXG4gICAgICAgICAgbS0tIC8vIENvbXBhcmUgbmV3IGJpbiBpbiBzYW1lIHBsYWNlIVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8vIFRyaW0gemVyby13aWR0aCBiaW5zXG4gIHRyaW1fYmlucyh0b2xlcmFuY2UgPSAwKSB7XG4gICAgZm9yIChsZXQgbiA9IDA7IG4gPCB0aGlzLmJpbnMubGVuZ3RoOyArK24pIHtcbiAgICAgIC8vIGlmIHdpdGhpbiB0b2xlcmFuY2VcbiAgICAgIGlmICh0aGlzLmJpbnNbbl0ubWVhbiA8PSB0b2xlcmFuY2UpIHtcbiAgICAgICAgLy8gRGVsZXRlIGJpbltuXVxuICAgICAgICB0aGlzLmRlbGV0ZV9iaW4obilcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLy8gRmluZCBiaW4gaW5kZXhcbiAgZmluZF9iaW5faW5kZXgod2lkdGgpIHtcbiAgICBmb3IgKGxldCBuID0gMDsgbiA8IHRoaXMuYmlucy5sZW5ndGg7ICsrbikge1xuICAgICAgaWYgKHRoaXMuYmluc1tuXS5jb250YWlucyh3aWR0aCkpIHtcbiAgICAgICAgcmV0dXJuIG5cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xXG4gIH1cblxuICAvLy8gUHJpbnQgYSBoaXN0b2dyYW1cbiAgY29uc29sZV9wcmludCgpIHtcbiAgICBmb3IgKGxldCBuID0gMDsgbiA8IHRoaXMuYmlucy5sZW5ndGg7ICsrbikge1xuICAgICAgY29uc3QgYiA9IHRoaXMuYmluc1tuXVxuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIGBbJHtufV0gJHtiLmNvdW50fSDDlyAke2IubWVhbi50b0ZpeGVkKDEpfSDCsSR7Yi5kZXZpLnRvRml4ZWQoMSl9IMK1cyBbJHtcbiAgICAgICAgICBiLm1pblxuICAgICAgICB9OyR7Yi5tYXh9XWBcbiAgICAgIClcbiAgICB9XG4gIH1cblxuICBzdHJpbmdfcHJpbnQoc2VwYXJhdG9yID0gJywgJykge1xuICAgIGNvbnN0IHJldCA9IFtdXG4gICAgZm9yIChsZXQgbiA9IDA7IG4gPCB0aGlzLmJpbnMubGVuZ3RoOyArK24pIHtcbiAgICAgIGNvbnN0IGIgPSB0aGlzLmJpbnNbbl1cbiAgICAgIHJldC5wdXNoKFxuICAgICAgICBgJHtiLmNvdW50fcOXICR7Yi5tZWFuLnRvRml4ZWQoMSl9IDxzbWFsbD7CsSR7Yi5kZXZpLnRvRml4ZWQoXG4gICAgICAgICAgMVxuICAgICAgICApfTwvc21hbGw+IMK1c2BcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIHJldC5qb2luKHNlcGFyYXRvcilcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQW5hbHl6ZXIge1xuICBjb25zdHJ1Y3RvcihkYXRhLCB0b2xlcmFuY2UgPSAwLjIpIHtcbiAgICB0aGlzLmFuYWx5c2VfcHVsc2VzKGRhdGEsIHRvbGVyYW5jZSlcbiAgICB0aGlzLmNyZWF0ZV9yZnJhdyhkYXRhKVxuICB9XG5cbiAgLy8vIENyZWF0ZSBoaXN0b2dyYW1zIGZyb20gcHVsc2UgZGF0YVxuICBhbmFseXNlX3B1bHNlcyhkYXRhLCBtZXNzYWdlcywgdG9sZXJhbmNlID0gMC4yKSB7XG4gICAgLy8gR2VuZXJhdGUgcHVsc2UvZ2FwL3BlcmlvZCBkYXRhXG4gICAgdGhpcy5wdWxzZXMgPSBbXVxuICAgIHRoaXMuZ2FwcyA9IFtdXG4gICAgdGhpcy5wZXJpb2RzID0gW11cbiAgICB0aGlzLnB1bHNlX3N1bSA9IDBcbiAgICB0aGlzLmdhcF9zdW0gPSAwXG4gICAgLy8gTGVhdmUgb3V0IGxhc3QgZ2FwIChlbmQpXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBkYXRhLmxlbmd0aCAtIDI7IGogKz0gMikge1xuICAgICAgY29uc3QgbSA9IGRhdGFbal0gLy8gbWFya1xuICAgICAgY29uc3QgcyA9IGRhdGFbaiArIDFdIC8vIHNwYWNlXG4gICAgICB0aGlzLnB1bHNlcy5wdXNoKG0pXG4gICAgICB0aGlzLmdhcHMucHVzaChzKVxuICAgICAgdGhpcy5wZXJpb2RzLnB1c2gobSArIHMpXG4gICAgICB0aGlzLnB1bHNlX3N1bSArPSBtXG4gICAgICB0aGlzLmdhcF9zdW0gKz0gc1xuICAgIH1cbiAgICBjb25zdCBtID0gZGF0YVtkYXRhLmxlbmd0aCAtIDJdIC8vIGxhc3QgbWFya1xuICAgIC8vIGNvbnN0IHMgPSBkYXRhW2RhdGEubGVuZ3RoIC0gMV0gLy8gbGFzdCBzcGFjZVxuICAgIHRoaXMucHVsc2VzLnB1c2gobSlcbiAgICB0aGlzLnB1bHNlX3N1bSArPSBtXG4gICAgLy8gdGhpcy5nYXBfc3VtICs9IHNcbiAgICB0aGlzLnB1bHNlX2dhcF9yYXRpbyA9IHRoaXMucHVsc2Vfc3VtIC8gdGhpcy5nYXBfc3VtXG4gICAgdGhpcy5wdWxzZV9nYXBfc2tldyA9IHRoaXMucHVsc2VfZ2FwX3JhdGlvIC0gMVxuXG4gICAgLy8gR2VuZXJhdGUgc3RhdGlzdGljc1xuICAgIHRoaXMuaGlzdF9wdWxzZXMgPSBuZXcgSGlzdG9ncmFtKHRoaXMucHVsc2VzLCB0b2xlcmFuY2UpXG4gICAgdGhpcy5oaXN0X2dhcHMgPSBuZXcgSGlzdG9ncmFtKHRoaXMuZ2FwcywgdG9sZXJhbmNlKVxuICAgIHRoaXMuaGlzdF9wZXJpb2RzID0gbmV3IEhpc3RvZ3JhbSh0aGlzLnBlcmlvZHMsIHRvbGVyYW5jZSlcbiAgICB0aGlzLmhpc3RfdGltaW5ncyA9IG5ldyBIaXN0b2dyYW0oZGF0YSwgdG9sZXJhbmNlKVxuXG4gICAgLy8gVHJpbSB6ZXJvLXdpZHRoIGJpbnNcbiAgICB0aGlzLmhpc3RfcHVsc2VzLnRyaW1fYmlucyh0b2xlcmFuY2UpXG4gICAgdGhpcy5oaXN0X2dhcHMudHJpbV9iaW5zKHRvbGVyYW5jZSlcbiAgICB0aGlzLmhpc3RfcGVyaW9kcy50cmltX2JpbnModG9sZXJhbmNlKVxuICAgIHRoaXMuaGlzdF90aW1pbmdzLnRyaW1fYmlucyh0b2xlcmFuY2UpXG5cbiAgICAvLyBGdXNlIG92ZXJsYXBwaW5nIGJpbnNcbiAgICB0aGlzLmhpc3RfcHVsc2VzLmZ1c2VfYmlucyh0b2xlcmFuY2UpXG4gICAgdGhpcy5oaXN0X2dhcHMuZnVzZV9iaW5zKHRvbGVyYW5jZSlcbiAgICB0aGlzLmhpc3RfcGVyaW9kcy5mdXNlX2JpbnModG9sZXJhbmNlKVxuICAgIHRoaXMuaGlzdF90aW1pbmdzLmZ1c2VfYmlucyh0b2xlcmFuY2UpXG4gIH1cblxuICBndWVzcygpIHtcbiAgICBjb25zdCBwdWxzZXMgPSB0aGlzLmhpc3RfcHVsc2VzXG4gICAgY29uc3QgZ2FwcyA9IHRoaXMuaGlzdF9nYXBzXG4gICAgY29uc3QgcGVyaW9kcyA9IHRoaXMuaGlzdF9wZXJpb2RzXG4gICAgcHVsc2VzLnNvcnRfbWVhbigpIC8vIEVhc2llciB0byB3b3JrIHdpdGggc29ydGVkIGRhdGFcbiAgICBnYXBzLnNvcnRfbWVhbigpXG4gICAgaWYgKHB1bHNlcy5iaW5zLmxlbmd0aCA+IDAgJiYgcHVsc2VzLmJpbnNbMF0ubWVhbiA9PT0gMCkge1xuICAgICAgcHVsc2VzLmRlbGV0ZV9iaW4oMCkgLy8gUmVtb3ZlIEZTSyBpbml0aWFsIHplcm8tYmluXG4gICAgfVxuICAgIC8vIGlmIChwdWxzZXMuYmluc1swXS5tZWFuIDw9IDkgJiYgcHVsc2VzLmJpbnNbMF0uY291bnQgPD0gMikge1xuICAgIC8vICAgIHB1bHNlcy5kZWxldGVfYmluKDApIC8vIFJlbW92ZSBzdHJheSBwdWxzZXNcbiAgICAvLyB9XG5cbiAgICAvLyBBdHRlbXB0IHRvIGZpbmQgYSBtYXRjaGluZyBtb2R1bGF0aW9uXG4gICAgLy8gY29uc29sZS5sb2coYCR7cHVsc2VzLmxlbmd0aH0gJHtnYXBzLmxlbmd0aH0gJHtwZXJpb2RzLmxlbmd0aH1gKVxuICAgIGlmICh0aGlzLnB1bHNlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6ICdTaW5nbGUgcHVsc2UgZGV0ZWN0ZWQuIFByb2JhYmx5IEZyZXF1ZW5jeSBTaGlmdCBLZXlpbmcgb3IganVzdCBub2lzZS4uLidcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHB1bHNlcy5sZW5ndGggPT09IDEgJiYgZ2Fwcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6ICdVbi1tb2R1bGF0ZWQgc2lnbmFsLiBNYXliZSBhIHByZWFtYmxlLi4uJ1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocHVsc2VzLmxlbmd0aCA9PT0gMSAmJiBnYXBzLmxlbmd0aCA+IDEpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6ICdQdWxzZSBQb3NpdGlvbiBNb2R1bGF0aW9uIHdpdGggZml4ZWQgcHVsc2Ugd2lkdGgnLFxuICAgICAgICBtb2R1bGF0aW9uOiAnUFBNJyxcbiAgICAgICAgc2hvcnQ6IGdhcHMuYmluc1swXS5tZWFuLFxuICAgICAgICBsb25nOiBnYXBzLmJpbnNbMV0ubWVhbixcbiAgICAgICAgZ2FwOiBnYXBzLmJpbnNbMV0ubWF4ICogMS4yLCAvLyBTZXQgbGltaXQgYWJvdmUgbmV4dCBsb3dlciBnYXBcbiAgICAgICAgcmVzZXQ6IGdhcHMuYmluc1tnYXBzLmxlbmd0aCAtIDFdLm1heCAqIDEuMiAvLyBTZXQgbGltaXQgYWJvdmUgYmlnZ2VzdCBnYXBcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHB1bHNlcy5sZW5ndGggPT09IDIgJiYgZ2Fwcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIGNvbnN0IHNob3J0ID0gcHVsc2VzLmJpbnNbMF0ubWVhblxuICAgICAgY29uc3QgbG9uZyA9IHB1bHNlcy5iaW5zWzFdLm1lYW5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6ICdQdWxzZSBXaWR0aCBNb2R1bGF0aW9uIHdpdGggZml4ZWQgZ2FwJyxcbiAgICAgICAgbW9kdWxhdGlvbjogJ1BXTScsXG4gICAgICAgIHNob3J0OiBzaG9ydCxcbiAgICAgICAgbG9uZzogbG9uZyxcbiAgICAgICAgdG9sZXJhbmNlOiAobG9uZyAtIHNob3J0KSAqIDAuNCxcbiAgICAgICAgcmVzZXQ6IGdhcHMuYmluc1tnYXBzLmxlbmd0aCAtIDFdLm1heCAqIDEuMiAvLyBTZXQgbGltaXQgYWJvdmUgYmlnZ2VzdCBnYXBcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKFxuICAgICAgcHVsc2VzLmxlbmd0aCA9PT0gMiAmJlxuICAgICAgZ2Fwcy5sZW5ndGggPT09IDIgJiZcbiAgICAgIHBlcmlvZHMubGVuZ3RoID09PSAxXG4gICAgKSB7XG4gICAgICBjb25zdCBzaG9ydCA9IHB1bHNlcy5iaW5zWzBdLm1lYW5cbiAgICAgIGNvbnN0IGxvbmcgPSBwdWxzZXMuYmluc1sxXS5tZWFuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiAnUHVsc2UgV2lkdGggTW9kdWxhdGlvbiB3aXRoIGZpeGVkIHBlcmlvZCcsXG4gICAgICAgIG1vZHVsYXRpb246ICdQV00nLFxuICAgICAgICBzaG9ydDogc2hvcnQsXG4gICAgICAgIGxvbmc6IGxvbmcsXG4gICAgICAgIHRvbGVyYW5jZTogKGxvbmcgLSBzaG9ydCkgKiAwLjQsXG4gICAgICAgIHJlc2V0OiBnYXBzLmJpbnNbZ2Fwcy5sZW5ndGggLSAxXS5tYXggKiAxLjIgLy8gU2V0IGxpbWl0IGFib3ZlIGJpZ2dlc3QgZ2FwXG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHB1bHNlcy5sZW5ndGggPT09IDIgJiZcbiAgICAgIGdhcHMubGVuZ3RoID09PSAyICYmXG4gICAgICBwZXJpb2RzLmxlbmd0aCA9PT0gM1xuICAgICkge1xuICAgICAgY29uc3Qgc2hvcnQgPSBwdWxzZXMuYmluc1swXS5tZWFuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiAnTWFuY2hlc3RlciBjb2RpbmcgKFBDTSknLFxuICAgICAgICBtb2R1bGF0aW9uOiAnTUMnLFxuICAgICAgICBzaG9ydDogc2hvcnQsIC8vIEFzc3VtZSBzaG9ydGVzdCBwdWxzZSBpcyBoYWxmIHBlcmlvZFxuICAgICAgICBsb25nOiBzaG9ydCwgLy8gTm90IHVzZWRcbiAgICAgICAgcmVzZXQ6IGdhcHMuYmluc1tnYXBzLmxlbmd0aCAtIDFdLm1heCAqIDEuMiAvLyBTZXQgbGltaXQgYWJvdmUgYmlnZ2VzdCBnYXBcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHB1bHNlcy5sZW5ndGggPT09IDIgJiYgZ2Fwcy5sZW5ndGggPj0gMykge1xuICAgICAgY29uc3Qgc2hvcnQgPSBwdWxzZXMuYmluc1swXS5tZWFuXG4gICAgICBjb25zdCBsb25nID0gcHVsc2VzLmJpbnNbMV0ubWVhblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogJ1B1bHNlIFdpZHRoIE1vZHVsYXRpb24gd2l0aCBtdWx0aXBsZSBwYWNrZXRzJyxcbiAgICAgICAgbW9kdWxhdGlvbjogJ1BXTScsXG4gICAgICAgIHNob3J0OiBzaG9ydCxcbiAgICAgICAgbG9uZzogbG9uZyxcbiAgICAgICAgZ2FwOiBnYXBzLmJpbnNbMV0ubWF4ICogMS4yLCAvLyBTZXQgbGltaXQgYWJvdmUgc2Vjb25kIGdhcFxuICAgICAgICB0b2xlcmFuY2U6IChsb25nIC0gc2hvcnQpICogMC40LFxuICAgICAgICByZXNldDogZ2Fwcy5iaW5zW2dhcHMubGVuZ3RoIC0gMV0ubWF4ICogMS4yIC8vIFNldCBsaW1pdCBhYm92ZSBiaWdnZXN0IGdhcFxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoXG4gICAgICBwdWxzZXMubGVuZ3RoID49IDMgJiZcbiAgICAgIGdhcHMubGVuZ3RoID49IDMgJiZcbiAgICAgIE1hdGguYWJzKHB1bHNlcy5iaW5zWzFdLm1lYW4gLSAyICogcHVsc2VzLmJpbnNbMF0ubWVhbikgPD1cbiAgICAgICAgcHVsc2VzLmJpbnNbMF0ubWVhbiAvIDggJiYgLy8gUHVsc2VzIGFyZSBtdWx0aXBsZXMgb2Ygc2hvcnRlc3QgcHVsc2VcbiAgICAgIE1hdGguYWJzKHB1bHNlcy5iaW5zWzJdLm1lYW4gLSAzICogcHVsc2VzLmJpbnNbMF0ubWVhbikgPD1cbiAgICAgICAgcHVsc2VzLmJpbnNbMF0ubWVhbiAvIDggJiZcbiAgICAgIE1hdGguYWJzKGdhcHMuYmluc1swXS5tZWFuIC0gcHVsc2VzLmJpbnNbMF0ubWVhbikgPD1cbiAgICAgICAgcHVsc2VzLmJpbnNbMF0ubWVhbiAvIDggJiYgLy8gR2FwcyBhcmUgbXVsdGlwbGVzIG9mIHNob3J0ZXN0IHB1bHNlXG4gICAgICBNYXRoLmFicyhnYXBzLmJpbnNbMV0ubWVhbiAtIDIgKiBwdWxzZXMuYmluc1swXS5tZWFuKSA8PVxuICAgICAgICBwdWxzZXMuYmluc1swXS5tZWFuIC8gOCAmJlxuICAgICAgTWF0aC5hYnMoZ2Fwcy5iaW5zWzJdLm1lYW4gLSAzICogcHVsc2VzLmJpbnNbMF0ubWVhbikgPD1cbiAgICAgICAgcHVsc2VzLmJpbnNbMF0ubWVhbiAvIDhcbiAgICApIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6ICdQdWxzZSBDb2RlIE1vZHVsYXRpb24gKE5vdCBSZXR1cm4gdG8gWmVybyknLFxuICAgICAgICBtb2R1bGF0aW9uOiAnUENNJyxcbiAgICAgICAgc2hvcnQ6IHB1bHNlcy5iaW5zWzBdLm1lYW4sIC8vIFNob3J0ZXN0IHB1bHNlIGlzIGJpdCB3aWR0aFxuICAgICAgICBsb25nOiBwdWxzZXMuYmluc1swXS5tZWFuLCAvLyBCaXQgcGVyaW9kIGVxdWFsIHRvIHB1bHNlIGxlbmd0aCAoTlJaKVxuICAgICAgICByZXNldDogcHVsc2VzLmJpbnNbMF0ubWVhbiAqIDEwMjQgLy8gTm8gbGltaXQgdG8gcnVuIG9mIHplcm9zLi4uXG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChwdWxzZXMubGVuZ3RoID09PSAzKSB7XG4gICAgICAvLyBSZS1zb3J0IHRvIGZpbmQgbG93ZXN0IHB1bHNlIGNvdW50IGluZGV4IChpcyBwcm9iYWJseSBkZWxpbWl0ZXIpXG4gICAgICBwdWxzZXMuc29ydF9jb3VudCgpXG4gICAgICBjb25zdCBwMSA9IHB1bHNlcy5iaW5zWzFdLm1lYW5cbiAgICAgIGNvbnN0IHAyID0gcHVsc2VzLmJpbnNbMl0ubWVhblxuICAgICAgY29uc3Qgc2hvcnQgPSBwMSA8IHAyID8gcDEgOiBwMiAvLyBTZXQgdG8gc2hvcnRlciBwdWxzZSB3aWR0aFxuICAgICAgY29uc3QgbG9uZyA9IHAxIDwgcDIgPyBwMiA6IHAxIC8vIFNldCB0byBsb25nZXIgcHVsc2Ugd2lkdGhcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6ICdQdWxzZSBXaWR0aCBNb2R1bGF0aW9uIHdpdGggc3luYy9kZWxpbWl0ZXInLFxuICAgICAgICBtb2R1bGF0aW9uOiAnUFdNJyxcbiAgICAgICAgc2hvcnQ6IHNob3J0LFxuICAgICAgICBsb25nOiBsb25nLFxuICAgICAgICBzeW5jOiBwdWxzZXMuYmluc1swXS5tZWFuLCAvLyBTZXQgdG8gbG93ZXN0IGNvdW50IHB1bHNlIHdpZHRoXG4gICAgICAgIHJlc2V0OiBnYXBzLmJpbnNbZ2Fwcy5sZW5ndGggLSAxXS5tYXggKiAxLjIgLy8gU2V0IGxpbWl0IGFib3ZlIGJpZ2dlc3QgZ2FwXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6ICdObyBjbHVlLi4uJ1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZV9yZnJhdyhkYXRhKSB7XG4gICAgY29uc3QgdGltaW5ncyA9IHRoaXMuaGlzdF90aW1pbmdzXG5cbiAgICBpZiAodGltaW5ncy5iaW5zLmxlbmd0aCA8IDEpIHtcbiAgICAgIHJldHVybiAnJ1xuICAgIH1cbiAgICBpZiAodGltaW5ncy5iaW5zLmxlbmd0aCA+IDgpIHtcbiAgICAgIHJldHVybiAnJ1xuICAgIH1cbiAgICBpZiAoZGF0YS5sZW5ndGggPiA0OTQpIHtcbiAgICAgIHJldHVybiAnJ1xuICAgIH1cblxuICAgIGNvbnN0IHJhdyA9IG5ldyBIZXhidWZmZXIoKVxuXG4gICAgZm9yIChjb25zdCBiIG9mIHRpbWluZ3MuYmlucykge1xuICAgICAgcmF3LnB1c2hXb3JkKGIubWVhbilcbiAgICB9XG5cbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGRhdGEubGVuZ3RoIC0gMTsgaiArPSAyKSB7XG4gICAgICBjb25zdCBtID0gZGF0YVtqXSAvLyBtYXJrXG4gICAgICBjb25zdCBzID0gZGF0YVtqICsgMV0gLy8gc3BhY2VcbiAgICAgIGNvbnN0IG1pID0gdGltaW5ncy5maW5kX2Jpbl9pbmRleChtKVxuICAgICAgY29uc3Qgc2kgPSB0aW1pbmdzLmZpbmRfYmluX2luZGV4KHMpXG4gICAgICByYXcucHVzaE5pYmJsZShtaSB8IDgpXG4gICAgICByYXcucHVzaE5pYmJsZShzaSlcbiAgICB9XG5cbiAgICByYXcucHVzaEJ5dGUoMHg1NSlcblxuICAgIGNvbnN0IHJhdzAgPSBuZXcgSGV4YnVmZmVyKClcbiAgICByYXcwLnB1c2hCeXRlKDB4YWEpXG4gICAgcmF3MC5wdXNoQnl0ZSgweGIwKVxuICAgIHJhdzAucHVzaEJ5dGUoMiArIHJhdy5saW5lLmxlbmd0aCAvIDIgLSAxKVxuICAgIHJhdzAucHVzaEJ5dGUodGltaW5ncy5iaW5zLmxlbmd0aClcbiAgICByYXcwLnB1c2hCeXRlKDEpIC8vIHJlcGVhdHNcblxuICAgIGNvbnN0IHJhdzEgPSBuZXcgSGV4YnVmZmVyKClcbiAgICByYXcxLnB1c2hCeXRlKDB4YWEpXG4gICAgcmF3MS5wdXNoQnl0ZSgweGIxKVxuICAgIHJhdzEucHVzaEJ5dGUodGltaW5ncy5iaW5zLmxlbmd0aClcblxuICAgIHRoaXMucmZyYXdCMCA9IHJhdzAubGluZSArIHJhdy5saW5lXG4gICAgdGhpcy5yZnJhd0IxID0gcmF3MS5saW5lICsgcmF3LmxpbmVcbiAgfVxuXG4gIGNvbnNvbGVfbG9nKCkge1xuICAgIC8qIGNvbnN0IGd1ZXNzID0gdGhpcy5ndWVzcygpXG4gICAgY29uc29sZS5sb2coJ0FuYWx5emluZyBwdWxzZXMuLi4nKVxuICAgIGNvbnNvbGUubG9nKGBUb3RhbCBjb3VudDogJHt0aGlzLnB1bHNlcy5sZW5ndGh9YClcbiAgICBjb25zb2xlLmxvZygnUHVsc2Ugd2lkdGggZGlzdHJpYnV0aW9uOicpXG4gICAgdGhpcy5oaXN0X3B1bHNlcy5jb25zb2xlX3ByaW50KClcbiAgICBjb25zb2xlLmxvZygnR2FwIHdpZHRoIGRpc3RyaWJ1dGlvbjonKVxuICAgIHRoaXMuaGlzdF9nYXBzLmNvbnNvbGVfcHJpbnQoKVxuICAgIGNvbnNvbGUubG9nKCdQdWxzZSBwZXJpb2QgZGlzdHJpYnV0aW9uOicpXG4gICAgdGhpcy5oaXN0X3BlcmlvZHMuY29uc29sZV9wcmludCgpXG4gICAgY29uc29sZS5sb2coJ1B1bHNlIHRpbWluZyBkaXN0cmlidXRpb246JylcbiAgICB0aGlzLmhpc3RfdGltaW5ncy5jb25zb2xlX3ByaW50KClcbiAgICBjb25zb2xlLmxvZyhgREMgYmlhcyAoUHVsc2UvR2FwIHNrZXcpOiAkeyh0aGlzLnB1bHNlX2dhcF9za2V3ICogMTAwKS50b0ZpeGVkKDEpfWApXG4gICAgY29uc29sZS5sb2coJ0d1ZXNzaW5nIG1vZHVsYXRpb246JylcbiAgICBjb25zb2xlLmxvZyhndWVzcykgKi9cbiAgfVxuXG4gIHByaW50X3BsYWluKG1lc3NhZ2VzKSB7XG4gICAgY29uc3QgZ3Vlc3MgPSB0aGlzLmd1ZXNzKClcbiAgICBtZXNzYWdlcy5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxkaXY+UHVsc2VzOiAke3RoaXMuaGlzdF9wdWxzZXMuc3RyaW5nX3ByaW50KCl9PC9kaXY+XG4gICAgICAgIDxkaXY+R2FwczogJHt0aGlzLmhpc3RfZ2Fwcy5zdHJpbmdfcHJpbnQoKX08L2Rpdj5cbiAgICAgICAgPGRpdj5QZXJpb2RzOiAke3RoaXMuaGlzdF9wZXJpb2RzLnN0cmluZ19wcmludCgpfTwvZGl2PlxuICAgICAgICA8ZGl2PlRpbWluZ3M6ICR7dGhpcy5oaXN0X3RpbWluZ3Muc3RyaW5nX3ByaW50KCl9PC9kaXY+XG4gICAgICAgIDxkaXY+JHtndWVzcy5uYW1lfTwvZGl2PlxuICAgICAgICBgXG4gIH1cblxuICAvKlxuY29uc3QgbG9jYWxlID0gbmV3IEludGwuTnVtYmVyRm9ybWF0KCkucmVzb2x2ZWRPcHRpb25zKCkubG9jYWxlXG5jb25zdCBmb3JtYXR0ZXIgPSBuZXcgSW50bC5OdW1iZXJGb3JtYXQobG9jYWxlLCB7XG4gICAgc3R5bGU6ICdwZXJjZW50JyxcbiAgICBzaWduRGlzcGxheTogJ2V4Y2VwdFplcm8nLFxuICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMSxcbn0pXG5mb3JtYXR0ZXIuZm9ybWF0KDAuNSlcbiovXG4gIHByaW50KHRpbWluZ3MsIG1lc3NhZ2VzKSB7XG4gICAgY29uc3QgZ3Vlc3MgPSB0aGlzLmd1ZXNzKClcbiAgICBpZiAodGltaW5ncykge1xuICAgICAgdGltaW5ncy5pbm5lckhUTUwgPSBgPHRhYmxlPlxuICAgICAgICAgICAgPHRyPjx0aCBhbGlnbj1cImxlZnRcIj5QdWxzZXM8L3RoPjx0ZD4ke3RoaXMuaGlzdF9wdWxzZXMuc3RyaW5nX3ByaW50KFxuICAgICAgICAgICAgICAnPC90ZD48dGQ+J1xuICAgICAgICAgICAgKX08L3RkPjwvdHI+XG4gICAgICAgICAgICA8dHI+PHRoIGFsaWduPVwibGVmdFwiPkdhcHM8L3RoPjx0ZD4ke3RoaXMuaGlzdF9nYXBzLnN0cmluZ19wcmludChcbiAgICAgICAgICAgICAgJzwvdGQ+PHRkPidcbiAgICAgICAgICAgICl9PC90ZD48L3RyPlxuICAgICAgICAgICAgPHRyPjx0aCBhbGlnbj1cImxlZnRcIj5QZXJpb2RzPC90aD48dGQ+JHt0aGlzLmhpc3RfcGVyaW9kcy5zdHJpbmdfcHJpbnQoXG4gICAgICAgICAgICAgICc8L3RkPjx0ZD4nXG4gICAgICAgICAgICApfTwvdGQ+PC90cj5cbiAgICAgICAgICAgIDx0cj48dGggYWxpZ249XCJsZWZ0XCI+VGltaW5nczwvdGg+PHRkPiR7dGhpcy5oaXN0X3RpbWluZ3Muc3RyaW5nX3ByaW50KFxuICAgICAgICAgICAgICAnPC90ZD48dGQ+J1xuICAgICAgICAgICAgKX08L3RkPjwvdHI+XG4gICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgYFxuICAgIH1cbiAgICBpZiAobWVzc2FnZXMpIHtcbiAgICAgIG1lc3NhZ2VzLmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxkaXY+PHNtYWxsPkRDIGJpYXMgKFB1bHNlL0dhcCBza2V3KTogJHsoXG4gICAgICAgICAgICAgIHRoaXMucHVsc2VfZ2FwX3NrZXcgKiAxMDBcbiAgICAgICAgICAgICkudG9GaXhlZCgxKX0lPC9zbWFsbD48YnI+XG4gICAgICAgICAgICBHdWVzc2luZyBtb2R1bGF0aW9uOiA8c3Ryb25nPiR7Z3Vlc3MubmFtZX08L3N0cm9uZz48YnI+XG4gICAgICAgICAgICBtb2R1bGF0aW9uOiA8c3Ryb25nPiR7Z3Vlc3MubW9kdWxhdGlvbiB8fCAndW5rbm93bid9PC9zdHJvbmc+XG4gICAgICAgICAgICBzaG9ydDogPHN0cm9uZz4ke1xuICAgICAgICAgICAgICBndWVzcy5zaG9ydCA/IGd1ZXNzLnNob3J0LnRvRml4ZWQoMSkgOiAnLSdcbiAgICAgICAgICAgIH08L3N0cm9uZz5cbiAgICAgICAgICAgIGxvbmc6IDxzdHJvbmc+JHtndWVzcy5sb25nID8gZ3Vlc3MubG9uZy50b0ZpeGVkKDEpIDogJy0nfTwvc3Ryb25nPlxuICAgICAgICAgICAgc3luYzogPHN0cm9uZz4ke2d1ZXNzLnN5bmMgPyBndWVzcy5zeW5jLnRvRml4ZWQoMSkgOiAnLSd9PC9zdHJvbmc+XG4gICAgICAgICAgICBnYXA6IDxzdHJvbmc+JHtndWVzcy5nYXAgPyBndWVzcy5nYXAudG9GaXhlZCgxKSA6ICctJ308L3N0cm9uZz5cbiAgICAgICAgICAgIHJlc2V0OiA8c3Ryb25nPiR7XG4gICAgICAgICAgICAgIGd1ZXNzLnJlc2V0ID8gZ3Vlc3MucmVzZXQudG9GaXhlZCgxKSA6ICctJ1xuICAgICAgICAgICAgfTwvc3Ryb25nPjxicj5cbiAgICAgICAgICAgIDxzbWFsbD5SZlJhdyAocngpOiA8c3Ryb25nPiR7XG4gICAgICAgICAgICAgIHRoaXMucmZyYXdCMSA/IHRoaXMucmZyYXdCMSA6ICctJ1xuICAgICAgICAgICAgfTwvc3Ryb25nPjwvc21hbGw+PGJyPlxuICAgICAgICAgICAgPHNtYWxsPlJmUmF3ICh0eCk6IDxzdHJvbmc+JHtcbiAgICAgICAgICAgICAgdGhpcy5yZnJhd0IwID8gdGhpcy5yZnJhd0IwIDogJy0nXG4gICAgICAgICAgICB9PC9zdHJvbmc+PC9zbWFsbD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgYFxuICAgIH1cbiAgfVxufVxuIiwiY29uc3QgZGVmYXVsdHMgPSB7XG4gIHNlbGVjdG9yOiAnI2ZsaXBwZXJQbG90dGVyJyxcbiAgaGVpZ2h0OiAzMDAsXG4gIG1hcmdpbjoge1xuICAgIHRvcDogNTAsXG4gICAgcmlnaHQ6IDAsXG4gICAgYm90dG9tOiA1MCxcbiAgICBsZWZ0OiAwXG4gIH0sXG4gIGJyZWFrcG9pbnRzOiB7XG4gICAgem9vbTogMTAsXG4gICAgcHVsc2VJbk9uZVg6IDc1XG4gIH0sXG4gIHRoZW1lOiB7XG4gICAgc3BhY2VGaWxsOiAnI2ZhZmFmYScsXG4gICAgY29tYmluaW5nRmlsbDogJyNlNmVjZWUnLFxuICAgIGhpRmlsbDogJyNlMGVmZTAnLFxuICAgIGhpU3Ryb2tlOiAnIzNjMycsXG4gICAgaGlMaW5lOiA0LFxuICAgIGxvU3Ryb2tlOiAnI2MzMycsXG4gICAgbG9MaW5lOiA0LFxuICAgIGVkZ2VTdHJva2U6ICcjY2NjJyxcbiAgICBlZGdlTGluZTogMSxcbiAgICBoaW50TGluZTogMSxcbiAgICBoaW50U3Ryb2tlOiAnI2FhZicsXG4gICAgaGludERhc2g6IFszLCAyXSxcbiAgICBoaW50QWx0TGluZTogMyxcbiAgICBoaW50QWx0U3Ryb2tlOiAnI2M1NScsXG4gICAgaGludEFsdERhc2g6IFszLCAyXSxcbiAgICB5SGludExvOiAxMTUsXG4gICAgeUhpbnRIaTogMzUsXG4gICAgZm9udFNpemU6IDEwLFxuICAgIGZvbnRDb2xvcjogJ2JsYWNrJyxcbiAgICBmb250QWxpZ246ICdjZW50ZXInLFxuICAgIGZvbnRCYXNlbGluZTogJ21pZGRsZSdcbiAgfVxufVxuXG5jb25zdCBzdHlsZXMgPSB7XG4gIHJlbGF0aXZlUG9zaXRpb246ICdwb3NpdGlvbjogcmVsYXRpdmU7JyxcbiAgZnVsbFdpZHRoOlxuICAgICd3aWR0aDogMTAwJSAhaW1wb3J0YW50OyBtYXJnaW4tbGVmdDogMCAhaW1wb3J0YW50OyBtYXJnaW4tcmlnaHQ6IDAgIWltcG9ydGFudDsnLFxuICBhYnNvbHV0ZVRvcExlZnQ6ICdwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogMDsgbGVmdDogMDsnXG59XG5cbi8vIGNvbnN0IFNsaWNlcnMgPSB7XG4vLyAgIFBDTTogJ1BDTScsXG4vLyAgIFBXTTogJ1BXTScsXG4vLyAgIFBQTTogJ1BQTScsXG4vLyAgIE1DOiAnTUMnLFxuLy8gICBETTogJ0RNJyxcbi8vICAgTlJaSTogJ05SWkknLFxuLy8gICBDTUk6ICdDTUknLFxuLy8gICBQSVdNOiAnUElXTSdcbi8vIH1cblxuY29uc3Qgc2xpY2VyT3B0aW9ucyA9IFtcbiAgLy8geyB0ZXh0OiAnb2ZmJywgdmFsdWU6ICcnIH0sXG4gIHsgdGV4dDogJ1BDTScsIHZhbHVlOiAnUENNJyB9LFxuICB7IHRleHQ6ICdQV00nLCB2YWx1ZTogJ1BXTScgfSxcbiAgeyB0ZXh0OiAnUFBNJywgdmFsdWU6ICdQUE0nIH0sXG4gIHsgdGV4dDogJ01DJywgdmFsdWU6ICdNQycgfSxcbiAgeyB0ZXh0OiAnRE0nLCB2YWx1ZTogJ0RNJyB9LFxuICB7IHRleHQ6ICdOUlpJJywgdmFsdWU6ICdOUlpJJyB9LFxuICB7IHRleHQ6ICdDTUknLCB2YWx1ZTogJ0NNSScgfSxcbiAgeyB0ZXh0OiAnUElXTScsIHZhbHVlOiAnUElXTScgfVxuXVxuXG5leHBvcnQgeyBkZWZhdWx0cywgc3R5bGVzLCBzbGljZXJPcHRpb25zIH1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzY2VuZGluZyhhLCBiKSB7XG4gIHJldHVybiBhID09IG51bGwgfHwgYiA9PSBudWxsID8gTmFOIDogYSA8IGIgPyAtMSA6IGEgPiBiID8gMSA6IGEgPj0gYiA/IDAgOiBOYU47XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZXNjZW5kaW5nKGEsIGIpIHtcbiAgcmV0dXJuIGEgPT0gbnVsbCB8fCBiID09IG51bGwgPyBOYU5cbiAgICA6IGIgPCBhID8gLTFcbiAgICA6IGIgPiBhID8gMVxuICAgIDogYiA+PSBhID8gMFxuICAgIDogTmFOO1xufVxuIiwiaW1wb3J0IGFzY2VuZGluZyBmcm9tIFwiLi9hc2NlbmRpbmcuanNcIjtcbmltcG9ydCBkZXNjZW5kaW5nIGZyb20gXCIuL2Rlc2NlbmRpbmcuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmlzZWN0b3IoZikge1xuICBsZXQgY29tcGFyZTEsIGNvbXBhcmUyLCBkZWx0YTtcblxuICAvLyBJZiBhbiBhY2Nlc3NvciBpcyBzcGVjaWZpZWQsIHByb21vdGUgaXQgdG8gYSBjb21wYXJhdG9yLiBJbiB0aGlzIGNhc2Ugd2VcbiAgLy8gY2FuIHRlc3Qgd2hldGhlciB0aGUgc2VhcmNoIHZhbHVlIGlzIChzZWxmLSkgY29tcGFyYWJsZS4gV2UgY2Fu4oCZdCBkbyB0aGlzXG4gIC8vIGZvciBhIGNvbXBhcmF0b3IgKGV4Y2VwdCBmb3Igc3BlY2lmaWMsIGtub3duIGNvbXBhcmF0b3JzKSBiZWNhdXNlIHdlIGNhbuKAmXRcbiAgLy8gdGVsbCBpZiB0aGUgY29tcGFyYXRvciBpcyBzeW1tZXRyaWMsIGFuZCBhbiBhc3ltbWV0cmljIGNvbXBhcmF0b3IgY2Fu4oCZdCBiZVxuICAvLyB1c2VkIHRvIHRlc3Qgd2hldGhlciBhIHNpbmdsZSB2YWx1ZSBpcyBjb21wYXJhYmxlLlxuICBpZiAoZi5sZW5ndGggIT09IDIpIHtcbiAgICBjb21wYXJlMSA9IGFzY2VuZGluZztcbiAgICBjb21wYXJlMiA9IChkLCB4KSA9PiBhc2NlbmRpbmcoZihkKSwgeCk7XG4gICAgZGVsdGEgPSAoZCwgeCkgPT4gZihkKSAtIHg7XG4gIH0gZWxzZSB7XG4gICAgY29tcGFyZTEgPSBmID09PSBhc2NlbmRpbmcgfHwgZiA9PT0gZGVzY2VuZGluZyA/IGYgOiB6ZXJvO1xuICAgIGNvbXBhcmUyID0gZjtcbiAgICBkZWx0YSA9IGY7XG4gIH1cblxuICBmdW5jdGlvbiBsZWZ0KGEsIHgsIGxvID0gMCwgaGkgPSBhLmxlbmd0aCkge1xuICAgIGlmIChsbyA8IGhpKSB7XG4gICAgICBpZiAoY29tcGFyZTEoeCwgeCkgIT09IDApIHJldHVybiBoaTtcbiAgICAgIGRvIHtcbiAgICAgICAgY29uc3QgbWlkID0gKGxvICsgaGkpID4+PiAxO1xuICAgICAgICBpZiAoY29tcGFyZTIoYVttaWRdLCB4KSA8IDApIGxvID0gbWlkICsgMTtcbiAgICAgICAgZWxzZSBoaSA9IG1pZDtcbiAgICAgIH0gd2hpbGUgKGxvIDwgaGkpO1xuICAgIH1cbiAgICByZXR1cm4gbG87XG4gIH1cblxuICBmdW5jdGlvbiByaWdodChhLCB4LCBsbyA9IDAsIGhpID0gYS5sZW5ndGgpIHtcbiAgICBpZiAobG8gPCBoaSkge1xuICAgICAgaWYgKGNvbXBhcmUxKHgsIHgpICE9PSAwKSByZXR1cm4gaGk7XG4gICAgICBkbyB7XG4gICAgICAgIGNvbnN0IG1pZCA9IChsbyArIGhpKSA+Pj4gMTtcbiAgICAgICAgaWYgKGNvbXBhcmUyKGFbbWlkXSwgeCkgPD0gMCkgbG8gPSBtaWQgKyAxO1xuICAgICAgICBlbHNlIGhpID0gbWlkO1xuICAgICAgfSB3aGlsZSAobG8gPCBoaSk7XG4gICAgfVxuICAgIHJldHVybiBsbztcbiAgfVxuXG4gIGZ1bmN0aW9uIGNlbnRlcihhLCB4LCBsbyA9IDAsIGhpID0gYS5sZW5ndGgpIHtcbiAgICBjb25zdCBpID0gbGVmdChhLCB4LCBsbywgaGkgLSAxKTtcbiAgICByZXR1cm4gaSA+IGxvICYmIGRlbHRhKGFbaSAtIDFdLCB4KSA+IC1kZWx0YShhW2ldLCB4KSA/IGkgLSAxIDogaTtcbiAgfVxuXG4gIHJldHVybiB7bGVmdCwgY2VudGVyLCByaWdodH07XG59XG5cbmZ1bmN0aW9uIHplcm8oKSB7XG4gIHJldHVybiAwO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbnVtYmVyKHgpIHtcbiAgcmV0dXJuIHggPT09IG51bGwgPyBOYU4gOiAreDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uKiBudW1iZXJzKHZhbHVlcywgdmFsdWVvZikge1xuICBpZiAodmFsdWVvZiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZm9yIChsZXQgdmFsdWUgb2YgdmFsdWVzKSB7XG4gICAgICBpZiAodmFsdWUgIT0gbnVsbCAmJiAodmFsdWUgPSArdmFsdWUpID49IHZhbHVlKSB7XG4gICAgICAgIHlpZWxkIHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBsZXQgaW5kZXggPSAtMTtcbiAgICBmb3IgKGxldCB2YWx1ZSBvZiB2YWx1ZXMpIHtcbiAgICAgIGlmICgodmFsdWUgPSB2YWx1ZW9mKHZhbHVlLCArK2luZGV4LCB2YWx1ZXMpKSAhPSBudWxsICYmICh2YWx1ZSA9ICt2YWx1ZSkgPj0gdmFsdWUpIHtcbiAgICAgICAgeWllbGQgdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgYXNjZW5kaW5nIGZyb20gXCIuL2FzY2VuZGluZy5qc1wiO1xuaW1wb3J0IGJpc2VjdG9yIGZyb20gXCIuL2Jpc2VjdG9yLmpzXCI7XG5pbXBvcnQgbnVtYmVyIGZyb20gXCIuL251bWJlci5qc1wiO1xuXG5jb25zdCBhc2NlbmRpbmdCaXNlY3QgPSBiaXNlY3Rvcihhc2NlbmRpbmcpO1xuZXhwb3J0IGNvbnN0IGJpc2VjdFJpZ2h0ID0gYXNjZW5kaW5nQmlzZWN0LnJpZ2h0O1xuZXhwb3J0IGNvbnN0IGJpc2VjdExlZnQgPSBhc2NlbmRpbmdCaXNlY3QubGVmdDtcbmV4cG9ydCBjb25zdCBiaXNlY3RDZW50ZXIgPSBiaXNlY3RvcihudW1iZXIpLmNlbnRlcjtcbmV4cG9ydCBkZWZhdWx0IGJpc2VjdFJpZ2h0O1xuIiwiY29uc3QgZTEwID0gTWF0aC5zcXJ0KDUwKSxcbiAgICBlNSA9IE1hdGguc3FydCgxMCksXG4gICAgZTIgPSBNYXRoLnNxcnQoMik7XG5cbmZ1bmN0aW9uIHRpY2tTcGVjKHN0YXJ0LCBzdG9wLCBjb3VudCkge1xuICBjb25zdCBzdGVwID0gKHN0b3AgLSBzdGFydCkgLyBNYXRoLm1heCgwLCBjb3VudCksXG4gICAgICBwb3dlciA9IE1hdGguZmxvb3IoTWF0aC5sb2cxMChzdGVwKSksXG4gICAgICBlcnJvciA9IHN0ZXAgLyBNYXRoLnBvdygxMCwgcG93ZXIpLFxuICAgICAgZmFjdG9yID0gZXJyb3IgPj0gZTEwID8gMTAgOiBlcnJvciA+PSBlNSA/IDUgOiBlcnJvciA+PSBlMiA/IDIgOiAxO1xuICBsZXQgaTEsIGkyLCBpbmM7XG4gIGlmIChwb3dlciA8IDApIHtcbiAgICBpbmMgPSBNYXRoLnBvdygxMCwgLXBvd2VyKSAvIGZhY3RvcjtcbiAgICBpMSA9IE1hdGgucm91bmQoc3RhcnQgKiBpbmMpO1xuICAgIGkyID0gTWF0aC5yb3VuZChzdG9wICogaW5jKTtcbiAgICBpZiAoaTEgLyBpbmMgPCBzdGFydCkgKytpMTtcbiAgICBpZiAoaTIgLyBpbmMgPiBzdG9wKSAtLWkyO1xuICAgIGluYyA9IC1pbmM7XG4gIH0gZWxzZSB7XG4gICAgaW5jID0gTWF0aC5wb3coMTAsIHBvd2VyKSAqIGZhY3RvcjtcbiAgICBpMSA9IE1hdGgucm91bmQoc3RhcnQgLyBpbmMpO1xuICAgIGkyID0gTWF0aC5yb3VuZChzdG9wIC8gaW5jKTtcbiAgICBpZiAoaTEgKiBpbmMgPCBzdGFydCkgKytpMTtcbiAgICBpZiAoaTIgKiBpbmMgPiBzdG9wKSAtLWkyO1xuICB9XG4gIGlmIChpMiA8IGkxICYmIDAuNSA8PSBjb3VudCAmJiBjb3VudCA8IDIpIHJldHVybiB0aWNrU3BlYyhzdGFydCwgc3RvcCwgY291bnQgKiAyKTtcbiAgcmV0dXJuIFtpMSwgaTIsIGluY107XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRpY2tzKHN0YXJ0LCBzdG9wLCBjb3VudCkge1xuICBzdG9wID0gK3N0b3AsIHN0YXJ0ID0gK3N0YXJ0LCBjb3VudCA9ICtjb3VudDtcbiAgaWYgKCEoY291bnQgPiAwKSkgcmV0dXJuIFtdO1xuICBpZiAoc3RhcnQgPT09IHN0b3ApIHJldHVybiBbc3RhcnRdO1xuICBjb25zdCByZXZlcnNlID0gc3RvcCA8IHN0YXJ0LCBbaTEsIGkyLCBpbmNdID0gcmV2ZXJzZSA/IHRpY2tTcGVjKHN0b3AsIHN0YXJ0LCBjb3VudCkgOiB0aWNrU3BlYyhzdGFydCwgc3RvcCwgY291bnQpO1xuICBpZiAoIShpMiA+PSBpMSkpIHJldHVybiBbXTtcbiAgY29uc3QgbiA9IGkyIC0gaTEgKyAxLCB0aWNrcyA9IG5ldyBBcnJheShuKTtcbiAgaWYgKHJldmVyc2UpIHtcbiAgICBpZiAoaW5jIDwgMCkgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyArK2kpIHRpY2tzW2ldID0gKGkyIC0gaSkgLyAtaW5jO1xuICAgIGVsc2UgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyArK2kpIHRpY2tzW2ldID0gKGkyIC0gaSkgKiBpbmM7XG4gIH0gZWxzZSB7XG4gICAgaWYgKGluYyA8IDApIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgKytpKSB0aWNrc1tpXSA9IChpMSArIGkpIC8gLWluYztcbiAgICBlbHNlIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgKytpKSB0aWNrc1tpXSA9IChpMSArIGkpICogaW5jO1xuICB9XG4gIHJldHVybiB0aWNrcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRpY2tJbmNyZW1lbnQoc3RhcnQsIHN0b3AsIGNvdW50KSB7XG4gIHN0b3AgPSArc3RvcCwgc3RhcnQgPSArc3RhcnQsIGNvdW50ID0gK2NvdW50O1xuICByZXR1cm4gdGlja1NwZWMoc3RhcnQsIHN0b3AsIGNvdW50KVsyXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRpY2tTdGVwKHN0YXJ0LCBzdG9wLCBjb3VudCkge1xuICBzdG9wID0gK3N0b3AsIHN0YXJ0ID0gK3N0YXJ0LCBjb3VudCA9ICtjb3VudDtcbiAgY29uc3QgcmV2ZXJzZSA9IHN0b3AgPCBzdGFydCwgaW5jID0gcmV2ZXJzZSA/IHRpY2tJbmNyZW1lbnQoc3RvcCwgc3RhcnQsIGNvdW50KSA6IHRpY2tJbmNyZW1lbnQoc3RhcnQsIHN0b3AsIGNvdW50KTtcbiAgcmV0dXJuIChyZXZlcnNlID8gLTEgOiAxKSAqIChpbmMgPCAwID8gMSAvIC1pbmMgOiBpbmMpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oeCkge1xuICByZXR1cm4geDtcbn1cbiIsImltcG9ydCBpZGVudGl0eSBmcm9tIFwiLi9pZGVudGl0eS5qc1wiO1xuXG52YXIgdG9wID0gMSxcbiAgICByaWdodCA9IDIsXG4gICAgYm90dG9tID0gMyxcbiAgICBsZWZ0ID0gNCxcbiAgICBlcHNpbG9uID0gMWUtNjtcblxuZnVuY3Rpb24gdHJhbnNsYXRlWCh4KSB7XG4gIHJldHVybiBcInRyYW5zbGF0ZShcIiArIHggKyBcIiwwKVwiO1xufVxuXG5mdW5jdGlvbiB0cmFuc2xhdGVZKHkpIHtcbiAgcmV0dXJuIFwidHJhbnNsYXRlKDAsXCIgKyB5ICsgXCIpXCI7XG59XG5cbmZ1bmN0aW9uIG51bWJlcihzY2FsZSkge1xuICByZXR1cm4gZCA9PiArc2NhbGUoZCk7XG59XG5cbmZ1bmN0aW9uIGNlbnRlcihzY2FsZSwgb2Zmc2V0KSB7XG4gIG9mZnNldCA9IE1hdGgubWF4KDAsIHNjYWxlLmJhbmR3aWR0aCgpIC0gb2Zmc2V0ICogMikgLyAyO1xuICBpZiAoc2NhbGUucm91bmQoKSkgb2Zmc2V0ID0gTWF0aC5yb3VuZChvZmZzZXQpO1xuICByZXR1cm4gZCA9PiArc2NhbGUoZCkgKyBvZmZzZXQ7XG59XG5cbmZ1bmN0aW9uIGVudGVyaW5nKCkge1xuICByZXR1cm4gIXRoaXMuX19heGlzO1xufVxuXG5mdW5jdGlvbiBheGlzKG9yaWVudCwgc2NhbGUpIHtcbiAgdmFyIHRpY2tBcmd1bWVudHMgPSBbXSxcbiAgICAgIHRpY2tWYWx1ZXMgPSBudWxsLFxuICAgICAgdGlja0Zvcm1hdCA9IG51bGwsXG4gICAgICB0aWNrU2l6ZUlubmVyID0gNixcbiAgICAgIHRpY2tTaXplT3V0ZXIgPSA2LFxuICAgICAgdGlja1BhZGRpbmcgPSAzLFxuICAgICAgb2Zmc2V0ID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyA+IDEgPyAwIDogMC41LFxuICAgICAgayA9IG9yaWVudCA9PT0gdG9wIHx8IG9yaWVudCA9PT0gbGVmdCA/IC0xIDogMSxcbiAgICAgIHggPSBvcmllbnQgPT09IGxlZnQgfHwgb3JpZW50ID09PSByaWdodCA/IFwieFwiIDogXCJ5XCIsXG4gICAgICB0cmFuc2Zvcm0gPSBvcmllbnQgPT09IHRvcCB8fCBvcmllbnQgPT09IGJvdHRvbSA/IHRyYW5zbGF0ZVggOiB0cmFuc2xhdGVZO1xuXG4gIGZ1bmN0aW9uIGF4aXMoY29udGV4dCkge1xuICAgIHZhciB2YWx1ZXMgPSB0aWNrVmFsdWVzID09IG51bGwgPyAoc2NhbGUudGlja3MgPyBzY2FsZS50aWNrcy5hcHBseShzY2FsZSwgdGlja0FyZ3VtZW50cykgOiBzY2FsZS5kb21haW4oKSkgOiB0aWNrVmFsdWVzLFxuICAgICAgICBmb3JtYXQgPSB0aWNrRm9ybWF0ID09IG51bGwgPyAoc2NhbGUudGlja0Zvcm1hdCA/IHNjYWxlLnRpY2tGb3JtYXQuYXBwbHkoc2NhbGUsIHRpY2tBcmd1bWVudHMpIDogaWRlbnRpdHkpIDogdGlja0Zvcm1hdCxcbiAgICAgICAgc3BhY2luZyA9IE1hdGgubWF4KHRpY2tTaXplSW5uZXIsIDApICsgdGlja1BhZGRpbmcsXG4gICAgICAgIHJhbmdlID0gc2NhbGUucmFuZ2UoKSxcbiAgICAgICAgcmFuZ2UwID0gK3JhbmdlWzBdICsgb2Zmc2V0LFxuICAgICAgICByYW5nZTEgPSArcmFuZ2VbcmFuZ2UubGVuZ3RoIC0gMV0gKyBvZmZzZXQsXG4gICAgICAgIHBvc2l0aW9uID0gKHNjYWxlLmJhbmR3aWR0aCA/IGNlbnRlciA6IG51bWJlcikoc2NhbGUuY29weSgpLCBvZmZzZXQpLFxuICAgICAgICBzZWxlY3Rpb24gPSBjb250ZXh0LnNlbGVjdGlvbiA/IGNvbnRleHQuc2VsZWN0aW9uKCkgOiBjb250ZXh0LFxuICAgICAgICBwYXRoID0gc2VsZWN0aW9uLnNlbGVjdEFsbChcIi5kb21haW5cIikuZGF0YShbbnVsbF0pLFxuICAgICAgICB0aWNrID0gc2VsZWN0aW9uLnNlbGVjdEFsbChcIi50aWNrXCIpLmRhdGEodmFsdWVzLCBzY2FsZSkub3JkZXIoKSxcbiAgICAgICAgdGlja0V4aXQgPSB0aWNrLmV4aXQoKSxcbiAgICAgICAgdGlja0VudGVyID0gdGljay5lbnRlcigpLmFwcGVuZChcImdcIikuYXR0cihcImNsYXNzXCIsIFwidGlja1wiKSxcbiAgICAgICAgbGluZSA9IHRpY2suc2VsZWN0KFwibGluZVwiKSxcbiAgICAgICAgdGV4dCA9IHRpY2suc2VsZWN0KFwidGV4dFwiKTtcblxuICAgIHBhdGggPSBwYXRoLm1lcmdlKHBhdGguZW50ZXIoKS5pbnNlcnQoXCJwYXRoXCIsIFwiLnRpY2tcIilcbiAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcImRvbWFpblwiKVxuICAgICAgICAuYXR0cihcInN0cm9rZVwiLCBcImN1cnJlbnRDb2xvclwiKSk7XG5cbiAgICB0aWNrID0gdGljay5tZXJnZSh0aWNrRW50ZXIpO1xuXG4gICAgbGluZSA9IGxpbmUubWVyZ2UodGlja0VudGVyLmFwcGVuZChcImxpbmVcIilcbiAgICAgICAgLmF0dHIoXCJzdHJva2VcIiwgXCJjdXJyZW50Q29sb3JcIilcbiAgICAgICAgLmF0dHIoeCArIFwiMlwiLCBrICogdGlja1NpemVJbm5lcikpO1xuXG4gICAgdGV4dCA9IHRleHQubWVyZ2UodGlja0VudGVyLmFwcGVuZChcInRleHRcIilcbiAgICAgICAgLmF0dHIoXCJmaWxsXCIsIFwiY3VycmVudENvbG9yXCIpXG4gICAgICAgIC5hdHRyKHgsIGsgKiBzcGFjaW5nKVxuICAgICAgICAuYXR0cihcImR5XCIsIG9yaWVudCA9PT0gdG9wID8gXCIwZW1cIiA6IG9yaWVudCA9PT0gYm90dG9tID8gXCIwLjcxZW1cIiA6IFwiMC4zMmVtXCIpKTtcblxuICAgIGlmIChjb250ZXh0ICE9PSBzZWxlY3Rpb24pIHtcbiAgICAgIHBhdGggPSBwYXRoLnRyYW5zaXRpb24oY29udGV4dCk7XG4gICAgICB0aWNrID0gdGljay50cmFuc2l0aW9uKGNvbnRleHQpO1xuICAgICAgbGluZSA9IGxpbmUudHJhbnNpdGlvbihjb250ZXh0KTtcbiAgICAgIHRleHQgPSB0ZXh0LnRyYW5zaXRpb24oY29udGV4dCk7XG5cbiAgICAgIHRpY2tFeGl0ID0gdGlja0V4aXQudHJhbnNpdGlvbihjb250ZXh0KVxuICAgICAgICAgIC5hdHRyKFwib3BhY2l0eVwiLCBlcHNpbG9uKVxuICAgICAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGlzRmluaXRlKGQgPSBwb3NpdGlvbihkKSkgPyB0cmFuc2Zvcm0oZCArIG9mZnNldCkgOiB0aGlzLmdldEF0dHJpYnV0ZShcInRyYW5zZm9ybVwiKTsgfSk7XG5cbiAgICAgIHRpY2tFbnRlclxuICAgICAgICAgIC5hdHRyKFwib3BhY2l0eVwiLCBlcHNpbG9uKVxuICAgICAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIGZ1bmN0aW9uKGQpIHsgdmFyIHAgPSB0aGlzLnBhcmVudE5vZGUuX19heGlzOyByZXR1cm4gdHJhbnNmb3JtKChwICYmIGlzRmluaXRlKHAgPSBwKGQpKSA/IHAgOiBwb3NpdGlvbihkKSkgKyBvZmZzZXQpOyB9KTtcbiAgICB9XG5cbiAgICB0aWNrRXhpdC5yZW1vdmUoKTtcblxuICAgIHBhdGhcbiAgICAgICAgLmF0dHIoXCJkXCIsIG9yaWVudCA9PT0gbGVmdCB8fCBvcmllbnQgPT09IHJpZ2h0XG4gICAgICAgICAgICA/ICh0aWNrU2l6ZU91dGVyID8gXCJNXCIgKyBrICogdGlja1NpemVPdXRlciArIFwiLFwiICsgcmFuZ2UwICsgXCJIXCIgKyBvZmZzZXQgKyBcIlZcIiArIHJhbmdlMSArIFwiSFwiICsgayAqIHRpY2tTaXplT3V0ZXIgOiBcIk1cIiArIG9mZnNldCArIFwiLFwiICsgcmFuZ2UwICsgXCJWXCIgKyByYW5nZTEpXG4gICAgICAgICAgICA6ICh0aWNrU2l6ZU91dGVyID8gXCJNXCIgKyByYW5nZTAgKyBcIixcIiArIGsgKiB0aWNrU2l6ZU91dGVyICsgXCJWXCIgKyBvZmZzZXQgKyBcIkhcIiArIHJhbmdlMSArIFwiVlwiICsgayAqIHRpY2tTaXplT3V0ZXIgOiBcIk1cIiArIHJhbmdlMCArIFwiLFwiICsgb2Zmc2V0ICsgXCJIXCIgKyByYW5nZTEpKTtcblxuICAgIHRpY2tcbiAgICAgICAgLmF0dHIoXCJvcGFjaXR5XCIsIDEpXG4gICAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIHRyYW5zZm9ybShwb3NpdGlvbihkKSArIG9mZnNldCk7IH0pO1xuXG4gICAgbGluZVxuICAgICAgICAuYXR0cih4ICsgXCIyXCIsIGsgKiB0aWNrU2l6ZUlubmVyKTtcblxuICAgIHRleHRcbiAgICAgICAgLmF0dHIoeCwgayAqIHNwYWNpbmcpXG4gICAgICAgIC50ZXh0KGZvcm1hdCk7XG5cbiAgICBzZWxlY3Rpb24uZmlsdGVyKGVudGVyaW5nKVxuICAgICAgICAuYXR0cihcImZpbGxcIiwgXCJub25lXCIpXG4gICAgICAgIC5hdHRyKFwiZm9udC1zaXplXCIsIDEwKVxuICAgICAgICAuYXR0cihcImZvbnQtZmFtaWx5XCIsIFwic2Fucy1zZXJpZlwiKVxuICAgICAgICAuYXR0cihcInRleHQtYW5jaG9yXCIsIG9yaWVudCA9PT0gcmlnaHQgPyBcInN0YXJ0XCIgOiBvcmllbnQgPT09IGxlZnQgPyBcImVuZFwiIDogXCJtaWRkbGVcIik7XG5cbiAgICBzZWxlY3Rpb25cbiAgICAgICAgLmVhY2goZnVuY3Rpb24oKSB7IHRoaXMuX19heGlzID0gcG9zaXRpb247IH0pO1xuICB9XG5cbiAgYXhpcy5zY2FsZSA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChzY2FsZSA9IF8sIGF4aXMpIDogc2NhbGU7XG4gIH07XG5cbiAgYXhpcy50aWNrcyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aWNrQXJndW1lbnRzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpLCBheGlzO1xuICB9O1xuXG4gIGF4aXMudGlja0FyZ3VtZW50cyA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/ICh0aWNrQXJndW1lbnRzID0gXyA9PSBudWxsID8gW10gOiBBcnJheS5mcm9tKF8pLCBheGlzKSA6IHRpY2tBcmd1bWVudHMuc2xpY2UoKTtcbiAgfTtcblxuICBheGlzLnRpY2tWYWx1ZXMgPSBmdW5jdGlvbihfKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAodGlja1ZhbHVlcyA9IF8gPT0gbnVsbCA/IG51bGwgOiBBcnJheS5mcm9tKF8pLCBheGlzKSA6IHRpY2tWYWx1ZXMgJiYgdGlja1ZhbHVlcy5zbGljZSgpO1xuICB9O1xuXG4gIGF4aXMudGlja0Zvcm1hdCA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/ICh0aWNrRm9ybWF0ID0gXywgYXhpcykgOiB0aWNrRm9ybWF0O1xuICB9O1xuXG4gIGF4aXMudGlja1NpemUgPSBmdW5jdGlvbihfKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAodGlja1NpemVJbm5lciA9IHRpY2tTaXplT3V0ZXIgPSArXywgYXhpcykgOiB0aWNrU2l6ZUlubmVyO1xuICB9O1xuXG4gIGF4aXMudGlja1NpemVJbm5lciA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/ICh0aWNrU2l6ZUlubmVyID0gK18sIGF4aXMpIDogdGlja1NpemVJbm5lcjtcbiAgfTtcblxuICBheGlzLnRpY2tTaXplT3V0ZXIgPSBmdW5jdGlvbihfKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAodGlja1NpemVPdXRlciA9ICtfLCBheGlzKSA6IHRpY2tTaXplT3V0ZXI7XG4gIH07XG5cbiAgYXhpcy50aWNrUGFkZGluZyA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/ICh0aWNrUGFkZGluZyA9ICtfLCBheGlzKSA6IHRpY2tQYWRkaW5nO1xuICB9O1xuXG4gIGF4aXMub2Zmc2V0ID0gZnVuY3Rpb24oXykge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKG9mZnNldCA9ICtfLCBheGlzKSA6IG9mZnNldDtcbiAgfTtcblxuICByZXR1cm4gYXhpcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGF4aXNUb3Aoc2NhbGUpIHtcbiAgcmV0dXJuIGF4aXModG9wLCBzY2FsZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBheGlzUmlnaHQoc2NhbGUpIHtcbiAgcmV0dXJuIGF4aXMocmlnaHQsIHNjYWxlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGF4aXNCb3R0b20oc2NhbGUpIHtcbiAgcmV0dXJuIGF4aXMoYm90dG9tLCBzY2FsZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBheGlzTGVmdChzY2FsZSkge1xuICByZXR1cm4gYXhpcyhsZWZ0LCBzY2FsZSk7XG59XG4iLCJ2YXIgbm9vcCA9IHt2YWx1ZTogKCkgPT4ge319O1xuXG5mdW5jdGlvbiBkaXNwYXRjaCgpIHtcbiAgZm9yICh2YXIgaSA9IDAsIG4gPSBhcmd1bWVudHMubGVuZ3RoLCBfID0ge30sIHQ7IGkgPCBuOyArK2kpIHtcbiAgICBpZiAoISh0ID0gYXJndW1lbnRzW2ldICsgXCJcIikgfHwgKHQgaW4gXykgfHwgL1tcXHMuXS8udGVzdCh0KSkgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCB0eXBlOiBcIiArIHQpO1xuICAgIF9bdF0gPSBbXTtcbiAgfVxuICByZXR1cm4gbmV3IERpc3BhdGNoKF8pO1xufVxuXG5mdW5jdGlvbiBEaXNwYXRjaChfKSB7XG4gIHRoaXMuXyA9IF87XG59XG5cbmZ1bmN0aW9uIHBhcnNlVHlwZW5hbWVzKHR5cGVuYW1lcywgdHlwZXMpIHtcbiAgcmV0dXJuIHR5cGVuYW1lcy50cmltKCkuc3BsaXQoL158XFxzKy8pLm1hcChmdW5jdGlvbih0KSB7XG4gICAgdmFyIG5hbWUgPSBcIlwiLCBpID0gdC5pbmRleE9mKFwiLlwiKTtcbiAgICBpZiAoaSA+PSAwKSBuYW1lID0gdC5zbGljZShpICsgMSksIHQgPSB0LnNsaWNlKDAsIGkpO1xuICAgIGlmICh0ICYmICF0eXBlcy5oYXNPd25Qcm9wZXJ0eSh0KSkgdGhyb3cgbmV3IEVycm9yKFwidW5rbm93biB0eXBlOiBcIiArIHQpO1xuICAgIHJldHVybiB7dHlwZTogdCwgbmFtZTogbmFtZX07XG4gIH0pO1xufVxuXG5EaXNwYXRjaC5wcm90b3R5cGUgPSBkaXNwYXRjaC5wcm90b3R5cGUgPSB7XG4gIGNvbnN0cnVjdG9yOiBEaXNwYXRjaCxcbiAgb246IGZ1bmN0aW9uKHR5cGVuYW1lLCBjYWxsYmFjaykge1xuICAgIHZhciBfID0gdGhpcy5fLFxuICAgICAgICBUID0gcGFyc2VUeXBlbmFtZXModHlwZW5hbWUgKyBcIlwiLCBfKSxcbiAgICAgICAgdCxcbiAgICAgICAgaSA9IC0xLFxuICAgICAgICBuID0gVC5sZW5ndGg7XG5cbiAgICAvLyBJZiBubyBjYWxsYmFjayB3YXMgc3BlY2lmaWVkLCByZXR1cm4gdGhlIGNhbGxiYWNrIG9mIHRoZSBnaXZlbiB0eXBlIGFuZCBuYW1lLlxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgICAgd2hpbGUgKCsraSA8IG4pIGlmICgodCA9ICh0eXBlbmFtZSA9IFRbaV0pLnR5cGUpICYmICh0ID0gZ2V0KF9bdF0sIHR5cGVuYW1lLm5hbWUpKSkgcmV0dXJuIHQ7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gSWYgYSB0eXBlIHdhcyBzcGVjaWZpZWQsIHNldCB0aGUgY2FsbGJhY2sgZm9yIHRoZSBnaXZlbiB0eXBlIGFuZCBuYW1lLlxuICAgIC8vIE90aGVyd2lzZSwgaWYgYSBudWxsIGNhbGxiYWNrIHdhcyBzcGVjaWZpZWQsIHJlbW92ZSBjYWxsYmFja3Mgb2YgdGhlIGdpdmVuIG5hbWUuXG4gICAgaWYgKGNhbGxiYWNrICE9IG51bGwgJiYgdHlwZW9mIGNhbGxiYWNrICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBFcnJvcihcImludmFsaWQgY2FsbGJhY2s6IFwiICsgY2FsbGJhY2spO1xuICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICBpZiAodCA9ICh0eXBlbmFtZSA9IFRbaV0pLnR5cGUpIF9bdF0gPSBzZXQoX1t0XSwgdHlwZW5hbWUubmFtZSwgY2FsbGJhY2spO1xuICAgICAgZWxzZSBpZiAoY2FsbGJhY2sgPT0gbnVsbCkgZm9yICh0IGluIF8pIF9bdF0gPSBzZXQoX1t0XSwgdHlwZW5hbWUubmFtZSwgbnVsbCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIGNvcHk6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjb3B5ID0ge30sIF8gPSB0aGlzLl87XG4gICAgZm9yICh2YXIgdCBpbiBfKSBjb3B5W3RdID0gX1t0XS5zbGljZSgpO1xuICAgIHJldHVybiBuZXcgRGlzcGF0Y2goY29weSk7XG4gIH0sXG4gIGNhbGw6IGZ1bmN0aW9uKHR5cGUsIHRoYXQpIHtcbiAgICBpZiAoKG4gPSBhcmd1bWVudHMubGVuZ3RoIC0gMikgPiAwKSBmb3IgKHZhciBhcmdzID0gbmV3IEFycmF5KG4pLCBpID0gMCwgbiwgdDsgaSA8IG47ICsraSkgYXJnc1tpXSA9IGFyZ3VtZW50c1tpICsgMl07XG4gICAgaWYgKCF0aGlzLl8uaGFzT3duUHJvcGVydHkodHlwZSkpIHRocm93IG5ldyBFcnJvcihcInVua25vd24gdHlwZTogXCIgKyB0eXBlKTtcbiAgICBmb3IgKHQgPSB0aGlzLl9bdHlwZV0sIGkgPSAwLCBuID0gdC5sZW5ndGg7IGkgPCBuOyArK2kpIHRbaV0udmFsdWUuYXBwbHkodGhhdCwgYXJncyk7XG4gIH0sXG4gIGFwcGx5OiBmdW5jdGlvbih0eXBlLCB0aGF0LCBhcmdzKSB7XG4gICAgaWYgKCF0aGlzLl8uaGFzT3duUHJvcGVydHkodHlwZSkpIHRocm93IG5ldyBFcnJvcihcInVua25vd24gdHlwZTogXCIgKyB0eXBlKTtcbiAgICBmb3IgKHZhciB0ID0gdGhpcy5fW3R5cGVdLCBpID0gMCwgbiA9IHQubGVuZ3RoOyBpIDwgbjsgKytpKSB0W2ldLnZhbHVlLmFwcGx5KHRoYXQsIGFyZ3MpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBnZXQodHlwZSwgbmFtZSkge1xuICBmb3IgKHZhciBpID0gMCwgbiA9IHR5cGUubGVuZ3RoLCBjOyBpIDwgbjsgKytpKSB7XG4gICAgaWYgKChjID0gdHlwZVtpXSkubmFtZSA9PT0gbmFtZSkge1xuICAgICAgcmV0dXJuIGMudmFsdWU7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHNldCh0eXBlLCBuYW1lLCBjYWxsYmFjaykge1xuICBmb3IgKHZhciBpID0gMCwgbiA9IHR5cGUubGVuZ3RoOyBpIDwgbjsgKytpKSB7XG4gICAgaWYgKHR5cGVbaV0ubmFtZSA9PT0gbmFtZSkge1xuICAgICAgdHlwZVtpXSA9IG5vb3AsIHR5cGUgPSB0eXBlLnNsaWNlKDAsIGkpLmNvbmNhdCh0eXBlLnNsaWNlKGkgKyAxKSk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgaWYgKGNhbGxiYWNrICE9IG51bGwpIHR5cGUucHVzaCh7bmFtZTogbmFtZSwgdmFsdWU6IGNhbGxiYWNrfSk7XG4gIHJldHVybiB0eXBlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBkaXNwYXRjaDtcbiIsImV4cG9ydCB2YXIgeGh0bWwgPSBcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBzdmc6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixcbiAgeGh0bWw6IHhodG1sLFxuICB4bGluazogXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIsXG4gIHhtbDogXCJodHRwOi8vd3d3LnczLm9yZy9YTUwvMTk5OC9uYW1lc3BhY2VcIixcbiAgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC94bWxucy9cIlxufTtcbiIsImltcG9ydCBuYW1lc3BhY2VzIGZyb20gXCIuL25hbWVzcGFjZXMuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSkge1xuICB2YXIgcHJlZml4ID0gbmFtZSArPSBcIlwiLCBpID0gcHJlZml4LmluZGV4T2YoXCI6XCIpO1xuICBpZiAoaSA+PSAwICYmIChwcmVmaXggPSBuYW1lLnNsaWNlKDAsIGkpKSAhPT0gXCJ4bWxuc1wiKSBuYW1lID0gbmFtZS5zbGljZShpICsgMSk7XG4gIHJldHVybiBuYW1lc3BhY2VzLmhhc093blByb3BlcnR5KHByZWZpeCkgPyB7c3BhY2U6IG5hbWVzcGFjZXNbcHJlZml4XSwgbG9jYWw6IG5hbWV9IDogbmFtZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbn1cbiIsImltcG9ydCBuYW1lc3BhY2UgZnJvbSBcIi4vbmFtZXNwYWNlLmpzXCI7XG5pbXBvcnQge3hodG1sfSBmcm9tIFwiLi9uYW1lc3BhY2VzLmpzXCI7XG5cbmZ1bmN0aW9uIGNyZWF0b3JJbmhlcml0KG5hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBkb2N1bWVudCA9IHRoaXMub3duZXJEb2N1bWVudCxcbiAgICAgICAgdXJpID0gdGhpcy5uYW1lc3BhY2VVUkk7XG4gICAgcmV0dXJuIHVyaSA9PT0geGh0bWwgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm5hbWVzcGFjZVVSSSA9PT0geGh0bWxcbiAgICAgICAgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5hbWUpXG4gICAgICAgIDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKHVyaSwgbmFtZSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0b3JGaXhlZChmdWxsbmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMub3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoZnVsbG5hbWUuc3BhY2UsIGZ1bGxuYW1lLmxvY2FsKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSkge1xuICB2YXIgZnVsbG5hbWUgPSBuYW1lc3BhY2UobmFtZSk7XG4gIHJldHVybiAoZnVsbG5hbWUubG9jYWxcbiAgICAgID8gY3JlYXRvckZpeGVkXG4gICAgICA6IGNyZWF0b3JJbmhlcml0KShmdWxsbmFtZSk7XG59XG4iLCJmdW5jdGlvbiBub25lKCkge31cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAgcmV0dXJuIHNlbGVjdG9yID09IG51bGwgPyBub25lIDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gIH07XG59XG4iLCJpbXBvcnQge1NlbGVjdGlvbn0gZnJvbSBcIi4vaW5kZXguanNcIjtcbmltcG9ydCBzZWxlY3RvciBmcm9tIFwiLi4vc2VsZWN0b3IuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc2VsZWN0KSB7XG4gIGlmICh0eXBlb2Ygc2VsZWN0ICE9PSBcImZ1bmN0aW9uXCIpIHNlbGVjdCA9IHNlbGVjdG9yKHNlbGVjdCk7XG5cbiAgZm9yICh2YXIgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzLCBtID0gZ3JvdXBzLmxlbmd0aCwgc3ViZ3JvdXBzID0gbmV3IEFycmF5KG0pLCBqID0gMDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwID0gZ3JvdXBzW2pdLCBuID0gZ3JvdXAubGVuZ3RoLCBzdWJncm91cCA9IHN1Ymdyb3Vwc1tqXSA9IG5ldyBBcnJheShuKSwgbm9kZSwgc3Vibm9kZSwgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmICgobm9kZSA9IGdyb3VwW2ldKSAmJiAoc3Vibm9kZSA9IHNlbGVjdC5jYWxsKG5vZGUsIG5vZGUuX19kYXRhX18sIGksIGdyb3VwKSkpIHtcbiAgICAgICAgaWYgKFwiX19kYXRhX19cIiBpbiBub2RlKSBzdWJub2RlLl9fZGF0YV9fID0gbm9kZS5fX2RhdGFfXztcbiAgICAgICAgc3ViZ3JvdXBbaV0gPSBzdWJub2RlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXcgU2VsZWN0aW9uKHN1Ymdyb3VwcywgdGhpcy5fcGFyZW50cyk7XG59XG4iLCIvLyBHaXZlbiBzb21ldGhpbmcgYXJyYXkgbGlrZSAob3IgbnVsbCksIHJldHVybnMgc29tZXRoaW5nIHRoYXQgaXMgc3RyaWN0bHkgYW5cbi8vIGFycmF5LiBUaGlzIGlzIHVzZWQgdG8gZW5zdXJlIHRoYXQgYXJyYXktbGlrZSBvYmplY3RzIHBhc3NlZCB0byBkMy5zZWxlY3RBbGxcbi8vIG9yIHNlbGVjdGlvbi5zZWxlY3RBbGwgYXJlIGNvbnZlcnRlZCBpbnRvIHByb3BlciBhcnJheXMgd2hlbiBjcmVhdGluZyBhXG4vLyBzZWxlY3Rpb247IHdlIGRvbuKAmXQgZXZlciB3YW50IHRvIGNyZWF0ZSBhIHNlbGVjdGlvbiBiYWNrZWQgYnkgYSBsaXZlXG4vLyBIVE1MQ29sbGVjdGlvbiBvciBOb2RlTGlzdC4gSG93ZXZlciwgbm90ZSB0aGF0IHNlbGVjdGlvbi5zZWxlY3RBbGwgd2lsbCB1c2UgYVxuLy8gc3RhdGljIE5vZGVMaXN0IGFzIGEgZ3JvdXAsIHNpbmNlIGl0IHNhZmVseSBkZXJpdmVkIGZyb20gcXVlcnlTZWxlY3RvckFsbC5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFycmF5KHgpIHtcbiAgcmV0dXJuIHggPT0gbnVsbCA/IFtdIDogQXJyYXkuaXNBcnJheSh4KSA/IHggOiBBcnJheS5mcm9tKHgpO1xufVxuIiwiZnVuY3Rpb24gZW1wdHkoKSB7XG4gIHJldHVybiBbXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAgcmV0dXJuIHNlbGVjdG9yID09IG51bGwgPyBlbXB0eSA6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICB9O1xufVxuIiwiaW1wb3J0IHtTZWxlY3Rpb259IGZyb20gXCIuL2luZGV4LmpzXCI7XG5pbXBvcnQgYXJyYXkgZnJvbSBcIi4uL2FycmF5LmpzXCI7XG5pbXBvcnQgc2VsZWN0b3JBbGwgZnJvbSBcIi4uL3NlbGVjdG9yQWxsLmpzXCI7XG5cbmZ1bmN0aW9uIGFycmF5QWxsKHNlbGVjdCkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGFycmF5KHNlbGVjdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc2VsZWN0KSB7XG4gIGlmICh0eXBlb2Ygc2VsZWN0ID09PSBcImZ1bmN0aW9uXCIpIHNlbGVjdCA9IGFycmF5QWxsKHNlbGVjdCk7XG4gIGVsc2Ugc2VsZWN0ID0gc2VsZWN0b3JBbGwoc2VsZWN0KTtcblxuICBmb3IgKHZhciBncm91cHMgPSB0aGlzLl9ncm91cHMsIG0gPSBncm91cHMubGVuZ3RoLCBzdWJncm91cHMgPSBbXSwgcGFyZW50cyA9IFtdLCBqID0gMDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwID0gZ3JvdXBzW2pdLCBuID0gZ3JvdXAubGVuZ3RoLCBub2RlLCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKG5vZGUgPSBncm91cFtpXSkge1xuICAgICAgICBzdWJncm91cHMucHVzaChzZWxlY3QuY2FsbChub2RlLCBub2RlLl9fZGF0YV9fLCBpLCBncm91cCkpO1xuICAgICAgICBwYXJlbnRzLnB1c2gobm9kZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyBTZWxlY3Rpb24oc3ViZ3JvdXBzLCBwYXJlbnRzKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5tYXRjaGVzKHNlbGVjdG9yKTtcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoaWxkTWF0Y2hlcihzZWxlY3Rvcikge1xuICByZXR1cm4gZnVuY3Rpb24obm9kZSkge1xuICAgIHJldHVybiBub2RlLm1hdGNoZXMoc2VsZWN0b3IpO1xuICB9O1xufVxuXG4iLCJpbXBvcnQge2NoaWxkTWF0Y2hlcn0gZnJvbSBcIi4uL21hdGNoZXIuanNcIjtcblxudmFyIGZpbmQgPSBBcnJheS5wcm90b3R5cGUuZmluZDtcblxuZnVuY3Rpb24gY2hpbGRGaW5kKG1hdGNoKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZmluZC5jYWxsKHRoaXMuY2hpbGRyZW4sIG1hdGNoKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gY2hpbGRGaXJzdCgpIHtcbiAgcmV0dXJuIHRoaXMuZmlyc3RFbGVtZW50Q2hpbGQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG1hdGNoKSB7XG4gIHJldHVybiB0aGlzLnNlbGVjdChtYXRjaCA9PSBudWxsID8gY2hpbGRGaXJzdFxuICAgICAgOiBjaGlsZEZpbmQodHlwZW9mIG1hdGNoID09PSBcImZ1bmN0aW9uXCIgPyBtYXRjaCA6IGNoaWxkTWF0Y2hlcihtYXRjaCkpKTtcbn1cbiIsImltcG9ydCB7Y2hpbGRNYXRjaGVyfSBmcm9tIFwiLi4vbWF0Y2hlci5qc1wiO1xuXG52YXIgZmlsdGVyID0gQXJyYXkucHJvdG90eXBlLmZpbHRlcjtcblxuZnVuY3Rpb24gY2hpbGRyZW4oKSB7XG4gIHJldHVybiBBcnJheS5mcm9tKHRoaXMuY2hpbGRyZW4pO1xufVxuXG5mdW5jdGlvbiBjaGlsZHJlbkZpbHRlcihtYXRjaCkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGZpbHRlci5jYWxsKHRoaXMuY2hpbGRyZW4sIG1hdGNoKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obWF0Y2gpIHtcbiAgcmV0dXJuIHRoaXMuc2VsZWN0QWxsKG1hdGNoID09IG51bGwgPyBjaGlsZHJlblxuICAgICAgOiBjaGlsZHJlbkZpbHRlcih0eXBlb2YgbWF0Y2ggPT09IFwiZnVuY3Rpb25cIiA/IG1hdGNoIDogY2hpbGRNYXRjaGVyKG1hdGNoKSkpO1xufVxuIiwiaW1wb3J0IHtTZWxlY3Rpb259IGZyb20gXCIuL2luZGV4LmpzXCI7XG5pbXBvcnQgbWF0Y2hlciBmcm9tIFwiLi4vbWF0Y2hlci5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihtYXRjaCkge1xuICBpZiAodHlwZW9mIG1hdGNoICE9PSBcImZ1bmN0aW9uXCIpIG1hdGNoID0gbWF0Y2hlcihtYXRjaCk7XG5cbiAgZm9yICh2YXIgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzLCBtID0gZ3JvdXBzLmxlbmd0aCwgc3ViZ3JvdXBzID0gbmV3IEFycmF5KG0pLCBqID0gMDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwID0gZ3JvdXBzW2pdLCBuID0gZ3JvdXAubGVuZ3RoLCBzdWJncm91cCA9IHN1Ymdyb3Vwc1tqXSA9IFtdLCBub2RlLCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKChub2RlID0gZ3JvdXBbaV0pICYmIG1hdGNoLmNhbGwobm9kZSwgbm9kZS5fX2RhdGFfXywgaSwgZ3JvdXApKSB7XG4gICAgICAgIHN1Ymdyb3VwLnB1c2gobm9kZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyBTZWxlY3Rpb24oc3ViZ3JvdXBzLCB0aGlzLl9wYXJlbnRzKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHVwZGF0ZSkge1xuICByZXR1cm4gbmV3IEFycmF5KHVwZGF0ZS5sZW5ndGgpO1xufVxuIiwiaW1wb3J0IHNwYXJzZSBmcm9tIFwiLi9zcGFyc2UuanNcIjtcbmltcG9ydCB7U2VsZWN0aW9ufSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBTZWxlY3Rpb24odGhpcy5fZW50ZXIgfHwgdGhpcy5fZ3JvdXBzLm1hcChzcGFyc2UpLCB0aGlzLl9wYXJlbnRzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEVudGVyTm9kZShwYXJlbnQsIGRhdHVtKSB7XG4gIHRoaXMub3duZXJEb2N1bWVudCA9IHBhcmVudC5vd25lckRvY3VtZW50O1xuICB0aGlzLm5hbWVzcGFjZVVSSSA9IHBhcmVudC5uYW1lc3BhY2VVUkk7XG4gIHRoaXMuX25leHQgPSBudWxsO1xuICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG4gIHRoaXMuX19kYXRhX18gPSBkYXR1bTtcbn1cblxuRW50ZXJOb2RlLnByb3RvdHlwZSA9IHtcbiAgY29uc3RydWN0b3I6IEVudGVyTm9kZSxcbiAgYXBwZW5kQ2hpbGQ6IGZ1bmN0aW9uKGNoaWxkKSB7IHJldHVybiB0aGlzLl9wYXJlbnQuaW5zZXJ0QmVmb3JlKGNoaWxkLCB0aGlzLl9uZXh0KTsgfSxcbiAgaW5zZXJ0QmVmb3JlOiBmdW5jdGlvbihjaGlsZCwgbmV4dCkgeyByZXR1cm4gdGhpcy5fcGFyZW50Lmluc2VydEJlZm9yZShjaGlsZCwgbmV4dCk7IH0sXG4gIHF1ZXJ5U2VsZWN0b3I6IGZ1bmN0aW9uKHNlbGVjdG9yKSB7IHJldHVybiB0aGlzLl9wYXJlbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7IH0sXG4gIHF1ZXJ5U2VsZWN0b3JBbGw6IGZ1bmN0aW9uKHNlbGVjdG9yKSB7IHJldHVybiB0aGlzLl9wYXJlbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7IH1cbn07XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbih4KSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4geDtcbiAgfTtcbn1cbiIsImltcG9ydCB7U2VsZWN0aW9ufSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuaW1wb3J0IHtFbnRlck5vZGV9IGZyb20gXCIuL2VudGVyLmpzXCI7XG5pbXBvcnQgY29uc3RhbnQgZnJvbSBcIi4uL2NvbnN0YW50LmpzXCI7XG5cbmZ1bmN0aW9uIGJpbmRJbmRleChwYXJlbnQsIGdyb3VwLCBlbnRlciwgdXBkYXRlLCBleGl0LCBkYXRhKSB7XG4gIHZhciBpID0gMCxcbiAgICAgIG5vZGUsXG4gICAgICBncm91cExlbmd0aCA9IGdyb3VwLmxlbmd0aCxcbiAgICAgIGRhdGFMZW5ndGggPSBkYXRhLmxlbmd0aDtcblxuICAvLyBQdXQgYW55IG5vbi1udWxsIG5vZGVzIHRoYXQgZml0IGludG8gdXBkYXRlLlxuICAvLyBQdXQgYW55IG51bGwgbm9kZXMgaW50byBlbnRlci5cbiAgLy8gUHV0IGFueSByZW1haW5pbmcgZGF0YSBpbnRvIGVudGVyLlxuICBmb3IgKDsgaSA8IGRhdGFMZW5ndGg7ICsraSkge1xuICAgIGlmIChub2RlID0gZ3JvdXBbaV0pIHtcbiAgICAgIG5vZGUuX19kYXRhX18gPSBkYXRhW2ldO1xuICAgICAgdXBkYXRlW2ldID0gbm9kZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZW50ZXJbaV0gPSBuZXcgRW50ZXJOb2RlKHBhcmVudCwgZGF0YVtpXSk7XG4gICAgfVxuICB9XG5cbiAgLy8gUHV0IGFueSBub24tbnVsbCBub2RlcyB0aGF0IGRvbuKAmXQgZml0IGludG8gZXhpdC5cbiAgZm9yICg7IGkgPCBncm91cExlbmd0aDsgKytpKSB7XG4gICAgaWYgKG5vZGUgPSBncm91cFtpXSkge1xuICAgICAgZXhpdFtpXSA9IG5vZGU7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGJpbmRLZXkocGFyZW50LCBncm91cCwgZW50ZXIsIHVwZGF0ZSwgZXhpdCwgZGF0YSwga2V5KSB7XG4gIHZhciBpLFxuICAgICAgbm9kZSxcbiAgICAgIG5vZGVCeUtleVZhbHVlID0gbmV3IE1hcCxcbiAgICAgIGdyb3VwTGVuZ3RoID0gZ3JvdXAubGVuZ3RoLFxuICAgICAgZGF0YUxlbmd0aCA9IGRhdGEubGVuZ3RoLFxuICAgICAga2V5VmFsdWVzID0gbmV3IEFycmF5KGdyb3VwTGVuZ3RoKSxcbiAgICAgIGtleVZhbHVlO1xuXG4gIC8vIENvbXB1dGUgdGhlIGtleSBmb3IgZWFjaCBub2RlLlxuICAvLyBJZiBtdWx0aXBsZSBub2RlcyBoYXZlIHRoZSBzYW1lIGtleSwgdGhlIGR1cGxpY2F0ZXMgYXJlIGFkZGVkIHRvIGV4aXQuXG4gIGZvciAoaSA9IDA7IGkgPCBncm91cExlbmd0aDsgKytpKSB7XG4gICAgaWYgKG5vZGUgPSBncm91cFtpXSkge1xuICAgICAga2V5VmFsdWVzW2ldID0ga2V5VmFsdWUgPSBrZXkuY2FsbChub2RlLCBub2RlLl9fZGF0YV9fLCBpLCBncm91cCkgKyBcIlwiO1xuICAgICAgaWYgKG5vZGVCeUtleVZhbHVlLmhhcyhrZXlWYWx1ZSkpIHtcbiAgICAgICAgZXhpdFtpXSA9IG5vZGU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub2RlQnlLZXlWYWx1ZS5zZXQoa2V5VmFsdWUsIG5vZGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIENvbXB1dGUgdGhlIGtleSBmb3IgZWFjaCBkYXR1bS5cbiAgLy8gSWYgdGhlcmUgYSBub2RlIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGtleSwgam9pbiBhbmQgYWRkIGl0IHRvIHVwZGF0ZS5cbiAgLy8gSWYgdGhlcmUgaXMgbm90IChvciB0aGUga2V5IGlzIGEgZHVwbGljYXRlKSwgYWRkIGl0IHRvIGVudGVyLlxuICBmb3IgKGkgPSAwOyBpIDwgZGF0YUxlbmd0aDsgKytpKSB7XG4gICAga2V5VmFsdWUgPSBrZXkuY2FsbChwYXJlbnQsIGRhdGFbaV0sIGksIGRhdGEpICsgXCJcIjtcbiAgICBpZiAobm9kZSA9IG5vZGVCeUtleVZhbHVlLmdldChrZXlWYWx1ZSkpIHtcbiAgICAgIHVwZGF0ZVtpXSA9IG5vZGU7XG4gICAgICBub2RlLl9fZGF0YV9fID0gZGF0YVtpXTtcbiAgICAgIG5vZGVCeUtleVZhbHVlLmRlbGV0ZShrZXlWYWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVudGVyW2ldID0gbmV3IEVudGVyTm9kZShwYXJlbnQsIGRhdGFbaV0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIEFkZCBhbnkgcmVtYWluaW5nIG5vZGVzIHRoYXQgd2VyZSBub3QgYm91bmQgdG8gZGF0YSB0byBleGl0LlxuICBmb3IgKGkgPSAwOyBpIDwgZ3JvdXBMZW5ndGg7ICsraSkge1xuICAgIGlmICgobm9kZSA9IGdyb3VwW2ldKSAmJiAobm9kZUJ5S2V5VmFsdWUuZ2V0KGtleVZhbHVlc1tpXSkgPT09IG5vZGUpKSB7XG4gICAgICBleGl0W2ldID0gbm9kZTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZGF0dW0obm9kZSkge1xuICByZXR1cm4gbm9kZS5fX2RhdGFfXztcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBBcnJheS5mcm9tKHRoaXMsIGRhdHVtKTtcblxuICB2YXIgYmluZCA9IGtleSA/IGJpbmRLZXkgOiBiaW5kSW5kZXgsXG4gICAgICBwYXJlbnRzID0gdGhpcy5fcGFyZW50cyxcbiAgICAgIGdyb3VwcyA9IHRoaXMuX2dyb3VwcztcblxuICBpZiAodHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIpIHZhbHVlID0gY29uc3RhbnQodmFsdWUpO1xuXG4gIGZvciAodmFyIG0gPSBncm91cHMubGVuZ3RoLCB1cGRhdGUgPSBuZXcgQXJyYXkobSksIGVudGVyID0gbmV3IEFycmF5KG0pLCBleGl0ID0gbmV3IEFycmF5KG0pLCBqID0gMDsgaiA8IG07ICsraikge1xuICAgIHZhciBwYXJlbnQgPSBwYXJlbnRzW2pdLFxuICAgICAgICBncm91cCA9IGdyb3Vwc1tqXSxcbiAgICAgICAgZ3JvdXBMZW5ndGggPSBncm91cC5sZW5ndGgsXG4gICAgICAgIGRhdGEgPSBhcnJheWxpa2UodmFsdWUuY2FsbChwYXJlbnQsIHBhcmVudCAmJiBwYXJlbnQuX19kYXRhX18sIGosIHBhcmVudHMpKSxcbiAgICAgICAgZGF0YUxlbmd0aCA9IGRhdGEubGVuZ3RoLFxuICAgICAgICBlbnRlckdyb3VwID0gZW50ZXJbal0gPSBuZXcgQXJyYXkoZGF0YUxlbmd0aCksXG4gICAgICAgIHVwZGF0ZUdyb3VwID0gdXBkYXRlW2pdID0gbmV3IEFycmF5KGRhdGFMZW5ndGgpLFxuICAgICAgICBleGl0R3JvdXAgPSBleGl0W2pdID0gbmV3IEFycmF5KGdyb3VwTGVuZ3RoKTtcblxuICAgIGJpbmQocGFyZW50LCBncm91cCwgZW50ZXJHcm91cCwgdXBkYXRlR3JvdXAsIGV4aXRHcm91cCwgZGF0YSwga2V5KTtcblxuICAgIC8vIE5vdyBjb25uZWN0IHRoZSBlbnRlciBub2RlcyB0byB0aGVpciBmb2xsb3dpbmcgdXBkYXRlIG5vZGUsIHN1Y2ggdGhhdFxuICAgIC8vIGFwcGVuZENoaWxkIGNhbiBpbnNlcnQgdGhlIG1hdGVyaWFsaXplZCBlbnRlciBub2RlIGJlZm9yZSB0aGlzIG5vZGUsXG4gICAgLy8gcmF0aGVyIHRoYW4gYXQgdGhlIGVuZCBvZiB0aGUgcGFyZW50IG5vZGUuXG4gICAgZm9yICh2YXIgaTAgPSAwLCBpMSA9IDAsIHByZXZpb3VzLCBuZXh0OyBpMCA8IGRhdGFMZW5ndGg7ICsraTApIHtcbiAgICAgIGlmIChwcmV2aW91cyA9IGVudGVyR3JvdXBbaTBdKSB7XG4gICAgICAgIGlmIChpMCA+PSBpMSkgaTEgPSBpMCArIDE7XG4gICAgICAgIHdoaWxlICghKG5leHQgPSB1cGRhdGVHcm91cFtpMV0pICYmICsraTEgPCBkYXRhTGVuZ3RoKTtcbiAgICAgICAgcHJldmlvdXMuX25leHQgPSBuZXh0IHx8IG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlID0gbmV3IFNlbGVjdGlvbih1cGRhdGUsIHBhcmVudHMpO1xuICB1cGRhdGUuX2VudGVyID0gZW50ZXI7XG4gIHVwZGF0ZS5fZXhpdCA9IGV4aXQ7XG4gIHJldHVybiB1cGRhdGU7XG59XG5cbi8vIEdpdmVuIHNvbWUgZGF0YSwgdGhpcyByZXR1cm5zIGFuIGFycmF5LWxpa2UgdmlldyBvZiBpdDogYW4gb2JqZWN0IHRoYXRcbi8vIGV4cG9zZXMgYSBsZW5ndGggcHJvcGVydHkgYW5kIGFsbG93cyBudW1lcmljIGluZGV4aW5nLiBOb3RlIHRoYXQgdW5saWtlXG4vLyBzZWxlY3RBbGwsIHRoaXMgaXNu4oCZdCB3b3JyaWVkIGFib3V0IOKAnGxpdmXigJ0gY29sbGVjdGlvbnMgYmVjYXVzZSB0aGUgcmVzdWx0aW5nXG4vLyBhcnJheSB3aWxsIG9ubHkgYmUgdXNlZCBicmllZmx5IHdoaWxlIGRhdGEgaXMgYmVpbmcgYm91bmQuIChJdCBpcyBwb3NzaWJsZSB0b1xuLy8gY2F1c2UgdGhlIGRhdGEgdG8gY2hhbmdlIHdoaWxlIGl0ZXJhdGluZyBieSB1c2luZyBhIGtleSBmdW5jdGlvbiwgYnV0IHBsZWFzZVxuLy8gZG9u4oCZdDsgd2XigJlkIHJhdGhlciBhdm9pZCBhIGdyYXR1aXRvdXMgY29weS4pXG5mdW5jdGlvbiBhcnJheWxpa2UoZGF0YSkge1xuICByZXR1cm4gdHlwZW9mIGRhdGEgPT09IFwib2JqZWN0XCIgJiYgXCJsZW5ndGhcIiBpbiBkYXRhXG4gICAgPyBkYXRhIC8vIEFycmF5LCBUeXBlZEFycmF5LCBOb2RlTGlzdCwgYXJyYXktbGlrZVxuICAgIDogQXJyYXkuZnJvbShkYXRhKTsgLy8gTWFwLCBTZXQsIGl0ZXJhYmxlLCBzdHJpbmcsIG9yIGFueXRoaW5nIGVsc2Vcbn1cbiIsImltcG9ydCBzcGFyc2UgZnJvbSBcIi4vc3BhcnNlLmpzXCI7XG5pbXBvcnQge1NlbGVjdGlvbn0gZnJvbSBcIi4vaW5kZXguanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgU2VsZWN0aW9uKHRoaXMuX2V4aXQgfHwgdGhpcy5fZ3JvdXBzLm1hcChzcGFyc2UpLCB0aGlzLl9wYXJlbnRzKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9uZW50ZXIsIG9udXBkYXRlLCBvbmV4aXQpIHtcbiAgdmFyIGVudGVyID0gdGhpcy5lbnRlcigpLCB1cGRhdGUgPSB0aGlzLCBleGl0ID0gdGhpcy5leGl0KCk7XG4gIGlmICh0eXBlb2Ygb25lbnRlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgZW50ZXIgPSBvbmVudGVyKGVudGVyKTtcbiAgICBpZiAoZW50ZXIpIGVudGVyID0gZW50ZXIuc2VsZWN0aW9uKCk7XG4gIH0gZWxzZSB7XG4gICAgZW50ZXIgPSBlbnRlci5hcHBlbmQob25lbnRlciArIFwiXCIpO1xuICB9XG4gIGlmIChvbnVwZGF0ZSAhPSBudWxsKSB7XG4gICAgdXBkYXRlID0gb251cGRhdGUodXBkYXRlKTtcbiAgICBpZiAodXBkYXRlKSB1cGRhdGUgPSB1cGRhdGUuc2VsZWN0aW9uKCk7XG4gIH1cbiAgaWYgKG9uZXhpdCA9PSBudWxsKSBleGl0LnJlbW92ZSgpOyBlbHNlIG9uZXhpdChleGl0KTtcbiAgcmV0dXJuIGVudGVyICYmIHVwZGF0ZSA/IGVudGVyLm1lcmdlKHVwZGF0ZSkub3JkZXIoKSA6IHVwZGF0ZTtcbn1cbiIsImltcG9ydCB7U2VsZWN0aW9ufSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihjb250ZXh0KSB7XG4gIHZhciBzZWxlY3Rpb24gPSBjb250ZXh0LnNlbGVjdGlvbiA/IGNvbnRleHQuc2VsZWN0aW9uKCkgOiBjb250ZXh0O1xuXG4gIGZvciAodmFyIGdyb3VwczAgPSB0aGlzLl9ncm91cHMsIGdyb3VwczEgPSBzZWxlY3Rpb24uX2dyb3VwcywgbTAgPSBncm91cHMwLmxlbmd0aCwgbTEgPSBncm91cHMxLmxlbmd0aCwgbSA9IE1hdGgubWluKG0wLCBtMSksIG1lcmdlcyA9IG5ldyBBcnJheShtMCksIGogPSAwOyBqIDwgbTsgKytqKSB7XG4gICAgZm9yICh2YXIgZ3JvdXAwID0gZ3JvdXBzMFtqXSwgZ3JvdXAxID0gZ3JvdXBzMVtqXSwgbiA9IGdyb3VwMC5sZW5ndGgsIG1lcmdlID0gbWVyZ2VzW2pdID0gbmV3IEFycmF5KG4pLCBub2RlLCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKG5vZGUgPSBncm91cDBbaV0gfHwgZ3JvdXAxW2ldKSB7XG4gICAgICAgIG1lcmdlW2ldID0gbm9kZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmb3IgKDsgaiA8IG0wOyArK2opIHtcbiAgICBtZXJnZXNbal0gPSBncm91cHMwW2pdO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBTZWxlY3Rpb24obWVyZ2VzLCB0aGlzLl9wYXJlbnRzKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuXG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgaiA9IC0xLCBtID0gZ3JvdXBzLmxlbmd0aDsgKytqIDwgbTspIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgaSA9IGdyb3VwLmxlbmd0aCAtIDEsIG5leHQgPSBncm91cFtpXSwgbm9kZTsgLS1pID49IDA7KSB7XG4gICAgICBpZiAobm9kZSA9IGdyb3VwW2ldKSB7XG4gICAgICAgIGlmIChuZXh0ICYmIG5vZGUuY29tcGFyZURvY3VtZW50UG9zaXRpb24obmV4dCkgXiA0KSBuZXh0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5vZGUsIG5leHQpO1xuICAgICAgICBuZXh0ID0gbm9kZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn1cbiIsImltcG9ydCB7U2VsZWN0aW9ufSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihjb21wYXJlKSB7XG4gIGlmICghY29tcGFyZSkgY29tcGFyZSA9IGFzY2VuZGluZztcblxuICBmdW5jdGlvbiBjb21wYXJlTm9kZShhLCBiKSB7XG4gICAgcmV0dXJuIGEgJiYgYiA/IGNvbXBhcmUoYS5fX2RhdGFfXywgYi5fX2RhdGFfXykgOiAhYSAtICFiO1xuICB9XG5cbiAgZm9yICh2YXIgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzLCBtID0gZ3JvdXBzLmxlbmd0aCwgc29ydGdyb3VwcyA9IG5ldyBBcnJheShtKSwgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgbiA9IGdyb3VwLmxlbmd0aCwgc29ydGdyb3VwID0gc29ydGdyb3Vwc1tqXSA9IG5ldyBBcnJheShuKSwgbm9kZSwgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmIChub2RlID0gZ3JvdXBbaV0pIHtcbiAgICAgICAgc29ydGdyb3VwW2ldID0gbm9kZTtcbiAgICAgIH1cbiAgICB9XG4gICAgc29ydGdyb3VwLnNvcnQoY29tcGFyZU5vZGUpO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBTZWxlY3Rpb24oc29ydGdyb3VwcywgdGhpcy5fcGFyZW50cykub3JkZXIoKTtcbn1cblxuZnVuY3Rpb24gYXNjZW5kaW5nKGEsIGIpIHtcbiAgcmV0dXJuIGEgPCBiID8gLTEgOiBhID4gYiA/IDEgOiBhID49IGIgPyAwIDogTmFOO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHZhciBjYWxsYmFjayA9IGFyZ3VtZW50c1swXTtcbiAgYXJndW1lbnRzWzBdID0gdGhpcztcbiAgY2FsbGJhY2suYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgcmV0dXJuIHRoaXM7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIEFycmF5LmZyb20odGhpcyk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcblxuICBmb3IgKHZhciBncm91cHMgPSB0aGlzLl9ncm91cHMsIGogPSAwLCBtID0gZ3JvdXBzLmxlbmd0aDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwID0gZ3JvdXBzW2pdLCBpID0gMCwgbiA9IGdyb3VwLmxlbmd0aDsgaSA8IG47ICsraSkge1xuICAgICAgdmFyIG5vZGUgPSBncm91cFtpXTtcbiAgICAgIGlmIChub2RlKSByZXR1cm4gbm9kZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICBsZXQgc2l6ZSA9IDA7XG4gIGZvciAoY29uc3Qgbm9kZSBvZiB0aGlzKSArK3NpemU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgcmV0dXJuIHNpemU7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICF0aGlzLm5vZGUoKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgZm9yICh2YXIgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzLCBqID0gMCwgbSA9IGdyb3Vwcy5sZW5ndGg7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgaSA9IDAsIG4gPSBncm91cC5sZW5ndGgsIG5vZGU7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmIChub2RlID0gZ3JvdXBbaV0pIGNhbGxiYWNrLmNhbGwobm9kZSwgbm9kZS5fX2RhdGFfXywgaSwgZ3JvdXApO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufVxuIiwiaW1wb3J0IG5hbWVzcGFjZSBmcm9tIFwiLi4vbmFtZXNwYWNlLmpzXCI7XG5cbmZ1bmN0aW9uIGF0dHJSZW1vdmUobmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGF0dHJSZW1vdmVOUyhmdWxsbmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGVOUyhmdWxsbmFtZS5zcGFjZSwgZnVsbG5hbWUubG9jYWwpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBhdHRyQ29uc3RhbnQobmFtZSwgdmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYXR0ckNvbnN0YW50TlMoZnVsbG5hbWUsIHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZU5TKGZ1bGxuYW1lLnNwYWNlLCBmdWxsbmFtZS5sb2NhbCwgdmFsdWUpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBhdHRyRnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciB2ID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAodiA9PSBudWxsKSB0aGlzLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgICBlbHNlIHRoaXMuc2V0QXR0cmlidXRlKG5hbWUsIHYpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBhdHRyRnVuY3Rpb25OUyhmdWxsbmFtZSwgdmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciB2ID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAodiA9PSBudWxsKSB0aGlzLnJlbW92ZUF0dHJpYnV0ZU5TKGZ1bGxuYW1lLnNwYWNlLCBmdWxsbmFtZS5sb2NhbCk7XG4gICAgZWxzZSB0aGlzLnNldEF0dHJpYnV0ZU5TKGZ1bGxuYW1lLnNwYWNlLCBmdWxsbmFtZS5sb2NhbCwgdik7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gIHZhciBmdWxsbmFtZSA9IG5hbWVzcGFjZShuYW1lKTtcblxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICB2YXIgbm9kZSA9IHRoaXMubm9kZSgpO1xuICAgIHJldHVybiBmdWxsbmFtZS5sb2NhbFxuICAgICAgICA/IG5vZGUuZ2V0QXR0cmlidXRlTlMoZnVsbG5hbWUuc3BhY2UsIGZ1bGxuYW1lLmxvY2FsKVxuICAgICAgICA6IG5vZGUuZ2V0QXR0cmlidXRlKGZ1bGxuYW1lKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzLmVhY2goKHZhbHVlID09IG51bGxcbiAgICAgID8gKGZ1bGxuYW1lLmxvY2FsID8gYXR0clJlbW92ZU5TIDogYXR0clJlbW92ZSkgOiAodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCJcbiAgICAgID8gKGZ1bGxuYW1lLmxvY2FsID8gYXR0ckZ1bmN0aW9uTlMgOiBhdHRyRnVuY3Rpb24pXG4gICAgICA6IChmdWxsbmFtZS5sb2NhbCA/IGF0dHJDb25zdGFudE5TIDogYXR0ckNvbnN0YW50KSkpKGZ1bGxuYW1lLCB2YWx1ZSkpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obm9kZSkge1xuICByZXR1cm4gKG5vZGUub3duZXJEb2N1bWVudCAmJiBub2RlLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcpIC8vIG5vZGUgaXMgYSBOb2RlXG4gICAgICB8fCAobm9kZS5kb2N1bWVudCAmJiBub2RlKSAvLyBub2RlIGlzIGEgV2luZG93XG4gICAgICB8fCBub2RlLmRlZmF1bHRWaWV3OyAvLyBub2RlIGlzIGEgRG9jdW1lbnRcbn1cbiIsImltcG9ydCBkZWZhdWx0VmlldyBmcm9tIFwiLi4vd2luZG93LmpzXCI7XG5cbmZ1bmN0aW9uIHN0eWxlUmVtb3ZlKG5hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc3R5bGUucmVtb3ZlUHJvcGVydHkobmFtZSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHN0eWxlQ29uc3RhbnQobmFtZSwgdmFsdWUsIHByaW9yaXR5KSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KG5hbWUsIHZhbHVlLCBwcmlvcml0eSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHN0eWxlRnVuY3Rpb24obmFtZSwgdmFsdWUsIHByaW9yaXR5KSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgdiA9IHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKHYgPT0gbnVsbCkgdGhpcy5zdHlsZS5yZW1vdmVQcm9wZXJ0eShuYW1lKTtcbiAgICBlbHNlIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkobmFtZSwgdiwgcHJpb3JpdHkpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lLCB2YWx1ZSwgcHJpb3JpdHkpIHtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPiAxXG4gICAgICA/IHRoaXMuZWFjaCgodmFsdWUgPT0gbnVsbFxuICAgICAgICAgICAgPyBzdHlsZVJlbW92ZSA6IHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgICAgICA/IHN0eWxlRnVuY3Rpb25cbiAgICAgICAgICAgIDogc3R5bGVDb25zdGFudCkobmFtZSwgdmFsdWUsIHByaW9yaXR5ID09IG51bGwgPyBcIlwiIDogcHJpb3JpdHkpKVxuICAgICAgOiBzdHlsZVZhbHVlKHRoaXMubm9kZSgpLCBuYW1lKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0eWxlVmFsdWUobm9kZSwgbmFtZSkge1xuICByZXR1cm4gbm9kZS5zdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKG5hbWUpXG4gICAgICB8fCBkZWZhdWx0Vmlldyhub2RlKS5nZXRDb21wdXRlZFN0eWxlKG5vZGUsIG51bGwpLmdldFByb3BlcnR5VmFsdWUobmFtZSk7XG59XG4iLCJmdW5jdGlvbiBwcm9wZXJ0eVJlbW92ZShuYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBkZWxldGUgdGhpc1tuYW1lXTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gcHJvcGVydHlDb25zdGFudChuYW1lLCB2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdGhpc1tuYW1lXSA9IHZhbHVlO1xuICB9O1xufVxuXG5mdW5jdGlvbiBwcm9wZXJ0eUZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgdiA9IHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKHYgPT0gbnVsbCkgZGVsZXRlIHRoaXNbbmFtZV07XG4gICAgZWxzZSB0aGlzW25hbWVdID0gdjtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPiAxXG4gICAgICA/IHRoaXMuZWFjaCgodmFsdWUgPT0gbnVsbFxuICAgICAgICAgID8gcHJvcGVydHlSZW1vdmUgOiB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICAgID8gcHJvcGVydHlGdW5jdGlvblxuICAgICAgICAgIDogcHJvcGVydHlDb25zdGFudCkobmFtZSwgdmFsdWUpKVxuICAgICAgOiB0aGlzLm5vZGUoKVtuYW1lXTtcbn1cbiIsImZ1bmN0aW9uIGNsYXNzQXJyYXkoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcudHJpbSgpLnNwbGl0KC9efFxccysvKTtcbn1cblxuZnVuY3Rpb24gY2xhc3NMaXN0KG5vZGUpIHtcbiAgcmV0dXJuIG5vZGUuY2xhc3NMaXN0IHx8IG5ldyBDbGFzc0xpc3Qobm9kZSk7XG59XG5cbmZ1bmN0aW9uIENsYXNzTGlzdChub2RlKSB7XG4gIHRoaXMuX25vZGUgPSBub2RlO1xuICB0aGlzLl9uYW1lcyA9IGNsYXNzQXJyYXkobm9kZS5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSB8fCBcIlwiKTtcbn1cblxuQ2xhc3NMaXN0LnByb3RvdHlwZSA9IHtcbiAgYWRkOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgdmFyIGkgPSB0aGlzLl9uYW1lcy5pbmRleE9mKG5hbWUpO1xuICAgIGlmIChpIDwgMCkge1xuICAgICAgdGhpcy5fbmFtZXMucHVzaChuYW1lKTtcbiAgICAgIHRoaXMuX25vZGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgdGhpcy5fbmFtZXMuam9pbihcIiBcIikpO1xuICAgIH1cbiAgfSxcbiAgcmVtb3ZlOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgdmFyIGkgPSB0aGlzLl9uYW1lcy5pbmRleE9mKG5hbWUpO1xuICAgIGlmIChpID49IDApIHtcbiAgICAgIHRoaXMuX25hbWVzLnNwbGljZShpLCAxKTtcbiAgICAgIHRoaXMuX25vZGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgdGhpcy5fbmFtZXMuam9pbihcIiBcIikpO1xuICAgIH1cbiAgfSxcbiAgY29udGFpbnM6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5fbmFtZXMuaW5kZXhPZihuYW1lKSA+PSAwO1xuICB9XG59O1xuXG5mdW5jdGlvbiBjbGFzc2VkQWRkKG5vZGUsIG5hbWVzKSB7XG4gIHZhciBsaXN0ID0gY2xhc3NMaXN0KG5vZGUpLCBpID0gLTEsIG4gPSBuYW1lcy5sZW5ndGg7XG4gIHdoaWxlICgrK2kgPCBuKSBsaXN0LmFkZChuYW1lc1tpXSk7XG59XG5cbmZ1bmN0aW9uIGNsYXNzZWRSZW1vdmUobm9kZSwgbmFtZXMpIHtcbiAgdmFyIGxpc3QgPSBjbGFzc0xpc3Qobm9kZSksIGkgPSAtMSwgbiA9IG5hbWVzLmxlbmd0aDtcbiAgd2hpbGUgKCsraSA8IG4pIGxpc3QucmVtb3ZlKG5hbWVzW2ldKTtcbn1cblxuZnVuY3Rpb24gY2xhc3NlZFRydWUobmFtZXMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIGNsYXNzZWRBZGQodGhpcywgbmFtZXMpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBjbGFzc2VkRmFsc2UobmFtZXMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIGNsYXNzZWRSZW1vdmUodGhpcywgbmFtZXMpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBjbGFzc2VkRnVuY3Rpb24obmFtZXMsIHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAodmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKSA/IGNsYXNzZWRBZGQgOiBjbGFzc2VkUmVtb3ZlKSh0aGlzLCBuYW1lcyk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gIHZhciBuYW1lcyA9IGNsYXNzQXJyYXkobmFtZSArIFwiXCIpO1xuXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgIHZhciBsaXN0ID0gY2xhc3NMaXN0KHRoaXMubm9kZSgpKSwgaSA9IC0xLCBuID0gbmFtZXMubGVuZ3RoO1xuICAgIHdoaWxlICgrK2kgPCBuKSBpZiAoIWxpc3QuY29udGFpbnMobmFtZXNbaV0pKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gdGhpcy5lYWNoKCh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgPyBjbGFzc2VkRnVuY3Rpb24gOiB2YWx1ZVxuICAgICAgPyBjbGFzc2VkVHJ1ZVxuICAgICAgOiBjbGFzc2VkRmFsc2UpKG5hbWVzLCB2YWx1ZSkpO1xufVxuIiwiZnVuY3Rpb24gdGV4dFJlbW92ZSgpIHtcbiAgdGhpcy50ZXh0Q29udGVudCA9IFwiXCI7XG59XG5cbmZ1bmN0aW9uIHRleHRDb25zdGFudCh2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy50ZXh0Q29udGVudCA9IHZhbHVlO1xuICB9O1xufVxuXG5mdW5jdGlvbiB0ZXh0RnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciB2ID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB0aGlzLnRleHRDb250ZW50ID0gdiA9PSBudWxsID8gXCJcIiA6IHY7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoXG4gICAgICA/IHRoaXMuZWFjaCh2YWx1ZSA9PSBudWxsXG4gICAgICAgICAgPyB0ZXh0UmVtb3ZlIDogKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgICAgPyB0ZXh0RnVuY3Rpb25cbiAgICAgICAgICA6IHRleHRDb25zdGFudCkodmFsdWUpKVxuICAgICAgOiB0aGlzLm5vZGUoKS50ZXh0Q29udGVudDtcbn1cbiIsImZ1bmN0aW9uIGh0bWxSZW1vdmUoKSB7XG4gIHRoaXMuaW5uZXJIVE1MID0gXCJcIjtcbn1cblxuZnVuY3Rpb24gaHRtbENvbnN0YW50KHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmlubmVySFRNTCA9IHZhbHVlO1xuICB9O1xufVxuXG5mdW5jdGlvbiBodG1sRnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciB2ID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB0aGlzLmlubmVySFRNTCA9IHYgPT0gbnVsbCA/IFwiXCIgOiB2O1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgPyB0aGlzLmVhY2godmFsdWUgPT0gbnVsbFxuICAgICAgICAgID8gaHRtbFJlbW92ZSA6ICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICAgID8gaHRtbEZ1bmN0aW9uXG4gICAgICAgICAgOiBodG1sQ29uc3RhbnQpKHZhbHVlKSlcbiAgICAgIDogdGhpcy5ub2RlKCkuaW5uZXJIVE1MO1xufVxuIiwiZnVuY3Rpb24gcmFpc2UoKSB7XG4gIGlmICh0aGlzLm5leHRTaWJsaW5nKSB0aGlzLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQodGhpcyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5lYWNoKHJhaXNlKTtcbn1cbiIsImZ1bmN0aW9uIGxvd2VyKCkge1xuICBpZiAodGhpcy5wcmV2aW91c1NpYmxpbmcpIHRoaXMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGhpcywgdGhpcy5wYXJlbnROb2RlLmZpcnN0Q2hpbGQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuZWFjaChsb3dlcik7XG59XG4iLCJpbXBvcnQgY3JlYXRvciBmcm9tIFwiLi4vY3JlYXRvci5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lKSB7XG4gIHZhciBjcmVhdGUgPSB0eXBlb2YgbmFtZSA9PT0gXCJmdW5jdGlvblwiID8gbmFtZSA6IGNyZWF0b3IobmFtZSk7XG4gIHJldHVybiB0aGlzLnNlbGVjdChmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5hcHBlbmRDaGlsZChjcmVhdGUuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH0pO1xufVxuIiwiaW1wb3J0IGNyZWF0b3IgZnJvbSBcIi4uL2NyZWF0b3IuanNcIjtcbmltcG9ydCBzZWxlY3RvciBmcm9tIFwiLi4vc2VsZWN0b3IuanNcIjtcblxuZnVuY3Rpb24gY29uc3RhbnROdWxsKCkge1xuICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSwgYmVmb3JlKSB7XG4gIHZhciBjcmVhdGUgPSB0eXBlb2YgbmFtZSA9PT0gXCJmdW5jdGlvblwiID8gbmFtZSA6IGNyZWF0b3IobmFtZSksXG4gICAgICBzZWxlY3QgPSBiZWZvcmUgPT0gbnVsbCA/IGNvbnN0YW50TnVsbCA6IHR5cGVvZiBiZWZvcmUgPT09IFwiZnVuY3Rpb25cIiA/IGJlZm9yZSA6IHNlbGVjdG9yKGJlZm9yZSk7XG4gIHJldHVybiB0aGlzLnNlbGVjdChmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5pbnNlcnRCZWZvcmUoY3JlYXRlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyksIHNlbGVjdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IG51bGwpO1xuICB9KTtcbn1cbiIsImZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgdmFyIHBhcmVudCA9IHRoaXMucGFyZW50Tm9kZTtcbiAgaWYgKHBhcmVudCkgcGFyZW50LnJlbW92ZUNoaWxkKHRoaXMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuZWFjaChyZW1vdmUpO1xufVxuIiwiZnVuY3Rpb24gc2VsZWN0aW9uX2Nsb25lU2hhbGxvdygpIHtcbiAgdmFyIGNsb25lID0gdGhpcy5jbG9uZU5vZGUoZmFsc2UpLCBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGU7XG4gIHJldHVybiBwYXJlbnQgPyBwYXJlbnQuaW5zZXJ0QmVmb3JlKGNsb25lLCB0aGlzLm5leHRTaWJsaW5nKSA6IGNsb25lO1xufVxuXG5mdW5jdGlvbiBzZWxlY3Rpb25fY2xvbmVEZWVwKCkge1xuICB2YXIgY2xvbmUgPSB0aGlzLmNsb25lTm9kZSh0cnVlKSwgcGFyZW50ID0gdGhpcy5wYXJlbnROb2RlO1xuICByZXR1cm4gcGFyZW50ID8gcGFyZW50Lmluc2VydEJlZm9yZShjbG9uZSwgdGhpcy5uZXh0U2libGluZykgOiBjbG9uZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oZGVlcCkge1xuICByZXR1cm4gdGhpcy5zZWxlY3QoZGVlcCA/IHNlbGVjdGlvbl9jbG9uZURlZXAgOiBzZWxlY3Rpb25fY2xvbmVTaGFsbG93KTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoXG4gICAgICA/IHRoaXMucHJvcGVydHkoXCJfX2RhdGFfX1wiLCB2YWx1ZSlcbiAgICAgIDogdGhpcy5ub2RlKCkuX19kYXRhX187XG59XG4iLCJmdW5jdGlvbiBjb250ZXh0TGlzdGVuZXIobGlzdGVuZXIpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgbGlzdGVuZXIuY2FsbCh0aGlzLCBldmVudCwgdGhpcy5fX2RhdGFfXyk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHBhcnNlVHlwZW5hbWVzKHR5cGVuYW1lcykge1xuICByZXR1cm4gdHlwZW5hbWVzLnRyaW0oKS5zcGxpdCgvXnxcXHMrLykubWFwKGZ1bmN0aW9uKHQpIHtcbiAgICB2YXIgbmFtZSA9IFwiXCIsIGkgPSB0LmluZGV4T2YoXCIuXCIpO1xuICAgIGlmIChpID49IDApIG5hbWUgPSB0LnNsaWNlKGkgKyAxKSwgdCA9IHQuc2xpY2UoMCwgaSk7XG4gICAgcmV0dXJuIHt0eXBlOiB0LCBuYW1lOiBuYW1lfTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG9uUmVtb3ZlKHR5cGVuYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgb24gPSB0aGlzLl9fb247XG4gICAgaWYgKCFvbikgcmV0dXJuO1xuICAgIGZvciAodmFyIGogPSAwLCBpID0gLTEsIG0gPSBvbi5sZW5ndGgsIG87IGogPCBtOyArK2opIHtcbiAgICAgIGlmIChvID0gb25bal0sICghdHlwZW5hbWUudHlwZSB8fCBvLnR5cGUgPT09IHR5cGVuYW1lLnR5cGUpICYmIG8ubmFtZSA9PT0gdHlwZW5hbWUubmFtZSkge1xuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoby50eXBlLCBvLmxpc3RlbmVyLCBvLm9wdGlvbnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb25bKytpXSA9IG87XG4gICAgICB9XG4gICAgfVxuICAgIGlmICgrK2kpIG9uLmxlbmd0aCA9IGk7XG4gICAgZWxzZSBkZWxldGUgdGhpcy5fX29uO1xuICB9O1xufVxuXG5mdW5jdGlvbiBvbkFkZCh0eXBlbmFtZSwgdmFsdWUsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBvbiA9IHRoaXMuX19vbiwgbywgbGlzdGVuZXIgPSBjb250ZXh0TGlzdGVuZXIodmFsdWUpO1xuICAgIGlmIChvbikgZm9yICh2YXIgaiA9IDAsIG0gPSBvbi5sZW5ndGg7IGogPCBtOyArK2opIHtcbiAgICAgIGlmICgobyA9IG9uW2pdKS50eXBlID09PSB0eXBlbmFtZS50eXBlICYmIG8ubmFtZSA9PT0gdHlwZW5hbWUubmFtZSkge1xuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoby50eXBlLCBvLmxpc3RlbmVyLCBvLm9wdGlvbnMpO1xuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoby50eXBlLCBvLmxpc3RlbmVyID0gbGlzdGVuZXIsIG8ub3B0aW9ucyA9IG9wdGlvbnMpO1xuICAgICAgICBvLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKHR5cGVuYW1lLnR5cGUsIGxpc3RlbmVyLCBvcHRpb25zKTtcbiAgICBvID0ge3R5cGU6IHR5cGVuYW1lLnR5cGUsIG5hbWU6IHR5cGVuYW1lLm5hbWUsIHZhbHVlOiB2YWx1ZSwgbGlzdGVuZXI6IGxpc3RlbmVyLCBvcHRpb25zOiBvcHRpb25zfTtcbiAgICBpZiAoIW9uKSB0aGlzLl9fb24gPSBbb107XG4gICAgZWxzZSBvbi5wdXNoKG8pO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih0eXBlbmFtZSwgdmFsdWUsIG9wdGlvbnMpIHtcbiAgdmFyIHR5cGVuYW1lcyA9IHBhcnNlVHlwZW5hbWVzKHR5cGVuYW1lICsgXCJcIiksIGksIG4gPSB0eXBlbmFtZXMubGVuZ3RoLCB0O1xuXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgIHZhciBvbiA9IHRoaXMubm9kZSgpLl9fb247XG4gICAgaWYgKG9uKSBmb3IgKHZhciBqID0gMCwgbSA9IG9uLmxlbmd0aCwgbzsgaiA8IG07ICsraikge1xuICAgICAgZm9yIChpID0gMCwgbyA9IG9uW2pdOyBpIDwgbjsgKytpKSB7XG4gICAgICAgIGlmICgodCA9IHR5cGVuYW1lc1tpXSkudHlwZSA9PT0gby50eXBlICYmIHQubmFtZSA9PT0gby5uYW1lKSB7XG4gICAgICAgICAgcmV0dXJuIG8udmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgb24gPSB2YWx1ZSA/IG9uQWRkIDogb25SZW1vdmU7XG4gIGZvciAoaSA9IDA7IGkgPCBuOyArK2kpIHRoaXMuZWFjaChvbih0eXBlbmFtZXNbaV0sIHZhbHVlLCBvcHRpb25zKSk7XG4gIHJldHVybiB0aGlzO1xufVxuIiwiaW1wb3J0IGRlZmF1bHRWaWV3IGZyb20gXCIuLi93aW5kb3cuanNcIjtcblxuZnVuY3Rpb24gZGlzcGF0Y2hFdmVudChub2RlLCB0eXBlLCBwYXJhbXMpIHtcbiAgdmFyIHdpbmRvdyA9IGRlZmF1bHRWaWV3KG5vZGUpLFxuICAgICAgZXZlbnQgPSB3aW5kb3cuQ3VzdG9tRXZlbnQ7XG5cbiAgaWYgKHR5cGVvZiBldmVudCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgZXZlbnQgPSBuZXcgZXZlbnQodHlwZSwgcGFyYW1zKTtcbiAgfSBlbHNlIHtcbiAgICBldmVudCA9IHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFdmVudChcIkV2ZW50XCIpO1xuICAgIGlmIChwYXJhbXMpIGV2ZW50LmluaXRFdmVudCh0eXBlLCBwYXJhbXMuYnViYmxlcywgcGFyYW1zLmNhbmNlbGFibGUpLCBldmVudC5kZXRhaWwgPSBwYXJhbXMuZGV0YWlsO1xuICAgIGVsc2UgZXZlbnQuaW5pdEV2ZW50KHR5cGUsIGZhbHNlLCBmYWxzZSk7XG4gIH1cblxuICBub2RlLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xufVxuXG5mdW5jdGlvbiBkaXNwYXRjaENvbnN0YW50KHR5cGUsIHBhcmFtcykge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGRpc3BhdGNoRXZlbnQodGhpcywgdHlwZSwgcGFyYW1zKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gZGlzcGF0Y2hGdW5jdGlvbih0eXBlLCBwYXJhbXMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkaXNwYXRjaEV2ZW50KHRoaXMsIHR5cGUsIHBhcmFtcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odHlwZSwgcGFyYW1zKSB7XG4gIHJldHVybiB0aGlzLmVhY2goKHR5cGVvZiBwYXJhbXMgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgPyBkaXNwYXRjaEZ1bmN0aW9uXG4gICAgICA6IGRpc3BhdGNoQ29uc3RhbnQpKHR5cGUsIHBhcmFtcykpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24qKCkge1xuICBmb3IgKHZhciBncm91cHMgPSB0aGlzLl9ncm91cHMsIGogPSAwLCBtID0gZ3JvdXBzLmxlbmd0aDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwID0gZ3JvdXBzW2pdLCBpID0gMCwgbiA9IGdyb3VwLmxlbmd0aCwgbm9kZTsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKG5vZGUgPSBncm91cFtpXSkgeWllbGQgbm9kZTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBzZWxlY3Rpb25fc2VsZWN0IGZyb20gXCIuL3NlbGVjdC5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9zZWxlY3RBbGwgZnJvbSBcIi4vc2VsZWN0QWxsLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX3NlbGVjdENoaWxkIGZyb20gXCIuL3NlbGVjdENoaWxkLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX3NlbGVjdENoaWxkcmVuIGZyb20gXCIuL3NlbGVjdENoaWxkcmVuLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2ZpbHRlciBmcm9tIFwiLi9maWx0ZXIuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fZGF0YSBmcm9tIFwiLi9kYXRhLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2VudGVyIGZyb20gXCIuL2VudGVyLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2V4aXQgZnJvbSBcIi4vZXhpdC5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9qb2luIGZyb20gXCIuL2pvaW4uanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fbWVyZ2UgZnJvbSBcIi4vbWVyZ2UuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fb3JkZXIgZnJvbSBcIi4vb3JkZXIuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fc29ydCBmcm9tIFwiLi9zb3J0LmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2NhbGwgZnJvbSBcIi4vY2FsbC5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9ub2RlcyBmcm9tIFwiLi9ub2Rlcy5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9ub2RlIGZyb20gXCIuL25vZGUuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fc2l6ZSBmcm9tIFwiLi9zaXplLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2VtcHR5IGZyb20gXCIuL2VtcHR5LmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2VhY2ggZnJvbSBcIi4vZWFjaC5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9hdHRyIGZyb20gXCIuL2F0dHIuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fc3R5bGUgZnJvbSBcIi4vc3R5bGUuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fcHJvcGVydHkgZnJvbSBcIi4vcHJvcGVydHkuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fY2xhc3NlZCBmcm9tIFwiLi9jbGFzc2VkLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX3RleHQgZnJvbSBcIi4vdGV4dC5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9odG1sIGZyb20gXCIuL2h0bWwuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fcmFpc2UgZnJvbSBcIi4vcmFpc2UuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fbG93ZXIgZnJvbSBcIi4vbG93ZXIuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fYXBwZW5kIGZyb20gXCIuL2FwcGVuZC5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9pbnNlcnQgZnJvbSBcIi4vaW5zZXJ0LmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX3JlbW92ZSBmcm9tIFwiLi9yZW1vdmUuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fY2xvbmUgZnJvbSBcIi4vY2xvbmUuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fZGF0dW0gZnJvbSBcIi4vZGF0dW0uanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fb24gZnJvbSBcIi4vb24uanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fZGlzcGF0Y2ggZnJvbSBcIi4vZGlzcGF0Y2guanNcIjtcbmltcG9ydCBzZWxlY3Rpb25faXRlcmF0b3IgZnJvbSBcIi4vaXRlcmF0b3IuanNcIjtcblxuZXhwb3J0IHZhciByb290ID0gW251bGxdO1xuXG5leHBvcnQgZnVuY3Rpb24gU2VsZWN0aW9uKGdyb3VwcywgcGFyZW50cykge1xuICB0aGlzLl9ncm91cHMgPSBncm91cHM7XG4gIHRoaXMuX3BhcmVudHMgPSBwYXJlbnRzO1xufVxuXG5mdW5jdGlvbiBzZWxlY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgU2VsZWN0aW9uKFtbZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50XV0sIHJvb3QpO1xufVxuXG5mdW5jdGlvbiBzZWxlY3Rpb25fc2VsZWN0aW9uKCkge1xuICByZXR1cm4gdGhpcztcbn1cblxuU2VsZWN0aW9uLnByb3RvdHlwZSA9IHNlbGVjdGlvbi5wcm90b3R5cGUgPSB7XG4gIGNvbnN0cnVjdG9yOiBTZWxlY3Rpb24sXG4gIHNlbGVjdDogc2VsZWN0aW9uX3NlbGVjdCxcbiAgc2VsZWN0QWxsOiBzZWxlY3Rpb25fc2VsZWN0QWxsLFxuICBzZWxlY3RDaGlsZDogc2VsZWN0aW9uX3NlbGVjdENoaWxkLFxuICBzZWxlY3RDaGlsZHJlbjogc2VsZWN0aW9uX3NlbGVjdENoaWxkcmVuLFxuICBmaWx0ZXI6IHNlbGVjdGlvbl9maWx0ZXIsXG4gIGRhdGE6IHNlbGVjdGlvbl9kYXRhLFxuICBlbnRlcjogc2VsZWN0aW9uX2VudGVyLFxuICBleGl0OiBzZWxlY3Rpb25fZXhpdCxcbiAgam9pbjogc2VsZWN0aW9uX2pvaW4sXG4gIG1lcmdlOiBzZWxlY3Rpb25fbWVyZ2UsXG4gIHNlbGVjdGlvbjogc2VsZWN0aW9uX3NlbGVjdGlvbixcbiAgb3JkZXI6IHNlbGVjdGlvbl9vcmRlcixcbiAgc29ydDogc2VsZWN0aW9uX3NvcnQsXG4gIGNhbGw6IHNlbGVjdGlvbl9jYWxsLFxuICBub2Rlczogc2VsZWN0aW9uX25vZGVzLFxuICBub2RlOiBzZWxlY3Rpb25fbm9kZSxcbiAgc2l6ZTogc2VsZWN0aW9uX3NpemUsXG4gIGVtcHR5OiBzZWxlY3Rpb25fZW1wdHksXG4gIGVhY2g6IHNlbGVjdGlvbl9lYWNoLFxuICBhdHRyOiBzZWxlY3Rpb25fYXR0cixcbiAgc3R5bGU6IHNlbGVjdGlvbl9zdHlsZSxcbiAgcHJvcGVydHk6IHNlbGVjdGlvbl9wcm9wZXJ0eSxcbiAgY2xhc3NlZDogc2VsZWN0aW9uX2NsYXNzZWQsXG4gIHRleHQ6IHNlbGVjdGlvbl90ZXh0LFxuICBodG1sOiBzZWxlY3Rpb25faHRtbCxcbiAgcmFpc2U6IHNlbGVjdGlvbl9yYWlzZSxcbiAgbG93ZXI6IHNlbGVjdGlvbl9sb3dlcixcbiAgYXBwZW5kOiBzZWxlY3Rpb25fYXBwZW5kLFxuICBpbnNlcnQ6IHNlbGVjdGlvbl9pbnNlcnQsXG4gIHJlbW92ZTogc2VsZWN0aW9uX3JlbW92ZSxcbiAgY2xvbmU6IHNlbGVjdGlvbl9jbG9uZSxcbiAgZGF0dW06IHNlbGVjdGlvbl9kYXR1bSxcbiAgb246IHNlbGVjdGlvbl9vbixcbiAgZGlzcGF0Y2g6IHNlbGVjdGlvbl9kaXNwYXRjaCxcbiAgW1N5bWJvbC5pdGVyYXRvcl06IHNlbGVjdGlvbl9pdGVyYXRvclxufTtcblxuZXhwb3J0IGRlZmF1bHQgc2VsZWN0aW9uO1xuIiwiaW1wb3J0IHtTZWxlY3Rpb24sIHJvb3R9IGZyb20gXCIuL3NlbGVjdGlvbi9pbmRleC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzZWxlY3Rvcikge1xuICByZXR1cm4gdHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiXG4gICAgICA/IG5ldyBTZWxlY3Rpb24oW1tkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKV1dLCBbZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50XSlcbiAgICAgIDogbmV3IFNlbGVjdGlvbihbW3NlbGVjdG9yXV0sIHJvb3QpO1xufVxuIiwiaW1wb3J0IGNyZWF0b3IgZnJvbSBcIi4vY3JlYXRvci5qc1wiO1xuaW1wb3J0IHNlbGVjdCBmcm9tIFwiLi9zZWxlY3QuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSkge1xuICByZXR1cm4gc2VsZWN0KGNyZWF0b3IobmFtZSkuY2FsbChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGxldCBzb3VyY2VFdmVudDtcbiAgd2hpbGUgKHNvdXJjZUV2ZW50ID0gZXZlbnQuc291cmNlRXZlbnQpIGV2ZW50ID0gc291cmNlRXZlbnQ7XG4gIHJldHVybiBldmVudDtcbn1cbiIsImltcG9ydCBzb3VyY2VFdmVudCBmcm9tIFwiLi9zb3VyY2VFdmVudC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihldmVudCwgbm9kZSkge1xuICBldmVudCA9IHNvdXJjZUV2ZW50KGV2ZW50KTtcbiAgaWYgKG5vZGUgPT09IHVuZGVmaW5lZCkgbm9kZSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG4gIGlmIChub2RlKSB7XG4gICAgdmFyIHN2ZyA9IG5vZGUub3duZXJTVkdFbGVtZW50IHx8IG5vZGU7XG4gICAgaWYgKHN2Zy5jcmVhdGVTVkdQb2ludCkge1xuICAgICAgdmFyIHBvaW50ID0gc3ZnLmNyZWF0ZVNWR1BvaW50KCk7XG4gICAgICBwb2ludC54ID0gZXZlbnQuY2xpZW50WCwgcG9pbnQueSA9IGV2ZW50LmNsaWVudFk7XG4gICAgICBwb2ludCA9IHBvaW50Lm1hdHJpeFRyYW5zZm9ybShub2RlLmdldFNjcmVlbkNUTSgpLmludmVyc2UoKSk7XG4gICAgICByZXR1cm4gW3BvaW50LngsIHBvaW50LnldO1xuICAgIH1cbiAgICBpZiAobm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QpIHtcbiAgICAgIHZhciByZWN0ID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHJldHVybiBbZXZlbnQuY2xpZW50WCAtIHJlY3QubGVmdCAtIG5vZGUuY2xpZW50TGVmdCwgZXZlbnQuY2xpZW50WSAtIHJlY3QudG9wIC0gbm9kZS5jbGllbnRUb3BdO1xuICAgIH1cbiAgfVxuICByZXR1cm4gW2V2ZW50LnBhZ2VYLCBldmVudC5wYWdlWV07XG59XG4iLCIvLyBUaGVzZSBhcmUgdHlwaWNhbGx5IHVzZWQgaW4gY29uanVuY3Rpb24gd2l0aCBub2V2ZW50IHRvIGVuc3VyZSB0aGF0IHdlIGNhblxuLy8gcHJldmVudERlZmF1bHQgb24gdGhlIGV2ZW50LlxuZXhwb3J0IGNvbnN0IG5vbnBhc3NpdmUgPSB7cGFzc2l2ZTogZmFsc2V9O1xuZXhwb3J0IGNvbnN0IG5vbnBhc3NpdmVjYXB0dXJlID0ge2NhcHR1cmU6IHRydWUsIHBhc3NpdmU6IGZhbHNlfTtcblxuZXhwb3J0IGZ1bmN0aW9uIG5vcHJvcGFnYXRpb24oZXZlbnQpIHtcbiAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGV2ZW50KSB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xufVxuIiwiaW1wb3J0IHtzZWxlY3R9IGZyb20gXCJkMy1zZWxlY3Rpb25cIjtcbmltcG9ydCBub2V2ZW50LCB7bm9ucGFzc2l2ZWNhcHR1cmV9IGZyb20gXCIuL25vZXZlbnQuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmlldykge1xuICB2YXIgcm9vdCA9IHZpZXcuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LFxuICAgICAgc2VsZWN0aW9uID0gc2VsZWN0KHZpZXcpLm9uKFwiZHJhZ3N0YXJ0LmRyYWdcIiwgbm9ldmVudCwgbm9ucGFzc2l2ZWNhcHR1cmUpO1xuICBpZiAoXCJvbnNlbGVjdHN0YXJ0XCIgaW4gcm9vdCkge1xuICAgIHNlbGVjdGlvbi5vbihcInNlbGVjdHN0YXJ0LmRyYWdcIiwgbm9ldmVudCwgbm9ucGFzc2l2ZWNhcHR1cmUpO1xuICB9IGVsc2Uge1xuICAgIHJvb3QuX19ub3NlbGVjdCA9IHJvb3Quc3R5bGUuTW96VXNlclNlbGVjdDtcbiAgICByb290LnN0eWxlLk1velVzZXJTZWxlY3QgPSBcIm5vbmVcIjtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24geWVzZHJhZyh2aWV3LCBub2NsaWNrKSB7XG4gIHZhciByb290ID0gdmlldy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsXG4gICAgICBzZWxlY3Rpb24gPSBzZWxlY3Qodmlldykub24oXCJkcmFnc3RhcnQuZHJhZ1wiLCBudWxsKTtcbiAgaWYgKG5vY2xpY2spIHtcbiAgICBzZWxlY3Rpb24ub24oXCJjbGljay5kcmFnXCIsIG5vZXZlbnQsIG5vbnBhc3NpdmVjYXB0dXJlKTtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyBzZWxlY3Rpb24ub24oXCJjbGljay5kcmFnXCIsIG51bGwpOyB9LCAwKTtcbiAgfVxuICBpZiAoXCJvbnNlbGVjdHN0YXJ0XCIgaW4gcm9vdCkge1xuICAgIHNlbGVjdGlvbi5vbihcInNlbGVjdHN0YXJ0LmRyYWdcIiwgbnVsbCk7XG4gIH0gZWxzZSB7XG4gICAgcm9vdC5zdHlsZS5Nb3pVc2VyU2VsZWN0ID0gcm9vdC5fX25vc2VsZWN0O1xuICAgIGRlbGV0ZSByb290Ll9fbm9zZWxlY3Q7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGNvbnN0cnVjdG9yLCBmYWN0b3J5LCBwcm90b3R5cGUpIHtcbiAgY29uc3RydWN0b3IucHJvdG90eXBlID0gZmFjdG9yeS5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG4gIHByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kKHBhcmVudCwgZGVmaW5pdGlvbikge1xuICB2YXIgcHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShwYXJlbnQucHJvdG90eXBlKTtcbiAgZm9yICh2YXIga2V5IGluIGRlZmluaXRpb24pIHByb3RvdHlwZVtrZXldID0gZGVmaW5pdGlvbltrZXldO1xuICByZXR1cm4gcHJvdG90eXBlO1xufVxuIiwiaW1wb3J0IGRlZmluZSwge2V4dGVuZH0gZnJvbSBcIi4vZGVmaW5lLmpzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBDb2xvcigpIHt9XG5cbmV4cG9ydCB2YXIgZGFya2VyID0gMC43O1xuZXhwb3J0IHZhciBicmlnaHRlciA9IDEgLyBkYXJrZXI7XG5cbnZhciByZUkgPSBcIlxcXFxzKihbKy1dP1xcXFxkKylcXFxccypcIixcbiAgICByZU4gPSBcIlxcXFxzKihbKy1dPyg/OlxcXFxkKlxcXFwuKT9cXFxcZCsoPzpbZUVdWystXT9cXFxcZCspPylcXFxccypcIixcbiAgICByZVAgPSBcIlxcXFxzKihbKy1dPyg/OlxcXFxkKlxcXFwuKT9cXFxcZCsoPzpbZUVdWystXT9cXFxcZCspPyklXFxcXHMqXCIsXG4gICAgcmVIZXggPSAvXiMoWzAtOWEtZl17Myw4fSkkLyxcbiAgICByZVJnYkludGVnZXIgPSBuZXcgUmVnRXhwKGBecmdiXFxcXCgke3JlSX0sJHtyZUl9LCR7cmVJfVxcXFwpJGApLFxuICAgIHJlUmdiUGVyY2VudCA9IG5ldyBSZWdFeHAoYF5yZ2JcXFxcKCR7cmVQfSwke3JlUH0sJHtyZVB9XFxcXCkkYCksXG4gICAgcmVSZ2JhSW50ZWdlciA9IG5ldyBSZWdFeHAoYF5yZ2JhXFxcXCgke3JlSX0sJHtyZUl9LCR7cmVJfSwke3JlTn1cXFxcKSRgKSxcbiAgICByZVJnYmFQZXJjZW50ID0gbmV3IFJlZ0V4cChgXnJnYmFcXFxcKCR7cmVQfSwke3JlUH0sJHtyZVB9LCR7cmVOfVxcXFwpJGApLFxuICAgIHJlSHNsUGVyY2VudCA9IG5ldyBSZWdFeHAoYF5oc2xcXFxcKCR7cmVOfSwke3JlUH0sJHtyZVB9XFxcXCkkYCksXG4gICAgcmVIc2xhUGVyY2VudCA9IG5ldyBSZWdFeHAoYF5oc2xhXFxcXCgke3JlTn0sJHtyZVB9LCR7cmVQfSwke3JlTn1cXFxcKSRgKTtcblxudmFyIG5hbWVkID0ge1xuICBhbGljZWJsdWU6IDB4ZjBmOGZmLFxuICBhbnRpcXVld2hpdGU6IDB4ZmFlYmQ3LFxuICBhcXVhOiAweDAwZmZmZixcbiAgYXF1YW1hcmluZTogMHg3ZmZmZDQsXG4gIGF6dXJlOiAweGYwZmZmZixcbiAgYmVpZ2U6IDB4ZjVmNWRjLFxuICBiaXNxdWU6IDB4ZmZlNGM0LFxuICBibGFjazogMHgwMDAwMDAsXG4gIGJsYW5jaGVkYWxtb25kOiAweGZmZWJjZCxcbiAgYmx1ZTogMHgwMDAwZmYsXG4gIGJsdWV2aW9sZXQ6IDB4OGEyYmUyLFxuICBicm93bjogMHhhNTJhMmEsXG4gIGJ1cmx5d29vZDogMHhkZWI4ODcsXG4gIGNhZGV0Ymx1ZTogMHg1ZjllYTAsXG4gIGNoYXJ0cmV1c2U6IDB4N2ZmZjAwLFxuICBjaG9jb2xhdGU6IDB4ZDI2OTFlLFxuICBjb3JhbDogMHhmZjdmNTAsXG4gIGNvcm5mbG93ZXJibHVlOiAweDY0OTVlZCxcbiAgY29ybnNpbGs6IDB4ZmZmOGRjLFxuICBjcmltc29uOiAweGRjMTQzYyxcbiAgY3lhbjogMHgwMGZmZmYsXG4gIGRhcmtibHVlOiAweDAwMDA4YixcbiAgZGFya2N5YW46IDB4MDA4YjhiLFxuICBkYXJrZ29sZGVucm9kOiAweGI4ODYwYixcbiAgZGFya2dyYXk6IDB4YTlhOWE5LFxuICBkYXJrZ3JlZW46IDB4MDA2NDAwLFxuICBkYXJrZ3JleTogMHhhOWE5YTksXG4gIGRhcmtraGFraTogMHhiZGI3NmIsXG4gIGRhcmttYWdlbnRhOiAweDhiMDA4YixcbiAgZGFya29saXZlZ3JlZW46IDB4NTU2YjJmLFxuICBkYXJrb3JhbmdlOiAweGZmOGMwMCxcbiAgZGFya29yY2hpZDogMHg5OTMyY2MsXG4gIGRhcmtyZWQ6IDB4OGIwMDAwLFxuICBkYXJrc2FsbW9uOiAweGU5OTY3YSxcbiAgZGFya3NlYWdyZWVuOiAweDhmYmM4ZixcbiAgZGFya3NsYXRlYmx1ZTogMHg0ODNkOGIsXG4gIGRhcmtzbGF0ZWdyYXk6IDB4MmY0ZjRmLFxuICBkYXJrc2xhdGVncmV5OiAweDJmNGY0ZixcbiAgZGFya3R1cnF1b2lzZTogMHgwMGNlZDEsXG4gIGRhcmt2aW9sZXQ6IDB4OTQwMGQzLFxuICBkZWVwcGluazogMHhmZjE0OTMsXG4gIGRlZXBza3libHVlOiAweDAwYmZmZixcbiAgZGltZ3JheTogMHg2OTY5NjksXG4gIGRpbWdyZXk6IDB4Njk2OTY5LFxuICBkb2RnZXJibHVlOiAweDFlOTBmZixcbiAgZmlyZWJyaWNrOiAweGIyMjIyMixcbiAgZmxvcmFsd2hpdGU6IDB4ZmZmYWYwLFxuICBmb3Jlc3RncmVlbjogMHgyMjhiMjIsXG4gIGZ1Y2hzaWE6IDB4ZmYwMGZmLFxuICBnYWluc2Jvcm86IDB4ZGNkY2RjLFxuICBnaG9zdHdoaXRlOiAweGY4ZjhmZixcbiAgZ29sZDogMHhmZmQ3MDAsXG4gIGdvbGRlbnJvZDogMHhkYWE1MjAsXG4gIGdyYXk6IDB4ODA4MDgwLFxuICBncmVlbjogMHgwMDgwMDAsXG4gIGdyZWVueWVsbG93OiAweGFkZmYyZixcbiAgZ3JleTogMHg4MDgwODAsXG4gIGhvbmV5ZGV3OiAweGYwZmZmMCxcbiAgaG90cGluazogMHhmZjY5YjQsXG4gIGluZGlhbnJlZDogMHhjZDVjNWMsXG4gIGluZGlnbzogMHg0YjAwODIsXG4gIGl2b3J5OiAweGZmZmZmMCxcbiAga2hha2k6IDB4ZjBlNjhjLFxuICBsYXZlbmRlcjogMHhlNmU2ZmEsXG4gIGxhdmVuZGVyYmx1c2g6IDB4ZmZmMGY1LFxuICBsYXduZ3JlZW46IDB4N2NmYzAwLFxuICBsZW1vbmNoaWZmb246IDB4ZmZmYWNkLFxuICBsaWdodGJsdWU6IDB4YWRkOGU2LFxuICBsaWdodGNvcmFsOiAweGYwODA4MCxcbiAgbGlnaHRjeWFuOiAweGUwZmZmZixcbiAgbGlnaHRnb2xkZW5yb2R5ZWxsb3c6IDB4ZmFmYWQyLFxuICBsaWdodGdyYXk6IDB4ZDNkM2QzLFxuICBsaWdodGdyZWVuOiAweDkwZWU5MCxcbiAgbGlnaHRncmV5OiAweGQzZDNkMyxcbiAgbGlnaHRwaW5rOiAweGZmYjZjMSxcbiAgbGlnaHRzYWxtb246IDB4ZmZhMDdhLFxuICBsaWdodHNlYWdyZWVuOiAweDIwYjJhYSxcbiAgbGlnaHRza3libHVlOiAweDg3Y2VmYSxcbiAgbGlnaHRzbGF0ZWdyYXk6IDB4Nzc4ODk5LFxuICBsaWdodHNsYXRlZ3JleTogMHg3Nzg4OTksXG4gIGxpZ2h0c3RlZWxibHVlOiAweGIwYzRkZSxcbiAgbGlnaHR5ZWxsb3c6IDB4ZmZmZmUwLFxuICBsaW1lOiAweDAwZmYwMCxcbiAgbGltZWdyZWVuOiAweDMyY2QzMixcbiAgbGluZW46IDB4ZmFmMGU2LFxuICBtYWdlbnRhOiAweGZmMDBmZixcbiAgbWFyb29uOiAweDgwMDAwMCxcbiAgbWVkaXVtYXF1YW1hcmluZTogMHg2NmNkYWEsXG4gIG1lZGl1bWJsdWU6IDB4MDAwMGNkLFxuICBtZWRpdW1vcmNoaWQ6IDB4YmE1NWQzLFxuICBtZWRpdW1wdXJwbGU6IDB4OTM3MGRiLFxuICBtZWRpdW1zZWFncmVlbjogMHgzY2IzNzEsXG4gIG1lZGl1bXNsYXRlYmx1ZTogMHg3YjY4ZWUsXG4gIG1lZGl1bXNwcmluZ2dyZWVuOiAweDAwZmE5YSxcbiAgbWVkaXVtdHVycXVvaXNlOiAweDQ4ZDFjYyxcbiAgbWVkaXVtdmlvbGV0cmVkOiAweGM3MTU4NSxcbiAgbWlkbmlnaHRibHVlOiAweDE5MTk3MCxcbiAgbWludGNyZWFtOiAweGY1ZmZmYSxcbiAgbWlzdHlyb3NlOiAweGZmZTRlMSxcbiAgbW9jY2FzaW46IDB4ZmZlNGI1LFxuICBuYXZham93aGl0ZTogMHhmZmRlYWQsXG4gIG5hdnk6IDB4MDAwMDgwLFxuICBvbGRsYWNlOiAweGZkZjVlNixcbiAgb2xpdmU6IDB4ODA4MDAwLFxuICBvbGl2ZWRyYWI6IDB4NmI4ZTIzLFxuICBvcmFuZ2U6IDB4ZmZhNTAwLFxuICBvcmFuZ2VyZWQ6IDB4ZmY0NTAwLFxuICBvcmNoaWQ6IDB4ZGE3MGQ2LFxuICBwYWxlZ29sZGVucm9kOiAweGVlZThhYSxcbiAgcGFsZWdyZWVuOiAweDk4ZmI5OCxcbiAgcGFsZXR1cnF1b2lzZTogMHhhZmVlZWUsXG4gIHBhbGV2aW9sZXRyZWQ6IDB4ZGI3MDkzLFxuICBwYXBheWF3aGlwOiAweGZmZWZkNSxcbiAgcGVhY2hwdWZmOiAweGZmZGFiOSxcbiAgcGVydTogMHhjZDg1M2YsXG4gIHBpbms6IDB4ZmZjMGNiLFxuICBwbHVtOiAweGRkYTBkZCxcbiAgcG93ZGVyYmx1ZTogMHhiMGUwZTYsXG4gIHB1cnBsZTogMHg4MDAwODAsXG4gIHJlYmVjY2FwdXJwbGU6IDB4NjYzMzk5LFxuICByZWQ6IDB4ZmYwMDAwLFxuICByb3N5YnJvd246IDB4YmM4ZjhmLFxuICByb3lhbGJsdWU6IDB4NDE2OWUxLFxuICBzYWRkbGVicm93bjogMHg4YjQ1MTMsXG4gIHNhbG1vbjogMHhmYTgwNzIsXG4gIHNhbmR5YnJvd246IDB4ZjRhNDYwLFxuICBzZWFncmVlbjogMHgyZThiNTcsXG4gIHNlYXNoZWxsOiAweGZmZjVlZSxcbiAgc2llbm5hOiAweGEwNTIyZCxcbiAgc2lsdmVyOiAweGMwYzBjMCxcbiAgc2t5Ymx1ZTogMHg4N2NlZWIsXG4gIHNsYXRlYmx1ZTogMHg2YTVhY2QsXG4gIHNsYXRlZ3JheTogMHg3MDgwOTAsXG4gIHNsYXRlZ3JleTogMHg3MDgwOTAsXG4gIHNub3c6IDB4ZmZmYWZhLFxuICBzcHJpbmdncmVlbjogMHgwMGZmN2YsXG4gIHN0ZWVsYmx1ZTogMHg0NjgyYjQsXG4gIHRhbjogMHhkMmI0OGMsXG4gIHRlYWw6IDB4MDA4MDgwLFxuICB0aGlzdGxlOiAweGQ4YmZkOCxcbiAgdG9tYXRvOiAweGZmNjM0NyxcbiAgdHVycXVvaXNlOiAweDQwZTBkMCxcbiAgdmlvbGV0OiAweGVlODJlZSxcbiAgd2hlYXQ6IDB4ZjVkZWIzLFxuICB3aGl0ZTogMHhmZmZmZmYsXG4gIHdoaXRlc21va2U6IDB4ZjVmNWY1LFxuICB5ZWxsb3c6IDB4ZmZmZjAwLFxuICB5ZWxsb3dncmVlbjogMHg5YWNkMzJcbn07XG5cbmRlZmluZShDb2xvciwgY29sb3IsIHtcbiAgY29weShjaGFubmVscykge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKG5ldyB0aGlzLmNvbnN0cnVjdG9yLCB0aGlzLCBjaGFubmVscyk7XG4gIH0sXG4gIGRpc3BsYXlhYmxlKCkge1xuICAgIHJldHVybiB0aGlzLnJnYigpLmRpc3BsYXlhYmxlKCk7XG4gIH0sXG4gIGhleDogY29sb3JfZm9ybWF0SGV4LCAvLyBEZXByZWNhdGVkISBVc2UgY29sb3IuZm9ybWF0SGV4LlxuICBmb3JtYXRIZXg6IGNvbG9yX2Zvcm1hdEhleCxcbiAgZm9ybWF0SGV4ODogY29sb3JfZm9ybWF0SGV4OCxcbiAgZm9ybWF0SHNsOiBjb2xvcl9mb3JtYXRIc2wsXG4gIGZvcm1hdFJnYjogY29sb3JfZm9ybWF0UmdiLFxuICB0b1N0cmluZzogY29sb3JfZm9ybWF0UmdiXG59KTtcblxuZnVuY3Rpb24gY29sb3JfZm9ybWF0SGV4KCkge1xuICByZXR1cm4gdGhpcy5yZ2IoKS5mb3JtYXRIZXgoKTtcbn1cblxuZnVuY3Rpb24gY29sb3JfZm9ybWF0SGV4OCgpIHtcbiAgcmV0dXJuIHRoaXMucmdiKCkuZm9ybWF0SGV4OCgpO1xufVxuXG5mdW5jdGlvbiBjb2xvcl9mb3JtYXRIc2woKSB7XG4gIHJldHVybiBoc2xDb252ZXJ0KHRoaXMpLmZvcm1hdEhzbCgpO1xufVxuXG5mdW5jdGlvbiBjb2xvcl9mb3JtYXRSZ2IoKSB7XG4gIHJldHVybiB0aGlzLnJnYigpLmZvcm1hdFJnYigpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb2xvcihmb3JtYXQpIHtcbiAgdmFyIG0sIGw7XG4gIGZvcm1hdCA9IChmb3JtYXQgKyBcIlwiKS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgcmV0dXJuIChtID0gcmVIZXguZXhlYyhmb3JtYXQpKSA/IChsID0gbVsxXS5sZW5ndGgsIG0gPSBwYXJzZUludChtWzFdLCAxNiksIGwgPT09IDYgPyByZ2JuKG0pIC8vICNmZjAwMDBcbiAgICAgIDogbCA9PT0gMyA/IG5ldyBSZ2IoKG0gPj4gOCAmIDB4ZikgfCAobSA+PiA0ICYgMHhmMCksIChtID4+IDQgJiAweGYpIHwgKG0gJiAweGYwKSwgKChtICYgMHhmKSA8PCA0KSB8IChtICYgMHhmKSwgMSkgLy8gI2YwMFxuICAgICAgOiBsID09PSA4ID8gcmdiYShtID4+IDI0ICYgMHhmZiwgbSA+PiAxNiAmIDB4ZmYsIG0gPj4gOCAmIDB4ZmYsIChtICYgMHhmZikgLyAweGZmKSAvLyAjZmYwMDAwMDBcbiAgICAgIDogbCA9PT0gNCA/IHJnYmEoKG0gPj4gMTIgJiAweGYpIHwgKG0gPj4gOCAmIDB4ZjApLCAobSA+PiA4ICYgMHhmKSB8IChtID4+IDQgJiAweGYwKSwgKG0gPj4gNCAmIDB4ZikgfCAobSAmIDB4ZjApLCAoKChtICYgMHhmKSA8PCA0KSB8IChtICYgMHhmKSkgLyAweGZmKSAvLyAjZjAwMFxuICAgICAgOiBudWxsKSAvLyBpbnZhbGlkIGhleFxuICAgICAgOiAobSA9IHJlUmdiSW50ZWdlci5leGVjKGZvcm1hdCkpID8gbmV3IFJnYihtWzFdLCBtWzJdLCBtWzNdLCAxKSAvLyByZ2IoMjU1LCAwLCAwKVxuICAgICAgOiAobSA9IHJlUmdiUGVyY2VudC5leGVjKGZvcm1hdCkpID8gbmV3IFJnYihtWzFdICogMjU1IC8gMTAwLCBtWzJdICogMjU1IC8gMTAwLCBtWzNdICogMjU1IC8gMTAwLCAxKSAvLyByZ2IoMTAwJSwgMCUsIDAlKVxuICAgICAgOiAobSA9IHJlUmdiYUludGVnZXIuZXhlYyhmb3JtYXQpKSA/IHJnYmEobVsxXSwgbVsyXSwgbVszXSwgbVs0XSkgLy8gcmdiYSgyNTUsIDAsIDAsIDEpXG4gICAgICA6IChtID0gcmVSZ2JhUGVyY2VudC5leGVjKGZvcm1hdCkpID8gcmdiYShtWzFdICogMjU1IC8gMTAwLCBtWzJdICogMjU1IC8gMTAwLCBtWzNdICogMjU1IC8gMTAwLCBtWzRdKSAvLyByZ2IoMTAwJSwgMCUsIDAlLCAxKVxuICAgICAgOiAobSA9IHJlSHNsUGVyY2VudC5leGVjKGZvcm1hdCkpID8gaHNsYShtWzFdLCBtWzJdIC8gMTAwLCBtWzNdIC8gMTAwLCAxKSAvLyBoc2woMTIwLCA1MCUsIDUwJSlcbiAgICAgIDogKG0gPSByZUhzbGFQZXJjZW50LmV4ZWMoZm9ybWF0KSkgPyBoc2xhKG1bMV0sIG1bMl0gLyAxMDAsIG1bM10gLyAxMDAsIG1bNF0pIC8vIGhzbGEoMTIwLCA1MCUsIDUwJSwgMSlcbiAgICAgIDogbmFtZWQuaGFzT3duUHJvcGVydHkoZm9ybWF0KSA/IHJnYm4obmFtZWRbZm9ybWF0XSkgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbiAgICAgIDogZm9ybWF0ID09PSBcInRyYW5zcGFyZW50XCIgPyBuZXcgUmdiKE5hTiwgTmFOLCBOYU4sIDApXG4gICAgICA6IG51bGw7XG59XG5cbmZ1bmN0aW9uIHJnYm4obikge1xuICByZXR1cm4gbmV3IFJnYihuID4+IDE2ICYgMHhmZiwgbiA+PiA4ICYgMHhmZiwgbiAmIDB4ZmYsIDEpO1xufVxuXG5mdW5jdGlvbiByZ2JhKHIsIGcsIGIsIGEpIHtcbiAgaWYgKGEgPD0gMCkgciA9IGcgPSBiID0gTmFOO1xuICByZXR1cm4gbmV3IFJnYihyLCBnLCBiLCBhKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJnYkNvbnZlcnQobykge1xuICBpZiAoIShvIGluc3RhbmNlb2YgQ29sb3IpKSBvID0gY29sb3Iobyk7XG4gIGlmICghbykgcmV0dXJuIG5ldyBSZ2I7XG4gIG8gPSBvLnJnYigpO1xuICByZXR1cm4gbmV3IFJnYihvLnIsIG8uZywgby5iLCBvLm9wYWNpdHkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmdiKHIsIGcsIGIsIG9wYWNpdHkpIHtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPT09IDEgPyByZ2JDb252ZXJ0KHIpIDogbmV3IFJnYihyLCBnLCBiLCBvcGFjaXR5ID09IG51bGwgPyAxIDogb3BhY2l0eSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZ2IociwgZywgYiwgb3BhY2l0eSkge1xuICB0aGlzLnIgPSArcjtcbiAgdGhpcy5nID0gK2c7XG4gIHRoaXMuYiA9ICtiO1xuICB0aGlzLm9wYWNpdHkgPSArb3BhY2l0eTtcbn1cblxuZGVmaW5lKFJnYiwgcmdiLCBleHRlbmQoQ29sb3IsIHtcbiAgYnJpZ2h0ZXIoaykge1xuICAgIGsgPSBrID09IG51bGwgPyBicmlnaHRlciA6IE1hdGgucG93KGJyaWdodGVyLCBrKTtcbiAgICByZXR1cm4gbmV3IFJnYih0aGlzLnIgKiBrLCB0aGlzLmcgKiBrLCB0aGlzLmIgKiBrLCB0aGlzLm9wYWNpdHkpO1xuICB9LFxuICBkYXJrZXIoaykge1xuICAgIGsgPSBrID09IG51bGwgPyBkYXJrZXIgOiBNYXRoLnBvdyhkYXJrZXIsIGspO1xuICAgIHJldHVybiBuZXcgUmdiKHRoaXMuciAqIGssIHRoaXMuZyAqIGssIHRoaXMuYiAqIGssIHRoaXMub3BhY2l0eSk7XG4gIH0sXG4gIHJnYigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgY2xhbXAoKSB7XG4gICAgcmV0dXJuIG5ldyBSZ2IoY2xhbXBpKHRoaXMuciksIGNsYW1waSh0aGlzLmcpLCBjbGFtcGkodGhpcy5iKSwgY2xhbXBhKHRoaXMub3BhY2l0eSkpO1xuICB9LFxuICBkaXNwbGF5YWJsZSgpIHtcbiAgICByZXR1cm4gKC0wLjUgPD0gdGhpcy5yICYmIHRoaXMuciA8IDI1NS41KVxuICAgICAgICAmJiAoLTAuNSA8PSB0aGlzLmcgJiYgdGhpcy5nIDwgMjU1LjUpXG4gICAgICAgICYmICgtMC41IDw9IHRoaXMuYiAmJiB0aGlzLmIgPCAyNTUuNSlcbiAgICAgICAgJiYgKDAgPD0gdGhpcy5vcGFjaXR5ICYmIHRoaXMub3BhY2l0eSA8PSAxKTtcbiAgfSxcbiAgaGV4OiByZ2JfZm9ybWF0SGV4LCAvLyBEZXByZWNhdGVkISBVc2UgY29sb3IuZm9ybWF0SGV4LlxuICBmb3JtYXRIZXg6IHJnYl9mb3JtYXRIZXgsXG4gIGZvcm1hdEhleDg6IHJnYl9mb3JtYXRIZXg4LFxuICBmb3JtYXRSZ2I6IHJnYl9mb3JtYXRSZ2IsXG4gIHRvU3RyaW5nOiByZ2JfZm9ybWF0UmdiXG59KSk7XG5cbmZ1bmN0aW9uIHJnYl9mb3JtYXRIZXgoKSB7XG4gIHJldHVybiBgIyR7aGV4KHRoaXMucil9JHtoZXgodGhpcy5nKX0ke2hleCh0aGlzLmIpfWA7XG59XG5cbmZ1bmN0aW9uIHJnYl9mb3JtYXRIZXg4KCkge1xuICByZXR1cm4gYCMke2hleCh0aGlzLnIpfSR7aGV4KHRoaXMuZyl9JHtoZXgodGhpcy5iKX0ke2hleCgoaXNOYU4odGhpcy5vcGFjaXR5KSA/IDEgOiB0aGlzLm9wYWNpdHkpICogMjU1KX1gO1xufVxuXG5mdW5jdGlvbiByZ2JfZm9ybWF0UmdiKCkge1xuICBjb25zdCBhID0gY2xhbXBhKHRoaXMub3BhY2l0eSk7XG4gIHJldHVybiBgJHthID09PSAxID8gXCJyZ2IoXCIgOiBcInJnYmEoXCJ9JHtjbGFtcGkodGhpcy5yKX0sICR7Y2xhbXBpKHRoaXMuZyl9LCAke2NsYW1waSh0aGlzLmIpfSR7YSA9PT0gMSA/IFwiKVwiIDogYCwgJHthfSlgfWA7XG59XG5cbmZ1bmN0aW9uIGNsYW1wYShvcGFjaXR5KSB7XG4gIHJldHVybiBpc05hTihvcGFjaXR5KSA/IDEgOiBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCBvcGFjaXR5KSk7XG59XG5cbmZ1bmN0aW9uIGNsYW1waSh2YWx1ZSkge1xuICByZXR1cm4gTWF0aC5tYXgoMCwgTWF0aC5taW4oMjU1LCBNYXRoLnJvdW5kKHZhbHVlKSB8fCAwKSk7XG59XG5cbmZ1bmN0aW9uIGhleCh2YWx1ZSkge1xuICB2YWx1ZSA9IGNsYW1waSh2YWx1ZSk7XG4gIHJldHVybiAodmFsdWUgPCAxNiA/IFwiMFwiIDogXCJcIikgKyB2YWx1ZS50b1N0cmluZygxNik7XG59XG5cbmZ1bmN0aW9uIGhzbGEoaCwgcywgbCwgYSkge1xuICBpZiAoYSA8PSAwKSBoID0gcyA9IGwgPSBOYU47XG4gIGVsc2UgaWYgKGwgPD0gMCB8fCBsID49IDEpIGggPSBzID0gTmFOO1xuICBlbHNlIGlmIChzIDw9IDApIGggPSBOYU47XG4gIHJldHVybiBuZXcgSHNsKGgsIHMsIGwsIGEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaHNsQ29udmVydChvKSB7XG4gIGlmIChvIGluc3RhbmNlb2YgSHNsKSByZXR1cm4gbmV3IEhzbChvLmgsIG8ucywgby5sLCBvLm9wYWNpdHkpO1xuICBpZiAoIShvIGluc3RhbmNlb2YgQ29sb3IpKSBvID0gY29sb3Iobyk7XG4gIGlmICghbykgcmV0dXJuIG5ldyBIc2w7XG4gIGlmIChvIGluc3RhbmNlb2YgSHNsKSByZXR1cm4gbztcbiAgbyA9IG8ucmdiKCk7XG4gIHZhciByID0gby5yIC8gMjU1LFxuICAgICAgZyA9IG8uZyAvIDI1NSxcbiAgICAgIGIgPSBvLmIgLyAyNTUsXG4gICAgICBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKSxcbiAgICAgIG1heCA9IE1hdGgubWF4KHIsIGcsIGIpLFxuICAgICAgaCA9IE5hTixcbiAgICAgIHMgPSBtYXggLSBtaW4sXG4gICAgICBsID0gKG1heCArIG1pbikgLyAyO1xuICBpZiAocykge1xuICAgIGlmIChyID09PSBtYXgpIGggPSAoZyAtIGIpIC8gcyArIChnIDwgYikgKiA2O1xuICAgIGVsc2UgaWYgKGcgPT09IG1heCkgaCA9IChiIC0gcikgLyBzICsgMjtcbiAgICBlbHNlIGggPSAociAtIGcpIC8gcyArIDQ7XG4gICAgcyAvPSBsIDwgMC41ID8gbWF4ICsgbWluIDogMiAtIG1heCAtIG1pbjtcbiAgICBoICo9IDYwO1xuICB9IGVsc2Uge1xuICAgIHMgPSBsID4gMCAmJiBsIDwgMSA/IDAgOiBoO1xuICB9XG4gIHJldHVybiBuZXcgSHNsKGgsIHMsIGwsIG8ub3BhY2l0eSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoc2woaCwgcywgbCwgb3BhY2l0eSkge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA9PT0gMSA/IGhzbENvbnZlcnQoaCkgOiBuZXcgSHNsKGgsIHMsIGwsIG9wYWNpdHkgPT0gbnVsbCA/IDEgOiBvcGFjaXR5KTtcbn1cblxuZnVuY3Rpb24gSHNsKGgsIHMsIGwsIG9wYWNpdHkpIHtcbiAgdGhpcy5oID0gK2g7XG4gIHRoaXMucyA9ICtzO1xuICB0aGlzLmwgPSArbDtcbiAgdGhpcy5vcGFjaXR5ID0gK29wYWNpdHk7XG59XG5cbmRlZmluZShIc2wsIGhzbCwgZXh0ZW5kKENvbG9yLCB7XG4gIGJyaWdodGVyKGspIHtcbiAgICBrID0gayA9PSBudWxsID8gYnJpZ2h0ZXIgOiBNYXRoLnBvdyhicmlnaHRlciwgayk7XG4gICAgcmV0dXJuIG5ldyBIc2wodGhpcy5oLCB0aGlzLnMsIHRoaXMubCAqIGssIHRoaXMub3BhY2l0eSk7XG4gIH0sXG4gIGRhcmtlcihrKSB7XG4gICAgayA9IGsgPT0gbnVsbCA/IGRhcmtlciA6IE1hdGgucG93KGRhcmtlciwgayk7XG4gICAgcmV0dXJuIG5ldyBIc2wodGhpcy5oLCB0aGlzLnMsIHRoaXMubCAqIGssIHRoaXMub3BhY2l0eSk7XG4gIH0sXG4gIHJnYigpIHtcbiAgICB2YXIgaCA9IHRoaXMuaCAlIDM2MCArICh0aGlzLmggPCAwKSAqIDM2MCxcbiAgICAgICAgcyA9IGlzTmFOKGgpIHx8IGlzTmFOKHRoaXMucykgPyAwIDogdGhpcy5zLFxuICAgICAgICBsID0gdGhpcy5sLFxuICAgICAgICBtMiA9IGwgKyAobCA8IDAuNSA/IGwgOiAxIC0gbCkgKiBzLFxuICAgICAgICBtMSA9IDIgKiBsIC0gbTI7XG4gICAgcmV0dXJuIG5ldyBSZ2IoXG4gICAgICBoc2wycmdiKGggPj0gMjQwID8gaCAtIDI0MCA6IGggKyAxMjAsIG0xLCBtMiksXG4gICAgICBoc2wycmdiKGgsIG0xLCBtMiksXG4gICAgICBoc2wycmdiKGggPCAxMjAgPyBoICsgMjQwIDogaCAtIDEyMCwgbTEsIG0yKSxcbiAgICAgIHRoaXMub3BhY2l0eVxuICAgICk7XG4gIH0sXG4gIGNsYW1wKCkge1xuICAgIHJldHVybiBuZXcgSHNsKGNsYW1waCh0aGlzLmgpLCBjbGFtcHQodGhpcy5zKSwgY2xhbXB0KHRoaXMubCksIGNsYW1wYSh0aGlzLm9wYWNpdHkpKTtcbiAgfSxcbiAgZGlzcGxheWFibGUoKSB7XG4gICAgcmV0dXJuICgwIDw9IHRoaXMucyAmJiB0aGlzLnMgPD0gMSB8fCBpc05hTih0aGlzLnMpKVxuICAgICAgICAmJiAoMCA8PSB0aGlzLmwgJiYgdGhpcy5sIDw9IDEpXG4gICAgICAgICYmICgwIDw9IHRoaXMub3BhY2l0eSAmJiB0aGlzLm9wYWNpdHkgPD0gMSk7XG4gIH0sXG4gIGZvcm1hdEhzbCgpIHtcbiAgICBjb25zdCBhID0gY2xhbXBhKHRoaXMub3BhY2l0eSk7XG4gICAgcmV0dXJuIGAke2EgPT09IDEgPyBcImhzbChcIiA6IFwiaHNsYShcIn0ke2NsYW1waCh0aGlzLmgpfSwgJHtjbGFtcHQodGhpcy5zKSAqIDEwMH0lLCAke2NsYW1wdCh0aGlzLmwpICogMTAwfSUke2EgPT09IDEgPyBcIilcIiA6IGAsICR7YX0pYH1gO1xuICB9XG59KSk7XG5cbmZ1bmN0aW9uIGNsYW1waCh2YWx1ZSkge1xuICB2YWx1ZSA9ICh2YWx1ZSB8fCAwKSAlIDM2MDtcbiAgcmV0dXJuIHZhbHVlIDwgMCA/IHZhbHVlICsgMzYwIDogdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGNsYW1wdCh2YWx1ZSkge1xuICByZXR1cm4gTWF0aC5tYXgoMCwgTWF0aC5taW4oMSwgdmFsdWUgfHwgMCkpO1xufVxuXG4vKiBGcm9tIEZ2RCAxMy4zNywgQ1NTIENvbG9yIE1vZHVsZSBMZXZlbCAzICovXG5mdW5jdGlvbiBoc2wycmdiKGgsIG0xLCBtMikge1xuICByZXR1cm4gKGggPCA2MCA/IG0xICsgKG0yIC0gbTEpICogaCAvIDYwXG4gICAgICA6IGggPCAxODAgPyBtMlxuICAgICAgOiBoIDwgMjQwID8gbTEgKyAobTIgLSBtMSkgKiAoMjQwIC0gaCkgLyA2MFxuICAgICAgOiBtMSkgKiAyNTU7XG59XG4iLCJleHBvcnQgZGVmYXVsdCB4ID0+ICgpID0+IHg7XG4iLCJpbXBvcnQgY29uc3RhbnQgZnJvbSBcIi4vY29uc3RhbnQuanNcIjtcblxuZnVuY3Rpb24gbGluZWFyKGEsIGQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICByZXR1cm4gYSArIHQgKiBkO1xuICB9O1xufVxuXG5mdW5jdGlvbiBleHBvbmVudGlhbChhLCBiLCB5KSB7XG4gIHJldHVybiBhID0gTWF0aC5wb3coYSwgeSksIGIgPSBNYXRoLnBvdyhiLCB5KSAtIGEsIHkgPSAxIC8geSwgZnVuY3Rpb24odCkge1xuICAgIHJldHVybiBNYXRoLnBvdyhhICsgdCAqIGIsIHkpO1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaHVlKGEsIGIpIHtcbiAgdmFyIGQgPSBiIC0gYTtcbiAgcmV0dXJuIGQgPyBsaW5lYXIoYSwgZCA+IDE4MCB8fCBkIDwgLTE4MCA/IGQgLSAzNjAgKiBNYXRoLnJvdW5kKGQgLyAzNjApIDogZCkgOiBjb25zdGFudChpc05hTihhKSA/IGIgOiBhKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdhbW1hKHkpIHtcbiAgcmV0dXJuICh5ID0gK3kpID09PSAxID8gbm9nYW1tYSA6IGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gYiAtIGEgPyBleHBvbmVudGlhbChhLCBiLCB5KSA6IGNvbnN0YW50KGlzTmFOKGEpID8gYiA6IGEpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBub2dhbW1hKGEsIGIpIHtcbiAgdmFyIGQgPSBiIC0gYTtcbiAgcmV0dXJuIGQgPyBsaW5lYXIoYSwgZCkgOiBjb25zdGFudChpc05hTihhKSA/IGIgOiBhKTtcbn1cbiIsImltcG9ydCB7cmdiIGFzIGNvbG9yUmdifSBmcm9tIFwiZDMtY29sb3JcIjtcbmltcG9ydCBiYXNpcyBmcm9tIFwiLi9iYXNpcy5qc1wiO1xuaW1wb3J0IGJhc2lzQ2xvc2VkIGZyb20gXCIuL2Jhc2lzQ2xvc2VkLmpzXCI7XG5pbXBvcnQgbm9nYW1tYSwge2dhbW1hfSBmcm9tIFwiLi9jb2xvci5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24gcmdiR2FtbWEoeSkge1xuICB2YXIgY29sb3IgPSBnYW1tYSh5KTtcblxuICBmdW5jdGlvbiByZ2Ioc3RhcnQsIGVuZCkge1xuICAgIHZhciByID0gY29sb3IoKHN0YXJ0ID0gY29sb3JSZ2Ioc3RhcnQpKS5yLCAoZW5kID0gY29sb3JSZ2IoZW5kKSkuciksXG4gICAgICAgIGcgPSBjb2xvcihzdGFydC5nLCBlbmQuZyksXG4gICAgICAgIGIgPSBjb2xvcihzdGFydC5iLCBlbmQuYiksXG4gICAgICAgIG9wYWNpdHkgPSBub2dhbW1hKHN0YXJ0Lm9wYWNpdHksIGVuZC5vcGFjaXR5KTtcbiAgICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgICAgc3RhcnQuciA9IHIodCk7XG4gICAgICBzdGFydC5nID0gZyh0KTtcbiAgICAgIHN0YXJ0LmIgPSBiKHQpO1xuICAgICAgc3RhcnQub3BhY2l0eSA9IG9wYWNpdHkodCk7XG4gICAgICByZXR1cm4gc3RhcnQgKyBcIlwiO1xuICAgIH07XG4gIH1cblxuICByZ2IuZ2FtbWEgPSByZ2JHYW1tYTtcblxuICByZXR1cm4gcmdiO1xufSkoMSk7XG5cbmZ1bmN0aW9uIHJnYlNwbGluZShzcGxpbmUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGNvbG9ycykge1xuICAgIHZhciBuID0gY29sb3JzLmxlbmd0aCxcbiAgICAgICAgciA9IG5ldyBBcnJheShuKSxcbiAgICAgICAgZyA9IG5ldyBBcnJheShuKSxcbiAgICAgICAgYiA9IG5ldyBBcnJheShuKSxcbiAgICAgICAgaSwgY29sb3I7XG4gICAgZm9yIChpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgY29sb3IgPSBjb2xvclJnYihjb2xvcnNbaV0pO1xuICAgICAgcltpXSA9IGNvbG9yLnIgfHwgMDtcbiAgICAgIGdbaV0gPSBjb2xvci5nIHx8IDA7XG4gICAgICBiW2ldID0gY29sb3IuYiB8fCAwO1xuICAgIH1cbiAgICByID0gc3BsaW5lKHIpO1xuICAgIGcgPSBzcGxpbmUoZyk7XG4gICAgYiA9IHNwbGluZShiKTtcbiAgICBjb2xvci5vcGFjaXR5ID0gMTtcbiAgICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgICAgY29sb3IuciA9IHIodCk7XG4gICAgICBjb2xvci5nID0gZyh0KTtcbiAgICAgIGNvbG9yLmIgPSBiKHQpO1xuICAgICAgcmV0dXJuIGNvbG9yICsgXCJcIjtcbiAgICB9O1xuICB9O1xufVxuXG5leHBvcnQgdmFyIHJnYkJhc2lzID0gcmdiU3BsaW5lKGJhc2lzKTtcbmV4cG9ydCB2YXIgcmdiQmFzaXNDbG9zZWQgPSByZ2JTcGxpbmUoYmFzaXNDbG9zZWQpO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYSwgYikge1xuICBpZiAoIWIpIGIgPSBbXTtcbiAgdmFyIG4gPSBhID8gTWF0aC5taW4oYi5sZW5ndGgsIGEubGVuZ3RoKSA6IDAsXG4gICAgICBjID0gYi5zbGljZSgpLFxuICAgICAgaTtcbiAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbjsgKytpKSBjW2ldID0gYVtpXSAqICgxIC0gdCkgKyBiW2ldICogdDtcbiAgICByZXR1cm4gYztcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyQXJyYXkoeCkge1xuICByZXR1cm4gQXJyYXlCdWZmZXIuaXNWaWV3KHgpICYmICEoeCBpbnN0YW5jZW9mIERhdGFWaWV3KTtcbn1cbiIsImltcG9ydCB2YWx1ZSBmcm9tIFwiLi92YWx1ZS5qc1wiO1xuaW1wb3J0IG51bWJlckFycmF5LCB7aXNOdW1iZXJBcnJheX0gZnJvbSBcIi4vbnVtYmVyQXJyYXkuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYSwgYikge1xuICByZXR1cm4gKGlzTnVtYmVyQXJyYXkoYikgPyBudW1iZXJBcnJheSA6IGdlbmVyaWNBcnJheSkoYSwgYik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmljQXJyYXkoYSwgYikge1xuICB2YXIgbmIgPSBiID8gYi5sZW5ndGggOiAwLFxuICAgICAgbmEgPSBhID8gTWF0aC5taW4obmIsIGEubGVuZ3RoKSA6IDAsXG4gICAgICB4ID0gbmV3IEFycmF5KG5hKSxcbiAgICAgIGMgPSBuZXcgQXJyYXkobmIpLFxuICAgICAgaTtcblxuICBmb3IgKGkgPSAwOyBpIDwgbmE7ICsraSkgeFtpXSA9IHZhbHVlKGFbaV0sIGJbaV0pO1xuICBmb3IgKDsgaSA8IG5iOyArK2kpIGNbaV0gPSBiW2ldO1xuXG4gIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgZm9yIChpID0gMDsgaSA8IG5hOyArK2kpIGNbaV0gPSB4W2ldKHQpO1xuICAgIHJldHVybiBjO1xuICB9O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYSwgYikge1xuICB2YXIgZCA9IG5ldyBEYXRlO1xuICByZXR1cm4gYSA9ICthLCBiID0gK2IsIGZ1bmN0aW9uKHQpIHtcbiAgICByZXR1cm4gZC5zZXRUaW1lKGEgKiAoMSAtIHQpICsgYiAqIHQpLCBkO1xuICB9O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYSwgYikge1xuICByZXR1cm4gYSA9ICthLCBiID0gK2IsIGZ1bmN0aW9uKHQpIHtcbiAgICByZXR1cm4gYSAqICgxIC0gdCkgKyBiICogdDtcbiAgfTtcbn1cbiIsImltcG9ydCB2YWx1ZSBmcm9tIFwiLi92YWx1ZS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhLCBiKSB7XG4gIHZhciBpID0ge30sXG4gICAgICBjID0ge30sXG4gICAgICBrO1xuXG4gIGlmIChhID09PSBudWxsIHx8IHR5cGVvZiBhICE9PSBcIm9iamVjdFwiKSBhID0ge307XG4gIGlmIChiID09PSBudWxsIHx8IHR5cGVvZiBiICE9PSBcIm9iamVjdFwiKSBiID0ge307XG5cbiAgZm9yIChrIGluIGIpIHtcbiAgICBpZiAoayBpbiBhKSB7XG4gICAgICBpW2tdID0gdmFsdWUoYVtrXSwgYltrXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNba10gPSBiW2tdO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgZm9yIChrIGluIGkpIGNba10gPSBpW2tdKHQpO1xuICAgIHJldHVybiBjO1xuICB9O1xufVxuIiwiaW1wb3J0IG51bWJlciBmcm9tIFwiLi9udW1iZXIuanNcIjtcblxudmFyIHJlQSA9IC9bLStdPyg/OlxcZCtcXC4/XFxkKnxcXC4/XFxkKykoPzpbZUVdWy0rXT9cXGQrKT8vZyxcbiAgICByZUIgPSBuZXcgUmVnRXhwKHJlQS5zb3VyY2UsIFwiZ1wiKTtcblxuZnVuY3Rpb24gemVybyhiKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gYjtcbiAgfTtcbn1cblxuZnVuY3Rpb24gb25lKGIpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICByZXR1cm4gYih0KSArIFwiXCI7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGEsIGIpIHtcbiAgdmFyIGJpID0gcmVBLmxhc3RJbmRleCA9IHJlQi5sYXN0SW5kZXggPSAwLCAvLyBzY2FuIGluZGV4IGZvciBuZXh0IG51bWJlciBpbiBiXG4gICAgICBhbSwgLy8gY3VycmVudCBtYXRjaCBpbiBhXG4gICAgICBibSwgLy8gY3VycmVudCBtYXRjaCBpbiBiXG4gICAgICBicywgLy8gc3RyaW5nIHByZWNlZGluZyBjdXJyZW50IG51bWJlciBpbiBiLCBpZiBhbnlcbiAgICAgIGkgPSAtMSwgLy8gaW5kZXggaW4gc1xuICAgICAgcyA9IFtdLCAvLyBzdHJpbmcgY29uc3RhbnRzIGFuZCBwbGFjZWhvbGRlcnNcbiAgICAgIHEgPSBbXTsgLy8gbnVtYmVyIGludGVycG9sYXRvcnNcblxuICAvLyBDb2VyY2UgaW5wdXRzIHRvIHN0cmluZ3MuXG4gIGEgPSBhICsgXCJcIiwgYiA9IGIgKyBcIlwiO1xuXG4gIC8vIEludGVycG9sYXRlIHBhaXJzIG9mIG51bWJlcnMgaW4gYSAmIGIuXG4gIHdoaWxlICgoYW0gPSByZUEuZXhlYyhhKSlcbiAgICAgICYmIChibSA9IHJlQi5leGVjKGIpKSkge1xuICAgIGlmICgoYnMgPSBibS5pbmRleCkgPiBiaSkgeyAvLyBhIHN0cmluZyBwcmVjZWRlcyB0aGUgbmV4dCBudW1iZXIgaW4gYlxuICAgICAgYnMgPSBiLnNsaWNlKGJpLCBicyk7XG4gICAgICBpZiAoc1tpXSkgc1tpXSArPSBiczsgLy8gY29hbGVzY2Ugd2l0aCBwcmV2aW91cyBzdHJpbmdcbiAgICAgIGVsc2Ugc1srK2ldID0gYnM7XG4gICAgfVxuICAgIGlmICgoYW0gPSBhbVswXSkgPT09IChibSA9IGJtWzBdKSkgeyAvLyBudW1iZXJzIGluIGEgJiBiIG1hdGNoXG4gICAgICBpZiAoc1tpXSkgc1tpXSArPSBibTsgLy8gY29hbGVzY2Ugd2l0aCBwcmV2aW91cyBzdHJpbmdcbiAgICAgIGVsc2Ugc1srK2ldID0gYm07XG4gICAgfSBlbHNlIHsgLy8gaW50ZXJwb2xhdGUgbm9uLW1hdGNoaW5nIG51bWJlcnNcbiAgICAgIHNbKytpXSA9IG51bGw7XG4gICAgICBxLnB1c2goe2k6IGksIHg6IG51bWJlcihhbSwgYm0pfSk7XG4gICAgfVxuICAgIGJpID0gcmVCLmxhc3RJbmRleDtcbiAgfVxuXG4gIC8vIEFkZCByZW1haW5zIG9mIGIuXG4gIGlmIChiaSA8IGIubGVuZ3RoKSB7XG4gICAgYnMgPSBiLnNsaWNlKGJpKTtcbiAgICBpZiAoc1tpXSkgc1tpXSArPSBiczsgLy8gY29hbGVzY2Ugd2l0aCBwcmV2aW91cyBzdHJpbmdcbiAgICBlbHNlIHNbKytpXSA9IGJzO1xuICB9XG5cbiAgLy8gU3BlY2lhbCBvcHRpbWl6YXRpb24gZm9yIG9ubHkgYSBzaW5nbGUgbWF0Y2guXG4gIC8vIE90aGVyd2lzZSwgaW50ZXJwb2xhdGUgZWFjaCBvZiB0aGUgbnVtYmVycyBhbmQgcmVqb2luIHRoZSBzdHJpbmcuXG4gIHJldHVybiBzLmxlbmd0aCA8IDIgPyAocVswXVxuICAgICAgPyBvbmUocVswXS54KVxuICAgICAgOiB6ZXJvKGIpKVxuICAgICAgOiAoYiA9IHEubGVuZ3RoLCBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDAsIG87IGkgPCBiOyArK2kpIHNbKG8gPSBxW2ldKS5pXSA9IG8ueCh0KTtcbiAgICAgICAgICByZXR1cm4gcy5qb2luKFwiXCIpO1xuICAgICAgICB9KTtcbn1cbiIsImltcG9ydCB7Y29sb3J9IGZyb20gXCJkMy1jb2xvclwiO1xuaW1wb3J0IHJnYiBmcm9tIFwiLi9yZ2IuanNcIjtcbmltcG9ydCB7Z2VuZXJpY0FycmF5fSBmcm9tIFwiLi9hcnJheS5qc1wiO1xuaW1wb3J0IGRhdGUgZnJvbSBcIi4vZGF0ZS5qc1wiO1xuaW1wb3J0IG51bWJlciBmcm9tIFwiLi9udW1iZXIuanNcIjtcbmltcG9ydCBvYmplY3QgZnJvbSBcIi4vb2JqZWN0LmpzXCI7XG5pbXBvcnQgc3RyaW5nIGZyb20gXCIuL3N0cmluZy5qc1wiO1xuaW1wb3J0IGNvbnN0YW50IGZyb20gXCIuL2NvbnN0YW50LmpzXCI7XG5pbXBvcnQgbnVtYmVyQXJyYXksIHtpc051bWJlckFycmF5fSBmcm9tIFwiLi9udW1iZXJBcnJheS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhLCBiKSB7XG4gIHZhciB0ID0gdHlwZW9mIGIsIGM7XG4gIHJldHVybiBiID09IG51bGwgfHwgdCA9PT0gXCJib29sZWFuXCIgPyBjb25zdGFudChiKVxuICAgICAgOiAodCA9PT0gXCJudW1iZXJcIiA/IG51bWJlclxuICAgICAgOiB0ID09PSBcInN0cmluZ1wiID8gKChjID0gY29sb3IoYikpID8gKGIgPSBjLCByZ2IpIDogc3RyaW5nKVxuICAgICAgOiBiIGluc3RhbmNlb2YgY29sb3IgPyByZ2JcbiAgICAgIDogYiBpbnN0YW5jZW9mIERhdGUgPyBkYXRlXG4gICAgICA6IGlzTnVtYmVyQXJyYXkoYikgPyBudW1iZXJBcnJheVxuICAgICAgOiBBcnJheS5pc0FycmF5KGIpID8gZ2VuZXJpY0FycmF5XG4gICAgICA6IHR5cGVvZiBiLnZhbHVlT2YgIT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgYi50b1N0cmluZyAhPT0gXCJmdW5jdGlvblwiIHx8IGlzTmFOKGIpID8gb2JqZWN0XG4gICAgICA6IG51bWJlcikoYSwgYik7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhLCBiKSB7XG4gIHJldHVybiBhID0gK2EsIGIgPSArYiwgZnVuY3Rpb24odCkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKGEgKiAoMSAtIHQpICsgYiAqIHQpO1xuICB9O1xufVxuIiwidmFyIGRlZ3JlZXMgPSAxODAgLyBNYXRoLlBJO1xuXG5leHBvcnQgdmFyIGlkZW50aXR5ID0ge1xuICB0cmFuc2xhdGVYOiAwLFxuICB0cmFuc2xhdGVZOiAwLFxuICByb3RhdGU6IDAsXG4gIHNrZXdYOiAwLFxuICBzY2FsZVg6IDEsXG4gIHNjYWxlWTogMVxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYSwgYiwgYywgZCwgZSwgZikge1xuICB2YXIgc2NhbGVYLCBzY2FsZVksIHNrZXdYO1xuICBpZiAoc2NhbGVYID0gTWF0aC5zcXJ0KGEgKiBhICsgYiAqIGIpKSBhIC89IHNjYWxlWCwgYiAvPSBzY2FsZVg7XG4gIGlmIChza2V3WCA9IGEgKiBjICsgYiAqIGQpIGMgLT0gYSAqIHNrZXdYLCBkIC09IGIgKiBza2V3WDtcbiAgaWYgKHNjYWxlWSA9IE1hdGguc3FydChjICogYyArIGQgKiBkKSkgYyAvPSBzY2FsZVksIGQgLz0gc2NhbGVZLCBza2V3WCAvPSBzY2FsZVk7XG4gIGlmIChhICogZCA8IGIgKiBjKSBhID0gLWEsIGIgPSAtYiwgc2tld1ggPSAtc2tld1gsIHNjYWxlWCA9IC1zY2FsZVg7XG4gIHJldHVybiB7XG4gICAgdHJhbnNsYXRlWDogZSxcbiAgICB0cmFuc2xhdGVZOiBmLFxuICAgIHJvdGF0ZTogTWF0aC5hdGFuMihiLCBhKSAqIGRlZ3JlZXMsXG4gICAgc2tld1g6IE1hdGguYXRhbihza2V3WCkgKiBkZWdyZWVzLFxuICAgIHNjYWxlWDogc2NhbGVYLFxuICAgIHNjYWxlWTogc2NhbGVZXG4gIH07XG59XG4iLCJpbXBvcnQgZGVjb21wb3NlLCB7aWRlbnRpdHl9IGZyb20gXCIuL2RlY29tcG9zZS5qc1wiO1xuXG52YXIgc3ZnTm9kZTtcblxuLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUNzcyh2YWx1ZSkge1xuICBjb25zdCBtID0gbmV3ICh0eXBlb2YgRE9NTWF0cml4ID09PSBcImZ1bmN0aW9uXCIgPyBET01NYXRyaXggOiBXZWJLaXRDU1NNYXRyaXgpKHZhbHVlICsgXCJcIik7XG4gIHJldHVybiBtLmlzSWRlbnRpdHkgPyBpZGVudGl0eSA6IGRlY29tcG9zZShtLmEsIG0uYiwgbS5jLCBtLmQsIG0uZSwgbS5mKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlU3ZnKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSByZXR1cm4gaWRlbnRpdHk7XG4gIGlmICghc3ZnTm9kZSkgc3ZnTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwiZ1wiKTtcbiAgc3ZnTm9kZS5zZXRBdHRyaWJ1dGUoXCJ0cmFuc2Zvcm1cIiwgdmFsdWUpO1xuICBpZiAoISh2YWx1ZSA9IHN2Z05vZGUudHJhbnNmb3JtLmJhc2VWYWwuY29uc29saWRhdGUoKSkpIHJldHVybiBpZGVudGl0eTtcbiAgdmFsdWUgPSB2YWx1ZS5tYXRyaXg7XG4gIHJldHVybiBkZWNvbXBvc2UodmFsdWUuYSwgdmFsdWUuYiwgdmFsdWUuYywgdmFsdWUuZCwgdmFsdWUuZSwgdmFsdWUuZik7XG59XG4iLCJpbXBvcnQgbnVtYmVyIGZyb20gXCIuLi9udW1iZXIuanNcIjtcbmltcG9ydCB7cGFyc2VDc3MsIHBhcnNlU3ZnfSBmcm9tIFwiLi9wYXJzZS5qc1wiO1xuXG5mdW5jdGlvbiBpbnRlcnBvbGF0ZVRyYW5zZm9ybShwYXJzZSwgcHhDb21tYSwgcHhQYXJlbiwgZGVnUGFyZW4pIHtcblxuICBmdW5jdGlvbiBwb3Aocykge1xuICAgIHJldHVybiBzLmxlbmd0aCA/IHMucG9wKCkgKyBcIiBcIiA6IFwiXCI7XG4gIH1cblxuICBmdW5jdGlvbiB0cmFuc2xhdGUoeGEsIHlhLCB4YiwgeWIsIHMsIHEpIHtcbiAgICBpZiAoeGEgIT09IHhiIHx8IHlhICE9PSB5Yikge1xuICAgICAgdmFyIGkgPSBzLnB1c2goXCJ0cmFuc2xhdGUoXCIsIG51bGwsIHB4Q29tbWEsIG51bGwsIHB4UGFyZW4pO1xuICAgICAgcS5wdXNoKHtpOiBpIC0gNCwgeDogbnVtYmVyKHhhLCB4Yil9LCB7aTogaSAtIDIsIHg6IG51bWJlcih5YSwgeWIpfSk7XG4gICAgfSBlbHNlIGlmICh4YiB8fCB5Yikge1xuICAgICAgcy5wdXNoKFwidHJhbnNsYXRlKFwiICsgeGIgKyBweENvbW1hICsgeWIgKyBweFBhcmVuKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByb3RhdGUoYSwgYiwgcywgcSkge1xuICAgIGlmIChhICE9PSBiKSB7XG4gICAgICBpZiAoYSAtIGIgPiAxODApIGIgKz0gMzYwOyBlbHNlIGlmIChiIC0gYSA+IDE4MCkgYSArPSAzNjA7IC8vIHNob3J0ZXN0IHBhdGhcbiAgICAgIHEucHVzaCh7aTogcy5wdXNoKHBvcChzKSArIFwicm90YXRlKFwiLCBudWxsLCBkZWdQYXJlbikgLSAyLCB4OiBudW1iZXIoYSwgYil9KTtcbiAgICB9IGVsc2UgaWYgKGIpIHtcbiAgICAgIHMucHVzaChwb3AocykgKyBcInJvdGF0ZShcIiArIGIgKyBkZWdQYXJlbik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2tld1goYSwgYiwgcywgcSkge1xuICAgIGlmIChhICE9PSBiKSB7XG4gICAgICBxLnB1c2goe2k6IHMucHVzaChwb3AocykgKyBcInNrZXdYKFwiLCBudWxsLCBkZWdQYXJlbikgLSAyLCB4OiBudW1iZXIoYSwgYil9KTtcbiAgICB9IGVsc2UgaWYgKGIpIHtcbiAgICAgIHMucHVzaChwb3AocykgKyBcInNrZXdYKFwiICsgYiArIGRlZ1BhcmVuKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzY2FsZSh4YSwgeWEsIHhiLCB5YiwgcywgcSkge1xuICAgIGlmICh4YSAhPT0geGIgfHwgeWEgIT09IHliKSB7XG4gICAgICB2YXIgaSA9IHMucHVzaChwb3AocykgKyBcInNjYWxlKFwiLCBudWxsLCBcIixcIiwgbnVsbCwgXCIpXCIpO1xuICAgICAgcS5wdXNoKHtpOiBpIC0gNCwgeDogbnVtYmVyKHhhLCB4Yil9LCB7aTogaSAtIDIsIHg6IG51bWJlcih5YSwgeWIpfSk7XG4gICAgfSBlbHNlIGlmICh4YiAhPT0gMSB8fCB5YiAhPT0gMSkge1xuICAgICAgcy5wdXNoKHBvcChzKSArIFwic2NhbGUoXCIgKyB4YiArIFwiLFwiICsgeWIgKyBcIilcIik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKGEsIGIpIHtcbiAgICB2YXIgcyA9IFtdLCAvLyBzdHJpbmcgY29uc3RhbnRzIGFuZCBwbGFjZWhvbGRlcnNcbiAgICAgICAgcSA9IFtdOyAvLyBudW1iZXIgaW50ZXJwb2xhdG9yc1xuICAgIGEgPSBwYXJzZShhKSwgYiA9IHBhcnNlKGIpO1xuICAgIHRyYW5zbGF0ZShhLnRyYW5zbGF0ZVgsIGEudHJhbnNsYXRlWSwgYi50cmFuc2xhdGVYLCBiLnRyYW5zbGF0ZVksIHMsIHEpO1xuICAgIHJvdGF0ZShhLnJvdGF0ZSwgYi5yb3RhdGUsIHMsIHEpO1xuICAgIHNrZXdYKGEuc2tld1gsIGIuc2tld1gsIHMsIHEpO1xuICAgIHNjYWxlKGEuc2NhbGVYLCBhLnNjYWxlWSwgYi5zY2FsZVgsIGIuc2NhbGVZLCBzLCBxKTtcbiAgICBhID0gYiA9IG51bGw7IC8vIGdjXG4gICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICAgIHZhciBpID0gLTEsIG4gPSBxLmxlbmd0aCwgbztcbiAgICAgIHdoaWxlICgrK2kgPCBuKSBzWyhvID0gcVtpXSkuaV0gPSBvLngodCk7XG4gICAgICByZXR1cm4gcy5qb2luKFwiXCIpO1xuICAgIH07XG4gIH07XG59XG5cbmV4cG9ydCB2YXIgaW50ZXJwb2xhdGVUcmFuc2Zvcm1Dc3MgPSBpbnRlcnBvbGF0ZVRyYW5zZm9ybShwYXJzZUNzcywgXCJweCwgXCIsIFwicHgpXCIsIFwiZGVnKVwiKTtcbmV4cG9ydCB2YXIgaW50ZXJwb2xhdGVUcmFuc2Zvcm1TdmcgPSBpbnRlcnBvbGF0ZVRyYW5zZm9ybShwYXJzZVN2ZywgXCIsIFwiLCBcIilcIiwgXCIpXCIpO1xuIiwidmFyIGVwc2lsb24yID0gMWUtMTI7XG5cbmZ1bmN0aW9uIGNvc2goeCkge1xuICByZXR1cm4gKCh4ID0gTWF0aC5leHAoeCkpICsgMSAvIHgpIC8gMjtcbn1cblxuZnVuY3Rpb24gc2luaCh4KSB7XG4gIHJldHVybiAoKHggPSBNYXRoLmV4cCh4KSkgLSAxIC8geCkgLyAyO1xufVxuXG5mdW5jdGlvbiB0YW5oKHgpIHtcbiAgcmV0dXJuICgoeCA9IE1hdGguZXhwKDIgKiB4KSkgLSAxKSAvICh4ICsgMSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IChmdW5jdGlvbiB6b29tUmhvKHJobywgcmhvMiwgcmhvNCkge1xuXG4gIC8vIHAwID0gW3V4MCwgdXkwLCB3MF1cbiAgLy8gcDEgPSBbdXgxLCB1eTEsIHcxXVxuICBmdW5jdGlvbiB6b29tKHAwLCBwMSkge1xuICAgIHZhciB1eDAgPSBwMFswXSwgdXkwID0gcDBbMV0sIHcwID0gcDBbMl0sXG4gICAgICAgIHV4MSA9IHAxWzBdLCB1eTEgPSBwMVsxXSwgdzEgPSBwMVsyXSxcbiAgICAgICAgZHggPSB1eDEgLSB1eDAsXG4gICAgICAgIGR5ID0gdXkxIC0gdXkwLFxuICAgICAgICBkMiA9IGR4ICogZHggKyBkeSAqIGR5LFxuICAgICAgICBpLFxuICAgICAgICBTO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIGZvciB1MCDiiYUgdTEuXG4gICAgaWYgKGQyIDwgZXBzaWxvbjIpIHtcbiAgICAgIFMgPSBNYXRoLmxvZyh3MSAvIHcwKSAvIHJobztcbiAgICAgIGkgPSBmdW5jdGlvbih0KSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgdXgwICsgdCAqIGR4LFxuICAgICAgICAgIHV5MCArIHQgKiBkeSxcbiAgICAgICAgICB3MCAqIE1hdGguZXhwKHJobyAqIHQgKiBTKVxuICAgICAgICBdO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEdlbmVyYWwgY2FzZS5cbiAgICBlbHNlIHtcbiAgICAgIHZhciBkMSA9IE1hdGguc3FydChkMiksXG4gICAgICAgICAgYjAgPSAodzEgKiB3MSAtIHcwICogdzAgKyByaG80ICogZDIpIC8gKDIgKiB3MCAqIHJobzIgKiBkMSksXG4gICAgICAgICAgYjEgPSAodzEgKiB3MSAtIHcwICogdzAgLSByaG80ICogZDIpIC8gKDIgKiB3MSAqIHJobzIgKiBkMSksXG4gICAgICAgICAgcjAgPSBNYXRoLmxvZyhNYXRoLnNxcnQoYjAgKiBiMCArIDEpIC0gYjApLFxuICAgICAgICAgIHIxID0gTWF0aC5sb2coTWF0aC5zcXJ0KGIxICogYjEgKyAxKSAtIGIxKTtcbiAgICAgIFMgPSAocjEgLSByMCkgLyByaG87XG4gICAgICBpID0gZnVuY3Rpb24odCkge1xuICAgICAgICB2YXIgcyA9IHQgKiBTLFxuICAgICAgICAgICAgY29zaHIwID0gY29zaChyMCksXG4gICAgICAgICAgICB1ID0gdzAgLyAocmhvMiAqIGQxKSAqIChjb3NocjAgKiB0YW5oKHJobyAqIHMgKyByMCkgLSBzaW5oKHIwKSk7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgdXgwICsgdSAqIGR4LFxuICAgICAgICAgIHV5MCArIHUgKiBkeSxcbiAgICAgICAgICB3MCAqIGNvc2hyMCAvIGNvc2gocmhvICogcyArIHIwKVxuICAgICAgICBdO1xuICAgICAgfVxuICAgIH1cblxuICAgIGkuZHVyYXRpb24gPSBTICogMTAwMCAqIHJobyAvIE1hdGguU1FSVDI7XG5cbiAgICByZXR1cm4gaTtcbiAgfVxuXG4gIHpvb20ucmhvID0gZnVuY3Rpb24oXykge1xuICAgIHZhciBfMSA9IE1hdGgubWF4KDFlLTMsICtfKSwgXzIgPSBfMSAqIF8xLCBfNCA9IF8yICogXzI7XG4gICAgcmV0dXJuIHpvb21SaG8oXzEsIF8yLCBfNCk7XG4gIH07XG5cbiAgcmV0dXJuIHpvb207XG59KShNYXRoLlNRUlQyLCAyLCA0KTtcbiIsInZhciBmcmFtZSA9IDAsIC8vIGlzIGFuIGFuaW1hdGlvbiBmcmFtZSBwZW5kaW5nP1xuICAgIHRpbWVvdXQgPSAwLCAvLyBpcyBhIHRpbWVvdXQgcGVuZGluZz9cbiAgICBpbnRlcnZhbCA9IDAsIC8vIGFyZSBhbnkgdGltZXJzIGFjdGl2ZT9cbiAgICBwb2tlRGVsYXkgPSAxMDAwLCAvLyBob3cgZnJlcXVlbnRseSB3ZSBjaGVjayBmb3IgY2xvY2sgc2tld1xuICAgIHRhc2tIZWFkLFxuICAgIHRhc2tUYWlsLFxuICAgIGNsb2NrTGFzdCA9IDAsXG4gICAgY2xvY2tOb3cgPSAwLFxuICAgIGNsb2NrU2tldyA9IDAsXG4gICAgY2xvY2sgPSB0eXBlb2YgcGVyZm9ybWFuY2UgPT09IFwib2JqZWN0XCIgJiYgcGVyZm9ybWFuY2Uubm93ID8gcGVyZm9ybWFuY2UgOiBEYXRlLFxuICAgIHNldEZyYW1lID0gdHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIiAmJiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID8gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZS5iaW5kKHdpbmRvdykgOiBmdW5jdGlvbihmKSB7IHNldFRpbWVvdXQoZiwgMTcpOyB9O1xuXG5leHBvcnQgZnVuY3Rpb24gbm93KCkge1xuICByZXR1cm4gY2xvY2tOb3cgfHwgKHNldEZyYW1lKGNsZWFyTm93KSwgY2xvY2tOb3cgPSBjbG9jay5ub3coKSArIGNsb2NrU2tldyk7XG59XG5cbmZ1bmN0aW9uIGNsZWFyTm93KCkge1xuICBjbG9ja05vdyA9IDA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBUaW1lcigpIHtcbiAgdGhpcy5fY2FsbCA9XG4gIHRoaXMuX3RpbWUgPVxuICB0aGlzLl9uZXh0ID0gbnVsbDtcbn1cblxuVGltZXIucHJvdG90eXBlID0gdGltZXIucHJvdG90eXBlID0ge1xuICBjb25zdHJ1Y3RvcjogVGltZXIsXG4gIHJlc3RhcnQ6IGZ1bmN0aW9uKGNhbGxiYWNrLCBkZWxheSwgdGltZSkge1xuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcImNhbGxiYWNrIGlzIG5vdCBhIGZ1bmN0aW9uXCIpO1xuICAgIHRpbWUgPSAodGltZSA9PSBudWxsID8gbm93KCkgOiArdGltZSkgKyAoZGVsYXkgPT0gbnVsbCA/IDAgOiArZGVsYXkpO1xuICAgIGlmICghdGhpcy5fbmV4dCAmJiB0YXNrVGFpbCAhPT0gdGhpcykge1xuICAgICAgaWYgKHRhc2tUYWlsKSB0YXNrVGFpbC5fbmV4dCA9IHRoaXM7XG4gICAgICBlbHNlIHRhc2tIZWFkID0gdGhpcztcbiAgICAgIHRhc2tUYWlsID0gdGhpcztcbiAgICB9XG4gICAgdGhpcy5fY2FsbCA9IGNhbGxiYWNrO1xuICAgIHRoaXMuX3RpbWUgPSB0aW1lO1xuICAgIHNsZWVwKCk7XG4gIH0sXG4gIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLl9jYWxsKSB7XG4gICAgICB0aGlzLl9jYWxsID0gbnVsbDtcbiAgICAgIHRoaXMuX3RpbWUgPSBJbmZpbml0eTtcbiAgICAgIHNsZWVwKCk7XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdGltZXIoY2FsbGJhY2ssIGRlbGF5LCB0aW1lKSB7XG4gIHZhciB0ID0gbmV3IFRpbWVyO1xuICB0LnJlc3RhcnQoY2FsbGJhY2ssIGRlbGF5LCB0aW1lKTtcbiAgcmV0dXJuIHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0aW1lckZsdXNoKCkge1xuICBub3coKTsgLy8gR2V0IHRoZSBjdXJyZW50IHRpbWUsIGlmIG5vdCBhbHJlYWR5IHNldC5cbiAgKytmcmFtZTsgLy8gUHJldGVuZCB3ZeKAmXZlIHNldCBhbiBhbGFybSwgaWYgd2UgaGF2ZW7igJl0IGFscmVhZHkuXG4gIHZhciB0ID0gdGFza0hlYWQsIGU7XG4gIHdoaWxlICh0KSB7XG4gICAgaWYgKChlID0gY2xvY2tOb3cgLSB0Ll90aW1lKSA+PSAwKSB0Ll9jYWxsLmNhbGwodW5kZWZpbmVkLCBlKTtcbiAgICB0ID0gdC5fbmV4dDtcbiAgfVxuICAtLWZyYW1lO1xufVxuXG5mdW5jdGlvbiB3YWtlKCkge1xuICBjbG9ja05vdyA9IChjbG9ja0xhc3QgPSBjbG9jay5ub3coKSkgKyBjbG9ja1NrZXc7XG4gIGZyYW1lID0gdGltZW91dCA9IDA7XG4gIHRyeSB7XG4gICAgdGltZXJGbHVzaCgpO1xuICB9IGZpbmFsbHkge1xuICAgIGZyYW1lID0gMDtcbiAgICBuYXAoKTtcbiAgICBjbG9ja05vdyA9IDA7XG4gIH1cbn1cblxuZnVuY3Rpb24gcG9rZSgpIHtcbiAgdmFyIG5vdyA9IGNsb2NrLm5vdygpLCBkZWxheSA9IG5vdyAtIGNsb2NrTGFzdDtcbiAgaWYgKGRlbGF5ID4gcG9rZURlbGF5KSBjbG9ja1NrZXcgLT0gZGVsYXksIGNsb2NrTGFzdCA9IG5vdztcbn1cblxuZnVuY3Rpb24gbmFwKCkge1xuICB2YXIgdDAsIHQxID0gdGFza0hlYWQsIHQyLCB0aW1lID0gSW5maW5pdHk7XG4gIHdoaWxlICh0MSkge1xuICAgIGlmICh0MS5fY2FsbCkge1xuICAgICAgaWYgKHRpbWUgPiB0MS5fdGltZSkgdGltZSA9IHQxLl90aW1lO1xuICAgICAgdDAgPSB0MSwgdDEgPSB0MS5fbmV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgdDIgPSB0MS5fbmV4dCwgdDEuX25leHQgPSBudWxsO1xuICAgICAgdDEgPSB0MCA/IHQwLl9uZXh0ID0gdDIgOiB0YXNrSGVhZCA9IHQyO1xuICAgIH1cbiAgfVxuICB0YXNrVGFpbCA9IHQwO1xuICBzbGVlcCh0aW1lKTtcbn1cblxuZnVuY3Rpb24gc2xlZXAodGltZSkge1xuICBpZiAoZnJhbWUpIHJldHVybjsgLy8gU29vbmVzdCBhbGFybSBhbHJlYWR5IHNldCwgb3Igd2lsbCBiZS5cbiAgaWYgKHRpbWVvdXQpIHRpbWVvdXQgPSBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gIHZhciBkZWxheSA9IHRpbWUgLSBjbG9ja05vdzsgLy8gU3RyaWN0bHkgbGVzcyB0aGFuIGlmIHdlIHJlY29tcHV0ZWQgY2xvY2tOb3cuXG4gIGlmIChkZWxheSA+IDI0KSB7XG4gICAgaWYgKHRpbWUgPCBJbmZpbml0eSkgdGltZW91dCA9IHNldFRpbWVvdXQod2FrZSwgdGltZSAtIGNsb2NrLm5vdygpIC0gY2xvY2tTa2V3KTtcbiAgICBpZiAoaW50ZXJ2YWwpIGludGVydmFsID0gY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKCFpbnRlcnZhbCkgY2xvY2tMYXN0ID0gY2xvY2subm93KCksIGludGVydmFsID0gc2V0SW50ZXJ2YWwocG9rZSwgcG9rZURlbGF5KTtcbiAgICBmcmFtZSA9IDEsIHNldEZyYW1lKHdha2UpO1xuICB9XG59XG4iLCJpbXBvcnQge1RpbWVyfSBmcm9tIFwiLi90aW1lci5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihjYWxsYmFjaywgZGVsYXksIHRpbWUpIHtcbiAgdmFyIHQgPSBuZXcgVGltZXI7XG4gIGRlbGF5ID0gZGVsYXkgPT0gbnVsbCA/IDAgOiArZGVsYXk7XG4gIHQucmVzdGFydChlbGFwc2VkID0+IHtcbiAgICB0LnN0b3AoKTtcbiAgICBjYWxsYmFjayhlbGFwc2VkICsgZGVsYXkpO1xuICB9LCBkZWxheSwgdGltZSk7XG4gIHJldHVybiB0O1xufVxuIiwiaW1wb3J0IHtkaXNwYXRjaH0gZnJvbSBcImQzLWRpc3BhdGNoXCI7XG5pbXBvcnQge3RpbWVyLCB0aW1lb3V0fSBmcm9tIFwiZDMtdGltZXJcIjtcblxudmFyIGVtcHR5T24gPSBkaXNwYXRjaChcInN0YXJ0XCIsIFwiZW5kXCIsIFwiY2FuY2VsXCIsIFwiaW50ZXJydXB0XCIpO1xudmFyIGVtcHR5VHdlZW4gPSBbXTtcblxuZXhwb3J0IHZhciBDUkVBVEVEID0gMDtcbmV4cG9ydCB2YXIgU0NIRURVTEVEID0gMTtcbmV4cG9ydCB2YXIgU1RBUlRJTkcgPSAyO1xuZXhwb3J0IHZhciBTVEFSVEVEID0gMztcbmV4cG9ydCB2YXIgUlVOTklORyA9IDQ7XG5leHBvcnQgdmFyIEVORElORyA9IDU7XG5leHBvcnQgdmFyIEVOREVEID0gNjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obm9kZSwgbmFtZSwgaWQsIGluZGV4LCBncm91cCwgdGltaW5nKSB7XG4gIHZhciBzY2hlZHVsZXMgPSBub2RlLl9fdHJhbnNpdGlvbjtcbiAgaWYgKCFzY2hlZHVsZXMpIG5vZGUuX190cmFuc2l0aW9uID0ge307XG4gIGVsc2UgaWYgKGlkIGluIHNjaGVkdWxlcykgcmV0dXJuO1xuICBjcmVhdGUobm9kZSwgaWQsIHtcbiAgICBuYW1lOiBuYW1lLFxuICAgIGluZGV4OiBpbmRleCwgLy8gRm9yIGNvbnRleHQgZHVyaW5nIGNhbGxiYWNrLlxuICAgIGdyb3VwOiBncm91cCwgLy8gRm9yIGNvbnRleHQgZHVyaW5nIGNhbGxiYWNrLlxuICAgIG9uOiBlbXB0eU9uLFxuICAgIHR3ZWVuOiBlbXB0eVR3ZWVuLFxuICAgIHRpbWU6IHRpbWluZy50aW1lLFxuICAgIGRlbGF5OiB0aW1pbmcuZGVsYXksXG4gICAgZHVyYXRpb246IHRpbWluZy5kdXJhdGlvbixcbiAgICBlYXNlOiB0aW1pbmcuZWFzZSxcbiAgICB0aW1lcjogbnVsbCxcbiAgICBzdGF0ZTogQ1JFQVRFRFxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXQobm9kZSwgaWQpIHtcbiAgdmFyIHNjaGVkdWxlID0gZ2V0KG5vZGUsIGlkKTtcbiAgaWYgKHNjaGVkdWxlLnN0YXRlID4gQ1JFQVRFRCkgdGhyb3cgbmV3IEVycm9yKFwidG9vIGxhdGU7IGFscmVhZHkgc2NoZWR1bGVkXCIpO1xuICByZXR1cm4gc2NoZWR1bGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXQobm9kZSwgaWQpIHtcbiAgdmFyIHNjaGVkdWxlID0gZ2V0KG5vZGUsIGlkKTtcbiAgaWYgKHNjaGVkdWxlLnN0YXRlID4gU1RBUlRFRCkgdGhyb3cgbmV3IEVycm9yKFwidG9vIGxhdGU7IGFscmVhZHkgcnVubmluZ1wiKTtcbiAgcmV0dXJuIHNjaGVkdWxlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0KG5vZGUsIGlkKSB7XG4gIHZhciBzY2hlZHVsZSA9IG5vZGUuX190cmFuc2l0aW9uO1xuICBpZiAoIXNjaGVkdWxlIHx8ICEoc2NoZWR1bGUgPSBzY2hlZHVsZVtpZF0pKSB0aHJvdyBuZXcgRXJyb3IoXCJ0cmFuc2l0aW9uIG5vdCBmb3VuZFwiKTtcbiAgcmV0dXJuIHNjaGVkdWxlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGUobm9kZSwgaWQsIHNlbGYpIHtcbiAgdmFyIHNjaGVkdWxlcyA9IG5vZGUuX190cmFuc2l0aW9uLFxuICAgICAgdHdlZW47XG5cbiAgLy8gSW5pdGlhbGl6ZSB0aGUgc2VsZiB0aW1lciB3aGVuIHRoZSB0cmFuc2l0aW9uIGlzIGNyZWF0ZWQuXG4gIC8vIE5vdGUgdGhlIGFjdHVhbCBkZWxheSBpcyBub3Qga25vd24gdW50aWwgdGhlIGZpcnN0IGNhbGxiYWNrIVxuICBzY2hlZHVsZXNbaWRdID0gc2VsZjtcbiAgc2VsZi50aW1lciA9IHRpbWVyKHNjaGVkdWxlLCAwLCBzZWxmLnRpbWUpO1xuXG4gIGZ1bmN0aW9uIHNjaGVkdWxlKGVsYXBzZWQpIHtcbiAgICBzZWxmLnN0YXRlID0gU0NIRURVTEVEO1xuICAgIHNlbGYudGltZXIucmVzdGFydChzdGFydCwgc2VsZi5kZWxheSwgc2VsZi50aW1lKTtcblxuICAgIC8vIElmIHRoZSBlbGFwc2VkIGRlbGF5IGlzIGxlc3MgdGhhbiBvdXIgZmlyc3Qgc2xlZXAsIHN0YXJ0IGltbWVkaWF0ZWx5LlxuICAgIGlmIChzZWxmLmRlbGF5IDw9IGVsYXBzZWQpIHN0YXJ0KGVsYXBzZWQgLSBzZWxmLmRlbGF5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXJ0KGVsYXBzZWQpIHtcbiAgICB2YXIgaSwgaiwgbiwgbztcblxuICAgIC8vIElmIHRoZSBzdGF0ZSBpcyBub3QgU0NIRURVTEVELCB0aGVuIHdlIHByZXZpb3VzbHkgZXJyb3JlZCBvbiBzdGFydC5cbiAgICBpZiAoc2VsZi5zdGF0ZSAhPT0gU0NIRURVTEVEKSByZXR1cm4gc3RvcCgpO1xuXG4gICAgZm9yIChpIGluIHNjaGVkdWxlcykge1xuICAgICAgbyA9IHNjaGVkdWxlc1tpXTtcbiAgICAgIGlmIChvLm5hbWUgIT09IHNlbGYubmFtZSkgY29udGludWU7XG5cbiAgICAgIC8vIFdoaWxlIHRoaXMgZWxlbWVudCBhbHJlYWR5IGhhcyBhIHN0YXJ0aW5nIHRyYW5zaXRpb24gZHVyaW5nIHRoaXMgZnJhbWUsXG4gICAgICAvLyBkZWZlciBzdGFydGluZyBhbiBpbnRlcnJ1cHRpbmcgdHJhbnNpdGlvbiB1bnRpbCB0aGF0IHRyYW5zaXRpb24gaGFzIGFcbiAgICAgIC8vIGNoYW5jZSB0byB0aWNrIChhbmQgcG9zc2libHkgZW5kKTsgc2VlIGQzL2QzLXRyYW5zaXRpb24jNTQhXG4gICAgICBpZiAoby5zdGF0ZSA9PT0gU1RBUlRFRCkgcmV0dXJuIHRpbWVvdXQoc3RhcnQpO1xuXG4gICAgICAvLyBJbnRlcnJ1cHQgdGhlIGFjdGl2ZSB0cmFuc2l0aW9uLCBpZiBhbnkuXG4gICAgICBpZiAoby5zdGF0ZSA9PT0gUlVOTklORykge1xuICAgICAgICBvLnN0YXRlID0gRU5ERUQ7XG4gICAgICAgIG8udGltZXIuc3RvcCgpO1xuICAgICAgICBvLm9uLmNhbGwoXCJpbnRlcnJ1cHRcIiwgbm9kZSwgbm9kZS5fX2RhdGFfXywgby5pbmRleCwgby5ncm91cCk7XG4gICAgICAgIGRlbGV0ZSBzY2hlZHVsZXNbaV07XG4gICAgICB9XG5cbiAgICAgIC8vIENhbmNlbCBhbnkgcHJlLWVtcHRlZCB0cmFuc2l0aW9ucy5cbiAgICAgIGVsc2UgaWYgKCtpIDwgaWQpIHtcbiAgICAgICAgby5zdGF0ZSA9IEVOREVEO1xuICAgICAgICBvLnRpbWVyLnN0b3AoKTtcbiAgICAgICAgby5vbi5jYWxsKFwiY2FuY2VsXCIsIG5vZGUsIG5vZGUuX19kYXRhX18sIG8uaW5kZXgsIG8uZ3JvdXApO1xuICAgICAgICBkZWxldGUgc2NoZWR1bGVzW2ldO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIERlZmVyIHRoZSBmaXJzdCB0aWNrIHRvIGVuZCBvZiB0aGUgY3VycmVudCBmcmFtZTsgc2VlIGQzL2QzIzE1NzYuXG4gICAgLy8gTm90ZSB0aGUgdHJhbnNpdGlvbiBtYXkgYmUgY2FuY2VsZWQgYWZ0ZXIgc3RhcnQgYW5kIGJlZm9yZSB0aGUgZmlyc3QgdGljayFcbiAgICAvLyBOb3RlIHRoaXMgbXVzdCBiZSBzY2hlZHVsZWQgYmVmb3JlIHRoZSBzdGFydCBldmVudDsgc2VlIGQzL2QzLXRyYW5zaXRpb24jMTYhXG4gICAgLy8gQXNzdW1pbmcgdGhpcyBpcyBzdWNjZXNzZnVsLCBzdWJzZXF1ZW50IGNhbGxiYWNrcyBnbyBzdHJhaWdodCB0byB0aWNrLlxuICAgIHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoc2VsZi5zdGF0ZSA9PT0gU1RBUlRFRCkge1xuICAgICAgICBzZWxmLnN0YXRlID0gUlVOTklORztcbiAgICAgICAgc2VsZi50aW1lci5yZXN0YXJ0KHRpY2ssIHNlbGYuZGVsYXksIHNlbGYudGltZSk7XG4gICAgICAgIHRpY2soZWxhcHNlZCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBEaXNwYXRjaCB0aGUgc3RhcnQgZXZlbnQuXG4gICAgLy8gTm90ZSB0aGlzIG11c3QgYmUgZG9uZSBiZWZvcmUgdGhlIHR3ZWVuIGFyZSBpbml0aWFsaXplZC5cbiAgICBzZWxmLnN0YXRlID0gU1RBUlRJTkc7XG4gICAgc2VsZi5vbi5jYWxsKFwic3RhcnRcIiwgbm9kZSwgbm9kZS5fX2RhdGFfXywgc2VsZi5pbmRleCwgc2VsZi5ncm91cCk7XG4gICAgaWYgKHNlbGYuc3RhdGUgIT09IFNUQVJUSU5HKSByZXR1cm47IC8vIGludGVycnVwdGVkXG4gICAgc2VsZi5zdGF0ZSA9IFNUQVJURUQ7XG5cbiAgICAvLyBJbml0aWFsaXplIHRoZSB0d2VlbiwgZGVsZXRpbmcgbnVsbCB0d2Vlbi5cbiAgICB0d2VlbiA9IG5ldyBBcnJheShuID0gc2VsZi50d2Vlbi5sZW5ndGgpO1xuICAgIGZvciAoaSA9IDAsIGogPSAtMTsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKG8gPSBzZWxmLnR3ZWVuW2ldLnZhbHVlLmNhbGwobm9kZSwgbm9kZS5fX2RhdGFfXywgc2VsZi5pbmRleCwgc2VsZi5ncm91cCkpIHtcbiAgICAgICAgdHdlZW5bKytqXSA9IG87XG4gICAgICB9XG4gICAgfVxuICAgIHR3ZWVuLmxlbmd0aCA9IGogKyAxO1xuICB9XG5cbiAgZnVuY3Rpb24gdGljayhlbGFwc2VkKSB7XG4gICAgdmFyIHQgPSBlbGFwc2VkIDwgc2VsZi5kdXJhdGlvbiA/IHNlbGYuZWFzZS5jYWxsKG51bGwsIGVsYXBzZWQgLyBzZWxmLmR1cmF0aW9uKSA6IChzZWxmLnRpbWVyLnJlc3RhcnQoc3RvcCksIHNlbGYuc3RhdGUgPSBFTkRJTkcsIDEpLFxuICAgICAgICBpID0gLTEsXG4gICAgICAgIG4gPSB0d2Vlbi5sZW5ndGg7XG5cbiAgICB3aGlsZSAoKytpIDwgbikge1xuICAgICAgdHdlZW5baV0uY2FsbChub2RlLCB0KTtcbiAgICB9XG5cbiAgICAvLyBEaXNwYXRjaCB0aGUgZW5kIGV2ZW50LlxuICAgIGlmIChzZWxmLnN0YXRlID09PSBFTkRJTkcpIHtcbiAgICAgIHNlbGYub24uY2FsbChcImVuZFwiLCBub2RlLCBub2RlLl9fZGF0YV9fLCBzZWxmLmluZGV4LCBzZWxmLmdyb3VwKTtcbiAgICAgIHN0b3AoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzdG9wKCkge1xuICAgIHNlbGYuc3RhdGUgPSBFTkRFRDtcbiAgICBzZWxmLnRpbWVyLnN0b3AoKTtcbiAgICBkZWxldGUgc2NoZWR1bGVzW2lkXTtcbiAgICBmb3IgKHZhciBpIGluIHNjaGVkdWxlcykgcmV0dXJuOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgZGVsZXRlIG5vZGUuX190cmFuc2l0aW9uO1xuICB9XG59XG4iLCJpbXBvcnQge1NUQVJUSU5HLCBFTkRJTkcsIEVOREVEfSBmcm9tIFwiLi90cmFuc2l0aW9uL3NjaGVkdWxlLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5vZGUsIG5hbWUpIHtcbiAgdmFyIHNjaGVkdWxlcyA9IG5vZGUuX190cmFuc2l0aW9uLFxuICAgICAgc2NoZWR1bGUsXG4gICAgICBhY3RpdmUsXG4gICAgICBlbXB0eSA9IHRydWUsXG4gICAgICBpO1xuXG4gIGlmICghc2NoZWR1bGVzKSByZXR1cm47XG5cbiAgbmFtZSA9IG5hbWUgPT0gbnVsbCA/IG51bGwgOiBuYW1lICsgXCJcIjtcblxuICBmb3IgKGkgaW4gc2NoZWR1bGVzKSB7XG4gICAgaWYgKChzY2hlZHVsZSA9IHNjaGVkdWxlc1tpXSkubmFtZSAhPT0gbmFtZSkgeyBlbXB0eSA9IGZhbHNlOyBjb250aW51ZTsgfVxuICAgIGFjdGl2ZSA9IHNjaGVkdWxlLnN0YXRlID4gU1RBUlRJTkcgJiYgc2NoZWR1bGUuc3RhdGUgPCBFTkRJTkc7XG4gICAgc2NoZWR1bGUuc3RhdGUgPSBFTkRFRDtcbiAgICBzY2hlZHVsZS50aW1lci5zdG9wKCk7XG4gICAgc2NoZWR1bGUub24uY2FsbChhY3RpdmUgPyBcImludGVycnVwdFwiIDogXCJjYW5jZWxcIiwgbm9kZSwgbm9kZS5fX2RhdGFfXywgc2NoZWR1bGUuaW5kZXgsIHNjaGVkdWxlLmdyb3VwKTtcbiAgICBkZWxldGUgc2NoZWR1bGVzW2ldO1xuICB9XG5cbiAgaWYgKGVtcHR5KSBkZWxldGUgbm9kZS5fX3RyYW5zaXRpb247XG59XG4iLCJpbXBvcnQgaW50ZXJydXB0IGZyb20gXCIuLi9pbnRlcnJ1cHQuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSkge1xuICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgIGludGVycnVwdCh0aGlzLCBuYW1lKTtcbiAgfSk7XG59XG4iLCJpbXBvcnQge2dldCwgc2V0fSBmcm9tIFwiLi9zY2hlZHVsZS5qc1wiO1xuXG5mdW5jdGlvbiB0d2VlblJlbW92ZShpZCwgbmFtZSkge1xuICB2YXIgdHdlZW4wLCB0d2VlbjE7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2NoZWR1bGUgPSBzZXQodGhpcywgaWQpLFxuICAgICAgICB0d2VlbiA9IHNjaGVkdWxlLnR3ZWVuO1xuXG4gICAgLy8gSWYgdGhpcyBub2RlIHNoYXJlZCB0d2VlbiB3aXRoIHRoZSBwcmV2aW91cyBub2RlLFxuICAgIC8vIGp1c3QgYXNzaWduIHRoZSB1cGRhdGVkIHNoYXJlZCB0d2VlbiBhbmQgd2XigJlyZSBkb25lIVxuICAgIC8vIE90aGVyd2lzZSwgY29weS1vbi13cml0ZS5cbiAgICBpZiAodHdlZW4gIT09IHR3ZWVuMCkge1xuICAgICAgdHdlZW4xID0gdHdlZW4wID0gdHdlZW47XG4gICAgICBmb3IgKHZhciBpID0gMCwgbiA9IHR3ZWVuMS5sZW5ndGg7IGkgPCBuOyArK2kpIHtcbiAgICAgICAgaWYgKHR3ZWVuMVtpXS5uYW1lID09PSBuYW1lKSB7XG4gICAgICAgICAgdHdlZW4xID0gdHdlZW4xLnNsaWNlKCk7XG4gICAgICAgICAgdHdlZW4xLnNwbGljZShpLCAxKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHNjaGVkdWxlLnR3ZWVuID0gdHdlZW4xO1xuICB9O1xufVxuXG5mdW5jdGlvbiB0d2VlbkZ1bmN0aW9uKGlkLCBuYW1lLCB2YWx1ZSkge1xuICB2YXIgdHdlZW4wLCB0d2VlbjE7XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IEVycm9yO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNjaGVkdWxlID0gc2V0KHRoaXMsIGlkKSxcbiAgICAgICAgdHdlZW4gPSBzY2hlZHVsZS50d2VlbjtcblxuICAgIC8vIElmIHRoaXMgbm9kZSBzaGFyZWQgdHdlZW4gd2l0aCB0aGUgcHJldmlvdXMgbm9kZSxcbiAgICAvLyBqdXN0IGFzc2lnbiB0aGUgdXBkYXRlZCBzaGFyZWQgdHdlZW4gYW5kIHdl4oCZcmUgZG9uZSFcbiAgICAvLyBPdGhlcndpc2UsIGNvcHktb24td3JpdGUuXG4gICAgaWYgKHR3ZWVuICE9PSB0d2VlbjApIHtcbiAgICAgIHR3ZWVuMSA9ICh0d2VlbjAgPSB0d2Vlbikuc2xpY2UoKTtcbiAgICAgIGZvciAodmFyIHQgPSB7bmFtZTogbmFtZSwgdmFsdWU6IHZhbHVlfSwgaSA9IDAsIG4gPSB0d2VlbjEubGVuZ3RoOyBpIDwgbjsgKytpKSB7XG4gICAgICAgIGlmICh0d2VlbjFbaV0ubmFtZSA9PT0gbmFtZSkge1xuICAgICAgICAgIHR3ZWVuMVtpXSA9IHQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChpID09PSBuKSB0d2VlbjEucHVzaCh0KTtcbiAgICB9XG5cbiAgICBzY2hlZHVsZS50d2VlbiA9IHR3ZWVuMTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgdmFyIGlkID0gdGhpcy5faWQ7XG5cbiAgbmFtZSArPSBcIlwiO1xuXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgIHZhciB0d2VlbiA9IGdldCh0aGlzLm5vZGUoKSwgaWQpLnR3ZWVuO1xuICAgIGZvciAodmFyIGkgPSAwLCBuID0gdHdlZW4ubGVuZ3RoLCB0OyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAoKHQgPSB0d2VlbltpXSkubmFtZSA9PT0gbmFtZSkge1xuICAgICAgICByZXR1cm4gdC52YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gdGhpcy5lYWNoKCh2YWx1ZSA9PSBudWxsID8gdHdlZW5SZW1vdmUgOiB0d2VlbkZ1bmN0aW9uKShpZCwgbmFtZSwgdmFsdWUpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHR3ZWVuVmFsdWUodHJhbnNpdGlvbiwgbmFtZSwgdmFsdWUpIHtcbiAgdmFyIGlkID0gdHJhbnNpdGlvbi5faWQ7XG5cbiAgdHJhbnNpdGlvbi5lYWNoKGZ1bmN0aW9uKCkge1xuICAgIHZhciBzY2hlZHVsZSA9IHNldCh0aGlzLCBpZCk7XG4gICAgKHNjaGVkdWxlLnZhbHVlIHx8IChzY2hlZHVsZS52YWx1ZSA9IHt9KSlbbmFtZV0gPSB2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9KTtcblxuICByZXR1cm4gZnVuY3Rpb24obm9kZSkge1xuICAgIHJldHVybiBnZXQobm9kZSwgaWQpLnZhbHVlW25hbWVdO1xuICB9O1xufVxuIiwiaW1wb3J0IHtjb2xvcn0gZnJvbSBcImQzLWNvbG9yXCI7XG5pbXBvcnQge2ludGVycG9sYXRlTnVtYmVyLCBpbnRlcnBvbGF0ZVJnYiwgaW50ZXJwb2xhdGVTdHJpbmd9IGZyb20gXCJkMy1pbnRlcnBvbGF0ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhLCBiKSB7XG4gIHZhciBjO1xuICByZXR1cm4gKHR5cGVvZiBiID09PSBcIm51bWJlclwiID8gaW50ZXJwb2xhdGVOdW1iZXJcbiAgICAgIDogYiBpbnN0YW5jZW9mIGNvbG9yID8gaW50ZXJwb2xhdGVSZ2JcbiAgICAgIDogKGMgPSBjb2xvcihiKSkgPyAoYiA9IGMsIGludGVycG9sYXRlUmdiKVxuICAgICAgOiBpbnRlcnBvbGF0ZVN0cmluZykoYSwgYik7XG59XG4iLCJpbXBvcnQge2ludGVycG9sYXRlVHJhbnNmb3JtU3ZnIGFzIGludGVycG9sYXRlVHJhbnNmb3JtfSBmcm9tIFwiZDMtaW50ZXJwb2xhdGVcIjtcbmltcG9ydCB7bmFtZXNwYWNlfSBmcm9tIFwiZDMtc2VsZWN0aW9uXCI7XG5pbXBvcnQge3R3ZWVuVmFsdWV9IGZyb20gXCIuL3R3ZWVuLmpzXCI7XG5pbXBvcnQgaW50ZXJwb2xhdGUgZnJvbSBcIi4vaW50ZXJwb2xhdGUuanNcIjtcblxuZnVuY3Rpb24gYXR0clJlbW92ZShuYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYXR0clJlbW92ZU5TKGZ1bGxuYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZU5TKGZ1bGxuYW1lLnNwYWNlLCBmdWxsbmFtZS5sb2NhbCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGF0dHJDb25zdGFudChuYW1lLCBpbnRlcnBvbGF0ZSwgdmFsdWUxKSB7XG4gIHZhciBzdHJpbmcwMCxcbiAgICAgIHN0cmluZzEgPSB2YWx1ZTEgKyBcIlwiLFxuICAgICAgaW50ZXJwb2xhdGUwO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN0cmluZzAgPSB0aGlzLmdldEF0dHJpYnV0ZShuYW1lKTtcbiAgICByZXR1cm4gc3RyaW5nMCA9PT0gc3RyaW5nMSA/IG51bGxcbiAgICAgICAgOiBzdHJpbmcwID09PSBzdHJpbmcwMCA/IGludGVycG9sYXRlMFxuICAgICAgICA6IGludGVycG9sYXRlMCA9IGludGVycG9sYXRlKHN0cmluZzAwID0gc3RyaW5nMCwgdmFsdWUxKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYXR0ckNvbnN0YW50TlMoZnVsbG5hbWUsIGludGVycG9sYXRlLCB2YWx1ZTEpIHtcbiAgdmFyIHN0cmluZzAwLFxuICAgICAgc3RyaW5nMSA9IHZhbHVlMSArIFwiXCIsXG4gICAgICBpbnRlcnBvbGF0ZTA7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3RyaW5nMCA9IHRoaXMuZ2V0QXR0cmlidXRlTlMoZnVsbG5hbWUuc3BhY2UsIGZ1bGxuYW1lLmxvY2FsKTtcbiAgICByZXR1cm4gc3RyaW5nMCA9PT0gc3RyaW5nMSA/IG51bGxcbiAgICAgICAgOiBzdHJpbmcwID09PSBzdHJpbmcwMCA/IGludGVycG9sYXRlMFxuICAgICAgICA6IGludGVycG9sYXRlMCA9IGludGVycG9sYXRlKHN0cmluZzAwID0gc3RyaW5nMCwgdmFsdWUxKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYXR0ckZ1bmN0aW9uKG5hbWUsIGludGVycG9sYXRlLCB2YWx1ZSkge1xuICB2YXIgc3RyaW5nMDAsXG4gICAgICBzdHJpbmcxMCxcbiAgICAgIGludGVycG9sYXRlMDtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdHJpbmcwLCB2YWx1ZTEgPSB2YWx1ZSh0aGlzKSwgc3RyaW5nMTtcbiAgICBpZiAodmFsdWUxID09IG51bGwpIHJldHVybiB2b2lkIHRoaXMucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICAgIHN0cmluZzAgPSB0aGlzLmdldEF0dHJpYnV0ZShuYW1lKTtcbiAgICBzdHJpbmcxID0gdmFsdWUxICsgXCJcIjtcbiAgICByZXR1cm4gc3RyaW5nMCA9PT0gc3RyaW5nMSA/IG51bGxcbiAgICAgICAgOiBzdHJpbmcwID09PSBzdHJpbmcwMCAmJiBzdHJpbmcxID09PSBzdHJpbmcxMCA/IGludGVycG9sYXRlMFxuICAgICAgICA6IChzdHJpbmcxMCA9IHN0cmluZzEsIGludGVycG9sYXRlMCA9IGludGVycG9sYXRlKHN0cmluZzAwID0gc3RyaW5nMCwgdmFsdWUxKSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGF0dHJGdW5jdGlvbk5TKGZ1bGxuYW1lLCBpbnRlcnBvbGF0ZSwgdmFsdWUpIHtcbiAgdmFyIHN0cmluZzAwLFxuICAgICAgc3RyaW5nMTAsXG4gICAgICBpbnRlcnBvbGF0ZTA7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3RyaW5nMCwgdmFsdWUxID0gdmFsdWUodGhpcyksIHN0cmluZzE7XG4gICAgaWYgKHZhbHVlMSA9PSBudWxsKSByZXR1cm4gdm9pZCB0aGlzLnJlbW92ZUF0dHJpYnV0ZU5TKGZ1bGxuYW1lLnNwYWNlLCBmdWxsbmFtZS5sb2NhbCk7XG4gICAgc3RyaW5nMCA9IHRoaXMuZ2V0QXR0cmlidXRlTlMoZnVsbG5hbWUuc3BhY2UsIGZ1bGxuYW1lLmxvY2FsKTtcbiAgICBzdHJpbmcxID0gdmFsdWUxICsgXCJcIjtcbiAgICByZXR1cm4gc3RyaW5nMCA9PT0gc3RyaW5nMSA/IG51bGxcbiAgICAgICAgOiBzdHJpbmcwID09PSBzdHJpbmcwMCAmJiBzdHJpbmcxID09PSBzdHJpbmcxMCA/IGludGVycG9sYXRlMFxuICAgICAgICA6IChzdHJpbmcxMCA9IHN0cmluZzEsIGludGVycG9sYXRlMCA9IGludGVycG9sYXRlKHN0cmluZzAwID0gc3RyaW5nMCwgdmFsdWUxKSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gIHZhciBmdWxsbmFtZSA9IG5hbWVzcGFjZShuYW1lKSwgaSA9IGZ1bGxuYW1lID09PSBcInRyYW5zZm9ybVwiID8gaW50ZXJwb2xhdGVUcmFuc2Zvcm0gOiBpbnRlcnBvbGF0ZTtcbiAgcmV0dXJuIHRoaXMuYXR0clR3ZWVuKG5hbWUsIHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiXG4gICAgICA/IChmdWxsbmFtZS5sb2NhbCA/IGF0dHJGdW5jdGlvbk5TIDogYXR0ckZ1bmN0aW9uKShmdWxsbmFtZSwgaSwgdHdlZW5WYWx1ZSh0aGlzLCBcImF0dHIuXCIgKyBuYW1lLCB2YWx1ZSkpXG4gICAgICA6IHZhbHVlID09IG51bGwgPyAoZnVsbG5hbWUubG9jYWwgPyBhdHRyUmVtb3ZlTlMgOiBhdHRyUmVtb3ZlKShmdWxsbmFtZSlcbiAgICAgIDogKGZ1bGxuYW1lLmxvY2FsID8gYXR0ckNvbnN0YW50TlMgOiBhdHRyQ29uc3RhbnQpKGZ1bGxuYW1lLCBpLCB2YWx1ZSkpO1xufVxuIiwiaW1wb3J0IHtuYW1lc3BhY2V9IGZyb20gXCJkMy1zZWxlY3Rpb25cIjtcblxuZnVuY3Rpb24gYXR0ckludGVycG9sYXRlKG5hbWUsIGkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZShuYW1lLCBpLmNhbGwodGhpcywgdCkpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBhdHRySW50ZXJwb2xhdGVOUyhmdWxsbmFtZSwgaSkge1xuICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgIHRoaXMuc2V0QXR0cmlidXRlTlMoZnVsbG5hbWUuc3BhY2UsIGZ1bGxuYW1lLmxvY2FsLCBpLmNhbGwodGhpcywgdCkpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBhdHRyVHdlZW5OUyhmdWxsbmFtZSwgdmFsdWUpIHtcbiAgdmFyIHQwLCBpMDtcbiAgZnVuY3Rpb24gdHdlZW4oKSB7XG4gICAgdmFyIGkgPSB2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmIChpICE9PSBpMCkgdDAgPSAoaTAgPSBpKSAmJiBhdHRySW50ZXJwb2xhdGVOUyhmdWxsbmFtZSwgaSk7XG4gICAgcmV0dXJuIHQwO1xuICB9XG4gIHR3ZWVuLl92YWx1ZSA9IHZhbHVlO1xuICByZXR1cm4gdHdlZW47XG59XG5cbmZ1bmN0aW9uIGF0dHJUd2VlbihuYW1lLCB2YWx1ZSkge1xuICB2YXIgdDAsIGkwO1xuICBmdW5jdGlvbiB0d2VlbigpIHtcbiAgICB2YXIgaSA9IHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKGkgIT09IGkwKSB0MCA9IChpMCA9IGkpICYmIGF0dHJJbnRlcnBvbGF0ZShuYW1lLCBpKTtcbiAgICByZXR1cm4gdDA7XG4gIH1cbiAgdHdlZW4uX3ZhbHVlID0gdmFsdWU7XG4gIHJldHVybiB0d2Vlbjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgdmFyIGtleSA9IFwiYXR0ci5cIiArIG5hbWU7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikgcmV0dXJuIChrZXkgPSB0aGlzLnR3ZWVuKGtleSkpICYmIGtleS5fdmFsdWU7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSByZXR1cm4gdGhpcy50d2VlbihrZXksIG51bGwpO1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBFcnJvcjtcbiAgdmFyIGZ1bGxuYW1lID0gbmFtZXNwYWNlKG5hbWUpO1xuICByZXR1cm4gdGhpcy50d2VlbihrZXksIChmdWxsbmFtZS5sb2NhbCA/IGF0dHJUd2Vlbk5TIDogYXR0clR3ZWVuKShmdWxsbmFtZSwgdmFsdWUpKTtcbn1cbiIsImltcG9ydCB7Z2V0LCBpbml0fSBmcm9tIFwiLi9zY2hlZHVsZS5qc1wiO1xuXG5mdW5jdGlvbiBkZWxheUZ1bmN0aW9uKGlkLCB2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgaW5pdCh0aGlzLCBpZCkuZGVsYXkgPSArdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gZGVsYXlDb25zdGFudChpZCwgdmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID0gK3ZhbHVlLCBmdW5jdGlvbigpIHtcbiAgICBpbml0KHRoaXMsIGlkKS5kZWxheSA9IHZhbHVlO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZSkge1xuICB2YXIgaWQgPSB0aGlzLl9pZDtcblxuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgPyB0aGlzLmVhY2goKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgICAgPyBkZWxheUZ1bmN0aW9uXG4gICAgICAgICAgOiBkZWxheUNvbnN0YW50KShpZCwgdmFsdWUpKVxuICAgICAgOiBnZXQodGhpcy5ub2RlKCksIGlkKS5kZWxheTtcbn1cbiIsImltcG9ydCB7Z2V0LCBzZXR9IGZyb20gXCIuL3NjaGVkdWxlLmpzXCI7XG5cbmZ1bmN0aW9uIGR1cmF0aW9uRnVuY3Rpb24oaWQsIHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBzZXQodGhpcywgaWQpLmR1cmF0aW9uID0gK3ZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGR1cmF0aW9uQ29uc3RhbnQoaWQsIHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9ICt2YWx1ZSwgZnVuY3Rpb24oKSB7XG4gICAgc2V0KHRoaXMsIGlkKS5kdXJhdGlvbiA9IHZhbHVlO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZSkge1xuICB2YXIgaWQgPSB0aGlzLl9pZDtcblxuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgPyB0aGlzLmVhY2goKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgICAgPyBkdXJhdGlvbkZ1bmN0aW9uXG4gICAgICAgICAgOiBkdXJhdGlvbkNvbnN0YW50KShpZCwgdmFsdWUpKVxuICAgICAgOiBnZXQodGhpcy5ub2RlKCksIGlkKS5kdXJhdGlvbjtcbn1cbiIsImltcG9ydCB7Z2V0LCBzZXR9IGZyb20gXCIuL3NjaGVkdWxlLmpzXCI7XG5cbmZ1bmN0aW9uIGVhc2VDb25zdGFudChpZCwgdmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgRXJyb3I7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBzZXQodGhpcywgaWQpLmVhc2UgPSB2YWx1ZTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsdWUpIHtcbiAgdmFyIGlkID0gdGhpcy5faWQ7XG5cbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGhcbiAgICAgID8gdGhpcy5lYWNoKGVhc2VDb25zdGFudChpZCwgdmFsdWUpKVxuICAgICAgOiBnZXQodGhpcy5ub2RlKCksIGlkKS5lYXNlO1xufVxuIiwiaW1wb3J0IHtzZXR9IGZyb20gXCIuL3NjaGVkdWxlLmpzXCI7XG5cbmZ1bmN0aW9uIGVhc2VWYXJ5aW5nKGlkLCB2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHYgPSB2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmICh0eXBlb2YgdiAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgRXJyb3I7XG4gICAgc2V0KHRoaXMsIGlkKS5lYXNlID0gdjtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgRXJyb3I7XG4gIHJldHVybiB0aGlzLmVhY2goZWFzZVZhcnlpbmcodGhpcy5faWQsIHZhbHVlKSk7XG59XG4iLCJpbXBvcnQge21hdGNoZXJ9IGZyb20gXCJkMy1zZWxlY3Rpb25cIjtcbmltcG9ydCB7VHJhbnNpdGlvbn0gZnJvbSBcIi4vaW5kZXguanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obWF0Y2gpIHtcbiAgaWYgKHR5cGVvZiBtYXRjaCAhPT0gXCJmdW5jdGlvblwiKSBtYXRjaCA9IG1hdGNoZXIobWF0Y2gpO1xuXG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgbSA9IGdyb3Vwcy5sZW5ndGgsIHN1Ymdyb3VwcyA9IG5ldyBBcnJheShtKSwgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgbiA9IGdyb3VwLmxlbmd0aCwgc3ViZ3JvdXAgPSBzdWJncm91cHNbal0gPSBbXSwgbm9kZSwgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmICgobm9kZSA9IGdyb3VwW2ldKSAmJiBtYXRjaC5jYWxsKG5vZGUsIG5vZGUuX19kYXRhX18sIGksIGdyb3VwKSkge1xuICAgICAgICBzdWJncm91cC5wdXNoKG5vZGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXcgVHJhbnNpdGlvbihzdWJncm91cHMsIHRoaXMuX3BhcmVudHMsIHRoaXMuX25hbWUsIHRoaXMuX2lkKTtcbn1cbiIsImltcG9ydCB7VHJhbnNpdGlvbn0gZnJvbSBcIi4vaW5kZXguanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odHJhbnNpdGlvbikge1xuICBpZiAodHJhbnNpdGlvbi5faWQgIT09IHRoaXMuX2lkKSB0aHJvdyBuZXcgRXJyb3I7XG5cbiAgZm9yICh2YXIgZ3JvdXBzMCA9IHRoaXMuX2dyb3VwcywgZ3JvdXBzMSA9IHRyYW5zaXRpb24uX2dyb3VwcywgbTAgPSBncm91cHMwLmxlbmd0aCwgbTEgPSBncm91cHMxLmxlbmd0aCwgbSA9IE1hdGgubWluKG0wLCBtMSksIG1lcmdlcyA9IG5ldyBBcnJheShtMCksIGogPSAwOyBqIDwgbTsgKytqKSB7XG4gICAgZm9yICh2YXIgZ3JvdXAwID0gZ3JvdXBzMFtqXSwgZ3JvdXAxID0gZ3JvdXBzMVtqXSwgbiA9IGdyb3VwMC5sZW5ndGgsIG1lcmdlID0gbWVyZ2VzW2pdID0gbmV3IEFycmF5KG4pLCBub2RlLCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKG5vZGUgPSBncm91cDBbaV0gfHwgZ3JvdXAxW2ldKSB7XG4gICAgICAgIG1lcmdlW2ldID0gbm9kZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmb3IgKDsgaiA8IG0wOyArK2opIHtcbiAgICBtZXJnZXNbal0gPSBncm91cHMwW2pdO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBUcmFuc2l0aW9uKG1lcmdlcywgdGhpcy5fcGFyZW50cywgdGhpcy5fbmFtZSwgdGhpcy5faWQpO1xufVxuIiwiaW1wb3J0IHtnZXQsIHNldCwgaW5pdH0gZnJvbSBcIi4vc2NoZWR1bGUuanNcIjtcblxuZnVuY3Rpb24gc3RhcnQobmFtZSkge1xuICByZXR1cm4gKG5hbWUgKyBcIlwiKS50cmltKCkuc3BsaXQoL158XFxzKy8pLmV2ZXJ5KGZ1bmN0aW9uKHQpIHtcbiAgICB2YXIgaSA9IHQuaW5kZXhPZihcIi5cIik7XG4gICAgaWYgKGkgPj0gMCkgdCA9IHQuc2xpY2UoMCwgaSk7XG4gICAgcmV0dXJuICF0IHx8IHQgPT09IFwic3RhcnRcIjtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG9uRnVuY3Rpb24oaWQsIG5hbWUsIGxpc3RlbmVyKSB7XG4gIHZhciBvbjAsIG9uMSwgc2l0ID0gc3RhcnQobmFtZSkgPyBpbml0IDogc2V0O1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNjaGVkdWxlID0gc2l0KHRoaXMsIGlkKSxcbiAgICAgICAgb24gPSBzY2hlZHVsZS5vbjtcblxuICAgIC8vIElmIHRoaXMgbm9kZSBzaGFyZWQgYSBkaXNwYXRjaCB3aXRoIHRoZSBwcmV2aW91cyBub2RlLFxuICAgIC8vIGp1c3QgYXNzaWduIHRoZSB1cGRhdGVkIHNoYXJlZCBkaXNwYXRjaCBhbmQgd2XigJlyZSBkb25lIVxuICAgIC8vIE90aGVyd2lzZSwgY29weS1vbi13cml0ZS5cbiAgICBpZiAob24gIT09IG9uMCkgKG9uMSA9IChvbjAgPSBvbikuY29weSgpKS5vbihuYW1lLCBsaXN0ZW5lcik7XG5cbiAgICBzY2hlZHVsZS5vbiA9IG9uMTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSwgbGlzdGVuZXIpIHtcbiAgdmFyIGlkID0gdGhpcy5faWQ7XG5cbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPCAyXG4gICAgICA/IGdldCh0aGlzLm5vZGUoKSwgaWQpLm9uLm9uKG5hbWUpXG4gICAgICA6IHRoaXMuZWFjaChvbkZ1bmN0aW9uKGlkLCBuYW1lLCBsaXN0ZW5lcikpO1xufVxuIiwiZnVuY3Rpb24gcmVtb3ZlRnVuY3Rpb24oaWQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGU7XG4gICAgZm9yICh2YXIgaSBpbiB0aGlzLl9fdHJhbnNpdGlvbikgaWYgKCtpICE9PSBpZCkgcmV0dXJuO1xuICAgIGlmIChwYXJlbnQpIHBhcmVudC5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm9uKFwiZW5kLnJlbW92ZVwiLCByZW1vdmVGdW5jdGlvbih0aGlzLl9pZCkpO1xufVxuIiwiaW1wb3J0IHtzZWxlY3Rvcn0gZnJvbSBcImQzLXNlbGVjdGlvblwiO1xuaW1wb3J0IHtUcmFuc2l0aW9ufSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuaW1wb3J0IHNjaGVkdWxlLCB7Z2V0fSBmcm9tIFwiLi9zY2hlZHVsZS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzZWxlY3QpIHtcbiAgdmFyIG5hbWUgPSB0aGlzLl9uYW1lLFxuICAgICAgaWQgPSB0aGlzLl9pZDtcblxuICBpZiAodHlwZW9mIHNlbGVjdCAhPT0gXCJmdW5jdGlvblwiKSBzZWxlY3QgPSBzZWxlY3RvcihzZWxlY3QpO1xuXG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgbSA9IGdyb3Vwcy5sZW5ndGgsIHN1Ymdyb3VwcyA9IG5ldyBBcnJheShtKSwgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgbiA9IGdyb3VwLmxlbmd0aCwgc3ViZ3JvdXAgPSBzdWJncm91cHNbal0gPSBuZXcgQXJyYXkobiksIG5vZGUsIHN1Ym5vZGUsIGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAoKG5vZGUgPSBncm91cFtpXSkgJiYgKHN1Ym5vZGUgPSBzZWxlY3QuY2FsbChub2RlLCBub2RlLl9fZGF0YV9fLCBpLCBncm91cCkpKSB7XG4gICAgICAgIGlmIChcIl9fZGF0YV9fXCIgaW4gbm9kZSkgc3Vibm9kZS5fX2RhdGFfXyA9IG5vZGUuX19kYXRhX187XG4gICAgICAgIHN1Ymdyb3VwW2ldID0gc3Vibm9kZTtcbiAgICAgICAgc2NoZWR1bGUoc3ViZ3JvdXBbaV0sIG5hbWUsIGlkLCBpLCBzdWJncm91cCwgZ2V0KG5vZGUsIGlkKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyBUcmFuc2l0aW9uKHN1Ymdyb3VwcywgdGhpcy5fcGFyZW50cywgbmFtZSwgaWQpO1xufVxuIiwiaW1wb3J0IHtzZWxlY3RvckFsbH0gZnJvbSBcImQzLXNlbGVjdGlvblwiO1xuaW1wb3J0IHtUcmFuc2l0aW9ufSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuaW1wb3J0IHNjaGVkdWxlLCB7Z2V0fSBmcm9tIFwiLi9zY2hlZHVsZS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzZWxlY3QpIHtcbiAgdmFyIG5hbWUgPSB0aGlzLl9uYW1lLFxuICAgICAgaWQgPSB0aGlzLl9pZDtcblxuICBpZiAodHlwZW9mIHNlbGVjdCAhPT0gXCJmdW5jdGlvblwiKSBzZWxlY3QgPSBzZWxlY3RvckFsbChzZWxlY3QpO1xuXG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgbSA9IGdyb3Vwcy5sZW5ndGgsIHN1Ymdyb3VwcyA9IFtdLCBwYXJlbnRzID0gW10sIGogPSAwOyBqIDwgbTsgKytqKSB7XG4gICAgZm9yICh2YXIgZ3JvdXAgPSBncm91cHNbal0sIG4gPSBncm91cC5sZW5ndGgsIG5vZGUsIGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAobm9kZSA9IGdyb3VwW2ldKSB7XG4gICAgICAgIGZvciAodmFyIGNoaWxkcmVuID0gc2VsZWN0LmNhbGwobm9kZSwgbm9kZS5fX2RhdGFfXywgaSwgZ3JvdXApLCBjaGlsZCwgaW5oZXJpdCA9IGdldChub2RlLCBpZCksIGsgPSAwLCBsID0gY2hpbGRyZW4ubGVuZ3RoOyBrIDwgbDsgKytrKSB7XG4gICAgICAgICAgaWYgKGNoaWxkID0gY2hpbGRyZW5ba10pIHtcbiAgICAgICAgICAgIHNjaGVkdWxlKGNoaWxkLCBuYW1lLCBpZCwgaywgY2hpbGRyZW4sIGluaGVyaXQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzdWJncm91cHMucHVzaChjaGlsZHJlbik7XG4gICAgICAgIHBhcmVudHMucHVzaChub2RlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IFRyYW5zaXRpb24oc3ViZ3JvdXBzLCBwYXJlbnRzLCBuYW1lLCBpZCk7XG59XG4iLCJpbXBvcnQge3NlbGVjdGlvbn0gZnJvbSBcImQzLXNlbGVjdGlvblwiO1xuXG52YXIgU2VsZWN0aW9uID0gc2VsZWN0aW9uLnByb3RvdHlwZS5jb25zdHJ1Y3RvcjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgU2VsZWN0aW9uKHRoaXMuX2dyb3VwcywgdGhpcy5fcGFyZW50cyk7XG59XG4iLCJpbXBvcnQge2ludGVycG9sYXRlVHJhbnNmb3JtQ3NzIGFzIGludGVycG9sYXRlVHJhbnNmb3JtfSBmcm9tIFwiZDMtaW50ZXJwb2xhdGVcIjtcbmltcG9ydCB7c3R5bGV9IGZyb20gXCJkMy1zZWxlY3Rpb25cIjtcbmltcG9ydCB7c2V0fSBmcm9tIFwiLi9zY2hlZHVsZS5qc1wiO1xuaW1wb3J0IHt0d2VlblZhbHVlfSBmcm9tIFwiLi90d2Vlbi5qc1wiO1xuaW1wb3J0IGludGVycG9sYXRlIGZyb20gXCIuL2ludGVycG9sYXRlLmpzXCI7XG5cbmZ1bmN0aW9uIHN0eWxlTnVsbChuYW1lLCBpbnRlcnBvbGF0ZSkge1xuICB2YXIgc3RyaW5nMDAsXG4gICAgICBzdHJpbmcxMCxcbiAgICAgIGludGVycG9sYXRlMDtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdHJpbmcwID0gc3R5bGUodGhpcywgbmFtZSksXG4gICAgICAgIHN0cmluZzEgPSAodGhpcy5zdHlsZS5yZW1vdmVQcm9wZXJ0eShuYW1lKSwgc3R5bGUodGhpcywgbmFtZSkpO1xuICAgIHJldHVybiBzdHJpbmcwID09PSBzdHJpbmcxID8gbnVsbFxuICAgICAgICA6IHN0cmluZzAgPT09IHN0cmluZzAwICYmIHN0cmluZzEgPT09IHN0cmluZzEwID8gaW50ZXJwb2xhdGUwXG4gICAgICAgIDogaW50ZXJwb2xhdGUwID0gaW50ZXJwb2xhdGUoc3RyaW5nMDAgPSBzdHJpbmcwLCBzdHJpbmcxMCA9IHN0cmluZzEpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBzdHlsZVJlbW92ZShuYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnN0eWxlLnJlbW92ZVByb3BlcnR5KG5hbWUpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBzdHlsZUNvbnN0YW50KG5hbWUsIGludGVycG9sYXRlLCB2YWx1ZTEpIHtcbiAgdmFyIHN0cmluZzAwLFxuICAgICAgc3RyaW5nMSA9IHZhbHVlMSArIFwiXCIsXG4gICAgICBpbnRlcnBvbGF0ZTA7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3RyaW5nMCA9IHN0eWxlKHRoaXMsIG5hbWUpO1xuICAgIHJldHVybiBzdHJpbmcwID09PSBzdHJpbmcxID8gbnVsbFxuICAgICAgICA6IHN0cmluZzAgPT09IHN0cmluZzAwID8gaW50ZXJwb2xhdGUwXG4gICAgICAgIDogaW50ZXJwb2xhdGUwID0gaW50ZXJwb2xhdGUoc3RyaW5nMDAgPSBzdHJpbmcwLCB2YWx1ZTEpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBzdHlsZUZ1bmN0aW9uKG5hbWUsIGludGVycG9sYXRlLCB2YWx1ZSkge1xuICB2YXIgc3RyaW5nMDAsXG4gICAgICBzdHJpbmcxMCxcbiAgICAgIGludGVycG9sYXRlMDtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdHJpbmcwID0gc3R5bGUodGhpcywgbmFtZSksXG4gICAgICAgIHZhbHVlMSA9IHZhbHVlKHRoaXMpLFxuICAgICAgICBzdHJpbmcxID0gdmFsdWUxICsgXCJcIjtcbiAgICBpZiAodmFsdWUxID09IG51bGwpIHN0cmluZzEgPSB2YWx1ZTEgPSAodGhpcy5zdHlsZS5yZW1vdmVQcm9wZXJ0eShuYW1lKSwgc3R5bGUodGhpcywgbmFtZSkpO1xuICAgIHJldHVybiBzdHJpbmcwID09PSBzdHJpbmcxID8gbnVsbFxuICAgICAgICA6IHN0cmluZzAgPT09IHN0cmluZzAwICYmIHN0cmluZzEgPT09IHN0cmluZzEwID8gaW50ZXJwb2xhdGUwXG4gICAgICAgIDogKHN0cmluZzEwID0gc3RyaW5nMSwgaW50ZXJwb2xhdGUwID0gaW50ZXJwb2xhdGUoc3RyaW5nMDAgPSBzdHJpbmcwLCB2YWx1ZTEpKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gc3R5bGVNYXliZVJlbW92ZShpZCwgbmFtZSkge1xuICB2YXIgb24wLCBvbjEsIGxpc3RlbmVyMCwga2V5ID0gXCJzdHlsZS5cIiArIG5hbWUsIGV2ZW50ID0gXCJlbmQuXCIgKyBrZXksIHJlbW92ZTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzY2hlZHVsZSA9IHNldCh0aGlzLCBpZCksXG4gICAgICAgIG9uID0gc2NoZWR1bGUub24sXG4gICAgICAgIGxpc3RlbmVyID0gc2NoZWR1bGUudmFsdWVba2V5XSA9PSBudWxsID8gcmVtb3ZlIHx8IChyZW1vdmUgPSBzdHlsZVJlbW92ZShuYW1lKSkgOiB1bmRlZmluZWQ7XG5cbiAgICAvLyBJZiB0aGlzIG5vZGUgc2hhcmVkIGEgZGlzcGF0Y2ggd2l0aCB0aGUgcHJldmlvdXMgbm9kZSxcbiAgICAvLyBqdXN0IGFzc2lnbiB0aGUgdXBkYXRlZCBzaGFyZWQgZGlzcGF0Y2ggYW5kIHdl4oCZcmUgZG9uZSFcbiAgICAvLyBPdGhlcndpc2UsIGNvcHktb24td3JpdGUuXG4gICAgaWYgKG9uICE9PSBvbjAgfHwgbGlzdGVuZXIwICE9PSBsaXN0ZW5lcikgKG9uMSA9IChvbjAgPSBvbikuY29weSgpKS5vbihldmVudCwgbGlzdGVuZXIwID0gbGlzdGVuZXIpO1xuXG4gICAgc2NoZWR1bGUub24gPSBvbjE7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5hbWUsIHZhbHVlLCBwcmlvcml0eSkge1xuICB2YXIgaSA9IChuYW1lICs9IFwiXCIpID09PSBcInRyYW5zZm9ybVwiID8gaW50ZXJwb2xhdGVUcmFuc2Zvcm0gOiBpbnRlcnBvbGF0ZTtcbiAgcmV0dXJuIHZhbHVlID09IG51bGwgPyB0aGlzXG4gICAgICAuc3R5bGVUd2VlbihuYW1lLCBzdHlsZU51bGwobmFtZSwgaSkpXG4gICAgICAub24oXCJlbmQuc3R5bGUuXCIgKyBuYW1lLCBzdHlsZVJlbW92ZShuYW1lKSlcbiAgICA6IHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiID8gdGhpc1xuICAgICAgLnN0eWxlVHdlZW4obmFtZSwgc3R5bGVGdW5jdGlvbihuYW1lLCBpLCB0d2VlblZhbHVlKHRoaXMsIFwic3R5bGUuXCIgKyBuYW1lLCB2YWx1ZSkpKVxuICAgICAgLmVhY2goc3R5bGVNYXliZVJlbW92ZSh0aGlzLl9pZCwgbmFtZSkpXG4gICAgOiB0aGlzXG4gICAgICAuc3R5bGVUd2VlbihuYW1lLCBzdHlsZUNvbnN0YW50KG5hbWUsIGksIHZhbHVlKSwgcHJpb3JpdHkpXG4gICAgICAub24oXCJlbmQuc3R5bGUuXCIgKyBuYW1lLCBudWxsKTtcbn1cbiIsImZ1bmN0aW9uIHN0eWxlSW50ZXJwb2xhdGUobmFtZSwgaSwgcHJpb3JpdHkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KG5hbWUsIGkuY2FsbCh0aGlzLCB0KSwgcHJpb3JpdHkpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBzdHlsZVR3ZWVuKG5hbWUsIHZhbHVlLCBwcmlvcml0eSkge1xuICB2YXIgdCwgaTA7XG4gIGZ1bmN0aW9uIHR3ZWVuKCkge1xuICAgIHZhciBpID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoaSAhPT0gaTApIHQgPSAoaTAgPSBpKSAmJiBzdHlsZUludGVycG9sYXRlKG5hbWUsIGksIHByaW9yaXR5KTtcbiAgICByZXR1cm4gdDtcbiAgfVxuICB0d2Vlbi5fdmFsdWUgPSB2YWx1ZTtcbiAgcmV0dXJuIHR3ZWVuO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lLCB2YWx1ZSwgcHJpb3JpdHkpIHtcbiAgdmFyIGtleSA9IFwic3R5bGUuXCIgKyAobmFtZSArPSBcIlwiKTtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSByZXR1cm4gKGtleSA9IHRoaXMudHdlZW4oa2V5KSkgJiYga2V5Ll92YWx1ZTtcbiAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybiB0aGlzLnR3ZWVuKGtleSwgbnVsbCk7XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IEVycm9yO1xuICByZXR1cm4gdGhpcy50d2VlbihrZXksIHN0eWxlVHdlZW4obmFtZSwgdmFsdWUsIHByaW9yaXR5ID09IG51bGwgPyBcIlwiIDogcHJpb3JpdHkpKTtcbn1cbiIsImltcG9ydCB7dHdlZW5WYWx1ZX0gZnJvbSBcIi4vdHdlZW4uanNcIjtcblxuZnVuY3Rpb24gdGV4dENvbnN0YW50KHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnRleHRDb250ZW50ID0gdmFsdWU7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHRleHRGdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHZhbHVlMSA9IHZhbHVlKHRoaXMpO1xuICAgIHRoaXMudGV4dENvbnRlbnQgPSB2YWx1ZTEgPT0gbnVsbCA/IFwiXCIgOiB2YWx1ZTE7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiB0aGlzLnR3ZWVuKFwidGV4dFwiLCB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgPyB0ZXh0RnVuY3Rpb24odHdlZW5WYWx1ZSh0aGlzLCBcInRleHRcIiwgdmFsdWUpKVxuICAgICAgOiB0ZXh0Q29uc3RhbnQodmFsdWUgPT0gbnVsbCA/IFwiXCIgOiB2YWx1ZSArIFwiXCIpKTtcbn1cbiIsImZ1bmN0aW9uIHRleHRJbnRlcnBvbGF0ZShpKSB7XG4gIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgdGhpcy50ZXh0Q29udGVudCA9IGkuY2FsbCh0aGlzLCB0KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gdGV4dFR3ZWVuKHZhbHVlKSB7XG4gIHZhciB0MCwgaTA7XG4gIGZ1bmN0aW9uIHR3ZWVuKCkge1xuICAgIHZhciBpID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoaSAhPT0gaTApIHQwID0gKGkwID0gaSkgJiYgdGV4dEludGVycG9sYXRlKGkpO1xuICAgIHJldHVybiB0MDtcbiAgfVxuICB0d2Vlbi5fdmFsdWUgPSB2YWx1ZTtcbiAgcmV0dXJuIHR3ZWVuO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZSkge1xuICB2YXIga2V5ID0gXCJ0ZXh0XCI7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMSkgcmV0dXJuIChrZXkgPSB0aGlzLnR3ZWVuKGtleSkpICYmIGtleS5fdmFsdWU7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSByZXR1cm4gdGhpcy50d2VlbihrZXksIG51bGwpO1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBFcnJvcjtcbiAgcmV0dXJuIHRoaXMudHdlZW4oa2V5LCB0ZXh0VHdlZW4odmFsdWUpKTtcbn1cbiIsImltcG9ydCB7VHJhbnNpdGlvbiwgbmV3SWR9IGZyb20gXCIuL2luZGV4LmpzXCI7XG5pbXBvcnQgc2NoZWR1bGUsIHtnZXR9IGZyb20gXCIuL3NjaGVkdWxlLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICB2YXIgbmFtZSA9IHRoaXMuX25hbWUsXG4gICAgICBpZDAgPSB0aGlzLl9pZCxcbiAgICAgIGlkMSA9IG5ld0lkKCk7XG5cbiAgZm9yICh2YXIgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzLCBtID0gZ3JvdXBzLmxlbmd0aCwgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgbiA9IGdyb3VwLmxlbmd0aCwgbm9kZSwgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmIChub2RlID0gZ3JvdXBbaV0pIHtcbiAgICAgICAgdmFyIGluaGVyaXQgPSBnZXQobm9kZSwgaWQwKTtcbiAgICAgICAgc2NoZWR1bGUobm9kZSwgbmFtZSwgaWQxLCBpLCBncm91cCwge1xuICAgICAgICAgIHRpbWU6IGluaGVyaXQudGltZSArIGluaGVyaXQuZGVsYXkgKyBpbmhlcml0LmR1cmF0aW9uLFxuICAgICAgICAgIGRlbGF5OiAwLFxuICAgICAgICAgIGR1cmF0aW9uOiBpbmhlcml0LmR1cmF0aW9uLFxuICAgICAgICAgIGVhc2U6IGluaGVyaXQuZWFzZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IFRyYW5zaXRpb24oZ3JvdXBzLCB0aGlzLl9wYXJlbnRzLCBuYW1lLCBpZDEpO1xufVxuIiwiaW1wb3J0IHtzZXR9IGZyb20gXCIuL3NjaGVkdWxlLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICB2YXIgb24wLCBvbjEsIHRoYXQgPSB0aGlzLCBpZCA9IHRoYXQuX2lkLCBzaXplID0gdGhhdC5zaXplKCk7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgY2FuY2VsID0ge3ZhbHVlOiByZWplY3R9LFxuICAgICAgICBlbmQgPSB7dmFsdWU6IGZ1bmN0aW9uKCkgeyBpZiAoLS1zaXplID09PSAwKSByZXNvbHZlKCk7IH19O1xuXG4gICAgdGhhdC5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHNjaGVkdWxlID0gc2V0KHRoaXMsIGlkKSxcbiAgICAgICAgICBvbiA9IHNjaGVkdWxlLm9uO1xuXG4gICAgICAvLyBJZiB0aGlzIG5vZGUgc2hhcmVkIGEgZGlzcGF0Y2ggd2l0aCB0aGUgcHJldmlvdXMgbm9kZSxcbiAgICAgIC8vIGp1c3QgYXNzaWduIHRoZSB1cGRhdGVkIHNoYXJlZCBkaXNwYXRjaCBhbmQgd2XigJlyZSBkb25lIVxuICAgICAgLy8gT3RoZXJ3aXNlLCBjb3B5LW9uLXdyaXRlLlxuICAgICAgaWYgKG9uICE9PSBvbjApIHtcbiAgICAgICAgb24xID0gKG9uMCA9IG9uKS5jb3B5KCk7XG4gICAgICAgIG9uMS5fLmNhbmNlbC5wdXNoKGNhbmNlbCk7XG4gICAgICAgIG9uMS5fLmludGVycnVwdC5wdXNoKGNhbmNlbCk7XG4gICAgICAgIG9uMS5fLmVuZC5wdXNoKGVuZCk7XG4gICAgICB9XG5cbiAgICAgIHNjaGVkdWxlLm9uID0gb24xO1xuICAgIH0pO1xuXG4gICAgLy8gVGhlIHNlbGVjdGlvbiB3YXMgZW1wdHksIHJlc29sdmUgZW5kIGltbWVkaWF0ZWx5XG4gICAgaWYgKHNpemUgPT09IDApIHJlc29sdmUoKTtcbiAgfSk7XG59XG4iLCJpbXBvcnQge3NlbGVjdGlvbn0gZnJvbSBcImQzLXNlbGVjdGlvblwiO1xuaW1wb3J0IHRyYW5zaXRpb25fYXR0ciBmcm9tIFwiLi9hdHRyLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9hdHRyVHdlZW4gZnJvbSBcIi4vYXR0clR3ZWVuLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9kZWxheSBmcm9tIFwiLi9kZWxheS5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fZHVyYXRpb24gZnJvbSBcIi4vZHVyYXRpb24uanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX2Vhc2UgZnJvbSBcIi4vZWFzZS5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fZWFzZVZhcnlpbmcgZnJvbSBcIi4vZWFzZVZhcnlpbmcuanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX2ZpbHRlciBmcm9tIFwiLi9maWx0ZXIuanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX21lcmdlIGZyb20gXCIuL21lcmdlLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9vbiBmcm9tIFwiLi9vbi5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fcmVtb3ZlIGZyb20gXCIuL3JlbW92ZS5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fc2VsZWN0IGZyb20gXCIuL3NlbGVjdC5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fc2VsZWN0QWxsIGZyb20gXCIuL3NlbGVjdEFsbC5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fc2VsZWN0aW9uIGZyb20gXCIuL3NlbGVjdGlvbi5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fc3R5bGUgZnJvbSBcIi4vc3R5bGUuanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX3N0eWxlVHdlZW4gZnJvbSBcIi4vc3R5bGVUd2Vlbi5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fdGV4dCBmcm9tIFwiLi90ZXh0LmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl90ZXh0VHdlZW4gZnJvbSBcIi4vdGV4dFR3ZWVuLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl90cmFuc2l0aW9uIGZyb20gXCIuL3RyYW5zaXRpb24uanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX3R3ZWVuIGZyb20gXCIuL3R3ZWVuLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9lbmQgZnJvbSBcIi4vZW5kLmpzXCI7XG5cbnZhciBpZCA9IDA7XG5cbmV4cG9ydCBmdW5jdGlvbiBUcmFuc2l0aW9uKGdyb3VwcywgcGFyZW50cywgbmFtZSwgaWQpIHtcbiAgdGhpcy5fZ3JvdXBzID0gZ3JvdXBzO1xuICB0aGlzLl9wYXJlbnRzID0gcGFyZW50cztcbiAgdGhpcy5fbmFtZSA9IG5hbWU7XG4gIHRoaXMuX2lkID0gaWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRyYW5zaXRpb24obmFtZSkge1xuICByZXR1cm4gc2VsZWN0aW9uKCkudHJhbnNpdGlvbihuYW1lKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5ld0lkKCkge1xuICByZXR1cm4gKytpZDtcbn1cblxudmFyIHNlbGVjdGlvbl9wcm90b3R5cGUgPSBzZWxlY3Rpb24ucHJvdG90eXBlO1xuXG5UcmFuc2l0aW9uLnByb3RvdHlwZSA9IHRyYW5zaXRpb24ucHJvdG90eXBlID0ge1xuICBjb25zdHJ1Y3RvcjogVHJhbnNpdGlvbixcbiAgc2VsZWN0OiB0cmFuc2l0aW9uX3NlbGVjdCxcbiAgc2VsZWN0QWxsOiB0cmFuc2l0aW9uX3NlbGVjdEFsbCxcbiAgc2VsZWN0Q2hpbGQ6IHNlbGVjdGlvbl9wcm90b3R5cGUuc2VsZWN0Q2hpbGQsXG4gIHNlbGVjdENoaWxkcmVuOiBzZWxlY3Rpb25fcHJvdG90eXBlLnNlbGVjdENoaWxkcmVuLFxuICBmaWx0ZXI6IHRyYW5zaXRpb25fZmlsdGVyLFxuICBtZXJnZTogdHJhbnNpdGlvbl9tZXJnZSxcbiAgc2VsZWN0aW9uOiB0cmFuc2l0aW9uX3NlbGVjdGlvbixcbiAgdHJhbnNpdGlvbjogdHJhbnNpdGlvbl90cmFuc2l0aW9uLFxuICBjYWxsOiBzZWxlY3Rpb25fcHJvdG90eXBlLmNhbGwsXG4gIG5vZGVzOiBzZWxlY3Rpb25fcHJvdG90eXBlLm5vZGVzLFxuICBub2RlOiBzZWxlY3Rpb25fcHJvdG90eXBlLm5vZGUsXG4gIHNpemU6IHNlbGVjdGlvbl9wcm90b3R5cGUuc2l6ZSxcbiAgZW1wdHk6IHNlbGVjdGlvbl9wcm90b3R5cGUuZW1wdHksXG4gIGVhY2g6IHNlbGVjdGlvbl9wcm90b3R5cGUuZWFjaCxcbiAgb246IHRyYW5zaXRpb25fb24sXG4gIGF0dHI6IHRyYW5zaXRpb25fYXR0cixcbiAgYXR0clR3ZWVuOiB0cmFuc2l0aW9uX2F0dHJUd2VlbixcbiAgc3R5bGU6IHRyYW5zaXRpb25fc3R5bGUsXG4gIHN0eWxlVHdlZW46IHRyYW5zaXRpb25fc3R5bGVUd2VlbixcbiAgdGV4dDogdHJhbnNpdGlvbl90ZXh0LFxuICB0ZXh0VHdlZW46IHRyYW5zaXRpb25fdGV4dFR3ZWVuLFxuICByZW1vdmU6IHRyYW5zaXRpb25fcmVtb3ZlLFxuICB0d2VlbjogdHJhbnNpdGlvbl90d2VlbixcbiAgZGVsYXk6IHRyYW5zaXRpb25fZGVsYXksXG4gIGR1cmF0aW9uOiB0cmFuc2l0aW9uX2R1cmF0aW9uLFxuICBlYXNlOiB0cmFuc2l0aW9uX2Vhc2UsXG4gIGVhc2VWYXJ5aW5nOiB0cmFuc2l0aW9uX2Vhc2VWYXJ5aW5nLFxuICBlbmQ6IHRyYW5zaXRpb25fZW5kLFxuICBbU3ltYm9sLml0ZXJhdG9yXTogc2VsZWN0aW9uX3Byb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdXG59O1xuIiwiZXhwb3J0IGZ1bmN0aW9uIGN1YmljSW4odCkge1xuICByZXR1cm4gdCAqIHQgKiB0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3ViaWNPdXQodCkge1xuICByZXR1cm4gLS10ICogdCAqIHQgKyAxO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3ViaWNJbk91dCh0KSB7XG4gIHJldHVybiAoKHQgKj0gMikgPD0gMSA/IHQgKiB0ICogdCA6ICh0IC09IDIpICogdCAqIHQgKyAyKSAvIDI7XG59XG4iLCJpbXBvcnQge1RyYW5zaXRpb24sIG5ld0lkfSBmcm9tIFwiLi4vdHJhbnNpdGlvbi9pbmRleC5qc1wiO1xuaW1wb3J0IHNjaGVkdWxlIGZyb20gXCIuLi90cmFuc2l0aW9uL3NjaGVkdWxlLmpzXCI7XG5pbXBvcnQge2Vhc2VDdWJpY0luT3V0fSBmcm9tIFwiZDMtZWFzZVwiO1xuaW1wb3J0IHtub3d9IGZyb20gXCJkMy10aW1lclwiO1xuXG52YXIgZGVmYXVsdFRpbWluZyA9IHtcbiAgdGltZTogbnVsbCwgLy8gU2V0IG9uIHVzZS5cbiAgZGVsYXk6IDAsXG4gIGR1cmF0aW9uOiAyNTAsXG4gIGVhc2U6IGVhc2VDdWJpY0luT3V0XG59O1xuXG5mdW5jdGlvbiBpbmhlcml0KG5vZGUsIGlkKSB7XG4gIHZhciB0aW1pbmc7XG4gIHdoaWxlICghKHRpbWluZyA9IG5vZGUuX190cmFuc2l0aW9uKSB8fCAhKHRpbWluZyA9IHRpbWluZ1tpZF0pKSB7XG4gICAgaWYgKCEobm9kZSA9IG5vZGUucGFyZW50Tm9kZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdHJhbnNpdGlvbiAke2lkfSBub3QgZm91bmRgKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRpbWluZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSkge1xuICB2YXIgaWQsXG4gICAgICB0aW1pbmc7XG5cbiAgaWYgKG5hbWUgaW5zdGFuY2VvZiBUcmFuc2l0aW9uKSB7XG4gICAgaWQgPSBuYW1lLl9pZCwgbmFtZSA9IG5hbWUuX25hbWU7XG4gIH0gZWxzZSB7XG4gICAgaWQgPSBuZXdJZCgpLCAodGltaW5nID0gZGVmYXVsdFRpbWluZykudGltZSA9IG5vdygpLCBuYW1lID0gbmFtZSA9PSBudWxsID8gbnVsbCA6IG5hbWUgKyBcIlwiO1xuICB9XG5cbiAgZm9yICh2YXIgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzLCBtID0gZ3JvdXBzLmxlbmd0aCwgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgbiA9IGdyb3VwLmxlbmd0aCwgbm9kZSwgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmIChub2RlID0gZ3JvdXBbaV0pIHtcbiAgICAgICAgc2NoZWR1bGUobm9kZSwgbmFtZSwgaWQsIGksIGdyb3VwLCB0aW1pbmcgfHwgaW5oZXJpdChub2RlLCBpZCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXcgVHJhbnNpdGlvbihncm91cHMsIHRoaXMuX3BhcmVudHMsIG5hbWUsIGlkKTtcbn1cbiIsImltcG9ydCB7c2VsZWN0aW9ufSBmcm9tIFwiZDMtc2VsZWN0aW9uXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2ludGVycnVwdCBmcm9tIFwiLi9pbnRlcnJ1cHQuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fdHJhbnNpdGlvbiBmcm9tIFwiLi90cmFuc2l0aW9uLmpzXCI7XG5cbnNlbGVjdGlvbi5wcm90b3R5cGUuaW50ZXJydXB0ID0gc2VsZWN0aW9uX2ludGVycnVwdDtcbnNlbGVjdGlvbi5wcm90b3R5cGUudHJhbnNpdGlvbiA9IHNlbGVjdGlvbl90cmFuc2l0aW9uO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oeCkge1xuICByZXR1cm4gTWF0aC5hYnMoeCA9IE1hdGgucm91bmQoeCkpID49IDFlMjFcbiAgICAgID8geC50b0xvY2FsZVN0cmluZyhcImVuXCIpLnJlcGxhY2UoLywvZywgXCJcIilcbiAgICAgIDogeC50b1N0cmluZygxMCk7XG59XG5cbi8vIENvbXB1dGVzIHRoZSBkZWNpbWFsIGNvZWZmaWNpZW50IGFuZCBleHBvbmVudCBvZiB0aGUgc3BlY2lmaWVkIG51bWJlciB4IHdpdGhcbi8vIHNpZ25pZmljYW50IGRpZ2l0cyBwLCB3aGVyZSB4IGlzIHBvc2l0aXZlIGFuZCBwIGlzIGluIFsxLCAyMV0gb3IgdW5kZWZpbmVkLlxuLy8gRm9yIGV4YW1wbGUsIGZvcm1hdERlY2ltYWxQYXJ0cygxLjIzKSByZXR1cm5zIFtcIjEyM1wiLCAwXS5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXREZWNpbWFsUGFydHMoeCwgcCkge1xuICBpZiAoKGkgPSAoeCA9IHAgPyB4LnRvRXhwb25lbnRpYWwocCAtIDEpIDogeC50b0V4cG9uZW50aWFsKCkpLmluZGV4T2YoXCJlXCIpKSA8IDApIHJldHVybiBudWxsOyAvLyBOYU4sIMKxSW5maW5pdHlcbiAgdmFyIGksIGNvZWZmaWNpZW50ID0geC5zbGljZSgwLCBpKTtcblxuICAvLyBUaGUgc3RyaW5nIHJldHVybmVkIGJ5IHRvRXhwb25lbnRpYWwgZWl0aGVyIGhhcyB0aGUgZm9ybSBcXGRcXC5cXGQrZVstK11cXGQrXG4gIC8vIChlLmcuLCAxLjJlKzMpIG9yIHRoZSBmb3JtIFxcZGVbLStdXFxkKyAoZS5nLiwgMWUrMykuXG4gIHJldHVybiBbXG4gICAgY29lZmZpY2llbnQubGVuZ3RoID4gMSA/IGNvZWZmaWNpZW50WzBdICsgY29lZmZpY2llbnQuc2xpY2UoMikgOiBjb2VmZmljaWVudCxcbiAgICAreC5zbGljZShpICsgMSlcbiAgXTtcbn1cbiIsImltcG9ydCB7Zm9ybWF0RGVjaW1hbFBhcnRzfSBmcm9tIFwiLi9mb3JtYXREZWNpbWFsLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIHggPSBmb3JtYXREZWNpbWFsUGFydHMoTWF0aC5hYnMoeCkpLCB4ID8geFsxXSA6IE5hTjtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGdyb3VwaW5nLCB0aG91c2FuZHMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlLCB3aWR0aCkge1xuICAgIHZhciBpID0gdmFsdWUubGVuZ3RoLFxuICAgICAgICB0ID0gW10sXG4gICAgICAgIGogPSAwLFxuICAgICAgICBnID0gZ3JvdXBpbmdbMF0sXG4gICAgICAgIGxlbmd0aCA9IDA7XG5cbiAgICB3aGlsZSAoaSA+IDAgJiYgZyA+IDApIHtcbiAgICAgIGlmIChsZW5ndGggKyBnICsgMSA+IHdpZHRoKSBnID0gTWF0aC5tYXgoMSwgd2lkdGggLSBsZW5ndGgpO1xuICAgICAgdC5wdXNoKHZhbHVlLnN1YnN0cmluZyhpIC09IGcsIGkgKyBnKSk7XG4gICAgICBpZiAoKGxlbmd0aCArPSBnICsgMSkgPiB3aWR0aCkgYnJlYWs7XG4gICAgICBnID0gZ3JvdXBpbmdbaiA9IChqICsgMSkgJSBncm91cGluZy5sZW5ndGhdO1xuICAgIH1cblxuICAgIHJldHVybiB0LnJldmVyc2UoKS5qb2luKHRob3VzYW5kcyk7XG4gIH07XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihudW1lcmFscykge1xuICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUucmVwbGFjZSgvWzAtOV0vZywgZnVuY3Rpb24oaSkge1xuICAgICAgcmV0dXJuIG51bWVyYWxzWytpXTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsIi8vIFtbZmlsbF1hbGlnbl1bc2lnbl1bc3ltYm9sXVswXVt3aWR0aF1bLF1bLnByZWNpc2lvbl1bfl1bdHlwZV1cbnZhciByZSA9IC9eKD86KC4pPyhbPD49Xl0pKT8oWytcXC0oIF0pPyhbJCNdKT8oMCk/KFxcZCspPygsKT8oXFwuXFxkKyk/KH4pPyhbYS16JV0pPyQvaTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZm9ybWF0U3BlY2lmaWVyKHNwZWNpZmllcikge1xuICBpZiAoIShtYXRjaCA9IHJlLmV4ZWMoc3BlY2lmaWVyKSkpIHRocm93IG5ldyBFcnJvcihcImludmFsaWQgZm9ybWF0OiBcIiArIHNwZWNpZmllcik7XG4gIHZhciBtYXRjaDtcbiAgcmV0dXJuIG5ldyBGb3JtYXRTcGVjaWZpZXIoe1xuICAgIGZpbGw6IG1hdGNoWzFdLFxuICAgIGFsaWduOiBtYXRjaFsyXSxcbiAgICBzaWduOiBtYXRjaFszXSxcbiAgICBzeW1ib2w6IG1hdGNoWzRdLFxuICAgIHplcm86IG1hdGNoWzVdLFxuICAgIHdpZHRoOiBtYXRjaFs2XSxcbiAgICBjb21tYTogbWF0Y2hbN10sXG4gICAgcHJlY2lzaW9uOiBtYXRjaFs4XSAmJiBtYXRjaFs4XS5zbGljZSgxKSxcbiAgICB0cmltOiBtYXRjaFs5XSxcbiAgICB0eXBlOiBtYXRjaFsxMF1cbiAgfSk7XG59XG5cbmZvcm1hdFNwZWNpZmllci5wcm90b3R5cGUgPSBGb3JtYXRTcGVjaWZpZXIucHJvdG90eXBlOyAvLyBpbnN0YW5jZW9mXG5cbmV4cG9ydCBmdW5jdGlvbiBGb3JtYXRTcGVjaWZpZXIoc3BlY2lmaWVyKSB7XG4gIHRoaXMuZmlsbCA9IHNwZWNpZmllci5maWxsID09PSB1bmRlZmluZWQgPyBcIiBcIiA6IHNwZWNpZmllci5maWxsICsgXCJcIjtcbiAgdGhpcy5hbGlnbiA9IHNwZWNpZmllci5hbGlnbiA9PT0gdW5kZWZpbmVkID8gXCI+XCIgOiBzcGVjaWZpZXIuYWxpZ24gKyBcIlwiO1xuICB0aGlzLnNpZ24gPSBzcGVjaWZpZXIuc2lnbiA9PT0gdW5kZWZpbmVkID8gXCItXCIgOiBzcGVjaWZpZXIuc2lnbiArIFwiXCI7XG4gIHRoaXMuc3ltYm9sID0gc3BlY2lmaWVyLnN5bWJvbCA9PT0gdW5kZWZpbmVkID8gXCJcIiA6IHNwZWNpZmllci5zeW1ib2wgKyBcIlwiO1xuICB0aGlzLnplcm8gPSAhIXNwZWNpZmllci56ZXJvO1xuICB0aGlzLndpZHRoID0gc3BlY2lmaWVyLndpZHRoID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiArc3BlY2lmaWVyLndpZHRoO1xuICB0aGlzLmNvbW1hID0gISFzcGVjaWZpZXIuY29tbWE7XG4gIHRoaXMucHJlY2lzaW9uID0gc3BlY2lmaWVyLnByZWNpc2lvbiA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogK3NwZWNpZmllci5wcmVjaXNpb247XG4gIHRoaXMudHJpbSA9ICEhc3BlY2lmaWVyLnRyaW07XG4gIHRoaXMudHlwZSA9IHNwZWNpZmllci50eXBlID09PSB1bmRlZmluZWQgPyBcIlwiIDogc3BlY2lmaWVyLnR5cGUgKyBcIlwiO1xufVxuXG5Gb3JtYXRTcGVjaWZpZXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmZpbGxcbiAgICAgICsgdGhpcy5hbGlnblxuICAgICAgKyB0aGlzLnNpZ25cbiAgICAgICsgdGhpcy5zeW1ib2xcbiAgICAgICsgKHRoaXMuemVybyA/IFwiMFwiIDogXCJcIilcbiAgICAgICsgKHRoaXMud2lkdGggPT09IHVuZGVmaW5lZCA/IFwiXCIgOiBNYXRoLm1heCgxLCB0aGlzLndpZHRoIHwgMCkpXG4gICAgICArICh0aGlzLmNvbW1hID8gXCIsXCIgOiBcIlwiKVxuICAgICAgKyAodGhpcy5wcmVjaXNpb24gPT09IHVuZGVmaW5lZCA/IFwiXCIgOiBcIi5cIiArIE1hdGgubWF4KDAsIHRoaXMucHJlY2lzaW9uIHwgMCkpXG4gICAgICArICh0aGlzLnRyaW0gPyBcIn5cIiA6IFwiXCIpXG4gICAgICArIHRoaXMudHlwZTtcbn07XG4iLCIvLyBUcmltcyBpbnNpZ25pZmljYW50IHplcm9zLCBlLmcuLCByZXBsYWNlcyAxLjIwMDBrIHdpdGggMS4yay5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHMpIHtcbiAgb3V0OiBmb3IgKHZhciBuID0gcy5sZW5ndGgsIGkgPSAxLCBpMCA9IC0xLCBpMTsgaSA8IG47ICsraSkge1xuICAgIHN3aXRjaCAoc1tpXSkge1xuICAgICAgY2FzZSBcIi5cIjogaTAgPSBpMSA9IGk7IGJyZWFrO1xuICAgICAgY2FzZSBcIjBcIjogaWYgKGkwID09PSAwKSBpMCA9IGk7IGkxID0gaTsgYnJlYWs7XG4gICAgICBkZWZhdWx0OiBpZiAoIStzW2ldKSBicmVhayBvdXQ7IGlmIChpMCA+IDApIGkwID0gMDsgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBpMCA+IDAgPyBzLnNsaWNlKDAsIGkwKSArIHMuc2xpY2UoaTEgKyAxKSA6IHM7XG59XG4iLCJpbXBvcnQge2Zvcm1hdERlY2ltYWxQYXJ0c30gZnJvbSBcIi4vZm9ybWF0RGVjaW1hbC5qc1wiO1xuXG5leHBvcnQgdmFyIHByZWZpeEV4cG9uZW50O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih4LCBwKSB7XG4gIHZhciBkID0gZm9ybWF0RGVjaW1hbFBhcnRzKHgsIHApO1xuICBpZiAoIWQpIHJldHVybiB4ICsgXCJcIjtcbiAgdmFyIGNvZWZmaWNpZW50ID0gZFswXSxcbiAgICAgIGV4cG9uZW50ID0gZFsxXSxcbiAgICAgIGkgPSBleHBvbmVudCAtIChwcmVmaXhFeHBvbmVudCA9IE1hdGgubWF4KC04LCBNYXRoLm1pbig4LCBNYXRoLmZsb29yKGV4cG9uZW50IC8gMykpKSAqIDMpICsgMSxcbiAgICAgIG4gPSBjb2VmZmljaWVudC5sZW5ndGg7XG4gIHJldHVybiBpID09PSBuID8gY29lZmZpY2llbnRcbiAgICAgIDogaSA+IG4gPyBjb2VmZmljaWVudCArIG5ldyBBcnJheShpIC0gbiArIDEpLmpvaW4oXCIwXCIpXG4gICAgICA6IGkgPiAwID8gY29lZmZpY2llbnQuc2xpY2UoMCwgaSkgKyBcIi5cIiArIGNvZWZmaWNpZW50LnNsaWNlKGkpXG4gICAgICA6IFwiMC5cIiArIG5ldyBBcnJheSgxIC0gaSkuam9pbihcIjBcIikgKyBmb3JtYXREZWNpbWFsUGFydHMoeCwgTWF0aC5tYXgoMCwgcCArIGkgLSAxKSlbMF07IC8vIGxlc3MgdGhhbiAxeSFcbn1cbiIsImltcG9ydCB7Zm9ybWF0RGVjaW1hbFBhcnRzfSBmcm9tIFwiLi9mb3JtYXREZWNpbWFsLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHgsIHApIHtcbiAgdmFyIGQgPSBmb3JtYXREZWNpbWFsUGFydHMoeCwgcCk7XG4gIGlmICghZCkgcmV0dXJuIHggKyBcIlwiO1xuICB2YXIgY29lZmZpY2llbnQgPSBkWzBdLFxuICAgICAgZXhwb25lbnQgPSBkWzFdO1xuICByZXR1cm4gZXhwb25lbnQgPCAwID8gXCIwLlwiICsgbmV3IEFycmF5KC1leHBvbmVudCkuam9pbihcIjBcIikgKyBjb2VmZmljaWVudFxuICAgICAgOiBjb2VmZmljaWVudC5sZW5ndGggPiBleHBvbmVudCArIDEgPyBjb2VmZmljaWVudC5zbGljZSgwLCBleHBvbmVudCArIDEpICsgXCIuXCIgKyBjb2VmZmljaWVudC5zbGljZShleHBvbmVudCArIDEpXG4gICAgICA6IGNvZWZmaWNpZW50ICsgbmV3IEFycmF5KGV4cG9uZW50IC0gY29lZmZpY2llbnQubGVuZ3RoICsgMikuam9pbihcIjBcIik7XG59XG4iLCJpbXBvcnQgZm9ybWF0RGVjaW1hbCBmcm9tIFwiLi9mb3JtYXREZWNpbWFsLmpzXCI7XG5pbXBvcnQgZm9ybWF0UHJlZml4QXV0byBmcm9tIFwiLi9mb3JtYXRQcmVmaXhBdXRvLmpzXCI7XG5pbXBvcnQgZm9ybWF0Um91bmRlZCBmcm9tIFwiLi9mb3JtYXRSb3VuZGVkLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgXCIlXCI6ICh4LCBwKSA9PiAoeCAqIDEwMCkudG9GaXhlZChwKSxcbiAgXCJiXCI6ICh4KSA9PiBNYXRoLnJvdW5kKHgpLnRvU3RyaW5nKDIpLFxuICBcImNcIjogKHgpID0+IHggKyBcIlwiLFxuICBcImRcIjogZm9ybWF0RGVjaW1hbCxcbiAgXCJlXCI6ICh4LCBwKSA9PiB4LnRvRXhwb25lbnRpYWwocCksXG4gIFwiZlwiOiAoeCwgcCkgPT4geC50b0ZpeGVkKHApLFxuICBcImdcIjogKHgsIHApID0+IHgudG9QcmVjaXNpb24ocCksXG4gIFwib1wiOiAoeCkgPT4gTWF0aC5yb3VuZCh4KS50b1N0cmluZyg4KSxcbiAgXCJwXCI6ICh4LCBwKSA9PiBmb3JtYXRSb3VuZGVkKHggKiAxMDAsIHApLFxuICBcInJcIjogZm9ybWF0Um91bmRlZCxcbiAgXCJzXCI6IGZvcm1hdFByZWZpeEF1dG8sXG4gIFwiWFwiOiAoeCkgPT4gTWF0aC5yb3VuZCh4KS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKSxcbiAgXCJ4XCI6ICh4KSA9PiBNYXRoLnJvdW5kKHgpLnRvU3RyaW5nKDE2KVxufTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIHg7XG59XG4iLCJpbXBvcnQgZXhwb25lbnQgZnJvbSBcIi4vZXhwb25lbnQuanNcIjtcbmltcG9ydCBmb3JtYXRHcm91cCBmcm9tIFwiLi9mb3JtYXRHcm91cC5qc1wiO1xuaW1wb3J0IGZvcm1hdE51bWVyYWxzIGZyb20gXCIuL2Zvcm1hdE51bWVyYWxzLmpzXCI7XG5pbXBvcnQgZm9ybWF0U3BlY2lmaWVyIGZyb20gXCIuL2Zvcm1hdFNwZWNpZmllci5qc1wiO1xuaW1wb3J0IGZvcm1hdFRyaW0gZnJvbSBcIi4vZm9ybWF0VHJpbS5qc1wiO1xuaW1wb3J0IGZvcm1hdFR5cGVzIGZyb20gXCIuL2Zvcm1hdFR5cGVzLmpzXCI7XG5pbXBvcnQge3ByZWZpeEV4cG9uZW50fSBmcm9tIFwiLi9mb3JtYXRQcmVmaXhBdXRvLmpzXCI7XG5pbXBvcnQgaWRlbnRpdHkgZnJvbSBcIi4vaWRlbnRpdHkuanNcIjtcblxudmFyIG1hcCA9IEFycmF5LnByb3RvdHlwZS5tYXAsXG4gICAgcHJlZml4ZXMgPSBbXCJ5XCIsXCJ6XCIsXCJhXCIsXCJmXCIsXCJwXCIsXCJuXCIsXCLCtVwiLFwibVwiLFwiXCIsXCJrXCIsXCJNXCIsXCJHXCIsXCJUXCIsXCJQXCIsXCJFXCIsXCJaXCIsXCJZXCJdO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihsb2NhbGUpIHtcbiAgdmFyIGdyb3VwID0gbG9jYWxlLmdyb3VwaW5nID09PSB1bmRlZmluZWQgfHwgbG9jYWxlLnRob3VzYW5kcyA9PT0gdW5kZWZpbmVkID8gaWRlbnRpdHkgOiBmb3JtYXRHcm91cChtYXAuY2FsbChsb2NhbGUuZ3JvdXBpbmcsIE51bWJlciksIGxvY2FsZS50aG91c2FuZHMgKyBcIlwiKSxcbiAgICAgIGN1cnJlbmN5UHJlZml4ID0gbG9jYWxlLmN1cnJlbmN5ID09PSB1bmRlZmluZWQgPyBcIlwiIDogbG9jYWxlLmN1cnJlbmN5WzBdICsgXCJcIixcbiAgICAgIGN1cnJlbmN5U3VmZml4ID0gbG9jYWxlLmN1cnJlbmN5ID09PSB1bmRlZmluZWQgPyBcIlwiIDogbG9jYWxlLmN1cnJlbmN5WzFdICsgXCJcIixcbiAgICAgIGRlY2ltYWwgPSBsb2NhbGUuZGVjaW1hbCA9PT0gdW5kZWZpbmVkID8gXCIuXCIgOiBsb2NhbGUuZGVjaW1hbCArIFwiXCIsXG4gICAgICBudW1lcmFscyA9IGxvY2FsZS5udW1lcmFscyA9PT0gdW5kZWZpbmVkID8gaWRlbnRpdHkgOiBmb3JtYXROdW1lcmFscyhtYXAuY2FsbChsb2NhbGUubnVtZXJhbHMsIFN0cmluZykpLFxuICAgICAgcGVyY2VudCA9IGxvY2FsZS5wZXJjZW50ID09PSB1bmRlZmluZWQgPyBcIiVcIiA6IGxvY2FsZS5wZXJjZW50ICsgXCJcIixcbiAgICAgIG1pbnVzID0gbG9jYWxlLm1pbnVzID09PSB1bmRlZmluZWQgPyBcIuKIklwiIDogbG9jYWxlLm1pbnVzICsgXCJcIixcbiAgICAgIG5hbiA9IGxvY2FsZS5uYW4gPT09IHVuZGVmaW5lZCA/IFwiTmFOXCIgOiBsb2NhbGUubmFuICsgXCJcIjtcblxuICBmdW5jdGlvbiBuZXdGb3JtYXQoc3BlY2lmaWVyKSB7XG4gICAgc3BlY2lmaWVyID0gZm9ybWF0U3BlY2lmaWVyKHNwZWNpZmllcik7XG5cbiAgICB2YXIgZmlsbCA9IHNwZWNpZmllci5maWxsLFxuICAgICAgICBhbGlnbiA9IHNwZWNpZmllci5hbGlnbixcbiAgICAgICAgc2lnbiA9IHNwZWNpZmllci5zaWduLFxuICAgICAgICBzeW1ib2wgPSBzcGVjaWZpZXIuc3ltYm9sLFxuICAgICAgICB6ZXJvID0gc3BlY2lmaWVyLnplcm8sXG4gICAgICAgIHdpZHRoID0gc3BlY2lmaWVyLndpZHRoLFxuICAgICAgICBjb21tYSA9IHNwZWNpZmllci5jb21tYSxcbiAgICAgICAgcHJlY2lzaW9uID0gc3BlY2lmaWVyLnByZWNpc2lvbixcbiAgICAgICAgdHJpbSA9IHNwZWNpZmllci50cmltLFxuICAgICAgICB0eXBlID0gc3BlY2lmaWVyLnR5cGU7XG5cbiAgICAvLyBUaGUgXCJuXCIgdHlwZSBpcyBhbiBhbGlhcyBmb3IgXCIsZ1wiLlxuICAgIGlmICh0eXBlID09PSBcIm5cIikgY29tbWEgPSB0cnVlLCB0eXBlID0gXCJnXCI7XG5cbiAgICAvLyBUaGUgXCJcIiB0eXBlLCBhbmQgYW55IGludmFsaWQgdHlwZSwgaXMgYW4gYWxpYXMgZm9yIFwiLjEyfmdcIi5cbiAgICBlbHNlIGlmICghZm9ybWF0VHlwZXNbdHlwZV0pIHByZWNpc2lvbiA9PT0gdW5kZWZpbmVkICYmIChwcmVjaXNpb24gPSAxMiksIHRyaW0gPSB0cnVlLCB0eXBlID0gXCJnXCI7XG5cbiAgICAvLyBJZiB6ZXJvIGZpbGwgaXMgc3BlY2lmaWVkLCBwYWRkaW5nIGdvZXMgYWZ0ZXIgc2lnbiBhbmQgYmVmb3JlIGRpZ2l0cy5cbiAgICBpZiAoemVybyB8fCAoZmlsbCA9PT0gXCIwXCIgJiYgYWxpZ24gPT09IFwiPVwiKSkgemVybyA9IHRydWUsIGZpbGwgPSBcIjBcIiwgYWxpZ24gPSBcIj1cIjtcblxuICAgIC8vIENvbXB1dGUgdGhlIHByZWZpeCBhbmQgc3VmZml4LlxuICAgIC8vIEZvciBTSS1wcmVmaXgsIHRoZSBzdWZmaXggaXMgbGF6aWx5IGNvbXB1dGVkLlxuICAgIHZhciBwcmVmaXggPSBzeW1ib2wgPT09IFwiJFwiID8gY3VycmVuY3lQcmVmaXggOiBzeW1ib2wgPT09IFwiI1wiICYmIC9bYm94WF0vLnRlc3QodHlwZSkgPyBcIjBcIiArIHR5cGUudG9Mb3dlckNhc2UoKSA6IFwiXCIsXG4gICAgICAgIHN1ZmZpeCA9IHN5bWJvbCA9PT0gXCIkXCIgPyBjdXJyZW5jeVN1ZmZpeCA6IC9bJXBdLy50ZXN0KHR5cGUpID8gcGVyY2VudCA6IFwiXCI7XG5cbiAgICAvLyBXaGF0IGZvcm1hdCBmdW5jdGlvbiBzaG91bGQgd2UgdXNlP1xuICAgIC8vIElzIHRoaXMgYW4gaW50ZWdlciB0eXBlP1xuICAgIC8vIENhbiB0aGlzIHR5cGUgZ2VuZXJhdGUgZXhwb25lbnRpYWwgbm90YXRpb24/XG4gICAgdmFyIGZvcm1hdFR5cGUgPSBmb3JtYXRUeXBlc1t0eXBlXSxcbiAgICAgICAgbWF5YmVTdWZmaXggPSAvW2RlZmdwcnMlXS8udGVzdCh0eXBlKTtcblxuICAgIC8vIFNldCB0aGUgZGVmYXVsdCBwcmVjaXNpb24gaWYgbm90IHNwZWNpZmllZCxcbiAgICAvLyBvciBjbGFtcCB0aGUgc3BlY2lmaWVkIHByZWNpc2lvbiB0byB0aGUgc3VwcG9ydGVkIHJhbmdlLlxuICAgIC8vIEZvciBzaWduaWZpY2FudCBwcmVjaXNpb24sIGl0IG11c3QgYmUgaW4gWzEsIDIxXS5cbiAgICAvLyBGb3IgZml4ZWQgcHJlY2lzaW9uLCBpdCBtdXN0IGJlIGluIFswLCAyMF0uXG4gICAgcHJlY2lzaW9uID0gcHJlY2lzaW9uID09PSB1bmRlZmluZWQgPyA2XG4gICAgICAgIDogL1tncHJzXS8udGVzdCh0eXBlKSA/IE1hdGgubWF4KDEsIE1hdGgubWluKDIxLCBwcmVjaXNpb24pKVxuICAgICAgICA6IE1hdGgubWF4KDAsIE1hdGgubWluKDIwLCBwcmVjaXNpb24pKTtcblxuICAgIGZ1bmN0aW9uIGZvcm1hdCh2YWx1ZSkge1xuICAgICAgdmFyIHZhbHVlUHJlZml4ID0gcHJlZml4LFxuICAgICAgICAgIHZhbHVlU3VmZml4ID0gc3VmZml4LFxuICAgICAgICAgIGksIG4sIGM7XG5cbiAgICAgIGlmICh0eXBlID09PSBcImNcIikge1xuICAgICAgICB2YWx1ZVN1ZmZpeCA9IGZvcm1hdFR5cGUodmFsdWUpICsgdmFsdWVTdWZmaXg7XG4gICAgICAgIHZhbHVlID0gXCJcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlID0gK3ZhbHVlO1xuXG4gICAgICAgIC8vIERldGVybWluZSB0aGUgc2lnbi4gLTAgaXMgbm90IGxlc3MgdGhhbiAwLCBidXQgMSAvIC0wIGlzIVxuICAgICAgICB2YXIgdmFsdWVOZWdhdGl2ZSA9IHZhbHVlIDwgMCB8fCAxIC8gdmFsdWUgPCAwO1xuXG4gICAgICAgIC8vIFBlcmZvcm0gdGhlIGluaXRpYWwgZm9ybWF0dGluZy5cbiAgICAgICAgdmFsdWUgPSBpc05hTih2YWx1ZSkgPyBuYW4gOiBmb3JtYXRUeXBlKE1hdGguYWJzKHZhbHVlKSwgcHJlY2lzaW9uKTtcblxuICAgICAgICAvLyBUcmltIGluc2lnbmlmaWNhbnQgemVyb3MuXG4gICAgICAgIGlmICh0cmltKSB2YWx1ZSA9IGZvcm1hdFRyaW0odmFsdWUpO1xuXG4gICAgICAgIC8vIElmIGEgbmVnYXRpdmUgdmFsdWUgcm91bmRzIHRvIHplcm8gYWZ0ZXIgZm9ybWF0dGluZywgYW5kIG5vIGV4cGxpY2l0IHBvc2l0aXZlIHNpZ24gaXMgcmVxdWVzdGVkLCBoaWRlIHRoZSBzaWduLlxuICAgICAgICBpZiAodmFsdWVOZWdhdGl2ZSAmJiArdmFsdWUgPT09IDAgJiYgc2lnbiAhPT0gXCIrXCIpIHZhbHVlTmVnYXRpdmUgPSBmYWxzZTtcblxuICAgICAgICAvLyBDb21wdXRlIHRoZSBwcmVmaXggYW5kIHN1ZmZpeC5cbiAgICAgICAgdmFsdWVQcmVmaXggPSAodmFsdWVOZWdhdGl2ZSA/IChzaWduID09PSBcIihcIiA/IHNpZ24gOiBtaW51cykgOiBzaWduID09PSBcIi1cIiB8fCBzaWduID09PSBcIihcIiA/IFwiXCIgOiBzaWduKSArIHZhbHVlUHJlZml4O1xuICAgICAgICB2YWx1ZVN1ZmZpeCA9ICh0eXBlID09PSBcInNcIiA/IHByZWZpeGVzWzggKyBwcmVmaXhFeHBvbmVudCAvIDNdIDogXCJcIikgKyB2YWx1ZVN1ZmZpeCArICh2YWx1ZU5lZ2F0aXZlICYmIHNpZ24gPT09IFwiKFwiID8gXCIpXCIgOiBcIlwiKTtcblxuICAgICAgICAvLyBCcmVhayB0aGUgZm9ybWF0dGVkIHZhbHVlIGludG8gdGhlIGludGVnZXIg4oCcdmFsdWXigJ0gcGFydCB0aGF0IGNhbiBiZVxuICAgICAgICAvLyBncm91cGVkLCBhbmQgZnJhY3Rpb25hbCBvciBleHBvbmVudGlhbCDigJxzdWZmaXjigJ0gcGFydCB0aGF0IGlzIG5vdC5cbiAgICAgICAgaWYgKG1heWJlU3VmZml4KSB7XG4gICAgICAgICAgaSA9IC0xLCBuID0gdmFsdWUubGVuZ3RoO1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICAgICAgICBpZiAoYyA9IHZhbHVlLmNoYXJDb2RlQXQoaSksIDQ4ID4gYyB8fCBjID4gNTcpIHtcbiAgICAgICAgICAgICAgdmFsdWVTdWZmaXggPSAoYyA9PT0gNDYgPyBkZWNpbWFsICsgdmFsdWUuc2xpY2UoaSArIDEpIDogdmFsdWUuc2xpY2UoaSkpICsgdmFsdWVTdWZmaXg7XG4gICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuc2xpY2UoMCwgaSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBJZiB0aGUgZmlsbCBjaGFyYWN0ZXIgaXMgbm90IFwiMFwiLCBncm91cGluZyBpcyBhcHBsaWVkIGJlZm9yZSBwYWRkaW5nLlxuICAgICAgaWYgKGNvbW1hICYmICF6ZXJvKSB2YWx1ZSA9IGdyb3VwKHZhbHVlLCBJbmZpbml0eSk7XG5cbiAgICAgIC8vIENvbXB1dGUgdGhlIHBhZGRpbmcuXG4gICAgICB2YXIgbGVuZ3RoID0gdmFsdWVQcmVmaXgubGVuZ3RoICsgdmFsdWUubGVuZ3RoICsgdmFsdWVTdWZmaXgubGVuZ3RoLFxuICAgICAgICAgIHBhZGRpbmcgPSBsZW5ndGggPCB3aWR0aCA/IG5ldyBBcnJheSh3aWR0aCAtIGxlbmd0aCArIDEpLmpvaW4oZmlsbCkgOiBcIlwiO1xuXG4gICAgICAvLyBJZiB0aGUgZmlsbCBjaGFyYWN0ZXIgaXMgXCIwXCIsIGdyb3VwaW5nIGlzIGFwcGxpZWQgYWZ0ZXIgcGFkZGluZy5cbiAgICAgIGlmIChjb21tYSAmJiB6ZXJvKSB2YWx1ZSA9IGdyb3VwKHBhZGRpbmcgKyB2YWx1ZSwgcGFkZGluZy5sZW5ndGggPyB3aWR0aCAtIHZhbHVlU3VmZml4Lmxlbmd0aCA6IEluZmluaXR5KSwgcGFkZGluZyA9IFwiXCI7XG5cbiAgICAgIC8vIFJlY29uc3RydWN0IHRoZSBmaW5hbCBvdXRwdXQgYmFzZWQgb24gdGhlIGRlc2lyZWQgYWxpZ25tZW50LlxuICAgICAgc3dpdGNoIChhbGlnbikge1xuICAgICAgICBjYXNlIFwiPFwiOiB2YWx1ZSA9IHZhbHVlUHJlZml4ICsgdmFsdWUgKyB2YWx1ZVN1ZmZpeCArIHBhZGRpbmc7IGJyZWFrO1xuICAgICAgICBjYXNlIFwiPVwiOiB2YWx1ZSA9IHZhbHVlUHJlZml4ICsgcGFkZGluZyArIHZhbHVlICsgdmFsdWVTdWZmaXg7IGJyZWFrO1xuICAgICAgICBjYXNlIFwiXlwiOiB2YWx1ZSA9IHBhZGRpbmcuc2xpY2UoMCwgbGVuZ3RoID0gcGFkZGluZy5sZW5ndGggPj4gMSkgKyB2YWx1ZVByZWZpeCArIHZhbHVlICsgdmFsdWVTdWZmaXggKyBwYWRkaW5nLnNsaWNlKGxlbmd0aCk7IGJyZWFrO1xuICAgICAgICBkZWZhdWx0OiB2YWx1ZSA9IHBhZGRpbmcgKyB2YWx1ZVByZWZpeCArIHZhbHVlICsgdmFsdWVTdWZmaXg7IGJyZWFrO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbnVtZXJhbHModmFsdWUpO1xuICAgIH1cblxuICAgIGZvcm1hdC50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHNwZWNpZmllciArIFwiXCI7XG4gICAgfTtcblxuICAgIHJldHVybiBmb3JtYXQ7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRQcmVmaXgoc3BlY2lmaWVyLCB2YWx1ZSkge1xuICAgIHZhciBmID0gbmV3Rm9ybWF0KChzcGVjaWZpZXIgPSBmb3JtYXRTcGVjaWZpZXIoc3BlY2lmaWVyKSwgc3BlY2lmaWVyLnR5cGUgPSBcImZcIiwgc3BlY2lmaWVyKSksXG4gICAgICAgIGUgPSBNYXRoLm1heCgtOCwgTWF0aC5taW4oOCwgTWF0aC5mbG9vcihleHBvbmVudCh2YWx1ZSkgLyAzKSkpICogMyxcbiAgICAgICAgayA9IE1hdGgucG93KDEwLCAtZSksXG4gICAgICAgIHByZWZpeCA9IHByZWZpeGVzWzggKyBlIC8gM107XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gZihrICogdmFsdWUpICsgcHJlZml4O1xuICAgIH07XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGZvcm1hdDogbmV3Rm9ybWF0LFxuICAgIGZvcm1hdFByZWZpeDogZm9ybWF0UHJlZml4XG4gIH07XG59XG4iLCJpbXBvcnQgZm9ybWF0TG9jYWxlIGZyb20gXCIuL2xvY2FsZS5qc1wiO1xuXG52YXIgbG9jYWxlO1xuZXhwb3J0IHZhciBmb3JtYXQ7XG5leHBvcnQgdmFyIGZvcm1hdFByZWZpeDtcblxuZGVmYXVsdExvY2FsZSh7XG4gIHRob3VzYW5kczogXCIsXCIsXG4gIGdyb3VwaW5nOiBbM10sXG4gIGN1cnJlbmN5OiBbXCIkXCIsIFwiXCJdXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGVmYXVsdExvY2FsZShkZWZpbml0aW9uKSB7XG4gIGxvY2FsZSA9IGZvcm1hdExvY2FsZShkZWZpbml0aW9uKTtcbiAgZm9ybWF0ID0gbG9jYWxlLmZvcm1hdDtcbiAgZm9ybWF0UHJlZml4ID0gbG9jYWxlLmZvcm1hdFByZWZpeDtcbiAgcmV0dXJuIGxvY2FsZTtcbn1cbiIsImltcG9ydCBleHBvbmVudCBmcm9tIFwiLi9leHBvbmVudC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzdGVwKSB7XG4gIHJldHVybiBNYXRoLm1heCgwLCAtZXhwb25lbnQoTWF0aC5hYnMoc3RlcCkpKTtcbn1cbiIsImltcG9ydCBleHBvbmVudCBmcm9tIFwiLi9leHBvbmVudC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzdGVwLCB2YWx1ZSkge1xuICByZXR1cm4gTWF0aC5tYXgoMCwgTWF0aC5tYXgoLTgsIE1hdGgubWluKDgsIE1hdGguZmxvb3IoZXhwb25lbnQodmFsdWUpIC8gMykpKSAqIDMgLSBleHBvbmVudChNYXRoLmFicyhzdGVwKSkpO1xufVxuIiwiaW1wb3J0IGV4cG9uZW50IGZyb20gXCIuL2V4cG9uZW50LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHN0ZXAsIG1heCkge1xuICBzdGVwID0gTWF0aC5hYnMoc3RlcCksIG1heCA9IE1hdGguYWJzKG1heCkgLSBzdGVwO1xuICByZXR1cm4gTWF0aC5tYXgoMCwgZXhwb25lbnQobWF4KSAtIGV4cG9uZW50KHN0ZXApKSArIDE7XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gaW5pdFJhbmdlKGRvbWFpbiwgcmFuZ2UpIHtcbiAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgY2FzZSAwOiBicmVhaztcbiAgICBjYXNlIDE6IHRoaXMucmFuZ2UoZG9tYWluKTsgYnJlYWs7XG4gICAgZGVmYXVsdDogdGhpcy5yYW5nZShyYW5nZSkuZG9tYWluKGRvbWFpbik7IGJyZWFrO1xuICB9XG4gIHJldHVybiB0aGlzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdEludGVycG9sYXRvcihkb21haW4sIGludGVycG9sYXRvcikge1xuICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICBjYXNlIDA6IGJyZWFrO1xuICAgIGNhc2UgMToge1xuICAgICAgaWYgKHR5cGVvZiBkb21haW4gPT09IFwiZnVuY3Rpb25cIikgdGhpcy5pbnRlcnBvbGF0b3IoZG9tYWluKTtcbiAgICAgIGVsc2UgdGhpcy5yYW5nZShkb21haW4pO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGRlZmF1bHQ6IHtcbiAgICAgIHRoaXMuZG9tYWluKGRvbWFpbik7XG4gICAgICBpZiAodHlwZW9mIGludGVycG9sYXRvciA9PT0gXCJmdW5jdGlvblwiKSB0aGlzLmludGVycG9sYXRvcihpbnRlcnBvbGF0b3IpO1xuICAgICAgZWxzZSB0aGlzLnJhbmdlKGludGVycG9sYXRvcik7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb25zdGFudHMoeCkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHg7XG4gIH07XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBudW1iZXIoeCkge1xuICByZXR1cm4gK3g7XG59XG4iLCJpbXBvcnQge2Jpc2VjdH0gZnJvbSBcImQzLWFycmF5XCI7XG5pbXBvcnQge2ludGVycG9sYXRlIGFzIGludGVycG9sYXRlVmFsdWUsIGludGVycG9sYXRlTnVtYmVyLCBpbnRlcnBvbGF0ZVJvdW5kfSBmcm9tIFwiZDMtaW50ZXJwb2xhdGVcIjtcbmltcG9ydCBjb25zdGFudCBmcm9tIFwiLi9jb25zdGFudC5qc1wiO1xuaW1wb3J0IG51bWJlciBmcm9tIFwiLi9udW1iZXIuanNcIjtcblxudmFyIHVuaXQgPSBbMCwgMV07XG5cbmV4cG9ydCBmdW5jdGlvbiBpZGVudGl0eSh4KSB7XG4gIHJldHVybiB4O1xufVxuXG5mdW5jdGlvbiBub3JtYWxpemUoYSwgYikge1xuICByZXR1cm4gKGIgLT0gKGEgPSArYSkpXG4gICAgICA/IGZ1bmN0aW9uKHgpIHsgcmV0dXJuICh4IC0gYSkgLyBiOyB9XG4gICAgICA6IGNvbnN0YW50KGlzTmFOKGIpID8gTmFOIDogMC41KTtcbn1cblxuZnVuY3Rpb24gY2xhbXBlcihhLCBiKSB7XG4gIHZhciB0O1xuICBpZiAoYSA+IGIpIHQgPSBhLCBhID0gYiwgYiA9IHQ7XG4gIHJldHVybiBmdW5jdGlvbih4KSB7IHJldHVybiBNYXRoLm1heChhLCBNYXRoLm1pbihiLCB4KSk7IH07XG59XG5cbi8vIG5vcm1hbGl6ZShhLCBiKSh4KSB0YWtlcyBhIGRvbWFpbiB2YWx1ZSB4IGluIFthLGJdIGFuZCByZXR1cm5zIHRoZSBjb3JyZXNwb25kaW5nIHBhcmFtZXRlciB0IGluIFswLDFdLlxuLy8gaW50ZXJwb2xhdGUoYSwgYikodCkgdGFrZXMgYSBwYXJhbWV0ZXIgdCBpbiBbMCwxXSBhbmQgcmV0dXJucyB0aGUgY29ycmVzcG9uZGluZyByYW5nZSB2YWx1ZSB4IGluIFthLGJdLlxuZnVuY3Rpb24gYmltYXAoZG9tYWluLCByYW5nZSwgaW50ZXJwb2xhdGUpIHtcbiAgdmFyIGQwID0gZG9tYWluWzBdLCBkMSA9IGRvbWFpblsxXSwgcjAgPSByYW5nZVswXSwgcjEgPSByYW5nZVsxXTtcbiAgaWYgKGQxIDwgZDApIGQwID0gbm9ybWFsaXplKGQxLCBkMCksIHIwID0gaW50ZXJwb2xhdGUocjEsIHIwKTtcbiAgZWxzZSBkMCA9IG5vcm1hbGl6ZShkMCwgZDEpLCByMCA9IGludGVycG9sYXRlKHIwLCByMSk7XG4gIHJldHVybiBmdW5jdGlvbih4KSB7IHJldHVybiByMChkMCh4KSk7IH07XG59XG5cbmZ1bmN0aW9uIHBvbHltYXAoZG9tYWluLCByYW5nZSwgaW50ZXJwb2xhdGUpIHtcbiAgdmFyIGogPSBNYXRoLm1pbihkb21haW4ubGVuZ3RoLCByYW5nZS5sZW5ndGgpIC0gMSxcbiAgICAgIGQgPSBuZXcgQXJyYXkoaiksXG4gICAgICByID0gbmV3IEFycmF5KGopLFxuICAgICAgaSA9IC0xO1xuXG4gIC8vIFJldmVyc2UgZGVzY2VuZGluZyBkb21haW5zLlxuICBpZiAoZG9tYWluW2pdIDwgZG9tYWluWzBdKSB7XG4gICAgZG9tYWluID0gZG9tYWluLnNsaWNlKCkucmV2ZXJzZSgpO1xuICAgIHJhbmdlID0gcmFuZ2Uuc2xpY2UoKS5yZXZlcnNlKCk7XG4gIH1cblxuICB3aGlsZSAoKytpIDwgaikge1xuICAgIGRbaV0gPSBub3JtYWxpemUoZG9tYWluW2ldLCBkb21haW5baSArIDFdKTtcbiAgICByW2ldID0gaW50ZXJwb2xhdGUocmFuZ2VbaV0sIHJhbmdlW2kgKyAxXSk7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24oeCkge1xuICAgIHZhciBpID0gYmlzZWN0KGRvbWFpbiwgeCwgMSwgaikgLSAxO1xuICAgIHJldHVybiByW2ldKGRbaV0oeCkpO1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29weShzb3VyY2UsIHRhcmdldCkge1xuICByZXR1cm4gdGFyZ2V0XG4gICAgICAuZG9tYWluKHNvdXJjZS5kb21haW4oKSlcbiAgICAgIC5yYW5nZShzb3VyY2UucmFuZ2UoKSlcbiAgICAgIC5pbnRlcnBvbGF0ZShzb3VyY2UuaW50ZXJwb2xhdGUoKSlcbiAgICAgIC5jbGFtcChzb3VyY2UuY2xhbXAoKSlcbiAgICAgIC51bmtub3duKHNvdXJjZS51bmtub3duKCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3JtZXIoKSB7XG4gIHZhciBkb21haW4gPSB1bml0LFxuICAgICAgcmFuZ2UgPSB1bml0LFxuICAgICAgaW50ZXJwb2xhdGUgPSBpbnRlcnBvbGF0ZVZhbHVlLFxuICAgICAgdHJhbnNmb3JtLFxuICAgICAgdW50cmFuc2Zvcm0sXG4gICAgICB1bmtub3duLFxuICAgICAgY2xhbXAgPSBpZGVudGl0eSxcbiAgICAgIHBpZWNld2lzZSxcbiAgICAgIG91dHB1dCxcbiAgICAgIGlucHV0O1xuXG4gIGZ1bmN0aW9uIHJlc2NhbGUoKSB7XG4gICAgdmFyIG4gPSBNYXRoLm1pbihkb21haW4ubGVuZ3RoLCByYW5nZS5sZW5ndGgpO1xuICAgIGlmIChjbGFtcCAhPT0gaWRlbnRpdHkpIGNsYW1wID0gY2xhbXBlcihkb21haW5bMF0sIGRvbWFpbltuIC0gMV0pO1xuICAgIHBpZWNld2lzZSA9IG4gPiAyID8gcG9seW1hcCA6IGJpbWFwO1xuICAgIG91dHB1dCA9IGlucHV0ID0gbnVsbDtcbiAgICByZXR1cm4gc2NhbGU7XG4gIH1cblxuICBmdW5jdGlvbiBzY2FsZSh4KSB7XG4gICAgcmV0dXJuIHggPT0gbnVsbCB8fCBpc05hTih4ID0gK3gpID8gdW5rbm93biA6IChvdXRwdXQgfHwgKG91dHB1dCA9IHBpZWNld2lzZShkb21haW4ubWFwKHRyYW5zZm9ybSksIHJhbmdlLCBpbnRlcnBvbGF0ZSkpKSh0cmFuc2Zvcm0oY2xhbXAoeCkpKTtcbiAgfVxuXG4gIHNjYWxlLmludmVydCA9IGZ1bmN0aW9uKHkpIHtcbiAgICByZXR1cm4gY2xhbXAodW50cmFuc2Zvcm0oKGlucHV0IHx8IChpbnB1dCA9IHBpZWNld2lzZShyYW5nZSwgZG9tYWluLm1hcCh0cmFuc2Zvcm0pLCBpbnRlcnBvbGF0ZU51bWJlcikpKSh5KSkpO1xuICB9O1xuXG4gIHNjYWxlLmRvbWFpbiA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChkb21haW4gPSBBcnJheS5mcm9tKF8sIG51bWJlciksIHJlc2NhbGUoKSkgOiBkb21haW4uc2xpY2UoKTtcbiAgfTtcblxuICBzY2FsZS5yYW5nZSA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChyYW5nZSA9IEFycmF5LmZyb20oXyksIHJlc2NhbGUoKSkgOiByYW5nZS5zbGljZSgpO1xuICB9O1xuXG4gIHNjYWxlLnJhbmdlUm91bmQgPSBmdW5jdGlvbihfKSB7XG4gICAgcmV0dXJuIHJhbmdlID0gQXJyYXkuZnJvbShfKSwgaW50ZXJwb2xhdGUgPSBpbnRlcnBvbGF0ZVJvdW5kLCByZXNjYWxlKCk7XG4gIH07XG5cbiAgc2NhbGUuY2xhbXAgPSBmdW5jdGlvbihfKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAoY2xhbXAgPSBfID8gdHJ1ZSA6IGlkZW50aXR5LCByZXNjYWxlKCkpIDogY2xhbXAgIT09IGlkZW50aXR5O1xuICB9O1xuXG4gIHNjYWxlLmludGVycG9sYXRlID0gZnVuY3Rpb24oXykge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKGludGVycG9sYXRlID0gXywgcmVzY2FsZSgpKSA6IGludGVycG9sYXRlO1xuICB9O1xuXG4gIHNjYWxlLnVua25vd24gPSBmdW5jdGlvbihfKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAodW5rbm93biA9IF8sIHNjYWxlKSA6IHVua25vd247XG4gIH07XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKHQsIHUpIHtcbiAgICB0cmFuc2Zvcm0gPSB0LCB1bnRyYW5zZm9ybSA9IHU7XG4gICAgcmV0dXJuIHJlc2NhbGUoKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udGludW91cygpIHtcbiAgcmV0dXJuIHRyYW5zZm9ybWVyKCkoaWRlbnRpdHksIGlkZW50aXR5KTtcbn1cbiIsImltcG9ydCB7dGlja1N0ZXB9IGZyb20gXCJkMy1hcnJheVwiO1xuaW1wb3J0IHtmb3JtYXQsIGZvcm1hdFByZWZpeCwgZm9ybWF0U3BlY2lmaWVyLCBwcmVjaXNpb25GaXhlZCwgcHJlY2lzaW9uUHJlZml4LCBwcmVjaXNpb25Sb3VuZH0gZnJvbSBcImQzLWZvcm1hdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0aWNrRm9ybWF0KHN0YXJ0LCBzdG9wLCBjb3VudCwgc3BlY2lmaWVyKSB7XG4gIHZhciBzdGVwID0gdGlja1N0ZXAoc3RhcnQsIHN0b3AsIGNvdW50KSxcbiAgICAgIHByZWNpc2lvbjtcbiAgc3BlY2lmaWVyID0gZm9ybWF0U3BlY2lmaWVyKHNwZWNpZmllciA9PSBudWxsID8gXCIsZlwiIDogc3BlY2lmaWVyKTtcbiAgc3dpdGNoIChzcGVjaWZpZXIudHlwZSkge1xuICAgIGNhc2UgXCJzXCI6IHtcbiAgICAgIHZhciB2YWx1ZSA9IE1hdGgubWF4KE1hdGguYWJzKHN0YXJ0KSwgTWF0aC5hYnMoc3RvcCkpO1xuICAgICAgaWYgKHNwZWNpZmllci5wcmVjaXNpb24gPT0gbnVsbCAmJiAhaXNOYU4ocHJlY2lzaW9uID0gcHJlY2lzaW9uUHJlZml4KHN0ZXAsIHZhbHVlKSkpIHNwZWNpZmllci5wcmVjaXNpb24gPSBwcmVjaXNpb247XG4gICAgICByZXR1cm4gZm9ybWF0UHJlZml4KHNwZWNpZmllciwgdmFsdWUpO1xuICAgIH1cbiAgICBjYXNlIFwiXCI6XG4gICAgY2FzZSBcImVcIjpcbiAgICBjYXNlIFwiZ1wiOlxuICAgIGNhc2UgXCJwXCI6XG4gICAgY2FzZSBcInJcIjoge1xuICAgICAgaWYgKHNwZWNpZmllci5wcmVjaXNpb24gPT0gbnVsbCAmJiAhaXNOYU4ocHJlY2lzaW9uID0gcHJlY2lzaW9uUm91bmQoc3RlcCwgTWF0aC5tYXgoTWF0aC5hYnMoc3RhcnQpLCBNYXRoLmFicyhzdG9wKSkpKSkgc3BlY2lmaWVyLnByZWNpc2lvbiA9IHByZWNpc2lvbiAtIChzcGVjaWZpZXIudHlwZSA9PT0gXCJlXCIpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgXCJmXCI6XG4gICAgY2FzZSBcIiVcIjoge1xuICAgICAgaWYgKHNwZWNpZmllci5wcmVjaXNpb24gPT0gbnVsbCAmJiAhaXNOYU4ocHJlY2lzaW9uID0gcHJlY2lzaW9uRml4ZWQoc3RlcCkpKSBzcGVjaWZpZXIucHJlY2lzaW9uID0gcHJlY2lzaW9uIC0gKHNwZWNpZmllci50eXBlID09PSBcIiVcIikgKiAyO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBmb3JtYXQoc3BlY2lmaWVyKTtcbn1cbiIsImltcG9ydCB7dGlja3MsIHRpY2tJbmNyZW1lbnR9IGZyb20gXCJkMy1hcnJheVwiO1xuaW1wb3J0IGNvbnRpbnVvdXMsIHtjb3B5fSBmcm9tIFwiLi9jb250aW51b3VzLmpzXCI7XG5pbXBvcnQge2luaXRSYW5nZX0gZnJvbSBcIi4vaW5pdC5qc1wiO1xuaW1wb3J0IHRpY2tGb3JtYXQgZnJvbSBcIi4vdGlja0Zvcm1hdC5qc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gbGluZWFyaXNoKHNjYWxlKSB7XG4gIHZhciBkb21haW4gPSBzY2FsZS5kb21haW47XG5cbiAgc2NhbGUudGlja3MgPSBmdW5jdGlvbihjb3VudCkge1xuICAgIHZhciBkID0gZG9tYWluKCk7XG4gICAgcmV0dXJuIHRpY2tzKGRbMF0sIGRbZC5sZW5ndGggLSAxXSwgY291bnQgPT0gbnVsbCA/IDEwIDogY291bnQpO1xuICB9O1xuXG4gIHNjYWxlLnRpY2tGb3JtYXQgPSBmdW5jdGlvbihjb3VudCwgc3BlY2lmaWVyKSB7XG4gICAgdmFyIGQgPSBkb21haW4oKTtcbiAgICByZXR1cm4gdGlja0Zvcm1hdChkWzBdLCBkW2QubGVuZ3RoIC0gMV0sIGNvdW50ID09IG51bGwgPyAxMCA6IGNvdW50LCBzcGVjaWZpZXIpO1xuICB9O1xuXG4gIHNjYWxlLm5pY2UgPSBmdW5jdGlvbihjb3VudCkge1xuICAgIGlmIChjb3VudCA9PSBudWxsKSBjb3VudCA9IDEwO1xuXG4gICAgdmFyIGQgPSBkb21haW4oKTtcbiAgICB2YXIgaTAgPSAwO1xuICAgIHZhciBpMSA9IGQubGVuZ3RoIC0gMTtcbiAgICB2YXIgc3RhcnQgPSBkW2kwXTtcbiAgICB2YXIgc3RvcCA9IGRbaTFdO1xuICAgIHZhciBwcmVzdGVwO1xuICAgIHZhciBzdGVwO1xuICAgIHZhciBtYXhJdGVyID0gMTA7XG5cbiAgICBpZiAoc3RvcCA8IHN0YXJ0KSB7XG4gICAgICBzdGVwID0gc3RhcnQsIHN0YXJ0ID0gc3RvcCwgc3RvcCA9IHN0ZXA7XG4gICAgICBzdGVwID0gaTAsIGkwID0gaTEsIGkxID0gc3RlcDtcbiAgICB9XG4gICAgXG4gICAgd2hpbGUgKG1heEl0ZXItLSA+IDApIHtcbiAgICAgIHN0ZXAgPSB0aWNrSW5jcmVtZW50KHN0YXJ0LCBzdG9wLCBjb3VudCk7XG4gICAgICBpZiAoc3RlcCA9PT0gcHJlc3RlcCkge1xuICAgICAgICBkW2kwXSA9IHN0YXJ0XG4gICAgICAgIGRbaTFdID0gc3RvcFxuICAgICAgICByZXR1cm4gZG9tYWluKGQpO1xuICAgICAgfSBlbHNlIGlmIChzdGVwID4gMCkge1xuICAgICAgICBzdGFydCA9IE1hdGguZmxvb3Ioc3RhcnQgLyBzdGVwKSAqIHN0ZXA7XG4gICAgICAgIHN0b3AgPSBNYXRoLmNlaWwoc3RvcCAvIHN0ZXApICogc3RlcDtcbiAgICAgIH0gZWxzZSBpZiAoc3RlcCA8IDApIHtcbiAgICAgICAgc3RhcnQgPSBNYXRoLmNlaWwoc3RhcnQgKiBzdGVwKSAvIHN0ZXA7XG4gICAgICAgIHN0b3AgPSBNYXRoLmZsb29yKHN0b3AgKiBzdGVwKSAvIHN0ZXA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHByZXN0ZXAgPSBzdGVwO1xuICAgIH1cblxuICAgIHJldHVybiBzY2FsZTtcbiAgfTtcblxuICByZXR1cm4gc2NhbGU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxpbmVhcigpIHtcbiAgdmFyIHNjYWxlID0gY29udGludW91cygpO1xuXG4gIHNjYWxlLmNvcHkgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gY29weShzY2FsZSwgbGluZWFyKCkpO1xuICB9O1xuXG4gIGluaXRSYW5nZS5hcHBseShzY2FsZSwgYXJndW1lbnRzKTtcblxuICByZXR1cm4gbGluZWFyaXNoKHNjYWxlKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IHggPT4gKCkgPT4geDtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFpvb21FdmVudCh0eXBlLCB7XG4gIHNvdXJjZUV2ZW50LFxuICB0YXJnZXQsXG4gIHRyYW5zZm9ybSxcbiAgZGlzcGF0Y2hcbn0pIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcywge1xuICAgIHR5cGU6IHt2YWx1ZTogdHlwZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlfSxcbiAgICBzb3VyY2VFdmVudDoge3ZhbHVlOiBzb3VyY2VFdmVudCwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlfSxcbiAgICB0YXJnZXQ6IHt2YWx1ZTogdGFyZ2V0LCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWV9LFxuICAgIHRyYW5zZm9ybToge3ZhbHVlOiB0cmFuc2Zvcm0sIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZX0sXG4gICAgXzoge3ZhbHVlOiBkaXNwYXRjaH1cbiAgfSk7XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gVHJhbnNmb3JtKGssIHgsIHkpIHtcbiAgdGhpcy5rID0gaztcbiAgdGhpcy54ID0geDtcbiAgdGhpcy55ID0geTtcbn1cblxuVHJhbnNmb3JtLnByb3RvdHlwZSA9IHtcbiAgY29uc3RydWN0b3I6IFRyYW5zZm9ybSxcbiAgc2NhbGU6IGZ1bmN0aW9uKGspIHtcbiAgICByZXR1cm4gayA9PT0gMSA/IHRoaXMgOiBuZXcgVHJhbnNmb3JtKHRoaXMuayAqIGssIHRoaXMueCwgdGhpcy55KTtcbiAgfSxcbiAgdHJhbnNsYXRlOiBmdW5jdGlvbih4LCB5KSB7XG4gICAgcmV0dXJuIHggPT09IDAgJiB5ID09PSAwID8gdGhpcyA6IG5ldyBUcmFuc2Zvcm0odGhpcy5rLCB0aGlzLnggKyB0aGlzLmsgKiB4LCB0aGlzLnkgKyB0aGlzLmsgKiB5KTtcbiAgfSxcbiAgYXBwbHk6IGZ1bmN0aW9uKHBvaW50KSB7XG4gICAgcmV0dXJuIFtwb2ludFswXSAqIHRoaXMuayArIHRoaXMueCwgcG9pbnRbMV0gKiB0aGlzLmsgKyB0aGlzLnldO1xuICB9LFxuICBhcHBseVg6IGZ1bmN0aW9uKHgpIHtcbiAgICByZXR1cm4geCAqIHRoaXMuayArIHRoaXMueDtcbiAgfSxcbiAgYXBwbHlZOiBmdW5jdGlvbih5KSB7XG4gICAgcmV0dXJuIHkgKiB0aGlzLmsgKyB0aGlzLnk7XG4gIH0sXG4gIGludmVydDogZnVuY3Rpb24obG9jYXRpb24pIHtcbiAgICByZXR1cm4gWyhsb2NhdGlvblswXSAtIHRoaXMueCkgLyB0aGlzLmssIChsb2NhdGlvblsxXSAtIHRoaXMueSkgLyB0aGlzLmtdO1xuICB9LFxuICBpbnZlcnRYOiBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuICh4IC0gdGhpcy54KSAvIHRoaXMuaztcbiAgfSxcbiAgaW52ZXJ0WTogZnVuY3Rpb24oeSkge1xuICAgIHJldHVybiAoeSAtIHRoaXMueSkgLyB0aGlzLms7XG4gIH0sXG4gIHJlc2NhbGVYOiBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIHguY29weSgpLmRvbWFpbih4LnJhbmdlKCkubWFwKHRoaXMuaW52ZXJ0WCwgdGhpcykubWFwKHguaW52ZXJ0LCB4KSk7XG4gIH0sXG4gIHJlc2NhbGVZOiBmdW5jdGlvbih5KSB7XG4gICAgcmV0dXJuIHkuY29weSgpLmRvbWFpbih5LnJhbmdlKCkubWFwKHRoaXMuaW52ZXJ0WSwgdGhpcykubWFwKHkuaW52ZXJ0LCB5KSk7XG4gIH0sXG4gIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJ0cmFuc2xhdGUoXCIgKyB0aGlzLnggKyBcIixcIiArIHRoaXMueSArIFwiKSBzY2FsZShcIiArIHRoaXMuayArIFwiKVwiO1xuICB9XG59O1xuXG5leHBvcnQgdmFyIGlkZW50aXR5ID0gbmV3IFRyYW5zZm9ybSgxLCAwLCAwKTtcblxudHJhbnNmb3JtLnByb3RvdHlwZSA9IFRyYW5zZm9ybS5wcm90b3R5cGU7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRyYW5zZm9ybShub2RlKSB7XG4gIHdoaWxlICghbm9kZS5fX3pvb20pIGlmICghKG5vZGUgPSBub2RlLnBhcmVudE5vZGUpKSByZXR1cm4gaWRlbnRpdHk7XG4gIHJldHVybiBub2RlLl9fem9vbTtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBub3Byb3BhZ2F0aW9uKGV2ZW50KSB7XG4gIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihldmVudCkge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbn1cbiIsImltcG9ydCB7ZGlzcGF0Y2h9IGZyb20gXCJkMy1kaXNwYXRjaFwiO1xuaW1wb3J0IHtkcmFnRGlzYWJsZSwgZHJhZ0VuYWJsZX0gZnJvbSBcImQzLWRyYWdcIjtcbmltcG9ydCB7aW50ZXJwb2xhdGVab29tfSBmcm9tIFwiZDMtaW50ZXJwb2xhdGVcIjtcbmltcG9ydCB7c2VsZWN0LCBwb2ludGVyfSBmcm9tIFwiZDMtc2VsZWN0aW9uXCI7XG5pbXBvcnQge2ludGVycnVwdH0gZnJvbSBcImQzLXRyYW5zaXRpb25cIjtcbmltcG9ydCBjb25zdGFudCBmcm9tIFwiLi9jb25zdGFudC5qc1wiO1xuaW1wb3J0IFpvb21FdmVudCBmcm9tIFwiLi9ldmVudC5qc1wiO1xuaW1wb3J0IHtUcmFuc2Zvcm0sIGlkZW50aXR5fSBmcm9tIFwiLi90cmFuc2Zvcm0uanNcIjtcbmltcG9ydCBub2V2ZW50LCB7bm9wcm9wYWdhdGlvbn0gZnJvbSBcIi4vbm9ldmVudC5qc1wiO1xuXG4vLyBJZ25vcmUgcmlnaHQtY2xpY2ssIHNpbmNlIHRoYXQgc2hvdWxkIG9wZW4gdGhlIGNvbnRleHQgbWVudS5cbi8vIGV4Y2VwdCBmb3IgcGluY2gtdG8tem9vbSwgd2hpY2ggaXMgc2VudCBhcyBhIHdoZWVsK2N0cmxLZXkgZXZlbnRcbmZ1bmN0aW9uIGRlZmF1bHRGaWx0ZXIoZXZlbnQpIHtcbiAgcmV0dXJuICghZXZlbnQuY3RybEtleSB8fCBldmVudC50eXBlID09PSAnd2hlZWwnKSAmJiAhZXZlbnQuYnV0dG9uO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0RXh0ZW50KCkge1xuICB2YXIgZSA9IHRoaXM7XG4gIGlmIChlIGluc3RhbmNlb2YgU1ZHRWxlbWVudCkge1xuICAgIGUgPSBlLm93bmVyU1ZHRWxlbWVudCB8fCBlO1xuICAgIGlmIChlLmhhc0F0dHJpYnV0ZShcInZpZXdCb3hcIikpIHtcbiAgICAgIGUgPSBlLnZpZXdCb3guYmFzZVZhbDtcbiAgICAgIHJldHVybiBbW2UueCwgZS55XSwgW2UueCArIGUud2lkdGgsIGUueSArIGUuaGVpZ2h0XV07XG4gICAgfVxuICAgIHJldHVybiBbWzAsIDBdLCBbZS53aWR0aC5iYXNlVmFsLnZhbHVlLCBlLmhlaWdodC5iYXNlVmFsLnZhbHVlXV07XG4gIH1cbiAgcmV0dXJuIFtbMCwgMF0sIFtlLmNsaWVudFdpZHRoLCBlLmNsaWVudEhlaWdodF1dO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0VHJhbnNmb3JtKCkge1xuICByZXR1cm4gdGhpcy5fX3pvb20gfHwgaWRlbnRpdHk7XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRXaGVlbERlbHRhKGV2ZW50KSB7XG4gIHJldHVybiAtZXZlbnQuZGVsdGFZICogKGV2ZW50LmRlbHRhTW9kZSA9PT0gMSA/IDAuMDUgOiBldmVudC5kZWx0YU1vZGUgPyAxIDogMC4wMDIpICogKGV2ZW50LmN0cmxLZXkgPyAxMCA6IDEpO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0VG91Y2hhYmxlKCkge1xuICByZXR1cm4gbmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzIHx8IChcIm9udG91Y2hzdGFydFwiIGluIHRoaXMpO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0Q29uc3RyYWluKHRyYW5zZm9ybSwgZXh0ZW50LCB0cmFuc2xhdGVFeHRlbnQpIHtcbiAgdmFyIGR4MCA9IHRyYW5zZm9ybS5pbnZlcnRYKGV4dGVudFswXVswXSkgLSB0cmFuc2xhdGVFeHRlbnRbMF1bMF0sXG4gICAgICBkeDEgPSB0cmFuc2Zvcm0uaW52ZXJ0WChleHRlbnRbMV1bMF0pIC0gdHJhbnNsYXRlRXh0ZW50WzFdWzBdLFxuICAgICAgZHkwID0gdHJhbnNmb3JtLmludmVydFkoZXh0ZW50WzBdWzFdKSAtIHRyYW5zbGF0ZUV4dGVudFswXVsxXSxcbiAgICAgIGR5MSA9IHRyYW5zZm9ybS5pbnZlcnRZKGV4dGVudFsxXVsxXSkgLSB0cmFuc2xhdGVFeHRlbnRbMV1bMV07XG4gIHJldHVybiB0cmFuc2Zvcm0udHJhbnNsYXRlKFxuICAgIGR4MSA+IGR4MCA/IChkeDAgKyBkeDEpIC8gMiA6IE1hdGgubWluKDAsIGR4MCkgfHwgTWF0aC5tYXgoMCwgZHgxKSxcbiAgICBkeTEgPiBkeTAgPyAoZHkwICsgZHkxKSAvIDIgOiBNYXRoLm1pbigwLCBkeTApIHx8IE1hdGgubWF4KDAsIGR5MSlcbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHZhciBmaWx0ZXIgPSBkZWZhdWx0RmlsdGVyLFxuICAgICAgZXh0ZW50ID0gZGVmYXVsdEV4dGVudCxcbiAgICAgIGNvbnN0cmFpbiA9IGRlZmF1bHRDb25zdHJhaW4sXG4gICAgICB3aGVlbERlbHRhID0gZGVmYXVsdFdoZWVsRGVsdGEsXG4gICAgICB0b3VjaGFibGUgPSBkZWZhdWx0VG91Y2hhYmxlLFxuICAgICAgc2NhbGVFeHRlbnQgPSBbMCwgSW5maW5pdHldLFxuICAgICAgdHJhbnNsYXRlRXh0ZW50ID0gW1stSW5maW5pdHksIC1JbmZpbml0eV0sIFtJbmZpbml0eSwgSW5maW5pdHldXSxcbiAgICAgIGR1cmF0aW9uID0gMjUwLFxuICAgICAgaW50ZXJwb2xhdGUgPSBpbnRlcnBvbGF0ZVpvb20sXG4gICAgICBsaXN0ZW5lcnMgPSBkaXNwYXRjaChcInN0YXJ0XCIsIFwiem9vbVwiLCBcImVuZFwiKSxcbiAgICAgIHRvdWNoc3RhcnRpbmcsXG4gICAgICB0b3VjaGZpcnN0LFxuICAgICAgdG91Y2hlbmRpbmcsXG4gICAgICB0b3VjaERlbGF5ID0gNTAwLFxuICAgICAgd2hlZWxEZWxheSA9IDE1MCxcbiAgICAgIGNsaWNrRGlzdGFuY2UyID0gMCxcbiAgICAgIHRhcERpc3RhbmNlID0gMTA7XG5cbiAgZnVuY3Rpb24gem9vbShzZWxlY3Rpb24pIHtcbiAgICBzZWxlY3Rpb25cbiAgICAgICAgLnByb3BlcnR5KFwiX196b29tXCIsIGRlZmF1bHRUcmFuc2Zvcm0pXG4gICAgICAgIC5vbihcIndoZWVsLnpvb21cIiwgd2hlZWxlZCwge3Bhc3NpdmU6IGZhbHNlfSlcbiAgICAgICAgLm9uKFwibW91c2Vkb3duLnpvb21cIiwgbW91c2Vkb3duZWQpXG4gICAgICAgIC5vbihcImRibGNsaWNrLnpvb21cIiwgZGJsY2xpY2tlZClcbiAgICAgIC5maWx0ZXIodG91Y2hhYmxlKVxuICAgICAgICAub24oXCJ0b3VjaHN0YXJ0Lnpvb21cIiwgdG91Y2hzdGFydGVkKVxuICAgICAgICAub24oXCJ0b3VjaG1vdmUuem9vbVwiLCB0b3VjaG1vdmVkKVxuICAgICAgICAub24oXCJ0b3VjaGVuZC56b29tIHRvdWNoY2FuY2VsLnpvb21cIiwgdG91Y2hlbmRlZClcbiAgICAgICAgLnN0eWxlKFwiLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yXCIsIFwicmdiYSgwLDAsMCwwKVwiKTtcbiAgfVxuXG4gIHpvb20udHJhbnNmb3JtID0gZnVuY3Rpb24oY29sbGVjdGlvbiwgdHJhbnNmb3JtLCBwb2ludCwgZXZlbnQpIHtcbiAgICB2YXIgc2VsZWN0aW9uID0gY29sbGVjdGlvbi5zZWxlY3Rpb24gPyBjb2xsZWN0aW9uLnNlbGVjdGlvbigpIDogY29sbGVjdGlvbjtcbiAgICBzZWxlY3Rpb24ucHJvcGVydHkoXCJfX3pvb21cIiwgZGVmYXVsdFRyYW5zZm9ybSk7XG4gICAgaWYgKGNvbGxlY3Rpb24gIT09IHNlbGVjdGlvbikge1xuICAgICAgc2NoZWR1bGUoY29sbGVjdGlvbiwgdHJhbnNmb3JtLCBwb2ludCwgZXZlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZWxlY3Rpb24uaW50ZXJydXB0KCkuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgZ2VzdHVyZSh0aGlzLCBhcmd1bWVudHMpXG4gICAgICAgICAgLmV2ZW50KGV2ZW50KVxuICAgICAgICAgIC5zdGFydCgpXG4gICAgICAgICAgLnpvb20obnVsbCwgdHlwZW9mIHRyYW5zZm9ybSA9PT0gXCJmdW5jdGlvblwiID8gdHJhbnNmb3JtLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgOiB0cmFuc2Zvcm0pXG4gICAgICAgICAgLmVuZCgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIHpvb20uc2NhbGVCeSA9IGZ1bmN0aW9uKHNlbGVjdGlvbiwgaywgcCwgZXZlbnQpIHtcbiAgICB6b29tLnNjYWxlVG8oc2VsZWN0aW9uLCBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBrMCA9IHRoaXMuX196b29tLmssXG4gICAgICAgICAgazEgPSB0eXBlb2YgayA9PT0gXCJmdW5jdGlvblwiID8gay5hcHBseSh0aGlzLCBhcmd1bWVudHMpIDogaztcbiAgICAgIHJldHVybiBrMCAqIGsxO1xuICAgIH0sIHAsIGV2ZW50KTtcbiAgfTtcblxuICB6b29tLnNjYWxlVG8gPSBmdW5jdGlvbihzZWxlY3Rpb24sIGssIHAsIGV2ZW50KSB7XG4gICAgem9vbS50cmFuc2Zvcm0oc2VsZWN0aW9uLCBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBlID0gZXh0ZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyksXG4gICAgICAgICAgdDAgPSB0aGlzLl9fem9vbSxcbiAgICAgICAgICBwMCA9IHAgPT0gbnVsbCA/IGNlbnRyb2lkKGUpIDogdHlwZW9mIHAgPT09IFwiZnVuY3Rpb25cIiA/IHAuYXBwbHkodGhpcywgYXJndW1lbnRzKSA6IHAsXG4gICAgICAgICAgcDEgPSB0MC5pbnZlcnQocDApLFxuICAgICAgICAgIGsxID0gdHlwZW9mIGsgPT09IFwiZnVuY3Rpb25cIiA/IGsuYXBwbHkodGhpcywgYXJndW1lbnRzKSA6IGs7XG4gICAgICByZXR1cm4gY29uc3RyYWluKHRyYW5zbGF0ZShzY2FsZSh0MCwgazEpLCBwMCwgcDEpLCBlLCB0cmFuc2xhdGVFeHRlbnQpO1xuICAgIH0sIHAsIGV2ZW50KTtcbiAgfTtcblxuICB6b29tLnRyYW5zbGF0ZUJ5ID0gZnVuY3Rpb24oc2VsZWN0aW9uLCB4LCB5LCBldmVudCkge1xuICAgIHpvb20udHJhbnNmb3JtKHNlbGVjdGlvbiwgZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gY29uc3RyYWluKHRoaXMuX196b29tLnRyYW5zbGF0ZShcbiAgICAgICAgdHlwZW9mIHggPT09IFwiZnVuY3Rpb25cIiA/IHguYXBwbHkodGhpcywgYXJndW1lbnRzKSA6IHgsXG4gICAgICAgIHR5cGVvZiB5ID09PSBcImZ1bmN0aW9uXCIgPyB5LmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgOiB5XG4gICAgICApLCBleHRlbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKSwgdHJhbnNsYXRlRXh0ZW50KTtcbiAgICB9LCBudWxsLCBldmVudCk7XG4gIH07XG5cbiAgem9vbS50cmFuc2xhdGVUbyA9IGZ1bmN0aW9uKHNlbGVjdGlvbiwgeCwgeSwgcCwgZXZlbnQpIHtcbiAgICB6b29tLnRyYW5zZm9ybShzZWxlY3Rpb24sIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGUgPSBleHRlbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKSxcbiAgICAgICAgICB0ID0gdGhpcy5fX3pvb20sXG4gICAgICAgICAgcDAgPSBwID09IG51bGwgPyBjZW50cm9pZChlKSA6IHR5cGVvZiBwID09PSBcImZ1bmN0aW9uXCIgPyBwLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgOiBwO1xuICAgICAgcmV0dXJuIGNvbnN0cmFpbihpZGVudGl0eS50cmFuc2xhdGUocDBbMF0sIHAwWzFdKS5zY2FsZSh0LmspLnRyYW5zbGF0ZShcbiAgICAgICAgdHlwZW9mIHggPT09IFwiZnVuY3Rpb25cIiA/IC14LmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgOiAteCxcbiAgICAgICAgdHlwZW9mIHkgPT09IFwiZnVuY3Rpb25cIiA/IC15LmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgOiAteVxuICAgICAgKSwgZSwgdHJhbnNsYXRlRXh0ZW50KTtcbiAgICB9LCBwLCBldmVudCk7XG4gIH07XG5cbiAgZnVuY3Rpb24gc2NhbGUodHJhbnNmb3JtLCBrKSB7XG4gICAgayA9IE1hdGgubWF4KHNjYWxlRXh0ZW50WzBdLCBNYXRoLm1pbihzY2FsZUV4dGVudFsxXSwgaykpO1xuICAgIHJldHVybiBrID09PSB0cmFuc2Zvcm0uayA/IHRyYW5zZm9ybSA6IG5ldyBUcmFuc2Zvcm0oaywgdHJhbnNmb3JtLngsIHRyYW5zZm9ybS55KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyYW5zbGF0ZSh0cmFuc2Zvcm0sIHAwLCBwMSkge1xuICAgIHZhciB4ID0gcDBbMF0gLSBwMVswXSAqIHRyYW5zZm9ybS5rLCB5ID0gcDBbMV0gLSBwMVsxXSAqIHRyYW5zZm9ybS5rO1xuICAgIHJldHVybiB4ID09PSB0cmFuc2Zvcm0ueCAmJiB5ID09PSB0cmFuc2Zvcm0ueSA/IHRyYW5zZm9ybSA6IG5ldyBUcmFuc2Zvcm0odHJhbnNmb3JtLmssIHgsIHkpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2VudHJvaWQoZXh0ZW50KSB7XG4gICAgcmV0dXJuIFsoK2V4dGVudFswXVswXSArICtleHRlbnRbMV1bMF0pIC8gMiwgKCtleHRlbnRbMF1bMV0gKyArZXh0ZW50WzFdWzFdKSAvIDJdO1xuICB9XG5cbiAgZnVuY3Rpb24gc2NoZWR1bGUodHJhbnNpdGlvbiwgdHJhbnNmb3JtLCBwb2ludCwgZXZlbnQpIHtcbiAgICB0cmFuc2l0aW9uXG4gICAgICAgIC5vbihcInN0YXJ0Lnpvb21cIiwgZnVuY3Rpb24oKSB7IGdlc3R1cmUodGhpcywgYXJndW1lbnRzKS5ldmVudChldmVudCkuc3RhcnQoKTsgfSlcbiAgICAgICAgLm9uKFwiaW50ZXJydXB0Lnpvb20gZW5kLnpvb21cIiwgZnVuY3Rpb24oKSB7IGdlc3R1cmUodGhpcywgYXJndW1lbnRzKS5ldmVudChldmVudCkuZW5kKCk7IH0pXG4gICAgICAgIC50d2VlbihcInpvb21cIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLFxuICAgICAgICAgICAgICBhcmdzID0gYXJndW1lbnRzLFxuICAgICAgICAgICAgICBnID0gZ2VzdHVyZSh0aGF0LCBhcmdzKS5ldmVudChldmVudCksXG4gICAgICAgICAgICAgIGUgPSBleHRlbnQuYXBwbHkodGhhdCwgYXJncyksXG4gICAgICAgICAgICAgIHAgPSBwb2ludCA9PSBudWxsID8gY2VudHJvaWQoZSkgOiB0eXBlb2YgcG9pbnQgPT09IFwiZnVuY3Rpb25cIiA/IHBvaW50LmFwcGx5KHRoYXQsIGFyZ3MpIDogcG9pbnQsXG4gICAgICAgICAgICAgIHcgPSBNYXRoLm1heChlWzFdWzBdIC0gZVswXVswXSwgZVsxXVsxXSAtIGVbMF1bMV0pLFxuICAgICAgICAgICAgICBhID0gdGhhdC5fX3pvb20sXG4gICAgICAgICAgICAgIGIgPSB0eXBlb2YgdHJhbnNmb3JtID09PSBcImZ1bmN0aW9uXCIgPyB0cmFuc2Zvcm0uYXBwbHkodGhhdCwgYXJncykgOiB0cmFuc2Zvcm0sXG4gICAgICAgICAgICAgIGkgPSBpbnRlcnBvbGF0ZShhLmludmVydChwKS5jb25jYXQodyAvIGEuayksIGIuaW52ZXJ0KHApLmNvbmNhdCh3IC8gYi5rKSk7XG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgIGlmICh0ID09PSAxKSB0ID0gYjsgLy8gQXZvaWQgcm91bmRpbmcgZXJyb3Igb24gZW5kLlxuICAgICAgICAgICAgZWxzZSB7IHZhciBsID0gaSh0KSwgayA9IHcgLyBsWzJdOyB0ID0gbmV3IFRyYW5zZm9ybShrLCBwWzBdIC0gbFswXSAqIGssIHBbMV0gLSBsWzFdICogayk7IH1cbiAgICAgICAgICAgIGcuem9vbShudWxsLCB0KTtcbiAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdlc3R1cmUodGhhdCwgYXJncywgY2xlYW4pIHtcbiAgICByZXR1cm4gKCFjbGVhbiAmJiB0aGF0Ll9fem9vbWluZykgfHwgbmV3IEdlc3R1cmUodGhhdCwgYXJncyk7XG4gIH1cblxuICBmdW5jdGlvbiBHZXN0dXJlKHRoYXQsIGFyZ3MpIHtcbiAgICB0aGlzLnRoYXQgPSB0aGF0O1xuICAgIHRoaXMuYXJncyA9IGFyZ3M7XG4gICAgdGhpcy5hY3RpdmUgPSAwO1xuICAgIHRoaXMuc291cmNlRXZlbnQgPSBudWxsO1xuICAgIHRoaXMuZXh0ZW50ID0gZXh0ZW50LmFwcGx5KHRoYXQsIGFyZ3MpO1xuICAgIHRoaXMudGFwcyA9IDA7XG4gIH1cblxuICBHZXN0dXJlLnByb3RvdHlwZSA9IHtcbiAgICBldmVudDogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIGlmIChldmVudCkgdGhpcy5zb3VyY2VFdmVudCA9IGV2ZW50O1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICBzdGFydDogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoKyt0aGlzLmFjdGl2ZSA9PT0gMSkge1xuICAgICAgICB0aGlzLnRoYXQuX196b29taW5nID0gdGhpcztcbiAgICAgICAgdGhpcy5lbWl0KFwic3RhcnRcIik7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuICAgIHpvb206IGZ1bmN0aW9uKGtleSwgdHJhbnNmb3JtKSB7XG4gICAgICBpZiAodGhpcy5tb3VzZSAmJiBrZXkgIT09IFwibW91c2VcIikgdGhpcy5tb3VzZVsxXSA9IHRyYW5zZm9ybS5pbnZlcnQodGhpcy5tb3VzZVswXSk7XG4gICAgICBpZiAodGhpcy50b3VjaDAgJiYga2V5ICE9PSBcInRvdWNoXCIpIHRoaXMudG91Y2gwWzFdID0gdHJhbnNmb3JtLmludmVydCh0aGlzLnRvdWNoMFswXSk7XG4gICAgICBpZiAodGhpcy50b3VjaDEgJiYga2V5ICE9PSBcInRvdWNoXCIpIHRoaXMudG91Y2gxWzFdID0gdHJhbnNmb3JtLmludmVydCh0aGlzLnRvdWNoMVswXSk7XG4gICAgICB0aGlzLnRoYXQuX196b29tID0gdHJhbnNmb3JtO1xuICAgICAgdGhpcy5lbWl0KFwiem9vbVwiKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgZW5kOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICgtLXRoaXMuYWN0aXZlID09PSAwKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLnRoYXQuX196b29taW5nO1xuICAgICAgICB0aGlzLmVtaXQoXCJlbmRcIik7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuICAgIGVtaXQ6IGZ1bmN0aW9uKHR5cGUpIHtcbiAgICAgIHZhciBkID0gc2VsZWN0KHRoaXMudGhhdCkuZGF0dW0oKTtcbiAgICAgIGxpc3RlbmVycy5jYWxsKFxuICAgICAgICB0eXBlLFxuICAgICAgICB0aGlzLnRoYXQsXG4gICAgICAgIG5ldyBab29tRXZlbnQodHlwZSwge1xuICAgICAgICAgIHNvdXJjZUV2ZW50OiB0aGlzLnNvdXJjZUV2ZW50LFxuICAgICAgICAgIHRhcmdldDogem9vbSxcbiAgICAgICAgICB0eXBlLFxuICAgICAgICAgIHRyYW5zZm9ybTogdGhpcy50aGF0Ll9fem9vbSxcbiAgICAgICAgICBkaXNwYXRjaDogbGlzdGVuZXJzXG4gICAgICAgIH0pLFxuICAgICAgICBkXG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICBmdW5jdGlvbiB3aGVlbGVkKGV2ZW50LCAuLi5hcmdzKSB7XG4gICAgaWYgKCFmaWx0ZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSkgcmV0dXJuO1xuICAgIHZhciBnID0gZ2VzdHVyZSh0aGlzLCBhcmdzKS5ldmVudChldmVudCksXG4gICAgICAgIHQgPSB0aGlzLl9fem9vbSxcbiAgICAgICAgayA9IE1hdGgubWF4KHNjYWxlRXh0ZW50WzBdLCBNYXRoLm1pbihzY2FsZUV4dGVudFsxXSwgdC5rICogTWF0aC5wb3coMiwgd2hlZWxEZWx0YS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKSkpLFxuICAgICAgICBwID0gcG9pbnRlcihldmVudCk7XG5cbiAgICAvLyBJZiB0aGUgbW91c2UgaXMgaW4gdGhlIHNhbWUgbG9jYXRpb24gYXMgYmVmb3JlLCByZXVzZSBpdC5cbiAgICAvLyBJZiB0aGVyZSB3ZXJlIHJlY2VudCB3aGVlbCBldmVudHMsIHJlc2V0IHRoZSB3aGVlbCBpZGxlIHRpbWVvdXQuXG4gICAgaWYgKGcud2hlZWwpIHtcbiAgICAgIGlmIChnLm1vdXNlWzBdWzBdICE9PSBwWzBdIHx8IGcubW91c2VbMF1bMV0gIT09IHBbMV0pIHtcbiAgICAgICAgZy5tb3VzZVsxXSA9IHQuaW52ZXJ0KGcubW91c2VbMF0gPSBwKTtcbiAgICAgIH1cbiAgICAgIGNsZWFyVGltZW91dChnLndoZWVsKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGlzIHdoZWVsIGV2ZW50IHdvbuKAmXQgdHJpZ2dlciBhIHRyYW5zZm9ybSBjaGFuZ2UsIGlnbm9yZSBpdC5cbiAgICBlbHNlIGlmICh0LmsgPT09IGspIHJldHVybjtcblxuICAgIC8vIE90aGVyd2lzZSwgY2FwdHVyZSB0aGUgbW91c2UgcG9pbnQgYW5kIGxvY2F0aW9uIGF0IHRoZSBzdGFydC5cbiAgICBlbHNlIHtcbiAgICAgIGcubW91c2UgPSBbcCwgdC5pbnZlcnQocCldO1xuICAgICAgaW50ZXJydXB0KHRoaXMpO1xuICAgICAgZy5zdGFydCgpO1xuICAgIH1cblxuICAgIG5vZXZlbnQoZXZlbnQpO1xuICAgIGcud2hlZWwgPSBzZXRUaW1lb3V0KHdoZWVsaWRsZWQsIHdoZWVsRGVsYXkpO1xuICAgIGcuem9vbShcIm1vdXNlXCIsIGNvbnN0cmFpbih0cmFuc2xhdGUoc2NhbGUodCwgayksIGcubW91c2VbMF0sIGcubW91c2VbMV0pLCBnLmV4dGVudCwgdHJhbnNsYXRlRXh0ZW50KSk7XG5cbiAgICBmdW5jdGlvbiB3aGVlbGlkbGVkKCkge1xuICAgICAgZy53aGVlbCA9IG51bGw7XG4gICAgICBnLmVuZCgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG1vdXNlZG93bmVkKGV2ZW50LCAuLi5hcmdzKSB7XG4gICAgaWYgKHRvdWNoZW5kaW5nIHx8ICFmaWx0ZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSkgcmV0dXJuO1xuICAgIHZhciBjdXJyZW50VGFyZ2V0ID0gZXZlbnQuY3VycmVudFRhcmdldCxcbiAgICAgICAgZyA9IGdlc3R1cmUodGhpcywgYXJncywgdHJ1ZSkuZXZlbnQoZXZlbnQpLFxuICAgICAgICB2ID0gc2VsZWN0KGV2ZW50LnZpZXcpLm9uKFwibW91c2Vtb3ZlLnpvb21cIiwgbW91c2Vtb3ZlZCwgdHJ1ZSkub24oXCJtb3VzZXVwLnpvb21cIiwgbW91c2V1cHBlZCwgdHJ1ZSksXG4gICAgICAgIHAgPSBwb2ludGVyKGV2ZW50LCBjdXJyZW50VGFyZ2V0KSxcbiAgICAgICAgeDAgPSBldmVudC5jbGllbnRYLFxuICAgICAgICB5MCA9IGV2ZW50LmNsaWVudFk7XG5cbiAgICBkcmFnRGlzYWJsZShldmVudC52aWV3KTtcbiAgICBub3Byb3BhZ2F0aW9uKGV2ZW50KTtcbiAgICBnLm1vdXNlID0gW3AsIHRoaXMuX196b29tLmludmVydChwKV07XG4gICAgaW50ZXJydXB0KHRoaXMpO1xuICAgIGcuc3RhcnQoKTtcblxuICAgIGZ1bmN0aW9uIG1vdXNlbW92ZWQoZXZlbnQpIHtcbiAgICAgIG5vZXZlbnQoZXZlbnQpO1xuICAgICAgaWYgKCFnLm1vdmVkKSB7XG4gICAgICAgIHZhciBkeCA9IGV2ZW50LmNsaWVudFggLSB4MCwgZHkgPSBldmVudC5jbGllbnRZIC0geTA7XG4gICAgICAgIGcubW92ZWQgPSBkeCAqIGR4ICsgZHkgKiBkeSA+IGNsaWNrRGlzdGFuY2UyO1xuICAgICAgfVxuICAgICAgZy5ldmVudChldmVudClcbiAgICAgICAuem9vbShcIm1vdXNlXCIsIGNvbnN0cmFpbih0cmFuc2xhdGUoZy50aGF0Ll9fem9vbSwgZy5tb3VzZVswXSA9IHBvaW50ZXIoZXZlbnQsIGN1cnJlbnRUYXJnZXQpLCBnLm1vdXNlWzFdKSwgZy5leHRlbnQsIHRyYW5zbGF0ZUV4dGVudCkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vdXNldXBwZWQoZXZlbnQpIHtcbiAgICAgIHYub24oXCJtb3VzZW1vdmUuem9vbSBtb3VzZXVwLnpvb21cIiwgbnVsbCk7XG4gICAgICBkcmFnRW5hYmxlKGV2ZW50LnZpZXcsIGcubW92ZWQpO1xuICAgICAgbm9ldmVudChldmVudCk7XG4gICAgICBnLmV2ZW50KGV2ZW50KS5lbmQoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBkYmxjbGlja2VkKGV2ZW50LCAuLi5hcmdzKSB7XG4gICAgaWYgKCFmaWx0ZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSkgcmV0dXJuO1xuICAgIHZhciB0MCA9IHRoaXMuX196b29tLFxuICAgICAgICBwMCA9IHBvaW50ZXIoZXZlbnQuY2hhbmdlZFRvdWNoZXMgPyBldmVudC5jaGFuZ2VkVG91Y2hlc1swXSA6IGV2ZW50LCB0aGlzKSxcbiAgICAgICAgcDEgPSB0MC5pbnZlcnQocDApLFxuICAgICAgICBrMSA9IHQwLmsgKiAoZXZlbnQuc2hpZnRLZXkgPyAwLjUgOiAyKSxcbiAgICAgICAgdDEgPSBjb25zdHJhaW4odHJhbnNsYXRlKHNjYWxlKHQwLCBrMSksIHAwLCBwMSksIGV4dGVudC5hcHBseSh0aGlzLCBhcmdzKSwgdHJhbnNsYXRlRXh0ZW50KTtcblxuICAgIG5vZXZlbnQoZXZlbnQpO1xuICAgIGlmIChkdXJhdGlvbiA+IDApIHNlbGVjdCh0aGlzKS50cmFuc2l0aW9uKCkuZHVyYXRpb24oZHVyYXRpb24pLmNhbGwoc2NoZWR1bGUsIHQxLCBwMCwgZXZlbnQpO1xuICAgIGVsc2Ugc2VsZWN0KHRoaXMpLmNhbGwoem9vbS50cmFuc2Zvcm0sIHQxLCBwMCwgZXZlbnQpO1xuICB9XG5cbiAgZnVuY3Rpb24gdG91Y2hzdGFydGVkKGV2ZW50LCAuLi5hcmdzKSB7XG4gICAgaWYgKCFmaWx0ZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSkgcmV0dXJuO1xuICAgIHZhciB0b3VjaGVzID0gZXZlbnQudG91Y2hlcyxcbiAgICAgICAgbiA9IHRvdWNoZXMubGVuZ3RoLFxuICAgICAgICBnID0gZ2VzdHVyZSh0aGlzLCBhcmdzLCBldmVudC5jaGFuZ2VkVG91Y2hlcy5sZW5ndGggPT09IG4pLmV2ZW50KGV2ZW50KSxcbiAgICAgICAgc3RhcnRlZCwgaSwgdCwgcDtcblxuICAgIG5vcHJvcGFnYXRpb24oZXZlbnQpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIHQgPSB0b3VjaGVzW2ldLCBwID0gcG9pbnRlcih0LCB0aGlzKTtcbiAgICAgIHAgPSBbcCwgdGhpcy5fX3pvb20uaW52ZXJ0KHApLCB0LmlkZW50aWZpZXJdO1xuICAgICAgaWYgKCFnLnRvdWNoMCkgZy50b3VjaDAgPSBwLCBzdGFydGVkID0gdHJ1ZSwgZy50YXBzID0gMSArICEhdG91Y2hzdGFydGluZztcbiAgICAgIGVsc2UgaWYgKCFnLnRvdWNoMSAmJiBnLnRvdWNoMFsyXSAhPT0gcFsyXSkgZy50b3VjaDEgPSBwLCBnLnRhcHMgPSAwO1xuICAgIH1cblxuICAgIGlmICh0b3VjaHN0YXJ0aW5nKSB0b3VjaHN0YXJ0aW5nID0gY2xlYXJUaW1lb3V0KHRvdWNoc3RhcnRpbmcpO1xuXG4gICAgaWYgKHN0YXJ0ZWQpIHtcbiAgICAgIGlmIChnLnRhcHMgPCAyKSB0b3VjaGZpcnN0ID0gcFswXSwgdG91Y2hzdGFydGluZyA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IHRvdWNoc3RhcnRpbmcgPSBudWxsOyB9LCB0b3VjaERlbGF5KTtcbiAgICAgIGludGVycnVwdCh0aGlzKTtcbiAgICAgIGcuc3RhcnQoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB0b3VjaG1vdmVkKGV2ZW50LCAuLi5hcmdzKSB7XG4gICAgaWYgKCF0aGlzLl9fem9vbWluZykgcmV0dXJuO1xuICAgIHZhciBnID0gZ2VzdHVyZSh0aGlzLCBhcmdzKS5ldmVudChldmVudCksXG4gICAgICAgIHRvdWNoZXMgPSBldmVudC5jaGFuZ2VkVG91Y2hlcyxcbiAgICAgICAgbiA9IHRvdWNoZXMubGVuZ3RoLCBpLCB0LCBwLCBsO1xuXG4gICAgbm9ldmVudChldmVudCk7XG4gICAgZm9yIChpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgdCA9IHRvdWNoZXNbaV0sIHAgPSBwb2ludGVyKHQsIHRoaXMpO1xuICAgICAgaWYgKGcudG91Y2gwICYmIGcudG91Y2gwWzJdID09PSB0LmlkZW50aWZpZXIpIGcudG91Y2gwWzBdID0gcDtcbiAgICAgIGVsc2UgaWYgKGcudG91Y2gxICYmIGcudG91Y2gxWzJdID09PSB0LmlkZW50aWZpZXIpIGcudG91Y2gxWzBdID0gcDtcbiAgICB9XG4gICAgdCA9IGcudGhhdC5fX3pvb207XG4gICAgaWYgKGcudG91Y2gxKSB7XG4gICAgICB2YXIgcDAgPSBnLnRvdWNoMFswXSwgbDAgPSBnLnRvdWNoMFsxXSxcbiAgICAgICAgICBwMSA9IGcudG91Y2gxWzBdLCBsMSA9IGcudG91Y2gxWzFdLFxuICAgICAgICAgIGRwID0gKGRwID0gcDFbMF0gLSBwMFswXSkgKiBkcCArIChkcCA9IHAxWzFdIC0gcDBbMV0pICogZHAsXG4gICAgICAgICAgZGwgPSAoZGwgPSBsMVswXSAtIGwwWzBdKSAqIGRsICsgKGRsID0gbDFbMV0gLSBsMFsxXSkgKiBkbDtcbiAgICAgIHQgPSBzY2FsZSh0LCBNYXRoLnNxcnQoZHAgLyBkbCkpO1xuICAgICAgcCA9IFsocDBbMF0gKyBwMVswXSkgLyAyLCAocDBbMV0gKyBwMVsxXSkgLyAyXTtcbiAgICAgIGwgPSBbKGwwWzBdICsgbDFbMF0pIC8gMiwgKGwwWzFdICsgbDFbMV0pIC8gMl07XG4gICAgfVxuICAgIGVsc2UgaWYgKGcudG91Y2gwKSBwID0gZy50b3VjaDBbMF0sIGwgPSBnLnRvdWNoMFsxXTtcbiAgICBlbHNlIHJldHVybjtcblxuICAgIGcuem9vbShcInRvdWNoXCIsIGNvbnN0cmFpbih0cmFuc2xhdGUodCwgcCwgbCksIGcuZXh0ZW50LCB0cmFuc2xhdGVFeHRlbnQpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvdWNoZW5kZWQoZXZlbnQsIC4uLmFyZ3MpIHtcbiAgICBpZiAoIXRoaXMuX196b29taW5nKSByZXR1cm47XG4gICAgdmFyIGcgPSBnZXN0dXJlKHRoaXMsIGFyZ3MpLmV2ZW50KGV2ZW50KSxcbiAgICAgICAgdG91Y2hlcyA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzLFxuICAgICAgICBuID0gdG91Y2hlcy5sZW5ndGgsIGksIHQ7XG5cbiAgICBub3Byb3BhZ2F0aW9uKGV2ZW50KTtcbiAgICBpZiAodG91Y2hlbmRpbmcpIGNsZWFyVGltZW91dCh0b3VjaGVuZGluZyk7XG4gICAgdG91Y2hlbmRpbmcgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyB0b3VjaGVuZGluZyA9IG51bGw7IH0sIHRvdWNoRGVsYXkpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIHQgPSB0b3VjaGVzW2ldO1xuICAgICAgaWYgKGcudG91Y2gwICYmIGcudG91Y2gwWzJdID09PSB0LmlkZW50aWZpZXIpIGRlbGV0ZSBnLnRvdWNoMDtcbiAgICAgIGVsc2UgaWYgKGcudG91Y2gxICYmIGcudG91Y2gxWzJdID09PSB0LmlkZW50aWZpZXIpIGRlbGV0ZSBnLnRvdWNoMTtcbiAgICB9XG4gICAgaWYgKGcudG91Y2gxICYmICFnLnRvdWNoMCkgZy50b3VjaDAgPSBnLnRvdWNoMSwgZGVsZXRlIGcudG91Y2gxO1xuICAgIGlmIChnLnRvdWNoMCkgZy50b3VjaDBbMV0gPSB0aGlzLl9fem9vbS5pbnZlcnQoZy50b3VjaDBbMF0pO1xuICAgIGVsc2Uge1xuICAgICAgZy5lbmQoKTtcbiAgICAgIC8vIElmIHRoaXMgd2FzIGEgZGJsdGFwLCByZXJvdXRlIHRvIHRoZSAob3B0aW9uYWwpIGRibGNsaWNrLnpvb20gaGFuZGxlci5cbiAgICAgIGlmIChnLnRhcHMgPT09IDIpIHtcbiAgICAgICAgdCA9IHBvaW50ZXIodCwgdGhpcyk7XG4gICAgICAgIGlmIChNYXRoLmh5cG90KHRvdWNoZmlyc3RbMF0gLSB0WzBdLCB0b3VjaGZpcnN0WzFdIC0gdFsxXSkgPCB0YXBEaXN0YW5jZSkge1xuICAgICAgICAgIHZhciBwID0gc2VsZWN0KHRoaXMpLm9uKFwiZGJsY2xpY2suem9vbVwiKTtcbiAgICAgICAgICBpZiAocCkgcC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgem9vbS53aGVlbERlbHRhID0gZnVuY3Rpb24oXykge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKHdoZWVsRGVsdGEgPSB0eXBlb2YgXyA9PT0gXCJmdW5jdGlvblwiID8gXyA6IGNvbnN0YW50KCtfKSwgem9vbSkgOiB3aGVlbERlbHRhO1xuICB9O1xuXG4gIHpvb20uZmlsdGVyID0gZnVuY3Rpb24oXykge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKGZpbHRlciA9IHR5cGVvZiBfID09PSBcImZ1bmN0aW9uXCIgPyBfIDogY29uc3RhbnQoISFfKSwgem9vbSkgOiBmaWx0ZXI7XG4gIH07XG5cbiAgem9vbS50b3VjaGFibGUgPSBmdW5jdGlvbihfKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAodG91Y2hhYmxlID0gdHlwZW9mIF8gPT09IFwiZnVuY3Rpb25cIiA/IF8gOiBjb25zdGFudCghIV8pLCB6b29tKSA6IHRvdWNoYWJsZTtcbiAgfTtcblxuICB6b29tLmV4dGVudCA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChleHRlbnQgPSB0eXBlb2YgXyA9PT0gXCJmdW5jdGlvblwiID8gXyA6IGNvbnN0YW50KFtbK19bMF1bMF0sICtfWzBdWzFdXSwgWytfWzFdWzBdLCArX1sxXVsxXV1dKSwgem9vbSkgOiBleHRlbnQ7XG4gIH07XG5cbiAgem9vbS5zY2FsZUV4dGVudCA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChzY2FsZUV4dGVudFswXSA9ICtfWzBdLCBzY2FsZUV4dGVudFsxXSA9ICtfWzFdLCB6b29tKSA6IFtzY2FsZUV4dGVudFswXSwgc2NhbGVFeHRlbnRbMV1dO1xuICB9O1xuXG4gIHpvb20udHJhbnNsYXRlRXh0ZW50ID0gZnVuY3Rpb24oXykge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKHRyYW5zbGF0ZUV4dGVudFswXVswXSA9ICtfWzBdWzBdLCB0cmFuc2xhdGVFeHRlbnRbMV1bMF0gPSArX1sxXVswXSwgdHJhbnNsYXRlRXh0ZW50WzBdWzFdID0gK19bMF1bMV0sIHRyYW5zbGF0ZUV4dGVudFsxXVsxXSA9ICtfWzFdWzFdLCB6b29tKSA6IFtbdHJhbnNsYXRlRXh0ZW50WzBdWzBdLCB0cmFuc2xhdGVFeHRlbnRbMF1bMV1dLCBbdHJhbnNsYXRlRXh0ZW50WzFdWzBdLCB0cmFuc2xhdGVFeHRlbnRbMV1bMV1dXTtcbiAgfTtcblxuICB6b29tLmNvbnN0cmFpbiA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChjb25zdHJhaW4gPSBfLCB6b29tKSA6IGNvbnN0cmFpbjtcbiAgfTtcblxuICB6b29tLmR1cmF0aW9uID0gZnVuY3Rpb24oXykge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKGR1cmF0aW9uID0gK18sIHpvb20pIDogZHVyYXRpb247XG4gIH07XG5cbiAgem9vbS5pbnRlcnBvbGF0ZSA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChpbnRlcnBvbGF0ZSA9IF8sIHpvb20pIDogaW50ZXJwb2xhdGU7XG4gIH07XG5cbiAgem9vbS5vbiA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciB2YWx1ZSA9IGxpc3RlbmVycy5vbi5hcHBseShsaXN0ZW5lcnMsIGFyZ3VtZW50cyk7XG4gICAgcmV0dXJuIHZhbHVlID09PSBsaXN0ZW5lcnMgPyB6b29tIDogdmFsdWU7XG4gIH07XG5cbiAgem9vbS5jbGlja0Rpc3RhbmNlID0gZnVuY3Rpb24oXykge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKGNsaWNrRGlzdGFuY2UyID0gKF8gPSArXykgKiBfLCB6b29tKSA6IE1hdGguc3FydChjbGlja0Rpc3RhbmNlMik7XG4gIH07XG5cbiAgem9vbS50YXBEaXN0YW5jZSA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/ICh0YXBEaXN0YW5jZSA9ICtfLCB6b29tKSA6IHRhcERpc3RhbmNlO1xuICB9O1xuXG4gIHJldHVybiB6b29tO1xufVxuIiwiaW1wb3J0IHsgYXV0b3JhbmdlLCBhdXRvcmFuZ2VfdGltZSB9IGZyb20gJy4vYXV0b3JhbmdlLmpzJ1xuaW1wb3J0IHsgc2xpY2VHdWVzcyB9IGZyb20gJy4vc2xpY2VyLmpzJ1xuaW1wb3J0IHtcbiAgc2VsZWN0b3IsXG4gIGdldEJvdW5kYXJpZXMsXG4gIGNvbWJpbmluZ1B1bHNlcyxcbiAgZmlsdGVyUHVsc2VzLFxuICBkcmF3RmlsbCxcbiAgZHJhd0xpbmUsXG4gIGRyYXdUZXh0LFxuICBkcmF3SGludFxufSBmcm9tICcuL3V0aWxzLmpzJ1xuaW1wb3J0IHsgQW5hbHl6ZXIgfSBmcm9tICcuL2hpc3RvZ3JhbS5qcydcbmltcG9ydCB7IGRlZmF1bHRzLCBzdHlsZXMsIHNsaWNlck9wdGlvbnMgfSBmcm9tICcuL2NvbnN0YW50cy5qcydcbi8vIGltcG9ydCAqIGFzIGQzIGZyb20gJ2QzJ1xuaW1wb3J0IHsgem9vbVRyYW5zZm9ybSwgc2VsZWN0LCBjcmVhdGUsIHpvb20sIGF4aXNUb3AsIHNjYWxlTGluZWFyIH0gZnJvbSAnZDMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZsaXBwZXJQbG90dGVyIHtcbiAgZ2V0IHNsaWNlck9wdGlvbnMoKSB7XG4gICAgcmV0dXJuIHNsaWNlck9wdGlvbnNcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIGlmICghb3B0aW9ucy5kYXRhKSB7XG4gICAgICBjb25zb2xlLmVycm9yKG5ldyBFcnJvcignUmVxdWlyZWQgZGF0YSBtaXNzaW5nIGZvciBmbGlwcGVyUGxvdHRlcicpKVxuICAgICAgcmV0dXJuXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGF0YSA9IG9wdGlvbnMuZGF0YVxuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnBhcmVudCkge1xuICAgICAgdGhpcy5wYXJlbnQgPSBzZWxlY3RvcihvcHRpb25zLnBhcmVudClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wYXJlbnQgPSBzZWxlY3RvcihkZWZhdWx0cy5zZWxlY3RvcilcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy50aW1pbmdzKSB7XG4gICAgICB0aGlzLnRpbWluZ3MgPSBzZWxlY3RvcihvcHRpb25zLnRpbWluZ3MpXG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMubWVzc2FnZXMpIHtcbiAgICAgIHRoaXMubWVzc2FnZXMgPSBzZWxlY3RvcihvcHRpb25zLm1lc3NhZ2VzKVxuICAgIH1cblxuICAgIGlmICghdGhpcy5wYXJlbnQpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IobmV3IEVycm9yKCdNaXNzaW5nIG1vdW50IGVsZW1lbnQgZm9yIGZsaXBwZXJQbG90dGVyJykpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0aGlzLnNldFRoZW1lKG9wdGlvbnMudGhlbWUpXG4gICAgdGhpcy5wcm9jZXNzRGF0YSh0aGlzLmRhdGEpXG5cbiAgICB0aGlzLmluaXRpYWxQbG90dGVyKG9wdGlvbnMpXG5cbiAgICB3aW5kb3cub25yZXNpemUgPSAoKSA9PiB7XG4gICAgICB0aGlzLmRlc3Ryb3koKVxuXG4gICAgICB0aGlzLmluaXRpYWxQbG90dGVyKClcbiAgICB9XG4gIH1cblxuICBpbml0aWFsUGxvdHRlcigpIHtcbiAgICB0aGlzLmNyZWF0ZU5vZGUoKVxuICAgIHRoaXMuaW5pdGlhbENhbnZhcygpXG4gICAgdGhpcy5kcmF3Q2FudmFzKClcbiAgfVxuXG4gIHNldFRoZW1lKG9wdGlvbnMpIHtcbiAgICB0aGlzLnRoZW1lID0geyAuLi5kZWZhdWx0cy50aGVtZSwgLi4ub3B0aW9ucyB9XG4gIH1cblxuICBzZXRTbGljZXIocGFyYW1zKSB7XG4gICAgaWYgKHBhcmFtcyAmJiBwYXJhbXMubW9kdWxhdGlvbikge1xuICAgICAgdGhpcy5zbGljZXIgPSBwYXJhbXNcbiAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YSAmJiB0aGlzLmRhdGEubW9kdWxhdGlvbikge1xuICAgICAgdGhpcy5zbGljZXIgPSB0aGlzLmRhdGFcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zbGljZXIgPSB0aGlzLmd1ZXNzXG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmRhdGEucHVsc2VzIHx8ICF0aGlzLmRhdGEucHVsc2VzLmxlbmd0aCkgcmV0dXJuXG5cbiAgICB0aGlzLnNldFNsaWNlckRhdGEodGhpcy5kYXRhLnB1bHNlcywgdGhpcy5zbGljZXIpXG5cbiAgICB0aGlzLnJlZHJhd0hpbnRzQ2FudmFzKHpvb21UcmFuc2Zvcm0odGhpcy5sYWJlbENhbnZhc05vZGUpKVxuICB9XG5cbiAgc2V0U2xpY2VyRGF0YShwdWxzZXMsIHNsaWNlcikge1xuICAgIGNvbnN0IHNsaWNlID0gc2xpY2VHdWVzcyhwdWxzZXMsIHNsaWNlcilcbiAgICBjb25zdCB0aW1pbmdzID0gdGhpcy50aW1pbmdzTm9kZVxuICAgIGNvbnN0IG1lc3NhZ2VzID0gdGhpcy5tZXNzYWdlc05vZGVcbiAgICB0aGlzLmFuYWx5emVyLnByaW50KHRpbWluZ3MsIG1lc3NhZ2VzKVxuXG4gICAgaWYgKHNsaWNlLmhpbnRzKSB7XG4gICAgICB0aGlzLmRhdGEuaGludHMgPSBzbGljZS5oaW50c1xuICAgICAgdGhpcy5hbHRIaW50cyA9IHRoaXMuZ2V0QWx0SGludHMoc2xpY2UuaGludHMpXG4gICAgfVxuXG4gICAgaWYgKHNsaWNlLmJpdHMpIHtcbiAgICAgIHRoaXMuZGF0YS5iaXRzID0gc2xpY2UuYml0c1xuXG4gICAgICBpZiAobWVzc2FnZXMpIHtcbiAgICAgICAgbWVzc2FnZXMuaW5uZXJIVE1MICs9IGA8ZGl2PkJpdHM6IDxzdHJvbmc+JHtzbGljZS5iaXRzLnRvSGV4U3RyaW5nKCl9PC9zdHJvbmc+PC9kaXY+YFxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldEFsdEhpbnRzKGhpbnRzKSB7XG4gICAgY29uc3QgYWx0SGludHMgPSBbXVxuICAgIGlmIChoaW50cykge1xuICAgICAgbGV0IHByZXZIaW50XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhpbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGQgPSBoaW50c1tpXVxuICAgICAgICBjb25zdCB4MCA9IGRbMF1cblxuICAgICAgICBpZiAoaSA+IDAgJiYgcHJldkhpbnRbMV0gIT09IHgwKSB7XG4gICAgICAgICAgYWx0SGludHMucHVzaChbcHJldkhpbnRbMV0sIHgwXSlcbiAgICAgICAgfVxuXG4gICAgICAgIHByZXZIaW50ID0gZFxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBhbHRIaW50c1xuICB9XG5cbiAgY3JlYXRlTm9kZSgpIHtcbiAgICBjb25zdCBmbGlwcGVyUGxvdHRlciA9IHNlbGVjdCh0aGlzLnBhcmVudClcbiAgICB0aGlzLmZsaXBwZXJQbG90dGVyTm9kZSA9IGZsaXBwZXJQbG90dGVyLm5vZGUoKVxuXG4gICAgdGhpcy5heGlzU3ZnID0gY3JlYXRlKCdzdmcnKVxuICAgIGNvbnN0IGF4aXNTdmdOb2RlID0gdGhpcy5heGlzU3ZnLm5vZGUoKVxuXG4gICAgY29uc3Qgd3JhcHBlciA9IGNyZWF0ZSgnZGl2JykuYXR0cihcbiAgICAgICdzdHlsZScsXG4gICAgICBzdHlsZXMucmVsYXRpdmVQb3NpdGlvbiArIHN0eWxlcy5mdWxsV2lkdGhcbiAgICApXG4gICAgY29uc3Qgd3JhcHBlck5vZGUgPSB3cmFwcGVyLm5vZGUoKVxuXG4gICAgY29uc3QgbGFiZWxDYW52YXMgPSBjcmVhdGUoJ2NhbnZhcycpLmF0dHIoXG4gICAgICAnc3R5bGUnLFxuICAgICAgc3R5bGVzLmFic29sdXRlVG9wTGVmdCArIHN0eWxlcy5mdWxsV2lkdGhcbiAgICApXG4gICAgdGhpcy5sYWJlbENhbnZhc05vZGUgPSBsYWJlbENhbnZhcy5ub2RlKClcblxuICAgIGNvbnN0IGhpbnRzQ2FudmFzID0gY3JlYXRlKCdjYW52YXMnKS5hdHRyKFxuICAgICAgJ3N0eWxlJyxcbiAgICAgIHN0eWxlcy5hYnNvbHV0ZVRvcExlZnQgKyBzdHlsZXMuZnVsbFdpZHRoXG4gICAgKVxuICAgIHRoaXMuaGludHNDYW52YXNOb2RlID0gaGludHNDYW52YXMubm9kZSgpXG5cbiAgICBjb25zdCBwdWxzZXNDYW52YXMgPSBjcmVhdGUoJ2NhbnZhcycpLmF0dHIoJ3N0eWxlJywgc3R5bGVzLmZ1bGxXaWR0aClcbiAgICB0aGlzLnB1bHNlc0NhbnZhc05vZGUgPSBwdWxzZXNDYW52YXMubm9kZSgpXG5cbiAgICBsZXQgdGltaW5nc0RpdlxuICAgIGlmICh0aGlzLnRpbWluZ3MpIHtcbiAgICAgIHRpbWluZ3NEaXYgPSBzZWxlY3QodGhpcy50aW1pbmdzKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aW1pbmdzRGl2ID0gY3JlYXRlKCdkaXYnKVxuICAgIH1cbiAgICB0aGlzLnRpbWluZ3NOb2RlID0gdGltaW5nc0Rpdi5ub2RlKClcblxuICAgIGxldCBtZXNzYWdlc0RpdlxuICAgIGlmICh0aGlzLm1lc3NhZ2VzKSB7XG4gICAgICBtZXNzYWdlc0RpdiA9IHNlbGVjdCh0aGlzLm1lc3NhZ2VzKVxuICAgIH0gZWxzZSB7XG4gICAgICBtZXNzYWdlc0RpdiA9IGNyZWF0ZSgnZGl2JylcbiAgICB9XG4gICAgdGhpcy5tZXNzYWdlc05vZGUgPSBtZXNzYWdlc0Rpdi5ub2RlKClcblxuICAgIHRoaXMuZmxpcHBlclBsb3R0ZXJOb2RlLmFwcGVuZChheGlzU3ZnTm9kZSlcbiAgICB3cmFwcGVyTm9kZS5hcHBlbmQodGhpcy5oaW50c0NhbnZhc05vZGUpXG4gICAgd3JhcHBlck5vZGUuYXBwZW5kKHRoaXMubGFiZWxDYW52YXNOb2RlKVxuICAgIHdyYXBwZXJOb2RlLmFwcGVuZCh0aGlzLnB1bHNlc0NhbnZhc05vZGUpXG4gICAgdGhpcy5mbGlwcGVyUGxvdHRlck5vZGUuYXBwZW5kKHdyYXBwZXJOb2RlKVxuXG4gICAgaWYgKCF0aGlzLnRpbWluZ3MpIHtcbiAgICAgIHRoaXMuZmxpcHBlclBsb3R0ZXJOb2RlLmFwcGVuZCh0aGlzLnRpbWluZ3NOb2RlKVxuICAgIH1cbiAgICBpZiAoIXRoaXMubWVzc2FnZXMpIHtcbiAgICAgIHRoaXMuZmxpcHBlclBsb3R0ZXJOb2RlLmFwcGVuZCh0aGlzLm1lc3NhZ2VzTm9kZSlcbiAgICB9XG4gIH1cblxuICBpbml0aWFsQ2FudmFzKCkge1xuICAgIHRoaXMud2lkdGggPSB0aGlzLnB1bHNlc0NhbnZhc05vZGUuY2xpZW50V2lkdGhcbiAgICB0aGlzLmhlaWdodCA9IGRlZmF1bHRzLmhlaWdodFxuXG4gICAgdGhpcy5jb250ZXh0ID0gdGhpcy5jb250ZXh0MmQoXG4gICAgICB0aGlzLnB1bHNlc0NhbnZhc05vZGUsXG4gICAgICB0aGlzLndpZHRoLFxuICAgICAgdGhpcy5oZWlnaHRcbiAgICApXG4gICAgdGhpcy5sYWJlbENvbnRleHQgPSB0aGlzLmNvbnRleHQyZChcbiAgICAgIHRoaXMubGFiZWxDYW52YXNOb2RlLFxuICAgICAgdGhpcy53aWR0aCxcbiAgICAgIHRoaXMuaGVpZ2h0XG4gICAgKVxuICAgIHRoaXMuaGludHNDb250ZXh0ID0gdGhpcy5jb250ZXh0MmQoXG4gICAgICB0aGlzLmhpbnRzQ2FudmFzTm9kZSxcbiAgICAgIHRoaXMud2lkdGgsXG4gICAgICB0aGlzLmhlaWdodFxuICAgIClcbiAgfVxuXG4gIHByb2Nlc3NEYXRhKGRhdGEpIHtcbiAgICBsZXQgd2lkdGggPSAwXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmRhdGEucHVsc2VzLmxlbmd0aDsgKytqKSB7XG4gICAgICB3aWR0aCArPSB0aGlzLmRhdGEucHVsc2VzW2pdXG4gICAgfVxuICAgIHRoaXMuZGF0YS53aWR0aCA9IHdpZHRoXG5cbiAgICB0aGlzLmRhdGEuaGludHMgPSBbXVxuICAgIHRoaXMuYWx0SGludHMgPSBbXVxuXG4gICAgdGhpcy5hbmFseXplciA9IG5ldyBBbmFseXplcihkYXRhLnB1bHNlcylcbiAgICB0aGlzLmd1ZXNzID0gdGhpcy5hbmFseXplci5ndWVzcygpXG4gICAgdGhpcy5zbGljZXIgPSB0aGlzLmd1ZXNzXG5cbiAgICB0aGlzLnNldFNsaWNlckRhdGEoZGF0YS5wdWxzZXMsIHRoaXMuc2xpY2VyKVxuICB9XG5cbiAgY29udGV4dDJkKGNhbnZhcywgd2lkdGgsIGhlaWdodCwgZHBpKSB7XG4gICAgY29uc3QgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcsIHsgZGVzeW5jaHJvbml6ZWQ6IHRydWUgfSlcbiAgICBpZiAoZHBpID09IG51bGwpIGRwaSA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvXG4gICAgY2FudmFzLndpZHRoID0gTWF0aC5mbG9vcih3aWR0aCAqIGRwaSlcbiAgICBjYW52YXMuaGVpZ2h0ID0gTWF0aC5mbG9vcihoZWlnaHQgKiBkcGkpXG4gICAgY2FudmFzLnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnXG4gICAgY2FudmFzLnN0eWxlLmhlaWdodCA9IGhlaWdodCArICdweCdcbiAgICBjb250ZXh0LnNjYWxlKGRwaSwgZHBpKVxuICAgIHJldHVybiBjb250ZXh0XG4gIH1cblxuICBkcmF3QWxsSGludHModHJhbnNmb3JtKSB7XG4gICAgY29uc3QgeyBsZWZ0UHVsc2UsIHJpZ2h0UHVsc2UgfSA9IGdldEJvdW5kYXJpZXMoXG4gICAgICB0aGlzLmRhdGEsXG4gICAgICB0aGlzLndpZHRoLFxuICAgICAgdHJhbnNmb3JtXG4gICAgKVxuXG4gICAgY29uc3QgaGludHMgPSB0aGlzLmRhdGEuaGludHMuZmlsdGVyKChkKSA9PiB7XG4gICAgICBjb25zdCB4MCA9IGRbMF1cbiAgICAgIGNvbnN0IHgxID0gZFsxXVxuICAgICAgaWYgKHgwID49IGxlZnRQdWxzZSAmJiB4MCA8PSByaWdodFB1bHNlKSByZXR1cm4gdHJ1ZVxuICAgICAgaWYgKHgxID49IGxlZnRQdWxzZSAmJiB4MSA8PSByaWdodFB1bHNlKSByZXR1cm4gdHJ1ZVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSlcblxuICAgIGxldCBwcmV2SGludFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGludHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGhpbnQgPSBoaW50c1tpXVxuICAgICAgY29uc3QgeDAgPSBoaW50WzBdXG4gICAgICBjb25zdCB4MSA9IGhpbnRbMV1cblxuICAgICAgaWYgKHByZXZIaW50ICE9PSB4MCAmJiB4MCA+PSAwICYmIHgwIDwgdGhpcy5kYXRhLndpZHRoKSB7XG4gICAgICAgIGRyYXdIaW50KFxuICAgICAgICAgIHRoaXMuaGludHNDb250ZXh0LFxuICAgICAgICAgIHgwICogKHRyYW5zZm9ybS5rIC8gdGhpcy5tYXhab29tKSArIHRyYW5zZm9ybS54LFxuICAgICAgICAgIHRoaXMuaGVpZ2h0LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGhpbnRMaW5lOiB0aGlzLnRoZW1lLmhpbnRMaW5lLFxuICAgICAgICAgICAgaGludFN0cm9rZTogdGhpcy50aGVtZS5oaW50U3Ryb2tlLFxuICAgICAgICAgICAgaGludERhc2g6IHRoaXMudGhlbWUuaGludERhc2hcbiAgICAgICAgICB9XG4gICAgICAgIClcbiAgICAgIH1cbiAgICAgIGlmICh4MSA+PSAwICYmIHgxIDwgdGhpcy5kYXRhLndpZHRoKSB7XG4gICAgICAgIGRyYXdIaW50KFxuICAgICAgICAgIHRoaXMuaGludHNDb250ZXh0LFxuICAgICAgICAgIHgxICogKHRyYW5zZm9ybS5rIC8gdGhpcy5tYXhab29tKSArIHRyYW5zZm9ybS54LFxuICAgICAgICAgIHRoaXMuaGVpZ2h0LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGhpbnRMaW5lOiB0aGlzLnRoZW1lLmhpbnRMaW5lLFxuICAgICAgICAgICAgaGludFN0cm9rZTogdGhpcy50aGVtZS5oaW50U3Ryb2tlLFxuICAgICAgICAgICAgaGludERhc2g6IHRoaXMudGhlbWUuaGludERhc2hcbiAgICAgICAgICB9XG4gICAgICAgIClcbiAgICAgIH1cbiAgICAgIHByZXZIaW50ID0geDFcbiAgICB9XG5cbiAgICBjb25zdCBhbHRIaW50cyA9IHRoaXMuYWx0SGludHMuZmlsdGVyKChkKSA9PiB7XG4gICAgICBjb25zdCB4MCA9IGRbMF1cbiAgICAgIGNvbnN0IHgxID0gZFsxXVxuICAgICAgaWYgKHgwID49IGxlZnRQdWxzZSAmJiB4MCA8PSByaWdodFB1bHNlKSByZXR1cm4gdHJ1ZVxuICAgICAgaWYgKHgxID49IGxlZnRQdWxzZSAmJiB4MSA8PSByaWdodFB1bHNlKSByZXR1cm4gdHJ1ZVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSlcblxuICAgIHByZXZIaW50ID0gbnVsbFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWx0SGludHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGhpbnQgPSBhbHRIaW50c1tpXVxuICAgICAgY29uc3QgeDAgPSBoaW50WzBdXG4gICAgICBjb25zdCB4MSA9IGhpbnRbMV1cblxuICAgICAgaWYgKHByZXZIaW50ICE9PSB4MCAmJiB4MCA+PSAwICYmIHgwIDwgdGhpcy5kYXRhLndpZHRoKSB7XG4gICAgICAgIGRyYXdIaW50KFxuICAgICAgICAgIHRoaXMuaGludHNDb250ZXh0LFxuICAgICAgICAgIHgwICogKHRyYW5zZm9ybS5rIC8gdGhpcy5tYXhab29tKSArIHRyYW5zZm9ybS54LFxuICAgICAgICAgIHRoaXMuaGVpZ2h0LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGhpbnRMaW5lOiB0aGlzLnRoZW1lLmhpbnRBbHRMaW5lLFxuICAgICAgICAgICAgaGludFN0cm9rZTogdGhpcy50aGVtZS5oaW50QWx0U3Ryb2tlLFxuICAgICAgICAgICAgaGludERhc2g6IHRoaXMudGhlbWUuaGludEFsdERhc2hcbiAgICAgICAgICB9XG4gICAgICAgIClcbiAgICAgIH1cbiAgICAgIGlmICh4MSA+PSAwICYmIHgxIDwgdGhpcy5kYXRhLndpZHRoKSB7XG4gICAgICAgIGRyYXdIaW50KFxuICAgICAgICAgIHRoaXMuaGludHNDb250ZXh0LFxuICAgICAgICAgIHgxICogKHRyYW5zZm9ybS5rIC8gdGhpcy5tYXhab29tKSArIHRyYW5zZm9ybS54LFxuICAgICAgICAgIHRoaXMuaGVpZ2h0LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGhpbnRMaW5lOiB0aGlzLnRoZW1lLmhpbnRBbHRMaW5lLFxuICAgICAgICAgICAgaGludFN0cm9rZTogdGhpcy50aGVtZS5oaW50QWx0U3Ryb2tlLFxuICAgICAgICAgICAgaGludERhc2g6IHRoaXMudGhlbWUuaGludEFsdERhc2hcbiAgICAgICAgICB9XG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgcHJldkhpbnQgPSB4MVxuICAgIH1cbiAgfVxuXG4gIHpvb21lZCh0cmFuc2Zvcm0pIHtcbiAgICBpZiAodHJhbnNmb3JtLnggPiAwKSB0cmFuc2Zvcm0ueCA9IDBcbiAgICBpZiAodHJhbnNmb3JtLnggKyB0aGlzLndpZHRoICogdHJhbnNmb3JtLmsgPCB0aGlzLndpZHRoKSB7XG4gICAgICB0cmFuc2Zvcm0ueCA9IHRoaXMud2lkdGggLSB0aGlzLndpZHRoICogdHJhbnNmb3JtLmtcbiAgICB9XG5cbiAgICB0aGlzLnhTY2FsZSA9IHRyYW5zZm9ybS5yZXNjYWxlWCh0aGlzLnhTY2FsZUNvcHkpXG5cbiAgICBjb25zdCBjdXJyZW50UmFuZ2UgPSBhdXRvcmFuZ2UodGhpcy5kYXRhLndpZHRoIC8gdHJhbnNmb3JtLmspXG4gICAgY29uc3QgY3VycmVudFRpbWVSYW5nZSA9IGF1dG9yYW5nZV90aW1lKHRoaXMuZGF0YS53aWR0aCAvIDFlNiAvIHRyYW5zZm9ybS5rKVxuXG4gICAgdGhpcy5heGlzU3ZnLnNlbGVjdCgnLngtYXhpcycpLmNhbGwoXG4gICAgICBheGlzVG9wKHRoaXMueFNjYWxlKVxuICAgICAgICAudGlja3ModGhpcy53aWR0aCAvIDEwMClcbiAgICAgICAgLnRpY2tGb3JtYXQoXG4gICAgICAgICAgKHgpID0+XG4gICAgICAgICAgICAoeCAvIGN1cnJlbnRSYW5nZS5zY2FsZSkudG9GaXhlZCgyKS5yZXBsYWNlKC9bLixdMDAkLywgJycpICtcbiAgICAgICAgICAgIGAke2N1cnJlbnRUaW1lUmFuZ2UucHJlZml4fWBcbiAgICAgICAgKVxuICAgIClcblxuICAgIHRoaXMubGFiZWxDb250ZXh0LnNhdmUoKVxuICAgIHRoaXMubGFiZWxDb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodClcblxuICAgIHRoaXMuaGludHNDb250ZXh0LnNhdmUoKVxuICAgIHRoaXMuaGludHNDb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodClcblxuICAgIHRoaXMuY29udGV4dC5zYXZlKClcbiAgICB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KVxuXG4gICAgZHJhd0ZpbGwoXG4gICAgICB0aGlzLmNvbnRleHQsXG4gICAgICAwLFxuICAgICAgLTEsXG4gICAgICB0aGlzLndpZHRoLFxuICAgICAgdGhpcy5iYXJIZWlnaHQgKyB0aGlzLm1hcmdpbi50b3AgKyB0aGlzLm1hcmdpbi5ib3R0b20sXG4gICAgICB0aGlzLnRoZW1lLnNwYWNlRmlsbFxuICAgIClcblxuICAgIGxldCBwcmV2WCA9IDBcbiAgICBsZXQgc2tpcFB1bHNlID0gMFxuICAgIGxldCBzdW0gPSAwXG5cbiAgICBjb25zdCB7IGxlZnRQdWxzZSwgcmlnaHRQdWxzZSwgcHVsc2VJbk9uZVggfSA9IGdldEJvdW5kYXJpZXMoXG4gICAgICB0aGlzLmRhdGEsXG4gICAgICB0aGlzLndpZHRoLFxuICAgICAgdHJhbnNmb3JtXG4gICAgKVxuXG4gICAgaWYgKHRyYW5zZm9ybS5rIDwgdGhpcy5icmVha3BvaW50Wm9vbSkge1xuICAgICAgdGhpcy5wdWxzZXMgPSBjb21iaW5pbmdQdWxzZXModGhpcy5kYXRhLCBwdWxzZUluT25lWClcbiAgICAgIDsoe1xuICAgICAgICBwdWxzZXM6IHRoaXMucHVsc2VzLFxuICAgICAgICBzdW0sXG4gICAgICAgIHByZXZYLFxuICAgICAgICBza2lwUHVsc2VcbiAgICAgIH0gPSBmaWx0ZXJQdWxzZXMoXG4gICAgICAgIHRoaXMucHVsc2VzLFxuICAgICAgICBzdW0sXG4gICAgICAgIHByZXZYLFxuICAgICAgICBza2lwUHVsc2UsXG4gICAgICAgIGxlZnRQdWxzZSxcbiAgICAgICAgcmlnaHRQdWxzZVxuICAgICAgKSlcbiAgICB9IGVsc2Uge1xuICAgICAgOyh7XG4gICAgICAgIHB1bHNlczogdGhpcy5wdWxzZXMsXG4gICAgICAgIHN1bSxcbiAgICAgICAgcHJldlgsXG4gICAgICAgIHNraXBQdWxzZVxuICAgICAgfSA9IGZpbHRlclB1bHNlcyhcbiAgICAgICAgdGhpcy5kYXRhLnB1bHNlcyxcbiAgICAgICAgc3VtLFxuICAgICAgICBwcmV2WCxcbiAgICAgICAgc2tpcFB1bHNlLFxuICAgICAgICBsZWZ0UHVsc2UsXG4gICAgICAgIHJpZ2h0UHVsc2VcbiAgICAgICkpXG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnB1bHNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgeCA9IHRoaXMucHVsc2VzW2ldXG5cbiAgICAgIGlmICh4KSB7XG4gICAgICAgIGlmICgoaSArIHNraXBQdWxzZSkgJSAyID09PSAwKSB7XG4gICAgICAgICAgZHJhd0ZpbGwoXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQsXG4gICAgICAgICAgICBwcmV2WCAqICh0cmFuc2Zvcm0uayAvIHRoaXMubWF4Wm9vbSkgKyB0cmFuc2Zvcm0ueCxcbiAgICAgICAgICAgIHRoaXMubWFyZ2luLnRvcCxcbiAgICAgICAgICAgIHggKiAodHJhbnNmb3JtLmsgLyB0aGlzLm1heFpvb20pLFxuICAgICAgICAgICAgdGhpcy5iYXJIZWlnaHQsXG4gICAgICAgICAgICB0cmFuc2Zvcm0uayA8IHRoaXMuYnJlYWtwb2ludFpvb21cbiAgICAgICAgICAgICAgPyB0aGlzLnRoZW1lLmNvbWJpbmluZ0ZpbGxcbiAgICAgICAgICAgICAgOiB0aGlzLnRoZW1lLmhpRmlsbFxuICAgICAgICAgIClcblxuICAgICAgICAgIGRyYXdMaW5lKFxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdGFydDogW1xuICAgICAgICAgICAgICAgIHByZXZYICogKHRyYW5zZm9ybS5rIC8gdGhpcy5tYXhab29tKSArIHRyYW5zZm9ybS54LFxuICAgICAgICAgICAgICAgIHRoaXMuaGVpZ2h0IC1cbiAgICAgICAgICAgICAgICAgIHRoaXMuYmFySGVpZ2h0IC1cbiAgICAgICAgICAgICAgICAgIHRoaXMubWFyZ2luLnRvcCArXG4gICAgICAgICAgICAgICAgICB0aGlzLnRoZW1lLmhpTGluZSAvIDJcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgZW5kOiBbXG4gICAgICAgICAgICAgICAgKHByZXZYICsgeCkgKiAodHJhbnNmb3JtLmsgLyB0aGlzLm1heFpvb20pICsgdHJhbnNmb3JtLngsXG4gICAgICAgICAgICAgICAgdGhpcy5oZWlnaHQgLVxuICAgICAgICAgICAgICAgICAgdGhpcy5iYXJIZWlnaHQgLVxuICAgICAgICAgICAgICAgICAgdGhpcy5tYXJnaW4udG9wICtcbiAgICAgICAgICAgICAgICAgIHRoaXMudGhlbWUuaGlMaW5lIC8gMlxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBsaW5lV2lkdGg6IHRoaXMudGhlbWUuaGlMaW5lLFxuICAgICAgICAgICAgICBzdHJva2VTdHlsZTogdGhpcy50aGVtZS5oaVN0cm9rZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkcmF3TGluZShcbiAgICAgICAgICAgIHRoaXMuY29udGV4dCxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3RhcnQ6IFtcbiAgICAgICAgICAgICAgICBwcmV2WCAqICh0cmFuc2Zvcm0uayAvIHRoaXMubWF4Wm9vbSkgKyB0cmFuc2Zvcm0ueCxcbiAgICAgICAgICAgICAgICB0aGlzLmhlaWdodCAtIHRoaXMubWFyZ2luLnRvcCAtIHRoaXMudGhlbWUubG9MaW5lIC8gMlxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBlbmQ6IFtcbiAgICAgICAgICAgICAgICAocHJldlggKyB4KSAqICh0cmFuc2Zvcm0uayAvIHRoaXMubWF4Wm9vbSkgKyB0cmFuc2Zvcm0ueCxcbiAgICAgICAgICAgICAgICB0aGlzLmhlaWdodCAtIHRoaXMubWFyZ2luLnRvcCAtIHRoaXMudGhlbWUubG9MaW5lIC8gMlxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBsaW5lV2lkdGg6IHRoaXMudGhlbWUubG9MaW5lLFxuICAgICAgICAgICAgICBzdHJva2VTdHlsZTogdGhpcy50aGVtZS5sb1N0cm9rZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIClcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHcgPSB4ICogKCh0aGlzLndpZHRoICogdHJhbnNmb3JtLmspIC8gdGhpcy5kYXRhLndpZHRoKVxuICAgICAgICBpZiAodyA+IHRoaXMudGhlbWUuZm9udFNpemUgKiA0KSB7XG4gICAgICAgICAgZHJhd1RleHQoXG4gICAgICAgICAgICB0aGlzLmxhYmVsQ29udGV4dCxcbiAgICAgICAgICAgIHgsXG4gICAgICAgICAgICAocHJldlggKyB4IC8gMikgKiAodHJhbnNmb3JtLmsgLyB0aGlzLm1heFpvb20pICsgdHJhbnNmb3JtLngsXG4gICAgICAgICAgICB0aGlzLmhlaWdodCAvIDIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGNvbG9yOiB0aGlzLnRoZW1lLmZvbnRDb2xvcixcbiAgICAgICAgICAgICAgZm9udDogYCR7dGhpcy50aGVtZS5mb250U2l6ZX1weCBzYW5zLXNlcmlmYCxcbiAgICAgICAgICAgICAgYWxpZ246IHRoaXMudGhlbWUuZm9udEFsaWduLFxuICAgICAgICAgICAgICBiYXNlbGluZTogdGhpcy50aGVtZS5mb250QmFzZWxpbmVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXG4gICAgICAgICAgcHVsc2VJbk9uZVggPD0gdGhpcy5icmVha3BvaW50UHVsc2VJbk9uZVggJiZcbiAgICAgICAgICB0cmFuc2Zvcm0uayA+PSB0aGlzLmJyZWFrcG9pbnRab29tICYmXG4gICAgICAgICAgKGkgKyBza2lwUHVsc2UpICUgMiA9PT0gMFxuICAgICAgICApIHtcbiAgICAgICAgICBkcmF3TGluZShcbiAgICAgICAgICAgIHRoaXMuY29udGV4dCxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3RhcnQ6IFtcbiAgICAgICAgICAgICAgICBwcmV2WCAqICh0cmFuc2Zvcm0uayAvIHRoaXMubWF4Wm9vbSkgKyB0cmFuc2Zvcm0ueCxcbiAgICAgICAgICAgICAgICB0aGlzLmhlaWdodCAtIHRoaXMubWFyZ2luLnRvcFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBlbmQ6IFtcbiAgICAgICAgICAgICAgICBwcmV2WCAqICh0cmFuc2Zvcm0uayAvIHRoaXMubWF4Wm9vbSkgKyB0cmFuc2Zvcm0ueCxcbiAgICAgICAgICAgICAgICB0aGlzLmhlaWdodCAtIHRoaXMuYmFySGVpZ2h0IC0gdGhpcy5tYXJnaW4udG9wXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxpbmVXaWR0aDogdGhpcy50aGVtZS5lZGdlTGluZSxcbiAgICAgICAgICAgICAgc3Ryb2tlU3R5bGU6IHRoaXMudGhlbWUuaGlTdHJva2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApXG5cbiAgICAgICAgICBkcmF3TGluZShcbiAgICAgICAgICAgIHRoaXMuY29udGV4dCxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3RhcnQ6IFtcbiAgICAgICAgICAgICAgICAocHJldlggKyB4KSAqICh0cmFuc2Zvcm0uayAvIHRoaXMubWF4Wm9vbSkgKyB0cmFuc2Zvcm0ueCxcbiAgICAgICAgICAgICAgICB0aGlzLmhlaWdodCAtIHRoaXMuYmFySGVpZ2h0IC0gdGhpcy5tYXJnaW4udG9wXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIGVuZDogW1xuICAgICAgICAgICAgICAgIChwcmV2WCArIHgpICogKHRyYW5zZm9ybS5rIC8gdGhpcy5tYXhab29tKSArIHRyYW5zZm9ybS54LFxuICAgICAgICAgICAgICAgIHRoaXMuaGVpZ2h0IC0gdGhpcy5tYXJnaW4udG9wXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxpbmVXaWR0aDogdGhpcy50aGVtZS5lZGdlTGluZSxcbiAgICAgICAgICAgICAgc3Ryb2tlU3R5bGU6IHRoaXMudGhlbWUubG9TdHJva2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICBwcmV2WCA9IHByZXZYICsgeFxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuZHJhd0FsbEhpbnRzKHRyYW5zZm9ybSlcblxuICAgIHRoaXMubGFiZWxDb250ZXh0LnJlc3RvcmUoKVxuICAgIHRoaXMuaGludHNDb250ZXh0LnJlc3RvcmUoKVxuICAgIHRoaXMuY29udGV4dC5yZXN0b3JlKClcbiAgfVxuXG4gIHJlZHJhd0hpbnRzQ2FudmFzKHRyYW5zZm9ybSkge1xuICAgIHRoaXMuaGludHNDb250ZXh0LnNhdmUoKVxuICAgIHRoaXMuaGludHNDb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodClcblxuICAgIHRoaXMuZHJhd0FsbEhpbnRzKHRyYW5zZm9ybSlcblxuICAgIHRoaXMuaGludHNDb250ZXh0LnJlc3RvcmUoKVxuICB9XG5cbiAgZHJhd0NhbnZhcygpIHtcbiAgICB0aGlzLm1hcmdpbiA9IGRlZmF1bHRzLm1hcmdpblxuICAgIHRoaXMuYmFySGVpZ2h0ID0gdGhpcy5oZWlnaHQgLSB0aGlzLm1hcmdpbi50b3AgLSB0aGlzLm1hcmdpbi5ib3R0b21cblxuICAgIHRoaXMucHVsc2VzID0gW11cbiAgICB0aGlzLmJyZWFrcG9pbnRab29tID0gZGVmYXVsdHMuYnJlYWtwb2ludHMuem9vbVxuICAgIHRoaXMuYnJlYWtwb2ludFB1bHNlSW5PbmVYID0gZGVmYXVsdHMuYnJlYWtwb2ludHMucHVsc2VJbk9uZVhcblxuICAgIGNvbnN0IG1pblpvb20gPSAxXG4gICAgdGhpcy5tYXhab29tID0gdGhpcy5kYXRhLndpZHRoIC8gdGhpcy53aWR0aFxuXG4gICAgdGhpcy54U2NhbGUgPSBzY2FsZUxpbmVhcigpXG4gICAgICAucmFuZ2UoWzAsIHRoaXMud2lkdGhdKVxuICAgICAgLmRvbWFpbihbMCwgdGhpcy5kYXRhLndpZHRoXSlcblxuICAgIHRoaXMueFNjYWxlQ29weSA9IHRoaXMueFNjYWxlLmNvcHkoKVxuXG4gICAgY29uc3QgeEF4aXMgPSBheGlzVG9wKHRoaXMueFNjYWxlKVxuICAgICAgLnRpY2tzKHRoaXMud2lkdGggLyAxMDApXG4gICAgICAudGlja0Zvcm1hdCgoeCkgPT4gYCgke3gudG9GaXhlZCgxKX0pYClcblxuICAgIC8vIGQzLnNlbGVjdCh0aGlzLnB1bHNlc0NhbnZhc05vZGUpXG4gICAgLy8gICAuY2FsbChcbiAgICAvLyAgICAgZDNcbiAgICAvLyAgICAgICAuem9vbSgpXG4gICAgLy8gICAgICAgLnNjYWxlRXh0ZW50KFttaW5ab29tLCB0aGlzLm1heFpvb21dKVxuICAgIC8vICAgICAgIC5vbignem9vbScsICh7IHRyYW5zZm9ybSB9KSA9PiB0aGlzLnpvb21lZCh0cmFuc2Zvcm0pKVxuICAgIC8vICAgKVxuXG4gICAgY29uc3QgbGFiZWzQoWFudmFzID0gc2VsZWN0KHRoaXMubGFiZWxDYW52YXNOb2RlKVxuICAgICAgLnN0eWxlKCdjdXJzb3InLCAnZ3JhYicpXG4gICAgICAuY2FsbChcbiAgICAgICAgem9vbSgpXG4gICAgICAgICAgLnNjYWxlRXh0ZW50KFttaW5ab29tLCB0aGlzLm1heFpvb21dKVxuICAgICAgICAgIC5vbignc3RhcnQnLCAoKSA9PiB7XG4gICAgICAgICAgICBsYWJlbNChYW52YXMuc3R5bGUoJ2N1cnNvcicsICdncmFiYmluZycpXG4gICAgICAgICAgfSlcbiAgICAgICAgICAub24oJ3pvb20nLCAoZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGUuc291cmNlRXZlbnQudHlwZSA9PT0gJ3doZWVsJykge1xuICAgICAgICAgICAgICBsYWJlbNChYW52YXMuc3R5bGUoJ2N1cnNvcicsICducy1yZXNpemUnKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy56b29tZWQoZS50cmFuc2Zvcm0pXG4gICAgICAgICAgfSlcbiAgICAgICAgICAub24oJ2VuZCcsICgpID0+IHtcbiAgICAgICAgICAgIGxhYmVs0KFhbnZhcy5zdHlsZSgnY3Vyc29yJywgJ2dyYWInKVxuICAgICAgICAgIH0pXG4gICAgICApXG5cbiAgICBjb25zdCBheGlzSGVpZ2h0ID0gMThcbiAgICB0aGlzLmF4aXNTdmdcbiAgICAgIC5hdHRyKCd2aWVib3gnLCBbMCwgMCwgdGhpcy53aWR0aCwgYXhpc0hlaWdodF0pXG4gICAgICAuYXR0cignd2lkdGgnLCB0aGlzLndpZHRoKVxuICAgICAgLmF0dHIoJ2hlaWdodCcsIGF4aXNIZWlnaHQpXG4gICAgdGhpcy5heGlzU3ZnLmFwcGVuZCgnZycpLmNsYXNzZWQoJ3gtYXhpcycsIHRydWUpLmNhbGwoeEF4aXMpXG5cbiAgICBzZWxlY3QoJy54LWF4aXMnKS5hdHRyKCd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlKCR7WzAsIGF4aXNIZWlnaHRdfSlgKVxuXG4gICAgdGhpcy56b29tZWQoem9vbVRyYW5zZm9ybSh0aGlzLmxhYmVsQ2FudmFzTm9kZSkpXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuZmxpcHBlclBsb3R0ZXJOb2RlLmlubmVySFRNTCA9ICcnXG4gIH1cbn1cbiIsImltcG9ydCB7IGF1dG9yYW5nZSwgYXV0b3JhbmdlX3RpbWUgfSBmcm9tICcuL2F1dG9yYW5nZS5qcydcbmltcG9ydCB7IHNsaWNlR3Vlc3MgfSBmcm9tICcuL3NsaWNlci5qcydcbmltcG9ydCB7IHNlbGVjdG9yIH0gZnJvbSAnLi91dGlscy5qcydcbmltcG9ydCB7IEFuYWx5emVyIH0gZnJvbSAnLi9oaXN0b2dyYW0uanMnXG5pbXBvcnQgeyBkZWZhdWx0cywgc3R5bGVzLCBzbGljZXJPcHRpb25zIH0gZnJvbSAnLi9jb25zdGFudHMuanMnXG4vLyBpbXBvcnQgKiBhcyBkMyBmcm9tICdkMydcbmltcG9ydCB7XG4gIHpvb21UcmFuc2Zvcm0sXG4gIHpvb21JZGVudGl0eSxcbiAgc2VsZWN0LFxuICBjcmVhdGUsXG4gIHpvb20sXG4gIGF4aXNUb3AsXG4gIHNjYWxlTGluZWFyXG59IGZyb20gJ2QzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGbGlwcGVyUGxvdHRlck9mZnNjcmVlbiB7XG4gIGdldCBzbGljZXJPcHRpb25zKCkge1xuICAgIHJldHVybiBzbGljZXJPcHRpb25zXG4gIH1cblxuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBpZiAoIW9wdGlvbnMuZGF0YSkge1xuICAgICAgY29uc29sZS5lcnJvcihuZXcgRXJyb3IoJ1JlcXVpcmVkIGRhdGEgbWlzc2luZyBmb3IgZmxpcHBlclBsb3R0ZXInKSlcbiAgICAgIHJldHVyblxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRhdGEgPSBvcHRpb25zLmRhdGFcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5wYXJlbnQpIHtcbiAgICAgIHRoaXMucGFyZW50ID0gc2VsZWN0b3Iob3B0aW9ucy5wYXJlbnQpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGFyZW50ID0gc2VsZWN0b3IoZGVmYXVsdHMuc2VsZWN0b3IpXG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMudGltaW5ncykge1xuICAgICAgdGhpcy50aW1pbmdzID0gc2VsZWN0b3Iob3B0aW9ucy50aW1pbmdzKVxuICAgIH1cblxuICAgIGlmIChvcHRpb25zLm1lc3NhZ2VzKSB7XG4gICAgICB0aGlzLm1lc3NhZ2VzID0gc2VsZWN0b3Iob3B0aW9ucy5tZXNzYWdlcylcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMucGFyZW50KSB7XG4gICAgICBjb25zb2xlLmVycm9yKG5ldyBFcnJvcignTWlzc2luZyBtb3VudCBlbGVtZW50IGZvciBmbGlwcGVyUGxvdHRlcicpKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGhpcy5pbml0aWFsUGxvdHRlcihvcHRpb25zKVxuXG4gICAgd2luZG93Lm9ucmVzaXplID0gKCkgPT4ge1xuICAgICAgdGhpcy5kZXN0cm95KClcblxuICAgICAgdGhpcy5pbml0aWFsUGxvdHRlcihvcHRpb25zKVxuICAgIH1cbiAgfVxuXG4gIGluaXRpYWxQbG90dGVyKG9wdGlvbnMpIHtcbiAgICB0aGlzLmNyZWF0ZVdvcmtlcigpXG4gICAgdGhpcy5zZXRUaGVtZShvcHRpb25zLnRoZW1lKVxuICAgIHRoaXMuY3JlYXRlTm9kZSgpXG4gICAgdGhpcy5pbml0aWFsQ2FudmFzKClcbiAgICB0aGlzLnByb2Nlc3NEYXRhKHRoaXMuZGF0YSlcbiAgICB0aGlzLmRyYXdDYW52YXMoKVxuICB9XG5cbiAgY3JlYXRlV29ya2VyKCkge1xuICAgIHRoaXMud29ya2VyID0gbmV3IFdvcmtlcihuZXcgVVJMKCcuL3dvcmtlci5qcycsIGltcG9ydC5tZXRhLnVybCksIHtcbiAgICAgIHR5cGU6ICdtb2R1bGUnXG4gICAgfSlcbiAgfVxuXG4gIHNldFRoZW1lKG9wdGlvbnMpIHtcbiAgICB0aGlzLnRoZW1lID0geyAuLi5kZWZhdWx0cy50aGVtZSwgLi4ub3B0aW9ucyB9XG5cbiAgICB0aGlzLndvcmtlci5wb3N0TWVzc2FnZSh7IG1lc3NhZ2U6ICdzZXRUaGVtZScsIHRoZW1lOiB0aGlzLnRoZW1lIH0pXG4gIH1cblxuICBzZXRTbGljZXIocGFyYW1zKSB7XG4gICAgaWYgKHBhcmFtcyAmJiBwYXJhbXMubW9kdWxhdGlvbikge1xuICAgICAgdGhpcy5zbGljZXIgPSBwYXJhbXNcbiAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YSAmJiB0aGlzLmRhdGEubW9kdWxhdGlvbikge1xuICAgICAgdGhpcy5zbGljZXIgPSB0aGlzLmRhdGFcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zbGljZXIgPSB0aGlzLmd1ZXNzXG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmRhdGEucHVsc2VzIHx8ICF0aGlzLmRhdGEucHVsc2VzLmxlbmd0aCkgcmV0dXJuXG5cbiAgICB0aGlzLnNldFNsaWNlckRhdGEodGhpcy5kYXRhLnB1bHNlcywgdGhpcy5zbGljZXIpXG5cbiAgICB0aGlzLnJlZHJhd0hpbnRzQ2FudmFzKHpvb21UcmFuc2Zvcm0odGhpcy5sYWJlbENhbnZhc05vZGUpKVxuICB9XG5cbiAgc2V0U2xpY2VyRGF0YShwdWxzZXMsIHNsaWNlcikge1xuICAgIGNvbnN0IHNsaWNlID0gc2xpY2VHdWVzcyhwdWxzZXMsIHNsaWNlcilcbiAgICBjb25zdCB0aW1pbmdzID0gdGhpcy50aW1pbmdzTm9kZVxuICAgIGNvbnN0IG1lc3NhZ2VzID0gdGhpcy5tZXNzYWdlc05vZGVcbiAgICB0aGlzLmFuYWx5emVyLnByaW50KHRpbWluZ3MsIG1lc3NhZ2VzKVxuXG4gICAgaWYgKHNsaWNlLmhpbnRzKSB7XG4gICAgICB0aGlzLmRhdGEuaGludHMgPSBzbGljZS5oaW50c1xuICAgICAgdGhpcy5hbHRIaW50cyA9IHRoaXMuZ2V0QWx0SGludHMoc2xpY2UuaGludHMpXG4gICAgICB0aGlzLndvcmtlci5wb3N0TWVzc2FnZSh7XG4gICAgICAgIG1lc3NhZ2U6ICdzZXRBbHRIaW50cycsXG4gICAgICAgIGFsdEhpbnRzOiBKU09OLnN0cmluZ2lmeSh0aGlzLmFsdEhpbnRzKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBpZiAoc2xpY2UuYml0cykge1xuICAgICAgdGhpcy5kYXRhLmJpdHMgPSBzbGljZS5iaXRzXG5cbiAgICAgIGlmIChtZXNzYWdlcykge1xuICAgICAgICBtZXNzYWdlcy5pbm5lckhUTUwgKz0gYDxkaXY+Qml0czogPHN0cm9uZz4ke3NsaWNlLmJpdHMudG9IZXhTdHJpbmcoKX08L3N0cm9uZz48L2Rpdj5gXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0QWx0SGludHMoaGludHMpIHtcbiAgICBjb25zdCBhbHRIaW50cyA9IFtdXG4gICAgaWYgKGhpbnRzKSB7XG4gICAgICBsZXQgcHJldkhpbnRcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZCA9IGhpbnRzW2ldXG4gICAgICAgIGNvbnN0IHgwID0gZFswXVxuXG4gICAgICAgIGlmIChpID4gMCAmJiBwcmV2SGludFsxXSAhPT0geDApIHtcbiAgICAgICAgICBhbHRIaW50cy5wdXNoKFtwcmV2SGludFsxXSwgeDBdKVxuICAgICAgICB9XG5cbiAgICAgICAgcHJldkhpbnQgPSBkXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGFsdEhpbnRzXG4gIH1cblxuICBjcmVhdGVOb2RlKCkge1xuICAgIGNvbnN0IGZsaXBwZXJQbG90dGVyID0gc2VsZWN0KHRoaXMucGFyZW50KVxuICAgIHRoaXMuZmxpcHBlclBsb3R0ZXJOb2RlID0gZmxpcHBlclBsb3R0ZXIubm9kZSgpXG5cbiAgICB0aGlzLmF4aXNTdmcgPSBjcmVhdGUoJ3N2ZycpXG4gICAgY29uc3QgYXhpc1N2Z05vZGUgPSB0aGlzLmF4aXNTdmcubm9kZSgpXG5cbiAgICBjb25zdCB3cmFwcGVyID0gY3JlYXRlKCdkaXYnKS5hdHRyKFxuICAgICAgJ3N0eWxlJyxcbiAgICAgIHN0eWxlcy5yZWxhdGl2ZVBvc2l0aW9uICsgc3R5bGVzLmZ1bGxXaWR0aFxuICAgIClcbiAgICBjb25zdCB3cmFwcGVyTm9kZSA9IHdyYXBwZXIubm9kZSgpXG5cbiAgICBjb25zdCBsYWJlbENhbnZhcyA9IGNyZWF0ZSgnY2FudmFzJykuYXR0cihcbiAgICAgICdzdHlsZScsXG4gICAgICBzdHlsZXMuYWJzb2x1dGVUb3BMZWZ0ICsgc3R5bGVzLmZ1bGxXaWR0aFxuICAgIClcbiAgICB0aGlzLmxhYmVsQ2FudmFzTm9kZSA9IGxhYmVsQ2FudmFzLm5vZGUoKVxuXG4gICAgY29uc3QgaGludHNDYW52YXMgPSBjcmVhdGUoJ2NhbnZhcycpLmF0dHIoXG4gICAgICAnc3R5bGUnLFxuICAgICAgc3R5bGVzLmFic29sdXRlVG9wTGVmdCArIHN0eWxlcy5mdWxsV2lkdGhcbiAgICApXG4gICAgdGhpcy5oaW50c0NhbnZhc05vZGUgPSBoaW50c0NhbnZhcy5ub2RlKClcblxuICAgIGNvbnN0IHB1bHNlc0NhbnZhcyA9IGNyZWF0ZSgnY2FudmFzJykuYXR0cignc3R5bGUnLCBzdHlsZXMuZnVsbFdpZHRoKVxuICAgIHRoaXMucHVsc2VzQ2FudmFzTm9kZSA9IHB1bHNlc0NhbnZhcy5ub2RlKClcblxuICAgIGxldCB0aW1pbmdzRGl2XG4gICAgaWYgKHRoaXMudGltaW5ncykge1xuICAgICAgdGltaW5nc0RpdiA9IHNlbGVjdCh0aGlzLnRpbWluZ3MpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRpbWluZ3NEaXYgPSBjcmVhdGUoJ2RpdicpXG4gICAgfVxuICAgIHRoaXMudGltaW5nc05vZGUgPSB0aW1pbmdzRGl2Lm5vZGUoKVxuXG4gICAgbGV0IG1lc3NhZ2VzRGl2XG4gICAgaWYgKHRoaXMubWVzc2FnZXMpIHtcbiAgICAgIG1lc3NhZ2VzRGl2ID0gc2VsZWN0KHRoaXMubWVzc2FnZXMpXG4gICAgfSBlbHNlIHtcbiAgICAgIG1lc3NhZ2VzRGl2ID0gY3JlYXRlKCdkaXYnKVxuICAgIH1cbiAgICB0aGlzLm1lc3NhZ2VzTm9kZSA9IG1lc3NhZ2VzRGl2Lm5vZGUoKVxuXG4gICAgdGhpcy5mbGlwcGVyUGxvdHRlck5vZGUuYXBwZW5kKGF4aXNTdmdOb2RlKVxuICAgIHdyYXBwZXJOb2RlLmFwcGVuZCh0aGlzLmhpbnRzQ2FudmFzTm9kZSlcbiAgICB3cmFwcGVyTm9kZS5hcHBlbmQodGhpcy5sYWJlbENhbnZhc05vZGUpXG4gICAgd3JhcHBlck5vZGUuYXBwZW5kKHRoaXMucHVsc2VzQ2FudmFzTm9kZSlcbiAgICB0aGlzLmZsaXBwZXJQbG90dGVyTm9kZS5hcHBlbmQod3JhcHBlck5vZGUpXG5cbiAgICBpZiAoIXRoaXMudGltaW5ncykge1xuICAgICAgdGhpcy5mbGlwcGVyUGxvdHRlck5vZGUuYXBwZW5kKHRoaXMudGltaW5nc05vZGUpXG4gICAgfVxuICAgIGlmICghdGhpcy5tZXNzYWdlcykge1xuICAgICAgdGhpcy5mbGlwcGVyUGxvdHRlck5vZGUuYXBwZW5kKHRoaXMubWVzc2FnZXNOb2RlKVxuICAgIH1cbiAgfVxuXG4gIGluaXRpYWxDYW52YXMoKSB7XG4gICAgdGhpcy53aWR0aCA9IHRoaXMucHVsc2VzQ2FudmFzTm9kZS5jbGllbnRXaWR0aFxuICAgIHRoaXMuaGVpZ2h0ID0gZGVmYXVsdHMuaGVpZ2h0XG5cbiAgICB0aGlzLndvcmtlci5wb3N0TWVzc2FnZSh7XG4gICAgICBtZXNzYWdlOiAnc2V0Q29uZmlnQ29udGV4dCcsXG4gICAgICB3aWR0aDogdGhpcy53aWR0aCxcbiAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQsXG4gICAgICBkcGk6IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvXG4gICAgfSlcblxuICAgIHRoaXMucHVsc2VzT2Zmc2NyZWVuID0gdGhpcy5wdWxzZXNDYW52YXNOb2RlLnRyYW5zZmVyQ29udHJvbFRvT2Zmc2NyZWVuKClcbiAgICB0aGlzLndvcmtlci5wb3N0TWVzc2FnZShcbiAgICAgIHsgbWVzc2FnZTogJ2dldENvbnRleHQnLCBjYW52YXM6IHRoaXMucHVsc2VzT2Zmc2NyZWVuIH0sXG4gICAgICBbdGhpcy5wdWxzZXNPZmZzY3JlZW5dXG4gICAgKVxuXG4gICAgdGhpcy5sYWJlbE9mZnNjcmVlbiA9IHRoaXMubGFiZWxDYW52YXNOb2RlLnRyYW5zZmVyQ29udHJvbFRvT2Zmc2NyZWVuKClcbiAgICB0aGlzLndvcmtlci5wb3N0TWVzc2FnZShcbiAgICAgIHsgbWVzc2FnZTogJ2dldExhYmVsQ29udGV4dCcsIGNhbnZhczogdGhpcy5sYWJlbE9mZnNjcmVlbiB9LFxuICAgICAgW3RoaXMubGFiZWxPZmZzY3JlZW5dXG4gICAgKVxuXG4gICAgdGhpcy5oaW50c09mZnNjcmVlbiA9IHRoaXMuaGludHNDYW52YXNOb2RlLnRyYW5zZmVyQ29udHJvbFRvT2Zmc2NyZWVuKClcbiAgICB0aGlzLndvcmtlci5wb3N0TWVzc2FnZShcbiAgICAgIHsgbWVzc2FnZTogJ2dldEhpbnRzQ29udGV4dCcsIGNhbnZhczogdGhpcy5oaW50c09mZnNjcmVlbiB9LFxuICAgICAgW3RoaXMuaGludHNPZmZzY3JlZW5dXG4gICAgKVxuICB9XG5cbiAgcHJvY2Vzc0RhdGEoZGF0YSkge1xuICAgIGxldCB3aWR0aCA9IDBcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuZGF0YS5wdWxzZXMubGVuZ3RoOyArK2opIHtcbiAgICAgIHdpZHRoICs9IHRoaXMuZGF0YS5wdWxzZXNbal1cbiAgICB9XG4gICAgdGhpcy5kYXRhLndpZHRoID0gd2lkdGhcblxuICAgIHRoaXMuZGF0YS5oaW50cyA9IFtdXG4gICAgdGhpcy5hbHRIaW50cyA9IFtdXG5cbiAgICBpZiAoIXRoaXMuc2xpY2VyKSB7XG4gICAgICB0aGlzLmFuYWx5emVyID0gbmV3IEFuYWx5emVyKGRhdGEucHVsc2VzKVxuICAgICAgdGhpcy5ndWVzcyA9IHRoaXMuYW5hbHl6ZXIuZ3Vlc3MoKVxuICAgICAgdGhpcy5zbGljZXIgPSB0aGlzLmd1ZXNzXG4gICAgfVxuXG4gICAgdGhpcy5zZXRTbGljZXJEYXRhKGRhdGEucHVsc2VzLCB0aGlzLnNsaWNlcilcblxuICAgIHRoaXMud29ya2VyLnBvc3RNZXNzYWdlKHtcbiAgICAgIG1lc3NhZ2U6ICdzZXREYXRhJyxcbiAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YSlcbiAgICB9KVxuICB9XG5cbiAgem9vbWVkKHRyYW5zZm9ybSkge1xuICAgIGlmICh0cmFuc2Zvcm0ueCA+IDApIHRyYW5zZm9ybS54ID0gMFxuICAgIGlmICh0cmFuc2Zvcm0ueCArIHRoaXMud2lkdGggKiB0cmFuc2Zvcm0uayA8IHRoaXMud2lkdGgpIHtcbiAgICAgIHRyYW5zZm9ybS54ID0gdGhpcy53aWR0aCAtIHRoaXMud2lkdGggKiB0cmFuc2Zvcm0ua1xuICAgIH1cblxuICAgIHRoaXMueFNjYWxlID0gdHJhbnNmb3JtLnJlc2NhbGVYKHRoaXMueFNjYWxlQ29weSlcblxuICAgIGNvbnN0IGN1cnJlbnRSYW5nZSA9IGF1dG9yYW5nZSh0aGlzLmRhdGEud2lkdGggLyB0cmFuc2Zvcm0uaylcbiAgICBjb25zdCBjdXJyZW50VGltZVJhbmdlID0gYXV0b3JhbmdlX3RpbWUodGhpcy5kYXRhLndpZHRoIC8gMWU2IC8gdHJhbnNmb3JtLmspXG5cbiAgICB0aGlzLmF4aXNTdmcuc2VsZWN0KCcueC1heGlzJykuY2FsbChcbiAgICAgIGF4aXNUb3AodGhpcy54U2NhbGUpXG4gICAgICAgIC50aWNrcyh0aGlzLndpZHRoIC8gMTAwKVxuICAgICAgICAudGlja0Zvcm1hdChcbiAgICAgICAgICAoeCkgPT5cbiAgICAgICAgICAgICh4IC8gY3VycmVudFJhbmdlLnNjYWxlKS50b0ZpeGVkKDIpLnJlcGxhY2UoL1suLF0wMCQvLCAnJykgK1xuICAgICAgICAgICAgYCR7Y3VycmVudFRpbWVSYW5nZS5wcmVmaXh9YFxuICAgICAgICApXG4gICAgKVxuXG4gICAgdGhpcy53b3JrZXIucG9zdE1lc3NhZ2UoeyBtZXNzYWdlOiAnem9vbWVkJywgdHJhbnNmb3JtIH0pXG4gIH1cblxuICByZWRyYXdIaW50c0NhbnZhcyh0cmFuc2Zvcm0pIHtcbiAgICB0aGlzLndvcmtlci5wb3N0TWVzc2FnZSh7IG1lc3NhZ2U6ICdyZWRyYXdIaW50c0NhbnZhcycsIHRyYW5zZm9ybSB9KVxuICB9XG5cbiAgZHJhd0NhbnZhcygpIHtcbiAgICB0aGlzLm1hcmdpbiA9IGRlZmF1bHRzLm1hcmdpblxuXG4gICAgdGhpcy5iYXJIZWlnaHQgPSB0aGlzLmhlaWdodCAtIHRoaXMubWFyZ2luLnRvcCAtIHRoaXMubWFyZ2luLmJvdHRvbVxuICAgIHRoaXMud29ya2VyLnBvc3RNZXNzYWdlKHtcbiAgICAgIG1lc3NhZ2U6ICdzZXRCYXJIZWlnaHQnLFxuICAgICAgYmFySGVpZ2h0OiB0aGlzLmJhckhlaWdodFxuICAgIH0pXG5cbiAgICBjb25zdCBtaW5ab29tID0gMVxuICAgIGNvbnN0IG1heFpvb20gPSB0aGlzLmRhdGEud2lkdGggLyB0aGlzLndpZHRoXG4gICAgdGhpcy53b3JrZXIucG9zdE1lc3NhZ2UoeyBtZXNzYWdlOiAnc2V0TWF4Wm9vbScsIG1heFpvb20gfSlcblxuICAgIHRoaXMueFNjYWxlID0gc2NhbGVMaW5lYXIoKVxuICAgICAgLnJhbmdlKFswLCB0aGlzLndpZHRoXSlcbiAgICAgIC5kb21haW4oWzAsIHRoaXMuZGF0YS53aWR0aF0pXG5cbiAgICB0aGlzLnhTY2FsZUNvcHkgPSB0aGlzLnhTY2FsZS5jb3B5KClcblxuICAgIGNvbnN0IHhBeGlzID0gYXhpc1RvcCh0aGlzLnhTY2FsZSlcbiAgICAgIC50aWNrcyh0aGlzLndpZHRoIC8gMTAwKVxuICAgICAgLnRpY2tGb3JtYXQoKHgpID0+IGAoJHt4LnRvRml4ZWQoMSl9KWApXG5cbiAgICBzZWxlY3QodGhpcy5wdWxzZXNDYW52YXNOb2RlKVxuICAgICAgLmF0dHIoJ3dpZHRoJywgdGhpcy53aWR0aClcbiAgICAgIC5hdHRyKCdoZWlnaHQnLCB0aGlzLmhlaWdodClcbiAgICAgIC5jYWxsKFxuICAgICAgICB6b29tKClcbiAgICAgICAgICAuc2NhbGVFeHRlbnQoW21pblpvb20sIG1heFpvb21dKVxuICAgICAgICAgIC5vbignem9vbScsICh7IHRyYW5zZm9ybSB9KSA9PiB0aGlzLnpvb21lZCh0cmFuc2Zvcm0pKVxuICAgICAgKVxuXG4gICAgY29uc3QgbGFiZWzQoWFudmFzID0gc2VsZWN0KHRoaXMubGFiZWxDYW52YXNOb2RlKVxuICAgICAgLmF0dHIoJ3dpZHRoJywgdGhpcy53aWR0aClcbiAgICAgIC5hdHRyKCdoZWlnaHQnLCB0aGlzLmhlaWdodClcbiAgICAgIC5zdHlsZSgnY3Vyc29yJywgJ2dyYWInKVxuICAgICAgLmNhbGwoXG4gICAgICAgIHpvb20oKVxuICAgICAgICAgIC5zY2FsZUV4dGVudChbbWluWm9vbSwgbWF4Wm9vbV0pXG4gICAgICAgICAgLm9uKCdzdGFydCcsICgpID0+IHtcbiAgICAgICAgICAgIGxhYmVs0KFhbnZhcy5zdHlsZSgnY3Vyc29yJywgJ2dyYWJiaW5nJylcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5vbignem9vbScsIChlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZS5zb3VyY2VFdmVudC50eXBlID09PSAnd2hlZWwnKSB7XG4gICAgICAgICAgICAgIGxhYmVs0KFhbnZhcy5zdHlsZSgnY3Vyc29yJywgJ25zLXJlc2l6ZScpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnpvb21lZChlLnRyYW5zZm9ybSlcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5vbignZW5kJywgKCkgPT4ge1xuICAgICAgICAgICAgbGFiZWzQoWFudmFzLnN0eWxlKCdjdXJzb3InLCAnZ3JhYicpXG4gICAgICAgICAgfSlcbiAgICAgIClcblxuICAgIGNvbnN0IGF4aXNIZWlnaHQgPSAxOFxuICAgIHRoaXMuYXhpc1N2Z1xuICAgICAgLmF0dHIoJ3ZpZWJveCcsIFswLCAwLCB0aGlzLndpZHRoLCBheGlzSGVpZ2h0XSlcbiAgICAgIC5hdHRyKCd3aWR0aCcsIHRoaXMud2lkdGgpXG4gICAgICAuYXR0cignaGVpZ2h0JywgYXhpc0hlaWdodClcbiAgICB0aGlzLmF4aXNTdmcuYXBwZW5kKCdnJykuY2xhc3NlZCgneC1heGlzJywgdHJ1ZSkuY2FsbCh4QXhpcylcblxuICAgIHNlbGVjdCgnLngtYXhpcycpLmF0dHIoJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUoJHtbMCwgYXhpc0hlaWdodF19KWApXG5cbiAgICB0aGlzLnpvb21lZCh6b29tSWRlbnRpdHkpXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMud29ya2VyLnRlcm1pbmF0ZSgpXG4gICAgdGhpcy5mbGlwcGVyUGxvdHRlck5vZGUuaW5uZXJIVE1MID0gJydcbiAgfVxufVxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwiZmxpcHBlclBsb3R0ZXJcIiBjbGFzcz1cImZ1bGwtd2lkdGggcS1tYi1tZFwiIC8+XG4gIDxkaXYgY2xhc3M9XCJmdWxsLXdpZHRoXCI+XG4gICAgPGRpdiBjbGFzcz1cInJvdyBxLWNvbC1ndXR0ZXItbWQgcS1tYi1tZFwiPlxuICAgICAgPHEtc2VsZWN0XG4gICAgICAgIGNsYXNzPVwiY29sLTFcIlxuICAgICAgICB2LW1vZGVsPVwiY3VycmVudFNsaWNlci5tb2R1bGF0aW9uXCJcbiAgICAgICAgOm9wdGlvbnM9XCJzbGljZXJPcHRpb25zXCJcbiAgICAgICAgb3B0aW9uLXZhbHVlPVwidmFsdWVcIlxuICAgICAgICBvcHRpb24tbGFiZWw9XCJ0ZXh0XCJcbiAgICAgICAgZW1pdC12YWx1ZVxuICAgICAgICBsYWJlbD1cIlNsaWNlclwiXG4gICAgICAvPlxuICAgICAgPHEtaW5wdXRcbiAgICAgICAgY2xhc3M9XCJjb2wtMVwiXG4gICAgICAgIHYtbW9kZWwubnVtYmVyLnRyaW09XCJjdXJyZW50U2xpY2VyLnNob3J0XCJcbiAgICAgICAgQGtleXByZXNzPVwidXNlTnVtYmVyc09ubHlcIlxuICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgIGxhYmVsPVwiU2hvcnRcIlxuICAgICAgLz5cbiAgICAgIDxxLWlucHV0XG4gICAgICAgIGNsYXNzPVwiY29sLTFcIlxuICAgICAgICB2LW1vZGVsLm51bWJlci50cmltPVwiY3VycmVudFNsaWNlci5sb25nXCJcbiAgICAgICAgQGtleXByZXNzPVwidXNlTnVtYmVyc09ubHlcIlxuICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgIGxhYmVsPVwiTG9uZ1wiXG4gICAgICAvPlxuICAgICAgPHEtaW5wdXRcbiAgICAgICAgY2xhc3M9XCJjb2wtMVwiXG4gICAgICAgIHYtbW9kZWwubnVtYmVyLnRyaW09XCJjdXJyZW50U2xpY2VyLnN5bmNcIlxuICAgICAgICBAa2V5cHJlc3M9XCJ1c2VOdW1iZXJzT25seVwiXG4gICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgbGFiZWw9XCJTeW5jXCJcbiAgICAgIC8+XG4gICAgICA8cS1pbnB1dFxuICAgICAgICBjbGFzcz1cImNvbC0xXCJcbiAgICAgICAgdi1tb2RlbC5udW1iZXIudHJpbT1cImN1cnJlbnRTbGljZXIuZ2FwXCJcbiAgICAgICAgQGtleXByZXNzPVwidXNlTnVtYmVyc09ubHlcIlxuICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgIGxhYmVsPVwiR2FwXCJcbiAgICAgIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29sLTIgZmxleFwiPlxuICAgICAgICA8cS1idG5cbiAgICAgICAgICBjb2xvcj1cInByaW1hcnlcIlxuICAgICAgICAgIGljb249XCJjb250ZW50X2N1dFwiXG4gICAgICAgICAgbGFiZWw9XCJTbGljZVwiXG4gICAgICAgICAgc2l6ZT1cIm1kXCJcbiAgICAgICAgICB1bmVsZXZhdGVkXG4gICAgICAgICAgQGNsaWNrPVwib25TbGljZVwiXG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiY29sdW1uXCI+XG4gICAgICA8ZGl2IHJlZj1cInRpbWluZ3NcIiBjbGFzcz1cInEtbWItbWRcIiAvPlxuICAgICAgPGRpdiByZWY9XCJiaXRzXCIgLz5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHsgb25Nb3VudGVkLCByZWYsIHdhdGNoLCBvbkJlZm9yZVVubW91bnQgfSBmcm9tICd2dWUnXG5pbXBvcnQgeyBQdWxzZVBsb3R0ZXJMaWIgfSBmcm9tICdlbnRpdHkvUHVsc2VQbG90dGVyJ1xuY29uc3QgeyBGbGlwcGVyUGxvdHRlciwgRmxpcHBlclBsb3R0ZXJPZmZzY3JlZW4gfSA9IFB1bHNlUGxvdHRlckxpYlxuaW1wb3J0IHsgdXNlTnVtYmVyc09ubHkgfSBmcm9tICdzaGFyZWQvbGliL3V0aWxzL3VzZU51bWJlck9ubHknXG5cbmNvbnN0IHByb3BzID0gZGVmaW5lUHJvcHMoWydkYXRhJywgJ29mZnNjcmVlbiddKVxuY29uc3QgdGltaW5ncyA9IHJlZihudWxsKVxuY29uc3QgYml0cyA9IHJlZihudWxsKVxuXG5jb25zdCBwbG90ID0gcmVmPFxuICBQdWxzZVBsb3R0ZXJMaWIuRmxpcHBlclBsb3R0ZXIgfCBQdWxzZVBsb3R0ZXJMaWIuRmxpcHBlclBsb3R0ZXJPZmZzY3JlZW5cbj4oKVxuY29uc3Qgc2xpY2VyT3B0aW9ucyA9IHJlZjx0eXBlb2YgUHVsc2VQbG90dGVyTGliLkNvbnN0YW50cy5zbGljZXJPcHRpb25zPigpXG5jb25zdCBjdXJyZW50U2xpY2VyID0gcmVmKHtcbiAgbW9kdWxhdGlvbjogJycsXG4gIHNob3J0OiAwLFxuICBsb25nOiAwLFxuICBzeW5jOiAwLFxuICBnYXA6IDBcbn0pXG5cbmNvbnN0IG9uU2xpY2UgPSAoKSA9PiB7XG4gIHBsb3QudmFsdWU/LnNldFNsaWNlcihjdXJyZW50U2xpY2VyLnZhbHVlKVxufVxuXG5jb25zdCBkcmF3ID0gKCkgPT4ge1xuICBjb25zdCBjb25maWcgPSB7XG4gICAgZGF0YTogcHJvcHMuZGF0YSxcbiAgICB0aW1pbmdzOiB0aW1pbmdzLnZhbHVlLFxuICAgIG1lc3NhZ2VzOiBiaXRzLnZhbHVlXG4gIH1cblxuICBpZiAocHJvcHMub2Zmc2NyZWVuKSB7XG4gICAgcGxvdC52YWx1ZSA9IG5ldyBGbGlwcGVyUGxvdHRlck9mZnNjcmVlbihjb25maWcpXG4gIH0gZWxzZSB7XG4gICAgcGxvdC52YWx1ZSA9IG5ldyBGbGlwcGVyUGxvdHRlcihjb25maWcpXG4gIH1cblxuICBzbGljZXJPcHRpb25zLnZhbHVlID0gcGxvdC52YWx1ZS5zbGljZXJPcHRpb25zXG4gIGN1cnJlbnRTbGljZXIudmFsdWUgPSBwbG90LnZhbHVlLnNsaWNlclxufVxuXG5vbk1vdW50ZWQoKCkgPT4ge1xuICBkcmF3KClcbn0pXG5cbndhdGNoKFxuICAoKSA9PiBwcm9wcy5kYXRhLFxuICAoKSA9PiB7XG4gICAgcGxvdC52YWx1ZT8uZGVzdHJveSgpXG4gICAgZHJhdygpXG4gIH1cbilcblxub25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgcGxvdC52YWx1ZT8uZGVzdHJveSgpXG59KVxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJjb2x1bW4gaXRlbXMtc3RhcnRcIj5cbiAgICA8cS1maWxlXG4gICAgICBvdXRsaW5lZFxuICAgICAgdi1tb2RlbD1cInVwbG9hZGVkRmlsZVwiXG4gICAgICBsYWJlbD1cIkRyb3Agb3Igc2VsZWN0IGZpbGVcIlxuICAgICAgY2xhc3M9XCJxLXB5LW1kXCJcbiAgICAgIHN0eWxlPVwibWluLXdpZHRoOiAyMDBweFwiXG4gICAgPlxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDpwcmVwZW5kPlxuICAgICAgICA8cS1pY29uIG5hbWU9XCJmaWxlX3VwbG9hZFwiPjwvcS1pY29uPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICA8L3EtZmlsZT5cblxuICAgIDxxLXNlbGVjdFxuICAgICAgdi1pZj1cImN1cnJlbnRTaWduYWxcIlxuICAgICAgY2xhc3M9XCJxLW1iLW1kXCJcbiAgICAgIHYtbW9kZWw9XCJjdXJyZW50U2lnbmFsXCJcbiAgICAgIDpvcHRpb25zPVwic2lnbmFsT3B0aW9uc1wiXG4gICAgICBvcHRpb24tbGFiZWw9XCJuYW1lXCJcbiAgICAgIGxhYmVsPVwiU2VsZWN0IHNpZ25hbFwiXG4gICAgICBzdHlsZT1cIm1pbi13aWR0aDogMjAwcHhcIlxuICAgIC8+XG5cbiAgICA8UHVsc2VQbG90dGVyXG4gICAgICB2LWlmPVwic2hvd1Bsb3R0ZXJcIlxuICAgICAgOmRhdGE9XCJkYXRhXCJcbiAgICAgIDpvZmZzY3JlZW49XCJmbGFncy5vZmZzY3JlZW5DYW52YXNTdXBwb3J0ZWRcIlxuICAgIC8+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCB7IGNvbXB1dGVkLCBvbk1vdW50ZWQsIHJlZiwgd2F0Y2ggfSBmcm9tICd2dWUnXG5pbXBvcnQgeyBQdWxzZVBsb3R0ZXIgfSBmcm9tICdmZWF0dXJlcy9QdWxzZVBsb3R0ZXIvUGxvdHRlcidcbmltcG9ydCB7IE5vdGlmeSB9IGZyb20gJ3F1YXNhcidcblxuaW1wb3J0IHsgRmxpcHBlck1vZGVsIH0gZnJvbSAnZW50aXR5L0ZsaXBwZXInXG5jb25zdCBmbGlwcGVyU3RvcmUgPSBGbGlwcGVyTW9kZWwudXNlRmxpcHBlclN0b3JlKClcblxuY29uc3QgZmlsZVRvUGFzcyA9IGNvbXB1dGVkKCgpID0+IGZsaXBwZXJTdG9yZS5maWxlVG9QYXNzKVxuXG5jb25zdCBmbGFncyA9IHJlZih7XG4gIG9mZnNjcmVlbkNhbnZhc1N1cHBvcnRlZDogdHJ1ZSxcbiAgZHJhZ2dpbmc6IGZhbHNlXG59KVxuXG5jb25zdCBmaWxldHlwZSA9IHJlZjxzdHJpbmc+KClcbmNvbnN0IHNob3dQbG90dGVyID0gcmVmKGZhbHNlKVxuXG50eXBlIERhdGEgPSB7XG4gIGNlbnRlcmZyZXFfSHo6IG51bWJlclxuICBwdWxzZXM6IG51bWJlcltdXG59XG5jb25zdCBkYXRhID0gcmVmPERhdGE+KClcblxuY29uc3Qgbm90aWZ5Rm9yV3JvbmdGaWxlID0gKCkgPT4ge1xuICBOb3RpZnkuY3JlYXRlKHtcbiAgICB0eXBlOiAnbmVnYXRpdmUnLFxuICAgIG1lc3NhZ2U6XG4gICAgICAnV3JvbmcgZmlsZSB0eXBlLiBPbmx5IDxiPlN1YkdoeiBSQVc8L2I+LCA8Yj5SRklEIFJBVzwvYj4gYW5kIDxiPkluZnJhcmVkIHNpZ25hbHM8L2I+IGZpbGVzIGFyZSBhY2NlcHRlZC4nLFxuICAgIGh0bWw6IHRydWVcbiAgfSlcbn1cblxuY29uc3Qgc3dpdGNoRmlsZXR5cGUgPSBhc3luYyAoXG4gIHtcbiAgICBmaWxlLFxuICAgIGlzQnVmZmVyXG4gIH06IHtcbiAgICBmaWxlPzogRmlsZSB8IFVpbnQ4QXJyYXlcbiAgICBpc0J1ZmZlcj86IGJvb2xlYW5cbiAgfSA9IHtcbiAgICBpc0J1ZmZlcjogZmFsc2VcbiAgfVxuKSA9PiB7XG4gIGlmICghZmlsZSkge1xuICAgIHJldHVyblxuICB9XG5cbiAgbGV0IGJ1ZmZlcjogQXJyYXlCdWZmZXIgfCBVaW50OEFycmF5XG4gIGlmIChpc0J1ZmZlcikge1xuICAgIGJ1ZmZlciA9IGZpbGUgYXMgVWludDhBcnJheVxuICB9IGVsc2UgaWYgKGZpbGUgaW5zdGFuY2VvZiBGaWxlKSB7XG4gICAgYnVmZmVyID0gYXdhaXQgZmlsZS5hcnJheUJ1ZmZlcigpXG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCBmaWxlIHR5cGUnKVxuICB9XG4gIGNvbnN0IHRleHQgPSBuZXcgVGV4dERlY29kZXIoKS5kZWNvZGUoYnVmZmVyKS5zcGxpdCgvXFxyP1xcbi8pXG5cbiAgaWYgKHRleHRbMF0hLnN0YXJ0c1dpdGgoJ1JJRkwnKSkge1xuICAgIHJldHVybiBwcm9jZXNzUmZpZChuZXcgVWludDhBcnJheShidWZmZXIpKVxuICB9XG5cbiAgY29uc3QgZmlyc3RMaW5lID0gdGV4dFswXSEudHJpbSgpXG4gIGlmIChmaXJzdExpbmUuaW5jbHVkZXMoJ0ZsaXBwZXIgU3ViR2h6IFJBVyBGaWxlJykpIHtcbiAgICByZXR1cm4gcHJvY2Vzc1N1Ykdoeih0ZXh0KVxuICB9IGVsc2UgaWYgKGZpcnN0TGluZS5pbmNsdWRlcygnSVIgc2lnbmFscyBmaWxlJykpIHtcbiAgICByZXR1cm4gcHJvY2Vzc0lyKHRleHQpXG4gIH0gZWxzZSB7XG4gICAgbm90aWZ5Rm9yV3JvbmdGaWxlKClcbiAgfVxufVxuXG5jb25zdCBwcm9jZXNzU3ViR2h6ID0gKHRleHQ6IHN0cmluZ1tdKSA9PiB7XG4gIGZpbGV0eXBlLnZhbHVlID0gJ3N1YmdoeidcbiAgbGV0IGZyZXF1ZW5jeSxcbiAgICByYXdEYXRhOiBzdHJpbmcgfCBzdHJpbmdbXSB8IG51bWJlcltdID0gJydcbiAgZm9yIChjb25zdCBsaW5lIG9mIHRleHQpIHtcbiAgICBpZiAobGluZS5zdGFydHNXaXRoKCdGcmVxdWVuY3knKSkge1xuICAgICAgZnJlcXVlbmN5ID0gTnVtYmVyKGxpbmUuc3BsaXQoJyAnKVsxXSlcbiAgICB9IGVsc2UgaWYgKGxpbmUuc3RhcnRzV2l0aCgnUkFXX0RhdGEnKSkge1xuICAgICAgbGV0IHJhdyA9IGxpbmUucmVwbGFjZUFsbCgnUkFXX0RhdGE6ICcsICcgJylcbiAgICAgIGNvbnN0IGRldmlhdGlvbnMgPSByYXcubWF0Y2goLyhcXHNcXGQrXFxzXFxkKyl8KFxccy1cXGQrXFxzLVxcZCspL2cpXG4gICAgICBpZiAoZGV2aWF0aW9ucykge1xuICAgICAgICBmb3IgKGNvbnN0IG1hdGNoIG9mIGRldmlhdGlvbnMpIHtcbiAgICAgICAgICBjb25zdCBzID0gbWF0Y2gudHJpbSgpLnNwbGl0KCcgJylcbiAgICAgICAgICBpZiAoc1sxXSEuc3RhcnRzV2l0aCgnLScpKSB7XG4gICAgICAgICAgICBzLnNwbGljZSgxLCAwLCAnMScpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHMuc3BsaWNlKDEsIDAsICctMScpXG4gICAgICAgICAgfVxuICAgICAgICAgIHJhdyA9IHJhdy5yZXBsYWNlKG1hdGNoLCAnICcgKyBzLmpvaW4oJyAnKSlcbiAgICAgICAgICBjb25zb2xlLmxvZyhgRml4ZWQgZGV2aWF0aW9uOiR7bWF0Y2h9IC0+JHsnICcgKyBzLmpvaW4oJyAnKX1gKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByYXdEYXRhICs9IHJhd1xuICAgIH1cbiAgfVxuXG4gIHJhd0RhdGEgPSByYXdEYXRhLnRyaW0oKVxuXG4gIGlmIChyYXdEYXRhLnN0YXJ0c1dpdGgoJy0nKSkge1xuICAgIHJhd0RhdGEgPSAnMCAnICsgcmF3RGF0YVxuICB9XG4gIHJhd0RhdGEgPSByYXdEYXRhLnJlcGxhY2VBbGwoJy0nLCAnJykuc3BsaXQoJyAnKVxuICByYXdEYXRhID0gcmF3RGF0YS5tYXAoKGUpID0+IE51bWJlcihlKSlcblxuICBpZiAoZnJlcXVlbmN5KSB7XG4gICAgZGF0YS52YWx1ZSA9IHtcbiAgICAgIGNlbnRlcmZyZXFfSHo6IGZyZXF1ZW5jeSxcbiAgICAgIHB1bHNlczogcmF3RGF0YVxuICAgIH1cbiAgfVxuICBvblNob3dQbG90dGVyKClcbn1cblxuY29uc3QgdXBsb2FkZWRGaWxlID0gcmVmPEZpbGU+KClcbndhdGNoKFxuICAoKSA9PiB1cGxvYWRlZEZpbGUudmFsdWUsXG4gIChuZXdGaWxlKSA9PiB7XG4gICAgc2lnbmFsT3B0aW9ucy52YWx1ZSA9IFtdXG4gICAgY3VycmVudFNpZ25hbC52YWx1ZSA9IHVuZGVmaW5lZFxuICAgIHN3aXRjaEZpbGV0eXBlKHtcbiAgICAgIGZpbGU6IG5ld0ZpbGVcbiAgICB9KVxuICB9XG4pXG5cbnR5cGUgU2lnbmFsID0ge1xuICBuYW1lPzogc3RyaW5nXG4gIHR5cGU/OiBzdHJpbmdcbiAgZnJlcXVlbmN5PzogbnVtYmVyXG4gIGRhdGE/OiBzdHJpbmcgfCBzdHJpbmdbXSB8IG51bWJlcltdXG59XG5jb25zdCBzaWduYWxPcHRpb25zID0gcmVmPFNpZ25hbFtdPihbXSlcbmNvbnN0IGN1cnJlbnRTaWduYWwgPSByZWY8U2lnbmFsPigpXG53YXRjaChcbiAgKCkgPT4gY3VycmVudFNpZ25hbC52YWx1ZSxcbiAgKG5ld1NpZ25hbCkgPT4ge1xuICAgIGlmIChuZXdTaWduYWwpIHtcbiAgICAgIGlmIChuZXdTaWduYWwuZnJlcXVlbmN5ICYmIG5ld1NpZ25hbC5kYXRhPy5sZW5ndGgpIHtcbiAgICAgICAgZGF0YS52YWx1ZSA9IHtcbiAgICAgICAgICBjZW50ZXJmcmVxX0h6OiBuZXdTaWduYWwuZnJlcXVlbmN5LFxuICAgICAgICAgIHB1bHNlczogbmV3U2lnbmFsLmRhdGEgYXMgbnVtYmVyW11cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuKVxuXG5jb25zdCBwcm9jZXNzSXIgPSAodGV4dDogc3RyaW5nW10pID0+IHtcbiAgZmlsZXR5cGUudmFsdWUgPSAnaXInXG4gIGxldCBzaWduYWxzOiBTaWduYWxbXSA9IFtdLFxuICAgIGkgPSAtMVxuICBmb3IgKGNvbnN0IGxpbmUgb2YgdGV4dCkge1xuICAgIGlmIChsaW5lLnN0YXJ0c1dpdGgoJyMnKSkge1xuICAgICAgaSsrXG4gICAgICBzaWduYWxzW2ldID0ge31cbiAgICB9IGVsc2UgaWYgKGxpbmUuc3RhcnRzV2l0aCgnbmFtZScpKSB7XG4gICAgICBzaWduYWxzW2ldIS5uYW1lID0gbGluZS5zcGxpdCgnICcpWzFdXG4gICAgfSBlbHNlIGlmIChsaW5lLnN0YXJ0c1dpdGgoJ3R5cGUnKSkge1xuICAgICAgc2lnbmFsc1tpXSEudHlwZSA9IGxpbmUuc3BsaXQoJyAnKVsxXVxuICAgIH0gZWxzZSBpZiAobGluZS5zdGFydHNXaXRoKCdmcmVxdWVuY3knKSkge1xuICAgICAgc2lnbmFsc1tpXSEuZnJlcXVlbmN5ID0gTnVtYmVyKGxpbmUuc3BsaXQoJyAnKVsxXSlcbiAgICB9IGVsc2UgaWYgKGxpbmUuc3RhcnRzV2l0aCgnZGF0YScpKSB7XG4gICAgICBzaWduYWxzW2ldIS5kYXRhID0gbGluZS5zcGxpdCgnOiAnKVsxXVxuICAgIH1cbiAgfVxuXG4gIHNpZ25hbHMgPSBzaWduYWxzLmZpbHRlcigoZSkgPT4gZS50eXBlID09PSAncmF3JylcbiAgaWYgKHNpZ25hbHMubGVuZ3RoID09PSAwKSB7XG4gICAgbm90aWZ5Rm9yV3JvbmdGaWxlKClcbiAgICByZXR1cm5cbiAgfVxuXG4gIGZvciAoY29uc3Qgc2lnbmFsIG9mIHNpZ25hbHMpIHtcbiAgICBzaWduYWwuZGF0YSA9IChzaWduYWwuZGF0YSBhcyBzdHJpbmcpLnNwbGl0KCcgJylcbiAgICBzaWduYWwuZGF0YSA9IHNpZ25hbC5kYXRhLm1hcCgoZSkgPT4gTnVtYmVyKGUpKVxuICB9XG5cbiAgc2lnbmFsT3B0aW9ucy52YWx1ZSA9IHNpZ25hbHNcbiAgY3VycmVudFNpZ25hbC52YWx1ZSA9IHNpZ25hbHNbMF1cblxuICBvblNob3dQbG90dGVyKClcbn1cblxudHlwZSBIZWFkZXIgPSB7XG4gIG1hZ2ljOiBudW1iZXJcbiAgdmVyc2lvbjogbnVtYmVyXG4gIGZyZXF1ZW5jeTogbnVtYmVyXG4gIGR1dHlDeWNsZTogbnVtYmVyXG4gIG1heEJ1ZmZlclNpemU6IG51bWJlclxufVxuY29uc3QgcHJvY2Vzc1JmaWQgPSAocmF3RGF0YTogVWludDhBcnJheSkgPT4ge1xuICBmaWxldHlwZS52YWx1ZSA9ICdyZmlkJ1xuXG4gIGNvbnN0IHNsaWNlVmlldyA9IChmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIpID0+IHtcbiAgICBjb25zdCB2aWV3ID0gbmV3IERhdGFWaWV3KG5ldyBBcnJheUJ1ZmZlcih0byAtIGZyb20pKVxuICAgIHJhd0RhdGFcbiAgICAgIC5zbGljZShmcm9tLCB0bylcbiAgICAgIC5yZXZlcnNlKClcbiAgICAgIC5mb3JFYWNoKChiLCBpKSA9PiB7XG4gICAgICAgIHZpZXcuc2V0VWludDgoaSwgYilcbiAgICAgIH0pXG4gICAgcmV0dXJuIHZpZXdcbiAgfVxuXG4gIGNvbnN0IGhlYWRlcjogSGVhZGVyID0ge1xuICAgIG1hZ2ljOiBzbGljZVZpZXcoMCwgNCkuZ2V0VWludDMyKDApLFxuICAgIHZlcnNpb246IHNsaWNlVmlldyg0LCA4KS5nZXRVaW50MzIoMCksXG4gICAgZnJlcXVlbmN5OiBzbGljZVZpZXcoOCwgMTIpLmdldEZsb2F0MzIoMCksXG4gICAgZHV0eUN5Y2xlOiBzbGljZVZpZXcoMTIsIDE2KS5nZXRGbG9hdDMyKDApLFxuICAgIG1heEJ1ZmZlclNpemU6IHNsaWNlVmlldygxNiwgMjApLmdldFVpbnQzMigwKVxuICB9XG5cbiAgY29uc3QgcmVhZFZhckludCA9IChidWZmZXI6IFVpbnQ4QXJyYXkpID0+IHtcbiAgICBsZXQgdmFsdWUgPSAwXG4gICAgbGV0IGxlbmd0aCA9IDBcbiAgICBsZXQgY3VycmVudEJ5dGVcblxuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBjdXJyZW50Qnl0ZSA9IGJ1ZmZlcltsZW5ndGhdXG4gICAgICB2YWx1ZSB8PSAoY3VycmVudEJ5dGUhICYgMHg3ZikgPDwgKGxlbmd0aCAqIDcpXG4gICAgICBsZW5ndGggKz0gMVxuICAgICAgaWYgKGxlbmd0aCA+IDUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdWYXJJbnQgZXhjZWVkcyBhbGxvd2VkIGJvdW5kcy4nKVxuICAgICAgfVxuICAgICAgaWYgKChjdXJyZW50Qnl0ZSEgJiAweDgwKSAhPT0gMHg4MCkgYnJlYWtcbiAgICB9XG4gICAgcmV0dXJuIHsgdmFsdWUsIGxlbmd0aCB9XG4gIH1cblxuICBsZXQgZGF0YU9mZnNldCA9IDIwLFxuICAgIGJ1ZmZlclNpemUgPSBzbGljZVZpZXcoZGF0YU9mZnNldCwgZGF0YU9mZnNldCArIDQpLmdldFVpbnQzMigwKVxuICBjb25zdCB2YXJpbnRzID0gW11cbiAgaWYgKGJ1ZmZlclNpemUgPiBoZWFkZXIubWF4QnVmZmVyU2l6ZSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBCdWZmZXIgc2l6ZSAoJHtidWZmZXJTaXplfSkgZXhjZWVkcyBtYXhfYnVmZmVyX3NpemUgKCR7aGVhZGVyLm1heEJ1ZmZlclNpemV9KWBcbiAgICApXG4gIH1cbiAgd2hpbGUgKHJhd0RhdGEubGVuZ3RoID4gZGF0YU9mZnNldCkge1xuICAgIGNvbnN0IGJ1ZmZlciA9IHJhd0RhdGEuc2xpY2UoZGF0YU9mZnNldCwgZGF0YU9mZnNldCArIGJ1ZmZlclNpemUpXG4gICAgbGV0IGJ1ZmZlck9mZnNldCA9IDRcbiAgICB3aGlsZSAoYnVmZmVyT2Zmc2V0IDwgYnVmZmVyLmxlbmd0aCkge1xuICAgICAgY29uc3QgdmFyaW50ID0gcmVhZFZhckludChidWZmZXIuc2xpY2UoYnVmZmVyT2Zmc2V0KSlcbiAgICAgIGJ1ZmZlck9mZnNldCArPSB2YXJpbnQubGVuZ3RoXG4gICAgICB2YXJpbnRzLnB1c2godmFyaW50LnZhbHVlKVxuICAgIH1cbiAgICBkYXRhT2Zmc2V0ICs9IGJ1ZmZlclNpemUgKyA0XG4gICAgYnVmZmVyU2l6ZSA9IHNsaWNlVmlldyhkYXRhT2Zmc2V0LCBkYXRhT2Zmc2V0ICsgNCkuZ2V0VWludDMyKDApXG4gIH1cblxuICBkYXRhLnZhbHVlID0ge1xuICAgIGNlbnRlcmZyZXFfSHo6IGhlYWRlci5mcmVxdWVuY3ksXG4gICAgcHVsc2VzOiB2YXJpbnRzXG4gIH1cbiAgb25TaG93UGxvdHRlcigpXG59XG5cbmNvbnN0IG9uU2hvd1Bsb3R0ZXIgPSAoKSA9PiB7XG4gIHNob3dQbG90dGVyLnZhbHVlID0gdHJ1ZVxufVxuXG5vbk1vdW50ZWQoKCkgPT4ge1xuICBpZiAoZmlsZVRvUGFzcy52YWx1ZSkge1xuICAgIHN3aXRjaEZpbGV0eXBlKHtcbiAgICAgIGZpbGU6IGZpbGVUb1Bhc3MudmFsdWUuZGF0YSBhcyBGaWxlIHwgVWludDhBcnJheSxcbiAgICAgIGlzQnVmZmVyOiB0cnVlXG4gICAgfSlcbiAgfVxuICBpZiAodHlwZW9mIE9mZnNjcmVlbkNhbnZhcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBmbGFncy52YWx1ZS5vZmZzY3JlZW5DYW52YXNTdXBwb3J0ZWQgPSB0cnVlXG4gIH0gZWxzZSB7XG4gICAgZmxhZ3MudmFsdWUub2Zmc2NyZWVuQ2FudmFzU3VwcG9ydGVkID0gZmFsc2VcbiAgfVxufSlcbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICA8R2VuZXJpY1BhZ2VMYXlvdXRcbiAgICB0aXRsZT1cIlB1bHNlIFBsb3R0ZXJcIlxuICAgIGljb249XCJmbGlwcGVyOnN1YnRvb2xzXCJcbiAgICBkZXNjcmlwdGlvbj1cIlJhdyBTdWItR0h6L0luZnJhcmVkL1JGSUQgcHVsc2UgcGxvdHRlclwiXG4gID5cbiAgICA8UHVsc2VQbG90dGVyIC8+XG5cbiAgICA8dGVtcGxhdGUgI2luZm8+XG4gICAgICA8aDYgY2xhc3M9XCJxLW10LW5vbmUgcS1tYi1zbVwiPkFib3V0IFB1bHNlIHBsb3R0ZXI8L2g2PlxuICAgICAgPHA+XG4gICAgICAgIFN1Yi1HSHovUkZJRC9JbmZyYXJlZCBzaWduYWwgcGxvdHRlciwgb3IgUHVsc2UgcGxvdHRlciBpbiBzaG9ydCwgaXMgYVxuICAgICAgICB0b29sIHRvIHZpc3VhbGl6ZSByYXcgc2lnbmFscyAoYWthIHB1bHNlcykgZnJvbSB2YXJpb3VzIHNvdXJjZXMuIEFzaWRlIGZyb21cbiAgICAgICAgdmlzdWFsaXppbmcgc2F2ZWQgc2lnbmFscywgaXQgY2FuIGFsc28gYmUgaGVscGZ1bCB0byBhbmFseXplIHJhd1xuICAgICAgICBjYXB0dXJlcy5cbiAgICAgIDwvcD5cbiAgICAgIDxwPlxuICAgICAgICBBY2NlcHRlZCBmaWxlIGZvcm1hdHMgYXJlOlxuICAgICAgICA8dWwgY2xhc3M9XCJxLW10LW5vbmUgcS1wbC1sZ1wiPlxuICAgICAgICAgIDxsaT5TdWItR0h6IFJBVyBjYXB0dXJlcyAoPGI+LnN1YjwvYj4pPC9saT5cbiAgICAgICAgICA8bGk+UkZJRCBSQVcgY2FwdHVyZXMgKDxiPi5yYXc8L2I+KTwvbGk+XG4gICAgICAgICAgPGxpPkluZnJhcmVkIHNpZ25hbC9yZW1vdGUgZmlsZXMgKDxiPi5pcjwvYj4pPC9saT5cbiAgICAgICAgICA8bGk+b3RoZXIgPGI+RmxpcHBlciBGaWxlIEZvcm1hdCBSQVc8L2I+LWNvbXBhdGlibGUgZmlsZXM8L2xpPlxuICAgICAgICA8L3VsPlxuICAgICAgPC9wPlxuICAgICAgPHA+QWZ0ZXIgcGFyc2luZyB0aGUgZmlsZSwgcGxvdHRlciB3aWxsIHRyeSB0byBndWVzcyBzaWduYWwgbW9kdWxhdGlvbi4gWW91IGNhbiBhbHNvIHVzZSB0aGUgc2xpY2VyIHRvIGZpZ3VyZSBpdCBvdXQgbWFudWFsbHkuPC9wPlxuICAgICAgPHAgY2xhc3M9XCJxLW1iLW5vbmVcIj5cbiAgICAgICAgPGEgaHJlZj1cImh0dHBzOi8vZG9jcy5mbGlwcGVyLm5ldC9zdWItZ2h6L3JlYWQtcmF3XCIgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgICA+UmVhZCBtb3JlIGFib3V0IGNhcHR1cmluZyBSQVcgc2lnbmFsczwvYVxuICAgICAgICA+XG4gICAgICAgIG9uIEZsaXBwZXIgRG9jc1xuICAgICAgPC9wPlxuICAgIDwvdGVtcGxhdGU+XG4gIDwvR2VuZXJpY1BhZ2VMYXlvdXQ+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHsgR2VuZXJpY1BhZ2VMYXlvdXQgfSBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9HZW5lcmljUGFnZUxheW91dCdcbmltcG9ydCB7IFB1bHNlUGxvdHRlciB9IGZyb20gJ3dpZGdldHMvUHVsc2VQbG90dGVyJ1xuPC9zY3JpcHQ+XG4iXSwibmFtZXMiOlsic2VsZWN0b3IiLCJ0cmFuc2Zvcm0iLCJjb2xvciIsIm0iLCJhc2NlbmRpbmciLCJ6ZXJvIiwiY2VudGVyIiwibnVtYmVyIiwic3RhcnQiLCJ0aWNrcyIsInRpY2tGb3JtYXQiLCJheGlzIiwiZm9ybWF0IiwiaWRlbnRpdHkiLCJzZWxlY3Rpb24iLCJwYXJzZVR5cGVuYW1lcyIsImdldCIsInNldCIsImNvcHkiLCJkb2N1bWVudCIsInNlbGVjdCIsIlNlbGVjdGlvbiIsImRhdHVtIiwiY29uc3RhbnQiLCJhdHRyUmVtb3ZlIiwiYXR0clJlbW92ZU5TIiwiYXR0ckNvbnN0YW50IiwiYXR0ckNvbnN0YW50TlMiLCJhdHRyRnVuY3Rpb24iLCJhdHRyRnVuY3Rpb25OUyIsInN0eWxlUmVtb3ZlIiwic3R5bGVDb25zdGFudCIsInN0eWxlRnVuY3Rpb24iLCJ0ZXh0Q29uc3RhbnQiLCJ0ZXh0RnVuY3Rpb24iLCJjcmVhdGUiLCJ3aW5kb3ciLCJzb3VyY2VFdmVudCIsInJvb3QiLCJub2V2ZW50IiwibGluZWFyIiwicmdiIiwiY29sb3JSZ2IiLCJ2YWx1ZSIsImkiLCJzdHJpbmciLCJ6b29tIiwidGltZW91dCIsIm5vdyIsImlkIiwic2NoZWR1bGUiLCJlbXB0eSIsImludGVycG9sYXRlIiwiaW50ZXJwb2xhdGVUcmFuc2Zvcm0iLCJjaGlsZHJlbiIsImluaGVyaXQiLCJzdHlsZSIsInJlbW92ZSIsImVhc2VDdWJpY0luT3V0IiwiZXhwb25lbnQiLCJsb2NhbGUiLCJmb3JtYXRQcmVmaXgiLCJiaXNlY3QiLCJpbnRlcnBvbGF0ZVZhbHVlIiwiZGlzcGF0Y2giLCJmaWx0ZXIiLCJleHRlbnQiLCJldmVudCIsImRyYWdFbmFibGUiLCJ6b29tVHJhbnNmb3JtIiwic2NhbGVMaW5lYXIiLCJ6b29tSWRlbnRpdHkiLCJGbGlwcGVyUGxvdHRlciIsIkZsaXBwZXJQbG90dGVyT2Zmc2NyZWVuIiwic2xpY2VyT3B0aW9ucyIsIl9ob2lzdGVkXzEiLCJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX2NyZWF0ZVZOb2RlIiwiRmxpcHBlck1vZGVsLnVzZUZsaXBwZXJTdG9yZSIsIl9vcGVuQmxvY2siLCJfY3JlYXRlRWxlbWVudEJsb2NrIiwiX3dpdGhDdHgiLCJfY3JlYXRlQmxvY2siLCJfY3JlYXRlQ29tbWVudFZOb2RlIiwiX2NyZWF0ZVRleHRWTm9kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBWUEsTUFBTSxhQUFhO0FBQUEsRUFDakIsRUFBRSxNQUFNLFNBQVMsT0FBTyxNQUFNLFFBQVEsSUFBRztBQUFBLEVBQ3pDLEVBQUUsTUFBTSxTQUFTLE9BQU8sTUFBTSxRQUFRLElBQUc7QUFBQSxFQUN6QyxFQUFFLE1BQU0sT0FBTyxPQUFPLE1BQU0sUUFBUSxJQUFHO0FBQUEsRUFDdkMsRUFBRSxNQUFNLFFBQVEsT0FBTyxNQUFNLFFBQVEsSUFBRztBQUFBLEVBQ3hDLEVBQUUsTUFBTSxRQUFRLE9BQU8sTUFBTSxRQUFRLElBQUc7QUFBQSxFQUN4QyxFQUFFLE1BQU0sUUFBUSxPQUFPLEtBQUssUUFBUSxJQUFHO0FBQUEsRUFDdkMsRUFBRSxNQUFNLFFBQVEsT0FBTyxLQUFLLFFBQVEsSUFBRztBQUFBLEVBQ3ZDLEVBQUUsTUFBTSxRQUFRLE9BQU8sS0FBSyxRQUFRLElBQUc7QUFBQSxFQUN2QyxFQUFFLE1BQU0sSUFBSSxPQUFPLEdBQUcsUUFBUSxHQUFFO0FBQUEsRUFDaEMsRUFBRSxNQUFNLFNBQVMsT0FBTyxNQUFNLFFBQVEsSUFBRztBQUFBLEVBQ3pDLEVBQUUsTUFBTSxTQUFTLE9BQU8sTUFBTSxRQUFRLElBQUc7QUFBQSxFQUN6QyxFQUFFLE1BQU0sUUFBUSxPQUFPLE1BQU0sUUFBUSxJQUFHO0FBQUEsRUFDeEMsRUFBRSxNQUFNLFFBQVEsT0FBTyxPQUFPLFFBQVEsSUFBRztBQUFBLEVBQ3pDLEVBQUUsTUFBTSxTQUFTLE9BQU8sT0FBTyxRQUFRLElBQUc7QUFBQSxFQUMxQyxF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QUFBLEVBQ1YsV0FBVztBQUFBLEVBQ1gsVUFBVTtBQUFBLEVBQ1YsV0FBVztBQUFBLEVBQ1gsYUFBYTtBQUFBLEVBQ2IsZ0JBQWdCO0FBQUEsRUFDaEIsWUFBWTtBQUFBLEVBQ1osWUFBWTtBQUFBLEVBQ1osU0FBUztBQUFBLEVBQ1QsWUFBWTtBQUFBLEVBQ1osY0FBYztBQUFBLEVBQ2QsZUFBZTtBQUFBLEVBQ2YsZUFBZTtBQUFBLEVBQ2YsZUFBZTtBQUFBLEVBQ2YsZUFBZTtBQUFBLEVBQ2YsWUFBWTtBQUFBLEVBQ1osVUFBVTtBQUFBLEVBQ1YsYUFBYTtBQUFBLEVBQ2IsU0FBUztBQUFBLEVBQ1QsU0FBUztBQUFBLEVBQ1QsWUFBWTtBQUFBLEVBQ1osV0FBVztBQUFBLEVBQ1gsYUFBYTtBQUFBLEVBQ2IsYUFBYTtBQUFBLEVBQ2IsU0FBUztBQUFBLEVBQ1QsV0FBVztBQUFBLEVBQ1gsWUFBWTtBQUFBLEVBQ1osTUFBTTtBQUFBLEVBQ04sV0FBVztBQUFBLEVBQ1gsTUFBTTtBQUFBLEVBQ04sT0FBTztBQUFBLEVBQ1AsYUFBYTtBQUFBLEVBQ2IsTUFBTTtBQUFBLEVBQ04sVUFBVTtBQUFBLEVBQ1YsU0FBUztBQUFBLEVBQ1QsV0FBVztBQUFBLEVBQ1gsUUFBUTtBQUFBLEVBQ1IsT0FBTztBQUFBLEVBQ1AsT0FBTztBQUFBLEVBQ1AsVUFBVTtBQUFBLEVBQ1YsZUFBZTtBQUFBLEVBQ2YsV0FBVztBQUFBLEVBQ1gsY0FBYztBQUFBLEVBQ2QsV0FBVztBQUFBLEVBQ1gsWUFBWTtBQUFBLEVBQ1osV0FBVztBQUFBLEVBQ1gsc0JBQXNCO0FBQUEsRUFDdEIsV0FBVztBQUFBLEVBQ1gsWUFBWTtBQUFBLEVBQ1osV0FBVztBQUFBLEVBQ1gsV0FBVztBQUFBLEVBQ1gsYUFBYTtBQUFBLEVBQ2IsZUFBZTtBQUFBLEVBQ2YsY0FBYztBQUFBLEVBQ2QsZ0JBQWdCO0FBQUEsRUFDaEIsZ0JBQWdCO0FBQUEsRUFDaEIsZ0JBQWdCO0FBQUEsRUFDaEIsYUFBYTtBQUFBLEVBQ2IsTUFBTTtBQUFBLEVBQ04sV0FBVztBQUFBLEVBQ1gsT0FBTztBQUFBLEVBQ1AsU0FBUztBQUFBLEVBQ1QsUUFBUTtBQUFBLEVBQ1Isa0JBQWtCO0FBQUEsRUFDbEIsWUFBWTtBQUFBLEVBQ1osY0FBYztBQUFBLEVBQ2QsY0FBYztBQUFBLEVBQ2QsZ0JBQWdCO0FBQUEsRUFDaEIsaUJBQWlCO0FBQUEsRUFDakIsbUJBQW1CO0FBQUEsRUFDbkIsaUJBQWlCO0FBQUEsRUFDakIsaUJBQWlCO0FBQUEsRUFDakIsY0FBYztBQUFBLEVBQ2QsV0FBVztBQUFBLEVBQ1gsV0FBVztBQUFBLEVBQ1gsVUFBVTtBQUFBLEVBQ1YsYUFBYTtBQUFBLEVBQ2IsTUFBTTtBQUFBLEVBQ04sU0FBUztBQUFBLEVBQ1QsT0FBTztBQUFBLEVBQ1AsV0FBVztBQUFBLEVBQ1gsUUFBUTtBQUFBLEVBQ1IsV0FBVztBQUFBLEVBQ1gsUUFBUTtBQUFBLEVBQ1IsZUFBZTtBQUFBLEVBQ2YsV0FBVztBQUFBLEVBQ1gsZUFBZTtBQUFBLEVBQ2YsZUFBZTtBQUFBLEVBQ2YsWUFBWTtBQUFBLEVBQ1osV0FBVztBQUFBLEVBQ1gsTUFBTTtBQUFBLEVBQ04sTUFBTTtBQUFBLEVBQ04sTUFBTTtBQUFBLEVBQ04sWUFBWTtBQUFBLEVBQ1osUUFBUTtBQUFBLEVBQ1IsZUFBZTtBQUFBLEVBQ2YsS0FBSztBQUFBLEVBQ0wsV0FBVztBQUFBLEVBQ1gsV0FBVztBQUFBLEVBQ1gsYUFBYTtBQUFBLEVBQ2IsUUFBUTtBQUFBLEVBQ1IsWUFBWTtBQUFBLEVBQ1osVUFBVTtBQUFBLEVBQ1YsVUFBVTtBQUFBLEVBQ1YsUUFBUTtBQUFBLEVBQ1IsUUFBUTtBQUFBLEVBQ1IsU0FBUztBQUFBLEVBQ1QsV0FBVztBQUFBLEVBQ1gsV0FBVztBQUFBLEVBQ1gsV0FBVztBQUFBLEVBQ1gsTUFBTTtBQUFBLEVBQ04sYUFBYTtBQUFBLEVBQ2IsV0FBVztBQUFBLEVBQ1gsS0FBSztBQUFBLEVBQ0wsTUFBTTtBQUFBLEVBQ04sU0FBUztBQUFBLEVBQ1QsUUFBUTtBQUFBLEVBQ1IsV0FBVztBQUFBLEVBQ1gsUUFBUTtBQUFBLEVBQ1IsT0FBTztBQUFBLEVBQ1AsT0FBTztBQUFBLEVBQ1AsWUFBWTtBQUFBLEVBQ1osUUFBUTtBQUFBLEVBQ1IsYUFBYTtBQUNmO0FBRUEsT0FBTyxPQUFPLE9BQU87QUFBQSxFQUNuQixLQUFLLFVBQVU7QUFDYixXQUFPLE9BQU8sT0FBTyxJQUFJLEtBQUssZUFBYSxNQUFNLFFBQVE7QUFBQSxFQUMzRDtBQUFBLEVBQ0EsY0FBYztBQUNaLFdBQU8sS0FBSyxJQUFHLEVBQUcsWUFBVztBQUFBLEVBQy9CO0FBQUEsRUFDQSxLQUFLO0FBQUE7QUFBQSxFQUNMLFdBQVc7QUFBQSxFQUNYLFlBQVk7QUFBQSxFQUNaLFdBQVc7QUFBQSxFQUNYLFdBQVc7QUFBQSxFQUNYLFVBQVU7QUFDWixDQUFDO0FBRUQsU0FBUyxrQkFBa0I7QUFDekIsU0FBTyxLQUFLLElBQUcsRUFBRyxVQUFTO0FBQzdCO0FBRUEsU0FBUyxtQkFBbUI7QUFDMUIsU0FBTyxLQUFLLElBQUcsRUFBRyxXQUFVO0FBQzlCO0FBRUEsU0FBUyxrQkFBa0I7QUFDekIsU0FBTyxXQUFXLElBQUksRUFBRSxVQUFTO0FBQ25DO0FBRUEsU0FBUyxrQkFBa0I7QUFDekIsU0FBTyxLQUFLLElBQUcsRUFBRyxVQUFTO0FBQzdCO0FBRWUsU0FBUyxNQUFNMUIsU0FBUTtBQUNwQyxNQUFJLEdBQUc7QUFDUCxFQUFBQSxXQUFVQSxVQUFTLElBQUksS0FBSSxFQUFHLFlBQVc7QUFDekMsVUFBUSxJQUFJLE1BQU0sS0FBS0EsT0FBTSxNQUFNLElBQUksRUFBRSxDQUFDLEVBQUUsUUFBUSxJQUFJLFNBQVMsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFDdEYsTUFBTSxJQUFJLElBQUksSUFBSyxLQUFLLElBQUksS0FBUSxLQUFLLElBQUksS0FBUSxLQUFLLElBQUksS0FBUSxJQUFJLE1BQVMsSUFBSSxPQUFRLElBQU0sSUFBSSxJQUFNLENBQUMsSUFDaEgsTUFBTSxJQUFJLEtBQUssS0FBSyxLQUFLLEtBQU0sS0FBSyxLQUFLLEtBQU0sS0FBSyxJQUFJLE1BQU8sSUFBSSxPQUFRLEdBQUksSUFDL0UsTUFBTSxJQUFJLEtBQU0sS0FBSyxLQUFLLEtBQVEsS0FBSyxJQUFJLEtBQVEsS0FBSyxJQUFJLEtBQVEsS0FBSyxJQUFJLEtBQVEsS0FBSyxJQUFJLEtBQVEsSUFBSSxPQUFVLElBQUksT0FBUSxJQUFNLElBQUksTUFBUSxHQUFJLElBQ3RKLFNBQ0MsSUFBSSxhQUFhLEtBQUtBLE9BQU0sS0FBSyxJQUFJLElBQUksRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUM1RCxJQUFJLGFBQWEsS0FBS0EsT0FBTSxLQUFLLElBQUksSUFBSSxFQUFFLENBQUMsSUFBSSxNQUFNLEtBQUssRUFBRSxDQUFDLElBQUksTUFBTSxLQUFLLEVBQUUsQ0FBQyxJQUFJLE1BQU0sS0FBSyxDQUFDLEtBQ2hHLElBQUksY0FBYyxLQUFLQSxPQUFNLEtBQUssS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxLQUM3RCxJQUFJLGNBQWMsS0FBS0EsT0FBTSxLQUFLLEtBQUssRUFBRSxDQUFDLElBQUksTUFBTSxLQUFLLEVBQUUsQ0FBQyxJQUFJLE1BQU0sS0FBSyxFQUFFLENBQUMsSUFBSSxNQUFNLEtBQUssRUFBRSxDQUFDLENBQUMsS0FDakcsSUFBSSxhQUFhLEtBQUtBLE9BQU0sS0FBSyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLElBQUksS0FBSyxDQUFDLEtBQ3JFLElBQUksY0FBYyxLQUFLQSxPQUFNLEtBQUssS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUMsSUFDMUUsTUFBTSxlQUFlQSxPQUFNLElBQUksS0FBSyxNQUFNQSxPQUFNLENBQUMsSUFDakRBLFlBQVcsZ0JBQWdCLElBQUks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QUE7QUFBQSxZQUFBUSxnQkFBcEMscUJBQW1CO0FBQUEsWUFBQVIsZ0JBQVcsV0FBUixNQUFJO0FBQUEsWUFBQVEsZ0JBQUksR0FBQztBQUFBLFVBQUEsQ0FBQTtBQUFBLFVBQ25DUixnQkFBa0QsTUFBQSxNQUFBO0FBQUEsWUFBQVEsZ0JBQTlDLGdDQUE4QjtBQUFBLFlBQUFSLGdCQUFVLFdBQVAsS0FBRztBQUFBLFlBQUFRLGdCQUFJLEdBQUM7QUFBQSxVQUFBLENBQUE7QUFBQSxVQUM3Q1IsZ0JBQThELE1BQUEsTUFBQTtBQUFBLFlBQUFRLGdCQUExRCxRQUFNO0FBQUEsWUFBQVIsZ0JBQThCLFdBQTNCLHlCQUF1QjtBQUFBLFlBQUFRLGdCQUFJLG1CQUFpQjtBQUFBLFVBQUEsQ0FBQTtBQUFBOztNQUc3RFIsZ0JBQWtJLFdBQS9ILCtIQUEySCxFQUFBO0FBQUEsTUFDOUhBLGdCQUtJLEtBQUEsRUFMRCxPQUFNLFlBQUEsR0FBVztBQUFBLFFBQ2xCQSxnQkFFQyxLQUFBO0FBQUEsVUFGRSxNQUFLO0FBQUEsVUFBNEMsUUFBTztBQUFBLFFBQUEsR0FDeEQsdUNBQXFDO0FBQUEsUUFBQVEsZ0JBQ3ZDLG1CQUVIO0FBQUEsTUFBQSxHQUFBLEVBQUE7QUFBQTtxQkF6QkYsTUFBZ0I7QUFBQSxNQUFoQlAsWUFBZ0IsT0FBQSxjQUFBLENBQUE7QUFBQSxJQUFBLENBQUE7QUFBQTs7OzsiLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbNyw4LDksMTAsMTEsMTIsMTMsMTQsMTUsMTYsMTcsMTgsMTksMjAsMjEsMjIsMjMsMjQsMjUsMjYsMjcsMjgsMjksMzAsMzEsMzIsMzMsMzQsMzUsMzYsMzcsMzgsMzksNDAsNDEsNDIsNDMsNDQsNDUsNDYsNDcsNDgsNDksNTAsNTEsNTIsNTMsNTQsNTUsNTYsNTcsNTgsNTksNjAsNjEsNjIsNjMsNjQsNjUsNjYsNjcsNjgsNjksNzAsNzEsNzIsNzMsNzQsNzUsNzYsNzcsNzgsNzksODAsODEsODIsODMsODQsODUsODYsODcsODgsODksOTAsOTEsOTIsOTMsOTQsOTUsOTYsOTcsOTgsOTksMTAwLDEwMSwxMDIsMTAzLDEwNCwxMDUsMTA2LDEwNywxMDgsMTA5LDExMCwxMTEsMTEyLDExMywxMTQsMTE1LDExNiwxMTcsMTE4LDExOSwxMjAsMTIxLDEyMiwxMjMsMTI0LDEyNSwxMjYsMTI3LDEyOCwxMjksMTMwLDEzMSwxMzIsMTMzLDEzNCwxMzUsMTM2LDEzNywxMzgsMTM5XX0=
