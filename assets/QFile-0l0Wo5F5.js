import { R as humanStorageSize, E as QChip } from "./KeypadButton.vue_vue_type_style_index_0_scoped_4cc0fc91_lang-B0Vue97M.js";
import { u as useFieldEmits, e as useNonInputFieldProps, c as useFieldState, g as useFileFormDomProps, f as fieldValueIsFilled, b as useField } from "./use-file-dom-props-CkTfPNnd.js";
import { u as useFormProps, b as useFormInputNameAttr } from "./private.use-form-DlR7USk8.js";
import { H as getCurrentInstance, a as ref, c as computed, an as stop, D as stopAndPrevent, z as client, h, L as createComponent, aH as injectProp, aD as prevent } from "./index-BXn1qSjA.js";
function filterFiles(files, rejectedFiles, failedPropValidation, filterFn) {
  const acceptedFiles = [];
  files.forEach((file) => {
    if (filterFn(file) === true) {
      acceptedFiles.push(file);
    } else {
      rejectedFiles.push({ failedPropValidation, file });
    }
  });
  return acceptedFiles;
}
function stopAndPreventDrag(e) {
  if (e == null ? void 0 : e.dataTransfer) {
    e.dataTransfer.dropEffect = "copy";
  }
  stopAndPrevent(e);
}
const useFileProps = {
  multiple: Boolean,
  accept: String,
  capture: String,
  maxFileSize: [Number, String],
  maxTotalSize: [Number, String],
  maxFiles: [Number, String],
  filter: Function
};
const useFileEmits = ["rejected"];
function useFile({
  editable,
  dnd,
  getFileInput,
  addFilesToQueue
}) {
  const { props, emit, proxy } = getCurrentInstance();
  const dndRef = ref(null);
  const extensions = computed(() => props.accept !== void 0 ? props.accept.split(",").map((ext) => {
    ext = ext.trim();
    if (ext === "*") {
      return "*/";
    } else if (ext.endsWith("/*")) {
      ext = ext.slice(0, ext.length - 1);
    }
    return ext.toUpperCase();
  }) : null);
  const maxFilesNumber = computed(() => parseInt(props.maxFiles, 10));
  const maxTotalSizeNumber = computed(() => parseInt(props.maxTotalSize, 10));
  function pickFiles(e) {
    var _a;
    if (editable.value) {
      if (e !== Object(e)) {
        e = { target: null };
      }
      if (((_a = e.target) == null ? void 0 : _a.matches('input[type="file"]')) === true) {
        e.clientX === 0 && e.clientY === 0 && stop(e);
      } else {
        const input = getFileInput();
        if (input !== e.target) input == null ? void 0 : input.click(e);
      }
    }
  }
  function addFiles(files) {
    if (editable.value && files) {
      addFilesToQueue(null, files);
    }
  }
  function processFiles(e, filesToProcess, currentFileList, append) {
    let files = Array.from(filesToProcess || e.target.files);
    const rejectedFiles = [];
    const done = () => {
      if (rejectedFiles.length !== 0) {
        emit("rejected", rejectedFiles);
      }
    };
    if (props.accept !== void 0 && extensions.value.indexOf("*/") === -1) {
      files = filterFiles(files, rejectedFiles, "accept", (file) => {
        return extensions.value.some((ext) => file.type.toUpperCase().startsWith(ext) || file.name.toUpperCase().endsWith(ext));
      });
      if (files.length === 0) {
        return done();
      }
    }
    if (props.maxFileSize !== void 0) {
      const maxFileSize = parseInt(props.maxFileSize, 10);
      files = filterFiles(files, rejectedFiles, "max-file-size", (file) => {
        return file.size <= maxFileSize;
      });
      if (files.length === 0) {
        return done();
      }
    }
    if (props.multiple !== true && files.length !== 0) {
      files = [files[0]];
    }
    files.forEach((file) => {
      file.__key = file.webkitRelativePath + file.lastModified + file.name + file.size;
    });
    if (append === true) {
      const filenameMap = currentFileList.map((entry) => entry.__key);
      files = filterFiles(files, rejectedFiles, "duplicate", (file) => {
        return filenameMap.includes(file.__key) === false;
      });
    }
    if (files.length === 0) {
      return done();
    }
    if (props.maxTotalSize !== void 0) {
      let size = append === true ? currentFileList.reduce((total, file) => total + file.size, 0) : 0;
      files = filterFiles(files, rejectedFiles, "max-total-size", (file) => {
        size += file.size;
        return size <= maxTotalSizeNumber.value;
      });
      if (files.length === 0) {
        return done();
      }
    }
    if (typeof props.filter === "function") {
      const filteredFiles = props.filter(files);
      files = filterFiles(files, rejectedFiles, "filter", (file) => {
        return filteredFiles.includes(file);
      });
    }
    if (props.maxFiles !== void 0) {
      let filesNumber = append === true ? currentFileList.length : 0;
      files = filterFiles(files, rejectedFiles, "max-files", () => {
        filesNumber++;
        return filesNumber <= maxFilesNumber.value;
      });
      if (files.length === 0) {
        return done();
      }
    }
    done();
    if (files.length !== 0) {
      return files;
    }
  }
  function onDragover(e) {
    stopAndPreventDrag(e);
    dnd.value !== true && (dnd.value = true);
  }
  function onDragleave(e) {
    stopAndPrevent(e);
    const gone = e.relatedTarget !== null || client.is.safari !== true ? e.relatedTarget !== dndRef.value : document.elementsFromPoint(e.clientX, e.clientY).includes(dndRef.value) === false;
    gone === true && (dnd.value = false);
  }
  function onDrop(e) {
    stopAndPreventDrag(e);
    const files = e.dataTransfer.files;
    if (files.length !== 0) {
      addFilesToQueue(null, files);
    }
    dnd.value = false;
  }
  function getDndNode(type) {
    if (dnd.value === true) {
      return h("div", {
        ref: dndRef,
        class: `q-${type}__dnd absolute-full`,
        onDragenter: stopAndPreventDrag,
        onDragover: stopAndPreventDrag,
        onDragleave,
        onDrop
      });
    }
  }
  Object.assign(proxy, { pickFiles, addFiles });
  return {
    pickFiles,
    addFiles,
    onDragover,
    onDragleave,
    processFiles,
    getDndNode,
    maxFilesNumber,
    maxTotalSizeNumber
  };
}
const QFile = createComponent({
  name: "QFile",
  inheritAttrs: false,
  props: {
    ...useNonInputFieldProps,
    ...useFormProps,
    ...useFileProps,
    /* SSR does not know about File & FileList */
    modelValue: [File, FileList, Array],
    append: Boolean,
    useChips: Boolean,
    displayValue: [String, Number],
    tabindex: {
      type: [String, Number],
      default: 0
    },
    counterLabel: Function,
    inputClass: [Array, String, Object],
    inputStyle: [Array, String, Object]
  },
  emits: [
    ...useFieldEmits,
    ...useFileEmits
  ],
  setup(props, { slots, emit, attrs }) {
    const { proxy } = getCurrentInstance();
    const state = useFieldState();
    const inputRef = ref(null);
    const dnd = ref(false);
    const nameProp = useFormInputNameAttr(props);
    const {
      pickFiles,
      onDragover,
      onDragleave,
      processFiles,
      getDndNode
    } = useFile({ editable: state.editable, dnd, getFileInput, addFilesToQueue });
    const formDomProps = useFileFormDomProps(props);
    const innerValue = computed(() => Object(props.modelValue) === props.modelValue ? "length" in props.modelValue ? Array.from(props.modelValue) : [props.modelValue] : []);
    const hasValue = computed(() => fieldValueIsFilled(innerValue.value));
    const selectedString = computed(
      () => innerValue.value.map((file) => file.name).join(", ")
    );
    const totalSize = computed(
      () => humanStorageSize(
        innerValue.value.reduce((acc, file) => acc + file.size, 0)
      )
    );
    const counterProps = computed(() => ({
      totalSize: totalSize.value,
      filesNumber: innerValue.value.length,
      maxFiles: props.maxFiles
    }));
    const inputAttrs = computed(() => ({
      tabindex: -1,
      type: "file",
      title: "",
      // try to remove default tooltip,
      accept: props.accept,
      capture: props.capture,
      name: nameProp.value,
      ...attrs,
      id: state.targetUid.value,
      disabled: state.editable.value !== true
    }));
    const fieldClass = computed(
      () => "q-file q-field--auto-height" + (dnd.value === true ? " q-file--dnd" : "")
    );
    const isAppending = computed(
      () => props.multiple === true && props.append === true
    );
    function removeAtIndex(index) {
      const files = innerValue.value.slice();
      files.splice(index, 1);
      emitValue(files);
    }
    function removeFile(file) {
      const index = innerValue.value.indexOf(file);
      if (index !== -1) {
        removeAtIndex(index);
      }
    }
    function emitValue(files) {
      emit("update:modelValue", props.multiple === true ? files : files[0]);
    }
    function onKeydown(e) {
      e.keyCode === 13 && prevent(e);
    }
    function onKeyup(e) {
      if (e.keyCode === 13 || e.keyCode === 32) {
        pickFiles(e);
      }
    }
    function getFileInput() {
      return inputRef.value;
    }
    function addFilesToQueue(e, fileList) {
      const files = processFiles(e, fileList, innerValue.value, isAppending.value);
      const fileInput = getFileInput();
      if (fileInput !== void 0 && fileInput !== null) {
        fileInput.value = "";
      }
      if (files === void 0) return;
      if (props.multiple === true ? props.modelValue && files.every((f) => innerValue.value.includes(f)) : props.modelValue === files[0]) return;
      emitValue(
        isAppending.value === true ? innerValue.value.concat(files) : files
      );
    }
    function getFiller() {
      return [
        h("input", {
          class: [props.inputClass, "q-file__filler"],
          style: props.inputStyle
        })
      ];
    }
    function getSelection() {
      if (slots.file !== void 0) {
        return innerValue.value.length === 0 ? getFiller() : innerValue.value.map(
          (file, index) => slots.file({ index, file, ref: this })
        );
      }
      if (slots.selected !== void 0) {
        return innerValue.value.length === 0 ? getFiller() : slots.selected({ files: innerValue.value, ref: this });
      }
      if (props.useChips === true) {
        return innerValue.value.length === 0 ? getFiller() : innerValue.value.map((file, i) => h(QChip, {
          key: "file-" + i,
          removable: state.editable.value,
          dense: true,
          textColor: props.color,
          tabindex: props.tabindex,
          onRemove: () => {
            removeAtIndex(i);
          }
        }, () => h("span", {
          class: "ellipsis",
          textContent: file.name
        })));
      }
      const textContent = props.displayValue !== void 0 ? props.displayValue : selectedString.value;
      return textContent.length !== 0 ? [
        h("div", {
          class: props.inputClass,
          style: props.inputStyle,
          textContent
        })
      ] : getFiller();
    }
    function getInput() {
      const data = {
        ref: inputRef,
        ...inputAttrs.value,
        ...formDomProps.value,
        class: "q-field__input fit absolute-full cursor-pointer",
        onChange: addFilesToQueue
      };
      if (props.multiple === true) {
        data.multiple = true;
      }
      return h("input", data);
    }
    Object.assign(state, {
      fieldClass,
      emitValue,
      hasValue,
      inputRef,
      innerValue,
      floatingLabel: computed(
        () => hasValue.value === true || fieldValueIsFilled(props.displayValue)
      ),
      computedCounter: computed(() => {
        if (props.counterLabel !== void 0) {
          return props.counterLabel(counterProps.value);
        }
        const max = props.maxFiles;
        return `${innerValue.value.length}${max !== void 0 ? " / " + max : ""} (${totalSize.value})`;
      }),
      getControlChild: () => getDndNode("file"),
      getControl: () => {
        const data = {
          ref: state.targetRef,
          class: "q-field__native row items-center cursor-pointer",
          tabindex: props.tabindex
        };
        if (state.editable.value === true) {
          Object.assign(data, { onDragover, onDragleave, onKeydown, onKeyup });
        }
        return h("div", data, [getInput()].concat(getSelection()));
      }
    });
    Object.assign(proxy, {
      removeAtIndex,
      removeFile,
      getNativeElement: () => inputRef.value
      // deprecated
    });
    injectProp(proxy, "nativeEl", () => inputRef.value);
    return useField(state);
  }
});
export {
  QFile as Q
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUUZpbGUtMGwwV281RjUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLWZpbGUvdXNlLWZpbGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2ZpbGUvUUZpbGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBjbGllbnQgfSBmcm9tICcuLi8uLi9wbHVnaW5zL3BsYXRmb3JtL1BsYXRmb3JtLmpzJ1xuaW1wb3J0IHsgc3RvcCwgc3RvcEFuZFByZXZlbnQgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC9ldmVudC5qcydcblxuZnVuY3Rpb24gZmlsdGVyRmlsZXMgKGZpbGVzLCByZWplY3RlZEZpbGVzLCBmYWlsZWRQcm9wVmFsaWRhdGlvbiwgZmlsdGVyRm4pIHtcbiAgY29uc3QgYWNjZXB0ZWRGaWxlcyA9IFtdXG5cbiAgZmlsZXMuZm9yRWFjaChmaWxlID0+IHtcbiAgICBpZiAoZmlsdGVyRm4oZmlsZSkgPT09IHRydWUpIHtcbiAgICAgIGFjY2VwdGVkRmlsZXMucHVzaChmaWxlKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJlamVjdGVkRmlsZXMucHVzaCh7IGZhaWxlZFByb3BWYWxpZGF0aW9uLCBmaWxlIH0pXG4gICAgfVxuICB9KVxuXG4gIHJldHVybiBhY2NlcHRlZEZpbGVzXG59XG5cbmZ1bmN0aW9uIHN0b3BBbmRQcmV2ZW50RHJhZyAoZSkge1xuICBpZiAoZT8uZGF0YVRyYW5zZmVyKSB7XG4gICAgZS5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdjb3B5J1xuICB9XG5cbiAgc3RvcEFuZFByZXZlbnQoZSlcbn1cblxuZXhwb3J0IGNvbnN0IHVzZUZpbGVQcm9wcyA9IHtcbiAgbXVsdGlwbGU6IEJvb2xlYW4sXG4gIGFjY2VwdDogU3RyaW5nLFxuICBjYXB0dXJlOiBTdHJpbmcsXG4gIG1heEZpbGVTaXplOiBbIE51bWJlciwgU3RyaW5nIF0sXG4gIG1heFRvdGFsU2l6ZTogWyBOdW1iZXIsIFN0cmluZyBdLFxuICBtYXhGaWxlczogWyBOdW1iZXIsIFN0cmluZyBdLFxuICBmaWx0ZXI6IEZ1bmN0aW9uXG59XG5cbmV4cG9ydCBjb25zdCB1c2VGaWxlRW1pdHMgPSBbICdyZWplY3RlZCcgXVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoe1xuICBlZGl0YWJsZSxcbiAgZG5kLFxuICBnZXRGaWxlSW5wdXQsXG4gIGFkZEZpbGVzVG9RdWV1ZVxufSkge1xuICBjb25zdCB7IHByb3BzLCBlbWl0LCBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICBjb25zdCBkbmRSZWYgPSByZWYobnVsbClcblxuICBjb25zdCBleHRlbnNpb25zID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgIHByb3BzLmFjY2VwdCAhPT0gdm9pZCAwXG4gICAgICA/IHByb3BzLmFjY2VwdC5zcGxpdCgnLCcpLm1hcChleHQgPT4ge1xuICAgICAgICBleHQgPSBleHQudHJpbSgpXG4gICAgICAgIGlmIChleHQgPT09ICcqJykgeyAvLyBzdXBwb3J0IFwiKlwiXG4gICAgICAgICAgcmV0dXJuICcqLydcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChleHQuZW5kc1dpdGgoJy8qJykpIHsgLy8gc3VwcG9ydCBcImltYWdlLypcIiBvciBcIiovKlwiXG4gICAgICAgICAgZXh0ID0gZXh0LnNsaWNlKDAsIGV4dC5sZW5ndGggLSAxKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBleHQudG9VcHBlckNhc2UoKVxuICAgICAgfSlcbiAgICAgIDogbnVsbFxuICApKVxuXG4gIGNvbnN0IG1heEZpbGVzTnVtYmVyID0gY29tcHV0ZWQoKCkgPT4gcGFyc2VJbnQocHJvcHMubWF4RmlsZXMsIDEwKSlcbiAgY29uc3QgbWF4VG90YWxTaXplTnVtYmVyID0gY29tcHV0ZWQoKCkgPT4gcGFyc2VJbnQocHJvcHMubWF4VG90YWxTaXplLCAxMCkpXG5cbiAgZnVuY3Rpb24gcGlja0ZpbGVzIChlKSB7XG4gICAgaWYgKGVkaXRhYmxlLnZhbHVlKSB7XG4gICAgICBpZiAoZSAhPT0gT2JqZWN0KGUpKSB7XG4gICAgICAgIGUgPSB7IHRhcmdldDogbnVsbCB9XG4gICAgICB9XG5cbiAgICAgIGlmIChlLnRhcmdldD8ubWF0Y2hlcygnaW5wdXRbdHlwZT1cImZpbGVcIl0nKSA9PT0gdHJ1ZSkge1xuICAgICAgICAvLyBzdG9wIHByb3BhZ2F0aW9uIGlmIGl0J3Mgbm90IGEgcmVhbCBwb2ludGVyIGV2ZW50XG4gICAgICAgIGUuY2xpZW50WCA9PT0gMCAmJiBlLmNsaWVudFkgPT09IDAgJiYgc3RvcChlKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gZ2V0RmlsZUlucHV0KClcbiAgICAgICAgaWYgKGlucHV0ICE9PSBlLnRhcmdldCkgaW5wdXQ/LmNsaWNrKGUpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYWRkRmlsZXMgKGZpbGVzKSB7XG4gICAgaWYgKGVkaXRhYmxlLnZhbHVlICYmIGZpbGVzKSB7XG4gICAgICBhZGRGaWxlc1RvUXVldWUobnVsbCwgZmlsZXMpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcHJvY2Vzc0ZpbGVzIChlLCBmaWxlc1RvUHJvY2VzcywgY3VycmVudEZpbGVMaXN0LCBhcHBlbmQpIHtcbiAgICBsZXQgZmlsZXMgPSBBcnJheS5mcm9tKGZpbGVzVG9Qcm9jZXNzIHx8IGUudGFyZ2V0LmZpbGVzKVxuICAgIGNvbnN0IHJlamVjdGVkRmlsZXMgPSBbXVxuXG4gICAgY29uc3QgZG9uZSA9ICgpID0+IHtcbiAgICAgIGlmIChyZWplY3RlZEZpbGVzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICBlbWl0KCdyZWplY3RlZCcsIHJlamVjdGVkRmlsZXMpXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZmlsdGVyIGZpbGUgdHlwZXNcbiAgICBpZiAocHJvcHMuYWNjZXB0ICE9PSB2b2lkIDAgJiYgZXh0ZW5zaW9ucy52YWx1ZS5pbmRleE9mKCcqLycpID09PSAtMSkge1xuICAgICAgZmlsZXMgPSBmaWx0ZXJGaWxlcyhmaWxlcywgcmVqZWN0ZWRGaWxlcywgJ2FjY2VwdCcsIGZpbGUgPT4ge1xuICAgICAgICByZXR1cm4gZXh0ZW5zaW9ucy52YWx1ZS5zb21lKGV4dCA9PiAoXG4gICAgICAgICAgZmlsZS50eXBlLnRvVXBwZXJDYXNlKCkuc3RhcnRzV2l0aChleHQpXG4gICAgICAgICAgfHwgZmlsZS5uYW1lLnRvVXBwZXJDYXNlKCkuZW5kc1dpdGgoZXh0KVxuICAgICAgICApKVxuICAgICAgfSlcblxuICAgICAgaWYgKGZpbGVzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gZG9uZSgpIH1cbiAgICB9XG5cbiAgICAvLyBmaWx0ZXIgbWF4IGZpbGUgc2l6ZVxuICAgIGlmIChwcm9wcy5tYXhGaWxlU2l6ZSAhPT0gdm9pZCAwKSB7XG4gICAgICBjb25zdCBtYXhGaWxlU2l6ZSA9IHBhcnNlSW50KHByb3BzLm1heEZpbGVTaXplLCAxMClcbiAgICAgIGZpbGVzID0gZmlsdGVyRmlsZXMoZmlsZXMsIHJlamVjdGVkRmlsZXMsICdtYXgtZmlsZS1zaXplJywgZmlsZSA9PiB7XG4gICAgICAgIHJldHVybiBmaWxlLnNpemUgPD0gbWF4RmlsZVNpemVcbiAgICAgIH0pXG5cbiAgICAgIGlmIChmaWxlcy5sZW5ndGggPT09IDApIHsgcmV0dXJuIGRvbmUoKSB9XG4gICAgfVxuXG4gICAgLy8gQ29yZG92YS9pT1MgYWxsb3dzIHNlbGVjdGluZyBtdWx0aXBsZSBmaWxlcyBldmVuIHdoZW4gdGhlXG4gICAgLy8gbXVsdGlwbGUgYXR0cmlidXRlIGlzIG5vdCBzcGVjaWZpZWQuIFdlIGFsc28gbm9ybWFsaXplIGRyYWcnbidkcm9wcGVkXG4gICAgLy8gZmlsZXMgaGVyZTpcbiAgICBpZiAocHJvcHMubXVsdGlwbGUgIT09IHRydWUgJiYgZmlsZXMubGVuZ3RoICE9PSAwKSB7XG4gICAgICBmaWxlcyA9IFsgZmlsZXNbIDAgXSBdXG4gICAgfVxuXG4gICAgLy8gQ29tcHV0ZSBrZXkgdG8gdXNlIGZvciBlYWNoIGZpbGVcbiAgICBmaWxlcy5mb3JFYWNoKGZpbGUgPT4ge1xuICAgICAgZmlsZS5fX2tleSA9IGZpbGUud2Via2l0UmVsYXRpdmVQYXRoICsgZmlsZS5sYXN0TW9kaWZpZWQgKyBmaWxlLm5hbWUgKyBmaWxlLnNpemVcbiAgICB9KVxuXG4gICAgaWYgKGFwcGVuZCA9PT0gdHJ1ZSkge1xuICAgICAgLy8gQXZvaWQgZHVwbGljYXRlIGZpbGVzXG4gICAgICBjb25zdCBmaWxlbmFtZU1hcCA9IGN1cnJlbnRGaWxlTGlzdC5tYXAoZW50cnkgPT4gZW50cnkuX19rZXkpXG4gICAgICBmaWxlcyA9IGZpbHRlckZpbGVzKGZpbGVzLCByZWplY3RlZEZpbGVzLCAnZHVwbGljYXRlJywgZmlsZSA9PiB7XG4gICAgICAgIHJldHVybiBmaWxlbmFtZU1hcC5pbmNsdWRlcyhmaWxlLl9fa2V5KSA9PT0gZmFsc2VcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgaWYgKGZpbGVzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gZG9uZSgpIH1cblxuICAgIGlmIChwcm9wcy5tYXhUb3RhbFNpemUgIT09IHZvaWQgMCkge1xuICAgICAgbGV0IHNpemUgPSBhcHBlbmQgPT09IHRydWVcbiAgICAgICAgPyBjdXJyZW50RmlsZUxpc3QucmVkdWNlKCh0b3RhbCwgZmlsZSkgPT4gdG90YWwgKyBmaWxlLnNpemUsIDApXG4gICAgICAgIDogMFxuXG4gICAgICBmaWxlcyA9IGZpbHRlckZpbGVzKGZpbGVzLCByZWplY3RlZEZpbGVzLCAnbWF4LXRvdGFsLXNpemUnLCBmaWxlID0+IHtcbiAgICAgICAgc2l6ZSArPSBmaWxlLnNpemVcbiAgICAgICAgcmV0dXJuIHNpemUgPD0gbWF4VG90YWxTaXplTnVtYmVyLnZhbHVlXG4gICAgICB9KVxuXG4gICAgICBpZiAoZmlsZXMubGVuZ3RoID09PSAwKSB7IHJldHVybiBkb25lKCkgfVxuICAgIH1cblxuICAgIC8vIGRvIHdlIGhhdmUgY3VzdG9tIGZpbHRlciBmdW5jdGlvbj9cbiAgICBpZiAodHlwZW9mIHByb3BzLmZpbHRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc3QgZmlsdGVyZWRGaWxlcyA9IHByb3BzLmZpbHRlcihmaWxlcylcbiAgICAgIGZpbGVzID0gZmlsdGVyRmlsZXMoZmlsZXMsIHJlamVjdGVkRmlsZXMsICdmaWx0ZXInLCBmaWxlID0+IHtcbiAgICAgICAgcmV0dXJuIGZpbHRlcmVkRmlsZXMuaW5jbHVkZXMoZmlsZSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgaWYgKHByb3BzLm1heEZpbGVzICE9PSB2b2lkIDApIHtcbiAgICAgIGxldCBmaWxlc051bWJlciA9IGFwcGVuZCA9PT0gdHJ1ZVxuICAgICAgICA/IGN1cnJlbnRGaWxlTGlzdC5sZW5ndGhcbiAgICAgICAgOiAwXG5cbiAgICAgIGZpbGVzID0gZmlsdGVyRmlsZXMoZmlsZXMsIHJlamVjdGVkRmlsZXMsICdtYXgtZmlsZXMnLCAoKSA9PiB7XG4gICAgICAgIGZpbGVzTnVtYmVyKytcbiAgICAgICAgcmV0dXJuIGZpbGVzTnVtYmVyIDw9IG1heEZpbGVzTnVtYmVyLnZhbHVlXG4gICAgICB9KVxuXG4gICAgICBpZiAoZmlsZXMubGVuZ3RoID09PSAwKSB7IHJldHVybiBkb25lKCkgfVxuICAgIH1cblxuICAgIGRvbmUoKVxuXG4gICAgaWYgKGZpbGVzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgcmV0dXJuIGZpbGVzXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25EcmFnb3ZlciAoZSkge1xuICAgIHN0b3BBbmRQcmV2ZW50RHJhZyhlKVxuICAgIGRuZC52YWx1ZSAhPT0gdHJ1ZSAmJiAoZG5kLnZhbHVlID0gdHJ1ZSlcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uRHJhZ2xlYXZlIChlKSB7XG4gICAgc3RvcEFuZFByZXZlbnQoZSlcblxuICAgIC8vIFNhZmFyaSBidWc6IHJlbGF0ZWRUYXJnZXQgaXMgbnVsbCBmb3Igb3ZlciAxMCB5ZWFyc1xuICAgIC8vIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD02NjU0N1xuICAgIGNvbnN0IGdvbmUgPSBlLnJlbGF0ZWRUYXJnZXQgIT09IG51bGwgfHwgY2xpZW50LmlzLnNhZmFyaSAhPT0gdHJ1ZVxuICAgICAgPyBlLnJlbGF0ZWRUYXJnZXQgIT09IGRuZFJlZi52YWx1ZVxuICAgICAgOiBkb2N1bWVudC5lbGVtZW50c0Zyb21Qb2ludChlLmNsaWVudFgsIGUuY2xpZW50WSkuaW5jbHVkZXMoZG5kUmVmLnZhbHVlKSA9PT0gZmFsc2VcblxuICAgIGdvbmUgPT09IHRydWUgJiYgKGRuZC52YWx1ZSA9IGZhbHNlKVxuICB9XG5cbiAgZnVuY3Rpb24gb25Ecm9wIChlKSB7XG4gICAgc3RvcEFuZFByZXZlbnREcmFnKGUpXG4gICAgY29uc3QgZmlsZXMgPSBlLmRhdGFUcmFuc2Zlci5maWxlc1xuXG4gICAgaWYgKGZpbGVzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgYWRkRmlsZXNUb1F1ZXVlKG51bGwsIGZpbGVzKVxuICAgIH1cblxuICAgIGRuZC52YWx1ZSA9IGZhbHNlXG4gIH1cblxuICBmdW5jdGlvbiBnZXREbmROb2RlICh0eXBlKSB7XG4gICAgaWYgKGRuZC52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgcmVmOiBkbmRSZWYsXG4gICAgICAgIGNsYXNzOiBgcS0keyB0eXBlIH1fX2RuZCBhYnNvbHV0ZS1mdWxsYCxcbiAgICAgICAgb25EcmFnZW50ZXI6IHN0b3BBbmRQcmV2ZW50RHJhZyxcbiAgICAgICAgb25EcmFnb3Zlcjogc3RvcEFuZFByZXZlbnREcmFnLFxuICAgICAgICBvbkRyYWdsZWF2ZSxcbiAgICAgICAgb25Ecm9wXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kc1xuICBPYmplY3QuYXNzaWduKHByb3h5LCB7IHBpY2tGaWxlcywgYWRkRmlsZXMgfSlcblxuICByZXR1cm4ge1xuICAgIHBpY2tGaWxlcyxcbiAgICBhZGRGaWxlcyxcbiAgICBvbkRyYWdvdmVyLFxuICAgIG9uRHJhZ2xlYXZlLFxuICAgIHByb2Nlc3NGaWxlcyxcbiAgICBnZXREbmROb2RlLFxuXG4gICAgbWF4RmlsZXNOdW1iZXIsXG4gICAgbWF4VG90YWxTaXplTnVtYmVyXG4gIH1cbn1cbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFDaGlwIGZyb20gJy4uL2NoaXAvUUNoaXAuanMnXG5cbmltcG9ydCB1c2VGaWVsZCwgeyB1c2VGaWVsZFN0YXRlLCB1c2VOb25JbnB1dEZpZWxkUHJvcHMsIHVzZUZpZWxkRW1pdHMsIGZpZWxkVmFsdWVJc0ZpbGxlZCB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLWZpZWxkL3VzZS1maWVsZC5qcydcbmltcG9ydCB7IHVzZUZvcm1Qcm9wcywgdXNlRm9ybUlucHV0TmFtZUF0dHIgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy91c2UtZm9ybS9wcml2YXRlLnVzZS1mb3JtLmpzJ1xuaW1wb3J0IHVzZUZpbGUsIHsgdXNlRmlsZVByb3BzLCB1c2VGaWxlRW1pdHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1maWxlL3VzZS1maWxlLmpzJ1xuaW1wb3J0IHVzZUZpbGVGb3JtRG9tUHJvcHMgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtZmlsZS91c2UtZmlsZS1kb20tcHJvcHMuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGh1bWFuU3RvcmFnZVNpemUgfSBmcm9tICcuLi8uLi91dGlscy9mb3JtYXQvZm9ybWF0LmpzJ1xuaW1wb3J0IHsgcHJldmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50L2V2ZW50LmpzJ1xuaW1wb3J0IHsgaW5qZWN0UHJvcCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuaW5qZWN0LW9iai1wcm9wL2luamVjdC1vYmotcHJvcC5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FGaWxlJyxcblxuICBpbmhlcml0QXR0cnM6IGZhbHNlLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlTm9uSW5wdXRGaWVsZFByb3BzLFxuICAgIC4uLnVzZUZvcm1Qcm9wcyxcbiAgICAuLi51c2VGaWxlUHJvcHMsXG5cbiAgICAvKiBTU1IgZG9lcyBub3Qga25vdyBhYm91dCBGaWxlICYgRmlsZUxpc3QgKi9cbiAgICBtb2RlbFZhbHVlOiBfX1FVQVNBUl9TU1JfU0VSVkVSX19cbiAgICAgID8ge31cbiAgICAgIDogWyBGaWxlLCBGaWxlTGlzdCwgQXJyYXkgXSxcblxuICAgIGFwcGVuZDogQm9vbGVhbixcbiAgICB1c2VDaGlwczogQm9vbGVhbixcbiAgICBkaXNwbGF5VmFsdWU6IFsgU3RyaW5nLCBOdW1iZXIgXSxcblxuICAgIHRhYmluZGV4OiB7XG4gICAgICB0eXBlOiBbIFN0cmluZywgTnVtYmVyIF0sXG4gICAgICBkZWZhdWx0OiAwXG4gICAgfSxcblxuICAgIGNvdW50ZXJMYWJlbDogRnVuY3Rpb24sXG5cbiAgICBpbnB1dENsYXNzOiBbIEFycmF5LCBTdHJpbmcsIE9iamVjdCBdLFxuICAgIGlucHV0U3R5bGU6IFsgQXJyYXksIFN0cmluZywgT2JqZWN0IF1cbiAgfSxcblxuICBlbWl0czogW1xuICAgIC4uLnVzZUZpZWxkRW1pdHMsXG4gICAgLi4udXNlRmlsZUVtaXRzXG4gIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0LCBhdHRycyB9KSB7XG4gICAgY29uc3QgeyBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIGNvbnN0IHN0YXRlID0gdXNlRmllbGRTdGF0ZSgpXG5cbiAgICBjb25zdCBpbnB1dFJlZiA9IHJlZihudWxsKVxuICAgIGNvbnN0IGRuZCA9IHJlZihmYWxzZSlcbiAgICBjb25zdCBuYW1lUHJvcCA9IHVzZUZvcm1JbnB1dE5hbWVBdHRyKHByb3BzKVxuXG4gICAgY29uc3Qge1xuICAgICAgcGlja0ZpbGVzLFxuICAgICAgb25EcmFnb3ZlcixcbiAgICAgIG9uRHJhZ2xlYXZlLFxuICAgICAgcHJvY2Vzc0ZpbGVzLFxuICAgICAgZ2V0RG5kTm9kZVxuICAgIH0gPSB1c2VGaWxlKHsgZWRpdGFibGU6IHN0YXRlLmVkaXRhYmxlLCBkbmQsIGdldEZpbGVJbnB1dCwgYWRkRmlsZXNUb1F1ZXVlIH0pXG5cbiAgICBjb25zdCBmb3JtRG9tUHJvcHMgPSB1c2VGaWxlRm9ybURvbVByb3BzKHByb3BzKVxuXG4gICAgY29uc3QgaW5uZXJWYWx1ZSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIE9iamVjdChwcm9wcy5tb2RlbFZhbHVlKSA9PT0gcHJvcHMubW9kZWxWYWx1ZVxuICAgICAgICA/ICgnbGVuZ3RoJyBpbiBwcm9wcy5tb2RlbFZhbHVlID8gQXJyYXkuZnJvbShwcm9wcy5tb2RlbFZhbHVlKSA6IFsgcHJvcHMubW9kZWxWYWx1ZSBdKVxuICAgICAgICA6IFtdXG4gICAgKSlcblxuICAgIGNvbnN0IGhhc1ZhbHVlID0gY29tcHV0ZWQoKCkgPT4gZmllbGRWYWx1ZUlzRmlsbGVkKGlubmVyVmFsdWUudmFsdWUpKVxuXG4gICAgY29uc3Qgc2VsZWN0ZWRTdHJpbmcgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgaW5uZXJWYWx1ZS52YWx1ZVxuICAgICAgICAubWFwKGZpbGUgPT4gZmlsZS5uYW1lKVxuICAgICAgICAuam9pbignLCAnKVxuICAgIClcblxuICAgIGNvbnN0IHRvdGFsU2l6ZSA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBodW1hblN0b3JhZ2VTaXplKFxuICAgICAgICBpbm5lclZhbHVlLnZhbHVlLnJlZHVjZSgoYWNjLCBmaWxlKSA9PiBhY2MgKyBmaWxlLnNpemUsIDApXG4gICAgICApXG4gICAgKVxuXG4gICAgY29uc3QgY291bnRlclByb3BzID0gY29tcHV0ZWQoKCkgPT4gKHtcbiAgICAgIHRvdGFsU2l6ZTogdG90YWxTaXplLnZhbHVlLFxuICAgICAgZmlsZXNOdW1iZXI6IGlubmVyVmFsdWUudmFsdWUubGVuZ3RoLFxuICAgICAgbWF4RmlsZXM6IHByb3BzLm1heEZpbGVzXG4gICAgfSkpXG5cbiAgICBjb25zdCBpbnB1dEF0dHJzID0gY29tcHV0ZWQoKCkgPT4gKHtcbiAgICAgIHRhYmluZGV4OiAtMSxcbiAgICAgIHR5cGU6ICdmaWxlJyxcbiAgICAgIHRpdGxlOiAnJywgLy8gdHJ5IHRvIHJlbW92ZSBkZWZhdWx0IHRvb2x0aXAsXG4gICAgICBhY2NlcHQ6IHByb3BzLmFjY2VwdCxcbiAgICAgIGNhcHR1cmU6IHByb3BzLmNhcHR1cmUsXG4gICAgICBuYW1lOiBuYW1lUHJvcC52YWx1ZSxcbiAgICAgIC4uLmF0dHJzLFxuICAgICAgaWQ6IHN0YXRlLnRhcmdldFVpZC52YWx1ZSxcbiAgICAgIGRpc2FibGVkOiBzdGF0ZS5lZGl0YWJsZS52YWx1ZSAhPT0gdHJ1ZVxuICAgIH0pKVxuXG4gICAgY29uc3QgZmllbGRDbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1maWxlIHEtZmllbGQtLWF1dG8taGVpZ2h0J1xuICAgICAgKyAoZG5kLnZhbHVlID09PSB0cnVlID8gJyBxLWZpbGUtLWRuZCcgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCBpc0FwcGVuZGluZyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5tdWx0aXBsZSA9PT0gdHJ1ZSAmJiBwcm9wcy5hcHBlbmQgPT09IHRydWVcbiAgICApXG5cbiAgICBmdW5jdGlvbiByZW1vdmVBdEluZGV4IChpbmRleCkge1xuICAgICAgY29uc3QgZmlsZXMgPSBpbm5lclZhbHVlLnZhbHVlLnNsaWNlKClcbiAgICAgIGZpbGVzLnNwbGljZShpbmRleCwgMSlcbiAgICAgIGVtaXRWYWx1ZShmaWxlcylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVGaWxlIChmaWxlKSB7XG4gICAgICBjb25zdCBpbmRleCA9IGlubmVyVmFsdWUudmFsdWUuaW5kZXhPZihmaWxlKVxuICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICByZW1vdmVBdEluZGV4KGluZGV4KVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVtaXRWYWx1ZSAoZmlsZXMpIHtcbiAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgcHJvcHMubXVsdGlwbGUgPT09IHRydWUgPyBmaWxlcyA6IGZpbGVzWyAwIF0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25LZXlkb3duIChlKSB7XG4gICAgICAvLyBwcmV2ZW50IGZvcm0gc3VibWl0IGlmIEVOVEVSIGlzIHByZXNzZWRcbiAgICAgIGUua2V5Q29kZSA9PT0gMTMgJiYgcHJldmVudChlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uS2V5dXAgKGUpIHtcbiAgICAgIC8vIG9ubHkgb24gRU5URVIgYW5kIFNQQUNFIHRvIG1hdGNoIG5hdGl2ZSBpbnB1dCBmaWVsZFxuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMgfHwgZS5rZXlDb2RlID09PSAzMikge1xuICAgICAgICBwaWNrRmlsZXMoZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRGaWxlSW5wdXQgKCkge1xuICAgICAgcmV0dXJuIGlucHV0UmVmLnZhbHVlXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkRmlsZXNUb1F1ZXVlIChlLCBmaWxlTGlzdCkge1xuICAgICAgY29uc3QgZmlsZXMgPSBwcm9jZXNzRmlsZXMoZSwgZmlsZUxpc3QsIGlubmVyVmFsdWUudmFsdWUsIGlzQXBwZW5kaW5nLnZhbHVlKVxuICAgICAgY29uc3QgZmlsZUlucHV0ID0gZ2V0RmlsZUlucHV0KClcblxuICAgICAgaWYgKGZpbGVJbnB1dCAhPT0gdm9pZCAwICYmIGZpbGVJbnB1dCAhPT0gbnVsbCkge1xuICAgICAgICBmaWxlSW5wdXQudmFsdWUgPSAnJ1xuICAgICAgfVxuXG4gICAgICAvLyBpZiBub3RoaW5nIHRvIGRvLi4uXG4gICAgICBpZiAoZmlsZXMgPT09IHZvaWQgMCkgcmV0dXJuXG5cbiAgICAgIC8vIHByb3RlY3QgYWdhaW5zdCBpbnB1dCBAY2hhbmdlIGJlaW5nIGNhbGxlZCBpbiBhIGxvb3BcbiAgICAgIC8vIGxpa2UgaXQgaGFwcGVucyBvbiBTYWZhcmksIHNvIGRvbid0IGVtaXQgc2FtZSB0aGluZzpcbiAgICAgIGlmIChcbiAgICAgICAgcHJvcHMubXVsdGlwbGUgPT09IHRydWVcbiAgICAgICAgICA/IHByb3BzLm1vZGVsVmFsdWUgJiYgZmlsZXMuZXZlcnkoZiA9PiBpbm5lclZhbHVlLnZhbHVlLmluY2x1ZGVzKGYpKVxuICAgICAgICAgIDogcHJvcHMubW9kZWxWYWx1ZSA9PT0gZmlsZXNbIDAgXVxuICAgICAgKSByZXR1cm5cblxuICAgICAgZW1pdFZhbHVlKFxuICAgICAgICBpc0FwcGVuZGluZy52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgID8gaW5uZXJWYWx1ZS52YWx1ZS5jb25jYXQoZmlsZXMpXG4gICAgICAgICAgOiBmaWxlc1xuICAgICAgKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEZpbGxlciAoKSB7XG4gICAgICByZXR1cm4gW1xuICAgICAgICBoKCdpbnB1dCcsIHtcbiAgICAgICAgICBjbGFzczogWyBwcm9wcy5pbnB1dENsYXNzLCAncS1maWxlX19maWxsZXInIF0sXG4gICAgICAgICAgc3R5bGU6IHByb3BzLmlucHV0U3R5bGVcbiAgICAgICAgfSlcbiAgICAgIF1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRTZWxlY3Rpb24gKCkge1xuICAgICAgaWYgKHNsb3RzLmZpbGUgIT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm4gaW5uZXJWYWx1ZS52YWx1ZS5sZW5ndGggPT09IDBcbiAgICAgICAgICA/IGdldEZpbGxlcigpXG4gICAgICAgICAgOiBpbm5lclZhbHVlLnZhbHVlLm1hcChcbiAgICAgICAgICAgIChmaWxlLCBpbmRleCkgPT4gc2xvdHMuZmlsZSh7IGluZGV4LCBmaWxlLCByZWY6IHRoaXMgfSlcbiAgICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIGlmIChzbG90cy5zZWxlY3RlZCAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHJldHVybiBpbm5lclZhbHVlLnZhbHVlLmxlbmd0aCA9PT0gMFxuICAgICAgICAgID8gZ2V0RmlsbGVyKClcbiAgICAgICAgICA6IHNsb3RzLnNlbGVjdGVkKHsgZmlsZXM6IGlubmVyVmFsdWUudmFsdWUsIHJlZjogdGhpcyB9KVxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMudXNlQ2hpcHMgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIGlubmVyVmFsdWUudmFsdWUubGVuZ3RoID09PSAwXG4gICAgICAgICAgPyBnZXRGaWxsZXIoKVxuICAgICAgICAgIDogaW5uZXJWYWx1ZS52YWx1ZS5tYXAoKGZpbGUsIGkpID0+IGgoUUNoaXAsIHtcbiAgICAgICAgICAgIGtleTogJ2ZpbGUtJyArIGksXG4gICAgICAgICAgICByZW1vdmFibGU6IHN0YXRlLmVkaXRhYmxlLnZhbHVlLFxuICAgICAgICAgICAgZGVuc2U6IHRydWUsXG4gICAgICAgICAgICB0ZXh0Q29sb3I6IHByb3BzLmNvbG9yLFxuICAgICAgICAgICAgdGFiaW5kZXg6IHByb3BzLnRhYmluZGV4LFxuICAgICAgICAgICAgb25SZW1vdmU6ICgpID0+IHsgcmVtb3ZlQXRJbmRleChpKSB9XG4gICAgICAgICAgfSwgKCkgPT4gaCgnc3BhbicsIHtcbiAgICAgICAgICAgIGNsYXNzOiAnZWxsaXBzaXMnLFxuICAgICAgICAgICAgdGV4dENvbnRlbnQ6IGZpbGUubmFtZVxuICAgICAgICAgIH0pKSlcbiAgICAgIH1cblxuICAgICAgY29uc3QgdGV4dENvbnRlbnQgPSBwcm9wcy5kaXNwbGF5VmFsdWUgIT09IHZvaWQgMFxuICAgICAgICA/IHByb3BzLmRpc3BsYXlWYWx1ZVxuICAgICAgICA6IHNlbGVjdGVkU3RyaW5nLnZhbHVlXG5cbiAgICAgIHJldHVybiB0ZXh0Q29udGVudC5sZW5ndGggIT09IDBcbiAgICAgICAgPyBbXG4gICAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICAgIGNsYXNzOiBwcm9wcy5pbnB1dENsYXNzLFxuICAgICAgICAgICAgICBzdHlsZTogcHJvcHMuaW5wdXRTdHlsZSxcbiAgICAgICAgICAgICAgdGV4dENvbnRlbnRcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXVxuICAgICAgICA6IGdldEZpbGxlcigpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0SW5wdXQgKCkge1xuICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgcmVmOiBpbnB1dFJlZixcbiAgICAgICAgLi4uaW5wdXRBdHRycy52YWx1ZSxcbiAgICAgICAgLi4uZm9ybURvbVByb3BzLnZhbHVlLFxuICAgICAgICBjbGFzczogJ3EtZmllbGRfX2lucHV0IGZpdCBhYnNvbHV0ZS1mdWxsIGN1cnNvci1wb2ludGVyJyxcbiAgICAgICAgb25DaGFuZ2U6IGFkZEZpbGVzVG9RdWV1ZVxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMubXVsdGlwbGUgPT09IHRydWUpIHtcbiAgICAgICAgZGF0YS5tdWx0aXBsZSA9IHRydWVcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGgoJ2lucHV0JywgZGF0YSlcbiAgICB9XG5cbiAgICBPYmplY3QuYXNzaWduKHN0YXRlLCB7XG4gICAgICBmaWVsZENsYXNzLFxuICAgICAgZW1pdFZhbHVlLFxuICAgICAgaGFzVmFsdWUsXG4gICAgICBpbnB1dFJlZixcbiAgICAgIGlubmVyVmFsdWUsXG5cbiAgICAgIGZsb2F0aW5nTGFiZWw6IGNvbXB1dGVkKCgpID0+XG4gICAgICAgIGhhc1ZhbHVlLnZhbHVlID09PSB0cnVlXG4gICAgICAgIHx8IGZpZWxkVmFsdWVJc0ZpbGxlZChwcm9wcy5kaXNwbGF5VmFsdWUpXG4gICAgICApLFxuXG4gICAgICBjb21wdXRlZENvdW50ZXI6IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgICAgaWYgKHByb3BzLmNvdW50ZXJMYWJlbCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgcmV0dXJuIHByb3BzLmNvdW50ZXJMYWJlbChjb3VudGVyUHJvcHMudmFsdWUpXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtYXggPSBwcm9wcy5tYXhGaWxlc1xuICAgICAgICByZXR1cm4gYCR7IGlubmVyVmFsdWUudmFsdWUubGVuZ3RoIH0keyBtYXggIT09IHZvaWQgMCA/ICcgLyAnICsgbWF4IDogJycgfSAoJHsgdG90YWxTaXplLnZhbHVlIH0pYFxuICAgICAgfSksXG5cbiAgICAgIGdldENvbnRyb2xDaGlsZDogKCkgPT4gZ2V0RG5kTm9kZSgnZmlsZScpLFxuICAgICAgZ2V0Q29udHJvbDogKCkgPT4ge1xuICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgIHJlZjogc3RhdGUudGFyZ2V0UmVmLFxuICAgICAgICAgIGNsYXNzOiAncS1maWVsZF9fbmF0aXZlIHJvdyBpdGVtcy1jZW50ZXIgY3Vyc29yLXBvaW50ZXInLFxuICAgICAgICAgIHRhYmluZGV4OiBwcm9wcy50YWJpbmRleFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0YXRlLmVkaXRhYmxlLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgT2JqZWN0LmFzc2lnbihkYXRhLCB7IG9uRHJhZ292ZXIsIG9uRHJhZ2xlYXZlLCBvbktleWRvd24sIG9uS2V5dXAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBoKCdkaXYnLCBkYXRhLCBbIGdldElucHV0KCkgXS5jb25jYXQoZ2V0U2VsZWN0aW9uKCkpKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgICBPYmplY3QuYXNzaWduKHByb3h5LCB7XG4gICAgICByZW1vdmVBdEluZGV4LFxuICAgICAgcmVtb3ZlRmlsZSxcbiAgICAgIGdldE5hdGl2ZUVsZW1lbnQ6ICgpID0+IGlucHV0UmVmLnZhbHVlIC8vIGRlcHJlY2F0ZWRcbiAgICB9KVxuXG4gICAgaW5qZWN0UHJvcChwcm94eSwgJ25hdGl2ZUVsJywgKCkgPT4gaW5wdXRSZWYudmFsdWUpXG5cbiAgICByZXR1cm4gdXNlRmllbGQoc3RhdGUpXG4gIH1cbn0pXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUtBLFNBQVMsWUFBYSxPQUFPLGVBQWUsc0JBQXNCLFVBQVU7QUFDMUUsUUFBTSxnQkFBZ0IsQ0FBQTtBQUV0QixRQUFNLFFBQVEsVUFBUTtBQUNwQixRQUFJLFNBQVMsSUFBSSxNQUFNLE1BQU07QUFDM0Isb0JBQWMsS0FBSyxJQUFJO0FBQUEsSUFDekIsT0FDSztBQUNILG9CQUFjLEtBQUssRUFBRSxzQkFBc0IsS0FBSSxDQUFFO0FBQUEsSUFDbkQ7QUFBQSxFQUNGLENBQUM7QUFFRCxTQUFPO0FBQ1Q7QUFFQSxTQUFTLG1CQUFvQixHQUFHO0FBQzlCLE1BQUksdUJBQUcsY0FBYztBQUNuQixNQUFFLGFBQWEsYUFBYTtBQUFBLEVBQzlCO0FBRUEsaUJBQWUsQ0FBQztBQUNsQjtBQUVPLE1BQU0sZUFBZTtBQUFBLEVBQzFCLFVBQVU7QUFBQSxFQUNWLFFBQVE7QUFBQSxFQUNSLFNBQVM7QUFBQSxFQUNULGFBQWEsQ0FBRSxRQUFRLE1BQU07QUFBQSxFQUM3QixjQUFjLENBQUUsUUFBUSxNQUFNO0FBQUEsRUFDOUIsVUFBVSxDQUFFLFFBQVEsTUFBTTtBQUFBLEVBQzFCLFFBQVE7QUFDVjtBQUVPLE1BQU0sZUFBZSxDQUFFLFVBQVU7QUFFekIsU0FBQSxRQUFVO0FBQUEsRUFDdkI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixHQUFHO0FBQ0Qs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
