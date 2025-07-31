import { d as defineComponent, _ as _export_sfc, e as createBlock, f as openBlock, g as withCtx, a0 as normalizeClass, m as withDirectives, i as createCommentVNode, j as createVNode, Q as QBtn, p as createBaseVNode, k as QIcon } from "./index-C6TMAAL-.js";
import { i as QCard, C as ClosePopup, j as QCardSection } from "./KeypadButton.vue_vue_type_style_index_0_scoped_4cc0fc91_lang-CBp6KsX-.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MicroSD",
  props: {
    flat: { type: Boolean, default: false },
    isDialog: { type: Boolean, default: false },
    showFindMicroSdBtn: { type: Boolean, default: false }
  },
  emits: ["onFindMicroSd"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const emit = __emit;
    const onFindMicroSd = () => {
      emit("onFindMicroSd");
    };
    const __returned__ = { emit, onFindMicroSd };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
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
          createVNode(QIcon, {
            name: "mdi-alert-circle",
            color: "primary",
            size: "64px"
          }),
          _cache[0] || (_cache[0] = createBaseVNode("div", { class: "text-h6 q-my-sm" }, "MicroSD card not detected", -1)),
          _cache[1] || (_cache[1] = createBaseVNode("p", null, " It seems that the MicroSD card is not mounted or damaged. Insert the microSD card into the slot and try again. ", -1)),
          $props.showFindMicroSdBtn ? (openBlock(), createBlock(QBtn, {
            key: 0,
            unelevated: "",
            color: "primary",
            icon: "mdi-magnify",
            label: "Find MicroSD",
            "no-caps": "",
            onClick: $setup.onFindMicroSd
          })) : createCommentVNode("", true)
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
            label: "Instruction manual",
            href: "https://docs.flipper.net/basics/sd-card#Hjdbt",
            target: "_blank"
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 8, ["flat", "class"]);
}
const FlipperMicroSDCard = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "MicroSD.vue"]]);
export {
  FlipperMicroSDCard as F
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWljcm9TRC1EbU5sc0VBVy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2VudGl0aWVzL0ZsaXBwZXIvdWkvRGlhbG9ncy9NaWNyb1NELnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDxxLWNhcmQgY2xhc3M9XCJyb3VuZGVkLWJvcmRlcnNcIiA6ZmxhdD1cImZsYXRcIiA6Y2xhc3M9XCJ7IGRpYWxvZzogaXNEaWFsb2cgfVwiPlxuICAgIDx0ZW1wbGF0ZSB2LWlmPVwiaXNEaWFsb2dcIj5cbiAgICAgIDxxLWJ0blxuICAgICAgICBpY29uPVwiY2xvc2VcIlxuICAgICAgICBmbGF0XG4gICAgICAgIHJvdW5kXG4gICAgICAgIGRlbnNlXG4gICAgICAgIHYtY2xvc2UtcG9wdXBcbiAgICAgICAgY2xhc3M9XCJkaWFsb2ctY2xvc2UtYnRuXCJcbiAgICAgIC8+XG4gICAgPC90ZW1wbGF0ZT5cblxuICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInEtcGEtbm9uZSBxLW1hLW1kXCIgYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgIDxxLWljb24gbmFtZT1cIm1kaS1hbGVydC1jaXJjbGVcIiBjb2xvcj1cInByaW1hcnlcIiBzaXplPVwiNjRweFwiIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNiBxLW15LXNtXCI+TWljcm9TRCBjYXJkIG5vdCBkZXRlY3RlZDwvZGl2PlxuICAgICAgPHA+XG4gICAgICAgIEl0IHNlZW1zIHRoYXQgdGhlIE1pY3JvU0QgY2FyZCBpcyBub3QgbW91bnRlZCBvciBkYW1hZ2VkLiBJbnNlcnQgdGhlXG4gICAgICAgIG1pY3JvU0QgY2FyZCBpbnRvIHRoZSBzbG90IGFuZCB0cnkgYWdhaW4uXG4gICAgICA8L3A+XG4gICAgICA8dGVtcGxhdGUgdi1pZj1cInNob3dGaW5kTWljcm9TZEJ0blwiPlxuICAgICAgICA8cS1idG5cbiAgICAgICAgICB1bmVsZXZhdGVkXG4gICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgICBpY29uPVwibWRpLW1hZ25pZnlcIlxuICAgICAgICAgIGxhYmVsPVwiRmluZCBNaWNyb1NEXCJcbiAgICAgICAgICBuby1jYXBzXG4gICAgICAgICAgQGNsaWNrPVwib25GaW5kTWljcm9TZFwiXG4gICAgICAgIC8+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgIDwvcS1jYXJkLXNlY3Rpb24+XG5cbiAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJxLXB0LW5vbmVcIiBhbGlnbj1cImNlbnRlclwiPlxuICAgICAgPHEtYnRuXG4gICAgICAgIG91dGxpbmVcbiAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgbGFiZWw9XCJJbnN0cnVjdGlvbiBtYW51YWxcIlxuICAgICAgICBocmVmPVwiaHR0cHM6Ly9kb2NzLmZsaXBwZXIubmV0L2Jhc2ljcy9zZC1jYXJkI0hqZGJ0XCJcbiAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgIC8+XG4gICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgPC9xLWNhcmQ+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxudHlwZSBQcm9wcyA9IHtcbiAgZmxhdD86IGJvb2xlYW5cbiAgaXNEaWFsb2c/OiBib29sZWFuXG4gIHNob3dGaW5kTWljcm9TZEJ0bj86IGJvb2xlYW5cbn1cblxud2l0aERlZmF1bHRzKGRlZmluZVByb3BzPFByb3BzPigpLCB7XG4gIGZsYXQ6IGZhbHNlLFxuICBpc0RpYWxvZzogZmFsc2UsXG4gIHNob3dGaW5kTWljcm9TZEJ0bjogZmFsc2Vcbn0pXG5cbmNvbnN0IGVtaXQgPSBkZWZpbmVFbWl0cyhbJ29uRmluZE1pY3JvU2QnXSlcblxuY29uc3Qgb25GaW5kTWljcm9TZCA9ICgpID0+IHtcbiAgZW1pdCgnb25GaW5kTWljcm9TZCcpXG59XG48L3NjcmlwdD5cbiJdLCJuYW1lcyI6WyJfY3JlYXRlQmxvY2siLCJfbm9ybWFsaXplQ2xhc3MiLCJfY3JlYXRlVk5vZGUiLCJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX2NyZWF0ZUNvbW1lbnRWTm9kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBeURBLFVBQU0sT0FBTztBQUViLFVBQU0sZ0JBQWdCLE1BQU07QUFDMUIsV0FBSyxlQUFlO0FBQUEsSUFDdEI7Ozs7Ozs7c0JBNURFQSxZQXdDUyxPQUFBO0FBQUEsSUF4Q0QsT0FBS0MsZUFBQSxDQUFDLG1CQUFpQixFQUFBLFFBQWdDLE9BQUEsU0FBQSxDQUFRLENBQUE7QUFBQSxJQUF0QyxNQUFNLE9BQUE7QUFBQSxFQUFBLEdBQUE7QUFBQSxxQkFDckMsTUFTVztBQUFBLE1BVEssK0NBQ2RELFlBT0UsTUFBQTtBQUFBLFFBQUEsS0FBQTtBQUFBLFFBTkEsTUFBSztBQUFBLFFBQ0wsTUFBQTtBQUFBLFFBQ0EsT0FBQTtBQUFBLFFBQ0EsT0FBQTtBQUFBLFFBRUEsT0FBTTtBQUFBLE1BQUEsR0FBQSxNQUFBLEdBQUEsSUFBQTtBQUFBOztNQUlWRSxZQWlCaUIsY0FBQTtBQUFBLFFBakJELE9BQU07QUFBQSxRQUFvQixPQUFNO0FBQUEsTUFBQSxHQUFBO0FBQUEseUJBQzlDLE1BQThEO0FBQUEsVUFBOURBLFlBQThELE9BQUE7QUFBQSxZQUF0RCxNQUFLO0FBQUEsWUFBbUIsT0FBTTtBQUFBLFlBQVUsTUFBSztBQUFBLFVBQUEsQ0FBQTtBQUFBLFVBQ3JELE9BQUEsQ0FBQSxNQUFBLE9BQUEsQ0FBQSxJQUFBQyxnQkFBNEQsT0FBQSxFQUF2RCxPQUFNLGtCQUFBLEdBQWtCLDZCQUF5QixFQUFBO0FBQUEsVUFBQSxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFDdERBLGdCQUdJLFdBSEQsb0hBR0gsRUFBQTtBQUFBLFVBQ2dCLDBDQUNkSCxZQU9FLE1BQUE7QUFBQSxZQUFBLEtBQUE7QUFBQSxZQU5BLFlBQUE7QUFBQSxZQUNBLE9BQU07QUFBQSxZQUNOLE1BQUs7QUFBQSxZQUNMLE9BQU07QUFBQSxZQUNOLFdBQUE7QUFBQSxZQUNDLFNBQU8sT0FBQTtBQUFBLFVBQUEsQ0FBQSxLQUFBSSxtQkFBQSxJQUFBLElBQUE7QUFBQTs7OztNQUtkRixZQVFpQixjQUFBO0FBQUEsUUFSRCxPQUFNO0FBQUEsUUFBWSxPQUFNO0FBQUEsTUFBQSxHQUFBO0FBQUEseUJBQ3RDLE1BTUU7QUFBQSxVQU5GQSxZQU1FLE1BQUE7QUFBQSxZQUxBLFNBQUE7QUFBQSxZQUNBLE9BQU07QUFBQSxZQUNOLE9BQU07QUFBQSxZQUNOLE1BQUs7QUFBQSxZQUNMLFFBQU87QUFBQSxVQUFBLENBQUE7QUFBQTs7Ozs7Ozs7In0=
