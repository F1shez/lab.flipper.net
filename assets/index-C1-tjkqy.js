import { Q as QLayout, a as QPageContainer } from "./QLayout-vB8hADbe.js";
import { d as defineComponent, _ as _export_sfc, e as createBlock, f as openBlock, g as withCtx, i as createCommentVNode, p as createBaseVNode, k as QIcon, t as toDisplayString, $ as normalizeStyle, c as computed, n as createElementBlock, j as createVNode, m as withDirectives, v as vShow, V as renderSlot, a4 as withModifiers, Q as QBtn, l as createTextVNode, a0 as normalizeClass, a5 as defineStore, a as ref, U as onBeforeUnmount, a1 as useRouter, a2 as useRoute, F as Fragment, q as renderList, Z as QAvatar, a6 as Ripple, a3 as resolveComponent, w as watch, S as onMounted, r as reactive, s as mergeProps, x as createDirective, a7 as isDeepEqual, L as createComponent, a8 as isRuntimeSsrPreHydration, h, T as Transition, M as hDir, J as hSlot, a9 as listenOpts, aa as onActivated, ab as onDeactivated, H as getCurrentInstance, ac as hUniqueSlot, ad as height, R as nextTick, ae as debounce } from "./index-BXn1qSjA.js";
import { Q as QSpace } from "./QSpace-CENODZda.js";
import { Q as QInput } from "./QInput-B42UgMmF.js";
import { E as QChip, F as useCategoriesStore, z as QImg, i as QCard, C as ClosePopup, j as QCardSection, h as QDialog, w as useAppsStore, k as useFlipperStore, G as api, b as QItem, Q as QItemSection, q as QBadge, p as QCardActions, o as QScrollArea, y as QPage, l as showNotif, x as QSeparator } from "./KeypadButton.vue_vue_type_style_index_0_scoped_4cc0fc91_lang-B0Vue97M.js";
import { Q as QList } from "./QList-YariPQfx.js";
import { Q as QToolbar } from "./QToolbar-D5FagYN5.js";
import { Q as QHeader } from "./QHeader-DRe5-O3Z.js";
import "./axios-Djb__N3o.js";
import { Q as QTooltip } from "./QTooltip-COHn7rMY.js";
import { Q as QSelect } from "./QSelect--lwtQ9LH.js";
import { P as ProgressBar } from "./ProgressBar-DN3VEbL3.js";
import { L as Loading } from "./Loading-BTUYxxy7.js";
import { b as bytesToSize } from "./bytesToSize-DDOkA4vd.js";
import { s as scrollTargetProp, i as getScrollHeight, j as getVerticalScrollPosition, k as setVerticalScrollPosition, l as getScrollTarget } from "./_commonjsHelpers-BruQt46T.js";
import { _ as _imports_0$1 } from "./flipper_alert-CaGPO0B-.js";
import { F as FlipperMicroSDCard } from "./MicroSD-CsFvmHkT.js";
import "./use-file-dom-props-CkTfPNnd.js";
import "./private.use-form-DlR7USk8.js";
import "./QMenu-OiOcQlb1.js";
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  __name: "Chip",
  props: {
    color: {},
    iconUri: {},
    name: {},
    id: {},
    isCurrentCategory: { type: Boolean, default: false },
    clickable: { type: Boolean, default: true }
  },
  emits: ["click"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const emit = __emit;
    const onClick = () => {
      emit("click");
    };
    const __returned__ = { emit, onClick };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$8 = { class: "text-no-wrap" };
function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QChip, {
    style: normalizeStyle(`background-color: #${$props.color}; opacity: ${$props.isCurrentCategory ? "1" : "0.5"}`),
    clickable: $props.clickable,
    onClick: $setup.onClick
  }, {
    default: withCtx(() => [
      $props.iconUri ? (openBlock(), createBlock(QIcon, {
        key: 0,
        name: `img:${$props.iconUri}`,
        size: "14px",
        class: "q-my-xs q-mr-sm"
      }, null, 8, ["name"])) : createCommentVNode("", true),
      createBaseVNode("span", _hoisted_1$8, toDisplayString($props.name), 1)
    ]),
    _: 1
  }, 8, ["style", "clickable"]);
}
const CategoryChip = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$k], ["__file", "Chip.vue"]]);
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "Card",
  props: {
    alias: {},
    currentVersion: {},
    categoryId: {}
  },
  emits: ["click"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit = __emit;
    const store = useCategoriesStore();
    const categories = computed(() => store.categories);
    const getCategoryIcon = computed(
      () => {
        var _a, _b;
        return (_b = (_a = categories.value) == null ? void 0 : _a.find((e) => e.id === props.categoryId)) == null ? void 0 : _b.iconUri;
      }
    );
    const getCategoryName = computed(
      () => {
        var _a, _b;
        return (_b = (_a = categories.value) == null ? void 0 : _a.find((e) => e.id === props.categoryId)) == null ? void 0 : _b.name;
      }
    );
    const onClick = () => {
      emit("click", props.alias);
    };
    const __returned__ = { props, emit, store, categories, getCategoryIcon, getCategoryName, onClick };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$7 = { class: "card__wrapper" };
const _hoisted_2$6 = { class: "card__image-wrapper bg-primary q-mb-sm q-pa-xs" };
const _hoisted_3$4 = { class: "row justify-between no-wrap full-width" };
const _hoisted_4$4 = { class: "col text-h6 q-ma-none q-mr-xs ellipsis" };
const _hoisted_5$3 = { class: "col-shrink row items-center no-wrap" };
const _hoisted_6$2 = { class: "q-ma-none" };
const _hoisted_7$2 = { class: "row justify-between items-end no-wrap" };
const _hoisted_8$2 = { class: "col card__description text-grey-7 text-caption q-ma-none q-mr-xs ellipsis-2-lines" };
const _hoisted_9$1 = { class: "col-shrink card__button-wrapper" };
function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    tabindex: "0",
    class: "card cursor-pointer",
    onClick: $setup.onClick
  }, [
    createBaseVNode("div", _hoisted_1$7, [
      createBaseVNode("div", _hoisted_2$6, [
        createVNode(QImg, {
          class: "card__image",
          src: $props.currentVersion.screenshots[0],
          ratio: 256 / 128,
          "spinner-color": "primary",
          "spinner-size": "82px"
        }, null, 8, ["src"])
      ]),
      createBaseVNode("div", _hoisted_3$4, [
        createBaseVNode("p", _hoisted_4$4, toDisplayString($props.currentVersion.name), 1),
        createBaseVNode("div", _hoisted_5$3, [
          withDirectives(createVNode(QIcon, {
            class: "q-mr-sm",
            name: `img:${$setup.getCategoryIcon}`,
            size: "14px"
          }, null, 8, ["name"]), [
            [vShow, $setup.getCategoryIcon]
          ]),
          createBaseVNode("span", _hoisted_6$2, toDisplayString($setup.getCategoryName), 1)
        ])
      ]),
      createBaseVNode("div", _hoisted_7$2, [
        createBaseVNode("p", _hoisted_8$2, toDisplayString($props.currentVersion.shortDescription), 1),
        createBaseVNode("div", _hoisted_9$1, [
          renderSlot(_ctx.$slots, "button", {}, void 0, true)
        ])
      ])
    ])
  ]);
}
const AppCard = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$j], ["__scopeId", "data-v-60d19a25"], ["__file", "Card.vue"]]);
const _sfc_main$i = {};
function _sfc_render$i(_ctx, _cache) {
  return openBlock(), createBlock(QBtn, {
    class: "text-pixelated fit text-body1",
    unelevated: "",
    dense: "",
    color: "grey",
    label: "Installed",
    disable: "",
    onClick: _cache[0] || (_cache[0] = withModifiers(() => {
    }, ["stop"]))
  });
}
const AppInstalledBtn = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$i], ["__file", "InstalledBtn.vue"]]);
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "OutdatedApp",
  props: {
    href: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const __returned__ = {};
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
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
                color: "negative",
                size: "64px"
              }),
              _cache[0] || (_cache[0] = createBaseVNode("div", { class: "text-h6 q-my-sm" }, "Outdated app", -1)),
              _cache[1] || (_cache[1] = createBaseVNode("p", null, "Contact the developer to request further app support.", -1))
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
                label: "View on GitHub",
                href: $props.href,
                target: "_blank"
              }, null, 8, ["href"])
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
const AppOutdatedAppDialog = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$h], ["__file", "OutdatedApp.vue"]]);
const _sfc_main$g = {};
function _sfc_render$g(_ctx, _cache) {
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
                name: "svguse:common-icons.svg#fw-conflict-icon",
                size: "64px"
              }),
              _cache[1] || (_cache[1] = createBaseVNode("div", { class: "text-h6 q-my-sm" }, "No Free Space", -1)),
              _cache[2] || (_cache[2] = createBaseVNode("p", null, [
                createTextVNode(" There is no empty space to install this application."),
                createBaseVNode("br"),
                createTextVNode("Use archive to delete needless files. ")
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
              createVNode(QBtn, {
                outline: "",
                color: "primary",
                label: "Open Archive",
                onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$router.push({ name: "Archive" }))
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
const AppNoFreeSpaceDialog = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$g], ["__file", "NoFreeSpace.vue"]]);
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "NoInternetConnection",
  props: {
    flat: { type: Boolean, default: false },
    isDialog: { type: Boolean, default: false }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const __returned__ = {};
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _imports_0 = "data:image/svg+xml,%3csvg%20width='104'%20height='60'%20viewBox='0%200%20104%2060'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M27.25%2030.1113C27.25%2016.5918%2038.0413%205.59273%2051.4801%205.25786C51.5605%205.25265%2051.6416%205.25%2051.7233%205.25C51.7594%205.25%2051.7954%205.25052%2051.8313%205.25154C51.9245%205.25052%2052.0178%205.25%2052.1113%205.25C65.8417%205.25%2076.9725%2016.3808%2076.9725%2030.1113C76.9725%2031.2025%2076.9022%2032.2773%2076.7659%2033.3314C76.1874%2032.7878%2075.5663%2032.289%2074.9081%2031.8406C74.9508%2031.2698%2074.9725%2030.693%2074.9725%2030.1113C74.9725%2028.1469%2074.7248%2026.2404%2074.2588%2024.4213C74.2473%2024.4217%2074.2358%2024.4219%2074.2242%2024.4219H60.4528C60.5996%2026.25%2060.677%2028.1553%2060.677%2030.1113C60.677%2030.1839%2060.6769%2030.2564%2060.6767%2030.3289C59.9794%2030.6123%2059.3079%2030.9461%2058.6668%2031.3257C58.6736%2030.9236%2058.677%2030.5187%2058.677%2030.1113C58.677%2028.1456%2058.5967%2026.24%2058.4462%2024.4219H45.0004C44.8498%2026.24%2044.7695%2028.1456%2044.7695%2030.1113C44.7695%2032.1489%2044.8558%2034.122%2045.0172%2036H53.7443C53.3225%2036.6347%2052.9473%2037.303%2052.6234%2038H45.2214C45.6143%2041.31%2046.2461%2044.2625%2047.0478%2046.6675C47.7481%2048.7683%2048.5599%2050.3962%2049.4127%2051.4784C50.2142%2052.4953%2050.9521%2052.913%2051.5827%2052.9665C51.6566%2052.9682%2051.7306%2052.9695%2051.8046%2052.9705C52.2748%2052.9473%2052.8068%2052.7213%2053.3818%2052.192C53.9399%2053.1192%2054.5944%2053.9818%2055.3314%2054.7659C54.2773%2054.9022%2053.2025%2054.9725%2052.1113%2054.9725C52.0178%2054.9725%2051.9245%2054.972%2051.8313%2054.971C51.7954%2054.972%2051.7594%2054.9725%2051.7233%2054.9725C51.6416%2054.9725%2051.5605%2054.9699%2051.4801%2054.9647C38.0413%2054.6298%2027.25%2043.6307%2027.25%2030.1113ZM30.5753%2022.4219C33.2547%2014.9185%2039.744%209.22546%2047.7136%207.67257C46.718%208.99232%2045.8593%2010.7961%2045.1504%2012.9226C44.2647%2015.5799%2043.587%2018.8206%2043.1852%2022.4219H30.5753ZM29.9657%2024.4137C29.4984%2026.2351%2029.25%2028.1442%2029.25%2030.1113C29.25%2032.1484%2029.5164%2034.1232%2030.0164%2036.0029C30.0419%2036.001%2030.0677%2036%2030.0938%2036H43.0101C42.8527%2034.1111%2042.7695%2032.1385%2042.7695%2030.1113C42.7695%2028.1553%2042.8469%2026.25%2042.9938%2024.4219H30.0938C30.0504%2024.4219%2030.0076%2024.4191%2029.9657%2024.4137ZM47.7136%2052.5499C39.8148%2051.0108%2033.37%2045.4047%2030.6476%2038H43.2078C43.6121%2041.5215%2044.281%2044.6917%2045.1504%2047.2999C45.8593%2049.4264%2046.718%2051.2302%2047.7136%2052.5499ZM73.6472%2022.4219H60.2613C59.8595%2018.8206%2059.1819%2015.5799%2058.2961%2012.9226C57.5589%2010.711%2056.6596%208.84847%2055.6128%207.51647C63.99%208.80408%2070.8681%2014.6392%2073.6472%2022.4219ZM45.1981%2022.4219C45.5891%2019.031%2046.2301%2016.0082%2047.0478%2013.555C47.7481%2011.4542%2048.5599%209.82631%2049.4127%208.74411C50.2142%207.72718%2050.9521%207.30948%2051.5827%207.25599C51.6566%207.25431%2051.7306%207.25299%2051.8046%207.25201C52.4481%207.28379%2053.2072%207.69518%2054.0338%208.74411C54.8867%209.82631%2055.6985%2011.4542%2056.3987%2013.555C57.2165%2016.0082%2057.8575%2019.031%2058.2485%2022.4219H45.1981Z'%20fill='%23616161'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M66.3985%2055.9963C72.8027%2055.9963%2077.9943%2050.8047%2077.9943%2044.4005C77.9943%2037.9963%2072.8027%2032.8047%2066.3985%2032.8047C59.9943%2032.8047%2054.8027%2037.9963%2054.8027%2044.4005C54.8027%2050.8047%2059.9943%2055.9963%2066.3985%2055.9963ZM60.3597%2051.5947C58.3092%2049.8718%2057.0059%2047.2883%2057.0059%2044.4005C57.0059%2039.2131%2061.2111%2035.0079%2066.3985%2035.0079C68.4467%2035.0079%2070.3417%2035.6634%2071.8852%2036.7762L60.3597%2051.5947ZM62.2956%2052.8519C63.5353%2053.4549%2064.9274%2053.7931%2066.3985%2053.7931C71.5859%2053.7931%2075.7911%2049.5879%2075.7911%2044.4005C75.7911%2042.0931%2074.9591%2039.9801%2073.5788%2038.345L62.2956%2052.8519Z'%20fill='%23F63F3F'/%3e%3c/svg%3e";
function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QCard, {
    class: normalizeClass(["rounded-borders", { dialog: $props.isDialog }]),
    flat: $props.flat
  }, {
    default: withCtx(() => [
      $props.isDialog ? withDirectives((openBlock(), createBlock(QBtn, {
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
          createVNode(QImg, {
            src: _imports_0,
            width: "128px",
            "no-spinner": ""
          }),
          _cache[0] || (_cache[0] = createBaseVNode("div", { class: "text-h6 q-my-sm" }, "No Internet Connection", -1)),
          _cache[1] || (_cache[1] = createBaseVNode("p", null, "Check the network settings", -1))
        ]),
        _: 1,
        __: [0, 1]
      })
    ]),
    _: 1
  }, 8, ["flat", "class"]);
}
const FlipperNoInternetConnectionCard = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$f], ["__file", "NoInternetConnection.vue"]]);
const useGlobalStore = defineStore("global", () => {
  const isOnline = ref(navigator.onLine);
  const updateOnlineStatus = () => {
    isOnline.value = navigator.onLine;
  };
  if (typeof window !== "undefined") {
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);
  }
  onBeforeUnmount(() => {
    window.removeEventListener("online", updateOnlineStatus);
    window.removeEventListener("offline", updateOnlineStatus);
  });
  return {
    isOnline
  };
});
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "Header",
  setup(__props, { expose: __expose }) {
    __expose();
    const appsStore = useAppsStore();
    const { fetchAppsShort } = api;
    const flipperStore = useFlipperStore();
    const categoriesStore = useCategoriesStore();
    const globalStore = useGlobalStore();
    const searchText = ref("");
    const searchLoading = ref(false);
    const searchResult = ref([]);
    const search = async (val) => {
      if (val.length < 3) {
        return;
      }
      const params = {
        limit: 8,
        offset: 0,
        sort_by: "updated_at",
        sort_order: -1,
        is_latest_release_version: true,
        query: val
      };
      const api2 = flipperStore.api;
      const target = flipperStore.target;
      if (api2 || target) {
        delete params.is_latest_release_version;
        if (target) {
          params.target = target;
        }
        if (api2) {
          params.api = api2;
        }
      }
      searchLoading.value = true;
      await fetchAppsShort(params).then((apps) => {
        searchResult.value = apps;
      }).catch((error) => {
        console.error(error);
        searchResult.value = [];
      });
      searchLoading.value = false;
    };
    const goAppPage = (appAlias) => {
      router.push({ name: "AppsPath", params: { path: appAlias } });
      searchText.value = "";
      searchResult.value = [];
    };
    const route = useRoute();
    const router = useRouter();
    const showBackButton = computed(
      () => route.name === "AppsPath" || route.name === "InstalledApps"
    );
    const goCatalog = () => {
      if (categoriesStore.currentCategory) {
        router.push({
          name: "AppsCategory",
          params: { path: categoriesStore.currentCategory.name.toLowerCase() }
        });
      } else {
        router.push({ name: "Apps" });
      }
    };
    const __returned__ = { appsStore, fetchAppsShort, flipperStore, categoriesStore, globalStore, searchText, searchLoading, searchResult, search, goAppPage, route, router, showBackButton, goCatalog };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$6 = {
  key: 0,
  class: "column relative-position justify-center"
};
const _hoisted_2$5 = ["src"];
function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QHeader, { class: "bg-transparent text-black q-pa-lg" }, {
    default: withCtx(() => [
      createVNode(QToolbar, { class: "row justify-end items-center q-pa-none" }, {
        default: withCtx(() => [
          createBaseVNode("div", null, [
            $setup.showBackButton ? (openBlock(), createBlock(QBtn, {
              key: 0,
              class: "q-mr-md",
              flat: "",
              round: "",
              dense: "",
              onClick: $setup.goCatalog
            }, {
              default: withCtx(() => [
                createVNode(QIcon, {
                  name: "mdi-chevron-left",
                  size: "56px"
                })
              ]),
              _: 1
            })) : (openBlock(), createBlock(QIcon, {
              key: 1,
              class: "q-mr-md",
              name: "flipper:apps",
              size: "56px"
            }))
          ]),
          _cache[3] || (_cache[3] = createBaseVNode("h4", { class: "q-ma-none text-h4" }, "Apps", -1)),
          createVNode(QSpace),
          $setup.globalStore.isOnline ? (openBlock(), createElementBlock("div", _hoisted_1$6, [
            createVNode(QInput, {
              class: "q-mr-md text-black",
              style: { "width": "300px" },
              modelValue: $setup.searchText,
              "onUpdate:modelValue": [
                _cache[0] || (_cache[0] = ($event) => $setup.searchText = $event),
                _cache[1] || (_cache[1] = (val) => $setup.search(String(val)))
              ],
              modelModifiers: { trim: true },
              "input-class": "text-black",
              "bg-color": "grey-3",
              rounded: "",
              dense: "",
              standout: "no-shadow text-black",
              type: "text",
              label: "Search",
              debounce: "400",
              disable: $setup.appsStore.flags.catalogIsUnknownSDK
            }, {
              prepend: withCtx(() => [
                createVNode(QIcon, {
                  name: "mdi-magnify",
                  class: "text-grey-7"
                })
              ]),
              _: 1
            }, 8, ["modelValue", "disable"]),
            $setup.searchText.length >= 2 ? (openBlock(), createBlock(QList, {
              key: 0,
              bordered: "",
              class: "absolute bg-white rounded-borders z-top",
              style: { "width": "270px", "top": "43px" }
            }, {
              default: withCtx(() => [
                $setup.searchResult.length ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList($setup.searchResult, (app) => {
                  return withDirectives((openBlock(), createBlock(QItem, {
                    key: app.id,
                    clickable: "",
                    dense: "",
                    onClick: ($event) => $setup.goAppPage(app.alias)
                  }, {
                    default: withCtx(() => [
                      app.currentVersion ? (openBlock(), createBlock(QItemSection, {
                        key: 0,
                        avatar: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(QAvatar, {
                            square: "",
                            size: "24px",
                            style: { "margin": "4px" }
                          }, {
                            default: withCtx(() => [
                              createBaseVNode("img", {
                                src: app.currentVersion.iconUri,
                                style: { "image-rendering": "pixelated" }
                              }, null, 8, _hoisted_2$5)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024)) : createCommentVNode("", true),
                      createVNode(QItemSection, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(app.currentVersion.name), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1032, ["onClick"])), [
                    [Ripple]
                  ]);
                }), 128)) : !$setup.searchLoading ? (openBlock(), createBlock(QItem, {
                  key: 1,
                  dense: ""
                }, {
                  default: withCtx(() => [
                    createVNode(QItemSection, { class: "text-grey-7" }, {
                      default: withCtx(() => _cache[2] || (_cache[2] = [
                        createTextVNode("Nothing found", -1)
                      ])),
                      _: 1,
                      __: [2]
                    })
                  ]),
                  _: 1
                })) : createCommentVNode("", true)
              ]),
              _: 1
            })) : createCommentVNode("", true)
          ])) : createCommentVNode("", true),
          createVNode(QBtn, {
            class: "q-mr-xs text-weight-regular",
            flat: "",
            rounded: "",
            "no-caps": "",
            color: _ctx.$route.name === "InstalledApps" ? "primary" : "black",
            icon: "flipper:installed",
            label: "Installed",
            to: { name: "InstalledApps" }
          }, {
            default: withCtx(() => [
              _ctx.$q.screen.width > 365 && $setup.appsStore.appsUpdateCount > 0 && $setup.globalStore.isOnline ? (openBlock(), createBlock(QBadge, {
                key: 0,
                color: "positive",
                floating: "",
                class: "outdated-badge",
                label: $setup.appsStore.appsUpdateCount
              }, null, 8, ["label"])) : createCommentVNode("", true)
            ]),
            _: 1
          }, 8, ["color"]),
          createVNode(QBtn, {
            class: "text-weight-regular",
            flat: "",
            rounded: "",
            "no-caps": "",
            color: "black",
            icon: "mdi-github",
            label: "Contribute",
            href: "https://github.com/flipperdevices/flipper-application-catalog",
            target: "_blank"
          })
        ]),
        _: 1,
        __: [3]
      })
    ]),
    _: 1
  });
}
const AppsHeader = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$e], ["__file", "Header.vue"]]);
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "AppsLayout",
  setup(__props, { expose: __expose }) {
    __expose();
    const appsStore = useAppsStore();
    const __returned__ = { appsStore, get AppsHeader() {
      return AppsHeader;
    }, get AppNoFreeSpaceDialog() {
      return AppNoFreeSpaceDialog;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_view = resolveComponent("router-view");
  return openBlock(), createBlock(QLayout, { view: "lhr LpR lFf" }, {
    default: withCtx(() => [
      createVNode(QPageContainer, null, {
        default: withCtx(() => [
          createVNode($setup["AppsHeader"]),
          createVNode(_component_router_view),
          createVNode($setup["AppNoFreeSpaceDialog"], {
            modelValue: $setup.appsStore.dialogs.noFreeSpace,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.appsStore.dialogs.noFreeSpace = $event)
          }, null, 8, ["modelValue"])
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const AppsLayout = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$d], ["__file", "AppsLayout.vue"]]);
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "button",
  props: {
    app: {},
    loading: { type: Boolean, default: false }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const appsStore = useAppsStore();
    const props = __props;
    const onClick = () => {
      if (props.app) {
        appsStore.onAction(props.app, "install");
      }
    };
    const __returned__ = { appsStore, props, onClick };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QBtn, {
    class: "text-pixelated fit text-body1",
    unelevated: "",
    dense: "",
    color: "primary",
    label: "Install",
    onClick: withModifiers($setup.onClick, ["stop"]),
    loading: $setup.props.loading
  }, null, 8, ["loading"]);
}
const AppInstallBtn = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$c], ["__file", "button.vue"]]);
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "button",
  props: {
    app: {},
    loading: { type: Boolean, default: false }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const appsStore = useAppsStore();
    const flipperStore = useFlipperStore();
    const props = __props;
    const onClick = () => {
      if (props.app) {
        appsStore.openApp(props.app.path).then(() => {
          flipperStore.flipper.frameData = void 0;
          flipperStore.expandView = true;
        }).catch(() => {
          console.log("error");
        });
      }
    };
    const __returned__ = { appsStore, flipperStore, props, onClick };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QBtn, {
    class: "text-pixelated fit text-body1",
    unelevated: "",
    dense: "",
    color: "accent",
    label: "Open",
    onClick: withModifiers($setup.onClick, ["stop"]),
    loading: $setup.props.loading
  }, null, 8, ["loading"]);
}
const AppOpenAppBtn = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$b], ["__file", "button.vue"]]);
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "button",
  props: {
    app: {},
    loading: { type: Boolean, default: false }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const appsStore = useAppsStore();
    const props = __props;
    const onClick = () => {
      if (props.app) {
        appsStore.onAction(props.app, "update");
      }
    };
    const __returned__ = { appsStore, props, onClick };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QBtn, {
    class: "text-pixelated fit text-body1",
    unelevated: "",
    dense: "",
    color: "positive",
    label: "Update",
    onClick: withModifiers($setup.onClick, ["stop"]),
    loading: $setup.props.loading
  }, null, 8, ["loading"]);
}
const AppUpdateBtn = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$a], ["__file", "button.vue"]]);
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "button",
  props: {
    app: {},
    loading: { type: Boolean, default: false }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const appsStore = useAppsStore();
    const deleteConfirmationDialog = ref(false);
    const showDialog = () => {
      deleteConfirmationDialog.value = true;
    };
    const props = __props;
    const onClick = () => {
      if (props.app) {
        appsStore.onAction(props.app, "delete");
      }
    };
    const __returned__ = { appsStore, deleteConfirmationDialog, showDialog, props, onClick };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$5 = { class: "flex no-wrap items-center" };
const _hoisted_2$4 = { class: "app-icon q-mr-md" };
const _hoisted_3$3 = { class: "column items-start" };
const _hoisted_4$3 = {
  class: "q-ma-none",
  style: { "line-height": "1.5em", "margin-bottom": "0.25rem" }
};
const _hoisted_5$2 = {
  key: 0,
  class: "text-grey-7 q-ma-none"
};
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QBtn, {
    class: "button fit",
    padding: "xs",
    color: "negative",
    outline: "",
    icon: "flipper:delete",
    onClick: withModifiers($setup.showDialog, ["stop"]),
    loading: $setup.props.loading
  }, {
    default: withCtx(() => [
      createVNode(QDialog, {
        modelValue: $setup.deleteConfirmationDialog,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.deleteConfirmationDialog = $event)
      }, {
        default: withCtx(() => [
          createVNode(QCard, {
            class: "dialog",
            style: { "min-width": "300px" }
          }, {
            default: withCtx(() => [
              createVNode(QCardSection, { class: "q-pb-none" }, {
                default: withCtx(() => _cache[1] || (_cache[1] = [
                  createBaseVNode("h6", { class: "q-ma-none" }, "Delete this app?", -1)
                ])),
                _: 1,
                __: [1]
              }),
              createVNode(QCardSection, { class: "q-pt-none q-my-md text-center" }, {
                default: withCtx(() => {
                  var _a, _b, _c, _d, _e;
                  return [
                    createBaseVNode("div", _hoisted_1$5, [
                      createBaseVNode("div", _hoisted_2$4, [
                        createVNode(QImg, {
                          src: (_b = (_a = $props.app.currentVersion) == null ? void 0 : _a.iconUri) != null ? _b : `data:image/png;base64,${$props.app.icon}`,
                          "error-src": `data:image/png;base64,${$props.app.icon}`,
                          width: "50px",
                          style: { "image-rendering": "pixelated" }
                        }, null, 8, ["src", "error-src"])
                      ]),
                      createBaseVNode("div", _hoisted_3$3, [
                        createBaseVNode("h6", _hoisted_4$3, toDisplayString((_d = (_c = $props.app.currentVersion) == null ? void 0 : _c.name) != null ? _d : $props.app.name), 1),
                        ((_e = $props.app.currentVersion) == null ? void 0 : _e.version) ? (openBlock(), createElementBlock("p", _hoisted_5$2, [
                          createBaseVNode("b", null, "v" + toDisplayString($props.app.currentVersion.version), 1)
                        ])) : createCommentVNode("", true)
                      ])
                    ])
                  ];
                }),
                _: 1
              }),
              createVNode(QCardActions, {
                class: "q-pt-none",
                align: "between"
              }, {
                default: withCtx(() => [
                  withDirectives(createVNode(QBtn, {
                    class: "col q-mr-md",
                    flat: "",
                    "text-color": "dark",
                    label: "Cancel"
                  }, null, 512), [
                    [ClosePopup]
                  ]),
                  withDirectives(createVNode(QBtn, {
                    class: "col",
                    outline: "",
                    color: "negative",
                    label: "Delete",
                    onClick: $setup.onClick
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
      }, 8, ["modelValue"])
    ]),
    _: 1
  }, 8, ["loading"]);
}
const AppDeleteBtn = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9], ["__file", "button.vue"]]);
const screenshotWidth = 248 + 4 + 8 + 8;
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "Detail",
  setup(__props, { expose: __expose }) {
    __expose();
    const appsStore = useAppsStore();
    const flipperStore = useFlipperStore();
    const { fetchAppById, submitAppReport } = api;
    const route = useRoute();
    const router = useRouter();
    const currentApp = ref(void 0);
    const categoriesStore = useCategoriesStore();
    const getCategories = async () => {
      if (!categoriesStore.categories.length || flipperStore.api !== categoriesStore.lastApi || flipperStore.target !== categoriesStore.lastTarget) {
        await categoriesStore.getCategories({
          api: flipperStore.api,
          target: flipperStore.target
        });
      }
    };
    watch(
      () => flipperStore.flipperReady,
      async () => {
        await getCategories();
      }
    );
    const init = async () => {
      await getCurrentApp();
      await getCategories();
      if (currentApp.value) {
        getAppAction(currentApp.value);
      }
    };
    const getAppAction = (app) => {
      const actionApp = appsStore.actionAppList.find((_app) => {
        if (_app.id === app.id) {
          return true;
        }
        return false;
      });
      if (actionApp) {
        app.action = actionApp.action;
      }
    };
    onMounted(async () => {
      var _a, _b, _c, _d;
      if (flipperStore.flipperReady) {
        if (!flipperStore.rpcActive) {
          await ((_a = flipperStore.flipper) == null ? void 0 : _a.startRPCSession());
        }
        if (((_b = flipperStore.flipper) == null ? void 0 : _b.readingMode.type) === "rpc") {
          if (!flipperStore.info) {
            await ((_c = flipperStore.flipper) == null ? void 0 : _c.getInfo());
          }
          await init();
          if (!appsStore.loadingInstalledApps && !((_d = appsStore.flipperInstalledApps) == null ? void 0 : _d.length)) {
            await appsStore.getInstalledApps({
              refreshInstalledApps: true
            });
          }
        }
      } else {
        await init();
      }
    });
    watch(
      () => appsStore.flags.catalogChannelProduction,
      async () => {
        await init();
        if (!flipperStore.flipper) {
          await appsStore.getInstalledApps({
            refreshInstalledApps: true
          });
        }
      }
    );
    const loading = ref(true);
    const getCurrentApp = async () => {
      loading.value = true;
      currentApp.value = await fetchAppById({
        id: route.params.path,
        api: flipperStore.api,
        target: flipperStore.target
      });
      loading.value = false;
    };
    watch(
      () => flipperStore.flipperReady,
      () => {
        getCurrentApp();
      }
    );
    watch(
      () => route.params.path,
      () => {
        getCurrentApp();
      }
    );
    const isInstalledOrUpdate = computed(() => {
      return currentApp.value && (appsStore.getButtonState(currentApp.value) === "installed" || appsStore.getButtonState(currentApp.value) === "update");
    });
    const statusHints = {
      READY: {
        text: "Runs on latest firmware release",
        icon: "mdi-check-circle-outline",
        color: "light-green-2"
      },
      BUILD_RUNNING: {
        text: "App is rebuilding",
        icon: "mdi-alert-circle-outline",
        color: "yellow-2",
        tooltip: "This may take some time, come back later"
      },
      FLIPPER_OUTDATED: {
        text: "Flipper firmware is outdated",
        icon: "mdi-alert-circle-outline",
        color: "deep-orange-2",
        dialog: "outdatedFirmwareDialog"
      },
      UNSUPPORTED_APPLICATION: {
        text: "Outdated app",
        icon: "mdi-alert-circle-outline",
        color: "deep-orange-2",
        dialog: "outdatedAppDialog"
      },
      UNSUPPORTED_SDK: {
        text: "Unsupported SDK",
        icon: "mdi-alert-circle-outline",
        color: "deep-orange-2",
        dialog: "outdatedFirmwareDialog"
      }
    };
    const getStatusHint = computed(() => {
      if (currentApp.value) {
        return statusHints[currentApp.value.currentVersion.status];
      }
      return null;
    });
    const showDialog = (dialog) => {
      if (dialog) {
        appsStore.dialogs[dialog] = true;
      }
    };
    const category = computed(
      () => {
        var _a;
        return (_a = categoriesStore.categories) == null ? void 0 : _a.find((e) => {
          var _a2;
          return e.id === ((_a2 = currentApp.value) == null ? void 0 : _a2.categoryId);
        });
      }
    );
    const goCategory = () => {
      if (category.value) {
        router.push({
          name: "AppsCategory",
          params: { path: category.value.name.toLowerCase() }
        });
      } else {
        router.push({ name: "Apps" });
      }
    };
    const scrollAreaRef = ref();
    const position = ref(0);
    const animateScroll = (direction) => {
      if (!scrollAreaRef.value || !currentApp.value) {
        return;
      }
      const width = scrollAreaRef.value.$el.offsetWidth;
      const numberOfScreenshots = currentApp.value.currentVersion.screenshots.length;
      const screenshotsOnScreen = Math.floor(width / screenshotWidth) || 1;
      if (numberOfScreenshots) {
        if (direction === "forward") {
          if (position.value + screenshotWidth * screenshotsOnScreen < screenshotWidth * numberOfScreenshots) {
            position.value = position.value + screenshotWidth;
          }
        }
        if (direction === "backward") {
          if (position.value < 0) {
            position.value = 0;
          } else {
            position.value = position.value - screenshotWidth;
          }
        }
        scrollAreaRef.value.setScrollPosition("horizontal", position.value, 300);
      }
    };
    const reportDialog = ref(false);
    const reportSubmitted = ref(false);
    const report = reactive({
      description_type: "",
      description: ""
    });
    const reportOptions = ["bug", "report"];
    const showReportDialog = () => {
      reportDialog.value = true;
    };
    const sendReport = async () => {
      if (currentApp.value) {
        await submitAppReport({
          id: currentApp.value.id,
          report
        });
      }
      reportSubmitted.value = true;
    };
    const __returned__ = { appsStore, flipperStore, fetchAppById, submitAppReport, route, router, currentApp, categoriesStore, getCategories, init, getAppAction, loading, getCurrentApp, isInstalledOrUpdate, statusHints, getStatusHint, showDialog, category, goCategory, scrollAreaRef, screenshotWidth, position, animateScroll, reportDialog, reportSubmitted, report, reportOptions, showReportDialog, sendReport, get AppInstallBtn() {
      return AppInstallBtn;
    }, get AppOpenAppBtn() {
      return AppOpenAppBtn;
    }, get AppUpdateBtn() {
      return AppUpdateBtn;
    }, get AppDeleteBtn() {
      return AppDeleteBtn;
    }, get ProgressBar() {
      return ProgressBar;
    }, get Loading() {
      return Loading;
    }, get AppInstalledBtn() {
      return AppInstalledBtn;
    }, get AppOutdatedAppDialog() {
      return AppOutdatedAppDialog;
    }, get CategoryChip() {
      return CategoryChip;
    }, get bytesToSize() {
      return bytesToSize;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$4 = { class: "app" };
const _hoisted_2$3 = { class: "row items-center q-mb-lg" };
const _hoisted_3$2 = { class: "row col" };
const _hoisted_4$2 = { class: "app__icon-wrapper q-mr-md" };
const _hoisted_5$1 = { class: "col" };
const _hoisted_6$1 = { class: "text-h6 q-ma-none q-mb-xs" };
const _hoisted_7$1 = { class: "row items-center q-gutter-x-md" };
const _hoisted_8$1 = { class: "q-mb-none" };
const _hoisted_9 = { class: "text-bold" };
const _hoisted_10 = { class: "q-mb-none" };
const _hoisted_11 = { class: "text-bold" };
const _hoisted_12 = { class: "q-py-sm row no-wrap" };
const _hoisted_13 = {
  key: 0,
  class: "col-auto fit"
};
const _hoisted_14 = {
  key: 0,
  class: "col-auto"
};
const _hoisted_15 = {
  class: "row q-mb-lg",
  style: { "height": "140px" }
};
const _hoisted_16 = { class: "app__screenshot-wrapper row no-wrap" };
const _hoisted_17 = { class: "q-mb-lg" };
const _hoisted_18 = ["href"];
const _hoisted_19 = ["href"];
const _hoisted_20 = {
  key: 0,
  class: "text-positive q-ma-none q-mt-md"
};
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  var _a;
  const _component_q_markdown = resolveComponent("q-markdown");
  return openBlock(), createElementBlock("div", _hoisted_1$4, [
    $setup.loading ? (openBlock(), createBlock($setup["Loading"], {
      key: 0,
      label: "Loading app..."
    })) : $setup.currentApp ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
      createBaseVNode("div", _hoisted_2$3, [
        createBaseVNode("div", _hoisted_3$2, [
          createBaseVNode("div", _hoisted_4$2, [
            createVNode(QImg, {
              src: $setup.currentApp.currentVersion.iconUri,
              style: { "image-rendering": "pixelated" }
            }, null, 8, ["src"])
          ]),
          createBaseVNode("div", _hoisted_5$1, [
            createBaseVNode("h2", _hoisted_6$1, toDisplayString($setup.currentApp.currentVersion.name), 1),
            createBaseVNode("div", _hoisted_7$1, [
              createBaseVNode("div", null, [
                $setup.category ? (openBlock(), createBlock($setup["CategoryChip"], mergeProps({ key: 0 }, $setup.category, {
                  onClick: $setup.goCategory,
                  isCurrentCategory: ""
                }), null, 16)) : createCommentVNode("", true)
              ]),
              createBaseVNode("p", _hoisted_8$1, [
                _cache[7] || (_cache[7] = createBaseVNode("span", { class: "text-grey-7 q-mr-xs" }, "Version:", -1)),
                createBaseVNode("span", _hoisted_9, toDisplayString($setup.currentApp.currentVersion.version), 1)
              ]),
              createBaseVNode("p", _hoisted_10, [
                _cache[8] || (_cache[8] = createBaseVNode("span", { class: "text-grey-7 q-mr-xs" }, "Size:", -1)),
                createBaseVNode("span", _hoisted_11, toDisplayString($setup.bytesToSize(
                  $setup.currentApp.currentVersion.currentBuild.metadata.length
                )), 1)
              ]),
              $setup.getStatusHint ? (openBlock(), createBlock(QChip, {
                key: 0,
                class: normalizeClass({ "no-pointer-events": !$setup.getStatusHint.dialog }),
                color: $setup.getStatusHint.color,
                icon: $setup.getStatusHint.icon,
                label: $setup.getStatusHint.text,
                clickable: !!$setup.getStatusHint.dialog,
                onClick: _cache[0] || (_cache[0] = ($event) => $setup.showDialog($setup.getStatusHint.dialog))
              }, {
                default: withCtx(() => [
                  $setup.getStatusHint.tooltip ? (openBlock(), createBlock(QTooltip, { key: 0 }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString($setup.getStatusHint.tooltip), 1)
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["class", "color", "icon", "label", "clickable"])) : createCommentVNode("", true)
            ])
          ])
        ]),
        createVNode(QSpace),
        createBaseVNode("div", _hoisted_12, [
          ((_a = $setup.currentApp.action) == null ? void 0 : _a.type) ? (openBlock(), createElementBlock("div", _hoisted_13, [
            createVNode($setup["ProgressBar"], {
              style: { "width": "188px" },
              title: $setup.currentApp.action.progress * 100 + "%",
              titleSize: "40px",
              progress: $setup.currentApp.action.progress,
              color: $setup.appsStore.progressColors($setup.currentApp.action.type).bar,
              "track-color": $setup.appsStore.progressColors($setup.currentApp.action.type).track,
              interpolated: "",
              size: "54px"
            }, null, 8, ["title", "progress", "color", "track-color"])
          ])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createBaseVNode("div", {
              class: normalizeClass(["col-auto", { "q-mr-md": $setup.isInstalledOrUpdate }])
            }, [
              $setup.appsStore.getButtonState($setup.currentApp) === "unsupported" ? (openBlock(), createBlock($setup["AppInstalledBtn"], {
                key: 0,
                size: "22px",
                padding: "15px 60px"
              })) : $setup.appsStore.getButtonState($setup.currentApp) === "installed" ? (openBlock(), createBlock($setup["AppOpenAppBtn"], {
                key: 1,
                app: $setup.appsStore.getAppPath($setup.currentApp),
                size: "22px",
                padding: "15px 60px"
              }, null, 8, ["app"])) : $setup.appsStore.getButtonState($setup.currentApp) === "update" ? (openBlock(), createBlock($setup["AppUpdateBtn"], {
                key: 2,
                app: $setup.currentApp,
                loading: $setup.appsStore.loadingInstalledApps,
                size: "22px",
                padding: "15px 60px"
              }, null, 8, ["app", "loading"])) : (openBlock(), createBlock($setup["AppInstallBtn"], {
                key: 3,
                app: $setup.currentApp,
                loading: $setup.appsStore.loadingInstalledApps,
                size: "22px",
                padding: "15px 60px"
              }, null, 8, ["app", "loading"]))
            ], 2),
            $setup.isInstalledOrUpdate ? (openBlock(), createElementBlock("div", _hoisted_14, [
              createVNode($setup["AppDeleteBtn"], {
                app: $setup.currentApp,
                size: "16px",
                padding: "15px"
              }, null, 8, ["app"])
            ])) : createCommentVNode("", true)
          ], 64))
        ])
      ]),
      createBaseVNode("div", _hoisted_15, [
        createVNode(QBtn, {
          flat: "",
          dense: "",
          color: "primary",
          icon: "mdi-chevron-left",
          onClick: _cache[1] || (_cache[1] = ($event) => $setup.animateScroll("backward"))
        }),
        createVNode(QScrollArea, {
          ref: "scrollAreaRef",
          class: "row col no-wrap no-pointer-events q-mx-sm",
          "thumb-style": { display: "none" }
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_16, [
              (openBlock(true), createElementBlock(Fragment, null, renderList($setup.currentApp.currentVersion.screenshots, (screenshot, index) => {
                return openBlock(), createElementBlock("div", {
                  key: index,
                  class: "app__image-wrapper bg-primary q-pa-xs q-mx-xs"
                }, [
                  createVNode(QImg, {
                    class: "app__image",
                    ratio: 256 / 128,
                    src: screenshot,
                    style: { "width": "248px" }
                  }, null, 8, ["src"])
                ]);
              }), 128))
            ])
          ]),
          _: 1
        }, 512),
        createVNode(QBtn, {
          flat: "",
          dense: "",
          color: "primary",
          icon: "mdi-chevron-right",
          onClick: _cache[2] || (_cache[2] = ($event) => $setup.animateScroll("forward"))
        })
      ]),
      createBaseVNode("div", _hoisted_17, [
        _cache[12] || (_cache[12] = createBaseVNode("h5", { class: "text-h5 q-my-sm" }, "Description", -1)),
        createVNode(_component_q_markdown, {
          "no-heading-anchor-links": "",
          "no-html": "",
          "no-image": "",
          "no-link": "",
          "no-linkify": "",
          "no-typographer": "",
          src: $setup.currentApp.currentVersion.shortDescription
        }, null, 8, ["src"]),
        createVNode(_component_q_markdown, {
          "no-heading-anchor-links": "",
          "no-html": "",
          "no-image": "",
          "no-typographer": "",
          src: $setup.currentApp.currentVersion.description
        }, null, 8, ["src"]),
        _cache[13] || (_cache[13] = createBaseVNode("h5", { class: "text-h5 q-my-sm" }, "Changelog", -1)),
        createVNode(_component_q_markdown, {
          "no-heading-anchor-links": "",
          "no-html": "",
          "no-image": "",
          "no-typographer": "",
          src: $setup.currentApp.currentVersion.changelog
        }, null, 8, ["src"]),
        _cache[14] || (_cache[14] = createBaseVNode("h5", { class: "text-h6 q-my-sm" }, "Developer", -1)),
        createBaseVNode("p", null, [
          createBaseVNode("a", {
            class: "text-grey-7",
            href: $setup.currentApp.currentVersion.links.manifestUri,
            target: "_blank",
            style: { "text-decoration": "none" }
          }, [
            createVNode(QIcon, {
              name: "mdi-github",
              color: "grey-7",
              size: "20px"
            }),
            _cache[9] || (_cache[9] = createBaseVNode("span", {
              class: "q-ml-xs",
              style: { "text-decoration": "underline" }
            }, "Manifest", -1))
          ], 8, _hoisted_18),
          _cache[11] || (_cache[11] = createBaseVNode("br", null, null, -1)),
          createBaseVNode("a", {
            class: "text-grey-7",
            href: $setup.currentApp.currentVersion.links.sourceCode.uri,
            target: "_blank",
            style: { "text-decoration": "none" }
          }, [
            createVNode(QIcon, {
              name: "mdi-github",
              color: "grey-7",
              size: "20px"
            }),
            _cache[10] || (_cache[10] = createBaseVNode("span", {
              class: "q-ml-xs",
              style: { "text-decoration": "underline" }
            }, "Repository", -1))
          ], 8, _hoisted_19)
        ])
      ]),
      createVNode(QBtn, {
        "no-caps": "",
        outline: "",
        color: "negative",
        icon: "mdi-alert-circle-outline",
        label: "Report app",
        onClick: $setup.showReportDialog
      }),
      createVNode($setup["AppOutdatedAppDialog"], {
        modelValue: $setup.appsStore.dialogs.outdatedAppDialog,
        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.appsStore.dialogs.outdatedAppDialog = $event),
        href: $setup.currentApp.currentVersion.links.manifestUri
      }, null, 8, ["modelValue", "href"]),
      createVNode(QDialog, {
        modelValue: $setup.reportDialog,
        "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.reportDialog = $event)
      }, {
        default: withCtx(() => [
          createVNode(QCard, {
            class: "dialog",
            style: { "min-width": "300px" }
          }, {
            default: withCtx(() => [
              createVNode(QCardSection, { class: "q-pb-none" }, {
                default: withCtx(() => _cache[15] || (_cache[15] = [
                  createBaseVNode("h6", { class: "q-ma-none" }, "Report app", -1)
                ])),
                _: 1,
                __: [15]
              }),
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  createVNode(QSelect, {
                    modelValue: $setup.report.description_type,
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.report.description_type = $event),
                    options: $setup.reportOptions,
                    label: "What do you want to submit?"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              $setup.report.description_type === "bug" ? (openBlock(), createBlock(QCardSection, { key: 0 }, {
                default: withCtx(() => _cache[16] || (_cache[16] = [
                  createTextVNode(" Sorry, we don't provide support for third-party apps.", -1),
                  createBaseVNode("br", null, null, -1),
                  createTextVNode(" You can file an issue on Github or contact the app developer. ", -1)
                ])),
                _: 1,
                __: [16]
              })) : createCommentVNode("", true),
              $setup.report.description_type === "report" ? (openBlock(), createBlock(QCardSection, { key: 1 }, {
                default: withCtx(() => [
                  createVNode(QInput, {
                    modelValue: $setup.report.description,
                    "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.report.description = $event),
                    placeholder: "Describe your problem",
                    autogrow: ""
                  }, null, 8, ["modelValue"]),
                  $setup.reportSubmitted ? (openBlock(), createElementBlock("p", _hoisted_20, " We received your report. Thank you for the feedback! ")) : createCommentVNode("", true)
                ]),
                _: 1
              })) : createCommentVNode("", true),
              createVNode(QCardActions, { align: "right" }, {
                default: withCtx(() => [
                  withDirectives(createVNode(QBtn, {
                    flat: "",
                    "text-color": "dark",
                    class: "q-mr-md",
                    label: "Cancel"
                  }, null, 512), [
                    [ClosePopup]
                  ]),
                  !$setup.report.description_type || $setup.report.description_type === "report" ? (openBlock(), createBlock(QBtn, {
                    key: 0,
                    outline: "",
                    color: "primary",
                    label: "Send",
                    disabled: $setup.reportSubmitted || !$setup.report.description,
                    onClick: $setup.sendReport
                  }, null, 8, ["disabled"])) : createCommentVNode("", true),
                  $setup.report.description_type === "bug" ? withDirectives((openBlock(), createBlock(QBtn, {
                    key: 1,
                    outline: "",
                    color: "primary",
                    label: "View on Github",
                    href: $setup.currentApp.currentVersion.links.manifestUri,
                    target: "_blank"
                  }, null, 8, ["href"])), [
                    [ClosePopup]
                  ]) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["modelValue"])
    ], 64)) : createCommentVNode("", true)
  ]);
}
const AppDetail = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8], ["__file", "Detail.vue"]]);
const _sfc_main$7 = {
  __name: "App",
  setup(__props, { expose: __expose }) {
    __expose();
    const __returned__ = { get AppDetail() {
      return AppDetail;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QPage, { padding: "" }, {
    default: withCtx(() => [
      createVNode($setup["AppDetail"])
    ]),
    _: 1
  });
}
const App = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7], ["__file", "App.vue"]]);
const defaultCfg = {
  threshold: 0,
  root: null,
  rootMargin: "0px"
};
function update(el, ctx, value) {
  var _a;
  let handler, cfg, changed;
  if (typeof value === "function") {
    handler = value;
    cfg = defaultCfg;
    changed = ctx.cfg === void 0;
  } else {
    handler = value.handler;
    cfg = Object.assign({}, defaultCfg, value.cfg);
    changed = ctx.cfg === void 0 || isDeepEqual(ctx.cfg, cfg) === false;
  }
  if (ctx.handler !== handler) {
    ctx.handler = handler;
  }
  if (changed === true) {
    ctx.cfg = cfg;
    (_a = ctx.observer) == null ? void 0 : _a.unobserve(el);
    ctx.observer = new IntersectionObserver(([entry]) => {
      if (typeof ctx.handler === "function") {
        if (entry.rootBounds === null && document.body.contains(el) === true) {
          ctx.observer.unobserve(el);
          ctx.observer.observe(el);
          return;
        }
        const res = ctx.handler(entry, ctx.observer);
        if (res === false || ctx.once === true && entry.isIntersecting === true) {
          destroy(el);
        }
      }
    }, cfg);
    ctx.observer.observe(el);
  }
}
function destroy(el) {
  var _a;
  const ctx = el.__qvisible;
  if (ctx !== void 0) {
    (_a = ctx.observer) == null ? void 0 : _a.unobserve(el);
    delete el.__qvisible;
  }
}
const Intersection = createDirective(
  {
    name: "intersection",
    mounted(el, { modifiers, value }) {
      const ctx = {
        once: modifiers.once === true
      };
      update(el, ctx, value);
      el.__qvisible = ctx;
    },
    updated(el, binding) {
      const ctx = el.__qvisible;
      ctx !== void 0 && update(el, ctx, binding.value);
    },
    beforeUnmount: destroy
  }
);
const QIntersection = createComponent({
  name: "QIntersection",
  props: {
    tag: {
      type: String,
      default: "div"
    },
    once: Boolean,
    transition: String,
    transitionDuration: {
      type: [String, Number],
      default: 300
    },
    ssrPrerender: Boolean,
    margin: String,
    threshold: [Number, Array],
    root: {
      default: null
    },
    disable: Boolean,
    onVisibility: Function
  },
  setup(props, { slots, emit }) {
    const showing = ref(isRuntimeSsrPreHydration.value === true ? props.ssrPrerender : false);
    const intersectionProps = computed(() => props.root !== void 0 || props.margin !== void 0 || props.threshold !== void 0 ? {
      handler: trigger,
      cfg: {
        root: props.root,
        rootMargin: props.margin,
        threshold: props.threshold
      }
    } : trigger);
    const hasDirective = computed(
      () => props.disable !== true && (isRuntimeSsrPreHydration.value !== true || props.once !== true || props.ssrPrerender !== true)
    );
    const directives = computed(() => {
      return [[
        Intersection,
        intersectionProps.value,
        void 0,
        { once: props.once }
      ]];
    });
    const transitionStyle = computed(
      () => `--q-transition-duration: ${props.transitionDuration}ms`
    );
    function trigger(entry) {
      if (showing.value !== entry.isIntersecting) {
        showing.value = entry.isIntersecting;
        props.onVisibility !== void 0 && emit("visibility", showing.value);
      }
    }
    function getContent() {
      if (showing.value === true) {
        return [h("div", { key: "content", style: transitionStyle.value }, hSlot(slots.default))];
      }
      if (slots.hidden !== void 0) {
        return [h("div", { key: "hidden", style: transitionStyle.value }, slots.hidden())];
      }
    }
    return () => {
      const child = props.transition ? [
        h(Transition, {
          name: "q-transition--" + props.transition
        }, getContent)
      ] : getContent();
      return hDir(
        props.tag,
        { class: "q-intersection" },
        child,
        "main",
        hasDirective.value,
        () => directives.value
      );
    };
  }
});
const { passive } = listenOpts;
const QInfiniteScroll = createComponent({
  name: "QInfiniteScroll",
  props: {
    offset: {
      type: Number,
      default: 500
    },
    debounce: {
      type: [String, Number],
      default: 100
    },
    scrollTarget: scrollTargetProp,
    initialIndex: {
      type: Number,
      default: 0
    },
    disable: Boolean,
    reverse: Boolean
  },
  emits: ["load"],
  setup(props, { slots, emit }) {
    const isFetching = ref(false);
    const isWorking = ref(true);
    const rootRef = ref(null);
    const loadingRef = ref(null);
    let index = props.initialIndex;
    let localScrollTarget, poll;
    const classes = computed(
      () => "q-infinite-scroll__loading" + (isFetching.value === true ? "" : " invisible")
    );
    function immediatePoll() {
      if (props.disable === true || isFetching.value === true || isWorking.value === false) return;
      const scrollHeight = getScrollHeight(localScrollTarget), scrollPosition = getVerticalScrollPosition(localScrollTarget), containerHeight = height(localScrollTarget);
      if (props.reverse === false) {
        if (Math.round(scrollPosition + containerHeight + props.offset) >= Math.round(scrollHeight)) {
          trigger();
        }
      } else if (Math.round(scrollPosition) <= props.offset) {
        trigger();
      }
    }
    function trigger() {
      if (props.disable === true || isFetching.value === true || isWorking.value === false) return;
      index++;
      isFetching.value = true;
      const heightBefore = getScrollHeight(localScrollTarget);
      emit("load", index, (isDone) => {
        if (isWorking.value === true) {
          isFetching.value = false;
          nextTick(() => {
            if (props.reverse === true) {
              const heightAfter = getScrollHeight(localScrollTarget), scrollPosition = getVerticalScrollPosition(localScrollTarget), heightDifference = heightAfter - heightBefore;
              setVerticalScrollPosition(localScrollTarget, scrollPosition + heightDifference);
            }
            if (isDone === true) {
              stop();
            } else if (rootRef.value) {
              rootRef.value.closest("body") && poll();
            }
          });
        }
      });
    }
    function reset() {
      index = 0;
    }
    function resume() {
      if (isWorking.value === false) {
        isWorking.value = true;
        localScrollTarget.addEventListener("scroll", poll, passive);
      }
      immediatePoll();
    }
    function stop() {
      var _a;
      if (isWorking.value === true) {
        isWorking.value = false;
        isFetching.value = false;
        localScrollTarget.removeEventListener("scroll", poll, passive);
        (_a = poll == null ? void 0 : poll.cancel) == null ? void 0 : _a.call(poll);
      }
    }
    function updateScrollTarget() {
      if (localScrollTarget && isWorking.value === true) {
        localScrollTarget.removeEventListener("scroll", poll, passive);
      }
      localScrollTarget = getScrollTarget(rootRef.value, props.scrollTarget);
      if (isWorking.value === true) {
        localScrollTarget.addEventListener("scroll", poll, passive);
        if (props.reverse === true) {
          const scrollHeight = getScrollHeight(localScrollTarget), containerHeight = height(localScrollTarget);
          setVerticalScrollPosition(localScrollTarget, scrollHeight - containerHeight);
        }
        immediatePoll();
      }
    }
    function setIndex(newIndex) {
      index = newIndex;
    }
    function setDebounce(val) {
      val = parseInt(val, 10);
      const oldPoll = poll;
      poll = val <= 0 ? immediatePoll : debounce(immediatePoll, isNaN(val) === true ? 100 : val);
      if (localScrollTarget && isWorking.value === true) {
        if (oldPoll !== void 0) {
          localScrollTarget.removeEventListener("scroll", oldPoll, passive);
        }
        localScrollTarget.addEventListener("scroll", poll, passive);
      }
    }
    function updateSvgAnimations(isRetry) {
      if (renderLoadingSlot.value === true) {
        if (loadingRef.value === null) {
          isRetry !== true && nextTick(() => {
            updateSvgAnimations(true);
          });
          return;
        }
        const action = `${isFetching.value === true ? "un" : ""}pauseAnimations`;
        Array.from(loadingRef.value.getElementsByTagName("svg")).forEach((el) => {
          el[action]();
        });
      }
    }
    const renderLoadingSlot = computed(() => props.disable !== true && isWorking.value === true);
    watch([isFetching, renderLoadingSlot], () => {
      updateSvgAnimations();
    });
    watch(() => props.disable, (val) => {
      if (val === true) {
        stop();
      } else {
        resume();
      }
    });
    watch(() => props.reverse, () => {
      if (isFetching.value === false && isWorking.value === true) {
        immediatePoll();
      }
    });
    watch(() => props.scrollTarget, updateScrollTarget);
    watch(() => props.debounce, setDebounce);
    let scrollPos = false;
    onActivated(() => {
      if (scrollPos !== false && localScrollTarget) {
        setVerticalScrollPosition(localScrollTarget, scrollPos);
      }
    });
    onDeactivated(() => {
      scrollPos = localScrollTarget ? getVerticalScrollPosition(localScrollTarget) : false;
    });
    onBeforeUnmount(() => {
      if (isWorking.value === true) {
        localScrollTarget.removeEventListener("scroll", poll, passive);
      }
    });
    onMounted(() => {
      setDebounce(props.debounce);
      updateScrollTarget();
      isFetching.value === false && updateSvgAnimations();
    });
    const vm = getCurrentInstance();
    Object.assign(vm.proxy, {
      poll: () => {
        poll == null ? void 0 : poll();
      },
      trigger,
      stop,
      reset,
      resume,
      setIndex,
      updateScrollTarget
    });
    return () => {
      const child = hUniqueSlot(slots.default, []);
      if (renderLoadingSlot.value === true) {
        child[props.reverse === false ? "push" : "unshift"](
          h("div", { ref: loadingRef, class: classes.value }, hSlot(slots.loading))
        );
      }
      return h("div", {
        class: "q-infinite-scroll",
        ref: rootRef
      }, child);
    };
  }
});
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "List",
  emits: ["categorySelected"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const router = useRouter();
    const flipperStore = useFlipperStore();
    const appsStore = useAppsStore();
    const categoriesStore = useCategoriesStore();
    const emit = __emit;
    const getCategories = async () => {
      if (!categoriesStore.categories.length || flipperStore.api !== categoriesStore.lastApi || flipperStore.target !== categoriesStore.lastTarget) {
        await categoriesStore.getCategories({
          api: flipperStore.api,
          target: flipperStore.target
        });
      }
    };
    const categories = computed(() => [
      {
        name: "All apps",
        color: "EBEBEB",
        id: "-1"
      },
      ...categoriesStore.categories
    ]);
    onMounted(async () => {
      await getCategories();
    });
    watch(
      () => flipperStore.flipperReady,
      async () => {
        categoriesStore.categories = [];
        await getCategories();
        emit("categorySelected");
      }
    );
    watch(
      () => appsStore.flags.catalogChannelProduction,
      async () => {
        categoriesStore.categories = [];
        await getCategories();
        emit("categorySelected");
      }
    );
    const onClick = (category) => {
      categoriesStore.setCurrentCategory(
        category.id !== "-1" ? category : void 0
      );
      if (categoriesStore.currentCategory) {
        router.push({
          name: "AppsCategory",
          params: { path: categoriesStore.currentCategory.name.toLowerCase() }
        });
      } else {
        router.push({ name: "Apps" });
      }
      emit("categorySelected");
    };
    const __returned__ = { router, flipperStore, appsStore, categoriesStore, emit, getCategories, categories, onClick, get CategoryChip() {
      return CategoryChip;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QList, { class: "row q-col-gutter-sm" }, {
    default: withCtx(() => [
      (openBlock(true), createElementBlock(Fragment, null, renderList($setup.categories, (category) => {
        var _a;
        return openBlock(), createElementBlock("div", {
          class: "col-auto",
          key: category.id
        }, [
          createVNode($setup["CategoryChip"], mergeProps({ ref_for: true }, category, {
            isCurrentCategory: !$setup.categoriesStore.currentCategory || category.id === ((_a = $setup.categoriesStore.currentCategory) == null ? void 0 : _a.id),
            onClick: ($event) => $setup.onClick(category)
          }), null, 16, ["isCurrentCategory", "onClick"])
        ]);
      }), 128))
    ]),
    _: 1
  });
}
const CategoriesList = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6], ["__file", "List.vue"]]);
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "InstallAll",
  props: {
    disabled: { type: Boolean, default: false }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const flipperStore = useFlipperStore();
    const appsStore = useAppsStore();
    const { fetchAppsShort } = api;
    const loading = ref(false);
    const fetchEnd = ref(true);
    const apps = ref([]);
    const limit = ref(48);
    const offset = ref(0);
    const fetch = async () => {
      return await fetchAppsShort({
        limit: limit.value,
        offset: offset.value,
        api: flipperStore.api || void 0,
        target: flipperStore.target || void 0
      }).then(async (newApps) => {
        if (!newApps) {
          fetchEnd.value = true;
          return;
        }
        if (!newApps.length) {
          fetchEnd.value = true;
        }
        if (newApps.length < limit.value) {
          fetchEnd.value = true;
        }
        newApps = newApps.filter((app) => {
          if (appsStore.getButtonState(app) === "installed") {
            return false;
          }
          return true;
        });
        if (newApps.length) {
          apps.value.push(...newApps);
        }
        offset.value += limit.value;
      });
    };
    const onClick = async () => {
      fetchEnd.value = false;
      offset.value = 0;
      apps.value = [];
      loading.value = true;
      while (!fetchEnd.value) {
        await fetch();
      }
      loading.value = false;
      if (apps.value.length) {
        appsStore.installationBatch.inProcess = true;
        appsStore.installationBatch.totalCount = apps.value.length;
        appsStore.installationBatch.doneCount = 0;
        for (let index = 0; index < apps.value.length; index++) {
          const app = apps.value[index];
          try {
            if (appsStore.getButtonState(app) === "install") {
              appsStore.onAction(app, "install");
            }
            if (appsStore.getButtonState(app) === "update") {
              appsStore.onAction(app, "update");
            }
          } catch (error) {
            console.error(error);
            appsStore.installationBatch.failed.push({
              id: app.id,
              name: app.currentVersion.name
            });
          }
        }
      }
    };
    const __returned__ = { flipperStore, appsStore, fetchAppsShort, loading, fetchEnd, apps, limit, offset, fetch, onClick, get ProgressBar() {
      return ProgressBar;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [
    $setup.appsStore.installationBatch.inProcess ? (openBlock(), createBlock($setup["ProgressBar"], {
      key: 0,
      title: `${$setup.appsStore.installationBatch.doneCount} / ${$setup.appsStore.installationBatch.totalCount}`,
      progress: $setup.appsStore.installationBatch.doneCount / $setup.appsStore.installationBatch.totalCount,
      color: $setup.appsStore.progressColors("install").bar,
      trackColor: $setup.appsStore.progressColors("install").track,
      size: "33px"
    }, null, 8, ["title", "progress", "color", "trackColor"])) : (openBlock(), createBlock(QBtn, {
      key: 1,
      class: "text-pixelated fit text-body1",
      unelevated: "",
      dense: "",
      color: "primary",
      label: "Install All",
      onClick: withModifiers($setup.onClick, ["stop"]),
      loading: $setup.loading,
      disabled: $props.disabled
    }, null, 8, ["loading", "disabled"]))
  ]);
}
const AppInstallAll = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5], ["__file", "InstallAll.vue"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "Catalog",
  setup(__props, { expose: __expose }) {
    __expose();
    const categoriesStore = useCategoriesStore();
    const appsStore = useAppsStore();
    const flipperStore = useFlipperStore();
    const { fetchAppsShort } = api;
    const appsLoading = ref(false);
    const apps = ref([]);
    const limit = ref(48);
    const offset = ref(0);
    const getApps = async () => {
      var _a, _b, _c, _d, _e;
      if (flipperStore.flipperReady) {
        if (flipperStore.rpcActive) {
          if (!((_b = (_a = flipperStore.flipper) == null ? void 0 : _a.info) == null ? void 0 : _b.firmware.api) || !((_d = (_c = flipperStore.flipper) == null ? void 0 : _c.info) == null ? void 0 : _d.firmware.target)) {
            appsStore.dialogs.outdatedFirmwareDialog = true;
            appsStore.dialogs.outdatedFirmwareDialogPersistent = true;
            fetchEnd.value = true;
            return;
          }
        }
      }
      appsLoading.value = true;
      let newApps = [];
      if (!fetchEnd.value) {
        appsStore.flags.catalogIsUnknownSDK = false;
        await fetchAppsShort({
          limit: limit.value,
          offset: offset.value,
          category_id: (_e = categoriesStore.currentCategory) == null ? void 0 : _e.id,
          api: flipperStore.api && flipperStore.target ? flipperStore.api : void 0,
          target: flipperStore.api && flipperStore.target ? flipperStore.target : void 0,
          sort_by: getAppsShort(sortModel.value).sort_by,
          sort_order: getAppsShort(sortModel.value).sort_order
        }).then((res) => {
          if (!res) {
            fetchEnd.value = true;
            return;
          }
          newApps = res;
          if (!newApps.length) {
            fetchEnd.value = true;
          } else {
            apps.value.push(...newApps);
          }
          if (newApps.length < limit.value) {
            fetchEnd.value = true;
          }
        }).catch((error) => {
          var _a2;
          fetchEnd.value = true;
          if (((_a2 = error.response) == null ? void 0 : _a2.data.detail.code) === 1001) {
            appsStore.flags.catalogIsUnknownSDK = true;
          } else {
            showNotif({
              message: "Unable to load applications.",
              color: "negative",
              actions: [
                {
                  label: "Reload",
                  color: "white",
                  handler: () => {
                    reLoad();
                  }
                }
              ]
            });
          }
        });
      }
      appsLoading.value = false;
    };
    const getAppAction = (app) => {
      const actionApp = appsStore.actionAppList.find((_app) => {
        if (_app.id === app.id) {
          return true;
        }
        return false;
      });
      if (actionApp) {
        app.action = actionApp.action;
        return true;
      }
      return false;
    };
    onMounted(async () => {
      var _a, _b, _c, _d;
      appsStore.flags.catalogIsUnknownSDK = false;
      if (flipperStore.flipperReady) {
        if (!flipperStore.rpcActive) {
          await ((_a = flipperStore.flipper) == null ? void 0 : _a.startRPCSession());
        }
        if (((_b = flipperStore.flipper) == null ? void 0 : _b.readingMode.type) === "rpc") {
          if (!flipperStore.info) {
            await ((_c = flipperStore.flipper) == null ? void 0 : _c.getInfo());
          }
          if (!appsStore.loadingInstalledApps && !((_d = appsStore.flipperInstalledApps) == null ? void 0 : _d.length)) {
            await appsStore.getInstalledApps({
              refreshInstalledApps: true
            });
          }
        }
      }
    });
    watch(
      () => appsStore.flags.catalogChannelProduction,
      async () => {
        var _a;
        if (((_a = flipperStore.flipper) == null ? void 0 : _a.readingMode.type) === "rpc") {
          await appsStore.getInstalledApps({
            refreshInstalledApps: true
          });
        }
      }
    );
    const sortModel = ref("New Updates");
    const sortOptions = ref([
      "New Updates",
      "New Releases",
      "Old Updates",
      "Old Releases"
    ]);
    const getAppsShort = (sort) => {
      switch (sort) {
        case "Old Updates":
          return {
            sort_by: "updated_at",
            sort_order: 1
          };
        case "New Releases":
          return {
            sort_by: "created_at",
            sort_order: -1
          };
        case "Old Releases":
          return {
            sort_by: "created_at",
            sort_order: 1
          };
        default:
          return {
            sort_by: "updated_at",
            sort_order: -1
          };
      }
    };
    const onSortApps = () => {
      reLoad();
    };
    const fetchEnd = ref(false);
    const infinityScrollRef = ref();
    const reLoad = async () => {
      apps.value = [];
      fetchEnd.value = false;
      offset.value = 0;
      if (infinityScrollRef.value) {
        infinityScrollRef.value.stop();
        infinityScrollRef.value.reset();
        nextTick(() => {
          var _a;
          (_a = infinityScrollRef.value) == null ? void 0 : _a.resume();
        });
      }
    };
    const onLoad = async (index, done) => {
      console.log("onLoad");
      if (index > 1) {
        offset.value += limit.value;
      }
      await getApps();
      done(fetchEnd.value);
    };
    const onCategorySelected = async () => {
      await reLoad();
    };
    const router = useRouter();
    const goAppPage = (appAlias) => {
      router.push({ name: "AppsPath", params: { path: appAlias } });
    };
    const __returned__ = { categoriesStore, appsStore, flipperStore, fetchAppsShort, appsLoading, apps, limit, offset, getApps, getAppAction, sortModel, sortOptions, getAppsShort, onSortApps, fetchEnd, infinityScrollRef, reLoad, onLoad, onCategorySelected, router, goAppPage, get ProgressBar() {
      return ProgressBar;
    }, get Loading() {
      return Loading;
    }, get CategoriesList() {
      return CategoriesList;
    }, get AppCard() {
      return AppCard;
    }, get AppInstalledBtn() {
      return AppInstalledBtn;
    }, get AppInstallBtn() {
      return AppInstallBtn;
    }, get AppUpdateBtn() {
      return AppUpdateBtn;
    }, get AppOpenAppBtn() {
      return AppOpenAppBtn;
    }, get AppInstallAll() {
      return AppInstallAll;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$3 = { class: "column col-auto q-col-gutter-sm" };
const _hoisted_2$2 = {
  key: 0,
  class: "col"
};
const _hoisted_3$1 = { class: "list" };
const _hoisted_4$1 = { class: "row justify-center q-my-md" };
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [
    $setup.categoriesStore.categoriesLoading ? (openBlock(), createBlock($setup["Loading"], {
      key: 0,
      label: "Loading categories..."
    })) : $setup.appsStore.flags.catalogIsUnknownSDK ? (openBlock(), createBlock(QCard, {
      key: 1,
      flat: ""
    }, {
      default: withCtx(() => [
        createVNode(QCardSection, {
          class: "q-pa-none q-ma-md",
          align: "center"
        }, {
          default: withCtx(() => [
            createVNode(QImg, {
              src: _imports_0$1,
              width: "70px",
              "no-spinner": ""
            }),
            _cache[2] || (_cache[2] = createBaseVNode("div", { class: "text-h6 q-my-sm" }, "Not Compatible with your Firmware", -1)),
            _cache[3] || (_cache[3] = createBaseVNode("p", null, [
              createTextVNode(" To access Apps, install the latest firmware version from "),
              createBaseVNode("span", { class: "text-positive text-bold" }, "Release"),
              createTextVNode(" Channel on your Flipper ")
            ], -1))
          ]),
          _: 1,
          __: [2, 3]
        }),
        createVNode(QCardActions, {
          vertical: "",
          align: "center"
        }, {
          default: withCtx(() => [
            createVNode(QBtn, {
              outline: "",
              "no-caps": "",
              label: "Go to Firmware update",
              color: "blue-6",
              to: { name: "Device" }
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    })) : createCommentVNode("", true),
    withDirectives(createBaseVNode("div", {
      class: normalizeClass(["q-mb-lg", {
        row: !_ctx.$q.screen.lt.md,
        column: _ctx.$q.screen.lt.md
      }])
    }, [
      createVNode($setup["CategoriesList"], {
        class: normalizeClass([{
          "q-mr-md": !_ctx.$q.screen.lt.md,
          "q-mb-md justify-center": _ctx.$q.screen.lt.md
        }, "col"]),
        onCategorySelected: $setup.onCategorySelected
      }, null, 8, ["class"]),
      createBaseVNode("div", _hoisted_1$3, [
        createVNode(QSelect, {
          class: "col",
          modelValue: $setup.sortModel,
          "onUpdate:modelValue": [
            _cache[0] || (_cache[0] = ($event) => $setup.sortModel = $event),
            _cache[1] || (_cache[1] = ($event) => $setup.onSortApps())
          ],
          options: $setup.sortOptions,
          dense: "",
          standout: "bg-primary text-white no-shadow",
          rounded: ""
        }, null, 8, ["modelValue", "options"]),
        $setup.appsStore.flags.catalogInstallAllApps ? (openBlock(), createElementBlock("div", _hoisted_2$2, [
          createVNode($setup["AppInstallAll"], {
            disabled: $setup.appsStore.loadingInstalledApps
          }, null, 8, ["disabled"])
        ])) : createCommentVNode("", true)
      ])
    ], 2), [
      [
        vShow,
        !$setup.categoriesStore.categoriesLoading && !$setup.appsStore.flags.catalogIsUnknownSDK
      ]
    ]),
    !$setup.categoriesStore.categoriesLoading ? (openBlock(), createBlock(QInfiniteScroll, {
      key: 2,
      ref: "infinityScrollRef",
      onLoad: $setup.onLoad,
      offset: 500,
      class: "full-width"
    }, {
      loading: withCtx(() => [
        createBaseVNode("div", _hoisted_4$1, [
          createVNode($setup["Loading"], { label: "Loading apps..." })
        ])
      ]),
      default: withCtx(() => [
        createBaseVNode("div", _hoisted_3$1, [
          (openBlock(true), createElementBlock(Fragment, null, renderList($setup.apps, (app) => {
            return openBlock(), createBlock(QIntersection, {
              key: app.id,
              once: "",
              transition: "scale"
            }, {
              default: withCtx(() => [
                createVNode($setup["AppCard"], mergeProps({ ref_for: true }, app, { onClick: $setup.goAppPage }), {
                  button: withCtx(() => {
                    var _a;
                    return [
                      ((_a = app.action) == null ? void 0 : _a.type) || $setup.getAppAction(app) ? (openBlock(), createBlock($setup["ProgressBar"], {
                        key: 0,
                        title: app.action.progress * 100 + "%",
                        progress: app.action.progress,
                        color: $setup.appsStore.progressColors(app.action.type).bar,
                        "track-color": $setup.appsStore.progressColors(app.action.type).track,
                        interpolated: "",
                        size: "33px"
                      }, null, 8, ["title", "progress", "color", "track-color"])) : $setup.appsStore.getButtonState(app) === "unsupported" ? (openBlock(), createBlock($setup["AppInstalledBtn"], { key: 1 })) : $setup.appsStore.getButtonState(app) === "installed" ? (openBlock(), createBlock($setup["AppOpenAppBtn"], {
                        key: 2,
                        app: $setup.appsStore.getAppPath(app)
                      }, null, 8, ["app"])) : $setup.appsStore.getButtonState(app) === "update" ? (openBlock(), createBlock($setup["AppUpdateBtn"], {
                        key: 3,
                        app,
                        loading: $setup.appsStore.loadingInstalledApps
                      }, null, 8, ["app", "loading"])) : (openBlock(), createBlock($setup["AppInstallBtn"], {
                        key: 4,
                        app,
                        loading: $setup.appsStore.loadingInstalledApps
                      }, null, 8, ["app", "loading"]))
                    ];
                  }),
                  _: 2
                }, 1040)
              ]),
              _: 2
            }, 1024);
          }), 128))
        ])
      ]),
      _: 1
    }, 512)) : createCommentVNode("", true)
  ]);
}
const AppCatalog = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["__scopeId", "data-v-9b54cbe9"], ["__file", "Catalog.vue"]]);
const _sfc_main$3 = {
  __name: "Apps",
  setup(__props, { expose: __expose }) {
    __expose();
    const globalStore = useGlobalStore();
    const __returned__ = { globalStore, get AppCatalog() {
      return AppCatalog;
    }, get useGlobalStore() {
      return useGlobalStore;
    }, get FlipperNoInternetConnectionCard() {
      return FlipperNoInternetConnectionCard;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QPage, { padding: "" }, {
    default: withCtx(() => [
      !$setup.globalStore.isOnline ? (openBlock(), createBlock($setup["FlipperNoInternetConnectionCard"], {
        key: 0,
        flat: ""
      })) : (openBlock(), createBlock($setup["AppCatalog"], { key: 1 }))
    ]),
    _: 1
  });
}
const Apps = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__file", "Apps.vue"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "InstalledCard",
  props: {
    app: {},
    unsupported: { type: Boolean, default: false }
  },
  emits: ["click"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const appsStore = useAppsStore();
    const globalStore = useGlobalStore();
    const props = __props;
    const emit = __emit;
    const getAppAction = (app) => {
      const actionApp = appsStore.actionAppList.find((_app) => {
        if (_app.id === app.id) {
          return true;
        }
        return false;
      });
      if (actionApp) {
        app.action = actionApp.action;
        return true;
      }
      return false;
    };
    const onClick = () => {
      if (globalStore.isOnline) {
        emit("click", props.app.alias);
      }
    };
    const __returned__ = { appsStore, globalStore, props, emit, getAppAction, onClick, get AppDeleteBtn() {
      return AppDeleteBtn;
    }, get ProgressBar() {
      return ProgressBar;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$2 = { class: "installed-card__icon-wrapper q-mr-md" };
const _hoisted_2$1 = { class: "col column q-mr-md" };
const _hoisted_3 = { class: "row" };
const _hoisted_4 = { class: "text-h6 q-mr-sm q-mb-none" };
const _hoisted_5 = { class: "text-grey-7" };
const _hoisted_6 = {
  key: 0,
  class: "column items-end"
};
const _hoisted_7 = { class: "installed-card__button-wrapper q-mr-sm" };
const _hoisted_8 = { class: "col-auto" };
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QCard, {
    class: normalizeClass(["installed-card row no-wrap items-center", {
      "cursor-pointer installed-card--supported": !$props.unsupported && $setup.globalStore.isOnline
    }]),
    flat: "",
    tabindex: $props.unsupported && !$setup.globalStore.isOnline ? -1 : 0,
    onClick: $setup.onClick
  }, {
    default: withCtx(() => [
      createVNode(QCardSection, { class: "row col items-center" }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1$2, [
            createVNode(QImg, {
              src: `data:image/png;base64,${$props.app.icon}`,
              style: { "image-rendering": "pixelated" }
            }, null, 8, ["src"])
          ]),
          createBaseVNode("div", _hoisted_2$1, [
            createBaseVNode("div", _hoisted_3, [
              createBaseVNode("p", _hoisted_4, toDisplayString($props.app.name), 1),
              $props.unsupported ? (openBlock(), createBlock(QChip, {
                key: 0,
                class: "q-px-sm",
                color: "deep-orange-2",
                icon: "mdi-alert-circle-outline",
                label: "Outdated app",
                size: "12px",
                dense: ""
              })) : createCommentVNode("", true)
            ]),
            createBaseVNode("div", _hoisted_5, toDisplayString($props.app.installedVersion.shortDescription), 1)
          ]),
          createVNode(QSpace),
          $props.app.installedVersion.version ? (openBlock(), createElementBlock("div", _hoisted_6, [
            _cache[0] || (_cache[0] = createBaseVNode("p", { class: "text-grey-7 q-mb-none" }, "Version:", -1)),
            createBaseVNode("b", null, toDisplayString($props.app.installedVersion.version), 1)
          ])) : createCommentVNode("", true)
        ]),
        _: 1
      }),
      createVNode(QCardSection, { class: "row no-wrap" }, {
        default: withCtx(() => {
          var _a;
          return [
            ((_a = $props.app.action) == null ? void 0 : _a.type) || $setup.getAppAction($props.app) ? (openBlock(), createBlock($setup["ProgressBar"], {
              key: 0,
              style: { "width": "120px" },
              title: $props.app.action.progress * 100 + "%",
              progress: $props.app.action.progress,
              color: $setup.appsStore.progressColors($props.app.action.type).bar,
              trackColor: $setup.appsStore.progressColors($props.app.action.type).track,
              interpolated: ""
            }, null, 8, ["title", "progress", "color", "trackColor"])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createBaseVNode("div", _hoisted_7, [
                renderSlot(_ctx.$slots, "button", {}, void 0, true)
              ]),
              createBaseVNode("div", _hoisted_8, [
                createVNode($setup["AppDeleteBtn"], { app: $props.app }, null, 8, ["app"])
              ])
            ], 64))
          ];
        }),
        _: 3
      })
    ]),
    _: 3
  }, 8, ["class", "tabindex"]);
}
const AppInstalledCard = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__scopeId", "data-v-6992056e"], ["__file", "InstalledCard.vue"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "List",
  setup(__props, { expose: __expose }) {
    __expose();
    const router = useRouter();
    const appsStore = useAppsStore();
    const flipperStore = useFlipperStore();
    const categoriesStore = useCategoriesStore();
    const globalStore = useGlobalStore();
    const getCategories = async () => {
      if (!globalStore.isOnline) {
        return;
      }
      if (!categoriesStore.categoriesLoading && (!categoriesStore.categories.length || flipperStore.api !== categoriesStore.lastApi || flipperStore.target !== categoriesStore.lastTarget)) {
        await categoriesStore.getCategories({
          api: flipperStore.api,
          target: flipperStore.target
        });
      }
    };
    const goAppPage = (appAlias) => {
      router.push({ name: "AppsPath", params: { path: appAlias } });
    };
    const reLoad = async () => {
      appsStore.onClearInstalledAppsList();
      await getCategories();
      if (flipperStore.flipper) {
        await appsStore.getInstalledApps({
          refreshInstalledApps: true
        });
      }
    };
    onMounted(async () => {
      var _a;
      await getCategories();
      if (!appsStore.loadingInstalledApps && !((_a = appsStore.flipperInstalledApps) == null ? void 0 : _a.length)) {
        await appsStore.getInstalledApps({
          refreshInstalledApps: true
        });
      }
    });
    watch(
      () => appsStore.flags.catalogChannelProduction,
      async () => {
        await reLoad();
      }
    );
    watch(
      () => globalStore.isOnline,
      async (newValue) => {
        if (newValue) {
          await getCategories();
        }
        if (flipperStore.flipper) {
          await appsStore.getInstalledApps();
        }
      }
    );
    const __returned__ = { router, appsStore, flipperStore, categoriesStore, globalStore, getCategories, goAppPage, reLoad, get ProgressBar() {
      return ProgressBar;
    }, get AppUpdateBtn() {
      return AppUpdateBtn;
    }, get AppOpenAppBtn() {
      return AppOpenAppBtn;
    }, get AppInstalledCard() {
      return AppInstalledCard;
    }, get AppInstalledBtn() {
      return AppInstalledBtn;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$1 = {
  key: 0,
  style: { "width": "140px" },
  class: "q-mb-md q-pl-md"
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [
    $setup.globalStore.isOnline && !$setup.appsStore.flags.catalogIsUnknownSDK ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
      $setup.appsStore.updatableApps.length ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
        $setup.appsStore.batch.inProcess ? (openBlock(), createBlock($setup["ProgressBar"], {
          key: 0,
          title: `${$setup.appsStore.batch.doneCount} / ${$setup.appsStore.batch.totalCount}`,
          progress: $setup.appsStore.batch.doneCount / $setup.appsStore.batch.totalCount + $setup.appsStore.batch.progress / $setup.appsStore.batch.totalCount,
          color: "positive",
          trackColor: "green-4",
          size: "33px"
        }, null, 8, ["title", "progress"])) : (openBlock(), createBlock(QBtn, {
          key: 1,
          class: "fit text-pixelated text-body1",
          unelevated: "",
          dense: "",
          color: "positive",
          label: "Update all",
          onClick: _cache[0] || (_cache[0] = ($event) => $setup.appsStore.batchUpdate($setup.appsStore.updatableApps))
        }, {
          default: withCtx(() => [
            createVNode(QBadge, {
              class: "update-all-badge",
              label: $setup.appsStore.appsUpdateCount
            }, null, 8, ["label"])
          ]),
          _: 1
        }))
      ])) : createCommentVNode("", true),
      (openBlock(true), createElementBlock(Fragment, null, renderList($setup.appsStore.updatableApps, (updatableApp) => {
        return openBlock(), createBlock(QIntersection, {
          key: updatableApp.id,
          once: "",
          transition: "scale"
        }, {
          default: withCtx(() => [
            createVNode($setup["AppInstalledCard"], {
              app: updatableApp,
              onClick: $setup.goAppPage
            }, {
              button: withCtx(() => [
                createVNode($setup["AppUpdateBtn"], { app: updatableApp }, null, 8, ["app"])
              ]),
              _: 2
            }, 1032, ["app"])
          ]),
          _: 2
        }, 1024);
      }), 128)),
      $setup.appsStore.updatableApps.length && $setup.appsStore.upToDateApps.length ? (openBlock(), createBlock(QSeparator, {
        key: 1,
        class: "q-my-lg"
      })) : createCommentVNode("", true),
      (openBlock(true), createElementBlock(Fragment, null, renderList($setup.appsStore.upToDateApps, (upToDateApp) => {
        return openBlock(), createBlock(QIntersection, {
          key: upToDateApp.id,
          once: "",
          transition: "scale"
        }, {
          default: withCtx(() => [
            createVNode($setup["AppInstalledCard"], {
              app: upToDateApp,
              onClick: $setup.goAppPage
            }, {
              button: withCtx(() => [
                createVNode($setup["AppOpenAppBtn"], { app: upToDateApp }, null, 8, ["app"])
              ]),
              _: 2
            }, 1032, ["app"])
          ]),
          _: 2
        }, 1024);
      }), 128)),
      (openBlock(true), createElementBlock(Fragment, null, renderList($setup.appsStore.unsupportedApps, (unsupportedApp) => {
        return openBlock(), createBlock(QIntersection, {
          key: unsupportedApp.id,
          once: "",
          transition: "scale"
        }, {
          default: withCtx(() => [
            createVNode($setup["AppInstalledCard"], {
              app: unsupportedApp,
              unsupported: ""
            }, {
              button: withCtx(() => [
                createVNode($setup["AppInstalledBtn"])
              ]),
              _: 2
            }, 1032, ["app"])
          ]),
          _: 2
        }, 1024);
      }), 128))
    ], 64)) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList($setup.appsStore.installedApps, (installedApps) => {
      return openBlock(), createBlock(QIntersection, {
        key: installedApps.id,
        once: "",
        transition: "scale"
      }, {
        default: withCtx(() => [
          createVNode($setup["AppInstalledCard"], {
            app: installedApps,
            onClick: $setup.goAppPage
          }, {
            button: withCtx(() => [
              createVNode($setup["AppInstalledBtn"])
            ]),
            _: 2
          }, 1032, ["app"])
        ]),
        _: 2
      }, 1024);
    }), 128))
  ]);
}
const InstalledList = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-2ca0b184"], ["__file", "List.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "InstalledApps",
  setup(__props, { expose: __expose }) {
    __expose();
    const appsStore = useAppsStore();
    const flipperStore = useFlipperStore();
    const __returned__ = { appsStore, flipperStore, get Loading() {
      return Loading;
    }, get FlipperMicroSDCard() {
      return FlipperMicroSDCard;
    }, get InstalledList() {
      return InstalledList;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = {
  key: 2,
  class: "column items-center"
};
const _hoisted_2 = {
  key: 3,
  class: "column items-center"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QPage, { padding: "" }, {
    default: withCtx(() => {
      var _a, _b;
      return [
        $setup.appsStore.loadingInstalledApps ? (openBlock(), createBlock($setup["Loading"], {
          key: 0,
          label: "Loading installed apps..."
        })) : !$setup.flipperStore.flags.connected ? (openBlock(), createBlock(QCard, {
          key: 1,
          flat: ""
        }, {
          default: withCtx(() => [
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
                _cache[0] || (_cache[0] = createBaseVNode("div", { class: "text-h6 q-my-sm" }, "Flipper not connected", -1))
              ]),
              _: 1,
              __: [0]
            })
          ]),
          _: 1
        })) : !((_b = (_a = $setup.flipperStore.info) == null ? void 0 : _a.storage.sdcard) == null ? void 0 : _b.status.isInstalled) ? (openBlock(), createElementBlock("div", _hoisted_1, [
          createVNode($setup["FlipperMicroSDCard"], {
            flat: "",
            showFindMicroSdBtn: $setup.flipperStore.isElectron,
            onOnFindMicroSd: $setup.flipperStore.findMicroSd
          }, null, 8, ["showFindMicroSdBtn", "onOnFindMicroSd"])
        ])) : $setup.appsStore.noApplicationsInstalled ? (openBlock(), createElementBlock("div", _hoisted_2, [
          createVNode(QCard, { flat: "" }, {
            default: withCtx(() => [
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
                  _cache[1] || (_cache[1] = createBaseVNode("div", { class: "text-h6 q-my-sm" }, " You haven't installed any apps yet ", -1))
                ]),
                _: 1,
                __: [1]
              })
            ]),
            _: 1
          })
        ])) : !$setup.flipperStore.flags.flipperIsInitialized ? (openBlock(), createBlock($setup["InstalledList"], { key: 4 })) : createCommentVNode("", true)
      ];
    }),
    _: 1
  });
}
const InstalledApps = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "InstalledApps.vue"]]);
export {
  App as AppPage,
  AppsLayout,
  Apps as AppsPage,
  InstalledApps as InstalledAppsPage
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgtQzEtdGprcXkuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9lbnRpdGllcy9DYXRlZ29yeS91aS9DaGlwLnZ1ZSIsIi4uLy4uLy4uL3NyYy9lbnRpdGllcy9BcHBzL3VpL0NhcmQudnVlIiwiLi4vLi4vLi4vc3JjL2VudGl0aWVzL0FwcHMvdWkvSW5zdGFsbGVkQnRuLnZ1ZSIsIi4uLy4uLy4uL3NyYy9lbnRpdGllcy9BcHBzL3VpL0RpYWxvZ3MvT3V0ZGF0ZWRBcHAudnVlIiwiLi4vLi4vLi4vc3JjL2VudGl0aWVzL0FwcHMvdWkvRGlhbG9ncy9Ob0ZyZWVTcGFjZS52dWUiLCIuLi8uLi8uLi9zcmMvc2hhcmVkL2Fzc2V0cy9ub19pbnRlcm5ldC5zdmciLCIuLi8uLi8uLi9zcmMvZW50aXRpZXMvRmxpcHBlci91aS9EaWFsb2dzL05vSW50ZXJuZXRDb25uZWN0aW9uLnZ1ZSIsIi4uLy4uLy4uL3NyYy9zaGFyZWQvc3RvcmVzL2dsb2JhbC1zdG9yZS50cyIsIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9BcHBzL0hlYWRlci91aS9IZWFkZXIudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL0FwcHMvdWkvQXBwc0xheW91dC52dWUiLCIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvQXBwcy9JbnN0YWxsQnV0dG9uL3VpL2J1dHRvbi52dWUiLCIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvQXBwcy9PcGVuQXBwQnV0dG9uL2J1dHRvbi52dWUiLCIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvQXBwcy9VcGRhdGVCdXR0b24vdWkvYnV0dG9uLnZ1ZSIsIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9BcHBzL0RlbGV0ZUJ1dHRvbi91aS9idXR0b24udnVlIiwiLi4vLi4vLi4vc3JjL3dpZGdldHMvQXBwcy9BcHBEZXRhaWwvdWkvRGV0YWlsLnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9BcHBzL3VpL0FwcC52dWUiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9kaXJlY3RpdmVzL2ludGVyc2VjdGlvbi9JbnRlcnNlY3Rpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2ludGVyc2VjdGlvbi9RSW50ZXJzZWN0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9pbmZpbml0ZS1zY3JvbGwvUUluZmluaXRlU2Nyb2xsLmpzIiwiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL0NhdGVnb3J5L0ZpbHRlci91aS9MaXN0LnZ1ZSIsIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9BcHBzL0luc3RhbGxBbGwvdWkvSW5zdGFsbEFsbC52dWUiLCIuLi8uLi8uLi9zcmMvd2lkZ2V0cy9BcHBzL0FwcENhdGFsb2cvdWkvQ2F0YWxvZy52dWUiLCIuLi8uLi8uLi9zcmMvcGFnZXMvQXBwcy91aS9BcHBzLnZ1ZSIsIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9BcHBzL0luc3RhbGxlZENhcmQvSW5zdGFsbGVkQ2FyZC52dWUiLCIuLi8uLi8uLi9zcmMvd2lkZ2V0cy9BcHBzL0luc3RhbGxlZExpc3QvdWkvTGlzdC52dWUiLCIuLi8uLi8uLi9zcmMvcGFnZXMvQXBwcy91aS9JbnN0YWxsZWRBcHBzLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDxxLWNoaXBcbiAgICA6c3R5bGU9XCJgYmFja2dyb3VuZC1jb2xvcjogIyR7Y29sb3J9OyBvcGFjaXR5OiAke1xuICAgICAgaXNDdXJyZW50Q2F0ZWdvcnkgPyAnMScgOiAnMC41J1xuICAgIH1gXCJcbiAgICA6Y2xpY2thYmxlPVwiY2xpY2thYmxlXCJcbiAgICBAY2xpY2s9XCJvbkNsaWNrXCJcbiAgPlxuICAgIDxxLWljb25cbiAgICAgIHYtaWY9XCJpY29uVXJpXCJcbiAgICAgIDpuYW1lPVwiYGltZzoke2ljb25Vcml9YFwiXG4gICAgICBzaXplPVwiMTRweFwiXG4gICAgICBjbGFzcz1cInEtbXkteHMgcS1tci1zbVwiXG4gICAgLz5cbiAgICA8c3BhbiBjbGFzcz1cInRleHQtbm8td3JhcFwiPnt7IG5hbWUgfX08L3NwYW4+XG4gIDwvcS1jaGlwPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCB0eXBlIHsgQ2F0ZWdvcnlEYXRhIH0gZnJvbSAnLi4vbW9kZWwvdHlwZXMnXG5cbnR5cGUgUHJvcHMgPSBPbWl0PENhdGVnb3J5RGF0YSwgJ2FwcGxpY2F0aW9ucycgfCAncHJpb3JpdHknIHwgJ19pZCc+ICYge1xuICAvLyBpY29uVXJpPzogc3RyaW5nXG4gIGlzQ3VycmVudENhdGVnb3J5PzogYm9vbGVhblxuICBjbGlja2FibGU/OiBib29sZWFuXG59XG5cbndpdGhEZWZhdWx0cyhkZWZpbmVQcm9wczxQcm9wcz4oKSwge1xuICBpc0N1cnJlbnRDYXRlZ29yeTogZmFsc2UsXG4gIGNsaWNrYWJsZTogdHJ1ZVxufSlcblxuY29uc3QgZW1pdCA9IGRlZmluZUVtaXRzKFsnY2xpY2snXSlcblxuY29uc3Qgb25DbGljayA9ICgpID0+IHtcbiAgZW1pdCgnY2xpY2snKVxufVxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgdGFiaW5kZXg9XCIwXCIgY2xhc3M9XCJjYXJkIGN1cnNvci1wb2ludGVyXCIgQGNsaWNrPVwib25DbGlja1wiPlxuICAgIDxkaXYgY2xhc3M9XCJjYXJkX193cmFwcGVyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY2FyZF9faW1hZ2Utd3JhcHBlciBiZy1wcmltYXJ5IHEtbWItc20gcS1wYS14c1wiPlxuICAgICAgICA8cS1pbWdcbiAgICAgICAgICBjbGFzcz1cImNhcmRfX2ltYWdlXCJcbiAgICAgICAgICA6c3JjPVwiY3VycmVudFZlcnNpb24uc2NyZWVuc2hvdHNbMF1cIlxuICAgICAgICAgIDpyYXRpbz1cIjI1NiAvIDEyOFwiXG4gICAgICAgICAgc3Bpbm5lci1jb2xvcj1cInByaW1hcnlcIlxuICAgICAgICAgIHNwaW5uZXItc2l6ZT1cIjgycHhcIlxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktYmV0d2VlbiBuby13cmFwIGZ1bGwtd2lkdGhcIj5cbiAgICAgICAgPHAgY2xhc3M9XCJjb2wgdGV4dC1oNiBxLW1hLW5vbmUgcS1tci14cyBlbGxpcHNpc1wiPlxuICAgICAgICAgIHt7IGN1cnJlbnRWZXJzaW9uLm5hbWUgfX1cbiAgICAgICAgPC9wPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNocmluayByb3cgaXRlbXMtY2VudGVyIG5vLXdyYXBcIj5cbiAgICAgICAgICA8IS0tIDxkaXZcbiAgICAgICAgICAgIGNsYXNzPVwicS1tci1zbVwiXG4gICAgICAgICAgICBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6IGJsdWU7IHdpZHRoOiAxNHB4OyBoZWlnaHQ6IDE0cHhcIlxuICAgICAgICAgID48L2Rpdj4gLS0+XG4gICAgICAgICAgPHEtaWNvblxuICAgICAgICAgICAgdi1zaG93PVwiZ2V0Q2F0ZWdvcnlJY29uXCJcbiAgICAgICAgICAgIGNsYXNzPVwicS1tci1zbVwiXG4gICAgICAgICAgICA6bmFtZT1cImBpbWc6JHtnZXRDYXRlZ29yeUljb259YFwiXG4gICAgICAgICAgICBzaXplPVwiMTRweFwiXG4gICAgICAgICAgLz5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInEtbWEtbm9uZVwiPlxuICAgICAgICAgICAge3sgZ2V0Q2F0ZWdvcnlOYW1lIH19XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInJvdyBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtZW5kIG5vLXdyYXBcIj5cbiAgICAgICAgPHBcbiAgICAgICAgICBjbGFzcz1cImNvbCBjYXJkX19kZXNjcmlwdGlvbiB0ZXh0LWdyZXktNyB0ZXh0LWNhcHRpb24gcS1tYS1ub25lIHEtbXIteHMgZWxsaXBzaXMtMi1saW5lc1wiXG4gICAgICAgID5cbiAgICAgICAgICB7eyBjdXJyZW50VmVyc2lvbi5zaG9ydERlc2NyaXB0aW9uIH19XG4gICAgICAgIDwvcD5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zaHJpbmsgY2FyZF9fYnV0dG9uLXdyYXBwZXJcIj5cbiAgICAgICAgICA8c2xvdCBuYW1lPVwiYnV0dG9uXCIgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHsgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IENhdGVnb3J5TW9kZWwgfSBmcm9tICdlbnRpdHkvQ2F0ZWdvcnknXG5pbXBvcnQgeyBBcHAgfSBmcm9tICcuLi9tb2RlbC90eXBlcydcblxudHlwZSBQcm9wcyA9IFBpY2s8QXBwLCAnYWxpYXMnIHwgJ2N1cnJlbnRWZXJzaW9uJyB8ICdjYXRlZ29yeUlkJz5cblxuY29uc3QgcHJvcHMgPSBkZWZpbmVQcm9wczxQcm9wcz4oKVxuXG5jb25zdCBlbWl0ID0gZGVmaW5lRW1pdHMoWydjbGljayddKVxuXG5jb25zdCBzdG9yZSA9IENhdGVnb3J5TW9kZWwudXNlQ2F0ZWdvcmllc1N0b3JlKClcbmNvbnN0IGNhdGVnb3JpZXMgPSBjb21wdXRlZCgoKSA9PiBzdG9yZS5jYXRlZ29yaWVzKVxuXG5jb25zdCBnZXRDYXRlZ29yeUljb24gPSBjb21wdXRlZChcbiAgKCkgPT4gY2F0ZWdvcmllcy52YWx1ZT8uZmluZCgoZSkgPT4gZS5pZCA9PT0gcHJvcHMuY2F0ZWdvcnlJZCk/Lmljb25VcmlcbilcbmNvbnN0IGdldENhdGVnb3J5TmFtZSA9IGNvbXB1dGVkKFxuICAoKSA9PiBjYXRlZ29yaWVzLnZhbHVlPy5maW5kKChlKSA9PiBlLmlkID09PSBwcm9wcy5jYXRlZ29yeUlkKT8ubmFtZVxuKVxuXG5jb25zdCBvbkNsaWNrID0gKCkgPT4ge1xuICBlbWl0KCdjbGljaycsIHByb3BzLmFsaWFzKVxufVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQgbGFuZz1cInNjc3NcIj5cbkBpbXBvcnQgJ3N0eWxlcyc7XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8cS1idG5cbiAgICBjbGFzcz1cInRleHQtcGl4ZWxhdGVkIGZpdCB0ZXh0LWJvZHkxXCJcbiAgICB1bmVsZXZhdGVkXG4gICAgZGVuc2VcbiAgICBjb2xvcj1cImdyZXlcIlxuICAgIGxhYmVsPVwiSW5zdGFsbGVkXCJcbiAgICBkaXNhYmxlXG4gICAgQGNsaWNrLnN0b3BcbiAgLz5cbjwvdGVtcGxhdGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxxLWRpYWxvZz5cbiAgICA8cS1jYXJkIGNsYXNzPVwiZGlhbG9nXCI+XG4gICAgICA8cS1idG5cbiAgICAgICAgaWNvbj1cImNsb3NlXCJcbiAgICAgICAgZmxhdFxuICAgICAgICByb3VuZFxuICAgICAgICBkZW5zZVxuICAgICAgICB2LWNsb3NlLXBvcHVwXG4gICAgICAgIGNsYXNzPVwiZGlhbG9nLWNsb3NlLWJ0blwiXG4gICAgICAvPlxuXG4gICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJxLXBhLW5vbmUgcS1tYS1tZFwiIGFsaWduPVwiY2VudGVyXCI+XG4gICAgICAgIDxxLWljb24gbmFtZT1cIm1kaS1hbGVydC1jaXJjbGVcIiBjb2xvcj1cIm5lZ2F0aXZlXCIgc2l6ZT1cIjY0cHhcIiAvPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNiBxLW15LXNtXCI+T3V0ZGF0ZWQgYXBwPC9kaXY+XG4gICAgICAgIDxwPkNvbnRhY3QgdGhlIGRldmVsb3BlciB0byByZXF1ZXN0IGZ1cnRoZXIgYXBwIHN1cHBvcnQuPC9wPlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cblxuICAgICAgPHEtY2FyZC1zZWN0aW9uIGNsYXNzPVwicS1wdC1ub25lXCIgYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgPHEtYnRuXG4gICAgICAgICAgb3V0bGluZVxuICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgICAgICAgbGFiZWw9XCJWaWV3IG9uIEdpdEh1YlwiXG4gICAgICAgICAgOmhyZWY9XCJocmVmXCJcbiAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxuICAgICAgICA+PC9xLWJ0bj5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgPC9xLWNhcmQ+XG4gIDwvcS1kaWFsb2c+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxudHlwZSBQcm9wcyA9IHtcbiAgaHJlZjogc3RyaW5nXG59XG5cbmRlZmluZVByb3BzPFByb3BzPigpXG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtZGlhbG9nPlxuICAgIDxxLWNhcmQgY2xhc3M9XCJkaWFsb2dcIj5cbiAgICAgIDxxLWJ0blxuICAgICAgICBpY29uPVwiY2xvc2VcIlxuICAgICAgICBmbGF0XG4gICAgICAgIHJvdW5kXG4gICAgICAgIGRlbnNlXG4gICAgICAgIHYtY2xvc2UtcG9wdXBcbiAgICAgICAgY2xhc3M9XCJkaWFsb2ctY2xvc2UtYnRuXCJcbiAgICAgIC8+XG5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInEtcGEtbm9uZSBxLW1hLW1kXCIgYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgPHEtaWNvbiBuYW1lPVwic3ZndXNlOmNvbW1vbi1pY29ucy5zdmcjZnctY29uZmxpY3QtaWNvblwiIHNpemU9XCI2NHB4XCIgLz5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDYgcS1teS1zbVwiPk5vIEZyZWUgU3BhY2U8L2Rpdj5cbiAgICAgICAgPHA+XG4gICAgICAgICAgVGhlcmUgaXMgbm8gZW1wdHkgc3BhY2UgdG8gaW5zdGFsbCB0aGlzIGFwcGxpY2F0aW9uLjxiciAvPlVzZSBhcmNoaXZlXG4gICAgICAgICAgdG8gZGVsZXRlIG5lZWRsZXNzIGZpbGVzLlxuICAgICAgICA8L3A+XG4gICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuXG4gICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJxLXB0LW5vbmVcIiBhbGlnbj1cImNlbnRlclwiPlxuICAgICAgICA8cS1idG5cbiAgICAgICAgICBvdXRsaW5lXG4gICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgICBsYWJlbD1cIk9wZW4gQXJjaGl2ZVwiXG4gICAgICAgICAgQGNsaWNrPVwiJHJvdXRlci5wdXNoKHsgbmFtZTogJ0FyY2hpdmUnIH0pXCJcbiAgICAgICAgPjwvcS1idG4+XG4gICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgIDwvcS1jYXJkPlxuICA8L3EtZGlhbG9nPlxuPC90ZW1wbGF0ZT5cbiIsImV4cG9ydCBkZWZhdWx0IFwiZGF0YTppbWFnZS9zdmcreG1sLCUzY3N2ZyUyMHdpZHRoPScxMDQnJTIwaGVpZ2h0PSc2MCclMjB2aWV3Qm94PScwJTIwMCUyMDEwNCUyMDYwJyUyMGZpbGw9J25vbmUnJTIweG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyUzZSUzY3BhdGglMjBmaWxsLXJ1bGU9J2V2ZW5vZGQnJTIwY2xpcC1ydWxlPSdldmVub2RkJyUyMGQ9J00yNy4yNSUyMDMwLjExMTNDMjcuMjUlMjAxNi41OTE4JTIwMzguMDQxMyUyMDUuNTkyNzMlMjA1MS40ODAxJTIwNS4yNTc4NkM1MS41NjA1JTIwNS4yNTI2NSUyMDUxLjY0MTYlMjA1LjI1JTIwNTEuNzIzMyUyMDUuMjVDNTEuNzU5NCUyMDUuMjUlMjA1MS43OTU0JTIwNS4yNTA1MiUyMDUxLjgzMTMlMjA1LjI1MTU0QzUxLjkyNDUlMjA1LjI1MDUyJTIwNTIuMDE3OCUyMDUuMjUlMjA1Mi4xMTEzJTIwNS4yNUM2NS44NDE3JTIwNS4yNSUyMDc2Ljk3MjUlMjAxNi4zODA4JTIwNzYuOTcyNSUyMDMwLjExMTNDNzYuOTcyNSUyMDMxLjIwMjUlMjA3Ni45MDIyJTIwMzIuMjc3MyUyMDc2Ljc2NTklMjAzMy4zMzE0Qzc2LjE4NzQlMjAzMi43ODc4JTIwNzUuNTY2MyUyMDMyLjI4OSUyMDc0LjkwODElMjAzMS44NDA2Qzc0Ljk1MDglMjAzMS4yNjk4JTIwNzQuOTcyNSUyMDMwLjY5MyUyMDc0Ljk3MjUlMjAzMC4xMTEzQzc0Ljk3MjUlMjAyOC4xNDY5JTIwNzQuNzI0OCUyMDI2LjI0MDQlMjA3NC4yNTg4JTIwMjQuNDIxM0M3NC4yNDczJTIwMjQuNDIxNyUyMDc0LjIzNTglMjAyNC40MjE5JTIwNzQuMjI0MiUyMDI0LjQyMTlINjAuNDUyOEM2MC41OTk2JTIwMjYuMjUlMjA2MC42NzclMjAyOC4xNTUzJTIwNjAuNjc3JTIwMzAuMTExM0M2MC42NzclMjAzMC4xODM5JTIwNjAuNjc2OSUyMDMwLjI1NjQlMjA2MC42NzY3JTIwMzAuMzI4OUM1OS45Nzk0JTIwMzAuNjEyMyUyMDU5LjMwNzklMjAzMC45NDYxJTIwNTguNjY2OCUyMDMxLjMyNTdDNTguNjczNiUyMDMwLjkyMzYlMjA1OC42NzclMjAzMC41MTg3JTIwNTguNjc3JTIwMzAuMTExM0M1OC42NzclMjAyOC4xNDU2JTIwNTguNTk2NyUyMDI2LjI0JTIwNTguNDQ2MiUyMDI0LjQyMTlINDUuMDAwNEM0NC44NDk4JTIwMjYuMjQlMjA0NC43Njk1JTIwMjguMTQ1NiUyMDQ0Ljc2OTUlMjAzMC4xMTEzQzQ0Ljc2OTUlMjAzMi4xNDg5JTIwNDQuODU1OCUyMDM0LjEyMiUyMDQ1LjAxNzIlMjAzNkg1My43NDQzQzUzLjMyMjUlMjAzNi42MzQ3JTIwNTIuOTQ3MyUyMDM3LjMwMyUyMDUyLjYyMzQlMjAzOEg0NS4yMjE0QzQ1LjYxNDMlMjA0MS4zMSUyMDQ2LjI0NjElMjA0NC4yNjI1JTIwNDcuMDQ3OCUyMDQ2LjY2NzVDNDcuNzQ4MSUyMDQ4Ljc2ODMlMjA0OC41NTk5JTIwNTAuMzk2MiUyMDQ5LjQxMjclMjA1MS40Nzg0QzUwLjIxNDIlMjA1Mi40OTUzJTIwNTAuOTUyMSUyMDUyLjkxMyUyMDUxLjU4MjclMjA1Mi45NjY1QzUxLjY1NjYlMjA1Mi45NjgyJTIwNTEuNzMwNiUyMDUyLjk2OTUlMjA1MS44MDQ2JTIwNTIuOTcwNUM1Mi4yNzQ4JTIwNTIuOTQ3MyUyMDUyLjgwNjglMjA1Mi43MjEzJTIwNTMuMzgxOCUyMDUyLjE5MkM1My45Mzk5JTIwNTMuMTE5MiUyMDU0LjU5NDQlMjA1My45ODE4JTIwNTUuMzMxNCUyMDU0Ljc2NTlDNTQuMjc3MyUyMDU0LjkwMjIlMjA1My4yMDI1JTIwNTQuOTcyNSUyMDUyLjExMTMlMjA1NC45NzI1QzUyLjAxNzglMjA1NC45NzI1JTIwNTEuOTI0NSUyMDU0Ljk3MiUyMDUxLjgzMTMlMjA1NC45NzFDNTEuNzk1NCUyMDU0Ljk3MiUyMDUxLjc1OTQlMjA1NC45NzI1JTIwNTEuNzIzMyUyMDU0Ljk3MjVDNTEuNjQxNiUyMDU0Ljk3MjUlMjA1MS41NjA1JTIwNTQuOTY5OSUyMDUxLjQ4MDElMjA1NC45NjQ3QzM4LjA0MTMlMjA1NC42Mjk4JTIwMjcuMjUlMjA0My42MzA3JTIwMjcuMjUlMjAzMC4xMTEzWk0zMC41NzUzJTIwMjIuNDIxOUMzMy4yNTQ3JTIwMTQuOTE4NSUyMDM5Ljc0NCUyMDkuMjI1NDYlMjA0Ny43MTM2JTIwNy42NzI1N0M0Ni43MTglMjA4Ljk5MjMyJTIwNDUuODU5MyUyMDEwLjc5NjElMjA0NS4xNTA0JTIwMTIuOTIyNkM0NC4yNjQ3JTIwMTUuNTc5OSUyMDQzLjU4NyUyMDE4LjgyMDYlMjA0My4xODUyJTIwMjIuNDIxOUgzMC41NzUzWk0yOS45NjU3JTIwMjQuNDEzN0MyOS40OTg0JTIwMjYuMjM1MSUyMDI5LjI1JTIwMjguMTQ0MiUyMDI5LjI1JTIwMzAuMTExM0MyOS4yNSUyMDMyLjE0ODQlMjAyOS41MTY0JTIwMzQuMTIzMiUyMDMwLjAxNjQlMjAzNi4wMDI5QzMwLjA0MTklMjAzNi4wMDElMjAzMC4wNjc3JTIwMzYlMjAzMC4wOTM4JTIwMzZINDMuMDEwMUM0Mi44NTI3JTIwMzQuMTExMSUyMDQyLjc2OTUlMjAzMi4xMzg1JTIwNDIuNzY5NSUyMDMwLjExMTNDNDIuNzY5NSUyMDI4LjE1NTMlMjA0Mi44NDY5JTIwMjYuMjUlMjA0Mi45OTM4JTIwMjQuNDIxOUgzMC4wOTM4QzMwLjA1MDQlMjAyNC40MjE5JTIwMzAuMDA3NiUyMDI0LjQxOTElMjAyOS45NjU3JTIwMjQuNDEzN1pNNDcuNzEzNiUyMDUyLjU0OTlDMzkuODE0OCUyMDUxLjAxMDglMjAzMy4zNyUyMDQ1LjQwNDclMjAzMC42NDc2JTIwMzhINDMuMjA3OEM0My42MTIxJTIwNDEuNTIxNSUyMDQ0LjI4MSUyMDQ0LjY5MTclMjA0NS4xNTA0JTIwNDcuMjk5OUM0NS44NTkzJTIwNDkuNDI2NCUyMDQ2LjcxOCUyMDUxLjIzMDIlMjA0Ny43MTM2JTIwNTIuNTQ5OVpNNzMuNjQ3MiUyMDIyLjQyMTlINjAuMjYxM0M1OS44NTk1JTIwMTguODIwNiUyMDU5LjE4MTklMjAxNS41Nzk5JTIwNTguMjk2MSUyMDEyLjkyMjZDNTcuNTU4OSUyMDEwLjcxMSUyMDU2LjY1OTYlMjA4Ljg0ODQ3JTIwNTUuNjEyOCUyMDcuNTE2NDdDNjMuOTklMjA4LjgwNDA4JTIwNzAuODY4MSUyMDE0LjYzOTIlMjA3My42NDcyJTIwMjIuNDIxOVpNNDUuMTk4MSUyMDIyLjQyMTlDNDUuNTg5MSUyMDE5LjAzMSUyMDQ2LjIzMDElMjAxNi4wMDgyJTIwNDcuMDQ3OCUyMDEzLjU1NUM0Ny43NDgxJTIwMTEuNDU0MiUyMDQ4LjU1OTklMjA5LjgyNjMxJTIwNDkuNDEyNyUyMDguNzQ0MTFDNTAuMjE0MiUyMDcuNzI3MTglMjA1MC45NTIxJTIwNy4zMDk0OCUyMDUxLjU4MjclMjA3LjI1NTk5QzUxLjY1NjYlMjA3LjI1NDMxJTIwNTEuNzMwNiUyMDcuMjUyOTklMjA1MS44MDQ2JTIwNy4yNTIwMUM1Mi40NDgxJTIwNy4yODM3OSUyMDUzLjIwNzIlMjA3LjY5NTE4JTIwNTQuMDMzOCUyMDguNzQ0MTFDNTQuODg2NyUyMDkuODI2MzElMjA1NS42OTg1JTIwMTEuNDU0MiUyMDU2LjM5ODclMjAxMy41NTVDNTcuMjE2NSUyMDE2LjAwODIlMjA1Ny44NTc1JTIwMTkuMDMxJTIwNTguMjQ4NSUyMDIyLjQyMTlINDUuMTk4MVonJTIwZmlsbD0nJTIzNjE2MTYxJy8lM2UlM2NwYXRoJTIwZmlsbC1ydWxlPSdldmVub2RkJyUyMGNsaXAtcnVsZT0nZXZlbm9kZCclMjBkPSdNNjYuMzk4NSUyMDU1Ljk5NjNDNzIuODAyNyUyMDU1Ljk5NjMlMjA3Ny45OTQzJTIwNTAuODA0NyUyMDc3Ljk5NDMlMjA0NC40MDA1Qzc3Ljk5NDMlMjAzNy45OTYzJTIwNzIuODAyNyUyMDMyLjgwNDclMjA2Ni4zOTg1JTIwMzIuODA0N0M1OS45OTQzJTIwMzIuODA0NyUyMDU0LjgwMjclMjAzNy45OTYzJTIwNTQuODAyNyUyMDQ0LjQwMDVDNTQuODAyNyUyMDUwLjgwNDclMjA1OS45OTQzJTIwNTUuOTk2MyUyMDY2LjM5ODUlMjA1NS45OTYzWk02MC4zNTk3JTIwNTEuNTk0N0M1OC4zMDkyJTIwNDkuODcxOCUyMDU3LjAwNTklMjA0Ny4yODgzJTIwNTcuMDA1OSUyMDQ0LjQwMDVDNTcuMDA1OSUyMDM5LjIxMzElMjA2MS4yMTExJTIwMzUuMDA3OSUyMDY2LjM5ODUlMjAzNS4wMDc5QzY4LjQ0NjclMjAzNS4wMDc5JTIwNzAuMzQxNyUyMDM1LjY2MzQlMjA3MS44ODUyJTIwMzYuNzc2Mkw2MC4zNTk3JTIwNTEuNTk0N1pNNjIuMjk1NiUyMDUyLjg1MTlDNjMuNTM1MyUyMDUzLjQ1NDklMjA2NC45Mjc0JTIwNTMuNzkzMSUyMDY2LjM5ODUlMjA1My43OTMxQzcxLjU4NTklMjA1My43OTMxJTIwNzUuNzkxMSUyMDQ5LjU4NzklMjA3NS43OTExJTIwNDQuNDAwNUM3NS43OTExJTIwNDIuMDkzMSUyMDc0Ljk1OTElMjAzOS45ODAxJTIwNzMuNTc4OCUyMDM4LjM0NUw2Mi4yOTU2JTIwNTIuODUxOVonJTIwZmlsbD0nJTIzRjYzRjNGJy8lM2UlM2Mvc3ZnJTNlXCIiLCI8dGVtcGxhdGU+XG4gIDxxLWNhcmQgY2xhc3M9XCJyb3VuZGVkLWJvcmRlcnNcIiA6ZmxhdD1cImZsYXRcIiA6Y2xhc3M9XCJ7IGRpYWxvZzogaXNEaWFsb2cgfVwiPlxuICAgIDx0ZW1wbGF0ZSB2LWlmPVwiaXNEaWFsb2dcIj5cbiAgICAgIDxxLWJ0blxuICAgICAgICBpY29uPVwiY2xvc2VcIlxuICAgICAgICBmbGF0XG4gICAgICAgIHJvdW5kXG4gICAgICAgIGRlbnNlXG4gICAgICAgIHYtY2xvc2UtcG9wdXBcbiAgICAgICAgY2xhc3M9XCJkaWFsb2ctY2xvc2UtYnRuXCJcbiAgICAgIC8+XG4gICAgPC90ZW1wbGF0ZT5cblxuICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInEtcGEtbm9uZSBxLW1hLW1kXCIgYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgIDxxLWltZyBzcmM9XCJ+YXNzZXRzL25vX2ludGVybmV0LnN2Z1wiIHdpZHRoPVwiMTI4cHhcIiBuby1zcGlubmVyIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNiBxLW15LXNtXCI+Tm8gSW50ZXJuZXQgQ29ubmVjdGlvbjwvZGl2PlxuICAgICAgPHA+Q2hlY2sgdGhlIG5ldHdvcmsgc2V0dGluZ3M8L3A+XG4gICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgPC9xLWNhcmQ+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxudHlwZSBQcm9wcyA9IHtcbiAgZmxhdD86IGJvb2xlYW5cbiAgaXNEaWFsb2c/OiBib29sZWFuXG59XG5cbndpdGhEZWZhdWx0cyhkZWZpbmVQcm9wczxQcm9wcz4oKSwge1xuICBmbGF0OiBmYWxzZSxcbiAgaXNEaWFsb2c6IGZhbHNlXG59KVxuPC9zY3JpcHQ+XG4iLCJpbXBvcnQgeyBkZWZpbmVTdG9yZSB9IGZyb20gJ3BpbmlhJ1xuaW1wb3J0IHsgb25CZWZvcmVVbm1vdW50LCByZWYgfSBmcm9tICd2dWUnXG5cbmV4cG9ydCBjb25zdCB1c2VHbG9iYWxTdG9yZSA9IGRlZmluZVN0b3JlKCdnbG9iYWwnLCAoKSA9PiB7XG4gIGNvbnN0IGlzT25saW5lID0gcmVmKG5hdmlnYXRvci5vbkxpbmUpXG5cbiAgY29uc3QgdXBkYXRlT25saW5lU3RhdHVzID0gKCkgPT4ge1xuICAgIGlzT25saW5lLnZhbHVlID0gbmF2aWdhdG9yLm9uTGluZVxuICB9XG5cbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29ubGluZScsIHVwZGF0ZU9ubGluZVN0YXR1cylcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignb2ZmbGluZScsIHVwZGF0ZU9ubGluZVN0YXR1cylcbiAgfVxuXG4gIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ29ubGluZScsIHVwZGF0ZU9ubGluZVN0YXR1cylcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignb2ZmbGluZScsIHVwZGF0ZU9ubGluZVN0YXR1cylcbiAgfSlcblxuICByZXR1cm4ge1xuICAgIGlzT25saW5lXG4gIH1cbn0pXG4iLCI8dGVtcGxhdGU+XG4gIDxxLWhlYWRlciBjbGFzcz1cImJnLXRyYW5zcGFyZW50IHRleHQtYmxhY2sgcS1wYS1sZ1wiPlxuICAgIDxxLXRvb2xiYXIgY2xhc3M9XCJyb3cganVzdGlmeS1lbmQgaXRlbXMtY2VudGVyIHEtcGEtbm9uZVwiPlxuICAgICAgPGRpdj5cbiAgICAgICAgPHEtYnRuXG4gICAgICAgICAgdi1pZj1cInNob3dCYWNrQnV0dG9uXCJcbiAgICAgICAgICBjbGFzcz1cInEtbXItbWRcIlxuICAgICAgICAgIGZsYXRcbiAgICAgICAgICByb3VuZFxuICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgQGNsaWNrPVwiZ29DYXRhbG9nXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxxLWljb24gbmFtZT1cIm1kaS1jaGV2cm9uLWxlZnRcIiBzaXplPVwiNTZweFwiIC8+XG4gICAgICAgIDwvcS1idG4+XG4gICAgICAgIDxxLWljb24gdi1lbHNlIGNsYXNzPVwicS1tci1tZFwiIG5hbWU9XCJmbGlwcGVyOmFwcHNcIiBzaXplPVwiNTZweFwiIC8+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxoNCBjbGFzcz1cInEtbWEtbm9uZSB0ZXh0LWg0XCI+QXBwczwvaDQ+XG4gICAgICA8cS1zcGFjZSAvPlxuICAgICAgPGRpdlxuICAgICAgICB2LWlmPVwiZ2xvYmFsU3RvcmUuaXNPbmxpbmVcIlxuICAgICAgICBjbGFzcz1cImNvbHVtbiByZWxhdGl2ZS1wb3NpdGlvbiBqdXN0aWZ5LWNlbnRlclwiXG4gICAgICA+XG4gICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgY2xhc3M9XCJxLW1yLW1kIHRleHQtYmxhY2tcIlxuICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDMwMHB4XCJcbiAgICAgICAgICB2LW1vZGVsLnRyaW09XCJzZWFyY2hUZXh0XCJcbiAgICAgICAgICBpbnB1dC1jbGFzcz1cInRleHQtYmxhY2tcIlxuICAgICAgICAgIGJnLWNvbG9yPVwiZ3JleS0zXCJcbiAgICAgICAgICByb3VuZGVkXG4gICAgICAgICAgZGVuc2VcbiAgICAgICAgICBzdGFuZG91dD1cIm5vLXNoYWRvdyB0ZXh0LWJsYWNrXCJcbiAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgbGFiZWw9XCJTZWFyY2hcIlxuICAgICAgICAgIGRlYm91bmNlPVwiNDAwXCJcbiAgICAgICAgICBAdXBkYXRlOm1vZGVsLXZhbHVlPVwiXG4gICAgICAgICAgICAodmFsOiBzdHJpbmcgfCBudW1iZXIgfCBudWxsKSA9PiBzZWFyY2goU3RyaW5nKHZhbCkpXG4gICAgICAgICAgXCJcbiAgICAgICAgICA6ZGlzYWJsZT1cImFwcHNTdG9yZS5mbGFncy5jYXRhbG9nSXNVbmtub3duU0RLXCJcbiAgICAgICAgPlxuICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6cHJlcGVuZD5cbiAgICAgICAgICAgIDxxLWljb24gbmFtZT1cIm1kaS1tYWduaWZ5XCIgY2xhc3M9XCJ0ZXh0LWdyZXktN1wiIC8+XG4gICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgPC9xLWlucHV0PlxuICAgICAgICA8cS1saXN0XG4gICAgICAgICAgdi1pZj1cInNlYXJjaFRleHQubGVuZ3RoID49IDJcIlxuICAgICAgICAgIGJvcmRlcmVkXG4gICAgICAgICAgY2xhc3M9XCJhYnNvbHV0ZSBiZy13aGl0ZSByb3VuZGVkLWJvcmRlcnMgei10b3BcIlxuICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDI3MHB4OyB0b3A6IDQzcHhcIlxuICAgICAgICA+XG4gICAgICAgICAgPHRlbXBsYXRlIHYtaWY9XCJzZWFyY2hSZXN1bHQubGVuZ3RoXCI+XG4gICAgICAgICAgICA8cS1pdGVtXG4gICAgICAgICAgICAgIHYtZm9yPVwiYXBwIGluIHNlYXJjaFJlc3VsdFwiXG4gICAgICAgICAgICAgIDprZXk9XCJhcHAuaWRcIlxuICAgICAgICAgICAgICBjbGlja2FibGVcbiAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgdi1yaXBwbGVcbiAgICAgICAgICAgICAgQGNsaWNrPVwiZ29BcHBQYWdlKGFwcC5hbGlhcylcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gdi1pZj1cImFwcC5jdXJyZW50VmVyc2lvblwiIGF2YXRhcj5cbiAgICAgICAgICAgICAgICA8cS1hdmF0YXIgc3F1YXJlIHNpemU9XCIyNHB4XCIgc3R5bGU9XCJtYXJnaW46IDRweFwiPlxuICAgICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgICA6c3JjPVwiYXBwLmN1cnJlbnRWZXJzaW9uLmljb25VcmlcIlxuICAgICAgICAgICAgICAgICAgICBzdHlsZT1cImltYWdlLXJlbmRlcmluZzogcGl4ZWxhdGVkXCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9xLWF2YXRhcj5cbiAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPnt7IGFwcC5jdXJyZW50VmVyc2lvbi5uYW1lIH19PC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgIDwvcS1pdGVtPlxuICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgPHRlbXBsYXRlIHYtZWxzZS1pZj1cIiFzZWFyY2hMb2FkaW5nXCI+XG4gICAgICAgICAgICA8cS1pdGVtIGRlbnNlPlxuICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gY2xhc3M9XCJ0ZXh0LWdyZXktN1wiPk5vdGhpbmcgZm91bmQ8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgPC9xLWxpc3Q+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxxLWJ0blxuICAgICAgICBjbGFzcz1cInEtbXIteHMgdGV4dC13ZWlnaHQtcmVndWxhclwiXG4gICAgICAgIGZsYXRcbiAgICAgICAgcm91bmRlZFxuICAgICAgICBuby1jYXBzXG4gICAgICAgIDpjb2xvcj1cIiRyb3V0ZS5uYW1lID09PSAnSW5zdGFsbGVkQXBwcycgPyAncHJpbWFyeScgOiAnYmxhY2snXCJcbiAgICAgICAgaWNvbj1cImZsaXBwZXI6aW5zdGFsbGVkXCJcbiAgICAgICAgbGFiZWw9XCJJbnN0YWxsZWRcIlxuICAgICAgICA6dG89XCJ7IG5hbWU6ICdJbnN0YWxsZWRBcHBzJyB9XCJcbiAgICAgID5cbiAgICAgICAgPHEtYmFkZ2VcbiAgICAgICAgICB2LWlmPVwiXG4gICAgICAgICAgICAkcS5zY3JlZW4ud2lkdGggPiAzNjUgJiZcbiAgICAgICAgICAgIGFwcHNTdG9yZS5hcHBzVXBkYXRlQ291bnQgPiAwICYmXG4gICAgICAgICAgICBnbG9iYWxTdG9yZS5pc09ubGluZVxuICAgICAgICAgIFwiXG4gICAgICAgICAgY29sb3I9XCJwb3NpdGl2ZVwiXG4gICAgICAgICAgZmxvYXRpbmdcbiAgICAgICAgICBjbGFzcz1cIm91dGRhdGVkLWJhZGdlXCJcbiAgICAgICAgICA6bGFiZWw9XCJhcHBzU3RvcmUuYXBwc1VwZGF0ZUNvdW50XCJcbiAgICAgICAgLz5cbiAgICAgIDwvcS1idG4+XG4gICAgICA8cS1idG5cbiAgICAgICAgY2xhc3M9XCJ0ZXh0LXdlaWdodC1yZWd1bGFyXCJcbiAgICAgICAgZmxhdFxuICAgICAgICByb3VuZGVkXG4gICAgICAgIG5vLWNhcHNcbiAgICAgICAgY29sb3I9XCJibGFja1wiXG4gICAgICAgIGljb249XCJtZGktZ2l0aHViXCJcbiAgICAgICAgbGFiZWw9XCJDb250cmlidXRlXCJcbiAgICAgICAgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9mbGlwcGVyZGV2aWNlcy9mbGlwcGVyLWFwcGxpY2F0aW9uLWNhdGFsb2dcIlxuICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxuICAgICAgLz5cbiAgICA8L3EtdG9vbGJhcj5cbiAgPC9xLWhlYWRlcj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgeyBjb21wdXRlZCwgcmVmIH0gZnJvbSAndnVlJ1xuaW1wb3J0IHsgdXNlUm91dGUsIHVzZVJvdXRlciB9IGZyb20gJ3Z1ZS1yb3V0ZXInXG5pbXBvcnQgeyBBcHBzTW9kZWwsIEFwcHNBcGkgfSBmcm9tICdlbnRpdHkvQXBwcydcbmNvbnN0IGFwcHNTdG9yZSA9IEFwcHNNb2RlbC51c2VBcHBzU3RvcmUoKVxuXG5jb25zdCB7IGZldGNoQXBwc1Nob3J0IH0gPSBBcHBzQXBpXG5cbmltcG9ydCB7IEZsaXBwZXJNb2RlbCB9IGZyb20gJ2VudGl0eS9GbGlwcGVyJ1xuY29uc3QgZmxpcHBlclN0b3JlID0gRmxpcHBlck1vZGVsLnVzZUZsaXBwZXJTdG9yZSgpXG5cbmltcG9ydCB7IENhdGVnb3J5TW9kZWwgfSBmcm9tICdlbnRpdHkvQ2F0ZWdvcnknXG5jb25zdCBjYXRlZ29yaWVzU3RvcmUgPSBDYXRlZ29yeU1vZGVsLnVzZUNhdGVnb3JpZXNTdG9yZSgpXG5cbmltcG9ydCB7IHVzZUdsb2JhbFN0b3JlIH0gZnJvbSAnc2hhcmVkL3N0b3Jlcy9nbG9iYWwtc3RvcmUnXG5jb25zdCBnbG9iYWxTdG9yZSA9IHVzZUdsb2JhbFN0b3JlKClcblxuY29uc3Qgc2VhcmNoVGV4dCA9IHJlZignJylcbmNvbnN0IHNlYXJjaExvYWRpbmcgPSByZWYoZmFsc2UpXG5jb25zdCBzZWFyY2hSZXN1bHQgPSByZWY8QXBwc01vZGVsLkFwcFtdPihbXSlcbmNvbnN0IHNlYXJjaCA9IGFzeW5jICh2YWw6IHN0cmluZykgPT4ge1xuICBpZiAodmFsLmxlbmd0aCA8IDMpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIHR5cGUgUGFyYW1zID0ge1xuICAgIGxpbWl0OiBudW1iZXJcbiAgICBvZmZzZXQ6IG51bWJlclxuICAgIHNvcnRfYnk6IHN0cmluZ1xuICAgIHNvcnRfb3JkZXI6IG51bWJlclxuICAgIGlzX2xhdGVzdF9yZWxlYXNlX3ZlcnNpb24/OiBib29sZWFuXG4gICAgYXBpPzogc3RyaW5nXG4gICAgdGFyZ2V0Pzogc3RyaW5nXG4gICAgcXVlcnk6IHN0cmluZ1xuICB9XG5cbiAgY29uc3QgcGFyYW1zOiBQYXJhbXMgPSB7XG4gICAgbGltaXQ6IDgsXG4gICAgb2Zmc2V0OiAwLFxuICAgIHNvcnRfYnk6ICd1cGRhdGVkX2F0JyxcbiAgICBzb3J0X29yZGVyOiAtMSxcbiAgICBpc19sYXRlc3RfcmVsZWFzZV92ZXJzaW9uOiB0cnVlLFxuICAgIHF1ZXJ5OiB2YWxcbiAgfVxuXG4gIGNvbnN0IGFwaSA9IGZsaXBwZXJTdG9yZS5hcGlcbiAgY29uc3QgdGFyZ2V0ID0gZmxpcHBlclN0b3JlLnRhcmdldFxuICBpZiAoYXBpIHx8IHRhcmdldCkge1xuICAgIGRlbGV0ZSBwYXJhbXMuaXNfbGF0ZXN0X3JlbGVhc2VfdmVyc2lvblxuXG4gICAgaWYgKHRhcmdldCkge1xuICAgICAgcGFyYW1zLnRhcmdldCA9IHRhcmdldFxuICAgIH1cbiAgICBpZiAoYXBpKSB7XG4gICAgICBwYXJhbXMuYXBpID0gYXBpXG4gICAgfVxuICB9XG5cbiAgc2VhcmNoTG9hZGluZy52YWx1ZSA9IHRydWVcbiAgYXdhaXQgZmV0Y2hBcHBzU2hvcnQocGFyYW1zKVxuICAgIC50aGVuKChhcHBzOiBBcHBzTW9kZWwuQXBwW10pID0+IHtcbiAgICAgIHNlYXJjaFJlc3VsdC52YWx1ZSA9IGFwcHNcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpXG4gICAgICBzZWFyY2hSZXN1bHQudmFsdWUgPSBbXVxuICAgIH0pXG4gIHNlYXJjaExvYWRpbmcudmFsdWUgPSBmYWxzZVxufVxuXG5jb25zdCBnb0FwcFBhZ2UgPSAoYXBwQWxpYXM6IEFwcHNNb2RlbC5BcHBbJ2FsaWFzJ10pID0+IHtcbiAgcm91dGVyLnB1c2goeyBuYW1lOiAnQXBwc1BhdGgnLCBwYXJhbXM6IHsgcGF0aDogYXBwQWxpYXMgfSB9KVxuICBzZWFyY2hUZXh0LnZhbHVlID0gJydcbiAgc2VhcmNoUmVzdWx0LnZhbHVlID0gW11cbn1cblxuY29uc3Qgcm91dGUgPSB1c2VSb3V0ZSgpXG5jb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKVxuXG5jb25zdCBzaG93QmFja0J1dHRvbiA9IGNvbXB1dGVkKFxuICAoKSA9PiByb3V0ZS5uYW1lID09PSAnQXBwc1BhdGgnIHx8IHJvdXRlLm5hbWUgPT09ICdJbnN0YWxsZWRBcHBzJ1xuKVxuXG5jb25zdCBnb0NhdGFsb2cgPSAoKSA9PiB7XG4gIGlmIChjYXRlZ29yaWVzU3RvcmUuY3VycmVudENhdGVnb3J5KSB7XG4gICAgcm91dGVyLnB1c2goe1xuICAgICAgbmFtZTogJ0FwcHNDYXRlZ29yeScsXG4gICAgICBwYXJhbXM6IHsgcGF0aDogY2F0ZWdvcmllc1N0b3JlLmN1cnJlbnRDYXRlZ29yeS5uYW1lLnRvTG93ZXJDYXNlKCkgfVxuICAgIH0pXG4gIH0gZWxzZSB7XG4gICAgcm91dGVyLnB1c2goeyBuYW1lOiAnQXBwcycgfSlcbiAgfVxufVxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gIDxxLWxheW91dCB2aWV3PVwibGhyIExwUiBsRmZcIj5cbiAgICA8cS1wYWdlLWNvbnRhaW5lcj5cbiAgICAgIDxBcHBzSGVhZGVyIC8+XG4gICAgICA8cm91dGVyLXZpZXcgLz5cbiAgICAgIDxBcHBOb0ZyZWVTcGFjZURpYWxvZyB2LW1vZGVsPVwiYXBwc1N0b3JlLmRpYWxvZ3Mubm9GcmVlU3BhY2VcIiAvPlxuICAgIDwvcS1wYWdlLWNvbnRhaW5lcj5cbiAgPC9xLWxheW91dD5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgeyBBcHBzSGVhZGVyIH0gZnJvbSAnZmVhdHVyZXMvQXBwcy9IZWFkZXInXG5pbXBvcnQgeyBBcHBzTW9kZWwsIEFwcE5vRnJlZVNwYWNlRGlhbG9nIH0gZnJvbSAnZW50aXR5L0FwcHMnXG5jb25zdCBhcHBzU3RvcmUgPSBBcHBzTW9kZWwudXNlQXBwc1N0b3JlKClcbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICA8cS1idG5cbiAgICBjbGFzcz1cInRleHQtcGl4ZWxhdGVkIGZpdCB0ZXh0LWJvZHkxXCJcbiAgICB1bmVsZXZhdGVkXG4gICAgZGVuc2VcbiAgICBjb2xvcj1cInByaW1hcnlcIlxuICAgIGxhYmVsPVwiSW5zdGFsbFwiXG4gICAgQGNsaWNrLnN0b3A9XCJvbkNsaWNrXCJcbiAgICA6bG9hZGluZz1cInByb3BzLmxvYWRpbmdcIlxuICAvPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCB7IEFwcHNNb2RlbCB9IGZyb20gJ2VudGl0eS9BcHBzJ1xuY29uc3QgYXBwc1N0b3JlID0gQXBwc01vZGVsLnVzZUFwcHNTdG9yZSgpXG5cbmludGVyZmFjZSBQcm9wcyB7XG4gIGFwcD86IEFwcHNNb2RlbC5BcHBcbiAgbG9hZGluZz86IGJvb2xlYW5cbn1cblxuY29uc3QgcHJvcHMgPSB3aXRoRGVmYXVsdHMoZGVmaW5lUHJvcHM8UHJvcHM+KCksIHtcbiAgbG9hZGluZzogZmFsc2Vcbn0pXG5cbmNvbnN0IG9uQ2xpY2sgPSAoKSA9PiB7XG4gIGlmIChwcm9wcy5hcHApIHtcbiAgICBhcHBzU3RvcmUub25BY3Rpb24ocHJvcHMuYXBwLCAnaW5zdGFsbCcpXG4gIH1cbn1cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICA8cS1idG5cbiAgICBjbGFzcz1cInRleHQtcGl4ZWxhdGVkIGZpdCB0ZXh0LWJvZHkxXCJcbiAgICB1bmVsZXZhdGVkXG4gICAgZGVuc2VcbiAgICBjb2xvcj1cImFjY2VudFwiXG4gICAgbGFiZWw9XCJPcGVuXCJcbiAgICBAY2xpY2suc3RvcD1cIm9uQ2xpY2tcIlxuICAgIDpsb2FkaW5nPVwicHJvcHMubG9hZGluZ1wiXG4gIC8+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHsgQXBwc01vZGVsIH0gZnJvbSAnZW50aXR5L0FwcHMnXG5jb25zdCBhcHBzU3RvcmUgPSBBcHBzTW9kZWwudXNlQXBwc1N0b3JlKClcblxuaW1wb3J0IHsgRmxpcHBlck1vZGVsIH0gZnJvbSAnZW50aXR5L0ZsaXBwZXInXG5jb25zdCBmbGlwcGVyU3RvcmUgPSBGbGlwcGVyTW9kZWwudXNlRmxpcHBlclN0b3JlKClcblxuaW50ZXJmYWNlIFByb3BzIHtcbiAgYXBwOiBBcHBzTW9kZWwuSW5zdGFsbGVkQXBwXG4gIGxvYWRpbmc/OiBib29sZWFuXG59XG5cbmNvbnN0IHByb3BzID0gd2l0aERlZmF1bHRzKGRlZmluZVByb3BzPFByb3BzPigpLCB7XG4gIGxvYWRpbmc6IGZhbHNlXG59KVxuXG5jb25zdCBvbkNsaWNrID0gKCkgPT4ge1xuICBpZiAocHJvcHMuYXBwKSB7XG4gICAgYXBwc1N0b3JlXG4gICAgICAub3BlbkFwcChwcm9wcy5hcHAucGF0aClcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgZmxpcHBlclN0b3JlLmZsaXBwZXIhLmZyYW1lRGF0YSA9IHVuZGVmaW5lZFxuXG4gICAgICAgIGZsaXBwZXJTdG9yZS5leHBhbmRWaWV3ID0gdHJ1ZVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcicpXG4gICAgICB9KVxuICB9XG59XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtYnRuXG4gICAgY2xhc3M9XCJ0ZXh0LXBpeGVsYXRlZCBmaXQgdGV4dC1ib2R5MVwiXG4gICAgdW5lbGV2YXRlZFxuICAgIGRlbnNlXG4gICAgY29sb3I9XCJwb3NpdGl2ZVwiXG4gICAgbGFiZWw9XCJVcGRhdGVcIlxuICAgIEBjbGljay5zdG9wPVwib25DbGlja1wiXG4gICAgOmxvYWRpbmc9XCJwcm9wcy5sb2FkaW5nXCJcbiAgLz5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgeyBBcHBzTW9kZWwgfSBmcm9tICdlbnRpdHkvQXBwcydcbmNvbnN0IGFwcHNTdG9yZSA9IEFwcHNNb2RlbC51c2VBcHBzU3RvcmUoKVxuXG5pbnRlcmZhY2UgUHJvcHMge1xuICBhcHA6IEFwcHNNb2RlbC5JbnN0YWxsZWRBcHAgfCBBcHBzTW9kZWwuQXBwXG4gIGxvYWRpbmc/OiBib29sZWFuXG59XG5cbmNvbnN0IHByb3BzID0gd2l0aERlZmF1bHRzKGRlZmluZVByb3BzPFByb3BzPigpLCB7XG4gIGxvYWRpbmc6IGZhbHNlXG59KVxuXG5jb25zdCBvbkNsaWNrID0gKCkgPT4ge1xuICBpZiAocHJvcHMuYXBwKSB7XG4gICAgYXBwc1N0b3JlLm9uQWN0aW9uKHByb3BzLmFwcCwgJ3VwZGF0ZScpXG4gIH1cbn1cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICA8cS1idG5cbiAgICBjbGFzcz1cImJ1dHRvbiBmaXRcIlxuICAgIHBhZGRpbmc9XCJ4c1wiXG4gICAgY29sb3I9XCJuZWdhdGl2ZVwiXG4gICAgb3V0bGluZVxuICAgIGljb249XCJmbGlwcGVyOmRlbGV0ZVwiXG4gICAgQGNsaWNrLnN0b3A9XCJzaG93RGlhbG9nXCJcbiAgICA6bG9hZGluZz1cInByb3BzLmxvYWRpbmdcIlxuICA+XG4gICAgPHEtZGlhbG9nIHYtbW9kZWw9XCJkZWxldGVDb25maXJtYXRpb25EaWFsb2dcIj5cbiAgICAgIDxxLWNhcmQgY2xhc3M9XCJkaWFsb2dcIiBzdHlsZT1cIm1pbi13aWR0aDogMzAwcHhcIj5cbiAgICAgICAgPHEtY2FyZC1zZWN0aW9uIGNsYXNzPVwicS1wYi1ub25lXCI+XG4gICAgICAgICAgPGg2IGNsYXNzPVwicS1tYS1ub25lXCI+RGVsZXRlIHRoaXMgYXBwPzwvaDY+XG4gICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG5cbiAgICAgICAgPHEtY2FyZC1zZWN0aW9uIGNsYXNzPVwicS1wdC1ub25lIHEtbXktbWQgdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleCBuby13cmFwIGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFwcC1pY29uIHEtbXItbWRcIj5cbiAgICAgICAgICAgICAgPHEtaW1nXG4gICAgICAgICAgICAgICAgOnNyYz1cIlxuICAgICAgICAgICAgICAgICAgYXBwLmN1cnJlbnRWZXJzaW9uPy5pY29uVXJpID8/XG4gICAgICAgICAgICAgICAgICBgZGF0YTppbWFnZS9wbmc7YmFzZTY0LCR7YXBwLmljb259YFxuICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgOmVycm9yLXNyYz1cImBkYXRhOmltYWdlL3BuZztiYXNlNjQsJHthcHAuaWNvbn1gXCJcbiAgICAgICAgICAgICAgICB3aWR0aD1cIjUwcHhcIlxuICAgICAgICAgICAgICAgIHN0eWxlPVwiaW1hZ2UtcmVuZGVyaW5nOiBwaXhlbGF0ZWRcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uIGl0ZW1zLXN0YXJ0XCI+XG4gICAgICAgICAgICAgIDxoNlxuICAgICAgICAgICAgICAgIGNsYXNzPVwicS1tYS1ub25lXCJcbiAgICAgICAgICAgICAgICBzdHlsZT1cImxpbmUtaGVpZ2h0OiAxLjVlbTsgbWFyZ2luLWJvdHRvbTogMC4yNXJlbVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7eyBhcHAuY3VycmVudFZlcnNpb24/Lm5hbWUgPz8gYXBwLm5hbWUgfX1cbiAgICAgICAgICAgICAgPC9oNj5cbiAgICAgICAgICAgICAgPHBcbiAgICAgICAgICAgICAgICB2LWlmPVwiYXBwLmN1cnJlbnRWZXJzaW9uPy52ZXJzaW9uXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cInRleHQtZ3JleS03IHEtbWEtbm9uZVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8Yj52e3sgYXBwLmN1cnJlbnRWZXJzaW9uLnZlcnNpb24gfX08L2I+XG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuXG4gICAgICAgIDxxLWNhcmQtYWN0aW9ucyBjbGFzcz1cInEtcHQtbm9uZVwiIGFsaWduPVwiYmV0d2VlblwiPlxuICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgY2xhc3M9XCJjb2wgcS1tci1tZFwiXG4gICAgICAgICAgICBmbGF0XG4gICAgICAgICAgICB0ZXh0LWNvbG9yPVwiZGFya1wiXG4gICAgICAgICAgICBsYWJlbD1cIkNhbmNlbFwiXG4gICAgICAgICAgICB2LWNsb3NlLXBvcHVwXG4gICAgICAgICAgLz5cbiAgICAgICAgICA8cS1idG5cbiAgICAgICAgICAgIGNsYXNzPVwiY29sXCJcbiAgICAgICAgICAgIG91dGxpbmVcbiAgICAgICAgICAgIGNvbG9yPVwibmVnYXRpdmVcIlxuICAgICAgICAgICAgbGFiZWw9XCJEZWxldGVcIlxuICAgICAgICAgICAgdi1jbG9zZS1wb3B1cFxuICAgICAgICAgICAgQGNsaWNrPVwib25DbGlja1wiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9xLWNhcmQtYWN0aW9ucz5cbiAgICAgIDwvcS1jYXJkPlxuICAgIDwvcS1kaWFsb2c+XG4gIDwvcS1idG4+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHsgcmVmIH0gZnJvbSAndnVlJ1xuaW1wb3J0IHsgQXBwc01vZGVsIH0gZnJvbSAnZW50aXR5L0FwcHMnXG5jb25zdCBhcHBzU3RvcmUgPSBBcHBzTW9kZWwudXNlQXBwc1N0b3JlKClcblxuY29uc3QgZGVsZXRlQ29uZmlybWF0aW9uRGlhbG9nID0gcmVmKGZhbHNlKVxuY29uc3Qgc2hvd0RpYWxvZyA9ICgpID0+IHtcbiAgZGVsZXRlQ29uZmlybWF0aW9uRGlhbG9nLnZhbHVlID0gdHJ1ZVxufVxuXG5pbnRlcmZhY2UgUHJvcHMge1xuICBhcHA6IEFwcHNNb2RlbC5JbnN0YWxsZWRBcHAgfCBBcHBzTW9kZWwuQXBwXG4gIGxvYWRpbmc/OiBib29sZWFuXG59XG5cbmNvbnN0IHByb3BzID0gd2l0aERlZmF1bHRzKGRlZmluZVByb3BzPFByb3BzPigpLCB7XG4gIGxvYWRpbmc6IGZhbHNlXG59KVxuXG5jb25zdCBvbkNsaWNrID0gKCkgPT4ge1xuICBpZiAocHJvcHMuYXBwKSB7XG4gICAgYXBwc1N0b3JlLm9uQWN0aW9uKHByb3BzLmFwcCwgJ2RlbGV0ZScpXG4gIH1cbn1cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwiYXBwXCI+XG4gICAgPHRlbXBsYXRlIHYtaWY9XCJsb2FkaW5nXCI+XG4gICAgICA8TG9hZGluZyBsYWJlbD1cIkxvYWRpbmcgYXBwLi4uXCIgLz5cbiAgICA8L3RlbXBsYXRlPlxuICAgIDx0ZW1wbGF0ZSB2LWVsc2UtaWY9XCJjdXJyZW50QXBwXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwicm93IGl0ZW1zLWNlbnRlciBxLW1iLWxnXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgY29sXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFwcF9faWNvbi13cmFwcGVyIHEtbXItbWRcIj5cbiAgICAgICAgICAgIDxxLWltZ1xuICAgICAgICAgICAgICA6c3JjPVwiY3VycmVudEFwcC5jdXJyZW50VmVyc2lvbi5pY29uVXJpXCJcbiAgICAgICAgICAgICAgc3R5bGU9XCJpbWFnZS1yZW5kZXJpbmc6IHBpeGVsYXRlZFwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2xcIj5cbiAgICAgICAgICAgIDxoMiBjbGFzcz1cInRleHQtaDYgcS1tYS1ub25lIHEtbWIteHNcIj5cbiAgICAgICAgICAgICAge3sgY3VycmVudEFwcC5jdXJyZW50VmVyc2lvbi5uYW1lIH19XG4gICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBpdGVtcy1jZW50ZXIgcS1ndXR0ZXIteC1tZFwiPlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxDYXRlZ29yeUNoaXBcbiAgICAgICAgICAgICAgICAgIHYtaWY9XCJjYXRlZ29yeVwiXG4gICAgICAgICAgICAgICAgICB2LWJpbmQ9XCJjYXRlZ29yeVwiXG4gICAgICAgICAgICAgICAgICBAY2xpY2s9XCJnb0NhdGVnb3J5XCJcbiAgICAgICAgICAgICAgICAgIGlzQ3VycmVudENhdGVnb3J5XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxwIGNsYXNzPVwicS1tYi1ub25lXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWdyZXktNyBxLW1yLXhzXCI+VmVyc2lvbjo8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWJvbGRcIj5cbiAgICAgICAgICAgICAgICAgIHt7IGN1cnJlbnRBcHAuY3VycmVudFZlcnNpb24udmVyc2lvbiB9fVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICA8cCBjbGFzcz1cInEtbWItbm9uZVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1ncmV5LTcgcS1tci14c1wiPlNpemU6PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1ib2xkXCI+XG4gICAgICAgICAgICAgICAgICB7e1xuICAgICAgICAgICAgICAgICAgICBieXRlc1RvU2l6ZShcbiAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50QXBwLmN1cnJlbnRWZXJzaW9uLmN1cnJlbnRCdWlsZC5tZXRhZGF0YS5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgPHRlbXBsYXRlIHYtaWY9XCJnZXRTdGF0dXNIaW50XCI+XG4gICAgICAgICAgICAgICAgPHEtY2hpcFxuICAgICAgICAgICAgICAgICAgOmNsYXNzPVwieyAnbm8tcG9pbnRlci1ldmVudHMnOiAhZ2V0U3RhdHVzSGludC5kaWFsb2cgfVwiXG4gICAgICAgICAgICAgICAgICA6Y29sb3I9XCJnZXRTdGF0dXNIaW50LmNvbG9yXCJcbiAgICAgICAgICAgICAgICAgIDppY29uPVwiZ2V0U3RhdHVzSGludC5pY29uXCJcbiAgICAgICAgICAgICAgICAgIDpsYWJlbD1cImdldFN0YXR1c0hpbnQudGV4dFwiXG4gICAgICAgICAgICAgICAgICA6Y2xpY2thYmxlPVwiISFnZXRTdGF0dXNIaW50LmRpYWxvZ1wiXG4gICAgICAgICAgICAgICAgICBAY2xpY2s9XCJzaG93RGlhbG9nKGdldFN0YXR1c0hpbnQuZGlhbG9nKVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPHEtdG9vbHRpcCB2LWlmPVwiZ2V0U3RhdHVzSGludC50b29sdGlwXCI+XG4gICAgICAgICAgICAgICAgICAgIHt7IGdldFN0YXR1c0hpbnQudG9vbHRpcCB9fVxuICAgICAgICAgICAgICAgICAgPC9xLXRvb2x0aXA+XG4gICAgICAgICAgICAgICAgPC9xLWNoaXA+XG4gICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxxLXNwYWNlIC8+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJxLXB5LXNtIHJvdyBuby13cmFwXCI+XG4gICAgICAgICAgPHRlbXBsYXRlIHYtaWY9XCJjdXJyZW50QXBwLmFjdGlvbj8udHlwZVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1hdXRvIGZpdFwiPlxuICAgICAgICAgICAgICA8UHJvZ3Jlc3NCYXJcbiAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAxODhweFwiXG4gICAgICAgICAgICAgICAgOnRpdGxlPVwiY3VycmVudEFwcC5hY3Rpb24ucHJvZ3Jlc3MgKiAxMDAgKyAnJSdcIlxuICAgICAgICAgICAgICAgIHRpdGxlU2l6ZT1cIjQwcHhcIlxuICAgICAgICAgICAgICAgIDpwcm9ncmVzcz1cImN1cnJlbnRBcHAuYWN0aW9uLnByb2dyZXNzXCJcbiAgICAgICAgICAgICAgICA6Y29sb3I9XCJhcHBzU3RvcmUucHJvZ3Jlc3NDb2xvcnMoY3VycmVudEFwcC5hY3Rpb24udHlwZSkuYmFyXCJcbiAgICAgICAgICAgICAgICA6dHJhY2stY29sb3I9XCJcbiAgICAgICAgICAgICAgICAgIGFwcHNTdG9yZS5wcm9ncmVzc0NvbG9ycyhjdXJyZW50QXBwLmFjdGlvbi50eXBlKS50cmFja1xuICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgaW50ZXJwb2xhdGVkXG4gICAgICAgICAgICAgICAgc2l6ZT1cIjU0cHhcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICA8dGVtcGxhdGUgdi1lbHNlPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1hdXRvXCIgOmNsYXNzPVwieyAncS1tci1tZCc6IGlzSW5zdGFsbGVkT3JVcGRhdGUgfVwiPlxuICAgICAgICAgICAgICA8dGVtcGxhdGVcbiAgICAgICAgICAgICAgICB2LWlmPVwiYXBwc1N0b3JlLmdldEJ1dHRvblN0YXRlKGN1cnJlbnRBcHApID09PSAndW5zdXBwb3J0ZWQnXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxBcHBJbnN0YWxsZWRCdG4gc2l6ZT1cIjIycHhcIiBwYWRkaW5nPVwiMTVweCA2MHB4XCIgLz5cbiAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgPHRlbXBsYXRlXG4gICAgICAgICAgICAgICAgdi1lbHNlLWlmPVwiYXBwc1N0b3JlLmdldEJ1dHRvblN0YXRlKGN1cnJlbnRBcHApID09PSAnaW5zdGFsbGVkJ1wiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8QXBwT3BlbkFwcEJ0blxuICAgICAgICAgICAgICAgICAgOmFwcD1cImFwcHNTdG9yZS5nZXRBcHBQYXRoKGN1cnJlbnRBcHApXCJcbiAgICAgICAgICAgICAgICAgIHNpemU9XCIyMnB4XCJcbiAgICAgICAgICAgICAgICAgIHBhZGRpbmc9XCIxNXB4IDYwcHhcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICAgIDx0ZW1wbGF0ZVxuICAgICAgICAgICAgICAgIHYtZWxzZS1pZj1cImFwcHNTdG9yZS5nZXRCdXR0b25TdGF0ZShjdXJyZW50QXBwKSA9PT0gJ3VwZGF0ZSdcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPEFwcFVwZGF0ZUJ0blxuICAgICAgICAgICAgICAgICAgOmFwcD1cImN1cnJlbnRBcHBcIlxuICAgICAgICAgICAgICAgICAgOmxvYWRpbmc9XCJhcHBzU3RvcmUubG9hZGluZ0luc3RhbGxlZEFwcHNcIlxuICAgICAgICAgICAgICAgICAgc2l6ZT1cIjIycHhcIlxuICAgICAgICAgICAgICAgICAgcGFkZGluZz1cIjE1cHggNjBweFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgPHRlbXBsYXRlIHYtZWxzZT5cbiAgICAgICAgICAgICAgICA8QXBwSW5zdGFsbEJ0blxuICAgICAgICAgICAgICAgICAgOmFwcD1cImN1cnJlbnRBcHBcIlxuICAgICAgICAgICAgICAgICAgOmxvYWRpbmc9XCJhcHBzU3RvcmUubG9hZGluZ0luc3RhbGxlZEFwcHNcIlxuICAgICAgICAgICAgICAgICAgc2l6ZT1cIjIycHhcIlxuICAgICAgICAgICAgICAgICAgcGFkZGluZz1cIjE1cHggNjBweFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHRlbXBsYXRlIHYtaWY9XCJpc0luc3RhbGxlZE9yVXBkYXRlXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtYXV0b1wiPlxuICAgICAgICAgICAgICAgIDxBcHBEZWxldGVCdG4gOmFwcD1cImN1cnJlbnRBcHBcIiBzaXplPVwiMTZweFwiIHBhZGRpbmc9XCIxNXB4XCIgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwicm93IHEtbWItbGdcIiBzdHlsZT1cImhlaWdodDogMTQwcHhcIj5cbiAgICAgICAgPHEtYnRuXG4gICAgICAgICAgZmxhdFxuICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgICBpY29uPVwibWRpLWNoZXZyb24tbGVmdFwiXG4gICAgICAgICAgQGNsaWNrPVwiYW5pbWF0ZVNjcm9sbCgnYmFja3dhcmQnKVwiXG4gICAgICAgIC8+XG4gICAgICAgIDxxLXNjcm9sbC1hcmVhXG4gICAgICAgICAgcmVmPVwic2Nyb2xsQXJlYVJlZlwiXG4gICAgICAgICAgY2xhc3M9XCJyb3cgY29sIG5vLXdyYXAgbm8tcG9pbnRlci1ldmVudHMgcS1teC1zbVwiXG4gICAgICAgICAgOnRodW1iLXN0eWxlPVwieyBkaXNwbGF5OiAnbm9uZScgfVwiXG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXBwX19zY3JlZW5zaG90LXdyYXBwZXIgcm93IG5vLXdyYXBcIj5cbiAgICAgICAgICAgIDx0ZW1wbGF0ZVxuICAgICAgICAgICAgICB2LWZvcj1cIihzY3JlZW5zaG90LCBpbmRleCkgaW4gY3VycmVudEFwcC5jdXJyZW50VmVyc2lvblxuICAgICAgICAgICAgICAgIC5zY3JlZW5zaG90c1wiXG4gICAgICAgICAgICAgIDprZXk9XCJpbmRleFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhcHBfX2ltYWdlLXdyYXBwZXIgYmctcHJpbWFyeSBxLXBhLXhzIHEtbXgteHNcIj5cbiAgICAgICAgICAgICAgICA8cS1pbWdcbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwiYXBwX19pbWFnZVwiXG4gICAgICAgICAgICAgICAgICA6cmF0aW89XCIyNTYgLyAxMjhcIlxuICAgICAgICAgICAgICAgICAgOnNyYz1cInNjcmVlbnNob3RcIlxuICAgICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMjQ4cHhcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9xLXNjcm9sbC1hcmVhPlxuICAgICAgICA8cS1idG5cbiAgICAgICAgICBmbGF0XG4gICAgICAgICAgZGVuc2VcbiAgICAgICAgICBjb2xvcj1cInByaW1hcnlcIlxuICAgICAgICAgIGljb249XCJtZGktY2hldnJvbi1yaWdodFwiXG4gICAgICAgICAgQGNsaWNrPVwiYW5pbWF0ZVNjcm9sbCgnZm9yd2FyZCcpXCJcbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInEtbWItbGdcIj5cbiAgICAgICAgPGg1IGNsYXNzPVwidGV4dC1oNSBxLW15LXNtXCI+RGVzY3JpcHRpb248L2g1PlxuICAgICAgICA8cS1tYXJrZG93blxuICAgICAgICAgIG5vLWhlYWRpbmctYW5jaG9yLWxpbmtzXG4gICAgICAgICAgbm8taHRtbFxuICAgICAgICAgIG5vLWltYWdlXG4gICAgICAgICAgbm8tbGlua1xuICAgICAgICAgIG5vLWxpbmtpZnlcbiAgICAgICAgICBuby10eXBvZ3JhcGhlclxuICAgICAgICAgIDpzcmM9XCJjdXJyZW50QXBwLmN1cnJlbnRWZXJzaW9uLnNob3J0RGVzY3JpcHRpb25cIlxuICAgICAgICA+PC9xLW1hcmtkb3duPlxuICAgICAgICA8cS1tYXJrZG93blxuICAgICAgICAgIG5vLWhlYWRpbmctYW5jaG9yLWxpbmtzXG4gICAgICAgICAgbm8taHRtbFxuICAgICAgICAgIG5vLWltYWdlXG4gICAgICAgICAgbm8tdHlwb2dyYXBoZXJcbiAgICAgICAgICA6c3JjPVwiY3VycmVudEFwcC5jdXJyZW50VmVyc2lvbi5kZXNjcmlwdGlvblwiXG4gICAgICAgID48L3EtbWFya2Rvd24+XG4gICAgICAgIDxoNSBjbGFzcz1cInRleHQtaDUgcS1teS1zbVwiPkNoYW5nZWxvZzwvaDU+XG4gICAgICAgIDxxLW1hcmtkb3duXG4gICAgICAgICAgbm8taGVhZGluZy1hbmNob3ItbGlua3NcbiAgICAgICAgICBuby1odG1sXG4gICAgICAgICAgbm8taW1hZ2VcbiAgICAgICAgICBuby10eXBvZ3JhcGhlclxuICAgICAgICAgIDpzcmM9XCJjdXJyZW50QXBwLmN1cnJlbnRWZXJzaW9uLmNoYW5nZWxvZ1wiXG4gICAgICAgID48L3EtbWFya2Rvd24+XG4gICAgICAgIDxoNSBjbGFzcz1cInRleHQtaDYgcS1teS1zbVwiPkRldmVsb3BlcjwvaDU+XG4gICAgICAgIDxwPlxuICAgICAgICAgIDxhXG4gICAgICAgICAgICBjbGFzcz1cInRleHQtZ3JleS03XCJcbiAgICAgICAgICAgIDpocmVmPVwiY3VycmVudEFwcC5jdXJyZW50VmVyc2lvbi5saW5rcy5tYW5pZmVzdFVyaVwiXG4gICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxuICAgICAgICAgICAgc3R5bGU9XCJ0ZXh0LWRlY29yYXRpb246IG5vbmVcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxxLWljb24gbmFtZT1cIm1kaS1naXRodWJcIiBjb2xvcj1cImdyZXktN1wiIHNpemU9XCIyMHB4XCIgLz5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicS1tbC14c1wiIHN0eWxlPVwidGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmVcIlxuICAgICAgICAgICAgICA+TWFuaWZlc3Q8L3NwYW5cbiAgICAgICAgICAgID5cbiAgICAgICAgICA8L2E+XG4gICAgICAgICAgPGJyIC8+XG4gICAgICAgICAgPGFcbiAgICAgICAgICAgIGNsYXNzPVwidGV4dC1ncmV5LTdcIlxuICAgICAgICAgICAgOmhyZWY9XCJjdXJyZW50QXBwLmN1cnJlbnRWZXJzaW9uLmxpbmtzLnNvdXJjZUNvZGUudXJpXCJcbiAgICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiXG4gICAgICAgICAgICBzdHlsZT1cInRleHQtZGVjb3JhdGlvbjogbm9uZVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHEtaWNvbiBuYW1lPVwibWRpLWdpdGh1YlwiIGNvbG9yPVwiZ3JleS03XCIgc2l6ZT1cIjIwcHhcIiAvPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJxLW1sLXhzXCIgc3R5bGU9XCJ0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZVwiXG4gICAgICAgICAgICAgID5SZXBvc2l0b3J5PC9zcGFuXG4gICAgICAgICAgICA+XG4gICAgICAgICAgPC9hPlxuICAgICAgICA8L3A+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxxLWJ0blxuICAgICAgICBuby1jYXBzXG4gICAgICAgIG91dGxpbmVcbiAgICAgICAgY29sb3I9XCJuZWdhdGl2ZVwiXG4gICAgICAgIGljb249XCJtZGktYWxlcnQtY2lyY2xlLW91dGxpbmVcIlxuICAgICAgICBsYWJlbD1cIlJlcG9ydCBhcHBcIlxuICAgICAgICBAY2xpY2s9XCJzaG93UmVwb3J0RGlhbG9nXCJcbiAgICAgIC8+XG4gICAgICA8QXBwT3V0ZGF0ZWRBcHBEaWFsb2dcbiAgICAgICAgdi1tb2RlbD1cImFwcHNTdG9yZS5kaWFsb2dzLm91dGRhdGVkQXBwRGlhbG9nXCJcbiAgICAgICAgOmhyZWY9XCJjdXJyZW50QXBwLmN1cnJlbnRWZXJzaW9uLmxpbmtzLm1hbmlmZXN0VXJpXCJcbiAgICAgIC8+XG4gICAgICA8cS1kaWFsb2cgdi1tb2RlbD1cInJlcG9ydERpYWxvZ1wiPlxuICAgICAgICA8cS1jYXJkIGNsYXNzPVwiZGlhbG9nXCIgc3R5bGU9XCJtaW4td2lkdGg6IDMwMHB4XCI+XG4gICAgICAgICAgPHEtY2FyZC1zZWN0aW9uIGNsYXNzPVwicS1wYi1ub25lXCI+XG4gICAgICAgICAgICA8aDYgY2xhc3M9XCJxLW1hLW5vbmVcIj5SZXBvcnQgYXBwPC9oNj5cbiAgICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuXG4gICAgICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgICAgPHEtc2VsZWN0XG4gICAgICAgICAgICAgIHYtbW9kZWw9XCJyZXBvcnQuZGVzY3JpcHRpb25fdHlwZVwiXG4gICAgICAgICAgICAgIDpvcHRpb25zPVwicmVwb3J0T3B0aW9uc1wiXG4gICAgICAgICAgICAgIGxhYmVsPVwiV2hhdCBkbyB5b3Ugd2FudCB0byBzdWJtaXQ/XCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cblxuICAgICAgICAgIDxxLWNhcmQtc2VjdGlvbiB2LWlmPVwicmVwb3J0LmRlc2NyaXB0aW9uX3R5cGUgPT09ICdidWcnXCI+XG4gICAgICAgICAgICBTb3JyeSwgd2UgZG9uJ3QgcHJvdmlkZSBzdXBwb3J0IGZvciB0aGlyZC1wYXJ0eSBhcHBzLjxiciAvPlxuICAgICAgICAgICAgWW91IGNhbiBmaWxlIGFuIGlzc3VlIG9uIEdpdGh1YiBvciBjb250YWN0IHRoZSBhcHAgZGV2ZWxvcGVyLlxuICAgICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICAgICAgPHEtY2FyZC1zZWN0aW9uIHYtaWY9XCJyZXBvcnQuZGVzY3JpcHRpb25fdHlwZSA9PT0gJ3JlcG9ydCdcIj5cbiAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgIHYtbW9kZWw9XCJyZXBvcnQuZGVzY3JpcHRpb25cIlxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkRlc2NyaWJlIHlvdXIgcHJvYmxlbVwiXG4gICAgICAgICAgICAgIGF1dG9ncm93XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPHAgdi1pZj1cInJlcG9ydFN1Ym1pdHRlZFwiIGNsYXNzPVwidGV4dC1wb3NpdGl2ZSBxLW1hLW5vbmUgcS1tdC1tZFwiPlxuICAgICAgICAgICAgICBXZSByZWNlaXZlZCB5b3VyIHJlcG9ydC4gVGhhbmsgeW91IGZvciB0aGUgZmVlZGJhY2shXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cblxuICAgICAgICAgIDxxLWNhcmQtYWN0aW9ucyBhbGlnbj1cInJpZ2h0XCI+XG4gICAgICAgICAgICA8cS1idG5cbiAgICAgICAgICAgICAgZmxhdFxuICAgICAgICAgICAgICB0ZXh0LWNvbG9yPVwiZGFya1wiXG4gICAgICAgICAgICAgIGNsYXNzPVwicS1tci1tZFwiXG4gICAgICAgICAgICAgIGxhYmVsPVwiQ2FuY2VsXCJcbiAgICAgICAgICAgICAgdi1jbG9zZS1wb3B1cFxuICAgICAgICAgICAgPjwvcS1idG4+XG4gICAgICAgICAgICA8cS1idG5cbiAgICAgICAgICAgICAgdi1pZj1cIlxuICAgICAgICAgICAgICAgICFyZXBvcnQuZGVzY3JpcHRpb25fdHlwZSB8fCByZXBvcnQuZGVzY3JpcHRpb25fdHlwZSA9PT0gJ3JlcG9ydCdcbiAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgb3V0bGluZVxuICAgICAgICAgICAgICBjb2xvcj1cInByaW1hcnlcIlxuICAgICAgICAgICAgICBsYWJlbD1cIlNlbmRcIlxuICAgICAgICAgICAgICA6ZGlzYWJsZWQ9XCJyZXBvcnRTdWJtaXR0ZWQgfHwgIXJlcG9ydC5kZXNjcmlwdGlvblwiXG4gICAgICAgICAgICAgIEBjbGljaz1cInNlbmRSZXBvcnRcIlxuICAgICAgICAgICAgPjwvcS1idG4+XG4gICAgICAgICAgICA8cS1idG5cbiAgICAgICAgICAgICAgdi1pZj1cInJlcG9ydC5kZXNjcmlwdGlvbl90eXBlID09PSAnYnVnJ1wiXG4gICAgICAgICAgICAgIG91dGxpbmVcbiAgICAgICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgICAgbGFiZWw9XCJWaWV3IG9uIEdpdGh1YlwiXG4gICAgICAgICAgICAgIHYtY2xvc2UtcG9wdXBcbiAgICAgICAgICAgICAgOmhyZWY9XCJjdXJyZW50QXBwLmN1cnJlbnRWZXJzaW9uLmxpbmtzLm1hbmlmZXN0VXJpXCJcbiAgICAgICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgICAgID48L3EtYnRuPlxuICAgICAgICAgIDwvcS1jYXJkLWFjdGlvbnM+XG4gICAgICAgIDwvcS1jYXJkPlxuICAgICAgPC9xLWRpYWxvZz5cbiAgICA8L3RlbXBsYXRlPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgeyBjb21wdXRlZCwgb25Nb3VudGVkLCByZWFjdGl2ZSwgcmVmLCB3YXRjaCB9IGZyb20gJ3Z1ZSdcbmltcG9ydCB7IHVzZVJvdXRlLCB1c2VSb3V0ZXIgfSBmcm9tICd2dWUtcm91dGVyJ1xuaW1wb3J0IHsgQXBwSW5zdGFsbEJ0biB9IGZyb20gJ2ZlYXR1cmVzL0FwcHMvSW5zdGFsbEJ1dHRvbidcbmltcG9ydCB7IEFwcE9wZW5BcHBCdG4gfSBmcm9tICdmZWF0dXJlcy9BcHBzL09wZW5BcHBCdXR0b24nXG5pbXBvcnQgeyBBcHBVcGRhdGVCdG4gfSBmcm9tICdmZWF0dXJlcy9BcHBzL1VwZGF0ZUJ1dHRvbidcbmltcG9ydCB7IEFwcERlbGV0ZUJ0biB9IGZyb20gJ2ZlYXR1cmVzL0FwcHMvRGVsZXRlQnV0dG9uJ1xuaW1wb3J0IHsgUHJvZ3Jlc3NCYXIgfSBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9Qcm9ncmVzc0JhcidcbmltcG9ydCB7IExvYWRpbmcgfSBmcm9tICdzaGFyZWQvY29tcG9uZW50cy9Mb2FkaW5nJ1xuaW1wb3J0IHtcbiAgQXBwc0FwaSxcbiAgQXBwc01vZGVsLFxuICBBcHBJbnN0YWxsZWRCdG4sXG4gIEFwcE91dGRhdGVkQXBwRGlhbG9nXG59IGZyb20gJ2VudGl0eS9BcHBzJ1xuY29uc3QgYXBwc1N0b3JlID0gQXBwc01vZGVsLnVzZUFwcHNTdG9yZSgpXG5cbmltcG9ydCB7IENhdGVnb3J5Q2hpcCwgQ2F0ZWdvcnlNb2RlbCB9IGZyb20gJ2VudGl0eS9DYXRlZ29yeSdcbmltcG9ydCB7IGJ5dGVzVG9TaXplIH0gZnJvbSAnc2hhcmVkL2xpYi91dGlscy9ieXRlc1RvU2l6ZSdcbmltcG9ydCB7IEZsaXBwZXJNb2RlbCB9IGZyb20gJ2VudGl0eS9GbGlwcGVyJ1xuaW1wb3J0IHsgdHlwZSBRU2Nyb2xsQXJlYSB9IGZyb20gJ3F1YXNhcidcblxuY29uc3QgZmxpcHBlclN0b3JlID0gRmxpcHBlck1vZGVsLnVzZUZsaXBwZXJTdG9yZSgpXG5cbmNvbnN0IHsgZmV0Y2hBcHBCeUlkLCBzdWJtaXRBcHBSZXBvcnQgfSA9IEFwcHNBcGlcblxuY29uc3Qgcm91dGUgPSB1c2VSb3V0ZSgpXG5jb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKVxuXG5jb25zdCBjdXJyZW50QXBwID0gcmVmPEFwcHNNb2RlbC5BcHBEZXRhaWwgfCB1bmRlZmluZWQ+KHVuZGVmaW5lZClcbmNvbnN0IGNhdGVnb3JpZXNTdG9yZSA9IENhdGVnb3J5TW9kZWwudXNlQ2F0ZWdvcmllc1N0b3JlKClcblxuY29uc3QgZ2V0Q2F0ZWdvcmllcyA9IGFzeW5jICgpID0+IHtcbiAgaWYgKFxuICAgICFjYXRlZ29yaWVzU3RvcmUuY2F0ZWdvcmllcy5sZW5ndGggfHxcbiAgICBmbGlwcGVyU3RvcmUuYXBpICE9PSBjYXRlZ29yaWVzU3RvcmUubGFzdEFwaSB8fFxuICAgIGZsaXBwZXJTdG9yZS50YXJnZXQgIT09IGNhdGVnb3JpZXNTdG9yZS5sYXN0VGFyZ2V0XG4gICkge1xuICAgIGF3YWl0IGNhdGVnb3JpZXNTdG9yZS5nZXRDYXRlZ29yaWVzKHtcbiAgICAgIGFwaTogZmxpcHBlclN0b3JlLmFwaSxcbiAgICAgIHRhcmdldDogZmxpcHBlclN0b3JlLnRhcmdldFxuICAgIH0pXG4gIH1cbn1cblxud2F0Y2goXG4gICgpID0+IGZsaXBwZXJTdG9yZS5mbGlwcGVyUmVhZHksXG4gIGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBnZXRDYXRlZ29yaWVzKClcbiAgfVxuKVxuXG5jb25zdCBpbml0ID0gYXN5bmMgKCkgPT4ge1xuICBhd2FpdCBnZXRDdXJyZW50QXBwKClcbiAgYXdhaXQgZ2V0Q2F0ZWdvcmllcygpXG5cbiAgaWYgKGN1cnJlbnRBcHAudmFsdWUpIHtcbiAgICBnZXRBcHBBY3Rpb24oY3VycmVudEFwcC52YWx1ZSlcbiAgfVxufVxuXG5jb25zdCBnZXRBcHBBY3Rpb24gPSAoYXBwOiBBcHBzTW9kZWwuQXBwKSA9PiB7XG4gIGNvbnN0IGFjdGlvbkFwcCA9IGFwcHNTdG9yZS5hY3Rpb25BcHBMaXN0LmZpbmQoKF9hcHApID0+IHtcbiAgICBpZiAoX2FwcC5pZCA9PT0gYXBwLmlkKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZVxuICB9KVxuXG4gIGlmIChhY3Rpb25BcHApIHtcbiAgICBhcHAuYWN0aW9uID0gYWN0aW9uQXBwLmFjdGlvblxuICB9XG59XG5cbm9uTW91bnRlZChhc3luYyAoKSA9PiB7XG4gIGlmIChmbGlwcGVyU3RvcmUuZmxpcHBlclJlYWR5KSB7XG4gICAgaWYgKCFmbGlwcGVyU3RvcmUucnBjQWN0aXZlKSB7XG4gICAgICBhd2FpdCBmbGlwcGVyU3RvcmUuZmxpcHBlcj8uc3RhcnRSUENTZXNzaW9uKClcbiAgICB9XG5cbiAgICBpZiAoZmxpcHBlclN0b3JlLmZsaXBwZXI/LnJlYWRpbmdNb2RlLnR5cGUgPT09ICdycGMnKSB7XG4gICAgICBpZiAoIWZsaXBwZXJTdG9yZS5pbmZvKSB7XG4gICAgICAgIGF3YWl0IGZsaXBwZXJTdG9yZS5mbGlwcGVyPy5nZXRJbmZvKClcbiAgICAgIH1cblxuICAgICAgYXdhaXQgaW5pdCgpXG5cbiAgICAgIGlmIChcbiAgICAgICAgIWFwcHNTdG9yZS5sb2FkaW5nSW5zdGFsbGVkQXBwcyAmJlxuICAgICAgICAhYXBwc1N0b3JlLmZsaXBwZXJJbnN0YWxsZWRBcHBzPy5sZW5ndGhcbiAgICAgICkge1xuICAgICAgICBhd2FpdCBhcHBzU3RvcmUuZ2V0SW5zdGFsbGVkQXBwcyh7XG4gICAgICAgICAgcmVmcmVzaEluc3RhbGxlZEFwcHM6IHRydWVcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgYXdhaXQgaW5pdCgpXG4gIH1cbn0pXG5cbndhdGNoKFxuICAoKSA9PiBhcHBzU3RvcmUuZmxhZ3MuY2F0YWxvZ0NoYW5uZWxQcm9kdWN0aW9uLFxuICBhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgaW5pdCgpXG5cbiAgICBpZiAoIWZsaXBwZXJTdG9yZS5mbGlwcGVyKSB7XG4gICAgICBhd2FpdCBhcHBzU3RvcmUuZ2V0SW5zdGFsbGVkQXBwcyh7XG4gICAgICAgIHJlZnJlc2hJbnN0YWxsZWRBcHBzOiB0cnVlXG4gICAgICB9KVxuICAgIH1cbiAgfVxuKVxuXG5jb25zdCBsb2FkaW5nID0gcmVmKHRydWUpXG5jb25zdCBnZXRDdXJyZW50QXBwID0gYXN5bmMgKCkgPT4ge1xuICBsb2FkaW5nLnZhbHVlID0gdHJ1ZVxuICBjdXJyZW50QXBwLnZhbHVlID0gYXdhaXQgZmV0Y2hBcHBCeUlkKHtcbiAgICBpZDogcm91dGUucGFyYW1zLnBhdGggYXMgc3RyaW5nLFxuICAgIGFwaTogZmxpcHBlclN0b3JlLmFwaSxcbiAgICB0YXJnZXQ6IGZsaXBwZXJTdG9yZS50YXJnZXRcbiAgfSlcbiAgbG9hZGluZy52YWx1ZSA9IGZhbHNlXG59XG5cbndhdGNoKFxuICAoKSA9PiBmbGlwcGVyU3RvcmUuZmxpcHBlclJlYWR5LFxuICAoKSA9PiB7XG4gICAgZ2V0Q3VycmVudEFwcCgpXG4gIH1cbilcblxud2F0Y2goXG4gICgpID0+IHJvdXRlLnBhcmFtcy5wYXRoLFxuICAoKSA9PiB7XG4gICAgZ2V0Q3VycmVudEFwcCgpXG4gIH1cbilcblxuY29uc3QgaXNJbnN0YWxsZWRPclVwZGF0ZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgcmV0dXJuIChcbiAgICBjdXJyZW50QXBwLnZhbHVlICYmXG4gICAgKGFwcHNTdG9yZS5nZXRCdXR0b25TdGF0ZShjdXJyZW50QXBwLnZhbHVlKSA9PT0gJ2luc3RhbGxlZCcgfHxcbiAgICAgIGFwcHNTdG9yZS5nZXRCdXR0b25TdGF0ZShjdXJyZW50QXBwLnZhbHVlKSA9PT0gJ3VwZGF0ZScpXG4gIClcbn0pXG5cbnR5cGUgU3RhdHVzSGludCA9IHtcbiAgdGV4dDogc3RyaW5nXG4gIGljb246IHN0cmluZ1xuICBjb2xvcjogc3RyaW5nXG4gIHRvb2x0aXA/OiBzdHJpbmdcbiAgZGlhbG9nPzogc3RyaW5nXG59XG5cbnR5cGUgU3RhdHVzSGludHMgPSB7XG4gIFtrOiBzdHJpbmddOiBTdGF0dXNIaW50XG59XG5cbmNvbnN0IHN0YXR1c0hpbnRzOiBTdGF0dXNIaW50cyA9IHtcbiAgUkVBRFk6IHtcbiAgICB0ZXh0OiAnUnVucyBvbiBsYXRlc3QgZmlybXdhcmUgcmVsZWFzZScsXG4gICAgaWNvbjogJ21kaS1jaGVjay1jaXJjbGUtb3V0bGluZScsXG4gICAgY29sb3I6ICdsaWdodC1ncmVlbi0yJ1xuICB9LFxuICBCVUlMRF9SVU5OSU5HOiB7XG4gICAgdGV4dDogJ0FwcCBpcyByZWJ1aWxkaW5nJyxcbiAgICBpY29uOiAnbWRpLWFsZXJ0LWNpcmNsZS1vdXRsaW5lJyxcbiAgICBjb2xvcjogJ3llbGxvdy0yJyxcbiAgICB0b29sdGlwOiAnVGhpcyBtYXkgdGFrZSBzb21lIHRpbWUsIGNvbWUgYmFjayBsYXRlcidcbiAgfSxcbiAgRkxJUFBFUl9PVVREQVRFRDoge1xuICAgIHRleHQ6ICdGbGlwcGVyIGZpcm13YXJlIGlzIG91dGRhdGVkJyxcbiAgICBpY29uOiAnbWRpLWFsZXJ0LWNpcmNsZS1vdXRsaW5lJyxcbiAgICBjb2xvcjogJ2RlZXAtb3JhbmdlLTInLFxuICAgIGRpYWxvZzogJ291dGRhdGVkRmlybXdhcmVEaWFsb2cnXG4gIH0sXG4gIFVOU1VQUE9SVEVEX0FQUExJQ0FUSU9OOiB7XG4gICAgdGV4dDogJ091dGRhdGVkIGFwcCcsXG4gICAgaWNvbjogJ21kaS1hbGVydC1jaXJjbGUtb3V0bGluZScsXG4gICAgY29sb3I6ICdkZWVwLW9yYW5nZS0yJyxcbiAgICBkaWFsb2c6ICdvdXRkYXRlZEFwcERpYWxvZydcbiAgfSxcbiAgVU5TVVBQT1JURURfU0RLOiB7XG4gICAgdGV4dDogJ1Vuc3VwcG9ydGVkIFNESycsXG4gICAgaWNvbjogJ21kaS1hbGVydC1jaXJjbGUtb3V0bGluZScsXG4gICAgY29sb3I6ICdkZWVwLW9yYW5nZS0yJyxcbiAgICBkaWFsb2c6ICdvdXRkYXRlZEZpcm13YXJlRGlhbG9nJ1xuICB9XG59XG5cbmNvbnN0IGdldFN0YXR1c0hpbnQgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGlmIChjdXJyZW50QXBwLnZhbHVlKSB7XG4gICAgcmV0dXJuIHN0YXR1c0hpbnRzW2N1cnJlbnRBcHAudmFsdWUuY3VycmVudFZlcnNpb24uc3RhdHVzXVxuICB9XG5cbiAgcmV0dXJuIG51bGxcbn0pXG5cbmNvbnN0IHNob3dEaWFsb2cgPSAoZGlhbG9nOiBzdHJpbmcgfCB1bmRlZmluZWQpID0+IHtcbiAgaWYgKGRpYWxvZykge1xuICAgIGFwcHNTdG9yZS5kaWFsb2dzW2RpYWxvZ10gPSB0cnVlXG4gIH1cbn1cblxuY29uc3QgY2F0ZWdvcnkgPSBjb21wdXRlZCgoKSA9PlxuICBjYXRlZ29yaWVzU3RvcmUuY2F0ZWdvcmllcz8uZmluZCgoZSkgPT4gZS5pZCA9PT0gY3VycmVudEFwcC52YWx1ZT8uY2F0ZWdvcnlJZClcbilcbmNvbnN0IGdvQ2F0ZWdvcnkgPSAoKSA9PiB7XG4gIGlmIChjYXRlZ29yeS52YWx1ZSkge1xuICAgIHJvdXRlci5wdXNoKHtcbiAgICAgIG5hbWU6ICdBcHBzQ2F0ZWdvcnknLFxuICAgICAgcGFyYW1zOiB7IHBhdGg6IGNhdGVnb3J5LnZhbHVlLm5hbWUudG9Mb3dlckNhc2UoKSB9XG4gICAgfSlcbiAgfSBlbHNlIHtcbiAgICByb3V0ZXIucHVzaCh7IG5hbWU6ICdBcHBzJyB9KVxuICB9XG59XG5cbmNvbnN0IHNjcm9sbEFyZWFSZWYgPSByZWY8UVNjcm9sbEFyZWE+KClcbmNvbnN0IHNjcmVlbnNob3RXaWR0aCA9IDI0OCArIDQgKyA4ICsgOFxuY29uc3QgcG9zaXRpb24gPSByZWYoMClcbmNvbnN0IGFuaW1hdGVTY3JvbGwgPSAoZGlyZWN0aW9uOiBzdHJpbmcpID0+IHtcbiAgaWYgKCFzY3JvbGxBcmVhUmVmLnZhbHVlIHx8ICFjdXJyZW50QXBwLnZhbHVlKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgY29uc3Qgd2lkdGggPSBzY3JvbGxBcmVhUmVmLnZhbHVlLiRlbC5vZmZzZXRXaWR0aFxuICBjb25zdCBudW1iZXJPZlNjcmVlbnNob3RzID0gY3VycmVudEFwcC52YWx1ZS5jdXJyZW50VmVyc2lvbi5zY3JlZW5zaG90cy5sZW5ndGhcbiAgY29uc3Qgc2NyZWVuc2hvdHNPblNjcmVlbiA9IE1hdGguZmxvb3Iod2lkdGggLyBzY3JlZW5zaG90V2lkdGgpIHx8IDFcblxuICBpZiAobnVtYmVyT2ZTY3JlZW5zaG90cykge1xuICAgIGlmIChkaXJlY3Rpb24gPT09ICdmb3J3YXJkJykge1xuICAgICAgaWYgKFxuICAgICAgICBwb3NpdGlvbi52YWx1ZSArIHNjcmVlbnNob3RXaWR0aCAqIHNjcmVlbnNob3RzT25TY3JlZW4gPFxuICAgICAgICBzY3JlZW5zaG90V2lkdGggKiBudW1iZXJPZlNjcmVlbnNob3RzXG4gICAgICApIHtcbiAgICAgICAgcG9zaXRpb24udmFsdWUgPSBwb3NpdGlvbi52YWx1ZSArIHNjcmVlbnNob3RXaWR0aFxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChkaXJlY3Rpb24gPT09ICdiYWNrd2FyZCcpIHtcbiAgICAgIGlmIChwb3NpdGlvbi52YWx1ZSA8IDApIHtcbiAgICAgICAgcG9zaXRpb24udmFsdWUgPSAwXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwb3NpdGlvbi52YWx1ZSA9IHBvc2l0aW9uLnZhbHVlIC0gc2NyZWVuc2hvdFdpZHRoXG4gICAgICB9XG4gICAgfVxuXG4gICAgc2Nyb2xsQXJlYVJlZi52YWx1ZS5zZXRTY3JvbGxQb3NpdGlvbignaG9yaXpvbnRhbCcsIHBvc2l0aW9uLnZhbHVlLCAzMDApXG4gIH1cbn1cblxuY29uc3QgcmVwb3J0RGlhbG9nID0gcmVmKGZhbHNlKVxuY29uc3QgcmVwb3J0U3VibWl0dGVkID0gcmVmKGZhbHNlKVxuY29uc3QgcmVwb3J0ID0gcmVhY3RpdmUoe1xuICBkZXNjcmlwdGlvbl90eXBlOiAnJyxcbiAgZGVzY3JpcHRpb246ICcnXG59KVxuY29uc3QgcmVwb3J0T3B0aW9ucyA9IFsnYnVnJywgJ3JlcG9ydCddXG5jb25zdCBzaG93UmVwb3J0RGlhbG9nID0gKCkgPT4ge1xuICByZXBvcnREaWFsb2cudmFsdWUgPSB0cnVlXG59XG5jb25zdCBzZW5kUmVwb3J0ID0gYXN5bmMgKCkgPT4ge1xuICBpZiAoY3VycmVudEFwcC52YWx1ZSkge1xuICAgIGF3YWl0IHN1Ym1pdEFwcFJlcG9ydCh7XG4gICAgICBpZDogY3VycmVudEFwcC52YWx1ZS5pZCxcbiAgICAgIHJlcG9ydFxuICAgIH0pXG4gIH1cbiAgcmVwb3J0U3VibWl0dGVkLnZhbHVlID0gdHJ1ZVxufVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiPlxuQGltcG9ydCAnLi9zdHlsZXMnO1xuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtcGFnZSBwYWRkaW5nPlxuICAgIDxBcHBEZXRhaWwgLz5cbiAgPC9xLXBhZ2U+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgQXBwRGV0YWlsIH0gZnJvbSAnd2lkZ2V0cy9BcHBzL0FwcERldGFpbCdcbjwvc2NyaXB0PlxuIiwiaW1wb3J0IHsgY3JlYXRlRGlyZWN0aXZlIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaXNEZWVwRXF1YWwgfSBmcm9tICcuLi8uLi91dGlscy9pcy9pcy5qcydcbmltcG9ydCBnZXRTU1JQcm9wcyBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLm5vb3Atc3NyLWRpcmVjdGl2ZS10cmFuc2Zvcm0vbm9vcC1zc3ItZGlyZWN0aXZlLXRyYW5zZm9ybS5qcydcblxuY29uc3QgZGVmYXVsdENmZyA9IHtcbiAgdGhyZXNob2xkOiAwLFxuICByb290OiBudWxsLFxuICByb290TWFyZ2luOiAnMHB4J1xufVxuXG5mdW5jdGlvbiB1cGRhdGUgKGVsLCBjdHgsIHZhbHVlKSB7XG4gIGxldCBoYW5kbGVyLCBjZmcsIGNoYW5nZWRcblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgaGFuZGxlciA9IHZhbHVlXG4gICAgY2ZnID0gZGVmYXVsdENmZ1xuICAgIGNoYW5nZWQgPSBjdHguY2ZnID09PSB2b2lkIDBcbiAgfVxuICBlbHNlIHtcbiAgICBoYW5kbGVyID0gdmFsdWUuaGFuZGxlclxuICAgIGNmZyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRDZmcsIHZhbHVlLmNmZylcbiAgICBjaGFuZ2VkID0gY3R4LmNmZyA9PT0gdm9pZCAwIHx8IGlzRGVlcEVxdWFsKGN0eC5jZmcsIGNmZykgPT09IGZhbHNlXG4gIH1cblxuICBpZiAoY3R4LmhhbmRsZXIgIT09IGhhbmRsZXIpIHtcbiAgICBjdHguaGFuZGxlciA9IGhhbmRsZXJcbiAgfVxuXG4gIGlmIChjaGFuZ2VkID09PSB0cnVlKSB7XG4gICAgY3R4LmNmZyA9IGNmZ1xuICAgIGN0eC5vYnNlcnZlcj8udW5vYnNlcnZlKGVsKVxuXG4gICAgY3R4Lm9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChbIGVudHJ5IF0pID0+IHtcbiAgICAgIGlmICh0eXBlb2YgY3R4LmhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gaWYgb2JzZXJ2ZWQgZWxlbWVudCBpcyBwYXJ0IG9mIGEgdnVlIHRyYW5zaXRpb25cbiAgICAgICAgLy8gdGhlbiB3ZSBuZWVkIHRvIGJlIGNhcmVmdWwuLi5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIGVudHJ5LnJvb3RCb3VuZHMgPT09IG51bGxcbiAgICAgICAgICAmJiBkb2N1bWVudC5ib2R5LmNvbnRhaW5zKGVsKSA9PT0gdHJ1ZVxuICAgICAgICApIHtcbiAgICAgICAgICBjdHgub2JzZXJ2ZXIudW5vYnNlcnZlKGVsKVxuICAgICAgICAgIGN0eC5vYnNlcnZlci5vYnNlcnZlKGVsKVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVzID0gY3R4LmhhbmRsZXIoZW50cnksIGN0eC5vYnNlcnZlcilcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgcmVzID09PSBmYWxzZVxuICAgICAgICAgIHx8IChjdHgub25jZSA9PT0gdHJ1ZSAmJiBlbnRyeS5pc0ludGVyc2VjdGluZyA9PT0gdHJ1ZSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgZGVzdHJveShlbClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIGNmZylcblxuICAgIGN0eC5vYnNlcnZlci5vYnNlcnZlKGVsKVxuICB9XG59XG5cbmZ1bmN0aW9uIGRlc3Ryb3kgKGVsKSB7XG4gIGNvbnN0IGN0eCA9IGVsLl9fcXZpc2libGVcblxuICBpZiAoY3R4ICE9PSB2b2lkIDApIHtcbiAgICBjdHgub2JzZXJ2ZXI/LnVub2JzZXJ2ZShlbClcbiAgICBkZWxldGUgZWwuX19xdmlzaWJsZVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZURpcmVjdGl2ZShfX1FVQVNBUl9TU1JfU0VSVkVSX19cbiAgPyB7IG5hbWU6ICdpbnRlcnNlY3Rpb24nLCBnZXRTU1JQcm9wcyB9XG4gIDoge1xuICAgICAgbmFtZTogJ2ludGVyc2VjdGlvbicsXG5cbiAgICAgIG1vdW50ZWQgKGVsLCB7IG1vZGlmaWVycywgdmFsdWUgfSkge1xuICAgICAgICBjb25zdCBjdHggPSB7XG4gICAgICAgICAgb25jZTogbW9kaWZpZXJzLm9uY2UgPT09IHRydWVcbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZShlbCwgY3R4LCB2YWx1ZSlcblxuICAgICAgICBlbC5fX3F2aXNpYmxlID0gY3R4XG4gICAgICB9LFxuXG4gICAgICB1cGRhdGVkIChlbCwgYmluZGluZykge1xuICAgICAgICBjb25zdCBjdHggPSBlbC5fX3F2aXNpYmxlXG4gICAgICAgIGN0eCAhPT0gdm9pZCAwICYmIHVwZGF0ZShlbCwgY3R4LCBiaW5kaW5nLnZhbHVlKVxuICAgICAgfSxcblxuICAgICAgYmVmb3JlVW5tb3VudDogZGVzdHJveVxuICAgIH1cbilcbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIFRyYW5zaXRpb24gfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGlzUnVudGltZVNzclByZUh5ZHJhdGlvbiB9IGZyb20gJy4uLy4uL3BsdWdpbnMvcGxhdGZvcm0vUGxhdGZvcm0uanMnXG5cbmltcG9ydCBJbnRlcnNlY3Rpb24gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9pbnRlcnNlY3Rpb24vSW50ZXJzZWN0aW9uLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoU2xvdCwgaERpciB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FJbnRlcnNlY3Rpb24nLFxuXG4gIHByb3BzOiB7XG4gICAgdGFnOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnZGl2J1xuICAgIH0sXG5cbiAgICBvbmNlOiBCb29sZWFuLFxuICAgIHRyYW5zaXRpb246IFN0cmluZyxcbiAgICB0cmFuc2l0aW9uRHVyYXRpb246IHtcbiAgICAgIHR5cGU6IFsgU3RyaW5nLCBOdW1iZXIgXSxcbiAgICAgIGRlZmF1bHQ6IDMwMFxuICAgIH0sXG5cbiAgICBzc3JQcmVyZW5kZXI6IEJvb2xlYW4sXG5cbiAgICBtYXJnaW46IFN0cmluZyxcbiAgICB0aHJlc2hvbGQ6IFsgTnVtYmVyLCBBcnJheSBdLFxuICAgIHJvb3Q6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuXG4gICAgZGlzYWJsZTogQm9vbGVhbixcblxuICAgIG9uVmlzaWJpbGl0eTogRnVuY3Rpb25cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGNvbnN0IHNob3dpbmcgPSByZWYoaXNSdW50aW1lU3NyUHJlSHlkcmF0aW9uLnZhbHVlID09PSB0cnVlID8gcHJvcHMuc3NyUHJlcmVuZGVyIDogZmFsc2UpXG5cbiAgICBjb25zdCBpbnRlcnNlY3Rpb25Qcm9wcyA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLnJvb3QgIT09IHZvaWQgMCB8fCBwcm9wcy5tYXJnaW4gIT09IHZvaWQgMCB8fCBwcm9wcy50aHJlc2hvbGQgIT09IHZvaWQgMFxuICAgICAgICA/IHtcbiAgICAgICAgICAgIGhhbmRsZXI6IHRyaWdnZXIsXG4gICAgICAgICAgICBjZmc6IHtcbiAgICAgICAgICAgICAgcm9vdDogcHJvcHMucm9vdCxcbiAgICAgICAgICAgICAgcm9vdE1hcmdpbjogcHJvcHMubWFyZ2luLFxuICAgICAgICAgICAgICB0aHJlc2hvbGQ6IHByb3BzLnRocmVzaG9sZFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgOiB0cmlnZ2VyXG4gICAgKSlcblxuICAgIGNvbnN0IGhhc0RpcmVjdGl2ZSA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5kaXNhYmxlICE9PSB0cnVlXG4gICAgICAmJiAoaXNSdW50aW1lU3NyUHJlSHlkcmF0aW9uLnZhbHVlICE9PSB0cnVlIHx8IHByb3BzLm9uY2UgIT09IHRydWUgfHwgcHJvcHMuc3NyUHJlcmVuZGVyICE9PSB0cnVlKVxuICAgIClcblxuICAgIGNvbnN0IGRpcmVjdGl2ZXMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICAvLyBpZiBoYXNEaXJlY3RpdmUudmFsdWUgPT09IHRydWVcbiAgICAgIHJldHVybiBbIFtcbiAgICAgICAgSW50ZXJzZWN0aW9uLFxuICAgICAgICBpbnRlcnNlY3Rpb25Qcm9wcy52YWx1ZSxcbiAgICAgICAgdm9pZCAwLFxuICAgICAgICB7IG9uY2U6IHByb3BzLm9uY2UgfVxuICAgICAgXSBdXG4gICAgfSlcblxuICAgIGNvbnN0IHRyYW5zaXRpb25TdHlsZSA9IGNvbXB1dGVkKFxuICAgICAgKCkgPT4gYC0tcS10cmFuc2l0aW9uLWR1cmF0aW9uOiAkeyBwcm9wcy50cmFuc2l0aW9uRHVyYXRpb24gfW1zYFxuICAgIClcblxuICAgIGZ1bmN0aW9uIHRyaWdnZXIgKGVudHJ5KSB7XG4gICAgICBpZiAoc2hvd2luZy52YWx1ZSAhPT0gZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcbiAgICAgICAgc2hvd2luZy52YWx1ZSA9IGVudHJ5LmlzSW50ZXJzZWN0aW5nXG4gICAgICAgIHByb3BzLm9uVmlzaWJpbGl0eSAhPT0gdm9pZCAwICYmIGVtaXQoJ3Zpc2liaWxpdHknLCBzaG93aW5nLnZhbHVlKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldENvbnRlbnQgKCkge1xuICAgICAgaWYgKHNob3dpbmcudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIFsgaCgnZGl2JywgeyBrZXk6ICdjb250ZW50Jywgc3R5bGU6IHRyYW5zaXRpb25TdHlsZS52YWx1ZSB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSkgXVxuICAgICAgfVxuXG4gICAgICBpZiAoc2xvdHMuaGlkZGVuICE9PSB2b2lkIDApIHtcbiAgICAgICAgcmV0dXJuIFsgaCgnZGl2JywgeyBrZXk6ICdoaWRkZW4nLCBzdHlsZTogdHJhbnNpdGlvblN0eWxlLnZhbHVlIH0sIHNsb3RzLmhpZGRlbigpKSBdXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNvbnN0IGNoaWxkID0gcHJvcHMudHJhbnNpdGlvblxuICAgICAgICA/IFtcbiAgICAgICAgICAgIGgoVHJhbnNpdGlvbiwge1xuICAgICAgICAgICAgICBuYW1lOiAncS10cmFuc2l0aW9uLS0nICsgcHJvcHMudHJhbnNpdGlvblxuICAgICAgICAgICAgfSwgZ2V0Q29udGVudClcbiAgICAgICAgICBdXG4gICAgICAgIDogZ2V0Q29udGVudCgpXG5cbiAgICAgIHJldHVybiBoRGlyKFxuICAgICAgICBwcm9wcy50YWcsXG4gICAgICAgIHsgY2xhc3M6ICdxLWludGVyc2VjdGlvbicgfSxcbiAgICAgICAgY2hpbGQsXG4gICAgICAgICdtYWluJyxcbiAgICAgICAgaGFzRGlyZWN0aXZlLnZhbHVlLFxuICAgICAgICAoKSA9PiBkaXJlY3RpdmVzLnZhbHVlXG4gICAgICApXG4gICAgfVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIG9uTW91bnRlZCwgb25BY3RpdmF0ZWQsIG9uRGVhY3RpdmF0ZWQsIG9uQmVmb3JlVW5tb3VudCwgbmV4dFRpY2ssIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IGRlYm91bmNlIGZyb20gJy4uLy4uL3V0aWxzL2RlYm91bmNlL2RlYm91bmNlLmpzJ1xuaW1wb3J0IHsgaGVpZ2h0IH0gZnJvbSAnLi4vLi4vdXRpbHMvZG9tL2RvbS5qcydcbmltcG9ydCB7IGdldFNjcm9sbFRhcmdldCwgZ2V0U2Nyb2xsSGVpZ2h0LCBnZXRWZXJ0aWNhbFNjcm9sbFBvc2l0aW9uLCBzZXRWZXJ0aWNhbFNjcm9sbFBvc2l0aW9uLCBzY3JvbGxUYXJnZXRQcm9wIH0gZnJvbSAnLi4vLi4vdXRpbHMvc2Nyb2xsL3Njcm9sbC5qcydcbmltcG9ydCB7IGxpc3Rlbk9wdHMgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC9ldmVudC5qcydcbmltcG9ydCB7IGhTbG90LCBoVW5pcXVlU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcblxuY29uc3QgeyBwYXNzaXZlIH0gPSBsaXN0ZW5PcHRzXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRSW5maW5pdGVTY3JvbGwnLFxuXG4gIHByb3BzOiB7XG4gICAgb2Zmc2V0OiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICBkZWZhdWx0OiA1MDBcbiAgICB9LFxuXG4gICAgZGVib3VuY2U6IHtcbiAgICAgIHR5cGU6IFsgU3RyaW5nLCBOdW1iZXIgXSxcbiAgICAgIGRlZmF1bHQ6IDEwMFxuICAgIH0sXG5cbiAgICBzY3JvbGxUYXJnZXQ6IHNjcm9sbFRhcmdldFByb3AsXG5cbiAgICBpbml0aWFsSW5kZXg6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIGRlZmF1bHQ6IDBcbiAgICB9LFxuXG4gICAgZGlzYWJsZTogQm9vbGVhbixcbiAgICByZXZlcnNlOiBCb29sZWFuXG4gIH0sXG5cbiAgZW1pdHM6IFsgJ2xvYWQnIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0IH0pIHtcbiAgICBjb25zdCBpc0ZldGNoaW5nID0gcmVmKGZhbHNlKVxuICAgIGNvbnN0IGlzV29ya2luZyA9IHJlZih0cnVlKVxuICAgIGNvbnN0IHJvb3RSZWYgPSByZWYobnVsbClcbiAgICBjb25zdCBsb2FkaW5nUmVmID0gcmVmKG51bGwpXG5cbiAgICBsZXQgaW5kZXggPSBwcm9wcy5pbml0aWFsSW5kZXhcbiAgICBsZXQgbG9jYWxTY3JvbGxUYXJnZXQsIHBvbGxcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtaW5maW5pdGUtc2Nyb2xsX19sb2FkaW5nJ1xuICAgICAgKyAoaXNGZXRjaGluZy52YWx1ZSA9PT0gdHJ1ZSA/ICcnIDogJyBpbnZpc2libGUnKVxuICAgIClcblxuICAgIGZ1bmN0aW9uIGltbWVkaWF0ZVBvbGwgKCkge1xuICAgICAgaWYgKFxuICAgICAgICBwcm9wcy5kaXNhYmxlID09PSB0cnVlXG4gICAgICAgIHx8IGlzRmV0Y2hpbmcudmFsdWUgPT09IHRydWVcbiAgICAgICAgfHwgaXNXb3JraW5nLnZhbHVlID09PSBmYWxzZVxuICAgICAgKSByZXR1cm5cblxuICAgICAgY29uc3RcbiAgICAgICAgc2Nyb2xsSGVpZ2h0ID0gZ2V0U2Nyb2xsSGVpZ2h0KGxvY2FsU2Nyb2xsVGFyZ2V0KSxcbiAgICAgICAgc2Nyb2xsUG9zaXRpb24gPSBnZXRWZXJ0aWNhbFNjcm9sbFBvc2l0aW9uKGxvY2FsU2Nyb2xsVGFyZ2V0KSxcbiAgICAgICAgY29udGFpbmVySGVpZ2h0ID0gaGVpZ2h0KGxvY2FsU2Nyb2xsVGFyZ2V0KVxuXG4gICAgICBpZiAocHJvcHMucmV2ZXJzZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgaWYgKE1hdGgucm91bmQoc2Nyb2xsUG9zaXRpb24gKyBjb250YWluZXJIZWlnaHQgKyBwcm9wcy5vZmZzZXQpID49IE1hdGgucm91bmQoc2Nyb2xsSGVpZ2h0KSkge1xuICAgICAgICAgIHRyaWdnZXIoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChNYXRoLnJvdW5kKHNjcm9sbFBvc2l0aW9uKSA8PSBwcm9wcy5vZmZzZXQpIHtcbiAgICAgICAgdHJpZ2dlcigpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJpZ2dlciAoKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHByb3BzLmRpc2FibGUgPT09IHRydWVcbiAgICAgICAgfHwgaXNGZXRjaGluZy52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICB8fCBpc1dvcmtpbmcudmFsdWUgPT09IGZhbHNlXG4gICAgICApIHJldHVyblxuXG4gICAgICBpbmRleCsrXG4gICAgICBpc0ZldGNoaW5nLnZhbHVlID0gdHJ1ZVxuXG4gICAgICBjb25zdCBoZWlnaHRCZWZvcmUgPSBnZXRTY3JvbGxIZWlnaHQobG9jYWxTY3JvbGxUYXJnZXQpXG5cbiAgICAgIGVtaXQoJ2xvYWQnLCBpbmRleCwgaXNEb25lID0+IHtcbiAgICAgICAgaWYgKGlzV29ya2luZy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGlzRmV0Y2hpbmcudmFsdWUgPSBmYWxzZVxuICAgICAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICAgIGlmIChwcm9wcy5yZXZlcnNlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgIGNvbnN0XG4gICAgICAgICAgICAgICAgaGVpZ2h0QWZ0ZXIgPSBnZXRTY3JvbGxIZWlnaHQobG9jYWxTY3JvbGxUYXJnZXQpLFxuICAgICAgICAgICAgICAgIHNjcm9sbFBvc2l0aW9uID0gZ2V0VmVydGljYWxTY3JvbGxQb3NpdGlvbihsb2NhbFNjcm9sbFRhcmdldCksXG4gICAgICAgICAgICAgICAgaGVpZ2h0RGlmZmVyZW5jZSA9IGhlaWdodEFmdGVyIC0gaGVpZ2h0QmVmb3JlXG5cbiAgICAgICAgICAgICAgc2V0VmVydGljYWxTY3JvbGxQb3NpdGlvbihsb2NhbFNjcm9sbFRhcmdldCwgc2Nyb2xsUG9zaXRpb24gKyBoZWlnaHREaWZmZXJlbmNlKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNEb25lID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgIHN0b3AoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocm9vdFJlZi52YWx1ZSkge1xuICAgICAgICAgICAgICByb290UmVmLnZhbHVlLmNsb3Nlc3QoJ2JvZHknKSAmJiBwb2xsKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc2V0ICgpIHtcbiAgICAgIGluZGV4ID0gMFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc3VtZSAoKSB7XG4gICAgICBpZiAoaXNXb3JraW5nLnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICBpc1dvcmtpbmcudmFsdWUgPSB0cnVlXG4gICAgICAgIGxvY2FsU2Nyb2xsVGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHBvbGwsIHBhc3NpdmUpXG4gICAgICB9XG5cbiAgICAgIGltbWVkaWF0ZVBvbGwoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0b3AgKCkge1xuICAgICAgaWYgKGlzV29ya2luZy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBpc1dvcmtpbmcudmFsdWUgPSBmYWxzZVxuICAgICAgICBpc0ZldGNoaW5nLnZhbHVlID0gZmFsc2VcbiAgICAgICAgbG9jYWxTY3JvbGxUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgcG9sbCwgcGFzc2l2ZSlcbiAgICAgICAgcG9sbD8uY2FuY2VsPy4oKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVNjcm9sbFRhcmdldCAoKSB7XG4gICAgICBpZiAobG9jYWxTY3JvbGxUYXJnZXQgJiYgaXNXb3JraW5nLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGxvY2FsU2Nyb2xsVGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHBvbGwsIHBhc3NpdmUpXG4gICAgICB9XG5cbiAgICAgIGxvY2FsU2Nyb2xsVGFyZ2V0ID0gZ2V0U2Nyb2xsVGFyZ2V0KHJvb3RSZWYudmFsdWUsIHByb3BzLnNjcm9sbFRhcmdldClcblxuICAgICAgaWYgKGlzV29ya2luZy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBsb2NhbFNjcm9sbFRhcmdldC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBwb2xsLCBwYXNzaXZlKVxuXG4gICAgICAgIGlmIChwcm9wcy5yZXZlcnNlID09PSB0cnVlKSB7XG4gICAgICAgICAgY29uc3RcbiAgICAgICAgICAgIHNjcm9sbEhlaWdodCA9IGdldFNjcm9sbEhlaWdodChsb2NhbFNjcm9sbFRhcmdldCksXG4gICAgICAgICAgICBjb250YWluZXJIZWlnaHQgPSBoZWlnaHQobG9jYWxTY3JvbGxUYXJnZXQpXG5cbiAgICAgICAgICBzZXRWZXJ0aWNhbFNjcm9sbFBvc2l0aW9uKGxvY2FsU2Nyb2xsVGFyZ2V0LCBzY3JvbGxIZWlnaHQgLSBjb250YWluZXJIZWlnaHQpXG4gICAgICAgIH1cblxuICAgICAgICBpbW1lZGlhdGVQb2xsKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRJbmRleCAobmV3SW5kZXgpIHtcbiAgICAgIGluZGV4ID0gbmV3SW5kZXhcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXREZWJvdW5jZSAodmFsKSB7XG4gICAgICB2YWwgPSBwYXJzZUludCh2YWwsIDEwKVxuXG4gICAgICBjb25zdCBvbGRQb2xsID0gcG9sbFxuXG4gICAgICBwb2xsID0gdmFsIDw9IDBcbiAgICAgICAgPyBpbW1lZGlhdGVQb2xsXG4gICAgICAgIDogZGVib3VuY2UoaW1tZWRpYXRlUG9sbCwgaXNOYU4odmFsKSA9PT0gdHJ1ZSA/IDEwMCA6IHZhbClcblxuICAgICAgaWYgKGxvY2FsU2Nyb2xsVGFyZ2V0ICYmIGlzV29ya2luZy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBpZiAob2xkUG9sbCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgbG9jYWxTY3JvbGxUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgb2xkUG9sbCwgcGFzc2l2ZSlcbiAgICAgICAgfVxuXG4gICAgICAgIGxvY2FsU2Nyb2xsVGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHBvbGwsIHBhc3NpdmUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlU3ZnQW5pbWF0aW9ucyAoaXNSZXRyeSkge1xuICAgICAgaWYgKHJlbmRlckxvYWRpbmdTbG90LnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGlmIChsb2FkaW5nUmVmLnZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgaXNSZXRyeSAhPT0gdHJ1ZSAmJiBuZXh0VGljaygoKSA9PiB7IHVwZGF0ZVN2Z0FuaW1hdGlvbnModHJ1ZSkgfSlcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHdlIG5lZWQgdG8gcGF1c2Ugc3ZnIGFuaW1hdGlvbnMgKGlmIGFueSkgd2hlbiBoaWRpbmdcbiAgICAgICAgLy8gb3RoZXJ3aXNlIHRoZSBicm93c2VyIHdpbGwga2VlcCBvbiByZWNhbGN1bGF0aW5nIHRoZSBzdHlsZVxuICAgICAgICBjb25zdCBhY3Rpb24gPSBgJHsgaXNGZXRjaGluZy52YWx1ZSA9PT0gdHJ1ZSA/ICd1bicgOiAnJyB9cGF1c2VBbmltYXRpb25zYFxuICAgICAgICBBcnJheS5mcm9tKGxvYWRpbmdSZWYudmFsdWUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3N2ZycpKS5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICBlbFsgYWN0aW9uIF0oKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHJlbmRlckxvYWRpbmdTbG90ID0gY29tcHV0ZWQoKCkgPT4gcHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZSAmJiBpc1dvcmtpbmcudmFsdWUgPT09IHRydWUpXG5cbiAgICB3YXRjaChbIGlzRmV0Y2hpbmcsIHJlbmRlckxvYWRpbmdTbG90IF0sICgpID0+IHsgdXBkYXRlU3ZnQW5pbWF0aW9ucygpIH0pXG5cbiAgICB3YXRjaCgoKSA9PiBwcm9wcy5kaXNhYmxlLCB2YWwgPT4ge1xuICAgICAgaWYgKHZhbCA9PT0gdHJ1ZSkgeyBzdG9wKCkgfVxuICAgICAgZWxzZSB7IHJlc3VtZSgpIH1cbiAgICB9KVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMucmV2ZXJzZSwgKCkgPT4ge1xuICAgICAgaWYgKGlzRmV0Y2hpbmcudmFsdWUgPT09IGZhbHNlICYmIGlzV29ya2luZy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBpbW1lZGlhdGVQb2xsKClcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMuc2Nyb2xsVGFyZ2V0LCB1cGRhdGVTY3JvbGxUYXJnZXQpXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMuZGVib3VuY2UsIHNldERlYm91bmNlKVxuXG4gICAgbGV0IHNjcm9sbFBvcyA9IGZhbHNlXG5cbiAgICBvbkFjdGl2YXRlZCgoKSA9PiB7XG4gICAgICBpZiAoc2Nyb2xsUG9zICE9PSBmYWxzZSAmJiBsb2NhbFNjcm9sbFRhcmdldCkge1xuICAgICAgICBzZXRWZXJ0aWNhbFNjcm9sbFBvc2l0aW9uKGxvY2FsU2Nyb2xsVGFyZ2V0LCBzY3JvbGxQb3MpXG4gICAgICB9XG4gICAgfSlcblxuICAgIG9uRGVhY3RpdmF0ZWQoKCkgPT4ge1xuICAgICAgc2Nyb2xsUG9zID0gbG9jYWxTY3JvbGxUYXJnZXRcbiAgICAgICAgPyBnZXRWZXJ0aWNhbFNjcm9sbFBvc2l0aW9uKGxvY2FsU2Nyb2xsVGFyZ2V0KVxuICAgICAgICA6IGZhbHNlXG4gICAgfSlcblxuICAgIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgICBpZiAoaXNXb3JraW5nLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGxvY2FsU2Nyb2xsVGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHBvbGwsIHBhc3NpdmUpXG4gICAgICB9XG4gICAgfSlcblxuICAgIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgICBzZXREZWJvdW5jZShwcm9wcy5kZWJvdW5jZSlcbiAgICAgIHVwZGF0ZVNjcm9sbFRhcmdldCgpXG5cbiAgICAgIGlzRmV0Y2hpbmcudmFsdWUgPT09IGZhbHNlICYmIHVwZGF0ZVN2Z0FuaW1hdGlvbnMoKVxuICAgIH0pXG5cbiAgICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgICBjb25zdCB2bSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgT2JqZWN0LmFzc2lnbih2bS5wcm94eSwge1xuICAgICAgcG9sbDogKCkgPT4geyBwb2xsPy4oKSB9LFxuICAgICAgdHJpZ2dlciwgc3RvcCwgcmVzZXQsIHJlc3VtZSwgc2V0SW5kZXgsIHVwZGF0ZVNjcm9sbFRhcmdldFxuICAgIH0pXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY29uc3QgY2hpbGQgPSBoVW5pcXVlU2xvdChzbG90cy5kZWZhdWx0LCBbXSlcblxuICAgICAgaWYgKHJlbmRlckxvYWRpbmdTbG90LnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGNoaWxkWyBwcm9wcy5yZXZlcnNlID09PSBmYWxzZSA/ICdwdXNoJyA6ICd1bnNoaWZ0JyBdKFxuICAgICAgICAgIGgoJ2RpdicsIHsgcmVmOiBsb2FkaW5nUmVmLCBjbGFzczogY2xhc3Nlcy52YWx1ZSB9LCBoU2xvdChzbG90cy5sb2FkaW5nKSlcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogJ3EtaW5maW5pdGUtc2Nyb2xsJyxcbiAgICAgICAgcmVmOiByb290UmVmXG4gICAgICB9LCBjaGlsZClcbiAgICB9XG4gIH1cbn0pXG4iLCI8dGVtcGxhdGU+XG4gIDxxLWxpc3QgY2xhc3M9XCJyb3cgcS1jb2wtZ3V0dGVyLXNtXCI+XG4gICAgPGRpdiBjbGFzcz1cImNvbC1hdXRvXCIgdi1mb3I9XCJjYXRlZ29yeSBpbiBjYXRlZ29yaWVzXCIgOmtleT1cImNhdGVnb3J5LmlkXCI+XG4gICAgICA8Q2F0ZWdvcnlDaGlwXG4gICAgICAgIHYtYmluZD1cImNhdGVnb3J5XCJcbiAgICAgICAgOmlzQ3VycmVudENhdGVnb3J5PVwiXG4gICAgICAgICAgIWNhdGVnb3JpZXNTdG9yZS5jdXJyZW50Q2F0ZWdvcnkgfHxcbiAgICAgICAgICBjYXRlZ29yeS5pZCA9PT0gY2F0ZWdvcmllc1N0b3JlLmN1cnJlbnRDYXRlZ29yeT8uaWRcbiAgICAgICAgXCJcbiAgICAgICAgQGNsaWNrPVwib25DbGljayhjYXRlZ29yeSlcIlxuICAgICAgLz5cbiAgICA8L2Rpdj5cbiAgPC9xLWxpc3Q+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHsgY29tcHV0ZWQsIG9uTW91bnRlZCwgd2F0Y2ggfSBmcm9tICd2dWUnXG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICd2dWUtcm91dGVyJ1xuY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKClcblxuaW1wb3J0IHsgRmxpcHBlck1vZGVsIH0gZnJvbSAnZW50aXR5L0ZsaXBwZXInXG5jb25zdCBmbGlwcGVyU3RvcmUgPSBGbGlwcGVyTW9kZWwudXNlRmxpcHBlclN0b3JlKClcblxuaW1wb3J0IHsgQXBwc01vZGVsIH0gZnJvbSAnZW50aXR5L0FwcHMnXG5jb25zdCBhcHBzU3RvcmUgPSBBcHBzTW9kZWwudXNlQXBwc1N0b3JlKClcblxuaW1wb3J0IHsgQ2F0ZWdvcnlNb2RlbCwgQ2F0ZWdvcnlDaGlwIH0gZnJvbSAnZW50aXR5L0NhdGVnb3J5J1xuY29uc3QgY2F0ZWdvcmllc1N0b3JlID0gQ2F0ZWdvcnlNb2RlbC51c2VDYXRlZ29yaWVzU3RvcmUoKVxuXG5jb25zdCBlbWl0ID0gZGVmaW5lRW1pdHMoWydjYXRlZ29yeVNlbGVjdGVkJ10pXG5cbmNvbnN0IGdldENhdGVnb3JpZXMgPSBhc3luYyAoKSA9PiB7XG4gIGlmIChcbiAgICAhY2F0ZWdvcmllc1N0b3JlLmNhdGVnb3JpZXMubGVuZ3RoIHx8XG4gICAgZmxpcHBlclN0b3JlLmFwaSAhPT0gY2F0ZWdvcmllc1N0b3JlLmxhc3RBcGkgfHxcbiAgICBmbGlwcGVyU3RvcmUudGFyZ2V0ICE9PSBjYXRlZ29yaWVzU3RvcmUubGFzdFRhcmdldFxuICApIHtcbiAgICBhd2FpdCBjYXRlZ29yaWVzU3RvcmUuZ2V0Q2F0ZWdvcmllcyh7XG4gICAgICBhcGk6IGZsaXBwZXJTdG9yZS5hcGksXG4gICAgICB0YXJnZXQ6IGZsaXBwZXJTdG9yZS50YXJnZXRcbiAgICB9KVxuICB9XG59XG5cbmNvbnN0IGNhdGVnb3JpZXMgPSBjb21wdXRlZCgoKSA9PiBbXG4gIHtcbiAgICBuYW1lOiAnQWxsIGFwcHMnLFxuICAgIGNvbG9yOiAnRUJFQkVCJyxcbiAgICBpZDogJy0xJ1xuICB9LFxuICAuLi5jYXRlZ29yaWVzU3RvcmUuY2F0ZWdvcmllc1xuXSlcblxub25Nb3VudGVkKGFzeW5jICgpID0+IHtcbiAgYXdhaXQgZ2V0Q2F0ZWdvcmllcygpXG59KVxuXG53YXRjaChcbiAgKCkgPT4gZmxpcHBlclN0b3JlLmZsaXBwZXJSZWFkeSxcbiAgYXN5bmMgKCkgPT4ge1xuICAgIGNhdGVnb3JpZXNTdG9yZS5jYXRlZ29yaWVzID0gW11cblxuICAgIGF3YWl0IGdldENhdGVnb3JpZXMoKVxuXG4gICAgZW1pdCgnY2F0ZWdvcnlTZWxlY3RlZCcpXG4gIH1cbilcblxud2F0Y2goXG4gICgpID0+IGFwcHNTdG9yZS5mbGFncy5jYXRhbG9nQ2hhbm5lbFByb2R1Y3Rpb24sXG4gIGFzeW5jICgpID0+IHtcbiAgICBjYXRlZ29yaWVzU3RvcmUuY2F0ZWdvcmllcyA9IFtdXG5cbiAgICBhd2FpdCBnZXRDYXRlZ29yaWVzKClcblxuICAgIGVtaXQoJ2NhdGVnb3J5U2VsZWN0ZWQnKVxuICB9XG4pXG5cbmNvbnN0IG9uQ2xpY2sgPSAoY2F0ZWdvcnk6IENhdGVnb3J5TW9kZWwuQ2F0ZWdvcnlEYXRhKSA9PiB7XG4gIGNhdGVnb3JpZXNTdG9yZS5zZXRDdXJyZW50Q2F0ZWdvcnkoXG4gICAgY2F0ZWdvcnkuaWQgIT09ICctMScgPyBjYXRlZ29yeSA6IHVuZGVmaW5lZFxuICApXG5cbiAgaWYgKGNhdGVnb3JpZXNTdG9yZS5jdXJyZW50Q2F0ZWdvcnkpIHtcbiAgICByb3V0ZXIucHVzaCh7XG4gICAgICBuYW1lOiAnQXBwc0NhdGVnb3J5JyxcbiAgICAgIHBhcmFtczogeyBwYXRoOiBjYXRlZ29yaWVzU3RvcmUuY3VycmVudENhdGVnb3J5Lm5hbWUudG9Mb3dlckNhc2UoKSB9XG4gICAgfSlcbiAgfSBlbHNlIHtcbiAgICByb3V0ZXIucHVzaCh7IG5hbWU6ICdBcHBzJyB9KVxuICB9XG5cbiAgZW1pdCgnY2F0ZWdvcnlTZWxlY3RlZCcpXG59XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj5cbiAgICA8dGVtcGxhdGUgdi1pZj1cImFwcHNTdG9yZS5pbnN0YWxsYXRpb25CYXRjaC5pblByb2Nlc3NcIj5cbiAgICAgIDxQcm9ncmVzc0JhclxuICAgICAgICA6dGl0bGU9XCJgJHthcHBzU3RvcmUuaW5zdGFsbGF0aW9uQmF0Y2guZG9uZUNvdW50fSAvICR7YXBwc1N0b3JlLmluc3RhbGxhdGlvbkJhdGNoLnRvdGFsQ291bnR9YFwiXG4gICAgICAgIDpwcm9ncmVzcz1cIlxuICAgICAgICAgIGFwcHNTdG9yZS5pbnN0YWxsYXRpb25CYXRjaC5kb25lQ291bnQgL1xuICAgICAgICAgIGFwcHNTdG9yZS5pbnN0YWxsYXRpb25CYXRjaC50b3RhbENvdW50XG4gICAgICAgIFwiXG4gICAgICAgIDpjb2xvcj1cImFwcHNTdG9yZS5wcm9ncmVzc0NvbG9ycygnaW5zdGFsbCcpLmJhclwiXG4gICAgICAgIDp0cmFja0NvbG9yPVwiYXBwc1N0b3JlLnByb2dyZXNzQ29sb3JzKCdpbnN0YWxsJykudHJhY2tcIlxuICAgICAgICBzaXplPVwiMzNweFwiXG4gICAgICAvPlxuICAgIDwvdGVtcGxhdGU+XG4gICAgPHRlbXBsYXRlIHYtZWxzZT5cbiAgICAgIDxxLWJ0blxuICAgICAgICBjbGFzcz1cInRleHQtcGl4ZWxhdGVkIGZpdCB0ZXh0LWJvZHkxXCJcbiAgICAgICAgdW5lbGV2YXRlZFxuICAgICAgICBkZW5zZVxuICAgICAgICBjb2xvcj1cInByaW1hcnlcIlxuICAgICAgICBsYWJlbD1cIkluc3RhbGwgQWxsXCJcbiAgICAgICAgQGNsaWNrLnN0b3A9XCJvbkNsaWNrXCJcbiAgICAgICAgOmxvYWRpbmc9XCJsb2FkaW5nXCJcbiAgICAgICAgOmRpc2FibGVkPVwiZGlzYWJsZWRcIlxuICAgICAgLz5cbiAgICA8L3RlbXBsYXRlPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgeyByZWYgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IFByb2dyZXNzQmFyIH0gZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvUHJvZ3Jlc3NCYXInXG5cbmltcG9ydCB7IEZsaXBwZXJNb2RlbCB9IGZyb20gJ2VudGl0eS9GbGlwcGVyJ1xuY29uc3QgZmxpcHBlclN0b3JlID0gRmxpcHBlck1vZGVsLnVzZUZsaXBwZXJTdG9yZSgpXG5cbmltcG9ydCB7IEFwcHNNb2RlbCwgQXBwc0FwaSB9IGZyb20gJ2VudGl0eS9BcHBzJ1xuY29uc3QgYXBwc1N0b3JlID0gQXBwc01vZGVsLnVzZUFwcHNTdG9yZSgpXG5jb25zdCB7IGZldGNoQXBwc1Nob3J0IH0gPSBBcHBzQXBpXG5cbmludGVyZmFjZSBQcm9wcyB7XG4gIGRpc2FibGVkPzogYm9vbGVhblxufVxuXG53aXRoRGVmYXVsdHMoZGVmaW5lUHJvcHM8UHJvcHM+KCksIHtcbiAgZGlzYWJsZWQ6IGZhbHNlXG59KVxuXG5jb25zdCBsb2FkaW5nID0gcmVmKGZhbHNlKVxuXG5jb25zdCBmZXRjaEVuZCA9IHJlZih0cnVlKVxuY29uc3QgYXBwcyA9IHJlZjxBcHBzTW9kZWwuQXBwW10+KFtdKVxuY29uc3QgbGltaXQgPSByZWYoNDgpXG5jb25zdCBvZmZzZXQgPSByZWYoMClcbmNvbnN0IGZldGNoID0gYXN5bmMgKCkgPT4ge1xuICByZXR1cm4gYXdhaXQgZmV0Y2hBcHBzU2hvcnQoe1xuICAgIGxpbWl0OiBsaW1pdC52YWx1ZSxcbiAgICBvZmZzZXQ6IG9mZnNldC52YWx1ZSxcbiAgICBhcGk6IGZsaXBwZXJTdG9yZS5hcGkgfHwgdW5kZWZpbmVkLFxuICAgIHRhcmdldDogZmxpcHBlclN0b3JlLnRhcmdldCB8fCB1bmRlZmluZWRcbiAgfSkudGhlbihhc3luYyAobmV3QXBwczogQXBwc01vZGVsLkFwcFtdKSA9PiB7XG4gICAgaWYgKCFuZXdBcHBzKSB7XG4gICAgICBmZXRjaEVuZC52YWx1ZSA9IHRydWVcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmICghbmV3QXBwcy5sZW5ndGgpIHtcbiAgICAgIGZldGNoRW5kLnZhbHVlID0gdHJ1ZVxuICAgIH1cblxuICAgIGlmIChuZXdBcHBzLmxlbmd0aCA8IGxpbWl0LnZhbHVlKSB7XG4gICAgICBmZXRjaEVuZC52YWx1ZSA9IHRydWVcbiAgICB9XG5cbiAgICBuZXdBcHBzID0gbmV3QXBwcy5maWx0ZXIoKGFwcCkgPT4ge1xuICAgICAgaWYgKGFwcHNTdG9yZS5nZXRCdXR0b25TdGF0ZShhcHApID09PSAnaW5zdGFsbGVkJykge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9KVxuXG4gICAgaWYgKG5ld0FwcHMubGVuZ3RoKSB7XG4gICAgICBhcHBzLnZhbHVlLnB1c2goLi4ubmV3QXBwcylcbiAgICB9XG5cbiAgICBvZmZzZXQudmFsdWUgKz0gbGltaXQudmFsdWVcbiAgfSlcbn1cblxuY29uc3Qgb25DbGljayA9IGFzeW5jICgpID0+IHtcbiAgZmV0Y2hFbmQudmFsdWUgPSBmYWxzZVxuICBvZmZzZXQudmFsdWUgPSAwXG4gIGFwcHMudmFsdWUgPSBbXVxuXG4gIGxvYWRpbmcudmFsdWUgPSB0cnVlXG5cbiAgd2hpbGUgKCFmZXRjaEVuZC52YWx1ZSkge1xuICAgIGF3YWl0IGZldGNoKClcbiAgfVxuXG4gIGxvYWRpbmcudmFsdWUgPSBmYWxzZVxuXG4gIGlmIChhcHBzLnZhbHVlLmxlbmd0aCkge1xuICAgIGFwcHNTdG9yZS5pbnN0YWxsYXRpb25CYXRjaC5pblByb2Nlc3MgPSB0cnVlXG4gICAgYXBwc1N0b3JlLmluc3RhbGxhdGlvbkJhdGNoLnRvdGFsQ291bnQgPSBhcHBzLnZhbHVlLmxlbmd0aFxuICAgIGFwcHNTdG9yZS5pbnN0YWxsYXRpb25CYXRjaC5kb25lQ291bnQgPSAwXG5cbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYXBwcy52YWx1ZS5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIGNvbnN0IGFwcCA9IGFwcHMudmFsdWVbaW5kZXhdIVxuXG4gICAgICB0cnkge1xuICAgICAgICBpZiAoYXBwc1N0b3JlLmdldEJ1dHRvblN0YXRlKGFwcCkgPT09ICdpbnN0YWxsJykge1xuICAgICAgICAgIGFwcHNTdG9yZS5vbkFjdGlvbihhcHAsICdpbnN0YWxsJylcbiAgICAgICAgfVxuICAgICAgICBpZiAoYXBwc1N0b3JlLmdldEJ1dHRvblN0YXRlKGFwcCkgPT09ICd1cGRhdGUnKSB7XG4gICAgICAgICAgYXBwc1N0b3JlLm9uQWN0aW9uKGFwcCwgJ3VwZGF0ZScpXG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpXG4gICAgICAgIGFwcHNTdG9yZS5pbnN0YWxsYXRpb25CYXRjaC5mYWlsZWQucHVzaCh7XG4gICAgICAgICAgaWQ6IGFwcC5pZCxcbiAgICAgICAgICBuYW1lOiBhcHAuY3VycmVudFZlcnNpb24ubmFtZVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXY+XG4gICAgPHRlbXBsYXRlIHYtaWY9XCJjYXRlZ29yaWVzU3RvcmUuY2F0ZWdvcmllc0xvYWRpbmdcIj5cbiAgICAgIDxMb2FkaW5nIGxhYmVsPVwiTG9hZGluZyBjYXRlZ29yaWVzLi4uXCIgLz5cbiAgICA8L3RlbXBsYXRlPlxuICAgIDx0ZW1wbGF0ZSB2LWVsc2UtaWY9XCJhcHBzU3RvcmUuZmxhZ3MuY2F0YWxvZ0lzVW5rbm93blNES1wiPlxuICAgICAgPHEtY2FyZCBmbGF0PlxuICAgICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJxLXBhLW5vbmUgcS1tYS1tZFwiIGFsaWduPVwiY2VudGVyXCI+XG4gICAgICAgICAgPHEtaW1nIHNyYz1cIn5hc3NldHMvZmxpcHBlcl9hbGVydC5zdmdcIiB3aWR0aD1cIjcwcHhcIiBuby1zcGlubmVyIC8+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDYgcS1teS1zbVwiPk5vdCBDb21wYXRpYmxlIHdpdGggeW91ciBGaXJtd2FyZTwvZGl2PlxuICAgICAgICAgIDxwPlxuICAgICAgICAgICAgVG8gYWNjZXNzIEFwcHMsIGluc3RhbGwgdGhlIGxhdGVzdCBmaXJtd2FyZSB2ZXJzaW9uIGZyb21cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1wb3NpdGl2ZSB0ZXh0LWJvbGRcIj5SZWxlYXNlPC9zcGFuPiBDaGFubmVsIG9uIHlvdXJcbiAgICAgICAgICAgIEZsaXBwZXJcbiAgICAgICAgICA8L3A+XG4gICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICAgIDxxLWNhcmQtYWN0aW9ucyB2ZXJ0aWNhbCBhbGlnbj1cImNlbnRlclwiPlxuICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgb3V0bGluZVxuICAgICAgICAgICAgbm8tY2Fwc1xuICAgICAgICAgICAgbGFiZWw9XCJHbyB0byBGaXJtd2FyZSB1cGRhdGVcIlxuICAgICAgICAgICAgY29sb3I9XCJibHVlLTZcIlxuICAgICAgICAgICAgOnRvPVwieyBuYW1lOiAnRGV2aWNlJyB9XCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L3EtY2FyZC1hY3Rpb25zPlxuICAgICAgPC9xLWNhcmQ+XG4gICAgPC90ZW1wbGF0ZT5cbiAgICA8ZGl2XG4gICAgICB2LXNob3c9XCJcbiAgICAgICAgIWNhdGVnb3JpZXNTdG9yZS5jYXRlZ29yaWVzTG9hZGluZyAmJlxuICAgICAgICAhYXBwc1N0b3JlLmZsYWdzLmNhdGFsb2dJc1Vua25vd25TREtcbiAgICAgIFwiXG4gICAgICBjbGFzcz1cInEtbWItbGdcIlxuICAgICAgOmNsYXNzPVwie1xuICAgICAgICByb3c6ICEkcS5zY3JlZW4ubHQubWQsXG4gICAgICAgIGNvbHVtbjogJHEuc2NyZWVuLmx0Lm1kXG4gICAgICB9XCJcbiAgICA+XG4gICAgICA8Q2F0ZWdvcmllc0xpc3RcbiAgICAgICAgOmNsYXNzPVwie1xuICAgICAgICAgICdxLW1yLW1kJzogISRxLnNjcmVlbi5sdC5tZCxcbiAgICAgICAgICAncS1tYi1tZCBqdXN0aWZ5LWNlbnRlcic6ICRxLnNjcmVlbi5sdC5tZFxuICAgICAgICB9XCJcbiAgICAgICAgY2xhc3M9XCJjb2xcIlxuICAgICAgICBAY2F0ZWdvcnlTZWxlY3RlZD1cIm9uQ2F0ZWdvcnlTZWxlY3RlZFwiXG4gICAgICAvPlxuICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbiBjb2wtYXV0byBxLWNvbC1ndXR0ZXItc21cIj5cbiAgICAgICAgPHEtc2VsZWN0XG4gICAgICAgICAgY2xhc3M9XCJjb2xcIlxuICAgICAgICAgIHYtbW9kZWw9XCJzb3J0TW9kZWxcIlxuICAgICAgICAgIEB1cGRhdGU6bW9kZWwtdmFsdWU9XCJvblNvcnRBcHBzKClcIlxuICAgICAgICAgIDpvcHRpb25zPVwic29ydE9wdGlvbnNcIlxuICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgc3RhbmRvdXQ9XCJiZy1wcmltYXJ5IHRleHQtd2hpdGUgbm8tc2hhZG93XCJcbiAgICAgICAgICByb3VuZGVkXG4gICAgICAgIC8+XG4gICAgICAgIDx0ZW1wbGF0ZSB2LWlmPVwiYXBwc1N0b3JlLmZsYWdzLmNhdGFsb2dJbnN0YWxsQWxsQXBwc1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2xcIj5cbiAgICAgICAgICAgIDxBcHBJbnN0YWxsQWxsIDpkaXNhYmxlZD1cImFwcHNTdG9yZS5sb2FkaW5nSW5zdGFsbGVkQXBwc1wiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8cS1pbmZpbml0ZS1zY3JvbGxcbiAgICAgIHJlZj1cImluZmluaXR5U2Nyb2xsUmVmXCJcbiAgICAgIHYtaWY9XCIhY2F0ZWdvcmllc1N0b3JlLmNhdGVnb3JpZXNMb2FkaW5nXCJcbiAgICAgIEBsb2FkPVwib25Mb2FkXCJcbiAgICAgIDpvZmZzZXQ9XCI1MDBcIlxuICAgICAgY2xhc3M9XCJmdWxsLXdpZHRoXCJcbiAgICA+XG4gICAgICA8ZGl2IGNsYXNzPVwibGlzdFwiPlxuICAgICAgICA8cS1pbnRlcnNlY3Rpb25cbiAgICAgICAgICB2LWZvcj1cImFwcCBpbiBhcHBzXCJcbiAgICAgICAgICA6a2V5PVwiYXBwLmlkXCJcbiAgICAgICAgICBvbmNlXG4gICAgICAgICAgdHJhbnNpdGlvbj1cInNjYWxlXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxBcHBDYXJkIHYtYmluZD1cImFwcFwiIEBjbGljaz1cImdvQXBwUGFnZVwiPlxuICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDpidXR0b24+XG4gICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LWlmPVwiYXBwLmFjdGlvbj8udHlwZSB8fCBnZXRBcHBBY3Rpb24oYXBwKVwiPlxuICAgICAgICAgICAgICAgIDxQcm9ncmVzc0JhclxuICAgICAgICAgICAgICAgICAgOnRpdGxlPVwiYXBwLmFjdGlvbi5wcm9ncmVzcyAqIDEwMCArICclJ1wiXG4gICAgICAgICAgICAgICAgICA6cHJvZ3Jlc3M9XCJhcHAuYWN0aW9uLnByb2dyZXNzXCJcbiAgICAgICAgICAgICAgICAgIDpjb2xvcj1cImFwcHNTdG9yZS5wcm9ncmVzc0NvbG9ycyhhcHAuYWN0aW9uLnR5cGUpLmJhclwiXG4gICAgICAgICAgICAgICAgICA6dHJhY2stY29sb3I9XCJhcHBzU3RvcmUucHJvZ3Jlc3NDb2xvcnMoYXBwLmFjdGlvbi50eXBlKS50cmFja1wiXG4gICAgICAgICAgICAgICAgICBpbnRlcnBvbGF0ZWRcbiAgICAgICAgICAgICAgICAgIHNpemU9XCIzM3B4XCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgICA8dGVtcGxhdGVcbiAgICAgICAgICAgICAgICB2LWVsc2UtaWY9XCJhcHBzU3RvcmUuZ2V0QnV0dG9uU3RhdGUoYXBwKSA9PT0gJ3Vuc3VwcG9ydGVkJ1wiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8QXBwSW5zdGFsbGVkQnRuIC8+XG4gICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICAgIDx0ZW1wbGF0ZVxuICAgICAgICAgICAgICAgIHYtZWxzZS1pZj1cImFwcHNTdG9yZS5nZXRCdXR0b25TdGF0ZShhcHApID09PSAnaW5zdGFsbGVkJ1wiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8QXBwT3BlbkFwcEJ0biA6YXBwPVwiYXBwc1N0b3JlLmdldEFwcFBhdGgoYXBwKVwiIC8+XG4gICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LWVsc2UtaWY9XCJhcHBzU3RvcmUuZ2V0QnV0dG9uU3RhdGUoYXBwKSA9PT0gJ3VwZGF0ZSdcIj5cbiAgICAgICAgICAgICAgICA8QXBwVXBkYXRlQnRuXG4gICAgICAgICAgICAgICAgICA6YXBwPVwiYXBwXCJcbiAgICAgICAgICAgICAgICAgIDpsb2FkaW5nPVwiYXBwc1N0b3JlLmxvYWRpbmdJbnN0YWxsZWRBcHBzXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgICA8dGVtcGxhdGUgdi1lbHNlPlxuICAgICAgICAgICAgICAgIDxBcHBJbnN0YWxsQnRuXG4gICAgICAgICAgICAgICAgICA6YXBwPVwiYXBwXCJcbiAgICAgICAgICAgICAgICAgIDpsb2FkaW5nPVwiYXBwc1N0b3JlLmxvYWRpbmdJbnN0YWxsZWRBcHBzXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICA8L0FwcENhcmQ+XG4gICAgICAgIDwvcS1pbnRlcnNlY3Rpb24+XG4gICAgICA8L2Rpdj5cbiAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6bG9hZGluZz5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBqdXN0aWZ5LWNlbnRlciBxLW15LW1kXCI+XG4gICAgICAgICAgPExvYWRpbmcgbGFiZWw9XCJMb2FkaW5nIGFwcHMuLi5cIiAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvdGVtcGxhdGU+XG4gICAgPC9xLWluZmluaXRlLXNjcm9sbD5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHsgcmVmLCB3YXRjaCwgbmV4dFRpY2ssIG9uTW91bnRlZCB9IGZyb20gJ3Z1ZSdcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ3Z1ZS1yb3V0ZXInXG5cbmltcG9ydCB0eXBlIHsgQXhpb3NFcnJvciB9IGZyb20gJ2F4aW9zJ1xuaW1wb3J0IHR5cGUgeyBBcGlFcnJvckRldGFpbCB9IGZyb20gJ3NoYXJlZC90eXBlcy9hcGknXG5cbmltcG9ydCB7IHNob3dOb3RpZiB9IGZyb20gJ3NoYXJlZC9saWIvdXRpbHMvdXNlU2hvd05vdGlmJ1xuXG5pbXBvcnQgeyBQcm9ncmVzc0JhciB9IGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL1Byb2dyZXNzQmFyJ1xuaW1wb3J0IHsgTG9hZGluZyB9IGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL0xvYWRpbmcnXG5cbmltcG9ydCB7IENhdGVnb3JpZXNMaXN0IH0gZnJvbSAnZmVhdHVyZXMvQ2F0ZWdvcnkvRmlsdGVyJ1xuaW1wb3J0IHsgQ2F0ZWdvcnlNb2RlbCB9IGZyb20gJ2VudGl0eS9DYXRlZ29yeSdcbmNvbnN0IGNhdGVnb3JpZXNTdG9yZSA9IENhdGVnb3J5TW9kZWwudXNlQ2F0ZWdvcmllc1N0b3JlKClcblxuaW1wb3J0IHsgQXBwQ2FyZCwgQXBwSW5zdGFsbGVkQnRuLCBBcHBzQXBpLCBBcHBzTW9kZWwgfSBmcm9tICdlbnRpdHkvQXBwcydcbmNvbnN0IGFwcHNTdG9yZSA9IEFwcHNNb2RlbC51c2VBcHBzU3RvcmUoKVxuXG5pbXBvcnQgeyBBcHBJbnN0YWxsQnRuIH0gZnJvbSAnZmVhdHVyZXMvQXBwcy9JbnN0YWxsQnV0dG9uJ1xuaW1wb3J0IHsgQXBwVXBkYXRlQnRuIH0gZnJvbSAnZmVhdHVyZXMvQXBwcy9VcGRhdGVCdXR0b24nXG5pbXBvcnQgeyBBcHBPcGVuQXBwQnRuIH0gZnJvbSAnZmVhdHVyZXMvQXBwcy9PcGVuQXBwQnV0dG9uJ1xuaW1wb3J0IHsgQXBwSW5zdGFsbEFsbCB9IGZyb20gJ2ZlYXR1cmVzL0FwcHMvSW5zdGFsbEFsbCdcbmltcG9ydCB7IEZsaXBwZXJNb2RlbCB9IGZyb20gJ2VudGl0eS9GbGlwcGVyJ1xuaW1wb3J0IHsgdHlwZSBRSW5maW5pdGVTY3JvbGwgfSBmcm9tICdxdWFzYXInXG5cbmNvbnN0IGZsaXBwZXJTdG9yZSA9IEZsaXBwZXJNb2RlbC51c2VGbGlwcGVyU3RvcmUoKVxuXG5jb25zdCB7IGZldGNoQXBwc1Nob3J0IH0gPSBBcHBzQXBpXG5cbmNvbnN0IGFwcHNMb2FkaW5nID0gcmVmKGZhbHNlKVxuY29uc3QgYXBwcyA9IHJlZjxBcHBzTW9kZWwuQXBwW10+KFtdKVxuXG5jb25zdCBsaW1pdCA9IHJlZig0OClcbmNvbnN0IG9mZnNldCA9IHJlZigwKVxuY29uc3QgZ2V0QXBwcyA9IGFzeW5jICgpID0+IHtcbiAgaWYgKGZsaXBwZXJTdG9yZS5mbGlwcGVyUmVhZHkpIHtcbiAgICBpZiAoZmxpcHBlclN0b3JlLnJwY0FjdGl2ZSkge1xuICAgICAgaWYgKFxuICAgICAgICAhZmxpcHBlclN0b3JlLmZsaXBwZXI/LmluZm8/LmZpcm13YXJlLmFwaSB8fFxuICAgICAgICAhZmxpcHBlclN0b3JlLmZsaXBwZXI/LmluZm8/LmZpcm13YXJlLnRhcmdldFxuICAgICAgKSB7XG4gICAgICAgIGFwcHNTdG9yZS5kaWFsb2dzLm91dGRhdGVkRmlybXdhcmVEaWFsb2cgPSB0cnVlXG4gICAgICAgIGFwcHNTdG9yZS5kaWFsb2dzLm91dGRhdGVkRmlybXdhcmVEaWFsb2dQZXJzaXN0ZW50ID0gdHJ1ZVxuXG4gICAgICAgIGZldGNoRW5kLnZhbHVlID0gdHJ1ZVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhcHBzTG9hZGluZy52YWx1ZSA9IHRydWVcblxuICBsZXQgbmV3QXBwczogQXBwc01vZGVsLkFwcFtdID0gW11cbiAgaWYgKCFmZXRjaEVuZC52YWx1ZSkge1xuICAgIGFwcHNTdG9yZS5mbGFncy5jYXRhbG9nSXNVbmtub3duU0RLID0gZmFsc2VcblxuICAgIGF3YWl0IGZldGNoQXBwc1Nob3J0KHtcbiAgICAgIGxpbWl0OiBsaW1pdC52YWx1ZSxcbiAgICAgIG9mZnNldDogb2Zmc2V0LnZhbHVlLFxuICAgICAgY2F0ZWdvcnlfaWQ6IGNhdGVnb3JpZXNTdG9yZS5jdXJyZW50Q2F0ZWdvcnk/LmlkLFxuICAgICAgYXBpOlxuICAgICAgICBmbGlwcGVyU3RvcmUuYXBpICYmIGZsaXBwZXJTdG9yZS50YXJnZXQgPyBmbGlwcGVyU3RvcmUuYXBpIDogdW5kZWZpbmVkLFxuICAgICAgdGFyZ2V0OlxuICAgICAgICBmbGlwcGVyU3RvcmUuYXBpICYmIGZsaXBwZXJTdG9yZS50YXJnZXRcbiAgICAgICAgICA/IGZsaXBwZXJTdG9yZS50YXJnZXRcbiAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgIHNvcnRfYnk6IGdldEFwcHNTaG9ydChzb3J0TW9kZWwudmFsdWUpLnNvcnRfYnksXG4gICAgICBzb3J0X29yZGVyOiBnZXRBcHBzU2hvcnQoc29ydE1vZGVsLnZhbHVlKS5zb3J0X29yZGVyXG4gICAgfSlcbiAgICAgIC50aGVuKChyZXM6IEFwcHNNb2RlbC5BcHBbXSkgPT4ge1xuICAgICAgICBpZiAoIXJlcykge1xuICAgICAgICAgIGZldGNoRW5kLnZhbHVlID0gdHJ1ZVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgbmV3QXBwcyA9IHJlc1xuXG4gICAgICAgIGlmICghbmV3QXBwcy5sZW5ndGgpIHtcbiAgICAgICAgICBmZXRjaEVuZC52YWx1ZSA9IHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhcHBzLnZhbHVlLnB1c2goLi4ubmV3QXBwcylcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXdBcHBzLmxlbmd0aCA8IGxpbWl0LnZhbHVlKSB7XG4gICAgICAgICAgZmV0Y2hFbmQudmFsdWUgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yOiBBeGlvc0Vycm9yPEFwaUVycm9yRGV0YWlsPikgPT4ge1xuICAgICAgICBmZXRjaEVuZC52YWx1ZSA9IHRydWVcblxuICAgICAgICBpZiAoZXJyb3IucmVzcG9uc2U/LmRhdGEuZGV0YWlsLmNvZGUgPT09IDEwMDEpIHtcbiAgICAgICAgICBhcHBzU3RvcmUuZmxhZ3MuY2F0YWxvZ0lzVW5rbm93blNESyA9IHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzaG93Tm90aWYoe1xuICAgICAgICAgICAgbWVzc2FnZTogJ1VuYWJsZSB0byBsb2FkIGFwcGxpY2F0aW9ucy4nLFxuICAgICAgICAgICAgY29sb3I6ICduZWdhdGl2ZScsXG4gICAgICAgICAgICBhY3Rpb25zOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJ1JlbG9hZCcsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZScsXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgcmVMb2FkKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICB9XG5cbiAgYXBwc0xvYWRpbmcudmFsdWUgPSBmYWxzZVxufVxuXG5jb25zdCBnZXRBcHBBY3Rpb24gPSAoYXBwOiBBcHBzTW9kZWwuQXBwKSA9PiB7XG4gIGNvbnN0IGFjdGlvbkFwcCA9IGFwcHNTdG9yZS5hY3Rpb25BcHBMaXN0LmZpbmQoKF9hcHApID0+IHtcbiAgICBpZiAoX2FwcC5pZCA9PT0gYXBwLmlkKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZVxuICB9KVxuXG4gIGlmIChhY3Rpb25BcHApIHtcbiAgICBhcHAuYWN0aW9uID0gYWN0aW9uQXBwLmFjdGlvblxuXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIHJldHVybiBmYWxzZVxufVxuXG5vbk1vdW50ZWQoYXN5bmMgKCkgPT4ge1xuICBhcHBzU3RvcmUuZmxhZ3MuY2F0YWxvZ0lzVW5rbm93blNESyA9IGZhbHNlXG5cbiAgaWYgKGZsaXBwZXJTdG9yZS5mbGlwcGVyUmVhZHkpIHtcbiAgICBpZiAoIWZsaXBwZXJTdG9yZS5ycGNBY3RpdmUpIHtcbiAgICAgIGF3YWl0IGZsaXBwZXJTdG9yZS5mbGlwcGVyPy5zdGFydFJQQ1Nlc3Npb24oKVxuICAgIH1cblxuICAgIGlmIChmbGlwcGVyU3RvcmUuZmxpcHBlcj8ucmVhZGluZ01vZGUudHlwZSA9PT0gJ3JwYycpIHtcbiAgICAgIGlmICghZmxpcHBlclN0b3JlLmluZm8pIHtcbiAgICAgICAgYXdhaXQgZmxpcHBlclN0b3JlLmZsaXBwZXI/LmdldEluZm8oKVxuICAgICAgfVxuXG4gICAgICAvLyBhd2FpdCByZUxvYWQoKVxuXG4gICAgICBpZiAoXG4gICAgICAgICFhcHBzU3RvcmUubG9hZGluZ0luc3RhbGxlZEFwcHMgJiZcbiAgICAgICAgIWFwcHNTdG9yZS5mbGlwcGVySW5zdGFsbGVkQXBwcz8ubGVuZ3RoXG4gICAgICApIHtcbiAgICAgICAgYXdhaXQgYXBwc1N0b3JlLmdldEluc3RhbGxlZEFwcHMoe1xuICAgICAgICAgIHJlZnJlc2hJbnN0YWxsZWRBcHBzOiB0cnVlXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICB9XG59KVxuXG4vLyB3YXRjaChcbi8vICAgKCkgPT4gZmxpcHBlclN0b3JlLmZsaXBwZXJSZWFkeSxcbi8vICAgYXN5bmMgKCkgPT4ge1xuLy8gICAgIGF3YWl0IHJlTG9hZCgpXG4vLyAgIH1cbi8vIClcblxud2F0Y2goXG4gICgpID0+IGFwcHNTdG9yZS5mbGFncy5jYXRhbG9nQ2hhbm5lbFByb2R1Y3Rpb24sXG4gIGFzeW5jICgpID0+IHtcbiAgICBpZiAoZmxpcHBlclN0b3JlLmZsaXBwZXI/LnJlYWRpbmdNb2RlLnR5cGUgPT09ICdycGMnKSB7XG4gICAgICBhd2FpdCBhcHBzU3RvcmUuZ2V0SW5zdGFsbGVkQXBwcyh7XG4gICAgICAgIHJlZnJlc2hJbnN0YWxsZWRBcHBzOiB0cnVlXG4gICAgICB9KVxuICAgIH1cbiAgfVxuKVxuXG5jb25zdCBzb3J0TW9kZWwgPSByZWYoJ05ldyBVcGRhdGVzJylcbmNvbnN0IHNvcnRPcHRpb25zID0gcmVmKFtcbiAgJ05ldyBVcGRhdGVzJyxcbiAgJ05ldyBSZWxlYXNlcycsXG4gICdPbGQgVXBkYXRlcycsXG4gICdPbGQgUmVsZWFzZXMnXG5dKVxuY29uc3QgZ2V0QXBwc1Nob3J0ID0gKHNvcnQ6IHN0cmluZykgPT4ge1xuICBzd2l0Y2ggKHNvcnQpIHtcbiAgICBjYXNlICdPbGQgVXBkYXRlcyc6XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzb3J0X2J5OiAndXBkYXRlZF9hdCcsXG4gICAgICAgIHNvcnRfb3JkZXI6IDFcbiAgICAgIH1cbiAgICBjYXNlICdOZXcgUmVsZWFzZXMnOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc29ydF9ieTogJ2NyZWF0ZWRfYXQnLFxuICAgICAgICBzb3J0X29yZGVyOiAtMVxuICAgICAgfVxuICAgIGNhc2UgJ09sZCBSZWxlYXNlcyc6XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzb3J0X2J5OiAnY3JlYXRlZF9hdCcsXG4gICAgICAgIHNvcnRfb3JkZXI6IDFcbiAgICAgIH1cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc29ydF9ieTogJ3VwZGF0ZWRfYXQnLFxuICAgICAgICBzb3J0X29yZGVyOiAtMVxuICAgICAgfVxuICB9XG59XG5jb25zdCBvblNvcnRBcHBzID0gKCkgPT4ge1xuICByZUxvYWQoKVxufVxuXG5jb25zdCBmZXRjaEVuZCA9IHJlZihmYWxzZSlcbmNvbnN0IGluZmluaXR5U2Nyb2xsUmVmID0gcmVmPFFJbmZpbml0ZVNjcm9sbD4oKVxuY29uc3QgcmVMb2FkID0gYXN5bmMgKCkgPT4ge1xuICBhcHBzLnZhbHVlID0gW11cbiAgZmV0Y2hFbmQudmFsdWUgPSBmYWxzZVxuICBvZmZzZXQudmFsdWUgPSAwXG5cbiAgaWYgKGluZmluaXR5U2Nyb2xsUmVmLnZhbHVlKSB7XG4gICAgaW5maW5pdHlTY3JvbGxSZWYudmFsdWUuc3RvcCgpXG4gICAgaW5maW5pdHlTY3JvbGxSZWYudmFsdWUucmVzZXQoKVxuICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgIGluZmluaXR5U2Nyb2xsUmVmLnZhbHVlPy5yZXN1bWUoKVxuICAgIH0pXG4gIH1cbn1cbmNvbnN0IG9uTG9hZCA9IGFzeW5jIChpbmRleDogbnVtYmVyLCBkb25lOiAoc3RvcD86IGJvb2xlYW4pID0+IHZvaWQpID0+IHtcbiAgY29uc29sZS5sb2coJ29uTG9hZCcpXG4gIGlmIChpbmRleCA+IDEpIHtcbiAgICBvZmZzZXQudmFsdWUgKz0gbGltaXQudmFsdWVcbiAgfVxuXG4gIGF3YWl0IGdldEFwcHMoKVxuICBkb25lKGZldGNoRW5kLnZhbHVlKVxufVxuXG5jb25zdCBvbkNhdGVnb3J5U2VsZWN0ZWQgPSBhc3luYyAoKSA9PiB7XG4gIGF3YWl0IHJlTG9hZCgpXG59XG5cbmNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpXG5jb25zdCBnb0FwcFBhZ2UgPSAoYXBwQWxpYXM6IEFwcHNNb2RlbC5BcHBbJ2FsaWFzJ10pID0+IHtcbiAgcm91dGVyLnB1c2goeyBuYW1lOiAnQXBwc1BhdGgnLCBwYXJhbXM6IHsgcGF0aDogYXBwQWxpYXMgfSB9KVxufVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQgbGFuZz1cInNjc3NcIj5cbkBpbXBvcnQgJ3N0eWxlcyc7XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8cS1wYWdlIHBhZGRpbmc+XG4gICAgPHRlbXBsYXRlIHYtaWY9XCIhZ2xvYmFsU3RvcmUuaXNPbmxpbmVcIj5cbiAgICAgIDxGbGlwcGVyTm9JbnRlcm5ldENvbm5lY3Rpb25DYXJkIGZsYXQgLz5cbiAgICA8L3RlbXBsYXRlPlxuICAgIDxBcHBDYXRhbG9nIHYtZWxzZSAvPlxuICA8L3EtcGFnZT5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyBBcHBDYXRhbG9nIH0gZnJvbSAnd2lkZ2V0cy9BcHBzL0FwcENhdGFsb2cnXG5cbmltcG9ydCB7IHVzZUdsb2JhbFN0b3JlIH0gZnJvbSAnc2hhcmVkL3N0b3Jlcy9nbG9iYWwtc3RvcmUnXG5jb25zdCBnbG9iYWxTdG9yZSA9IHVzZUdsb2JhbFN0b3JlKClcblxuaW1wb3J0IHsgRmxpcHBlck5vSW50ZXJuZXRDb25uZWN0aW9uQ2FyZCB9IGZyb20gJ2VudGl0eS9GbGlwcGVyJ1xuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gIDxxLWNhcmRcbiAgICBjbGFzcz1cImluc3RhbGxlZC1jYXJkIHJvdyBuby13cmFwIGl0ZW1zLWNlbnRlclwiXG4gICAgOmNsYXNzPVwie1xuICAgICAgJ2N1cnNvci1wb2ludGVyIGluc3RhbGxlZC1jYXJkLS1zdXBwb3J0ZWQnOlxuICAgICAgICAhdW5zdXBwb3J0ZWQgJiYgZ2xvYmFsU3RvcmUuaXNPbmxpbmVcbiAgICB9XCJcbiAgICBmbGF0XG4gICAgOnRhYmluZGV4PVwidW5zdXBwb3J0ZWQgJiYgIWdsb2JhbFN0b3JlLmlzT25saW5lID8gLTEgOiAwXCJcbiAgICBAY2xpY2s9XCJvbkNsaWNrXCJcbiAgPlxuICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInJvdyBjb2wgaXRlbXMtY2VudGVyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiaW5zdGFsbGVkLWNhcmRfX2ljb24td3JhcHBlciBxLW1yLW1kXCI+XG4gICAgICAgIDxxLWltZ1xuICAgICAgICAgIDpzcmM9XCJgZGF0YTppbWFnZS9wbmc7YmFzZTY0LCR7YXBwLmljb259YFwiXG4gICAgICAgICAgc3R5bGU9XCJpbWFnZS1yZW5kZXJpbmc6IHBpeGVsYXRlZFwiXG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wgY29sdW1uIHEtbXItbWRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgIDxwIGNsYXNzPVwidGV4dC1oNiBxLW1yLXNtIHEtbWItbm9uZVwiPnt7IGFwcC5uYW1lIH19PC9wPlxuICAgICAgICAgIDxxLWNoaXBcbiAgICAgICAgICAgIHYtaWY9XCJ1bnN1cHBvcnRlZFwiXG4gICAgICAgICAgICBjbGFzcz1cInEtcHgtc21cIlxuICAgICAgICAgICAgY29sb3I9XCJkZWVwLW9yYW5nZS0yXCJcbiAgICAgICAgICAgIGljb249XCJtZGktYWxlcnQtY2lyY2xlLW91dGxpbmVcIlxuICAgICAgICAgICAgbGFiZWw9XCJPdXRkYXRlZCBhcHBcIlxuICAgICAgICAgICAgc2l6ZT1cIjEycHhcIlxuICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtZ3JleS03XCI+XG4gICAgICAgICAge3sgYXBwLmluc3RhbGxlZFZlcnNpb24uc2hvcnREZXNjcmlwdGlvbiB9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPHEtc3BhY2UgLz5cbiAgICAgIDxkaXYgdi1pZj1cImFwcC5pbnN0YWxsZWRWZXJzaW9uLnZlcnNpb25cIiBjbGFzcz1cImNvbHVtbiBpdGVtcy1lbmRcIj5cbiAgICAgICAgPHAgY2xhc3M9XCJ0ZXh0LWdyZXktNyBxLW1iLW5vbmVcIj5WZXJzaW9uOjwvcD5cbiAgICAgICAgPGI+e3sgYXBwLmluc3RhbGxlZFZlcnNpb24udmVyc2lvbiB9fTwvYj5cbiAgICAgIDwvZGl2PlxuICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgPHEtY2FyZC1zZWN0aW9uIGNsYXNzPVwicm93IG5vLXdyYXBcIj5cbiAgICAgIDx0ZW1wbGF0ZSB2LWlmPVwiYXBwLmFjdGlvbj8udHlwZSB8fCBnZXRBcHBBY3Rpb24oYXBwKVwiPlxuICAgICAgICA8UHJvZ3Jlc3NCYXJcbiAgICAgICAgICBzdHlsZT1cIndpZHRoOiAxMjBweFwiXG4gICAgICAgICAgOnRpdGxlPVwiYXBwLmFjdGlvbi5wcm9ncmVzcyAqIDEwMCArICclJ1wiXG4gICAgICAgICAgOnByb2dyZXNzPVwiYXBwLmFjdGlvbi5wcm9ncmVzc1wiXG4gICAgICAgICAgOmNvbG9yPVwiYXBwc1N0b3JlLnByb2dyZXNzQ29sb3JzKGFwcC5hY3Rpb24udHlwZSkuYmFyXCJcbiAgICAgICAgICA6dHJhY2tDb2xvcj1cImFwcHNTdG9yZS5wcm9ncmVzc0NvbG9ycyhhcHAuYWN0aW9uLnR5cGUpLnRyYWNrXCJcbiAgICAgICAgICBpbnRlcnBvbGF0ZWRcbiAgICAgICAgLz5cbiAgICAgIDwvdGVtcGxhdGU+XG4gICAgICA8dGVtcGxhdGUgdi1lbHNlPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaW5zdGFsbGVkLWNhcmRfX2J1dHRvbi13cmFwcGVyIHEtbXItc21cIj5cbiAgICAgICAgICA8c2xvdCBuYW1lPVwiYnV0dG9uXCIgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtYXV0b1wiPlxuICAgICAgICAgIDxBcHBEZWxldGVCdG4gOmFwcD1cImFwcFwiIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICA8L3EtY2FyZD5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgeyBBcHBEZWxldGVCdG4gfSBmcm9tICdmZWF0dXJlcy9BcHBzL0RlbGV0ZUJ1dHRvbidcbmltcG9ydCB7IFByb2dyZXNzQmFyIH0gZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvUHJvZ3Jlc3NCYXInXG5pbXBvcnQgeyBBcHBzTW9kZWwgfSBmcm9tICdlbnRpdHkvQXBwcydcbmNvbnN0IGFwcHNTdG9yZSA9IEFwcHNNb2RlbC51c2VBcHBzU3RvcmUoKVxuXG5pbXBvcnQgeyB1c2VHbG9iYWxTdG9yZSB9IGZyb20gJ3NoYXJlZC9zdG9yZXMvZ2xvYmFsLXN0b3JlJ1xuY29uc3QgZ2xvYmFsU3RvcmUgPSB1c2VHbG9iYWxTdG9yZSgpXG5cbmludGVyZmFjZSBQcm9wcyB7XG4gIGFwcDogQXBwc01vZGVsLkluc3RhbGxlZEFwcFxuICB1bnN1cHBvcnRlZD86IGJvb2xlYW5cbn1cblxuY29uc3QgcHJvcHMgPSB3aXRoRGVmYXVsdHMoZGVmaW5lUHJvcHM8UHJvcHM+KCksIHtcbiAgdW5zdXBwb3J0ZWQ6IGZhbHNlXG59KVxuXG5pbnRlcmZhY2UgRW1pdHMge1xuICBjbGljazogW2FsaWFzOiBQcm9wc1snYXBwJ11bJ2FsaWFzJ11dXG59XG5jb25zdCBlbWl0ID0gZGVmaW5lRW1pdHM8RW1pdHM+KClcblxuY29uc3QgZ2V0QXBwQWN0aW9uID0gKGFwcDogQXBwc01vZGVsLkluc3RhbGxlZEFwcCkgPT4ge1xuICBjb25zdCBhY3Rpb25BcHAgPSBhcHBzU3RvcmUuYWN0aW9uQXBwTGlzdC5maW5kKChfYXBwKSA9PiB7XG4gICAgaWYgKF9hcHAuaWQgPT09IGFwcC5pZCkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2VcbiAgfSlcblxuICBpZiAoYWN0aW9uQXBwKSB7XG4gICAgYXBwLmFjdGlvbiA9IGFjdGlvbkFwcC5hY3Rpb25cblxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICByZXR1cm4gZmFsc2Vcbn1cblxuY29uc3Qgb25DbGljayA9ICgpID0+IHtcbiAgaWYgKGdsb2JhbFN0b3JlLmlzT25saW5lKSB7XG4gICAgZW1pdCgnY2xpY2snLCBwcm9wcy5hcHAuYWxpYXMpXG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkIGxhbmc9XCJzY3NzXCI+XG5AaW1wb3J0ICdzdHlsZXMnO1xuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj5cbiAgICA8dGVtcGxhdGVcbiAgICAgIHYtaWY9XCJnbG9iYWxTdG9yZS5pc09ubGluZSAmJiAhYXBwc1N0b3JlLmZsYWdzLmNhdGFsb2dJc1Vua25vd25TREtcIlxuICAgID5cbiAgICAgIDxkaXZcbiAgICAgICAgdi1pZj1cImFwcHNTdG9yZS51cGRhdGFibGVBcHBzLmxlbmd0aFwiXG4gICAgICAgIHN0eWxlPVwid2lkdGg6IDE0MHB4XCJcbiAgICAgICAgY2xhc3M9XCJxLW1iLW1kIHEtcGwtbWRcIlxuICAgICAgPlxuICAgICAgICA8dGVtcGxhdGUgdi1pZj1cImFwcHNTdG9yZS5iYXRjaC5pblByb2Nlc3NcIj5cbiAgICAgICAgICA8UHJvZ3Jlc3NCYXJcbiAgICAgICAgICAgIDp0aXRsZT1cImAke2FwcHNTdG9yZS5iYXRjaC5kb25lQ291bnR9IC8gJHthcHBzU3RvcmUuYmF0Y2gudG90YWxDb3VudH1gXCJcbiAgICAgICAgICAgIDpwcm9ncmVzcz1cIlxuICAgICAgICAgICAgICBhcHBzU3RvcmUuYmF0Y2guZG9uZUNvdW50IC8gYXBwc1N0b3JlLmJhdGNoLnRvdGFsQ291bnQgK1xuICAgICAgICAgICAgICBhcHBzU3RvcmUuYmF0Y2gucHJvZ3Jlc3MgLyBhcHBzU3RvcmUuYmF0Y2gudG90YWxDb3VudFxuICAgICAgICAgICAgXCJcbiAgICAgICAgICAgIGNvbG9yPVwicG9zaXRpdmVcIlxuICAgICAgICAgICAgdHJhY2tDb2xvcj1cImdyZWVuLTRcIlxuICAgICAgICAgICAgc2l6ZT1cIjMzcHhcIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgIDx0ZW1wbGF0ZSB2LWVsc2U+XG4gICAgICAgICAgPHEtYnRuXG4gICAgICAgICAgICBjbGFzcz1cImZpdCB0ZXh0LXBpeGVsYXRlZCB0ZXh0LWJvZHkxXCJcbiAgICAgICAgICAgIHVuZWxldmF0ZWRcbiAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICBjb2xvcj1cInBvc2l0aXZlXCJcbiAgICAgICAgICAgIGxhYmVsPVwiVXBkYXRlIGFsbFwiXG4gICAgICAgICAgICBAY2xpY2s9XCJhcHBzU3RvcmUuYmF0Y2hVcGRhdGUoYXBwc1N0b3JlLnVwZGF0YWJsZUFwcHMpXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8cS1iYWRnZVxuICAgICAgICAgICAgICBjbGFzcz1cInVwZGF0ZS1hbGwtYmFkZ2VcIlxuICAgICAgICAgICAgICA6bGFiZWw9XCJhcHBzU3RvcmUuYXBwc1VwZGF0ZUNvdW50XCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9xLWJ0bj5cbiAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgIDwvZGl2PlxuICAgICAgPHEtaW50ZXJzZWN0aW9uXG4gICAgICAgIHYtZm9yPVwidXBkYXRhYmxlQXBwIGluIGFwcHNTdG9yZS51cGRhdGFibGVBcHBzXCJcbiAgICAgICAgOmtleT1cInVwZGF0YWJsZUFwcC5pZFwiXG4gICAgICAgIG9uY2VcbiAgICAgICAgdHJhbnNpdGlvbj1cInNjYWxlXCJcbiAgICAgID5cbiAgICAgICAgPEFwcEluc3RhbGxlZENhcmQgOmFwcD1cInVwZGF0YWJsZUFwcFwiIEBjbGljaz1cImdvQXBwUGFnZVwiPlxuICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6YnV0dG9uPlxuICAgICAgICAgICAgPEFwcFVwZGF0ZUJ0biA6YXBwPVwidXBkYXRhYmxlQXBwXCIgLz5cbiAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICA8L0FwcEluc3RhbGxlZENhcmQ+XG4gICAgICA8L3EtaW50ZXJzZWN0aW9uPlxuXG4gICAgICA8cS1zZXBhcmF0b3JcbiAgICAgICAgdi1pZj1cImFwcHNTdG9yZS51cGRhdGFibGVBcHBzLmxlbmd0aCAmJiBhcHBzU3RvcmUudXBUb0RhdGVBcHBzLmxlbmd0aFwiXG4gICAgICAgIGNsYXNzPVwicS1teS1sZ1wiXG4gICAgICAvPlxuXG4gICAgICA8cS1pbnRlcnNlY3Rpb25cbiAgICAgICAgdi1mb3I9XCJ1cFRvRGF0ZUFwcCBpbiBhcHBzU3RvcmUudXBUb0RhdGVBcHBzXCJcbiAgICAgICAgOmtleT1cInVwVG9EYXRlQXBwLmlkXCJcbiAgICAgICAgb25jZVxuICAgICAgICB0cmFuc2l0aW9uPVwic2NhbGVcIlxuICAgICAgPlxuICAgICAgICA8QXBwSW5zdGFsbGVkQ2FyZCA6YXBwPVwidXBUb0RhdGVBcHBcIiBAY2xpY2s9XCJnb0FwcFBhZ2VcIj5cbiAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90OmJ1dHRvbj5cbiAgICAgICAgICAgIDxBcHBPcGVuQXBwQnRuIDphcHA9XCJ1cFRvRGF0ZUFwcFwiIC8+XG4gICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgPC9BcHBJbnN0YWxsZWRDYXJkPlxuICAgICAgPC9xLWludGVyc2VjdGlvbj5cblxuICAgICAgPHEtaW50ZXJzZWN0aW9uXG4gICAgICAgIHYtZm9yPVwidW5zdXBwb3J0ZWRBcHAgaW4gYXBwc1N0b3JlLnVuc3VwcG9ydGVkQXBwc1wiXG4gICAgICAgIDprZXk9XCJ1bnN1cHBvcnRlZEFwcC5pZFwiXG4gICAgICAgIG9uY2VcbiAgICAgICAgdHJhbnNpdGlvbj1cInNjYWxlXCJcbiAgICAgID5cbiAgICAgICAgPEFwcEluc3RhbGxlZENhcmQgOmFwcD1cInVuc3VwcG9ydGVkQXBwXCIgdW5zdXBwb3J0ZWQ+XG4gICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDpidXR0b24+XG4gICAgICAgICAgICA8QXBwSW5zdGFsbGVkQnRuIC8+XG4gICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgPC9BcHBJbnN0YWxsZWRDYXJkPlxuICAgICAgPC9xLWludGVyc2VjdGlvbj5cbiAgICA8L3RlbXBsYXRlPlxuICAgIDx0ZW1wbGF0ZSB2LWVsc2U+XG4gICAgICA8cS1pbnRlcnNlY3Rpb25cbiAgICAgICAgdi1mb3I9XCJpbnN0YWxsZWRBcHBzIGluIGFwcHNTdG9yZS5pbnN0YWxsZWRBcHBzXCJcbiAgICAgICAgOmtleT1cImluc3RhbGxlZEFwcHMuaWRcIlxuICAgICAgICBvbmNlXG4gICAgICAgIHRyYW5zaXRpb249XCJzY2FsZVwiXG4gICAgICA+XG4gICAgICAgIDxBcHBJbnN0YWxsZWRDYXJkIDphcHA9XCJpbnN0YWxsZWRBcHBzXCIgQGNsaWNrPVwiZ29BcHBQYWdlXCI+XG4gICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDpidXR0b24+XG4gICAgICAgICAgICA8QXBwSW5zdGFsbGVkQnRuIC8+XG4gICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgPC9BcHBJbnN0YWxsZWRDYXJkPlxuICAgICAgPC9xLWludGVyc2VjdGlvbj5cbiAgICA8L3RlbXBsYXRlPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgeyBvbk1vdW50ZWQsIHdhdGNoIH0gZnJvbSAndnVlJ1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAndnVlLXJvdXRlcidcbmNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpXG5cbmltcG9ydCB7IFByb2dyZXNzQmFyIH0gZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvUHJvZ3Jlc3NCYXInXG5pbXBvcnQgeyBBcHBVcGRhdGVCdG4gfSBmcm9tICdmZWF0dXJlcy9BcHBzL1VwZGF0ZUJ1dHRvbidcbmltcG9ydCB7IEFwcE9wZW5BcHBCdG4gfSBmcm9tICdmZWF0dXJlcy9BcHBzL09wZW5BcHBCdXR0b24nXG5pbXBvcnQgeyBBcHBJbnN0YWxsZWRDYXJkIH0gZnJvbSAnZmVhdHVyZXMvQXBwcy9JbnN0YWxsZWRDYXJkJ1xuaW1wb3J0IHsgQXBwSW5zdGFsbGVkQnRuLCBBcHBzTW9kZWwgfSBmcm9tICdlbnRpdHkvQXBwcydcbmNvbnN0IGFwcHNTdG9yZSA9IEFwcHNNb2RlbC51c2VBcHBzU3RvcmUoKVxuXG5pbXBvcnQgeyBGbGlwcGVyTW9kZWwgfSBmcm9tICdlbnRpdHkvRmxpcHBlcidcbmNvbnN0IGZsaXBwZXJTdG9yZSA9IEZsaXBwZXJNb2RlbC51c2VGbGlwcGVyU3RvcmUoKVxuXG5pbXBvcnQgeyBDYXRlZ29yeU1vZGVsIH0gZnJvbSAnZW50aXR5L0NhdGVnb3J5J1xuY29uc3QgY2F0ZWdvcmllc1N0b3JlID0gQ2F0ZWdvcnlNb2RlbC51c2VDYXRlZ29yaWVzU3RvcmUoKVxuXG5pbXBvcnQgeyB1c2VHbG9iYWxTdG9yZSB9IGZyb20gJ3NoYXJlZC9zdG9yZXMvZ2xvYmFsLXN0b3JlJ1xuY29uc3QgZ2xvYmFsU3RvcmUgPSB1c2VHbG9iYWxTdG9yZSgpXG5cbmNvbnN0IGdldENhdGVnb3JpZXMgPSBhc3luYyAoKSA9PiB7XG4gIGlmICghZ2xvYmFsU3RvcmUuaXNPbmxpbmUpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIGlmIChcbiAgICAhY2F0ZWdvcmllc1N0b3JlLmNhdGVnb3JpZXNMb2FkaW5nICYmXG4gICAgKCFjYXRlZ29yaWVzU3RvcmUuY2F0ZWdvcmllcy5sZW5ndGggfHxcbiAgICAgIGZsaXBwZXJTdG9yZS5hcGkgIT09IGNhdGVnb3JpZXNTdG9yZS5sYXN0QXBpIHx8XG4gICAgICBmbGlwcGVyU3RvcmUudGFyZ2V0ICE9PSBjYXRlZ29yaWVzU3RvcmUubGFzdFRhcmdldClcbiAgKSB7XG4gICAgYXdhaXQgY2F0ZWdvcmllc1N0b3JlLmdldENhdGVnb3JpZXMoe1xuICAgICAgYXBpOiBmbGlwcGVyU3RvcmUuYXBpLFxuICAgICAgdGFyZ2V0OiBmbGlwcGVyU3RvcmUudGFyZ2V0XG4gICAgfSlcbiAgfVxufVxuXG5jb25zdCBnb0FwcFBhZ2UgPSAoYXBwQWxpYXM6IEFwcHNNb2RlbC5BcHBbJ2FsaWFzJ10pID0+IHtcbiAgcm91dGVyLnB1c2goeyBuYW1lOiAnQXBwc1BhdGgnLCBwYXJhbXM6IHsgcGF0aDogYXBwQWxpYXMgfSB9KVxufVxuXG5jb25zdCByZUxvYWQgPSBhc3luYyAoKSA9PiB7XG4gIGFwcHNTdG9yZS5vbkNsZWFySW5zdGFsbGVkQXBwc0xpc3QoKVxuXG4gIGF3YWl0IGdldENhdGVnb3JpZXMoKVxuXG4gIGlmIChmbGlwcGVyU3RvcmUuZmxpcHBlcikge1xuICAgIGF3YWl0IGFwcHNTdG9yZS5nZXRJbnN0YWxsZWRBcHBzKHtcbiAgICAgIHJlZnJlc2hJbnN0YWxsZWRBcHBzOiB0cnVlXG4gICAgfSlcbiAgfVxufVxuXG5vbk1vdW50ZWQoYXN5bmMgKCkgPT4ge1xuICBhd2FpdCBnZXRDYXRlZ29yaWVzKClcblxuICBpZiAoXG4gICAgIWFwcHNTdG9yZS5sb2FkaW5nSW5zdGFsbGVkQXBwcyAmJlxuICAgICFhcHBzU3RvcmUuZmxpcHBlckluc3RhbGxlZEFwcHM/Lmxlbmd0aFxuICApIHtcbiAgICBhd2FpdCBhcHBzU3RvcmUuZ2V0SW5zdGFsbGVkQXBwcyh7XG4gICAgICByZWZyZXNoSW5zdGFsbGVkQXBwczogdHJ1ZVxuICAgIH0pXG4gIH1cbn0pXG5cbi8vIHdhdGNoKFxuLy8gICAoKSA9PiBmbGlwcGVyU3RvcmUuZmxpcHBlclJlYWR5LFxuLy8gICBhc3luYyAoKSA9PiB7XG4vLyAgICAgYXdhaXQgcmVMb2FkKClcbi8vICAgfVxuLy8gKVxuXG53YXRjaChcbiAgKCkgPT4gYXBwc1N0b3JlLmZsYWdzLmNhdGFsb2dDaGFubmVsUHJvZHVjdGlvbixcbiAgYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IHJlTG9hZCgpXG4gIH1cbilcblxud2F0Y2goXG4gICgpID0+IGdsb2JhbFN0b3JlLmlzT25saW5lLFxuICBhc3luYyAobmV3VmFsdWUpID0+IHtcbiAgICBpZiAobmV3VmFsdWUpIHtcbiAgICAgIGF3YWl0IGdldENhdGVnb3JpZXMoKVxuICAgIH1cblxuICAgIGlmIChmbGlwcGVyU3RvcmUuZmxpcHBlcikge1xuICAgICAgYXdhaXQgYXBwc1N0b3JlLmdldEluc3RhbGxlZEFwcHMoKVxuICAgIH1cbiAgfVxuKVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiIHNjb3BlZD5cbkBpbXBvcnQgJ3N0eWxlcyc7XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8cS1wYWdlIHBhZGRpbmc+XG4gICAgPHRlbXBsYXRlIHYtaWY9XCJhcHBzU3RvcmUubG9hZGluZ0luc3RhbGxlZEFwcHNcIj5cbiAgICAgIDxMb2FkaW5nIGxhYmVsPVwiTG9hZGluZyBpbnN0YWxsZWQgYXBwcy4uLlwiIC8+XG4gICAgPC90ZW1wbGF0ZT5cbiAgICA8dGVtcGxhdGUgdi1lbHNlLWlmPVwiIWZsaXBwZXJTdG9yZS5mbGFncy5jb25uZWN0ZWRcIj5cbiAgICAgIDxxLWNhcmQgZmxhdD5cbiAgICAgICAgPHEtY2FyZC1zZWN0aW9uIGNsYXNzPVwicS1wYS1ub25lIHEtbWEtbWRcIiBhbGlnbj1cImNlbnRlclwiPlxuICAgICAgICAgIDxxLWljb24gbmFtZT1cIm1kaS1hbGVydC1jaXJjbGVcIiBjb2xvcj1cInByaW1hcnlcIiBzaXplPVwiNjRweFwiIC8+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDYgcS1teS1zbVwiPkZsaXBwZXIgbm90IGNvbm5lY3RlZDwvZGl2PlxuICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgPC9xLWNhcmQ+XG4gICAgPC90ZW1wbGF0ZT5cbiAgICA8dGVtcGxhdGVcbiAgICAgIHYtZWxzZS1pZj1cIiFmbGlwcGVyU3RvcmUuaW5mbz8uc3RvcmFnZS5zZGNhcmQ/LnN0YXR1cy5pc0luc3RhbGxlZFwiXG4gICAgPlxuICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbiBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgPEZsaXBwZXJNaWNyb1NEQ2FyZFxuICAgICAgICAgIGZsYXRcbiAgICAgICAgICA6c2hvd0ZpbmRNaWNyb1NkQnRuPVwiZmxpcHBlclN0b3JlLmlzRWxlY3Ryb25cIlxuICAgICAgICAgIEBvbkZpbmRNaWNyb1NkPVwiZmxpcHBlclN0b3JlLmZpbmRNaWNyb1NkXCJcbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvdGVtcGxhdGU+XG4gICAgPHRlbXBsYXRlIHYtZWxzZS1pZj1cImFwcHNTdG9yZS5ub0FwcGxpY2F0aW9uc0luc3RhbGxlZFwiPlxuICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbiBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgPHEtY2FyZCBmbGF0PlxuICAgICAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInEtcGEtbm9uZSBxLW1hLW1kXCIgYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICAgIDxxLWljb24gbmFtZT1cIm1kaS1hbGVydC1jaXJjbGVcIiBjb2xvcj1cInByaW1hcnlcIiBzaXplPVwiNjRweFwiIC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNiBxLW15LXNtXCI+XG4gICAgICAgICAgICAgIFlvdSBoYXZlbid0IGluc3RhbGxlZCBhbnkgYXBwcyB5ZXRcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICAgIDwvcS1jYXJkPlxuICAgICAgPC9kaXY+XG4gICAgPC90ZW1wbGF0ZT5cbiAgICA8dGVtcGxhdGUgdi1lbHNlLWlmPVwiIWZsaXBwZXJTdG9yZS5mbGFncy5mbGlwcGVySXNJbml0aWFsaXplZFwiPlxuICAgICAgPEluc3RhbGxlZExpc3QgLz5cbiAgICA8L3RlbXBsYXRlPlxuICA8L3EtcGFnZT5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgeyBMb2FkaW5nIH0gZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvTG9hZGluZydcbmltcG9ydCB7IEZsaXBwZXJNaWNyb1NEQ2FyZCB9IGZyb20gJ2VudGl0eS9GbGlwcGVyJ1xuaW1wb3J0IHsgSW5zdGFsbGVkTGlzdCB9IGZyb20gJ3dpZGdldHMvQXBwcy9JbnN0YWxsZWRMaXN0J1xuaW1wb3J0IHsgQXBwc01vZGVsIH0gZnJvbSAnZW50aXR5L0FwcHMnXG5jb25zdCBhcHBzU3RvcmUgPSBBcHBzTW9kZWwudXNlQXBwc1N0b3JlKClcblxuaW1wb3J0IHsgRmxpcHBlck1vZGVsIH0gZnJvbSAnZW50aXR5L0ZsaXBwZXInXG5jb25zdCBmbGlwcGVyU3RvcmUgPSBGbGlwcGVyTW9kZWwudXNlRmxpcHBlclN0b3JlKClcbjwvc2NyaXB0PlxuIl0sIm5hbWVzIjpbIl9ob2lzdGVkXzEiLCJfY3JlYXRlQmxvY2siLCJfbm9ybWFsaXplU3R5bGUiLCJfY3JlYXRlQ29tbWVudFZOb2RlIiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl90b0Rpc3BsYXlTdHJpbmciLCJDYXRlZ29yeU1vZGVsLnVzZUNhdGVnb3JpZXNTdG9yZSIsIl9ob2lzdGVkXzIiLCJfaG9pc3RlZF8zIiwiX2hvaXN0ZWRfNCIsIl9ob2lzdGVkXzUiLCJfaG9pc3RlZF82IiwiX2hvaXN0ZWRfNyIsIl9ob2lzdGVkXzgiLCJfaG9pc3RlZF85IiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9jcmVhdGVWTm9kZSIsIl93aXRoRGlyZWN0aXZlcyIsIl9yZW5kZXJTbG90IiwiX3dpdGhDdHgiLCJfbm9ybWFsaXplQ2xhc3MiLCJBcHBzTW9kZWwudXNlQXBwc1N0b3JlIiwiQXBwc0FwaSIsIkZsaXBwZXJNb2RlbC51c2VGbGlwcGVyU3RvcmUiLCJhcGkiLCJfb3BlbkJsb2NrIiwiX0ZyYWdtZW50IiwiX3JlbmRlckxpc3QiLCJfY3JlYXRlVGV4dFZOb2RlIiwiX3dpdGhNb2RpZmllcnMiLCJfYSIsIl9tZXJnZVByb3BzIiwiX2ltcG9ydHNfMCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZ0NBLFVBQU0sT0FBTztBQUViLFVBQU0sVUFBVSxNQUFNO0FBQ3BCLFdBQUssT0FBTztBQUFBLElBQ2Q7Ozs7OztBQXRCVSxNQUFBQSxlQUFBLEVBQUEsT0FBTSxlQUFBOztzQkFiZEMsWUFjUyxPQUFBO0FBQUEsSUFiTixPQUFLQyxlQUFBLHNCQUF3QixPQUFBLEtBQUssY0FBcUIsT0FBQSxvQkFBaUIsTUFBQSxLQUFBLEVBQUE7QUFBQSxJQUd4RSxXQUFXLE9BQUE7QUFBQSxJQUNYLFNBQU8sT0FBQTtBQUFBLEVBQUEsR0FBQTtBQUFBLHFCQUVSLE1BS0U7QUFBQSxNQUpNLCtCQURSRCxZQUtFLE9BQUE7QUFBQSxRQUFBLEtBQUE7QUFBQSxRQUhDLE1BQUksT0FBUyxPQUFBLE9BQU87QUFBQSxRQUNyQixNQUFLO0FBQUEsUUFDTCxPQUFNO0FBQUEsTUFBQSxHQUFBLE1BQUEsR0FBQSxDQUFBLE1BQUEsQ0FBQSxLQUFBRSxtQkFBQSxJQUFBLElBQUE7QUFBQSxNQUVSQyxnQkFBNEMsUUFBNUNKLGNBQTRDSyxnQkFBZCxPQUFBLElBQUksR0FBQSxDQUFBO0FBQUEsSUFBQSxDQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7O0FDd0N0QyxVQUFNLFFBQVE7QUFFZCxVQUFNLE9BQU87QUFFYixVQUFNLFFBQVFDLG1CQUFjO0FBQzVCLFVBQU0sYUFBYSxTQUFTLE1BQU0sTUFBTSxVQUFVO0FBRWxELFVBQU0sa0JBQWtCO0FBQUEsTUFDdEI7O0FBQU0sc0NBQVcsVUFBWCxtQkFBa0IsS0FBSyxDQUFDLE1BQU0sRUFBRSxPQUFPLE1BQU0sZ0JB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
