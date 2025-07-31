import { u as useFieldEmits, a as useFieldProps, g as useFileFormDomProps, f as fieldValueIsFilled, c as useFieldState, d as useKeyComposition, b as useField } from "./use-file-dom-props-CkTfPNnd.js";
import { a as ref, w as watch, R as nextTick, aC as shouldIgnoreKey, L as createComponent, H as getCurrentInstance, c as computed, an as stop, U as onBeforeUnmount, S as onMounted, h, aH as injectProp } from "./index-BXn1qSjA.js";
import { u as useFormProps, b as useFormInputNameAttr } from "./private.use-form-DlR7USk8.js";
import { n as addFocusFn } from "./_commonjsHelpers-BruQt46T.js";
const NAMED_MASKS = {
  date: "####/##/##",
  datetime: "####/##/## ##:##",
  time: "##:##",
  fulltime: "##:##:##",
  phone: "(###) ### - ####",
  card: "#### #### #### ####"
};
const TOKENS = {
  "#": { pattern: "[\\d]", negate: "[^\\d]" },
  S: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]" },
  N: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]" },
  A: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]", transform: (v) => v.toLocaleUpperCase() },
  a: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]", transform: (v) => v.toLocaleLowerCase() },
  X: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]", transform: (v) => v.toLocaleUpperCase() },
  x: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]", transform: (v) => v.toLocaleLowerCase() }
};
const KEYS = Object.keys(TOKENS);
KEYS.forEach((key) => {
  TOKENS[key].regex = new RegExp(TOKENS[key].pattern);
});
const tokenRegexMask = new RegExp("\\\\([^.*+?^${}()|([\\]])|([.*+?^${}()|[\\]])|([" + KEYS.join("") + "])|(.)", "g"), escRegex = /[.*+?^${}()|[\]\\]/g;
const MARKER = String.fromCharCode(1);
const useMaskProps = {
  mask: String,
  reverseFillMask: Boolean,
  fillMask: [Boolean, String],
  unmaskedValue: Boolean
};
function useMask(props, emit, emitValue, inputRef) {
  let maskMarked, maskReplaced, computedMask, computedUnmask, pastedTextStart, selectionAnchor;
  const hasMask = ref(null);
  const innerValue = ref(getInitialMaskedValue());
  function getIsTypeText() {
    return props.autogrow === true || ["textarea", "text", "search", "url", "tel", "password"].includes(props.type);
  }
  watch(() => props.type + props.autogrow, updateMaskInternals);
  watch(() => props.mask, (v) => {
    if (v !== void 0) {
      updateMaskValue(innerValue.value, true);
    } else {
      const val = unmaskValue(innerValue.value);
      updateMaskInternals();
      props.modelValue !== val && emit("update:modelValue", val);
    }
  });
  watch(() => props.fillMask + props.reverseFillMask, () => {
    hasMask.value === true && updateMaskValue(innerValue.value, true);
  });
  watch(() => props.unmaskedValue, () => {
    hasMask.value === true && updateMaskValue(innerValue.value);
  });
  function getInitialMaskedValue() {
    updateMaskInternals();
    if (hasMask.value === true) {
      const masked = maskValue(unmaskValue(props.modelValue));
      return props.fillMask !== false ? fillWithMask(masked) : masked;
    }
    return props.modelValue;
  }
  function getPaddedMaskMarked(size) {
    if (size < maskMarked.length) {
      return maskMarked.slice(-size);
    }
    let pad = "", localMaskMarked = maskMarked;
    const padPos = localMaskMarked.indexOf(MARKER);
    if (padPos !== -1) {
      for (let i = size - localMaskMarked.length; i > 0; i--) {
        pad += MARKER;
      }
      localMaskMarked = localMaskMarked.slice(0, padPos) + pad + localMaskMarked.slice(padPos);
    }
    return localMaskMarked;
  }
  function updateMaskInternals() {
    hasMask.value = props.mask !== void 0 && props.mask.length !== 0 && getIsTypeText();
    if (hasMask.value === false) {
      computedUnmask = void 0;
      maskMarked = "";
      maskReplaced = "";
      return;
    }
    const localComputedMask = NAMED_MASKS[props.mask] === void 0 ? props.mask : NAMED_MASKS[props.mask], fillChar = typeof props.fillMask === "string" && props.fillMask.length !== 0 ? props.fillMask.slice(0, 1) : "_", fillCharEscaped = fillChar.replace(escRegex, "\\$&"), unmask = [], extract = [], mask = [];
    let firstMatch = props.reverseFillMask === true, unmaskChar = "", negateChar = "";
    localComputedMask.replace(tokenRegexMask, (_, char1, esc, token, char2) => {
      if (token !== void 0) {
        const c = TOKENS[token];
        mask.push(c);
        negateChar = c.negate;
        if (firstMatch === true) {
          extract.push("(?:" + negateChar + "+)?(" + c.pattern + "+)?(?:" + negateChar + "+)?(" + c.pattern + "+)?");
          firstMatch = false;
        }
        extract.push("(?:" + negateChar + "+)?(" + c.pattern + ")?");
      } else if (esc !== void 0) {
        unmaskChar = "\\" + (esc === "\\" ? "" : esc);
        mask.push(esc);
        unmask.push("([^" + unmaskChar + "]+)?" + unmaskChar + "?");
      } else {
        const c = char1 !== void 0 ? char1 : char2;
        unmaskChar = c === "\\" ? "\\\\\\\\" : c.replace(escRegex, "\\\\$&");
        mask.push(c);
        unmask.push("([^" + unmaskChar + "]+)?" + unmaskChar + "?");
      }
    });
    const unmaskMatcher = new RegExp(
      "^" + unmask.join("") + "(" + (unmaskChar === "" ? "." : "[^" + unmaskChar + "]") + "+)?" + (unmaskChar === "" ? "" : "[" + unmaskChar + "]*") + "$"
    ), extractLast = extract.length - 1, extractMatcher = extract.map((re, index) => {
      if (index === 0 && props.reverseFillMask === true) {
        return new RegExp("^" + fillCharEscaped + "*" + re);
      } else if (index === extractLast) {
        return new RegExp(
          "^" + re + "(" + (negateChar === "" ? "." : negateChar) + "+)?" + (props.reverseFillMask === true ? "$" : fillCharEscaped + "*")
        );
      }
      return new RegExp("^" + re);
    });
    computedMask = mask;
    computedUnmask = (val) => {
      const unmaskMatch = unmaskMatcher.exec(props.reverseFillMask === true ? val : val.slice(0, mask.length + 1));
      if (unmaskMatch !== null) {
        val = unmaskMatch.slice(1).join("");
      }
      const extractMatch = [], extractMatcherLength = extractMatcher.length;
      for (let i = 0, str = val; i < extractMatcherLength; i++) {
        const m = extractMatcher[i].exec(str);
        if (m === null) {
          break;
        }
        str = str.slice(m.shift().length);
        extractMatch.push(...m);
      }
      if (extractMatch.length !== 0) {
        return extractMatch.join("");
      }
      return val;
    };
    maskMarked = mask.map((v) => typeof v === "string" ? v : MARKER).join("");
    maskReplaced = maskMarked.split(MARKER).join(fillChar);
  }
  function updateMaskValue(rawVal, updateMaskInternalsFlag, inputType) {
    const inp = inputRef.value, end = inp.selectionEnd, endReverse = inp.value.length - end, unmasked = unmaskValue(rawVal);
    updateMaskInternalsFlag === true && updateMaskInternals();
    const preMasked = maskValue(unmasked), masked = props.fillMask !== false ? fillWithMask(preMasked) : preMasked, changed = innerValue.value !== masked;
    inp.value !== masked && (inp.value = masked);
    changed === true && (innerValue.value = masked);
    document.activeElement === inp && nextTick(() => {
      if (masked === maskReplaced) {
        const cursor = props.reverseFillMask === true ? maskReplaced.length : 0;
        inp.setSelectionRange(cursor, cursor, "forward");
        return;
      }
      if (inputType === "insertFromPaste" && props.reverseFillMask !== true) {
        const maxEnd = inp.selectionEnd;
        let cursor = end - 1;
        for (let i = pastedTextStart; i <= cursor && i < maxEnd; i++) {
          if (maskMarked[i] !== MARKER) {
            cursor++;
          }
        }
        moveCursor.right(inp, cursor);
        return;
      }
      if (["deleteContentBackward", "deleteContentForward"].indexOf(inputType) !== -1) {
        const cursor = props.reverseFillMask === true ? end === 0 ? masked.length > preMasked.length ? 1 : 0 : Math.max(0, masked.length - (masked === maskReplaced ? 0 : Math.min(preMasked.length, endReverse) + 1)) + 1 : end;
        inp.setSelectionRange(cursor, cursor, "forward");
        return;
      }
      if (props.reverseFillMask === true) {
        if (changed === true) {
          const cursor = Math.max(0, masked.length - (masked === maskReplaced ? 0 : Math.min(preMasked.length, endReverse + 1)));
          if (cursor === 1 && end === 1) {
            inp.setSelectionRange(cursor, cursor, "forward");
          } else {
            moveCursor.rightReverse(inp, cursor);
          }
        } else {
          const cursor = masked.length - endReverse;
          inp.setSelectionRange(cursor, cursor, "backward");
        }
      } else {
        if (changed === true) {
          const cursor = Math.max(0, maskMarked.indexOf(MARKER), Math.min(preMasked.length, end) - 1);
          moveCursor.right(inp, cursor);
        } else {
          const cursor = end - 1;
          moveCursor.right(inp, cursor);
        }
      }
    });
    const val = props.unmaskedValue === true ? unmaskValue(masked) : masked;
    if (String(props.modelValue) !== val && (props.modelValue !== null || val !== "")) {
      emitValue(val, true);
    }
  }
  function moveCursorForPaste(inp, start, end) {
    const preMasked = maskValue(unmaskValue(inp.value));
    start = Math.max(0, maskMarked.indexOf(MARKER), Math.min(preMasked.length, start));
    pastedTextStart = start;
    inp.setSelectionRange(start, end, "forward");
  }
  const moveCursor = {
    left(inp, cursor) {
      const noMarkBefore = maskMarked.slice(cursor - 1).indexOf(MARKER) === -1;
      let i = Math.max(0, cursor - 1);
      for (; i >= 0; i--) {
        if (maskMarked[i] === MARKER) {
          cursor = i;
          noMarkBefore === true && cursor++;
          break;
        }
      }
      if (i < 0 && maskMarked[cursor] !== void 0 && maskMarked[cursor] !== MARKER) {
        return moveCursor.right(inp, 0);
      }
      cursor >= 0 && inp.setSelectionRange(cursor, cursor, "backward");
    },
    right(inp, cursor) {
      const limit = inp.value.length;
      let i = Math.min(limit, cursor + 1);
      for (; i <= limit; i++) {
        if (maskMarked[i] === MARKER) {
          cursor = i;
          break;
        } else if (maskMarked[i - 1] === MARKER) {
          cursor = i;
        }
      }
      if (i > limit && maskMarked[cursor - 1] !== void 0 && maskMarked[cursor - 1] !== MARKER) {
        return moveCursor.left(inp, limit);
      }
      inp.setSelectionRange(cursor, cursor, "forward");
    },
    leftReverse(inp, cursor) {
      const localMaskMarked = getPaddedMaskMarked(inp.value.length);
      let i = Math.max(0, cursor - 1);
      for (; i >= 0; i--) {
        if (localMaskMarked[i - 1] === MARKER) {
          cursor = i;
          break;
        } else if (localMaskMarked[i] === MARKER) {
          cursor = i;
          if (i === 0) {
            break;
          }
        }
      }
      if (i < 0 && localMaskMarked[cursor] !== void 0 && localMaskMarked[cursor] !== MARKER) {
        return moveCursor.rightReverse(inp, 0);
      }
      cursor >= 0 && inp.setSelectionRange(cursor, cursor, "backward");
    },
    rightReverse(inp, cursor) {
      const limit = inp.value.length, localMaskMarked = getPaddedMaskMarked(limit), noMarkBefore = localMaskMarked.slice(0, cursor + 1).indexOf(MARKER) === -1;
      let i = Math.min(limit, cursor + 1);
      for (; i <= limit; i++) {
        if (localMaskMarked[i - 1] === MARKER) {
          cursor = i;
          cursor > 0 && noMarkBefore === true && cursor--;
          break;
        }
      }
      if (i > limit && localMaskMarked[cursor - 1] !== void 0 && localMaskMarked[cursor - 1] !== MARKER) {
        return moveCursor.leftReverse(inp, limit);
      }
      inp.setSelectionRange(cursor, cursor, "forward");
    }
  };
  function onMaskedClick(e) {
    emit("click", e);
    selectionAnchor = void 0;
  }
  function onMaskedKeydown(e) {
    emit("keydown", e);
    if (shouldIgnoreKey(e) === true || e.altKey === true) return;
    const inp = inputRef.value, start = inp.selectionStart, end = inp.selectionEnd;
    if (!e.shiftKey) {
      selectionAnchor = void 0;
    }
    if (e.keyCode === 37 || e.keyCode === 39) {
      if (e.shiftKey && selectionAnchor === void 0) {
        selectionAnchor = inp.selectionDirection === "forward" ? start : end;
      }
      const fn = moveCursor[(e.keyCode === 39 ? "right" : "left") + (props.reverseFillMask === true ? "Reverse" : "")];
      e.preventDefault();
      fn(inp, selectionAnchor === start ? end : start);
      if (e.shiftKey) {
        const cursor = inp.selectionStart;
        inp.setSelectionRange(Math.min(selectionAnchor, cursor), Math.max(selectionAnchor, cursor), "forward");
      }
    } else if (e.keyCode === 8 && props.reverseFillMask !== true && start === end) {
      moveCursor.left(inp, start);
      inp.setSelectionRange(inp.selectionStart, end, "backward");
    } else if (e.keyCode === 46 && props.reverseFillMask === true && start === end) {
      moveCursor.rightReverse(inp, end);
      inp.setSelectionRange(start, inp.selectionEnd, "forward");
    }
  }
  function maskValue(val) {
    if (val === void 0 || val === null || val === "") {
      return "";
    }
    if (props.reverseFillMask === true) {
      return maskValueReverse(val);
    }
    const mask = computedMask;
    let valIndex = 0, output = "";
    for (let maskIndex = 0; maskIndex < mask.length; maskIndex++) {
      const valChar = val[valIndex], maskDef = mask[maskIndex];
      if (typeof maskDef === "string") {
        output += maskDef;
      } else if (valChar !== void 0 && maskDef.regex.test(valChar)) {
        output += maskDef.transform !== void 0 ? maskDef.transform(valChar) : valChar;
        valIndex++;
      } else {
        return output;
      }
    }
    return output;
  }
  function maskValueReverse(val) {
    const mask = computedMask, firstTokenIndex = maskMarked.indexOf(MARKER);
    let valIndex = val.length - 1, output = "";
    for (let maskIndex = mask.length - 1; maskIndex >= 0 && valIndex !== -1; maskIndex--) {
      const maskDef = mask[maskIndex];
      let valChar = val[valIndex];
      if (typeof maskDef === "string") {
        output = maskDef + output;
      } else if (valChar !== void 0 && maskDef.regex.test(valChar)) {
        do {
          output = (maskDef.transform !== void 0 ? maskDef.transform(valChar) : valChar) + output;
          valIndex--;
          valChar = val[valIndex];
        } while (firstTokenIndex === maskIndex && valChar !== void 0 && maskDef.regex.test(valChar));
      } else {
        return output;
      }
    }
    return output;
  }
  function unmaskValue(val) {
    return typeof val !== "string" || computedUnmask === void 0 ? typeof val === "number" ? computedUnmask("" + val) : val : computedUnmask(val);
  }
  function fillWithMask(val) {
    if (maskReplaced.length - val.length <= 0) {
      return val;
    }
    return props.reverseFillMask === true && val.length !== 0 ? maskReplaced.slice(0, -val.length) + val : val + maskReplaced.slice(val.length);
  }
  return {
    innerValue,
    hasMask,
    moveCursorForPaste,
    updateMaskValue,
    onMaskedKeydown,
    onMaskedClick
  };
}
const QInput = createComponent({
  name: "QInput",
  inheritAttrs: false,
  props: {
    ...useFieldProps,
    ...useMaskProps,
    ...useFormProps,
    // override of useFieldProps > modelValue
    modelValue: [String, Number, FileList],
    shadowText: String,
    type: {
      type: String,
      default: "text"
    },
    debounce: [String, Number],
    autogrow: Boolean,
    // makes a textarea
    inputClass: [Array, String, Object],
    inputStyle: [Array, String, Object]
  },
  emits: [
    ...useFieldEmits,
    "paste",
    "change",
    "keydown",
    "click",
    "animationend"
  ],
  setup(props, { emit, attrs }) {
    const { proxy } = getCurrentInstance();
    const { $q } = proxy;
    const temp = {};
    let emitCachedValue = NaN, typedNumber, stopValueWatcher, emitTimer = null, emitValueFn;
    const inputRef = ref(null);
    const nameProp = useFormInputNameAttr(props);
    const {
      innerValue,
      hasMask,
      moveCursorForPaste,
      updateMaskValue,
      onMaskedKeydown,
      onMaskedClick
    } = useMask(props, emit, emitValue, inputRef);
    const formDomProps = useFileFormDomProps(
      props,
      /* type guard */
      true
    );
    const hasValue = computed(() => fieldValueIsFilled(innerValue.value));
    const onComposition = useKeyComposition(onInput);
    const state = useFieldState({ changeEvent: true });
    const isTextarea = computed(
      () => props.type === "textarea" || props.autogrow === true
    );
    const isTypeText = computed(
      () => isTextarea.value === true || ["text", "search", "url", "tel", "password"].includes(props.type)
    );
    const onEvents = computed(() => {
      const evt = {
        ...state.splitAttrs.listeners.value,
        onInput,
        onPaste,
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        onChange,
        onBlur: onFinishEditing,
        onFocus: stop
      };
      evt.onCompositionstart = evt.onCompositionupdate = evt.onCompositionend = onComposition;
      if (hasMask.value === true) {
        evt.onKeydown = onMaskedKeydown;
        evt.onClick = onMaskedClick;
      }
      if (props.autogrow === true) {
        evt.onAnimationend = onAnimationend;
      }
      return evt;
    });
    const inputAttrs = computed(() => {
      const attrs2 = {
        tabindex: 0,
        "data-autofocus": props.autofocus === true || void 0,
        rows: props.type === "textarea" ? 6 : void 0,
        "aria-label": props.label,
        name: nameProp.value,
        ...state.splitAttrs.attributes.value,
        id: state.targetUid.value,
        maxlength: props.maxlength,
        disabled: props.disable === true,
        readonly: props.readonly === true
      };
      if (isTextarea.value === false) {
        attrs2.type = props.type;
      }
      if (props.autogrow === true) {
        attrs2.rows = 1;
      }
      return attrs2;
    });
    watch(() => props.type, () => {
      if (inputRef.value) {
        inputRef.value.value = props.modelValue;
      }
    });
    watch(() => props.modelValue, (v) => {
      if (hasMask.value === true) {
        if (stopValueWatcher === true) {
          stopValueWatcher = false;
          if (String(v) === emitCachedValue) return;
        }
        updateMaskValue(v);
      } else if (innerValue.value !== v) {
        innerValue.value = v;
        if (props.type === "number" && temp.hasOwnProperty("value") === true) {
          if (typedNumber === true) {
            typedNumber = false;
          } else {
            delete temp.value;
          }
        }
      }
      props.autogrow === true && nextTick(adjustHeight);
    });
    watch(() => props.autogrow, (val) => {
      if (val === true) {
        nextTick(adjustHeight);
      } else if (inputRef.value !== null && attrs.rows > 0) {
        inputRef.value.style.height = "auto";
      }
    });
    watch(() => props.dense, () => {
      props.autogrow === true && nextTick(adjustHeight);
    });
    function focus() {
      addFocusFn(() => {
        const el = document.activeElement;
        if (inputRef.value !== null && inputRef.value !== el && (el === null || el.id !== state.targetUid.value)) {
          inputRef.value.focus({ preventScroll: true });
        }
      });
    }
    function select() {
      var _a;
      (_a = inputRef.value) == null ? void 0 : _a.select();
    }
    function onPaste(e) {
      if (hasMask.value === true && props.reverseFillMask !== true) {
        const inp = e.target;
        moveCursorForPaste(inp, inp.selectionStart, inp.selectionEnd);
      }
      emit("paste", e);
    }
    function onInput(e) {
      if (!e || !e.target) return;
      if (props.type === "file") {
        emit("update:modelValue", e.target.files);
        return;
      }
      const val = e.target.value;
      if (e.target.qComposing === true) {
        temp.value = val;
        return;
      }
      if (hasMask.value === true) {
        updateMaskValue(val, false, e.inputType);
      } else {
        emitValue(val);
        if (isTypeText.value === true && e.target === document.activeElement) {
          const { selectionStart, selectionEnd } = e.target;
          if (selectionStart !== void 0 && selectionEnd !== void 0) {
            nextTick(() => {
              if (e.target === document.activeElement && val.indexOf(e.target.value) === 0) {
                e.target.setSelectionRange(selectionStart, selectionEnd);
              }
            });
          }
        }
      }
      props.autogrow === true && adjustHeight();
    }
    function onAnimationend(e) {
      emit("animationend", e);
      adjustHeight();
    }
    function emitValue(val, stopWatcher) {
      emitValueFn = () => {
        emitTimer = null;
        if (props.type !== "number" && temp.hasOwnProperty("value") === true) {
          delete temp.value;
        }
        if (props.modelValue !== val && emitCachedValue !== val) {
          emitCachedValue = val;
          stopWatcher === true && (stopValueWatcher = true);
          emit("update:modelValue", val);
          nextTick(() => {
            emitCachedValue === val && (emitCachedValue = NaN);
          });
        }
        emitValueFn = void 0;
      };
      if (props.type === "number") {
        typedNumber = true;
        temp.value = val;
      }
      if (props.debounce !== void 0) {
        emitTimer !== null && clearTimeout(emitTimer);
        temp.value = val;
        emitTimer = setTimeout(emitValueFn, props.debounce);
      } else {
        emitValueFn();
      }
    }
    function adjustHeight() {
      requestAnimationFrame(() => {
        const inp = inputRef.value;
        if (inp !== null) {
          const parentStyle = inp.parentNode.style;
          const { scrollTop } = inp;
          const { overflowY, maxHeight } = $q.platform.is.firefox === true ? {} : window.getComputedStyle(inp);
          const changeOverflow = overflowY !== void 0 && overflowY !== "scroll";
          changeOverflow === true && (inp.style.overflowY = "hidden");
          parentStyle.marginBottom = inp.scrollHeight - 1 + "px";
          inp.style.height = "1px";
          inp.style.height = inp.scrollHeight + "px";
          changeOverflow === true && (inp.style.overflowY = parseInt(maxHeight, 10) < inp.scrollHeight ? "auto" : "hidden");
          parentStyle.marginBottom = "";
          inp.scrollTop = scrollTop;
        }
      });
    }
    function onChange(e) {
      onComposition(e);
      if (emitTimer !== null) {
        clearTimeout(emitTimer);
        emitTimer = null;
      }
      emitValueFn == null ? void 0 : emitValueFn();
      emit("change", e.target.value);
    }
    function onFinishEditing(e) {
      e !== void 0 && stop(e);
      if (emitTimer !== null) {
        clearTimeout(emitTimer);
        emitTimer = null;
      }
      emitValueFn == null ? void 0 : emitValueFn();
      typedNumber = false;
      stopValueWatcher = false;
      delete temp.value;
      props.type !== "file" && setTimeout(() => {
        if (inputRef.value !== null) {
          inputRef.value.value = innerValue.value !== void 0 ? innerValue.value : "";
        }
      });
    }
    function getCurValue() {
      return temp.hasOwnProperty("value") === true ? temp.value : innerValue.value !== void 0 ? innerValue.value : "";
    }
    onBeforeUnmount(() => {
      onFinishEditing();
    });
    onMounted(() => {
      props.autogrow === true && adjustHeight();
    });
    Object.assign(state, {
      innerValue,
      fieldClass: computed(
        () => `q-${isTextarea.value === true ? "textarea" : "input"}` + (props.autogrow === true ? " q-textarea--autogrow" : "")
      ),
      hasShadow: computed(
        () => props.type !== "file" && typeof props.shadowText === "string" && props.shadowText.length !== 0
      ),
      inputRef,
      emitValue,
      hasValue,
      floatingLabel: computed(
        () => hasValue.value === true && (props.type !== "number" || isNaN(innerValue.value) === false) || fieldValueIsFilled(props.displayValue)
      ),
      getControl: () => {
        return h(isTextarea.value === true ? "textarea" : "input", {
          ref: inputRef,
          class: [
            "q-field__native q-placeholder",
            props.inputClass
          ],
          style: props.inputStyle,
          ...inputAttrs.value,
          ...onEvents.value,
          ...props.type !== "file" ? { value: getCurValue() } : formDomProps.value
        });
      },
      getShadowControl: () => {
        return h("div", {
          class: "q-field__native q-field__shadow absolute-bottom no-pointer-events" + (isTextarea.value === true ? "" : " text-no-wrap")
        }, [
          h("span", { class: "invisible" }, getCurValue()),
          h("span", props.shadowText)
        ]);
      }
    });
    const renderFn = useField(state);
    Object.assign(proxy, {
      focus,
      select,
      getNativeElement: () => inputRef.value
      // deprecated
    });
    injectProp(proxy, "nativeEl", () => inputRef.value);
    return renderFn;
  }
});
export {
  QInput as Q
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUUlucHV0LUI0MlVnTW1GLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2lucHV0L3VzZS1tYXNrLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9pbnB1dC9RSW5wdXQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVmLCB3YXRjaCwgbmV4dFRpY2sgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IHNob3VsZElnbm9yZUtleSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUua2V5Ym9hcmQva2V5LWNvbXBvc2l0aW9uLmpzJ1xuXG4vLyBsZWF2ZSBOQU1FRF9NQVNLUyBhdCB0b3Agb2YgZmlsZSAoY29kZSByZWZlcmVuY2VkIGZyb20gZG9jcylcbmNvbnN0IE5BTUVEX01BU0tTID0ge1xuICBkYXRlOiAnIyMjIy8jIy8jIycsXG4gIGRhdGV0aW1lOiAnIyMjIy8jIy8jIyAjIzojIycsXG4gIHRpbWU6ICcjIzojIycsXG4gIGZ1bGx0aW1lOiAnIyM6IyM6IyMnLFxuICBwaG9uZTogJygjIyMpICMjIyAtICMjIyMnLFxuICBjYXJkOiAnIyMjIyAjIyMjICMjIyMgIyMjIydcbn1cblxuY29uc3QgVE9LRU5TID0ge1xuICAnIyc6IHsgcGF0dGVybjogJ1tcXFxcZF0nLCBuZWdhdGU6ICdbXlxcXFxkXScgfSxcblxuICBTOiB7IHBhdHRlcm46ICdbYS16QS1aXScsIG5lZ2F0ZTogJ1teYS16QS1aXScgfSxcbiAgTjogeyBwYXR0ZXJuOiAnWzAtOWEtekEtWl0nLCBuZWdhdGU6ICdbXjAtOWEtekEtWl0nIH0sXG5cbiAgQTogeyBwYXR0ZXJuOiAnW2EtekEtWl0nLCBuZWdhdGU6ICdbXmEtekEtWl0nLCB0cmFuc2Zvcm06IHYgPT4gdi50b0xvY2FsZVVwcGVyQ2FzZSgpIH0sXG4gIGE6IHsgcGF0dGVybjogJ1thLXpBLVpdJywgbmVnYXRlOiAnW15hLXpBLVpdJywgdHJhbnNmb3JtOiB2ID0+IHYudG9Mb2NhbGVMb3dlckNhc2UoKSB9LFxuXG4gIFg6IHsgcGF0dGVybjogJ1swLTlhLXpBLVpdJywgbmVnYXRlOiAnW14wLTlhLXpBLVpdJywgdHJhbnNmb3JtOiB2ID0+IHYudG9Mb2NhbGVVcHBlckNhc2UoKSB9LFxuICB4OiB7IHBhdHRlcm46ICdbMC05YS16QS1aXScsIG5lZ2F0ZTogJ1teMC05YS16QS1aXScsIHRyYW5zZm9ybTogdiA9PiB2LnRvTG9jYWxlTG93ZXJDYXNlKCkgfVxufVxuXG5jb25zdCBLRVlTID0gT2JqZWN0LmtleXMoVE9LRU5TKVxuS0VZUy5mb3JFYWNoKGtleSA9PiB7XG4gIFRPS0VOU1sga2V5IF0ucmVnZXggPSBuZXcgUmVnRXhwKFRPS0VOU1sga2V5IF0ucGF0dGVybilcbn0pXG5cbmNvbnN0XG4gIHRva2VuUmVnZXhNYXNrID0gbmV3IFJlZ0V4cCgnXFxcXFxcXFwoW14uKis/XiR7fSgpfChbXFxcXF1dKXwoWy4qKz9eJHt9KCl8W1xcXFxdXSl8KFsnICsgS0VZUy5qb2luKCcnKSArICddKXwoLiknLCAnZycpLFxuICBlc2NSZWdleCA9IC9bLiorP14ke30oKXxbXFxdXFxcXF0vZ1xuXG5jb25zdCBNQVJLRVIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDEpXG5cbmV4cG9ydCBjb25zdCB1c2VNYXNrUHJvcHMgPSB7XG4gIG1hc2s6IFN0cmluZyxcbiAgcmV2ZXJzZUZpbGxNYXNrOiBCb29sZWFuLFxuICBmaWxsTWFzazogWyBCb29sZWFuLCBTdHJpbmcgXSxcbiAgdW5tYXNrZWRWYWx1ZTogQm9vbGVhblxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIGVtaXQsIGVtaXRWYWx1ZSwgaW5wdXRSZWYpIHtcbiAgbGV0IG1hc2tNYXJrZWQsIG1hc2tSZXBsYWNlZCwgY29tcHV0ZWRNYXNrLCBjb21wdXRlZFVubWFzaywgcGFzdGVkVGV4dFN0YXJ0LCBzZWxlY3Rpb25BbmNob3JcblxuICBjb25zdCBoYXNNYXNrID0gcmVmKG51bGwpXG4gIGNvbnN0IGlubmVyVmFsdWUgPSByZWYoZ2V0SW5pdGlhbE1hc2tlZFZhbHVlKCkpXG5cbiAgZnVuY3Rpb24gZ2V0SXNUeXBlVGV4dCAoKSB7XG4gICAgcmV0dXJuIHByb3BzLmF1dG9ncm93ID09PSB0cnVlXG4gICAgICB8fCBbICd0ZXh0YXJlYScsICd0ZXh0JywgJ3NlYXJjaCcsICd1cmwnLCAndGVsJywgJ3Bhc3N3b3JkJyBdLmluY2x1ZGVzKHByb3BzLnR5cGUpXG4gIH1cblxuICB3YXRjaCgoKSA9PiBwcm9wcy50eXBlICsgcHJvcHMuYXV0b2dyb3csIHVwZGF0ZU1hc2tJbnRlcm5hbHMpXG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMubWFzaywgdiA9PiB7XG4gICAgaWYgKHYgIT09IHZvaWQgMCkge1xuICAgICAgdXBkYXRlTWFza1ZhbHVlKGlubmVyVmFsdWUudmFsdWUsIHRydWUpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgY29uc3QgdmFsID0gdW5tYXNrVmFsdWUoaW5uZXJWYWx1ZS52YWx1ZSlcbiAgICAgIHVwZGF0ZU1hc2tJbnRlcm5hbHMoKVxuICAgICAgcHJvcHMubW9kZWxWYWx1ZSAhPT0gdmFsICYmIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgdmFsKVxuICAgIH1cbiAgfSlcblxuICB3YXRjaCgoKSA9PiBwcm9wcy5maWxsTWFzayArIHByb3BzLnJldmVyc2VGaWxsTWFzaywgKCkgPT4ge1xuICAgIGhhc01hc2sudmFsdWUgPT09IHRydWUgJiYgdXBkYXRlTWFza1ZhbHVlKGlubmVyVmFsdWUudmFsdWUsIHRydWUpXG4gIH0pXG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMudW5tYXNrZWRWYWx1ZSwgKCkgPT4ge1xuICAgIGhhc01hc2sudmFsdWUgPT09IHRydWUgJiYgdXBkYXRlTWFza1ZhbHVlKGlubmVyVmFsdWUudmFsdWUpXG4gIH0pXG5cbiAgZnVuY3Rpb24gZ2V0SW5pdGlhbE1hc2tlZFZhbHVlICgpIHtcbiAgICB1cGRhdGVNYXNrSW50ZXJuYWxzKClcblxuICAgIGlmIChoYXNNYXNrLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBjb25zdCBtYXNrZWQgPSBtYXNrVmFsdWUodW5tYXNrVmFsdWUocHJvcHMubW9kZWxWYWx1ZSkpXG5cbiAgICAgIHJldHVybiBwcm9wcy5maWxsTWFzayAhPT0gZmFsc2VcbiAgICAgICAgPyBmaWxsV2l0aE1hc2sobWFza2VkKVxuICAgICAgICA6IG1hc2tlZFxuICAgIH1cblxuICAgIHJldHVybiBwcm9wcy5tb2RlbFZhbHVlXG4gIH1cblxuICBmdW5jdGlvbiBnZXRQYWRkZWRNYXNrTWFya2VkIChzaXplKSB7XG4gICAgaWYgKHNpemUgPCBtYXNrTWFya2VkLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIG1hc2tNYXJrZWQuc2xpY2UoLXNpemUpXG4gICAgfVxuXG4gICAgbGV0IHBhZCA9ICcnLCBsb2NhbE1hc2tNYXJrZWQgPSBtYXNrTWFya2VkXG4gICAgY29uc3QgcGFkUG9zID0gbG9jYWxNYXNrTWFya2VkLmluZGV4T2YoTUFSS0VSKVxuXG4gICAgaWYgKHBhZFBvcyAhPT0gLTEpIHtcbiAgICAgIGZvciAobGV0IGkgPSBzaXplIC0gbG9jYWxNYXNrTWFya2VkLmxlbmd0aDsgaSA+IDA7IGktLSkge1xuICAgICAgICBwYWQgKz0gTUFSS0VSXG4gICAgICB9XG5cbiAgICAgIGxvY2FsTWFza01hcmtlZCA9IGxvY2FsTWFza01hcmtlZC5zbGljZSgwLCBwYWRQb3MpICsgcGFkICsgbG9jYWxNYXNrTWFya2VkLnNsaWNlKHBhZFBvcylcbiAgICB9XG5cbiAgICByZXR1cm4gbG9jYWxNYXNrTWFya2VkXG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVNYXNrSW50ZXJuYWxzICgpIHtcbiAgICBoYXNNYXNrLnZhbHVlID0gcHJvcHMubWFzayAhPT0gdm9pZCAwXG4gICAgICAmJiBwcm9wcy5tYXNrLmxlbmd0aCAhPT0gMFxuICAgICAgJiYgZ2V0SXNUeXBlVGV4dCgpXG5cbiAgICBpZiAoaGFzTWFzay52YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgIGNvbXB1dGVkVW5tYXNrID0gdm9pZCAwXG4gICAgICBtYXNrTWFya2VkID0gJydcbiAgICAgIG1hc2tSZXBsYWNlZCA9ICcnXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdFxuICAgICAgbG9jYWxDb21wdXRlZE1hc2sgPSBOQU1FRF9NQVNLU1sgcHJvcHMubWFzayBdID09PSB2b2lkIDBcbiAgICAgICAgPyBwcm9wcy5tYXNrXG4gICAgICAgIDogTkFNRURfTUFTS1NbIHByb3BzLm1hc2sgXSxcbiAgICAgIGZpbGxDaGFyID0gdHlwZW9mIHByb3BzLmZpbGxNYXNrID09PSAnc3RyaW5nJyAmJiBwcm9wcy5maWxsTWFzay5sZW5ndGggIT09IDBcbiAgICAgICAgPyBwcm9wcy5maWxsTWFzay5zbGljZSgwLCAxKVxuICAgICAgICA6ICdfJyxcbiAgICAgIGZpbGxDaGFyRXNjYXBlZCA9IGZpbGxDaGFyLnJlcGxhY2UoZXNjUmVnZXgsICdcXFxcJCYnKSxcbiAgICAgIHVubWFzayA9IFtdLFxuICAgICAgZXh0cmFjdCA9IFtdLFxuICAgICAgbWFzayA9IFtdXG5cbiAgICBsZXRcbiAgICAgIGZpcnN0TWF0Y2ggPSBwcm9wcy5yZXZlcnNlRmlsbE1hc2sgPT09IHRydWUsXG4gICAgICB1bm1hc2tDaGFyID0gJycsXG4gICAgICBuZWdhdGVDaGFyID0gJydcblxuICAgIGxvY2FsQ29tcHV0ZWRNYXNrLnJlcGxhY2UodG9rZW5SZWdleE1hc2ssIChfLCBjaGFyMSwgZXNjLCB0b2tlbiwgY2hhcjIpID0+IHtcbiAgICAgIGlmICh0b2tlbiAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGNvbnN0IGMgPSBUT0tFTlNbIHRva2VuIF1cbiAgICAgICAgbWFzay5wdXNoKGMpXG4gICAgICAgIG5lZ2F0ZUNoYXIgPSBjLm5lZ2F0ZVxuICAgICAgICBpZiAoZmlyc3RNYXRjaCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGV4dHJhY3QucHVzaCgnKD86JyArIG5lZ2F0ZUNoYXIgKyAnKyk/KCcgKyBjLnBhdHRlcm4gKyAnKyk/KD86JyArIG5lZ2F0ZUNoYXIgKyAnKyk/KCcgKyBjLnBhdHRlcm4gKyAnKyk/JylcbiAgICAgICAgICBmaXJzdE1hdGNoID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBleHRyYWN0LnB1c2goJyg/OicgKyBuZWdhdGVDaGFyICsgJyspPygnICsgYy5wYXR0ZXJuICsgJyk/JylcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGVzYyAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHVubWFza0NoYXIgPSAnXFxcXCcgKyAoZXNjID09PSAnXFxcXCcgPyAnJyA6IGVzYylcbiAgICAgICAgbWFzay5wdXNoKGVzYylcbiAgICAgICAgdW5tYXNrLnB1c2goJyhbXicgKyB1bm1hc2tDaGFyICsgJ10rKT8nICsgdW5tYXNrQ2hhciArICc/JylcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb25zdCBjID0gY2hhcjEgIT09IHZvaWQgMCA/IGNoYXIxIDogY2hhcjJcbiAgICAgICAgdW5tYXNrQ2hhciA9IGMgPT09ICdcXFxcJyA/ICdcXFxcXFxcXFxcXFxcXFxcJyA6IGMucmVwbGFjZShlc2NSZWdleCwgJ1xcXFxcXFxcJCYnKVxuICAgICAgICBtYXNrLnB1c2goYylcbiAgICAgICAgdW5tYXNrLnB1c2goJyhbXicgKyB1bm1hc2tDaGFyICsgJ10rKT8nICsgdW5tYXNrQ2hhciArICc/JylcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3RcbiAgICAgIHVubWFza01hdGNoZXIgPSBuZXcgUmVnRXhwKFxuICAgICAgICAnXidcbiAgICAgICAgKyB1bm1hc2suam9pbignJylcbiAgICAgICAgKyAnKCcgKyAodW5tYXNrQ2hhciA9PT0gJycgPyAnLicgOiAnW14nICsgdW5tYXNrQ2hhciArICddJykgKyAnKyk/J1xuICAgICAgICArICh1bm1hc2tDaGFyID09PSAnJyA/ICcnIDogJ1snICsgdW5tYXNrQ2hhciArICddKicpICsgJyQnXG4gICAgICApLFxuICAgICAgZXh0cmFjdExhc3QgPSBleHRyYWN0Lmxlbmd0aCAtIDEsXG4gICAgICBleHRyYWN0TWF0Y2hlciA9IGV4dHJhY3QubWFwKChyZSwgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKGluZGV4ID09PSAwICYmIHByb3BzLnJldmVyc2VGaWxsTWFzayA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHJldHVybiBuZXcgUmVnRXhwKCdeJyArIGZpbGxDaGFyRXNjYXBlZCArICcqJyArIHJlKVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGluZGV4ID09PSBleHRyYWN0TGFzdCkge1xuICAgICAgICAgIHJldHVybiBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgJ14nICsgcmVcbiAgICAgICAgICAgICsgJygnICsgKG5lZ2F0ZUNoYXIgPT09ICcnID8gJy4nIDogbmVnYXRlQ2hhcikgKyAnKyk/J1xuICAgICAgICAgICAgKyAocHJvcHMucmV2ZXJzZUZpbGxNYXNrID09PSB0cnVlID8gJyQnIDogZmlsbENoYXJFc2NhcGVkICsgJyonKVxuICAgICAgICAgIClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgUmVnRXhwKCdeJyArIHJlKVxuICAgICAgfSlcblxuICAgIGNvbXB1dGVkTWFzayA9IG1hc2tcbiAgICBjb21wdXRlZFVubWFzayA9IHZhbCA9PiB7XG4gICAgICBjb25zdCB1bm1hc2tNYXRjaCA9IHVubWFza01hdGNoZXIuZXhlYyhwcm9wcy5yZXZlcnNlRmlsbE1hc2sgPT09IHRydWUgPyB2YWwgOiB2YWwuc2xpY2UoMCwgbWFzay5sZW5ndGggKyAxKSlcbiAgICAgIGlmICh1bm1hc2tNYXRjaCAhPT0gbnVsbCkge1xuICAgICAgICB2YWwgPSB1bm1hc2tNYXRjaC5zbGljZSgxKS5qb2luKCcnKVxuICAgICAgfVxuXG4gICAgICBjb25zdFxuICAgICAgICBleHRyYWN0TWF0Y2ggPSBbXSxcbiAgICAgICAgZXh0cmFjdE1hdGNoZXJMZW5ndGggPSBleHRyYWN0TWF0Y2hlci5sZW5ndGhcblxuICAgICAgZm9yIChsZXQgaSA9IDAsIHN0ciA9IHZhbDsgaSA8IGV4dHJhY3RNYXRjaGVyTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgbSA9IGV4dHJhY3RNYXRjaGVyWyBpIF0uZXhlYyhzdHIpXG5cbiAgICAgICAgaWYgKG0gPT09IG51bGwpIHtcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG5cbiAgICAgICAgc3RyID0gc3RyLnNsaWNlKG0uc2hpZnQoKS5sZW5ndGgpXG4gICAgICAgIGV4dHJhY3RNYXRjaC5wdXNoKC4uLm0pXG4gICAgICB9XG4gICAgICBpZiAoZXh0cmFjdE1hdGNoLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICByZXR1cm4gZXh0cmFjdE1hdGNoLmpvaW4oJycpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB2YWxcbiAgICB9XG4gICAgbWFza01hcmtlZCA9IG1hc2subWFwKHYgPT4gKHR5cGVvZiB2ID09PSAnc3RyaW5nJyA/IHYgOiBNQVJLRVIpKS5qb2luKCcnKVxuICAgIG1hc2tSZXBsYWNlZCA9IG1hc2tNYXJrZWQuc3BsaXQoTUFSS0VSKS5qb2luKGZpbGxDaGFyKVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlTWFza1ZhbHVlIChyYXdWYWwsIHVwZGF0ZU1hc2tJbnRlcm5hbHNGbGFnLCBpbnB1dFR5cGUpIHtcbiAgICBjb25zdFxuICAgICAgaW5wID0gaW5wdXRSZWYudmFsdWUsXG4gICAgICBlbmQgPSBpbnAuc2VsZWN0aW9uRW5kLFxuICAgICAgZW5kUmV2ZXJzZSA9IGlucC52YWx1ZS5sZW5ndGggLSBlbmQsXG4gICAgICB1bm1hc2tlZCA9IHVubWFza1ZhbHVlKHJhd1ZhbClcblxuICAgIC8vIFVwZGF0ZSBoZXJlIHNvIHVubWFzayB1c2VzIHRoZSBvcmlnaW5hbCBmaWxsQ2hhclxuICAgIHVwZGF0ZU1hc2tJbnRlcm5hbHNGbGFnID09PSB0cnVlICYmIHVwZGF0ZU1hc2tJbnRlcm5hbHMoKVxuXG4gICAgY29uc3RcbiAgICAgIHByZU1hc2tlZCA9IG1hc2tWYWx1ZSh1bm1hc2tlZCksXG4gICAgICBtYXNrZWQgPSBwcm9wcy5maWxsTWFzayAhPT0gZmFsc2VcbiAgICAgICAgPyBmaWxsV2l0aE1hc2socHJlTWFza2VkKVxuICAgICAgICA6IHByZU1hc2tlZCxcbiAgICAgIGNoYW5nZWQgPSBpbm5lclZhbHVlLnZhbHVlICE9PSBtYXNrZWRcblxuICAgIC8vIFdlIHdhbnQgdG8gYXZvaWQgXCJmbGlja2VyaW5nXCIgc28gd2Ugc2V0IHZhbHVlIGltbWVkaWF0ZWx5XG4gICAgaW5wLnZhbHVlICE9PSBtYXNrZWQgJiYgKGlucC52YWx1ZSA9IG1hc2tlZClcblxuICAgIGNoYW5nZWQgPT09IHRydWUgJiYgKGlubmVyVmFsdWUudmFsdWUgPSBtYXNrZWQpXG5cbiAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBpbnAgJiYgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgaWYgKG1hc2tlZCA9PT0gbWFza1JlcGxhY2VkKSB7XG4gICAgICAgIGNvbnN0IGN1cnNvciA9IHByb3BzLnJldmVyc2VGaWxsTWFzayA9PT0gdHJ1ZSA/IG1hc2tSZXBsYWNlZC5sZW5ndGggOiAwXG4gICAgICAgIGlucC5zZXRTZWxlY3Rpb25SYW5nZShjdXJzb3IsIGN1cnNvciwgJ2ZvcndhcmQnKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKGlucHV0VHlwZSA9PT0gJ2luc2VydEZyb21QYXN0ZScgJiYgcHJvcHMucmV2ZXJzZUZpbGxNYXNrICE9PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IG1heEVuZCA9IGlucC5zZWxlY3Rpb25FbmRcbiAgICAgICAgbGV0IGN1cnNvciA9IGVuZCAtIDFcbiAgICAgICAgLy8gZWFjaCBub24tbWFya2VyIGNoYXIgbWVhbnMgd2UgbW92ZSBvbmNlIHRvIHJpZ2h0XG4gICAgICAgIGZvciAobGV0IGkgPSBwYXN0ZWRUZXh0U3RhcnQ7IGkgPD0gY3Vyc29yICYmIGkgPCBtYXhFbmQ7IGkrKykge1xuICAgICAgICAgIGlmIChtYXNrTWFya2VkWyBpIF0gIT09IE1BUktFUikge1xuICAgICAgICAgICAgY3Vyc29yKytcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBtb3ZlQ3Vyc29yLnJpZ2h0KGlucCwgY3Vyc29yKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKFsgJ2RlbGV0ZUNvbnRlbnRCYWNrd2FyZCcsICdkZWxldGVDb250ZW50Rm9yd2FyZCcgXS5pbmRleE9mKGlucHV0VHlwZSkgIT09IC0xKSB7XG4gICAgICAgIGNvbnN0IGN1cnNvciA9IHByb3BzLnJldmVyc2VGaWxsTWFzayA9PT0gdHJ1ZVxuICAgICAgICAgID8gKFxuICAgICAgICAgICAgICBlbmQgPT09IDBcbiAgICAgICAgICAgICAgICA/IChtYXNrZWQubGVuZ3RoID4gcHJlTWFza2VkLmxlbmd0aCA/IDEgOiAwKVxuICAgICAgICAgICAgICAgIDogTWF0aC5tYXgoMCwgbWFza2VkLmxlbmd0aCAtIChtYXNrZWQgPT09IG1hc2tSZXBsYWNlZCA/IDAgOiBNYXRoLm1pbihwcmVNYXNrZWQubGVuZ3RoLCBlbmRSZXZlcnNlKSArIDEpKSArIDFcbiAgICAgICAgICAgIClcbiAgICAgICAgICA6IGVuZFxuXG4gICAgICAgIGlucC5zZXRTZWxlY3Rpb25SYW5nZShjdXJzb3IsIGN1cnNvciwgJ2ZvcndhcmQnKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLnJldmVyc2VGaWxsTWFzayA9PT0gdHJ1ZSkge1xuICAgICAgICBpZiAoY2hhbmdlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNvbnN0IGN1cnNvciA9IE1hdGgubWF4KDAsIG1hc2tlZC5sZW5ndGggLSAobWFza2VkID09PSBtYXNrUmVwbGFjZWQgPyAwIDogTWF0aC5taW4ocHJlTWFza2VkLmxlbmd0aCwgZW5kUmV2ZXJzZSArIDEpKSlcblxuICAgICAgICAgIGlmIChjdXJzb3IgPT09IDEgJiYgZW5kID09PSAxKSB7XG4gICAgICAgICAgICBpbnAuc2V0U2VsZWN0aW9uUmFuZ2UoY3Vyc29yLCBjdXJzb3IsICdmb3J3YXJkJylcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBtb3ZlQ3Vyc29yLnJpZ2h0UmV2ZXJzZShpbnAsIGN1cnNvcilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgY29uc3QgY3Vyc29yID0gbWFza2VkLmxlbmd0aCAtIGVuZFJldmVyc2VcbiAgICAgICAgICBpbnAuc2V0U2VsZWN0aW9uUmFuZ2UoY3Vyc29yLCBjdXJzb3IsICdiYWNrd2FyZCcpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBpZiAoY2hhbmdlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNvbnN0IGN1cnNvciA9IE1hdGgubWF4KDAsIG1hc2tNYXJrZWQuaW5kZXhPZihNQVJLRVIpLCBNYXRoLm1pbihwcmVNYXNrZWQubGVuZ3RoLCBlbmQpIC0gMSlcbiAgICAgICAgICBtb3ZlQ3Vyc29yLnJpZ2h0KGlucCwgY3Vyc29yKVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGNvbnN0IGN1cnNvciA9IGVuZCAtIDFcbiAgICAgICAgICBtb3ZlQ3Vyc29yLnJpZ2h0KGlucCwgY3Vyc29yKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IHZhbCA9IHByb3BzLnVubWFza2VkVmFsdWUgPT09IHRydWVcbiAgICAgID8gdW5tYXNrVmFsdWUobWFza2VkKVxuICAgICAgOiBtYXNrZWRcblxuICAgIGlmIChcbiAgICAgIFN0cmluZyhwcm9wcy5tb2RlbFZhbHVlKSAhPT0gdmFsXG4gICAgICAmJiAocHJvcHMubW9kZWxWYWx1ZSAhPT0gbnVsbCB8fCB2YWwgIT09ICcnKVxuICAgICkge1xuICAgICAgZW1pdFZhbHVlKHZhbCwgdHJ1ZSlcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBtb3ZlQ3Vyc29yRm9yUGFzdGUgKGlucCwgc3RhcnQsIGVuZCkge1xuICAgIGNvbnN0IHByZU1hc2tlZCA9IG1hc2tWYWx1ZSh1bm1hc2tWYWx1ZShpbnAudmFsdWUpKVxuXG4gICAgc3RhcnQgPSBNYXRoLm1heCgwLCBtYXNrTWFya2VkLmluZGV4T2YoTUFSS0VSKSwgTWF0aC5taW4ocHJlTWFza2VkLmxlbmd0aCwgc3RhcnQpKVxuICAgIHBhc3RlZFRleHRTdGFydCA9IHN0YXJ0XG5cbiAgICBpbnAuc2V0U2VsZWN0aW9uUmFuZ2Uoc3RhcnQsIGVuZCwgJ2ZvcndhcmQnKVxuICB9XG5cbiAgY29uc3QgbW92ZUN1cnNvciA9IHtcbiAgICBsZWZ0IChpbnAsIGN1cnNvcikge1xuICAgICAgY29uc3Qgbm9NYXJrQmVmb3JlID0gbWFza01hcmtlZC5zbGljZShjdXJzb3IgLSAxKS5pbmRleE9mKE1BUktFUikgPT09IC0xXG4gICAgICBsZXQgaSA9IE1hdGgubWF4KDAsIGN1cnNvciAtIDEpXG5cbiAgICAgIGZvciAoOyBpID49IDA7IGktLSkge1xuICAgICAgICBpZiAobWFza01hcmtlZFsgaSBdID09PSBNQVJLRVIpIHtcbiAgICAgICAgICBjdXJzb3IgPSBpXG4gICAgICAgICAgbm9NYXJrQmVmb3JlID09PSB0cnVlICYmIGN1cnNvcisrXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIGkgPCAwXG4gICAgICAgICYmIG1hc2tNYXJrZWRbIGN1cnNvciBdICE9PSB2b2lkIDBcbiAgICAgICAgJiYgbWFza01hcmtlZFsgY3Vyc29yIF0gIT09IE1BUktFUlxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBtb3ZlQ3Vyc29yLnJpZ2h0KGlucCwgMClcbiAgICAgIH1cblxuICAgICAgY3Vyc29yID49IDAgJiYgaW5wLnNldFNlbGVjdGlvblJhbmdlKGN1cnNvciwgY3Vyc29yLCAnYmFja3dhcmQnKVxuICAgIH0sXG5cbiAgICByaWdodCAoaW5wLCBjdXJzb3IpIHtcbiAgICAgIGNvbnN0IGxpbWl0ID0gaW5wLnZhbHVlLmxlbmd0aFxuICAgICAgbGV0IGkgPSBNYXRoLm1pbihsaW1pdCwgY3Vyc29yICsgMSlcblxuICAgICAgZm9yICg7IGkgPD0gbGltaXQ7IGkrKykge1xuICAgICAgICBpZiAobWFza01hcmtlZFsgaSBdID09PSBNQVJLRVIpIHtcbiAgICAgICAgICBjdXJzb3IgPSBpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChtYXNrTWFya2VkWyBpIC0gMSBdID09PSBNQVJLRVIpIHtcbiAgICAgICAgICBjdXJzb3IgPSBpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICBpID4gbGltaXRcbiAgICAgICAgJiYgbWFza01hcmtlZFsgY3Vyc29yIC0gMSBdICE9PSB2b2lkIDBcbiAgICAgICAgJiYgbWFza01hcmtlZFsgY3Vyc29yIC0gMSBdICE9PSBNQVJLRVJcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gbW92ZUN1cnNvci5sZWZ0KGlucCwgbGltaXQpXG4gICAgICB9XG5cbiAgICAgIGlucC5zZXRTZWxlY3Rpb25SYW5nZShjdXJzb3IsIGN1cnNvciwgJ2ZvcndhcmQnKVxuICAgIH0sXG5cbiAgICBsZWZ0UmV2ZXJzZSAoaW5wLCBjdXJzb3IpIHtcbiAgICAgIGNvbnN0XG4gICAgICAgIGxvY2FsTWFza01hcmtlZCA9IGdldFBhZGRlZE1hc2tNYXJrZWQoaW5wLnZhbHVlLmxlbmd0aClcbiAgICAgIGxldCBpID0gTWF0aC5tYXgoMCwgY3Vyc29yIC0gMSlcblxuICAgICAgZm9yICg7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGlmIChsb2NhbE1hc2tNYXJrZWRbIGkgLSAxIF0gPT09IE1BUktFUikge1xuICAgICAgICAgIGN1cnNvciA9IGlcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGxvY2FsTWFza01hcmtlZFsgaSBdID09PSBNQVJLRVIpIHtcbiAgICAgICAgICBjdXJzb3IgPSBpXG4gICAgICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgaSA8IDBcbiAgICAgICAgJiYgbG9jYWxNYXNrTWFya2VkWyBjdXJzb3IgXSAhPT0gdm9pZCAwXG4gICAgICAgICYmIGxvY2FsTWFza01hcmtlZFsgY3Vyc29yIF0gIT09IE1BUktFUlxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBtb3ZlQ3Vyc29yLnJpZ2h0UmV2ZXJzZShpbnAsIDApXG4gICAgICB9XG5cbiAgICAgIGN1cnNvciA+PSAwICYmIGlucC5zZXRTZWxlY3Rpb25SYW5nZShjdXJzb3IsIGN1cnNvciwgJ2JhY2t3YXJkJylcbiAgICB9LFxuXG4gICAgcmlnaHRSZXZlcnNlIChpbnAsIGN1cnNvcikge1xuICAgICAgY29uc3RcbiAgICAgICAgbGltaXQgPSBpbnAudmFsdWUubGVuZ3RoLFxuICAgICAgICBsb2NhbE1hc2tNYXJrZWQgPSBnZXRQYWRkZWRNYXNrTWFya2VkKGxpbWl0KSxcbiAgICAgICAgbm9NYXJrQmVmb3JlID0gbG9jYWxNYXNrTWFya2VkLnNsaWNlKDAsIGN1cnNvciArIDEpLmluZGV4T2YoTUFSS0VSKSA9PT0gLTFcbiAgICAgIGxldCBpID0gTWF0aC5taW4obGltaXQsIGN1cnNvciArIDEpXG5cbiAgICAgIGZvciAoOyBpIDw9IGxpbWl0OyBpKyspIHtcbiAgICAgICAgaWYgKGxvY2FsTWFza01hcmtlZFsgaSAtIDEgXSA9PT0gTUFSS0VSKSB7XG4gICAgICAgICAgY3Vyc29yID0gaVxuICAgICAgICAgIGN1cnNvciA+IDAgJiYgbm9NYXJrQmVmb3JlID09PSB0cnVlICYmIGN1cnNvci0tXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIGkgPiBsaW1pdFxuICAgICAgICAmJiBsb2NhbE1hc2tNYXJrZWRbIGN1cnNvciAtIDEgXSAhPT0gdm9pZCAwXG4gICAgICAgICYmIGxvY2FsTWFza01hcmtlZFsgY3Vyc29yIC0gMSBdICE9PSBNQVJLRVJcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gbW92ZUN1cnNvci5sZWZ0UmV2ZXJzZShpbnAsIGxpbWl0KVxuICAgICAgfVxuXG4gICAgICBpbnAuc2V0U2VsZWN0aW9uUmFuZ2UoY3Vyc29yLCBjdXJzb3IsICdmb3J3YXJkJylcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbk1hc2tlZENsaWNrIChlKSB7XG4gICAgZW1pdCgnY2xpY2snLCBlKVxuXG4gICAgc2VsZWN0aW9uQW5jaG9yID0gdm9pZCAwXG4gIH1cblxuICBmdW5jdGlvbiBvbk1hc2tlZEtleWRvd24gKGUpIHtcbiAgICBlbWl0KCdrZXlkb3duJywgZSlcblxuICAgIGlmIChcbiAgICAgIHNob3VsZElnbm9yZUtleShlKSA9PT0gdHJ1ZVxuICAgICAgfHwgZS5hbHRLZXkgPT09IHRydWUgLy8gbGV0IGJyb3dzZXIgaGFuZGxlIHRoZXNlXG4gICAgKSByZXR1cm5cblxuICAgIGNvbnN0XG4gICAgICBpbnAgPSBpbnB1dFJlZi52YWx1ZSxcbiAgICAgIHN0YXJ0ID0gaW5wLnNlbGVjdGlvblN0YXJ0LFxuICAgICAgZW5kID0gaW5wLnNlbGVjdGlvbkVuZFxuXG4gICAgaWYgKCFlLnNoaWZ0S2V5KSB7XG4gICAgICBzZWxlY3Rpb25BbmNob3IgPSB2b2lkIDBcbiAgICB9XG5cbiAgICBpZiAoZS5rZXlDb2RlID09PSAzNyB8fCBlLmtleUNvZGUgPT09IDM5KSB7IC8vIExlZnQgLyBSaWdodFxuICAgICAgaWYgKGUuc2hpZnRLZXkgJiYgc2VsZWN0aW9uQW5jaG9yID09PSB2b2lkIDApIHtcbiAgICAgICAgc2VsZWN0aW9uQW5jaG9yID0gaW5wLnNlbGVjdGlvbkRpcmVjdGlvbiA9PT0gJ2ZvcndhcmQnID8gc3RhcnQgOiBlbmRcbiAgICAgIH1cblxuICAgICAgY29uc3QgZm4gPSBtb3ZlQ3Vyc29yWyAoZS5rZXlDb2RlID09PSAzOSA/ICdyaWdodCcgOiAnbGVmdCcpICsgKHByb3BzLnJldmVyc2VGaWxsTWFzayA9PT0gdHJ1ZSA/ICdSZXZlcnNlJyA6ICcnKSBdXG5cbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgZm4oaW5wLCBzZWxlY3Rpb25BbmNob3IgPT09IHN0YXJ0ID8gZW5kIDogc3RhcnQpXG5cbiAgICAgIGlmIChlLnNoaWZ0S2V5KSB7XG4gICAgICAgIGNvbnN0IGN1cnNvciA9IGlucC5zZWxlY3Rpb25TdGFydFxuICAgICAgICBpbnAuc2V0U2VsZWN0aW9uUmFuZ2UoTWF0aC5taW4oc2VsZWN0aW9uQW5jaG9yLCBjdXJzb3IpLCBNYXRoLm1heChzZWxlY3Rpb25BbmNob3IsIGN1cnNvciksICdmb3J3YXJkJylcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoXG4gICAgICBlLmtleUNvZGUgPT09IDggLy8gQmFja3NwYWNlXG4gICAgICAmJiBwcm9wcy5yZXZlcnNlRmlsbE1hc2sgIT09IHRydWVcbiAgICAgICYmIHN0YXJ0ID09PSBlbmRcbiAgICApIHtcbiAgICAgIG1vdmVDdXJzb3IubGVmdChpbnAsIHN0YXJ0KVxuICAgICAgaW5wLnNldFNlbGVjdGlvblJhbmdlKGlucC5zZWxlY3Rpb25TdGFydCwgZW5kLCAnYmFja3dhcmQnKVxuICAgIH1cbiAgICBlbHNlIGlmIChcbiAgICAgIGUua2V5Q29kZSA9PT0gNDYgLy8gRGVsZXRlXG4gICAgICAmJiBwcm9wcy5yZXZlcnNlRmlsbE1hc2sgPT09IHRydWVcbiAgICAgICYmIHN0YXJ0ID09PSBlbmRcbiAgICApIHtcbiAgICAgIG1vdmVDdXJzb3IucmlnaHRSZXZlcnNlKGlucCwgZW5kKVxuICAgICAgaW5wLnNldFNlbGVjdGlvblJhbmdlKHN0YXJ0LCBpbnAuc2VsZWN0aW9uRW5kLCAnZm9yd2FyZCcpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbWFza1ZhbHVlICh2YWwpIHtcbiAgICBpZiAodmFsID09PSB2b2lkIDAgfHwgdmFsID09PSBudWxsIHx8IHZhbCA9PT0gJycpIHsgcmV0dXJuICcnIH1cblxuICAgIGlmIChwcm9wcy5yZXZlcnNlRmlsbE1hc2sgPT09IHRydWUpIHtcbiAgICAgIHJldHVybiBtYXNrVmFsdWVSZXZlcnNlKHZhbClcbiAgICB9XG5cbiAgICBjb25zdCBtYXNrID0gY29tcHV0ZWRNYXNrXG5cbiAgICBsZXQgdmFsSW5kZXggPSAwLCBvdXRwdXQgPSAnJ1xuXG4gICAgZm9yIChsZXQgbWFza0luZGV4ID0gMDsgbWFza0luZGV4IDwgbWFzay5sZW5ndGg7IG1hc2tJbmRleCsrKSB7XG4gICAgICBjb25zdFxuICAgICAgICB2YWxDaGFyID0gdmFsWyB2YWxJbmRleCBdLFxuICAgICAgICBtYXNrRGVmID0gbWFza1sgbWFza0luZGV4IF1cblxuICAgICAgaWYgKHR5cGVvZiBtYXNrRGVmID09PSAnc3RyaW5nJykge1xuICAgICAgICBvdXRwdXQgKz0gbWFza0RlZlxuICAgICAgfVxuICAgICAgZWxzZSBpZiAodmFsQ2hhciAhPT0gdm9pZCAwICYmIG1hc2tEZWYucmVnZXgudGVzdCh2YWxDaGFyKSkge1xuICAgICAgICBvdXRwdXQgKz0gbWFza0RlZi50cmFuc2Zvcm0gIT09IHZvaWQgMFxuICAgICAgICAgID8gbWFza0RlZi50cmFuc2Zvcm0odmFsQ2hhcilcbiAgICAgICAgICA6IHZhbENoYXJcbiAgICAgICAgdmFsSW5kZXgrK1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBvdXRwdXRcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb3V0cHV0XG4gIH1cblxuICBmdW5jdGlvbiBtYXNrVmFsdWVSZXZlcnNlICh2YWwpIHtcbiAgICBjb25zdFxuICAgICAgbWFzayA9IGNvbXB1dGVkTWFzayxcbiAgICAgIGZpcnN0VG9rZW5JbmRleCA9IG1hc2tNYXJrZWQuaW5kZXhPZihNQVJLRVIpXG5cbiAgICBsZXQgdmFsSW5kZXggPSB2YWwubGVuZ3RoIC0gMSwgb3V0cHV0ID0gJydcblxuICAgIGZvciAobGV0IG1hc2tJbmRleCA9IG1hc2subGVuZ3RoIC0gMTsgbWFza0luZGV4ID49IDAgJiYgdmFsSW5kZXggIT09IC0xOyBtYXNrSW5kZXgtLSkge1xuICAgICAgY29uc3QgbWFza0RlZiA9IG1hc2tbIG1hc2tJbmRleCBdXG5cbiAgICAgIGxldCB2YWxDaGFyID0gdmFsWyB2YWxJbmRleCBdXG5cbiAgICAgIGlmICh0eXBlb2YgbWFza0RlZiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgb3V0cHV0ID0gbWFza0RlZiArIG91dHB1dFxuICAgICAgfVxuICAgICAgZWxzZSBpZiAodmFsQ2hhciAhPT0gdm9pZCAwICYmIG1hc2tEZWYucmVnZXgudGVzdCh2YWxDaGFyKSkge1xuICAgICAgICBkbyB7XG4gICAgICAgICAgb3V0cHV0ID0gKG1hc2tEZWYudHJhbnNmb3JtICE9PSB2b2lkIDAgPyBtYXNrRGVmLnRyYW5zZm9ybSh2YWxDaGFyKSA6IHZhbENoYXIpICsgb3V0cHV0XG4gICAgICAgICAgdmFsSW5kZXgtLVxuICAgICAgICAgIHZhbENoYXIgPSB2YWxbIHZhbEluZGV4IF1cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVubW9kaWZpZWQtbG9vcC1jb25kaXRpb25cbiAgICAgICAgfSB3aGlsZSAoZmlyc3RUb2tlbkluZGV4ID09PSBtYXNrSW5kZXggJiYgdmFsQ2hhciAhPT0gdm9pZCAwICYmIG1hc2tEZWYucmVnZXgudGVzdCh2YWxDaGFyKSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gb3V0cHV0XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dHB1dFxuICB9XG5cbiAgZnVuY3Rpb24gdW5tYXNrVmFsdWUgKHZhbCkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsICE9PSAnc3RyaW5nJyB8fCBjb21wdXRlZFVubWFzayA9PT0gdm9pZCAwXG4gICAgICA/ICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJyA/IGNvbXB1dGVkVW5tYXNrKCcnICsgdmFsKSA6IHZhbClcbiAgICAgIDogY29tcHV0ZWRVbm1hc2sodmFsKVxuICB9XG5cbiAgZnVuY3Rpb24gZmlsbFdpdGhNYXNrICh2YWwpIHtcbiAgICBpZiAobWFza1JlcGxhY2VkLmxlbmd0aCAtIHZhbC5sZW5ndGggPD0gMCkge1xuICAgICAgcmV0dXJuIHZhbFxuICAgIH1cblxuICAgIHJldHVybiBwcm9wcy5yZXZlcnNlRmlsbE1hc2sgPT09IHRydWUgJiYgdmFsLmxlbmd0aCAhPT0gMFxuICAgICAgPyBtYXNrUmVwbGFjZWQuc2xpY2UoMCwgLXZhbC5sZW5ndGgpICsgdmFsXG4gICAgICA6IHZhbCArIG1hc2tSZXBsYWNlZC5zbGljZSh2YWwubGVuZ3RoKVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBpbm5lclZhbHVlLFxuICAgIGhhc01hc2ssXG4gICAgbW92ZUN1cnNvckZvclBhc3RlLFxuICAgIHVwZGF0ZU1hc2tWYWx1ZSxcbiAgICBvbk1hc2tlZEtleWRvd24sXG4gICAgb25NYXNrZWRDbGlja1xuICB9XG59XG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCB3YXRjaCwgb25CZWZvcmVVbm1vdW50LCBvbk1vdW50ZWQsIG5leHRUaWNrLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VGaWVsZCwgeyB1c2VGaWVsZFN0YXRlLCB1c2VGaWVsZFByb3BzLCB1c2VGaWVsZEVtaXRzLCBmaWVsZFZhbHVlSXNGaWxsZWQgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1maWVsZC91c2UtZmllbGQuanMnXG5pbXBvcnQgdXNlTWFzaywgeyB1c2VNYXNrUHJvcHMgfSBmcm9tICcuL3VzZS1tYXNrLmpzJ1xuaW1wb3J0IHsgdXNlRm9ybVByb3BzLCB1c2VGb3JtSW5wdXROYW1lQXR0ciB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3VzZS1mb3JtL3ByaXZhdGUudXNlLWZvcm0uanMnXG5pbXBvcnQgdXNlRmlsZUZvcm1Eb21Qcm9wcyBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1maWxlL3VzZS1maWxlLWRvbS1wcm9wcy5qcydcbmltcG9ydCB1c2VLZXlDb21wb3NpdGlvbiBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1rZXktY29tcG9zaXRpb24vdXNlLWtleS1jb21wb3NpdGlvbi5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgc3RvcCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50L2V2ZW50LmpzJ1xuaW1wb3J0IHsgYWRkRm9jdXNGbiB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuZm9jdXMvZm9jdXMtbWFuYWdlci5qcydcbmltcG9ydCB7IGluamVjdFByb3AgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmluamVjdC1vYmotcHJvcC9pbmplY3Qtb2JqLXByb3AuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRSW5wdXQnLFxuXG4gIGluaGVyaXRBdHRyczogZmFsc2UsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VGaWVsZFByb3BzLFxuICAgIC4uLnVzZU1hc2tQcm9wcyxcbiAgICAuLi51c2VGb3JtUHJvcHMsXG5cbiAgICAvLyBvdmVycmlkZSBvZiB1c2VGaWVsZFByb3BzID4gbW9kZWxWYWx1ZVxuICAgIG1vZGVsVmFsdWU6IF9fUVVBU0FSX1NTUl9TRVJWRVJfX1xuICAgICAgPyB7fSAvLyBTU1IgZG9lcyBub3Qga25vdyBhYm91dCBGaWxlTGlzdFxuICAgICAgOiBbIFN0cmluZywgTnVtYmVyLCBGaWxlTGlzdCBdLFxuXG4gICAgc2hhZG93VGV4dDogU3RyaW5nLFxuXG4gICAgdHlwZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ3RleHQnXG4gICAgfSxcblxuICAgIGRlYm91bmNlOiBbIFN0cmluZywgTnVtYmVyIF0sXG5cbiAgICBhdXRvZ3JvdzogQm9vbGVhbiwgLy8gbWFrZXMgYSB0ZXh0YXJlYVxuXG4gICAgaW5wdXRDbGFzczogWyBBcnJheSwgU3RyaW5nLCBPYmplY3QgXSxcbiAgICBpbnB1dFN0eWxlOiBbIEFycmF5LCBTdHJpbmcsIE9iamVjdCBdXG4gIH0sXG5cbiAgZW1pdHM6IFtcbiAgICAuLi51c2VGaWVsZEVtaXRzLFxuICAgICdwYXN0ZScsICdjaGFuZ2UnLFxuICAgICdrZXlkb3duJywgJ2NsaWNrJywgJ2FuaW1hdGlvbmVuZCdcbiAgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgZW1pdCwgYXR0cnMgfSkge1xuICAgIGNvbnN0IHsgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgeyAkcSB9ID0gcHJveHlcblxuICAgIGNvbnN0IHRlbXAgPSB7fVxuICAgIGxldCBlbWl0Q2FjaGVkVmFsdWUgPSBOYU4sIHR5cGVkTnVtYmVyLCBzdG9wVmFsdWVXYXRjaGVyLCBlbWl0VGltZXIgPSBudWxsLCBlbWl0VmFsdWVGblxuXG4gICAgY29uc3QgaW5wdXRSZWYgPSByZWYobnVsbClcbiAgICBjb25zdCBuYW1lUHJvcCA9IHVzZUZvcm1JbnB1dE5hbWVBdHRyKHByb3BzKVxuXG4gICAgY29uc3Qge1xuICAgICAgaW5uZXJWYWx1ZSxcbiAgICAgIGhhc01hc2ssXG4gICAgICBtb3ZlQ3Vyc29yRm9yUGFzdGUsXG4gICAgICB1cGRhdGVNYXNrVmFsdWUsXG4gICAgICBvbk1hc2tlZEtleWRvd24sXG4gICAgICBvbk1hc2tlZENsaWNrXG4gICAgfSA9IHVzZU1hc2socHJvcHMsIGVtaXQsIGVtaXRWYWx1ZSwgaW5wdXRSZWYpXG5cbiAgICBjb25zdCBmb3JtRG9tUHJvcHMgPSB1c2VGaWxlRm9ybURvbVByb3BzKHByb3BzLCAvKiB0eXBlIGd1YXJkICovIHRydWUpXG4gICAgY29uc3QgaGFzVmFsdWUgPSBjb21wdXRlZCgoKSA9PiBmaWVsZFZhbHVlSXNGaWxsZWQoaW5uZXJWYWx1ZS52YWx1ZSkpXG5cbiAgICBjb25zdCBvbkNvbXBvc2l0aW9uID0gdXNlS2V5Q29tcG9zaXRpb24ob25JbnB1dClcblxuICAgIGNvbnN0IHN0YXRlID0gdXNlRmllbGRTdGF0ZSh7IGNoYW5nZUV2ZW50OiB0cnVlIH0pXG5cbiAgICBjb25zdCBpc1RleHRhcmVhID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLnR5cGUgPT09ICd0ZXh0YXJlYScgfHwgcHJvcHMuYXV0b2dyb3cgPT09IHRydWVcbiAgICApXG5cbiAgICBjb25zdCBpc1R5cGVUZXh0ID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIGlzVGV4dGFyZWEudmFsdWUgPT09IHRydWVcbiAgICAgIHx8IFsgJ3RleHQnLCAnc2VhcmNoJywgJ3VybCcsICd0ZWwnLCAncGFzc3dvcmQnIF0uaW5jbHVkZXMocHJvcHMudHlwZSlcbiAgICApXG5cbiAgICBjb25zdCBvbkV2ZW50cyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGV2dCA9IHtcbiAgICAgICAgLi4uc3RhdGUuc3BsaXRBdHRycy5saXN0ZW5lcnMudmFsdWUsXG4gICAgICAgIG9uSW5wdXQsXG4gICAgICAgIG9uUGFzdGUsXG4gICAgICAgIC8vIFNhZmFyaSA8IDEwLjIgJiBVSVdlYlZpZXcgZG9lc24ndCBmaXJlIGNvbXBvc2l0aW9uZW5kIHdoZW5cbiAgICAgICAgLy8gc3dpdGNoaW5nIGZvY3VzIGJlZm9yZSBjb25maXJtaW5nIGNvbXBvc2l0aW9uIGNob2ljZVxuICAgICAgICAvLyB0aGlzIGFsc28gZml4ZXMgdGhlIGlzc3VlIHdoZXJlIHNvbWUgYnJvd3NlcnMgZS5nLiBpT1MgQ2hyb21lXG4gICAgICAgIC8vIGZpcmVzIFwiY2hhbmdlXCIgaW5zdGVhZCBvZiBcImlucHV0XCIgb24gYXV0b2NvbXBsZXRlLlxuICAgICAgICBvbkNoYW5nZSxcbiAgICAgICAgb25CbHVyOiBvbkZpbmlzaEVkaXRpbmcsXG4gICAgICAgIG9uRm9jdXM6IHN0b3BcbiAgICAgIH1cblxuICAgICAgZXZ0Lm9uQ29tcG9zaXRpb25zdGFydCA9IGV2dC5vbkNvbXBvc2l0aW9udXBkYXRlID0gZXZ0Lm9uQ29tcG9zaXRpb25lbmQgPSBvbkNvbXBvc2l0aW9uXG5cbiAgICAgIGlmIChoYXNNYXNrLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGV2dC5vbktleWRvd24gPSBvbk1hc2tlZEtleWRvd25cbiAgICAgICAgLy8gcmVzZXQgc2VsZWN0aW9uIGFuY2hvciBvbiBwb2ludGVyIHNlbGVjdGlvblxuICAgICAgICBldnQub25DbGljayA9IG9uTWFza2VkQ2xpY2tcbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLmF1dG9ncm93ID09PSB0cnVlKSB7XG4gICAgICAgIGV2dC5vbkFuaW1hdGlvbmVuZCA9IG9uQW5pbWF0aW9uZW5kXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBldnRcbiAgICB9KVxuXG4gICAgY29uc3QgaW5wdXRBdHRycyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGF0dHJzID0ge1xuICAgICAgICB0YWJpbmRleDogMCxcbiAgICAgICAgJ2RhdGEtYXV0b2ZvY3VzJzogcHJvcHMuYXV0b2ZvY3VzID09PSB0cnVlIHx8IHZvaWQgMCxcbiAgICAgICAgcm93czogcHJvcHMudHlwZSA9PT0gJ3RleHRhcmVhJyA/IDYgOiB2b2lkIDAsXG4gICAgICAgICdhcmlhLWxhYmVsJzogcHJvcHMubGFiZWwsXG4gICAgICAgIG5hbWU6IG5hbWVQcm9wLnZhbHVlLFxuICAgICAgICAuLi5zdGF0ZS5zcGxpdEF0dHJzLmF0dHJpYnV0ZXMudmFsdWUsXG4gICAgICAgIGlkOiBzdGF0ZS50YXJnZXRVaWQudmFsdWUsXG4gICAgICAgIG1heGxlbmd0aDogcHJvcHMubWF4bGVuZ3RoLFxuICAgICAgICBkaXNhYmxlZDogcHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSxcbiAgICAgICAgcmVhZG9ubHk6IHByb3BzLnJlYWRvbmx5ID09PSB0cnVlXG4gICAgICB9XG5cbiAgICAgIGlmIChpc1RleHRhcmVhLnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICBhdHRycy50eXBlID0gcHJvcHMudHlwZVxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMuYXV0b2dyb3cgPT09IHRydWUpIHtcbiAgICAgICAgYXR0cnMucm93cyA9IDFcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGF0dHJzXG4gICAgfSlcblxuICAgIC8vIHNvbWUgYnJvd3NlcnMgbG9zZSB0aGUgbmF0aXZlIGlucHV0IHZhbHVlXG4gICAgLy8gc28gd2UgbmVlZCB0byByZWF0dGFjaCBpdCBkeW5hbWljYWxseVxuICAgIC8vIChsaWtlIHR5cGU9XCJwYXNzd29yZFwiIDwtPiB0eXBlPVwidGV4dFwiOyBzZWUgIzEyMDc4KVxuICAgIHdhdGNoKCgpID0+IHByb3BzLnR5cGUsICgpID0+IHtcbiAgICAgIGlmIChpbnB1dFJlZi52YWx1ZSkge1xuICAgICAgICBpbnB1dFJlZi52YWx1ZS52YWx1ZSA9IHByb3BzLm1vZGVsVmFsdWVcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMubW9kZWxWYWx1ZSwgdiA9PiB7XG4gICAgICBpZiAoaGFzTWFzay52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBpZiAoc3RvcFZhbHVlV2F0Y2hlciA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHN0b3BWYWx1ZVdhdGNoZXIgPSBmYWxzZVxuICAgICAgICAgIGlmIChTdHJpbmcodikgPT09IGVtaXRDYWNoZWRWYWx1ZSkgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGVNYXNrVmFsdWUodilcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGlubmVyVmFsdWUudmFsdWUgIT09IHYpIHtcbiAgICAgICAgaW5uZXJWYWx1ZS52YWx1ZSA9IHZcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgcHJvcHMudHlwZSA9PT0gJ251bWJlcidcbiAgICAgICAgICAmJiB0ZW1wLmhhc093blByb3BlcnR5KCd2YWx1ZScpID09PSB0cnVlXG4gICAgICAgICkge1xuICAgICAgICAgIGlmICh0eXBlZE51bWJlciA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdHlwZWROdW1iZXIgPSBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0ZW1wLnZhbHVlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHRleHRhcmVhIG9ubHlcbiAgICAgIHByb3BzLmF1dG9ncm93ID09PSB0cnVlICYmIG5leHRUaWNrKGFkanVzdEhlaWdodClcbiAgICB9KVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMuYXV0b2dyb3csIHZhbCA9PiB7XG4gICAgICAvLyB0ZXh0YXJlYSBvbmx5XG4gICAgICBpZiAodmFsID09PSB0cnVlKSB7XG4gICAgICAgIG5leHRUaWNrKGFkanVzdEhlaWdodClcbiAgICAgIH1cbiAgICAgIC8vIGlmIGl0IGhhcyBhIG51bWJlciBvZiByb3dzIHNldCByZXNwZWN0IGl0XG4gICAgICBlbHNlIGlmIChpbnB1dFJlZi52YWx1ZSAhPT0gbnVsbCAmJiBhdHRycy5yb3dzID4gMCkge1xuICAgICAgICBpbnB1dFJlZi52YWx1ZS5zdHlsZS5oZWlnaHQgPSAnYXV0bydcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMuZGVuc2UsICgpID0+IHtcbiAgICAgIHByb3BzLmF1dG9ncm93ID09PSB0cnVlICYmIG5leHRUaWNrKGFkanVzdEhlaWdodClcbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gZm9jdXMgKCkge1xuICAgICAgYWRkRm9jdXNGbigoKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudFxuICAgICAgICBpZiAoXG4gICAgICAgICAgaW5wdXRSZWYudmFsdWUgIT09IG51bGxcbiAgICAgICAgICAmJiBpbnB1dFJlZi52YWx1ZSAhPT0gZWxcbiAgICAgICAgICAmJiAoZWwgPT09IG51bGwgfHwgZWwuaWQgIT09IHN0YXRlLnRhcmdldFVpZC52YWx1ZSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgaW5wdXRSZWYudmFsdWUuZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2VsZWN0ICgpIHtcbiAgICAgIGlucHV0UmVmLnZhbHVlPy5zZWxlY3QoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uUGFzdGUgKGUpIHtcbiAgICAgIGlmIChoYXNNYXNrLnZhbHVlID09PSB0cnVlICYmIHByb3BzLnJldmVyc2VGaWxsTWFzayAhPT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBpbnAgPSBlLnRhcmdldFxuICAgICAgICBtb3ZlQ3Vyc29yRm9yUGFzdGUoaW5wLCBpbnAuc2VsZWN0aW9uU3RhcnQsIGlucC5zZWxlY3Rpb25FbmQpXG4gICAgICB9XG5cbiAgICAgIGVtaXQoJ3Bhc3RlJywgZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbklucHV0IChlKSB7XG4gICAgICBpZiAoIWUgfHwgIWUudGFyZ2V0KSByZXR1cm5cblxuICAgICAgaWYgKHByb3BzLnR5cGUgPT09ICdmaWxlJykge1xuICAgICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIGUudGFyZ2V0LmZpbGVzKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3QgdmFsID0gZS50YXJnZXQudmFsdWVcblxuICAgICAgaWYgKGUudGFyZ2V0LnFDb21wb3NpbmcgPT09IHRydWUpIHtcbiAgICAgICAgdGVtcC52YWx1ZSA9IHZhbFxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKGhhc01hc2sudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgdXBkYXRlTWFza1ZhbHVlKHZhbCwgZmFsc2UsIGUuaW5wdXRUeXBlKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGVtaXRWYWx1ZSh2YWwpXG5cbiAgICAgICAgaWYgKGlzVHlwZVRleHQudmFsdWUgPT09IHRydWUgJiYgZS50YXJnZXQgPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICBjb25zdCB7IHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmQgfSA9IGUudGFyZ2V0XG5cbiAgICAgICAgICBpZiAoc2VsZWN0aW9uU3RhcnQgIT09IHZvaWQgMCAmJiBzZWxlY3Rpb25FbmQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZS50YXJnZXQgPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiYgdmFsLmluZGV4T2YoZS50YXJnZXQudmFsdWUpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZS50YXJnZXQuc2V0U2VsZWN0aW9uUmFuZ2Uoc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gd2UgbmVlZCB0byB0cmlnZ2VyIGl0IGltbWVkaWF0ZWx5IHRvbyxcbiAgICAgIC8vIHRvIGF2b2lkIFwiZmxpY2tlcmluZ1wiXG4gICAgICBwcm9wcy5hdXRvZ3JvdyA9PT0gdHJ1ZSAmJiBhZGp1c3RIZWlnaHQoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uQW5pbWF0aW9uZW5kIChlKSB7XG4gICAgICBlbWl0KCdhbmltYXRpb25lbmQnLCBlKVxuICAgICAgYWRqdXN0SGVpZ2h0KClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlbWl0VmFsdWUgKHZhbCwgc3RvcFdhdGNoZXIpIHtcbiAgICAgIGVtaXRWYWx1ZUZuID0gKCkgPT4ge1xuICAgICAgICBlbWl0VGltZXIgPSBudWxsXG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIHByb3BzLnR5cGUgIT09ICdudW1iZXInXG4gICAgICAgICAgJiYgdGVtcC5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSA9PT0gdHJ1ZVxuICAgICAgICApIHtcbiAgICAgICAgICBkZWxldGUgdGVtcC52YWx1ZVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb3BzLm1vZGVsVmFsdWUgIT09IHZhbCAmJiBlbWl0Q2FjaGVkVmFsdWUgIT09IHZhbCkge1xuICAgICAgICAgIGVtaXRDYWNoZWRWYWx1ZSA9IHZhbFxuXG4gICAgICAgICAgc3RvcFdhdGNoZXIgPT09IHRydWUgJiYgKHN0b3BWYWx1ZVdhdGNoZXIgPSB0cnVlKVxuICAgICAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgdmFsKVxuXG4gICAgICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgICAgZW1pdENhY2hlZFZhbHVlID09PSB2YWwgJiYgKGVtaXRDYWNoZWRWYWx1ZSA9IE5hTilcbiAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgZW1pdFZhbHVlRm4gPSB2b2lkIDBcbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLnR5cGUgPT09ICdudW1iZXInKSB7XG4gICAgICAgIHR5cGVkTnVtYmVyID0gdHJ1ZVxuICAgICAgICB0ZW1wLnZhbHVlID0gdmFsXG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9wcy5kZWJvdW5jZSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGVtaXRUaW1lciAhPT0gbnVsbCAmJiBjbGVhclRpbWVvdXQoZW1pdFRpbWVyKVxuICAgICAgICB0ZW1wLnZhbHVlID0gdmFsXG4gICAgICAgIGVtaXRUaW1lciA9IHNldFRpbWVvdXQoZW1pdFZhbHVlRm4sIHByb3BzLmRlYm91bmNlKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGVtaXRWYWx1ZUZuKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB0ZXh0YXJlYSBvbmx5XG4gICAgZnVuY3Rpb24gYWRqdXN0SGVpZ2h0ICgpIHtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGlucCA9IGlucHV0UmVmLnZhbHVlXG4gICAgICAgIGlmIChpbnAgIT09IG51bGwpIHtcbiAgICAgICAgICBjb25zdCBwYXJlbnRTdHlsZSA9IGlucC5wYXJlbnROb2RlLnN0eWxlXG4gICAgICAgICAgLy8gY2hyb21lIGRvZXMgbm90IGtlZXAgc2Nyb2xsICMxNTQ5OFxuICAgICAgICAgIGNvbnN0IHsgc2Nyb2xsVG9wIH0gPSBpbnBcbiAgICAgICAgICAvLyBjaHJvbWUgY2FsY3VsYXRlcyBhIHNtYWxsZXIgc2Nyb2xsSGVpZ2h0IHdoZW4gaW4gYSAuY29sdW1uIGNvbnRhaW5lclxuICAgICAgICAgIGNvbnN0IHsgb3ZlcmZsb3dZLCBtYXhIZWlnaHQgfSA9ICRxLnBsYXRmb3JtLmlzLmZpcmVmb3ggPT09IHRydWVcbiAgICAgICAgICAgID8ge31cbiAgICAgICAgICAgIDogd2luZG93LmdldENvbXB1dGVkU3R5bGUoaW5wKVxuICAgICAgICAgIC8vIG9uIGZpcmVmb3ggb3IgaWYgb3ZlcmZsb3dZIGlzIHNwZWNpZmllZCBhcyBzY3JvbGwgIzE0MjYzLCAjMTQzNDRcbiAgICAgICAgICAvLyB3ZSBkb24ndCB0b3VjaCBvdmVyZmxvd1xuICAgICAgICAgIC8vIGZpcmVmb3ggaXMgbm90IHNvIGJhZCBpbiB0aGUgZW5kXG4gICAgICAgICAgY29uc3QgY2hhbmdlT3ZlcmZsb3cgPSBvdmVyZmxvd1kgIT09IHZvaWQgMCAmJiBvdmVyZmxvd1kgIT09ICdzY3JvbGwnXG5cbiAgICAgICAgICAvLyByZXNldCBoZWlnaHQgb2YgdGV4dGFyZWEgdG8gYSBzbWFsbCBzaXplIHRvIGRldGVjdCB0aGUgcmVhbCBoZWlnaHRcbiAgICAgICAgICAvLyBidXQga2VlcCB0aGUgdG90YWwgY29udHJvbCBzaXplIHRoZSBzYW1lXG4gICAgICAgICAgY2hhbmdlT3ZlcmZsb3cgPT09IHRydWUgJiYgKGlucC5zdHlsZS5vdmVyZmxvd1kgPSAnaGlkZGVuJylcbiAgICAgICAgICBwYXJlbnRTdHlsZS5tYXJnaW5Cb3R0b20gPSAoaW5wLnNjcm9sbEhlaWdodCAtIDEpICsgJ3B4J1xuICAgICAgICAgIGlucC5zdHlsZS5oZWlnaHQgPSAnMXB4J1xuXG4gICAgICAgICAgaW5wLnN0eWxlLmhlaWdodCA9IGlucC5zY3JvbGxIZWlnaHQgKyAncHgnXG4gICAgICAgICAgLy8gd2Ugc2hvdWxkIGFsbG93IHNjcm9sbGJhcnMgb25seVxuICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIG1heEhlaWdodCBhbmQgY29udGVudCBpcyB0YWxsZXIgdGhhbiBtYXhIZWlnaHRcbiAgICAgICAgICBjaGFuZ2VPdmVyZmxvdyA9PT0gdHJ1ZSAmJiAoaW5wLnN0eWxlLm92ZXJmbG93WSA9IHBhcnNlSW50KG1heEhlaWdodCwgMTApIDwgaW5wLnNjcm9sbEhlaWdodCA/ICdhdXRvJyA6ICdoaWRkZW4nKVxuICAgICAgICAgIHBhcmVudFN0eWxlLm1hcmdpbkJvdHRvbSA9ICcnXG4gICAgICAgICAgaW5wLnNjcm9sbFRvcCA9IHNjcm9sbFRvcFxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uQ2hhbmdlIChlKSB7XG4gICAgICBvbkNvbXBvc2l0aW9uKGUpXG5cbiAgICAgIGlmIChlbWl0VGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KGVtaXRUaW1lcilcbiAgICAgICAgZW1pdFRpbWVyID0gbnVsbFxuICAgICAgfVxuXG4gICAgICBlbWl0VmFsdWVGbj8uKClcblxuICAgICAgZW1pdCgnY2hhbmdlJywgZS50YXJnZXQudmFsdWUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25GaW5pc2hFZGl0aW5nIChlKSB7XG4gICAgICBlICE9PSB2b2lkIDAgJiYgc3RvcChlKVxuXG4gICAgICBpZiAoZW1pdFRpbWVyICE9PSBudWxsKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChlbWl0VGltZXIpXG4gICAgICAgIGVtaXRUaW1lciA9IG51bGxcbiAgICAgIH1cblxuICAgICAgZW1pdFZhbHVlRm4/LigpXG5cbiAgICAgIHR5cGVkTnVtYmVyID0gZmFsc2VcbiAgICAgIHN0b3BWYWx1ZVdhdGNoZXIgPSBmYWxzZVxuICAgICAgZGVsZXRlIHRlbXAudmFsdWVcblxuICAgICAgLy8gd2UgbmVlZCB0byB1c2Ugc2V0VGltZW91dCBpbnN0ZWFkIG9mIHRoaXMuJG5leHRUaWNrXG4gICAgICAvLyB0byBhdm9pZCBhIGJ1ZyB3aGVyZSBmb2N1c291dCBpcyBub3QgZW1pdHRlZCBmb3IgdHlwZSBkYXRlL3RpbWUvd2Vlay8uLi5cbiAgICAgIHByb3BzLnR5cGUgIT09ICdmaWxlJyAmJiBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKGlucHV0UmVmLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgaW5wdXRSZWYudmFsdWUudmFsdWUgPSBpbm5lclZhbHVlLnZhbHVlICE9PSB2b2lkIDAgPyBpbm5lclZhbHVlLnZhbHVlIDogJydcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRDdXJWYWx1ZSAoKSB7XG4gICAgICByZXR1cm4gdGVtcC5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSA9PT0gdHJ1ZVxuICAgICAgICA/IHRlbXAudmFsdWVcbiAgICAgICAgOiAoaW5uZXJWYWx1ZS52YWx1ZSAhPT0gdm9pZCAwID8gaW5uZXJWYWx1ZS52YWx1ZSA6ICcnKVxuICAgIH1cblxuICAgIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgICBvbkZpbmlzaEVkaXRpbmcoKVxuICAgIH0pXG5cbiAgICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgICAgLy8gdGV4dGFyZWEgb25seVxuICAgICAgcHJvcHMuYXV0b2dyb3cgPT09IHRydWUgJiYgYWRqdXN0SGVpZ2h0KClcbiAgICB9KVxuXG4gICAgT2JqZWN0LmFzc2lnbihzdGF0ZSwge1xuICAgICAgaW5uZXJWYWx1ZSxcblxuICAgICAgZmllbGRDbGFzczogY29tcHV0ZWQoKCkgPT5cbiAgICAgICAgYHEtJHsgaXNUZXh0YXJlYS52YWx1ZSA9PT0gdHJ1ZSA/ICd0ZXh0YXJlYScgOiAnaW5wdXQnIH1gXG4gICAgICAgICsgKHByb3BzLmF1dG9ncm93ID09PSB0cnVlID8gJyBxLXRleHRhcmVhLS1hdXRvZ3JvdycgOiAnJylcbiAgICAgICksXG5cbiAgICAgIGhhc1NoYWRvdzogY29tcHV0ZWQoKCkgPT5cbiAgICAgICAgcHJvcHMudHlwZSAhPT0gJ2ZpbGUnXG4gICAgICAgICYmIHR5cGVvZiBwcm9wcy5zaGFkb3dUZXh0ID09PSAnc3RyaW5nJ1xuICAgICAgICAmJiBwcm9wcy5zaGFkb3dUZXh0Lmxlbmd0aCAhPT0gMFxuICAgICAgKSxcblxuICAgICAgaW5wdXRSZWYsXG5cbiAgICAgIGVtaXRWYWx1ZSxcblxuICAgICAgaGFzVmFsdWUsXG5cbiAgICAgIGZsb2F0aW5nTGFiZWw6IGNvbXB1dGVkKCgpID0+XG4gICAgICAgIChcbiAgICAgICAgICBoYXNWYWx1ZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgICYmIChwcm9wcy50eXBlICE9PSAnbnVtYmVyJyB8fCBpc05hTihpbm5lclZhbHVlLnZhbHVlKSA9PT0gZmFsc2UpXG4gICAgICAgIClcbiAgICAgICAgfHwgZmllbGRWYWx1ZUlzRmlsbGVkKHByb3BzLmRpc3BsYXlWYWx1ZSlcbiAgICAgICksXG5cbiAgICAgIGdldENvbnRyb2w6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGgoaXNUZXh0YXJlYS52YWx1ZSA9PT0gdHJ1ZSA/ICd0ZXh0YXJlYScgOiAnaW5wdXQnLCB7XG4gICAgICAgICAgcmVmOiBpbnB1dFJlZixcbiAgICAgICAgICBjbGFzczogW1xuICAgICAgICAgICAgJ3EtZmllbGRfX25hdGl2ZSBxLXBsYWNlaG9sZGVyJyxcbiAgICAgICAgICAgIHByb3BzLmlucHV0Q2xhc3NcbiAgICAgICAgICBdLFxuICAgICAgICAgIHN0eWxlOiBwcm9wcy5pbnB1dFN0eWxlLFxuICAgICAgICAgIC4uLmlucHV0QXR0cnMudmFsdWUsXG4gICAgICAgICAgLi4ub25FdmVudHMudmFsdWUsXG4gICAgICAgICAgLi4uKFxuICAgICAgICAgICAgcHJvcHMudHlwZSAhPT0gJ2ZpbGUnXG4gICAgICAgICAgICAgID8geyB2YWx1ZTogZ2V0Q3VyVmFsdWUoKSB9XG4gICAgICAgICAgICAgIDogZm9ybURvbVByb3BzLnZhbHVlXG4gICAgICAgICAgKVxuICAgICAgICB9KVxuICAgICAgfSxcblxuICAgICAgZ2V0U2hhZG93Q29udHJvbDogKCkgPT4ge1xuICAgICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS1maWVsZF9fbmF0aXZlIHEtZmllbGRfX3NoYWRvdyBhYnNvbHV0ZS1ib3R0b20gbm8tcG9pbnRlci1ldmVudHMnXG4gICAgICAgICAgICArIChpc1RleHRhcmVhLnZhbHVlID09PSB0cnVlID8gJycgOiAnIHRleHQtbm8td3JhcCcpXG4gICAgICAgIH0sIFtcbiAgICAgICAgICBoKCdzcGFuJywgeyBjbGFzczogJ2ludmlzaWJsZScgfSwgZ2V0Q3VyVmFsdWUoKSksXG4gICAgICAgICAgaCgnc3BhbicsIHByb3BzLnNoYWRvd1RleHQpXG4gICAgICAgIF0pXG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IHJlbmRlckZuID0gdXNlRmllbGQoc3RhdGUpXG5cbiAgICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgICBPYmplY3QuYXNzaWduKHByb3h5LCB7XG4gICAgICBmb2N1cyxcbiAgICAgIHNlbGVjdCxcbiAgICAgIGdldE5hdGl2ZUVsZW1lbnQ6ICgpID0+IGlucHV0UmVmLnZhbHVlIC8vIGRlcHJlY2F0ZWRcbiAgICB9KVxuXG4gICAgaW5qZWN0UHJvcChwcm94eSwgJ25hdGl2ZUVsJywgKCkgPT4gaW5wdXRSZWYudmFsdWUpXG5cbiAgICByZXR1cm4gcmVuZGVyRm5cbiAgfVxufSlcbiJdLCJuYW1lcyI6WyJhdHRycyJdLCJtYXBwaW5n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T0FBTyxNQUFNLE9BQ3BDLEtBQUssUUFDSixXQUFXLFVBQVUsU0FBUyxXQUFXLFFBQVE7QUFBQSxJQUN4RDtBQUVBLG9CQUFnQixNQUFNO0FBQ3BCLHNCQUFBO0FBQUEsSUFDRixDQUFDO0FBRUQsY0FBVSxNQUFNO0FBRWQsWUFBTSxhQUFhLFFBQVEsYUFBQTtBQUFBLElBQzdCLENBQUM7QUFFRCxXQUFPLE9BQU8sT0FBTztBQUFBLE1BQ25CO0FBQUEsTUFFQSxZQUFZO0FBQUEsUUFBUyxNQUNuQixLQUFNLFdBQVcsVUFBVSxPQUFPLGFBQWEsT0FBUSxNQUNwRCxNQUFNLGFBQWEsT0FBTywwQkFBMEI7QUFBQSxNQUFBO0FBQUEsTUFHekQsV0FBVztBQUFBLFFBQVMsTUFDbEIsTUFBTSxTQUFTLFVBQ1osT0FBTyxNQUFNLGVBQWUsWUFDNUIsTUFBTSxXQUFXLFdBQVc7QUFBQSxNQUFBO0FBQUEsTUFHakM7QUFBQSxNQUVBO0FBQUEsTUFFQTtBQUFBLE1BRUEsZUFBZTtBQUFBLFFBQVMsTUFFcEIsU0FBUyxVQUFVLFNBQ2YsTUFBTSxTQUFTLFlBQVksTUFBTSxXQUFXLEtBQUssTUFBTSxVQUUxRCxtQkFBbUIsTUFBTSxZQUFZO0FBQUEsTUFBQTtBQUFBLE1BRzFDLFlBQVksTUFBTTtBQUNoQixlQUFPLEVBQUUsV0FBVyxVQUFVLE9BQU8sYUFBYSxTQUFTO0FBQUEsVUFDekQsS0FBSztBQUFBLFVBQ0wsT0FBTztBQUFBLFlBQ0w7QUFBQSxZQUNBLE1BQU07QUFBQSxVQUFBO0FBQUEsVUFFUixPQUFPLE1BQU07QUFBQSxVQUNiLEdBQUcsV0FBVztBQUFBLFVBQ2QsR0FBRyxTQUFTO0FBQUEsVUFDWixHQUNFLE1BQU0sU0FBUyxTQUNYLEVBQUUsT0FBTyxZQUFBLEVBQVksSUFDckIsYUFBYTtBQUFBLFFBQUEsQ0FFcEI7QUFBQSxNQUNIO0FBQUEsTUFFQSxrQkFBa0IsTUFBTTtBQUN0QixlQUFPLEVBQUUsT0FBTztBQUFBLFVBQ2QsT0FBTyx1RUFDRixXQUFXLFVBQVUsT0FBTyxLQUFLO0FBQUEsUUFBQSxHQUNyQztBQUFBLFVBQ0QsRUFBRSxRQUFRLEVBQUUsT0FBTyxZQUFBLEdBQWUsYUFBYTtBQUFBLFVBQy9DLEVBQUUsUUFBUSxNQUFNLFVBQVU7QUFBQSxRQUFBLENBQzNCO0FBQUEsTUFDSDtBQUFBLElBQUEsQ0FDRDtBQUVELFVBQU0sV0FBVyxTQUFTLEtBQUs7QUFHL0IsV0FBTyxPQUFPLE9BQU87QUFBQSxNQUNuQjtBQUFBLE1BQ0E7QUFBQSxNQUNBLGtCQUFrQixNQUFNLFNBQVM7QUFBQTtBQUFBLElBQUEsQ0FDbEM7QUFFRCxlQUFXLE9BQU8sWUFBWSxNQUFNLFNBQVMsS0FBSztBQUVsRCxXQUFPO0FBQUEsRUFDVDtBQUNGLENBQUM7IiwieF9nb29nbGVfaWdub3JlTGlzdCI6WzAsMV19
