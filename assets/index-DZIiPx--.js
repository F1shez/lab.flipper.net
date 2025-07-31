import { Q as QItemSection, a as QItemLabel, b as QItem, g as getModifierDirections, s as shouldStart, u as useDarkProps, c as useDark, d as useHistory, T as TouchPan, e as usePreventScroll, f as between, h as QDialog, i as QCard, C as ClosePopup, j as QCardSection, k as useFlipperStore, l as showNotif, m as emitter, n as QExpansionItem, o as QScrollArea, p as QCardActions, q as QBadge, r as history, t as logger, v as rpcErrorHandler, w as useAppsStore, x as QSeparator, y as QPage, z as QImg } from "./KeypadButton.vue_vue_type_style_index_0_scoped_4cc0fc91_lang-CBp6KsX-.js";
import { d as defineComponent, _ as _export_sfc, e as createBlock, f as openBlock, g as withCtx, i as createCommentVNode, j as createVNode, k as QIcon, l as createTextVNode, t as toDisplayString, a as ref, m as withDirectives, n as createElementBlock, Q as QBtn, v as vShow, p as createBaseVNode, F as Fragment, q as renderList, s as mergeProps, x as createDirective, y as cleanEvt, z as client, A as preventDraggable, B as noop, C as addEvt, D as stopAndPrevent, E as position, G as leftClick, H as getCurrentInstance, c as computed, w as watch, h, T as Transition, I as getNormalizedVNodes, J as hSlot, K as KeepAlive, L as createComponent, M as hDir, N as inject, O as emptyRenderFn, P as layoutKey, R as nextTick, S as onMounted, U as onBeforeUnmount, V as renderSlot, W as normalizeProps, X as guardReactiveProps, Y as onUnmounted, Z as QAvatar, $ as normalizeStyle, a0 as normalizeClass, a1 as useRouter, a2 as useRoute, a3 as resolveComponent } from "./index-C6TMAAL-.js";
import { Q as QList } from "./QList-DWfwtdHC.js";
import { Q as QLayout, a as QPageContainer } from "./QLayout-Ct_sU1En.js";
import { Q as QSpace } from "./QSpace-BMSvs-Cu.js";
import { Q as QMenu } from "./QMenu-CayqftHC.js";
import { Q as QToolbar } from "./QToolbar-WF-h4z6i.js";
import { Q as QHeader } from "./QHeader-DiNZiq94.js";
import { d as clearSelection, u as useTimeout, e as useModelToggleEmits, f as useModelToggleProps, h as useModelToggle } from "./_commonjsHelpers-DHRe3nu-.js";
import { Q as QToggle } from "./QToggle-EdI4ApWp.js";
import { F as FlipperConnectWebBtn } from "./ConnectWeb-DgVsGULf.js";
import "./QSelect-Bjjy7qRQ.js";
import "./QFile-DY-XgOSk.js";
import "./QFooter-Dm117KTQ.js";
import "./ExpandView.vue_vue_type_style_index_0_scoped_b095a25b_lang-CuFaF6KU.js";
import { P as PRODUCTION_NAME, D as DEVELOP_NAME, g as getBaseUrl, i as instance } from "./axios-2pbeEnA2.js";
import { Q as QTooltip } from "./QTooltip-DoudV-ng.js";
import { L as Loading } from "./Loading-D4iOpy-V.js";
import { F as FlipperMicroSDCard } from "./MicroSD-DmNlsEAW.js";
import { P as ProgressBar } from "./ProgressBar-BywAnSF6.js";
import { e as exportFile } from "./export-file-lpTZqdHO.js";
import { F as FrameRenderer } from "./frameRenderer-DjEIeLsf.js";
import { _ as _imports_0$3 } from "./flipper_alert-CaGPO0B-.js";
import "./private.use-form-CPVT462N.js";
import "./use-file-dom-props-CBo4nJW0.js";
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  ...{
    name: "EssentialLink"
  },
  __name: "EssentialLink",
  props: {
    title: {},
    link: { default: "#" },
    icon: { default: "" }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const __returned__ = {};
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QItem, {
    clickable: "",
    tag: "a",
    target: "_blank",
    href: $props.link
  }, {
    default: withCtx(() => [
      $props.icon ? (openBlock(), createBlock(QItemSection, {
        key: 0,
        avatar: ""
      }, {
        default: withCtx(() => [
          createVNode(QIcon, { name: $props.icon }, null, 8, ["name"])
        ]),
        _: 1
      })) : createCommentVNode("", true),
      createVNode(QItemSection, null, {
        default: withCtx(() => [
          createVNode(QItemLabel, null, {
            default: withCtx(() => [
              createTextVNode(toDisplayString($props.title), 1)
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 8, ["href"]);
}
const EssentialLink = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$g], ["__file", "EssentialLink.vue"]]);
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "Header",
  emits: ["toggleLeftDrawer"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const emit = __emit;
    const extLinks = [
      {
        title: "Home",
        icon: "mdi-home-outline",
        link: "https://flipperzero.one/",
        blank: true,
        router: false
      },
      {
        title: "Shop",
        icon: "mdi-cart-outline",
        link: "https://shop.flipperzero.one/",
        blank: true,
        router: false
      },
      {
        title: "Docs",
        icon: "mdi-book-open-variant",
        link: "https://docs.flipperzero.one/",
        blank: true,
        router: false
      },
      {
        title: "Blog",
        icon: "mdi-newspaper-variant-outline",
        link: "https://blog.flipperzero.one/",
        blank: true,
        router: false
      },
      {
        title: "Forum",
        icon: "mdi-forum-outline",
        link: "https://forum.flipperzero.one/",
        blank: true,
        router: false
      }
    ];
    const linksMenu = ref(false);
    const __returned__ = { emit, extLinks, linksMenu, get EssentialLink() {
      return EssentialLink;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _imports_0$2 = "/lab.flipper.net/assets/flipper_lab_logo_monochrome-DQ6VMbQ2.svg";
const _hoisted_1$7 = {
  src: _imports_0$2,
  class: "q-ml-xs",
  style: { "height": "36px" }
};
const _hoisted_2$7 = {
  key: 1,
  class: "nav-links"
};
const _hoisted_3$5 = ["href", "target"];
function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QHeader, null, {
    default: withCtx(() => [
      createVNode(QToolbar, null, {
        default: withCtx(() => [
          withDirectives(createVNode(QBtn, {
            flat: "",
            dense: "",
            round: "",
            icon: "menu",
            "aria-label": "Menu",
            onClick: _cache[0] || (_cache[0] = ($event) => $setup.emit("toggleLeftDrawer"))
          }, null, 512), [
            [vShow, _ctx.$q.screen.xs]
          ]),
          withDirectives(createBaseVNode("img", _hoisted_1$7, null, 512), [
            [vShow, !_ctx.$q.screen.xs]
          ]),
          createVNode(QSpace),
          _ctx.$q.screen.xs ? (openBlock(), createBlock(QBtn, {
            key: 0,
            onClick: _cache[1] || (_cache[1] = ($event) => $setup.linksMenu = !$setup.linksMenu),
            icon: "open_in_new",
            dense: "",
            flat: "",
            round: "",
            class: "q-ml-sm"
          }, {
            default: withCtx(() => [
              createVNode(QMenu, { fit: "" }, {
                default: withCtx(() => [
                  createVNode(QList, { class: "nav-links nav-links__black" }, {
                    default: withCtx(() => [
                      (openBlock(), createElementBlock(Fragment, null, renderList($setup.extLinks, (link) => {
                        return createVNode($setup["EssentialLink"], mergeProps({
                          key: link.title
                        }, { ref_for: true }, link), null, 16);
                      }), 64))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          })) : (openBlock(), createElementBlock("div", _hoisted_2$7, [
            (openBlock(), createElementBlock(Fragment, null, renderList($setup.extLinks, (link) => {
              return createBaseVNode("a", mergeProps({
                key: link.title
              }, { ref_for: true }, link, {
                href: link.link,
                class: "q-mx-sm",
                target: link.blank ? "_blank" : "_self"
              }), toDisplayString(link.title), 17, _hoisted_3$5);
            }), 64))
          ]))
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const AppHeader = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$f], ["__scopeId", "data-v-ee3cbb6a"], ["__file", "Header.vue"]]);
function parseArg(arg) {
  const data = [0.06, 6, 50];
  if (typeof arg === "string" && arg.length) {
    arg.split(":").forEach((val, index) => {
      const v = parseFloat(val);
      v && (data[index] = v);
    });
  }
  return data;
}
const TouchSwipe = createDirective(
  {
    name: "touch-swipe",
    beforeMount(el, { value, arg, modifiers }) {
      if (modifiers.mouse !== true && client.has.touch !== true) return;
      const mouseCapture = modifiers.mouseCapture === true ? "Capture" : "";
      const ctx = {
        handler: value,
        sensitivity: parseArg(arg),
        direction: getModifierDirections(modifiers),
        noop,
        mouseStart(evt) {
          if (shouldStart(evt, ctx) && leftClick(evt)) {
            addEvt(ctx, "temp", [
              [document, "mousemove", "move", `notPassive${mouseCapture}`],
              [document, "mouseup", "end", "notPassiveCapture"]
            ]);
            ctx.start(evt, true);
          }
        },
        touchStart(evt) {
          if (shouldStart(evt, ctx)) {
            const target = evt.target;
            addEvt(ctx, "temp", [
              [target, "touchmove", "move", "notPassiveCapture"],
              [target, "touchcancel", "end", "notPassiveCapture"],
              [target, "touchend", "end", "notPassiveCapture"]
            ]);
            ctx.start(evt);
          }
        },
        start(evt, mouseEvent) {
          client.is.firefox === true && preventDraggable(el, true);
          const pos = position(evt);
          ctx.event = {
            x: pos.left,
            y: pos.top,
            time: Date.now(),
            mouse: mouseEvent === true,
            dir: false
          };
        },
        move(evt) {
          if (ctx.event === void 0) return;
          if (ctx.event.dir !== false) {
            stopAndPrevent(evt);
            return;
          }
          const time = Date.now() - ctx.event.time;
          if (time === 0) return;
          const pos = position(evt), distX = pos.left - ctx.event.x, absX = Math.abs(distX), distY = pos.top - ctx.event.y, absY = Math.abs(distY);
          if (ctx.event.mouse !== true) {
            if (absX < ctx.sensitivity[1] && absY < ctx.sensitivity[1]) {
              ctx.end(evt);
              return;
            }
          } else if (window.getSelection().toString() !== "") {
            ctx.end(evt);
            return;
          } else if (absX < ctx.sensitivity[2] && absY < ctx.sensitivity[2]) {
            return;
          }
          const velX = absX / time, velY = absY / time;
          if (ctx.direction.vertical === true && absX < absY && absX < 100 && velY > ctx.sensitivity[0]) {
            ctx.event.dir = distY < 0 ? "up" : "down";
          }
          if (ctx.direction.horizontal === true && absX > absY && absY < 100 && velX > ctx.sensitivity[0]) {
            ctx.event.dir = distX < 0 ? "left" : "right";
          }
          if (ctx.direction.up === true && absX < absY && distY < 0 && absX < 100 && velY > ctx.sensitivity[0]) {
            ctx.event.dir = "up";
          }
          if (ctx.direction.down === true && absX < absY && distY > 0 && absX < 100 && velY > ctx.sensitivity[0]) {
            ctx.event.dir = "down";
          }
          if (ctx.direction.left === true && absX > absY && distX < 0 && absY < 100 && velX > ctx.sensitivity[0]) {
            ctx.event.dir = "left";
          }
          if (ctx.direction.right === true && absX > absY && distX > 0 && absY < 100 && velX > ctx.sensitivity[0]) {
            ctx.event.dir = "right";
          }
          if (ctx.event.dir !== false) {
            stopAndPrevent(evt);
            if (ctx.event.mouse === true) {
              document.body.classList.add("no-pointer-events--children");
              document.body.classList.add("non-selectable");
              clearSelection();
              ctx.styleCleanup = (withDelay) => {
                ctx.styleCleanup = void 0;
                document.body.classList.remove("non-selectable");
                const remove = () => {
                  document.body.classList.remove("no-pointer-events--children");
                };
                if (withDelay === true) {
                  setTimeout(remove, 50);
                } else {
                  remove();
                }
              };
            }
            ctx.handler({
              evt,
              touch: ctx.event.mouse !== true,
              mouse: ctx.event.mouse,
              direction: ctx.event.dir,
              duration: time,
              distance: {
                x: absX,
                y: absY
              }
            });
          } else {
            ctx.end(evt);
          }
        },
        end(evt) {
          var _a;
          if (ctx.event === void 0) return;
          cleanEvt(ctx, "temp");
          client.is.firefox === true && preventDraggable(el, false);
          (_a = ctx.styleCleanup) == null ? void 0 : _a.call(ctx, true);
          if (evt !== void 0 && ctx.event.dir !== false) stopAndPrevent(evt);
          ctx.event = void 0;
        }
      };
      el.__qtouchswipe = ctx;
      if (modifiers.mouse === true) {
        const capture = modifiers.mouseCapture === true || modifiers.mousecapture === true ? "Capture" : "";
        addEvt(ctx, "main", [
          [el, "mousedown", "mouseStart", `passive${capture}`]
        ]);
      }
      client.has.touch === true && addEvt(ctx, "main", [
        [el, "touchstart", "touchStart", `passive${modifiers.capture === true ? "Capture" : ""}`],
        [el, "touchmove", "noop", "notPassiveCapture"]
        // cannot be passive (ex: iOS scroll)
      ]);
    },
    updated(el, bindings) {
      const ctx = el.__qtouchswipe;
      if (ctx !== void 0) {
        if (bindings.oldValue !== bindings.value) {
          typeof bindings.value !== "function" && ctx.end();
          ctx.handler = bindings.value;
        }
        ctx.direction = getModifierDirections(bindings.modifiers);
      }
    },
    beforeUnmount(el) {
      var _a;
      const ctx = el.__qtouchswipe;
      if (ctx !== void 0) {
        cleanEvt(ctx, "main");
        cleanEvt(ctx, "temp");
        client.is.firefox === true && preventDraggable(el, false);
        (_a = ctx.styleCleanup) == null ? void 0 : _a.call(ctx);
        delete el.__qtouchswipe;
      }
    }
  }
);
function useRenderCache() {
  let cache = /* @__PURE__ */ Object.create(null);
  return {
    getCache: (key, defaultValue) => cache[key] === void 0 ? cache[key] = typeof defaultValue === "function" ? defaultValue() : defaultValue : cache[key],
    setCache(key, obj) {
      cache[key] = obj;
    },
    hasCache(key) {
      return Object.hasOwnProperty.call(cache, key);
    },
    clearCache(key) {
      if (key !== void 0) {
        delete cache[key];
      } else {
        cache = /* @__PURE__ */ Object.create(null);
      }
    }
  };
}
const usePanelChildProps = {
  name: { required: true },
  disable: Boolean
};
const PanelWrapper = {
  setup(_, { slots }) {
    return () => h("div", {
      class: "q-panel scroll",
      role: "tabpanel"
    }, hSlot(slots.default));
  }
};
const usePanelProps = {
  modelValue: {
    required: true
  },
  animated: Boolean,
  infinite: Boolean,
  swipeable: Boolean,
  vertical: Boolean,
  transitionPrev: String,
  transitionNext: String,
  transitionDuration: {
    type: [String, Number],
    default: 300
  },
  keepAlive: Boolean,
  keepAliveInclude: [String, Array, RegExp],
  keepAliveExclude: [String, Array, RegExp],
  keepAliveMax: Number
};
const usePanelEmits = ["update:modelValue", "beforeTransition", "transition"];
function usePanel() {
  const { props, emit, proxy } = getCurrentInstance();
  const { getCache } = useRenderCache();
  const { registerTimeout } = useTimeout();
  let panels, forcedPanelTransition;
  const panelTransition = ref(null);
  const panelIndex = { value: null };
  function onSwipe(evt) {
    const dir = props.vertical === true ? "up" : "left";
    goToPanelByOffset((proxy.$q.lang.rtl === true ? -1 : 1) * (evt.direction === dir ? 1 : -1));
  }
  const panelDirectives = computed(() => {
    return [[
      TouchSwipe,
      onSwipe,
      void 0,
      {
        horizontal: props.vertical !== true,
        vertical: props.vertical,
        mouse: true
      }
    ]];
  });
  const transitionPrev = computed(
    () => props.transitionPrev || `slide-${props.vertical === true ? "down" : "right"}`
  );
  const transitionNext = computed(
    () => props.transitionNext || `slide-${props.vertical === true ? "up" : "left"}`
  );
  const transitionStyle = computed(
    () => `--q-transition-duration: ${props.transitionDuration}ms`
  );
  const contentKey = computed(() => typeof props.modelValue === "string" || typeof props.modelValue === "number" ? props.modelValue : String(props.modelValue));
  const keepAliveProps = computed(() => ({
    include: props.keepAliveInclude,
    exclude: props.keepAliveExclude,
    max: props.keepAliveMax
  }));
  const needsUniqueKeepAliveWrapper = computed(
    () => props.keepAliveInclude !== void 0 || props.keepAliveExclude !== void 0
  );
  watch(() => props.modelValue, (newVal, oldVal) => {
    const index = isValidPanelName(newVal) === true ? getPanelIndex(newVal) : -1;
    if (forcedPanelTransition !== true) {
      updatePanelTransition(
        index === -1 ? 0 : index < getPanelIndex(oldVal) ? -1 : 1
      );
    }
    if (panelIndex.value !== index) {
      panelIndex.value = index;
      emit("beforeTransition", newVal, oldVal);
      registerTimeout(() => {
        emit("transition", newVal, oldVal);
      }, props.transitionDuration);
    }
  });
  function nextPanel() {
    goToPanelByOffset(1);
  }
  function previousPanel() {
    goToPanelByOffset(-1);
  }
  function goToPanel(name) {
    emit("update:modelValue", name);
  }
  function isValidPanelName(name) {
    return name !== void 0 && name !== null && name !== "";
  }
  function getPanelIndex(name) {
    return panels.findIndex((panel) => {
      return panel.props.name === name && panel.props.disable !== "" && panel.props.disable !== true;
    });
  }
  function getEnabledPanels() {
    return panels.filter((panel) => {
      return panel.props.disable !== "" && panel.props.disable !== true;
    });
  }
  function updatePanelTransition(direction) {
    const val = direction !== 0 && props.animated === true && panelIndex.value !== -1 ? "q-transition--" + (direction === -1 ? transitionPrev.value : transitionNext.value) : null;
    if (panelTransition.value !== val) {
      panelTransition.value = val;
    }
  }
  function goToPanelByOffset(direction, startIndex = panelIndex.value) {
    let index = startIndex + direction;
    while (index !== -1 && index < panels.length) {
      const opt = panels[index];
      if (opt !== void 0 && opt.props.disable !== "" && opt.props.disable !== true) {
        updatePanelTransition(direction);
        forcedPanelTransition = true;
        emit("update:modelValue", opt.props.name);
        setTimeout(() => {
          forcedPanelTransition = false;
        });
        return;
      }
      index += direction;
    }
    if (props.infinite === true && panels.length !== 0 && startIndex !== -1 && startIndex !== panels.length) {
      goToPanelByOffset(direction, direction === -1 ? panels.length : -1);
    }
  }
  function updatePanelIndex() {
    const index = getPanelIndex(props.modelValue);
    if (panelIndex.value !== index) {
      panelIndex.value = index;
    }
    return true;
  }
  function getPanelContentChild() {
    const panel = isValidPanelName(props.modelValue) === true && updatePanelIndex() && panels[panelIndex.value];
    return props.keepAlive === true ? [
      h(KeepAlive, keepAliveProps.value, [
        h(
          needsUniqueKeepAliveWrapper.value === true ? getCache(contentKey.value, () => ({ ...PanelWrapper, name: contentKey.value })) : PanelWrapper,
          { key: contentKey.value, style: transitionStyle.value },
          () => panel
        )
      ])
    ] : [
      h("div", {
        class: "q-panel scroll",
        style: transitionStyle.value,
        key: contentKey.value,
        role: "tabpanel"
      }, [panel])
    ];
  }
  function getPanelContent() {
    if (panels.length === 0) return;
    return props.animated === true ? [h(Transition, { name: panelTransition.value }, getPanelContentChild)] : getPanelContentChild();
  }
  function updatePanelsList(slots) {
    panels = getNormalizedVNodes(
      hSlot(slots.default, [])
    ).filter(
      (panel) => panel.props !== null && panel.props.slot === void 0 && isValidPanelName(panel.props.name) === true
    );
    return panels.length;
  }
  function getPanels() {
    return panels;
  }
  Object.assign(proxy, {
    next: nextPanel,
    previous: previousPanel,
    goTo: goToPanel
  });
  return {
    panelIndex,
    panelDirectives,
    updatePanelsList,
    updatePanelIndex,
    getPanelContent,
    getEnabledPanels,
    getPanels,
    isValidPanelName,
    keepAliveProps,
    needsUniqueKeepAliveWrapper,
    goToPanelByOffset,
    goToPanel,
    nextPanel,
    previousPanel
  };
}
const QTabPanel = createComponent({
  name: "QTabPanel",
  props: usePanelChildProps,
  setup(_, { slots }) {
    return () => h("div", { class: "q-tab-panel", role: "tabpanel" }, hSlot(slots.default));
  }
});
const QTabPanels = createComponent({
  name: "QTabPanels",
  props: {
    ...usePanelProps,
    ...useDarkProps
  },
  emits: usePanelEmits,
  setup(props, { slots }) {
    const vm = getCurrentInstance();
    const isDark = useDark(props, vm.proxy.$q);
    const { updatePanelsList, getPanelContent, panelDirectives } = usePanel();
    const classes = computed(
      () => "q-tab-panels q-panel-parent" + (isDark.value === true ? " q-tab-panels--dark q-dark" : "")
    );
    return () => {
      updatePanelsList(slots);
      return hDir(
        "div",
        { class: classes.value },
        getPanelContent(),
        "pan",
        props.swipeable,
        () => panelDirectives.value
      );
    };
  }
});
const duration = 150;
const QDrawer = createComponent({
  name: "QDrawer",
  inheritAttrs: false,
  props: {
    ...useModelToggleProps,
    ...useDarkProps,
    side: {
      type: String,
      default: "left",
      validator: (v) => ["left", "right"].includes(v)
    },
    width: {
      type: Number,
      default: 300
    },
    mini: Boolean,
    miniToOverlay: Boolean,
    miniWidth: {
      type: Number,
      default: 57
    },
    noMiniAnimation: Boolean,
    breakpoint: {
      type: Number,
      default: 1023
    },
    showIfAbove: Boolean,
    behavior: {
      type: String,
      validator: (v) => ["default", "desktop", "mobile"].includes(v),
      default: "default"
    },
    bordered: Boolean,
    elevated: Boolean,
    overlay: Boolean,
    persistent: Boolean,
    noSwipeOpen: Boolean,
    noSwipeClose: Boolean,
    noSwipeBackdrop: Boolean
  },
  emits: [
    ...useModelToggleEmits,
    "onLayout",
    "miniState"
  ],
  setup(props, { slots, emit, attrs }) {
    const vm = getCurrentInstance();
    const { proxy: { $q } } = vm;
    const isDark = useDark(props, $q);
    const { preventBodyScroll } = usePreventScroll();
    const { registerTimeout, removeTimeout } = useTimeout();
    const $layout = inject(layoutKey, emptyRenderFn);
    if ($layout === emptyRenderFn) {
      console.error("QDrawer needs to be child of QLayout");
      return emptyRenderFn;
    }
    let lastDesktopState, timerMini = null, layoutTotalWidthWatcher;
    const belowBreakpoint = ref(
      props.behavior === "mobile" || props.behavior !== "desktop" && $layout.totalWidth.value <= props.breakpoint
    );
    const isMini = computed(
      () => props.mini === true && belowBreakpoint.value !== true
    );
    const size = computed(() => isMini.value === true ? props.miniWidth : props.width);
    const showing = ref(
      props.showIfAbove === true && belowBreakpoint.value === false ? true : props.modelValue === true
    );
    const hideOnRouteChange = computed(
      () => props.persistent !== true && (belowBreakpoint.value === true || onScreenOverlay.value === true)
    );
    function handleShow(evt, noEvent) {
      addToHistory();
      evt !== false && $layout.animate();
      applyPosition(0);
      if (belowBreakpoint.value === true) {
        const otherInstance = $layout.instances[otherSide.value];
        if ((otherInstance == null ? void 0 : otherInstance.belowBreakpoint) === true) {
          otherInstance.hide(false);
        }
        applyBackdrop(1);
        $layout.isContainer.value !== true && preventBodyScroll(true);
      } else {
        applyBackdrop(0);
        evt !== false && setScrollable(false);
      }
      registerTimeout(() => {
        evt !== false && setScrollable(true);
        noEvent !== true && emit("show", evt);
      }, duration);
    }
    function handleHide(evt, noEvent) {
      removeFromHistory();
      evt !== false && $layout.animate();
      applyBackdrop(0);
      applyPosition(stateDirection.value * size.value);
      cleanup();
      if (noEvent !== true) {
        registerTimeout(() => {
          emit("hide", evt);
        }, duration);
      } else {
        removeTimeout();
      }
    }
    const { show, hide } = useModelToggle({
      showing,
      hideOnRouteChange,
      handleShow,
      handleHide
    });
    const { addToHistory, removeFromHistory } = useHistory(showing, hide, hideOnRouteChange);
    const instance2 = {
      belowBreakpoint,
      hide
    };
    const rightSide = computed(() => props.side === "right");
    const stateDirection = computed(
      () => ($q.lang.rtl === true ? -1 : 1) * (rightSide.value === true ? 1 : -1)
    );
    const flagBackdropBg = ref(0);
    const flagPanning = ref(false);
    const flagMiniAnimate = ref(false);
    const flagContentPosition = ref(
      // starting with "hidden" for SSR
      size.value * stateDirection.value
    );
    const otherSide = computed(() => rightSide.value === true ? "left" : "right");
    const offset = computed(() => showing.value === true && belowBreakpoint.value === false && props.overlay === false ? props.miniToOverlay === true ? props.miniWidth : size.value : 0);
    const fixed = computed(
      () => props.overlay === true || props.miniToOverlay === true || $layout.view.value.indexOf(rightSide.value ? "R" : "L") !== -1 || $q.platform.is.ios === true && $layout.isContainer.value === true
    );
    const onLayout = computed(
      () => props.overlay === false && showing.value === true && belowBreakpoint.value === false
    );
    const onScreenOverlay = computed(
      () => props.overlay === true && showing.value === true && belowBreakpoint.value === false
    );
    const backdropClass = computed(
      () => "fullscreen q-drawer__backdrop" + (showing.value === false && flagPanning.value === false ? " hidden" : "")
    );
    const backdropStyle = computed(() => ({
      backgroundColor: `rgba(0,0,0,${flagBackdropBg.value * 0.4})`
    }));
    const headerSlot = computed(() => rightSide.value === true ? $layout.rows.value.top[2] === "r" : $layout.rows.value.top[0] === "l");
    const footerSlot = computed(() => rightSide.value === true ? $layout.rows.value.bottom[2] === "r" : $layout.rows.value.bottom[0] === "l");
    const aboveStyle = computed(() => {
      const css = {};
      if ($layout.header.space === true && headerSlot.value === false) {
        if (fixed.value === true) {
          css.top = `${$layout.header.offset}px`;
        } else if ($layout.header.space === true) {
          css.top = `${$layout.header.size}px`;
        }
      }
      if ($layout.footer.space === true && footerSlot.value === false) {
        if (fixed.value === true) {
          css.bottom = `${$layout.footer.offset}px`;
        } else if ($layout.footer.space === true) {
          css.bottom = `${$layout.footer.size}px`;
        }
      }
      return css;
    });
    const style = computed(() => {
      const style2 = {
        width: `${size.value}px`,
        transform: `translateX(${flagContentPosition.value}px)`
      };
      return belowBreakpoint.value === true ? style2 : Object.assign(style2, aboveStyle.value);
    });
    const contentClass = computed(
      () => "q-drawer__content fit " + ($layout.isContainer.value !== true ? "scroll" : "overflow-auto")
    );
    const classes = computed(
      () => `q-drawer q-drawer--${props.side}` + (flagMiniAnimate.value === true ? " q-drawer--mini-animate" : "") + (props.bordered === true ? " q-drawer--bordered" : "") + (isDark.value === true ? " q-drawer--dark q-dark" : "") + (flagPanning.value === true ? " no-transition" : showing.value === true ? "" : " q-layout--prevent-focus") + (belowBreakpoint.value === true ? " fixed q-drawer--on-top q-drawer--mobile q-drawer--top-padding" : ` q-drawer--${isMini.value === true ? "mini" : "standard"}` + (fixed.value === true || onLayout.value !== true ? " fixed" : "") + (props.overlay === true || props.miniToOverlay === true ? " q-drawer--on-top" : "") + (headerSlot.value === true ? " q-drawer--top-padding" : ""))
    );
    const openDirective = computed(() => {
      const dir = $q.lang.rtl === true ? props.side : otherSide.value;
      return [[
        TouchPan,
        onOpenPan,
        void 0,
        {
          [dir]: true,
          mouse: true
        }
      ]];
    });
    const contentCloseDirective = computed(() => {
      const dir = $q.lang.rtl === true ? otherSide.value : props.side;
      return [[
        TouchPan,
        onClosePan,
        void 0,
        {
          [dir]: true,
          mouse: true
        }
      ]];
    });
    const backdropCloseDirective = computed(() => {
      const dir = $q.lang.rtl === true ? otherSide.value : props.side;
      return [[
        TouchPan,
        onClosePan,
        void 0,
        {
          [dir]: true,
          mouse: true,
          mouseAllDir: true
        }
      ]];
    });
    function updateBelowBreakpoint() {
      updateLocal(belowBreakpoint, props.behavior === "mobile" || props.behavior !== "desktop" && $layout.totalWidth.value <= props.breakpoint);
    }
    watch(belowBreakpoint, (val) => {
      if (val === true) {
        lastDesktopState = showing.value;
        showing.value === true && hide(false);
      } else if (props.overlay === false && props.behavior !== "mobile" && lastDesktopState !== false) {
        if (showing.value === true) {
          applyPosition(0);
          applyBackdrop(0);
          cleanup();
        } else {
          show(false);
        }
      }
    });
    watch(() => props.side, (newSide, oldSide) => {
      if ($layout.instances[oldSide] === instance2) {
        $layout.instances[oldSide] = void 0;
        $layout[oldSide].space = false;
        $layout[oldSide].offset = 0;
      }
      $layout.instances[newSide] = instance2;
      $layout[newSide].size = size.value;
      $layout[newSide].space = onLayout.value;
      $layout[newSide].offset = offset.value;
    });
    watch($layout.totalWidth, () => {
      if ($layout.isContainer.value === true || document.qScrollPrevented !== true) {
        updateBelowBreakpoint();
      }
    });
    watch(
      () => props.behavior + props.breakpoint,
      updateBelowBreakpoint
    );
    watch($layout.isContainer, (val) => {
      showing.value === true && preventBodyScroll(val !== true);
      val === true && updateBelowBreakpoint();
    });
    watch($layout.scrollbarWidth, () => {
      applyPosition(showing.value === true ? 0 : void 0);
    });
    watch(offset, (val) => {
      updateLayout("offset", val);
    });
    watch(onLayout, (val) => {
      emit("onLayout", val);
      updateLayout("space", val);
    });
    watch(rightSide, () => {
      applyPosition();
    });
    watch(size, (val) => {
      applyPosition();
      updateSizeOnLayout(props.miniToOverlay, val);
    });
    watch(() => props.miniToOverlay, (val) => {
      updateSizeOnLayout(val, size.value);
    });
    watch(() => $q.lang.rtl, () => {
      applyPosition();
    });
    watch(() => props.mini, () => {
      if (props.noMiniAnimation) return;
      if (props.modelValue === true) {
        animateMini();
        $layout.animate();
      }
    });
    watch(isMini, (val) => {
      emit("miniState", val);
    });
    function applyPosition(position2) {
      if (position2 === void 0) {
        nextTick(() => {
          position2 = showing.value === true ? 0 : size.value;
          applyPosition(stateDirection.value * position2);
        });
      } else {
        if ($layout.isContainer.value === true && rightSide.value === true && (belowBreakpoint.value === true || Math.abs(position2) === size.value)) {
          position2 += stateDirection.value * $layout.scrollbarWidth.value;
        }
        flagContentPosition.value = position2;
      }
    }
    function applyBackdrop(x) {
      flagBackdropBg.value = x;
    }
    function setScrollable(v) {
      const action = v === true ? "remove" : $layout.isContainer.value !== true ? "add" : "";
      action !== "" && document.body.classList[action]("q-body--drawer-toggle");
    }
    function animateMini() {
      timerMini !== null && clearTimeout(timerMini);
      if (vm.proxy && vm.proxy.$el) {
        vm.proxy.$el.classList.add("q-drawer--mini-animate");
      }
      flagMiniAnimate.value = true;
      timerMini = setTimeout(() => {
        var _a, _b;
        timerMini = null;
        flagMiniAnimate.value = false;
        (_b = (_a = vm == null ? void 0 : vm.proxy) == null ? void 0 : _a.$el) == null ? void 0 : _b.classList.remove("q-drawer--mini-animate");
      }, 150);
    }
    function onOpenPan(evt) {
      if (showing.value !== false) {
        return;
      }
      const width = size.value, position2 = between(evt.distance.x, 0, width);
      if (evt.isFinal === true) {
        const opened = position2 >= Math.min(75, width);
        if (opened === true) {
          show();
        } else {
          $layout.animate();
          applyBackdrop(0);
          applyPosition(stateDirection.value * width);
        }
        flagPanning.value = false;
        return;
      }
      applyPosition(
        ($q.lang.rtl === true ? rightSide.value !== true : rightSide.value) ? Math.max(width - position2, 0) : Math.min(0, position2 - width)
      );
      applyBackdrop(
        between(position2 / width, 0, 1)
      );
      if (evt.isFirst === true) {
        flagPanning.value = true;
      }
    }
    function onClosePan(evt) {
      if (showing.value !== true) {
        return;
      }
      const width = size.value, dir = evt.direction === props.side, position2 = ($q.lang.rtl === true ? dir !== true : dir) ? between(evt.distance.x, 0, width) : 0;
      if (evt.isFinal === true) {
        const opened = Math.abs(position2) < Math.min(75, width);
        if (opened === true) {
          $layout.animate();
          applyBackdrop(1);
          applyPosition(0);
        } else {
          hide();
        }
        flagPanning.value = false;
        return;
      }
      applyPosition(stateDirection.value * position2);
      applyBackdrop(between(1 - position2 / width, 0, 1));
      if (evt.isFirst === true) {
        flagPanning.value = true;
      }
    }
    function cleanup() {
      preventBodyScroll(false);
      setScrollable(true);
    }
    function updateLayout(prop, val) {
      $layout.update(props.side, prop, val);
    }
    function updateLocal(prop, val) {
      if (prop.value !== val) {
        prop.value = val;
      }
    }
    function updateSizeOnLayout(miniToOverlay, size2) {
      updateLayout("size", miniToOverlay === true ? props.miniWidth : size2);
    }
    $layout.instances[props.side] = instance2;
    updateSizeOnLayout(props.miniToOverlay, size.value);
    updateLayout("space", onLayout.value);
    updateLayout("offset", offset.value);
    if (props.showIfAbove === true && props.modelValue !== true && showing.value === true && props["onUpdate:modelValue"] !== void 0) {
      emit("update:modelValue", true);
    }
    onMounted(() => {
      emit("onLayout", onLayout.value);
      emit("miniState", isMini.value);
      lastDesktopState = props.showIfAbove === true;
      const fn = () => {
        const action = showing.value === true ? handleShow : handleHide;
        action(false, true);
      };
      if ($layout.totalWidth.value !== 0) {
        nextTick(fn);
        return;
      }
      layoutTotalWidthWatcher = watch($layout.totalWidth, () => {
        layoutTotalWidthWatcher();
        layoutTotalWidthWatcher = void 0;
        if (showing.value === false && props.showIfAbove === true && belowBreakpoint.value === false) {
          show(false);
        } else {
          fn();
        }
      });
    });
    onBeforeUnmount(() => {
      layoutTotalWidthWatcher == null ? void 0 : layoutTotalWidthWatcher();
      if (timerMini !== null) {
        clearTimeout(timerMini);
        timerMini = null;
      }
      showing.value === true && cleanup();
      if ($layout.instances[props.side] === instance2) {
        $layout.instances[props.side] = void 0;
        updateLayout("size", 0);
        updateLayout("offset", 0);
        updateLayout("space", false);
      }
    });
    return () => {
      const child = [];
      if (belowBreakpoint.value === true) {
        props.noSwipeOpen === false && child.push(
          withDirectives(
            h("div", {
              key: "open",
              class: `q-drawer__opener fixed-${props.side}`,
              "aria-hidden": "true"
            }),
            openDirective.value
          )
        );
        child.push(
          hDir(
            "div",
            {
              ref: "backdrop",
              class: backdropClass.value,
              style: backdropStyle.value,
              "aria-hidden": "true",
              onClick: hide
            },
            void 0,
            "backdrop",
            props.noSwipeBackdrop !== true && showing.value === true,
            () => backdropCloseDirective.value
          )
        );
      }
      const mini = isMini.value === true && slots.mini !== void 0;
      const content = [
        h(
          "div",
          {
            ...attrs,
            key: "" + mini,
            // required otherwise Vue will not diff correctly
            class: [
              contentClass.value,
              attrs.class
            ]
          },
          mini === true ? slots.mini() : hSlot(slots.default)
        )
      ];
      if (props.elevated === true && showing.value === true) {
        content.push(
          h("div", {
            class: "q-layout__shadow absolute-full overflow-hidden no-pointer-events"
          })
        );
      }
      child.push(
        hDir(
          "aside",
          { ref: "content", class: classes.value, style: style.value },
          content,
          "contentclose",
          props.noSwipeClose !== true && belowBreakpoint.value === true,
          () => contentCloseDirective.value
        )
      );
      return h("div", { class: "q-drawer-container" }, child);
    };
  }
});
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  ...{
    name: "RouterLink"
  },
  __name: "RouterLink",
  props: {
    title: {},
    titleOverride: { default: void 0 },
    name: { default: "#" },
    icon: { default: "" }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const __returned__ = {};
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QItem, {
    clickable: "",
    tag: "router-link",
    to: { name: $props.name }
  }, {
    default: withCtx(() => [
      $props.icon ? (openBlock(), createBlock(QItemSection, {
        key: 0,
        avatar: ""
      }, {
        default: withCtx(() => [
          createVNode(QIcon, { name: $props.icon }, null, 8, ["name"])
        ]),
        _: 1
      })) : createCommentVNode("", true),
      createVNode(QItemSection, null, {
        default: withCtx(() => [
          createVNode(QItemLabel, null, {
            default: withCtx(() => [
              $props.titleOverride ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                createTextVNode(toDisplayString($props.titleOverride), 1)
              ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                createTextVNode(toDisplayString($props.title), 1)
              ], 64))
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 8, ["to"]);
}
const RouterLink = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$e], ["__file", "RouterLink.vue"]]);
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "OutdatedFirmware",
  props: {
    persistent: { type: Boolean, default: false }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const __returned__ = {};
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QDialog, { persistent: $props.persistent }, {
    default: withCtx(() => [
      createVNode(QCard, { class: "dialog" }, {
        default: withCtx(() => [
          !$props.persistent ? withDirectives((openBlock(), createBlock(QBtn, {
            key: 0,
            icon: "close",
            flat: "",
            round: "",
            dense: "",
            class: "dialog-close-btn"
          }, null, 512)), [
            [ClosePopup]
          ]) : createCommentVNode("", true),
          createVNode(QCardSection, {
            class: "q-pa-none q-ma-md",
            align: "center"
          }, {
            default: withCtx(() => [
              createVNode(QIcon, {
                name: "mdi-alert-circle",
                color: "negative",
                size: "64px"
              }),
              _cache[1] || (_cache[1] = createBaseVNode("div", { class: "text-h6 q-my-sm" }, "Outdated Firmware Version", -1)),
              _cache[2] || (_cache[2] = createBaseVNode("p", null, [
                createTextVNode(" Firmware version on your Flipper does not support this app."),
                createBaseVNode("br"),
                createTextVNode("Click the button below to update your device. ")
              ], -1))
            ]),
            _: 1,
            __: [1, 2]
          }),
          createVNode(QCardSection, {
            class: "q-pt-none",
            align: "center"
          }, {
            default: withCtx(() => [
              withDirectives(createVNode(QBtn, {
                outline: "",
                color: "primary",
                label: "Update",
                onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$router.push({ name: "Device" }))
              }, null, 512), [
                [ClosePopup]
              ])
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 8, ["persistent"]);
}
const AppOutdatedFirmwareDialog = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$d], ["__file", "OutdatedFirmware.vue"]]);
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "DfuItem",
  props: {
    flipper: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const __returned__ = {};
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _imports_0$1 = "/lab.flipper.net/assets/flipper_black-Bz0M7FLf.svg";
const _imports_1 = "/lab.flipper.net/assets/flipper_transparent-bFEL3l2f.svg";
const _imports_2 = "/lab.flipper.net/assets/flipper_white-CbZX0AvW.svg";
const _hoisted_1$6 = {
  key: 0,
  src: _imports_0$1,
  style: { "width": "100%" }
};
const _hoisted_2$6 = {
  key: 1,
  src: _imports_1,
  style: { "width": "100%" }
};
const _hoisted_3$4 = {
  key: 2,
  src: _imports_2,
  style: { "width": "100%" }
};
const _hoisted_4$2 = { class: "text-h6" };
function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QItem, { class: "row rounded-borders" }, {
    default: withCtx(() => [
      createVNode(QItemSection, { class: "col-5" }, {
        default: withCtx(() => {
          var _a, _b;
          return [
            ((_a = $props.flipper.info) == null ? void 0 : _a.color) === 1 ? (openBlock(), createElementBlock("img", _hoisted_1$6)) : ((_b = $props.flipper.info) == null ? void 0 : _b.color) === 3 ? (openBlock(), createElementBlock("img", _hoisted_2$6)) : (openBlock(), createElementBlock("img", _hoisted_3$4))
          ];
        }),
        _: 1
      }),
      createVNode(QItemSection, { class: "col-5 q-pl-md" }, {
        default: withCtx(() => [
          createBaseVNode("div", null, [
            createBaseVNode("div", _hoisted_4$2, toDisplayString($props.flipper.name), 1),
            _cache[0] || (_cache[0] = createBaseVNode("div", { class: "text-caption text-blue-14" }, "Recovery mode", -1))
          ])
        ]),
        _: 1
      }),
      _ctx.$slots.default ? (openBlock(), createBlock(QItemSection, {
        key: 0,
        class: "col-2"
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps({ flipper: $props.flipper })))
        ]),
        _: 3
      })) : createCommentVNode("", true)
    ]),
    _: 3
  });
}
const FlipperDfuItem = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$c], ["__file", "DfuItem.vue"]]);
const _sfc_main$b = {};
function _sfc_render$b(_ctx, _cache) {
  return openBlock(), createBlock(QDialog, null, {
    default: withCtx(() => [
      createVNode(QCard, { class: "dialog" }, {
        default: withCtx(() => [
          withDirectives(createVNode(QBtn, {
            icon: "close",
            flat: "",
            round: "",
            dense: "",
            class: "dialog-close-btn"
          }, null, 512), [
            [ClosePopup]
          ]),
          createVNode(QCardSection, {
            class: "q-pa-none q-ma-md",
            align: "center"
          }, {
            default: withCtx(() => [
              createVNode(QIcon, {
                name: "mdi-alert-circle",
                color: "primary",
                size: "64px"
              }),
              _cache[0] || (_cache[0] = createBaseVNode("div", { class: "text-h6 q-my-sm" }, "Flipper not connected", -1)),
              renderSlot(_ctx.$slots, "description")
            ]),
            _: 3,
            __: [0]
          }),
          createVNode(QCardSection, {
            class: "q-pt-none",
            align: "center"
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          })
        ]),
        _: 3
      })
    ]),
    _: 3
  });
}
const FlipperConnectFlipperDialog = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$b], ["__file", "ConnectFlipper.vue"]]);
const _sfc_main$a = {};
function _sfc_render$a(_ctx, _cache) {
  return openBlock(), createBlock(QDialog, null, {
    default: withCtx(() => [
      createVNode(QCard, { class: "dialog" }, {
        default: withCtx(() => [
          withDirectives(createVNode(QBtn, {
            icon: "close",
            flat: "",
            round: "",
            dense: "",
            class: "dialog-close-btn"
          }, null, 512), [
            [ClosePopup]
          ]),
          createVNode(QCardSection, {
            class: "q-pa-none q-ma-md",
            align: "center"
          }, {
            default: withCtx(() => [
              createVNode(QIcon, {
                name: "mdi-alert-circle",
                color: "primary",
                size: "64px"
              }),
              _cache[0] || (_cache[0] = createBaseVNode("div", { class: "text-h6 q-my-sm" }, "Apps don't work in mobile browsers", -1)),
              _cache[1] || (_cache[1] = createBaseVNode("p", null, " Mobile browsers can't connect to Flipper, meaning you won't be able to install apps. ", -1)),
              _cache[2] || (_cache[2] = createBaseVNode("p", null, "Get the official mobile app – it has the same features!", -1))
            ]),
            _: 1,
            __: [0, 1, 2]
          }),
          createVNode(QCardSection, {
            class: "q-pt-none",
            align: "center"
          }, {
            default: withCtx(() => [
              createVNode(QBtn, {
                outline: "",
                color: "primary",
                label: "Download app",
                href: "https://flpr.app",
                target: "_blank"
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const FlipperMobileDetectedDialog = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$a], ["__file", "MobileDetected.vue"]]);
const _sfc_main$9 = {};
function _sfc_render$9(_ctx, _cache) {
  return openBlock(), createBlock(QDialog, null, {
    default: withCtx(() => [
      createVNode(QCard, { class: "dialog" }, {
        default: withCtx(() => [
          withDirectives(createVNode(QBtn, {
            icon: "close",
            flat: "",
            round: "",
            dense: "",
            class: "dialog-close-btn"
          }, null, 512), [
            [ClosePopup]
          ]),
          createVNode(QCardSection, {
            class: "q-pa-none q-ma-md",
            align: "center"
          }, {
            default: withCtx(() => [
              createVNode(QIcon, {
                name: "mdi-alert-circle",
                color: "primary",
                size: "64px"
              }),
              _cache[0] || (_cache[0] = createBaseVNode("div", { class: "text-h6 q-my-sm" }, "Unsupported browser", -1)),
              _cache[1] || (_cache[1] = createBaseVNode("p", null, [
                createTextVNode(" Your browser doesn't support WebSerial API. For better experience we recommend using Chrome for desktop."),
                createBaseVNode("br")
              ], -1))
            ]),
            _: 1,
            __: [0, 1]
          }),
          createVNode(QCardSection, {
            class: "q-pt-none",
            align: "center"
          }, {
            default: withCtx(() => [
              createVNode(QBtn, {
                outline: "",
                color: "primary",
                label: "Full list of supported browsers",
                href: "https://caniuse.com/web-serial",
                target: "_blank"
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const FlipperUnsupportedBrowserDialog = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9], ["__file", "UnsupportedBrowser.vue"]]);
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "DownloadPath",
  setup(__props, { expose: __expose }) {
    __expose();
    const flipperStore = useFlipperStore();
    const selectedDownloadPath = ref("");
    const selectDownloadPath = async () => {
      const res = await window.fs.updateDownloadPath();
      console.log(res);
      if ((res == null ? void 0 : res.status) === "error") {
        showNotif({
          message: res.message,
          color: "negative"
        });
      }
      if ((res == null ? void 0 : res.status) === "ok") {
        showNotif({
          message: `Download path set to ${res.path}`,
          color: "positive",
          timeout: 5e3
        });
        localStorage.setItem("flipperFileExplorerDownloadPath", res.path);
        selectedDownloadPath.value = res.path;
      }
    };
    const getDownloadPath = () => {
      const downloadPath = localStorage.getItem("flipperFileExplorerDownloadPath");
      if (downloadPath) {
        selectedDownloadPath.value = downloadPath;
      }
    };
    onMounted(() => {
      if (flipperStore.isElectron) {
        getDownloadPath();
      }
    });
    const __returned__ = { flipperStore, selectedDownloadPath, selectDownloadPath, getDownloadPath };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$5 = { class: "text-h6 q-my-sm" };
const _hoisted_2$5 = { key: 0 };
const _hoisted_3$3 = { class: "text-caption" };
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QDialog, null, {
    default: withCtx(() => [
      createVNode(QCard, { class: "dialog" }, {
        default: withCtx(() => [
          withDirectives(createVNode(QBtn, {
            icon: "close",
            flat: "",
            round: "",
            dense: "",
            class: "dialog-close-btn"
          }, null, 512), [
            [ClosePopup]
          ]),
          createVNode(QCardSection, {
            class: "q-pa-none q-ma-md",
            align: "center"
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_1$5, toDisplayString($setup.selectedDownloadPath ? "Update " : "Select ") + "download path ", 1),
              $setup.selectedDownloadPath ? (openBlock(), createElementBlock("p", _hoisted_2$5, [
                _cache[0] || (_cache[0] = createTextVNode(" Now saving to ", -1)),
                createBaseVNode("code", _hoisted_3$3, toDisplayString($setup.selectedDownloadPath), 1)
              ])) : createCommentVNode("", true)
            ]),
            _: 1
          }),
          createVNode(QCardSection, {
            class: "q-pt-none",
            align: "center"
          }, {
            default: withCtx(() => [
              createVNode(QBtn, {
                outline: "",
                color: "primary",
                label: "Select directory",
                onClick: $setup.selectDownloadPath
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const FlipperDownloadPathDialog = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8], ["__file", "DownloadPath.vue"]]);
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "Recovery",
  setup(__props, { expose: __expose }) {
    __expose();
    const flipperStore = useFlipperStore();
    const showRecoveryLog = ref(false);
    const scrollAreaRef = ref();
    const unbindLogs = ref();
    const unbindStatus = ref();
    const unbinding = () => {
      if (unbindLogs.value) {
        unbindLogs.value();
      }
      if (unbindStatus.value) {
        unbindStatus.value();
      }
    };
    onMounted(() => {
      unbindLogs.value = emitter.on("log", (stderr) => {
        const logLines = stderr.data.split("\n");
        logLines.pop();
        logLines.forEach(() => {
          if (scrollAreaRef.value) {
            scrollAreaRef.value.setScrollPercentage("vertical", 1);
          }
        });
      });
      unbindStatus.value = emitter.on("status", async (status) => {
        if (status.error || status.finished) {
          unbinding();
        }
      });
    });
    onUnmounted(() => {
      unbinding();
    });
    const __returned__ = { flipperStore, showRecoveryLog, scrollAreaRef, unbindLogs, unbindStatus, unbinding, get ProgressBar() {
      return ProgressBar;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$4 = { class: "text-bold text-negative" };
const _hoisted_2$4 = { class: "full-width q-mb-md" };
const _hoisted_3$2 = {
  class: "full-width bg-grey-12 q-px-sm q-py-xs rounded-borders",
  style: { "height": "300px" }
};
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QDialog, null, {
    default: withCtx(() => [
      createVNode(QCard, {
        class: "dialog",
        style: { "width": "100%", "max-width": "min(calc(100vw - 16px), 1000px)" }
      }, {
        default: withCtx(() => [
          $setup.flipperStore.recoveryError ? withDirectives((openBlock(), createBlock(QBtn, {
            key: 0,
            icon: "close",
            flat: "",
            round: "",
            dense: "",
            class: "dialog-close-btn"
          }, null, 512)), [
            [ClosePopup]
          ]) : createCommentVNode("", true),
          createVNode(QCardSection, { class: "row items-center" }, {
            default: withCtx(() => _cache[1] || (_cache[1] = [
              createBaseVNode("div", { class: "text-h6" }, "Repair", -1)
            ])),
            _: 1,
            __: [1]
          }),
          createVNode(QCardSection, { class: "row items-center" }, {
            default: withCtx(() => [
              $setup.flipperStore.recoveryError ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                createBaseVNode("p", _hoisted_1$4, toDisplayString($setup.flipperStore.recoveryUpdateStage), 1),
                createBaseVNode("div", _hoisted_2$4, [
                  createVNode(QBtn, {
                    unelevated: "",
                    color: "primary",
                    label: "Retry",
                    onClick: $setup.flipperStore.retry
                  }, null, 8, ["onClick"])
                ])
              ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                createBaseVNode("p", null, toDisplayString($setup.flipperStore.recoveryUpdateStage), 1),
                createVNode($setup["ProgressBar"], {
                  progress: $setup.flipperStore.recoveryProgress,
                  interpolated: ""
                }, null, 8, ["progress"])
              ], 64)),
              createVNode(QExpansionItem, {
                modelValue: $setup.showRecoveryLog,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.showRecoveryLog = $event),
                class: "full-width q-mt-md",
                icon: "svguse:common-icons.svg#logs",
                label: "View logs"
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_3$2, [
                    createVNode(QScrollArea, {
                      ref: "scrollAreaRef",
                      class: "fit text-left"
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createElementBlock(Fragment, null, renderList($setup.flipperStore.recoveryLogs, (line) => {
                          return openBlock(), createElementBlock("code", { key: line }, [
                            createTextVNode(toDisplayString(line) + " ", 1),
                            _cache[2] || (_cache[2] = createBaseVNode("br", null, null, -1))
                          ]);
                        }), 128))
                      ]),
                      _: 1
                    }, 512)
                  ])
                ]),
                _: 1
              }, 8, ["modelValue"])
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const FlipperRecoveryDialog = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7], ["__file", "Recovery.vue"]]);
const _imports_0 = "/lab.flipper.net/assets/flipper-busy-CWr_K-l1.svg";
const _sfc_main$6 = {};
function _sfc_render$6(_ctx, _cache) {
  return openBlock(), createBlock(QDialog, null, {
    default: withCtx(() => [
      createVNode(QCard, { class: "dialog" }, {
        default: withCtx(() => [
          withDirectives(createVNode(QBtn, {
            icon: "close",
            flat: "",
            round: "",
            dense: "",
            class: "dialog-close-btn"
          }, null, 512), [
            [ClosePopup]
          ]),
          createVNode(QCardSection, {
            class: "q-pa-none q-ma-md",
            align: "center"
          }, {
            default: withCtx(() => _cache[0] || (_cache[0] = [
              createBaseVNode("img", {
                src: _imports_0,
                class: "q-ml-xs"
              }, null, -1),
              createBaseVNode("div", { class: "text-h6 q-my-sm" }, "Flipper is Busy", -1),
              createBaseVNode("div", { class: "text-body q-my-sm" }, " Exit the current app on Flipper to use this feature ", -1)
            ])),
            _: 1,
            __: [0]
          }),
          createVNode(QCardActions, { align: "center" }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          })
        ]),
        _: 3
      })
    ]),
    _: 3
  });
}
const FlipperBusyDialog = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6], ["__file", "Busy.vue"]]);
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "KeypadButton",
  props: {
    icon: {},
    iconHover: {},
    iconActive: {},
    size: {},
    keys: {}
  },
  emits: ["onShortPress", "onLongPress", "onRepeat"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit = __emit;
    const button = ref();
    const isPressed = ref(false);
    const isLongPress = ref(false);
    const timers = ref();
    const repeatInterval = ref();
    const handlePressStart = () => {
      isPressed.value = true;
      isLongPress.value = false;
      timers.value = setTimeout(() => {
        isLongPress.value = true;
        emit("onLongPress");
      }, 300);
      repeatInterval.value = setInterval(() => {
        if (isLongPress.value) {
          emit("onRepeat");
        }
      }, 150);
    };
    const handlePressEnd = () => {
      isPressed.value = false;
      isLongPress.value = false;
      clearTimeout(timers.value);
      clearInterval(repeatInterval.value);
      if (!isLongPress.value) {
        emit("onShortPress");
      }
    };
    const handleLeaveMouse = () => {
      if (isPressed.value) {
        handlePressEnd();
      }
    };
    const handleKeydown = (event) => {
      props.keys.forEach((key) => {
        var _a;
        if (event.code === key) {
          if (!timers.value) {
            handlePressStart();
            (_a = button.value) == null ? void 0 : _a.classList.add("active");
          }
        }
      });
    };
    const handleKeyup = (event) => {
      props.keys.forEach((key) => {
        var _a;
        if (event.code === key) {
          handlePressEnd();
          timers.value = void 0;
          (_a = button.value) == null ? void 0 : _a.classList.remove("active");
        }
      });
    };
    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("keyup", handleKeyup);
    onUnmounted(() => {
      clearTimeout(timers.value);
      clearInterval(repeatInterval.value);
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("keyup", handleKeyup);
    });
    const __returned__ = { props, emit, button, isPressed, isLongPress, timers, repeatInterval, handlePressStart, handlePressEnd, handleLeaveMouse, handleKeydown, handleKeyup };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    ref: "button",
    class: "control cursor-pointer",
    onMousedown: $setup.handlePressStart,
    onMouseup: $setup.handlePressEnd,
    onMouseleave: $setup.handleLeaveMouse
  }, [
    createVNode(QIcon, {
      class: "control--default",
      name: $props.icon,
      size: $props.size,
      color: "transparent"
    }, null, 8, ["name", "size"]),
    createVNode(QIcon, {
      class: "control--hover",
      name: $props.iconHover || $props.icon,
      size: $props.size,
      color: "transparent"
    }, null, 8, ["name", "size"]),
    createVNode(QIcon, {
      class: "control--active",
      name: $props.iconActive || $props.icon,
      size: $props.size,
      color: "transparent"
    }, null, 8, ["name", "size"])
  ], 544);
}
const FlipperKeypadButton = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5], ["__scopeId", "data-v-4cc0fc91"], ["__file", "KeypadButton.vue"]]);
function getCssVar(propName, element = document.body) {
  if (typeof propName !== "string") {
    throw new TypeError("Expected a string as propName");
  }
  if (!(element instanceof Element)) {
    throw new TypeError("Expected a DOM element");
  }
  return getComputedStyle(element).getPropertyValue(`--q-${propName}`).trim() || null;
}
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "Switch",
  setup(__props, { expose: __expose }) {
    __expose();
    const flipperStore = useFlipperStore();
    const onSwitchFlipper = async () => {
      flipperStore.dialogs.multiflipper = true;
    };
    const connectFlipper = (flipper) => {
      flipperStore.connectFlipper(flipper);
    };
    const countFlippers = computed(
      () => flipperStore.availableFlippers.length + flipperStore.availableDfuFlippers.length
    );
    const firmwareVersion = (flipper) => {
      var _a, _b, _c;
      console.log(flipper);
      if (((_a = flipper.info) == null ? void 0 : _a.firmware.branch) === "dev") {
        return `Dev ${(_b = flipper.info) == null ? void 0 : _b.firmware.commit}`;
      }
      return (_c = flipper.info) == null ? void 0 : _c.firmware.version;
    };
    const __returned__ = { flipperStore, onSwitchFlipper, connectFlipper, countFlippers, firmwareVersion, get getCssVar() {
      return getCssVar;
    }, get FlipperDfuItem() {
      return FlipperDfuItem;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$3 = {
  key: 0,
  src: _imports_0$1,
  style: { "width": "100%" }
};
const _hoisted_2$3 = {
  key: 1,
  src: _imports_1,
  style: { "width": "100%" }
};
const _hoisted_3$1 = {
  key: 2,
  src: _imports_2,
  style: { "width": "100%" }
};
const _hoisted_4$1 = { class: "text-h6" };
const _hoisted_5$1 = { class: "text-caption" };
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(Fragment, null, [
    createVNode(QItem, {
      disable: $setup.flipperStore.flags.disableButtonMultiflipper || $setup.flipperStore.flags.disableNavigation,
      clickable: "",
      onClick: $setup.onSwitchFlipper
    }, {
      default: withCtx(() => [
        createVNode(QItemSection, {
          avatar: "",
          class: "items-center"
        }, {
          default: withCtx(() => [
            createVNode(QAvatar, {
              size: "md",
              square: ""
            }, {
              default: withCtx(() => [
                createVNode(QIcon, {
                  name: "flipper:switch",
                  size: "32px"
                }),
                $setup.countFlippers > 1 ? (openBlock(), createBlock(QBadge, {
                  key: 0,
                  color: "primary",
                  floating: "",
                  style: { "top": "0px", "right": "-4px", "font-size": "9px", "padding": "1px 4.5px" },
                  label: $setup.countFlippers
                }, null, 8, ["label"])) : createCommentVNode("", true)
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        createVNode(QItemSection, null, {
          default: withCtx(() => [
            createVNode(QItemLabel, null, {
              default: withCtx(() => _cache[1] || (_cache[1] = [
                createTextVNode("My Flippers", -1)
              ])),
              _: 1,
              __: [1]
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["disable"]),
    createVNode(QDialog, {
      modelValue: $setup.flipperStore.dialogs.multiflipper,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.flipperStore.dialogs.multiflipper = $event)
    }, {
      default: withCtx(() => [
        createVNode(QCard, { class: "rounded-borders" }, {
          default: withCtx(() => [
            createVNode(QCardSection, {
              class: "row items-center",
              style: { "min-width": "350px" }
            }, {
              default: withCtx(() => [
                createVNode(QList, { class: "q-gutter-y-md full-width" }, {
                  default: withCtx(() => {
                    var _a, _b;
                    return [
                      (openBlock(true), createElementBlock(Fragment, null, renderList($setup.flipperStore.availableFlippers, (flipper) => {
                        return withDirectives((openBlock(), createBlock(QItem, {
                          key: flipper.info.hardware.name,
                          class: "row rounded-borders",
                          style: normalizeStyle(`${$setup.flipperStore.flipperName === flipper.name ? "border: 2px solid " + $setup.getCssVar("primary") : ""}`),
                          active: $setup.flipperStore.flipperName === flipper.name,
                          clickable: $setup.flipperStore.flipperName !== flipper.name,
                          onClick: ($event) => $setup.connectFlipper(flipper)
                        }, {
                          default: withCtx(() => [
                            createVNode(QItemSection, { class: "col-5" }, {
                              default: withCtx(() => {
                                var _a2, _b2;
                                return [
                                  ((_a2 = flipper.info) == null ? void 0 : _a2.hardware.color) === "1" ? (openBlock(), createElementBlock("img", _hoisted_1$3)) : ((_b2 = flipper.info) == null ? void 0 : _b2.hardware.color) === "3" ? (openBlock(), createElementBlock("img", _hoisted_2$3)) : (openBlock(), createElementBlock("img", _hoisted_3$1))
                                ];
                              }),
                              _: 2
                            }, 1024),
                            createVNode(QItemSection, { class: "col-5 q-pl-md" }, {
                              default: withCtx(() => {
                                var _a2;
                                return [
                                  createBaseVNode("div", null, [
                                    createBaseVNode("div", _hoisted_4$1, toDisplayString((_a2 = flipper.info) == null ? void 0 : _a2.hardware.name), 1),
                                    createBaseVNode("div", _hoisted_5$1, " Firmware " + toDisplayString($setup.firmwareVersion(flipper)), 1)
                                  ])
                                ];
                              }),
                              _: 2
                            }, 1024),
                            createVNode(QItemSection, { class: "col-2" }, {
                              default: withCtx(() => [
                                $setup.flipperStore.flipperName === flipper.name ? (openBlock(), createBlock(QIcon, {
                                  key: 0,
                                  color: "primary",
                                  name: "mdi-check-circle-outline",
                                  size: "md"
                                })) : createCommentVNode("", true)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1032, ["style", "active", "clickable", "onClick"])), [
                          [ClosePopup]
                        ]);
                      }), 128)),
                      (openBlock(true), createElementBlock(Fragment, null, renderList($setup.flipperStore.availableDfuFlippers, (flipper) => {
                        return openBlock(), createBlock($setup["FlipperDfuItem"], {
                          key: flipper.name,
                          flipper
                        }, {
                          default: withCtx(({ flipper: flipper2 }) => [
                            createVNode(QBtn, {
                              unelevated: "",
                              dense: "",
                              color: "primary",
                              label: "Repair",
                              onClick: ($event) => $setup.flipperStore.recovery(flipper2.info)
                            }, null, 8, ["onClick"])
                          ]),
                          _: 2
                        }, 1032, ["flipper"]);
                      }), 128)),
                      !((_a = $setup.flipperStore.availableFlippers) == null ? void 0 : _a.length) && !((_b = $setup.flipperStore.availableDfuFlippers) == null ? void 0 : _b.length) ? (openBlock(), createBlock(QItem, {
                        key: 0,
                        class: "row rounded-borders"
                      }, {
                        default: withCtx(() => [
                          createVNode(QItemSection, { class: "col-5" }, {
                            default: withCtx(() => _cache[2] || (_cache[2] = [
                              createBaseVNode("img", {
                                src: _imports_2,
                                style: { "width": "100%", "filter": "opacity(0.3)" }
                              }, null, -1)
                            ])),
                            _: 1,
                            __: [2]
                          }),
                          createVNode(QItemSection, { class: "col-7 q-pl-md" }, {
                            default: withCtx(() => _cache[3] || (_cache[3] = [
                              createBaseVNode("div", null, [
                                createBaseVNode("div", { class: "text-h6" }, "Waiting for connection..."),
                                createBaseVNode("div", { class: "text-caption" }, "Your Flippers will appear here")
                              ], -1)
                            ])),
                            _: 1,
                            __: [3]
                          })
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ];
                  }),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["modelValue"])
  ], 64);
}
const FlipperSwitch = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["__file", "Switch.vue"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "LogCard",
  props: {
    flat: { type: Boolean, default: false },
    isDialog: { type: Boolean, default: false }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const scrollArea = ref();
    onMounted(() => {
      if (scrollArea.value) {
        scrollArea.value.setScrollPercentage("vertical", 1);
      }
    });
    watch(history.value, () => {
      if (scrollArea.value) {
        scrollArea.value.setScrollPercentage("vertical", 1);
      }
    });
    logger.setLevel("info", true);
    const originalFactory = logger.methodFactory;
    logger.methodFactory = function(methodName, logLevel, loggerName) {
      const rawMethod = originalFactory(methodName, logLevel, loggerName);
      return function(message) {
        if (methodName !== "debug") {
          rawMethod(message);
        }
      };
    };
    logger.setLevel(logger.getLevel());
    const downloadLogs = () => {
      let text = "";
      for (const line of history.value) {
        text += `${line.time} [${line.level}] ${line.message}
`;
      }
      const dl = document.createElement("a");
      dl.setAttribute("download", "logs.txt");
      dl.setAttribute("href", "data:text/plain," + text);
      dl.style.visibility = "hidden";
      document.body.append(dl);
      dl.click();
      dl.remove();
    };
    const __returned__ = { scrollArea, originalFactory, downloadLogs, get history() {
      return history;
    }, get QScrollArea() {
      return QScrollArea;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$2 = {
  style: { "height": "300px", "min-width": "280px", "width": "100%" },
  class: "bg-grey-12 q-pa-xs rounded-borders"
};
const _hoisted_2$2 = { key: 0 };
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QCard, {
    class: normalizeClass(["card", { dialog: $props.isDialog }]),
    flat: $props.flat
  }, {
    default: withCtx(() => [
      createVNode(QCardSection, { class: "row items-center q-pb-none" }, {
        default: withCtx(() => [
          _cache[0] || (_cache[0] = createBaseVNode("h6", { class: "q-ma-none" }, "Logs", -1)),
          createVNode(QSpace),
          withDirectives(createVNode(QBtn, {
            icon: "close",
            flat: "",
            round: "",
            dense: ""
          }, null, 512), [
            [ClosePopup]
          ])
        ]),
        _: 1,
        __: [0]
      }),
      createVNode(QCardSection, null, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1$2, [
            createVNode($setup["QScrollArea"], {
              ref: "scrollArea",
              class: "fit"
            }, {
              default: withCtx(() => [
                !$setup.history.length ? (openBlock(), createElementBlock("code", _hoisted_2$2, "Logs will appear here...")) : createCommentVNode("", true),
                (openBlock(true), createElementBlock(Fragment, null, renderList($setup.history, (line) => {
                  return openBlock(), createElementBlock("code", {
                    key: line.timestamp
                  }, [
                    createTextVNode(toDisplayString(`${line.time.padEnd(8)} [${line.level.toUpperCase()}] [${line.context}] ${line.message}`) + " ", 1),
                    _cache[1] || (_cache[1] = createBaseVNode("br", null, null, -1))
                  ]);
                }), 128))
              ]),
              _: 1
            }, 512)
          ])
        ]),
        _: 1
      }),
      createVNode(QCardSection, {
        align: "right",
        class: "q-pt-none"
      }, {
        default: withCtx(() => [
          createVNode(QBtn, {
            flat: "",
            label: "Download",
            onClick: $setup.downloadLogs
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 8, ["flat", "class"]);
}
const FlipperLogCard = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__scopeId", "data-v-26ee27dc"], ["__file", "LogCard.vue"]]);
const componentName = "ExpandView";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ExpandView",
  setup(__props, { expose: __expose }) {
    const flipperStore = useFlipperStore();
    const orientation = ref(0);
    const screenScale = ref(4);
    const rotationCalculation = computed(() => {
      switch (orientation.value) {
        case 1:
          return 2;
        case 2:
          return 1;
        case 3:
          return 3;
        default:
          return 0;
      }
    });
    const scaleCalculation = computed(() => {
      switch (orientation.value) {
        case 2:
          return 0.5;
        case 3:
          return 0.5;
        default:
          return 1;
      }
    });
    const onInputEvent = ({ key, type }) => {
      var _a, _b, _c;
      (_a = flipperStore.flipper) == null ? void 0 : _a.RPC("guiSendInputEvent", { key, type: "PRESS" }).catch(
        (error) => rpcErrorHandler({ componentName, error, command: "guiSendInputEvent" })
      );
      (_b = flipperStore.flipper) == null ? void 0 : _b.RPC("guiSendInputEvent", { key, type }).catch(
        (error) => rpcErrorHandler({ componentName, error, command: "guiSendInputEvent" })
      );
      (_c = flipperStore.flipper) == null ? void 0 : _c.RPC("guiSendInputEvent", { key, type: "RELEASE" }).catch(
        (error) => rpcErrorHandler({ componentName, error, command: "guiSendInputEvent" })
      );
    };
    const screenStreamExpandCanvas = ref();
    const frameRenderer = ref();
    __expose({
      screenStreamExpandCanvas
    });
    const saveImage = (isClipboard = false) => {
      if (screenStreamExpandCanvas.value) {
        screenStreamExpandCanvas.value.toBlob(
          async (blob) => {
            if (blob) {
              if (isClipboard) {
                const clipboardItem = new ClipboardItem({ "image/png": blob });
                await navigator.clipboard.write([clipboardItem]);
                showNotif({
                  message: "Flipper screen copied to clipboard",
                  color: "info",
                  timeout: 500
                });
              } else {
                exportFile(`Screenshot-${(/* @__PURE__ */ new Date()).toISOString()}.png`, blob);
              }
            }
          },
          "image/png",
          1
        );
      }
    };
    const expandViewCard = ref();
    const gridBackground = ref();
    const resizeCanvas = () => {
      if (gridBackground.value && expandViewCard.value) {
        const QCardDOMRect = expandViewCard.value.$el.getBoundingClientRect();
        const width = gridBackground.value.width = QCardDOMRect.width;
        const height = gridBackground.value.height = QCardDOMRect.height;
        const cellSize = 35;
        const ctx = gridBackground.value.getContext("2d");
        if (ctx) {
          ctx.strokeStyle = "#aa5115";
          ctx.lineWidth = 2;
          for (let yPos = cellSize; yPos < height; yPos += cellSize) {
            const pos = Math.floor(yPos);
            ctx.moveTo(0, pos);
            ctx.lineTo(width, pos);
          }
          for (let xPos = cellSize; xPos < width; xPos += cellSize) {
            const pos = Math.floor(xPos);
            ctx.moveTo(pos, 0);
            ctx.lineTo(pos, height);
          }
          ctx.stroke();
        }
      }
    };
    const copyToClipboard = (event) => {
      if (event.metaKey && event.code === "KeyC") {
        saveImage(true);
      }
    };
    const unbindFrame = ref();
    const startScreenStreamFrame = () => {
      if (flipperStore.flipper) {
        unbindFrame.value = flipperStore.flipper.emitter.on(
          "screenStream/frame",
          (data, frameOrientation) => {
            orientation.value = Number(frameOrientation);
            if (screenStreamExpandCanvas.value) {
              if (frameRenderer.value) {
                frameRenderer.value.renderFrame({
                  data,
                  scale: screenScale.value
                });
              }
            }
          }
        );
      }
    };
    const startScreenStream = async () => {
      await flipperStore.startScreenStream().then(() => {
        logger.debug({
          context: componentName,
          message: "guiStartScreenStream: OK"
        });
        startScreenStreamFrame();
      }).catch((error) => {
        rpcErrorHandler({
          componentName,
          error,
          command: "guiStartScreenStream"
        });
      });
    };
    const stopScreenStream = async () => {
      await flipperStore.stopScreenStream().then(() => {
        logger.debug({
          context: componentName,
          message: "guiStopScreenStream: OK"
        });
      }).catch((error) => {
        rpcErrorHandler({
          componentName,
          error,
          command: "guiStopScreenStream"
        });
      }).finally(() => {
        flipperStore.expandView = false;
      });
    };
    watch(
      () => flipperStore.flipperReady,
      async (newValue) => {
        if (!newValue) {
          if (flipperStore.isScreenStream) {
            await stopScreenStream();
          } else {
            flipperStore.expandView = false;
          }
        }
      }
    );
    const showDialog = async () => {
      var _a;
      if (screenStreamExpandCanvas.value) {
        frameRenderer.value = new FrameRenderer(
          screenStreamExpandCanvas.value,
          128 * screenScale.value,
          64 * screenScale.value
        );
        if ((_a = flipperStore.flipper) == null ? void 0 : _a.frameData) {
          frameRenderer.value.renderFrame({
            data: flipperStore.flipper.frameData,
            scale: screenScale.value
          });
        }
      }
      if (flipperStore.flipperReady) {
        if (flipperStore.rpcActive) {
          if (!flipperStore.isScreenStream) {
            await startScreenStream();
          } else {
            startScreenStreamFrame();
          }
        }
      }
      await nextTick();
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);
      document.addEventListener("keydown", copyToClipboard);
    };
    const hideDialog = () => {
      if (!flipperStore.pageWithScreenStream) {
        stopScreenStream();
      }
      if (unbindFrame.value) {
        unbindFrame.value();
      }
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("keydown", copyToClipboard);
    };
    const __returned__ = { flipperStore, componentName, orientation, screenScale, rotationCalculation, scaleCalculation, onInputEvent, screenStreamExpandCanvas, frameRenderer, saveImage, expandViewCard, gridBackground, resizeCanvas, copyToClipboard, unbindFrame, startScreenStreamFrame, startScreenStream, stopScreenStream, showDialog, hideDialog, get FlipperKeypadButton() {
      return FlipperKeypadButton;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$1 = {
  ref: "gridBackground",
  class: "absolute-center",
  style: { "opacity": "0.15" }
};
const _hoisted_2$1 = { class: "row justify-center items-center" };
const _hoisted_3 = {
  class: "relative-position bg-primary q-pa-sm rounded-borders q-mr-lg",
  style: { "border": "3px solid #9e5823" }
};
const _hoisted_4 = ["width", "height"];
const _hoisted_5 = { class: "controls column items-end" };
const _hoisted_6 = { class: "controls__dpad dpad q-mb-md" };
const _hoisted_7 = { class: "column items-end" };
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QDialog, {
    class: "expandView",
    onShow: $setup.showDialog,
    onHide: $setup.hideDialog
  }, {
    default: withCtx(() => [
      createVNode(QCard, {
        ref: "expandViewCard",
        class: "expandView__wrapper full-width column rounded-borders",
        style: { "min-width": "fit-content" }
      }, {
        default: withCtx(() => [
          _cache[19] || (_cache[19] = createBaseVNode("span", { class: "scanLine absolute fit" }, null, -1)),
          createBaseVNode("canvas", _hoisted_1$1, null, 512),
          createVNode(QCardSection, { class: "row col items-center justify-center q-pa-xl" }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_2$1, [
                createBaseVNode("div", _hoisted_3, [
                  createBaseVNode("canvas", {
                    width: 128 * $setup.screenScale,
                    height: 64 * $setup.screenScale,
                    style: normalizeStyle([{ "image-rendering": "pixelated" }, `rotate: ${90 * $setup.rotationCalculation}deg; scale: ${$setup.scaleCalculation};`]),
                    ref: "screenStreamExpandCanvas"
                  }, null, 12, _hoisted_4)
                ]),
                createBaseVNode("div", _hoisted_5, [
                  createBaseVNode("div", _hoisted_6, [
                    createVNode($setup["FlipperKeypadButton"], {
                      class: "dpad__top",
                      icon: "flipper:control-triangle",
                      iconHover: "flipper:control-triangle-hover",
                      iconActive: "flipper:control-triangle-down",
                      size: "32px",
                      onOnLongPress: _cache[0] || (_cache[0] = ($event) => $setup.onInputEvent({
                        key: "UP",
                        type: "LONG"
                      })),
                      onOnShortPress: _cache[1] || (_cache[1] = ($event) => $setup.onInputEvent({
                        key: "UP",
                        type: "SHORT"
                      })),
                      onOnRepeat: _cache[2] || (_cache[2] = ($event) => $setup.onInputEvent({
                        key: "UP",
                        type: "REPEAT"
                      })),
                      keys: ["ArrowUp", "KeyW"]
                    }),
                    createVNode($setup["FlipperKeypadButton"], {
                      class: "dpad__right",
                      icon: "flipper:control-triangle",
                      iconHover: "flipper:control-triangle-hover",
                      iconActive: "flipper:control-triangle-down",
                      size: "32px",
                      onOnLongPress: _cache[3] || (_cache[3] = ($event) => $setup.onInputEvent({
                        key: "RIGHT",
                        type: "LONG"
                      })),
                      onOnShortPress: _cache[4] || (_cache[4] = ($event) => $setup.onInputEvent({
                        key: "RIGHT",
                        type: "SHORT"
                      })),
                      onOnRepeat: _cache[5] || (_cache[5] = ($event) => $setup.onInputEvent({
                        key: "RIGHT",
                        type: "REPEAT"
                      })),
                      keys: ["ArrowRight", "KeyD"]
                    }),
                    createVNode($setup["FlipperKeypadButton"], {
                      class: "dpad__bottom",
                      icon: "flipper:control-triangle",
                      iconHover: "flipper:control-triangle-hover",
                      iconActive: "flipper:control-triangle-down",
                      size: "32px",
                      onOnLongPress: _cache[6] || (_cache[6] = ($event) => $setup.onInputEvent({
                        key: "DOWN",
                        type: "LONG"
                      })),
                      onOnShortPress: _cache[7] || (_cache[7] = ($event) => $setup.onInputEvent({
                        key: "DOWN",
                        type: "SHORT"
                      })),
                      onOnRepeat: _cache[8] || (_cache[8] = ($event) => $setup.onInputEvent({
                        key: "DOWN",
                        type: "REPEAT"
                      })),
                      keys: ["ArrowDown", "KeyS"]
                    }),
                    createVNode($setup["FlipperKeypadButton"], {
                      class: "dpad__left",
                      icon: "flipper:control-triangle",
                      iconHover: "flipper:control-triangle-hover",
                      iconActive: "flipper:control-triangle-down",
                      size: "32px",
                      onOnLongPress: _cache[9] || (_cache[9] = ($event) => $setup.onInputEvent({
                        key: "LEFT",
                        type: "LONG"
                      })),
                      onOnShortPress: _cache[10] || (_cache[10] = ($event) => $setup.onInputEvent({
                        key: "LEFT",
                        type: "SHORT"
                      })),
                      onOnRepeat: _cache[11] || (_cache[11] = ($event) => $setup.onInputEvent({
                        key: "LEFT",
                        type: "REPEAT"
                      })),
                      keys: ["ArrowLeft", "KeyA"]
                    }),
                    createVNode($setup["FlipperKeypadButton"], {
                      class: "dpad__center",
                      icon: "flipper:control-circle",
                      iconHover: "flipper:control-circle-hover",
                      iconActive: "flipper:control-circle-down",
                      size: "52px",
                      onOnLongPress: _cache[12] || (_cache[12] = ($event) => $setup.onInputEvent({
                        key: "OK",
                        type: "LONG"
                      })),
                      onOnShortPress: _cache[13] || (_cache[13] = ($event) => $setup.onInputEvent({
                        key: "OK",
                        type: "SHORT"
                      })),
                      onOnRepeat: _cache[14] || (_cache[14] = ($event) => $setup.onInputEvent({
                        key: "OK",
                        type: "REPEAT"
                      })),
                      keys: ["Space", "Enter"]
                    })
                  ]),
                  createVNode($setup["FlipperKeypadButton"], {
                    icon: "flipper:control-back",
                    iconHover: "flipper:control-back-hover",
                    iconActive: "flipper:control-back-down",
                    size: "52px",
                    onOnLongPress: _cache[15] || (_cache[15] = ($event) => $setup.onInputEvent({
                      key: "BACK",
                      type: "LONG"
                    })),
                    onOnShortPress: _cache[16] || (_cache[16] = ($event) => $setup.onInputEvent({
                      key: "BACK",
                      type: "SHORT"
                    })),
                    onOnRepeat: _cache[17] || (_cache[17] = ($event) => $setup.onInputEvent({
                      key: "BACK",
                      type: "REPEAT"
                    })),
                    keys: ["Backspace"]
                  })
                ])
              ])
            ]),
            _: 1
          }),
          createVNode(QCardActions, {
            class: "items-end q-pa-md",
            align: "between"
          }, {
            default: withCtx(() => [
              withDirectives(createVNode(QBtn, {
                outline: "",
                label: "Back",
                icon: "flipper:chevron-left",
                color: "primary",
                onClick: $setup.hideDialog
              }, null, 512), [
                [ClosePopup]
              ]),
              createVNode(QBtn, {
                outline: "",
                label: "Save screenshot",
                icon: "flipper:save-symbolic",
                color: "primary",
                onClick: _cache[18] || (_cache[18] = ($event) => $setup.saveImage())
              }),
              createBaseVNode("div", _hoisted_7, [
                createVNode(QBtn, {
                  flat: "",
                  padding: "sm",
                  icon: "flipper:info-big",
                  color: "primary"
                }, {
                  default: withCtx(() => [
                    createVNode(QTooltip, {
                      class: "controlHelp",
                      anchor: "bottom right",
                      self: "top right",
                      offset: [16, 20],
                      style: { "border": "1px solid #662c00", "background": "#210f00" }
                    }, {
                      default: withCtx(() => [
                        createVNode(QIcon, {
                          name: "flipper:steaming-help-mac",
                          style: { "width": "207px", "height": "102px" }
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ])
            ]),
            _: 1
          })
        ]),
        _: 1,
        __: [19]
      }, 512)
    ]),
    _: 1
  });
}
const FlipperExpandView = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__scopeId", "data-v-b095a25b"], ["__file", "ExpandView.vue"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Drawer",
  setup(__props, { expose: __expose }) {
    __expose();
    const flipperStore = useFlipperStore();
    const appsStore = useAppsStore();
    const tab = ref("home");
    const showSettingsMenu = () => {
      tab.value = "settings";
    };
    const showHomeMenu = () => {
      tab.value = "home";
    };
    const linksList = [
      {
        title: "My Flipper",
        icon: "flipper:device",
        name: "Device",
        titleOverride: computed(() => flipperStore.flipperName || "My Flipper")
      },
      {
        title: "Apps",
        icon: "flipper:apps",
        name: "Apps"
      },
      {
        title: "Files",
        icon: "flipper:files",
        name: "Archive"
      },
      {
        title: "CLI",
        icon: "flipper:cli",
        name: "Cli"
      },
      {
        title: "NFC tools",
        icon: "flipper:nfctools",
        name: "NfcTools"
      },
      {
        title: "Paint",
        icon: "flipper:paint",
        name: "Paint"
      },
      {
        title: "Pulse Plotter",
        icon: "flipper:subtools",
        name: "PulsePlotter"
      }
    ];
    const toggleAutoReconnect = () => {
      var _a;
      localStorage.setItem(
        "autoReconnect",
        String(flipperStore.flags.autoReconnect)
      );
      if (!flipperStore.flags.autoReconnect) {
        clearInterval(flipperStore.reconnectInterval);
      } else {
        if (!((_a = flipperStore.flipper) == null ? void 0 : _a.connected)) {
          flipperStore.onAutoReconnect();
        }
      }
    };
    const toggleCatalogChannel = () => {
      const catalogChannel = appsStore.flags.catalogChannelProduction ? PRODUCTION_NAME : DEVELOP_NAME;
      instance.defaults.baseURL = getBaseUrl(catalogChannel);
    };
    const showLogsDialog = () => {
      flipperStore.dialogs.logs = true;
    };
    const showDownloadPathDialog = () => {
      flipperStore.dialogs.downloadPath = true;
    };
    const selectedDownloadPath = ref("");
    onMounted(() => {
      if (flipperStore.isElectron) {
        const downloadPath = localStorage.getItem("flipperFileExplorerDownloadPath");
        if (downloadPath) {
          selectedDownloadPath.value = downloadPath;
        }
      }
    });
    const __returned__ = { flipperStore, appsStore, tab, showSettingsMenu, showHomeMenu, linksList, toggleAutoReconnect, toggleCatalogChannel, showLogsDialog, showDownloadPathDialog, selectedDownloadPath, get RouterLink() {
      return RouterLink;
    }, get FlipperConnectWebBtn() {
      return FlipperConnectWebBtn;
    }, get FlipperSwitch() {
      return FlipperSwitch;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QDrawer, {
    class: "menu-link bg-grey-2",
    "show-if-above": "",
    width: 175,
    breakpoint: 900
  }, {
    default: withCtx(() => [
      createVNode(QScrollArea, { class: "fit" }, {
        default: withCtx(() => [
          createVNode(QTabPanels, {
            modelValue: $setup.tab,
            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.tab = $event),
            class: "fit bg-transparent",
            animated: ""
          }, {
            default: withCtx(() => [
              createVNode(QTabPanel, {
                class: "no-padding",
                name: "home"
              }, {
                default: withCtx(() => [
                  createVNode(QList, { class: "column fit justify-between no-wrap" }, {
                    default: withCtx(() => [
                      createBaseVNode("div", null, [
                        (openBlock(), createElementBlock(Fragment, null, renderList($setup.linksList, (link) => {
                          return createVNode($setup["RouterLink"], mergeProps({
                            key: link.title,
                            disable: $setup.flipperStore.flags.disableNavigation
                          }, { ref_for: true }, link), null, 16, ["disable"]);
                        }), 64))
                      ]),
                      createVNode(QSpace),
                      createVNode(QItem, {
                        clickable: "",
                        onClick: $setup.showSettingsMenu
                      }, {
                        default: withCtx(() => [
                          createVNode(QItemSection, { avatar: "" }, {
                            default: withCtx(() => [
                              createVNode(QIcon, {
                                name: "flipper:settings",
                                size: "24px"
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(QItemSection, null, {
                            default: withCtx(() => [
                              createVNode(QItemLabel, null, {
                                default: withCtx(() => _cache[4] || (_cache[4] = [
                                  createTextVNode("Settings", -1)
                                ])),
                                _: 1,
                                __: [4]
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(QSeparator, { class: "menu-link__separator" }),
                      !$setup.flipperStore.isElectron ? (openBlock(), createBlock($setup["FlipperConnectWebBtn"], {
                        key: 0,
                        type: "item"
                      })) : (openBlock(), createBlock($setup["FlipperSwitch"], { key: 1 }))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(QTabPanel, {
                class: "no-padding",
                name: "settings"
              }, {
                default: withCtx(() => [
                  createVNode(QList, { class: "column fit justify-between no-wrap" }, {
                    default: withCtx(() => [
                      createVNode(QSpace),
                      createVNode(QItem, null, {
                        default: withCtx(() => [
                          !$setup.flipperStore.isElectron ? (openBlock(), createBlock(QToggle, {
                            key: 0,
                            modelValue: $setup.flipperStore.flags.autoReconnect,
                            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.flipperStore.flags.autoReconnect = $event),
                            dense: "",
                            label: "Auto reconnect",
                            disable: $setup.flipperStore.flags.disableNavigation,
                            onClick: $setup.toggleAutoReconnect
                          }, null, 8, ["modelValue", "disable"])) : createCommentVNode("", true)
                        ]),
                        _: 1
                      }),
                      $setup.appsStore.flags.catalogCanSwitchChannel ? (openBlock(), createBlock(QItem, { key: 0 }, {
                        default: withCtx(() => [
                          createVNode(QToggle, {
                            modelValue: $setup.appsStore.flags.catalogChannelProduction,
                            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.appsStore.flags.catalogChannelProduction = $event),
                            dense: "",
                            label: "Production Apps",
                            disable: $setup.flipperStore.flags.disableNavigation,
                            onClick: $setup.toggleCatalogChannel
                          }, null, 8, ["modelValue", "disable"])
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      $setup.appsStore.flags.catalogCanInstallAllApps ? (openBlock(), createBlock(QItem, { key: 1 }, {
                        default: withCtx(() => [
                          createVNode(QToggle, {
                            modelValue: $setup.appsStore.flags.catalogInstallAllApps,
                            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.appsStore.flags.catalogInstallAllApps = $event),
                            dense: "",
                            label: "Install All Apps"
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      $setup.flipperStore.isElectron ? (openBlock(), createBlock(QItem, {
                        key: 2,
                        clickable: "",
                        onClick: $setup.showDownloadPathDialog
                      }, {
                        default: withCtx(() => [
                          createVNode(QItemSection, {
                            avatar: "",
                            style: { "min-width": "initial" }
                          }, {
                            default: withCtx(() => [
                              createVNode(QIcon, { name: "mdi-folder-arrow-down-outline" })
                            ]),
                            _: 1
                          }),
                          createVNode(QItemSection, null, {
                            default: withCtx(() => [
                              createVNode(QItemLabel, null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString($setup.selectedDownloadPath ? "Update " : "Select ") + "download path", 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      createVNode(QItem, {
                        clickable: "",
                        onClick: $setup.showLogsDialog
                      }, {
                        default: withCtx(() => [
                          createVNode(QItemSection, {
                            avatar: "",
                            style: { "min-width": "initial" }
                          }, {
                            default: withCtx(() => [
                              createVNode(QIcon, { name: "flipper:logs" })
                            ]),
                            _: 1
                          }),
                          createVNode(QItemSection, null, {
                            default: withCtx(() => [
                              createVNode(QItemLabel, null, {
                                default: withCtx(() => _cache[5] || (_cache[5] = [
                                  createTextVNode("View logs", -1)
                                ])),
                                _: 1,
                                __: [5]
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(QItem, {
                        clickable: "",
                        onClick: $setup.showHomeMenu
                      }, {
                        default: withCtx(() => [
                          createVNode(QItemSection, { avatar: "" }, {
                            default: withCtx(() => [
                              createVNode(QIcon, {
                                size: "2rem",
                                name: "mdi-chevron-left"
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(QItemSection, null, {
                            default: withCtx(() => [
                              createVNode(QItemLabel, null, {
                                default: withCtx(() => _cache[6] || (_cache[6] = [
                                  createTextVNode("Back", -1)
                                ])),
                                _: 1,
                                __: [6]
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["modelValue"])
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const AppDrawer = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-59a0246f"], ["__file", "Drawer.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "MainLayout"
  },
  __name: "MainLayout",
  setup(__props, { expose: __expose }) {
    __expose();
    const route = useRoute();
    const router = useRouter();
    const appsStore = useAppsStore();
    const flipperStore = useFlipperStore();
    const leftDrawerOpen = ref(false);
    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };
    onMounted(async () => {
      if (localStorage.getItem("autoReconnect") !== "false") {
        flipperStore.flags.autoReconnect = true;
      } else {
        flipperStore.flags.autoReconnect = false;
      }
      if (!flipperStore.isElectron && flipperStore.flags.autoReconnect) {
        flipperStore.onAutoReconnect();
      }
    });
    const goToDeviceControl = () => {
      flipperStore.expandView = true;
      router.push({ name: "Device" });
    };
    const __returned__ = { route, router, appsStore, flipperStore, leftDrawerOpen, toggleLeftDrawer, goToDeviceControl, get AppHeader() {
      return AppHeader;
    }, get AppDrawer() {
      return AppDrawer;
    }, get Loading() {
      return Loading;
    }, get FlipperMicroSDCard() {
      return FlipperMicroSDCard;
    }, get FlipperConnectFlipperDialog() {
      return FlipperConnectFlipperDialog;
    }, get FlipperMobileDetectedDialog() {
      return FlipperMobileDetectedDialog;
    }, get FlipperUnsupportedBrowserDialog() {
      return FlipperUnsupportedBrowserDialog;
    }, get FlipperDownloadPathDialog() {
      return FlipperDownloadPathDialog;
    }, get FlipperRecoveryDialog() {
      return FlipperRecoveryDialog;
    }, get FlipperBusyDialog() {
      return FlipperBusyDialog;
    }, get FlipperDfuItem() {
      return FlipperDfuItem;
    }, get AppOutdatedFirmwareDialog() {
      return AppOutdatedFirmwareDialog;
    }, get FlipperConnectWebBtn() {
      return FlipperConnectWebBtn;
    }, get FlipperLogCard() {
      return FlipperLogCard;
    }, get FlipperExpandView() {
      return FlipperExpandView;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = { key: 0 };
const _hoisted_2 = { key: 1 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_view = resolveComponent("router-view");
  return openBlock(), createBlock(QLayout, { view: "hhh LpR fff" }, {
    default: withCtx(() => [
      !$setup.flipperStore.isElectron ? (openBlock(), createBlock($setup["AppHeader"], {
        key: 0,
        onToggleLeftDrawer: $setup.toggleLeftDrawer
      })) : createCommentVNode("", true),
      createVNode($setup["AppDrawer"], {
        modelValue: $setup.leftDrawerOpen,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.leftDrawerOpen = $event)
      }, null, 8, ["modelValue"]),
      createVNode(QPageContainer, null, {
        default: withCtx(() => [
          $setup.route.meta.canLoadWithoutFlipper || $setup.flipperStore.flipperReady || $setup.flipperStore.flags.switchFlipper || $setup.flipperStore.flags.updateInProgress ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            $setup.flipperStore.flags.switchFlipper ? (openBlock(), createBlock(QPage, {
              key: 0,
              class: "flex flex-center",
              padding: ""
            }, {
              default: withCtx(() => [
                createVNode($setup["Loading"], { label: "Switching Flipper..." })
              ]),
              _: 1
            })) : $setup.flipperStore.loadingInfo ? (openBlock(), createBlock(QPage, {
              key: 1,
              class: "flex flex-center",
              padding: ""
            }, {
              default: withCtx(() => [
                createVNode($setup["Loading"], { label: "Loading info..." })
              ]),
              _: 1
            })) : (openBlock(), createBlock(_component_router_view, { key: 2 }))
          ], 64)) : $setup.flipperStore.isElectron ? (openBlock(), createBlock(QPage, {
            key: 1,
            class: "flex flex-center fit",
            padding: ""
          }, {
            default: withCtx(() => [
              createVNode(QCard, { flat: "" }, {
                default: withCtx(() => [
                  createVNode(QCardSection, {
                    class: "q-pa-none q-ma-md",
                    align: "center"
                  }, {
                    default: withCtx(() => [
                      !$setup.flipperStore.flags.isBridgeReady || $setup.flipperStore.flags.flipperIsInitialized ? (openBlock(), createBlock($setup["Loading"], {
                        key: 0,
                        label: "Flipper is initialized..."
                      })) : $setup.flipperStore.availableDfuFlippers.length ? (openBlock(), createBlock(QList, {
                        key: 1,
                        class: "q-gutter-y-md full-width"
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createElementBlock(Fragment, null, renderList($setup.flipperStore.availableDfuFlippers, (flipper) => {
                            return openBlock(), createBlock($setup["FlipperDfuItem"], {
                              key: flipper.name,
                              flipper
                            }, {
                              default: withCtx(({ flipper: flipper2 }) => [
                                createVNode(QBtn, {
                                  unelevated: "",
                                  dense: "",
                                  color: "primary",
                                  label: "Repair",
                                  onClick: ($event) => $setup.flipperStore.recovery(flipper2.info)
                                }, null, 8, ["onClick"])
                              ]),
                              _: 2
                            }, 1032, ["flipper"]);
                          }), 128))
                        ]),
                        _: 1
                      })) : (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                        createVNode(QImg, {
                          src: _imports_0$3,
                          width: "70px",
                          "no-spinner": ""
                        }),
                        _cache[12] || (_cache[12] = createBaseVNode("div", { class: "text-h6 q-my-sm" }, "Flipper not connected", -1))
                      ], 64))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          })) : (openBlock(), createBlock(QPage, {
            key: 2,
            class: "flex flex-center fit",
            padding: ""
          }, {
            default: withCtx(() => [
              createVNode($setup["FlipperConnectWebBtn"])
            ]),
            _: 1
          })),
          createVNode(QDialog, {
            modelValue: $setup.flipperStore.dialogs.microSDcardMissing,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.flipperStore.dialogs.microSDcardMissing = $event)
          }, {
            default: withCtx(() => [
              createVNode($setup["FlipperMicroSDCard"], {
                isDialog: "",
                showFindMicroSdBtn: $setup.flipperStore.isElectron,
                onOnFindMicroSd: $setup.flipperStore.findMicroSd
              }, null, 8, ["showFindMicroSdBtn", "onOnFindMicroSd"])
            ]),
            _: 1
          }, 8, ["modelValue"]),
          createVNode($setup["AppOutdatedFirmwareDialog"], {
            modelValue: $setup.appsStore.dialogs.outdatedFirmwareDialog,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.appsStore.dialogs.outdatedFirmwareDialog = $event),
            persistent: $setup.appsStore.dialogs.outdatedFirmwareDialogPersistent
          }, null, 8, ["modelValue", "persistent"]),
          createVNode($setup["FlipperConnectFlipperDialog"], {
            modelValue: $setup.flipperStore.dialogs.connectFlipper,
            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.flipperStore.dialogs.connectFlipper = $event)
          }, {
            description: withCtx(() => [
              $setup.flipperStore.isElectron ? (openBlock(), createElementBlock("p", _hoisted_1, "Plug in your Flipper and and wait for initialization")) : (openBlock(), createElementBlock("p", _hoisted_2, "Plug in your Flipper and click the button below"))
            ]),
            default: withCtx(() => [
              !$setup.flipperStore.isElectron ? (openBlock(), createBlock($setup["FlipperConnectWebBtn"], { key: 0 })) : createCommentVNode("", true)
            ]),
            _: 1
          }, 8, ["modelValue"]),
          createVNode($setup["FlipperMobileDetectedDialog"], {
            modelValue: $setup.flipperStore.dialogs.mobileDetected,
            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.flipperStore.dialogs.mobileDetected = $event)
          }, null, 8, ["modelValue"]),
          createVNode($setup["FlipperUnsupportedBrowserDialog"], {
            modelValue: $setup.flipperStore.dialogs.serialUnsupported,
            "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.flipperStore.dialogs.serialUnsupported = $event)
          }, null, 8, ["modelValue"]),
          createVNode(QDialog, {
            modelValue: $setup.flipperStore.dialogs.logs,
            "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.flipperStore.dialogs.logs = $event)
          }, {
            default: withCtx(() => [
              createVNode($setup["FlipperLogCard"], { isDialog: "" })
            ]),
            _: 1
          }, 8, ["modelValue"]),
          createVNode($setup["FlipperDownloadPathDialog"], {
            modelValue: $setup.flipperStore.dialogs.downloadPath,
            "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $setup.flipperStore.dialogs.downloadPath = $event)
          }, null, 8, ["modelValue"]),
          createVNode($setup["FlipperRecoveryDialog"], {
            modelValue: $setup.flipperStore.dialogs.recovery,
            "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $setup.flipperStore.dialogs.recovery = $event),
            persistent: $setup.flipperStore.flags.recovering && !$setup.flipperStore.recoveryError,
            onHide: _cache[9] || (_cache[9] = ($event) => $setup.flipperStore.resetRecovery(true))
          }, null, 8, ["modelValue", "persistent"]),
          createVNode($setup["FlipperBusyDialog"], {
            modelValue: $setup.flipperStore.flags.flipperIsBusy,
            "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => $setup.flipperStore.flags.flipperIsBusy = $event)
          }, {
            default: withCtx(() => [
              withDirectives(createVNode(QBtn, {
                onClick: $setup.goToDeviceControl,
                label: "Go to Device Control",
                color: "primary",
                outline: "",
                "no-caps": ""
              }, null, 512), [
                [ClosePopup]
              ])
            ]),
            _: 1
          }, 8, ["modelValue"]),
          createVNode($setup["FlipperExpandView"], {
            modelValue: $setup.flipperStore.expandView,
            "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => $setup.flipperStore.expandView = $event)
          }, null, 8, ["modelValue"])
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const MainLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "MainLayout.vue"]]);
export {
  MainLayout
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgtRFpJaVB4LS0uanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zaGFyZWQvY29tcG9uZW50cy9Fc3NlbnRpYWxMaW5rL0Vzc2VudGlhbExpbmsudnVlIiwiLi4vLi4vLi4vc3JjL2FwcC9sYXlvdXRzL01haW4vY29tcG9uZW50cy9IZWFkZXIudnVlIiwiLi4vLi4vLi4vc3JjL3NoYXJlZC9hc3NldHMvZmxpcHBlcl9sYWJfbG9nb19tb25vY2hyb21lLnN2ZyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2RpcmVjdGl2ZXMvdG91Y2gtc3dpcGUvVG91Y2hTd2lwZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3VzZS1yZW5kZXItY2FjaGUvdXNlLXJlbmRlci1jYWNoZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLXBhbmVsL3VzZS1wYW5lbC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvdGFiLXBhbmVscy9RVGFiUGFuZWwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3RhYi1wYW5lbHMvUVRhYlBhbmVscy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvZHJhd2VyL1FEcmF3ZXIuanMiLCIuLi8uLi8uLi9zcmMvc2hhcmVkL2NvbXBvbmVudHMvUm91dGVyTGluay9Sb3V0ZXJMaW5rLnZ1ZSIsIi4uLy4uLy4uL3NyYy9lbnRpdGllcy9BcHBzL3VpL0RpYWxvZ3MvT3V0ZGF0ZWRGaXJtd2FyZS52dWUiLCIuLi8uLi8uLi9zcmMvc2hhcmVkL2Fzc2V0cy9mbGlwcGVyX2JsYWNrLnN2ZyIsIi4uLy4uLy4uL3NyYy9zaGFyZWQvYXNzZXRzL2ZsaXBwZXJfdHJhbnNwYXJlbnQuc3ZnIiwiLi4vLi4vLi4vc3JjL3NoYXJlZC9hc3NldHMvZmxpcHBlcl93aGl0ZS5zdmciLCIuLi8uLi8uLi9zcmMvZW50aXRpZXMvRmxpcHBlci91aS9EZnVJdGVtLnZ1ZSIsIi4uLy4uLy4uL3NyYy9lbnRpdGllcy9GbGlwcGVyL3VpL0RpYWxvZ3MvQ29ubmVjdEZsaXBwZXIudnVlIiwiLi4vLi4vLi4vc3JjL2VudGl0aWVzL0ZsaXBwZXIvdWkvRGlhbG9ncy9Nb2JpbGVEZXRlY3RlZC52dWUiLCIuLi8uLi8uLi9zcmMvZW50aXRpZXMvRmxpcHBlci91aS9EaWFsb2dzL1Vuc3VwcG9ydGVkQnJvd3Nlci52dWUiLCIuLi8uLi8uLi9zcmMvZW50aXRpZXMvRmxpcHBlci91aS9EaWFsb2dzL0Rvd25sb2FkUGF0aC52dWUiLCIuLi8uLi8uLi9zcmMvZW50aXRpZXMvRmxpcHBlci91aS9EaWFsb2dzL1JlY292ZXJ5LnZ1ZSIsIi4uLy4uLy4uL3NyYy9zaGFyZWQvYXNzZXRzL2ZsaXBwZXItYnVzeS5zdmciLCIuLi8uLi8uLi9zcmMvZW50aXRpZXMvRmxpcHBlci91aS9EaWFsb2dzL0J1c3kudnVlIiwiLi4vLi4vLi4vc3JjL2VudGl0aWVzL0ZsaXBwZXIvdWkvS2V5cGFkQnV0dG9uLnZ1ZSIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL2Nzcy12YXIvZ2V0LWNzcy12YXIuanMiLCIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvRmxpcHBlci91aS9Td2l0Y2gudnVlIiwiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL0ZsaXBwZXIvdWkvTG9nQ2FyZC52dWUiLCIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvRmxpcHBlci91aS9FeHBhbmRWaWV3LnZ1ZSIsIi4uLy4uLy4uL3NyYy9hcHAvbGF5b3V0cy9NYWluL2NvbXBvbmVudHMvRHJhd2VyLnZ1ZSIsIi4uLy4uLy4uL3NyYy9hcHAvbGF5b3V0cy9NYWluL01haW5MYXlvdXQudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgPHEtaXRlbSBjbGlja2FibGUgdGFnPVwiYVwiIHRhcmdldD1cIl9ibGFua1wiIDpocmVmPVwibGlua1wiPlxuICAgIDxxLWl0ZW0tc2VjdGlvbiB2LWlmPVwiaWNvblwiIGF2YXRhcj5cbiAgICAgIDxxLWljb24gOm5hbWU9XCJpY29uXCIgLz5cbiAgICA8L3EtaXRlbS1zZWN0aW9uPlxuXG4gICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgPHEtaXRlbS1sYWJlbD57eyB0aXRsZSB9fTwvcS1pdGVtLWxhYmVsPlxuICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gIDwvcS1pdGVtPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCB7IEVzc2VudGlhbExpbmtQcm9wcyB9IGZyb20gJy4vdHlwZXMnXG5cbmRlZmluZU9wdGlvbnMoe1xuICBuYW1lOiAnRXNzZW50aWFsTGluaydcbn0pXG5cbndpdGhEZWZhdWx0cyhkZWZpbmVQcm9wczxFc3NlbnRpYWxMaW5rUHJvcHM+KCksIHtcbiAgbGluazogJyMnLFxuICBpY29uOiAnJ1xufSlcbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICA8cS1oZWFkZXI+XG4gICAgPHEtdG9vbGJhcj5cbiAgICAgIDxxLWJ0blxuICAgICAgICB2LXNob3c9XCIkcS5zY3JlZW4ueHNcIlxuICAgICAgICBmbGF0XG4gICAgICAgIGRlbnNlXG4gICAgICAgIHJvdW5kXG4gICAgICAgIGljb249XCJtZW51XCJcbiAgICAgICAgYXJpYS1sYWJlbD1cIk1lbnVcIlxuICAgICAgICBAY2xpY2s9XCJlbWl0KCd0b2dnbGVMZWZ0RHJhd2VyJylcIlxuICAgICAgLz5cblxuICAgICAgPGltZ1xuICAgICAgICB2LXNob3c9XCIhJHEuc2NyZWVuLnhzXCJcbiAgICAgICAgc3JjPVwifmFzc2V0cy9mbGlwcGVyX2xhYl9sb2dvX21vbm9jaHJvbWUuc3ZnXCJcbiAgICAgICAgY2xhc3M9XCJxLW1sLXhzXCJcbiAgICAgICAgc3R5bGU9XCJoZWlnaHQ6IDM2cHhcIlxuICAgICAgLz5cblxuICAgICAgPHEtc3BhY2UgLz5cblxuICAgICAgPHEtYnRuXG4gICAgICAgIHYtaWY9XCIkcS5zY3JlZW4ueHNcIlxuICAgICAgICBAY2xpY2s9XCJsaW5rc01lbnUgPSAhbGlua3NNZW51XCJcbiAgICAgICAgaWNvbj1cIm9wZW5faW5fbmV3XCJcbiAgICAgICAgZGVuc2VcbiAgICAgICAgZmxhdFxuICAgICAgICByb3VuZFxuICAgICAgICBjbGFzcz1cInEtbWwtc21cIlxuICAgICAgPlxuICAgICAgICA8cS1tZW51IGZpdD5cbiAgICAgICAgICA8cS1saXN0IGNsYXNzPVwibmF2LWxpbmtzIG5hdi1saW5rc19fYmxhY2tcIj5cbiAgICAgICAgICAgIDxFc3NlbnRpYWxMaW5rXG4gICAgICAgICAgICAgIHYtZm9yPVwibGluayBpbiBleHRMaW5rc1wiXG4gICAgICAgICAgICAgIDprZXk9XCJsaW5rLnRpdGxlXCJcbiAgICAgICAgICAgICAgdi1iaW5kPVwibGlua1wiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvcS1saXN0PlxuICAgICAgICA8L3EtbWVudT5cbiAgICAgIDwvcS1idG4+XG4gICAgICA8dGVtcGxhdGUgdi1lbHNlPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibmF2LWxpbmtzXCI+XG4gICAgICAgICAgPGFcbiAgICAgICAgICAgIHYtZm9yPVwibGluayBpbiBleHRMaW5rc1wiXG4gICAgICAgICAgICA6a2V5PVwibGluay50aXRsZVwiXG4gICAgICAgICAgICB2LWJpbmQ9XCJsaW5rXCJcbiAgICAgICAgICAgIDpocmVmPVwibGluay5saW5rXCJcbiAgICAgICAgICAgIGNsYXNzPVwicS1teC1zbVwiXG4gICAgICAgICAgICA6dGFyZ2V0PVwibGluay5ibGFuayA/ICdfYmxhbmsnIDogJ19zZWxmJ1wiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge3sgbGluay50aXRsZSB9fVxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgIDwvcS10b29sYmFyPlxuICA8L3EtaGVhZGVyPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcbmltcG9ydCB7IEVzc2VudGlhbExpbmsgfSBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9Fc3NlbnRpYWxMaW5rJ1xuXG5jb25zdCBlbWl0ID0gZGVmaW5lRW1pdHMoWyd0b2dnbGVMZWZ0RHJhd2VyJ10pXG5cbmNvbnN0IGV4dExpbmtzID0gW1xuICB7XG4gICAgdGl0bGU6ICdIb21lJyxcbiAgICBpY29uOiAnbWRpLWhvbWUtb3V0bGluZScsXG4gICAgbGluazogJ2h0dHBzOi8vZmxpcHBlcnplcm8ub25lLycsXG4gICAgYmxhbms6IHRydWUsXG4gICAgcm91dGVyOiBmYWxzZVxuICB9LFxuICB7XG4gICAgdGl0bGU6ICdTaG9wJyxcbiAgICBpY29uOiAnbWRpLWNhcnQtb3V0bGluZScsXG4gICAgbGluazogJ2h0dHBzOi8vc2hvcC5mbGlwcGVyemVyby5vbmUvJyxcbiAgICBibGFuazogdHJ1ZSxcbiAgICByb3V0ZXI6IGZhbHNlXG4gIH0sXG4gIHtcbiAgICB0aXRsZTogJ0RvY3MnLFxuICAgIGljb246ICdtZGktYm9vay1vcGVuLXZhcmlhbnQnLFxuICAgIGxpbms6ICdodHRwczovL2RvY3MuZmxpcHBlcnplcm8ub25lLycsXG4gICAgYmxhbms6IHRydWUsXG4gICAgcm91dGVyOiBmYWxzZVxuICB9LFxuICB7XG4gICAgdGl0bGU6ICdCbG9nJyxcbiAgICBpY29uOiAnbWRpLW5ld3NwYXBlci12YXJpYW50LW91dGxpbmUnLFxuICAgIGxpbms6ICdodHRwczovL2Jsb2cuZmxpcHBlcnplcm8ub25lLycsXG4gICAgYmxhbms6IHRydWUsXG4gICAgcm91dGVyOiBmYWxzZVxuICB9LFxuICB7XG4gICAgdGl0bGU6ICdGb3J1bScsXG4gICAgaWNvbjogJ21kaS1mb3J1bS1vdXRsaW5lJyxcbiAgICBsaW5rOiAnaHR0cHM6Ly9mb3J1bS5mbGlwcGVyemVyby5vbmUvJyxcbiAgICBibGFuazogdHJ1ZSxcbiAgICByb3V0ZXI6IGZhbHNlXG4gIH1cbl1cblxuY29uc3QgbGlua3NNZW51ID0gcmVmKGZhbHNlKVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiIHNjb3BlZD5cbi5uYXYtbGlua3Mge1xuICBhIHtcbiAgICBjb2xvcjogI2ZmZmZmZiAhaW1wb3J0YW50O1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZSAhaW1wb3J0YW50O1xuICAgIGZvbnQtc2l6ZTogMTVweDtcbiAgICBmb250LXdlaWdodDogNTAwO1xuXG4gICAgJjpob3ZlciB7XG4gICAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZSAhaW1wb3J0YW50O1xuICAgIH1cbiAgfVxuXG4gICZfX2JsYWNrIHtcbiAgICBhIHtcbiAgICAgIGNvbG9yOiAjMDAwMDAwICFpbXBvcnRhbnQ7XG4gICAgfVxuICB9XG59XG48L3N0eWxlPlxuIiwiZXhwb3J0IGRlZmF1bHQgXCJfX1ZJVEVfQVNTRVRfX2dralY2YjNPX19cIiIsImltcG9ydCB7IGNsaWVudCB9IGZyb20gJy4uLy4uL3BsdWdpbnMvcGxhdGZvcm0vUGxhdGZvcm0uanMnXG5cbmltcG9ydCB7IGNyZWF0ZURpcmVjdGl2ZSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGdldE1vZGlmaWVyRGlyZWN0aW9ucywgc2hvdWxkU3RhcnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnRvdWNoL3RvdWNoLmpzJ1xuaW1wb3J0IHsgYWRkRXZ0LCBjbGVhbkV2dCwgcG9zaXRpb24sIGxlZnRDbGljaywgc3RvcEFuZFByZXZlbnQsIHByZXZlbnREcmFnZ2FibGUsIG5vb3AgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC9ldmVudC5qcydcbmltcG9ydCB7IGNsZWFyU2VsZWN0aW9uIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5zZWxlY3Rpb24vc2VsZWN0aW9uLmpzJ1xuaW1wb3J0IGdldFNTUlByb3BzIGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUubm9vcC1zc3ItZGlyZWN0aXZlLXRyYW5zZm9ybS9ub29wLXNzci1kaXJlY3RpdmUtdHJhbnNmb3JtLmpzJ1xuXG5mdW5jdGlvbiBwYXJzZUFyZyAoYXJnKSB7XG4gIC8vIGRlbHRhIChtaW4gdmVsb2NpdHkgLS0gZGlzdCAvIHRpbWUpXG4gIC8vIG1vYmlsZSBtaW4gZGlzdGFuY2Ugb24gZmlyc3QgbW92ZVxuICAvLyBkZXNrdG9wIG1pbiBkaXN0YW5jZSB1bnRpbCBkZWNpZGluZyBpZiBpdCdzIGEgc3dpcGUgb3Igbm90XG4gIGNvbnN0IGRhdGEgPSBbIDAuMDYsIDYsIDUwIF1cblxuICBpZiAodHlwZW9mIGFyZyA9PT0gJ3N0cmluZycgJiYgYXJnLmxlbmd0aCkge1xuICAgIGFyZy5zcGxpdCgnOicpLmZvckVhY2goKHZhbCwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHYgPSBwYXJzZUZsb2F0KHZhbClcbiAgICAgIHYgJiYgKGRhdGFbIGluZGV4IF0gPSB2KVxuICAgIH0pXG4gIH1cblxuICByZXR1cm4gZGF0YVxufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVEaXJlY3RpdmUoX19RVUFTQVJfU1NSX1NFUlZFUl9fXG4gID8geyBuYW1lOiAndG91Y2gtc3dpcGUnLCBnZXRTU1JQcm9wcyB9XG4gIDoge1xuICAgICAgbmFtZTogJ3RvdWNoLXN3aXBlJyxcblxuICAgICAgYmVmb3JlTW91bnQgKGVsLCB7IHZhbHVlLCBhcmcsIG1vZGlmaWVycyB9KSB7XG4gICAgICAgIC8vIGVhcmx5IHJldHVybiwgd2UgZG9uJ3QgbmVlZCB0byBkbyBhbnl0aGluZ1xuICAgICAgICBpZiAoXG4gICAgICAgICAgbW9kaWZpZXJzLm1vdXNlICE9PSB0cnVlXG4gICAgICAgICAgJiYgY2xpZW50Lmhhcy50b3VjaCAhPT0gdHJ1ZVxuICAgICAgICApIHJldHVyblxuXG4gICAgICAgIGNvbnN0IG1vdXNlQ2FwdHVyZSA9IG1vZGlmaWVycy5tb3VzZUNhcHR1cmUgPT09IHRydWUgPyAnQ2FwdHVyZScgOiAnJ1xuXG4gICAgICAgIGNvbnN0IGN0eCA9IHtcbiAgICAgICAgICBoYW5kbGVyOiB2YWx1ZSxcbiAgICAgICAgICBzZW5zaXRpdml0eTogcGFyc2VBcmcoYXJnKSxcbiAgICAgICAgICBkaXJlY3Rpb246IGdldE1vZGlmaWVyRGlyZWN0aW9ucyhtb2RpZmllcnMpLFxuXG4gICAgICAgICAgbm9vcCxcblxuICAgICAgICAgIG1vdXNlU3RhcnQgKGV2dCkge1xuICAgICAgICAgICAgaWYgKHNob3VsZFN0YXJ0KGV2dCwgY3R4KSAmJiBsZWZ0Q2xpY2soZXZ0KSkge1xuICAgICAgICAgICAgICBhZGRFdnQoY3R4LCAndGVtcCcsIFtcbiAgICAgICAgICAgICAgICBbIGRvY3VtZW50LCAnbW91c2Vtb3ZlJywgJ21vdmUnLCBgbm90UGFzc2l2ZSR7IG1vdXNlQ2FwdHVyZSB9YCBdLFxuICAgICAgICAgICAgICAgIFsgZG9jdW1lbnQsICdtb3VzZXVwJywgJ2VuZCcsICdub3RQYXNzaXZlQ2FwdHVyZScgXVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICBjdHguc3RhcnQoZXZ0LCB0cnVlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB0b3VjaFN0YXJ0IChldnQpIHtcbiAgICAgICAgICAgIGlmIChzaG91bGRTdGFydChldnQsIGN0eCkpIHtcbiAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZ0LnRhcmdldFxuICAgICAgICAgICAgICBhZGRFdnQoY3R4LCAndGVtcCcsIFtcbiAgICAgICAgICAgICAgICBbIHRhcmdldCwgJ3RvdWNobW92ZScsICdtb3ZlJywgJ25vdFBhc3NpdmVDYXB0dXJlJyBdLFxuICAgICAgICAgICAgICAgIFsgdGFyZ2V0LCAndG91Y2hjYW5jZWwnLCAnZW5kJywgJ25vdFBhc3NpdmVDYXB0dXJlJyBdLFxuICAgICAgICAgICAgICAgIFsgdGFyZ2V0LCAndG91Y2hlbmQnLCAnZW5kJywgJ25vdFBhc3NpdmVDYXB0dXJlJyBdXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgIGN0eC5zdGFydChldnQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHN0YXJ0IChldnQsIG1vdXNlRXZlbnQpIHtcbiAgICAgICAgICAgIGNsaWVudC5pcy5maXJlZm94ID09PSB0cnVlICYmIHByZXZlbnREcmFnZ2FibGUoZWwsIHRydWUpXG5cbiAgICAgICAgICAgIGNvbnN0IHBvcyA9IHBvc2l0aW9uKGV2dClcblxuICAgICAgICAgICAgY3R4LmV2ZW50ID0ge1xuICAgICAgICAgICAgICB4OiBwb3MubGVmdCxcbiAgICAgICAgICAgICAgeTogcG9zLnRvcCxcbiAgICAgICAgICAgICAgdGltZTogRGF0ZS5ub3coKSxcbiAgICAgICAgICAgICAgbW91c2U6IG1vdXNlRXZlbnQgPT09IHRydWUsXG4gICAgICAgICAgICAgIGRpcjogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgbW92ZSAoZXZ0KSB7XG4gICAgICAgICAgICBpZiAoY3R4LmV2ZW50ID09PSB2b2lkIDApIHJldHVyblxuXG4gICAgICAgICAgICBpZiAoY3R4LmV2ZW50LmRpciAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgc3RvcEFuZFByZXZlbnQoZXZ0KVxuICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgdGltZSA9IERhdGUubm93KCkgLSBjdHguZXZlbnQudGltZVxuXG4gICAgICAgICAgICBpZiAodGltZSA9PT0gMCkgcmV0dXJuXG5cbiAgICAgICAgICAgIGNvbnN0XG4gICAgICAgICAgICAgIHBvcyA9IHBvc2l0aW9uKGV2dCksXG4gICAgICAgICAgICAgIGRpc3RYID0gcG9zLmxlZnQgLSBjdHguZXZlbnQueCxcbiAgICAgICAgICAgICAgYWJzWCA9IE1hdGguYWJzKGRpc3RYKSxcbiAgICAgICAgICAgICAgZGlzdFkgPSBwb3MudG9wIC0gY3R4LmV2ZW50LnksXG4gICAgICAgICAgICAgIGFic1kgPSBNYXRoLmFicyhkaXN0WSlcblxuICAgICAgICAgICAgaWYgKGN0eC5ldmVudC5tb3VzZSAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICBpZiAoYWJzWCA8IGN0eC5zZW5zaXRpdml0eVsgMSBdICYmIGFic1kgPCBjdHguc2Vuc2l0aXZpdHlbIDEgXSkge1xuICAgICAgICAgICAgICAgIGN0eC5lbmQoZXZ0KVxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBpcyB1c2VyIHRyeWluZyB0byBzZWxlY3QgdGV4dD9cbiAgICAgICAgICAgIC8vIGlmIHNvLCB0aGVuIHNvbWV0aGluZyBzaG91bGQgYmUgcmVwb3J0ZWQgaGVyZVxuICAgICAgICAgICAgLy8gKHByZXZpb3VzIHNlbGVjdGlvbiwgaWYgYW55LCB3YXMgZGlzY2FyZGVkIHdoZW4gc3dpcGUgc3RhcnRlZClcbiAgICAgICAgICAgIGVsc2UgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24oKS50b1N0cmluZygpICE9PSAnJykge1xuICAgICAgICAgICAgICBjdHguZW5kKGV2dClcbiAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChhYnNYIDwgY3R4LnNlbnNpdGl2aXR5WyAyIF0gJiYgYWJzWSA8IGN0eC5zZW5zaXRpdml0eVsgMiBdKSB7XG4gICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdFxuICAgICAgICAgICAgICB2ZWxYID0gYWJzWCAvIHRpbWUsXG4gICAgICAgICAgICAgIHZlbFkgPSBhYnNZIC8gdGltZVxuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGN0eC5kaXJlY3Rpb24udmVydGljYWwgPT09IHRydWVcbiAgICAgICAgICAgICAgJiYgYWJzWCA8IGFic1lcbiAgICAgICAgICAgICAgJiYgYWJzWCA8IDEwMFxuICAgICAgICAgICAgICAmJiB2ZWxZID4gY3R4LnNlbnNpdGl2aXR5WyAwIF1cbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBjdHguZXZlbnQuZGlyID0gZGlzdFkgPCAwID8gJ3VwJyA6ICdkb3duJ1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGN0eC5kaXJlY3Rpb24uaG9yaXpvbnRhbCA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAmJiBhYnNYID4gYWJzWVxuICAgICAgICAgICAgICAmJiBhYnNZIDwgMTAwXG4gICAgICAgICAgICAgICYmIHZlbFggPiBjdHguc2Vuc2l0aXZpdHlbIDAgXVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGN0eC5ldmVudC5kaXIgPSBkaXN0WCA8IDAgPyAnbGVmdCcgOiAncmlnaHQnXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgY3R4LmRpcmVjdGlvbi51cCA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAmJiBhYnNYIDwgYWJzWVxuICAgICAgICAgICAgICAmJiBkaXN0WSA8IDBcbiAgICAgICAgICAgICAgJiYgYWJzWCA8IDEwMFxuICAgICAgICAgICAgICAmJiB2ZWxZID4gY3R4LnNlbnNpdGl2aXR5WyAwIF1cbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBjdHguZXZlbnQuZGlyID0gJ3VwJ1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGN0eC5kaXJlY3Rpb24uZG93biA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAmJiBhYnNYIDwgYWJzWVxuICAgICAgICAgICAgICAmJiBkaXN0WSA+IDBcbiAgICAgICAgICAgICAgJiYgYWJzWCA8IDEwMFxuICAgICAgICAgICAgICAmJiB2ZWxZID4gY3R4LnNlbnNpdGl2aXR5WyAwIF1cbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBjdHguZXZlbnQuZGlyID0gJ2Rvd24nXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgY3R4LmRpcmVjdGlvbi5sZWZ0ID09PSB0cnVlXG4gICAgICAgICAgICAgICYmIGFic1ggPiBhYnNZXG4gICAgICAgICAgICAgICYmIGRpc3RYIDwgMFxuICAgICAgICAgICAgICAmJiBhYnNZIDwgMTAwXG4gICAgICAgICAgICAgICYmIHZlbFggPiBjdHguc2Vuc2l0aXZpdHlbIDAgXVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGN0eC5ldmVudC5kaXIgPSAnbGVmdCdcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBjdHguZGlyZWN0aW9uLnJpZ2h0ID09PSB0cnVlXG4gICAgICAgICAgICAgICYmIGFic1ggPiBhYnNZXG4gICAgICAgICAgICAgICYmIGRpc3RYID4gMFxuICAgICAgICAgICAgICAmJiBhYnNZIDwgMTAwXG4gICAgICAgICAgICAgICYmIHZlbFggPiBjdHguc2Vuc2l0aXZpdHlbIDAgXVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGN0eC5ldmVudC5kaXIgPSAncmlnaHQnXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjdHguZXZlbnQuZGlyICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICBzdG9wQW5kUHJldmVudChldnQpXG5cbiAgICAgICAgICAgICAgaWYgKGN0eC5ldmVudC5tb3VzZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnbm8tcG9pbnRlci1ldmVudHMtLWNoaWxkcmVuJylcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ25vbi1zZWxlY3RhYmxlJylcbiAgICAgICAgICAgICAgICBjbGVhclNlbGVjdGlvbigpXG5cbiAgICAgICAgICAgICAgICBjdHguc3R5bGVDbGVhbnVwID0gd2l0aERlbGF5ID0+IHtcbiAgICAgICAgICAgICAgICAgIGN0eC5zdHlsZUNsZWFudXAgPSB2b2lkIDBcblxuICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdub24tc2VsZWN0YWJsZScpXG5cbiAgICAgICAgICAgICAgICAgIGNvbnN0IHJlbW92ZSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCduby1wb2ludGVyLWV2ZW50cy0tY2hpbGRyZW4nKVxuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICBpZiAod2l0aERlbGF5ID09PSB0cnVlKSB7IHNldFRpbWVvdXQocmVtb3ZlLCA1MCkgfVxuICAgICAgICAgICAgICAgICAgZWxzZSB7IHJlbW92ZSgpIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBjdHguaGFuZGxlcih7XG4gICAgICAgICAgICAgICAgZXZ0LFxuICAgICAgICAgICAgICAgIHRvdWNoOiBjdHguZXZlbnQubW91c2UgIT09IHRydWUsXG4gICAgICAgICAgICAgICAgbW91c2U6IGN0eC5ldmVudC5tb3VzZSxcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb246IGN0eC5ldmVudC5kaXIsXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IHRpbWUsXG4gICAgICAgICAgICAgICAgZGlzdGFuY2U6IHtcbiAgICAgICAgICAgICAgICAgIHg6IGFic1gsXG4gICAgICAgICAgICAgICAgICB5OiBhYnNZXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIGN0eC5lbmQoZXZ0KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBlbmQgKGV2dCkge1xuICAgICAgICAgICAgaWYgKGN0eC5ldmVudCA9PT0gdm9pZCAwKSByZXR1cm5cblxuICAgICAgICAgICAgY2xlYW5FdnQoY3R4LCAndGVtcCcpXG4gICAgICAgICAgICBjbGllbnQuaXMuZmlyZWZveCA9PT0gdHJ1ZSAmJiBwcmV2ZW50RHJhZ2dhYmxlKGVsLCBmYWxzZSlcbiAgICAgICAgICAgIGN0eC5zdHlsZUNsZWFudXA/Lih0cnVlKVxuICAgICAgICAgICAgaWYgKChldnQgIT09IHZvaWQgMCkgJiYgKGN0eC5ldmVudC5kaXIgIT09IGZhbHNlKSkgc3RvcEFuZFByZXZlbnQoZXZ0KVxuXG4gICAgICAgICAgICBjdHguZXZlbnQgPSB2b2lkIDBcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBlbC5fX3F0b3VjaHN3aXBlID0gY3R4XG5cbiAgICAgICAgaWYgKG1vZGlmaWVycy5tb3VzZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIC8vIGFjY291bnQgZm9yIFVNRCB0b28gd2hlcmUgbW9kaWZpZXJzIHdpbGwgYmUgbG93ZXJjYXNlZCB0byB3b3JrXG4gICAgICAgICAgY29uc3QgY2FwdHVyZSA9IG1vZGlmaWVycy5tb3VzZUNhcHR1cmUgPT09IHRydWUgfHwgbW9kaWZpZXJzLm1vdXNlY2FwdHVyZSA9PT0gdHJ1ZVxuICAgICAgICAgICAgPyAnQ2FwdHVyZSdcbiAgICAgICAgICAgIDogJydcblxuICAgICAgICAgIGFkZEV2dChjdHgsICdtYWluJywgW1xuICAgICAgICAgICAgWyBlbCwgJ21vdXNlZG93bicsICdtb3VzZVN0YXJ0JywgYHBhc3NpdmUkeyBjYXB0dXJlIH1gIF1cbiAgICAgICAgICBdKVxuICAgICAgICB9XG5cbiAgICAgICAgY2xpZW50Lmhhcy50b3VjaCA9PT0gdHJ1ZSAmJiBhZGRFdnQoY3R4LCAnbWFpbicsIFtcbiAgICAgICAgICBbIGVsLCAndG91Y2hzdGFydCcsICd0b3VjaFN0YXJ0JywgYHBhc3NpdmUkeyBtb2RpZmllcnMuY2FwdHVyZSA9PT0gdHJ1ZSA/ICdDYXB0dXJlJyA6ICcnIH1gIF0sXG4gICAgICAgICAgWyBlbCwgJ3RvdWNobW92ZScsICdub29wJywgJ25vdFBhc3NpdmVDYXB0dXJlJyBdIC8vIGNhbm5vdCBiZSBwYXNzaXZlIChleDogaU9TIHNjcm9sbClcbiAgICAgICAgXSlcbiAgICAgIH0sXG5cbiAgICAgIHVwZGF0ZWQgKGVsLCBiaW5kaW5ncykge1xuICAgICAgICBjb25zdCBjdHggPSBlbC5fX3F0b3VjaHN3aXBlXG5cbiAgICAgICAgaWYgKGN0eCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgaWYgKGJpbmRpbmdzLm9sZFZhbHVlICE9PSBiaW5kaW5ncy52YWx1ZSkge1xuICAgICAgICAgICAgdHlwZW9mIGJpbmRpbmdzLnZhbHVlICE9PSAnZnVuY3Rpb24nICYmIGN0eC5lbmQoKVxuICAgICAgICAgICAgY3R4LmhhbmRsZXIgPSBiaW5kaW5ncy52YWx1ZVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGN0eC5kaXJlY3Rpb24gPSBnZXRNb2RpZmllckRpcmVjdGlvbnMoYmluZGluZ3MubW9kaWZpZXJzKVxuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBiZWZvcmVVbm1vdW50IChlbCkge1xuICAgICAgICBjb25zdCBjdHggPSBlbC5fX3F0b3VjaHN3aXBlXG5cbiAgICAgICAgaWYgKGN0eCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgY2xlYW5FdnQoY3R4LCAnbWFpbicpXG4gICAgICAgICAgY2xlYW5FdnQoY3R4LCAndGVtcCcpXG5cbiAgICAgICAgICBjbGllbnQuaXMuZmlyZWZveCA9PT0gdHJ1ZSAmJiBwcmV2ZW50RHJhZ2dhYmxlKGVsLCBmYWxzZSlcbiAgICAgICAgICBjdHguc3R5bGVDbGVhbnVwPy4oKVxuXG4gICAgICAgICAgZGVsZXRlIGVsLl9fcXRvdWNoc3dpcGVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbilcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgbGV0IGNhY2hlID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuXG4gIHJldHVybiB7XG4gICAgZ2V0Q2FjaGU6IF9fUVVBU0FSX1NTUl9TRVJWRVJfX1xuICAgICAgPyAoXywgZGVmYXVsdFZhbHVlKSA9PiAoXG4gICAgICAgICAgdHlwZW9mIGRlZmF1bHRWYWx1ZSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgPyBkZWZhdWx0VmFsdWUoKVxuICAgICAgICAgICAgOiBkZWZhdWx0VmFsdWVcbiAgICAgICAgKVxuICAgICAgOiAoa2V5LCBkZWZhdWx0VmFsdWUpID0+IChcbiAgICAgICAgICBjYWNoZVsga2V5IF0gPT09IHZvaWQgMFxuICAgICAgICAgICAgPyAoXG4gICAgICAgICAgICAgICAgY2FjaGVbIGtleSBdID0gKFxuICAgICAgICAgICAgICAgICAgdHlwZW9mIGRlZmF1bHRWYWx1ZSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgICAgICAgICA/IGRlZmF1bHRWYWx1ZSgpXG4gICAgICAgICAgICAgICAgICAgIDogZGVmYXVsdFZhbHVlXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICA6IGNhY2hlWyBrZXkgXVxuICAgICAgICApLFxuXG4gICAgc2V0Q2FjaGUgKGtleSwgb2JqKSB7XG4gICAgICBjYWNoZVsga2V5IF0gPSBvYmpcbiAgICB9LFxuXG4gICAgaGFzQ2FjaGUgKGtleSkge1xuICAgICAgcmV0dXJuIE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKGNhY2hlLCBrZXkpXG4gICAgfSxcblxuICAgIGNsZWFyQ2FjaGUgKGtleSkge1xuICAgICAgaWYgKGtleSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGRlbGV0ZSBjYWNoZVsga2V5IF1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjYWNoZSA9IE9iamVjdC5jcmVhdGUobnVsbClcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIHdhdGNoLCBnZXRDdXJyZW50SW5zdGFuY2UsIFRyYW5zaXRpb24sIEtlZXBBbGl2ZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFRvdWNoU3dpcGUgZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy90b3VjaC1zd2lwZS9Ub3VjaFN3aXBlLmpzJ1xuXG5pbXBvcnQgdXNlUmVuZGVyQ2FjaGUgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvdXNlLXJlbmRlci1jYWNoZS91c2UtcmVuZGVyLWNhY2hlLmpzJ1xuaW1wb3J0IHVzZVRpbWVvdXQgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvdXNlLXRpbWVvdXQvdXNlLXRpbWVvdXQuanMnXG5cbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuaW1wb3J0IHsgZ2V0Tm9ybWFsaXplZFZOb2RlcyB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUudm0vdm0uanMnXG5cbmV4cG9ydCBjb25zdCB1c2VQYW5lbENoaWxkUHJvcHMgPSB7XG4gIG5hbWU6IHsgcmVxdWlyZWQ6IHRydWUgfSxcbiAgZGlzYWJsZTogQm9vbGVhblxufVxuXG5jb25zdCBQYW5lbFdyYXBwZXIgPSB7XG4gIHNldHVwIChfLCB7IHNsb3RzIH0pIHtcbiAgICByZXR1cm4gKCkgPT4gaCgnZGl2Jywge1xuICAgICAgY2xhc3M6ICdxLXBhbmVsIHNjcm9sbCcsXG4gICAgICByb2xlOiAndGFicGFuZWwnXG4gICAgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHVzZVBhbmVsUHJvcHMgPSB7XG4gIG1vZGVsVmFsdWU6IHtcbiAgICByZXF1aXJlZDogdHJ1ZVxuICB9LFxuXG4gIGFuaW1hdGVkOiBCb29sZWFuLFxuICBpbmZpbml0ZTogQm9vbGVhbixcbiAgc3dpcGVhYmxlOiBCb29sZWFuLFxuICB2ZXJ0aWNhbDogQm9vbGVhbixcblxuICB0cmFuc2l0aW9uUHJldjogU3RyaW5nLFxuICB0cmFuc2l0aW9uTmV4dDogU3RyaW5nLFxuICB0cmFuc2l0aW9uRHVyYXRpb246IHtcbiAgICB0eXBlOiBbIFN0cmluZywgTnVtYmVyIF0sXG4gICAgZGVmYXVsdDogMzAwXG4gIH0sXG5cbiAga2VlcEFsaXZlOiBCb29sZWFuLFxuICBrZWVwQWxpdmVJbmNsdWRlOiBbIFN0cmluZywgQXJyYXksIFJlZ0V4cCBdLFxuICBrZWVwQWxpdmVFeGNsdWRlOiBbIFN0cmluZywgQXJyYXksIFJlZ0V4cCBdLFxuICBrZWVwQWxpdmVNYXg6IE51bWJlclxufVxuXG5leHBvcnQgY29uc3QgdXNlUGFuZWxFbWl0cyA9IFsgJ3VwZGF0ZTptb2RlbFZhbHVlJywgJ2JlZm9yZVRyYW5zaXRpb24nLCAndHJhbnNpdGlvbicgXVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHsgcHJvcHMsIGVtaXQsIHByb3h5IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICBjb25zdCB7IGdldENhY2hlIH0gPSB1c2VSZW5kZXJDYWNoZSgpXG4gIGNvbnN0IHsgcmVnaXN0ZXJUaW1lb3V0IH0gPSB1c2VUaW1lb3V0KClcblxuICBsZXQgcGFuZWxzLCBmb3JjZWRQYW5lbFRyYW5zaXRpb25cblxuICBjb25zdCBwYW5lbFRyYW5zaXRpb24gPSByZWYobnVsbClcblxuICAvKlxuICAgKiBTaG91bGQgbm90IGJlIHJlYWN0aXZlIGJlY2F1c2UgaXQncyBhc3NpZ25lZCBvbiByZW5kZXJcbiAgICogYW5kIGl0IHdpbGwgdHJpZ2dlciBhIHN1YnNlcXVlbnQgdXNlbGVzcyByZW5kZXIuXG4gICAqXG4gICAqIFNob3VsZCBiZSBhbiBvYmplY3QgdGhvdWdoLCBiZWNhdXNlIGl0IGlzIGJlaW5nIGV4cG9ydGVkLlxuICAgKiBPdGhlcndpc2UsIHRoZSBjdXJyZW50IHZhbHVlIHdvdWxkIGJlIGV4cG9ydGVkIGFuZCBubyBzdWJzZXF1ZW50XG4gICAqIHVwZGF0ZXMgd2lsbCBiZSByZWZsZWN0ZWQgaW4gdGhlIGV4cG9ydGVkIHZhbHVlLlxuICAgKi9cbiAgY29uc3QgcGFuZWxJbmRleCA9IHsgdmFsdWU6IG51bGwgfVxuXG4gIGZ1bmN0aW9uIG9uU3dpcGUgKGV2dCkge1xuICAgIGNvbnN0IGRpciA9IHByb3BzLnZlcnRpY2FsID09PSB0cnVlID8gJ3VwJyA6ICdsZWZ0J1xuICAgIGdvVG9QYW5lbEJ5T2Zmc2V0KChwcm94eS4kcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/IC0xIDogMSkgKiAoZXZ0LmRpcmVjdGlvbiA9PT0gZGlyID8gMSA6IC0xKSlcbiAgfVxuXG4gIGNvbnN0IHBhbmVsRGlyZWN0aXZlcyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAvLyBpZiBwcm9wcy5zd2lwZWFibGVcbiAgICByZXR1cm4gWyBbXG4gICAgICBUb3VjaFN3aXBlLFxuICAgICAgb25Td2lwZSxcbiAgICAgIHZvaWQgMCxcbiAgICAgIHtcbiAgICAgICAgaG9yaXpvbnRhbDogcHJvcHMudmVydGljYWwgIT09IHRydWUsXG4gICAgICAgIHZlcnRpY2FsOiBwcm9wcy52ZXJ0aWNhbCxcbiAgICAgICAgbW91c2U6IHRydWVcbiAgICAgIH1cbiAgICBdIF1cbiAgfSlcblxuICBjb25zdCB0cmFuc2l0aW9uUHJldiA9IGNvbXB1dGVkKCgpID0+XG4gICAgcHJvcHMudHJhbnNpdGlvblByZXYgfHwgYHNsaWRlLSR7IHByb3BzLnZlcnRpY2FsID09PSB0cnVlID8gJ2Rvd24nIDogJ3JpZ2h0JyB9YFxuICApXG5cbiAgY29uc3QgdHJhbnNpdGlvbk5leHQgPSBjb21wdXRlZCgoKSA9PlxuICAgIHByb3BzLnRyYW5zaXRpb25OZXh0IHx8IGBzbGlkZS0keyBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZSA/ICd1cCcgOiAnbGVmdCcgfWBcbiAgKVxuXG4gIGNvbnN0IHRyYW5zaXRpb25TdHlsZSA9IGNvbXB1dGVkKFxuICAgICgpID0+IGAtLXEtdHJhbnNpdGlvbi1kdXJhdGlvbjogJHsgcHJvcHMudHJhbnNpdGlvbkR1cmF0aW9uIH1tc2BcbiAgKVxuXG4gIGNvbnN0IGNvbnRlbnRLZXkgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgdHlwZW9mIHByb3BzLm1vZGVsVmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBwcm9wcy5tb2RlbFZhbHVlID09PSAnbnVtYmVyJ1xuICAgICAgPyBwcm9wcy5tb2RlbFZhbHVlXG4gICAgICA6IFN0cmluZyhwcm9wcy5tb2RlbFZhbHVlKVxuICApKVxuXG4gIGNvbnN0IGtlZXBBbGl2ZVByb3BzID0gY29tcHV0ZWQoKCkgPT4gKHtcbiAgICBpbmNsdWRlOiBwcm9wcy5rZWVwQWxpdmVJbmNsdWRlLFxuICAgIGV4Y2x1ZGU6IHByb3BzLmtlZXBBbGl2ZUV4Y2x1ZGUsXG4gICAgbWF4OiBwcm9wcy5rZWVwQWxpdmVNYXhcbiAgfSkpXG5cbiAgY29uc3QgbmVlZHNVbmlxdWVLZWVwQWxpdmVXcmFwcGVyID0gY29tcHV0ZWQoKCkgPT5cbiAgICBwcm9wcy5rZWVwQWxpdmVJbmNsdWRlICE9PSB2b2lkIDBcbiAgICB8fCBwcm9wcy5rZWVwQWxpdmVFeGNsdWRlICE9PSB2b2lkIDBcbiAgKVxuXG4gIHdhdGNoKCgpID0+IHByb3BzLm1vZGVsVmFsdWUsIChuZXdWYWwsIG9sZFZhbCkgPT4ge1xuICAgIGNvbnN0IGluZGV4ID0gaXNWYWxpZFBhbmVsTmFtZShuZXdWYWwpID09PSB0cnVlXG4gICAgICA/IGdldFBhbmVsSW5kZXgobmV3VmFsKVxuICAgICAgOiAtMVxuXG4gICAgaWYgKGZvcmNlZFBhbmVsVHJhbnNpdGlvbiAhPT0gdHJ1ZSkge1xuICAgICAgdXBkYXRlUGFuZWxUcmFuc2l0aW9uKFxuICAgICAgICBpbmRleCA9PT0gLTEgPyAwIDogKGluZGV4IDwgZ2V0UGFuZWxJbmRleChvbGRWYWwpID8gLTEgOiAxKVxuICAgICAgKVxuICAgIH1cblxuICAgIGlmIChwYW5lbEluZGV4LnZhbHVlICE9PSBpbmRleCkge1xuICAgICAgcGFuZWxJbmRleC52YWx1ZSA9IGluZGV4XG4gICAgICBlbWl0KCdiZWZvcmVUcmFuc2l0aW9uJywgbmV3VmFsLCBvbGRWYWwpXG4gICAgICByZWdpc3RlclRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBlbWl0KCd0cmFuc2l0aW9uJywgbmV3VmFsLCBvbGRWYWwpXG4gICAgICB9LCBwcm9wcy50cmFuc2l0aW9uRHVyYXRpb24pXG4gICAgfVxuICB9KVxuXG4gIGZ1bmN0aW9uIG5leHRQYW5lbCAoKSB7IGdvVG9QYW5lbEJ5T2Zmc2V0KDEpIH1cbiAgZnVuY3Rpb24gcHJldmlvdXNQYW5lbCAoKSB7IGdvVG9QYW5lbEJ5T2Zmc2V0KC0xKSB9XG5cbiAgZnVuY3Rpb24gZ29Ub1BhbmVsIChuYW1lKSB7XG4gICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBuYW1lKVxuICB9XG5cbiAgZnVuY3Rpb24gaXNWYWxpZFBhbmVsTmFtZSAobmFtZSkge1xuICAgIHJldHVybiBuYW1lICE9PSB2b2lkIDAgJiYgbmFtZSAhPT0gbnVsbCAmJiBuYW1lICE9PSAnJ1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0UGFuZWxJbmRleCAobmFtZSkge1xuICAgIHJldHVybiBwYW5lbHMuZmluZEluZGV4KHBhbmVsID0+IHtcbiAgICAgIHJldHVybiBwYW5lbC5wcm9wcy5uYW1lID09PSBuYW1lXG4gICAgICAgICYmIHBhbmVsLnByb3BzLmRpc2FibGUgIT09ICcnXG4gICAgICAgICYmIHBhbmVsLnByb3BzLmRpc2FibGUgIT09IHRydWVcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RW5hYmxlZFBhbmVscyAoKSB7XG4gICAgcmV0dXJuIHBhbmVscy5maWx0ZXIocGFuZWwgPT4ge1xuICAgICAgcmV0dXJuIHBhbmVsLnByb3BzLmRpc2FibGUgIT09ICcnXG4gICAgICAgICYmIHBhbmVsLnByb3BzLmRpc2FibGUgIT09IHRydWVcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlUGFuZWxUcmFuc2l0aW9uIChkaXJlY3Rpb24pIHtcbiAgICBjb25zdCB2YWwgPSBkaXJlY3Rpb24gIT09IDAgJiYgcHJvcHMuYW5pbWF0ZWQgPT09IHRydWUgJiYgcGFuZWxJbmRleC52YWx1ZSAhPT0gLTFcbiAgICAgID8gJ3EtdHJhbnNpdGlvbi0tJyArIChkaXJlY3Rpb24gPT09IC0xID8gdHJhbnNpdGlvblByZXYudmFsdWUgOiB0cmFuc2l0aW9uTmV4dC52YWx1ZSlcbiAgICAgIDogbnVsbFxuXG4gICAgaWYgKHBhbmVsVHJhbnNpdGlvbi52YWx1ZSAhPT0gdmFsKSB7XG4gICAgICBwYW5lbFRyYW5zaXRpb24udmFsdWUgPSB2YWxcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnb1RvUGFuZWxCeU9mZnNldCAoZGlyZWN0aW9uLCBzdGFydEluZGV4ID0gcGFuZWxJbmRleC52YWx1ZSkge1xuICAgIGxldCBpbmRleCA9IHN0YXJ0SW5kZXggKyBkaXJlY3Rpb25cblxuICAgIHdoaWxlIChpbmRleCAhPT0gLTEgJiYgaW5kZXggPCBwYW5lbHMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBvcHQgPSBwYW5lbHNbIGluZGV4IF1cblxuICAgICAgaWYgKFxuICAgICAgICBvcHQgIT09IHZvaWQgMFxuICAgICAgICAmJiBvcHQucHJvcHMuZGlzYWJsZSAhPT0gJydcbiAgICAgICAgJiYgb3B0LnByb3BzLmRpc2FibGUgIT09IHRydWVcbiAgICAgICkge1xuICAgICAgICB1cGRhdGVQYW5lbFRyYW5zaXRpb24oZGlyZWN0aW9uKVxuICAgICAgICBmb3JjZWRQYW5lbFRyYW5zaXRpb24gPSB0cnVlXG4gICAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgb3B0LnByb3BzLm5hbWUpXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGZvcmNlZFBhbmVsVHJhbnNpdGlvbiA9IGZhbHNlXG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGluZGV4ICs9IGRpcmVjdGlvblxuICAgIH1cblxuICAgIGlmIChwcm9wcy5pbmZpbml0ZSA9PT0gdHJ1ZSAmJiBwYW5lbHMubGVuZ3RoICE9PSAwICYmIHN0YXJ0SW5kZXggIT09IC0xICYmIHN0YXJ0SW5kZXggIT09IHBhbmVscy5sZW5ndGgpIHtcbiAgICAgIGdvVG9QYW5lbEJ5T2Zmc2V0KGRpcmVjdGlvbiwgZGlyZWN0aW9uID09PSAtMSA/IHBhbmVscy5sZW5ndGggOiAtMSlcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVQYW5lbEluZGV4ICgpIHtcbiAgICBjb25zdCBpbmRleCA9IGdldFBhbmVsSW5kZXgocHJvcHMubW9kZWxWYWx1ZSlcblxuICAgIGlmIChwYW5lbEluZGV4LnZhbHVlICE9PSBpbmRleCkge1xuICAgICAgcGFuZWxJbmRleC52YWx1ZSA9IGluZGV4XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFBhbmVsQ29udGVudENoaWxkICgpIHtcbiAgICBjb25zdCBwYW5lbCA9IGlzVmFsaWRQYW5lbE5hbWUocHJvcHMubW9kZWxWYWx1ZSkgPT09IHRydWVcbiAgICAgICYmIHVwZGF0ZVBhbmVsSW5kZXgoKVxuICAgICAgJiYgcGFuZWxzWyBwYW5lbEluZGV4LnZhbHVlIF1cblxuICAgIHJldHVybiBwcm9wcy5rZWVwQWxpdmUgPT09IHRydWVcbiAgICAgID8gW1xuICAgICAgICAgIGgoS2VlcEFsaXZlLCBrZWVwQWxpdmVQcm9wcy52YWx1ZSwgW1xuICAgICAgICAgICAgaChcbiAgICAgICAgICAgICAgbmVlZHNVbmlxdWVLZWVwQWxpdmVXcmFwcGVyLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgICAgICAgPyBnZXRDYWNoZShjb250ZW50S2V5LnZhbHVlLCAoKSA9PiAoeyAuLi5QYW5lbFdyYXBwZXIsIG5hbWU6IGNvbnRlbnRLZXkudmFsdWUgfSkpXG4gICAgICAgICAgICAgICAgOiBQYW5lbFdyYXBwZXIsXG4gICAgICAgICAgICAgIHsga2V5OiBjb250ZW50S2V5LnZhbHVlLCBzdHlsZTogdHJhbnNpdGlvblN0eWxlLnZhbHVlIH0sXG4gICAgICAgICAgICAgICgpID0+IHBhbmVsXG4gICAgICAgICAgICApXG4gICAgICAgICAgXSlcbiAgICAgICAgXVxuICAgICAgOiBbXG4gICAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgICAgY2xhc3M6ICdxLXBhbmVsIHNjcm9sbCcsXG4gICAgICAgICAgICBzdHlsZTogdHJhbnNpdGlvblN0eWxlLnZhbHVlLFxuICAgICAgICAgICAga2V5OiBjb250ZW50S2V5LnZhbHVlLFxuICAgICAgICAgICAgcm9sZTogJ3RhYnBhbmVsJ1xuICAgICAgICAgIH0sIFsgcGFuZWwgXSlcbiAgICAgICAgXVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0UGFuZWxDb250ZW50ICgpIHtcbiAgICBpZiAocGFuZWxzLmxlbmd0aCA9PT0gMCkgcmV0dXJuXG5cbiAgICByZXR1cm4gcHJvcHMuYW5pbWF0ZWQgPT09IHRydWVcbiAgICAgID8gWyBoKFRyYW5zaXRpb24sIHsgbmFtZTogcGFuZWxUcmFuc2l0aW9uLnZhbHVlIH0sIGdldFBhbmVsQ29udGVudENoaWxkKSBdXG4gICAgICA6IGdldFBhbmVsQ29udGVudENoaWxkKClcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVBhbmVsc0xpc3QgKHNsb3RzKSB7XG4gICAgcGFuZWxzID0gZ2V0Tm9ybWFsaXplZFZOb2RlcyhcbiAgICAgIGhTbG90KHNsb3RzLmRlZmF1bHQsIFtdKVxuICAgICkuZmlsdGVyKFxuICAgICAgcGFuZWwgPT4gcGFuZWwucHJvcHMgIT09IG51bGxcbiAgICAgICAgJiYgcGFuZWwucHJvcHMuc2xvdCA9PT0gdm9pZCAwXG4gICAgICAgICYmIGlzVmFsaWRQYW5lbE5hbWUocGFuZWwucHJvcHMubmFtZSkgPT09IHRydWVcbiAgICApXG5cbiAgICByZXR1cm4gcGFuZWxzLmxlbmd0aFxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0UGFuZWxzICgpIHtcbiAgICByZXR1cm4gcGFuZWxzXG4gIH1cblxuICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgT2JqZWN0LmFzc2lnbihwcm94eSwge1xuICAgIG5leHQ6IG5leHRQYW5lbCxcbiAgICBwcmV2aW91czogcHJldmlvdXNQYW5lbCxcbiAgICBnb1RvOiBnb1RvUGFuZWxcbiAgfSlcblxuICByZXR1cm4ge1xuICAgIHBhbmVsSW5kZXgsXG4gICAgcGFuZWxEaXJlY3RpdmVzLFxuXG4gICAgdXBkYXRlUGFuZWxzTGlzdCxcbiAgICB1cGRhdGVQYW5lbEluZGV4LFxuXG4gICAgZ2V0UGFuZWxDb250ZW50LFxuICAgIGdldEVuYWJsZWRQYW5lbHMsXG4gICAgZ2V0UGFuZWxzLFxuXG4gICAgaXNWYWxpZFBhbmVsTmFtZSxcblxuICAgIGtlZXBBbGl2ZVByb3BzLFxuICAgIG5lZWRzVW5pcXVlS2VlcEFsaXZlV3JhcHBlcixcblxuICAgIGdvVG9QYW5lbEJ5T2Zmc2V0LFxuICAgIGdvVG9QYW5lbCxcblxuICAgIG5leHRQYW5lbCxcbiAgICBwcmV2aW91c1BhbmVsXG4gIH1cbn1cbiIsImltcG9ydCB7IGggfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IHVzZVBhbmVsQ2hpbGRQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLXBhbmVsL3VzZS1wYW5lbC5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRVGFiUGFuZWwnLFxuXG4gIHByb3BzOiB1c2VQYW5lbENoaWxkUHJvcHMsXG5cbiAgc2V0dXAgKF8sIHsgc2xvdHMgfSkge1xuICAgIHJldHVybiAoKSA9PiBoKCdkaXYnLCB7IGNsYXNzOiAncS10YWItcGFuZWwnLCByb2xlOiAndGFicGFuZWwnIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG59KVxuIiwiaW1wb3J0IHsgY29tcHV0ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtZGFyay91c2UtZGFyay5qcydcbmltcG9ydCB1c2VQYW5lbCwgeyB1c2VQYW5lbFByb3BzLCB1c2VQYW5lbEVtaXRzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtcGFuZWwvdXNlLXBhbmVsLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoRGlyIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVRhYlBhbmVscycsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VQYW5lbFByb3BzLFxuICAgIC4uLnVzZURhcmtQcm9wc1xuICB9LFxuXG4gIGVtaXRzOiB1c2VQYW5lbEVtaXRzLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgY29uc3Qgdm0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICAgIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsIHZtLnByb3h5LiRxKVxuXG4gICAgY29uc3QgeyB1cGRhdGVQYW5lbHNMaXN0LCBnZXRQYW5lbENvbnRlbnQsIHBhbmVsRGlyZWN0aXZlcyB9ID0gdXNlUGFuZWwoKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS10YWItcGFuZWxzIHEtcGFuZWwtcGFyZW50J1xuICAgICAgKyAoaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJyBxLXRhYi1wYW5lbHMtLWRhcmsgcS1kYXJrJyA6ICcnKVxuICAgIClcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB1cGRhdGVQYW5lbHNMaXN0KHNsb3RzKVxuXG4gICAgICByZXR1cm4gaERpcihcbiAgICAgICAgJ2RpdicsXG4gICAgICAgIHsgY2xhc3M6IGNsYXNzZXMudmFsdWUgfSxcbiAgICAgICAgZ2V0UGFuZWxDb250ZW50KCksXG4gICAgICAgICdwYW4nLFxuICAgICAgICBwcm9wcy5zd2lwZWFibGUsXG4gICAgICAgICgpID0+IHBhbmVsRGlyZWN0aXZlcy52YWx1ZVxuICAgICAgKVxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIHdpdGhEaXJlY3RpdmVzLCByZWYsIGNvbXB1dGVkLCB3YXRjaCwgb25Nb3VudGVkLCBvbkJlZm9yZVVubW91bnQsIG5leHRUaWNrLCBpbmplY3QsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZUhpc3RvcnkgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtaGlzdG9yeS91c2UtaGlzdG9yeS5qcydcbmltcG9ydCB1c2VNb2RlbFRvZ2dsZSwgeyB1c2VNb2RlbFRvZ2dsZVByb3BzLCB1c2VNb2RlbFRvZ2dsZUVtaXRzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtbW9kZWwtdG9nZ2xlL3VzZS1tb2RlbC10b2dnbGUuanMnXG5pbXBvcnQgdXNlUHJldmVudFNjcm9sbCBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1wcmV2ZW50LXNjcm9sbC91c2UtcHJldmVudC1zY3JvbGwuanMnXG5pbXBvcnQgdXNlVGltZW91dCBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy91c2UtdGltZW91dC91c2UtdGltZW91dC5qcydcbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLWRhcmsvdXNlLWRhcmsuanMnXG5cbmltcG9ydCBUb3VjaFBhbiBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3RvdWNoLXBhbi9Ub3VjaFBhbi5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgYmV0d2VlbiB9IGZyb20gJy4uLy4uL3V0aWxzL2Zvcm1hdC9mb3JtYXQuanMnXG5pbXBvcnQgeyBoU2xvdCwgaERpciB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcbmltcG9ydCB7IGxheW91dEtleSwgZW1wdHlSZW5kZXJGbiB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuc3ltYm9scy9zeW1ib2xzLmpzJ1xuXG5jb25zdCBkdXJhdGlvbiA9IDE1MFxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUURyYXdlcicsXG5cbiAgaW5oZXJpdEF0dHJzOiBmYWxzZSxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZU1vZGVsVG9nZ2xlUHJvcHMsXG4gICAgLi4udXNlRGFya1Byb3BzLFxuXG4gICAgc2lkZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2xlZnQnLFxuICAgICAgdmFsaWRhdG9yOiB2ID0+IFsgJ2xlZnQnLCAncmlnaHQnIF0uaW5jbHVkZXModilcbiAgICB9LFxuXG4gICAgd2lkdGg6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIGRlZmF1bHQ6IDMwMFxuICAgIH0sXG5cbiAgICBtaW5pOiBCb29sZWFuLFxuICAgIG1pbmlUb092ZXJsYXk6IEJvb2xlYW4sXG4gICAgbWluaVdpZHRoOiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICBkZWZhdWx0OiA1N1xuICAgIH0sXG4gICAgbm9NaW5pQW5pbWF0aW9uOiBCb29sZWFuLFxuXG4gICAgYnJlYWtwb2ludDoge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgZGVmYXVsdDogMTAyM1xuICAgIH0sXG4gICAgc2hvd0lmQWJvdmU6IEJvb2xlYW4sXG5cbiAgICBiZWhhdmlvcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsaWRhdG9yOiB2ID0+IFsgJ2RlZmF1bHQnLCAnZGVza3RvcCcsICdtb2JpbGUnIF0uaW5jbHVkZXModiksXG4gICAgICBkZWZhdWx0OiAnZGVmYXVsdCdcbiAgICB9LFxuXG4gICAgYm9yZGVyZWQ6IEJvb2xlYW4sXG4gICAgZWxldmF0ZWQ6IEJvb2xlYW4sXG5cbiAgICBvdmVybGF5OiBCb29sZWFuLFxuICAgIHBlcnNpc3RlbnQ6IEJvb2xlYW4sXG4gICAgbm9Td2lwZU9wZW46IEJvb2xlYW4sXG4gICAgbm9Td2lwZUNsb3NlOiBCb29sZWFuLFxuICAgIG5vU3dpcGVCYWNrZHJvcDogQm9vbGVhblxuICB9LFxuXG4gIGVtaXRzOiBbXG4gICAgLi4udXNlTW9kZWxUb2dnbGVFbWl0cyxcbiAgICAnb25MYXlvdXQnLCAnbWluaVN0YXRlJ1xuICBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCwgYXR0cnMgfSkge1xuICAgIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCB7IHByb3h5OiB7ICRxIH0gfSA9IHZtXG5cbiAgICBjb25zdCBpc0RhcmsgPSB1c2VEYXJrKHByb3BzLCAkcSlcbiAgICBjb25zdCB7IHByZXZlbnRCb2R5U2Nyb2xsIH0gPSB1c2VQcmV2ZW50U2Nyb2xsKClcbiAgICBjb25zdCB7IHJlZ2lzdGVyVGltZW91dCwgcmVtb3ZlVGltZW91dCB9ID0gdXNlVGltZW91dCgpXG5cbiAgICBjb25zdCAkbGF5b3V0ID0gaW5qZWN0KGxheW91dEtleSwgZW1wdHlSZW5kZXJGbilcbiAgICBpZiAoJGxheW91dCA9PT0gZW1wdHlSZW5kZXJGbikge1xuICAgICAgY29uc29sZS5lcnJvcignUURyYXdlciBuZWVkcyB0byBiZSBjaGlsZCBvZiBRTGF5b3V0JylcbiAgICAgIHJldHVybiBlbXB0eVJlbmRlckZuXG4gICAgfVxuXG4gICAgbGV0IGxhc3REZXNrdG9wU3RhdGUsIHRpbWVyTWluaSA9IG51bGwsIGxheW91dFRvdGFsV2lkdGhXYXRjaGVyXG5cbiAgICBjb25zdCBiZWxvd0JyZWFrcG9pbnQgPSByZWYoXG4gICAgICBwcm9wcy5iZWhhdmlvciA9PT0gJ21vYmlsZSdcbiAgICAgIHx8IChwcm9wcy5iZWhhdmlvciAhPT0gJ2Rlc2t0b3AnICYmICRsYXlvdXQudG90YWxXaWR0aC52YWx1ZSA8PSBwcm9wcy5icmVha3BvaW50KVxuICAgIClcblxuICAgIGNvbnN0IGlzTWluaSA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5taW5pID09PSB0cnVlICYmIGJlbG93QnJlYWtwb2ludC52YWx1ZSAhPT0gdHJ1ZVxuICAgIClcblxuICAgIGNvbnN0IHNpemUgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBpc01pbmkudmFsdWUgPT09IHRydWVcbiAgICAgICAgPyBwcm9wcy5taW5pV2lkdGhcbiAgICAgICAgOiBwcm9wcy53aWR0aFxuICAgICkpXG5cbiAgICBjb25zdCBzaG93aW5nID0gcmVmKFxuICAgICAgcHJvcHMuc2hvd0lmQWJvdmUgPT09IHRydWUgJiYgYmVsb3dCcmVha3BvaW50LnZhbHVlID09PSBmYWxzZVxuICAgICAgICA/IHRydWVcbiAgICAgICAgOiBwcm9wcy5tb2RlbFZhbHVlID09PSB0cnVlXG4gICAgKVxuXG4gICAgY29uc3QgaGlkZU9uUm91dGVDaGFuZ2UgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMucGVyc2lzdGVudCAhPT0gdHJ1ZVxuICAgICAgJiYgKGJlbG93QnJlYWtwb2ludC52YWx1ZSA9PT0gdHJ1ZSB8fCBvblNjcmVlbk92ZXJsYXkudmFsdWUgPT09IHRydWUpXG4gICAgKVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlU2hvdyAoZXZ0LCBub0V2ZW50KSB7XG4gICAgICBhZGRUb0hpc3RvcnkoKVxuXG4gICAgICBldnQgIT09IGZhbHNlICYmICRsYXlvdXQuYW5pbWF0ZSgpXG4gICAgICBhcHBseVBvc2l0aW9uKDApXG5cbiAgICAgIGlmIChiZWxvd0JyZWFrcG9pbnQudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3Qgb3RoZXJJbnN0YW5jZSA9ICRsYXlvdXQuaW5zdGFuY2VzWyBvdGhlclNpZGUudmFsdWUgXVxuICAgICAgICBpZiAob3RoZXJJbnN0YW5jZT8uYmVsb3dCcmVha3BvaW50ID09PSB0cnVlKSB7XG4gICAgICAgICAgb3RoZXJJbnN0YW5jZS5oaWRlKGZhbHNlKVxuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlCYWNrZHJvcCgxKVxuICAgICAgICAkbGF5b3V0LmlzQ29udGFpbmVyLnZhbHVlICE9PSB0cnVlICYmIHByZXZlbnRCb2R5U2Nyb2xsKHRydWUpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgYXBwbHlCYWNrZHJvcCgwKVxuICAgICAgICBldnQgIT09IGZhbHNlICYmIHNldFNjcm9sbGFibGUoZmFsc2UpXG4gICAgICB9XG5cbiAgICAgIHJlZ2lzdGVyVGltZW91dCgoKSA9PiB7XG4gICAgICAgIGV2dCAhPT0gZmFsc2UgJiYgc2V0U2Nyb2xsYWJsZSh0cnVlKVxuICAgICAgICBub0V2ZW50ICE9PSB0cnVlICYmIGVtaXQoJ3Nob3cnLCBldnQpXG4gICAgICB9LCBkdXJhdGlvbilcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVIaWRlIChldnQsIG5vRXZlbnQpIHtcbiAgICAgIHJlbW92ZUZyb21IaXN0b3J5KClcblxuICAgICAgZXZ0ICE9PSBmYWxzZSAmJiAkbGF5b3V0LmFuaW1hdGUoKVxuXG4gICAgICBhcHBseUJhY2tkcm9wKDApXG4gICAgICBhcHBseVBvc2l0aW9uKHN0YXRlRGlyZWN0aW9uLnZhbHVlICogc2l6ZS52YWx1ZSlcblxuICAgICAgY2xlYW51cCgpXG5cbiAgICAgIGlmIChub0V2ZW50ICE9PSB0cnVlKSB7XG4gICAgICAgIHJlZ2lzdGVyVGltZW91dCgoKSA9PiB7IGVtaXQoJ2hpZGUnLCBldnQpIH0sIGR1cmF0aW9uKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJlbW92ZVRpbWVvdXQoKVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHsgc2hvdywgaGlkZSB9ID0gdXNlTW9kZWxUb2dnbGUoe1xuICAgICAgc2hvd2luZyxcbiAgICAgIGhpZGVPblJvdXRlQ2hhbmdlLFxuICAgICAgaGFuZGxlU2hvdyxcbiAgICAgIGhhbmRsZUhpZGVcbiAgICB9KVxuXG4gICAgY29uc3QgeyBhZGRUb0hpc3RvcnksIHJlbW92ZUZyb21IaXN0b3J5IH0gPSB1c2VIaXN0b3J5KHNob3dpbmcsIGhpZGUsIGhpZGVPblJvdXRlQ2hhbmdlKVxuXG4gICAgY29uc3QgaW5zdGFuY2UgPSB7XG4gICAgICBiZWxvd0JyZWFrcG9pbnQsXG4gICAgICBoaWRlXG4gICAgfVxuXG4gICAgY29uc3QgcmlnaHRTaWRlID0gY29tcHV0ZWQoKCkgPT4gcHJvcHMuc2lkZSA9PT0gJ3JpZ2h0JylcblxuICAgIGNvbnN0IHN0YXRlRGlyZWN0aW9uID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICgkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/IC0xIDogMSkgKiAocmlnaHRTaWRlLnZhbHVlID09PSB0cnVlID8gMSA6IC0xKVxuICAgIClcblxuICAgIGNvbnN0IGZsYWdCYWNrZHJvcEJnID0gcmVmKDApXG4gICAgY29uc3QgZmxhZ1Bhbm5pbmcgPSByZWYoZmFsc2UpXG4gICAgY29uc3QgZmxhZ01pbmlBbmltYXRlID0gcmVmKGZhbHNlKVxuICAgIGNvbnN0IGZsYWdDb250ZW50UG9zaXRpb24gPSByZWYoIC8vIHN0YXJ0aW5nIHdpdGggXCJoaWRkZW5cIiBmb3IgU1NSXG4gICAgICBzaXplLnZhbHVlICogc3RhdGVEaXJlY3Rpb24udmFsdWVcbiAgICApXG5cbiAgICBjb25zdCBvdGhlclNpZGUgPSBjb21wdXRlZCgoKSA9PiAocmlnaHRTaWRlLnZhbHVlID09PSB0cnVlID8gJ2xlZnQnIDogJ3JpZ2h0JykpXG4gICAgY29uc3Qgb2Zmc2V0ID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSAmJiBiZWxvd0JyZWFrcG9pbnQudmFsdWUgPT09IGZhbHNlICYmIHByb3BzLm92ZXJsYXkgPT09IGZhbHNlXG4gICAgICAgID8gKHByb3BzLm1pbmlUb092ZXJsYXkgPT09IHRydWUgPyBwcm9wcy5taW5pV2lkdGggOiBzaXplLnZhbHVlKVxuICAgICAgICA6IDBcbiAgICApKVxuXG4gICAgY29uc3QgZml4ZWQgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMub3ZlcmxheSA9PT0gdHJ1ZVxuICAgICAgfHwgcHJvcHMubWluaVRvT3ZlcmxheSA9PT0gdHJ1ZVxuICAgICAgfHwgJGxheW91dC52aWV3LnZhbHVlLmluZGV4T2YocmlnaHRTaWRlLnZhbHVlID8gJ1InIDogJ0wnKSAhPT0gLTFcbiAgICAgIHx8ICgkcS5wbGF0Zm9ybS5pcy5pb3MgPT09IHRydWUgJiYgJGxheW91dC5pc0NvbnRhaW5lci52YWx1ZSA9PT0gdHJ1ZSlcbiAgICApXG5cbiAgICBjb25zdCBvbkxheW91dCA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5vdmVybGF5ID09PSBmYWxzZVxuICAgICAgJiYgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgJiYgYmVsb3dCcmVha3BvaW50LnZhbHVlID09PSBmYWxzZVxuICAgIClcblxuICAgIGNvbnN0IG9uU2NyZWVuT3ZlcmxheSA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5vdmVybGF5ID09PSB0cnVlXG4gICAgICAmJiBzaG93aW5nLnZhbHVlID09PSB0cnVlXG4gICAgICAmJiBiZWxvd0JyZWFrcG9pbnQudmFsdWUgPT09IGZhbHNlXG4gICAgKVxuXG4gICAgY29uc3QgYmFja2Ryb3BDbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAnZnVsbHNjcmVlbiBxLWRyYXdlcl9fYmFja2Ryb3AnXG4gICAgICArIChzaG93aW5nLnZhbHVlID09PSBmYWxzZSAmJiBmbGFnUGFubmluZy52YWx1ZSA9PT0gZmFsc2UgPyAnIGhpZGRlbicgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCBiYWNrZHJvcFN0eWxlID0gY29tcHV0ZWQoKCkgPT4gKHtcbiAgICAgIGJhY2tncm91bmRDb2xvcjogYHJnYmEoMCwwLDAsJHsgZmxhZ0JhY2tkcm9wQmcudmFsdWUgKiAwLjQgfSlgXG4gICAgfSkpXG5cbiAgICBjb25zdCBoZWFkZXJTbG90ID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcmlnaHRTaWRlLnZhbHVlID09PSB0cnVlXG4gICAgICAgID8gJGxheW91dC5yb3dzLnZhbHVlLnRvcFsgMiBdID09PSAncidcbiAgICAgICAgOiAkbGF5b3V0LnJvd3MudmFsdWUudG9wWyAwIF0gPT09ICdsJ1xuICAgICkpXG5cbiAgICBjb25zdCBmb290ZXJTbG90ID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcmlnaHRTaWRlLnZhbHVlID09PSB0cnVlXG4gICAgICAgID8gJGxheW91dC5yb3dzLnZhbHVlLmJvdHRvbVsgMiBdID09PSAncidcbiAgICAgICAgOiAkbGF5b3V0LnJvd3MudmFsdWUuYm90dG9tWyAwIF0gPT09ICdsJ1xuICAgICkpXG5cbiAgICBjb25zdCBhYm92ZVN0eWxlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgY3NzID0ge31cblxuICAgICAgaWYgKCRsYXlvdXQuaGVhZGVyLnNwYWNlID09PSB0cnVlICYmIGhlYWRlclNsb3QudmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgIGlmIChmaXhlZC52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNzcy50b3AgPSBgJHsgJGxheW91dC5oZWFkZXIub2Zmc2V0IH1weGBcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgkbGF5b3V0LmhlYWRlci5zcGFjZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNzcy50b3AgPSBgJHsgJGxheW91dC5oZWFkZXIuc2l6ZSB9cHhgXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCRsYXlvdXQuZm9vdGVyLnNwYWNlID09PSB0cnVlICYmIGZvb3RlclNsb3QudmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgIGlmIChmaXhlZC52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNzcy5ib3R0b20gPSBgJHsgJGxheW91dC5mb290ZXIub2Zmc2V0IH1weGBcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgkbGF5b3V0LmZvb3Rlci5zcGFjZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNzcy5ib3R0b20gPSBgJHsgJGxheW91dC5mb290ZXIuc2l6ZSB9cHhgXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNzc1xuICAgIH0pXG5cbiAgICBjb25zdCBzdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IHN0eWxlID0ge1xuICAgICAgICB3aWR0aDogYCR7IHNpemUudmFsdWUgfXB4YCxcbiAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWCgkeyBmbGFnQ29udGVudFBvc2l0aW9uLnZhbHVlIH1weClgXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBiZWxvd0JyZWFrcG9pbnQudmFsdWUgPT09IHRydWVcbiAgICAgICAgPyBzdHlsZVxuICAgICAgICA6IE9iamVjdC5hc3NpZ24oc3R5bGUsIGFib3ZlU3R5bGUudmFsdWUpXG4gICAgfSlcblxuICAgIGNvbnN0IGNvbnRlbnRDbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1kcmF3ZXJfX2NvbnRlbnQgZml0ICdcbiAgICAgICsgKCRsYXlvdXQuaXNDb250YWluZXIudmFsdWUgIT09IHRydWUgPyAnc2Nyb2xsJyA6ICdvdmVyZmxvdy1hdXRvJylcbiAgICApXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIGBxLWRyYXdlciBxLWRyYXdlci0tJHsgcHJvcHMuc2lkZSB9YFxuICAgICAgKyAoZmxhZ01pbmlBbmltYXRlLnZhbHVlID09PSB0cnVlID8gJyBxLWRyYXdlci0tbWluaS1hbmltYXRlJyA6ICcnKVxuICAgICAgKyAocHJvcHMuYm9yZGVyZWQgPT09IHRydWUgPyAnIHEtZHJhd2VyLS1ib3JkZXJlZCcgOiAnJylcbiAgICAgICsgKGlzRGFyay52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1kcmF3ZXItLWRhcmsgcS1kYXJrJyA6ICcnKVxuICAgICAgKyAoXG4gICAgICAgIGZsYWdQYW5uaW5nLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgPyAnIG5vLXRyYW5zaXRpb24nXG4gICAgICAgICAgOiAoc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSA/ICcnIDogJyBxLWxheW91dC0tcHJldmVudC1mb2N1cycpXG4gICAgICApXG4gICAgICArIChcbiAgICAgICAgYmVsb3dCcmVha3BvaW50LnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgPyAnIGZpeGVkIHEtZHJhd2VyLS1vbi10b3AgcS1kcmF3ZXItLW1vYmlsZSBxLWRyYXdlci0tdG9wLXBhZGRpbmcnXG4gICAgICAgICAgOiBgIHEtZHJhd2VyLS0keyBpc01pbmkudmFsdWUgPT09IHRydWUgPyAnbWluaScgOiAnc3RhbmRhcmQnIH1gXG4gICAgICAgICAgKyAoZml4ZWQudmFsdWUgPT09IHRydWUgfHwgb25MYXlvdXQudmFsdWUgIT09IHRydWUgPyAnIGZpeGVkJyA6ICcnKVxuICAgICAgICAgICsgKHByb3BzLm92ZXJsYXkgPT09IHRydWUgfHwgcHJvcHMubWluaVRvT3ZlcmxheSA9PT0gdHJ1ZSA/ICcgcS1kcmF3ZXItLW9uLXRvcCcgOiAnJylcbiAgICAgICAgICArIChoZWFkZXJTbG90LnZhbHVlID09PSB0cnVlID8gJyBxLWRyYXdlci0tdG9wLXBhZGRpbmcnIDogJycpXG4gICAgICApXG4gICAgKVxuXG4gICAgY29uc3Qgb3BlbkRpcmVjdGl2ZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIC8vIGlmIHByb3BzLm5vU3dpcGVPcGVuICE9PSB0cnVlXG4gICAgICBjb25zdCBkaXIgPSAkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/IHByb3BzLnNpZGUgOiBvdGhlclNpZGUudmFsdWVcblxuICAgICAgcmV0dXJuIFsgW1xuICAgICAgICBUb3VjaFBhbixcbiAgICAgICAgb25PcGVuUGFuLFxuICAgICAgICB2b2lkIDAsXG4gICAgICAgIHtcbiAgICAgICAgICBbIGRpciBdOiB0cnVlLFxuICAgICAgICAgIG1vdXNlOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIF0gXVxuICAgIH0pXG5cbiAgICBjb25zdCBjb250ZW50Q2xvc2VEaXJlY3RpdmUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICAvLyBpZiBiZWxvd0JyZWFrcG9pbnQudmFsdWUgPT09IHRydWUgJiYgcHJvcHMubm9Td2lwZUNsb3NlICE9PSB0cnVlXG4gICAgICBjb25zdCBkaXIgPSAkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/IG90aGVyU2lkZS52YWx1ZSA6IHByb3BzLnNpZGVcblxuICAgICAgcmV0dXJuIFsgW1xuICAgICAgICBUb3VjaFBhbixcbiAgICAgICAgb25DbG9zZVBhbixcbiAgICAgICAgdm9pZCAwLFxuICAgICAgICB7XG4gICAgICAgICAgWyBkaXIgXTogdHJ1ZSxcbiAgICAgICAgICBtb3VzZTogdHJ1ZVxuICAgICAgICB9XG4gICAgICBdIF1cbiAgICB9KVxuXG4gICAgY29uc3QgYmFja2Ryb3BDbG9zZURpcmVjdGl2ZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIC8vIGlmIHNob3dpbmcudmFsdWUgPT09IHRydWUgJiYgcHJvcHMubm9Td2lwZUJhY2tkcm9wICE9PSB0cnVlXG4gICAgICBjb25zdCBkaXIgPSAkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/IG90aGVyU2lkZS52YWx1ZSA6IHByb3BzLnNpZGVcblxuICAgICAgcmV0dXJuIFsgW1xuICAgICAgICBUb3VjaFBhbixcbiAgICAgICAgb25DbG9zZVBhbixcbiAgICAgICAgdm9pZCAwLFxuICAgICAgICB7XG4gICAgICAgICAgWyBkaXIgXTogdHJ1ZSxcbiAgICAgICAgICBtb3VzZTogdHJ1ZSxcbiAgICAgICAgICBtb3VzZUFsbERpcjogdHJ1ZVxuICAgICAgICB9XG4gICAgICBdIF1cbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlQmVsb3dCcmVha3BvaW50ICgpIHtcbiAgICAgIHVwZGF0ZUxvY2FsKGJlbG93QnJlYWtwb2ludCwgKFxuICAgICAgICBwcm9wcy5iZWhhdmlvciA9PT0gJ21vYmlsZSdcbiAgICAgICAgfHwgKHByb3BzLmJlaGF2aW9yICE9PSAnZGVza3RvcCcgJiYgJGxheW91dC50b3RhbFdpZHRoLnZhbHVlIDw9IHByb3BzLmJyZWFrcG9pbnQpXG4gICAgICApKVxuICAgIH1cblxuICAgIHdhdGNoKGJlbG93QnJlYWtwb2ludCwgdmFsID0+IHtcbiAgICAgIGlmICh2YWwgPT09IHRydWUpIHsgLy8gZnJvbSBsZyB0byB4c1xuICAgICAgICBsYXN0RGVza3RvcFN0YXRlID0gc2hvd2luZy52YWx1ZVxuICAgICAgICBzaG93aW5nLnZhbHVlID09PSB0cnVlICYmIGhpZGUoZmFsc2UpXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChcbiAgICAgICAgcHJvcHMub3ZlcmxheSA9PT0gZmFsc2VcbiAgICAgICAgJiYgcHJvcHMuYmVoYXZpb3IgIT09ICdtb2JpbGUnXG4gICAgICAgICYmIGxhc3REZXNrdG9wU3RhdGUgIT09IGZhbHNlXG4gICAgICApIHsgLy8gZnJvbSB4cyB0byBsZ1xuICAgICAgICBpZiAoc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGFwcGx5UG9zaXRpb24oMClcbiAgICAgICAgICBhcHBseUJhY2tkcm9wKDApXG4gICAgICAgICAgY2xlYW51cCgpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgc2hvdyhmYWxzZSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG5cbiAgICB3YXRjaCgoKSA9PiBwcm9wcy5zaWRlLCAobmV3U2lkZSwgb2xkU2lkZSkgPT4ge1xuICAgICAgaWYgKCRsYXlvdXQuaW5zdGFuY2VzWyBvbGRTaWRlIF0gPT09IGluc3RhbmNlKSB7XG4gICAgICAgICRsYXlvdXQuaW5zdGFuY2VzWyBvbGRTaWRlIF0gPSB2b2lkIDBcbiAgICAgICAgJGxheW91dFsgb2xkU2lkZSBdLnNwYWNlID0gZmFsc2VcbiAgICAgICAgJGxheW91dFsgb2xkU2lkZSBdLm9mZnNldCA9IDBcbiAgICAgIH1cblxuICAgICAgJGxheW91dC5pbnN0YW5jZXNbIG5ld1NpZGUgXSA9IGluc3RhbmNlXG4gICAgICAkbGF5b3V0WyBuZXdTaWRlIF0uc2l6ZSA9IHNpemUudmFsdWVcbiAgICAgICRsYXlvdXRbIG5ld1NpZGUgXS5zcGFjZSA9IG9uTGF5b3V0LnZhbHVlXG4gICAgICAkbGF5b3V0WyBuZXdTaWRlIF0ub2Zmc2V0ID0gb2Zmc2V0LnZhbHVlXG4gICAgfSlcblxuICAgIHdhdGNoKCRsYXlvdXQudG90YWxXaWR0aCwgKCkgPT4ge1xuICAgICAgaWYgKCRsYXlvdXQuaXNDb250YWluZXIudmFsdWUgPT09IHRydWUgfHwgZG9jdW1lbnQucVNjcm9sbFByZXZlbnRlZCAhPT0gdHJ1ZSkge1xuICAgICAgICB1cGRhdGVCZWxvd0JyZWFrcG9pbnQoKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICB3YXRjaChcbiAgICAgICgpID0+IHByb3BzLmJlaGF2aW9yICsgcHJvcHMuYnJlYWtwb2ludCxcbiAgICAgIHVwZGF0ZUJlbG93QnJlYWtwb2ludFxuICAgIClcblxuICAgIHdhdGNoKCRsYXlvdXQuaXNDb250YWluZXIsIHZhbCA9PiB7XG4gICAgICBzaG93aW5nLnZhbHVlID09PSB0cnVlICYmIHByZXZlbnRCb2R5U2Nyb2xsKHZhbCAhPT0gdHJ1ZSlcbiAgICAgIHZhbCA9PT0gdHJ1ZSAmJiB1cGRhdGVCZWxvd0JyZWFrcG9pbnQoKVxuICAgIH0pXG5cbiAgICB3YXRjaCgkbGF5b3V0LnNjcm9sbGJhcldpZHRoLCAoKSA9PiB7XG4gICAgICBhcHBseVBvc2l0aW9uKHNob3dpbmcudmFsdWUgPT09IHRydWUgPyAwIDogdm9pZCAwKVxuICAgIH0pXG5cbiAgICB3YXRjaChvZmZzZXQsIHZhbCA9PiB7IHVwZGF0ZUxheW91dCgnb2Zmc2V0JywgdmFsKSB9KVxuXG4gICAgd2F0Y2gob25MYXlvdXQsIHZhbCA9PiB7XG4gICAgICBlbWl0KCdvbkxheW91dCcsIHZhbClcbiAgICAgIHVwZGF0ZUxheW91dCgnc3BhY2UnLCB2YWwpXG4gICAgfSlcblxuICAgIHdhdGNoKHJpZ2h0U2lkZSwgKCkgPT4geyBhcHBseVBvc2l0aW9uKCkgfSlcblxuICAgIHdhdGNoKHNpemUsIHZhbCA9PiB7XG4gICAgICBhcHBseVBvc2l0aW9uKClcbiAgICAgIHVwZGF0ZVNpemVPbkxheW91dChwcm9wcy5taW5pVG9PdmVybGF5LCB2YWwpXG4gICAgfSlcblxuICAgIHdhdGNoKCgpID0+IHByb3BzLm1pbmlUb092ZXJsYXksIHZhbCA9PiB7XG4gICAgICB1cGRhdGVTaXplT25MYXlvdXQodmFsLCBzaXplLnZhbHVlKVxuICAgIH0pXG5cbiAgICB3YXRjaCgoKSA9PiAkcS5sYW5nLnJ0bCwgKCkgPT4geyBhcHBseVBvc2l0aW9uKCkgfSlcblxuICAgIHdhdGNoKCgpID0+IHByb3BzLm1pbmksICgpID0+IHtcbiAgICAgIGlmIChwcm9wcy5ub01pbmlBbmltYXRpb24pIHJldHVyblxuICAgICAgaWYgKHByb3BzLm1vZGVsVmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgYW5pbWF0ZU1pbmkoKVxuICAgICAgICAkbGF5b3V0LmFuaW1hdGUoKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICB3YXRjaChpc01pbmksIHZhbCA9PiB7IGVtaXQoJ21pbmlTdGF0ZScsIHZhbCkgfSlcblxuICAgIGZ1bmN0aW9uIGFwcGx5UG9zaXRpb24gKHBvc2l0aW9uKSB7XG4gICAgICBpZiAocG9zaXRpb24gPT09IHZvaWQgMCkge1xuICAgICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgcG9zaXRpb24gPSBzaG93aW5nLnZhbHVlID09PSB0cnVlID8gMCA6IHNpemUudmFsdWVcbiAgICAgICAgICBhcHBseVBvc2l0aW9uKHN0YXRlRGlyZWN0aW9uLnZhbHVlICogcG9zaXRpb24pXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICRsYXlvdXQuaXNDb250YWluZXIudmFsdWUgPT09IHRydWVcbiAgICAgICAgICAmJiByaWdodFNpZGUudmFsdWUgPT09IHRydWVcbiAgICAgICAgICAmJiAoYmVsb3dCcmVha3BvaW50LnZhbHVlID09PSB0cnVlIHx8IE1hdGguYWJzKHBvc2l0aW9uKSA9PT0gc2l6ZS52YWx1ZSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgcG9zaXRpb24gKz0gc3RhdGVEaXJlY3Rpb24udmFsdWUgKiAkbGF5b3V0LnNjcm9sbGJhcldpZHRoLnZhbHVlXG4gICAgICAgIH1cblxuICAgICAgICBmbGFnQ29udGVudFBvc2l0aW9uLnZhbHVlID0gcG9zaXRpb25cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhcHBseUJhY2tkcm9wICh4KSB7XG4gICAgICBmbGFnQmFja2Ryb3BCZy52YWx1ZSA9IHhcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRTY3JvbGxhYmxlICh2KSB7XG4gICAgICBjb25zdCBhY3Rpb24gPSB2ID09PSB0cnVlXG4gICAgICAgID8gJ3JlbW92ZSdcbiAgICAgICAgOiAoJGxheW91dC5pc0NvbnRhaW5lci52YWx1ZSAhPT0gdHJ1ZSA/ICdhZGQnIDogJycpXG5cbiAgICAgIGFjdGlvbiAhPT0gJycgJiYgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3RbIGFjdGlvbiBdKCdxLWJvZHktLWRyYXdlci10b2dnbGUnKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFuaW1hdGVNaW5pICgpIHtcbiAgICAgIHRpbWVyTWluaSAhPT0gbnVsbCAmJiBjbGVhclRpbWVvdXQodGltZXJNaW5pKVxuXG4gICAgICBpZiAodm0ucHJveHkgJiYgdm0ucHJveHkuJGVsKSB7XG4gICAgICAgIC8vIG5lZWQgdG8gc3BlZWQgaXQgdXAgYW5kIGFwcGx5IGl0IGltbWVkaWF0ZWx5LFxuICAgICAgICAvLyBldmVuIGZhc3RlciB0aGFuIFZ1ZSdzIG5leHRUaWNrIVxuICAgICAgICB2bS5wcm94eS4kZWwuY2xhc3NMaXN0LmFkZCgncS1kcmF3ZXItLW1pbmktYW5pbWF0ZScpXG4gICAgICB9XG5cbiAgICAgIGZsYWdNaW5pQW5pbWF0ZS52YWx1ZSA9IHRydWVcbiAgICAgIHRpbWVyTWluaSA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aW1lck1pbmkgPSBudWxsXG4gICAgICAgIGZsYWdNaW5pQW5pbWF0ZS52YWx1ZSA9IGZhbHNlXG4gICAgICAgIHZtPy5wcm94eT8uJGVsPy5jbGFzc0xpc3QucmVtb3ZlKCdxLWRyYXdlci0tbWluaS1hbmltYXRlJylcbiAgICAgIH0sIDE1MClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbk9wZW5QYW4gKGV2dCkge1xuICAgICAgaWYgKHNob3dpbmcudmFsdWUgIT09IGZhbHNlKSB7XG4gICAgICAgIC8vIHNvbWUgYnJvd3NlcnMgbWlnaHQgY2FwdHVyZSBhbmQgdHJpZ2dlciB0aGlzXG4gICAgICAgIC8vIGV2ZW4gaWYgRHJhd2VyIGhhcyBqdXN0IGJlZW4gb3BlbmVkIChidXQgYW5pbWF0aW9uIGlzIHN0aWxsIHBlbmRpbmcpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBjb25zdFxuICAgICAgICB3aWR0aCA9IHNpemUudmFsdWUsXG4gICAgICAgIHBvc2l0aW9uID0gYmV0d2VlbihldnQuZGlzdGFuY2UueCwgMCwgd2lkdGgpXG5cbiAgICAgIGlmIChldnQuaXNGaW5hbCA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBvcGVuZWQgPSBwb3NpdGlvbiA+PSBNYXRoLm1pbig3NSwgd2lkdGgpXG5cbiAgICAgICAgaWYgKG9wZW5lZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHNob3coKVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICRsYXlvdXQuYW5pbWF0ZSgpXG4gICAgICAgICAgYXBwbHlCYWNrZHJvcCgwKVxuICAgICAgICAgIGFwcGx5UG9zaXRpb24oc3RhdGVEaXJlY3Rpb24udmFsdWUgKiB3aWR0aClcbiAgICAgICAgfVxuXG4gICAgICAgIGZsYWdQYW5uaW5nLnZhbHVlID0gZmFsc2VcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGFwcGx5UG9zaXRpb24oXG4gICAgICAgICgkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/IHJpZ2h0U2lkZS52YWx1ZSAhPT0gdHJ1ZSA6IHJpZ2h0U2lkZS52YWx1ZSlcbiAgICAgICAgICA/IE1hdGgubWF4KHdpZHRoIC0gcG9zaXRpb24sIDApXG4gICAgICAgICAgOiBNYXRoLm1pbigwLCBwb3NpdGlvbiAtIHdpZHRoKVxuICAgICAgKVxuICAgICAgYXBwbHlCYWNrZHJvcChcbiAgICAgICAgYmV0d2Vlbihwb3NpdGlvbiAvIHdpZHRoLCAwLCAxKVxuICAgICAgKVxuXG4gICAgICBpZiAoZXZ0LmlzRmlyc3QgPT09IHRydWUpIHtcbiAgICAgICAgZmxhZ1Bhbm5pbmcudmFsdWUgPSB0cnVlXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25DbG9zZVBhbiAoZXZ0KSB7XG4gICAgICBpZiAoc2hvd2luZy52YWx1ZSAhPT0gdHJ1ZSkge1xuICAgICAgICAvLyBzb21lIGJyb3dzZXJzIG1pZ2h0IGNhcHR1cmUgYW5kIHRyaWdnZXIgdGhpc1xuICAgICAgICAvLyBldmVuIGlmIERyYXdlciBoYXMganVzdCBiZWVuIGNsb3NlZCAoYnV0IGFuaW1hdGlvbiBpcyBzdGlsbCBwZW5kaW5nKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3RcbiAgICAgICAgd2lkdGggPSBzaXplLnZhbHVlLFxuICAgICAgICBkaXIgPSBldnQuZGlyZWN0aW9uID09PSBwcm9wcy5zaWRlLFxuICAgICAgICBwb3NpdGlvbiA9ICgkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/IGRpciAhPT0gdHJ1ZSA6IGRpcilcbiAgICAgICAgICA/IGJldHdlZW4oZXZ0LmRpc3RhbmNlLngsIDAsIHdpZHRoKVxuICAgICAgICAgIDogMFxuXG4gICAgICBpZiAoZXZ0LmlzRmluYWwgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3Qgb3BlbmVkID0gTWF0aC5hYnMocG9zaXRpb24pIDwgTWF0aC5taW4oNzUsIHdpZHRoKVxuXG4gICAgICAgIGlmIChvcGVuZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAkbGF5b3V0LmFuaW1hdGUoKVxuICAgICAgICAgIGFwcGx5QmFja2Ryb3AoMSlcbiAgICAgICAgICBhcHBseVBvc2l0aW9uKDApXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgaGlkZSgpXG4gICAgICAgIH1cblxuICAgICAgICBmbGFnUGFubmluZy52YWx1ZSA9IGZhbHNlXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBhcHBseVBvc2l0aW9uKHN0YXRlRGlyZWN0aW9uLnZhbHVlICogcG9zaXRpb24pXG4gICAgICBhcHBseUJhY2tkcm9wKGJldHdlZW4oMSAtIHBvc2l0aW9uIC8gd2lkdGgsIDAsIDEpKVxuXG4gICAgICBpZiAoZXZ0LmlzRmlyc3QgPT09IHRydWUpIHtcbiAgICAgICAgZmxhZ1Bhbm5pbmcudmFsdWUgPSB0cnVlXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYW51cCAoKSB7XG4gICAgICBwcmV2ZW50Qm9keVNjcm9sbChmYWxzZSlcbiAgICAgIHNldFNjcm9sbGFibGUodHJ1ZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVMYXlvdXQgKHByb3AsIHZhbCkge1xuICAgICAgJGxheW91dC51cGRhdGUocHJvcHMuc2lkZSwgcHJvcCwgdmFsKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUxvY2FsIChwcm9wLCB2YWwpIHtcbiAgICAgIGlmIChwcm9wLnZhbHVlICE9PSB2YWwpIHtcbiAgICAgICAgcHJvcC52YWx1ZSA9IHZhbFxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVNpemVPbkxheW91dCAobWluaVRvT3ZlcmxheSwgc2l6ZSkge1xuICAgICAgdXBkYXRlTGF5b3V0KCdzaXplJywgbWluaVRvT3ZlcmxheSA9PT0gdHJ1ZSA/IHByb3BzLm1pbmlXaWR0aCA6IHNpemUpXG4gICAgfVxuXG4gICAgJGxheW91dC5pbnN0YW5jZXNbIHByb3BzLnNpZGUgXSA9IGluc3RhbmNlXG4gICAgdXBkYXRlU2l6ZU9uTGF5b3V0KHByb3BzLm1pbmlUb092ZXJsYXksIHNpemUudmFsdWUpXG4gICAgdXBkYXRlTGF5b3V0KCdzcGFjZScsIG9uTGF5b3V0LnZhbHVlKVxuICAgIHVwZGF0ZUxheW91dCgnb2Zmc2V0Jywgb2Zmc2V0LnZhbHVlKVxuXG4gICAgaWYgKFxuICAgICAgcHJvcHMuc2hvd0lmQWJvdmUgPT09IHRydWVcbiAgICAgICYmIHByb3BzLm1vZGVsVmFsdWUgIT09IHRydWVcbiAgICAgICYmIHNob3dpbmcudmFsdWUgPT09IHRydWVcbiAgICAgICYmIHByb3BzWyAnb25VcGRhdGU6bW9kZWxWYWx1ZScgXSAhPT0gdm9pZCAwXG4gICAgKSB7XG4gICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIHRydWUpXG4gICAgfVxuXG4gICAgb25Nb3VudGVkKCgpID0+IHtcbiAgICAgIGVtaXQoJ29uTGF5b3V0Jywgb25MYXlvdXQudmFsdWUpXG4gICAgICBlbWl0KCdtaW5pU3RhdGUnLCBpc01pbmkudmFsdWUpXG5cbiAgICAgIGxhc3REZXNrdG9wU3RhdGUgPSBwcm9wcy5zaG93SWZBYm92ZSA9PT0gdHJ1ZVxuXG4gICAgICBjb25zdCBmbiA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgYWN0aW9uID0gc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSA/IGhhbmRsZVNob3cgOiBoYW5kbGVIaWRlXG4gICAgICAgIGFjdGlvbihmYWxzZSwgdHJ1ZSlcbiAgICAgIH1cblxuICAgICAgaWYgKCRsYXlvdXQudG90YWxXaWR0aC52YWx1ZSAhPT0gMCkge1xuICAgICAgICAvLyBtYWtlIHN1cmUgdGhhdCBhbGwgY29tcHV0ZWQgcHJvcGVydGllc1xuICAgICAgICAvLyBoYXZlIGJlZW4gdXBkYXRlZCBiZWZvcmUgY2FsbGluZyBoYW5kbGVTaG93L2hhbmRsZUhpZGUoKVxuICAgICAgICBuZXh0VGljayhmbilcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGxheW91dFRvdGFsV2lkdGhXYXRjaGVyID0gd2F0Y2goJGxheW91dC50b3RhbFdpZHRoLCAoKSA9PiB7XG4gICAgICAgIGxheW91dFRvdGFsV2lkdGhXYXRjaGVyKClcbiAgICAgICAgbGF5b3V0VG90YWxXaWR0aFdhdGNoZXIgPSB2b2lkIDBcblxuICAgICAgICBpZiAoc2hvd2luZy52YWx1ZSA9PT0gZmFsc2UgJiYgcHJvcHMuc2hvd0lmQWJvdmUgPT09IHRydWUgJiYgYmVsb3dCcmVha3BvaW50LnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICAgIHNob3coZmFsc2UpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZm4oKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG5cbiAgICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgICAgbGF5b3V0VG90YWxXaWR0aFdhdGNoZXI/LigpXG5cbiAgICAgIGlmICh0aW1lck1pbmkgIT09IG51bGwpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyTWluaSlcbiAgICAgICAgdGltZXJNaW5pID0gbnVsbFxuICAgICAgfVxuXG4gICAgICBzaG93aW5nLnZhbHVlID09PSB0cnVlICYmIGNsZWFudXAoKVxuXG4gICAgICBpZiAoJGxheW91dC5pbnN0YW5jZXNbIHByb3BzLnNpZGUgXSA9PT0gaW5zdGFuY2UpIHtcbiAgICAgICAgJGxheW91dC5pbnN0YW5jZXNbIHByb3BzLnNpZGUgXSA9IHZvaWQgMFxuICAgICAgICB1cGRhdGVMYXlvdXQoJ3NpemUnLCAwKVxuICAgICAgICB1cGRhdGVMYXlvdXQoJ29mZnNldCcsIDApXG4gICAgICAgIHVwZGF0ZUxheW91dCgnc3BhY2UnLCBmYWxzZSlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNvbnN0IGNoaWxkID0gW11cblxuICAgICAgaWYgKGJlbG93QnJlYWtwb2ludC52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBwcm9wcy5ub1N3aXBlT3BlbiA9PT0gZmFsc2UgJiYgY2hpbGQucHVzaChcbiAgICAgICAgICB3aXRoRGlyZWN0aXZlcyhcbiAgICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAga2V5OiAnb3BlbicsXG4gICAgICAgICAgICAgIGNsYXNzOiBgcS1kcmF3ZXJfX29wZW5lciBmaXhlZC0keyBwcm9wcy5zaWRlIH1gLFxuICAgICAgICAgICAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZSdcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgb3BlbkRpcmVjdGl2ZS52YWx1ZVxuICAgICAgICAgIClcbiAgICAgICAgKVxuXG4gICAgICAgIGNoaWxkLnB1c2goXG4gICAgICAgICAgaERpcihcbiAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICByZWY6ICdiYWNrZHJvcCcsXG4gICAgICAgICAgICAgIGNsYXNzOiBiYWNrZHJvcENsYXNzLnZhbHVlLFxuICAgICAgICAgICAgICBzdHlsZTogYmFja2Ryb3BTdHlsZS52YWx1ZSxcbiAgICAgICAgICAgICAgJ2FyaWEtaGlkZGVuJzogJ3RydWUnLFxuICAgICAgICAgICAgICBvbkNsaWNrOiBoaWRlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdm9pZCAwLFxuICAgICAgICAgICAgJ2JhY2tkcm9wJyxcbiAgICAgICAgICAgIHByb3BzLm5vU3dpcGVCYWNrZHJvcCAhPT0gdHJ1ZSAmJiBzaG93aW5nLnZhbHVlID09PSB0cnVlLFxuICAgICAgICAgICAgKCkgPT4gYmFja2Ryb3BDbG9zZURpcmVjdGl2ZS52YWx1ZVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBtaW5pID0gaXNNaW5pLnZhbHVlID09PSB0cnVlICYmIHNsb3RzLm1pbmkgIT09IHZvaWQgMFxuICAgICAgY29uc3QgY29udGVudCA9IFtcbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIC4uLmF0dHJzLFxuICAgICAgICAgIGtleTogJycgKyBtaW5pLCAvLyByZXF1aXJlZCBvdGhlcndpc2UgVnVlIHdpbGwgbm90IGRpZmYgY29ycmVjdGx5XG4gICAgICAgICAgY2xhc3M6IFtcbiAgICAgICAgICAgIGNvbnRlbnRDbGFzcy52YWx1ZSxcbiAgICAgICAgICAgIGF0dHJzLmNsYXNzXG4gICAgICAgICAgXVxuICAgICAgICB9LCBtaW5pID09PSB0cnVlXG4gICAgICAgICAgPyBzbG90cy5taW5pKClcbiAgICAgICAgICA6IGhTbG90KHNsb3RzLmRlZmF1bHQpXG4gICAgICAgIClcbiAgICAgIF1cblxuICAgICAgaWYgKHByb3BzLmVsZXZhdGVkID09PSB0cnVlICYmIHNob3dpbmcudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgY29udGVudC5wdXNoKFxuICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgIGNsYXNzOiAncS1sYXlvdXRfX3NoYWRvdyBhYnNvbHV0ZS1mdWxsIG92ZXJmbG93LWhpZGRlbiBuby1wb2ludGVyLWV2ZW50cydcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIGNoaWxkLnB1c2goXG4gICAgICAgIGhEaXIoXG4gICAgICAgICAgJ2FzaWRlJyxcbiAgICAgICAgICB7IHJlZjogJ2NvbnRlbnQnLCBjbGFzczogY2xhc3Nlcy52YWx1ZSwgc3R5bGU6IHN0eWxlLnZhbHVlIH0sXG4gICAgICAgICAgY29udGVudCxcbiAgICAgICAgICAnY29udGVudGNsb3NlJyxcbiAgICAgICAgICBwcm9wcy5ub1N3aXBlQ2xvc2UgIT09IHRydWUgJiYgYmVsb3dCcmVha3BvaW50LnZhbHVlID09PSB0cnVlLFxuICAgICAgICAgICgpID0+IGNvbnRlbnRDbG9zZURpcmVjdGl2ZS52YWx1ZVxuICAgICAgICApXG4gICAgICApXG5cbiAgICAgIHJldHVybiBoKCdkaXYnLCB7IGNsYXNzOiAncS1kcmF3ZXItY29udGFpbmVyJyB9LCBjaGlsZClcbiAgICB9XG4gIH1cbn0pXG4iLCI8dGVtcGxhdGU+XG4gIDxxLWl0ZW0gY2xpY2thYmxlIHRhZz1cInJvdXRlci1saW5rXCIgOnRvPVwieyBuYW1lIH1cIj5cbiAgICA8cS1pdGVtLXNlY3Rpb24gdi1pZj1cImljb25cIiBhdmF0YXI+XG4gICAgICA8cS1pY29uIDpuYW1lPVwiaWNvblwiIC8+XG4gICAgPC9xLWl0ZW0tc2VjdGlvbj5cblxuICAgIDxxLWl0ZW0tc2VjdGlvbj5cbiAgICAgIDxxLWl0ZW0tbGFiZWw+XG4gICAgICAgIDx0ZW1wbGF0ZSB2LWlmPVwidGl0bGVPdmVycmlkZVwiPlxuICAgICAgICAgIHt7IHRpdGxlT3ZlcnJpZGUgfX1cbiAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgPHRlbXBsYXRlIHYtZWxzZT5cbiAgICAgICAgICB7eyB0aXRsZSB9fVxuICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgPC9xLWl0ZW0tbGFiZWw+XG4gICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgPC9xLWl0ZW0+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHsgQ29tcHV0ZWRSZWYgfSBmcm9tICd2dWUnXG5cbmRlZmluZU9wdGlvbnMoe1xuICBuYW1lOiAnUm91dGVyTGluaydcbn0pXG5cbnR5cGUgUHJvcHMgPSB7XG4gIHRpdGxlOiBzdHJpbmdcbiAgdGl0bGVPdmVycmlkZT86IENvbXB1dGVkUmVmPHN0cmluZz5cbiAgbmFtZTogc3RyaW5nXG4gIGljb24/OiBzdHJpbmdcbn1cblxud2l0aERlZmF1bHRzKGRlZmluZVByb3BzPFByb3BzPigpLCB7XG4gIHRpdGxlT3ZlcnJpZGU6IHVuZGVmaW5lZCxcbiAgbmFtZTogJyMnLFxuICBpY29uOiAnJ1xufSlcbjwvc2NyaXB0PlxuIiwiPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbnR5cGUgUHJvcHMgPSB7XG4gIHBlcnNpc3RlbnQ/OiBib29sZWFuXG59XG5cbndpdGhEZWZhdWx0cyhkZWZpbmVQcm9wczxQcm9wcz4oKSwge1xuICBwZXJzaXN0ZW50OiBmYWxzZVxufSlcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxxLWRpYWxvZyA6cGVyc2lzdGVudD5cbiAgICA8cS1jYXJkIGNsYXNzPVwiZGlhbG9nXCI+XG4gICAgICA8cS1idG5cbiAgICAgICAgdi1pZj1cIiFwZXJzaXN0ZW50XCJcbiAgICAgICAgaWNvbj1cImNsb3NlXCJcbiAgICAgICAgZmxhdFxuICAgICAgICByb3VuZFxuICAgICAgICBkZW5zZVxuICAgICAgICB2LWNsb3NlLXBvcHVwXG4gICAgICAgIGNsYXNzPVwiZGlhbG9nLWNsb3NlLWJ0blwiXG4gICAgICAvPlxuXG4gICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJxLXBhLW5vbmUgcS1tYS1tZFwiIGFsaWduPVwiY2VudGVyXCI+XG4gICAgICAgIDxxLWljb24gbmFtZT1cIm1kaS1hbGVydC1jaXJjbGVcIiBjb2xvcj1cIm5lZ2F0aXZlXCIgc2l6ZT1cIjY0cHhcIiAvPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNiBxLW15LXNtXCI+T3V0ZGF0ZWQgRmlybXdhcmUgVmVyc2lvbjwvZGl2PlxuICAgICAgICA8cD5cbiAgICAgICAgICBGaXJtd2FyZSB2ZXJzaW9uIG9uIHlvdXIgRmxpcHBlciBkb2VzIG5vdCBzdXBwb3J0IHRoaXMgYXBwLjxiciAvPkNsaWNrXG4gICAgICAgICAgdGhlIGJ1dHRvbiBiZWxvdyB0byB1cGRhdGUgeW91ciBkZXZpY2UuXG4gICAgICAgIDwvcD5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInEtcHQtbm9uZVwiIGFsaWduPVwiY2VudGVyXCI+XG4gICAgICAgIDxxLWJ0blxuICAgICAgICAgIG91dGxpbmVcbiAgICAgICAgICBjb2xvcj1cInByaW1hcnlcIlxuICAgICAgICAgIGxhYmVsPVwiVXBkYXRlXCJcbiAgICAgICAgICBAY2xpY2s9XCIkcm91dGVyLnB1c2goeyBuYW1lOiAnRGV2aWNlJyB9KVwiXG4gICAgICAgICAgdi1jbG9zZS1wb3B1cFxuICAgICAgICA+PC9xLWJ0bj5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgPC9xLWNhcmQ+XG4gIDwvcS1kaWFsb2c+XG48L3RlbXBsYXRlPlxuIiwiZXhwb3J0IGRlZmF1bHQgXCJfX1ZJVEVfQVNTRVRfX0JhRDVHNmowX19cIiIsImV4cG9ydCBkZWZhdWx0IFwiX19WSVRFX0FTU0VUX19DeEgySzlZVF9fXCIiLCJleHBvcnQgZGVmYXVsdCBcIl9fVklURV9BU1NFVF9fQnc2cWNPT3hfX1wiIiwiPHRlbXBsYXRlPlxuICA8cS1pdGVtIGNsYXNzPVwicm93IHJvdW5kZWQtYm9yZGVyc1wiPlxuICAgIDxxLWl0ZW0tc2VjdGlvbiBjbGFzcz1cImNvbC01XCI+XG4gICAgICA8aW1nXG4gICAgICAgIHYtaWY9XCJmbGlwcGVyLmluZm8/LmNvbG9yID09PSAxXCJcbiAgICAgICAgc3JjPVwifmFzc2V0cy9mbGlwcGVyX2JsYWNrLnN2Z1wiXG4gICAgICAgIHN0eWxlPVwid2lkdGg6IDEwMCVcIlxuICAgICAgLz5cbiAgICAgIDxpbWdcbiAgICAgICAgdi1lbHNlLWlmPVwiZmxpcHBlci5pbmZvPy5jb2xvciA9PT0gM1wiXG4gICAgICAgIHNyYz1cIn5hc3NldHMvZmxpcHBlcl90cmFuc3BhcmVudC5zdmdcIlxuICAgICAgICBzdHlsZT1cIndpZHRoOiAxMDAlXCJcbiAgICAgIC8+XG4gICAgICA8aW1nIHYtZWxzZSBzcmM9XCJ+YXNzZXRzL2ZsaXBwZXJfd2hpdGUuc3ZnXCIgc3R5bGU9XCJ3aWR0aDogMTAwJVwiIC8+XG4gICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICA8cS1pdGVtLXNlY3Rpb24gY2xhc3M9XCJjb2wtNSBxLXBsLW1kXCI+XG4gICAgICA8ZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNlwiPnt7IGZsaXBwZXIubmFtZSB9fTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1jYXB0aW9uIHRleHQtYmx1ZS0xNFwiPlJlY292ZXJ5IG1vZGU8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgPHEtaXRlbS1zZWN0aW9uIHYtaWY9XCIkc2xvdHMuZGVmYXVsdFwiIGNsYXNzPVwiY29sLTJcIj5cbiAgICAgIDxzbG90IG5hbWU9XCJkZWZhdWx0XCIgdi1iaW5kPVwieyBmbGlwcGVyIH1cIiAvPlxuICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gIDwvcS1pdGVtPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCB7IEZsaXBwZXJNb2RlbCB9IGZyb20gJ2VudGl0eS9GbGlwcGVyJ1xuXG5pbnRlcmZhY2UgUHJvcHMge1xuICBmbGlwcGVyOiBGbGlwcGVyTW9kZWwuRGF0YURmdUZsaXBwZXJFbGVjdHJvblxufVxuXG5kZWZpbmVQcm9wczxQcm9wcz4oKVxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gIDxxLWRpYWxvZz5cbiAgICA8cS1jYXJkIGNsYXNzPVwiZGlhbG9nXCI+XG4gICAgICA8cS1idG5cbiAgICAgICAgaWNvbj1cImNsb3NlXCJcbiAgICAgICAgZmxhdFxuICAgICAgICByb3VuZFxuICAgICAgICBkZW5zZVxuICAgICAgICB2LWNsb3NlLXBvcHVwXG4gICAgICAgIGNsYXNzPVwiZGlhbG9nLWNsb3NlLWJ0blwiXG4gICAgICAvPlxuXG4gICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJxLXBhLW5vbmUgcS1tYS1tZFwiIGFsaWduPVwiY2VudGVyXCI+XG4gICAgICAgIDxxLWljb24gbmFtZT1cIm1kaS1hbGVydC1jaXJjbGVcIiBjb2xvcj1cInByaW1hcnlcIiBzaXplPVwiNjRweFwiIC8+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2IHEtbXktc21cIj5GbGlwcGVyIG5vdCBjb25uZWN0ZWQ8L2Rpdj5cbiAgICAgICAgPHNsb3QgbmFtZT1cImRlc2NyaXB0aW9uXCIgLz5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInEtcHQtbm9uZVwiIGFsaWduPVwiY2VudGVyXCI+XG4gICAgICAgIDxzbG90IC8+XG4gICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgIDwvcS1jYXJkPlxuICA8L3EtZGlhbG9nPlxuPC90ZW1wbGF0ZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtZGlhbG9nPlxuICAgIDxxLWNhcmQgY2xhc3M9XCJkaWFsb2dcIj5cbiAgICAgIDxxLWJ0blxuICAgICAgICBpY29uPVwiY2xvc2VcIlxuICAgICAgICBmbGF0XG4gICAgICAgIHJvdW5kXG4gICAgICAgIGRlbnNlXG4gICAgICAgIHYtY2xvc2UtcG9wdXBcbiAgICAgICAgY2xhc3M9XCJkaWFsb2ctY2xvc2UtYnRuXCJcbiAgICAgIC8+XG5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInEtcGEtbm9uZSBxLW1hLW1kXCIgYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgPHEtaWNvbiBuYW1lPVwibWRpLWFsZXJ0LWNpcmNsZVwiIGNvbG9yPVwicHJpbWFyeVwiIHNpemU9XCI2NHB4XCIgLz5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDYgcS1teS1zbVwiPkFwcHMgZG9uJ3Qgd29yayBpbiBtb2JpbGUgYnJvd3NlcnM8L2Rpdj5cbiAgICAgICAgPHA+XG4gICAgICAgICAgTW9iaWxlIGJyb3dzZXJzIGNhbid0IGNvbm5lY3QgdG8gRmxpcHBlciwgbWVhbmluZyB5b3Ugd29uJ3QgYmUgYWJsZSB0b1xuICAgICAgICAgIGluc3RhbGwgYXBwcy5cbiAgICAgICAgPC9wPlxuICAgICAgICA8cD5HZXQgdGhlIG9mZmljaWFsIG1vYmlsZSBhcHAg4oCTIGl0IGhhcyB0aGUgc2FtZSBmZWF0dXJlcyE8L3A+XG4gICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuXG4gICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJxLXB0LW5vbmVcIiBhbGlnbj1cImNlbnRlclwiPlxuICAgICAgICA8cS1idG5cbiAgICAgICAgICBvdXRsaW5lXG4gICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgICBsYWJlbD1cIkRvd25sb2FkIGFwcFwiXG4gICAgICAgICAgaHJlZj1cImh0dHBzOi8vZmxwci5hcHBcIlxuICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiXG4gICAgICAgID48L3EtYnRuPlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICA8L3EtY2FyZD5cbiAgPC9xLWRpYWxvZz5cbjwvdGVtcGxhdGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxxLWRpYWxvZz5cbiAgICA8cS1jYXJkIGNsYXNzPVwiZGlhbG9nXCI+XG4gICAgICA8cS1idG5cbiAgICAgICAgaWNvbj1cImNsb3NlXCJcbiAgICAgICAgZmxhdFxuICAgICAgICByb3VuZFxuICAgICAgICBkZW5zZVxuICAgICAgICB2LWNsb3NlLXBvcHVwXG4gICAgICAgIGNsYXNzPVwiZGlhbG9nLWNsb3NlLWJ0blwiXG4gICAgICAvPlxuXG4gICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJxLXBhLW5vbmUgcS1tYS1tZFwiIGFsaWduPVwiY2VudGVyXCI+XG4gICAgICAgIDxxLWljb24gbmFtZT1cIm1kaS1hbGVydC1jaXJjbGVcIiBjb2xvcj1cInByaW1hcnlcIiBzaXplPVwiNjRweFwiIC8+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2IHEtbXktc21cIj5VbnN1cHBvcnRlZCBicm93c2VyPC9kaXY+XG4gICAgICAgIDxwPlxuICAgICAgICAgIFlvdXIgYnJvd3NlciBkb2Vzbid0IHN1cHBvcnQgV2ViU2VyaWFsIEFQSS4gRm9yIGJldHRlciBleHBlcmllbmNlIHdlXG4gICAgICAgICAgcmVjb21tZW5kIHVzaW5nIENocm9tZSBmb3IgZGVza3RvcC48YnIgLz5cbiAgICAgICAgPC9wPlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInEtcHQtbm9uZVwiIGFsaWduPVwiY2VudGVyXCI+XG4gICAgICAgIDxxLWJ0blxuICAgICAgICAgIG91dGxpbmVcbiAgICAgICAgICBjb2xvcj1cInByaW1hcnlcIlxuICAgICAgICAgIGxhYmVsPVwiRnVsbCBsaXN0IG9mIHN1cHBvcnRlZCBicm93c2Vyc1wiXG4gICAgICAgICAgaHJlZj1cImh0dHBzOi8vY2FuaXVzZS5jb20vd2ViLXNlcmlhbFwiXG4gICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgPjwvcS1idG4+XG4gICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgIDwvcS1jYXJkPlxuICA8L3EtZGlhbG9nPlxuPC90ZW1wbGF0ZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtZGlhbG9nPlxuICAgIDxxLWNhcmQgY2xhc3M9XCJkaWFsb2dcIj5cbiAgICAgIDxxLWJ0blxuICAgICAgICBpY29uPVwiY2xvc2VcIlxuICAgICAgICBmbGF0XG4gICAgICAgIHJvdW5kXG4gICAgICAgIGRlbnNlXG4gICAgICAgIHYtY2xvc2UtcG9wdXBcbiAgICAgICAgY2xhc3M9XCJkaWFsb2ctY2xvc2UtYnRuXCJcbiAgICAgIC8+XG5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInEtcGEtbm9uZSBxLW1hLW1kXCIgYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDYgcS1teS1zbVwiPlxuICAgICAgICAgIHt7IHNlbGVjdGVkRG93bmxvYWRQYXRoID8gJ1VwZGF0ZSAnIDogJ1NlbGVjdCAnIH19ZG93bmxvYWQgcGF0aFxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPHAgdi1pZj1cInNlbGVjdGVkRG93bmxvYWRQYXRoXCI+XG4gICAgICAgICAgTm93IHNhdmluZyB0b1xuICAgICAgICAgIDxjb2RlIGNsYXNzPVwidGV4dC1jYXB0aW9uXCI+e3sgc2VsZWN0ZWREb3dubG9hZFBhdGggfX08L2NvZGU+XG4gICAgICAgIDwvcD5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJxLXB0LW5vbmVcIiBhbGlnbj1cImNlbnRlclwiPlxuICAgICAgICA8cS1idG5cbiAgICAgICAgICBvdXRsaW5lXG4gICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgICBsYWJlbD1cIlNlbGVjdCBkaXJlY3RvcnlcIlxuICAgICAgICAgIEBjbGljaz1cInNlbGVjdERvd25sb2FkUGF0aFwiXG4gICAgICAgID48L3EtYnRuPlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICA8L3EtY2FyZD5cbiAgPC9xLWRpYWxvZz5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgeyByZWYsIG9uTW91bnRlZCB9IGZyb20gJ3Z1ZSdcbmltcG9ydCB7IEZsaXBwZXJNb2RlbCB9IGZyb20gJ2VudGl0eS9GbGlwcGVyJ1xuaW1wb3J0IHsgc2hvd05vdGlmIH0gZnJvbSAnc2hhcmVkL2xpYi91dGlscy91c2VTaG93Tm90aWYnXG5cbmNvbnN0IGZsaXBwZXJTdG9yZSA9IEZsaXBwZXJNb2RlbC51c2VGbGlwcGVyU3RvcmUoKVxuY29uc3Qgc2VsZWN0ZWREb3dubG9hZFBhdGggPSByZWYoJycpXG5cbmNvbnN0IHNlbGVjdERvd25sb2FkUGF0aCA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgcmVzID0gYXdhaXQgd2luZG93LmZzLnVwZGF0ZURvd25sb2FkUGF0aCgpXG4gIGNvbnNvbGUubG9nKHJlcylcbiAgaWYgKHJlcz8uc3RhdHVzID09PSAnZXJyb3InKSB7XG4gICAgc2hvd05vdGlmKHtcbiAgICAgIG1lc3NhZ2U6IHJlcy5tZXNzYWdlLFxuICAgICAgY29sb3I6ICduZWdhdGl2ZSdcbiAgICB9KVxuICB9XG5cbiAgaWYgKHJlcz8uc3RhdHVzID09PSAnb2snKSB7XG4gICAgc2hvd05vdGlmKHtcbiAgICAgIG1lc3NhZ2U6IGBEb3dubG9hZCBwYXRoIHNldCB0byAke3Jlcy5wYXRofWAsXG4gICAgICBjb2xvcjogJ3Bvc2l0aXZlJyxcbiAgICAgIHRpbWVvdXQ6IDUwMDBcbiAgICB9KVxuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2ZsaXBwZXJGaWxlRXhwbG9yZXJEb3dubG9hZFBhdGgnLCByZXMucGF0aCEpXG4gICAgc2VsZWN0ZWREb3dubG9hZFBhdGgudmFsdWUgPSByZXMucGF0aCFcbiAgfVxufVxuXG5jb25zdCBnZXREb3dubG9hZFBhdGggPSAoKSA9PiB7XG4gIGNvbnN0IGRvd25sb2FkUGF0aCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdmbGlwcGVyRmlsZUV4cGxvcmVyRG93bmxvYWRQYXRoJylcbiAgaWYgKGRvd25sb2FkUGF0aCkge1xuICAgIHNlbGVjdGVkRG93bmxvYWRQYXRoLnZhbHVlID0gZG93bmxvYWRQYXRoXG4gIH1cbn1cblxub25Nb3VudGVkKCgpID0+IHtcbiAgaWYgKGZsaXBwZXJTdG9yZS5pc0VsZWN0cm9uKSB7XG4gICAgZ2V0RG93bmxvYWRQYXRoKClcbiAgfVxufSlcbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICA8cS1kaWFsb2c+XG4gICAgPHEtY2FyZFxuICAgICAgY2xhc3M9XCJkaWFsb2dcIlxuICAgICAgc3R5bGU9XCJ3aWR0aDogMTAwJTsgbWF4LXdpZHRoOiBtaW4oY2FsYygxMDB2dyAtIDE2cHgpLCAxMDAwcHgpXCJcbiAgICA+XG4gICAgICA8cS1idG5cbiAgICAgICAgdi1pZj1cImZsaXBwZXJTdG9yZS5yZWNvdmVyeUVycm9yXCJcbiAgICAgICAgaWNvbj1cImNsb3NlXCJcbiAgICAgICAgZmxhdFxuICAgICAgICByb3VuZFxuICAgICAgICBkZW5zZVxuICAgICAgICB2LWNsb3NlLXBvcHVwXG4gICAgICAgIGNsYXNzPVwiZGlhbG9nLWNsb3NlLWJ0blwiXG4gICAgICAvPlxuICAgICAgPHEtY2FyZC1zZWN0aW9uIGNsYXNzPVwicm93IGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNlwiPlJlcGFpcjwvZGl2PlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInJvdyBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgPHRlbXBsYXRlIHYtaWY9XCJmbGlwcGVyU3RvcmUucmVjb3ZlcnlFcnJvclwiPlxuICAgICAgICAgIDxwIGNsYXNzPVwidGV4dC1ib2xkIHRleHQtbmVnYXRpdmVcIj5cbiAgICAgICAgICAgIHt7IGZsaXBwZXJTdG9yZS5yZWNvdmVyeVVwZGF0ZVN0YWdlIH19XG4gICAgICAgICAgPC9wPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJmdWxsLXdpZHRoIHEtbWItbWRcIj5cbiAgICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgICB1bmVsZXZhdGVkXG4gICAgICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgICAgICAgICAgIGxhYmVsPVwiUmV0cnlcIlxuICAgICAgICAgICAgICBAY2xpY2s9XCJmbGlwcGVyU3RvcmUucmV0cnlcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgPHRlbXBsYXRlIHYtZWxzZT5cbiAgICAgICAgICA8cD57eyBmbGlwcGVyU3RvcmUucmVjb3ZlcnlVcGRhdGVTdGFnZSB9fTwvcD5cbiAgICAgICAgICA8UHJvZ3Jlc3NCYXIgOnByb2dyZXNzPVwiZmxpcHBlclN0b3JlLnJlY292ZXJ5UHJvZ3Jlc3NcIiBpbnRlcnBvbGF0ZWQgLz5cbiAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgPHEtZXhwYW5zaW9uLWl0ZW1cbiAgICAgICAgICB2LW1vZGVsPVwic2hvd1JlY292ZXJ5TG9nXCJcbiAgICAgICAgICBjbGFzcz1cImZ1bGwtd2lkdGggcS1tdC1tZFwiXG4gICAgICAgICAgaWNvbj1cInN2Z3VzZTpjb21tb24taWNvbnMuc3ZnI2xvZ3NcIlxuICAgICAgICAgIGxhYmVsPVwiVmlldyBsb2dzXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzPVwiZnVsbC13aWR0aCBiZy1ncmV5LTEyIHEtcHgtc20gcS1weS14cyByb3VuZGVkLWJvcmRlcnNcIlxuICAgICAgICAgICAgc3R5bGU9XCJoZWlnaHQ6IDMwMHB4XCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8cS1zY3JvbGwtYXJlYSByZWY9XCJzY3JvbGxBcmVhUmVmXCIgY2xhc3M9XCJmaXQgdGV4dC1sZWZ0XCI+XG4gICAgICAgICAgICAgIDxjb2RlIHYtZm9yPVwibGluZSBpbiBmbGlwcGVyU3RvcmUucmVjb3ZlcnlMb2dzXCIgOmtleT1cImxpbmVcIj5cbiAgICAgICAgICAgICAgICB7eyBsaW5lIH19XG4gICAgICAgICAgICAgICAgPGJyIC8+XG4gICAgICAgICAgICAgIDwvY29kZT5cbiAgICAgICAgICAgIDwvcS1zY3JvbGwtYXJlYT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9xLWV4cGFuc2lvbi1pdGVtPlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICA8L3EtY2FyZD5cbiAgPC9xLWRpYWxvZz5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgeyBvbk1vdW50ZWQsIG9uVW5tb3VudGVkLCByZWYgfSBmcm9tICd2dWUnXG5pbXBvcnQgdHlwZSB7IFFTY3JvbGxBcmVhIH0gZnJvbSAncXVhc2FyJ1xuXG5pbXBvcnQgeyBQcm9ncmVzc0JhciB9IGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL1Byb2dyZXNzQmFyJ1xuaW1wb3J0IHsgZW1pdHRlciBhcyBicmlkZ2VFbWl0dGVyIH0gZnJvbSAnc2hhcmVkL2xpYi9mbGlwcGVySnMvYnJpZGdlQ29udHJvbGxlcidcbmltcG9ydCB0eXBlIHsgVW5zdWJzY3JpYmUgfSBmcm9tICduYW5vZXZlbnRzJ1xuXG5pbXBvcnQgeyBGbGlwcGVyTW9kZWwgfSBmcm9tICdlbnRpdHkvRmxpcHBlcidcbmNvbnN0IGZsaXBwZXJTdG9yZSA9IEZsaXBwZXJNb2RlbC51c2VGbGlwcGVyU3RvcmUoKVxuXG5jb25zdCBzaG93UmVjb3ZlcnlMb2cgPSByZWYoZmFsc2UpXG5cbmNvbnN0IHNjcm9sbEFyZWFSZWYgPSByZWY8UVNjcm9sbEFyZWE+KClcbmNvbnN0IHVuYmluZExvZ3MgPSByZWY8VW5zdWJzY3JpYmU+KClcbmNvbnN0IHVuYmluZFN0YXR1cyA9IHJlZjxVbnN1YnNjcmliZT4oKVxuXG5jb25zdCB1bmJpbmRpbmcgPSAoKSA9PiB7XG4gIGlmICh1bmJpbmRMb2dzLnZhbHVlKSB7XG4gICAgdW5iaW5kTG9ncy52YWx1ZSgpXG4gIH1cblxuICBpZiAodW5iaW5kU3RhdHVzLnZhbHVlKSB7XG4gICAgdW5iaW5kU3RhdHVzLnZhbHVlKClcbiAgfVxufVxuXG5vbk1vdW50ZWQoKCkgPT4ge1xuICB1bmJpbmRMb2dzLnZhbHVlID0gYnJpZGdlRW1pdHRlci5vbignbG9nJywgKHN0ZGVycikgPT4ge1xuICAgIGNvbnN0IGxvZ0xpbmVzID0gc3RkZXJyLmRhdGEuc3BsaXQoJ1xcbicpXG4gICAgbG9nTGluZXMucG9wKClcbiAgICBsb2dMaW5lcy5mb3JFYWNoKCgpID0+IHtcbiAgICAgIGlmIChzY3JvbGxBcmVhUmVmLnZhbHVlKSB7XG4gICAgICAgIHNjcm9sbEFyZWFSZWYudmFsdWUuc2V0U2Nyb2xsUGVyY2VudGFnZSgndmVydGljYWwnLCAxKVxuICAgICAgfVxuICAgIH0pXG4gIH0pXG5cbiAgdW5iaW5kU3RhdHVzLnZhbHVlID0gYnJpZGdlRW1pdHRlci5vbignc3RhdHVzJywgYXN5bmMgKHN0YXR1cykgPT4ge1xuICAgIGlmIChzdGF0dXMuZXJyb3IgfHwgc3RhdHVzLmZpbmlzaGVkKSB7XG4gICAgICB1bmJpbmRpbmcoKVxuICAgIH1cbiAgfSlcbn0pXG5cbm9uVW5tb3VudGVkKCgpID0+IHtcbiAgdW5iaW5kaW5nKClcbn0pXG48L3NjcmlwdD5cbiIsImV4cG9ydCBkZWZhdWx0IFwiX19WSVRFX0FTU0VUX19EN2ZEVFFCel9fXCIiLCI8dGVtcGxhdGU+XG4gIDxxLWRpYWxvZz5cbiAgICA8cS1jYXJkIGNsYXNzPVwiZGlhbG9nXCI+XG4gICAgICA8cS1idG5cbiAgICAgICAgaWNvbj1cImNsb3NlXCJcbiAgICAgICAgZmxhdFxuICAgICAgICByb3VuZFxuICAgICAgICBkZW5zZVxuICAgICAgICB2LWNsb3NlLXBvcHVwXG4gICAgICAgIGNsYXNzPVwiZGlhbG9nLWNsb3NlLWJ0blwiXG4gICAgICAvPlxuXG4gICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJxLXBhLW5vbmUgcS1tYS1tZFwiIGFsaWduPVwiY2VudGVyXCI+XG4gICAgICAgIDwhLS0gPHEtaWNvbiBuYW1lPVwibWRpLWFsZXJ0LWNpcmNsZVwiIGNvbG9yPVwicHJpbWFyeVwiIHNpemU9XCI2NHB4XCIgLz4gLS0+XG4gICAgICAgIDxpbWcgc3JjPVwifmFzc2V0cy9mbGlwcGVyLWJ1c3kuc3ZnXCIgY2xhc3M9XCJxLW1sLXhzXCIgLz5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDYgcS1teS1zbVwiPkZsaXBwZXIgaXMgQnVzeTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1ib2R5IHEtbXktc21cIj5cbiAgICAgICAgICBFeGl0IHRoZSBjdXJyZW50IGFwcCBvbiBGbGlwcGVyIHRvIHVzZSB0aGlzIGZlYXR1cmVcbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuXG4gICAgICA8cS1jYXJkLWFjdGlvbnMgYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgPHNsb3QgLz5cbiAgICAgIDwvcS1jYXJkLWFjdGlvbnM+XG4gICAgPC9xLWNhcmQ+XG4gIDwvcS1kaWFsb2c+XG48L3RlbXBsYXRlPlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2XG4gICAgcmVmPVwiYnV0dG9uXCJcbiAgICBjbGFzcz1cImNvbnRyb2wgY3Vyc29yLXBvaW50ZXJcIlxuICAgIEBtb3VzZWRvd249XCJoYW5kbGVQcmVzc1N0YXJ0XCJcbiAgICBAbW91c2V1cD1cImhhbmRsZVByZXNzRW5kXCJcbiAgICBAbW91c2VsZWF2ZT1cImhhbmRsZUxlYXZlTW91c2VcIlxuICA+XG4gICAgPHEtaWNvblxuICAgICAgY2xhc3M9XCJjb250cm9sLS1kZWZhdWx0XCJcbiAgICAgIDpuYW1lPVwiaWNvblwiXG4gICAgICA6c2l6ZT1cInNpemVcIlxuICAgICAgY29sb3I9XCJ0cmFuc3BhcmVudFwiXG4gICAgLz5cbiAgICA8cS1pY29uXG4gICAgICBjbGFzcz1cImNvbnRyb2wtLWhvdmVyXCJcbiAgICAgIDpuYW1lPVwiaWNvbkhvdmVyIHx8IGljb25cIlxuICAgICAgOnNpemU9XCJzaXplXCJcbiAgICAgIGNvbG9yPVwidHJhbnNwYXJlbnRcIlxuICAgIC8+XG4gICAgPHEtaWNvblxuICAgICAgY2xhc3M9XCJjb250cm9sLS1hY3RpdmVcIlxuICAgICAgOm5hbWU9XCJpY29uQWN0aXZlIHx8IGljb25cIlxuICAgICAgOnNpemU9XCJzaXplXCJcbiAgICAgIGNvbG9yPVwidHJhbnNwYXJlbnRcIlxuICAgIC8+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCB7IG9uVW5tb3VudGVkLCByZWYgfSBmcm9tICd2dWUnXG5cbnR5cGUgUHJvcHMgPSB7XG4gIGljb246IHN0cmluZ1xuICBpY29uSG92ZXI6IHN0cmluZ1xuICBpY29uQWN0aXZlOiBzdHJpbmdcbiAgc2l6ZTogc3RyaW5nXG4gIGtleXM6IHN0cmluZ1tdXG59XG5cbmNvbnN0IHByb3BzID0gZGVmaW5lUHJvcHM8UHJvcHM+KClcbmNvbnN0IGVtaXQgPSBkZWZpbmVFbWl0cyhbJ29uU2hvcnRQcmVzcycsICdvbkxvbmdQcmVzcycsICdvblJlcGVhdCddKVxuXG5jb25zdCBidXR0b24gPSByZWY8SFRNTEVsZW1lbnQ+KClcblxuY29uc3QgaXNQcmVzc2VkID0gcmVmKGZhbHNlKVxuY29uc3QgaXNMb25nUHJlc3MgPSByZWYoZmFsc2UpXG5jb25zdCB0aW1lcnMgPSByZWY8UmV0dXJuVHlwZTx0eXBlb2Ygc2V0VGltZW91dD4+KClcbmNvbnN0IHJlcGVhdEludGVydmFsID0gcmVmPFJldHVyblR5cGU8dHlwZW9mIHNldFRpbWVvdXQ+PigpXG5cbmNvbnN0IGhhbmRsZVByZXNzU3RhcnQgPSAoKSA9PiB7XG4gIGlzUHJlc3NlZC52YWx1ZSA9IHRydWVcbiAgaXNMb25nUHJlc3MudmFsdWUgPSBmYWxzZVxuXG4gIHRpbWVycy52YWx1ZSA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGlzTG9uZ1ByZXNzLnZhbHVlID0gdHJ1ZVxuICAgIGVtaXQoJ29uTG9uZ1ByZXNzJylcbiAgfSwgMzAwKVxuXG4gIHJlcGVhdEludGVydmFsLnZhbHVlID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgIGlmIChpc0xvbmdQcmVzcy52YWx1ZSkge1xuICAgICAgZW1pdCgnb25SZXBlYXQnKVxuICAgIH1cbiAgfSwgMTUwKVxufVxuXG5jb25zdCBoYW5kbGVQcmVzc0VuZCA9ICgpID0+IHtcbiAgaXNQcmVzc2VkLnZhbHVlID0gZmFsc2VcbiAgaXNMb25nUHJlc3MudmFsdWUgPSBmYWxzZVxuXG4gIGNsZWFyVGltZW91dCh0aW1lcnMudmFsdWUpXG4gIGNsZWFySW50ZXJ2YWwocmVwZWF0SW50ZXJ2YWwudmFsdWUpXG5cbiAgaWYgKCFpc0xvbmdQcmVzcy52YWx1ZSkge1xuICAgIGVtaXQoJ29uU2hvcnRQcmVzcycpXG4gIH1cbn1cblxuY29uc3QgaGFuZGxlTGVhdmVNb3VzZSA9ICgpID0+IHtcbiAgaWYgKGlzUHJlc3NlZC52YWx1ZSkge1xuICAgIGhhbmRsZVByZXNzRW5kKClcbiAgfVxufVxuXG5jb25zdCBoYW5kbGVLZXlkb3duID0gKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gIHByb3BzLmtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgaWYgKGV2ZW50LmNvZGUgPT09IGtleSkge1xuICAgICAgaWYgKCF0aW1lcnMudmFsdWUpIHtcbiAgICAgICAgaGFuZGxlUHJlc3NTdGFydCgpXG5cbiAgICAgICAgYnV0dG9uLnZhbHVlPy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuICAgICAgfVxuICAgIH1cbiAgfSlcbn1cblxuY29uc3QgaGFuZGxlS2V5dXAgPSAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgcHJvcHMua2V5cy5mb3JFYWNoKChrZXkpID0+IHtcbiAgICBpZiAoZXZlbnQuY29kZSA9PT0ga2V5KSB7XG4gICAgICBoYW5kbGVQcmVzc0VuZCgpXG5cbiAgICAgIHRpbWVycy52YWx1ZSA9IHVuZGVmaW5lZFxuXG4gICAgICBidXR0b24udmFsdWU/LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG4gICAgfVxuICB9KVxufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlS2V5ZG93bilcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgaGFuZGxlS2V5dXApXG5cbm9uVW5tb3VudGVkKCgpID0+IHtcbiAgY2xlYXJUaW1lb3V0KHRpbWVycy52YWx1ZSlcbiAgY2xlYXJJbnRlcnZhbChyZXBlYXRJbnRlcnZhbC52YWx1ZSlcblxuICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlS2V5ZG93bilcbiAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBoYW5kbGVLZXl1cClcbn0pXG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCIgc2NvcGVkPlxuQGltcG9ydCAnc3R5bGVzJztcbjwvc3R5bGU+XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRDc3NWYXIgKHByb3BOYW1lLCBlbGVtZW50ID0gZG9jdW1lbnQuYm9keSkge1xuICBpZiAodHlwZW9mIHByb3BOYW1lICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGEgc3RyaW5nIGFzIHByb3BOYW1lJylcbiAgfVxuICBpZiAoIShlbGVtZW50IGluc3RhbmNlb2YgRWxlbWVudCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBhIERPTSBlbGVtZW50JylcbiAgfVxuXG4gIHJldHVybiBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoYC0tcS0keyBwcm9wTmFtZSB9YCkudHJpbSgpIHx8IG51bGxcbn1cbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtaXRlbVxuICAgIDpkaXNhYmxlPVwiXG4gICAgICBmbGlwcGVyU3RvcmUuZmxhZ3MuZGlzYWJsZUJ1dHRvbk11bHRpZmxpcHBlciB8fFxuICAgICAgZmxpcHBlclN0b3JlLmZsYWdzLmRpc2FibGVOYXZpZ2F0aW9uXG4gICAgXCJcbiAgICBjbGlja2FibGVcbiAgICBAY2xpY2s9XCJvblN3aXRjaEZsaXBwZXJcIlxuICA+XG4gICAgPHEtaXRlbS1zZWN0aW9uIGF2YXRhciBjbGFzcz1cIml0ZW1zLWNlbnRlclwiPlxuICAgICAgPHEtYXZhdGFyIHNpemU9XCJtZFwiIHNxdWFyZT5cbiAgICAgICAgPHEtaWNvbiBuYW1lPVwiZmxpcHBlcjpzd2l0Y2hcIiBzaXplPVwiMzJweFwiIC8+XG4gICAgICAgIDxxLWJhZGdlXG4gICAgICAgICAgdi1pZj1cImNvdW50RmxpcHBlcnMgPiAxXCJcbiAgICAgICAgICBjb2xvcj1cInByaW1hcnlcIlxuICAgICAgICAgIGZsb2F0aW5nXG4gICAgICAgICAgc3R5bGU9XCJ0b3A6IDBweDsgcmlnaHQ6IC00cHg7IGZvbnQtc2l6ZTogOXB4OyBwYWRkaW5nOiAxcHggNC41cHhcIlxuICAgICAgICAgIDpsYWJlbD1cImNvdW50RmxpcHBlcnNcIlxuICAgICAgICAvPlxuICAgICAgPC9xLWF2YXRhcj5cbiAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgIDxxLWl0ZW0tc2VjdGlvbj5cbiAgICAgIDxxLWl0ZW0tbGFiZWw+TXkgRmxpcHBlcnM8L3EtaXRlbS1sYWJlbD5cbiAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICA8L3EtaXRlbT5cblxuICA8cS1kaWFsb2cgdi1tb2RlbD1cImZsaXBwZXJTdG9yZS5kaWFsb2dzLm11bHRpZmxpcHBlclwiPlxuICAgIDxxLWNhcmQgY2xhc3M9XCJyb3VuZGVkLWJvcmRlcnNcIj5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInJvdyBpdGVtcy1jZW50ZXJcIiBzdHlsZT1cIm1pbi13aWR0aDogMzUwcHhcIj5cbiAgICAgICAgPHEtbGlzdCBjbGFzcz1cInEtZ3V0dGVyLXktbWQgZnVsbC13aWR0aFwiPlxuICAgICAgICAgIDx0ZW1wbGF0ZVxuICAgICAgICAgICAgdi1mb3I9XCJmbGlwcGVyIGluIGZsaXBwZXJTdG9yZS5hdmFpbGFibGVGbGlwcGVyc1wiXG4gICAgICAgICAgICA6a2V5PVwiZmxpcHBlci5pbmZvLmhhcmR3YXJlLm5hbWVcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxxLWl0ZW1cbiAgICAgICAgICAgICAgY2xhc3M9XCJyb3cgcm91bmRlZC1ib3JkZXJzXCJcbiAgICAgICAgICAgICAgOnN0eWxlPVwiYCR7XG4gICAgICAgICAgICAgICAgZmxpcHBlclN0b3JlLmZsaXBwZXJOYW1lID09PSBmbGlwcGVyLm5hbWVcbiAgICAgICAgICAgICAgICAgID8gJ2JvcmRlcjogMnB4IHNvbGlkICcgKyBnZXRDc3NWYXIoJ3ByaW1hcnknKVxuICAgICAgICAgICAgICAgICAgOiAnJ1xuICAgICAgICAgICAgICB9YFwiXG4gICAgICAgICAgICAgIDphY3RpdmU9XCJmbGlwcGVyU3RvcmUuZmxpcHBlck5hbWUgPT09IGZsaXBwZXIubmFtZVwiXG4gICAgICAgICAgICAgIDpjbGlja2FibGU9XCJmbGlwcGVyU3RvcmUuZmxpcHBlck5hbWUgIT09IGZsaXBwZXIubmFtZVwiXG4gICAgICAgICAgICAgIEBjbGljaz1cImNvbm5lY3RGbGlwcGVyKGZsaXBwZXIpXCJcbiAgICAgICAgICAgICAgdi1jbG9zZS1wb3B1cFxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gY2xhc3M9XCJjb2wtNVwiPlxuICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgIHYtaWY9XCJmbGlwcGVyLmluZm8/LmhhcmR3YXJlLmNvbG9yID09PSAnMSdcIlxuICAgICAgICAgICAgICAgICAgc3JjPVwifmFzc2V0cy9mbGlwcGVyX2JsYWNrLnN2Z1wiXG4gICAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAxMDAlXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgIHYtZWxzZS1pZj1cImZsaXBwZXIuaW5mbz8uaGFyZHdhcmUuY29sb3IgPT09ICczJ1wiXG4gICAgICAgICAgICAgICAgICBzcmM9XCJ+YXNzZXRzL2ZsaXBwZXJfdHJhbnNwYXJlbnQuc3ZnXCJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDEwMCVcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgdi1lbHNlXG4gICAgICAgICAgICAgICAgICBzcmM9XCJ+YXNzZXRzL2ZsaXBwZXJfd2hpdGUuc3ZnXCJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDEwMCVcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBjbGFzcz1cImNvbC01IHEtcGwtbWRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDZcIj5cbiAgICAgICAgICAgICAgICAgICAge3sgZmxpcHBlci5pbmZvPy5oYXJkd2FyZS5uYW1lIH19XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWNhcHRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgRmlybXdhcmVcbiAgICAgICAgICAgICAgICAgICAge3sgZmlybXdhcmVWZXJzaW9uKGZsaXBwZXIpIH19XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGNsYXNzPVwiY29sLTJcIj5cbiAgICAgICAgICAgICAgICA8IS0tIHYtaWY9XCJcbiAgICAgICAgICAgICAgICAgICAgZmxpcHBlclN0b3JlLmluZm8/LmhhcmR3YXJlPy51aWQgPT09XG4gICAgICAgICAgICAgICAgICAgIGZsaXBwZXIuaW5mbz8uaGFyZHdhcmUudWlkXG4gICAgICAgICAgICAgICAgICBcIiAtLT5cbiAgICAgICAgICAgICAgICA8cS1pY29uXG4gICAgICAgICAgICAgICAgICB2LWlmPVwiZmxpcHBlclN0b3JlLmZsaXBwZXJOYW1lID09PSBmbGlwcGVyLm5hbWVcIlxuICAgICAgICAgICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgICAgICAgIG5hbWU9XCJtZGktY2hlY2stY2lyY2xlLW91dGxpbmVcIlxuICAgICAgICAgICAgICAgICAgc2l6ZT1cIm1kXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgPC90ZW1wbGF0ZT5cblxuICAgICAgICAgIDx0ZW1wbGF0ZVxuICAgICAgICAgICAgdi1mb3I9XCJmbGlwcGVyIGluIGZsaXBwZXJTdG9yZS5hdmFpbGFibGVEZnVGbGlwcGVyc1wiXG4gICAgICAgICAgICA6a2V5PVwiZmxpcHBlci5uYW1lXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8RmxpcHBlckRmdUl0ZW0gOmZsaXBwZXI+XG4gICAgICAgICAgICAgIDx0ZW1wbGF0ZSAjZGVmYXVsdD1cInsgZmxpcHBlciB9XCI+XG4gICAgICAgICAgICAgICAgPHEtYnRuXG4gICAgICAgICAgICAgICAgICB1bmVsZXZhdGVkXG4gICAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgICAgICAgIGxhYmVsPVwiUmVwYWlyXCJcbiAgICAgICAgICAgICAgICAgIEBjbGljaz1cImZsaXBwZXJTdG9yZS5yZWNvdmVyeShmbGlwcGVyLmluZm8pXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgPC9GbGlwcGVyRGZ1SXRlbT5cbiAgICAgICAgICA8L3RlbXBsYXRlPlxuXG4gICAgICAgICAgPHEtaXRlbVxuICAgICAgICAgICAgdi1pZj1cIlxuICAgICAgICAgICAgICAhZmxpcHBlclN0b3JlLmF2YWlsYWJsZUZsaXBwZXJzPy5sZW5ndGggJiZcbiAgICAgICAgICAgICAgIWZsaXBwZXJTdG9yZS5hdmFpbGFibGVEZnVGbGlwcGVycz8ubGVuZ3RoXG4gICAgICAgICAgICBcIlxuICAgICAgICAgICAgY2xhc3M9XCJyb3cgcm91bmRlZC1ib3JkZXJzXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gY2xhc3M9XCJjb2wtNVwiPlxuICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgc3JjPVwifmFzc2V0cy9mbGlwcGVyX3doaXRlLnN2Z1wiXG4gICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMTAwJTsgZmlsdGVyOiBvcGFjaXR5KDAuMylcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBjbGFzcz1cImNvbC03IHEtcGwtbWRcIj5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNlwiPldhaXRpbmcgZm9yIGNvbm5lY3Rpb24uLi48L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1jYXB0aW9uXCI+WW91ciBGbGlwcGVycyB3aWxsIGFwcGVhciBoZXJlPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICA8L3EtaXRlbT5cbiAgICAgICAgPC9xLWxpc3Q+XG4gICAgICAgIDwhLS0gPGRpdlxuICAgICAgICAgIHYtaWY9XCJmbGlwcGVyU3RvcmUuZmxhZ3MubG9hZGluZ011bHRpZmxpcHBlclwiXG4gICAgICAgICAgY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyIGZ1bGwtd2lkdGhcIlxuICAgICAgICA+XG4gICAgICAgICAgPExvYWRpbmdcbiAgICAgICAgICAgIGNsYXNzPVwiY29sXCJcbiAgICAgICAgICAgIGxhYmVsPVwiUmVhZGluZyBGbGlwcGVycy4uLlwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+IC0tPlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgIDwhLS0gPHEtY2FyZC1zZWN0aW9uIGFsaWduPVwiY2VudGVyXCI+XG4gICAgICAgIDxxLWJ0biB1bmVsZXZhdGVkIGNvbG9yPVwicHJpbWFyeVwiIGxhYmVsPVwiUmVwYWlyXCIgQGNsaWNrPVwicmVjb3ZlcnlcIi8+XG4gICAgICA8L3EtY2FyZC1zZWN0aW9uPiAtLT5cbiAgICA8L3EtY2FyZD5cbiAgPC9xLWRpYWxvZz5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgeyBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcbmltcG9ydCB7IGdldENzc1ZhciB9IGZyb20gJ3F1YXNhcidcblxuaW1wb3J0IHsgRmxpcHBlck1vZGVsLCBGbGlwcGVyRGZ1SXRlbSB9IGZyb20gJ2VudGl0eS9GbGlwcGVyJ1xuY29uc3QgZmxpcHBlclN0b3JlID0gRmxpcHBlck1vZGVsLnVzZUZsaXBwZXJTdG9yZSgpXG5cbmNvbnN0IG9uU3dpdGNoRmxpcHBlciA9IGFzeW5jICgpID0+IHtcbiAgZmxpcHBlclN0b3JlLmRpYWxvZ3MubXVsdGlmbGlwcGVyID0gdHJ1ZVxuICAvLyBhd2FpdCBtYWluU3RvcmUuc3RhcnQoKVxufVxuXG5jb25zdCBjb25uZWN0RmxpcHBlciA9IChmbGlwcGVyOiBGbGlwcGVyTW9kZWwuRGF0YUZsaXBwZXJFbGVjdHJvbikgPT4ge1xuICAvLyBmbGlwcGVyLnJlYWRpbmdNb2RlLnR5cGUgPSByb3V0ZS5uYW1lID09PSAnQ2xpJyA/ICdjbGknIDogJ3JwYydcbiAgLyogZWxzZSB7XG4gICAgZmxpcHBlci5tb2RlID0gcm91dGUubmFtZSA9PT0gJ0NsaScgPyAnY2xpJyA6ICdycGMnXG4gIH0gKi9cbiAgZmxpcHBlclN0b3JlLmNvbm5lY3RGbGlwcGVyKGZsaXBwZXIpXG59XG5cbmNvbnN0IGNvdW50RmxpcHBlcnMgPSBjb21wdXRlZChcbiAgKCkgPT5cbiAgICBmbGlwcGVyU3RvcmUuYXZhaWxhYmxlRmxpcHBlcnMubGVuZ3RoICtcbiAgICBmbGlwcGVyU3RvcmUuYXZhaWxhYmxlRGZ1RmxpcHBlcnMubGVuZ3RoXG4pXG5cbmNvbnN0IGZpcm13YXJlVmVyc2lvbiA9IChmbGlwcGVyOiBGbGlwcGVyTW9kZWwuRGF0YUZsaXBwZXJFbGVjdHJvbikgPT4ge1xuICBjb25zb2xlLmxvZyhmbGlwcGVyKVxuICBpZiAoZmxpcHBlci5pbmZvPy5maXJtd2FyZS5icmFuY2ggPT09ICdkZXYnKSB7XG4gICAgcmV0dXJuIGBEZXYgJHtmbGlwcGVyLmluZm8/LmZpcm13YXJlLmNvbW1pdH1gXG4gIH1cbiAgcmV0dXJuIGZsaXBwZXIuaW5mbz8uZmlybXdhcmUudmVyc2lvblxufVxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gIDxxLWNhcmQgY2xhc3M9XCJjYXJkXCIgOmZsYXQ9XCJmbGF0XCIgOmNsYXNzPVwieyBkaWFsb2c6IGlzRGlhbG9nIH1cIj5cbiAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyIHEtcGItbm9uZVwiPlxuICAgICAgPGg2IGNsYXNzPVwicS1tYS1ub25lXCI+TG9nczwvaDY+XG4gICAgICA8cS1zcGFjZSAvPlxuICAgICAgPHEtYnRuIGljb249XCJjbG9zZVwiIGZsYXQgcm91bmQgZGVuc2Ugdi1jbG9zZS1wb3B1cCAvPlxuICAgIDwvcS1jYXJkLXNlY3Rpb24+XG5cbiAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICA8ZGl2XG4gICAgICAgIHN0eWxlPVwiaGVpZ2h0OiAzMDBweDsgbWluLXdpZHRoOiAyODBweDsgd2lkdGg6IDEwMCVcIlxuICAgICAgICBjbGFzcz1cImJnLWdyZXktMTIgcS1wYS14cyByb3VuZGVkLWJvcmRlcnNcIlxuICAgICAgPlxuICAgICAgICA8cS1zY3JvbGwtYXJlYSByZWY9XCJzY3JvbGxBcmVhXCIgY2xhc3M9XCJmaXRcIj5cbiAgICAgICAgICA8Y29kZSB2LWlmPVwiIWhpc3RvcnkubGVuZ3RoXCI+TG9ncyB3aWxsIGFwcGVhciBoZXJlLi4uPC9jb2RlPlxuICAgICAgICAgIDxjb2RlIHYtZm9yPVwibGluZSBpbiBoaXN0b3J5XCIgOmtleT1cImxpbmUudGltZXN0YW1wXCI+XG4gICAgICAgICAgICB7e1xuICAgICAgICAgICAgICBgJHtsaW5lLnRpbWUucGFkRW5kKDgpfSBbJHtsaW5lLmxldmVsLnRvVXBwZXJDYXNlKCl9XSBbJHtcbiAgICAgICAgICAgICAgICBsaW5lLmNvbnRleHRcbiAgICAgICAgICAgICAgfV0gJHtsaW5lLm1lc3NhZ2V9YFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIDxiciAvPlxuICAgICAgICAgIDwvY29kZT5cbiAgICAgICAgPC9xLXNjcm9sbC1hcmVhPlxuICAgICAgPC9kaXY+XG4gICAgPC9xLWNhcmQtc2VjdGlvbj5cblxuICAgIDxxLWNhcmQtc2VjdGlvbiBhbGlnbj1cInJpZ2h0XCIgY2xhc3M9XCJxLXB0LW5vbmVcIj5cbiAgICAgIDxxLWJ0biBmbGF0IGxhYmVsPVwiRG93bmxvYWRcIiBAY2xpY2s9XCJkb3dubG9hZExvZ3NcIj48L3EtYnRuPlxuICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gIDwvcS1jYXJkPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCB7IG9uTW91bnRlZCwgcmVmLCB3YXRjaCB9IGZyb20gJ3Z1ZSdcbmltcG9ydCB7IGxvZ2dlciwgaGlzdG9yeSB9IGZyb20gJ3NoYXJlZC9saWIvdXRpbHMvdXNlTG9nJ1xuaW1wb3J0IHsgUVNjcm9sbEFyZWEgfSBmcm9tICdxdWFzYXInXG5cbnR5cGUgUHJvcHMgPSB7XG4gIGZsYXQ/OiBib29sZWFuXG4gIGlzRGlhbG9nPzogYm9vbGVhblxufVxuXG53aXRoRGVmYXVsdHMoZGVmaW5lUHJvcHM8UHJvcHM+KCksIHtcbiAgZmxhdDogZmFsc2UsXG4gIGlzRGlhbG9nOiBmYWxzZVxufSlcblxuY29uc3Qgc2Nyb2xsQXJlYSA9IHJlZjxRU2Nyb2xsQXJlYT4oKVxuXG5vbk1vdW50ZWQoKCkgPT4ge1xuICBpZiAoc2Nyb2xsQXJlYS52YWx1ZSkge1xuICAgIHNjcm9sbEFyZWEudmFsdWUuc2V0U2Nyb2xsUGVyY2VudGFnZSgndmVydGljYWwnLCAxKVxuICB9XG59KVxuXG53YXRjaChoaXN0b3J5LnZhbHVlLCAoKSA9PiB7XG4gIGlmIChzY3JvbGxBcmVhLnZhbHVlKSB7XG4gICAgc2Nyb2xsQXJlYS52YWx1ZS5zZXRTY3JvbGxQZXJjZW50YWdlKCd2ZXJ0aWNhbCcsIDEpXG4gIH1cbn0pXG5cbmxvZ2dlci5zZXRMZXZlbCgnaW5mbycsIHRydWUpXG5jb25zdCBvcmlnaW5hbEZhY3RvcnkgPSBsb2dnZXIubWV0aG9kRmFjdG9yeVxubG9nZ2VyLm1ldGhvZEZhY3RvcnkgPSBmdW5jdGlvbiAobWV0aG9kTmFtZSwgbG9nTGV2ZWwsIGxvZ2dlck5hbWUpIHtcbiAgY29uc3QgcmF3TWV0aG9kID0gb3JpZ2luYWxGYWN0b3J5KG1ldGhvZE5hbWUsIGxvZ0xldmVsLCBsb2dnZXJOYW1lKVxuXG4gIHJldHVybiBmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgIGlmIChtZXRob2ROYW1lICE9PSAnZGVidWcnKSB7XG4gICAgICByYXdNZXRob2QobWVzc2FnZSlcbiAgICB9XG4gIH1cbn1cbmxvZ2dlci5zZXRMZXZlbChsb2dnZXIuZ2V0TGV2ZWwoKSlcblxuY29uc3QgZG93bmxvYWRMb2dzID0gKCkgPT4ge1xuICBsZXQgdGV4dCA9ICcnXG4gIGZvciAoY29uc3QgbGluZSBvZiBoaXN0b3J5LnZhbHVlKSB7XG4gICAgdGV4dCArPSBgJHtsaW5lLnRpbWV9IFske2xpbmUubGV2ZWx9XSAke2xpbmUubWVzc2FnZX1cXG5gXG4gIH1cbiAgY29uc3QgZGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcbiAgZGwuc2V0QXR0cmlidXRlKCdkb3dubG9hZCcsICdsb2dzLnR4dCcpXG4gIGRsLnNldEF0dHJpYnV0ZSgnaHJlZicsICdkYXRhOnRleHQvcGxhaW4sJyArIHRleHQpXG4gIGRsLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJ1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZChkbClcbiAgZGwuY2xpY2soKVxuICBkbC5yZW1vdmUoKVxufVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiIHNjb3BlZD5cbi5jYXJkIHtcbiAgJi5kaWFsb2cge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1heC13aWR0aDogbWluKGNhbGMoMTAwdncgLSAxNnB4KSwgMTAwMHB4KTtcbiAgfVxufVxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtZGlhbG9nIGNsYXNzPVwiZXhwYW5kVmlld1wiIEBzaG93PVwic2hvd0RpYWxvZ1wiIEBoaWRlPVwiaGlkZURpYWxvZ1wiPlxuICAgIDxxLWNhcmRcbiAgICAgIHJlZj1cImV4cGFuZFZpZXdDYXJkXCJcbiAgICAgIGNsYXNzPVwiZXhwYW5kVmlld19fd3JhcHBlciBmdWxsLXdpZHRoIGNvbHVtbiByb3VuZGVkLWJvcmRlcnNcIlxuICAgICAgc3R5bGU9XCJtaW4td2lkdGg6IGZpdC1jb250ZW50XCJcbiAgICA+XG4gICAgICA8c3BhbiBjbGFzcz1cInNjYW5MaW5lIGFic29sdXRlIGZpdFwiIC8+XG4gICAgICA8Y2FudmFzXG4gICAgICAgIHJlZj1cImdyaWRCYWNrZ3JvdW5kXCJcbiAgICAgICAgY2xhc3M9XCJhYnNvbHV0ZS1jZW50ZXJcIlxuICAgICAgICBzdHlsZT1cIm9wYWNpdHk6IDAuMTVcIlxuICAgICAgLz5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInJvdyBjb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHEtcGEteGxcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBqdXN0aWZ5LWNlbnRlciBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzcz1cInJlbGF0aXZlLXBvc2l0aW9uIGJnLXByaW1hcnkgcS1wYS1zbSByb3VuZGVkLWJvcmRlcnMgcS1tci1sZ1wiXG4gICAgICAgICAgICBzdHlsZT1cImJvcmRlcjogM3B4IHNvbGlkICM5ZTU4MjNcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxjYW52YXNcbiAgICAgICAgICAgICAgOndpZHRoPVwiMTI4ICogc2NyZWVuU2NhbGVcIlxuICAgICAgICAgICAgICA6aGVpZ2h0PVwiNjQgKiBzY3JlZW5TY2FsZVwiXG4gICAgICAgICAgICAgIHN0eWxlPVwiaW1hZ2UtcmVuZGVyaW5nOiBwaXhlbGF0ZWRcIlxuICAgICAgICAgICAgICA6c3R5bGU9XCJgcm90YXRlOiAke1xuICAgICAgICAgICAgICAgIDkwICogcm90YXRpb25DYWxjdWxhdGlvblxuICAgICAgICAgICAgICB9ZGVnOyBzY2FsZTogJHtzY2FsZUNhbGN1bGF0aW9ufTtgXCJcbiAgICAgICAgICAgICAgcmVmPVwic2NyZWVuU3RyZWFtRXhwYW5kQ2FudmFzXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRyb2xzIGNvbHVtbiBpdGVtcy1lbmRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sc19fZHBhZCBkcGFkIHEtbWItbWRcIj5cbiAgICAgICAgICAgICAgPEZsaXBwZXJLZXlwYWRCdXR0b25cbiAgICAgICAgICAgICAgICBjbGFzcz1cImRwYWRfX3RvcFwiXG4gICAgICAgICAgICAgICAgaWNvbj1cImZsaXBwZXI6Y29udHJvbC10cmlhbmdsZVwiXG4gICAgICAgICAgICAgICAgaWNvbkhvdmVyPVwiZmxpcHBlcjpjb250cm9sLXRyaWFuZ2xlLWhvdmVyXCJcbiAgICAgICAgICAgICAgICBpY29uQWN0aXZlPVwiZmxpcHBlcjpjb250cm9sLXRyaWFuZ2xlLWRvd25cIlxuICAgICAgICAgICAgICAgIHNpemU9XCIzMnB4XCJcbiAgICAgICAgICAgICAgICBAb25Mb25nUHJlc3M9XCJcbiAgICAgICAgICAgICAgICAgIG9uSW5wdXRFdmVudCh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogJ1VQJyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ0xPTkcnXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgQG9uU2hvcnRQcmVzcz1cIlxuICAgICAgICAgICAgICAgICAgb25JbnB1dEV2ZW50KHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiAnVVAnLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnU0hPUlQnXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgQG9uUmVwZWF0PVwiXG4gICAgICAgICAgICAgICAgICBvbklucHV0RXZlbnQoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6ICdVUCcsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdSRVBFQVQnXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgOmtleXM9XCJbJ0Fycm93VXAnLCAnS2V5VyddXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPEZsaXBwZXJLZXlwYWRCdXR0b25cbiAgICAgICAgICAgICAgICBjbGFzcz1cImRwYWRfX3JpZ2h0XCJcbiAgICAgICAgICAgICAgICBpY29uPVwiZmxpcHBlcjpjb250cm9sLXRyaWFuZ2xlXCJcbiAgICAgICAgICAgICAgICBpY29uSG92ZXI9XCJmbGlwcGVyOmNvbnRyb2wtdHJpYW5nbGUtaG92ZXJcIlxuICAgICAgICAgICAgICAgIGljb25BY3RpdmU9XCJmbGlwcGVyOmNvbnRyb2wtdHJpYW5nbGUtZG93blwiXG4gICAgICAgICAgICAgICAgc2l6ZT1cIjMycHhcIlxuICAgICAgICAgICAgICAgIEBvbkxvbmdQcmVzcz1cIlxuICAgICAgICAgICAgICAgICAgb25JbnB1dEV2ZW50KHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiAnUklHSFQnLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnTE9ORydcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICBAb25TaG9ydFByZXNzPVwiXG4gICAgICAgICAgICAgICAgICBvbklucHV0RXZlbnQoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6ICdSSUdIVCcsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdTSE9SVCdcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICBAb25SZXBlYXQ9XCJcbiAgICAgICAgICAgICAgICAgIG9uSW5wdXRFdmVudCh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogJ1JJR0hUJyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ1JFUEVBVCdcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICA6a2V5cz1cIlsnQXJyb3dSaWdodCcsICdLZXlEJ11cIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8RmxpcHBlcktleXBhZEJ1dHRvblxuICAgICAgICAgICAgICAgIGNsYXNzPVwiZHBhZF9fYm90dG9tXCJcbiAgICAgICAgICAgICAgICBpY29uPVwiZmxpcHBlcjpjb250cm9sLXRyaWFuZ2xlXCJcbiAgICAgICAgICAgICAgICBpY29uSG92ZXI9XCJmbGlwcGVyOmNvbnRyb2wtdHJpYW5nbGUtaG92ZXJcIlxuICAgICAgICAgICAgICAgIGljb25BY3RpdmU9XCJmbGlwcGVyOmNvbnRyb2wtdHJpYW5nbGUtZG93blwiXG4gICAgICAgICAgICAgICAgc2l6ZT1cIjMycHhcIlxuICAgICAgICAgICAgICAgIEBvbkxvbmdQcmVzcz1cIlxuICAgICAgICAgICAgICAgICAgb25JbnB1dEV2ZW50KHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiAnRE9XTicsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdMT05HJ1xuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgIEBvblNob3J0UHJlc3M9XCJcbiAgICAgICAgICAgICAgICAgIG9uSW5wdXRFdmVudCh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogJ0RPV04nLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnU0hPUlQnXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgQG9uUmVwZWF0PVwiXG4gICAgICAgICAgICAgICAgICBvbklucHV0RXZlbnQoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6ICdET1dOJyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ1JFUEVBVCdcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICA6a2V5cz1cIlsnQXJyb3dEb3duJywgJ0tleVMnXVwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxGbGlwcGVyS2V5cGFkQnV0dG9uXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJkcGFkX19sZWZ0XCJcbiAgICAgICAgICAgICAgICBpY29uPVwiZmxpcHBlcjpjb250cm9sLXRyaWFuZ2xlXCJcbiAgICAgICAgICAgICAgICBpY29uSG92ZXI9XCJmbGlwcGVyOmNvbnRyb2wtdHJpYW5nbGUtaG92ZXJcIlxuICAgICAgICAgICAgICAgIGljb25BY3RpdmU9XCJmbGlwcGVyOmNvbnRyb2wtdHJpYW5nbGUtZG93blwiXG4gICAgICAgICAgICAgICAgc2l6ZT1cIjMycHhcIlxuICAgICAgICAgICAgICAgIEBvbkxvbmdQcmVzcz1cIlxuICAgICAgICAgICAgICAgICAgb25JbnB1dEV2ZW50KHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiAnTEVGVCcsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdMT05HJ1xuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgIEBvblNob3J0UHJlc3M9XCJcbiAgICAgICAgICAgICAgICAgIG9uSW5wdXRFdmVudCh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogJ0xFRlQnLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnU0hPUlQnXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgQG9uUmVwZWF0PVwiXG4gICAgICAgICAgICAgICAgICBvbklucHV0RXZlbnQoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6ICdMRUZUJyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ1JFUEVBVCdcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICA6a2V5cz1cIlsnQXJyb3dMZWZ0JywgJ0tleUEnXVwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxGbGlwcGVyS2V5cGFkQnV0dG9uXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJkcGFkX19jZW50ZXJcIlxuICAgICAgICAgICAgICAgIGljb249XCJmbGlwcGVyOmNvbnRyb2wtY2lyY2xlXCJcbiAgICAgICAgICAgICAgICBpY29uSG92ZXI9XCJmbGlwcGVyOmNvbnRyb2wtY2lyY2xlLWhvdmVyXCJcbiAgICAgICAgICAgICAgICBpY29uQWN0aXZlPVwiZmxpcHBlcjpjb250cm9sLWNpcmNsZS1kb3duXCJcbiAgICAgICAgICAgICAgICBzaXplPVwiNTJweFwiXG4gICAgICAgICAgICAgICAgQG9uTG9uZ1ByZXNzPVwiXG4gICAgICAgICAgICAgICAgICBvbklucHV0RXZlbnQoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6ICdPSycsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdMT05HJ1xuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgIEBvblNob3J0UHJlc3M9XCJcbiAgICAgICAgICAgICAgICAgIG9uSW5wdXRFdmVudCh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogJ09LJyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ1NIT1JUJ1xuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgIEBvblJlcGVhdD1cIlxuICAgICAgICAgICAgICAgICAgb25JbnB1dEV2ZW50KHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiAnT0snLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnUkVQRUFUJ1xuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgIDprZXlzPVwiWydTcGFjZScsICdFbnRlciddXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPEZsaXBwZXJLZXlwYWRCdXR0b25cbiAgICAgICAgICAgICAgaWNvbj1cImZsaXBwZXI6Y29udHJvbC1iYWNrXCJcbiAgICAgICAgICAgICAgaWNvbkhvdmVyPVwiZmxpcHBlcjpjb250cm9sLWJhY2staG92ZXJcIlxuICAgICAgICAgICAgICBpY29uQWN0aXZlPVwiZmxpcHBlcjpjb250cm9sLWJhY2stZG93blwiXG4gICAgICAgICAgICAgIHNpemU9XCI1MnB4XCJcbiAgICAgICAgICAgICAgQG9uTG9uZ1ByZXNzPVwiXG4gICAgICAgICAgICAgICAgb25JbnB1dEV2ZW50KHtcbiAgICAgICAgICAgICAgICAgIGtleTogJ0JBQ0snLFxuICAgICAgICAgICAgICAgICAgdHlwZTogJ0xPTkcnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgQG9uU2hvcnRQcmVzcz1cIlxuICAgICAgICAgICAgICAgIG9uSW5wdXRFdmVudCh7XG4gICAgICAgICAgICAgICAgICBrZXk6ICdCQUNLJyxcbiAgICAgICAgICAgICAgICAgIHR5cGU6ICdTSE9SVCdcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICBAb25SZXBlYXQ9XCJcbiAgICAgICAgICAgICAgICBvbklucHV0RXZlbnQoe1xuICAgICAgICAgICAgICAgICAga2V5OiAnQkFDSycsXG4gICAgICAgICAgICAgICAgICB0eXBlOiAnUkVQRUFUJ1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgIDprZXlzPVwiWydCYWNrc3BhY2UnXVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICA8cS1jYXJkLWFjdGlvbnMgY2xhc3M9XCJpdGVtcy1lbmQgcS1wYS1tZFwiIGFsaWduPVwiYmV0d2VlblwiPlxuICAgICAgICA8cS1idG5cbiAgICAgICAgICBvdXRsaW5lXG4gICAgICAgICAgbGFiZWw9XCJCYWNrXCJcbiAgICAgICAgICBpY29uPVwiZmxpcHBlcjpjaGV2cm9uLWxlZnRcIlxuICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgICAgICAgQGNsaWNrPVwiaGlkZURpYWxvZ1wiXG4gICAgICAgICAgdi1jbG9zZS1wb3B1cFxuICAgICAgICAvPlxuICAgICAgICA8cS1idG5cbiAgICAgICAgICBvdXRsaW5lXG4gICAgICAgICAgbGFiZWw9XCJTYXZlIHNjcmVlbnNob3RcIlxuICAgICAgICAgIGljb249XCJmbGlwcGVyOnNhdmUtc3ltYm9saWNcIlxuICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgICAgICAgQGNsaWNrPVwic2F2ZUltYWdlKClcIlxuICAgICAgICAvPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uIGl0ZW1zLWVuZFwiPlxuICAgICAgICAgIDxxLWJ0biBmbGF0IHBhZGRpbmc9XCJzbVwiIGljb249XCJmbGlwcGVyOmluZm8tYmlnXCIgY29sb3I9XCJwcmltYXJ5XCI+XG4gICAgICAgICAgICA8cS10b29sdGlwXG4gICAgICAgICAgICAgIGNsYXNzPVwiY29udHJvbEhlbHBcIlxuICAgICAgICAgICAgICBhbmNob3I9XCJib3R0b20gcmlnaHRcIlxuICAgICAgICAgICAgICBzZWxmPVwidG9wIHJpZ2h0XCJcbiAgICAgICAgICAgICAgOm9mZnNldD1cIlsxNiwgMjBdXCJcbiAgICAgICAgICAgICAgc3R5bGU9XCJib3JkZXI6IDFweCBzb2xpZCAjNjYyYzAwOyBiYWNrZ3JvdW5kOiAjMjEwZjAwXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHEtaWNvblxuICAgICAgICAgICAgICAgIG5hbWU9XCJmbGlwcGVyOnN0ZWFtaW5nLWhlbHAtbWFjXCJcbiAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAyMDdweDsgaGVpZ2h0OiAxMDJweFwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L3EtdG9vbHRpcD5cbiAgICAgICAgICA8L3EtYnRuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvcS1jYXJkLWFjdGlvbnM+XG4gICAgPC9xLWNhcmQ+XG4gIDwvcS1kaWFsb2c+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHsgcmVmLCBuZXh0VGljaywgY29tcHV0ZWQsIHdhdGNoIH0gZnJvbSAndnVlJ1xuaW1wb3J0IHsgZXhwb3J0RmlsZSB9IGZyb20gJ3F1YXNhcidcbmltcG9ydCB0eXBlIHsgUUNhcmQgfSBmcm9tICdxdWFzYXInXG5pbXBvcnQgeyBGbGlwcGVyS2V5cGFkQnV0dG9uIH0gZnJvbSAnZW50aXR5L0ZsaXBwZXInXG5pbXBvcnQgeyBGbGlwcGVyTW9kZWwgfSBmcm9tICdlbnRpdHkvRmxpcHBlcidcbmNvbnN0IGZsaXBwZXJTdG9yZSA9IEZsaXBwZXJNb2RlbC51c2VGbGlwcGVyU3RvcmUoKVxuXG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICdzaGFyZWQvbGliL3V0aWxzL3VzZUxvZydcbmltcG9ydCB7IHJwY0Vycm9ySGFuZGxlciB9IGZyb20gJ3NoYXJlZC9saWIvdXRpbHMvdXNlUnBjVXRpbHMnXG5pbXBvcnQgeyBzaG93Tm90aWYgfSBmcm9tICdzaGFyZWQvbGliL3V0aWxzL3VzZVNob3dOb3RpZidcblxuaW1wb3J0IHsgRmxpcHBlckZyYW1lUmVuZGVyZXIgfSBmcm9tICdzaGFyZWQvbGliL2ZsaXBwZXJKcydcblxuY29uc3QgY29tcG9uZW50TmFtZSA9ICdFeHBhbmRWaWV3J1xuXG5jb25zdCBvcmllbnRhdGlvbiA9IHJlZigwKVxuY29uc3Qgc2NyZWVuU2NhbGUgPSByZWYoNClcbmNvbnN0IHJvdGF0aW9uQ2FsY3VsYXRpb24gPSBjb21wdXRlZCgoKSA9PiB7XG4gIHN3aXRjaCAob3JpZW50YXRpb24udmFsdWUpIHtcbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4gMlxuXG4gICAgY2FzZSAyOlxuICAgICAgcmV0dXJuIDFcblxuICAgIGNhc2UgMzpcbiAgICAgIHJldHVybiAzXG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIDBcbiAgfVxufSlcblxuY29uc3Qgc2NhbGVDYWxjdWxhdGlvbiA9IGNvbXB1dGVkKCgpID0+IHtcbiAgc3dpdGNoIChvcmllbnRhdGlvbi52YWx1ZSkge1xuICAgIGNhc2UgMjpcbiAgICAgIHJldHVybiAwLjVcblxuICAgIGNhc2UgMzpcbiAgICAgIHJldHVybiAwLjVcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gMVxuICB9XG59KVxuXG5jb25zdCBvbklucHV0RXZlbnQgPSAoeyBrZXksIHR5cGUgfTogRmxpcHBlck1vZGVsLklucHV0RXZlbnQpID0+IHtcbiAgZmxpcHBlclN0b3JlLmZsaXBwZXJcbiAgICA/LlJQQygnZ3VpU2VuZElucHV0RXZlbnQnLCB7IGtleSwgdHlwZTogJ1BSRVNTJyB9KVxuICAgIC5jYXRjaCgoZXJyb3I6IEVycm9yKSA9PlxuICAgICAgcnBjRXJyb3JIYW5kbGVyKHsgY29tcG9uZW50TmFtZSwgZXJyb3IsIGNvbW1hbmQ6ICdndWlTZW5kSW5wdXRFdmVudCcgfSlcbiAgICApXG5cbiAgZmxpcHBlclN0b3JlLmZsaXBwZXJcbiAgICA/LlJQQygnZ3VpU2VuZElucHV0RXZlbnQnLCB7IGtleSwgdHlwZSB9KVxuICAgIC5jYXRjaCgoZXJyb3I6IEVycm9yKSA9PlxuICAgICAgcnBjRXJyb3JIYW5kbGVyKHsgY29tcG9uZW50TmFtZSwgZXJyb3IsIGNvbW1hbmQ6ICdndWlTZW5kSW5wdXRFdmVudCcgfSlcbiAgICApXG5cbiAgZmxpcHBlclN0b3JlLmZsaXBwZXJcbiAgICA/LlJQQygnZ3VpU2VuZElucHV0RXZlbnQnLCB7IGtleSwgdHlwZTogJ1JFTEVBU0UnIH0pXG4gICAgLmNhdGNoKChlcnJvcjogRXJyb3IpID0+XG4gICAgICBycGNFcnJvckhhbmRsZXIoeyBjb21wb25lbnROYW1lLCBlcnJvciwgY29tbWFuZDogJ2d1aVNlbmRJbnB1dEV2ZW50JyB9KVxuICAgIClcbn1cblxuY29uc3Qgc2NyZWVuU3RyZWFtRXhwYW5kQ2FudmFzID0gcmVmPEhUTUxDYW52YXNFbGVtZW50PigpXG5jb25zdCBmcmFtZVJlbmRlcmVyID0gcmVmPEZsaXBwZXJGcmFtZVJlbmRlcmVyPigpXG5kZWZpbmVFeHBvc2Uoe1xuICBzY3JlZW5TdHJlYW1FeHBhbmRDYW52YXNcbn0pXG5cbmNvbnN0IHNhdmVJbWFnZSA9IChpc0NsaXBib2FyZCA9IGZhbHNlKSA9PiB7XG4gIGlmIChzY3JlZW5TdHJlYW1FeHBhbmRDYW52YXMudmFsdWUpIHtcbiAgICBzY3JlZW5TdHJlYW1FeHBhbmRDYW52YXMudmFsdWUudG9CbG9iKFxuICAgICAgYXN5bmMgKGJsb2IpID0+IHtcbiAgICAgICAgaWYgKGJsb2IpIHtcbiAgICAgICAgICBpZiAoaXNDbGlwYm9hcmQpIHtcbiAgICAgICAgICAgIGNvbnN0IGNsaXBib2FyZEl0ZW0gPSBuZXcgQ2xpcGJvYXJkSXRlbSh7ICdpbWFnZS9wbmcnOiBibG9iIH0pXG4gICAgICAgICAgICBhd2FpdCBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlKFtjbGlwYm9hcmRJdGVtXSlcblxuICAgICAgICAgICAgc2hvd05vdGlmKHtcbiAgICAgICAgICAgICAgbWVzc2FnZTogJ0ZsaXBwZXIgc2NyZWVuIGNvcGllZCB0byBjbGlwYm9hcmQnLFxuICAgICAgICAgICAgICBjb2xvcjogJ2luZm8nLFxuICAgICAgICAgICAgICB0aW1lb3V0OiA1MDBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGV4cG9ydEZpbGUoYFNjcmVlbnNob3QtJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCl9LnBuZ2AsIGJsb2IpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgJ2ltYWdlL3BuZycsXG4gICAgICAxXG4gICAgKVxuICB9XG59XG5cbmNvbnN0IGV4cGFuZFZpZXdDYXJkID0gcmVmPFFDYXJkPigpXG5jb25zdCBncmlkQmFja2dyb3VuZCA9IHJlZjxIVE1MQ2FudmFzRWxlbWVudD4oKVxuY29uc3QgcmVzaXplQ2FudmFzID0gKCkgPT4ge1xuICBpZiAoZ3JpZEJhY2tncm91bmQudmFsdWUgJiYgZXhwYW5kVmlld0NhcmQudmFsdWUpIHtcbiAgICBjb25zdCBRQ2FyZERPTVJlY3QgPVxuICAgICAgZXhwYW5kVmlld0NhcmQudmFsdWUuJGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpIGFzIERPTVJlY3RcblxuICAgIGNvbnN0IHdpZHRoID0gKGdyaWRCYWNrZ3JvdW5kLnZhbHVlLndpZHRoID0gUUNhcmRET01SZWN0LndpZHRoKVxuICAgIGNvbnN0IGhlaWdodCA9IChncmlkQmFja2dyb3VuZC52YWx1ZS5oZWlnaHQgPSBRQ2FyZERPTVJlY3QuaGVpZ2h0KVxuXG4gICAgLy8gY29uc3QgbnVtQ2VsbHMgPSA0MFxuICAgIC8vIGNvbnN0IGNlbGxTaXplID0gd2lkdGggLyBudW1DZWxsc1xuICAgIGNvbnN0IGNlbGxTaXplID0gMzVcblxuICAgIGNvbnN0IGN0eCA9IGdyaWRCYWNrZ3JvdW5kLnZhbHVlLmdldENvbnRleHQoJzJkJylcblxuICAgIGlmIChjdHgpIHtcbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICcjYWE1MTE1J1xuICAgICAgY3R4LmxpbmVXaWR0aCA9IDJcblxuICAgICAgZm9yIChsZXQgeVBvcyA9IGNlbGxTaXplOyB5UG9zIDwgaGVpZ2h0OyB5UG9zICs9IGNlbGxTaXplKSB7XG4gICAgICAgIGNvbnN0IHBvcyA9IE1hdGguZmxvb3IoeVBvcylcbiAgICAgICAgY3R4Lm1vdmVUbygwLCBwb3MpXG4gICAgICAgIGN0eC5saW5lVG8od2lkdGgsIHBvcylcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgeFBvcyA9IGNlbGxTaXplOyB4UG9zIDwgd2lkdGg7IHhQb3MgKz0gY2VsbFNpemUpIHtcbiAgICAgICAgY29uc3QgcG9zID0gTWF0aC5mbG9vcih4UG9zKVxuICAgICAgICBjdHgubW92ZVRvKHBvcywgMClcbiAgICAgICAgY3R4LmxpbmVUbyhwb3MsIGhlaWdodClcbiAgICAgIH1cblxuICAgICAgY3R4LnN0cm9rZSgpXG4gICAgfVxuICB9XG59XG5cbmNvbnN0IGNvcHlUb0NsaXBib2FyZCA9IChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICBpZiAoZXZlbnQubWV0YUtleSAmJiBldmVudC5jb2RlID09PSAnS2V5QycpIHtcbiAgICBzYXZlSW1hZ2UodHJ1ZSlcbiAgfVxufVxuXG5jb25zdCB1bmJpbmRGcmFtZSA9IHJlZigpXG5jb25zdCBzdGFydFNjcmVlblN0cmVhbUZyYW1lID0gKCkgPT4ge1xuICBpZiAoZmxpcHBlclN0b3JlLmZsaXBwZXIpIHtcbiAgICB1bmJpbmRGcmFtZS52YWx1ZSA9IGZsaXBwZXJTdG9yZS5mbGlwcGVyLmVtaXR0ZXIub24oXG4gICAgICAnc2NyZWVuU3RyZWFtL2ZyYW1lJyxcbiAgICAgIChkYXRhOiBVaW50OEFycmF5LCBmcmFtZU9yaWVudGF0aW9uOiBzdHJpbmcpID0+IHtcbiAgICAgICAgb3JpZW50YXRpb24udmFsdWUgPSBOdW1iZXIoZnJhbWVPcmllbnRhdGlvbilcblxuICAgICAgICBpZiAoc2NyZWVuU3RyZWFtRXhwYW5kQ2FudmFzLnZhbHVlKSB7XG4gICAgICAgICAgaWYgKGZyYW1lUmVuZGVyZXIudmFsdWUpIHtcbiAgICAgICAgICAgIGZyYW1lUmVuZGVyZXIudmFsdWUucmVuZGVyRnJhbWUoe1xuICAgICAgICAgICAgICBkYXRhLFxuICAgICAgICAgICAgICBzY2FsZTogc2NyZWVuU2NhbGUudmFsdWVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgKVxuICB9XG59XG5cbmNvbnN0IHN0YXJ0U2NyZWVuU3RyZWFtID0gYXN5bmMgKCkgPT4ge1xuICBhd2FpdCBmbGlwcGVyU3RvcmVcbiAgICAuc3RhcnRTY3JlZW5TdHJlYW0oKVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIGxvZ2dlci5kZWJ1Zyh7XG4gICAgICAgIGNvbnRleHQ6IGNvbXBvbmVudE5hbWUsXG4gICAgICAgIG1lc3NhZ2U6ICdndWlTdGFydFNjcmVlblN0cmVhbTogT0snXG4gICAgICB9KVxuXG4gICAgICBzdGFydFNjcmVlblN0cmVhbUZyYW1lKClcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyb3I6IEVycm9yKSA9PiB7XG4gICAgICBycGNFcnJvckhhbmRsZXIoe1xuICAgICAgICBjb21wb25lbnROYW1lLFxuICAgICAgICBlcnJvcixcbiAgICAgICAgY29tbWFuZDogJ2d1aVN0YXJ0U2NyZWVuU3RyZWFtJ1xuICAgICAgfSlcbiAgICB9KVxufVxuY29uc3Qgc3RvcFNjcmVlblN0cmVhbSA9IGFzeW5jICgpID0+IHtcbiAgYXdhaXQgZmxpcHBlclN0b3JlXG4gICAgLnN0b3BTY3JlZW5TdHJlYW0oKVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIGxvZ2dlci5kZWJ1Zyh7XG4gICAgICAgIGNvbnRleHQ6IGNvbXBvbmVudE5hbWUsXG4gICAgICAgIG1lc3NhZ2U6ICdndWlTdG9wU2NyZWVuU3RyZWFtOiBPSydcbiAgICAgIH0pXG4gICAgfSlcbiAgICAuY2F0Y2goKGVycm9yOiBFcnJvcikgPT4ge1xuICAgICAgcnBjRXJyb3JIYW5kbGVyKHtcbiAgICAgICAgY29tcG9uZW50TmFtZSxcbiAgICAgICAgZXJyb3IsXG4gICAgICAgIGNvbW1hbmQ6ICdndWlTdG9wU2NyZWVuU3RyZWFtJ1xuICAgICAgfSlcbiAgICB9KVxuICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgIGZsaXBwZXJTdG9yZS5leHBhbmRWaWV3ID0gZmFsc2VcbiAgICB9KVxufVxuXG53YXRjaChcbiAgKCkgPT4gZmxpcHBlclN0b3JlLmZsaXBwZXJSZWFkeSxcbiAgYXN5bmMgKG5ld1ZhbHVlKSA9PiB7XG4gICAgaWYgKCFuZXdWYWx1ZSkge1xuICAgICAgaWYgKGZsaXBwZXJTdG9yZS5pc1NjcmVlblN0cmVhbSkge1xuICAgICAgICBhd2FpdCBzdG9wU2NyZWVuU3RyZWFtKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZsaXBwZXJTdG9yZS5leHBhbmRWaWV3ID0gZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gIH1cbilcblxuY29uc3Qgc2hvd0RpYWxvZyA9IGFzeW5jICgpID0+IHtcbiAgaWYgKHNjcmVlblN0cmVhbUV4cGFuZENhbnZhcy52YWx1ZSkge1xuICAgIGZyYW1lUmVuZGVyZXIudmFsdWUgPSBuZXcgRmxpcHBlckZyYW1lUmVuZGVyZXIoXG4gICAgICBzY3JlZW5TdHJlYW1FeHBhbmRDYW52YXMudmFsdWUsXG4gICAgICAxMjggKiBzY3JlZW5TY2FsZS52YWx1ZSxcbiAgICAgIDY0ICogc2NyZWVuU2NhbGUudmFsdWVcbiAgICApXG5cbiAgICBpZiAoZmxpcHBlclN0b3JlLmZsaXBwZXI/LmZyYW1lRGF0YSkge1xuICAgICAgZnJhbWVSZW5kZXJlci52YWx1ZS5yZW5kZXJGcmFtZSh7XG4gICAgICAgIGRhdGE6IGZsaXBwZXJTdG9yZS5mbGlwcGVyLmZyYW1lRGF0YSxcbiAgICAgICAgc2NhbGU6IHNjcmVlblNjYWxlLnZhbHVlXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGlmIChmbGlwcGVyU3RvcmUuZmxpcHBlclJlYWR5KSB7XG4gICAgaWYgKGZsaXBwZXJTdG9yZS5ycGNBY3RpdmUpIHtcbiAgICAgIGlmICghZmxpcHBlclN0b3JlLmlzU2NyZWVuU3RyZWFtKSB7XG4gICAgICAgIGF3YWl0IHN0YXJ0U2NyZWVuU3RyZWFtKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXJ0U2NyZWVuU3RyZWFtRnJhbWUoKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGF3YWl0IG5leHRUaWNrKClcbiAgcmVzaXplQ2FudmFzKClcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHJlc2l6ZUNhbnZhcylcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGNvcHlUb0NsaXBib2FyZClcbn1cblxuY29uc3QgaGlkZURpYWxvZyA9ICgpID0+IHtcbiAgaWYgKCFmbGlwcGVyU3RvcmUucGFnZVdpdGhTY3JlZW5TdHJlYW0pIHtcbiAgICBzdG9wU2NyZWVuU3RyZWFtKClcbiAgfVxuXG4gIGlmICh1bmJpbmRGcmFtZS52YWx1ZSkge1xuICAgIHVuYmluZEZyYW1lLnZhbHVlKClcbiAgfVxuXG4gIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCByZXNpemVDYW52YXMpXG4gIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBjb3B5VG9DbGlwYm9hcmQpXG59XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCIgc2NvcGVkPlxuQGltcG9ydCAnc3R5bGVzJztcbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxxLWRyYXdlclxuICAgIGNsYXNzPVwibWVudS1saW5rIGJnLWdyZXktMlwiXG4gICAgc2hvdy1pZi1hYm92ZVxuICAgIDp3aWR0aD1cIjE3NVwiXG4gICAgOmJyZWFrcG9pbnQ9XCI5MDBcIlxuICA+XG4gICAgPHEtc2Nyb2xsLWFyZWEgY2xhc3M9XCJmaXRcIj5cbiAgICAgIDxxLXRhYi1wYW5lbHMgdi1tb2RlbD1cInRhYlwiIGNsYXNzPVwiZml0IGJnLXRyYW5zcGFyZW50XCIgYW5pbWF0ZWQ+XG4gICAgICAgIDxxLXRhYi1wYW5lbCBjbGFzcz1cIm5vLXBhZGRpbmdcIiBuYW1lPVwiaG9tZVwiPlxuICAgICAgICAgIDxxLWxpc3QgY2xhc3M9XCJjb2x1bW4gZml0IGp1c3RpZnktYmV0d2VlbiBuby13cmFwXCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8Um91dGVyTGlua1xuICAgICAgICAgICAgICAgIHYtZm9yPVwibGluayBpbiBsaW5rc0xpc3RcIlxuICAgICAgICAgICAgICAgIDprZXk9XCJsaW5rLnRpdGxlXCJcbiAgICAgICAgICAgICAgICA6ZGlzYWJsZT1cImZsaXBwZXJTdG9yZS5mbGFncy5kaXNhYmxlTmF2aWdhdGlvblwiXG4gICAgICAgICAgICAgICAgdi1iaW5kPVwibGlua1wiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxxLXNwYWNlIC8+XG4gICAgICAgICAgICA8cS1pdGVtIGNsaWNrYWJsZSBAY2xpY2s9XCJzaG93U2V0dGluZ3NNZW51XCI+XG4gICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBhdmF0YXI+XG4gICAgICAgICAgICAgICAgPHEtaWNvbiBuYW1lPVwiZmxpcHBlcjpzZXR0aW5nc1wiIHNpemU9XCIyNHB4XCIgLz5cbiAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWw+U2V0dGluZ3M8L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgIDwvcS1pdGVtPlxuICAgICAgICAgICAgPHEtc2VwYXJhdG9yIGNsYXNzPVwibWVudS1saW5rX19zZXBhcmF0b3JcIiAvPlxuICAgICAgICAgICAgPHRlbXBsYXRlIHYtaWY9XCIhZmxpcHBlclN0b3JlLmlzRWxlY3Ryb25cIj5cbiAgICAgICAgICAgICAgPEZsaXBwZXJDb25uZWN0V2ViQnRuIHR5cGU9XCJpdGVtXCIgLz5cbiAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICA8dGVtcGxhdGUgdi1lbHNlPlxuICAgICAgICAgICAgICA8RmxpcHBlclN3aXRjaCAvPlxuICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICA8L3EtbGlzdD5cbiAgICAgICAgPC9xLXRhYi1wYW5lbD5cbiAgICAgICAgPHEtdGFiLXBhbmVsIGNsYXNzPVwibm8tcGFkZGluZ1wiIG5hbWU9XCJzZXR0aW5nc1wiPlxuICAgICAgICAgIDxxLWxpc3QgY2xhc3M9XCJjb2x1bW4gZml0IGp1c3RpZnktYmV0d2VlbiBuby13cmFwXCI+XG4gICAgICAgICAgICA8cS1zcGFjZSAvPlxuICAgICAgICAgICAgPHEtaXRlbT5cbiAgICAgICAgICAgICAgPHEtdG9nZ2xlXG4gICAgICAgICAgICAgICAgdi1pZj1cIiFmbGlwcGVyU3RvcmUuaXNFbGVjdHJvblwiXG4gICAgICAgICAgICAgICAgdi1tb2RlbD1cImZsaXBwZXJTdG9yZS5mbGFncy5hdXRvUmVjb25uZWN0XCJcbiAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgIGxhYmVsPVwiQXV0byByZWNvbm5lY3RcIlxuICAgICAgICAgICAgICAgIDpkaXNhYmxlPVwiZmxpcHBlclN0b3JlLmZsYWdzLmRpc2FibGVOYXZpZ2F0aW9uXCJcbiAgICAgICAgICAgICAgICBAY2xpY2s9XCJ0b2dnbGVBdXRvUmVjb25uZWN0XCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvcS1pdGVtPlxuICAgICAgICAgICAgPHEtaXRlbSB2LWlmPVwiYXBwc1N0b3JlLmZsYWdzLmNhdGFsb2dDYW5Td2l0Y2hDaGFubmVsXCI+XG4gICAgICAgICAgICAgIDxxLXRvZ2dsZVxuICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJhcHBzU3RvcmUuZmxhZ3MuY2F0YWxvZ0NoYW5uZWxQcm9kdWN0aW9uXCJcbiAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgIGxhYmVsPVwiUHJvZHVjdGlvbiBBcHBzXCJcbiAgICAgICAgICAgICAgICA6ZGlzYWJsZT1cImZsaXBwZXJTdG9yZS5mbGFncy5kaXNhYmxlTmF2aWdhdGlvblwiXG4gICAgICAgICAgICAgICAgQGNsaWNrPVwidG9nZ2xlQ2F0YWxvZ0NoYW5uZWxcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgICA8cS1pdGVtIHYtaWY9XCJhcHBzU3RvcmUuZmxhZ3MuY2F0YWxvZ0Nhbkluc3RhbGxBbGxBcHBzXCI+XG4gICAgICAgICAgICAgIDxxLXRvZ2dsZVxuICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJhcHBzU3RvcmUuZmxhZ3MuY2F0YWxvZ0luc3RhbGxBbGxBcHBzXCJcbiAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgIGxhYmVsPVwiSW5zdGFsbCBBbGwgQXBwc1wiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L3EtaXRlbT5cblxuICAgICAgICAgICAgPHEtaXRlbVxuICAgICAgICAgICAgICB2LWlmPVwiZmxpcHBlclN0b3JlLmlzRWxlY3Ryb25cIlxuICAgICAgICAgICAgICBjbGlja2FibGVcbiAgICAgICAgICAgICAgQGNsaWNrPVwic2hvd0Rvd25sb2FkUGF0aERpYWxvZ1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBhdmF0YXIgc3R5bGU9XCJtaW4td2lkdGg6IGluaXRpYWxcIj5cbiAgICAgICAgICAgICAgICA8cS1pY29uIG5hbWU9XCJtZGktZm9sZGVyLWFycm93LWRvd24tb3V0bGluZVwiIC8+XG4gICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG5cbiAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWxcbiAgICAgICAgICAgICAgICAgID57eyBzZWxlY3RlZERvd25sb2FkUGF0aCA/ICdVcGRhdGUgJyA6ICdTZWxlY3QgJyB9fWRvd25sb2FkXG4gICAgICAgICAgICAgICAgICBwYXRoPC9xLWl0ZW0tbGFiZWxcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICA8L3EtaXRlbT5cblxuICAgICAgICAgICAgPHEtaXRlbSBjbGlja2FibGUgQGNsaWNrPVwic2hvd0xvZ3NEaWFsb2dcIj5cbiAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGF2YXRhciBzdHlsZT1cIm1pbi13aWR0aDogaW5pdGlhbFwiPlxuICAgICAgICAgICAgICAgIDxxLWljb24gbmFtZT1cImZsaXBwZXI6bG9nc1wiIC8+XG4gICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG5cbiAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWw+VmlldyBsb2dzPC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICA8L3EtaXRlbT5cbiAgICAgICAgICAgIDxxLWl0ZW0gY2xpY2thYmxlIEBjbGljaz1cInNob3dIb21lTWVudVwiPlxuICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gYXZhdGFyPlxuICAgICAgICAgICAgICAgIDxxLWljb24gc2l6ZT1cIjJyZW1cIiBuYW1lPVwibWRpLWNoZXZyb24tbGVmdFwiIC8+XG4gICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsPkJhY2s8L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgIDwvcS1pdGVtPlxuICAgICAgICAgIDwvcS1saXN0PlxuICAgICAgICA8L3EtdGFiLXBhbmVsPlxuICAgICAgPC9xLXRhYi1wYW5lbHM+XG4gICAgPC9xLXNjcm9sbC1hcmVhPlxuICA8L3EtZHJhd2VyPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCB7IGNvbXB1dGVkLCByZWYsIG9uTW91bnRlZCB9IGZyb20gJ3Z1ZSdcbmltcG9ydCB7IFJvdXRlckxpbmsgfSBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9Sb3V0ZXJMaW5rJ1xuaW1wb3J0IHsgRmxpcHBlckNvbm5lY3RXZWJCdG4gfSBmcm9tICdmZWF0dXJlcy9GbGlwcGVyJ1xuaW1wb3J0IHsgRmxpcHBlclN3aXRjaCB9IGZyb20gJ2ZlYXR1cmVzL0ZsaXBwZXInXG5cbmltcG9ydCB7IFBST0RVQ1RJT05fTkFNRSwgREVWRUxPUF9OQU1FIH0gZnJvbSAnc2hhcmVkL2NvbmZpZydcblxuaW1wb3J0IHsgRmxpcHBlck1vZGVsIH0gZnJvbSAnZW50aXR5L0ZsaXBwZXInXG5pbXBvcnQgeyBpbnN0YW5jZSwgZ2V0QmFzZVVybCB9IGZyb20gJ2Jvb3QvYXhpb3MnXG5jb25zdCBmbGlwcGVyU3RvcmUgPSBGbGlwcGVyTW9kZWwudXNlRmxpcHBlclN0b3JlKClcblxuaW1wb3J0IHsgQXBwc01vZGVsIH0gZnJvbSAnZW50aXR5L0FwcHMnXG5jb25zdCBhcHBzU3RvcmUgPSBBcHBzTW9kZWwudXNlQXBwc1N0b3JlKClcblxuY29uc3QgdGFiID0gcmVmKCdob21lJylcblxuY29uc3Qgc2hvd1NldHRpbmdzTWVudSA9ICgpID0+IHtcbiAgdGFiLnZhbHVlID0gJ3NldHRpbmdzJ1xufVxuXG5jb25zdCBzaG93SG9tZU1lbnUgPSAoKSA9PiB7XG4gIHRhYi52YWx1ZSA9ICdob21lJ1xufVxuXG5jb25zdCBsaW5rc0xpc3QgPSBbXG4gIHtcbiAgICB0aXRsZTogJ015IEZsaXBwZXInLFxuICAgIGljb246ICdmbGlwcGVyOmRldmljZScsXG4gICAgbmFtZTogJ0RldmljZScsXG4gICAgdGl0bGVPdmVycmlkZTogY29tcHV0ZWQoKCkgPT4gZmxpcHBlclN0b3JlLmZsaXBwZXJOYW1lIHx8ICdNeSBGbGlwcGVyJylcbiAgfSxcbiAge1xuICAgIHRpdGxlOiAnQXBwcycsXG4gICAgaWNvbjogJ2ZsaXBwZXI6YXBwcycsXG4gICAgbmFtZTogJ0FwcHMnXG4gIH0sXG4gIHtcbiAgICB0aXRsZTogJ0ZpbGVzJyxcbiAgICBpY29uOiAnZmxpcHBlcjpmaWxlcycsXG4gICAgbmFtZTogJ0FyY2hpdmUnXG4gIH0sXG4gIHtcbiAgICB0aXRsZTogJ0NMSScsXG4gICAgaWNvbjogJ2ZsaXBwZXI6Y2xpJyxcbiAgICBuYW1lOiAnQ2xpJ1xuICB9LFxuICB7XG4gICAgdGl0bGU6ICdORkMgdG9vbHMnLFxuICAgIGljb246ICdmbGlwcGVyOm5mY3Rvb2xzJyxcbiAgICBuYW1lOiAnTmZjVG9vbHMnXG4gIH0sXG4gIHtcbiAgICB0aXRsZTogJ1BhaW50JyxcbiAgICBpY29uOiAnZmxpcHBlcjpwYWludCcsXG4gICAgbmFtZTogJ1BhaW50J1xuICB9LFxuICB7XG4gICAgdGl0bGU6ICdQdWxzZSBQbG90dGVyJyxcbiAgICBpY29uOiAnZmxpcHBlcjpzdWJ0b29scycsXG4gICAgbmFtZTogJ1B1bHNlUGxvdHRlcidcbiAgfVxuXVxuXG5jb25zdCB0b2dnbGVBdXRvUmVjb25uZWN0ID0gKCkgPT4ge1xuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcbiAgICAnYXV0b1JlY29ubmVjdCcsXG4gICAgU3RyaW5nKGZsaXBwZXJTdG9yZS5mbGFncy5hdXRvUmVjb25uZWN0KVxuICApXG5cbiAgaWYgKCFmbGlwcGVyU3RvcmUuZmxhZ3MuYXV0b1JlY29ubmVjdCkge1xuICAgIGNsZWFySW50ZXJ2YWwoZmxpcHBlclN0b3JlLnJlY29ubmVjdEludGVydmFsKVxuICB9IGVsc2Uge1xuICAgIGlmICghZmxpcHBlclN0b3JlLmZsaXBwZXI/LmNvbm5lY3RlZCkge1xuICAgICAgZmxpcHBlclN0b3JlLm9uQXV0b1JlY29ubmVjdCgpXG4gICAgfVxuICB9XG59XG5cbmNvbnN0IHRvZ2dsZUNhdGFsb2dDaGFubmVsID0gKCkgPT4ge1xuICBjb25zdCBjYXRhbG9nQ2hhbm5lbCA9IGFwcHNTdG9yZS5mbGFncy5jYXRhbG9nQ2hhbm5lbFByb2R1Y3Rpb25cbiAgICA/IFBST0RVQ1RJT05fTkFNRVxuICAgIDogREVWRUxPUF9OQU1FXG5cbiAgaW5zdGFuY2UuZGVmYXVsdHMuYmFzZVVSTCA9IGdldEJhc2VVcmwoY2F0YWxvZ0NoYW5uZWwpXG59XG5cbmNvbnN0IHNob3dMb2dzRGlhbG9nID0gKCkgPT4ge1xuICBmbGlwcGVyU3RvcmUuZGlhbG9ncy5sb2dzID0gdHJ1ZVxufVxuXG5jb25zdCBzaG93RG93bmxvYWRQYXRoRGlhbG9nID0gKCkgPT4ge1xuICBmbGlwcGVyU3RvcmUuZGlhbG9ncy5kb3dubG9hZFBhdGggPSB0cnVlXG59XG5cbmNvbnN0IHNlbGVjdGVkRG93bmxvYWRQYXRoID0gcmVmKCcnKVxuXG5vbk1vdW50ZWQoKCkgPT4ge1xuICBpZiAoZmxpcHBlclN0b3JlLmlzRWxlY3Ryb24pIHtcbiAgICBjb25zdCBkb3dubG9hZFBhdGggPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZmxpcHBlckZpbGVFeHBsb3JlckRvd25sb2FkUGF0aCcpXG4gICAgaWYgKGRvd25sb2FkUGF0aCkge1xuICAgICAgc2VsZWN0ZWREb3dubG9hZFBhdGgudmFsdWUgPSBkb3dubG9hZFBhdGhcbiAgICB9XG4gIH1cbn0pXG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCIgc2NvcGVkPlxuOmRlZXAoLm1lbnUtbGluayAucS1zY3JvbGxhcmVhX19jb250ZW50KSB7XG4gIGhlaWdodDogMTAwJTtcbn1cblxuLm1lbnUtbGluayB7XG4gICZfX3NlcGFyYXRvciB7XG4gICAgd2lkdGg6IDg1JTtcbiAgICBtYXJnaW46IGF1dG87XG4gIH1cbn1cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxxLWxheW91dCB2aWV3PVwiaGhoIExwUiBmZmZcIj5cbiAgICA8QXBwSGVhZGVyXG4gICAgICB2LWlmPVwiIWZsaXBwZXJTdG9yZS5pc0VsZWN0cm9uXCJcbiAgICAgIEB0b2dnbGVMZWZ0RHJhd2VyPVwidG9nZ2xlTGVmdERyYXdlclwiXG4gICAgLz5cblxuICAgIDxBcHBEcmF3ZXIgdi1tb2RlbD1cImxlZnREcmF3ZXJPcGVuXCIgLz5cblxuICAgIDxxLXBhZ2UtY29udGFpbmVyPlxuICAgICAgPHRlbXBsYXRlXG4gICAgICAgIHYtaWY9XCJcbiAgICAgICAgICByb3V0ZS5tZXRhLmNhbkxvYWRXaXRob3V0RmxpcHBlciB8fFxuICAgICAgICAgIGZsaXBwZXJTdG9yZS5mbGlwcGVyUmVhZHkgfHxcbiAgICAgICAgICBmbGlwcGVyU3RvcmUuZmxhZ3Muc3dpdGNoRmxpcHBlciB8fFxuICAgICAgICAgIGZsaXBwZXJTdG9yZS5mbGFncy51cGRhdGVJblByb2dyZXNzXG4gICAgICAgIFwiXG4gICAgICA+XG4gICAgICAgIDx0ZW1wbGF0ZSB2LWlmPVwiZmxpcHBlclN0b3JlLmZsYWdzLnN3aXRjaEZsaXBwZXJcIj5cbiAgICAgICAgICA8cS1wYWdlIGNsYXNzPVwiZmxleCBmbGV4LWNlbnRlclwiIHBhZGRpbmc+XG4gICAgICAgICAgICA8TG9hZGluZyBsYWJlbD1cIlN3aXRjaGluZyBGbGlwcGVyLi4uXCIgLz5cbiAgICAgICAgICA8L3EtcGFnZT5cbiAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgPHRlbXBsYXRlIHYtZWxzZS1pZj1cImZsaXBwZXJTdG9yZS5sb2FkaW5nSW5mb1wiPlxuICAgICAgICAgIDxxLXBhZ2UgY2xhc3M9XCJmbGV4IGZsZXgtY2VudGVyXCIgcGFkZGluZz5cbiAgICAgICAgICAgIDxMb2FkaW5nIGxhYmVsPVwiTG9hZGluZyBpbmZvLi4uXCIgLz5cbiAgICAgICAgICA8L3EtcGFnZT5cbiAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgPHRlbXBsYXRlIHYtZWxzZT5cbiAgICAgICAgICA8cm91dGVyLXZpZXcgLz5cbiAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgIDwvdGVtcGxhdGU+XG4gICAgICA8dGVtcGxhdGUgdi1lbHNlLWlmPVwiZmxpcHBlclN0b3JlLmlzRWxlY3Ryb25cIj5cbiAgICAgICAgPHEtcGFnZSBjbGFzcz1cImZsZXggZmxleC1jZW50ZXIgZml0XCIgcGFkZGluZz5cbiAgICAgICAgICA8cS1jYXJkIGZsYXQ+XG4gICAgICAgICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJxLXBhLW5vbmUgcS1tYS1tZFwiIGFsaWduPVwiY2VudGVyXCI+XG4gICAgICAgICAgICAgIDx0ZW1wbGF0ZVxuICAgICAgICAgICAgICAgIHYtaWY9XCJcbiAgICAgICAgICAgICAgICAgICFmbGlwcGVyU3RvcmUuZmxhZ3MuaXNCcmlkZ2VSZWFkeSB8fFxuICAgICAgICAgICAgICAgICAgZmxpcHBlclN0b3JlLmZsYWdzLmZsaXBwZXJJc0luaXRpYWxpemVkXG4gICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxMb2FkaW5nIGxhYmVsPVwiRmxpcHBlciBpcyBpbml0aWFsaXplZC4uLlwiIC8+XG4gICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LWVsc2UtaWY9XCJmbGlwcGVyU3RvcmUuYXZhaWxhYmxlRGZ1RmxpcHBlcnMubGVuZ3RoXCI+XG4gICAgICAgICAgICAgICAgPHEtbGlzdCBjbGFzcz1cInEtZ3V0dGVyLXktbWQgZnVsbC13aWR0aFwiPlxuICAgICAgICAgICAgICAgICAgPHRlbXBsYXRlXG4gICAgICAgICAgICAgICAgICAgIHYtZm9yPVwiZmxpcHBlciBpbiBmbGlwcGVyU3RvcmUuYXZhaWxhYmxlRGZ1RmxpcHBlcnNcIlxuICAgICAgICAgICAgICAgICAgICA6a2V5PVwiZmxpcHBlci5uYW1lXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPEZsaXBwZXJEZnVJdGVtIDpmbGlwcGVyPlxuICAgICAgICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSAjZGVmYXVsdD1cInsgZmxpcHBlciB9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cS1idG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgdW5lbGV2YXRlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcj1cInByaW1hcnlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIlJlcGFpclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIEBjbGljaz1cImZsaXBwZXJTdG9yZS5yZWNvdmVyeShmbGlwcGVyLmluZm8pXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgPC9GbGlwcGVyRGZ1SXRlbT5cbiAgICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC9xLWxpc3Q+XG4gICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LWVsc2U+XG4gICAgICAgICAgICAgICAgPHEtaW1nXG4gICAgICAgICAgICAgICAgICBzcmM9XCJ+YXNzZXRzL2ZsaXBwZXJfYWxlcnQuc3ZnXCJcbiAgICAgICAgICAgICAgICAgIHdpZHRoPVwiNzBweFwiXG4gICAgICAgICAgICAgICAgICBuby1zcGlubmVyXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNiBxLW15LXNtXCI+RmxpcHBlciBub3QgY29ubmVjdGVkPC9kaXY+XG4gICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgIDwvcS1jYXJkPlxuICAgICAgICA8L3EtcGFnZT5cbiAgICAgIDwvdGVtcGxhdGU+XG4gICAgICA8dGVtcGxhdGUgdi1lbHNlPlxuICAgICAgICA8cS1wYWdlIGNsYXNzPVwiZmxleCBmbGV4LWNlbnRlciBmaXRcIiBwYWRkaW5nPlxuICAgICAgICAgIDxGbGlwcGVyQ29ubmVjdFdlYkJ0biAvPlxuICAgICAgICA8L3EtcGFnZT5cbiAgICAgIDwvdGVtcGxhdGU+XG5cbiAgICAgIDxxLWRpYWxvZyB2LW1vZGVsPVwiZmxpcHBlclN0b3JlLmRpYWxvZ3MubWljcm9TRGNhcmRNaXNzaW5nXCI+XG4gICAgICAgIDxGbGlwcGVyTWljcm9TRENhcmRcbiAgICAgICAgICBpc0RpYWxvZ1xuICAgICAgICAgIDpzaG93RmluZE1pY3JvU2RCdG49XCJmbGlwcGVyU3RvcmUuaXNFbGVjdHJvblwiXG4gICAgICAgICAgQG9uRmluZE1pY3JvU2Q9XCJmbGlwcGVyU3RvcmUuZmluZE1pY3JvU2RcIlxuICAgICAgICAvPlxuICAgICAgPC9xLWRpYWxvZz5cbiAgICAgIDxBcHBPdXRkYXRlZEZpcm13YXJlRGlhbG9nXG4gICAgICAgIHYtbW9kZWw9XCJhcHBzU3RvcmUuZGlhbG9ncy5vdXRkYXRlZEZpcm13YXJlRGlhbG9nXCJcbiAgICAgICAgOnBlcnNpc3RlbnQ9XCJhcHBzU3RvcmUuZGlhbG9ncy5vdXRkYXRlZEZpcm13YXJlRGlhbG9nUGVyc2lzdGVudFwiXG4gICAgICAvPlxuICAgICAgPEZsaXBwZXJDb25uZWN0RmxpcHBlckRpYWxvZ1xuICAgICAgICB2LW1vZGVsPVwiZmxpcHBlclN0b3JlLmRpYWxvZ3MuY29ubmVjdEZsaXBwZXJcIlxuICAgICAgPlxuICAgICAgICA8dGVtcGxhdGUgdi1zbG90OmRlc2NyaXB0aW9uPlxuICAgICAgICAgIDx0ZW1wbGF0ZSB2LWlmPVwiZmxpcHBlclN0b3JlLmlzRWxlY3Ryb25cIj5cbiAgICAgICAgICAgIDxwPlBsdWcgaW4geW91ciBGbGlwcGVyIGFuZCBhbmQgd2FpdCBmb3IgaW5pdGlhbGl6YXRpb248L3A+XG4gICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICA8dGVtcGxhdGUgdi1lbHNlPlxuICAgICAgICAgICAgPHA+UGx1ZyBpbiB5b3VyIEZsaXBwZXIgYW5kIGNsaWNrIHRoZSBidXR0b24gYmVsb3c8L3A+XG4gICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDpkZWZhdWx0PlxuICAgICAgICAgIDx0ZW1wbGF0ZSB2LWlmPVwiIWZsaXBwZXJTdG9yZS5pc0VsZWN0cm9uXCI+XG4gICAgICAgICAgICA8RmxpcHBlckNvbm5lY3RXZWJCdG4gLz5cbiAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgPC9GbGlwcGVyQ29ubmVjdEZsaXBwZXJEaWFsb2c+XG4gICAgICA8RmxpcHBlck1vYmlsZURldGVjdGVkRGlhbG9nXG4gICAgICAgIHYtbW9kZWw9XCJmbGlwcGVyU3RvcmUuZGlhbG9ncy5tb2JpbGVEZXRlY3RlZFwiXG4gICAgICAvPlxuICAgICAgPEZsaXBwZXJVbnN1cHBvcnRlZEJyb3dzZXJEaWFsb2dcbiAgICAgICAgdi1tb2RlbD1cImZsaXBwZXJTdG9yZS5kaWFsb2dzLnNlcmlhbFVuc3VwcG9ydGVkXCJcbiAgICAgIC8+XG4gICAgICA8cS1kaWFsb2cgdi1tb2RlbD1cImZsaXBwZXJTdG9yZS5kaWFsb2dzLmxvZ3NcIj5cbiAgICAgICAgPEZsaXBwZXJMb2dDYXJkIGlzRGlhbG9nIC8+XG4gICAgICA8L3EtZGlhbG9nPlxuICAgICAgPEZsaXBwZXJEb3dubG9hZFBhdGhEaWFsb2cgdi1tb2RlbD1cImZsaXBwZXJTdG9yZS5kaWFsb2dzLmRvd25sb2FkUGF0aFwiIC8+XG4gICAgICA8RmxpcHBlclJlY292ZXJ5RGlhbG9nXG4gICAgICAgIHYtbW9kZWw9XCJmbGlwcGVyU3RvcmUuZGlhbG9ncy5yZWNvdmVyeVwiXG4gICAgICAgIDpwZXJzaXN0ZW50PVwiXG4gICAgICAgICAgZmxpcHBlclN0b3JlLmZsYWdzLnJlY292ZXJpbmcgJiYgIWZsaXBwZXJTdG9yZS5yZWNvdmVyeUVycm9yXG4gICAgICAgIFwiXG4gICAgICAgIEBoaWRlPVwiZmxpcHBlclN0b3JlLnJlc2V0UmVjb3ZlcnkodHJ1ZSlcIlxuICAgICAgLz5cbiAgICAgIDxGbGlwcGVyQnVzeURpYWxvZyB2LW1vZGVsPVwiZmxpcHBlclN0b3JlLmZsYWdzLmZsaXBwZXJJc0J1c3lcIj5cbiAgICAgICAgPHEtYnRuXG4gICAgICAgICAgQGNsaWNrPVwiZ29Ub0RldmljZUNvbnRyb2xcIlxuICAgICAgICAgIGxhYmVsPVwiR28gdG8gRGV2aWNlIENvbnRyb2xcIlxuICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgICAgICAgb3V0bGluZVxuICAgICAgICAgIG5vLWNhcHNcbiAgICAgICAgICB2LWNsb3NlLXBvcHVwXG4gICAgICAgIC8+XG4gICAgICA8L0ZsaXBwZXJCdXN5RGlhbG9nPlxuXG4gICAgICA8RmxpcHBlckV4cGFuZFZpZXcgdi1tb2RlbD1cImZsaXBwZXJTdG9yZS5leHBhbmRWaWV3XCIgLz5cbiAgICA8L3EtcGFnZS1jb250YWluZXI+XG4gIDwvcS1sYXlvdXQ+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHsgcmVmLCBvbk1vdW50ZWQgfSBmcm9tICd2dWUnXG5pbXBvcnQgeyB1c2VSb3V0ZSwgdXNlUm91dGVyIH0gZnJvbSAndnVlLXJvdXRlcidcbmNvbnN0IHJvdXRlID0gdXNlUm91dGUoKVxuY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKClcblxuaW1wb3J0IHsgQXBwSGVhZGVyLCBBcHBEcmF3ZXIgfSBmcm9tICcuL2NvbXBvbmVudHMnXG5pbXBvcnQgeyBMb2FkaW5nIH0gZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvTG9hZGluZydcblxuaW1wb3J0IHtcbiAgRmxpcHBlck1pY3JvU0RDYXJkLFxuICBGbGlwcGVyQ29ubmVjdEZsaXBwZXJEaWFsb2csXG4gIEZsaXBwZXJNb2JpbGVEZXRlY3RlZERpYWxvZyxcbiAgRmxpcHBlclVuc3VwcG9ydGVkQnJvd3NlckRpYWxvZyxcbiAgRmxpcHBlckRvd25sb2FkUGF0aERpYWxvZyxcbiAgRmxpcHBlclJlY292ZXJ5RGlhbG9nLFxuICBGbGlwcGVyQnVzeURpYWxvZyxcbiAgRmxpcHBlckRmdUl0ZW1cbn0gZnJvbSAnZW50aXR5L0ZsaXBwZXInXG5pbXBvcnQgeyBBcHBzTW9kZWwsIEFwcE91dGRhdGVkRmlybXdhcmVEaWFsb2cgfSBmcm9tICdlbnRpdHkvQXBwcydcbmNvbnN0IGFwcHNTdG9yZSA9IEFwcHNNb2RlbC51c2VBcHBzU3RvcmUoKVxuXG5pbXBvcnQge1xuICBGbGlwcGVyQ29ubmVjdFdlYkJ0bixcbiAgRmxpcHBlckxvZ0NhcmQsXG4gIEZsaXBwZXJFeHBhbmRWaWV3XG59IGZyb20gJ2ZlYXR1cmVzL0ZsaXBwZXInXG5pbXBvcnQgeyBGbGlwcGVyTW9kZWwgfSBmcm9tICdlbnRpdHkvRmxpcHBlcidcbmNvbnN0IGZsaXBwZXJTdG9yZSA9IEZsaXBwZXJNb2RlbC51c2VGbGlwcGVyU3RvcmUoKVxuXG5kZWZpbmVPcHRpb25zKHtcbiAgbmFtZTogJ01haW5MYXlvdXQnXG59KVxuXG5jb25zdCBsZWZ0RHJhd2VyT3BlbiA9IHJlZihmYWxzZSlcblxuY29uc3QgdG9nZ2xlTGVmdERyYXdlciA9ICgpID0+IHtcbiAgbGVmdERyYXdlck9wZW4udmFsdWUgPSAhbGVmdERyYXdlck9wZW4udmFsdWVcbn1cblxub25Nb3VudGVkKGFzeW5jICgpID0+IHtcbiAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhdXRvUmVjb25uZWN0JykgIT09ICdmYWxzZScpIHtcbiAgICBmbGlwcGVyU3RvcmUuZmxhZ3MuYXV0b1JlY29ubmVjdCA9IHRydWVcbiAgfSBlbHNlIHtcbiAgICBmbGlwcGVyU3RvcmUuZmxhZ3MuYXV0b1JlY29ubmVjdCA9IGZhbHNlXG4gIH1cblxuICBpZiAoIWZsaXBwZXJTdG9yZS5pc0VsZWN0cm9uICYmIGZsaXBwZXJTdG9yZS5mbGFncy5hdXRvUmVjb25uZWN0KSB7XG4gICAgZmxpcHBlclN0b3JlLm9uQXV0b1JlY29ubmVjdCgpXG4gIH1cbn0pXG5cbmNvbnN0IGdvVG9EZXZpY2VDb250cm9sID0gKCkgPT4ge1xuICBmbGlwcGVyU3RvcmUuZXhwYW5kVmlldyA9IHRydWVcbiAgcm91dGVyLnB1c2goeyBuYW1lOiAnRGV2aWNlJyB9KVxufVxuPC9zY3JpcHQ+XG4iXSwibmFtZXMiOlsiX2NyZWF0ZUJsb2NrIiwiX2NyZWF0ZVZOb2RlIiwiX3dpdGhDdHgiLCJfY3JlYXRlVGV4dFZOb2RlIiwiX3RvRGlzcGxheVN0cmluZyIsIl9pbXBvcnRzXzAiLCJfd2l0aERpcmVjdGl2ZXMiLCJfdlNob3ciLCJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX2hvaXN0ZWRfMSIsIl9vcGVuQmxvY2siLCJfY3JlYXRlRWxlbWVudEJsb2NrIiwiX0ZyYWdtZW50IiwiX3JlbmRlckxpc3QiLCJfbWVyZ2VQcm9wcyIsIl9ob2lzdGVkXzIiLCJfaG9pc3RlZF8zIiwiaW5zdGFuY2UiLCJzdHlsZSIsInBvc2l0aW9uIiwic2l6ZSIsIl9ob2lzdGVkXzQiLCJfcmVuZGVyU2xvdCIsIkZsaXBwZXJNb2RlbC51c2VGbGlwcGVyU3RvcmUiLCJfY3JlYXRlQ29tbWVudFZOb2RlIiwiYnJpZGdlRW1pdHRlciIsIl9ob2lzdGVkXzUiLCJfbm9ybWFsaXplU3R5bGUiLCJfYSIsIl9iIiwiZmxpcHBlciIsIl9ub3JtYWxpemVDbGFzcyIsIkZsaXBwZXJGcmFtZVJlbmRlcmVyIiwiQXBwc01vZGVsLnVzZUFwcHNTdG9yZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztzQkFDRUEsWUFRUyxPQUFBO0FBQUEsSUFSRCxXQUFBO0FBQUEsSUFBVSxLQUFJO0FBQUEsSUFBSSxRQUFPO0FBQUEsSUFBVSxNQUFNLE9BQUE7QUFBQSxFQUFBLEdBQUE7QUFBQSxxQkFDL0MsTUFFaUI7QUFBQSxNQUZLLDRCQUF0QkEsWUFFaUIsY0FBQTtBQUFBLFFBQUEsS0FBQTtBQUFB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QUFBLElBQUEsQ0FBQSxXQUFyQixPQUFBLGFBQWEsUUFBUSxvQkFBaUI7QUFBQSxVQUFBLEdBQUEsTUFBQSxHQUFBLENBQUEsWUFBQSxDQUFBO0FBQUEsVUFFakRBLFlBRVcsU0FBQTtBQUFBLFlBQUEsWUFGUSxvQkFBYSxRQUFRO0FBQUEsWUFBQSx1QkFBQSxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQSxDQUFBLFdBQXJCLE9BQUEsYUFBYSxRQUFRLE9BQUk7QUFBQSxVQUFBLEdBQUE7QUFBQSw2QkFDMUMsTUFBMkI7QUFBQSxjQUEzQkEsWUFBMkIsNEJBQVgsVUFBQSxHQUFBLENBQVE7QUFBQSxZQUFBLENBQUE7QUFBQTs7VUFFMUJBLFlBQXlFLE9BQUEsMkJBQUEsR0FBQTtBQUFBLFlBQUEsWUFBckMsb0JBQWEsUUFBUTtBQUFBLFlBQUEsdUJBQUEsT0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxXQUFyQixPQUFBLGFBQWEsUUFBUSxlQUFZO0FBQUEsVUFBQSxHQUFBLE1BQUEsR0FBQSxDQUFBLFlBQUEsQ0FBQTtBQUFBLFVBQ3JFQSxZQU1FLE9BQUEsdUJBQUEsR0FBQTtBQUFBLFlBQUEsWUFMUyxvQkFBYSxRQUFRO0FBQUEsWUFBQSx1QkFBQSxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQSxDQUFBLFdBQXJCLE9BQUEsYUFBYSxRQUFRLFdBQVE7QUFBQSxZQUNyQyxZQUF1QixPQUFBLGFBQWEsTUFBTSxjQUFVLENBQUssT0FBQSxhQUFhO0FBQUEsWUFHdEUsUUFBSSxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQSxDQUFBLFdBQUUsT0FBQSxhQUFhLGNBQWEsSUFBQTtBQUFBLFVBQUEsR0FBQSxNQUFBLEdBQUEsQ0FBQSxjQUFBLFlBQUEsQ0FBQTtBQUFBLFVBRW5DQSxZQVNvQixPQUFBLG1CQUFBLEdBQUE7QUFBQSxZQUFBLFlBVFEsb0JBQWEsTUFBTTtBQUFBLFlBQUEsdUJBQUEsT0FBQSxFQUFBLE1BQUEsT0FBQSxFQUFBLElBQUEsQ0FBQSxXQUFuQixPQUFBLGFBQWEsTUFBTSxnQkFBYTtBQUFBLFVBQUEsR0FBQTtBQUFBLDZCQUMxRCxNQU9FO0FBQUEsY0FBQUssZUFQRkwsWUFPRSxNQUFBO0FBQUEsZ0JBTkMsU0FBTyxPQUFBO0FBQUEsZ0JBQ1IsT0FBTTtBQUFBLGdCQUNOLE9BQU07QUFBQSxnQkFDTixTQUFBO0FBQUEsZ0JBQ0EsV0FBQTtBQUFBLGNBQUEsR0FBQSxNQUFBLEdBQUEsR0FBQTtBQUFBOzs7OztVQUtKQSxZQUF1RCxPQUFBLG1CQUFBLEdBQUE7QUFBQSxZQUFBLFlBQTNCLE9BQUEsYUFBYTtBQUFBLFlBQUEsdUJBQUEsT0FBQSxFQUFBLE1BQUEsT0FBQSxFQUFBLElBQUEsQ0FBQSxXQUFiLG9CQUFhLGFBQVU7QUFBQSxVQUFBLEdBQUEsTUFBQSxHQUFBLENBQUEsWUFBQSxDQUFBO0FBQUE7Ozs7Ozs7OyIsInhfZ29vZ2xlX2lnbm9yZUxpc3QiOlszLDQsNSw2LDcsOCwyM119
