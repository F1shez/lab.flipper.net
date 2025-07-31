import { d as defineComponent, c as computed, _ as _export_sfc, e as createBlock, f as openBlock, g as withCtx, Q as QBtn, j as createVNode, Z as QAvatar, k as QIcon, l as createTextVNode, t as toDisplayString } from "./index-C6TMAAL-.js";
import { k as useFlipperStore, b as QItem, Q as QItemSection, a as QItemLabel } from "./KeypadButton.vue_vue_type_style_index_0_scoped_4cc0fc91_lang-CBp6KsX-.js";
import "./axios-2pbeEnA2.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ConnectWeb",
  props: {
    type: {
      type: String
    }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const flipperStore = useFlipperStore();
    const flags = computed(() => flipperStore.flags);
    const onClick = () => {
      flipperStore.flags.connected ? disconnect({
        isUserAction: true
      }) : connect();
    };
    const connect = flipperStore.connect;
    const disconnect = flipperStore.disconnect;
    const __returned__ = { flipperStore, flags, onClick, connect, disconnect };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return $props.type === "item" ? (openBlock(), createBlock(QItem, {
    key: 0,
    disable: $setup.flipperStore.flags.disableNavigation,
    clickable: "",
    onClick: $setup.onClick
  }, {
    default: withCtx(() => [
      createVNode(QItemSection, { avatar: "" }, {
        default: withCtx(() => [
          createVNode(QAvatar, {
            size: "md",
            square: ""
          }, {
            default: withCtx(() => [
              createVNode(QIcon, {
                name: $setup.flags.connected ? "flipper:connected" : "flipper:connect",
                size: "32px"
              }, null, 8, ["name"])
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(QItemSection, null, {
        default: withCtx(() => [
          createVNode(QItemLabel, null, {
            default: withCtx(() => [
              createTextVNode(toDisplayString($setup.flags.connected ? "Disconnect" : "Connect"), 1)
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 8, ["disable"])) : (openBlock(), createBlock(QBtn, {
    key: 1,
    outline: "",
    color: "black",
    icon: "cable",
    label: "Connect",
    disabled: $setup.flipperStore.flags.disableNavigation,
    onClick: $setup.onClick
  }, null, 8, ["disabled"]));
}
const FlipperConnectWebBtn = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "ConnectWeb.vue"]]);
export {
  FlipperConnectWebBtn as F
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29ubmVjdFdlYi1EZ1ZzR1VMZi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL0ZsaXBwZXIvdWkvQ29ubmVjdFdlYi52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICA8dGVtcGxhdGUgdi1pZj1cInR5cGUgPT09ICdpdGVtJ1wiPlxuICAgIDxxLWl0ZW1cbiAgICAgIDpkaXNhYmxlPVwiZmxpcHBlclN0b3JlLmZsYWdzLmRpc2FibGVOYXZpZ2F0aW9uXCJcbiAgICAgIGNsaWNrYWJsZVxuICAgICAgQGNsaWNrPVwib25DbGlja1wiXG4gICAgPlxuICAgICAgPHEtaXRlbS1zZWN0aW9uIGF2YXRhcj5cbiAgICAgICAgPHEtYXZhdGFyIHNpemU9XCJtZFwiIHNxdWFyZT5cbiAgICAgICAgICA8cS1pY29uXG4gICAgICAgICAgICA6bmFtZT1cImZsYWdzLmNvbm5lY3RlZCA/ICdmbGlwcGVyOmNvbm5lY3RlZCcgOiAnZmxpcHBlcjpjb25uZWN0J1wiXG4gICAgICAgICAgICBzaXplPVwiMzJweFwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9xLWF2YXRhcj5cbiAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG5cbiAgICAgIDxxLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgPHEtaXRlbS1sYWJlbD57e1xuICAgICAgICAgIGZsYWdzLmNvbm5lY3RlZCA/ICdEaXNjb25uZWN0JyA6ICdDb25uZWN0J1xuICAgICAgICB9fTwvcS1pdGVtLWxhYmVsPlxuICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICA8L3EtaXRlbT5cbiAgPC90ZW1wbGF0ZT5cbiAgPHRlbXBsYXRlIHYtZWxzZT5cbiAgICA8cS1idG5cbiAgICAgIG91dGxpbmVcbiAgICAgIGNvbG9yPVwiYmxhY2tcIlxuICAgICAgaWNvbj1cImNhYmxlXCJcbiAgICAgIGxhYmVsPVwiQ29ubmVjdFwiXG4gICAgICA6ZGlzYWJsZWQ9XCJmbGlwcGVyU3RvcmUuZmxhZ3MuZGlzYWJsZU5hdmlnYXRpb25cIlxuICAgICAgQGNsaWNrPVwib25DbGlja1wiXG4gICAgLz5cbiAgPC90ZW1wbGF0ZT5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgeyBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcbmltcG9ydCB7IEZsaXBwZXJNb2RlbCB9IGZyb20gJ2VudGl0eS9GbGlwcGVyJ1xuY29uc3QgZmxpcHBlclN0b3JlID0gRmxpcHBlck1vZGVsLnVzZUZsaXBwZXJTdG9yZSgpXG5cbmRlZmluZVByb3BzKHtcbiAgdHlwZToge1xuICAgIHR5cGU6IFN0cmluZ1xuICB9XG59KVxuXG5jb25zdCBmbGFncyA9IGNvbXB1dGVkKCgpID0+IGZsaXBwZXJTdG9yZS5mbGFncylcblxuY29uc3Qgb25DbGljayA9ICgpID0+IHtcbiAgZmxpcHBlclN0b3JlLmZsYWdzLmNvbm5lY3RlZFxuICAgID8gZGlzY29ubmVjdCh7XG4gICAgICAgIGlzVXNlckFjdGlvbjogdHJ1ZVxuICAgICAgfSlcbiAgICA6IGNvbm5lY3QoKVxufVxuY29uc3QgY29ubmVjdCA9IGZsaXBwZXJTdG9yZS5jb25uZWN0XG5jb25zdCBkaXNjb25uZWN0ID0gZmxpcHBlclN0b3JlLmRpc2Nvbm5lY3Rcbjwvc2NyaXB0PlxuIl0sIm5hbWVzIjpbIkZsaXBwZXJNb2RlbC51c2VGbGlwcGVyU3RvcmUiLCJfY3JlYXRlQmxvY2siLCJfY3JlYXRlVk5vZGUiLCJfd2l0aEN0eCIsIl9jcmVhdGVUZXh0Vk5vZGUiLCJfdG9EaXNwbGF5U3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFzQ0EsVUFBTSxlQUFlQSxnQkFBYTtBQVFsQyxVQUFNLFFBQVEsU0FBUyxNQUFNLGFBQWEsS0FBSztBQUUvQyxVQUFNLFVBQVUsTUFBTTtBQUNwQixtQkFBYSxNQUFNLFlBQ2YsV0FBVztBQUFBLFFBQ1QsY0FBYztBQUFBLE1BQUEsQ0FDZixJQUNELFFBQUE7QUFBQSxJQUNOO0FBQ0EsVUFBTSxVQUFVLGFBQWE7QUFDN0IsVUFBTSxhQUFhLGFBQWE7Ozs7Ozs7QUF2RGQsU0FBQSxPQUFBLFNBQUksdUJBQ2xCQyxZQW1CUyxPQUFBO0FBQUEsSUFBQSxLQUFBO0FBQUEsSUFsQk4sU0FBUyxvQkFBYSxNQUFNO0FBQUEsSUFDN0IsV0FBQTtBQUFBLElBQ0MsU0FBTyxPQUFBO0FBQUEsRUFBQSxHQUFBO0FBQUEscUJBRVIsTUFPaUI7QUFBQSxNQVBqQkMsWUFPaUIsOEJBUEQ7QUFBQSxRQUFNLFNBQUFDLFFBQ3BCLE1BS1c7QUFBQSxVQUxYRCxZQUtXLFNBQUE7QUFBQSxZQUxELE1BQUs7QUFBQSxZQUFLLFFBQUE7QUFBQSxVQUFBLEdBQUE7QUFBQSw2QkFDbEIsTUFHRTtBQUFBLGNBSEZBLFlBR0UsT0FBQTtBQUFBLGdCQUZDLE1BQU0sYUFBTSxZQUFTLHNCQUFBO0FBQUEsZ0JBQ3RCLE1BQUs7QUFBQSxjQUFBLEdBQUEsTUFBQSxHQUFBLENBQUEsTUFBQSxDQUFBO0FBQUE7Ozs7OztNQUtYQSxZQUlpQixjQUFBLE1BQUE7QUFBQSxRQUFBLFNBQUFDLFFBSGYsTUFFaUI7QUFBQSxVQUZqQkQsWUFFaUIsWUFBQSxNQUFBO0FBQUEsWUFBQSxTQUFBQyxRQUZILE1BRVo7QUFBQSxjQUFBQyxnQkFBQUMsZ0JBREEsYUFBTSxZQUFTLGVBQUEsU0FBQSxHQUFBLENBQUE7QUFBQSxZQUFBLENBQUE7QUFBQTs7Ozs7OztzQ0FNckJKLFlBT0UsTUFBQTtBQUFBLElBQUEsS0FBQTtBQUFBLElBTkEsU0FBQTtBQUFBLElBQ0EsT0FBTTtBQUFBLElBQ04sTUFBSztBQUFBLElBQ0wsT0FBTTtBQUFBLElBQ0wsVUFBVSxvQkFBYSxNQUFNO0FBQUEsSUFDN0IsU0FBTyxPQUFBO0FBQUEsRUFBQSxHQUFBLE1BQUEsR0FBQSxDQUFBLFVBQUEsQ0FBQTs7OyJ9
