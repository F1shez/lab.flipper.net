(function() {
  "use strict";
  let args = [];
  onmessage = function(event) {
    switch (event.data.operation) {
      case "start":
        args = event.data.data;
        main();
        break;
    }
  };
  function main() {
    var Module = typeof Module != "undefined" ? Module : {};
    var moduleOverrides = Object.assign({}, Module);
    var arguments_ = args;
    var thisProgram = "./this.program";
    var quit_ = (status, toThrow) => {
      throw toThrow;
    };
    var ENVIRONMENT_IS_WEB = typeof window == "object";
    var ENVIRONMENT_IS_WORKER = typeof importScripts == "function";
    var ENVIRONMENT_IS_NODE = typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string";
    var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;
    if (Module["ENVIRONMENT"]) {
      throw new Error(
        "Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)"
      );
    }
    var scriptDirectory = "";
    var read_, readAsync, readBinary;
    function logExceptionOnExit(e) {
      if (e instanceof ExitStatus) return;
      let toLog = e;
      if (e && typeof e == "object" && e.stack) {
        toLog = [e, e.stack];
      }
      err("exiting due to exception: " + toLog);
    }
    if (ENVIRONMENT_IS_NODE) {
      if (typeof process == "undefined" || !process.release || process.release.name !== "node")
        throw new Error(
          "not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)"
        );
      if (ENVIRONMENT_IS_WORKER) ;
      else {
        scriptDirectory = __dirname + "/";
      }
      var fs, nodePath;
      read_ = (filename, binary) => {
        filename = nodePath["normalize"](filename);
        return fs.readFileSync(filename, binary ? void 0 : "utf8");
      };
      readBinary = (filename) => {
        var ret = read_(filename, true);
        if (!ret.buffer) {
          ret = new Uint8Array(ret);
        }
        assert(ret.buffer);
        return ret;
      };
      readAsync = (filename, onload, onerror) => {
        filename = nodePath["normalize"](filename);
        fs.readFile(filename, function(err2, data) {
          if (err2) onerror(err2);
          else onload(data.buffer);
        });
      };
      if (process["argv"].length > 1) {
        thisProgram = process["argv"][1].replace(/\\/g, "/");
      }
      arguments_ = process["argv"].slice(2);
      if (typeof module != "undefined") {
        module["exports"] = Module;
      }
      process["on"]("uncaughtException", function(ex) {
        if (!(ex instanceof ExitStatus)) {
          throw ex;
        }
      });
      process["on"]("unhandledRejection", function(reason) {
        throw reason;
      });
      quit_ = (status, toThrow) => {
        if (keepRuntimeAlive()) {
          process["exitCode"] = status;
          throw toThrow;
        }
        logExceptionOnExit(toThrow);
        process["exit"](status);
      };
      Module["inspect"] = function() {
        return "[Emscripten Module object]";
      };
    } else if (ENVIRONMENT_IS_SHELL) {
      if (typeof process == "object" && typeof require === "function" || typeof window == "object" || typeof importScripts == "function")
        throw new Error(
          "not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)"
        );
      if (typeof read != "undefined") {
        read_ = function shell_read(f) {
          return read(f);
        };
      }
      readBinary = function readBinary2(f) {
        let data;
        if (typeof readbuffer == "function") {
          return new Uint8Array(readbuffer(f));
        }
        data = read(f, "binary");
        assert(typeof data == "object");
        return data;
      };
      readAsync = function readAsync2(f, onload, onerror) {
        setTimeout(() => onload(readBinary(f)), 0);
      };
      if (typeof scriptArgs != "undefined") {
        arguments_ = scriptArgs;
      } else if (typeof arguments != "undefined") {
        arguments_ = arguments;
      }
      if (typeof quit == "function") {
        quit_ = (status, toThrow) => {
          logExceptionOnExit(toThrow);
          quit(status);
        };
      }
      if (typeof print != "undefined") {
        if (typeof console == "undefined") console = /** @type{!Console} */
        {};
        console.log = /** @type{!function(this:Console, ...*): undefined} */
        print;
        console.warn = console.error = /** @type{!function(this:Console, ...*): undefined} */
        typeof printErr != "undefined" ? printErr : print;
      }
    } else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
      if (ENVIRONMENT_IS_WORKER) {
        scriptDirectory = self.location.href;
      } else if (typeof document != "undefined" && document.currentScript) {
        scriptDirectory = document.currentScript.src;
      }
      if (scriptDirectory.indexOf("blob:") !== 0) {
        scriptDirectory = scriptDirectory.substr(
          0,
          scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1
        );
      } else {
        scriptDirectory = "";
      }
      if (!(typeof window == "object" || typeof importScripts == "function"))
        throw new Error(
          "not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)"
        );
      {
        read_ = (url) => {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", url, false);
          xhr.send(null);
          return xhr.responseText;
        };
        if (ENVIRONMENT_IS_WORKER) {
          readBinary = (url) => {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, false);
            xhr.responseType = "arraybuffer";
            xhr.send(null);
            return new Uint8Array(
              /** @type{!ArrayBuffer} */
              xhr.response
            );
          };
        }
        readAsync = (url, onload, onerror) => {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", url, true);
          xhr.responseType = "arraybuffer";
          xhr.onload = () => {
            if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
              onload(xhr.response);
              return;
            }
            onerror();
          };
          xhr.onerror = onerror;
          xhr.send(null);
        };
      }
    } else {
      throw new Error("environment detection error");
    }
    var out = (text) => {
      self.postMessage({
        operation: "output",
        data: text
      });
    };
    var err = (text) => {
      console.warn(text);
      self.postMessage({
        operation: "error",
        data: text
      });
    };
    Object.assign(Module, moduleOverrides);
    moduleOverrides = null;
    checkIncomingModuleAPI();
    if (Module["arguments"]) arguments_ = Module["arguments"];
    legacyModuleProp("arguments", "arguments_");
    if (Module["thisProgram"]) thisProgram = Module["thisProgram"];
    legacyModuleProp("thisProgram", "thisProgram");
    if (Module["quit"]) quit_ = Module["quit"];
    legacyModuleProp("quit", "quit_");
    assert(
      typeof Module["memoryInitializerPrefixURL"] == "undefined",
      "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead"
    );
    assert(
      typeof Module["pthreadMainPrefixURL"] == "undefined",
      "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead"
    );
    assert(
      typeof Module["cdInitializerPrefixURL"] == "undefined",
      "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead"
    );
    assert(
      typeof Module["filePackagePrefixURL"] == "undefined",
      "Module.filePackagePrefixURL option was removed, use Module.locateFile instead"
    );
    assert(
      typeof Module["read"] == "undefined",
      "Module.read option was removed (modify read_ in JS)"
    );
    assert(
      typeof Module["readAsync"] == "undefined",
      "Module.readAsync option was removed (modify readAsync in JS)"
    );
    assert(
      typeof Module["readBinary"] == "undefined",
      "Module.readBinary option was removed (modify readBinary in JS)"
    );
    assert(
      typeof Module["setWindowTitle"] == "undefined",
      "Module.setWindowTitle option was removed (modify setWindowTitle in JS)"
    );
    assert(
      typeof Module["TOTAL_MEMORY"] == "undefined",
      "Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY"
    );
    legacyModuleProp("read", "read_");
    legacyModuleProp("readAsync", "readAsync");
    legacyModuleProp("readBinary", "readBinary");
    legacyModuleProp("setWindowTitle", "setWindowTitle");
    assert(
      !ENVIRONMENT_IS_SHELL,
      "shell environment detected but not enabled at build time.  Add 'shell' to `-sENVIRONMENT` to enable."
    );
    function legacyModuleProp(prop, newName) {
      if (!Object.getOwnPropertyDescriptor(Module, prop)) {
        Object.defineProperty(Module, prop, {
          configurable: true,
          get: function() {
            abort(
              "Module." + prop + " has been replaced with plain " + newName + " (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)"
            );
          }
        });
      }
    }
    function ignoredModuleProp(prop) {
      if (Object.getOwnPropertyDescriptor(Module, prop)) {
        abort(
          "`Module." + prop + "` was supplied but `" + prop + "` not included in INCOMING_MODULE_JS_API"
        );
      }
    }
    function isExportedByForceFilesystem(name) {
      return name === "FS_createPath" || name === "FS_createDataFile" || name === "FS_createPreloadedFile" || name === "FS_unlink" || name === "addRunDependency" || // The old FS has some functionality that WasmFS lacks.
      name === "FS_createLazyFile" || name === "FS_createDevice" || name === "removeRunDependency";
    }
    function missingLibrarySymbol(sym) {
      if (typeof globalThis !== "undefined" && !Object.getOwnPropertyDescriptor(globalThis, sym)) {
        Object.defineProperty(globalThis, sym, {
          configurable: true,
          get: function() {
            var msg = "`" + sym + "` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line";
            var librarySymbol = sym;
            if (!librarySymbol.startsWith("_")) {
              librarySymbol = "$" + sym;
            }
            msg += " (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE=" + librarySymbol + ")";
            if (isExportedByForceFilesystem(sym)) {
              msg += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you";
            }
            warnOnce(msg);
            return void 0;
          }
        });
      }
    }
    function unexportedRuntimeSymbol(sym) {
      if (!Object.getOwnPropertyDescriptor(Module, sym)) {
        Object.defineProperty(Module, sym, {
          configurable: true,
          get: function() {
            var msg = "'" + sym + "' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)";
            if (isExportedByForceFilesystem(sym)) {
              msg += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you";
            }
            abort(msg);
          }
        });
      }
    }
    var wasmBinary;
    if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];
    legacyModuleProp("wasmBinary", "wasmBinary");
    var noExitRuntime = Module["noExitRuntime"] || false;
    legacyModuleProp("noExitRuntime", "noExitRuntime");
    if (typeof WebAssembly != "object") {
      abort("no native wasm support detected");
    }
    var wasmMemory;
    var ABORT = false;
    var EXITSTATUS;
    function assert(condition, text) {
      if (!condition) {
        abort("Assertion failed" + (text ? ": " + text : ""));
      }
    }
    var UTF8Decoder = typeof TextDecoder != "undefined" ? new TextDecoder("utf8") : void 0;
    function UTF8ArrayToString(heapOrArray, idx, maxBytesToRead) {
      var endIdx = idx + maxBytesToRead;
      var endPtr = idx;
      while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;
      if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
        return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
      }
      var str = "";
      while (idx < endPtr) {
        var u0 = heapOrArray[idx++];
        if (!(u0 & 128)) {
          str += String.fromCharCode(u0);
          continue;
        }
        var u1 = heapOrArray[idx++] & 63;
        if ((u0 & 224) == 192) {
          str += String.fromCharCode((u0 & 31) << 6 | u1);
          continue;
        }
        var u2 = heapOrArray[idx++] & 63;
        if ((u0 & 240) == 224) {
          u0 = (u0 & 15) << 12 | u1 << 6 | u2;
        } else {
          if ((u0 & 248) != 240)
            warnOnce(
              "Invalid UTF-8 leading byte 0x" + u0.toString(16) + " encountered when deserializing a UTF-8 string in wasm memory to a JS string!"
            );
          u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heapOrArray[idx++] & 63;
        }
        if (u0 < 65536) {
          str += String.fromCharCode(u0);
        } else {
          var ch = u0 - 65536;
          str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
        }
      }
      return str;
    }
    function UTF8ToString(ptr, maxBytesToRead) {
      return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
    }
    function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
      if (!(maxBytesToWrite > 0))
        return 0;
      var startIdx = outIdx;
      var endIdx = outIdx + maxBytesToWrite - 1;
      for (var i = 0; i < str.length; ++i) {
        var u = str.charCodeAt(i);
        if (u >= 55296 && u <= 57343) {
          var u1 = str.charCodeAt(++i);
          u = 65536 + ((u & 1023) << 10) | u1 & 1023;
        }
        if (u <= 127) {
          if (outIdx >= endIdx) break;
          heap[outIdx++] = u;
        } else if (u <= 2047) {
          if (outIdx + 1 >= endIdx) break;
          heap[outIdx++] = 192 | u >> 6;
          heap[outIdx++] = 128 | u & 63;
        } else if (u <= 65535) {
          if (outIdx + 2 >= endIdx) break;
          heap[outIdx++] = 224 | u >> 12;
          heap[outIdx++] = 128 | u >> 6 & 63;
          heap[outIdx++] = 128 | u & 63;
        } else {
          if (outIdx + 3 >= endIdx) break;
          if (u > 1114111)
            warnOnce(
              "Invalid Unicode code point 0x" + u.toString(16) + " encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF)."
            );
          heap[outIdx++] = 240 | u >> 18;
          heap[outIdx++] = 128 | u >> 12 & 63;
          heap[outIdx++] = 128 | u >> 6 & 63;
          heap[outIdx++] = 128 | u & 63;
        }
      }
      heap[outIdx] = 0;
      return outIdx - startIdx;
    }
    function stringToUTF8(str, outPtr, maxBytesToWrite) {
      assert(
        typeof maxBytesToWrite == "number",
        "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!"
      );
      return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
    }
    function lengthBytesUTF8(str) {
      var len = 0;
      for (var i = 0; i < str.length; ++i) {
        var c = str.charCodeAt(i);
        if (c <= 127) {
          len++;
        } else if (c <= 2047) {
          len += 2;
        } else if (c >= 55296 && c <= 57343) {
          len += 4;
          ++i;
        } else {
          len += 3;
        }
      }
      return len;
    }
    var buffer, HEAP8, HEAPU8, HEAP32, HEAPU32;
    function updateGlobalBufferAndViews(buf) {
      buffer = buf;
      Module["HEAP8"] = HEAP8 = new Int8Array(buf);
      Module["HEAP16"] = new Int16Array(buf);
      Module["HEAP32"] = HEAP32 = new Int32Array(buf);
      Module["HEAPU8"] = HEAPU8 = new Uint8Array(buf);
      Module["HEAPU16"] = new Uint16Array(buf);
      Module["HEAPU32"] = HEAPU32 = new Uint32Array(buf);
      Module["HEAPF32"] = new Float32Array(buf);
      Module["HEAPF64"] = new Float64Array(buf);
    }
    var TOTAL_STACK = 5242880;
    if (Module["TOTAL_STACK"])
      assert(
        TOTAL_STACK === Module["TOTAL_STACK"],
        "the stack size can no longer be determined at runtime"
      );
    var INITIAL_MEMORY = Module["INITIAL_MEMORY"] || 16777216;
    legacyModuleProp("INITIAL_MEMORY", "INITIAL_MEMORY");
    assert(
      INITIAL_MEMORY >= TOTAL_STACK,
      "INITIAL_MEMORY should be larger than TOTAL_STACK, was " + INITIAL_MEMORY + "! (TOTAL_STACK=" + TOTAL_STACK + ")"
    );
    assert(
      typeof Int32Array != "undefined" && typeof Float64Array !== "undefined" && Int32Array.prototype.subarray != void 0 && Int32Array.prototype.set != void 0,
      "JS engine does not provide full typed array support"
    );
    assert(
      !Module["wasmMemory"],
      "Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally"
    );
    assert(
      INITIAL_MEMORY == 16777216,
      "Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically"
    );
    var wasmTable;
    function writeStackCookie() {
      var max = _emscripten_stack_get_end();
      assert((max & 3) == 0);
      HEAPU32[max >> 2] = 34821223;
      HEAPU32[max + 4 >> 2] = 2310721022;
      HEAPU32[0] = 1668509029;
    }
    function checkStackCookie() {
      if (ABORT) return;
      var max = _emscripten_stack_get_end();
      var cookie1 = HEAPU32[max >> 2];
      var cookie2 = HEAPU32[max + 4 >> 2];
      if (cookie1 != 34821223 || cookie2 != 2310721022) {
        abort(
          "Stack overflow! Stack cookie has been overwritten at 0x" + max.toString(16) + ", expected hex dwords 0x89BACDFE and 0x2135467, but received 0x" + cookie2.toString(16) + " 0x" + cookie1.toString(16)
        );
      }
      if (HEAPU32[0] !== 1668509029)
        abort(
          "Runtime error: The application has corrupted its heap memory area (address zero)!"
        );
    }
    (function() {
      var h16 = new Int16Array(1);
      var h8 = new Int8Array(h16.buffer);
      h16[0] = 25459;
      if (h8[0] !== 115 || h8[1] !== 99)
        throw "Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)";
    })();
    var __ATPRERUN__ = [];
    var __ATINIT__ = [];
    var __ATMAIN__ = [];
    var __ATEXIT__ = [];
    var __ATPOSTRUN__ = [];
    var runtimeInitialized = false;
    var runtimeExited = false;
    var runtimeKeepaliveCounter = 0;
    function keepRuntimeAlive() {
      return noExitRuntime || runtimeKeepaliveCounter > 0;
    }
    function preRun() {
      if (Module["preRun"]) {
        if (typeof Module["preRun"] == "function")
          Module["preRun"] = [Module["preRun"]];
        while (Module["preRun"].length) {
          addOnPreRun(Module["preRun"].shift());
        }
      }
      callRuntimeCallbacks(__ATPRERUN__);
    }
    function initRuntime() {
      assert(!runtimeInitialized);
      runtimeInitialized = true;
      checkStackCookie();
      if (!Module["noFSInit"] && !FS.init.initialized) FS.init();
      FS.ignorePermissions = false;
      callRuntimeCallbacks(__ATINIT__);
    }
    function preMain() {
      checkStackCookie();
      callRuntimeCallbacks(__ATMAIN__);
    }
    function exitRuntime() {
      checkStackCookie();
      ___funcs_on_exit();
      callRuntimeCallbacks(__ATEXIT__);
      FS.quit();
      runtimeExited = true;
    }
    function postRun() {
      checkStackCookie();
      if (Module["postRun"]) {
        if (typeof Module["postRun"] == "function")
          Module["postRun"] = [Module["postRun"]];
        while (Module["postRun"].length) {
          addOnPostRun(Module["postRun"].shift());
        }
      }
      callRuntimeCallbacks(__ATPOSTRUN__);
    }
    function addOnPreRun(cb) {
      __ATPRERUN__.unshift(cb);
    }
    function addOnInit(cb) {
      __ATINIT__.unshift(cb);
    }
    function addOnPostRun(cb) {
      __ATPOSTRUN__.unshift(cb);
    }
    assert(
      Math.imul,
      "This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill"
    );
    assert(
      Math.fround,
      "This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill"
    );
    assert(
      Math.clz32,
      "This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill"
    );
    assert(
      Math.trunc,
      "This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill"
    );
    var runDependencies = 0;
    var runDependencyWatcher = null;
    var dependenciesFulfilled = null;
    var runDependencyTracking = {};
    function getUniqueRunDependency(id) {
      var orig = id;
      while (1) {
        if (!runDependencyTracking[id]) return id;
        id = orig + Math.random();
      }
    }
    function addRunDependency(id) {
      runDependencies++;
      if (Module["monitorRunDependencies"]) {
        Module["monitorRunDependencies"](runDependencies);
      }
      if (id) {
        assert(!runDependencyTracking[id]);
        runDependencyTracking[id] = 1;
        if (runDependencyWatcher === null && typeof setInterval != "undefined") {
          runDependencyWatcher = setInterval(function() {
            if (ABORT) {
              clearInterval(runDependencyWatcher);
              runDependencyWatcher = null;
              return;
            }
            var shown = false;
            for (var dep in runDependencyTracking) {
              if (!shown) {
                shown = true;
                err("still waiting on run dependencies:");
              }
              err("dependency: " + dep);
            }
            if (shown) {
              err("(end of list)");
            }
          }, 1e4);
        }
      } else {
        err("warning: run dependency added without ID");
      }
    }
    function removeRunDependency(id) {
      runDependencies--;
      if (Module["monitorRunDependencies"]) {
        Module["monitorRunDependencies"](runDependencies);
      }
      if (id) {
        assert(runDependencyTracking[id]);
        delete runDependencyTracking[id];
      } else {
        err("warning: run dependency removed without ID");
      }
      if (runDependencies == 0) {
        if (runDependencyWatcher !== null) {
          clearInterval(runDependencyWatcher);
          runDependencyWatcher = null;
        }
        if (dependenciesFulfilled) {
          var callback = dependenciesFulfilled;
          dependenciesFulfilled = null;
          callback();
        }
      }
    }
    function abort(what) {
      {
        if (Module["onAbort"]) {
          Module["onAbort"](what);
        }
      }
      what = "Aborted(" + what + ")";
      err(what);
      ABORT = true;
      EXITSTATUS = 1;
      var e = new WebAssembly.RuntimeError(what);
      throw e;
    }
    var dataURIPrefix = "data:application/octet-stream;base64,";
    function isDataURI(filename) {
      return filename.startsWith(dataURIPrefix);
    }
    function isFileURI(filename) {
      return filename.startsWith("file://");
    }
    function createExportWrapper(name, fixedasm) {
      return function() {
        var displayName = name;
        var asm = fixedasm;
        {
          asm = Module["asm"];
        }
        assert(
          runtimeInitialized,
          "native function `" + displayName + "` called before runtime initialization"
        );
        assert(
          !runtimeExited,
          "native function `" + displayName + "` called after runtime exit (use NO_EXIT_RUNTIME to keep it alive after main() exits)"
        );
        if (!asm[name]) {
          assert(
            asm[name],
            "exported native function `" + displayName + "` not found"
          );
        }
        return asm[name].apply(null, arguments);
      };
    }
    var wasmBinaryFile;
    wasmBinaryFile = "https://cdn.flipper.net/mfkey.wasm";
    function getBinary(file) {
      try {
        if (file == wasmBinaryFile && wasmBinary) {
          return new Uint8Array(wasmBinary);
        }
        if (readBinary) {
          return readBinary(file);
        }
        throw "both async and sync fetching of the wasm failed";
      } catch (err2) {
        abort(err2);
      }
    }
    function getBinaryPromise() {
      if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
        if (typeof fetch == "function" && !isFileURI(wasmBinaryFile)) {
          return fetch(wasmBinaryFile, { credentials: "same-origin" }).then(function(response) {
            if (!response["ok"]) {
              throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
            }
            return response["arrayBuffer"]();
          }).catch(function() {
            return getBinary(wasmBinaryFile);
          });
        } else {
          if (readAsync) {
            return new Promise(function(resolve, reject) {
              readAsync(
                wasmBinaryFile,
                function(response) {
                  resolve(new Uint8Array(
                    /** @type{!ArrayBuffer} */
                    response
                  ));
                },
                reject
              );
            });
          }
        }
      }
      return Promise.resolve().then(function() {
        return getBinary(wasmBinaryFile);
      });
    }
    function createWasm() {
      var info = {
        env: asmLibraryArg,
        wasi_snapshot_preview1: asmLibraryArg
      };
      function receiveInstance(instance, module2) {
        var exports2 = instance.exports;
        Module["asm"] = exports2;
        wasmMemory = Module["asm"]["memory"];
        assert(wasmMemory, "memory not found in wasm exports");
        updateGlobalBufferAndViews(wasmMemory.buffer);
        wasmTable = Module["asm"]["__indirect_function_table"];
        assert(wasmTable, "table not found in wasm exports");
        addOnInit(Module["asm"]["__wasm_call_ctors"]);
        removeRunDependency("wasm-instantiate");
      }
      addRunDependency("wasm-instantiate");
      var trueModule = Module;
      function receiveInstantiationResult(result) {
        assert(
          Module === trueModule,
          "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?"
        );
        trueModule = null;
        receiveInstance(result["instance"]);
      }
      function instantiateArrayBuffer(receiver) {
        return getBinaryPromise().then(function(binary) {
          return WebAssembly.instantiate(binary, info);
        }).then(function(instance) {
          return instance;
        }).then(receiver, function(reason) {
          err("failed to asynchronously prepare wasm: " + reason);
          if (isFileURI(wasmBinaryFile)) {
            err(
              "warning: Loading from a file URI (" + wasmBinaryFile + ") is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing"
            );
          }
          abort(reason);
        });
      }
      function instantiateAsync() {
        if (!wasmBinary && typeof WebAssembly.instantiateStreaming == "function" && !isDataURI(wasmBinaryFile) && // Don't use streaming for file:// delivered objects in a webview, fetch them synchronously.
        !isFileURI(wasmBinaryFile) && // Avoid instantiateStreaming() on Node.js environment for now, as while
        // Node.js v18.1.0 implements it, it does not have a full fetch()
        // implementation yet.
        //
        // Reference:
        //   https://github.com/emscripten-core/emscripten/pull/16917
        !ENVIRONMENT_IS_NODE && typeof fetch == "function") {
          return fetch(wasmBinaryFile, { credentials: "same-origin" }).then(async function(response) {
            if (!response.ok) {
              err(`failed to load wasm binary file ${response.status}`);
              abort(response.status);
            }
            const buffer2 = await response.arrayBuffer();
            var result = WebAssembly.instantiate(buffer2, info);
            return result.then(receiveInstantiationResult, function(reason) {
              err("wasm streaming compile failed: " + reason);
              err("falling back to ArrayBuffer instantiation");
              return instantiateArrayBuffer(receiveInstantiationResult);
            });
          }).catch((error) => {
            err(`failed to load wasm binary file ${error}`);
            abort(error);
          });
        } else {
          return instantiateArrayBuffer(receiveInstantiationResult);
        }
      }
      if (Module["instantiateWasm"]) {
        try {
          var exports = Module["instantiateWasm"](info, receiveInstance);
          return exports;
        } catch (e) {
          err("Module.instantiateWasm callback failed with error: " + e);
          return false;
        }
      }
      instantiateAsync();
      return {};
    }
    var tempDouble;
    var tempI64;
    function ExitStatus(status) {
      this.name = "ExitStatus";
      this.message = "Program terminated with exit(" + status + ")";
      this.status = status;
    }
    function callRuntimeCallbacks(callbacks) {
      while (callbacks.length > 0) {
        callbacks.shift()(Module);
      }
    }
    function demangle(func) {
      warnOnce(
        "warning: build with -sDEMANGLE_SUPPORT to link in libcxxabi demangling"
      );
      return func;
    }
    function demangleAll(text) {
      var regex = /\b_Z[\w\d_]+/g;
      return text.replace(regex, function(x) {
        var y = demangle(x);
        return x === y ? x : y + " [" + x + "]";
      });
    }
    function handleException(e) {
      if (e instanceof ExitStatus || e == "unwind") {
        return EXITSTATUS;
      }
      quit_(1, e);
    }
    function warnOnce(text) {
      if (!warnOnce.shown) warnOnce.shown = {};
      if (!warnOnce.shown[text]) {
        warnOnce.shown[text] = 1;
        if (ENVIRONMENT_IS_NODE) text = "warning: " + text;
        err(text);
      }
    }
    function writeArrayToMemory(array, buffer2) {
      assert(
        array.length >= 0,
        "writeArrayToMemory array must have a length (should be an array or typed array)"
      );
      HEAP8.set(array, buffer2);
    }
    function _emscripten_memcpy_big(dest, src, num) {
      HEAPU8.copyWithin(dest, src, src + num);
    }
    function getHeapMax() {
      return 2147483648;
    }
    function emscripten_realloc_buffer(size) {
      try {
        wasmMemory.grow(size - buffer.byteLength + 65535 >>> 16);
        updateGlobalBufferAndViews(wasmMemory.buffer);
        return 1;
      } catch (e) {
        err(
          "emscripten_realloc_buffer: Attempted to grow heap from " + buffer.byteLength + " bytes to " + size + " bytes, but got error: " + e
        );
      }
    }
    function _emscripten_resize_heap(requestedSize) {
      var oldSize = HEAPU8.length;
      requestedSize = requestedSize >>> 0;
      assert(requestedSize > oldSize);
      var maxHeapSize = getHeapMax();
      if (requestedSize > maxHeapSize) {
        err(
          "Cannot enlarge memory, asked to go up to " + requestedSize + " bytes, but the limit is " + maxHeapSize + " bytes!"
        );
        return false;
      }
      let alignUp = (x, multiple) => x + (multiple - x % multiple) % multiple;
      for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
        var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown);
        overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
        var newSize = Math.min(
          maxHeapSize,
          alignUp(Math.max(requestedSize, overGrownHeapSize), 65536)
        );
        var replacement = emscripten_realloc_buffer(newSize);
        if (replacement) {
          return true;
        }
      }
      err(
        "Failed to grow the heap from " + oldSize + " bytes to " + newSize + " bytes, not enough memory!"
      );
      return false;
    }
    function doWritev(stream, iov, iovcnt, offset) {
      var ret = 0;
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAPU32[iov >> 2];
        var len = HEAPU32[iov + 4 >> 2];
        iov += 8;
        var curr = FS.write(stream, HEAP8, ptr, len, offset);
        if (curr < 0) return -1;
        ret += curr;
      }
      return ret;
    }
    var PATH = {
      isAbs: (path) => path.charAt(0) === "/",
      splitPath: (filename) => {
        var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
        return splitPathRe.exec(filename).slice(1);
      },
      normalizeArray: (parts, allowAboveRoot) => {
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i];
          if (last === ".") {
            parts.splice(i, 1);
          } else if (last === "..") {
            parts.splice(i, 1);
            up++;
          } else if (up) {
            parts.splice(i, 1);
            up--;
          }
        }
        if (allowAboveRoot) {
          for (; up; up--) {
            parts.unshift("..");
          }
        }
        return parts;
      },
      normalize: (path) => {
        var isAbsolute = PATH.isAbs(path), trailingSlash = path.substr(-1) === "/";
        path = PATH.normalizeArray(
          path.split("/").filter((p) => !!p),
          !isAbsolute
        ).join("/");
        if (!path && !isAbsolute) {
          path = ".";
        }
        if (path && trailingSlash) {
          path += "/";
        }
        return (isAbsolute ? "/" : "") + path;
      },
      dirname: (path) => {
        var result = PATH.splitPath(path), root = result[0], dir = result[1];
        if (!root && !dir) {
          return ".";
        }
        if (dir) {
          dir = dir.substr(0, dir.length - 1);
        }
        return root + dir;
      },
      basename: (path) => {
        if (path === "/") return "/";
        path = PATH.normalize(path);
        path = path.replace(/\/$/, "");
        var lastSlash = path.lastIndexOf("/");
        if (lastSlash === -1) return path;
        return path.substr(lastSlash + 1);
      },
      join: function() {
        var paths = Array.prototype.slice.call(arguments);
        return PATH.normalize(paths.join("/"));
      },
      join2: (l, r) => {
        return PATH.normalize(l + "/" + r);
      }
    };
    function getRandomDevice() {
      if (typeof crypto == "object" && typeof crypto["getRandomValues"] == "function") {
        var randomBuffer = new Uint8Array(1);
        return () => {
          crypto.getRandomValues(randomBuffer);
          return randomBuffer[0];
        };
      } else if (ENVIRONMENT_IS_NODE) {
        try {
          return () => crypto_module["randomBytes"](1)[0];
        } catch (e) {
        }
      }
      return () => abort(
        "no cryptographic support found for randomDevice. consider polyfilling it if you want to use something insecure like Math.random(), e.g. put this in a --pre-js: var crypto = { getRandomValues: function(array) { for (var i = 0; i < array.length; i++) array[i] = (Math.random()*256)|0 } };"
      );
    }
    var PATH_FS = {
      resolve: function() {
        var resolvedPath = "", resolvedAbsolute = false;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = i >= 0 ? arguments[i] : FS.cwd();
          if (typeof path != "string") {
            throw new TypeError("Arguments to path.resolve must be strings");
          } else if (!path) {
            return "";
          }
          resolvedPath = path + "/" + resolvedPath;
          resolvedAbsolute = PATH.isAbs(path);
        }
        resolvedPath = PATH.normalizeArray(
          resolvedPath.split("/").filter((p) => !!p),
          !resolvedAbsolute
        ).join("/");
        return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
      },
      relative: (from, to) => {
        from = PATH_FS.resolve(from).substr(1);
        to = PATH_FS.resolve(to).substr(1);
        function trim(arr) {
          var start = 0;
          for (; start < arr.length; start++) {
            if (arr[start] !== "") break;
          }
          var end = arr.length - 1;
          for (; end >= 0; end--) {
            if (arr[end] !== "") break;
          }
          if (start > end) return [];
          return arr.slice(start, end - start + 1);
        }
        var fromParts = trim(from.split("/"));
        var toParts = trim(to.split("/"));
        var length = Math.min(fromParts.length, toParts.length);
        var samePartsLength = length;
        for (var i = 0; i < length; i++) {
          if (fromParts[i] !== toParts[i]) {
            samePartsLength = i;
            break;
          }
        }
        var outputParts = [];
        for (var i = samePartsLength; i < fromParts.length; i++) {
          outputParts.push("..");
        }
        outputParts = outputParts.concat(toParts.slice(samePartsLength));
        return outputParts.join("/");
      }
    };
    function intArrayFromString(stringy, dontAddNull, length) {
      var len = lengthBytesUTF8(stringy) + 1;
      var u8array = new Array(len);
      var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
      u8array.length = numBytesWritten;
      return u8array;
    }
    var TTY = {
      ttys: [],
      init: function() {
      },
      shutdown: function() {
      },
      register: function(dev, ops) {
        TTY.ttys[dev] = { input: [], output: [], ops };
        FS.registerDevice(dev, TTY.stream_ops);
      },
      stream_ops: {
        open: function(stream) {
          var tty = TTY.ttys[stream.node.rdev];
          if (!tty) {
            throw new FS.ErrnoError(43);
          }
          stream.tty = tty;
          stream.seekable = false;
        },
        close: function(stream) {
          stream.tty.ops.fsync(stream.tty);
        },
        fsync: function(stream) {
          stream.tty.ops.fsync(stream.tty);
        },
        read: function(stream, buffer2, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.get_char) {
            throw new FS.ErrnoError(60);
          }
          var bytesRead = 0;
          for (var i = 0; i < length; i++) {
            var result;
            try {
              result = stream.tty.ops.get_char(stream.tty);
            } catch (e) {
              throw new FS.ErrnoError(29);
            }
            if (result === void 0 && bytesRead === 0) {
              throw new FS.ErrnoError(6);
            }
            if (result === null || result === void 0) break;
            bytesRead++;
            buffer2[offset + i] = result;
          }
          if (bytesRead) {
            stream.node.timestamp = Date.now();
          }
          return bytesRead;
        },
        write: function(stream, buffer2, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.put_char) {
            throw new FS.ErrnoError(60);
          }
          try {
            for (var i = 0; i < length; i++) {
              stream.tty.ops.put_char(stream.tty, buffer2[offset + i]);
            }
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
          if (length) {
            stream.node.timestamp = Date.now();
          }
          return i;
        }
      },
      default_tty_ops: {
        get_char: function(tty) {
          if (!tty.input.length) {
            var result = null;
            if (ENVIRONMENT_IS_NODE) {
              var BUFSIZE = 256;
              var buf = Buffer.alloc(BUFSIZE);
              var bytesRead = 0;
              try {
                bytesRead = fs.readSync(process.stdin.fd, buf, 0, BUFSIZE, -1);
              } catch (e) {
                if (e.toString().includes("EOF")) bytesRead = 0;
                else throw e;
              }
              if (bytesRead > 0) {
                result = buf.slice(0, bytesRead).toString("utf-8");
              } else {
                result = null;
              }
            } else if (typeof window != "undefined" && typeof window.prompt == "function") {
              result = window.prompt("Input: ");
              if (result !== null) {
                result += "\n";
              }
            } else if (typeof readline == "function") {
              result = readline();
              if (result !== null) {
                result += "\n";
              }
            }
            if (!result) {
              return null;
            }
            tty.input = intArrayFromString(result);
          }
          return tty.input.shift();
        },
        put_char: function(tty, val) {
          if (val === null || val === 10) {
            out(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val);
          }
        },
        fsync: function(tty) {
          if (tty.output && tty.output.length > 0) {
            out(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        }
      },
      default_tty1_ops: {
        put_char: function(tty, val) {
          if (val === null || val === 10) {
            err(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val);
          }
        },
        fsync: function(tty) {
          if (tty.output && tty.output.length > 0) {
            err(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        }
      }
    };
    function mmapAlloc(size) {
      abort(
        "internal error: mmapAlloc called but `emscripten_builtin_memalign` native symbol not exported"
      );
    }
    var MEMFS = {
      ops_table: null,
      mount: function(mount) {
        return MEMFS.createNode(null, "/", 16384 | 511, 0);
      },
      createNode: function(parent, name, mode, dev) {
        if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
          throw new FS.ErrnoError(63);
        }
        if (!MEMFS.ops_table) {
          MEMFS.ops_table = {
            dir: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                lookup: MEMFS.node_ops.lookup,
                mknod: MEMFS.node_ops.mknod,
                rename: MEMFS.node_ops.rename,
                unlink: MEMFS.node_ops.unlink,
                rmdir: MEMFS.node_ops.rmdir,
                readdir: MEMFS.node_ops.readdir,
                symlink: MEMFS.node_ops.symlink
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek
              }
            },
            file: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek,
                read: MEMFS.stream_ops.read,
                write: MEMFS.stream_ops.write,
                allocate: MEMFS.stream_ops.allocate,
                mmap: MEMFS.stream_ops.mmap,
                msync: MEMFS.stream_ops.msync
              }
            },
            link: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                readlink: MEMFS.node_ops.readlink
              },
              stream: {}
            },
            chrdev: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: FS.chrdev_stream_ops
            }
          };
        }
        var node = FS.createNode(parent, name, mode, dev);
        if (FS.isDir(node.mode)) {
          node.node_ops = MEMFS.ops_table.dir.node;
          node.stream_ops = MEMFS.ops_table.dir.stream;
          node.contents = {};
        } else if (FS.isFile(node.mode)) {
          node.node_ops = MEMFS.ops_table.file.node;
          node.stream_ops = MEMFS.ops_table.file.stream;
          node.usedBytes = 0;
          node.contents = null;
        } else if (FS.isLink(node.mode)) {
          node.node_ops = MEMFS.ops_table.link.node;
          node.stream_ops = MEMFS.ops_table.link.stream;
        } else if (FS.isChrdev(node.mode)) {
          node.node_ops = MEMFS.ops_table.chrdev.node;
          node.stream_ops = MEMFS.ops_table.chrdev.stream;
        }
        node.timestamp = Date.now();
        if (parent) {
          parent.contents[name] = node;
          parent.timestamp = node.timestamp;
        }
        return node;
      },
      getFileDataAsTypedArray: function(node) {
        if (!node.contents) return new Uint8Array(0);
        if (node.contents.subarray)
          return node.contents.subarray(0, node.usedBytes);
        return new Uint8Array(node.contents);
      },
      expandFileStorage: function(node, newCapacity) {
        var prevCapacity = node.contents ? node.contents.length : 0;
        if (prevCapacity >= newCapacity) return;
        var CAPACITY_DOUBLING_MAX = 1024 * 1024;
        newCapacity = Math.max(
          newCapacity,
          prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125) >>> 0
        );
        if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256);
        var oldContents = node.contents;
        node.contents = new Uint8Array(newCapacity);
        if (node.usedBytes > 0)
          node.contents.set(oldContents.subarray(0, node.usedBytes), 0);
      },
      resizeFileStorage: function(node, newSize) {
        if (node.usedBytes == newSize) return;
        if (newSize == 0) {
          node.contents = null;
          node.usedBytes = 0;
        } else {
          var oldContents = node.contents;
          node.contents = new Uint8Array(newSize);
          if (oldContents) {
            node.contents.set(
              oldContents.subarray(0, Math.min(newSize, node.usedBytes))
            );
          }
          node.usedBytes = newSize;
        }
      },
      node_ops: {
        getattr: function(node) {
          var attr = {};
          attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
          attr.ino = node.id;
          attr.mode = node.mode;
          attr.nlink = 1;
          attr.uid = 0;
          attr.gid = 0;
          attr.rdev = node.rdev;
          if (FS.isDir(node.mode)) {
            attr.size = 4096;
          } else if (FS.isFile(node.mode)) {
            attr.size = node.usedBytes;
          } else if (FS.isLink(node.mode)) {
            attr.size = node.link.length;
          } else {
            attr.size = 0;
          }
          attr.atime = new Date(node.timestamp);
          attr.mtime = new Date(node.timestamp);
          attr.ctime = new Date(node.timestamp);
          attr.blksize = 4096;
          attr.blocks = Math.ceil(attr.size / attr.blksize);
          return attr;
        },
        setattr: function(node, attr) {
          if (attr.mode !== void 0) {
            node.mode = attr.mode;
          }
          if (attr.timestamp !== void 0) {
            node.timestamp = attr.timestamp;
          }
          if (attr.size !== void 0) {
            MEMFS.resizeFileStorage(node, attr.size);
          }
        },
        lookup: function(parent, name) {
          throw FS.genericErrors[44];
        },
        mknod: function(parent, name, mode, dev) {
          return MEMFS.createNode(parent, name, mode, dev);
        },
        rename: function(old_node, new_dir, new_name) {
          if (FS.isDir(old_node.mode)) {
            var new_node;
            try {
              new_node = FS.lookupNode(new_dir, new_name);
            } catch (e) {
            }
            if (new_node) {
              for (var i in new_node.contents) {
                throw new FS.ErrnoError(55);
              }
            }
          }
          delete old_node.parent.contents[old_node.name];
          old_node.parent.timestamp = Date.now();
          old_node.name = new_name;
          new_dir.contents[new_name] = old_node;
          new_dir.timestamp = old_node.parent.timestamp;
          old_node.parent = new_dir;
        },
        unlink: function(parent, name) {
          delete parent.contents[name];
          parent.timestamp = Date.now();
        },
        rmdir: function(parent, name) {
          var node = FS.lookupNode(parent, name);
          for (var i in node.contents) {
            throw new FS.ErrnoError(55);
          }
          delete parent.contents[name];
          parent.timestamp = Date.now();
        },
        readdir: function(node) {
          var entries = [".", ".."];
          for (var key in node.contents) {
            if (!node.contents.hasOwnProperty(key)) {
              continue;
            }
            entries.push(key);
          }
          return entries;
        },
        symlink: function(parent, newname, oldpath) {
          var node = MEMFS.createNode(parent, newname, 511 | 40960, 0);
          node.link = oldpath;
          return node;
        },
        readlink: function(node) {
          if (!FS.isLink(node.mode)) {
            throw new FS.ErrnoError(28);
          }
          return node.link;
        }
      },
      stream_ops: {
        read: function(stream, buffer2, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= stream.node.usedBytes) return 0;
          var size = Math.min(stream.node.usedBytes - position, length);
          assert(size >= 0);
          if (size > 8 && contents.subarray) {
            buffer2.set(contents.subarray(position, position + size), offset);
          } else {
            for (var i = 0; i < size; i++)
              buffer2[offset + i] = contents[position + i];
          }
          return size;
        },
        write: function(stream, buffer2, offset, length, position, canOwn) {
          assert(!(buffer2 instanceof ArrayBuffer));
          if (buffer2.buffer === HEAP8.buffer) {
            canOwn = false;
          }
          if (!length) return 0;
          var node = stream.node;
          node.timestamp = Date.now();
          if (buffer2.subarray && (!node.contents || node.contents.subarray)) {
            if (canOwn) {
              assert(
                position === 0,
                "canOwn must imply no weird position inside the file"
              );
              node.contents = buffer2.subarray(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (node.usedBytes === 0 && position === 0) {
              node.contents = buffer2.slice(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (position + length <= node.usedBytes) {
              node.contents.set(
                buffer2.subarray(offset, offset + length),
                position
              );
              return length;
            }
          }
          MEMFS.expandFileStorage(node, position + length);
          if (node.contents.subarray && buffer2.subarray) {
            node.contents.set(buffer2.subarray(offset, offset + length), position);
          } else {
            for (var i = 0; i < length; i++) {
              node.contents[position + i] = buffer2[offset + i];
            }
          }
          node.usedBytes = Math.max(node.usedBytes, position + length);
          return length;
        },
        llseek: function(stream, offset, whence) {
          var position = offset;
          if (whence === 1) {
            position += stream.position;
          } else if (whence === 2) {
            if (FS.isFile(stream.node.mode)) {
              position += stream.node.usedBytes;
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(28);
          }
          return position;
        },
        allocate: function(stream, offset, length) {
          MEMFS.expandFileStorage(stream.node, offset + length);
          stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
        },
        mmap: function(stream, length, position, prot, flags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          var ptr;
          var allocated;
          var contents = stream.node.contents;
          if (!(flags & 2) && contents.buffer === buffer) {
            allocated = false;
            ptr = contents.byteOffset;
          } else {
            if (position > 0 || position + length < contents.length) {
              if (contents.subarray) {
                contents = contents.subarray(position, position + length);
              } else {
                contents = Array.prototype.slice.call(
                  contents,
                  position,
                  position + length
                );
              }
            }
            allocated = true;
            ptr = mmapAlloc();
            if (!ptr) {
              throw new FS.ErrnoError(48);
            }
            HEAP8.set(contents, ptr);
          }
          return { ptr, allocated };
        },
        msync: function(stream, buffer2, offset, length, mmapFlags) {
          MEMFS.stream_ops.write(stream, buffer2, 0, length, offset, false);
          return 0;
        }
      }
    };
    function asyncLoad(url, onload, onerror, noRunDep) {
      var dep = getUniqueRunDependency("al " + url);
      readAsync(
        url,
        (arrayBuffer) => {
          assert(
            arrayBuffer,
            'Loading data file "' + url + '" failed (no arrayBuffer).'
          );
          onload(new Uint8Array(arrayBuffer));
          if (dep) removeRunDependency(dep);
        },
        (event) => {
          if (onerror) {
            onerror();
          } else {
            throw 'Loading data file "' + url + '" failed.';
          }
        }
      );
      if (dep) addRunDependency(dep);
    }
    var ERRNO_MESSAGES = {
      0: "Success",
      1: "Arg list too long",
      2: "Permission denied",
      3: "Address already in use",
      4: "Address not available",
      5: "Address family not supported by protocol family",
      6: "No more processes",
      7: "Socket already connected",
      8: "Bad file number",
      9: "Trying to read unreadable message",
      10: "Mount device busy",
      11: "Operation canceled",
      12: "No children",
      13: "Connection aborted",
      14: "Connection refused",
      15: "Connection reset by peer",
      16: "File locking deadlock error",
      17: "Destination address required",
      18: "Math arg out of domain of func",
      19: "Quota exceeded",
      20: "File exists",
      21: "Bad address",
      22: "File too large",
      23: "Host is unreachable",
      24: "Identifier removed",
      25: "Illegal byte sequence",
      26: "Connection already in progress",
      27: "Interrupted system call",
      28: "Invalid argument",
      29: "I/O error",
      30: "Socket is already connected",
      31: "Is a directory",
      32: "Too many symbolic links",
      33: "Too many open files",
      34: "Too many links",
      35: "Message too long",
      36: "Multihop attempted",
      37: "File or path name too long",
      38: "Network interface is not configured",
      39: "Connection reset by network",
      40: "Network is unreachable",
      41: "Too many open files in system",
      42: "No buffer space available",
      43: "No such device",
      44: "No such file or directory",
      45: "Exec format error",
      46: "No record locks available",
      47: "The link has been severed",
      48: "Not enough core",
      49: "No message of desired type",
      50: "Protocol not available",
      51: "No space left on device",
      52: "Function not implemented",
      53: "Socket is not connected",
      54: "Not a directory",
      55: "Directory not empty",
      56: "State not recoverable",
      57: "Socket operation on non-socket",
      59: "Not a typewriter",
      60: "No such device or address",
      61: "Value too large for defined data type",
      62: "Previous owner died",
      63: "Not super-user",
      64: "Broken pipe",
      65: "Protocol error",
      66: "Unknown protocol",
      67: "Protocol wrong type for socket",
      68: "Math result not representable",
      69: "Read only file system",
      70: "Illegal seek",
      71: "No such process",
      72: "Stale file handle",
      73: "Connection timed out",
      74: "Text file busy",
      75: "Cross-device link",
      100: "Device not a stream",
      101: "Bad font file fmt",
      102: "Invalid slot",
      103: "Invalid request code",
      104: "No anode",
      105: "Block device required",
      106: "Channel number out of range",
      107: "Level 3 halted",
      108: "Level 3 reset",
      109: "Link number out of range",
      110: "Protocol driver not attached",
      111: "No CSI structure available",
      112: "Level 2 halted",
      113: "Invalid exchange",
      114: "Invalid request descriptor",
      115: "Exchange full",
      116: "No data (for no delay io)",
      117: "Timer expired",
      118: "Out of streams resources",
      119: "Machine is not on the network",
      120: "Package not installed",
      121: "The object is remote",
      122: "Advertise error",
      123: "Srmount error",
      124: "Communication error on send",
      125: "Cross mount point (not really error)",
      126: "Given log. name not unique",
      127: "f.d. invalid for this operation",
      128: "Remote address changed",
      129: "Can   access a needed shared lib",
      130: "Accessing a corrupted shared lib",
      131: ".lib section in a.out corrupted",
      132: "Attempting to link in too many libs",
      133: "Attempting to exec a shared library",
      135: "Streams pipe error",
      136: "Too many users",
      137: "Socket type not supported",
      138: "Not supported",
      139: "Protocol family not supported",
      140: "Can't send after socket shutdown",
      141: "Too many references",
      142: "Host is down",
      148: "No medium (in tape drive)",
      156: "Level 2 not synchronized"
    };
    var ERRNO_CODES = {};
    var FS = {
      root: null,
      mounts: [],
      devices: {},
      streams: [],
      nextInode: 1,
      nameTable: null,
      currentPath: "/",
      initialized: false,
      ignorePermissions: true,
      ErrnoError: null,
      genericErrors: {},
      filesystems: null,
      syncFSRequests: 0,
      lookupPath: (path, opts = {}) => {
        path = PATH_FS.resolve(FS.cwd(), path);
        if (!path) return { path: "", node: null };
        var defaults = {
          follow_mount: true,
          recurse_count: 0
        };
        opts = Object.assign(defaults, opts);
        if (opts.recurse_count > 8) {
          throw new FS.ErrnoError(32);
        }
        var parts = PATH.normalizeArray(
          path.split("/").filter((p) => !!p),
          false
        );
        var current = FS.root;
        var current_path = "/";
        for (var i = 0; i < parts.length; i++) {
          var islast = i === parts.length - 1;
          if (islast && opts.parent) {
            break;
          }
          current = FS.lookupNode(current, parts[i]);
          current_path = PATH.join2(current_path, parts[i]);
          if (FS.isMountpoint(current)) {
            if (!islast || islast && opts.follow_mount) {
              current = current.mounted.root;
            }
          }
          if (!islast || opts.follow) {
            var count = 0;
            while (FS.isLink(current.mode)) {
              var link = FS.readlink(current_path);
              current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
              var lookup = FS.lookupPath(current_path, {
                recurse_count: opts.recurse_count + 1
              });
              current = lookup.node;
              if (count++ > 40) {
                throw new FS.ErrnoError(32);
              }
            }
          }
        }
        return { path: current_path, node: current };
      },
      getPath: (node) => {
        var path;
        while (true) {
          if (FS.isRoot(node)) {
            var mount = node.mount.mountpoint;
            if (!path) return mount;
            return mount[mount.length - 1] !== "/" ? mount + "/" + path : mount + path;
          }
          path = path ? node.name + "/" + path : node.name;
          node = node.parent;
        }
      },
      hashName: (parentid, name) => {
        var hash = 0;
        for (var i = 0; i < name.length; i++) {
          hash = (hash << 5) - hash + name.charCodeAt(i) | 0;
        }
        return (parentid + hash >>> 0) % FS.nameTable.length;
      },
      hashAddNode: (node) => {
        var hash = FS.hashName(node.parent.id, node.name);
        node.name_next = FS.nameTable[hash];
        FS.nameTable[hash] = node;
      },
      hashRemoveNode: (node) => {
        var hash = FS.hashName(node.parent.id, node.name);
        if (FS.nameTable[hash] === node) {
          FS.nameTable[hash] = node.name_next;
        } else {
          var current = FS.nameTable[hash];
          while (current) {
            if (current.name_next === node) {
              current.name_next = node.name_next;
              break;
            }
            current = current.name_next;
          }
        }
      },
      lookupNode: (parent, name) => {
        var errCode = FS.mayLookup(parent);
        if (errCode) {
          throw new FS.ErrnoError(errCode, parent);
        }
        var hash = FS.hashName(parent.id, name);
        for (var node = FS.nameTable[hash]; node; node = node.name_next) {
          var nodeName = node.name;
          if (node.parent.id === parent.id && nodeName === name) {
            return node;
          }
        }
        return FS.lookup(parent, name);
      },
      createNode: (parent, name, mode, rdev) => {
        assert(typeof parent == "object");
        var node = new FS.FSNode(parent, name, mode, rdev);
        FS.hashAddNode(node);
        return node;
      },
      destroyNode: (node) => {
        FS.hashRemoveNode(node);
      },
      isRoot: (node) => {
        return node === node.parent;
      },
      isMountpoint: (node) => {
        return !!node.mounted;
      },
      isFile: (mode) => {
        return (mode & 61440) === 32768;
      },
      isDir: (mode) => {
        return (mode & 61440) === 16384;
      },
      isLink: (mode) => {
        return (mode & 61440) === 40960;
      },
      isChrdev: (mode) => {
        return (mode & 61440) === 8192;
      },
      isBlkdev: (mode) => {
        return (mode & 61440) === 24576;
      },
      isFIFO: (mode) => {
        return (mode & 61440) === 4096;
      },
      isSocket: (mode) => {
        return (mode & 49152) === 49152;
      },
      flagModes: { r: 0, "r+": 2, w: 577, "w+": 578, a: 1089, "a+": 1090 },
      modeStringToFlags: (str) => {
        var flags = FS.flagModes[str];
        if (typeof flags == "undefined") {
          throw new Error("Unknown file open mode: " + str);
        }
        return flags;
      },
      flagsToPermissionString: (flag) => {
        var perms = ["r", "w", "rw"][flag & 3];
        if (flag & 512) {
          perms += "w";
        }
        return perms;
      },
      nodePermissions: (node, perms) => {
        if (FS.ignorePermissions) {
          return 0;
        }
        if (perms.includes("r") && !(node.mode & 292)) {
          return 2;
        } else if (perms.includes("w") && !(node.mode & 146)) {
          return 2;
        } else if (perms.includes("x") && !(node.mode & 73)) {
          return 2;
        }
        return 0;
      },
      mayLookup: (dir) => {
        var errCode = FS.nodePermissions(dir, "x");
        if (errCode) return errCode;
        if (!dir.node_ops.lookup) return 2;
        return 0;
      },
      mayCreate: (dir, name) => {
        try {
          var node = FS.lookupNode(dir, name);
          return 20;
        } catch (e) {
        }
        return FS.nodePermissions(dir, "wx");
      },
      mayDelete: (dir, name, isdir) => {
        var node;
        try {
          node = FS.lookupNode(dir, name);
        } catch (e) {
          return e.errno;
        }
        var errCode = FS.nodePermissions(dir, "wx");
        if (errCode) {
          return errCode;
        }
        if (isdir) {
          if (!FS.isDir(node.mode)) {
            return 54;
          }
          if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
            return 10;
          }
        } else {
          if (FS.isDir(node.mode)) {
            return 31;
          }
        }
        return 0;
      },
      mayOpen: (node, flags) => {
        if (!node) {
          return 44;
        }
        if (FS.isLink(node.mode)) {
          return 32;
        } else if (FS.isDir(node.mode)) {
          if (FS.flagsToPermissionString(flags) !== "r" || // opening for write
          flags & 512) {
            return 31;
          }
        }
        return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
      },
      MAX_OPEN_FDS: 4096,
      nextfd: (fd_start = 0, fd_end = FS.MAX_OPEN_FDS) => {
        for (var fd = fd_start; fd <= fd_end; fd++) {
          if (!FS.streams[fd]) {
            return fd;
          }
        }
        throw new FS.ErrnoError(33);
      },
      getStream: (fd) => FS.streams[fd],
      createStream: (stream, fd_start, fd_end) => {
        if (!FS.FSStream) {
          FS.FSStream = /** @constructor */
          function() {
            this.shared = {};
          };
          FS.FSStream.prototype = {};
          Object.defineProperties(FS.FSStream.prototype, {
            object: {
              /** @this {FS.FSStream} */
              get: function() {
                return this.node;
              },
              /** @this {FS.FSStream} */
              set: function(val) {
                this.node = val;
              }
            },
            isRead: {
              /** @this {FS.FSStream} */
              get: function() {
                return (this.flags & 2097155) !== 1;
              }
            },
            isWrite: {
              /** @this {FS.FSStream} */
              get: function() {
                return (this.flags & 2097155) !== 0;
              }
            },
            isAppend: {
              /** @this {FS.FSStream} */
              get: function() {
                return this.flags & 1024;
              }
            },
            flags: {
              /** @this {FS.FSStream} */
              get: function() {
                return this.shared.flags;
              },
              /** @this {FS.FSStream} */
              set: function(val) {
                this.shared.flags = val;
              }
            },
            position: {
              /** @this {FS.FSStream} */
              get: function() {
                return this.shared.position;
              },
              /** @this {FS.FSStream} */
              set: function(val) {
                this.shared.position = val;
              }
            }
          });
        }
        stream = Object.assign(new FS.FSStream(), stream);
        var fd = FS.nextfd(fd_start, fd_end);
        stream.fd = fd;
        FS.streams[fd] = stream;
        return stream;
      },
      closeStream: (fd) => {
        FS.streams[fd] = null;
      },
      chrdev_stream_ops: {
        open: (stream) => {
          var device = FS.getDevice(stream.node.rdev);
          stream.stream_ops = device.stream_ops;
          if (stream.stream_ops.open) {
            stream.stream_ops.open(stream);
          }
        },
        llseek: () => {
          throw new FS.ErrnoError(70);
        }
      },
      major: (dev) => dev >> 8,
      minor: (dev) => dev & 255,
      makedev: (ma, mi) => ma << 8 | mi,
      registerDevice: (dev, ops) => {
        FS.devices[dev] = { stream_ops: ops };
      },
      getDevice: (dev) => FS.devices[dev],
      getMounts: (mount) => {
        var mounts = [];
        var check = [mount];
        while (check.length) {
          var m = check.pop();
          mounts.push(m);
          check.push.apply(check, m.mounts);
        }
        return mounts;
      },
      syncfs: (populate, callback) => {
        if (typeof populate == "function") {
          callback = populate;
          populate = false;
        }
        FS.syncFSRequests++;
        if (FS.syncFSRequests > 1) {
          err(
            "warning: " + FS.syncFSRequests + " FS.syncfs operations in flight at once, probably just doing extra work"
          );
        }
        var mounts = FS.getMounts(FS.root.mount);
        var completed = 0;
        function doCallback(errCode) {
          assert(FS.syncFSRequests > 0);
          FS.syncFSRequests--;
          return callback(errCode);
        }
        function done(errCode) {
          if (errCode) {
            if (!done.errored) {
              done.errored = true;
              return doCallback(errCode);
            }
            return;
          }
          if (++completed >= mounts.length) {
            doCallback(null);
          }
        }
        mounts.forEach((mount) => {
          if (!mount.type.syncfs) {
            return done(null);
          }
          mount.type.syncfs(mount, populate, done);
        });
      },
      mount: (type, opts, mountpoint) => {
        if (typeof type == "string") {
          throw type;
        }
        var root = mountpoint === "/";
        var pseudo = !mountpoint;
        var node;
        if (root && FS.root) {
          throw new FS.ErrnoError(10);
        } else if (!root && !pseudo) {
          var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
          mountpoint = lookup.path;
          node = lookup.node;
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(10);
          }
          if (!FS.isDir(node.mode)) {
            throw new FS.ErrnoError(54);
          }
        }
        var mount = {
          type,
          opts,
          mountpoint,
          mounts: []
        };
        var mountRoot = type.mount(mount);
        mountRoot.mount = mount;
        mount.root = mountRoot;
        if (root) {
          FS.root = mountRoot;
        } else if (node) {
          node.mounted = mount;
          if (node.mount) {
            node.mount.mounts.push(mount);
          }
        }
        return mountRoot;
      },
      unmount: (mountpoint) => {
        var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
        if (!FS.isMountpoint(lookup.node)) {
          throw new FS.ErrnoError(28);
        }
        var node = lookup.node;
        var mount = node.mounted;
        var mounts = FS.getMounts(mount);
        Object.keys(FS.nameTable).forEach((hash) => {
          var current = FS.nameTable[hash];
          while (current) {
            var next = current.name_next;
            if (mounts.includes(current.mount)) {
              FS.destroyNode(current);
            }
            current = next;
          }
        });
        node.mounted = null;
        var idx = node.mount.mounts.indexOf(mount);
        assert(idx !== -1);
        node.mount.mounts.splice(idx, 1);
      },
      lookup: (parent, name) => {
        return parent.node_ops.lookup(parent, name);
      },
      mknod: (path, mode, dev) => {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        if (!name || name === "." || name === "..") {
          throw new FS.ErrnoError(28);
        }
        var errCode = FS.mayCreate(parent, name);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.mknod) {
          throw new FS.ErrnoError(63);
        }
        return parent.node_ops.mknod(parent, name, mode, dev);
      },
      create: (path, mode) => {
        mode = mode !== void 0 ? mode : 438;
        mode &= 4095;
        mode |= 32768;
        return FS.mknod(path, mode, 0);
      },
      mkdir: (path, mode) => {
        mode = mode !== void 0 ? mode : 511;
        mode &= 511 | 512;
        mode |= 16384;
        return FS.mknod(path, mode, 0);
      },
      mkdirTree: (path, mode) => {
        var dirs = path.split("/");
        var d = "";
        for (var i = 0; i < dirs.length; ++i) {
          if (!dirs[i]) continue;
          d += "/" + dirs[i];
          try {
            FS.mkdir(d, mode);
          } catch (e) {
            if (e.errno != 20) throw e;
          }
        }
      },
      mkdev: (path, mode, dev) => {
        if (typeof dev == "undefined") {
          dev = mode;
          mode = 438;
        }
        mode |= 8192;
        return FS.mknod(path, mode, dev);
      },
      symlink: (oldpath, newpath) => {
        if (!PATH_FS.resolve(oldpath)) {
          throw new FS.ErrnoError(44);
        }
        var lookup = FS.lookupPath(newpath, { parent: true });
        var parent = lookup.node;
        if (!parent) {
          throw new FS.ErrnoError(44);
        }
        var newname = PATH.basename(newpath);
        var errCode = FS.mayCreate(parent, newname);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.symlink) {
          throw new FS.ErrnoError(63);
        }
        return parent.node_ops.symlink(parent, newname, oldpath);
      },
      rename: (old_path, new_path) => {
        var old_dirname = PATH.dirname(old_path);
        var new_dirname = PATH.dirname(new_path);
        var old_name = PATH.basename(old_path);
        var new_name = PATH.basename(new_path);
        var lookup, old_dir, new_dir;
        lookup = FS.lookupPath(old_path, { parent: true });
        old_dir = lookup.node;
        lookup = FS.lookupPath(new_path, { parent: true });
        new_dir = lookup.node;
        if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
        if (old_dir.mount !== new_dir.mount) {
          throw new FS.ErrnoError(75);
        }
        var old_node = FS.lookupNode(old_dir, old_name);
        var relative = PATH_FS.relative(old_path, new_dirname);
        if (relative.charAt(0) !== ".") {
          throw new FS.ErrnoError(28);
        }
        relative = PATH_FS.relative(new_path, old_dirname);
        if (relative.charAt(0) !== ".") {
          throw new FS.ErrnoError(55);
        }
        var new_node;
        try {
          new_node = FS.lookupNode(new_dir, new_name);
        } catch (e) {
        }
        if (old_node === new_node) {
          return;
        }
        var isdir = FS.isDir(old_node.mode);
        var errCode = FS.mayDelete(old_dir, old_name, isdir);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        errCode = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!old_dir.node_ops.rename) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(old_node) || new_node && FS.isMountpoint(new_node)) {
          throw new FS.ErrnoError(10);
        }
        if (new_dir !== old_dir) {
          errCode = FS.nodePermissions(old_dir, "w");
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
        }
        FS.hashRemoveNode(old_node);
        try {
          old_dir.node_ops.rename(old_node, new_dir, new_name);
        } catch (e) {
          throw e;
        } finally {
          FS.hashAddNode(old_node);
        }
      },
      rmdir: (path) => {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var errCode = FS.mayDelete(parent, name, true);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.rmdir) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        parent.node_ops.rmdir(parent, name);
        FS.destroyNode(node);
      },
      readdir: (path) => {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        if (!node.node_ops.readdir) {
          throw new FS.ErrnoError(54);
        }
        return node.node_ops.readdir(node);
      },
      unlink: (path) => {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        if (!parent) {
          throw new FS.ErrnoError(44);
        }
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var errCode = FS.mayDelete(parent, name, false);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.unlink) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        parent.node_ops.unlink(parent, name);
        FS.destroyNode(node);
      },
      readlink: (path) => {
        var lookup = FS.lookupPath(path);
        var link = lookup.node;
        if (!link) {
          throw new FS.ErrnoError(44);
        }
        if (!link.node_ops.readlink) {
          throw new FS.ErrnoError(28);
        }
        return PATH_FS.resolve(
          FS.getPath(link.parent),
          link.node_ops.readlink(link)
        );
      },
      stat: (path, dontFollow) => {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        var node = lookup.node;
        if (!node) {
          throw new FS.ErrnoError(44);
        }
        if (!node.node_ops.getattr) {
          throw new FS.ErrnoError(63);
        }
        return node.node_ops.getattr(node);
      },
      lstat: (path) => {
        return FS.stat(path, true);
      },
      chmod: (path, mode, dontFollow) => {
        var node;
        if (typeof path == "string") {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        node.node_ops.setattr(node, {
          mode: mode & 4095 | node.mode & -4096,
          timestamp: Date.now()
        });
      },
      lchmod: (path, mode) => {
        FS.chmod(path, mode, true);
      },
      fchmod: (fd, mode) => {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(8);
        }
        FS.chmod(stream.node, mode);
      },
      chown: (path, uid, gid, dontFollow) => {
        var node;
        if (typeof path == "string") {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        node.node_ops.setattr(node, {
          timestamp: Date.now()
          // we ignore the uid / gid for now
        });
      },
      lchown: (path, uid, gid) => {
        FS.chown(path, uid, gid, true);
      },
      fchown: (fd, uid, gid) => {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(8);
        }
        FS.chown(stream.node, uid, gid);
      },
      truncate: (path, len) => {
        if (len < 0) {
          throw new FS.ErrnoError(28);
        }
        var node;
        if (typeof path == "string") {
          var lookup = FS.lookupPath(path, { follow: true });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isDir(node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!FS.isFile(node.mode)) {
          throw new FS.ErrnoError(28);
        }
        var errCode = FS.nodePermissions(node, "w");
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        node.node_ops.setattr(node, {
          size: len,
          timestamp: Date.now()
        });
      },
      ftruncate: (fd, len) => {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(28);
        }
        FS.truncate(stream.node, len);
      },
      utime: (path, atime, mtime) => {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        node.node_ops.setattr(node, {
          timestamp: Math.max(atime, mtime)
        });
      },
      open: (path, flags, mode) => {
        if (path === "") {
          throw new FS.ErrnoError(44);
        }
        flags = typeof flags == "string" ? FS.modeStringToFlags(flags) : flags;
        mode = typeof mode == "undefined" ? 438 : mode;
        if (flags & 64) {
          mode = mode & 4095 | 32768;
        } else {
          mode = 0;
        }
        var node;
        if (typeof path == "object") {
          node = path;
        } else {
          path = PATH.normalize(path);
          try {
            var lookup = FS.lookupPath(path, {
              follow: !(flags & 131072)
            });
            node = lookup.node;
          } catch (e) {
          }
        }
        var created = false;
        if (flags & 64) {
          if (node) {
            if (flags & 128) {
              throw new FS.ErrnoError(20);
            }
          } else {
            node = FS.mknod(path, mode, 0);
            created = true;
          }
        }
        if (!node) {
          throw new FS.ErrnoError(44);
        }
        if (FS.isChrdev(node.mode)) {
          flags &= -513;
        }
        if (flags & 65536 && !FS.isDir(node.mode)) {
          throw new FS.ErrnoError(54);
        }
        if (!created) {
          var errCode = FS.mayOpen(node, flags);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
        }
        if (flags & 512 && !created) {
          FS.truncate(node, 0);
        }
        flags &= -131713;
        var stream = FS.createStream({
          node,
          path: FS.getPath(node),
          // we want the absolute path to the node
          flags,
          seekable: true,
          position: 0,
          stream_ops: node.stream_ops,
          // used by the file family libc calls (fopen, fwrite, ferror, etc.)
          ungotten: [],
          error: false
        });
        if (stream.stream_ops.open) {
          stream.stream_ops.open(stream);
        }
        if (Module["logReadFiles"] && !(flags & 1)) {
          if (!FS.readFiles) FS.readFiles = {};
          if (!(path in FS.readFiles)) {
            FS.readFiles[path] = 1;
          }
        }
        return stream;
      },
      close: (stream) => {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (stream.getdents) stream.getdents = null;
        try {
          if (stream.stream_ops.close) {
            stream.stream_ops.close(stream);
          }
        } catch (e) {
          throw e;
        } finally {
          FS.closeStream(stream.fd);
        }
        stream.fd = null;
      },
      isClosed: (stream) => {
        return stream.fd === null;
      },
      llseek: (stream, offset, whence) => {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (!stream.seekable || !stream.stream_ops.llseek) {
          throw new FS.ErrnoError(70);
        }
        if (whence != 0 && whence != 1 && whence != 2) {
          throw new FS.ErrnoError(28);
        }
        stream.position = stream.stream_ops.llseek(stream, offset, whence);
        stream.ungotten = [];
        return stream.position;
      },
      read: (stream, buffer2, offset, length, position) => {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(28);
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(8);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!stream.stream_ops.read) {
          throw new FS.ErrnoError(28);
        }
        var seeking = typeof position != "undefined";
        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(70);
        }
        var bytesRead = stream.stream_ops.read(
          stream,
          buffer2,
          offset,
          length,
          position
        );
        if (!seeking) stream.position += bytesRead;
        return bytesRead;
      },
      write: (stream, buffer2, offset, length, position, canOwn) => {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(28);
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(8);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!stream.stream_ops.write) {
          throw new FS.ErrnoError(28);
        }
        if (stream.seekable && stream.flags & 1024) {
          FS.llseek(stream, 0, 2);
        }
        var seeking = typeof position != "undefined";
        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(70);
        }
        var bytesWritten = stream.stream_ops.write(
          stream,
          buffer2,
          offset,
          length,
          position,
          canOwn
        );
        if (!seeking) stream.position += bytesWritten;
        return bytesWritten;
      },
      allocate: (stream, offset, length) => {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (offset < 0 || length <= 0) {
          throw new FS.ErrnoError(28);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(8);
        }
        if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(43);
        }
        if (!stream.stream_ops.allocate) {
          throw new FS.ErrnoError(138);
        }
        stream.stream_ops.allocate(stream, offset, length);
      },
      mmap: (stream, length, position, prot, flags) => {
        if ((prot & 2) !== 0 && (flags & 2) === 0 && (stream.flags & 2097155) !== 2) {
          throw new FS.ErrnoError(2);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(2);
        }
        if (!stream.stream_ops.mmap) {
          throw new FS.ErrnoError(43);
        }
        return stream.stream_ops.mmap(stream, length, position, prot, flags);
      },
      msync: (stream, buffer2, offset, length, mmapFlags) => {
        if (!stream.stream_ops.msync) {
          return 0;
        }
        return stream.stream_ops.msync(stream, buffer2, offset, length, mmapFlags);
      },
      munmap: (stream) => 0,
      ioctl: (stream, cmd, arg) => {
        if (!stream.stream_ops.ioctl) {
          throw new FS.ErrnoError(59);
        }
        return stream.stream_ops.ioctl(stream, cmd, arg);
      },
      readFile: (path, opts = {}) => {
        opts.flags = opts.flags || 0;
        opts.encoding = opts.encoding || "binary";
        if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
          throw new Error('Invalid encoding type "' + opts.encoding + '"');
        }
        var ret;
        var stream = FS.open(path, opts.flags);
        var stat = FS.stat(path);
        var length = stat.size;
        var buf = new Uint8Array(length);
        FS.read(stream, buf, 0, length, 0);
        if (opts.encoding === "utf8") {
          ret = UTF8ArrayToString(buf, 0);
        } else if (opts.encoding === "binary") {
          ret = buf;
        }
        FS.close(stream);
        return ret;
      },
      writeFile: (path, data, opts = {}) => {
        opts.flags = opts.flags || 577;
        var stream = FS.open(path, opts.flags, opts.mode);
        if (typeof data == "string") {
          var buf = new Uint8Array(lengthBytesUTF8(data) + 1);
          var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
          FS.write(stream, buf, 0, actualNumBytes, void 0, opts.canOwn);
        } else if (ArrayBuffer.isView(data)) {
          FS.write(stream, data, 0, data.byteLength, void 0, opts.canOwn);
        } else {
          throw new Error("Unsupported data type");
        }
        FS.close(stream);
      },
      cwd: () => FS.currentPath,
      chdir: (path) => {
        var lookup = FS.lookupPath(path, { follow: true });
        if (lookup.node === null) {
          throw new FS.ErrnoError(44);
        }
        if (!FS.isDir(lookup.node.mode)) {
          throw new FS.ErrnoError(54);
        }
        var errCode = FS.nodePermissions(lookup.node, "x");
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        FS.currentPath = lookup.path;
      },
      createDefaultDirectories: () => {
        FS.mkdir("/tmp");
        FS.mkdir("/home");
        FS.mkdir("/home/web_user");
      },
      createDefaultDevices: () => {
        FS.mkdir("/dev");
        FS.registerDevice(FS.makedev(1, 3), {
          read: () => 0,
          write: (stream, buffer2, offset, length, pos) => length
        });
        FS.mkdev("/dev/null", FS.makedev(1, 3));
        TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
        TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
        FS.mkdev("/dev/tty", FS.makedev(5, 0));
        FS.mkdev("/dev/tty1", FS.makedev(6, 0));
        var random_device = getRandomDevice();
        FS.createDevice("/dev", "random", random_device);
        FS.createDevice("/dev", "urandom", random_device);
        FS.mkdir("/dev/shm");
        FS.mkdir("/dev/shm/tmp");
      },
      createSpecialDirectories: () => {
        FS.mkdir("/proc");
        var proc_self = FS.mkdir("/proc/self");
        FS.mkdir("/proc/self/fd");
        FS.mount(
          {
            mount: () => {
              var node = FS.createNode(
                proc_self,
                "fd",
                16384 | 511,
                73
              );
              node.node_ops = {
                lookup: (parent, name) => {
                  var fd = +name;
                  var stream = FS.getStream(fd);
                  if (!stream) throw new FS.ErrnoError(8);
                  var ret = {
                    parent: null,
                    mount: { mountpoint: "fake" },
                    node_ops: { readlink: () => stream.path }
                  };
                  ret.parent = ret;
                  return ret;
                }
              };
              return node;
            }
          },
          {},
          "/proc/self/fd"
        );
      },
      createStandardStreams: () => {
        if (Module["stdin"]) {
          FS.createDevice("/dev", "stdin", Module["stdin"]);
        } else {
          FS.symlink("/dev/tty", "/dev/stdin");
        }
        if (Module["stdout"]) {
          FS.createDevice("/dev", "stdout", null, Module["stdout"]);
        } else {
          FS.symlink("/dev/tty", "/dev/stdout");
        }
        if (Module["stderr"]) {
          FS.createDevice("/dev", "stderr", null, Module["stderr"]);
        } else {
          FS.symlink("/dev/tty1", "/dev/stderr");
        }
        var stdin = FS.open("/dev/stdin", 0);
        var stdout = FS.open("/dev/stdout", 1);
        var stderr = FS.open("/dev/stderr", 1);
        assert(stdin.fd === 0, "invalid handle for stdin (" + stdin.fd + ")");
        assert(stdout.fd === 1, "invalid handle for stdout (" + stdout.fd + ")");
        assert(stderr.fd === 2, "invalid handle for stderr (" + stderr.fd + ")");
      },
      ensureErrnoError: () => {
        if (FS.ErrnoError) return;
        FS.ErrnoError = /** @this{Object} */
        function ErrnoError(errno, node) {
          this.node = node;
          this.setErrno = /** @this{Object} */
          function(errno2) {
            this.errno = errno2;
            for (var key in ERRNO_CODES) {
              if (ERRNO_CODES[key] === errno2) {
                this.code = key;
                break;
              }
            }
          };
          this.setErrno(errno);
          this.message = ERRNO_MESSAGES[errno];
          if (this.stack) {
            Object.defineProperty(this, "stack", {
              value: new Error().stack,
              writable: true
            });
            this.stack = demangleAll(this.stack);
          }
        };
        FS.ErrnoError.prototype = new Error();
        FS.ErrnoError.prototype.constructor = FS.ErrnoError;
        [44].forEach((code) => {
          FS.genericErrors[code] = new FS.ErrnoError(code);
          FS.genericErrors[code].stack = "<generic error, no stack>";
        });
      },
      staticInit: () => {
        FS.ensureErrnoError();
        FS.nameTable = new Array(4096);
        FS.mount(MEMFS, {}, "/");
        FS.createDefaultDirectories();
        FS.createDefaultDevices();
        FS.createSpecialDirectories();
        FS.filesystems = {
          MEMFS
        };
      },
      init: (input, output, error) => {
        assert(
          !FS.init.initialized,
          "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)"
        );
        FS.init.initialized = true;
        FS.ensureErrnoError();
        Module["stdin"] = input || Module["stdin"];
        Module["stdout"] = output || Module["stdout"];
        Module["stderr"] = error || Module["stderr"];
        FS.createStandardStreams();
      },
      quit: () => {
        FS.init.initialized = false;
        _fflush(0);
        for (var i = 0; i < FS.streams.length; i++) {
          var stream = FS.streams[i];
          if (!stream) {
            continue;
          }
          FS.close(stream);
        }
      },
      getMode: (canRead, canWrite) => {
        var mode = 0;
        if (canRead) mode |= 292 | 73;
        if (canWrite) mode |= 146;
        return mode;
      },
      findObject: (path, dontResolveLastLink) => {
        var ret = FS.analyzePath(path, dontResolveLastLink);
        if (!ret.exists) {
          return null;
        }
        return ret.object;
      },
      analyzePath: (path, dontResolveLastLink) => {
        try {
          var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          path = lookup.path;
        } catch (e) {
        }
        var ret = {
          isRoot: false,
          exists: false,
          error: 0,
          name: null,
          path: null,
          object: null,
          parentExists: false,
          parentPath: null,
          parentObject: null
        };
        try {
          var lookup = FS.lookupPath(path, { parent: true });
          ret.parentExists = true;
          ret.parentPath = lookup.path;
          ret.parentObject = lookup.node;
          ret.name = PATH.basename(path);
          lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          ret.exists = true;
          ret.path = lookup.path;
          ret.object = lookup.node;
          ret.name = lookup.node.name;
          ret.isRoot = lookup.path === "/";
        } catch (e) {
          ret.error = e.errno;
        }
        return ret;
      },
      createPath: (parent, path, canRead, canWrite) => {
        parent = typeof parent == "string" ? parent : FS.getPath(parent);
        var parts = path.split("/").reverse();
        while (parts.length) {
          var part = parts.pop();
          if (!part) continue;
          var current = PATH.join2(parent, part);
          try {
            FS.mkdir(current);
          } catch (e) {
          }
          parent = current;
        }
        return current;
      },
      createFile: (parent, name, properties, canRead, canWrite) => {
        var path = PATH.join2(
          typeof parent == "string" ? parent : FS.getPath(parent),
          name
        );
        var mode = FS.getMode(canRead, canWrite);
        return FS.create(path, mode);
      },
      createDataFile: (parent, name, data, canRead, canWrite, canOwn) => {
        var path = name;
        if (parent) {
          parent = typeof parent == "string" ? parent : FS.getPath(parent);
          path = name ? PATH.join2(parent, name) : parent;
        }
        var mode = FS.getMode(canRead, canWrite);
        var node = FS.create(path, mode);
        if (data) {
          if (typeof data == "string") {
            var arr = new Array(data.length);
            for (var i = 0, len = data.length; i < len; ++i)
              arr[i] = data.charCodeAt(i);
            data = arr;
          }
          FS.chmod(node, mode | 146);
          var stream = FS.open(node, 577);
          FS.write(stream, data, 0, data.length, 0, canOwn);
          FS.close(stream);
          FS.chmod(node, mode);
        }
        return node;
      },
      createDevice: (parent, name, input, output) => {
        var path = PATH.join2(
          typeof parent == "string" ? parent : FS.getPath(parent),
          name
        );
        var mode = FS.getMode(!!input, !!output);
        if (!FS.createDevice.major) FS.createDevice.major = 64;
        var dev = FS.makedev(FS.createDevice.major++, 0);
        FS.registerDevice(dev, {
          open: (stream) => {
            stream.seekable = false;
          },
          close: (stream) => {
            if (output && output.buffer && output.buffer.length) {
              output(10);
            }
          },
          read: (stream, buffer2, offset, length, pos) => {
            var bytesRead = 0;
            for (var i = 0; i < length; i++) {
              var result;
              try {
                result = input();
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
              if (result === void 0 && bytesRead === 0) {
                throw new FS.ErrnoError(6);
              }
              if (result === null || result === void 0) break;
              bytesRead++;
              buffer2[offset + i] = result;
            }
            if (bytesRead) {
              stream.node.timestamp = Date.now();
            }
            return bytesRead;
          },
          write: (stream, buffer2, offset, length, pos) => {
            for (var i = 0; i < length; i++) {
              try {
                output(buffer2[offset + i]);
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
            }
            if (length) {
              stream.node.timestamp = Date.now();
            }
            return i;
          }
        });
        return FS.mkdev(path, mode, dev);
      },
      forceLoadFile: (obj) => {
        if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
        if (typeof XMLHttpRequest != "undefined") {
          throw new Error(
            "Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread."
          );
        } else if (read_) {
          try {
            obj.contents = intArrayFromString(read_(obj.url), true);
            obj.usedBytes = obj.contents.length;
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
        } else {
          throw new Error("Cannot load without read() or XMLHttpRequest.");
        }
      },
      createLazyFile: (parent, name, url, canRead, canWrite) => {
        function LazyUint8Array() {
          this.lengthKnown = false;
          this.chunks = [];
        }
        LazyUint8Array.prototype.get = /** @this{Object} */
        function LazyUint8Array_get(idx) {
          if (idx > this.length - 1 || idx < 0) {
            return void 0;
          }
          var chunkOffset = idx % this.chunkSize;
          var chunkNum = idx / this.chunkSize | 0;
          return this.getter(chunkNum)[chunkOffset];
        };
        LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
          this.getter = getter;
        };
        LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
          var xhr = new XMLHttpRequest();
          xhr.open("HEAD", url, false);
          xhr.send(null);
          if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304))
            throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
          var datalength = Number(xhr.getResponseHeader("Content-length"));
          var header;
          var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
          var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
          var chunkSize = 1024 * 1024;
          if (!hasByteServing) chunkSize = datalength;
          var doXHR = (from, to) => {
            if (from > to)
              throw new Error(
                "invalid range (" + from + ", " + to + ") or no bytes requested!"
              );
            if (to > datalength - 1)
              throw new Error(
                "only " + datalength + " bytes available! programmer error!"
              );
            var xhr2 = new XMLHttpRequest();
            xhr2.open("GET", url, false);
            if (datalength !== chunkSize)
              xhr2.setRequestHeader("Range", "bytes=" + from + "-" + to);
            xhr2.responseType = "arraybuffer";
            if (xhr2.overrideMimeType) {
              xhr2.overrideMimeType("text/plain; charset=x-user-defined");
            }
            xhr2.send(null);
            if (!(xhr2.status >= 200 && xhr2.status < 300 || xhr2.status === 304))
              throw new Error(
                "Couldn't load " + url + ". Status: " + xhr2.status
              );
            if (xhr2.response !== void 0) {
              return new Uint8Array(
                /** @type{Array<number>} */
                xhr2.response || []
              );
            }
            return intArrayFromString(xhr2.responseText || "");
          };
          var lazyArray2 = this;
          lazyArray2.setDataGetter((chunkNum) => {
            var start = chunkNum * chunkSize;
            var end = (chunkNum + 1) * chunkSize - 1;
            end = Math.min(end, datalength - 1);
            if (typeof lazyArray2.chunks[chunkNum] == "undefined") {
              lazyArray2.chunks[chunkNum] = doXHR(start, end);
            }
            if (typeof lazyArray2.chunks[chunkNum] == "undefined")
              throw new Error("doXHR failed!");
            return lazyArray2.chunks[chunkNum];
          });
          if (usesGzip || !datalength) {
            chunkSize = datalength = 1;
            datalength = this.getter(0).length;
            chunkSize = datalength;
            out(
              "LazyFiles on gzip forces download of the whole file when length is accessed"
            );
          }
          this._length = datalength;
          this._chunkSize = chunkSize;
          this.lengthKnown = true;
        };
        if (typeof XMLHttpRequest != "undefined") {
          if (!ENVIRONMENT_IS_WORKER)
            throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
          var lazyArray = new LazyUint8Array();
          Object.defineProperties(lazyArray, {
            length: {
              get: (
                /** @this{Object} */
                function() {
                  if (!this.lengthKnown) {
                    this.cacheLength();
                  }
                  return this._length;
                }
              )
            },
            chunkSize: {
              get: (
                /** @this{Object} */
                function() {
                  if (!this.lengthKnown) {
                    this.cacheLength();
                  }
                  return this._chunkSize;
                }
              )
            }
          });
          var properties = { isDevice: false, contents: lazyArray };
        } else {
          var properties = { isDevice: false, url };
        }
        var node = FS.createFile(parent, name, properties, canRead, canWrite);
        if (properties.contents) {
          node.contents = properties.contents;
        } else if (properties.url) {
          node.contents = null;
          node.url = properties.url;
        }
        Object.defineProperties(node, {
          usedBytes: {
            get: (
              /** @this {FSNode} */
              function() {
                return this.contents.length;
              }
            )
          }
        });
        var stream_ops = {};
        var keys = Object.keys(node.stream_ops);
        keys.forEach((key) => {
          var fn = node.stream_ops[key];
          stream_ops[key] = function forceLoadLazyFile() {
            FS.forceLoadFile(node);
            return fn.apply(null, arguments);
          };
        });
        function writeChunks(stream, buffer2, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= contents.length) return 0;
          var size = Math.min(contents.length - position, length);
          assert(size >= 0);
          if (contents.slice) {
            for (var i = 0; i < size; i++) {
              buffer2[offset + i] = contents[position + i];
            }
          } else {
            for (var i = 0; i < size; i++) {
              buffer2[offset + i] = contents.get(position + i);
            }
          }
          return size;
        }
        stream_ops.read = (stream, buffer2, offset, length, position) => {
          FS.forceLoadFile(node);
          return writeChunks(stream, buffer2, offset, length, position);
        };
        stream_ops.mmap = (stream, length, position, prot, flags) => {
          FS.forceLoadFile(node);
          var ptr = mmapAlloc();
          if (!ptr) {
            throw new FS.ErrnoError(48);
          }
          writeChunks(stream, HEAP8, ptr, length, position);
          return { ptr, allocated: true };
        };
        node.stream_ops = stream_ops;
        return node;
      },
      createPreloadedFile: (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) => {
        var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
        var dep = getUniqueRunDependency("cp " + fullname);
        function processData(byteArray) {
          function finish(byteArray2) {
            if (preFinish) preFinish();
            if (!dontCreateFile) {
              FS.createDataFile(
                parent,
                name,
                byteArray2,
                canRead,
                canWrite,
                canOwn
              );
            }
            if (onload) onload();
            removeRunDependency(dep);
          }
          if (Browser.handledByPreloadPlugin(byteArray, fullname, finish, () => {
            if (onerror) onerror();
            removeRunDependency(dep);
          })) {
            return;
          }
          finish(byteArray);
        }
        addRunDependency(dep);
        if (typeof url == "string") {
          asyncLoad(url, (byteArray) => processData(byteArray), onerror);
        } else {
          processData(url);
        }
      },
      indexedDB: () => {
        return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
      },
      DB_NAME: () => {
        return "EM_FS_" + window.location.pathname;
      },
      DB_VERSION: 20,
      DB_STORE_NAME: "FILE_DATA",
      saveFilesToDB: (paths, onload, onerror) => {
        onload = onload || (() => {
        });
        onerror = onerror || (() => {
        });
        var indexedDB = FS.indexedDB();
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = () => {
          out("creating db");
          var db = openRequest.result;
          db.createObjectStore(FS.DB_STORE_NAME);
        };
        openRequest.onsuccess = () => {
          var db = openRequest.result;
          var transaction = db.transaction([FS.DB_STORE_NAME], "readwrite");
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0, fail = 0, total = paths.length;
          function finish() {
            if (fail == 0) onload();
            else onerror();
          }
          paths.forEach((path) => {
            var putRequest = files.put(FS.analyzePath(path).object.contents, path);
            putRequest.onsuccess = () => {
              ok++;
              if (ok + fail == total) finish();
            };
            putRequest.onerror = () => {
              fail++;
              if (ok + fail == total) finish();
            };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      },
      loadFilesFromDB: (paths, onload, onerror) => {
        onload = onload || (() => {
        });
        onerror = onerror || (() => {
        });
        var indexedDB = FS.indexedDB();
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = onerror;
        openRequest.onsuccess = () => {
          var db = openRequest.result;
          try {
            var transaction = db.transaction([FS.DB_STORE_NAME], "readonly");
          } catch (e) {
            onerror(e);
            return;
          }
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0, fail = 0, total = paths.length;
          function finish() {
            if (fail == 0) onload();
            else onerror();
          }
          paths.forEach((path) => {
            var getRequest = files.get(path);
            getRequest.onsuccess = () => {
              if (FS.analyzePath(path).exists) {
                FS.unlink(path);
              }
              FS.createDataFile(
                PATH.dirname(path),
                PATH.basename(path),
                getRequest.result,
                true,
                true,
                true
              );
              ok++;
              if (ok + fail == total) finish();
            };
            getRequest.onerror = () => {
              fail++;
              if (ok + fail == total) finish();
            };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      },
      absolutePath: () => {
        abort("FS.absolutePath has been removed; use PATH_FS.resolve instead");
      },
      createFolder: () => {
        abort("FS.createFolder has been removed; use FS.mkdir instead");
      },
      createLink: () => {
        abort("FS.createLink has been removed; use FS.symlink instead");
      },
      joinPath: () => {
        abort("FS.joinPath has been removed; use PATH.join instead");
      },
      mmapAlloc: () => {
        abort(
          "FS.mmapAlloc has been replaced by the top level function mmapAlloc"
        );
      },
      standardizePath: () => {
        abort("FS.standardizePath has been removed; use PATH.normalize instead");
      }
    };
    var SYSCALLS = {
      DEFAULT_POLLMASK: 5,
      calculateAt: function(dirfd, path, allowEmpty) {
        if (PATH.isAbs(path)) {
          return path;
        }
        var dir;
        if (dirfd === -100) {
          dir = FS.cwd();
        } else {
          var dirstream = SYSCALLS.getStreamFromFD(dirfd);
          dir = dirstream.path;
        }
        if (path.length == 0) {
          if (!allowEmpty) {
            throw new FS.ErrnoError(44);
          }
          return dir;
        }
        return PATH.join2(dir, path);
      },
      doStat: function(func, path, buf) {
        try {
          var stat = func(path);
        } catch (e) {
          if (e && e.node && PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))) {
            return -54;
          }
          throw e;
        }
        HEAP32[buf >> 2] = stat.dev;
        HEAP32[buf + 8 >> 2] = stat.ino;
        HEAP32[buf + 12 >> 2] = stat.mode;
        HEAPU32[buf + 16 >> 2] = stat.nlink;
        HEAP32[buf + 20 >> 2] = stat.uid;
        HEAP32[buf + 24 >> 2] = stat.gid;
        HEAP32[buf + 28 >> 2] = stat.rdev;
        tempI64 = [
          stat.size >>> 0,
          (tempDouble = stat.size, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil(
            (tempDouble - +(~~tempDouble >>> 0)) / 4294967296
          ) >>> 0 : 0)
        ], HEAP32[buf + 40 >> 2] = tempI64[0], HEAP32[buf + 44 >> 2] = tempI64[1];
        HEAP32[buf + 48 >> 2] = 4096;
        HEAP32[buf + 52 >> 2] = stat.blocks;
        tempI64 = [
          Math.floor(stat.atime.getTime() / 1e3) >>> 0,
          (tempDouble = Math.floor(stat.atime.getTime() / 1e3), +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil(
            (tempDouble - +(~~tempDouble >>> 0)) / 4294967296
          ) >>> 0 : 0)
        ], HEAP32[buf + 56 >> 2] = tempI64[0], HEAP32[buf + 60 >> 2] = tempI64[1];
        HEAPU32[buf + 64 >> 2] = 0;
        tempI64 = [
          Math.floor(stat.mtime.getTime() / 1e3) >>> 0,
          (tempDouble = Math.floor(stat.mtime.getTime() / 1e3), +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil(
            (tempDouble - +(~~tempDouble >>> 0)) / 4294967296
          ) >>> 0 : 0)
        ], HEAP32[buf + 72 >> 2] = tempI64[0], HEAP32[buf + 76 >> 2] = tempI64[1];
        HEAPU32[buf + 80 >> 2] = 0;
        tempI64 = [
          Math.floor(stat.ctime.getTime() / 1e3) >>> 0,
          (tempDouble = Math.floor(stat.ctime.getTime() / 1e3), +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil(
            (tempDouble - +(~~tempDouble >>> 0)) / 4294967296
          ) >>> 0 : 0)
        ], HEAP32[buf + 88 >> 2] = tempI64[0], HEAP32[buf + 92 >> 2] = tempI64[1];
        HEAPU32[buf + 96 >> 2] = 0;
        tempI64 = [
          stat.ino >>> 0,
          (tempDouble = stat.ino, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil(
            (tempDouble - +(~~tempDouble >>> 0)) / 4294967296
          ) >>> 0 : 0)
        ], HEAP32[buf + 104 >> 2] = tempI64[0], HEAP32[buf + 108 >> 2] = tempI64[1];
        return 0;
      },
      doMsync: function(addr, stream, len, flags, offset) {
        if (!FS.isFile(stream.node.mode)) {
          throw new FS.ErrnoError(43);
        }
        if (flags & 2) {
          return 0;
        }
        var buffer2 = HEAPU8.slice(addr, addr + len);
        FS.msync(stream, buffer2, offset, len, flags);
      },
      varargs: void 0,
      get: function() {
        assert(SYSCALLS.varargs != void 0);
        SYSCALLS.varargs += 4;
        var ret = HEAP32[SYSCALLS.varargs - 4 >> 2];
        return ret;
      },
      getStr: function(ptr) {
        var ret = UTF8ToString(ptr);
        return ret;
      },
      getStreamFromFD: function(fd) {
        var stream = FS.getStream(fd);
        if (!stream) throw new FS.ErrnoError(8);
        return stream;
      }
    };
    function _fd_write(fd, iov, iovcnt, pnum) {
      try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        var num = doWritev(stream, iov, iovcnt);
        HEAPU32[pnum >> 2] = num;
        return 0;
      } catch (e) {
        if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError)) throw e;
        return e.errno;
      }
    }
    function _proc_exit(code) {
      EXITSTATUS = code;
      if (!keepRuntimeAlive()) {
        if (Module["onExit"]) Module["onExit"](code);
        ABORT = true;
      }
      quit_(code, new ExitStatus(code));
    }
    function exitJS(status, implicit) {
      EXITSTATUS = status;
      if (!keepRuntimeAlive()) {
        exitRuntime();
      }
      _proc_exit(status);
    }
    function allocateUTF8OnStack(str) {
      var size = lengthBytesUTF8(str) + 1;
      var ret = stackAlloc(size);
      stringToUTF8Array(str, HEAP8, ret, size);
      return ret;
    }
    function getCFunc(ident) {
      var func = Module["_" + ident];
      assert(
        func,
        "Cannot call unknown function " + ident + ", make sure it is exported"
      );
      return func;
    }
    function ccall(ident, returnType, argTypes, args2, opts) {
      var toC = {
        string: (str) => {
          var ret2 = 0;
          if (str !== null && str !== void 0 && str !== 0) {
            var len = (str.length << 2) + 1;
            ret2 = stackAlloc(len);
            stringToUTF8(str, ret2, len);
          }
          return ret2;
        },
        array: (arr) => {
          var ret2 = stackAlloc(arr.length);
          writeArrayToMemory(arr, ret2);
          return ret2;
        }
      };
      function convertReturnValue(ret2) {
        if (returnType === "string") {
          return UTF8ToString(ret2);
        }
        if (returnType === "boolean") return Boolean(ret2);
        return ret2;
      }
      var func = getCFunc(ident);
      var cArgs = [];
      var stack = 0;
      assert(returnType !== "array", 'Return type should not be "array".');
      if (args2) {
        for (var i = 0; i < args2.length; i++) {
          var converter = toC[argTypes[i]];
          if (converter) {
            if (stack === 0) stack = stackSave();
            cArgs[i] = converter(args2[i]);
          } else {
            cArgs[i] = args2[i];
          }
        }
      }
      var ret = func.apply(null, cArgs);
      function onDone(ret2) {
        if (stack !== 0) stackRestore(stack);
        return convertReturnValue(ret2);
      }
      ret = onDone(ret);
      return ret;
    }
    function cwrap(ident, returnType, argTypes, opts) {
      return function() {
        return ccall(ident, returnType, argTypes, arguments);
      };
    }
    var FSNode = (
      /** @constructor */
      function(parent, name, mode, rdev) {
        if (!parent) {
          parent = this;
        }
        this.parent = parent;
        this.mount = parent.mount;
        this.mounted = null;
        this.id = FS.nextInode++;
        this.name = name;
        this.mode = mode;
        this.node_ops = {};
        this.stream_ops = {};
        this.rdev = rdev;
      }
    );
    var readMode = 292 | 73;
    var writeMode = 146;
    Object.defineProperties(FSNode.prototype, {
      read: {
        get: (
          /** @this{FSNode} */
          function() {
            return (this.mode & readMode) === readMode;
          }
        ),
        set: (
          /** @this{FSNode} */
          function(val) {
            val ? this.mode |= readMode : this.mode &= ~readMode;
          }
        )
      },
      write: {
        get: (
          /** @this{FSNode} */
          function() {
            return (this.mode & writeMode) === writeMode;
          }
        ),
        set: (
          /** @this{FSNode} */
          function(val) {
            val ? this.mode |= writeMode : this.mode &= ~writeMode;
          }
        )
      },
      isFolder: {
        get: (
          /** @this{FSNode} */
          function() {
            return FS.isDir(this.mode);
          }
        )
      },
      isDevice: {
        get: (
          /** @this{FSNode} */
          function() {
            return FS.isChrdev(this.mode);
          }
        )
      }
    });
    FS.FSNode = FSNode;
    FS.staticInit();
    Module["FS_createPath"] = FS.createPath;
    Module["FS_createDataFile"] = FS.createDataFile;
    Module["FS_createPreloadedFile"] = FS.createPreloadedFile;
    Module["FS_unlink"] = FS.unlink;
    Module["FS_createLazyFile"] = FS.createLazyFile;
    Module["FS_createDevice"] = FS.createDevice;
    ERRNO_CODES = {
      EPERM: 63,
      ENOENT: 44,
      ESRCH: 71,
      EINTR: 27,
      EIO: 29,
      ENXIO: 60,
      E2BIG: 1,
      ENOEXEC: 45,
      EBADF: 8,
      ECHILD: 12,
      EAGAIN: 6,
      EWOULDBLOCK: 6,
      ENOMEM: 48,
      EACCES: 2,
      EFAULT: 21,
      ENOTBLK: 105,
      EBUSY: 10,
      EEXIST: 20,
      EXDEV: 75,
      ENODEV: 43,
      ENOTDIR: 54,
      EISDIR: 31,
      EINVAL: 28,
      ENFILE: 41,
      EMFILE: 33,
      ENOTTY: 59,
      ETXTBSY: 74,
      EFBIG: 22,
      ENOSPC: 51,
      ESPIPE: 70,
      EROFS: 69,
      EMLINK: 34,
      EPIPE: 64,
      EDOM: 18,
      ERANGE: 68,
      ENOMSG: 49,
      EIDRM: 24,
      ECHRNG: 106,
      EL2NSYNC: 156,
      EL3HLT: 107,
      EL3RST: 108,
      ELNRNG: 109,
      EUNATCH: 110,
      ENOCSI: 111,
      EL2HLT: 112,
      EDEADLK: 16,
      ENOLCK: 46,
      EBADE: 113,
      EBADR: 114,
      EXFULL: 115,
      ENOANO: 104,
      EBADRQC: 103,
      EBADSLT: 102,
      EDEADLOCK: 16,
      EBFONT: 101,
      ENOSTR: 100,
      ENODATA: 116,
      ETIME: 117,
      ENOSR: 118,
      ENONET: 119,
      ENOPKG: 120,
      EREMOTE: 121,
      ENOLINK: 47,
      EADV: 122,
      ESRMNT: 123,
      ECOMM: 124,
      EPROTO: 65,
      EMULTIHOP: 36,
      EDOTDOT: 125,
      EBADMSG: 9,
      ENOTUNIQ: 126,
      EBADFD: 127,
      EREMCHG: 128,
      ELIBACC: 129,
      ELIBBAD: 130,
      ELIBSCN: 131,
      ELIBMAX: 132,
      ELIBEXEC: 133,
      ENOSYS: 52,
      ENOTEMPTY: 55,
      ENAMETOOLONG: 37,
      ELOOP: 32,
      EOPNOTSUPP: 138,
      EPFNOSUPPORT: 139,
      ECONNRESET: 15,
      ENOBUFS: 42,
      EAFNOSUPPORT: 5,
      EPROTOTYPE: 67,
      ENOTSOCK: 57,
      ENOPROTOOPT: 50,
      ESHUTDOWN: 140,
      ECONNREFUSED: 14,
      EADDRINUSE: 3,
      ECONNABORTED: 13,
      ENETUNREACH: 40,
      ENETDOWN: 38,
      ETIMEDOUT: 73,
      EHOSTDOWN: 142,
      EHOSTUNREACH: 23,
      EINPROGRESS: 26,
      EALREADY: 7,
      EDESTADDRREQ: 17,
      EMSGSIZE: 35,
      EPROTONOSUPPORT: 66,
      ESOCKTNOSUPPORT: 137,
      EADDRNOTAVAIL: 4,
      ENETRESET: 39,
      EISCONN: 30,
      ENOTCONN: 53,
      ETOOMANYREFS: 141,
      EUSERS: 136,
      EDQUOT: 19,
      ESTALE: 72,
      ENOTSUP: 138,
      ENOMEDIUM: 148,
      EILSEQ: 25,
      EOVERFLOW: 61,
      ECANCELED: 11,
      ENOTRECOVERABLE: 56,
      EOWNERDEAD: 62,
      ESTRPIPE: 135
    };
    function checkIncomingModuleAPI() {
      ignoredModuleProp("fetchSettings");
    }
    var asmLibraryArg = {
      emscripten_memcpy_big: _emscripten_memcpy_big,
      emscripten_resize_heap: _emscripten_resize_heap,
      fd_write: _fd_write
    };
    createWasm();
    Module["___wasm_call_ctors"] = createExportWrapper("__wasm_call_ctors");
    Module["_main"] = createExportWrapper("__main_argc_argv");
    Module["_free"] = createExportWrapper("free");
    Module["___errno_location"] = createExportWrapper("__errno_location");
    var ___funcs_on_exit = Module["___funcs_on_exit"] = createExportWrapper("__funcs_on_exit");
    var _fflush = Module["_fflush"] = createExportWrapper("fflush");
    Module["_malloc"] = createExportWrapper("malloc");
    var _emscripten_stack_init = Module["_emscripten_stack_init"] = function() {
      return (_emscripten_stack_init = Module["_emscripten_stack_init"] = Module["asm"]["emscripten_stack_init"]).apply(null, arguments);
    };
    Module["_emscripten_stack_get_free"] = function() {
      return (Module["_emscripten_stack_get_free"] = Module["asm"]["emscripten_stack_get_free"]).apply(null, arguments);
    };
    Module["_emscripten_stack_get_base"] = function() {
      return (Module["_emscripten_stack_get_base"] = Module["asm"]["emscripten_stack_get_base"]).apply(null, arguments);
    };
    var _emscripten_stack_get_end = Module["_emscripten_stack_get_end"] = function() {
      return (_emscripten_stack_get_end = Module["_emscripten_stack_get_end"] = Module["asm"]["emscripten_stack_get_end"]).apply(null, arguments);
    };
    var stackSave = Module["stackSave"] = createExportWrapper("stackSave");
    var stackRestore = Module["stackRestore"] = createExportWrapper("stackRestore");
    var stackAlloc = Module["stackAlloc"] = createExportWrapper("stackAlloc");
    Module["dynCall_jiji"] = createExportWrapper("dynCall_jiji");
    Module["addRunDependency"] = addRunDependency;
    Module["removeRunDependency"] = removeRunDependency;
    Module["FS_createPath"] = FS.createPath;
    Module["FS_createDataFile"] = FS.createDataFile;
    Module["FS_createPreloadedFile"] = FS.createPreloadedFile;
    Module["FS_createLazyFile"] = FS.createLazyFile;
    Module["FS_createDevice"] = FS.createDevice;
    Module["FS_unlink"] = FS.unlink;
    Module["ccall"] = ccall;
    Module["cwrap"] = cwrap;
    var unexportedRuntimeSymbols = [
      "run",
      "UTF8ArrayToString",
      "UTF8ToString",
      "stringToUTF8Array",
      "stringToUTF8",
      "lengthBytesUTF8",
      "addOnPreRun",
      "addOnInit",
      "addOnPreMain",
      "addOnExit",
      "addOnPostRun",
      "FS_createFolder",
      "FS_createLink",
      "getLEB",
      "getFunctionTables",
      "alignFunctionTables",
      "registerFunctions",
      "prettyPrint",
      "getCompilerSetting",
      "print",
      "printErr",
      "callMain",
      "abort",
      "keepRuntimeAlive",
      "wasmMemory",
      "stackAlloc",
      "stackSave",
      "stackRestore",
      "getTempRet0",
      "setTempRet0",
      "writeStackCookie",
      "checkStackCookie",
      "ptrToString",
      "zeroMemory",
      "stringToNewUTF8",
      "exitJS",
      "getHeapMax",
      "emscripten_realloc_buffer",
      "ENV",
      "ERRNO_CODES",
      "ERRNO_MESSAGES",
      "setErrNo",
      "inetPton4",
      "inetNtop4",
      "inetPton6",
      "inetNtop6",
      "readSockaddr",
      "writeSockaddr",
      "DNS",
      "getHostByName",
      "Protocols",
      "Sockets",
      "getRandomDevice",
      "warnOnce",
      "traverseStack",
      "UNWIND_CACHE",
      "convertPCtoSourceLocation",
      "readAsmConstArgsArray",
      "readAsmConstArgs",
      "mainThreadEM_ASM",
      "jstoi_q",
      "jstoi_s",
      "getExecutableName",
      "listenOnce",
      "autoResumeAudioContext",
      "dynCallLegacy",
      "getDynCaller",
      "dynCall",
      "handleException",
      "runtimeKeepalivePush",
      "runtimeKeepalivePop",
      "callUserCallback",
      "maybeExit",
      "safeSetTimeout",
      "asmjsMangle",
      "asyncLoad",
      "alignMemory",
      "mmapAlloc",
      "writeI53ToI64",
      "writeI53ToI64Clamped",
      "writeI53ToI64Signaling",
      "writeI53ToU64Clamped",
      "writeI53ToU64Signaling",
      "readI53FromI64",
      "readI53FromU64",
      "convertI32PairToI53",
      "convertI32PairToI53Checked",
      "convertU32PairToI53",
      "getCFunc",
      "uleb128Encode",
      "sigToWasmTypes",
      "generateFuncType",
      "convertJsFunctionToWasm",
      "freeTableIndexes",
      "functionsInTableMap",
      "getEmptyTableSlot",
      "updateTableMap",
      "addFunction",
      "removeFunction",
      "reallyNegative",
      "unSign",
      "strLen",
      "reSign",
      "formatString",
      "setValue",
      "getValue",
      "PATH",
      "PATH_FS",
      "intArrayFromString",
      "intArrayToString",
      "AsciiToString",
      "stringToAscii",
      "UTF16Decoder",
      "UTF16ToString",
      "stringToUTF16",
      "lengthBytesUTF16",
      "UTF32ToString",
      "stringToUTF32",
      "lengthBytesUTF32",
      "allocateUTF8",
      "allocateUTF8OnStack",
      "writeStringToMemory",
      "writeArrayToMemory",
      "writeAsciiToMemory",
      "SYSCALLS",
      "getSocketFromFD",
      "getSocketAddress",
      "JSEvents",
      "registerKeyEventCallback",
      "specialHTMLTargets",
      "maybeCStringToJsString",
      "findEventTarget",
      "findCanvasEventTarget",
      "getBoundingClientRect",
      "fillMouseEventData",
      "registerMouseEventCallback",
      "registerWheelEventCallback",
      "registerUiEventCallback",
      "registerFocusEventCallback",
      "fillDeviceOrientationEventData",
      "registerDeviceOrientationEventCallback",
      "fillDeviceMotionEventData",
      "registerDeviceMotionEventCallback",
      "screenOrientation",
      "fillOrientationChangeEventData",
      "registerOrientationChangeEventCallback",
      "fillFullscreenChangeEventData",
      "registerFullscreenChangeEventCallback",
      "JSEvents_requestFullscreen",
      "JSEvents_resizeCanvasForFullscreen",
      "registerRestoreOldStyle",
      "hideEverythingExceptGivenElement",
      "restoreHiddenElements",
      "setLetterbox",
      "currentFullscreenStrategy",
      "restoreOldWindowedStyle",
      "softFullscreenResizeWebGLRenderTarget",
      "doRequestFullscreen",
      "fillPointerlockChangeEventData",
      "registerPointerlockChangeEventCallback",
      "registerPointerlockErrorEventCallback",
      "requestPointerLock",
      "fillVisibilityChangeEventData",
      "registerVisibilityChangeEventCallback",
      "registerTouchEventCallback",
      "fillGamepadEventData",
      "registerGamepadEventCallback",
      "registerBeforeUnloadEventCallback",
      "fillBatteryEventData",
      "battery",
      "registerBatteryEventCallback",
      "setCanvasElementSize",
      "getCanvasElementSize",
      "demangle",
      "demangleAll",
      "jsStackTrace",
      "stackTrace",
      "ExitStatus",
      "getEnvStrings",
      "checkWasiClock",
      "doReadv",
      "doWritev",
      "dlopenMissingError",
      "createDyncallWrapper",
      "setImmediateWrapped",
      "clearImmediateWrapped",
      "polyfillSetImmediate",
      "uncaughtExceptionCount",
      "exceptionLast",
      "exceptionCaught",
      "ExceptionInfo",
      "exception_addRef",
      "exception_decRef",
      "Browser",
      "setMainLoop",
      "wget",
      "FS",
      "MEMFS",
      "TTY",
      "PIPEFS",
      "SOCKFS",
      "_setNetworkCallback",
      "tempFixedLengthArray",
      "miniTempWebGLFloatBuffers",
      "heapObjectForWebGLType",
      "heapAccessShiftForWebGLHeap",
      "GL",
      "emscriptenWebGLGet",
      "computeUnpackAlignedImageSize",
      "emscriptenWebGLGetTexPixelData",
      "emscriptenWebGLGetUniform",
      "webglGetUniformLocation",
      "webglPrepareUniformLocationsBeforeFirstUse",
      "webglGetLeftBracePos",
      "emscriptenWebGLGetVertexAttrib",
      "writeGLArray",
      "AL",
      "SDL_unicode",
      "SDL_ttfContext",
      "SDL_audio",
      "SDL",
      "SDL_gfx",
      "GLUT",
      "EGL",
      "GLFW_Window",
      "GLFW",
      "GLEW",
      "IDBStore",
      "runAndAbortIfError",
      "ALLOC_NORMAL",
      "ALLOC_STACK",
      "allocate"
    ];
    unexportedRuntimeSymbols.forEach(unexportedRuntimeSymbol);
    var missingLibrarySymbols = [
      "ptrToString",
      "stringToNewUTF8",
      "setErrNo",
      "inetPton4",
      "inetNtop4",
      "inetPton6",
      "inetNtop6",
      "readSockaddr",
      "writeSockaddr",
      "getHostByName",
      "traverseStack",
      "convertPCtoSourceLocation",
      "readAsmConstArgs",
      "mainThreadEM_ASM",
      "jstoi_q",
      "jstoi_s",
      "getExecutableName",
      "listenOnce",
      "autoResumeAudioContext",
      "dynCallLegacy",
      "getDynCaller",
      "dynCall",
      "runtimeKeepalivePush",
      "runtimeKeepalivePop",
      "callUserCallback",
      "maybeExit",
      "safeSetTimeout",
      "asmjsMangle",
      "writeI53ToI64",
      "writeI53ToI64Clamped",
      "writeI53ToI64Signaling",
      "writeI53ToU64Clamped",
      "writeI53ToU64Signaling",
      "readI53FromI64",
      "readI53FromU64",
      "convertI32PairToI53",
      "convertI32PairToI53Checked",
      "convertU32PairToI53",
      "uleb128Encode",
      "sigToWasmTypes",
      "generateFuncType",
      "convertJsFunctionToWasm",
      "getEmptyTableSlot",
      "updateTableMap",
      "addFunction",
      "removeFunction",
      "reallyNegative",
      "unSign",
      "strLen",
      "reSign",
      "formatString",
      "intArrayToString",
      "AsciiToString",
      "stringToAscii",
      "UTF16ToString",
      "stringToUTF16",
      "lengthBytesUTF16",
      "UTF32ToString",
      "stringToUTF32",
      "lengthBytesUTF32",
      "allocateUTF8",
      "writeStringToMemory",
      "writeAsciiToMemory",
      "getSocketFromFD",
      "getSocketAddress",
      "registerKeyEventCallback",
      "maybeCStringToJsString",
      "findEventTarget",
      "findCanvasEventTarget",
      "getBoundingClientRect",
      "fillMouseEventData",
      "registerMouseEventCallback",
      "registerWheelEventCallback",
      "registerUiEventCallback",
      "registerFocusEventCallback",
      "fillDeviceOrientationEventData",
      "registerDeviceOrientationEventCallback",
      "fillDeviceMotionEventData",
      "registerDeviceMotionEventCallback",
      "screenOrientation",
      "fillOrientationChangeEventData",
      "registerOrientationChangeEventCallback",
      "fillFullscreenChangeEventData",
      "registerFullscreenChangeEventCallback",
      "JSEvents_requestFullscreen",
      "JSEvents_resizeCanvasForFullscreen",
      "registerRestoreOldStyle",
      "hideEverythingExceptGivenElement",
      "restoreHiddenElements",
      "setLetterbox",
      "softFullscreenResizeWebGLRenderTarget",
      "doRequestFullscreen",
      "fillPointerlockChangeEventData",
      "registerPointerlockChangeEventCallback",
      "registerPointerlockErrorEventCallback",
      "requestPointerLock",
      "fillVisibilityChangeEventData",
      "registerVisibilityChangeEventCallback",
      "registerTouchEventCallback",
      "fillGamepadEventData",
      "registerGamepadEventCallback",
      "registerBeforeUnloadEventCallback",
      "fillBatteryEventData",
      "battery",
      "registerBatteryEventCallback",
      "setCanvasElementSize",
      "getCanvasElementSize",
      "getEnvStrings",
      "checkWasiClock",
      "doReadv",
      "createDyncallWrapper",
      "setImmediateWrapped",
      "clearImmediateWrapped",
      "polyfillSetImmediate",
      "ExceptionInfo",
      "exception_addRef",
      "exception_decRef",
      "setMainLoop",
      "_setNetworkCallback",
      "heapObjectForWebGLType",
      "heapAccessShiftForWebGLHeap",
      "emscriptenWebGLGet",
      "computeUnpackAlignedImageSize",
      "emscriptenWebGLGetTexPixelData",
      "emscriptenWebGLGetUniform",
      "webglGetUniformLocation",
      "webglPrepareUniformLocationsBeforeFirstUse",
      "webglGetLeftBracePos",
      "emscriptenWebGLGetVertexAttrib",
      "writeGLArray",
      "SDL_unicode",
      "SDL_ttfContext",
      "SDL_audio",
      "GLFW_Window",
      "runAndAbortIfError",
      "ALLOC_NORMAL",
      "ALLOC_STACK",
      "allocate"
    ];
    missingLibrarySymbols.forEach(missingLibrarySymbol);
    var calledRun;
    dependenciesFulfilled = function runCaller() {
      if (!calledRun) run();
      if (!calledRun) dependenciesFulfilled = runCaller;
    };
    function callMain(args2) {
      assert(
        runDependencies == 0,
        'cannot call main when async dependencies remain! (listen on Module["onRuntimeInitialized"])'
      );
      assert(
        __ATPRERUN__.length == 0,
        "cannot call main when preRun functions remain to be called"
      );
      var entryFunction = Module["_main"];
      args2 = args2 || [];
      args2.unshift(thisProgram);
      var argc = args2.length;
      var argv = stackAlloc((argc + 1) * 4);
      var argv_ptr = argv >> 2;
      args2.forEach((arg) => {
        HEAP32[argv_ptr++] = allocateUTF8OnStack(arg);
      });
      HEAP32[argv_ptr] = 0;
      try {
        var ret = entryFunction(argc, argv);
        exitJS(
          ret,
          /* implicit = */
          true
        );
        return ret;
      } catch (e) {
        return handleException(e);
      }
    }
    function stackCheckInit() {
      _emscripten_stack_init();
      writeStackCookie();
    }
    function run(args2) {
      args2 = args2 || arguments_;
      if (runDependencies > 0) {
        return;
      }
      stackCheckInit();
      preRun();
      if (runDependencies > 0) {
        return;
      }
      function doRun() {
        if (calledRun) return;
        calledRun = true;
        Module["calledRun"] = true;
        if (ABORT) return;
        initRuntime();
        preMain();
        if (Module["onRuntimeInitialized"]) Module["onRuntimeInitialized"]();
        if (shouldRunNow) callMain(args2);
        postRun();
      }
      if (Module["setStatus"]) {
        Module["setStatus"]("Running...");
        setTimeout(function() {
          setTimeout(function() {
            Module["setStatus"]("");
          }, 1);
          doRun();
        }, 1);
      } else {
        doRun();
      }
      checkStackCookie();
    }
    if (Module["preInit"]) {
      if (typeof Module["preInit"] == "function")
        Module["preInit"] = [Module["preInit"]];
      while (Module["preInit"].length > 0) {
        Module["preInit"].pop()();
      }
    }
    var shouldRunNow = true;
    if (Module["noInitialRun"]) shouldRunNow = false;
    run();
  }
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWZrZXktd29ya2VyLURfQk5PRkluLmpzIiwic291cmNlcyI6WyIuLi9zcmMvZW50aXRpZXMvTmZjL2xpYi9tZmtleS13b3JrZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgKi9cbmxldCBhcmdzID0gW11cbm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICBzd2l0Y2ggKGV2ZW50LmRhdGEub3BlcmF0aW9uKSB7XG4gICAgY2FzZSAnc3RhcnQnOlxuICAgICAgYXJncyA9IGV2ZW50LmRhdGEuZGF0YVxuICAgICAgbWFpbigpXG4gICAgICBicmVha1xuICB9XG59XG5cbmZ1bmN0aW9uIG1haW4oKSB7XG4gIC8vIFRoZSBNb2R1bGUgb2JqZWN0OiBPdXIgaW50ZXJmYWNlIHRvIHRoZSBvdXRzaWRlIHdvcmxkLiBXZSBpbXBvcnRcbiAgLy8gYW5kIGV4cG9ydCB2YWx1ZXMgb24gaXQuIFRoZXJlIGFyZSB2YXJpb3VzIHdheXMgTW9kdWxlIGNhbiBiZSB1c2VkOlxuICAvLyAxLiBOb3QgZGVmaW5lZC4gV2UgY3JlYXRlIGl0IGhlcmVcbiAgLy8gMi4gQSBmdW5jdGlvbiBwYXJhbWV0ZXIsIGZ1bmN0aW9uKE1vZHVsZSkgeyAuLmdlbmVyYXRlZCBjb2RlLi4gfVxuICAvLyAzLiBwcmUtcnVuIGFwcGVuZGVkIGl0LCB2YXIgTW9kdWxlID0ge307IC4uZ2VuZXJhdGVkIGNvZGUuLlxuICAvLyA0LiBFeHRlcm5hbCBzY3JpcHQgdGFnIGRlZmluZXMgdmFyIE1vZHVsZS5cbiAgLy8gV2UgbmVlZCB0byBjaGVjayBpZiBNb2R1bGUgYWxyZWFkeSBleGlzdHMgKGUuZy4gY2FzZSAzIGFib3ZlKS5cbiAgLy8gU3Vic3RpdHV0aW9uIHdpbGwgYmUgcmVwbGFjZWQgd2l0aCBhY3R1YWwgY29kZSBvbiBsYXRlciBzdGFnZSBvZiB0aGUgYnVpbGQsXG4gIC8vIHRoaXMgd2F5IENsb3N1cmUgQ29tcGlsZXIgd2lsbCBub3QgbWFuZ2xlIGl0IChlLmcuIGNhc2UgNC4gYWJvdmUpLlxuICAvLyBOb3RlIHRoYXQgaWYgeW91IHdhbnQgdG8gcnVuIGNsb3N1cmUsIGFuZCBhbHNvIHRvIHVzZSBNb2R1bGVcbiAgLy8gYWZ0ZXIgdGhlIGdlbmVyYXRlZCBjb2RlLCB5b3Ugd2lsbCBuZWVkIHRvIGRlZmluZSAgIHZhciBNb2R1bGUgPSB7fTtcbiAgLy8gYmVmb3JlIHRoZSBjb2RlLiBUaGVuIHRoYXQgb2JqZWN0IHdpbGwgYmUgdXNlZCBpbiB0aGUgY29kZSwgYW5kIHlvdVxuICAvLyBjYW4gY29udGludWUgdG8gdXNlIE1vZHVsZSBhZnRlcndhcmRzIGFzIHdlbGwuXG4gIHZhciBNb2R1bGUgPSB0eXBlb2YgTW9kdWxlICE9ICd1bmRlZmluZWQnID8gTW9kdWxlIDoge31cblxuICAvLyBTZWUgaHR0cHM6Ly9jYW5pdXNlLmNvbS9tZG4tamF2YXNjcmlwdF9idWlsdGluc19vYmplY3RfYXNzaWduXG5cbiAgLy8gU2VlIGh0dHBzOi8vY2FuaXVzZS5jb20vbWRuLWphdmFzY3JpcHRfYnVpbHRpbnNfYmlnaW50NjRhcnJheVxuXG4gIC8vIC0tcHJlLWpzZXMgYXJlIGVtaXR0ZWQgYWZ0ZXIgdGhlIE1vZHVsZSBpbnRlZ3JhdGlvbiBjb2RlLCBzbyB0aGF0IHRoZXkgY2FuXG4gIC8vIHJlZmVyIHRvIE1vZHVsZSAoaWYgdGhleSBjaG9vc2U7IHRoZXkgY2FuIGFsc28gZGVmaW5lIE1vZHVsZSlcbiAgLy8ge3tQUkVfSlNFU319XG5cbiAgLy8gU29tZXRpbWVzIGFuIGV4aXN0aW5nIE1vZHVsZSBvYmplY3QgZXhpc3RzIHdpdGggcHJvcGVydGllc1xuICAvLyBtZWFudCB0byBvdmVyd3JpdGUgdGhlIGRlZmF1bHQgbW9kdWxlIGZ1bmN0aW9uYWxpdHkuIEhlcmVcbiAgLy8gd2UgY29sbGVjdCB0aG9zZSBwcm9wZXJ0aWVzIGFuZCByZWFwcGx5IF9hZnRlcl8gd2UgY29uZmlndXJlXG4gIC8vIHRoZSBjdXJyZW50IGVudmlyb25tZW50J3MgZGVmYXVsdHMgdG8gYXZvaWQgaGF2aW5nIHRvIGJlIHNvXG4gIC8vIGRlZmVuc2l2ZSBkdXJpbmcgaW5pdGlhbGl6YXRpb24uXG4gIHZhciBtb2R1bGVPdmVycmlkZXMgPSBPYmplY3QuYXNzaWduKHt9LCBNb2R1bGUpXG5cbiAgdmFyIGFyZ3VtZW50c18gPSBhcmdzXG4gIHZhciB0aGlzUHJvZ3JhbSA9ICcuL3RoaXMucHJvZ3JhbSdcbiAgdmFyIHF1aXRfID0gKHN0YXR1cywgdG9UaHJvdykgPT4ge1xuICAgIHRocm93IHRvVGhyb3dcbiAgfVxuXG4gIC8vIERldGVybWluZSB0aGUgcnVudGltZSBlbnZpcm9ubWVudCB3ZSBhcmUgaW4uIFlvdSBjYW4gY3VzdG9taXplIHRoaXMgYnlcbiAgLy8gc2V0dGluZyB0aGUgRU5WSVJPTk1FTlQgc2V0dGluZyBhdCBjb21waWxlIHRpbWUgKHNlZSBzZXR0aW5ncy5qcykuXG5cbiAgLy8gQXR0ZW1wdCB0byBhdXRvLWRldGVjdCB0aGUgZW52aXJvbm1lbnRcbiAgdmFyIEVOVklST05NRU5UX0lTX1dFQiA9IHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCdcbiAgdmFyIEVOVklST05NRU5UX0lTX1dPUktFUiA9IHR5cGVvZiBpbXBvcnRTY3JpcHRzID09ICdmdW5jdGlvbidcbiAgLy8gTi5iLiBFbGVjdHJvbi5qcyBlbnZpcm9ubWVudCBpcyBzaW11bHRhbmVvdXNseSBhIE5PREUtZW52aXJvbm1lbnQsIGJ1dFxuICAvLyBhbHNvIGEgd2ViIGVudmlyb25tZW50LlxuICB2YXIgRU5WSVJPTk1FTlRfSVNfTk9ERSA9XG4gICAgdHlwZW9mIHByb2Nlc3MgPT0gJ29iamVjdCcgJiZcbiAgICB0eXBlb2YgcHJvY2Vzcy52ZXJzaW9ucyA9PSAnb2JqZWN0JyAmJlxuICAgIHR5cGVvZiBwcm9jZXNzLnZlcnNpb25zLm5vZGUgPT0gJ3N0cmluZydcbiAgdmFyIEVOVklST05NRU5UX0lTX1NIRUxMID1cbiAgICAhRU5WSVJPTk1FTlRfSVNfV0VCICYmICFFTlZJUk9OTUVOVF9JU19OT0RFICYmICFFTlZJUk9OTUVOVF9JU19XT1JLRVJcblxuICBpZiAoTW9kdWxlWydFTlZJUk9OTUVOVCddKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ01vZHVsZS5FTlZJUk9OTUVOVCBoYXMgYmVlbiBkZXByZWNhdGVkLiBUbyBmb3JjZSB0aGUgZW52aXJvbm1lbnQsIHVzZSB0aGUgRU5WSVJPTk1FTlQgY29tcGlsZS10aW1lIG9wdGlvbiAoZm9yIGV4YW1wbGUsIC1zRU5WSVJPTk1FTlQ9d2ViIG9yIC1zRU5WSVJPTk1FTlQ9bm9kZSknXG4gICAgKVxuICB9XG5cbiAgLy8gYC9gIHNob3VsZCBiZSBwcmVzZW50IGF0IHRoZSBlbmQgaWYgYHNjcmlwdERpcmVjdG9yeWAgaXMgbm90IGVtcHR5XG4gIHZhciBzY3JpcHREaXJlY3RvcnkgPSAnJ1xuICBmdW5jdGlvbiBsb2NhdGVGaWxlKHBhdGgpIHtcbiAgICBpZiAoTW9kdWxlWydsb2NhdGVGaWxlJ10pIHtcbiAgICAgIHJldHVybiBNb2R1bGVbJ2xvY2F0ZUZpbGUnXShwYXRoLCBzY3JpcHREaXJlY3RvcnkpXG4gICAgfVxuICAgIHJldHVybiBzY3JpcHREaXJlY3RvcnkgKyBwYXRoXG4gIH1cblxuICAvLyBIb29rcyB0aGF0IGFyZSBpbXBsZW1lbnRlZCBkaWZmZXJlbnRseSBpbiBkaWZmZXJlbnQgcnVudGltZSBlbnZpcm9ubWVudHMuXG4gIHZhciByZWFkXywgcmVhZEFzeW5jLCByZWFkQmluYXJ5LCBzZXRXaW5kb3dUaXRsZVxuXG4gIC8vIE5vcm1hbGx5IHdlIGRvbid0IGxvZyBleGNlcHRpb25zIGJ1dCBpbnN0ZWFkIGxldCB0aGVtIGJ1YmJsZSBvdXQgdGhlIHRvcFxuICAvLyBsZXZlbCB3aGVyZSB0aGUgZW1iZWRkaW5nIGVudmlyb25tZW50IChlLmcuIHRoZSBicm93c2VyKSBjYW4gaGFuZGxlXG4gIC8vIHRoZW0uXG4gIC8vIEhvd2V2ZXIgdW5kZXIgdjggYW5kIG5vZGUgd2Ugc29tZXRpbWVzIGV4aXQgdGhlIHByb2Nlc3MgZGlyZWNseSBpbiB3aGljaCBjYXNlXG4gIC8vIGl0cyB1cCB0byB1c2UgdXMgdG8gbG9nIHRoZSBleGNlcHRpb24gYmVmb3JlIGV4aXRpbmcuXG4gIC8vIElmIHdlIGZpeCBodHRwczovL2dpdGh1Yi5jb20vZW1zY3JpcHRlbi1jb3JlL2Vtc2NyaXB0ZW4vaXNzdWVzLzE1MDgwXG4gIC8vIHRoaXMgbWF5IG5vIGxvbmdlciBiZSBuZWVkZWQgdW5kZXIgbm9kZS5cbiAgZnVuY3Rpb24gbG9nRXhjZXB0aW9uT25FeGl0KGUpIHtcbiAgICBpZiAoZSBpbnN0YW5jZW9mIEV4aXRTdGF0dXMpIHJldHVyblxuICAgIGxldCB0b0xvZyA9IGVcbiAgICBpZiAoZSAmJiB0eXBlb2YgZSA9PSAnb2JqZWN0JyAmJiBlLnN0YWNrKSB7XG4gICAgICB0b0xvZyA9IFtlLCBlLnN0YWNrXVxuICAgIH1cbiAgICBlcnIoJ2V4aXRpbmcgZHVlIHRvIGV4Y2VwdGlvbjogJyArIHRvTG9nKVxuICB9XG5cbiAgaWYgKEVOVklST05NRU5UX0lTX05PREUpIHtcbiAgICBpZiAoXG4gICAgICB0eXBlb2YgcHJvY2VzcyA9PSAndW5kZWZpbmVkJyB8fFxuICAgICAgIXByb2Nlc3MucmVsZWFzZSB8fFxuICAgICAgcHJvY2Vzcy5yZWxlYXNlLm5hbWUgIT09ICdub2RlJ1xuICAgIClcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ25vdCBjb21waWxlZCBmb3IgdGhpcyBlbnZpcm9ubWVudCAoZGlkIHlvdSBidWlsZCB0byBIVE1MIGFuZCB0cnkgdG8gcnVuIGl0IG5vdCBvbiB0aGUgd2ViLCBvciBzZXQgRU5WSVJPTk1FTlQgdG8gc29tZXRoaW5nIC0gbGlrZSBub2RlIC0gYW5kIHJ1biBpdCBzb21lcGxhY2UgZWxzZSAtIGxpa2Ugb24gdGhlIHdlYj8pJ1xuICAgICAgKVxuICAgIGlmIChFTlZJUk9OTUVOVF9JU19XT1JLRVIpIHtcbiAgICAgIC8vc2NyaXB0RGlyZWN0b3J5ID0gcmVxdWlyZSgncGF0aCcpLmRpcm5hbWUoc2NyaXB0RGlyZWN0b3J5KSArICcvJztcbiAgICB9IGVsc2Uge1xuICAgICAgc2NyaXB0RGlyZWN0b3J5ID0gX19kaXJuYW1lICsgJy8nXG4gICAgfVxuXG4gICAgLy8gaW5jbHVkZTogbm9kZV9zaGVsbF9yZWFkLmpzXG5cbiAgICAvLyBUaGVzZSBtb2R1bGVzIHdpbGwgdXN1YWxseSBiZSB1c2VkIG9uIE5vZGUuanMuIExvYWQgdGhlbSBlYWdlcmx5IHRvIGF2b2lkXG4gICAgLy8gdGhlIGNvbXBsZXhpdHkgb2YgbGF6eS1sb2FkaW5nLiBIb3dldmVyLCBmb3Igbm93IHdlIG11c3QgZ3VhcmQgb24gcmVxdWlyZSgpXG4gICAgLy8gYWN0dWFsbHkgZXhpc3Rpbmc6IGlmIHRoZSBKUyBpcyBwdXQgaW4gYSAubWpzIGZpbGUgKEVTNiBtb2R1bGUpIGFuZCBydW4gb25cbiAgICAvLyBub2RlLCB0aGVuIHdlJ2xsIGRldGVjdCBub2RlIGFzIHRoZSBlbnZpcm9ubWVudCBhbmQgZ2V0IGhlcmUsIGJ1dCByZXF1aXJlKClcbiAgICAvLyBkb2VzIG5vdCBleGlzdCAoc2luY2UgRVM2IG1vZHVsZXMgc2hvdWxkIHVzZSB8aW1wb3J0fCkuIElmIHRoZSBjb2RlIGFjdHVhbGx5XG4gICAgLy8gdXNlcyB0aGUgbm9kZSBmaWxlc3lzdGVtIHRoZW4gaXQgd2lsbCBjcmFzaCwgb2YgY291cnNlLCBidXQgaW4gdGhlIGNhc2Ugb2ZcbiAgICAvLyBjb2RlIHRoYXQgbmV2ZXIgdXNlcyBpdCB3ZSBkb24ndCB3YW50IHRvIGNyYXNoIGhlcmUsIHNvIHRoZSBndWFyZGluZyBpZiBsZXRzXG4gICAgLy8gc3VjaCBjb2RlIHdvcmsgcHJvcGVybHkuIFNlZSBkaXNjdXNzaW9uIGluXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2Vtc2NyaXB0ZW4tY29yZS9lbXNjcmlwdGVuL3B1bGwvMTc4NTFcbiAgICB2YXIgZnMsIG5vZGVQYXRoXG4gICAgaWYgKHR5cGVvZiByZXF1aXJlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG4gICAgICAvLyBub2RlUGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbiAgICB9XG5cbiAgICByZWFkXyA9IChmaWxlbmFtZSwgYmluYXJ5KSA9PiB7XG4gICAgICBmaWxlbmFtZSA9IG5vZGVQYXRoWydub3JtYWxpemUnXShmaWxlbmFtZSlcbiAgICAgIHJldHVybiBmcy5yZWFkRmlsZVN5bmMoZmlsZW5hbWUsIGJpbmFyeSA/IHVuZGVmaW5lZCA6ICd1dGY4JylcbiAgICB9XG5cbiAgICByZWFkQmluYXJ5ID0gKGZpbGVuYW1lKSA9PiB7XG4gICAgICB2YXIgcmV0ID0gcmVhZF8oZmlsZW5hbWUsIHRydWUpXG4gICAgICBpZiAoIXJldC5idWZmZXIpIHtcbiAgICAgICAgcmV0ID0gbmV3IFVpbnQ4QXJyYXkocmV0KVxuICAgICAgfVxuICAgICAgYXNzZXJ0KHJldC5idWZmZXIpXG4gICAgICByZXR1cm4gcmV0XG4gICAgfVxuXG4gICAgcmVhZEFzeW5jID0gKGZpbGVuYW1lLCBvbmxvYWQsIG9uZXJyb3IpID0+IHtcbiAgICAgIGZpbGVuYW1lID0gbm9kZVBhdGhbJ25vcm1hbGl6ZSddKGZpbGVuYW1lKVxuICAgICAgZnMucmVhZEZpbGUoZmlsZW5hbWUsIGZ1bmN0aW9uIChlcnIsIGRhdGEpIHtcbiAgICAgICAgaWYgKGVycikgb25lcnJvcihlcnIpXG4gICAgICAgIGVsc2Ugb25sb2FkKGRhdGEuYnVmZmVyKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICAvLyBlbmQgaW5jbHVkZTogbm9kZV9zaGVsbF9yZWFkLmpzXG4gICAgaWYgKHByb2Nlc3NbJ2FyZ3YnXS5sZW5ndGggPiAxKSB7XG4gICAgICB0aGlzUHJvZ3JhbSA9IHByb2Nlc3NbJ2FyZ3YnXVsxXS5yZXBsYWNlKC9cXFxcL2csICcvJylcbiAgICB9XG5cbiAgICBhcmd1bWVudHNfID0gcHJvY2Vzc1snYXJndiddLnNsaWNlKDIpXG5cbiAgICBpZiAodHlwZW9mIG1vZHVsZSAhPSAndW5kZWZpbmVkJykge1xuICAgICAgbW9kdWxlWydleHBvcnRzJ10gPSBNb2R1bGVcbiAgICB9XG5cbiAgICBwcm9jZXNzWydvbiddKCd1bmNhdWdodEV4Y2VwdGlvbicsIGZ1bmN0aW9uIChleCkge1xuICAgICAgLy8gc3VwcHJlc3MgRXhpdFN0YXR1cyBleGNlcHRpb25zIGZyb20gc2hvd2luZyBhbiBlcnJvclxuICAgICAgaWYgKCEoZXggaW5zdGFuY2VvZiBFeGl0U3RhdHVzKSkge1xuICAgICAgICB0aHJvdyBleFxuICAgICAgfVxuICAgIH0pXG5cbiAgICAvLyBXaXRob3V0IHRoaXMgb2xkZXIgdmVyc2lvbnMgb2Ygbm9kZSAoPCB2MTUpIHdpbGwgbG9nIHVuaGFuZGxlZCByZWplY3Rpb25zXG4gICAgLy8gYnV0IHJldHVybiAwLCB3aGljaCBpcyBub3Qgbm9ybWFsbHkgdGhlIGRlc2lyZWQgYmVoYXZpb3VyLiAgVGhpcyBpc1xuICAgIC8vIG5vdCBiZSBuZWVkZWQgd2l0aCBub2RlIHYxNSBhbmQgYWJvdXQgYmVjYXVzZSBpdCBpcyBub3cgdGhlIGRlZmF1bHRcbiAgICAvLyBiZWhhdmlvdXI6XG4gICAgLy8gU2VlIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvY2xpLmh0bWwjY2xpX3VuaGFuZGxlZF9yZWplY3Rpb25zX21vZGVcbiAgICBwcm9jZXNzWydvbiddKCd1bmhhbmRsZWRSZWplY3Rpb24nLCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICB0aHJvdyByZWFzb25cbiAgICB9KVxuXG4gICAgcXVpdF8gPSAoc3RhdHVzLCB0b1Rocm93KSA9PiB7XG4gICAgICBpZiAoa2VlcFJ1bnRpbWVBbGl2ZSgpKSB7XG4gICAgICAgIHByb2Nlc3NbJ2V4aXRDb2RlJ10gPSBzdGF0dXNcbiAgICAgICAgdGhyb3cgdG9UaHJvd1xuICAgICAgfVxuICAgICAgbG9nRXhjZXB0aW9uT25FeGl0KHRvVGhyb3cpXG4gICAgICBwcm9jZXNzWydleGl0J10oc3RhdHVzKVxuICAgIH1cblxuICAgIE1vZHVsZVsnaW5zcGVjdCddID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuICdbRW1zY3JpcHRlbiBNb2R1bGUgb2JqZWN0XSdcbiAgICB9XG4gIH0gZWxzZSBpZiAoRU5WSVJPTk1FTlRfSVNfU0hFTEwpIHtcbiAgICBpZiAoXG4gICAgICAodHlwZW9mIHByb2Nlc3MgPT0gJ29iamVjdCcgJiYgdHlwZW9mIHJlcXVpcmUgPT09ICdmdW5jdGlvbicpIHx8XG4gICAgICB0eXBlb2Ygd2luZG93ID09ICdvYmplY3QnIHx8XG4gICAgICB0eXBlb2YgaW1wb3J0U2NyaXB0cyA9PSAnZnVuY3Rpb24nXG4gICAgKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnbm90IGNvbXBpbGVkIGZvciB0aGlzIGVudmlyb25tZW50IChkaWQgeW91IGJ1aWxkIHRvIEhUTUwgYW5kIHRyeSB0byBydW4gaXQgbm90IG9uIHRoZSB3ZWIsIG9yIHNldCBFTlZJUk9OTUVOVCB0byBzb21ldGhpbmcgLSBsaWtlIG5vZGUgLSBhbmQgcnVuIGl0IHNvbWVwbGFjZSBlbHNlIC0gbGlrZSBvbiB0aGUgd2ViPyknXG4gICAgICApXG5cbiAgICBpZiAodHlwZW9mIHJlYWQgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJlYWRfID0gZnVuY3Rpb24gc2hlbGxfcmVhZChmKSB7XG4gICAgICAgIHJldHVybiByZWFkKGYpXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmVhZEJpbmFyeSA9IGZ1bmN0aW9uIHJlYWRCaW5hcnkoZikge1xuICAgICAgbGV0IGRhdGFcbiAgICAgIGlmICh0eXBlb2YgcmVhZGJ1ZmZlciA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShyZWFkYnVmZmVyKGYpKVxuICAgICAgfVxuICAgICAgZGF0YSA9IHJlYWQoZiwgJ2JpbmFyeScpXG4gICAgICBhc3NlcnQodHlwZW9mIGRhdGEgPT0gJ29iamVjdCcpXG4gICAgICByZXR1cm4gZGF0YVxuICAgIH1cblxuICAgIHJlYWRBc3luYyA9IGZ1bmN0aW9uIHJlYWRBc3luYyhmLCBvbmxvYWQsIG9uZXJyb3IpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gb25sb2FkKHJlYWRCaW5hcnkoZikpLCAwKVxuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygc2NyaXB0QXJncyAhPSAndW5kZWZpbmVkJykge1xuICAgICAgYXJndW1lbnRzXyA9IHNjcmlwdEFyZ3NcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmd1bWVudHMgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGFyZ3VtZW50c18gPSBhcmd1bWVudHNcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHF1aXQgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcXVpdF8gPSAoc3RhdHVzLCB0b1Rocm93KSA9PiB7XG4gICAgICAgIC8vIFVubGlrZSBub2RlIHdoaWNoIGhhcyBwcm9jZXNzLmV4aXRDb2RlLCBkOCBoYXMgbm8gc3VjaCBtZWNoYW5pc20uIFNvIHdlXG4gICAgICAgIC8vIGhhdmUgbm8gd2F5IHRvIHNldCB0aGUgZXhpdCBjb2RlIGFuZCB0aGVuIGxldCB0aGUgcHJvZ3JhbSBleGl0IHdpdGhcbiAgICAgICAgLy8gdGhhdCBjb2RlIHdoZW4gaXQgbmF0dXJhbGx5IHN0b3BzIHJ1bm5pbmcgKHNheSwgd2hlbiBhbGwgc2V0VGltZW91dHNcbiAgICAgICAgLy8gaGF2ZSBjb21wbGV0ZWQpLiBGb3IgdGhhdCByZWFzb24gd2UgbXVzdCBjYWxsIGBxdWl0YCAtIHRoZSBvbmx5IHdheSB0b1xuICAgICAgICAvLyBzZXQgdGhlIGV4aXQgY29kZSAtIGJ1dCBxdWl0IGFsc28gaGFsdHMgaW1tZWRpYXRlbHksIHNvIHdlIG5lZWQgdG8gYmVcbiAgICAgICAgLy8gY2FyZWZ1bCBvZiB3aGV0aGVyIHRoZSBydW50aW1lIGlzIGFsaXZlIG9yIG5vdCwgd2hpY2ggaXMgd2h5IHRoaXMgY29kZVxuICAgICAgICAvLyBwYXRoIGxvb2tzIGRpZmZlcmVudCB0aGFuIG5vZGUuIEl0IGFsc28gaGFzIHRoZSBkb3duc2lkZSB0aGF0IGl0IHdpbGxcbiAgICAgICAgLy8gaGFsdCB0aGUgZW50aXJlIHByb2dyYW0gd2hlbiBubyBjb2RlIHJlbWFpbnMgdG8gcnVuLCB3aGljaCBtZWFucyB0aGlzXG4gICAgICAgIC8vIGlzIG5vdCBmcmllbmRseSBmb3IgYnVuZGxpbmcgdGhpcyBjb2RlIGludG8gYSBsYXJnZXIgY29kZWJhc2UsIGFuZCBmb3JcbiAgICAgICAgLy8gdGhhdCByZWFzb24gdGhlIFwic2hlbGxcIiBlbnZpcm9ubWVudCBpcyBtYWlubHkgdXNlZnVsIGZvciB0ZXN0aW5nIHdob2xlXG4gICAgICAgIC8vIHByb2dyYW1zIGJ5IHRoZW1zZWx2ZXMsIGJhc2ljYWxseS5cbiAgICAgICAgaWYgKHJ1bnRpbWVLZWVwYWxpdmVDb3VudGVyKSB7XG4gICAgICAgICAgdGhyb3cgdG9UaHJvd1xuICAgICAgICB9XG4gICAgICAgIGxvZ0V4Y2VwdGlvbk9uRXhpdCh0b1Rocm93KVxuICAgICAgICBxdWl0KHN0YXR1cylcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHByaW50ICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBQcmVmZXIgdG8gdXNlIHByaW50L3ByaW50RXJyIHdoZXJlIHRoZXkgZXhpc3QsIGFzIHRoZXkgdXN1YWxseSB3b3JrIGJldHRlci5cbiAgICAgIGlmICh0eXBlb2YgY29uc29sZSA9PSAndW5kZWZpbmVkJykgY29uc29sZSA9IC8qKiBAdHlwZXshQ29uc29sZX0gKi8gKHt9KVxuICAgICAgY29uc29sZS5sb2cgPSAvKiogQHR5cGV7IWZ1bmN0aW9uKHRoaXM6Q29uc29sZSwgLi4uKik6IHVuZGVmaW5lZH0gKi8gKFxuICAgICAgICBwcmludFxuICAgICAgKVxuICAgICAgY29uc29sZS53YXJuID0gY29uc29sZS5lcnJvciA9XG4gICAgICAgIC8qKiBAdHlwZXshZnVuY3Rpb24odGhpczpDb25zb2xlLCAuLi4qKTogdW5kZWZpbmVkfSAqLyAoXG4gICAgICAgICAgdHlwZW9mIHByaW50RXJyICE9ICd1bmRlZmluZWQnID8gcHJpbnRFcnIgOiBwcmludFxuICAgICAgICApXG4gICAgfVxuICB9XG5cbiAgLy8gTm90ZSB0aGF0IHRoaXMgaW5jbHVkZXMgTm9kZS5qcyB3b3JrZXJzIHdoZW4gcmVsZXZhbnQgKHB0aHJlYWRzIGlzIGVuYWJsZWQpLlxuICAvLyBOb2RlLmpzIHdvcmtlcnMgYXJlIGRldGVjdGVkIGFzIGEgY29tYmluYXRpb24gb2YgRU5WSVJPTk1FTlRfSVNfV09SS0VSIGFuZFxuICAvLyBFTlZJUk9OTUVOVF9JU19OT0RFLlxuICBlbHNlIGlmIChFTlZJUk9OTUVOVF9JU19XRUIgfHwgRU5WSVJPTk1FTlRfSVNfV09SS0VSKSB7XG4gICAgaWYgKEVOVklST05NRU5UX0lTX1dPUktFUikge1xuICAgICAgLy8gQ2hlY2sgd29ya2VyLCBub3Qgd2ViLCBzaW5jZSB3aW5kb3cgY291bGQgYmUgcG9seWZpbGxlZFxuICAgICAgc2NyaXB0RGlyZWN0b3J5ID0gc2VsZi5sb2NhdGlvbi5ocmVmXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZG9jdW1lbnQgIT0gJ3VuZGVmaW5lZCcgJiYgZG9jdW1lbnQuY3VycmVudFNjcmlwdCkge1xuICAgICAgLy8gd2ViXG4gICAgICBzY3JpcHREaXJlY3RvcnkgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuICAgIH1cbiAgICAvLyBibG9iIHVybHMgbG9vayBsaWtlIGJsb2I6aHR0cDovL3NpdGUuY29tL2V0Yy9ldGMgYW5kIHdlIGNhbm5vdCBpbmZlciBhbnl0aGluZyBmcm9tIHRoZW0uXG4gICAgLy8gb3RoZXJ3aXNlLCBzbGljZSBvZmYgdGhlIGZpbmFsIHBhcnQgb2YgdGhlIHVybCB0byBmaW5kIHRoZSBzY3JpcHQgZGlyZWN0b3J5LlxuICAgIC8vIGlmIHNjcmlwdERpcmVjdG9yeSBkb2VzIG5vdCBjb250YWluIGEgc2xhc2gsIGxhc3RJbmRleE9mIHdpbGwgcmV0dXJuIC0xLFxuICAgIC8vIGFuZCBzY3JpcHREaXJlY3Rvcnkgd2lsbCBjb3JyZWN0bHkgYmUgcmVwbGFjZWQgd2l0aCBhbiBlbXB0eSBzdHJpbmcuXG4gICAgLy8gSWYgc2NyaXB0RGlyZWN0b3J5IGNvbnRhaW5zIGEgcXVlcnkgKHN0YXJ0aW5nIHdpdGggPykgb3IgYSBmcmFnbWVudCAoc3RhcnRpbmcgd2l0aCAjKSxcbiAgICAvLyB0aGV5IGFyZSByZW1vdmVkIGJlY2F1c2UgdGhleSBjb3VsZCBjb250YWluIGEgc2xhc2guXG4gICAgaWYgKHNjcmlwdERpcmVjdG9yeS5pbmRleE9mKCdibG9iOicpICE9PSAwKSB7XG4gICAgICBzY3JpcHREaXJlY3RvcnkgPSBzY3JpcHREaXJlY3Rvcnkuc3Vic3RyKFxuICAgICAgICAwLFxuICAgICAgICBzY3JpcHREaXJlY3RvcnkucmVwbGFjZSgvWz8jXS4qLywgJycpLmxhc3RJbmRleE9mKCcvJykgKyAxXG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIHNjcmlwdERpcmVjdG9yeSA9ICcnXG4gICAgfVxuXG4gICAgaWYgKCEodHlwZW9mIHdpbmRvdyA9PSAnb2JqZWN0JyB8fCB0eXBlb2YgaW1wb3J0U2NyaXB0cyA9PSAnZnVuY3Rpb24nKSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ25vdCBjb21waWxlZCBmb3IgdGhpcyBlbnZpcm9ubWVudCAoZGlkIHlvdSBidWlsZCB0byBIVE1MIGFuZCB0cnkgdG8gcnVuIGl0IG5vdCBvbiB0aGUgd2ViLCBvciBzZXQgRU5WSVJPTk1FTlQgdG8gc29tZXRoaW5nIC0gbGlrZSBub2RlIC0gYW5kIHJ1biBpdCBzb21lcGxhY2UgZWxzZSAtIGxpa2Ugb24gdGhlIHdlYj8pJ1xuICAgICAgKVxuXG4gICAgLy8gRGlmZmVyZW50aWF0ZSB0aGUgV2ViIFdvcmtlciBmcm9tIHRoZSBOb2RlIFdvcmtlciBjYXNlLCBhcyByZWFkaW5nIG11c3RcbiAgICAvLyBiZSBkb25lIGRpZmZlcmVudGx5LlxuICAgIHtcbiAgICAgIC8vIGluY2x1ZGU6IHdlYl9vcl93b3JrZXJfc2hlbGxfcmVhZC5qc1xuXG4gICAgICByZWFkXyA9ICh1cmwpID0+IHtcbiAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG4gICAgICAgIHhoci5vcGVuKCdHRVQnLCB1cmwsIGZhbHNlKVxuICAgICAgICB4aHIuc2VuZChudWxsKVxuICAgICAgICByZXR1cm4geGhyLnJlc3BvbnNlVGV4dFxuICAgICAgfVxuXG4gICAgICBpZiAoRU5WSVJPTk1FTlRfSVNfV09SS0VSKSB7XG4gICAgICAgIHJlYWRCaW5hcnkgPSAodXJsKSA9PiB7XG4gICAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG4gICAgICAgICAgeGhyLm9wZW4oJ0dFVCcsIHVybCwgZmFsc2UpXG4gICAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdhcnJheWJ1ZmZlcidcbiAgICAgICAgICB4aHIuc2VuZChudWxsKVxuICAgICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheSgvKiogQHR5cGV7IUFycmF5QnVmZmVyfSAqLyAoeGhyLnJlc3BvbnNlKSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZWFkQXN5bmMgPSAodXJsLCBvbmxvYWQsIG9uZXJyb3IpID0+IHtcbiAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG4gICAgICAgIHhoci5vcGVuKCdHRVQnLCB1cmwsIHRydWUpXG4gICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSAnYXJyYXlidWZmZXInXG4gICAgICAgIHhoci5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgaWYgKHhoci5zdGF0dXMgPT0gMjAwIHx8ICh4aHIuc3RhdHVzID09IDAgJiYgeGhyLnJlc3BvbnNlKSkge1xuICAgICAgICAgICAgLy8gZmlsZSBVUkxzIGNhbiByZXR1cm4gMFxuICAgICAgICAgICAgb25sb2FkKHhoci5yZXNwb25zZSlcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cbiAgICAgICAgICBvbmVycm9yKClcbiAgICAgICAgfVxuICAgICAgICB4aHIub25lcnJvciA9IG9uZXJyb3JcbiAgICAgICAgeGhyLnNlbmQobnVsbClcbiAgICAgIH1cblxuICAgICAgLy8gZW5kIGluY2x1ZGU6IHdlYl9vcl93b3JrZXJfc2hlbGxfcmVhZC5qc1xuICAgIH1cblxuICAgIHNldFdpbmRvd1RpdGxlID0gKHRpdGxlKSA9PiAoZG9jdW1lbnQudGl0bGUgPSB0aXRsZSlcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2Vudmlyb25tZW50IGRldGVjdGlvbiBlcnJvcicpXG4gIH1cblxuICB2YXIgb3V0ID0gKHRleHQpID0+IHtcbiAgICAvLyBjb25zb2xlLmxvZyh0ZXh0KVxuICAgIHNlbGYucG9zdE1lc3NhZ2Uoe1xuICAgICAgb3BlcmF0aW9uOiAnb3V0cHV0JyxcbiAgICAgIGRhdGE6IHRleHRcbiAgICB9KVxuICB9XG4gIHZhciBlcnIgPSAodGV4dCkgPT4ge1xuICAgIGNvbnNvbGUud2Fybih0ZXh0KVxuICAgIHNlbGYucG9zdE1lc3NhZ2Uoe1xuICAgICAgb3BlcmF0aW9uOiAnZXJyb3InLFxuICAgICAgZGF0YTogdGV4dFxuICAgIH0pXG4gIH1cblxuICAvLyBNZXJnZSBiYWNrIGluIHRoZSBvdmVycmlkZXNcbiAgT2JqZWN0LmFzc2lnbihNb2R1bGUsIG1vZHVsZU92ZXJyaWRlcylcbiAgLy8gRnJlZSB0aGUgb2JqZWN0IGhpZXJhcmNoeSBjb250YWluZWQgaW4gdGhlIG92ZXJyaWRlcywgdGhpcyBsZXRzIHRoZSBHQ1xuICAvLyByZWNsYWltIGRhdGEgdXNlZCBlLmcuIGluIG1lbW9yeUluaXRpYWxpemVyUmVxdWVzdCwgd2hpY2ggaXMgYSBsYXJnZSB0eXBlZCBhcnJheS5cbiAgbW9kdWxlT3ZlcnJpZGVzID0gbnVsbFxuICBjaGVja0luY29taW5nTW9kdWxlQVBJKClcblxuICAvLyBFbWl0IGNvZGUgdG8gaGFuZGxlIGV4cGVjdGVkIHZhbHVlcyBvbiB0aGUgTW9kdWxlIG9iamVjdC4gVGhpcyBhcHBsaWVzIE1vZHVsZS54XG4gIC8vIHRvIHRoZSBwcm9wZXIgbG9jYWwgeC4gVGhpcyBoYXMgdHdvIGJlbmVmaXRzOiBmaXJzdCwgd2Ugb25seSBlbWl0IGl0IGlmIGl0IGlzXG4gIC8vIGV4cGVjdGVkIHRvIGFycml2ZSwgYW5kIHNlY29uZCwgYnkgdXNpbmcgYSBsb2NhbCBldmVyeXdoZXJlIGVsc2UgdGhhdCBjYW4gYmVcbiAgLy8gbWluaWZpZWQuXG5cbiAgaWYgKE1vZHVsZVsnYXJndW1lbnRzJ10pIGFyZ3VtZW50c18gPSBNb2R1bGVbJ2FyZ3VtZW50cyddXG4gIGxlZ2FjeU1vZHVsZVByb3AoJ2FyZ3VtZW50cycsICdhcmd1bWVudHNfJylcblxuICBpZiAoTW9kdWxlWyd0aGlzUHJvZ3JhbSddKSB0aGlzUHJvZ3JhbSA9IE1vZHVsZVsndGhpc1Byb2dyYW0nXVxuICBsZWdhY3lNb2R1bGVQcm9wKCd0aGlzUHJvZ3JhbScsICd0aGlzUHJvZ3JhbScpXG5cbiAgaWYgKE1vZHVsZVsncXVpdCddKSBxdWl0XyA9IE1vZHVsZVsncXVpdCddXG4gIGxlZ2FjeU1vZHVsZVByb3AoJ3F1aXQnLCAncXVpdF8nKVxuXG4gIC8vIHBlcmZvcm0gYXNzZXJ0aW9ucyBpbiBzaGVsbC5qcyBhZnRlciB3ZSBzZXQgdXAgb3V0KCkgYW5kIGVycigpLCBhcyBvdGhlcndpc2UgaWYgYW4gYXNzZXJ0aW9uIGZhaWxzIGl0IGNhbm5vdCBwcmludCB0aGUgbWVzc2FnZVxuICAvLyBBc3NlcnRpb25zIG9uIHJlbW92ZWQgaW5jb21pbmcgTW9kdWxlIEpTIEFQSXMuXG4gIGFzc2VydChcbiAgICB0eXBlb2YgTW9kdWxlWydtZW1vcnlJbml0aWFsaXplclByZWZpeFVSTCddID09ICd1bmRlZmluZWQnLFxuICAgICdNb2R1bGUubWVtb3J5SW5pdGlhbGl6ZXJQcmVmaXhVUkwgb3B0aW9uIHdhcyByZW1vdmVkLCB1c2UgTW9kdWxlLmxvY2F0ZUZpbGUgaW5zdGVhZCdcbiAgKVxuICBhc3NlcnQoXG4gICAgdHlwZW9mIE1vZHVsZVsncHRocmVhZE1haW5QcmVmaXhVUkwnXSA9PSAndW5kZWZpbmVkJyxcbiAgICAnTW9kdWxlLnB0aHJlYWRNYWluUHJlZml4VVJMIG9wdGlvbiB3YXMgcmVtb3ZlZCwgdXNlIE1vZHVsZS5sb2NhdGVGaWxlIGluc3RlYWQnXG4gIClcbiAgYXNzZXJ0KFxuICAgIHR5cGVvZiBNb2R1bGVbJ2NkSW5pdGlhbGl6ZXJQcmVmaXhVUkwnXSA9PSAndW5kZWZpbmVkJyxcbiAgICAnTW9kdWxlLmNkSW5pdGlhbGl6ZXJQcmVmaXhVUkwgb3B0aW9uIHdhcyByZW1vdmVkLCB1c2UgTW9kdWxlLmxvY2F0ZUZpbGUgaW5zdGVhZCdcbiAgKVxuICBhc3NlcnQoXG4gICAgdHlwZW9mIE1vZHVsZVsnZmlsZVBhY2thZ2VQcmVmaXhVUkwnXSA9PSAndW5kZWZpbmVkJyxcbiAgICAnTW9kdWxlLmZpbGVQYWNrYWdlUHJlZml4VVJMIG9wdGlvbiB3YXMgcmVtb3ZlZCwgdXNlIE1vZHVsZS5sb2NhdGVGaWxlIGluc3RlYWQnXG4gIClcbiAgYXNzZXJ0KFxuICAgIHR5cGVvZiBNb2R1bGVbJ3JlYWQnXSA9PSAndW5kZWZpbmVkJyxcbiAgICAnTW9kdWxlLnJlYWQgb3B0aW9uIHdhcyByZW1vdmVkIChtb2RpZnkgcmVhZF8gaW4gSlMpJ1xuICApXG4gIGFzc2VydChcbiAgICB0eXBlb2YgTW9kdWxlWydyZWFkQXN5bmMnXSA9PSAndW5kZWZpbmVkJyxcbiAgICAnTW9kdWxlLnJlYWRBc3luYyBvcHRpb24gd2FzIHJlbW92ZWQgKG1vZGlmeSByZWFkQXN5bmMgaW4gSlMpJ1xuICApXG4gIGFzc2VydChcbiAgICB0eXBlb2YgTW9kdWxlWydyZWFkQmluYXJ5J10gPT0gJ3VuZGVmaW5lZCcsXG4gICAgJ01vZHVsZS5yZWFkQmluYXJ5IG9wdGlvbiB3YXMgcmVtb3ZlZCAobW9kaWZ5IHJlYWRCaW5hcnkgaW4gSlMpJ1xuICApXG4gIGFzc2VydChcbiAgICB0eXBlb2YgTW9kdWxlWydzZXRXaW5kb3dUaXRsZSddID09ICd1bmRlZmluZWQnLFxuICAgICdNb2R1bGUuc2V0V2luZG93VGl0bGUgb3B0aW9uIHdhcyByZW1vdmVkIChtb2RpZnkgc2V0V2luZG93VGl0bGUgaW4gSlMpJ1xuICApXG4gIGFzc2VydChcbiAgICB0eXBlb2YgTW9kdWxlWydUT1RBTF9NRU1PUlknXSA9PSAndW5kZWZpbmVkJyxcbiAgICAnTW9kdWxlLlRPVEFMX01FTU9SWSBoYXMgYmVlbiByZW5hbWVkIE1vZHVsZS5JTklUSUFMX01FTU9SWSdcbiAgKVxuICBsZWdhY3lNb2R1bGVQcm9wKCdyZWFkJywgJ3JlYWRfJylcbiAgbGVnYWN5TW9kdWxlUHJvcCgncmVhZEFzeW5jJywgJ3JlYWRBc3luYycpXG4gIGxlZ2FjeU1vZHVsZVByb3AoJ3JlYWRCaW5hcnknLCAncmVhZEJpbmFyeScpXG4gIGxlZ2FjeU1vZHVsZVByb3AoJ3NldFdpbmRvd1RpdGxlJywgJ3NldFdpbmRvd1RpdGxlJylcbiAgdmFyIElEQkZTID0gJ0lEQkZTIGlzIG5vIGxvbmdlciBpbmNsdWRlZCBieSBkZWZhdWx0OyBidWlsZCB3aXRoIC1saWRiZnMuanMnXG4gIHZhciBQUk9YWUZTID1cbiAgICAnUFJPWFlGUyBpcyBubyBsb25nZXIgaW5jbHVkZWQgYnkgZGVmYXVsdDsgYnVpbGQgd2l0aCAtbHByb3h5ZnMuanMnXG4gIHZhciBXT1JLRVJGUyA9XG4gICAgJ1dPUktFUkZTIGlzIG5vIGxvbmdlciBpbmNsdWRlZCBieSBkZWZhdWx0OyBidWlsZCB3aXRoIC1sd29ya2VyZnMuanMnXG4gIHZhciBOT0RFRlMgPSAnTk9ERUZTIGlzIG5vIGxvbmdlciBpbmNsdWRlZCBieSBkZWZhdWx0OyBidWlsZCB3aXRoIC1sbm9kZWZzLmpzJ1xuXG4gIGFzc2VydChcbiAgICAhRU5WSVJPTk1FTlRfSVNfU0hFTEwsXG4gICAgXCJzaGVsbCBlbnZpcm9ubWVudCBkZXRlY3RlZCBidXQgbm90IGVuYWJsZWQgYXQgYnVpbGQgdGltZS4gIEFkZCAnc2hlbGwnIHRvIGAtc0VOVklST05NRU5UYCB0byBlbmFibGUuXCJcbiAgKVxuXG4gIHZhciBTVEFDS19BTElHTiA9IDE2XG4gIHZhciBQT0lOVEVSX1NJWkUgPSA0XG5cbiAgZnVuY3Rpb24gZ2V0TmF0aXZlVHlwZVNpemUodHlwZSkge1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnaTEnOlxuICAgICAgY2FzZSAnaTgnOlxuICAgICAgY2FzZSAndTgnOlxuICAgICAgICByZXR1cm4gMVxuICAgICAgY2FzZSAnaTE2JzpcbiAgICAgIGNhc2UgJ3UxNic6XG4gICAgICAgIHJldHVybiAyXG4gICAgICBjYXNlICdpMzInOlxuICAgICAgY2FzZSAndTMyJzpcbiAgICAgICAgcmV0dXJuIDRcbiAgICAgIGNhc2UgJ2k2NCc6XG4gICAgICBjYXNlICd1NjQnOlxuICAgICAgICByZXR1cm4gOFxuICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgICByZXR1cm4gNFxuICAgICAgY2FzZSAnZG91YmxlJzpcbiAgICAgICAgcmV0dXJuIDhcbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgaWYgKHR5cGVbdHlwZS5sZW5ndGggLSAxXSA9PT0gJyonKSB7XG4gICAgICAgICAgcmV0dXJuIFBPSU5URVJfU0laRVxuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlWzBdID09PSAnaScpIHtcbiAgICAgICAgICBjb25zdCBiaXRzID0gTnVtYmVyKHR5cGUuc3Vic3RyKDEpKVxuICAgICAgICAgIGFzc2VydChcbiAgICAgICAgICAgIGJpdHMgJSA4ID09PSAwLFxuICAgICAgICAgICAgJ2dldE5hdGl2ZVR5cGVTaXplIGludmFsaWQgYml0cyAnICsgYml0cyArICcsIHR5cGUgJyArIHR5cGVcbiAgICAgICAgICApXG4gICAgICAgICAgcmV0dXJuIGJpdHMgLyA4XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDBcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBpbmNsdWRlOiBydW50aW1lX2RlYnVnLmpzXG5cbiAgZnVuY3Rpb24gbGVnYWN5TW9kdWxlUHJvcChwcm9wLCBuZXdOYW1lKSB7XG4gICAgaWYgKCFPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE1vZHVsZSwgcHJvcCkpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNb2R1bGUsIHByb3AsIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBhYm9ydChcbiAgICAgICAgICAgICdNb2R1bGUuJyArXG4gICAgICAgICAgICAgIHByb3AgK1xuICAgICAgICAgICAgICAnIGhhcyBiZWVuIHJlcGxhY2VkIHdpdGggcGxhaW4gJyArXG4gICAgICAgICAgICAgIG5ld05hbWUgK1xuICAgICAgICAgICAgICAnICh0aGUgaW5pdGlhbCB2YWx1ZSBjYW4gYmUgcHJvdmlkZWQgb24gTW9kdWxlLCBidXQgYWZ0ZXIgc3RhcnR1cCB0aGUgdmFsdWUgaXMgb25seSBsb29rZWQgZm9yIG9uIGEgbG9jYWwgdmFyaWFibGUgb2YgdGhhdCBuYW1lKSdcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaWdub3JlZE1vZHVsZVByb3AocHJvcCkge1xuICAgIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE1vZHVsZSwgcHJvcCkpIHtcbiAgICAgIGFib3J0KFxuICAgICAgICAnYE1vZHVsZS4nICtcbiAgICAgICAgICBwcm9wICtcbiAgICAgICAgICAnYCB3YXMgc3VwcGxpZWQgYnV0IGAnICtcbiAgICAgICAgICBwcm9wICtcbiAgICAgICAgICAnYCBub3QgaW5jbHVkZWQgaW4gSU5DT01JTkdfTU9EVUxFX0pTX0FQSSdcbiAgICAgIClcbiAgICB9XG4gIH1cblxuICAvLyBmb3JjaW5nIHRoZSBmaWxlc3lzdGVtIGV4cG9ydHMgYSBmZXcgdGhpbmdzIGJ5IGRlZmF1bHRcbiAgZnVuY3Rpb24gaXNFeHBvcnRlZEJ5Rm9yY2VGaWxlc3lzdGVtKG5hbWUpIHtcbiAgICByZXR1cm4gKFxuICAgICAgbmFtZSA9PT0gJ0ZTX2NyZWF0ZVBhdGgnIHx8XG4gICAgICBuYW1lID09PSAnRlNfY3JlYXRlRGF0YUZpbGUnIHx8XG4gICAgICBuYW1lID09PSAnRlNfY3JlYXRlUHJlbG9hZGVkRmlsZScgfHxcbiAgICAgIG5hbWUgPT09ICdGU191bmxpbmsnIHx8XG4gICAgICBuYW1lID09PSAnYWRkUnVuRGVwZW5kZW5jeScgfHxcbiAgICAgIC8vIFRoZSBvbGQgRlMgaGFzIHNvbWUgZnVuY3Rpb25hbGl0eSB0aGF0IFdhc21GUyBsYWNrcy5cbiAgICAgIG5hbWUgPT09ICdGU19jcmVhdGVMYXp5RmlsZScgfHxcbiAgICAgIG5hbWUgPT09ICdGU19jcmVhdGVEZXZpY2UnIHx8XG4gICAgICBuYW1lID09PSAncmVtb3ZlUnVuRGVwZW5kZW5jeSdcbiAgICApXG4gIH1cblxuICBmdW5jdGlvbiBtaXNzaW5nTGlicmFyeVN5bWJvbChzeW0pIHtcbiAgICBpZiAoXG4gICAgICB0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICFPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGdsb2JhbFRoaXMsIHN5bSlcbiAgICApIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShnbG9iYWxUaGlzLCBzeW0sIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAvLyBDYW4ndCBgYWJvcnQoKWAgaGVyZSBiZWNhdXNlIGl0IHdvdWxkIGJyZWFrIGNvZGUgdGhhdCBkb2VzIHJ1bnRpbWVcbiAgICAgICAgICAvLyBjaGVja3MuICBlLmcuIGBpZiAodHlwZW9mIFNETCA9PT0gJ3VuZGVmaW5lZCcpYC5cbiAgICAgICAgICB2YXIgbXNnID1cbiAgICAgICAgICAgICdgJyArXG4gICAgICAgICAgICBzeW0gK1xuICAgICAgICAgICAgJ2AgaXMgYSBsaWJyYXJ5IHN5bWJvbCBhbmQgbm90IGluY2x1ZGVkIGJ5IGRlZmF1bHQ7IGFkZCBpdCB0byB5b3VyIGxpYnJhcnkuanMgX19kZXBzIG9yIHRvIERFRkFVTFRfTElCUkFSWV9GVU5DU19UT19JTkNMVURFIG9uIHRoZSBjb21tYW5kIGxpbmUnXG4gICAgICAgICAgLy8gREVGQVVMVF9MSUJSQVJZX0ZVTkNTX1RPX0lOQ0xVREUgcmVxdWlyZXMgdGhlIG5hbWUgYXMgaXQgYXBwZWFycyBpblxuICAgICAgICAgIC8vIGxpYnJhcnkuanMsIHdoaWNoIG1lYW5zICRuYW1lIGZvciBhIEpTIG5hbWUgd2l0aCBubyBwcmVmaXgsIG9yIG5hbWVcbiAgICAgICAgICAvLyBmb3IgYSBKUyBuYW1lIGxpa2UgX25hbWUuXG4gICAgICAgICAgdmFyIGxpYnJhcnlTeW1ib2wgPSBzeW1cbiAgICAgICAgICBpZiAoIWxpYnJhcnlTeW1ib2wuc3RhcnRzV2l0aCgnXycpKSB7XG4gICAgICAgICAgICBsaWJyYXJ5U3ltYm9sID0gJyQnICsgc3ltXG4gICAgICAgICAgfVxuICAgICAgICAgIG1zZyArPVxuICAgICAgICAgICAgJyAoZS5nLiAtc0RFRkFVTFRfTElCUkFSWV9GVU5DU19UT19JTkNMVURFPScgKyBsaWJyYXJ5U3ltYm9sICsgJyknXG4gICAgICAgICAgaWYgKGlzRXhwb3J0ZWRCeUZvcmNlRmlsZXN5c3RlbShzeW0pKSB7XG4gICAgICAgICAgICBtc2cgKz1cbiAgICAgICAgICAgICAgJy4gQWx0ZXJuYXRpdmVseSwgZm9yY2luZyBmaWxlc3lzdGVtIHN1cHBvcnQgKC1zRk9SQ0VfRklMRVNZU1RFTSkgY2FuIGV4cG9ydCB0aGlzIGZvciB5b3UnXG4gICAgICAgICAgfVxuICAgICAgICAgIHdhcm5PbmNlKG1zZylcbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdW5leHBvcnRlZFJ1bnRpbWVTeW1ib2woc3ltKSB7XG4gICAgaWYgKCFPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE1vZHVsZSwgc3ltKSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1vZHVsZSwgc3ltLCB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIG1zZyA9XG4gICAgICAgICAgICBcIidcIiArXG4gICAgICAgICAgICBzeW0gK1xuICAgICAgICAgICAgXCInIHdhcyBub3QgZXhwb3J0ZWQuIGFkZCBpdCB0byBFWFBPUlRFRF9SVU5USU1FX01FVEhPRFMgKHNlZSB0aGUgRkFRKVwiXG4gICAgICAgICAgaWYgKGlzRXhwb3J0ZWRCeUZvcmNlRmlsZXN5c3RlbShzeW0pKSB7XG4gICAgICAgICAgICBtc2cgKz1cbiAgICAgICAgICAgICAgJy4gQWx0ZXJuYXRpdmVseSwgZm9yY2luZyBmaWxlc3lzdGVtIHN1cHBvcnQgKC1zRk9SQ0VfRklMRVNZU1RFTSkgY2FuIGV4cG9ydCB0aGlzIGZvciB5b3UnXG4gICAgICAgICAgfVxuICAgICAgICAgIGFib3J0KG1zZylcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICAvLyBlbmQgaW5jbHVkZTogcnVudGltZV9kZWJ1Zy5qc1xuXG4gIC8vID09PSBQcmVhbWJsZSBsaWJyYXJ5IHN0dWZmID09PVxuXG4gIC8vIERvY3VtZW50YXRpb24gZm9yIHRoZSBwdWJsaWMgQVBJcyBkZWZpbmVkIGluIHRoaXMgZmlsZSBtdXN0IGJlIHVwZGF0ZWQgaW46XG4gIC8vICAgIHNpdGUvc291cmNlL2RvY3MvYXBpX3JlZmVyZW5jZS9wcmVhbWJsZS5qcy5yc3RcbiAgLy8gQSBwcmVidWlsdCBsb2NhbCB2ZXJzaW9uIG9mIHRoZSBkb2N1bWVudGF0aW9uIGlzIGF2YWlsYWJsZSBhdDpcbiAgLy8gICAgc2l0ZS9idWlsZC90ZXh0L2RvY3MvYXBpX3JlZmVyZW5jZS9wcmVhbWJsZS5qcy50eHRcbiAgLy8gWW91IGNhbiBhbHNvIGJ1aWxkIGRvY3MgbG9jYWxseSBhcyBIVE1MIG9yIG90aGVyIGZvcm1hdHMgaW4gc2l0ZS9cbiAgLy8gQW4gb25saW5lIEhUTUwgdmVyc2lvbiAod2hpY2ggbWF5IGJlIG9mIGEgZGlmZmVyZW50IHZlcnNpb24gb2YgRW1zY3JpcHRlbilcbiAgLy8gICAgaXMgdXAgYXQgaHR0cDovL2tyaXBrZW4uZ2l0aHViLmlvL2Vtc2NyaXB0ZW4tc2l0ZS9kb2NzL2FwaV9yZWZlcmVuY2UvcHJlYW1ibGUuanMuaHRtbFxuXG4gIHZhciB3YXNtQmluYXJ5XG4gIGlmIChNb2R1bGVbJ3dhc21CaW5hcnknXSkgd2FzbUJpbmFyeSA9IE1vZHVsZVsnd2FzbUJpbmFyeSddXG4gIGxlZ2FjeU1vZHVsZVByb3AoJ3dhc21CaW5hcnknLCAnd2FzbUJpbmFyeScpXG4gIHZhciBub0V4aXRSdW50aW1lID0gTW9kdWxlWydub0V4aXRSdW50aW1lJ10gfHwgZmFsc2VcbiAgbGVnYWN5TW9kdWxlUHJvcCgnbm9FeGl0UnVudGltZScsICdub0V4aXRSdW50aW1lJylcblxuICBpZiAodHlwZW9mIFdlYkFzc2VtYmx5ICE9ICdvYmplY3QnKSB7XG4gICAgYWJvcnQoJ25vIG5hdGl2ZSB3YXNtIHN1cHBvcnQgZGV0ZWN0ZWQnKVxuICB9XG5cbiAgLy8gV2FzbSBnbG9iYWxzXG5cbiAgdmFyIHdhc21NZW1vcnlcblxuICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgLy8gUnVudGltZSBlc3NlbnRpYWxzXG4gIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIC8vIHdoZXRoZXIgd2UgYXJlIHF1aXR0aW5nIHRoZSBhcHBsaWNhdGlvbi4gbm8gY29kZSBzaG91bGQgcnVuIGFmdGVyIHRoaXMuXG4gIC8vIHNldCBpbiBleGl0KCkgYW5kIGFib3J0KClcbiAgdmFyIEFCT1JUID0gZmFsc2VcblxuICAvLyBzZXQgYnkgZXhpdCgpIGFuZCBhYm9ydCgpLiAgUGFzc2VkIHRvICdvbkV4aXQnIGhhbmRsZXIuXG4gIC8vIE5PVEU6IFRoaXMgaXMgYWxzbyB1c2VkIGFzIHRoZSBwcm9jZXNzIHJldHVybiBjb2RlIGNvZGUgaW4gc2hlbGwgZW52aXJvbm1lbnRzXG4gIC8vIGJ1dCBvbmx5IHdoZW4gbm9FeGl0UnVudGltZSBpcyBmYWxzZS5cbiAgdmFyIEVYSVRTVEFUVVNcblxuICAvKiogQHR5cGUge2Z1bmN0aW9uKCosIHN0cmluZz0pfSAqL1xuICBmdW5jdGlvbiBhc3NlcnQoY29uZGl0aW9uLCB0ZXh0KSB7XG4gICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgIGFib3J0KCdBc3NlcnRpb24gZmFpbGVkJyArICh0ZXh0ID8gJzogJyArIHRleHQgOiAnJykpXG4gICAgfVxuICB9XG5cbiAgLy8gV2UgdXNlZCB0byBpbmNsdWRlIG1hbGxvYy9mcmVlIGJ5IGRlZmF1bHQgaW4gdGhlIHBhc3QuIFNob3cgYSBoZWxwZnVsIGVycm9yIGluXG4gIC8vIGJ1aWxkcyB3aXRoIGFzc2VydGlvbnMuXG5cbiAgLy8gaW5jbHVkZTogcnVudGltZV9zdHJpbmdzLmpzXG5cbiAgLy8gcnVudGltZV9zdHJpbmdzLmpzOiBTdHJpbmdzIHJlbGF0ZWQgcnVudGltZSBmdW5jdGlvbnMgdGhhdCBhcmUgcGFydCBvZiBib3RoIE1JTklNQUxfUlVOVElNRSBhbmQgcmVndWxhciBydW50aW1lLlxuXG4gIHZhciBVVEY4RGVjb2RlciA9XG4gICAgdHlwZW9mIFRleHREZWNvZGVyICE9ICd1bmRlZmluZWQnID8gbmV3IFRleHREZWNvZGVyKCd1dGY4JykgOiB1bmRlZmluZWRcblxuICAvLyBHaXZlbiBhIHBvaW50ZXIgJ3B0cicgdG8gYSBudWxsLXRlcm1pbmF0ZWQgVVRGOC1lbmNvZGVkIHN0cmluZyBpbiB0aGUgZ2l2ZW4gYXJyYXkgdGhhdCBjb250YWlucyB1aW50OCB2YWx1ZXMsIHJldHVybnNcbiAgLy8gYSBjb3B5IG9mIHRoYXQgc3RyaW5nIGFzIGEgSmF2YXNjcmlwdCBTdHJpbmcgb2JqZWN0LlxuICAvKipcbiAgICogaGVhcE9yQXJyYXkgaXMgZWl0aGVyIGEgcmVndWxhciBhcnJheSwgb3IgYSBKYXZhU2NyaXB0IHR5cGVkIGFycmF5IHZpZXcuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpZHhcbiAgICogQHBhcmFtIHtudW1iZXI9fSBtYXhCeXRlc1RvUmVhZFxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuICBmdW5jdGlvbiBVVEY4QXJyYXlUb1N0cmluZyhoZWFwT3JBcnJheSwgaWR4LCBtYXhCeXRlc1RvUmVhZCkge1xuICAgIHZhciBlbmRJZHggPSBpZHggKyBtYXhCeXRlc1RvUmVhZFxuICAgIHZhciBlbmRQdHIgPSBpZHhcbiAgICAvLyBUZXh0RGVjb2RlciBuZWVkcyB0byBrbm93IHRoZSBieXRlIGxlbmd0aCBpbiBhZHZhbmNlLCBpdCBkb2Vzbid0IHN0b3Agb24gbnVsbCB0ZXJtaW5hdG9yIGJ5IGl0c2VsZi5cbiAgICAvLyBBbHNvLCB1c2UgdGhlIGxlbmd0aCBpbmZvIHRvIGF2b2lkIHJ1bm5pbmcgdGlueSBzdHJpbmdzIHRocm91Z2ggVGV4dERlY29kZXIsIHNpbmNlIC5zdWJhcnJheSgpIGFsbG9jYXRlcyBnYXJiYWdlLlxuICAgIC8vIChBcyBhIHRpbnkgY29kZSBzYXZlIHRyaWNrLCBjb21wYXJlIGVuZFB0ciBhZ2FpbnN0IGVuZElkeCB1c2luZyBhIG5lZ2F0aW9uLCBzbyB0aGF0IHVuZGVmaW5lZCBtZWFucyBJbmZpbml0eSlcbiAgICB3aGlsZSAoaGVhcE9yQXJyYXlbZW5kUHRyXSAmJiAhKGVuZFB0ciA+PSBlbmRJZHgpKSArK2VuZFB0clxuXG4gICAgaWYgKGVuZFB0ciAtIGlkeCA+IDE2ICYmIGhlYXBPckFycmF5LmJ1ZmZlciAmJiBVVEY4RGVjb2Rlcikge1xuICAgICAgcmV0dXJuIFVURjhEZWNvZGVyLmRlY29kZShoZWFwT3JBcnJheS5zdWJhcnJheShpZHgsIGVuZFB0cikpXG4gICAgfVxuICAgIHZhciBzdHIgPSAnJ1xuICAgIC8vIElmIGJ1aWxkaW5nIHdpdGggVGV4dERlY29kZXIsIHdlIGhhdmUgYWxyZWFkeSBjb21wdXRlZCB0aGUgc3RyaW5nIGxlbmd0aCBhYm92ZSwgc28gdGVzdCBsb29wIGVuZCBjb25kaXRpb24gYWdhaW5zdCB0aGF0XG4gICAgd2hpbGUgKGlkeCA8IGVuZFB0cikge1xuICAgICAgLy8gRm9yIFVURjggYnl0ZSBzdHJ1Y3R1cmUsIHNlZTpcbiAgICAgIC8vIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvVVRGLTgjRGVzY3JpcHRpb25cbiAgICAgIC8vIGh0dHBzOi8vd3d3LmlldGYub3JnL3JmYy9yZmMyMjc5LnR4dFxuICAgICAgLy8gaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM2MjlcbiAgICAgIHZhciB1MCA9IGhlYXBPckFycmF5W2lkeCsrXVxuICAgICAgaWYgKCEodTAgJiAweDgwKSkge1xuICAgICAgICBzdHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSh1MClcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cbiAgICAgIHZhciB1MSA9IGhlYXBPckFycmF5W2lkeCsrXSAmIDYzXG4gICAgICBpZiAoKHUwICYgMHhlMCkgPT0gMHhjMCkge1xuICAgICAgICBzdHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgoKHUwICYgMzEpIDw8IDYpIHwgdTEpXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG4gICAgICB2YXIgdTIgPSBoZWFwT3JBcnJheVtpZHgrK10gJiA2M1xuICAgICAgaWYgKCh1MCAmIDB4ZjApID09IDB4ZTApIHtcbiAgICAgICAgdTAgPSAoKHUwICYgMTUpIDw8IDEyKSB8ICh1MSA8PCA2KSB8IHUyXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoKHUwICYgMHhmOCkgIT0gMHhmMClcbiAgICAgICAgICB3YXJuT25jZShcbiAgICAgICAgICAgICdJbnZhbGlkIFVURi04IGxlYWRpbmcgYnl0ZSAweCcgK1xuICAgICAgICAgICAgICB1MC50b1N0cmluZygxNikgK1xuICAgICAgICAgICAgICAnIGVuY291bnRlcmVkIHdoZW4gZGVzZXJpYWxpemluZyBhIFVURi04IHN0cmluZyBpbiB3YXNtIG1lbW9yeSB0byBhIEpTIHN0cmluZyEnXG4gICAgICAgICAgKVxuICAgICAgICB1MCA9XG4gICAgICAgICAgKCh1MCAmIDcpIDw8IDE4KSB8ICh1MSA8PCAxMikgfCAodTIgPDwgNikgfCAoaGVhcE9yQXJyYXlbaWR4KytdICYgNjMpXG4gICAgICB9XG5cbiAgICAgIGlmICh1MCA8IDB4MTAwMDApIHtcbiAgICAgICAgc3RyICs9IFN0cmluZy5mcm9tQ2hhckNvZGUodTApXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgY2ggPSB1MCAtIDB4MTAwMDBcbiAgICAgICAgc3RyICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHhkODAwIHwgKGNoID4+IDEwKSwgMHhkYzAwIHwgKGNoICYgMHgzZmYpKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3RyXG4gIH1cblxuICAvLyBHaXZlbiBhIHBvaW50ZXIgJ3B0cicgdG8gYSBudWxsLXRlcm1pbmF0ZWQgVVRGOC1lbmNvZGVkIHN0cmluZyBpbiB0aGUgZW1zY3JpcHRlbiBIRUFQLCByZXR1cm5zIGFcbiAgLy8gY29weSBvZiB0aGF0IHN0cmluZyBhcyBhIEphdmFzY3JpcHQgU3RyaW5nIG9iamVjdC5cbiAgLy8gbWF4Qnl0ZXNUb1JlYWQ6IGFuIG9wdGlvbmFsIGxlbmd0aCB0aGF0IHNwZWNpZmllcyB0aGUgbWF4aW11bSBudW1iZXIgb2YgYnl0ZXMgdG8gcmVhZC4gWW91IGNhbiBvbWl0XG4gIC8vICAgICAgICAgICAgICAgICB0aGlzIHBhcmFtZXRlciB0byBzY2FuIHRoZSBzdHJpbmcgdW50aWwgdGhlIGZpcnN0IFxcMCBieXRlLiBJZiBtYXhCeXRlc1RvUmVhZCBpc1xuICAvLyAgICAgICAgICAgICAgICAgcGFzc2VkLCBhbmQgdGhlIHN0cmluZyBhdCBbcHRyLCBwdHIrbWF4Qnl0ZXNUb1JlYWRyWyBjb250YWlucyBhIG51bGwgYnl0ZSBpbiB0aGVcbiAgLy8gICAgICAgICAgICAgICAgIG1pZGRsZSwgdGhlbiB0aGUgc3RyaW5nIHdpbGwgY3V0IHNob3J0IGF0IHRoYXQgYnl0ZSBpbmRleCAoaS5lLiBtYXhCeXRlc1RvUmVhZCB3aWxsXG4gIC8vICAgICAgICAgICAgICAgICBub3QgcHJvZHVjZSBhIHN0cmluZyBvZiBleGFjdCBsZW5ndGggW3B0ciwgcHRyK21heEJ5dGVzVG9SZWFkWylcbiAgLy8gICAgICAgICAgICAgICAgIE4uQi4gbWl4aW5nIGZyZXF1ZW50IHVzZXMgb2YgVVRGOFRvU3RyaW5nKCkgd2l0aCBhbmQgd2l0aG91dCBtYXhCeXRlc1RvUmVhZCBtYXlcbiAgLy8gICAgICAgICAgICAgICAgIHRocm93IEpTIEpJVCBvcHRpbWl6YXRpb25zIG9mZiwgc28gaXQgaXMgd29ydGggdG8gY29uc2lkZXIgY29uc2lzdGVudGx5IHVzaW5nIG9uZVxuICAvLyAgICAgICAgICAgICAgICAgc3R5bGUgb3IgdGhlIG90aGVyLlxuICAvKipcbiAgICogQHBhcmFtIHtudW1iZXJ9IHB0clxuICAgKiBAcGFyYW0ge251bWJlcj19IG1heEJ5dGVzVG9SZWFkXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICovXG4gIGZ1bmN0aW9uIFVURjhUb1N0cmluZyhwdHIsIG1heEJ5dGVzVG9SZWFkKSB7XG4gICAgcmV0dXJuIHB0ciA/IFVURjhBcnJheVRvU3RyaW5nKEhFQVBVOCwgcHRyLCBtYXhCeXRlc1RvUmVhZCkgOiAnJ1xuICB9XG5cbiAgLy8gQ29waWVzIHRoZSBnaXZlbiBKYXZhc2NyaXB0IFN0cmluZyBvYmplY3QgJ3N0cicgdG8gdGhlIGdpdmVuIGJ5dGUgYXJyYXkgYXQgYWRkcmVzcyAnb3V0SWR4JyxcbiAgLy8gZW5jb2RlZCBpbiBVVEY4IGZvcm0gYW5kIG51bGwtdGVybWluYXRlZC4gVGhlIGNvcHkgd2lsbCByZXF1aXJlIGF0IG1vc3Qgc3RyLmxlbmd0aCo0KzEgYnl0ZXMgb2Ygc3BhY2UgaW4gdGhlIEhFQVAuXG4gIC8vIFVzZSB0aGUgZnVuY3Rpb24gbGVuZ3RoQnl0ZXNVVEY4IHRvIGNvbXB1dGUgdGhlIGV4YWN0IG51bWJlciBvZiBieXRlcyAoZXhjbHVkaW5nIG51bGwgdGVybWluYXRvcikgdGhhdCB0aGlzIGZ1bmN0aW9uIHdpbGwgd3JpdGUuXG4gIC8vIFBhcmFtZXRlcnM6XG4gIC8vICAgc3RyOiB0aGUgSmF2YXNjcmlwdCBzdHJpbmcgdG8gY29weS5cbiAgLy8gICBoZWFwOiB0aGUgYXJyYXkgdG8gY29weSB0by4gRWFjaCBpbmRleCBpbiB0aGlzIGFycmF5IGlzIGFzc3VtZWQgdG8gYmUgb25lIDgtYnl0ZSBlbGVtZW50LlxuICAvLyAgIG91dElkeDogVGhlIHN0YXJ0aW5nIG9mZnNldCBpbiB0aGUgYXJyYXkgdG8gYmVnaW4gdGhlIGNvcHlpbmcuXG4gIC8vICAgbWF4Qnl0ZXNUb1dyaXRlOiBUaGUgbWF4aW11bSBudW1iZXIgb2YgYnl0ZXMgdGhpcyBmdW5jdGlvbiBjYW4gd3JpdGUgdG8gdGhlIGFycmF5LlxuICAvLyAgICAgICAgICAgICAgICAgICAgVGhpcyBjb3VudCBzaG91bGQgaW5jbHVkZSB0aGUgbnVsbCB0ZXJtaW5hdG9yLFxuICAvLyAgICAgICAgICAgICAgICAgICAgaS5lLiBpZiBtYXhCeXRlc1RvV3JpdGU9MSwgb25seSB0aGUgbnVsbCB0ZXJtaW5hdG9yIHdpbGwgYmUgd3JpdHRlbiBhbmQgbm90aGluZyBlbHNlLlxuICAvLyAgICAgICAgICAgICAgICAgICAgbWF4Qnl0ZXNUb1dyaXRlPTAgZG9lcyBub3Qgd3JpdGUgYW55IGJ5dGVzIHRvIHRoZSBvdXRwdXQsIG5vdCBldmVuIHRoZSBudWxsIHRlcm1pbmF0b3IuXG4gIC8vIFJldHVybnMgdGhlIG51bWJlciBvZiBieXRlcyB3cml0dGVuLCBFWENMVURJTkcgdGhlIG51bGwgdGVybWluYXRvci5cblxuICBmdW5jdGlvbiBzdHJpbmdUb1VURjhBcnJheShzdHIsIGhlYXAsIG91dElkeCwgbWF4Qnl0ZXNUb1dyaXRlKSB7XG4gICAgaWYgKCEobWF4Qnl0ZXNUb1dyaXRlID4gMCkpXG4gICAgICAvLyBQYXJhbWV0ZXIgbWF4Qnl0ZXNUb1dyaXRlIGlzIG5vdCBvcHRpb25hbC4gTmVnYXRpdmUgdmFsdWVzLCAwLCBudWxsLCB1bmRlZmluZWQgYW5kIGZhbHNlIGVhY2ggZG9uJ3Qgd3JpdGUgb3V0IGFueSBieXRlcy5cbiAgICAgIHJldHVybiAwXG5cbiAgICB2YXIgc3RhcnRJZHggPSBvdXRJZHhcbiAgICB2YXIgZW5kSWR4ID0gb3V0SWR4ICsgbWF4Qnl0ZXNUb1dyaXRlIC0gMSAvLyAtMSBmb3Igc3RyaW5nIG51bGwgdGVybWluYXRvci5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgICAgLy8gR290Y2hhOiBjaGFyQ29kZUF0IHJldHVybnMgYSAxNi1iaXQgd29yZCB0aGF0IGlzIGEgVVRGLTE2IGVuY29kZWQgY29kZSB1bml0LCBub3QgYSBVbmljb2RlIGNvZGUgcG9pbnQgb2YgdGhlIGNoYXJhY3RlciEgU28gZGVjb2RlIFVURjE2LT5VVEYzMi0+VVRGOC5cbiAgICAgIC8vIFNlZSBodHRwOi8vdW5pY29kZS5vcmcvZmFxL3V0Zl9ib20uaHRtbCN1dGYxNi0zXG4gICAgICAvLyBGb3IgVVRGOCBieXRlIHN0cnVjdHVyZSwgc2VlIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvVVRGLTgjRGVzY3JpcHRpb24gYW5kIGh0dHBzOi8vd3d3LmlldGYub3JnL3JmYy9yZmMyMjc5LnR4dCBhbmQgaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM2MjlcbiAgICAgIHZhciB1ID0gc3RyLmNoYXJDb2RlQXQoaSkgLy8gcG9zc2libHkgYSBsZWFkIHN1cnJvZ2F0ZVxuICAgICAgaWYgKHUgPj0gMHhkODAwICYmIHUgPD0gMHhkZmZmKSB7XG4gICAgICAgIHZhciB1MSA9IHN0ci5jaGFyQ29kZUF0KCsraSlcbiAgICAgICAgdSA9ICgweDEwMDAwICsgKCh1ICYgMHgzZmYpIDw8IDEwKSkgfCAodTEgJiAweDNmZilcbiAgICAgIH1cbiAgICAgIGlmICh1IDw9IDB4N2YpIHtcbiAgICAgICAgaWYgKG91dElkeCA+PSBlbmRJZHgpIGJyZWFrXG4gICAgICAgIGhlYXBbb3V0SWR4KytdID0gdVxuICAgICAgfSBlbHNlIGlmICh1IDw9IDB4N2ZmKSB7XG4gICAgICAgIGlmIChvdXRJZHggKyAxID49IGVuZElkeCkgYnJlYWtcbiAgICAgICAgaGVhcFtvdXRJZHgrK10gPSAweGMwIHwgKHUgPj4gNilcbiAgICAgICAgaGVhcFtvdXRJZHgrK10gPSAweDgwIHwgKHUgJiA2MylcbiAgICAgIH0gZWxzZSBpZiAodSA8PSAweGZmZmYpIHtcbiAgICAgICAgaWYgKG91dElkeCArIDIgPj0gZW5kSWR4KSBicmVha1xuICAgICAgICBoZWFwW291dElkeCsrXSA9IDB4ZTAgfCAodSA+PiAxMilcbiAgICAgICAgaGVhcFtvdXRJZHgrK10gPSAweDgwIHwgKCh1ID4+IDYpICYgNjMpXG4gICAgICAgIGhlYXBbb3V0SWR4KytdID0gMHg4MCB8ICh1ICYgNjMpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAob3V0SWR4ICsgMyA+PSBlbmRJZHgpIGJyZWFrXG4gICAgICAgIGlmICh1ID4gMHgxMGZmZmYpXG4gICAgICAgICAgd2Fybk9uY2UoXG4gICAgICAgICAgICAnSW52YWxpZCBVbmljb2RlIGNvZGUgcG9pbnQgMHgnICtcbiAgICAgICAgICAgICAgdS50b1N0cmluZygxNikgK1xuICAgICAgICAgICAgICAnIGVuY291bnRlcmVkIHdoZW4gc2VyaWFsaXppbmcgYSBKUyBzdHJpbmcgdG8gYSBVVEYtOCBzdHJpbmcgaW4gd2FzbSBtZW1vcnkhIChWYWxpZCB1bmljb2RlIGNvZGUgcG9pbnRzIHNob3VsZCBiZSBpbiByYW5nZSAwLTB4MTBGRkZGKS4nXG4gICAgICAgICAgKVxuICAgICAgICBoZWFwW291dElkeCsrXSA9IDB4ZjAgfCAodSA+PiAxOClcbiAgICAgICAgaGVhcFtvdXRJZHgrK10gPSAweDgwIHwgKCh1ID4+IDEyKSAmIDYzKVxuICAgICAgICBoZWFwW291dElkeCsrXSA9IDB4ODAgfCAoKHUgPj4gNikgJiA2MylcbiAgICAgICAgaGVhcFtvdXRJZHgrK10gPSAweDgwIHwgKHUgJiA2MylcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gTnVsbC10ZXJtaW5hdGUgdGhlIHBvaW50ZXIgdG8gdGhlIGJ1ZmZlci5cbiAgICBoZWFwW291dElkeF0gPSAwXG4gICAgcmV0dXJuIG91dElkeCAtIHN0YXJ0SWR4XG4gIH1cblxuICAvLyBDb3BpZXMgdGhlIGdpdmVuIEphdmFzY3JpcHQgU3RyaW5nIG9iamVjdCAnc3RyJyB0byB0aGUgZW1zY3JpcHRlbiBIRUFQIGF0IGFkZHJlc3MgJ291dFB0cicsXG4gIC8vIG51bGwtdGVybWluYXRlZCBhbmQgZW5jb2RlZCBpbiBVVEY4IGZvcm0uIFRoZSBjb3B5IHdpbGwgcmVxdWlyZSBhdCBtb3N0IHN0ci5sZW5ndGgqNCsxIGJ5dGVzIG9mIHNwYWNlIGluIHRoZSBIRUFQLlxuICAvLyBVc2UgdGhlIGZ1bmN0aW9uIGxlbmd0aEJ5dGVzVVRGOCB0byBjb21wdXRlIHRoZSBleGFjdCBudW1iZXIgb2YgYnl0ZXMgKGV4Y2x1ZGluZyBudWxsIHRlcm1pbmF0b3IpIHRoYXQgdGhpcyBmdW5jdGlvbiB3aWxsIHdyaXRlLlxuICAvLyBSZXR1cm5zIHRoZSBudW1iZXIgb2YgYnl0ZXMgd3JpdHRlbiwgRVhDTFVESU5HIHRoZSBudWxsIHRlcm1pbmF0b3IuXG5cbiAgZnVuY3Rpb24gc3RyaW5nVG9VVEY4KHN0ciwgb3V0UHRyLCBtYXhCeXRlc1RvV3JpdGUpIHtcbiAgICBhc3NlcnQoXG4gICAgICB0eXBlb2YgbWF4Qnl0ZXNUb1dyaXRlID09ICdudW1iZXInLFxuICAgICAgJ3N0cmluZ1RvVVRGOChzdHIsIG91dFB0ciwgbWF4Qnl0ZXNUb1dyaXRlKSBpcyBtaXNzaW5nIHRoZSB0aGlyZCBwYXJhbWV0ZXIgdGhhdCBzcGVjaWZpZXMgdGhlIGxlbmd0aCBvZiB0aGUgb3V0cHV0IGJ1ZmZlciEnXG4gICAgKVxuICAgIHJldHVybiBzdHJpbmdUb1VURjhBcnJheShzdHIsIEhFQVBVOCwgb3V0UHRyLCBtYXhCeXRlc1RvV3JpdGUpXG4gIH1cblxuICAvLyBSZXR1cm5zIHRoZSBudW1iZXIgb2YgYnl0ZXMgdGhlIGdpdmVuIEphdmFzY3JpcHQgc3RyaW5nIHRha2VzIGlmIGVuY29kZWQgYXMgYSBVVEY4IGJ5dGUgYXJyYXksIEVYQ0xVRElORyB0aGUgbnVsbCB0ZXJtaW5hdG9yIGJ5dGUuXG4gIGZ1bmN0aW9uIGxlbmd0aEJ5dGVzVVRGOChzdHIpIHtcbiAgICB2YXIgbGVuID0gMFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgKytpKSB7XG4gICAgICAvLyBHb3RjaGE6IGNoYXJDb2RlQXQgcmV0dXJucyBhIDE2LWJpdCB3b3JkIHRoYXQgaXMgYSBVVEYtMTYgZW5jb2RlZCBjb2RlIHVuaXQsIG5vdCBhIFVuaWNvZGUgY29kZSBwb2ludCBvZiB0aGUgY2hhcmFjdGVyISBTbyBkZWNvZGUgVVRGMTYtPlVURjMyLT5VVEY4LlxuICAgICAgLy8gU2VlIGh0dHA6Ly91bmljb2RlLm9yZy9mYXEvdXRmX2JvbS5odG1sI3V0ZjE2LTNcbiAgICAgIHZhciBjID0gc3RyLmNoYXJDb2RlQXQoaSkgLy8gcG9zc2libHkgYSBsZWFkIHN1cnJvZ2F0ZVxuICAgICAgaWYgKGMgPD0gMHg3Zikge1xuICAgICAgICBsZW4rK1xuICAgICAgfSBlbHNlIGlmIChjIDw9IDB4N2ZmKSB7XG4gICAgICAgIGxlbiArPSAyXG4gICAgICB9IGVsc2UgaWYgKGMgPj0gMHhkODAwICYmIGMgPD0gMHhkZmZmKSB7XG4gICAgICAgIGxlbiArPSA0XG4gICAgICAgICsraVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGVuICs9IDNcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGxlblxuICB9XG5cbiAgLy8gZW5kIGluY2x1ZGU6IHJ1bnRpbWVfc3RyaW5ncy5qc1xuICAvLyBNZW1vcnkgbWFuYWdlbWVudFxuXG4gIHZhciBIRUFQLFxuICAgIC8qKiBAdHlwZSB7IUFycmF5QnVmZmVyfSAqL1xuICAgIGJ1ZmZlcixcbiAgICAvKiogQHR5cGUgeyFJbnQ4QXJyYXl9ICovXG4gICAgSEVBUDgsXG4gICAgLyoqIEB0eXBlIHshVWludDhBcnJheX0gKi9cbiAgICBIRUFQVTgsXG4gICAgLyoqIEB0eXBlIHshSW50MTZBcnJheX0gKi9cbiAgICBIRUFQMTYsXG4gICAgLyoqIEB0eXBlIHshVWludDE2QXJyYXl9ICovXG4gICAgSEVBUFUxNixcbiAgICAvKiogQHR5cGUgeyFJbnQzMkFycmF5fSAqL1xuICAgIEhFQVAzMixcbiAgICAvKiogQHR5cGUgeyFVaW50MzJBcnJheX0gKi9cbiAgICBIRUFQVTMyLFxuICAgIC8qKiBAdHlwZSB7IUZsb2F0MzJBcnJheX0gKi9cbiAgICBIRUFQRjMyLFxuICAgIC8qKiBAdHlwZSB7IUZsb2F0NjRBcnJheX0gKi9cbiAgICBIRUFQRjY0XG5cbiAgZnVuY3Rpb24gdXBkYXRlR2xvYmFsQnVmZmVyQW5kVmlld3MoYnVmKSB7XG4gICAgYnVmZmVyID0gYnVmXG4gICAgTW9kdWxlWydIRUFQOCddID0gSEVBUDggPSBuZXcgSW50OEFycmF5KGJ1ZilcbiAgICBNb2R1bGVbJ0hFQVAxNiddID0gSEVBUDE2ID0gbmV3IEludDE2QXJyYXkoYnVmKVxuICAgIE1vZHVsZVsnSEVBUDMyJ10gPSBIRUFQMzIgPSBuZXcgSW50MzJBcnJheShidWYpXG4gICAgTW9kdWxlWydIRUFQVTgnXSA9IEhFQVBVOCA9IG5ldyBVaW50OEFycmF5KGJ1ZilcbiAgICBNb2R1bGVbJ0hFQVBVMTYnXSA9IEhFQVBVMTYgPSBuZXcgVWludDE2QXJyYXkoYnVmKVxuICAgIE1vZHVsZVsnSEVBUFUzMiddID0gSEVBUFUzMiA9IG5ldyBVaW50MzJBcnJheShidWYpXG4gICAgTW9kdWxlWydIRUFQRjMyJ10gPSBIRUFQRjMyID0gbmV3IEZsb2F0MzJBcnJheShidWYpXG4gICAgTW9kdWxlWydIRUFQRjY0J10gPSBIRUFQRjY0ID0gbmV3IEZsb2F0NjRBcnJheShidWYpXG4gIH1cblxuICB2YXIgVE9UQUxfU1RBQ0sgPSA1MjQyODgwXG4gIGlmIChNb2R1bGVbJ1RPVEFMX1NUQUNLJ10pXG4gICAgYXNzZXJ0KFxuICAgICAgVE9UQUxfU1RBQ0sgPT09IE1vZHVsZVsnVE9UQUxfU1RBQ0snXSxcbiAgICAgICd0aGUgc3RhY2sgc2l6ZSBjYW4gbm8gbG9uZ2VyIGJlIGRldGVybWluZWQgYXQgcnVudGltZSdcbiAgICApXG5cbiAgdmFyIElOSVRJQUxfTUVNT1JZID0gTW9kdWxlWydJTklUSUFMX01FTU9SWSddIHx8IDE2Nzc3MjE2XG4gIGxlZ2FjeU1vZHVsZVByb3AoJ0lOSVRJQUxfTUVNT1JZJywgJ0lOSVRJQUxfTUVNT1JZJylcblxuICBhc3NlcnQoXG4gICAgSU5JVElBTF9NRU1PUlkgPj0gVE9UQUxfU1RBQ0ssXG4gICAgJ0lOSVRJQUxfTUVNT1JZIHNob3VsZCBiZSBsYXJnZXIgdGhhbiBUT1RBTF9TVEFDSywgd2FzICcgK1xuICAgICAgSU5JVElBTF9NRU1PUlkgK1xuICAgICAgJyEgKFRPVEFMX1NUQUNLPScgK1xuICAgICAgVE9UQUxfU1RBQ0sgK1xuICAgICAgJyknXG4gIClcblxuICAvLyBjaGVjayBmb3IgZnVsbCBlbmdpbmUgc3VwcG9ydCAodXNlIHN0cmluZyAnc3ViYXJyYXknIHRvIGF2b2lkIGNsb3N1cmUgY29tcGlsZXIgY29uZnVzaW9uKVxuICBhc3NlcnQoXG4gICAgdHlwZW9mIEludDMyQXJyYXkgIT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgIHR5cGVvZiBGbG9hdDY0QXJyYXkgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICBJbnQzMkFycmF5LnByb3RvdHlwZS5zdWJhcnJheSAhPSB1bmRlZmluZWQgJiZcbiAgICAgIEludDMyQXJyYXkucHJvdG90eXBlLnNldCAhPSB1bmRlZmluZWQsXG4gICAgJ0pTIGVuZ2luZSBkb2VzIG5vdCBwcm92aWRlIGZ1bGwgdHlwZWQgYXJyYXkgc3VwcG9ydCdcbiAgKVxuXG4gIC8vIElmIG1lbW9yeSBpcyBkZWZpbmVkIGluIHdhc20sIHRoZSB1c2VyIGNhbid0IHByb3ZpZGUgaXQuXG4gIGFzc2VydChcbiAgICAhTW9kdWxlWyd3YXNtTWVtb3J5J10sXG4gICAgJ1VzZSBvZiBgd2FzbU1lbW9yeWAgZGV0ZWN0ZWQuICBVc2UgLXNJTVBPUlRFRF9NRU1PUlkgdG8gZGVmaW5lIHdhc21NZW1vcnkgZXh0ZXJuYWxseSdcbiAgKVxuICBhc3NlcnQoXG4gICAgSU5JVElBTF9NRU1PUlkgPT0gMTY3NzcyMTYsXG4gICAgJ0RldGVjdGVkIHJ1bnRpbWUgSU5JVElBTF9NRU1PUlkgc2V0dGluZy4gIFVzZSAtc0lNUE9SVEVEX01FTU9SWSB0byBkZWZpbmUgd2FzbU1lbW9yeSBkeW5hbWljYWxseSdcbiAgKVxuXG4gIC8vIGluY2x1ZGU6IHJ1bnRpbWVfaW5pdF90YWJsZS5qc1xuICAvLyBJbiByZWd1bGFyIG5vbi1SRUxPQ0FUQUJMRSBtb2RlIHRoZSB0YWJsZSBpcyBleHBvcnRlZFxuICAvLyBmcm9tIHRoZSB3YXNtIG1vZHVsZSBhbmQgdGhpcyB3aWxsIGJlIGFzc2lnbmVkIG9uY2VcbiAgLy8gdGhlIGV4cG9ydHMgYXJlIGF2YWlsYWJsZS5cbiAgdmFyIHdhc21UYWJsZVxuXG4gIC8vIGVuZCBpbmNsdWRlOiBydW50aW1lX2luaXRfdGFibGUuanNcbiAgLy8gaW5jbHVkZTogcnVudGltZV9zdGFja19jaGVjay5qc1xuXG4gIC8vIEluaXRpYWxpemVzIHRoZSBzdGFjayBjb29raWUuIENhbGxlZCBhdCB0aGUgc3RhcnR1cCBvZiBtYWluIGFuZCBhdCB0aGUgc3RhcnR1cCBvZiBlYWNoIHRocmVhZCBpbiBwdGhyZWFkcyBtb2RlLlxuICBmdW5jdGlvbiB3cml0ZVN0YWNrQ29va2llKCkge1xuICAgIHZhciBtYXggPSBfZW1zY3JpcHRlbl9zdGFja19nZXRfZW5kKClcbiAgICBhc3NlcnQoKG1heCAmIDMpID09IDApXG4gICAgLy8gVGhlIHN0YWNrIGdyb3cgZG93bndhcmRzIHRvd2FyZHMgX2Vtc2NyaXB0ZW5fc3RhY2tfZ2V0X2VuZC5cbiAgICAvLyBXZSB3cml0ZSBjb29raWVzIHRvIHRoZSBmaW5hbCB0d28gd29yZHMgaW4gdGhlIHN0YWNrIGFuZCBkZXRlY3QgaWYgdGhleSBhcmVcbiAgICAvLyBldmVyIG92ZXJ3cml0dGVuLlxuICAgIEhFQVBVMzJbbWF4ID4+IDJdID0gMHgyMTM1NDY3XG4gICAgSEVBUFUzMlsobWF4ICsgNCkgPj4gMl0gPSAweDg5YmFjZGZlXG4gICAgLy8gQWxzbyB0ZXN0IHRoZSBnbG9iYWwgYWRkcmVzcyAwIGZvciBpbnRlZ3JpdHkuXG4gICAgSEVBUFUzMlswXSA9IDB4NjM3MzZkNjUgLyogJ2Vtc2MnICovXG4gIH1cblxuICBmdW5jdGlvbiBjaGVja1N0YWNrQ29va2llKCkge1xuICAgIGlmIChBQk9SVCkgcmV0dXJuXG4gICAgdmFyIG1heCA9IF9lbXNjcmlwdGVuX3N0YWNrX2dldF9lbmQoKVxuICAgIHZhciBjb29raWUxID0gSEVBUFUzMlttYXggPj4gMl1cbiAgICB2YXIgY29va2llMiA9IEhFQVBVMzJbKG1heCArIDQpID4+IDJdXG4gICAgaWYgKGNvb2tpZTEgIT0gMHgyMTM1NDY3IHx8IGNvb2tpZTIgIT0gMHg4OWJhY2RmZSkge1xuICAgICAgYWJvcnQoXG4gICAgICAgICdTdGFjayBvdmVyZmxvdyEgU3RhY2sgY29va2llIGhhcyBiZWVuIG92ZXJ3cml0dGVuIGF0IDB4JyArXG4gICAgICAgICAgbWF4LnRvU3RyaW5nKDE2KSArXG4gICAgICAgICAgJywgZXhwZWN0ZWQgaGV4IGR3b3JkcyAweDg5QkFDREZFIGFuZCAweDIxMzU0NjcsIGJ1dCByZWNlaXZlZCAweCcgK1xuICAgICAgICAgIGNvb2tpZTIudG9TdHJpbmcoMTYpICtcbiAgICAgICAgICAnIDB4JyArXG4gICAgICAgICAgY29va2llMS50b1N0cmluZygxNilcbiAgICAgIClcbiAgICB9XG4gICAgLy8gQWxzbyB0ZXN0IHRoZSBnbG9iYWwgYWRkcmVzcyAwIGZvciBpbnRlZ3JpdHkuXG4gICAgaWYgKEhFQVBVMzJbMF0gIT09IDB4NjM3MzZkNjUgLyogJ2Vtc2MnICovKVxuICAgICAgYWJvcnQoXG4gICAgICAgICdSdW50aW1lIGVycm9yOiBUaGUgYXBwbGljYXRpb24gaGFzIGNvcnJ1cHRlZCBpdHMgaGVhcCBtZW1vcnkgYXJlYSAoYWRkcmVzcyB6ZXJvKSEnXG4gICAgICApXG4gIH1cblxuICAvLyBlbmQgaW5jbHVkZTogcnVudGltZV9zdGFja19jaGVjay5qc1xuICAvLyBpbmNsdWRlOiBydW50aW1lX2Fzc2VydGlvbnMuanNcblxuICAvLyBFbmRpYW5uZXNzIGNoZWNrXG4gIDsoZnVuY3Rpb24gKCkge1xuICAgIHZhciBoMTYgPSBuZXcgSW50MTZBcnJheSgxKVxuICAgIHZhciBoOCA9IG5ldyBJbnQ4QXJyYXkoaDE2LmJ1ZmZlcilcbiAgICBoMTZbMF0gPSAweDYzNzNcbiAgICBpZiAoaDhbMF0gIT09IDB4NzMgfHwgaDhbMV0gIT09IDB4NjMpXG4gICAgICB0aHJvdyAnUnVudGltZSBlcnJvcjogZXhwZWN0ZWQgdGhlIHN5c3RlbSB0byBiZSBsaXR0bGUtZW5kaWFuISAoUnVuIHdpdGggLXNTVVBQT1JUX0JJR19FTkRJQU4gdG8gYnlwYXNzKSdcbiAgfSkoKVxuXG4gIC8vIGVuZCBpbmNsdWRlOiBydW50aW1lX2Fzc2VydGlvbnMuanNcbiAgdmFyIF9fQVRQUkVSVU5fXyA9IFtdIC8vIGZ1bmN0aW9ucyBjYWxsZWQgYmVmb3JlIHRoZSBydW50aW1lIGlzIGluaXRpYWxpemVkXG4gIHZhciBfX0FUSU5JVF9fID0gW10gLy8gZnVuY3Rpb25zIGNhbGxlZCBkdXJpbmcgc3RhcnR1cFxuICB2YXIgX19BVE1BSU5fXyA9IFtdIC8vIGZ1bmN0aW9ucyBjYWxsZWQgd2hlbiBtYWluKCkgaXMgdG8gYmUgcnVuXG4gIHZhciBfX0FURVhJVF9fID0gW10gLy8gZnVuY3Rpb25zIGNhbGxlZCBkdXJpbmcgc2h1dGRvd25cbiAgdmFyIF9fQVRQT1NUUlVOX18gPSBbXSAvLyBmdW5jdGlvbnMgY2FsbGVkIGFmdGVyIHRoZSBtYWluKCkgaXMgY2FsbGVkXG5cbiAgdmFyIHJ1bnRpbWVJbml0aWFsaXplZCA9IGZhbHNlXG5cbiAgdmFyIHJ1bnRpbWVFeGl0ZWQgPSBmYWxzZVxuICB2YXIgcnVudGltZUtlZXBhbGl2ZUNvdW50ZXIgPSAwXG5cbiAgZnVuY3Rpb24ga2VlcFJ1bnRpbWVBbGl2ZSgpIHtcbiAgICByZXR1cm4gbm9FeGl0UnVudGltZSB8fCBydW50aW1lS2VlcGFsaXZlQ291bnRlciA+IDBcbiAgfVxuXG4gIGZ1bmN0aW9uIHByZVJ1bigpIHtcbiAgICBpZiAoTW9kdWxlWydwcmVSdW4nXSkge1xuICAgICAgaWYgKHR5cGVvZiBNb2R1bGVbJ3ByZVJ1biddID09ICdmdW5jdGlvbicpXG4gICAgICAgIE1vZHVsZVsncHJlUnVuJ10gPSBbTW9kdWxlWydwcmVSdW4nXV1cbiAgICAgIHdoaWxlIChNb2R1bGVbJ3ByZVJ1biddLmxlbmd0aCkge1xuICAgICAgICBhZGRPblByZVJ1bihNb2R1bGVbJ3ByZVJ1biddLnNoaWZ0KCkpXG4gICAgICB9XG4gICAgfVxuXG4gICAgY2FsbFJ1bnRpbWVDYWxsYmFja3MoX19BVFBSRVJVTl9fKVxuICB9XG5cbiAgZnVuY3Rpb24gaW5pdFJ1bnRpbWUoKSB7XG4gICAgYXNzZXJ0KCFydW50aW1lSW5pdGlhbGl6ZWQpXG4gICAgcnVudGltZUluaXRpYWxpemVkID0gdHJ1ZVxuXG4gICAgY2hlY2tTdGFja0Nvb2tpZSgpXG5cbiAgICBpZiAoIU1vZHVsZVsnbm9GU0luaXQnXSAmJiAhRlMuaW5pdC5pbml0aWFsaXplZCkgRlMuaW5pdCgpXG4gICAgRlMuaWdub3JlUGVybWlzc2lvbnMgPSBmYWxzZVxuXG4gICAgVFRZLmluaXQoKVxuICAgIGNhbGxSdW50aW1lQ2FsbGJhY2tzKF9fQVRJTklUX18pXG4gIH1cblxuICBmdW5jdGlvbiBwcmVNYWluKCkge1xuICAgIGNoZWNrU3RhY2tDb29raWUoKVxuXG4gICAgY2FsbFJ1bnRpbWVDYWxsYmFja3MoX19BVE1BSU5fXylcbiAgfVxuXG4gIGZ1bmN0aW9uIGV4aXRSdW50aW1lKCkge1xuICAgIGNoZWNrU3RhY2tDb29raWUoKVxuICAgIF9fX2Z1bmNzX29uX2V4aXQoKSAvLyBOYXRpdmUgYXRleGl0KCkgZnVuY3Rpb25zXG4gICAgY2FsbFJ1bnRpbWVDYWxsYmFja3MoX19BVEVYSVRfXylcbiAgICBGUy5xdWl0KClcbiAgICBUVFkuc2h1dGRvd24oKVxuICAgIHJ1bnRpbWVFeGl0ZWQgPSB0cnVlXG4gIH1cblxuICBmdW5jdGlvbiBwb3N0UnVuKCkge1xuICAgIGNoZWNrU3RhY2tDb29raWUoKVxuXG4gICAgaWYgKE1vZHVsZVsncG9zdFJ1biddKSB7XG4gICAgICBpZiAodHlwZW9mIE1vZHVsZVsncG9zdFJ1biddID09ICdmdW5jdGlvbicpXG4gICAgICAgIE1vZHVsZVsncG9zdFJ1biddID0gW01vZHVsZVsncG9zdFJ1biddXVxuICAgICAgd2hpbGUgKE1vZHVsZVsncG9zdFJ1biddLmxlbmd0aCkge1xuICAgICAgICBhZGRPblBvc3RSdW4oTW9kdWxlWydwb3N0UnVuJ10uc2hpZnQoKSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjYWxsUnVudGltZUNhbGxiYWNrcyhfX0FUUE9TVFJVTl9fKVxuICB9XG5cbiAgZnVuY3Rpb24gYWRkT25QcmVSdW4oY2IpIHtcbiAgICBfX0FUUFJFUlVOX18udW5zaGlmdChjYilcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZE9uSW5pdChjYikge1xuICAgIF9fQVRJTklUX18udW5zaGlmdChjYilcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZE9uUHJlTWFpbihjYikge1xuICAgIF9fQVRNQUlOX18udW5zaGlmdChjYilcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZE9uRXhpdChjYikge1xuICAgIF9fQVRFWElUX18udW5zaGlmdChjYilcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZE9uUG9zdFJ1bihjYikge1xuICAgIF9fQVRQT1NUUlVOX18udW5zaGlmdChjYilcbiAgfVxuXG4gIC8vIGluY2x1ZGU6IHJ1bnRpbWVfbWF0aC5qc1xuXG4gIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL01hdGgvaW11bFxuXG4gIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL01hdGgvZnJvdW5kXG5cbiAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvTWF0aC9jbHozMlxuXG4gIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL01hdGgvdHJ1bmNcblxuICBhc3NlcnQoXG4gICAgTWF0aC5pbXVsLFxuICAgICdUaGlzIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBNYXRoLmltdWwoKSwgYnVpbGQgd2l0aCBMRUdBQ1lfVk1fU1VQUE9SVCBvciBQT0xZRklMTF9PTERfTUFUSF9GVU5DVElPTlMgdG8gYWRkIGluIGEgcG9seWZpbGwnXG4gIClcbiAgYXNzZXJ0KFxuICAgIE1hdGguZnJvdW5kLFxuICAgICdUaGlzIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBNYXRoLmZyb3VuZCgpLCBidWlsZCB3aXRoIExFR0FDWV9WTV9TVVBQT1JUIG9yIFBPTFlGSUxMX09MRF9NQVRIX0ZVTkNUSU9OUyB0byBhZGQgaW4gYSBwb2x5ZmlsbCdcbiAgKVxuICBhc3NlcnQoXG4gICAgTWF0aC5jbHozMixcbiAgICAnVGhpcyBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgTWF0aC5jbHozMigpLCBidWlsZCB3aXRoIExFR0FDWV9WTV9TVVBQT1JUIG9yIFBPTFlGSUxMX09MRF9NQVRIX0ZVTkNUSU9OUyB0byBhZGQgaW4gYSBwb2x5ZmlsbCdcbiAgKVxuICBhc3NlcnQoXG4gICAgTWF0aC50cnVuYyxcbiAgICAnVGhpcyBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgTWF0aC50cnVuYygpLCBidWlsZCB3aXRoIExFR0FDWV9WTV9TVVBQT1JUIG9yIFBPTFlGSUxMX09MRF9NQVRIX0ZVTkNUSU9OUyB0byBhZGQgaW4gYSBwb2x5ZmlsbCdcbiAgKVxuXG4gIC8vIGVuZCBpbmNsdWRlOiBydW50aW1lX21hdGguanNcbiAgLy8gQSBjb3VudGVyIG9mIGRlcGVuZGVuY2llcyBmb3IgY2FsbGluZyBydW4oKS4gSWYgd2UgbmVlZCB0b1xuICAvLyBkbyBhc3luY2hyb25vdXMgd29yayBiZWZvcmUgcnVubmluZywgaW5jcmVtZW50IHRoaXMgYW5kXG4gIC8vIGRlY3JlbWVudCBpdC4gSW5jcmVtZW50aW5nIG11c3QgaGFwcGVuIGluIGEgcGxhY2UgbGlrZVxuICAvLyBNb2R1bGUucHJlUnVuICh1c2VkIGJ5IGVtY2MgdG8gYWRkIGZpbGUgcHJlbG9hZGluZykuXG4gIC8vIE5vdGUgdGhhdCB5b3UgY2FuIGFkZCBkZXBlbmRlbmNpZXMgaW4gcHJlUnVuLCBldmVuIHRob3VnaFxuICAvLyBpdCBoYXBwZW5zIHJpZ2h0IGJlZm9yZSBydW4gLSBydW4gd2lsbCBiZSBwb3N0cG9uZWQgdW50aWxcbiAgLy8gdGhlIGRlcGVuZGVuY2llcyBhcmUgbWV0LlxuICB2YXIgcnVuRGVwZW5kZW5jaWVzID0gMFxuICB2YXIgcnVuRGVwZW5kZW5jeVdhdGNoZXIgPSBudWxsXG4gIHZhciBkZXBlbmRlbmNpZXNGdWxmaWxsZWQgPSBudWxsIC8vIG92ZXJyaWRkZW4gdG8gdGFrZSBkaWZmZXJlbnQgYWN0aW9ucyB3aGVuIGFsbCBydW4gZGVwZW5kZW5jaWVzIGFyZSBmdWxmaWxsZWRcbiAgdmFyIHJ1bkRlcGVuZGVuY3lUcmFja2luZyA9IHt9XG5cbiAgZnVuY3Rpb24gZ2V0VW5pcXVlUnVuRGVwZW5kZW5jeShpZCkge1xuICAgIHZhciBvcmlnID0gaWRcbiAgICB3aGlsZSAoMSkge1xuICAgICAgaWYgKCFydW5EZXBlbmRlbmN5VHJhY2tpbmdbaWRdKSByZXR1cm4gaWRcbiAgICAgIGlkID0gb3JpZyArIE1hdGgucmFuZG9tKClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBhZGRSdW5EZXBlbmRlbmN5KGlkKSB7XG4gICAgcnVuRGVwZW5kZW5jaWVzKytcblxuICAgIGlmIChNb2R1bGVbJ21vbml0b3JSdW5EZXBlbmRlbmNpZXMnXSkge1xuICAgICAgTW9kdWxlWydtb25pdG9yUnVuRGVwZW5kZW5jaWVzJ10ocnVuRGVwZW5kZW5jaWVzKVxuICAgIH1cblxuICAgIGlmIChpZCkge1xuICAgICAgYXNzZXJ0KCFydW5EZXBlbmRlbmN5VHJhY2tpbmdbaWRdKVxuICAgICAgcnVuRGVwZW5kZW5jeVRyYWNraW5nW2lkXSA9IDFcbiAgICAgIGlmIChydW5EZXBlbmRlbmN5V2F0Y2hlciA9PT0gbnVsbCAmJiB0eXBlb2Ygc2V0SW50ZXJ2YWwgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgLy8gQ2hlY2sgZm9yIG1pc3NpbmcgZGVwZW5kZW5jaWVzIGV2ZXJ5IGZldyBzZWNvbmRzXG4gICAgICAgIHJ1bkRlcGVuZGVuY3lXYXRjaGVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmIChBQk9SVCkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChydW5EZXBlbmRlbmN5V2F0Y2hlcilcbiAgICAgICAgICAgIHJ1bkRlcGVuZGVuY3lXYXRjaGVyID0gbnVsbFxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBzaG93biA9IGZhbHNlXG4gICAgICAgICAgZm9yICh2YXIgZGVwIGluIHJ1bkRlcGVuZGVuY3lUcmFja2luZykge1xuICAgICAgICAgICAgaWYgKCFzaG93bikge1xuICAgICAgICAgICAgICBzaG93biA9IHRydWVcbiAgICAgICAgICAgICAgZXJyKCdzdGlsbCB3YWl0aW5nIG9uIHJ1biBkZXBlbmRlbmNpZXM6JylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVycignZGVwZW5kZW5jeTogJyArIGRlcClcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHNob3duKSB7XG4gICAgICAgICAgICBlcnIoJyhlbmQgb2YgbGlzdCknKVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgMTAwMDApXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGVycignd2FybmluZzogcnVuIGRlcGVuZGVuY3kgYWRkZWQgd2l0aG91dCBJRCcpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlUnVuRGVwZW5kZW5jeShpZCkge1xuICAgIHJ1bkRlcGVuZGVuY2llcy0tXG5cbiAgICBpZiAoTW9kdWxlWydtb25pdG9yUnVuRGVwZW5kZW5jaWVzJ10pIHtcbiAgICAgIE1vZHVsZVsnbW9uaXRvclJ1bkRlcGVuZGVuY2llcyddKHJ1bkRlcGVuZGVuY2llcylcbiAgICB9XG5cbiAgICBpZiAoaWQpIHtcbiAgICAgIGFzc2VydChydW5EZXBlbmRlbmN5VHJhY2tpbmdbaWRdKVxuICAgICAgZGVsZXRlIHJ1bkRlcGVuZGVuY3lUcmFja2luZ1tpZF1cbiAgICB9IGVsc2Uge1xuICAgICAgZXJyKCd3YXJuaW5nOiBydW4gZGVwZW5kZW5jeSByZW1vdmVkIHdpdGhvdXQgSUQnKVxuICAgIH1cbiAgICBpZiAocnVuRGVwZW5kZW5jaWVzID09IDApIHtcbiAgICAgIGlmIChydW5EZXBlbmRlbmN5V2F0Y2hlciAhPT0gbnVsbCkge1xuICAgICAgICBjbGVhckludGVydmFsKHJ1bkRlcGVuZGVuY3lXYXRjaGVyKVxuICAgICAgICBydW5EZXBlbmRlbmN5V2F0Y2hlciA9IG51bGxcbiAgICAgIH1cbiAgICAgIGlmIChkZXBlbmRlbmNpZXNGdWxmaWxsZWQpIHtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gZGVwZW5kZW5jaWVzRnVsZmlsbGVkXG4gICAgICAgIGRlcGVuZGVuY2llc0Z1bGZpbGxlZCA9IG51bGxcbiAgICAgICAgY2FsbGJhY2soKSAvLyBjYW4gYWRkIGFub3RoZXIgZGVwZW5kZW5jaWVzRnVsZmlsbGVkXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwYXJhbSB7c3RyaW5nfG51bWJlcj19IHdoYXQgKi9cbiAgZnVuY3Rpb24gYWJvcnQod2hhdCkge1xuICAgIHtcbiAgICAgIGlmIChNb2R1bGVbJ29uQWJvcnQnXSkge1xuICAgICAgICBNb2R1bGVbJ29uQWJvcnQnXSh3aGF0KVxuICAgICAgfVxuICAgIH1cblxuICAgIHdoYXQgPSAnQWJvcnRlZCgnICsgd2hhdCArICcpJ1xuICAgIC8vIFRPRE8oc2JjKTogU2hvdWxkIHdlIHJlbW92ZSBwcmludGluZyBhbmQgbGVhdmUgaXQgdXAgdG8gd2hvZXZlclxuICAgIC8vIGNhdGNoZXMgdGhlIGV4Y2VwdGlvbj9cbiAgICBlcnIod2hhdClcblxuICAgIEFCT1JUID0gdHJ1ZVxuICAgIEVYSVRTVEFUVVMgPSAxXG5cbiAgICAvLyBVc2UgYSB3YXNtIHJ1bnRpbWUgZXJyb3IsIGJlY2F1c2UgYSBKUyBlcnJvciBtaWdodCBiZSBzZWVuIGFzIGEgZm9yZWlnblxuICAgIC8vIGV4Y2VwdGlvbiwgd2hpY2ggbWVhbnMgd2UnZCBydW4gZGVzdHJ1Y3RvcnMgb24gaXQuIFdlIG5lZWQgdGhlIGVycm9yIHRvXG4gICAgLy8gc2ltcGx5IG1ha2UgdGhlIHByb2dyYW0gc3RvcC5cbiAgICAvLyBGSVhNRSBUaGlzIGFwcHJvYWNoIGRvZXMgbm90IHdvcmsgaW4gV2FzbSBFSCBiZWNhdXNlIGl0IGN1cnJlbnRseSBkb2VzIG5vdCBhc3N1bWVcbiAgICAvLyBhbGwgUnVudGltZUVycm9ycyBhcmUgZnJvbSB0cmFwczsgaXQgZGVjaWRlcyB3aGV0aGVyIGEgUnVudGltZUVycm9yIGlzIGZyb21cbiAgICAvLyBhIHRyYXAgb3Igbm90IGJhc2VkIG9uIGEgaGlkZGVuIGZpZWxkIHdpdGhpbiB0aGUgb2JqZWN0LiBTbyBhdCB0aGUgbW9tZW50XG4gICAgLy8gd2UgZG9uJ3QgaGF2ZSBhIHdheSBvZiB0aHJvd2luZyBhIHdhc20gdHJhcCBmcm9tIEpTLiBUT0RPIE1ha2UgYSBKUyBBUEkgdGhhdFxuICAgIC8vIGFsbG93cyB0aGlzIGluIHRoZSB3YXNtIHNwZWMuXG5cbiAgICAvLyBTdXBwcmVzcyBjbG9zdXJlIGNvbXBpbGVyIHdhcm5pbmcgaGVyZS4gQ2xvc3VyZSBjb21waWxlcidzIGJ1aWx0aW4gZXh0ZXJuXG4gICAgLy8gZGVmaW50aW9uIGZvciBXZWJBc3NlbWJseS5SdW50aW1lRXJyb3IgY2xhaW1zIGl0IHRha2VzIG5vIGFyZ3VtZW50cyBldmVuXG4gICAgLy8gdGhvdWdoIGl0IGNhbi5cbiAgICAvLyBUT0RPKGh0dHBzOi8vZ2l0aHViLmNvbS9nb29nbGUvY2xvc3VyZS1jb21waWxlci9wdWxsLzM5MTMpOiBSZW1vdmUgaWYvd2hlbiB1cHN0cmVhbSBjbG9zdXJlIGdldHMgZml4ZWQuXG4gICAgLyoqIEBzdXBwcmVzcyB7Y2hlY2tUeXBlc30gKi9cbiAgICB2YXIgZSA9IG5ldyBXZWJBc3NlbWJseS5SdW50aW1lRXJyb3Iod2hhdClcblxuICAgIC8vIFRocm93IHRoZSBlcnJvciB3aGV0aGVyIG9yIG5vdCBNT0RVTEFSSVpFIGlzIHNldCBiZWNhdXNlIGFib3J0IGlzIHVzZWRcbiAgICAvLyBpbiBjb2RlIHBhdGhzIGFwYXJ0IGZyb20gaW5zdGFudGlhdGlvbiB3aGVyZSBhbiBleGNlcHRpb24gaXMgZXhwZWN0ZWRcbiAgICAvLyB0byBiZSB0aHJvd24gd2hlbiBhYm9ydCBpcyBjYWxsZWQuXG4gICAgdGhyb3cgZVxuICB9XG5cbiAgLy8ge3tNRU1fSU5JVElBTElaRVJ9fVxuXG4gIC8vIGluY2x1ZGU6IG1lbW9yeXByb2ZpbGVyLmpzXG5cbiAgLy8gZW5kIGluY2x1ZGU6IG1lbW9yeXByb2ZpbGVyLmpzXG4gIC8vIGluY2x1ZGU6IFVSSVV0aWxzLmpzXG5cbiAgLy8gUHJlZml4IG9mIGRhdGEgVVJJcyBlbWl0dGVkIGJ5IFNJTkdMRV9GSUxFIGFuZCByZWxhdGVkIG9wdGlvbnMuXG4gIHZhciBkYXRhVVJJUHJlZml4ID0gJ2RhdGE6YXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtO2Jhc2U2NCwnXG5cbiAgLy8gSW5kaWNhdGVzIHdoZXRoZXIgZmlsZW5hbWUgaXMgYSBiYXNlNjQgZGF0YSBVUkkuXG4gIGZ1bmN0aW9uIGlzRGF0YVVSSShmaWxlbmFtZSkge1xuICAgIC8vIFByZWZpeCBvZiBkYXRhIFVSSXMgZW1pdHRlZCBieSBTSU5HTEVfRklMRSBhbmQgcmVsYXRlZCBvcHRpb25zLlxuICAgIHJldHVybiBmaWxlbmFtZS5zdGFydHNXaXRoKGRhdGFVUklQcmVmaXgpXG4gIH1cblxuICAvLyBJbmRpY2F0ZXMgd2hldGhlciBmaWxlbmFtZSBpcyBkZWxpdmVyZWQgdmlhIGZpbGUgcHJvdG9jb2wgKGFzIG9wcG9zZWQgdG8gaHR0cC9odHRwcylcbiAgZnVuY3Rpb24gaXNGaWxlVVJJKGZpbGVuYW1lKSB7XG4gICAgcmV0dXJuIGZpbGVuYW1lLnN0YXJ0c1dpdGgoJ2ZpbGU6Ly8nKVxuICB9XG5cbiAgLy8gZW5kIGluY2x1ZGU6IFVSSVV0aWxzLmpzXG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW49fSBmaXhlZGFzbSAqL1xuICBmdW5jdGlvbiBjcmVhdGVFeHBvcnRXcmFwcGVyKG5hbWUsIGZpeGVkYXNtKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBkaXNwbGF5TmFtZSA9IG5hbWVcbiAgICAgIHZhciBhc20gPSBmaXhlZGFzbVxuICAgICAgaWYgKCFmaXhlZGFzbSkge1xuICAgICAgICBhc20gPSBNb2R1bGVbJ2FzbSddXG4gICAgICB9XG4gICAgICBhc3NlcnQoXG4gICAgICAgIHJ1bnRpbWVJbml0aWFsaXplZCxcbiAgICAgICAgJ25hdGl2ZSBmdW5jdGlvbiBgJyArXG4gICAgICAgICAgZGlzcGxheU5hbWUgK1xuICAgICAgICAgICdgIGNhbGxlZCBiZWZvcmUgcnVudGltZSBpbml0aWFsaXphdGlvbidcbiAgICAgIClcbiAgICAgIGFzc2VydChcbiAgICAgICAgIXJ1bnRpbWVFeGl0ZWQsXG4gICAgICAgICduYXRpdmUgZnVuY3Rpb24gYCcgK1xuICAgICAgICAgIGRpc3BsYXlOYW1lICtcbiAgICAgICAgICAnYCBjYWxsZWQgYWZ0ZXIgcnVudGltZSBleGl0ICh1c2UgTk9fRVhJVF9SVU5USU1FIHRvIGtlZXAgaXQgYWxpdmUgYWZ0ZXIgbWFpbigpIGV4aXRzKSdcbiAgICAgIClcbiAgICAgIGlmICghYXNtW25hbWVdKSB7XG4gICAgICAgIGFzc2VydChcbiAgICAgICAgICBhc21bbmFtZV0sXG4gICAgICAgICAgJ2V4cG9ydGVkIG5hdGl2ZSBmdW5jdGlvbiBgJyArIGRpc3BsYXlOYW1lICsgJ2Agbm90IGZvdW5kJ1xuICAgICAgICApXG4gICAgICB9XG4gICAgICByZXR1cm4gYXNtW25hbWVdLmFwcGx5KG51bGwsIGFyZ3VtZW50cylcbiAgICB9XG4gIH1cblxuICB2YXIgd2FzbUJpbmFyeUZpbGVcbiAgd2FzbUJpbmFyeUZpbGUgPSAnaHR0cHM6Ly9jZG4uZmxpcHBlci5uZXQvbWZrZXkud2FzbSdcbiAgLyppZiAoIWlzRGF0YVVSSSh3YXNtQmluYXJ5RmlsZSkpIHtcbiAgICB3YXNtQmluYXJ5RmlsZSA9IGxvY2F0ZUZpbGUod2FzbUJpbmFyeUZpbGUpO1xuICB9Ki9cblxuICBmdW5jdGlvbiBnZXRCaW5hcnkoZmlsZSkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoZmlsZSA9PSB3YXNtQmluYXJ5RmlsZSAmJiB3YXNtQmluYXJ5KSB7XG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheSh3YXNtQmluYXJ5KVxuICAgICAgfVxuICAgICAgaWYgKHJlYWRCaW5hcnkpIHtcbiAgICAgICAgcmV0dXJuIHJlYWRCaW5hcnkoZmlsZSlcbiAgICAgIH1cbiAgICAgIHRocm93ICdib3RoIGFzeW5jIGFuZCBzeW5jIGZldGNoaW5nIG9mIHRoZSB3YXNtIGZhaWxlZCdcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGFib3J0KGVycilcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRCaW5hcnlQcm9taXNlKCkge1xuICAgIC8vIElmIHdlIGRvbid0IGhhdmUgdGhlIGJpbmFyeSB5ZXQsIHRyeSB0byB0byBsb2FkIGl0IGFzeW5jaHJvbm91c2x5LlxuICAgIC8vIEZldGNoIGhhcyBzb21lIGFkZGl0aW9uYWwgcmVzdHJpY3Rpb25zIG92ZXIgWEhSLCBsaWtlIGl0IGNhbid0IGJlIHVzZWQgb24gYSBmaWxlOi8vIHVybC5cbiAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2dpdGh1Yi9mZXRjaC9wdWxsLzkyI2lzc3VlY29tbWVudC0xNDA2NjU5MzJcbiAgICAvLyBDb3Jkb3ZhIG9yIEVsZWN0cm9uIGFwcHMgYXJlIHR5cGljYWxseSBsb2FkZWQgZnJvbSBhIGZpbGU6Ly8gdXJsLlxuICAgIC8vIFNvIHVzZSBmZXRjaCBpZiBpdCBpcyBhdmFpbGFibGUgYW5kIHRoZSB1cmwgaXMgbm90IGEgZmlsZSwgb3RoZXJ3aXNlIGZhbGwgYmFjayB0byBYSFIuXG4gICAgaWYgKCF3YXNtQmluYXJ5ICYmIChFTlZJUk9OTUVOVF9JU19XRUIgfHwgRU5WSVJPTk1FTlRfSVNfV09SS0VSKSkge1xuICAgICAgaWYgKHR5cGVvZiBmZXRjaCA9PSAnZnVuY3Rpb24nICYmICFpc0ZpbGVVUkkod2FzbUJpbmFyeUZpbGUpKSB7XG4gICAgICAgIHJldHVybiBmZXRjaCh3YXNtQmluYXJ5RmlsZSwgeyBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyB9KVxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgaWYgKCFyZXNwb25zZVsnb2snXSkge1xuICAgICAgICAgICAgICB0aHJvdyAoXG4gICAgICAgICAgICAgICAgXCJmYWlsZWQgdG8gbG9hZCB3YXNtIGJpbmFyeSBmaWxlIGF0ICdcIiArIHdhc21CaW5hcnlGaWxlICsgXCInXCJcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlWydhcnJheUJ1ZmZlciddKClcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0QmluYXJ5KHdhc21CaW5hcnlGaWxlKVxuICAgICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAocmVhZEFzeW5jKSB7XG4gICAgICAgICAgLy8gZmV0Y2ggaXMgbm90IGF2YWlsYWJsZSBvciB1cmwgaXMgZmlsZSA9PiB0cnkgWEhSIChyZWFkQXN5bmMgdXNlcyBYSFIgaW50ZXJuYWxseSlcbiAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgcmVhZEFzeW5jKFxuICAgICAgICAgICAgICB3YXNtQmluYXJ5RmlsZSxcbiAgICAgICAgICAgICAgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShuZXcgVWludDhBcnJheSgvKiogQHR5cGV7IUFycmF5QnVmZmVyfSAqLyAocmVzcG9uc2UpKSlcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgcmVqZWN0XG4gICAgICAgICAgICApXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIE90aGVyd2lzZSwgZ2V0QmluYXJ5IHNob3VsZCBiZSBhYmxlIHRvIGdldCBpdCBzeW5jaHJvbm91c2x5XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGdldEJpbmFyeSh3YXNtQmluYXJ5RmlsZSlcbiAgICB9KVxuICB9XG5cbiAgLy8gQ3JlYXRlIHRoZSB3YXNtIGluc3RhbmNlLlxuICAvLyBSZWNlaXZlcyB0aGUgd2FzbSBpbXBvcnRzLCByZXR1cm5zIHRoZSBleHBvcnRzLlxuICBmdW5jdGlvbiBjcmVhdGVXYXNtKCkge1xuICAgIC8vIHByZXBhcmUgaW1wb3J0c1xuICAgIHZhciBpbmZvID0ge1xuICAgICAgZW52OiBhc21MaWJyYXJ5QXJnLFxuICAgICAgd2FzaV9zbmFwc2hvdF9wcmV2aWV3MTogYXNtTGlicmFyeUFyZ1xuICAgIH1cbiAgICAvLyBMb2FkIHRoZSB3YXNtIG1vZHVsZSBhbmQgY3JlYXRlIGFuIGluc3RhbmNlIG9mIHVzaW5nIG5hdGl2ZSBzdXBwb3J0IGluIHRoZSBKUyBlbmdpbmUuXG4gICAgLy8gaGFuZGxlIGEgZ2VuZXJhdGVkIHdhc20gaW5zdGFuY2UsIHJlY2VpdmluZyBpdHMgZXhwb3J0cyBhbmRcbiAgICAvLyBwZXJmb3JtaW5nIG90aGVyIG5lY2Vzc2FyeSBzZXR1cFxuICAgIC8qKiBAcGFyYW0ge1dlYkFzc2VtYmx5Lk1vZHVsZT19IG1vZHVsZSovXG4gICAgZnVuY3Rpb24gcmVjZWl2ZUluc3RhbmNlKGluc3RhbmNlLCBtb2R1bGUpIHtcbiAgICAgIHZhciBleHBvcnRzID0gaW5zdGFuY2UuZXhwb3J0c1xuXG4gICAgICBNb2R1bGVbJ2FzbSddID0gZXhwb3J0c1xuXG4gICAgICB3YXNtTWVtb3J5ID0gTW9kdWxlWydhc20nXVsnbWVtb3J5J11cbiAgICAgIGFzc2VydCh3YXNtTWVtb3J5LCAnbWVtb3J5IG5vdCBmb3VuZCBpbiB3YXNtIGV4cG9ydHMnKVxuICAgICAgLy8gVGhpcyBhc3NlcnRpb24gZG9lc24ndCBob2xkIHdoZW4gZW1zY3JpcHRlbiBpcyBydW4gaW4gLS1wb3N0LWxpbmtcbiAgICAgIC8vIG1vZGUuXG4gICAgICAvLyBUT0RPKHNiYyk6IFJlYWQgSU5JVElBTF9NRU1PUlkgb3V0IG9mIHRoZSB3YXNtIGZpbGUgaW4gcG9zdC1saW5rIG1vZGUuXG4gICAgICAvL2Fzc2VydCh3YXNtTWVtb3J5LmJ1ZmZlci5ieXRlTGVuZ3RoID09PSAxNjc3NzIxNik7XG4gICAgICB1cGRhdGVHbG9iYWxCdWZmZXJBbmRWaWV3cyh3YXNtTWVtb3J5LmJ1ZmZlcilcblxuICAgICAgd2FzbVRhYmxlID0gTW9kdWxlWydhc20nXVsnX19pbmRpcmVjdF9mdW5jdGlvbl90YWJsZSddXG4gICAgICBhc3NlcnQod2FzbVRhYmxlLCAndGFibGUgbm90IGZvdW5kIGluIHdhc20gZXhwb3J0cycpXG5cbiAgICAgIGFkZE9uSW5pdChNb2R1bGVbJ2FzbSddWydfX3dhc21fY2FsbF9jdG9ycyddKVxuXG4gICAgICByZW1vdmVSdW5EZXBlbmRlbmN5KCd3YXNtLWluc3RhbnRpYXRlJylcbiAgICB9XG4gICAgLy8gd2UgY2FuJ3QgcnVuIHlldCAoZXhjZXB0IGluIGEgcHRocmVhZCwgd2hlcmUgd2UgaGF2ZSBhIGN1c3RvbSBzeW5jIGluc3RhbnRpYXRvcilcbiAgICBhZGRSdW5EZXBlbmRlbmN5KCd3YXNtLWluc3RhbnRpYXRlJylcblxuICAgIC8vIFByZWZlciBzdHJlYW1pbmcgaW5zdGFudGlhdGlvbiBpZiBhdmFpbGFibGUuXG4gICAgLy8gQXN5bmMgY29tcGlsYXRpb24gY2FuIGJlIGNvbmZ1c2luZyB3aGVuIGFuIGVycm9yIG9uIHRoZSBwYWdlIG92ZXJ3cml0ZXMgTW9kdWxlXG4gICAgLy8gKGZvciBleGFtcGxlLCBpZiB0aGUgb3JkZXIgb2YgZWxlbWVudHMgaXMgd3JvbmcsIGFuZCB0aGUgb25lIGRlZmluaW5nIE1vZHVsZSBpc1xuICAgIC8vIGxhdGVyKSwgc28gd2Ugc2F2ZSBNb2R1bGUgYW5kIGNoZWNrIGl0IGxhdGVyLlxuICAgIHZhciB0cnVlTW9kdWxlID0gTW9kdWxlXG4gICAgZnVuY3Rpb24gcmVjZWl2ZUluc3RhbnRpYXRpb25SZXN1bHQocmVzdWx0KSB7XG4gICAgICAvLyAncmVzdWx0JyBpcyBhIFJlc3VsdE9iamVjdCBvYmplY3Qgd2hpY2ggaGFzIGJvdGggdGhlIG1vZHVsZSBhbmQgaW5zdGFuY2UuXG4gICAgICAvLyByZWNlaXZlSW5zdGFuY2UoKSB3aWxsIHN3YXAgaW4gdGhlIGV4cG9ydHMgKHRvIE1vZHVsZS5hc20pIHNvIHRoZXkgY2FuIGJlIGNhbGxlZFxuICAgICAgYXNzZXJ0KFxuICAgICAgICBNb2R1bGUgPT09IHRydWVNb2R1bGUsXG4gICAgICAgICd0aGUgTW9kdWxlIG9iamVjdCBzaG91bGQgbm90IGJlIHJlcGxhY2VkIGR1cmluZyBhc3luYyBjb21waWxhdGlvbiAtIHBlcmhhcHMgdGhlIG9yZGVyIG9mIEhUTUwgZWxlbWVudHMgaXMgd3Jvbmc/J1xuICAgICAgKVxuICAgICAgdHJ1ZU1vZHVsZSA9IG51bGxcbiAgICAgIC8vIFRPRE86IER1ZSB0byBDbG9zdXJlIHJlZ3Jlc3Npb24gaHR0cHM6Ly9naXRodWIuY29tL2dvb2dsZS9jbG9zdXJlLWNvbXBpbGVyL2lzc3Vlcy8zMTkzLCB0aGUgYWJvdmUgbGluZSBubyBsb25nZXIgb3B0aW1pemVzIG91dCBkb3duIHRvIHRoZSBmb2xsb3dpbmcgbGluZS5cbiAgICAgIC8vIFdoZW4gdGhlIHJlZ3Jlc3Npb24gaXMgZml4ZWQsIGNhbiByZXN0b3JlIHRoZSBhYm92ZSBVU0VfUFRIUkVBRFMtZW5hYmxlZCBwYXRoLlxuICAgICAgcmVjZWl2ZUluc3RhbmNlKHJlc3VsdFsnaW5zdGFuY2UnXSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YW50aWF0ZUFycmF5QnVmZmVyKHJlY2VpdmVyKSB7XG4gICAgICByZXR1cm4gZ2V0QmluYXJ5UHJvbWlzZSgpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChiaW5hcnkpIHtcbiAgICAgICAgICByZXR1cm4gV2ViQXNzZW1ibHkuaW5zdGFudGlhdGUoYmluYXJ5LCBpbmZvKVxuICAgICAgICB9KVxuICAgICAgICAudGhlbihmdW5jdGlvbiAoaW5zdGFuY2UpIHtcbiAgICAgICAgICByZXR1cm4gaW5zdGFuY2VcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVjZWl2ZXIsIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgICAgICBlcnIoJ2ZhaWxlZCB0byBhc3luY2hyb25vdXNseSBwcmVwYXJlIHdhc206ICcgKyByZWFzb24pXG5cbiAgICAgICAgICAvLyBXYXJuIG9uIHNvbWUgY29tbW9uIHByb2JsZW1zLlxuICAgICAgICAgIGlmIChpc0ZpbGVVUkkod2FzbUJpbmFyeUZpbGUpKSB7XG4gICAgICAgICAgICBlcnIoXG4gICAgICAgICAgICAgICd3YXJuaW5nOiBMb2FkaW5nIGZyb20gYSBmaWxlIFVSSSAoJyArXG4gICAgICAgICAgICAgICAgd2FzbUJpbmFyeUZpbGUgK1xuICAgICAgICAgICAgICAgICcpIGlzIG5vdCBzdXBwb3J0ZWQgaW4gbW9zdCBicm93c2Vycy4gU2VlIGh0dHBzOi8vZW1zY3JpcHRlbi5vcmcvZG9jcy9nZXR0aW5nX3N0YXJ0ZWQvRkFRLmh0bWwjaG93LWRvLWktcnVuLWEtbG9jYWwtd2Vic2VydmVyLWZvci10ZXN0aW5nLXdoeS1kb2VzLW15LXByb2dyYW0tc3RhbGwtaW4tZG93bmxvYWRpbmctb3ItcHJlcGFyaW5nJ1xuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgICBhYm9ydChyZWFzb24pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFudGlhdGVBc3luYygpIHtcbiAgICAgIGlmIChcbiAgICAgICAgIXdhc21CaW5hcnkgJiZcbiAgICAgICAgdHlwZW9mIFdlYkFzc2VtYmx5Lmluc3RhbnRpYXRlU3RyZWFtaW5nID09ICdmdW5jdGlvbicgJiZcbiAgICAgICAgIWlzRGF0YVVSSSh3YXNtQmluYXJ5RmlsZSkgJiZcbiAgICAgICAgLy8gRG9uJ3QgdXNlIHN0cmVhbWluZyBmb3IgZmlsZTovLyBkZWxpdmVyZWQgb2JqZWN0cyBpbiBhIHdlYnZpZXcsIGZldGNoIHRoZW0gc3luY2hyb25vdXNseS5cbiAgICAgICAgIWlzRmlsZVVSSSh3YXNtQmluYXJ5RmlsZSkgJiZcbiAgICAgICAgLy8gQXZvaWQgaW5zdGFudGlhdGVTdHJlYW1pbmcoKSBvbiBOb2RlLmpzIGVudmlyb25tZW50IGZvciBub3csIGFzIHdoaWxlXG4gICAgICAgIC8vIE5vZGUuanMgdjE4LjEuMCBpbXBsZW1lbnRzIGl0LCBpdCBkb2VzIG5vdCBoYXZlIGEgZnVsbCBmZXRjaCgpXG4gICAgICAgIC8vIGltcGxlbWVudGF0aW9uIHlldC5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gUmVmZXJlbmNlOlxuICAgICAgICAvLyAgIGh0dHBzOi8vZ2l0aHViLmNvbS9lbXNjcmlwdGVuLWNvcmUvZW1zY3JpcHRlbi9wdWxsLzE2OTE3XG4gICAgICAgICFFTlZJUk9OTUVOVF9JU19OT0RFICYmXG4gICAgICAgIHR5cGVvZiBmZXRjaCA9PSAnZnVuY3Rpb24nXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKHdhc21CaW5hcnlGaWxlLCB7IGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nIH0pXG4gICAgICAgICAgLnRoZW4oYXN5bmMgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgZXJyKGBmYWlsZWQgdG8gbG9hZCB3YXNtIGJpbmFyeSBmaWxlICR7cmVzcG9uc2Uuc3RhdHVzfWApXG4gICAgICAgICAgICAgIGFib3J0KHJlc3BvbnNlLnN0YXR1cylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGJ1ZmZlciA9IGF3YWl0IHJlc3BvbnNlLmFycmF5QnVmZmVyKClcbiAgICAgICAgICAgIC8vIFN1cHByZXNzIGNsb3N1cmUgd2FybmluZyBoZXJlIHNpbmNlIHRoZSB1cHN0cmVhbSBkZWZpbml0aW9uIGZvclxuICAgICAgICAgICAgLy8gaW5zdGFudGlhdGVTdHJlYW1pbmcgb25seSBhbGxvd3MgUHJvbWlzZTxSZXBzcG9uc2U+IHJhdGhlciB0aGFuXG4gICAgICAgICAgICAvLyBhbiBhY3R1YWwgUmVzcG9uc2UuXG4gICAgICAgICAgICAvLyBUT0RPKGh0dHBzOi8vZ2l0aHViLmNvbS9nb29nbGUvY2xvc3VyZS1jb21waWxlci9wdWxsLzM5MTMpOiBSZW1vdmUgaWYvd2hlbiB1cHN0cmVhbSBjbG9zdXJlIGlzIGZpeGVkLlxuICAgICAgICAgICAgLyoqIEBzdXBwcmVzcyB7Y2hlY2tUeXBlc30gKi9cbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBXZWJBc3NlbWJseS5pbnN0YW50aWF0ZShidWZmZXIsIGluZm8pXG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQudGhlbihyZWNlaXZlSW5zdGFudGlhdGlvblJlc3VsdCwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgICAgICAgICAvLyBXZSBleHBlY3QgdGhlIG1vc3QgY29tbW9uIGZhaWx1cmUgY2F1c2UgdG8gYmUgYSBiYWQgTUlNRSB0eXBlIGZvciB0aGUgYmluYXJ5LFxuICAgICAgICAgICAgICAvLyBpbiB3aGljaCBjYXNlIGZhbGxpbmcgYmFjayB0byBBcnJheUJ1ZmZlciBpbnN0YW50aWF0aW9uIHNob3VsZCB3b3JrLlxuICAgICAgICAgICAgICBlcnIoJ3dhc20gc3RyZWFtaW5nIGNvbXBpbGUgZmFpbGVkOiAnICsgcmVhc29uKVxuICAgICAgICAgICAgICBlcnIoJ2ZhbGxpbmcgYmFjayB0byBBcnJheUJ1ZmZlciBpbnN0YW50aWF0aW9uJylcbiAgICAgICAgICAgICAgcmV0dXJuIGluc3RhbnRpYXRlQXJyYXlCdWZmZXIocmVjZWl2ZUluc3RhbnRpYXRpb25SZXN1bHQpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgZXJyKGBmYWlsZWQgdG8gbG9hZCB3YXNtIGJpbmFyeSBmaWxlICR7ZXJyb3J9YClcbiAgICAgICAgICAgIGFib3J0KGVycm9yKVxuICAgICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gaW5zdGFudGlhdGVBcnJheUJ1ZmZlcihyZWNlaXZlSW5zdGFudGlhdGlvblJlc3VsdClcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBVc2VyIHNoZWxsIHBhZ2VzIGNhbiB3cml0ZSB0aGVpciBvd24gTW9kdWxlLmluc3RhbnRpYXRlV2FzbSA9IGZ1bmN0aW9uKGltcG9ydHMsIHN1Y2Nlc3NDYWxsYmFjaykgY2FsbGJhY2tcbiAgICAvLyB0byBtYW51YWxseSBpbnN0YW50aWF0ZSB0aGUgV2FzbSBtb2R1bGUgdGhlbXNlbHZlcy4gVGhpcyBhbGxvd3MgcGFnZXMgdG8gcnVuIHRoZSBpbnN0YW50aWF0aW9uIHBhcmFsbGVsXG4gICAgLy8gdG8gYW55IG90aGVyIGFzeW5jIHN0YXJ0dXAgYWN0aW9ucyB0aGV5IGFyZSBwZXJmb3JtaW5nLlxuICAgIC8vIEFsc28gcHRocmVhZHMgYW5kIHdhc20gd29ya2VycyBpbml0aWFsaXplIHRoZSB3YXNtIGluc3RhbmNlIHRocm91Z2ggdGhpcyBwYXRoLlxuICAgIGlmIChNb2R1bGVbJ2luc3RhbnRpYXRlV2FzbSddKSB7XG4gICAgICB0cnkge1xuICAgICAgICB2YXIgZXhwb3J0cyA9IE1vZHVsZVsnaW5zdGFudGlhdGVXYXNtJ10oaW5mbywgcmVjZWl2ZUluc3RhbmNlKVxuICAgICAgICByZXR1cm4gZXhwb3J0c1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBlcnIoJ01vZHVsZS5pbnN0YW50aWF0ZVdhc20gY2FsbGJhY2sgZmFpbGVkIHdpdGggZXJyb3I6ICcgKyBlKVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpbnN0YW50aWF0ZUFzeW5jKClcbiAgICByZXR1cm4ge30gLy8gbm8gZXhwb3J0cyB5ZXQ7IHdlJ2xsIGZpbGwgdGhlbSBpbiBsYXRlclxuICB9XG5cbiAgLy8gR2xvYmFscyB1c2VkIGJ5IEpTIGk2NCBjb252ZXJzaW9ucyAoc2VlIG1ha2VTZXRWYWx1ZSlcbiAgdmFyIHRlbXBEb3VibGVcbiAgdmFyIHRlbXBJNjRcblxuICAvLyA9PT0gQm9keSA9PT1cblxuICB2YXIgQVNNX0NPTlNUUyA9IHt9XG5cbiAgLyoqIEBjb25zdHJ1Y3RvciAqL1xuICBmdW5jdGlvbiBFeGl0U3RhdHVzKHN0YXR1cykge1xuICAgIHRoaXMubmFtZSA9ICdFeGl0U3RhdHVzJ1xuICAgIHRoaXMubWVzc2FnZSA9ICdQcm9ncmFtIHRlcm1pbmF0ZWQgd2l0aCBleGl0KCcgKyBzdGF0dXMgKyAnKSdcbiAgICB0aGlzLnN0YXR1cyA9IHN0YXR1c1xuICB9XG5cbiAgZnVuY3Rpb24gY2FsbFJ1bnRpbWVDYWxsYmFja3MoY2FsbGJhY2tzKSB7XG4gICAgd2hpbGUgKGNhbGxiYWNrcy5sZW5ndGggPiAwKSB7XG4gICAgICAvLyBQYXNzIHRoZSBtb2R1bGUgYXMgdGhlIGZpcnN0IGFyZ3VtZW50LlxuICAgICAgY2FsbGJhY2tzLnNoaWZ0KCkoTW9kdWxlKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHdpdGhTdGFja1NhdmUoZikge1xuICAgIHZhciBzdGFjayA9IHN0YWNrU2F2ZSgpXG4gICAgdmFyIHJldCA9IGYoKVxuICAgIHN0YWNrUmVzdG9yZShzdGFjaylcbiAgICByZXR1cm4gcmV0XG4gIH1cbiAgZnVuY3Rpb24gZGVtYW5nbGUoZnVuYykge1xuICAgIHdhcm5PbmNlKFxuICAgICAgJ3dhcm5pbmc6IGJ1aWxkIHdpdGggLXNERU1BTkdMRV9TVVBQT1JUIHRvIGxpbmsgaW4gbGliY3h4YWJpIGRlbWFuZ2xpbmcnXG4gICAgKVxuICAgIHJldHVybiBmdW5jXG4gIH1cblxuICBmdW5jdGlvbiBkZW1hbmdsZUFsbCh0ZXh0KSB7XG4gICAgdmFyIHJlZ2V4ID0gL1xcYl9aW1xcd1xcZF9dKy9nXG4gICAgcmV0dXJuIHRleHQucmVwbGFjZShyZWdleCwgZnVuY3Rpb24gKHgpIHtcbiAgICAgIHZhciB5ID0gZGVtYW5nbGUoeClcbiAgICAgIHJldHVybiB4ID09PSB5ID8geCA6IHkgKyAnIFsnICsgeCArICddJ1xuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtudW1iZXJ9IHB0clxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0VmFsdWUocHRyLCB0eXBlID0gJ2k4Jykge1xuICAgIGlmICh0eXBlLmVuZHNXaXRoKCcqJykpIHR5cGUgPSAnKidcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ2kxJzpcbiAgICAgICAgcmV0dXJuIEhFQVA4W3B0ciA+PiAwXVxuICAgICAgY2FzZSAnaTgnOlxuICAgICAgICByZXR1cm4gSEVBUDhbcHRyID4+IDBdXG4gICAgICBjYXNlICdpMTYnOlxuICAgICAgICByZXR1cm4gSEVBUDE2W3B0ciA+PiAxXVxuICAgICAgY2FzZSAnaTMyJzpcbiAgICAgICAgcmV0dXJuIEhFQVAzMltwdHIgPj4gMl1cbiAgICAgIGNhc2UgJ2k2NCc6XG4gICAgICAgIHJldHVybiBIRUFQMzJbcHRyID4+IDJdXG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICAgIHJldHVybiBIRUFQRjMyW3B0ciA+PiAyXVxuICAgICAgY2FzZSAnZG91YmxlJzpcbiAgICAgICAgcmV0dXJuIEhFQVBGNjRbcHRyID4+IDNdXG4gICAgICBjYXNlICcqJzpcbiAgICAgICAgcmV0dXJuIEhFQVBVMzJbcHRyID4+IDJdXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBhYm9ydCgnaW52YWxpZCB0eXBlIGZvciBnZXRWYWx1ZTogJyArIHR5cGUpXG4gICAgfVxuICAgIHJldHVybiBudWxsXG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVFeGNlcHRpb24oZSkge1xuICAgIC8vIENlcnRhaW4gZXhjZXB0aW9uIHR5cGVzIHdlIGRvIG5vdCB0cmVhdCBhcyBlcnJvcnMgc2luY2UgdGhleSBhcmUgdXNlZCBmb3JcbiAgICAvLyBpbnRlcm5hbCBjb250cm9sIGZsb3cuXG4gICAgLy8gMS4gRXhpdFN0YXR1cywgd2hpY2ggaXMgdGhyb3duIGJ5IGV4aXQoKVxuICAgIC8vIDIuIFwidW53aW5kXCIsIHdoaWNoIGlzIHRocm93biBieSBlbXNjcmlwdGVuX3Vud2luZF90b19qc19ldmVudF9sb29wKCkgYW5kIG90aGVyc1xuICAgIC8vICAgIHRoYXQgd2lzaCB0byByZXR1cm4gdG8gSlMgZXZlbnQgbG9vcC5cbiAgICBpZiAoZSBpbnN0YW5jZW9mIEV4aXRTdGF0dXMgfHwgZSA9PSAndW53aW5kJykge1xuICAgICAgcmV0dXJuIEVYSVRTVEFUVVNcbiAgICB9XG4gICAgcXVpdF8oMSwgZSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGpzU3RhY2tUcmFjZSgpIHtcbiAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoKVxuICAgIGlmICghZXJyb3Iuc3RhY2spIHtcbiAgICAgIC8vIElFMTArIHNwZWNpYWwgY2FzZXM6IEl0IGRvZXMgaGF2ZSBjYWxsc3RhY2sgaW5mbywgYnV0IGl0IGlzIG9ubHlcbiAgICAgIC8vIHBvcHVsYXRlZCBpZiBhbiBFcnJvciBvYmplY3QgaXMgdGhyb3duLCBzbyB0cnkgdGhhdCBhcyBhIHNwZWNpYWwtY2FzZS5cbiAgICAgIHRyeSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigpXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGVycm9yID0gZVxuICAgICAgfVxuICAgICAgaWYgKCFlcnJvci5zdGFjaykge1xuICAgICAgICByZXR1cm4gJyhubyBzdGFjayB0cmFjZSBhdmFpbGFibGUpJ1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZXJyb3Iuc3RhY2sudG9TdHJpbmcoKVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwdHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAqL1xuICBmdW5jdGlvbiBzZXRWYWx1ZShwdHIsIHZhbHVlLCB0eXBlID0gJ2k4Jykge1xuICAgIGlmICh0eXBlLmVuZHNXaXRoKCcqJykpIHR5cGUgPSAnKidcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ2kxJzpcbiAgICAgICAgSEVBUDhbcHRyID4+IDBdID0gdmFsdWVcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ2k4JzpcbiAgICAgICAgSEVBUDhbcHRyID4+IDBdID0gdmFsdWVcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ2kxNic6XG4gICAgICAgIEhFQVAxNltwdHIgPj4gMV0gPSB2YWx1ZVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnaTMyJzpcbiAgICAgICAgSEVBUDMyW3B0ciA+PiAyXSA9IHZhbHVlXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdpNjQnOlxuICAgICAgICA7KHRlbXBJNjQgPSBbXG4gICAgICAgICAgdmFsdWUgPj4+IDAsXG4gICAgICAgICAgKCh0ZW1wRG91YmxlID0gdmFsdWUpLFxuICAgICAgICAgICtNYXRoLmFicyh0ZW1wRG91YmxlKSA+PSAxLjBcbiAgICAgICAgICAgID8gdGVtcERvdWJsZSA+IDAuMFxuICAgICAgICAgICAgICA/IChNYXRoLm1pbihcbiAgICAgICAgICAgICAgICAgICtNYXRoLmZsb29yKHRlbXBEb3VibGUgLyA0Mjk0OTY3Mjk2LjApLFxuICAgICAgICAgICAgICAgICAgNDI5NDk2NzI5NS4wXG4gICAgICAgICAgICAgICAgKSB8XG4gICAgICAgICAgICAgICAgICAwKSA+Pj5cbiAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICAgIDogfn4rTWF0aC5jZWlsKFxuICAgICAgICAgICAgICAgICAgKHRlbXBEb3VibGUgLSArKH5+dGVtcERvdWJsZSA+Pj4gMCkpIC8gNDI5NDk2NzI5Ni4wXG4gICAgICAgICAgICAgICAgKSA+Pj4gMFxuICAgICAgICAgICAgOiAwKVxuICAgICAgICBdKSxcbiAgICAgICAgICAoSEVBUDMyW3B0ciA+PiAyXSA9IHRlbXBJNjRbMF0pLFxuICAgICAgICAgIChIRUFQMzJbKHB0ciArIDQpID4+IDJdID0gdGVtcEk2NFsxXSlcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgICAgSEVBUEYzMltwdHIgPj4gMl0gPSB2YWx1ZVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnZG91YmxlJzpcbiAgICAgICAgSEVBUEY2NFtwdHIgPj4gM10gPSB2YWx1ZVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnKic6XG4gICAgICAgIEhFQVBVMzJbcHRyID4+IDJdID0gdmFsdWVcbiAgICAgICAgYnJlYWtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGFib3J0KCdpbnZhbGlkIHR5cGUgZm9yIHNldFZhbHVlOiAnICsgdHlwZSlcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzdGFja1RyYWNlKCkge1xuICAgIHZhciBqcyA9IGpzU3RhY2tUcmFjZSgpXG4gICAgaWYgKE1vZHVsZVsnZXh0cmFTdGFja1RyYWNlJ10pIGpzICs9ICdcXG4nICsgTW9kdWxlWydleHRyYVN0YWNrVHJhY2UnXSgpXG4gICAgcmV0dXJuIGRlbWFuZ2xlQWxsKGpzKVxuICB9XG5cbiAgZnVuY3Rpb24gd2Fybk9uY2UodGV4dCkge1xuICAgIGlmICghd2Fybk9uY2Uuc2hvd24pIHdhcm5PbmNlLnNob3duID0ge31cbiAgICBpZiAoIXdhcm5PbmNlLnNob3duW3RleHRdKSB7XG4gICAgICB3YXJuT25jZS5zaG93blt0ZXh0XSA9IDFcbiAgICAgIGlmIChFTlZJUk9OTUVOVF9JU19OT0RFKSB0ZXh0ID0gJ3dhcm5pbmc6ICcgKyB0ZXh0XG4gICAgICBlcnIodGV4dClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB3cml0ZUFycmF5VG9NZW1vcnkoYXJyYXksIGJ1ZmZlcikge1xuICAgIGFzc2VydChcbiAgICAgIGFycmF5Lmxlbmd0aCA+PSAwLFxuICAgICAgJ3dyaXRlQXJyYXlUb01lbW9yeSBhcnJheSBtdXN0IGhhdmUgYSBsZW5ndGggKHNob3VsZCBiZSBhbiBhcnJheSBvciB0eXBlZCBhcnJheSknXG4gICAgKVxuICAgIEhFQVA4LnNldChhcnJheSwgYnVmZmVyKVxuICB9XG5cbiAgZnVuY3Rpb24gX2Vtc2NyaXB0ZW5fbWVtY3B5X2JpZyhkZXN0LCBzcmMsIG51bSkge1xuICAgIEhFQVBVOC5jb3B5V2l0aGluKGRlc3QsIHNyYywgc3JjICsgbnVtKVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0SGVhcE1heCgpIHtcbiAgICAvLyBTdGF5IG9uZSBXYXNtIHBhZ2Ugc2hvcnQgb2YgNEdCOiB3aGlsZSBlLmcuIENocm9tZSBpcyBhYmxlIHRvIGFsbG9jYXRlXG4gICAgLy8gZnVsbCA0R0IgV2FzbSBtZW1vcmllcywgdGhlIHNpemUgd2lsbCB3cmFwIGJhY2sgdG8gMCBieXRlcyBpbiBXYXNtIHNpZGVcbiAgICAvLyBmb3IgYW55IGNvZGUgdGhhdCBkZWFscyB3aXRoIGhlYXAgc2l6ZXMsIHdoaWNoIHdvdWxkIHJlcXVpcmUgc3BlY2lhbFxuICAgIC8vIGNhc2luZyBhbGwgaGVhcCBzaXplIHJlbGF0ZWQgY29kZSB0byB0cmVhdCAwIHNwZWNpYWxseS5cbiAgICByZXR1cm4gMjE0NzQ4MzY0OFxuICB9XG5cbiAgZnVuY3Rpb24gZW1zY3JpcHRlbl9yZWFsbG9jX2J1ZmZlcihzaXplKSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIHJvdW5kIHNpemUgZ3JvdyByZXF1ZXN0IHVwIHRvIHdhc20gcGFnZSBzaXplIChmaXhlZCA2NEtCIHBlciBzcGVjKVxuICAgICAgd2FzbU1lbW9yeS5ncm93KChzaXplIC0gYnVmZmVyLmJ5dGVMZW5ndGggKyA2NTUzNSkgPj4+IDE2KSAvLyAuZ3JvdygpIHRha2VzIGEgZGVsdGEgY29tcGFyZWQgdG8gdGhlIHByZXZpb3VzIHNpemVcbiAgICAgIHVwZGF0ZUdsb2JhbEJ1ZmZlckFuZFZpZXdzKHdhc21NZW1vcnkuYnVmZmVyKVxuICAgICAgcmV0dXJuIDEgLypzdWNjZXNzKi9cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBlcnIoXG4gICAgICAgICdlbXNjcmlwdGVuX3JlYWxsb2NfYnVmZmVyOiBBdHRlbXB0ZWQgdG8gZ3JvdyBoZWFwIGZyb20gJyArXG4gICAgICAgICAgYnVmZmVyLmJ5dGVMZW5ndGggK1xuICAgICAgICAgICcgYnl0ZXMgdG8gJyArXG4gICAgICAgICAgc2l6ZSArXG4gICAgICAgICAgJyBieXRlcywgYnV0IGdvdCBlcnJvcjogJyArXG4gICAgICAgICAgZVxuICAgICAgKVxuICAgIH1cbiAgICAvLyBpbXBsaWNpdCAwIHJldHVybiB0byBzYXZlIGNvZGUgc2l6ZSAoY2FsbGVyIHdpbGwgY2FzdCBcInVuZGVmaW5lZFwiIGludG8gMFxuICAgIC8vIGFueWhvdylcbiAgfVxuICBmdW5jdGlvbiBfZW1zY3JpcHRlbl9yZXNpemVfaGVhcChyZXF1ZXN0ZWRTaXplKSB7XG4gICAgdmFyIG9sZFNpemUgPSBIRUFQVTgubGVuZ3RoXG4gICAgcmVxdWVzdGVkU2l6ZSA9IHJlcXVlc3RlZFNpemUgPj4+IDBcbiAgICAvLyBXaXRoIG11bHRpdGhyZWFkZWQgYnVpbGRzLCByYWNlcyBjYW4gaGFwcGVuIChhbm90aGVyIHRocmVhZCBtaWdodCBpbmNyZWFzZSB0aGUgc2l6ZVxuICAgIC8vIGluIGJldHdlZW4pLCBzbyByZXR1cm4gYSBmYWlsdXJlLCBhbmQgbGV0IHRoZSBjYWxsZXIgcmV0cnkuXG4gICAgYXNzZXJ0KHJlcXVlc3RlZFNpemUgPiBvbGRTaXplKVxuXG4gICAgLy8gTWVtb3J5IHJlc2l6ZSBydWxlczpcbiAgICAvLyAxLiAgQWx3YXlzIGluY3JlYXNlIGhlYXAgc2l6ZSB0byBhdCBsZWFzdCB0aGUgcmVxdWVzdGVkIHNpemUsIHJvdW5kZWQgdXBcbiAgICAvLyAgICAgdG8gbmV4dCBwYWdlIG11bHRpcGxlLlxuICAgIC8vIDJhLiBJZiBNRU1PUllfR1JPV1RIX0xJTkVBUl9TVEVQID09IC0xLCBleGNlc3NpdmVseSByZXNpemUgdGhlIGhlYXBcbiAgICAvLyAgICAgZ2VvbWV0cmljYWxseTogaW5jcmVhc2UgdGhlIGhlYXAgc2l6ZSBhY2NvcmRpbmcgdG9cbiAgICAvLyAgICAgTUVNT1JZX0dST1dUSF9HRU9NRVRSSUNfU1RFUCBmYWN0b3IgKGRlZmF1bHQgKzIwJSksIEF0IG1vc3RcbiAgICAvLyAgICAgb3ZlcnJlc2VydmUgYnkgTUVNT1JZX0dST1dUSF9HRU9NRVRSSUNfQ0FQIGJ5dGVzIChkZWZhdWx0IDk2TUIpLlxuICAgIC8vIDJiLiBJZiBNRU1PUllfR1JPV1RIX0xJTkVBUl9TVEVQICE9IC0xLCBleGNlc3NpdmVseSByZXNpemUgdGhlIGhlYXBcbiAgICAvLyAgICAgbGluZWFybHk6IGluY3JlYXNlIHRoZSBoZWFwIHNpemUgYnkgYXQgbGVhc3RcbiAgICAvLyAgICAgTUVNT1JZX0dST1dUSF9MSU5FQVJfU1RFUCBieXRlcy5cbiAgICAvLyAzLiAgTWF4IHNpemUgZm9yIHRoZSBoZWFwIGlzIGNhcHBlZCBhdCAyMDQ4TUItV0FTTV9QQUdFX1NJWkUsIG9yIGJ5XG4gICAgLy8gICAgIE1BWElNVU1fTUVNT1JZLCBvciBieSBBU0FOIGxpbWl0LCBkZXBlbmRpbmcgb24gd2hpY2ggaXMgc21hbGxlc3RcbiAgICAvLyA0LiAgSWYgd2Ugd2VyZSB1bmFibGUgdG8gYWxsb2NhdGUgYXMgbXVjaCBtZW1vcnksIGl0IG1heSBiZSBkdWUgdG9cbiAgICAvLyAgICAgb3Zlci1lYWdlciBkZWNpc2lvbiB0byBleGNlc3NpdmVseSByZXNlcnZlIGR1ZSB0byAoMykgYWJvdmUuXG4gICAgLy8gICAgIEhlbmNlIGlmIGFuIGFsbG9jYXRpb24gZmFpbHMsIGN1dCBkb3duIG9uIHRoZSBhbW91bnQgb2YgZXhjZXNzXG4gICAgLy8gICAgIGdyb3d0aCwgaW4gYW4gYXR0ZW1wdCB0byBzdWNjZWVkIHRvIHBlcmZvcm0gYSBzbWFsbGVyIGFsbG9jYXRpb24uXG5cbiAgICAvLyBBIGxpbWl0IGlzIHNldCBmb3IgaG93IG11Y2ggd2UgY2FuIGdyb3cuIFdlIHNob3VsZCBub3QgZXhjZWVkIHRoYXRcbiAgICAvLyAodGhlIHdhc20gYmluYXJ5IHNwZWNpZmllcyBpdCwgc28gaWYgd2UgdHJpZWQsIHdlJ2QgZmFpbCBhbnlob3cpLlxuICAgIHZhciBtYXhIZWFwU2l6ZSA9IGdldEhlYXBNYXgoKVxuICAgIGlmIChyZXF1ZXN0ZWRTaXplID4gbWF4SGVhcFNpemUpIHtcbiAgICAgIGVycihcbiAgICAgICAgJ0Nhbm5vdCBlbmxhcmdlIG1lbW9yeSwgYXNrZWQgdG8gZ28gdXAgdG8gJyArXG4gICAgICAgICAgcmVxdWVzdGVkU2l6ZSArXG4gICAgICAgICAgJyBieXRlcywgYnV0IHRoZSBsaW1pdCBpcyAnICtcbiAgICAgICAgICBtYXhIZWFwU2l6ZSArXG4gICAgICAgICAgJyBieXRlcyEnXG4gICAgICApXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBsZXQgYWxpZ25VcCA9ICh4LCBtdWx0aXBsZSkgPT4geCArICgobXVsdGlwbGUgLSAoeCAlIG11bHRpcGxlKSkgJSBtdWx0aXBsZSlcblxuICAgIC8vIExvb3AgdGhyb3VnaCBwb3RlbnRpYWwgaGVhcCBzaXplIGluY3JlYXNlcy4gSWYgd2UgYXR0ZW1wdCBhIHRvbyBlYWdlclxuICAgIC8vIHJlc2VydmF0aW9uIHRoYXQgZmFpbHMsIGN1dCBkb3duIG9uIHRoZSBhdHRlbXB0ZWQgc2l6ZSBhbmQgcmVzZXJ2ZSBhXG4gICAgLy8gc21hbGxlciBidW1wIGluc3RlYWQuIChtYXggMyB0aW1lcywgY2hvc2VuIHNvbWV3aGF0IGFyYml0cmFyaWx5KVxuICAgIGZvciAodmFyIGN1dERvd24gPSAxOyBjdXREb3duIDw9IDQ7IGN1dERvd24gKj0gMikge1xuICAgICAgdmFyIG92ZXJHcm93bkhlYXBTaXplID0gb2xkU2l6ZSAqICgxICsgMC4yIC8gY3V0RG93bikgLy8gZW5zdXJlIGdlb21ldHJpYyBncm93dGhcbiAgICAgIC8vIGJ1dCBsaW1pdCBvdmVycmVzZXJ2aW5nIChkZWZhdWx0IHRvIGNhcHBpbmcgYXQgKzk2TUIgb3Zlcmdyb3d0aCBhdCBtb3N0KVxuICAgICAgb3Zlckdyb3duSGVhcFNpemUgPSBNYXRoLm1pbihvdmVyR3Jvd25IZWFwU2l6ZSwgcmVxdWVzdGVkU2l6ZSArIDEwMDY2MzI5NilcblxuICAgICAgdmFyIG5ld1NpemUgPSBNYXRoLm1pbihcbiAgICAgICAgbWF4SGVhcFNpemUsXG4gICAgICAgIGFsaWduVXAoTWF0aC5tYXgocmVxdWVzdGVkU2l6ZSwgb3Zlckdyb3duSGVhcFNpemUpLCA2NTUzNilcbiAgICAgIClcblxuICAgICAgdmFyIHJlcGxhY2VtZW50ID0gZW1zY3JpcHRlbl9yZWFsbG9jX2J1ZmZlcihuZXdTaXplKVxuICAgICAgaWYgKHJlcGxhY2VtZW50KSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfVxuICAgIGVycihcbiAgICAgICdGYWlsZWQgdG8gZ3JvdyB0aGUgaGVhcCBmcm9tICcgK1xuICAgICAgICBvbGRTaXplICtcbiAgICAgICAgJyBieXRlcyB0byAnICtcbiAgICAgICAgbmV3U2l6ZSArXG4gICAgICAgICcgYnl0ZXMsIG5vdCBlbm91Z2ggbWVtb3J5ISdcbiAgICApXG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICAvKiogQHBhcmFtIHtudW1iZXI9fSBvZmZzZXQgKi9cbiAgZnVuY3Rpb24gZG9Xcml0ZXYoc3RyZWFtLCBpb3YsIGlvdmNudCwgb2Zmc2V0KSB7XG4gICAgdmFyIHJldCA9IDBcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGlvdmNudDsgaSsrKSB7XG4gICAgICB2YXIgcHRyID0gSEVBUFUzMltpb3YgPj4gMl1cbiAgICAgIHZhciBsZW4gPSBIRUFQVTMyWyhpb3YgKyA0KSA+PiAyXVxuICAgICAgaW92ICs9IDhcbiAgICAgIHZhciBjdXJyID0gRlMud3JpdGUoc3RyZWFtLCBIRUFQOCwgcHRyLCBsZW4sIG9mZnNldClcbiAgICAgIGlmIChjdXJyIDwgMCkgcmV0dXJuIC0xXG4gICAgICByZXQgKz0gY3VyclxuICAgIH1cbiAgICByZXR1cm4gcmV0XG4gIH1cblxuICB2YXIgUEFUSCA9IHtcbiAgICBpc0FiczogKHBhdGgpID0+IHBhdGguY2hhckF0KDApID09PSAnLycsXG4gICAgc3BsaXRQYXRoOiAoZmlsZW5hbWUpID0+IHtcbiAgICAgIHZhciBzcGxpdFBhdGhSZSA9XG4gICAgICAgIC9eKFxcLz98KShbXFxzXFxTXSo/KSgoPzpcXC57MSwyfXxbXlxcL10rP3wpKFxcLlteLlxcL10qfCkpKD86W1xcL10qKSQvXG4gICAgICByZXR1cm4gc3BsaXRQYXRoUmUuZXhlYyhmaWxlbmFtZSkuc2xpY2UoMSlcbiAgICB9LFxuICAgIG5vcm1hbGl6ZUFycmF5OiAocGFydHMsIGFsbG93QWJvdmVSb290KSA9PiB7XG4gICAgICAvLyBpZiB0aGUgcGF0aCB0cmllcyB0byBnbyBhYm92ZSB0aGUgcm9vdCwgYHVwYCBlbmRzIHVwID4gMFxuICAgICAgdmFyIHVwID0gMFxuICAgICAgZm9yICh2YXIgaSA9IHBhcnRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIHZhciBsYXN0ID0gcGFydHNbaV1cbiAgICAgICAgaWYgKGxhc3QgPT09ICcuJykge1xuICAgICAgICAgIHBhcnRzLnNwbGljZShpLCAxKVxuICAgICAgICB9IGVsc2UgaWYgKGxhc3QgPT09ICcuLicpIHtcbiAgICAgICAgICBwYXJ0cy5zcGxpY2UoaSwgMSlcbiAgICAgICAgICB1cCsrXG4gICAgICAgIH0gZWxzZSBpZiAodXApIHtcbiAgICAgICAgICBwYXJ0cy5zcGxpY2UoaSwgMSlcbiAgICAgICAgICB1cC0tXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIGlmIHRoZSBwYXRoIGlzIGFsbG93ZWQgdG8gZ28gYWJvdmUgdGhlIHJvb3QsIHJlc3RvcmUgbGVhZGluZyAuLnNcbiAgICAgIGlmIChhbGxvd0Fib3ZlUm9vdCkge1xuICAgICAgICBmb3IgKDsgdXA7IHVwLS0pIHtcbiAgICAgICAgICBwYXJ0cy51bnNoaWZ0KCcuLicpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBwYXJ0c1xuICAgIH0sXG4gICAgbm9ybWFsaXplOiAocGF0aCkgPT4ge1xuICAgICAgdmFyIGlzQWJzb2x1dGUgPSBQQVRILmlzQWJzKHBhdGgpLFxuICAgICAgICB0cmFpbGluZ1NsYXNoID0gcGF0aC5zdWJzdHIoLTEpID09PSAnLydcbiAgICAgIC8vIE5vcm1hbGl6ZSB0aGUgcGF0aFxuICAgICAgcGF0aCA9IFBBVEgubm9ybWFsaXplQXJyYXkoXG4gICAgICAgIHBhdGguc3BsaXQoJy8nKS5maWx0ZXIoKHApID0+ICEhcCksXG4gICAgICAgICFpc0Fic29sdXRlXG4gICAgICApLmpvaW4oJy8nKVxuICAgICAgaWYgKCFwYXRoICYmICFpc0Fic29sdXRlKSB7XG4gICAgICAgIHBhdGggPSAnLidcbiAgICAgIH1cbiAgICAgIGlmIChwYXRoICYmIHRyYWlsaW5nU2xhc2gpIHtcbiAgICAgICAgcGF0aCArPSAnLydcbiAgICAgIH1cbiAgICAgIHJldHVybiAoaXNBYnNvbHV0ZSA/ICcvJyA6ICcnKSArIHBhdGhcbiAgICB9LFxuICAgIGRpcm5hbWU6IChwYXRoKSA9PiB7XG4gICAgICB2YXIgcmVzdWx0ID0gUEFUSC5zcGxpdFBhdGgocGF0aCksXG4gICAgICAgIHJvb3QgPSByZXN1bHRbMF0sXG4gICAgICAgIGRpciA9IHJlc3VsdFsxXVxuICAgICAgaWYgKCFyb290ICYmICFkaXIpIHtcbiAgICAgICAgLy8gTm8gZGlybmFtZSB3aGF0c29ldmVyXG4gICAgICAgIHJldHVybiAnLidcbiAgICAgIH1cbiAgICAgIGlmIChkaXIpIHtcbiAgICAgICAgLy8gSXQgaGFzIGEgZGlybmFtZSwgc3RyaXAgdHJhaWxpbmcgc2xhc2hcbiAgICAgICAgZGlyID0gZGlyLnN1YnN0cigwLCBkaXIubGVuZ3RoIC0gMSlcbiAgICAgIH1cbiAgICAgIHJldHVybiByb290ICsgZGlyXG4gICAgfSxcbiAgICBiYXNlbmFtZTogKHBhdGgpID0+IHtcbiAgICAgIC8vIEVNU0NSSVBURU4gcmV0dXJuICcvJycgZm9yICcvJywgbm90IGFuIGVtcHR5IHN0cmluZ1xuICAgICAgaWYgKHBhdGggPT09ICcvJykgcmV0dXJuICcvJ1xuICAgICAgcGF0aCA9IFBBVEgubm9ybWFsaXplKHBhdGgpXG4gICAgICBwYXRoID0gcGF0aC5yZXBsYWNlKC9cXC8kLywgJycpXG4gICAgICB2YXIgbGFzdFNsYXNoID0gcGF0aC5sYXN0SW5kZXhPZignLycpXG4gICAgICBpZiAobGFzdFNsYXNoID09PSAtMSkgcmV0dXJuIHBhdGhcbiAgICAgIHJldHVybiBwYXRoLnN1YnN0cihsYXN0U2xhc2ggKyAxKVxuICAgIH0sXG4gICAgam9pbjogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHBhdGhzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKVxuICAgICAgcmV0dXJuIFBBVEgubm9ybWFsaXplKHBhdGhzLmpvaW4oJy8nKSlcbiAgICB9LFxuICAgIGpvaW4yOiAobCwgcikgPT4ge1xuICAgICAgcmV0dXJuIFBBVEgubm9ybWFsaXplKGwgKyAnLycgKyByKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFJhbmRvbURldmljZSgpIHtcbiAgICBpZiAoXG4gICAgICB0eXBlb2YgY3J5cHRvID09ICdvYmplY3QnICYmXG4gICAgICB0eXBlb2YgY3J5cHRvWydnZXRSYW5kb21WYWx1ZXMnXSA9PSAnZnVuY3Rpb24nXG4gICAgKSB7XG4gICAgICAvLyBmb3IgbW9kZXJuIHdlYiBicm93c2Vyc1xuICAgICAgdmFyIHJhbmRvbUJ1ZmZlciA9IG5ldyBVaW50OEFycmF5KDEpXG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKHJhbmRvbUJ1ZmZlcilcbiAgICAgICAgcmV0dXJuIHJhbmRvbUJ1ZmZlclswXVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoRU5WSVJPTk1FTlRfSVNfTk9ERSkge1xuICAgICAgLy8gZm9yIG5vZGVqcyB3aXRoIG9yIHdpdGhvdXQgY3J5cHRvIHN1cHBvcnQgaW5jbHVkZWRcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIHZhciBjcnlwdG9fbW9kdWxlID0gcmVxdWlyZSgnY3J5cHRvJyk7XG4gICAgICAgIC8vIG5vZGVqcyBoYXMgY3J5cHRvIHN1cHBvcnRcbiAgICAgICAgcmV0dXJuICgpID0+IGNyeXB0b19tb2R1bGVbJ3JhbmRvbUJ5dGVzJ10oMSlbMF1cbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gbm9kZWpzIGRvZXNuJ3QgaGF2ZSBjcnlwdG8gc3VwcG9ydFxuICAgICAgfVxuICAgIH1cbiAgICAvLyB3ZSBjb3VsZG4ndCBmaW5kIGEgcHJvcGVyIGltcGxlbWVudGF0aW9uLCBhcyBNYXRoLnJhbmRvbSgpIGlzIG5vdCBzdWl0YWJsZSBmb3IgL2Rldi9yYW5kb20sIHNlZSBlbXNjcmlwdGVuLWNvcmUvZW1zY3JpcHRlbi9wdWxsLzcwOTZcbiAgICByZXR1cm4gKCkgPT5cbiAgICAgIGFib3J0KFxuICAgICAgICAnbm8gY3J5cHRvZ3JhcGhpYyBzdXBwb3J0IGZvdW5kIGZvciByYW5kb21EZXZpY2UuIGNvbnNpZGVyIHBvbHlmaWxsaW5nIGl0IGlmIHlvdSB3YW50IHRvIHVzZSBzb21ldGhpbmcgaW5zZWN1cmUgbGlrZSBNYXRoLnJhbmRvbSgpLCBlLmcuIHB1dCB0aGlzIGluIGEgLS1wcmUtanM6IHZhciBjcnlwdG8gPSB7IGdldFJhbmRvbVZhbHVlczogZnVuY3Rpb24oYXJyYXkpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykgYXJyYXlbaV0gPSAoTWF0aC5yYW5kb20oKSoyNTYpfDAgfSB9OydcbiAgICAgIClcbiAgfVxuXG4gIHZhciBQQVRIX0ZTID0ge1xuICAgIHJlc29sdmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciByZXNvbHZlZFBhdGggPSAnJyxcbiAgICAgICAgcmVzb2x2ZWRBYnNvbHV0ZSA9IGZhbHNlXG4gICAgICBmb3IgKHZhciBpID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7IGkgPj0gLTEgJiYgIXJlc29sdmVkQWJzb2x1dGU7IGktLSkge1xuICAgICAgICB2YXIgcGF0aCA9IGkgPj0gMCA/IGFyZ3VtZW50c1tpXSA6IEZTLmN3ZCgpXG4gICAgICAgIC8vIFNraXAgZW1wdHkgYW5kIGludmFsaWQgZW50cmllc1xuICAgICAgICBpZiAodHlwZW9mIHBhdGggIT0gJ3N0cmluZycpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudHMgdG8gcGF0aC5yZXNvbHZlIG11c3QgYmUgc3RyaW5ncycpXG4gICAgICAgIH0gZWxzZSBpZiAoIXBhdGgpIHtcbiAgICAgICAgICByZXR1cm4gJycgLy8gYW4gaW52YWxpZCBwb3J0aW9uIGludmFsaWRhdGVzIHRoZSB3aG9sZSB0aGluZ1xuICAgICAgICB9XG4gICAgICAgIHJlc29sdmVkUGF0aCA9IHBhdGggKyAnLycgKyByZXNvbHZlZFBhdGhcbiAgICAgICAgcmVzb2x2ZWRBYnNvbHV0ZSA9IFBBVEguaXNBYnMocGF0aClcbiAgICAgIH1cbiAgICAgIC8vIEF0IHRoaXMgcG9pbnQgdGhlIHBhdGggc2hvdWxkIGJlIHJlc29sdmVkIHRvIGEgZnVsbCBhYnNvbHV0ZSBwYXRoLCBidXRcbiAgICAgIC8vIGhhbmRsZSByZWxhdGl2ZSBwYXRocyB0byBiZSBzYWZlIChtaWdodCBoYXBwZW4gd2hlbiBwcm9jZXNzLmN3ZCgpIGZhaWxzKVxuICAgICAgcmVzb2x2ZWRQYXRoID0gUEFUSC5ub3JtYWxpemVBcnJheShcbiAgICAgICAgcmVzb2x2ZWRQYXRoLnNwbGl0KCcvJykuZmlsdGVyKChwKSA9PiAhIXApLFxuICAgICAgICAhcmVzb2x2ZWRBYnNvbHV0ZVxuICAgICAgKS5qb2luKCcvJylcbiAgICAgIHJldHVybiAocmVzb2x2ZWRBYnNvbHV0ZSA/ICcvJyA6ICcnKSArIHJlc29sdmVkUGF0aCB8fCAnLidcbiAgICB9LFxuICAgIHJlbGF0aXZlOiAoZnJvbSwgdG8pID0+IHtcbiAgICAgIGZyb20gPSBQQVRIX0ZTLnJlc29sdmUoZnJvbSkuc3Vic3RyKDEpXG4gICAgICB0byA9IFBBVEhfRlMucmVzb2x2ZSh0bykuc3Vic3RyKDEpXG4gICAgICBmdW5jdGlvbiB0cmltKGFycikge1xuICAgICAgICB2YXIgc3RhcnQgPSAwXG4gICAgICAgIGZvciAoOyBzdGFydCA8IGFyci5sZW5ndGg7IHN0YXJ0KyspIHtcbiAgICAgICAgICBpZiAoYXJyW3N0YXJ0XSAhPT0gJycpIGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVuZCA9IGFyci5sZW5ndGggLSAxXG4gICAgICAgIGZvciAoOyBlbmQgPj0gMDsgZW5kLS0pIHtcbiAgICAgICAgICBpZiAoYXJyW2VuZF0gIT09ICcnKSBicmVha1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdGFydCA+IGVuZCkgcmV0dXJuIFtdXG4gICAgICAgIHJldHVybiBhcnIuc2xpY2Uoc3RhcnQsIGVuZCAtIHN0YXJ0ICsgMSlcbiAgICAgIH1cbiAgICAgIHZhciBmcm9tUGFydHMgPSB0cmltKGZyb20uc3BsaXQoJy8nKSlcbiAgICAgIHZhciB0b1BhcnRzID0gdHJpbSh0by5zcGxpdCgnLycpKVxuICAgICAgdmFyIGxlbmd0aCA9IE1hdGgubWluKGZyb21QYXJ0cy5sZW5ndGgsIHRvUGFydHMubGVuZ3RoKVxuICAgICAgdmFyIHNhbWVQYXJ0c0xlbmd0aCA9IGxlbmd0aFxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoZnJvbVBhcnRzW2ldICE9PSB0b1BhcnRzW2ldKSB7XG4gICAgICAgICAgc2FtZVBhcnRzTGVuZ3RoID0gaVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciBvdXRwdXRQYXJ0cyA9IFtdXG4gICAgICBmb3IgKHZhciBpID0gc2FtZVBhcnRzTGVuZ3RoOyBpIDwgZnJvbVBhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIG91dHB1dFBhcnRzLnB1c2goJy4uJylcbiAgICAgIH1cbiAgICAgIG91dHB1dFBhcnRzID0gb3V0cHV0UGFydHMuY29uY2F0KHRvUGFydHMuc2xpY2Uoc2FtZVBhcnRzTGVuZ3RoKSlcbiAgICAgIHJldHVybiBvdXRwdXRQYXJ0cy5qb2luKCcvJylcbiAgICB9XG4gIH1cblxuICAvKiogQHR5cGUge2Z1bmN0aW9uKHN0cmluZywgYm9vbGVhbj0sIG51bWJlcj0pfSAqL1xuICBmdW5jdGlvbiBpbnRBcnJheUZyb21TdHJpbmcoc3RyaW5neSwgZG9udEFkZE51bGwsIGxlbmd0aCkge1xuICAgIHZhciBsZW4gPSBsZW5ndGggPiAwID8gbGVuZ3RoIDogbGVuZ3RoQnl0ZXNVVEY4KHN0cmluZ3kpICsgMVxuICAgIHZhciB1OGFycmF5ID0gbmV3IEFycmF5KGxlbilcbiAgICB2YXIgbnVtQnl0ZXNXcml0dGVuID0gc3RyaW5nVG9VVEY4QXJyYXkoc3RyaW5neSwgdThhcnJheSwgMCwgdThhcnJheS5sZW5ndGgpXG4gICAgaWYgKGRvbnRBZGROdWxsKSB1OGFycmF5Lmxlbmd0aCA9IG51bUJ5dGVzV3JpdHRlblxuICAgIHJldHVybiB1OGFycmF5XG4gIH1cbiAgdmFyIFRUWSA9IHtcbiAgICB0dHlzOiBbXSxcbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vZW1zY3JpcHRlbi1jb3JlL2Vtc2NyaXB0ZW4vcHVsbC8xNTU1XG4gICAgICAvLyBpZiAoRU5WSVJPTk1FTlRfSVNfTk9ERSkge1xuICAgICAgLy8gICAvLyBjdXJyZW50bHksIEZTLmluaXQgZG9lcyBub3QgZGlzdGluZ3Vpc2ggaWYgcHJvY2Vzcy5zdGRpbiBpcyBhIGZpbGUgb3IgVFRZXG4gICAgICAvLyAgIC8vIGRldmljZSwgaXQgYWx3YXlzIGFzc3VtZXMgaXQncyBhIFRUWSBkZXZpY2UuIGJlY2F1c2Ugb2YgdGhpcywgd2UncmUgZm9yY2luZ1xuICAgICAgLy8gICAvLyBwcm9jZXNzLnN0ZGluIHRvIFVURjggZW5jb2RpbmcgdG8gYXQgbGVhc3QgbWFrZSBzdGRpbiByZWFkaW5nIGNvbXBhdGlibGVcbiAgICAgIC8vICAgLy8gd2l0aCB0ZXh0IGZpbGVzIHVudGlsIEZTLmluaXQgY2FuIGJlIHJlZmFjdG9yZWQuXG4gICAgICAvLyAgIHByb2Nlc3NbJ3N0ZGluJ11bJ3NldEVuY29kaW5nJ10oJ3V0ZjgnKTtcbiAgICAgIC8vIH1cbiAgICB9LFxuICAgIHNodXRkb3duOiBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vZW1zY3JpcHRlbi1jb3JlL2Vtc2NyaXB0ZW4vcHVsbC8xNTU1XG4gICAgICAvLyBpZiAoRU5WSVJPTk1FTlRfSVNfTk9ERSkge1xuICAgICAgLy8gICAvLyBpbm9sZW46IGFueSBpZGVhIGFzIHRvIHdoeSBub2RlIC1lICdwcm9jZXNzLnN0ZGluLnJlYWQoKScgd291bGRuJ3QgZXhpdCBpbW1lZGlhdGVseSAod2l0aCBwcm9jZXNzLnN0ZGluIGJlaW5nIGEgdHR5KT9cbiAgICAgIC8vICAgLy8gaXNhYWNzOiBiZWNhdXNlIG5vdyBpdCdzIHJlYWRpbmcgZnJvbSB0aGUgc3RyZWFtLCB5b3UndmUgZXhwcmVzc2VkIGludGVyZXN0IGluIGl0LCBzbyB0aGF0IHJlYWQoKSBraWNrcyBvZmYgYSBfcmVhZCgpIHdoaWNoIGNyZWF0ZXMgYSBSZWFkUmVxIG9wZXJhdGlvblxuICAgICAgLy8gICAvLyBpbm9sZW46IEkgdGhvdWdodCByZWFkKCkgaW4gdGhhdCBjYXNlIHdhcyBhIHN5bmNocm9ub3VzIG9wZXJhdGlvbiB0aGF0IGp1c3QgZ3JhYmJlZCBzb21lIGFtb3VudCBvZiBidWZmZXJlZCBkYXRhIGlmIGl0IGV4aXN0cz9cbiAgICAgIC8vICAgLy8gaXNhYWNzOiBpdCBpcy4gYnV0IGl0IGFsc28gdHJpZ2dlcnMgYSBfcmVhZCgpIGNhbGwsIHdoaWNoIGNhbGxzIHJlYWRTdGFydCgpIG9uIHRoZSBoYW5kbGVcbiAgICAgIC8vICAgLy8gaXNhYWNzOiBkbyBwcm9jZXNzLnN0ZGluLnBhdXNlKCkgYW5kIGknZCB0aGluayBpdCdkIHByb2JhYmx5IGNsb3NlIHRoZSBwZW5kaW5nIGNhbGxcbiAgICAgIC8vICAgcHJvY2Vzc1snc3RkaW4nXVsncGF1c2UnXSgpO1xuICAgICAgLy8gfVxuICAgIH0sXG4gICAgcmVnaXN0ZXI6IGZ1bmN0aW9uIChkZXYsIG9wcykge1xuICAgICAgVFRZLnR0eXNbZGV2XSA9IHsgaW5wdXQ6IFtdLCBvdXRwdXQ6IFtdLCBvcHM6IG9wcyB9XG4gICAgICBGUy5yZWdpc3RlckRldmljZShkZXYsIFRUWS5zdHJlYW1fb3BzKVxuICAgIH0sXG4gICAgc3RyZWFtX29wczoge1xuICAgICAgb3BlbjogZnVuY3Rpb24gKHN0cmVhbSkge1xuICAgICAgICB2YXIgdHR5ID0gVFRZLnR0eXNbc3RyZWFtLm5vZGUucmRldl1cbiAgICAgICAgaWYgKCF0dHkpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRlMuRXJybm9FcnJvcig0MylcbiAgICAgICAgfVxuICAgICAgICBzdHJlYW0udHR5ID0gdHR5XG4gICAgICAgIHN0cmVhbS5zZWVrYWJsZSA9IGZhbHNlXG4gICAgICB9LFxuICAgICAgY2xvc2U6IGZ1bmN0aW9uIChzdHJlYW0pIHtcbiAgICAgICAgLy8gZmx1c2ggYW55IHBlbmRpbmcgbGluZSBkYXRhXG4gICAgICAgIHN0cmVhbS50dHkub3BzLmZzeW5jKHN0cmVhbS50dHkpXG4gICAgICB9LFxuICAgICAgZnN5bmM6IGZ1bmN0aW9uIChzdHJlYW0pIHtcbiAgICAgICAgc3RyZWFtLnR0eS5vcHMuZnN5bmMoc3RyZWFtLnR0eSlcbiAgICAgIH0sXG4gICAgICByZWFkOiBmdW5jdGlvbiAoc3RyZWFtLCBidWZmZXIsIG9mZnNldCwgbGVuZ3RoLCBwb3MgLyogaWdub3JlZCAqLykge1xuICAgICAgICBpZiAoIXN0cmVhbS50dHkgfHwgIXN0cmVhbS50dHkub3BzLmdldF9jaGFyKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEZTLkVycm5vRXJyb3IoNjApXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGJ5dGVzUmVhZCA9IDBcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciByZXN1bHRcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzdWx0ID0gc3RyZWFtLnR0eS5vcHMuZ2V0X2NoYXIoc3RyZWFtLnR0eSlcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRlMuRXJybm9FcnJvcigyOSlcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdW5kZWZpbmVkICYmIGJ5dGVzUmVhZCA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEZTLkVycm5vRXJyb3IoNilcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCB8fCByZXN1bHQgPT09IHVuZGVmaW5lZCkgYnJlYWtcbiAgICAgICAgICBieXRlc1JlYWQrK1xuICAgICAgICAgIGJ1ZmZlcltvZmZzZXQgKyBpXSA9IHJlc3VsdFxuICAgICAgICB9XG4gICAgICAgIGlmIChieXRlc1JlYWQpIHtcbiAgICAgICAgICBzdHJlYW0ubm9kZS50aW1lc3RhbXAgPSBEYXRlLm5vdygpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ5dGVzUmVhZFxuICAgICAgfSxcbiAgICAgIHdyaXRlOiBmdW5jdGlvbiAoc3RyZWFtLCBidWZmZXIsIG9mZnNldCwgbGVuZ3RoLCBwb3MpIHtcbiAgICAgICAgaWYgKCFzdHJlYW0udHR5IHx8ICFzdHJlYW0udHR5Lm9wcy5wdXRfY2hhcikge1xuICAgICAgICAgIHRocm93IG5ldyBGUy5FcnJub0Vycm9yKDYwKVxuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgc3RyZWFtLnR0eS5vcHMucHV0X2NoYXIoc3RyZWFtLnR0eSwgYnVmZmVyW29mZnNldCArIGldKVxuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHRocm93IG5ldyBGUy5FcnJub0Vycm9yKDI5KVxuICAgICAgICB9XG4gICAgICAgIGlmIChsZW5ndGgpIHtcbiAgICAgICAgICBzdHJlYW0ubm9kZS50aW1lc3RhbXAgPSBEYXRlLm5vdygpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlcbiAgICAgIH1cbiAgICB9LFxuICAgIGRlZmF1bHRfdHR5X29wczoge1xuICAgICAgZ2V0X2NoYXI6IGZ1bmN0aW9uICh0dHkpIHtcbiAgICAgICAgaWYgKCF0dHkuaW5wdXQubGVuZ3RoKSB7XG4gICAgICAgICAgdmFyIHJlc3VsdCA9IG51bGxcbiAgICAgICAgICBpZiAoRU5WSVJPTk1FTlRfSVNfTk9ERSkge1xuICAgICAgICAgICAgLy8gd2Ugd2lsbCByZWFkIGRhdGEgYnkgY2h1bmtzIG9mIEJVRlNJWkVcbiAgICAgICAgICAgIHZhciBCVUZTSVpFID0gMjU2XG4gICAgICAgICAgICB2YXIgYnVmID0gQnVmZmVyLmFsbG9jKEJVRlNJWkUpXG4gICAgICAgICAgICB2YXIgYnl0ZXNSZWFkID0gMFxuXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBieXRlc1JlYWQgPSBmcy5yZWFkU3luYyhwcm9jZXNzLnN0ZGluLmZkLCBidWYsIDAsIEJVRlNJWkUsIC0xKVxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAvLyBDcm9zcy1wbGF0Zm9ybSBkaWZmZXJlbmNlczogb24gV2luZG93cywgcmVhZGluZyBFT0YgdGhyb3dzIGFuIGV4Y2VwdGlvbiwgYnV0IG9uIG90aGVyIE9TZXMsXG4gICAgICAgICAgICAgIC8vIHJlYWRpbmcgRU9GIHJldHVybnMgMC4gVW5pZm9ybWl6ZSBiZWhhdmlvciBieSB0cmVhdGluZyB0aGUgRU9GIGV4Y2VwdGlvbiB0byByZXR1cm4gMC5cbiAgICAgICAgICAgICAgaWYgKGUudG9TdHJpbmcoKS5pbmNsdWRlcygnRU9GJykpIGJ5dGVzUmVhZCA9IDBcbiAgICAgICAgICAgICAgZWxzZSB0aHJvdyBlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChieXRlc1JlYWQgPiAwKSB7XG4gICAgICAgICAgICAgIHJlc3VsdCA9IGJ1Zi5zbGljZSgwLCBieXRlc1JlYWQpLnRvU3RyaW5nKCd1dGYtOCcpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXN1bHQgPSBudWxsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICAgIHR5cGVvZiB3aW5kb3cucHJvbXB0ID09ICdmdW5jdGlvbidcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIC8vIEJyb3dzZXIuXG4gICAgICAgICAgICByZXN1bHQgPSB3aW5kb3cucHJvbXB0KCdJbnB1dDogJykgLy8gcmV0dXJucyBudWxsIG9uIGNhbmNlbFxuICAgICAgICAgICAgaWYgKHJlc3VsdCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICByZXN1bHQgKz0gJ1xcbidcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiByZWFkbGluZSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAvLyBDb21tYW5kIGxpbmUuXG4gICAgICAgICAgICByZXN1bHQgPSByZWFkbGluZSgpXG4gICAgICAgICAgICBpZiAocmVzdWx0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHJlc3VsdCArPSAnXFxuJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICB9XG4gICAgICAgICAgdHR5LmlucHV0ID0gaW50QXJyYXlGcm9tU3RyaW5nKHJlc3VsdCwgdHJ1ZSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHR5LmlucHV0LnNoaWZ0KClcbiAgICAgIH0sXG4gICAgICBwdXRfY2hhcjogZnVuY3Rpb24gKHR0eSwgdmFsKSB7XG4gICAgICAgIGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSAxMCkge1xuICAgICAgICAgIG91dChVVEY4QXJyYXlUb1N0cmluZyh0dHkub3V0cHV0LCAwKSlcbiAgICAgICAgICB0dHkub3V0cHV0ID0gW11cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodmFsICE9IDApIHR0eS5vdXRwdXQucHVzaCh2YWwpIC8vIHZhbCA9PSAwIHdvdWxkIGN1dCB0ZXh0IG91dHB1dCBvZmYgaW4gdGhlIG1pZGRsZS5cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGZzeW5jOiBmdW5jdGlvbiAodHR5KSB7XG4gICAgICAgIGlmICh0dHkub3V0cHV0ICYmIHR0eS5vdXRwdXQubGVuZ3RoID4gMCkge1xuICAgICAgICAgIG91dChVVEY4QXJyYXlUb1N0cmluZyh0dHkub3V0cHV0LCAwKSlcbiAgICAgICAgICB0dHkub3V0cHV0ID0gW11cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgZGVmYXVsdF90dHkxX29wczoge1xuICAgICAgcHV0X2NoYXI6IGZ1bmN0aW9uICh0dHksIHZhbCkge1xuICAgICAgICBpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gMTApIHtcbiAgICAgICAgICBlcnIoVVRGOEFycmF5VG9TdHJpbmcodHR5Lm91dHB1dCwgMCkpXG4gICAgICAgICAgdHR5Lm91dHB1dCA9IFtdXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHZhbCAhPSAwKSB0dHkub3V0cHV0LnB1c2godmFsKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZnN5bmM6IGZ1bmN0aW9uICh0dHkpIHtcbiAgICAgICAgaWYgKHR0eS5vdXRwdXQgJiYgdHR5Lm91dHB1dC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgZXJyKFVURjhBcnJheVRvU3RyaW5nKHR0eS5vdXRwdXQsIDApKVxuICAgICAgICAgIHR0eS5vdXRwdXQgPSBbXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gemVyb01lbW9yeShhZGRyZXNzLCBzaXplKSB7XG4gICAgSEVBUFU4LmZpbGwoMCwgYWRkcmVzcywgYWRkcmVzcyArIHNpemUpXG4gICAgcmV0dXJuIGFkZHJlc3NcbiAgfVxuXG4gIGZ1bmN0aW9uIGFsaWduTWVtb3J5KHNpemUsIGFsaWdubWVudCkge1xuICAgIGFzc2VydChhbGlnbm1lbnQsICdhbGlnbm1lbnQgYXJndW1lbnQgaXMgcmVxdWlyZWQnKVxuICAgIHJldHVybiBNYXRoLmNlaWwoc2l6ZSAvIGFsaWdubWVudCkgKiBhbGlnbm1lbnRcbiAgfVxuICBmdW5jdGlvbiBtbWFwQWxsb2Moc2l6ZSkge1xuICAgIGFib3J0KFxuICAgICAgJ2ludGVybmFsIGVycm9yOiBtbWFwQWxsb2MgY2FsbGVkIGJ1dCBgZW1zY3JpcHRlbl9idWlsdGluX21lbWFsaWduYCBuYXRpdmUgc3ltYm9sIG5vdCBleHBvcnRlZCdcbiAgICApXG4gIH1cbiAgdmFyIE1FTUZTID0ge1xuICAgIG9wc190YWJsZTogbnVsbCxcbiAgICBtb3VudDogZnVuY3Rpb24gKG1vdW50KSB7XG4gICAgICByZXR1cm4gTUVNRlMuY3JlYXRlTm9kZShudWxsLCAnLycsIDE2Mzg0IHwgNTExIC8qIDA3NzcgKi8sIDApXG4gICAgfSxcbiAgICBjcmVhdGVOb2RlOiBmdW5jdGlvbiAocGFyZW50LCBuYW1lLCBtb2RlLCBkZXYpIHtcbiAgICAgIGlmIChGUy5pc0Jsa2Rldihtb2RlKSB8fCBGUy5pc0ZJRk8obW9kZSkpIHtcbiAgICAgICAgLy8gbm8gc3VwcG9ydGVkXG4gICAgICAgIHRocm93IG5ldyBGUy5FcnJub0Vycm9yKDYzKVxuICAgICAgfVxuICAgICAgaWYgKCFNRU1GUy5vcHNfdGFibGUpIHtcbiAgICAgICAgTUVNRlMub3BzX3RhYmxlID0ge1xuICAgICAgICAgIGRpcjoge1xuICAgICAgICAgICAgbm9kZToge1xuICAgICAgICAgICAgICBnZXRhdHRyOiBNRU1GUy5ub2RlX29wcy5nZXRhdHRyLFxuICAgICAgICAgICAgICBzZXRhdHRyOiBNRU1GUy5ub2RlX29wcy5zZXRhdHRyLFxuICAgICAgICAgICAgICBsb29rdXA6IE1FTUZTLm5vZGVfb3BzLmxvb2t1cCxcbiAgICAgICAgICAgICAgbWtub2Q6IE1FTUZTLm5vZGVfb3BzLm1rbm9kLFxuICAgICAgICAgICAgICByZW5hbWU6IE1FTUZTLm5vZGVfb3BzLnJlbmFtZSxcbiAgICAgICAgICAgICAgdW5saW5rOiBNRU1GUy5ub2RlX29wcy51bmxpbmssXG4gICAgICAgICAgICAgIHJtZGlyOiBNRU1GUy5ub2RlX29wcy5ybWRpcixcbiAgICAgICAgICAgICAgcmVhZGRpcjogTUVNRlMubm9kZV9vcHMucmVhZGRpcixcbiAgICAgICAgICAgICAgc3ltbGluazogTUVNRlMubm9kZV9vcHMuc3ltbGlua1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN0cmVhbToge1xuICAgICAgICAgICAgICBsbHNlZWs6IE1FTUZTLnN0cmVhbV9vcHMubGxzZWVrXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmaWxlOiB7XG4gICAgICAgICAgICBub2RlOiB7XG4gICAgICAgICAgICAgIGdldGF0dHI6IE1FTUZTLm5vZGVfb3BzLmdldGF0dHIsXG4gICAgICAgICAgICAgIHNldGF0dHI6IE1FTUZTLm5vZGVfb3BzLnNldGF0dHJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdHJlYW06IHtcbiAgICAgICAgICAgICAgbGxzZWVrOiBNRU1GUy5zdHJlYW1fb3BzLmxsc2VlayxcbiAgICAgICAgICAgICAgcmVhZDogTUVNRlMuc3RyZWFtX29wcy5yZWFkLFxuICAgICAgICAgICAgICB3cml0ZTogTUVNRlMuc3RyZWFtX29wcy53cml0ZSxcbiAgICAgICAgICAgICAgYWxsb2NhdGU6IE1FTUZTLnN0cmVhbV9vcHMuYWxsb2NhdGUsXG4gICAgICAgICAgICAgIG1tYXA6IE1FTUZTLnN0cmVhbV9vcHMubW1hcCxcbiAgICAgICAgICAgICAgbXN5bmM6IE1FTUZTLnN0cmVhbV9vcHMubXN5bmNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGxpbms6IHtcbiAgICAgICAgICAgIG5vZGU6IHtcbiAgICAgICAgICAgICAgZ2V0YXR0cjogTUVNRlMubm9kZV9vcHMuZ2V0YXR0cixcbiAgICAgICAgICAgICAgc2V0YXR0cjogTUVNRlMubm9kZV9vcHMuc2V0YXR0cixcbiAgICAgICAgICAgICAgcmVhZGxpbms6IE1FTUZTLm5vZGVfb3BzLnJlYWRsaW5rXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3RyZWFtOiB7fVxuICAgICAgICAgIH0sXG4gICAgICAgICAgY2hyZGV2OiB7XG4gICAgICAgICAgICBub2RlOiB7XG4gICAgICAgICAgICAgIGdldGF0dHI6IE1FTUZTLm5vZGVfb3BzLmdldGF0dHIsXG4gICAgICAgICAgICAgIHNldGF0dHI6IE1FTUZTLm5vZGVfb3BzLnNldGF0dHJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdHJlYW06IEZTLmNocmRldl9zdHJlYW1fb3BzXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YXIgbm9kZSA9IEZTLmNyZWF0ZU5vZGUocGFyZW50LCBuYW1lLCBtb2RlLCBkZXYpXG4gICAgICBpZiAoRlMuaXNEaXIobm9kZS5tb2RlKSkge1xuICAgICAgICBub2RlLm5vZGVfb3BzID0gTUVNRlMub3BzX3RhYmxlLmRpci5ub2RlXG4gICAgICAgIG5vZGUuc3RyZWFtX29wcyA9IE1FTUZTLm9wc190YWJsZS5kaXIuc3RyZWFtXG4gICAgICAgIG5vZGUuY29udGVudHMgPSB7fVxuICAgICAgfSBlbHNlIGlmIChGUy5pc0ZpbGUobm9kZS5tb2RlKSkge1xuICAgICAgICBub2RlLm5vZGVfb3BzID0gTUVNRlMub3BzX3RhYmxlLmZpbGUubm9kZVxuICAgICAgICBub2RlLnN0cmVhbV9vcHMgPSBNRU1GUy5vcHNfdGFibGUuZmlsZS5zdHJlYW1cbiAgICAgICAgbm9kZS51c2VkQnl0ZXMgPSAwIC8vIFRoZSBhY3R1YWwgbnVtYmVyIG9mIGJ5dGVzIHVzZWQgaW4gdGhlIHR5cGVkIGFycmF5LCBhcyBvcHBvc2VkIHRvIGNvbnRlbnRzLmxlbmd0aCB3aGljaCBnaXZlcyB0aGUgd2hvbGUgY2FwYWNpdHkuXG4gICAgICAgIC8vIFdoZW4gdGhlIGJ5dGUgZGF0YSBvZiB0aGUgZmlsZSBpcyBwb3B1bGF0ZWQsIHRoaXMgd2lsbCBwb2ludCB0byBlaXRoZXIgYSB0eXBlZCBhcnJheSwgb3IgYSBub3JtYWwgSlMgYXJyYXkuIFR5cGVkIGFycmF5cyBhcmUgcHJlZmVycmVkXG4gICAgICAgIC8vIGZvciBwZXJmb3JtYW5jZSwgYW5kIHVzZWQgYnkgZGVmYXVsdC4gSG93ZXZlciwgdHlwZWQgYXJyYXlzIGFyZSBub3QgcmVzaXphYmxlIGxpa2Ugbm9ybWFsIEpTIGFycmF5cyBhcmUsIHNvIHRoZXJlIGlzIGEgc21hbGwgZGlzayBzaXplXG4gICAgICAgIC8vIHBlbmFsdHkgaW52b2x2ZWQgZm9yIGFwcGVuZGluZyBmaWxlIHdyaXRlcyB0aGF0IGNvbnRpbnVvdXNseSBncm93IGEgZmlsZSBzaW1pbGFyIHRvIHN0ZDo6dmVjdG9yIGNhcGFjaXR5IHZzIHVzZWQgLXNjaGVtZS5cbiAgICAgICAgbm9kZS5jb250ZW50cyA9IG51bGxcbiAgICAgIH0gZWxzZSBpZiAoRlMuaXNMaW5rKG5vZGUubW9kZSkpIHtcbiAgICAgICAgbm9kZS5ub2RlX29wcyA9IE1FTUZTLm9wc190YWJsZS5saW5rLm5vZGVcbiAgICAgICAgbm9kZS5zdHJlYW1fb3BzID0gTUVNRlMub3BzX3RhYmxlLmxpbmsuc3RyZWFtXG4gICAgICB9IGVsc2UgaWYgKEZTLmlzQ2hyZGV2KG5vZGUubW9kZSkpIHtcbiAgICAgICAgbm9kZS5ub2RlX29wcyA9IE1FTUZTLm9wc190YWJsZS5jaHJkZXYubm9kZVxuICAgICAgICBub2RlLnN0cmVhbV9vcHMgPSBNRU1GUy5vcHNfdGFibGUuY2hyZGV2LnN0cmVhbVxuICAgICAgfVxuICAgICAgbm9kZS50aW1lc3RhbXAgPSBEYXRlLm5vdygpXG4gICAgICAvLyBhZGQgdGhlIG5ldyBub2RlIHRvIHRoZSBwYXJlbnRcbiAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgcGFyZW50LmNvbnRlbnRzW25hbWVdID0gbm9kZVxuICAgICAgICBwYXJlbnQudGltZXN0YW1wID0gbm9kZS50aW1lc3RhbXBcbiAgICAgIH1cbiAgICAgIHJldHVybiBub2RlXG4gICAgfSxcbiAgICBnZXRGaWxlRGF0YUFzVHlwZWRBcnJheTogZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgIGlmICghbm9kZS5jb250ZW50cykgcmV0dXJuIG5ldyBVaW50OEFycmF5KDApXG4gICAgICBpZiAobm9kZS5jb250ZW50cy5zdWJhcnJheSlcbiAgICAgICAgcmV0dXJuIG5vZGUuY29udGVudHMuc3ViYXJyYXkoMCwgbm9kZS51c2VkQnl0ZXMpIC8vIE1ha2Ugc3VyZSB0byBub3QgcmV0dXJuIGV4Y2VzcyB1bnVzZWQgYnl0ZXMuXG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkobm9kZS5jb250ZW50cylcbiAgICB9LFxuICAgIGV4cGFuZEZpbGVTdG9yYWdlOiBmdW5jdGlvbiAobm9kZSwgbmV3Q2FwYWNpdHkpIHtcbiAgICAgIHZhciBwcmV2Q2FwYWNpdHkgPSBub2RlLmNvbnRlbnRzID8gbm9kZS5jb250ZW50cy5sZW5ndGggOiAwXG4gICAgICBpZiAocHJldkNhcGFjaXR5ID49IG5ld0NhcGFjaXR5KSByZXR1cm4gLy8gTm8gbmVlZCB0byBleHBhbmQsIHRoZSBzdG9yYWdlIHdhcyBhbHJlYWR5IGxhcmdlIGVub3VnaC5cbiAgICAgIC8vIERvbid0IGV4cGFuZCBzdHJpY3RseSB0byB0aGUgZ2l2ZW4gcmVxdWVzdGVkIGxpbWl0IGlmIGl0J3Mgb25seSBhIHZlcnkgc21hbGwgaW5jcmVhc2UsIGJ1dCBpbnN0ZWFkIGdlb21ldHJpY2FsbHkgZ3JvdyBjYXBhY2l0eS5cbiAgICAgIC8vIEZvciBzbWFsbCBmaWxlc2l6ZXMgKDwxTUIpLCBwZXJmb3JtIHNpemUqMiBnZW9tZXRyaWMgaW5jcmVhc2UsIGJ1dCBmb3IgbGFyZ2Ugc2l6ZXMsIGRvIGEgbXVjaCBtb3JlIGNvbnNlcnZhdGl2ZSBzaXplKjEuMTI1IGluY3JlYXNlIHRvXG4gICAgICAvLyBhdm9pZCBvdmVyc2hvb3RpbmcgdGhlIGFsbG9jYXRpb24gY2FwIGJ5IGEgdmVyeSBsYXJnZSBtYXJnaW4uXG4gICAgICB2YXIgQ0FQQUNJVFlfRE9VQkxJTkdfTUFYID0gMTAyNCAqIDEwMjRcbiAgICAgIG5ld0NhcGFjaXR5ID0gTWF0aC5tYXgoXG4gICAgICAgIG5ld0NhcGFjaXR5LFxuICAgICAgICAocHJldkNhcGFjaXR5ICpcbiAgICAgICAgICAocHJldkNhcGFjaXR5IDwgQ0FQQUNJVFlfRE9VQkxJTkdfTUFYID8gMi4wIDogMS4xMjUpKSA+Pj5cbiAgICAgICAgICAwXG4gICAgICApXG4gICAgICBpZiAocHJldkNhcGFjaXR5ICE9IDApIG5ld0NhcGFjaXR5ID0gTWF0aC5tYXgobmV3Q2FwYWNpdHksIDI1NikgLy8gQXQgbWluaW11bSBhbGxvY2F0ZSAyNTZiIGZvciBlYWNoIGZpbGUgd2hlbiBleHBhbmRpbmcuXG4gICAgICB2YXIgb2xkQ29udGVudHMgPSBub2RlLmNvbnRlbnRzXG4gICAgICBub2RlLmNvbnRlbnRzID0gbmV3IFVpbnQ4QXJyYXkobmV3Q2FwYWNpdHkpIC8vIEFsbG9jYXRlIG5ldyBzdG9yYWdlLlxuICAgICAgaWYgKG5vZGUudXNlZEJ5dGVzID4gMClcbiAgICAgICAgbm9kZS5jb250ZW50cy5zZXQob2xkQ29udGVudHMuc3ViYXJyYXkoMCwgbm9kZS51c2VkQnl0ZXMpLCAwKSAvLyBDb3B5IG9sZCBkYXRhIG92ZXIgdG8gdGhlIG5ldyBzdG9yYWdlLlxuICAgIH0sXG4gICAgcmVzaXplRmlsZVN0b3JhZ2U6IGZ1bmN0aW9uIChub2RlLCBuZXdTaXplKSB7XG4gICAgICBpZiAobm9kZS51c2VkQnl0ZXMgPT0gbmV3U2l6ZSkgcmV0dXJuXG4gICAgICBpZiAobmV3U2l6ZSA9PSAwKSB7XG4gICAgICAgIG5vZGUuY29udGVudHMgPSBudWxsIC8vIEZ1bGx5IGRlY29tbWl0IHdoZW4gcmVxdWVzdGluZyBhIHJlc2l6ZSB0byB6ZXJvLlxuICAgICAgICBub2RlLnVzZWRCeXRlcyA9IDBcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBvbGRDb250ZW50cyA9IG5vZGUuY29udGVudHNcbiAgICAgICAgbm9kZS5jb250ZW50cyA9IG5ldyBVaW50OEFycmF5KG5ld1NpemUpIC8vIEFsbG9jYXRlIG5ldyBzdG9yYWdlLlxuICAgICAgICBpZiAob2xkQ29udGVudHMpIHtcbiAgICAgICAgICBub2RlLmNvbnRlbnRzLnNldChcbiAgICAgICAgICAgIG9sZENvbnRlbnRzLnN1YmFycmF5KDAsIE1hdGgubWluKG5ld1NpemUsIG5vZGUudXNlZEJ5dGVzKSlcbiAgICAgICAgICApIC8vIENvcHkgb2xkIGRhdGEgb3ZlciB0byB0aGUgbmV3IHN0b3JhZ2UuXG4gICAgICAgIH1cbiAgICAgICAgbm9kZS51c2VkQnl0ZXMgPSBuZXdTaXplXG4gICAgICB9XG4gICAgfSxcbiAgICBub2RlX29wczoge1xuICAgICAgZ2V0YXR0cjogZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgdmFyIGF0dHIgPSB7fVxuICAgICAgICAvLyBkZXZpY2UgbnVtYmVycyByZXVzZSBpbm9kZSBudW1iZXJzLlxuICAgICAgICBhdHRyLmRldiA9IEZTLmlzQ2hyZGV2KG5vZGUubW9kZSkgPyBub2RlLmlkIDogMVxuICAgICAgICBhdHRyLmlubyA9IG5vZGUuaWRcbiAgICAgICAgYXR0ci5tb2RlID0gbm9kZS5tb2RlXG4gICAgICAgIGF0dHIubmxpbmsgPSAxXG4gICAgICAgIGF0dHIudWlkID0gMFxuICAgICAgICBhdHRyLmdpZCA9IDBcbiAgICAgICAgYXR0ci5yZGV2ID0gbm9kZS5yZGV2XG4gICAgICAgIGlmIChGUy5pc0Rpcihub2RlLm1vZGUpKSB7XG4gICAgICAgICAgYXR0ci5zaXplID0gNDA5NlxuICAgICAgICB9IGVsc2UgaWYgKEZTLmlzRmlsZShub2RlLm1vZGUpKSB7XG4gICAgICAgICAgYXR0ci5zaXplID0gbm9kZS51c2VkQnl0ZXNcbiAgICAgICAgfSBlbHNlIGlmIChGUy5pc0xpbmsobm9kZS5tb2RlKSkge1xuICAgICAgICAgIGF0dHIuc2l6ZSA9IG5vZGUubGluay5sZW5ndGhcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhdHRyLnNpemUgPSAwXG4gICAgICAgIH1cbiAgICAgICAgYXR0ci5hdGltZSA9IG5ldyBEYXRlKG5vZGUudGltZXN0YW1wKVxuICAgICAgICBhdHRyLm10aW1lID0gbmV3IERhdGUobm9kZS50aW1lc3RhbXApXG4gICAgICAgIGF0dHIuY3RpbWUgPSBuZXcgRGF0ZShub2RlLnRpbWVzdGFtcClcbiAgICAgICAgLy8gTk9URTogSW4gb3VyIGltcGxlbWVudGF0aW9uLCBzdF9ibG9ja3MgPSBNYXRoLmNlaWwoc3Rfc2l6ZS9zdF9ibGtzaXplKSxcbiAgICAgICAgLy8gICAgICAgYnV0IHRoaXMgaXMgbm90IHJlcXVpcmVkIGJ5IHRoZSBzdGFuZGFyZC5cbiAgICAgICAgYXR0ci5ibGtzaXplID0gNDA5NlxuICAgICAgICBhdHRyLmJsb2NrcyA9IE1hdGguY2VpbChhdHRyLnNpemUgLyBhdHRyLmJsa3NpemUpXG4gICAgICAgIHJldHVybiBhdHRyXG4gICAgICB9LFxuICAgICAgc2V0YXR0cjogZnVuY3Rpb24gKG5vZGUsIGF0dHIpIHtcbiAgICAgICAgaWYgKGF0dHIubW9kZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgbm9kZS5tb2RlID0gYXR0ci5tb2RlXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGF0dHIudGltZXN0YW1wICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBub2RlLnRpbWVzdGFtcCA9IGF0dHIudGltZXN0YW1wXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGF0dHIuc2l6ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgTUVNRlMucmVzaXplRmlsZVN0b3JhZ2Uobm9kZSwgYXR0ci5zaXplKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbG9va3VwOiBmdW5jdGlvbiAocGFyZW50LCBuYW1lKSB7XG4gICAgICAgIHRocm93IEZTLmdlbmVyaWNFcnJvcnNbNDRdXG4gICAgICB9LFxuICAgICAgbWtub2Q6IGZ1bmN0aW9uIChwYXJlbnQsIG5hbWUsIG1vZGUsIGRldikge1xuICAgICAgICByZXR1cm4gTUVNRlMuY3JlYXRlTm9kZShwYXJlbnQsIG5hbWUsIG1vZGUsIGRldilcbiAgICAgIH0sXG4gICAgICByZW5hbWU6IGZ1bmN0aW9uIChvbGRfbm9kZSwgbmV3X2RpciwgbmV3X25hbWUpIHtcbiAgICAgICAgLy8gaWYgd2UncmUgb3ZlcndyaXRpbmcgYSBkaXJlY3RvcnkgYXQgbmV3X25hbWUsIG1ha2Ugc3VyZSBpdCdzIGVtcHR5LlxuICAgICAgICBpZiAoRlMuaXNEaXIob2xkX25vZGUubW9kZSkpIHtcbiAgICAgICAgICB2YXIgbmV3X25vZGVcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgbmV3X25vZGUgPSBGUy5sb29rdXBOb2RlKG5ld19kaXIsIG5ld19uYW1lKVxuICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgICAgaWYgKG5ld19ub2RlKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIG5ld19ub2RlLmNvbnRlbnRzKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBGUy5FcnJub0Vycm9yKDU1KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBkbyB0aGUgaW50ZXJuYWwgcmV3aXJpbmdcbiAgICAgICAgZGVsZXRlIG9sZF9ub2RlLnBhcmVudC5jb250ZW50c1tvbGRfbm9kZS5uYW1lXVxuICAgICAgICBvbGRfbm9kZS5wYXJlbnQudGltZXN0YW1wID0gRGF0ZS5ub3coKVxuICAgICAgICBvbGRfbm9kZS5uYW1lID0gbmV3X25hbWVcbiAgICAgICAgbmV3X2Rpci5jb250ZW50c1tuZXdfbmFtZV0gPSBvbGRfbm9kZVxuICAgICAgICBuZXdfZGlyLnRpbWVzdGFtcCA9IG9sZF9ub2RlLnBhcmVudC50aW1lc3RhbXBcbiAgICAgICAgb2xkX25vZGUucGFyZW50ID0gbmV3X2RpclxuICAgICAgfSxcbiAgICAgIHVubGluazogZnVuY3Rpb24gKHBhcmVudCwgbmFtZSkge1xuICAgICAgICBkZWxldGUgcGFyZW50LmNvbnRlbnRzW25hbWVdXG4gICAgICAgIHBhcmVudC50aW1lc3RhbXAgPSBEYXRlLm5vdygpXG4gICAgICB9LFxuICAgICAgcm1kaXI6IGZ1bmN0aW9uIChwYXJlbnQsIG5hbWUpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBGUy5sb29rdXBOb2RlKHBhcmVudCwgbmFtZSlcbiAgICAgICAgZm9yICh2YXIgaSBpbiBub2RlLmNvbnRlbnRzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEZTLkVycm5vRXJyb3IoNTUpXG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIHBhcmVudC5jb250ZW50c1tuYW1lXVxuICAgICAgICBwYXJlbnQudGltZXN0YW1wID0gRGF0ZS5ub3coKVxuICAgICAgfSxcbiAgICAgIHJlYWRkaXI6IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIHZhciBlbnRyaWVzID0gWycuJywgJy4uJ11cbiAgICAgICAgZm9yICh2YXIga2V5IGluIG5vZGUuY29udGVudHMpIHtcbiAgICAgICAgICBpZiAoIW5vZGUuY29udGVudHMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICB9XG4gICAgICAgICAgZW50cmllcy5wdXNoKGtleSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZW50cmllc1xuICAgICAgfSxcbiAgICAgIHN5bWxpbms6IGZ1bmN0aW9uIChwYXJlbnQsIG5ld25hbWUsIG9sZHBhdGgpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBNRU1GUy5jcmVhdGVOb2RlKHBhcmVudCwgbmV3bmFtZSwgNTExIC8qIDA3NzcgKi8gfCA0MDk2MCwgMClcbiAgICAgICAgbm9kZS5saW5rID0gb2xkcGF0aFxuICAgICAgICByZXR1cm4gbm9kZVxuICAgICAgfSxcbiAgICAgIHJlYWRsaW5rOiBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICBpZiAoIUZTLmlzTGluayhub2RlLm1vZGUpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEZTLkVycm5vRXJyb3IoMjgpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vZGUubGlua1xuICAgICAgfVxuICAgIH0sXG4gICAgc3RyZWFtX29wczoge1xuICAgICAgcmVhZDogZnVuY3Rpb24gKHN0cmVhbSwgYnVmZmVyLCBvZmZzZXQsIGxlbmd0aCwgcG9zaXRpb24pIHtcbiAgICAgICAgdmFyIGNvbnRlbnRzID0gc3RyZWFtLm5vZGUuY29udGVudHNcbiAgICAgICAgaWYgKHBvc2l0aW9uID49IHN0cmVhbS5ub2RlLnVzZWRCeXRlcykgcmV0dXJuIDBcbiAgICAgICAgdmFyIHNpemUgPSBNYXRoLm1pbihzdHJlYW0ubm9kZS51c2VkQnl0ZXMgLSBwb3NpdGlvbiwgbGVuZ3RoKVxuICAgICAgICBhc3NlcnQoc2l6ZSA+PSAwKVxuICAgICAgICBpZiAoc2l6ZSA+IDggJiYgY29udGVudHMuc3ViYXJyYXkpIHtcbiAgICAgICAgICAvLyBub24tdHJpdmlhbCwgYW5kIHR5cGVkIGFycmF5XG4gICAgICAgICAgYnVmZmVyLnNldChjb250ZW50cy5zdWJhcnJheShwb3NpdGlvbiwgcG9zaXRpb24gKyBzaXplKSwgb2Zmc2V0KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgaSsrKVxuICAgICAgICAgICAgYnVmZmVyW29mZnNldCArIGldID0gY29udGVudHNbcG9zaXRpb24gKyBpXVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzaXplXG4gICAgICB9LFxuICAgICAgd3JpdGU6IGZ1bmN0aW9uIChzdHJlYW0sIGJ1ZmZlciwgb2Zmc2V0LCBsZW5ndGgsIHBvc2l0aW9uLCBjYW5Pd24pIHtcbiAgICAgICAgLy8gVGhlIGRhdGEgYnVmZmVyIHNob3VsZCBiZSBhIHR5cGVkIGFycmF5IHZpZXdcbiAgICAgICAgYXNzZXJ0KCEoYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpKVxuICAgICAgICAvLyBJZiB0aGUgYnVmZmVyIGlzIGxvY2F0ZWQgaW4gbWFpbiBtZW1vcnkgKEhFQVApLCBhbmQgaWZcbiAgICAgICAgLy8gbWVtb3J5IGNhbiBncm93LCB3ZSBjYW4ndCBob2xkIG9uIHRvIHJlZmVyZW5jZXMgb2YgdGhlXG4gICAgICAgIC8vIG1lbW9yeSBidWZmZXIsIGFzIHRoZXkgbWF5IGdldCBpbnZhbGlkYXRlZC4gVGhhdCBtZWFucyB3ZVxuICAgICAgICAvLyBuZWVkIHRvIGRvIGNvcHkgaXRzIGNvbnRlbnRzLlxuICAgICAgICBpZiAoYnVmZmVyLmJ1ZmZlciA9PT0gSEVBUDguYnVmZmVyKSB7XG4gICAgICAgICAgY2FuT3duID0gZmFsc2VcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghbGVuZ3RoKSByZXR1cm4gMFxuICAgICAgICB2YXIgbm9kZSA9IHN0cmVhbS5ub2RlXG4gICAgICAgIG5vZGUudGltZXN0YW1wID0gRGF0ZS5ub3coKVxuXG4gICAgICAgIGlmIChidWZmZXIuc3ViYXJyYXkgJiYgKCFub2RlLmNvbnRlbnRzIHx8IG5vZGUuY29udGVudHMuc3ViYXJyYXkpKSB7XG4gICAgICAgICAgLy8gVGhpcyB3cml0ZSBpcyBmcm9tIGEgdHlwZWQgYXJyYXkgdG8gYSB0eXBlZCBhcnJheT9cbiAgICAgICAgICBpZiAoY2FuT3duKSB7XG4gICAgICAgICAgICBhc3NlcnQoXG4gICAgICAgICAgICAgIHBvc2l0aW9uID09PSAwLFxuICAgICAgICAgICAgICAnY2FuT3duIG11c3QgaW1wbHkgbm8gd2VpcmQgcG9zaXRpb24gaW5zaWRlIHRoZSBmaWxlJ1xuICAgICAgICAgICAgKVxuICAgICAgICAgICAgbm9kZS5jb250ZW50cyA9IGJ1ZmZlci5zdWJhcnJheShvZmZzZXQsIG9mZnNldCArIGxlbmd0aClcbiAgICAgICAgICAgIG5vZGUudXNlZEJ5dGVzID0gbGVuZ3RoXG4gICAgICAgICAgICByZXR1cm4gbGVuZ3RoXG4gICAgICAgICAgfSBlbHNlIGlmIChub2RlLnVzZWRCeXRlcyA9PT0gMCAmJiBwb3NpdGlvbiA9PT0gMCkge1xuICAgICAgICAgICAgLy8gSWYgdGhpcyBpcyBhIHNpbXBsZSBmaXJzdCB3cml0ZSB0byBhbiBlbXB0eSBmaWxlLCBkbyBhIGZhc3Qgc2V0IHNpbmNlIHdlIGRvbid0IG5lZWQgdG8gY2FyZSBhYm91dCBvbGQgZGF0YS5cbiAgICAgICAgICAgIG5vZGUuY29udGVudHMgPSBidWZmZXIuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyBsZW5ndGgpXG4gICAgICAgICAgICBub2RlLnVzZWRCeXRlcyA9IGxlbmd0aFxuICAgICAgICAgICAgcmV0dXJuIGxlbmd0aFxuICAgICAgICAgIH0gZWxzZSBpZiAocG9zaXRpb24gKyBsZW5ndGggPD0gbm9kZS51c2VkQnl0ZXMpIHtcbiAgICAgICAgICAgIC8vIFdyaXRpbmcgdG8gYW4gYWxyZWFkeSBhbGxvY2F0ZWQgYW5kIHVzZWQgc3VicmFuZ2Ugb2YgdGhlIGZpbGU/XG4gICAgICAgICAgICBub2RlLmNvbnRlbnRzLnNldChcbiAgICAgICAgICAgICAgYnVmZmVyLnN1YmFycmF5KG9mZnNldCwgb2Zmc2V0ICsgbGVuZ3RoKSxcbiAgICAgICAgICAgICAgcG9zaXRpb25cbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIHJldHVybiBsZW5ndGhcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBcHBlbmRpbmcgdG8gYW4gZXhpc3RpbmcgZmlsZSBhbmQgd2UgbmVlZCB0byByZWFsbG9jYXRlLCBvciBzb3VyY2UgZGF0YSBkaWQgbm90IGNvbWUgYXMgYSB0eXBlZCBhcnJheS5cbiAgICAgICAgTUVNRlMuZXhwYW5kRmlsZVN0b3JhZ2Uobm9kZSwgcG9zaXRpb24gKyBsZW5ndGgpXG4gICAgICAgIGlmIChub2RlLmNvbnRlbnRzLnN1YmFycmF5ICYmIGJ1ZmZlci5zdWJhcnJheSkge1xuICAgICAgICAgIC8vIFVzZSB0eXBlZCBhcnJheSB3cml0ZSB3aGljaCBpcyBhdmFpbGFibGUuXG4gICAgICAgICAgbm9kZS5jb250ZW50cy5zZXQoYnVmZmVyLnN1YmFycmF5KG9mZnNldCwgb2Zmc2V0ICsgbGVuZ3RoKSwgcG9zaXRpb24pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbm9kZS5jb250ZW50c1twb3NpdGlvbiArIGldID0gYnVmZmVyW29mZnNldCArIGldIC8vIE9yIGZhbGwgYmFjayB0byBtYW51YWwgd3JpdGUgaWYgbm90LlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBub2RlLnVzZWRCeXRlcyA9IE1hdGgubWF4KG5vZGUudXNlZEJ5dGVzLCBwb3NpdGlvbiArIGxlbmd0aClcbiAgICAgICAgcmV0dXJuIGxlbmd0aFxuICAgICAgfSxcbiAgICAgIGxsc2VlazogZnVuY3Rpb24gKHN0cmVhbSwgb2Zmc2V0LCB3aGVuY2UpIHtcbiAgICAgICAgdmFyIHBvc2l0aW9uID0gb2Zmc2V0XG4gICAgICAgIGlmICh3aGVuY2UgPT09IDEpIHtcbiAgICAgICAgICBwb3NpdGlvbiArPSBzdHJlYW0ucG9zaXRpb25cbiAgICAgICAgfSBlbHNlIGlmICh3aGVuY2UgPT09IDIpIHtcbiAgICAgICAgICBpZiAoRlMuaXNGaWxlKHN0cmVhbS5ub2RlLm1vZGUpKSB7XG4gICAgICAgICAgICBwb3NpdGlvbiArPSBzdHJlYW0ubm9kZS51c2VkQnl0ZXNcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBvc2l0aW9uIDwgMCkge1xuICAgICAgICAgIHRocm93IG5ldyBGUy5FcnJub0Vycm9yKDI4KVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwb3NpdGlvblxuICAgICAgfSxcbiAgICAgIGFsbG9jYXRlOiBmdW5jdGlvbiAoc3RyZWFtLCBvZmZzZXQsIGxlbmd0aCkge1xuICAgICAgICBNRU1GUy5leHBhbmRGaWxlU3RvcmFnZShzdHJlYW0ubm9kZSwgb2Zmc2V0ICsgbGVuZ3RoKVxuICAgICAgICBzdHJlYW0ubm9kZS51c2VkQnl0ZXMgPSBNYXRoLm1heChzdHJlYW0ubm9kZS51c2VkQnl0ZXMsIG9mZnNldCArIGxlbmd0aClcbiAgICAgIH0sXG4gICAgICBtbWFwOiBmdW5jdGlvbiAoc3RyZWFtLCBsZW5ndGgsIHBvc2l0aW9uLCBwcm90LCBmbGFncykge1xuICAgICAgICBpZiAoIUZTLmlzRmlsZShzdHJlYW0ubm9kZS5tb2RlKSkge1xuICAgICAgICAgIHRocm93IG5ldyBGUy5FcnJub0Vycm9yKDQzKVxuICAgICAgICB9XG4gICAgICAgIHZhciBwdHJcbiAgICAgICAgdmFyIGFsbG9jYXRlZFxuICAgICAgICB2YXIgY29udGVudHMgPSBzdHJlYW0ubm9kZS5jb250ZW50c1xuICAgICAgICAvLyBPbmx5IG1ha2UgYSBuZXcgY29weSB3aGVuIE1BUF9QUklWQVRFIGlzIHNwZWNpZmllZC5cbiAgICAgICAgaWYgKCEoZmxhZ3MgJiAyKSAmJiBjb250ZW50cy5idWZmZXIgPT09IGJ1ZmZlcikge1xuICAgICAgICAgIC8vIFdlIGNhbid0IGVtdWxhdGUgTUFQX1NIQVJFRCB3aGVuIHRoZSBmaWxlIGlzIG5vdCBiYWNrZWQgYnkgdGhlIGJ1ZmZlclxuICAgICAgICAgIC8vIHdlJ3JlIG1hcHBpbmcgdG8gKGUuZy4gdGhlIEhFQVAgYnVmZmVyKS5cbiAgICAgICAgICBhbGxvY2F0ZWQgPSBmYWxzZVxuICAgICAgICAgIHB0ciA9IGNvbnRlbnRzLmJ5dGVPZmZzZXRcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBUcnkgdG8gYXZvaWQgdW5uZWNlc3Nhcnkgc2xpY2VzLlxuICAgICAgICAgIGlmIChwb3NpdGlvbiA+IDAgfHwgcG9zaXRpb24gKyBsZW5ndGggPCBjb250ZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChjb250ZW50cy5zdWJhcnJheSkge1xuICAgICAgICAgICAgICBjb250ZW50cyA9IGNvbnRlbnRzLnN1YmFycmF5KHBvc2l0aW9uLCBwb3NpdGlvbiArIGxlbmd0aClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnRlbnRzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoXG4gICAgICAgICAgICAgICAgY29udGVudHMsXG4gICAgICAgICAgICAgICAgcG9zaXRpb24sXG4gICAgICAgICAgICAgICAgcG9zaXRpb24gKyBsZW5ndGhcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBhbGxvY2F0ZWQgPSB0cnVlXG4gICAgICAgICAgcHRyID0gbW1hcEFsbG9jKGxlbmd0aClcbiAgICAgICAgICBpZiAoIXB0cikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEZTLkVycm5vRXJyb3IoNDgpXG4gICAgICAgICAgfVxuICAgICAgICAgIEhFQVA4LnNldChjb250ZW50cywgcHRyKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHB0cjogcHRyLCBhbGxvY2F0ZWQ6IGFsbG9jYXRlZCB9XG4gICAgICB9LFxuICAgICAgbXN5bmM6IGZ1bmN0aW9uIChzdHJlYW0sIGJ1ZmZlciwgb2Zmc2V0LCBsZW5ndGgsIG1tYXBGbGFncykge1xuICAgICAgICBNRU1GUy5zdHJlYW1fb3BzLndyaXRlKHN0cmVhbSwgYnVmZmVyLCAwLCBsZW5ndGgsIG9mZnNldCwgZmFsc2UpXG4gICAgICAgIC8vIHNob3VsZCB3ZSBjaGVjayBpZiBieXRlc1dyaXR0ZW4gYW5kIGxlbmd0aCBhcmUgdGhlIHNhbWU/XG4gICAgICAgIHJldHVybiAwXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwYXJhbSB7Ym9vbGVhbj19IG5vUnVuRGVwICovXG4gIGZ1bmN0aW9uIGFzeW5jTG9hZCh1cmwsIG9ubG9hZCwgb25lcnJvciwgbm9SdW5EZXApIHtcbiAgICB2YXIgZGVwID0gIW5vUnVuRGVwID8gZ2V0VW5pcXVlUnVuRGVwZW5kZW5jeSgnYWwgJyArIHVybCkgOiAnJ1xuICAgIHJlYWRBc3luYyhcbiAgICAgIHVybCxcbiAgICAgIChhcnJheUJ1ZmZlcikgPT4ge1xuICAgICAgICBhc3NlcnQoXG4gICAgICAgICAgYXJyYXlCdWZmZXIsXG4gICAgICAgICAgJ0xvYWRpbmcgZGF0YSBmaWxlIFwiJyArIHVybCArICdcIiBmYWlsZWQgKG5vIGFycmF5QnVmZmVyKS4nXG4gICAgICAgIClcbiAgICAgICAgb25sb2FkKG5ldyBVaW50OEFycmF5KGFycmF5QnVmZmVyKSlcbiAgICAgICAgaWYgKGRlcCkgcmVtb3ZlUnVuRGVwZW5kZW5jeShkZXApXG4gICAgICB9LFxuICAgICAgKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChvbmVycm9yKSB7XG4gICAgICAgICAgb25lcnJvcigpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgJ0xvYWRpbmcgZGF0YSBmaWxlIFwiJyArIHVybCArICdcIiBmYWlsZWQuJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKVxuICAgIGlmIChkZXApIGFkZFJ1bkRlcGVuZGVuY3koZGVwKVxuICB9XG5cbiAgdmFyIEVSUk5PX01FU1NBR0VTID0ge1xuICAgIDA6ICdTdWNjZXNzJyxcbiAgICAxOiAnQXJnIGxpc3QgdG9vIGxvbmcnLFxuICAgIDI6ICdQZXJtaXNzaW9uIGRlbmllZCcsXG4gICAgMzogJ0FkZHJlc3MgYWxyZWFkeSBpbiB1c2UnLFxuICAgIDQ6ICdBZGRyZXNzIG5vdCBhdmFpbGFibGUnLFxuICAgIDU6ICdBZGRyZXNzIGZhbWlseSBub3Qgc3VwcG9ydGVkIGJ5IHByb3RvY29sIGZhbWlseScsXG4gICAgNjogJ05vIG1vcmUgcHJvY2Vzc2VzJyxcbiAgICA3OiAnU29ja2V0IGFscmVhZHkgY29ubmVjdGVkJyxcbiAgICA4OiAnQmFkIGZpbGUgbnVtYmVyJyxcbiAgICA5OiAnVHJ5aW5nIHRvIHJlYWQgdW5yZWFkYWJsZSBtZXNzYWdlJyxcbiAgICAxMDogJ01vdW50IGRldmljZSBidXN5JyxcbiAgICAxMTogJ09wZXJhdGlvbiBjYW5jZWxlZCcsXG4gICAgMTI6ICdObyBjaGlsZHJlbicsXG4gICAgMTM6ICdDb25uZWN0aW9uIGFib3J0ZWQnLFxuICAgIDE0OiAnQ29ubmVjdGlvbiByZWZ1c2VkJyxcbiAgICAxNTogJ0Nvbm5lY3Rpb24gcmVzZXQgYnkgcGVlcicsXG4gICAgMTY6ICdGaWxlIGxvY2tpbmcgZGVhZGxvY2sgZXJyb3InLFxuICAgIDE3OiAnRGVzdGluYXRpb24gYWRkcmVzcyByZXF1aXJlZCcsXG4gICAgMTg6ICdNYXRoIGFyZyBvdXQgb2YgZG9tYWluIG9mIGZ1bmMnLFxuICAgIDE5OiAnUXVvdGEgZXhjZWVkZWQnLFxuICAgIDIwOiAnRmlsZSBleGlzdHMnLFxuICAgIDIxOiAnQmFkIGFkZHJlc3MnLFxuICAgIDIyOiAnRmlsZSB0b28gbGFyZ2UnLFxuICAgIDIzOiAnSG9zdCBpcyB1bnJlYWNoYWJsZScsXG4gICAgMjQ6ICdJZGVudGlmaWVyIHJlbW92ZWQnLFxuICAgIDI1OiAnSWxsZWdhbCBieXRlIHNlcXVlbmNlJyxcbiAgICAyNjogJ0Nvbm5lY3Rpb24gYWxyZWFkeSBpbiBwcm9ncmVzcycsXG4gICAgMjc6ICdJbnRlcnJ1cHRlZCBzeXN0ZW0gY2FsbCcsXG4gICAgMjg6ICdJbnZhbGlkIGFyZ3VtZW50JyxcbiAgICAyOTogJ0kvTyBlcnJvcicsXG4gICAgMzA6ICdTb2NrZXQgaXMgYWxyZWFkeSBjb25uZWN0ZWQnLFxuICAgIDMxOiAnSXMgYSBkaXJlY3RvcnknLFxuICAgIDMyOiAnVG9vIG1hbnkgc3ltYm9saWMgbGlua3MnLFxuICAgIDMzOiAnVG9vIG1hbnkgb3BlbiBmaWxlcycsXG4gICAgMzQ6ICdUb28gbWFueSBsaW5rcycsXG4gICAgMzU6ICdNZXNzYWdlIHRvbyBsb25nJyxcbiAgICAzNjogJ011bHRpaG9wIGF0dGVtcHRlZCcsXG4gICAgMzc6ICdGaWxlIG9yIHBhdGggbmFtZSB0b28gbG9uZycsXG4gICAgMzg6ICdOZXR3b3JrIGludGVyZmFjZSBpcyBub3QgY29uZmlndXJlZCcsXG4gICAgMzk6ICdDb25uZWN0aW9uIHJlc2V0IGJ5IG5ldHdvcmsnLFxuICAgIDQwOiAnTmV0d29yayBpcyB1bnJlYWNoYWJsZScsXG4gICAgNDE6ICdUb28gbWFueSBvcGVuIGZpbGVzIGluIHN5c3RlbScsXG4gICAgNDI6ICdObyBidWZmZXIgc3BhY2UgYXZhaWxhYmxlJyxcbiAgICA0MzogJ05vIHN1Y2ggZGV2aWNlJyxcbiAgICA0NDogJ05vIHN1Y2ggZmlsZSBvciBkaXJlY3RvcnknLFxuICAgIDQ1OiAnRXhlYyBmb3JtYXQgZXJyb3InLFxuICAgIDQ2OiAnTm8gcmVjb3JkIGxvY2tzIGF2YWlsYWJsZScsXG4gICAgNDc6ICdUaGUgbGluayBoYXMgYmVlbiBzZXZlcmVkJyxcbiAgICA0ODogJ05vdCBlbm91Z2ggY29yZScsXG4gICAgNDk6ICdObyBtZXNzYWdlIG9mIGRlc2lyZWQgdHlwZScsXG4gICAgNTA6ICdQcm90b2NvbCBub3QgYXZhaWxhYmxlJyxcbiAgICA1MTogJ05vIHNwYWNlIGxlZnQgb24gZGV2aWNlJyxcbiAgICA1MjogJ0Z1bmN0aW9uIG5vdCBpbXBsZW1lbnRlZCcsXG4gICAgNTM6ICdTb2NrZXQgaXMgbm90IGNvbm5lY3RlZCcsXG4gICAgNTQ6ICdOb3QgYSBkaXJlY3RvcnknLFxuICAgIDU1OiAnRGlyZWN0b3J5IG5vdCBlbXB0eScsXG4gICAgNTY6ICdTdGF0ZSBub3QgcmVjb3ZlcmFibGUnLFxuICAgIDU3OiAnU29ja2V0IG9wZXJhdGlvbiBvbiBub24tc29ja2V0JyxcbiAgICA1OTogJ05vdCBhIHR5cGV3cml0ZXInLFxuICAgIDYwOiAnTm8gc3VjaCBkZXZpY2Ugb3IgYWRkcmVzcycsXG4gICAgNjE6ICdWYWx1ZSB0b28gbGFyZ2UgZm9yIGRlZmluZWQgZGF0YSB0eXBlJyxcbiAgICA2MjogJ1ByZXZpb3VzIG93bmVyIGRpZWQnLFxuICAgIDYzOiAnTm90IHN1cGVyLXVzZXInLFxuICAgIDY0OiAnQnJva2VuIHBpcGUnLFxuICAgIDY1OiAnUHJvdG9jb2wgZXJyb3InLFxuICAgIDY2OiAnVW5rbm93biBwcm90b2NvbCcsXG4gICAgNjc6ICdQcm90b2NvbCB3cm9uZyB0eXBlIGZvciBzb2NrZXQnLFxuICAgIDY4OiAnTWF0aCByZXN1bHQgbm90IHJlcHJlc2VudGFibGUnLFxuICAgIDY5OiAnUmVhZCBvbmx5IGZpbGUgc3lzdGVtJyxcbiAgICA3MDogJ0lsbGVnYWwgc2VlaycsXG4gICAgNzE6ICdObyBzdWNoIHByb2Nlc3MnLFxuICAgIDcyOiAnU3RhbGUgZmlsZSBoYW5kbGUnLFxuICAgIDczOiAnQ29ubmVjdGlvbiB0aW1lZCBvdXQnLFxuICAgIDc0OiAnVGV4dCBmaWxlIGJ1c3knLFxuICAgIDc1OiAnQ3Jvc3MtZGV2aWNlIGxpbmsnLFxuICAgIDEwMDogJ0RldmljZSBub3QgYSBzdHJlYW0nLFxuICAgIDEwMTogJ0JhZCBmb250IGZpbGUgZm10JyxcbiAgICAxMDI6ICdJbnZhbGlkIHNsb3QnLFxuICAgIDEwMzogJ0ludmFsaWQgcmVxdWVzdCBjb2RlJyxcbiAgICAxMDQ6ICdObyBhbm9kZScsXG4gICAgMTA1OiAnQmxvY2sgZGV2aWNlIHJlcXVpcmVkJyxcbiAgICAxMDY6ICdDaGFubmVsIG51bWJlciBvdXQgb2YgcmFuZ2UnLFxuICAgIDEwNzogJ0xldmVsIDMgaGFsdGVkJyxcbiAgICAxMDg6ICdMZXZlbCAzIHJlc2V0JyxcbiAgICAxMDk6ICdMaW5rIG51bWJlciBvdXQgb2YgcmFuZ2UnLFxuICAgIDExMDogJ1Byb3RvY29sIGRyaXZlciBub3QgYXR0YWNoZWQnLFxuICAgIDExMTogJ05vIENTSSBzdHJ1Y3R1cmUgYXZhaWxhYmxlJyxcbiAgICAxMTI6ICdMZXZlbCAyIGhhbHRlZCcsXG4gICAgMTEzOiAnSW52YWxpZCBleGNoYW5nZScsXG4gICAgMTE0OiAnSW52YWxpZCByZXF1ZXN0IGRlc2NyaXB0b3InLFxuICAgIDExNTogJ0V4Y2hhbmdlIGZ1bGwnLFxuICAgIDExNjogJ05vIGRhdGEgKGZvciBubyBkZWxheSBpbyknLFxuICAgIDExNzogJ1RpbWVyIGV4cGlyZWQnLFxuICAgIDExODogJ091dCBvZiBzdHJlYW1zIHJlc291cmNlcycsXG4gICAgMTE5OiAnTWFjaGluZSBpcyBub3Qgb24gdGhlIG5ldHdvcmsnLFxuICAgIDEyMDogJ1BhY2thZ2Ugbm90IGluc3RhbGxlZCcsXG4gICAgMTIxOiAnVGhlIG9iamVjdCBpcyByZW1vdGUnLFxuICAgIDEyMjogJ0FkdmVydGlzZSBlcnJvcicsXG4gICAgMTIzOiAnU3Jtb3VudCBlcnJvcicsXG4gICAgMTI0OiAnQ29tbXVuaWNhdGlvbiBlcnJvciBvbiBzZW5kJyxcbiAgICAxMjU6ICdDcm9zcyBtb3VudCBwb2ludCAobm90IHJlYWxseSBlcnJvciknLFxuICAgIDEyNjogJ0dpdmVuIGxvZy4gbmFtZSBub3QgdW5pcXVlJyxcbiAgICAxMjc6ICdmLmQuIGludmFsaWQgZm9yIHRoaXMgb3BlcmF0aW9uJyxcbiAgICAxMjg6ICdSZW1vdGUgYWRkcmVzcyBjaGFuZ2VkJyxcbiAgICAxMjk6ICdDYW4gICBhY2Nlc3MgYSBuZWVkZWQgc2hhcmVkIGxpYicsXG4gICAgMTMwOiAnQWNjZXNzaW5nIGEgY29ycnVwdGVkIHNoYXJlZCBsaWInLFxuICAgIDEzMTogJy5saWIgc2VjdGlvbiBpbiBhLm91dCBjb3JydXB0ZWQnLFxuICAgIDEzMjogJ0F0dGVtcHRpbmcgdG8gbGluayBpbiB0b28gbWFueSBsaWJzJyxcbiAgICAxMzM6ICdBdHRlbXB0aW5nIHRvIGV4ZWMgYSBzaGFyZWQgbGlicmFyeScsXG4gICAgMTM1OiAnU3RyZWFtcyBwaXBlIGVycm9yJyxcbiAgICAxMzY6ICdUb28gbWFueSB1c2VycycsXG4gICAgMTM3OiAnU29ja2V0IHR5cGUgbm90IHN1cHBvcnRlZCcsXG4gICAgMTM4OiAnTm90IHN1cHBvcnRlZCcsXG4gICAgMTM5OiAnUHJvdG9jb2wgZmFtaWx5IG5vdCBzdXBwb3J0ZWQnLFxuICAgIDE0MDogXCJDYW4ndCBzZW5kIGFmdGVyIHNvY2tldCBzaHV0ZG93blwiLFxuICAgIDE0MTogJ1RvbyBtYW55IHJlZmVyZW5jZXMnLFxuICAgIDE0MjogJ0hvc3QgaXMgZG93bicsXG4gICAgMTQ4OiAnTm8gbWVkaXVtIChpbiB0YXBlIGRyaXZlKScsXG4gICAgMTU2OiAnTGV2ZWwgMiBub3Qgc3luY2hyb25pemVkJ1xuICB9XG5cbiAgdmFyIEVSUk5PX0NPREVTID0ge31cbiAgdmFyIEZTID0ge1xuICAgIHJvb3Q6IG51bGwsXG4gICAgbW91bnRzOiBbXSxcbiAgICBkZXZpY2VzOiB7fSxcbiAgICBzdHJlYW1zOiBbXSxcbiAgICBuZXh0SW5vZGU6IDEsXG4gICAgbmFtZVRhYmxlOiBudWxsLFxuICAgIGN1cnJlbnRQYXRoOiAnLycsXG4gICAgaW5pdGlhbGl6ZWQ6IGZhbHNlLFxuICAgIGlnbm9yZVBlcm1pc3Npb25zOiB0cnVlLFxuICAgIEVycm5vRXJyb3I6IG51bGwsXG4gICAgZ2VuZXJpY0Vycm9yczoge30sXG4gICAgZmlsZXN5c3RlbXM6IG51bGwsXG4gICAgc3luY0ZTUmVxdWVzdHM6IDAsXG4gICAgbG9va3VwUGF0aDogKHBhdGgsIG9wdHMgPSB7fSkgPT4ge1xuICAgICAgcGF0aCA9IFBBVEhfRlMucmVzb2x2ZShGUy5jd2QoKSwgcGF0aClcblxuICAgICAgaWYgKCFwYXRoKSByZXR1cm4geyBwYXRoOiAnJywgbm9kZTogbnVsbCB9XG5cbiAgICAgIHZhciBkZWZhdWx0cyA9IHtcbiAgICAgICAgZm9sbG93X21vdW50OiB0cnVlLFxuICAgICAgICByZWN1cnNlX2NvdW50OiAwXG4gICAgICB9XG4gICAgICBvcHRzID0gT2JqZWN0LmFzc2lnbihkZWZhdWx0cywgb3B0cylcblxuICAgICAgaWYgKG9wdHMucmVjdXJzZV9jb3VudCA+IDgpIHtcbiAgICAgICAgLy8gbWF4IHJlY3Vyc2l2ZSBsb29rdXAgb2YgOFxuICAgICAgICB0aHJvdyBuZXcgRlMuRXJybm9FcnJvcigzMilcbiAgICAgIH1cblxuICAgICAgLy8gc3BsaXQgdGhlIHBhdGhcbiAgICAgIHZhciBwYXJ0cyA9IFBBVEgubm9ybWFsaXplQXJyYXkoXG4gICAgICAgIHBhdGguc3BsaXQoJy8nKS5maWx0ZXIoKHApID0+ICEhcCksXG4gICAgICAgIGZhbHNlXG4gICAgICApXG5cbiAgICAgIC8vIHN0YXJ0IGF0IHRoZSByb290XG4gICAgICB2YXIgY3VycmVudCA9IEZTLnJvb3RcbiAgICAgIHZhciBjdXJyZW50X3BhdGggPSAnLydcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgaXNsYXN0ID0gaSA9PT0gcGFydHMubGVuZ3RoIC0gMVxuICAgICAgICBpZiAoaXNsYXN0ICYmIG9wdHMucGFyZW50KSB7XG4gICAgICAgICAgLy8gc3RvcCByZXNvbHZpbmdcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG5cbiAgICAgICAgY3VycmVudCA9IEZTLmxvb2t1cE5vZGUoY3VycmVudCwgcGFydHNbaV0pXG4gICAgICAgIGN1cnJlbnRfcGF0aCA9IFBBVEguam9pbjIoY3VycmVudF9wYXRoLCBwYXJ0c1tpXSlcblxuICAgICAgICAvLyBqdW1wIHRvIHRoZSBtb3VudCdzIHJvb3Qgbm9kZSBpZiB0aGlzIGlzIGEgbW91bnRwb2ludFxuICAgICAgICBpZiAoRlMuaXNNb3VudHBvaW50KGN1cnJlbnQpKSB7XG4gICAgICAgICAgaWYgKCFpc2xhc3QgfHwgKGlzbGFzdCAmJiBvcHRzLmZvbGxvd19tb3VudCkpIHtcbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm1vdW50ZWQucm9vdFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGJ5IGRlZmF1bHQsIGxvb2t1cFBhdGggd2lsbCBub3QgZm9sbG93IGEgc3ltbGluayBpZiBpdCBpcyB0aGUgZmluYWwgcGF0aCBjb21wb25lbnQuXG4gICAgICAgIC8vIHNldHRpbmcgb3B0cy5mb2xsb3cgPSB0cnVlIHdpbGwgb3ZlcnJpZGUgdGhpcyBiZWhhdmlvci5cbiAgICAgICAgaWYgKCFpc2xhc3QgfHwgb3B0cy5mb2xsb3cpIHtcbiAgICAgICAgICB2YXIgY291bnQgPSAwXG4gICAgICAgICAgd2hpbGUgKEZTLmlzTGluayhjdXJyZW50Lm1vZGUpKSB7XG4gICAgICAgICAgICB2YXIgbGluayA9IEZTLnJlYWRsaW5rKGN1cnJlbnRfcGF0aClcbiAgICAgICAgICAgIGN1cnJlbnRfcGF0aCA9IFBBVEhfRlMucmVzb2x2ZShQQVRILmRpcm5hbWUoY3VycmVudF9wYXRoKSwgbGluaylcblxuICAgICAgICAgICAgdmFyIGxvb2t1cCA9IEZTLmxvb2t1cFBhdGgoY3VycmVudF9wYXRoLCB7XG4gICAgICAgICAgICAgIHJlY3Vyc2VfY291bnQ6IG9wdHMucmVjdXJzZV9jb3VudCArIDFcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBjdXJyZW50ID0gbG9va3VwLm5vZGVcblxuICAgICAgICAgICAgaWYgKGNvdW50KysgPiA0MCkge1xuICAgICAgICAgICAgICAvLyBsaW1pdCBtYXggY29uc2VjdXRpdmUgc3ltbGlua3MgdG8gNDAgKFNZTUxPT1BfTUFYKS5cbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEZTLkVycm5vRXJyb3IoMzIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7IHBhdGg6IGN1cnJlbnRfcGF0aCwgbm9kZTogY3VycmVudCB9XG4gICAgfSxcbiAgICBnZXRQYXRoOiAobm9kZSkgPT4ge1xuICAgICAgdmFyIHBhdGhcbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIGlmIChGUy5pc1Jvb3Qobm9kZSkpIHtcbiAgICAgICAgICB2YXIgbW91bnQgPSBub2RlLm1vdW50Lm1vdW50cG9pbnRcbiAgICAgICAgICBpZiAoIXBhdGgpIHJldHVybiBtb3VudFxuICAgICAgICAgIHJldHVybiBtb3VudFttb3VudC5sZW5ndGggLSAxXSAhPT0gJy8nXG4gICAgICAgICAgICA/IG1vdW50ICsgJy8nICsgcGF0aFxuICAgICAgICAgICAgOiBtb3VudCArIHBhdGhcbiAgICAgICAgfVxuICAgICAgICBwYXRoID0gcGF0aCA/IG5vZGUubmFtZSArICcvJyArIHBhdGggOiBub2RlLm5hbWVcbiAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50XG4gICAgICB9XG4gICAgfSxcbiAgICBoYXNoTmFtZTogKHBhcmVudGlkLCBuYW1lKSA9PiB7XG4gICAgICB2YXIgaGFzaCA9IDBcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuYW1lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGhhc2ggPSAoKGhhc2ggPDwgNSkgLSBoYXNoICsgbmFtZS5jaGFyQ29kZUF0KGkpKSB8IDBcbiAgICAgIH1cbiAgICAgIHJldHVybiAoKHBhcmVudGlkICsgaGFzaCkgPj4+IDApICUgRlMubmFtZVRhYmxlLmxlbmd0aFxuICAgIH0sXG4gICAgaGFzaEFkZE5vZGU6IChub2RlKSA9PiB7XG4gICAgICB2YXIgaGFzaCA9IEZTLmhhc2hOYW1lKG5vZGUucGFyZW50LmlkLCBub2RlLm5hbWUpXG4gICAgICBub2RlLm5hbWVfbmV4dCA9IEZTLm5hbWVUYWJsZVtoYXNoXVxuICAgICAgRlMubmFtZVRhYmxlW2hhc2hdID0gbm9kZVxuICAgIH0sXG4gICAgaGFzaFJlbW92ZU5vZGU6IChub2RlKSA9PiB7XG4gICAgICB2YXIgaGFzaCA9IEZTLmhhc2hOYW1lKG5vZGUucGFyZW50LmlkLCBub2RlLm5hbWUpXG4gICAgICBpZiAoRlMubmFtZVRhYmxlW2hhc2hdID09PSBub2RlKSB7XG4gICAgICAgIEZTLm5hbWVUYWJsZVtoYXNoXSA9IG5vZGUubmFtZV9uZXh0XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgY3VycmVudCA9IEZTLm5hbWVUYWJsZVtoYXNoXVxuICAgICAgICB3aGlsZSAoY3VycmVudCkge1xuICAgICAgICAgIGlmIChjdXJyZW50Lm5hbWVfbmV4dCA9PT0gbm9kZSkge1xuICAgICAgICAgICAgY3VycmVudC5uYW1lX25leHQgPSBub2RlLm5hbWVfbmV4dFxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQubmFtZV9uZXh0XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGxvb2t1cE5vZGU6IChwYXJlbnQsIG5hbWUpID0+IHtcbiAgICAgIHZhciBlcnJDb2RlID0gRlMubWF5TG9va3VwKHBhcmVudClcbiAgICAgIGlmIChlcnJDb2RlKSB7XG4gICAgICAgIHRocm93IG5ldyBGUy5FcnJub0Vycm9yKGVyckNvZGUsIHBhcmVudClcbiAgICAgIH1cbiAgICAgIHZhciBoYXNoID0gRlMuaGFzaE5hbWUocGFyZW50LmlkLCBuYW1lKVxuICAgICAgZm9yICh2YXIgbm9kZSA9IEZTLm5hbWVUYWJsZVtoYXNoXTsgbm9kZTsgbm9kZSA9IG5vZGUubmFtZV9uZXh0KSB7XG4gICAgICAgIHZhciBub2RlTmFtZSA9IG5vZGUubmFtZVxuICAgICAgICBpZiAobm9kZS5wYXJlbnQuaWQgPT09IHBhcmVudC5pZCAmJiBub2RlTmFtZSA9PT0gbmFtZSkge1xuICAgICAgICAgIHJldHVybiBub2RlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIGlmIHdlIGZhaWxlZCB0byBmaW5kIGl0IGluIHRoZSBjYWNoZSwgY2FsbCBpbnRvIHRoZSBWRlNcbiAgICAgIHJldHVybiBGUy5sb29rdXAocGFyZW50LCBuYW1lKVxuICAgIH0sXG4gICAgY3JlYXRlTm9kZTogKHBhcmVudCwgbmFtZSwgbW9kZSwgcmRldikgPT4ge1xuICAgICAgYXNzZXJ0KHR5cGVvZiBwYXJlbnQgPT0gJ29iamVjdCcpXG4gICAgICB2YXIgbm9kZSA9IG5ldyBGUy5GU05vZGUocGFyZW50LCBuYW1lLCBtb2RlLCByZGV2KVxuXG4gICAgICBGUy5oYXNoQWRkTm9kZShub2RlKVxuXG4gICAgICByZXR1cm4gbm9kZVxuICAgIH0sXG4gICAgZGVzdHJveU5vZGU6IChub2RlKSA9PiB7XG4gICAgICBGUy5oYXNoUmVtb3ZlTm9kZShub2RlKVxuICAgIH0sXG4gICAgaXNSb290OiAobm9kZSkgPT4ge1xuICAgICAgcmV0dXJuIG5vZGUgPT09IG5vZGUucGFyZW50XG4gICAgfSxcbiAgICBpc01vdW50cG9pbnQ6IChub2RlKSA9PiB7XG4gICAgICByZXR1cm4gISFub2RlLm1vdW50ZWRcbiAgICB9LFxuICAgIGlzRmlsZTogKG1vZGUpID0+IHtcbiAgICAgIHJldHVybiAobW9kZSAmIDYxNDQwKSA9PT0gMzI3NjhcbiAgICB9LFxuICAgIGlzRGlyOiAobW9kZSkgPT4ge1xuICAgICAgcmV0dXJuIChtb2RlICYgNjE0NDApID09PSAxNjM4NFxuICAgIH0sXG4gICAgaXNMaW5rOiAobW9kZSkgPT4ge1xuICAgICAgcmV0dXJuIChtb2RlICYgNjE0NDApID09PSA0MDk2MFxuICAgIH0sXG4gICAgaXNDaHJkZXY6IChtb2RlKSA9PiB7XG4gICAgICByZXR1cm4gKG1vZGUgJiA2MTQ0MCkgPT09IDgxOTJcbiAgICB9LFxuICAgIGlzQmxrZGV2OiAobW9kZSkgPT4ge1xuICAgICAgcmV0dXJuIChtb2RlICYgNjE0NDApID09PSAyNDU3NlxuICAgIH0sXG4gICAgaXNGSUZPOiAobW9kZSkgPT4ge1xuICAgICAgcmV0dXJuIChtb2RlICYgNjE0NDApID09PSA0MDk2XG4gICAgfSxcbiAgICBpc1NvY2tldDogKG1vZGUpID0+IHtcbiAgICAgIHJldHVybiAobW9kZSAmIDQ5MTUyKSA9PT0gNDkxNTJcbiAgICB9LFxuICAgIGZsYWdNb2RlczogeyByOiAwLCAncisnOiAyLCB3OiA1NzcsICd3Kyc6IDU3OCwgYTogMTA4OSwgJ2ErJzogMTA5MCB9LFxuICAgIG1vZGVTdHJpbmdUb0ZsYWdzOiAoc3RyKSA9PiB7XG4gICAgICB2YXIgZmxhZ3MgPSBGUy5mbGFnTW9kZXNbc3RyXVxuICAgICAgaWYgKHR5cGVvZiBmbGFncyA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZmlsZSBvcGVuIG1vZGU6ICcgKyBzdHIpXG4gICAgICB9XG4gICAgICByZXR1cm4gZmxhZ3NcbiAgICB9LFxuICAgIGZsYWdzVG9QZXJtaXNzaW9uU3RyaW5nOiAoZmxhZykgPT4ge1xuICAgICAgdmFyIHBlcm1zID0gWydyJywgJ3cnLCAncncnXVtmbGFnICYgM11cbiAgICAgIGlmIChmbGFnICYgNTEyKSB7XG4gICAgICAgIHBlcm1zICs9ICd3J1xuICAgICAgfVxuICAgICAgcmV0dXJuIHBlcm1zXG4gICAgfSxcbiAgICBub2RlUGVybWlzc2lvbnM6IChub2RlLCBwZXJtcykgPT4ge1xuICAgICAgaWYgKEZTLmlnbm9yZVBlcm1pc3Npb25zKSB7XG4gICAgICAgIHJldHVybiAwXG4gICAgICB9XG4gICAgICAvLyByZXR1cm4gMCBpZiBhbnkgdXNlciwgZ3JvdXAgb3Igb3duZXIgYml0cyBhcmUgc2V0LlxuICAgICAgaWYgKHBlcm1zLmluY2x1ZGVzKCdyJykgJiYgIShub2RlLm1vZGUgJiAyOTIpKSB7XG4gICAgICAgIHJldHVybiAyXG4gICAgICB9IGVsc2UgaWYgKHBlcm1zLmluY2x1ZGVzKCd3JykgJiYgIShub2RlLm1vZGUgJiAxNDYpKSB7XG4gICAgICAgIHJldHVybiAyXG4gICAgICB9IGVsc2UgaWYgKHBlcm1zLmluY2x1ZGVzKCd4JykgJiYgIShub2RlLm1vZGUgJiA3MykpIHtcbiAgICAgICAgcmV0dXJuIDJcbiAgICAgIH1cbiAgICAgIHJldHVybiAwXG4gICAgfSxcbiAgICBtYXlMb29rdXA6IChkaXIpID0+IHtcbiAgICAgIHZhciBlcnJDb2RlID0gRlMubm9kZVBlcm1pc3Npb25zKGRpciwgJ3gnKVxuICAgICAgaWYgKGVyckNvZGUpIHJldHVybiBlcnJDb2RlXG4gICAgICBpZiAoIWRpci5ub2RlX29wcy5sb29rdXApIHJldHVybiAyXG4gICAgICByZXR1cm4gMFxuICAgIH0sXG4gICAgbWF5Q3JlYXRlOiAoZGlyLCBuYW1lKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICB2YXIgbm9kZSA9IEZTLmxvb2t1cE5vZGUoZGlyLCBuYW1lKVxuICAgICAgICByZXR1cm4gMjBcbiAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICByZXR1cm4gRlMubm9kZVBlcm1pc3Npb25zKGRpciwgJ3d4JylcbiAgICB9LFxuICAgIG1heURlbGV0ZTogKGRpciwgbmFtZSwgaXNkaXIpID0+IHtcbiAgICAgIHZhciBub2RlXG4gICAgICB0cnkge1xuICAgICAgICBub2RlID0gRlMubG9va3VwTm9kZShkaXIsIG5hbWUpXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBlLmVycm5vXG4gICAgICB9XG4gICAgICB2YXIgZXJyQ29kZSA9IEZTLm5vZGVQZXJtaXNzaW9ucyhkaXIsICd3eCcpXG4gICAgICBpZiAoZXJyQ29kZSkge1xuICAgICAgICByZXR1cm4gZXJyQ29kZVxuICAgICAgfVxuICAgICAgaWYgKGlzZGlyKSB7XG4gICAgICAgIGlmICghRlMuaXNEaXIobm9kZS5tb2RlKSkge1xuICAgICAgICAgIHJldHVybiA1NFxuICAgICAgICB9XG4gICAgICAgIGlmIChGUy5pc1Jvb3Qobm9kZSkgfHwgRlMuZ2V0UGF0aChub2RlKSA9PT0gRlMuY3dkKCkpIHtcbiAgICAgICAgICByZXR1cm4gMTBcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKEZTLmlzRGlyKG5vZGUubW9kZSkpIHtcbiAgICAgICAgICByZXR1cm4gMzFcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIDBcbiAgICB9LFxuICAgIG1heU9wZW46IChub2RlLCBmbGFncykgPT4ge1xuICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgIHJldHVybiA0NFxuICAgICAgfVxuICAgICAgaWYgKEZTLmlzTGluayhub2RlLm1vZGUpKSB7XG4gICAgICAgIHJldHVybiAzMlxuICAgICAgfSBlbHNlIGlmIChGUy5pc0Rpcihub2RlLm1vZGUpKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBGUy5mbGFnc1RvUGVybWlzc2lvblN0cmluZyhmbGFncykgIT09ICdyJyB8fCAvLyBvcGVuaW5nIGZvciB3cml0ZVxuICAgICAgICAgIGZsYWdzICYgNTEyXG4gICAgICAgICkge1xuICAgICAgICAgIC8vIFRPRE86IGNoZWNrIGZvciBPX1NFQVJDSD8gKD09IHNlYXJjaCBmb3IgZGlyIG9ubHkpXG4gICAgICAgICAgcmV0dXJuIDMxXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBGUy5ub2RlUGVybWlzc2lvbnMobm9kZSwgRlMuZmxhZ3NUb1Blcm1pc3Npb25TdHJpbmcoZmxhZ3MpKVxuICAgIH0sXG4gICAgTUFYX09QRU5fRkRTOiA0MDk2LFxuICAgIG5leHRmZDogKGZkX3N0YXJ0ID0gMCwgZmRfZW5kID0gRlMuTUFYX09QRU5fRkRTKSA9PiB7XG4gICAgICBmb3IgKHZhciBmZCA9IGZkX3N0YXJ0OyBmZCA8PSBmZF9lbmQ7IGZkKyspIHtcbiAgICAgICAgaWYgKCFGUy5zdHJlYW1zW2ZkXSkge1xuICAgICAgICAgIHJldHVybiBmZFxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aHJvdyBuZXcgRlMuRXJybm9FcnJvcigzMylcbiAgICB9LFxuICAgIGdldFN0cmVhbTogKGZkKSA9PiBGUy5zdHJlYW1zW2ZkXSxcbiAgICBjcmVhdGVTdHJlYW06IChzdHJlYW0sIGZkX3N0YXJ0LCBmZF9lbmQpID0+IHtcbiAgICAgIGlmICghRlMuRlNTdHJlYW0pIHtcbiAgICAgICAgRlMuRlNTdHJlYW0gPSAvKiogQGNvbnN0cnVjdG9yICovIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGlzLnNoYXJlZCA9IHt9XG4gICAgICAgIH1cbiAgICAgICAgRlMuRlNTdHJlYW0ucHJvdG90eXBlID0ge31cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoRlMuRlNTdHJlYW0ucHJvdG90eXBlLCB7XG4gICAgICAgICAgb2JqZWN0OiB7XG4gICAgICAgICAgICAvKiogQHRoaXMge0ZTLkZTU3RyZWFtfSAqL1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLm5vZGVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvKiogQHRoaXMge0ZTLkZTU3RyZWFtfSAqL1xuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICAgIHRoaXMubm9kZSA9IHZhbFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgaXNSZWFkOiB7XG4gICAgICAgICAgICAvKiogQHRoaXMge0ZTLkZTU3RyZWFtfSAqL1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHJldHVybiAodGhpcy5mbGFncyAmIDIwOTcxNTUpICE9PSAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBpc1dyaXRlOiB7XG4gICAgICAgICAgICAvKiogQHRoaXMge0ZTLkZTU3RyZWFtfSAqL1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHJldHVybiAodGhpcy5mbGFncyAmIDIwOTcxNTUpICE9PSAwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBpc0FwcGVuZDoge1xuICAgICAgICAgICAgLyoqIEB0aGlzIHtGUy5GU1N0cmVhbX0gKi9cbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mbGFncyAmIDEwMjRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGZsYWdzOiB7XG4gICAgICAgICAgICAvKiogQHRoaXMge0ZTLkZTU3RyZWFtfSAqL1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLnNoYXJlZC5mbGFnc1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8qKiBAdGhpcyB7RlMuRlNTdHJlYW19ICovXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgICAgdGhpcy5zaGFyZWQuZmxhZ3MgPSB2YWxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHBvc2l0aW9uOiB7XG4gICAgICAgICAgICAvKiogQHRoaXMge0ZTLkZTU3RyZWFtfSAqL1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLnNoYXJlZC5wb3NpdGlvblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8qKiBAdGhpcyB7RlMuRlNTdHJlYW19ICovXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgICAgdGhpcy5zaGFyZWQucG9zaXRpb24gPSB2YWxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICAvLyBjbG9uZSBpdCwgc28gd2UgY2FuIHJldHVybiBhbiBpbnN0YW5jZSBvZiBGU1N0cmVhbVxuICAgICAgc3RyZWFtID0gT2JqZWN0LmFzc2lnbihuZXcgRlMuRlNTdHJlYW0oKSwgc3RyZWFtKVxuICAgICAgdmFyIGZkID0gRlMubmV4dGZkKGZkX3N0YXJ0LCBmZF9lbmQpXG4gICAgICBzdHJlYW0uZmQgPSBmZFxuICAgICAgRlMuc3RyZWFtc1tmZF0gPSBzdHJlYW1cbiAgICAgIHJldHVybiBzdHJlYW1cbiAgICB9LFxuICAgIGNsb3NlU3RyZWFtOiAoZmQpID0+IHtcbiAgICAgIEZTLnN0cmVhbXNbZmRdID0gbnVsbFxuICAgIH0sXG4gICAgY2hyZGV2X3N0cmVhbV9vcHM6IHtcbiAgICAgIG9wZW46IChzdHJlYW0pID0+IHtcbiAgICAgICAgdmFyIGRldmljZSA9IEZTLmdldERldmljZShzdHJlYW0ubm9kZS5yZGV2KVxuICAgICAgICAvLyBvdmVycmlkZSBub2RlJ3Mgc3RyZWFtIG9wcyB3aXRoIHRoZSBkZXZpY2Unc1xuICAgICAgICBzdHJlYW0uc3RyZWFtX29wcyA9IGRldmljZS5zdHJlYW1fb3BzXG4gICAgICAgIC8vIGZvcndhcmQgdGhlIG9wZW4gY2FsbFxuICAgICAgICBpZiAoc3RyZWFtLnN0cmVhbV9vcHMub3Blbikge1xuICAgICAgICAgIHN0cmVhbS5zdHJlYW1fb3BzLm9wZW4oc3RyZWFtKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbGxzZWVrOiAoKSA9PiB7XG4gICAgICAgIHRocm93IG5ldyBGUy5FcnJub0Vycm9yKDcwKVxuICAgICAgfVxuICAgIH0sXG4gICAgbWFqb3I6IChkZXYpID0+IGRldiA+PiA4LFxuICAgIG1pbm9yOiAoZGV2KSA9PiBkZXYgJiAweGZmLFxuICAgIG1ha2VkZXY6IChtYSwgbWkpID0+IChtYSA8PCA4KSB8IG1pLFxuICAgIHJlZ2lzdGVyRGV2aWNlOiAoZGV2LCBvcHMpID0+IHtcbiAgICAgIEZTLmRldmljZXNbZGV2XSA9IHsgc3RyZWFtX29wczogb3BzIH1cbiAgICB9LFxuICAgIGdldERldmljZTogKGRldikgPT4gRlMuZGV2aWNlc1tkZXZdLFxuICAgIGdldE1vdW50czogKG1vdW50KSA9PiB7XG4gICAgICB2YXIgbW91bnRzID0gW11cbiAgICAgIHZhciBjaGVjayA9IFttb3VudF1cblxuICAgICAgd2hpbGUgKGNoZWNrLmxlbmd0aCkge1xuICAgICAgICB2YXIgbSA9IGNoZWNrLnBvcCgpXG5cbiAgICAgICAgbW91bnRzLnB1c2gobSlcblxuICAgICAgICBjaGVjay5wdXNoLmFwcGx5KGNoZWNrLCBtLm1vdW50cylcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG1vdW50c1xuICAgIH0sXG4gICAgc3luY2ZzOiAocG9wdWxhdGUsIGNhbGxiYWNrKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIHBvcHVsYXRlID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY2FsbGJhY2sgPSBwb3B1bGF0ZVxuICAgICAgICBwb3B1bGF0ZSA9IGZhbHNlXG4gICAgICB9XG5cbiAgICAgIEZTLnN5bmNGU1JlcXVlc3RzKytcblxuICAgICAgaWYgKEZTLnN5bmNGU1JlcXVlc3RzID4gMSkge1xuICAgICAgICBlcnIoXG4gICAgICAgICAgJ3dhcm5pbmc6ICcgK1xuICAgICAgICAgICAgRlMuc3luY0ZTUmVxdWVzdHMgK1xuICAgICAgICAgICAgJyBGUy5zeW5jZnMgb3BlcmF0aW9ucyBpbiBmbGlnaHQgYXQgb25jZSwgcHJvYmFibHkganVzdCBkb2luZyBleHRyYSB3b3JrJ1xuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIHZhciBtb3VudHMgPSBGUy5nZXRNb3VudHMoRlMucm9vdC5tb3VudClcbiAgICAgIHZhciBjb21wbGV0ZWQgPSAwXG5cbiAgICAgIGZ1bmN0aW9uIGRvQ2FsbGJhY2soZXJyQ29kZSkge1xuICAgICAgICBhc3NlcnQoRlMuc3luY0ZTUmVxdWVzdHMgPiAwKVxuICAgICAgICBGUy5zeW5jRlNSZXF1ZXN0cy0tXG4gICAgICAgIHJldHVybiBjYWxsYmFjayhlcnJDb2RlKVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBkb25lKGVyckNvZGUpIHtcbiAgICAgICAgaWYgKGVyckNvZGUpIHtcbiAgICAgICAgICBpZiAoIWRvbmUuZXJyb3JlZCkge1xuICAgICAgICAgICAgZG9uZS5lcnJvcmVkID0gdHJ1ZVxuICAgICAgICAgICAgcmV0dXJuIGRvQ2FsbGJhY2soZXJyQ29kZSlcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgaWYgKCsrY29tcGxldGVkID49IG1vdW50cy5sZW5ndGgpIHtcbiAgICAgICAgICBkb0NhbGxiYWNrKG51bGwpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gc3luYyBhbGwgbW91bnRzXG4gICAgICBtb3VudHMuZm9yRWFjaCgobW91bnQpID0+IHtcbiAgICAgICAgaWYgKCFtb3VudC50eXBlLnN5bmNmcykge1xuICAgICAgICAgIHJldHVybiBkb25lKG51bGwpXG4gICAgICAgIH1cbiAgICAgICAgbW91bnQudHlwZS5zeW5jZnMobW91bnQsIHBvcHVsYXRlLCBkb25lKVxuICAgICAgfSlcbiAgICB9LFxuICAgIG1vdW50OiAodHlwZSwgb3B0cywgbW91bnRwb2ludCkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiB0eXBlID09ICdzdHJpbmcnKSB7XG4gICAgICAgIC8vIFRoZSBmaWxlc3lzdGVtIHdhcyBub3QgaW5jbHVkZWQsIGFuZCBpbnN0ZWFkIHdlIGhhdmUgYW4gZXJyb3JcbiAgICAgICAgLy8gbWVzc2FnZSBzdG9yZWQgaW4gdGhlIHZhcmlhYmxlLlxuICAgICAgICB0aHJvdyB0eXBlXG4gICAgICB9XG4gICAgICB2YXIgcm9vdCA9IG1vdW50cG9pbnQgPT09ICcvJ1xuICAgICAgdmFyIHBzZXVkbyA9ICFtb3VudHBvaW50XG4gICAgICB2YXIgbm9kZVxuXG4gICAgICBpZiAocm9vdCAmJiBGUy5yb290KSB7XG4gICAgICAgIHRocm93IG5ldyBGUy5FcnJub0Vycm9yKDEwKVxuICAgICAgfSBlbHNlIGlmICghcm9vdCAmJiAhcHNldWRvKSB7XG4gICAgICAgIHZhciBsb29rdXAgPSBGUy5sb29rdXBQYXRoKG1vdW50cG9pbnQsIHsgZm9sbG93X21vdW50OiBmYWxzZSB9KVxuXG4gICAgICAgIG1vdW50cG9pbnQgPSBsb29rdXAucGF0aCAvLyB1c2UgdGhlIGFic29sdXRlIHBhdGhcbiAgICAgICAgbm9kZSA9IGxvb2t1cC5ub2RlXG5cbiAgICAgICAgaWYgKEZTLmlzTW91bnRwb2ludChub2RlKSkge1xuICAgICAgICAgIHRocm93IG5ldyBGUy5FcnJub0Vycm9yKDEwKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFGUy5pc0Rpcihub2RlLm1vZGUpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEZTLkVycm5vRXJyb3IoNTQpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIG1vdW50ID0ge1xuICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICBvcHRzOiBvcHRzLFxuICAgICAgICBtb3VudHBvaW50OiBtb3VudHBvaW50LFxuICAgICAgICBtb3VudHM6IFtdXG4gICAgICB9XG5cbiAgICAgIC8vIGNyZWF0ZSBhIHJvb3Qgbm9kZSBmb3IgdGhlIGZzXG4gICAgICB2YXIgbW91bnRSb290ID0gdHlwZS5tb3VudChtb3VudClcbiAgICAgIG1vdW50Um9vdC5tb3VudCA9IG1vdW50XG4gICAgICBtb3VudC5yb290ID0gbW91bnRSb290XG5cbiAgICAgIGlmIChyb290KSB7XG4gICAgICAgIEZTLnJvb3QgPSBtb3VudFJvb3RcbiAgICAgIH0gZWxzZSBpZiAobm9kZSkge1xuICAgICAgICAvLyBzZXQgYXMgYSBtb3VudHBvaW50XG4gICAgICAgIG5vZGUubW91bnRlZCA9IG1vdW50XG5cbiAgICAgICAgLy8gYWRkIHRoZSBuZXcgbW91bnQgdG8gdGhlIGN1cnJlbnQgbW91bnQncyBjaGlsZHJlblxuICAgICAgICBpZiAobm9kZS5tb3VudCkge1xuICAgICAgICAgIG5vZGUubW91bnQubW91bnRzLnB1c2gobW91bnQpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG1vdW50Um9vdFxuICAgIH0sXG4gICAgdW5tb3VudDogKG1vdW50cG9pbnQpID0+IHtcbiAgICAgIHZhciBsb29rdXAgPSBGUy5sb29rdXBQYXRoKG1vdW50cG9pbnQsIHsgZm9sbG93X21vdW50OiBmYWxzZSB9KVxuXG4gICAgICBpZiAoIUZTLmlzTW91bnRwb2ludChsb29rdXAubm9kZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEZTLkVycm5vRXJyb3IoMjgpXG4gICAgICB9XG5cbiAgICAgIC8vIGRlc3Ryb3kgdGhlIG5vZGVzIGZvciB0aGlzIG1vdW50LCBhbmQgYWxsIGl0cyBjaGlsZCBtb3VudHNcbiAgICAgIHZhciBub2RlID0gbG9va3VwLm5vZGVcbiAgICAgIHZhciBtb3VudCA9IG5vZGUubW91bnRlZFxuICAgICAgdmFyIG1vdW50cyA9IEZTLmdldE1vdW50cyhtb3VudClcblxuICAgICAgT2JqZWN0LmtleXMoRlMubmFtZVRhYmxlKS5mb3JFYWNoKChoYXNoKSA9PiB7XG4gICAgICAgIHZhciBjdXJyZW50ID0gRlMubmFtZVRhYmxlW2hhc2hdXG5cbiAgICAgICAgd2hpbGUgKGN1cnJlbnQpIHtcbiAgICAgICAgICB2YXIgbmV4dCA9IGN1cnJlbnQubmFtZV9uZXh0XG5cbiAgICAgICAgICBpZiAobW91bnRzLmluY2x1ZGVzKGN1cnJlbnQubW91bnQpKSB7XG4gICAgICAgICAgICBGUy5kZXN0cm95Tm9kZShjdXJyZW50KVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGN1cnJlbnQgPSBuZXh0XG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIC8vIG5vIGxvbmdlciBhIG1vdW50cG9pbnRcbiAgICAgIG5vZGUubW91bnRlZCA9IG51bGxcblxuICAgICAgLy8gcmVtb3ZlIHRoaXMgbW91bnQgZnJvbSB0aGUgY2hpbGQgbW91bnRzXG4gICAgICB2YXIgaWR4ID0gbm9kZS5tb3VudC5tb3VudHMuaW5kZXhPZihtb3VudClcbiAgICAgIGFzc2VydChpZHggIT09IC0xKVxuICAgICAgbm9kZS5tb3VudC5tb3VudHMuc3BsaWNlKGlkeCwgMSlcbiAgICB9LFxuICAgIGxvb2t1cDogKHBhcmVudCwgbmFtZSkgPT4ge1xuICAgICAgcmV0dXJuIHBhcmVudC5ub2RlX29wcy5sb29rdXAocGFyZW50LCBuYW1lKVxuICAgIH0sXG4gICAgbWtub2Q6IChwYXRoLCBtb2RlLCBkZXYpID0+IHtcbiAgICAgIHZhciBsb29rdXAgPSBGUy5sb29rdXBQYXRoKHBhdGgsIHsgcGFyZW50OiB0cnVlIH0pXG4gICAgICB2YXIgcGFyZW50ID0gbG9va3VwLm5vZGVcbiAgICAgIHZhciBuYW1lID0gUEFUSC5iYXNlbmFtZShwYXRoKVxuICAgICAgaWYgKCFuYW1lIHx8IG5hbWUgPT09ICcuJyB8fCBuYW1lID09PSAnLi4nKSB7XG4gICAgICAgIHRocm93IG5ldyBGUy5FcnJub0Vycm9yKDI4KVxuICAgICAgfVxuICAgICAgdmFyIGVyckNvZGUgPSBGUy5tYXlDcmVhdGUocGFyZW50LCBuYW1lKVxuICAgICAgaWYgKGVyckNvZGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEZTLkVycm5vRXJyb3IoZXJyQ29kZSlcbiAgICAgIH1cbiAgICAgIGlmICghcGFyZW50Lm5vZGVfb3BzLm1rbm9kKSB7XG4gICAgICAgIHRocm93IG5ldyBGUy5FcnJub0Vycm9yKDYzKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHBhcmVudC5ub2RlX29wcy5ta25vZChwYXJlbnQsIG5hbWUsIG1vZGUsIGRldilcbiAgICB9LFxuICAgIGNyZWF0ZTogKHBhdGgsIG1vZGUpID0+IHtcbiAgICAgIG1vZGUgPSBtb2RlICE9PSB1bmRlZmluZWQgPyBtb2RlIDogNDM4IC8qIDA2NjYgKi9cbiAgICAgIG1vZGUgJj0gNDA5NVxuICAgICAgbW9kZSB8PSAzMjc2OFxuICAgICAgcmV0dXJuIEZTLm1rbm9kKHBhdGgsIG1vZGUsIDApXG4gICAgfSxcbiAgICBta2RpcjogKHBhdGgsIG1vZGUpID0+IHtcbiAgICAgIG1vZGUgPSBtb2RlICE9PSB1bmRlZmluZWQgPyBtb2RlIDogNTExIC8qIDA3NzcgKi9cbiAgICAgIG1vZGUgJj0gNTExIHwgNTEyXG4gICAgICBtb2RlIHw9IDE2Mzg0XG4gICAgICByZXR1cm4gRlMubWtub2QocGF0aCwgbW9kZSwgMClcbiAgICB9LFxuICAgIG1rZGlyVHJlZTogKHBhdGgsIG1vZGUpID0+IHtcbiAgICAgIHZhciBkaXJzID0gcGF0aC5zcGxpdCgnLycpXG4gICAgICB2YXIgZCA9ICcnXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRpcnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKCFkaXJzW2ldKSBjb250aW51ZVxuICAgICAgICBkICs9ICcvJyArIGRpcnNbaV1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBGUy5ta2RpcihkLCBtb2RlKVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgaWYgKGUuZXJybm8gIT0gMjApIHRocm93IGVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgbWtkZXY6IChwYXRoLCBtb2RlLCBkZXYpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgZGV2ID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGRldiA9IG1vZGVcbiAgICAgICAgbW9kZSA9IDQzOCAvKiAwNjY2ICovXG4gICAgICB9XG4gICAgICBtb2RlIHw9IDgxOTJcbiAgICAgIHJldHVybiBGUy5ta25vZChwYXRoLCBtb2RlLCBkZXYpXG4gICAgfSxcbiAgICBzeW1saW5rOiAob2xkcGF0aCwgbmV3cGF0aCkgPT4ge1xuICAgICAgaWYgKCFQQVRIX0ZTLnJlc29sdmUob2xkcGF0aCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEZTLkVycm5vRXJyb3IoNDQpXG4gICAgICB9XG4gICAgICB2YXIgbG9va3VwID0gRlMubG9va3VwUGF0aChuZXdwYXRoLCB7IHBhcmVudDogdHJ1ZSB9KVxuICAgICAgdmFyIHBhcmVudCA9IGxvb2t1cC5ub2RlXG4gICAgICBpZiAoIXBhcmVudCkge1xuICAgICAgICB0aHJvdyBuZXcgRlMuRXJybm9FcnJvcig0NClcbiAgICAgIH1cbiAgICAgIHZhciBuZXduYW1lID0gUEFUSC5iYXNlbmFtZShuZXdwYXRoKVxuICAgICAgdmFyIGVyckNvZGUgPSBGUy5tYXlDcmVhdGUocGFyZW50LCBuZXduYW1lKVxuICAgICAgaWYgKGVyckNvZGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEZTLkVycm5vRXJyb3IoZXJyQ29kZSlcbiAgICAgIH1cbiAgICAgIGlmICghcGFyZW50Lm5vZGVfb3BzLnN5bWxpbmspIHtcbiAgICAgICAgdGhyb3cgbmV3IEZTLkVycm5vRXJyb3IoNjMpXG4gICAgICB9XG4gICAgICByZXR1cm4gcGFyZW50Lm5vZGVfb3BzLnN5bWxpbmsocGFyZW50LCBuZXduYW1lLCBvbGRwYXRoKVxuICAgIH0sXG4gICAgcmVuYW1lOiAob2xkX3BhdGgsIG5ld19wYXRoKSA9PiB7XG4gICAgICB2YXIgb2xkX2Rpcm5hbWUgPSBQQVRILmRpcm5hbWUob2xkX3BhdGgpXG4gICAgICB2YXIgbmV3X2Rpcm5hbWUgPSBQQVRILmRpcm5hbWUobmV3X3BhdGgpXG4gICAgICB2YXIgb2xkX25hbWUgPSBQQVRILmJhc2VuYW1lKG9sZF9wYXRoKVxuICAgICAgdmFyIG5ld19uYW1lID0gUEFUSC5iYXNlbmFtZShuZXdfcGF0aClcbiAgICAgIC8vIHBhcmVudHMgbXVzdCBleGlzdFxuICAgICAgdmFyIGxvb2t1cCwgb2xkX2RpciwgbmV3X2RpclxuXG4gICAgICAvLyBsZXQgdGhlIGVycm9ycyBmcm9tIG5vbiBleGlzdGFudCBkaXJlY3RvcmllcyBwZXJjb2xhdGUgdXBcbiAgICAgIGxvb2t1cCA9IEZTLmxvb2t1cFBhdGgob2xkX3BhdGgsIHsgcGFyZW50OiB0cnVlIH0pXG4gICAgICBvbGRfZGlyID0gbG9va3VwLm5vZGVcbiAgICAgIGxvb2t1cCA9IEZTLmxvb2t1cFBhdGgobmV3X3BhdGgsIHsgcGFyZW50OiB0cnVlIH0pXG4gICAgICBuZXdfZGlyID0gbG9va3VwLm5vZGVcblxuICAgICAgaWYgKCFvbGRfZGlyIHx8ICFuZXdfZGlyKSB0aHJvdyBuZXcgRlMuRXJybm9FcnJvcig0NClcbiAgICAgIC8vIG5lZWQgdG8gYmUgcGFydCBvZiB0aGUgc2FtZSBtb3VudFxuICAgICAgaWYgKG9sZF9kaXIubW91bnQgIT09IG5ld19kaXIubW91bnQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEZTLkVycm5vRXJyb3IoNzUpXG4gICAgICB9XG4gICAgICAvLyBzb3VyY2UgbXVzdCBleGlzdFxuICAgICAgdmFyIG9sZF9ub2RlID0gRlMubG9va3VwTm9kZShvbGRfZGlyLCBvbGRfbmFtZSlcbiAgICAgIC8vIG9sZCBwYXRoIHNob3VsZCBub3QgYmUgYW4gYW5jZXN0b3Igb2YgdGhlIG5ldyBwYXRoXG4gICAgICB2YXIgcmVsYXRpdmUgPSBQQVRIX0ZTLnJlbGF0aXZlKG9sZF9wYXRoLCBuZXdfZGlybmFtZSlcbiAgICAgIGlmIChyZWxhdGl2ZS5jaGFyQXQoMCkgIT09ICcuJykge1xuICAgICAgICB0aHJvdyBuZXcgRlMuRXJybm9FcnJvcigyOClcbiAgICAgIH1cbiAgICAgIC8vIG5ldyBwYXRoIHNob3VsZCBub3QgYmUgYW4gYW5jZXN0b3Igb2YgdGhlIG9sZCBwYXRoXG4gICAgICByZWxhdGl2ZSA9IFBBVEhfRlMucmVsYXRpdmUobmV3X3BhdGgsIG9sZF9kaXJuYW1lKVxuICAgICAgaWYgKHJlbGF0aXZlLmNoYXJBdCgwKSAhPT0gJy4nKSB7XG4gICAgICAgIHRocm93IG5ldyBGUy5FcnJub0Vycm9yKDU1KVxuICAgICAgfVxuICAgICAgLy8gc2VlIGlmIHRoZSBuZXcgcGF0aCBhbHJlYWR5IGV4aXN0c1xuICAgICAgdmFyIG5ld19ub2RlXG4gICAgICB0cnkge1xuICAgICAgICBuZXdfbm9kZSA9IEZTLmxvb2t1cE5vZGUobmV3X2RpciwgbmV3X25hbWUpXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIG5vdCBmYXRhbFxuICAgICAgfVxuICAgICAgLy8gZWFybHkgb3V0IGlmIG5vdGhpbmcgbmVlZHMgdG8gY2hhbmdlXG4gICAgICBpZiAob2xkX25vZGUgPT09IG5ld19ub2RlKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgLy8gd2UnbGwgbmVlZCB0byBkZWxldGUgdGhlIG9sZCBlbnRyeVxuICAgICAgdmFyIGlzZGlyID0gRlMuaXNEaXIob2xkX25vZGUubW9kZSlcbiAgICAgIHZhciBlcnJDb2RlID0gRlMubWF5RGVsZXRlKG9sZF9kaXIsIG9sZF9uYW1lLCBpc2RpcilcbiAgICAgIGlmIChlcnJDb2RlKSB7XG4gICAgICAgIHRocm93IG5ldyBGUy5FcnJub0Vycm9yKGVyckNvZGUpXG4gICAgICB9XG4gICAgICAvLyBuZWVkIGRlbGV0ZSBwZXJtaXNzaW9ucyBpZiB3ZSdsbCBiZSBvdmVyd3JpdGluZy5cbiAgICAgIC8vIG5lZWQgY3JlYXRlIHBlcm1pc3Npb25zIGlmIG5ldyBkb2Vzbid0IGFscmVhZHkgZXhpc3QuXG4gICAgICBlcnJDb2RlID0gbmV3X25vZGVcbiAgICAgICAgPyBGUy5tYXlEZWxldGUobmV3X2RpciwgbmV3X25hbWUsIGlzZGlyKVxuICAgICAgICA6IEZTLm1heUNyZWF0ZShuZXdfZGlyLCBuZXdfbmFtZSlcbiAgICAgIGlmIChlcnJDb2RlKSB7XG4gICAgICAgIHRocm93IG5ldyBGUy5FcnJub0Vycm9yKGVyckNvZGUpXG4gICAgICB9XG4gICAgICBpZiAoIW9sZF9kaXIubm9kZV9vcHMucmVuYW1lKSB7XG4gICAgICAgIHRocm93IG5ldyBGUy5FcnJub0Vycm9yKDYzKVxuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICBGUy5pc01vdW50cG9pbnQob2xkX25vZGUpIHx8XG4gICAgICAgIChuZXdfbm9kZSAmJiBGUy5pc01vdW50cG9pbnQobmV3X25vZGUpKVxuICAgICAgKSB7XG4gICAgICAgIHRocm93IG5ldyBGUy5FcnJub0Vycm9yKDEwKVxuICAgICAgfVxuICAgICAgLy8gaWYgd2UgYXJlIGdvaW5nIHRvIGNoYW5nZSB0aGUgcGFyZW50LCBjaGVjayB3cml0ZSBwZXJtaXNzaW9uc1xuICAgICAgaWYgKG5ld19kaXIgIT09IG9sZF9kaXIpIHtcbiAgICAgICAgZXJyQ29kZSA9IEZTLm5vZGVQZXJtaXNzaW9ucyhvbGRfZGlyLCAndycpXG4gICAgICAgIGlmIChlcnJDb2RlKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEZTLkVycm5vRXJyb3IoZXJyQ29kZSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gcmVtb3ZlIHRoZSBub2RlIGZyb20gdGhlIGxvb2t1cCBoYXNoXG4gICAgICBGUy5oYXNoUmVtb3ZlTm9kZShvbGRfbm9kZSlcbiAgICAgIC8vIGRvIHRoZSB1bmRlcmx5aW5nIGZzIHJlbmFtZVxuICAgICAgdHJ5IHtcbiAgICAgICAgb2xkX2Rpci5ub2RlX29wcy5yZW5hbWUob2xkX25vZGUsIG5ld19kaXIsIG5ld19uYW1lKVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aHJvdyBlXG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICAvLyBhZGQgdGhlIG5vZGUgYmFjayB0byB0aGUgaGFzaCAoaW4gY2FzZSBub2RlX29wcy5yZW5hbWVcbiAgICAgICAgLy8gY2hhbmdlZCBpdHMgbmFtZSlcbiAgICAgICAgRlMuaGFzaEFkZE5vZGUob2xkX25vZGUpXG4gICAgICB9XG4gICAgfSxcbiAgICBybWRpcjogKHBhdGgpID0+IHtcbiAgICAgIHZhciBsb29rdXAgPSBGUy5sb29rdXBQYXRoKHBhdGgsIHsgcGFyZW50OiB0cnVlIH0pXG4gICAgICB2YXIgcGFyZW50ID0gbG9va3VwLm5vZGVcbiAgICAgIHZhciBuYW1lID0gUEFUSC5iYXNlbmFtZShwYXRoKVxuICAgICAgdmFyIG5vZGUgPSBGUy5sb29rdXBOb2RlKHBhcmVudCwgbmFtZSlcbiAgICAgIHZhciBlcnJDb2RlID0gRlMubWF5RGVsZXRlKHBhcmVudCwgbmFtZSwgdHJ1ZSlcbiAgICAgIGlmIChlcnJDb2RlKSB7XG4gICAgICAgIHRocm93IG5ldyBGUy5FcnJub0Vycm9yKGVyckNvZGUpXG4gICAgICB9XG4gICAgICBpZiAoIXBhcmVudC5ub2RlX29wcy5ybWRpcikge1xuICAgICAgICB0aHJvdyBuZXcgRlMuRXJybm9FcnJvcig2MylcbiAgICAgIH1cbiAgICAgIGlmIChGUy5pc01vdW50cG9pbnQobm9kZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEZTLkVycm5vRXJyb3IoMTApXG4gICAgICB9XG4gICAgICBwYXJlbnQubm9kZV9vcHMucm1kaXIocGFyZW50LCBuYW1lKVxuICAgICAgRlMuZGVzdHJveU5vZGUobm9kZSlcbiAgICB9LFxuICAgIHJlYWRkaXI6IChwYXRoKSA9PiB7XG4gICAgICB2YXIgbG9va3VwID0gRlMubG9va3VwUGF0aChwYXRoLCB7IGZvbGxvdzogdHJ1ZSB9KVxuICAgICAgdmFyIG5vZGUgPSBsb29rdXAubm9kZVxuICAgICAgaWYgKCFub2RlLm5vZGVfb3BzLnJlYWRkaXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEZTLkVycm5vRXJyb3IoNTQpXG4gICAgICB9XG4gICAgICByZXR1cm4gbm9kZS5ub2RlX29wcy5yZWFkZGlyKG5vZGUpXG4gICAgfSxcbiAgICB1bmxpbms6IChwYXRoKSA9PiB7XG4gICAgICB2YXIgbG9va3VwID0gRlMubG9va3VwUGF0aChwYXRoLCB7IHBhcmVudDogdHJ1ZSB9KVxuICAgICAgdmFyIHBhcmVudCA9IGxvb2t1cC5ub2RlXG4gICAgICBpZiAoIXBhcmVudCkge1xuICAgICAgICB0aHJvdyBuZXcgRlMuRXJybm9FcnJvcig0NClcbiAgICAgIH1cbiAgICAgIHZhciBuYW1lID0gUEFUSC5iYXNlbmFtZShwYXRoKVxuICAgICAgdmFyIG5vZGUgPSBGUy5sb29rdXBOb2RlKHBhcmVudCwgbmFtZSlcbiAgICAgIHZhciBlcnJDb2RlID0gRlMubWF5RGVsZXRlKHBhcmVudCwgbmFtZSwgZmFsc2UpXG4gICAgICBpZiAoZXJyQ29kZSkge1xuICAgICAgICAvLyBBY2NvcmRpbmcgdG8gUE9TSVgsIHdlIHNob3VsZCBtYXAgRUlTRElSIHRvIEVQRVJNLCBidXRcbiAgICAgICAgLy8gd2UgaW5zdGVhZCBkbyB3aGF0IExpbnV4IGRvZXMgKGFuZCB3ZSBtdXN0LCBhcyB3ZSB1c2VcbiAgICAgICAgLy8gdGhlIG11c2wgbGludXggbGliYykuXG4gICAgICAgIHRocm93IG5ldyBGUy5FcnJub0Vycm9yKGVyckNvZGUpXG4gICAgICB9XG4gICAgICBpZiAoIXBhcmVudC5ub2RlX29wcy51bmxpbmspIHtcbiAgICAgICAgdGhyb3cgbmV3IEZTLkVycm5vRXJyb3IoNjMpXG4gICAgICB9XG4gICAgICBpZiAoRlMuaXNNb3VudHBvaW50KG5vZGUpKSB7XG4gICAgICAgIHRocm93IG5ldyBGUy5FcnJub0Vycm9yKDEwKVxuICAgICAgfVxuICAgICAgcGFyZW50Lm5vZGVfb3BzLnVubGluayhwYXJlbnQsIG5hbWUpXG4gICAgICBGUy5kZXN0cm95Tm9kZShub2RlKVxuICAgIH0sXG4gICAgcmVhZGxpbms6IChwYXRoKSA9PiB7XG4gICAgICB2YXIgbG9va3VwID0gRlMubG9va3VwUGF0aChwYXRoKVxuICAgICAgdmFyIGxpbmsgPSBsb29rdXAubm9kZVxuICAgICAgaWYgKCFsaW5rKSB7XG4gICAgICAgIHRocm93IG5ldyBGUy5FcnJub0Vycm9yKDQ0KVxuICAgICAgfVxuICAgICAgaWYgKCFsaW5rLm5vZGVfb3BzLnJlYWRsaW5rKSB7XG4gICAgICAgIHRocm93IG5ldyBGUy5FcnJub0Vycm9yKDI4KVxuICAgICAgfVxuICAgICAgcmV0dXJuIFBBVEhfRlMucmVzb2x2ZShcbiAgICAgICAgRlMuZ2V0UGF0aChsaW5rLnBhcmVudCksXG4gICAgICAgIGxpbmsubm9kZV9vcHMucmVhZGxpbmsobGluaylcbiAgICAgIClcbiAgICB9LFxuICAgIHN0YXQ6IChwYXRoLCBkb250Rm9sbG93KSA9PiB7XG4gICAgICB2YXIgbG9va3VwID0gRlMubG9va3VwUGF0aChwYXRoLCB7IGZvbGxvdzogIWRvbnRGb2xsb3cgfSlcbiAgICAgIHZhciBub2RlID0gbG9va3VwLm5vZGVcbiAgICAgIGlmICghbm9kZSkge1xuICAgICAgICB0aHJvdyBuZXcgRlMuRXJybm9FcnJvcig0NClcbiAgICAgIH1cbiAgICAgIGlmICghbm9kZS5ub2RlX29wcy5nZXRhdHRyKSB7XG4gICAgICAgIHRocm93IG5ldyBGUy5FcnJub0Vycm9yKDYzKVxuICAgICAgfVxuICAgICAgcmV0dXJuIG5vZGUubm9kZV9vcHMuZ2V0YXR0cihub2RlKVxuICAgIH0sXG4gICAgbHN0YXQ6IChwYXRoKSA9PiB7XG4gICAgICByZXR1cm4gRlMuc3RhdChwYXRoLCB0cnVlKVxuICAgIH0sXG4gICAgY2htb2Q6IChwYXRoLCBtb2RlLCBkb250Rm9sbG93KSA9PiB7XG4gICAgICB2YXIgbm9kZVxuICAgICAgaWYgKHR5cGVvZiBwYXRoID09ICdzdHJpbmcnKSB7XG4gICAgICAgIHZhciBsb29rdXAgPSBGUy5sb29rdXBQYXRoKHBhdGgsIHsgZm9sbG93OiAhZG9udEZvbGxvdyB9KVxuICAgICAgICBub2RlID0gbG9va3VwLm5vZGVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vZGUgPSBwYXRoXG4gICAgICB9XG4gICAgICBpZiAoIW5vZGUubm9kZV9vcHMuc2V0YXR0cikge1xuICAgICAgICB0aHJvdyBuZXcgRlMuRXJybm9FcnJvcig2MylcbiAgICAgIH1cbiAgICAgIG5vZGUubm9kZV9vcHMuc2V0YXR0cihub2RlLCB7XG4gICAgICAgIG1vZGU6IChtb2RlICYgNDA5NSkgfCAobm9kZS5tb2RlICYgfjQwOTUpLFxuICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KClcbiAgICAgIH0pXG4gICAgfSxcbiAgICBsY2htb2Q6IChwYXRoLCBtb2RlKSA9PiB7XG4gICAgICBGUy5jaG1vZChwYXRoLCBtb2RlLCB0cnVlKVxuICAgIH0sXG4gICAgZmNobW9kOiAoZmQsIG1vZGUpID0+IHtcbiAgICAgIHZhciBzdHJlYW0gPSBGUy5nZXRTdHJlYW0oZmQpXG4gICAgICBpZiAoIXN0cmVhbSkge1xuICAgICAgICB0aHJvdyBuZXcgRlMuRXJybm9FcnJvcig4KVxuICAgICAgfVxuICAgICAgRlMuY2htb2Qoc3RyZWFtLm5vZGUsIG1vZGUpXG4gICAgfSxcbiAgICBjaG93bjogKHBhdGgsIHVpZCwgZ2lkLCBkb250Rm9sbG93KSA9PiB7XG4gICAgICB2YXIgbm9kZVxuICAgICAgaWYgKHR5cGVvZiBwYXRoID09ICdzdHJpbmcnKSB7XG4gICAgICAgIHZhciBsb29rdXAgPSBGUy5sb29rdXBQYXRoKHBhdGgsIHsgZm9sbG93OiAhZG9udEZvbGxvdyB9KVxuICAgICAgICBub2RlID0gbG9va3VwLm5vZGVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vZGUgPSBwYXRoXG4gICAgICB9XG4gICAgICBpZiAoIW5vZGUubm9kZV9vcHMuc2V0YXR0cikge1xuICAgICAgICB0aHJvdyBuZXcgRlMuRXJybm9FcnJvcig2MylcbiAgICAgIH1cbiAgICAgIG5vZGUubm9kZV9vcHMuc2V0YXR0cihub2RlLCB7XG4gICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKVxuICAgICAgICAvLyB3ZSBpZ25vcmUgdGhlIHVpZCAvIGdpZCBmb3Igbm93XG4gICAgICB9KVxuICAgIH0sXG4gICAgbGNob3duOiAocGF0aCwgdWlkLCBnaWQpID0+IHtcbiAgICAgIEZTLmNob3duKHBhdGgsIHVpZCwgZ2lkLCB0cnVlKVxuICAgIH0sXG4gICAgZmNob3duOiAoZmQsIHVpZCwgZ2lkKSA9PiB7XG4gICAgICB2YXIgc3RyZWFtID0gRlMuZ2V0U3RyZWFtKGZkKVxuICAgICAgaWYgKCFzdHJlYW0pIHtcbiAgICAgICAgdGhyb3cgbmV3IEZTLkVycm5vRXJyb3IoOClcbiAgICAgIH1cbiAgICAgIEZTLmNob3duKHN0cmVhbS5ub2RlLCB1aWQsIGdpZClcbiAgICB9LFxuICAgIHRydW5jYXRlOiAocGF0aCwgbGVuKSA9PiB7XG4gICAgICBpZiAobGVuIDwgMCkge1xuICAgICAgICB0aHJvdyBuZXcgRlMuRXJybm9FcnJvcigyOClcbiAgICAgIH1cbiAgICAgIHZhciBub2RlXG4gICAgICBpZiAodHlwZW9mIHBhdGggPT0gJ3N0cmluZycpIHtcbiAgICAgICAgdmFyIGxvb2t1cCA9IEZTLmxvb2t1cFBhdGgocGF0aCwgeyBmb2xsb3c6IHRydWUgfSlcbiAgICAgICAgbm9kZSA9IGxvb2t1cC5ub2RlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub2RlID0gcGF0aFxuICAgICAgfVxuICAgICAgaWYgKCFub2RlLm5vZGVfb3BzLnNldGF0dHIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEZTLkVycm5vRXJyb3IoNjMpXG4gICAgICB9XG4gICAgICBpZiAoRlMuaXNEaXIobm9kZS5tb2RlKSkge1xuICAgICAgICB0aHJvdyBuZXcgRlMuRXJybm9FcnJvcigzMSlcbiAgICAgIH1cbiAgICAgIGlmICghRlMuaXNGaWxlKG5vZGUubW9kZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEZTLkVycm5vRXJyb3IoMjgpXG4gICAgICB9XG4gICAgICB2YXIgZXJyQ29kZSA9IEZTLm5vZGVQZXJtaXNzaW9ucyhub2RlLCAndycpXG4gICAgICBpZiAoZXJyQ29kZSkge1xuICAgICAgICB0aHJvdyBuZXcgRlMuRXJybm9FcnJvcihlcnJDb2RlKVxuICAgICAgfVxuICAgICAgbm9kZS5ub2RlX29wcy5zZXRhdHRyKG5vZGUsIHtcbiAgICAgICAgc2l6ZTogbGVuLFxuICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KClcbiAgICAgIH0pXG4gICAgfSxcbiAgICBmdHJ1bmNhdGU6IChmZCwgbGVuKSA9PiB7XG4gICAgICB2YXIgc3RyZWFtID0gRlMuZ2V0U3RyZWFtKGZkKVxuICAgICAgaWYgKCFzdHJlYW0pIHtcbiAgICAgICAgdGhyb3cgbmV3IEZTLkVycm5vRXJyb3IoOClcbiAgICAgIH1cbiAgICAgIGlmICgoc3RyZWFtLmZsYWdzICYgMjA5NzE1NSkgPT09IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEZTLkVycm5vRXJyb3IoMjgpXG4gICAgICB9XG4gICAgICBGUy50cnVuY2F0ZShzdHJlYW0ubm9kZSwgbGVuKVxuICAgIH0sXG4gICAgdXRpbWU6IChwYXRoLCBhdGltZSwgbXRpbWUpID0+IHtcbiAgICAgIHZhciBsb29rdXAgPSBGUy5sb29rdXBQYXRoKHBhdGgsIHsgZm9sbG93OiB0cnVlIH0pXG4gICAgICB2YXIgbm9kZSA9IGxvb2t1cC5ub2RlXG4gICAgICBub2RlLm5vZGVfb3BzLnNldGF0dHIobm9kZSwge1xuICAgICAgICB0aW1lc3RhbXA6IE1hdGgubWF4KGF0aW1lLCBtdGltZSlcbiAgICAgIH0pXG4gICAgfSxcbiAgICBvcGVuOiAocGF0aCwgZmxhZ3MsIG1vZGUpID0+IHtcbiAgICAgIGlmIChwYXRoID09PSAnJykge1xuICAgICAgICB0aHJvdyBuZXcgRlMuRXJybm9FcnJvcig0NClcbiAgICAgIH1cbiAgICAgIGZsYWdzID0gdHlwZW9mIGZsYWdzID09ICdzdHJpbmcnID8gRlMubW9kZVN0cmluZ1RvRmxhZ3MoZmxhZ3MpIDogZmxhZ3NcbiAgICAgIG1vZGUgPSB0eXBlb2YgbW9kZSA9PSAndW5kZWZpbmVkJyA/IDQzOCAvKiAwNjY2ICovIDogbW9kZVxuICAgICAgaWYgKGZsYWdzICYgNjQpIHtcbiAgICAgICAgbW9kZSA9IChtb2RlICYgNDA5NSkgfCAzMjc2OFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbW9kZSA9IDBcbiAgICAgIH1cbiAgICAgIHZhciBub2RlXG4gICAgICBpZiAodHlwZW9mIHBhdGggPT0gJ29iamVjdCcpIHtcbiAgICAgICAgbm9kZSA9IHBhdGhcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhdGggPSBQQVRILm5vcm1hbGl6ZShwYXRoKVxuICAgICAgICB0cnkge1xuICAgICAgICAgIHZhciBsb29rdXAgPSBGUy5sb29rdXBQYXRoKHBhdGgsIHtcbiAgICAgICAgICAgIGZvbGxvdzogIShmbGFncyAmIDEzMTA3MilcbiAgICAgICAgICB9KVxuICAgICAgICAgIG5vZGUgPSBsb29rdXAubm9kZVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gaWdub3JlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIHBlcmhhcHMgd2UgbmVlZCB0byBjcmVhdGUgdGhlIG5vZGVcbiAgICAgIHZhciBjcmVhdGVkID0gZmFsc2VcbiAgICAgIGlmIChmbGFncyAmIDY0KSB7XG4gICAgICAgIGlmIChub2RlKSB7XG4gICAgICAgICAgLy8gaWYgT19DUkVBVCBhbmQgT19FWENMIGFyZSBzZXQsIGVycm9yIG91dCBpZiB0aGUgbm9kZSBhbHJlYWR5IGV4aXN0c1xuICAgICAgICAgIGlmIChmbGFncyAmIDEyOCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEZTLkVycm5vRXJyb3IoMjApXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIG5vZGUgZG9lc24ndCBleGlzdCwgdHJ5IHRvIGNyZWF0ZSBpdFxuICAgICAgICAgIG5vZGUgPSBGUy5ta25vZChwYXRoLCBtb2RlLCAwKVxuICAgICAgICAgIGNyZWF0ZWQgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICghbm9kZSkge1xuICAgICAgICB0aHJvdyBuZXcgRlMuRXJybm9FcnJvcig0NClcbiAgICAgIH1cbiAgICAgIC8vIGNhbid0IHRydW5jYXRlIGEgZGV2aWNlXG4gICAgICBpZiAoRlMuaXNDaHJkZXYobm9kZS5tb2RlKSkge1xuICAgICAgICBmbGFncyAmPSB+NTEyXG4gICAgICB9XG4gICAgICAvLyBpZiBhc2tlZCBvbmx5IGZvciBhIGRpcmVjdG9yeSwgdGhlbiB0aGlzIG11c3QgYmUgb25lXG4gICAgICBpZiAoZmxhZ3MgJiA2NTUzNiAmJiAhRlMuaXNEaXIobm9kZS5tb2RlKSkge1xuICAgICAgICB0aHJvdyBuZXcgRlMuRXJybm9FcnJvcig1NClcbiAgICAgIH1cbiAgICAgIC8vIGNoZWNrIHBlcm1pc3Npb25zLCBpZiB0aGlzIGlzIG5vdCBhIGZpbGUgd2UganVzdCBjcmVhdGVkIG5vdyAoaXQgaXMgb2sgdG9cbiAgICAgIC8vIGNyZWF0ZSBhbmQgd3JpdGUgdG8gYSBmaWxlIHdpdGggcmVhZC1vbmx5IHBlcm1pc3Npb25zOyBpdCBpcyByZWFkLW9ubHlcbiAgICAgIC8vIGZvciBsYXRlciB1c2UpXG4gICAgICBpZiAoIWNyZWF0ZWQpIHtcbiAgICAgICAgdmFyIGVyckNvZGUgPSBGUy5tYXlPcGVuKG5vZGUsIGZsYWdzKVxuICAgICAgICBpZiAoZXJyQ29kZSkge1xuICAgICAgICAgIHRocm93IG5ldyBGUy5FcnJub0Vycm9yKGVyckNvZGUpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIGRvIHRydW5jYXRpb24gaWYgbmVjZXNzYXJ5XG4gICAgICBpZiAoZmxhZ3MgJiA1MTIgJiYgIWNyZWF0ZWQpIHtcbiAgICAgICAgRlMudHJ1bmNhdGUobm9kZSwgMClcbiAgICAgIH1cbiAgICAgIC8vIHdlJ3ZlIGFscmVhZHkgaGFuZGxlZCB0aGVzZSwgZG9uJ3QgcGFzcyBkb3duIHRvIHRoZSB1bmRlcmx5aW5nIHZmc1xuICAgICAgZmxhZ3MgJj0gfigxMjggfCA1MTIgfCAxMzEwNzIpXG5cbiAgICAgIC8vIHJlZ2lzdGVyIHRoZSBzdHJlYW0gd2l0aCB0aGUgZmlsZXN5c3RlbVxuICAgICAgdmFyIHN0cmVhbSA9IEZTLmNyZWF0ZVN0cmVhbSh7XG4gICAgICAgIG5vZGU6IG5vZGUsXG4gICAgICAgIHBhdGg6IEZTLmdldFBhdGgobm9kZSksIC8vIHdlIHdhbnQgdGhlIGFic29sdXRlIHBhdGggdG8gdGhlIG5vZGVcbiAgICAgICAgZmxhZ3M6IGZsYWdzLFxuICAgICAgICBzZWVrYWJsZTogdHJ1ZSxcbiAgICAgICAgcG9zaXRpb246IDAsXG4gICAgICAgIHN0cmVhbV9vcHM6IG5vZGUuc3RyZWFtX29wcyxcbiAgICAgICAgLy8gdXNlZCBieSB0aGUgZmlsZSBmYW1pbHkgbGliYyBjYWxscyAoZm9wZW4sIGZ3cml0ZSwgZmVycm9yLCBldGMuKVxuICAgICAgICB1bmdvdHRlbjogW10sXG4gICAgICAgIGVycm9yOiBmYWxzZVxuICAgICAgfSlcbiAgICAgIC8vIGNhbGwgdGhlIG5ldyBzdHJlYW0ncyBvcGVuIGZ1bmN0aW9uXG4gICAgICBpZiAoc3RyZWFtLnN0cmVhbV9vcHMub3Blbikge1xuICAgICAgICBzdHJlYW0uc3RyZWFtX29wcy5vcGVuKHN0cmVhbSlcbiAgICAgIH1cbiAgICAgIGlmIChNb2R1bGVbJ2xvZ1JlYWRGaWxlcyddICYmICEoZmxhZ3MgJiAxKSkge1xuICAgICAgICBpZiAoIUZTLnJlYWRGaWxlcykgRlMucmVhZEZpbGVzID0ge31cbiAgICAgICAgaWYgKCEocGF0aCBpbiBGUy5yZWFkRmlsZXMpKSB7XG4gICAgICAgICAgRlMucmVhZEZpbGVzW3BhdGhdID0gMVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RyZWFtXG4gICAgfSxcbiAgICBjbG9zZTogKHN0cmVhbSkgPT4ge1xuICAgICAgaWYgKEZTLmlzQ2xvc2VkKHN0cmVhbSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEZTLkVycm5vRXJyb3IoOClcbiAgICAgIH1cbiAgICAgIGlmIChzdHJlYW0uZ2V0ZGVudHMpIHN0cmVhbS5nZXRkZW50cyA9IG51bGwgLy8gZnJlZSByZWFkZGlyIHN0YXRlXG4gICAgICB0cnkge1xuICAgICAgICBpZiAoc3RyZWFtLnN0cmVhbV9vcHMuY2xvc2UpIHtcbiAgICAgICAgICBzdHJlYW0uc3RyZWFtX29wcy5jbG9zZShzdHJlYW0pXG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhyb3cgZVxuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgRlMuY2xvc2VTdHJlYW0oc3RyZWFtLmZkKVxuICAgICAgfVxuICAgICAgc3RyZWFtLmZkID0gbnVsbFxuICAgIH0sXG4gICAgaXNDbG9zZWQ6IChzdHJlYW0pID0+IHtcbiAgICAgIHJldHVybiBzdHJlYW0uZmQgPT09IG51bGxcbiAgICB9LFxuICAgIGxsc2VlazogKHN0cmVhbSwgb2Zmc2V0LCB3aGVuY2UpID0+IHtcbiAgICAgIGlmIChGUy5pc0Nsb3NlZChzdHJlYW0pKSB7XG4gICAgICAgIHRocm93IG5ldyBGUy5FcnJub0Vycm9yKDgpXG4gICAgICB9XG4gICAgICBpZiAoIXN0cmVhbS5zZWVrYWJsZSB8fCAhc3RyZWFtLnN0cmVhbV9vcHMubGxzZWVrKSB7XG4gICAgICAgIHRocm93IG5ldyBGUy5FcnJub0Vycm9yKDcwKVxuICAgICAgfVxuICAgICAgaWYgKHdoZW5jZSAhPSAwICYmIHdoZW5jZSAhPSAxICYmIHdoZW5jZSAhPSAyKSB7XG4gICAgICAgIHRocm93IG5ldyBGUy5FcnJub0Vycm9yKDI4KVxuICAgICAgfVxuICAgICAgc3RyZWFtLnBvc2l0aW9uID0gc3RyZWFtLnN0cmVhbV9vcHMubGxzZWVrKHN0cmVhbSwgb2Zmc2V0LCB3aGVuY2UpXG4gICAgICBzdHJlYW0udW5nb3R0ZW4gPSBbXVxuICAgICAgcmV0dXJuIHN0cmVhbS5wb3NpdGlvblxuICAgIH0sXG4gICAgcmVhZDogKHN0cmVhbSwgYnVmZmVyLCBvZmZzZXQsIGxlbmd0aCwgcG9zaXRpb24pID0+IHtcbiAgICAgIGlmIChsZW5ndGggPCAwIHx8IHBvc2l0aW9uIDwgMCkge1xuICAgICAgICB0aHJvdyBuZXcgRlMuRXJybm9FcnJvcigyOClcbiAgICAgIH1cbiAgICAgIGlmIChGUy5pc0Nsb3NlZChzdHJlYW0pKSB7XG4gICAgICAgIHRocm93IG5ldyBGUy5FcnJub0Vycm9yKDgpXG4gICAgICB9XG4gICAgICBpZiAoKHN0cmVhbS5mbGFncyAmIDIwOTcxNTUpID09PSAxKSB7XG4gICAgICAgIHRocm93IG5ldyBGUy5FcnJub0Vycm9yKDgpXG4gICAgICB9XG4gICAgICBpZiAoRlMuaXNEaXIoc3RyZWFtLm5vZGUubW9kZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEZTLkVycm5vRXJyb3IoMzEpXG4gICAgICB9XG4gICAgICBpZiAoIXN0cmVhbS5zdHJlYW1fb3BzLnJlYWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEZTLkVycm5vRXJyb3IoMjgpXG4gICAgICB9XG4gICAgICB2YXIgc2Vla2luZyA9IHR5cGVvZiBwb3NpdGlvbiAhPSAndW5kZWZpbmVkJ1xuICAgICAgaWYgKCFzZWVraW5nKSB7XG4gICAgICAgIHBvc2l0aW9uID0gc3RyZWFtLnBvc2l0aW9uXG4gICAgICB9IGVsc2UgaWYgKCFzdHJlYW0uc2Vla2FibGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEZTLkVycm5vRXJyb3IoNzApXG4gICAgICB9XG4gICAgICB2YXIgYnl0ZXNSZWFkID0gc3RyZWFtLnN0cmVhbV9vcHMucmVhZChcbiAgICAgICAgc3RyZWFtLFxuICAgICAgICBidWZmZXIsXG4gICAgICAgIG9mZnNldCxcbiAgICAgICAgbGVuZ3RoLFxuICAgICAgICBwb3NpdGlvblxuICAgICAgKVxuICAgICAgaWYgKCFzZWVraW5nKSBzdHJlYW0ucG9zaXRpb24gKz0gYnl0ZXNSZWFkXG4gICAgICByZXR1cm4gYnl0ZXNSZWFkXG4gICAgfSxcbiAgICB3cml0ZTogKHN0cmVhbSwgYnVmZmVyLCBvZmZzZXQsIGxlbmd0aCwgcG9zaXRpb24sIGNhbk93bikgPT4ge1xuICAgICAgaWYgKGxlbmd0aCA8IDAgfHwgcG9zaXRpb24gPCAwKSB7XG4gICAgICAgIHRocm93IG5ldyBGUy5FcnJub0Vycm9yKDI4KVxuICAgICAgfVxuICAgICAgaWYgKEZTLmlzQ2xvc2VkKHN0cmVhbSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEZTLkVycm5vRXJyb3IoOClcbiAgICAgIH1cbiAgICAgIGlmICgoc3RyZWFtLmZsYWdzICYgMjA5NzE1NSkgPT09IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEZTLkVycm5vRXJyb3IoOClcbiAgICAgIH1cbiAgICAgIGlmIChGUy5pc0RpcihzdHJlYW0ubm9kZS5tb2RlKSkge1xuICAgICAgICB0aHJvdyBuZXcgRlMuRXJybm9FcnJvcigzMSlcbiAgICAgIH1cbiAgICAgIGlmICghc3RyZWFtLnN0cmVhbV9vcHMud3JpdGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEZTLkVycm5vRXJyb3IoMjgpXG4gICAgICB9XG4gICAgICBpZiAoc3RyZWFtLnNlZWthYmxlICYmIHN0cmVhbS5mbGFncyAmIDEwMjQpIHtcbiAgICAgICAgLy8gc2VlayB0byB0aGUgZW5kIGJlZm9yZSB3cml0aW5nIGluIGFwcGVuZCBtb2RlXG4gICAgICAgIEZTLmxsc2VlayhzdHJlYW0sIDAsIDIpXG4gICAgICB9XG4gICAgICB2YXIgc2Vla2luZyA9IHR5cGVvZiBwb3NpdGlvbiAhPSAndW5kZWZpbmVkJ1xuICAgICAgaWYgKCFzZWVraW5nKSB7XG4gICAgICAgIHBvc2l0aW9uID0gc3RyZWFtLnBvc2l0aW9uXG4gICAgICB9IGVsc2UgaWYgKCFzdHJlYW0uc2Vla2FibGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEZTLkVycm5vRXJyb3IoNzApXG4gICAgICB9XG4gICAgICB2YXIgYnl0ZXNXcml0dGVuID0gc3RyZWFtLnN0cmVhbV9vcHMud3JpdGUoXG4gICAgICAgIHN0cmVhbSxcbiAgICAgICAgYnVmZmVyLFxuICAgICAgICBvZmZzZXQsXG4gICAgICAgIGxlbmd0aCxcbiAgICAgICAgcG9zaXRpb24sXG4gICAgICAgIGNhbk93blxuICAgICAgKVxuICAgICAgaWYgKCFzZWVraW5nKSBzdHJlYW0ucG9zaXRpb24gKz0gYnl0ZXNXcml0dGVuXG4gICAgICByZXR1cm4gYnl0ZXNXcml0dGVuXG4gICAgfSxcbiAgICBhbGxvY2F0ZTogKHN0cmVhbSwgb2Zmc2V0LCBsZW5ndGgpID0+IHtcbiAgICAgIGlmIChGUy5pc0Nsb3NlZChzdHJlYW0pKSB7XG4gICAgICAgIHRocm93IG5ldyBGUy5FcnJub0Vycm9yKDgpXG4gICAgICB9XG4gICAgICBpZiAob2Zmc2V0IDwgMCB8fCBsZW5ndGggPD0gMCkge1xuICAgICAgICB0aHJvdyBuZXcgRlMuRXJybm9FcnJvcigyOClcbiAgICAgIH1cbiAgICAgIGlmICgoc3RyZWFtLmZsYWdzICYgMjA5NzE1NSkgPT09IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEZTLkVycm5vRXJyb3IoOClcbiAgICAgIH1cbiAgICAgIGlmICghRlMuaXNGaWxlKHN0cmVhbS5ub2RlLm1vZGUpICYmICFGUy5pc0RpcihzdHJlYW0ubm9kZS5tb2RlKSkge1xuICAgICAgICB0aHJvdyBuZXcgRlMuRXJybm9FcnJvcig0MylcbiAgICAgIH1cbiAgICAgIGlmICghc3RyZWFtLnN0cmVhbV9vcHMuYWxsb2NhdGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEZTLkVycm5vRXJyb3IoMTM4KVxuICAgICAgfVxuICAgICAgc3RyZWFtLnN0cmVhbV9vcHMuYWxsb2NhdGUoc3RyZWFtLCBvZmZzZXQsIGxlbmd0aClcbiAgICB9LFxuICAgIG1tYXA6IChzdHJlYW0sIGxlbmd0aCwgcG9zaXRpb24sIHByb3QsIGZsYWdzKSA9PiB7XG4gICAgICAvLyBVc2VyIHJlcXVlc3RzIHdyaXRpbmcgdG8gZmlsZSAocHJvdCAmIFBST1RfV1JJVEUgIT0gMCkuXG4gICAgICAvLyBDaGVja2luZyBpZiB3ZSBoYXZlIHBlcm1pc3Npb25zIHRvIHdyaXRlIHRvIHRoZSBmaWxlIHVubGVzc1xuICAgICAgLy8gTUFQX1BSSVZBVEUgZmxhZyBpcyBzZXQuIEFjY29yZGluZyB0byBQT1NJWCBzcGVjIGl0IGlzIHBvc3NpYmxlXG4gICAgICAvLyB0byB3cml0ZSB0byBmaWxlIG9wZW5lZCBpbiByZWFkLW9ubHkgbW9kZSB3aXRoIE1BUF9QUklWQVRFIGZsYWcsXG4gICAgICAvLyBhcyBhbGwgbW9kaWZpY2F0aW9ucyB3aWxsIGJlIHZpc2libGUgb25seSBpbiB0aGUgbWVtb3J5IG9mXG4gICAgICAvLyB0aGUgY3VycmVudCBwcm9jZXNzLlxuICAgICAgaWYgKFxuICAgICAgICAocHJvdCAmIDIpICE9PSAwICYmXG4gICAgICAgIChmbGFncyAmIDIpID09PSAwICYmXG4gICAgICAgIChzdHJlYW0uZmxhZ3MgJiAyMDk3MTU1KSAhPT0gMlxuICAgICAgKSB7XG4gICAgICAgIHRocm93IG5ldyBGUy5FcnJub0Vycm9yKDIpXG4gICAgICB9XG4gICAgICBpZiAoKHN0cmVhbS5mbGFncyAmIDIwOTcxNTUpID09PSAxKSB7XG4gICAgICAgIHRocm93IG5ldyBGUy5FcnJub0Vycm9yKDIpXG4gICAgICB9XG4gICAgICBpZiAoIXN0cmVhbS5zdHJlYW1fb3BzLm1tYXApIHtcbiAgICAgICAgdGhyb3cgbmV3IEZTLkVycm5vRXJyb3IoNDMpXG4gICAgICB9XG4gICAgICByZXR1cm4gc3RyZWFtLnN0cmVhbV9vcHMubW1hcChzdHJlYW0sIGxlbmd0aCwgcG9zaXRpb24sIHByb3QsIGZsYWdzKVxuICAgIH0sXG4gICAgbXN5bmM6IChzdHJlYW0sIGJ1ZmZlciwgb2Zmc2V0LCBsZW5ndGgsIG1tYXBGbGFncykgPT4ge1xuICAgICAgaWYgKCFzdHJlYW0uc3RyZWFtX29wcy5tc3luYykge1xuICAgICAgICByZXR1cm4gMFxuICAgICAgfVxuICAgICAgcmV0dXJuIHN0cmVhbS5zdHJlYW1fb3BzLm1zeW5jKHN0cmVhbSwgYnVmZmVyLCBvZmZzZXQsIGxlbmd0aCwgbW1hcEZsYWdzKVxuICAgIH0sXG4gICAgbXVubWFwOiAoc3RyZWFtKSA9PiAwLFxuICAgIGlvY3RsOiAoc3RyZWFtLCBjbWQsIGFyZykgPT4ge1xuICAgICAgaWYgKCFzdHJlYW0uc3RyZWFtX29wcy5pb2N0bCkge1xuICAgICAgICB0aHJvdyBuZXcgRlMuRXJybm9FcnJvcig1OSlcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdHJlYW0uc3RyZWFtX29wcy5pb2N0bChzdHJlYW0sIGNtZCwgYXJnKVxuICAgIH0sXG4gICAgcmVhZEZpbGU6IChwYXRoLCBvcHRzID0ge30pID0+IHtcbiAgICAgIG9wdHMuZmxhZ3MgPSBvcHRzLmZsYWdzIHx8IDBcbiAgICAgIG9wdHMuZW5jb2RpbmcgPSBvcHRzLmVuY29kaW5nIHx8ICdiaW5hcnknXG4gICAgICBpZiAob3B0cy5lbmNvZGluZyAhPT0gJ3V0ZjgnICYmIG9wdHMuZW5jb2RpbmcgIT09ICdiaW5hcnknKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBlbmNvZGluZyB0eXBlIFwiJyArIG9wdHMuZW5jb2RpbmcgKyAnXCInKVxuICAgICAgfVxuICAgICAgdmFyIHJldFxuICAgICAgdmFyIHN0cmVhbSA9IEZTLm9wZW4ocGF0aCwgb3B0cy5mbGFncylcbiAgICAgIHZhciBzdGF0ID0gRlMuc3RhdChwYXRoKVxuICAgICAgdmFyIGxlbmd0aCA9IHN0YXQuc2l6ZVxuICAgICAgdmFyIGJ1ZiA9IG5ldyBVaW50OEFycmF5KGxlbmd0aClcbiAgICAgIEZTLnJlYWQoc3RyZWFtLCBidWYsIDAsIGxlbmd0aCwgMClcbiAgICAgIGlmIChvcHRzLmVuY29kaW5nID09PSAndXRmOCcpIHtcbiAgICAgICAgcmV0ID0gVVRGOEFycmF5VG9TdHJpbmcoYnVmLCAwKVxuICAgICAgfSBlbHNlIGlmIChvcHRzLmVuY29kaW5nID09PSAnYmluYXJ5Jykge1xuICAgICAgICByZXQgPSBidWZcbiAgICAgIH1cbiAgICAgIEZTLmNsb3NlKHN0cmVhbSlcbiAgICAgIHJldHVybiByZXRcbiAgICB9LFxuICAgIHdyaXRlRmlsZTogKHBhdGgsIGRhdGEsIG9wdHMgPSB7fSkgPT4ge1xuICAgICAgb3B0cy5mbGFncyA9IG9wdHMuZmxhZ3MgfHwgNTc3XG4gICAgICB2YXIgc3RyZWFtID0gRlMub3BlbihwYXRoLCBvcHRzLmZsYWdzLCBvcHRzLm1vZGUpXG4gICAgICBpZiAodHlwZW9mIGRhdGEgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgdmFyIGJ1ZiA9IG5ldyBVaW50OEFycmF5KGxlbmd0aEJ5dGVzVVRGOChkYXRhKSArIDEpXG4gICAgICAgIHZhciBhY3R1YWxOdW1CeXRlcyA9IHN0cmluZ1RvVVRGOEFycmF5KGRhdGEsIGJ1ZiwgMCwgYnVmLmxlbmd0aClcbiAgICAgICAgRlMud3JpdGUoc3RyZWFtLCBidWYsIDAsIGFjdHVhbE51bUJ5dGVzLCB1bmRlZmluZWQsIG9wdHMuY2FuT3duKVxuICAgICAgfSBlbHNlIGlmIChBcnJheUJ1ZmZlci5pc1ZpZXcoZGF0YSkpIHtcbiAgICAgICAgRlMud3JpdGUoc3RyZWFtLCBkYXRhLCAwLCBkYXRhLmJ5dGVMZW5ndGgsIHVuZGVmaW5lZCwgb3B0cy5jYW5Pd24pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIGRhdGEgdHlwZScpXG4gICAgICB9XG4gICAgICBGUy5jbG9zZShzdHJlYW0pXG4gICAgfSxcbiAgICBjd2Q6ICgpID0+IEZTLmN1cnJlbnRQYXRoLFxuICAgIGNoZGlyOiAocGF0aCkgPT4ge1xuICAgICAgdmFyIGxvb2t1cCA9IEZTLmxvb2t1cFBhdGgocGF0aCwgeyBmb2xsb3c6IHRydWUgfSlcbiAgICAgIGlmIChsb29rdXAubm9kZSA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRlMuRXJybm9FcnJvcig0NClcbiAgICAgIH1cbiAgICAgIGlmICghRlMuaXNEaXIobG9va3VwLm5vZGUubW9kZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEZTLkVycm5vRXJyb3IoNTQpXG4gICAgICB9XG4gICAgICB2YXIgZXJyQ29kZSA9IEZTLm5vZGVQZXJtaXNzaW9ucyhsb29rdXAubm9kZSwgJ3gnKVxuICAgICAgaWYgKGVyckNvZGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEZTLkVycm5vRXJyb3IoZXJyQ29kZSlcbiAgICAgIH1cbiAgICAgIEZTLmN1cnJlbnRQYXRoID0gbG9va3VwLnBhdGhcbiAgICB9LFxuICAgIGNyZWF0ZURlZmF1bHREaXJlY3RvcmllczogKCkgPT4ge1xuICAgICAgRlMubWtkaXIoJy90bXAnKVxuICAgICAgRlMubWtkaXIoJy9ob21lJylcbiAgICAgIEZTLm1rZGlyKCcvaG9tZS93ZWJfdXNlcicpXG4gICAgfSxcbiAgICBjcmVhdGVEZWZhdWx0RGV2aWNlczogKCkgPT4ge1xuICAgICAgLy8gY3JlYXRlIC9kZXZcbiAgICAgIEZTLm1rZGlyKCcvZGV2JylcbiAgICAgIC8vIHNldHVwIC9kZXYvbnVsbFxuICAgICAgRlMucmVnaXN0ZXJEZXZpY2UoRlMubWFrZWRldigxLCAzKSwge1xuICAgICAgICByZWFkOiAoKSA9PiAwLFxuICAgICAgICB3cml0ZTogKHN0cmVhbSwgYnVmZmVyLCBvZmZzZXQsIGxlbmd0aCwgcG9zKSA9PiBsZW5ndGhcbiAgICAgIH0pXG4gICAgICBGUy5ta2RldignL2Rldi9udWxsJywgRlMubWFrZWRldigxLCAzKSlcbiAgICAgIC8vIHNldHVwIC9kZXYvdHR5IGFuZCAvZGV2L3R0eTFcbiAgICAgIC8vIHN0ZGVyciBuZWVkcyB0byBwcmludCBvdXRwdXQgdXNpbmcgZXJyKCkgcmF0aGVyIHRoYW4gb3V0KClcbiAgICAgIC8vIHNvIHdlIHJlZ2lzdGVyIGEgc2Vjb25kIHR0eSBqdXN0IGZvciBpdC5cbiAgICAgIFRUWS5yZWdpc3RlcihGUy5tYWtlZGV2KDUsIDApLCBUVFkuZGVmYXVsdF90dHlfb3BzKVxuICAgICAgVFRZLnJlZ2lzdGVyKEZTLm1ha2VkZXYoNiwgMCksIFRUWS5kZWZhdWx0X3R0eTFfb3BzKVxuICAgICAgRlMubWtkZXYoJy9kZXYvdHR5JywgRlMubWFrZWRldig1LCAwKSlcbiAgICAgIEZTLm1rZGV2KCcvZGV2L3R0eTEnLCBGUy5tYWtlZGV2KDYsIDApKVxuICAgICAgLy8gc2V0dXAgL2Rldi9bdV1yYW5kb21cbiAgICAgIHZhciByYW5kb21fZGV2aWNlID0gZ2V0UmFuZG9tRGV2aWNlKClcbiAgICAgIEZTLmNyZWF0ZURldmljZSgnL2RldicsICdyYW5kb20nLCByYW5kb21fZGV2aWNlKVxuICAgICAgRlMuY3JlYXRlRGV2aWNlKCcvZGV2JywgJ3VyYW5kb20nLCByYW5kb21fZGV2aWNlKVxuICAgICAgLy8gd2UncmUgbm90IGdvaW5nIHRvIGVtdWxhdGUgdGhlIGFjdHVhbCBzaG0gZGV2aWNlLFxuICAgICAgLy8ganVzdCBjcmVhdGUgdGhlIHRtcCBkaXJzIHRoYXQgcmVzaWRlIGluIGl0IGNvbW1vbmx5XG4gICAgICBGUy5ta2RpcignL2Rldi9zaG0nKVxuICAgICAgRlMubWtkaXIoJy9kZXYvc2htL3RtcCcpXG4gICAgfSxcbiAgICBjcmVhdGVTcGVjaWFsRGlyZWN0b3JpZXM6ICgpID0+IHtcbiAgICAgIC8vIGNyZWF0ZSAvcHJvYy9zZWxmL2ZkIHdoaWNoIGFsbG93cyAvcHJvYy9zZWxmL2ZkLzYgPT4gcmVhZGxpbmsgZ2l2ZXMgdGhlXG4gICAgICAvLyBuYW1lIG9mIHRoZSBzdHJlYW0gZm9yIGZkIDYgKHNlZSB0ZXN0X3VuaXN0ZF90dHluYW1lKVxuICAgICAgRlMubWtkaXIoJy9wcm9jJylcbiAgICAgIHZhciBwcm9jX3NlbGYgPSBGUy5ta2RpcignL3Byb2Mvc2VsZicpXG4gICAgICBGUy5ta2RpcignL3Byb2Mvc2VsZi9mZCcpXG4gICAgICBGUy5tb3VudChcbiAgICAgICAge1xuICAgICAgICAgIG1vdW50OiAoKSA9PiB7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IEZTLmNyZWF0ZU5vZGUoXG4gICAgICAgICAgICAgIHByb2Nfc2VsZixcbiAgICAgICAgICAgICAgJ2ZkJyxcbiAgICAgICAgICAgICAgMTYzODQgfCA1MTEgLyogMDc3NyAqLyxcbiAgICAgICAgICAgICAgNzNcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIG5vZGUubm9kZV9vcHMgPSB7XG4gICAgICAgICAgICAgIGxvb2t1cDogKHBhcmVudCwgbmFtZSkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBmZCA9ICtuYW1lXG4gICAgICAgICAgICAgICAgdmFyIHN0cmVhbSA9IEZTLmdldFN0cmVhbShmZClcbiAgICAgICAgICAgICAgICBpZiAoIXN0cmVhbSkgdGhyb3cgbmV3IEZTLkVycm5vRXJyb3IoOClcbiAgICAgICAgICAgICAgICB2YXIgcmV0ID0ge1xuICAgICAgICAgICAgICAgICAgcGFyZW50OiBudWxsLFxuICAgICAgICAgICAgICAgICAgbW91bnQ6IHsgbW91bnRwb2ludDogJ2Zha2UnIH0sXG4gICAgICAgICAgICAgICAgICBub2RlX29wczogeyByZWFkbGluazogKCkgPT4gc3RyZWFtLnBhdGggfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXQucGFyZW50ID0gcmV0IC8vIG1ha2UgaXQgbG9vayBsaWtlIGEgc2ltcGxlIHJvb3Qgbm9kZVxuICAgICAgICAgICAgICAgIHJldHVybiByZXRcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHt9LFxuICAgICAgICAnL3Byb2Mvc2VsZi9mZCdcbiAgICAgIClcbiAgICB9LFxuICAgIGNyZWF0ZVN0YW5kYXJkU3RyZWFtczogKCkgPT4ge1xuICAgICAgLy8gVE9ETyBkZXByZWNhdGUgdGhlIG9sZCBmdW5jdGlvbmFsaXR5IG9mIGEgc2luZ2xlXG4gICAgICAvLyBpbnB1dCAvIG91dHB1dCBjYWxsYmFjayBhbmQgdGhhdCB1dGlsaXplcyBGUy5jcmVhdGVEZXZpY2VcbiAgICAgIC8vIGFuZCBpbnN0ZWFkIHJlcXVpcmUgYSB1bmlxdWUgc2V0IG9mIHN0cmVhbSBvcHNcblxuICAgICAgLy8gYnkgZGVmYXVsdCwgd2Ugc3ltbGluayB0aGUgc3RhbmRhcmQgc3RyZWFtcyB0byB0aGVcbiAgICAgIC8vIGRlZmF1bHQgdHR5IGRldmljZXMuIGhvd2V2ZXIsIGlmIHRoZSBzdGFuZGFyZCBzdHJlYW1zXG4gICAgICAvLyBoYXZlIGJlZW4gb3ZlcndyaXR0ZW4gd2UgY3JlYXRlIGEgdW5pcXVlIGRldmljZSBmb3JcbiAgICAgIC8vIHRoZW0gaW5zdGVhZC5cbiAgICAgIGlmIChNb2R1bGVbJ3N0ZGluJ10pIHtcbiAgICAgICAgRlMuY3JlYXRlRGV2aWNlKCcvZGV2JywgJ3N0ZGluJywgTW9kdWxlWydzdGRpbiddKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgRlMuc3ltbGluaygnL2Rldi90dHknLCAnL2Rldi9zdGRpbicpXG4gICAgICB9XG4gICAgICBpZiAoTW9kdWxlWydzdGRvdXQnXSkge1xuICAgICAgICBGUy5jcmVhdGVEZXZpY2UoJy9kZXYnLCAnc3Rkb3V0JywgbnVsbCwgTW9kdWxlWydzdGRvdXQnXSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIEZTLnN5bWxpbmsoJy9kZXYvdHR5JywgJy9kZXYvc3Rkb3V0JylcbiAgICAgIH1cbiAgICAgIGlmIChNb2R1bGVbJ3N0ZGVyciddKSB7XG4gICAgICAgIEZTLmNyZWF0ZURldmljZSgnL2RldicsICdzdGRlcnInLCBudWxsLCBNb2R1bGVbJ3N0ZGVyciddKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgRlMuc3ltbGluaygnL2Rldi90dHkxJywgJy9kZXYvc3RkZXJyJylcbiAgICAgIH1cblxuICAgICAgLy8gb3BlbiBkZWZhdWx0IHN0cmVhbXMgZm9yIHRoZSBzdGRpbiwgc3Rkb3V0IGFuZCBzdGRlcnIgZGV2aWNlc1xuICAgICAgdmFyIHN0ZGluID0gRlMub3BlbignL2Rldi9zdGRpbicsIDApXG4gICAgICB2YXIgc3Rkb3V0ID0gRlMub3BlbignL2Rldi9zdGRvdXQnLCAxKVxuICAgICAgdmFyIHN0ZGVyciA9IEZTLm9wZW4oJy9kZXYvc3RkZXJyJywgMSlcbiAgICAgIGFzc2VydChzdGRpbi5mZCA9PT0gMCwgJ2ludmFsaWQgaGFuZGxlIGZvciBzdGRpbiAoJyArIHN0ZGluLmZkICsgJyknKVxuICAgICAgYXNzZXJ0KHN0ZG91dC5mZCA9PT0gMSwgJ2ludmFsaWQgaGFuZGxlIGZvciBzdGRvdXQgKCcgKyBzdGRvdXQuZmQgKyAnKScpXG4gICAgICBhc3NlcnQoc3RkZXJyLmZkID09PSAyLCAnaW52YWxpZCBoYW5kbGUgZm9yIHN0ZGVyciAoJyArIHN0ZGVyci5mZCArICcpJylcbiAgICB9LFxuICAgIGVuc3VyZUVycm5vRXJyb3I6ICgpID0+IHtcbiAgICAgIGlmIChGUy5FcnJub0Vycm9yKSByZXR1cm5cbiAgICAgIEZTLkVycm5vRXJyb3IgPSAvKiogQHRoaXN7T2JqZWN0fSAqLyBmdW5jdGlvbiBFcnJub0Vycm9yKGVycm5vLCBub2RlKSB7XG4gICAgICAgIHRoaXMubm9kZSA9IG5vZGVcbiAgICAgICAgdGhpcy5zZXRFcnJubyA9IC8qKiBAdGhpc3tPYmplY3R9ICovIGZ1bmN0aW9uIChlcnJubykge1xuICAgICAgICAgIHRoaXMuZXJybm8gPSBlcnJub1xuICAgICAgICAgIGZvciAodmFyIGtleSBpbiBFUlJOT19DT0RFUykge1xuICAgICAgICAgICAgaWYgKEVSUk5PX0NPREVTW2tleV0gPT09IGVycm5vKSB7XG4gICAgICAgICAgICAgIHRoaXMuY29kZSA9IGtleVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldEVycm5vKGVycm5vKVxuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBFUlJOT19NRVNTQUdFU1tlcnJub11cblxuICAgICAgICAvLyBUcnkgdG8gZ2V0IGEgbWF4aW1hbGx5IGhlbHBmdWwgc3RhY2sgdHJhY2UuIE9uIE5vZGUuanMsIGdldHRpbmcgRXJyb3Iuc3RhY2tcbiAgICAgICAgLy8gbm93IGVuc3VyZXMgaXQgc2hvd3Mgd2hhdCB3ZSB3YW50LlxuICAgICAgICBpZiAodGhpcy5zdGFjaykge1xuICAgICAgICAgIC8vIERlZmluZSB0aGUgc3RhY2sgcHJvcGVydHkgZm9yIE5vZGUuanMgNCwgd2hpY2ggb3RoZXJ3aXNlIGVycm9ycyBvbiB0aGUgbmV4dCBsaW5lLlxuICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnc3RhY2snLCB7XG4gICAgICAgICAgICB2YWx1ZTogbmV3IEVycm9yKCkuc3RhY2ssXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgICAgICAgIH0pXG4gICAgICAgICAgdGhpcy5zdGFjayA9IGRlbWFuZ2xlQWxsKHRoaXMuc3RhY2spXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIEZTLkVycm5vRXJyb3IucHJvdG90eXBlID0gbmV3IEVycm9yKClcbiAgICAgIEZTLkVycm5vRXJyb3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRlMuRXJybm9FcnJvclxuICAgICAgLy8gU29tZSBlcnJvcnMgbWF5IGhhcHBlbiBxdWl0ZSBhIGJpdCwgdG8gYXZvaWQgb3ZlcmhlYWQgd2UgcmV1c2UgdGhlbSAoYW5kIHN1ZmZlciBhIGxhY2sgb2Ygc3RhY2sgaW5mbylcbiAgICAgIDtbNDRdLmZvckVhY2goKGNvZGUpID0+IHtcbiAgICAgICAgRlMuZ2VuZXJpY0Vycm9yc1tjb2RlXSA9IG5ldyBGUy5FcnJub0Vycm9yKGNvZGUpXG4gICAgICAgIEZTLmdlbmVyaWNFcnJvcnNbY29kZV0uc3RhY2sgPSAnPGdlbmVyaWMgZXJyb3IsIG5vIHN0YWNrPidcbiAgICAgIH0pXG4gICAgfSxcbiAgICBzdGF0aWNJbml0OiAoKSA9PiB7XG4gICAgICBGUy5lbnN1cmVFcnJub0Vycm9yKClcblxuICAgICAgRlMubmFtZVRhYmxlID0gbmV3IEFycmF5KDQwOTYpXG5cbiAgICAgIEZTLm1vdW50KE1FTUZTLCB7fSwgJy8nKVxuXG4gICAgICBGUy5jcmVhdGVEZWZhdWx0RGlyZWN0b3JpZXMoKVxuICAgICAgRlMuY3JlYXRlRGVmYXVsdERldmljZXMoKVxuICAgICAgRlMuY3JlYXRlU3BlY2lhbERpcmVjdG9yaWVzKClcblxuICAgICAgRlMuZmlsZXN5c3RlbXMgPSB7XG4gICAgICAgIE1FTUZTOiBNRU1GU1xuICAgICAgfVxuICAgIH0sXG4gICAgaW5pdDogKGlucHV0LCBvdXRwdXQsIGVycm9yKSA9PiB7XG4gICAgICBhc3NlcnQoXG4gICAgICAgICFGUy5pbml0LmluaXRpYWxpemVkLFxuICAgICAgICAnRlMuaW5pdCB3YXMgcHJldmlvdXNseSBjYWxsZWQuIElmIHlvdSB3YW50IHRvIGluaXRpYWxpemUgbGF0ZXIgd2l0aCBjdXN0b20gcGFyYW1ldGVycywgcmVtb3ZlIGFueSBlYXJsaWVyIGNhbGxzIChub3RlIHRoYXQgb25lIGlzIGF1dG9tYXRpY2FsbHkgYWRkZWQgdG8gdGhlIGdlbmVyYXRlZCBjb2RlKSdcbiAgICAgIClcbiAgICAgIEZTLmluaXQuaW5pdGlhbGl6ZWQgPSB0cnVlXG5cbiAgICAgIEZTLmVuc3VyZUVycm5vRXJyb3IoKVxuXG4gICAgICAvLyBBbGxvdyBNb2R1bGUuc3RkaW4gZXRjLiB0byBwcm92aWRlIGRlZmF1bHRzLCBpZiBub25lIGV4cGxpY2l0bHkgcGFzc2VkIHRvIHVzIGhlcmVcbiAgICAgIE1vZHVsZVsnc3RkaW4nXSA9IGlucHV0IHx8IE1vZHVsZVsnc3RkaW4nXVxuICAgICAgTW9kdWxlWydzdGRvdXQnXSA9IG91dHB1dCB8fCBNb2R1bGVbJ3N0ZG91dCddXG4gICAgICBNb2R1bGVbJ3N0ZGVyciddID0gZXJyb3IgfHwgTW9kdWxlWydzdGRlcnInXVxuXG4gICAgICBGUy5jcmVhdGVTdGFuZGFyZFN0cmVhbXMoKVxuICAgIH0sXG4gICAgcXVpdDogKCkgPT4ge1xuICAgICAgRlMuaW5pdC5pbml0aWFsaXplZCA9IGZhbHNlXG4gICAgICAvLyBmb3JjZS1mbHVzaCBhbGwgc3RyZWFtcywgc28gd2UgZ2V0IG11c2wgc3RkIHN0cmVhbXMgcHJpbnRlZCBvdXRcbiAgICAgIF9mZmx1c2goMClcbiAgICAgIC8vIGNsb3NlIGFsbCBvZiBvdXIgc3RyZWFtc1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBGUy5zdHJlYW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBzdHJlYW0gPSBGUy5zdHJlYW1zW2ldXG4gICAgICAgIGlmICghc3RyZWFtKSB7XG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuICAgICAgICBGUy5jbG9zZShzdHJlYW0pXG4gICAgICB9XG4gICAgfSxcbiAgICBnZXRNb2RlOiAoY2FuUmVhZCwgY2FuV3JpdGUpID0+IHtcbiAgICAgIHZhciBtb2RlID0gMFxuICAgICAgaWYgKGNhblJlYWQpIG1vZGUgfD0gMjkyIHwgNzNcbiAgICAgIGlmIChjYW5Xcml0ZSkgbW9kZSB8PSAxNDZcbiAgICAgIHJldHVybiBtb2RlXG4gICAgfSxcbiAgICBmaW5kT2JqZWN0OiAocGF0aCwgZG9udFJlc29sdmVMYXN0TGluaykgPT4ge1xuICAgICAgdmFyIHJldCA9IEZTLmFuYWx5emVQYXRoKHBhdGgsIGRvbnRSZXNvbHZlTGFzdExpbmspXG4gICAgICBpZiAoIXJldC5leGlzdHMpIHtcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXQub2JqZWN0XG4gICAgfSxcbiAgICBhbmFseXplUGF0aDogKHBhdGgsIGRvbnRSZXNvbHZlTGFzdExpbmspID0+IHtcbiAgICAgIC8vIG9wZXJhdGUgZnJvbSB3aXRoaW4gdGhlIGNvbnRleHQgb2YgdGhlIHN5bWxpbmsncyB0YXJnZXRcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciBsb29rdXAgPSBGUy5sb29rdXBQYXRoKHBhdGgsIHsgZm9sbG93OiAhZG9udFJlc29sdmVMYXN0TGluayB9KVxuICAgICAgICBwYXRoID0gbG9va3VwLnBhdGhcbiAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICB2YXIgcmV0ID0ge1xuICAgICAgICBpc1Jvb3Q6IGZhbHNlLFxuICAgICAgICBleGlzdHM6IGZhbHNlLFxuICAgICAgICBlcnJvcjogMCxcbiAgICAgICAgbmFtZTogbnVsbCxcbiAgICAgICAgcGF0aDogbnVsbCxcbiAgICAgICAgb2JqZWN0OiBudWxsLFxuICAgICAgICBwYXJlbnRFeGlzdHM6IGZhbHNlLFxuICAgICAgICBwYXJlbnRQYXRoOiBudWxsLFxuICAgICAgICBwYXJlbnRPYmplY3Q6IG51bGxcbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciBsb29rdXAgPSBGUy5sb29rdXBQYXRoKHBhdGgsIHsgcGFyZW50OiB0cnVlIH0pXG4gICAgICAgIHJldC5wYXJlbnRFeGlzdHMgPSB0cnVlXG4gICAgICAgIHJldC5wYXJlbnRQYXRoID0gbG9va3VwLnBhdGhcbiAgICAgICAgcmV0LnBhcmVudE9iamVjdCA9IGxvb2t1cC5ub2RlXG4gICAgICAgIHJldC5uYW1lID0gUEFUSC5iYXNlbmFtZShwYXRoKVxuICAgICAgICBsb29rdXAgPSBGUy5sb29rdXBQYXRoKHBhdGgsIHsgZm9sbG93OiAhZG9udFJlc29sdmVMYXN0TGluayB9KVxuICAgICAgICByZXQuZXhpc3RzID0gdHJ1ZVxuICAgICAgICByZXQucGF0aCA9IGxvb2t1cC5wYXRoXG4gICAgICAgIHJldC5vYmplY3QgPSBsb29rdXAubm9kZVxuICAgICAgICByZXQubmFtZSA9IGxvb2t1cC5ub2RlLm5hbWVcbiAgICAgICAgcmV0LmlzUm9vdCA9IGxvb2t1cC5wYXRoID09PSAnLydcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0LmVycm9yID0gZS5lcnJub1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJldFxuICAgIH0sXG4gICAgY3JlYXRlUGF0aDogKHBhcmVudCwgcGF0aCwgY2FuUmVhZCwgY2FuV3JpdGUpID0+IHtcbiAgICAgIHBhcmVudCA9IHR5cGVvZiBwYXJlbnQgPT0gJ3N0cmluZycgPyBwYXJlbnQgOiBGUy5nZXRQYXRoKHBhcmVudClcbiAgICAgIHZhciBwYXJ0cyA9IHBhdGguc3BsaXQoJy8nKS5yZXZlcnNlKClcbiAgICAgIHdoaWxlIChwYXJ0cy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIHBhcnQgPSBwYXJ0cy5wb3AoKVxuICAgICAgICBpZiAoIXBhcnQpIGNvbnRpbnVlXG4gICAgICAgIHZhciBjdXJyZW50ID0gUEFUSC5qb2luMihwYXJlbnQsIHBhcnQpXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgRlMubWtkaXIoY3VycmVudClcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGlnbm9yZSBFRVhJU1RcbiAgICAgICAgfVxuICAgICAgICBwYXJlbnQgPSBjdXJyZW50XG4gICAgICB9XG4gICAgICByZXR1cm4gY3VycmVudFxuICAgIH0sXG4gICAgY3JlYXRlRmlsZTogKHBhcmVudCwgbmFtZSwgcHJvcGVydGllcywgY2FuUmVhZCwgY2FuV3JpdGUpID0+IHtcbiAgICAgIHZhciBwYXRoID0gUEFUSC5qb2luMihcbiAgICAgICAgdHlwZW9mIHBhcmVudCA9PSAnc3RyaW5nJyA/IHBhcmVudCA6IEZTLmdldFBhdGgocGFyZW50KSxcbiAgICAgICAgbmFtZVxuICAgICAgKVxuICAgICAgdmFyIG1vZGUgPSBGUy5nZXRNb2RlKGNhblJlYWQsIGNhbldyaXRlKVxuICAgICAgcmV0dXJuIEZTLmNyZWF0ZShwYXRoLCBtb2RlKVxuICAgIH0sXG4gICAgY3JlYXRlRGF0YUZpbGU6IChwYXJlbnQsIG5hbWUsIGRhdGEsIGNhblJlYWQsIGNhbldyaXRlLCBjYW5Pd24pID0+IHtcbiAgICAgIHZhciBwYXRoID0gbmFtZVxuICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICBwYXJlbnQgPSB0eXBlb2YgcGFyZW50ID09ICdzdHJpbmcnID8gcGFyZW50IDogRlMuZ2V0UGF0aChwYXJlbnQpXG4gICAgICAgIHBhdGggPSBuYW1lID8gUEFUSC5qb2luMihwYXJlbnQsIG5hbWUpIDogcGFyZW50XG4gICAgICB9XG4gICAgICB2YXIgbW9kZSA9IEZTLmdldE1vZGUoY2FuUmVhZCwgY2FuV3JpdGUpXG4gICAgICB2YXIgbm9kZSA9IEZTLmNyZWF0ZShwYXRoLCBtb2RlKVxuICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgdmFyIGFyciA9IG5ldyBBcnJheShkYXRhLmxlbmd0aClcbiAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gZGF0YS5sZW5ndGg7IGkgPCBsZW47ICsraSlcbiAgICAgICAgICAgIGFycltpXSA9IGRhdGEuY2hhckNvZGVBdChpKVxuICAgICAgICAgIGRhdGEgPSBhcnJcbiAgICAgICAgfVxuICAgICAgICAvLyBtYWtlIHN1cmUgd2UgY2FuIHdyaXRlIHRvIHRoZSBmaWxlXG4gICAgICAgIEZTLmNobW9kKG5vZGUsIG1vZGUgfCAxNDYpXG4gICAgICAgIHZhciBzdHJlYW0gPSBGUy5vcGVuKG5vZGUsIDU3NylcbiAgICAgICAgRlMud3JpdGUoc3RyZWFtLCBkYXRhLCAwLCBkYXRhLmxlbmd0aCwgMCwgY2FuT3duKVxuICAgICAgICBGUy5jbG9zZShzdHJlYW0pXG4gICAgICAgIEZTLmNobW9kKG5vZGUsIG1vZGUpXG4gICAgICB9XG4gICAgICByZXR1cm4gbm9kZVxuICAgIH0sXG4gICAgY3JlYXRlRGV2aWNlOiAocGFyZW50LCBuYW1lLCBpbnB1dCwgb3V0cHV0KSA9PiB7XG4gICAgICB2YXIgcGF0aCA9IFBBVEguam9pbjIoXG4gICAgICAgIHR5cGVvZiBwYXJlbnQgPT0gJ3N0cmluZycgPyBwYXJlbnQgOiBGUy5nZXRQYXRoKHBhcmVudCksXG4gICAgICAgIG5hbWVcbiAgICAgIClcbiAgICAgIHZhciBtb2RlID0gRlMuZ2V0TW9kZSghIWlucHV0LCAhIW91dHB1dClcbiAgICAgIGlmICghRlMuY3JlYXRlRGV2aWNlLm1ham9yKSBGUy5jcmVhdGVEZXZpY2UubWFqb3IgPSA2NFxuICAgICAgdmFyIGRldiA9IEZTLm1ha2VkZXYoRlMuY3JlYXRlRGV2aWNlLm1ham9yKyssIDApXG4gICAgICAvLyBDcmVhdGUgYSBmYWtlIGRldmljZSB0aGF0IGEgc2V0IG9mIHN0cmVhbSBvcHMgdG8gZW11bGF0ZVxuICAgICAgLy8gdGhlIG9sZCBiZWhhdmlvci5cbiAgICAgIEZTLnJlZ2lzdGVyRGV2aWNlKGRldiwge1xuICAgICAgICBvcGVuOiAoc3RyZWFtKSA9PiB7XG4gICAgICAgICAgc3RyZWFtLnNlZWthYmxlID0gZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAgY2xvc2U6IChzdHJlYW0pID0+IHtcbiAgICAgICAgICAvLyBmbHVzaCBhbnkgcGVuZGluZyBsaW5lIGRhdGFcbiAgICAgICAgICBpZiAob3V0cHV0ICYmIG91dHB1dC5idWZmZXIgJiYgb3V0cHV0LmJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgICAgICAgIG91dHB1dCgxMClcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHJlYWQ6IChzdHJlYW0sIGJ1ZmZlciwgb2Zmc2V0LCBsZW5ndGgsIHBvcyAvKiBpZ25vcmVkICovKSA9PiB7XG4gICAgICAgICAgdmFyIGJ5dGVzUmVhZCA9IDBcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICByZXN1bHQgPSBpbnB1dCgpXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBGUy5FcnJub0Vycm9yKDI5KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdW5kZWZpbmVkICYmIGJ5dGVzUmVhZCA9PT0gMCkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRlMuRXJybm9FcnJvcig2KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCB8fCByZXN1bHQgPT09IHVuZGVmaW5lZCkgYnJlYWtcbiAgICAgICAgICAgIGJ5dGVzUmVhZCsrXG4gICAgICAgICAgICBidWZmZXJbb2Zmc2V0ICsgaV0gPSByZXN1bHRcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGJ5dGVzUmVhZCkge1xuICAgICAgICAgICAgc3RyZWFtLm5vZGUudGltZXN0YW1wID0gRGF0ZS5ub3coKVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gYnl0ZXNSZWFkXG4gICAgICAgIH0sXG4gICAgICAgIHdyaXRlOiAoc3RyZWFtLCBidWZmZXIsIG9mZnNldCwgbGVuZ3RoLCBwb3MpID0+IHtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBvdXRwdXQoYnVmZmVyW29mZnNldCArIGldKVxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRlMuRXJybm9FcnJvcigyOSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGxlbmd0aCkge1xuICAgICAgICAgICAgc3RyZWFtLm5vZGUudGltZXN0YW1wID0gRGF0ZS5ub3coKVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gaVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgcmV0dXJuIEZTLm1rZGV2KHBhdGgsIG1vZGUsIGRldilcbiAgICB9LFxuICAgIGZvcmNlTG9hZEZpbGU6IChvYmopID0+IHtcbiAgICAgIGlmIChvYmouaXNEZXZpY2UgfHwgb2JqLmlzRm9sZGVyIHx8IG9iai5saW5rIHx8IG9iai5jb250ZW50cykgcmV0dXJuIHRydWVcbiAgICAgIGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdMYXp5IGxvYWRpbmcgc2hvdWxkIGhhdmUgYmVlbiBwZXJmb3JtZWQgKGNvbnRlbnRzIHNldCkgaW4gY3JlYXRlTGF6eUZpbGUsIGJ1dCBpdCB3YXMgbm90LiBMYXp5IGxvYWRpbmcgb25seSB3b3JrcyBpbiB3ZWIgd29ya2Vycy4gVXNlIC0tZW1iZWQtZmlsZSBvciAtLXByZWxvYWQtZmlsZSBpbiBlbWNjIG9uIHRoZSBtYWluIHRocmVhZC4nXG4gICAgICAgIClcbiAgICAgIH0gZWxzZSBpZiAocmVhZF8pIHtcbiAgICAgICAgLy8gQ29tbWFuZC1saW5lLlxuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIFdBUk5JTkc6IENhbid0IHJlYWQgYmluYXJ5IGZpbGVzIGluIFY4J3MgZDggb3IgdHJhY2Vtb25rZXkncyBqcywgYXNcbiAgICAgICAgICAvLyAgICAgICAgICByZWFkKCkgd2lsbCB0cnkgdG8gcGFyc2UgVVRGOC5cbiAgICAgICAgICBvYmouY29udGVudHMgPSBpbnRBcnJheUZyb21TdHJpbmcocmVhZF8ob2JqLnVybCksIHRydWUpXG4gICAgICAgICAgb2JqLnVzZWRCeXRlcyA9IG9iai5jb250ZW50cy5sZW5ndGhcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHRocm93IG5ldyBGUy5FcnJub0Vycm9yKDI5KVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBsb2FkIHdpdGhvdXQgcmVhZCgpIG9yIFhNTEh0dHBSZXF1ZXN0LicpXG4gICAgICB9XG4gICAgfSxcbiAgICBjcmVhdGVMYXp5RmlsZTogKHBhcmVudCwgbmFtZSwgdXJsLCBjYW5SZWFkLCBjYW5Xcml0ZSkgPT4ge1xuICAgICAgLy8gTGF6eSBjaHVua2VkIFVpbnQ4QXJyYXkgKGltcGxlbWVudHMgZ2V0IGFuZCBsZW5ndGggZnJvbSBVaW50OEFycmF5KS4gQWN0dWFsIGdldHRpbmcgaXMgYWJzdHJhY3RlZCBhd2F5IGZvciBldmVudHVhbCByZXVzZS5cbiAgICAgIC8qKiBAY29uc3RydWN0b3IgKi9cbiAgICAgIGZ1bmN0aW9uIExhenlVaW50OEFycmF5KCkge1xuICAgICAgICB0aGlzLmxlbmd0aEtub3duID0gZmFsc2VcbiAgICAgICAgdGhpcy5jaHVua3MgPSBbXSAvLyBMb2FkZWQgY2h1bmtzLiBJbmRleCBpcyB0aGUgY2h1bmsgbnVtYmVyXG4gICAgICB9XG4gICAgICBMYXp5VWludDhBcnJheS5wcm90b3R5cGUuZ2V0ID1cbiAgICAgICAgLyoqIEB0aGlze09iamVjdH0gKi8gZnVuY3Rpb24gTGF6eVVpbnQ4QXJyYXlfZ2V0KGlkeCkge1xuICAgICAgICAgIGlmIChpZHggPiB0aGlzLmxlbmd0aCAtIDEgfHwgaWR4IDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgY2h1bmtPZmZzZXQgPSBpZHggJSB0aGlzLmNodW5rU2l6ZVxuICAgICAgICAgIHZhciBjaHVua051bSA9IChpZHggLyB0aGlzLmNodW5rU2l6ZSkgfCAwXG4gICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0dGVyKGNodW5rTnVtKVtjaHVua09mZnNldF1cbiAgICAgICAgfVxuICAgICAgTGF6eVVpbnQ4QXJyYXkucHJvdG90eXBlLnNldERhdGFHZXR0ZXIgPVxuICAgICAgICBmdW5jdGlvbiBMYXp5VWludDhBcnJheV9zZXREYXRhR2V0dGVyKGdldHRlcikge1xuICAgICAgICAgIHRoaXMuZ2V0dGVyID0gZ2V0dGVyXG4gICAgICAgIH1cbiAgICAgIExhenlVaW50OEFycmF5LnByb3RvdHlwZS5jYWNoZUxlbmd0aCA9XG4gICAgICAgIGZ1bmN0aW9uIExhenlVaW50OEFycmF5X2NhY2hlTGVuZ3RoKCkge1xuICAgICAgICAgIC8vIEZpbmQgbGVuZ3RoXG4gICAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG4gICAgICAgICAgeGhyLm9wZW4oJ0hFQUQnLCB1cmwsIGZhbHNlKVxuICAgICAgICAgIHhoci5zZW5kKG51bGwpXG4gICAgICAgICAgaWYgKCEoKHhoci5zdGF0dXMgPj0gMjAwICYmIHhoci5zdGF0dXMgPCAzMDApIHx8IHhoci5zdGF0dXMgPT09IDMwNCkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBsb2FkIFwiICsgdXJsICsgJy4gU3RhdHVzOiAnICsgeGhyLnN0YXR1cylcbiAgICAgICAgICB2YXIgZGF0YWxlbmd0aCA9IE51bWJlcih4aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ0NvbnRlbnQtbGVuZ3RoJykpXG4gICAgICAgICAgdmFyIGhlYWRlclxuICAgICAgICAgIHZhciBoYXNCeXRlU2VydmluZyA9XG4gICAgICAgICAgICAoaGVhZGVyID0geGhyLmdldFJlc3BvbnNlSGVhZGVyKCdBY2NlcHQtUmFuZ2VzJykpICYmXG4gICAgICAgICAgICBoZWFkZXIgPT09ICdieXRlcydcbiAgICAgICAgICB2YXIgdXNlc0d6aXAgPVxuICAgICAgICAgICAgKGhlYWRlciA9IHhoci5nZXRSZXNwb25zZUhlYWRlcignQ29udGVudC1FbmNvZGluZycpKSAmJlxuICAgICAgICAgICAgaGVhZGVyID09PSAnZ3ppcCdcblxuICAgICAgICAgIHZhciBjaHVua1NpemUgPSAxMDI0ICogMTAyNCAvLyBDaHVuayBzaXplIGluIGJ5dGVzXG5cbiAgICAgICAgICBpZiAoIWhhc0J5dGVTZXJ2aW5nKSBjaHVua1NpemUgPSBkYXRhbGVuZ3RoXG5cbiAgICAgICAgICAvLyBGdW5jdGlvbiB0byBnZXQgYSByYW5nZSBmcm9tIHRoZSByZW1vdGUgVVJMLlxuICAgICAgICAgIHZhciBkb1hIUiA9IChmcm9tLCB0bykgPT4ge1xuICAgICAgICAgICAgaWYgKGZyb20gPiB0bylcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgICdpbnZhbGlkIHJhbmdlICgnICtcbiAgICAgICAgICAgICAgICAgIGZyb20gK1xuICAgICAgICAgICAgICAgICAgJywgJyArXG4gICAgICAgICAgICAgICAgICB0byArXG4gICAgICAgICAgICAgICAgICAnKSBvciBubyBieXRlcyByZXF1ZXN0ZWQhJ1xuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBpZiAodG8gPiBkYXRhbGVuZ3RoIC0gMSlcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgICdvbmx5ICcgKyBkYXRhbGVuZ3RoICsgJyBieXRlcyBhdmFpbGFibGUhIHByb2dyYW1tZXIgZXJyb3IhJ1xuICAgICAgICAgICAgICApXG5cbiAgICAgICAgICAgIC8vIFRPRE86IFVzZSBtb3pSZXNwb25zZUFycmF5QnVmZmVyLCByZXNwb25zZVN0cmVhbSwgZXRjLiBpZiBhdmFpbGFibGUuXG4gICAgICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcbiAgICAgICAgICAgIHhoci5vcGVuKCdHRVQnLCB1cmwsIGZhbHNlKVxuICAgICAgICAgICAgaWYgKGRhdGFsZW5ndGggIT09IGNodW5rU2l6ZSlcbiAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ1JhbmdlJywgJ2J5dGVzPScgKyBmcm9tICsgJy0nICsgdG8pXG5cbiAgICAgICAgICAgIC8vIFNvbWUgaGludHMgdG8gdGhlIGJyb3dzZXIgdGhhdCB3ZSB3YW50IGJpbmFyeSBkYXRhLlxuICAgICAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdhcnJheWJ1ZmZlcidcbiAgICAgICAgICAgIGlmICh4aHIub3ZlcnJpZGVNaW1lVHlwZSkge1xuICAgICAgICAgICAgICB4aHIub3ZlcnJpZGVNaW1lVHlwZSgndGV4dC9wbGFpbjsgY2hhcnNldD14LXVzZXItZGVmaW5lZCcpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHhoci5zZW5kKG51bGwpXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICEoKHhoci5zdGF0dXMgPj0gMjAwICYmIHhoci5zdGF0dXMgPCAzMDApIHx8IHhoci5zdGF0dXMgPT09IDMwNClcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgIFwiQ291bGRuJ3QgbG9hZCBcIiArIHVybCArICcuIFN0YXR1czogJyArIHhoci5zdGF0dXNcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgaWYgKHhoci5yZXNwb25zZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShcbiAgICAgICAgICAgICAgICAvKiogQHR5cGV7QXJyYXk8bnVtYmVyPn0gKi8gKHhoci5yZXNwb25zZSB8fCBbXSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGludEFycmF5RnJvbVN0cmluZyh4aHIucmVzcG9uc2VUZXh0IHx8ICcnLCB0cnVlKVxuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgbGF6eUFycmF5ID0gdGhpc1xuICAgICAgICAgIGxhenlBcnJheS5zZXREYXRhR2V0dGVyKChjaHVua051bSkgPT4ge1xuICAgICAgICAgICAgdmFyIHN0YXJ0ID0gY2h1bmtOdW0gKiBjaHVua1NpemVcbiAgICAgICAgICAgIHZhciBlbmQgPSAoY2h1bmtOdW0gKyAxKSAqIGNodW5rU2l6ZSAtIDEgLy8gaW5jbHVkaW5nIHRoaXMgYnl0ZVxuICAgICAgICAgICAgZW5kID0gTWF0aC5taW4oZW5kLCBkYXRhbGVuZ3RoIC0gMSkgLy8gaWYgZGF0YWxlbmd0aC0xIGlzIHNlbGVjdGVkLCB0aGlzIGlzIHRoZSBsYXN0IGJsb2NrXG4gICAgICAgICAgICBpZiAodHlwZW9mIGxhenlBcnJheS5jaHVua3NbY2h1bmtOdW1dID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgIGxhenlBcnJheS5jaHVua3NbY2h1bmtOdW1dID0gZG9YSFIoc3RhcnQsIGVuZClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgbGF6eUFycmF5LmNodW5rc1tjaHVua051bV0gPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZG9YSFIgZmFpbGVkIScpXG4gICAgICAgICAgICByZXR1cm4gbGF6eUFycmF5LmNodW5rc1tjaHVua051bV1cbiAgICAgICAgICB9KVxuXG4gICAgICAgICAgaWYgKHVzZXNHemlwIHx8ICFkYXRhbGVuZ3RoKSB7XG4gICAgICAgICAgICAvLyBpZiB0aGUgc2VydmVyIHVzZXMgZ3ppcCBvciBkb2Vzbid0IHN1cHBseSB0aGUgbGVuZ3RoLCB3ZSBoYXZlIHRvIGRvd25sb2FkIHRoZSB3aG9sZSBmaWxlIHRvIGdldCB0aGUgKHVuY29tcHJlc3NlZCkgbGVuZ3RoXG4gICAgICAgICAgICBjaHVua1NpemUgPSBkYXRhbGVuZ3RoID0gMSAvLyB0aGlzIHdpbGwgZm9yY2UgZ2V0dGVyKDApL2RvWEhSIGRvIGRvd25sb2FkIHRoZSB3aG9sZSBmaWxlXG4gICAgICAgICAgICBkYXRhbGVuZ3RoID0gdGhpcy5nZXR0ZXIoMCkubGVuZ3RoXG4gICAgICAgICAgICBjaHVua1NpemUgPSBkYXRhbGVuZ3RoXG4gICAgICAgICAgICBvdXQoXG4gICAgICAgICAgICAgICdMYXp5RmlsZXMgb24gZ3ppcCBmb3JjZXMgZG93bmxvYWQgb2YgdGhlIHdob2xlIGZpbGUgd2hlbiBsZW5ndGggaXMgYWNjZXNzZWQnXG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5fbGVuZ3RoID0gZGF0YWxlbmd0aFxuICAgICAgICAgIHRoaXMuX2NodW5rU2l6ZSA9IGNodW5rU2l6ZVxuICAgICAgICAgIHRoaXMubGVuZ3RoS25vd24gPSB0cnVlXG4gICAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgaWYgKCFFTlZJUk9OTUVOVF9JU19XT1JLRVIpXG4gICAgICAgICAgdGhyb3cgJ0Nhbm5vdCBkbyBzeW5jaHJvbm91cyBiaW5hcnkgWEhScyBvdXRzaWRlIHdlYndvcmtlcnMgaW4gbW9kZXJuIGJyb3dzZXJzLiBVc2UgLS1lbWJlZC1maWxlIG9yIC0tcHJlbG9hZC1maWxlIGluIGVtY2MnXG4gICAgICAgIHZhciBsYXp5QXJyYXkgPSBuZXcgTGF6eVVpbnQ4QXJyYXkoKVxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhsYXp5QXJyYXksIHtcbiAgICAgICAgICBsZW5ndGg6IHtcbiAgICAgICAgICAgIGdldDogLyoqIEB0aGlze09iamVjdH0gKi8gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBpZiAoIXRoaXMubGVuZ3RoS25vd24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhY2hlTGVuZ3RoKClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbGVuZ3RoXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBjaHVua1NpemU6IHtcbiAgICAgICAgICAgIGdldDogLyoqIEB0aGlze09iamVjdH0gKi8gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBpZiAoIXRoaXMubGVuZ3RoS25vd24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhY2hlTGVuZ3RoKClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY2h1bmtTaXplXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIHZhciBwcm9wZXJ0aWVzID0geyBpc0RldmljZTogZmFsc2UsIGNvbnRlbnRzOiBsYXp5QXJyYXkgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHByb3BlcnRpZXMgPSB7IGlzRGV2aWNlOiBmYWxzZSwgdXJsOiB1cmwgfVxuICAgICAgfVxuXG4gICAgICB2YXIgbm9kZSA9IEZTLmNyZWF0ZUZpbGUocGFyZW50LCBuYW1lLCBwcm9wZXJ0aWVzLCBjYW5SZWFkLCBjYW5Xcml0ZSlcbiAgICAgIC8vIFRoaXMgaXMgYSB0b3RhbCBoYWNrLCBidXQgSSB3YW50IHRvIGdldCB0aGlzIGxhenkgZmlsZSBjb2RlIG91dCBvZiB0aGVcbiAgICAgIC8vIGNvcmUgb2YgTUVNRlMuIElmIHdlIHdhbnQgdG8ga2VlcCB0aGlzIGxhenkgZmlsZSBjb25jZXB0IEkgZmVlbCBpdCBzaG91bGRcbiAgICAgIC8vIGJlIGl0cyBvd24gdGhpbiBMQVpZRlMgcHJveHlpbmcgY2FsbHMgdG8gTUVNRlMuXG4gICAgICBpZiAocHJvcGVydGllcy5jb250ZW50cykge1xuICAgICAgICBub2RlLmNvbnRlbnRzID0gcHJvcGVydGllcy5jb250ZW50c1xuICAgICAgfSBlbHNlIGlmIChwcm9wZXJ0aWVzLnVybCkge1xuICAgICAgICBub2RlLmNvbnRlbnRzID0gbnVsbFxuICAgICAgICBub2RlLnVybCA9IHByb3BlcnRpZXMudXJsXG4gICAgICB9XG4gICAgICAvLyBBZGQgYSBmdW5jdGlvbiB0aGF0IGRlZmVycyBxdWVyeWluZyB0aGUgZmlsZSBzaXplIHVudGlsIGl0IGlzIGFza2VkIHRoZSBmaXJzdCB0aW1lLlxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMobm9kZSwge1xuICAgICAgICB1c2VkQnl0ZXM6IHtcbiAgICAgICAgICBnZXQ6IC8qKiBAdGhpcyB7RlNOb2RlfSAqLyBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50cy5sZW5ndGhcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAvLyBvdmVycmlkZSBlYWNoIHN0cmVhbSBvcCB3aXRoIG9uZSB0aGF0IHRyaWVzIHRvIGZvcmNlIGxvYWQgdGhlIGxhenkgZmlsZSBmaXJzdFxuICAgICAgdmFyIHN0cmVhbV9vcHMgPSB7fVxuICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhub2RlLnN0cmVhbV9vcHMpXG4gICAgICBrZXlzLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICB2YXIgZm4gPSBub2RlLnN0cmVhbV9vcHNba2V5XVxuICAgICAgICBzdHJlYW1fb3BzW2tleV0gPSBmdW5jdGlvbiBmb3JjZUxvYWRMYXp5RmlsZSgpIHtcbiAgICAgICAgICBGUy5mb3JjZUxvYWRGaWxlKG5vZGUpXG4gICAgICAgICAgcmV0dXJuIGZuLmFwcGx5KG51bGwsIGFyZ3VtZW50cylcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIGZ1bmN0aW9uIHdyaXRlQ2h1bmtzKHN0cmVhbSwgYnVmZmVyLCBvZmZzZXQsIGxlbmd0aCwgcG9zaXRpb24pIHtcbiAgICAgICAgdmFyIGNvbnRlbnRzID0gc3RyZWFtLm5vZGUuY29udGVudHNcbiAgICAgICAgaWYgKHBvc2l0aW9uID49IGNvbnRlbnRzLmxlbmd0aCkgcmV0dXJuIDBcbiAgICAgICAgdmFyIHNpemUgPSBNYXRoLm1pbihjb250ZW50cy5sZW5ndGggLSBwb3NpdGlvbiwgbGVuZ3RoKVxuICAgICAgICBhc3NlcnQoc2l6ZSA+PSAwKVxuICAgICAgICBpZiAoY29udGVudHMuc2xpY2UpIHtcbiAgICAgICAgICAvLyBub3JtYWwgYXJyYXlcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgICAgICAgICAgYnVmZmVyW29mZnNldCArIGldID0gY29udGVudHNbcG9zaXRpb24gKyBpXVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgICAgICAgICAgLy8gTGF6eVVpbnQ4QXJyYXkgZnJvbSBzeW5jIGJpbmFyeSBYSFJcbiAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQgKyBpXSA9IGNvbnRlbnRzLmdldChwb3NpdGlvbiArIGkpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzaXplXG4gICAgICB9XG4gICAgICAvLyB1c2UgYSBjdXN0b20gcmVhZCBmdW5jdGlvblxuICAgICAgc3RyZWFtX29wcy5yZWFkID0gKHN0cmVhbSwgYnVmZmVyLCBvZmZzZXQsIGxlbmd0aCwgcG9zaXRpb24pID0+IHtcbiAgICAgICAgRlMuZm9yY2VMb2FkRmlsZShub2RlKVxuICAgICAgICByZXR1cm4gd3JpdGVDaHVua3Moc3RyZWFtLCBidWZmZXIsIG9mZnNldCwgbGVuZ3RoLCBwb3NpdGlvbilcbiAgICAgIH1cbiAgICAgIC8vIHVzZSBhIGN1c3RvbSBtbWFwIGZ1bmN0aW9uXG4gICAgICBzdHJlYW1fb3BzLm1tYXAgPSAoc3RyZWFtLCBsZW5ndGgsIHBvc2l0aW9uLCBwcm90LCBmbGFncykgPT4ge1xuICAgICAgICBGUy5mb3JjZUxvYWRGaWxlKG5vZGUpXG4gICAgICAgIHZhciBwdHIgPSBtbWFwQWxsb2MobGVuZ3RoKVxuICAgICAgICBpZiAoIXB0cikge1xuICAgICAgICAgIHRocm93IG5ldyBGUy5FcnJub0Vycm9yKDQ4KVxuICAgICAgICB9XG4gICAgICAgIHdyaXRlQ2h1bmtzKHN0cmVhbSwgSEVBUDgsIHB0ciwgbGVuZ3RoLCBwb3NpdGlvbilcbiAgICAgICAgcmV0dXJuIHsgcHRyOiBwdHIsIGFsbG9jYXRlZDogdHJ1ZSB9XG4gICAgICB9XG4gICAgICBub2RlLnN0cmVhbV9vcHMgPSBzdHJlYW1fb3BzXG4gICAgICByZXR1cm4gbm9kZVxuICAgIH0sXG4gICAgY3JlYXRlUHJlbG9hZGVkRmlsZTogKFxuICAgICAgcGFyZW50LFxuICAgICAgbmFtZSxcbiAgICAgIHVybCxcbiAgICAgIGNhblJlYWQsXG4gICAgICBjYW5Xcml0ZSxcbiAgICAgIG9ubG9hZCxcbiAgICAgIG9uZXJyb3IsXG4gICAgICBkb250Q3JlYXRlRmlsZSxcbiAgICAgIGNhbk93bixcbiAgICAgIHByZUZpbmlzaFxuICAgICkgPT4ge1xuICAgICAgLy8gVE9ETyB3ZSBzaG91bGQgYWxsb3cgcGVvcGxlIHRvIGp1c3QgcGFzcyBpbiBhIGNvbXBsZXRlIGZpbGVuYW1lIGluc3RlYWRcbiAgICAgIC8vIG9mIHBhcmVudCBhbmQgbmFtZSBiZWluZyB0aGF0IHdlIGp1c3Qgam9pbiB0aGVtIGFueXdheXNcbiAgICAgIHZhciBmdWxsbmFtZSA9IG5hbWUgPyBQQVRIX0ZTLnJlc29sdmUoUEFUSC5qb2luMihwYXJlbnQsIG5hbWUpKSA6IHBhcmVudFxuICAgICAgdmFyIGRlcCA9IGdldFVuaXF1ZVJ1bkRlcGVuZGVuY3koJ2NwICcgKyBmdWxsbmFtZSkgLy8gbWlnaHQgaGF2ZSBzZXZlcmFsIGFjdGl2ZSByZXF1ZXN0cyBmb3IgdGhlIHNhbWUgZnVsbG5hbWVcbiAgICAgIGZ1bmN0aW9uIHByb2Nlc3NEYXRhKGJ5dGVBcnJheSkge1xuICAgICAgICBmdW5jdGlvbiBmaW5pc2goYnl0ZUFycmF5KSB7XG4gICAgICAgICAgaWYgKHByZUZpbmlzaCkgcHJlRmluaXNoKClcbiAgICAgICAgICBpZiAoIWRvbnRDcmVhdGVGaWxlKSB7XG4gICAgICAgICAgICBGUy5jcmVhdGVEYXRhRmlsZShcbiAgICAgICAgICAgICAgcGFyZW50LFxuICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICBieXRlQXJyYXksXG4gICAgICAgICAgICAgIGNhblJlYWQsXG4gICAgICAgICAgICAgIGNhbldyaXRlLFxuICAgICAgICAgICAgICBjYW5Pd25cbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG9ubG9hZCkgb25sb2FkKClcbiAgICAgICAgICByZW1vdmVSdW5EZXBlbmRlbmN5KGRlcClcbiAgICAgICAgfVxuICAgICAgICBpZiAoXG4gICAgICAgICAgQnJvd3Nlci5oYW5kbGVkQnlQcmVsb2FkUGx1Z2luKGJ5dGVBcnJheSwgZnVsbG5hbWUsIGZpbmlzaCwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKG9uZXJyb3IpIG9uZXJyb3IoKVxuICAgICAgICAgICAgcmVtb3ZlUnVuRGVwZW5kZW5jeShkZXApXG4gICAgICAgICAgfSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgZmluaXNoKGJ5dGVBcnJheSlcbiAgICAgIH1cbiAgICAgIGFkZFJ1bkRlcGVuZGVuY3koZGVwKVxuICAgICAgaWYgKHR5cGVvZiB1cmwgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgYXN5bmNMb2FkKHVybCwgKGJ5dGVBcnJheSkgPT4gcHJvY2Vzc0RhdGEoYnl0ZUFycmF5KSwgb25lcnJvcilcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByb2Nlc3NEYXRhKHVybClcbiAgICAgIH1cbiAgICB9LFxuICAgIGluZGV4ZWREQjogKCkgPT4ge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgd2luZG93LmluZGV4ZWREQiB8fFxuICAgICAgICB3aW5kb3cubW96SW5kZXhlZERCIHx8XG4gICAgICAgIHdpbmRvdy53ZWJraXRJbmRleGVkREIgfHxcbiAgICAgICAgd2luZG93Lm1zSW5kZXhlZERCXG4gICAgICApXG4gICAgfSxcbiAgICBEQl9OQU1FOiAoKSA9PiB7XG4gICAgICByZXR1cm4gJ0VNX0ZTXycgKyB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWVcbiAgICB9LFxuICAgIERCX1ZFUlNJT046IDIwLFxuICAgIERCX1NUT1JFX05BTUU6ICdGSUxFX0RBVEEnLFxuICAgIHNhdmVGaWxlc1RvREI6IChwYXRocywgb25sb2FkLCBvbmVycm9yKSA9PiB7XG4gICAgICBvbmxvYWQgPSBvbmxvYWQgfHwgKCgpID0+IHt9KVxuICAgICAgb25lcnJvciA9IG9uZXJyb3IgfHwgKCgpID0+IHt9KVxuICAgICAgdmFyIGluZGV4ZWREQiA9IEZTLmluZGV4ZWREQigpXG4gICAgICB0cnkge1xuICAgICAgICB2YXIgb3BlblJlcXVlc3QgPSBpbmRleGVkREIub3BlbihGUy5EQl9OQU1FKCksIEZTLkRCX1ZFUlNJT04pXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBvbmVycm9yKGUpXG4gICAgICB9XG4gICAgICBvcGVuUmVxdWVzdC5vbnVwZ3JhZGVuZWVkZWQgPSAoKSA9PiB7XG4gICAgICAgIG91dCgnY3JlYXRpbmcgZGInKVxuICAgICAgICB2YXIgZGIgPSBvcGVuUmVxdWVzdC5yZXN1bHRcbiAgICAgICAgZGIuY3JlYXRlT2JqZWN0U3RvcmUoRlMuREJfU1RPUkVfTkFNRSlcbiAgICAgIH1cbiAgICAgIG9wZW5SZXF1ZXN0Lm9uc3VjY2VzcyA9ICgpID0+IHtcbiAgICAgICAgdmFyIGRiID0gb3BlblJlcXVlc3QucmVzdWx0XG4gICAgICAgIHZhciB0cmFuc2FjdGlvbiA9IGRiLnRyYW5zYWN0aW9uKFtGUy5EQl9TVE9SRV9OQU1FXSwgJ3JlYWR3cml0ZScpXG4gICAgICAgIHZhciBmaWxlcyA9IHRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKEZTLkRCX1NUT1JFX05BTUUpXG4gICAgICAgIHZhciBvayA9IDAsXG4gICAgICAgICAgZmFpbCA9IDAsXG4gICAgICAgICAgdG90YWwgPSBwYXRocy5sZW5ndGhcbiAgICAgICAgZnVuY3Rpb24gZmluaXNoKCkge1xuICAgICAgICAgIGlmIChmYWlsID09IDApIG9ubG9hZCgpXG4gICAgICAgICAgZWxzZSBvbmVycm9yKClcbiAgICAgICAgfVxuICAgICAgICBwYXRocy5mb3JFYWNoKChwYXRoKSA9PiB7XG4gICAgICAgICAgdmFyIHB1dFJlcXVlc3QgPSBmaWxlcy5wdXQoRlMuYW5hbHl6ZVBhdGgocGF0aCkub2JqZWN0LmNvbnRlbnRzLCBwYXRoKVxuICAgICAgICAgIHB1dFJlcXVlc3Qub25zdWNjZXNzID0gKCkgPT4ge1xuICAgICAgICAgICAgb2srK1xuICAgICAgICAgICAgaWYgKG9rICsgZmFpbCA9PSB0b3RhbCkgZmluaXNoKClcbiAgICAgICAgICB9XG4gICAgICAgICAgcHV0UmVxdWVzdC5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgICAgICAgZmFpbCsrXG4gICAgICAgICAgICBpZiAob2sgKyBmYWlsID09IHRvdGFsKSBmaW5pc2goKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgdHJhbnNhY3Rpb24ub25lcnJvciA9IG9uZXJyb3JcbiAgICAgIH1cbiAgICAgIG9wZW5SZXF1ZXN0Lm9uZXJyb3IgPSBvbmVycm9yXG4gICAgfSxcbiAgICBsb2FkRmlsZXNGcm9tREI6IChwYXRocywgb25sb2FkLCBvbmVycm9yKSA9PiB7XG4gICAgICBvbmxvYWQgPSBvbmxvYWQgfHwgKCgpID0+IHt9KVxuICAgICAgb25lcnJvciA9IG9uZXJyb3IgfHwgKCgpID0+IHt9KVxuICAgICAgdmFyIGluZGV4ZWREQiA9IEZTLmluZGV4ZWREQigpXG4gICAgICB0cnkge1xuICAgICAgICB2YXIgb3BlblJlcXVlc3QgPSBpbmRleGVkREIub3BlbihGUy5EQl9OQU1FKCksIEZTLkRCX1ZFUlNJT04pXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBvbmVycm9yKGUpXG4gICAgICB9XG4gICAgICBvcGVuUmVxdWVzdC5vbnVwZ3JhZGVuZWVkZWQgPSBvbmVycm9yIC8vIG5vIGRhdGFiYXNlIHRvIGxvYWQgZnJvbVxuICAgICAgb3BlblJlcXVlc3Qub25zdWNjZXNzID0gKCkgPT4ge1xuICAgICAgICB2YXIgZGIgPSBvcGVuUmVxdWVzdC5yZXN1bHRcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB2YXIgdHJhbnNhY3Rpb24gPSBkYi50cmFuc2FjdGlvbihbRlMuREJfU1RPUkVfTkFNRV0sICdyZWFkb25seScpXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBvbmVycm9yKGUpXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGZpbGVzID0gdHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUoRlMuREJfU1RPUkVfTkFNRSlcbiAgICAgICAgdmFyIG9rID0gMCxcbiAgICAgICAgICBmYWlsID0gMCxcbiAgICAgICAgICB0b3RhbCA9IHBhdGhzLmxlbmd0aFxuICAgICAgICBmdW5jdGlvbiBmaW5pc2goKSB7XG4gICAgICAgICAgaWYgKGZhaWwgPT0gMCkgb25sb2FkKClcbiAgICAgICAgICBlbHNlIG9uZXJyb3IoKVxuICAgICAgICB9XG4gICAgICAgIHBhdGhzLmZvckVhY2goKHBhdGgpID0+IHtcbiAgICAgICAgICB2YXIgZ2V0UmVxdWVzdCA9IGZpbGVzLmdldChwYXRoKVxuICAgICAgICAgIGdldFJlcXVlc3Qub25zdWNjZXNzID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKEZTLmFuYWx5emVQYXRoKHBhdGgpLmV4aXN0cykge1xuICAgICAgICAgICAgICBGUy51bmxpbmsocGF0aClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIEZTLmNyZWF0ZURhdGFGaWxlKFxuICAgICAgICAgICAgICBQQVRILmRpcm5hbWUocGF0aCksXG4gICAgICAgICAgICAgIFBBVEguYmFzZW5hbWUocGF0aCksXG4gICAgICAgICAgICAgIGdldFJlcXVlc3QucmVzdWx0LFxuICAgICAgICAgICAgICB0cnVlLFxuICAgICAgICAgICAgICB0cnVlLFxuICAgICAgICAgICAgICB0cnVlXG4gICAgICAgICAgICApXG4gICAgICAgICAgICBvaysrXG4gICAgICAgICAgICBpZiAob2sgKyBmYWlsID09IHRvdGFsKSBmaW5pc2goKVxuICAgICAgICAgIH1cbiAgICAgICAgICBnZXRSZXF1ZXN0Lm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgICAgICBmYWlsKytcbiAgICAgICAgICAgIGlmIChvayArIGZhaWwgPT0gdG90YWwpIGZpbmlzaCgpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICB0cmFuc2FjdGlvbi5vbmVycm9yID0gb25lcnJvclxuICAgICAgfVxuICAgICAgb3BlblJlcXVlc3Qub25lcnJvciA9IG9uZXJyb3JcbiAgICB9LFxuICAgIGFic29sdXRlUGF0aDogKCkgPT4ge1xuICAgICAgYWJvcnQoJ0ZTLmFic29sdXRlUGF0aCBoYXMgYmVlbiByZW1vdmVkOyB1c2UgUEFUSF9GUy5yZXNvbHZlIGluc3RlYWQnKVxuICAgIH0sXG4gICAgY3JlYXRlRm9sZGVyOiAoKSA9PiB7XG4gICAgICBhYm9ydCgnRlMuY3JlYXRlRm9sZGVyIGhhcyBiZWVuIHJlbW92ZWQ7IHVzZSBGUy5ta2RpciBpbnN0ZWFkJylcbiAgICB9LFxuICAgIGNyZWF0ZUxpbms6ICgpID0+IHtcbiAgICAgIGFib3J0KCdGUy5jcmVhdGVMaW5rIGhhcyBiZWVuIHJlbW92ZWQ7IHVzZSBGUy5zeW1saW5rIGluc3RlYWQnKVxuICAgIH0sXG4gICAgam9pblBhdGg6ICgpID0+IHtcbiAgICAgIGFib3J0KCdGUy5qb2luUGF0aCBoYXMgYmVlbiByZW1vdmVkOyB1c2UgUEFUSC5qb2luIGluc3RlYWQnKVxuICAgIH0sXG4gICAgbW1hcEFsbG9jOiAoKSA9PiB7XG4gICAgICBhYm9ydChcbiAgICAgICAgJ0ZTLm1tYXBBbGxvYyBoYXMgYmVlbiByZXBsYWNlZCBieSB0aGUgdG9wIGxldmVsIGZ1bmN0aW9uIG1tYXBBbGxvYydcbiAgICAgIClcbiAgICB9LFxuICAgIHN0YW5kYXJkaXplUGF0aDogKCkgPT4ge1xuICAgICAgYWJvcnQoJ0ZTLnN0YW5kYXJkaXplUGF0aCBoYXMgYmVlbiByZW1vdmVkOyB1c2UgUEFUSC5ub3JtYWxpemUgaW5zdGVhZCcpXG4gICAgfVxuICB9XG4gIHZhciBTWVNDQUxMUyA9IHtcbiAgICBERUZBVUxUX1BPTExNQVNLOiA1LFxuICAgIGNhbGN1bGF0ZUF0OiBmdW5jdGlvbiAoZGlyZmQsIHBhdGgsIGFsbG93RW1wdHkpIHtcbiAgICAgIGlmIChQQVRILmlzQWJzKHBhdGgpKSB7XG4gICAgICAgIHJldHVybiBwYXRoXG4gICAgICB9XG4gICAgICAvLyByZWxhdGl2ZSBwYXRoXG4gICAgICB2YXIgZGlyXG4gICAgICBpZiAoZGlyZmQgPT09IC0xMDApIHtcbiAgICAgICAgZGlyID0gRlMuY3dkKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBkaXJzdHJlYW0gPSBTWVNDQUxMUy5nZXRTdHJlYW1Gcm9tRkQoZGlyZmQpXG4gICAgICAgIGRpciA9IGRpcnN0cmVhbS5wYXRoXG4gICAgICB9XG4gICAgICBpZiAocGF0aC5sZW5ndGggPT0gMCkge1xuICAgICAgICBpZiAoIWFsbG93RW1wdHkpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRlMuRXJybm9FcnJvcig0NClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGlyXG4gICAgICB9XG4gICAgICByZXR1cm4gUEFUSC5qb2luMihkaXIsIHBhdGgpXG4gICAgfSxcbiAgICBkb1N0YXQ6IGZ1bmN0aW9uIChmdW5jLCBwYXRoLCBidWYpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciBzdGF0ID0gZnVuYyhwYXRoKVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgZSAmJlxuICAgICAgICAgIGUubm9kZSAmJlxuICAgICAgICAgIFBBVEgubm9ybWFsaXplKHBhdGgpICE9PSBQQVRILm5vcm1hbGl6ZShGUy5nZXRQYXRoKGUubm9kZSkpXG4gICAgICAgICkge1xuICAgICAgICAgIC8vIGFuIGVycm9yIG9jY3VycmVkIHdoaWxlIHRyeWluZyB0byBsb29rIHVwIHRoZSBwYXRoOyB3ZSBzaG91bGQganVzdCByZXBvcnQgRU5PVERJUlxuICAgICAgICAgIHJldHVybiAtNTRcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBlXG4gICAgICB9XG4gICAgICBIRUFQMzJbYnVmID4+IDJdID0gc3RhdC5kZXZcbiAgICAgIEhFQVAzMlsoYnVmICsgOCkgPj4gMl0gPSBzdGF0Lmlub1xuICAgICAgSEVBUDMyWyhidWYgKyAxMikgPj4gMl0gPSBzdGF0Lm1vZGVcbiAgICAgIEhFQVBVMzJbKGJ1ZiArIDE2KSA+PiAyXSA9IHN0YXQubmxpbmtcbiAgICAgIEhFQVAzMlsoYnVmICsgMjApID4+IDJdID0gc3RhdC51aWRcbiAgICAgIEhFQVAzMlsoYnVmICsgMjQpID4+IDJdID0gc3RhdC5naWRcbiAgICAgIEhFQVAzMlsoYnVmICsgMjgpID4+IDJdID0gc3RhdC5yZGV2XG4gICAgICA7KHRlbXBJNjQgPSBbXG4gICAgICAgIHN0YXQuc2l6ZSA+Pj4gMCxcbiAgICAgICAgKCh0ZW1wRG91YmxlID0gc3RhdC5zaXplKSxcbiAgICAgICAgK01hdGguYWJzKHRlbXBEb3VibGUpID49IDEuMFxuICAgICAgICAgID8gdGVtcERvdWJsZSA+IDAuMFxuICAgICAgICAgICAgPyAoTWF0aC5taW4oK01hdGguZmxvb3IodGVtcERvdWJsZSAvIDQyOTQ5NjcyOTYuMCksIDQyOTQ5NjcyOTUuMCkgfFxuICAgICAgICAgICAgICAgIDApID4+PlxuICAgICAgICAgICAgICAwXG4gICAgICAgICAgICA6IH5+K01hdGguY2VpbChcbiAgICAgICAgICAgICAgICAodGVtcERvdWJsZSAtICsofn50ZW1wRG91YmxlID4+PiAwKSkgLyA0Mjk0OTY3Mjk2LjBcbiAgICAgICAgICAgICAgKSA+Pj4gMFxuICAgICAgICAgIDogMClcbiAgICAgIF0pLFxuICAgICAgICAoSEVBUDMyWyhidWYgKyA0MCkgPj4gMl0gPSB0ZW1wSTY0WzBdKSxcbiAgICAgICAgKEhFQVAzMlsoYnVmICsgNDQpID4+IDJdID0gdGVtcEk2NFsxXSlcbiAgICAgIEhFQVAzMlsoYnVmICsgNDgpID4+IDJdID0gNDA5NlxuICAgICAgSEVBUDMyWyhidWYgKyA1MikgPj4gMl0gPSBzdGF0LmJsb2Nrc1xuICAgICAgOyh0ZW1wSTY0ID0gW1xuICAgICAgICBNYXRoLmZsb29yKHN0YXQuYXRpbWUuZ2V0VGltZSgpIC8gMTAwMCkgPj4+IDAsXG4gICAgICAgICgodGVtcERvdWJsZSA9IE1hdGguZmxvb3Ioc3RhdC5hdGltZS5nZXRUaW1lKCkgLyAxMDAwKSksXG4gICAgICAgICtNYXRoLmFicyh0ZW1wRG91YmxlKSA+PSAxLjBcbiAgICAgICAgICA/IHRlbXBEb3VibGUgPiAwLjBcbiAgICAgICAgICAgID8gKE1hdGgubWluKCtNYXRoLmZsb29yKHRlbXBEb3VibGUgLyA0Mjk0OTY3Mjk2LjApLCA0Mjk0OTY3Mjk1LjApIHxcbiAgICAgICAgICAgICAgICAwKSA+Pj5cbiAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgOiB+fitNYXRoLmNlaWwoXG4gICAgICAgICAgICAgICAgKHRlbXBEb3VibGUgLSArKH5+dGVtcERvdWJsZSA+Pj4gMCkpIC8gNDI5NDk2NzI5Ni4wXG4gICAgICAgICAgICAgICkgPj4+IDBcbiAgICAgICAgICA6IDApXG4gICAgICBdKSxcbiAgICAgICAgKEhFQVAzMlsoYnVmICsgNTYpID4+IDJdID0gdGVtcEk2NFswXSksXG4gICAgICAgIChIRUFQMzJbKGJ1ZiArIDYwKSA+PiAyXSA9IHRlbXBJNjRbMV0pXG4gICAgICBIRUFQVTMyWyhidWYgKyA2NCkgPj4gMl0gPSAwXG4gICAgICA7KHRlbXBJNjQgPSBbXG4gICAgICAgIE1hdGguZmxvb3Ioc3RhdC5tdGltZS5nZXRUaW1lKCkgLyAxMDAwKSA+Pj4gMCxcbiAgICAgICAgKCh0ZW1wRG91YmxlID0gTWF0aC5mbG9vcihzdGF0Lm10aW1lLmdldFRpbWUoKSAvIDEwMDApKSxcbiAgICAgICAgK01hdGguYWJzKHRlbXBEb3VibGUpID49IDEuMFxuICAgICAgICAgID8gdGVtcERvdWJsZSA+IDAuMFxuICAgICAgICAgICAgPyAoTWF0aC5taW4oK01hdGguZmxvb3IodGVtcERvdWJsZSAvIDQyOTQ5NjcyOTYuMCksIDQyOTQ5NjcyOTUuMCkgfFxuICAgICAgICAgICAgICAgIDApID4+PlxuICAgICAgICAgICAgICAwXG4gICAgICAgICAgICA6IH5+K01hdGguY2VpbChcbiAgICAgICAgICAgICAgICAodGVtcERvdWJsZSAtICsofn50ZW1wRG91YmxlID4+PiAwKSkgLyA0Mjk0OTY3Mjk2LjBcbiAgICAgICAgICAgICAgKSA+Pj4gMFxuICAgICAgICAgIDogMClcbiAgICAgIF0pLFxuICAgICAgICAoSEVBUDMyWyhidWYgKyA3MikgPj4gMl0gPSB0ZW1wSTY0WzBdKSxcbiAgICAgICAgKEhFQVAzMlsoYnVmICsgNzYpID4+IDJdID0gdGVtcEk2NFsxXSlcbiAgICAgIEhFQVBVMzJbKGJ1ZiArIDgwKSA+PiAyXSA9IDBcbiAgICAgIDsodGVtcEk2NCA9IFtcbiAgICAgICAgTWF0aC5mbG9vcihzdGF0LmN0aW1lLmdldFRpbWUoKSAvIDEwMDApID4+PiAwLFxuICAgICAgICAoKHRlbXBEb3VibGUgPSBNYXRoLmZsb29yKHN0YXQuY3RpbWUuZ2V0VGltZSgpIC8gMTAwMCkpLFxuICAgICAgICArTWF0aC5hYnModGVtcERvdWJsZSkgPj0gMS4wXG4gICAgICAgICAgPyB0ZW1wRG91YmxlID4gMC4wXG4gICAgICAgICAgICA/IChNYXRoLm1pbigrTWF0aC5mbG9vcih0ZW1wRG91YmxlIC8gNDI5NDk2NzI5Ni4wKSwgNDI5NDk2NzI5NS4wKSB8XG4gICAgICAgICAgICAgICAgMCkgPj4+XG4gICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIDogfn4rTWF0aC5jZWlsKFxuICAgICAgICAgICAgICAgICh0ZW1wRG91YmxlIC0gKyh+fnRlbXBEb3VibGUgPj4+IDApKSAvIDQyOTQ5NjcyOTYuMFxuICAgICAgICAgICAgICApID4+PiAwXG4gICAgICAgICAgOiAwKVxuICAgICAgXSksXG4gICAgICAgIChIRUFQMzJbKGJ1ZiArIDg4KSA+PiAyXSA9IHRlbXBJNjRbMF0pLFxuICAgICAgICAoSEVBUDMyWyhidWYgKyA5MikgPj4gMl0gPSB0ZW1wSTY0WzFdKVxuICAgICAgSEVBUFUzMlsoYnVmICsgOTYpID4+IDJdID0gMFxuICAgICAgOyh0ZW1wSTY0ID0gW1xuICAgICAgICBzdGF0LmlubyA+Pj4gMCxcbiAgICAgICAgKCh0ZW1wRG91YmxlID0gc3RhdC5pbm8pLFxuICAgICAgICArTWF0aC5hYnModGVtcERvdWJsZSkgPj0gMS4wXG4gICAgICAgICAgPyB0ZW1wRG91YmxlID4gMC4wXG4gICAgICAgICAgICA/IChNYXRoLm1pbigrTWF0aC5mbG9vcih0ZW1wRG91YmxlIC8gNDI5NDk2NzI5Ni4wKSwgNDI5NDk2NzI5NS4wKSB8XG4gICAgICAgICAgICAgICAgMCkgPj4+XG4gICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIDogfn4rTWF0aC5jZWlsKFxuICAgICAgICAgICAgICAgICh0ZW1wRG91YmxlIC0gKyh+fnRlbXBEb3VibGUgPj4+IDApKSAvIDQyOTQ5NjcyOTYuMFxuICAgICAgICAgICAgICApID4+PiAwXG4gICAgICAgICAgOiAwKVxuICAgICAgXSksXG4gICAgICAgIChIRUFQMzJbKGJ1ZiArIDEwNCkgPj4gMl0gPSB0ZW1wSTY0WzBdKSxcbiAgICAgICAgKEhFQVAzMlsoYnVmICsgMTA4KSA+PiAyXSA9IHRlbXBJNjRbMV0pXG4gICAgICByZXR1cm4gMFxuICAgIH0sXG4gICAgZG9Nc3luYzogZnVuY3Rpb24gKGFkZHIsIHN0cmVhbSwgbGVuLCBmbGFncywgb2Zmc2V0KSB7XG4gICAgICBpZiAoIUZTLmlzRmlsZShzdHJlYW0ubm9kZS5tb2RlKSkge1xuICAgICAgICB0aHJvdyBuZXcgRlMuRXJybm9FcnJvcig0MylcbiAgICAgIH1cbiAgICAgIGlmIChmbGFncyAmIDIpIHtcbiAgICAgICAgLy8gTUFQX1BSSVZBVEUgY2FsbHMgbmVlZCBub3QgdG8gYmUgc3luY2VkIGJhY2sgdG8gdW5kZXJseWluZyBmc1xuICAgICAgICByZXR1cm4gMFxuICAgICAgfVxuICAgICAgdmFyIGJ1ZmZlciA9IEhFQVBVOC5zbGljZShhZGRyLCBhZGRyICsgbGVuKVxuICAgICAgRlMubXN5bmMoc3RyZWFtLCBidWZmZXIsIG9mZnNldCwgbGVuLCBmbGFncylcbiAgICB9LFxuICAgIHZhcmFyZ3M6IHVuZGVmaW5lZCxcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGFzc2VydChTWVNDQUxMUy52YXJhcmdzICE9IHVuZGVmaW5lZClcbiAgICAgIFNZU0NBTExTLnZhcmFyZ3MgKz0gNFxuICAgICAgdmFyIHJldCA9IEhFQVAzMlsoU1lTQ0FMTFMudmFyYXJncyAtIDQpID4+IDJdXG4gICAgICByZXR1cm4gcmV0XG4gICAgfSxcbiAgICBnZXRTdHI6IGZ1bmN0aW9uIChwdHIpIHtcbiAgICAgIHZhciByZXQgPSBVVEY4VG9TdHJpbmcocHRyKVxuICAgICAgcmV0dXJuIHJldFxuICAgIH0sXG4gICAgZ2V0U3RyZWFtRnJvbUZEOiBmdW5jdGlvbiAoZmQpIHtcbiAgICAgIHZhciBzdHJlYW0gPSBGUy5nZXRTdHJlYW0oZmQpXG4gICAgICBpZiAoIXN0cmVhbSkgdGhyb3cgbmV3IEZTLkVycm5vRXJyb3IoOClcbiAgICAgIHJldHVybiBzdHJlYW1cbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gX2ZkX3dyaXRlKGZkLCBpb3YsIGlvdmNudCwgcG51bSkge1xuICAgIHRyeSB7XG4gICAgICB2YXIgc3RyZWFtID0gU1lTQ0FMTFMuZ2V0U3RyZWFtRnJvbUZEKGZkKVxuICAgICAgdmFyIG51bSA9IGRvV3JpdGV2KHN0cmVhbSwgaW92LCBpb3ZjbnQpXG4gICAgICBIRUFQVTMyW3BudW0gPj4gMl0gPSBudW1cbiAgICAgIHJldHVybiAwXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKHR5cGVvZiBGUyA9PSAndW5kZWZpbmVkJyB8fCAhKGUgaW5zdGFuY2VvZiBGUy5FcnJub0Vycm9yKSkgdGhyb3cgZVxuICAgICAgcmV0dXJuIGUuZXJybm9cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBfcHJvY19leGl0KGNvZGUpIHtcbiAgICBFWElUU1RBVFVTID0gY29kZVxuICAgIGlmICgha2VlcFJ1bnRpbWVBbGl2ZSgpKSB7XG4gICAgICBpZiAoTW9kdWxlWydvbkV4aXQnXSkgTW9kdWxlWydvbkV4aXQnXShjb2RlKVxuICAgICAgQUJPUlQgPSB0cnVlXG4gICAgfVxuICAgIHF1aXRfKGNvZGUsIG5ldyBFeGl0U3RhdHVzKGNvZGUpKVxuICB9XG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW58bnVtYmVyPX0gaW1wbGljaXQgKi9cbiAgZnVuY3Rpb24gZXhpdEpTKHN0YXR1cywgaW1wbGljaXQpIHtcbiAgICBFWElUU1RBVFVTID0gc3RhdHVzXG5cbiAgICBpZiAoIWtlZXBSdW50aW1lQWxpdmUoKSkge1xuICAgICAgZXhpdFJ1bnRpbWUoKVxuICAgIH1cblxuICAgIC8vIGlmIGV4aXQoKSB3YXMgY2FsbGVkIGV4cGxpY2l0bHksIHdhcm4gdGhlIHVzZXIgaWYgdGhlIHJ1bnRpbWUgaXNuJ3QgYWN0dWFsbHkgYmVpbmcgc2h1dCBkb3duXG4gICAgaWYgKGtlZXBSdW50aW1lQWxpdmUoKSAmJiAhaW1wbGljaXQpIHtcbiAgICAgIHZhciBtc2cgPVxuICAgICAgICAncHJvZ3JhbSBleGl0ZWQgKHdpdGggc3RhdHVzOiAnICtcbiAgICAgICAgc3RhdHVzICtcbiAgICAgICAgJyksIGJ1dCBrZWVwUnVudGltZUFsaXZlKCkgaXMgc2V0IChjb3VudGVyPScgK1xuICAgICAgICBydW50aW1lS2VlcGFsaXZlQ291bnRlciArXG4gICAgICAgICcpIGR1ZSB0byBhbiBhc3luYyBvcGVyYXRpb24sIHNvIGhhbHRpbmcgZXhlY3V0aW9uIGJ1dCBub3QgZXhpdGluZyB0aGUgcnVudGltZSBvciBwcmV2ZW50aW5nIGZ1cnRoZXIgYXN5bmMgZXhlY3V0aW9uICh5b3UgY2FuIHVzZSBlbXNjcmlwdGVuX2ZvcmNlX2V4aXQsIGlmIHlvdSB3YW50IHRvIGZvcmNlIGEgdHJ1ZSBzaHV0ZG93biknXG4gICAgICBlcnIobXNnKVxuICAgIH1cblxuICAgIF9wcm9jX2V4aXQoc3RhdHVzKVxuICB9XG5cbiAgZnVuY3Rpb24gYWxsb2NhdGVVVEY4T25TdGFjayhzdHIpIHtcbiAgICB2YXIgc2l6ZSA9IGxlbmd0aEJ5dGVzVVRGOChzdHIpICsgMVxuICAgIHZhciByZXQgPSBzdGFja0FsbG9jKHNpemUpXG4gICAgc3RyaW5nVG9VVEY4QXJyYXkoc3RyLCBIRUFQOCwgcmV0LCBzaXplKVxuICAgIHJldHVybiByZXRcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENGdW5jKGlkZW50KSB7XG4gICAgdmFyIGZ1bmMgPSBNb2R1bGVbJ18nICsgaWRlbnRdIC8vIGNsb3N1cmUgZXhwb3J0ZWQgZnVuY3Rpb25cbiAgICBhc3NlcnQoXG4gICAgICBmdW5jLFxuICAgICAgJ0Nhbm5vdCBjYWxsIHVua25vd24gZnVuY3Rpb24gJyArIGlkZW50ICsgJywgbWFrZSBzdXJlIGl0IGlzIGV4cG9ydGVkJ1xuICAgIClcbiAgICByZXR1cm4gZnVuY1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfG51bGw9fSByZXR1cm5UeXBlXG4gICAqIEBwYXJhbSB7QXJyYXk9fSBhcmdUeXBlc1xuICAgKiBAcGFyYW0ge0FyZ3VtZW50c3xBcnJheT19IGFyZ3NcbiAgICogQHBhcmFtIHtPYmplY3Q9fSBvcHRzXG4gICAqL1xuICBmdW5jdGlvbiBjY2FsbChpZGVudCwgcmV0dXJuVHlwZSwgYXJnVHlwZXMsIGFyZ3MsIG9wdHMpIHtcbiAgICAvLyBGb3IgZmFzdCBsb29rdXAgb2YgY29udmVyc2lvbiBmdW5jdGlvbnNcbiAgICB2YXIgdG9DID0ge1xuICAgICAgc3RyaW5nOiAoc3RyKSA9PiB7XG4gICAgICAgIHZhciByZXQgPSAwXG4gICAgICAgIGlmIChzdHIgIT09IG51bGwgJiYgc3RyICE9PSB1bmRlZmluZWQgJiYgc3RyICE9PSAwKSB7XG4gICAgICAgICAgLy8gbnVsbCBzdHJpbmdcbiAgICAgICAgICAvLyBhdCBtb3N0IDQgYnl0ZXMgcGVyIFVURi04IGNvZGUgcG9pbnQsICsxIGZvciB0aGUgdHJhaWxpbmcgJ1xcMCdcbiAgICAgICAgICB2YXIgbGVuID0gKHN0ci5sZW5ndGggPDwgMikgKyAxXG4gICAgICAgICAgcmV0ID0gc3RhY2tBbGxvYyhsZW4pXG4gICAgICAgICAgc3RyaW5nVG9VVEY4KHN0ciwgcmV0LCBsZW4pXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldFxuICAgICAgfSxcbiAgICAgIGFycmF5OiAoYXJyKSA9PiB7XG4gICAgICAgIHZhciByZXQgPSBzdGFja0FsbG9jKGFyci5sZW5ndGgpXG4gICAgICAgIHdyaXRlQXJyYXlUb01lbW9yeShhcnIsIHJldClcbiAgICAgICAgcmV0dXJuIHJldFxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbnZlcnRSZXR1cm5WYWx1ZShyZXQpIHtcbiAgICAgIGlmIChyZXR1cm5UeXBlID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gVVRGOFRvU3RyaW5nKHJldClcbiAgICAgIH1cbiAgICAgIGlmIChyZXR1cm5UeXBlID09PSAnYm9vbGVhbicpIHJldHVybiBCb29sZWFuKHJldClcbiAgICAgIHJldHVybiByZXRcbiAgICB9XG5cbiAgICB2YXIgZnVuYyA9IGdldENGdW5jKGlkZW50KVxuICAgIHZhciBjQXJncyA9IFtdXG4gICAgdmFyIHN0YWNrID0gMFxuICAgIGFzc2VydChyZXR1cm5UeXBlICE9PSAnYXJyYXknLCAnUmV0dXJuIHR5cGUgc2hvdWxkIG5vdCBiZSBcImFycmF5XCIuJylcbiAgICBpZiAoYXJncykge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjb252ZXJ0ZXIgPSB0b0NbYXJnVHlwZXNbaV1dXG4gICAgICAgIGlmIChjb252ZXJ0ZXIpIHtcbiAgICAgICAgICBpZiAoc3RhY2sgPT09IDApIHN0YWNrID0gc3RhY2tTYXZlKClcbiAgICAgICAgICBjQXJnc1tpXSA9IGNvbnZlcnRlcihhcmdzW2ldKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNBcmdzW2ldID0gYXJnc1tpXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHZhciByZXQgPSBmdW5jLmFwcGx5KG51bGwsIGNBcmdzKVxuICAgIGZ1bmN0aW9uIG9uRG9uZShyZXQpIHtcbiAgICAgIGlmIChzdGFjayAhPT0gMCkgc3RhY2tSZXN0b3JlKHN0YWNrKVxuICAgICAgcmV0dXJuIGNvbnZlcnRSZXR1cm5WYWx1ZShyZXQpXG4gICAgfVxuXG4gICAgcmV0ID0gb25Eb25lKHJldClcbiAgICByZXR1cm4gcmV0XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmc9fSByZXR1cm5UeXBlXG4gICAqIEBwYXJhbSB7QXJyYXk9fSBhcmdUeXBlc1xuICAgKiBAcGFyYW0ge09iamVjdD19IG9wdHNcbiAgICovXG4gIGZ1bmN0aW9uIGN3cmFwKGlkZW50LCByZXR1cm5UeXBlLCBhcmdUeXBlcywgb3B0cykge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gY2NhbGwoaWRlbnQsIHJldHVyblR5cGUsIGFyZ1R5cGVzLCBhcmd1bWVudHMsIG9wdHMpXG4gICAgfVxuICB9XG5cbiAgdmFyIEZTTm9kZSA9IC8qKiBAY29uc3RydWN0b3IgKi8gZnVuY3Rpb24gKHBhcmVudCwgbmFtZSwgbW9kZSwgcmRldikge1xuICAgIGlmICghcGFyZW50KSB7XG4gICAgICBwYXJlbnQgPSB0aGlzIC8vIHJvb3Qgbm9kZSBzZXRzIHBhcmVudCB0byBpdHNlbGZcbiAgICB9XG4gICAgdGhpcy5wYXJlbnQgPSBwYXJlbnRcbiAgICB0aGlzLm1vdW50ID0gcGFyZW50Lm1vdW50XG4gICAgdGhpcy5tb3VudGVkID0gbnVsbFxuICAgIHRoaXMuaWQgPSBGUy5uZXh0SW5vZGUrK1xuICAgIHRoaXMubmFtZSA9IG5hbWVcbiAgICB0aGlzLm1vZGUgPSBtb2RlXG4gICAgdGhpcy5ub2RlX29wcyA9IHt9XG4gICAgdGhpcy5zdHJlYW1fb3BzID0ge31cbiAgICB0aGlzLnJkZXYgPSByZGV2XG4gIH1cbiAgdmFyIHJlYWRNb2RlID0gMjkyIC8qMjkyKi8gfCA3MyAvKjczKi9cbiAgdmFyIHdyaXRlTW9kZSA9IDE0NiAvKjE0NiovXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKEZTTm9kZS5wcm90b3R5cGUsIHtcbiAgICByZWFkOiB7XG4gICAgICBnZXQ6IC8qKiBAdGhpc3tGU05vZGV9ICovIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLm1vZGUgJiByZWFkTW9kZSkgPT09IHJlYWRNb2RlXG4gICAgICB9LFxuICAgICAgc2V0OiAvKiogQHRoaXN7RlNOb2RlfSAqLyBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgIHZhbCA/ICh0aGlzLm1vZGUgfD0gcmVhZE1vZGUpIDogKHRoaXMubW9kZSAmPSB+cmVhZE1vZGUpXG4gICAgICB9XG4gICAgfSxcbiAgICB3cml0ZToge1xuICAgICAgZ2V0OiAvKiogQHRoaXN7RlNOb2RlfSAqLyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5tb2RlICYgd3JpdGVNb2RlKSA9PT0gd3JpdGVNb2RlXG4gICAgICB9LFxuICAgICAgc2V0OiAvKiogQHRoaXN7RlNOb2RlfSAqLyBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgIHZhbCA/ICh0aGlzLm1vZGUgfD0gd3JpdGVNb2RlKSA6ICh0aGlzLm1vZGUgJj0gfndyaXRlTW9kZSlcbiAgICAgIH1cbiAgICB9LFxuICAgIGlzRm9sZGVyOiB7XG4gICAgICBnZXQ6IC8qKiBAdGhpc3tGU05vZGV9ICovIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIEZTLmlzRGlyKHRoaXMubW9kZSlcbiAgICAgIH1cbiAgICB9LFxuICAgIGlzRGV2aWNlOiB7XG4gICAgICBnZXQ6IC8qKiBAdGhpc3tGU05vZGV9ICovIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIEZTLmlzQ2hyZGV2KHRoaXMubW9kZSlcbiAgICAgIH1cbiAgICB9XG4gIH0pXG4gIEZTLkZTTm9kZSA9IEZTTm9kZVxuICBGUy5zdGF0aWNJbml0KClcbiAgTW9kdWxlWydGU19jcmVhdGVQYXRoJ10gPSBGUy5jcmVhdGVQYXRoXG4gIE1vZHVsZVsnRlNfY3JlYXRlRGF0YUZpbGUnXSA9IEZTLmNyZWF0ZURhdGFGaWxlXG4gIE1vZHVsZVsnRlNfY3JlYXRlUHJlbG9hZGVkRmlsZSddID0gRlMuY3JlYXRlUHJlbG9hZGVkRmlsZVxuICBNb2R1bGVbJ0ZTX3VubGluayddID0gRlMudW5saW5rXG4gIE1vZHVsZVsnRlNfY3JlYXRlTGF6eUZpbGUnXSA9IEZTLmNyZWF0ZUxhenlGaWxlXG4gIE1vZHVsZVsnRlNfY3JlYXRlRGV2aWNlJ10gPSBGUy5jcmVhdGVEZXZpY2VcbiAgRVJSTk9fQ09ERVMgPSB7XG4gICAgRVBFUk06IDYzLFxuICAgIEVOT0VOVDogNDQsXG4gICAgRVNSQ0g6IDcxLFxuICAgIEVJTlRSOiAyNyxcbiAgICBFSU86IDI5LFxuICAgIEVOWElPOiA2MCxcbiAgICBFMkJJRzogMSxcbiAgICBFTk9FWEVDOiA0NSxcbiAgICBFQkFERjogOCxcbiAgICBFQ0hJTEQ6IDEyLFxuICAgIEVBR0FJTjogNixcbiAgICBFV09VTERCTE9DSzogNixcbiAgICBFTk9NRU06IDQ4LFxuICAgIEVBQ0NFUzogMixcbiAgICBFRkFVTFQ6IDIxLFxuICAgIEVOT1RCTEs6IDEwNSxcbiAgICBFQlVTWTogMTAsXG4gICAgRUVYSVNUOiAyMCxcbiAgICBFWERFVjogNzUsXG4gICAgRU5PREVWOiA0MyxcbiAgICBFTk9URElSOiA1NCxcbiAgICBFSVNESVI6IDMxLFxuICAgIEVJTlZBTDogMjgsXG4gICAgRU5GSUxFOiA0MSxcbiAgICBFTUZJTEU6IDMzLFxuICAgIEVOT1RUWTogNTksXG4gICAgRVRYVEJTWTogNzQsXG4gICAgRUZCSUc6IDIyLFxuICAgIEVOT1NQQzogNTEsXG4gICAgRVNQSVBFOiA3MCxcbiAgICBFUk9GUzogNjksXG4gICAgRU1MSU5LOiAzNCxcbiAgICBFUElQRTogNjQsXG4gICAgRURPTTogMTgsXG4gICAgRVJBTkdFOiA2OCxcbiAgICBFTk9NU0c6IDQ5LFxuICAgIEVJRFJNOiAyNCxcbiAgICBFQ0hSTkc6IDEwNixcbiAgICBFTDJOU1lOQzogMTU2LFxuICAgIEVMM0hMVDogMTA3LFxuICAgIEVMM1JTVDogMTA4LFxuICAgIEVMTlJORzogMTA5LFxuICAgIEVVTkFUQ0g6IDExMCxcbiAgICBFTk9DU0k6IDExMSxcbiAgICBFTDJITFQ6IDExMixcbiAgICBFREVBRExLOiAxNixcbiAgICBFTk9MQ0s6IDQ2LFxuICAgIEVCQURFOiAxMTMsXG4gICAgRUJBRFI6IDExNCxcbiAgICBFWEZVTEw6IDExNSxcbiAgICBFTk9BTk86IDEwNCxcbiAgICBFQkFEUlFDOiAxMDMsXG4gICAgRUJBRFNMVDogMTAyLFxuICAgIEVERUFETE9DSzogMTYsXG4gICAgRUJGT05UOiAxMDEsXG4gICAgRU5PU1RSOiAxMDAsXG4gICAgRU5PREFUQTogMTE2LFxuICAgIEVUSU1FOiAxMTcsXG4gICAgRU5PU1I6IDExOCxcbiAgICBFTk9ORVQ6IDExOSxcbiAgICBFTk9QS0c6IDEyMCxcbiAgICBFUkVNT1RFOiAxMjEsXG4gICAgRU5PTElOSzogNDcsXG4gICAgRUFEVjogMTIyLFxuICAgIEVTUk1OVDogMTIzLFxuICAgIEVDT01NOiAxMjQsXG4gICAgRVBST1RPOiA2NSxcbiAgICBFTVVMVElIT1A6IDM2LFxuICAgIEVET1RET1Q6IDEyNSxcbiAgICBFQkFETVNHOiA5LFxuICAgIEVOT1RVTklROiAxMjYsXG4gICAgRUJBREZEOiAxMjcsXG4gICAgRVJFTUNIRzogMTI4LFxuICAgIEVMSUJBQ0M6IDEyOSxcbiAgICBFTElCQkFEOiAxMzAsXG4gICAgRUxJQlNDTjogMTMxLFxuICAgIEVMSUJNQVg6IDEzMixcbiAgICBFTElCRVhFQzogMTMzLFxuICAgIEVOT1NZUzogNTIsXG4gICAgRU5PVEVNUFRZOiA1NSxcbiAgICBFTkFNRVRPT0xPTkc6IDM3LFxuICAgIEVMT09QOiAzMixcbiAgICBFT1BOT1RTVVBQOiAxMzgsXG4gICAgRVBGTk9TVVBQT1JUOiAxMzksXG4gICAgRUNPTk5SRVNFVDogMTUsXG4gICAgRU5PQlVGUzogNDIsXG4gICAgRUFGTk9TVVBQT1JUOiA1LFxuICAgIEVQUk9UT1RZUEU6IDY3LFxuICAgIEVOT1RTT0NLOiA1NyxcbiAgICBFTk9QUk9UT09QVDogNTAsXG4gICAgRVNIVVRET1dOOiAxNDAsXG4gICAgRUNPTk5SRUZVU0VEOiAxNCxcbiAgICBFQUREUklOVVNFOiAzLFxuICAgIEVDT05OQUJPUlRFRDogMTMsXG4gICAgRU5FVFVOUkVBQ0g6IDQwLFxuICAgIEVORVRET1dOOiAzOCxcbiAgICBFVElNRURPVVQ6IDczLFxuICAgIEVIT1NURE9XTjogMTQyLFxuICAgIEVIT1NUVU5SRUFDSDogMjMsXG4gICAgRUlOUFJPR1JFU1M6IDI2LFxuICAgIEVBTFJFQURZOiA3LFxuICAgIEVERVNUQUREUlJFUTogMTcsXG4gICAgRU1TR1NJWkU6IDM1LFxuICAgIEVQUk9UT05PU1VQUE9SVDogNjYsXG4gICAgRVNPQ0tUTk9TVVBQT1JUOiAxMzcsXG4gICAgRUFERFJOT1RBVkFJTDogNCxcbiAgICBFTkVUUkVTRVQ6IDM5LFxuICAgIEVJU0NPTk46IDMwLFxuICAgIEVOT1RDT05OOiA1MyxcbiAgICBFVE9PTUFOWVJFRlM6IDE0MSxcbiAgICBFVVNFUlM6IDEzNixcbiAgICBFRFFVT1Q6IDE5LFxuICAgIEVTVEFMRTogNzIsXG4gICAgRU5PVFNVUDogMTM4LFxuICAgIEVOT01FRElVTTogMTQ4LFxuICAgIEVJTFNFUTogMjUsXG4gICAgRU9WRVJGTE9XOiA2MSxcbiAgICBFQ0FOQ0VMRUQ6IDExLFxuICAgIEVOT1RSRUNPVkVSQUJMRTogNTYsXG4gICAgRU9XTkVSREVBRDogNjIsXG4gICAgRVNUUlBJUEU6IDEzNVxuICB9XG4gIHZhciBBU1NFUlRJT05TID0gdHJ1ZVxuXG4gIC8vIENvcGllZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9zdHJvcGhlL3N0cm9waGVqcy9ibG9iL2UwNmQwMjcvc3JjL3BvbHlmaWxscy5qcyNMMTQ5XG5cbiAgLy8gVGhpcyBjb2RlIHdhcyB3cml0dGVuIGJ5IFR5bGVyIEFraW5zIGFuZCBoYXMgYmVlbiBwbGFjZWQgaW4gdGhlXG4gIC8vIHB1YmxpYyBkb21haW4uICBJdCB3b3VsZCBiZSBuaWNlIGlmIHlvdSBsZWZ0IHRoaXMgaGVhZGVyIGludGFjdC5cbiAgLy8gQmFzZTY0IGNvZGUgZnJvbSBUeWxlciBBa2lucyAtLSBodHRwOi8vcnVta2luLmNvbVxuXG4gIC8qKlxuICAgKiBEZWNvZGVzIGEgYmFzZTY0IHN0cmluZy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGlucHV0IFRoZSBzdHJpbmcgdG8gZGVjb2RlLlxuICAgKi9cbiAgdmFyIGRlY29kZUJhc2U2NCA9XG4gICAgdHlwZW9mIGF0b2IgPT0gJ2Z1bmN0aW9uJ1xuICAgICAgPyBhdG9iXG4gICAgICA6IGZ1bmN0aW9uIChpbnB1dCkge1xuICAgICAgICAgIHZhciBrZXlTdHIgPVxuICAgICAgICAgICAgJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky89J1xuXG4gICAgICAgICAgdmFyIG91dHB1dCA9ICcnXG4gICAgICAgICAgdmFyIGNocjEsIGNocjIsIGNocjNcbiAgICAgICAgICB2YXIgZW5jMSwgZW5jMiwgZW5jMywgZW5jNFxuICAgICAgICAgIHZhciBpID0gMFxuICAgICAgICAgIC8vIHJlbW92ZSBhbGwgY2hhcmFjdGVycyB0aGF0IGFyZSBub3QgQS1aLCBhLXosIDAtOSwgKywgLywgb3IgPVxuICAgICAgICAgIGlucHV0ID0gaW5wdXQucmVwbGFjZSgvW15BLVphLXowLTlcXCtcXC9cXD1dL2csICcnKVxuICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgIGVuYzEgPSBrZXlTdHIuaW5kZXhPZihpbnB1dC5jaGFyQXQoaSsrKSlcbiAgICAgICAgICAgIGVuYzIgPSBrZXlTdHIuaW5kZXhPZihpbnB1dC5jaGFyQXQoaSsrKSlcbiAgICAgICAgICAgIGVuYzMgPSBrZXlTdHIuaW5kZXhPZihpbnB1dC5jaGFyQXQoaSsrKSlcbiAgICAgICAgICAgIGVuYzQgPSBrZXlTdHIuaW5kZXhPZihpbnB1dC5jaGFyQXQoaSsrKSlcblxuICAgICAgICAgICAgY2hyMSA9IChlbmMxIDw8IDIpIHwgKGVuYzIgPj4gNClcbiAgICAgICAgICAgIGNocjIgPSAoKGVuYzIgJiAxNSkgPDwgNCkgfCAoZW5jMyA+PiAyKVxuICAgICAgICAgICAgY2hyMyA9ICgoZW5jMyAmIDMpIDw8IDYpIHwgZW5jNFxuXG4gICAgICAgICAgICBvdXRwdXQgPSBvdXRwdXQgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGNocjEpXG5cbiAgICAgICAgICAgIGlmIChlbmMzICE9PSA2NCkge1xuICAgICAgICAgICAgICBvdXRwdXQgPSBvdXRwdXQgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGNocjIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZW5jNCAhPT0gNjQpIHtcbiAgICAgICAgICAgICAgb3V0cHV0ID0gb3V0cHV0ICsgU3RyaW5nLmZyb21DaGFyQ29kZShjaHIzKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gd2hpbGUgKGkgPCBpbnB1dC5sZW5ndGgpXG4gICAgICAgICAgcmV0dXJuIG91dHB1dFxuICAgICAgICB9XG5cbiAgLy8gQ29udmVydHMgYSBzdHJpbmcgb2YgYmFzZTY0IGludG8gYSBieXRlIGFycmF5LlxuICAvLyBUaHJvd3MgZXJyb3Igb24gaW52YWxpZCBpbnB1dC5cbiAgZnVuY3Rpb24gaW50QXJyYXlGcm9tQmFzZTY0KHMpIHtcbiAgICBpZiAodHlwZW9mIEVOVklST05NRU5UX0lTX05PREUgPT0gJ2Jvb2xlYW4nICYmIEVOVklST05NRU5UX0lTX05PREUpIHtcbiAgICAgIHZhciBidWYgPSBCdWZmZXIuZnJvbShzLCAnYmFzZTY0JylcbiAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShidWZbJ2J1ZmZlciddLCBidWZbJ2J5dGVPZmZzZXQnXSwgYnVmWydieXRlTGVuZ3RoJ10pXG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHZhciBkZWNvZGVkID0gZGVjb2RlQmFzZTY0KHMpXG4gICAgICB2YXIgYnl0ZXMgPSBuZXcgVWludDhBcnJheShkZWNvZGVkLmxlbmd0aClcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGVjb2RlZC5sZW5ndGg7ICsraSkge1xuICAgICAgICBieXRlc1tpXSA9IGRlY29kZWQuY2hhckNvZGVBdChpKVxuICAgICAgfVxuICAgICAgcmV0dXJuIGJ5dGVzXG4gICAgfSBjYXRjaCAoXykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb252ZXJ0aW5nIGJhc2U2NCBzdHJpbmcgdG8gYnl0ZXMgZmFpbGVkLicpXG4gICAgfVxuICB9XG5cbiAgLy8gSWYgZmlsZW5hbWUgaXMgYSBiYXNlNjQgZGF0YSBVUkksIHBhcnNlcyBhbmQgcmV0dXJucyBkYXRhIChCdWZmZXIgb24gbm9kZSxcbiAgLy8gVWludDhBcnJheSBvdGhlcndpc2UpLiBJZiBmaWxlbmFtZSBpcyBub3QgYSBiYXNlNjQgZGF0YSBVUkksIHJldHVybnMgdW5kZWZpbmVkLlxuICBmdW5jdGlvbiB0cnlQYXJzZUFzRGF0YVVSSShmaWxlbmFtZSkge1xuICAgIGlmICghaXNEYXRhVVJJKGZpbGVuYW1lKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgcmV0dXJuIGludEFycmF5RnJvbUJhc2U2NChmaWxlbmFtZS5zbGljZShkYXRhVVJJUHJlZml4Lmxlbmd0aCkpXG4gIH1cblxuICBmdW5jdGlvbiBjaGVja0luY29taW5nTW9kdWxlQVBJKCkge1xuICAgIGlnbm9yZWRNb2R1bGVQcm9wKCdmZXRjaFNldHRpbmdzJylcbiAgfVxuICB2YXIgYXNtTGlicmFyeUFyZyA9IHtcbiAgICBlbXNjcmlwdGVuX21lbWNweV9iaWc6IF9lbXNjcmlwdGVuX21lbWNweV9iaWcsXG4gICAgZW1zY3JpcHRlbl9yZXNpemVfaGVhcDogX2Vtc2NyaXB0ZW5fcmVzaXplX2hlYXAsXG4gICAgZmRfd3JpdGU6IF9mZF93cml0ZVxuICB9XG4gIHZhciBhc20gPSBjcmVhdGVXYXNtKClcbiAgLyoqIEB0eXBlIHtmdW5jdGlvbiguLi4qKTo/fSAqL1xuICB2YXIgX19fd2FzbV9jYWxsX2N0b3JzID0gKE1vZHVsZVsnX19fd2FzbV9jYWxsX2N0b3JzJ10gPVxuICAgIGNyZWF0ZUV4cG9ydFdyYXBwZXIoJ19fd2FzbV9jYWxsX2N0b3JzJykpXG5cbiAgLyoqIEB0eXBlIHtmdW5jdGlvbiguLi4qKTo/fSAqL1xuICB2YXIgX21haW4gPSAoTW9kdWxlWydfbWFpbiddID0gY3JlYXRlRXhwb3J0V3JhcHBlcignX19tYWluX2FyZ2NfYXJndicpKVxuXG4gIC8qKiBAdHlwZSB7ZnVuY3Rpb24oLi4uKik6P30gKi9cbiAgdmFyIF9mcmVlID0gKE1vZHVsZVsnX2ZyZWUnXSA9IGNyZWF0ZUV4cG9ydFdyYXBwZXIoJ2ZyZWUnKSlcblxuICAvKiogQHR5cGUge2Z1bmN0aW9uKC4uLiopOj99ICovXG4gIHZhciBfX19lcnJub19sb2NhdGlvbiA9IChNb2R1bGVbJ19fX2Vycm5vX2xvY2F0aW9uJ10gPVxuICAgIGNyZWF0ZUV4cG9ydFdyYXBwZXIoJ19fZXJybm9fbG9jYXRpb24nKSlcblxuICAvKiogQHR5cGUge2Z1bmN0aW9uKC4uLiopOj99ICovXG4gIHZhciBfX19mdW5jc19vbl9leGl0ID0gKE1vZHVsZVsnX19fZnVuY3Nfb25fZXhpdCddID1cbiAgICBjcmVhdGVFeHBvcnRXcmFwcGVyKCdfX2Z1bmNzX29uX2V4aXQnKSlcblxuICAvKiogQHR5cGUge2Z1bmN0aW9uKC4uLiopOj99ICovXG4gIHZhciBfZmZsdXNoID0gKE1vZHVsZVsnX2ZmbHVzaCddID0gY3JlYXRlRXhwb3J0V3JhcHBlcignZmZsdXNoJykpXG5cbiAgLyoqIEB0eXBlIHtmdW5jdGlvbiguLi4qKTo/fSAqL1xuICB2YXIgX21hbGxvYyA9IChNb2R1bGVbJ19tYWxsb2MnXSA9IGNyZWF0ZUV4cG9ydFdyYXBwZXIoJ21hbGxvYycpKVxuXG4gIC8qKiBAdHlwZSB7ZnVuY3Rpb24oLi4uKik6P30gKi9cbiAgdmFyIF9lbXNjcmlwdGVuX3N0YWNrX2luaXQgPSAoTW9kdWxlWydfZW1zY3JpcHRlbl9zdGFja19pbml0J10gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIChfZW1zY3JpcHRlbl9zdGFja19pbml0ID0gTW9kdWxlWydfZW1zY3JpcHRlbl9zdGFja19pbml0J10gPVxuICAgICAgTW9kdWxlWydhc20nXVsnZW1zY3JpcHRlbl9zdGFja19pbml0J10pLmFwcGx5KG51bGwsIGFyZ3VtZW50cylcbiAgfSlcblxuICAvKiogQHR5cGUge2Z1bmN0aW9uKC4uLiopOj99ICovXG4gIHZhciBfZW1zY3JpcHRlbl9zdGFja19nZXRfZnJlZSA9IChNb2R1bGVbJ19lbXNjcmlwdGVuX3N0YWNrX2dldF9mcmVlJ10gPVxuICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiAoX2Vtc2NyaXB0ZW5fc3RhY2tfZ2V0X2ZyZWUgPSBNb2R1bGVbXG4gICAgICAgICdfZW1zY3JpcHRlbl9zdGFja19nZXRfZnJlZSdcbiAgICAgIF0gPVxuICAgICAgICBNb2R1bGVbJ2FzbSddWydlbXNjcmlwdGVuX3N0YWNrX2dldF9mcmVlJ10pLmFwcGx5KG51bGwsIGFyZ3VtZW50cylcbiAgICB9KVxuXG4gIC8qKiBAdHlwZSB7ZnVuY3Rpb24oLi4uKik6P30gKi9cbiAgdmFyIF9lbXNjcmlwdGVuX3N0YWNrX2dldF9iYXNlID0gKE1vZHVsZVsnX2Vtc2NyaXB0ZW5fc3RhY2tfZ2V0X2Jhc2UnXSA9XG4gICAgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIChfZW1zY3JpcHRlbl9zdGFja19nZXRfYmFzZSA9IE1vZHVsZVtcbiAgICAgICAgJ19lbXNjcmlwdGVuX3N0YWNrX2dldF9iYXNlJ1xuICAgICAgXSA9XG4gICAgICAgIE1vZHVsZVsnYXNtJ11bJ2Vtc2NyaXB0ZW5fc3RhY2tfZ2V0X2Jhc2UnXSkuYXBwbHkobnVsbCwgYXJndW1lbnRzKVxuICAgIH0pXG5cbiAgLyoqIEB0eXBlIHtmdW5jdGlvbiguLi4qKTo/fSAqL1xuICB2YXIgX2Vtc2NyaXB0ZW5fc3RhY2tfZ2V0X2VuZCA9IChNb2R1bGVbJ19lbXNjcmlwdGVuX3N0YWNrX2dldF9lbmQnXSA9XG4gICAgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIChfZW1zY3JpcHRlbl9zdGFja19nZXRfZW5kID0gTW9kdWxlWydfZW1zY3JpcHRlbl9zdGFja19nZXRfZW5kJ10gPVxuICAgICAgICBNb2R1bGVbJ2FzbSddWydlbXNjcmlwdGVuX3N0YWNrX2dldF9lbmQnXSkuYXBwbHkobnVsbCwgYXJndW1lbnRzKVxuICAgIH0pXG5cbiAgLyoqIEB0eXBlIHtmdW5jdGlvbiguLi4qKTo/fSAqL1xuICB2YXIgc3RhY2tTYXZlID0gKE1vZHVsZVsnc3RhY2tTYXZlJ10gPSBjcmVhdGVFeHBvcnRXcmFwcGVyKCdzdGFja1NhdmUnKSlcblxuICAvKiogQHR5cGUge2Z1bmN0aW9uKC4uLiopOj99ICovXG4gIHZhciBzdGFja1Jlc3RvcmUgPSAoTW9kdWxlWydzdGFja1Jlc3RvcmUnXSA9XG4gICAgY3JlYXRlRXhwb3J0V3JhcHBlcignc3RhY2tSZXN0b3JlJykpXG5cbiAgLyoqIEB0eXBlIHtmdW5jdGlvbiguLi4qKTo/fSAqL1xuICB2YXIgc3RhY2tBbGxvYyA9IChNb2R1bGVbJ3N0YWNrQWxsb2MnXSA9IGNyZWF0ZUV4cG9ydFdyYXBwZXIoJ3N0YWNrQWxsb2MnKSlcblxuICAvKiogQHR5cGUge2Z1bmN0aW9uKC4uLiopOj99ICovXG4gIHZhciBkeW5DYWxsX2ppamkgPSAoTW9kdWxlWydkeW5DYWxsX2ppamknXSA9XG4gICAgY3JlYXRlRXhwb3J0V3JhcHBlcignZHluQ2FsbF9qaWppJykpXG5cbiAgLy8gPT09IEF1dG8tZ2VuZXJhdGVkIHBvc3RhbWJsZSBzZXR1cCBlbnRyeSBzdHVmZiA9PT1cblxuICBNb2R1bGVbJ2FkZFJ1bkRlcGVuZGVuY3knXSA9IGFkZFJ1bkRlcGVuZGVuY3lcbiAgTW9kdWxlWydyZW1vdmVSdW5EZXBlbmRlbmN5J10gPSByZW1vdmVSdW5EZXBlbmRlbmN5XG4gIE1vZHVsZVsnRlNfY3JlYXRlUGF0aCddID0gRlMuY3JlYXRlUGF0aFxuICBNb2R1bGVbJ0ZTX2NyZWF0ZURhdGFGaWxlJ10gPSBGUy5jcmVhdGVEYXRhRmlsZVxuICBNb2R1bGVbJ0ZTX2NyZWF0ZVByZWxvYWRlZEZpbGUnXSA9IEZTLmNyZWF0ZVByZWxvYWRlZEZpbGVcbiAgTW9kdWxlWydGU19jcmVhdGVMYXp5RmlsZSddID0gRlMuY3JlYXRlTGF6eUZpbGVcbiAgTW9kdWxlWydGU19jcmVhdGVEZXZpY2UnXSA9IEZTLmNyZWF0ZURldmljZVxuICBNb2R1bGVbJ0ZTX3VubGluayddID0gRlMudW5saW5rXG4gIE1vZHVsZVsnY2NhbGwnXSA9IGNjYWxsXG4gIE1vZHVsZVsnY3dyYXAnXSA9IGN3cmFwXG4gIHZhciB1bmV4cG9ydGVkUnVudGltZVN5bWJvbHMgPSBbXG4gICAgJ3J1bicsXG4gICAgJ1VURjhBcnJheVRvU3RyaW5nJyxcbiAgICAnVVRGOFRvU3RyaW5nJyxcbiAgICAnc3RyaW5nVG9VVEY4QXJyYXknLFxuICAgICdzdHJpbmdUb1VURjgnLFxuICAgICdsZW5ndGhCeXRlc1VURjgnLFxuICAgICdhZGRPblByZVJ1bicsXG4gICAgJ2FkZE9uSW5pdCcsXG4gICAgJ2FkZE9uUHJlTWFpbicsXG4gICAgJ2FkZE9uRXhpdCcsXG4gICAgJ2FkZE9uUG9zdFJ1bicsXG4gICAgJ0ZTX2NyZWF0ZUZvbGRlcicsXG4gICAgJ0ZTX2NyZWF0ZUxpbmsnLFxuICAgICdnZXRMRUInLFxuICAgICdnZXRGdW5jdGlvblRhYmxlcycsXG4gICAgJ2FsaWduRnVuY3Rpb25UYWJsZXMnLFxuICAgICdyZWdpc3RlckZ1bmN0aW9ucycsXG4gICAgJ3ByZXR0eVByaW50JyxcbiAgICAnZ2V0Q29tcGlsZXJTZXR0aW5nJyxcbiAgICAncHJpbnQnLFxuICAgICdwcmludEVycicsXG4gICAgJ2NhbGxNYWluJyxcbiAgICAnYWJvcnQnLFxuICAgICdrZWVwUnVudGltZUFsaXZlJyxcbiAgICAnd2FzbU1lbW9yeScsXG4gICAgJ3N0YWNrQWxsb2MnLFxuICAgICdzdGFja1NhdmUnLFxuICAgICdzdGFja1Jlc3RvcmUnLFxuICAgICdnZXRUZW1wUmV0MCcsXG4gICAgJ3NldFRlbXBSZXQwJyxcbiAgICAnd3JpdGVTdGFja0Nvb2tpZScsXG4gICAgJ2NoZWNrU3RhY2tDb29raWUnLFxuICAgICdwdHJUb1N0cmluZycsXG4gICAgJ3plcm9NZW1vcnknLFxuICAgICdzdHJpbmdUb05ld1VURjgnLFxuICAgICdleGl0SlMnLFxuICAgICdnZXRIZWFwTWF4JyxcbiAgICAnZW1zY3JpcHRlbl9yZWFsbG9jX2J1ZmZlcicsXG4gICAgJ0VOVicsXG4gICAgJ0VSUk5PX0NPREVTJyxcbiAgICAnRVJSTk9fTUVTU0FHRVMnLFxuICAgICdzZXRFcnJObycsXG4gICAgJ2luZXRQdG9uNCcsXG4gICAgJ2luZXROdG9wNCcsXG4gICAgJ2luZXRQdG9uNicsXG4gICAgJ2luZXROdG9wNicsXG4gICAgJ3JlYWRTb2NrYWRkcicsXG4gICAgJ3dyaXRlU29ja2FkZHInLFxuICAgICdETlMnLFxuICAgICdnZXRIb3N0QnlOYW1lJyxcbiAgICAnUHJvdG9jb2xzJyxcbiAgICAnU29ja2V0cycsXG4gICAgJ2dldFJhbmRvbURldmljZScsXG4gICAgJ3dhcm5PbmNlJyxcbiAgICAndHJhdmVyc2VTdGFjaycsXG4gICAgJ1VOV0lORF9DQUNIRScsXG4gICAgJ2NvbnZlcnRQQ3RvU291cmNlTG9jYXRpb24nLFxuICAgICdyZWFkQXNtQ29uc3RBcmdzQXJyYXknLFxuICAgICdyZWFkQXNtQ29uc3RBcmdzJyxcbiAgICAnbWFpblRocmVhZEVNX0FTTScsXG4gICAgJ2pzdG9pX3EnLFxuICAgICdqc3RvaV9zJyxcbiAgICAnZ2V0RXhlY3V0YWJsZU5hbWUnLFxuICAgICdsaXN0ZW5PbmNlJyxcbiAgICAnYXV0b1Jlc3VtZUF1ZGlvQ29udGV4dCcsXG4gICAgJ2R5bkNhbGxMZWdhY3knLFxuICAgICdnZXREeW5DYWxsZXInLFxuICAgICdkeW5DYWxsJyxcbiAgICAnaGFuZGxlRXhjZXB0aW9uJyxcbiAgICAncnVudGltZUtlZXBhbGl2ZVB1c2gnLFxuICAgICdydW50aW1lS2VlcGFsaXZlUG9wJyxcbiAgICAnY2FsbFVzZXJDYWxsYmFjaycsXG4gICAgJ21heWJlRXhpdCcsXG4gICAgJ3NhZmVTZXRUaW1lb3V0JyxcbiAgICAnYXNtanNNYW5nbGUnLFxuICAgICdhc3luY0xvYWQnLFxuICAgICdhbGlnbk1lbW9yeScsXG4gICAgJ21tYXBBbGxvYycsXG4gICAgJ3dyaXRlSTUzVG9JNjQnLFxuICAgICd3cml0ZUk1M1RvSTY0Q2xhbXBlZCcsXG4gICAgJ3dyaXRlSTUzVG9JNjRTaWduYWxpbmcnLFxuICAgICd3cml0ZUk1M1RvVTY0Q2xhbXBlZCcsXG4gICAgJ3dyaXRlSTUzVG9VNjRTaWduYWxpbmcnLFxuICAgICdyZWFkSTUzRnJvbUk2NCcsXG4gICAgJ3JlYWRJNTNGcm9tVTY0JyxcbiAgICAnY29udmVydEkzMlBhaXJUb0k1MycsXG4gICAgJ2NvbnZlcnRJMzJQYWlyVG9JNTNDaGVja2VkJyxcbiAgICAnY29udmVydFUzMlBhaXJUb0k1MycsXG4gICAgJ2dldENGdW5jJyxcbiAgICAndWxlYjEyOEVuY29kZScsXG4gICAgJ3NpZ1RvV2FzbVR5cGVzJyxcbiAgICAnZ2VuZXJhdGVGdW5jVHlwZScsXG4gICAgJ2NvbnZlcnRKc0Z1bmN0aW9uVG9XYXNtJyxcbiAgICAnZnJlZVRhYmxlSW5kZXhlcycsXG4gICAgJ2Z1bmN0aW9uc0luVGFibGVNYXAnLFxuICAgICdnZXRFbXB0eVRhYmxlU2xvdCcsXG4gICAgJ3VwZGF0ZVRhYmxlTWFwJyxcbiAgICAnYWRkRnVuY3Rpb24nLFxuICAgICdyZW1vdmVGdW5jdGlvbicsXG4gICAgJ3JlYWxseU5lZ2F0aXZlJyxcbiAgICAndW5TaWduJyxcbiAgICAnc3RyTGVuJyxcbiAgICAncmVTaWduJyxcbiAgICAnZm9ybWF0U3RyaW5nJyxcbiAgICAnc2V0VmFsdWUnLFxuICAgICdnZXRWYWx1ZScsXG4gICAgJ1BBVEgnLFxuICAgICdQQVRIX0ZTJyxcbiAgICAnaW50QXJyYXlGcm9tU3RyaW5nJyxcbiAgICAnaW50QXJyYXlUb1N0cmluZycsXG4gICAgJ0FzY2lpVG9TdHJpbmcnLFxuICAgICdzdHJpbmdUb0FzY2lpJyxcbiAgICAnVVRGMTZEZWNvZGVyJyxcbiAgICAnVVRGMTZUb1N0cmluZycsXG4gICAgJ3N0cmluZ1RvVVRGMTYnLFxuICAgICdsZW5ndGhCeXRlc1VURjE2JyxcbiAgICAnVVRGMzJUb1N0cmluZycsXG4gICAgJ3N0cmluZ1RvVVRGMzInLFxuICAgICdsZW5ndGhCeXRlc1VURjMyJyxcbiAgICAnYWxsb2NhdGVVVEY4JyxcbiAgICAnYWxsb2NhdGVVVEY4T25TdGFjaycsXG4gICAgJ3dyaXRlU3RyaW5nVG9NZW1vcnknLFxuICAgICd3cml0ZUFycmF5VG9NZW1vcnknLFxuICAgICd3cml0ZUFzY2lpVG9NZW1vcnknLFxuICAgICdTWVNDQUxMUycsXG4gICAgJ2dldFNvY2tldEZyb21GRCcsXG4gICAgJ2dldFNvY2tldEFkZHJlc3MnLFxuICAgICdKU0V2ZW50cycsXG4gICAgJ3JlZ2lzdGVyS2V5RXZlbnRDYWxsYmFjaycsXG4gICAgJ3NwZWNpYWxIVE1MVGFyZ2V0cycsXG4gICAgJ21heWJlQ1N0cmluZ1RvSnNTdHJpbmcnLFxuICAgICdmaW5kRXZlbnRUYXJnZXQnLFxuICAgICdmaW5kQ2FudmFzRXZlbnRUYXJnZXQnLFxuICAgICdnZXRCb3VuZGluZ0NsaWVudFJlY3QnLFxuICAgICdmaWxsTW91c2VFdmVudERhdGEnLFxuICAgICdyZWdpc3Rlck1vdXNlRXZlbnRDYWxsYmFjaycsXG4gICAgJ3JlZ2lzdGVyV2hlZWxFdmVudENhbGxiYWNrJyxcbiAgICAncmVnaXN0ZXJVaUV2ZW50Q2FsbGJhY2snLFxuICAgICdyZWdpc3RlckZvY3VzRXZlbnRDYWxsYmFjaycsXG4gICAgJ2ZpbGxEZXZpY2VPcmllbnRhdGlvbkV2ZW50RGF0YScsXG4gICAgJ3JlZ2lzdGVyRGV2aWNlT3JpZW50YXRpb25FdmVudENhbGxiYWNrJyxcbiAgICAnZmlsbERldmljZU1vdGlvbkV2ZW50RGF0YScsXG4gICAgJ3JlZ2lzdGVyRGV2aWNlTW90aW9uRXZlbnRDYWxsYmFjaycsXG4gICAgJ3NjcmVlbk9yaWVudGF0aW9uJyxcbiAgICAnZmlsbE9yaWVudGF0aW9uQ2hhbmdlRXZlbnREYXRhJyxcbiAgICAncmVnaXN0ZXJPcmllbnRhdGlvbkNoYW5nZUV2ZW50Q2FsbGJhY2snLFxuICAgICdmaWxsRnVsbHNjcmVlbkNoYW5nZUV2ZW50RGF0YScsXG4gICAgJ3JlZ2lzdGVyRnVsbHNjcmVlbkNoYW5nZUV2ZW50Q2FsbGJhY2snLFxuICAgICdKU0V2ZW50c19yZXF1ZXN0RnVsbHNjcmVlbicsXG4gICAgJ0pTRXZlbnRzX3Jlc2l6ZUNhbnZhc0ZvckZ1bGxzY3JlZW4nLFxuICAgICdyZWdpc3RlclJlc3RvcmVPbGRTdHlsZScsXG4gICAgJ2hpZGVFdmVyeXRoaW5nRXhjZXB0R2l2ZW5FbGVtZW50JyxcbiAgICAncmVzdG9yZUhpZGRlbkVsZW1lbnRzJyxcbiAgICAnc2V0TGV0dGVyYm94JyxcbiAgICAnY3VycmVudEZ1bGxzY3JlZW5TdHJhdGVneScsXG4gICAgJ3Jlc3RvcmVPbGRXaW5kb3dlZFN0eWxlJyxcbiAgICAnc29mdEZ1bGxzY3JlZW5SZXNpemVXZWJHTFJlbmRlclRhcmdldCcsXG4gICAgJ2RvUmVxdWVzdEZ1bGxzY3JlZW4nLFxuICAgICdmaWxsUG9pbnRlcmxvY2tDaGFuZ2VFdmVudERhdGEnLFxuICAgICdyZWdpc3RlclBvaW50ZXJsb2NrQ2hhbmdlRXZlbnRDYWxsYmFjaycsXG4gICAgJ3JlZ2lzdGVyUG9pbnRlcmxvY2tFcnJvckV2ZW50Q2FsbGJhY2snLFxuICAgICdyZXF1ZXN0UG9pbnRlckxvY2snLFxuICAgICdmaWxsVmlzaWJpbGl0eUNoYW5nZUV2ZW50RGF0YScsXG4gICAgJ3JlZ2lzdGVyVmlzaWJpbGl0eUNoYW5nZUV2ZW50Q2FsbGJhY2snLFxuICAgICdyZWdpc3RlclRvdWNoRXZlbnRDYWxsYmFjaycsXG4gICAgJ2ZpbGxHYW1lcGFkRXZlbnREYXRhJyxcbiAgICAncmVnaXN0ZXJHYW1lcGFkRXZlbnRDYWxsYmFjaycsXG4gICAgJ3JlZ2lzdGVyQmVmb3JlVW5sb2FkRXZlbnRDYWxsYmFjaycsXG4gICAgJ2ZpbGxCYXR0ZXJ5RXZlbnREYXRhJyxcbiAgICAnYmF0dGVyeScsXG4gICAgJ3JlZ2lzdGVyQmF0dGVyeUV2ZW50Q2FsbGJhY2snLFxuICAgICdzZXRDYW52YXNFbGVtZW50U2l6ZScsXG4gICAgJ2dldENhbnZhc0VsZW1lbnRTaXplJyxcbiAgICAnZGVtYW5nbGUnLFxuICAgICdkZW1hbmdsZUFsbCcsXG4gICAgJ2pzU3RhY2tUcmFjZScsXG4gICAgJ3N0YWNrVHJhY2UnLFxuICAgICdFeGl0U3RhdHVzJyxcbiAgICAnZ2V0RW52U3RyaW5ncycsXG4gICAgJ2NoZWNrV2FzaUNsb2NrJyxcbiAgICAnZG9SZWFkdicsXG4gICAgJ2RvV3JpdGV2JyxcbiAgICAnZGxvcGVuTWlzc2luZ0Vycm9yJyxcbiAgICAnY3JlYXRlRHluY2FsbFdyYXBwZXInLFxuICAgICdzZXRJbW1lZGlhdGVXcmFwcGVkJyxcbiAgICAnY2xlYXJJbW1lZGlhdGVXcmFwcGVkJyxcbiAgICAncG9seWZpbGxTZXRJbW1lZGlhdGUnLFxuICAgICd1bmNhdWdodEV4Y2VwdGlvbkNvdW50JyxcbiAgICAnZXhjZXB0aW9uTGFzdCcsXG4gICAgJ2V4Y2VwdGlvbkNhdWdodCcsXG4gICAgJ0V4Y2VwdGlvbkluZm8nLFxuICAgICdleGNlcHRpb25fYWRkUmVmJyxcbiAgICAnZXhjZXB0aW9uX2RlY1JlZicsXG4gICAgJ0Jyb3dzZXInLFxuICAgICdzZXRNYWluTG9vcCcsXG4gICAgJ3dnZXQnLFxuICAgICdGUycsXG4gICAgJ01FTUZTJyxcbiAgICAnVFRZJyxcbiAgICAnUElQRUZTJyxcbiAgICAnU09DS0ZTJyxcbiAgICAnX3NldE5ldHdvcmtDYWxsYmFjaycsXG4gICAgJ3RlbXBGaXhlZExlbmd0aEFycmF5JyxcbiAgICAnbWluaVRlbXBXZWJHTEZsb2F0QnVmZmVycycsXG4gICAgJ2hlYXBPYmplY3RGb3JXZWJHTFR5cGUnLFxuICAgICdoZWFwQWNjZXNzU2hpZnRGb3JXZWJHTEhlYXAnLFxuICAgICdHTCcsXG4gICAgJ2Vtc2NyaXB0ZW5XZWJHTEdldCcsXG4gICAgJ2NvbXB1dGVVbnBhY2tBbGlnbmVkSW1hZ2VTaXplJyxcbiAgICAnZW1zY3JpcHRlbldlYkdMR2V0VGV4UGl4ZWxEYXRhJyxcbiAgICAnZW1zY3JpcHRlbldlYkdMR2V0VW5pZm9ybScsXG4gICAgJ3dlYmdsR2V0VW5pZm9ybUxvY2F0aW9uJyxcbiAgICAnd2ViZ2xQcmVwYXJlVW5pZm9ybUxvY2F0aW9uc0JlZm9yZUZpcnN0VXNlJyxcbiAgICAnd2ViZ2xHZXRMZWZ0QnJhY2VQb3MnLFxuICAgICdlbXNjcmlwdGVuV2ViR0xHZXRWZXJ0ZXhBdHRyaWInLFxuICAgICd3cml0ZUdMQXJyYXknLFxuICAgICdBTCcsXG4gICAgJ1NETF91bmljb2RlJyxcbiAgICAnU0RMX3R0ZkNvbnRleHQnLFxuICAgICdTRExfYXVkaW8nLFxuICAgICdTREwnLFxuICAgICdTRExfZ2Z4JyxcbiAgICAnR0xVVCcsXG4gICAgJ0VHTCcsXG4gICAgJ0dMRldfV2luZG93JyxcbiAgICAnR0xGVycsXG4gICAgJ0dMRVcnLFxuICAgICdJREJTdG9yZScsXG4gICAgJ3J1bkFuZEFib3J0SWZFcnJvcicsXG4gICAgJ0FMTE9DX05PUk1BTCcsXG4gICAgJ0FMTE9DX1NUQUNLJyxcbiAgICAnYWxsb2NhdGUnXG4gIF1cbiAgdW5leHBvcnRlZFJ1bnRpbWVTeW1ib2xzLmZvckVhY2godW5leHBvcnRlZFJ1bnRpbWVTeW1ib2wpXG4gIHZhciBtaXNzaW5nTGlicmFyeVN5bWJvbHMgPSBbXG4gICAgJ3B0clRvU3RyaW5nJyxcbiAgICAnc3RyaW5nVG9OZXdVVEY4JyxcbiAgICAnc2V0RXJyTm8nLFxuICAgICdpbmV0UHRvbjQnLFxuICAgICdpbmV0TnRvcDQnLFxuICAgICdpbmV0UHRvbjYnLFxuICAgICdpbmV0TnRvcDYnLFxuICAgICdyZWFkU29ja2FkZHInLFxuICAgICd3cml0ZVNvY2thZGRyJyxcbiAgICAnZ2V0SG9zdEJ5TmFtZScsXG4gICAgJ3RyYXZlcnNlU3RhY2snLFxuICAgICdjb252ZXJ0UEN0b1NvdXJjZUxvY2F0aW9uJyxcbiAgICAncmVhZEFzbUNvbnN0QXJncycsXG4gICAgJ21haW5UaHJlYWRFTV9BU00nLFxuICAgICdqc3RvaV9xJyxcbiAgICAnanN0b2lfcycsXG4gICAgJ2dldEV4ZWN1dGFibGVOYW1lJyxcbiAgICAnbGlzdGVuT25jZScsXG4gICAgJ2F1dG9SZXN1bWVBdWRpb0NvbnRleHQnLFxuICAgICdkeW5DYWxsTGVnYWN5JyxcbiAgICAnZ2V0RHluQ2FsbGVyJyxcbiAgICAnZHluQ2FsbCcsXG4gICAgJ3J1bnRpbWVLZWVwYWxpdmVQdXNoJyxcbiAgICAncnVudGltZUtlZXBhbGl2ZVBvcCcsXG4gICAgJ2NhbGxVc2VyQ2FsbGJhY2snLFxuICAgICdtYXliZUV4aXQnLFxuICAgICdzYWZlU2V0VGltZW91dCcsXG4gICAgJ2FzbWpzTWFuZ2xlJyxcbiAgICAnd3JpdGVJNTNUb0k2NCcsXG4gICAgJ3dyaXRlSTUzVG9JNjRDbGFtcGVkJyxcbiAgICAnd3JpdGVJNTNUb0k2NFNpZ25hbGluZycsXG4gICAgJ3dyaXRlSTUzVG9VNjRDbGFtcGVkJyxcbiAgICAnd3JpdGVJNTNUb1U2NFNpZ25hbGluZycsXG4gICAgJ3JlYWRJNTNGcm9tSTY0JyxcbiAgICAncmVhZEk1M0Zyb21VNjQnLFxuICAgICdjb252ZXJ0STMyUGFpclRvSTUzJyxcbiAgICAnY29udmVydEkzMlBhaXJUb0k1M0NoZWNrZWQnLFxuICAgICdjb252ZXJ0VTMyUGFpclRvSTUzJyxcbiAgICAndWxlYjEyOEVuY29kZScsXG4gICAgJ3NpZ1RvV2FzbVR5cGVzJyxcbiAgICAnZ2VuZXJhdGVGdW5jVHlwZScsXG4gICAgJ2NvbnZlcnRKc0Z1bmN0aW9uVG9XYXNtJyxcbiAgICAnZ2V0RW1wdHlUYWJsZVNsb3QnLFxuICAgICd1cGRhdGVUYWJsZU1hcCcsXG4gICAgJ2FkZEZ1bmN0aW9uJyxcbiAgICAncmVtb3ZlRnVuY3Rpb24nLFxuICAgICdyZWFsbHlOZWdhdGl2ZScsXG4gICAgJ3VuU2lnbicsXG4gICAgJ3N0ckxlbicsXG4gICAgJ3JlU2lnbicsXG4gICAgJ2Zvcm1hdFN0cmluZycsXG4gICAgJ2ludEFycmF5VG9TdHJpbmcnLFxuICAgICdBc2NpaVRvU3RyaW5nJyxcbiAgICAnc3RyaW5nVG9Bc2NpaScsXG4gICAgJ1VURjE2VG9TdHJpbmcnLFxuICAgICdzdHJpbmdUb1VURjE2JyxcbiAgICAnbGVuZ3RoQnl0ZXNVVEYxNicsXG4gICAgJ1VURjMyVG9TdHJpbmcnLFxuICAgICdzdHJpbmdUb1VURjMyJyxcbiAgICAnbGVuZ3RoQnl0ZXNVVEYzMicsXG4gICAgJ2FsbG9jYXRlVVRGOCcsXG4gICAgJ3dyaXRlU3RyaW5nVG9NZW1vcnknLFxuICAgICd3cml0ZUFzY2lpVG9NZW1vcnknLFxuICAgICdnZXRTb2NrZXRGcm9tRkQnLFxuICAgICdnZXRTb2NrZXRBZGRyZXNzJyxcbiAgICAncmVnaXN0ZXJLZXlFdmVudENhbGxiYWNrJyxcbiAgICAnbWF5YmVDU3RyaW5nVG9Kc1N0cmluZycsXG4gICAgJ2ZpbmRFdmVudFRhcmdldCcsXG4gICAgJ2ZpbmRDYW52YXNFdmVudFRhcmdldCcsXG4gICAgJ2dldEJvdW5kaW5nQ2xpZW50UmVjdCcsXG4gICAgJ2ZpbGxNb3VzZUV2ZW50RGF0YScsXG4gICAgJ3JlZ2lzdGVyTW91c2VFdmVudENhbGxiYWNrJyxcbiAgICAncmVnaXN0ZXJXaGVlbEV2ZW50Q2FsbGJhY2snLFxuICAgICdyZWdpc3RlclVpRXZlbnRDYWxsYmFjaycsXG4gICAgJ3JlZ2lzdGVyRm9jdXNFdmVudENhbGxiYWNrJyxcbiAgICAnZmlsbERldmljZU9yaWVudGF0aW9uRXZlbnREYXRhJyxcbiAgICAncmVnaXN0ZXJEZXZpY2VPcmllbnRhdGlvbkV2ZW50Q2FsbGJhY2snLFxuICAgICdmaWxsRGV2aWNlTW90aW9uRXZlbnREYXRhJyxcbiAgICAncmVnaXN0ZXJEZXZpY2VNb3Rpb25FdmVudENhbGxiYWNrJyxcbiAgICAnc2NyZWVuT3JpZW50YXRpb24nLFxuICAgICdmaWxsT3JpZW50YXRpb25DaGFuZ2VFdmVudERhdGEnLFxuICAgICdyZWdpc3Rlck9yaWVudGF0aW9uQ2hhbmdlRXZlbnRDYWxsYmFjaycsXG4gICAgJ2ZpbGxGdWxsc2NyZWVuQ2hhbmdlRXZlbnREYXRhJyxcbiAgICAncmVnaXN0ZXJGdWxsc2NyZWVuQ2hhbmdlRXZlbnRDYWxsYmFjaycsXG4gICAgJ0pTRXZlbnRzX3JlcXVlc3RGdWxsc2NyZWVuJyxcbiAgICAnSlNFdmVudHNfcmVzaXplQ2FudmFzRm9yRnVsbHNjcmVlbicsXG4gICAgJ3JlZ2lzdGVyUmVzdG9yZU9sZFN0eWxlJyxcbiAgICAnaGlkZUV2ZXJ5dGhpbmdFeGNlcHRHaXZlbkVsZW1lbnQnLFxuICAgICdyZXN0b3JlSGlkZGVuRWxlbWVudHMnLFxuICAgICdzZXRMZXR0ZXJib3gnLFxuICAgICdzb2Z0RnVsbHNjcmVlblJlc2l6ZVdlYkdMUmVuZGVyVGFyZ2V0JyxcbiAgICAnZG9SZXF1ZXN0RnVsbHNjcmVlbicsXG4gICAgJ2ZpbGxQb2ludGVybG9ja0NoYW5nZUV2ZW50RGF0YScsXG4gICAgJ3JlZ2lzdGVyUG9pbnRlcmxvY2tDaGFuZ2VFdmVudENhbGxiYWNrJyxcbiAgICAncmVnaXN0ZXJQb2ludGVybG9ja0Vycm9yRXZlbnRDYWxsYmFjaycsXG4gICAgJ3JlcXVlc3RQb2ludGVyTG9jaycsXG4gICAgJ2ZpbGxWaXNpYmlsaXR5Q2hhbmdlRXZlbnREYXRhJyxcbiAgICAncmVnaXN0ZXJWaXNpYmlsaXR5Q2hhbmdlRXZlbnRDYWxsYmFjaycsXG4gICAgJ3JlZ2lzdGVyVG91Y2hFdmVudENhbGxiYWNrJyxcbiAgICAnZmlsbEdhbWVwYWRFdmVudERhdGEnLFxuICAgICdyZWdpc3RlckdhbWVwYWRFdmVudENhbGxiYWNrJyxcbiAgICAncmVnaXN0ZXJCZWZvcmVVbmxvYWRFdmVudENhbGxiYWNrJyxcbiAgICAnZmlsbEJhdHRlcnlFdmVudERhdGEnLFxuICAgICdiYXR0ZXJ5JyxcbiAgICAncmVnaXN0ZXJCYXR0ZXJ5RXZlbnRDYWxsYmFjaycsXG4gICAgJ3NldENhbnZhc0VsZW1lbnRTaXplJyxcbiAgICAnZ2V0Q2FudmFzRWxlbWVudFNpemUnLFxuICAgICdnZXRFbnZTdHJpbmdzJyxcbiAgICAnY2hlY2tXYXNpQ2xvY2snLFxuICAgICdkb1JlYWR2JyxcbiAgICAnY3JlYXRlRHluY2FsbFdyYXBwZXInLFxuICAgICdzZXRJbW1lZGlhdGVXcmFwcGVkJyxcbiAgICAnY2xlYXJJbW1lZGlhdGVXcmFwcGVkJyxcbiAgICAncG9seWZpbGxTZXRJbW1lZGlhdGUnLFxuICAgICdFeGNlcHRpb25JbmZvJyxcbiAgICAnZXhjZXB0aW9uX2FkZFJlZicsXG4gICAgJ2V4Y2VwdGlvbl9kZWNSZWYnLFxuICAgICdzZXRNYWluTG9vcCcsXG4gICAgJ19zZXROZXR3b3JrQ2FsbGJhY2snLFxuICAgICdoZWFwT2JqZWN0Rm9yV2ViR0xUeXBlJyxcbiAgICAnaGVhcEFjY2Vzc1NoaWZ0Rm9yV2ViR0xIZWFwJyxcbiAgICAnZW1zY3JpcHRlbldlYkdMR2V0JyxcbiAgICAnY29tcHV0ZVVucGFja0FsaWduZWRJbWFnZVNpemUnLFxuICAgICdlbXNjcmlwdGVuV2ViR0xHZXRUZXhQaXhlbERhdGEnLFxuICAgICdlbXNjcmlwdGVuV2ViR0xHZXRVbmlmb3JtJyxcbiAgICAnd2ViZ2xHZXRVbmlmb3JtTG9jYXRpb24nLFxuICAgICd3ZWJnbFByZXBhcmVVbmlmb3JtTG9jYXRpb25zQmVmb3JlRmlyc3RVc2UnLFxuICAgICd3ZWJnbEdldExlZnRCcmFjZVBvcycsXG4gICAgJ2Vtc2NyaXB0ZW5XZWJHTEdldFZlcnRleEF0dHJpYicsXG4gICAgJ3dyaXRlR0xBcnJheScsXG4gICAgJ1NETF91bmljb2RlJyxcbiAgICAnU0RMX3R0ZkNvbnRleHQnLFxuICAgICdTRExfYXVkaW8nLFxuICAgICdHTEZXX1dpbmRvdycsXG4gICAgJ3J1bkFuZEFib3J0SWZFcnJvcicsXG4gICAgJ0FMTE9DX05PUk1BTCcsXG4gICAgJ0FMTE9DX1NUQUNLJyxcbiAgICAnYWxsb2NhdGUnXG4gIF1cbiAgbWlzc2luZ0xpYnJhcnlTeW1ib2xzLmZvckVhY2gobWlzc2luZ0xpYnJhcnlTeW1ib2wpXG5cbiAgdmFyIGNhbGxlZFJ1blxuXG4gIGRlcGVuZGVuY2llc0Z1bGZpbGxlZCA9IGZ1bmN0aW9uIHJ1bkNhbGxlcigpIHtcbiAgICAvLyBJZiBydW4gaGFzIG5ldmVyIGJlZW4gY2FsbGVkLCBhbmQgd2Ugc2hvdWxkIGNhbGwgcnVuIChJTlZPS0VfUlVOIGlzIHRydWUsIGFuZCBNb2R1bGUubm9Jbml0aWFsUnVuIGlzIG5vdCBmYWxzZSlcbiAgICBpZiAoIWNhbGxlZFJ1bikgcnVuKClcbiAgICBpZiAoIWNhbGxlZFJ1bikgZGVwZW5kZW5jaWVzRnVsZmlsbGVkID0gcnVuQ2FsbGVyIC8vIHRyeSB0aGlzIGFnYWluIGxhdGVyLCBhZnRlciBuZXcgZGVwcyBhcmUgZnVsZmlsbGVkXG4gIH1cblxuICBmdW5jdGlvbiBjYWxsTWFpbihhcmdzKSB7XG4gICAgYXNzZXJ0KFxuICAgICAgcnVuRGVwZW5kZW5jaWVzID09IDAsXG4gICAgICAnY2Fubm90IGNhbGwgbWFpbiB3aGVuIGFzeW5jIGRlcGVuZGVuY2llcyByZW1haW4hIChsaXN0ZW4gb24gTW9kdWxlW1wib25SdW50aW1lSW5pdGlhbGl6ZWRcIl0pJ1xuICAgIClcbiAgICBhc3NlcnQoXG4gICAgICBfX0FUUFJFUlVOX18ubGVuZ3RoID09IDAsXG4gICAgICAnY2Fubm90IGNhbGwgbWFpbiB3aGVuIHByZVJ1biBmdW5jdGlvbnMgcmVtYWluIHRvIGJlIGNhbGxlZCdcbiAgICApXG5cbiAgICB2YXIgZW50cnlGdW5jdGlvbiA9IE1vZHVsZVsnX21haW4nXVxuXG4gICAgYXJncyA9IGFyZ3MgfHwgW11cbiAgICBhcmdzLnVuc2hpZnQodGhpc1Byb2dyYW0pXG5cbiAgICB2YXIgYXJnYyA9IGFyZ3MubGVuZ3RoXG4gICAgdmFyIGFyZ3YgPSBzdGFja0FsbG9jKChhcmdjICsgMSkgKiA0KVxuICAgIHZhciBhcmd2X3B0ciA9IGFyZ3YgPj4gMlxuICAgIGFyZ3MuZm9yRWFjaCgoYXJnKSA9PiB7XG4gICAgICBIRUFQMzJbYXJndl9wdHIrK10gPSBhbGxvY2F0ZVVURjhPblN0YWNrKGFyZylcbiAgICB9KVxuICAgIEhFQVAzMlthcmd2X3B0cl0gPSAwXG5cbiAgICB0cnkge1xuICAgICAgdmFyIHJldCA9IGVudHJ5RnVuY3Rpb24oYXJnYywgYXJndilcblxuICAgICAgLy8gSW4gUFJPWFlfVE9fUFRIUkVBRCBidWlsZHMsIHdlIHNob3VsZCBuZXZlciBleGl0IHRoZSBydW50aW1lIGJlbG93LCBhc1xuICAgICAgLy8gZXhlY3V0aW9uIGlzIGFzeW5jaHJvbm91c2x5IGhhbmRlZCBvZmYgdG8gYSBwdGhyZWFkLlxuICAgICAgLy8gaWYgd2UncmUgbm90IHJ1bm5pbmcgYW4gZXZlbnRlZCBtYWluIGxvb3AsIGl0J3MgdGltZSB0byBleGl0XG4gICAgICBleGl0SlMocmV0LCAvKiBpbXBsaWNpdCA9ICovIHRydWUpXG4gICAgICByZXR1cm4gcmV0XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGhhbmRsZUV4Y2VwdGlvbihlKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YWNrQ2hlY2tJbml0KCkge1xuICAgIC8vIFRoaXMgaXMgbm9ybWFsbHkgY2FsbGVkIGF1dG9tYXRpY2FsbHkgZHVyaW5nIF9fd2FzbV9jYWxsX2N0b3JzIGJ1dCBuZWVkIHRvXG4gICAgLy8gZ2V0IHRoZXNlIHZhbHVlcyBiZWZvcmUgZXZlbiBydW5uaW5nIGFueSBvZiB0aGUgY3RvcnMgc28gd2UgY2FsbCBpdCByZWR1bmRhbnRseVxuICAgIC8vIGhlcmUuXG4gICAgX2Vtc2NyaXB0ZW5fc3RhY2tfaW5pdCgpXG4gICAgLy8gVE9ETyhzYmMpOiBNb3ZlIHdyaXRlU3RhY2tDb29raWUgdG8gbmF0aXZlIHRvIHRvIGF2b2lkIHRoaXMuXG4gICAgd3JpdGVTdGFja0Nvb2tpZSgpXG4gIH1cblxuICAvKiogQHR5cGUge2Z1bmN0aW9uKEFycmF5PSl9ICovXG4gIGZ1bmN0aW9uIHJ1bihhcmdzKSB7XG4gICAgYXJncyA9IGFyZ3MgfHwgYXJndW1lbnRzX1xuXG4gICAgaWYgKHJ1bkRlcGVuZGVuY2llcyA+IDApIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHN0YWNrQ2hlY2tJbml0KClcblxuICAgIHByZVJ1bigpXG5cbiAgICAvLyBhIHByZVJ1biBhZGRlZCBhIGRlcGVuZGVuY3ksIHJ1biB3aWxsIGJlIGNhbGxlZCBsYXRlclxuICAgIGlmIChydW5EZXBlbmRlbmNpZXMgPiAwKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkb1J1bigpIHtcbiAgICAgIC8vIHJ1biBtYXkgaGF2ZSBqdXN0IGJlZW4gY2FsbGVkIHRocm91Z2ggZGVwZW5kZW5jaWVzIGJlaW5nIGZ1bGZpbGxlZCBqdXN0IGluIHRoaXMgdmVyeSBmcmFtZSxcbiAgICAgIC8vIG9yIHdoaWxlIHRoZSBhc3luYyBzZXRTdGF0dXMgdGltZSBiZWxvdyB3YXMgaGFwcGVuaW5nXG4gICAgICBpZiAoY2FsbGVkUnVuKSByZXR1cm5cbiAgICAgIGNhbGxlZFJ1biA9IHRydWVcbiAgICAgIE1vZHVsZVsnY2FsbGVkUnVuJ10gPSB0cnVlXG5cbiAgICAgIGlmIChBQk9SVCkgcmV0dXJuXG5cbiAgICAgIGluaXRSdW50aW1lKClcblxuICAgICAgcHJlTWFpbigpXG5cbiAgICAgIGlmIChNb2R1bGVbJ29uUnVudGltZUluaXRpYWxpemVkJ10pIE1vZHVsZVsnb25SdW50aW1lSW5pdGlhbGl6ZWQnXSgpXG5cbiAgICAgIGlmIChzaG91bGRSdW5Ob3cpIGNhbGxNYWluKGFyZ3MpXG5cbiAgICAgIHBvc3RSdW4oKVxuICAgIH1cblxuICAgIGlmIChNb2R1bGVbJ3NldFN0YXR1cyddKSB7XG4gICAgICBNb2R1bGVbJ3NldFN0YXR1cyddKCdSdW5uaW5nLi4uJylcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBNb2R1bGVbJ3NldFN0YXR1cyddKCcnKVxuICAgICAgICB9LCAxKVxuICAgICAgICBkb1J1bigpXG4gICAgICB9LCAxKVxuICAgIH0gZWxzZSB7XG4gICAgICBkb1J1bigpXG4gICAgfVxuICAgIGNoZWNrU3RhY2tDb29raWUoKVxuICB9XG5cbiAgaWYgKE1vZHVsZVsncHJlSW5pdCddKSB7XG4gICAgaWYgKHR5cGVvZiBNb2R1bGVbJ3ByZUluaXQnXSA9PSAnZnVuY3Rpb24nKVxuICAgICAgTW9kdWxlWydwcmVJbml0J10gPSBbTW9kdWxlWydwcmVJbml0J11dXG4gICAgd2hpbGUgKE1vZHVsZVsncHJlSW5pdCddLmxlbmd0aCA+IDApIHtcbiAgICAgIE1vZHVsZVsncHJlSW5pdCddLnBvcCgpKClcbiAgICB9XG4gIH1cblxuICAvLyBzaG91bGRSdW5Ob3cgcmVmZXJzIHRvIGNhbGxpbmcgbWFpbigpLCBub3QgcnVuKCkuXG4gIHZhciBzaG91bGRSdW5Ob3cgPSB0cnVlXG5cbiAgaWYgKE1vZHVsZVsnbm9Jbml0aWFsUnVuJ10pIHNob3VsZFJ1bk5vdyA9IGZhbHNlXG5cbiAgcnVuKClcbn1cbiJdLCJuYW1lcyI6WyJlcnIiLCJyZWFkQmluYXJ5IiwicmVhZEFzeW5jIiwibW9kdWxlIiwiZXhwb3J0cyIsImJ1ZmZlciIsImVycm5vIiwieGhyIiwibGF6eUFycmF5IiwiYnl0ZUFycmF5IiwiYXJncyIsInJldCJdLCJtYXBwaW5ncyI6Ijs7QUFDQSxNQUFJLE9BQU8sQ0FBQTtBQUNYLGNBQVksU0FBVSxPQUFPO0FBQzNCLFlBQVEsTUFBTSxLQUFLLFdBQVM7QUFBQSxNQUMxQixLQUFLO0FBQ0gsZUFBTyxNQUFNLEtBQUs7QUFDbEIsYUFBSTtBQUNKO0FBQUEsSUFDTjtBQUFBLEVBQ0E7QUFFQSxXQUFTLE9BQU87QUFjZCxRQUFJLFNBQVMsT0FBTyxVQUFVLGNBQWMsU0FBUyxDQUFBO0FBZXJELFFBQUksa0JBQWtCLE9BQU8sT0FBTyxDQUFBLEdBQUksTUFBTTtBQUU5QyxRQUFJLGFBQWE7QUFDakIsUUFBSSxjQUFjO0FB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SCxHQUFHO0FBQUEsTUFDSCxJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsSUFDVDtBQUVFLFFBQUksY0FBYyxDQUFBO0FBQ2xCLFFBQUksS0FBSztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sUUFBUSxDQUFBO0FBQUEsTUFDUixTQUFTLENBQUE7QUFBQSxNQUNULFNBQVMsQ0FBQTtBQUFBLE1BQ1QsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLE1B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QSxNQUNULFNBQVM7QUFBQSxNQUNULFdBQVc7QUFBQSxNQUNYLFFBQVE7QUFBQSxNQUNSLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxNQUNULE9BQU87QUFBQSxNQUNQLE9BQU87QUFBQSxNQUNQLFFBQVE7QUFBQSxNQUNSLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxNQUNULFNBQVM7QUFBQSxNQUNULE1BQU07QUFBQSxNQUNOLFFBQVE7QUFBQSxNQUNSLE9BQU87QUFBQSxNQUNQLFFBQVE7QUFBQSxNQUNSLFdBQVc7QUFBQSxNQUNYLFNBQVM7QUFBQSxNQUNULFNBQVM7QUFBQSxNQUNULFVBQVU7QUFBQSxNQUNWLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxNQUNULFNBQVM7QUFBQSxNQUNULFNBQVM7QUFBQSxNQUNULFNBQVM7QUFBQSxNQUNULFNBQVM7QUFBQSxNQUNULFVBQVU7QUFBQSxNQUNWLFFBQVE7QUFBQSxNQUNSLFdBQVc7QUFBQSxNQUNYLGNBQWM7QUFBQSxNQUNkLE9BQU87QUFBQSxNQUNQLFlBQVk7QUFBQSxNQUNaLGNBQWM7QUFBQSxNQUNkLFlBQVk7QUFBQSxNQUNaLFNBQVM7QUFBQSxNQUNULGNBQWM7QUFBQSxNQUNkLFlBQVk7QUFBQSxNQUNaLFVBQVU7QUFBQSxNQUNWLGFBQWE7QUFBQSxNQUNiLFdBQVc7QUFBQSxNQUNYLGNBQWM7QUFBQSxNQUNkLFlBQVk7QUFBQSxNQUNaLGNBQWM7QUFBQSxNQUNkLGFBQWE7QUFBQSxNQUNiLFVBQVU7QUFBQSxNQUNWLFdBQVc7QUFBQSxNQUNYLFdBQVc7QUFBQSxNQUNYLGNBQWM7QUFBQSxNQUNkLGFBQWE7QUFBQSxNQUNiLFVBQVU7QUFBQSxNQUNWLGNBQWM7QUFBQSxNQUNkLFVBQVU7QUFBQSxNQUNWLGlCQUFpQjtBQUFBLE1BQ2pCLGlCQUFpQjtBQUFBLE1BQ2pCLGVBQWU7QUFBQSxNQUNmLFdBQVc7QUFBQSxNQUNYLFNBQVM7QUFBQSxNQUNULFVBQVU7QUFBQSxNQUNWLGNBQWM7QUFBQSxNQUNkLFFBQVE7QUFBQSxNQUNSLFFB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QUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNKO0FBQ0UsNkJBQXlCLFFBQVEsdUJBQXVCO0FBQ3hELFFBQUksd0JBQXdCO0FBQUEsTUFDMUI7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0o7QUFDRSwwQkFBc0IsUUFBUSxvQkFBb0I7QUFFbEQsUUFBSTtBQUVKLDRCQUF3QixTQUFTLFlBQVk7QUFFM0MsVUFBSSxDQUFDLFVBQVcsS0FBRztBQUNuQixVQUFJLENBQUMsVUFBVyx5QkFBd0I7QUFBQSxJQUMxQztBQUVBLGFBQVMsU0FBU0QsT0FBTTtBQUN0QjtBQUFBLFFBQ0UsbUJBQW1CO0FBQUEsUUFDbkI7QUFBQSxNQUNOO0FBQ0k7QUFBQSxRQUNFLGFBQWEsVUFBVTtBQUFBLFFBQ3ZCO0FBQUEsTUFDTjtBQUVJLFVBQUksZ0JBQWdCLE9BQU8sT0FBTztBQUVsQyxNQUFBQSxRQUFPQSxTQUFRLENBQUE7QUFDZixNQUFBQSxNQUFLLFFBQVEsV0FBVztBQUV4QixVQUFJLE9BQU9BLE1BQUs7QUFDaEIsVUFBSSxPQUFPLFlBQVksT0FBTyxLQUFLLENBQUM7QUFDcEMsVUFBSSxXQUFXLFFBQVE7QUFDdkIsTUFBQUEsTUFBSyxRQUFRLENBQUMsUUFBUTtBQUNwQixlQUFPLFVBQVUsSUFBSSxvQkFBb0IsR0FBRztBQUFBLE1BQzlDLENBQUM7QUFDRCxhQUFPLFFBQVEsSUFBSTtBQUVuQixVQUFJO0FBQ0YsWUFBSSxNQUFNLGNBQWMsTUFBTSxJQUFJO0FBS2xDO0FBQUEsVUFBTztBQUFBO0FBQUEsVUFBc0I7QUFBQSxRQUFJO0FBQ2pDLGVBQU87QUFBQSxNQUNULFNBQVMsR0FBRztBQUNWLGVBQU8sZ0JBQWdCLENBQUM7QUFBQSxNQUMxQjtBQUFBLElBQ0Y7QUFFQSxhQUFTLGlCQUFpQjtBQUl4Qiw2QkFBc0I7QUFFdEIsdUJBQWdCO0FBQUEsSUFDbEI7QUFHQSxhQUFTLElBQUlBLE9BQU07QUFDakIsTUFBQUEsUUFBT0EsU0FBUTtBQUVmLFVBQUksa0JBQWtCLEdBQUc7QUFDdkI7QUFBQSxNQUNGO0FBRUEscUJBQWM7QUFFZCxhQUFNO0FBR04sVUFBSSxrQkFBa0IsR0FBRztBQUN2QjtBQUFBLE1BQ0Y7QUFFQSxlQUFTLFFBQVE7QUFHZixZQUFJLFVBQVc7QUFDZixvQkFBWTtBQUNaLGVBQU8sV0FBVyxJQUFJO0FBRXRCLFlBQUksTUFBTztBQUVYLG9CQUFXO0FBRVgsZ0JBQU87QUFFUCxZQUFJLE9BQU8sc0JBQXNCLEVBQUcsUUFBTyxzQkFBc0IsRUFBQztBQUVsRSxZQUFJLGFBQWMsVUFBU0EsS0FBSTtBQUUvQixnQkFBTztBQUFBLE1BQ1Q7QUFFQSxVQUFJLE9BQU8sV0FBVyxHQUFHO0FBQ3ZCLGVBQU8sV0FBVyxFQUFFLFlBQVk7QUFDaEMsbUJBQVcsV0FBWTtBQUNyQixxQkFBVyxXQUFZO0FBQ3JCLG1CQUFPLFdBQVcsRUFBRSxFQUFFO0FBQUEsVUFDeEIsR0FBRyxDQUFDO0FBQ0osZ0JBQUs7QUFBQSxRQUNQLEdBQUcsQ0FBQztBQUFBLE1BQ04sT0FBTztBQUNMLGNBQUs7QUFBQSxNQUNQO0FBQ0EsdUJBQWdCO0FBQUEsSUFDbEI7QUFFQSxRQUFJLE9BQU8sU0FBUyxHQUFHO0FBQ3JCLFVBQUksT0FBTyxPQUFPLFNBQVMsS0FBSztBQUM5QixlQUFPLFNBQVMsSUFBSSxDQUFDLE9BQU8sU0FBUyxDQUFDO0FBQ3hDLGFBQU8sT0FBTyxTQUFTLEVBQUUsU0FBUyxHQUFHO0FBQ25DLGVBQU8sU0FBUyxFQUFFLElBQUcsRUFBRTtBQUFBLE1BQ3pCO0FBQUEsSUFDRjtBQUdBLFFBQUksZUFBZTtBQUVuQixRQUFJLE9BQU8sY0FBYyxFQUFHLGdCQUFlO0FBRTNDLFFBQUc7QUFBQSxFQUNMOzsifQ==
