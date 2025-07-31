import { d as defineComponent, aJ as useSlots, a as ref, _ as _export_sfc, e as createBlock, f as openBlock, g as withCtx, j as createVNode, n as createElementBlock, i as createCommentVNode, V as renderSlot, p as createBaseVNode, k as QIcon, t as toDisplayString, Q as QBtn } from "./index-BXn1qSjA.js";
import { Q as QSpace } from "./QSpace-CENODZda.js";
import { Q as QToolbar } from "./QToolbar-D5FagYN5.js";
import { y as QPage, h as QDialog, i as QCard, j as QCardSection } from "./KeypadButton.vue_vue_type_style_index_0_scoped_4cc0fc91_lang-B0Vue97M.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "GenericPageLayout",
  props: {
    title: {},
    icon: {},
    description: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const slots = useSlots();
    const props = __props;
    const infoDialog = ref(false);
    const __returned__ = { slots, props, infoDialog };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = { class: "q-ma-none text-h4" };
const _hoisted_2 = {
  key: 0,
  class: "q-mb-md"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QPage, {
    class: "column items-start",
    padding: ""
  }, {
    default: withCtx(() => [
      createVNode(QToolbar, { class: "row justify-end items-center q-pa-none q-mb-md" }, {
        default: withCtx(() => [
          createVNode(QIcon, {
            class: "q-mr-md",
            name: $setup.props.icon,
            size: "42px"
          }, null, 8, ["name"]),
          createBaseVNode("h4", _hoisted_1, toDisplayString($setup.props.title), 1),
          createVNode(QSpace),
          $setup.slots.info ? (openBlock(), createBlock(QBtn, {
            key: 0,
            class: "text-weight-regular",
            flat: "",
            "no-caps": "",
            color: "black",
            icon: "mdi-information-outline",
            label: "Learn more",
            onClick: _cache[0] || (_cache[0] = ($event) => $setup.infoDialog = true)
          })) : createCommentVNode("", true)
        ]),
        _: 1
      }),
      $setup.props.description ? (openBlock(), createElementBlock("div", _hoisted_2, toDisplayString($setup.props.description), 1)) : createCommentVNode("", true),
      renderSlot(_ctx.$slots, "default"),
      createVNode(QDialog, {
        modelValue: $setup.infoDialog,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.infoDialog = $event)
      }, {
        default: withCtx(() => [
          createVNode(QCard, { style: { "max-width": "calc(100vw - 16px)", "width": "800px" } }, {
            default: withCtx(() => [
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "info")
                ]),
                _: 3
              })
            ]),
            _: 3
          })
        ]),
        _: 3
      }, 8, ["modelValue"])
    ]),
    _: 3
  });
}
const GenericPageLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "GenericPageLayout.vue"]]);
export {
  GenericPageLayout as G
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJpY1BhZ2VMYXlvdXQtQ0wwaVFJclIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zaGFyZWQvY29tcG9uZW50cy9HZW5lcmljUGFnZUxheW91dC9HZW5lcmljUGFnZUxheW91dC52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICA8cS1wYWdlIGNsYXNzPVwiY29sdW1uIGl0ZW1zLXN0YXJ0XCIgcGFkZGluZz5cbiAgICA8cS10b29sYmFyIGNsYXNzPVwicm93IGp1c3RpZnktZW5kIGl0ZW1zLWNlbnRlciBxLXBhLW5vbmUgcS1tYi1tZFwiPlxuICAgICAgPHEtaWNvbiBjbGFzcz1cInEtbXItbWRcIiA6bmFtZT1cInByb3BzLmljb25cIiBzaXplPVwiNDJweFwiIC8+XG4gICAgICA8aDQgY2xhc3M9XCJxLW1hLW5vbmUgdGV4dC1oNFwiPnt7IHByb3BzLnRpdGxlIH19PC9oND5cbiAgICAgIDxxLXNwYWNlIC8+XG4gICAgICA8cS1idG5cbiAgICAgICAgdi1pZj1cInNsb3RzLmluZm9cIlxuICAgICAgICBjbGFzcz1cInRleHQtd2VpZ2h0LXJlZ3VsYXJcIlxuICAgICAgICBmbGF0XG4gICAgICAgIG5vLWNhcHNcbiAgICAgICAgY29sb3I9XCJibGFja1wiXG4gICAgICAgIGljb249XCJtZGktaW5mb3JtYXRpb24tb3V0bGluZVwiXG4gICAgICAgIGxhYmVsPVwiTGVhcm4gbW9yZVwiXG4gICAgICAgIEBjbGljaz1cImluZm9EaWFsb2cgPSB0cnVlXCJcbiAgICAgIC8+XG4gICAgPC9xLXRvb2xiYXI+XG5cbiAgICA8ZGl2IHYtaWY9XCJwcm9wcy5kZXNjcmlwdGlvblwiIGNsYXNzPVwicS1tYi1tZFwiPlxuICAgICAge3sgcHJvcHMuZGVzY3JpcHRpb24gfX1cbiAgICA8L2Rpdj5cblxuICAgIDxzbG90Pjwvc2xvdD5cblxuICAgIDxxLWRpYWxvZyB2LW1vZGVsPVwiaW5mb0RpYWxvZ1wiPlxuICAgICAgPHEtY2FyZCBzdHlsZT1cIm1heC13aWR0aDogY2FsYygxMDB2dyAtIDE2cHgpOyB3aWR0aDogODAwcHhcIj5cbiAgICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgIDxzbG90IG5hbWU9XCJpbmZvXCI+PC9zbG90PlxuICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgPC9xLWNhcmQ+XG4gICAgPC9xLWRpYWxvZz5cbiAgPC9xLXBhZ2U+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHsgcmVmLCBkZWZpbmVTbG90cyB9IGZyb20gJ3Z1ZSdcbmltcG9ydCB0eXBlIHsgVk5vZGUgfSBmcm9tICd2dWUnXG5jb25zdCBzbG90cyA9IGRlZmluZVNsb3RzPHtcbiAgZGVmYXVsdDogKCkgPT4gVk5vZGVbXVxuICBpbmZvOiAoKSA9PiBWTm9kZVtdXG59PigpXG5cbmNvbnN0IHByb3BzID0gZGVmaW5lUHJvcHM8e1xuICB0aXRsZTogc3RyaW5nXG4gIGljb246IHN0cmluZ1xuICBkZXNjcmlwdGlvbj86IHN0cmluZ1xufT4oKVxuXG5jb25zdCBpbmZvRGlhbG9nID0gcmVmKGZhbHNlKVxuPC9zY3JpcHQ+XG4iXSwibmFtZXMiOlsiX3VzZVNsb3RzIiwiX2NyZWF0ZUJsb2NrIiwiX2NyZWF0ZVZOb2RlIiwiX3dpdGhDdHgiLCJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX3RvRGlzcGxheVN0cmluZyIsIl9jcmVhdGVDb21tZW50Vk5vZGUiLCJfY3JlYXRlRWxlbWVudEJsb2NrIiwiX3JlbmRlclNsb3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFxQ0EsVUFBTSxRQUFRQSxTQUFBO0FBS2QsVUFBTSxRQUFRO0FBTWQsVUFBTSxhQUFhLElBQUksS0FBSzs7Ozs7O0FBNUNsQixNQUFBLGFBQUEsRUFBQSxPQUFNLG9CQUFBOzs7RUFja0IsT0FBTTs7O3NCQWpCdENDLFlBOEJTLE9BQUE7QUFBQSxJQTlCRCxPQUFNO0FBQUEsSUFBcUIsU0FBQTtBQUFBLEVBQUEsR0FBQTtBQUFBLHFCQUNqQyxNQWNZO0FBQUEsTUFkWkMsWUFjWSxVQUFBLEVBQUEsT0FBQSxpREFkSyxHQUFBO0FBQUEsUUFBZ0QsU0FBQUMsUUFDL0QsTUFBeUQ7QUFBQSxVQUF6REQsWUFBeUQsT0FBQTtBQUFBLFlBQWpELE9BQU07QUFBQSxZQUFXLE1BQU0sT0FBQSxNQUFNO0FBQUEsWUFBTSxNQUFLO0FBQUEsVUFBQSxHQUFBLE1BQUEsR0FBQSxDQUFBLE1BQUEsQ0FBQTtBQUFBLFVBQ2hERSxnQkFBb0QsTUFBcEQsWUFBb0RDLGdCQUFuQixPQUFBLE1BQU0sS0FBSyxHQUFBLENBQUE7QUFBQSxVQUM1Q0gsWUFBVyxNQUFBO0FBQUEsVUFFSCxPQUFBLE1BQU0scUJBRGRELFlBU0UsTUFBQTtBQUFBLFlBQUEsS0FBQTtBQUFBLFlBUEEsT0FBTTtBQUFBLFlBQ04sTUFBQTtBQUFBLFlBQ0EsV0FBQTtBQUFBLFlBQ0EsT0FBTTtBQUFBLFlBQ04sTUFBSztBQUFBLFlBQ0wsT0FBTTtBQUFBLFlBQ0wsU0FBSyxzQ0FBRSxPQUFBLGFBQVU7QUFBQSxVQUFBLENBQUEsS0FBQUssbUJBQUEsSUFBQSxJQUFBO0FBQUE7OztNQUlYLE9BQUEsTUFBTSw0QkFBakJDLG1CQUVNLE9BRk4sWUFFTUYsZ0JBREQsYUFBTSxXQUFXLEdBQUEsQ0FBQSxLQUFBQyxtQkFBQSxJQUFBLElBQUE7QUFBQSxNQUd0QkUsV0FBYSxLQUFBLFFBQUEsU0FBQTtBQUFBLE1BRWJOLFlBTVcsU0FBQTtBQUFBLFFBQUEsWUFOUSxPQUFBO0FBQUEsUUFBQSx1QkFBQSxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQSxDQUFBLFdBQUEsT0FBQSxhQUFVO0FBQUEsTUFBQSxHQUFBO0FBQUEseUJBQzNCLE1BSVM7QUFBQSxVQUpUQSxZQUlTLCtCQUpELHNCQUFBLFNBQUEsUUFBQSxLQUFBO0FBQUEsWUFBbUQsU0FBQUMsUUFDekQsTUFFaUI7QUFBQSxjQUZqQkQsWUFFaUIsY0FBQSxNQUFBO0FBQUEsZ0JBQUEsU0FBQUMsUUFEZixNQUF5QjtBQUFBLGtCQUF6QkssV0FBeUIsS0FBQSxRQUFBLE1BQUE7QUFBQSxnQkFBQSxDQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7In0=
