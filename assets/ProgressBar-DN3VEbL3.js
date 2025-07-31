import { q as QBadge, I as QLinearProgress } from "./KeypadButton.vue_vue_type_style_index_0_scoped_4cc0fc91_lang-B0Vue97M.js";
import { d as defineComponent, _ as _export_sfc, e as createBlock, f as openBlock, g as withCtx, n as createElementBlock, i as createCommentVNode, $ as normalizeStyle, a0 as normalizeClass, t as toDisplayString } from "./index-BXn1qSjA.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ProgressBar",
  props: {
    size: { default: "2.25rem" },
    color: { default: "positive" },
    trackColor: { default: "grey-4" },
    badgeColor: { default: "white" },
    title: {},
    titleSize: { default: "24px" },
    titleColor: {},
    progress: {},
    badge: { type: Boolean, default: false },
    interpolated: { type: Boolean, default: false },
    indeterminate: { type: Boolean, default: false }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const __returned__ = {};
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = {
  key: 0,
  class: "absolute-full flex flex-center text-HaxrCorp rounded-borders bordered"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QLinearProgress, {
    rounded: "",
    size: $props.size,
    value: $props.progress,
    "instant-feedback": $props.interpolated,
    color: $props.color,
    "track-color": $props.trackColor,
    indeterminate: $props.indeterminate
  }, {
    default: withCtx(() => {
      var _a;
      return [
        $props.title ? (openBlock(), createElementBlock("div", _hoisted_1, [
          $props.badge ? (openBlock(), createBlock(QBadge, {
            key: 0,
            class: "text badge",
            color: $props.badgeColor,
            "text-color": $props.titleColor || $props.color,
            label: $props.title,
            style: normalizeStyle(`font-size: ${$props.titleSize}`)
          }, null, 8, ["color", "text-color", "label", "style"])) : (openBlock(), createElementBlock("p", {
            key: 1,
            class: normalizeClass(["q-mb-none text", { "text-white": !((_a = $props.titleColor) == null ? void 0 : _a.length) }]),
            style: normalizeStyle(`font-size: ${$props.titleSize}`)
          }, toDisplayString($props.title), 7))
        ])) : createCommentVNode("", true)
      ];
    }),
    _: 1
  }, 8, ["size", "value", "instant-feedback", "color", "track-color", "indeterminate"]);
}
const ProgressBar = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-aeb57352"], ["__file", "ProgressBar.vue"]]);
export {
  ProgressBar as P
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZ3Jlc3NCYXItRE4zVkViTDMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zaGFyZWQvY29tcG9uZW50cy9Qcm9ncmVzc0Jhci9Qcm9ncmVzc0Jhci52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICA8cS1saW5lYXItcHJvZ3Jlc3NcbiAgICByb3VuZGVkXG4gICAgOnNpemU9XCJzaXplXCJcbiAgICA6dmFsdWU9XCJwcm9ncmVzc1wiXG4gICAgOmluc3RhbnQtZmVlZGJhY2s9XCJpbnRlcnBvbGF0ZWRcIlxuICAgIDpjb2xvcj1cImNvbG9yXCJcbiAgICA6dHJhY2stY29sb3I9XCJ0cmFja0NvbG9yXCJcbiAgICA6aW5kZXRlcm1pbmF0ZVxuICA+XG4gICAgPGRpdlxuICAgICAgdi1pZj1cInRpdGxlXCJcbiAgICAgIGNsYXNzPVwiYWJzb2x1dGUtZnVsbCBmbGV4IGZsZXgtY2VudGVyIHRleHQtSGF4ckNvcnAgcm91bmRlZC1ib3JkZXJzIGJvcmRlcmVkXCJcbiAgICA+XG4gICAgICA8dGVtcGxhdGUgdi1pZj1cImJhZGdlXCI+XG4gICAgICAgIDxxLWJhZGdlXG4gICAgICAgICAgY2xhc3M9XCJ0ZXh0IGJhZGdlXCJcbiAgICAgICAgICA6Y29sb3I9XCJiYWRnZUNvbG9yXCJcbiAgICAgICAgICA6dGV4dC1jb2xvcj1cInRpdGxlQ29sb3IgfHwgY29sb3JcIlxuICAgICAgICAgIDpsYWJlbD1cInRpdGxlXCJcbiAgICAgICAgICA6c3R5bGU9XCJgZm9udC1zaXplOiAke3RpdGxlU2l6ZX1gXCJcbiAgICAgICAgLz5cbiAgICAgIDwvdGVtcGxhdGU+XG4gICAgICA8dGVtcGxhdGUgdi1lbHNlPlxuICAgICAgICA8cFxuICAgICAgICAgIGNsYXNzPVwicS1tYi1ub25lIHRleHRcIlxuICAgICAgICAgIDpjbGFzcz1cInsgJ3RleHQtd2hpdGUnOiAhdGl0bGVDb2xvcj8ubGVuZ3RoIH1cIlxuICAgICAgICAgIDpzdHlsZT1cImBmb250LXNpemU6ICR7dGl0bGVTaXplfWBcIlxuICAgICAgICA+XG4gICAgICAgICAge3sgdGl0bGUgfX1cbiAgICAgICAgPC9wPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICA8L2Rpdj5cbiAgPC9xLWxpbmVhci1wcm9ncmVzcz5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG50eXBlIFByb3BzID0ge1xuICBzaXplPzogc3RyaW5nXG4gIGNvbG9yPzogc3RyaW5nXG4gIHRyYWNrQ29sb3I/OiBzdHJpbmdcbiAgYmFkZ2VDb2xvcj86IHN0cmluZ1xuICB0aXRsZT86IHN0cmluZ1xuICB0aXRsZVNpemU/OiBzdHJpbmdcbiAgdGl0bGVDb2xvcj86IHN0cmluZ1xuICBwcm9ncmVzcz86IG51bWJlclxuICBiYWRnZT86IGJvb2xlYW5cbiAgaW50ZXJwb2xhdGVkPzogYm9vbGVhblxuICBpbmRldGVybWluYXRlPzogYm9vbGVhblxufVxuXG53aXRoRGVmYXVsdHMoZGVmaW5lUHJvcHM8UHJvcHM+KCksIHtcbiAgc2l6ZTogJzIuMjVyZW0nLFxuICBjb2xvcjogJ3Bvc2l0aXZlJyxcbiAgdHJhY2tDb2xvcjogJ2dyZXktNCcsXG4gIGJhZGdlQ29sb3I6ICd3aGl0ZScsXG4gIHRpdGxlU2l6ZTogJzI0cHgnLFxuICBiYWRnZTogZmFsc2UsXG4gIGludGVycG9sYXRlZDogZmFsc2UsXG4gIGluZGV0ZXJtaW5hdGU6IGZhbHNlXG59KVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiIHNjb3BlZD5cbkBpbXBvcnQgJ3N0eWxlcyc7XG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbIl9jcmVhdGVCbG9jayIsIl9vcGVuQmxvY2siLCJfY3JlYXRlRWxlbWVudEJsb2NrIiwiX25vcm1hbGl6ZVN0eWxlIiwiX25vcm1hbGl6ZUNsYXNzIiwiX3RvRGlzcGxheVN0cmluZyIsIl9jcmVhdGVDb21tZW50Vk5vZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBWU0sT0FBTTs7O3NCQVhWQSxZQWdDb0IsaUJBQUE7QUFBQSxJQS9CbEIsU0FBQTtBQUFBLElBQ0MsTUFBTSxPQUFBO0FBQUEsSUFDTixPQUFPLE9BQUE7QUFBQSxJQUNQLG9CQUFrQixPQUFBO0FBQUEsSUFDbEIsT0FBTyxPQUFBO0FBQUEsSUFDUCxlQUFhLE9BQUE7QUFBQSxJQUNiLGVBQUEsT0FBQTtBQUFBLEVBQUEsR0FBQTtBQUFBLHFCQUVELE1BQUE7O0FBc0JNO0FBQUEsUUFyQkUsT0FBQSxTQUFBQyxVQUFBLEdBRFJDLG1CQXNCTSxPQXRCTixZQXNCTTtBQUFBLFVBbEJZLDZCQUNkRixZQU1FLFFBQUE7QUFBQSxZQUFBLEtBQUE7QUFBQSxZQUxBLE9BQU07QUFBQSxZQUNMLE9BQU8sT0FBQTtBQUFBLFlBQ1AsY0FBWSxPQUFBLGNBQWMsT0FBQTtBQUFBLFlBQzFCLE9BQU8sT0FBQTtBQUFBLFlBQ1AsT0FBS0csNkJBQWdCLE9BQUEsU0FBUyxFQUFBO0FBQUEsVUFBQSxHQUFBLE1BQUEsR0FBQSxDQUFBLFNBQUEsY0FBQSxTQUFBLE9BQUEsQ0FBQSxNQUFBRixhQUlqQ0MsbUJBTUksS0FBQTtBQUFBLFlBQUEsS0FBQTtBQUFBLFlBTEYsT0FBS0UsZUFBQSxDQUFDLGtCQUFnQixFQUFBLGNBQUEsR0FDRyxZQUFBLGVBQUEsbUJBQVksUUFBQSxDQUFNLENBQUE7QUFBQSxZQUMxQyxPQUFLRCw2QkFBZ0IsT0FBQSxTQUFTLEVBQUE7QUFBQSxVQUFBLEdBQUFFLGdCQUU1QixPQUFBLEtBQUssR0FBQSxDQUFBO0FBQUEsUUFBQSxDQUFBLEtBQUFDLG1CQUFBLElBQUEsSUFBQTtBQUFBOzs7Ozs7In0=
