import { G as GenericPageLayout } from "./GenericPageLayout-C8MK6bTr.js";
import { u as useDarkProps, c as useDark, O as Operation, t as logger, k as useFlipperStore, v as rpcErrorHandler, j as QCardSection, i as QCard } from "./KeypadButton.vue_vue_type_style_index_0_scoped_4cc0fc91_lang-CBp6KsX-.js";
import { Q as QInput } from "./QInput-BEDmmn9W.js";
import { L as createComponent, H as getCurrentInstance, c as computed, h, J as hSlot, a5 as defineStore, r as reactive, a as ref, d as defineComponent, S as onMounted, w as watch, _ as _export_sfc, e as createBlock, f as openBlock, g as withCtx, j as createVNode, p as createBaseVNode, l as createTextVNode, n as createElementBlock, i as createCommentVNode, Q as QBtn, t as toDisplayString, F as Fragment, q as renderList, ab as onDeactivated, aa as onActivated, aw as vmIsDestroyed, D as stopAndPrevent, R as nextTick, ax as provide, ay as formKey } from "./index-C6TMAAL-.js";
import { F as FlipperConnectWebBtn } from "./ConnectWeb-DgVsGULf.js";
import "./QSelect-Bjjy7qRQ.js";
import "./QFile-DY-XgOSk.js";
import "./QHeader-DiNZiq94.js";
import "./QLayout-Ct_sU1En.js";
import "./QFooter-Dm117KTQ.js";
import "./ExpandView.vue_vue_type_style_index_0_scoped_b095a25b_lang-CuFaF6KU.js";
import "./axios-2pbeEnA2.js";
import "./QList-DWfwtdHC.js";
import "./QSpace-BMSvs-Cu.js";
import "./QTooltip-DoudV-ng.js";
import { u as useNumbersOnly } from "./useNumberOnly-DgLME2Yk.js";
import { n as addFocusFn } from "./_commonjsHelpers-DHRe3nu-.js";
import "./QToolbar-WF-h4z6i.js";
import "./use-file-dom-props-CBo4nJW0.js";
import "./private.use-form-CPVT462N.js";
import "./QMenu-CayqftHC.js";
const separatorValues = ["horizontal", "vertical", "cell", "none"];
const QMarkupTable = createComponent({
  name: "QMarkupTable",
  props: {
    ...useDarkProps,
    dense: Boolean,
    flat: Boolean,
    bordered: Boolean,
    square: Boolean,
    wrapCells: Boolean,
    separator: {
      type: String,
      default: "horizontal",
      validator: (v) => separatorValues.includes(v)
    }
  },
  setup(props, { slots }) {
    const vm = getCurrentInstance();
    const isDark = useDark(props, vm.proxy.$q);
    const classes = computed(
      () => `q-markup-table q-table__container q-table__card q-table--${props.separator}-separator` + (isDark.value === true ? " q-table--dark q-table__card--dark q-dark" : "") + (props.dense === true ? " q-table--dense" : "") + (props.flat === true ? " q-table--flat" : "") + (props.bordered === true ? " q-table--bordered" : "") + (props.square === true ? " q-table--square" : "") + (props.wrapCells === false ? " q-table--no-wrap" : "")
    );
    return () => h("div", {
      class: classes.value
    }, [
      h("table", { class: "q-table" }, hSlot(slots.default))
    ]);
  }
});
const operation = new Operation();
let mfkey;
async function startMfkey(args, timeoutSeconds = 15) {
  mfkey = new Worker(new URL(
    /* @vite-ignore */
    "/lab.flipper.net/assets/mfkey-worker-D_BNOFIn.js",
    import.meta.url
  ));
  const start = operation.create(
    mfkey,
    "start",
    JSON.parse(JSON.stringify(args))
  );
  const timeout = setTimeout(() => {
    operation.terminate({ status: 0, error: "killed on timeout" });
    mfkey.terminate();
  }, timeoutSeconds * 1e3);
  mfkey.onmessage = (e) => {
    if (e.data.operation === "output") {
      clearTimeout(timeout);
      operation.terminate({ status: 1, data: e.data.data });
      mfkey.terminate();
    } else if (e.data.operation === "error") {
      operation.terminate({ status: 0, error: e.data.data });
      mfkey.terminate();
    }
  };
  return start;
}
const componentName$1 = "NfcStore";
const useNfcStore = defineStore("nfc", () => {
  const flags = reactive({
    mfkeyFlipperInProgress: false,
    mfkeyManualInProgress: false
  });
  const timeoutSeconds = ref(15);
  const mfkey2 = async (args) => {
    let result = "";
    if (args instanceof Object) {
      args = Object.values(args);
    }
    try {
      result = await startMfkey(args, timeoutSeconds.value);
      if (result) {
        logger.debug({
          context: componentName$1,
          message: `cracked nonce: ${args}, key: ${result}`
        });
      }
    } catch (error) {
      if (error instanceof ErrorEvent || error instanceof Error) {
        result = error.message;
      } else {
        result = String(error);
      }
    }
    flags.mfkeyManualInProgress = false;
    if (result.includes("timeout")) {
      return "timeout";
    }
    if (result.startsWith("Error")) {
      throw new Error(result);
    }
    return result;
  };
  return {
    flags,
    timeoutSeconds,
    mfkey: mfkey2
  };
});
const componentName = "NfcAttack";
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Attack",
  setup(__props, { expose: __expose }) {
    __expose();
    const flipperStore = useFlipperStore();
    const nfcStore = useNfcStore();
    const mfkeyStatus = ref("");
    const nonces = ref([]);
    const noncesNotFound = ref(false);
    const readNonces = async () => {
      var _a, _b, _c, _d;
      nfcStore.flags.mfkeyFlipperInProgress = true;
      noncesNotFound.value = false;
      mfkeyStatus.value = "";
      if (!((_b = (_a = flipperStore.info) == null ? void 0 : _a.storage.sdcard) == null ? void 0 : _b.status.isInstalled)) {
        flipperStore.dialogs.microSDcardMissing = true;
        return;
      }
      const res = await ((_c = flipperStore.flipper) == null ? void 0 : _c.RPC("storageRead", { path: "/ext/nfc/.mfkey32.log" }).then((value) => {
        logger.debug({
          context: componentName,
          message: "storageRead: /ext/nfc/.mfkey32.log"
        });
        return value;
      }).catch((error) => {
        if (error.toString() !== "ERROR_STORAGE_NOT_EXIST") {
          rpcErrorHandler({
            componentName,
            error,
            command: "storageRead: /ext/nfc/.mfkey32.log"
          });
        } else {
          logger.warn({
            context: componentName,
            message: `storageRead: /ext/nfc/.mfkey32.log: ${error.toString()}`
          });
        }
        noncesNotFound.value = true;
        mfkeyStatus.value = "Mfkey log file not found";
      }).finally(() => {
        nfcStore.flags.mfkeyFlipperInProgress = false;
      }));
      if (!res) {
        return;
      }
      nonces.value = new TextDecoder().decode(res).split("\n");
      if (nonces.value[nonces.value.length - 1].length === 0) {
        nonces.value.pop();
      }
      if (nonces.value.length === 0) {
        const res2 = await ((_d = flipperStore.flipper) == null ? void 0 : _d.RPC("storageStat", { path: "/ext/nfc/.mfkey32.log" }).catch((error) => {
          console.error(error);
        }));
        if (res2 && res2.size) {
          mfkeyStatus.value = "No nonces found in log file";
        } else {
          mfkeyStatus.value = "Log file not found";
        }
        noncesNotFound.value = true;
      }
    };
    onMounted(async () => {
      var _a, _b;
      if (flipperStore.flipperReady) {
        if (!flipperStore.rpcActive) {
          await ((_a = flipperStore.flipper) == null ? void 0 : _a.startRPCSession());
        }
        if (flipperStore.rpcActive) {
          if (!flipperStore.info) {
            await ((_b = flipperStore.flipper) == null ? void 0 : _b.getInfo());
          }
          await readNonces();
        }
      }
    });
    watch(
      () => {
        var _a;
        return (_a = flipperStore.flipper) == null ? void 0 : _a.flipperReady;
      },
      async (newValue) => {
        if (newValue) {
          readNonces();
        }
      }
    );
    const timeouts = ref([]);
    const uniqueKeys = ref([]);
    const mfkeyFlipperStart = async () => {
      var _a, _b;
      timeouts.value = [];
      nfcStore.flags.mfkeyFlipperInProgress = true;
      mfkeyStatus.value = "Loading log";
      const keys = /* @__PURE__ */ new Set();
      const errors = [];
      for (let i = 0; i < nonces.value.length; i++) {
        const args = nonces.value[i].slice(nonces.value[i].indexOf("cuid")).split(" ").filter((e, i2) => i2 % 2 === 1);
        mfkeyStatus.value = `Cracking nonce ${i + 1} of ${nonces.value.length}`;
        try {
          const key = await nfcStore.mfkey(args);
          if (key === "timeout") {
            timeouts.value.push(args);
            continue;
          }
          if (!key.startsWith("Error") && !key.includes(" ")) {
            keys.add(key);
            uniqueKeys.value = Array.from(keys);
          }
        } catch (error) {
          if (error instanceof ErrorEvent || error instanceof Error) {
            error = error.message;
          } else {
            error = String(error);
          }
          errors.push(error);
          logger.error({
            context: componentName,
            message: `error in mfkey32v2: ${error} (args: ${args})`
          });
        }
      }
      mfkeyStatus.value = "Loading user dictionary";
      const res = await ((_a = flipperStore.flipper) == null ? void 0 : _a.RPC("storageRead", { path: "/ext/nfc/assets/mf_classic_dict_user.nfc" }).catch(
        (error) => rpcErrorHandler({ componentName, error, command: "storageRead" })
      ).finally(() => {
        logger.debug({
          context: componentName,
          message: "storageRead: /ext/nfc/assets/mf_classic_dict_user.nfc"
        });
      }));
      let dictionary = [];
      if (res) {
        mfkeyStatus.value = "Processing user dictionary";
        dictionary = new TextDecoder().decode(res).split("\n");
        if (dictionary[dictionary.length - 1].length === 0) {
          dictionary.pop();
        }
      }
      dictionary = dictionary.filter(
        (e) => e !== "Error: mfkey run killed on timeout"
      );
      dictionary = new Set(dictionary);
      const oldDictLength = Array.from(dictionary).length;
      for (const key of keys) {
        dictionary.add(key);
      }
      mfkeyStatus.value = "Uploading user dictionary";
      const file = new TextEncoder().encode(Array.from(dictionary).join("\n"));
      const path = "/ext/nfc/assets/mf_classic_dict_user.nfc";
      await ((_b = flipperStore.flipper) == null ? void 0 : _b.RPC("storageWrite", { path, buffer: file.buffer }).catch(
        (error) => rpcErrorHandler({ componentName, error, command: "storageWrite" })
      ).finally(() => {
        logger.debug({
          context: componentName,
          message: `storage.write: ${path}`
        });
      }));
      mfkeyStatus.value = `Nonces: ${nonces.value.length} | Unique keys: ${uniqueKeys.value.length} | New keys: ${Array.from(dictionary).length - oldDictLength}`;
      if (errors.length > 0) {
        mfkeyStatus.value += ` | Errors: ${errors.length} (check logs for details)`;
      }
      if (timeouts.value.length > 0) {
        mfkeyStatus.value += ` | Timeouts: ${timeouts.value.length}`;
      }
      nfcStore.flags.mfkeyFlipperInProgress = false;
    };
    const __returned__ = { flipperStore, nfcStore, componentName, mfkeyStatus, nonces, noncesNotFound, readNonces, timeouts, uniqueKeys, mfkeyFlipperStart, get FlipperConnectWebBtn() {
      return FlipperConnectWebBtn;
    }, get useNumbersOnly() {
      return useNumbersOnly;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$2 = { class: "row justify-start" };
const _hoisted_2$1 = {
  key: 0,
  class: "q-pt-sm text-subtitle-1 text-negative"
};
const _hoisted_3$1 = {
  key: 1,
  class: "q-pt-sm text-subtitle-1 text-center"
};
const _hoisted_4$1 = { class: "row justify-start" };
const _hoisted_5 = {
  key: 2,
  class: "q-mt-sm"
};
const _hoisted_6 = { key: 0 };
const _hoisted_7 = { key: 0 };
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QCard, { flat: "" }, {
    default: withCtx(() => [
      createVNode(QCardSection, { class: "q-px-none" }, {
        default: withCtx(() => _cache[1] || (_cache[1] = [
          createBaseVNode("h6", { class: "full-width text-left q-ma-none" }, "Crack nonces on Flipper", -1)
        ])),
        _: 1,
        __: [1]
      }),
      createVNode(QCardSection, { class: "q-px-none" }, {
        default: withCtx(() => [
          _cache[4] || (_cache[4] = createBaseVNode("div", { class: "q-mb-md" }, [
            createTextVNode(" Captured nonces are stored in the log file ("),
            createBaseVNode("code", null, "/ext/nfc/.mfkey32.log"),
            createTextVNode(")."),
            createBaseVNode("br"),
            createTextVNode(" Once discovered, new keys will be added to the user dictionary file ("),
            createBaseVNode("code", null, "/ext/nfc/assets/mf_classic_dict_user.nfc"),
            createTextVNode("). ")
          ], -1)),
          createBaseVNode("div", null, [
            _cache[2] || (_cache[2] = createTextVNode(" Some cracks may take longer than expected. Timeout: ", -1)),
            createVNode(QInput, {
              modelValue: $setup.nfcStore.timeoutSeconds,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.nfcStore.timeoutSeconds = $event),
              modelModifiers: { number: true, trim: true },
              onKeypress: $setup.useNumbersOnly,
              dense: "",
              style: { "width": "40px", "display": "inline-block" },
              class: "q-ml-sm"
            }, null, 8, ["modelValue", "onKeypress"]),
            _cache[3] || (_cache[3] = createTextVNode(" seconds. ", -1))
          ])
        ]),
        _: 1,
        __: [4]
      }),
      $setup.flipperStore.flags.connected && $setup.flipperStore.rpcActive ? (openBlock(), createBlock(QCardSection, {
        key: 0,
        class: "column items-start q-px-none"
      }, {
        default: withCtx(() => {
          var _a, _b, _c, _d, _e, _f, _g, _h;
          return [
            createBaseVNode("div", _hoisted_1$2, [
              createVNode(QBtn, {
                color: "primary",
                label: "Give me the keys",
                loading: $setup.nfcStore.flags.mfkeyFlipperInProgress,
                disable: $setup.nfcStore.flags.mfkeyManualInProgress || !((_b = (_a = $setup.flipperStore.info) == null ? void 0 : _a.storage.sdcard) == null ? void 0 : _b.status.isInstalled) || $setup.nonces.length === 0,
                onClick: $setup.mfkeyFlipperStart,
                unelevated: ""
              }, null, 8, ["loading", "disable"])
            ]),
            ((_c = $setup.flipperStore.info) == null ? void 0 : _c.doneReading) && !((_e = (_d = $setup.flipperStore.info) == null ? void 0 : _d.storage.sdcard) == null ? void 0 : _e.status.isInstalled) ? (openBlock(), createElementBlock("span", _hoisted_2$1, " MicroSD card not detected ")) : createCommentVNode("", true),
            $setup.mfkeyStatus ? (openBlock(), createElementBlock("div", _hoisted_3$1, toDisplayString($setup.mfkeyStatus), 1)) : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_4$1, [
              ((_f = $setup.flipperStore.info) == null ? void 0 : _f.doneReading) && !((_h = (_g = $setup.flipperStore.info) == null ? void 0 : _g.storage.sdcard) == null ? void 0 : _h.status.isInstalled) || $setup.noncesNotFound ? (openBlock(), createBlock(QBtn, {
                key: 0,
                flat: "",
                dense: "",
                icon: "mdi-reload",
                label: "Refresh",
                onClick: $setup.readNonces
              })) : createCommentVNode("", true)
            ]),
            $setup.uniqueKeys.length || $setup.timeouts.length ? (openBlock(), createElementBlock("div", _hoisted_5, [
              $setup.uniqueKeys.length ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                _cache[5] || (_cache[5] = createBaseVNode("div", { class: "text-bold q-mt-md" }, "Unique keys:", -1)),
                createBaseVNode("div", null, toDisplayString($setup.uniqueKeys.join(", ")), 1)
              ], 64)) : createCommentVNode("", true),
              $setup.timeouts.length ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                _cache[7] || (_cache[7] = createBaseVNode("div", { class: "text-bold q-mt-md" }, "Timeouts:", -1)),
                createVNode(QMarkupTable, {
                  flat: "",
                  dense: ""
                }, {
                  default: withCtx(() => [
                    _cache[6] || (_cache[6] = createBaseVNode("thead", null, [
                      createBaseVNode("tr", null, [
                        createBaseVNode("th", null, "cuid"),
                        createBaseVNode("th", null, "nt0"),
                        createBaseVNode("th", null, "nr0"),
                        createBaseVNode("th", null, "ar0"),
                        createBaseVNode("th", null, "nt1"),
                        createBaseVNode("th", null, "nr1"),
                        createBaseVNode("th", null, "ar1")
                      ])
                    ], -1)),
                    createBaseVNode("tbody", null, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList($setup.timeouts, (args, index) => {
                        return openBlock(), createElementBlock(Fragment, { key: index }, [
                          args.length ? (openBlock(), createElementBlock("tr", _hoisted_6, [
                            (openBlock(true), createElementBlock(Fragment, null, renderList(args, (arg) => {
                              return openBlock(), createElementBlock("td", { key: arg }, toDisplayString(arg), 1);
                            }), 128))
                          ])) : createCommentVNode("", true)
                        ], 64);
                      }), 128))
                    ])
                  ]),
                  _: 1,
                  __: [6]
                })
              ], 64)) : createCommentVNode("", true)
            ])) : createCommentVNode("", true)
          ];
        }),
        _: 1
      })) : (openBlock(), createBlock(QCardSection, {
        key: 1,
        class: "row justify-start q-px-none"
      }, {
        default: withCtx(() => [
          $setup.flipperStore.isElectron ? (openBlock(), createElementBlock("p", _hoisted_7, "Plug in your Flipper and and wait for initialization")) : (openBlock(), createBlock($setup["FlipperConnectWebBtn"], { key: 1 }))
        ]),
        _: 1
      }))
    ]),
    _: 1
  });
}
const NfcAttack = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__file", "Attack.vue"]]);
const QForm = createComponent({
  name: "QForm",
  props: {
    autofocus: Boolean,
    noErrorFocus: Boolean,
    noResetFocus: Boolean,
    greedy: Boolean,
    onSubmit: Function
  },
  emits: ["reset", "validationSuccess", "validationError"],
  setup(props, { slots, emit }) {
    const vm = getCurrentInstance();
    const rootRef = ref(null);
    let validateIndex = 0;
    const registeredComponents = [];
    function validate(shouldFocus) {
      const focus2 = typeof shouldFocus === "boolean" ? shouldFocus : props.noErrorFocus !== true;
      const index = ++validateIndex;
      const emitEvent = (res, ref2) => {
        emit(`validation${res === true ? "Success" : "Error"}`, ref2);
      };
      const validateComponent = (comp) => {
        const valid = comp.validate();
        return typeof valid.then === "function" ? valid.then(
          (valid2) => ({ valid: valid2, comp }),
          (err) => ({ valid: false, comp, err })
        ) : Promise.resolve({ valid, comp });
      };
      const errorsPromise = props.greedy === true ? Promise.all(registeredComponents.map(validateComponent)).then((res) => res.filter((r) => r.valid !== true)) : registeredComponents.reduce(
        (acc, comp) => acc.then(() => {
          return validateComponent(comp).then((r) => {
            if (r.valid === false) {
              return Promise.reject(r);
            }
          });
        }),
        Promise.resolve()
      ).catch((error) => [error]);
      return errorsPromise.then((errors) => {
        if (errors === void 0 || errors.length === 0) {
          index === validateIndex && emitEvent(true);
          return true;
        }
        if (index === validateIndex) {
          const { comp, err } = errors[0];
          err !== void 0 && console.error(err);
          emitEvent(false, comp);
          if (focus2 === true) {
            const activeError = errors.find(({ comp: comp2 }) => typeof comp2.focus === "function" && vmIsDestroyed(comp2.$) === false);
            if (activeError !== void 0) {
              activeError.comp.focus();
            }
          }
        }
        return false;
      });
    }
    function resetValidation() {
      validateIndex++;
      registeredComponents.forEach((comp) => {
        typeof comp.resetValidation === "function" && comp.resetValidation();
      });
    }
    function submit(evt) {
      evt !== void 0 && stopAndPrevent(evt);
      const index = validateIndex + 1;
      validate().then((val) => {
        if (index === validateIndex && val === true) {
          if (props.onSubmit !== void 0) {
            emit("submit", evt);
          } else if ((evt == null ? void 0 : evt.target) !== void 0 && typeof evt.target.submit === "function") {
            evt.target.submit();
          }
        }
      });
    }
    function reset(evt) {
      evt !== void 0 && stopAndPrevent(evt);
      emit("reset");
      nextTick(() => {
        resetValidation();
        if (props.autofocus === true && props.noResetFocus !== true) {
          focus();
        }
      });
    }
    function focus() {
      addFocusFn(() => {
        if (rootRef.value === null) return;
        const target = rootRef.value.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]") || rootRef.value.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]") || rootRef.value.querySelector("[autofocus], [data-autofocus]") || Array.prototype.find.call(rootRef.value.querySelectorAll("[tabindex]"), (el) => el.tabIndex !== -1);
        target == null ? void 0 : target.focus({ preventScroll: true });
      });
    }
    provide(formKey, {
      bindComponent(vmProxy) {
        registeredComponents.push(vmProxy);
      },
      unbindComponent(vmProxy) {
        const index = registeredComponents.indexOf(vmProxy);
        if (index !== -1) {
          registeredComponents.splice(index, 1);
        }
      }
    });
    let shouldActivate = false;
    onDeactivated(() => {
      shouldActivate = true;
    });
    onActivated(() => {
      shouldActivate === true && props.autofocus === true && focus();
    });
    onMounted(() => {
      props.autofocus === true && focus();
    });
    Object.assign(vm.proxy, {
      validate,
      resetValidation,
      submit,
      reset,
      focus,
      getValidationComponents: () => registeredComponents
    });
    return () => h("form", {
      class: "q-form",
      ref: rootRef,
      onSubmit: submit,
      onReset: reset
    }, hSlot(slots.default));
  }
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Manually",
  setup(__props, { expose: __expose }) {
    __expose();
    const nfcStore = useNfcStore();
    const args = ref({
      cuid: "2a234f80",
      nt0: "55721809",
      nr0: "ce9985f6",
      ar0: "772f55be",
      nt1: "a27173f2",
      nr1: "e386b505",
      ar1: "5fa65203"
    });
    const result = ref();
    const mfkeyManualStart = async (e) => {
      e.preventDefault();
      nfcStore.flags.mfkeyManualInProgress = true;
      result.value = await nfcStore.mfkey(args.value);
    };
    const __returned__ = { nfcStore, args, result, mfkeyManualStart };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$1 = { class: "flex q-gutter-md args-inputs-container" };
const _hoisted_2 = { class: "row justify-start q-mt-lg" };
const _hoisted_3 = {
  key: 0,
  class: "q-pt-lg"
};
const _hoisted_4 = {
  key: 0,
  class: "text-subtitle1 q-mr-sm"
};
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QCard, { flat: "" }, {
    default: withCtx(() => [
      createVNode(QCardSection, { class: "q-px-none" }, {
        default: withCtx(() => _cache[7] || (_cache[7] = [
          createBaseVNode("h6", { class: "full-width text-left q-ma-none" }, "Enter the nonce manually", -1)
        ])),
        _: 1,
        __: [7]
      }),
      createVNode(QCardSection, { class: "q-px-none" }, {
        default: withCtx(() => [
          createVNode(QForm, { onSubmit: $setup.mfkeyManualStart }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_1$1, [
                createVNode(QInput, {
                  modelValue: $setup.args.cuid,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.args.cuid = $event),
                  label: "cuid"
                }, null, 8, ["modelValue"]),
                createVNode(QInput, {
                  modelValue: $setup.args.nt0,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.args.nt0 = $event),
                  label: "nt0"
                }, null, 8, ["modelValue"]),
                createVNode(QInput, {
                  modelValue: $setup.args.nr0,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.args.nr0 = $event),
                  label: "nr0"
                }, null, 8, ["modelValue"]),
                createVNode(QInput, {
                  modelValue: $setup.args.ar0,
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.args.ar0 = $event),
                  label: "ar0"
                }, null, 8, ["modelValue"]),
                createVNode(QInput, {
                  modelValue: $setup.args.nt1,
                  "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.args.nt1 = $event),
                  label: "nt1"
                }, null, 8, ["modelValue"]),
                createVNode(QInput, {
                  modelValue: $setup.args.nr1,
                  "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.args.nr1 = $event),
                  label: "nr1"
                }, null, 8, ["modelValue"]),
                createVNode(QInput, {
                  modelValue: $setup.args.ar1,
                  "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.args.ar1 = $event),
                  label: "ar1"
                }, null, 8, ["modelValue"])
              ]),
              createBaseVNode("div", _hoisted_2, [
                createVNode(QBtn, {
                  type: "submit",
                  color: "primary",
                  loading: $setup.nfcStore.flags.mfkeyManualInProgress,
                  disable: $setup.nfcStore.flags.mfkeyFlipperInProgress,
                  label: "Run mfkey32",
                  unelevated: ""
                }, null, 8, ["loading", "disable"])
              ])
            ]),
            _: 1
          }),
          $setup.result ? (openBlock(), createElementBlock("div", _hoisted_3, [
            !$setup.result.startsWith("Error") ? (openBlock(), createElementBlock("span", _hoisted_4, "Key:")) : createCommentVNode("", true),
            createBaseVNode("b", null, toDisplayString($setup.result), 1)
          ])) : createCommentVNode("", true)
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const NfcManually = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__scopeId", "data-v-0a8a8ab8"], ["__file", "Manually.vue"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Mfkey32",
  setup(__props, { expose: __expose }) {
    __expose();
    const __returned__ = { get NfcAttack() {
      return NfcAttack;
    }, get NfcManually() {
      return NfcManually;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = { class: "column items-start" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode($setup["NfcAttack"], { class: "q-mb-lg" }),
    createVNode($setup["NfcManually"])
  ]);
}
const NfcMfkey32 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "Mfkey32.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Nfc",
  setup(__props, { expose: __expose }) {
    __expose();
    const __returned__ = { get GenericPageLayout() {
      return GenericPageLayout;
    }, get NfcMfkey32() {
      return NfcMfkey32;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock($setup["GenericPageLayout"], {
    title: "Mfkey32",
    icon: "flipper:nfc",
    description: "Retreive MF Classic keys from gathered nonces using the mfkey32 attack"
  }, {
    info: withCtx(() => _cache[0] || (_cache[0] = [
      createBaseVNode("h6", { class: "q-mt-none q-mb-sm" }, "About the Mfkey32 attack", -1),
      createBaseVNode("p", null, " The mfkey32 attack is a method to retrieve the keys of MF Classic cards by using the nonces gathered during the communication between the card and the reader. The attack is based on the fact that the nonces are generated using a weak random number generator, which allows an attacker to recover the keys by analyzing the nonces. ", -1),
      createBaseVNode("p", null, " Saved nonces are stored in the log file on Flipper's SD card. We are feeding nonces one by one into mfkey32, looking for new keys. Once discovered, new keys will be added to the user dictionary file and will be available for future cracks. ", -1),
      createBaseVNode("p", null, "You can also run the attack by entering the nonce manually.", -1),
      createBaseVNode("p", { class: "q-mb-none" }, [
        createBaseVNode("a", {
          href: "https://docs.flipper.net/nfc/mfkey32",
          target: "_blank"
        }, "Read more about mfkey32"),
        createTextVNode(" on Flipper Docs ")
      ], -1)
    ])),
    default: withCtx(() => [
      createVNode($setup["NfcMfkey32"])
    ]),
    _: 1
  });
}
const Nfc = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Nfc.vue"]]);
export {
  Nfc as NfcPage
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgtRGxOU2IzQ3kuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvbWFya3VwLXRhYmxlL1FNYXJrdXBUYWJsZS5qcyIsIi4uLy4uLy4uL3NyYy9lbnRpdGllcy9OZmMvbGliL21ma2V5LmpzIiwiLi4vLi4vLi4vc3JjL2VudGl0aWVzL05mYy9tb2RlbC9zdG9yZXMudHMiLCIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvTmZjL0F0dGFjay91aS9BdHRhY2sudnVlIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9mb3JtL1FGb3JtLmpzIiwiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL05mYy9NYW51YWxseS91aS9NYW51YWxseS52dWUiLCIuLi8uLi8uLi9zcmMvd2lkZ2V0cy9ORkMvTWZrZXkzMi91aS9NZmtleTMyLnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9OZmMvdWkvTmZjLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoLCBjb21wdXRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlRGFyaywgeyB1c2VEYXJrUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1kYXJrL3VzZS1kYXJrLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcblxuY29uc3Qgc2VwYXJhdG9yVmFsdWVzID0gWyAnaG9yaXpvbnRhbCcsICd2ZXJ0aWNhbCcsICdjZWxsJywgJ25vbmUnIF1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FNYXJrdXBUYWJsZScsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VEYXJrUHJvcHMsXG5cbiAgICBkZW5zZTogQm9vbGVhbixcbiAgICBmbGF0OiBCb29sZWFuLFxuICAgIGJvcmRlcmVkOiBCb29sZWFuLFxuICAgIHNxdWFyZTogQm9vbGVhbixcbiAgICB3cmFwQ2VsbHM6IEJvb2xlYW4sXG5cbiAgICBzZXBhcmF0b3I6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdob3Jpem9udGFsJyxcbiAgICAgIHZhbGlkYXRvcjogdiA9PiBzZXBhcmF0b3JWYWx1ZXMuaW5jbHVkZXModilcbiAgICB9XG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCB2bSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgdm0ucHJveHkuJHEpXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLW1hcmt1cC10YWJsZSBxLXRhYmxlX19jb250YWluZXIgcS10YWJsZV9fY2FyZCdcbiAgICAgICsgYCBxLXRhYmxlLS0keyBwcm9wcy5zZXBhcmF0b3IgfS1zZXBhcmF0b3JgXG4gICAgICArIChpc0RhcmsudmFsdWUgPT09IHRydWUgPyAnIHEtdGFibGUtLWRhcmsgcS10YWJsZV9fY2FyZC0tZGFyayBxLWRhcmsnIDogJycpXG4gICAgICArIChwcm9wcy5kZW5zZSA9PT0gdHJ1ZSA/ICcgcS10YWJsZS0tZGVuc2UnIDogJycpXG4gICAgICArIChwcm9wcy5mbGF0ID09PSB0cnVlID8gJyBxLXRhYmxlLS1mbGF0JyA6ICcnKVxuICAgICAgKyAocHJvcHMuYm9yZGVyZWQgPT09IHRydWUgPyAnIHEtdGFibGUtLWJvcmRlcmVkJyA6ICcnKVxuICAgICAgKyAocHJvcHMuc3F1YXJlID09PSB0cnVlID8gJyBxLXRhYmxlLS1zcXVhcmUnIDogJycpXG4gICAgICArIChwcm9wcy53cmFwQ2VsbHMgPT09IGZhbHNlID8gJyBxLXRhYmxlLS1uby13cmFwJyA6ICcnKVxuICAgIClcblxuICAgIHJldHVybiAoKSA9PiBoKCdkaXYnLCB7XG4gICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZVxuICAgIH0sIFtcbiAgICAgIGgoJ3RhYmxlJywgeyBjbGFzczogJ3EtdGFibGUnIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICAgIF0pXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBPcGVyYXRpb24gfSBmcm9tICdzaGFyZWQvbGliL3V0aWxzL29wZXJhdGlvbidcbmNvbnN0IG9wZXJhdGlvbiA9IG5ldyBPcGVyYXRpb24oKVxubGV0IG1ma2V5XG5cbmFzeW5jIGZ1bmN0aW9uIHN0YXJ0TWZrZXkoYXJncywgdGltZW91dFNlY29uZHMgPSAxNSkge1xuICBtZmtleSA9IG5ldyBXb3JrZXIobmV3IFVSTCgnLi9tZmtleS13b3JrZXIuanMnLCBpbXBvcnQubWV0YS51cmwpKVxuICBjb25zdCBzdGFydCA9IG9wZXJhdGlvbi5jcmVhdGUoXG4gICAgbWZrZXksXG4gICAgJ3N0YXJ0JyxcbiAgICBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGFyZ3MpKVxuICApXG4gIGNvbnN0IHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBvcGVyYXRpb24udGVybWluYXRlKHsgc3RhdHVzOiAwLCBlcnJvcjogJ2tpbGxlZCBvbiB0aW1lb3V0JyB9KVxuICAgIG1ma2V5LnRlcm1pbmF0ZSgpXG4gIH0sIHRpbWVvdXRTZWNvbmRzICogMTAwMClcbiAgbWZrZXkub25tZXNzYWdlID0gKGUpID0+IHtcbiAgICBpZiAoZS5kYXRhLm9wZXJhdGlvbiA9PT0gJ291dHB1dCcpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KVxuICAgICAgb3BlcmF0aW9uLnRlcm1pbmF0ZSh7IHN0YXR1czogMSwgZGF0YTogZS5kYXRhLmRhdGEgfSlcbiAgICAgIG1ma2V5LnRlcm1pbmF0ZSgpXG4gICAgfSBlbHNlIGlmIChlLmRhdGEub3BlcmF0aW9uID09PSAnZXJyb3InKSB7XG4gICAgICBvcGVyYXRpb24udGVybWluYXRlKHsgc3RhdHVzOiAwLCBlcnJvcjogZS5kYXRhLmRhdGEgfSlcbiAgICAgIG1ma2V5LnRlcm1pbmF0ZSgpXG4gICAgfVxuICB9XG4gIHJldHVybiBzdGFydFxufVxuXG5mdW5jdGlvbiBmb3JjZVN0b3BNZmtleSgpIHtcbiAgbWZrZXkudGVybWluYXRlKClcbiAgbWZrZXkgPSBudWxsXG59XG5cbmV4cG9ydCB7IHN0YXJ0TWZrZXksIGZvcmNlU3RvcE1ma2V5IH1cbiIsImltcG9ydCB7IHJlYWN0aXZlLCByZWYgfSBmcm9tICd2dWUnXG5pbXBvcnQgeyBkZWZpbmVTdG9yZSB9IGZyb20gJ3BpbmlhJ1xuXG5pbXBvcnQgeyBzdGFydE1ma2V5IH0gZnJvbSAnLi4vbGliL21ma2V5J1xuXG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICdzaGFyZWQvbGliL3V0aWxzL3VzZUxvZydcblxuY29uc3QgY29tcG9uZW50TmFtZSA9ICdOZmNTdG9yZSdcblxuZXhwb3J0IGNvbnN0IHVzZU5mY1N0b3JlID0gZGVmaW5lU3RvcmUoJ25mYycsICgpID0+IHtcbiAgY29uc3QgZmxhZ3MgPSByZWFjdGl2ZSh7XG4gICAgbWZrZXlGbGlwcGVySW5Qcm9ncmVzczogZmFsc2UsXG4gICAgbWZrZXlNYW51YWxJblByb2dyZXNzOiBmYWxzZVxuICB9KVxuXG4gIGNvbnN0IHRpbWVvdXRTZWNvbmRzID0gcmVmKDE1KVxuXG4gIGNvbnN0IG1ma2V5ID0gYXN5bmMgKGFyZ3M6IG9iamVjdCkgPT4ge1xuICAgIGxldCByZXN1bHQgPSAnJ1xuICAgIGlmIChhcmdzIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICBhcmdzID0gT2JqZWN0LnZhbHVlcyhhcmdzKVxuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSBhd2FpdCBzdGFydE1ma2V5KGFyZ3MsIHRpbWVvdXRTZWNvbmRzLnZhbHVlKVxuICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICBsb2dnZXIuZGVidWcoe1xuICAgICAgICAgIGNvbnRleHQ6IGNvbXBvbmVudE5hbWUsXG4gICAgICAgICAgbWVzc2FnZTogYGNyYWNrZWQgbm9uY2U6ICR7YXJnc30sIGtleTogJHtyZXN1bHR9YFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvckV2ZW50IHx8IGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgcmVzdWx0ID0gZXJyb3IubWVzc2FnZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0ID0gU3RyaW5nKGVycm9yKVxuICAgICAgfVxuICAgIH1cbiAgICBmbGFncy5tZmtleU1hbnVhbEluUHJvZ3Jlc3MgPSBmYWxzZVxuICAgIGlmIChyZXN1bHQuaW5jbHVkZXMoJ3RpbWVvdXQnKSkge1xuICAgICAgcmV0dXJuICd0aW1lb3V0J1xuICAgIH1cbiAgICBpZiAocmVzdWx0LnN0YXJ0c1dpdGgoJ0Vycm9yJykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihyZXN1bHQpXG4gICAgfVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZmxhZ3MsXG4gICAgdGltZW91dFNlY29uZHMsXG4gICAgbWZrZXlcbiAgfVxufSlcbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtY2FyZCBmbGF0PlxuICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInEtcHgtbm9uZVwiPlxuICAgICAgPGg2IGNsYXNzPVwiZnVsbC13aWR0aCB0ZXh0LWxlZnQgcS1tYS1ub25lXCI+Q3JhY2sgbm9uY2VzIG9uIEZsaXBwZXI8L2g2PlxuICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgPHEtY2FyZC1zZWN0aW9uIGNsYXNzPVwicS1weC1ub25lXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwicS1tYi1tZFwiPlxuICAgICAgICBDYXB0dXJlZCBub25jZXMgYXJlIHN0b3JlZCBpbiB0aGUgbG9nIGZpbGVcbiAgICAgICAgKDxjb2RlPi9leHQvbmZjLy5tZmtleTMyLmxvZzwvY29kZT4pLjxiciAvPlxuICAgICAgICBPbmNlIGRpc2NvdmVyZWQsIG5ldyBrZXlzIHdpbGwgYmUgYWRkZWQgdG8gdGhlIHVzZXIgZGljdGlvbmFyeSBmaWxlXG4gICAgICAgICg8Y29kZT4vZXh0L25mYy9hc3NldHMvbWZfY2xhc3NpY19kaWN0X3VzZXIubmZjPC9jb2RlPikuXG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXY+XG4gICAgICAgIFNvbWUgY3JhY2tzIG1heSB0YWtlIGxvbmdlciB0aGFuIGV4cGVjdGVkLiBUaW1lb3V0OlxuICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgIHYtbW9kZWwubnVtYmVyLnRyaW09XCJuZmNTdG9yZS50aW1lb3V0U2Vjb25kc1wiXG4gICAgICAgICAgQGtleXByZXNzPVwidXNlTnVtYmVyc09ubHlcIlxuICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgc3R5bGU9XCJ3aWR0aDogNDBweDsgZGlzcGxheTogaW5saW5lLWJsb2NrXCJcbiAgICAgICAgICBjbGFzcz1cInEtbWwtc21cIlxuICAgICAgICAvPlxuICAgICAgICBzZWNvbmRzLlxuICAgICAgPC9kaXY+XG4gICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICA8cS1jYXJkLXNlY3Rpb25cbiAgICAgIHYtaWY9XCJmbGlwcGVyU3RvcmUuZmxhZ3MuY29ubmVjdGVkICYmIGZsaXBwZXJTdG9yZS5ycGNBY3RpdmVcIlxuICAgICAgY2xhc3M9XCJjb2x1bW4gaXRlbXMtc3RhcnQgcS1weC1ub25lXCJcbiAgICA+XG4gICAgICA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktc3RhcnRcIj5cbiAgICAgICAgPHEtYnRuXG4gICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgICBsYWJlbD1cIkdpdmUgbWUgdGhlIGtleXNcIlxuICAgICAgICAgIDpsb2FkaW5nPVwibmZjU3RvcmUuZmxhZ3MubWZrZXlGbGlwcGVySW5Qcm9ncmVzc1wiXG4gICAgICAgICAgOmRpc2FibGU9XCJcbiAgICAgICAgICAgIG5mY1N0b3JlLmZsYWdzLm1ma2V5TWFudWFsSW5Qcm9ncmVzcyB8fFxuICAgICAgICAgICAgIWZsaXBwZXJTdG9yZS5pbmZvPy5zdG9yYWdlLnNkY2FyZD8uc3RhdHVzLmlzSW5zdGFsbGVkIHx8XG4gICAgICAgICAgICBub25jZXMubGVuZ3RoID09PSAwXG4gICAgICAgICAgXCJcbiAgICAgICAgICBAY2xpY2s9XCJtZmtleUZsaXBwZXJTdGFydFwiXG4gICAgICAgICAgdW5lbGV2YXRlZFxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgICA8c3BhblxuICAgICAgICB2LWlmPVwiXG4gICAgICAgICAgZmxpcHBlclN0b3JlLmluZm8/LmRvbmVSZWFkaW5nICYmXG4gICAgICAgICAgIWZsaXBwZXJTdG9yZS5pbmZvPy5zdG9yYWdlLnNkY2FyZD8uc3RhdHVzLmlzSW5zdGFsbGVkXG4gICAgICAgIFwiXG4gICAgICAgIGNsYXNzPVwicS1wdC1zbSB0ZXh0LXN1YnRpdGxlLTEgdGV4dC1uZWdhdGl2ZVwiXG4gICAgICA+XG4gICAgICAgIE1pY3JvU0QgY2FyZCBub3QgZGV0ZWN0ZWRcbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxkaXYgdi1pZj1cIm1ma2V5U3RhdHVzXCIgY2xhc3M9XCJxLXB0LXNtIHRleHQtc3VidGl0bGUtMSB0ZXh0LWNlbnRlclwiPlxuICAgICAgICB7eyBtZmtleVN0YXR1cyB9fVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktc3RhcnRcIj5cbiAgICAgICAgPHEtYnRuXG4gICAgICAgICAgdi1pZj1cIlxuICAgICAgICAgICAgKGZsaXBwZXJTdG9yZS5pbmZvPy5kb25lUmVhZGluZyAmJlxuICAgICAgICAgICAgICAhZmxpcHBlclN0b3JlLmluZm8/LnN0b3JhZ2Uuc2RjYXJkPy5zdGF0dXMuaXNJbnN0YWxsZWQpIHx8XG4gICAgICAgICAgICBub25jZXNOb3RGb3VuZFxuICAgICAgICAgIFwiXG4gICAgICAgICAgZmxhdFxuICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgaWNvbj1cIm1kaS1yZWxvYWRcIlxuICAgICAgICAgIGxhYmVsPVwiUmVmcmVzaFwiXG4gICAgICAgICAgQGNsaWNrPVwicmVhZE5vbmNlc1wiXG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgdi1pZj1cInVuaXF1ZUtleXMubGVuZ3RoIHx8IHRpbWVvdXRzLmxlbmd0aFwiIGNsYXNzPVwicS1tdC1zbVwiPlxuICAgICAgICA8dGVtcGxhdGUgdi1pZj1cInVuaXF1ZUtleXMubGVuZ3RoXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtYm9sZCBxLW10LW1kXCI+VW5pcXVlIGtleXM6PC9kaXY+XG4gICAgICAgICAgPGRpdj57eyB1bmlxdWVLZXlzLmpvaW4oJywgJykgfX08L2Rpdj5cbiAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgPHRlbXBsYXRlIHYtaWY9XCJ0aW1lb3V0cy5sZW5ndGhcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1ib2xkIHEtbXQtbWRcIj5UaW1lb3V0czo8L2Rpdj5cbiAgICAgICAgICA8cS1tYXJrdXAtdGFibGUgZmxhdCBkZW5zZT5cbiAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgIDx0aD5jdWlkPC90aD5cbiAgICAgICAgICAgICAgICA8dGg+bnQwPC90aD5cbiAgICAgICAgICAgICAgICA8dGg+bnIwPC90aD5cbiAgICAgICAgICAgICAgICA8dGg+YXIwPC90aD5cbiAgICAgICAgICAgICAgICA8dGg+bnQxPC90aD5cbiAgICAgICAgICAgICAgICA8dGg+bnIxPC90aD5cbiAgICAgICAgICAgICAgICA8dGg+YXIxPC90aD5cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LWZvcj1cIihhcmdzLCBpbmRleCkgaW4gdGltZW91dHNcIiA6a2V5PVwiaW5kZXhcIj5cbiAgICAgICAgICAgICAgICA8dHIgdi1pZj1cImFyZ3MubGVuZ3RoXCI+XG4gICAgICAgICAgICAgICAgICA8dGQgdi1mb3I9XCJhcmcgaW4gYXJnc1wiIDprZXk9XCJhcmdcIj57eyBhcmcgfX08L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDwvcS1tYXJrdXAtdGFibGU+XG4gICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICA8L2Rpdj5cbiAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgIDxxLWNhcmQtc2VjdGlvbiB2LWVsc2UgY2xhc3M9XCJyb3cganVzdGlmeS1zdGFydCBxLXB4LW5vbmVcIj5cbiAgICAgIDx0ZW1wbGF0ZSB2LWlmPVwiZmxpcHBlclN0b3JlLmlzRWxlY3Ryb25cIj5cbiAgICAgICAgPHA+UGx1ZyBpbiB5b3VyIEZsaXBwZXIgYW5kIGFuZCB3YWl0IGZvciBpbml0aWFsaXphdGlvbjwvcD5cbiAgICAgIDwvdGVtcGxhdGU+XG4gICAgICA8dGVtcGxhdGUgdi1lbHNlPlxuICAgICAgICA8RmxpcHBlckNvbm5lY3RXZWJCdG4gLz5cbiAgICAgIDwvdGVtcGxhdGU+XG4gICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgPC9xLWNhcmQ+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHsgcmVmLCBvbk1vdW50ZWQsIHdhdGNoIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICdzaGFyZWQvbGliL3V0aWxzL3VzZUxvZydcbmltcG9ydCB7IHJwY0Vycm9ySGFuZGxlciB9IGZyb20gJ3NoYXJlZC9saWIvdXRpbHMvdXNlUnBjVXRpbHMnXG5cbmltcG9ydCB7IEZsaXBwZXJDb25uZWN0V2ViQnRuIH0gZnJvbSAnZmVhdHVyZXMvRmxpcHBlcidcblxuaW1wb3J0IHsgRmxpcHBlck1vZGVsIH0gZnJvbSAnZW50aXR5L0ZsaXBwZXInXG5jb25zdCBmbGlwcGVyU3RvcmUgPSBGbGlwcGVyTW9kZWwudXNlRmxpcHBlclN0b3JlKClcblxuaW1wb3J0IHsgTmZjTW9kZWwgfSBmcm9tICdlbnRpdHkvTmZjJ1xuY29uc3QgbmZjU3RvcmUgPSBOZmNNb2RlbC51c2VOZmNTdG9yZSgpXG5pbXBvcnQgeyB1c2VOdW1iZXJzT25seSB9IGZyb20gJ3NoYXJlZC9saWIvdXRpbHMvdXNlTnVtYmVyT25seSdcblxuY29uc3QgY29tcG9uZW50TmFtZSA9ICdOZmNBdHRhY2snXG5cbmNvbnN0IG1ma2V5U3RhdHVzID0gcmVmKCcnKVxuXG5jb25zdCBub25jZXMgPSByZWY8c3RyaW5nW10+KFtdKVxuY29uc3Qgbm9uY2VzTm90Rm91bmQgPSByZWYoZmFsc2UpXG5jb25zdCByZWFkTm9uY2VzID0gYXN5bmMgKCkgPT4ge1xuICBuZmNTdG9yZS5mbGFncy5tZmtleUZsaXBwZXJJblByb2dyZXNzID0gdHJ1ZVxuICBub25jZXNOb3RGb3VuZC52YWx1ZSA9IGZhbHNlXG4gIG1ma2V5U3RhdHVzLnZhbHVlID0gJydcblxuICBpZiAoIWZsaXBwZXJTdG9yZS5pbmZvPy5zdG9yYWdlLnNkY2FyZD8uc3RhdHVzLmlzSW5zdGFsbGVkKSB7XG4gICAgZmxpcHBlclN0b3JlLmRpYWxvZ3MubWljcm9TRGNhcmRNaXNzaW5nID0gdHJ1ZVxuICAgIHJldHVyblxuICB9XG5cbiAgY29uc3QgcmVzID0gYXdhaXQgZmxpcHBlclN0b3JlLmZsaXBwZXJcbiAgICA/LlJQQygnc3RvcmFnZVJlYWQnLCB7IHBhdGg6ICcvZXh0L25mYy8ubWZrZXkzMi5sb2cnIH0pXG4gICAgLnRoZW4oKHZhbHVlOiBVaW50OEFycmF5KSA9PiB7XG4gICAgICBsb2dnZXIuZGVidWcoe1xuICAgICAgICBjb250ZXh0OiBjb21wb25lbnROYW1lLFxuICAgICAgICBtZXNzYWdlOiAnc3RvcmFnZVJlYWQ6IC9leHQvbmZjLy5tZmtleTMyLmxvZydcbiAgICAgIH0pXG5cbiAgICAgIHJldHVybiB2YWx1ZVxuICAgIH0pXG4gICAgLmNhdGNoKChlcnJvcjogRXJyb3IpID0+IHtcbiAgICAgIGlmIChlcnJvci50b1N0cmluZygpICE9PSAnRVJST1JfU1RPUkFHRV9OT1RfRVhJU1QnKSB7XG4gICAgICAgIHJwY0Vycm9ySGFuZGxlcih7XG4gICAgICAgICAgY29tcG9uZW50TmFtZSxcbiAgICAgICAgICBlcnJvcixcbiAgICAgICAgICBjb21tYW5kOiAnc3RvcmFnZVJlYWQ6IC9leHQvbmZjLy5tZmtleTMyLmxvZydcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxvZ2dlci53YXJuKHtcbiAgICAgICAgICBjb250ZXh0OiBjb21wb25lbnROYW1lLFxuICAgICAgICAgIG1lc3NhZ2U6IGBzdG9yYWdlUmVhZDogL2V4dC9uZmMvLm1ma2V5MzIubG9nOiAke2Vycm9yLnRvU3RyaW5nKCl9YFxuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICBub25jZXNOb3RGb3VuZC52YWx1ZSA9IHRydWVcbiAgICAgIG1ma2V5U3RhdHVzLnZhbHVlID0gJ01ma2V5IGxvZyBmaWxlIG5vdCBmb3VuZCdcbiAgICB9KVxuICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgIG5mY1N0b3JlLmZsYWdzLm1ma2V5RmxpcHBlckluUHJvZ3Jlc3MgPSBmYWxzZVxuICAgIH0pXG5cbiAgaWYgKCFyZXMpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIG5vbmNlcy52YWx1ZSA9IG5ldyBUZXh0RGVjb2RlcigpLmRlY29kZShyZXMpLnNwbGl0KCdcXG4nKVxuICBpZiAobm9uY2VzLnZhbHVlW25vbmNlcy52YWx1ZS5sZW5ndGggLSAxXSEubGVuZ3RoID09PSAwKSB7XG4gICAgbm9uY2VzLnZhbHVlLnBvcCgpXG4gIH1cblxuICBpZiAobm9uY2VzLnZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZsaXBwZXJTdG9yZS5mbGlwcGVyXG4gICAgICA/LlJQQygnc3RvcmFnZVN0YXQnLCB7IHBhdGg6ICcvZXh0L25mYy8ubWZrZXkzMi5sb2cnIH0pXG4gICAgICAuY2F0Y2goKGVycm9yOiBvYmplY3QpID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcilcbiAgICAgIH0pXG4gICAgaWYgKHJlcyAmJiByZXMuc2l6ZSkge1xuICAgICAgbWZrZXlTdGF0dXMudmFsdWUgPSAnTm8gbm9uY2VzIGZvdW5kIGluIGxvZyBmaWxlJ1xuICAgIH0gZWxzZSB7XG4gICAgICBtZmtleVN0YXR1cy52YWx1ZSA9ICdMb2cgZmlsZSBub3QgZm91bmQnXG4gICAgfVxuICAgIG5vbmNlc05vdEZvdW5kLnZhbHVlID0gdHJ1ZVxuICB9XG59XG5vbk1vdW50ZWQoYXN5bmMgKCkgPT4ge1xuICBpZiAoZmxpcHBlclN0b3JlLmZsaXBwZXJSZWFkeSkge1xuICAgIGlmICghZmxpcHBlclN0b3JlLnJwY0FjdGl2ZSkge1xuICAgICAgYXdhaXQgZmxpcHBlclN0b3JlLmZsaXBwZXI/LnN0YXJ0UlBDU2Vzc2lvbigpXG4gICAgfVxuXG4gICAgaWYgKGZsaXBwZXJTdG9yZS5ycGNBY3RpdmUpIHtcbiAgICAgIGlmICghZmxpcHBlclN0b3JlLmluZm8pIHtcbiAgICAgICAgYXdhaXQgZmxpcHBlclN0b3JlLmZsaXBwZXI/LmdldEluZm8oKVxuICAgICAgfVxuXG4gICAgICBhd2FpdCByZWFkTm9uY2VzKClcbiAgICB9XG4gIH1cbn0pXG53YXRjaChcbiAgKCkgPT4gZmxpcHBlclN0b3JlLmZsaXBwZXI/LmZsaXBwZXJSZWFkeSxcbiAgYXN5bmMgKG5ld1ZhbHVlKSA9PiB7XG4gICAgaWYgKG5ld1ZhbHVlKSB7XG4gICAgICByZWFkTm9uY2VzKClcbiAgICB9XG4gIH1cbilcblxuY29uc3QgdGltZW91dHMgPSByZWY8c3RyaW5nW11bXT4oW10pXG5jb25zdCB1bmlxdWVLZXlzID0gcmVmPHN0cmluZ1tdPihbXSlcbmNvbnN0IG1ma2V5RmxpcHBlclN0YXJ0ID0gYXN5bmMgKCkgPT4ge1xuICB0aW1lb3V0cy52YWx1ZSA9IFtdXG4gIG5mY1N0b3JlLmZsYWdzLm1ma2V5RmxpcHBlckluUHJvZ3Jlc3MgPSB0cnVlXG4gIG1ma2V5U3RhdHVzLnZhbHVlID0gJ0xvYWRpbmcgbG9nJ1xuXG4gIGNvbnN0IGtleXMgPSBuZXcgU2V0PHN0cmluZz4oKVxuICBjb25zdCBlcnJvcnMgPSBbXVxuICBmb3IgKGxldCBpID0gMDsgaSA8IG5vbmNlcy52YWx1ZS5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGFyZ3MgPSBub25jZXMudmFsdWVbaV0hLnNsaWNlKG5vbmNlcy52YWx1ZVtpXSEuaW5kZXhPZignY3VpZCcpKVxuICAgICAgLnNwbGl0KCcgJylcbiAgICAgIC5maWx0ZXIoKGUsIGkpID0+IGkgJSAyID09PSAxKVxuICAgIG1ma2V5U3RhdHVzLnZhbHVlID0gYENyYWNraW5nIG5vbmNlICR7aSArIDF9IG9mICR7bm9uY2VzLnZhbHVlLmxlbmd0aH1gXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGtleSA9IGF3YWl0IG5mY1N0b3JlLm1ma2V5KGFyZ3MpXG4gICAgICBpZiAoa2V5ID09PSAndGltZW91dCcpIHtcbiAgICAgICAgdGltZW91dHMudmFsdWUucHVzaChhcmdzKVxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuICAgICAgaWYgKCFrZXkuc3RhcnRzV2l0aCgnRXJyb3InKSAmJiAha2V5LmluY2x1ZGVzKCcgJykpIHtcbiAgICAgICAga2V5cy5hZGQoa2V5KVxuICAgICAgICB1bmlxdWVLZXlzLnZhbHVlID0gQXJyYXkuZnJvbShrZXlzKVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvckV2ZW50IHx8IGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgZXJyb3IgPSBlcnJvci5tZXNzYWdlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlcnJvciA9IFN0cmluZyhlcnJvcilcbiAgICAgIH1cbiAgICAgIGVycm9ycy5wdXNoKGVycm9yKVxuICAgICAgbG9nZ2VyLmVycm9yKHtcbiAgICAgICAgY29udGV4dDogY29tcG9uZW50TmFtZSxcbiAgICAgICAgbWVzc2FnZTogYGVycm9yIGluIG1ma2V5MzJ2MjogJHtlcnJvcn0gKGFyZ3M6ICR7YXJnc30pYFxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBtZmtleVN0YXR1cy52YWx1ZSA9ICdMb2FkaW5nIHVzZXIgZGljdGlvbmFyeSdcbiAgY29uc3QgcmVzID0gYXdhaXQgZmxpcHBlclN0b3JlLmZsaXBwZXJcbiAgICA/LlJQQygnc3RvcmFnZVJlYWQnLCB7IHBhdGg6ICcvZXh0L25mYy9hc3NldHMvbWZfY2xhc3NpY19kaWN0X3VzZXIubmZjJyB9KVxuICAgIC5jYXRjaCgoZXJyb3I6IEVycm9yKSA9PlxuICAgICAgcnBjRXJyb3JIYW5kbGVyKHsgY29tcG9uZW50TmFtZSwgZXJyb3IsIGNvbW1hbmQ6ICdzdG9yYWdlUmVhZCcgfSlcbiAgICApXG4gICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgbG9nZ2VyLmRlYnVnKHtcbiAgICAgICAgY29udGV4dDogY29tcG9uZW50TmFtZSxcbiAgICAgICAgbWVzc2FnZTogJ3N0b3JhZ2VSZWFkOiAvZXh0L25mYy9hc3NldHMvbWZfY2xhc3NpY19kaWN0X3VzZXIubmZjJ1xuICAgICAgfSlcbiAgICB9KVxuXG4gIGxldCBkaWN0aW9uYXJ5OiBzdHJpbmdbXSB8IFNldDxzdHJpbmc+ID0gW11cbiAgaWYgKHJlcykge1xuICAgIG1ma2V5U3RhdHVzLnZhbHVlID0gJ1Byb2Nlc3NpbmcgdXNlciBkaWN0aW9uYXJ5J1xuICAgIGRpY3Rpb25hcnkgPSBuZXcgVGV4dERlY29kZXIoKS5kZWNvZGUocmVzKS5zcGxpdCgnXFxuJylcbiAgICBpZiAoZGljdGlvbmFyeVtkaWN0aW9uYXJ5Lmxlbmd0aCAtIDFdIS5sZW5ndGggPT09IDApIHtcbiAgICAgIGRpY3Rpb25hcnkucG9wKClcbiAgICB9XG4gIH1cblxuICBkaWN0aW9uYXJ5ID0gZGljdGlvbmFyeS5maWx0ZXIoXG4gICAgKGUpID0+IGUgIT09ICdFcnJvcjogbWZrZXkgcnVuIGtpbGxlZCBvbiB0aW1lb3V0J1xuICApXG4gIGRpY3Rpb25hcnkgPSBuZXcgU2V0KGRpY3Rpb25hcnkpXG4gIGNvbnN0IG9sZERpY3RMZW5ndGggPSBBcnJheS5mcm9tKGRpY3Rpb25hcnkpLmxlbmd0aFxuICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgZGljdGlvbmFyeS5hZGQoa2V5KVxuICB9XG5cbiAgbWZrZXlTdGF0dXMudmFsdWUgPSAnVXBsb2FkaW5nIHVzZXIgZGljdGlvbmFyeSdcbiAgY29uc3QgZmlsZSA9IG5ldyBUZXh0RW5jb2RlcigpLmVuY29kZShBcnJheS5mcm9tKGRpY3Rpb25hcnkpLmpvaW4oJ1xcbicpKVxuICBjb25zdCBwYXRoID0gJy9leHQvbmZjL2Fzc2V0cy9tZl9jbGFzc2ljX2RpY3RfdXNlci5uZmMnXG4gIGF3YWl0IGZsaXBwZXJTdG9yZS5mbGlwcGVyXG4gICAgPy5SUEMoJ3N0b3JhZ2VXcml0ZScsIHsgcGF0aCwgYnVmZmVyOiBmaWxlLmJ1ZmZlciB9KVxuICAgIC5jYXRjaCgoZXJyb3I6IEVycm9yKSA9PlxuICAgICAgcnBjRXJyb3JIYW5kbGVyKHsgY29tcG9uZW50TmFtZSwgZXJyb3IsIGNvbW1hbmQ6ICdzdG9yYWdlV3JpdGUnIH0pXG4gICAgKVxuICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgIGxvZ2dlci5kZWJ1Zyh7XG4gICAgICAgIGNvbnRleHQ6IGNvbXBvbmVudE5hbWUsXG4gICAgICAgIG1lc3NhZ2U6IGBzdG9yYWdlLndyaXRlOiAke3BhdGh9YFxuICAgICAgfSlcbiAgICB9KVxuXG4gIG1ma2V5U3RhdHVzLnZhbHVlID0gYE5vbmNlczogJHtub25jZXMudmFsdWUubGVuZ3RofSB8IFVuaXF1ZSBrZXlzOiAke1xuICAgIHVuaXF1ZUtleXMudmFsdWUubGVuZ3RoXG4gIH0gfCBOZXcga2V5czogJHtBcnJheS5mcm9tKGRpY3Rpb25hcnkpLmxlbmd0aCAtIG9sZERpY3RMZW5ndGh9YFxuICBpZiAoZXJyb3JzLmxlbmd0aCA+IDApIHtcbiAgICBtZmtleVN0YXR1cy52YWx1ZSArPSBgIHwgRXJyb3JzOiAke2Vycm9ycy5sZW5ndGh9IChjaGVjayBsb2dzIGZvciBkZXRhaWxzKWBcbiAgfVxuICBpZiAodGltZW91dHMudmFsdWUubGVuZ3RoID4gMCkge1xuICAgIG1ma2V5U3RhdHVzLnZhbHVlICs9IGAgfCBUaW1lb3V0czogJHt0aW1lb3V0cy52YWx1ZS5sZW5ndGh9YFxuICB9XG5cbiAgbmZjU3RvcmUuZmxhZ3MubWZrZXlGbGlwcGVySW5Qcm9ncmVzcyA9IGZhbHNlXG59XG48L3NjcmlwdD5cbiIsImltcG9ydCB7IGgsIHJlZiwgb25BY3RpdmF0ZWQsIG9uRGVhY3RpdmF0ZWQsIG9uTW91bnRlZCwgZ2V0Q3VycmVudEluc3RhbmNlLCBuZXh0VGljaywgcHJvdmlkZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgc3RvcEFuZFByZXZlbnQgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC9ldmVudC5qcydcbmltcG9ydCB7IGFkZEZvY3VzRm4gfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmZvY3VzL2ZvY3VzLW1hbmFnZXIuanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcbmltcG9ydCB7IGZvcm1LZXkgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnN5bWJvbHMvc3ltYm9scy5qcydcbmltcG9ydCB7IHZtSXNEZXN0cm95ZWQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnZtL3ZtLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUZvcm0nLFxuXG4gIHByb3BzOiB7XG4gICAgYXV0b2ZvY3VzOiBCb29sZWFuLFxuICAgIG5vRXJyb3JGb2N1czogQm9vbGVhbixcbiAgICBub1Jlc2V0Rm9jdXM6IEJvb2xlYW4sXG4gICAgZ3JlZWR5OiBCb29sZWFuLFxuXG4gICAgb25TdWJtaXQ6IEZ1bmN0aW9uXG4gIH0sXG5cbiAgZW1pdHM6IFsgJ3Jlc2V0JywgJ3ZhbGlkYXRpb25TdWNjZXNzJywgJ3ZhbGlkYXRpb25FcnJvcicgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCByb290UmVmID0gcmVmKG51bGwpXG5cbiAgICBsZXQgdmFsaWRhdGVJbmRleCA9IDBcbiAgICBjb25zdCByZWdpc3RlcmVkQ29tcG9uZW50cyA9IFtdXG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZSAoc2hvdWxkRm9jdXMpIHtcbiAgICAgIGNvbnN0IGZvY3VzID0gdHlwZW9mIHNob3VsZEZvY3VzID09PSAnYm9vbGVhbidcbiAgICAgICAgPyBzaG91bGRGb2N1c1xuICAgICAgICA6IHByb3BzLm5vRXJyb3JGb2N1cyAhPT0gdHJ1ZVxuXG4gICAgICBjb25zdCBpbmRleCA9ICsrdmFsaWRhdGVJbmRleFxuXG4gICAgICBjb25zdCBlbWl0RXZlbnQgPSAocmVzLCByZWYpID0+IHtcbiAgICAgICAgZW1pdChgdmFsaWRhdGlvbiR7IHJlcyA9PT0gdHJ1ZSA/ICdTdWNjZXNzJyA6ICdFcnJvcicgfWAsIHJlZilcbiAgICAgIH1cblxuICAgICAgY29uc3QgdmFsaWRhdGVDb21wb25lbnQgPSBjb21wID0+IHtcbiAgICAgICAgY29uc3QgdmFsaWQgPSBjb21wLnZhbGlkYXRlKClcblxuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbGlkLnRoZW4gPT09ICdmdW5jdGlvbidcbiAgICAgICAgICA/IHZhbGlkLnRoZW4oXG4gICAgICAgICAgICB2YWxpZCA9PiAoeyB2YWxpZCwgY29tcCB9KSxcbiAgICAgICAgICAgIGVyciA9PiAoeyB2YWxpZDogZmFsc2UsIGNvbXAsIGVyciB9KVxuICAgICAgICAgIClcbiAgICAgICAgICA6IFByb21pc2UucmVzb2x2ZSh7IHZhbGlkLCBjb21wIH0pXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGVycm9yc1Byb21pc2UgPSBwcm9wcy5ncmVlZHkgPT09IHRydWVcbiAgICAgICAgPyBQcm9taXNlXG4gICAgICAgICAgLmFsbChyZWdpc3RlcmVkQ29tcG9uZW50cy5tYXAodmFsaWRhdGVDb21wb25lbnQpKVxuICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZmlsdGVyKHIgPT4gci52YWxpZCAhPT0gdHJ1ZSkpXG4gICAgICAgIDogcmVnaXN0ZXJlZENvbXBvbmVudHNcbiAgICAgICAgICAucmVkdWNlKFxuICAgICAgICAgICAgKGFjYywgY29tcCkgPT4gYWNjLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gdmFsaWRhdGVDb21wb25lbnQoY29tcCkudGhlbihyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoci52YWxpZCA9PT0gZmFsc2UpIHsgcmV0dXJuIFByb21pc2UucmVqZWN0KHIpIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKClcbiAgICAgICAgICApXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IFsgZXJyb3IgXSlcblxuICAgICAgcmV0dXJuIGVycm9yc1Byb21pc2UudGhlbihlcnJvcnMgPT4ge1xuICAgICAgICBpZiAoZXJyb3JzID09PSB2b2lkIDAgfHwgZXJyb3JzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIGluZGV4ID09PSB2YWxpZGF0ZUluZGV4ICYmIGVtaXRFdmVudCh0cnVlKVxuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBub3Qgb3V0ZGF0ZWQgYWxyZWFkeVxuICAgICAgICBpZiAoaW5kZXggPT09IHZhbGlkYXRlSW5kZXgpIHtcbiAgICAgICAgICBjb25zdCB7IGNvbXAsIGVyciB9ID0gZXJyb3JzWyAwIF1cblxuICAgICAgICAgIGVyciAhPT0gdm9pZCAwICYmIGNvbnNvbGUuZXJyb3IoZXJyKVxuICAgICAgICAgIGVtaXRFdmVudChmYWxzZSwgY29tcClcblxuICAgICAgICAgIGlmIChmb2N1cyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgLy8gVHJ5IHRvIGZvY3VzIGZpcnN0IG1vdW50ZWQgYW5kIGFjdGl2ZSBjb21wb25lbnRcbiAgICAgICAgICAgIGNvbnN0IGFjdGl2ZUVycm9yID0gZXJyb3JzLmZpbmQoKHsgY29tcCB9KSA9PiAoXG4gICAgICAgICAgICAgIHR5cGVvZiBjb21wLmZvY3VzID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICAgICYmIHZtSXNEZXN0cm95ZWQoY29tcC4kKSA9PT0gZmFsc2VcbiAgICAgICAgICAgICkpXG5cbiAgICAgICAgICAgIGlmIChhY3RpdmVFcnJvciAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgIGFjdGl2ZUVycm9yLmNvbXAuZm9jdXMoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNldFZhbGlkYXRpb24gKCkge1xuICAgICAgdmFsaWRhdGVJbmRleCsrXG5cbiAgICAgIHJlZ2lzdGVyZWRDb21wb25lbnRzLmZvckVhY2goY29tcCA9PiB7XG4gICAgICAgIHR5cGVvZiBjb21wLnJlc2V0VmFsaWRhdGlvbiA9PT0gJ2Z1bmN0aW9uJyAmJiBjb21wLnJlc2V0VmFsaWRhdGlvbigpXG4gICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN1Ym1pdCAoZXZ0KSB7XG4gICAgICBldnQgIT09IHZvaWQgMCAmJiBzdG9wQW5kUHJldmVudChldnQpXG5cbiAgICAgIGNvbnN0IGluZGV4ID0gdmFsaWRhdGVJbmRleCArIDFcblxuICAgICAgdmFsaWRhdGUoKS50aGVuKHZhbCA9PiB7XG4gICAgICAgIC8vIGlmIG5vdCBvdXRkYXRlZCAmJiB2YWxpZGF0aW9uIHN1Y2NlZWRlZFxuICAgICAgICBpZiAoaW5kZXggPT09IHZhbGlkYXRlSW5kZXggJiYgdmFsID09PSB0cnVlKSB7XG4gICAgICAgICAgaWYgKHByb3BzLm9uU3VibWl0ICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgIGVtaXQoJ3N1Ym1pdCcsIGV2dClcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAoZXZ0Py50YXJnZXQgIT09IHZvaWQgMCAmJiB0eXBlb2YgZXZ0LnRhcmdldC5zdWJtaXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2dC50YXJnZXQuc3VibWl0KClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzZXQgKGV2dCkge1xuICAgICAgZXZ0ICE9PSB2b2lkIDAgJiYgc3RvcEFuZFByZXZlbnQoZXZ0KVxuXG4gICAgICBlbWl0KCdyZXNldCcpXG5cbiAgICAgIG5leHRUaWNrKCgpID0+IHsgLy8gYWxsb3cgdXNlcmxhbmQgdG8gcmVzZXQgdmFsdWVzIGJlZm9yZVxuICAgICAgICByZXNldFZhbGlkYXRpb24oKVxuICAgICAgICBpZiAocHJvcHMuYXV0b2ZvY3VzID09PSB0cnVlICYmIHByb3BzLm5vUmVzZXRGb2N1cyAhPT0gdHJ1ZSkge1xuICAgICAgICAgIGZvY3VzKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb2N1cyAoKSB7XG4gICAgICBhZGRGb2N1c0ZuKCgpID0+IHtcbiAgICAgICAgaWYgKHJvb3RSZWYudmFsdWUgPT09IG51bGwpIHJldHVyblxuXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHJvb3RSZWYudmFsdWUucXVlcnlTZWxlY3RvcignW2F1dG9mb2N1c11bdGFiaW5kZXhdLCBbZGF0YS1hdXRvZm9jdXNdW3RhYmluZGV4XScpXG4gICAgICAgICAgfHwgcm9vdFJlZi52YWx1ZS5xdWVyeVNlbGVjdG9yKCdbYXV0b2ZvY3VzXSBbdGFiaW5kZXhdLCBbZGF0YS1hdXRvZm9jdXNdIFt0YWJpbmRleF0nKVxuICAgICAgICAgIHx8IHJvb3RSZWYudmFsdWUucXVlcnlTZWxlY3RvcignW2F1dG9mb2N1c10sIFtkYXRhLWF1dG9mb2N1c10nKVxuICAgICAgICAgIHx8IEFycmF5LnByb3RvdHlwZS5maW5kLmNhbGwocm9vdFJlZi52YWx1ZS5xdWVyeVNlbGVjdG9yQWxsKCdbdGFiaW5kZXhdJyksIGVsID0+IGVsLnRhYkluZGV4ICE9PSAtMSlcblxuICAgICAgICB0YXJnZXQ/LmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBwcm92aWRlKGZvcm1LZXksIHtcbiAgICAgIGJpbmRDb21wb25lbnQgKHZtUHJveHkpIHtcbiAgICAgICAgcmVnaXN0ZXJlZENvbXBvbmVudHMucHVzaCh2bVByb3h5KVxuICAgICAgfSxcblxuICAgICAgdW5iaW5kQ29tcG9uZW50ICh2bVByb3h5KSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gcmVnaXN0ZXJlZENvbXBvbmVudHMuaW5kZXhPZih2bVByb3h5KVxuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgcmVnaXN0ZXJlZENvbXBvbmVudHMuc3BsaWNlKGluZGV4LCAxKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcblxuICAgIGxldCBzaG91bGRBY3RpdmF0ZSA9IGZhbHNlXG5cbiAgICBvbkRlYWN0aXZhdGVkKCgpID0+IHtcbiAgICAgIHNob3VsZEFjdGl2YXRlID0gdHJ1ZVxuICAgIH0pXG5cbiAgICBvbkFjdGl2YXRlZCgoKSA9PiB7XG4gICAgICBzaG91bGRBY3RpdmF0ZSA9PT0gdHJ1ZSAmJiBwcm9wcy5hdXRvZm9jdXMgPT09IHRydWUgJiYgZm9jdXMoKVxuICAgIH0pXG5cbiAgICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgICAgcHJvcHMuYXV0b2ZvY3VzID09PSB0cnVlICYmIGZvY3VzKClcbiAgICB9KVxuXG4gICAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gICAgT2JqZWN0LmFzc2lnbih2bS5wcm94eSwge1xuICAgICAgdmFsaWRhdGUsXG4gICAgICByZXNldFZhbGlkYXRpb24sXG4gICAgICBzdWJtaXQsXG4gICAgICByZXNldCxcbiAgICAgIGZvY3VzLFxuICAgICAgZ2V0VmFsaWRhdGlvbkNvbXBvbmVudHM6ICgpID0+IHJlZ2lzdGVyZWRDb21wb25lbnRzXG4gICAgfSlcblxuICAgIHJldHVybiAoKSA9PiBoKCdmb3JtJywge1xuICAgICAgY2xhc3M6ICdxLWZvcm0nLFxuICAgICAgcmVmOiByb290UmVmLFxuICAgICAgb25TdWJtaXQ6IHN1Ym1pdCxcbiAgICAgIG9uUmVzZXQ6IHJlc2V0XG4gICAgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gIH1cbn0pXG4iLCI8dGVtcGxhdGU+XG4gIDxxLWNhcmQgZmxhdD5cbiAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJxLXB4LW5vbmVcIj5cbiAgICAgIDxoNiBjbGFzcz1cImZ1bGwtd2lkdGggdGV4dC1sZWZ0IHEtbWEtbm9uZVwiPkVudGVyIHRoZSBub25jZSBtYW51YWxseTwvaDY+XG4gICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJxLXB4LW5vbmVcIj5cbiAgICAgIDxxLWZvcm0gQHN1Ym1pdD1cIm1ma2V5TWFudWFsU3RhcnRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZsZXggcS1ndXR0ZXItbWQgYXJncy1pbnB1dHMtY29udGFpbmVyXCI+XG4gICAgICAgICAgPHEtaW5wdXQgdi1tb2RlbD1cImFyZ3MuY3VpZFwiIGxhYmVsPVwiY3VpZFwiIC8+XG4gICAgICAgICAgPHEtaW5wdXQgdi1tb2RlbD1cImFyZ3MubnQwXCIgbGFiZWw9XCJudDBcIiAvPlxuICAgICAgICAgIDxxLWlucHV0IHYtbW9kZWw9XCJhcmdzLm5yMFwiIGxhYmVsPVwibnIwXCIgLz5cbiAgICAgICAgICA8cS1pbnB1dCB2LW1vZGVsPVwiYXJncy5hcjBcIiBsYWJlbD1cImFyMFwiIC8+XG4gICAgICAgICAgPHEtaW5wdXQgdi1tb2RlbD1cImFyZ3MubnQxXCIgbGFiZWw9XCJudDFcIiAvPlxuICAgICAgICAgIDxxLWlucHV0IHYtbW9kZWw9XCJhcmdzLm5yMVwiIGxhYmVsPVwibnIxXCIgLz5cbiAgICAgICAgICA8cS1pbnB1dCB2LW1vZGVsPVwiYXJncy5hcjFcIiBsYWJlbD1cImFyMVwiIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktc3RhcnQgcS1tdC1sZ1wiPlxuICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXG4gICAgICAgICAgICBjb2xvcj1cInByaW1hcnlcIlxuICAgICAgICAgICAgOmxvYWRpbmc9XCJuZmNTdG9yZS5mbGFncy5tZmtleU1hbnVhbEluUHJvZ3Jlc3NcIlxuICAgICAgICAgICAgOmRpc2FibGU9XCJuZmNTdG9yZS5mbGFncy5tZmtleUZsaXBwZXJJblByb2dyZXNzXCJcbiAgICAgICAgICAgIGxhYmVsPVwiUnVuIG1ma2V5MzJcIlxuICAgICAgICAgICAgdW5lbGV2YXRlZFxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9xLWZvcm0+XG4gICAgICA8ZGl2IHYtaWY9XCJyZXN1bHRcIiBjbGFzcz1cInEtcHQtbGdcIj5cbiAgICAgICAgPHNwYW4gdi1pZj1cIiFyZXN1bHQuc3RhcnRzV2l0aCgnRXJyb3InKVwiIGNsYXNzPVwidGV4dC1zdWJ0aXRsZTEgcS1tci1zbVwiXG4gICAgICAgICAgPktleTo8L3NwYW5cbiAgICAgICAgPlxuICAgICAgICA8Yj57eyByZXN1bHQgfX08L2I+XG4gICAgICA8L2Rpdj5cbiAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICA8L3EtY2FyZD5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgeyByZWYgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IE5mY01vZGVsIH0gZnJvbSAnZW50aXR5L05mYydcbmNvbnN0IG5mY1N0b3JlID0gTmZjTW9kZWwudXNlTmZjU3RvcmUoKVxuXG5jb25zdCBhcmdzID0gcmVmKHtcbiAgY3VpZDogJzJhMjM0ZjgwJyxcbiAgbnQwOiAnNTU3MjE4MDknLFxuICBucjA6ICdjZTk5ODVmNicsXG4gIGFyMDogJzc3MmY1NWJlJyxcbiAgbnQxOiAnYTI3MTczZjInLFxuICBucjE6ICdlMzg2YjUwNScsXG4gIGFyMTogJzVmYTY1MjAzJ1xufSlcblxuY29uc3QgcmVzdWx0ID0gcmVmPHN0cmluZz4oKVxuY29uc3QgbWZrZXlNYW51YWxTdGFydCA9IGFzeW5jIChlOiBFdmVudCB8IFN1Ym1pdEV2ZW50KSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKVxuICBuZmNTdG9yZS5mbGFncy5tZmtleU1hbnVhbEluUHJvZ3Jlc3MgPSB0cnVlXG4gIHJlc3VsdC52YWx1ZSA9IGF3YWl0IG5mY1N0b3JlLm1ma2V5KGFyZ3MudmFsdWUpXG59XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzYXNzXCIgc2NvcGVkPlxuLmFyZ3MtaW5wdXRzLWNvbnRhaW5lciAucS1maWVsZFxuICBtaW4td2lkdGg6IDcwcHhcbiAgbWF4LXdpZHRoOiAxMTVweFxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cImNvbHVtbiBpdGVtcy1zdGFydFwiPlxuICAgIDxOZmNBdHRhY2sgY2xhc3M9XCJxLW1iLWxnXCIgLz5cbiAgICA8TmZjTWFudWFsbHkgLz5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHsgTmZjQXR0YWNrIH0gZnJvbSAnZmVhdHVyZXMvTmZjL0F0dGFjaydcbmltcG9ydCB7IE5mY01hbnVhbGx5IH0gZnJvbSAnZmVhdHVyZXMvTmZjL01hbnVhbGx5J1xuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gIDxHZW5lcmljUGFnZUxheW91dFxuICAgIHRpdGxlPVwiTWZrZXkzMlwiXG4gICAgaWNvbj1cImZsaXBwZXI6bmZjXCJcbiAgICBkZXNjcmlwdGlvbj1cIlJldHJlaXZlIE1GIENsYXNzaWMga2V5cyBmcm9tIGdhdGhlcmVkIG5vbmNlcyB1c2luZyB0aGUgbWZrZXkzMiBhdHRhY2tcIlxuICA+XG4gICAgPE5mY01ma2V5MzIgLz5cblxuICAgIDx0ZW1wbGF0ZSAjaW5mbz5cbiAgICAgIDxoNiBjbGFzcz1cInEtbXQtbm9uZSBxLW1iLXNtXCI+QWJvdXQgdGhlIE1ma2V5MzIgYXR0YWNrPC9oNj5cbiAgICAgIDxwPlxuICAgICAgICBUaGUgbWZrZXkzMiBhdHRhY2sgaXMgYSBtZXRob2QgdG8gcmV0cmlldmUgdGhlIGtleXMgb2YgTUYgQ2xhc3NpYyBjYXJkc1xuICAgICAgICBieSB1c2luZyB0aGUgbm9uY2VzIGdhdGhlcmVkIGR1cmluZyB0aGUgY29tbXVuaWNhdGlvbiBiZXR3ZWVuIHRoZSBjYXJkXG4gICAgICAgIGFuZCB0aGUgcmVhZGVyLiBUaGUgYXR0YWNrIGlzIGJhc2VkIG9uIHRoZSBmYWN0IHRoYXQgdGhlIG5vbmNlcyBhcmVcbiAgICAgICAgZ2VuZXJhdGVkIHVzaW5nIGEgd2VhayByYW5kb20gbnVtYmVyIGdlbmVyYXRvciwgd2hpY2ggYWxsb3dzIGFuIGF0dGFja2VyXG4gICAgICAgIHRvIHJlY292ZXIgdGhlIGtleXMgYnkgYW5hbHl6aW5nIHRoZSBub25jZXMuXG4gICAgICA8L3A+XG4gICAgICA8cD5cbiAgICAgICAgU2F2ZWQgbm9uY2VzIGFyZSBzdG9yZWQgaW4gdGhlIGxvZyBmaWxlIG9uIEZsaXBwZXIncyBTRCBjYXJkLiBXZSBhcmVcbiAgICAgICAgZmVlZGluZyBub25jZXMgb25lIGJ5IG9uZSBpbnRvIG1ma2V5MzIsIGxvb2tpbmcgZm9yIG5ldyBrZXlzLiBPbmNlXG4gICAgICAgIGRpc2NvdmVyZWQsIG5ldyBrZXlzIHdpbGwgYmUgYWRkZWQgdG8gdGhlIHVzZXIgZGljdGlvbmFyeSBmaWxlIGFuZCB3aWxsXG4gICAgICAgIGJlIGF2YWlsYWJsZSBmb3IgZnV0dXJlIGNyYWNrcy5cbiAgICAgIDwvcD5cbiAgICAgIDxwPllvdSBjYW4gYWxzbyBydW4gdGhlIGF0dGFjayBieSBlbnRlcmluZyB0aGUgbm9uY2UgbWFudWFsbHkuPC9wPlxuICAgICAgPHAgY2xhc3M9XCJxLW1iLW5vbmVcIj5cbiAgICAgICAgPGEgaHJlZj1cImh0dHBzOi8vZG9jcy5mbGlwcGVyLm5ldC9uZmMvbWZrZXkzMlwiIHRhcmdldD1cIl9ibGFua1wiXG4gICAgICAgICAgPlJlYWQgbW9yZSBhYm91dCBtZmtleTMyPC9hXG4gICAgICAgID5cbiAgICAgICAgb24gRmxpcHBlciBEb2NzXG4gICAgICA8L3A+XG4gICAgPC90ZW1wbGF0ZT5cbiAgPC9HZW5lcmljUGFnZUxheW91dD5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgeyBHZW5lcmljUGFnZUxheW91dCB9IGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL0dlbmVyaWNQYWdlTGF5b3V0J1xuaW1wb3J0IHsgTmZjTWZrZXkzMiB9IGZyb20gJ3dpZGdldHMvTkZDL01ma2V5MzInXG48L3NjcmlwdD5cbiJdLCJuYW1lcyI6WyJjb21wb25lbnROYW1lIiwibWZrZXkiLCJGbGlwcGVyTW9kZWwudXNlRmxpcHBlclN0b3JlIiwiTmZjTW9kZWwudXNlTmZjU3RvcmUiLCJyZXMiLCJpIiwiX2hvaXN0ZWRfMSIsIl9ob2lzdGVkXzQiLCJfb3BlbkJsb2NrIiwiX2NyZWF0ZUJsb2NrIiwiX3dpdGhDdHgiLCJfY3JlYXRlVk5vZGUiLCJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX2NyZWF0ZVRleHRWTm9kZSIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfaG9pc3RlZF8yIiwiX2NyZWF0ZUNvbW1lbnRWTm9kZSIsIl9ob2lzdGVkXzMiLCJfdG9EaXNwbGF5U3RyaW5nIiwiX0ZyYWdtZW50IiwiX3JlbmRlckxpc3QiLCJmb2N1cyIsInJlZiIsInZhbGlkIiwiY29tcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBT0EsTUFBTSxrQkFBa0IsQ0FBRSxjQUFjLFlBQVksUUFBUSxNQUFNO0FBRWxFLE1BQUEsZUFBZSxnQkFBZ0I7QUFBQSxFQUM3QixNQUFNO0FBQUEsRUFFTixPQUFPO0FBQUEsSUFDTCxHQUFHO0FBQUEsSUFFSCxPQUFPO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixVQUFVO0FBQUEsSUFDVixRQUFRO0FBQUEsSUFDUixXQUFXO0FBQUEsSUFFWCxXQUFXO0FBQUEsTUFDVCxNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsTUFDVCxXQUFXLE9BQUssZ0JBQWdCLFNBQVMsQ0FBQztBQUFBLElBQ2hEO0FBQUEsRUFDQTtBQUFBLEVBRUUsTUFBTyxPQUFPLEVBQUUsU0FBUztBQUN2QixVQUFNLEtBQUssbUJBQWtCO0FBQzdCLFVBQU0sU0FBUyxRQUFRLE9BQU8sR0FBRyxNQUFNLEVBQUU7QUFFekMsVUFBTSxVQUFVO0FBQUEsTUFBUyxNQUN2Qiw0REFDZ0IsTUFBTSx5QkFDbkIsT0FBTyxVQUFVLE9BQU8sOENBQThDLE9BQ3RFLE1BQU0sVUFBVSxPQUFPLG9CQUFvQixPQUMzQyxNQUFNLFNBQVMsT0FBTyxtQkFBbUIsT0FDekMsTUFBTSxhQUFhLE9BQU8sdUJBQXVCLE9BQ2pELE1BQU0sV0FBVyxPQUFPLHFCQUFxQixPQUM3QyxNQUFNLGNBQWMsUUFBUSxzQkFBc0I7QUFBQSxJQUMzRDtBQUVJLFdBQU8sTUFBTSxFQUFFLE9BQU87QUFBQSxNQUNwQixPQUFPLFFBQVE7QUFBQSxJQUNyQixHQUFPO0FBQUEsTUFDRCxFQUFFLFNBQVMsRUFBRSxPQUFPLFVBQVMsR0FBSSxNQUFNLE1BQU0sT0FBTyxDQUFDO0FBQUEsSUFDM0QsQ0FBSztBQUFBLEVBQ0g7QUFD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
