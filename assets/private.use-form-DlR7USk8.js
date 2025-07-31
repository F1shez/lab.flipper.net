import { h, c as computed } from "./index-BXn1qSjA.js";
const useFormProps = {
  name: String
};
function useFormInject(formAttrs = {}) {
  return (child, action, className) => {
    child[action](
      h("input", {
        class: "hidden" + (className || ""),
        ...formAttrs.value
      })
    );
  };
}
function useFormInputNameAttr(props) {
  return computed(() => props.name || props.for);
}
export {
  useFormInject as a,
  useFormInputNameAttr as b,
  useFormProps as u
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpdmF0ZS51c2UtZm9ybS1EbFI3VVNrOC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvdXNlLWZvcm0vcHJpdmF0ZS51c2UtZm9ybS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoLCBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuZXhwb3J0IGNvbnN0IHVzZUZvcm1Qcm9wcyA9IHtcbiAgbmFtZTogU3RyaW5nXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VGb3JtQXR0cnMgKHByb3BzKSB7XG4gIHJldHVybiBjb21wdXRlZCgoKSA9PiAoe1xuICAgIHR5cGU6ICdoaWRkZW4nLFxuICAgIG5hbWU6IHByb3BzLm5hbWUsXG4gICAgdmFsdWU6IHByb3BzLm1vZGVsVmFsdWVcbiAgfSkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VGb3JtSW5qZWN0IChmb3JtQXR0cnMgPSB7fSkge1xuICByZXR1cm4gKGNoaWxkLCBhY3Rpb24sIGNsYXNzTmFtZSkgPT4ge1xuICAgIGNoaWxkWyBhY3Rpb24gXShcbiAgICAgIGgoJ2lucHV0Jywge1xuICAgICAgICBjbGFzczogJ2hpZGRlbicgKyAoY2xhc3NOYW1lIHx8ICcnKSxcbiAgICAgICAgLi4uZm9ybUF0dHJzLnZhbHVlXG4gICAgICB9KVxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlRm9ybUlucHV0TmFtZUF0dHIgKHByb3BzKSB7XG4gIHJldHVybiBjb21wdXRlZCgoKSA9PiBwcm9wcy5uYW1lIHx8IHByb3BzLmZvcilcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRVksTUFBQyxlQUFlO0FBQUEsRUFDMUIsTUFBTTtBQUNSO0FBVU8sU0FBUyxjQUFlLFlBQVksSUFBSTtBQUM3QyxTQUFPLENBQUMsT0FBTyxRQUFRLGNBQWM7QUFDbkMsVUFBTyxNQUFNO0FBQUEsTUFDWCxFQUFFLFNBQVM7QUFBQSxRQUNULE9BQU8sWUFBWSxhQUFhO0FBQUEsUUFDaEMsR0FBRyxVQUFVO0FBQUEsTUFDckIsQ0FBTztBQUFBLElBQ1A7QUFBQSxFQUNFO0FBQ0Y7QUFFTyxTQUFTLHFCQUFzQixPQUFPO0FBQzNDLFNBQU8sU0FBUyxNQUFNLE1BQU0sUUFBUSxNQUFNLEdBQUc7QUFDL0M7IiwieF9nb29nbGVfaWdub3JlTGlzdCI6WzBdfQ==
