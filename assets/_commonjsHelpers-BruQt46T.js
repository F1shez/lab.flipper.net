import { ab as onDeactivated, U as onBeforeUnmount, aw as vmIsDestroyed, H as getCurrentInstance, R as nextTick, w as watch, aO as vmHasRouter, S as onMounted, c as computed, aP as getParentProxy, L as createComponent, a as ref, Y as onUnmounted, aH as injectProp, h, aQ as Teleport, aR as createGlobalNode, aS as removeGlobalNode, aT as getElement, aU as css, z as client, ar as Platform, aD as prevent, C as addEvt, aG as isKeyCode, y as cleanEvt, a9 as listenOpts } from "./index-BXn1qSjA.js";
function useTimeout() {
  let timer = null;
  const vm = getCurrentInstance();
  function removeTimeout() {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
  }
  onDeactivated(removeTimeout);
  onBeforeUnmount(removeTimeout);
  return {
    removeTimeout,
    registerTimeout(fn, delay) {
      removeTimeout();
      if (vmIsDestroyed(vm) === false) {
        timer = setTimeout(() => {
          timer = null;
          fn();
        }, delay);
      }
    }
  };
}
function useTick() {
  let tickFn;
  const vm = getCurrentInstance();
  function removeTick() {
    tickFn = void 0;
  }
  onDeactivated(removeTick);
  onBeforeUnmount(removeTick);
  return {
    removeTick,
    registerTick(fn) {
      tickFn = fn;
      nextTick(() => {
        if (tickFn === fn) {
          vmIsDestroyed(vm) === false && tickFn();
          tickFn = void 0;
        }
      });
    }
  };
}
const useModelToggleProps = {
  modelValue: {
    type: Boolean,
    default: null
  },
  "onUpdate:modelValue": [Function, Array]
};
const useModelToggleEmits = [
  "beforeShow",
  "show",
  "beforeHide",
  "hide"
];
function useModelToggle({
  showing,
  canShow,
  // optional
  hideOnRouteChange,
  // optional
  handleShow,
  // optional
  handleHide,
  // optional
  processOnMount
  // optional
}) {
  const vm = getCurrentInstance();
  const { props, emit, proxy } = vm;
  let payload;
  function toggle(evt) {
    if (showing.value === true) {
      hide(evt);
    } else {
      show(evt);
    }
  }
  function show(evt) {
    if (props.disable === true || (evt == null ? void 0 : evt.qAnchorHandled) === true || canShow !== void 0 && canShow(evt) !== true) return;
    const listener = props["onUpdate:modelValue"] !== void 0;
    if (listener === true && true) {
      emit("update:modelValue", true);
      payload = evt;
      nextTick(() => {
        if (payload === evt) {
          payload = void 0;
        }
      });
    }
    if (props.modelValue === null || listener === false || false) {
      processShow(evt);
    }
  }
  function processShow(evt) {
    if (showing.value === true) return;
    showing.value = true;
    emit("beforeShow", evt);
    if (handleShow !== void 0) {
      handleShow(evt);
    } else {
      emit("show", evt);
    }
  }
  function hide(evt) {
    if (props.disable === true) return;
    const listener = props["onUpdate:modelValue"] !== void 0;
    if (listener === true && true) {
      emit("update:modelValue", false);
      payload = evt;
      nextTick(() => {
        if (payload === evt) {
          payload = void 0;
        }
      });
    }
    if (props.modelValue === null || listener === false || false) {
      processHide(evt);
    }
  }
  function processHide(evt) {
    if (showing.value === false) return;
    showing.value = false;
    emit("beforeHide", evt);
    if (handleHide !== void 0) {
      handleHide(evt);
    } else {
      emit("hide", evt);
    }
  }
  function processModelChange(val) {
    if (props.disable === true && val === true) {
      if (props["onUpdate:modelValue"] !== void 0) {
        emit("update:modelValue", false);
      }
    } else if (val === true !== showing.value) {
      const fn = val === true ? processShow : processHide;
      fn(payload);
    }
  }
  watch(() => props.modelValue, processModelChange);
  if (hideOnRouteChange !== void 0 && vmHasRouter(vm) === true) {
    watch(() => proxy.$route.fullPath, () => {
      if (hideOnRouteChange.value === true && showing.value === true) {
        hide();
      }
    });
  }
  processOnMount === true && onMounted(() => {
    processModelChange(props.modelValue);
  });
  const publicMethods = { show, hide, toggle };
  Object.assign(proxy, publicMethods);
  return publicMethods;
}
const useTransitionProps = {
  transitionShow: {
    type: String,
    default: "fade"
  },
  transitionHide: {
    type: String,
    default: "fade"
  },
  transitionDuration: {
    type: [String, Number],
    default: 300
  }
};
function useTransition(props, defaultShowFn = () => {
}, defaultHideFn = () => {
}) {
  return {
    transitionProps: computed(() => {
      const show = `q-transition--${props.transitionShow || defaultShowFn()}`;
      const hide = `q-transition--${props.transitionHide || defaultHideFn()}`;
      return {
        appear: true,
        enterFromClass: `${show}-enter-from`,
        enterActiveClass: `${show}-enter-active`,
        enterToClass: `${show}-enter-to`,
        leaveFromClass: `${hide}-leave-from`,
        leaveActiveClass: `${hide}-leave-active`,
        leaveToClass: `${hide}-leave-to`
      };
    }),
    transitionStyle: computed(() => `--q-transition-duration: ${props.transitionDuration}ms`)
  };
}
let queue = [];
let waitFlags = [];
function clearFlag(flag) {
  waitFlags = waitFlags.filter((entry) => entry !== flag);
}
function addFocusWaitFlag(flag) {
  clearFlag(flag);
  waitFlags.push(flag);
}
function removeFocusWaitFlag(flag) {
  clearFlag(flag);
  if (waitFlags.length === 0 && queue.length !== 0) {
    queue[queue.length - 1]();
    queue = [];
  }
}
function addFocusFn(fn) {
  if (waitFlags.length === 0) {
    fn();
  } else {
    queue.push(fn);
  }
}
function removeFocusFn(fn) {
  queue = queue.filter((entry) => entry !== fn);
}
const portalProxyList = [];
function getPortalProxy(el) {
  return portalProxyList.find(
    (proxy) => proxy.contentEl !== null && proxy.contentEl.contains(el)
  );
}
function closePortalMenus(proxy, evt) {
  do {
    if (proxy.$options.name === "QMenu") {
      proxy.hide(evt);
      if (proxy.$props.separateClosePopup === true) {
        return getParentProxy(proxy);
      }
    } else if (proxy.__qPortal === true) {
      const parent = getParentProxy(proxy);
      if ((parent == null ? void 0 : parent.$options.name) === "QPopupProxy") {
        proxy.hide(evt);
        return parent;
      } else {
        return proxy;
      }
    }
    proxy = getParentProxy(proxy);
  } while (proxy !== void 0 && proxy !== null);
}
function closePortals(proxy, evt, depth) {
  while (depth !== 0 && proxy !== void 0 && proxy !== null) {
    if (proxy.__qPortal === true) {
      depth--;
      if (proxy.$options.name === "QMenu") {
        proxy = closePortalMenus(proxy, evt);
        continue;
      }
      proxy.hide(evt);
    }
    proxy = getParentProxy(proxy);
  }
}
const QPortal = createComponent({
  name: "QPortal",
  setup(_, { slots }) {
    return () => slots.default();
  }
});
function isOnGlobalDialog(vm) {
  vm = vm.parent;
  while (vm !== void 0 && vm !== null) {
    if (vm.type.name === "QGlobalDialog") {
      return true;
    }
    if (vm.type.name === "QDialog" || vm.type.name === "QMenu") {
      return false;
    }
    vm = vm.parent;
  }
  return false;
}
function usePortal(vm, innerRef, renderPortalContent, type) {
  const portalIsActive = ref(false);
  const portalIsAccessible = ref(false);
  let portalEl = null;
  const focusObj = {};
  const onGlobalDialog = type === "dialog" && isOnGlobalDialog(vm);
  function showPortal(isReady) {
    if (isReady === true) {
      removeFocusWaitFlag(focusObj);
      portalIsAccessible.value = true;
      return;
    }
    portalIsAccessible.value = false;
    if (portalIsActive.value === false) {
      if (onGlobalDialog === false && portalEl === null) {
        portalEl = createGlobalNode(false, type);
      }
      portalIsActive.value = true;
      portalProxyList.push(vm.proxy);
      addFocusWaitFlag(focusObj);
    }
  }
  function hidePortal(isReady) {
    portalIsAccessible.value = false;
    if (isReady !== true) return;
    removeFocusWaitFlag(focusObj);
    portalIsActive.value = false;
    const index = portalProxyList.indexOf(vm.proxy);
    if (index !== -1) {
      portalProxyList.splice(index, 1);
    }
    if (portalEl !== null) {
      removeGlobalNode(portalEl);
      portalEl = null;
    }
  }
  onUnmounted(() => {
    hidePortal(true);
  });
  vm.proxy.__qPortal = true;
  injectProp(vm.proxy, "contentEl", () => innerRef.value);
  return {
    showPortal,
    hidePortal,
    portalIsActive,
    portalIsAccessible,
    renderPortal: () => onGlobalDialog === true ? renderPortalContent() : portalIsActive.value === true ? [h(Teleport, { to: portalEl }, h(QPortal, renderPortalContent))] : void 0
  };
}
const scrollTargetProp = [Element, String];
const scrollTargets = [null, document, document.body, document.scrollingElement, document.documentElement];
function getScrollTarget(el, targetEl) {
  let target = getElement(targetEl);
  if (target === void 0) {
    if (el === void 0 || el === null) {
      return window;
    }
    target = el.closest(".scroll,.scroll-y,.overflow-auto");
  }
  return scrollTargets.includes(target) ? window : target;
}
function getScrollHeight(el) {
  return (el === window ? document.body : el).scrollHeight;
}
function getVerticalScrollPosition(scrollTarget) {
  return scrollTarget === window ? window.pageYOffset || window.scrollY || document.body.scrollTop || 0 : scrollTarget.scrollTop;
}
function getHorizontalScrollPosition(scrollTarget) {
  return scrollTarget === window ? window.pageXOffset || window.scrollX || document.body.scrollLeft || 0 : scrollTarget.scrollLeft;
}
function animVerticalScrollTo(el, to, duration = 0) {
  const prevTime = arguments[3] === void 0 ? performance.now() : arguments[3];
  const pos = getVerticalScrollPosition(el);
  if (duration <= 0) {
    if (pos !== to) {
      setScroll(el, to);
    }
    return;
  }
  requestAnimationFrame((nowTime) => {
    const frameTime = nowTime - prevTime;
    const newPos = pos + (to - pos) / Math.max(frameTime, duration) * frameTime;
    setScroll(el, newPos);
    if (newPos !== to) {
      animVerticalScrollTo(el, to, duration - frameTime, nowTime);
    }
  });
}
function animHorizontalScrollTo(el, to, duration = 0) {
  const prevTime = arguments[3] === void 0 ? performance.now() : arguments[3];
  const pos = getHorizontalScrollPosition(el);
  if (duration <= 0) {
    if (pos !== to) {
      setHorizontalScroll(el, to);
    }
    return;
  }
  requestAnimationFrame((nowTime) => {
    const frameTime = nowTime - prevTime;
    const newPos = pos + (to - pos) / Math.max(frameTime, duration) * frameTime;
    setHorizontalScroll(el, newPos);
    if (newPos !== to) {
      animHorizontalScrollTo(el, to, duration - frameTime, nowTime);
    }
  });
}
function setScroll(scrollTarget, offset) {
  if (scrollTarget === window) {
    window.scrollTo(window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, offset);
    return;
  }
  scrollTarget.scrollTop = offset;
}
function setHorizontalScroll(scrollTarget, offset) {
  if (scrollTarget === window) {
    window.scrollTo(offset, window.pageYOffset || window.scrollY || document.body.scrollTop || 0);
    return;
  }
  scrollTarget.scrollLeft = offset;
}
function setVerticalScrollPosition(scrollTarget, offset, duration) {
  if (duration) {
    animVerticalScrollTo(scrollTarget, offset, duration);
    return;
  }
  setScroll(scrollTarget, offset);
}
function setHorizontalScrollPosition(scrollTarget, offset, duration) {
  if (duration) {
    animHorizontalScrollTo(scrollTarget, offset, duration);
    return;
  }
  setHorizontalScroll(scrollTarget, offset);
}
let size;
function getScrollbarWidth() {
  if (size !== void 0) {
    return size;
  }
  const inner = document.createElement("p"), outer = document.createElement("div");
  css(inner, {
    width: "100%",
    height: "200px"
  });
  css(outer, {
    position: "absolute",
    top: "0px",
    left: "0px",
    visibility: "hidden",
    width: "200px",
    height: "150px",
    overflow: "hidden"
  });
  outer.appendChild(inner);
  document.body.appendChild(outer);
  const w1 = inner.offsetWidth;
  outer.style.overflow = "scroll";
  let w2 = inner.offsetWidth;
  if (w1 === w2) {
    w2 = outer.clientWidth;
  }
  outer.remove();
  size = w1 - w2;
  return size;
}
function hasScrollbar(el, onY = true) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) {
    return false;
  }
  return onY ? el.scrollHeight > el.clientHeight && (el.classList.contains("scroll") || el.classList.contains("overflow-auto") || ["auto", "scroll"].includes(window.getComputedStyle(el)["overflow-y"])) : el.scrollWidth > el.clientWidth && (el.classList.contains("scroll") || el.classList.contains("overflow-auto") || ["auto", "scroll"].includes(window.getComputedStyle(el)["overflow-x"]));
}
const handlers = [];
function trigger(e) {
  handlers[handlers.length - 1](e);
}
function addFocusout(fn) {
  if (client.is.desktop === true) {
    handlers.push(fn);
    if (handlers.length === 1) {
      document.body.addEventListener("focusin", trigger);
    }
  }
}
function removeFocusout(fn) {
  const index = handlers.indexOf(fn);
  if (index !== -1) {
    handlers.splice(index, 1);
    if (handlers.length === 0) {
      document.body.removeEventListener("focusin", trigger);
    }
  }
}
function clearSelection() {
  if (window.getSelection !== void 0) {
    const selection = window.getSelection();
    if (selection.empty !== void 0) {
      selection.empty();
    } else if (selection.removeAllRanges !== void 0) {
      selection.removeAllRanges();
      Platform.is.mobile !== true && selection.addRange(document.createRange());
    }
  } else if (document.selection !== void 0) {
    document.selection.empty();
  }
}
const useAnchorStaticProps = {
  /* SSR does not know about Element */
  target: {
    type: [Boolean, String, Element],
    default: true
  },
  noParentEvent: Boolean
};
const useAnchorProps = {
  ...useAnchorStaticProps,
  contextMenu: Boolean
};
function useAnchor({
  showing,
  avoidEmit,
  // required for QPopupProxy (true)
  configureAnchorEl
  // optional
}) {
  const { props, proxy, emit } = getCurrentInstance();
  const anchorEl = ref(null);
  let touchTimer = null;
  function canShow(evt) {
    return anchorEl.value === null ? false : evt === void 0 || evt.touches === void 0 || evt.touches.length <= 1;
  }
  const anchorEvents = {};
  if (configureAnchorEl === void 0) {
    Object.assign(anchorEvents, {
      hide(evt) {
        proxy.hide(evt);
      },
      toggle(evt) {
        proxy.toggle(evt);
        evt.qAnchorHandled = true;
      },
      toggleKey(evt) {
        isKeyCode(evt, 13) === true && anchorEvents.toggle(evt);
      },
      contextClick(evt) {
        proxy.hide(evt);
        prevent(evt);
        nextTick(() => {
          proxy.show(evt);
          evt.qAnchorHandled = true;
        });
      },
      prevent,
      mobileTouch(evt) {
        anchorEvents.mobileCleanup(evt);
        if (canShow(evt) !== true) return;
        proxy.hide(evt);
        anchorEl.value.classList.add("non-selectable");
        const target = evt.target;
        addEvt(anchorEvents, "anchor", [
          [target, "touchmove", "mobileCleanup", "passive"],
          [target, "touchend", "mobileCleanup", "passive"],
          [target, "touchcancel", "mobileCleanup", "passive"],
          [anchorEl.value, "contextmenu", "prevent", "notPassive"]
        ]);
        touchTimer = setTimeout(() => {
          touchTimer = null;
          proxy.show(evt);
          evt.qAnchorHandled = true;
        }, 300);
      },
      mobileCleanup(evt) {
        anchorEl.value.classList.remove("non-selectable");
        if (touchTimer !== null) {
          clearTimeout(touchTimer);
          touchTimer = null;
        }
        if (showing.value === true && evt !== void 0) {
          clearSelection();
        }
      }
    });
    configureAnchorEl = function(context = props.contextMenu) {
      if (props.noParentEvent === true || anchorEl.value === null) return;
      let evts;
      if (context === true) {
        if (proxy.$q.platform.is.mobile === true) {
          evts = [
            [anchorEl.value, "touchstart", "mobileTouch", "passive"]
          ];
        } else {
          evts = [
            [anchorEl.value, "mousedown", "hide", "passive"],
            [anchorEl.value, "contextmenu", "contextClick", "notPassive"]
          ];
        }
      } else {
        evts = [
          [anchorEl.value, "click", "toggle", "passive"],
          [anchorEl.value, "keyup", "toggleKey", "passive"]
        ];
      }
      addEvt(anchorEvents, "anchor", evts);
    };
  }
  function unconfigureAnchorEl() {
    cleanEvt(anchorEvents, "anchor");
  }
  function setAnchorEl(el) {
    anchorEl.value = el;
    while (anchorEl.value.classList.contains("q-anchor--skip")) {
      anchorEl.value = anchorEl.value.parentNode;
    }
    configureAnchorEl();
  }
  function pickAnchorEl() {
    if (props.target === false || props.target === "" || proxy.$el.parentNode === null) {
      anchorEl.value = null;
    } else if (props.target === true) {
      setAnchorEl(proxy.$el.parentNode);
    } else {
      let el = props.target;
      if (typeof props.target === "string") {
        try {
          el = document.querySelector(props.target);
        } catch (err) {
          el = void 0;
        }
      }
      if (el !== void 0 && el !== null) {
        anchorEl.value = el.$el || el;
        configureAnchorEl();
      } else {
        anchorEl.value = null;
        console.error(`Anchor: target "${props.target}" not found`);
      }
    }
  }
  watch(() => props.contextMenu, (val) => {
    if (anchorEl.value !== null) {
      unconfigureAnchorEl();
      configureAnchorEl(val);
    }
  });
  watch(() => props.target, () => {
    if (anchorEl.value !== null) {
      unconfigureAnchorEl();
    }
    pickAnchorEl();
  });
  watch(() => props.noParentEvent, (val) => {
    if (anchorEl.value !== null) {
      if (val === true) {
        unconfigureAnchorEl();
      } else {
        configureAnchorEl();
      }
    }
  });
  onMounted(() => {
    pickAnchorEl();
    if (avoidEmit !== true && props.modelValue === true && anchorEl.value === null) {
      emit("update:modelValue", false);
    }
  });
  onBeforeUnmount(() => {
    touchTimer !== null && clearTimeout(touchTimer);
    unconfigureAnchorEl();
  });
  return {
    anchorEl,
    canShow,
    anchorEvents
  };
}
function useScrollTarget(props, configureScrollTarget) {
  const localScrollTarget = ref(null);
  let scrollFn;
  function changeScrollEvent(scrollTarget, fn) {
    const fnProp = `${fn !== void 0 ? "add" : "remove"}EventListener`;
    const fnHandler = fn !== void 0 ? fn : scrollFn;
    if (scrollTarget !== window) {
      scrollTarget[fnProp]("scroll", fnHandler, listenOpts.passive);
    }
    window[fnProp]("scroll", fnHandler, listenOpts.passive);
    scrollFn = fn;
  }
  function unconfigureScrollTarget() {
    if (localScrollTarget.value !== null) {
      changeScrollEvent(localScrollTarget.value);
      localScrollTarget.value = null;
    }
  }
  const noParentEventWatcher = watch(() => props.noParentEvent, () => {
    if (localScrollTarget.value !== null) {
      unconfigureScrollTarget();
      configureScrollTarget();
    }
  });
  onBeforeUnmount(noParentEventWatcher);
  return {
    localScrollTarget,
    unconfigureScrollTarget,
    changeScrollEvent
  };
}
const { notPassiveCapture } = listenOpts, registeredList = [];
function globalHandler(evt) {
  const target = evt.target;
  if (target === void 0 || target.nodeType === 8 || target.classList.contains("no-pointer-events") === true) return;
  let portalIndex = portalProxyList.length - 1;
  while (portalIndex >= 0) {
    const proxy = portalProxyList[portalIndex].$;
    if (proxy.type.name === "QTooltip") {
      portalIndex--;
      continue;
    }
    if (proxy.type.name !== "QDialog") {
      break;
    }
    if (proxy.props.seamless !== true) return;
    portalIndex--;
  }
  for (let i = registeredList.length - 1; i >= 0; i--) {
    const state = registeredList[i];
    if ((state.anchorEl.value === null || state.anchorEl.value.contains(target) === false) && (target === document.body || state.innerRef.value !== null && state.innerRef.value.contains(target) === false)) {
      evt.qClickOutside = true;
      state.onClickOutside(evt);
    } else {
      return;
    }
  }
}
function addClickOutside(clickOutsideProps) {
  registeredList.push(clickOutsideProps);
  if (registeredList.length === 1) {
    document.addEventListener("mousedown", globalHandler, notPassiveCapture);
    document.addEventListener("touchstart", globalHandler, notPassiveCapture);
  }
}
function removeClickOutside(clickOutsideProps) {
  const index = registeredList.findIndex((h2) => h2 === clickOutsideProps);
  if (index !== -1) {
    registeredList.splice(index, 1);
    if (registeredList.length === 0) {
      document.removeEventListener("mousedown", globalHandler, notPassiveCapture);
      document.removeEventListener("touchstart", globalHandler, notPassiveCapture);
    }
  }
}
let vpLeft, vpTop;
function validatePosition(pos) {
  const parts = pos.split(" ");
  if (parts.length !== 2) {
    return false;
  }
  if (["top", "center", "bottom"].includes(parts[0]) !== true) {
    console.error("Anchor/Self position must start with one of top/center/bottom");
    return false;
  }
  if (["left", "middle", "right", "start", "end"].includes(parts[1]) !== true) {
    console.error("Anchor/Self position must end with one of left/middle/right/start/end");
    return false;
  }
  return true;
}
function validateOffset(val) {
  if (!val) {
    return true;
  }
  if (val.length !== 2) {
    return false;
  }
  if (typeof val[0] !== "number" || typeof val[1] !== "number") {
    return false;
  }
  return true;
}
const horizontalPos = {
  "start#ltr": "left",
  "start#rtl": "right",
  "end#ltr": "right",
  "end#rtl": "left"
};
["left", "middle", "right"].forEach((pos) => {
  horizontalPos[`${pos}#ltr`] = pos;
  horizontalPos[`${pos}#rtl`] = pos;
});
function parsePosition(pos, rtl) {
  const parts = pos.split(" ");
  return {
    vertical: parts[0],
    horizontal: horizontalPos[`${parts[1]}#${rtl === true ? "rtl" : "ltr"}`]
  };
}
function getAnchorProps(el, offset) {
  let { top, left, right, bottom, width, height } = el.getBoundingClientRect();
  if (offset !== void 0) {
    top -= offset[1];
    left -= offset[0];
    bottom += offset[1];
    right += offset[0];
    width += offset[0];
    height += offset[1];
  }
  return {
    top,
    bottom,
    height,
    left,
    right,
    width,
    middle: left + (right - left) / 2,
    center: top + (bottom - top) / 2
  };
}
function getAbsoluteAnchorProps(el, absoluteOffset, offset) {
  let { top, left } = el.getBoundingClientRect();
  top += absoluteOffset.top;
  left += absoluteOffset.left;
  if (offset !== void 0) {
    top += offset[1];
    left += offset[0];
  }
  return {
    top,
    bottom: top + 1,
    height: 1,
    left,
    right: left + 1,
    width: 1,
    middle: left,
    center: top
  };
}
function getTargetProps(width, height) {
  return {
    top: 0,
    center: height / 2,
    bottom: height,
    left: 0,
    middle: width / 2,
    right: width
  };
}
function getTopLeftProps(anchorProps, targetProps, anchorOrigin, selfOrigin) {
  return {
    top: anchorProps[anchorOrigin.vertical] - targetProps[selfOrigin.vertical],
    left: anchorProps[anchorOrigin.horizontal] - targetProps[selfOrigin.horizontal]
  };
}
function setPosition(cfg, retryNumber = 0) {
  if (cfg.targetEl === null || cfg.anchorEl === null || retryNumber > 5) return;
  if (cfg.targetEl.offsetHeight === 0 || cfg.targetEl.offsetWidth === 0) {
    setTimeout(() => {
      setPosition(cfg, retryNumber + 1);
    }, 10);
    return;
  }
  const {
    targetEl,
    offset,
    anchorEl,
    anchorOrigin,
    selfOrigin,
    absoluteOffset,
    fit,
    cover,
    maxHeight,
    maxWidth
  } = cfg;
  if (client.is.ios === true && window.visualViewport !== void 0) {
    const el = document.body.style;
    const { offsetLeft: left, offsetTop: top } = window.visualViewport;
    if (left !== vpLeft) {
      el.setProperty("--q-pe-left", left + "px");
      vpLeft = left;
    }
    if (top !== vpTop) {
      el.setProperty("--q-pe-top", top + "px");
      vpTop = top;
    }
  }
  const { scrollLeft, scrollTop } = targetEl;
  const anchorProps = absoluteOffset === void 0 ? getAnchorProps(anchorEl, cover === true ? [0, 0] : offset) : getAbsoluteAnchorProps(anchorEl, absoluteOffset, offset);
  Object.assign(targetEl.style, {
    top: 0,
    left: 0,
    minWidth: null,
    minHeight: null,
    maxWidth,
    maxHeight,
    visibility: "visible"
  });
  const { offsetWidth: origElWidth, offsetHeight: origElHeight } = targetEl;
  const { elWidth, elHeight } = fit === true || cover === true ? { elWidth: Math.max(anchorProps.width, origElWidth), elHeight: cover === true ? Math.max(anchorProps.height, origElHeight) : origElHeight } : { elWidth: origElWidth, elHeight: origElHeight };
  let elStyle = { maxWidth, maxHeight };
  if (fit === true || cover === true) {
    elStyle.minWidth = anchorProps.width + "px";
    if (cover === true) {
      elStyle.minHeight = anchorProps.height + "px";
    }
  }
  Object.assign(targetEl.style, elStyle);
  const targetProps = getTargetProps(elWidth, elHeight);
  let props = getTopLeftProps(anchorProps, targetProps, anchorOrigin, selfOrigin);
  if (absoluteOffset === void 0 || offset === void 0) {
    applyBoundaries(props, anchorProps, targetProps, anchorOrigin, selfOrigin);
  } else {
    const { top, left } = props;
    applyBoundaries(props, anchorProps, targetProps, anchorOrigin, selfOrigin);
    let hasChanged = false;
    if (props.top !== top) {
      hasChanged = true;
      const offsetY = 2 * offset[1];
      anchorProps.center = anchorProps.top -= offsetY;
      anchorProps.bottom -= offsetY + 2;
    }
    if (props.left !== left) {
      hasChanged = true;
      const offsetX = 2 * offset[0];
      anchorProps.middle = anchorProps.left -= offsetX;
      anchorProps.right -= offsetX + 2;
    }
    if (hasChanged === true) {
      props = getTopLeftProps(anchorProps, targetProps, anchorOrigin, selfOrigin);
      applyBoundaries(props, anchorProps, targetProps, anchorOrigin, selfOrigin);
    }
  }
  elStyle = {
    top: props.top + "px",
    left: props.left + "px"
  };
  if (props.maxHeight !== void 0) {
    elStyle.maxHeight = props.maxHeight + "px";
    if (anchorProps.height > props.maxHeight) {
      elStyle.minHeight = elStyle.maxHeight;
    }
  }
  if (props.maxWidth !== void 0) {
    elStyle.maxWidth = props.maxWidth + "px";
    if (anchorProps.width > props.maxWidth) {
      elStyle.minWidth = elStyle.maxWidth;
    }
  }
  Object.assign(targetEl.style, elStyle);
  if (targetEl.scrollTop !== scrollTop) {
    targetEl.scrollTop = scrollTop;
  }
  if (targetEl.scrollLeft !== scrollLeft) {
    targetEl.scrollLeft = scrollLeft;
  }
}
function applyBoundaries(props, anchorProps, targetProps, anchorOrigin, selfOrigin) {
  const currentHeight = targetProps.bottom, currentWidth = targetProps.right, margin = getScrollbarWidth(), innerHeight = window.innerHeight - margin, innerWidth = document.body.clientWidth;
  if (props.top < 0 || props.top + currentHeight > innerHeight) {
    if (selfOrigin.vertical === "center") {
      props.top = anchorProps[anchorOrigin.vertical] > innerHeight / 2 ? Math.max(0, innerHeight - currentHeight) : 0;
      props.maxHeight = Math.min(currentHeight, innerHeight);
    } else if (anchorProps[anchorOrigin.vertical] > innerHeight / 2) {
      const anchorY = Math.min(
        innerHeight,
        anchorOrigin.vertical === "center" ? anchorProps.center : anchorOrigin.vertical === selfOrigin.vertical ? anchorProps.bottom : anchorProps.top
      );
      props.maxHeight = Math.min(currentHeight, anchorY);
      props.top = Math.max(0, anchorY - currentHeight);
    } else {
      props.top = Math.max(
        0,
        anchorOrigin.vertical === "center" ? anchorProps.center : anchorOrigin.vertical === selfOrigin.vertical ? anchorProps.top : anchorProps.bottom
      );
      props.maxHeight = Math.min(currentHeight, innerHeight - props.top);
    }
  }
  if (props.left < 0 || props.left + currentWidth > innerWidth) {
    props.maxWidth = Math.min(currentWidth, innerWidth);
    if (selfOrigin.horizontal === "middle") {
      props.left = anchorProps[anchorOrigin.horizontal] > innerWidth / 2 ? Math.max(0, innerWidth - currentWidth) : 0;
    } else if (anchorProps[anchorOrigin.horizontal] > innerWidth / 2) {
      const anchorX = Math.min(
        innerWidth,
        anchorOrigin.horizontal === "middle" ? anchorProps.middle : anchorOrigin.horizontal === selfOrigin.horizontal ? anchorProps.right : anchorProps.left
      );
      props.maxWidth = Math.min(currentWidth, anchorX);
      props.left = Math.max(0, anchorX - props.maxWidth);
    } else {
      props.left = Math.max(
        0,
        anchorOrigin.horizontal === "middle" ? anchorProps.middle : anchorOrigin.horizontal === selfOrigin.horizontal ? anchorProps.left : anchorProps.right
      );
      props.maxWidth = Math.min(currentWidth, innerWidth - props.left);
    }
  }
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function getAugmentedNamespace(n) {
  if (Object.prototype.hasOwnProperty.call(n, "__esModule")) return n;
  var f = n.default;
  if (typeof f == "function") {
    var a = function a2() {
      if (this instanceof a2) {
        return Reflect.construct(f, arguments, this.constructor);
      }
      return f.apply(this, arguments);
    };
    a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, "__esModule", { value: true });
  Object.keys(n).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n[k];
      }
    });
  });
  return a;
}
export {
  usePortal as A,
  addClickOutside as B,
  removeClickOutside as C,
  setPosition as D,
  removeFocusFn as E,
  useAnchorProps as F,
  closePortalMenus as G,
  getHorizontalScrollPosition as H,
  hasScrollbar as I,
  getPortalProxy as J,
  closePortals as K,
  setHorizontalScrollPosition as L,
  getDefaultExportFromCjs as a,
  addFocusout as b,
  commonjsGlobal as c,
  clearSelection as d,
  useModelToggleEmits as e,
  useModelToggleProps as f,
  getAugmentedNamespace as g,
  useModelToggle as h,
  getScrollHeight as i,
  getVerticalScrollPosition as j,
  setVerticalScrollPosition as k,
  getScrollTarget as l,
  useTransitionProps as m,
  addFocusFn as n,
  getScrollbarWidth as o,
  validatePosition as p,
  useAnchorStaticProps as q,
  removeFocusout as r,
  scrollTargetProp as s,
  parsePosition as t,
  useTimeout as u,
  validateOffset as v,
  useTick as w,
  useTransition as x,
  useScrollTarget as y,
  useAnchor as z
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX2NvbW1vbmpzSGVscGVycy1CcnVRdDQ2VC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvdXNlLXRpbWVvdXQvdXNlLXRpbWVvdXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy91c2UtdGljay91c2UtdGljay5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLW1vZGVsLXRvZ2dsZS91c2UtbW9kZWwtdG9nZ2xlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtdHJhbnNpdGlvbi91c2UtdHJhbnNpdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3ByaXZhdGUuZm9jdXMvZm9jdXMtbWFuYWdlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3ByaXZhdGUucG9ydGFsL3BvcnRhbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLXBvcnRhbC91c2UtcG9ydGFsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvc2Nyb2xsL3Njcm9sbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3ByaXZhdGUuZm9jdXMvZm9jdXNvdXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9wcml2YXRlLnNlbGVjdGlvbi9zZWxlY3Rpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1hbmNob3IvdXNlLWFuY2hvci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLXNjcm9sbC10YXJnZXQvdXNlLXNjcm9sbC10YXJnZXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9wcml2YXRlLmNsaWNrLW91dHNpZGUvY2xpY2stb3V0c2lkZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3ByaXZhdGUucG9zaXRpb24tZW5naW5lL3Bvc2l0aW9uLWVuZ2luZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBvbkRlYWN0aXZhdGVkLCBvbkJlZm9yZVVubW91bnQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgdm1Jc0Rlc3Ryb3llZCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUudm0vdm0uanMnXG5cbi8qXG4gKiBVc2FnZTpcbiAqICAgIHJlZ2lzdGVyVGltZW91dChmblssIGRlbGF5XSlcbiAqICAgIHJlbW92ZVRpbWVvdXQoKVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgbGV0IHRpbWVyID0gbnVsbFxuICBjb25zdCB2bSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgZnVuY3Rpb24gcmVtb3ZlVGltZW91dCAoKSB7XG4gICAgaWYgKHRpbWVyICE9PSBudWxsKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICB0aW1lciA9IG51bGxcbiAgICB9XG4gIH1cblxuICBvbkRlYWN0aXZhdGVkKHJlbW92ZVRpbWVvdXQpXG4gIG9uQmVmb3JlVW5tb3VudChyZW1vdmVUaW1lb3V0KVxuXG4gIHJldHVybiB7XG4gICAgcmVtb3ZlVGltZW91dCxcblxuICAgIHJlZ2lzdGVyVGltZW91dCAoZm4sIGRlbGF5KSB7XG4gICAgICByZW1vdmVUaW1lb3V0KClcblxuICAgICAgaWYgKHZtSXNEZXN0cm95ZWQodm0pID09PSBmYWxzZSkge1xuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRpbWVyID0gbnVsbFxuICAgICAgICAgIGZuKClcbiAgICAgICAgfSwgZGVsYXkpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBuZXh0VGljaywgb25EZWFjdGl2YXRlZCwgb25CZWZvcmVVbm1vdW50LCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IHZtSXNEZXN0cm95ZWQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnZtL3ZtLmpzJ1xuXG4vKlxuICogVXNhZ2U6XG4gKiAgICByZWdpc3RlclRpY2soZm4pXG4gKiAgICByZW1vdmVUaWNrKClcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIGxldCB0aWNrRm5cbiAgY29uc3Qgdm0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gIGZ1bmN0aW9uIHJlbW92ZVRpY2sgKCkge1xuICAgIHRpY2tGbiA9IHZvaWQgMFxuICB9XG5cbiAgb25EZWFjdGl2YXRlZChyZW1vdmVUaWNrKVxuICBvbkJlZm9yZVVubW91bnQocmVtb3ZlVGljaylcblxuICByZXR1cm4ge1xuICAgIHJlbW92ZVRpY2ssXG5cbiAgICByZWdpc3RlclRpY2sgKGZuKSB7XG4gICAgICB0aWNrRm4gPSBmblxuXG4gICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgIGlmICh0aWNrRm4gPT09IGZuKSB7XG4gICAgICAgICAgLy8gd2UgYWxzbyBjaGVjayBpZiBWTSBpcyBkZXN0cm95ZWQsIHNpbmNlIGlmIGl0XG4gICAgICAgICAgLy8gZ290IHRvIHRyaWdnZXIgb25lIG5leHRUaWNrKCkgd2UgY2Fubm90IHN0b3AgaXRcbiAgICAgICAgICB2bUlzRGVzdHJveWVkKHZtKSA9PT0gZmFsc2UgJiYgdGlja0ZuKClcbiAgICAgICAgICB0aWNrRm4gPSB2b2lkIDBcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IHdhdGNoLCBuZXh0VGljaywgb25Nb3VudGVkLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IHZtSGFzUm91dGVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS52bS92bS5qcydcblxuZXhwb3J0IGNvbnN0IHVzZU1vZGVsVG9nZ2xlUHJvcHMgPSB7XG4gIG1vZGVsVmFsdWU6IHtcbiAgICB0eXBlOiBCb29sZWFuLFxuICAgIGRlZmF1bHQ6IG51bGxcbiAgfSxcblxuICAnb25VcGRhdGU6bW9kZWxWYWx1ZSc6IFsgRnVuY3Rpb24sIEFycmF5IF1cbn1cblxuZXhwb3J0IGNvbnN0IHVzZU1vZGVsVG9nZ2xlRW1pdHMgPSBbXG4gICdiZWZvcmVTaG93JywgJ3Nob3cnLCAnYmVmb3JlSGlkZScsICdoaWRlJ1xuXVxuXG4vLyBoYW5kbGVTaG93L2hhbmRsZUhpZGUgLT4gcmVtb3ZlVGljaygpLCBzZWxmICgmIGVtaXQgc2hvdylcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHtcbiAgc2hvd2luZyxcbiAgY2FuU2hvdywgLy8gb3B0aW9uYWxcbiAgaGlkZU9uUm91dGVDaGFuZ2UsIC8vIG9wdGlvbmFsXG4gIGhhbmRsZVNob3csIC8vIG9wdGlvbmFsXG4gIGhhbmRsZUhpZGUsIC8vIG9wdGlvbmFsXG4gIHByb2Nlc3NPbk1vdW50IC8vIG9wdGlvbmFsXG59KSB7XG4gIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgY29uc3QgeyBwcm9wcywgZW1pdCwgcHJveHkgfSA9IHZtXG5cbiAgbGV0IHBheWxvYWRcblxuICBmdW5jdGlvbiB0b2dnbGUgKGV2dCkge1xuICAgIGlmIChzaG93aW5nLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBoaWRlKGV2dClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBzaG93KGV2dClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzaG93IChldnQpIHtcbiAgICBpZiAoXG4gICAgICAocHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSlcbiAgICAgIHx8IChldnQ/LnFBbmNob3JIYW5kbGVkID09PSB0cnVlKVxuICAgICAgfHwgKGNhblNob3cgIT09IHZvaWQgMCAmJiBjYW5TaG93KGV2dCkgIT09IHRydWUpXG4gICAgKSByZXR1cm5cblxuICAgIGNvbnN0IGxpc3RlbmVyID0gcHJvcHNbICdvblVwZGF0ZTptb2RlbFZhbHVlJyBdICE9PSB2b2lkIDBcblxuICAgIGlmIChsaXN0ZW5lciA9PT0gdHJ1ZSAmJiBfX1FVQVNBUl9TU1JfU0VSVkVSX18gIT09IHRydWUpIHtcbiAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgdHJ1ZSlcbiAgICAgIHBheWxvYWQgPSBldnRcbiAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgaWYgKHBheWxvYWQgPT09IGV2dCkge1xuICAgICAgICAgIHBheWxvYWQgPSB2b2lkIDBcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBpZiAocHJvcHMubW9kZWxWYWx1ZSA9PT0gbnVsbCB8fCBsaXN0ZW5lciA9PT0gZmFsc2UgfHwgX19RVUFTQVJfU1NSX1NFUlZFUl9fKSB7XG4gICAgICBwcm9jZXNzU2hvdyhldnQpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcHJvY2Vzc1Nob3cgKGV2dCkge1xuICAgIGlmIChzaG93aW5nLnZhbHVlID09PSB0cnVlKSByZXR1cm5cblxuICAgIHNob3dpbmcudmFsdWUgPSB0cnVlXG5cbiAgICBlbWl0KCdiZWZvcmVTaG93JywgZXZ0KVxuXG4gICAgaWYgKGhhbmRsZVNob3cgIT09IHZvaWQgMCkge1xuICAgICAgaGFuZGxlU2hvdyhldnQpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZW1pdCgnc2hvdycsIGV2dClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBoaWRlIChldnQpIHtcbiAgICBpZiAoX19RVUFTQVJfU1NSX1NFUlZFUl9fIHx8IHByb3BzLmRpc2FibGUgPT09IHRydWUpIHJldHVyblxuXG4gICAgY29uc3QgbGlzdGVuZXIgPSBwcm9wc1sgJ29uVXBkYXRlOm1vZGVsVmFsdWUnIF0gIT09IHZvaWQgMFxuXG4gICAgaWYgKGxpc3RlbmVyID09PSB0cnVlICYmIF9fUVVBU0FSX1NTUl9TRVJWRVJfXyAhPT0gdHJ1ZSkge1xuICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBmYWxzZSlcbiAgICAgIHBheWxvYWQgPSBldnRcbiAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgaWYgKHBheWxvYWQgPT09IGV2dCkge1xuICAgICAgICAgIHBheWxvYWQgPSB2b2lkIDBcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBpZiAocHJvcHMubW9kZWxWYWx1ZSA9PT0gbnVsbCB8fCBsaXN0ZW5lciA9PT0gZmFsc2UgfHwgX19RVUFTQVJfU1NSX1NFUlZFUl9fKSB7XG4gICAgICBwcm9jZXNzSGlkZShldnQpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcHJvY2Vzc0hpZGUgKGV2dCkge1xuICAgIGlmIChzaG93aW5nLnZhbHVlID09PSBmYWxzZSkgcmV0dXJuXG5cbiAgICBzaG93aW5nLnZhbHVlID0gZmFsc2VcblxuICAgIGVtaXQoJ2JlZm9yZUhpZGUnLCBldnQpXG5cbiAgICBpZiAoaGFuZGxlSGlkZSAhPT0gdm9pZCAwKSB7XG4gICAgICBoYW5kbGVIaWRlKGV2dClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBlbWl0KCdoaWRlJywgZXZ0KVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHByb2Nlc3NNb2RlbENoYW5nZSAodmFsKSB7XG4gICAgaWYgKHByb3BzLmRpc2FibGUgPT09IHRydWUgJiYgdmFsID09PSB0cnVlKSB7XG4gICAgICBpZiAocHJvcHNbICdvblVwZGF0ZTptb2RlbFZhbHVlJyBdICE9PSB2b2lkIDApIHtcbiAgICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBmYWxzZSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoKHZhbCA9PT0gdHJ1ZSkgIT09IHNob3dpbmcudmFsdWUpIHtcbiAgICAgIGNvbnN0IGZuID0gdmFsID09PSB0cnVlID8gcHJvY2Vzc1Nob3cgOiBwcm9jZXNzSGlkZVxuICAgICAgZm4ocGF5bG9hZClcbiAgICB9XG4gIH1cblxuICB3YXRjaCgoKSA9PiBwcm9wcy5tb2RlbFZhbHVlLCBwcm9jZXNzTW9kZWxDaGFuZ2UpXG5cbiAgaWYgKGhpZGVPblJvdXRlQ2hhbmdlICE9PSB2b2lkIDAgJiYgdm1IYXNSb3V0ZXIodm0pID09PSB0cnVlKSB7XG4gICAgd2F0Y2goKCkgPT4gcHJveHkuJHJvdXRlLmZ1bGxQYXRoLCAoKSA9PiB7XG4gICAgICBpZiAoaGlkZU9uUm91dGVDaGFuZ2UudmFsdWUgPT09IHRydWUgJiYgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBoaWRlKClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgcHJvY2Vzc09uTW91bnQgPT09IHRydWUgJiYgb25Nb3VudGVkKCgpID0+IHtcbiAgICBwcm9jZXNzTW9kZWxDaGFuZ2UocHJvcHMubW9kZWxWYWx1ZSlcbiAgfSlcblxuICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgY29uc3QgcHVibGljTWV0aG9kcyA9IHsgc2hvdywgaGlkZSwgdG9nZ2xlIH1cbiAgT2JqZWN0LmFzc2lnbihwcm94eSwgcHVibGljTWV0aG9kcylcblxuICByZXR1cm4gcHVibGljTWV0aG9kc1xufVxuIiwiaW1wb3J0IHsgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmV4cG9ydCBjb25zdCB1c2VUcmFuc2l0aW9uUHJvcHMgPSB7XG4gIHRyYW5zaXRpb25TaG93OiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICAgIGRlZmF1bHQ6ICdmYWRlJ1xuICB9LFxuXG4gIHRyYW5zaXRpb25IaWRlOiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICAgIGRlZmF1bHQ6ICdmYWRlJ1xuICB9LFxuXG4gIHRyYW5zaXRpb25EdXJhdGlvbjoge1xuICAgIHR5cGU6IFsgU3RyaW5nLCBOdW1iZXIgXSxcbiAgICBkZWZhdWx0OiAzMDBcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIGRlZmF1bHRTaG93Rm4gPSAoKSA9PiB7fSwgZGVmYXVsdEhpZGVGbiA9ICgpID0+IHt9KSB7XG4gIHJldHVybiB7XG4gICAgdHJhbnNpdGlvblByb3BzOiBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBzaG93ID0gYHEtdHJhbnNpdGlvbi0tJHsgcHJvcHMudHJhbnNpdGlvblNob3cgfHwgZGVmYXVsdFNob3dGbigpIH1gXG4gICAgICBjb25zdCBoaWRlID0gYHEtdHJhbnNpdGlvbi0tJHsgcHJvcHMudHJhbnNpdGlvbkhpZGUgfHwgZGVmYXVsdEhpZGVGbigpIH1gXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFwcGVhcjogdHJ1ZSxcblxuICAgICAgICBlbnRlckZyb21DbGFzczogYCR7IHNob3cgfS1lbnRlci1mcm9tYCxcbiAgICAgICAgZW50ZXJBY3RpdmVDbGFzczogYCR7IHNob3cgfS1lbnRlci1hY3RpdmVgLFxuICAgICAgICBlbnRlclRvQ2xhc3M6IGAkeyBzaG93IH0tZW50ZXItdG9gLFxuXG4gICAgICAgIGxlYXZlRnJvbUNsYXNzOiBgJHsgaGlkZSB9LWxlYXZlLWZyb21gLFxuICAgICAgICBsZWF2ZUFjdGl2ZUNsYXNzOiBgJHsgaGlkZSB9LWxlYXZlLWFjdGl2ZWAsXG4gICAgICAgIGxlYXZlVG9DbGFzczogYCR7IGhpZGUgfS1sZWF2ZS10b2BcbiAgICAgIH1cbiAgICB9KSxcblxuICAgIHRyYW5zaXRpb25TdHlsZTogY29tcHV0ZWQoKCkgPT4gYC0tcS10cmFuc2l0aW9uLWR1cmF0aW9uOiAkeyBwcm9wcy50cmFuc2l0aW9uRHVyYXRpb24gfW1zYClcbiAgfVxufVxuIiwibGV0IHF1ZXVlID0gW11cbmxldCB3YWl0RmxhZ3MgPSBbXVxuXG5mdW5jdGlvbiBjbGVhckZsYWcgKGZsYWcpIHtcbiAgd2FpdEZsYWdzID0gd2FpdEZsYWdzLmZpbHRlcihlbnRyeSA9PiBlbnRyeSAhPT0gZmxhZylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEZvY3VzV2FpdEZsYWcgKGZsYWcpIHtcbiAgY2xlYXJGbGFnKGZsYWcpXG4gIHdhaXRGbGFncy5wdXNoKGZsYWcpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVGb2N1c1dhaXRGbGFnIChmbGFnKSB7XG4gIGNsZWFyRmxhZyhmbGFnKVxuXG4gIGlmICh3YWl0RmxhZ3MubGVuZ3RoID09PSAwICYmIHF1ZXVlLmxlbmd0aCAhPT0gMCkge1xuICAgIC8vIG9ubHkgY2FsbCBsYXN0IGZvY3VzIGhhbmRsZXIgKGNhbid0IGZvY3VzIG11bHRpcGxlIHRoaW5ncyBhdCBvbmNlKVxuICAgIHF1ZXVlWyBxdWV1ZS5sZW5ndGggLSAxIF0oKVxuICAgIHF1ZXVlID0gW11cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkRm9jdXNGbiAoZm4pIHtcbiAgaWYgKHdhaXRGbGFncy5sZW5ndGggPT09IDApIHtcbiAgICBmbigpXG4gIH1cbiAgZWxzZSB7XG4gICAgcXVldWUucHVzaChmbilcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlRm9jdXNGbiAoZm4pIHtcbiAgcXVldWUgPSBxdWV1ZS5maWx0ZXIoZW50cnkgPT4gZW50cnkgIT09IGZuKVxufVxuIiwiaW1wb3J0IHsgZ2V0UGFyZW50UHJveHkgfSBmcm9tICcuLi9wcml2YXRlLnZtL3ZtLmpzJ1xuXG5leHBvcnQgY29uc3QgcG9ydGFsUHJveHlMaXN0ID0gW11cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFBvcnRhbFByb3h5IChlbCkge1xuICByZXR1cm4gcG9ydGFsUHJveHlMaXN0LmZpbmQocHJveHkgPT5cbiAgICBwcm94eS5jb250ZW50RWwgIT09IG51bGxcbiAgICAmJiBwcm94eS5jb250ZW50RWwuY29udGFpbnMoZWwpXG4gIClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb3NlUG9ydGFsTWVudXMgKHByb3h5LCBldnQpIHtcbiAgZG8ge1xuICAgIGlmIChwcm94eS4kb3B0aW9ucy5uYW1lID09PSAnUU1lbnUnKSB7XG4gICAgICBwcm94eS5oaWRlKGV2dClcblxuICAgICAgLy8gaXMgdGhpcyBhIHBvaW50IG9mIHNlcGFyYXRpb24/XG4gICAgICBpZiAocHJveHkuJHByb3BzLnNlcGFyYXRlQ2xvc2VQb3B1cCA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gZ2V0UGFyZW50UHJveHkocHJveHkpXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHByb3h5Ll9fcVBvcnRhbCA9PT0gdHJ1ZSkge1xuICAgICAgLy8gdHJlYXQgaXQgYXMgcG9pbnQgb2Ygc2VwYXJhdGlvbiBpZiBwYXJlbnQgaXMgUVBvcHVwUHJveHlcbiAgICAgIC8vIChzbyBtb2JpbGUgbWF0Y2hlcyBkZXNrdG9wIGJlaGF2aW9yKVxuICAgICAgLy8gYW5kIGhpZGUgaXQgdG9vXG4gICAgICBjb25zdCBwYXJlbnQgPSBnZXRQYXJlbnRQcm94eShwcm94eSlcblxuICAgICAgaWYgKHBhcmVudD8uJG9wdGlvbnMubmFtZSA9PT0gJ1FQb3B1cFByb3h5Jykge1xuICAgICAgICBwcm94eS5oaWRlKGV2dClcbiAgICAgICAgcmV0dXJuIHBhcmVudFxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBwcm94eVxuICAgICAgfVxuICAgIH1cblxuICAgIHByb3h5ID0gZ2V0UGFyZW50UHJveHkocHJveHkpXG4gIH0gd2hpbGUgKHByb3h5ICE9PSB2b2lkIDAgJiYgcHJveHkgIT09IG51bGwpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbG9zZVBvcnRhbHMgKHByb3h5LCBldnQsIGRlcHRoKSB7XG4gIHdoaWxlIChkZXB0aCAhPT0gMCAmJiBwcm94eSAhPT0gdm9pZCAwICYmIHByb3h5ICE9PSBudWxsKSB7XG4gICAgaWYgKHByb3h5Ll9fcVBvcnRhbCA9PT0gdHJ1ZSkge1xuICAgICAgZGVwdGgtLVxuXG4gICAgICBpZiAocHJveHkuJG9wdGlvbnMubmFtZSA9PT0gJ1FNZW51Jykge1xuICAgICAgICBwcm94eSA9IGNsb3NlUG9ydGFsTWVudXMocHJveHksIGV2dClcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgcHJveHkuaGlkZShldnQpXG4gICAgfVxuXG4gICAgcHJveHkgPSBnZXRQYXJlbnRQcm94eShwcm94eSlcbiAgfVxufVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBvblVubW91bnRlZCwgVGVsZXBvcnQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IG5vb3AgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC9ldmVudC5qcydcbmltcG9ydCB7IGFkZEZvY3VzV2FpdEZsYWcsIHJlbW92ZUZvY3VzV2FpdEZsYWcgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmZvY3VzL2ZvY3VzLW1hbmFnZXIuanMnXG5pbXBvcnQgeyBjcmVhdGVHbG9iYWxOb2RlLCByZW1vdmVHbG9iYWxOb2RlIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jb25maWcvbm9kZXMuanMnXG5pbXBvcnQgeyBwb3J0YWxQcm94eUxpc3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnBvcnRhbC9wb3J0YWwuanMnXG5pbXBvcnQgeyBpbmplY3RQcm9wIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5pbmplY3Qtb2JqLXByb3AvaW5qZWN0LW9iai1wcm9wLmpzJ1xuXG4vKipcbiAqIE5vb3AgaW50ZXJuYWwgY29tcG9uZW50IHRvIGVhc2UgdGVzdGluZ1xuICogb2YgdGhlIHRlbGVwb3J0ZWQgY29udGVudC5cbiAqXG4gKiBjb25zdCB3cmFwcGVyID0gbW91bnQoUURpYWxvZywgeyAuLi4gfSlcbiAqIGNvbnN0IHRlbGVwb3J0ZWRXcmFwcGVyID0gd3JhcHBlci5maW5kQ29tcG9uZW50KHsgbmFtZTogJ1FQb3J0YWwnIH0pXG4gKi9cbmNvbnN0IFFQb3J0YWwgPSBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVBvcnRhbCcsXG4gIHNldHVwIChfLCB7IHNsb3RzIH0pIHtcbiAgICByZXR1cm4gKCkgPT4gc2xvdHMuZGVmYXVsdCgpXG4gIH1cbn0pXG5cbmZ1bmN0aW9uIGlzT25HbG9iYWxEaWFsb2cgKHZtKSB7XG4gIHZtID0gdm0ucGFyZW50XG5cbiAgd2hpbGUgKHZtICE9PSB2b2lkIDAgJiYgdm0gIT09IG51bGwpIHtcbiAgICBpZiAodm0udHlwZS5uYW1lID09PSAnUUdsb2JhbERpYWxvZycpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIGlmICh2bS50eXBlLm5hbWUgPT09ICdRRGlhbG9nJyB8fCB2bS50eXBlLm5hbWUgPT09ICdRTWVudScpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIHZtID0gdm0ucGFyZW50XG4gIH1cblxuICByZXR1cm4gZmFsc2Vcbn1cblxuLy8gV2FybmluZyFcbi8vIFlvdSBNVVNUIHNwZWNpZnkgXCJpbmhlcml0QXR0cnM6IGZhbHNlXCIgaW4geW91ciBjb21wb25lbnRcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHZtLCBpbm5lclJlZiwgcmVuZGVyUG9ydGFsQ29udGVudCwgdHlwZSkge1xuICAvLyBzaG93aW5nLCBpbmNsdWRpbmcgd2hpbGUgaW4gc2hvdy9oaWRlIHRyYW5zaXRpb25cbiAgY29uc3QgcG9ydGFsSXNBY3RpdmUgPSByZWYoZmFsc2UpXG5cbiAgLy8gc2hvd2luZyAmIG5vdCBpbiBhbnkgc2hvdy9oaWRlIHRyYW5zaXRpb25cbiAgY29uc3QgcG9ydGFsSXNBY2Nlc3NpYmxlID0gcmVmKGZhbHNlKVxuXG4gIGlmIChfX1FVQVNBUl9TU1JfU0VSVkVSX18pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcG9ydGFsSXNBY3RpdmUsXG4gICAgICBwb3J0YWxJc0FjY2Vzc2libGUsXG5cbiAgICAgIHNob3dQb3J0YWw6IG5vb3AsXG4gICAgICBoaWRlUG9ydGFsOiBub29wLFxuICAgICAgcmVuZGVyUG9ydGFsOiBub29wXG4gICAgfVxuICB9XG5cbiAgbGV0IHBvcnRhbEVsID0gbnVsbFxuICBjb25zdCBmb2N1c09iaiA9IHt9XG4gIGNvbnN0IG9uR2xvYmFsRGlhbG9nID0gdHlwZSA9PT0gJ2RpYWxvZycgJiYgaXNPbkdsb2JhbERpYWxvZyh2bSlcblxuICBmdW5jdGlvbiBzaG93UG9ydGFsIChpc1JlYWR5KSB7XG4gICAgaWYgKGlzUmVhZHkgPT09IHRydWUpIHtcbiAgICAgIHJlbW92ZUZvY3VzV2FpdEZsYWcoZm9jdXNPYmopXG4gICAgICBwb3J0YWxJc0FjY2Vzc2libGUudmFsdWUgPSB0cnVlXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBwb3J0YWxJc0FjY2Vzc2libGUudmFsdWUgPSBmYWxzZVxuXG4gICAgaWYgKHBvcnRhbElzQWN0aXZlLnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgaWYgKG9uR2xvYmFsRGlhbG9nID09PSBmYWxzZSAmJiBwb3J0YWxFbCA9PT0gbnVsbCkge1xuICAgICAgICBwb3J0YWxFbCA9IGNyZWF0ZUdsb2JhbE5vZGUoZmFsc2UsIHR5cGUpXG4gICAgICB9XG5cbiAgICAgIHBvcnRhbElzQWN0aXZlLnZhbHVlID0gdHJ1ZVxuXG4gICAgICAvLyByZWdpc3RlciBwb3J0YWxcbiAgICAgIHBvcnRhbFByb3h5TGlzdC5wdXNoKHZtLnByb3h5KVxuXG4gICAgICBhZGRGb2N1c1dhaXRGbGFnKGZvY3VzT2JqKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGhpZGVQb3J0YWwgKGlzUmVhZHkpIHtcbiAgICBwb3J0YWxJc0FjY2Vzc2libGUudmFsdWUgPSBmYWxzZVxuXG4gICAgaWYgKGlzUmVhZHkgIT09IHRydWUpIHJldHVyblxuXG4gICAgcmVtb3ZlRm9jdXNXYWl0RmxhZyhmb2N1c09iailcbiAgICBwb3J0YWxJc0FjdGl2ZS52YWx1ZSA9IGZhbHNlXG5cbiAgICAvLyB1bnJlZ2lzdGVyIHBvcnRhbFxuICAgIGNvbnN0IGluZGV4ID0gcG9ydGFsUHJveHlMaXN0LmluZGV4T2Yodm0ucHJveHkpXG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgcG9ydGFsUHJveHlMaXN0LnNwbGljZShpbmRleCwgMSlcbiAgICB9XG5cbiAgICBpZiAocG9ydGFsRWwgIT09IG51bGwpIHtcbiAgICAgIHJlbW92ZUdsb2JhbE5vZGUocG9ydGFsRWwpXG4gICAgICBwb3J0YWxFbCA9IG51bGxcbiAgICB9XG4gIH1cblxuICBvblVubW91bnRlZCgoKSA9PiB7IGhpZGVQb3J0YWwodHJ1ZSkgfSlcblxuICAvLyBuZWVkZWQgZm9yIHBvcnRhbCB2bSBkZXRlY3Rpb25cbiAgdm0ucHJveHkuX19xUG9ydGFsID0gdHJ1ZVxuXG4gIC8vIHB1YmxpYyB3YXkgb2YgYWNjZXNzaW5nIHRoZSByZW5kZXJlZCBjb250ZW50XG4gIGluamVjdFByb3Aodm0ucHJveHksICdjb250ZW50RWwnLCAoKSA9PiBpbm5lclJlZi52YWx1ZSlcblxuICByZXR1cm4ge1xuICAgIHNob3dQb3J0YWwsXG4gICAgaGlkZVBvcnRhbCxcblxuICAgIHBvcnRhbElzQWN0aXZlLFxuICAgIHBvcnRhbElzQWNjZXNzaWJsZSxcblxuICAgIHJlbmRlclBvcnRhbDogKCkgPT4gKFxuICAgICAgb25HbG9iYWxEaWFsb2cgPT09IHRydWVcbiAgICAgICAgPyByZW5kZXJQb3J0YWxDb250ZW50KClcbiAgICAgICAgOiAoXG4gICAgICAgICAgICBwb3J0YWxJc0FjdGl2ZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgICAgICA/IFsgaChUZWxlcG9ydCwgeyB0bzogcG9ydGFsRWwgfSwgaChRUG9ydGFsLCByZW5kZXJQb3J0YWxDb250ZW50KSkgXVxuICAgICAgICAgICAgICA6IHZvaWQgMFxuICAgICAgICAgIClcbiAgICApXG4gIH1cbn1cbiIsImltcG9ydCB7IGNzcywgZ2V0RWxlbWVudCB9IGZyb20gJy4uL2RvbS9kb20uanMnXG5cbmV4cG9ydCBjb25zdCBzY3JvbGxUYXJnZXRQcm9wID0gX19RVUFTQVJfU1NSX1NFUlZFUl9fXG4gID8ge30gLyogU1NSIGRvZXMgbm90IGtub3cgYWJvdXQgRWxlbWVudCAqL1xuICA6IFsgRWxlbWVudCwgU3RyaW5nIF1cblxuY29uc3Qgc2Nyb2xsVGFyZ2V0cyA9IF9fUVVBU0FSX1NTUl9TRVJWRVJfX1xuICA/IFtdXG4gIDogWyBudWxsLCBkb2N1bWVudCwgZG9jdW1lbnQuYm9keSwgZG9jdW1lbnQuc2Nyb2xsaW5nRWxlbWVudCwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IF1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNjcm9sbFRhcmdldCAoZWwsIHRhcmdldEVsKSB7XG4gIGxldCB0YXJnZXQgPSBnZXRFbGVtZW50KHRhcmdldEVsKVxuXG4gIGlmICh0YXJnZXQgPT09IHZvaWQgMCkge1xuICAgIGlmIChlbCA9PT0gdm9pZCAwIHx8IGVsID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gd2luZG93XG4gICAgfVxuXG4gICAgdGFyZ2V0ID0gZWwuY2xvc2VzdCgnLnNjcm9sbCwuc2Nyb2xsLXksLm92ZXJmbG93LWF1dG8nKVxuICB9XG5cbiAgcmV0dXJuIHNjcm9sbFRhcmdldHMuaW5jbHVkZXModGFyZ2V0KVxuICAgID8gd2luZG93XG4gICAgOiB0YXJnZXRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNjcm9sbEhlaWdodCAoZWwpIHtcbiAgcmV0dXJuIChlbCA9PT0gd2luZG93ID8gZG9jdW1lbnQuYm9keSA6IGVsKS5zY3JvbGxIZWlnaHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNjcm9sbFdpZHRoIChlbCkge1xuICByZXR1cm4gKGVsID09PSB3aW5kb3cgPyBkb2N1bWVudC5ib2R5IDogZWwpLnNjcm9sbFdpZHRoXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRWZXJ0aWNhbFNjcm9sbFBvc2l0aW9uIChzY3JvbGxUYXJnZXQpIHtcbiAgcmV0dXJuIHNjcm9sbFRhcmdldCA9PT0gd2luZG93XG4gICAgPyB3aW5kb3cucGFnZVlPZmZzZXQgfHwgd2luZG93LnNjcm9sbFkgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgfHwgMFxuICAgIDogc2Nyb2xsVGFyZ2V0LnNjcm9sbFRvcFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SG9yaXpvbnRhbFNjcm9sbFBvc2l0aW9uIChzY3JvbGxUYXJnZXQpIHtcbiAgcmV0dXJuIHNjcm9sbFRhcmdldCA9PT0gd2luZG93XG4gICAgPyB3aW5kb3cucGFnZVhPZmZzZXQgfHwgd2luZG93LnNjcm9sbFggfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0IHx8IDBcbiAgICA6IHNjcm9sbFRhcmdldC5zY3JvbGxMZWZ0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhbmltVmVydGljYWxTY3JvbGxUbyAoZWwsIHRvLCBkdXJhdGlvbiA9IDAgLyogLCBwcmV2VGltZSAqLykge1xuICBjb25zdCBwcmV2VGltZSA9IGFyZ3VtZW50c1sgMyBdID09PSB2b2lkIDAgPyBwZXJmb3JtYW5jZS5ub3coKSA6IGFyZ3VtZW50c1sgMyBdXG4gIGNvbnN0IHBvcyA9IGdldFZlcnRpY2FsU2Nyb2xsUG9zaXRpb24oZWwpXG5cbiAgaWYgKGR1cmF0aW9uIDw9IDApIHtcbiAgICBpZiAocG9zICE9PSB0bykge1xuICAgICAgc2V0U2Nyb2xsKGVsLCB0bylcbiAgICB9XG4gICAgcmV0dXJuXG4gIH1cblxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobm93VGltZSA9PiB7XG4gICAgY29uc3QgZnJhbWVUaW1lID0gbm93VGltZSAtIHByZXZUaW1lXG4gICAgY29uc3QgbmV3UG9zID0gcG9zICsgKHRvIC0gcG9zKSAvIE1hdGgubWF4KGZyYW1lVGltZSwgZHVyYXRpb24pICogZnJhbWVUaW1lXG4gICAgc2V0U2Nyb2xsKGVsLCBuZXdQb3MpXG4gICAgaWYgKG5ld1BvcyAhPT0gdG8pIHtcbiAgICAgIGFuaW1WZXJ0aWNhbFNjcm9sbFRvKGVsLCB0bywgZHVyYXRpb24gLSBmcmFtZVRpbWUsIG5vd1RpbWUpXG4gICAgfVxuICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYW5pbUhvcml6b250YWxTY3JvbGxUbyAoZWwsIHRvLCBkdXJhdGlvbiA9IDAgLyogLCBwcmV2VGltZSAqLykge1xuICBjb25zdCBwcmV2VGltZSA9IGFyZ3VtZW50c1sgMyBdID09PSB2b2lkIDAgPyBwZXJmb3JtYW5jZS5ub3coKSA6IGFyZ3VtZW50c1sgMyBdXG4gIGNvbnN0IHBvcyA9IGdldEhvcml6b250YWxTY3JvbGxQb3NpdGlvbihlbClcblxuICBpZiAoZHVyYXRpb24gPD0gMCkge1xuICAgIGlmIChwb3MgIT09IHRvKSB7XG4gICAgICBzZXRIb3Jpem9udGFsU2Nyb2xsKGVsLCB0bylcbiAgICB9XG4gICAgcmV0dXJuXG4gIH1cblxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobm93VGltZSA9PiB7XG4gICAgY29uc3QgZnJhbWVUaW1lID0gbm93VGltZSAtIHByZXZUaW1lXG4gICAgY29uc3QgbmV3UG9zID0gcG9zICsgKHRvIC0gcG9zKSAvIE1hdGgubWF4KGZyYW1lVGltZSwgZHVyYXRpb24pICogZnJhbWVUaW1lXG4gICAgc2V0SG9yaXpvbnRhbFNjcm9sbChlbCwgbmV3UG9zKVxuICAgIGlmIChuZXdQb3MgIT09IHRvKSB7XG4gICAgICBhbmltSG9yaXpvbnRhbFNjcm9sbFRvKGVsLCB0bywgZHVyYXRpb24gLSBmcmFtZVRpbWUsIG5vd1RpbWUpXG4gICAgfVxuICB9KVxufVxuXG5mdW5jdGlvbiBzZXRTY3JvbGwgKHNjcm9sbFRhcmdldCwgb2Zmc2V0KSB7XG4gIGlmIChzY3JvbGxUYXJnZXQgPT09IHdpbmRvdykge1xuICAgIHdpbmRvdy5zY3JvbGxUbyh3aW5kb3cucGFnZVhPZmZzZXQgfHwgd2luZG93LnNjcm9sbFggfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0IHx8IDAsIG9mZnNldClcbiAgICByZXR1cm5cbiAgfVxuICBzY3JvbGxUYXJnZXQuc2Nyb2xsVG9wID0gb2Zmc2V0XG59XG5cbmZ1bmN0aW9uIHNldEhvcml6b250YWxTY3JvbGwgKHNjcm9sbFRhcmdldCwgb2Zmc2V0KSB7XG4gIGlmIChzY3JvbGxUYXJnZXQgPT09IHdpbmRvdykge1xuICAgIHdpbmRvdy5zY3JvbGxUbyhvZmZzZXQsIHdpbmRvdy5wYWdlWU9mZnNldCB8fCB3aW5kb3cuc2Nyb2xsWSB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCB8fCAwKVxuICAgIHJldHVyblxuICB9XG4gIHNjcm9sbFRhcmdldC5zY3JvbGxMZWZ0ID0gb2Zmc2V0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRWZXJ0aWNhbFNjcm9sbFBvc2l0aW9uIChzY3JvbGxUYXJnZXQsIG9mZnNldCwgZHVyYXRpb24pIHtcbiAgaWYgKGR1cmF0aW9uKSB7XG4gICAgYW5pbVZlcnRpY2FsU2Nyb2xsVG8oc2Nyb2xsVGFyZ2V0LCBvZmZzZXQsIGR1cmF0aW9uKVxuICAgIHJldHVyblxuICB9XG4gIHNldFNjcm9sbChzY3JvbGxUYXJnZXQsIG9mZnNldClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEhvcml6b250YWxTY3JvbGxQb3NpdGlvbiAoc2Nyb2xsVGFyZ2V0LCBvZmZzZXQsIGR1cmF0aW9uKSB7XG4gIGlmIChkdXJhdGlvbikge1xuICAgIGFuaW1Ib3Jpem9udGFsU2Nyb2xsVG8oc2Nyb2xsVGFyZ2V0LCBvZmZzZXQsIGR1cmF0aW9uKVxuICAgIHJldHVyblxuICB9XG4gIHNldEhvcml6b250YWxTY3JvbGwoc2Nyb2xsVGFyZ2V0LCBvZmZzZXQpXG59XG5cbmxldCBzaXplXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2Nyb2xsYmFyV2lkdGggKCkge1xuICBpZiAoc2l6ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHNpemVcbiAgfVxuXG4gIGNvbnN0XG4gICAgaW5uZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyksXG4gICAgb3V0ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXG4gIGNzcyhpbm5lciwge1xuICAgIHdpZHRoOiAnMTAwJScsXG4gICAgaGVpZ2h0OiAnMjAwcHgnXG4gIH0pXG4gIGNzcyhvdXRlciwge1xuICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgIHRvcDogJzBweCcsXG4gICAgbGVmdDogJzBweCcsXG4gICAgdmlzaWJpbGl0eTogJ2hpZGRlbicsXG4gICAgd2lkdGg6ICcyMDBweCcsXG4gICAgaGVpZ2h0OiAnMTUwcHgnLFxuICAgIG92ZXJmbG93OiAnaGlkZGVuJ1xuICB9KVxuXG4gIG91dGVyLmFwcGVuZENoaWxkKGlubmVyKVxuXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQob3V0ZXIpXG5cbiAgY29uc3QgdzEgPSBpbm5lci5vZmZzZXRXaWR0aFxuICBvdXRlci5zdHlsZS5vdmVyZmxvdyA9ICdzY3JvbGwnXG4gIGxldCB3MiA9IGlubmVyLm9mZnNldFdpZHRoXG5cbiAgaWYgKHcxID09PSB3Mikge1xuICAgIHcyID0gb3V0ZXIuY2xpZW50V2lkdGhcbiAgfVxuXG4gIG91dGVyLnJlbW92ZSgpXG4gIHNpemUgPSB3MSAtIHcyXG5cbiAgcmV0dXJuIHNpemVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc1Njcm9sbGJhciAoZWwsIG9uWSA9IHRydWUpIHtcbiAgaWYgKCFlbCB8fCBlbC5ub2RlVHlwZSAhPT0gTm9kZS5FTEVNRU5UX05PREUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHJldHVybiBvbllcbiAgICA/IChcbiAgICAgICAgZWwuc2Nyb2xsSGVpZ2h0ID4gZWwuY2xpZW50SGVpZ2h0ICYmIChcbiAgICAgICAgICBlbC5jbGFzc0xpc3QuY29udGFpbnMoJ3Njcm9sbCcpXG4gICAgICAgICAgfHwgZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdvdmVyZmxvdy1hdXRvJylcbiAgICAgICAgICB8fCBbICdhdXRvJywgJ3Njcm9sbCcgXS5pbmNsdWRlcyh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbClbICdvdmVyZmxvdy15JyBdKVxuICAgICAgICApXG4gICAgICApXG4gICAgOiAoXG4gICAgICAgIGVsLnNjcm9sbFdpZHRoID4gZWwuY2xpZW50V2lkdGggJiYgKFxuICAgICAgICAgIGVsLmNsYXNzTGlzdC5jb250YWlucygnc2Nyb2xsJylcbiAgICAgICAgICB8fCBlbC5jbGFzc0xpc3QuY29udGFpbnMoJ292ZXJmbG93LWF1dG8nKVxuICAgICAgICAgIHx8IFsgJ2F1dG8nLCAnc2Nyb2xsJyBdLmluY2x1ZGVzKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKVsgJ292ZXJmbG93LXgnIF0pXG4gICAgICAgIClcbiAgICAgIClcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBnZXRTY3JvbGxUYXJnZXQsXG5cbiAgZ2V0U2Nyb2xsSGVpZ2h0LFxuICBnZXRTY3JvbGxXaWR0aCxcblxuICBnZXRWZXJ0aWNhbFNjcm9sbFBvc2l0aW9uLFxuICBnZXRIb3Jpem9udGFsU2Nyb2xsUG9zaXRpb24sXG5cbiAgYW5pbVZlcnRpY2FsU2Nyb2xsVG8sXG4gIGFuaW1Ib3Jpem9udGFsU2Nyb2xsVG8sXG5cbiAgc2V0VmVydGljYWxTY3JvbGxQb3NpdGlvbixcbiAgc2V0SG9yaXpvbnRhbFNjcm9sbFBvc2l0aW9uLFxuXG4gIGdldFNjcm9sbGJhcldpZHRoLFxuICBoYXNTY3JvbGxiYXJcbn1cbiIsImltcG9ydCB7IGNsaWVudCB9IGZyb20gJy4uLy4uL3BsdWdpbnMvcGxhdGZvcm0vUGxhdGZvcm0uanMnXG5cbmNvbnN0IGhhbmRsZXJzID0gW11cblxuZnVuY3Rpb24gdHJpZ2dlciAoZSkge1xuICBoYW5kbGVyc1sgaGFuZGxlcnMubGVuZ3RoIC0gMSBdKGUpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRGb2N1c291dCAoZm4pIHtcbiAgaWYgKGNsaWVudC5pcy5kZXNrdG9wID09PSB0cnVlKSB7XG4gICAgaGFuZGxlcnMucHVzaChmbilcblxuICAgIGlmIChoYW5kbGVycy5sZW5ndGggPT09IDEpIHtcbiAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNpbicsIHRyaWdnZXIpXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVGb2N1c291dCAoZm4pIHtcbiAgY29uc3QgaW5kZXggPSBoYW5kbGVycy5pbmRleE9mKGZuKVxuICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgaGFuZGxlcnMuc3BsaWNlKGluZGV4LCAxKVxuXG4gICAgaWYgKGhhbmRsZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1c2luJywgdHJpZ2dlcilcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBQbGF0Zm9ybSBmcm9tICcuLi8uLi9wbHVnaW5zL3BsYXRmb3JtL1BsYXRmb3JtLmpzJ1xuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJTZWxlY3Rpb24gKCkge1xuICBpZiAod2luZG93LmdldFNlbGVjdGlvbiAhPT0gdm9pZCAwKSB7XG4gICAgY29uc3Qgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpXG4gICAgaWYgKHNlbGVjdGlvbi5lbXB0eSAhPT0gdm9pZCAwKSB7XG4gICAgICBzZWxlY3Rpb24uZW1wdHkoKVxuICAgIH1cbiAgICBlbHNlIGlmIChzZWxlY3Rpb24ucmVtb3ZlQWxsUmFuZ2VzICE9PSB2b2lkIDApIHtcbiAgICAgIHNlbGVjdGlvbi5yZW1vdmVBbGxSYW5nZXMoKVxuICAgICAgUGxhdGZvcm0uaXMubW9iaWxlICE9PSB0cnVlICYmIHNlbGVjdGlvbi5hZGRSYW5nZShkb2N1bWVudC5jcmVhdGVSYW5nZSgpKVxuICAgIH1cbiAgfVxuICBlbHNlIGlmIChkb2N1bWVudC5zZWxlY3Rpb24gIT09IHZvaWQgMCkge1xuICAgIGRvY3VtZW50LnNlbGVjdGlvbi5lbXB0eSgpXG4gIH1cbn1cbiIsImltcG9ydCB7IHJlZiwgd2F0Y2gsIG9uTW91bnRlZCwgb25CZWZvcmVVbm1vdW50LCBuZXh0VGljaywgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBjbGVhclNlbGVjdGlvbiB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuc2VsZWN0aW9uL3NlbGVjdGlvbi5qcydcbmltcG9ydCB7IGFkZEV2dCwgY2xlYW5FdnQsIHByZXZlbnQgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC9ldmVudC5qcydcbmltcG9ydCB7IGlzS2V5Q29kZSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUua2V5Ym9hcmQva2V5LWNvbXBvc2l0aW9uLmpzJ1xuXG5leHBvcnQgY29uc3QgdXNlQW5jaG9yU3RhdGljUHJvcHMgPSB7XG4gIC8qIFNTUiBkb2VzIG5vdCBrbm93IGFib3V0IEVsZW1lbnQgKi9cbiAgdGFyZ2V0OiBfX1FVQVNBUl9TU1JfU0VSVkVSX19cbiAgICA/IHsgZGVmYXVsdDogdHJ1ZSB9XG4gICAgOiB7XG4gICAgICAgIHR5cGU6IFsgQm9vbGVhbiwgU3RyaW5nLCBFbGVtZW50IF0sXG4gICAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICAgIH0sXG5cbiAgbm9QYXJlbnRFdmVudDogQm9vbGVhblxufVxuXG5leHBvcnQgY29uc3QgdXNlQW5jaG9yUHJvcHMgPSB7XG4gIC4uLnVzZUFuY2hvclN0YXRpY1Byb3BzLFxuICBjb250ZXh0TWVudTogQm9vbGVhblxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoe1xuICBzaG93aW5nLFxuICBhdm9pZEVtaXQsIC8vIHJlcXVpcmVkIGZvciBRUG9wdXBQcm94eSAodHJ1ZSlcbiAgY29uZmlndXJlQW5jaG9yRWwgLy8gb3B0aW9uYWxcbn0pIHtcbiAgY29uc3QgeyBwcm9wcywgcHJveHksIGVtaXQgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgY29uc3QgYW5jaG9yRWwgPSByZWYobnVsbClcblxuICBsZXQgdG91Y2hUaW1lciA9IG51bGxcblxuICBmdW5jdGlvbiBjYW5TaG93IChldnQpIHtcbiAgICAvLyBhYm9ydCB3aXRoIG5vIHBhcmVudCBjb25maWd1cmVkIG9yIG9uIG11bHRpLXRvdWNoXG4gICAgcmV0dXJuIGFuY2hvckVsLnZhbHVlID09PSBudWxsXG4gICAgICA/IGZhbHNlXG4gICAgICA6IChldnQgPT09IHZvaWQgMCB8fCBldnQudG91Y2hlcyA9PT0gdm9pZCAwIHx8IGV2dC50b3VjaGVzLmxlbmd0aCA8PSAxKVxuICB9XG5cbiAgY29uc3QgYW5jaG9yRXZlbnRzID0ge31cblxuICBpZiAoY29uZmlndXJlQW5jaG9yRWwgPT09IHZvaWQgMCkge1xuICAgIC8vIGRlZmF1bHQgY29uZmlndXJlQW5jaG9yRWwgaXMgZGVzaWduZWQgZm9yXG4gICAgLy8gUU1lbnUgJiBRUG9wdXBQcm94eSAod2hpY2ggaXMgd2h5IGl0J3MgaGFuZGxlZCBoZXJlKVxuXG4gICAgT2JqZWN0LmFzc2lnbihhbmNob3JFdmVudHMsIHtcbiAgICAgIGhpZGUgKGV2dCkge1xuICAgICAgICBwcm94eS5oaWRlKGV2dClcbiAgICAgIH0sXG5cbiAgICAgIHRvZ2dsZSAoZXZ0KSB7XG4gICAgICAgIHByb3h5LnRvZ2dsZShldnQpXG4gICAgICAgIGV2dC5xQW5jaG9ySGFuZGxlZCA9IHRydWVcbiAgICAgIH0sXG5cbiAgICAgIHRvZ2dsZUtleSAoZXZ0KSB7XG4gICAgICAgIGlzS2V5Q29kZShldnQsIDEzKSA9PT0gdHJ1ZSAmJiBhbmNob3JFdmVudHMudG9nZ2xlKGV2dClcbiAgICAgIH0sXG5cbiAgICAgIGNvbnRleHRDbGljayAoZXZ0KSB7XG4gICAgICAgIHByb3h5LmhpZGUoZXZ0KVxuICAgICAgICBwcmV2ZW50KGV2dClcbiAgICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgIHByb3h5LnNob3coZXZ0KVxuICAgICAgICAgIGV2dC5xQW5jaG9ySGFuZGxlZCA9IHRydWVcbiAgICAgICAgfSlcbiAgICAgIH0sXG5cbiAgICAgIHByZXZlbnQsXG5cbiAgICAgIG1vYmlsZVRvdWNoIChldnQpIHtcbiAgICAgICAgYW5jaG9yRXZlbnRzLm1vYmlsZUNsZWFudXAoZXZ0KVxuXG4gICAgICAgIGlmIChjYW5TaG93KGV2dCkgIT09IHRydWUpIHJldHVyblxuXG4gICAgICAgIHByb3h5LmhpZGUoZXZ0KVxuICAgICAgICBhbmNob3JFbC52YWx1ZS5jbGFzc0xpc3QuYWRkKCdub24tc2VsZWN0YWJsZScpXG5cbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZ0LnRhcmdldFxuICAgICAgICBhZGRFdnQoYW5jaG9yRXZlbnRzLCAnYW5jaG9yJywgW1xuICAgICAgICAgIFsgdGFyZ2V0LCAndG91Y2htb3ZlJywgJ21vYmlsZUNsZWFudXAnLCAncGFzc2l2ZScgXSxcbiAgICAgICAgICBbIHRhcmdldCwgJ3RvdWNoZW5kJywgJ21vYmlsZUNsZWFudXAnLCAncGFzc2l2ZScgXSxcbiAgICAgICAgICBbIHRhcmdldCwgJ3RvdWNoY2FuY2VsJywgJ21vYmlsZUNsZWFudXAnLCAncGFzc2l2ZScgXSxcbiAgICAgICAgICBbIGFuY2hvckVsLnZhbHVlLCAnY29udGV4dG1lbnUnLCAncHJldmVudCcsICdub3RQYXNzaXZlJyBdXG4gICAgICAgIF0pXG5cbiAgICAgICAgdG91Y2hUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRvdWNoVGltZXIgPSBudWxsXG4gICAgICAgICAgcHJveHkuc2hvdyhldnQpXG4gICAgICAgICAgZXZ0LnFBbmNob3JIYW5kbGVkID0gdHJ1ZVxuICAgICAgICB9LCAzMDApXG4gICAgICB9LFxuXG4gICAgICBtb2JpbGVDbGVhbnVwIChldnQpIHtcbiAgICAgICAgYW5jaG9yRWwudmFsdWUuY2xhc3NMaXN0LnJlbW92ZSgnbm9uLXNlbGVjdGFibGUnKVxuXG4gICAgICAgIGlmICh0b3VjaFRpbWVyICE9PSBudWxsKSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRvdWNoVGltZXIpXG4gICAgICAgICAgdG91Y2hUaW1lciA9IG51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaG93aW5nLnZhbHVlID09PSB0cnVlICYmIGV2dCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgY2xlYXJTZWxlY3Rpb24oKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbmZpZ3VyZUFuY2hvckVsID0gZnVuY3Rpb24gKGNvbnRleHQgPSBwcm9wcy5jb250ZXh0TWVudSkge1xuICAgICAgaWYgKHByb3BzLm5vUGFyZW50RXZlbnQgPT09IHRydWUgfHwgYW5jaG9yRWwudmFsdWUgPT09IG51bGwpIHJldHVyblxuXG4gICAgICBsZXQgZXZ0c1xuXG4gICAgICBpZiAoY29udGV4dCA9PT0gdHJ1ZSkge1xuICAgICAgICBpZiAocHJveHkuJHEucGxhdGZvcm0uaXMubW9iaWxlID09PSB0cnVlKSB7XG4gICAgICAgICAgZXZ0cyA9IFtcbiAgICAgICAgICAgIFsgYW5jaG9yRWwudmFsdWUsICd0b3VjaHN0YXJ0JywgJ21vYmlsZVRvdWNoJywgJ3Bhc3NpdmUnIF1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZXZ0cyA9IFtcbiAgICAgICAgICAgIFsgYW5jaG9yRWwudmFsdWUsICdtb3VzZWRvd24nLCAnaGlkZScsICdwYXNzaXZlJyBdLFxuICAgICAgICAgICAgWyBhbmNob3JFbC52YWx1ZSwgJ2NvbnRleHRtZW51JywgJ2NvbnRleHRDbGljaycsICdub3RQYXNzaXZlJyBdXG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgZXZ0cyA9IFtcbiAgICAgICAgICBbIGFuY2hvckVsLnZhbHVlLCAnY2xpY2snLCAndG9nZ2xlJywgJ3Bhc3NpdmUnIF0sXG4gICAgICAgICAgWyBhbmNob3JFbC52YWx1ZSwgJ2tleXVwJywgJ3RvZ2dsZUtleScsICdwYXNzaXZlJyBdXG4gICAgICAgIF1cbiAgICAgIH1cblxuICAgICAgYWRkRXZ0KGFuY2hvckV2ZW50cywgJ2FuY2hvcicsIGV2dHMpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdW5jb25maWd1cmVBbmNob3JFbCAoKSB7XG4gICAgY2xlYW5FdnQoYW5jaG9yRXZlbnRzLCAnYW5jaG9yJylcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldEFuY2hvckVsIChlbCkge1xuICAgIGFuY2hvckVsLnZhbHVlID0gZWxcbiAgICB3aGlsZSAoYW5jaG9yRWwudmFsdWUuY2xhc3NMaXN0LmNvbnRhaW5zKCdxLWFuY2hvci0tc2tpcCcpKSB7XG4gICAgICBhbmNob3JFbC52YWx1ZSA9IGFuY2hvckVsLnZhbHVlLnBhcmVudE5vZGVcbiAgICB9XG4gICAgY29uZmlndXJlQW5jaG9yRWwoKVxuICB9XG5cbiAgZnVuY3Rpb24gcGlja0FuY2hvckVsICgpIHtcbiAgICBpZiAocHJvcHMudGFyZ2V0ID09PSBmYWxzZSB8fCBwcm9wcy50YXJnZXQgPT09ICcnIHx8IHByb3h5LiRlbC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgICBhbmNob3JFbC52YWx1ZSA9IG51bGxcbiAgICB9XG4gICAgZWxzZSBpZiAocHJvcHMudGFyZ2V0ID09PSB0cnVlKSB7XG4gICAgICBzZXRBbmNob3JFbChwcm94eS4kZWwucGFyZW50Tm9kZSlcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBsZXQgZWwgPSBwcm9wcy50YXJnZXRcblxuICAgICAgaWYgKHR5cGVvZiBwcm9wcy50YXJnZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHByb3BzLnRhcmdldClcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgZWwgPSB2b2lkIDBcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZWwgIT09IHZvaWQgMCAmJiBlbCAhPT0gbnVsbCkge1xuICAgICAgICBhbmNob3JFbC52YWx1ZSA9IGVsLiRlbCB8fCBlbFxuICAgICAgICBjb25maWd1cmVBbmNob3JFbCgpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgYW5jaG9yRWwudmFsdWUgPSBudWxsXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYEFuY2hvcjogdGFyZ2V0IFwiJHsgcHJvcHMudGFyZ2V0IH1cIiBub3QgZm91bmRgKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHdhdGNoKCgpID0+IHByb3BzLmNvbnRleHRNZW51LCB2YWwgPT4ge1xuICAgIGlmIChhbmNob3JFbC52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgdW5jb25maWd1cmVBbmNob3JFbCgpXG4gICAgICBjb25maWd1cmVBbmNob3JFbCh2YWwpXG4gICAgfVxuICB9KVxuXG4gIHdhdGNoKCgpID0+IHByb3BzLnRhcmdldCwgKCkgPT4ge1xuICAgIGlmIChhbmNob3JFbC52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgdW5jb25maWd1cmVBbmNob3JFbCgpXG4gICAgfVxuXG4gICAgcGlja0FuY2hvckVsKClcbiAgfSlcblxuICB3YXRjaCgoKSA9PiBwcm9wcy5ub1BhcmVudEV2ZW50LCB2YWwgPT4ge1xuICAgIGlmIChhbmNob3JFbC52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgaWYgKHZhbCA9PT0gdHJ1ZSkge1xuICAgICAgICB1bmNvbmZpZ3VyZUFuY2hvckVsKClcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb25maWd1cmVBbmNob3JFbCgpXG4gICAgICB9XG4gICAgfVxuICB9KVxuXG4gIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgcGlja0FuY2hvckVsKClcblxuICAgIGlmIChhdm9pZEVtaXQgIT09IHRydWUgJiYgcHJvcHMubW9kZWxWYWx1ZSA9PT0gdHJ1ZSAmJiBhbmNob3JFbC52YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBmYWxzZSlcbiAgICB9XG4gIH0pXG5cbiAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICB0b3VjaFRpbWVyICE9PSBudWxsICYmIGNsZWFyVGltZW91dCh0b3VjaFRpbWVyKVxuICAgIHVuY29uZmlndXJlQW5jaG9yRWwoKVxuICB9KVxuXG4gIHJldHVybiB7XG4gICAgYW5jaG9yRWwsXG4gICAgY2FuU2hvdyxcbiAgICBhbmNob3JFdmVudHNcbiAgfVxufVxuIiwiaW1wb3J0IHsgcmVmLCB3YXRjaCwgb25CZWZvcmVVbm1vdW50IH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBsaXN0ZW5PcHRzIH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQvZXZlbnQuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgY29uZmlndXJlU2Nyb2xsVGFyZ2V0KSB7XG4gIGNvbnN0IGxvY2FsU2Nyb2xsVGFyZ2V0ID0gcmVmKG51bGwpXG4gIGxldCBzY3JvbGxGblxuXG4gIGZ1bmN0aW9uIGNoYW5nZVNjcm9sbEV2ZW50IChzY3JvbGxUYXJnZXQsIGZuKSB7XG4gICAgY29uc3QgZm5Qcm9wID0gYCR7IGZuICE9PSB2b2lkIDAgPyAnYWRkJyA6ICdyZW1vdmUnIH1FdmVudExpc3RlbmVyYFxuICAgIGNvbnN0IGZuSGFuZGxlciA9IGZuICE9PSB2b2lkIDAgPyBmbiA6IHNjcm9sbEZuXG5cbiAgICBpZiAoc2Nyb2xsVGFyZ2V0ICE9PSB3aW5kb3cpIHtcbiAgICAgIHNjcm9sbFRhcmdldFsgZm5Qcm9wIF0oJ3Njcm9sbCcsIGZuSGFuZGxlciwgbGlzdGVuT3B0cy5wYXNzaXZlKVxuICAgIH1cblxuICAgIHdpbmRvd1sgZm5Qcm9wIF0oJ3Njcm9sbCcsIGZuSGFuZGxlciwgbGlzdGVuT3B0cy5wYXNzaXZlKVxuXG4gICAgc2Nyb2xsRm4gPSBmblxuICB9XG5cbiAgZnVuY3Rpb24gdW5jb25maWd1cmVTY3JvbGxUYXJnZXQgKCkge1xuICAgIGlmIChsb2NhbFNjcm9sbFRhcmdldC52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgY2hhbmdlU2Nyb2xsRXZlbnQobG9jYWxTY3JvbGxUYXJnZXQudmFsdWUpXG4gICAgICBsb2NhbFNjcm9sbFRhcmdldC52YWx1ZSA9IG51bGxcbiAgICB9XG4gIH1cblxuICBjb25zdCBub1BhcmVudEV2ZW50V2F0Y2hlciA9IHdhdGNoKCgpID0+IHByb3BzLm5vUGFyZW50RXZlbnQsICgpID0+IHtcbiAgICBpZiAobG9jYWxTY3JvbGxUYXJnZXQudmFsdWUgIT09IG51bGwpIHtcbiAgICAgIHVuY29uZmlndXJlU2Nyb2xsVGFyZ2V0KClcbiAgICAgIGNvbmZpZ3VyZVNjcm9sbFRhcmdldCgpXG4gICAgfVxuICB9KVxuXG4gIG9uQmVmb3JlVW5tb3VudChub1BhcmVudEV2ZW50V2F0Y2hlcilcblxuICByZXR1cm4ge1xuICAgIGxvY2FsU2Nyb2xsVGFyZ2V0LFxuICAgIHVuY29uZmlndXJlU2Nyb2xsVGFyZ2V0LFxuICAgIGNoYW5nZVNjcm9sbEV2ZW50XG4gIH1cbn1cbiIsImltcG9ydCB7IGxpc3Rlbk9wdHMgfSBmcm9tICcuLi9ldmVudC9ldmVudC5qcydcbmltcG9ydCB7IHBvcnRhbFByb3h5TGlzdCB9IGZyb20gJy4uL3ByaXZhdGUucG9ydGFsL3BvcnRhbC5qcydcblxubGV0IHRpbWVyID0gbnVsbFxuXG5jb25zdFxuICB7IG5vdFBhc3NpdmVDYXB0dXJlIH0gPSBsaXN0ZW5PcHRzLFxuICByZWdpc3RlcmVkTGlzdCA9IFtdXG5cbmZ1bmN0aW9uIGdsb2JhbEhhbmRsZXIgKGV2dCkge1xuICBpZiAodGltZXIgIT09IG51bGwpIHtcbiAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgdGltZXIgPSBudWxsXG4gIH1cblxuICBjb25zdCB0YXJnZXQgPSBldnQudGFyZ2V0XG5cbiAgaWYgKFxuICAgIHRhcmdldCA9PT0gdm9pZCAwXG4gICAgfHwgdGFyZ2V0Lm5vZGVUeXBlID09PSA4XG4gICAgfHwgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbm8tcG9pbnRlci1ldmVudHMnKSA9PT0gdHJ1ZVxuICApIHJldHVyblxuXG4gIC8vIGNoZWNrIGxhc3QgcG9ydGFsIHZtIGlmIGl0J3NcbiAgLy8gYSBRRGlhbG9nIGFuZCBub3QgaW4gc2VhbWxlc3MgbW9kZVxuICBsZXQgcG9ydGFsSW5kZXggPSBwb3J0YWxQcm94eUxpc3QubGVuZ3RoIC0gMVxuXG4gIHdoaWxlIChwb3J0YWxJbmRleCA+PSAwKSB7XG4gICAgY29uc3QgcHJveHkgPSBwb3J0YWxQcm94eUxpc3RbIHBvcnRhbEluZGV4IF0uJFxuXG4gICAgLy8gc2tpcCBRVG9vbHRpcCBwb3J0YWxzXG4gICAgaWYgKHByb3h5LnR5cGUubmFtZSA9PT0gJ1FUb29sdGlwJykge1xuICAgICAgcG9ydGFsSW5kZXgtLVxuICAgICAgY29udGludWVcbiAgICB9XG5cbiAgICBpZiAocHJveHkudHlwZS5uYW1lICE9PSAnUURpYWxvZycpIHtcbiAgICAgIGJyZWFrXG4gICAgfVxuXG4gICAgaWYgKHByb3h5LnByb3BzLnNlYW1sZXNzICE9PSB0cnVlKSByZXR1cm5cblxuICAgIHBvcnRhbEluZGV4LS1cbiAgfVxuXG4gIGZvciAobGV0IGkgPSByZWdpc3RlcmVkTGlzdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGNvbnN0IHN0YXRlID0gcmVnaXN0ZXJlZExpc3RbIGkgXVxuXG4gICAgaWYgKFxuICAgICAgKFxuICAgICAgICBzdGF0ZS5hbmNob3JFbC52YWx1ZSA9PT0gbnVsbFxuICAgICAgICB8fCBzdGF0ZS5hbmNob3JFbC52YWx1ZS5jb250YWlucyh0YXJnZXQpID09PSBmYWxzZVxuICAgICAgKVxuICAgICAgJiYgKFxuICAgICAgICB0YXJnZXQgPT09IGRvY3VtZW50LmJvZHlcbiAgICAgICAgfHwgKFxuICAgICAgICAgIHN0YXRlLmlubmVyUmVmLnZhbHVlICE9PSBudWxsXG4gICAgICAgICAgJiYgc3RhdGUuaW5uZXJSZWYudmFsdWUuY29udGFpbnModGFyZ2V0KSA9PT0gZmFsc2VcbiAgICAgICAgKVxuICAgICAgKVxuICAgICkge1xuICAgICAgLy8gbWFyayB0aGUgZXZlbnQgYXMgYmVpbmcgcHJvY2Vzc2VkIGJ5IGNsaWNrT3V0c2lkZVxuICAgICAgLy8gdXNlZCB0byBwcmV2ZW50IHJlZm9jdXMgYWZ0ZXIgbWVudSBjbG9zZVxuICAgICAgZXZ0LnFDbGlja091dHNpZGUgPSB0cnVlXG4gICAgICBzdGF0ZS5vbkNsaWNrT3V0c2lkZShldnQpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRDbGlja091dHNpZGUgKGNsaWNrT3V0c2lkZVByb3BzKSB7XG4gIHJlZ2lzdGVyZWRMaXN0LnB1c2goY2xpY2tPdXRzaWRlUHJvcHMpXG5cbiAgaWYgKHJlZ2lzdGVyZWRMaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGdsb2JhbEhhbmRsZXIsIG5vdFBhc3NpdmVDYXB0dXJlKVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBnbG9iYWxIYW5kbGVyLCBub3RQYXNzaXZlQ2FwdHVyZSlcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlQ2xpY2tPdXRzaWRlIChjbGlja091dHNpZGVQcm9wcykge1xuICBjb25zdCBpbmRleCA9IHJlZ2lzdGVyZWRMaXN0LmZpbmRJbmRleChoID0+IGggPT09IGNsaWNrT3V0c2lkZVByb3BzKVxuXG4gIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICByZWdpc3RlcmVkTGlzdC5zcGxpY2UoaW5kZXgsIDEpXG5cbiAgICBpZiAocmVnaXN0ZXJlZExpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICBpZiAodGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgICB0aW1lciA9IG51bGxcbiAgICAgIH1cblxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZ2xvYmFsSGFuZGxlciwgbm90UGFzc2l2ZUNhcHR1cmUpXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgZ2xvYmFsSGFuZGxlciwgbm90UGFzc2l2ZUNhcHR1cmUpXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBnZXRTY3JvbGxiYXJXaWR0aCB9IGZyb20gJy4uL3Njcm9sbC9zY3JvbGwuanMnXG5pbXBvcnQgeyBjbGllbnQgfSBmcm9tICcuLi8uLi9wbHVnaW5zL3BsYXRmb3JtL1BsYXRmb3JtLmpzJ1xuXG5sZXQgdnBMZWZ0LCB2cFRvcFxuXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVQb3NpdGlvbiAocG9zKSB7XG4gIGNvbnN0IHBhcnRzID0gcG9zLnNwbGl0KCcgJylcbiAgaWYgKHBhcnRzLmxlbmd0aCAhPT0gMikge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIGlmIChbICd0b3AnLCAnY2VudGVyJywgJ2JvdHRvbScgXS5pbmNsdWRlcyhwYXJ0c1sgMCBdKSAhPT0gdHJ1ZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0FuY2hvci9TZWxmIHBvc2l0aW9uIG11c3Qgc3RhcnQgd2l0aCBvbmUgb2YgdG9wL2NlbnRlci9ib3R0b20nKVxuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIGlmIChbICdsZWZ0JywgJ21pZGRsZScsICdyaWdodCcsICdzdGFydCcsICdlbmQnIF0uaW5jbHVkZXMocGFydHNbIDEgXSkgIT09IHRydWUpIHtcbiAgICBjb25zb2xlLmVycm9yKCdBbmNob3IvU2VsZiBwb3NpdGlvbiBtdXN0IGVuZCB3aXRoIG9uZSBvZiBsZWZ0L21pZGRsZS9yaWdodC9zdGFydC9lbmQnKVxuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIHJldHVybiB0cnVlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZU9mZnNldCAodmFsKSB7XG4gIGlmICghdmFsKSB7IHJldHVybiB0cnVlIH1cbiAgaWYgKHZhbC5sZW5ndGggIT09IDIpIHsgcmV0dXJuIGZhbHNlIH1cbiAgaWYgKHR5cGVvZiB2YWxbIDAgXSAhPT0gJ251bWJlcicgfHwgdHlwZW9mIHZhbFsgMSBdICE9PSAnbnVtYmVyJykge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIHJldHVybiB0cnVlXG59XG5cbmNvbnN0IGhvcml6b250YWxQb3MgPSB7XG4gICdzdGFydCNsdHInOiAnbGVmdCcsXG4gICdzdGFydCNydGwnOiAncmlnaHQnLFxuICAnZW5kI2x0cic6ICdyaWdodCcsXG4gICdlbmQjcnRsJzogJ2xlZnQnXG59XG5cbjtbICdsZWZ0JywgJ21pZGRsZScsICdyaWdodCcgXS5mb3JFYWNoKHBvcyA9PiB7XG4gIGhvcml6b250YWxQb3NbIGAkeyBwb3MgfSNsdHJgIF0gPSBwb3NcbiAgaG9yaXpvbnRhbFBvc1sgYCR7IHBvcyB9I3J0bGAgXSA9IHBvc1xufSlcblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlUG9zaXRpb24gKHBvcywgcnRsKSB7XG4gIGNvbnN0IHBhcnRzID0gcG9zLnNwbGl0KCcgJylcbiAgcmV0dXJuIHtcbiAgICB2ZXJ0aWNhbDogcGFydHNbIDAgXSxcbiAgICBob3Jpem9udGFsOiBob3Jpem9udGFsUG9zWyBgJHsgcGFydHNbIDEgXSB9IyR7IHJ0bCA9PT0gdHJ1ZSA/ICdydGwnIDogJ2x0cicgfWAgXVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBbmNob3JQcm9wcyAoZWwsIG9mZnNldCkge1xuICBsZXQgeyB0b3AsIGxlZnQsIHJpZ2h0LCBib3R0b20sIHdpZHRoLCBoZWlnaHQgfSA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cbiAgaWYgKG9mZnNldCAhPT0gdm9pZCAwKSB7XG4gICAgdG9wIC09IG9mZnNldFsgMSBdXG4gICAgbGVmdCAtPSBvZmZzZXRbIDAgXVxuICAgIGJvdHRvbSArPSBvZmZzZXRbIDEgXVxuICAgIHJpZ2h0ICs9IG9mZnNldFsgMCBdXG5cbiAgICB3aWR0aCArPSBvZmZzZXRbIDAgXVxuICAgIGhlaWdodCArPSBvZmZzZXRbIDEgXVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB0b3AsIGJvdHRvbSwgaGVpZ2h0LFxuICAgIGxlZnQsIHJpZ2h0LCB3aWR0aCxcbiAgICBtaWRkbGU6IGxlZnQgKyAocmlnaHQgLSBsZWZ0KSAvIDIsXG4gICAgY2VudGVyOiB0b3AgKyAoYm90dG9tIC0gdG9wKSAvIDJcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRBYnNvbHV0ZUFuY2hvclByb3BzIChlbCwgYWJzb2x1dGVPZmZzZXQsIG9mZnNldCkge1xuICBsZXQgeyB0b3AsIGxlZnQgfSA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cbiAgdG9wICs9IGFic29sdXRlT2Zmc2V0LnRvcFxuICBsZWZ0ICs9IGFic29sdXRlT2Zmc2V0LmxlZnRcblxuICBpZiAob2Zmc2V0ICE9PSB2b2lkIDApIHtcbiAgICB0b3AgKz0gb2Zmc2V0WyAxIF1cbiAgICBsZWZ0ICs9IG9mZnNldFsgMCBdXG4gIH1cblxuICByZXR1cm4ge1xuICAgIHRvcCwgYm90dG9tOiB0b3AgKyAxLCBoZWlnaHQ6IDEsXG4gICAgbGVmdCwgcmlnaHQ6IGxlZnQgKyAxLCB3aWR0aDogMSxcbiAgICBtaWRkbGU6IGxlZnQsXG4gICAgY2VudGVyOiB0b3BcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRUYXJnZXRQcm9wcyAod2lkdGgsIGhlaWdodCkge1xuICByZXR1cm4ge1xuICAgIHRvcDogMCxcbiAgICBjZW50ZXI6IGhlaWdodCAvIDIsXG4gICAgYm90dG9tOiBoZWlnaHQsXG4gICAgbGVmdDogMCxcbiAgICBtaWRkbGU6IHdpZHRoIC8gMixcbiAgICByaWdodDogd2lkdGhcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRUb3BMZWZ0UHJvcHMgKGFuY2hvclByb3BzLCB0YXJnZXRQcm9wcywgYW5jaG9yT3JpZ2luLCBzZWxmT3JpZ2luKSB7XG4gIHJldHVybiB7XG4gICAgdG9wOiBhbmNob3JQcm9wc1sgYW5jaG9yT3JpZ2luLnZlcnRpY2FsIF0gLSB0YXJnZXRQcm9wc1sgc2VsZk9yaWdpbi52ZXJ0aWNhbCBdLFxuICAgIGxlZnQ6IGFuY2hvclByb3BzWyBhbmNob3JPcmlnaW4uaG9yaXpvbnRhbCBdIC0gdGFyZ2V0UHJvcHNbIHNlbGZPcmlnaW4uaG9yaXpvbnRhbCBdXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFBvc2l0aW9uIChjZmcsIHJldHJ5TnVtYmVyID0gMCkge1xuICBpZiAoXG4gICAgY2ZnLnRhcmdldEVsID09PSBudWxsXG4gICAgfHwgY2ZnLmFuY2hvckVsID09PSBudWxsXG4gICAgfHwgcmV0cnlOdW1iZXIgPiA1IC8vIHdlIHNob3VsZCB0cnkgb25seSBhIGZldyB0aW1lc1xuICApIHJldHVyblxuXG4gIC8vIHNvbWUgYnJvd3NlcnMgcmVwb3J0IHplcm8gaGVpZ2h0IG9yIHdpZHRoIGJlY2F1c2VcbiAgLy8gd2UgYXJlIHRyeWluZyB0b28gZWFybHkgdG8gZ2V0IHRoZXNlIGRpbWVuc2lvbnNcbiAgaWYgKGNmZy50YXJnZXRFbC5vZmZzZXRIZWlnaHQgPT09IDAgfHwgY2ZnLnRhcmdldEVsLm9mZnNldFdpZHRoID09PSAwKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBzZXRQb3NpdGlvbihjZmcsIHJldHJ5TnVtYmVyICsgMSlcbiAgICB9LCAxMClcbiAgICByZXR1cm5cbiAgfVxuXG4gIGNvbnN0IHtcbiAgICB0YXJnZXRFbCxcbiAgICBvZmZzZXQsXG4gICAgYW5jaG9yRWwsXG4gICAgYW5jaG9yT3JpZ2luLFxuICAgIHNlbGZPcmlnaW4sXG4gICAgYWJzb2x1dGVPZmZzZXQsXG4gICAgZml0LFxuICAgIGNvdmVyLFxuICAgIG1heEhlaWdodCxcbiAgICBtYXhXaWR0aFxuICB9ID0gY2ZnXG5cbiAgaWYgKGNsaWVudC5pcy5pb3MgPT09IHRydWUgJiYgd2luZG93LnZpc3VhbFZpZXdwb3J0ICE9PSB2b2lkIDApIHtcbiAgICAvLyB1c2VzIHRoZSBxLXBvc2l0aW9uLWVuZ2luZSBDU1MgY2xhc3NcblxuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuYm9keS5zdHlsZVxuICAgIGNvbnN0IHsgb2Zmc2V0TGVmdDogbGVmdCwgb2Zmc2V0VG9wOiB0b3AgfSA9IHdpbmRvdy52aXN1YWxWaWV3cG9ydFxuXG4gICAgaWYgKGxlZnQgIT09IHZwTGVmdCkge1xuICAgICAgZWwuc2V0UHJvcGVydHkoJy0tcS1wZS1sZWZ0JywgbGVmdCArICdweCcpXG4gICAgICB2cExlZnQgPSBsZWZ0XG4gICAgfVxuICAgIGlmICh0b3AgIT09IHZwVG9wKSB7XG4gICAgICBlbC5zZXRQcm9wZXJ0eSgnLS1xLXBlLXRvcCcsIHRvcCArICdweCcpXG4gICAgICB2cFRvcCA9IHRvcFxuICAgIH1cbiAgfVxuXG4gIC8vIHNjcm9sbCBwb3NpdGlvbiBtaWdodCBjaGFuZ2VcbiAgLy8gaWYgbWF4LWhlaWdodC8td2lkdGggY2hhbmdlcywgc28gd2VcbiAgLy8gbmVlZCB0byByZXN0b3JlIGl0IGFmdGVyIHdlIGNhbGN1bGF0ZVxuICAvLyB0aGUgbmV3IHBvc2l0aW9uaW5nXG4gIGNvbnN0IHsgc2Nyb2xsTGVmdCwgc2Nyb2xsVG9wIH0gPSB0YXJnZXRFbFxuXG4gIGNvbnN0IGFuY2hvclByb3BzID0gYWJzb2x1dGVPZmZzZXQgPT09IHZvaWQgMFxuICAgID8gZ2V0QW5jaG9yUHJvcHMoYW5jaG9yRWwsIGNvdmVyID09PSB0cnVlID8gWyAwLCAwIF0gOiBvZmZzZXQpXG4gICAgOiBnZXRBYnNvbHV0ZUFuY2hvclByb3BzKGFuY2hvckVsLCBhYnNvbHV0ZU9mZnNldCwgb2Zmc2V0KVxuXG4gIC8qKlxuICAgKiBXZSBcInJlc2V0XCIgdGhlIGNyaXRpY2FsIENTUyBwcm9wZXJ0aWVzXG4gICAqIHNvIHdlIGNhbiB0YWtlIGFuIGFjY3VyYXRlIG1lYXN1cmVtZW50LlxuICAgKlxuICAgKiBFbnN1cmUgdGhhdCB0YXJnZXRFbCBoYXMgYSBtYXgtd2lkdGggJiBtYXgtaGVpZ2h0XG4gICAqIHNldCBpbiBDU1MgYW5kIHRoYXQgdGhlIHZhbHVlIGRvZXMgTk9UIGV4Y2VlZHMgMTAwdncvdmguXG4gICAqIEFsbCB1c2VycyBvZiB0aGUgcG9zaXRpb24tZW5naW5lIChjdXJyZW50bHkgUU1lbnUgJiBRVG9vbHRpcClcbiAgICogaGF2ZSBDU1MgZm9yIHRoaXMuXG4gICAqL1xuICBPYmplY3QuYXNzaWduKHRhcmdldEVsLnN0eWxlLCB7XG4gICAgdG9wOiAwLFxuICAgIGxlZnQ6IDAsXG4gICAgbWluV2lkdGg6IG51bGwsXG4gICAgbWluSGVpZ2h0OiBudWxsLFxuICAgIG1heFdpZHRoLFxuICAgIG1heEhlaWdodCxcbiAgICB2aXNpYmlsaXR5OiAndmlzaWJsZSdcbiAgfSlcblxuICBjb25zdCB7IG9mZnNldFdpZHRoOiBvcmlnRWxXaWR0aCwgb2Zmc2V0SGVpZ2h0OiBvcmlnRWxIZWlnaHQgfSA9IHRhcmdldEVsXG4gIGNvbnN0IHsgZWxXaWR0aCwgZWxIZWlnaHQgfSA9IGZpdCA9PT0gdHJ1ZSB8fCBjb3ZlciA9PT0gdHJ1ZVxuICAgID8geyBlbFdpZHRoOiBNYXRoLm1heChhbmNob3JQcm9wcy53aWR0aCwgb3JpZ0VsV2lkdGgpLCBlbEhlaWdodDogY292ZXIgPT09IHRydWUgPyBNYXRoLm1heChhbmNob3JQcm9wcy5oZWlnaHQsIG9yaWdFbEhlaWdodCkgOiBvcmlnRWxIZWlnaHQgfVxuICAgIDogeyBlbFdpZHRoOiBvcmlnRWxXaWR0aCwgZWxIZWlnaHQ6IG9yaWdFbEhlaWdodCB9XG5cbiAgbGV0IGVsU3R5bGUgPSB7IG1heFdpZHRoLCBtYXhIZWlnaHQgfVxuXG4gIGlmIChmaXQgPT09IHRydWUgfHwgY292ZXIgPT09IHRydWUpIHtcbiAgICBlbFN0eWxlLm1pbldpZHRoID0gYW5jaG9yUHJvcHMud2lkdGggKyAncHgnXG4gICAgaWYgKGNvdmVyID09PSB0cnVlKSB7XG4gICAgICBlbFN0eWxlLm1pbkhlaWdodCA9IGFuY2hvclByb3BzLmhlaWdodCArICdweCdcbiAgICB9XG4gIH1cblxuICBPYmplY3QuYXNzaWduKHRhcmdldEVsLnN0eWxlLCBlbFN0eWxlKVxuXG4gIGNvbnN0IHRhcmdldFByb3BzID0gZ2V0VGFyZ2V0UHJvcHMoZWxXaWR0aCwgZWxIZWlnaHQpXG4gIGxldCBwcm9wcyA9IGdldFRvcExlZnRQcm9wcyhhbmNob3JQcm9wcywgdGFyZ2V0UHJvcHMsIGFuY2hvck9yaWdpbiwgc2VsZk9yaWdpbilcblxuICBpZiAoYWJzb2x1dGVPZmZzZXQgPT09IHZvaWQgMCB8fCBvZmZzZXQgPT09IHZvaWQgMCkge1xuICAgIGFwcGx5Qm91bmRhcmllcyhwcm9wcywgYW5jaG9yUHJvcHMsIHRhcmdldFByb3BzLCBhbmNob3JPcmlnaW4sIHNlbGZPcmlnaW4pXG4gIH1cbiAgZWxzZSB7IC8vIHdlIGhhdmUgdG91Y2ggcG9zaXRpb24gb3IgY29udGV4dCBtZW51IHdpdGggb2Zmc2V0XG4gICAgY29uc3QgeyB0b3AsIGxlZnQgfSA9IHByb3BzIC8vIGNhY2hlIGluaXRpYWwgdmFsdWVzXG5cbiAgICAvLyBhcHBseSBpbml0aWFsIGJvdW5kYXJpZXNcbiAgICBhcHBseUJvdW5kYXJpZXMocHJvcHMsIGFuY2hvclByb3BzLCB0YXJnZXRQcm9wcywgYW5jaG9yT3JpZ2luLCBzZWxmT3JpZ2luKVxuXG4gICAgbGV0IGhhc0NoYW5nZWQgPSBmYWxzZVxuXG4gICAgLy8gZGlkIGl0IGZsaXAgdmVydGljYWxseT9cbiAgICBpZiAocHJvcHMudG9wICE9PSB0b3ApIHtcbiAgICAgIGhhc0NoYW5nZWQgPSB0cnVlXG4gICAgICBjb25zdCBvZmZzZXRZID0gMiAqIG9mZnNldFsgMSBdXG4gICAgICBhbmNob3JQcm9wcy5jZW50ZXIgPSBhbmNob3JQcm9wcy50b3AgLT0gb2Zmc2V0WVxuICAgICAgYW5jaG9yUHJvcHMuYm90dG9tIC09IG9mZnNldFkgKyAyXG4gICAgfVxuXG4gICAgLy8gZGlkIGl0IGZsaXAgaG9yaXpvbnRhbGx5P1xuICAgIGlmIChwcm9wcy5sZWZ0ICE9PSBsZWZ0KSB7XG4gICAgICBoYXNDaGFuZ2VkID0gdHJ1ZVxuICAgICAgY29uc3Qgb2Zmc2V0WCA9IDIgKiBvZmZzZXRbIDAgXVxuICAgICAgYW5jaG9yUHJvcHMubWlkZGxlID0gYW5jaG9yUHJvcHMubGVmdCAtPSBvZmZzZXRYXG4gICAgICBhbmNob3JQcm9wcy5yaWdodCAtPSBvZmZzZXRYICsgMlxuICAgIH1cblxuICAgIGlmIChoYXNDaGFuZ2VkID09PSB0cnVlKSB7XG4gICAgICAvLyByZS1jYWxjdWxhdGUgcHJvcHMgd2l0aCB0aGUgbmV3IGFuY2hvclxuICAgICAgcHJvcHMgPSBnZXRUb3BMZWZ0UHJvcHMoYW5jaG9yUHJvcHMsIHRhcmdldFByb3BzLCBhbmNob3JPcmlnaW4sIHNlbGZPcmlnaW4pXG5cbiAgICAgIC8vIGFuZCByZS1hcHBseSBib3VuZGFyaWVzXG4gICAgICBhcHBseUJvdW5kYXJpZXMocHJvcHMsIGFuY2hvclByb3BzLCB0YXJnZXRQcm9wcywgYW5jaG9yT3JpZ2luLCBzZWxmT3JpZ2luKVxuICAgIH1cbiAgfVxuXG4gIGVsU3R5bGUgPSB7XG4gICAgdG9wOiBwcm9wcy50b3AgKyAncHgnLFxuICAgIGxlZnQ6IHByb3BzLmxlZnQgKyAncHgnXG4gIH1cblxuICBpZiAocHJvcHMubWF4SGVpZ2h0ICE9PSB2b2lkIDApIHtcbiAgICBlbFN0eWxlLm1heEhlaWdodCA9IHByb3BzLm1heEhlaWdodCArICdweCdcblxuICAgIGlmIChhbmNob3JQcm9wcy5oZWlnaHQgPiBwcm9wcy5tYXhIZWlnaHQpIHtcbiAgICAgIGVsU3R5bGUubWluSGVpZ2h0ID0gZWxTdHlsZS5tYXhIZWlnaHRcbiAgICB9XG4gIH1cbiAgaWYgKHByb3BzLm1heFdpZHRoICE9PSB2b2lkIDApIHtcbiAgICBlbFN0eWxlLm1heFdpZHRoID0gcHJvcHMubWF4V2lkdGggKyAncHgnXG5cbiAgICBpZiAoYW5jaG9yUHJvcHMud2lkdGggPiBwcm9wcy5tYXhXaWR0aCkge1xuICAgICAgZWxTdHlsZS5taW5XaWR0aCA9IGVsU3R5bGUubWF4V2lkdGhcbiAgICB9XG4gIH1cblxuICBPYmplY3QuYXNzaWduKHRhcmdldEVsLnN0eWxlLCBlbFN0eWxlKVxuXG4gIC8vIHJlc3RvcmUgc2Nyb2xsIHBvc2l0aW9uXG4gIGlmICh0YXJnZXRFbC5zY3JvbGxUb3AgIT09IHNjcm9sbFRvcCkge1xuICAgIHRhcmdldEVsLnNjcm9sbFRvcCA9IHNjcm9sbFRvcFxuICB9XG4gIGlmICh0YXJnZXRFbC5zY3JvbGxMZWZ0ICE9PSBzY3JvbGxMZWZ0KSB7XG4gICAgdGFyZ2V0RWwuc2Nyb2xsTGVmdCA9IHNjcm9sbExlZnRcbiAgfVxufVxuXG5mdW5jdGlvbiBhcHBseUJvdW5kYXJpZXMgKHByb3BzLCBhbmNob3JQcm9wcywgdGFyZ2V0UHJvcHMsIGFuY2hvck9yaWdpbiwgc2VsZk9yaWdpbikge1xuICBjb25zdFxuICAgIGN1cnJlbnRIZWlnaHQgPSB0YXJnZXRQcm9wcy5ib3R0b20sXG4gICAgY3VycmVudFdpZHRoID0gdGFyZ2V0UHJvcHMucmlnaHQsXG4gICAgbWFyZ2luID0gZ2V0U2Nyb2xsYmFyV2lkdGgoKSxcbiAgICBpbm5lckhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCAtIG1hcmdpbixcbiAgICBpbm5lcldpZHRoID0gZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aFxuXG4gIGlmIChwcm9wcy50b3AgPCAwIHx8IHByb3BzLnRvcCArIGN1cnJlbnRIZWlnaHQgPiBpbm5lckhlaWdodCkge1xuICAgIGlmIChzZWxmT3JpZ2luLnZlcnRpY2FsID09PSAnY2VudGVyJykge1xuICAgICAgcHJvcHMudG9wID0gYW5jaG9yUHJvcHNbIGFuY2hvck9yaWdpbi52ZXJ0aWNhbCBdID4gaW5uZXJIZWlnaHQgLyAyXG4gICAgICAgID8gTWF0aC5tYXgoMCwgaW5uZXJIZWlnaHQgLSBjdXJyZW50SGVpZ2h0KVxuICAgICAgICA6IDBcbiAgICAgIHByb3BzLm1heEhlaWdodCA9IE1hdGgubWluKGN1cnJlbnRIZWlnaHQsIGlubmVySGVpZ2h0KVxuICAgIH1cbiAgICBlbHNlIGlmIChhbmNob3JQcm9wc1sgYW5jaG9yT3JpZ2luLnZlcnRpY2FsIF0gPiBpbm5lckhlaWdodCAvIDIpIHtcbiAgICAgIGNvbnN0IGFuY2hvclkgPSBNYXRoLm1pbihcbiAgICAgICAgaW5uZXJIZWlnaHQsXG4gICAgICAgIGFuY2hvck9yaWdpbi52ZXJ0aWNhbCA9PT0gJ2NlbnRlcidcbiAgICAgICAgICA/IGFuY2hvclByb3BzLmNlbnRlclxuICAgICAgICAgIDogKGFuY2hvck9yaWdpbi52ZXJ0aWNhbCA9PT0gc2VsZk9yaWdpbi52ZXJ0aWNhbCA/IGFuY2hvclByb3BzLmJvdHRvbSA6IGFuY2hvclByb3BzLnRvcClcbiAgICAgIClcbiAgICAgIHByb3BzLm1heEhlaWdodCA9IE1hdGgubWluKGN1cnJlbnRIZWlnaHQsIGFuY2hvclkpXG4gICAgICBwcm9wcy50b3AgPSBNYXRoLm1heCgwLCBhbmNob3JZIC0gY3VycmVudEhlaWdodClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBwcm9wcy50b3AgPSBNYXRoLm1heCgwLCBhbmNob3JPcmlnaW4udmVydGljYWwgPT09ICdjZW50ZXInXG4gICAgICAgID8gYW5jaG9yUHJvcHMuY2VudGVyXG4gICAgICAgIDogKGFuY2hvck9yaWdpbi52ZXJ0aWNhbCA9PT0gc2VsZk9yaWdpbi52ZXJ0aWNhbCA/IGFuY2hvclByb3BzLnRvcCA6IGFuY2hvclByb3BzLmJvdHRvbSlcbiAgICAgIClcbiAgICAgIHByb3BzLm1heEhlaWdodCA9IE1hdGgubWluKGN1cnJlbnRIZWlnaHQsIGlubmVySGVpZ2h0IC0gcHJvcHMudG9wKVxuICAgIH1cbiAgfVxuXG4gIGlmIChwcm9wcy5sZWZ0IDwgMCB8fCBwcm9wcy5sZWZ0ICsgY3VycmVudFdpZHRoID4gaW5uZXJXaWR0aCkge1xuICAgIHByb3BzLm1heFdpZHRoID0gTWF0aC5taW4oY3VycmVudFdpZHRoLCBpbm5lcldpZHRoKVxuICAgIGlmIChzZWxmT3JpZ2luLmhvcml6b250YWwgPT09ICdtaWRkbGUnKSB7XG4gICAgICBwcm9wcy5sZWZ0ID0gYW5jaG9yUHJvcHNbIGFuY2hvck9yaWdpbi5ob3Jpem9udGFsIF0gPiBpbm5lcldpZHRoIC8gMlxuICAgICAgICA/IE1hdGgubWF4KDAsIGlubmVyV2lkdGggLSBjdXJyZW50V2lkdGgpXG4gICAgICAgIDogMFxuICAgIH1cbiAgICBlbHNlIGlmIChhbmNob3JQcm9wc1sgYW5jaG9yT3JpZ2luLmhvcml6b250YWwgXSA+IGlubmVyV2lkdGggLyAyKSB7XG4gICAgICBjb25zdCBhbmNob3JYID0gTWF0aC5taW4oXG4gICAgICAgIGlubmVyV2lkdGgsXG4gICAgICAgIGFuY2hvck9yaWdpbi5ob3Jpem9udGFsID09PSAnbWlkZGxlJ1xuICAgICAgICAgID8gYW5jaG9yUHJvcHMubWlkZGxlXG4gICAgICAgICAgOiAoYW5jaG9yT3JpZ2luLmhvcml6b250YWwgPT09IHNlbGZPcmlnaW4uaG9yaXpvbnRhbCA/IGFuY2hvclByb3BzLnJpZ2h0IDogYW5jaG9yUHJvcHMubGVmdClcbiAgICAgIClcbiAgICAgIHByb3BzLm1heFdpZHRoID0gTWF0aC5taW4oY3VycmVudFdpZHRoLCBhbmNob3JYKVxuICAgICAgcHJvcHMubGVmdCA9IE1hdGgubWF4KDAsIGFuY2hvclggLSBwcm9wcy5tYXhXaWR0aClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBwcm9wcy5sZWZ0ID0gTWF0aC5tYXgoMCwgYW5jaG9yT3JpZ2luLmhvcml6b250YWwgPT09ICdtaWRkbGUnXG4gICAgICAgID8gYW5jaG9yUHJvcHMubWlkZGxlXG4gICAgICAgIDogKGFuY2hvck9yaWdpbi5ob3Jpem9udGFsID09PSBzZWxmT3JpZ2luLmhvcml6b250YWwgPyBhbmNob3JQcm9wcy5sZWZ0IDogYW5jaG9yUHJvcHMucmlnaHQpXG4gICAgICApXG4gICAgICBwcm9wcy5tYXhXaWR0aCA9IE1hdGgubWluKGN1cnJlbnRXaWR0aCwgaW5uZXJXaWR0aCAtIHByb3BzLmxlZnQpXG4gICAgfVxuICB9XG59XG4iXSwibmFtZXMiOlsiaCJdLCJtYXBwaW5ncyI6IjtBQVVlLFNBQUEsYUFBWTtBQUN6QixNQUFJLFFBQVE7QUFDWixRQUFNLEtBQUssbUJBQWtCO0FBRTdCLFdBQVMsZ0JBQWlCO0FBQ3hCLFFBQUksVUFBVSxNQUFNO0FBQ2xCLG1CQUFhLEtBQUs7QUFDbEIsY0FBUTtBQUFBLElBQ1Y7QUFBQSxFQUNG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QUFhLFVBQVU7QUFDcEMsWUFBTSxNQUFNLFlBQWEsYUFBYSxRQUFRLElBQUssY0FBYyxJQUM3RCxLQUFLLElBQUksR0FBRyxjQUFjLGFBQWEsSUFDdkM7QUFDSixZQUFNLFlBQVksS0FBSyxJQUFJLGVBQWUsV0FBVztBQUFBLElBQ3ZELFdBQ1MsWUFBYSxhQUFhLFFBQVEsSUFBSyxjQUFjLEdBQUc7QUFDL0QsWUFBTSxVQUFVLEtBQUs7QUFBQSxRQUNuQjtBQUFBLFFBQ0EsYUFBYSxhQUFhLFdBQ3RCLFlBQVksU0FDWCxhQUFhLGFBQWEsV0FBVyxXQUFXLFlBQVksU0FBUyxZQUFZO0FBQUEsTUFDOUY7QUFDTSxZQUFNLFlBQVksS0FBSyxJQUFJLGVBQWUsT0FBTztBQUNqRCxZQUFNLE1BQU0sS0FBSyxJQUFJLEdBQUcsVUFBVSxhQUFhO0FBQUEsSUFDakQsT0FDSztBQUNILFlBQU0sTUFBTSxLQUFLO0FBQUEsUUFBSTtBQUFBLFFBQUcsYUFBYSxhQUFhLFdBQzlDLFlBQVksU0FDWCxhQUFhLGFBQWEsV0FBVyxXQUFXLFlBQVksTUFBTSxZQUFZO0FBQUEsTUFDekY7QUFDTSxZQUFNLFlBQVksS0FBSyxJQUFJLGVBQWUsY0FBYyxNQUFNLEdBQUc7QUFBQSxJQUNuRTtBQUFBLEVBQ0Y7QUFFQSxNQUFJLE1BQU0sT0FBTyxLQUFLLE1BQU0sT0FBTyxlQUFlLFlBQVk7QUFDNUQsVUFBTSxXQUFXLEtBQUssSUFBSSxjQUFjLFVBQVU7QUFDbEQsUUFBSSxXQUFXLGVBQWUsVUFBVTtBQUN0QyxZQUFNLE9BQU8sWUFBYSxhQUFhLFVBQVUsSUFBSyxhQUFhLElBQy9ELEtBQUssSUFBSSxHQUFHLGFBQWEsWUFBWSxJQUNyQztBQUFBLElBQ04sV0FDUyxZQUFhLGFBQWEsVUFBVSxJQUFLLGFBQWEsR0FBRztBQUNoRSxZQUFNLFVBQVUsS0FBSztBQUFBLFFBQ25CO0FBQUEsUUFDQSxhQUFhLGVBQWUsV0FDeEIsWUFBWSxTQUNYLGFBQWEsZUFBZSxXQUFXLGFBQWEsWUFBWSxRQUFRLFlBQVk7QUFBQSxNQUNqRztBQUNNLFlBQU0sV0FBVyxLQUFLLElBQUksY0FBYyxPQUFPO0FBQy9DLFlBQU0sT0FBTyxLQUFLLElBQUksR0FBRyxVQUFVLE1BQU0sUUFBUTtBQUFBLElBQ25ELE9BQ0s7QUFDSCxZQUFNLE9BQU8sS0FBSztBQUFBLFFBQUk7QUFBQSxRQUFHLGFBQWEsZUFBZSxXQUNqRCxZQUFZLFNBQ1gsYUFBYSxlQUFlLFdBQVcsYUFBYSxZQUFZLE9BQU8sWUFBWTtBQUFBLE1BQzlGO0FBQ00sWUFBTSxXQUFXLEtBQUssSUFBSSxjQUFjLGFBQWEsTUFBTSxJQUFJO0FBQUEsSUFDakU7QUFBQSxFQUNGO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyIsInhfZ29vZ2xlX2lnbm9yZUxpc3QiOlswLDEsMiwzLDQsNSw2LDcsOCw5LDEwLDExLDEyLDEzXX0=
