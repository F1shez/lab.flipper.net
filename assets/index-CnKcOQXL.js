import { H as getCurrentInstance, N as inject, O as emptyRenderFn, P as layoutKey, c as computed, J as hSlot, h, L as createComponent, a5 as defineStore, r as reactive, a as ref, d as defineComponent, S as onMounted, _ as _export_sfc, n as createElementBlock, f as openBlock, p as createBaseVNode, i as createCommentVNode, $ as normalizeStyle, am as getBtnDesignAttr, Q as QBtn, ai as hMergeSlot, w as watch, j as createVNode, g as withCtx, k as QIcon, e as createBlock, F as Fragment, q as renderList, af as QSpinner, a0 as normalizeClass, l as createTextVNode, t as toDisplayString, aA as throttle, U as onBeforeUnmount } from "./index-BXn1qSjA.js";
import { l as showNotif, x as QSeparator, M as createNanoEvents, i as QCard, j as QCardSection, p as QCardActions, k as useFlipperStore, v as rpcErrorHandler, h as QDialog } from "./KeypadButton.vue_vue_type_style_index_0_scoped_4cc0fc91_lang-B0Vue97M.js";
import { G as GenericPageLayout } from "./GenericPageLayout-CL0iQIrR.js";
import { Q as QBtnGroup } from "./QBtnGroup-B9sESsA5.js";
import { u as useFormProps, a as useFormInject } from "./private.use-form-DlR7USk8.js";
import { e as exportFile } from "./export-file-lpTZqdHO.js";
import { Q as QTooltip } from "./QTooltip-COHn7rMY.js";
import "./axios-Djb__N3o.js";
import "./_commonjsHelpers-BruQt46T.js";
import "./QSpace-CENODZda.js";
import "./QToolbar-D5FagYN5.js";
const usePageStickyProps = {
  position: {
    type: String,
    default: "bottom-right",
    validator: (v) => [
      "top-right",
      "top-left",
      "bottom-right",
      "bottom-left",
      "top",
      "right",
      "bottom",
      "left"
    ].includes(v)
  },
  offset: {
    type: Array,
    validator: (v) => v.length === 2
  },
  expand: Boolean
};
function usePageSticky() {
  const { props, proxy: { $q } } = getCurrentInstance();
  const $layout = inject(layoutKey, emptyRenderFn);
  if ($layout === emptyRenderFn) {
    console.error("QPageSticky needs to be child of QLayout");
    return emptyRenderFn;
  }
  const attach = computed(() => {
    const pos = props.position;
    return {
      top: pos.indexOf("top") !== -1,
      right: pos.indexOf("right") !== -1,
      bottom: pos.indexOf("bottom") !== -1,
      left: pos.indexOf("left") !== -1,
      vertical: pos === "top" || pos === "bottom",
      horizontal: pos === "left" || pos === "right"
    };
  });
  const top = computed(() => $layout.header.offset);
  const right = computed(() => $layout.right.offset);
  const bottom = computed(() => $layout.footer.offset);
  const left = computed(() => $layout.left.offset);
  const style = computed(() => {
    let posX = 0, posY = 0;
    const side = attach.value;
    const dir = $q.lang.rtl === true ? -1 : 1;
    if (side.top === true && top.value !== 0) {
      posY = `${top.value}px`;
    } else if (side.bottom === true && bottom.value !== 0) {
      posY = `${-bottom.value}px`;
    }
    if (side.left === true && left.value !== 0) {
      posX = `${dir * left.value}px`;
    } else if (side.right === true && right.value !== 0) {
      posX = `${-dir * right.value}px`;
    }
    const css = { transform: `translate(${posX}, ${posY})` };
    if (props.offset) {
      css.margin = `${props.offset[1]}px ${props.offset[0]}px`;
    }
    if (side.vertical === true) {
      if (left.value !== 0) {
        css[$q.lang.rtl === true ? "right" : "left"] = `${left.value}px`;
      }
      if (right.value !== 0) {
        css[$q.lang.rtl === true ? "left" : "right"] = `${right.value}px`;
      }
    } else if (side.horizontal === true) {
      if (top.value !== 0) {
        css.top = `${top.value}px`;
      }
      if (bottom.value !== 0) {
        css.bottom = `${bottom.value}px`;
      }
    }
    return css;
  });
  const classes = computed(
    () => `q-page-sticky row flex-center fixed-${props.position} q-page-sticky--${props.expand === true ? "expand" : "shrink"}`
  );
  function getStickyContent(slots) {
    const content = hSlot(slots.default);
    return h(
      "div",
      {
        class: classes.value,
        style: style.value
      },
      props.expand === true ? content : [h("div", content)]
    );
  }
  return {
    $layout,
    getStickyContent
  };
}
const QPageSticky = createComponent({
  name: "QPageSticky",
  props: usePageStickyProps,
  setup(_2, { slots }) {
    const { getStickyContent } = usePageSticky();
    return () => getStickyContent(slots);
  }
});
const xbmValues = {
  0: [],
  1: [0],
  2: [1],
  3: [0, 1],
  4: [2],
  5: [0, 2],
  6: [1, 2],
  7: [0, 1, 2],
  8: [3],
  9: [0, 3],
  10: [1, 3],
  11: [0, 1, 3],
  12: [2, 3],
  13: [0, 2, 3],
  14: [1, 2, 3],
  15: [0, 1, 2, 3],
  16: [4],
  17: [0, 4],
  18: [1, 4],
  19: [0, 1, 4],
  20: [2, 4],
  21: [0, 2, 4],
  22: [1, 2, 4],
  23: [0, 1, 2, 4],
  24: [3, 4],
  25: [0, 3, 4],
  26: [1, 3, 4],
  27: [0, 1, 3, 4],
  28: [2, 3, 4],
  29: [0, 2, 3, 4],
  30: [1, 2, 3, 4],
  31: [0, 1, 2, 3, 4],
  32: [5],
  33: [0, 5],
  34: [1, 5],
  35: [0, 1, 5],
  36: [2, 5],
  37: [0, 2, 5],
  38: [1, 2, 5],
  39: [0, 1, 2, 5],
  40: [3, 5],
  41: [0, 3, 5],
  42: [1, 3, 5],
  43: [0, 1, 3, 5],
  44: [2, 3, 5],
  45: [0, 2, 3, 5],
  46: [1, 2, 3, 5],
  47: [0, 1, 2, 3, 5],
  48: [4, 5],
  49: [0, 4, 5],
  50: [1, 4, 5],
  51: [0, 1, 4, 5],
  52: [2, 4, 5],
  53: [0, 2, 4, 5],
  54: [1, 2, 4, 5],
  55: [0, 1, 2, 4, 5],
  56: [3, 4, 5],
  57: [0, 3, 4, 5],
  58: [1, 3, 4, 5],
  59: [0, 1, 3, 4, 5],
  60: [2, 3, 4, 5],
  61: [0, 2, 3, 4, 5],
  62: [1, 2, 3, 4, 5],
  63: [0, 1, 2, 3, 4, 5],
  64: [6],
  65: [0, 6],
  66: [1, 6],
  67: [0, 1, 6],
  68: [2, 6],
  69: [0, 2, 6],
  70: [1, 2, 6],
  71: [0, 1, 2, 6],
  72: [3, 6],
  73: [0, 3, 6],
  74: [1, 3, 6],
  75: [0, 1, 3, 6],
  76: [2, 3, 6],
  77: [0, 2, 3, 6],
  78: [1, 2, 3, 6],
  79: [0, 1, 2, 3, 6],
  80: [4, 6],
  81: [0, 4, 6],
  82: [1, 4, 6],
  83: [0, 1, 4, 6],
  84: [2, 4, 6],
  85: [0, 2, 4, 6],
  86: [1, 2, 4, 6],
  87: [0, 1, 2, 4, 6],
  88: [3, 4, 6],
  89: [0, 3, 4, 6],
  90: [1, 3, 4, 6],
  91: [0, 1, 3, 4, 6],
  92: [2, 3, 4, 6],
  93: [0, 2, 3, 4, 6],
  94: [1, 2, 3, 4, 6],
  95: [0, 1, 2, 3, 4, 6],
  96: [5, 6],
  97: [0, 5, 6],
  98: [1, 5, 6],
  99: [0, 1, 5, 6],
  100: [2, 5, 6],
  101: [0, 2, 5, 6],
  102: [1, 2, 5, 6],
  103: [0, 1, 2, 5, 6],
  104: [3, 5, 6],
  105: [0, 3, 5, 6],
  106: [1, 3, 5, 6],
  107: [0, 1, 3, 5, 6],
  108: [2, 3, 5, 6],
  109: [0, 2, 3, 5, 6],
  110: [1, 2, 3, 5, 6],
  111: [0, 1, 2, 3, 5, 6],
  112: [4, 5, 6],
  113: [0, 4, 5, 6],
  114: [1, 4, 5, 6],
  115: [0, 1, 4, 5, 6],
  116: [2, 4, 5, 6],
  117: [0, 2, 4, 5, 6],
  118: [1, 2, 4, 5, 6],
  119: [0, 1, 2, 4, 5, 6],
  120: [3, 4, 5, 6],
  121: [0, 3, 4, 5, 6],
  122: [1, 3, 4, 5, 6],
  123: [0, 1, 3, 4, 5, 6],
  124: [2, 3, 4, 5, 6],
  125: [0, 2, 3, 4, 5, 6],
  126: [1, 2, 3, 4, 5, 6],
  127: [0, 1, 2, 3, 4, 5, 6],
  128: [7],
  129: [0, 7],
  130: [1, 7],
  131: [0, 1, 7],
  132: [2, 7],
  133: [0, 2, 7],
  134: [1, 2, 7],
  135: [0, 1, 2, 7],
  136: [3, 7],
  137: [0, 3, 7],
  138: [1, 3, 7],
  139: [0, 1, 3, 7],
  140: [2, 3, 7],
  141: [0, 2, 3, 7],
  142: [1, 2, 3, 7],
  143: [0, 1, 2, 3, 7],
  144: [4, 7],
  145: [0, 4, 7],
  146: [1, 4, 7],
  147: [0, 1, 4, 7],
  148: [2, 4, 7],
  149: [0, 2, 4, 7],
  150: [1, 2, 4, 7],
  151: [0, 1, 2, 4, 7],
  152: [3, 4, 7],
  153: [0, 3, 4, 7],
  154: [1, 3, 4, 7],
  155: [0, 1, 3, 4, 7],
  156: [2, 3, 4, 7],
  157: [0, 2, 3, 4, 7],
  158: [1, 2, 3, 4, 7],
  159: [0, 1, 2, 3, 4, 7],
  160: [5, 7],
  161: [0, 5, 7],
  162: [1, 5, 7],
  163: [0, 1, 5, 7],
  164: [2, 5, 7],
  165: [0, 2, 5, 7],
  166: [1, 2, 5, 7],
  167: [0, 1, 2, 5, 7],
  168: [3, 5, 7],
  169: [0, 3, 5, 7],
  170: [1, 3, 5, 7],
  171: [0, 1, 3, 5, 7],
  172: [2, 3, 5, 7],
  173: [0, 2, 3, 5, 7],
  174: [1, 2, 3, 5, 7],
  175: [0, 1, 2, 3, 5, 7],
  176: [4, 5, 7],
  177: [0, 4, 5, 7],
  178: [1, 4, 5, 7],
  179: [0, 1, 4, 5, 7],
  180: [2, 4, 5, 7],
  181: [0, 2, 4, 5, 7],
  182: [1, 2, 4, 5, 7],
  183: [0, 1, 2, 4, 5, 7],
  184: [3, 4, 5, 7],
  185: [0, 3, 4, 5, 7],
  186: [1, 3, 4, 5, 7],
  187: [0, 1, 3, 4, 5, 7],
  188: [2, 3, 4, 5, 7],
  189: [0, 2, 3, 4, 5, 7],
  190: [1, 2, 3, 4, 5, 7],
  191: [0, 1, 2, 3, 4, 5, 7],
  192: [6, 7],
  193: [0, 6, 7],
  194: [1, 6, 7],
  195: [0, 1, 6, 7],
  196: [2, 6, 7],
  197: [0, 2, 6, 7],
  198: [1, 2, 6, 7],
  199: [0, 1, 2, 6, 7],
  200: [3, 6, 7],
  201: [0, 3, 6, 7],
  202: [1, 3, 6, 7],
  203: [0, 1, 3, 6, 7],
  204: [2, 3, 6, 7],
  205: [0, 2, 3, 6, 7],
  206: [1, 2, 3, 6, 7],
  207: [0, 1, 2, 3, 6, 7],
  208: [4, 6, 7],
  209: [0, 4, 6, 7],
  210: [1, 4, 6, 7],
  211: [0, 1, 4, 6, 7],
  212: [2, 4, 6, 7],
  213: [0, 2, 4, 6, 7],
  214: [1, 2, 4, 6, 7],
  215: [0, 1, 2, 4, 6, 7],
  216: [3, 4, 6, 7],
  217: [0, 3, 4, 6, 7],
  218: [1, 3, 4, 6, 7],
  219: [0, 1, 3, 4, 6, 7],
  220: [2, 3, 4, 6, 7],
  221: [0, 2, 3, 4, 6, 7],
  222: [1, 2, 3, 4, 6, 7],
  223: [0, 1, 2, 3, 4, 6, 7],
  224: [5, 6, 7],
  225: [0, 5, 6, 7],
  226: [1, 5, 6, 7],
  227: [0, 1, 5, 6, 7],
  228: [2, 5, 6, 7],
  229: [0, 2, 5, 6, 7],
  230: [1, 2, 5, 6, 7],
  231: [0, 1, 2, 5, 6, 7],
  232: [3, 5, 6, 7],
  233: [0, 3, 5, 6, 7],
  234: [1, 3, 5, 6, 7],
  235: [0, 1, 3, 5, 6, 7],
  236: [2, 3, 5, 6, 7],
  237: [0, 2, 3, 5, 6, 7],
  238: [1, 2, 3, 5, 6, 7],
  239: [0, 1, 2, 3, 5, 6, 7],
  240: [4, 5, 6, 7],
  241: [0, 4, 5, 6, 7],
  242: [1, 4, 5, 6, 7],
  243: [0, 1, 4, 5, 6, 7],
  244: [2, 4, 5, 6, 7],
  245: [0, 2, 4, 5, 6, 7],
  246: [1, 2, 4, 5, 6, 7],
  247: [0, 1, 2, 4, 5, 6, 7],
  248: [3, 4, 5, 6, 7],
  249: [0, 3, 4, 5, 6, 7],
  250: [1, 3, 4, 5, 6, 7],
  251: [0, 1, 3, 4, 5, 6, 7],
  252: [2, 3, 4, 5, 6, 7],
  253: [0, 2, 3, 4, 5, 6, 7],
  254: [1, 2, 3, 4, 5, 6, 7],
  255: [0, 1, 2, 3, 4, 5, 6, 7]
};
function imageDataToXBM(imageData) {
  const data = imageData.data;
  let pixel = 0;
  let actualRow = 1;
  const xbmBytes = [];
  for (let c = 0; c < 64; c++) {
    for (let c2 = 0; c2 < 128 / 8; c2++) {
      const hexBits = [];
      for (let c3 = 0; c3 < 8; c3++) {
        const pixelIsBlack = !data[pixel * 4];
        if (pixelIsBlack) {
          hexBits.push(c3);
        }
        pixel++;
        const isNewRow = pixel / (128 * actualRow) === 1;
        if (isNewRow) {
          actualRow++;
          break;
        }
      }
      for (let c4 = 0; c4 < 256; c4++) {
        if (JSON.stringify(xbmValues[String(c4)]) === JSON.stringify(hexBits)) {
          xbmBytes.push(c4);
        }
      }
    }
  }
  return xbmBytes;
}
const $ = (selector, scope = document) => scope.querySelector(selector);
const getLeft = (el) => (el.offsetParent ? getLeft(el.offsetParent) - el.offsetParent.scrollLeft : 0) + el.offsetLeft;
const getTop = (el) => (el.offsetParent ? getTop(el.offsetParent) - el.offsetParent.scrollTop : 0) + el.offsetTop;
const BEM = (name) => ({
  b: name,
  e: (e) => `${name}__${e}`,
  m: (m) => `${name}--${m}`
});
const _ = (tag, attrs, ...children) => {
  const classes = tag.split(".");
  const el = document.createElement(classes[0]);
  el.classList.add(...classes.slice(1));
  if (attrs) {
    if (typeof attrs === "string" || attrs instanceof Node) {
      children.unshift(attrs);
    } else {
      Object.entries(attrs).forEach(([a, v]) => el.setAttribute(a, v));
    }
  }
  el.append(...children);
  return el;
};
function bres(x0, y0, x1, y1) {
  const pts = [];
  const dx = Math.abs(x1 - x0);
  const dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;
  let safety = 0;
  while (true) {
    if (safety++ > (parseInt(dx + dy) || 2)) {
      console.warn("bres reached safety valve!");
      break;
    }
    pts.push([x0, y0]);
    if (x0 === x1 && y0 === y1) break;
    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x0 += sx;
    }
    if (e2 < dx) {
      err += dx;
      y0 += sy;
    }
  }
  return pts;
}
function rect(x0, y0, x1, y1) {
  if (x1 < x0) {
    [x0, x1] = [x1, x0];
  }
  if (y1 < y0) {
    [y0, y1] = [y1, y0];
  }
  const pts = [];
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      pts.push([x, y]);
    }
  }
  return pts;
}
function flood(data, x, y, width, value) {
  const seen = {};
  const height = data.length / width | 0;
  const idx = (x2, y2) => width * y2 + x2;
  const start = idx(x, y);
  const bg = data[start];
  const stack = [start];
  seen[start] = true;
  while (stack.length) {
    const pos = stack.pop();
    if (data[pos] === bg) {
      data[pos] = value;
      const x2 = pos % width;
      const y2 = pos / width | 0;
      if (x2 < width - 1 && !seen[pos + 1]) {
        seen[pos + 1] = true;
        stack.push(pos + 1);
      }
      if (x2 > 0 && !seen[pos - 1]) {
        seen[pos - 1] = true;
        stack.push(pos - 1);
      }
      if (y2 < height - 1 && !seen[pos + width]) {
        seen[pos + width] = true;
        stack.push(pos + width);
      }
      if (y2 > 0 && !seen[pos - width]) {
        seen[pos - width] = true;
        stack.push(pos - width);
      }
    }
  }
}
function getRelativePoint(event, el, zoom) {
  const left = getLeft(el);
  const top = getTop(el);
  return [
    (event.pageX - left - 1) / zoom | 0,
    (event.pageY - top - 1) / zoom | 0
  ];
}
const tools = ["draw", "erase", "line", "rect", "fill"];
const defaultColors = [
  [255, 255, 255],
  [0, 0, 0]
];
class PixelEditor {
  constructor({
    width,
    height = width,
    colors = defaultColors,
    zoom = 4,
    currentColor = 1,
    bg = 0,
    container,
    onUpdate
    // afterDraw
  } = {}) {
    this.bem = BEM("pE");
    this.width = width;
    this.height = height;
    this.zoom = zoom;
    this.colors = colors;
    this.currentColor = currentColor;
    this.bg = bg;
    this.data = new Uint8Array(width * height).fill(bg);
    this.mode = "draw";
    this.undoStack = [];
    this.redoStack = [];
    this.onUpdate = onUpdate;
    this.save();
    this.undoStack.pop();
    this.dataChanged = false;
    this.lastDraw = null;
    this.mouseEventsQueue = [];
    if (container) {
      this.mount(container);
    }
  }
  // saves an undo snapshot, optionally with sizing information
  save(saveSizing) {
    this.undoStack.push({
      data: [...this.data],
      ...saveSizing && {
        width: this.width,
        height: this.height,
        zoom: this.zoom
      }
    });
  }
  // restores to the previous undo snapshot, if available
  undo() {
    if (this.undoStack.length) {
      const popped = this.undoStack.pop();
      this.redoStack.push({ data: this.data });
      if (popped.width || popped.height || popped.zoom) {
        this.resize({ ...popped, noSave: true });
      }
      this.data = popped.data;
      this.dataChanged = true;
      this.draw();
      this.updated();
    }
  }
  // restores to the previous redo snapshot, if available
  redo() {
    if (this.redoStack.length) {
      const popped = this.redoStack.pop();
      this.undoStack.push({ data: this.data });
      if (popped.width || popped.height || popped.zoom) {
        this.resize({ ...popped, noSave: true });
      }
      this.data = popped.data;
      this.dataChanged = true;
      this.draw();
      this.updated();
    }
  }
  // set the whole canvas to a single color
  clear(color) {
    if (typeof color === "undefined") {
      color = this.bg;
    }
    this.save();
    this.data.fill(color);
    this.dataChanged = true;
    this.draw();
    this.updated();
  }
  setData(data) {
    this.save();
    this.data = data;
    this.dataChanged = true;
    this.draw();
    this.updated();
  }
  // construct the DOM, and set event listeners
  render() {
    const { b, e } = this.bem;
    this.canvas = _(`canvas.${e("drawing")}`, {
      width: this.width * this.zoom,
      height: this.height * this.zoom
    });
    this.ctx = this.canvas.getContext("2d", {
      alpha: false,
      desynchronized: true,
      imageSmoothingEnabled: false
    });
    this.el = _(
      `div.pixeleditor.${b}`,
      {
        tabindex: 0
      },
      _(`div.${e("canvas")}`, this.canvas)
    );
    this.el.addEventListener("keydown", (e2) => {
      if (!this.p0) {
        this.p0 = [0, 0];
      }
      const cursor = this.p0;
      if (!e2.metaKey && !e2.ctrlKey) {
        if (e2.altKey) {
          if (e2.code === "KeyX") {
            this.clear();
          }
        } else {
          e2.preventDefault();
          if (e2.code === "ArrowRight") {
            cursor[0] = Math.min(cursor[0] + 1, this.width - 1);
          }
          if (e2.code === "ArrowLeft") {
            cursor[0] = Math.max(cursor[0] - 1, 0);
          }
          if (e2.code === "ArrowDown") {
            cursor[1] = Math.min(cursor[1] + 1, this.height - 1);
          }
          if (e2.code === "ArrowUp") {
            cursor[1] = Math.max(cursor[1] - 1, 0);
          }
          if (e2.code === "KeyZ") {
            this.undo();
          }
          if (e2.code === "KeyU") {
            this.redo();
          }
          if (e2.code === "KeyL") {
            this.setMode("line");
          }
          if (e2.code === "KeyD") {
            this.setMode("draw");
          }
          if (e2.code === "KeyE") {
            this.setMode("erase");
          }
          if (e2.code === "KeyR") {
            this.setMode("rect");
          }
          if (e2.code === "KeyF") {
            this.setMode("fill");
          }
          if (e2.code === "Space") {
            if (this.mode === "draw" || this.mode === "erase") {
              if (this.drawing) {
                this.updated();
              } else {
                this.save();
              }
              this.drawing = !this.drawing;
            }
            if (this.mode === "line") {
              if (this.drawing) {
                this.plotLine(this.p0, this.p1);
                this.updated();
              } else {
                this.save();
                this.p1 = [...cursor];
              }
              this.drawing = !this.drawing;
            }
            if (this.mode === "rect") {
              if (this.drawing) {
                this.plotRect(this.p0, this.p1);
                this.updated();
              } else {
                this.save();
                this.p1 = [...cursor];
              }
              this.drawing = !this.drawing;
            }
            if (this.mode === "fill") {
              this.save();
              flood(this.data, ...cursor, this.width, this.currentColor);
              this.dataChanged = true;
              this.updated();
            }
          }
        }
      }
      if (this.drawing) {
        if (this.mode === "draw" || this.mode === "erase") {
          this.plotPoint(...cursor);
        }
      }
      this.draw();
    });
    this.canvas.addEventListener("mousedown", (e2) => {
      const [x, y] = getRelativePoint(e2, this.canvas, this.zoom);
      if (this.mode === "draw" || this.mode === "erase") {
        this.save();
        this.plotPoint(x, y);
        this.drawing = true;
      }
      if (this.mode === "line" || this.mode === "rect") {
        this.drawing = true;
        this.p0 = [x, y];
        this.p1 = [x, y];
        this.draw();
      }
      if (this.mode === "fill") {
        this.save();
        flood(this.data, x, y, this.width, this.currentColor);
        this.dataChanged = true;
        this.draw();
        this.updated();
      }
    });
    this.canvas.addEventListener("mousemove", (e2) => {
      const [x, y] = getRelativePoint(e2, this.canvas, this.zoom);
      if (!this.p0 || x !== this.p0[0] || y !== this.p0[1]) {
        this.p0 = [x, y];
        this.draw();
      }
      if (this.drawing && this.mode === "draw" || this.mode === "erase") {
        this.mouseEventsQueue.push([x, y]);
        if (this.mouseEventsQueue.length === 1) {
          this.handleMouseDraw();
        }
      }
      if (this.drawing && (this.mode === "line" || this.mode === "rect")) {
        if (x !== this.p0[0] || y !== this.p0[1]) {
          this.p0 = [x, y];
          this.draw();
        }
      }
    });
    this.el.addEventListener("mouseup", () => {
      if (this.drawing && this.mode === "line") {
        this.save();
        this.plotLine(this.p0, this.p1);
        this.draw();
        this.updated();
      }
      if (this.drawing && this.mode === "rect") {
        this.save();
        this.plotRect(this.p0, this.p1);
        this.draw();
        this.updated();
      }
      if (this.drawing && this.mode === "draw" || this.mode === "erase") {
        this.updated();
        this.mouseEventP0 = null;
      }
      this.drawing = false;
    });
    this.el.addEventListener("blur", () => {
      this.p0 = null;
      this.draw();
      this.mouseEventP0 = null;
    });
    this.el.addEventListener("mouseleave", () => {
      if (this.drawing && this.mode === "draw" || this.mode === "erase") {
        this.updated();
        this.mouseEventP0 = null;
      }
      if (!(this.mode === "line" || this.mode === "rect")) {
        this.drawing = false;
      }
    });
  }
  handleMouseDraw() {
    while (this.mouseEventsQueue.length) {
      const [x, y] = this.mouseEventsQueue[0];
      if (!this.mouseEventP0) {
        this.plotPoint(x, y);
      } else if (!(this.mouseEventP0[0] === x && this.mouseEventP0[1] === y)) {
        this.plotLine([x, y], this.mouseEventP0);
      }
      this.mouseEventP0 = [x, y];
      this.mouseEventsQueue.shift();
    }
  }
  // draw a single point
  plotPoint(x, y, c) {
    if (typeof c === "undefined") {
      c = this.currentColor;
    }
    const idx = y * this.width + x;
    if (this.data[idx] !== c) {
      this.data[idx] = c;
      this.dataChanged = true;
      this.ctx.fillRect(x * this.zoom, y * this.zoom, this.zoom, this.zoom);
    }
  }
  // draw a rectangle
  plotRect(p0, p1, c) {
    if (typeof c === "undefined") {
      c = this.currentColor;
    }
    rect(...p0, ...p1).forEach((p) => {
      this.data[p[1] * this.width + p[0]] = c;
    });
    this.dataChanged = true;
    this.draw();
  }
  // draw a line
  plotLine(p0, p1, c) {
    if (typeof c === "undefined") {
      c = this.currentColor;
    }
    bres(...p0, ...p1).forEach((p) => {
      this.data[p[1] * this.width + p[0]] = c;
      this.ctx.fillStyle = this.currentColor === 0 ? "#ffffff" : "#000000";
      this.ctx.fillRect(p[0] * this.zoom, p[1] * this.zoom, this.zoom, this.zoom);
    });
    this.dataChanged = true;
  }
  // change the drawing mode
  setMode(mode) {
    if (tools.indexOf(mode) > -1) {
      $(`button[aria-mode="${mode}"]`).click();
      this.mode = mode;
    }
  }
  // re-render the drawing with a reticle and pending line if applicable
  draw() {
    const ctx = this.ctx;
    this.ctx.save();
    const { width, height, zoom } = this;
    let drawData = this.data;
    if (this.drawing && this.mode === "line") {
      drawData = [...this.data];
      bres(...this.p0, ...this.p1).forEach((p) => {
        drawData[p[1] * width + p[0]] = this.currentColor;
      });
      this.dataChanged = true;
    }
    if (this.drawing && this.mode === "rect") {
      drawData = [...this.data];
      rect(...this.p0, ...this.p1).forEach((p) => {
        drawData[p[1] * width + p[0]] = this.currentColor;
      });
      this.dataChanged = true;
    }
    let id = this.lastDraw;
    if (this.dataChanged || !this.lastDraw) {
      id = new ImageData(width * zoom, height * zoom);
      for (let i = 0; i < id.data.length; i += 4) {
        const x = i / 4 % this.canvas.width;
        const y = i / 4 / this.canvas.width | 0;
        const px = x / zoom | 0;
        const py = y / zoom | 0;
        const c = this.colors[drawData[py * width + px]];
        id.data[i] = c[0];
        id.data[i + 1] = c[1];
        id.data[i + 2] = c[2];
        id.data[i + 3] = 255;
      }
      this.lastDraw = id;
    } else {
      id = this.lastDraw;
    }
    this.dataChanged = false;
    this.ctx.putImageData(id, 0, 0);
    if (this.p0) {
      const rx = this.p0[0] * zoom;
      const ry = this.p0[1] * zoom;
      ctx.globalCompositeOperation = "difference";
      ctx.strokeStyle = "#fff";
      ctx.strokeRect(rx - 1, ry - 1, zoom + 1, zoom + 1);
    }
    this.ctx.restore();
  }
  // notify onUpdated callback
  updated() {
    if (this.onUpdate) {
      this.onUpdate(this);
    }
  }
  // change the size of the drawing canvas
  resize({
    /* width, height, */
    zoom,
    noSave = true
  }) {
    if (!noSave) {
      this.save(true);
    }
    const oldWidth = this.width;
    const oldHeight = this.height;
    const oldData = this.data;
    if (zoom) {
      this.zoom = parseInt(zoom);
    }
    this.canvas.width = this.width * this.zoom;
    this.canvas.height = this.height * this.zoom;
    this.data = new Uint8Array(this.width * this.height).fill(0);
    for (let i = 0; i < this.data.length; i++) {
      const x = i % this.width;
      const y = i / this.width | 0;
      if (x < oldWidth && y < oldHeight) {
        this.data[i] = oldData[y * oldWidth + x];
      }
    }
    this.dataChanged = true;
    this.draw();
  }
  // append the widget to a container
  mount(container) {
    this.render();
    container.append(this.el);
    this.draw();
  }
  /* export formats */
  // return an ImageData of the drawing at the specified zoom
  toImageData({ zoom = 1 } = {}) {
    const { width, height } = this;
    const id = new ImageData(width * zoom, height * zoom);
    const drawData = this.data;
    for (let i = 0; i < id.data.length; i += 4) {
      const x = i / 4 % (width * zoom);
      const y = i / 4 / (width * zoom) | 0;
      const px = x / zoom | 0;
      const py = y / zoom | 0;
      const c = this.colors[drawData[py * width + px]];
      id.data[i] = c[0];
      id.data[i + 1] = c[1];
      id.data[i + 2] = c[2];
      id.data[i + 3] = 255;
    }
    return id;
  }
  // returns an "image/png" Blob of the drawing at the specified zoom
  toBlob({ zoom = 1 } = {}) {
    return new Promise((resolve) => {
      const id = this.toImageData({ zoom });
      const canvas = _("canvas", {
        width: id.width,
        height: id.height
      });
      canvas.getContext("2d").putImageData(id, 0, 0);
      canvas.toBlob(resolve);
    });
  }
}
const usePaintStore = defineStore("paint", () => {
  const flags = reactive({
    checkerboard: true,
    imageFileLoading: false,
    ditherDialog: false
  });
  const pe = ref();
  const createEditor = () => {
    pe.value = new PixelEditor({
      width: 128,
      height: 64,
      container: document.querySelector(".pe-container"),
      onUpdate: updateMirror
    });
  };
  const mirror = ref();
  const setMirror = (element) => {
    mirror.value = element;
  };
  const callbackFrame = ref();
  const setCallbackFrame = (callback) => {
    callbackFrame.value = callback;
  };
  const updateMirror = () => {
    var _a, _b;
    const mirror2 = document.querySelector(".mirror");
    const imageData = (_a = pe.value) == null ? void 0 : _a.toImageData();
    if (imageData) {
      (_b = mirror2.getContext("2d")) == null ? void 0 : _b.putImageData(imageData, 0, 0);
    }
    if (callbackFrame.value) {
      callbackFrame.value();
    }
  };
  const zoomLevel = ref(4);
  const uploadedImage = ref();
  return {
    flags,
    pe,
    createEditor,
    mirror,
    setMirror,
    setCallbackFrame,
    zoomLevel,
    uploadedImage
  };
});
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "Mirror",
  setup(__props, { expose: __expose }) {
    __expose();
    const paintStore = usePaintStore();
    const mirror = ref();
    onMounted(() => {
      paintStore.setMirror(mirror.value);
    });
    const __returned__ = { paintStore, mirror };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$4 = {
  ref: "mirror",
  class: "mirror",
  width: "128",
  height: "64"
};
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("canvas", _hoisted_1$4, null, 512);
}
const PaintMirror = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["__scopeId", "data-v-e242c913"], ["__file", "Mirror.vue"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Editor",
  setup(__props, { expose: __expose }) {
    __expose();
    const paintStore = usePaintStore();
    onMounted(() => {
      paintStore.createEditor();
    });
    const __returned__ = { paintStore };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$3 = { class: "col drawing-board fit flex flex-center" };
const _hoisted_2$2 = { class: "pe-container" };
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$3, [
    createBaseVNode("div", _hoisted_2$2, [
      $setup.paintStore.flags.checkerboard ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "checkerboard",
        style: normalizeStyle(`background-size: ${$setup.paintStore.zoomLevel * 2}px ${$setup.paintStore.zoomLevel * 2}px`)
      }, null, 4)) : createCommentVNode("", true)
    ])
  ]);
}
const PaintPixelEditor = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__scopeId", "data-v-cec35b52"], ["__file", "Editor.vue"]]);
const QBtnToggle = createComponent({
  name: "QBtnToggle",
  props: {
    ...useFormProps,
    modelValue: {
      required: true
    },
    options: {
      type: Array,
      required: true,
      validator: (v) => v.every(
        (opt) => ("label" in opt || "icon" in opt || "slot" in opt) && "value" in opt
      )
    },
    // To avoid seeing the active raise shadow through
    // the transparent button, give it a color (even white)
    color: String,
    textColor: String,
    toggleColor: {
      type: String,
      default: "primary"
    },
    toggleTextColor: String,
    outline: Boolean,
    flat: Boolean,
    unelevated: Boolean,
    rounded: Boolean,
    push: Boolean,
    glossy: Boolean,
    size: String,
    padding: String,
    noCaps: Boolean,
    noWrap: Boolean,
    dense: Boolean,
    readonly: Boolean,
    disable: Boolean,
    stack: Boolean,
    stretch: Boolean,
    spread: Boolean,
    clearable: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: true
    }
  },
  emits: ["update:modelValue", "clear", "click"],
  setup(props, { slots, emit }) {
    const hasActiveValue = computed(
      () => props.options.find((opt) => opt.value === props.modelValue) !== void 0
    );
    const formAttrs = computed(() => ({
      type: "hidden",
      name: props.name,
      value: props.modelValue
    }));
    const injectFormInput = useFormInject(formAttrs);
    const btnDesignAttr = computed(() => getBtnDesignAttr(props));
    const btnOptionDesign = computed(() => ({
      rounded: props.rounded,
      dense: props.dense,
      ...btnDesignAttr.value
    }));
    const btnOptions = computed(() => props.options.map((item, i) => {
      const { attrs, value, slot, ...opt } = item;
      return {
        slot,
        props: {
          key: i,
          "aria-pressed": value === props.modelValue ? "true" : "false",
          ...attrs,
          ...opt,
          ...btnOptionDesign.value,
          disable: props.disable === true || opt.disable === true,
          // Options that come from the button specific options first, then from general props
          color: value === props.modelValue ? mergeOpt(opt, "toggleColor") : mergeOpt(opt, "color"),
          textColor: value === props.modelValue ? mergeOpt(opt, "toggleTextColor") : mergeOpt(opt, "textColor"),
          noCaps: mergeOpt(opt, "noCaps") === true,
          noWrap: mergeOpt(opt, "noWrap") === true,
          size: mergeOpt(opt, "size"),
          padding: mergeOpt(opt, "padding"),
          ripple: mergeOpt(opt, "ripple"),
          stack: mergeOpt(opt, "stack") === true,
          stretch: mergeOpt(opt, "stretch") === true,
          onClick(e) {
            set(value, item, e);
          }
        }
      };
    }));
    function set(value, opt, e) {
      if (props.readonly !== true) {
        if (props.modelValue === value) {
          if (props.clearable === true) {
            emit("update:modelValue", null, null);
            emit("clear");
          }
        } else {
          emit("update:modelValue", value, opt);
        }
        emit("click", e);
      }
    }
    function mergeOpt(opt, key) {
      return opt[key] === void 0 ? props[key] : opt[key];
    }
    function getContent() {
      const child = btnOptions.value.map((opt) => {
        return h(QBtn, opt.props, opt.slot !== void 0 ? slots[opt.slot] : void 0);
      });
      if (props.name !== void 0 && props.disable !== true && hasActiveValue.value === true) {
        injectFormInput(child, "push");
      }
      return hMergeSlot(slots.default, child);
    }
    return () => h(QBtnGroup, {
      class: "q-btn-toggle",
      ...btnDesignAttr.value,
      rounded: props.rounded,
      stretch: props.stretch,
      glossy: props.glossy,
      spread: props.spread
    }, getContent);
  }
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Controls",
  setup(__props, { expose: __expose }) {
    __expose();
    const paintStore = usePaintStore();
    const pe = computed(() => paintStore.pe);
    const modeModel = ref("pencil");
    const changeMode = (value) => {
      if (pe.value) {
        switch (value) {
          case "pencil":
            pe.value.currentColor = 1;
            pe.value.mode = "draw";
            break;
          case "eraser":
            pe.value.currentColor = 0;
            pe.value.mode = "draw";
            break;
          case "line":
            pe.value.currentColor = 1;
            pe.value.mode = "line";
            break;
          case "rectangle":
            pe.value.currentColor = 1;
            pe.value.mode = "rect";
            break;
          case "fill":
            pe.value.currentColor = 1;
            pe.value.mode = "fill";
            break;
        }
      }
    };
    const zoomLimit = computed(() => {
      return {
        min: 1,
        max: 8
      };
    });
    watch(
      () => paintStore.zoomLevel,
      (newValue) => {
        if (!/^[0-9]*$/.test(String(newValue))) {
          return;
        }
        if (pe.value) {
          pe.value.resize({ zoom: newValue });
        }
      }
    );
    const zoom = ({
      mul,
      val,
      offset
    }) => {
      let result;
      if (mul) {
        result = paintStore.zoomLevel * mul;
      } else if (val) {
        result = val;
      } else if (offset) {
        result = paintStore.zoomLevel + offset;
      }
      if (result) {
        if (result < zoomLimit.value.min) {
          paintStore.zoomLevel = zoomLimit.value.min;
        } else if (result > zoomLimit.value.max) {
          paintStore.zoomLevel = zoomLimit.value.max;
        } else {
          paintStore.zoomLevel = result;
        }
      }
    };
    const undo = () => {
      var _a;
      (_a = pe.value) == null ? void 0 : _a.undo();
    };
    const redo = () => {
      var _a;
      (_a = pe.value) == null ? void 0 : _a.redo();
    };
    const clear = () => {
      var _a;
      (_a = pe.value) == null ? void 0 : _a.clear();
    };
    const triggerUpload = () => {
      const el = document.querySelector(".file-upload");
      if (el) {
        el.click();
      }
    };
    const upload = (event) => {
      paintStore.flags.imageFileLoading = true;
      try {
        const input = event.target;
        if (input) {
          const files = input.files;
          if (files == null ? void 0 : files.length) {
            const file = files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = () => {
                if (reader.readyState !== FileReader.DONE) {
                  return;
                }
                const img = new Image();
                img.onload = () => {
                  ;
                  document.querySelector(".file-upload").value = "";
                  paintStore.flags.imageFileLoading = false;
                  paintStore.uploadedImage = img;
                  paintStore.flags.ditherDialog = true;
                };
                img.src = reader.result;
              };
              reader.readAsDataURL(file);
            }
          }
        }
      } catch (error) {
        paintStore.flags.imageFileLoading = false;
        console.error(error);
      }
    };
    const download = async () => {
      var _a;
      const blob = await ((_a = pe.value) == null ? void 0 : _a.toBlob());
      const status = exportFile(`Paint_${(/* @__PURE__ */ new Date()).toISOString()}.png`, blob);
      if (!status) {
        showNotif({
          message: "Failed to download image: permission denied",
          color: "negative"
        });
      }
    };
    const __returned__ = { paintStore, pe, modeModel, changeMode, zoomLimit, zoom, undo, redo, clear, triggerUpload, upload, download };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$2 = {
  key: 0,
  class: "controls q-pa-xs rounded-borders bg-grey-2"
};
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return $setup.pe ? (openBlock(), createElementBlock("div", _hoisted_1$2, [
    createVNode(QBtnToggle, {
      modelValue: $setup.modeModel,
      "onUpdate:modelValue": [
        _cache[0] || (_cache[0] = ($event) => $setup.modeModel = $event),
        $setup.changeMode
      ],
      flat: "",
      dense: "",
      options: [
        {
          value: "pencil",
          slot: "pencil",
          attrs: {
            "aria-mode": "draw"
          }
        },
        {
          value: "eraser",
          slot: "eraser",
          attrs: {
            "aria-mode": "erase"
          }
        },
        {
          value: "line",
          slot: "line",
          attrs: {
            "aria-mode": "line"
          }
        },
        {
          value: "rectangle",
          slot: "rectangle",
          attrs: {
            "aria-mode": "rect"
          }
        },
        {
          value: "fill",
          slot: "fill",
          attrs: {
            "aria-mode": "fill"
          }
        }
      ]
    }, {
      pencil: withCtx(() => [
        createVNode(QIcon, {
          name: "mdi-pencil",
          class: "q-px-sm"
        })
      ]),
      eraser: withCtx(() => [
        createVNode(QIcon, {
          name: "mdi-eraser",
          class: "q-px-sm"
        })
      ]),
      line: withCtx(() => [
        createVNode(QIcon, {
          name: "mdi-vector-line",
          class: "q-px-sm"
        })
      ]),
      rectangle: withCtx(() => [
        createVNode(QIcon, {
          name: "mdi-vector-rectangle",
          class: "q-px-sm"
        })
      ]),
      fill: withCtx(() => [
        createVNode(QIcon, {
          name: "mdi-format-color-fill",
          class: "q-px-sm q-pt-xs"
        })
      ]),
      _: 1
    }, 8, ["modelValue"]),
    createBaseVNode("input", {
      type: "file",
      class: "file-upload hidden",
      onChange: $setup.upload
    }, null, 32),
    createVNode(QBtn, {
      flat: "",
      dense: "",
      onClick: $setup.triggerUpload,
      loading: $setup.paintStore.flags.imageFileLoading,
      class: "q-px-sm",
      icon: "mdi-file-image-outline"
    }, null, 8, ["loading"]),
    createVNode(QBtn, {
      flat: "",
      dense: "",
      color: $setup.paintStore.flags.checkerboard ? "primary" : "black",
      icon: "mdi-checkerboard",
      class: "q-px-sm",
      onClick: _cache[1] || (_cache[1] = ($event) => $setup.paintStore.flags.checkerboard = !$setup.paintStore.flags.checkerboard)
    }, null, 8, ["color"]),
    createVNode(QSeparator, {
      vertical: "",
      class: "q-mx-xs"
    }),
    createVNode(QBtnGroup, { flat: "" }, {
      default: withCtx(() => [
        createVNode(QBtn, {
          dense: "",
          icon: "mdi-undo",
          class: "q-px-sm",
          onClick: $setup.undo
        }),
        createVNode(QBtn, {
          dense: "",
          icon: "mdi-redo",
          class: "q-px-sm",
          onClick: $setup.redo
        })
      ]),
      _: 1
    }),
    createVNode(QSeparator, {
      vertical: "",
      class: "q-mx-xs"
    }),
    createVNode(QBtnGroup, { flat: "" }, {
      default: withCtx(() => [
        createVNode(QBtn, {
          icon: "mdi-magnify-minus-outline",
          class: "q-px-sm",
          onClick: _cache[2] || (_cache[2] = ($event) => $setup.zoom({ offset: -1 }))
        }),
        createVNode(QBtn, {
          icon: "mdi-magnify-plus-outline",
          class: "q-px-sm",
          onClick: _cache[3] || (_cache[3] = ($event) => $setup.zoom({ offset: 1 }))
        })
      ]),
      _: 1
    }),
    createVNode(QSeparator, {
      vertical: "",
      class: "q-mx-xs"
    }),
    createVNode(QBtn, {
      flat: "",
      icon: "mdi-file-download-outline",
      class: "q-px-sm",
      onClick: $setup.download
    }),
    createVNode(QBtn, {
      flat: "",
      icon: "mdi-delete-outline",
      class: "q-px-sm",
      color: "negative",
      onClick: $setup.clear
    })
  ])) : createCommentVNode("", true);
}
const PaintPixelControls = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__scopeId", "data-v-2d9053ce"], ["__file", "Controls.vue"]]);
function message(worker2, id) {
  return new Promise((resolve) => {
    worker2.addEventListener("message", function f({ data }) {
      if (data.id !== id) {
        return;
      }
      worker2.removeEventListener("message", f);
      resolve(data);
    });
  });
}
const emitter = createNanoEvents();
let worker;
function setup() {
  worker = new Worker(new URL(
    /* @vite-ignore */
    "/lab.flipper.net/assets/monochrome-worker-VEokNaXu.js",
    import.meta.url
  ), { type: "module" });
  worker.addEventListener("message", async (e) => {
    const { id, type, title, imageData } = e.data;
    if (type === "started") {
      emitter.emit("dither/start", { id, title });
    } else {
      emitter.emit("dither/result", { id, imageData });
    }
  });
  worker.addEventListener(
    "error",
    () => console.error("Error in monochrome worker")
  );
  const numBayerLevels = 4;
  const bayerWorker = new Worker(new URL(
    /* @vite-ignore */
    "/lab.flipper.net/assets/bayer-worker-DjyxqRvO.js",
    import.meta.url
  ), {
    name: "bayer",
    type: "module"
  });
  bayerWorker.addEventListener(
    "error",
    () => console.error("Error in bayer worker")
  );
  const bayerLevels = Array.from({ length: numBayerLevels }, (_2, id) => {
    bayerWorker.postMessage({
      level: id,
      id
    });
    return message(bayerWorker, id).then((m) => m.result);
  });
  Promise.all(bayerLevels).then(
    (bayerLevels2) => worker.postMessage({ bayerLevels: bayerLevels2, id: "bayerlevels" })
  );
}
function dither(image) {
  if (!worker) {
    setup();
  }
  worker.postMessage({
    id: "image",
    image
  });
}
const _sfc_main$1 = {
  __name: "Card",
  props: {
    img: Object
  },
  emits: ["cancel", "select"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit = __emit;
    const sourceImageData = ref(null);
    const ditherProcesses = ref([]);
    const sourceCanvasRef = ref(null);
    const unbindDitherStart = ref(null);
    const unbindDitherResult = ref(null);
    const drawSourceImg = () => {
      const sourceCtx = sourceCanvasRef.value.getContext("2d");
      sourceCtx.fillStyle = "white";
      sourceCtx.fillRect(0, 0, 128, 64);
      sourceCtx.drawImage(props.img, 0, 0, 128, 64);
      sourceImageData.value = sourceCtx.getImageData(0, 0, 128, 64);
      startDither();
    };
    const startDither = () => {
      unbindDitherStart.value = emitter.on("dither/start", onDitherStart);
      unbindDitherResult.value = emitter.on("dither/result", onDitherResult);
      dither(sourceImageData.value);
    };
    const onDitherStart = ({ id, title }) => {
      if (ditherProcesses.value.find((e) => e.id === id)) {
        return;
      }
      ditherProcesses.value.push({ id, title });
    };
    const onDitherResult = ({ id, imageData }) => {
      const p = ditherProcesses.value.find((e) => e.id === id);
      if (!p) {
        return;
      }
      p.imageData = imageData;
      setTimeout(() => {
        const ditherCanvas = document.querySelector(`canvas.${p.id}`);
        if (ditherCanvas) {
          ditherCanvas.getContext("2d").putImageData(imageData, 0, 0);
        }
      }, 150);
    };
    const cancel = () => {
      ditherProcesses.value = [];
      emit("cancel");
    };
    const select = (imageData) => {
      emit("select", imageData);
    };
    onMounted(() => {
      drawSourceImg();
    });
    const __returned__ = { props, emit, sourceImageData, ditherProcesses, sourceCanvasRef, unbindDitherStart, unbindDitherResult, drawSourceImg, startDither, onDitherStart, onDitherResult, cancel, select, ref, onMounted, get dither() {
      return dither;
    }, get emitter() {
      return emitter;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1$1 = {
  ref: "sourceCanvasRef",
  width: "128",
  height: "64",
  class: "q-ml-sm"
};
const _hoisted_2$1 = {
  key: 0,
  class: "canvas-placeholder flex flex-center"
};
const _hoisted_3 = ["onClick"];
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QCard, { style: { "width": "616px", "min-width": "300px" } }, {
    default: withCtx(() => [
      createVNode(QCardSection, null, {
        default: withCtx(() => _cache[0] || (_cache[0] = [
          createBaseVNode("div", { class: "text-h6" }, "Uploaded image", -1)
        ])),
        _: 1,
        __: [0]
      }),
      createVNode(QCardSection, { class: "q-pt-none" }, {
        default: withCtx(() => [
          createBaseVNode("canvas", _hoisted_1$1, null, 512)
        ]),
        _: 1
      }),
      $setup.ditherProcesses.length ? (openBlock(), createBlock(QCardSection, {
        key: 0,
        class: "q-pt-none"
      }, {
        default: withCtx(() => _cache[1] || (_cache[1] = [
          createBaseVNode("div", { class: "text-h6" }, "Select dithering method:", -1)
        ])),
        _: 1,
        __: [1]
      })) : createCommentVNode("", true),
      createVNode(QCardSection, { class: "q-py-none row justify-start" }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList($setup.ditherProcesses, (p) => {
            return openBlock(), createElementBlock("div", {
              key: p.id,
              class: "column flex-center q-ma-sm"
            }, [
              !p.imageData ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
                createVNode(QSpinner, {
                  color: "primary",
                  size: "3em"
                })
              ])) : (openBlock(), createElementBlock("canvas", {
                key: 1,
                class: normalizeClass(p.id),
                width: "128",
                height: "64",
                onClick: ($event) => $setup.select(p.imageData)
              }, null, 10, _hoisted_3)),
              createVNode(QTooltip, {
                offset: [0, 3],
                class: "bg-primary"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(p.title), 1)
                ]),
                _: 2
              }, 1024)
            ]);
          }), 128))
        ]),
        _: 1
      }),
      createVNode(QCardActions, { align: "right" }, {
        default: withCtx(() => [
          createVNode(QBtn, {
            flat: "",
            label: "Cancel",
            onClick: $setup.cancel
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const PaintDitherCard = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-1caa161a"], ["__file", "Card.vue"]]);
const componentName = "Paint";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Paint",
  setup(__props, { expose: __expose }) {
    __expose();
    const paintStore = usePaintStore();
    const pe = computed(() => paintStore.pe);
    const flipperStore = useFlipperStore();
    const mouseUp = () => {
      if (!pe.value) {
        return;
      }
      if (pe.value.drawing) {
        if (pe.value.mode === "line") {
          pe.value.save();
          pe.value.plotLine(pe.value.p0, pe.value.p1);
          pe.value.draw();
          pe.value.updated();
        } else if (pe.value.mode === "rect") {
          pe.value.save();
          pe.value.plotRect(pe.value.p0, pe.value.p1);
          pe.value.draw();
          pe.value.updated();
        }
        pe.value.drawing = false;
      }
    };
    const drawImage = (imageData) => {
      var _a;
      paintStore.flags.ditherDialog = false;
      const pixelData = [];
      for (let i = 0; i < imageData.data.length; i += 4) {
        if (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2] === 0) {
          pixelData.push(1);
        } else {
          pixelData.push(0);
        }
      }
      (_a = pe.value) == null ? void 0 : _a.setData(pixelData);
    };
    const startVirtualDisplay = async () => {
      var _a;
      await ((_a = flipperStore.flipper) == null ? void 0 : _a.RPC("guiStartVirtualDisplay").then(() => {
        console.log("guiStartVirtualDisplay enable");
      }).catch((error) => {
        rpcErrorHandler({
          componentName,
          error,
          command: "guiStartVirtualDisplay"
        });
        showNotif({
          message: "Couldn't start virtual display session",
          color: "negative"
        });
        throw error;
      }));
    };
    const stopVirtualDisplay = async () => {
      var _a;
      await ((_a = flipperStore.flipper) == null ? void 0 : _a.RPC("guiStopVirtualDisplay").then(() => {
        console.log("guiStartVirtualDisplay disabled");
      }).catch(
        (error) => rpcErrorHandler({
          componentName,
          error,
          command: "guiStopVirtualDisplay"
        })
      ));
    };
    const enableBacklight = throttle(async () => {
      var _a, _b, _c;
      await ((_a = flipperStore.flipper) == null ? void 0 : _a.RPC("guiSendInputEvent", { key: "OK", type: "PRESS" }).catch(
        (error) => rpcErrorHandler({ componentName, error, command: "guiSendInputEvent" })
      ));
      await ((_b = flipperStore.flipper) == null ? void 0 : _b.RPC("guiSendInputEvent", { key: "OK", type: "SHORT" }).catch(
        (error) => rpcErrorHandler({ componentName, error, command: "guiSendInputEvent" })
      ));
      await ((_c = flipperStore.flipper) == null ? void 0 : _c.RPC("guiSendInputEvent", { key: "OK", type: "RELEASE" }).catch(
        (error) => rpcErrorHandler({ componentName, error, command: "guiSendInputEvent" })
      ));
    }, 1e3);
    const sendFrame = throttle(async () => {
      var _a;
      if (pe.value) {
        const imageData = pe.value.toImageData();
        const xbmBytes = imageDataToXBM(imageData);
        await ((_a = flipperStore.flipper) == null ? void 0 : _a.RPC("guiScreenFrame", {
          data: new Uint8Array(xbmBytes)
        }));
      }
    }, 100);
    const handleInteraction = (event) => {
      var _a;
      if (event instanceof MouseEvent && event.buttons || event instanceof KeyboardEvent && (event.code === "ArrowRight" || event.code === "ArrowLeft" || event.code === "ArrowDown" || event.code === "ArrowUp") && ((_a = pe.value) == null ? void 0 : _a.drawing)) {
        enableBacklight();
        sendFrame();
      }
    };
    paintStore.setCallbackFrame(() => {
      enableBacklight();
      sendFrame();
    });
    onMounted(async () => {
      var _a;
      if (flipperStore.flipperReady) {
        if (!flipperStore.rpcActive) {
          await ((_a = flipperStore.flipper) == null ? void 0 : _a.startRPCSession());
        }
        await startVirtualDisplay();
      }
    });
    watch(
      () => {
        var _a;
        return (_a = flipperStore.flipper) == null ? void 0 : _a.flipperReady;
      },
      async (newValue) => {
        if (newValue) {
          await startVirtualDisplay();
        } else {
          if (!flipperStore.isElectron) {
            await stopVirtualDisplay();
          }
        }
      }
    );
    watch(
      () => flipperStore.flags.switchFlipper,
      async (newValue, oldValue) => {
        if (newValue !== oldValue && newValue === true && oldValue === false) {
          await stopVirtualDisplay();
        }
      }
    );
    onBeforeUnmount(() => {
      stopVirtualDisplay();
    });
    const __returned__ = { paintStore, pe, flipperStore, componentName, mouseUp, drawImage, startVirtualDisplay, stopVirtualDisplay, enableBacklight, sendFrame, handleInteraction, get GenericPageLayout() {
      return GenericPageLayout;
    }, get PaintPixelEditor() {
      return PaintPixelEditor;
    }, get PaintPixelControls() {
      return PaintPixelControls;
    }, get PaintDitherCard() {
      return PaintDitherCard;
    }, get PaintMirror() {
      return PaintMirror;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = { class: "column fit" };
const _hoisted_2 = { class: "col fit column items-center paint" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock($setup["GenericPageLayout"], {
    title: "Paint",
    icon: "flipper:paint",
    description: "Pixel editor for Flipper, streamed to the device",
    class: "relative-position"
  }, {
    info: withCtx(() => _cache[2] || (_cache[2] = [
      createBaseVNode("h6", { class: "q-mt-none q-mb-sm" }, "About Paint", -1),
      createBaseVNode("p", null, " Draw pixel art or test UI elements right on your Flipper's screen. The editor is streamed to the device in real-time. Use basic drawing tools, upload images and export the Paint canvas to a PNG when you're done. ", -1),
      createBaseVNode("p", null, " The bottom right corner shows the canvas in real size (128x64 pixels). Saved images will have the same resolution. The checkerboard background is not part of the image and serves as a visual aid. ", -1),
      createBaseVNode("p", { class: "q-mb-none" }, " Note that Flipper has to be unlocked to be able to show the image on the screen. ", -1)
    ])),
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createVNode(QPageSticky, {
            position: "bottom",
            offset: [16, 40]
          }, {
            default: withCtx(() => [
              createVNode($setup["PaintPixelControls"])
            ]),
            _: 1
          }),
          createVNode($setup["PaintPixelEditor"], {
            class: "col",
            onKeydown: $setup.handleInteraction,
            onMouseup: $setup.mouseUp,
            onMousemove: $setup.handleInteraction
          }),
          createVNode(QPageSticky, {
            position: "bottom-right",
            offset: [8, 8]
          }, {
            default: withCtx(() => [
              createVNode($setup["PaintMirror"])
            ]),
            _: 1
          }),
          createVNode(QDialog, {
            modelValue: $setup.paintStore.flags.ditherDialog,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.paintStore.flags.ditherDialog = $event)
          }, {
            default: withCtx(() => [
              createVNode($setup["PaintDitherCard"], {
                img: $setup.paintStore.uploadedImage,
                onCancel: _cache[0] || (_cache[0] = ($event) => $setup.paintStore.flags.ditherDialog = false),
                onSelect: $setup.drawImage
              }, null, 8, ["img"])
            ]),
            _: 1
          }, 8, ["modelValue"])
        ])
      ])
    ]),
    _: 1
  });
}
const Paint = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-85ded7b4"], ["__file", "Paint.vue"]]);
export {
  Paint as PaintPage
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgtQ25LY09RWEwuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvcGFnZS1zdGlja3kvdXNlLXBhZ2Utc3RpY2t5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9wYWdlLXN0aWNreS9RUGFnZVN0aWNreS5qcyIsIi4uLy4uLy4uL3NyYy9zaGFyZWQvbGliL3V0aWxzL3BpeGVsZWRpdG9yL3hibS12YWx1ZXMuanMiLCIuLi8uLi8uLi9zcmMvc2hhcmVkL2xpYi91dGlscy9waXhlbGVkaXRvci94Ym0uanMiLCIuLi8uLi8uLi9zcmMvc2hhcmVkL2xpYi91dGlscy9waXhlbGVkaXRvci9kb20uanMiLCIuLi8uLi8uLi9zcmMvc2hhcmVkL2xpYi91dGlscy9waXhlbGVkaXRvci9waXhlbGVkaXRvci5qcyIsIi4uLy4uLy4uL3NyYy9lbnRpdGllcy9QYWludC9tb2RlbC9zdG9yZXMudHMiLCIuLi8uLi8uLi9zcmMvZW50aXRpZXMvUGFpbnQvdWkvTWlycm9yLnZ1ZSIsIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9QYWludC9QaXhlbEVkaXRvci91aS9FZGl0b3IudnVlIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9idG4tdG9nZ2xlL1FCdG5Ub2dnbGUuanMiLCIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvUGFpbnQvUGl4ZWxFZGl0b3IvdWkvQ29udHJvbHMudnVlIiwiLi4vLi4vLi4vc3JjL3NoYXJlZC9saWIvdXRpbHMvZGl0aGVycHVuay93b3JrZXItdXRpbHMuanMiLCIuLi8uLi8uLi9zcmMvc2hhcmVkL2xpYi91dGlscy9kaXRoZXJwdW5rL21vbm9jaHJvbWUuanMiLCIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvUGFpbnQvRGl0aGVyL3VpL0NhcmQudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL1BhaW50L3VpL1BhaW50LnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoLCBjb21wdXRlZCwgaW5qZWN0LCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuaW1wb3J0IHsgbGF5b3V0S2V5LCBlbXB0eVJlbmRlckZuIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5zeW1ib2xzL3N5bWJvbHMuanMnXG5cbmV4cG9ydCBjb25zdCB1c2VQYWdlU3RpY2t5UHJvcHMgPSB7XG4gIHBvc2l0aW9uOiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICAgIGRlZmF1bHQ6ICdib3R0b20tcmlnaHQnLFxuICAgIHZhbGlkYXRvcjogdiA9PiBbXG4gICAgICAndG9wLXJpZ2h0JywgJ3RvcC1sZWZ0JyxcbiAgICAgICdib3R0b20tcmlnaHQnLCAnYm90dG9tLWxlZnQnLFxuICAgICAgJ3RvcCcsICdyaWdodCcsICdib3R0b20nLCAnbGVmdCdcbiAgICBdLmluY2x1ZGVzKHYpXG4gIH0sXG4gIG9mZnNldDoge1xuICAgIHR5cGU6IEFycmF5LFxuICAgIHZhbGlkYXRvcjogdiA9PiB2Lmxlbmd0aCA9PT0gMlxuICB9LFxuICBleHBhbmQ6IEJvb2xlYW5cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICBjb25zdCB7IHByb3BzLCBwcm94eTogeyAkcSB9IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gIGNvbnN0ICRsYXlvdXQgPSBpbmplY3QobGF5b3V0S2V5LCBlbXB0eVJlbmRlckZuKVxuICBpZiAoJGxheW91dCA9PT0gZW1wdHlSZW5kZXJGbikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1FQYWdlU3RpY2t5IG5lZWRzIHRvIGJlIGNoaWxkIG9mIFFMYXlvdXQnKVxuICAgIHJldHVybiBlbXB0eVJlbmRlckZuXG4gIH1cblxuICBjb25zdCBhdHRhY2ggPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgY29uc3QgcG9zID0gcHJvcHMucG9zaXRpb25cblxuICAgIHJldHVybiB7XG4gICAgICB0b3A6IHBvcy5pbmRleE9mKCd0b3AnKSAhPT0gLTEsXG4gICAgICByaWdodDogcG9zLmluZGV4T2YoJ3JpZ2h0JykgIT09IC0xLFxuICAgICAgYm90dG9tOiBwb3MuaW5kZXhPZignYm90dG9tJykgIT09IC0xLFxuICAgICAgbGVmdDogcG9zLmluZGV4T2YoJ2xlZnQnKSAhPT0gLTEsXG4gICAgICB2ZXJ0aWNhbDogcG9zID09PSAndG9wJyB8fCBwb3MgPT09ICdib3R0b20nLFxuICAgICAgaG9yaXpvbnRhbDogcG9zID09PSAnbGVmdCcgfHwgcG9zID09PSAncmlnaHQnXG4gICAgfVxuICB9KVxuXG4gIGNvbnN0IHRvcCA9IGNvbXB1dGVkKCgpID0+ICRsYXlvdXQuaGVhZGVyLm9mZnNldClcbiAgY29uc3QgcmlnaHQgPSBjb21wdXRlZCgoKSA9PiAkbGF5b3V0LnJpZ2h0Lm9mZnNldClcbiAgY29uc3QgYm90dG9tID0gY29tcHV0ZWQoKCkgPT4gJGxheW91dC5mb290ZXIub2Zmc2V0KVxuICBjb25zdCBsZWZ0ID0gY29tcHV0ZWQoKCkgPT4gJGxheW91dC5sZWZ0Lm9mZnNldClcblxuICBjb25zdCBzdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBsZXQgcG9zWCA9IDAsIHBvc1kgPSAwXG5cbiAgICBjb25zdCBzaWRlID0gYXR0YWNoLnZhbHVlXG4gICAgY29uc3QgZGlyID0gJHEubGFuZy5ydGwgPT09IHRydWUgPyAtMSA6IDFcblxuICAgIGlmIChzaWRlLnRvcCA9PT0gdHJ1ZSAmJiB0b3AudmFsdWUgIT09IDApIHtcbiAgICAgIHBvc1kgPSBgJHsgdG9wLnZhbHVlIH1weGBcbiAgICB9XG4gICAgZWxzZSBpZiAoc2lkZS5ib3R0b20gPT09IHRydWUgJiYgYm90dG9tLnZhbHVlICE9PSAwKSB7XG4gICAgICBwb3NZID0gYCR7IC1ib3R0b20udmFsdWUgfXB4YFxuICAgIH1cblxuICAgIGlmIChzaWRlLmxlZnQgPT09IHRydWUgJiYgbGVmdC52YWx1ZSAhPT0gMCkge1xuICAgICAgcG9zWCA9IGAkeyBkaXIgKiBsZWZ0LnZhbHVlIH1weGBcbiAgICB9XG4gICAgZWxzZSBpZiAoc2lkZS5yaWdodCA9PT0gdHJ1ZSAmJiByaWdodC52YWx1ZSAhPT0gMCkge1xuICAgICAgcG9zWCA9IGAkeyAtZGlyICogcmlnaHQudmFsdWUgfXB4YFxuICAgIH1cblxuICAgIGNvbnN0IGNzcyA9IHsgdHJhbnNmb3JtOiBgdHJhbnNsYXRlKCR7IHBvc1ggfSwgJHsgcG9zWSB9KWAgfVxuXG4gICAgaWYgKHByb3BzLm9mZnNldCkge1xuICAgICAgY3NzLm1hcmdpbiA9IGAkeyBwcm9wcy5vZmZzZXRbIDEgXSB9cHggJHsgcHJvcHMub2Zmc2V0WyAwIF0gfXB4YFxuICAgIH1cblxuICAgIGlmIChzaWRlLnZlcnRpY2FsID09PSB0cnVlKSB7XG4gICAgICBpZiAobGVmdC52YWx1ZSAhPT0gMCkge1xuICAgICAgICBjc3NbICRxLmxhbmcucnRsID09PSB0cnVlID8gJ3JpZ2h0JyA6ICdsZWZ0JyBdID0gYCR7IGxlZnQudmFsdWUgfXB4YFxuICAgICAgfVxuICAgICAgaWYgKHJpZ2h0LnZhbHVlICE9PSAwKSB7XG4gICAgICAgIGNzc1sgJHEubGFuZy5ydGwgPT09IHRydWUgPyAnbGVmdCcgOiAncmlnaHQnIF0gPSBgJHsgcmlnaHQudmFsdWUgfXB4YFxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChzaWRlLmhvcml6b250YWwgPT09IHRydWUpIHtcbiAgICAgIGlmICh0b3AudmFsdWUgIT09IDApIHtcbiAgICAgICAgY3NzLnRvcCA9IGAkeyB0b3AudmFsdWUgfXB4YFxuICAgICAgfVxuICAgICAgaWYgKGJvdHRvbS52YWx1ZSAhPT0gMCkge1xuICAgICAgICBjc3MuYm90dG9tID0gYCR7IGJvdHRvbS52YWx1ZSB9cHhgXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNzc1xuICB9KVxuXG4gIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgIGBxLXBhZ2Utc3RpY2t5IHJvdyBmbGV4LWNlbnRlciBmaXhlZC0keyBwcm9wcy5wb3NpdGlvbiB9YFxuICAgICsgYCBxLXBhZ2Utc3RpY2t5LS0keyBwcm9wcy5leHBhbmQgPT09IHRydWUgPyAnZXhwYW5kJyA6ICdzaHJpbmsnIH1gXG4gIClcblxuICBmdW5jdGlvbiBnZXRTdGlja3lDb250ZW50IChzbG90cykge1xuICAgIGNvbnN0IGNvbnRlbnQgPSBoU2xvdChzbG90cy5kZWZhdWx0KVxuXG4gICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlLFxuICAgICAgc3R5bGU6IHN0eWxlLnZhbHVlXG4gICAgfSxcbiAgICBwcm9wcy5leHBhbmQgPT09IHRydWVcbiAgICAgID8gY29udGVudFxuICAgICAgOiBbIGgoJ2RpdicsIGNvbnRlbnQpIF1cbiAgICApXG4gIH1cblxuICByZXR1cm4ge1xuICAgICRsYXlvdXQsXG4gICAgZ2V0U3RpY2t5Q29udGVudFxuICB9XG59XG4iLCJpbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgdXNlUGFnZVN0aWNreSwgeyB1c2VQYWdlU3RpY2t5UHJvcHMgfSBmcm9tICcuL3VzZS1wYWdlLXN0aWNreS5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FQYWdlU3RpY2t5JyxcblxuICBwcm9wczogdXNlUGFnZVN0aWNreVByb3BzLFxuXG4gIHNldHVwIChfLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCB7IGdldFN0aWNreUNvbnRlbnQgfSA9IHVzZVBhZ2VTdGlja3koKVxuICAgIHJldHVybiAoKSA9PiBnZXRTdGlja3lDb250ZW50KHNsb3RzKVxuICB9XG59KVxuIiwiZXhwb3J0IGNvbnN0IHhibVZhbHVlcyA9IHtcbiAgMDogW10sXG4gIDE6IFswXSxcbiAgMjogWzFdLFxuICAzOiBbMCwgMV0sXG4gIDQ6IFsyXSxcbiAgNTogWzAsIDJdLFxuICA2OiBbMSwgMl0sXG4gIDc6IFswLCAxLCAyXSxcbiAgODogWzNdLFxuICA5OiBbMCwgM10sXG4gIDEwOiBbMSwgM10sXG4gIDExOiBbMCwgMSwgM10sXG4gIDEyOiBbMiwgM10sXG4gIDEzOiBbMCwgMiwgM10sXG4gIDE0OiBbMSwgMiwgM10sXG4gIDE1OiBbMCwgMSwgMiwgM10sXG4gIDE2OiBbNF0sXG4gIDE3OiBbMCwgNF0sXG4gIDE4OiBbMSwgNF0sXG4gIDE5OiBbMCwgMSwgNF0sXG4gIDIwOiBbMiwgNF0sXG4gIDIxOiBbMCwgMiwgNF0sXG4gIDIyOiBbMSwgMiwgNF0sXG4gIDIzOiBbMCwgMSwgMiwgNF0sXG4gIDI0OiBbMywgNF0sXG4gIDI1OiBbMCwgMywgNF0sXG4gIDI2OiBbMSwgMywgNF0sXG4gIDI3OiBbMCwgMSwgMywgNF0sXG4gIDI4OiBbMiwgMywgNF0sXG4gIDI5OiBbMCwgMiwgMywgNF0sXG4gIDMwOiBbMSwgMiwgMywgNF0sXG4gIDMxOiBbMCwgMSwgMiwgMywgNF0sXG4gIDMyOiBbNV0sXG4gIDMzOiBbMCwgNV0sXG4gIDM0OiBbMSwgNV0sXG4gIDM1OiBbMCwgMSwgNV0sXG4gIDM2OiBbMiwgNV0sXG4gIDM3OiBbMCwgMiwgNV0sXG4gIDM4OiBbMSwgMiwgNV0sXG4gIDM5OiBbMCwgMSwgMiwgNV0sXG4gIDQwOiBbMywgNV0sXG4gIDQxOiBbMCwgMywgNV0sXG4gIDQyOiBbMSwgMywgNV0sXG4gIDQzOiBbMCwgMSwgMywgNV0sXG4gIDQ0OiBbMiwgMywgNV0sXG4gIDQ1OiBbMCwgMiwgMywgNV0sXG4gIDQ2OiBbMSwgMiwgMywgNV0sXG4gIDQ3OiBbMCwgMSwgMiwgMywgNV0sXG4gIDQ4OiBbNCwgNV0sXG4gIDQ5OiBbMCwgNCwgNV0sXG4gIDUwOiBbMSwgNCwgNV0sXG4gIDUxOiBbMCwgMSwgNCwgNV0sXG4gIDUyOiBbMiwgNCwgNV0sXG4gIDUzOiBbMCwgMiwgNCwgNV0sXG4gIDU0OiBbMSwgMiwgNCwgNV0sXG4gIDU1OiBbMCwgMSwgMiwgNCwgNV0sXG4gIDU2OiBbMywgNCwgNV0sXG4gIDU3OiBbMCwgMywgNCwgNV0sXG4gIDU4OiBbMSwgMywgNCwgNV0sXG4gIDU5OiBbMCwgMSwgMywgNCwgNV0sXG4gIDYwOiBbMiwgMywgNCwgNV0sXG4gIDYxOiBbMCwgMiwgMywgNCwgNV0sXG4gIDYyOiBbMSwgMiwgMywgNCwgNV0sXG4gIDYzOiBbMCwgMSwgMiwgMywgNCwgNV0sXG4gIDY0OiBbNl0sXG4gIDY1OiBbMCwgNl0sXG4gIDY2OiBbMSwgNl0sXG4gIDY3OiBbMCwgMSwgNl0sXG4gIDY4OiBbMiwgNl0sXG4gIDY5OiBbMCwgMiwgNl0sXG4gIDcwOiBbMSwgMiwgNl0sXG4gIDcxOiBbMCwgMSwgMiwgNl0sXG4gIDcyOiBbMywgNl0sXG4gIDczOiBbMCwgMywgNl0sXG4gIDc0OiBbMSwgMywgNl0sXG4gIDc1OiBbMCwgMSwgMywgNl0sXG4gIDc2OiBbMiwgMywgNl0sXG4gIDc3OiBbMCwgMiwgMywgNl0sXG4gIDc4OiBbMSwgMiwgMywgNl0sXG4gIDc5OiBbMCwgMSwgMiwgMywgNl0sXG4gIDgwOiBbNCwgNl0sXG4gIDgxOiBbMCwgNCwgNl0sXG4gIDgyOiBbMSwgNCwgNl0sXG4gIDgzOiBbMCwgMSwgNCwgNl0sXG4gIDg0OiBbMiwgNCwgNl0sXG4gIDg1OiBbMCwgMiwgNCwgNl0sXG4gIDg2OiBbMSwgMiwgNCwgNl0sXG4gIDg3OiBbMCwgMSwgMiwgNCwgNl0sXG4gIDg4OiBbMywgNCwgNl0sXG4gIDg5OiBbMCwgMywgNCwgNl0sXG4gIDkwOiBbMSwgMywgNCwgNl0sXG4gIDkxOiBbMCwgMSwgMywgNCwgNl0sXG4gIDkyOiBbMiwgMywgNCwgNl0sXG4gIDkzOiBbMCwgMiwgMywgNCwgNl0sXG4gIDk0OiBbMSwgMiwgMywgNCwgNl0sXG4gIDk1OiBbMCwgMSwgMiwgMywgNCwgNl0sXG4gIDk2OiBbNSwgNl0sXG4gIDk3OiBbMCwgNSwgNl0sXG4gIDk4OiBbMSwgNSwgNl0sXG4gIDk5OiBbMCwgMSwgNSwgNl0sXG4gIDEwMDogWzIsIDUsIDZdLFxuICAxMDE6IFswLCAyLCA1LCA2XSxcbiAgMTAyOiBbMSwgMiwgNSwgNl0sXG4gIDEwMzogWzAsIDEsIDIsIDUsIDZdLFxuICAxMDQ6IFszLCA1LCA2XSxcbiAgMTA1OiBbMCwgMywgNSwgNl0sXG4gIDEwNjogWzEsIDMsIDUsIDZdLFxuICAxMDc6IFswLCAxLCAzLCA1LCA2XSxcbiAgMTA4OiBbMiwgMywgNSwgNl0sXG4gIDEwOTogWzAsIDIsIDMsIDUsIDZdLFxuICAxMTA6IFsxLCAyLCAzLCA1LCA2XSxcbiAgMTExOiBbMCwgMSwgMiwgMywgNSwgNl0sXG4gIDExMjogWzQsIDUsIDZdLFxuICAxMTM6IFswLCA0LCA1LCA2XSxcbiAgMTE0OiBbMSwgNCwgNSwgNl0sXG4gIDExNTogWzAsIDEsIDQsIDUsIDZdLFxuICAxMTY6IFsyLCA0LCA1LCA2XSxcbiAgMTE3OiBbMCwgMiwgNCwgNSwgNl0sXG4gIDExODogWzEsIDIsIDQsIDUsIDZdLFxuICAxMTk6IFswLCAxLCAyLCA0LCA1LCA2XSxcbiAgMTIwOiBbMywgNCwgNSwgNl0sXG4gIDEyMTogWzAsIDMsIDQsIDUsIDZdLFxuICAxMjI6IFsxLCAzLCA0LCA1LCA2XSxcbiAgMTIzOiBbMCwgMSwgMywgNCwgNSwgNl0sXG4gIDEyNDogWzIsIDMsIDQsIDUsIDZdLFxuICAxMjU6IFswLCAyLCAzLCA0LCA1LCA2XSxcbiAgMTI2OiBbMSwgMiwgMywgNCwgNSwgNl0sXG4gIDEyNzogWzAsIDEsIDIsIDMsIDQsIDUsIDZdLFxuICAxMjg6IFs3XSxcbiAgMTI5OiBbMCwgN10sXG4gIDEzMDogWzEsIDddLFxuICAxMzE6IFswLCAxLCA3XSxcbiAgMTMyOiBbMiwgN10sXG4gIDEzMzogWzAsIDIsIDddLFxuICAxMzQ6IFsxLCAyLCA3XSxcbiAgMTM1OiBbMCwgMSwgMiwgN10sXG4gIDEzNjogWzMsIDddLFxuICAxMzc6IFswLCAzLCA3XSxcbiAgMTM4OiBbMSwgMywgN10sXG4gIDEzOTogWzAsIDEsIDMsIDddLFxuICAxNDA6IFsyLCAzLCA3XSxcbiAgMTQxOiBbMCwgMiwgMywgN10sXG4gIDE0MjogWzEsIDIsIDMsIDddLFxuICAxNDM6IFswLCAxLCAyLCAzLCA3XSxcbiAgMTQ0OiBbNCwgN10sXG4gIDE0NTogWzAsIDQsIDddLFxuICAxNDY6IFsxLCA0LCA3XSxcbiAgMTQ3OiBbMCwgMSwgNCwgN10sXG4gIDE0ODogWzIsIDQsIDddLFxuICAxNDk6IFswLCAyLCA0LCA3XSxcbiAgMTUwOiBbMSwgMiwgNCwgN10sXG4gIDE1MTogWzAsIDEsIDIsIDQsIDddLFxuICAxNTI6IFszLCA0LCA3XSxcbiAgMTUzOiBbMCwgMywgNCwgN10sXG4gIDE1NDogWzEsIDMsIDQsIDddLFxuICAxNTU6IFswLCAxLCAzLCA0LCA3XSxcbiAgMTU2OiBbMiwgMywgNCwgN10sXG4gIDE1NzogWzAsIDIsIDMsIDQsIDddLFxuICAxNTg6IFsxLCAyLCAzLCA0LCA3XSxcbiAgMTU5OiBbMCwgMSwgMiwgMywgNCwgN10sXG4gIDE2MDogWzUsIDddLFxuICAxNjE6IFswLCA1LCA3XSxcbiAgMTYyOiBbMSwgNSwgN10sXG4gIDE2MzogWzAsIDEsIDUsIDddLFxuICAxNjQ6IFsyLCA1LCA3XSxcbiAgMTY1OiBbMCwgMiwgNSwgN10sXG4gIDE2NjogWzEsIDIsIDUsIDddLFxuICAxNjc6IFswLCAxLCAyLCA1LCA3XSxcbiAgMTY4OiBbMywgNSwgN10sXG4gIDE2OTogWzAsIDMsIDUsIDddLFxuICAxNzA6IFsxLCAzLCA1LCA3XSxcbiAgMTcxOiBbMCwgMSwgMywgNSwgN10sXG4gIDE3MjogWzIsIDMsIDUsIDddLFxuICAxNzM6IFswLCAyLCAzLCA1LCA3XSxcbiAgMTc0OiBbMSwgMiwgMywgNSwgN10sXG4gIDE3NTogWzAsIDEsIDIsIDMsIDUsIDddLFxuICAxNzY6IFs0LCA1LCA3XSxcbiAgMTc3OiBbMCwgNCwgNSwgN10sXG4gIDE3ODogWzEsIDQsIDUsIDddLFxuICAxNzk6IFswLCAxLCA0LCA1LCA3XSxcbiAgMTgwOiBbMiwgNCwgNSwgN10sXG4gIDE4MTogWzAsIDIsIDQsIDUsIDddLFxuICAxODI6IFsxLCAyLCA0LCA1LCA3XSxcbiAgMTgzOiBbMCwgMSwgMiwgNCwgNSwgN10sXG4gIDE4NDogWzMsIDQsIDUsIDddLFxuICAxODU6IFswLCAzLCA0LCA1LCA3XSxcbiAgMTg2OiBbMSwgMywgNCwgNSwgN10sXG4gIDE4NzogWzAsIDEsIDMsIDQsIDUsIDddLFxuICAxODg6IFsyLCAzLCA0LCA1LCA3XSxcbiAgMTg5OiBbMCwgMiwgMywgNCwgNSwgN10sXG4gIDE5MDogWzEsIDIsIDMsIDQsIDUsIDddLFxuICAxOTE6IFswLCAxLCAyLCAzLCA0LCA1LCA3XSxcbiAgMTkyOiBbNiwgN10sXG4gIDE5MzogWzAsIDYsIDddLFxuICAxOTQ6IFsxLCA2LCA3XSxcbiAgMTk1OiBbMCwgMSwgNiwgN10sXG4gIDE5NjogWzIsIDYsIDddLFxuICAxOTc6IFswLCAyLCA2LCA3XSxcbiAgMTk4OiBbMSwgMiwgNiwgN10sXG4gIDE5OTogWzAsIDEsIDIsIDYsIDddLFxuICAyMDA6IFszLCA2LCA3XSxcbiAgMjAxOiBbMCwgMywgNiwgN10sXG4gIDIwMjogWzEsIDMsIDYsIDddLFxuICAyMDM6IFswLCAxLCAzLCA2LCA3XSxcbiAgMjA0OiBbMiwgMywgNiwgN10sXG4gIDIwNTogWzAsIDIsIDMsIDYsIDddLFxuICAyMDY6IFsxLCAyLCAzLCA2LCA3XSxcbiAgMjA3OiBbMCwgMSwgMiwgMywgNiwgN10sXG4gIDIwODogWzQsIDYsIDddLFxuICAyMDk6IFswLCA0LCA2LCA3XSxcbiAgMjEwOiBbMSwgNCwgNiwgN10sXG4gIDIxMTogWzAsIDEsIDQsIDYsIDddLFxuICAyMTI6IFsyLCA0LCA2LCA3XSxcbiAgMjEzOiBbMCwgMiwgNCwgNiwgN10sXG4gIDIxNDogWzEsIDIsIDQsIDYsIDddLFxuICAyMTU6IFswLCAxLCAyLCA0LCA2LCA3XSxcbiAgMjE2OiBbMywgNCwgNiwgN10sXG4gIDIxNzogWzAsIDMsIDQsIDYsIDddLFxuICAyMTg6IFsxLCAzLCA0LCA2LCA3XSxcbiAgMjE5OiBbMCwgMSwgMywgNCwgNiwgN10sXG4gIDIyMDogWzIsIDMsIDQsIDYsIDddLFxuICAyMjE6IFswLCAyLCAzLCA0LCA2LCA3XSxcbiAgMjIyOiBbMSwgMiwgMywgNCwgNiwgN10sXG4gIDIyMzogWzAsIDEsIDIsIDMsIDQsIDYsIDddLFxuICAyMjQ6IFs1LCA2LCA3XSxcbiAgMjI1OiBbMCwgNSwgNiwgN10sXG4gIDIyNjogWzEsIDUsIDYsIDddLFxuICAyMjc6IFswLCAxLCA1LCA2LCA3XSxcbiAgMjI4OiBbMiwgNSwgNiwgN10sXG4gIDIyOTogWzAsIDIsIDUsIDYsIDddLFxuICAyMzA6IFsxLCAyLCA1LCA2LCA3XSxcbiAgMjMxOiBbMCwgMSwgMiwgNSwgNiwgN10sXG4gIDIzMjogWzMsIDUsIDYsIDddLFxuICAyMzM6IFswLCAzLCA1LCA2LCA3XSxcbiAgMjM0OiBbMSwgMywgNSwgNiwgN10sXG4gIDIzNTogWzAsIDEsIDMsIDUsIDYsIDddLFxuICAyMzY6IFsyLCAzLCA1LCA2LCA3XSxcbiAgMjM3OiBbMCwgMiwgMywgNSwgNiwgN10sXG4gIDIzODogWzEsIDIsIDMsIDUsIDYsIDddLFxuICAyMzk6IFswLCAxLCAyLCAzLCA1LCA2LCA3XSxcbiAgMjQwOiBbNCwgNSwgNiwgN10sXG4gIDI0MTogWzAsIDQsIDUsIDYsIDddLFxuICAyNDI6IFsxLCA0LCA1LCA2LCA3XSxcbiAgMjQzOiBbMCwgMSwgNCwgNSwgNiwgN10sXG4gIDI0NDogWzIsIDQsIDUsIDYsIDddLFxuICAyNDU6IFswLCAyLCA0LCA1LCA2LCA3XSxcbiAgMjQ2OiBbMSwgMiwgNCwgNSwgNiwgN10sXG4gIDI0NzogWzAsIDEsIDIsIDQsIDUsIDYsIDddLFxuICAyNDg6IFszLCA0LCA1LCA2LCA3XSxcbiAgMjQ5OiBbMCwgMywgNCwgNSwgNiwgN10sXG4gIDI1MDogWzEsIDMsIDQsIDUsIDYsIDddLFxuICAyNTE6IFswLCAxLCAzLCA0LCA1LCA2LCA3XSxcbiAgMjUyOiBbMiwgMywgNCwgNSwgNiwgN10sXG4gIDI1MzogWzAsIDIsIDMsIDQsIDUsIDYsIDddLFxuICAyNTQ6IFsxLCAyLCAzLCA0LCA1LCA2LCA3XSxcbiAgMjU1OiBbMCwgMSwgMiwgMywgNCwgNSwgNiwgN11cbn1cbiIsImltcG9ydCB7IHhibVZhbHVlcyB9IGZyb20gJy4veGJtLXZhbHVlcydcblxuZXhwb3J0IGZ1bmN0aW9uIGltYWdlRGF0YVRvWEJNIChpbWFnZURhdGEpIHtcbiAgY29uc3QgZGF0YSA9IGltYWdlRGF0YS5kYXRhXG4gIGxldCBwaXhlbCA9IDBcbiAgbGV0IGFjdHVhbFJvdyA9IDFcbiAgY29uc3QgeGJtQnl0ZXMgPSBbXVxuXG4gIGZvciAobGV0IGMgPSAwOyBjIDwgNjQ7IGMrKykge1xuICAgIGZvciAobGV0IGMyID0gMDsgYzIgPCAxMjggLyA4OyBjMisrKSB7XG4gICAgICBjb25zdCBoZXhCaXRzID0gW11cbiAgICAgIGZvciAobGV0IGMzID0gMDsgYzMgPCA4OyBjMysrKSB7XG4gICAgICAgIGNvbnN0IHBpeGVsSXNCbGFjayA9ICEoZGF0YVtwaXhlbCAqIDRdKVxuICAgICAgICBpZiAocGl4ZWxJc0JsYWNrKSB7IGhleEJpdHMucHVzaChjMykgfVxuICAgICAgICBwaXhlbCsrXG4gICAgICAgIGNvbnN0IGlzTmV3Um93ID0gcGl4ZWwgLyAoMTI4ICogYWN0dWFsUm93KSA9PT0gMVxuICAgICAgICBpZiAoaXNOZXdSb3cpIHtcbiAgICAgICAgICBhY3R1YWxSb3crK1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGM0ID0gMDsgYzQgPCAyNTY7IGM0KyspIHtcbiAgICAgICAgaWYgKEpTT04uc3RyaW5naWZ5KHhibVZhbHVlc1tTdHJpbmcoYzQpXSkgPT09IEpTT04uc3RyaW5naWZ5KGhleEJpdHMpKSB7XG4gICAgICAgICAgeGJtQnl0ZXMucHVzaChjNClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB4Ym1CeXRlc1xufVxuIiwiLyogRE9NIGhlbHBlciBmdW5jdGlvbnMgKi9cblxuZXhwb3J0IGNvbnN0ICQgPSAoc2VsZWN0b3IsIHNjb3BlID0gZG9jdW1lbnQpID0+IHNjb3BlLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXG5leHBvcnQgY29uc3QgJCQgPSAoc2VsZWN0b3IsIHNjb3BlID0gZG9jdW1lbnQpID0+IFtcbiAgLi4uc2NvcGUucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcilcbl1cblxuLy8gcmVzb2x2ZXMgb2Zmc2V0TGVmdC9Ub3AgdG8gdGhlIHJvb3Qgb2YgdGhlIGRvY3VtZW50XG5leHBvcnQgY29uc3QgZ2V0TGVmdCA9IGVsID0+XG4gIChlbC5vZmZzZXRQYXJlbnQgPyBnZXRMZWZ0KGVsLm9mZnNldFBhcmVudCkgLSBlbC5vZmZzZXRQYXJlbnQuc2Nyb2xsTGVmdCA6IDApICsgZWwub2Zmc2V0TGVmdFxuZXhwb3J0IGNvbnN0IGdldFRvcCA9IGVsID0+XG4gIChlbC5vZmZzZXRQYXJlbnQgPyBnZXRUb3AoZWwub2Zmc2V0UGFyZW50KSAtIGVsLm9mZnNldFBhcmVudC5zY3JvbGxUb3AgOiAwKSArIGVsLm9mZnNldFRvcFxuZXhwb3J0IGNvbnN0IGdldE9mZnNldCA9IGVsID0+ICh7XG4gIGxlZnQ6IGdldExlZnQoZWwpLFxuICB0b3A6IGdldFRvcChlbClcbn0pXG5cbi8vIGhlbHBlciBmb3IgZ2VuZXJhdGluZyBCRU0gY2xhc3Nlc1xuZXhwb3J0IGNvbnN0IEJFTSA9IG5hbWUgPT4gKHtcbiAgYjogbmFtZSxcbiAgZTogZSA9PiBgJHtuYW1lfV9fJHtlfWAsXG4gIG06IG0gPT4gYCR7bmFtZX0tLSR7bX1gXG59KVxuXG4vLyBET00gZ2VuZXJhdGlvblxuZXhwb3J0IGNvbnN0IF8gPSAodGFnLCBhdHRycywgLi4uY2hpbGRyZW4pID0+IHtcbiAgLy8gZXh0cmFjdCBjbGFzcyBuYW1lcyBmcm9tIGB0YWcuY2xhc3Mub3RoZXJjbGFzc2BcbiAgY29uc3QgY2xhc3NlcyA9IHRhZy5zcGxpdCgnLicpXG4gIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChjbGFzc2VzWzBdKVxuICBlbC5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzZXMuc2xpY2UoMSkpXG5cbiAgLy8gaWYgYXR0cnMgb2JqZWN0IGlzIG5vdCBwcm92aWRlZCwgYXNzdW1lIGBhdHRyc2AgaXMgYSBjaGlsZFxuICBpZiAoYXR0cnMpIHtcbiAgICBpZiAodHlwZW9mIGF0dHJzID09PSAnc3RyaW5nJyB8fCBhdHRycyBpbnN0YW5jZW9mIE5vZGUpIHtcbiAgICAgIGNoaWxkcmVuLnVuc2hpZnQoYXR0cnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIE9iamVjdC5lbnRyaWVzKGF0dHJzKS5mb3JFYWNoKChbYSwgdl0pID0+IGVsLnNldEF0dHJpYnV0ZShhLCB2KSlcbiAgICB9XG4gIH1cblxuICAvLyBhZGQgY2hpbGRyZW5cbiAgZWwuYXBwZW5kKC4uLmNoaWxkcmVuKVxuICByZXR1cm4gZWxcbn1cbiIsImltcG9ydCB7ICQsIF8sIEJFTSwgZ2V0VG9wLCBnZXRMZWZ0IH0gZnJvbSAnLi9kb20uanMnXG5cbi8qIGRyYXdpbmcgaGVscGVyIGZ1bmN0aW9ucyAqL1xuXG4vLyBsaW5lIGRyYXdpbmcgYWxnb3JpdGhtXG5mdW5jdGlvbiBicmVzICh4MCwgeTAsIHgxLCB5MSkge1xuICBjb25zdCBwdHMgPSBbXVxuICBjb25zdCBkeCA9IE1hdGguYWJzKHgxIC0geDApXG4gIGNvbnN0IGR5ID0gTWF0aC5hYnMoeTEgLSB5MClcbiAgY29uc3Qgc3ggPSB4MCA8IHgxID8gMSA6IC0xXG4gIGNvbnN0IHN5ID0geTAgPCB5MSA/IDEgOiAtMVxuICBsZXQgZXJyID0gZHggLSBkeVxuXG4gIGxldCBzYWZldHkgPSAwXG4gIHdoaWxlICh0cnVlKSB7XG4gICAgaWYgKHNhZmV0eSsrID4gKHBhcnNlSW50KGR4ICsgZHkpIHx8IDIpKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ2JyZXMgcmVhY2hlZCBzYWZldHkgdmFsdmUhJylcbiAgICAgIGJyZWFrXG4gICAgfVxuICAgIHB0cy5wdXNoKFt4MCwgeTBdKVxuICAgIGlmICh4MCA9PT0geDEgJiYgeTAgPT09IHkxKSBicmVha1xuICAgIGNvbnN0IGUyID0gMiAqIGVyclxuICAgIGlmIChlMiA+IC1keSkge1xuICAgICAgZXJyIC09IGR5XG4gICAgICB4MCArPSBzeFxuICAgIH1cbiAgICBpZiAoZTIgPCBkeCkge1xuICAgICAgZXJyICs9IGR4XG4gICAgICB5MCArPSBzeVxuICAgIH1cbiAgfVxuICByZXR1cm4gcHRzXG59XG5cbmZ1bmN0aW9uIHJlY3QgKHgwLCB5MCwgeDEsIHkxKSB7XG4gIGlmICh4MSA8IHgwKSB7XG4gICAgW3gwLCB4MV0gPSBbeDEsIHgwXVxuICB9XG4gIGlmICh5MSA8IHkwKSB7XG4gICAgW3kwLCB5MV0gPSBbeTEsIHkwXVxuICB9XG4gIGNvbnN0IHB0cyA9IFtdXG4gIGZvciAobGV0IHkgPSB5MDsgeSA8PSB5MTsgeSsrKSB7XG4gICAgZm9yIChsZXQgeCA9IHgwOyB4IDw9IHgxOyB4KyspIHtcbiAgICAgIHB0cy5wdXNoKFt4LCB5XSlcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHB0c1xufVxuXG4vLyBmbG9vZCBmaWxsIGFsZ29yaXRobVxuZnVuY3Rpb24gZmxvb2QgKGRhdGEsIHgsIHksIHdpZHRoLCB2YWx1ZSkge1xuICBjb25zdCBzZWVuID0ge31cbiAgY29uc3QgaGVpZ2h0ID0gKGRhdGEubGVuZ3RoIC8gd2lkdGgpIHwgMFxuICBjb25zdCBpZHggPSAoeCwgeSkgPT4gd2lkdGggKiB5ICsgeFxuICBjb25zdCBzdGFydCA9IGlkeCh4LCB5KVxuICBjb25zdCBiZyA9IGRhdGFbc3RhcnRdXG4gIGNvbnN0IHN0YWNrID0gW3N0YXJ0XVxuICBzZWVuW3N0YXJ0XSA9IHRydWVcbiAgd2hpbGUgKHN0YWNrLmxlbmd0aCkge1xuICAgIGNvbnN0IHBvcyA9IHN0YWNrLnBvcCgpXG4gICAgaWYgKGRhdGFbcG9zXSA9PT0gYmcpIHtcbiAgICAgIGRhdGFbcG9zXSA9IHZhbHVlXG4gICAgICBjb25zdCB4ID0gcG9zICUgd2lkdGhcbiAgICAgIGNvbnN0IHkgPSAocG9zIC8gd2lkdGgpIHwgMFxuICAgICAgaWYgKHggPCB3aWR0aCAtIDEgJiYgIXNlZW5bcG9zICsgMV0pIHtcbiAgICAgICAgc2Vlbltwb3MgKyAxXSA9IHRydWVcbiAgICAgICAgc3RhY2sucHVzaChwb3MgKyAxKVxuICAgICAgfVxuICAgICAgaWYgKHggPiAwICYmICFzZWVuW3BvcyAtIDFdKSB7XG4gICAgICAgIHNlZW5bcG9zIC0gMV0gPSB0cnVlXG4gICAgICAgIHN0YWNrLnB1c2gocG9zIC0gMSlcbiAgICAgIH1cbiAgICAgIGlmICh5IDwgaGVpZ2h0IC0gMSAmJiAhc2Vlbltwb3MgKyB3aWR0aF0pIHtcbiAgICAgICAgc2Vlbltwb3MgKyB3aWR0aF0gPSB0cnVlXG4gICAgICAgIHN0YWNrLnB1c2gocG9zICsgd2lkdGgpXG4gICAgICB9XG4gICAgICBpZiAoeSA+IDAgJiYgIXNlZW5bcG9zIC0gd2lkdGhdKSB7XG4gICAgICAgIHNlZW5bcG9zIC0gd2lkdGhdID0gdHJ1ZVxuICAgICAgICBzdGFjay5wdXNoKHBvcyAtIHdpZHRoKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vLyByZXR1cm5zIHRoZSBjb29yZGluYXRlcyBvZiBhIG1vdXNlZXZlbnQgcmVsYXRpdmUgdG8gYW4gZWxlbWVudFxuZnVuY3Rpb24gZ2V0UmVsYXRpdmVQb2ludCAoZXZlbnQsIGVsLCB6b29tKSB7XG4gIGNvbnN0IGxlZnQgPSBnZXRMZWZ0KGVsKVxuICBjb25zdCB0b3AgPSBnZXRUb3AoZWwpXG4gIHJldHVybiBbXG4gICAgKChldmVudC5wYWdlWCAtIGxlZnQgLSAxKSAvIHpvb20pIHwgMCxcbiAgICAoKGV2ZW50LnBhZ2VZIC0gdG9wIC0gMSkgLyB6b29tKSB8IDBcbiAgXVxufVxuXG5jb25zdCB0b29scyA9IFsnZHJhdycsICdlcmFzZScsICdsaW5lJywgJ3JlY3QnLCAnZmlsbCddXG5jb25zdCBkZWZhdWx0Q29sb3JzID0gW1xuICBbMjU1LCAyNTUsIDI1NV0sXG4gIFswLCAwLCAwXVxuXVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQaXhlbEVkaXRvciB7XG4gIGNvbnN0cnVjdG9yICh7XG4gICAgd2lkdGgsXG4gICAgaGVpZ2h0ID0gd2lkdGgsXG4gICAgY29sb3JzID0gZGVmYXVsdENvbG9ycyxcbiAgICB6b29tID0gNCxcbiAgICBjdXJyZW50Q29sb3IgPSAxLFxuICAgIGJnID0gMCxcbiAgICBjb250YWluZXIsXG4gICAgb25VcGRhdGUsXG4gICAgLy8gYWZ0ZXJEcmF3XG4gIH0gPSB7fSkge1xuICAgIHRoaXMuYmVtID0gQkVNKCdwRScpXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoXG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHRcbiAgICB0aGlzLnpvb20gPSB6b29tXG4gICAgdGhpcy5jb2xvcnMgPSBjb2xvcnNcbiAgICB0aGlzLmN1cnJlbnRDb2xvciA9IGN1cnJlbnRDb2xvclxuICAgIHRoaXMuYmcgPSBiZ1xuICAgIHRoaXMuZGF0YSA9IG5ldyBVaW50OEFycmF5KHdpZHRoICogaGVpZ2h0KS5maWxsKGJnKVxuICAgIHRoaXMubW9kZSA9ICdkcmF3J1xuICAgIHRoaXMudW5kb1N0YWNrID0gW11cbiAgICB0aGlzLnJlZG9TdGFjayA9IFtdXG4gICAgdGhpcy5vblVwZGF0ZSA9IG9uVXBkYXRlXG4gICAgLy8gdGhpcy5hZnRlckRyYXcgPSBhZnRlckRyYXdcbiAgICB0aGlzLnNhdmUoKVxuICAgIHRoaXMudW5kb1N0YWNrLnBvcCgpXG4gICAgdGhpcy5kYXRhQ2hhbmdlZCA9IGZhbHNlXG4gICAgdGhpcy5sYXN0RHJhdyA9IG51bGxcbiAgICB0aGlzLm1vdXNlRXZlbnRzUXVldWUgPSBbXVxuICAgIGlmIChjb250YWluZXIpIHtcbiAgICAgIHRoaXMubW91bnQoY29udGFpbmVyKVxuICAgIH1cbiAgfVxuXG4gIC8vIHNhdmVzIGFuIHVuZG8gc25hcHNob3QsIG9wdGlvbmFsbHkgd2l0aCBzaXppbmcgaW5mb3JtYXRpb25cbiAgc2F2ZSAoc2F2ZVNpemluZykge1xuICAgIHRoaXMudW5kb1N0YWNrLnB1c2goe1xuICAgICAgZGF0YTogWy4uLnRoaXMuZGF0YV0sXG4gICAgICAuLi4oc2F2ZVNpemluZyAmJiB7XG4gICAgICAgIHdpZHRoOiB0aGlzLndpZHRoLFxuICAgICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0LFxuICAgICAgICB6b29tOiB0aGlzLnpvb21cbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIC8vIHJlc3RvcmVzIHRvIHRoZSBwcmV2aW91cyB1bmRvIHNuYXBzaG90LCBpZiBhdmFpbGFibGVcbiAgdW5kbyAoKSB7XG4gICAgaWYgKHRoaXMudW5kb1N0YWNrLmxlbmd0aCkge1xuICAgICAgY29uc3QgcG9wcGVkID0gdGhpcy51bmRvU3RhY2sucG9wKClcbiAgICAgIHRoaXMucmVkb1N0YWNrLnB1c2goeyBkYXRhOiB0aGlzLmRhdGEgfSlcbiAgICAgIGlmIChwb3BwZWQud2lkdGggfHwgcG9wcGVkLmhlaWdodCB8fCBwb3BwZWQuem9vbSkge1xuICAgICAgICB0aGlzLnJlc2l6ZSh7IC4uLnBvcHBlZCwgbm9TYXZlOiB0cnVlIH0pXG4gICAgICB9XG4gICAgICB0aGlzLmRhdGEgPSBwb3BwZWQuZGF0YVxuICAgICAgdGhpcy5kYXRhQ2hhbmdlZCA9IHRydWVcbiAgICAgIHRoaXMuZHJhdygpXG4gICAgICB0aGlzLnVwZGF0ZWQoKVxuICAgIH1cbiAgfVxuXG4gIC8vIHJlc3RvcmVzIHRvIHRoZSBwcmV2aW91cyByZWRvIHNuYXBzaG90LCBpZiBhdmFpbGFibGVcbiAgcmVkbyAoKSB7XG4gICAgaWYgKHRoaXMucmVkb1N0YWNrLmxlbmd0aCkge1xuICAgICAgY29uc3QgcG9wcGVkID0gdGhpcy5yZWRvU3RhY2sucG9wKClcbiAgICAgIHRoaXMudW5kb1N0YWNrLnB1c2goeyBkYXRhOiB0aGlzLmRhdGEgfSlcbiAgICAgIGlmIChwb3BwZWQud2lkdGggfHwgcG9wcGVkLmhlaWdodCB8fCBwb3BwZWQuem9vbSkge1xuICAgICAgICB0aGlzLnJlc2l6ZSh7IC4uLnBvcHBlZCwgbm9TYXZlOiB0cnVlIH0pXG4gICAgICB9XG4gICAgICB0aGlzLmRhdGEgPSBwb3BwZWQuZGF0YVxuICAgICAgdGhpcy5kYXRhQ2hhbmdlZCA9IHRydWVcbiAgICAgIHRoaXMuZHJhdygpXG4gICAgICB0aGlzLnVwZGF0ZWQoKVxuICAgIH1cbiAgfVxuXG4gIC8vIHNldCB0aGUgd2hvbGUgY2FudmFzIHRvIGEgc2luZ2xlIGNvbG9yXG4gIGNsZWFyIChjb2xvcikge1xuICAgIGlmICh0eXBlb2YgY29sb3IgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb2xvciA9IHRoaXMuYmdcbiAgICB9XG4gICAgdGhpcy5zYXZlKClcbiAgICB0aGlzLmRhdGEuZmlsbChjb2xvcilcbiAgICB0aGlzLmRhdGFDaGFuZ2VkID0gdHJ1ZVxuICAgIHRoaXMuZHJhdygpXG4gICAgdGhpcy51cGRhdGVkKClcbiAgfVxuXG4gIHNldERhdGEgKGRhdGEpIHtcbiAgICB0aGlzLnNhdmUoKVxuICAgIHRoaXMuZGF0YSA9IGRhdGFcbiAgICB0aGlzLmRhdGFDaGFuZ2VkID0gdHJ1ZVxuICAgIHRoaXMuZHJhdygpXG4gICAgdGhpcy51cGRhdGVkKClcbiAgfVxuXG4gIC8vIGNvbnN0cnVjdCB0aGUgRE9NLCBhbmQgc2V0IGV2ZW50IGxpc3RlbmVyc1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgYiwgZSB9ID0gdGhpcy5iZW1cblxuICAgIHRoaXMuY2FudmFzID0gXyhgY2FudmFzLiR7ZSgnZHJhd2luZycpfWAsIHtcbiAgICAgIHdpZHRoOiB0aGlzLndpZHRoICogdGhpcy56b29tLFxuICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCAqIHRoaXMuem9vbVxuICAgIH0pXG5cbiAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJywge1xuICAgICAgYWxwaGE6IGZhbHNlLFxuICAgICAgZGVzeW5jaHJvbml6ZWQ6IHRydWUsXG4gICAgICBpbWFnZVNtb290aGluZ0VuYWJsZWQ6IGZhbHNlXG4gICAgfSlcblxuICAgIHRoaXMuZWwgPSBfKFxuICAgICAgYGRpdi5waXhlbGVkaXRvci4ke2J9YCxcbiAgICAgIHtcbiAgICAgICAgdGFiaW5kZXg6IDBcbiAgICAgIH0sXG4gICAgICBfKGBkaXYuJHtlKCdjYW52YXMnKX1gLCB0aGlzLmNhbnZhcylcbiAgICApXG5cbiAgICAvKiBldmVudCBsaXN0ZW5lcnMgKi9cblxuICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGUgPT4ge1xuICAgICAgaWYgKCF0aGlzLnAwKSB7XG4gICAgICAgIHRoaXMucDAgPSBbMCwgMF1cbiAgICAgIH1cbiAgICAgIGNvbnN0IGN1cnNvciA9IHRoaXMucDBcbiAgICAgIGlmICghZS5tZXRhS2V5ICYmICFlLmN0cmxLZXkpIHtcbiAgICAgICAgaWYgKGUuYWx0S2V5KSB7XG4gICAgICAgICAgLy8gYWx0LXhcbiAgICAgICAgICBpZiAoZS5jb2RlID09PSAnS2V5WCcpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXIoKVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICBpZiAoZS5jb2RlID09PSAnQXJyb3dSaWdodCcpIHtcbiAgICAgICAgICAgIGN1cnNvclswXSA9IE1hdGgubWluKGN1cnNvclswXSArIDEsIHRoaXMud2lkdGggLSAxKVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZS5jb2RlID09PSAnQXJyb3dMZWZ0Jykge1xuICAgICAgICAgICAgY3Vyc29yWzBdID0gTWF0aC5tYXgoY3Vyc29yWzBdIC0gMSwgMClcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGUuY29kZSA9PT0gJ0Fycm93RG93bicpIHtcbiAgICAgICAgICAgIGN1cnNvclsxXSA9IE1hdGgubWluKGN1cnNvclsxXSArIDEsIHRoaXMuaGVpZ2h0IC0gMSlcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGUuY29kZSA9PT0gJ0Fycm93VXAnKSB7XG4gICAgICAgICAgICBjdXJzb3JbMV0gPSBNYXRoLm1heChjdXJzb3JbMV0gLSAxLCAwKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChlLmNvZGUgPT09ICdLZXlaJykge1xuICAgICAgICAgICAgdGhpcy51bmRvKClcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoZS5jb2RlID09PSAnS2V5VScpIHtcbiAgICAgICAgICAgIHRoaXMucmVkbygpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGUuY29kZSA9PT0gJ0tleUwnKSB7XG4gICAgICAgICAgICB0aGlzLnNldE1vZGUoJ2xpbmUnKVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZS5jb2RlID09PSAnS2V5RCcpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0TW9kZSgnZHJhdycpXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChlLmNvZGUgPT09ICdLZXlFJykge1xuICAgICAgICAgICAgdGhpcy5zZXRNb2RlKCdlcmFzZScpXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChlLmNvZGUgPT09ICdLZXlSJykge1xuICAgICAgICAgICAgdGhpcy5zZXRNb2RlKCdyZWN0JylcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGUuY29kZSA9PT0gJ0tleUYnKSB7XG4gICAgICAgICAgICB0aGlzLnNldE1vZGUoJ2ZpbGwnKVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBpZiAoZS5jb2RlID09PSAnQnJhY2tldFJpZ2h0Jykge1xuICAgICAgICAgIC8vICAgbGV0IG5ld0NvbG9yID0gdGhpcy5jdXJyZW50Q29sb3IgKyAxXG4gICAgICAgICAgLy8gICBpZiAobmV3Q29sb3IgPj0gdGhpcy5jb2xvcnMubGVuZ3RoKSB7XG4gICAgICAgICAgLy8gICAgIG5ld0NvbG9yID0gMFxuICAgICAgICAgIC8vICAgfVxuICAgICAgICAgIC8vICAgdGhpcy5zZXRDb2xvcihuZXdDb2xvcilcbiAgICAgICAgICAvLyB9XG4gICAgICAgICAgLy8gaWYgKGUuY29kZSA9PT0gJ0JyYWNrZXRMZWZ0Jykge1xuICAgICAgICAgIC8vICAgbGV0IG5ld0NvbG9yID0gdGhpcy5jdXJyZW50Q29sb3IgLSAxXG4gICAgICAgICAgLy8gICBpZiAobmV3Q29sb3IgPCAwKSB7XG4gICAgICAgICAgLy8gICAgIG5ld0NvbG9yID0gdGhpcy5jb2xvcnMubGVuZ3RoIC0gMVxuICAgICAgICAgIC8vICAgfVxuICAgICAgICAgIC8vICAgdGhpcy5zZXRDb2xvcihuZXdDb2xvcilcbiAgICAgICAgICAvLyB9XG5cbiAgICAgICAgICBpZiAoZS5jb2RlID09PSAnU3BhY2UnKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5tb2RlID09PSAnZHJhdycgfHwgdGhpcy5tb2RlID09PSAnZXJhc2UnKSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLmRyYXdpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZWQoKVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2F2ZSgpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy5kcmF3aW5nID0gIXRoaXMuZHJhd2luZ1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMubW9kZSA9PT0gJ2xpbmUnKSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLmRyYXdpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsb3RMaW5lKHRoaXMucDAsIHRoaXMucDEpXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVkKClcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNhdmUoKVxuICAgICAgICAgICAgICAgIHRoaXMucDEgPSBbLi4uY3Vyc29yXVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMuZHJhd2luZyA9ICF0aGlzLmRyYXdpbmdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLm1vZGUgPT09ICdyZWN0Jykge1xuICAgICAgICAgICAgICBpZiAodGhpcy5kcmF3aW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbG90UmVjdCh0aGlzLnAwLCB0aGlzLnAxKVxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlZCgpXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zYXZlKClcbiAgICAgICAgICAgICAgICB0aGlzLnAxID0gWy4uLmN1cnNvcl1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0aGlzLmRyYXdpbmcgPSAhdGhpcy5kcmF3aW5nXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5tb2RlID09PSAnZmlsbCcpIHtcbiAgICAgICAgICAgICAgdGhpcy5zYXZlKClcbiAgICAgICAgICAgICAgZmxvb2QodGhpcy5kYXRhLCAuLi5jdXJzb3IsIHRoaXMud2lkdGgsIHRoaXMuY3VycmVudENvbG9yKVxuICAgICAgICAgICAgICB0aGlzLmRhdGFDaGFuZ2VkID0gdHJ1ZVxuICAgICAgICAgICAgICB0aGlzLnVwZGF0ZWQoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5kcmF3aW5nKSB7XG4gICAgICAgIGlmICh0aGlzLm1vZGUgPT09ICdkcmF3JyB8fCB0aGlzLm1vZGUgPT09ICdlcmFzZScpIHtcbiAgICAgICAgICB0aGlzLnBsb3RQb2ludCguLi5jdXJzb3IpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5kcmF3KClcbiAgICB9KVxuXG4gICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZSA9PiB7XG4gICAgICBjb25zdCBbeCwgeV0gPSBnZXRSZWxhdGl2ZVBvaW50KGUsIHRoaXMuY2FudmFzLCB0aGlzLnpvb20pXG5cbiAgICAgIGlmICh0aGlzLm1vZGUgPT09ICdkcmF3JyB8fCB0aGlzLm1vZGUgPT09ICdlcmFzZScpIHtcbiAgICAgICAgdGhpcy5zYXZlKClcbiAgICAgICAgdGhpcy5wbG90UG9pbnQoeCwgeSlcbiAgICAgICAgdGhpcy5kcmF3aW5nID0gdHJ1ZVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMubW9kZSA9PT0gJ2xpbmUnIHx8IHRoaXMubW9kZSA9PT0gJ3JlY3QnKSB7XG4gICAgICAgIHRoaXMuZHJhd2luZyA9IHRydWVcbiAgICAgICAgdGhpcy5wMCA9IFt4LCB5XVxuICAgICAgICB0aGlzLnAxID0gW3gsIHldXG4gICAgICAgIHRoaXMuZHJhdygpXG4gICAgICB9XG4gICAgICBpZiAodGhpcy5tb2RlID09PSAnZmlsbCcpIHtcbiAgICAgICAgdGhpcy5zYXZlKClcbiAgICAgICAgZmxvb2QodGhpcy5kYXRhLCB4LCB5LCB0aGlzLndpZHRoLCB0aGlzLmN1cnJlbnRDb2xvcilcbiAgICAgICAgdGhpcy5kYXRhQ2hhbmdlZCA9IHRydWVcbiAgICAgICAgdGhpcy5kcmF3KClcbiAgICAgICAgdGhpcy51cGRhdGVkKClcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZSA9PiB7XG4gICAgICBjb25zdCBbeCwgeV0gPSBnZXRSZWxhdGl2ZVBvaW50KGUsIHRoaXMuY2FudmFzLCB0aGlzLnpvb20pXG5cbiAgICAgIGlmICghdGhpcy5wMCB8fCB4ICE9PSB0aGlzLnAwWzBdIHx8IHkgIT09IHRoaXMucDBbMV0pIHtcbiAgICAgICAgdGhpcy5wMCA9IFt4LCB5XVxuICAgICAgICB0aGlzLmRyYXcoKVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZHJhd2luZyAmJiB0aGlzLm1vZGUgPT09ICdkcmF3JyB8fCB0aGlzLm1vZGUgPT09ICdlcmFzZScpIHtcbiAgICAgICAgdGhpcy5tb3VzZUV2ZW50c1F1ZXVlLnB1c2goW3gsIHldKVxuICAgICAgICBpZiAodGhpcy5tb3VzZUV2ZW50c1F1ZXVlLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIHRoaXMuaGFuZGxlTW91c2VEcmF3KClcbiAgICAgICAgfVxuICAgICAgICAvLyB0aGlzLnBsb3RQb2ludCh4LCB5KVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZHJhd2luZyAmJiAodGhpcy5tb2RlID09PSAnbGluZScgfHwgdGhpcy5tb2RlID09PSAncmVjdCcpKSB7XG4gICAgICAgIGlmICh4ICE9PSB0aGlzLnAwWzBdIHx8IHkgIT09IHRoaXMucDBbMV0pIHtcbiAgICAgICAgICB0aGlzLnAwID0gW3gsIHldXG4gICAgICAgICAgdGhpcy5kcmF3KClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG5cbiAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5kcmF3aW5nICYmIHRoaXMubW9kZSA9PT0gJ2xpbmUnKSB7XG4gICAgICAgIHRoaXMuc2F2ZSgpXG4gICAgICAgIHRoaXMucGxvdExpbmUodGhpcy5wMCwgdGhpcy5wMSlcbiAgICAgICAgdGhpcy5kcmF3KClcbiAgICAgICAgdGhpcy51cGRhdGVkKClcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmRyYXdpbmcgJiYgdGhpcy5tb2RlID09PSAncmVjdCcpIHtcbiAgICAgICAgdGhpcy5zYXZlKClcbiAgICAgICAgdGhpcy5wbG90UmVjdCh0aGlzLnAwLCB0aGlzLnAxKVxuICAgICAgICB0aGlzLmRyYXcoKVxuICAgICAgICB0aGlzLnVwZGF0ZWQoKVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZHJhd2luZyAmJiB0aGlzLm1vZGUgPT09ICdkcmF3JyB8fCB0aGlzLm1vZGUgPT09ICdlcmFzZScpIHtcbiAgICAgICAgdGhpcy51cGRhdGVkKClcbiAgICAgICAgdGhpcy5tb3VzZUV2ZW50UDAgPSBudWxsXG4gICAgICB9XG4gICAgICB0aGlzLmRyYXdpbmcgPSBmYWxzZVxuICAgIH0pXG5cbiAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCAoKSA9PiB7XG4gICAgICB0aGlzLnAwID0gbnVsbFxuICAgICAgdGhpcy5kcmF3KClcbiAgICAgIHRoaXMubW91c2VFdmVudFAwID0gbnVsbFxuICAgIH0pXG5cbiAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5kcmF3aW5nICYmIHRoaXMubW9kZSA9PT0gJ2RyYXcnIHx8IHRoaXMubW9kZSA9PT0gJ2VyYXNlJykge1xuICAgICAgICB0aGlzLnVwZGF0ZWQoKVxuICAgICAgICB0aGlzLm1vdXNlRXZlbnRQMCA9IG51bGxcbiAgICAgIH1cbiAgICAgIGlmICghKHRoaXMubW9kZSA9PT0gJ2xpbmUnIHx8IHRoaXMubW9kZSA9PT0gJ3JlY3QnKSkge1xuICAgICAgICB0aGlzLmRyYXdpbmcgPSBmYWxzZVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBoYW5kbGVNb3VzZURyYXcgKCkge1xuICAgIHdoaWxlICh0aGlzLm1vdXNlRXZlbnRzUXVldWUubGVuZ3RoKSB7XG4gICAgICBjb25zdCBbeCwgeV0gPSB0aGlzLm1vdXNlRXZlbnRzUXVldWVbMF1cbiAgICAgIGlmICghdGhpcy5tb3VzZUV2ZW50UDApIHtcbiAgICAgICAgdGhpcy5wbG90UG9pbnQoeCwgeSlcbiAgICAgIH0gZWxzZSBpZiAoISh0aGlzLm1vdXNlRXZlbnRQMFswXSA9PT0geCAmJiB0aGlzLm1vdXNlRXZlbnRQMFsxXSA9PT0geSkpIHtcbiAgICAgICAgdGhpcy5wbG90TGluZShbeCwgeV0sIHRoaXMubW91c2VFdmVudFAwKVxuICAgICAgfVxuICAgICAgdGhpcy5tb3VzZUV2ZW50UDAgPSBbeCwgeV1cbiAgICAgIHRoaXMubW91c2VFdmVudHNRdWV1ZS5zaGlmdCgpXG4gICAgfVxuICB9XG5cbiAgLy8gZHJhdyBhIHNpbmdsZSBwb2ludFxuICBwbG90UG9pbnQgKHgsIHksIGMpIHtcbiAgICBpZiAodHlwZW9mIGMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjID0gdGhpcy5jdXJyZW50Q29sb3JcbiAgICB9XG4gICAgY29uc3QgaWR4ID0geSAqIHRoaXMud2lkdGggKyB4XG4gICAgaWYgKHRoaXMuZGF0YVtpZHhdICE9PSBjKSB7XG4gICAgICB0aGlzLmRhdGFbaWR4XSA9IGNcbiAgICAgIHRoaXMuZGF0YUNoYW5nZWQgPSB0cnVlXG4gICAgICB0aGlzLmN0eC5maWxsUmVjdCh4ICogdGhpcy56b29tLCB5ICogdGhpcy56b29tLCB0aGlzLnpvb20sIHRoaXMuem9vbSlcbiAgICAgIC8vIHRoaXMuZHJhdygpXG4gICAgfVxuICB9XG5cbiAgLy8gZHJhdyBhIHJlY3RhbmdsZVxuICBwbG90UmVjdCAocDAsIHAxLCBjKSB7XG4gICAgaWYgKHR5cGVvZiBjID09PSAndW5kZWZpbmVkJykge1xuICAgICAgYyA9IHRoaXMuY3VycmVudENvbG9yXG4gICAgfVxuICAgIHJlY3QoLi4ucDAsIC4uLnAxKS5mb3JFYWNoKHAgPT4ge1xuICAgICAgdGhpcy5kYXRhW3BbMV0gKiB0aGlzLndpZHRoICsgcFswXV0gPSBjXG4gICAgfSlcbiAgICB0aGlzLmRhdGFDaGFuZ2VkID0gdHJ1ZVxuICAgIHRoaXMuZHJhdygpXG4gIH1cblxuICAvLyBkcmF3IGEgbGluZVxuICBwbG90TGluZSAocDAsIHAxLCBjKSB7XG4gICAgaWYgKHR5cGVvZiBjID09PSAndW5kZWZpbmVkJykge1xuICAgICAgYyA9IHRoaXMuY3VycmVudENvbG9yXG4gICAgfVxuICAgIGJyZXMoLi4ucDAsIC4uLnAxKS5mb3JFYWNoKHAgPT4ge1xuICAgICAgdGhpcy5kYXRhW3BbMV0gKiB0aGlzLndpZHRoICsgcFswXV0gPSBjXG4gICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSB0aGlzLmN1cnJlbnRDb2xvciA9PT0gMCA/ICcjZmZmZmZmJyA6ICcjMDAwMDAwJ1xuICAgICAgdGhpcy5jdHguZmlsbFJlY3QocFswXSAqIHRoaXMuem9vbSwgcFsxXSAqIHRoaXMuem9vbSwgdGhpcy56b29tLCB0aGlzLnpvb20pXG4gICAgfSlcbiAgICB0aGlzLmRhdGFDaGFuZ2VkID0gdHJ1ZVxuICAgIC8vIHRoaXMuZHJhdygpXG4gIH1cblxuICAvLyBjaGFuZ2UgdGhlIGRyYXdpbmcgbW9kZVxuICBzZXRNb2RlIChtb2RlKSB7XG4gICAgaWYgKHRvb2xzLmluZGV4T2YobW9kZSkgPiAtMSkge1xuICAgICAgJChgYnV0dG9uW2FyaWEtbW9kZT1cIiR7bW9kZX1cIl1gKS5jbGljaygpXG4gICAgICB0aGlzLm1vZGUgPSBtb2RlXG4gICAgfVxuICB9XG5cbiAgLy8gcmUtcmVuZGVyIHRoZSBkcmF3aW5nIHdpdGggYSByZXRpY2xlIGFuZCBwZW5kaW5nIGxpbmUgaWYgYXBwbGljYWJsZVxuICBkcmF3ICgpIHtcbiAgICBjb25zdCBjdHggPSB0aGlzLmN0eFxuICAgIHRoaXMuY3R4LnNhdmUoKVxuICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCwgem9vbSB9ID0gdGhpc1xuICAgIGxldCBkcmF3RGF0YSA9IHRoaXMuZGF0YVxuICAgIGlmICh0aGlzLmRyYXdpbmcgJiYgdGhpcy5tb2RlID09PSAnbGluZScpIHtcbiAgICAgIGRyYXdEYXRhID0gWy4uLnRoaXMuZGF0YV1cbiAgICAgIGJyZXMoLi4udGhpcy5wMCwgLi4udGhpcy5wMSkuZm9yRWFjaChwID0+IHtcbiAgICAgICAgZHJhd0RhdGFbcFsxXSAqIHdpZHRoICsgcFswXV0gPSB0aGlzLmN1cnJlbnRDb2xvclxuICAgICAgfSlcbiAgICAgIHRoaXMuZGF0YUNoYW5nZWQgPSB0cnVlXG4gICAgfVxuICAgIGlmICh0aGlzLmRyYXdpbmcgJiYgdGhpcy5tb2RlID09PSAncmVjdCcpIHtcbiAgICAgIGRyYXdEYXRhID0gWy4uLnRoaXMuZGF0YV1cbiAgICAgIHJlY3QoLi4udGhpcy5wMCwgLi4udGhpcy5wMSkuZm9yRWFjaChwID0+IHtcbiAgICAgICAgZHJhd0RhdGFbcFsxXSAqIHdpZHRoICsgcFswXV0gPSB0aGlzLmN1cnJlbnRDb2xvclxuICAgICAgfSlcbiAgICAgIHRoaXMuZGF0YUNoYW5nZWQgPSB0cnVlXG4gICAgfVxuICAgIGxldCBpZCA9IHRoaXMubGFzdERyYXdcbiAgICBpZiAodGhpcy5kYXRhQ2hhbmdlZCB8fCAhdGhpcy5sYXN0RHJhdykge1xuICAgICAgaWQgPSBuZXcgSW1hZ2VEYXRhKHdpZHRoICogem9vbSwgaGVpZ2h0ICogem9vbSlcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaWQuZGF0YS5sZW5ndGg7IGkgKz0gNCkge1xuICAgICAgICBjb25zdCB4ID0gKGkgLyA0KSAlIHRoaXMuY2FudmFzLndpZHRoXG4gICAgICAgIGNvbnN0IHkgPSAoaSAvIDQgLyB0aGlzLmNhbnZhcy53aWR0aCkgfCAwXG4gICAgICAgIGNvbnN0IHB4ID0gKHggLyB6b29tKSB8IDBcbiAgICAgICAgY29uc3QgcHkgPSAoeSAvIHpvb20pIHwgMFxuICAgICAgICBjb25zdCBjID0gdGhpcy5jb2xvcnNbZHJhd0RhdGFbcHkgKiB3aWR0aCArIHB4XV1cbiAgICAgICAgaWQuZGF0YVtpXSA9IGNbMF1cbiAgICAgICAgaWQuZGF0YVtpICsgMV0gPSBjWzFdXG4gICAgICAgIGlkLmRhdGFbaSArIDJdID0gY1syXVxuICAgICAgICBpZC5kYXRhW2kgKyAzXSA9IDI1NVxuICAgICAgfVxuICAgICAgdGhpcy5sYXN0RHJhdyA9IGlkXG4gICAgfSBlbHNlIHtcbiAgICAgIGlkID0gdGhpcy5sYXN0RHJhd1xuICAgIH1cbiAgICB0aGlzLmRhdGFDaGFuZ2VkID0gZmFsc2VcbiAgICB0aGlzLmN0eC5wdXRJbWFnZURhdGEoaWQsIDAsIDApXG4gICAgaWYgKHRoaXMucDApIHtcbiAgICAgIGNvbnN0IHJ4ID0gdGhpcy5wMFswXSAqIHpvb21cbiAgICAgIGNvbnN0IHJ5ID0gdGhpcy5wMFsxXSAqIHpvb21cbiAgICAgIC8vIGNvbnN0IHogPSB6b29tIC8gMlxuICAgICAgY3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdkaWZmZXJlbmNlJ1xuICAgICAgY3R4LnN0cm9rZVN0eWxlID0gJyNmZmYnXG4gICAgICBjdHguc3Ryb2tlUmVjdChyeCAtIDEsIHJ5IC0gMSwgem9vbSArIDEsIHpvb20gKyAxKVxuICAgIH1cbiAgICB0aGlzLmN0eC5yZXN0b3JlKClcbiAgICAvLyBpZiAodGhpcy5hZnRlckRyYXcpIHtcbiAgICAvLyAgIHRoaXMuYWZ0ZXJEcmF3KHRoaXMuY3R4LCB0aGlzKVxuICAgIC8vIH1cbiAgfVxuXG4gIC8vIG5vdGlmeSBvblVwZGF0ZWQgY2FsbGJhY2tcbiAgdXBkYXRlZCAoKSB7XG4gICAgaWYgKHRoaXMub25VcGRhdGUpIHtcbiAgICAgIHRoaXMub25VcGRhdGUodGhpcylcbiAgICB9XG4gIH1cblxuICAvLyBjaGFuZ2UgdGhlIHNpemUgb2YgdGhlIGRyYXdpbmcgY2FudmFzXG4gIHJlc2l6ZSAoeyAvKiB3aWR0aCwgaGVpZ2h0LCAqLyB6b29tLCBub1NhdmUgPSB0cnVlIH0pIHtcbiAgICBpZiAoIW5vU2F2ZSkge1xuICAgICAgdGhpcy5zYXZlKHRydWUpXG4gICAgfVxuICAgIGNvbnN0IG9sZFdpZHRoID0gdGhpcy53aWR0aFxuICAgIGNvbnN0IG9sZEhlaWdodCA9IHRoaXMuaGVpZ2h0XG4gICAgLy8gY29uc3Qgb2xkWm9vbSA9IHRoaXMuem9vbVxuICAgIGNvbnN0IG9sZERhdGEgPSB0aGlzLmRhdGFcblxuICAgIC8vIGlmICh3aWR0aCkge1xuICAgIC8vICAgdGhpcy53aWR0aCA9IHBhcnNlSW50KHdpZHRoKVxuICAgIC8vIH1cbiAgICAvLyBpZiAoaGVpZ2h0KSB7XG4gICAgLy8gICB0aGlzLmhlaWdodCA9IHBhcnNlSW50KGhlaWdodClcbiAgICAvLyB9XG4gICAgaWYgKHpvb20pIHtcbiAgICAgIHRoaXMuem9vbSA9IHBhcnNlSW50KHpvb20pXG4gICAgfVxuXG4gICAgdGhpcy5jYW52YXMud2lkdGggPSB0aGlzLndpZHRoICogdGhpcy56b29tXG4gICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gdGhpcy5oZWlnaHQgKiB0aGlzLnpvb21cbiAgICB0aGlzLmRhdGEgPSBuZXcgVWludDhBcnJheSh0aGlzLndpZHRoICogdGhpcy5oZWlnaHQpLmZpbGwoMClcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCB4ID0gaSAlIHRoaXMud2lkdGhcbiAgICAgIGNvbnN0IHkgPSAoaSAvIHRoaXMud2lkdGgpIHwgMFxuICAgICAgaWYgKHggPCBvbGRXaWR0aCAmJiB5IDwgb2xkSGVpZ2h0KSB7XG4gICAgICAgIHRoaXMuZGF0YVtpXSA9IG9sZERhdGFbeSAqIG9sZFdpZHRoICsgeF1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5kYXRhQ2hhbmdlZCA9IHRydWVcbiAgICB0aGlzLmRyYXcoKVxuICB9XG5cbiAgLy8gYXBwZW5kIHRoZSB3aWRnZXQgdG8gYSBjb250YWluZXJcbiAgbW91bnQgKGNvbnRhaW5lcikge1xuICAgIHRoaXMucmVuZGVyKClcbiAgICBjb250YWluZXIuYXBwZW5kKHRoaXMuZWwpXG4gICAgdGhpcy5kcmF3KClcbiAgfVxuXG4gIC8qIGV4cG9ydCBmb3JtYXRzICovXG4gIC8vIHJldHVybiBhbiBJbWFnZURhdGEgb2YgdGhlIGRyYXdpbmcgYXQgdGhlIHNwZWNpZmllZCB6b29tXG4gIHRvSW1hZ2VEYXRhICh7IHpvb20gPSAxIH0gPSB7fSkge1xuICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gdGhpc1xuICAgIGNvbnN0IGlkID0gbmV3IEltYWdlRGF0YSh3aWR0aCAqIHpvb20sIGhlaWdodCAqIHpvb20pXG4gICAgY29uc3QgZHJhd0RhdGEgPSB0aGlzLmRhdGFcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlkLmRhdGEubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgIGNvbnN0IHggPSAoaSAvIDQpICUgKHdpZHRoICogem9vbSlcbiAgICAgIGNvbnN0IHkgPSAoaSAvIDQgLyAod2lkdGggKiB6b29tKSkgfCAwXG4gICAgICBjb25zdCBweCA9ICh4IC8gem9vbSkgfCAwXG4gICAgICBjb25zdCBweSA9ICh5IC8gem9vbSkgfCAwXG4gICAgICBjb25zdCBjID0gdGhpcy5jb2xvcnNbZHJhd0RhdGFbcHkgKiB3aWR0aCArIHB4XV1cbiAgICAgIGlkLmRhdGFbaV0gPSBjWzBdXG4gICAgICBpZC5kYXRhW2kgKyAxXSA9IGNbMV1cbiAgICAgIGlkLmRhdGFbaSArIDJdID0gY1syXVxuICAgICAgaWQuZGF0YVtpICsgM10gPSAyNTVcbiAgICB9XG4gICAgcmV0dXJuIGlkXG4gIH1cblxuICAvLyByZXR1cm5zIGFuIFwiaW1hZ2UvcG5nXCIgQmxvYiBvZiB0aGUgZHJhd2luZyBhdCB0aGUgc3BlY2lmaWVkIHpvb21cbiAgdG9CbG9iICh7IHpvb20gPSAxIH0gPSB7fSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgY29uc3QgaWQgPSB0aGlzLnRvSW1hZ2VEYXRhKHsgem9vbSB9KVxuICAgICAgY29uc3QgY2FudmFzID0gXygnY2FudmFzJywge1xuICAgICAgICB3aWR0aDogaWQud2lkdGgsXG4gICAgICAgIGhlaWdodDogaWQuaGVpZ2h0XG4gICAgICB9KVxuICAgICAgY2FudmFzLmdldENvbnRleHQoJzJkJykucHV0SW1hZ2VEYXRhKGlkLCAwLCAwKVxuICAgICAgY2FudmFzLnRvQmxvYihyZXNvbHZlKVxuICAgIH0pXG4gIH1cbn1cbiIsImltcG9ydCB7IHJlYWN0aXZlLCByZWYgfSBmcm9tICd2dWUnXG5pbXBvcnQgeyBkZWZpbmVTdG9yZSB9IGZyb20gJ3BpbmlhJ1xuXG5pbXBvcnQgUGl4ZWxFZGl0b3IgZnJvbSAnc2hhcmVkL2xpYi91dGlscy9waXhlbGVkaXRvci9waXhlbGVkaXRvcidcblxuZXhwb3J0IGNvbnN0IHVzZVBhaW50U3RvcmUgPSBkZWZpbmVTdG9yZSgncGFpbnQnLCAoKSA9PiB7XG4gIGNvbnN0IGZsYWdzID0gcmVhY3RpdmUoe1xuICAgIGNoZWNrZXJib2FyZDogdHJ1ZSxcbiAgICBpbWFnZUZpbGVMb2FkaW5nOiBmYWxzZSxcbiAgICBkaXRoZXJEaWFsb2c6IGZhbHNlXG4gIH0pXG5cbiAgY29uc3QgcGUgPSByZWY8UGl4ZWxFZGl0b3I+KClcblxuICBjb25zdCBjcmVhdGVFZGl0b3IgPSAoKSA9PiB7XG4gICAgcGUudmFsdWUgPSBuZXcgUGl4ZWxFZGl0b3Ioe1xuICAgICAgd2lkdGg6IDEyOCxcbiAgICAgIGhlaWdodDogNjQsXG4gICAgICBjb250YWluZXI6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wZS1jb250YWluZXInKSxcbiAgICAgIG9uVXBkYXRlOiB1cGRhdGVNaXJyb3JcbiAgICB9KVxuICB9XG5cbiAgY29uc3QgbWlycm9yID0gcmVmPEhUTUxDYW52YXNFbGVtZW50PigpXG4gIGNvbnN0IHNldE1pcnJvciA9IChlbGVtZW50OiBIVE1MQ2FudmFzRWxlbWVudCkgPT4ge1xuICAgIG1pcnJvci52YWx1ZSA9IGVsZW1lbnRcbiAgfVxuXG4gIGNvbnN0IGNhbGxiYWNrRnJhbWUgPSByZWY8KCkgPT4gdm9pZD4oKVxuICBjb25zdCBzZXRDYWxsYmFja0ZyYW1lID0gKGNhbGxiYWNrOiAoKSA9PiB2b2lkKSA9PiB7XG4gICAgY2FsbGJhY2tGcmFtZS52YWx1ZSA9IGNhbGxiYWNrXG4gIH1cblxuICBjb25zdCB1cGRhdGVNaXJyb3IgPSAoKSA9PiB7XG4gICAgY29uc3QgbWlycm9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1pcnJvcicpIGFzIEhUTUxDYW52YXNFbGVtZW50XG4gICAgY29uc3QgaW1hZ2VEYXRhID0gcGUudmFsdWU/LnRvSW1hZ2VEYXRhKClcbiAgICBpZiAoaW1hZ2VEYXRhKSB7XG4gICAgICBtaXJyb3IuZ2V0Q29udGV4dCgnMmQnKT8ucHV0SW1hZ2VEYXRhKGltYWdlRGF0YSwgMCwgMClcbiAgICB9XG5cbiAgICBpZiAoY2FsbGJhY2tGcmFtZS52YWx1ZSkge1xuICAgICAgY2FsbGJhY2tGcmFtZS52YWx1ZSgpXG4gICAgfVxuICB9XG5cbiAgY29uc3Qgem9vbUxldmVsID0gcmVmKDQpXG4gIGNvbnN0IHVwbG9hZGVkSW1hZ2UgPSByZWY8SFRNTEltYWdlRWxlbWVudD4oKVxuXG4gIHJldHVybiB7XG4gICAgZmxhZ3MsXG4gICAgcGUsXG4gICAgY3JlYXRlRWRpdG9yLFxuXG4gICAgbWlycm9yLFxuICAgIHNldE1pcnJvcixcbiAgICBzZXRDYWxsYmFja0ZyYW1lLFxuXG4gICAgem9vbUxldmVsLFxuICAgIHVwbG9hZGVkSW1hZ2VcbiAgfVxufSlcbiIsIjx0ZW1wbGF0ZT5cbiAgPGNhbnZhcyByZWY9XCJtaXJyb3JcIiBjbGFzcz1cIm1pcnJvclwiIHdpZHRoPVwiMTI4XCIgaGVpZ2h0PVwiNjRcIj48L2NhbnZhcz5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgeyByZWYsIG9uTW91bnRlZCB9IGZyb20gJ3Z1ZSdcbmltcG9ydCB7IFBhaW50TW9kZWwgfSBmcm9tICdlbnRpdHkvUGFpbnQnXG5jb25zdCBwYWludFN0b3JlID0gUGFpbnRNb2RlbC51c2VQYWludFN0b3JlKClcblxuY29uc3QgbWlycm9yID0gcmVmKClcbm9uTW91bnRlZCgoKSA9PiB7XG4gIHBhaW50U3RvcmUuc2V0TWlycm9yKG1pcnJvci52YWx1ZSlcbn0pXG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCIgc2NvcGVkPlxuQGltcG9ydCAnc3R5bGVzJztcbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJjb2wgZHJhd2luZy1ib2FyZCBmaXQgZmxleCBmbGV4LWNlbnRlclwiPlxuICAgIDxkaXYgY2xhc3M9XCJwZS1jb250YWluZXJcIj5cbiAgICAgIDxkaXZcbiAgICAgICAgdi1pZj1cInBhaW50U3RvcmUuZmxhZ3MuY2hlY2tlcmJvYXJkXCJcbiAgICAgICAgY2xhc3M9XCJjaGVja2VyYm9hcmRcIlxuICAgICAgICA6c3R5bGU9XCJgYmFja2dyb3VuZC1zaXplOiAke3BhaW50U3RvcmUuem9vbUxldmVsICogMn1weCAke3BhaW50U3RvcmUuem9vbUxldmVsICogMn1weGBcIlxuICAgICAgPjwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgeyBvbk1vdW50ZWQgfSBmcm9tICd2dWUnXG5pbXBvcnQgeyBQYWludE1vZGVsIH0gZnJvbSAnZW50aXR5L1BhaW50J1xuY29uc3QgcGFpbnRTdG9yZSA9IFBhaW50TW9kZWwudXNlUGFpbnRTdG9yZSgpXG5cbm9uTW91bnRlZCgoKSA9PiB7XG4gIHBhaW50U3RvcmUuY3JlYXRlRWRpdG9yKClcbn0pXG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCIgc2NvcGVkPlxuLmRyYXdpbmctYm9hcmQge1xuICBwYWRkaW5nOiA3OHB4IDhweCA4MHB4IDhweDtcbn1cblxuLnBlLWNvbnRhaW5lciB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAuY2hlY2tlcmJvYXJkIHtcbiAgICB3aWR0aDogY2FsYygxMDAlIC0gMXB4KTtcbiAgICBoZWlnaHQ6IGNhbGMoMTAwJSAtIDFweCk7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMXB4O1xuICAgIGxlZnQ6IDFweDtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwcHggMHB4O1xuICAgIGJhY2tncm91bmQtaW1hZ2U6IHJlcGVhdGluZy1jb25pYy1ncmFkaWVudChcbiAgICAgICNmZmYwIDBkZWcgOTBkZWcsXG4gICAgICAjMDAwMDAwMTIgMCAxODBkZWdcbiAgICApO1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgIHotaW5kZXg6IDE7XG4gIH1cbn1cblxuOmRlZXAoLnBpeGVsZWRpdG9yKSB7XG4gIHdpZHRoOiBmaXQtY29udGVudDtcbiAgZGlzcGxheTogZmxleDtcbiAgcGFkZGluZzogMDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG48L3N0eWxlPlxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRQnRuIGZyb20gJy4uL2J0bi9RQnRuLmpzJ1xuaW1wb3J0IFFCdG5Hcm91cCBmcm9tICcuLi9idG4tZ3JvdXAvUUJ0bkdyb3VwLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyB1c2VGb3JtSW5qZWN0LCB1c2VGb3JtUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy91c2UtZm9ybS9wcml2YXRlLnVzZS1mb3JtLmpzJ1xuXG5pbXBvcnQgeyBoTWVyZ2VTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuaW1wb3J0IHsgZ2V0QnRuRGVzaWduQXR0ciB9IGZyb20gJy4uL2J0bi91c2UtYnRuLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUJ0blRvZ2dsZScsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VGb3JtUHJvcHMsXG5cbiAgICBtb2RlbFZhbHVlOiB7XG4gICAgICByZXF1aXJlZDogdHJ1ZVxuICAgIH0sXG5cbiAgICBvcHRpb25zOiB7XG4gICAgICB0eXBlOiBBcnJheSxcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgdmFsaWRhdG9yOiB2ID0+IHYuZXZlcnkoXG4gICAgICAgIG9wdCA9PiAoJ2xhYmVsJyBpbiBvcHQgfHwgJ2ljb24nIGluIG9wdCB8fCAnc2xvdCcgaW4gb3B0KSAmJiAndmFsdWUnIGluIG9wdFxuICAgICAgKVxuICAgIH0sXG5cbiAgICAvLyBUbyBhdm9pZCBzZWVpbmcgdGhlIGFjdGl2ZSByYWlzZSBzaGFkb3cgdGhyb3VnaFxuICAgIC8vIHRoZSB0cmFuc3BhcmVudCBidXR0b24sIGdpdmUgaXQgYSBjb2xvciAoZXZlbiB3aGl0ZSlcbiAgICBjb2xvcjogU3RyaW5nLFxuICAgIHRleHRDb2xvcjogU3RyaW5nLFxuICAgIHRvZ2dsZUNvbG9yOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAncHJpbWFyeSdcbiAgICB9LFxuICAgIHRvZ2dsZVRleHRDb2xvcjogU3RyaW5nLFxuXG4gICAgb3V0bGluZTogQm9vbGVhbixcbiAgICBmbGF0OiBCb29sZWFuLFxuICAgIHVuZWxldmF0ZWQ6IEJvb2xlYW4sXG4gICAgcm91bmRlZDogQm9vbGVhbixcbiAgICBwdXNoOiBCb29sZWFuLFxuICAgIGdsb3NzeTogQm9vbGVhbixcblxuICAgIHNpemU6IFN0cmluZyxcbiAgICBwYWRkaW5nOiBTdHJpbmcsXG5cbiAgICBub0NhcHM6IEJvb2xlYW4sXG4gICAgbm9XcmFwOiBCb29sZWFuLFxuICAgIGRlbnNlOiBCb29sZWFuLFxuICAgIHJlYWRvbmx5OiBCb29sZWFuLFxuICAgIGRpc2FibGU6IEJvb2xlYW4sXG5cbiAgICBzdGFjazogQm9vbGVhbixcbiAgICBzdHJldGNoOiBCb29sZWFuLFxuXG4gICAgc3ByZWFkOiBCb29sZWFuLFxuXG4gICAgY2xlYXJhYmxlOiBCb29sZWFuLFxuXG4gICAgcmlwcGxlOiB7XG4gICAgICB0eXBlOiBbIEJvb2xlYW4sIE9iamVjdCBdLFxuICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgIH1cbiAgfSxcblxuICBlbWl0czogWyAndXBkYXRlOm1vZGVsVmFsdWUnLCAnY2xlYXInLCAnY2xpY2snIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0IH0pIHtcbiAgICBjb25zdCBoYXNBY3RpdmVWYWx1ZSA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5vcHRpb25zLmZpbmQob3B0ID0+IG9wdC52YWx1ZSA9PT0gcHJvcHMubW9kZWxWYWx1ZSkgIT09IHZvaWQgMFxuICAgIClcblxuICAgIGNvbnN0IGZvcm1BdHRycyA9IGNvbXB1dGVkKCgpID0+ICh7XG4gICAgICB0eXBlOiAnaGlkZGVuJyxcbiAgICAgIG5hbWU6IHByb3BzLm5hbWUsXG4gICAgICB2YWx1ZTogcHJvcHMubW9kZWxWYWx1ZVxuICAgIH0pKVxuXG4gICAgY29uc3QgaW5qZWN0Rm9ybUlucHV0ID0gdXNlRm9ybUluamVjdChmb3JtQXR0cnMpXG5cbiAgICBjb25zdCBidG5EZXNpZ25BdHRyID0gY29tcHV0ZWQoKCkgPT4gZ2V0QnRuRGVzaWduQXR0cihwcm9wcykpXG5cbiAgICBjb25zdCBidG5PcHRpb25EZXNpZ24gPSBjb21wdXRlZCgoKSA9PiAoe1xuICAgICAgcm91bmRlZDogcHJvcHMucm91bmRlZCxcbiAgICAgIGRlbnNlOiBwcm9wcy5kZW5zZSxcbiAgICAgIC4uLmJ0bkRlc2lnbkF0dHIudmFsdWVcbiAgICB9KSlcblxuICAgIGNvbnN0IGJ0bk9wdGlvbnMgPSBjb21wdXRlZCgoKSA9PiBwcm9wcy5vcHRpb25zLm1hcCgoaXRlbSwgaSkgPT4ge1xuICAgICAgY29uc3QgeyBhdHRycywgdmFsdWUsIHNsb3QsIC4uLm9wdCB9ID0gaXRlbVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBzbG90LFxuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIGtleTogaSxcblxuICAgICAgICAgICdhcmlhLXByZXNzZWQnOiB2YWx1ZSA9PT0gcHJvcHMubW9kZWxWYWx1ZSA/ICd0cnVlJyA6ICdmYWxzZScsXG4gICAgICAgICAgLi4uYXR0cnMsXG4gICAgICAgICAgLi4ub3B0LFxuICAgICAgICAgIC4uLmJ0bk9wdGlvbkRlc2lnbi52YWx1ZSxcblxuICAgICAgICAgIGRpc2FibGU6IHByb3BzLmRpc2FibGUgPT09IHRydWUgfHwgb3B0LmRpc2FibGUgPT09IHRydWUsXG5cbiAgICAgICAgICAvLyBPcHRpb25zIHRoYXQgY29tZSBmcm9tIHRoZSBidXR0b24gc3BlY2lmaWMgb3B0aW9ucyBmaXJzdCwgdGhlbiBmcm9tIGdlbmVyYWwgcHJvcHNcbiAgICAgICAgICBjb2xvcjogdmFsdWUgPT09IHByb3BzLm1vZGVsVmFsdWVcbiAgICAgICAgICAgID8gbWVyZ2VPcHQob3B0LCAndG9nZ2xlQ29sb3InKVxuICAgICAgICAgICAgOiBtZXJnZU9wdChvcHQsICdjb2xvcicpLFxuICAgICAgICAgIHRleHRDb2xvcjogdmFsdWUgPT09IHByb3BzLm1vZGVsVmFsdWVcbiAgICAgICAgICAgID8gbWVyZ2VPcHQob3B0LCAndG9nZ2xlVGV4dENvbG9yJylcbiAgICAgICAgICAgIDogbWVyZ2VPcHQob3B0LCAndGV4dENvbG9yJyksXG4gICAgICAgICAgbm9DYXBzOiBtZXJnZU9wdChvcHQsICdub0NhcHMnKSA9PT0gdHJ1ZSxcbiAgICAgICAgICBub1dyYXA6IG1lcmdlT3B0KG9wdCwgJ25vV3JhcCcpID09PSB0cnVlLFxuXG4gICAgICAgICAgc2l6ZTogbWVyZ2VPcHQob3B0LCAnc2l6ZScpLFxuICAgICAgICAgIHBhZGRpbmc6IG1lcmdlT3B0KG9wdCwgJ3BhZGRpbmcnKSxcbiAgICAgICAgICByaXBwbGU6IG1lcmdlT3B0KG9wdCwgJ3JpcHBsZScpLFxuICAgICAgICAgIHN0YWNrOiBtZXJnZU9wdChvcHQsICdzdGFjaycpID09PSB0cnVlLFxuICAgICAgICAgIHN0cmV0Y2g6IG1lcmdlT3B0KG9wdCwgJ3N0cmV0Y2gnKSA9PT0gdHJ1ZSxcblxuICAgICAgICAgIG9uQ2xpY2sgKGUpIHsgc2V0KHZhbHVlLCBpdGVtLCBlKSB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KSlcblxuICAgIGZ1bmN0aW9uIHNldCAodmFsdWUsIG9wdCwgZSkge1xuICAgICAgaWYgKHByb3BzLnJlYWRvbmx5ICE9PSB0cnVlKSB7XG4gICAgICAgIGlmIChwcm9wcy5tb2RlbFZhbHVlID09PSB2YWx1ZSkge1xuICAgICAgICAgIGlmIChwcm9wcy5jbGVhcmFibGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgbnVsbCwgbnVsbClcbiAgICAgICAgICAgIGVtaXQoJ2NsZWFyJylcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCB2YWx1ZSwgb3B0KVxuICAgICAgICB9XG5cbiAgICAgICAgZW1pdCgnY2xpY2snLCBlKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1lcmdlT3B0IChvcHQsIGtleSkge1xuICAgICAgcmV0dXJuIG9wdFsga2V5IF0gPT09IHZvaWQgMCA/IHByb3BzWyBrZXkgXSA6IG9wdFsga2V5IF1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRDb250ZW50ICgpIHtcbiAgICAgIGNvbnN0IGNoaWxkID0gYnRuT3B0aW9ucy52YWx1ZS5tYXAob3B0ID0+IHtcbiAgICAgICAgcmV0dXJuIGgoUUJ0biwgb3B0LnByb3BzLCBvcHQuc2xvdCAhPT0gdm9pZCAwID8gc2xvdHNbIG9wdC5zbG90IF0gOiB2b2lkIDApXG4gICAgICB9KVxuXG4gICAgICBpZiAocHJvcHMubmFtZSAhPT0gdm9pZCAwICYmIHByb3BzLmRpc2FibGUgIT09IHRydWUgJiYgaGFzQWN0aXZlVmFsdWUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgaW5qZWN0Rm9ybUlucHV0KGNoaWxkLCAncHVzaCcpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoTWVyZ2VTbG90KHNsb3RzLmRlZmF1bHQsIGNoaWxkKVxuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiBoKFFCdG5Hcm91cCwge1xuICAgICAgY2xhc3M6ICdxLWJ0bi10b2dnbGUnLFxuICAgICAgLi4uYnRuRGVzaWduQXR0ci52YWx1ZSxcbiAgICAgIHJvdW5kZWQ6IHByb3BzLnJvdW5kZWQsXG4gICAgICBzdHJldGNoOiBwcm9wcy5zdHJldGNoLFxuICAgICAgZ2xvc3N5OiBwcm9wcy5nbG9zc3ksXG4gICAgICBzcHJlYWQ6IHByb3BzLnNwcmVhZFxuICAgIH0sIGdldENvbnRlbnQpXG4gIH1cbn0pXG4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgdi1pZj1cInBlXCIgY2xhc3M9XCJjb250cm9scyBxLXBhLXhzIHJvdW5kZWQtYm9yZGVycyBiZy1ncmV5LTJcIj5cbiAgICA8cS1idG4tdG9nZ2xlXG4gICAgICB2LW1vZGVsPVwibW9kZU1vZGVsXCJcbiAgICAgIGZsYXRcbiAgICAgIGRlbnNlXG4gICAgICA6b3B0aW9ucz1cIltcbiAgICAgICAge1xuICAgICAgICAgIHZhbHVlOiAncGVuY2lsJyxcbiAgICAgICAgICBzbG90OiAncGVuY2lsJyxcbiAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgJ2FyaWEtbW9kZSc6ICdkcmF3J1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHZhbHVlOiAnZXJhc2VyJyxcbiAgICAgICAgICBzbG90OiAnZXJhc2VyJyxcbiAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgJ2FyaWEtbW9kZSc6ICdlcmFzZSdcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB2YWx1ZTogJ2xpbmUnLFxuICAgICAgICAgIHNsb3Q6ICdsaW5lJyxcbiAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgJ2FyaWEtbW9kZSc6ICdsaW5lJ1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHZhbHVlOiAncmVjdGFuZ2xlJyxcbiAgICAgICAgICBzbG90OiAncmVjdGFuZ2xlJyxcbiAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgJ2FyaWEtbW9kZSc6ICdyZWN0J1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHZhbHVlOiAnZmlsbCcsXG4gICAgICAgICAgc2xvdDogJ2ZpbGwnLFxuICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAnYXJpYS1tb2RlJzogJ2ZpbGwnXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdXCJcbiAgICAgIEB1cGRhdGU6bW9kZWwtdmFsdWU9XCJjaGFuZ2VNb2RlXCJcbiAgICA+XG4gICAgICA8dGVtcGxhdGUgdi1zbG90OnBlbmNpbFxuICAgICAgICA+PHEtaWNvbiBuYW1lPVwibWRpLXBlbmNpbFwiIGNsYXNzPVwicS1weC1zbVwiXG4gICAgICAvPjwvdGVtcGxhdGU+XG4gICAgICA8dGVtcGxhdGUgdi1zbG90OmVyYXNlclxuICAgICAgICA+PHEtaWNvbiBuYW1lPVwibWRpLWVyYXNlclwiIGNsYXNzPVwicS1weC1zbVwiXG4gICAgICAvPjwvdGVtcGxhdGU+XG4gICAgICA8dGVtcGxhdGUgdi1zbG90OmxpbmVcbiAgICAgICAgPjxxLWljb24gbmFtZT1cIm1kaS12ZWN0b3ItbGluZVwiIGNsYXNzPVwicS1weC1zbVwiXG4gICAgICAvPjwvdGVtcGxhdGU+XG4gICAgICA8dGVtcGxhdGUgdi1zbG90OnJlY3RhbmdsZVxuICAgICAgICA+PHEtaWNvbiBuYW1lPVwibWRpLXZlY3Rvci1yZWN0YW5nbGVcIiBjbGFzcz1cInEtcHgtc21cIlxuICAgICAgLz48L3RlbXBsYXRlPlxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDpmaWxsXG4gICAgICAgID48cS1pY29uIG5hbWU9XCJtZGktZm9ybWF0LWNvbG9yLWZpbGxcIiBjbGFzcz1cInEtcHgtc20gcS1wdC14c1wiXG4gICAgICAvPjwvdGVtcGxhdGU+XG4gICAgPC9xLWJ0bi10b2dnbGU+XG5cbiAgICA8aW5wdXQgdHlwZT1cImZpbGVcIiBjbGFzcz1cImZpbGUtdXBsb2FkIGhpZGRlblwiIEBjaGFuZ2U9XCJ1cGxvYWRcIiAvPlxuICAgIDxxLWJ0blxuICAgICAgZmxhdFxuICAgICAgZGVuc2VcbiAgICAgIEBjbGljaz1cInRyaWdnZXJVcGxvYWRcIlxuICAgICAgOmxvYWRpbmc9XCJwYWludFN0b3JlLmZsYWdzLmltYWdlRmlsZUxvYWRpbmdcIlxuICAgICAgY2xhc3M9XCJxLXB4LXNtXCJcbiAgICAgIGljb249XCJtZGktZmlsZS1pbWFnZS1vdXRsaW5lXCJcbiAgICA+PC9xLWJ0bj5cblxuICAgIDxxLWJ0blxuICAgICAgZmxhdFxuICAgICAgZGVuc2VcbiAgICAgIDpjb2xvcj1cInBhaW50U3RvcmUuZmxhZ3MuY2hlY2tlcmJvYXJkID8gJ3ByaW1hcnknIDogJ2JsYWNrJ1wiXG4gICAgICBpY29uPVwibWRpLWNoZWNrZXJib2FyZFwiXG4gICAgICBjbGFzcz1cInEtcHgtc21cIlxuICAgICAgQGNsaWNrPVwicGFpbnRTdG9yZS5mbGFncy5jaGVja2VyYm9hcmQgPSAhcGFpbnRTdG9yZS5mbGFncy5jaGVja2VyYm9hcmRcIlxuICAgID48L3EtYnRuPlxuXG4gICAgPHEtc2VwYXJhdG9yIHZlcnRpY2FsIGNsYXNzPVwicS1teC14c1wiPjwvcS1zZXBhcmF0b3I+XG5cbiAgICA8cS1idG4tZ3JvdXAgZmxhdD5cbiAgICAgIDxxLWJ0biBkZW5zZSBpY29uPVwibWRpLXVuZG9cIiBjbGFzcz1cInEtcHgtc21cIiBAY2xpY2s9XCJ1bmRvXCI+PC9xLWJ0bj5cbiAgICAgIDxxLWJ0biBkZW5zZSBpY29uPVwibWRpLXJlZG9cIiBjbGFzcz1cInEtcHgtc21cIiBAY2xpY2s9XCJyZWRvXCI+PC9xLWJ0bj5cbiAgICA8L3EtYnRuLWdyb3VwPlxuXG4gICAgPHEtc2VwYXJhdG9yIHZlcnRpY2FsIGNsYXNzPVwicS1teC14c1wiPjwvcS1zZXBhcmF0b3I+XG5cbiAgICA8cS1idG4tZ3JvdXAgZmxhdD5cbiAgICAgIDxxLWJ0blxuICAgICAgICBpY29uPVwibWRpLW1hZ25pZnktbWludXMtb3V0bGluZVwiXG4gICAgICAgIGNsYXNzPVwicS1weC1zbVwiXG4gICAgICAgIEBjbGljaz1cInpvb20oeyBvZmZzZXQ6IC0xIH0pXCJcbiAgICAgID48L3EtYnRuPlxuICAgICAgPCEtLSA8cS1pbnB1dFxuICAgICAgICBkZW5zZVxuICAgICAgICBvdXRsaW5lZFxuICAgICAgICA6bW9kZWwtdmFsdWU9XCJ6b29tTGV2ZWxcIlxuICAgICAgICBAY2hhbmdlPVwidmFsID0+IHsgem9vbUxldmVsID0gL15bMC05XSokLy50ZXN0KHZhbCkgPyBOdW1iZXIodmFsKSA6IHpvb21MZXZlbCB9XCJcbiAgICAgICAgQHVwZGF0ZTptb2RlbFZhbHVlPVwidmFsID0+IHsgem9vbUxldmVsID0gTnVtYmVyKHZhbCkgem9vbSh7IHZhbCB9KSB9XCJcbiAgICAgICAgOnJ1bGVzPVwiW3ZhbCA9PiAvXlswLTldKiQvLnRlc3QodmFsKV1cIlxuICAgICAgICBoaWRlLWJvdHRvbS1zcGFjZVxuICAgICAgICBzdHlsZT1cIndpZHRoOiA1MnB4XCJcbiAgICAgICAgbGFiZWw9XCJab29tXCJcbiAgICAgICAgY2xhc3M9XCJxLW14LXhzXCJcbiAgICAgIC8+IC0tPlxuICAgICAgPHEtYnRuXG4gICAgICAgIGljb249XCJtZGktbWFnbmlmeS1wbHVzLW91dGxpbmVcIlxuICAgICAgICBjbGFzcz1cInEtcHgtc21cIlxuICAgICAgICBAY2xpY2s9XCJ6b29tKHsgb2Zmc2V0OiAxIH0pXCJcbiAgICAgID48L3EtYnRuPlxuICAgIDwvcS1idG4tZ3JvdXA+XG5cbiAgICA8cS1zZXBhcmF0b3IgdmVydGljYWwgY2xhc3M9XCJxLW14LXhzXCI+PC9xLXNlcGFyYXRvcj5cblxuICAgIDxxLWJ0blxuICAgICAgZmxhdFxuICAgICAgaWNvbj1cIm1kaS1maWxlLWRvd25sb2FkLW91dGxpbmVcIlxuICAgICAgY2xhc3M9XCJxLXB4LXNtXCJcbiAgICAgIEBjbGljaz1cImRvd25sb2FkXCJcbiAgICA+PC9xLWJ0bj5cblxuICAgIDxxLWJ0blxuICAgICAgZmxhdFxuICAgICAgaWNvbj1cIm1kaS1kZWxldGUtb3V0bGluZVwiXG4gICAgICBjbGFzcz1cInEtcHgtc21cIlxuICAgICAgY29sb3I9XCJuZWdhdGl2ZVwiXG4gICAgICBAY2xpY2s9XCJjbGVhclwiXG4gICAgPjwvcS1idG4+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCB7IHJlZiwgY29tcHV0ZWQsIHdhdGNoIH0gZnJvbSAndnVlJ1xuaW1wb3J0IHsgZXhwb3J0RmlsZSB9IGZyb20gJ3F1YXNhcidcblxuaW1wb3J0IHsgc2hvd05vdGlmIH0gZnJvbSAnc2hhcmVkL2xpYi91dGlscy91c2VTaG93Tm90aWYnXG5cbmltcG9ydCB7IFBhaW50TW9kZWwgfSBmcm9tICdlbnRpdHkvUGFpbnQnXG5jb25zdCBwYWludFN0b3JlID0gUGFpbnRNb2RlbC51c2VQYWludFN0b3JlKClcbmNvbnN0IHBlID0gY29tcHV0ZWQoKCkgPT4gcGFpbnRTdG9yZS5wZSlcblxuY29uc3QgbW9kZU1vZGVsID0gcmVmKCdwZW5jaWwnKVxuY29uc3QgY2hhbmdlTW9kZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gIGlmIChwZS52YWx1ZSkge1xuICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgIGNhc2UgJ3BlbmNpbCc6XG4gICAgICAgIHBlLnZhbHVlLmN1cnJlbnRDb2xvciA9IDFcbiAgICAgICAgcGUudmFsdWUubW9kZSA9ICdkcmF3J1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnZXJhc2VyJzpcbiAgICAgICAgcGUudmFsdWUuY3VycmVudENvbG9yID0gMFxuICAgICAgICBwZS52YWx1ZS5tb2RlID0gJ2RyYXcnXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdsaW5lJzpcbiAgICAgICAgcGUudmFsdWUuY3VycmVudENvbG9yID0gMVxuICAgICAgICBwZS52YWx1ZS5tb2RlID0gJ2xpbmUnXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdyZWN0YW5nbGUnOlxuICAgICAgICBwZS52YWx1ZS5jdXJyZW50Q29sb3IgPSAxXG4gICAgICAgIHBlLnZhbHVlLm1vZGUgPSAncmVjdCdcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ2ZpbGwnOlxuICAgICAgICBwZS52YWx1ZS5jdXJyZW50Q29sb3IgPSAxXG4gICAgICAgIHBlLnZhbHVlLm1vZGUgPSAnZmlsbCdcbiAgICAgICAgYnJlYWtcbiAgICB9XG4gIH1cbn1cblxuY29uc3Qgem9vbUxpbWl0ID0gY29tcHV0ZWQoKCkgPT4ge1xuICAvKiBjb25zdCBjb250YWluZXJXaWR0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWludCcpLmNsaWVudFdpZHRoXG4gICAgICBjb25zdCBjb250YWluZXJIZWlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFpbnQnKS5jbGllbnRIZWlnaHRcbiAgICAgIGxldCBtYXggPSAxMFxuICAgICAgaWYgKGNvbnRhaW5lcldpZHRoKSB7XG4gICAgICAgIG1heCA9IE1hdGgucm91bmQoTWF0aC5taW4oY29udGFpbmVyV2lkdGggLyAxMjgsIGNvbnRhaW5lckhlaWdodCAvIDY0KSlcbiAgICAgIH0gKi9cbiAgcmV0dXJuIHtcbiAgICBtaW46IDEsXG4gICAgbWF4OiA4XG4gIH1cbn0pXG5cbndhdGNoKFxuICAoKSA9PiBwYWludFN0b3JlLnpvb21MZXZlbCxcbiAgKG5ld1ZhbHVlOiBudW1iZXIpID0+IHtcbiAgICBpZiAoIS9eWzAtOV0qJC8udGVzdChTdHJpbmcobmV3VmFsdWUpKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmIChwZS52YWx1ZSkge1xuICAgICAgcGUudmFsdWUucmVzaXplKHsgem9vbTogbmV3VmFsdWUgfSlcbiAgICB9XG4gIH1cbilcblxuY29uc3Qgem9vbSA9ICh7XG4gIG11bCxcbiAgdmFsLFxuICBvZmZzZXRcbn06IHtcbiAgbXVsPzogbnVtYmVyXG4gIHZhbD86IG51bWJlclxuICBvZmZzZXQ6IG51bWJlclxufSkgPT4ge1xuICBsZXQgcmVzdWx0XG4gIGlmIChtdWwpIHtcbiAgICByZXN1bHQgPSBwYWludFN0b3JlLnpvb21MZXZlbCAqIG11bFxuICB9IGVsc2UgaWYgKHZhbCkge1xuICAgIHJlc3VsdCA9IHZhbFxuICB9IGVsc2UgaWYgKG9mZnNldCkge1xuICAgIHJlc3VsdCA9IHBhaW50U3RvcmUuem9vbUxldmVsICsgb2Zmc2V0XG4gIH1cbiAgaWYgKHJlc3VsdCkge1xuICAgIGlmIChyZXN1bHQgPCB6b29tTGltaXQudmFsdWUubWluKSB7XG4gICAgICBwYWludFN0b3JlLnpvb21MZXZlbCA9IHpvb21MaW1pdC52YWx1ZS5taW5cbiAgICB9IGVsc2UgaWYgKHJlc3VsdCA+IHpvb21MaW1pdC52YWx1ZS5tYXgpIHtcbiAgICAgIHBhaW50U3RvcmUuem9vbUxldmVsID0gem9vbUxpbWl0LnZhbHVlLm1heFxuICAgIH0gZWxzZSB7XG4gICAgICBwYWludFN0b3JlLnpvb21MZXZlbCA9IHJlc3VsdFxuICAgIH1cbiAgfVxufVxuY29uc3QgdW5kbyA9ICgpID0+IHtcbiAgcGUudmFsdWU/LnVuZG8oKVxufVxuY29uc3QgcmVkbyA9ICgpID0+IHtcbiAgcGUudmFsdWU/LnJlZG8oKVxufVxuY29uc3QgY2xlYXIgPSAoKSA9PiB7XG4gIHBlLnZhbHVlPy5jbGVhcigpXG59XG5cbmNvbnN0IHRyaWdnZXJVcGxvYWQgPSAoKSA9PiB7XG4gIGNvbnN0IGVsOiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maWxlLXVwbG9hZCcpXG4gIGlmIChlbCkge1xuICAgIGVsLmNsaWNrKClcbiAgfVxufVxuY29uc3QgdXBsb2FkID0gKGV2ZW50OiBFdmVudCk6IHZvaWQgPT4ge1xuICBwYWludFN0b3JlLmZsYWdzLmltYWdlRmlsZUxvYWRpbmcgPSB0cnVlXG5cbiAgdHJ5IHtcbiAgICBjb25zdCBpbnB1dCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50XG4gICAgaWYgKGlucHV0KSB7XG4gICAgICBjb25zdCBmaWxlcyA9IGlucHV0LmZpbGVzXG4gICAgICBpZiAoZmlsZXM/Lmxlbmd0aCkge1xuICAgICAgICBjb25zdCBmaWxlID0gZmlsZXNbMF1cbiAgICAgICAgaWYgKGZpbGUpIHtcbiAgICAgICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG5cbiAgICAgICAgICByZWFkZXIub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlYWRlci5yZWFkeVN0YXRlICE9PSBGaWxlUmVhZGVyLkRPTkUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKVxuICAgICAgICAgICAgaW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgOyhcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmlsZS11cGxvYWQnKSBhcyBIVE1MSW5wdXRFbGVtZW50XG4gICAgICAgICAgICAgICkudmFsdWUgPSAnJ1xuICAgICAgICAgICAgICBwYWludFN0b3JlLmZsYWdzLmltYWdlRmlsZUxvYWRpbmcgPSBmYWxzZVxuICAgICAgICAgICAgICBwYWludFN0b3JlLnVwbG9hZGVkSW1hZ2UgPSBpbWdcbiAgICAgICAgICAgICAgcGFpbnRTdG9yZS5mbGFncy5kaXRoZXJEaWFsb2cgPSB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbWcuc3JjID0gcmVhZGVyLnJlc3VsdCBhcyBzdHJpbmdcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHBhaW50U3RvcmUuZmxhZ3MuaW1hZ2VGaWxlTG9hZGluZyA9IGZhbHNlXG4gICAgY29uc29sZS5lcnJvcihlcnJvcilcbiAgfVxufVxuXG5jb25zdCBkb3dubG9hZCA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgYmxvYiA9IChhd2FpdCBwZS52YWx1ZT8udG9CbG9iKCkpIGFzIEJsb2JcbiAgY29uc3Qgc3RhdHVzID0gZXhwb3J0RmlsZShgUGFpbnRfJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCl9LnBuZ2AsIGJsb2IpXG4gIGlmICghc3RhdHVzKSB7XG4gICAgc2hvd05vdGlmKHtcbiAgICAgIG1lc3NhZ2U6ICdGYWlsZWQgdG8gZG93bmxvYWQgaW1hZ2U6IHBlcm1pc3Npb24gZGVuaWVkJyxcbiAgICAgIGNvbG9yOiAnbmVnYXRpdmUnXG4gICAgfSlcbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiIHNjb3BlZD5cbi5jb250cm9scyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIHotaW5kZXg6IDE7XG59XG48L3N0eWxlPlxuIiwiZXhwb3J0IGZ1bmN0aW9uIE1lc3NhZ2VTdHJlYW0gKCkge1xuICByZXR1cm4gbmV3IFJlYWRhYmxlU3RyZWFtKHtcbiAgICBzdGFydCAoY29udHJvbGxlcikge1xuICAgICAgc2VsZi5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZXYgPT4gY29udHJvbGxlci5lbnF1ZXVlKGV2LmRhdGEpKVxuICAgIH1cbiAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1lc3NhZ2UgKHdvcmtlciwgaWQpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgIHdvcmtlci5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24gZiAoeyBkYXRhIH0pIHtcbiAgICAgIGlmIChkYXRhLmlkICE9PSBpZCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHdvcmtlci5yZW1vdmVFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZilcbiAgICAgIHJlc29sdmUoZGF0YSlcbiAgICB9KVxuICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdWlkICgpIHtcbiAgcmV0dXJuIEFycmF5LmZyb20oeyBsZW5ndGg6IDE2IH0sICgpID0+XG4gICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU2KS50b1N0cmluZygxNilcbiAgKS5qb2luKCcnKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbmV4dEV2ZW50ICh0YXJnZXQsIG5hbWUpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT5cbiAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCByZXNvbHZlLCB7IG9uY2U6IHRydWUgfSlcbiAgKVxufVxuIiwiaW1wb3J0IHsgY3JlYXRlTmFub0V2ZW50cyB9IGZyb20gJ25hbm9ldmVudHMnXG5pbXBvcnQgeyBtZXNzYWdlIH0gZnJvbSAnLi93b3JrZXItdXRpbHMuanMnXG5cbmV4cG9ydCBjb25zdCBlbWl0dGVyID0gY3JlYXRlTmFub0V2ZW50cygpXG5cbmxldCB3b3JrZXJcblxuZnVuY3Rpb24gc2V0dXAgKCkge1xuICB3b3JrZXIgPSBuZXcgV29ya2VyKG5ldyBVUkwoJy4vbW9ub2Nocm9tZS13b3JrZXIuanMnLCBpbXBvcnQubWV0YS51cmwpLCB7IHR5cGU6ICdtb2R1bGUnIH0pXG4gIHdvcmtlci5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgYXN5bmMgZSA9PiB7XG4gICAgY29uc3QgeyBpZCwgdHlwZSwgdGl0bGUsIGltYWdlRGF0YSB9ID0gZS5kYXRhXG4gICAgaWYgKHR5cGUgPT09ICdzdGFydGVkJykge1xuICAgICAgZW1pdHRlci5lbWl0KCdkaXRoZXIvc3RhcnQnLCB7IGlkLCB0aXRsZSB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBlbWl0dGVyLmVtaXQoJ2RpdGhlci9yZXN1bHQnLCB7IGlkLCBpbWFnZURhdGEgfSlcbiAgICB9XG4gIH0pXG4gIHdvcmtlci5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsICgpID0+XG4gICAgY29uc29sZS5lcnJvcignRXJyb3IgaW4gbW9ub2Nocm9tZSB3b3JrZXInKVxuICApXG5cbiAgLyogY29uc3QgYmx1ZW5vaXNlV29ya2VyID0gbmV3IFdvcmtlcihuZXcgVVJMKCcuL2JsdWVub2lzZS13b3JrZXIuanMnLCBpbXBvcnQubWV0YS51cmwpLCB7XG4gICAgbmFtZTogJ2JsdWVub2lzZScsXG4gICAgdHlwZTogJ21vZHVsZSdcbiAgfSlcbiAgYmx1ZW5vaXNlV29ya2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgKCkgPT5cbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBpbiBibHVlbm9pc2Ugd29ya2VyJylcbiAgKVxuICBibHVlbm9pc2VXb3JrZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAnbWVzc2FnZScsXG4gICAgKHsgZGF0YSB9KSA9PiB7XG4gICAgICB3b3JrZXIucG9zdE1lc3NhZ2UoeyAuLi5kYXRhLCBpZDogJ2JsdWVub2lzZScgfSlcbiAgICB9LFxuICAgIHsgb25jZTogdHJ1ZSB9XG4gICkgKi9cblxuICBjb25zdCBudW1CYXllckxldmVscyA9IDRcbiAgY29uc3QgYmF5ZXJXb3JrZXIgPSBuZXcgV29ya2VyKG5ldyBVUkwoJy4vYmF5ZXItd29ya2VyLmpzJywgaW1wb3J0Lm1ldGEudXJsKSwge1xuICAgIG5hbWU6ICdiYXllcicsXG4gICAgdHlwZTogJ21vZHVsZSdcbiAgfSlcbiAgYmF5ZXJXb3JrZXIuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoKSA9PlxuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGluIGJheWVyIHdvcmtlcicpXG4gIClcbiAgY29uc3QgYmF5ZXJMZXZlbHMgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiBudW1CYXllckxldmVscyB9LCAoXywgaWQpID0+IHtcbiAgICBiYXllcldvcmtlci5wb3N0TWVzc2FnZSh7XG4gICAgICBsZXZlbDogaWQsXG4gICAgICBpZFxuICAgIH0pXG4gICAgcmV0dXJuIG1lc3NhZ2UoYmF5ZXJXb3JrZXIsIGlkKS50aGVuKG0gPT4gbS5yZXN1bHQpXG4gIH0pXG4gIFByb21pc2UuYWxsKGJheWVyTGV2ZWxzKS50aGVuKGJheWVyTGV2ZWxzID0+XG4gICAgd29ya2VyLnBvc3RNZXNzYWdlKHsgYmF5ZXJMZXZlbHMsIGlkOiAnYmF5ZXJsZXZlbHMnIH0pXG4gIClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpdGhlciAoaW1hZ2UpIHtcbiAgaWYgKCF3b3JrZXIpIHtcbiAgICBzZXR1cCgpXG4gIH1cbiAgd29ya2VyLnBvc3RNZXNzYWdlKHtcbiAgICBpZDogJ2ltYWdlJyxcbiAgICBpbWFnZVxuICB9KVxufVxuIiwiPHRlbXBsYXRlPlxuICA8cS1jYXJkIHN0eWxlPVwid2lkdGg6IDYxNnB4OyBtaW4td2lkdGg6IDMwMHB4XCI+XG4gICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDZcIj5VcGxvYWRlZCBpbWFnZTwvZGl2PlxuICAgIDwvcS1jYXJkLXNlY3Rpb24+XG5cbiAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJxLXB0LW5vbmVcIj5cbiAgICAgIDxjYW52YXNcbiAgICAgICAgcmVmPVwic291cmNlQ2FudmFzUmVmXCJcbiAgICAgICAgd2lkdGg9XCIxMjhcIlxuICAgICAgICBoZWlnaHQ9XCI2NFwiXG4gICAgICAgIGNsYXNzPVwicS1tbC1zbVwiXG4gICAgICA+PC9jYW52YXM+XG4gICAgPC9xLWNhcmQtc2VjdGlvbj5cblxuICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInEtcHQtbm9uZVwiIHYtaWY9XCJkaXRoZXJQcm9jZXNzZXMubGVuZ3RoXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNlwiPlNlbGVjdCBkaXRoZXJpbmcgbWV0aG9kOjwvZGl2PlxuICAgIDwvcS1jYXJkLXNlY3Rpb24+XG5cbiAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJxLXB5LW5vbmUgcm93IGp1c3RpZnktc3RhcnRcIj5cbiAgICAgIDxkaXZcbiAgICAgICAgdi1mb3I9XCJwIGluIGRpdGhlclByb2Nlc3Nlc1wiXG4gICAgICAgIDprZXk9XCJwLmlkXCJcbiAgICAgICAgY2xhc3M9XCJjb2x1bW4gZmxleC1jZW50ZXIgcS1tYS1zbVwiXG4gICAgICA+XG4gICAgICAgIDxkaXYgdi1pZj1cIiFwLmltYWdlRGF0YVwiIGNsYXNzPVwiY2FudmFzLXBsYWNlaG9sZGVyIGZsZXggZmxleC1jZW50ZXJcIj5cbiAgICAgICAgICA8cS1zcGlubmVyIGNvbG9yPVwicHJpbWFyeVwiIHNpemU9XCIzZW1cIiAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGNhbnZhc1xuICAgICAgICAgIHYtZWxzZVxuICAgICAgICAgIDpjbGFzcz1cInAuaWRcIlxuICAgICAgICAgIHdpZHRoPVwiMTI4XCJcbiAgICAgICAgICBoZWlnaHQ9XCI2NFwiXG4gICAgICAgICAgQGNsaWNrPVwic2VsZWN0KHAuaW1hZ2VEYXRhKVwiXG4gICAgICAgID48L2NhbnZhcz5cbiAgICAgICAgPHEtdG9vbHRpcCA6b2Zmc2V0PVwiWzAsIDNdXCIgY2xhc3M9XCJiZy1wcmltYXJ5XCI+e3sgcC50aXRsZSB9fTwvcS10b29sdGlwPlxuICAgICAgPC9kaXY+XG4gICAgPC9xLWNhcmQtc2VjdGlvbj5cblxuICAgIDxxLWNhcmQtYWN0aW9ucyBhbGlnbj1cInJpZ2h0XCI+XG4gICAgICA8cS1idG4gZmxhdCBsYWJlbD1cIkNhbmNlbFwiIEBjbGljaz1cImNhbmNlbFwiIC8+XG4gICAgPC9xLWNhcmQtYWN0aW9ucz5cbiAgPC9xLWNhcmQ+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgcmVmLCBvbk1vdW50ZWQgfSBmcm9tICd2dWUnXG5pbXBvcnQgeyBkaXRoZXIsIGVtaXR0ZXIgfSBmcm9tICdzaGFyZWQvbGliL3V0aWxzL2RpdGhlcnB1bmsvbW9ub2Nocm9tZSdcblxuY29uc3QgcHJvcHMgPSBkZWZpbmVQcm9wcyh7XG4gIGltZzogT2JqZWN0XG59KVxuXG5jb25zdCBlbWl0ID0gZGVmaW5lRW1pdHMoWydjYW5jZWwnLCAnc2VsZWN0J10pXG5cbmNvbnN0IHNvdXJjZUltYWdlRGF0YSA9IHJlZihudWxsKVxuY29uc3QgZGl0aGVyUHJvY2Vzc2VzID0gcmVmKFtdKVxuY29uc3Qgc291cmNlQ2FudmFzUmVmID0gcmVmKG51bGwpXG5jb25zdCB1bmJpbmREaXRoZXJTdGFydCA9IHJlZihudWxsKVxuY29uc3QgdW5iaW5kRGl0aGVyUmVzdWx0ID0gcmVmKG51bGwpXG5cbmNvbnN0IGRyYXdTb3VyY2VJbWcgPSAoKSA9PiB7XG4gIGNvbnN0IHNvdXJjZUN0eCA9IHNvdXJjZUNhbnZhc1JlZi52YWx1ZS5nZXRDb250ZXh0KCcyZCcpXG4gIHNvdXJjZUN0eC5maWxsU3R5bGUgPSAnd2hpdGUnXG4gIHNvdXJjZUN0eC5maWxsUmVjdCgwLCAwLCAxMjgsIDY0KVxuICBzb3VyY2VDdHguZHJhd0ltYWdlKHByb3BzLmltZywgMCwgMCwgMTI4LCA2NClcbiAgc291cmNlSW1hZ2VEYXRhLnZhbHVlID0gc291cmNlQ3R4LmdldEltYWdlRGF0YSgwLCAwLCAxMjgsIDY0KVxuXG4gIHN0YXJ0RGl0aGVyKClcbn1cbmNvbnN0IHN0YXJ0RGl0aGVyID0gKCkgPT4ge1xuICB1bmJpbmREaXRoZXJTdGFydC52YWx1ZSA9IGVtaXR0ZXIub24oJ2RpdGhlci9zdGFydCcsIG9uRGl0aGVyU3RhcnQpXG4gIHVuYmluZERpdGhlclJlc3VsdC52YWx1ZSA9IGVtaXR0ZXIub24oJ2RpdGhlci9yZXN1bHQnLCBvbkRpdGhlclJlc3VsdClcbiAgZGl0aGVyKHNvdXJjZUltYWdlRGF0YS52YWx1ZSlcbn1cbmNvbnN0IG9uRGl0aGVyU3RhcnQgPSAoeyBpZCwgdGl0bGUgfSkgPT4ge1xuICBpZiAoZGl0aGVyUHJvY2Vzc2VzLnZhbHVlLmZpbmQoKGUpID0+IGUuaWQgPT09IGlkKSkge1xuICAgIHJldHVyblxuICB9XG4gIGRpdGhlclByb2Nlc3Nlcy52YWx1ZS5wdXNoKHsgaWQsIHRpdGxlIH0pXG59XG5jb25zdCBvbkRpdGhlclJlc3VsdCA9ICh7IGlkLCBpbWFnZURhdGEgfSkgPT4ge1xuICBjb25zdCBwID0gZGl0aGVyUHJvY2Vzc2VzLnZhbHVlLmZpbmQoKGUpID0+IGUuaWQgPT09IGlkKVxuICBpZiAoIXApIHtcbiAgICByZXR1cm5cbiAgfVxuICBwLmltYWdlRGF0YSA9IGltYWdlRGF0YVxuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBjb25zdCBkaXRoZXJDYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBjYW52YXMuJHtwLmlkfWApXG4gICAgaWYgKGRpdGhlckNhbnZhcykge1xuICAgICAgZGl0aGVyQ2FudmFzLmdldENvbnRleHQoJzJkJykucHV0SW1hZ2VEYXRhKGltYWdlRGF0YSwgMCwgMClcbiAgICB9XG4gIH0sIDE1MClcbn1cbmNvbnN0IGNhbmNlbCA9ICgpID0+IHtcbiAgZGl0aGVyUHJvY2Vzc2VzLnZhbHVlID0gW11cbiAgZW1pdCgnY2FuY2VsJylcbn1cbmNvbnN0IHNlbGVjdCA9IChpbWFnZURhdGEpID0+IHtcbiAgZW1pdCgnc2VsZWN0JywgaW1hZ2VEYXRhKVxufVxuXG5vbk1vdW50ZWQoKCkgPT4ge1xuICBkcmF3U291cmNlSW1nKClcbn0pXG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzYXNzXCIgc2NvcGVkPlxuY2FudmFzXG4gIGJvcmRlcjogMXB4IHNvbGlkXG4gIGltYWdlLXJlbmRlcmluZzogcGl4ZWxhdGVkXG4gIGN1cnNvcjogcG9pbnRlclxuICAmOmhvdmVyXG4gICAgYm94LXNoYWRvdzogMCAwIDAgMXB4ICRwcmltYXJ5XG4gICAgYm9yZGVyLWNvbG9yOiAkcHJpbWFyeVxuXG4uY2FudmFzLXBsYWNlaG9sZGVyXG4gIHdpZHRoOiAxMjhweFxuICBoZWlnaHQ6IDY0cHhcbiAgYm9yZGVyOiAxcHggc29saWRcbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxHZW5lcmljUGFnZUxheW91dFxuICAgIHRpdGxlPVwiUGFpbnRcIlxuICAgIGljb249XCJmbGlwcGVyOnBhaW50XCJcbiAgICBkZXNjcmlwdGlvbj1cIlBpeGVsIGVkaXRvciBmb3IgRmxpcHBlciwgc3RyZWFtZWQgdG8gdGhlIGRldmljZVwiXG4gICAgY2xhc3M9XCJyZWxhdGl2ZS1wb3NpdGlvblwiXG4gID5cbiAgICA8ZGl2IGNsYXNzPVwiY29sdW1uIGZpdFwiPlxuICAgICAgPGRpdiBjbGFzcz1cImNvbCBmaXQgY29sdW1uIGl0ZW1zLWNlbnRlciBwYWludFwiPlxuICAgICAgICA8cS1wYWdlLXN0aWNreSBwb3NpdGlvbj1cImJvdHRvbVwiIDpvZmZzZXQ9XCJbMTYsIDQwXVwiPlxuICAgICAgICAgIDxQYWludFBpeGVsQ29udHJvbHMgLz5cbiAgICAgICAgPC9xLXBhZ2Utc3RpY2t5PlxuXG4gICAgICAgIDxQYWludFBpeGVsRWRpdG9yXG4gICAgICAgICAgY2xhc3M9XCJjb2xcIlxuICAgICAgICAgIEBrZXlkb3duPVwiaGFuZGxlSW50ZXJhY3Rpb25cIlxuICAgICAgICAgIEBtb3VzZXVwPVwibW91c2VVcFwiXG4gICAgICAgICAgQG1vdXNlbW92ZT1cImhhbmRsZUludGVyYWN0aW9uXCJcbiAgICAgICAgLz5cblxuICAgICAgICA8cS1wYWdlLXN0aWNreSBwb3NpdGlvbj1cImJvdHRvbS1yaWdodFwiIDpvZmZzZXQ9XCJbOCwgOF1cIj5cbiAgICAgICAgICA8UGFpbnRNaXJyb3IgLz5cbiAgICAgICAgPC9xLXBhZ2Utc3RpY2t5PlxuXG4gICAgICAgIDxxLWRpYWxvZyB2LW1vZGVsPVwicGFpbnRTdG9yZS5mbGFncy5kaXRoZXJEaWFsb2dcIj5cbiAgICAgICAgICA8UGFpbnREaXRoZXJDYXJkXG4gICAgICAgICAgICA6aW1nPVwicGFpbnRTdG9yZS51cGxvYWRlZEltYWdlXCJcbiAgICAgICAgICAgIEBjYW5jZWw9XCJwYWludFN0b3JlLmZsYWdzLmRpdGhlckRpYWxvZyA9IGZhbHNlXCJcbiAgICAgICAgICAgIEBzZWxlY3Q9XCJkcmF3SW1hZ2VcIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvcS1kaWFsb2c+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDx0ZW1wbGF0ZSAjaW5mbz5cbiAgICAgIDxoNiBjbGFzcz1cInEtbXQtbm9uZSBxLW1iLXNtXCI+QWJvdXQgUGFpbnQ8L2g2PlxuICAgICAgPHA+XG4gICAgICAgIERyYXcgcGl4ZWwgYXJ0IG9yIHRlc3QgVUkgZWxlbWVudHMgcmlnaHQgb24geW91ciBGbGlwcGVyJ3Mgc2NyZWVuLiBUaGVcbiAgICAgICAgZWRpdG9yIGlzIHN0cmVhbWVkIHRvIHRoZSBkZXZpY2UgaW4gcmVhbC10aW1lLiBVc2UgYmFzaWMgZHJhd2luZyB0b29scyxcbiAgICAgICAgdXBsb2FkIGltYWdlcyBhbmQgZXhwb3J0IHRoZSBQYWludCBjYW52YXMgdG8gYSBQTkcgd2hlbiB5b3UncmUgZG9uZS5cbiAgICAgIDwvcD5cbiAgICAgIDxwPlxuICAgICAgICBUaGUgYm90dG9tIHJpZ2h0IGNvcm5lciBzaG93cyB0aGUgY2FudmFzIGluIHJlYWwgc2l6ZSAoMTI4eDY0IHBpeGVscykuXG4gICAgICAgIFNhdmVkIGltYWdlcyB3aWxsIGhhdmUgdGhlIHNhbWUgcmVzb2x1dGlvbi4gVGhlIGNoZWNrZXJib2FyZCBiYWNrZ3JvdW5kXG4gICAgICAgIGlzIG5vdCBwYXJ0IG9mIHRoZSBpbWFnZSBhbmQgc2VydmVzIGFzIGEgdmlzdWFsIGFpZC5cbiAgICAgIDwvcD5cbiAgICAgIDxwIGNsYXNzPVwicS1tYi1ub25lXCI+XG4gICAgICAgIE5vdGUgdGhhdCBGbGlwcGVyIGhhcyB0byBiZSB1bmxvY2tlZCB0byBiZSBhYmxlIHRvIHNob3cgdGhlIGltYWdlIG9uIHRoZVxuICAgICAgICBzY3JlZW4uXG4gICAgICA8L3A+XG4gICAgPC90ZW1wbGF0ZT5cbiAgPC9HZW5lcmljUGFnZUxheW91dD5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgeyBHZW5lcmljUGFnZUxheW91dCB9IGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL0dlbmVyaWNQYWdlTGF5b3V0J1xuaW1wb3J0IHsgY29tcHV0ZWQsIHdhdGNoLCBvbk1vdW50ZWQsIG9uQmVmb3JlVW5tb3VudCB9IGZyb20gJ3Z1ZSdcbmltcG9ydCB7IHRocm90dGxlIH0gZnJvbSAncXVhc2FyJ1xuXG5pbXBvcnQgeyBzaG93Tm90aWYgfSBmcm9tICdzaGFyZWQvbGliL3V0aWxzL3VzZVNob3dOb3RpZidcbmltcG9ydCB7IHJwY0Vycm9ySGFuZGxlciB9IGZyb20gJ3NoYXJlZC9saWIvdXRpbHMvdXNlUnBjVXRpbHMnXG5cbmltcG9ydCB7IGltYWdlRGF0YVRvWEJNIH0gZnJvbSAnc2hhcmVkL2xpYi91dGlscy9waXhlbGVkaXRvci94Ym0nXG5cbmltcG9ydCB7XG4gIFBhaW50UGl4ZWxFZGl0b3IsXG4gIFBhaW50UGl4ZWxDb250cm9sc1xufSBmcm9tICdmZWF0dXJlcy9QYWludC9QaXhlbEVkaXRvcidcbmltcG9ydCB7IFBhaW50RGl0aGVyQ2FyZCB9IGZyb20gJ2ZlYXR1cmVzL1BhaW50L0RpdGhlcidcbmltcG9ydCB7IFBhaW50TWlycm9yLCBQYWludE1vZGVsIH0gZnJvbSAnZW50aXR5L1BhaW50J1xuY29uc3QgcGFpbnRTdG9yZSA9IFBhaW50TW9kZWwudXNlUGFpbnRTdG9yZSgpXG5jb25zdCBwZSA9IGNvbXB1dGVkKCgpID0+IHBhaW50U3RvcmUucGUpXG5cbmltcG9ydCB7IEZsaXBwZXJNb2RlbCB9IGZyb20gJ2VudGl0eS9GbGlwcGVyJ1xuY29uc3QgZmxpcHBlclN0b3JlID0gRmxpcHBlck1vZGVsLnVzZUZsaXBwZXJTdG9yZSgpXG5cbmNvbnN0IGNvbXBvbmVudE5hbWUgPSAnUGFpbnQnXG5cbmNvbnN0IG1vdXNlVXAgPSAoKSA9PiB7XG4gIGlmICghcGUudmFsdWUpIHtcbiAgICByZXR1cm5cbiAgfVxuICBpZiAocGUudmFsdWUuZHJhd2luZykge1xuICAgIGlmIChwZS52YWx1ZS5tb2RlID09PSAnbGluZScpIHtcbiAgICAgIHBlLnZhbHVlLnNhdmUoKVxuICAgICAgcGUudmFsdWUucGxvdExpbmUocGUudmFsdWUucDAsIHBlLnZhbHVlLnAxKVxuICAgICAgcGUudmFsdWUuZHJhdygpXG4gICAgICBwZS52YWx1ZS51cGRhdGVkKClcbiAgICB9IGVsc2UgaWYgKHBlLnZhbHVlLm1vZGUgPT09ICdyZWN0Jykge1xuICAgICAgcGUudmFsdWUuc2F2ZSgpXG4gICAgICBwZS52YWx1ZS5wbG90UmVjdChwZS52YWx1ZS5wMCwgcGUudmFsdWUucDEpXG4gICAgICBwZS52YWx1ZS5kcmF3KClcbiAgICAgIHBlLnZhbHVlLnVwZGF0ZWQoKVxuICAgIH1cbiAgICBwZS52YWx1ZS5kcmF3aW5nID0gZmFsc2VcbiAgfVxufVxuXG5jb25zdCBkcmF3SW1hZ2UgPSAoaW1hZ2VEYXRhOiBJbWFnZURhdGEpID0+IHtcbiAgcGFpbnRTdG9yZS5mbGFncy5kaXRoZXJEaWFsb2cgPSBmYWxzZVxuICBjb25zdCBwaXhlbERhdGEgPSBbXVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGltYWdlRGF0YS5kYXRhLmxlbmd0aDsgaSArPSA0KSB7XG4gICAgaWYgKFxuICAgICAgaW1hZ2VEYXRhLmRhdGFbaV0hICsgaW1hZ2VEYXRhLmRhdGFbaSArIDFdISArIGltYWdlRGF0YS5kYXRhW2kgKyAyXSEgPT09XG4gICAgICAwXG4gICAgKSB7XG4gICAgICBwaXhlbERhdGEucHVzaCgxKVxuICAgIH0gZWxzZSB7XG4gICAgICBwaXhlbERhdGEucHVzaCgwKVxuICAgIH1cbiAgfVxuICBwZS52YWx1ZT8uc2V0RGF0YShwaXhlbERhdGEpXG59XG5cbmNvbnN0IHN0YXJ0VmlydHVhbERpc3BsYXkgPSBhc3luYyAoKSA9PiB7XG4gIGF3YWl0IGZsaXBwZXJTdG9yZS5mbGlwcGVyXG4gICAgPy5SUEMoJ2d1aVN0YXJ0VmlydHVhbERpc3BsYXknKVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdndWlTdGFydFZpcnR1YWxEaXNwbGF5IGVuYWJsZScpXG4gICAgfSlcbiAgICAuY2F0Y2goKGVycm9yOiBFcnJvcikgPT4ge1xuICAgICAgcnBjRXJyb3JIYW5kbGVyKHtcbiAgICAgICAgY29tcG9uZW50TmFtZSxcbiAgICAgICAgZXJyb3IsXG4gICAgICAgIGNvbW1hbmQ6ICdndWlTdGFydFZpcnR1YWxEaXNwbGF5J1xuICAgICAgfSlcbiAgICAgIHNob3dOb3RpZih7XG4gICAgICAgIG1lc3NhZ2U6IFwiQ291bGRuJ3Qgc3RhcnQgdmlydHVhbCBkaXNwbGF5IHNlc3Npb25cIixcbiAgICAgICAgY29sb3I6ICduZWdhdGl2ZSdcbiAgICAgIH0pXG4gICAgICB0aHJvdyBlcnJvclxuICAgIH0pXG59XG5jb25zdCBzdG9wVmlydHVhbERpc3BsYXkgPSBhc3luYyAoKSA9PiB7XG4gIC8vIGlmIChmbGlwcGVyU3RvcmUuaXNFbGVjdHJvbikge1xuICAvLyAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBmbGlwcGVyU3RvcmUuYXZhaWxhYmxlRmxpcHBlcnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gIC8vICAgICBjb25zdCBmbGlwcGVyID0gZmxpcHBlclN0b3JlLmF2YWlsYWJsZUZsaXBwZXJzW2luZGV4XTtcblxuICAvLyAgICAgaWYgKGZsaXBwZXIubmFtZSAhPT0gZmxpcHBlclN0b3JlLmZsaXBwZXI/Lm5hbWUpIHtcbiAgLy8gICAgICAgYXdhaXQgZmxpcHBlclxuICAvLyAgICAgICAgID8uUlBDKCdndWlTdG9wVmlydHVhbERpc3BsYXknKVxuICAvLyAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgLy8gICAgICAgICAgIGNvbnNvbGUubG9nKCdndWlTdGFydFZpcnR1YWxEaXNwbGF5IGRpc2FibGVkJylcbiAgLy8gICAgICAgICB9KVxuICAvLyAgICAgICAgIC5jYXRjaCgvKiAoZXJyb3I6IEVycm9yKSA9PiBycGNFcnJvckhhbmRsZXIoeyBjb21wb25lbnROYW1lLCBlcnJvciwgY29tbWFuZDogJ2d1aVN0b3BWaXJ0dWFsRGlzcGxheScgfSkgKi8pXG4gIC8vICAgICB9XG4gIC8vICAgfVxuICAvLyB9IGVsc2Uge1xuICBhd2FpdCBmbGlwcGVyU3RvcmUuZmxpcHBlclxuICAgID8uUlBDKCdndWlTdG9wVmlydHVhbERpc3BsYXknKVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdndWlTdGFydFZpcnR1YWxEaXNwbGF5IGRpc2FibGVkJylcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyb3I6IEVycm9yKSA9PlxuICAgICAgcnBjRXJyb3JIYW5kbGVyKHtcbiAgICAgICAgY29tcG9uZW50TmFtZSxcbiAgICAgICAgZXJyb3IsXG4gICAgICAgIGNvbW1hbmQ6ICdndWlTdG9wVmlydHVhbERpc3BsYXknXG4gICAgICB9KVxuICAgIClcbiAgLy8gfVxufVxuY29uc3QgZW5hYmxlQmFja2xpZ2h0ID0gdGhyb3R0bGUoYXN5bmMgKCkgPT4ge1xuICBhd2FpdCBmbGlwcGVyU3RvcmUuZmxpcHBlclxuICAgID8uUlBDKCdndWlTZW5kSW5wdXRFdmVudCcsIHsga2V5OiAnT0snLCB0eXBlOiAnUFJFU1MnIH0pXG4gICAgLmNhdGNoKChlcnJvcjogRXJyb3IpID0+XG4gICAgICBycGNFcnJvckhhbmRsZXIoeyBjb21wb25lbnROYW1lLCBlcnJvciwgY29tbWFuZDogJ2d1aVNlbmRJbnB1dEV2ZW50JyB9KVxuICAgIClcbiAgYXdhaXQgZmxpcHBlclN0b3JlLmZsaXBwZXJcbiAgICA/LlJQQygnZ3VpU2VuZElucHV0RXZlbnQnLCB7IGtleTogJ09LJywgdHlwZTogJ1NIT1JUJyB9KVxuICAgIC5jYXRjaCgoZXJyb3I6IEVycm9yKSA9PlxuICAgICAgcnBjRXJyb3JIYW5kbGVyKHsgY29tcG9uZW50TmFtZSwgZXJyb3IsIGNvbW1hbmQ6ICdndWlTZW5kSW5wdXRFdmVudCcgfSlcbiAgICApXG4gIGF3YWl0IGZsaXBwZXJTdG9yZS5mbGlwcGVyXG4gICAgPy5SUEMoJ2d1aVNlbmRJbnB1dEV2ZW50JywgeyBrZXk6ICdPSycsIHR5cGU6ICdSRUxFQVNFJyB9KVxuICAgIC5jYXRjaCgoZXJyb3I6IEVycm9yKSA9PlxuICAgICAgcnBjRXJyb3JIYW5kbGVyKHsgY29tcG9uZW50TmFtZSwgZXJyb3IsIGNvbW1hbmQ6ICdndWlTZW5kSW5wdXRFdmVudCcgfSlcbiAgICApXG59LCAxMDAwKVxuY29uc3Qgc2VuZEZyYW1lID0gdGhyb3R0bGUoYXN5bmMgKCkgPT4ge1xuICBpZiAocGUudmFsdWUpIHtcbiAgICBjb25zdCBpbWFnZURhdGEgPSBwZS52YWx1ZS50b0ltYWdlRGF0YSgpXG4gICAgY29uc3QgeGJtQnl0ZXMgPSBpbWFnZURhdGFUb1hCTShpbWFnZURhdGEpXG4gICAgYXdhaXQgZmxpcHBlclN0b3JlLmZsaXBwZXI/LlJQQygnZ3VpU2NyZWVuRnJhbWUnLCB7XG4gICAgICBkYXRhOiBuZXcgVWludDhBcnJheSh4Ym1CeXRlcylcbiAgICB9KVxuICB9XG59LCAxMDApXG5cbmNvbnN0IGhhbmRsZUludGVyYWN0aW9uID0gKGV2ZW50OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudCkgPT4ge1xuICBpZiAoXG4gICAgKGV2ZW50IGluc3RhbmNlb2YgTW91c2VFdmVudCAmJiBldmVudC5idXR0b25zKSB8fFxuICAgIChldmVudCBpbnN0YW5jZW9mIEtleWJvYXJkRXZlbnQgJiZcbiAgICAgIChldmVudC5jb2RlID09PSAnQXJyb3dSaWdodCcgfHxcbiAgICAgICAgZXZlbnQuY29kZSA9PT0gJ0Fycm93TGVmdCcgfHxcbiAgICAgICAgZXZlbnQuY29kZSA9PT0gJ0Fycm93RG93bicgfHxcbiAgICAgICAgZXZlbnQuY29kZSA9PT0gJ0Fycm93VXAnKSAmJlxuICAgICAgcGUudmFsdWU/LmRyYXdpbmcpXG4gICkge1xuICAgIGVuYWJsZUJhY2tsaWdodCgpXG4gICAgc2VuZEZyYW1lKClcbiAgfVxufVxuXG5wYWludFN0b3JlLnNldENhbGxiYWNrRnJhbWUoKCkgPT4ge1xuICBlbmFibGVCYWNrbGlnaHQoKVxuICBzZW5kRnJhbWUoKVxufSlcblxub25Nb3VudGVkKGFzeW5jICgpID0+IHtcbiAgaWYgKGZsaXBwZXJTdG9yZS5mbGlwcGVyUmVhZHkpIHtcbiAgICBpZiAoIWZsaXBwZXJTdG9yZS5ycGNBY3RpdmUpIHtcbiAgICAgIGF3YWl0IGZsaXBwZXJTdG9yZS5mbGlwcGVyPy5zdGFydFJQQ1Nlc3Npb24oKVxuICAgIH1cblxuICAgIGF3YWl0IHN0YXJ0VmlydHVhbERpc3BsYXkoKVxuICB9XG59KVxuXG53YXRjaChcbiAgKCkgPT4gZmxpcHBlclN0b3JlLmZsaXBwZXI/LmZsaXBwZXJSZWFkeSxcbiAgYXN5bmMgKG5ld1ZhbHVlKSA9PiB7XG4gICAgaWYgKG5ld1ZhbHVlKSB7XG4gICAgICBhd2FpdCBzdGFydFZpcnR1YWxEaXNwbGF5KClcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFmbGlwcGVyU3RvcmUuaXNFbGVjdHJvbikge1xuICAgICAgICBhd2FpdCBzdG9wVmlydHVhbERpc3BsYXkoKVxuICAgICAgfVxuICAgIH1cbiAgfVxuKVxuXG53YXRjaChcbiAgKCkgPT4gZmxpcHBlclN0b3JlLmZsYWdzLnN3aXRjaEZsaXBwZXIsXG4gIGFzeW5jIChuZXdWYWx1ZSwgb2xkVmFsdWUpID0+IHtcbiAgICBpZiAobmV3VmFsdWUgIT09IG9sZFZhbHVlICYmIG5ld1ZhbHVlID09PSB0cnVlICYmIG9sZFZhbHVlID09PSBmYWxzZSkge1xuICAgICAgYXdhaXQgc3RvcFZpcnR1YWxEaXNwbGF5KClcbiAgICB9XG4gIH1cbilcblxub25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgc3RvcFZpcnR1YWxEaXNwbGF5KClcbn0pXG48L3NjcmlwdD5cblxuPHN0eWxlIHNyYz1cInNoYXJlZC9saWIvdXRpbHMvcGl4ZWxlZGl0b3IvcGl4ZWxlZGl0b3IuY3NzXCI+PC9zdHlsZT5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiIHNjb3BlZD5cbjpkZWVwKC5wYWludCAucEUpIHtcbiAgYm9yZGVyOiBub25lO1xufVxuOmRlZXAoLnBhaW50IC5wRSAucEVfX2RyYXdpbmcpIHtcbiAgY3Vyc29yOiBub25lO1xufVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJfIiwieCIsInkiLCJlIiwibWlycm9yIiwiUGFpbnRNb2RlbC51c2VQYWludFN0b3JlIiwiX29wZW5CbG9jayIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfaG9pc3RlZF8xIiwiX2hvaXN0ZWRfMiIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfbm9ybWFsaXplU3R5bGUiLCJfY3JlYXRlQ29tbWVudFZOb2RlIiwiX2NyZWF0ZVZOb2RlIiwiX3dpdGhDdHgiLCJ3b3JrZXIiLCJiYXllckxldmVscyIsIl9jcmVhdGVCbG9jayIsIl9GcmFnbWVudCIsIl9yZW5kZXJMaXN0IiwiX25vcm1hbGl6ZUNsYXNzIiwiX2NyZWF0ZVRleHRWTm9kZSIsIl90b0Rpc3BsYXlTdHJpbmciLCJGbGlwcGVyTW9kZWwudXNlRmxpcHBlclN0b3JlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUtPLE1BQU0scUJBQXFCO0FBQUEsRUFDaEMsVUFBVTtBQUFBLElBQ1IsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLElBQ1QsV0FBVyxPQUFLO0FBQUEsTUFDZDtBQUFBLE1BQWE7QUFBQSxNQUNiO0FBQUEsTUFBZ0I7QUFBQSxNQUNoQjtBQUFBLE1BQU87QUFBQSxNQUFTO0FBQUEsTUFBVTtBQUFBLElBQ2hDLEVBQU0sU0FBUyxDQUFDO0FBQUEsRUFDaEI7QUFBQSxFQUNFLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLFdBQVcsT0FBSyxFQUFFLFdBQVc7QUFBQSxFQUNqQztBQUFBLEVBQ0UsUUFBUTtBQUNWO0FBRWUsU0FBQSxnQkFBWTtBQUN6QixRQUFNLEVBQUUsT0FBTyxPQUFPLEVBQUUsR0FBRSxFQUFFLElBQUssbUJBQWtCO0FBRW5ELFFBQU0sVUFBVSxPQUFPLFdBQVcsYUFBYTtBQUMvQyxNQUFJLFlBQVksZUFBZTtBQUM3QixZQUFRLE1BQU0sMENBQTBDO0FBQ3hELFdBQU87QUFBQSxFQUNUO0FBRUEsUUFBTSxTQUFTLFNBQVMsTUFBTTtBQUM1QixVQUFNLE1BQU0sTUFBTTtBQUVsQixXQUFPO0FBQUEsTUFDTCxLQUFLLElBQUksUUFBUSxLQUFLLE1BQU07QUFBQSxNQUM1QixPQUFPLElBQUksUUFBUSxPQUFPLE1BQU07QUFBQSxNQUNoQyxRQUFRLElBQUksUUFBUSxRQUFRLE1BQU07QUFBQSxNQUNsQyxNQUFNLElBQUksUUFBUSxNQUFNLE1BQU07QUFBQSxNQUM5QixVQUFVLFFBQVEsU0FBUyxRQUFRO0FBQUEsTUFDbkMsWUFBWSxRQUFRLFVBQVUsUUFBUTtBQUFBLElBQzVDO0FBQUEsRUFDRSxDQUFDO0FBRUQsUUFB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LEdBQUcsQ0FBQztBQUFBLEVBQ1IsR0FBRyxDQUFDLEdBQUcsQ0FBQztBQUFBLEVBQ1IsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDWCxHQUFHLENBQUMsQ0FBQztBQUFBLEVBQ0wsR0FBRyxDQUFDLEdBQUcsQ0FBQztBQUFBLEVBQ1IsSUFBSSxDQUFDLEdBQUcsQ0FBQztBQUFBLEVBQ1QsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDWixJQUFJLENBQUMsR0FBRyxDQUFDO0FBQUEsRUFDVCxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNaLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ1osSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNmLElBQUksQ0FBQyxDQUFDO0FBQUEsRUFDTixJQUFJLENBQUMsR0FBRyxDQUFDO0FBQUEsRUFDVCxJQUFJLENBQUMsR0FBRyxDQUFDO0FBQUEsRUFDVCxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNaLElBQUksQ0FBQyxHQUFHLENBQUM7QUFBQSxFQUNULElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ1osSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDWixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQztBQUFBLEVBQ1QsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDWixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNaLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDZixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNaLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDZixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2YsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2xCLElBQUksQ0FBQyxDQUFDO0FBQUEsRUFDTixJQUFJLENBQUMsR0FBRyxDQUFDO0FBQUEsRUFDVCxJQUFJLENBQUMsR0FBRyxDQUFDO0FBQUEsRUFDVCxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNaLElBQUksQ0FBQyxHQUFHLENBQUM7QUFBQSxFQUNULElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ1osSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDWixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQztBQUFBLEVBQ1QsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDWixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNaLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDZixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNaLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDZixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2YsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2xCLElBQUksQ0FBQyxHQUFHLENBQUM7QUFBQSxFQUNULElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ1osSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDWixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2YsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDWixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2YsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNmLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNsQixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNaLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDZixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2YsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2xCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDZixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDbEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2xCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ3JCLElBQUksQ0FBQyxDQUFDO0FBQUEsRUFDTixJQUFJLENBQUMsR0FBRyxDQUFDO0FBQUEsRUFDVCxJQUFJLENBQUMsR0FBRyxDQUFDO0FBQUEsRUFDVCxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNaLElBQUksQ0FBQyxHQUFHLENBQUM7QUFBQSxFQUNULElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ1osSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDWixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQztBQUFBLEVBQ1QsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDWixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNaLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDZixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNaLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDZixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2YsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2xCLElBQUksQ0FBQyxHQUFHLENBQUM7QUFBQSxFQUNULElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ1osSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDWixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2YsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDWixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2YsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNmLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNsQixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNaLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDZixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2YsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2xCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDZixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDbEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2xCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUM7QUFBQSxFQUNULElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ1osSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDWixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2YsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDYixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2hCLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDaEIsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ25CLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2IsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNoQixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2hCLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNuQixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2hCLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNuQixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDbkIsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDdEIsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDYixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2hCLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDaEIsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ25CLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDaEIsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ25CLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNuQixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUN0QixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2hCLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNuQixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDbkIsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDdEIsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ25CLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ3RCLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ3RCLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDekIsS0FBSyxDQUFDLENBQUM7QUFBQSxFQUNQLEtBQUssQ0FBQyxHQUFHLENBQUM7QUFBQSxFQUNWLEtBQUssQ0FBQyxHQUFHLENBQUM7QUFBQSxFQUNWLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2IsS0FBSyxDQUFDLEdBQUcsQ0FBQztBQUFBLEVBQ1YsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDYixLQUFLLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNiLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDaEIsS0FBSyxDQUFDLEdBQUcsQ0FBQztBQUFBLEVBQ1YsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDYixLQUFLLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNiLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDaEIsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDYixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2hCLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDaEIsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ25CLEtBQUssQ0FBQyxHQUFHLENBQUM7QUFBQSxFQUNWLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2IsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDYixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2hCLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2IsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNoQixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2hCLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNuQixLQUFLLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNiLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDaEIsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNoQixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDbkIsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNoQixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDbkIsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ25CLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ3RCLEtBQUssQ0FBQyxHQUFHLENBQUM7QUFBQSxFQUNWLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2IsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDYixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2hCLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2IsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNoQixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2hCLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNuQixLQUFLLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNiLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDaEIsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNoQixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDbkIsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNoQixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDbkIsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ25CLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ3RCLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2IsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNoQixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2hCLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNuQixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2hCLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNuQixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDbkIsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDdEIsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNoQixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDbkIsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ25CLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ3RCLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNuQixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUN0QixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUN0QixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ3pCLEtBQUssQ0FBQyxHQUFHLENBQUM7QUFBQSxFQUNWLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2IsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDYixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2hCLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2IsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNoQixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2hCLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNuQixLQUFLLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNiLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDaEIsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNoQixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDbkIsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNoQixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDbkIsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ25CLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ3RCLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2IsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNoQixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2hCLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNuQixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2hCLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNuQixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDbkIsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDdEIsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNoQixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDbkIsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ25CLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ3RCLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNuQixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUN0QixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUN0QixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ3pCLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2IsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNoQixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2hCLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNuQixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ2hCLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNuQixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDbkIsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDdEIsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNoQixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDbkIsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ25CLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ3RCLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNuQixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUN0QixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUN0QixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ3pCLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDaEIsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQ25CLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUNuQixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUN0QixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDbkIsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDdEIsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDdEIsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBQSxFQUN6QixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQUEsRUFDbkIsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFD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
