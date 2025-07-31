import { a as ref, c as computed, h, at as useSizeProps, H as getCurrentInstance, au as useSize, av as toRaw, ai as hMergeSlot, J as hSlot, D as stopAndPrevent, L as createComponent, k as QIcon } from "./index-BXn1qSjA.js";
import { u as useDarkProps, c as useDark } from "./KeypadButton.vue_vue_type_style_index_0_scoped_4cc0fc91_lang-B0Vue97M.js";
import { u as useFormProps, a as useFormInject } from "./private.use-form-DlR7USk8.js";
function useRefocusTarget(props, rootRef) {
  const refocusRef = ref(null);
  const refocusTargetEl = computed(() => {
    if (props.disable === true) {
      return null;
    }
    return h("span", {
      ref: refocusRef,
      class: "no-outline",
      tabindex: -1
    });
  });
  function refocusTarget(e) {
    const root = rootRef.value;
    if ((e == null ? void 0 : e.qAvoidFocus) === true) return;
    if ((e == null ? void 0 : e.type.indexOf("key")) === 0) {
      if (document.activeElement !== root && (root == null ? void 0 : root.contains(document.activeElement)) === true) {
        root.focus();
      }
    } else if (refocusRef.value !== null && (e === void 0 || (root == null ? void 0 : root.contains(e.target)) === true)) {
      refocusRef.value.focus();
    }
  }
  return {
    refocusTargetEl,
    refocusTarget
  };
}
const optionSizes = {
  xs: 30,
  sm: 35,
  md: 40,
  lg: 50,
  xl: 60
};
const useCheckboxProps = {
  ...useDarkProps,
  ...useSizeProps,
  ...useFormProps,
  modelValue: {
    required: true,
    default: null
  },
  val: {},
  trueValue: { default: true },
  falseValue: { default: false },
  indeterminateValue: { default: null },
  checkedIcon: String,
  uncheckedIcon: String,
  indeterminateIcon: String,
  toggleOrder: {
    type: String,
    validator: (v) => v === "tf" || v === "ft"
  },
  toggleIndeterminate: Boolean,
  label: String,
  leftLabel: Boolean,
  color: String,
  keepColor: Boolean,
  dense: Boolean,
  disable: Boolean,
  tabindex: [String, Number]
};
const useCheckboxEmits = ["update:modelValue"];
function useCheckbox(type, getInner) {
  const { props, slots, emit, proxy } = getCurrentInstance();
  const { $q } = proxy;
  const isDark = useDark(props, $q);
  const rootRef = ref(null);
  const { refocusTargetEl, refocusTarget } = useRefocusTarget(props, rootRef);
  const sizeStyle = useSize(props, optionSizes);
  const modelIsArray = computed(
    () => props.val !== void 0 && Array.isArray(props.modelValue)
  );
  const index = computed(() => {
    const val = toRaw(props.val);
    return modelIsArray.value === true ? props.modelValue.findIndex((opt) => toRaw(opt) === val) : -1;
  });
  const isTrue = computed(() => modelIsArray.value === true ? index.value !== -1 : toRaw(props.modelValue) === toRaw(props.trueValue));
  const isFalse = computed(() => modelIsArray.value === true ? index.value === -1 : toRaw(props.modelValue) === toRaw(props.falseValue));
  const isIndeterminate = computed(
    () => isTrue.value === false && isFalse.value === false
  );
  const tabindex = computed(() => props.disable === true ? -1 : props.tabindex || 0);
  const classes = computed(
    () => `q-${type} cursor-pointer no-outline row inline no-wrap items-center` + (props.disable === true ? " disabled" : "") + (isDark.value === true ? ` q-${type}--dark` : "") + (props.dense === true ? ` q-${type}--dense` : "") + (props.leftLabel === true ? " reverse" : "")
  );
  const innerClass = computed(() => {
    const state = isTrue.value === true ? "truthy" : isFalse.value === true ? "falsy" : "indet";
    const color = props.color !== void 0 && (props.keepColor === true || isTrue.value === true) ? ` text-${props.color}` : "";
    return `q-${type}__inner relative-position non-selectable q-${type}__inner--${state}${color}`;
  });
  const formAttrs = computed(() => {
    const prop = { type: "checkbox" };
    props.name !== void 0 && Object.assign(prop, {
      // see https://vuejs.org/guide/extras/render-function.html#creating-vnodes (.prop)
      ".checked": isTrue.value,
      "^checked": isTrue.value === true ? "checked" : void 0,
      name: props.name,
      value: modelIsArray.value === true ? props.val : props.trueValue
    });
    return prop;
  });
  const injectFormInput = useFormInject(formAttrs);
  const attributes = computed(() => {
    const attrs = {
      tabindex: tabindex.value,
      role: "switch",
      "aria-label": props.label,
      "aria-checked": isIndeterminate.value === true ? "mixed" : isTrue.value === true ? "true" : "false"
    };
    if (props.disable === true) {
      attrs["aria-disabled"] = "true";
    }
    return attrs;
  });
  function onClick(e) {
    if (e !== void 0) {
      stopAndPrevent(e);
      refocusTarget(e);
    }
    if (props.disable !== true) {
      emit("update:modelValue", getNextValue(), e);
    }
  }
  function getNextValue() {
    if (modelIsArray.value === true) {
      if (isTrue.value === true) {
        const val = props.modelValue.slice();
        val.splice(index.value, 1);
        return val;
      }
      return props.modelValue.concat([props.val]);
    }
    if (isTrue.value === true) {
      if (props.toggleOrder !== "ft" || props.toggleIndeterminate === false) {
        return props.falseValue;
      }
    } else if (isFalse.value === true) {
      if (props.toggleOrder === "ft" || props.toggleIndeterminate === false) {
        return props.trueValue;
      }
    } else {
      return props.toggleOrder !== "ft" ? props.trueValue : props.falseValue;
    }
    return props.indeterminateValue;
  }
  function onKeydown(e) {
    if (e.keyCode === 13 || e.keyCode === 32) {
      stopAndPrevent(e);
    }
  }
  function onKeyup(e) {
    if (e.keyCode === 13 || e.keyCode === 32) {
      onClick(e);
    }
  }
  const getInnerContent = getInner(isTrue, isIndeterminate);
  Object.assign(proxy, { toggle: onClick });
  return () => {
    const inner = getInnerContent();
    props.disable !== true && injectFormInput(
      inner,
      "unshift",
      ` q-${type}__native absolute q-ma-none q-pa-none`
    );
    const child = [
      h("div", {
        class: innerClass.value,
        style: sizeStyle.value,
        "aria-hidden": "true"
      }, inner)
    ];
    if (refocusTargetEl.value !== null) {
      child.push(refocusTargetEl.value);
    }
    const label = props.label !== void 0 ? hMergeSlot(slots.default, [props.label]) : hSlot(slots.default);
    label !== void 0 && child.push(
      h("div", {
        class: `q-${type}__label q-anchor--skip`
      }, label)
    );
    return h("div", {
      ref: rootRef,
      class: classes.value,
      ...attributes.value,
      onClick,
      onKeydown,
      onKeyup
    }, child);
  };
}
const QToggle = createComponent({
  name: "QToggle",
  props: {
    ...useCheckboxProps,
    icon: String,
    iconColor: String
  },
  emits: useCheckboxEmits,
  setup(props) {
    function getInner(isTrue, isIndeterminate) {
      const icon = computed(
        () => (isTrue.value === true ? props.checkedIcon : isIndeterminate.value === true ? props.indeterminateIcon : props.uncheckedIcon) || props.icon
      );
      const color = computed(() => isTrue.value === true ? props.iconColor : null);
      return () => [
        h("div", { class: "q-toggle__track" }),
        h(
          "div",
          {
            class: "q-toggle__thumb absolute flex flex-center no-wrap"
          },
          icon.value !== void 0 ? [
            h(QIcon, {
              name: icon.value,
              color: color.value
            })
          ] : void 0
        )
      ];
    }
    return useCheckbox("toggle", getInner);
  }
});
export {
  QToggle as Q
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUVRvZ2dsZS1WOFN0N0cydy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtcmVmb2N1cy10YXJnZXQvdXNlLXJlZm9jdXMtdGFyZ2V0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvcHJpdmF0ZS5vcHRpb24tc2l6ZXMvb3B0aW9uLXNpemVzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9jaGVja2JveC91c2UtY2hlY2tib3guanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3RvZ2dsZS9RVG9nZ2xlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGgsIGNvbXB1dGVkLCByZWYgfSBmcm9tICd2dWUnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcm9vdFJlZikge1xuICBjb25zdCByZWZvY3VzUmVmID0gcmVmKG51bGwpXG5cbiAgY29uc3QgcmVmb2N1c1RhcmdldEVsID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGlmIChwcm9wcy5kaXNhYmxlID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIHJldHVybiBoKCdzcGFuJywge1xuICAgICAgcmVmOiByZWZvY3VzUmVmLFxuICAgICAgY2xhc3M6ICduby1vdXRsaW5lJyxcbiAgICAgIHRhYmluZGV4OiAtMVxuICAgIH0pXG4gIH0pXG5cbiAgZnVuY3Rpb24gcmVmb2N1c1RhcmdldCAoZSkge1xuICAgIGNvbnN0IHJvb3QgPSByb290UmVmLnZhbHVlXG5cbiAgICBpZiAoZT8ucUF2b2lkRm9jdXMgPT09IHRydWUpIHJldHVyblxuXG4gICAgaWYgKGU/LnR5cGUuaW5kZXhPZigna2V5JykgPT09IDApIHtcbiAgICAgIGlmIChcbiAgICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gcm9vdFxuICAgICAgICAmJiByb290Py5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSA9PT0gdHJ1ZVxuICAgICAgKSB7XG4gICAgICAgIHJvb3QuZm9jdXMoKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChcbiAgICAgIHJlZm9jdXNSZWYudmFsdWUgIT09IG51bGxcbiAgICAgICYmICgoZSA9PT0gdm9pZCAwKSB8fCAocm9vdD8uY29udGFpbnMoZS50YXJnZXQpID09PSB0cnVlKSlcbiAgICApIHtcbiAgICAgIHJlZm9jdXNSZWYudmFsdWUuZm9jdXMoKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcmVmb2N1c1RhcmdldEVsLFxuICAgIHJlZm9jdXNUYXJnZXRcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQge1xuICB4czogMzAsXG4gIHNtOiAzNSxcbiAgbWQ6IDQwLFxuICBsZzogNTAsXG4gIHhsOiA2MFxufVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgZ2V0Q3VycmVudEluc3RhbmNlLCB0b1JhdyB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtZGFyay91c2UtZGFyay5qcydcbmltcG9ydCB1c2VTaXplLCB7IHVzZVNpemVQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLXNpemUvdXNlLXNpemUuanMnXG5pbXBvcnQgdXNlUmVmb2N1c1RhcmdldCBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1yZWZvY3VzLXRhcmdldC91c2UtcmVmb2N1cy10YXJnZXQuanMnXG5pbXBvcnQgeyB1c2VGb3JtSW5qZWN0LCB1c2VGb3JtUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy91c2UtZm9ybS9wcml2YXRlLnVzZS1mb3JtLmpzJ1xuXG5pbXBvcnQgb3B0aW9uU2l6ZXMgZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5vcHRpb24tc2l6ZXMvb3B0aW9uLXNpemVzLmpzJ1xuaW1wb3J0IHsgc3RvcEFuZFByZXZlbnQgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC9ldmVudC5qcydcbmltcG9ydCB7IGhTbG90LCBoTWVyZ2VTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuXG5leHBvcnQgY29uc3QgdXNlQ2hlY2tib3hQcm9wcyA9IHtcbiAgLi4udXNlRGFya1Byb3BzLFxuICAuLi51c2VTaXplUHJvcHMsXG4gIC4uLnVzZUZvcm1Qcm9wcyxcblxuICBtb2RlbFZhbHVlOiB7XG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgZGVmYXVsdDogbnVsbFxuICB9LFxuICB2YWw6IHt9LFxuXG4gIHRydWVWYWx1ZTogeyBkZWZhdWx0OiB0cnVlIH0sXG4gIGZhbHNlVmFsdWU6IHsgZGVmYXVsdDogZmFsc2UgfSxcbiAgaW5kZXRlcm1pbmF0ZVZhbHVlOiB7IGRlZmF1bHQ6IG51bGwgfSxcblxuICBjaGVja2VkSWNvbjogU3RyaW5nLFxuICB1bmNoZWNrZWRJY29uOiBTdHJpbmcsXG4gIGluZGV0ZXJtaW5hdGVJY29uOiBTdHJpbmcsXG5cbiAgdG9nZ2xlT3JkZXI6IHtcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgdmFsaWRhdG9yOiB2ID0+IHYgPT09ICd0ZicgfHwgdiA9PT0gJ2Z0J1xuICB9LFxuICB0b2dnbGVJbmRldGVybWluYXRlOiBCb29sZWFuLFxuXG4gIGxhYmVsOiBTdHJpbmcsXG4gIGxlZnRMYWJlbDogQm9vbGVhbixcblxuICBjb2xvcjogU3RyaW5nLFxuICBrZWVwQ29sb3I6IEJvb2xlYW4sXG4gIGRlbnNlOiBCb29sZWFuLFxuXG4gIGRpc2FibGU6IEJvb2xlYW4sXG4gIHRhYmluZGV4OiBbIFN0cmluZywgTnVtYmVyIF1cbn1cblxuZXhwb3J0IGNvbnN0IHVzZUNoZWNrYm94RW1pdHMgPSBbICd1cGRhdGU6bW9kZWxWYWx1ZScgXVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAodHlwZSwgZ2V0SW5uZXIpIHtcbiAgY29uc3QgeyBwcm9wcywgc2xvdHMsIGVtaXQsIHByb3h5IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICBjb25zdCB7ICRxIH0gPSBwcm94eVxuXG4gIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsICRxKVxuXG4gIGNvbnN0IHJvb3RSZWYgPSByZWYobnVsbClcbiAgY29uc3QgeyByZWZvY3VzVGFyZ2V0RWwsIHJlZm9jdXNUYXJnZXQgfSA9IHVzZVJlZm9jdXNUYXJnZXQocHJvcHMsIHJvb3RSZWYpXG4gIGNvbnN0IHNpemVTdHlsZSA9IHVzZVNpemUocHJvcHMsIG9wdGlvblNpemVzKVxuXG4gIGNvbnN0IG1vZGVsSXNBcnJheSA9IGNvbXB1dGVkKCgpID0+XG4gICAgcHJvcHMudmFsICE9PSB2b2lkIDAgJiYgQXJyYXkuaXNBcnJheShwcm9wcy5tb2RlbFZhbHVlKVxuICApXG5cbiAgY29uc3QgaW5kZXggPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgY29uc3QgdmFsID0gdG9SYXcocHJvcHMudmFsKVxuICAgIHJldHVybiBtb2RlbElzQXJyYXkudmFsdWUgPT09IHRydWVcbiAgICAgID8gcHJvcHMubW9kZWxWYWx1ZS5maW5kSW5kZXgob3B0ID0+IHRvUmF3KG9wdCkgPT09IHZhbClcbiAgICAgIDogLTFcbiAgfSlcblxuICBjb25zdCBpc1RydWUgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgbW9kZWxJc0FycmF5LnZhbHVlID09PSB0cnVlXG4gICAgICA/IGluZGV4LnZhbHVlICE9PSAtMVxuICAgICAgOiB0b1Jhdyhwcm9wcy5tb2RlbFZhbHVlKSA9PT0gdG9SYXcocHJvcHMudHJ1ZVZhbHVlKVxuICApKVxuXG4gIGNvbnN0IGlzRmFsc2UgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgbW9kZWxJc0FycmF5LnZhbHVlID09PSB0cnVlXG4gICAgICA/IGluZGV4LnZhbHVlID09PSAtMVxuICAgICAgOiB0b1Jhdyhwcm9wcy5tb2RlbFZhbHVlKSA9PT0gdG9SYXcocHJvcHMuZmFsc2VWYWx1ZSlcbiAgKSlcblxuICBjb25zdCBpc0luZGV0ZXJtaW5hdGUgPSBjb21wdXRlZCgoKSA9PlxuICAgIGlzVHJ1ZS52YWx1ZSA9PT0gZmFsc2UgJiYgaXNGYWxzZS52YWx1ZSA9PT0gZmFsc2VcbiAgKVxuXG4gIGNvbnN0IHRhYmluZGV4ID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgIHByb3BzLmRpc2FibGUgPT09IHRydWUgPyAtMSA6IHByb3BzLnRhYmluZGV4IHx8IDBcbiAgKSlcblxuICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICBgcS0keyB0eXBlIH0gY3Vyc29yLXBvaW50ZXIgbm8tb3V0bGluZSByb3cgaW5saW5lIG5vLXdyYXAgaXRlbXMtY2VudGVyYFxuICAgICsgKHByb3BzLmRpc2FibGUgPT09IHRydWUgPyAnIGRpc2FibGVkJyA6ICcnKVxuICAgICsgKGlzRGFyay52YWx1ZSA9PT0gdHJ1ZSA/IGAgcS0keyB0eXBlIH0tLWRhcmtgIDogJycpXG4gICAgKyAocHJvcHMuZGVuc2UgPT09IHRydWUgPyBgIHEtJHsgdHlwZSB9LS1kZW5zZWAgOiAnJylcbiAgICArIChwcm9wcy5sZWZ0TGFiZWwgPT09IHRydWUgPyAnIHJldmVyc2UnIDogJycpXG4gIClcblxuICBjb25zdCBpbm5lckNsYXNzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGNvbnN0IHN0YXRlID0gaXNUcnVlLnZhbHVlID09PSB0cnVlID8gJ3RydXRoeScgOiAoaXNGYWxzZS52YWx1ZSA9PT0gdHJ1ZSA/ICdmYWxzeScgOiAnaW5kZXQnKVxuICAgIGNvbnN0IGNvbG9yID0gcHJvcHMuY29sb3IgIT09IHZvaWQgMCAmJiAoXG4gICAgICBwcm9wcy5rZWVwQ29sb3IgPT09IHRydWVcbiAgICAgIHx8ICh0eXBlID09PSAndG9nZ2xlJyA/IGlzVHJ1ZS52YWx1ZSA9PT0gdHJ1ZSA6IGlzRmFsc2UudmFsdWUgIT09IHRydWUpXG4gICAgKVxuICAgICAgPyBgIHRleHQtJHsgcHJvcHMuY29sb3IgfWBcbiAgICAgIDogJydcblxuICAgIHJldHVybiBgcS0keyB0eXBlIH1fX2lubmVyIHJlbGF0aXZlLXBvc2l0aW9uIG5vbi1zZWxlY3RhYmxlIHEtJHsgdHlwZSB9X19pbm5lci0tJHsgc3RhdGUgfSR7IGNvbG9yIH1gXG4gIH0pXG5cbiAgY29uc3QgZm9ybUF0dHJzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGNvbnN0IHByb3AgPSB7IHR5cGU6ICdjaGVja2JveCcgfVxuXG4gICAgcHJvcHMubmFtZSAhPT0gdm9pZCAwICYmIE9iamVjdC5hc3NpZ24ocHJvcCwge1xuICAgICAgLy8gc2VlIGh0dHBzOi8vdnVlanMub3JnL2d1aWRlL2V4dHJhcy9yZW5kZXItZnVuY3Rpb24uaHRtbCNjcmVhdGluZy12bm9kZXMgKC5wcm9wKVxuICAgICAgJy5jaGVja2VkJzogaXNUcnVlLnZhbHVlLFxuICAgICAgJ15jaGVja2VkJzogaXNUcnVlLnZhbHVlID09PSB0cnVlID8gJ2NoZWNrZWQnIDogdm9pZCAwLFxuICAgICAgbmFtZTogcHJvcHMubmFtZSxcbiAgICAgIHZhbHVlOiBtb2RlbElzQXJyYXkudmFsdWUgPT09IHRydWVcbiAgICAgICAgPyBwcm9wcy52YWxcbiAgICAgICAgOiBwcm9wcy50cnVlVmFsdWVcbiAgICB9KVxuXG4gICAgcmV0dXJuIHByb3BcbiAgfSlcblxuICBjb25zdCBpbmplY3RGb3JtSW5wdXQgPSB1c2VGb3JtSW5qZWN0KGZvcm1BdHRycylcblxuICBjb25zdCBhdHRyaWJ1dGVzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGNvbnN0IGF0dHJzID0ge1xuICAgICAgdGFiaW5kZXg6IHRhYmluZGV4LnZhbHVlLFxuICAgICAgcm9sZTogdHlwZSA9PT0gJ3RvZ2dsZScgPyAnc3dpdGNoJyA6ICdjaGVja2JveCcsXG4gICAgICAnYXJpYS1sYWJlbCc6IHByb3BzLmxhYmVsLFxuICAgICAgJ2FyaWEtY2hlY2tlZCc6IGlzSW5kZXRlcm1pbmF0ZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICA/ICdtaXhlZCdcbiAgICAgICAgOiAoaXNUcnVlLnZhbHVlID09PSB0cnVlID8gJ3RydWUnIDogJ2ZhbHNlJylcbiAgICB9XG5cbiAgICBpZiAocHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSkge1xuICAgICAgYXR0cnNbICdhcmlhLWRpc2FibGVkJyBdID0gJ3RydWUnXG4gICAgfVxuXG4gICAgcmV0dXJuIGF0dHJzXG4gIH0pXG5cbiAgZnVuY3Rpb24gb25DbGljayAoZSkge1xuICAgIGlmIChlICE9PSB2b2lkIDApIHtcbiAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgICByZWZvY3VzVGFyZ2V0KGUpXG4gICAgfVxuXG4gICAgaWYgKHByb3BzLmRpc2FibGUgIT09IHRydWUpIHtcbiAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgZ2V0TmV4dFZhbHVlKCksIGUpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TmV4dFZhbHVlICgpIHtcbiAgICBpZiAobW9kZWxJc0FycmF5LnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBpZiAoaXNUcnVlLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IHZhbCA9IHByb3BzLm1vZGVsVmFsdWUuc2xpY2UoKVxuICAgICAgICB2YWwuc3BsaWNlKGluZGV4LnZhbHVlLCAxKVxuICAgICAgICByZXR1cm4gdmFsXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcm9wcy5tb2RlbFZhbHVlLmNvbmNhdChbIHByb3BzLnZhbCBdKVxuICAgIH1cblxuICAgIGlmIChpc1RydWUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgIGlmIChwcm9wcy50b2dnbGVPcmRlciAhPT0gJ2Z0JyB8fCBwcm9wcy50b2dnbGVJbmRldGVybWluYXRlID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gcHJvcHMuZmFsc2VWYWx1ZVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChpc0ZhbHNlLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBpZiAocHJvcHMudG9nZ2xlT3JkZXIgPT09ICdmdCcgfHwgcHJvcHMudG9nZ2xlSW5kZXRlcm1pbmF0ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIHByb3BzLnRydWVWYWx1ZVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiBwcm9wcy50b2dnbGVPcmRlciAhPT0gJ2Z0J1xuICAgICAgICA/IHByb3BzLnRydWVWYWx1ZVxuICAgICAgICA6IHByb3BzLmZhbHNlVmFsdWVcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvcHMuaW5kZXRlcm1pbmF0ZVZhbHVlXG4gIH1cblxuICBmdW5jdGlvbiBvbktleWRvd24gKGUpIHtcbiAgICBpZiAoZS5rZXlDb2RlID09PSAxMyB8fCBlLmtleUNvZGUgPT09IDMyKSB7XG4gICAgICBzdG9wQW5kUHJldmVudChlKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uS2V5dXAgKGUpIHtcbiAgICBpZiAoZS5rZXlDb2RlID09PSAxMyB8fCBlLmtleUNvZGUgPT09IDMyKSB7XG4gICAgICBvbkNsaWNrKGUpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgZ2V0SW5uZXJDb250ZW50ID0gZ2V0SW5uZXIoaXNUcnVlLCBpc0luZGV0ZXJtaW5hdGUpXG5cbiAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gIE9iamVjdC5hc3NpZ24ocHJveHksIHsgdG9nZ2xlOiBvbkNsaWNrIH0pXG5cbiAgcmV0dXJuICgpID0+IHtcbiAgICBjb25zdCBpbm5lciA9IGdldElubmVyQ29udGVudCgpXG5cbiAgICBwcm9wcy5kaXNhYmxlICE9PSB0cnVlICYmIGluamVjdEZvcm1JbnB1dChcbiAgICAgIGlubmVyLFxuICAgICAgJ3Vuc2hpZnQnLFxuICAgICAgYCBxLSR7IHR5cGUgfV9fbmF0aXZlIGFic29sdXRlIHEtbWEtbm9uZSBxLXBhLW5vbmVgXG4gICAgKVxuXG4gICAgY29uc3QgY2hpbGQgPSBbXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiBpbm5lckNsYXNzLnZhbHVlLFxuICAgICAgICBzdHlsZTogc2l6ZVN0eWxlLnZhbHVlLFxuICAgICAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZSdcbiAgICAgIH0sIGlubmVyKVxuICAgIF1cblxuICAgIGlmIChyZWZvY3VzVGFyZ2V0RWwudmFsdWUgIT09IG51bGwpIHtcbiAgICAgIGNoaWxkLnB1c2gocmVmb2N1c1RhcmdldEVsLnZhbHVlKVxuICAgIH1cblxuICAgIGNvbnN0IGxhYmVsID0gcHJvcHMubGFiZWwgIT09IHZvaWQgMFxuICAgICAgPyBoTWVyZ2VTbG90KHNsb3RzLmRlZmF1bHQsIFsgcHJvcHMubGFiZWwgXSlcbiAgICAgIDogaFNsb3Qoc2xvdHMuZGVmYXVsdClcblxuICAgIGxhYmVsICE9PSB2b2lkIDAgJiYgY2hpbGQucHVzaChcbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6IGBxLSR7IHR5cGUgfV9fbGFiZWwgcS1hbmNob3ItLXNraXBgXG4gICAgICB9LCBsYWJlbClcbiAgICApXG5cbiAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgcmVmOiByb290UmVmLFxuICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUsXG4gICAgICAuLi5hdHRyaWJ1dGVzLnZhbHVlLFxuICAgICAgb25DbGljayxcbiAgICAgIG9uS2V5ZG93bixcbiAgICAgIG9uS2V5dXBcbiAgICB9LCBjaGlsZClcbiAgfVxufVxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRSWNvbiBmcm9tICcuLi9pY29uL1FJY29uLmpzJ1xuXG5pbXBvcnQgdXNlQ2hlY2tib3gsIHsgdXNlQ2hlY2tib3hQcm9wcywgdXNlQ2hlY2tib3hFbWl0cyB9IGZyb20gJy4uL2NoZWNrYm94L3VzZS1jaGVja2JveC5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVRvZ2dsZScsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VDaGVja2JveFByb3BzLFxuXG4gICAgaWNvbjogU3RyaW5nLFxuICAgIGljb25Db2xvcjogU3RyaW5nXG4gIH0sXG5cbiAgZW1pdHM6IHVzZUNoZWNrYm94RW1pdHMsXG5cbiAgc2V0dXAgKHByb3BzKSB7XG4gICAgZnVuY3Rpb24gZ2V0SW5uZXIgKGlzVHJ1ZSwgaXNJbmRldGVybWluYXRlKSB7XG4gICAgICBjb25zdCBpY29uID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICAgKGlzVHJ1ZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgID8gcHJvcHMuY2hlY2tlZEljb25cbiAgICAgICAgICA6IChpc0luZGV0ZXJtaW5hdGUudmFsdWUgPT09IHRydWUgPyBwcm9wcy5pbmRldGVybWluYXRlSWNvbiA6IHByb3BzLnVuY2hlY2tlZEljb24pXG4gICAgICAgICkgfHwgcHJvcHMuaWNvblxuICAgICAgKVxuXG4gICAgICBjb25zdCBjb2xvciA9IGNvbXB1dGVkKCgpID0+IChpc1RydWUudmFsdWUgPT09IHRydWUgPyBwcm9wcy5pY29uQ29sb3IgOiBudWxsKSlcblxuICAgICAgcmV0dXJuICgpID0+IFtcbiAgICAgICAgaCgnZGl2JywgeyBjbGFzczogJ3EtdG9nZ2xlX190cmFjaycgfSksXG5cbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS10b2dnbGVfX3RodW1iIGFic29sdXRlIGZsZXggZmxleC1jZW50ZXIgbm8td3JhcCdcbiAgICAgICAgfSwgaWNvbi52YWx1ZSAhPT0gdm9pZCAwXG4gICAgICAgICAgPyBbXG4gICAgICAgICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICAgICAgICBuYW1lOiBpY29uLnZhbHVlLFxuICAgICAgICAgICAgICAgIGNvbG9yOiBjb2xvci52YWx1ZVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXVxuICAgICAgICAgIDogdm9pZCAwXG4gICAgICAgIClcbiAgICAgIF1cbiAgICB9XG5cbiAgICByZXR1cm4gdXNlQ2hlY2tib3goJ3RvZ2dsZScsIGdldElubmVyKVxuICB9XG59KVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVlLFNBQUEsaUJBQVUsT0FBTyxTQUFTO0FBQ3ZDLFFBQU0sYUFBYSxJQUFJLElBQUk7QUFFM0IsUUFBTSxrQkFBa0IsU0FBUyxNQUFNO0FBQ3JDLFFBQUksTUFBTSxZQUFZLE1BQU07QUFDMUIsYUFBTztBQUFBLElBQ1Q7QUFFQSxXQUFPLEVBQUUsUUFBUTtBQUFBLE1BQ2YsS0FBSztBQUFBLE1BQ0wsT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLElBQ2hCLENBQUs7QUFBQSxFQUNILENBQUM7QUFFRCxXQUFTLGNBQWUsR0FBRztBQUN6QixVQUFNLE9BQU8sUUFBUTtBQUVyQixTQUFJLHVCQUFHLGlCQUFnQixLQUFNO0FBRTdCLFNBQUksdUJBQUcsS0FBSyxRQUFRLFlBQVcsR0FBRztBQUNoQyxVQUNFLFNBQVMsa0JBQWtCLFNBQ3hCLDZCQUFNLFNBQVMsU0FBUyxvQkFBbUIsTUFDOUM7QUFDQSxhQUFLLE1BQUs7QUFBQSxNQUNaO0FBQUEsSUFDRixXQUVFLFdBQVcsVUFBVSxTQUNoQixNQUFNLFdBQVksNkJBQU0sU0FBUyxFQUFFLGFBQVksT0FDcEQ7QUFDQSxpQkFBVyxNQUFNLE1BQUs7QUFBQSxJQUN4QjtBQUFBLEVBQ0Y7QUFFQSxTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxFQUNKO0FBQ0E7QUMxQ0EsTUFBQSxjQUFlO0FBQUEsRUFDYixJQUFJO0FBQUEsRUFDSixJQUFJO0FBQUEsRUFDSixJQUFJO0FBQUEsRUFDSixJQUFJO0FBQUEsRUFDSixJQUFJO0FBQ047QUNLTyxNQUFNLG1CQUFtQjtBQUFBLEVBQzlCLEdBQUc7QUFBQSxFQUNILEdBQUc7QUFBQSxFQUNILEdBQUc7QUFBQSxFQUVILFlBQVk7QUFBQSxJ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
