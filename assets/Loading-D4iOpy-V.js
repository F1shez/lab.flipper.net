import { d as defineComponent, _ as _export_sfc, n as createElementBlock, f as openBlock, j as createVNode, p as createBaseVNode, af as QSpinner, t as toDisplayString } from "./index-C6TMAAL-.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Loading",
  props: {
    label: { default: "Loading..." }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const __returned__ = { props };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = { class: "column items-center" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(QSpinner, {
      color: "primary",
      size: "3em",
      class: "q-mb-md"
    }),
    createBaseVNode("p", null, toDisplayString($setup.props.label), 1)
  ]);
}
const Loading = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Loading.vue"]]);
export {
  Loading as L
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9hZGluZy1ENGlPcHktVi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NoYXJlZC9jb21wb25lbnRzL0xvYWRpbmcvTG9hZGluZy52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwiY29sdW1uIGl0ZW1zLWNlbnRlclwiPlxuICAgIDxxLXNwaW5uZXJcbiAgICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgICBzaXplPVwiM2VtXCJcbiAgICAgIGNsYXNzPVwicS1tYi1tZFwiXG4gICAgPjwvcS1zcGlubmVyPlxuICAgIDxwPnt7IHByb3BzLmxhYmVsIH19PC9wPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG50eXBlIFByb3BzID0ge1xuICBsYWJlbD86IHN0cmluZ1xufVxuXG5jb25zdCBwcm9wcyA9IHdpdGhEZWZhdWx0cyhkZWZpbmVQcm9wczxQcm9wcz4oKSwge1xuICBsYWJlbDogJ0xvYWRpbmcuLi4nXG59KVxuPC9zY3JpcHQ+XG4iXSwibmFtZXMiOlsiX29wZW5CbG9jayIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfY3JlYXRlVk5vZGUiLCJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX3RvRGlzcGxheVN0cmluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFnQkEsVUFBTSxRQUFROzs7Ozs7QUFmUCxNQUFBLGFBQUEsRUFBQSxPQUFNLHNCQUFBOztBQUFYLFNBQUFBLFVBQUEsR0FBQUMsbUJBT00sT0FQTixZQU9NO0FBQUEsSUFOSkMsWUFJYSxVQUFBO0FBQUEsTUFIWCxPQUFNO0FBQUEsTUFDTixNQUFLO0FBQUEsTUFDTCxPQUFNO0FBQUEsSUFBQSxDQUFBO0FBQUEsSUFFUkMsZ0JBQXdCLEtBQUEsTUFBQUMsZ0JBQWxCLGFBQU0sS0FBSyxHQUFBLENBQUE7QUFBQSxFQUFBLENBQUE7OzsifQ==
