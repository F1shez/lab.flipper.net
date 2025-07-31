import { L as createComponent, H as getCurrentInstance, N as inject, O as emptyRenderFn, P as layoutKey, c as computed, h, J as hSlot, ax as provide, az as pageContainerKey, a as ref, a8 as isRuntimeSsrPreHydration, r as reactive, w as watch, Y as onUnmounted, ai as hMergeSlot } from "./index-C6TMAAL-.js";
import { L as QScrollObserver, K as QResizeObserver } from "./KeypadButton.vue_vue_type_style_index_0_scoped_4cc0fc91_lang-CBp6KsX-.js";
import { o as getScrollbarWidth } from "./_commonjsHelpers-DHRe3nu-.js";
const QPageContainer = createComponent({
  name: "QPageContainer",
  setup(_, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const $layout = inject(layoutKey, emptyRenderFn);
    if ($layout === emptyRenderFn) {
      console.error("QPageContainer needs to be child of QLayout");
      return emptyRenderFn;
    }
    provide(pageContainerKey, true);
    const style = computed(() => {
      const css = {};
      if ($layout.header.space === true) {
        css.paddingTop = `${$layout.header.size}px`;
      }
      if ($layout.right.space === true) {
        css[`padding${$q.lang.rtl === true ? "Left" : "Right"}`] = `${$layout.right.size}px`;
      }
      if ($layout.footer.space === true) {
        css.paddingBottom = `${$layout.footer.size}px`;
      }
      if ($layout.left.space === true) {
        css[`padding${$q.lang.rtl === true ? "Right" : "Left"}`] = `${$layout.left.size}px`;
      }
      return css;
    });
    return () => h("div", {
      class: "q-page-container",
      style: style.value
    }, hSlot(slots.default));
  }
});
const QLayout = createComponent({
  name: "QLayout",
  props: {
    container: Boolean,
    view: {
      type: String,
      default: "hhh lpr fff",
      validator: (v) => /^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(v.toLowerCase())
    },
    onScroll: Function,
    onScrollHeight: Function,
    onResize: Function
  },
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const rootRef = ref(null);
    const height = ref($q.screen.height);
    const width = ref(props.container === true ? 0 : $q.screen.width);
    const scroll = ref({ position: 0, direction: "down", inflectionPoint: 0 });
    const containerHeight = ref(0);
    const scrollbarWidth = ref(isRuntimeSsrPreHydration.value === true ? 0 : getScrollbarWidth());
    const classes = computed(
      () => "q-layout q-layout--" + (props.container === true ? "containerized" : "standard")
    );
    const style = computed(() => props.container === false ? { minHeight: $q.screen.height + "px" } : null);
    const targetStyle = computed(() => scrollbarWidth.value !== 0 ? { [$q.lang.rtl === true ? "left" : "right"]: `${scrollbarWidth.value}px` } : null);
    const targetChildStyle = computed(() => scrollbarWidth.value !== 0 ? {
      [$q.lang.rtl === true ? "right" : "left"]: 0,
      [$q.lang.rtl === true ? "left" : "right"]: `-${scrollbarWidth.value}px`,
      width: `calc(100% + ${scrollbarWidth.value}px)`
    } : null);
    function onPageScroll(data) {
      if (props.container === true || document.qScrollPrevented !== true) {
        const info = {
          position: data.position.top,
          direction: data.direction,
          directionChanged: data.directionChanged,
          inflectionPoint: data.inflectionPoint.top,
          delta: data.delta.top
        };
        scroll.value = info;
        props.onScroll !== void 0 && emit("scroll", info);
      }
    }
    function onPageResize(data) {
      const { height: newHeight, width: newWidth } = data;
      let resized = false;
      if (height.value !== newHeight) {
        resized = true;
        height.value = newHeight;
        props.onScrollHeight !== void 0 && emit("scrollHeight", newHeight);
        updateScrollbarWidth();
      }
      if (width.value !== newWidth) {
        resized = true;
        width.value = newWidth;
      }
      if (resized === true && props.onResize !== void 0) {
        emit("resize", data);
      }
    }
    function onContainerResize({ height: height2 }) {
      if (containerHeight.value !== height2) {
        containerHeight.value = height2;
        updateScrollbarWidth();
      }
    }
    function updateScrollbarWidth() {
      if (props.container === true) {
        const width2 = height.value > containerHeight.value ? getScrollbarWidth() : 0;
        if (scrollbarWidth.value !== width2) {
          scrollbarWidth.value = width2;
        }
      }
    }
    let animateTimer = null;
    const $layout = {
      instances: {},
      view: computed(() => props.view),
      isContainer: computed(() => props.container),
      rootRef,
      height,
      containerHeight,
      scrollbarWidth,
      totalWidth: computed(() => width.value + scrollbarWidth.value),
      rows: computed(() => {
        const rows = props.view.toLowerCase().split(" ");
        return {
          top: rows[0].split(""),
          middle: rows[1].split(""),
          bottom: rows[2].split("")
        };
      }),
      header: reactive({ size: 0, offset: 0, space: false }),
      right: reactive({ size: 300, offset: 0, space: false }),
      footer: reactive({ size: 0, offset: 0, space: false }),
      left: reactive({ size: 300, offset: 0, space: false }),
      scroll,
      animate() {
        if (animateTimer !== null) {
          clearTimeout(animateTimer);
        } else {
          document.body.classList.add("q-body--layout-animate");
        }
        animateTimer = setTimeout(() => {
          animateTimer = null;
          document.body.classList.remove("q-body--layout-animate");
        }, 155);
      },
      update(part, prop, val) {
        $layout[part][prop] = val;
      }
    };
    provide(layoutKey, $layout);
    if (getScrollbarWidth() > 0) {
      let restoreScrollbar = function() {
        timer = null;
        el.classList.remove("hide-scrollbar");
      }, hideScrollbar = function() {
        if (timer === null) {
          if (el.scrollHeight > $q.screen.height) return;
          el.classList.add("hide-scrollbar");
        } else {
          clearTimeout(timer);
        }
        timer = setTimeout(restoreScrollbar, 300);
      }, updateScrollEvent = function(action) {
        if (timer !== null && action === "remove") {
          clearTimeout(timer);
          restoreScrollbar();
        }
        window[`${action}EventListener`]("resize", hideScrollbar);
      };
      let timer = null;
      const el = document.body;
      watch(
        () => props.container !== true ? "add" : "remove",
        updateScrollEvent
      );
      props.container !== true && updateScrollEvent("add");
      onUnmounted(() => {
        updateScrollEvent("remove");
      });
    }
    return () => {
      const content = hMergeSlot(slots.default, [
        h(QScrollObserver, { onScroll: onPageScroll }),
        h(QResizeObserver, { onResize: onPageResize })
      ]);
      const layout = h("div", {
        class: classes.value,
        style: style.value,
        ref: props.container === true ? void 0 : rootRef,
        tabindex: -1
      }, content);
      if (props.container === true) {
        return h("div", {
          class: "q-layout-container overflow-hidden",
          ref: rootRef
        }, [
          h(QResizeObserver, { onResize: onContainerResize }),
          h("div", {
            class: "absolute-full",
            style: targetStyle.value
          }, [
            h("div", {
              class: "scroll",
              style: targetChildStyle.value
            }, [layout])
          ])
        ]);
      }
      return layout;
    };
  }
});
export {
  QLayout as Q,
  QPageContainer as a
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUUxheW91dC1DdF9zVTFFbi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9wYWdlL1FQYWdlQ29udGFpbmVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9sYXlvdXQvUUxheW91dC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoLCBjb21wdXRlZCwgcHJvdmlkZSwgaW5qZWN0LCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuaW1wb3J0IHsgcGFnZUNvbnRhaW5lcktleSwgbGF5b3V0S2V5LCBlbXB0eVJlbmRlckZuIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5zeW1ib2xzL3N5bWJvbHMuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRUGFnZUNvbnRhaW5lcicsXG5cbiAgc2V0dXAgKF8sIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IHsgcHJveHk6IHsgJHEgfSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIGNvbnN0ICRsYXlvdXQgPSBpbmplY3QobGF5b3V0S2V5LCBlbXB0eVJlbmRlckZuKVxuICAgIGlmICgkbGF5b3V0ID09PSBlbXB0eVJlbmRlckZuKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdRUGFnZUNvbnRhaW5lciBuZWVkcyB0byBiZSBjaGlsZCBvZiBRTGF5b3V0JylcbiAgICAgIHJldHVybiBlbXB0eVJlbmRlckZuXG4gICAgfVxuXG4gICAgcHJvdmlkZShwYWdlQ29udGFpbmVyS2V5LCB0cnVlKVxuXG4gICAgY29uc3Qgc3R5bGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBjc3MgPSB7fVxuXG4gICAgICBpZiAoJGxheW91dC5oZWFkZXIuc3BhY2UgPT09IHRydWUpIHtcbiAgICAgICAgY3NzLnBhZGRpbmdUb3AgPSBgJHsgJGxheW91dC5oZWFkZXIuc2l6ZSB9cHhgXG4gICAgICB9XG4gICAgICBpZiAoJGxheW91dC5yaWdodC5zcGFjZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjc3NbIGBwYWRkaW5nJHsgJHEubGFuZy5ydGwgPT09IHRydWUgPyAnTGVmdCcgOiAnUmlnaHQnIH1gIF0gPSBgJHsgJGxheW91dC5yaWdodC5zaXplIH1weGBcbiAgICAgIH1cbiAgICAgIGlmICgkbGF5b3V0LmZvb3Rlci5zcGFjZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjc3MucGFkZGluZ0JvdHRvbSA9IGAkeyAkbGF5b3V0LmZvb3Rlci5zaXplIH1weGBcbiAgICAgIH1cbiAgICAgIGlmICgkbGF5b3V0LmxlZnQuc3BhY2UgPT09IHRydWUpIHtcbiAgICAgICAgY3NzWyBgcGFkZGluZyR7ICRxLmxhbmcucnRsID09PSB0cnVlID8gJ1JpZ2h0JyA6ICdMZWZ0JyB9YCBdID0gYCR7ICRsYXlvdXQubGVmdC5zaXplIH1weGBcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNzc1xuICAgIH0pXG5cbiAgICByZXR1cm4gKCkgPT4gaCgnZGl2Jywge1xuICAgICAgY2xhc3M6ICdxLXBhZ2UtY29udGFpbmVyJyxcbiAgICAgIHN0eWxlOiBzdHlsZS52YWx1ZVxuICAgIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgcmVmLCByZWFjdGl2ZSwgY29tcHV0ZWQsIHdhdGNoLCBwcm92aWRlLCBvblVubW91bnRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBpc1J1bnRpbWVTc3JQcmVIeWRyYXRpb24gfSBmcm9tICcuLi8uLi9wbHVnaW5zL3BsYXRmb3JtL1BsYXRmb3JtLmpzJ1xuXG5pbXBvcnQgUVNjcm9sbE9ic2VydmVyIGZyb20gJy4uL3Njcm9sbC1vYnNlcnZlci9RU2Nyb2xsT2JzZXJ2ZXIuanMnXG5pbXBvcnQgUVJlc2l6ZU9ic2VydmVyIGZyb20gJy4uL3Jlc2l6ZS1vYnNlcnZlci9RUmVzaXplT2JzZXJ2ZXIuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGdldFNjcm9sbGJhcldpZHRoIH0gZnJvbSAnLi4vLi4vdXRpbHMvc2Nyb2xsL3Njcm9sbC5qcydcbmltcG9ydCB7IGhNZXJnZVNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5pbXBvcnQgeyBsYXlvdXRLZXkgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnN5bWJvbHMvc3ltYm9scy5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FMYXlvdXQnLFxuXG4gIHByb3BzOiB7XG4gICAgY29udGFpbmVyOiBCb29sZWFuLFxuICAgIHZpZXc6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdoaGggbHByIGZmZicsXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gL14oaHxsKWgoaHxyKSBscHIgKGZ8bClmKGZ8cikkLy50ZXN0KHYudG9Mb3dlckNhc2UoKSlcbiAgICB9LFxuXG4gICAgb25TY3JvbGw6IEZ1bmN0aW9uLFxuICAgIG9uU2Nyb2xsSGVpZ2h0OiBGdW5jdGlvbixcbiAgICBvblJlc2l6ZTogRnVuY3Rpb25cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGNvbnN0IHsgcHJveHk6IHsgJHEgfSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIGNvbnN0IHJvb3RSZWYgPSByZWYobnVsbClcblxuICAgIC8vIHBhZ2UgcmVsYXRlZFxuICAgIGNvbnN0IGhlaWdodCA9IHJlZigkcS5zY3JlZW4uaGVpZ2h0KVxuICAgIGNvbnN0IHdpZHRoID0gcmVmKHByb3BzLmNvbnRhaW5lciA9PT0gdHJ1ZSA/IDAgOiAkcS5zY3JlZW4ud2lkdGgpXG4gICAgY29uc3Qgc2Nyb2xsID0gcmVmKHsgcG9zaXRpb246IDAsIGRpcmVjdGlvbjogJ2Rvd24nLCBpbmZsZWN0aW9uUG9pbnQ6IDAgfSlcblxuICAgIC8vIGNvbnRhaW5lciBvbmx5IHByb3BcbiAgICBjb25zdCBjb250YWluZXJIZWlnaHQgPSByZWYoMClcbiAgICBjb25zdCBzY3JvbGxiYXJXaWR0aCA9IHJlZihpc1J1bnRpbWVTc3JQcmVIeWRyYXRpb24udmFsdWUgPT09IHRydWUgPyAwIDogZ2V0U2Nyb2xsYmFyV2lkdGgoKSlcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtbGF5b3V0IHEtbGF5b3V0LS0nXG4gICAgICArIChwcm9wcy5jb250YWluZXIgPT09IHRydWUgPyAnY29udGFpbmVyaXplZCcgOiAnc3RhbmRhcmQnKVxuICAgIClcblxuICAgIGNvbnN0IHN0eWxlID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuY29udGFpbmVyID09PSBmYWxzZVxuICAgICAgICA/IHsgbWluSGVpZ2h0OiAkcS5zY3JlZW4uaGVpZ2h0ICsgJ3B4JyB9XG4gICAgICAgIDogbnVsbFxuICAgICkpXG5cbiAgICAvLyB1c2VkIGJ5IGNvbnRhaW5lciBvbmx5XG4gICAgY29uc3QgdGFyZ2V0U3R5bGUgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBzY3JvbGxiYXJXaWR0aC52YWx1ZSAhPT0gMFxuICAgICAgICA/IHsgWyAkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/ICdsZWZ0JyA6ICdyaWdodCcgXTogYCR7IHNjcm9sbGJhcldpZHRoLnZhbHVlIH1weGAgfVxuICAgICAgICA6IG51bGxcbiAgICApKVxuXG4gICAgY29uc3QgdGFyZ2V0Q2hpbGRTdHlsZSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHNjcm9sbGJhcldpZHRoLnZhbHVlICE9PSAwXG4gICAgICAgID8ge1xuICAgICAgICAgICAgWyAkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/ICdyaWdodCcgOiAnbGVmdCcgXTogMCxcbiAgICAgICAgICAgIFsgJHEubGFuZy5ydGwgPT09IHRydWUgPyAnbGVmdCcgOiAncmlnaHQnIF06IGAtJHsgc2Nyb2xsYmFyV2lkdGgudmFsdWUgfXB4YCxcbiAgICAgICAgICAgIHdpZHRoOiBgY2FsYygxMDAlICsgJHsgc2Nyb2xsYmFyV2lkdGgudmFsdWUgfXB4KWBcbiAgICAgICAgICB9XG4gICAgICAgIDogbnVsbFxuICAgICkpXG5cbiAgICBmdW5jdGlvbiBvblBhZ2VTY3JvbGwgKGRhdGEpIHtcbiAgICAgIGlmIChwcm9wcy5jb250YWluZXIgPT09IHRydWUgfHwgZG9jdW1lbnQucVNjcm9sbFByZXZlbnRlZCAhPT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBpbmZvID0ge1xuICAgICAgICAgIHBvc2l0aW9uOiBkYXRhLnBvc2l0aW9uLnRvcCxcbiAgICAgICAgICBkaXJlY3Rpb246IGRhdGEuZGlyZWN0aW9uLFxuICAgICAgICAgIGRpcmVjdGlvbkNoYW5nZWQ6IGRhdGEuZGlyZWN0aW9uQ2hhbmdlZCxcbiAgICAgICAgICBpbmZsZWN0aW9uUG9pbnQ6IGRhdGEuaW5mbGVjdGlvblBvaW50LnRvcCxcbiAgICAgICAgICBkZWx0YTogZGF0YS5kZWx0YS50b3BcbiAgICAgICAgfVxuXG4gICAgICAgIHNjcm9sbC52YWx1ZSA9IGluZm9cbiAgICAgICAgcHJvcHMub25TY3JvbGwgIT09IHZvaWQgMCAmJiBlbWl0KCdzY3JvbGwnLCBpbmZvKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uUGFnZVJlc2l6ZSAoZGF0YSkge1xuICAgICAgY29uc3QgeyBoZWlnaHQ6IG5ld0hlaWdodCwgd2lkdGg6IG5ld1dpZHRoIH0gPSBkYXRhXG4gICAgICBsZXQgcmVzaXplZCA9IGZhbHNlXG5cbiAgICAgIGlmIChoZWlnaHQudmFsdWUgIT09IG5ld0hlaWdodCkge1xuICAgICAgICByZXNpemVkID0gdHJ1ZVxuICAgICAgICBoZWlnaHQudmFsdWUgPSBuZXdIZWlnaHRcbiAgICAgICAgcHJvcHMub25TY3JvbGxIZWlnaHQgIT09IHZvaWQgMCAmJiBlbWl0KCdzY3JvbGxIZWlnaHQnLCBuZXdIZWlnaHQpXG4gICAgICAgIHVwZGF0ZVNjcm9sbGJhcldpZHRoKClcbiAgICAgIH1cbiAgICAgIGlmICh3aWR0aC52YWx1ZSAhPT0gbmV3V2lkdGgpIHtcbiAgICAgICAgcmVzaXplZCA9IHRydWVcbiAgICAgICAgd2lkdGgudmFsdWUgPSBuZXdXaWR0aFxuICAgICAgfVxuXG4gICAgICBpZiAocmVzaXplZCA9PT0gdHJ1ZSAmJiBwcm9wcy5vblJlc2l6ZSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGVtaXQoJ3Jlc2l6ZScsIGRhdGEpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Db250YWluZXJSZXNpemUgKHsgaGVpZ2h0IH0pIHtcbiAgICAgIGlmIChjb250YWluZXJIZWlnaHQudmFsdWUgIT09IGhlaWdodCkge1xuICAgICAgICBjb250YWluZXJIZWlnaHQudmFsdWUgPSBoZWlnaHRcbiAgICAgICAgdXBkYXRlU2Nyb2xsYmFyV2lkdGgoKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVNjcm9sbGJhcldpZHRoICgpIHtcbiAgICAgIGlmIChwcm9wcy5jb250YWluZXIgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3Qgd2lkdGggPSBoZWlnaHQudmFsdWUgPiBjb250YWluZXJIZWlnaHQudmFsdWVcbiAgICAgICAgICA/IGdldFNjcm9sbGJhcldpZHRoKClcbiAgICAgICAgICA6IDBcblxuICAgICAgICBpZiAoc2Nyb2xsYmFyV2lkdGgudmFsdWUgIT09IHdpZHRoKSB7XG4gICAgICAgICAgc2Nyb2xsYmFyV2lkdGgudmFsdWUgPSB3aWR0aFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGFuaW1hdGVUaW1lciA9IG51bGxcblxuICAgIGNvbnN0ICRsYXlvdXQgPSB7XG4gICAgICBpbnN0YW5jZXM6IHt9LFxuICAgICAgdmlldzogY29tcHV0ZWQoKCkgPT4gcHJvcHMudmlldyksXG4gICAgICBpc0NvbnRhaW5lcjogY29tcHV0ZWQoKCkgPT4gcHJvcHMuY29udGFpbmVyKSxcblxuICAgICAgcm9vdFJlZixcblxuICAgICAgaGVpZ2h0LFxuICAgICAgY29udGFpbmVySGVpZ2h0LFxuICAgICAgc2Nyb2xsYmFyV2lkdGgsXG4gICAgICB0b3RhbFdpZHRoOiBjb21wdXRlZCgoKSA9PiB3aWR0aC52YWx1ZSArIHNjcm9sbGJhcldpZHRoLnZhbHVlKSxcblxuICAgICAgcm93czogY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgICBjb25zdCByb3dzID0gcHJvcHMudmlldy50b0xvd2VyQ2FzZSgpLnNwbGl0KCcgJylcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0b3A6IHJvd3NbIDAgXS5zcGxpdCgnJyksXG4gICAgICAgICAgbWlkZGxlOiByb3dzWyAxIF0uc3BsaXQoJycpLFxuICAgICAgICAgIGJvdHRvbTogcm93c1sgMiBdLnNwbGl0KCcnKVxuICAgICAgICB9XG4gICAgICB9KSxcblxuICAgICAgaGVhZGVyOiByZWFjdGl2ZSh7IHNpemU6IDAsIG9mZnNldDogMCwgc3BhY2U6IGZhbHNlIH0pLFxuICAgICAgcmlnaHQ6IHJlYWN0aXZlKHsgc2l6ZTogMzAwLCBvZmZzZXQ6IDAsIHNwYWNlOiBmYWxzZSB9KSxcbiAgICAgIGZvb3RlcjogcmVhY3RpdmUoeyBzaXplOiAwLCBvZmZzZXQ6IDAsIHNwYWNlOiBmYWxzZSB9KSxcbiAgICAgIGxlZnQ6IHJlYWN0aXZlKHsgc2l6ZTogMzAwLCBvZmZzZXQ6IDAsIHNwYWNlOiBmYWxzZSB9KSxcblxuICAgICAgc2Nyb2xsLFxuXG4gICAgICBhbmltYXRlICgpIHtcbiAgICAgICAgaWYgKGFuaW1hdGVUaW1lciAhPT0gbnVsbCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dChhbmltYXRlVGltZXIpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdxLWJvZHktLWxheW91dC1hbmltYXRlJylcbiAgICAgICAgfVxuXG4gICAgICAgIGFuaW1hdGVUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGFuaW1hdGVUaW1lciA9IG51bGxcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3EtYm9keS0tbGF5b3V0LWFuaW1hdGUnKVxuICAgICAgICB9LCAxNTUpXG4gICAgICB9LFxuXG4gICAgICB1cGRhdGUgKHBhcnQsIHByb3AsIHZhbCkge1xuICAgICAgICAkbGF5b3V0WyBwYXJ0IF1bIHByb3AgXSA9IHZhbFxuICAgICAgfVxuICAgIH1cblxuICAgIHByb3ZpZGUobGF5b3V0S2V5LCAkbGF5b3V0KVxuXG4gICAgLy8gcHJldmVudCBzY3JvbGxiYXIgZmxpY2tlciB3aGlsZSByZXNpemluZyB3aW5kb3cgaGVpZ2h0XG4gICAgLy8gaWYgbm8gcGFnZSBzY3JvbGxiYXIgaXMgYWxyZWFkeSBwcmVzZW50XG4gICAgaWYgKF9fUVVBU0FSX1NTUl9TRVJWRVJfXyAhPT0gdHJ1ZSAmJiBnZXRTY3JvbGxiYXJXaWR0aCgpID4gMCkge1xuICAgICAgbGV0IHRpbWVyID0gbnVsbFxuICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5ib2R5XG5cbiAgICAgIGZ1bmN0aW9uIHJlc3RvcmVTY3JvbGxiYXIgKCkge1xuICAgICAgICB0aW1lciA9IG51bGxcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZS1zY3JvbGxiYXInKVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBoaWRlU2Nyb2xsYmFyICgpIHtcbiAgICAgICAgaWYgKHRpbWVyID09PSBudWxsKSB7XG4gICAgICAgICAgLy8gaWYgaXQgaGFzIG5vIHNjcm9sbGJhciB0aGVuIHRoZXJlJ3Mgbm90aGluZyB0byBkb1xuICAgICAgICAgIGlmIChlbC5zY3JvbGxIZWlnaHQgPiAkcS5zY3JlZW4uaGVpZ2h0KSByZXR1cm5cblxuICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2hpZGUtc2Nyb2xsYmFyJylcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICAgIH1cblxuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQocmVzdG9yZVNjcm9sbGJhciwgMzAwKVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiB1cGRhdGVTY3JvbGxFdmVudCAoYWN0aW9uKSB7XG4gICAgICAgIGlmICh0aW1lciAhPT0gbnVsbCAmJiBhY3Rpb24gPT09ICdyZW1vdmUnKSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgICAgIHJlc3RvcmVTY3JvbGxiYXIoKVxuICAgICAgICB9XG5cbiAgICAgICAgd2luZG93WyBgJHsgYWN0aW9uIH1FdmVudExpc3RlbmVyYCBdKCdyZXNpemUnLCBoaWRlU2Nyb2xsYmFyKVxuICAgICAgfVxuXG4gICAgICB3YXRjaChcbiAgICAgICAgKCkgPT4gKHByb3BzLmNvbnRhaW5lciAhPT0gdHJ1ZSA/ICdhZGQnIDogJ3JlbW92ZScpLFxuICAgICAgICB1cGRhdGVTY3JvbGxFdmVudFxuICAgICAgKVxuXG4gICAgICBwcm9wcy5jb250YWluZXIgIT09IHRydWUgJiYgdXBkYXRlU2Nyb2xsRXZlbnQoJ2FkZCcpXG5cbiAgICAgIG9uVW5tb3VudGVkKCgpID0+IHtcbiAgICAgICAgdXBkYXRlU2Nyb2xsRXZlbnQoJ3JlbW92ZScpXG4gICAgICB9KVxuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjb25zdCBjb250ZW50ID0gaE1lcmdlU2xvdChzbG90cy5kZWZhdWx0LCBbXG4gICAgICAgIGgoUVNjcm9sbE9ic2VydmVyLCB7IG9uU2Nyb2xsOiBvblBhZ2VTY3JvbGwgfSksXG4gICAgICAgIGgoUVJlc2l6ZU9ic2VydmVyLCB7IG9uUmVzaXplOiBvblBhZ2VSZXNpemUgfSlcbiAgICAgIF0pXG5cbiAgICAgIGNvbnN0IGxheW91dCA9IGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUsXG4gICAgICAgIHN0eWxlOiBzdHlsZS52YWx1ZSxcbiAgICAgICAgcmVmOiBwcm9wcy5jb250YWluZXIgPT09IHRydWUgPyB2b2lkIDAgOiByb290UmVmLFxuICAgICAgICB0YWJpbmRleDogLTFcbiAgICAgIH0sIGNvbnRlbnQpXG5cbiAgICAgIGlmIChwcm9wcy5jb250YWluZXIgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogJ3EtbGF5b3V0LWNvbnRhaW5lciBvdmVyZmxvdy1oaWRkZW4nLFxuICAgICAgICAgIHJlZjogcm9vdFJlZlxuICAgICAgICB9LCBbXG4gICAgICAgICAgaChRUmVzaXplT2JzZXJ2ZXIsIHsgb25SZXNpemU6IG9uQ29udGFpbmVyUmVzaXplIH0pLFxuICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgIGNsYXNzOiAnYWJzb2x1dGUtZnVsbCcsXG4gICAgICAgICAgICBzdHlsZTogdGFyZ2V0U3R5bGUudmFsdWVcbiAgICAgICAgICB9LCBbXG4gICAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICAgIGNsYXNzOiAnc2Nyb2xsJyxcbiAgICAgICAgICAgICAgc3R5bGU6IHRhcmdldENoaWxkU3R5bGUudmFsdWVcbiAgICAgICAgICAgIH0sIFsgbGF5b3V0IF0pXG4gICAgICAgICAgXSlcbiAgICAgICAgXSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGxheW91dFxuICAgIH1cbiAgfVxufSlcbiJdLCJuYW1lcyI6WyJoZWlnaHQiLCJ3aWR0aCJdLCJtYXBwaW5ncyI6Ijs7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
