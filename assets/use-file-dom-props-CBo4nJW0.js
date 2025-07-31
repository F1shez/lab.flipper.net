import { H as getCurrentInstance, a as ref, aE as onBeforeUpdate, N as inject, ay as formKey, w as watch, S as onMounted, U as onBeforeUnmount, c as computed, ae as debounce, aH as injectProp, D as stopAndPrevent, R as nextTick, ab as onDeactivated, aa as onActivated, h, aD as prevent, k as QIcon, af as QSpinner, J as hSlot, T as Transition, z as client } from "./index-C6TMAAL-.js";
import { u as useDarkProps, c as useDark, H as useId } from "./KeypadButton.vue_vue_type_style_index_0_scoped_4cc0fc91_lang-CBp6KsX-.js";
import { n as addFocusFn, E as removeFocusFn } from "./_commonjsHelpers-DHRe3nu-.js";
const listenerRE = /^on[A-Z]/;
function useSplitAttrs() {
  const { attrs, vnode } = getCurrentInstance();
  const acc = {
    listeners: ref({}),
    attributes: ref({})
  };
  function update() {
    const attributes = {};
    const listeners = {};
    for (const key in attrs) {
      if (key !== "class" && key !== "style" && listenerRE.test(key) === false) {
        attributes[key] = attrs[key];
      }
    }
    for (const key in vnode.props) {
      if (listenerRE.test(key) === true) {
        listeners[key] = vnode.props[key];
      }
    }
    acc.attributes.value = attributes;
    acc.listeners.value = listeners;
  }
  onBeforeUpdate(update);
  update();
  return acc;
}
function useFormChild({ validate, resetValidation, requiresQForm }) {
  const $form = inject(formKey, false);
  if ($form !== false) {
    const { props, proxy } = getCurrentInstance();
    Object.assign(proxy, { validate, resetValidation });
    watch(() => props.disable, (val) => {
      if (val === true) {
        typeof resetValidation === "function" && resetValidation();
        $form.unbindComponent(proxy);
      } else {
        $form.bindComponent(proxy);
      }
    });
    onMounted(() => {
      props.disable !== true && $form.bindComponent(proxy);
    });
    onBeforeUnmount(() => {
      props.disable !== true && $form.unbindComponent(proxy);
    });
  } else if (requiresQForm === true) {
    console.error("Parent QForm not found on useFormChild()!");
  }
}
const hex = /^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/, hexa = /^#[0-9a-fA-F]{4}([0-9a-fA-F]{4})?$/, hexOrHexa = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, rgb = /^rgb\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5])\)$/, rgba = /^rgba\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/;
const testPattern = {
  date: (v) => /^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(v),
  time: (v) => /^([0-1]?\d|2[0-3]):[0-5]\d$/.test(v),
  fulltime: (v) => /^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(v),
  timeOrFulltime: (v) => /^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(v),
  // -- RFC 5322 --
  // -- Added in v2.6.6 --
  // This is a basic helper validation.
  // For something more complex (like RFC 822) you should write and use your own rule.
  // We won't be accepting PRs to enhance the one below because of the reason above.
  // eslint-disable-next-line
  email: (v) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v),
  hexColor: (v) => hex.test(v),
  hexaColor: (v) => hexa.test(v),
  hexOrHexaColor: (v) => hexOrHexa.test(v),
  rgbColor: (v) => rgb.test(v),
  rgbaColor: (v) => rgba.test(v),
  rgbOrRgbaColor: (v) => rgb.test(v) || rgba.test(v),
  hexOrRgbColor: (v) => hex.test(v) || rgb.test(v),
  hexaOrRgbaColor: (v) => hexa.test(v) || rgba.test(v),
  anyColor: (v) => hexOrHexa.test(v) || rgb.test(v) || rgba.test(v)
};
const lazyRulesValues = [true, false, "ondemand"];
const useValidateProps = {
  modelValue: {},
  error: {
    type: Boolean,
    default: null
  },
  errorMessage: String,
  noErrorIcon: Boolean,
  rules: Array,
  reactiveRules: Boolean,
  lazyRules: {
    type: [Boolean, String],
    default: false,
    // statement unneeded but avoids future vue implementation changes
    validator: (v) => lazyRulesValues.includes(v)
  }
};
function useValidate(focused, innerLoading) {
  const { props, proxy } = getCurrentInstance();
  const innerError = ref(false);
  const innerErrorMessage = ref(null);
  const isDirtyModel = ref(false);
  useFormChild({ validate, resetValidation });
  let validateIndex = 0, unwatchRules;
  const hasRules = computed(
    () => props.rules !== void 0 && props.rules !== null && props.rules.length !== 0
  );
  const canDebounceValidate = computed(() => props.disable !== true && hasRules.value === true && innerLoading.value === false);
  const hasError = computed(
    () => props.error === true || innerError.value === true
  );
  const errorMessage = computed(() => typeof props.errorMessage === "string" && props.errorMessage.length !== 0 ? props.errorMessage : innerErrorMessage.value);
  watch(() => props.modelValue, () => {
    isDirtyModel.value = true;
    if (canDebounceValidate.value === true && props.lazyRules === false) {
      debouncedValidate();
    }
  });
  function onRulesChange() {
    if (props.lazyRules !== "ondemand" && canDebounceValidate.value === true && isDirtyModel.value === true) {
      debouncedValidate();
    }
  }
  watch(() => props.reactiveRules, (val) => {
    if (val === true) {
      if (unwatchRules === void 0) {
        unwatchRules = watch(() => props.rules, onRulesChange, { immediate: true, deep: true });
      }
    } else if (unwatchRules !== void 0) {
      unwatchRules();
      unwatchRules = void 0;
    }
  }, { immediate: true });
  watch(() => props.lazyRules, onRulesChange);
  watch(focused, (val) => {
    if (val === true) {
      isDirtyModel.value = true;
    } else if (canDebounceValidate.value === true && props.lazyRules !== "ondemand") {
      debouncedValidate();
    }
  });
  function resetValidation() {
    validateIndex++;
    innerLoading.value = false;
    isDirtyModel.value = false;
    innerError.value = false;
    innerErrorMessage.value = null;
    debouncedValidate.cancel();
  }
  function validate(val = props.modelValue) {
    if (props.disable === true || hasRules.value === false) {
      return true;
    }
    const index = ++validateIndex;
    const setDirty = innerLoading.value !== true ? () => {
      isDirtyModel.value = true;
    } : () => {
    };
    const update = (err, msg) => {
      err === true && setDirty();
      innerError.value = err;
      innerErrorMessage.value = msg || null;
      innerLoading.value = false;
    };
    const promises = [];
    for (let i = 0; i < props.rules.length; i++) {
      const rule = props.rules[i];
      let res;
      if (typeof rule === "function") {
        res = rule(val, testPattern);
      } else if (typeof rule === "string" && testPattern[rule] !== void 0) {
        res = testPattern[rule](val);
      }
      if (res === false || typeof res === "string") {
        update(true, res);
        return false;
      } else if (res !== true && res !== void 0) {
        promises.push(res);
      }
    }
    if (promises.length === 0) {
      update(false);
      return true;
    }
    innerLoading.value = true;
    return Promise.all(promises).then(
      (res) => {
        if (res === void 0 || Array.isArray(res) === false || res.length === 0) {
          index === validateIndex && update(false);
          return true;
        }
        const msg = res.find((r) => r === false || typeof r === "string");
        index === validateIndex && update(msg !== void 0, msg);
        return msg === void 0;
      },
      (e) => {
        if (index === validateIndex) {
          console.error(e);
          update(true);
        }
        return false;
      }
    );
  }
  const debouncedValidate = debounce(validate, 0);
  onBeforeUnmount(() => {
    unwatchRules == null ? void 0 : unwatchRules();
    debouncedValidate.cancel();
  });
  Object.assign(proxy, { resetValidation, validate });
  injectProp(proxy, "hasError", () => hasError.value);
  return {
    isDirtyModel,
    hasRules,
    hasError,
    errorMessage,
    validate,
    resetValidation
  };
}
function fieldValueIsFilled(val) {
  return val !== void 0 && val !== null && ("" + val).length !== 0;
}
const useNonInputFieldProps = {
  ...useDarkProps,
  ...useValidateProps,
  label: String,
  stackLabel: Boolean,
  hint: String,
  hideHint: Boolean,
  prefix: String,
  suffix: String,
  labelColor: String,
  color: String,
  bgColor: String,
  filled: Boolean,
  outlined: Boolean,
  borderless: Boolean,
  standout: [Boolean, String],
  square: Boolean,
  loading: Boolean,
  labelSlot: Boolean,
  bottomSlots: Boolean,
  hideBottomSpace: Boolean,
  rounded: Boolean,
  dense: Boolean,
  itemAligned: Boolean,
  counter: Boolean,
  clearable: Boolean,
  clearIcon: String,
  disable: Boolean,
  readonly: Boolean,
  autofocus: Boolean,
  for: String
};
const useFieldProps = {
  ...useNonInputFieldProps,
  maxlength: [Number, String]
};
const useFieldEmits = ["update:modelValue", "clear", "focus", "blur"];
function useFieldState({ requiredForAttr = true, tagProp, changeEvent = false } = {}) {
  const { props, proxy } = getCurrentInstance();
  const isDark = useDark(props, proxy.$q);
  const targetUid = useId({
    required: requiredForAttr,
    getValue: () => props.for
  });
  return {
    requiredForAttr,
    changeEvent,
    tag: tagProp === true ? computed(() => props.tag) : { value: "label" },
    isDark,
    editable: computed(
      () => props.disable !== true && props.readonly !== true
    ),
    innerLoading: ref(false),
    focused: ref(false),
    hasPopupOpen: false,
    splitAttrs: useSplitAttrs(),
    targetUid,
    rootRef: ref(null),
    targetRef: ref(null),
    controlRef: ref(null)
    /**
         * user supplied additionals:
    
         * innerValue - computed
         * floatingLabel - computed
         * inputRef - computed
    
         * fieldClass - computed
         * hasShadow - computed
    
         * controlEvents - Object with fn(e)
    
         * getControl - fn
         * getInnerAppend - fn
         * getControlChild - fn
         * getShadowControl - fn
         * showPopup - fn
         */
  };
}
function useField(state) {
  const { props, emit, slots, attrs, proxy } = getCurrentInstance();
  const { $q } = proxy;
  let focusoutTimer = null;
  if (state.hasValue === void 0) {
    state.hasValue = computed(() => fieldValueIsFilled(props.modelValue));
  }
  if (state.emitValue === void 0) {
    state.emitValue = (value) => {
      emit("update:modelValue", value);
    };
  }
  if (state.controlEvents === void 0) {
    state.controlEvents = {
      onFocusin: onControlFocusin,
      onFocusout: onControlFocusout
    };
  }
  Object.assign(state, {
    clearValue,
    onControlFocusin,
    onControlFocusout,
    focus
  });
  if (state.computedCounter === void 0) {
    state.computedCounter = computed(() => {
      if (props.counter !== false) {
        const len = typeof props.modelValue === "string" || typeof props.modelValue === "number" ? ("" + props.modelValue).length : Array.isArray(props.modelValue) === true ? props.modelValue.length : 0;
        const max = props.maxlength !== void 0 ? props.maxlength : props.maxValues;
        return len + (max !== void 0 ? " / " + max : "");
      }
    });
  }
  const {
    isDirtyModel,
    hasRules,
    hasError,
    errorMessage,
    resetValidation
  } = useValidate(state.focused, state.innerLoading);
  const floatingLabel = state.floatingLabel !== void 0 ? computed(() => props.stackLabel === true || state.focused.value === true || state.floatingLabel.value === true) : computed(() => props.stackLabel === true || state.focused.value === true || state.hasValue.value === true);
  const shouldRenderBottom = computed(
    () => props.bottomSlots === true || props.hint !== void 0 || hasRules.value === true || props.counter === true || props.error !== null
  );
  const styleType = computed(() => {
    if (props.filled === true) {
      return "filled";
    }
    if (props.outlined === true) {
      return "outlined";
    }
    if (props.borderless === true) {
      return "borderless";
    }
    if (props.standout) {
      return "standout";
    }
    return "standard";
  });
  const classes = computed(
    () => `q-field row no-wrap items-start q-field--${styleType.value}` + (state.fieldClass !== void 0 ? ` ${state.fieldClass.value}` : "") + (props.rounded === true ? " q-field--rounded" : "") + (props.square === true ? " q-field--square" : "") + (floatingLabel.value === true ? " q-field--float" : "") + (hasLabel.value === true ? " q-field--labeled" : "") + (props.dense === true ? " q-field--dense" : "") + (props.itemAligned === true ? " q-field--item-aligned q-item-type" : "") + (state.isDark.value === true ? " q-field--dark" : "") + (state.getControl === void 0 ? " q-field--auto-height" : "") + (state.focused.value === true ? " q-field--focused" : "") + (hasError.value === true ? " q-field--error" : "") + (hasError.value === true || state.focused.value === true ? " q-field--highlighted" : "") + (props.hideBottomSpace !== true && shouldRenderBottom.value === true ? " q-field--with-bottom" : "") + (props.disable === true ? " q-field--disabled" : props.readonly === true ? " q-field--readonly" : "")
  );
  const contentClass = computed(
    () => "q-field__control relative-position row no-wrap" + (props.bgColor !== void 0 ? ` bg-${props.bgColor}` : "") + (hasError.value === true ? " text-negative" : typeof props.standout === "string" && props.standout.length !== 0 && state.focused.value === true ? ` ${props.standout}` : props.color !== void 0 ? ` text-${props.color}` : "")
  );
  const hasLabel = computed(
    () => props.labelSlot === true || props.label !== void 0
  );
  const labelClass = computed(
    () => "q-field__label no-pointer-events absolute ellipsis" + (props.labelColor !== void 0 && hasError.value !== true ? ` text-${props.labelColor}` : "")
  );
  const controlSlotScope = computed(() => ({
    id: state.targetUid.value,
    editable: state.editable.value,
    focused: state.focused.value,
    floatingLabel: floatingLabel.value,
    modelValue: props.modelValue,
    emitValue: state.emitValue
  }));
  const attributes = computed(() => {
    const acc = {};
    if (state.targetUid.value) {
      acc.for = state.targetUid.value;
    }
    if (props.disable === true) {
      acc["aria-disabled"] = "true";
    }
    return acc;
  });
  function focusHandler() {
    var _a;
    const el = document.activeElement;
    let target = (_a = state.targetRef) == null ? void 0 : _a.value;
    if (target && (el === null || el.id !== state.targetUid.value)) {
      target.hasAttribute("tabindex") === true || (target = target.querySelector("[tabindex]"));
      if (target !== el) {
        target == null ? void 0 : target.focus({ preventScroll: true });
      }
    }
  }
  function focus() {
    addFocusFn(focusHandler);
  }
  function blur() {
    removeFocusFn(focusHandler);
    const el = document.activeElement;
    if (el !== null && state.rootRef.value.contains(el)) {
      el.blur();
    }
  }
  function onControlFocusin(e) {
    if (focusoutTimer !== null) {
      clearTimeout(focusoutTimer);
      focusoutTimer = null;
    }
    if (state.editable.value === true && state.focused.value === false) {
      state.focused.value = true;
      emit("focus", e);
    }
  }
  function onControlFocusout(e, then) {
    focusoutTimer !== null && clearTimeout(focusoutTimer);
    focusoutTimer = setTimeout(() => {
      focusoutTimer = null;
      if (document.hasFocus() === true && (state.hasPopupOpen === true || state.controlRef === void 0 || state.controlRef.value === null || state.controlRef.value.contains(document.activeElement) !== false)) return;
      if (state.focused.value === true) {
        state.focused.value = false;
        emit("blur", e);
      }
      then == null ? void 0 : then();
    });
  }
  function clearValue(e) {
    var _a;
    stopAndPrevent(e);
    if ($q.platform.is.mobile !== true) {
      const el = ((_a = state.targetRef) == null ? void 0 : _a.value) || state.rootRef.value;
      el.focus();
    } else if (state.rootRef.value.contains(document.activeElement) === true) {
      document.activeElement.blur();
    }
    if (props.type === "file") {
      state.inputRef.value.value = null;
    }
    emit("update:modelValue", null);
    state.changeEvent === true && emit("change", null);
    emit("clear", props.modelValue);
    nextTick(() => {
      const isDirty = isDirtyModel.value;
      resetValidation();
      isDirtyModel.value = isDirty;
    });
  }
  function onClearableKeyup(evt) {
    [13, 32].includes(evt.keyCode) && clearValue(evt);
  }
  function getContent() {
    const node = [];
    slots.prepend !== void 0 && node.push(
      h("div", {
        class: "q-field__prepend q-field__marginal row no-wrap items-center",
        key: "prepend",
        onClick: prevent
      }, slots.prepend())
    );
    node.push(
      h("div", {
        class: "q-field__control-container col relative-position row no-wrap q-anchor--skip"
      }, getControlContainer())
    );
    hasError.value === true && props.noErrorIcon === false && node.push(
      getInnerAppendNode("error", [
        h(QIcon, { name: $q.iconSet.field.error, color: "negative" })
      ])
    );
    if (props.loading === true || state.innerLoading.value === true) {
      node.push(
        getInnerAppendNode(
          "inner-loading-append",
          slots.loading !== void 0 ? slots.loading() : [h(QSpinner, { color: props.color })]
        )
      );
    } else if (props.clearable === true && state.hasValue.value === true && state.editable.value === true) {
      node.push(
        getInnerAppendNode("inner-clearable-append", [
          h(QIcon, {
            class: "q-field__focusable-action",
            name: props.clearIcon || $q.iconSet.field.clear,
            tabindex: 0,
            role: "button",
            "aria-hidden": "false",
            "aria-label": $q.lang.label.clear,
            onKeyup: onClearableKeyup,
            onClick: clearValue
          })
        ])
      );
    }
    slots.append !== void 0 && node.push(
      h("div", {
        class: "q-field__append q-field__marginal row no-wrap items-center",
        key: "append",
        onClick: prevent
      }, slots.append())
    );
    state.getInnerAppend !== void 0 && node.push(
      getInnerAppendNode("inner-append", state.getInnerAppend())
    );
    state.getControlChild !== void 0 && node.push(
      state.getControlChild()
    );
    return node;
  }
  function getControlContainer() {
    const node = [];
    props.prefix !== void 0 && props.prefix !== null && node.push(
      h("div", {
        class: "q-field__prefix no-pointer-events row items-center"
      }, props.prefix)
    );
    if (state.getShadowControl !== void 0 && state.hasShadow.value === true) {
      node.push(
        state.getShadowControl()
      );
    }
    if (state.getControl !== void 0) {
      node.push(state.getControl());
    } else if (slots.rawControl !== void 0) {
      node.push(slots.rawControl());
    } else if (slots.control !== void 0) {
      node.push(
        h("div", {
          ref: state.targetRef,
          class: "q-field__native row",
          tabindex: -1,
          ...state.splitAttrs.attributes.value,
          "data-autofocus": props.autofocus === true || void 0
        }, slots.control(controlSlotScope.value))
      );
    }
    hasLabel.value === true && node.push(
      h("div", {
        class: labelClass.value
      }, hSlot(slots.label, props.label))
    );
    props.suffix !== void 0 && props.suffix !== null && node.push(
      h("div", {
        class: "q-field__suffix no-pointer-events row items-center"
      }, props.suffix)
    );
    return node.concat(hSlot(slots.default));
  }
  function getBottom() {
    let msg, key;
    if (hasError.value === true) {
      if (errorMessage.value !== null) {
        msg = [h("div", { role: "alert" }, errorMessage.value)];
        key = `q--slot-error-${errorMessage.value}`;
      } else {
        msg = hSlot(slots.error);
        key = "q--slot-error";
      }
    } else if (props.hideHint !== true || state.focused.value === true) {
      if (props.hint !== void 0) {
        msg = [h("div", props.hint)];
        key = `q--slot-hint-${props.hint}`;
      } else {
        msg = hSlot(slots.hint);
        key = "q--slot-hint";
      }
    }
    const hasCounter = props.counter === true || slots.counter !== void 0;
    if (props.hideBottomSpace === true && hasCounter === false && msg === void 0) return;
    const main = h("div", {
      key,
      class: "q-field__messages col"
    }, msg);
    return h("div", {
      class: "q-field__bottom row items-start q-field__bottom--" + (props.hideBottomSpace !== true ? "animated" : "stale"),
      onClick: prevent
    }, [
      props.hideBottomSpace === true ? main : h(Transition, { name: "q-transition--field-message" }, () => main),
      hasCounter === true ? h("div", {
        class: "q-field__counter"
      }, slots.counter !== void 0 ? slots.counter() : state.computedCounter.value) : null
    ]);
  }
  function getInnerAppendNode(key, content) {
    return content === null ? null : h("div", {
      key,
      class: "q-field__append q-field__marginal row no-wrap items-center q-anchor--skip"
    }, content);
  }
  let shouldActivate = false;
  onDeactivated(() => {
    shouldActivate = true;
  });
  onActivated(() => {
    shouldActivate === true && props.autofocus === true && proxy.focus();
  });
  props.autofocus === true && onMounted(() => {
    proxy.focus();
  });
  onBeforeUnmount(() => {
    focusoutTimer !== null && clearTimeout(focusoutTimer);
  });
  Object.assign(proxy, { focus, blur });
  return function renderField() {
    const labelAttrs = state.getControl === void 0 && slots.control === void 0 ? {
      ...state.splitAttrs.attributes.value,
      "data-autofocus": props.autofocus === true || void 0,
      ...attributes.value
    } : attributes.value;
    return h(state.tag.value, {
      ref: state.rootRef,
      class: [
        classes.value,
        attrs.class
      ],
      style: attrs.style,
      ...labelAttrs
    }, [
      slots.before !== void 0 ? h("div", {
        class: "q-field__before q-field__marginal row no-wrap items-center",
        onClick: prevent
      }, slots.before()) : null,
      h("div", {
        class: "q-field__inner relative-position col self-stretch"
      }, [
        h("div", {
          ref: state.controlRef,
          class: contentClass.value,
          tabindex: -1,
          ...state.controlEvents
        }, getContent()),
        shouldRenderBottom.value === true ? getBottom() : null
      ]),
      slots.after !== void 0 ? h("div", {
        class: "q-field__after q-field__marginal row no-wrap items-center",
        onClick: prevent
      }, slots.after()) : null
    ]);
  };
}
const isJapanese = /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;
const isChinese = /[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}\uf900-\ufaff\u3300-\u33ff\ufe30-\ufe4f\uf900-\ufaff\u{2f800}-\u{2fa1f}]/u;
const isKorean = /[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]/;
const isPlainText = /[a-z0-9_ -]$/i;
function useKeyComposition(onInput) {
  return function onComposition(e) {
    if (e.type === "compositionend" || e.type === "change") {
      if (e.target.qComposing !== true) return;
      e.target.qComposing = false;
      onInput(e);
    } else if (e.type === "compositionupdate" && e.target.qComposing !== true && typeof e.data === "string") {
      const isComposing = client.is.firefox === true ? isPlainText.test(e.data) === false : isJapanese.test(e.data) === true || isChinese.test(e.data) === true || isKorean.test(e.data) === true;
      if (isComposing === true) {
        e.target.qComposing = true;
      }
    }
  };
}
function useFileFormDomProps(props, typeGuard) {
  function getFormDomProps() {
    const model = props.modelValue;
    try {
      const dt = "DataTransfer" in window ? new DataTransfer() : "ClipboardEvent" in window ? new ClipboardEvent("").clipboardData : void 0;
      if (Object(model) === model) {
        ("length" in model ? Array.from(model) : [model]).forEach((file) => {
          dt.items.add(file);
        });
      }
      return {
        files: dt.files
      };
    } catch (e) {
      return {
        files: void 0
      };
    }
  }
  return typeGuard === true ? computed(() => {
    if (props.type !== "file") return;
    return getFormDomProps();
  }) : computed(getFormDomProps);
}
export {
  useFieldProps as a,
  useField as b,
  useFieldState as c,
  useKeyComposition as d,
  useNonInputFieldProps as e,
  fieldValueIsFilled as f,
  useFileFormDomProps as g,
  useFieldEmits as u
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlLWZpbGUtZG9tLXByb3BzLUNCbzRuSlcwLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy91c2Utc3BsaXQtYXR0cnMvdXNlLXNwbGl0LWF0dHJzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvdXNlLWZvcm0vdXNlLWZvcm0tY2hpbGQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9wYXR0ZXJucy9wYXR0ZXJucy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLXZhbGlkYXRlL3VzZS12YWxpZGF0ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLWZpZWxkL3VzZS1maWVsZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLWtleS1jb21wb3NpdGlvbi91c2Uta2V5LWNvbXBvc2l0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtZmlsZS91c2UtZmlsZS1kb20tcHJvcHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVmLCBvbkJlZm9yZVVwZGF0ZSwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5jb25zdCBsaXN0ZW5lclJFID0gL15vbltBLVpdL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHsgYXR0cnMsIHZub2RlIH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gIGNvbnN0IGFjYyA9IHtcbiAgICBsaXN0ZW5lcnM6IHJlZih7fSksXG4gICAgYXR0cmlidXRlczogcmVmKHt9KVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlICgpIHtcbiAgICBjb25zdCBhdHRyaWJ1dGVzID0ge31cbiAgICBjb25zdCBsaXN0ZW5lcnMgPSB7fVxuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gYXR0cnMpIHtcbiAgICAgIGlmIChrZXkgIT09ICdjbGFzcycgJiYga2V5ICE9PSAnc3R5bGUnICYmIGxpc3RlbmVyUkUudGVzdChrZXkpID09PSBmYWxzZSkge1xuICAgICAgICBhdHRyaWJ1dGVzWyBrZXkgXSA9IGF0dHJzWyBrZXkgXVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoY29uc3Qga2V5IGluIHZub2RlLnByb3BzKSB7XG4gICAgICBpZiAobGlzdGVuZXJSRS50ZXN0KGtleSkgPT09IHRydWUpIHtcbiAgICAgICAgbGlzdGVuZXJzWyBrZXkgXSA9IHZub2RlLnByb3BzWyBrZXkgXVxuICAgICAgfVxuICAgIH1cblxuICAgIGFjYy5hdHRyaWJ1dGVzLnZhbHVlID0gYXR0cmlidXRlc1xuICAgIGFjYy5saXN0ZW5lcnMudmFsdWUgPSBsaXN0ZW5lcnNcbiAgfVxuXG4gIG9uQmVmb3JlVXBkYXRlKHVwZGF0ZSlcblxuICB1cGRhdGUoKVxuXG4gIHJldHVybiBhY2Ncbn1cbiIsImltcG9ydCB7IGluamVjdCwgd2F0Y2gsIGdldEN1cnJlbnRJbnN0YW5jZSwgb25Nb3VudGVkLCBvbkJlZm9yZVVubW91bnQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGZvcm1LZXkgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnN5bWJvbHMvc3ltYm9scy5qcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHsgdmFsaWRhdGUsIHJlc2V0VmFsaWRhdGlvbiwgcmVxdWlyZXNRRm9ybSB9KSB7XG4gIGNvbnN0ICRmb3JtID0gaW5qZWN0KGZvcm1LZXksIGZhbHNlKVxuXG4gIGlmICgkZm9ybSAhPT0gZmFsc2UpIHtcbiAgICBjb25zdCB7IHByb3BzLCBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIC8vIGV4cG9ydCBwdWJsaWMgbWV0aG9kIChzbyBpdCBjYW4gYmUgdXNlZCBpbiBRRm9ybSlcbiAgICBPYmplY3QuYXNzaWduKHByb3h5LCB7IHZhbGlkYXRlLCByZXNldFZhbGlkYXRpb24gfSlcblxuICAgIHdhdGNoKCgpID0+IHByb3BzLmRpc2FibGUsIHZhbCA9PiB7XG4gICAgICBpZiAodmFsID09PSB0cnVlKSB7XG4gICAgICAgIHR5cGVvZiByZXNldFZhbGlkYXRpb24gPT09ICdmdW5jdGlvbicgJiYgcmVzZXRWYWxpZGF0aW9uKClcbiAgICAgICAgJGZvcm0udW5iaW5kQ29tcG9uZW50KHByb3h5KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgICRmb3JtLmJpbmRDb21wb25lbnQocHJveHkpXG4gICAgICB9XG4gICAgfSlcblxuICAgIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgICAvLyByZWdpc3RlciB0byBwYXJlbnQgUUZvcm1cbiAgICAgIHByb3BzLmRpc2FibGUgIT09IHRydWUgJiYgJGZvcm0uYmluZENvbXBvbmVudChwcm94eSlcbiAgICB9KVxuXG4gICAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICAgIC8vIHVuLXJlZ2lzdGVyIGZyb20gcGFyZW50IFFGb3JtXG4gICAgICBwcm9wcy5kaXNhYmxlICE9PSB0cnVlICYmICRmb3JtLnVuYmluZENvbXBvbmVudChwcm94eSlcbiAgICB9KVxuICB9XG4gIGVsc2UgaWYgKHJlcXVpcmVzUUZvcm0gPT09IHRydWUpIHtcbiAgICBjb25zb2xlLmVycm9yKCdQYXJlbnQgUUZvcm0gbm90IGZvdW5kIG9uIHVzZUZvcm1DaGlsZCgpIScpXG4gIH1cbn1cbiIsIi8vIGZpbGUgcmVmZXJlbmNlZCBmcm9tIGRvY3NcblxuY29uc3RcbiAgaGV4ID0gL14jWzAtOWEtZkEtRl17M30oWzAtOWEtZkEtRl17M30pPyQvLFxuICBoZXhhID0gL14jWzAtOWEtZkEtRl17NH0oWzAtOWEtZkEtRl17NH0pPyQvLFxuICBoZXhPckhleGEgPSAvXiMoWzAtOWEtZkEtRl17M318WzAtOWEtZkEtRl17NH18WzAtOWEtZkEtRl17Nn18WzAtOWEtZkEtRl17OH0pJC8sXG4gIHJnYiA9IC9ecmdiXFwoKCgwfFsxLTldW1xcZF0/fDFbXFxkXXswLDJ9fDJbXFxkXT98MlswLTRdW1xcZF18MjVbMC01XSksKXsyfSgwfFsxLTldW1xcZF0/fDFbXFxkXXswLDJ9fDJbXFxkXT98MlswLTRdW1xcZF18MjVbMC01XSlcXCkkLyxcbiAgcmdiYSA9IC9ecmdiYVxcKCgoMHxbMS05XVtcXGRdP3wxW1xcZF17MCwyfXwyW1xcZF0/fDJbMC00XVtcXGRdfDI1WzAtNV0pLCl7Mn0oMHxbMS05XVtcXGRdP3wxW1xcZF17MCwyfXwyW1xcZF0/fDJbMC00XVtcXGRdfDI1WzAtNV0pLCgwfDBcXC5bMC05XStbMS05XXwwXFwuWzEtOV0rfDEpXFwpJC9cblxuLy8gS2VlcCBpbiBzeW5jIHdpdGggdWkvdHlwZXMvYXBpL3ZhbGlkYXRpb24uZC50c1xuZXhwb3J0IGNvbnN0IHRlc3RQYXR0ZXJuID0ge1xuICBkYXRlOiB2ID0+IC9eLT9bXFxkXStcXC9bMC0xXVxcZFxcL1swLTNdXFxkJC8udGVzdCh2KSxcbiAgdGltZTogdiA9PiAvXihbMC0xXT9cXGR8MlswLTNdKTpbMC01XVxcZCQvLnRlc3QodiksXG4gIGZ1bGx0aW1lOiB2ID0+IC9eKFswLTFdP1xcZHwyWzAtM10pOlswLTVdXFxkOlswLTVdXFxkJC8udGVzdCh2KSxcbiAgdGltZU9yRnVsbHRpbWU6IHYgPT4gL14oWzAtMV0/XFxkfDJbMC0zXSk6WzAtNV1cXGQoOlswLTVdXFxkKT8kLy50ZXN0KHYpLFxuXG4gIC8vIC0tIFJGQyA1MzIyIC0tXG4gIC8vIC0tIEFkZGVkIGluIHYyLjYuNiAtLVxuICAvLyBUaGlzIGlzIGEgYmFzaWMgaGVscGVyIHZhbGlkYXRpb24uXG4gIC8vIEZvciBzb21ldGhpbmcgbW9yZSBjb21wbGV4IChsaWtlIFJGQyA4MjIpIHlvdSBzaG91bGQgd3JpdGUgYW5kIHVzZSB5b3VyIG93biBydWxlLlxuICAvLyBXZSB3b24ndCBiZSBhY2NlcHRpbmcgUFJzIHRvIGVuaGFuY2UgdGhlIG9uZSBiZWxvdyBiZWNhdXNlIG9mIHRoZSByZWFzb24gYWJvdmUuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICBlbWFpbDogdiA9PiAvXigoW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKyhcXC5bXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKSopfChcIi4rXCIpKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31dKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkLy50ZXN0KHYpLFxuXG4gIGhleENvbG9yOiB2ID0+IGhleC50ZXN0KHYpLFxuICBoZXhhQ29sb3I6IHYgPT4gaGV4YS50ZXN0KHYpLFxuICBoZXhPckhleGFDb2xvcjogdiA9PiBoZXhPckhleGEudGVzdCh2KSxcblxuICByZ2JDb2xvcjogdiA9PiByZ2IudGVzdCh2KSxcbiAgcmdiYUNvbG9yOiB2ID0+IHJnYmEudGVzdCh2KSxcbiAgcmdiT3JSZ2JhQ29sb3I6IHYgPT4gcmdiLnRlc3QodikgfHwgcmdiYS50ZXN0KHYpLFxuXG4gIGhleE9yUmdiQ29sb3I6IHYgPT4gaGV4LnRlc3QodikgfHwgcmdiLnRlc3QodiksXG4gIGhleGFPclJnYmFDb2xvcjogdiA9PiBoZXhhLnRlc3QodikgfHwgcmdiYS50ZXN0KHYpLFxuICBhbnlDb2xvcjogdiA9PiBoZXhPckhleGEudGVzdCh2KSB8fCByZ2IudGVzdCh2KSB8fCByZ2JhLnRlc3Qodilcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICB0ZXN0UGF0dGVyblxufVxuIiwiaW1wb3J0IHsgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIG9uQmVmb3JlVW5tb3VudCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlRm9ybUNoaWxkIGZyb20gJy4uL3VzZS1mb3JtL3VzZS1mb3JtLWNoaWxkLmpzJ1xuaW1wb3J0IHsgdGVzdFBhdHRlcm4gfSBmcm9tICcuLi8uLi91dGlscy9wYXR0ZXJucy9wYXR0ZXJucy5qcydcbmltcG9ydCBkZWJvdW5jZSBmcm9tICcuLi8uLi91dGlscy9kZWJvdW5jZS9kZWJvdW5jZS5qcydcbmltcG9ydCB7IGluamVjdFByb3AgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmluamVjdC1vYmotcHJvcC9pbmplY3Qtb2JqLXByb3AuanMnXG5cbmNvbnN0IGxhenlSdWxlc1ZhbHVlcyA9IFsgdHJ1ZSwgZmFsc2UsICdvbmRlbWFuZCcgXVxuXG5leHBvcnQgY29uc3QgdXNlVmFsaWRhdGVQcm9wcyA9IHtcbiAgbW9kZWxWYWx1ZToge30sXG5cbiAgZXJyb3I6IHtcbiAgICB0eXBlOiBCb29sZWFuLFxuICAgIGRlZmF1bHQ6IG51bGxcbiAgfSxcbiAgZXJyb3JNZXNzYWdlOiBTdHJpbmcsXG4gIG5vRXJyb3JJY29uOiBCb29sZWFuLFxuXG4gIHJ1bGVzOiBBcnJheSxcbiAgcmVhY3RpdmVSdWxlczogQm9vbGVhbixcbiAgbGF6eVJ1bGVzOiB7XG4gICAgdHlwZTogWyBCb29sZWFuLCBTdHJpbmcgXSxcbiAgICBkZWZhdWx0OiBmYWxzZSwgLy8gc3RhdGVtZW50IHVubmVlZGVkIGJ1dCBhdm9pZHMgZnV0dXJlIHZ1ZSBpbXBsZW1lbnRhdGlvbiBjaGFuZ2VzXG4gICAgdmFsaWRhdG9yOiB2ID0+IGxhenlSdWxlc1ZhbHVlcy5pbmNsdWRlcyh2KVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChmb2N1c2VkLCBpbm5lckxvYWRpbmcpIHtcbiAgY29uc3QgeyBwcm9wcywgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgY29uc3QgaW5uZXJFcnJvciA9IHJlZihmYWxzZSlcbiAgY29uc3QgaW5uZXJFcnJvck1lc3NhZ2UgPSByZWYobnVsbClcbiAgY29uc3QgaXNEaXJ0eU1vZGVsID0gcmVmKGZhbHNlKVxuXG4gIHVzZUZvcm1DaGlsZCh7IHZhbGlkYXRlLCByZXNldFZhbGlkYXRpb24gfSlcblxuICBsZXQgdmFsaWRhdGVJbmRleCA9IDAsIHVud2F0Y2hSdWxlc1xuXG4gIGNvbnN0IGhhc1J1bGVzID0gY29tcHV0ZWQoKCkgPT5cbiAgICBwcm9wcy5ydWxlcyAhPT0gdm9pZCAwXG4gICAgJiYgcHJvcHMucnVsZXMgIT09IG51bGxcbiAgICAmJiBwcm9wcy5ydWxlcy5sZW5ndGggIT09IDBcbiAgKVxuXG4gIGNvbnN0IGNhbkRlYm91bmNlVmFsaWRhdGUgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgcHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZVxuICAgICYmIGhhc1J1bGVzLnZhbHVlID09PSB0cnVlXG4gICAgLy8gU2hvdWxkIG5vdCBoYXZlIGEgdmFsaWRhdGlvbiBpbiBwcm9ncmVzcyBhbHJlYWR5O1xuICAgIC8vIEl0IG1pZ2h0IG1lYW4gdGhhdCBmb2N1cyBzd2l0Y2hlZCB0byBzdWJtaXQgYnRuIGFuZFxuICAgIC8vIFFGb3JtJ3Mgc3VibWl0KCkgaGFzIGJlZW4gY2FsbGVkIGFscmVhZHkgKEVOVEVSIGtleSlcbiAgICAmJiBpbm5lckxvYWRpbmcudmFsdWUgPT09IGZhbHNlXG4gICkpXG5cbiAgY29uc3QgaGFzRXJyb3IgPSBjb21wdXRlZCgoKSA9PlxuICAgIHByb3BzLmVycm9yID09PSB0cnVlIHx8IGlubmVyRXJyb3IudmFsdWUgPT09IHRydWVcbiAgKVxuXG4gIGNvbnN0IGVycm9yTWVzc2FnZSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICB0eXBlb2YgcHJvcHMuZXJyb3JNZXNzYWdlID09PSAnc3RyaW5nJyAmJiBwcm9wcy5lcnJvck1lc3NhZ2UubGVuZ3RoICE9PSAwXG4gICAgICA/IHByb3BzLmVycm9yTWVzc2FnZVxuICAgICAgOiBpbm5lckVycm9yTWVzc2FnZS52YWx1ZVxuICApKVxuXG4gIHdhdGNoKCgpID0+IHByb3BzLm1vZGVsVmFsdWUsICgpID0+IHtcbiAgICBpc0RpcnR5TW9kZWwudmFsdWUgPSB0cnVlXG5cbiAgICBpZiAoXG4gICAgICBjYW5EZWJvdW5jZVZhbGlkYXRlLnZhbHVlID09PSB0cnVlXG4gICAgICAvLyB0cmlnZ2VyIHZhbGlkYXRpb24gaWYgbm90IHVzaW5nIGFueSBraW5kIG9mIGxhenktcnVsZXNcbiAgICAgICYmIHByb3BzLmxhenlSdWxlcyA9PT0gZmFsc2VcbiAgICApIHtcbiAgICAgIGRlYm91bmNlZFZhbGlkYXRlKClcbiAgICB9XG4gIH0pXG5cbiAgZnVuY3Rpb24gb25SdWxlc0NoYW5nZSAoKSB7XG4gICAgaWYgKFxuICAgICAgcHJvcHMubGF6eVJ1bGVzICE9PSAnb25kZW1hbmQnXG4gICAgICAmJiBjYW5EZWJvdW5jZVZhbGlkYXRlLnZhbHVlID09PSB0cnVlXG4gICAgICAmJiBpc0RpcnR5TW9kZWwudmFsdWUgPT09IHRydWVcbiAgICApIHtcbiAgICAgIGRlYm91bmNlZFZhbGlkYXRlKClcbiAgICB9XG4gIH1cblxuICB3YXRjaCgoKSA9PiBwcm9wcy5yZWFjdGl2ZVJ1bGVzLCB2YWwgPT4ge1xuICAgIGlmICh2YWwgPT09IHRydWUpIHtcbiAgICAgIGlmICh1bndhdGNoUnVsZXMgPT09IHZvaWQgMCkge1xuICAgICAgICB1bndhdGNoUnVsZXMgPSB3YXRjaCgoKSA9PiBwcm9wcy5ydWxlcywgb25SdWxlc0NoYW5nZSwgeyBpbW1lZGlhdGU6IHRydWUsIGRlZXA6IHRydWUgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAodW53YXRjaFJ1bGVzICE9PSB2b2lkIDApIHtcbiAgICAgIHVud2F0Y2hSdWxlcygpXG4gICAgICB1bndhdGNoUnVsZXMgPSB2b2lkIDBcbiAgICB9XG4gIH0sIHsgaW1tZWRpYXRlOiB0cnVlIH0pXG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMubGF6eVJ1bGVzLCBvblJ1bGVzQ2hhbmdlKVxuXG4gIHdhdGNoKGZvY3VzZWQsIHZhbCA9PiB7XG4gICAgaWYgKHZhbCA9PT0gdHJ1ZSkge1xuICAgICAgaXNEaXJ0eU1vZGVsLnZhbHVlID0gdHJ1ZVxuICAgIH1cbiAgICBlbHNlIGlmIChcbiAgICAgIGNhbkRlYm91bmNlVmFsaWRhdGUudmFsdWUgPT09IHRydWVcbiAgICAgICYmIHByb3BzLmxhenlSdWxlcyAhPT0gJ29uZGVtYW5kJ1xuICAgICkge1xuICAgICAgZGVib3VuY2VkVmFsaWRhdGUoKVxuICAgIH1cbiAgfSlcblxuICBmdW5jdGlvbiByZXNldFZhbGlkYXRpb24gKCkge1xuICAgIHZhbGlkYXRlSW5kZXgrK1xuICAgIGlubmVyTG9hZGluZy52YWx1ZSA9IGZhbHNlXG4gICAgaXNEaXJ0eU1vZGVsLnZhbHVlID0gZmFsc2VcbiAgICBpbm5lckVycm9yLnZhbHVlID0gZmFsc2VcbiAgICBpbm5lckVycm9yTWVzc2FnZS52YWx1ZSA9IG51bGxcbiAgICBkZWJvdW5jZWRWYWxpZGF0ZS5jYW5jZWwoKVxuICB9XG5cbiAgLypcbiAgICogUmV0dXJuIHZhbHVlXG4gICAqICAgLSB0cnVlICh2YWxpZGF0aW9uIHN1Y2NlZWRlZClcbiAgICogICAtIGZhbHNlICh2YWxpZGF0aW9uIGZhaWxlZClcbiAgICogICAtIFByb21pc2UgKHBlbmRpbmcgYXN5bmMgdmFsaWRhdGlvbilcbiAgICovXG4gIGZ1bmN0aW9uIHZhbGlkYXRlICh2YWwgPSBwcm9wcy5tb2RlbFZhbHVlKSB7XG4gICAgaWYgKFxuICAgICAgcHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZVxuICAgICAgfHwgaGFzUnVsZXMudmFsdWUgPT09IGZhbHNlXG4gICAgKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIGNvbnN0IGluZGV4ID0gKyt2YWxpZGF0ZUluZGV4XG5cbiAgICBjb25zdCBzZXREaXJ0eSA9IGlubmVyTG9hZGluZy52YWx1ZSAhPT0gdHJ1ZVxuICAgICAgPyAoKSA9PiB7IGlzRGlydHlNb2RlbC52YWx1ZSA9IHRydWUgfVxuICAgICAgOiAoKSA9PiB7fVxuXG4gICAgY29uc3QgdXBkYXRlID0gKGVyciwgbXNnKSA9PiB7XG4gICAgICBlcnIgPT09IHRydWUgJiYgc2V0RGlydHkoKVxuXG4gICAgICBpbm5lckVycm9yLnZhbHVlID0gZXJyXG4gICAgICBpbm5lckVycm9yTWVzc2FnZS52YWx1ZSA9IG1zZyB8fCBudWxsXG4gICAgICBpbm5lckxvYWRpbmcudmFsdWUgPSBmYWxzZVxuICAgIH1cblxuICAgIGNvbnN0IHByb21pc2VzID0gW11cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHMucnVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHJ1bGUgPSBwcm9wcy5ydWxlc1sgaSBdXG4gICAgICBsZXQgcmVzXG5cbiAgICAgIGlmICh0eXBlb2YgcnVsZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXMgPSBydWxlKHZhbCwgdGVzdFBhdHRlcm4pXG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0eXBlb2YgcnVsZSA9PT0gJ3N0cmluZycgJiYgdGVzdFBhdHRlcm5bIHJ1bGUgXSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHJlcyA9IHRlc3RQYXR0ZXJuWyBydWxlIF0odmFsKVxuICAgICAgfVxuXG4gICAgICBpZiAocmVzID09PSBmYWxzZSB8fCB0eXBlb2YgcmVzID09PSAnc3RyaW5nJykge1xuICAgICAgICB1cGRhdGUodHJ1ZSwgcmVzKVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHJlcyAhPT0gdHJ1ZSAmJiByZXMgIT09IHZvaWQgMCkge1xuICAgICAgICBwcm9taXNlcy5wdXNoKHJlcylcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocHJvbWlzZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICB1cGRhdGUoZmFsc2UpXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIGlubmVyTG9hZGluZy52YWx1ZSA9IHRydWVcblxuICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbihcbiAgICAgIHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMgPT09IHZvaWQgMCB8fCBBcnJheS5pc0FycmF5KHJlcykgPT09IGZhbHNlIHx8IHJlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBpbmRleCA9PT0gdmFsaWRhdGVJbmRleCAmJiB1cGRhdGUoZmFsc2UpXG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1zZyA9IHJlcy5maW5kKHIgPT4gciA9PT0gZmFsc2UgfHwgdHlwZW9mIHIgPT09ICdzdHJpbmcnKVxuICAgICAgICBpbmRleCA9PT0gdmFsaWRhdGVJbmRleCAmJiB1cGRhdGUobXNnICE9PSB2b2lkIDAsIG1zZylcbiAgICAgICAgcmV0dXJuIG1zZyA9PT0gdm9pZCAwXG4gICAgICB9LFxuICAgICAgZSA9PiB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gdmFsaWRhdGVJbmRleCkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSlcbiAgICAgICAgICB1cGRhdGUodHJ1ZSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIClcbiAgfVxuXG4gIGNvbnN0IGRlYm91bmNlZFZhbGlkYXRlID0gZGVib3VuY2UodmFsaWRhdGUsIDApXG5cbiAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICB1bndhdGNoUnVsZXM/LigpXG4gICAgZGVib3VuY2VkVmFsaWRhdGUuY2FuY2VsKClcbiAgfSlcblxuICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHMgJiBwcm9wc1xuICBPYmplY3QuYXNzaWduKHByb3h5LCB7IHJlc2V0VmFsaWRhdGlvbiwgdmFsaWRhdGUgfSlcbiAgaW5qZWN0UHJvcChwcm94eSwgJ2hhc0Vycm9yJywgKCkgPT4gaGFzRXJyb3IudmFsdWUpXG5cbiAgcmV0dXJuIHtcbiAgICBpc0RpcnR5TW9kZWwsXG4gICAgaGFzUnVsZXMsXG4gICAgaGFzRXJyb3IsXG4gICAgZXJyb3JNZXNzYWdlLFxuXG4gICAgdmFsaWRhdGUsXG4gICAgcmVzZXRWYWxpZGF0aW9uXG4gIH1cbn1cbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIFRyYW5zaXRpb24sIG5leHRUaWNrLCBvbkFjdGl2YXRlZCwgb25EZWFjdGl2YXRlZCwgb25CZWZvcmVVbm1vdW50LCBvbk1vdW50ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFJY29uIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvaWNvbi9RSWNvbi5qcydcbmltcG9ydCBRU3Bpbm5lciBmcm9tICcuLi8uLi9jb21wb25lbnRzL3NwaW5uZXIvUVNwaW5uZXIuanMnXG5cbmltcG9ydCB1c2VJZCBmcm9tICcuLi91c2UtaWQvdXNlLWlkLmpzJ1xuaW1wb3J0IHVzZVNwbGl0QXR0cnMgZnJvbSAnLi4vdXNlLXNwbGl0LWF0dHJzL3VzZS1zcGxpdC1hdHRycy5qcydcbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLWRhcmsvdXNlLWRhcmsuanMnXG5pbXBvcnQgdXNlVmFsaWRhdGUsIHsgdXNlVmFsaWRhdGVQcm9wcyB9IGZyb20gJy4uL3ByaXZhdGUudXNlLXZhbGlkYXRlL3VzZS12YWxpZGF0ZS5qcydcblxuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5pbXBvcnQgeyBwcmV2ZW50LCBzdG9wQW5kUHJldmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50L2V2ZW50LmpzJ1xuaW1wb3J0IHsgYWRkRm9jdXNGbiwgcmVtb3ZlRm9jdXNGbiB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuZm9jdXMvZm9jdXMtbWFuYWdlci5qcydcblxuZXhwb3J0IGZ1bmN0aW9uIGZpZWxkVmFsdWVJc0ZpbGxlZCAodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IHZvaWQgMFxuICAgICYmIHZhbCAhPT0gbnVsbFxuICAgICYmICgnJyArIHZhbCkubGVuZ3RoICE9PSAwXG59XG5cbmV4cG9ydCBjb25zdCB1c2VOb25JbnB1dEZpZWxkUHJvcHMgPSB7XG4gIC4uLnVzZURhcmtQcm9wcyxcbiAgLi4udXNlVmFsaWRhdGVQcm9wcyxcblxuICBsYWJlbDogU3RyaW5nLFxuICBzdGFja0xhYmVsOiBCb29sZWFuLFxuICBoaW50OiBTdHJpbmcsXG4gIGhpZGVIaW50OiBCb29sZWFuLFxuICBwcmVmaXg6IFN0cmluZyxcbiAgc3VmZml4OiBTdHJpbmcsXG5cbiAgbGFiZWxDb2xvcjogU3RyaW5nLFxuICBjb2xvcjogU3RyaW5nLFxuICBiZ0NvbG9yOiBTdHJpbmcsXG5cbiAgZmlsbGVkOiBCb29sZWFuLFxuICBvdXRsaW5lZDogQm9vbGVhbixcbiAgYm9yZGVybGVzczogQm9vbGVhbixcbiAgc3RhbmRvdXQ6IFsgQm9vbGVhbiwgU3RyaW5nIF0sXG5cbiAgc3F1YXJlOiBCb29sZWFuLFxuXG4gIGxvYWRpbmc6IEJvb2xlYW4sXG5cbiAgbGFiZWxTbG90OiBCb29sZWFuLFxuXG4gIGJvdHRvbVNsb3RzOiBCb29sZWFuLFxuICBoaWRlQm90dG9tU3BhY2U6IEJvb2xlYW4sXG5cbiAgcm91bmRlZDogQm9vbGVhbixcbiAgZGVuc2U6IEJvb2xlYW4sXG4gIGl0ZW1BbGlnbmVkOiBCb29sZWFuLFxuXG4gIGNvdW50ZXI6IEJvb2xlYW4sXG5cbiAgY2xlYXJhYmxlOiBCb29sZWFuLFxuICBjbGVhckljb246IFN0cmluZyxcblxuICBkaXNhYmxlOiBCb29sZWFuLFxuICByZWFkb25seTogQm9vbGVhbixcblxuICBhdXRvZm9jdXM6IEJvb2xlYW4sXG5cbiAgZm9yOiBTdHJpbmdcbn1cblxuZXhwb3J0IGNvbnN0IHVzZUZpZWxkUHJvcHMgPSB7XG4gIC4uLnVzZU5vbklucHV0RmllbGRQcm9wcyxcbiAgbWF4bGVuZ3RoOiBbIE51bWJlciwgU3RyaW5nIF1cbn1cblxuZXhwb3J0IGNvbnN0IHVzZUZpZWxkRW1pdHMgPSBbICd1cGRhdGU6bW9kZWxWYWx1ZScsICdjbGVhcicsICdmb2N1cycsICdibHVyJyBdXG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VGaWVsZFN0YXRlICh7IHJlcXVpcmVkRm9yQXR0ciA9IHRydWUsIHRhZ1Byb3AsIGNoYW5nZUV2ZW50ID0gZmFsc2UgfSA9IHt9KSB7XG4gIGNvbnN0IHsgcHJvcHMsIHByb3h5IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsIHByb3h5LiRxKVxuICBjb25zdCB0YXJnZXRVaWQgPSB1c2VJZCh7XG4gICAgcmVxdWlyZWQ6IHJlcXVpcmVkRm9yQXR0cixcbiAgICBnZXRWYWx1ZTogKCkgPT4gcHJvcHMuZm9yXG4gIH0pXG5cbiAgcmV0dXJuIHtcbiAgICByZXF1aXJlZEZvckF0dHIsXG4gICAgY2hhbmdlRXZlbnQsXG4gICAgdGFnOiB0YWdQcm9wID09PSB0cnVlXG4gICAgICA/IGNvbXB1dGVkKCgpID0+IHByb3BzLnRhZylcbiAgICAgIDogeyB2YWx1ZTogJ2xhYmVsJyB9LFxuXG4gICAgaXNEYXJrLFxuXG4gICAgZWRpdGFibGU6IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5kaXNhYmxlICE9PSB0cnVlICYmIHByb3BzLnJlYWRvbmx5ICE9PSB0cnVlXG4gICAgKSxcblxuICAgIGlubmVyTG9hZGluZzogcmVmKGZhbHNlKSxcbiAgICBmb2N1c2VkOiByZWYoZmFsc2UpLFxuICAgIGhhc1BvcHVwT3BlbjogZmFsc2UsXG5cbiAgICBzcGxpdEF0dHJzOiB1c2VTcGxpdEF0dHJzKCksXG4gICAgdGFyZ2V0VWlkLFxuXG4gICAgcm9vdFJlZjogcmVmKG51bGwpLFxuICAgIHRhcmdldFJlZjogcmVmKG51bGwpLFxuICAgIGNvbnRyb2xSZWY6IHJlZihudWxsKVxuXG4gICAgLyoqXG4gICAgICogdXNlciBzdXBwbGllZCBhZGRpdGlvbmFsczpcblxuICAgICAqIGlubmVyVmFsdWUgLSBjb21wdXRlZFxuICAgICAqIGZsb2F0aW5nTGFiZWwgLSBjb21wdXRlZFxuICAgICAqIGlucHV0UmVmIC0gY29tcHV0ZWRcblxuICAgICAqIGZpZWxkQ2xhc3MgLSBjb21wdXRlZFxuICAgICAqIGhhc1NoYWRvdyAtIGNvbXB1dGVkXG5cbiAgICAgKiBjb250cm9sRXZlbnRzIC0gT2JqZWN0IHdpdGggZm4oZSlcblxuICAgICAqIGdldENvbnRyb2wgLSBmblxuICAgICAqIGdldElubmVyQXBwZW5kIC0gZm5cbiAgICAgKiBnZXRDb250cm9sQ2hpbGQgLSBmblxuICAgICAqIGdldFNoYWRvd0NvbnRyb2wgLSBmblxuICAgICAqIHNob3dQb3B1cCAtIGZuXG4gICAgICovXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlKSB7XG4gIGNvbnN0IHsgcHJvcHMsIGVtaXQsIHNsb3RzLCBhdHRycywgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gIGNvbnN0IHsgJHEgfSA9IHByb3h5XG5cbiAgbGV0IGZvY3Vzb3V0VGltZXIgPSBudWxsXG5cbiAgaWYgKHN0YXRlLmhhc1ZhbHVlID09PSB2b2lkIDApIHtcbiAgICBzdGF0ZS5oYXNWYWx1ZSA9IGNvbXB1dGVkKCgpID0+IGZpZWxkVmFsdWVJc0ZpbGxlZChwcm9wcy5tb2RlbFZhbHVlKSlcbiAgfVxuXG4gIGlmIChzdGF0ZS5lbWl0VmFsdWUgPT09IHZvaWQgMCkge1xuICAgIHN0YXRlLmVtaXRWYWx1ZSA9IHZhbHVlID0+IHtcbiAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgdmFsdWUpXG4gICAgfVxuICB9XG5cbiAgaWYgKHN0YXRlLmNvbnRyb2xFdmVudHMgPT09IHZvaWQgMCkge1xuICAgIHN0YXRlLmNvbnRyb2xFdmVudHMgPSB7XG4gICAgICBvbkZvY3VzaW46IG9uQ29udHJvbEZvY3VzaW4sXG4gICAgICBvbkZvY3Vzb3V0OiBvbkNvbnRyb2xGb2N1c291dFxuICAgIH1cbiAgfVxuXG4gIE9iamVjdC5hc3NpZ24oc3RhdGUsIHtcbiAgICBjbGVhclZhbHVlLFxuICAgIG9uQ29udHJvbEZvY3VzaW4sXG4gICAgb25Db250cm9sRm9jdXNvdXQsXG4gICAgZm9jdXNcbiAgfSlcblxuICBpZiAoc3RhdGUuY29tcHV0ZWRDb3VudGVyID09PSB2b2lkIDApIHtcbiAgICBzdGF0ZS5jb21wdXRlZENvdW50ZXIgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBpZiAocHJvcHMuY291bnRlciAhPT0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgbGVuID0gdHlwZW9mIHByb3BzLm1vZGVsVmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBwcm9wcy5tb2RlbFZhbHVlID09PSAnbnVtYmVyJ1xuICAgICAgICAgID8gKCcnICsgcHJvcHMubW9kZWxWYWx1ZSkubGVuZ3RoXG4gICAgICAgICAgOiAoQXJyYXkuaXNBcnJheShwcm9wcy5tb2RlbFZhbHVlKSA9PT0gdHJ1ZSA/IHByb3BzLm1vZGVsVmFsdWUubGVuZ3RoIDogMClcblxuICAgICAgICBjb25zdCBtYXggPSBwcm9wcy5tYXhsZW5ndGggIT09IHZvaWQgMFxuICAgICAgICAgID8gcHJvcHMubWF4bGVuZ3RoXG4gICAgICAgICAgOiBwcm9wcy5tYXhWYWx1ZXNcblxuICAgICAgICByZXR1cm4gbGVuICsgKG1heCAhPT0gdm9pZCAwID8gJyAvICcgKyBtYXggOiAnJylcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgY29uc3Qge1xuICAgIGlzRGlydHlNb2RlbCxcbiAgICBoYXNSdWxlcyxcbiAgICBoYXNFcnJvcixcbiAgICBlcnJvck1lc3NhZ2UsXG4gICAgcmVzZXRWYWxpZGF0aW9uXG4gIH0gPSB1c2VWYWxpZGF0ZShzdGF0ZS5mb2N1c2VkLCBzdGF0ZS5pbm5lckxvYWRpbmcpXG5cbiAgY29uc3QgZmxvYXRpbmdMYWJlbCA9IHN0YXRlLmZsb2F0aW5nTGFiZWwgIT09IHZvaWQgMFxuICAgID8gY29tcHV0ZWQoKCkgPT4gcHJvcHMuc3RhY2tMYWJlbCA9PT0gdHJ1ZSB8fCBzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSB0cnVlIHx8IHN0YXRlLmZsb2F0aW5nTGFiZWwudmFsdWUgPT09IHRydWUpXG4gICAgOiBjb21wdXRlZCgoKSA9PiBwcm9wcy5zdGFja0xhYmVsID09PSB0cnVlIHx8IHN0YXRlLmZvY3VzZWQudmFsdWUgPT09IHRydWUgfHwgc3RhdGUuaGFzVmFsdWUudmFsdWUgPT09IHRydWUpXG5cbiAgY29uc3Qgc2hvdWxkUmVuZGVyQm90dG9tID0gY29tcHV0ZWQoKCkgPT5cbiAgICBwcm9wcy5ib3R0b21TbG90cyA9PT0gdHJ1ZVxuICAgIHx8IHByb3BzLmhpbnQgIT09IHZvaWQgMFxuICAgIHx8IGhhc1J1bGVzLnZhbHVlID09PSB0cnVlXG4gICAgfHwgcHJvcHMuY291bnRlciA9PT0gdHJ1ZVxuICAgIHx8IHByb3BzLmVycm9yICE9PSBudWxsXG4gIClcblxuICBjb25zdCBzdHlsZVR5cGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgaWYgKHByb3BzLmZpbGxlZCA9PT0gdHJ1ZSkgeyByZXR1cm4gJ2ZpbGxlZCcgfVxuICAgIGlmIChwcm9wcy5vdXRsaW5lZCA9PT0gdHJ1ZSkgeyByZXR1cm4gJ291dGxpbmVkJyB9XG4gICAgaWYgKHByb3BzLmJvcmRlcmxlc3MgPT09IHRydWUpIHsgcmV0dXJuICdib3JkZXJsZXNzJyB9XG4gICAgaWYgKHByb3BzLnN0YW5kb3V0KSB7IHJldHVybiAnc3RhbmRvdXQnIH1cbiAgICByZXR1cm4gJ3N0YW5kYXJkJ1xuICB9KVxuXG4gIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgIGBxLWZpZWxkIHJvdyBuby13cmFwIGl0ZW1zLXN0YXJ0IHEtZmllbGQtLSR7IHN0eWxlVHlwZS52YWx1ZSB9YFxuICAgICsgKHN0YXRlLmZpZWxkQ2xhc3MgIT09IHZvaWQgMCA/IGAgJHsgc3RhdGUuZmllbGRDbGFzcy52YWx1ZSB9YCA6ICcnKVxuICAgICsgKHByb3BzLnJvdW5kZWQgPT09IHRydWUgPyAnIHEtZmllbGQtLXJvdW5kZWQnIDogJycpXG4gICAgKyAocHJvcHMuc3F1YXJlID09PSB0cnVlID8gJyBxLWZpZWxkLS1zcXVhcmUnIDogJycpXG4gICAgKyAoZmxvYXRpbmdMYWJlbC52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0tZmxvYXQnIDogJycpXG4gICAgKyAoaGFzTGFiZWwudmFsdWUgPT09IHRydWUgPyAnIHEtZmllbGQtLWxhYmVsZWQnIDogJycpXG4gICAgKyAocHJvcHMuZGVuc2UgPT09IHRydWUgPyAnIHEtZmllbGQtLWRlbnNlJyA6ICcnKVxuICAgICsgKHByb3BzLml0ZW1BbGlnbmVkID09PSB0cnVlID8gJyBxLWZpZWxkLS1pdGVtLWFsaWduZWQgcS1pdGVtLXR5cGUnIDogJycpXG4gICAgKyAoc3RhdGUuaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJyBxLWZpZWxkLS1kYXJrJyA6ICcnKVxuICAgICsgKHN0YXRlLmdldENvbnRyb2wgPT09IHZvaWQgMCA/ICcgcS1maWVsZC0tYXV0by1oZWlnaHQnIDogJycpXG4gICAgKyAoc3RhdGUuZm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0tZm9jdXNlZCcgOiAnJylcbiAgICArIChoYXNFcnJvci52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0tZXJyb3InIDogJycpXG4gICAgKyAoaGFzRXJyb3IudmFsdWUgPT09IHRydWUgfHwgc3RhdGUuZm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0taGlnaGxpZ2h0ZWQnIDogJycpXG4gICAgKyAocHJvcHMuaGlkZUJvdHRvbVNwYWNlICE9PSB0cnVlICYmIHNob3VsZFJlbmRlckJvdHRvbS52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0td2l0aC1ib3R0b20nIDogJycpXG4gICAgKyAocHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0tZGlzYWJsZWQnIDogKHByb3BzLnJlYWRvbmx5ID09PSB0cnVlID8gJyBxLWZpZWxkLS1yZWFkb25seScgOiAnJykpXG4gIClcblxuICBjb25zdCBjb250ZW50Q2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICdxLWZpZWxkX19jb250cm9sIHJlbGF0aXZlLXBvc2l0aW9uIHJvdyBuby13cmFwJ1xuICAgICsgKHByb3BzLmJnQ29sb3IgIT09IHZvaWQgMCA/IGAgYmctJHsgcHJvcHMuYmdDb2xvciB9YCA6ICcnKVxuICAgICsgKFxuICAgICAgaGFzRXJyb3IudmFsdWUgPT09IHRydWVcbiAgICAgICAgPyAnIHRleHQtbmVnYXRpdmUnXG4gICAgICAgIDogKFxuICAgICAgICAgICAgdHlwZW9mIHByb3BzLnN0YW5kb3V0ID09PSAnc3RyaW5nJyAmJiBwcm9wcy5zdGFuZG91dC5sZW5ndGggIT09IDAgJiYgc3RhdGUuZm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgICAgICA/IGAgJHsgcHJvcHMuc3RhbmRvdXQgfWBcbiAgICAgICAgICAgICAgOiAocHJvcHMuY29sb3IgIT09IHZvaWQgMCA/IGAgdGV4dC0keyBwcm9wcy5jb2xvciB9YCA6ICcnKVxuICAgICAgICAgIClcbiAgICApXG4gIClcblxuICBjb25zdCBoYXNMYWJlbCA9IGNvbXB1dGVkKCgpID0+XG4gICAgcHJvcHMubGFiZWxTbG90ID09PSB0cnVlIHx8IHByb3BzLmxhYmVsICE9PSB2b2lkIDBcbiAgKVxuXG4gIGNvbnN0IGxhYmVsQ2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICdxLWZpZWxkX19sYWJlbCBuby1wb2ludGVyLWV2ZW50cyBhYnNvbHV0ZSBlbGxpcHNpcydcbiAgICArIChwcm9wcy5sYWJlbENvbG9yICE9PSB2b2lkIDAgJiYgaGFzRXJyb3IudmFsdWUgIT09IHRydWUgPyBgIHRleHQtJHsgcHJvcHMubGFiZWxDb2xvciB9YCA6ICcnKVxuICApXG5cbiAgY29uc3QgY29udHJvbFNsb3RTY29wZSA9IGNvbXB1dGVkKCgpID0+ICh7XG4gICAgaWQ6IHN0YXRlLnRhcmdldFVpZC52YWx1ZSxcbiAgICBlZGl0YWJsZTogc3RhdGUuZWRpdGFibGUudmFsdWUsXG4gICAgZm9jdXNlZDogc3RhdGUuZm9jdXNlZC52YWx1ZSxcbiAgICBmbG9hdGluZ0xhYmVsOiBmbG9hdGluZ0xhYmVsLnZhbHVlLFxuICAgIG1vZGVsVmFsdWU6IHByb3BzLm1vZGVsVmFsdWUsXG4gICAgZW1pdFZhbHVlOiBzdGF0ZS5lbWl0VmFsdWVcbiAgfSkpXG5cbiAgY29uc3QgYXR0cmlidXRlcyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBjb25zdCBhY2MgPSB7fVxuXG4gICAgaWYgKHN0YXRlLnRhcmdldFVpZC52YWx1ZSkge1xuICAgICAgYWNjLmZvciA9IHN0YXRlLnRhcmdldFVpZC52YWx1ZVxuICAgIH1cblxuICAgIGlmIChwcm9wcy5kaXNhYmxlID09PSB0cnVlKSB7XG4gICAgICBhY2NbICdhcmlhLWRpc2FibGVkJyBdID0gJ3RydWUnXG4gICAgfVxuXG4gICAgcmV0dXJuIGFjY1xuICB9KVxuXG4gIGZ1bmN0aW9uIGZvY3VzSGFuZGxlciAoKSB7XG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50XG4gICAgbGV0IHRhcmdldCA9IHN0YXRlLnRhcmdldFJlZj8udmFsdWVcblxuICAgIGlmICh0YXJnZXQgJiYgKGVsID09PSBudWxsIHx8IGVsLmlkICE9PSBzdGF0ZS50YXJnZXRVaWQudmFsdWUpKSB7XG4gICAgICB0YXJnZXQuaGFzQXR0cmlidXRlKCd0YWJpbmRleCcpID09PSB0cnVlIHx8ICh0YXJnZXQgPSB0YXJnZXQucXVlcnlTZWxlY3RvcignW3RhYmluZGV4XScpKVxuICAgICAgaWYgKHRhcmdldCAhPT0gZWwpIHtcbiAgICAgICAgdGFyZ2V0Py5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBmb2N1cyAoKSB7XG4gICAgYWRkRm9jdXNGbihmb2N1c0hhbmRsZXIpXG4gIH1cblxuICBmdW5jdGlvbiBibHVyICgpIHtcbiAgICByZW1vdmVGb2N1c0ZuKGZvY3VzSGFuZGxlcilcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRcbiAgICBpZiAoZWwgIT09IG51bGwgJiYgc3RhdGUucm9vdFJlZi52YWx1ZS5jb250YWlucyhlbCkpIHtcbiAgICAgIGVsLmJsdXIoKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uQ29udHJvbEZvY3VzaW4gKGUpIHtcbiAgICBpZiAoZm9jdXNvdXRUaW1lciAhPT0gbnVsbCkge1xuICAgICAgY2xlYXJUaW1lb3V0KGZvY3Vzb3V0VGltZXIpXG4gICAgICBmb2N1c291dFRpbWVyID0gbnVsbFxuICAgIH1cblxuICAgIGlmIChzdGF0ZS5lZGl0YWJsZS52YWx1ZSA9PT0gdHJ1ZSAmJiBzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgc3RhdGUuZm9jdXNlZC52YWx1ZSA9IHRydWVcbiAgICAgIGVtaXQoJ2ZvY3VzJywgZSlcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbkNvbnRyb2xGb2N1c291dCAoZSwgdGhlbikge1xuICAgIGZvY3Vzb3V0VGltZXIgIT09IG51bGwgJiYgY2xlYXJUaW1lb3V0KGZvY3Vzb3V0VGltZXIpXG4gICAgZm9jdXNvdXRUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgZm9jdXNvdXRUaW1lciA9IG51bGxcblxuICAgICAgaWYgKFxuICAgICAgICBkb2N1bWVudC5oYXNGb2N1cygpID09PSB0cnVlICYmIChcbiAgICAgICAgICBzdGF0ZS5oYXNQb3B1cE9wZW4gPT09IHRydWVcbiAgICAgICAgICB8fCBzdGF0ZS5jb250cm9sUmVmID09PSB2b2lkIDBcbiAgICAgICAgICB8fCBzdGF0ZS5jb250cm9sUmVmLnZhbHVlID09PSBudWxsXG4gICAgICAgICAgfHwgc3RhdGUuY29udHJvbFJlZi52YWx1ZS5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSAhPT0gZmFsc2VcbiAgICAgICAgKVxuICAgICAgKSByZXR1cm5cblxuICAgICAgaWYgKHN0YXRlLmZvY3VzZWQudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgc3RhdGUuZm9jdXNlZC52YWx1ZSA9IGZhbHNlXG4gICAgICAgIGVtaXQoJ2JsdXInLCBlKVxuICAgICAgfVxuXG4gICAgICB0aGVuPy4oKVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBjbGVhclZhbHVlIChlKSB7XG4gICAgLy8gcHJldmVudCBhY3RpdmF0aW5nIHRoZSBmaWVsZCBidXQga2VlcCBmb2N1cyBvbiBkZXNrdG9wXG4gICAgc3RvcEFuZFByZXZlbnQoZSlcblxuICAgIGlmICgkcS5wbGF0Zm9ybS5pcy5tb2JpbGUgIT09IHRydWUpIHtcbiAgICAgIGNvbnN0IGVsID0gc3RhdGUudGFyZ2V0UmVmPy52YWx1ZSB8fCBzdGF0ZS5yb290UmVmLnZhbHVlXG4gICAgICBlbC5mb2N1cygpXG4gICAgfVxuICAgIGVsc2UgaWYgKHN0YXRlLnJvb3RSZWYudmFsdWUuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkgPT09IHRydWUpIHtcbiAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuYmx1cigpXG4gICAgfVxuXG4gICAgaWYgKHByb3BzLnR5cGUgPT09ICdmaWxlJykge1xuICAgICAgLy8gZG8gbm90IGxldCBmb2N1cyBiZSB0cmlnZ2VyZWRcbiAgICAgIC8vIGFzIGl0IHdpbGwgbWFrZSB0aGUgbmF0aXZlIGZpbGUgZGlhbG9nXG4gICAgICAvLyBhcHBlYXIgZm9yIGFub3RoZXIgc2VsZWN0aW9uXG4gICAgICBzdGF0ZS5pbnB1dFJlZi52YWx1ZS52YWx1ZSA9IG51bGxcbiAgICB9XG5cbiAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIG51bGwpXG4gICAgc3RhdGUuY2hhbmdlRXZlbnQgPT09IHRydWUgJiYgZW1pdCgnY2hhbmdlJywgbnVsbClcbiAgICBlbWl0KCdjbGVhcicsIHByb3BzLm1vZGVsVmFsdWUpXG5cbiAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICBjb25zdCBpc0RpcnR5ID0gaXNEaXJ0eU1vZGVsLnZhbHVlXG4gICAgICByZXNldFZhbGlkYXRpb24oKVxuICAgICAgaXNEaXJ0eU1vZGVsLnZhbHVlID0gaXNEaXJ0eVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBvbkNsZWFyYWJsZUtleXVwIChldnQpIHtcbiAgICBbIDEzLCAzMiBdLmluY2x1ZGVzKGV2dC5rZXlDb2RlKSAmJiBjbGVhclZhbHVlKGV2dClcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENvbnRlbnQgKCkge1xuICAgIGNvbnN0IG5vZGUgPSBbXVxuXG4gICAgc2xvdHMucHJlcGVuZCAhPT0gdm9pZCAwICYmIG5vZGUucHVzaChcbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19wcmVwZW5kIHEtZmllbGRfX21hcmdpbmFsIHJvdyBuby13cmFwIGl0ZW1zLWNlbnRlcicsXG4gICAgICAgIGtleTogJ3ByZXBlbmQnLFxuICAgICAgICBvbkNsaWNrOiBwcmV2ZW50XG4gICAgICB9LCBzbG90cy5wcmVwZW5kKCkpXG4gICAgKVxuXG4gICAgbm9kZS5wdXNoKFxuICAgICAgaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogJ3EtZmllbGRfX2NvbnRyb2wtY29udGFpbmVyIGNvbCByZWxhdGl2ZS1wb3NpdGlvbiByb3cgbm8td3JhcCBxLWFuY2hvci0tc2tpcCdcbiAgICAgIH0sIGdldENvbnRyb2xDb250YWluZXIoKSlcbiAgICApXG5cbiAgICBoYXNFcnJvci52YWx1ZSA9PT0gdHJ1ZSAmJiBwcm9wcy5ub0Vycm9ySWNvbiA9PT0gZmFsc2UgJiYgbm9kZS5wdXNoKFxuICAgICAgZ2V0SW5uZXJBcHBlbmROb2RlKCdlcnJvcicsIFtcbiAgICAgICAgaChRSWNvbiwgeyBuYW1lOiAkcS5pY29uU2V0LmZpZWxkLmVycm9yLCBjb2xvcjogJ25lZ2F0aXZlJyB9KVxuICAgICAgXSlcbiAgICApXG5cbiAgICBpZiAocHJvcHMubG9hZGluZyA9PT0gdHJ1ZSB8fCBzdGF0ZS5pbm5lckxvYWRpbmcudmFsdWUgPT09IHRydWUpIHtcbiAgICAgIG5vZGUucHVzaChcbiAgICAgICAgZ2V0SW5uZXJBcHBlbmROb2RlKFxuICAgICAgICAgICdpbm5lci1sb2FkaW5nLWFwcGVuZCcsXG4gICAgICAgICAgc2xvdHMubG9hZGluZyAhPT0gdm9pZCAwXG4gICAgICAgICAgICA/IHNsb3RzLmxvYWRpbmcoKVxuICAgICAgICAgICAgOiBbIGgoUVNwaW5uZXIsIHsgY29sb3I6IHByb3BzLmNvbG9yIH0pIF1cbiAgICAgICAgKVxuICAgICAgKVxuICAgIH1cbiAgICBlbHNlIGlmIChwcm9wcy5jbGVhcmFibGUgPT09IHRydWUgJiYgc3RhdGUuaGFzVmFsdWUudmFsdWUgPT09IHRydWUgJiYgc3RhdGUuZWRpdGFibGUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgIG5vZGUucHVzaChcbiAgICAgICAgZ2V0SW5uZXJBcHBlbmROb2RlKCdpbm5lci1jbGVhcmFibGUtYXBwZW5kJywgW1xuICAgICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICAgIGNsYXNzOiAncS1maWVsZF9fZm9jdXNhYmxlLWFjdGlvbicsXG4gICAgICAgICAgICBuYW1lOiBwcm9wcy5jbGVhckljb24gfHwgJHEuaWNvblNldC5maWVsZC5jbGVhcixcbiAgICAgICAgICAgIHRhYmluZGV4OiAwLFxuICAgICAgICAgICAgcm9sZTogJ2J1dHRvbicsXG4gICAgICAgICAgICAnYXJpYS1oaWRkZW4nOiAnZmFsc2UnLFxuICAgICAgICAgICAgJ2FyaWEtbGFiZWwnOiAkcS5sYW5nLmxhYmVsLmNsZWFyLFxuICAgICAgICAgICAgb25LZXl1cDogb25DbGVhcmFibGVLZXl1cCxcbiAgICAgICAgICAgIG9uQ2xpY2s6IGNsZWFyVmFsdWVcbiAgICAgICAgICB9KVxuICAgICAgICBdKVxuICAgICAgKVxuICAgIH1cblxuICAgIHNsb3RzLmFwcGVuZCAhPT0gdm9pZCAwICYmIG5vZGUucHVzaChcbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19hcHBlbmQgcS1maWVsZF9fbWFyZ2luYWwgcm93IG5vLXdyYXAgaXRlbXMtY2VudGVyJyxcbiAgICAgICAga2V5OiAnYXBwZW5kJyxcbiAgICAgICAgb25DbGljazogcHJldmVudFxuICAgICAgfSwgc2xvdHMuYXBwZW5kKCkpXG4gICAgKVxuXG4gICAgc3RhdGUuZ2V0SW5uZXJBcHBlbmQgIT09IHZvaWQgMCAmJiBub2RlLnB1c2goXG4gICAgICBnZXRJbm5lckFwcGVuZE5vZGUoJ2lubmVyLWFwcGVuZCcsIHN0YXRlLmdldElubmVyQXBwZW5kKCkpXG4gICAgKVxuXG4gICAgc3RhdGUuZ2V0Q29udHJvbENoaWxkICE9PSB2b2lkIDAgJiYgbm9kZS5wdXNoKFxuICAgICAgc3RhdGUuZ2V0Q29udHJvbENoaWxkKClcbiAgICApXG5cbiAgICByZXR1cm4gbm9kZVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q29udHJvbENvbnRhaW5lciAoKSB7XG4gICAgY29uc3Qgbm9kZSA9IFtdXG5cbiAgICBwcm9wcy5wcmVmaXggIT09IHZvaWQgMCAmJiBwcm9wcy5wcmVmaXggIT09IG51bGwgJiYgbm9kZS5wdXNoKFxuICAgICAgaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogJ3EtZmllbGRfX3ByZWZpeCBuby1wb2ludGVyLWV2ZW50cyByb3cgaXRlbXMtY2VudGVyJ1xuICAgICAgfSwgcHJvcHMucHJlZml4KVxuICAgIClcblxuICAgIGlmIChzdGF0ZS5nZXRTaGFkb3dDb250cm9sICE9PSB2b2lkIDAgJiYgc3RhdGUuaGFzU2hhZG93LnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBub2RlLnB1c2goXG4gICAgICAgIHN0YXRlLmdldFNoYWRvd0NvbnRyb2woKVxuICAgICAgKVxuICAgIH1cblxuICAgIGlmIChzdGF0ZS5nZXRDb250cm9sICE9PSB2b2lkIDApIHtcbiAgICAgIG5vZGUucHVzaChzdGF0ZS5nZXRDb250cm9sKCkpXG4gICAgfVxuICAgIC8vIGludGVybmFsIHVzYWdlIG9ubHk6XG4gICAgZWxzZSBpZiAoc2xvdHMucmF3Q29udHJvbCAhPT0gdm9pZCAwKSB7XG4gICAgICBub2RlLnB1c2goc2xvdHMucmF3Q29udHJvbCgpKVxuICAgIH1cbiAgICBlbHNlIGlmIChzbG90cy5jb250cm9sICE9PSB2b2lkIDApIHtcbiAgICAgIG5vZGUucHVzaChcbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIHJlZjogc3RhdGUudGFyZ2V0UmVmLFxuICAgICAgICAgIGNsYXNzOiAncS1maWVsZF9fbmF0aXZlIHJvdycsXG4gICAgICAgICAgdGFiaW5kZXg6IC0xLFxuICAgICAgICAgIC4uLnN0YXRlLnNwbGl0QXR0cnMuYXR0cmlidXRlcy52YWx1ZSxcbiAgICAgICAgICAnZGF0YS1hdXRvZm9jdXMnOiBwcm9wcy5hdXRvZm9jdXMgPT09IHRydWUgfHwgdm9pZCAwXG4gICAgICAgIH0sIHNsb3RzLmNvbnRyb2woY29udHJvbFNsb3RTY29wZS52YWx1ZSkpXG4gICAgICApXG4gICAgfVxuXG4gICAgaGFzTGFiZWwudmFsdWUgPT09IHRydWUgJiYgbm9kZS5wdXNoKFxuICAgICAgaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogbGFiZWxDbGFzcy52YWx1ZVxuICAgICAgfSwgaFNsb3Qoc2xvdHMubGFiZWwsIHByb3BzLmxhYmVsKSlcbiAgICApXG5cbiAgICBwcm9wcy5zdWZmaXggIT09IHZvaWQgMCAmJiBwcm9wcy5zdWZmaXggIT09IG51bGwgJiYgbm9kZS5wdXNoKFxuICAgICAgaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogJ3EtZmllbGRfX3N1ZmZpeCBuby1wb2ludGVyLWV2ZW50cyByb3cgaXRlbXMtY2VudGVyJ1xuICAgICAgfSwgcHJvcHMuc3VmZml4KVxuICAgIClcblxuICAgIHJldHVybiBub2RlLmNvbmNhdChoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEJvdHRvbSAoKSB7XG4gICAgbGV0IG1zZywga2V5XG5cbiAgICBpZiAoaGFzRXJyb3IudmFsdWUgPT09IHRydWUpIHtcbiAgICAgIGlmIChlcnJvck1lc3NhZ2UudmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgbXNnID0gWyBoKCdkaXYnLCB7IHJvbGU6ICdhbGVydCcgfSwgZXJyb3JNZXNzYWdlLnZhbHVlKSBdXG4gICAgICAgIGtleSA9IGBxLS1zbG90LWVycm9yLSR7IGVycm9yTWVzc2FnZS52YWx1ZSB9YFxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIG1zZyA9IGhTbG90KHNsb3RzLmVycm9yKVxuICAgICAgICBrZXkgPSAncS0tc2xvdC1lcnJvcidcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAocHJvcHMuaGlkZUhpbnQgIT09IHRydWUgfHwgc3RhdGUuZm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKHByb3BzLmhpbnQgIT09IHZvaWQgMCkge1xuICAgICAgICBtc2cgPSBbIGgoJ2RpdicsIHByb3BzLmhpbnQpIF1cbiAgICAgICAga2V5ID0gYHEtLXNsb3QtaGludC0keyBwcm9wcy5oaW50IH1gXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgbXNnID0gaFNsb3Qoc2xvdHMuaGludClcbiAgICAgICAga2V5ID0gJ3EtLXNsb3QtaGludCdcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBoYXNDb3VudGVyID0gcHJvcHMuY291bnRlciA9PT0gdHJ1ZSB8fCBzbG90cy5jb3VudGVyICE9PSB2b2lkIDBcblxuICAgIGlmIChcbiAgICAgIHByb3BzLmhpZGVCb3R0b21TcGFjZSA9PT0gdHJ1ZVxuICAgICAgJiYgaGFzQ291bnRlciA9PT0gZmFsc2VcbiAgICAgICYmIG1zZyA9PT0gdm9pZCAwXG4gICAgKSByZXR1cm5cblxuICAgIGNvbnN0IG1haW4gPSBoKCdkaXYnLCB7XG4gICAgICBrZXksXG4gICAgICBjbGFzczogJ3EtZmllbGRfX21lc3NhZ2VzIGNvbCdcbiAgICB9LCBtc2cpXG5cbiAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgY2xhc3M6ICdxLWZpZWxkX19ib3R0b20gcm93IGl0ZW1zLXN0YXJ0IHEtZmllbGRfX2JvdHRvbS0tJ1xuICAgICAgICArIChwcm9wcy5oaWRlQm90dG9tU3BhY2UgIT09IHRydWUgPyAnYW5pbWF0ZWQnIDogJ3N0YWxlJyksXG4gICAgICBvbkNsaWNrOiBwcmV2ZW50XG4gICAgfSwgW1xuICAgICAgcHJvcHMuaGlkZUJvdHRvbVNwYWNlID09PSB0cnVlXG4gICAgICAgID8gbWFpblxuICAgICAgICA6IGgoVHJhbnNpdGlvbiwgeyBuYW1lOiAncS10cmFuc2l0aW9uLS1maWVsZC1tZXNzYWdlJyB9LCAoKSA9PiBtYWluKSxcblxuICAgICAgaGFzQ291bnRlciA9PT0gdHJ1ZVxuICAgICAgICA/IGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogJ3EtZmllbGRfX2NvdW50ZXInXG4gICAgICAgIH0sIHNsb3RzLmNvdW50ZXIgIT09IHZvaWQgMCA/IHNsb3RzLmNvdW50ZXIoKSA6IHN0YXRlLmNvbXB1dGVkQ291bnRlci52YWx1ZSlcbiAgICAgICAgOiBudWxsXG4gICAgXSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldElubmVyQXBwZW5kTm9kZSAoa2V5LCBjb250ZW50KSB7XG4gICAgcmV0dXJuIGNvbnRlbnQgPT09IG51bGxcbiAgICAgID8gbnVsbFxuICAgICAgOiBoKCdkaXYnLCB7XG4gICAgICAgIGtleSxcbiAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19hcHBlbmQgcS1maWVsZF9fbWFyZ2luYWwgcm93IG5vLXdyYXAgaXRlbXMtY2VudGVyIHEtYW5jaG9yLS1za2lwJ1xuICAgICAgfSwgY29udGVudClcbiAgfVxuXG4gIGxldCBzaG91bGRBY3RpdmF0ZSA9IGZhbHNlXG5cbiAgb25EZWFjdGl2YXRlZCgoKSA9PiB7XG4gICAgc2hvdWxkQWN0aXZhdGUgPSB0cnVlXG4gIH0pXG5cbiAgb25BY3RpdmF0ZWQoKCkgPT4ge1xuICAgIHNob3VsZEFjdGl2YXRlID09PSB0cnVlICYmIHByb3BzLmF1dG9mb2N1cyA9PT0gdHJ1ZSAmJiBwcm94eS5mb2N1cygpXG4gIH0pXG5cbiAgcHJvcHMuYXV0b2ZvY3VzID09PSB0cnVlICYmIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgcHJveHkuZm9jdXMoKVxuICB9KVxuXG4gIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgZm9jdXNvdXRUaW1lciAhPT0gbnVsbCAmJiBjbGVhclRpbWVvdXQoZm9jdXNvdXRUaW1lcilcbiAgfSlcblxuICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgT2JqZWN0LmFzc2lnbihwcm94eSwgeyBmb2N1cywgYmx1ciB9KVxuXG4gIHJldHVybiBmdW5jdGlvbiByZW5kZXJGaWVsZCAoKSB7XG4gICAgY29uc3QgbGFiZWxBdHRycyA9IHN0YXRlLmdldENvbnRyb2wgPT09IHZvaWQgMCAmJiBzbG90cy5jb250cm9sID09PSB2b2lkIDBcbiAgICAgID8ge1xuICAgICAgICAgIC4uLnN0YXRlLnNwbGl0QXR0cnMuYXR0cmlidXRlcy52YWx1ZSxcbiAgICAgICAgICAnZGF0YS1hdXRvZm9jdXMnOiBwcm9wcy5hdXRvZm9jdXMgPT09IHRydWUgfHwgdm9pZCAwLFxuICAgICAgICAgIC4uLmF0dHJpYnV0ZXMudmFsdWVcbiAgICAgICAgfVxuICAgICAgOiBhdHRyaWJ1dGVzLnZhbHVlXG5cbiAgICByZXR1cm4gaChzdGF0ZS50YWcudmFsdWUsIHtcbiAgICAgIHJlZjogc3RhdGUucm9vdFJlZixcbiAgICAgIGNsYXNzOiBbXG4gICAgICAgIGNsYXNzZXMudmFsdWUsXG4gICAgICAgIGF0dHJzLmNsYXNzXG4gICAgICBdLFxuICAgICAgc3R5bGU6IGF0dHJzLnN0eWxlLFxuICAgICAgLi4ubGFiZWxBdHRyc1xuICAgIH0sIFtcbiAgICAgIHNsb3RzLmJlZm9yZSAhPT0gdm9pZCAwXG4gICAgICAgID8gaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS1maWVsZF9fYmVmb3JlIHEtZmllbGRfX21hcmdpbmFsIHJvdyBuby13cmFwIGl0ZW1zLWNlbnRlcicsXG4gICAgICAgICAgb25DbGljazogcHJldmVudFxuICAgICAgICB9LCBzbG90cy5iZWZvcmUoKSlcbiAgICAgICAgOiBudWxsLFxuXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiAncS1maWVsZF9faW5uZXIgcmVsYXRpdmUtcG9zaXRpb24gY29sIHNlbGYtc3RyZXRjaCdcbiAgICAgIH0sIFtcbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIHJlZjogc3RhdGUuY29udHJvbFJlZixcbiAgICAgICAgICBjbGFzczogY29udGVudENsYXNzLnZhbHVlLFxuICAgICAgICAgIHRhYmluZGV4OiAtMSxcbiAgICAgICAgICAuLi5zdGF0ZS5jb250cm9sRXZlbnRzXG4gICAgICAgIH0sIGdldENvbnRlbnQoKSksXG5cbiAgICAgICAgc2hvdWxkUmVuZGVyQm90dG9tLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgPyBnZXRCb3R0b20oKVxuICAgICAgICAgIDogbnVsbFxuICAgICAgXSksXG5cbiAgICAgIHNsb3RzLmFmdGVyICE9PSB2b2lkIDBcbiAgICAgICAgPyBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19hZnRlciBxLWZpZWxkX19tYXJnaW5hbCByb3cgbm8td3JhcCBpdGVtcy1jZW50ZXInLFxuICAgICAgICAgIG9uQ2xpY2s6IHByZXZlbnRcbiAgICAgICAgfSwgc2xvdHMuYWZ0ZXIoKSlcbiAgICAgICAgOiBudWxsXG4gICAgXSlcbiAgfVxufVxuIiwiaW1wb3J0IHsgY2xpZW50IH0gZnJvbSAnLi4vLi4vcGx1Z2lucy9wbGF0Zm9ybS9QbGF0Zm9ybS5qcydcblxuY29uc3QgaXNKYXBhbmVzZSA9IC9bXFx1MzAwMC1cXHUzMDNmXFx1MzA0MC1cXHUzMDlmXFx1MzBhMC1cXHUzMGZmXFx1ZmYwMC1cXHVmZjlmXFx1NGUwMC1cXHU5ZmFmXFx1MzQwMC1cXHU0ZGJmXS9cbmNvbnN0IGlzQ2hpbmVzZSA9IC9bXFx1NGUwMC1cXHU5ZmZmXFx1MzQwMC1cXHU0ZGJmXFx1ezIwMDAwfS1cXHV7MmE2ZGZ9XFx1ezJhNzAwfS1cXHV7MmI3M2Z9XFx1ezJiNzQwfS1cXHV7MmI4MWZ9XFx1ezJiODIwfS1cXHV7MmNlYWZ9XFx1ZjkwMC1cXHVmYWZmXFx1MzMwMC1cXHUzM2ZmXFx1ZmUzMC1cXHVmZTRmXFx1ZjkwMC1cXHVmYWZmXFx1ezJmODAwfS1cXHV7MmZhMWZ9XS91XG5jb25zdCBpc0tvcmVhbiA9IC9bXFx1MzEzMS1cXHUzMTRlXFx1MzE0Zi1cXHUzMTYzXFx1YWMwMC1cXHVkN2EzXS9cbmNvbnN0IGlzUGxhaW5UZXh0ID0gL1thLXowLTlfIC1dJC9pXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChvbklucHV0KSB7XG4gIHJldHVybiBmdW5jdGlvbiBvbkNvbXBvc2l0aW9uIChlKSB7XG4gICAgaWYgKGUudHlwZSA9PT0gJ2NvbXBvc2l0aW9uZW5kJyB8fCBlLnR5cGUgPT09ICdjaGFuZ2UnKSB7XG4gICAgICBpZiAoZS50YXJnZXQucUNvbXBvc2luZyAhPT0gdHJ1ZSkgcmV0dXJuXG4gICAgICBlLnRhcmdldC5xQ29tcG9zaW5nID0gZmFsc2VcbiAgICAgIG9uSW5wdXQoZSlcbiAgICB9XG4gICAgZWxzZSBpZiAoXG4gICAgICBlLnR5cGUgPT09ICdjb21wb3NpdGlvbnVwZGF0ZSdcbiAgICAgICYmIGUudGFyZ2V0LnFDb21wb3NpbmcgIT09IHRydWVcbiAgICAgICYmIHR5cGVvZiBlLmRhdGEgPT09ICdzdHJpbmcnXG4gICAgKSB7XG4gICAgICBjb25zdCBpc0NvbXBvc2luZyA9IGNsaWVudC5pcy5maXJlZm94ID09PSB0cnVlXG4gICAgICAgID8gaXNQbGFpblRleHQudGVzdChlLmRhdGEpID09PSBmYWxzZVxuICAgICAgICA6IGlzSmFwYW5lc2UudGVzdChlLmRhdGEpID09PSB0cnVlIHx8IGlzQ2hpbmVzZS50ZXN0KGUuZGF0YSkgPT09IHRydWUgfHwgaXNLb3JlYW4udGVzdChlLmRhdGEpID09PSB0cnVlXG5cbiAgICAgIGlmIChpc0NvbXBvc2luZyA9PT0gdHJ1ZSkge1xuICAgICAgICBlLnRhcmdldC5xQ29tcG9zaW5nID0gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgdHlwZUd1YXJkKSB7XG4gIGZ1bmN0aW9uIGdldEZvcm1Eb21Qcm9wcyAoKSB7XG4gICAgY29uc3QgbW9kZWwgPSBwcm9wcy5tb2RlbFZhbHVlXG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgZHQgPSAnRGF0YVRyYW5zZmVyJyBpbiB3aW5kb3dcbiAgICAgICAgPyBuZXcgRGF0YVRyYW5zZmVyKClcbiAgICAgICAgOiAoJ0NsaXBib2FyZEV2ZW50JyBpbiB3aW5kb3dcbiAgICAgICAgICAgID8gbmV3IENsaXBib2FyZEV2ZW50KCcnKS5jbGlwYm9hcmREYXRhXG4gICAgICAgICAgICA6IHZvaWQgMFxuICAgICAgICAgIClcblxuICAgICAgaWYgKE9iamVjdChtb2RlbCkgPT09IG1vZGVsKSB7XG4gICAgICAgICgnbGVuZ3RoJyBpbiBtb2RlbFxuICAgICAgICAgID8gQXJyYXkuZnJvbShtb2RlbClcbiAgICAgICAgICA6IFsgbW9kZWwgXVxuICAgICAgICApLmZvckVhY2goZmlsZSA9PiB7XG4gICAgICAgICAgZHQuaXRlbXMuYWRkKGZpbGUpXG4gICAgICAgIH0pXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGZpbGVzOiBkdC5maWxlc1xuICAgICAgfVxuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZmlsZXM6IHZvaWQgMFxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0eXBlR3VhcmQgPT09IHRydWVcbiAgICA/IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGlmIChwcm9wcy50eXBlICE9PSAnZmlsZScpIHJldHVyblxuICAgICAgcmV0dXJuIGdldEZvcm1Eb21Qcm9wcygpXG4gICAgfSlcbiAgICA6IGNvbXB1dGVkKGdldEZvcm1Eb21Qcm9wcylcbn1cbiJdLCJuYW1l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
