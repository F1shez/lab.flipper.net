import { u as useFieldEmits, a as useFieldProps, b as useField, c as useFieldState, f as fieldValueIsFilled, d as useKeyComposition } from "./use-file-dom-props-CkTfPNnd.js";
import { L as createComponent, B as noop, H as getCurrentInstance, a as ref, c as computed, w as watch, R as nextTick, ae as debounce, o as onBeforeMount, ab as onDeactivated, aa as onActivated, U as onBeforeUnmount, h, a7 as isDeepEqual, aC as shouldIgnoreKey, aD as prevent, D as stopAndPrevent, aE as onBeforeUpdate, aF as onUpdated, k as QIcon, an as stop, aG as isKeyCode, ai as hMergeSlot } from "./index-BXn1qSjA.js";
import { N as normalizeToInterval, E as QChip, h as QDialog, Q as QItemSection, a as QItemLabel, b as QItem } from "./KeypadButton.vue_vue_type_style_index_0_scoped_4cc0fc91_lang-B0Vue97M.js";
import { Q as QMenu } from "./QMenu-OiOcQlb1.js";
import { u as useFormProps, b as useFormInputNameAttr } from "./private.use-form-DlR7USk8.js";
const QField = createComponent({
  name: "QField",
  inheritAttrs: false,
  props: {
    ...useFieldProps,
    tag: {
      type: String,
      default: "label"
    }
  },
  emits: useFieldEmits,
  setup() {
    return useField(
      useFieldState({ tagProp: true })
    );
  }
});
let rtlHasScrollBug = false;
{
  const scroller = document.createElement("div");
  scroller.setAttribute("dir", "rtl");
  Object.assign(scroller.style, {
    width: "1px",
    height: "1px",
    overflow: "auto"
  });
  const spacer = document.createElement("div");
  Object.assign(spacer.style, {
    width: "1000px",
    height: "1px"
  });
  document.body.appendChild(scroller);
  scroller.appendChild(spacer);
  scroller.scrollLeft = -1e3;
  rtlHasScrollBug = scroller.scrollLeft >= 0;
  scroller.remove();
}
const aggBucketSize = 1e3;
const scrollToEdges = [
  "start",
  "center",
  "end",
  "start-force",
  "center-force",
  "end-force"
];
const filterProto = Array.prototype.filter;
const setOverflowAnchor = window.getComputedStyle(document.body).overflowAnchor === void 0 ? noop : function(contentEl, index) {
  if (contentEl === null) return;
  if (contentEl._qOverflowAnimationFrame !== void 0) {
    cancelAnimationFrame(contentEl._qOverflowAnimationFrame);
  }
  contentEl._qOverflowAnimationFrame = requestAnimationFrame(() => {
    if (contentEl === null) return;
    contentEl._qOverflowAnimationFrame = void 0;
    const children = contentEl.children || [];
    filterProto.call(children, (el2) => el2.dataset && el2.dataset.qVsAnchor !== void 0).forEach((el2) => {
      delete el2.dataset.qVsAnchor;
    });
    const el = children[index];
    if (el == null ? void 0 : el.dataset) {
      el.dataset.qVsAnchor = "";
    }
  });
};
function sumFn(acc, h2) {
  return acc + h2;
}
function getScrollDetails(parent, child, beforeRef, afterRef, horizontal, rtl, stickyStart, stickyEnd) {
  const parentCalc = parent === window ? document.scrollingElement || document.documentElement : parent, propElSize = horizontal === true ? "offsetWidth" : "offsetHeight", details = {
    scrollStart: 0,
    scrollViewSize: -stickyStart - stickyEnd,
    scrollMaxSize: 0,
    offsetStart: -stickyStart,
    offsetEnd: -stickyEnd
  };
  if (horizontal === true) {
    if (parent === window) {
      details.scrollStart = window.pageXOffset || window.scrollX || document.body.scrollLeft || 0;
      details.scrollViewSize += document.documentElement.clientWidth;
    } else {
      details.scrollStart = parentCalc.scrollLeft;
      details.scrollViewSize += parentCalc.clientWidth;
    }
    details.scrollMaxSize = parentCalc.scrollWidth;
    if (rtl === true) {
      details.scrollStart = (rtlHasScrollBug === true ? details.scrollMaxSize - details.scrollViewSize : 0) - details.scrollStart;
    }
  } else {
    if (parent === window) {
      details.scrollStart = window.pageYOffset || window.scrollY || document.body.scrollTop || 0;
      details.scrollViewSize += document.documentElement.clientHeight;
    } else {
      details.scrollStart = parentCalc.scrollTop;
      details.scrollViewSize += parentCalc.clientHeight;
    }
    details.scrollMaxSize = parentCalc.scrollHeight;
  }
  if (beforeRef !== null) {
    for (let el = beforeRef.previousElementSibling; el !== null; el = el.previousElementSibling) {
      if (el.classList.contains("q-virtual-scroll--skip") === false) {
        details.offsetStart += el[propElSize];
      }
    }
  }
  if (afterRef !== null) {
    for (let el = afterRef.nextElementSibling; el !== null; el = el.nextElementSibling) {
      if (el.classList.contains("q-virtual-scroll--skip") === false) {
        details.offsetEnd += el[propElSize];
      }
    }
  }
  if (child !== parent) {
    const parentRect = parentCalc.getBoundingClientRect(), childRect = child.getBoundingClientRect();
    if (horizontal === true) {
      details.offsetStart += childRect.left - parentRect.left;
      details.offsetEnd -= childRect.width;
    } else {
      details.offsetStart += childRect.top - parentRect.top;
      details.offsetEnd -= childRect.height;
    }
    if (parent !== window) {
      details.offsetStart += details.scrollStart;
    }
    details.offsetEnd += details.scrollMaxSize - details.offsetStart;
  }
  return details;
}
function setScroll(parent, scroll, horizontal, rtl) {
  if (scroll === "end") {
    scroll = (parent === window ? document.body : parent)[horizontal === true ? "scrollWidth" : "scrollHeight"];
  }
  if (parent === window) {
    if (horizontal === true) {
      if (rtl === true) {
        scroll = (rtlHasScrollBug === true ? document.body.scrollWidth - document.documentElement.clientWidth : 0) - scroll;
      }
      window.scrollTo(scroll, window.pageYOffset || window.scrollY || document.body.scrollTop || 0);
    } else {
      window.scrollTo(window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, scroll);
    }
  } else if (horizontal === true) {
    if (rtl === true) {
      scroll = (rtlHasScrollBug === true ? parent.scrollWidth - parent.offsetWidth : 0) - scroll;
    }
    parent.scrollLeft = scroll;
  } else {
    parent.scrollTop = scroll;
  }
}
function sumSize(sizeAgg, size, from, to) {
  if (from >= to) {
    return 0;
  }
  const lastTo = size.length, fromAgg = Math.floor(from / aggBucketSize), toAgg = Math.floor((to - 1) / aggBucketSize) + 1;
  let total = sizeAgg.slice(fromAgg, toAgg).reduce(sumFn, 0);
  if (from % aggBucketSize !== 0) {
    total -= size.slice(fromAgg * aggBucketSize, from).reduce(sumFn, 0);
  }
  if (to % aggBucketSize !== 0 && to !== lastTo) {
    total -= size.slice(to, toAgg * aggBucketSize).reduce(sumFn, 0);
  }
  return total;
}
const commonVirtScrollProps = {
  virtualScrollSliceSize: {
    type: [Number, String],
    default: 10
  },
  virtualScrollSliceRatioBefore: {
    type: [Number, String],
    default: 1
  },
  virtualScrollSliceRatioAfter: {
    type: [Number, String],
    default: 1
  },
  virtualScrollItemSize: {
    type: [Number, String],
    default: 24
  },
  virtualScrollStickySizeStart: {
    type: [Number, String],
    default: 0
  },
  virtualScrollStickySizeEnd: {
    type: [Number, String],
    default: 0
  },
  tableColspan: [Number, String]
};
const useVirtualScrollProps = {
  virtualScrollHorizontal: Boolean,
  onVirtualScroll: Function,
  ...commonVirtScrollProps
};
function useVirtualScroll({
  virtualScrollLength,
  getVirtualScrollTarget,
  getVirtualScrollEl,
  virtualScrollItemSizeComputed
  // optional
}) {
  const vm = getCurrentInstance();
  const { props, emit, proxy } = vm;
  const { $q } = proxy;
  let prevScrollStart, prevToIndex, localScrollViewSize, virtualScrollSizesAgg = [], virtualScrollSizes;
  const virtualScrollPaddingBefore = ref(0);
  const virtualScrollPaddingAfter = ref(0);
  const virtualScrollSliceSizeComputed = ref({});
  const beforeRef = ref(null);
  const afterRef = ref(null);
  const contentRef = ref(null);
  const virtualScrollSliceRange = ref({ from: 0, to: 0 });
  const colspanAttr = computed(() => props.tableColspan !== void 0 ? props.tableColspan : 100);
  if (virtualScrollItemSizeComputed === void 0) {
    virtualScrollItemSizeComputed = computed(() => props.virtualScrollItemSize);
  }
  const needsReset = computed(() => virtualScrollItemSizeComputed.value + ";" + props.virtualScrollHorizontal);
  const needsSliceRecalc = computed(
    () => needsReset.value + ";" + props.virtualScrollSliceRatioBefore + ";" + props.virtualScrollSliceRatioAfter
  );
  watch(needsSliceRecalc, () => {
    setVirtualScrollSize();
  });
  watch(needsReset, reset);
  function reset() {
    localResetVirtualScroll(prevToIndex, true);
  }
  function refresh(toIndex) {
    localResetVirtualScroll(toIndex === void 0 ? prevToIndex : toIndex);
  }
  function scrollTo(toIndex, edge) {
    const scrollEl = getVirtualScrollTarget();
    if (scrollEl === void 0 || scrollEl === null || scrollEl.nodeType === 8) return;
    const scrollDetails = getScrollDetails(
      scrollEl,
      getVirtualScrollEl(),
      beforeRef.value,
      afterRef.value,
      props.virtualScrollHorizontal,
      $q.lang.rtl,
      props.virtualScrollStickySizeStart,
      props.virtualScrollStickySizeEnd
    );
    localScrollViewSize !== scrollDetails.scrollViewSize && setVirtualScrollSize(scrollDetails.scrollViewSize);
    setVirtualScrollSliceRange(
      scrollEl,
      scrollDetails,
      Math.min(virtualScrollLength.value - 1, Math.max(0, parseInt(toIndex, 10) || 0)),
      0,
      scrollToEdges.indexOf(edge) !== -1 ? edge : prevToIndex !== -1 && toIndex > prevToIndex ? "end" : "start"
    );
  }
  function localOnVirtualScrollEvt() {
    const scrollEl = getVirtualScrollTarget();
    if (scrollEl === void 0 || scrollEl === null || scrollEl.nodeType === 8) return;
    const scrollDetails = getScrollDetails(
      scrollEl,
      getVirtualScrollEl(),
      beforeRef.value,
      afterRef.value,
      props.virtualScrollHorizontal,
      $q.lang.rtl,
      props.virtualScrollStickySizeStart,
      props.virtualScrollStickySizeEnd
    ), listLastIndex = virtualScrollLength.value - 1, listEndOffset = scrollDetails.scrollMaxSize - scrollDetails.offsetStart - scrollDetails.offsetEnd - virtualScrollPaddingAfter.value;
    if (prevScrollStart === scrollDetails.scrollStart) return;
    if (scrollDetails.scrollMaxSize <= 0) {
      setVirtualScrollSliceRange(scrollEl, scrollDetails, 0, 0);
      return;
    }
    localScrollViewSize !== scrollDetails.scrollViewSize && setVirtualScrollSize(scrollDetails.scrollViewSize);
    updateVirtualScrollSizes(virtualScrollSliceRange.value.from);
    const scrollMaxStart = Math.floor(scrollDetails.scrollMaxSize - Math.max(scrollDetails.scrollViewSize, scrollDetails.offsetEnd) - Math.min(virtualScrollSizes[listLastIndex], scrollDetails.scrollViewSize / 2));
    if (scrollMaxStart > 0 && Math.ceil(scrollDetails.scrollStart) >= scrollMaxStart) {
      setVirtualScrollSliceRange(
        scrollEl,
        scrollDetails,
        listLastIndex,
        scrollDetails.scrollMaxSize - scrollDetails.offsetEnd - virtualScrollSizesAgg.reduce(sumFn, 0)
      );
      return;
    }
    let toIndex = 0, listOffset = scrollDetails.scrollStart - scrollDetails.offsetStart, offset = listOffset;
    if (listOffset <= listEndOffset && listOffset + scrollDetails.scrollViewSize >= virtualScrollPaddingBefore.value) {
      listOffset -= virtualScrollPaddingBefore.value;
      toIndex = virtualScrollSliceRange.value.from;
      offset = listOffset;
    } else {
      for (let j = 0; listOffset >= virtualScrollSizesAgg[j] && toIndex < listLastIndex; j++) {
        listOffset -= virtualScrollSizesAgg[j];
        toIndex += aggBucketSize;
      }
    }
    while (listOffset > 0 && toIndex < listLastIndex) {
      listOffset -= virtualScrollSizes[toIndex];
      if (listOffset > -scrollDetails.scrollViewSize) {
        toIndex++;
        offset = listOffset;
      } else {
        offset = virtualScrollSizes[toIndex] + listOffset;
      }
    }
    setVirtualScrollSliceRange(
      scrollEl,
      scrollDetails,
      toIndex,
      offset
    );
  }
  function setVirtualScrollSliceRange(scrollEl, scrollDetails, toIndex, offset, align) {
    const alignForce = typeof align === "string" && align.indexOf("-force") !== -1;
    const alignEnd = alignForce === true ? align.replace("-force", "") : align;
    const alignRange = alignEnd !== void 0 ? alignEnd : "start";
    let from = Math.max(0, toIndex - virtualScrollSliceSizeComputed.value[alignRange]), to = from + virtualScrollSliceSizeComputed.value.total;
    if (to > virtualScrollLength.value) {
      to = virtualScrollLength.value;
      from = Math.max(0, to - virtualScrollSliceSizeComputed.value.total);
    }
    prevScrollStart = scrollDetails.scrollStart;
    const rangeChanged = from !== virtualScrollSliceRange.value.from || to !== virtualScrollSliceRange.value.to;
    if (rangeChanged === false && alignEnd === void 0) {
      emitScroll(toIndex);
      return;
    }
    const { activeElement } = document;
    const contentEl = contentRef.value;
    if (rangeChanged === true && contentEl !== null && contentEl !== activeElement && contentEl.contains(activeElement) === true) {
      contentEl.addEventListener("focusout", onBlurRefocusFn);
      setTimeout(() => {
        contentEl == null ? void 0 : contentEl.removeEventListener("focusout", onBlurRefocusFn);
      });
    }
    setOverflowAnchor(contentEl, toIndex - from);
    const sizeBefore = alignEnd !== void 0 ? virtualScrollSizes.slice(from, toIndex).reduce(sumFn, 0) : 0;
    if (rangeChanged === true) {
      const tempTo = to >= virtualScrollSliceRange.value.from && from <= virtualScrollSliceRange.value.to ? virtualScrollSliceRange.value.to : to;
      virtualScrollSliceRange.value = { from, to: tempTo };
      virtualScrollPaddingBefore.value = sumSize(virtualScrollSizesAgg, virtualScrollSizes, 0, from);
      virtualScrollPaddingAfter.value = sumSize(virtualScrollSizesAgg, virtualScrollSizes, to, virtualScrollLength.value);
      requestAnimationFrame(() => {
        if (virtualScrollSliceRange.value.to !== to && prevScrollStart === scrollDetails.scrollStart) {
          virtualScrollSliceRange.value = { from: virtualScrollSliceRange.value.from, to };
          virtualScrollPaddingAfter.value = sumSize(virtualScrollSizesAgg, virtualScrollSizes, to, virtualScrollLength.value);
        }
      });
    }
    requestAnimationFrame(() => {
      if (prevScrollStart !== scrollDetails.scrollStart) return;
      if (rangeChanged === true) {
        updateVirtualScrollSizes(from);
      }
      const sizeAfter = virtualScrollSizes.slice(from, toIndex).reduce(sumFn, 0), posStart = sizeAfter + scrollDetails.offsetStart + virtualScrollPaddingBefore.value, posEnd = posStart + virtualScrollSizes[toIndex];
      let scrollPosition = posStart + offset;
      if (alignEnd !== void 0) {
        const sizeDiff = sizeAfter - sizeBefore;
        const scrollStart = scrollDetails.scrollStart + sizeDiff;
        scrollPosition = alignForce !== true && scrollStart < posStart && posEnd < scrollStart + scrollDetails.scrollViewSize ? scrollStart : alignEnd === "end" ? posEnd - scrollDetails.scrollViewSize : posStart - (alignEnd === "start" ? 0 : Math.round((scrollDetails.scrollViewSize - virtualScrollSizes[toIndex]) / 2));
      }
      prevScrollStart = scrollPosition;
      setScroll(
        scrollEl,
        scrollPosition,
        props.virtualScrollHorizontal,
        $q.lang.rtl
      );
      emitScroll(toIndex);
    });
  }
  function updateVirtualScrollSizes(from) {
    const contentEl = contentRef.value;
    if (contentEl) {
      const children = filterProto.call(
        contentEl.children,
        (el) => el.classList && el.classList.contains("q-virtual-scroll--skip") === false
      ), childrenLength = children.length, sizeFn = props.virtualScrollHorizontal === true ? (el) => el.getBoundingClientRect().width : (el) => el.offsetHeight;
      let index = from, size, diff;
      for (let i = 0; i < childrenLength; ) {
        size = sizeFn(children[i]);
        i++;
        while (i < childrenLength && children[i].classList.contains("q-virtual-scroll--with-prev") === true) {
          size += sizeFn(children[i]);
          i++;
        }
        diff = size - virtualScrollSizes[index];
        if (diff !== 0) {
          virtualScrollSizes[index] += diff;
          virtualScrollSizesAgg[Math.floor(index / aggBucketSize)] += diff;
        }
        index++;
      }
    }
  }
  function onBlurRefocusFn() {
    var _a;
    (_a = contentRef.value) == null ? void 0 : _a.focus();
  }
  function localResetVirtualScroll(toIndex, fullReset) {
    const defaultSize = 1 * virtualScrollItemSizeComputed.value;
    if (fullReset === true || Array.isArray(virtualScrollSizes) === false) {
      virtualScrollSizes = [];
    }
    const oldVirtualScrollSizesLength = virtualScrollSizes.length;
    virtualScrollSizes.length = virtualScrollLength.value;
    for (let i = virtualScrollLength.value - 1; i >= oldVirtualScrollSizesLength; i--) {
      virtualScrollSizes[i] = defaultSize;
    }
    const jMax = Math.floor((virtualScrollLength.value - 1) / aggBucketSize);
    virtualScrollSizesAgg = [];
    for (let j = 0; j <= jMax; j++) {
      let size = 0;
      const iMax = Math.min((j + 1) * aggBucketSize, virtualScrollLength.value);
      for (let i = j * aggBucketSize; i < iMax; i++) {
        size += virtualScrollSizes[i];
      }
      virtualScrollSizesAgg.push(size);
    }
    prevToIndex = -1;
    prevScrollStart = void 0;
    virtualScrollPaddingBefore.value = sumSize(virtualScrollSizesAgg, virtualScrollSizes, 0, virtualScrollSliceRange.value.from);
    virtualScrollPaddingAfter.value = sumSize(virtualScrollSizesAgg, virtualScrollSizes, virtualScrollSliceRange.value.to, virtualScrollLength.value);
    if (toIndex >= 0) {
      updateVirtualScrollSizes(virtualScrollSliceRange.value.from);
      nextTick(() => {
        scrollTo(toIndex);
      });
    } else {
      onVirtualScrollEvt();
    }
  }
  function setVirtualScrollSize(scrollViewSize) {
    if (scrollViewSize === void 0 && typeof window !== "undefined") {
      const scrollEl = getVirtualScrollTarget();
      if (scrollEl !== void 0 && scrollEl !== null && scrollEl.nodeType !== 8) {
        scrollViewSize = getScrollDetails(
          scrollEl,
          getVirtualScrollEl(),
          beforeRef.value,
          afterRef.value,
          props.virtualScrollHorizontal,
          $q.lang.rtl,
          props.virtualScrollStickySizeStart,
          props.virtualScrollStickySizeEnd
        ).scrollViewSize;
      }
    }
    localScrollViewSize = scrollViewSize;
    const virtualScrollSliceRatioBefore = parseFloat(props.virtualScrollSliceRatioBefore) || 0;
    const virtualScrollSliceRatioAfter = parseFloat(props.virtualScrollSliceRatioAfter) || 0;
    const multiplier = 1 + virtualScrollSliceRatioBefore + virtualScrollSliceRatioAfter;
    const view = scrollViewSize === void 0 || scrollViewSize <= 0 ? 1 : Math.ceil(scrollViewSize / virtualScrollItemSizeComputed.value);
    const baseSize = Math.max(
      1,
      view,
      Math.ceil((props.virtualScrollSliceSize > 0 ? props.virtualScrollSliceSize : 10) / multiplier)
    );
    virtualScrollSliceSizeComputed.value = {
      total: Math.ceil(baseSize * multiplier),
      start: Math.ceil(baseSize * virtualScrollSliceRatioBefore),
      center: Math.ceil(baseSize * (0.5 + virtualScrollSliceRatioBefore)),
      end: Math.ceil(baseSize * (1 + virtualScrollSliceRatioBefore)),
      view
    };
  }
  function padVirtualScroll(tag, content) {
    const paddingSize = props.virtualScrollHorizontal === true ? "width" : "height";
    const style = {
      ["--q-virtual-scroll-item-" + paddingSize]: virtualScrollItemSizeComputed.value + "px"
    };
    return [
      tag === "tbody" ? h(tag, {
        class: "q-virtual-scroll__padding",
        key: "before",
        ref: beforeRef
      }, [
        h("tr", [
          h("td", {
            style: { [paddingSize]: `${virtualScrollPaddingBefore.value}px`, ...style },
            colspan: colspanAttr.value
          })
        ])
      ]) : h(tag, {
        class: "q-virtual-scroll__padding",
        key: "before",
        ref: beforeRef,
        style: { [paddingSize]: `${virtualScrollPaddingBefore.value}px`, ...style }
      }),
      h(tag, {
        class: "q-virtual-scroll__content",
        key: "content",
        ref: contentRef,
        tabindex: -1
      }, content.flat()),
      tag === "tbody" ? h(tag, {
        class: "q-virtual-scroll__padding",
        key: "after",
        ref: afterRef
      }, [
        h("tr", [
          h("td", {
            style: { [paddingSize]: `${virtualScrollPaddingAfter.value}px`, ...style },
            colspan: colspanAttr.value
          })
        ])
      ]) : h(tag, {
        class: "q-virtual-scroll__padding",
        key: "after",
        ref: afterRef,
        style: { [paddingSize]: `${virtualScrollPaddingAfter.value}px`, ...style }
      })
    ];
  }
  function emitScroll(index) {
    if (prevToIndex !== index) {
      props.onVirtualScroll !== void 0 && emit("virtualScroll", {
        index,
        from: virtualScrollSliceRange.value.from,
        to: virtualScrollSliceRange.value.to - 1,
        direction: index < prevToIndex ? "decrease" : "increase",
        ref: proxy
      });
      prevToIndex = index;
    }
  }
  setVirtualScrollSize();
  const onVirtualScrollEvt = debounce(
    localOnVirtualScrollEvt,
    $q.platform.is.ios === true ? 120 : 35
  );
  onBeforeMount(() => {
    setVirtualScrollSize();
  });
  let shouldActivate = false;
  onDeactivated(() => {
    shouldActivate = true;
  });
  onActivated(() => {
    if (shouldActivate !== true) return;
    const scrollEl = getVirtualScrollTarget();
    if (prevScrollStart !== void 0 && scrollEl !== void 0 && scrollEl !== null && scrollEl.nodeType !== 8) {
      setScroll(
        scrollEl,
        prevScrollStart,
        props.virtualScrollHorizontal,
        $q.lang.rtl
      );
    } else {
      scrollTo(prevToIndex);
    }
  });
  onBeforeUnmount(() => {
    onVirtualScrollEvt.cancel();
  });
  Object.assign(proxy, { scrollTo, reset, refresh });
  return {
    virtualScrollSliceRange,
    virtualScrollSliceSizeComputed,
    setVirtualScrollSize,
    onVirtualScrollEvt,
    localResetVirtualScroll,
    padVirtualScroll,
    scrollTo,
    reset,
    refresh
  };
}
const validateNewValueMode = (v) => ["add", "add-unique", "toggle"].includes(v);
const reEscapeList = ".*+?^${}()|[]\\";
const fieldPropsList = Object.keys(useFieldProps);
function getPropValueFn(userPropName, defaultPropName) {
  if (typeof userPropName === "function") return userPropName;
  const propName = userPropName !== void 0 ? userPropName : defaultPropName;
  return (opt) => opt !== null && typeof opt === "object" && propName in opt ? opt[propName] : opt;
}
const QSelect = createComponent({
  name: "QSelect",
  inheritAttrs: false,
  props: {
    ...useVirtualScrollProps,
    ...useFormProps,
    ...useFieldProps,
    // override of useFieldProps > modelValue
    modelValue: {
      required: true
    },
    multiple: Boolean,
    displayValue: [String, Number],
    displayValueHtml: Boolean,
    dropdownIcon: String,
    options: {
      type: Array,
      default: () => []
    },
    optionValue: [Function, String],
    optionLabel: [Function, String],
    optionDisable: [Function, String],
    hideSelected: Boolean,
    hideDropdownIcon: Boolean,
    fillInput: Boolean,
    maxValues: [Number, String],
    optionsDense: Boolean,
    optionsDark: {
      type: Boolean,
      default: null
    },
    optionsSelectedClass: String,
    optionsHtml: Boolean,
    optionsCover: Boolean,
    menuShrink: Boolean,
    menuAnchor: String,
    menuSelf: String,
    menuOffset: Array,
    popupContentClass: String,
    popupContentStyle: [String, Array, Object],
    popupNoRouteDismiss: Boolean,
    useInput: Boolean,
    useChips: Boolean,
    newValueMode: {
      type: String,
      validator: validateNewValueMode
    },
    mapOptions: Boolean,
    emitValue: Boolean,
    disableTabSelection: Boolean,
    inputDebounce: {
      type: [Number, String],
      default: 500
    },
    inputClass: [Array, String, Object],
    inputStyle: [Array, String, Object],
    tabindex: {
      type: [String, Number],
      default: 0
    },
    autocomplete: String,
    transitionShow: {},
    transitionHide: {},
    transitionDuration: {},
    behavior: {
      type: String,
      validator: (v) => ["default", "menu", "dialog"].includes(v),
      default: "default"
    },
    // override of useVirtualScrollProps > virtualScrollItemSize (no default)
    virtualScrollItemSize: useVirtualScrollProps.virtualScrollItemSize.type,
    onNewValue: Function,
    onFilter: Function
  },
  emits: [
    ...useFieldEmits,
    "add",
    "remove",
    "inputValue",
    "keyup",
    "keypress",
    "keydown",
    "popupShow",
    "popupHide",
    "filterAbort"
  ],
  setup(props, { slots, emit }) {
    const { proxy } = getCurrentInstance();
    const { $q } = proxy;
    const menu = ref(false);
    const dialog = ref(false);
    const optionIndex = ref(-1);
    const inputValue = ref("");
    const dialogFieldFocused = ref(false);
    const innerLoadingIndicator = ref(false);
    let filterTimer = null, inputValueTimer = null, innerValueCache, hasDialog, userInputValue, filterId = null, defaultInputValue, transitionShowComputed, searchBuffer, searchBufferExp;
    const inputRef = ref(null);
    const targetRef = ref(null);
    const menuRef = ref(null);
    const dialogRef = ref(null);
    const menuContentRef = ref(null);
    const nameProp = useFormInputNameAttr(props);
    const onComposition = useKeyComposition(onInput);
    const virtualScrollLength = computed(() => Array.isArray(props.options) ? props.options.length : 0);
    const virtualScrollItemSizeComputed = computed(() => props.virtualScrollItemSize === void 0 ? props.optionsDense === true ? 24 : 48 : props.virtualScrollItemSize);
    const {
      virtualScrollSliceRange,
      virtualScrollSliceSizeComputed,
      localResetVirtualScroll,
      padVirtualScroll,
      onVirtualScrollEvt,
      scrollTo,
      setVirtualScrollSize
    } = useVirtualScroll({
      virtualScrollLength,
      getVirtualScrollTarget,
      getVirtualScrollEl,
      virtualScrollItemSizeComputed
    });
    const state = useFieldState();
    const innerValue = computed(() => {
      const mapNull = props.mapOptions === true && props.multiple !== true, val = props.modelValue !== void 0 && (props.modelValue !== null || mapNull === true) ? props.multiple === true && Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue] : [];
      if (props.mapOptions === true && Array.isArray(props.options) === true) {
        const cache = props.mapOptions === true && innerValueCache !== void 0 ? innerValueCache : [];
        const values = val.map((v) => getOption(v, cache));
        return props.modelValue === null && mapNull === true ? values.filter((v) => v !== null) : values;
      }
      return val;
    });
    const innerFieldProps = computed(() => {
      const acc = {};
      fieldPropsList.forEach((key) => {
        const val = props[key];
        if (val !== void 0) {
          acc[key] = val;
        }
      });
      return acc;
    });
    const isOptionsDark = computed(() => props.optionsDark === null ? state.isDark.value : props.optionsDark);
    const hasValue = computed(() => fieldValueIsFilled(innerValue.value));
    const computedInputClass = computed(() => {
      let cls = "q-field__input q-placeholder col";
      if (props.hideSelected === true || innerValue.value.length === 0) {
        return [cls, props.inputClass];
      }
      cls += " q-field__input--padding";
      return props.inputClass === void 0 ? cls : [cls, props.inputClass];
    });
    const menuContentClass = computed(
      () => (props.virtualScrollHorizontal === true ? "q-virtual-scroll--horizontal" : "") + (props.popupContentClass ? " " + props.popupContentClass : "")
    );
    const noOptions = computed(() => virtualScrollLength.value === 0);
    const selectedString = computed(
      () => innerValue.value.map((opt) => getOptionLabel.value(opt)).join(", ")
    );
    const ariaCurrentValue = computed(() => props.displayValue !== void 0 ? props.displayValue : selectedString.value);
    const needsHtmlFn = computed(() => props.optionsHtml === true ? () => true : (opt) => (opt == null ? void 0 : opt.html) === true);
    const valueAsHtml = computed(() => props.displayValueHtml === true || props.displayValue === void 0 && (props.optionsHtml === true || innerValue.value.some(needsHtmlFn.value)));
    const tabindex = computed(() => state.focused.value === true ? props.tabindex : -1);
    const comboboxAttrs = computed(() => {
      const attrs = {
        tabindex: props.tabindex,
        role: "combobox",
        "aria-label": props.label,
        "aria-readonly": props.readonly === true ? "true" : "false",
        "aria-autocomplete": props.useInput === true ? "list" : "none",
        "aria-expanded": menu.value === true ? "true" : "false",
        "aria-controls": `${state.targetUid.value}_lb`
      };
      if (optionIndex.value >= 0) {
        attrs["aria-activedescendant"] = `${state.targetUid.value}_${optionIndex.value}`;
      }
      return attrs;
    });
    const listboxAttrs = computed(() => ({
      id: `${state.targetUid.value}_lb`,
      role: "listbox",
      "aria-multiselectable": props.multiple === true ? "true" : "false"
    }));
    const selectedScope = computed(() => {
      return innerValue.value.map((opt, i) => ({
        index: i,
        opt,
        html: needsHtmlFn.value(opt),
        selected: true,
        removeAtIndex: removeAtIndexAndFocus,
        toggleOption,
        tabindex: tabindex.value
      }));
    });
    const optionScope = computed(() => {
      if (virtualScrollLength.value === 0) {
        return [];
      }
      const { from, to } = virtualScrollSliceRange.value;
      return props.options.slice(from, to).map((opt, i) => {
        const disable = isOptionDisabled.value(opt) === true;
        const active = isOptionSelected(opt) === true;
        const index = from + i;
        const itemProps = {
          clickable: true,
          active,
          activeClass: computedOptionsSelectedClass.value,
          manualFocus: true,
          focused: false,
          disable,
          tabindex: -1,
          dense: props.optionsDense,
          dark: isOptionsDark.value,
          role: "option",
          "aria-selected": active === true ? "true" : "false",
          id: `${state.targetUid.value}_${index}`,
          onClick: () => {
            toggleOption(opt);
          }
        };
        if (disable !== true) {
          optionIndex.value === index && (itemProps.focused = true);
          if ($q.platform.is.desktop === true) {
            itemProps.onMousemove = () => {
              menu.value === true && setOptionIndex(index);
            };
          }
        }
        return {
          index,
          opt,
          html: needsHtmlFn.value(opt),
          label: getOptionLabel.value(opt),
          selected: itemProps.active,
          focused: itemProps.focused,
          toggleOption,
          setOptionIndex,
          itemProps
        };
      });
    });
    const dropdownArrowIcon = computed(() => props.dropdownIcon !== void 0 ? props.dropdownIcon : $q.iconSet.arrow.dropdown);
    const squaredMenu = computed(
      () => props.optionsCover === false && props.outlined !== true && props.standout !== true && props.borderless !== true && props.rounded !== true
    );
    const computedOptionsSelectedClass = computed(() => props.optionsSelectedClass !== void 0 ? props.optionsSelectedClass : props.color !== void 0 ? `text-${props.color}` : "");
    const getOptionValue = computed(() => getPropValueFn(props.optionValue, "value"));
    const getOptionLabel = computed(() => getPropValueFn(props.optionLabel, "label"));
    const isOptionDisabled = computed(() => getPropValueFn(props.optionDisable, "disable"));
    const innerOptionsValue = computed(() => innerValue.value.map(getOptionValue.value));
    const inputControlEvents = computed(() => {
      const evt = {
        onInput,
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        onChange: onComposition,
        onKeydown: onTargetKeydown,
        onKeyup: onTargetAutocomplete,
        onKeypress: onTargetKeypress,
        onFocus: selectInputText,
        onClick(e) {
          hasDialog === true && stop(e);
        }
      };
      evt.onCompositionstart = evt.onCompositionupdate = evt.onCompositionend = onComposition;
      return evt;
    });
    watch(innerValue, (val) => {
      innerValueCache = val;
      if (props.useInput === true && props.fillInput === true && props.multiple !== true && state.innerLoading.value !== true && (dialog.value !== true && menu.value !== true || hasValue.value !== true)) {
        userInputValue !== true && resetInputValue();
        if (dialog.value === true || menu.value === true) {
          filter("");
        }
      }
    }, { immediate: true });
    watch(() => props.fillInput, resetInputValue);
    watch(menu, updateMenu);
    watch(virtualScrollLength, rerenderMenu);
    function getEmittingOptionValue(opt) {
      return props.emitValue === true ? getOptionValue.value(opt) : opt;
    }
    function removeAtIndex(index) {
      if (index !== -1 && index < innerValue.value.length) {
        if (props.multiple === true) {
          const model = props.modelValue.slice();
          emit("remove", { index, value: model.splice(index, 1)[0] });
          emit("update:modelValue", model);
        } else {
          emit("update:modelValue", null);
        }
      }
    }
    function removeAtIndexAndFocus(index) {
      removeAtIndex(index);
      state.focus();
    }
    function add(opt, unique) {
      const val = getEmittingOptionValue(opt);
      if (props.multiple !== true) {
        props.fillInput === true && updateInputValue(
          getOptionLabel.value(opt),
          true,
          true
        );
        emit("update:modelValue", val);
        return;
      }
      if (innerValue.value.length === 0) {
        emit("add", { index: 0, value: val });
        emit("update:modelValue", props.multiple === true ? [val] : val);
        return;
      }
      if (unique === true && isOptionSelected(opt) === true) return;
      if (props.maxValues !== void 0 && props.modelValue.length >= props.maxValues) return;
      const model = props.modelValue.slice();
      emit("add", { index: model.length, value: val });
      model.push(val);
      emit("update:modelValue", model);
    }
    function toggleOption(opt, keepOpen) {
      var _a;
      if (state.editable.value !== true || opt === void 0 || isOptionDisabled.value(opt) === true) return;
      const optValue = getOptionValue.value(opt);
      if (props.multiple !== true) {
        if (keepOpen !== true) {
          updateInputValue(
            props.fillInput === true ? getOptionLabel.value(opt) : "",
            true,
            true
          );
          hidePopup();
        }
        (_a = targetRef.value) == null ? void 0 : _a.focus();
        if (innerValue.value.length === 0 || isDeepEqual(getOptionValue.value(innerValue.value[0]), optValue) !== true) {
          emit("update:modelValue", props.emitValue === true ? optValue : opt);
        }
        return;
      }
      if (hasDialog !== true || dialogFieldFocused.value === true) {
        state.focus();
      }
      selectInputText();
      if (innerValue.value.length === 0) {
        const val = props.emitValue === true ? optValue : opt;
        emit("add", { index: 0, value: val });
        emit("update:modelValue", props.multiple === true ? [val] : val);
        return;
      }
      const model = props.modelValue.slice(), index = innerOptionsValue.value.findIndex((v) => isDeepEqual(v, optValue));
      if (index !== -1) {
        emit("remove", { index, value: model.splice(index, 1)[0] });
      } else {
        if (props.maxValues !== void 0 && model.length >= props.maxValues) return;
        const val = props.emitValue === true ? optValue : opt;
        emit("add", { index: model.length, value: val });
        model.push(val);
      }
      emit("update:modelValue", model);
    }
    function setOptionIndex(index) {
      if ($q.platform.is.desktop !== true) return;
      const val = index !== -1 && index < virtualScrollLength.value ? index : -1;
      if (optionIndex.value !== val) {
        optionIndex.value = val;
      }
    }
    function moveOptionSelection(offset = 1, skipInputValue) {
      if (menu.value === true) {
        let index = optionIndex.value;
        do {
          index = normalizeToInterval(
            index + offset,
            -1,
            virtualScrollLength.value - 1
          );
        } while (index !== -1 && index !== optionIndex.value && isOptionDisabled.value(props.options[index]) === true);
        if (optionIndex.value !== index) {
          setOptionIndex(index);
          scrollTo(index);
          if (skipInputValue !== true && props.useInput === true && props.fillInput === true) {
            setInputValue(
              index >= 0 ? getOptionLabel.value(props.options[index]) : defaultInputValue,
              true
            );
          }
        }
      }
    }
    function getOption(value, valueCache) {
      const fn = (opt) => isDeepEqual(getOptionValue.value(opt), value);
      return props.options.find(fn) || valueCache.find(fn) || value;
    }
    function isOptionSelected(opt) {
      const val = getOptionValue.value(opt);
      return innerOptionsValue.value.find((v) => isDeepEqual(v, val)) !== void 0;
    }
    function selectInputText(e) {
      if (props.useInput === true && targetRef.value !== null && (e === void 0 || targetRef.value === e.target && e.target.value === selectedString.value)) {
        targetRef.value.select();
      }
    }
    function onTargetKeyup(e) {
      if (isKeyCode(e, 27) === true && menu.value === true) {
        stop(e);
        hidePopup();
        resetInputValue();
      }
      emit("keyup", e);
    }
    function onTargetAutocomplete(e) {
      const { value } = e.target;
      if (e.keyCode !== void 0) {
        onTargetKeyup(e);
        return;
      }
      e.target.value = "";
      if (filterTimer !== null) {
        clearTimeout(filterTimer);
        filterTimer = null;
      }
      if (inputValueTimer !== null) {
        clearTimeout(inputValueTimer);
        inputValueTimer = null;
      }
      resetInputValue();
      if (typeof value === "string" && value.length !== 0) {
        const needle = value.toLocaleLowerCase();
        const findFn = (extractFn) => {
          const option = props.options.find((opt) => String(extractFn.value(opt)).toLocaleLowerCase() === needle);
          if (option === void 0) return false;
          if (innerValue.value.indexOf(option) === -1) {
            toggleOption(option);
          } else {
            hidePopup();
          }
          return true;
        };
        const fillFn = (afterFilter) => {
          if (findFn(getOptionValue) !== true && afterFilter !== true && findFn(getOptionLabel) !== true) {
            filter(value, true, () => fillFn(true));
          }
        };
        fillFn();
      } else {
        state.clearValue(e);
      }
    }
    function onTargetKeypress(e) {
      emit("keypress", e);
    }
    function onTargetKeydown(e) {
      emit("keydown", e);
      if (shouldIgnoreKey(e) === true) return;
      const newValueModeValid = inputValue.value.length !== 0 && (props.newValueMode !== void 0 || props.onNewValue !== void 0);
      const tabShouldSelect = e.shiftKey !== true && props.disableTabSelection !== true && props.multiple !== true && (optionIndex.value !== -1 || newValueModeValid === true);
      if (e.keyCode === 27) {
        prevent(e);
        return;
      }
      if (e.keyCode === 9 && tabShouldSelect === false) {
        closeMenu();
        return;
      }
      if (e.target === void 0 || e.target.id !== state.targetUid.value || state.editable.value !== true) return;
      if (e.keyCode === 40 && state.innerLoading.value !== true && menu.value === false) {
        stopAndPrevent(e);
        showPopup();
        return;
      }
      if (e.keyCode === 8 && (props.useChips === true || props.clearable === true) && props.hideSelected !== true && inputValue.value.length === 0) {
        if (props.multiple === true && Array.isArray(props.modelValue) === true) {
          removeAtIndex(props.modelValue.length - 1);
        } else if (props.multiple !== true && props.modelValue !== null) {
          emit("update:modelValue", null);
        }
        return;
      }
      if ((e.keyCode === 35 || e.keyCode === 36) && (typeof inputValue.value !== "string" || inputValue.value.length === 0)) {
        stopAndPrevent(e);
        optionIndex.value = -1;
        moveOptionSelection(e.keyCode === 36 ? 1 : -1, props.multiple);
      }
      if ((e.keyCode === 33 || e.keyCode === 34) && virtualScrollSliceSizeComputed.value !== void 0) {
        stopAndPrevent(e);
        optionIndex.value = Math.max(
          -1,
          Math.min(
            virtualScrollLength.value,
            optionIndex.value + (e.keyCode === 33 ? -1 : 1) * virtualScrollSliceSizeComputed.value.view
          )
        );
        moveOptionSelection(e.keyCode === 33 ? 1 : -1, props.multiple);
      }
      if (e.keyCode === 38 || e.keyCode === 40) {
        stopAndPrevent(e);
        moveOptionSelection(e.keyCode === 38 ? -1 : 1, props.multiple);
      }
      const optionsLength = virtualScrollLength.value;
      if (searchBuffer === void 0 || searchBufferExp < Date.now()) {
        searchBuffer = "";
      }
      if (optionsLength > 0 && props.useInput !== true && e.key !== void 0 && e.key.length === 1 && e.altKey === false && e.ctrlKey === false && e.metaKey === false && (e.keyCode !== 32 || searchBuffer.length !== 0)) {
        menu.value !== true && showPopup(e);
        const char = e.key.toLocaleLowerCase(), keyRepeat = searchBuffer.length === 1 && searchBuffer[0] === char;
        searchBufferExp = Date.now() + 1500;
        if (keyRepeat === false) {
          stopAndPrevent(e);
          searchBuffer += char;
        }
        const searchRe = new RegExp("^" + searchBuffer.split("").map((l) => reEscapeList.indexOf(l) !== -1 ? "\\" + l : l).join(".*"), "i");
        let index = optionIndex.value;
        if (keyRepeat === true || index < 0 || searchRe.test(getOptionLabel.value(props.options[index])) !== true) {
          do {
            index = normalizeToInterval(index + 1, -1, optionsLength - 1);
          } while (index !== optionIndex.value && (isOptionDisabled.value(props.options[index]) === true || searchRe.test(getOptionLabel.value(props.options[index])) !== true));
        }
        if (optionIndex.value !== index) {
          nextTick(() => {
            setOptionIndex(index);
            scrollTo(index);
            if (index >= 0 && props.useInput === true && props.fillInput === true) {
              setInputValue(getOptionLabel.value(props.options[index]), true);
            }
          });
        }
        return;
      }
      if (e.keyCode !== 13 && (e.keyCode !== 32 || props.useInput === true || searchBuffer !== "") && (e.keyCode !== 9 || tabShouldSelect === false)) return;
      e.keyCode !== 9 && stopAndPrevent(e);
      if (optionIndex.value !== -1 && optionIndex.value < optionsLength) {
        toggleOption(props.options[optionIndex.value]);
        return;
      }
      if (newValueModeValid === true) {
        const done = (val, mode) => {
          var _a;
          if (mode) {
            if (validateNewValueMode(mode) !== true) return;
          } else {
            mode = props.newValueMode;
          }
          updateInputValue("", props.multiple !== true, true);
          if (val === void 0 || val === null) return;
          const fn = mode === "toggle" ? toggleOption : add;
          fn(val, mode === "add-unique");
          if (props.multiple !== true) {
            (_a = targetRef.value) == null ? void 0 : _a.focus();
            hidePopup();
          }
        };
        if (props.onNewValue !== void 0) {
          emit("newValue", inputValue.value, done);
        } else {
          done(inputValue.value);
        }
        if (props.multiple !== true) return;
      }
      if (menu.value === true) {
        closeMenu();
      } else if (state.innerLoading.value !== true) {
        showPopup();
      }
    }
    function getVirtualScrollEl() {
      return hasDialog === true ? menuContentRef.value : menuRef.value !== null && menuRef.value.contentEl !== null ? menuRef.value.contentEl : void 0;
    }
    function getVirtualScrollTarget() {
      return getVirtualScrollEl();
    }
    function getSelection() {
      if (props.hideSelected === true) {
        return [];
      }
      if (slots["selected-item"] !== void 0) {
        return selectedScope.value.map((scope) => slots["selected-item"](scope)).slice();
      }
      if (slots.selected !== void 0) {
        return [].concat(slots.selected());
      }
      if (props.useChips === true) {
        return selectedScope.value.map((scope, i) => h(QChip, {
          key: "option-" + i,
          removable: state.editable.value === true && isOptionDisabled.value(scope.opt) !== true,
          dense: true,
          textColor: props.color,
          tabindex: tabindex.value,
          onRemove() {
            scope.removeAtIndex(i);
          }
        }, () => h("span", {
          class: "ellipsis",
          [scope.html === true ? "innerHTML" : "textContent"]: getOptionLabel.value(scope.opt)
        })));
      }
      return [
        h("span", {
          class: "ellipsis",
          [valueAsHtml.value === true ? "innerHTML" : "textContent"]: ariaCurrentValue.value
        })
      ];
    }
    function getAllOptions() {
      if (noOptions.value === true) {
        return slots["no-option"] !== void 0 ? slots["no-option"]({ inputValue: inputValue.value }) : void 0;
      }
      const fn = slots.option !== void 0 ? slots.option : (scope) => {
        return h(QItem, {
          key: scope.index,
          ...scope.itemProps
        }, () => {
          return h(
            QItemSection,
            () => h(
              QItemLabel,
              () => h("span", {
                [scope.html === true ? "innerHTML" : "textContent"]: scope.label
              })
            )
          );
        });
      };
      let options = padVirtualScroll("div", optionScope.value.map(fn));
      if (slots["before-options"] !== void 0) {
        options = slots["before-options"]().concat(options);
      }
      return hMergeSlot(slots["after-options"], options);
    }
    function getInput(fromDialog, isTarget) {
      const attrs = isTarget === true ? { ...comboboxAttrs.value, ...state.splitAttrs.attributes.value } : void 0;
      const data = {
        ref: isTarget === true ? targetRef : void 0,
        key: "i_t",
        class: computedInputClass.value,
        style: props.inputStyle,
        value: inputValue.value !== void 0 ? inputValue.value : "",
        // required for Android in order to show ENTER key when in form
        type: "search",
        ...attrs,
        id: isTarget === true ? state.targetUid.value : void 0,
        maxlength: props.maxlength,
        autocomplete: props.autocomplete,
        "data-autofocus": fromDialog === true || props.autofocus === true || void 0,
        disabled: props.disable === true,
        readonly: props.readonly === true,
        ...inputControlEvents.value
      };
      if (fromDialog !== true && hasDialog === true) {
        if (Array.isArray(data.class) === true) {
          data.class = [...data.class, "no-pointer-events"];
        } else {
          data.class += " no-pointer-events";
        }
      }
      return h("input", data);
    }
    function onInput(e) {
      if (filterTimer !== null) {
        clearTimeout(filterTimer);
        filterTimer = null;
      }
      if (inputValueTimer !== null) {
        clearTimeout(inputValueTimer);
        inputValueTimer = null;
      }
      if (e && e.target && e.target.qComposing === true) return;
      setInputValue(e.target.value || "");
      userInputValue = true;
      defaultInputValue = inputValue.value;
      if (state.focused.value !== true && (hasDialog !== true || dialogFieldFocused.value === true)) {
        state.focus();
      }
      if (props.onFilter !== void 0) {
        filterTimer = setTimeout(() => {
          filterTimer = null;
          filter(inputValue.value);
        }, props.inputDebounce);
      }
    }
    function setInputValue(val, emitImmediately) {
      if (inputValue.value !== val) {
        inputValue.value = val;
        if (emitImmediately === true || props.inputDebounce === 0 || props.inputDebounce === "0") {
          emit("inputValue", val);
        } else {
          inputValueTimer = setTimeout(() => {
            inputValueTimer = null;
            emit("inputValue", val);
          }, props.inputDebounce);
        }
      }
    }
    function updateInputValue(val, noFiltering, internal) {
      userInputValue = internal !== true;
      if (props.useInput === true) {
        setInputValue(val, true);
        if (noFiltering === true || internal !== true) {
          defaultInputValue = val;
        }
        noFiltering !== true && filter(val);
      }
    }
    function filter(val, keepClosed, afterUpdateFn) {
      if (props.onFilter === void 0 || keepClosed !== true && state.focused.value !== true) return;
      if (state.innerLoading.value === true) {
        emit("filterAbort");
      } else {
        state.innerLoading.value = true;
        innerLoadingIndicator.value = true;
      }
      if (val !== "" && props.multiple !== true && innerValue.value.length !== 0 && userInputValue !== true && val === getOptionLabel.value(innerValue.value[0])) {
        val = "";
      }
      const localFilterId = setTimeout(() => {
        menu.value === true && (menu.value = false);
      }, 10);
      filterId !== null && clearTimeout(filterId);
      filterId = localFilterId;
      emit(
        "filter",
        val,
        (fn, afterFn) => {
          if ((keepClosed === true || state.focused.value === true) && filterId === localFilterId) {
            clearTimeout(filterId);
            typeof fn === "function" && fn();
            innerLoadingIndicator.value = false;
            nextTick(() => {
              state.innerLoading.value = false;
              if (state.editable.value === true) {
                if (keepClosed === true) {
                  menu.value === true && hidePopup();
                } else if (menu.value === true) {
                  updateMenu(true);
                } else {
                  menu.value = true;
                }
              }
              typeof afterFn === "function" && nextTick(() => {
                afterFn(proxy);
              });
              typeof afterUpdateFn === "function" && nextTick(() => {
                afterUpdateFn(proxy);
              });
            });
          }
        },
        () => {
          if (state.focused.value === true && filterId === localFilterId) {
            clearTimeout(filterId);
            state.innerLoading.value = false;
            innerLoadingIndicator.value = false;
          }
          menu.value === true && (menu.value = false);
        }
      );
    }
    function getMenu() {
      return h(QMenu, {
        ref: menuRef,
        class: menuContentClass.value,
        style: props.popupContentStyle,
        modelValue: menu.value,
        fit: props.menuShrink !== true,
        cover: props.optionsCover === true && noOptions.value !== true && props.useInput !== true,
        anchor: props.menuAnchor,
        self: props.menuSelf,
        offset: props.menuOffset,
        dark: isOptionsDark.value,
        noParentEvent: true,
        noRefocus: true,
        noFocus: true,
        noRouteDismiss: props.popupNoRouteDismiss,
        square: squaredMenu.value,
        transitionShow: props.transitionShow,
        transitionHide: props.transitionHide,
        transitionDuration: props.transitionDuration,
        separateClosePopup: true,
        ...listboxAttrs.value,
        onScrollPassive: onVirtualScrollEvt,
        onBeforeShow: onControlPopupShow,
        onBeforeHide: onMenuBeforeHide,
        onShow: onMenuShow
      }, getAllOptions);
    }
    function onMenuBeforeHide(e) {
      onControlPopupHide(e);
      closeMenu();
    }
    function onMenuShow() {
      setVirtualScrollSize();
    }
    function onDialogFieldFocus(e) {
      var _a;
      stop(e);
      (_a = targetRef.value) == null ? void 0 : _a.focus();
      dialogFieldFocused.value = true;
      window.scrollTo(window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, 0);
    }
    function onDialogFieldBlur(e) {
      stop(e);
      nextTick(() => {
        dialogFieldFocused.value = false;
      });
    }
    function getDialog() {
      const content = [
        h(QField, {
          class: `col-auto ${state.fieldClass.value}`,
          ...innerFieldProps.value,
          for: state.targetUid.value,
          dark: isOptionsDark.value,
          square: true,
          loading: innerLoadingIndicator.value,
          itemAligned: false,
          filled: true,
          stackLabel: inputValue.value.length !== 0,
          ...state.splitAttrs.listeners.value,
          onFocus: onDialogFieldFocus,
          onBlur: onDialogFieldBlur
        }, {
          ...slots,
          rawControl: () => state.getControl(true),
          before: void 0,
          after: void 0
        })
      ];
      menu.value === true && content.push(
        h("div", {
          ref: menuContentRef,
          class: menuContentClass.value + " scroll",
          style: props.popupContentStyle,
          ...listboxAttrs.value,
          onClick: prevent,
          onScrollPassive: onVirtualScrollEvt
        }, getAllOptions())
      );
      return h(QDialog, {
        ref: dialogRef,
        modelValue: dialog.value,
        position: props.useInput === true ? "top" : void 0,
        transitionShow: transitionShowComputed,
        transitionHide: props.transitionHide,
        transitionDuration: props.transitionDuration,
        noRouteDismiss: props.popupNoRouteDismiss,
        onBeforeShow: onControlPopupShow,
        onBeforeHide: onDialogBeforeHide,
        onHide: onDialogHide,
        onShow: onDialogShow
      }, () => h("div", {
        class: "q-select__dialog" + (isOptionsDark.value === true ? " q-select__dialog--dark q-dark" : "") + (dialogFieldFocused.value === true ? " q-select__dialog--focused" : "")
      }, content));
    }
    function onDialogBeforeHide(e) {
      onControlPopupHide(e);
      if (dialogRef.value !== null) {
        dialogRef.value.__updateRefocusTarget(
          state.rootRef.value.querySelector(".q-field__native > [tabindex]:last-child")
        );
      }
      state.focused.value = false;
    }
    function onDialogHide(e) {
      hidePopup();
      state.focused.value === false && emit("blur", e);
      resetInputValue();
    }
    function onDialogShow() {
      const el = document.activeElement;
      if ((el === null || el.id !== state.targetUid.value) && targetRef.value !== null && targetRef.value !== el) {
        targetRef.value.focus();
      }
      setVirtualScrollSize();
    }
    function closeMenu() {
      if (dialog.value === true) return;
      optionIndex.value = -1;
      if (menu.value === true) {
        menu.value = false;
      }
      if (state.focused.value === false) {
        if (filterId !== null) {
          clearTimeout(filterId);
          filterId = null;
        }
        if (state.innerLoading.value === true) {
          emit("filterAbort");
          state.innerLoading.value = false;
          innerLoadingIndicator.value = false;
        }
      }
    }
    function showPopup(e) {
      if (state.editable.value !== true) return;
      if (hasDialog === true) {
        state.onControlFocusin(e);
        dialog.value = true;
        nextTick(() => {
          state.focus();
        });
      } else {
        state.focus();
      }
      if (props.onFilter !== void 0) {
        filter(inputValue.value);
      } else if (noOptions.value !== true || slots["no-option"] !== void 0) {
        menu.value = true;
      }
    }
    function hidePopup() {
      dialog.value = false;
      closeMenu();
    }
    function resetInputValue() {
      props.useInput === true && updateInputValue(
        props.multiple !== true && props.fillInput === true && innerValue.value.length !== 0 ? getOptionLabel.value(innerValue.value[0]) || "" : "",
        true,
        true
      );
    }
    function updateMenu(show) {
      let optionIndex2 = -1;
      if (show === true) {
        if (innerValue.value.length !== 0) {
          const val = getOptionValue.value(innerValue.value[0]);
          optionIndex2 = props.options.findIndex((v) => isDeepEqual(getOptionValue.value(v), val));
        }
        localResetVirtualScroll(optionIndex2);
      }
      setOptionIndex(optionIndex2);
    }
    function rerenderMenu(newLength, oldLength) {
      if (menu.value === true && state.innerLoading.value === false) {
        localResetVirtualScroll(-1, true);
        nextTick(() => {
          if (menu.value === true && state.innerLoading.value === false) {
            if (newLength > oldLength) {
              localResetVirtualScroll();
            } else {
              updateMenu(true);
            }
          }
        });
      }
    }
    function updateMenuPosition() {
      if (dialog.value === false && menuRef.value !== null) {
        menuRef.value.updatePosition();
      }
    }
    function onControlPopupShow(e) {
      e !== void 0 && stop(e);
      emit("popupShow", e);
      state.hasPopupOpen = true;
      state.onControlFocusin(e);
    }
    function onControlPopupHide(e) {
      e !== void 0 && stop(e);
      emit("popupHide", e);
      state.hasPopupOpen = false;
      state.onControlFocusout(e);
    }
    function updatePreState() {
      hasDialog = $q.platform.is.mobile !== true && props.behavior !== "dialog" ? false : props.behavior !== "menu" && (props.useInput === true ? slots["no-option"] !== void 0 || props.onFilter !== void 0 || noOptions.value === false : true);
      transitionShowComputed = $q.platform.is.ios === true && hasDialog === true && props.useInput === true ? "fade" : props.transitionShow;
    }
    onBeforeUpdate(updatePreState);
    onUpdated(updateMenuPosition);
    updatePreState();
    onBeforeUnmount(() => {
      filterTimer !== null && clearTimeout(filterTimer);
      inputValueTimer !== null && clearTimeout(inputValueTimer);
    });
    Object.assign(proxy, {
      showPopup,
      hidePopup,
      removeAtIndex,
      add,
      toggleOption,
      getOptionIndex: () => optionIndex.value,
      setOptionIndex,
      moveOptionSelection,
      filter,
      updateMenuPosition,
      updateInputValue,
      isOptionSelected,
      getEmittingOptionValue,
      isOptionDisabled: (...args) => isOptionDisabled.value.apply(null, args) === true,
      getOptionValue: (...args) => getOptionValue.value.apply(null, args),
      getOptionLabel: (...args) => getOptionLabel.value.apply(null, args)
    });
    Object.assign(state, {
      innerValue,
      fieldClass: computed(
        () => `q-select q-field--auto-height q-select--with${props.useInput !== true ? "out" : ""}-input q-select--with${props.useChips !== true ? "out" : ""}-chips q-select--${props.multiple === true ? "multiple" : "single"}`
      ),
      inputRef,
      targetRef,
      hasValue,
      showPopup,
      floatingLabel: computed(
        () => props.hideSelected !== true && hasValue.value === true || typeof inputValue.value === "number" || inputValue.value.length !== 0 || fieldValueIsFilled(props.displayValue)
      ),
      getControlChild: () => {
        if (state.editable.value !== false && (dialog.value === true || noOptions.value !== true || slots["no-option"] !== void 0)) {
          return hasDialog === true ? getDialog() : getMenu();
        } else if (state.hasPopupOpen === true) {
          state.hasPopupOpen = false;
        }
      },
      controlEvents: {
        onFocusin(e) {
          state.onControlFocusin(e);
        },
        onFocusout(e) {
          state.onControlFocusout(e, () => {
            resetInputValue();
            closeMenu();
          });
        },
        onClick(e) {
          var _a;
          prevent(e);
          if (hasDialog !== true && menu.value === true) {
            closeMenu();
            (_a = targetRef.value) == null ? void 0 : _a.focus();
            return;
          }
          showPopup(e);
        }
      },
      getControl: (fromDialog) => {
        const child = getSelection();
        const isTarget = fromDialog === true || dialog.value !== true || hasDialog !== true;
        if (props.useInput === true) {
          child.push(getInput(fromDialog, isTarget));
        } else if (state.editable.value === true) {
          const attrs2 = isTarget === true ? comboboxAttrs.value : void 0;
          child.push(
            h("input", {
              ref: isTarget === true ? targetRef : void 0,
              key: "d_t",
              class: "q-select__focus-target",
              id: isTarget === true ? state.targetUid.value : void 0,
              value: ariaCurrentValue.value,
              readonly: true,
              "data-autofocus": fromDialog === true || props.autofocus === true || void 0,
              ...attrs2,
              onKeydown: onTargetKeydown,
              onKeyup: onTargetKeyup,
              onKeypress: onTargetKeypress
            })
          );
          if (isTarget === true && typeof props.autocomplete === "string" && props.autocomplete.length !== 0) {
            child.push(
              h("input", {
                class: "q-select__autocomplete-input",
                autocomplete: props.autocomplete,
                tabindex: -1,
                onKeyup: onTargetAutocomplete
              })
            );
          }
        }
        if (nameProp.value !== void 0 && props.disable !== true && innerOptionsValue.value.length !== 0) {
          const opts = innerOptionsValue.value.map((value) => h("option", { value, selected: true }));
          child.push(
            h("select", {
              class: "hidden",
              name: nameProp.value,
              multiple: props.multiple
            }, opts)
          );
        }
        const attrs = props.useInput === true || isTarget !== true ? void 0 : state.splitAttrs.attributes.value;
        return h("div", {
          class: "q-field__native row items-center",
          ...attrs,
          ...state.splitAttrs.listeners.value
        }, child);
      },
      getInnerAppend: () => props.loading !== true && innerLoadingIndicator.value !== true && props.hideDropdownIcon !== true ? [
        h(QIcon, {
          class: "q-select__dropdown-icon" + (menu.value === true ? " rotate-180" : ""),
          name: dropdownArrowIcon.value
        })
      ] : null
    });
    return useField(state);
  }
});
export {
  QSelect as Q
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUVNlbGVjdC0tbHd0UTlMSC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9maWVsZC9RRmllbGQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9wcml2YXRlLnJ0bC9ydGwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3ZpcnR1YWwtc2Nyb2xsL3VzZS12aXJ0dWFsLXNjcm9sbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvc2VsZWN0L1FTZWxlY3QuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHVzZUZpZWxkLCB7IHVzZUZpZWxkU3RhdGUsIHVzZUZpZWxkUHJvcHMsIHVzZUZpZWxkRW1pdHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1maWVsZC91c2UtZmllbGQuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FGaWVsZCcsXG5cbiAgaW5oZXJpdEF0dHJzOiBmYWxzZSxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZUZpZWxkUHJvcHMsXG5cbiAgICB0YWc6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdsYWJlbCdcbiAgICB9XG4gIH0sXG5cbiAgZW1pdHM6IHVzZUZpZWxkRW1pdHMsXG5cbiAgc2V0dXAgKCkge1xuICAgIHJldHVybiB1c2VGaWVsZChcbiAgICAgIHVzZUZpZWxkU3RhdGUoeyB0YWdQcm9wOiB0cnVlIH0pXG4gICAgKVxuICB9XG59KVxuIiwibGV0IHJ0bEhhc1Njcm9sbEJ1ZyA9IGZhbHNlXG5cbi8vIG1vYmlsZSBDaHJvbWUgdGFrZXMgdGhlIGNyb3duIGZvciB0aGlzXG5pZiAoIV9fUVVBU0FSX1NTUl9fKSB7XG4gIGNvbnN0IHNjcm9sbGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgc2Nyb2xsZXIuc2V0QXR0cmlidXRlKCdkaXInLCAncnRsJylcbiAgT2JqZWN0LmFzc2lnbihzY3JvbGxlci5zdHlsZSwge1xuICAgIHdpZHRoOiAnMXB4JyxcbiAgICBoZWlnaHQ6ICcxcHgnLFxuICAgIG92ZXJmbG93OiAnYXV0bydcbiAgfSlcblxuICBjb25zdCBzcGFjZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICBPYmplY3QuYXNzaWduKHNwYWNlci5zdHlsZSwge1xuICAgIHdpZHRoOiAnMTAwMHB4JyxcbiAgICBoZWlnaHQ6ICcxcHgnXG4gIH0pXG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JvbGxlcilcbiAgc2Nyb2xsZXIuYXBwZW5kQ2hpbGQoc3BhY2VyKVxuICBzY3JvbGxlci5zY3JvbGxMZWZ0ID0gLTEwMDBcblxuICBydGxIYXNTY3JvbGxCdWcgPSBzY3JvbGxlci5zY3JvbGxMZWZ0ID49IDBcblxuICBzY3JvbGxlci5yZW1vdmUoKVxufVxuXG5leHBvcnQge1xuICBydGxIYXNTY3JvbGxCdWdcbn1cbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIHdhdGNoLCBvbkFjdGl2YXRlZCwgb25EZWFjdGl2YXRlZCwgb25CZWZvcmVNb3VudCwgb25CZWZvcmVVbm1vdW50LCBuZXh0VGljaywgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgZGVib3VuY2UgZnJvbSAnLi4vLi4vdXRpbHMvZGVib3VuY2UvZGVib3VuY2UuanMnXG5pbXBvcnQgeyBub29wIH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQvZXZlbnQuanMnXG5pbXBvcnQgeyBydGxIYXNTY3JvbGxCdWcgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJ0bC9ydGwuanMnXG5cbmNvbnN0IGFnZ0J1Y2tldFNpemUgPSAxMDAwXG5cbmNvbnN0IHNjcm9sbFRvRWRnZXMgPSBbXG4gICdzdGFydCcsXG4gICdjZW50ZXInLFxuICAnZW5kJyxcbiAgJ3N0YXJ0LWZvcmNlJyxcbiAgJ2NlbnRlci1mb3JjZScsXG4gICdlbmQtZm9yY2UnXG5dXG5cbmNvbnN0IGZpbHRlclByb3RvID0gQXJyYXkucHJvdG90eXBlLmZpbHRlclxuXG5jb25zdCBzZXRPdmVyZmxvd0FuY2hvciA9IF9fUVVBU0FSX1NTUl9fIHx8IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpLm92ZXJmbG93QW5jaG9yID09PSB2b2lkIDBcbiAgPyBub29wXG4gIDogZnVuY3Rpb24gKGNvbnRlbnRFbCwgaW5kZXgpIHtcbiAgICBpZiAoY29udGVudEVsID09PSBudWxsKSByZXR1cm5cblxuICAgIGlmIChjb250ZW50RWwuX3FPdmVyZmxvd0FuaW1hdGlvbkZyYW1lICE9PSB2b2lkIDApIHtcbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGNvbnRlbnRFbC5fcU92ZXJmbG93QW5pbWF0aW9uRnJhbWUpXG4gICAgfVxuXG4gICAgY29udGVudEVsLl9xT3ZlcmZsb3dBbmltYXRpb25GcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICBpZiAoY29udGVudEVsID09PSBudWxsKSByZXR1cm5cblxuICAgICAgY29udGVudEVsLl9xT3ZlcmZsb3dBbmltYXRpb25GcmFtZSA9IHZvaWQgMFxuICAgICAgY29uc3QgY2hpbGRyZW4gPSBjb250ZW50RWwuY2hpbGRyZW4gfHwgW11cblxuICAgICAgZmlsdGVyUHJvdG9cbiAgICAgICAgLmNhbGwoY2hpbGRyZW4sIGVsID0+IGVsLmRhdGFzZXQgJiYgZWwuZGF0YXNldC5xVnNBbmNob3IgIT09IHZvaWQgMClcbiAgICAgICAgLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgIGRlbGV0ZSBlbC5kYXRhc2V0LnFWc0FuY2hvclxuICAgICAgICB9KVxuXG4gICAgICBjb25zdCBlbCA9IGNoaWxkcmVuWyBpbmRleCBdXG5cbiAgICAgIGlmIChlbD8uZGF0YXNldCkge1xuICAgICAgICBlbC5kYXRhc2V0LnFWc0FuY2hvciA9ICcnXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG5mdW5jdGlvbiBzdW1GbiAoYWNjLCBoKSB7XG4gIHJldHVybiBhY2MgKyBoXG59XG5cbmZ1bmN0aW9uIGdldFNjcm9sbERldGFpbHMgKFxuICBwYXJlbnQsXG4gIGNoaWxkLFxuICBiZWZvcmVSZWYsXG4gIGFmdGVyUmVmLFxuICBob3Jpem9udGFsLFxuICBydGwsXG4gIHN0aWNreVN0YXJ0LFxuICBzdGlja3lFbmRcbikge1xuICBjb25zdFxuICAgIHBhcmVudENhbGMgPSBwYXJlbnQgPT09IHdpbmRvdyA/IGRvY3VtZW50LnNjcm9sbGluZ0VsZW1lbnQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IDogcGFyZW50LFxuICAgIHByb3BFbFNpemUgPSBob3Jpem9udGFsID09PSB0cnVlID8gJ29mZnNldFdpZHRoJyA6ICdvZmZzZXRIZWlnaHQnLFxuICAgIGRldGFpbHMgPSB7XG4gICAgICBzY3JvbGxTdGFydDogMCxcbiAgICAgIHNjcm9sbFZpZXdTaXplOiAtc3RpY2t5U3RhcnQgLSBzdGlja3lFbmQsXG4gICAgICBzY3JvbGxNYXhTaXplOiAwLFxuICAgICAgb2Zmc2V0U3RhcnQ6IC1zdGlja3lTdGFydCxcbiAgICAgIG9mZnNldEVuZDogLXN0aWNreUVuZFxuICAgIH1cblxuICBpZiAoaG9yaXpvbnRhbCA9PT0gdHJ1ZSkge1xuICAgIGlmIChwYXJlbnQgPT09IHdpbmRvdykge1xuICAgICAgZGV0YWlscy5zY3JvbGxTdGFydCA9IHdpbmRvdy5wYWdlWE9mZnNldCB8fCB3aW5kb3cuc2Nyb2xsWCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQgfHwgMFxuICAgICAgZGV0YWlscy5zY3JvbGxWaWV3U2l6ZSArPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGhcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBkZXRhaWxzLnNjcm9sbFN0YXJ0ID0gcGFyZW50Q2FsYy5zY3JvbGxMZWZ0XG4gICAgICBkZXRhaWxzLnNjcm9sbFZpZXdTaXplICs9IHBhcmVudENhbGMuY2xpZW50V2lkdGhcbiAgICB9XG4gICAgZGV0YWlscy5zY3JvbGxNYXhTaXplID0gcGFyZW50Q2FsYy5zY3JvbGxXaWR0aFxuXG4gICAgaWYgKHJ0bCA9PT0gdHJ1ZSkge1xuICAgICAgZGV0YWlscy5zY3JvbGxTdGFydCA9IChydGxIYXNTY3JvbGxCdWcgPT09IHRydWUgPyBkZXRhaWxzLnNjcm9sbE1heFNpemUgLSBkZXRhaWxzLnNjcm9sbFZpZXdTaXplIDogMCkgLSBkZXRhaWxzLnNjcm9sbFN0YXJ0XG4gICAgfVxuICB9XG4gIGVsc2Uge1xuICAgIGlmIChwYXJlbnQgPT09IHdpbmRvdykge1xuICAgICAgZGV0YWlscy5zY3JvbGxTdGFydCA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCB3aW5kb3cuc2Nyb2xsWSB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCB8fCAwXG4gICAgICBkZXRhaWxzLnNjcm9sbFZpZXdTaXplICs9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHRcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBkZXRhaWxzLnNjcm9sbFN0YXJ0ID0gcGFyZW50Q2FsYy5zY3JvbGxUb3BcbiAgICAgIGRldGFpbHMuc2Nyb2xsVmlld1NpemUgKz0gcGFyZW50Q2FsYy5jbGllbnRIZWlnaHRcbiAgICB9XG4gICAgZGV0YWlscy5zY3JvbGxNYXhTaXplID0gcGFyZW50Q2FsYy5zY3JvbGxIZWlnaHRcbiAgfVxuXG4gIGlmIChiZWZvcmVSZWYgIT09IG51bGwpIHtcbiAgICBmb3IgKGxldCBlbCA9IGJlZm9yZVJlZi5wcmV2aW91c0VsZW1lbnRTaWJsaW5nOyBlbCAhPT0gbnVsbDsgZWwgPSBlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKSB7XG4gICAgICBpZiAoZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdxLXZpcnR1YWwtc2Nyb2xsLS1za2lwJykgPT09IGZhbHNlKSB7XG4gICAgICAgIGRldGFpbHMub2Zmc2V0U3RhcnQgKz0gZWxbIHByb3BFbFNpemUgXVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChhZnRlclJlZiAhPT0gbnVsbCkge1xuICAgIGZvciAobGV0IGVsID0gYWZ0ZXJSZWYubmV4dEVsZW1lbnRTaWJsaW5nOyBlbCAhPT0gbnVsbDsgZWwgPSBlbC5uZXh0RWxlbWVudFNpYmxpbmcpIHtcbiAgICAgIGlmIChlbC5jbGFzc0xpc3QuY29udGFpbnMoJ3EtdmlydHVhbC1zY3JvbGwtLXNraXAnKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgZGV0YWlscy5vZmZzZXRFbmQgKz0gZWxbIHByb3BFbFNpemUgXVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChjaGlsZCAhPT0gcGFyZW50KSB7XG4gICAgY29uc3RcbiAgICAgIHBhcmVudFJlY3QgPSBwYXJlbnRDYWxjLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgY2hpbGRSZWN0ID0gY2hpbGQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuICAgIGlmIChob3Jpem9udGFsID09PSB0cnVlKSB7XG4gICAgICBkZXRhaWxzLm9mZnNldFN0YXJ0ICs9IGNoaWxkUmVjdC5sZWZ0IC0gcGFyZW50UmVjdC5sZWZ0XG4gICAgICBkZXRhaWxzLm9mZnNldEVuZCAtPSBjaGlsZFJlY3Qud2lkdGhcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBkZXRhaWxzLm9mZnNldFN0YXJ0ICs9IGNoaWxkUmVjdC50b3AgLSBwYXJlbnRSZWN0LnRvcFxuICAgICAgZGV0YWlscy5vZmZzZXRFbmQgLT0gY2hpbGRSZWN0LmhlaWdodFxuICAgIH1cblxuICAgIGlmIChwYXJlbnQgIT09IHdpbmRvdykge1xuICAgICAgZGV0YWlscy5vZmZzZXRTdGFydCArPSBkZXRhaWxzLnNjcm9sbFN0YXJ0XG4gICAgfVxuICAgIGRldGFpbHMub2Zmc2V0RW5kICs9IGRldGFpbHMuc2Nyb2xsTWF4U2l6ZSAtIGRldGFpbHMub2Zmc2V0U3RhcnRcbiAgfVxuXG4gIHJldHVybiBkZXRhaWxzXG59XG5cbmZ1bmN0aW9uIHNldFNjcm9sbCAocGFyZW50LCBzY3JvbGwsIGhvcml6b250YWwsIHJ0bCkge1xuICBpZiAoc2Nyb2xsID09PSAnZW5kJykge1xuICAgIHNjcm9sbCA9IChwYXJlbnQgPT09IHdpbmRvdyA/IGRvY3VtZW50LmJvZHkgOiBwYXJlbnQpW1xuICAgICAgaG9yaXpvbnRhbCA9PT0gdHJ1ZSA/ICdzY3JvbGxXaWR0aCcgOiAnc2Nyb2xsSGVpZ2h0J1xuICAgIF1cbiAgfVxuXG4gIGlmIChwYXJlbnQgPT09IHdpbmRvdykge1xuICAgIGlmIChob3Jpem9udGFsID09PSB0cnVlKSB7XG4gICAgICBpZiAocnRsID09PSB0cnVlKSB7XG4gICAgICAgIHNjcm9sbCA9IChydGxIYXNTY3JvbGxCdWcgPT09IHRydWUgPyBkb2N1bWVudC5ib2R5LnNjcm9sbFdpZHRoIC0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIDogMCkgLSBzY3JvbGxcbiAgICAgIH1cbiAgICAgIHdpbmRvdy5zY3JvbGxUbyhzY3JvbGwsIHdpbmRvdy5wYWdlWU9mZnNldCB8fCB3aW5kb3cuc2Nyb2xsWSB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCB8fCAwKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHdpbmRvdy5zY3JvbGxUbyh3aW5kb3cucGFnZVhPZmZzZXQgfHwgd2luZG93LnNjcm9sbFggfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0IHx8IDAsIHNjcm9sbClcbiAgICB9XG4gIH1cbiAgZWxzZSBpZiAoaG9yaXpvbnRhbCA9PT0gdHJ1ZSkge1xuICAgIGlmIChydGwgPT09IHRydWUpIHtcbiAgICAgIHNjcm9sbCA9IChydGxIYXNTY3JvbGxCdWcgPT09IHRydWUgPyBwYXJlbnQuc2Nyb2xsV2lkdGggLSBwYXJlbnQub2Zmc2V0V2lkdGggOiAwKSAtIHNjcm9sbFxuICAgIH1cbiAgICBwYXJlbnQuc2Nyb2xsTGVmdCA9IHNjcm9sbFxuICB9XG4gIGVsc2Uge1xuICAgIHBhcmVudC5zY3JvbGxUb3AgPSBzY3JvbGxcbiAgfVxufVxuXG5mdW5jdGlvbiBzdW1TaXplIChzaXplQWdnLCBzaXplLCBmcm9tLCB0bykge1xuICBpZiAoZnJvbSA+PSB0bykgeyByZXR1cm4gMCB9XG5cbiAgY29uc3RcbiAgICBsYXN0VG8gPSBzaXplLmxlbmd0aCxcbiAgICBmcm9tQWdnID0gTWF0aC5mbG9vcihmcm9tIC8gYWdnQnVja2V0U2l6ZSksXG4gICAgdG9BZ2cgPSBNYXRoLmZsb29yKCh0byAtIDEpIC8gYWdnQnVja2V0U2l6ZSkgKyAxXG5cbiAgbGV0IHRvdGFsID0gc2l6ZUFnZy5zbGljZShmcm9tQWdnLCB0b0FnZykucmVkdWNlKHN1bUZuLCAwKVxuXG4gIGlmIChmcm9tICUgYWdnQnVja2V0U2l6ZSAhPT0gMCkge1xuICAgIHRvdGFsIC09IHNpemUuc2xpY2UoZnJvbUFnZyAqIGFnZ0J1Y2tldFNpemUsIGZyb20pLnJlZHVjZShzdW1GbiwgMClcbiAgfVxuICBpZiAodG8gJSBhZ2dCdWNrZXRTaXplICE9PSAwICYmIHRvICE9PSBsYXN0VG8pIHtcbiAgICB0b3RhbCAtPSBzaXplLnNsaWNlKHRvLCB0b0FnZyAqIGFnZ0J1Y2tldFNpemUpLnJlZHVjZShzdW1GbiwgMClcbiAgfVxuXG4gIHJldHVybiB0b3RhbFxufVxuXG5jb25zdCBjb21tb25WaXJ0U2Nyb2xsUHJvcHMgPSB7XG4gIHZpcnR1YWxTY3JvbGxTbGljZVNpemU6IHtcbiAgICB0eXBlOiBbIE51bWJlciwgU3RyaW5nIF0sXG4gICAgZGVmYXVsdDogMTBcbiAgfSxcblxuICB2aXJ0dWFsU2Nyb2xsU2xpY2VSYXRpb0JlZm9yZToge1xuICAgIHR5cGU6IFsgTnVtYmVyLCBTdHJpbmcgXSxcbiAgICBkZWZhdWx0OiAxXG4gIH0sXG5cbiAgdmlydHVhbFNjcm9sbFNsaWNlUmF0aW9BZnRlcjoge1xuICAgIHR5cGU6IFsgTnVtYmVyLCBTdHJpbmcgXSxcbiAgICBkZWZhdWx0OiAxXG4gIH0sXG5cbiAgdmlydHVhbFNjcm9sbEl0ZW1TaXplOiB7XG4gICAgdHlwZTogWyBOdW1iZXIsIFN0cmluZyBdLFxuICAgIGRlZmF1bHQ6IDI0XG4gIH0sXG5cbiAgdmlydHVhbFNjcm9sbFN0aWNreVNpemVTdGFydDoge1xuICAgIHR5cGU6IFsgTnVtYmVyLCBTdHJpbmcgXSxcbiAgICBkZWZhdWx0OiAwXG4gIH0sXG5cbiAgdmlydHVhbFNjcm9sbFN0aWNreVNpemVFbmQ6IHtcbiAgICB0eXBlOiBbIE51bWJlciwgU3RyaW5nIF0sXG4gICAgZGVmYXVsdDogMFxuICB9LFxuXG4gIHRhYmxlQ29sc3BhbjogWyBOdW1iZXIsIFN0cmluZyBdXG59XG5cbmV4cG9ydCBjb25zdCBjb21tb25WaXJ0U2Nyb2xsUHJvcHNMaXN0ID0gT2JqZWN0LmtleXMoY29tbW9uVmlydFNjcm9sbFByb3BzKVxuXG5leHBvcnQgY29uc3QgdXNlVmlydHVhbFNjcm9sbFByb3BzID0ge1xuICB2aXJ0dWFsU2Nyb2xsSG9yaXpvbnRhbDogQm9vbGVhbixcbiAgb25WaXJ0dWFsU2Nyb2xsOiBGdW5jdGlvbixcbiAgLi4uY29tbW9uVmlydFNjcm9sbFByb3BzXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VWaXJ0dWFsU2Nyb2xsICh7XG4gIHZpcnR1YWxTY3JvbGxMZW5ndGgsIGdldFZpcnR1YWxTY3JvbGxUYXJnZXQsIGdldFZpcnR1YWxTY3JvbGxFbCxcbiAgdmlydHVhbFNjcm9sbEl0ZW1TaXplQ29tcHV0ZWQgLy8gb3B0aW9uYWxcbn0pIHtcbiAgY29uc3Qgdm0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gIGNvbnN0IHsgcHJvcHMsIGVtaXQsIHByb3h5IH0gPSB2bVxuICBjb25zdCB7ICRxIH0gPSBwcm94eVxuXG4gIGxldCBwcmV2U2Nyb2xsU3RhcnQsIHByZXZUb0luZGV4LCBsb2NhbFNjcm9sbFZpZXdTaXplLCB2aXJ0dWFsU2Nyb2xsU2l6ZXNBZ2cgPSBbXSwgdmlydHVhbFNjcm9sbFNpemVzXG5cbiAgY29uc3QgdmlydHVhbFNjcm9sbFBhZGRpbmdCZWZvcmUgPSByZWYoMClcbiAgY29uc3QgdmlydHVhbFNjcm9sbFBhZGRpbmdBZnRlciA9IHJlZigwKVxuICBjb25zdCB2aXJ0dWFsU2Nyb2xsU2xpY2VTaXplQ29tcHV0ZWQgPSByZWYoe30pXG5cbiAgY29uc3QgYmVmb3JlUmVmID0gcmVmKG51bGwpXG4gIGNvbnN0IGFmdGVyUmVmID0gcmVmKG51bGwpXG4gIGNvbnN0IGNvbnRlbnRSZWYgPSByZWYobnVsbClcblxuICBjb25zdCB2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZSA9IHJlZih7IGZyb206IDAsIHRvOiAwIH0pXG5cbiAgY29uc3QgY29sc3BhbkF0dHIgPSBjb21wdXRlZCgoKSA9PiAocHJvcHMudGFibGVDb2xzcGFuICE9PSB2b2lkIDAgPyBwcm9wcy50YWJsZUNvbHNwYW4gOiAxMDApKVxuXG4gIGlmICh2aXJ0dWFsU2Nyb2xsSXRlbVNpemVDb21wdXRlZCA9PT0gdm9pZCAwKSB7XG4gICAgdmlydHVhbFNjcm9sbEl0ZW1TaXplQ29tcHV0ZWQgPSBjb21wdXRlZCgoKSA9PiBwcm9wcy52aXJ0dWFsU2Nyb2xsSXRlbVNpemUpXG4gIH1cblxuICBjb25zdCBuZWVkc1Jlc2V0ID0gY29tcHV0ZWQoKCkgPT4gdmlydHVhbFNjcm9sbEl0ZW1TaXplQ29tcHV0ZWQudmFsdWUgKyAnOycgKyBwcm9wcy52aXJ0dWFsU2Nyb2xsSG9yaXpvbnRhbClcblxuICBjb25zdCBuZWVkc1NsaWNlUmVjYWxjID0gY29tcHV0ZWQoKCkgPT5cbiAgICBuZWVkc1Jlc2V0LnZhbHVlICsgJzsnICsgcHJvcHMudmlydHVhbFNjcm9sbFNsaWNlUmF0aW9CZWZvcmUgKyAnOycgKyBwcm9wcy52aXJ0dWFsU2Nyb2xsU2xpY2VSYXRpb0FmdGVyXG4gIClcblxuICB3YXRjaChuZWVkc1NsaWNlUmVjYWxjLCAoKSA9PiB7IHNldFZpcnR1YWxTY3JvbGxTaXplKCkgfSlcbiAgd2F0Y2gobmVlZHNSZXNldCwgcmVzZXQpXG5cbiAgZnVuY3Rpb24gcmVzZXQgKCkge1xuICAgIGxvY2FsUmVzZXRWaXJ0dWFsU2Nyb2xsKHByZXZUb0luZGV4LCB0cnVlKVxuICB9XG5cbiAgZnVuY3Rpb24gcmVmcmVzaCAodG9JbmRleCkge1xuICAgIGxvY2FsUmVzZXRWaXJ0dWFsU2Nyb2xsKHRvSW5kZXggPT09IHZvaWQgMCA/IHByZXZUb0luZGV4IDogdG9JbmRleClcbiAgfVxuXG4gIGZ1bmN0aW9uIHNjcm9sbFRvICh0b0luZGV4LCBlZGdlKSB7XG4gICAgY29uc3Qgc2Nyb2xsRWwgPSBnZXRWaXJ0dWFsU2Nyb2xsVGFyZ2V0KClcblxuICAgIGlmIChcbiAgICAgIHNjcm9sbEVsID09PSB2b2lkIDBcbiAgICAgIHx8IHNjcm9sbEVsID09PSBudWxsXG4gICAgICB8fCBzY3JvbGxFbC5ub2RlVHlwZSA9PT0gOFxuICAgICkgcmV0dXJuXG5cbiAgICBjb25zdCBzY3JvbGxEZXRhaWxzID0gZ2V0U2Nyb2xsRGV0YWlscyhcbiAgICAgIHNjcm9sbEVsLFxuICAgICAgZ2V0VmlydHVhbFNjcm9sbEVsKCksXG4gICAgICBiZWZvcmVSZWYudmFsdWUsXG4gICAgICBhZnRlclJlZi52YWx1ZSxcbiAgICAgIHByb3BzLnZpcnR1YWxTY3JvbGxIb3Jpem9udGFsLFxuICAgICAgJHEubGFuZy5ydGwsXG4gICAgICBwcm9wcy52aXJ0dWFsU2Nyb2xsU3RpY2t5U2l6ZVN0YXJ0LFxuICAgICAgcHJvcHMudmlydHVhbFNjcm9sbFN0aWNreVNpemVFbmRcbiAgICApXG5cbiAgICBsb2NhbFNjcm9sbFZpZXdTaXplICE9PSBzY3JvbGxEZXRhaWxzLnNjcm9sbFZpZXdTaXplICYmIHNldFZpcnR1YWxTY3JvbGxTaXplKHNjcm9sbERldGFpbHMuc2Nyb2xsVmlld1NpemUpXG5cbiAgICBzZXRWaXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZShcbiAgICAgIHNjcm9sbEVsLFxuICAgICAgc2Nyb2xsRGV0YWlscyxcbiAgICAgIE1hdGgubWluKHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWUgLSAxLCBNYXRoLm1heCgwLCBwYXJzZUludCh0b0luZGV4LCAxMCkgfHwgMCkpLFxuICAgICAgMCxcbiAgICAgIHNjcm9sbFRvRWRnZXMuaW5kZXhPZihlZGdlKSAhPT0gLTEgPyBlZGdlIDogKHByZXZUb0luZGV4ICE9PSAtMSAmJiB0b0luZGV4ID4gcHJldlRvSW5kZXggPyAnZW5kJyA6ICdzdGFydCcpXG4gICAgKVxuICB9XG5cbiAgZnVuY3Rpb24gbG9jYWxPblZpcnR1YWxTY3JvbGxFdnQgKCkge1xuICAgIGNvbnN0IHNjcm9sbEVsID0gZ2V0VmlydHVhbFNjcm9sbFRhcmdldCgpXG5cbiAgICBpZiAoXG4gICAgICBzY3JvbGxFbCA9PT0gdm9pZCAwXG4gICAgICB8fCBzY3JvbGxFbCA9PT0gbnVsbFxuICAgICAgfHwgc2Nyb2xsRWwubm9kZVR5cGUgPT09IDhcbiAgICApIHJldHVyblxuXG4gICAgY29uc3RcbiAgICAgIHNjcm9sbERldGFpbHMgPSBnZXRTY3JvbGxEZXRhaWxzKFxuICAgICAgICBzY3JvbGxFbCxcbiAgICAgICAgZ2V0VmlydHVhbFNjcm9sbEVsKCksXG4gICAgICAgIGJlZm9yZVJlZi52YWx1ZSxcbiAgICAgICAgYWZ0ZXJSZWYudmFsdWUsXG4gICAgICAgIHByb3BzLnZpcnR1YWxTY3JvbGxIb3Jpem9udGFsLFxuICAgICAgICAkcS5sYW5nLnJ0bCxcbiAgICAgICAgcHJvcHMudmlydHVhbFNjcm9sbFN0aWNreVNpemVTdGFydCxcbiAgICAgICAgcHJvcHMudmlydHVhbFNjcm9sbFN0aWNreVNpemVFbmRcbiAgICAgICksXG4gICAgICBsaXN0TGFzdEluZGV4ID0gdmlydHVhbFNjcm9sbExlbmd0aC52YWx1ZSAtIDEsXG4gICAgICBsaXN0RW5kT2Zmc2V0ID0gc2Nyb2xsRGV0YWlscy5zY3JvbGxNYXhTaXplIC0gc2Nyb2xsRGV0YWlscy5vZmZzZXRTdGFydCAtIHNjcm9sbERldGFpbHMub2Zmc2V0RW5kIC0gdmlydHVhbFNjcm9sbFBhZGRpbmdBZnRlci52YWx1ZVxuXG4gICAgaWYgKHByZXZTY3JvbGxTdGFydCA9PT0gc2Nyb2xsRGV0YWlscy5zY3JvbGxTdGFydCkgcmV0dXJuXG5cbiAgICBpZiAoc2Nyb2xsRGV0YWlscy5zY3JvbGxNYXhTaXplIDw9IDApIHtcbiAgICAgIHNldFZpcnR1YWxTY3JvbGxTbGljZVJhbmdlKHNjcm9sbEVsLCBzY3JvbGxEZXRhaWxzLCAwLCAwKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgbG9jYWxTY3JvbGxWaWV3U2l6ZSAhPT0gc2Nyb2xsRGV0YWlscy5zY3JvbGxWaWV3U2l6ZSAmJiBzZXRWaXJ0dWFsU2Nyb2xsU2l6ZShzY3JvbGxEZXRhaWxzLnNjcm9sbFZpZXdTaXplKVxuXG4gICAgdXBkYXRlVmlydHVhbFNjcm9sbFNpemVzKHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlLmZyb20pXG5cbiAgICBjb25zdCBzY3JvbGxNYXhTdGFydCA9IE1hdGguZmxvb3Ioc2Nyb2xsRGV0YWlscy5zY3JvbGxNYXhTaXplXG4gICAgICAtIE1hdGgubWF4KHNjcm9sbERldGFpbHMuc2Nyb2xsVmlld1NpemUsIHNjcm9sbERldGFpbHMub2Zmc2V0RW5kKVxuICAgICAgLSBNYXRoLm1pbih2aXJ0dWFsU2Nyb2xsU2l6ZXNbIGxpc3RMYXN0SW5kZXggXSwgc2Nyb2xsRGV0YWlscy5zY3JvbGxWaWV3U2l6ZSAvIDIpKVxuXG4gICAgaWYgKHNjcm9sbE1heFN0YXJ0ID4gMCAmJiBNYXRoLmNlaWwoc2Nyb2xsRGV0YWlscy5zY3JvbGxTdGFydCkgPj0gc2Nyb2xsTWF4U3RhcnQpIHtcbiAgICAgIHNldFZpcnR1YWxTY3JvbGxTbGljZVJhbmdlKFxuICAgICAgICBzY3JvbGxFbCxcbiAgICAgICAgc2Nyb2xsRGV0YWlscyxcbiAgICAgICAgbGlzdExhc3RJbmRleCxcbiAgICAgICAgc2Nyb2xsRGV0YWlscy5zY3JvbGxNYXhTaXplIC0gc2Nyb2xsRGV0YWlscy5vZmZzZXRFbmQgLSB2aXJ0dWFsU2Nyb2xsU2l6ZXNBZ2cucmVkdWNlKHN1bUZuLCAwKVxuICAgICAgKVxuXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBsZXRcbiAgICAgIHRvSW5kZXggPSAwLFxuICAgICAgbGlzdE9mZnNldCA9IHNjcm9sbERldGFpbHMuc2Nyb2xsU3RhcnQgLSBzY3JvbGxEZXRhaWxzLm9mZnNldFN0YXJ0LFxuICAgICAgb2Zmc2V0ID0gbGlzdE9mZnNldFxuXG4gICAgaWYgKGxpc3RPZmZzZXQgPD0gbGlzdEVuZE9mZnNldCAmJiBsaXN0T2Zmc2V0ICsgc2Nyb2xsRGV0YWlscy5zY3JvbGxWaWV3U2l6ZSA+PSB2aXJ0dWFsU2Nyb2xsUGFkZGluZ0JlZm9yZS52YWx1ZSkge1xuICAgICAgbGlzdE9mZnNldCAtPSB2aXJ0dWFsU2Nyb2xsUGFkZGluZ0JlZm9yZS52YWx1ZVxuICAgICAgdG9JbmRleCA9IHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlLmZyb21cbiAgICAgIG9mZnNldCA9IGxpc3RPZmZzZXRcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgbGlzdE9mZnNldCA+PSB2aXJ0dWFsU2Nyb2xsU2l6ZXNBZ2dbIGogXSAmJiB0b0luZGV4IDwgbGlzdExhc3RJbmRleDsgaisrKSB7XG4gICAgICAgIGxpc3RPZmZzZXQgLT0gdmlydHVhbFNjcm9sbFNpemVzQWdnWyBqIF1cbiAgICAgICAgdG9JbmRleCArPSBhZ2dCdWNrZXRTaXplXG4gICAgICB9XG4gICAgfVxuXG4gICAgd2hpbGUgKGxpc3RPZmZzZXQgPiAwICYmIHRvSW5kZXggPCBsaXN0TGFzdEluZGV4KSB7XG4gICAgICBsaXN0T2Zmc2V0IC09IHZpcnR1YWxTY3JvbGxTaXplc1sgdG9JbmRleCBdXG4gICAgICBpZiAobGlzdE9mZnNldCA+IC1zY3JvbGxEZXRhaWxzLnNjcm9sbFZpZXdTaXplKSB7XG4gICAgICAgIHRvSW5kZXgrK1xuICAgICAgICBvZmZzZXQgPSBsaXN0T2Zmc2V0XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgb2Zmc2V0ID0gdmlydHVhbFNjcm9sbFNpemVzWyB0b0luZGV4IF0gKyBsaXN0T2Zmc2V0XG4gICAgICB9XG4gICAgfVxuXG4gICAgc2V0VmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UoXG4gICAgICBzY3JvbGxFbCxcbiAgICAgIHNjcm9sbERldGFpbHMsXG4gICAgICB0b0luZGV4LFxuICAgICAgb2Zmc2V0XG4gICAgKVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0VmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UgKHNjcm9sbEVsLCBzY3JvbGxEZXRhaWxzLCB0b0luZGV4LCBvZmZzZXQsIGFsaWduKSB7XG4gICAgY29uc3QgYWxpZ25Gb3JjZSA9IHR5cGVvZiBhbGlnbiA9PT0gJ3N0cmluZycgJiYgYWxpZ24uaW5kZXhPZignLWZvcmNlJykgIT09IC0xXG4gICAgY29uc3QgYWxpZ25FbmQgPSBhbGlnbkZvcmNlID09PSB0cnVlID8gYWxpZ24ucmVwbGFjZSgnLWZvcmNlJywgJycpIDogYWxpZ25cbiAgICBjb25zdCBhbGlnblJhbmdlID0gYWxpZ25FbmQgIT09IHZvaWQgMCA/IGFsaWduRW5kIDogJ3N0YXJ0J1xuXG4gICAgbGV0XG4gICAgICBmcm9tID0gTWF0aC5tYXgoMCwgdG9JbmRleCAtIHZpcnR1YWxTY3JvbGxTbGljZVNpemVDb21wdXRlZC52YWx1ZVsgYWxpZ25SYW5nZSBdKSxcbiAgICAgIHRvID0gZnJvbSArIHZpcnR1YWxTY3JvbGxTbGljZVNpemVDb21wdXRlZC52YWx1ZS50b3RhbFxuXG4gICAgaWYgKHRvID4gdmlydHVhbFNjcm9sbExlbmd0aC52YWx1ZSkge1xuICAgICAgdG8gPSB2aXJ0dWFsU2Nyb2xsTGVuZ3RoLnZhbHVlXG4gICAgICBmcm9tID0gTWF0aC5tYXgoMCwgdG8gLSB2aXJ0dWFsU2Nyb2xsU2xpY2VTaXplQ29tcHV0ZWQudmFsdWUudG90YWwpXG4gICAgfVxuXG4gICAgcHJldlNjcm9sbFN0YXJ0ID0gc2Nyb2xsRGV0YWlscy5zY3JvbGxTdGFydFxuXG4gICAgY29uc3QgcmFuZ2VDaGFuZ2VkID0gZnJvbSAhPT0gdmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UudmFsdWUuZnJvbSB8fCB0byAhPT0gdmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UudmFsdWUudG9cblxuICAgIGlmIChyYW5nZUNoYW5nZWQgPT09IGZhbHNlICYmIGFsaWduRW5kID09PSB2b2lkIDApIHtcbiAgICAgIGVtaXRTY3JvbGwodG9JbmRleClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IHsgYWN0aXZlRWxlbWVudCB9ID0gZG9jdW1lbnRcbiAgICBjb25zdCBjb250ZW50RWwgPSBjb250ZW50UmVmLnZhbHVlXG4gICAgaWYgKFxuICAgICAgcmFuZ2VDaGFuZ2VkID09PSB0cnVlXG4gICAgICAmJiBjb250ZW50RWwgIT09IG51bGxcbiAgICAgICYmIGNvbnRlbnRFbCAhPT0gYWN0aXZlRWxlbWVudFxuICAgICAgJiYgY29udGVudEVsLmNvbnRhaW5zKGFjdGl2ZUVsZW1lbnQpID09PSB0cnVlXG4gICAgKSB7XG4gICAgICBjb250ZW50RWwuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCBvbkJsdXJSZWZvY3VzRm4pXG5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjb250ZW50RWw/LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0Jywgb25CbHVyUmVmb2N1c0ZuKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBzZXRPdmVyZmxvd0FuY2hvcihjb250ZW50RWwsIHRvSW5kZXggLSBmcm9tKVxuXG4gICAgY29uc3Qgc2l6ZUJlZm9yZSA9IGFsaWduRW5kICE9PSB2b2lkIDAgPyB2aXJ0dWFsU2Nyb2xsU2l6ZXMuc2xpY2UoZnJvbSwgdG9JbmRleCkucmVkdWNlKHN1bUZuLCAwKSA6IDBcblxuICAgIGlmIChyYW5nZUNoYW5nZWQgPT09IHRydWUpIHtcbiAgICAgIC8vIHZ1ZSBrZXkgbWF0Y2hpbmcgYWxnb3JpdGhtIHdvcmtzIG9ubHkgaWZcbiAgICAgIC8vIHRoZSBhcnJheSBvZiBWTm9kZXMgY2hhbmdlcyBvbiBvbmx5IG9uZSBvZiB0aGUgZW5kc1xuICAgICAgLy8gc28gd2UgZmlyc3QgY2hhbmdlIG9uZSBlbmQgYW5kIHRoZW4gdGhlIG90aGVyXG5cbiAgICAgIGNvbnN0IHRlbXBUbyA9IHRvID49IHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlLmZyb20gJiYgZnJvbSA8PSB2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZS50b1xuICAgICAgICA/IHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlLnRvXG4gICAgICAgIDogdG9cblxuICAgICAgdmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UudmFsdWUgPSB7IGZyb20sIHRvOiB0ZW1wVG8gfVxuICAgICAgdmlydHVhbFNjcm9sbFBhZGRpbmdCZWZvcmUudmFsdWUgPSBzdW1TaXplKHZpcnR1YWxTY3JvbGxTaXplc0FnZywgdmlydHVhbFNjcm9sbFNpemVzLCAwLCBmcm9tKVxuICAgICAgdmlydHVhbFNjcm9sbFBhZGRpbmdBZnRlci52YWx1ZSA9IHN1bVNpemUodmlydHVhbFNjcm9sbFNpemVzQWdnLCB2aXJ0dWFsU2Nyb2xsU2l6ZXMsIHRvLCB2aXJ0dWFsU2Nyb2xsTGVuZ3RoLnZhbHVlKVxuXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICBpZiAodmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UudmFsdWUudG8gIT09IHRvICYmIHByZXZTY3JvbGxTdGFydCA9PT0gc2Nyb2xsRGV0YWlscy5zY3JvbGxTdGFydCkge1xuICAgICAgICAgIHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlID0geyBmcm9tOiB2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZS5mcm9tLCB0byB9XG4gICAgICAgICAgdmlydHVhbFNjcm9sbFBhZGRpbmdBZnRlci52YWx1ZSA9IHN1bVNpemUodmlydHVhbFNjcm9sbFNpemVzQWdnLCB2aXJ0dWFsU2Nyb2xsU2l6ZXMsIHRvLCB2aXJ0dWFsU2Nyb2xsTGVuZ3RoLnZhbHVlKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAvLyBpZiB0aGUgc2Nyb2xsIHdhcyBjaGFuZ2VkIGdpdmUgdXBcbiAgICAgIC8vIChhbm90aGVyIGNhbGwgdG8gc2V0VmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UgYmVmb3JlIGFuaW1hdGlvbiBmcmFtZSlcbiAgICAgIGlmIChwcmV2U2Nyb2xsU3RhcnQgIT09IHNjcm9sbERldGFpbHMuc2Nyb2xsU3RhcnQpIHJldHVyblxuXG4gICAgICBpZiAocmFuZ2VDaGFuZ2VkID09PSB0cnVlKSB7XG4gICAgICAgIHVwZGF0ZVZpcnR1YWxTY3JvbGxTaXplcyhmcm9tKVxuICAgICAgfVxuXG4gICAgICBjb25zdFxuICAgICAgICBzaXplQWZ0ZXIgPSB2aXJ0dWFsU2Nyb2xsU2l6ZXMuc2xpY2UoZnJvbSwgdG9JbmRleCkucmVkdWNlKHN1bUZuLCAwKSxcbiAgICAgICAgcG9zU3RhcnQgPSBzaXplQWZ0ZXIgKyBzY3JvbGxEZXRhaWxzLm9mZnNldFN0YXJ0ICsgdmlydHVhbFNjcm9sbFBhZGRpbmdCZWZvcmUudmFsdWUsXG4gICAgICAgIHBvc0VuZCA9IHBvc1N0YXJ0ICsgdmlydHVhbFNjcm9sbFNpemVzWyB0b0luZGV4IF1cblxuICAgICAgbGV0IHNjcm9sbFBvc2l0aW9uID0gcG9zU3RhcnQgKyBvZmZzZXRcblxuICAgICAgaWYgKGFsaWduRW5kICE9PSB2b2lkIDApIHtcbiAgICAgICAgY29uc3Qgc2l6ZURpZmYgPSBzaXplQWZ0ZXIgLSBzaXplQmVmb3JlXG4gICAgICAgIGNvbnN0IHNjcm9sbFN0YXJ0ID0gc2Nyb2xsRGV0YWlscy5zY3JvbGxTdGFydCArIHNpemVEaWZmXG5cbiAgICAgICAgc2Nyb2xsUG9zaXRpb24gPSBhbGlnbkZvcmNlICE9PSB0cnVlICYmIHNjcm9sbFN0YXJ0IDwgcG9zU3RhcnQgJiYgcG9zRW5kIDwgc2Nyb2xsU3RhcnQgKyBzY3JvbGxEZXRhaWxzLnNjcm9sbFZpZXdTaXplXG4gICAgICAgICAgPyBzY3JvbGxTdGFydFxuICAgICAgICAgIDogKFxuICAgICAgICAgICAgICBhbGlnbkVuZCA9PT0gJ2VuZCdcbiAgICAgICAgICAgICAgICA/IHBvc0VuZCAtIHNjcm9sbERldGFpbHMuc2Nyb2xsVmlld1NpemVcbiAgICAgICAgICAgICAgICA6IHBvc1N0YXJ0IC0gKGFsaWduRW5kID09PSAnc3RhcnQnID8gMCA6IE1hdGgucm91bmQoKHNjcm9sbERldGFpbHMuc2Nyb2xsVmlld1NpemUgLSB2aXJ0dWFsU2Nyb2xsU2l6ZXNbIHRvSW5kZXggXSkgLyAyKSlcbiAgICAgICAgICAgIClcbiAgICAgIH1cblxuICAgICAgcHJldlNjcm9sbFN0YXJ0ID0gc2Nyb2xsUG9zaXRpb25cblxuICAgICAgc2V0U2Nyb2xsKFxuICAgICAgICBzY3JvbGxFbCxcbiAgICAgICAgc2Nyb2xsUG9zaXRpb24sXG4gICAgICAgIHByb3BzLnZpcnR1YWxTY3JvbGxIb3Jpem9udGFsLFxuICAgICAgICAkcS5sYW5nLnJ0bFxuICAgICAgKVxuXG4gICAgICBlbWl0U2Nyb2xsKHRvSW5kZXgpXG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVZpcnR1YWxTY3JvbGxTaXplcyAoZnJvbSkge1xuICAgIGNvbnN0IGNvbnRlbnRFbCA9IGNvbnRlbnRSZWYudmFsdWVcblxuICAgIGlmIChjb250ZW50RWwpIHtcbiAgICAgIGNvbnN0XG4gICAgICAgIGNoaWxkcmVuID0gZmlsdGVyUHJvdG8uY2FsbChcbiAgICAgICAgICBjb250ZW50RWwuY2hpbGRyZW4sXG4gICAgICAgICAgZWwgPT4gZWwuY2xhc3NMaXN0ICYmIGVsLmNsYXNzTGlzdC5jb250YWlucygncS12aXJ0dWFsLXNjcm9sbC0tc2tpcCcpID09PSBmYWxzZVxuICAgICAgICApLFxuICAgICAgICBjaGlsZHJlbkxlbmd0aCA9IGNoaWxkcmVuLmxlbmd0aCxcbiAgICAgICAgc2l6ZUZuID0gcHJvcHMudmlydHVhbFNjcm9sbEhvcml6b250YWwgPT09IHRydWVcbiAgICAgICAgICA/IGVsID0+IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoXG4gICAgICAgICAgOiBlbCA9PiBlbC5vZmZzZXRIZWlnaHRcblxuICAgICAgbGV0XG4gICAgICAgIGluZGV4ID0gZnJvbSxcbiAgICAgICAgc2l6ZSwgZGlmZlxuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuTGVuZ3RoOykge1xuICAgICAgICBzaXplID0gc2l6ZUZuKGNoaWxkcmVuWyBpIF0pXG4gICAgICAgIGkrK1xuXG4gICAgICAgIHdoaWxlIChpIDwgY2hpbGRyZW5MZW5ndGggJiYgY2hpbGRyZW5bIGkgXS5jbGFzc0xpc3QuY29udGFpbnMoJ3EtdmlydHVhbC1zY3JvbGwtLXdpdGgtcHJldicpID09PSB0cnVlKSB7XG4gICAgICAgICAgc2l6ZSArPSBzaXplRm4oY2hpbGRyZW5bIGkgXSlcbiAgICAgICAgICBpKytcbiAgICAgICAgfVxuXG4gICAgICAgIGRpZmYgPSBzaXplIC0gdmlydHVhbFNjcm9sbFNpemVzWyBpbmRleCBdXG5cbiAgICAgICAgaWYgKGRpZmYgIT09IDApIHtcbiAgICAgICAgICB2aXJ0dWFsU2Nyb2xsU2l6ZXNbIGluZGV4IF0gKz0gZGlmZlxuICAgICAgICAgIHZpcnR1YWxTY3JvbGxTaXplc0FnZ1sgTWF0aC5mbG9vcihpbmRleCAvIGFnZ0J1Y2tldFNpemUpIF0gKz0gZGlmZlxuICAgICAgICB9XG5cbiAgICAgICAgaW5kZXgrK1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uQmx1clJlZm9jdXNGbiAoKSB7XG4gICAgY29udGVudFJlZi52YWx1ZT8uZm9jdXMoKVxuICB9XG5cbiAgZnVuY3Rpb24gbG9jYWxSZXNldFZpcnR1YWxTY3JvbGwgKHRvSW5kZXgsIGZ1bGxSZXNldCkge1xuICAgIGNvbnN0IGRlZmF1bHRTaXplID0gMSAqIHZpcnR1YWxTY3JvbGxJdGVtU2l6ZUNvbXB1dGVkLnZhbHVlXG5cbiAgICBpZiAoZnVsbFJlc2V0ID09PSB0cnVlIHx8IEFycmF5LmlzQXJyYXkodmlydHVhbFNjcm9sbFNpemVzKSA9PT0gZmFsc2UpIHtcbiAgICAgIHZpcnR1YWxTY3JvbGxTaXplcyA9IFtdXG4gICAgfVxuXG4gICAgY29uc3Qgb2xkVmlydHVhbFNjcm9sbFNpemVzTGVuZ3RoID0gdmlydHVhbFNjcm9sbFNpemVzLmxlbmd0aFxuXG4gICAgdmlydHVhbFNjcm9sbFNpemVzLmxlbmd0aCA9IHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWVcblxuICAgIGZvciAobGV0IGkgPSB2aXJ0dWFsU2Nyb2xsTGVuZ3RoLnZhbHVlIC0gMTsgaSA+PSBvbGRWaXJ0dWFsU2Nyb2xsU2l6ZXNMZW5ndGg7IGktLSkge1xuICAgICAgdmlydHVhbFNjcm9sbFNpemVzWyBpIF0gPSBkZWZhdWx0U2l6ZVxuICAgIH1cblxuICAgIGNvbnN0IGpNYXggPSBNYXRoLmZsb29yKCh2aXJ0dWFsU2Nyb2xsTGVuZ3RoLnZhbHVlIC0gMSkgLyBhZ2dCdWNrZXRTaXplKVxuICAgIHZpcnR1YWxTY3JvbGxTaXplc0FnZyA9IFtdXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPD0gak1heDsgaisrKSB7XG4gICAgICBsZXQgc2l6ZSA9IDBcbiAgICAgIGNvbnN0IGlNYXggPSBNYXRoLm1pbigoaiArIDEpICogYWdnQnVja2V0U2l6ZSwgdmlydHVhbFNjcm9sbExlbmd0aC52YWx1ZSlcbiAgICAgIGZvciAobGV0IGkgPSBqICogYWdnQnVja2V0U2l6ZTsgaSA8IGlNYXg7IGkrKykge1xuICAgICAgICBzaXplICs9IHZpcnR1YWxTY3JvbGxTaXplc1sgaSBdXG4gICAgICB9XG4gICAgICB2aXJ0dWFsU2Nyb2xsU2l6ZXNBZ2cucHVzaChzaXplKVxuICAgIH1cblxuICAgIHByZXZUb0luZGV4ID0gLTFcbiAgICBwcmV2U2Nyb2xsU3RhcnQgPSB2b2lkIDBcblxuICAgIHZpcnR1YWxTY3JvbGxQYWRkaW5nQmVmb3JlLnZhbHVlID0gc3VtU2l6ZSh2aXJ0dWFsU2Nyb2xsU2l6ZXNBZ2csIHZpcnR1YWxTY3JvbGxTaXplcywgMCwgdmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UudmFsdWUuZnJvbSlcbiAgICB2aXJ0dWFsU2Nyb2xsUGFkZGluZ0FmdGVyLnZhbHVlID0gc3VtU2l6ZSh2aXJ0dWFsU2Nyb2xsU2l6ZXNBZ2csIHZpcnR1YWxTY3JvbGxTaXplcywgdmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UudmFsdWUudG8sIHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWUpXG5cbiAgICBpZiAodG9JbmRleCA+PSAwKSB7XG4gICAgICB1cGRhdGVWaXJ0dWFsU2Nyb2xsU2l6ZXModmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UudmFsdWUuZnJvbSlcbiAgICAgIG5leHRUaWNrKCgpID0+IHsgc2Nyb2xsVG8odG9JbmRleCkgfSlcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBvblZpcnR1YWxTY3JvbGxFdnQoKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNldFZpcnR1YWxTY3JvbGxTaXplIChzY3JvbGxWaWV3U2l6ZSkge1xuICAgIGlmIChzY3JvbGxWaWV3U2l6ZSA9PT0gdm9pZCAwICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zdCBzY3JvbGxFbCA9IGdldFZpcnR1YWxTY3JvbGxUYXJnZXQoKVxuXG4gICAgICBpZiAoc2Nyb2xsRWwgIT09IHZvaWQgMCAmJiBzY3JvbGxFbCAhPT0gbnVsbCAmJiBzY3JvbGxFbC5ub2RlVHlwZSAhPT0gOCkge1xuICAgICAgICBzY3JvbGxWaWV3U2l6ZSA9IGdldFNjcm9sbERldGFpbHMoXG4gICAgICAgICAgc2Nyb2xsRWwsXG4gICAgICAgICAgZ2V0VmlydHVhbFNjcm9sbEVsKCksXG4gICAgICAgICAgYmVmb3JlUmVmLnZhbHVlLFxuICAgICAgICAgIGFmdGVyUmVmLnZhbHVlLFxuICAgICAgICAgIHByb3BzLnZpcnR1YWxTY3JvbGxIb3Jpem9udGFsLFxuICAgICAgICAgICRxLmxhbmcucnRsLFxuICAgICAgICAgIHByb3BzLnZpcnR1YWxTY3JvbGxTdGlja3lTaXplU3RhcnQsXG4gICAgICAgICAgcHJvcHMudmlydHVhbFNjcm9sbFN0aWNreVNpemVFbmRcbiAgICAgICAgKS5zY3JvbGxWaWV3U2l6ZVxuICAgICAgfVxuICAgIH1cblxuICAgIGxvY2FsU2Nyb2xsVmlld1NpemUgPSBzY3JvbGxWaWV3U2l6ZVxuXG4gICAgY29uc3QgdmlydHVhbFNjcm9sbFNsaWNlUmF0aW9CZWZvcmUgPSBwYXJzZUZsb2F0KHByb3BzLnZpcnR1YWxTY3JvbGxTbGljZVJhdGlvQmVmb3JlKSB8fCAwXG4gICAgY29uc3QgdmlydHVhbFNjcm9sbFNsaWNlUmF0aW9BZnRlciA9IHBhcnNlRmxvYXQocHJvcHMudmlydHVhbFNjcm9sbFNsaWNlUmF0aW9BZnRlcikgfHwgMFxuICAgIGNvbnN0IG11bHRpcGxpZXIgPSAxICsgdmlydHVhbFNjcm9sbFNsaWNlUmF0aW9CZWZvcmUgKyB2aXJ0dWFsU2Nyb2xsU2xpY2VSYXRpb0FmdGVyXG4gICAgY29uc3QgdmlldyA9IHNjcm9sbFZpZXdTaXplID09PSB2b2lkIDAgfHwgc2Nyb2xsVmlld1NpemUgPD0gMFxuICAgICAgPyAxXG4gICAgICA6IE1hdGguY2VpbChzY3JvbGxWaWV3U2l6ZSAvIHZpcnR1YWxTY3JvbGxJdGVtU2l6ZUNvbXB1dGVkLnZhbHVlKVxuXG4gICAgY29uc3QgYmFzZVNpemUgPSBNYXRoLm1heChcbiAgICAgIDEsXG4gICAgICB2aWV3LFxuICAgICAgTWF0aC5jZWlsKChwcm9wcy52aXJ0dWFsU2Nyb2xsU2xpY2VTaXplID4gMCA/IHByb3BzLnZpcnR1YWxTY3JvbGxTbGljZVNpemUgOiAxMCkgLyBtdWx0aXBsaWVyKVxuICAgIClcblxuICAgIHZpcnR1YWxTY3JvbGxTbGljZVNpemVDb21wdXRlZC52YWx1ZSA9IHtcbiAgICAgIHRvdGFsOiBNYXRoLmNlaWwoYmFzZVNpemUgKiBtdWx0aXBsaWVyKSxcbiAgICAgIHN0YXJ0OiBNYXRoLmNlaWwoYmFzZVNpemUgKiB2aXJ0dWFsU2Nyb2xsU2xpY2VSYXRpb0JlZm9yZSksXG4gICAgICBjZW50ZXI6IE1hdGguY2VpbChiYXNlU2l6ZSAqICgwLjUgKyB2aXJ0dWFsU2Nyb2xsU2xpY2VSYXRpb0JlZm9yZSkpLFxuICAgICAgZW5kOiBNYXRoLmNlaWwoYmFzZVNpemUgKiAoMSArIHZpcnR1YWxTY3JvbGxTbGljZVJhdGlvQmVmb3JlKSksXG4gICAgICB2aWV3XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcGFkVmlydHVhbFNjcm9sbCAodGFnLCBjb250ZW50KSB7XG4gICAgY29uc3QgcGFkZGluZ1NpemUgPSBwcm9wcy52aXJ0dWFsU2Nyb2xsSG9yaXpvbnRhbCA9PT0gdHJ1ZSA/ICd3aWR0aCcgOiAnaGVpZ2h0J1xuICAgIGNvbnN0IHN0eWxlID0ge1xuICAgICAgWyAnLS1xLXZpcnR1YWwtc2Nyb2xsLWl0ZW0tJyArIHBhZGRpbmdTaXplIF06IHZpcnR1YWxTY3JvbGxJdGVtU2l6ZUNvbXB1dGVkLnZhbHVlICsgJ3B4J1xuICAgIH1cblxuICAgIHJldHVybiBbXG4gICAgICB0YWcgPT09ICd0Ym9keSdcbiAgICAgICAgPyBoKHRhZywge1xuICAgICAgICAgIGNsYXNzOiAncS12aXJ0dWFsLXNjcm9sbF9fcGFkZGluZycsXG4gICAgICAgICAga2V5OiAnYmVmb3JlJyxcbiAgICAgICAgICByZWY6IGJlZm9yZVJlZlxuICAgICAgICB9LCBbXG4gICAgICAgICAgaCgndHInLCBbXG4gICAgICAgICAgICBoKCd0ZCcsIHtcbiAgICAgICAgICAgICAgc3R5bGU6IHsgWyBwYWRkaW5nU2l6ZSBdOiBgJHsgdmlydHVhbFNjcm9sbFBhZGRpbmdCZWZvcmUudmFsdWUgfXB4YCwgLi4uc3R5bGUgfSxcbiAgICAgICAgICAgICAgY29sc3BhbjogY29sc3BhbkF0dHIudmFsdWVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXSlcbiAgICAgICAgXSlcbiAgICAgICAgOiBoKHRhZywge1xuICAgICAgICAgIGNsYXNzOiAncS12aXJ0dWFsLXNjcm9sbF9fcGFkZGluZycsXG4gICAgICAgICAga2V5OiAnYmVmb3JlJyxcbiAgICAgICAgICByZWY6IGJlZm9yZVJlZixcbiAgICAgICAgICBzdHlsZTogeyBbIHBhZGRpbmdTaXplIF06IGAkeyB2aXJ0dWFsU2Nyb2xsUGFkZGluZ0JlZm9yZS52YWx1ZSB9cHhgLCAuLi5zdHlsZSB9XG4gICAgICAgIH0pLFxuXG4gICAgICBoKHRhZywge1xuICAgICAgICBjbGFzczogJ3EtdmlydHVhbC1zY3JvbGxfX2NvbnRlbnQnLFxuICAgICAgICBrZXk6ICdjb250ZW50JyxcbiAgICAgICAgcmVmOiBjb250ZW50UmVmLFxuICAgICAgICB0YWJpbmRleDogLTFcbiAgICAgIH0sIGNvbnRlbnQuZmxhdCgpKSxcblxuICAgICAgdGFnID09PSAndGJvZHknXG4gICAgICAgID8gaCh0YWcsIHtcbiAgICAgICAgICBjbGFzczogJ3EtdmlydHVhbC1zY3JvbGxfX3BhZGRpbmcnLFxuICAgICAgICAgIGtleTogJ2FmdGVyJyxcbiAgICAgICAgICByZWY6IGFmdGVyUmVmXG4gICAgICAgIH0sIFtcbiAgICAgICAgICBoKCd0cicsIFtcbiAgICAgICAgICAgIGgoJ3RkJywge1xuICAgICAgICAgICAgICBzdHlsZTogeyBbIHBhZGRpbmdTaXplIF06IGAkeyB2aXJ0dWFsU2Nyb2xsUGFkZGluZ0FmdGVyLnZhbHVlIH1weGAsIC4uLnN0eWxlIH0sXG4gICAgICAgICAgICAgIGNvbHNwYW46IGNvbHNwYW5BdHRyLnZhbHVlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF0pXG4gICAgICAgIF0pXG4gICAgICAgIDogaCh0YWcsIHtcbiAgICAgICAgICBjbGFzczogJ3EtdmlydHVhbC1zY3JvbGxfX3BhZGRpbmcnLFxuICAgICAgICAgIGtleTogJ2FmdGVyJyxcbiAgICAgICAgICByZWY6IGFmdGVyUmVmLFxuICAgICAgICAgIHN0eWxlOiB7IFsgcGFkZGluZ1NpemUgXTogYCR7IHZpcnR1YWxTY3JvbGxQYWRkaW5nQWZ0ZXIudmFsdWUgfXB4YCwgLi4uc3R5bGUgfVxuICAgICAgICB9KVxuICAgIF1cbiAgfVxuXG4gIGZ1bmN0aW9uIGVtaXRTY3JvbGwgKGluZGV4KSB7XG4gICAgaWYgKHByZXZUb0luZGV4ICE9PSBpbmRleCkge1xuICAgICAgcHJvcHMub25WaXJ0dWFsU2Nyb2xsICE9PSB2b2lkIDAgJiYgZW1pdCgndmlydHVhbFNjcm9sbCcsIHtcbiAgICAgICAgaW5kZXgsXG4gICAgICAgIGZyb206IHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlLmZyb20sXG4gICAgICAgIHRvOiB2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZS52YWx1ZS50byAtIDEsXG4gICAgICAgIGRpcmVjdGlvbjogaW5kZXggPCBwcmV2VG9JbmRleCA/ICdkZWNyZWFzZScgOiAnaW5jcmVhc2UnLFxuICAgICAgICByZWY6IHByb3h5XG4gICAgICB9KVxuXG4gICAgICBwcmV2VG9JbmRleCA9IGluZGV4XG4gICAgfVxuICB9XG5cbiAgc2V0VmlydHVhbFNjcm9sbFNpemUoKVxuICBjb25zdCBvblZpcnR1YWxTY3JvbGxFdnQgPSBkZWJvdW5jZShcbiAgICBsb2NhbE9uVmlydHVhbFNjcm9sbEV2dCxcbiAgICAkcS5wbGF0Zm9ybS5pcy5pb3MgPT09IHRydWUgPyAxMjAgOiAzNVxuICApXG5cbiAgb25CZWZvcmVNb3VudCgoKSA9PiB7XG4gICAgc2V0VmlydHVhbFNjcm9sbFNpemUoKVxuICB9KVxuXG4gIGxldCBzaG91bGRBY3RpdmF0ZSA9IGZhbHNlXG5cbiAgb25EZWFjdGl2YXRlZCgoKSA9PiB7XG4gICAgc2hvdWxkQWN0aXZhdGUgPSB0cnVlXG4gIH0pXG5cbiAgb25BY3RpdmF0ZWQoKCkgPT4ge1xuICAgIGlmIChzaG91bGRBY3RpdmF0ZSAhPT0gdHJ1ZSkgcmV0dXJuXG5cbiAgICBjb25zdCBzY3JvbGxFbCA9IGdldFZpcnR1YWxTY3JvbGxUYXJnZXQoKVxuXG4gICAgaWYgKHByZXZTY3JvbGxTdGFydCAhPT0gdm9pZCAwICYmIHNjcm9sbEVsICE9PSB2b2lkIDAgJiYgc2Nyb2xsRWwgIT09IG51bGwgJiYgc2Nyb2xsRWwubm9kZVR5cGUgIT09IDgpIHtcbiAgICAgIHNldFNjcm9sbChcbiAgICAgICAgc2Nyb2xsRWwsXG4gICAgICAgIHByZXZTY3JvbGxTdGFydCxcbiAgICAgICAgcHJvcHMudmlydHVhbFNjcm9sbEhvcml6b250YWwsXG4gICAgICAgICRxLmxhbmcucnRsXG4gICAgICApXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgc2Nyb2xsVG8ocHJldlRvSW5kZXgpXG4gICAgfVxuICB9KVxuXG4gIF9fUVVBU0FSX1NTUl9fIHx8IG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgb25WaXJ0dWFsU2Nyb2xsRXZ0LmNhbmNlbCgpXG4gIH0pXG5cbiAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gIE9iamVjdC5hc3NpZ24ocHJveHksIHsgc2Nyb2xsVG8sIHJlc2V0LCByZWZyZXNoIH0pXG5cbiAgcmV0dXJuIHtcbiAgICB2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZSxcbiAgICB2aXJ0dWFsU2Nyb2xsU2xpY2VTaXplQ29tcHV0ZWQsXG5cbiAgICBzZXRWaXJ0dWFsU2Nyb2xsU2l6ZSxcbiAgICBvblZpcnR1YWxTY3JvbGxFdnQsXG4gICAgbG9jYWxSZXNldFZpcnR1YWxTY3JvbGwsXG4gICAgcGFkVmlydHVhbFNjcm9sbCxcblxuICAgIHNjcm9sbFRvLFxuICAgIHJlc2V0LFxuICAgIHJlZnJlc2hcbiAgfVxufVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIG9uQmVmb3JlVXBkYXRlLCBvblVwZGF0ZWQsIG9uQmVmb3JlVW5tb3VudCwgbmV4dFRpY2ssIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFGaWVsZCBmcm9tICcuLi9maWVsZC9RRmllbGQuanMnXG5pbXBvcnQgUUljb24gZnJvbSAnLi4vaWNvbi9RSWNvbi5qcydcbmltcG9ydCBRQ2hpcCBmcm9tICcuLi9jaGlwL1FDaGlwLmpzJ1xuXG5pbXBvcnQgUUl0ZW0gZnJvbSAnLi4vaXRlbS9RSXRlbS5qcydcbmltcG9ydCBRSXRlbVNlY3Rpb24gZnJvbSAnLi4vaXRlbS9RSXRlbVNlY3Rpb24uanMnXG5pbXBvcnQgUUl0ZW1MYWJlbCBmcm9tICcuLi9pdGVtL1FJdGVtTGFiZWwuanMnXG5cbmltcG9ydCBRTWVudSBmcm9tICcuLi9tZW51L1FNZW51LmpzJ1xuaW1wb3J0IFFEaWFsb2cgZnJvbSAnLi4vZGlhbG9nL1FEaWFsb2cuanMnXG5cbmltcG9ydCB1c2VGaWVsZCwgeyB1c2VGaWVsZFN0YXRlLCB1c2VGaWVsZFByb3BzLCB1c2VGaWVsZEVtaXRzLCBmaWVsZFZhbHVlSXNGaWxsZWQgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1maWVsZC91c2UtZmllbGQuanMnXG5pbXBvcnQgeyB1c2VWaXJ0dWFsU2Nyb2xsLCB1c2VWaXJ0dWFsU2Nyb2xsUHJvcHMgfSBmcm9tICcuLi92aXJ0dWFsLXNjcm9sbC91c2UtdmlydHVhbC1zY3JvbGwuanMnXG5pbXBvcnQgeyB1c2VGb3JtUHJvcHMsIHVzZUZvcm1JbnB1dE5hbWVBdHRyIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvdXNlLWZvcm0vcHJpdmF0ZS51c2UtZm9ybS5qcydcbmltcG9ydCB1c2VLZXlDb21wb3NpdGlvbiBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1rZXktY29tcG9zaXRpb24vdXNlLWtleS1jb21wb3NpdGlvbi5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaXNEZWVwRXF1YWwgfSBmcm9tICcuLi8uLi91dGlscy9pcy9pcy5qcydcbmltcG9ydCB7IHN0b3AsIHByZXZlbnQsIHN0b3BBbmRQcmV2ZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQvZXZlbnQuanMnXG5pbXBvcnQgeyBub3JtYWxpemVUb0ludGVydmFsIH0gZnJvbSAnLi4vLi4vdXRpbHMvZm9ybWF0L2Zvcm1hdC5qcydcbmltcG9ydCB7IHNob3VsZElnbm9yZUtleSwgaXNLZXlDb2RlIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5rZXlib2FyZC9rZXktY29tcG9zaXRpb24uanMnXG5pbXBvcnQgeyBoTWVyZ2VTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuXG5jb25zdCB2YWxpZGF0ZU5ld1ZhbHVlTW9kZSA9IHYgPT4gWyAnYWRkJywgJ2FkZC11bmlxdWUnLCAndG9nZ2xlJyBdLmluY2x1ZGVzKHYpXG5jb25zdCByZUVzY2FwZUxpc3QgPSAnLiorP14ke30oKXxbXVxcXFwnXG5jb25zdCBmaWVsZFByb3BzTGlzdCA9IE9iamVjdC5rZXlzKHVzZUZpZWxkUHJvcHMpXG5cbmZ1bmN0aW9uIGdldFByb3BWYWx1ZUZuICh1c2VyUHJvcE5hbWUsIGRlZmF1bHRQcm9wTmFtZSkge1xuICBpZiAodHlwZW9mIHVzZXJQcm9wTmFtZSA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHVzZXJQcm9wTmFtZVxuXG4gIGNvbnN0IHByb3BOYW1lID0gdXNlclByb3BOYW1lICE9PSB2b2lkIDBcbiAgICA/IHVzZXJQcm9wTmFtZVxuICAgIDogZGVmYXVsdFByb3BOYW1lXG5cbiAgcmV0dXJuIG9wdCA9PiAoKG9wdCAhPT0gbnVsbCAmJiB0eXBlb2Ygb3B0ID09PSAnb2JqZWN0JyAmJiBwcm9wTmFtZSBpbiBvcHQpID8gb3B0WyBwcm9wTmFtZSBdIDogb3B0KVxufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVNlbGVjdCcsXG5cbiAgaW5oZXJpdEF0dHJzOiBmYWxzZSxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZVZpcnR1YWxTY3JvbGxQcm9wcyxcbiAgICAuLi51c2VGb3JtUHJvcHMsXG4gICAgLi4udXNlRmllbGRQcm9wcyxcblxuICAgIC8vIG92ZXJyaWRlIG9mIHVzZUZpZWxkUHJvcHMgPiBtb2RlbFZhbHVlXG4gICAgbW9kZWxWYWx1ZToge1xuICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICB9LFxuXG4gICAgbXVsdGlwbGU6IEJvb2xlYW4sXG5cbiAgICBkaXNwbGF5VmFsdWU6IFsgU3RyaW5nLCBOdW1iZXIgXSxcbiAgICBkaXNwbGF5VmFsdWVIdG1sOiBCb29sZWFuLFxuICAgIGRyb3Bkb3duSWNvbjogU3RyaW5nLFxuXG4gICAgb3B0aW9uczoge1xuICAgICAgdHlwZTogQXJyYXksXG4gICAgICBkZWZhdWx0OiAoKSA9PiBbXVxuICAgIH0sXG5cbiAgICBvcHRpb25WYWx1ZTogWyBGdW5jdGlvbiwgU3RyaW5nIF0sXG4gICAgb3B0aW9uTGFiZWw6IFsgRnVuY3Rpb24sIFN0cmluZyBdLFxuICAgIG9wdGlvbkRpc2FibGU6IFsgRnVuY3Rpb24sIFN0cmluZyBdLFxuXG4gICAgaGlkZVNlbGVjdGVkOiBCb29sZWFuLFxuICAgIGhpZGVEcm9wZG93bkljb246IEJvb2xlYW4sXG4gICAgZmlsbElucHV0OiBCb29sZWFuLFxuXG4gICAgbWF4VmFsdWVzOiBbIE51bWJlciwgU3RyaW5nIF0sXG5cbiAgICBvcHRpb25zRGVuc2U6IEJvb2xlYW4sXG4gICAgb3B0aW9uc0Rhcms6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiBudWxsXG4gICAgfSxcbiAgICBvcHRpb25zU2VsZWN0ZWRDbGFzczogU3RyaW5nLFxuICAgIG9wdGlvbnNIdG1sOiBCb29sZWFuLFxuXG4gICAgb3B0aW9uc0NvdmVyOiBCb29sZWFuLFxuXG4gICAgbWVudVNocmluazogQm9vbGVhbixcbiAgICBtZW51QW5jaG9yOiBTdHJpbmcsXG4gICAgbWVudVNlbGY6IFN0cmluZyxcbiAgICBtZW51T2Zmc2V0OiBBcnJheSxcblxuICAgIHBvcHVwQ29udGVudENsYXNzOiBTdHJpbmcsXG4gICAgcG9wdXBDb250ZW50U3R5bGU6IFsgU3RyaW5nLCBBcnJheSwgT2JqZWN0IF0sXG4gICAgcG9wdXBOb1JvdXRlRGlzbWlzczogQm9vbGVhbixcblxuICAgIHVzZUlucHV0OiBCb29sZWFuLFxuICAgIHVzZUNoaXBzOiBCb29sZWFuLFxuXG4gICAgbmV3VmFsdWVNb2RlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWxpZGF0b3I6IHZhbGlkYXRlTmV3VmFsdWVNb2RlXG4gICAgfSxcblxuICAgIG1hcE9wdGlvbnM6IEJvb2xlYW4sXG4gICAgZW1pdFZhbHVlOiBCb29sZWFuLFxuXG4gICAgZGlzYWJsZVRhYlNlbGVjdGlvbjogQm9vbGVhbixcblxuICAgIGlucHV0RGVib3VuY2U6IHtcbiAgICAgIHR5cGU6IFsgTnVtYmVyLCBTdHJpbmcgXSxcbiAgICAgIGRlZmF1bHQ6IDUwMFxuICAgIH0sXG5cbiAgICBpbnB1dENsYXNzOiBbIEFycmF5LCBTdHJpbmcsIE9iamVjdCBdLFxuICAgIGlucHV0U3R5bGU6IFsgQXJyYXksIFN0cmluZywgT2JqZWN0IF0sXG5cbiAgICB0YWJpbmRleDoge1xuICAgICAgdHlwZTogWyBTdHJpbmcsIE51bWJlciBdLFxuICAgICAgZGVmYXVsdDogMFxuICAgIH0sXG5cbiAgICBhdXRvY29tcGxldGU6IFN0cmluZyxcblxuICAgIHRyYW5zaXRpb25TaG93OiB7fSxcbiAgICB0cmFuc2l0aW9uSGlkZToge30sXG4gICAgdHJhbnNpdGlvbkR1cmF0aW9uOiB7fSxcblxuICAgIGJlaGF2aW9yOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gWyAnZGVmYXVsdCcsICdtZW51JywgJ2RpYWxvZycgXS5pbmNsdWRlcyh2KSxcbiAgICAgIGRlZmF1bHQ6ICdkZWZhdWx0J1xuICAgIH0sXG5cbiAgICAvLyBvdmVycmlkZSBvZiB1c2VWaXJ0dWFsU2Nyb2xsUHJvcHMgPiB2aXJ0dWFsU2Nyb2xsSXRlbVNpemUgKG5vIGRlZmF1bHQpXG4gICAgdmlydHVhbFNjcm9sbEl0ZW1TaXplOiB1c2VWaXJ0dWFsU2Nyb2xsUHJvcHMudmlydHVhbFNjcm9sbEl0ZW1TaXplLnR5cGUsXG5cbiAgICBvbk5ld1ZhbHVlOiBGdW5jdGlvbixcbiAgICBvbkZpbHRlcjogRnVuY3Rpb25cbiAgfSxcblxuICBlbWl0czogW1xuICAgIC4uLnVzZUZpZWxkRW1pdHMsXG4gICAgJ2FkZCcsICdyZW1vdmUnLCAnaW5wdXRWYWx1ZScsXG4gICAgJ2tleXVwJywgJ2tleXByZXNzJywgJ2tleWRvd24nLFxuICAgICdwb3B1cFNob3cnLCAncG9wdXBIaWRlJyxcbiAgICAnZmlsdGVyQWJvcnQnXG4gIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0IH0pIHtcbiAgICBjb25zdCB7IHByb3h5IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICAgIGNvbnN0IHsgJHEgfSA9IHByb3h5XG5cbiAgICBjb25zdCBtZW51ID0gcmVmKGZhbHNlKVxuICAgIGNvbnN0IGRpYWxvZyA9IHJlZihmYWxzZSlcbiAgICBjb25zdCBvcHRpb25JbmRleCA9IHJlZigtMSlcbiAgICBjb25zdCBpbnB1dFZhbHVlID0gcmVmKCcnKVxuICAgIGNvbnN0IGRpYWxvZ0ZpZWxkRm9jdXNlZCA9IHJlZihmYWxzZSlcbiAgICBjb25zdCBpbm5lckxvYWRpbmdJbmRpY2F0b3IgPSByZWYoZmFsc2UpXG5cbiAgICBsZXQgZmlsdGVyVGltZXIgPSBudWxsLCBpbnB1dFZhbHVlVGltZXIgPSBudWxsLFxuICAgICAgaW5uZXJWYWx1ZUNhY2hlLFxuICAgICAgaGFzRGlhbG9nLCB1c2VySW5wdXRWYWx1ZSwgZmlsdGVySWQgPSBudWxsLCBkZWZhdWx0SW5wdXRWYWx1ZSxcbiAgICAgIHRyYW5zaXRpb25TaG93Q29tcHV0ZWQsIHNlYXJjaEJ1ZmZlciwgc2VhcmNoQnVmZmVyRXhwXG5cbiAgICBjb25zdCBpbnB1dFJlZiA9IHJlZihudWxsKVxuICAgIGNvbnN0IHRhcmdldFJlZiA9IHJlZihudWxsKVxuICAgIGNvbnN0IG1lbnVSZWYgPSByZWYobnVsbClcbiAgICBjb25zdCBkaWFsb2dSZWYgPSByZWYobnVsbClcbiAgICBjb25zdCBtZW51Q29udGVudFJlZiA9IHJlZihudWxsKVxuXG4gICAgY29uc3QgbmFtZVByb3AgPSB1c2VGb3JtSW5wdXROYW1lQXR0cihwcm9wcylcblxuICAgIGNvbnN0IG9uQ29tcG9zaXRpb24gPSB1c2VLZXlDb21wb3NpdGlvbihvbklucHV0KVxuXG4gICAgY29uc3QgdmlydHVhbFNjcm9sbExlbmd0aCA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIEFycmF5LmlzQXJyYXkocHJvcHMub3B0aW9ucylcbiAgICAgICAgPyBwcm9wcy5vcHRpb25zLmxlbmd0aFxuICAgICAgICA6IDBcbiAgICApKVxuXG4gICAgY29uc3QgdmlydHVhbFNjcm9sbEl0ZW1TaXplQ29tcHV0ZWQgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy52aXJ0dWFsU2Nyb2xsSXRlbVNpemUgPT09IHZvaWQgMFxuICAgICAgICA/IChwcm9wcy5vcHRpb25zRGVuc2UgPT09IHRydWUgPyAyNCA6IDQ4KVxuICAgICAgICA6IHByb3BzLnZpcnR1YWxTY3JvbGxJdGVtU2l6ZVxuICAgICkpXG5cbiAgICBjb25zdCB7XG4gICAgICB2aXJ0dWFsU2Nyb2xsU2xpY2VSYW5nZSxcbiAgICAgIHZpcnR1YWxTY3JvbGxTbGljZVNpemVDb21wdXRlZCxcbiAgICAgIGxvY2FsUmVzZXRWaXJ0dWFsU2Nyb2xsLFxuICAgICAgcGFkVmlydHVhbFNjcm9sbCxcbiAgICAgIG9uVmlydHVhbFNjcm9sbEV2dCxcbiAgICAgIHNjcm9sbFRvLFxuICAgICAgc2V0VmlydHVhbFNjcm9sbFNpemVcbiAgICB9ID0gdXNlVmlydHVhbFNjcm9sbCh7XG4gICAgICB2aXJ0dWFsU2Nyb2xsTGVuZ3RoLCBnZXRWaXJ0dWFsU2Nyb2xsVGFyZ2V0LCBnZXRWaXJ0dWFsU2Nyb2xsRWwsXG4gICAgICB2aXJ0dWFsU2Nyb2xsSXRlbVNpemVDb21wdXRlZFxuICAgIH0pXG5cbiAgICBjb25zdCBzdGF0ZSA9IHVzZUZpZWxkU3RhdGUoKVxuXG4gICAgY29uc3QgaW5uZXJWYWx1ZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0XG4gICAgICAgIG1hcE51bGwgPSBwcm9wcy5tYXBPcHRpb25zID09PSB0cnVlICYmIHByb3BzLm11bHRpcGxlICE9PSB0cnVlLFxuICAgICAgICB2YWwgPSBwcm9wcy5tb2RlbFZhbHVlICE9PSB2b2lkIDAgJiYgKHByb3BzLm1vZGVsVmFsdWUgIT09IG51bGwgfHwgbWFwTnVsbCA9PT0gdHJ1ZSlcbiAgICAgICAgICA/IChwcm9wcy5tdWx0aXBsZSA9PT0gdHJ1ZSAmJiBBcnJheS5pc0FycmF5KHByb3BzLm1vZGVsVmFsdWUpID8gcHJvcHMubW9kZWxWYWx1ZSA6IFsgcHJvcHMubW9kZWxWYWx1ZSBdKVxuICAgICAgICAgIDogW11cblxuICAgICAgaWYgKHByb3BzLm1hcE9wdGlvbnMgPT09IHRydWUgJiYgQXJyYXkuaXNBcnJheShwcm9wcy5vcHRpb25zKSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBjYWNoZSA9IHByb3BzLm1hcE9wdGlvbnMgPT09IHRydWUgJiYgaW5uZXJWYWx1ZUNhY2hlICE9PSB2b2lkIDBcbiAgICAgICAgICA/IGlubmVyVmFsdWVDYWNoZVxuICAgICAgICAgIDogW11cbiAgICAgICAgY29uc3QgdmFsdWVzID0gdmFsLm1hcCh2ID0+IGdldE9wdGlvbih2LCBjYWNoZSkpXG5cbiAgICAgICAgcmV0dXJuIHByb3BzLm1vZGVsVmFsdWUgPT09IG51bGwgJiYgbWFwTnVsbCA9PT0gdHJ1ZVxuICAgICAgICAgID8gdmFsdWVzLmZpbHRlcih2ID0+IHYgIT09IG51bGwpXG4gICAgICAgICAgOiB2YWx1ZXNcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHZhbFxuICAgIH0pXG5cbiAgICBjb25zdCBpbm5lckZpZWxkUHJvcHMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBhY2MgPSB7fVxuICAgICAgZmllbGRQcm9wc0xpc3QuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBjb25zdCB2YWwgPSBwcm9wc1sga2V5IF1cbiAgICAgICAgaWYgKHZhbCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgYWNjWyBrZXkgXSA9IHZhbFxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgcmV0dXJuIGFjY1xuICAgIH0pXG5cbiAgICBjb25zdCBpc09wdGlvbnNEYXJrID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMub3B0aW9uc0RhcmsgPT09IG51bGxcbiAgICAgICAgPyBzdGF0ZS5pc0RhcmsudmFsdWVcbiAgICAgICAgOiBwcm9wcy5vcHRpb25zRGFya1xuICAgICkpXG5cbiAgICBjb25zdCBoYXNWYWx1ZSA9IGNvbXB1dGVkKCgpID0+IGZpZWxkVmFsdWVJc0ZpbGxlZChpbm5lclZhbHVlLnZhbHVlKSlcblxuICAgIGNvbnN0IGNvbXB1dGVkSW5wdXRDbGFzcyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGxldCBjbHMgPSAncS1maWVsZF9faW5wdXQgcS1wbGFjZWhvbGRlciBjb2wnXG5cbiAgICAgIGlmIChwcm9wcy5oaWRlU2VsZWN0ZWQgPT09IHRydWUgfHwgaW5uZXJWYWx1ZS52YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIFsgY2xzLCBwcm9wcy5pbnB1dENsYXNzIF1cbiAgICAgIH1cblxuICAgICAgY2xzICs9ICcgcS1maWVsZF9faW5wdXQtLXBhZGRpbmcnXG5cbiAgICAgIHJldHVybiBwcm9wcy5pbnB1dENsYXNzID09PSB2b2lkIDBcbiAgICAgICAgPyBjbHNcbiAgICAgICAgOiBbIGNscywgcHJvcHMuaW5wdXRDbGFzcyBdXG4gICAgfSlcblxuICAgIGNvbnN0IG1lbnVDb250ZW50Q2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgKHByb3BzLnZpcnR1YWxTY3JvbGxIb3Jpem9udGFsID09PSB0cnVlID8gJ3EtdmlydHVhbC1zY3JvbGwtLWhvcml6b250YWwnIDogJycpXG4gICAgICArIChwcm9wcy5wb3B1cENvbnRlbnRDbGFzcyA/ICcgJyArIHByb3BzLnBvcHVwQ29udGVudENsYXNzIDogJycpXG4gICAgKVxuXG4gICAgY29uc3Qgbm9PcHRpb25zID0gY29tcHV0ZWQoKCkgPT4gdmlydHVhbFNjcm9sbExlbmd0aC52YWx1ZSA9PT0gMClcblxuICAgIGNvbnN0IHNlbGVjdGVkU3RyaW5nID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIGlubmVyVmFsdWUudmFsdWVcbiAgICAgICAgLm1hcChvcHQgPT4gZ2V0T3B0aW9uTGFiZWwudmFsdWUob3B0KSlcbiAgICAgICAgLmpvaW4oJywgJylcbiAgICApXG5cbiAgICBjb25zdCBhcmlhQ3VycmVudFZhbHVlID0gY29tcHV0ZWQoKCkgPT4gKHByb3BzLmRpc3BsYXlWYWx1ZSAhPT0gdm9pZCAwXG4gICAgICA/IHByb3BzLmRpc3BsYXlWYWx1ZVxuICAgICAgOiBzZWxlY3RlZFN0cmluZy52YWx1ZVxuICAgICkpXG5cbiAgICBjb25zdCBuZWVkc0h0bWxGbiA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLm9wdGlvbnNIdG1sID09PSB0cnVlXG4gICAgICAgID8gKCkgPT4gdHJ1ZVxuICAgICAgICA6IG9wdCA9PiBvcHQ/Lmh0bWwgPT09IHRydWVcbiAgICApKVxuXG4gICAgY29uc3QgdmFsdWVBc0h0bWwgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5kaXNwbGF5VmFsdWVIdG1sID09PSB0cnVlIHx8IChcbiAgICAgICAgcHJvcHMuZGlzcGxheVZhbHVlID09PSB2b2lkIDAgJiYgKFxuICAgICAgICAgIHByb3BzLm9wdGlvbnNIdG1sID09PSB0cnVlXG4gICAgICAgICAgfHwgaW5uZXJWYWx1ZS52YWx1ZS5zb21lKG5lZWRzSHRtbEZuLnZhbHVlKVxuICAgICAgICApXG4gICAgICApXG4gICAgKSlcblxuICAgIGNvbnN0IHRhYmluZGV4ID0gY29tcHV0ZWQoKCkgPT4gKHN0YXRlLmZvY3VzZWQudmFsdWUgPT09IHRydWUgPyBwcm9wcy50YWJpbmRleCA6IC0xKSlcblxuICAgIGNvbnN0IGNvbWJvYm94QXR0cnMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBhdHRycyA9IHtcbiAgICAgICAgdGFiaW5kZXg6IHByb3BzLnRhYmluZGV4LFxuICAgICAgICByb2xlOiAnY29tYm9ib3gnLFxuICAgICAgICAnYXJpYS1sYWJlbCc6IHByb3BzLmxhYmVsLFxuICAgICAgICAnYXJpYS1yZWFkb25seSc6IHByb3BzLnJlYWRvbmx5ID09PSB0cnVlID8gJ3RydWUnIDogJ2ZhbHNlJyxcbiAgICAgICAgJ2FyaWEtYXV0b2NvbXBsZXRlJzogcHJvcHMudXNlSW5wdXQgPT09IHRydWUgPyAnbGlzdCcgOiAnbm9uZScsXG4gICAgICAgICdhcmlhLWV4cGFuZGVkJzogbWVudS52YWx1ZSA9PT0gdHJ1ZSA/ICd0cnVlJyA6ICdmYWxzZScsXG4gICAgICAgICdhcmlhLWNvbnRyb2xzJzogYCR7IHN0YXRlLnRhcmdldFVpZC52YWx1ZSB9X2xiYFxuICAgICAgfVxuXG4gICAgICBpZiAob3B0aW9uSW5kZXgudmFsdWUgPj0gMCkge1xuICAgICAgICBhdHRyc1sgJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcgXSA9IGAkeyBzdGF0ZS50YXJnZXRVaWQudmFsdWUgfV8keyBvcHRpb25JbmRleC52YWx1ZSB9YFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gYXR0cnNcbiAgICB9KVxuXG4gICAgY29uc3QgbGlzdGJveEF0dHJzID0gY29tcHV0ZWQoKCkgPT4gKHtcbiAgICAgIGlkOiBgJHsgc3RhdGUudGFyZ2V0VWlkLnZhbHVlIH1fbGJgLFxuICAgICAgcm9sZTogJ2xpc3Rib3gnLFxuICAgICAgJ2FyaWEtbXVsdGlzZWxlY3RhYmxlJzogcHJvcHMubXVsdGlwbGUgPT09IHRydWUgPyAndHJ1ZScgOiAnZmFsc2UnXG4gICAgfSkpXG5cbiAgICBjb25zdCBzZWxlY3RlZFNjb3BlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgcmV0dXJuIGlubmVyVmFsdWUudmFsdWUubWFwKChvcHQsIGkpID0+ICh7XG4gICAgICAgIGluZGV4OiBpLFxuICAgICAgICBvcHQsXG4gICAgICAgIGh0bWw6IG5lZWRzSHRtbEZuLnZhbHVlKG9wdCksXG4gICAgICAgIHNlbGVjdGVkOiB0cnVlLFxuICAgICAgICByZW1vdmVBdEluZGV4OiByZW1vdmVBdEluZGV4QW5kRm9jdXMsXG4gICAgICAgIHRvZ2dsZU9wdGlvbixcbiAgICAgICAgdGFiaW5kZXg6IHRhYmluZGV4LnZhbHVlXG4gICAgICB9KSlcbiAgICB9KVxuXG4gICAgY29uc3Qgb3B0aW9uU2NvcGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBpZiAodmlydHVhbFNjcm9sbExlbmd0aC52YWx1ZSA9PT0gMCkge1xuICAgICAgICByZXR1cm4gW11cbiAgICAgIH1cblxuICAgICAgY29uc3QgeyBmcm9tLCB0byB9ID0gdmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UudmFsdWVcblxuICAgICAgcmV0dXJuIHByb3BzLm9wdGlvbnMuc2xpY2UoZnJvbSwgdG8pLm1hcCgob3B0LCBpKSA9PiB7XG4gICAgICAgIGNvbnN0IGRpc2FibGUgPSBpc09wdGlvbkRpc2FibGVkLnZhbHVlKG9wdCkgPT09IHRydWVcbiAgICAgICAgY29uc3QgYWN0aXZlID0gaXNPcHRpb25TZWxlY3RlZChvcHQpID09PSB0cnVlXG4gICAgICAgIGNvbnN0IGluZGV4ID0gZnJvbSArIGlcblxuICAgICAgICBjb25zdCBpdGVtUHJvcHMgPSB7XG4gICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxuICAgICAgICAgIGFjdGl2ZSxcbiAgICAgICAgICBhY3RpdmVDbGFzczogY29tcHV0ZWRPcHRpb25zU2VsZWN0ZWRDbGFzcy52YWx1ZSxcbiAgICAgICAgICBtYW51YWxGb2N1czogdHJ1ZSxcbiAgICAgICAgICBmb2N1c2VkOiBmYWxzZSxcbiAgICAgICAgICBkaXNhYmxlLFxuICAgICAgICAgIHRhYmluZGV4OiAtMSxcbiAgICAgICAgICBkZW5zZTogcHJvcHMub3B0aW9uc0RlbnNlLFxuICAgICAgICAgIGRhcms6IGlzT3B0aW9uc0RhcmsudmFsdWUsXG4gICAgICAgICAgcm9sZTogJ29wdGlvbicsXG4gICAgICAgICAgJ2FyaWEtc2VsZWN0ZWQnOiBhY3RpdmUgPT09IHRydWUgPyAndHJ1ZScgOiAnZmFsc2UnLFxuICAgICAgICAgIGlkOiBgJHsgc3RhdGUudGFyZ2V0VWlkLnZhbHVlIH1fJHsgaW5kZXggfWAsXG4gICAgICAgICAgb25DbGljazogKCkgPT4geyB0b2dnbGVPcHRpb24ob3B0KSB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGlzYWJsZSAhPT0gdHJ1ZSkge1xuICAgICAgICAgIG9wdGlvbkluZGV4LnZhbHVlID09PSBpbmRleCAmJiAoaXRlbVByb3BzLmZvY3VzZWQgPSB0cnVlKVxuXG4gICAgICAgICAgaWYgKCRxLnBsYXRmb3JtLmlzLmRlc2t0b3AgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGl0ZW1Qcm9wcy5vbk1vdXNlbW92ZSA9ICgpID0+IHsgbWVudS52YWx1ZSA9PT0gdHJ1ZSAmJiBzZXRPcHRpb25JbmRleChpbmRleCkgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgb3B0LFxuICAgICAgICAgIGh0bWw6IG5lZWRzSHRtbEZuLnZhbHVlKG9wdCksXG4gICAgICAgICAgbGFiZWw6IGdldE9wdGlvbkxhYmVsLnZhbHVlKG9wdCksXG4gICAgICAgICAgc2VsZWN0ZWQ6IGl0ZW1Qcm9wcy5hY3RpdmUsXG4gICAgICAgICAgZm9jdXNlZDogaXRlbVByb3BzLmZvY3VzZWQsXG4gICAgICAgICAgdG9nZ2xlT3B0aW9uLFxuICAgICAgICAgIHNldE9wdGlvbkluZGV4LFxuICAgICAgICAgIGl0ZW1Qcm9wc1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG5cbiAgICBjb25zdCBkcm9wZG93bkFycm93SWNvbiA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLmRyb3Bkb3duSWNvbiAhPT0gdm9pZCAwXG4gICAgICAgID8gcHJvcHMuZHJvcGRvd25JY29uXG4gICAgICAgIDogJHEuaWNvblNldC5hcnJvdy5kcm9wZG93blxuICAgICkpXG5cbiAgICBjb25zdCBzcXVhcmVkTWVudSA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5vcHRpb25zQ292ZXIgPT09IGZhbHNlXG4gICAgICAmJiBwcm9wcy5vdXRsaW5lZCAhPT0gdHJ1ZVxuICAgICAgJiYgcHJvcHMuc3RhbmRvdXQgIT09IHRydWVcbiAgICAgICYmIHByb3BzLmJvcmRlcmxlc3MgIT09IHRydWVcbiAgICAgICYmIHByb3BzLnJvdW5kZWQgIT09IHRydWVcbiAgICApXG5cbiAgICBjb25zdCBjb21wdXRlZE9wdGlvbnNTZWxlY3RlZENsYXNzID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMub3B0aW9uc1NlbGVjdGVkQ2xhc3MgIT09IHZvaWQgMFxuICAgICAgICA/IHByb3BzLm9wdGlvbnNTZWxlY3RlZENsYXNzXG4gICAgICAgIDogKHByb3BzLmNvbG9yICE9PSB2b2lkIDAgPyBgdGV4dC0keyBwcm9wcy5jb2xvciB9YCA6ICcnKVxuICAgICkpXG5cbiAgICAvLyByZXR1cm5zIG1ldGhvZCB0byBnZXQgdmFsdWUgb2YgYW4gb3B0aW9uO1xuICAgIC8vIHRha2VzIGludG8gYWNjb3VudCAnb3B0aW9uLXZhbHVlJyBwcm9wXG4gICAgY29uc3QgZ2V0T3B0aW9uVmFsdWUgPSBjb21wdXRlZCgoKSA9PiBnZXRQcm9wVmFsdWVGbihwcm9wcy5vcHRpb25WYWx1ZSwgJ3ZhbHVlJykpXG5cbiAgICAvLyByZXR1cm5zIG1ldGhvZCB0byBnZXQgbGFiZWwgb2YgYW4gb3B0aW9uO1xuICAgIC8vIHRha2VzIGludG8gYWNjb3VudCAnb3B0aW9uLWxhYmVsJyBwcm9wXG4gICAgY29uc3QgZ2V0T3B0aW9uTGFiZWwgPSBjb21wdXRlZCgoKSA9PiBnZXRQcm9wVmFsdWVGbihwcm9wcy5vcHRpb25MYWJlbCwgJ2xhYmVsJykpXG5cbiAgICAvLyByZXR1cm5zIG1ldGhvZCB0byB0ZWxsIGlmIGFuIG9wdGlvbiBpcyBkaXNhYmxlZDtcbiAgICAvLyB0YWtlcyBpbnRvIGFjY291bnQgJ29wdGlvbi1kaXNhYmxlJyBwcm9wXG4gICAgY29uc3QgaXNPcHRpb25EaXNhYmxlZCA9IGNvbXB1dGVkKCgpID0+IGdldFByb3BWYWx1ZUZuKHByb3BzLm9wdGlvbkRpc2FibGUsICdkaXNhYmxlJykpXG5cbiAgICBjb25zdCBpbm5lck9wdGlvbnNWYWx1ZSA9IGNvbXB1dGVkKCgpID0+IGlubmVyVmFsdWUudmFsdWUubWFwKGdldE9wdGlvblZhbHVlLnZhbHVlKSlcblxuICAgIGNvbnN0IGlucHV0Q29udHJvbEV2ZW50cyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGV2dCA9IHtcbiAgICAgICAgb25JbnB1dCxcbiAgICAgICAgLy8gU2FmYXJpIDwgMTAuMiAmIFVJV2ViVmlldyBkb2Vzbid0IGZpcmUgY29tcG9zaXRpb25lbmQgd2hlblxuICAgICAgICAvLyBzd2l0Y2hpbmcgZm9jdXMgYmVmb3JlIGNvbmZpcm1pbmcgY29tcG9zaXRpb24gY2hvaWNlXG4gICAgICAgIC8vIHRoaXMgYWxzbyBmaXhlcyB0aGUgaXNzdWUgd2hlcmUgc29tZSBicm93c2VycyBlLmcuIGlPUyBDaHJvbWVcbiAgICAgICAgLy8gZmlyZXMgXCJjaGFuZ2VcIiBpbnN0ZWFkIG9mIFwiaW5wdXRcIiBvbiBhdXRvY29tcGxldGUuXG4gICAgICAgIG9uQ2hhbmdlOiBvbkNvbXBvc2l0aW9uLFxuICAgICAgICBvbktleWRvd246IG9uVGFyZ2V0S2V5ZG93bixcbiAgICAgICAgb25LZXl1cDogb25UYXJnZXRBdXRvY29tcGxldGUsXG4gICAgICAgIG9uS2V5cHJlc3M6IG9uVGFyZ2V0S2V5cHJlc3MsXG4gICAgICAgIG9uRm9jdXM6IHNlbGVjdElucHV0VGV4dCxcbiAgICAgICAgb25DbGljayAoZSkgeyBoYXNEaWFsb2cgPT09IHRydWUgJiYgc3RvcChlKSB9XG4gICAgICB9XG5cbiAgICAgIGV2dC5vbkNvbXBvc2l0aW9uc3RhcnQgPSBldnQub25Db21wb3NpdGlvbnVwZGF0ZSA9IGV2dC5vbkNvbXBvc2l0aW9uZW5kID0gb25Db21wb3NpdGlvblxuXG4gICAgICByZXR1cm4gZXZ0XG4gICAgfSlcblxuICAgIHdhdGNoKGlubmVyVmFsdWUsIHZhbCA9PiB7XG4gICAgICBpbm5lclZhbHVlQ2FjaGUgPSB2YWxcblxuICAgICAgaWYgKFxuICAgICAgICBwcm9wcy51c2VJbnB1dCA9PT0gdHJ1ZVxuICAgICAgICAmJiBwcm9wcy5maWxsSW5wdXQgPT09IHRydWVcbiAgICAgICAgJiYgcHJvcHMubXVsdGlwbGUgIT09IHRydWVcbiAgICAgICAgLy8gUHJldmVudCByZS1lbnRlcmluZyBpbiBmaWx0ZXIgd2hpbGUgZmlsdGVyaW5nXG4gICAgICAgIC8vIEFsc28gcHJldmVudCBjbGVhcmluZyBpbnB1dFZhbHVlIHdoaWxlIGZpbHRlcmluZ1xuICAgICAgICAmJiBzdGF0ZS5pbm5lckxvYWRpbmcudmFsdWUgIT09IHRydWVcbiAgICAgICAgJiYgKChkaWFsb2cudmFsdWUgIT09IHRydWUgJiYgbWVudS52YWx1ZSAhPT0gdHJ1ZSkgfHwgaGFzVmFsdWUudmFsdWUgIT09IHRydWUpXG4gICAgICApIHtcbiAgICAgICAgdXNlcklucHV0VmFsdWUgIT09IHRydWUgJiYgcmVzZXRJbnB1dFZhbHVlKClcbiAgICAgICAgaWYgKGRpYWxvZy52YWx1ZSA9PT0gdHJ1ZSB8fCBtZW51LnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgZmlsdGVyKCcnKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgeyBpbW1lZGlhdGU6IHRydWUgfSlcblxuICAgIHdhdGNoKCgpID0+IHByb3BzLmZpbGxJbnB1dCwgcmVzZXRJbnB1dFZhbHVlKVxuXG4gICAgd2F0Y2gobWVudSwgdXBkYXRlTWVudSlcblxuICAgIHdhdGNoKHZpcnR1YWxTY3JvbGxMZW5ndGgsIHJlcmVuZGVyTWVudSlcblxuICAgIGZ1bmN0aW9uIGdldEVtaXR0aW5nT3B0aW9uVmFsdWUgKG9wdCkge1xuICAgICAgcmV0dXJuIHByb3BzLmVtaXRWYWx1ZSA9PT0gdHJ1ZVxuICAgICAgICA/IGdldE9wdGlvblZhbHVlLnZhbHVlKG9wdClcbiAgICAgICAgOiBvcHRcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVBdEluZGV4IChpbmRleCkge1xuICAgICAgaWYgKGluZGV4ICE9PSAtMSAmJiBpbmRleCA8IGlubmVyVmFsdWUudmFsdWUubGVuZ3RoKSB7XG4gICAgICAgIGlmIChwcm9wcy5tdWx0aXBsZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNvbnN0IG1vZGVsID0gcHJvcHMubW9kZWxWYWx1ZS5zbGljZSgpXG4gICAgICAgICAgZW1pdCgncmVtb3ZlJywgeyBpbmRleCwgdmFsdWU6IG1vZGVsLnNwbGljZShpbmRleCwgMSlbIDAgXSB9KVxuICAgICAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgbW9kZWwpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBudWxsKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlQXRJbmRleEFuZEZvY3VzIChpbmRleCkge1xuICAgICAgcmVtb3ZlQXRJbmRleChpbmRleClcbiAgICAgIHN0YXRlLmZvY3VzKClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGQgKG9wdCwgdW5pcXVlKSB7XG4gICAgICBjb25zdCB2YWwgPSBnZXRFbWl0dGluZ09wdGlvblZhbHVlKG9wdClcblxuICAgICAgaWYgKHByb3BzLm11bHRpcGxlICE9PSB0cnVlKSB7XG4gICAgICAgIHByb3BzLmZpbGxJbnB1dCA9PT0gdHJ1ZSAmJiB1cGRhdGVJbnB1dFZhbHVlKFxuICAgICAgICAgIGdldE9wdGlvbkxhYmVsLnZhbHVlKG9wdCksXG4gICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICB0cnVlXG4gICAgICAgIClcblxuICAgICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIHZhbClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChpbm5lclZhbHVlLnZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBlbWl0KCdhZGQnLCB7IGluZGV4OiAwLCB2YWx1ZTogdmFsIH0pXG4gICAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgcHJvcHMubXVsdGlwbGUgPT09IHRydWUgPyBbIHZhbCBdIDogdmFsKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICB1bmlxdWUgPT09IHRydWVcbiAgICAgICAgJiYgaXNPcHRpb25TZWxlY3RlZChvcHQpID09PSB0cnVlXG4gICAgICApIHJldHVyblxuXG4gICAgICBpZiAoXG4gICAgICAgIHByb3BzLm1heFZhbHVlcyAhPT0gdm9pZCAwXG4gICAgICAgICYmIHByb3BzLm1vZGVsVmFsdWUubGVuZ3RoID49IHByb3BzLm1heFZhbHVlc1xuICAgICAgKSByZXR1cm5cblxuICAgICAgY29uc3QgbW9kZWwgPSBwcm9wcy5tb2RlbFZhbHVlLnNsaWNlKClcblxuICAgICAgZW1pdCgnYWRkJywgeyBpbmRleDogbW9kZWwubGVuZ3RoLCB2YWx1ZTogdmFsIH0pXG4gICAgICBtb2RlbC5wdXNoKHZhbClcbiAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgbW9kZWwpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9nZ2xlT3B0aW9uIChvcHQsIGtlZXBPcGVuKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHN0YXRlLmVkaXRhYmxlLnZhbHVlICE9PSB0cnVlXG4gICAgICAgIHx8IG9wdCA9PT0gdm9pZCAwXG4gICAgICAgIHx8IGlzT3B0aW9uRGlzYWJsZWQudmFsdWUob3B0KSA9PT0gdHJ1ZVxuICAgICAgKSByZXR1cm5cblxuICAgICAgY29uc3Qgb3B0VmFsdWUgPSBnZXRPcHRpb25WYWx1ZS52YWx1ZShvcHQpXG5cbiAgICAgIGlmIChwcm9wcy5tdWx0aXBsZSAhPT0gdHJ1ZSkge1xuICAgICAgICBpZiAoa2VlcE9wZW4gIT09IHRydWUpIHtcbiAgICAgICAgICB1cGRhdGVJbnB1dFZhbHVlKFxuICAgICAgICAgICAgcHJvcHMuZmlsbElucHV0ID09PSB0cnVlID8gZ2V0T3B0aW9uTGFiZWwudmFsdWUob3B0KSA6ICcnLFxuICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICAgIHRydWVcbiAgICAgICAgICApXG5cbiAgICAgICAgICBoaWRlUG9wdXAoKVxuICAgICAgICB9XG5cbiAgICAgICAgdGFyZ2V0UmVmLnZhbHVlPy5mb2N1cygpXG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIGlubmVyVmFsdWUudmFsdWUubGVuZ3RoID09PSAwXG4gICAgICAgICAgfHwgaXNEZWVwRXF1YWwoZ2V0T3B0aW9uVmFsdWUudmFsdWUoaW5uZXJWYWx1ZS52YWx1ZVsgMCBdKSwgb3B0VmFsdWUpICE9PSB0cnVlXG4gICAgICAgICkge1xuICAgICAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgcHJvcHMuZW1pdFZhbHVlID09PSB0cnVlID8gb3B0VmFsdWUgOiBvcHQpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKGhhc0RpYWxvZyAhPT0gdHJ1ZSB8fCBkaWFsb2dGaWVsZEZvY3VzZWQudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgc3RhdGUuZm9jdXMoKVxuICAgICAgfVxuXG4gICAgICBzZWxlY3RJbnB1dFRleHQoKVxuXG4gICAgICBpZiAoaW5uZXJWYWx1ZS52YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgY29uc3QgdmFsID0gcHJvcHMuZW1pdFZhbHVlID09PSB0cnVlID8gb3B0VmFsdWUgOiBvcHRcbiAgICAgICAgZW1pdCgnYWRkJywgeyBpbmRleDogMCwgdmFsdWU6IHZhbCB9KVxuICAgICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIHByb3BzLm11bHRpcGxlID09PSB0cnVlID8gWyB2YWwgXSA6IHZhbClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0XG4gICAgICAgIG1vZGVsID0gcHJvcHMubW9kZWxWYWx1ZS5zbGljZSgpLFxuICAgICAgICBpbmRleCA9IGlubmVyT3B0aW9uc1ZhbHVlLnZhbHVlLmZpbmRJbmRleCh2ID0+IGlzRGVlcEVxdWFsKHYsIG9wdFZhbHVlKSlcblxuICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICBlbWl0KCdyZW1vdmUnLCB7IGluZGV4LCB2YWx1ZTogbW9kZWwuc3BsaWNlKGluZGV4LCAxKVsgMCBdIH0pXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHByb3BzLm1heFZhbHVlcyAhPT0gdm9pZCAwXG4gICAgICAgICAgJiYgbW9kZWwubGVuZ3RoID49IHByb3BzLm1heFZhbHVlc1xuICAgICAgICApIHJldHVyblxuXG4gICAgICAgIGNvbnN0IHZhbCA9IHByb3BzLmVtaXRWYWx1ZSA9PT0gdHJ1ZSA/IG9wdFZhbHVlIDogb3B0XG5cbiAgICAgICAgZW1pdCgnYWRkJywgeyBpbmRleDogbW9kZWwubGVuZ3RoLCB2YWx1ZTogdmFsIH0pXG4gICAgICAgIG1vZGVsLnB1c2godmFsKVxuICAgICAgfVxuXG4gICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIG1vZGVsKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldE9wdGlvbkluZGV4IChpbmRleCkge1xuICAgICAgaWYgKCRxLnBsYXRmb3JtLmlzLmRlc2t0b3AgIT09IHRydWUpIHJldHVyblxuXG4gICAgICBjb25zdCB2YWwgPSBpbmRleCAhPT0gLTEgJiYgaW5kZXggPCB2aXJ0dWFsU2Nyb2xsTGVuZ3RoLnZhbHVlXG4gICAgICAgID8gaW5kZXhcbiAgICAgICAgOiAtMVxuXG4gICAgICBpZiAob3B0aW9uSW5kZXgudmFsdWUgIT09IHZhbCkge1xuICAgICAgICBvcHRpb25JbmRleC52YWx1ZSA9IHZhbFxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vdmVPcHRpb25TZWxlY3Rpb24gKG9mZnNldCA9IDEsIHNraXBJbnB1dFZhbHVlKSB7XG4gICAgICBpZiAobWVudS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBsZXQgaW5kZXggPSBvcHRpb25JbmRleC52YWx1ZVxuICAgICAgICBkbyB7XG4gICAgICAgICAgaW5kZXggPSBub3JtYWxpemVUb0ludGVydmFsKFxuICAgICAgICAgICAgaW5kZXggKyBvZmZzZXQsXG4gICAgICAgICAgICAtMSxcbiAgICAgICAgICAgIHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWUgLSAxXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICAgIHdoaWxlIChpbmRleCAhPT0gLTEgJiYgaW5kZXggIT09IG9wdGlvbkluZGV4LnZhbHVlICYmIGlzT3B0aW9uRGlzYWJsZWQudmFsdWUocHJvcHMub3B0aW9uc1sgaW5kZXggXSkgPT09IHRydWUpXG5cbiAgICAgICAgaWYgKG9wdGlvbkluZGV4LnZhbHVlICE9PSBpbmRleCkge1xuICAgICAgICAgIHNldE9wdGlvbkluZGV4KGluZGV4KVxuICAgICAgICAgIHNjcm9sbFRvKGluZGV4KVxuXG4gICAgICAgICAgaWYgKHNraXBJbnB1dFZhbHVlICE9PSB0cnVlICYmIHByb3BzLnVzZUlucHV0ID09PSB0cnVlICYmIHByb3BzLmZpbGxJbnB1dCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgc2V0SW5wdXRWYWx1ZShcbiAgICAgICAgICAgICAgaW5kZXggPj0gMFxuICAgICAgICAgICAgICAgID8gZ2V0T3B0aW9uTGFiZWwudmFsdWUocHJvcHMub3B0aW9uc1sgaW5kZXggXSlcbiAgICAgICAgICAgICAgICA6IGRlZmF1bHRJbnB1dFZhbHVlLFxuICAgICAgICAgICAgICB0cnVlXG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0T3B0aW9uICh2YWx1ZSwgdmFsdWVDYWNoZSkge1xuICAgICAgY29uc3QgZm4gPSBvcHQgPT4gaXNEZWVwRXF1YWwoZ2V0T3B0aW9uVmFsdWUudmFsdWUob3B0KSwgdmFsdWUpXG4gICAgICByZXR1cm4gcHJvcHMub3B0aW9ucy5maW5kKGZuKSB8fCB2YWx1ZUNhY2hlLmZpbmQoZm4pIHx8IHZhbHVlXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNPcHRpb25TZWxlY3RlZCAob3B0KSB7XG4gICAgICBjb25zdCB2YWwgPSBnZXRPcHRpb25WYWx1ZS52YWx1ZShvcHQpXG4gICAgICByZXR1cm4gaW5uZXJPcHRpb25zVmFsdWUudmFsdWUuZmluZCh2ID0+IGlzRGVlcEVxdWFsKHYsIHZhbCkpICE9PSB2b2lkIDBcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZWxlY3RJbnB1dFRleHQgKGUpIHtcbiAgICAgIGlmIChcbiAgICAgICAgcHJvcHMudXNlSW5wdXQgPT09IHRydWVcbiAgICAgICAgJiYgdGFyZ2V0UmVmLnZhbHVlICE9PSBudWxsXG4gICAgICAgICYmIChlID09PSB2b2lkIDAgfHwgKHRhcmdldFJlZi52YWx1ZSA9PT0gZS50YXJnZXQgJiYgZS50YXJnZXQudmFsdWUgPT09IHNlbGVjdGVkU3RyaW5nLnZhbHVlKSlcbiAgICAgICkge1xuICAgICAgICB0YXJnZXRSZWYudmFsdWUuc2VsZWN0KClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblRhcmdldEtleXVwIChlKSB7XG4gICAgICAvLyBpZiBFU0MgYW5kIHdlIGhhdmUgYW4gb3BlbmVkIG1lbnVcbiAgICAgIC8vIHRoZW4gc3RvcCBwcm9wYWdhdGlvbiAobWlnaHQgYmUgY2F1Z2h0IGJ5IGEgUURpYWxvZ1xuICAgICAgLy8gYW5kIHNvIGl0IHdpbGwgYWxzbyBjbG9zZSB0aGUgUURpYWxvZywgd2hpY2ggaXMgd3JvbmcpXG4gICAgICBpZiAoaXNLZXlDb2RlKGUsIDI3KSA9PT0gdHJ1ZSAmJiBtZW51LnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIHN0b3AoZSlcbiAgICAgICAgLy8gb24gRVNDIHdlIG5lZWQgdG8gY2xvc2UgdGhlIGRpYWxvZyBhbHNvXG4gICAgICAgIGhpZGVQb3B1cCgpXG4gICAgICAgIHJlc2V0SW5wdXRWYWx1ZSgpXG4gICAgICB9XG5cbiAgICAgIGVtaXQoJ2tleXVwJywgZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblRhcmdldEF1dG9jb21wbGV0ZSAoZSkge1xuICAgICAgY29uc3QgeyB2YWx1ZSB9ID0gZS50YXJnZXRcblxuICAgICAgaWYgKGUua2V5Q29kZSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIG9uVGFyZ2V0S2V5dXAoZSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGUudGFyZ2V0LnZhbHVlID0gJydcblxuICAgICAgaWYgKGZpbHRlclRpbWVyICE9PSBudWxsKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChmaWx0ZXJUaW1lcilcbiAgICAgICAgZmlsdGVyVGltZXIgPSBudWxsXG4gICAgICB9XG4gICAgICBpZiAoaW5wdXRWYWx1ZVRpbWVyICE9PSBudWxsKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChpbnB1dFZhbHVlVGltZXIpXG4gICAgICAgIGlucHV0VmFsdWVUaW1lciA9IG51bGxcbiAgICAgIH1cblxuICAgICAgcmVzZXRJbnB1dFZhbHVlKClcblxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIGNvbnN0IG5lZWRsZSA9IHZhbHVlLnRvTG9jYWxlTG93ZXJDYXNlKClcbiAgICAgICAgY29uc3QgZmluZEZuID0gZXh0cmFjdEZuID0+IHtcbiAgICAgICAgICBjb25zdCBvcHRpb24gPSBwcm9wcy5vcHRpb25zLmZpbmQob3B0ID0+IFN0cmluZyhleHRyYWN0Rm4udmFsdWUob3B0KSkudG9Mb2NhbGVMb3dlckNhc2UoKSA9PT0gbmVlZGxlKVxuXG4gICAgICAgICAgaWYgKG9wdGlvbiA9PT0gdm9pZCAwKSByZXR1cm4gZmFsc2VcblxuICAgICAgICAgIGlmIChpbm5lclZhbHVlLnZhbHVlLmluZGV4T2Yob3B0aW9uKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRvZ2dsZU9wdGlvbihvcHRpb24pXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaGlkZVBvcHVwKClcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZpbGxGbiA9IGFmdGVyRmlsdGVyID0+IHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBmaW5kRm4oZ2V0T3B0aW9uVmFsdWUpICE9PSB0cnVlXG4gICAgICAgICAgICAmJiBhZnRlckZpbHRlciAhPT0gdHJ1ZVxuICAgICAgICAgICAgJiYgZmluZEZuKGdldE9wdGlvbkxhYmVsKSAhPT0gdHJ1ZVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgZmlsdGVyKHZhbHVlLCB0cnVlLCAoKSA9PiBmaWxsRm4odHJ1ZSkpXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZmlsbEZuKClcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBzdGF0ZS5jbGVhclZhbHVlKGUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25UYXJnZXRLZXlwcmVzcyAoZSkge1xuICAgICAgZW1pdCgna2V5cHJlc3MnLCBlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uVGFyZ2V0S2V5ZG93biAoZSkge1xuICAgICAgZW1pdCgna2V5ZG93bicsIGUpXG5cbiAgICAgIGlmIChzaG91bGRJZ25vcmVLZXkoZSkgPT09IHRydWUpIHJldHVyblxuXG4gICAgICBjb25zdCBuZXdWYWx1ZU1vZGVWYWxpZCA9IGlucHV0VmFsdWUudmFsdWUubGVuZ3RoICE9PSAwXG4gICAgICAgICYmIChwcm9wcy5uZXdWYWx1ZU1vZGUgIT09IHZvaWQgMCB8fCBwcm9wcy5vbk5ld1ZhbHVlICE9PSB2b2lkIDApXG5cbiAgICAgIGNvbnN0IHRhYlNob3VsZFNlbGVjdCA9IGUuc2hpZnRLZXkgIT09IHRydWVcbiAgICAgICAgJiYgcHJvcHMuZGlzYWJsZVRhYlNlbGVjdGlvbiAhPT0gdHJ1ZVxuICAgICAgICAmJiBwcm9wcy5tdWx0aXBsZSAhPT0gdHJ1ZVxuICAgICAgICAmJiAob3B0aW9uSW5kZXgudmFsdWUgIT09IC0xIHx8IG5ld1ZhbHVlTW9kZVZhbGlkID09PSB0cnVlKVxuXG4gICAgICAvLyBlc2NhcGVcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IDI3KSB7XG4gICAgICAgIHByZXZlbnQoZSkgLy8gcHJldmVudCBjbGVhcmluZyB0aGUgaW5wdXRWYWx1ZVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgLy8gdGFiXG4gICAgICBpZiAoZS5rZXlDb2RlID09PSA5ICYmIHRhYlNob3VsZFNlbGVjdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgY2xvc2VNZW51KClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgZS50YXJnZXQgPT09IHZvaWQgMFxuICAgICAgICB8fCBlLnRhcmdldC5pZCAhPT0gc3RhdGUudGFyZ2V0VWlkLnZhbHVlXG4gICAgICAgIHx8IHN0YXRlLmVkaXRhYmxlLnZhbHVlICE9PSB0cnVlXG4gICAgICApIHJldHVyblxuXG4gICAgICAvLyBkb3duXG4gICAgICBpZiAoXG4gICAgICAgIGUua2V5Q29kZSA9PT0gNDBcbiAgICAgICAgJiYgc3RhdGUuaW5uZXJMb2FkaW5nLnZhbHVlICE9PSB0cnVlXG4gICAgICAgICYmIG1lbnUudmFsdWUgPT09IGZhbHNlXG4gICAgICApIHtcbiAgICAgICAgc3RvcEFuZFByZXZlbnQoZSlcbiAgICAgICAgc2hvd1BvcHVwKClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIC8vIGJhY2tzcGFjZVxuICAgICAgaWYgKFxuICAgICAgICBlLmtleUNvZGUgPT09IDhcbiAgICAgICAgJiYgKFxuICAgICAgICAgIHByb3BzLnVzZUNoaXBzID09PSB0cnVlXG4gICAgICAgICAgfHwgcHJvcHMuY2xlYXJhYmxlID09PSB0cnVlXG4gICAgICAgIClcbiAgICAgICAgJiYgcHJvcHMuaGlkZVNlbGVjdGVkICE9PSB0cnVlXG4gICAgICAgICYmIGlucHV0VmFsdWUudmFsdWUubGVuZ3RoID09PSAwXG4gICAgICApIHtcbiAgICAgICAgaWYgKHByb3BzLm11bHRpcGxlID09PSB0cnVlICYmIEFycmF5LmlzQXJyYXkocHJvcHMubW9kZWxWYWx1ZSkgPT09IHRydWUpIHtcbiAgICAgICAgICByZW1vdmVBdEluZGV4KHByb3BzLm1vZGVsVmFsdWUubGVuZ3RoIC0gMSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChwcm9wcy5tdWx0aXBsZSAhPT0gdHJ1ZSAmJiBwcm9wcy5tb2RlbFZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBudWxsKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIC8vIGhvbWUsIGVuZCAtIDM2LCAzNVxuICAgICAgaWYgKFxuICAgICAgICAoZS5rZXlDb2RlID09PSAzNSB8fCBlLmtleUNvZGUgPT09IDM2KVxuICAgICAgICAmJiAodHlwZW9mIGlucHV0VmFsdWUudmFsdWUgIT09ICdzdHJpbmcnIHx8IGlucHV0VmFsdWUudmFsdWUubGVuZ3RoID09PSAwKVxuICAgICAgKSB7XG4gICAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgICAgIG9wdGlvbkluZGV4LnZhbHVlID0gLTFcbiAgICAgICAgbW92ZU9wdGlvblNlbGVjdGlvbihlLmtleUNvZGUgPT09IDM2ID8gMSA6IC0xLCBwcm9wcy5tdWx0aXBsZSlcbiAgICAgIH1cblxuICAgICAgLy8gcGcgdXAsIHBnIGRvd24gLSAzMywgMzRcbiAgICAgIGlmIChcbiAgICAgICAgKGUua2V5Q29kZSA9PT0gMzMgfHwgZS5rZXlDb2RlID09PSAzNClcbiAgICAgICAgJiYgdmlydHVhbFNjcm9sbFNsaWNlU2l6ZUNvbXB1dGVkLnZhbHVlICE9PSB2b2lkIDBcbiAgICAgICkge1xuICAgICAgICBzdG9wQW5kUHJldmVudChlKVxuICAgICAgICBvcHRpb25JbmRleC52YWx1ZSA9IE1hdGgubWF4KFxuICAgICAgICAgIC0xLFxuICAgICAgICAgIE1hdGgubWluKFxuICAgICAgICAgICAgdmlydHVhbFNjcm9sbExlbmd0aC52YWx1ZSxcbiAgICAgICAgICAgIG9wdGlvbkluZGV4LnZhbHVlICsgKGUua2V5Q29kZSA9PT0gMzMgPyAtMSA6IDEpICogdmlydHVhbFNjcm9sbFNsaWNlU2l6ZUNvbXB1dGVkLnZhbHVlLnZpZXdcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICAgbW92ZU9wdGlvblNlbGVjdGlvbihlLmtleUNvZGUgPT09IDMzID8gMSA6IC0xLCBwcm9wcy5tdWx0aXBsZSlcbiAgICAgIH1cblxuICAgICAgLy8gdXAsIGRvd25cbiAgICAgIGlmIChlLmtleUNvZGUgPT09IDM4IHx8IGUua2V5Q29kZSA9PT0gNDApIHtcbiAgICAgICAgc3RvcEFuZFByZXZlbnQoZSlcbiAgICAgICAgbW92ZU9wdGlvblNlbGVjdGlvbihlLmtleUNvZGUgPT09IDM4ID8gLTEgOiAxLCBwcm9wcy5tdWx0aXBsZSlcbiAgICAgIH1cblxuICAgICAgY29uc3Qgb3B0aW9uc0xlbmd0aCA9IHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWVcblxuICAgICAgLy8gY2xlYXIgc2VhcmNoIGJ1ZmZlciBpZiBleHBpcmVkXG4gICAgICBpZiAoc2VhcmNoQnVmZmVyID09PSB2b2lkIDAgfHwgc2VhcmNoQnVmZmVyRXhwIDwgRGF0ZS5ub3coKSkge1xuICAgICAgICBzZWFyY2hCdWZmZXIgPSAnJ1xuICAgICAgfVxuXG4gICAgICAvLyBrZXlib2FyZCBzZWFyY2ggd2hlbiBub3QgaGF2aW5nIHVzZS1pbnB1dFxuICAgICAgaWYgKFxuICAgICAgICBvcHRpb25zTGVuZ3RoID4gMFxuICAgICAgICAmJiBwcm9wcy51c2VJbnB1dCAhPT0gdHJ1ZVxuICAgICAgICAmJiBlLmtleSAhPT0gdm9pZCAwXG4gICAgICAgICYmIGUua2V5Lmxlbmd0aCA9PT0gMSAvLyBwcmludGFibGUgY2hhclxuICAgICAgICAmJiBlLmFsdEtleSA9PT0gZmFsc2UgLy8gbm90IGtiZCBzaG9ydGN1dFxuICAgICAgICAmJiBlLmN0cmxLZXkgPT09IGZhbHNlIC8vIG5vdCBrYmQgc2hvcnRjdXRcbiAgICAgICAgJiYgZS5tZXRhS2V5ID09PSBmYWxzZSAvLyBub3Qga2JkIHNob3J0Y3V0LCBlc3BlY2lhbGx5IG9uIG1hY09TIHdpdGggQ29tbWFuZCBrZXlcbiAgICAgICAgJiYgKGUua2V5Q29kZSAhPT0gMzIgfHwgc2VhcmNoQnVmZmVyLmxlbmd0aCAhPT0gMCkgLy8gc3BhY2UgaW4gbWlkZGxlIG9mIHNlYXJjaFxuICAgICAgKSB7XG4gICAgICAgIG1lbnUudmFsdWUgIT09IHRydWUgJiYgc2hvd1BvcHVwKGUpXG5cbiAgICAgICAgY29uc3RcbiAgICAgICAgICBjaGFyID0gZS5rZXkudG9Mb2NhbGVMb3dlckNhc2UoKSxcbiAgICAgICAgICBrZXlSZXBlYXQgPSBzZWFyY2hCdWZmZXIubGVuZ3RoID09PSAxICYmIHNlYXJjaEJ1ZmZlclsgMCBdID09PSBjaGFyXG5cbiAgICAgICAgc2VhcmNoQnVmZmVyRXhwID0gRGF0ZS5ub3coKSArIDE1MDBcbiAgICAgICAgaWYgKGtleVJlcGVhdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBzdG9wQW5kUHJldmVudChlKVxuICAgICAgICAgIHNlYXJjaEJ1ZmZlciArPSBjaGFyXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzZWFyY2hSZSA9IG5ldyBSZWdFeHAoJ14nICsgc2VhcmNoQnVmZmVyLnNwbGl0KCcnKS5tYXAobCA9PiAocmVFc2NhcGVMaXN0LmluZGV4T2YobCkgIT09IC0xID8gJ1xcXFwnICsgbCA6IGwpKS5qb2luKCcuKicpLCAnaScpXG5cbiAgICAgICAgbGV0IGluZGV4ID0gb3B0aW9uSW5kZXgudmFsdWVcblxuICAgICAgICBpZiAoa2V5UmVwZWF0ID09PSB0cnVlIHx8IGluZGV4IDwgMCB8fCBzZWFyY2hSZS50ZXN0KGdldE9wdGlvbkxhYmVsLnZhbHVlKHByb3BzLm9wdGlvbnNbIGluZGV4IF0pKSAhPT0gdHJ1ZSkge1xuICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgIGluZGV4ID0gbm9ybWFsaXplVG9JbnRlcnZhbChpbmRleCArIDEsIC0xLCBvcHRpb25zTGVuZ3RoIC0gMSlcbiAgICAgICAgICB9XG4gICAgICAgICAgd2hpbGUgKGluZGV4ICE9PSBvcHRpb25JbmRleC52YWx1ZSAmJiAoXG4gICAgICAgICAgICBpc09wdGlvbkRpc2FibGVkLnZhbHVlKHByb3BzLm9wdGlvbnNbIGluZGV4IF0pID09PSB0cnVlXG4gICAgICAgICAgICB8fCBzZWFyY2hSZS50ZXN0KGdldE9wdGlvbkxhYmVsLnZhbHVlKHByb3BzLm9wdGlvbnNbIGluZGV4IF0pKSAhPT0gdHJ1ZVxuICAgICAgICAgICkpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3B0aW9uSW5kZXgudmFsdWUgIT09IGluZGV4KSB7XG4gICAgICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgICAgc2V0T3B0aW9uSW5kZXgoaW5kZXgpXG4gICAgICAgICAgICBzY3JvbGxUbyhpbmRleClcblxuICAgICAgICAgICAgaWYgKGluZGV4ID49IDAgJiYgcHJvcHMudXNlSW5wdXQgPT09IHRydWUgJiYgcHJvcHMuZmlsbElucHV0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgIHNldElucHV0VmFsdWUoZ2V0T3B0aW9uTGFiZWwudmFsdWUocHJvcHMub3B0aW9uc1sgaW5kZXggXSksIHRydWUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICAvLyBlbnRlciwgc3BhY2UgKHdoZW4gbm90IHVzaW5nIHVzZS1pbnB1dCBhbmQgbm90IGluIHNlYXJjaCksIG9yIHRhYiAod2hlbiBub3QgdXNpbmcgbXVsdGlwbGUgYW5kIG9wdGlvbiBzZWxlY3RlZClcbiAgICAgIC8vIHNhbWUgdGFyZ2V0IGlzIGNoZWNrZWQgYWJvdmVcbiAgICAgIGlmIChcbiAgICAgICAgZS5rZXlDb2RlICE9PSAxM1xuICAgICAgICAmJiAoZS5rZXlDb2RlICE9PSAzMiB8fCBwcm9wcy51c2VJbnB1dCA9PT0gdHJ1ZSB8fCBzZWFyY2hCdWZmZXIgIT09ICcnKVxuICAgICAgICAmJiAoZS5rZXlDb2RlICE9PSA5IHx8IHRhYlNob3VsZFNlbGVjdCA9PT0gZmFsc2UpXG4gICAgICApIHJldHVyblxuXG4gICAgICBlLmtleUNvZGUgIT09IDkgJiYgc3RvcEFuZFByZXZlbnQoZSlcblxuICAgICAgaWYgKG9wdGlvbkluZGV4LnZhbHVlICE9PSAtMSAmJiBvcHRpb25JbmRleC52YWx1ZSA8IG9wdGlvbnNMZW5ndGgpIHtcbiAgICAgICAgdG9nZ2xlT3B0aW9uKHByb3BzLm9wdGlvbnNbIG9wdGlvbkluZGV4LnZhbHVlIF0pXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAobmV3VmFsdWVNb2RlVmFsaWQgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgZG9uZSA9ICh2YWwsIG1vZGUpID0+IHtcbiAgICAgICAgICBpZiAobW9kZSkge1xuICAgICAgICAgICAgaWYgKHZhbGlkYXRlTmV3VmFsdWVNb2RlKG1vZGUpICE9PSB0cnVlKSByZXR1cm5cbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBtb2RlID0gcHJvcHMubmV3VmFsdWVNb2RlXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdXBkYXRlSW5wdXRWYWx1ZSgnJywgcHJvcHMubXVsdGlwbGUgIT09IHRydWUsIHRydWUpXG5cbiAgICAgICAgICBpZiAodmFsID09PSB2b2lkIDAgfHwgdmFsID09PSBudWxsKSByZXR1cm5cblxuICAgICAgICAgIGNvbnN0IGZuID0gbW9kZSA9PT0gJ3RvZ2dsZScgPyB0b2dnbGVPcHRpb24gOiBhZGRcbiAgICAgICAgICBmbih2YWwsIG1vZGUgPT09ICdhZGQtdW5pcXVlJylcblxuICAgICAgICAgIGlmIChwcm9wcy5tdWx0aXBsZSAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGFyZ2V0UmVmLnZhbHVlPy5mb2N1cygpXG4gICAgICAgICAgICBoaWRlUG9wdXAoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9wcy5vbk5ld1ZhbHVlICE9PSB2b2lkIDApIHtcbiAgICAgICAgICBlbWl0KCduZXdWYWx1ZScsIGlucHV0VmFsdWUudmFsdWUsIGRvbmUpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZG9uZShpbnB1dFZhbHVlLnZhbHVlKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb3BzLm11bHRpcGxlICE9PSB0cnVlKSByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKG1lbnUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgY2xvc2VNZW51KClcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHN0YXRlLmlubmVyTG9hZGluZy52YWx1ZSAhPT0gdHJ1ZSkge1xuICAgICAgICBzaG93UG9wdXAoKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFZpcnR1YWxTY3JvbGxFbCAoKSB7XG4gICAgICByZXR1cm4gaGFzRGlhbG9nID09PSB0cnVlXG4gICAgICAgID8gbWVudUNvbnRlbnRSZWYudmFsdWVcbiAgICAgICAgOiAoXG4gICAgICAgICAgICBtZW51UmVmLnZhbHVlICE9PSBudWxsICYmIG1lbnVSZWYudmFsdWUuY29udGVudEVsICE9PSBudWxsXG4gICAgICAgICAgICAgID8gbWVudVJlZi52YWx1ZS5jb250ZW50RWxcbiAgICAgICAgICAgICAgOiB2b2lkIDBcbiAgICAgICAgICApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VmlydHVhbFNjcm9sbFRhcmdldCAoKSB7XG4gICAgICByZXR1cm4gZ2V0VmlydHVhbFNjcm9sbEVsKClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRTZWxlY3Rpb24gKCkge1xuICAgICAgaWYgKHByb3BzLmhpZGVTZWxlY3RlZCA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gW11cbiAgICAgIH1cblxuICAgICAgaWYgKHNsb3RzWyAnc2VsZWN0ZWQtaXRlbScgXSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHJldHVybiBzZWxlY3RlZFNjb3BlLnZhbHVlLm1hcChzY29wZSA9PiBzbG90c1sgJ3NlbGVjdGVkLWl0ZW0nIF0oc2NvcGUpKS5zbGljZSgpXG4gICAgICB9XG5cbiAgICAgIGlmIChzbG90cy5zZWxlY3RlZCAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHJldHVybiBbXS5jb25jYXQoc2xvdHMuc2VsZWN0ZWQoKSlcbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLnVzZUNoaXBzID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBzZWxlY3RlZFNjb3BlLnZhbHVlLm1hcCgoc2NvcGUsIGkpID0+IGgoUUNoaXAsIHtcbiAgICAgICAgICBrZXk6ICdvcHRpb24tJyArIGksXG4gICAgICAgICAgcmVtb3ZhYmxlOiBzdGF0ZS5lZGl0YWJsZS52YWx1ZSA9PT0gdHJ1ZSAmJiBpc09wdGlvbkRpc2FibGVkLnZhbHVlKHNjb3BlLm9wdCkgIT09IHRydWUsXG4gICAgICAgICAgZGVuc2U6IHRydWUsXG4gICAgICAgICAgdGV4dENvbG9yOiBwcm9wcy5jb2xvcixcbiAgICAgICAgICB0YWJpbmRleDogdGFiaW5kZXgudmFsdWUsXG4gICAgICAgICAgb25SZW1vdmUgKCkgeyBzY29wZS5yZW1vdmVBdEluZGV4KGkpIH1cbiAgICAgICAgfSwgKCkgPT4gaCgnc3BhbicsIHtcbiAgICAgICAgICBjbGFzczogJ2VsbGlwc2lzJyxcbiAgICAgICAgICBbIHNjb3BlLmh0bWwgPT09IHRydWUgPyAnaW5uZXJIVE1MJyA6ICd0ZXh0Q29udGVudCcgXTogZ2V0T3B0aW9uTGFiZWwudmFsdWUoc2NvcGUub3B0KVxuICAgICAgICB9KSkpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBbXG4gICAgICAgIGgoJ3NwYW4nLCB7XG4gICAgICAgICAgY2xhc3M6ICdlbGxpcHNpcycsXG4gICAgICAgICAgWyB2YWx1ZUFzSHRtbC52YWx1ZSA9PT0gdHJ1ZSA/ICdpbm5lckhUTUwnIDogJ3RleHRDb250ZW50JyBdOiBhcmlhQ3VycmVudFZhbHVlLnZhbHVlXG4gICAgICAgIH0pXG4gICAgICBdXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0QWxsT3B0aW9ucyAoKSB7XG4gICAgICBpZiAobm9PcHRpb25zLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBzbG90c1sgJ25vLW9wdGlvbicgXSAhPT0gdm9pZCAwXG4gICAgICAgICAgPyBzbG90c1sgJ25vLW9wdGlvbicgXSh7IGlucHV0VmFsdWU6IGlucHV0VmFsdWUudmFsdWUgfSlcbiAgICAgICAgICA6IHZvaWQgMFxuICAgICAgfVxuXG4gICAgICBjb25zdCBmbiA9IHNsb3RzLm9wdGlvbiAhPT0gdm9pZCAwXG4gICAgICAgID8gc2xvdHMub3B0aW9uXG4gICAgICAgIDogc2NvcGUgPT4ge1xuICAgICAgICAgIHJldHVybiBoKFFJdGVtLCB7XG4gICAgICAgICAgICBrZXk6IHNjb3BlLmluZGV4LFxuICAgICAgICAgICAgLi4uc2NvcGUuaXRlbVByb3BzXG4gICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGgoXG4gICAgICAgICAgICAgIFFJdGVtU2VjdGlvbixcbiAgICAgICAgICAgICAgKCkgPT4gaChcbiAgICAgICAgICAgICAgICBRSXRlbUxhYmVsLFxuICAgICAgICAgICAgICAgICgpID0+IGgoJ3NwYW4nLCB7XG4gICAgICAgICAgICAgICAgICBbIHNjb3BlLmh0bWwgPT09IHRydWUgPyAnaW5uZXJIVE1MJyA6ICd0ZXh0Q29udGVudCcgXTogc2NvcGUubGFiZWxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICBsZXQgb3B0aW9ucyA9IHBhZFZpcnR1YWxTY3JvbGwoJ2RpdicsIG9wdGlvblNjb3BlLnZhbHVlLm1hcChmbikpXG5cbiAgICAgIGlmIChzbG90c1sgJ2JlZm9yZS1vcHRpb25zJyBdICE9PSB2b2lkIDApIHtcbiAgICAgICAgb3B0aW9ucyA9IHNsb3RzWyAnYmVmb3JlLW9wdGlvbnMnIF0oKS5jb25jYXQob3B0aW9ucylcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGhNZXJnZVNsb3Qoc2xvdHNbICdhZnRlci1vcHRpb25zJyBdLCBvcHRpb25zKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldElucHV0IChmcm9tRGlhbG9nLCBpc1RhcmdldCkge1xuICAgICAgY29uc3QgYXR0cnMgPSBpc1RhcmdldCA9PT0gdHJ1ZSA/IHsgLi4uY29tYm9ib3hBdHRycy52YWx1ZSwgLi4uc3RhdGUuc3BsaXRBdHRycy5hdHRyaWJ1dGVzLnZhbHVlIH0gOiB2b2lkIDBcblxuICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgcmVmOiBpc1RhcmdldCA9PT0gdHJ1ZSA/IHRhcmdldFJlZiA6IHZvaWQgMCxcbiAgICAgICAga2V5OiAnaV90JyxcbiAgICAgICAgY2xhc3M6IGNvbXB1dGVkSW5wdXRDbGFzcy52YWx1ZSxcbiAgICAgICAgc3R5bGU6IHByb3BzLmlucHV0U3R5bGUsXG4gICAgICAgIHZhbHVlOiBpbnB1dFZhbHVlLnZhbHVlICE9PSB2b2lkIDAgPyBpbnB1dFZhbHVlLnZhbHVlIDogJycsXG4gICAgICAgIC8vIHJlcXVpcmVkIGZvciBBbmRyb2lkIGluIG9yZGVyIHRvIHNob3cgRU5URVIga2V5IHdoZW4gaW4gZm9ybVxuICAgICAgICB0eXBlOiAnc2VhcmNoJyxcbiAgICAgICAgLi4uYXR0cnMsXG4gICAgICAgIGlkOiBpc1RhcmdldCA9PT0gdHJ1ZSA/IHN0YXRlLnRhcmdldFVpZC52YWx1ZSA6IHZvaWQgMCxcbiAgICAgICAgbWF4bGVuZ3RoOiBwcm9wcy5tYXhsZW5ndGgsXG4gICAgICAgIGF1dG9jb21wbGV0ZTogcHJvcHMuYXV0b2NvbXBsZXRlLFxuICAgICAgICAnZGF0YS1hdXRvZm9jdXMnOiBmcm9tRGlhbG9nID09PSB0cnVlIHx8IHByb3BzLmF1dG9mb2N1cyA9PT0gdHJ1ZSB8fCB2b2lkIDAsXG4gICAgICAgIGRpc2FibGVkOiBwcm9wcy5kaXNhYmxlID09PSB0cnVlLFxuICAgICAgICByZWFkb25seTogcHJvcHMucmVhZG9ubHkgPT09IHRydWUsXG4gICAgICAgIC4uLmlucHV0Q29udHJvbEV2ZW50cy52YWx1ZVxuICAgICAgfVxuXG4gICAgICBpZiAoZnJvbURpYWxvZyAhPT0gdHJ1ZSAmJiBoYXNEaWFsb2cgPT09IHRydWUpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YS5jbGFzcykgPT09IHRydWUpIHtcbiAgICAgICAgICBkYXRhLmNsYXNzID0gWyAuLi5kYXRhLmNsYXNzLCAnbm8tcG9pbnRlci1ldmVudHMnIF1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBkYXRhLmNsYXNzICs9ICcgbm8tcG9pbnRlci1ldmVudHMnXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGgoJ2lucHV0JywgZGF0YSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbklucHV0IChlKSB7XG4gICAgICBpZiAoZmlsdGVyVGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KGZpbHRlclRpbWVyKVxuICAgICAgICBmaWx0ZXJUaW1lciA9IG51bGxcbiAgICAgIH1cbiAgICAgIGlmIChpbnB1dFZhbHVlVGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KGlucHV0VmFsdWVUaW1lcilcbiAgICAgICAgaW5wdXRWYWx1ZVRpbWVyID0gbnVsbFxuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIGVcbiAgICAgICAgJiYgZS50YXJnZXRcbiAgICAgICAgJiYgZS50YXJnZXQucUNvbXBvc2luZyA9PT0gdHJ1ZVxuICAgICAgKSByZXR1cm5cblxuICAgICAgc2V0SW5wdXRWYWx1ZShlLnRhcmdldC52YWx1ZSB8fCAnJylcbiAgICAgIC8vIG1hcmsgaXQgaGVyZSBhcyB1c2VyIGlucHV0IHNvIHRoYXQgaWYgdXBkYXRlSW5wdXRWYWx1ZSBpcyBjYWxsZWRcbiAgICAgIC8vIGJlZm9yZSBmaWx0ZXIgaXMgY2FsbGVkIHRoZSBpbmRpY2F0b3IgaXMgcmVzZXRcbiAgICAgIHVzZXJJbnB1dFZhbHVlID0gdHJ1ZVxuICAgICAgZGVmYXVsdElucHV0VmFsdWUgPSBpbnB1dFZhbHVlLnZhbHVlXG5cbiAgICAgIGlmIChcbiAgICAgICAgc3RhdGUuZm9jdXNlZC52YWx1ZSAhPT0gdHJ1ZVxuICAgICAgICAmJiAoaGFzRGlhbG9nICE9PSB0cnVlIHx8IGRpYWxvZ0ZpZWxkRm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZSlcbiAgICAgICkge1xuICAgICAgICBzdGF0ZS5mb2N1cygpXG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9wcy5vbkZpbHRlciAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGZpbHRlclRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgZmlsdGVyVGltZXIgPSBudWxsXG4gICAgICAgICAgZmlsdGVyKGlucHV0VmFsdWUudmFsdWUpXG4gICAgICAgIH0sIHByb3BzLmlucHV0RGVib3VuY2UpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0SW5wdXRWYWx1ZSAodmFsLCBlbWl0SW1tZWRpYXRlbHkpIHtcbiAgICAgIGlmIChpbnB1dFZhbHVlLnZhbHVlICE9PSB2YWwpIHtcbiAgICAgICAgaW5wdXRWYWx1ZS52YWx1ZSA9IHZhbFxuXG4gICAgICAgIGlmIChlbWl0SW1tZWRpYXRlbHkgPT09IHRydWUgfHwgcHJvcHMuaW5wdXREZWJvdW5jZSA9PT0gMCB8fCBwcm9wcy5pbnB1dERlYm91bmNlID09PSAnMCcpIHtcbiAgICAgICAgICBlbWl0KCdpbnB1dFZhbHVlJywgdmFsKVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGlucHV0VmFsdWVUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaW5wdXRWYWx1ZVRpbWVyID0gbnVsbFxuICAgICAgICAgICAgZW1pdCgnaW5wdXRWYWx1ZScsIHZhbClcbiAgICAgICAgICB9LCBwcm9wcy5pbnB1dERlYm91bmNlKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlSW5wdXRWYWx1ZSAodmFsLCBub0ZpbHRlcmluZywgaW50ZXJuYWwpIHtcbiAgICAgIHVzZXJJbnB1dFZhbHVlID0gaW50ZXJuYWwgIT09IHRydWVcblxuICAgICAgaWYgKHByb3BzLnVzZUlucHV0ID09PSB0cnVlKSB7XG4gICAgICAgIHNldElucHV0VmFsdWUodmFsLCB0cnVlKVxuXG4gICAgICAgIGlmIChub0ZpbHRlcmluZyA9PT0gdHJ1ZSB8fCBpbnRlcm5hbCAhPT0gdHJ1ZSkge1xuICAgICAgICAgIGRlZmF1bHRJbnB1dFZhbHVlID0gdmFsXG4gICAgICAgIH1cblxuICAgICAgICBub0ZpbHRlcmluZyAhPT0gdHJ1ZSAmJiBmaWx0ZXIodmFsKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbHRlciAodmFsLCBrZWVwQ2xvc2VkLCBhZnRlclVwZGF0ZUZuKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHByb3BzLm9uRmlsdGVyID09PSB2b2lkIDBcbiAgICAgICAgfHwgKGtlZXBDbG9zZWQgIT09IHRydWUgJiYgc3RhdGUuZm9jdXNlZC52YWx1ZSAhPT0gdHJ1ZSlcbiAgICAgICkgcmV0dXJuXG5cbiAgICAgIGlmIChzdGF0ZS5pbm5lckxvYWRpbmcudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgZW1pdCgnZmlsdGVyQWJvcnQnKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHN0YXRlLmlubmVyTG9hZGluZy52YWx1ZSA9IHRydWVcbiAgICAgICAgaW5uZXJMb2FkaW5nSW5kaWNhdG9yLnZhbHVlID0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIHZhbCAhPT0gJydcbiAgICAgICAgJiYgcHJvcHMubXVsdGlwbGUgIT09IHRydWVcbiAgICAgICAgJiYgaW5uZXJWYWx1ZS52YWx1ZS5sZW5ndGggIT09IDBcbiAgICAgICAgJiYgdXNlcklucHV0VmFsdWUgIT09IHRydWVcbiAgICAgICAgJiYgdmFsID09PSBnZXRPcHRpb25MYWJlbC52YWx1ZShpbm5lclZhbHVlLnZhbHVlWyAwIF0pXG4gICAgICApIHtcbiAgICAgICAgdmFsID0gJydcbiAgICAgIH1cblxuICAgICAgY29uc3QgbG9jYWxGaWx0ZXJJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBtZW51LnZhbHVlID09PSB0cnVlICYmIChtZW51LnZhbHVlID0gZmFsc2UpXG4gICAgICB9LCAxMClcblxuICAgICAgZmlsdGVySWQgIT09IG51bGwgJiYgY2xlYXJUaW1lb3V0KGZpbHRlcklkKVxuICAgICAgZmlsdGVySWQgPSBsb2NhbEZpbHRlcklkXG5cbiAgICAgIGVtaXQoXG4gICAgICAgICdmaWx0ZXInLFxuICAgICAgICB2YWwsXG4gICAgICAgIChmbiwgYWZ0ZXJGbikgPT4ge1xuICAgICAgICAgIGlmICgoa2VlcENsb3NlZCA9PT0gdHJ1ZSB8fCBzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSB0cnVlKSAmJiBmaWx0ZXJJZCA9PT0gbG9jYWxGaWx0ZXJJZCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGZpbHRlcklkKVxuXG4gICAgICAgICAgICB0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicgJiYgZm4oKVxuXG4gICAgICAgICAgICAvLyBoaWRlIGluZGljYXRvciB0byBhbGxvdyBhcnJvdyB0byBhbmltYXRlXG4gICAgICAgICAgICBpbm5lckxvYWRpbmdJbmRpY2F0b3IudmFsdWUgPSBmYWxzZVxuXG4gICAgICAgICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgICAgIHN0YXRlLmlubmVyTG9hZGluZy52YWx1ZSA9IGZhbHNlXG5cbiAgICAgICAgICAgICAgaWYgKHN0YXRlLmVkaXRhYmxlLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGtlZXBDbG9zZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgIG1lbnUudmFsdWUgPT09IHRydWUgJiYgaGlkZVBvcHVwKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobWVudS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgdXBkYXRlTWVudSh0cnVlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIG1lbnUudmFsdWUgPSB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdHlwZW9mIGFmdGVyRm4gPT09ICdmdW5jdGlvbicgJiYgbmV4dFRpY2soKCkgPT4geyBhZnRlckZuKHByb3h5KSB9KVxuICAgICAgICAgICAgICB0eXBlb2YgYWZ0ZXJVcGRhdGVGbiA9PT0gJ2Z1bmN0aW9uJyAmJiBuZXh0VGljaygoKSA9PiB7IGFmdGVyVXBkYXRlRm4ocHJveHkpIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIGlmIChzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSB0cnVlICYmIGZpbHRlcklkID09PSBsb2NhbEZpbHRlcklkKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoZmlsdGVySWQpXG4gICAgICAgICAgICBzdGF0ZS5pbm5lckxvYWRpbmcudmFsdWUgPSBmYWxzZVxuICAgICAgICAgICAgaW5uZXJMb2FkaW5nSW5kaWNhdG9yLnZhbHVlID0gZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgICAgbWVudS52YWx1ZSA9PT0gdHJ1ZSAmJiAobWVudS52YWx1ZSA9IGZhbHNlKVxuICAgICAgICB9XG4gICAgICApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0TWVudSAoKSB7XG4gICAgICByZXR1cm4gaChRTWVudSwge1xuICAgICAgICByZWY6IG1lbnVSZWYsXG4gICAgICAgIGNsYXNzOiBtZW51Q29udGVudENsYXNzLnZhbHVlLFxuICAgICAgICBzdHlsZTogcHJvcHMucG9wdXBDb250ZW50U3R5bGUsXG4gICAgICAgIG1vZGVsVmFsdWU6IG1lbnUudmFsdWUsXG4gICAgICAgIGZpdDogcHJvcHMubWVudVNocmluayAhPT0gdHJ1ZSxcbiAgICAgICAgY292ZXI6IHByb3BzLm9wdGlvbnNDb3ZlciA9PT0gdHJ1ZSAmJiBub09wdGlvbnMudmFsdWUgIT09IHRydWUgJiYgcHJvcHMudXNlSW5wdXQgIT09IHRydWUsXG4gICAgICAgIGFuY2hvcjogcHJvcHMubWVudUFuY2hvcixcbiAgICAgICAgc2VsZjogcHJvcHMubWVudVNlbGYsXG4gICAgICAgIG9mZnNldDogcHJvcHMubWVudU9mZnNldCxcbiAgICAgICAgZGFyazogaXNPcHRpb25zRGFyay52YWx1ZSxcbiAgICAgICAgbm9QYXJlbnRFdmVudDogdHJ1ZSxcbiAgICAgICAgbm9SZWZvY3VzOiB0cnVlLFxuICAgICAgICBub0ZvY3VzOiB0cnVlLFxuICAgICAgICBub1JvdXRlRGlzbWlzczogcHJvcHMucG9wdXBOb1JvdXRlRGlzbWlzcyxcbiAgICAgICAgc3F1YXJlOiBzcXVhcmVkTWVudS52YWx1ZSxcbiAgICAgICAgdHJhbnNpdGlvblNob3c6IHByb3BzLnRyYW5zaXRpb25TaG93LFxuICAgICAgICB0cmFuc2l0aW9uSGlkZTogcHJvcHMudHJhbnNpdGlvbkhpZGUsXG4gICAgICAgIHRyYW5zaXRpb25EdXJhdGlvbjogcHJvcHMudHJhbnNpdGlvbkR1cmF0aW9uLFxuICAgICAgICBzZXBhcmF0ZUNsb3NlUG9wdXA6IHRydWUsXG4gICAgICAgIC4uLmxpc3Rib3hBdHRycy52YWx1ZSxcbiAgICAgICAgb25TY3JvbGxQYXNzaXZlOiBvblZpcnR1YWxTY3JvbGxFdnQsXG4gICAgICAgIG9uQmVmb3JlU2hvdzogb25Db250cm9sUG9wdXBTaG93LFxuICAgICAgICBvbkJlZm9yZUhpZGU6IG9uTWVudUJlZm9yZUhpZGUsXG4gICAgICAgIG9uU2hvdzogb25NZW51U2hvd1xuICAgICAgfSwgZ2V0QWxsT3B0aW9ucylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbk1lbnVCZWZvcmVIaWRlIChlKSB7XG4gICAgICBvbkNvbnRyb2xQb3B1cEhpZGUoZSlcbiAgICAgIGNsb3NlTWVudSgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25NZW51U2hvdyAoKSB7XG4gICAgICBzZXRWaXJ0dWFsU2Nyb2xsU2l6ZSgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25EaWFsb2dGaWVsZEZvY3VzIChlKSB7XG4gICAgICBzdG9wKGUpXG4gICAgICB0YXJnZXRSZWYudmFsdWU/LmZvY3VzKClcbiAgICAgIGRpYWxvZ0ZpZWxkRm9jdXNlZC52YWx1ZSA9IHRydWVcbiAgICAgIHdpbmRvdy5zY3JvbGxUbyh3aW5kb3cucGFnZVhPZmZzZXQgfHwgd2luZG93LnNjcm9sbFggfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0IHx8IDAsIDApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25EaWFsb2dGaWVsZEJsdXIgKGUpIHtcbiAgICAgIHN0b3AoZSlcbiAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgZGlhbG9nRmllbGRGb2N1c2VkLnZhbHVlID0gZmFsc2VcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RGlhbG9nICgpIHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBbXG4gICAgICAgIGgoUUZpZWxkLCB7XG4gICAgICAgICAgY2xhc3M6IGBjb2wtYXV0byAkeyBzdGF0ZS5maWVsZENsYXNzLnZhbHVlIH1gLFxuICAgICAgICAgIC4uLmlubmVyRmllbGRQcm9wcy52YWx1ZSxcbiAgICAgICAgICBmb3I6IHN0YXRlLnRhcmdldFVpZC52YWx1ZSxcbiAgICAgICAgICBkYXJrOiBpc09wdGlvbnNEYXJrLnZhbHVlLFxuICAgICAgICAgIHNxdWFyZTogdHJ1ZSxcbiAgICAgICAgICBsb2FkaW5nOiBpbm5lckxvYWRpbmdJbmRpY2F0b3IudmFsdWUsXG4gICAgICAgICAgaXRlbUFsaWduZWQ6IGZhbHNlLFxuICAgICAgICAgIGZpbGxlZDogdHJ1ZSxcbiAgICAgICAgICBzdGFja0xhYmVsOiBpbnB1dFZhbHVlLnZhbHVlLmxlbmd0aCAhPT0gMCxcbiAgICAgICAgICAuLi5zdGF0ZS5zcGxpdEF0dHJzLmxpc3RlbmVycy52YWx1ZSxcbiAgICAgICAgICBvbkZvY3VzOiBvbkRpYWxvZ0ZpZWxkRm9jdXMsXG4gICAgICAgICAgb25CbHVyOiBvbkRpYWxvZ0ZpZWxkQmx1clxuICAgICAgICB9LCB7XG4gICAgICAgICAgLi4uc2xvdHMsXG4gICAgICAgICAgcmF3Q29udHJvbDogKCkgPT4gc3RhdGUuZ2V0Q29udHJvbCh0cnVlKSxcbiAgICAgICAgICBiZWZvcmU6IHZvaWQgMCxcbiAgICAgICAgICBhZnRlcjogdm9pZCAwXG4gICAgICAgIH0pXG4gICAgICBdXG5cbiAgICAgIG1lbnUudmFsdWUgPT09IHRydWUgJiYgY29udGVudC5wdXNoKFxuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgcmVmOiBtZW51Q29udGVudFJlZixcbiAgICAgICAgICBjbGFzczogbWVudUNvbnRlbnRDbGFzcy52YWx1ZSArICcgc2Nyb2xsJyxcbiAgICAgICAgICBzdHlsZTogcHJvcHMucG9wdXBDb250ZW50U3R5bGUsXG4gICAgICAgICAgLi4ubGlzdGJveEF0dHJzLnZhbHVlLFxuICAgICAgICAgIG9uQ2xpY2s6IHByZXZlbnQsXG4gICAgICAgICAgb25TY3JvbGxQYXNzaXZlOiBvblZpcnR1YWxTY3JvbGxFdnRcbiAgICAgICAgfSwgZ2V0QWxsT3B0aW9ucygpKVxuICAgICAgKVxuXG4gICAgICByZXR1cm4gaChRRGlhbG9nLCB7XG4gICAgICAgIHJlZjogZGlhbG9nUmVmLFxuICAgICAgICBtb2RlbFZhbHVlOiBkaWFsb2cudmFsdWUsXG4gICAgICAgIHBvc2l0aW9uOiBwcm9wcy51c2VJbnB1dCA9PT0gdHJ1ZSA/ICd0b3AnIDogdm9pZCAwLFxuICAgICAgICB0cmFuc2l0aW9uU2hvdzogdHJhbnNpdGlvblNob3dDb21wdXRlZCxcbiAgICAgICAgdHJhbnNpdGlvbkhpZGU6IHByb3BzLnRyYW5zaXRpb25IaWRlLFxuICAgICAgICB0cmFuc2l0aW9uRHVyYXRpb246IHByb3BzLnRyYW5zaXRpb25EdXJhdGlvbixcbiAgICAgICAgbm9Sb3V0ZURpc21pc3M6IHByb3BzLnBvcHVwTm9Sb3V0ZURpc21pc3MsXG4gICAgICAgIG9uQmVmb3JlU2hvdzogb25Db250cm9sUG9wdXBTaG93LFxuICAgICAgICBvbkJlZm9yZUhpZGU6IG9uRGlhbG9nQmVmb3JlSGlkZSxcbiAgICAgICAgb25IaWRlOiBvbkRpYWxvZ0hpZGUsXG4gICAgICAgIG9uU2hvdzogb25EaWFsb2dTaG93XG4gICAgICB9LCAoKSA9PiBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiAncS1zZWxlY3RfX2RpYWxvZydcbiAgICAgICAgICArIChpc09wdGlvbnNEYXJrLnZhbHVlID09PSB0cnVlID8gJyBxLXNlbGVjdF9fZGlhbG9nLS1kYXJrIHEtZGFyaycgOiAnJylcbiAgICAgICAgICArIChkaWFsb2dGaWVsZEZvY3VzZWQudmFsdWUgPT09IHRydWUgPyAnIHEtc2VsZWN0X19kaWFsb2ctLWZvY3VzZWQnIDogJycpXG4gICAgICB9LCBjb250ZW50KSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkRpYWxvZ0JlZm9yZUhpZGUgKGUpIHtcbiAgICAgIG9uQ29udHJvbFBvcHVwSGlkZShlKVxuXG4gICAgICBpZiAoZGlhbG9nUmVmLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIGRpYWxvZ1JlZi52YWx1ZS5fX3VwZGF0ZVJlZm9jdXNUYXJnZXQoXG4gICAgICAgICAgc3RhdGUucm9vdFJlZi52YWx1ZS5xdWVyeVNlbGVjdG9yKCcucS1maWVsZF9fbmF0aXZlID4gW3RhYmluZGV4XTpsYXN0LWNoaWxkJylcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICBzdGF0ZS5mb2N1c2VkLnZhbHVlID0gZmFsc2VcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkRpYWxvZ0hpZGUgKGUpIHtcbiAgICAgIGhpZGVQb3B1cCgpXG4gICAgICBzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSBmYWxzZSAmJiBlbWl0KCdibHVyJywgZSlcbiAgICAgIHJlc2V0SW5wdXRWYWx1ZSgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25EaWFsb2dTaG93ICgpIHtcbiAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudFxuICAgICAgaWYgKFxuICAgICAgICAoZWwgPT09IG51bGwgfHwgZWwuaWQgIT09IHN0YXRlLnRhcmdldFVpZC52YWx1ZSlcbiAgICAgICAgJiYgdGFyZ2V0UmVmLnZhbHVlICE9PSBudWxsXG4gICAgICAgICYmIHRhcmdldFJlZi52YWx1ZSAhPT0gZWxcbiAgICAgICkge1xuICAgICAgICB0YXJnZXRSZWYudmFsdWUuZm9jdXMoKVxuICAgICAgfVxuXG4gICAgICBzZXRWaXJ0dWFsU2Nyb2xsU2l6ZSgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xvc2VNZW51ICgpIHtcbiAgICAgIGlmIChkaWFsb2cudmFsdWUgPT09IHRydWUpIHJldHVyblxuXG4gICAgICBvcHRpb25JbmRleC52YWx1ZSA9IC0xXG5cbiAgICAgIGlmIChtZW51LnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIG1lbnUudmFsdWUgPSBmYWxzZVxuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUuZm9jdXNlZC52YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgaWYgKGZpbHRlcklkICE9PSBudWxsKSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KGZpbHRlcklkKVxuICAgICAgICAgIGZpbHRlcklkID0gbnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0YXRlLmlubmVyTG9hZGluZy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGVtaXQoJ2ZpbHRlckFib3J0JylcbiAgICAgICAgICBzdGF0ZS5pbm5lckxvYWRpbmcudmFsdWUgPSBmYWxzZVxuICAgICAgICAgIGlubmVyTG9hZGluZ0luZGljYXRvci52YWx1ZSA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzaG93UG9wdXAgKGUpIHtcbiAgICAgIGlmIChzdGF0ZS5lZGl0YWJsZS52YWx1ZSAhPT0gdHJ1ZSkgcmV0dXJuXG5cbiAgICAgIGlmIChoYXNEaWFsb2cgPT09IHRydWUpIHtcbiAgICAgICAgc3RhdGUub25Db250cm9sRm9jdXNpbihlKVxuICAgICAgICBkaWFsb2cudmFsdWUgPSB0cnVlXG4gICAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICBzdGF0ZS5mb2N1cygpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgc3RhdGUuZm9jdXMoKVxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMub25GaWx0ZXIgIT09IHZvaWQgMCkge1xuICAgICAgICBmaWx0ZXIoaW5wdXRWYWx1ZS52YWx1ZSlcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKG5vT3B0aW9ucy52YWx1ZSAhPT0gdHJ1ZSB8fCBzbG90c1sgJ25vLW9wdGlvbicgXSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIG1lbnUudmFsdWUgPSB0cnVlXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGlkZVBvcHVwICgpIHtcbiAgICAgIGRpYWxvZy52YWx1ZSA9IGZhbHNlXG4gICAgICBjbG9zZU1lbnUoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc2V0SW5wdXRWYWx1ZSAoKSB7XG4gICAgICBwcm9wcy51c2VJbnB1dCA9PT0gdHJ1ZSAmJiB1cGRhdGVJbnB1dFZhbHVlKFxuICAgICAgICBwcm9wcy5tdWx0aXBsZSAhPT0gdHJ1ZSAmJiBwcm9wcy5maWxsSW5wdXQgPT09IHRydWUgJiYgaW5uZXJWYWx1ZS52YWx1ZS5sZW5ndGggIT09IDBcbiAgICAgICAgICA/IGdldE9wdGlvbkxhYmVsLnZhbHVlKGlubmVyVmFsdWUudmFsdWVbIDAgXSkgfHwgJydcbiAgICAgICAgICA6ICcnLFxuICAgICAgICB0cnVlLFxuICAgICAgICB0cnVlXG4gICAgICApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlTWVudSAoc2hvdykge1xuICAgICAgbGV0IG9wdGlvbkluZGV4ID0gLTFcblxuICAgICAgaWYgKHNob3cgPT09IHRydWUpIHtcbiAgICAgICAgaWYgKGlubmVyVmFsdWUudmFsdWUubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgY29uc3QgdmFsID0gZ2V0T3B0aW9uVmFsdWUudmFsdWUoaW5uZXJWYWx1ZS52YWx1ZVsgMCBdKVxuICAgICAgICAgIG9wdGlvbkluZGV4ID0gcHJvcHMub3B0aW9ucy5maW5kSW5kZXgodiA9PiBpc0RlZXBFcXVhbChnZXRPcHRpb25WYWx1ZS52YWx1ZSh2KSwgdmFsKSlcbiAgICAgICAgfVxuXG4gICAgICAgIGxvY2FsUmVzZXRWaXJ0dWFsU2Nyb2xsKG9wdGlvbkluZGV4KVxuICAgICAgfVxuXG4gICAgICBzZXRPcHRpb25JbmRleChvcHRpb25JbmRleClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXJlbmRlck1lbnUgKG5ld0xlbmd0aCwgb2xkTGVuZ3RoKSB7XG4gICAgICBpZiAobWVudS52YWx1ZSA9PT0gdHJ1ZSAmJiBzdGF0ZS5pbm5lckxvYWRpbmcudmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgIGxvY2FsUmVzZXRWaXJ0dWFsU2Nyb2xsKC0xLCB0cnVlKVxuXG4gICAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICBpZiAobWVudS52YWx1ZSA9PT0gdHJ1ZSAmJiBzdGF0ZS5pbm5lckxvYWRpbmcudmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBpZiAobmV3TGVuZ3RoID4gb2xkTGVuZ3RoKSB7XG4gICAgICAgICAgICAgIGxvY2FsUmVzZXRWaXJ0dWFsU2Nyb2xsKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICB1cGRhdGVNZW51KHRydWUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZU1lbnVQb3NpdGlvbiAoKSB7XG4gICAgICBpZiAoZGlhbG9nLnZhbHVlID09PSBmYWxzZSAmJiBtZW51UmVmLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIG1lbnVSZWYudmFsdWUudXBkYXRlUG9zaXRpb24oKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uQ29udHJvbFBvcHVwU2hvdyAoZSkge1xuICAgICAgZSAhPT0gdm9pZCAwICYmIHN0b3AoZSlcbiAgICAgIGVtaXQoJ3BvcHVwU2hvdycsIGUpXG4gICAgICBzdGF0ZS5oYXNQb3B1cE9wZW4gPSB0cnVlXG4gICAgICBzdGF0ZS5vbkNvbnRyb2xGb2N1c2luKGUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Db250cm9sUG9wdXBIaWRlIChlKSB7XG4gICAgICBlICE9PSB2b2lkIDAgJiYgc3RvcChlKVxuICAgICAgZW1pdCgncG9wdXBIaWRlJywgZSlcbiAgICAgIHN0YXRlLmhhc1BvcHVwT3BlbiA9IGZhbHNlXG4gICAgICBzdGF0ZS5vbkNvbnRyb2xGb2N1c291dChlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVByZVN0YXRlICgpIHtcbiAgICAgIGhhc0RpYWxvZyA9ICRxLnBsYXRmb3JtLmlzLm1vYmlsZSAhPT0gdHJ1ZSAmJiBwcm9wcy5iZWhhdmlvciAhPT0gJ2RpYWxvZydcbiAgICAgICAgPyBmYWxzZVxuICAgICAgICA6IHByb3BzLmJlaGF2aW9yICE9PSAnbWVudScgJiYgKFxuICAgICAgICAgIHByb3BzLnVzZUlucHV0ID09PSB0cnVlXG4gICAgICAgICAgICA/IHNsb3RzWyAnbm8tb3B0aW9uJyBdICE9PSB2b2lkIDAgfHwgcHJvcHMub25GaWx0ZXIgIT09IHZvaWQgMCB8fCBub09wdGlvbnMudmFsdWUgPT09IGZhbHNlXG4gICAgICAgICAgICA6IHRydWVcbiAgICAgICAgKVxuXG4gICAgICB0cmFuc2l0aW9uU2hvd0NvbXB1dGVkID0gJHEucGxhdGZvcm0uaXMuaW9zID09PSB0cnVlICYmIGhhc0RpYWxvZyA9PT0gdHJ1ZSAmJiBwcm9wcy51c2VJbnB1dCA9PT0gdHJ1ZVxuICAgICAgICA/ICdmYWRlJ1xuICAgICAgICA6IHByb3BzLnRyYW5zaXRpb25TaG93XG4gICAgfVxuXG4gICAgb25CZWZvcmVVcGRhdGUodXBkYXRlUHJlU3RhdGUpXG4gICAgb25VcGRhdGVkKHVwZGF0ZU1lbnVQb3NpdGlvbilcblxuICAgIHVwZGF0ZVByZVN0YXRlKClcblxuICAgIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgICBmaWx0ZXJUaW1lciAhPT0gbnVsbCAmJiBjbGVhclRpbWVvdXQoZmlsdGVyVGltZXIpXG4gICAgICBpbnB1dFZhbHVlVGltZXIgIT09IG51bGwgJiYgY2xlYXJUaW1lb3V0KGlucHV0VmFsdWVUaW1lcilcbiAgICB9KVxuXG4gICAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gICAgT2JqZWN0LmFzc2lnbihwcm94eSwge1xuICAgICAgc2hvd1BvcHVwLCBoaWRlUG9wdXAsXG4gICAgICByZW1vdmVBdEluZGV4LCBhZGQsIHRvZ2dsZU9wdGlvbixcbiAgICAgIGdldE9wdGlvbkluZGV4OiAoKSA9PiBvcHRpb25JbmRleC52YWx1ZSxcbiAgICAgIHNldE9wdGlvbkluZGV4LCBtb3ZlT3B0aW9uU2VsZWN0aW9uLFxuICAgICAgZmlsdGVyLCB1cGRhdGVNZW51UG9zaXRpb24sIHVwZGF0ZUlucHV0VmFsdWUsXG4gICAgICBpc09wdGlvblNlbGVjdGVkLFxuICAgICAgZ2V0RW1pdHRpbmdPcHRpb25WYWx1ZSxcbiAgICAgIGlzT3B0aW9uRGlzYWJsZWQ6ICguLi5hcmdzKSA9PiBpc09wdGlvbkRpc2FibGVkLnZhbHVlLmFwcGx5KG51bGwsIGFyZ3MpID09PSB0cnVlLFxuICAgICAgZ2V0T3B0aW9uVmFsdWU6ICguLi5hcmdzKSA9PiBnZXRPcHRpb25WYWx1ZS52YWx1ZS5hcHBseShudWxsLCBhcmdzKSxcbiAgICAgIGdldE9wdGlvbkxhYmVsOiAoLi4uYXJncykgPT4gZ2V0T3B0aW9uTGFiZWwudmFsdWUuYXBwbHkobnVsbCwgYXJncylcbiAgICB9KVxuXG4gICAgT2JqZWN0LmFzc2lnbihzdGF0ZSwge1xuICAgICAgaW5uZXJWYWx1ZSxcblxuICAgICAgZmllbGRDbGFzczogY29tcHV0ZWQoKCkgPT5cbiAgICAgICAgYHEtc2VsZWN0IHEtZmllbGQtLWF1dG8taGVpZ2h0IHEtc2VsZWN0LS13aXRoJHsgcHJvcHMudXNlSW5wdXQgIT09IHRydWUgPyAnb3V0JyA6ICcnIH0taW5wdXRgXG4gICAgICAgICsgYCBxLXNlbGVjdC0td2l0aCR7IHByb3BzLnVzZUNoaXBzICE9PSB0cnVlID8gJ291dCcgOiAnJyB9LWNoaXBzYFxuICAgICAgICArIGAgcS1zZWxlY3QtLSR7IHByb3BzLm11bHRpcGxlID09PSB0cnVlID8gJ211bHRpcGxlJyA6ICdzaW5nbGUnIH1gXG4gICAgICApLFxuXG4gICAgICBpbnB1dFJlZixcbiAgICAgIHRhcmdldFJlZixcbiAgICAgIGhhc1ZhbHVlLFxuICAgICAgc2hvd1BvcHVwLFxuXG4gICAgICBmbG9hdGluZ0xhYmVsOiBjb21wdXRlZCgoKSA9PlxuICAgICAgICAocHJvcHMuaGlkZVNlbGVjdGVkICE9PSB0cnVlICYmIGhhc1ZhbHVlLnZhbHVlID09PSB0cnVlKVxuICAgICAgICB8fCB0eXBlb2YgaW5wdXRWYWx1ZS52YWx1ZSA9PT0gJ251bWJlcidcbiAgICAgICAgfHwgaW5wdXRWYWx1ZS52YWx1ZS5sZW5ndGggIT09IDBcbiAgICAgICAgfHwgZmllbGRWYWx1ZUlzRmlsbGVkKHByb3BzLmRpc3BsYXlWYWx1ZSlcbiAgICAgICksXG5cbiAgICAgIGdldENvbnRyb2xDaGlsZDogKCkgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgc3RhdGUuZWRpdGFibGUudmFsdWUgIT09IGZhbHNlICYmIChcbiAgICAgICAgICAgIGRpYWxvZy52YWx1ZSA9PT0gdHJ1ZSAvLyBkaWFsb2cgYWx3YXlzIGhhcyBtZW51IGRpc3BsYXllZCwgc28gbmVlZCB0byByZW5kZXIgaXRcbiAgICAgICAgICAgIHx8IG5vT3B0aW9ucy52YWx1ZSAhPT0gdHJ1ZVxuICAgICAgICAgICAgfHwgc2xvdHNbICduby1vcHRpb24nIF0gIT09IHZvaWQgMFxuICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgcmV0dXJuIGhhc0RpYWxvZyA9PT0gdHJ1ZSA/IGdldERpYWxvZygpIDogZ2V0TWVudSgpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc3RhdGUuaGFzUG9wdXBPcGVuID09PSB0cnVlKSB7XG4gICAgICAgICAgLy8gZXhwbGljaXRseSBzZXQgaXQgb3RoZXJ3aXNlIFRBQiB3aWxsIG5vdCBibHVyIGNvbXBvbmVudFxuICAgICAgICAgIHN0YXRlLmhhc1BvcHVwT3BlbiA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIGNvbnRyb2xFdmVudHM6IHtcbiAgICAgICAgb25Gb2N1c2luIChlKSB7IHN0YXRlLm9uQ29udHJvbEZvY3VzaW4oZSkgfSxcbiAgICAgICAgb25Gb2N1c291dCAoZSkge1xuICAgICAgICAgIHN0YXRlLm9uQ29udHJvbEZvY3Vzb3V0KGUsICgpID0+IHtcbiAgICAgICAgICAgIHJlc2V0SW5wdXRWYWx1ZSgpXG4gICAgICAgICAgICBjbG9zZU1lbnUoKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIG9uQ2xpY2sgKGUpIHtcbiAgICAgICAgICAvLyBsYWJlbCBmcm9tIFFGaWVsZCB3aWxsIHByb3BhZ2F0ZSBjbGljayBvbiB0aGUgaW5wdXRcbiAgICAgICAgICBwcmV2ZW50KGUpXG5cbiAgICAgICAgICBpZiAoaGFzRGlhbG9nICE9PSB0cnVlICYmIG1lbnUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNsb3NlTWVudSgpXG4gICAgICAgICAgICB0YXJnZXRSZWYudmFsdWU/LmZvY3VzKClcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cblxuICAgICAgICAgIHNob3dQb3B1cChlKVxuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBnZXRDb250cm9sOiBmcm9tRGlhbG9nID0+IHtcbiAgICAgICAgY29uc3QgY2hpbGQgPSBnZXRTZWxlY3Rpb24oKVxuICAgICAgICBjb25zdCBpc1RhcmdldCA9IGZyb21EaWFsb2cgPT09IHRydWUgfHwgZGlhbG9nLnZhbHVlICE9PSB0cnVlIHx8IGhhc0RpYWxvZyAhPT0gdHJ1ZVxuXG4gICAgICAgIGlmIChwcm9wcy51c2VJbnB1dCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNoaWxkLnB1c2goZ2V0SW5wdXQoZnJvbURpYWxvZywgaXNUYXJnZXQpKVxuICAgICAgICB9XG4gICAgICAgIC8vIHRoZXJlIGNhbiBiZSBvbmx5IG9uZSAod2hlbiBkaWFsb2cgaXMgb3BlbmVkIHRoZSBjb250cm9sIGluIGRpYWxvZyBzaG91bGQgYmUgdGFyZ2V0KVxuICAgICAgICBlbHNlIGlmIChzdGF0ZS5lZGl0YWJsZS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNvbnN0IGF0dHJzID0gaXNUYXJnZXQgPT09IHRydWUgPyBjb21ib2JveEF0dHJzLnZhbHVlIDogdm9pZCAwXG5cbiAgICAgICAgICBjaGlsZC5wdXNoKFxuICAgICAgICAgICAgaCgnaW5wdXQnLCB7XG4gICAgICAgICAgICAgIHJlZjogaXNUYXJnZXQgPT09IHRydWUgPyB0YXJnZXRSZWYgOiB2b2lkIDAsXG4gICAgICAgICAgICAgIGtleTogJ2RfdCcsXG4gICAgICAgICAgICAgIGNsYXNzOiAncS1zZWxlY3RfX2ZvY3VzLXRhcmdldCcsXG4gICAgICAgICAgICAgIGlkOiBpc1RhcmdldCA9PT0gdHJ1ZSA/IHN0YXRlLnRhcmdldFVpZC52YWx1ZSA6IHZvaWQgMCxcbiAgICAgICAgICAgICAgdmFsdWU6IGFyaWFDdXJyZW50VmFsdWUudmFsdWUsXG4gICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlLFxuICAgICAgICAgICAgICAnZGF0YS1hdXRvZm9jdXMnOiBmcm9tRGlhbG9nID09PSB0cnVlIHx8IHByb3BzLmF1dG9mb2N1cyA9PT0gdHJ1ZSB8fCB2b2lkIDAsXG4gICAgICAgICAgICAgIC4uLmF0dHJzLFxuICAgICAgICAgICAgICBvbktleWRvd246IG9uVGFyZ2V0S2V5ZG93bixcbiAgICAgICAgICAgICAgb25LZXl1cDogb25UYXJnZXRLZXl1cCxcbiAgICAgICAgICAgICAgb25LZXlwcmVzczogb25UYXJnZXRLZXlwcmVzc1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICApXG5cbiAgICAgICAgICBpZiAoaXNUYXJnZXQgPT09IHRydWUgJiYgdHlwZW9mIHByb3BzLmF1dG9jb21wbGV0ZSA9PT0gJ3N0cmluZycgJiYgcHJvcHMuYXV0b2NvbXBsZXRlLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgICAgICAgaCgnaW5wdXQnLCB7XG4gICAgICAgICAgICAgICAgY2xhc3M6ICdxLXNlbGVjdF9fYXV0b2NvbXBsZXRlLWlucHV0JyxcbiAgICAgICAgICAgICAgICBhdXRvY29tcGxldGU6IHByb3BzLmF1dG9jb21wbGV0ZSxcbiAgICAgICAgICAgICAgICB0YWJpbmRleDogLTEsXG4gICAgICAgICAgICAgICAgb25LZXl1cDogb25UYXJnZXRBdXRvY29tcGxldGVcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmFtZVByb3AudmFsdWUgIT09IHZvaWQgMCAmJiBwcm9wcy5kaXNhYmxlICE9PSB0cnVlICYmIGlubmVyT3B0aW9uc1ZhbHVlLnZhbHVlLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgIGNvbnN0IG9wdHMgPSBpbm5lck9wdGlvbnNWYWx1ZS52YWx1ZS5tYXAodmFsdWUgPT4gaCgnb3B0aW9uJywgeyB2YWx1ZSwgc2VsZWN0ZWQ6IHRydWUgfSkpXG5cbiAgICAgICAgICBjaGlsZC5wdXNoKFxuICAgICAgICAgICAgaCgnc2VsZWN0Jywge1xuICAgICAgICAgICAgICBjbGFzczogJ2hpZGRlbicsXG4gICAgICAgICAgICAgIG5hbWU6IG5hbWVQcm9wLnZhbHVlLFxuICAgICAgICAgICAgICBtdWx0aXBsZTogcHJvcHMubXVsdGlwbGVcbiAgICAgICAgICAgIH0sIG9wdHMpXG4gICAgICAgICAgKVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYXR0cnMgPSBwcm9wcy51c2VJbnB1dCA9PT0gdHJ1ZSB8fCBpc1RhcmdldCAhPT0gdHJ1ZSA/IHZvaWQgMCA6IHN0YXRlLnNwbGl0QXR0cnMuYXR0cmlidXRlcy52YWx1ZVxuXG4gICAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19uYXRpdmUgcm93IGl0ZW1zLWNlbnRlcicsXG4gICAgICAgICAgLi4uYXR0cnMsXG4gICAgICAgICAgLi4uc3RhdGUuc3BsaXRBdHRycy5saXN0ZW5lcnMudmFsdWVcbiAgICAgICAgfSwgY2hpbGQpXG4gICAgICB9LFxuXG4gICAgICBnZXRJbm5lckFwcGVuZDogKCkgPT4gKFxuICAgICAgICBwcm9wcy5sb2FkaW5nICE9PSB0cnVlICYmIGlubmVyTG9hZGluZ0luZGljYXRvci52YWx1ZSAhPT0gdHJ1ZSAmJiBwcm9wcy5oaWRlRHJvcGRvd25JY29uICE9PSB0cnVlXG4gICAgICAgICAgPyBbXG4gICAgICAgICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICAgICAgICBjbGFzczogJ3Etc2VsZWN0X19kcm9wZG93bi1pY29uJyArIChtZW51LnZhbHVlID09PSB0cnVlID8gJyByb3RhdGUtMTgwJyA6ICcnKSxcbiAgICAgICAgICAgICAgICBuYW1lOiBkcm9wZG93bkFycm93SWNvbi52YWx1ZVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXVxuICAgICAgICAgIDogbnVsbFxuICAgICAgKVxuICAgIH0pXG5cbiAgICByZXR1cm4gdXNlRmllbGQoc3RhdGUpXG4gIH1cbn0pXG4iXSwibmFtZXMiOlsiZWwiLCJoIiwib3B0aW9uSW5kZXgiLCJhdHRycyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFJQSxNQUFBLFNBQWUsZ0JBQWdCO0FBQUEsRUFDN0IsTUFBTTtBQUFBLEVBRU4sY0FBYztBQUFBLEVBRWQsT0FBTztBQUFBLElBQ0wsR0FBRztBQUFBLElBRUgsS0FBSztBQUFBLE1BQ0gsTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLElBQ2Y7QUFBQSxFQUNBO0FBQUEsRUFFRSxPQUFPO0FBQUEsRUFFUCxRQUFTO0FBQ1AsV0FBTztBQUFBLE1BQ0wsY0FBYyxFQUFFLFNBQVMsS0FBSSxDQUFFO0FBQUEsSUFDckM7QUFBQSxFQUNFO0FBQ0YsQ0FBQztBQ3pCRCxJQUFJLGtCQUFrQjtBQUdEO0FBQ25CLFFBQU0sV0FBVyxTQUFTLGNBQWMsS0FB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
