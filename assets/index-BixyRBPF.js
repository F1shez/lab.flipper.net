import { k as useFlipperStore, A as api, l as showNotif, t as logger, P as PB, v as rpcErrorHandler, B as unpack, D as sleep, b as QItem, Q as QItemSection, a as QItemLabel, E as QChip, i as QCard, j as QCardSection, p as QCardActions, h as QDialog, y as QPage, C as ClosePopup } from "./KeypadButton.vue_vue_type_style_index_0_scoped_4cc0fc91_lang-B0Vue97M.js";
import { L as Loading } from "./Loading-BTUYxxy7.js";
import { d as defineComponent, c as computed, a as ref, _ as _export_sfc, n as createElementBlock, f as openBlock, p as createBaseVNode, t as toDisplayString, $ as normalizeStyle, m as withDirectives, j as createVNode, k as QIcon, v as vShow, a0 as normalizeClass, S as onMounted, e as createBlock, i as createCommentVNode, Q as QBtn, F as Fragment, l as createTextVNode, g as withCtx, W as normalizeProps, X as guardReactiveProps, a3 as resolveComponent, q as renderList, w as watch, U as onBeforeUnmount, R as nextTick, s as mergeProps } from "./index-BXn1qSjA.js";
import "./axios-Djb__N3o.js";
import { Q as QSelect } from "./QSelect--lwtQ9LH.js";
import { Q as QFile } from "./QFile-0l0Wo5F5.js";
import { Q as QHeader } from "./QHeader-DRe5-O3Z.js";
import { Q as QLayout, a as QPageContainer } from "./QLayout-vB8hADbe.js";
import { Q as QFooter } from "./QFooter-DIIfUPmk.js";
import { s as semver } from "./ExpandView.vue_vue_type_style_index_0_scoped_b095a25b_lang-D7JlrLB5.js";
import { P as ProgressBar } from "./ProgressBar-DN3VEbL3.js";
import "./QList-YariPQfx.js";
import "./QSpace-CENODZda.js";
import "./QTooltip-COHn7rMY.js";
import { F as FrameRenderer } from "./frameRenderer-DjEIeLsf.js";
import { b as bytesToSize } from "./bytesToSize-DDOkA4vd.js";
import "./_commonjsHelpers-BruQt46T.js";
import "./use-file-dom-props-CkTfPNnd.js";
import "./QMenu-OiOcQlb1.js";
import "./private.use-form-DlR7USk8.js";
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "Body",
  props: {
    flipperName: {},
    flipperColor: { default: "2" },
    showScreenUpdating: { type: Boolean, default: false },
    isScreenStream: { type: Boolean, default: false },
    screenScale: { default: 1 },
    orientation: { default: 0 }
  },
  emits: ["expandView"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const flipperBodyClass = computed(() => {
      switch (props.flipperColor) {
        case "1":
          return "body-black";
        case "3":
          return "body-transparent";
        default:
          return "body-white";
      }
    });
    const rotationCalculation = computed(() => {
      switch (props.orientation) {
        case 1:
          return 2;
        default:
          return 0;
      }
    });
    const expandView = () => {
      emit("expandView");
    };
    const screenStreamCanvas = ref();
    __expose({
      screenStreamCanvas
    });
    const __returned__ = { props, emit, flipperBodyClass, rotationCalculation, expandView, screenStreamCanvas };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _imports_0 = "/lab.flipper.net/assets/flipper-screen-updating-B7g1qFjn.png";
const _hoisted_1$4 = { class: "column items-center" };
const _hoisted_2$3 = { class: "q-mb-md q-mt-none text-bold" };
const _hoisted_3$3 = {
  key: 0,
  class: "flipper__image",
  src: _imports_0,
  style: {}
};
const _hoisted_4$2 = ["width", "height"];
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$4, [
    createBaseVNode("h5", _hoisted_2$3, toDisplayString($setup.props.flipperName), 1),
    createBaseVNode("div", {
      class: normalizeClass(["flipper relative-position", $setup.flipperBodyClass])
    }, [
      $props.showScreenUpdating ? (openBlock(), createElementBlock("img", _hoisted_3$3)) : (openBlock(), createElementBlock("div", {
        key: 1,
        class: "flipper__display-wrapper relative-position",
        style: normalizeStyle(`width: ${128 * $props.screenScale}px; height: ${64 * $props.screenScale}px; rotate: ${90 * $setup.rotationCalculation}deg;`)
      }, [
        createBaseVNode("div", {
          class: "flipper__expand-wrapper absolute-center cursor-pointer",
          onClick: $setup.expandView
        }, [
          _cache[0] || (_cache[0] = createBaseVNode("div", { class: "dimmed" }, null, -1)),
          createVNode(QIcon, {
            class: "absolute-center",
            name: "mdi-arrow-expand",
            size: "64px",
            color: "primary"
          })
        ]),
        withDirectives(createBaseVNode("canvas", {
          width: 128 * $props.screenScale,
          height: 64 * $props.screenScale,
          style: { "image-rendering": "pixelated" },
          ref: "screenStreamCanvas"
        }, null, 8, _hoisted_4$2), [
          [vShow, $props.isScreenStream]
        ])
      ], 4))
    ], 2)
  ]);
}
const FlipperBody = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5], ["__scopeId", "data-v-928094c0"], ["__file", "Body.vue"]]);
const getRadioStackType = (type) => {
  let intRadioStackType;
  if (type) {
    intRadioStackType = parseInt(type);
  }
  switch (intRadioStackType) {
    case 1:
      return "full";
    case 2:
      return "BLE_HCI";
    case 3:
      return "light";
    case 4:
      return "BLE_BEACON";
    case 5:
      return "BLE_BASIC";
    case 6:
      return "BLE_FULL_EXT_ADV";
    case 7:
      return "BLE_HCI_EXT_ADV";
    case 16:
      return "THREAD_FTD";
    case 17:
      return "THREAD_MTD";
    case 48:
      return "ZIGBEE_FFD";
    case 49:
      return "ZIGBEE_RFD";
    case 64:
      return "MAC";
    case 80:
      return "BLE_THREAD_FTD_STATIC";
    case 81:
      return "BLE_THREAD_FTD_DYAMIC";
    case 96:
      return "802154_LLD_TESTS";
    case 97:
      return "802154_PHY_VALID";
    case 98:
      return "BLE_PHY_VALID";
    case 99:
      return "BLE_LLD_TESTS";
    case 100:
      return "BLE_RLV";
    case 101:
      return "802154_RLV";
    case 112:
      return "BLE_ZIGBEE_FFD_STATIC";
    case 113:
      return "BLE_ZIGBEE_RFD_STATIC";
    case 120:
      return "BLE_ZIGBEE_FFD_DYNAMIC";
    case 121:
      return "BLE_ZIGBEE_RFD_DYNAMIC";
    case 128:
      return "RLV";
    case 144:
      return "BLE_MAC_STATIC";
    default:
      return "Unknown";
  }
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "Info",
  props: {
    firmwareVersion: {},
    buildDate: {},
    sdCardUsage: {},
    databaseStatus: {},
    hardwareVersion: {},
    radioVersion: {},
    radioStackType: {}
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const _radioStackType = computed(() => {
      return getRadioStackType(props.radioStackType);
    });
    const __returned__ = { props, _radioStackType };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$3 = { class: "info" };
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$3, [
    createBaseVNode("p", null, [
      _cache[0] || (_cache[0] = createBaseVNode("span", null, "Firmware:", -1)),
      createBaseVNode("span", null, toDisplayString($props.firmwareVersion), 1)
    ]),
    createBaseVNode("p", null, [
      _cache[1] || (_cache[1] = createBaseVNode("span", null, "Build date:", -1)),
      createBaseVNode("span", null, toDisplayString($props.buildDate), 1)
    ]),
    createBaseVNode("p", null, [
      _cache[2] || (_cache[2] = createBaseVNode("span", null, "SD card:", -1)),
      createBaseVNode("span", null, toDisplayString($props.sdCardUsage), 1)
    ]),
    createBaseVNode("p", null, [
      _cache[3] || (_cache[3] = createBaseVNode("span", null, "Databases:", -1)),
      createBaseVNode("span", null, toDisplayString($props.databaseStatus), 1)
    ]),
    createBaseVNode("p", null, [
      _cache[4] || (_cache[4] = createBaseVNode("span", null, "Hardware:", -1)),
      createBaseVNode("span", null, toDisplayString($props.hardwareVersion), 1)
    ]),
    createBaseVNode("p", null, [
      _cache[5] || (_cache[5] = createBaseVNode("span", null, "Radio FW:", -1)),
      createBaseVNode("span", null, toDisplayString($props.radioVersion), 1)
    ]),
    createBaseVNode("p", null, [
      _cache[6] || (_cache[6] = createBaseVNode("span", null, "Radio stack:", -1)),
      createBaseVNode("span", null, toDisplayString($setup._radioStackType), 1)
    ])
  ]);
}
const FlipperInfo = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["__scopeId", "data-v-f8417b34"], ["__file", "Info.vue"]]);
const formatGitHubUrl = (url) => {
  const pullMatch = url.match(/\/pull\/(\d+)/);
  if (pullMatch) {
    return `[#${pullMatch[1]}](${url})`;
  }
  const compareMatch = url.match(/\/compare\/([^\/]+)\.\.\.([^\/]+)/);
  if (compareMatch) {
    return `[${compareMatch[1]}...${compareMatch[2]}](${url})`;
  }
  return `[${url}](${url})`;
};
const replaceGitHubLinksInMarkdown = (markdown) => {
  markdown = markdown.replace(
    /\[([^\]]+)\]\((https:\/\/github\.com\/[^\/]+\/[^\/]+\/(?:pull\/\d+|compare\/[^\/]+\.\.\.[^\/]+))\)/g,
    (_match, _text, url) => {
      return formatGitHubUrl(url);
    }
  );
  markdown = markdown.replace(
    new RegExp("(?<!\\]\\()https:\\/\\/github\\.com\\/[^\\/]+\\/[^\\/]+\\/(?:pull\\/\\d+|compare\\/[^\\/]+\\.\\.\\.[^\\/]+)", "g"),
    (url) => formatGitHubUrl(url)
  );
  return markdown;
};
const componentName$1 = "FlipperUpdate";
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Update",
  emits: ["updateInProgress"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const flipperStore = useFlipperStore();
    const { fetchChannels, fetchRegions, fetchFirmware } = api;
    const outdated = ref(false);
    const ableToUpdate = ref(true);
    const aheadOfRelease = ref(false);
    const installFromFile = ref(true);
    const uploadedFile = ref();
    const uploadPopup = ref(false);
    const changelogDialog = ref(false);
    const overrideDevRegion = ref(false);
    const updateError = ref(false);
    const channels = ref([]);
    const getChannel = (channelId) => {
      if (channels.value.length) {
        return channels.value.find((channel) => channel.id === channelId);
      }
      return void 0;
    };
    const isTgzCustomFile = ref(false);
    const isTargetCustomFile = ref(false);
    const fwOptions = ref({
      release: {
        label: "Release",
        selectLabel: "Release",
        selectDescription: "Stable release (recommended)",
        value: "release",
        version: "",
        changelog: "",
        color: "positive"
      },
      rc: {
        label: "RC",
        selectLabel: "Release-Candidate",
        selectDescription: "Pre-release under testing",
        value: "release-candidate",
        version: "",
        changelog: "",
        color: "accent"
      },
      dev: {
        label: "Dev",
        selectLabel: "Development",
        selectDescription: "Daily unstable build, lots of bugs",
        value: "development",
        version: "",
        changelog: "",
        color: "negative"
      }
    });
    const fwModel = ref(fwOptions.value.release);
    const emit = __emit;
    onMounted(async () => {
      var _a, _b, _c, _d, _e, _f, _g;
      channels.value = await fetchChannels().catch((error) => {
        showNotif({
          message: "Unable to load firmware channels from the build server.",
          color: "negative",
          actions: [
            {
              label: "Reload",
              color: "white",
              handler: () => {
                location.reload();
              }
            }
          ]
        });
        logger.error({
          context: componentName$1,
          message: "failed to fetch update channels"
        });
        throw error;
      });
      if (channels.value.length) {
        fwOptions.value.release.version = ((_a = getChannel("release")) == null ? void 0 : _a.versions[0].version) || "";
        fwOptions.value.rc.version = ((_b = getChannel("release-candidate")) == null ? void 0 : _b.versions[0].version) || "";
        fwOptions.value.dev.version = ((_c = getChannel("development")) == null ? void 0 : _c.versions[0].version) || "";
        fwOptions.value.release.changelog = replaceGitHubLinksInMarkdown(
          ((_d = getChannel("release")) == null ? void 0 : _d.versions[0].changelog) || ""
        );
        fwOptions.value.rc.changelog = replaceGitHubLinksInMarkdown(
          ((_e = getChannel("release-candidate")) == null ? void 0 : _e.versions[0].changelog) || ""
        );
        fwOptions.value.dev.changelog = replaceGitHubLinksInMarkdown(
          ((_f = getChannel("development")) == null ? void 0 : _f.versions[0].changelog) || ""
        );
        const customChannel = getChannel("custom");
        const customFile = (_g = customChannel == null ? void 0 : customChannel.versions[0]) == null ? void 0 : _g.files.find(
          (_file) => _file.url.endsWith("tgz")
        );
        if (customFile) {
          isTgzCustomFile.value = true;
          if (customFile.target === flipperStore.target) {
            isTargetCustomFile.value = true;
          } else {
            isTargetCustomFile.value = false;
          }
        } else {
          isTgzCustomFile.value = false;
        }
        if (customChannel && customFile && isTgzCustomFile.value && isTargetCustomFile.value) {
          fwOptions.value.custom = {
            label: customChannel.title,
            selectLabel: customChannel.title,
            selectDescription: "",
            value: "custom",
            version: customChannel.versions[0].version,
            changelog: "",
            color: "dark"
          };
          fwModel.value = fwOptions.value.custom;
        }
      }
      compareVersions();
      if (new URLSearchParams(location.search).get("overrideDevRegion") === "true") {
        overrideDevRegion.value = true;
      }
    });
    const compareVersions = () => {
      var _a, _b, _c, _d;
      if (semver.lt(
        ((_a = flipperStore.info) == null ? void 0 : _a.protobuf.version.major) + "." + ((_b = flipperStore.info) == null ? void 0 : _b.protobuf.version.minor) + ".0",
        "0.6.0"
      )) {
        ableToUpdate.value = false;
      }
      if ((_c = flipperStore.info) == null ? void 0 : _c.firmware.version) {
        if (flipperStore.info.firmware.version !== "unknown" && semver.valid(flipperStore.info.firmware.version)) {
          const releaseVersion = (_d = getChannel("release")) == null ? void 0 : _d.versions[0].version;
          if (releaseVersion) {
            if (semver.eq(flipperStore.info.firmware.version, releaseVersion)) {
              outdated.value = false;
            } else if (semver.gt(flipperStore.info.firmware.version, releaseVersion)) {
              outdated.value = false;
              aheadOfRelease.value = true;
            } else {
              outdated.value = true;
            }
          } else {
            outdated.value = true;
          }
        } else {
          outdated.value = void 0;
        }
      }
    };
    const getTextButton = computed(() => {
      var _a;
      if (fwModel.value.version === ((_a = flipperStore.info) == null ? void 0 : _a.firmware.version)) {
        return "Reinstall";
      }
      if (outdated.value) {
        return "Update";
      }
      return "Install";
    });
    const update = async (fromFile = false) => {
      var _a, _b;
      updateStage.value = "";
      if (!((_b = (_a = flipperStore.info) == null ? void 0 : _a.storage.sdcard) == null ? void 0 : _b.status.isInstalled)) {
        flipperStore.dialogs.microSDcardMissing = true;
        return;
      }
      flipperStore.onUpdateStage("start");
      if (fromFile) {
        if (!uploadedFile.value) {
          updateError.value = true;
          flipperStore.onUpdateStage("end");
          updateStage.value = "No file selected";
          throw new Error(updateStage.value);
        } else if (!uploadedFile.value.name.endsWith(".tgz")) {
          updateError.value = true;
          flipperStore.onUpdateStage("end");
          updateStage.value = "Wrong file format";
          throw new Error(updateStage.value);
        }
        logger.info({
          context: componentName$1,
          message: "Uploading firmware from file"
        });
      }
      await emit("updateInProgress");
      await loadFirmware().catch((error) => {
        updateError.value = true;
        updateStage.value = error.message || error.toString();
        flipperStore.onUpdateStage("end");
        throw error;
      });
    };
    const updateStage = ref("");
    const write = ref({
      filename: "",
      progress: 0
    });
    const loadFirmware = async () => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
      updateStage.value = "Loading firmware bundle...";
      if (((_a = flipperStore.info) == null ? void 0 : _a.hardware.region) !== "0" || overrideDevRegion.value) {
        const regions = await fetchRegions().catch(
          (error) => {
            showNotif({
              message: "Failed to fetch regional update information",
              color: "negative",
              actions: [
                {
                  label: "Reload",
                  color: "white",
                  handler: () => {
                    location.reload();
                  }
                }
              ]
            });
            logger.error({
              context: componentName$1,
              message: `Failed to fetch regional update information: ${error.toString()}`
            });
            throw error;
          }
        );
        let bands;
        if (regions.countries[regions.country]) {
          bands = regions.countries[regions.country].map((e) => regions.bands[e]);
        } else {
          bands = regions.default.map((e) => regions.bands[e]);
          regions.country = "JP";
        }
        const options = {
          countryCode: regions.country,
          bands: []
        };
        for (const band of bands) {
          const bandOptions = {
            start: band.start,
            end: band.end,
            powerLimit: band.max_power,
            dutyCycle: band.duty_cycle
          };
          const message2 = PB.Region.Band.create(bandOptions);
          options.bands.push(message2);
        }
        if (updateError.value) {
          return;
        }
        options.countryCode = new TextEncoder().encode(regions.country);
        const message = PB.Region.create(options);
        const encoded = new Uint8Array(
          PB.Region.encodeDelimited(message).finish()
        ).slice(1);
        await ((_b = flipperStore.flipper) == null ? void 0 : _b.RPC("storageWrite", {
          path: "/int/.region_data",
          buffer: encoded
        }).catch((error) => {
          const command = "storageWrite";
          rpcErrorHandler({ componentName: componentName$1, error, command });
          throw new Error(
            `${componentName$1}: RPC error in command '${command}': ${error.toString()}`
          );
        }));
      }
      if (updateError.value) {
        return;
      }
      const channel = getChannel(fwModel.value.value);
      if (uploadedFile.value || channel) {
        let files;
        if (uploadedFile.value) {
          const buffer = await uploadedFile.value.arrayBuffer();
          files = await unpack(buffer).then((value) => {
            logger.debug({
              context: componentName$1,
              message: "Unpacked firmware"
            });
            return value;
          });
        } else {
          const file = channel == null ? void 0 : channel.versions[0].files.find(
            (_file) => _file.target === flipperStore.target && _file.type === "update_tgz"
          );
          if (file) {
            files = await fetchFirmware(file.url).then((value) => {
              logger.debug({
                context: componentName$1,
                message: `Downloaded firmware from ${file.url}`
              });
              return value;
            }).catch((error) => {
              updateError.value = true;
              updateStage.value = error.toString();
              showNotif({
                message: "Failed to fetch firmware: " + error.toString(),
                color: "negative",
                actions: [
                  {
                    label: "Reload",
                    color: "white",
                    handler: () => {
                      location.reload();
                    }
                  }
                ]
              });
              const message = `${componentName$1}: Failed to fetch firmware: ${error.toString()}`;
              logger.error({
                context: componentName$1,
                message
              });
              throw new Error(message);
            });
          }
        }
        updateStage.value = "Loading firmware files";
        if (updateError.value) {
          return;
        }
        let path = "/ext/update/";
        const updateDir = await ((_c = flipperStore.flipper) == null ? void 0 : _c.RPC("storageStat", { path: "/ext/update" }).catch(async (error) => {
          if (error.toString() !== "ERROR_STORAGE_NOT_EXIST") {
            const command = "storageStat";
            rpcErrorHandler({
              componentName: componentName$1,
              error,
              command
            });
            throw new Error(
              `${componentName$1}: RPC error in command '${command}': ${error.toString()}`
            );
          } else {
            logger.debug({
              context: componentName$1,
              message: "Storage /ext/update not exist"
            });
          }
        }));
        if (!updateDir) {
          await ((_d = flipperStore.flipper) == null ? void 0 : _d.RPC("storageMkdir", { path: "/ext/update" }).then(
            () => logger.debug({
              context: componentName$1,
              message: "storageMkdir: /ext/update"
            })
          ).catch((error) => {
            const command = "storageMkdir";
            rpcErrorHandler({ componentName: componentName$1, error, command });
            throw new Error(
              `${componentName$1}: RPC error in command '${command}': ${error.toString()}`
            );
          }));
        }
        for (const file of files) {
          if (updateError.value) {
            return;
          }
          if (file.size === 0) {
            path = "/ext/update/" + file.name;
            if (file.name.endsWith("/")) {
              path = path.slice(0, -1);
            }
            const updateVersionDir = await ((_e = flipperStore.flipper) == null ? void 0 : _e.RPC("storageStat", { path }).catch(async (error) => {
              if (error.toString() !== "ERROR_STORAGE_NOT_EXIST") {
                const command = "storageStat";
                rpcErrorHandler({
                  componentName: componentName$1,
                  error,
                  command
                });
                throw new Error(
                  `${componentName$1}: RPC error in command '${command}': ${error.toString()}`
                );
              } else {
                logger.debug({
                  context: componentName$1,
                  message: "Storage /ext/update not exist"
                });
              }
            }));
            if (!updateVersionDir) {
              await ((_f = flipperStore.flipper) == null ? void 0 : _f.RPC("storageMkdir", { path }).then(
                () => logger.debug({
                  context: componentName$1,
                  message: `storageMkdir: ${path}`
                })
              ).catch((error) => {
                const command = "storageMkdir";
                rpcErrorHandler({ componentName: componentName$1, error, command });
                throw new Error(
                  `${componentName$1}: RPC error in command '${command}': ${error.toString()}`
                );
              }));
            }
          } else {
            write.value.filename = file.name.slice(file.name.lastIndexOf("/") + 1);
            const unbind = (_g = flipperStore.flipper) == null ? void 0 : _g.emitter.on(
              "storageWriteRequest/progress",
              (e) => {
                var _a2, _b2;
                if (!((_a2 = flipperStore.flipper) == null ? void 0 : _a2.connected)) {
                  throw new Error(
                    `Flipper ${(_b2 = flipperStore.flipper) == null ? void 0 : _b2.name} not connected`
                  );
                }
                write.value.progress = e.progress / e.total;
              }
            );
            await ((_h = flipperStore.flipper) == null ? void 0 : _h.RPC("storageWrite", {
              path: "/ext/update/" + file.name,
              buffer: file.buffer
            }).then(
              () => logger.debug({
                context: componentName$1,
                message: `storageWrite: /ext/update/${file.name}`
              })
            ).catch((error) => {
              const command = "storageWrite";
              rpcErrorHandler({ componentName: componentName$1, error, command });
              throw new Error(
                `${componentName$1}: RPC error in command '${command}': ${error.toString()}`
              );
            }));
            if (unbind) {
              unbind();
            }
          }
          await sleep(300);
        }
        write.value.filename = "";
        write.value.progress = 0;
        updateStage.value = "Loading manifest...";
        if (updateError.value) {
          return;
        }
        await ((_i = flipperStore.flipper) == null ? void 0 : _i.RPC("systemUpdate", { path: path + "/update.fuf" }).then(
          () => logger.debug({
            context: componentName$1,
            message: "systemUpdate: OK"
          })
        ).catch((error) => {
          const command = "systemUpdate";
          rpcErrorHandler({ componentName: componentName$1, error, command });
          throw new Error(
            `${componentName$1}: RPC error in command '${command}': ${error.toString()}`
          );
        }));
        updateStage.value = "Update in progress, pay attention to your Flipper";
        await ((_j = flipperStore.flipper) == null ? void 0 : _j.RPC("systemReboot", { mode: "UPDATE" }).catch((error) => {
          const command = "systemReboot";
          rpcErrorHandler({ componentName: componentName$1, error, command });
          throw new Error(
            `${componentName$1}: RPC error in command '${command}': ${error.toString()}`
          );
        }));
        flipperStore.flags.waitForReconnect = true;
        flipperStore.flags.autoReconnect = true;
      } else {
        updateError.value = true;
        updateStage.value = "Failed to fetch channel";
        showNotif({
          message: "Unable to load firmware channel from the build server.",
          color: "negative",
          actions: [
            {
              label: "Reload",
              color: "white",
              handler: () => {
                location.reload();
              }
            }
          ]
        });
        throw new Error(updateStage.value);
      }
    };
    const cancelUpdate = () => {
      flipperStore.flags.waitForReconnect = false;
      flipperStore.flags.updateInProgress = false;
      updateError.value = false;
      updateStage.value = "";
    };
    const __returned__ = { flipperStore, fetchChannels, fetchRegions, fetchFirmware, componentName: componentName$1, outdated, ableToUpdate, aheadOfRelease, installFromFile, uploadedFile, uploadPopup, changelogDialog, overrideDevRegion, updateError, channels, getChannel, isTgzCustomFile, isTargetCustomFile, fwOptions, fwModel, emit, compareVersions, getTextButton, update, updateStage, write, loadFirmware, cancelUpdate, get ProgressBar() {
      return ProgressBar;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$2 = { class: "column flex-center text-center" };
const _hoisted_2$2 = { class: "flex justify-between items-center full-width q-mt-xs q-pb-md" };
const _hoisted_3$2 = {
  key: 0,
  class: "q-mb-sm"
};
const _hoisted_4$1 = { key: 0 };
const _hoisted_5$1 = { key: 1 };
const _hoisted_6$1 = { key: 2 };
const _hoisted_7$1 = { key: 1 };
const _hoisted_8 = { key: 0 };
const _hoisted_9 = { key: 1 };
const _hoisted_10 = { key: 2 };
const _hoisted_11 = { key: 3 };
const _hoisted_12 = { key: 4 };
const _hoisted_13 = { class: "column full-width" };
const _hoisted_14 = { class: "flex no-wrap justify-between items-center" };
const _hoisted_15 = { class: "flex center" };
const _hoisted_16 = {
  key: 1,
  class: "column flex-center text-center full-width"
};
const _hoisted_17 = {
  key: 1,
  class: "flex center"
};
const _hoisted_18 = { key: 0 };
const _hoisted_19 = { key: 1 };
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b, _c, _d, _e;
  const _component_q_markdown = resolveComponent("q-markdown");
  return openBlock(), createElementBlock("div", _hoisted_1$2, [
    createBaseVNode("div", _hoisted_2$2, [
      _cache[10] || (_cache[10] = createBaseVNode("p", { class: "q-mb-none text-bold text-body1" }, "Firmware Update", -1)),
      $setup.fwModel.changelog.trim().length ? (openBlock(), createBlock(QBtn, {
        key: 0,
        onClick: _cache[0] || (_cache[0] = () => {
          $setup.changelogDialog = true;
        }),
        outline: "",
        size: "sm",
        padding: "xs md",
        label: "What's New",
        icon: "mdi-information-outline",
        "no-caps": ""
      })) : createCommentVNode("", true)
    ]),
    $setup.ableToUpdate && ((_b = (_a = $setup.flipperStore.info) == null ? void 0 : _a.storage.sdcard) == null ? void 0 : _b.status) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
      $setup.outdated !== void 0 ? (openBlock(), createElementBlock("p", _hoisted_3$2, [
        $setup.outdated ? (openBlock(), createElementBlock("span", _hoisted_4$1, " Your firmware is out of date, newest release is " + toDisplayString((_c = $setup.getChannel("release")) == null ? void 0 : _c.versions[0].version) + ". ", 1)) : $setup.aheadOfRelease ? (openBlock(), createElementBlock("span", _hoisted_5$1, " Your firmware is ahead of current release. ")) : $setup.flipperStore.info.firmware.version !== "unknown" ? (openBlock(), createElementBlock("span", _hoisted_6$1, " Your firmware is up to date. ")) : createCommentVNode("", true)
      ])) : createCommentVNode("", true),
      $setup.getChannel("custom") ? (openBlock(), createElementBlock("p", _hoisted_7$1, [
        _cache[13] || (_cache[13] = createTextVNode(" Detected custom firmware ", -1)),
        $setup.getChannel("custom").title !== "Custom" ? (openBlock(), createElementBlock("b", _hoisted_8, ' "' + toDisplayString($setup.getChannel("custom").title) + '" ', 1)) : createCommentVNode("", true),
        !$setup.isTgzCustomFile || !$setup.isTargetCustomFile ? (openBlock(), createElementBlock("span", _hoisted_9, " with ")) : createCommentVNode("", true),
        !$setup.isTgzCustomFile ? (openBlock(), createElementBlock("span", _hoisted_10, _cache[11] || (_cache[11] = [
          createBaseVNode("b", null, "unsupported", -1),
          createTextVNode(" filetype ", -1)
        ]))) : createCommentVNode("", true),
        !$setup.isTgzCustomFile && !$setup.isTargetCustomFile ? (openBlock(), createElementBlock("span", _hoisted_11, " and ")) : createCommentVNode("", true),
        !$setup.isTargetCustomFile ? (openBlock(), createElementBlock("span", _hoisted_12, _cache[12] || (_cache[12] = [
          createBaseVNode("b", null, "unsupported", -1),
          createTextVNode(" target ", -1)
        ]))) : createCommentVNode("", true)
      ])) : createCommentVNode("", true),
      createBaseVNode("div", _hoisted_13, [
        createBaseVNode("div", _hoisted_14, [
          _cache[14] || (_cache[14] = createBaseVNode("p", { class: "q-mb-none" }, "Update Channel", -1)),
          createVNode(QSelect, {
            modelValue: $setup.fwModel,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.fwModel = $event),
            options: Object.values($setup.fwOptions),
            borderless: "",
            dense: "",
            disable: $setup.flipperStore.flags.updateInProgress
          }, {
            selected: withCtx(() => [
              createBaseVNode("p", {
                class: normalizeClass(["q-mb-none", `text-${$setup.fwModel.color}`])
              }, toDisplayString($setup.fwModel.label) + " " + toDisplayString($setup.fwModel.version), 3)
            ]),
            option: withCtx((scope) => [
              createVNode(QItem, normalizeProps(guardReactiveProps(scope.itemProps)), {
                default: withCtx(() => [
                  createVNode(QItemSection, { class: "items-start q-mr-md" }, {
                    default: withCtx(() => [
                      createVNode(QItemLabel, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(scope.opt.selectLabel), 1)
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(QItemLabel, {
                        class: "text-no-wrap",
                        caption: ""
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(scope.opt.selectDescription), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024),
                  createVNode(QItemSection, { class: "items-end" }, {
                    default: withCtx(() => [
                      createVNode(QChip, {
                        color: scope.opt.color,
                        "text-color": "white",
                        label: scope.opt.version
                      }, null, 8, ["color", "label"])
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1040)
            ]),
            _: 1
          }, 8, ["modelValue", "options", "disable"])
        ]),
        createBaseVNode("div", _hoisted_15, [
          !$setup.flipperStore.flags.updateInProgress ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            $setup.fwModel ? (openBlock(), createBlock(QBtn, {
              key: 0,
              onClick: _cache[2] || (_cache[2] = ($event) => $setup.update()),
              class: "full-width q-mt-sm text-pixelated text-h5",
              unelevated: "",
              color: "positive",
              padding: "12px 30px"
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString($setup.getTextButton), 1)
              ]),
              _: 1
            })) : createCommentVNode("", true)
          ], 64)) : (openBlock(), createElementBlock("div", _hoisted_16, [
            createBaseVNode("p", null, toDisplayString($setup.updateStage), 1),
            $setup.updateError ? (openBlock(), createBlock(QBtn, {
              key: 0,
              outline: "",
              class: "q-mt-md",
              onClick: _cache[3] || (_cache[3] = ($event) => $setup.cancelUpdate())
            }, {
              default: withCtx(() => _cache[15] || (_cache[15] = [
                createTextVNode("Cancel", -1)
              ])),
              _: 1,
              __: [15]
            })) : $setup.write.filename.length > 0 ? (openBlock(), createBlock($setup["ProgressBar"], {
              key: 1,
              class: "full-width",
              title: $setup.write.filename,
              progress: $setup.write.progress,
              color: "positive",
              trackColor: "green-4",
              size: "56px",
              interpolated: ""
            }, null, 8, ["title", "progress"])) : createCommentVNode("", true)
          ]))
        ])
      ]),
      $setup.installFromFile ? (openBlock(), createBlock(QBtn, {
        key: 2,
        onClick: _cache[4] || (_cache[4] = () => {
          $setup.uploadPopup = true;
          $setup.uploadedFile = void 0;
        }),
        disable: $setup.flipperStore.flags.updateInProgress,
        class: "q-mt-lg",
        outline: "",
        color: "grey-8"
      }, {
        default: withCtx(() => _cache[16] || (_cache[16] = [
          createTextVNode(" Install from file ", -1)
        ])),
        _: 1,
        __: [16]
      }, 8, ["disable"])) : createCommentVNode("", true)
    ], 64)) : (openBlock(), createElementBlock("div", _hoisted_17, [
      ((_e = (_d = $setup.flipperStore.info) == null ? void 0 : _d.storage.sdcard) == null ? void 0 : _e.status) ? (openBlock(), createElementBlock("span", _hoisted_18, _cache[17] || (_cache[17] = [
        createTextVNode("Your firmware doesn't support self-update. Install latest release using ", -1),
        createBaseVNode("b", null, "repair mode", -1),
        createTextVNode(".", -1)
      ]))) : (openBlock(), createElementBlock("span", _hoisted_19, "Self-update is impossible without an SD card."))
    ])),
    createVNode(QDialog, {
      modelValue: $setup.uploadPopup,
      "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $setup.uploadPopup = $event)
    }, {
      default: withCtx(() => [
        createVNode(QCard, null, {
          default: withCtx(() => [
            createVNode(QCardSection, { class: "q-pt-none" }, {
              default: withCtx(() => [
                createVNode(QFile, {
                  outlined: "",
                  modelValue: $setup.uploadedFile,
                  "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.uploadedFile = $event),
                  label: "Drop or select files",
                  accept: ".tgz",
                  class: "q-pt-md",
                  style: normalizeStyle(_ctx.$q.screen.width > 380 ? "width: 300px;" : "")
                }, {
                  prepend: withCtx(() => [
                    createVNode(QIcon, { name: "file_upload" })
                  ]),
                  _: 1
                }, 8, ["modelValue", "style"])
              ]),
              _: 1
            }),
            createVNode(QCardActions, { align: "right" }, {
              default: withCtx(() => [
                withDirectives(createVNode(QBtn, {
                  flat: "",
                  label: "Upload",
                  onClick: _cache[6] || (_cache[6] = ($event) => $setup.update(true))
                }, null, 512), [
                  [ClosePopup]
                ]),
                withDirectives(createVNode(QBtn, {
                  flat: "",
                  label: "Cancel",
                  color: "negative"
                }, null, 512), [
                  [ClosePopup]
                ])
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["modelValue"]),
    createVNode(QDialog, {
      modelValue: $setup.changelogDialog,
      "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $setup.changelogDialog = $event)
    }, {
      default: withCtx(() => [
        createVNode(QLayout, {
          view: "HHH lpr FFF",
          container: "",
          class: "bg-white"
        }, {
          default: withCtx(() => [
            createVNode(QHeader, {
              class: "column flex-center q-py-sm bg-white text-black",
              reveal: ""
            }, {
              default: withCtx(() => [
                _cache[18] || (_cache[18] = createBaseVNode("p", { class: "q-mb-none text-h5 text-bold" }, "What's New", -1)),
                createBaseVNode("p", {
                  class: normalizeClass(["q-mb-none", `text-${$setup.fwModel.color}`])
                }, toDisplayString($setup.fwModel.label) + " " + toDisplayString($setup.fwModel.version), 3)
              ]),
              _: 1,
              __: [18]
            }),
            createVNode(QPageContainer, null, {
              default: withCtx(() => [
                createVNode(QPage, { padding: "" }, {
                  default: withCtx(() => [
                    createVNode(_component_q_markdown, {
                      "no-heading-anchor-links": "",
                      "no-html": "",
                      "no-linkify": "",
                      "no-typographer": "",
                      src: $setup.fwModel.changelog
                    }, null, 8, ["src"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            createVNode(QFooter, { class: "bg-transparent" }, {
              default: withCtx(() => [
                withDirectives((openBlock(), createBlock(QBtn, {
                  class: "full-width q-mt-sm text-pixelated text-h5",
                  onClick: _cache[8] || (_cache[8] = ($event) => $setup.update()),
                  disable: $setup.flipperStore.flags.updateInProgress,
                  color: "positive",
                  padding: "12px 30px",
                  unelevated: ""
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString($setup.getTextButton), 1)
                  ]),
                  _: 1
                }, 8, ["disable"])), [
                  [ClosePopup]
                ])
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["modelValue"])
  ]);
}
const FlipperUpdate = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__file", "Update.vue"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "DetailInfo",
  setup(__props, { expose: __expose }) {
    __expose();
    const flipperStore = useFlipperStore();
    const info = computed(() => flipperStore.info);
    const hardware = computed(() => {
      var _a;
      return (_a = info.value) == null ? void 0 : _a.hardware;
    });
    const firmware = computed(() => {
      var _a;
      return (_a = info.value) == null ? void 0 : _a.firmware;
    });
    const createValue = (title, value) => {
      if (value) {
        return {
          label: title,
          value
        };
      }
      return void 0;
    };
    const radioStackFormatted = computed(() => {
      var _a, _b, _c, _d;
      const major = (_a = info.value) == null ? void 0 : _a.radio.stack.major;
      const minor = (_b = info.value) == null ? void 0 : _b.radio.stack.minor;
      const sub = (_c = info.value) == null ? void 0 : _c.radio.stack.sub;
      const type = getRadioStackType((_d = info.value) == null ? void 0 : _d.radio.stack.type);
      return `${major}.${minor}.${sub} (${type != null ? type : "Unknown"})`;
    });
    function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    function shouldIgnore(currentPath, ignoreKeys) {
      const normalizedPath = currentPath.toLowerCase().trim();
      const pathParts = normalizedPath.split(" ");
      const lastPart = pathParts[pathParts.length - 1];
      return ignoreKeys.some((ignoreItem) => {
        const normalizedIgnore = ignoreItem.toLowerCase().trim();
        if (normalizedIgnore.includes(" ")) {
          return normalizedIgnore === normalizedPath;
        } else {
          return normalizedIgnore === lastPart;
        }
      });
    }
    function traverseObject(obj, ignoreKeys = [], parentKeys = []) {
      let result = [];
      Object.keys(obj).forEach((key) => {
        const currentKeys = [...parentKeys, capitalize(key)];
        const currentPath = currentKeys.join(" ");
        if (shouldIgnore(currentPath, ignoreKeys)) {
          return;
        }
        const value = obj[key];
        if (value && typeof value === "object" && !Array.isArray(value)) {
          result = result.concat(traverseObject(value, ignoreKeys, currentKeys));
        } else if (typeof value === "string" || Number.isInteger(value)) {
          result.push({
            label: currentKeys.join(" "),
            value: String(value)
          });
        }
      });
      return result;
    }
    const isDetailRegion = (region) => {
      return region !== "0";
    };
    const fullInfo = computed(() => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
      return [
        {
          title: "Flipper Device",
          values: [
            createValue("Device Name", (_a = hardware.value) == null ? void 0 : _a.name),
            createValue("Hardware Model", (_b = hardware.value) == null ? void 0 : _b.model),
            createValue(
              "Hardware Region",
              hardware.value && isDetailRegion(hardware.value.region) ? hardware.value.region.builtin : void 0
            ),
            createValue(
              "Hardware Region Provisioned",
              hardware.value && isDetailRegion(hardware.value.region) ? hardware.value.region.provisioned : void 0
            ),
            createValue("Hardware Version", (_c = hardware.value) == null ? void 0 : _c.ver),
            createValue("Hardware OTP Version", (_d = hardware.value) == null ? void 0 : _d.otp.ver),
            createValue("Serial Number", (_e = hardware.value) == null ? void 0 : _e.uid)
          ]
        },
        {
          title: "Firmware",
          values: [
            createValue(
              "Software Revision",
              `${(_f = firmware.value) == null ? void 0 : _f.branch.name} ${(_g = firmware.value) == null ? void 0 : _g.commit.hash}`
            ),
            createValue("Build Date", (_h = firmware.value) == null ? void 0 : _h.build.date),
            createValue("Target", (_i = firmware.value) == null ? void 0 : _i.target),
            createValue(
              "Protobuf Version",
              `${(_j = info.value) == null ? void 0 : _j.protobuf.version.major}.${(_k = info.value) == null ? void 0 : _k.protobuf.version.minor}`
            )
          ]
        },
        {
          title: "Radio Stack",
          values: [createValue("Software Revision", radioStackFormatted.value)]
        },
        {
          title: "Other",
          values: traverseObject(info.value, [
            "Hardware Name",
            "Hardware Model",
            "Hardware Region",
            "Hardware Ver",
            "Hardware Otp Ver",
            "Hardware Uid",
            "Firmware Commit",
            "Firmware Build Date",
            "Firmware Target",
            "Info Protobuf Version",
            "Info Radio Stack Major",
            "Info Radio Stack Minor",
            "Info Radio Stack Sub",
            "Info Radio Stack Type"
          ]).sort((a, b) => a.label.localeCompare(b.label))
        }
      ];
    });
    const fullInfoDialog = ref(false);
    const showFullInfo = () => {
      var _a;
      fullInfoDialog.value = true;
      (_a = flipperStore.flipper) == null ? void 0 : _a.getInfo({ ignoreLoading: true });
    };
    const __returned__ = { flipperStore, info, hardware, firmware, createValue, radioStackFormatted, capitalize, shouldIgnore, traverseObject, isDetailRegion, fullInfo, fullInfoDialog, showFullInfo };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1$1 = { class: "full-width" };
const _hoisted_2$1 = { class: "q-mb-none text-body1 text-bold" };
const _hoisted_3$1 = { class: "column" };
const _hoisted_4 = { class: "q-my-xs row no-wrap justify-between items-center" };
const _hoisted_5 = { class: "text-weight-medium text-no-wrap q-mr-xl" };
const _hoisted_6 = { class: "text-right text-mono" };
const _hoisted_7 = {
  class: "full-width bg-grey-3",
  style: { "height": "1px" }
};
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$1, [
    createVNode(QBtn, {
      class: "full-width text-bold text-body1",
      onClick: $setup.showFullInfo,
      flat: "",
      padding: "xs 0 xs xs",
      label: "Device Info",
      "icon-right": "mdi-chevron-right",
      align: "between",
      "no-caps": ""
    }),
    createVNode(QDialog, {
      modelValue: $setup.fullInfoDialog,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.fullInfoDialog = $event)
    }, {
      default: withCtx(() => [
        createVNode(QCard, { style: { "max-width": "375px" } }, {
          default: withCtx(() => [
            createVNode(QCardSection, { class: "q-pb-none" }, {
              default: withCtx(() => _cache[1] || (_cache[1] = [
                createBaseVNode("p", { class: "q-mb-none text-h6 text-bold" }, "Device Info", -1)
              ])),
              _: 1,
              __: [1]
            }),
            createVNode(QCardSection, { class: "column q-gutter-y-md full-width" }, {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList($setup.fullInfo, (infoBlock) => {
                  return openBlock(), createElementBlock("div", {
                    key: infoBlock.title,
                    class: "full-width"
                  }, [
                    createBaseVNode("p", _hoisted_2$1, toDisplayString(infoBlock.title), 1),
                    createBaseVNode("div", _hoisted_3$1, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(infoBlock.values, (value, index) => {
                        return openBlock(), createElementBlock(Fragment, {
                          key: value == null ? void 0 : value.label
                        }, [
                          value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                            createBaseVNode("p", _hoisted_4, [
                              createBaseVNode("span", _hoisted_5, toDisplayString(value == null ? void 0 : value.label) + ":", 1),
                              createBaseVNode("span", _hoisted_6, toDisplayString(value == null ? void 0 : value.value.replace(/\//g, "/​")), 1)
                            ]),
                            withDirectives(createBaseVNode("div", _hoisted_7, null, 512), [
                              [vShow, index !== infoBlock.values.length - 1]
                            ])
                          ], 64)) : createCommentVNode("", true)
                        ], 64);
                      }), 128))
                    ])
                  ]);
                }), 128))
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["modelValue"])
  ]);
}
const FlipperDetailInfo = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__file", "DetailInfo.vue"]]);
const componentName = "DeviceInfo";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Info",
  setup(__props, { expose: __expose }) {
    __expose();
    const flipperStore = useFlipperStore();
    flipperStore.pageWithScreenStream = true;
    const sdCardUsage = computed(() => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
      if (((_b = (_a = flipperStore.info) == null ? void 0 : _a.storage.sdcard) == null ? void 0 : _b.totalSpace) && ((_d = (_c = flipperStore.info) == null ? void 0 : _c.storage.sdcard) == null ? void 0 : _d.freeSpace)) {
        return `${bytesToSize(
          ((_f = (_e = flipperStore.info) == null ? void 0 : _e.storage.sdcard) == null ? void 0 : _f.totalSpace) - ((_h = (_g = flipperStore.info) == null ? void 0 : _g.storage.sdcard) == null ? void 0 : _h.freeSpace)
        )} / ${bytesToSize((_j = (_i = flipperStore.info) == null ? void 0 : _i.storage.sdcard) == null ? void 0 : _j.totalSpace)}`;
      }
      return "No SD card";
    });
    const hardwareVersion = computed(() => {
      var _a, _b, _c, _d;
      return ((_a = flipperStore.info) == null ? void 0 : _a.hardware.ver) + ".F" + ((_b = flipperStore.info) == null ? void 0 : _b.hardware.target) + "B" + ((_c = flipperStore.info) == null ? void 0 : _c.hardware.body) + "C" + ((_d = flipperStore.info) == null ? void 0 : _d.hardware.connect);
    });
    const radioVersion = computed(() => {
      var _a, _b, _c, _d;
      return ((_a = flipperStore.info) == null ? void 0 : _a.radio.alive) !== "false" ? ((_b = flipperStore.info) == null ? void 0 : _b.radio.stack.major) + "." + ((_c = flipperStore.info) == null ? void 0 : _c.radio.stack.minor) + "." + ((_d = flipperStore.info) == null ? void 0 : _d.radio.stack.sub) : "corrupt";
    });
    const info = ref({
      firmwareVersion: computed(() => {
        var _a, _b, _c;
        if (((_a = flipperStore.info) == null ? void 0 : _a.firmware.branch.name) === "dev") {
          return `Dev ${(_b = flipperStore.info) == null ? void 0 : _b.firmware.commit.hash}`;
        }
        return (_c = flipperStore.info) == null ? void 0 : _c.firmware.version;
      }),
      buildDate: computed(() => {
        var _a;
        return (_a = flipperStore.info) == null ? void 0 : _a.firmware.build.date;
      }),
      sdCardUsage: computed(() => sdCardUsage.value),
      databaseStatus: computed(() => {
        var _a, _b;
        return (_b = (_a = flipperStore.info) == null ? void 0 : _a.storage.databases) == null ? void 0 : _b.status;
      }),
      hardwareVersion: computed(() => hardwareVersion.value),
      radioVersion: computed(() => radioVersion.value),
      radioStackType: computed(() => {
        var _a;
        return (_a = flipperStore.info) == null ? void 0 : _a.radio.stack.type;
      })
    });
    const flipperBody = ref({
      flipperName: computed(() => {
        var _a;
        return (_a = flipperStore.info) == null ? void 0 : _a.hardware.name;
      }),
      flipperColor: computed(() => {
        var _a;
        return (_a = flipperStore.info) == null ? void 0 : _a.hardware.color;
      })
    });
    const refFlipperBody = ref();
    const screenStreamCanvas = computed(
      () => {
        var _a;
        return (_a = refFlipperBody.value) == null ? void 0 : _a.screenStreamCanvas;
      }
    );
    const frameRenderer = ref();
    const expandView = async () => {
      flipperStore.expandView = true;
    };
    const unbindFrame = ref();
    const orientation = ref(0);
    const startScreenStream = async () => {
      await flipperStore.startScreenStream().then(() => {
        var _a;
        logger.debug({
          context: componentName,
          message: "guiStartScreenStream: OK"
        });
        unbindFrame.value = (_a = flipperStore.flipper) == null ? void 0 : _a.emitter.on(
          "screenStream/frame",
          (data, frameOrientation) => {
            orientation.value = Number(frameOrientation);
            if (screenStreamCanvas.value) {
              if (frameRenderer.value) {
                frameRenderer.value.renderFrame({ data });
              }
            }
          }
        );
      }).catch((error) => {
        rpcErrorHandler({
          componentName,
          error,
          command: "guiStartScreenStream"
        });
      });
    };
    const stopScreenStream = async () => {
      await flipperStore.stopScreenStream().then(() => {
        logger.debug({
          context: componentName,
          message: "guiStopScreenStream: OK"
        });
        if (unbindFrame.value) {
          unbindFrame.value();
        }
      }).catch((error) => {
        rpcErrorHandler({
          componentName,
          error,
          command: "guiStopScreenStream"
        });
      });
    };
    onMounted(async () => {
      var _a, _b, _c;
      if (flipperStore.flipperReady) {
        if (!flipperStore.rpcActive) {
          await ((_a = flipperStore.flipper) == null ? void 0 : _a.startRPCSession());
        }
        if (!flipperStore.info) {
          await ((_b = flipperStore.flipper) == null ? void 0 : _b.getInfo());
        }
        if (flipperStore.rpcActive) {
          if (!flipperStore.isScreenStream) {
            await startScreenStream();
          }
        }
      }
      if (screenStreamCanvas.value) {
        frameRenderer.value = new FrameRenderer(screenStreamCanvas.value);
        if ((_c = flipperStore.flipper) == null ? void 0 : _c.frameData) {
          frameRenderer.value.renderFrame({
            data: flipperStore.flipper.frameData
          });
        }
      }
    });
    watch(
      () => flipperStore.flipperReady,
      async (newValue) => {
        if (newValue) {
          if (!flipperStore.isScreenStream) {
            await startScreenStream();
          }
        }
      }
    );
    watch(
      () => flipperStore.flags.updateInProgress,
      async (newValue) => {
        if (!newValue) {
          nextTick(() => {
            frameRenderer.value = new FrameRenderer(screenStreamCanvas.value);
          });
        }
      }
    );
    onBeforeUnmount(async () => {
      if (!flipperStore.flags.switchFlipper) {
        await stopScreenStream().catch((error) => {
          console.error(error);
        });
      }
      flipperStore.pageWithScreenStream = false;
    });
    const __returned__ = { flipperStore, componentName, sdCardUsage, hardwareVersion, radioVersion, info, flipperBody, refFlipperBody, screenStreamCanvas, frameRenderer, expandView, unbindFrame, orientation, startScreenStream, stopScreenStream, get Loading() {
      return Loading;
    }, get FlipperUpdate() {
      return FlipperUpdate;
    }, get FlipperDetailInfo() {
      return FlipperDetailInfo;
    }, get FlipperBody() {
      return FlipperBody;
    }, get FlipperInfo() {
      return FlipperInfo;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _hoisted_1 = {
  class: "full-width",
  style: { "max-width": "700px" }
};
const _hoisted_2 = {
  key: 0,
  class: "column items-center full-width"
};
const _hoisted_3 = {
  key: 1,
  class: "row justify-center q-my-md"
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, [
    !$setup.flipperStore.loadingInfo ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
      $setup.flipperStore.info ? (openBlock(), createElementBlock("div", _hoisted_2, [
        createVNode($setup["FlipperBody"], mergeProps({
          class: "q-mb-xl",
          ref: "refFlipperBody"
        }, $setup.flipperBody, {
          showScreenUpdating: $setup.flipperStore.flags.updateInProgress,
          isScreenStream: $setup.flipperStore.isScreenStream,
          orientation: $setup.orientation,
          onExpandView: $setup.expandView
        }), null, 16, ["showScreenUpdating", "isScreenStream", "orientation"]),
        createBaseVNode("div", {
          class: normalizeClass(["q-mb-md q-mt-sm full-width", {
            "row items-start": _ctx.$q.screen.gt.xs,
            "column items-center": _ctx.$q.screen.lt.sm
          }])
        }, [
          createBaseVNode("div", {
            class: normalizeClass(["col", {
              "q-mr-xl": _ctx.$q.screen.gt.xs,
              "full-width q-mb-md": _ctx.$q.screen.lt.sm
            }])
          }, [
            createVNode($setup["FlipperDetailInfo"]),
            createVNode($setup["FlipperInfo"], mergeProps({ class: "q-px-xs q-pr-sm" }, $setup.info), null, 16)
          ], 2),
          createBaseVNode("div", {
            class: normalizeClass(["col", {
              "full-height": _ctx.$q.screen.gt.xs,
              "full-width": _ctx.$q.screen.lt.sm
            }])
          }, [
            createVNode($setup["FlipperUpdate"], { onUpdateInProgress: $setup.stopScreenStream })
          ], 2)
        ], 2)
      ])) : createCommentVNode("", true)
    ], 64)) : (openBlock(), createElementBlock("div", _hoisted_3, [
      createVNode($setup["Loading"], { label: "Loading info..." })
    ]))
  ]);
}
const DeviceInfo = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "Info.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Device",
  setup(__props, { expose: __expose }) {
    __expose();
    const __returned__ = { get DeviceInfo() {
      return DeviceInfo;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QPage, {
    class: "flex-center column",
    padding: ""
  }, {
    default: withCtx(() => [
      createVNode($setup["DeviceInfo"])
    ]),
    _: 1
  });
}
const Device = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Device.vue"]]);
export {
  Device as DevicePage
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgtQml4eVJCUEYuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9lbnRpdGllcy9GbGlwcGVyL3VpL0JvZHkudnVlIiwiLi4vLi4vLi4vc3JjL3NoYXJlZC9hc3NldHMvZmxpcHBlci1zY3JlZW4tdXBkYXRpbmcucG5nIiwiLi4vLi4vLi4vc3JjL2VudGl0aWVzL0ZsaXBwZXIvbGliL1JhZGlvU3RhY2tUeXBlLnRzIiwiLi4vLi4vLi4vc3JjL2VudGl0aWVzL0ZsaXBwZXIvdWkvSW5mby52dWUiLCIuLi8uLi8uLi9zcmMvc2hhcmVkL2xpYi91dGlscy91c2VGb3JtYXRVcmwudHMiLCIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvRmxpcHBlci91aS9VcGRhdGUudnVlIiwiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL0ZsaXBwZXIvdWkvRGV0YWlsSW5mby52dWUiLCIuLi8uLi8uLi9zcmMvd2lkZ2V0cy9EZXZpY2UvSW5mby91aS9JbmZvLnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9EZXZpY2UvdWkvRGV2aWNlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJjb2x1bW4gaXRlbXMtY2VudGVyXCI+XG4gICAgPGg1IGNsYXNzPVwicS1tYi1tZCBxLW10LW5vbmUgdGV4dC1ib2xkXCI+e3sgcHJvcHMuZmxpcHBlck5hbWUgfX08L2g1PlxuICAgIDxkaXYgY2xhc3M9XCJmbGlwcGVyIHJlbGF0aXZlLXBvc2l0aW9uXCIgOmNsYXNzPVwiZmxpcHBlckJvZHlDbGFzc1wiPlxuICAgICAgPGltZ1xuICAgICAgICB2LWlmPVwic2hvd1NjcmVlblVwZGF0aW5nXCJcbiAgICAgICAgY2xhc3M9XCJmbGlwcGVyX19pbWFnZVwiXG4gICAgICAgIHNyYz1cIn4vYXNzZXRzL2ZsaXBwZXItc2NyZWVuLXVwZGF0aW5nLnBuZ1wiXG4gICAgICAgIHN0eWxlPVwiXCJcbiAgICAgIC8+XG4gICAgICA8ZGl2XG4gICAgICAgIHYtZWxzZVxuICAgICAgICBjbGFzcz1cImZsaXBwZXJfX2Rpc3BsYXktd3JhcHBlciByZWxhdGl2ZS1wb3NpdGlvblwiXG4gICAgICAgIDpzdHlsZT1cImB3aWR0aDogJHsxMjggKiBzY3JlZW5TY2FsZX1weDsgaGVpZ2h0OiAke1xuICAgICAgICAgIDY0ICogc2NyZWVuU2NhbGVcbiAgICAgICAgfXB4OyByb3RhdGU6ICR7OTAgKiByb3RhdGlvbkNhbGN1bGF0aW9ufWRlZztgXCJcbiAgICAgID5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzPVwiZmxpcHBlcl9fZXhwYW5kLXdyYXBwZXIgYWJzb2x1dGUtY2VudGVyIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICBAY2xpY2s9XCJleHBhbmRWaWV3XCJcbiAgICAgICAgPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJkaW1tZWRcIiAvPlxuICAgICAgICAgIDxxLWljb25cbiAgICAgICAgICAgIGNsYXNzPVwiYWJzb2x1dGUtY2VudGVyXCJcbiAgICAgICAgICAgIG5hbWU9XCJtZGktYXJyb3ctZXhwYW5kXCJcbiAgICAgICAgICAgIHNpemU9XCI2NHB4XCJcbiAgICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxjYW52YXNcbiAgICAgICAgICB2LXNob3c9XCJpc1NjcmVlblN0cmVhbVwiXG4gICAgICAgICAgOndpZHRoPVwiMTI4ICogc2NyZWVuU2NhbGVcIlxuICAgICAgICAgIDpoZWlnaHQ9XCI2NCAqIHNjcmVlblNjYWxlXCJcbiAgICAgICAgICBzdHlsZT1cImltYWdlLXJlbmRlcmluZzogcGl4ZWxhdGVkXCJcbiAgICAgICAgICByZWY9XCJzY3JlZW5TdHJlYW1DYW52YXNcIlxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCB7IHJlZiwgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbnR5cGUgUHJvcHMgPSB7XG4gIGZsaXBwZXJOYW1lPzogc3RyaW5nXG4gIGZsaXBwZXJDb2xvcj86IHN0cmluZ1xuICBzaG93U2NyZWVuVXBkYXRpbmc6IGJvb2xlYW5cbiAgaXNTY3JlZW5TdHJlYW0/OiBib29sZWFuXG4gIHNjcmVlblNjYWxlPzogbnVtYmVyXG4gIG9yaWVudGF0aW9uPzogbnVtYmVyXG59XG5cbmNvbnN0IHByb3BzID0gd2l0aERlZmF1bHRzKGRlZmluZVByb3BzPFByb3BzPigpLCB7XG4gIGZsaXBwZXJDb2xvcjogJzInLFxuICBzaG93U2NyZWVuVXBkYXRpbmc6IGZhbHNlLFxuICBpc1NjcmVlblN0cmVhbTogZmFsc2UsXG4gIHNjcmVlblNjYWxlOiAxLFxuICBvcmllbnRhdGlvbjogMFxufSlcblxuY29uc3QgZW1pdCA9IGRlZmluZUVtaXRzKFsnZXhwYW5kVmlldyddKVxuXG5jb25zdCBmbGlwcGVyQm9keUNsYXNzID0gY29tcHV0ZWQoKCkgPT4ge1xuICBzd2l0Y2ggKHByb3BzLmZsaXBwZXJDb2xvcikge1xuICAgIGNhc2UgJzEnOlxuICAgICAgcmV0dXJuICdib2R5LWJsYWNrJ1xuICAgIGNhc2UgJzMnOlxuICAgICAgcmV0dXJuICdib2R5LXRyYW5zcGFyZW50J1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gJ2JvZHktd2hpdGUnXG4gIH1cbn0pXG5cbmNvbnN0IHJvdGF0aW9uQ2FsY3VsYXRpb24gPSBjb21wdXRlZCgoKSA9PiB7XG4gIHN3aXRjaCAocHJvcHMub3JpZW50YXRpb24pIHtcbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4gMlxuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiAwXG4gIH1cbn0pXG5jb25zdCBleHBhbmRWaWV3ID0gKCkgPT4ge1xuICBlbWl0KCdleHBhbmRWaWV3Jylcbn1cblxuY29uc3Qgc2NyZWVuU3RyZWFtQ2FudmFzID0gcmVmPEhUTUxDYW52YXNFbGVtZW50PigpXG5kZWZpbmVFeHBvc2Uoe1xuICBzY3JlZW5TdHJlYW1DYW52YXNcbn0pXG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCIgc2NvcGVkPlxuQGltcG9ydCAnc3R5bGVzJztcbjwvc3R5bGU+XG4iLCJleHBvcnQgZGVmYXVsdCBcIl9fVklURV9BU1NFVF9fQ01JN3paeWRfX1wiIiwiY29uc3QgZ2V0UmFkaW9TdGFja1R5cGUgPSAodHlwZT86IHN0cmluZykgPT4ge1xuICBsZXQgaW50UmFkaW9TdGFja1R5cGVcbiAgaWYgKHR5cGUpIHtcbiAgICBpbnRSYWRpb1N0YWNrVHlwZSA9IHBhcnNlSW50KHR5cGUpXG4gIH1cblxuICBzd2l0Y2ggKGludFJhZGlvU3RhY2tUeXBlKSB7XG4gICAgY2FzZSAweDAxOlxuICAgICAgcmV0dXJuICdmdWxsJ1xuICAgIGNhc2UgMHgwMjpcbiAgICAgIHJldHVybiAnQkxFX0hDSSdcbiAgICBjYXNlIDB4MDM6XG4gICAgICByZXR1cm4gJ2xpZ2h0J1xuICAgIGNhc2UgMHgwNDpcbiAgICAgIHJldHVybiAnQkxFX0JFQUNPTidcbiAgICBjYXNlIDB4MDU6XG4gICAgICByZXR1cm4gJ0JMRV9CQVNJQydcbiAgICBjYXNlIDB4MDY6XG4gICAgICByZXR1cm4gJ0JMRV9GVUxMX0VYVF9BRFYnXG4gICAgY2FzZSAweDA3OlxuICAgICAgcmV0dXJuICdCTEVfSENJX0VYVF9BRFYnXG4gICAgY2FzZSAweDEwOlxuICAgICAgcmV0dXJuICdUSFJFQURfRlREJ1xuICAgIGNhc2UgMHgxMTpcbiAgICAgIHJldHVybiAnVEhSRUFEX01URCdcbiAgICBjYXNlIDB4MzA6XG4gICAgICByZXR1cm4gJ1pJR0JFRV9GRkQnXG4gICAgY2FzZSAweDMxOlxuICAgICAgcmV0dXJuICdaSUdCRUVfUkZEJ1xuICAgIGNhc2UgMHg0MDpcbiAgICAgIHJldHVybiAnTUFDJ1xuICAgIGNhc2UgMHg1MDpcbiAgICAgIHJldHVybiAnQkxFX1RIUkVBRF9GVERfU1RBVElDJ1xuICAgIGNhc2UgMHg1MTpcbiAgICAgIHJldHVybiAnQkxFX1RIUkVBRF9GVERfRFlBTUlDJ1xuICAgIGNhc2UgMHg2MDpcbiAgICAgIHJldHVybiAnODAyMTU0X0xMRF9URVNUUydcbiAgICBjYXNlIDB4NjE6XG4gICAgICByZXR1cm4gJzgwMjE1NF9QSFlfVkFMSUQnXG4gICAgY2FzZSAweDYyOlxuICAgICAgcmV0dXJuICdCTEVfUEhZX1ZBTElEJ1xuICAgIGNhc2UgMHg2MzpcbiAgICAgIHJldHVybiAnQkxFX0xMRF9URVNUUydcbiAgICBjYXNlIDB4NjQ6XG4gICAgICByZXR1cm4gJ0JMRV9STFYnXG4gICAgY2FzZSAweDY1OlxuICAgICAgcmV0dXJuICc4MDIxNTRfUkxWJ1xuICAgIGNhc2UgMHg3MDpcbiAgICAgIHJldHVybiAnQkxFX1pJR0JFRV9GRkRfU1RBVElDJ1xuICAgIGNhc2UgMHg3MTpcbiAgICAgIHJldHVybiAnQkxFX1pJR0JFRV9SRkRfU1RBVElDJ1xuICAgIGNhc2UgMHg3ODpcbiAgICAgIHJldHVybiAnQkxFX1pJR0JFRV9GRkRfRFlOQU1JQydcbiAgICBjYXNlIDB4Nzk6XG4gICAgICByZXR1cm4gJ0JMRV9aSUdCRUVfUkZEX0RZTkFNSUMnXG4gICAgY2FzZSAweDgwOlxuICAgICAgcmV0dXJuICdSTFYnXG4gICAgY2FzZSAweDkwOlxuICAgICAgcmV0dXJuICdCTEVfTUFDX1NUQVRJQydcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuICdVbmtub3duJ1xuICB9XG59XG5cbmV4cG9ydCB7IGdldFJhZGlvU3RhY2tUeXBlIH1cbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cImluZm9cIj5cbiAgICA8cD5cbiAgICAgIDxzcGFuPkZpcm13YXJlOjwvc3Bhbj5cbiAgICAgIDxzcGFuPnt7IGZpcm13YXJlVmVyc2lvbiB9fTwvc3Bhbj5cbiAgICA8L3A+XG4gICAgPHA+XG4gICAgICA8c3Bhbj5CdWlsZCBkYXRlOjwvc3Bhbj5cbiAgICAgIDxzcGFuPnt7IGJ1aWxkRGF0ZSB9fTwvc3Bhbj5cbiAgICA8L3A+XG4gICAgPHA+XG4gICAgICA8c3Bhbj5TRCBjYXJkOjwvc3Bhbj5cbiAgICAgIDxzcGFuPnt7IHNkQ2FyZFVzYWdlIH19PC9zcGFuPlxuICAgIDwvcD5cbiAgICA8cD5cbiAgICAgIDxzcGFuPkRhdGFiYXNlczo8L3NwYW4+XG4gICAgICA8c3Bhbj57eyBkYXRhYmFzZVN0YXR1cyB9fTwvc3Bhbj5cbiAgICA8L3A+XG4gICAgPHA+XG4gICAgICA8c3Bhbj5IYXJkd2FyZTo8L3NwYW4+XG4gICAgICA8c3Bhbj57eyBoYXJkd2FyZVZlcnNpb24gfX08L3NwYW4+XG4gICAgPC9wPlxuICAgIDxwPlxuICAgICAgPHNwYW4+UmFkaW8gRlc6PC9zcGFuPlxuICAgICAgPHNwYW4+e3sgcmFkaW9WZXJzaW9uIH19PC9zcGFuPlxuICAgIDwvcD5cbiAgICA8cD5cbiAgICAgIDxzcGFuPlJhZGlvIHN0YWNrOjwvc3Bhbj5cbiAgICAgIDxzcGFuPnt7IF9yYWRpb1N0YWNrVHlwZSB9fTwvc3Bhbj5cbiAgICA8L3A+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCB7IGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuaW1wb3J0IHsgZ2V0UmFkaW9TdGFja1R5cGUgfSBmcm9tICdlbnRpdHkvRmxpcHBlci9saWIvUmFkaW9TdGFja1R5cGUnXG5cbnR5cGUgUHJvcHMgPSB7XG4gIGZpcm13YXJlVmVyc2lvbj86IHN0cmluZ1xuICBidWlsZERhdGU/OiBzdHJpbmdcbiAgc2RDYXJkVXNhZ2U6IHN0cmluZ1xuICBkYXRhYmFzZVN0YXR1cz86IHN0cmluZ1xuICBoYXJkd2FyZVZlcnNpb246IHN0cmluZ1xuICByYWRpb1ZlcnNpb246IHN0cmluZ1xuICByYWRpb1N0YWNrVHlwZT86IHN0cmluZ1xufVxuXG5jb25zdCBwcm9wcyA9IGRlZmluZVByb3BzPFByb3BzPigpXG5cbmNvbnN0IF9yYWRpb1N0YWNrVHlwZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgcmV0dXJuIGdldFJhZGlvU3RhY2tUeXBlKHByb3BzLnJhZGlvU3RhY2tUeXBlKVxufSlcbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInNjc3NcIiBzY29wZWQ+XG4uaW5mbyBwIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC13cmFwOiBub3dyYXA7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgbWFyZ2luOiAwIDAgMTJweDtcbiAgdGV4dC13cmFwOiBub3dyYXA7XG5cbiAgc3BhbjpmaXJzdC1vZi10eXBlIHtcbiAgICBmb250LXNpemU6IDE1cHg7XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICBtYXJnaW4tcmlnaHQ6IDEuNXJlbTtcbiAgfVxuXG4gIHNwYW46bGFzdC1vZi10eXBlIHtcbiAgICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xuICB9XG59XG48L3N0eWxlPlxuIiwiLyoqXG4gKiBGb3JtYXRzIGEgR2l0SHViIFVSTCBpbnRvIGEgbWFya2Rvd24gbGluayB3aXRoIHRoZSBkZXNpcmVkIHRleHQ6XG4gKiAtIEZvciBwdWxsIHJlcXVlc3RzOiBbI251bWJlcl0oVVJMKVxuICogLSBGb3IgY29tcGFyZTogW3BhcnQxLi4ucGFydDJdKFVSTClcbiAqL1xuY29uc3QgZm9ybWF0R2l0SHViVXJsID0gKHVybDogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgLy8gSGFuZGxlIHB1bGwgcmVxdWVzdCBVUkxzIChvbmx5IGRpZ2l0cylcbiAgY29uc3QgcHVsbE1hdGNoID0gdXJsLm1hdGNoKC9cXC9wdWxsXFwvKFxcZCspLylcbiAgaWYgKHB1bGxNYXRjaCkge1xuICAgIHJldHVybiBgWyMke3B1bGxNYXRjaFsxXX1dKCR7dXJsfSlgXG4gIH1cblxuICAvLyBIYW5kbGUgY29tcGFyZSBVUkxzOlxuICAvLyBUaGlzIHJlZ3VsYXIgZXhwcmVzc2lvbiBjYXB0dXJlcyBhbnkgc2VxdWVuY2Ugb2YgY2hhcmFjdGVycyAoZXhjZXB0ICcvJylcbiAgLy8gYmVmb3JlIGFuZCBhZnRlciB0aGUgbGl0ZXJhbCBcIi4uLlwiIHNvIHRoYXQgaXQgd29ya3Mgd2l0aCB2ZXJzaW9ucyBsaWtlXG4gIC8vIFwiMS4wLjAtcmMuLi4yLjAuMC1yY1wiIG9yIGV2ZW4gXCJyYy4uLjEuMi4wLXJjXCIuXG4gIGNvbnN0IGNvbXBhcmVNYXRjaCA9IHVybC5tYXRjaCgvXFwvY29tcGFyZVxcLyhbXlxcL10rKVxcLlxcLlxcLihbXlxcL10rKS8pXG4gIGlmIChjb21wYXJlTWF0Y2gpIHtcbiAgICByZXR1cm4gYFske2NvbXBhcmVNYXRjaFsxXX0uLi4ke2NvbXBhcmVNYXRjaFsyXX1dKCR7dXJsfSlgXG4gIH1cblxuICAvLyBJZiB0aGUgVVJMIGRvZXMgbm90IG1hdGNoIGFueSBwYXR0ZXJuLCByZXR1cm4gYSBtYXJrZG93biBsaW5rIHdpdGggdGhlIFVSTCBhcyB0aGUgdGV4dC5cbiAgcmV0dXJuIGBbJHt1cmx9XSgke3VybH0pYFxufVxuXG4vKipcbiAqIFJlcGxhY2VzIGFsbCBHaXRIdWIgcHVsbC9jb21wYXJlIGxpbmtzIGluIGEgbWFya2Rvd24gdGV4dCB3aXRoIG1hcmtkb3duIGxpbmtzXG4gKiB0aGF0IGhhdmUgdGhlIGZvcm1hdHRlZCB0ZXh0LlxuICogVGhlIGZ1bmN0aW9uIGhhbmRsZXMgYm90aCBtYXJrZG93bi1mb3JtYXR0ZWQgbGlua3MgYW5kIHJhdyBVUkxzLlxuICovXG5jb25zdCByZXBsYWNlR2l0SHViTGlua3NJbk1hcmtkb3duID0gKG1hcmtkb3duOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAvLyBGaXJzdCwgcmVwbGFjZSBsaW5rcyB0aGF0IGFyZSBhbHJlYWR5IGluIG1hcmtkb3duIGZvcm1hdDogW3RleHRdKFVSTClcbiAgbWFya2Rvd24gPSBtYXJrZG93bi5yZXBsYWNlKFxuICAgIC9cXFsoW15cXF1dKylcXF1cXCgoaHR0cHM6XFwvXFwvZ2l0aHViXFwuY29tXFwvW15cXC9dK1xcL1teXFwvXStcXC8oPzpwdWxsXFwvXFxkK3xjb21wYXJlXFwvW15cXC9dK1xcLlxcLlxcLlteXFwvXSspKVxcKS9nLFxuICAgIChfbWF0Y2gsIF90ZXh0LCB1cmwpID0+IHtcbiAgICAgIHJldHVybiBmb3JtYXRHaXRIdWJVcmwodXJsKVxuICAgIH1cbiAgKVxuXG4gIC8vIFRoZW4sIHJlcGxhY2UgcmF3IFVSTHMgKG5vdCB3cmFwcGVkIGluIG1hcmtkb3duKSB1c2luZyBuZWdhdGl2ZSBsb29rYmVoaW5kXG4gIC8vIHRvIGF2b2lkIGFsdGVyaW5nIGFscmVhZHkgcHJvY2Vzc2VkIGxpbmtzLlxuICBtYXJrZG93biA9IG1hcmtkb3duLnJlcGxhY2UoXG4gICAgLyg/PCFcXF1cXCgpaHR0cHM6XFwvXFwvZ2l0aHViXFwuY29tXFwvW15cXC9dK1xcL1teXFwvXStcXC8oPzpwdWxsXFwvXFxkK3xjb21wYXJlXFwvW15cXC9dK1xcLlxcLlxcLlteXFwvXSspL2csXG4gICAgKHVybCkgPT4gZm9ybWF0R2l0SHViVXJsKHVybClcbiAgKVxuXG4gIHJldHVybiBtYXJrZG93blxufVxuXG5leHBvcnQgeyBmb3JtYXRHaXRIdWJVcmwsIHJlcGxhY2VHaXRIdWJMaW5rc0luTWFya2Rvd24gfVxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwiY29sdW1uIGZsZXgtY2VudGVyIHRleHQtY2VudGVyXCI+XG4gICAgPGRpdiBjbGFzcz1cImZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlciBmdWxsLXdpZHRoIHEtbXQteHMgcS1wYi1tZFwiPlxuICAgICAgPHAgY2xhc3M9XCJxLW1iLW5vbmUgdGV4dC1ib2xkIHRleHQtYm9keTFcIj5GaXJtd2FyZSBVcGRhdGU8L3A+XG4gICAgICA8cS1idG5cbiAgICAgICAgdi1pZj1cImZ3TW9kZWwuY2hhbmdlbG9nLnRyaW0oKS5sZW5ndGhcIlxuICAgICAgICBAY2xpY2s9XCJcbiAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICBjaGFuZ2Vsb2dEaWFsb2cgPSB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICBcIlxuICAgICAgICBvdXRsaW5lXG4gICAgICAgIHNpemU9XCJzbVwiXG4gICAgICAgIHBhZGRpbmc9XCJ4cyBtZFwiXG4gICAgICAgIGxhYmVsPVwiV2hhdCdzIE5ld1wiXG4gICAgICAgIGljb249XCJtZGktaW5mb3JtYXRpb24tb3V0bGluZVwiXG4gICAgICAgIG5vLWNhcHNcbiAgICAgIC8+XG4gICAgPC9kaXY+XG4gICAgPHRlbXBsYXRlIHYtaWY9XCJhYmxlVG9VcGRhdGUgJiYgZmxpcHBlclN0b3JlLmluZm8/LnN0b3JhZ2Uuc2RjYXJkPy5zdGF0dXNcIj5cbiAgICAgIDx0ZW1wbGF0ZSB2LWlmPVwib3V0ZGF0ZWQgIT09IHVuZGVmaW5lZFwiPlxuICAgICAgICA8cCBjbGFzcz1cInEtbWItc21cIj5cbiAgICAgICAgICA8c3BhbiB2LWlmPVwib3V0ZGF0ZWRcIj5cbiAgICAgICAgICAgIFlvdXIgZmlybXdhcmUgaXMgb3V0IG9mIGRhdGUsIG5ld2VzdCByZWxlYXNlIGlzXG4gICAgICAgICAgICB7eyBnZXRDaGFubmVsKCdyZWxlYXNlJyk/LnZlcnNpb25zWzBdIS52ZXJzaW9uIH19LlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiB2LWVsc2UtaWY9XCJhaGVhZE9mUmVsZWFzZVwiPlxuICAgICAgICAgICAgWW91ciBmaXJtd2FyZSBpcyBhaGVhZCBvZiBjdXJyZW50IHJlbGVhc2UuXG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDxzcGFuIHYtZWxzZS1pZj1cImZsaXBwZXJTdG9yZS5pbmZvLmZpcm13YXJlLnZlcnNpb24gIT09ICd1bmtub3duJ1wiPlxuICAgICAgICAgICAgWW91ciBmaXJtd2FyZSBpcyB1cCB0byBkYXRlLlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9wPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgIDxwIHYtaWY9XCJnZXRDaGFubmVsKCdjdXN0b20nKVwiPlxuICAgICAgICBEZXRlY3RlZCBjdXN0b20gZmlybXdhcmVcbiAgICAgICAgPGIgdi1pZj1cImdldENoYW5uZWwoJ2N1c3RvbScpIS50aXRsZSAhPT0gJ0N1c3RvbSdcIj5cbiAgICAgICAgICBcInt7IGdldENoYW5uZWwoJ2N1c3RvbScpIS50aXRsZSB9fVwiXG4gICAgICAgIDwvYj5cbiAgICAgICAgPHNwYW4gdi1pZj1cIiFpc1RnekN1c3RvbUZpbGUgfHwgIWlzVGFyZ2V0Q3VzdG9tRmlsZVwiPiB3aXRoIDwvc3Bhbj5cbiAgICAgICAgPHNwYW4gdi1pZj1cIiFpc1RnekN1c3RvbUZpbGVcIj4gPGI+dW5zdXBwb3J0ZWQ8L2I+IGZpbGV0eXBlIDwvc3Bhbj5cbiAgICAgICAgPHNwYW4gdi1pZj1cIiFpc1RnekN1c3RvbUZpbGUgJiYgIWlzVGFyZ2V0Q3VzdG9tRmlsZVwiPiBhbmQgPC9zcGFuPlxuICAgICAgICA8c3BhbiB2LWlmPVwiIWlzVGFyZ2V0Q3VzdG9tRmlsZVwiPiA8Yj51bnN1cHBvcnRlZDwvYj4gdGFyZ2V0IDwvc3Bhbj5cbiAgICAgIDwvcD5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW4gZnVsbC13aWR0aFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleCBuby13cmFwIGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICA8cCBjbGFzcz1cInEtbWItbm9uZVwiPlVwZGF0ZSBDaGFubmVsPC9wPlxuICAgICAgICAgIDxxLXNlbGVjdFxuICAgICAgICAgICAgdi1tb2RlbD1cImZ3TW9kZWxcIlxuICAgICAgICAgICAgOm9wdGlvbnM9XCJPYmplY3QudmFsdWVzKGZ3T3B0aW9ucylcIlxuICAgICAgICAgICAgYm9yZGVybGVzc1xuICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgIDpkaXNhYmxlPVwiZmxpcHBlclN0b3JlLmZsYWdzLnVwZGF0ZUluUHJvZ3Jlc3NcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDwhLS0gOnN0eWxlPVwiISRxLnNjcmVlbi54cyA/ICd3aWR0aDogMzIwcHg7JyA6ICd3aWR0aDogMjkwcHg7J1wiIC0tPlxuICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDpzZWxlY3RlZD5cbiAgICAgICAgICAgICAgPHAgY2xhc3M9XCJxLW1iLW5vbmVcIiA6Y2xhc3M9XCJgdGV4dC0ke2Z3TW9kZWwuY29sb3J9YFwiPlxuICAgICAgICAgICAgICAgIHt7IGZ3TW9kZWwubGFiZWwgfX1cbiAgICAgICAgICAgICAgICB7eyBmd01vZGVsLnZlcnNpb24gfX1cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC90ZW1wbGF0ZT5cblxuICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDpvcHRpb249XCJzY29wZVwiPlxuICAgICAgICAgICAgICA8cS1pdGVtIHYtYmluZD1cInNjb3BlLml0ZW1Qcm9wc1wiPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBjbGFzcz1cIml0ZW1zLXN0YXJ0IHEtbXItbWRcIj5cbiAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWw+e3sgc2NvcGUub3B0LnNlbGVjdExhYmVsIH19PC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsIGNsYXNzPVwidGV4dC1uby13cmFwXCIgY2FwdGlvbj57e1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5vcHQuc2VsZWN0RGVzY3JpcHRpb25cbiAgICAgICAgICAgICAgICAgIH19PC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gY2xhc3M9XCJpdGVtcy1lbmRcIj5cbiAgICAgICAgICAgICAgICAgIDxxLWNoaXBcbiAgICAgICAgICAgICAgICAgICAgOmNvbG9yPVwic2NvcGUub3B0LmNvbG9yXCJcbiAgICAgICAgICAgICAgICAgICAgdGV4dC1jb2xvcj1cIndoaXRlXCJcbiAgICAgICAgICAgICAgICAgICAgOmxhYmVsPVwic2NvcGUub3B0LnZlcnNpb25cIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICA8L3EtaXRlbT5cbiAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgPC9xLXNlbGVjdD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmbGV4IGNlbnRlclwiPlxuICAgICAgICAgIDx0ZW1wbGF0ZSB2LWlmPVwiIWZsaXBwZXJTdG9yZS5mbGFncy51cGRhdGVJblByb2dyZXNzXCI+XG4gICAgICAgICAgICA8cS1idG5cbiAgICAgICAgICAgICAgdi1pZj1cImZ3TW9kZWxcIlxuICAgICAgICAgICAgICBAY2xpY2s9XCJ1cGRhdGUoKVwiXG4gICAgICAgICAgICAgIGNsYXNzPVwiZnVsbC13aWR0aCBxLW10LXNtIHRleHQtcGl4ZWxhdGVkIHRleHQtaDVcIlxuICAgICAgICAgICAgICB1bmVsZXZhdGVkXG4gICAgICAgICAgICAgIGNvbG9yPVwicG9zaXRpdmVcIlxuICAgICAgICAgICAgICBwYWRkaW5nPVwiMTJweCAzMHB4XCJcbiAgICAgICAgICAgICAgPnt7IGdldFRleHRCdXR0b24gfX08L3EtYnRuXG4gICAgICAgICAgICA+XG4gICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICA8dGVtcGxhdGUgdi1lbHNlPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbiBmbGV4LWNlbnRlciB0ZXh0LWNlbnRlciBmdWxsLXdpZHRoXCI+XG4gICAgICAgICAgICAgIDxwPnt7IHVwZGF0ZVN0YWdlIH19PC9wPlxuICAgICAgICAgICAgICA8cS1idG5cbiAgICAgICAgICAgICAgICB2LWlmPVwidXBkYXRlRXJyb3JcIlxuICAgICAgICAgICAgICAgIG91dGxpbmVcbiAgICAgICAgICAgICAgICBjbGFzcz1cInEtbXQtbWRcIlxuICAgICAgICAgICAgICAgIEBjbGljaz1cImNhbmNlbFVwZGF0ZSgpXCJcbiAgICAgICAgICAgICAgICA+Q2FuY2VsPC9xLWJ0blxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxQcm9ncmVzc0JhclxuICAgICAgICAgICAgICAgIHYtZWxzZS1pZj1cIndyaXRlLmZpbGVuYW1lLmxlbmd0aCA+IDBcIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwiZnVsbC13aWR0aFwiXG4gICAgICAgICAgICAgICAgOnRpdGxlPVwid3JpdGUuZmlsZW5hbWVcIlxuICAgICAgICAgICAgICAgIDpwcm9ncmVzcz1cIndyaXRlLnByb2dyZXNzXCJcbiAgICAgICAgICAgICAgICBjb2xvcj1cInBvc2l0aXZlXCJcbiAgICAgICAgICAgICAgICB0cmFja0NvbG9yPVwiZ3JlZW4tNFwiXG4gICAgICAgICAgICAgICAgc2l6ZT1cIjU2cHhcIlxuICAgICAgICAgICAgICAgIGludGVycG9sYXRlZFxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxxLWJ0blxuICAgICAgICB2LWlmPVwiaW5zdGFsbEZyb21GaWxlXCJcbiAgICAgICAgQGNsaWNrPVwiXG4gICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgdXBsb2FkUG9wdXAgPSB0cnVlXG4gICAgICAgICAgICB1cGxvYWRlZEZpbGUgPSB1bmRlZmluZWRcbiAgICAgICAgICB9XG4gICAgICAgIFwiXG4gICAgICAgIDpkaXNhYmxlPVwiZmxpcHBlclN0b3JlLmZsYWdzLnVwZGF0ZUluUHJvZ3Jlc3NcIlxuICAgICAgICBjbGFzcz1cInEtbXQtbGdcIlxuICAgICAgICBvdXRsaW5lXG4gICAgICAgIGNvbG9yPVwiZ3JleS04XCJcbiAgICAgID5cbiAgICAgICAgSW5zdGFsbCBmcm9tIGZpbGVcbiAgICAgIDwvcS1idG4+XG4gICAgPC90ZW1wbGF0ZT5cbiAgICA8dGVtcGxhdGUgdi1lbHNlPlxuICAgICAgPGRpdiBjbGFzcz1cImZsZXggY2VudGVyXCI+XG4gICAgICAgIDxzcGFuIHYtaWY9XCJmbGlwcGVyU3RvcmUuaW5mbz8uc3RvcmFnZS5zZGNhcmQ/LnN0YXR1c1wiXG4gICAgICAgICAgPllvdXIgZmlybXdhcmUgZG9lc24ndCBzdXBwb3J0IHNlbGYtdXBkYXRlLiBJbnN0YWxsIGxhdGVzdCByZWxlYXNlXG4gICAgICAgICAgdXNpbmcgPGI+cmVwYWlyIG1vZGU8L2I+Ljwvc3BhblxuICAgICAgICA+XG4gICAgICAgIDxzcGFuIHYtZWxzZT5TZWxmLXVwZGF0ZSBpcyBpbXBvc3NpYmxlIHdpdGhvdXQgYW4gU0QgY2FyZC48L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICA8L3RlbXBsYXRlPlxuXG4gICAgPHEtZGlhbG9nIHYtbW9kZWw9XCJ1cGxvYWRQb3B1cFwiPlxuICAgICAgPHEtY2FyZD5cbiAgICAgICAgPHEtY2FyZC1zZWN0aW9uIGNsYXNzPVwicS1wdC1ub25lXCI+XG4gICAgICAgICAgPHEtZmlsZVxuICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgIHYtbW9kZWw9XCJ1cGxvYWRlZEZpbGVcIlxuICAgICAgICAgICAgbGFiZWw9XCJEcm9wIG9yIHNlbGVjdCBmaWxlc1wiXG4gICAgICAgICAgICBhY2NlcHQ9XCIudGd6XCJcbiAgICAgICAgICAgIGNsYXNzPVwicS1wdC1tZFwiXG4gICAgICAgICAgICA6c3R5bGU9XCIkcS5zY3JlZW4ud2lkdGggPiAzODAgPyAnd2lkdGg6IDMwMHB4OycgOiAnJ1wiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDpwcmVwZW5kPlxuICAgICAgICAgICAgICA8cS1pY29uIG5hbWU9XCJmaWxlX3VwbG9hZFwiPjwvcS1pY29uPlxuICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICA8L3EtZmlsZT5cbiAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cblxuICAgICAgICA8cS1jYXJkLWFjdGlvbnMgYWxpZ249XCJyaWdodFwiPlxuICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgZmxhdFxuICAgICAgICAgICAgbGFiZWw9XCJVcGxvYWRcIlxuICAgICAgICAgICAgdi1jbG9zZS1wb3B1cFxuICAgICAgICAgICAgQGNsaWNrPVwidXBkYXRlKHRydWUpXCJcbiAgICAgICAgICA+PC9xLWJ0bj5cbiAgICAgICAgICA8cS1idG4gZmxhdCBsYWJlbD1cIkNhbmNlbFwiIGNvbG9yPVwibmVnYXRpdmVcIiB2LWNsb3NlLXBvcHVwPjwvcS1idG4+XG4gICAgICAgIDwvcS1jYXJkLWFjdGlvbnM+XG4gICAgICA8L3EtY2FyZD5cbiAgICA8L3EtZGlhbG9nPlxuXG4gICAgPHEtZGlhbG9nIHYtbW9kZWw9XCJjaGFuZ2Vsb2dEaWFsb2dcIj5cbiAgICAgIDxxLWxheW91dCB2aWV3PVwiSEhIIGxwciBGRkZcIiBjb250YWluZXIgY2xhc3M9XCJiZy13aGl0ZVwiPlxuICAgICAgICA8cS1oZWFkZXIgY2xhc3M9XCJjb2x1bW4gZmxleC1jZW50ZXIgcS1weS1zbSBiZy13aGl0ZSB0ZXh0LWJsYWNrXCIgcmV2ZWFsPlxuICAgICAgICAgIDxwIGNsYXNzPVwicS1tYi1ub25lIHRleHQtaDUgdGV4dC1ib2xkXCI+V2hhdCdzIE5ldzwvcD5cbiAgICAgICAgICA8cCBjbGFzcz1cInEtbWItbm9uZVwiIDpjbGFzcz1cImB0ZXh0LSR7ZndNb2RlbC5jb2xvcn1gXCI+XG4gICAgICAgICAgICB7eyBmd01vZGVsLmxhYmVsIH19XG4gICAgICAgICAgICB7eyBmd01vZGVsLnZlcnNpb24gfX1cbiAgICAgICAgICA8L3A+XG4gICAgICAgIDwvcS1oZWFkZXI+XG4gICAgICAgIDxxLXBhZ2UtY29udGFpbmVyPlxuICAgICAgICAgIDxxLXBhZ2UgcGFkZGluZz5cbiAgICAgICAgICAgIDxxLW1hcmtkb3duXG4gICAgICAgICAgICAgIG5vLWhlYWRpbmctYW5jaG9yLWxpbmtzXG4gICAgICAgICAgICAgIG5vLWh0bWxcbiAgICAgICAgICAgICAgbm8tbGlua2lmeVxuICAgICAgICAgICAgICBuby10eXBvZ3JhcGhlclxuICAgICAgICAgICAgICA6c3JjPVwiZndNb2RlbC5jaGFuZ2Vsb2dcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L3EtcGFnZT5cbiAgICAgICAgPC9xLXBhZ2UtY29udGFpbmVyPlxuICAgICAgICA8cS1mb290ZXIgY2xhc3M9XCJiZy10cmFuc3BhcmVudFwiPlxuICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgY2xhc3M9XCJmdWxsLXdpZHRoIHEtbXQtc20gdGV4dC1waXhlbGF0ZWQgdGV4dC1oNVwiXG4gICAgICAgICAgICB2LWNsb3NlLXBvcHVwXG4gICAgICAgICAgICBAY2xpY2s9XCJ1cGRhdGUoKVwiXG4gICAgICAgICAgICA6ZGlzYWJsZT1cImZsaXBwZXJTdG9yZS5mbGFncy51cGRhdGVJblByb2dyZXNzXCJcbiAgICAgICAgICAgIGNvbG9yPVwicG9zaXRpdmVcIlxuICAgICAgICAgICAgcGFkZGluZz1cIjEycHggMzBweFwiXG4gICAgICAgICAgICB1bmVsZXZhdGVkXG4gICAgICAgICAgICA+e3sgZ2V0VGV4dEJ1dHRvbiB9fTwvcS1idG5cbiAgICAgICAgICA+XG4gICAgICAgIDwvcS1mb290ZXI+XG4gICAgICA8L3EtbGF5b3V0PlxuICAgIDwvcS1kaWFsb2c+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCB7IHJlZiwgY29tcHV0ZWQsIG9uTW91bnRlZCB9IGZyb20gJ3Z1ZSdcbmltcG9ydCBzZW12ZXIgZnJvbSAnc2VtdmVyJ1xuaW1wb3J0IGFzeW5jU2xlZXAgZnJvbSAnc2ltcGxlLWFzeW5jLXNsZWVwJ1xuXG5pbXBvcnQgeyBQQiB9IGZyb20gJ3NoYXJlZC9saWIvZmxpcHBlckpzL3Byb3RvYnVmQ29tcGlsZWQnXG5pbXBvcnQgeyB1bnBhY2sgfSBmcm9tICdzaGFyZWQvbGliL3V0aWxzL29wZXJhdGlvbidcblxuaW1wb3J0IHsgc2hvd05vdGlmIH0gZnJvbSAnc2hhcmVkL2xpYi91dGlscy91c2VTaG93Tm90aWYnXG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICdzaGFyZWQvbGliL3V0aWxzL3VzZUxvZydcbmltcG9ydCB7IHJwY0Vycm9ySGFuZGxlciB9IGZyb20gJ3NoYXJlZC9saWIvdXRpbHMvdXNlUnBjVXRpbHMnXG5pbXBvcnQgeyByZXBsYWNlR2l0SHViTGlua3NJbk1hcmtkb3duIH0gZnJvbSAnc2hhcmVkL2xpYi91dGlscy91c2VGb3JtYXRVcmwnXG5cbmltcG9ydCB7IFByb2dyZXNzQmFyIH0gZnJvbSAnc2hhcmVkL2NvbXBvbmVudHMvUHJvZ3Jlc3NCYXInXG5pbXBvcnQgeyBGbGlwcGVyTW9kZWwsIEZsaXBwZXJBcGkgfSBmcm9tICdlbnRpdHkvRmxpcHBlcidcbmNvbnN0IGZsaXBwZXJTdG9yZSA9IEZsaXBwZXJNb2RlbC51c2VGbGlwcGVyU3RvcmUoKVxuY29uc3QgeyBmZXRjaENoYW5uZWxzLCBmZXRjaFJlZ2lvbnMsIGZldGNoRmlybXdhcmUgfSA9IEZsaXBwZXJBcGlcblxuY29uc3QgY29tcG9uZW50TmFtZSA9ICdGbGlwcGVyVXBkYXRlJ1xuXG5jb25zdCBvdXRkYXRlZCA9IHJlZjxib29sZWFuIHwgdW5kZWZpbmVkPihmYWxzZSlcbmNvbnN0IGFibGVUb1VwZGF0ZSA9IHJlZih0cnVlKVxuY29uc3QgYWhlYWRPZlJlbGVhc2UgPSByZWYoZmFsc2UpXG5cbmNvbnN0IGluc3RhbGxGcm9tRmlsZSA9IHJlZih0cnVlKVxuY29uc3QgdXBsb2FkZWRGaWxlID0gcmVmPEZpbGU+KClcbmNvbnN0IHVwbG9hZFBvcHVwID0gcmVmKGZhbHNlKVxuY29uc3QgY2hhbmdlbG9nRGlhbG9nID0gcmVmKGZhbHNlKVxuXG5jb25zdCBvdmVycmlkZURldlJlZ2lvbiA9IHJlZihmYWxzZSlcbmNvbnN0IHVwZGF0ZUVycm9yID0gcmVmKGZhbHNlKVxuXG5jb25zdCBjaGFubmVscyA9IHJlZjxGbGlwcGVyTW9kZWwuQ2hhbm5lbFtdPihbXSlcbmNvbnN0IGdldENoYW5uZWwgPSAoY2hhbm5lbElkOiBzdHJpbmcpID0+IHtcbiAgaWYgKGNoYW5uZWxzLnZhbHVlLmxlbmd0aCkge1xuICAgIHJldHVybiBjaGFubmVscy52YWx1ZS5maW5kKChjaGFubmVsKSA9PiBjaGFubmVsLmlkID09PSBjaGFubmVsSWQpXG4gIH1cblxuICByZXR1cm4gdW5kZWZpbmVkXG59XG5jb25zdCBpc1RnekN1c3RvbUZpbGUgPSByZWYoZmFsc2UpXG5jb25zdCBpc1RhcmdldEN1c3RvbUZpbGUgPSByZWYoZmFsc2UpXG5cbmNvbnN0IGZ3T3B0aW9ucyA9IHJlZjxGbGlwcGVyTW9kZWwuRndPcHRpb25zPih7XG4gIHJlbGVhc2U6IHtcbiAgICBsYWJlbDogJ1JlbGVhc2UnLFxuICAgIHNlbGVjdExhYmVsOiAnUmVsZWFzZScsXG4gICAgc2VsZWN0RGVzY3JpcHRpb246ICdTdGFibGUgcmVsZWFzZSAocmVjb21tZW5kZWQpJyxcbiAgICB2YWx1ZTogJ3JlbGVhc2UnLFxuICAgIHZlcnNpb246ICcnLFxuICAgIGNoYW5nZWxvZzogJycsXG4gICAgY29sb3I6ICdwb3NpdGl2ZSdcbiAgfSxcbiAgcmM6IHtcbiAgICBsYWJlbDogJ1JDJyxcbiAgICBzZWxlY3RMYWJlbDogJ1JlbGVhc2UtQ2FuZGlkYXRlJyxcbiAgICBzZWxlY3REZXNjcmlwdGlvbjogJ1ByZS1yZWxlYXNlIHVuZGVyIHRlc3RpbmcnLFxuICAgIHZhbHVlOiAncmVsZWFzZS1jYW5kaWRhdGUnLFxuICAgIHZlcnNpb246ICcnLFxuICAgIGNoYW5nZWxvZzogJycsXG4gICAgY29sb3I6ICdhY2NlbnQnXG4gIH0sXG4gIGRldjoge1xuICAgIGxhYmVsOiAnRGV2JyxcbiAgICBzZWxlY3RMYWJlbDogJ0RldmVsb3BtZW50JyxcbiAgICBzZWxlY3REZXNjcmlwdGlvbjogJ0RhaWx5IHVuc3RhYmxlIGJ1aWxkLCBsb3RzIG9mIGJ1Z3MnLFxuICAgIHZhbHVlOiAnZGV2ZWxvcG1lbnQnLFxuICAgIHZlcnNpb246ICcnLFxuICAgIGNoYW5nZWxvZzogJycsXG4gICAgY29sb3I6ICduZWdhdGl2ZSdcbiAgfVxufSlcbmNvbnN0IGZ3TW9kZWwgPSByZWYoZndPcHRpb25zLnZhbHVlLnJlbGVhc2UpXG5cbmNvbnN0IGVtaXQgPSBkZWZpbmVFbWl0czx7IChldmVudDogJ3VwZGF0ZUluUHJvZ3Jlc3MnKTogUHJvbWlzZTx2b2lkPiB9PigpXG5cbm9uTW91bnRlZChhc3luYyAoKSA9PiB7XG4gIGNoYW5uZWxzLnZhbHVlID0gYXdhaXQgZmV0Y2hDaGFubmVscygpLmNhdGNoKChlcnJvcikgPT4ge1xuICAgIHNob3dOb3RpZih7XG4gICAgICBtZXNzYWdlOiAnVW5hYmxlIHRvIGxvYWQgZmlybXdhcmUgY2hhbm5lbHMgZnJvbSB0aGUgYnVpbGQgc2VydmVyLicsXG4gICAgICBjb2xvcjogJ25lZ2F0aXZlJyxcbiAgICAgIGFjdGlvbnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGxhYmVsOiAnUmVsb2FkJyxcbiAgICAgICAgICBjb2xvcjogJ3doaXRlJyxcbiAgICAgICAgICBoYW5kbGVyOiAoKSA9PiB7XG4gICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0pXG4gICAgbG9nZ2VyLmVycm9yKHtcbiAgICAgIGNvbnRleHQ6IGNvbXBvbmVudE5hbWUsXG4gICAgICBtZXNzYWdlOiAnZmFpbGVkIHRvIGZldGNoIHVwZGF0ZSBjaGFubmVscydcbiAgICB9KVxuICAgIHRocm93IGVycm9yXG4gIH0pXG5cbiAgaWYgKGNoYW5uZWxzLnZhbHVlLmxlbmd0aCkge1xuICAgIGZ3T3B0aW9ucy52YWx1ZS5yZWxlYXNlLnZlcnNpb24gPVxuICAgICAgZ2V0Q2hhbm5lbCgncmVsZWFzZScpPy52ZXJzaW9uc1swXSEudmVyc2lvbiB8fCAnJ1xuICAgIGZ3T3B0aW9ucy52YWx1ZS5yYy52ZXJzaW9uID1cbiAgICAgIGdldENoYW5uZWwoJ3JlbGVhc2UtY2FuZGlkYXRlJyk/LnZlcnNpb25zWzBdIS52ZXJzaW9uIHx8ICcnXG4gICAgZndPcHRpb25zLnZhbHVlLmRldi52ZXJzaW9uID1cbiAgICAgIGdldENoYW5uZWwoJ2RldmVsb3BtZW50Jyk/LnZlcnNpb25zWzBdIS52ZXJzaW9uIHx8ICcnXG5cbiAgICBmd09wdGlvbnMudmFsdWUucmVsZWFzZS5jaGFuZ2Vsb2cgPSByZXBsYWNlR2l0SHViTGlua3NJbk1hcmtkb3duKFxuICAgICAgZ2V0Q2hhbm5lbCgncmVsZWFzZScpPy52ZXJzaW9uc1swXSEuY2hhbmdlbG9nIHx8ICcnXG4gICAgKVxuICAgIGZ3T3B0aW9ucy52YWx1ZS5yYy5jaGFuZ2Vsb2cgPSByZXBsYWNlR2l0SHViTGlua3NJbk1hcmtkb3duKFxuICAgICAgZ2V0Q2hhbm5lbCgncmVsZWFzZS1jYW5kaWRhdGUnKT8udmVyc2lvbnNbMF0hLmNoYW5nZWxvZyB8fCAnJ1xuICAgIClcbiAgICBmd09wdGlvbnMudmFsdWUuZGV2LmNoYW5nZWxvZyA9IHJlcGxhY2VHaXRIdWJMaW5rc0luTWFya2Rvd24oXG4gICAgICBnZXRDaGFubmVsKCdkZXZlbG9wbWVudCcpPy52ZXJzaW9uc1swXSEuY2hhbmdlbG9nIHx8ICcnXG4gICAgKVxuXG4gICAgY29uc3QgY3VzdG9tQ2hhbm5lbCA9IGdldENoYW5uZWwoJ2N1c3RvbScpXG4gICAgY29uc3QgY3VzdG9tRmlsZSA9IGN1c3RvbUNoYW5uZWw/LnZlcnNpb25zWzBdPy5maWxlcy5maW5kKChfZmlsZSkgPT5cbiAgICAgIF9maWxlLnVybC5lbmRzV2l0aCgndGd6JylcbiAgICApXG4gICAgaWYgKGN1c3RvbUZpbGUpIHtcbiAgICAgIGlzVGd6Q3VzdG9tRmlsZS52YWx1ZSA9IHRydWVcblxuICAgICAgaWYgKGN1c3RvbUZpbGUudGFyZ2V0ID09PSBmbGlwcGVyU3RvcmUudGFyZ2V0KSB7XG4gICAgICAgIGlzVGFyZ2V0Q3VzdG9tRmlsZS52YWx1ZSA9IHRydWVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlzVGFyZ2V0Q3VzdG9tRmlsZS52YWx1ZSA9IGZhbHNlXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlzVGd6Q3VzdG9tRmlsZS52YWx1ZSA9IGZhbHNlXG4gICAgfVxuICAgIGlmIChcbiAgICAgIGN1c3RvbUNoYW5uZWwgJiZcbiAgICAgIGN1c3RvbUZpbGUgJiZcbiAgICAgIGlzVGd6Q3VzdG9tRmlsZS52YWx1ZSAmJlxuICAgICAgaXNUYXJnZXRDdXN0b21GaWxlLnZhbHVlXG4gICAgKSB7XG4gICAgICBmd09wdGlvbnMudmFsdWUuY3VzdG9tID0ge1xuICAgICAgICBsYWJlbDogY3VzdG9tQ2hhbm5lbC50aXRsZSxcbiAgICAgICAgc2VsZWN0TGFiZWw6IGN1c3RvbUNoYW5uZWwudGl0bGUsXG4gICAgICAgIHNlbGVjdERlc2NyaXB0aW9uOiAnJyxcbiAgICAgICAgdmFsdWU6ICdjdXN0b20nLFxuICAgICAgICB2ZXJzaW9uOiBjdXN0b21DaGFubmVsLnZlcnNpb25zWzBdIS52ZXJzaW9uLFxuICAgICAgICBjaGFuZ2Vsb2c6ICcnLFxuICAgICAgICBjb2xvcjogJ2RhcmsnXG4gICAgICB9XG5cbiAgICAgIGZ3TW9kZWwudmFsdWUgPSBmd09wdGlvbnMudmFsdWUuY3VzdG9tXG4gICAgfVxuICB9XG5cbiAgY29tcGFyZVZlcnNpb25zKClcblxuICBpZiAoXG4gICAgbmV3IFVSTFNlYXJjaFBhcmFtcyhsb2NhdGlvbi5zZWFyY2gpLmdldCgnb3ZlcnJpZGVEZXZSZWdpb24nKSA9PT0gJ3RydWUnXG4gICkge1xuICAgIG92ZXJyaWRlRGV2UmVnaW9uLnZhbHVlID0gdHJ1ZVxuICB9XG59KVxuXG5jb25zdCBjb21wYXJlVmVyc2lvbnMgPSAoKSA9PiB7XG4gIGlmIChcbiAgICBzZW12ZXIubHQoXG4gICAgICBmbGlwcGVyU3RvcmUuaW5mbz8ucHJvdG9idWYudmVyc2lvbi5tYWpvciArXG4gICAgICAgICcuJyArXG4gICAgICAgIGZsaXBwZXJTdG9yZS5pbmZvPy5wcm90b2J1Zi52ZXJzaW9uLm1pbm9yICtcbiAgICAgICAgJy4wJyxcbiAgICAgICcwLjYuMCdcbiAgICApXG4gICkge1xuICAgIGFibGVUb1VwZGF0ZS52YWx1ZSA9IGZhbHNlXG4gIH1cbiAgaWYgKGZsaXBwZXJTdG9yZS5pbmZvPy5maXJtd2FyZS52ZXJzaW9uKSB7XG4gICAgaWYgKFxuICAgICAgZmxpcHBlclN0b3JlLmluZm8uZmlybXdhcmUudmVyc2lvbiAhPT0gJ3Vua25vd24nICYmXG4gICAgICBzZW12ZXIudmFsaWQoZmxpcHBlclN0b3JlLmluZm8uZmlybXdhcmUudmVyc2lvbilcbiAgICApIHtcbiAgICAgIGNvbnN0IHJlbGVhc2VWZXJzaW9uID0gZ2V0Q2hhbm5lbCgncmVsZWFzZScpPy52ZXJzaW9uc1swXSEudmVyc2lvblxuXG4gICAgICBpZiAocmVsZWFzZVZlcnNpb24pIHtcbiAgICAgICAgaWYgKHNlbXZlci5lcShmbGlwcGVyU3RvcmUuaW5mby5maXJtd2FyZS52ZXJzaW9uLCByZWxlYXNlVmVyc2lvbikpIHtcbiAgICAgICAgICBvdXRkYXRlZC52YWx1ZSA9IGZhbHNlXG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgc2VtdmVyLmd0KGZsaXBwZXJTdG9yZS5pbmZvLmZpcm13YXJlLnZlcnNpb24sIHJlbGVhc2VWZXJzaW9uKVxuICAgICAgICApIHtcbiAgICAgICAgICBvdXRkYXRlZC52YWx1ZSA9IGZhbHNlXG4gICAgICAgICAgYWhlYWRPZlJlbGVhc2UudmFsdWUgPSB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb3V0ZGF0ZWQudmFsdWUgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG91dGRhdGVkLnZhbHVlID0gdHJ1ZVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBvdXRkYXRlZC52YWx1ZSA9IHVuZGVmaW5lZFxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBnZXRUZXh0QnV0dG9uID0gY29tcHV0ZWQoKCkgPT4ge1xuICBpZiAoZndNb2RlbC52YWx1ZS52ZXJzaW9uID09PSBmbGlwcGVyU3RvcmUuaW5mbz8uZmlybXdhcmUudmVyc2lvbikge1xuICAgIHJldHVybiAnUmVpbnN0YWxsJ1xuICB9XG5cbiAgaWYgKG91dGRhdGVkLnZhbHVlKSB7XG4gICAgcmV0dXJuICdVcGRhdGUnXG4gIH1cblxuICByZXR1cm4gJ0luc3RhbGwnXG59KVxuXG5jb25zdCB1cGRhdGUgPSBhc3luYyAoZnJvbUZpbGUgPSBmYWxzZSkgPT4ge1xuICB1cGRhdGVTdGFnZS52YWx1ZSA9ICcnXG5cbiAgaWYgKCFmbGlwcGVyU3RvcmUuaW5mbz8uc3RvcmFnZS5zZGNhcmQ/LnN0YXR1cy5pc0luc3RhbGxlZCkge1xuICAgIGZsaXBwZXJTdG9yZS5kaWFsb2dzLm1pY3JvU0RjYXJkTWlzc2luZyA9IHRydWVcbiAgICByZXR1cm5cbiAgfVxuXG4gIGZsaXBwZXJTdG9yZS5vblVwZGF0ZVN0YWdlKCdzdGFydCcpXG5cbiAgaWYgKGZyb21GaWxlKSB7XG4gICAgaWYgKCF1cGxvYWRlZEZpbGUudmFsdWUpIHtcbiAgICAgIHVwZGF0ZUVycm9yLnZhbHVlID0gdHJ1ZVxuICAgICAgZmxpcHBlclN0b3JlLm9uVXBkYXRlU3RhZ2UoJ2VuZCcpXG4gICAgICB1cGRhdGVTdGFnZS52YWx1ZSA9ICdObyBmaWxlIHNlbGVjdGVkJ1xuICAgICAgdGhyb3cgbmV3IEVycm9yKHVwZGF0ZVN0YWdlLnZhbHVlKVxuICAgIH0gZWxzZSBpZiAoIXVwbG9hZGVkRmlsZS52YWx1ZS5uYW1lLmVuZHNXaXRoKCcudGd6JykpIHtcbiAgICAgIHVwZGF0ZUVycm9yLnZhbHVlID0gdHJ1ZVxuICAgICAgZmxpcHBlclN0b3JlLm9uVXBkYXRlU3RhZ2UoJ2VuZCcpXG4gICAgICB1cGRhdGVTdGFnZS52YWx1ZSA9ICdXcm9uZyBmaWxlIGZvcm1hdCdcbiAgICAgIHRocm93IG5ldyBFcnJvcih1cGRhdGVTdGFnZS52YWx1ZSlcbiAgICB9XG4gICAgbG9nZ2VyLmluZm8oe1xuICAgICAgY29udGV4dDogY29tcG9uZW50TmFtZSxcbiAgICAgIG1lc3NhZ2U6ICdVcGxvYWRpbmcgZmlybXdhcmUgZnJvbSBmaWxlJ1xuICAgIH0pXG4gIH1cblxuICBhd2FpdCBlbWl0KCd1cGRhdGVJblByb2dyZXNzJylcbiAgYXdhaXQgbG9hZEZpcm13YXJlKCkuY2F0Y2goKGVycm9yOiBFcnJvcikgPT4ge1xuICAgIHVwZGF0ZUVycm9yLnZhbHVlID0gdHJ1ZVxuICAgIHVwZGF0ZVN0YWdlLnZhbHVlID0gZXJyb3IubWVzc2FnZSB8fCBlcnJvci50b1N0cmluZygpXG5cbiAgICBmbGlwcGVyU3RvcmUub25VcGRhdGVTdGFnZSgnZW5kJylcblxuICAgIHRocm93IGVycm9yXG4gIH0pXG59XG5cbmNvbnN0IHVwZGF0ZVN0YWdlID0gcmVmKCcnKVxuY29uc3Qgd3JpdGUgPSByZWYoe1xuICBmaWxlbmFtZTogJycsXG4gIHByb2dyZXNzOiAwXG59KVxuY29uc3QgbG9hZEZpcm13YXJlID0gYXN5bmMgKCkgPT4ge1xuICB1cGRhdGVTdGFnZS52YWx1ZSA9ICdMb2FkaW5nIGZpcm13YXJlIGJ1bmRsZS4uLidcblxuICBpZiAoZmxpcHBlclN0b3JlLmluZm8/LmhhcmR3YXJlLnJlZ2lvbiAhPT0gJzAnIHx8IG92ZXJyaWRlRGV2UmVnaW9uLnZhbHVlKSB7XG4gICAgY29uc3QgcmVnaW9uczogRmxpcHBlck1vZGVsLlJlZ2lvbnMgPSBhd2FpdCBmZXRjaFJlZ2lvbnMoKS5jYXRjaChcbiAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICBzaG93Tm90aWYoe1xuICAgICAgICAgIG1lc3NhZ2U6ICdGYWlsZWQgdG8gZmV0Y2ggcmVnaW9uYWwgdXBkYXRlIGluZm9ybWF0aW9uJyxcbiAgICAgICAgICBjb2xvcjogJ25lZ2F0aXZlJyxcbiAgICAgICAgICBhY3Rpb25zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxhYmVsOiAnUmVsb2FkJyxcbiAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZScsXG4gICAgICAgICAgICAgIGhhbmRsZXI6ICgpID0+IHtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9KVxuICAgICAgICBsb2dnZXIuZXJyb3Ioe1xuICAgICAgICAgIGNvbnRleHQ6IGNvbXBvbmVudE5hbWUsXG4gICAgICAgICAgbWVzc2FnZTogYEZhaWxlZCB0byBmZXRjaCByZWdpb25hbCB1cGRhdGUgaW5mb3JtYXRpb246ICR7ZXJyb3IudG9TdHJpbmcoKX1gXG4gICAgICAgIH0pXG4gICAgICAgIHRocm93IGVycm9yXG4gICAgICB9XG4gICAgKVxuXG4gICAgbGV0IGJhbmRzXG4gICAgaWYgKHJlZ2lvbnMuY291bnRyaWVzW3JlZ2lvbnMuY291bnRyeV0pIHtcbiAgICAgIGJhbmRzID0gcmVnaW9ucy5jb3VudHJpZXNbcmVnaW9ucy5jb3VudHJ5XSEubWFwKChlKSA9PiByZWdpb25zLmJhbmRzW2VdKVxuICAgIH0gZWxzZSB7XG4gICAgICBiYW5kcyA9IHJlZ2lvbnMuZGVmYXVsdC5tYXAoKGUpID0+IHJlZ2lvbnMuYmFuZHNbZV0pXG4gICAgICByZWdpb25zLmNvdW50cnkgPSAnSlAnXG4gICAgfVxuICAgIGNvbnN0IG9wdGlvbnM6IHtcbiAgICAgIGNvdW50cnlDb2RlOiBzdHJpbmcgfCBVaW50OEFycmF5XG4gICAgICBiYW5kczogSW5zdGFuY2VUeXBlPHR5cGVvZiBQQi5SZWdpb24uQmFuZD5bXVxuICAgIH0gPSB7XG4gICAgICBjb3VudHJ5Q29kZTogcmVnaW9ucy5jb3VudHJ5LFxuICAgICAgYmFuZHM6IFtdXG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBiYW5kIG9mIGJhbmRzKSB7XG4gICAgICBjb25zdCBiYW5kT3B0aW9ucyA9IHtcbiAgICAgICAgc3RhcnQ6IGJhbmQhLnN0YXJ0LFxuICAgICAgICBlbmQ6IGJhbmQhLmVuZCxcbiAgICAgICAgcG93ZXJMaW1pdDogYmFuZCEubWF4X3Bvd2VyLFxuICAgICAgICBkdXR5Q3ljbGU6IGJhbmQhLmR1dHlfY3ljbGVcbiAgICAgIH1cbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBQQi5SZWdpb24uQmFuZC5jcmVhdGUoYmFuZE9wdGlvbnMpXG4gICAgICBvcHRpb25zLmJhbmRzLnB1c2gobWVzc2FnZSlcbiAgICB9XG5cbiAgICBpZiAodXBkYXRlRXJyb3IudmFsdWUpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIG9wdGlvbnMuY291bnRyeUNvZGUgPSBuZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUocmVnaW9ucy5jb3VudHJ5KVxuICAgIGNvbnN0IG1lc3NhZ2UgPSBQQi5SZWdpb24uY3JlYXRlKG9wdGlvbnMpXG4gICAgY29uc3QgZW5jb2RlZCA9IG5ldyBVaW50OEFycmF5KFxuICAgICAgUEIuUmVnaW9uLmVuY29kZURlbGltaXRlZChtZXNzYWdlKS5maW5pc2goKVxuICAgICkuc2xpY2UoMSlcblxuICAgIGF3YWl0IGZsaXBwZXJTdG9yZS5mbGlwcGVyXG4gICAgICA/LlJQQygnc3RvcmFnZVdyaXRlJywge1xuICAgICAgICBwYXRoOiAnL2ludC8ucmVnaW9uX2RhdGEnLFxuICAgICAgICBidWZmZXI6IGVuY29kZWRcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yOiBFcnJvcikgPT4ge1xuICAgICAgICBjb25zdCBjb21tYW5kID0gJ3N0b3JhZ2VXcml0ZSdcbiAgICAgICAgcnBjRXJyb3JIYW5kbGVyKHsgY29tcG9uZW50TmFtZSwgZXJyb3IsIGNvbW1hbmQgfSlcblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYCR7Y29tcG9uZW50TmFtZX06IFJQQyBlcnJvciBpbiBjb21tYW5kICcke2NvbW1hbmR9JzogJHtlcnJvci50b1N0cmluZygpfWBcbiAgICAgICAgKVxuICAgICAgfSlcbiAgfVxuXG4gIGlmICh1cGRhdGVFcnJvci52YWx1ZSkge1xuICAgIHJldHVyblxuICB9XG5cbiAgY29uc3QgY2hhbm5lbCA9IGdldENoYW5uZWwoZndNb2RlbC52YWx1ZS52YWx1ZSlcblxuICBpZiAodXBsb2FkZWRGaWxlLnZhbHVlIHx8IGNoYW5uZWwpIHtcbiAgICBsZXQgZmlsZXNcbiAgICBpZiAodXBsb2FkZWRGaWxlLnZhbHVlKSB7XG4gICAgICBjb25zdCBidWZmZXIgPSBhd2FpdCB1cGxvYWRlZEZpbGUudmFsdWUuYXJyYXlCdWZmZXIoKVxuICAgICAgZmlsZXMgPSBhd2FpdCB1bnBhY2soYnVmZmVyKS50aGVuKCh2YWx1ZTogb2JqZWN0KSA9PiB7XG4gICAgICAgIGxvZ2dlci5kZWJ1Zyh7XG4gICAgICAgICAgY29udGV4dDogY29tcG9uZW50TmFtZSxcbiAgICAgICAgICBtZXNzYWdlOiAnVW5wYWNrZWQgZmlybXdhcmUnXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiB2YWx1ZVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZmlsZSA9IGNoYW5uZWw/LnZlcnNpb25zWzBdIS5maWxlcy5maW5kKFxuICAgICAgICAoX2ZpbGUpID0+XG4gICAgICAgICAgX2ZpbGUudGFyZ2V0ID09PSBmbGlwcGVyU3RvcmUudGFyZ2V0ICYmIF9maWxlLnR5cGUgPT09ICd1cGRhdGVfdGd6J1xuICAgICAgKVxuXG4gICAgICBpZiAoZmlsZSkge1xuICAgICAgICBmaWxlcyA9IGF3YWl0IGZldGNoRmlybXdhcmUoZmlsZS51cmwpXG4gICAgICAgICAgLnRoZW4oKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoe1xuICAgICAgICAgICAgICBjb250ZXh0OiBjb21wb25lbnROYW1lLFxuICAgICAgICAgICAgICBtZXNzYWdlOiBgRG93bmxvYWRlZCBmaXJtd2FyZSBmcm9tICR7ZmlsZS51cmx9YFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlcnJvcjogRXJyb3IpID0+IHtcbiAgICAgICAgICAgIHVwZGF0ZUVycm9yLnZhbHVlID0gdHJ1ZVxuICAgICAgICAgICAgdXBkYXRlU3RhZ2UudmFsdWUgPSBlcnJvci50b1N0cmluZygpXG4gICAgICAgICAgICBzaG93Tm90aWYoe1xuICAgICAgICAgICAgICBtZXNzYWdlOiAnRmFpbGVkIHRvIGZldGNoIGZpcm13YXJlOiAnICsgZXJyb3IudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgY29sb3I6ICduZWdhdGl2ZScsXG4gICAgICAgICAgICAgIGFjdGlvbnM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBsYWJlbDogJ1JlbG9hZCcsXG4gICAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJyxcbiAgICAgICAgICAgICAgICAgIGhhbmRsZXI6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKClcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBgJHtjb21wb25lbnROYW1lfTogRmFpbGVkIHRvIGZldGNoIGZpcm13YXJlOiAke2Vycm9yLnRvU3RyaW5nKCl9YFxuICAgICAgICAgICAgbG9nZ2VyLmVycm9yKHtcbiAgICAgICAgICAgICAgY29udGV4dDogY29tcG9uZW50TmFtZSxcbiAgICAgICAgICAgICAgbWVzc2FnZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKVxuICAgICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlU3RhZ2UudmFsdWUgPSAnTG9hZGluZyBmaXJtd2FyZSBmaWxlcydcblxuICAgIGlmICh1cGRhdGVFcnJvci52YWx1ZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgbGV0IHBhdGggPSAnL2V4dC91cGRhdGUvJ1xuICAgIGNvbnN0IHVwZGF0ZURpciA9IGF3YWl0IGZsaXBwZXJTdG9yZS5mbGlwcGVyXG4gICAgICA/LlJQQygnc3RvcmFnZVN0YXQnLCB7IHBhdGg6ICcvZXh0L3VwZGF0ZScgfSlcbiAgICAgIC5jYXRjaChhc3luYyAoZXJyb3I6IEVycm9yKSA9PiB7XG4gICAgICAgIGlmIChlcnJvci50b1N0cmluZygpICE9PSAnRVJST1JfU1RPUkFHRV9OT1RfRVhJU1QnKSB7XG4gICAgICAgICAgY29uc3QgY29tbWFuZCA9ICdzdG9yYWdlU3RhdCdcbiAgICAgICAgICBycGNFcnJvckhhbmRsZXIoe1xuICAgICAgICAgICAgY29tcG9uZW50TmFtZSxcbiAgICAgICAgICAgIGVycm9yLFxuICAgICAgICAgICAgY29tbWFuZFxuICAgICAgICAgIH0pXG5cbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICBgJHtjb21wb25lbnROYW1lfTogUlBDIGVycm9yIGluIGNvbW1hbmQgJyR7Y29tbWFuZH0nOiAke2Vycm9yLnRvU3RyaW5nKCl9YFxuICAgICAgICAgIClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoe1xuICAgICAgICAgICAgY29udGV4dDogY29tcG9uZW50TmFtZSxcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdTdG9yYWdlIC9leHQvdXBkYXRlIG5vdCBleGlzdCdcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgaWYgKCF1cGRhdGVEaXIpIHtcbiAgICAgIGF3YWl0IGZsaXBwZXJTdG9yZS5mbGlwcGVyXG4gICAgICAgID8uUlBDKCdzdG9yYWdlTWtkaXInLCB7IHBhdGg6ICcvZXh0L3VwZGF0ZScgfSlcbiAgICAgICAgLnRoZW4oKCkgPT5cbiAgICAgICAgICBsb2dnZXIuZGVidWcoe1xuICAgICAgICAgICAgY29udGV4dDogY29tcG9uZW50TmFtZSxcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdzdG9yYWdlTWtkaXI6IC9leHQvdXBkYXRlJ1xuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgICAgLmNhdGNoKChlcnJvcjogRXJyb3IpID0+IHtcbiAgICAgICAgICBjb25zdCBjb21tYW5kID0gJ3N0b3JhZ2VNa2RpcidcbiAgICAgICAgICBycGNFcnJvckhhbmRsZXIoeyBjb21wb25lbnROYW1lLCBlcnJvciwgY29tbWFuZCB9KVxuXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgYCR7Y29tcG9uZW50TmFtZX06IFJQQyBlcnJvciBpbiBjb21tYW5kICcke2NvbW1hbmR9JzogJHtlcnJvci50b1N0cmluZygpfWBcbiAgICAgICAgICApXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBmaWxlIG9mIGZpbGVzKSB7XG4gICAgICBpZiAodXBkYXRlRXJyb3IudmFsdWUpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBpZiAoZmlsZS5zaXplID09PSAwKSB7XG4gICAgICAgIHBhdGggPSAnL2V4dC91cGRhdGUvJyArIGZpbGUubmFtZVxuICAgICAgICBpZiAoZmlsZS5uYW1lLmVuZHNXaXRoKCcvJykpIHtcbiAgICAgICAgICBwYXRoID0gcGF0aC5zbGljZSgwLCAtMSlcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHVwZGF0ZVZlcnNpb25EaXIgPSBhd2FpdCBmbGlwcGVyU3RvcmUuZmxpcHBlclxuICAgICAgICAgID8uUlBDKCdzdG9yYWdlU3RhdCcsIHsgcGF0aCB9KVxuICAgICAgICAgIC5jYXRjaChhc3luYyAoZXJyb3I6IEVycm9yKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyb3IudG9TdHJpbmcoKSAhPT0gJ0VSUk9SX1NUT1JBR0VfTk9UX0VYSVNUJykge1xuICAgICAgICAgICAgICBjb25zdCBjb21tYW5kID0gJ3N0b3JhZ2VTdGF0J1xuICAgICAgICAgICAgICBycGNFcnJvckhhbmRsZXIoe1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudE5hbWUsXG4gICAgICAgICAgICAgICAgZXJyb3IsXG4gICAgICAgICAgICAgICAgY29tbWFuZFxuICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgICBgJHtjb21wb25lbnROYW1lfTogUlBDIGVycm9yIGluIGNvbW1hbmQgJyR7Y29tbWFuZH0nOiAke2Vycm9yLnRvU3RyaW5nKCl9YFxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBsb2dnZXIuZGVidWcoe1xuICAgICAgICAgICAgICAgIGNvbnRleHQ6IGNvbXBvbmVudE5hbWUsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ1N0b3JhZ2UgL2V4dC91cGRhdGUgbm90IGV4aXN0J1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG5cbiAgICAgICAgaWYgKCF1cGRhdGVWZXJzaW9uRGlyKSB7XG4gICAgICAgICAgYXdhaXQgZmxpcHBlclN0b3JlLmZsaXBwZXJcbiAgICAgICAgICAgID8uUlBDKCdzdG9yYWdlTWtkaXInLCB7IHBhdGggfSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+XG4gICAgICAgICAgICAgIGxvZ2dlci5kZWJ1Zyh7XG4gICAgICAgICAgICAgICAgY29udGV4dDogY29tcG9uZW50TmFtZSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBgc3RvcmFnZU1rZGlyOiAke3BhdGh9YFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcjogRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgY29tbWFuZCA9ICdzdG9yYWdlTWtkaXInXG4gICAgICAgICAgICAgIHJwY0Vycm9ySGFuZGxlcih7IGNvbXBvbmVudE5hbWUsIGVycm9yLCBjb21tYW5kIH0pXG5cbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgIGAke2NvbXBvbmVudE5hbWV9OiBSUEMgZXJyb3IgaW4gY29tbWFuZCAnJHtjb21tYW5kfSc6ICR7ZXJyb3IudG9TdHJpbmcoKX1gXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdyaXRlLnZhbHVlLmZpbGVuYW1lID0gZmlsZS5uYW1lLnNsaWNlKGZpbGUubmFtZS5sYXN0SW5kZXhPZignLycpICsgMSlcbiAgICAgICAgY29uc3QgdW5iaW5kID0gZmxpcHBlclN0b3JlLmZsaXBwZXI/LmVtaXR0ZXIub24oXG4gICAgICAgICAgJ3N0b3JhZ2VXcml0ZVJlcXVlc3QvcHJvZ3Jlc3MnLFxuICAgICAgICAgIChlOiB7IHByb2dyZXNzOiBudW1iZXI7IHRvdGFsOiBudW1iZXIgfSkgPT4ge1xuICAgICAgICAgICAgaWYgKCFmbGlwcGVyU3RvcmUuZmxpcHBlcj8uY29ubmVjdGVkKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgICBgRmxpcHBlciAke2ZsaXBwZXJTdG9yZS5mbGlwcGVyPy5uYW1lfSBub3QgY29ubmVjdGVkYFxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHdyaXRlLnZhbHVlLnByb2dyZXNzID0gZS5wcm9ncmVzcyAvIGUudG90YWxcbiAgICAgICAgICB9XG4gICAgICAgIClcbiAgICAgICAgYXdhaXQgZmxpcHBlclN0b3JlLmZsaXBwZXJcbiAgICAgICAgICA/LlJQQygnc3RvcmFnZVdyaXRlJywge1xuICAgICAgICAgICAgcGF0aDogJy9leHQvdXBkYXRlLycgKyBmaWxlLm5hbWUsXG4gICAgICAgICAgICBidWZmZXI6IGZpbGUuYnVmZmVyXG4gICAgICAgICAgfSlcbiAgICAgICAgICAudGhlbigoKSA9PlxuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKHtcbiAgICAgICAgICAgICAgY29udGV4dDogY29tcG9uZW50TmFtZSxcbiAgICAgICAgICAgICAgbWVzc2FnZTogYHN0b3JhZ2VXcml0ZTogL2V4dC91cGRhdGUvJHtmaWxlLm5hbWV9YFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApXG4gICAgICAgICAgLmNhdGNoKChlcnJvcjogRXJyb3IpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbW1hbmQgPSAnc3RvcmFnZVdyaXRlJ1xuICAgICAgICAgICAgcnBjRXJyb3JIYW5kbGVyKHsgY29tcG9uZW50TmFtZSwgZXJyb3IsIGNvbW1hbmQgfSlcblxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICBgJHtjb21wb25lbnROYW1lfTogUlBDIGVycm9yIGluIGNvbW1hbmQgJyR7Y29tbWFuZH0nOiAke2Vycm9yLnRvU3RyaW5nKCl9YFxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0pXG5cbiAgICAgICAgaWYgKHVuYmluZCkge1xuICAgICAgICAgIHVuYmluZCgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGF3YWl0IGFzeW5jU2xlZXAoMzAwKVxuICAgIH1cblxuICAgIHdyaXRlLnZhbHVlLmZpbGVuYW1lID0gJydcbiAgICB3cml0ZS52YWx1ZS5wcm9ncmVzcyA9IDBcblxuICAgIHVwZGF0ZVN0YWdlLnZhbHVlID0gJ0xvYWRpbmcgbWFuaWZlc3QuLi4nXG5cbiAgICBpZiAodXBkYXRlRXJyb3IudmFsdWUpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGF3YWl0IGZsaXBwZXJTdG9yZS5mbGlwcGVyXG4gICAgICA/LlJQQygnc3lzdGVtVXBkYXRlJywgeyBwYXRoOiBwYXRoICsgJy91cGRhdGUuZnVmJyB9KVxuICAgICAgLnRoZW4oKCkgPT5cbiAgICAgICAgbG9nZ2VyLmRlYnVnKHtcbiAgICAgICAgICBjb250ZXh0OiBjb21wb25lbnROYW1lLFxuICAgICAgICAgIG1lc3NhZ2U6ICdzeXN0ZW1VcGRhdGU6IE9LJ1xuICAgICAgICB9KVxuICAgICAgKVxuICAgICAgLmNhdGNoKChlcnJvcjogRXJyb3IpID0+IHtcbiAgICAgICAgY29uc3QgY29tbWFuZCA9ICdzeXN0ZW1VcGRhdGUnXG4gICAgICAgIHJwY0Vycm9ySGFuZGxlcih7IGNvbXBvbmVudE5hbWUsIGVycm9yLCBjb21tYW5kIH0pXG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGAke2NvbXBvbmVudE5hbWV9OiBSUEMgZXJyb3IgaW4gY29tbWFuZCAnJHtjb21tYW5kfSc6ICR7ZXJyb3IudG9TdHJpbmcoKX1gXG4gICAgICAgIClcbiAgICAgIH0pXG5cbiAgICB1cGRhdGVTdGFnZS52YWx1ZSA9ICdVcGRhdGUgaW4gcHJvZ3Jlc3MsIHBheSBhdHRlbnRpb24gdG8geW91ciBGbGlwcGVyJ1xuXG4gICAgYXdhaXQgZmxpcHBlclN0b3JlLmZsaXBwZXJcbiAgICAgID8uUlBDKCdzeXN0ZW1SZWJvb3QnLCB7IG1vZGU6ICdVUERBVEUnIH0pXG4gICAgICAuY2F0Y2goKGVycm9yOiBFcnJvcikgPT4ge1xuICAgICAgICBjb25zdCBjb21tYW5kID0gJ3N5c3RlbVJlYm9vdCdcbiAgICAgICAgcnBjRXJyb3JIYW5kbGVyKHsgY29tcG9uZW50TmFtZSwgZXJyb3IsIGNvbW1hbmQgfSlcblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYCR7Y29tcG9uZW50TmFtZX06IFJQQyBlcnJvciBpbiBjb21tYW5kICcke2NvbW1hbmR9JzogJHtlcnJvci50b1N0cmluZygpfWBcbiAgICAgICAgKVxuICAgICAgfSlcblxuICAgIGZsaXBwZXJTdG9yZS5mbGFncy53YWl0Rm9yUmVjb25uZWN0ID0gdHJ1ZVxuICAgIGZsaXBwZXJTdG9yZS5mbGFncy5hdXRvUmVjb25uZWN0ID0gdHJ1ZVxuICB9IGVsc2Uge1xuICAgIHVwZGF0ZUVycm9yLnZhbHVlID0gdHJ1ZVxuXG4gICAgdXBkYXRlU3RhZ2UudmFsdWUgPSAnRmFpbGVkIHRvIGZldGNoIGNoYW5uZWwnXG5cbiAgICBzaG93Tm90aWYoe1xuICAgICAgbWVzc2FnZTogJ1VuYWJsZSB0byBsb2FkIGZpcm13YXJlIGNoYW5uZWwgZnJvbSB0aGUgYnVpbGQgc2VydmVyLicsXG4gICAgICBjb2xvcjogJ25lZ2F0aXZlJyxcbiAgICAgIGFjdGlvbnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGxhYmVsOiAnUmVsb2FkJyxcbiAgICAgICAgICBjb2xvcjogJ3doaXRlJyxcbiAgICAgICAgICBoYW5kbGVyOiAoKSA9PiB7XG4gICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0pXG4gICAgdGhyb3cgbmV3IEVycm9yKHVwZGF0ZVN0YWdlLnZhbHVlKVxuICB9XG59XG5cbmNvbnN0IGNhbmNlbFVwZGF0ZSA9ICgpID0+IHtcbiAgZmxpcHBlclN0b3JlLmZsYWdzLndhaXRGb3JSZWNvbm5lY3QgPSBmYWxzZVxuICBmbGlwcGVyU3RvcmUuZmxhZ3MudXBkYXRlSW5Qcm9ncmVzcyA9IGZhbHNlXG4gIHVwZGF0ZUVycm9yLnZhbHVlID0gZmFsc2VcbiAgdXBkYXRlU3RhZ2UudmFsdWUgPSAnJ1xuICAvLyByZWxvYWQoKVxufVxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJmdWxsLXdpZHRoXCI+XG4gICAgPHEtYnRuXG4gICAgICBjbGFzcz1cImZ1bGwtd2lkdGggdGV4dC1ib2xkIHRleHQtYm9keTFcIlxuICAgICAgQGNsaWNrPVwic2hvd0Z1bGxJbmZvXCJcbiAgICAgIGZsYXRcbiAgICAgIHBhZGRpbmc9XCJ4cyAwIHhzIHhzXCJcbiAgICAgIGxhYmVsPVwiRGV2aWNlIEluZm9cIlxuICAgICAgaWNvbi1yaWdodD1cIm1kaS1jaGV2cm9uLXJpZ2h0XCJcbiAgICAgIGFsaWduPVwiYmV0d2VlblwiXG4gICAgICBuby1jYXBzXG4gICAgLz5cblxuICAgIDxxLWRpYWxvZyB2LW1vZGVsPVwiZnVsbEluZm9EaWFsb2dcIj5cbiAgICAgIDxxLWNhcmQgc3R5bGU9XCJtYXgtd2lkdGg6IDM3NXB4XCI+XG4gICAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInEtcGItbm9uZVwiPlxuICAgICAgICAgIDxwIGNsYXNzPVwicS1tYi1ub25lIHRleHQtaDYgdGV4dC1ib2xkXCI+RGV2aWNlIEluZm88L3A+XG4gICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cImNvbHVtbiBxLWd1dHRlci15LW1kIGZ1bGwtd2lkdGhcIj5cbiAgICAgICAgICA8dGVtcGxhdGUgdi1mb3I9XCJpbmZvQmxvY2sgaW4gZnVsbEluZm9cIiA6a2V5PVwiaW5mb0Jsb2NrLnRpdGxlXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnVsbC13aWR0aFwiPlxuICAgICAgICAgICAgICA8cCBjbGFzcz1cInEtbWItbm9uZSB0ZXh0LWJvZHkxIHRleHQtYm9sZFwiPlxuICAgICAgICAgICAgICAgIHt7IGluZm9CbG9jay50aXRsZSB9fVxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5cIj5cbiAgICAgICAgICAgICAgICA8dGVtcGxhdGVcbiAgICAgICAgICAgICAgICAgIHYtZm9yPVwiKHZhbHVlLCBpbmRleCkgaW4gaW5mb0Jsb2NrLnZhbHVlc1wiXG4gICAgICAgICAgICAgICAgICA6a2V5PVwidmFsdWU/LmxhYmVsXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8dGVtcGxhdGUgdi1pZj1cInZhbHVlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicS1teS14cyByb3cgbm8td3JhcCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LXdlaWdodC1tZWRpdW0gdGV4dC1uby13cmFwIHEtbXIteGxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPnt7IHZhbHVlPy5sYWJlbCB9fTo8L3NwYW5cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LXJpZ2h0IHRleHQtbW9ub1wiPnt7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT8udmFsdWUucmVwbGFjZSgvXFwvL2csICcvJiM4MjAzOycpXG4gICAgICAgICAgICAgICAgICAgICAgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgIHYtc2hvdz1cImluZGV4ICE9PSBpbmZvQmxvY2sudmFsdWVzLmxlbmd0aCAtIDFcIlxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiZnVsbC13aWR0aCBiZy1ncmV5LTNcIlxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwiaGVpZ2h0OiAxcHhcIlxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICA8L3EtY2FyZD5cbiAgICA8L3EtZGlhbG9nPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgeyBjb21wdXRlZCwgcmVmIH0gZnJvbSAndnVlJ1xuaW1wb3J0IHsgZ2V0UmFkaW9TdGFja1R5cGUgfSBmcm9tICdlbnRpdHkvRmxpcHBlci9saWIvUmFkaW9TdGFja1R5cGUnXG5cbmltcG9ydCB7IEZsaXBwZXJNb2RlbCB9IGZyb20gJ2VudGl0eS9GbGlwcGVyJ1xuY29uc3QgZmxpcHBlclN0b3JlID0gRmxpcHBlck1vZGVsLnVzZUZsaXBwZXJTdG9yZSgpXG5cbmNvbnN0IGluZm8gPSBjb21wdXRlZCgoKSA9PiBmbGlwcGVyU3RvcmUuaW5mbylcbmNvbnN0IGhhcmR3YXJlID0gY29tcHV0ZWQoKCkgPT4gaW5mby52YWx1ZT8uaGFyZHdhcmUpXG5jb25zdCBmaXJtd2FyZSA9IGNvbXB1dGVkKCgpID0+IGluZm8udmFsdWU/LmZpcm13YXJlKVxuXG5pbnRlcmZhY2UgUmVzdWx0SXRlbSB7XG4gIGxhYmVsOiBzdHJpbmdcbiAgdmFsdWU6IHN0cmluZ1xufVxuXG5jb25zdCBjcmVhdGVWYWx1ZSA9ICh0aXRsZTogc3RyaW5nLCB2YWx1ZT86IHN0cmluZyk6IFJlc3VsdEl0ZW0gfCB1bmRlZmluZWQgPT4ge1xuICBpZiAodmFsdWUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbGFiZWw6IHRpdGxlLFxuICAgICAgdmFsdWVcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdW5kZWZpbmVkXG59XG5cbmNvbnN0IHJhZGlvU3RhY2tGb3JtYXR0ZWQgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGNvbnN0IG1ham9yID0gaW5mby52YWx1ZT8ucmFkaW8uc3RhY2subWFqb3JcbiAgY29uc3QgbWlub3IgPSBpbmZvLnZhbHVlPy5yYWRpby5zdGFjay5taW5vclxuICBjb25zdCBzdWIgPSBpbmZvLnZhbHVlPy5yYWRpby5zdGFjay5zdWJcbiAgY29uc3QgdHlwZSA9IGdldFJhZGlvU3RhY2tUeXBlKGluZm8udmFsdWU/LnJhZGlvLnN0YWNrLnR5cGUpXG5cbiAgcmV0dXJuIGAke21ham9yfS4ke21pbm9yfS4ke3N1Yn0gKCR7dHlwZSA/PyAnVW5rbm93bid9KWBcbn0pXG5cbmZ1bmN0aW9uIGNhcGl0YWxpemUoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnNsaWNlKDEpXG59XG5cbmZ1bmN0aW9uIHNob3VsZElnbm9yZShjdXJyZW50UGF0aDogc3RyaW5nLCBpZ25vcmVLZXlzOiBzdHJpbmdbXSk6IGJvb2xlYW4ge1xuICBjb25zdCBub3JtYWxpemVkUGF0aCA9IGN1cnJlbnRQYXRoLnRvTG93ZXJDYXNlKCkudHJpbSgpXG4gIGNvbnN0IHBhdGhQYXJ0cyA9IG5vcm1hbGl6ZWRQYXRoLnNwbGl0KCcgJylcbiAgY29uc3QgbGFzdFBhcnQgPSBwYXRoUGFydHNbcGF0aFBhcnRzLmxlbmd0aCAtIDFdXG5cbiAgcmV0dXJuIGlnbm9yZUtleXMuc29tZSgoaWdub3JlSXRlbSkgPT4ge1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRJZ25vcmUgPSBpZ25vcmVJdGVtLnRvTG93ZXJDYXNlKCkudHJpbSgpXG4gICAgaWYgKG5vcm1hbGl6ZWRJZ25vcmUuaW5jbHVkZXMoJyAnKSkge1xuICAgICAgcmV0dXJuIG5vcm1hbGl6ZWRJZ25vcmUgPT09IG5vcm1hbGl6ZWRQYXRoXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBub3JtYWxpemVkSWdub3JlID09PSBsYXN0UGFydFxuICAgIH1cbiAgfSlcbn1cblxuZnVuY3Rpb24gdHJhdmVyc2VPYmplY3QoXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gIG9iajogUmVjb3JkPHN0cmluZywgYW55PixcbiAgaWdub3JlS2V5czogc3RyaW5nW10gPSBbXSxcbiAgcGFyZW50S2V5czogc3RyaW5nW10gPSBbXVxuKTogUmVzdWx0SXRlbVtdIHtcbiAgbGV0IHJlc3VsdDogUmVzdWx0SXRlbVtdID0gW11cblxuICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgY3VycmVudEtleXMgPSBbLi4ucGFyZW50S2V5cywgY2FwaXRhbGl6ZShrZXkpXVxuICAgIGNvbnN0IGN1cnJlbnRQYXRoID0gY3VycmVudEtleXMuam9pbignICcpXG5cbiAgICBpZiAoc2hvdWxkSWdub3JlKGN1cnJlbnRQYXRoLCBpZ25vcmVLZXlzKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgdmFsdWUgPSBvYmpba2V5XVxuXG4gICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICByZXN1bHQgPSByZXN1bHQuY29uY2F0KHRyYXZlcnNlT2JqZWN0KHZhbHVlLCBpZ25vcmVLZXlzLCBjdXJyZW50S2V5cykpXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IE51bWJlci5pc0ludGVnZXIodmFsdWUpKSB7XG4gICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgIGxhYmVsOiBjdXJyZW50S2V5cy5qb2luKCcgJyksXG4gICAgICAgIHZhbHVlOiBTdHJpbmcodmFsdWUpXG4gICAgICB9KVxuICAgIH1cbiAgfSlcblxuICByZXR1cm4gcmVzdWx0XG59XG5cbmNvbnN0IGlzRGV0YWlsUmVnaW9uID0gKFxuICByZWdpb24/OiBGbGlwcGVyTW9kZWwuRGV2aWNlSW5mb1snaGFyZHdhcmUnXVsncmVnaW9uJ11cbik6IHJlZ2lvbiBpcyBGbGlwcGVyTW9kZWwuRGV0YWlsUmVnaW9uID0+IHtcbiAgcmV0dXJuIHJlZ2lvbiAhPT0gJzAnXG59XG5cbmNvbnN0IGZ1bGxJbmZvID0gY29tcHV0ZWQoKCkgPT4ge1xuICByZXR1cm4gW1xuICAgIHtcbiAgICAgIHRpdGxlOiAnRmxpcHBlciBEZXZpY2UnLFxuICAgICAgdmFsdWVzOiBbXG4gICAgICAgIGNyZWF0ZVZhbHVlKCdEZXZpY2UgTmFtZScsIGhhcmR3YXJlLnZhbHVlPy5uYW1lKSxcbiAgICAgICAgY3JlYXRlVmFsdWUoJ0hhcmR3YXJlIE1vZGVsJywgaGFyZHdhcmUudmFsdWU/Lm1vZGVsKSxcbiAgICAgICAgY3JlYXRlVmFsdWUoXG4gICAgICAgICAgJ0hhcmR3YXJlIFJlZ2lvbicsXG4gICAgICAgICAgaGFyZHdhcmUudmFsdWUgJiYgaXNEZXRhaWxSZWdpb24oaGFyZHdhcmUudmFsdWUucmVnaW9uKVxuICAgICAgICAgICAgPyBoYXJkd2FyZS52YWx1ZS5yZWdpb24uYnVpbHRpblxuICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgKSxcbiAgICAgICAgY3JlYXRlVmFsdWUoXG4gICAgICAgICAgJ0hhcmR3YXJlIFJlZ2lvbiBQcm92aXNpb25lZCcsXG4gICAgICAgICAgaGFyZHdhcmUudmFsdWUgJiYgaXNEZXRhaWxSZWdpb24oaGFyZHdhcmUudmFsdWUucmVnaW9uKVxuICAgICAgICAgICAgPyBoYXJkd2FyZS52YWx1ZS5yZWdpb24ucHJvdmlzaW9uZWRcbiAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICksXG4gICAgICAgIGNyZWF0ZVZhbHVlKCdIYXJkd2FyZSBWZXJzaW9uJywgaGFyZHdhcmUudmFsdWU/LnZlciksXG4gICAgICAgIGNyZWF0ZVZhbHVlKCdIYXJkd2FyZSBPVFAgVmVyc2lvbicsIGhhcmR3YXJlLnZhbHVlPy5vdHAudmVyKSxcbiAgICAgICAgY3JlYXRlVmFsdWUoJ1NlcmlhbCBOdW1iZXInLCBoYXJkd2FyZS52YWx1ZT8udWlkKVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICdGaXJtd2FyZScsXG4gICAgICB2YWx1ZXM6IFtcbiAgICAgICAgY3JlYXRlVmFsdWUoXG4gICAgICAgICAgJ1NvZnR3YXJlIFJldmlzaW9uJyxcbiAgICAgICAgICBgJHtmaXJtd2FyZS52YWx1ZT8uYnJhbmNoLm5hbWV9ICR7ZmlybXdhcmUudmFsdWU/LmNvbW1pdC5oYXNofWBcbiAgICAgICAgKSxcbiAgICAgICAgY3JlYXRlVmFsdWUoJ0J1aWxkIERhdGUnLCBmaXJtd2FyZS52YWx1ZT8uYnVpbGQuZGF0ZSksXG4gICAgICAgIGNyZWF0ZVZhbHVlKCdUYXJnZXQnLCBmaXJtd2FyZS52YWx1ZT8udGFyZ2V0KSxcbiAgICAgICAgY3JlYXRlVmFsdWUoXG4gICAgICAgICAgJ1Byb3RvYnVmIFZlcnNpb24nLFxuICAgICAgICAgIGAke2luZm8udmFsdWU/LnByb3RvYnVmLnZlcnNpb24ubWFqb3J9LiR7aW5mby52YWx1ZT8ucHJvdG9idWYudmVyc2lvbi5taW5vcn1gXG4gICAgICAgIClcbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAnUmFkaW8gU3RhY2snLFxuICAgICAgdmFsdWVzOiBbY3JlYXRlVmFsdWUoJ1NvZnR3YXJlIFJldmlzaW9uJywgcmFkaW9TdGFja0Zvcm1hdHRlZC52YWx1ZSldXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ090aGVyJyxcbiAgICAgIHZhbHVlczogdHJhdmVyc2VPYmplY3QoaW5mby52YWx1ZSEsIFtcbiAgICAgICAgJ0hhcmR3YXJlIE5hbWUnLFxuICAgICAgICAnSGFyZHdhcmUgTW9kZWwnLFxuICAgICAgICAnSGFyZHdhcmUgUmVnaW9uJyxcbiAgICAgICAgJ0hhcmR3YXJlIFZlcicsXG4gICAgICAgICdIYXJkd2FyZSBPdHAgVmVyJyxcbiAgICAgICAgJ0hhcmR3YXJlIFVpZCcsXG4gICAgICAgICdGaXJtd2FyZSBDb21taXQnLFxuICAgICAgICAnRmlybXdhcmUgQnVpbGQgRGF0ZScsXG4gICAgICAgICdGaXJtd2FyZSBUYXJnZXQnLFxuICAgICAgICAnSW5mbyBQcm90b2J1ZiBWZXJzaW9uJyxcbiAgICAgICAgJ0luZm8gUmFkaW8gU3RhY2sgTWFqb3InLFxuICAgICAgICAnSW5mbyBSYWRpbyBTdGFjayBNaW5vcicsXG4gICAgICAgICdJbmZvIFJhZGlvIFN0YWNrIFN1YicsXG4gICAgICAgICdJbmZvIFJhZGlvIFN0YWNrIFR5cGUnXG4gICAgICBdKS5zb3J0KChhLCBiKSA9PiBhLmxhYmVsLmxvY2FsZUNvbXBhcmUoYi5sYWJlbCkpXG4gICAgfVxuICBdXG59KVxuXG5jb25zdCBmdWxsSW5mb0RpYWxvZyA9IHJlZihmYWxzZSlcbmNvbnN0IHNob3dGdWxsSW5mbyA9ICgpID0+IHtcbiAgZnVsbEluZm9EaWFsb2cudmFsdWUgPSB0cnVlXG5cbiAgZmxpcHBlclN0b3JlLmZsaXBwZXI/LmdldEluZm8oeyBpZ25vcmVMb2FkaW5nOiB0cnVlIH0pXG59XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cImZ1bGwtd2lkdGhcIiBzdHlsZT1cIm1heC13aWR0aDogNzAwcHhcIj5cbiAgICA8dGVtcGxhdGUgdi1pZj1cIiFmbGlwcGVyU3RvcmUubG9hZGluZ0luZm9cIj5cbiAgICAgIDx0ZW1wbGF0ZSB2LWlmPVwiZmxpcHBlclN0b3JlLmluZm9cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbiBpdGVtcy1jZW50ZXIgZnVsbC13aWR0aFwiPlxuICAgICAgICAgIDxGbGlwcGVyQm9keVxuICAgICAgICAgICAgY2xhc3M9XCJxLW1iLXhsXCJcbiAgICAgICAgICAgIHJlZj1cInJlZkZsaXBwZXJCb2R5XCJcbiAgICAgICAgICAgIHYtYmluZD1cImZsaXBwZXJCb2R5XCJcbiAgICAgICAgICAgIDpzaG93U2NyZWVuVXBkYXRpbmc9XCJmbGlwcGVyU3RvcmUuZmxhZ3MudXBkYXRlSW5Qcm9ncmVzc1wiXG4gICAgICAgICAgICA6aXNTY3JlZW5TdHJlYW09XCJmbGlwcGVyU3RvcmUuaXNTY3JlZW5TdHJlYW1cIlxuICAgICAgICAgICAgOm9yaWVudGF0aW9uPVwib3JpZW50YXRpb25cIlxuICAgICAgICAgICAgQGV4cGFuZFZpZXc9XCJleHBhbmRWaWV3XCJcbiAgICAgICAgICAvPlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzPVwicS1tYi1tZCBxLW10LXNtIGZ1bGwtd2lkdGhcIlxuICAgICAgICAgICAgOmNsYXNzPVwie1xuICAgICAgICAgICAgICAncm93IGl0ZW1zLXN0YXJ0JzogJHEuc2NyZWVuLmd0LnhzLFxuICAgICAgICAgICAgICAnY29sdW1uIGl0ZW1zLWNlbnRlcic6ICRxLnNjcmVlbi5sdC5zbVxuICAgICAgICAgICAgfVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBjbGFzcz1cImNvbFwiXG4gICAgICAgICAgICAgIDpjbGFzcz1cIntcbiAgICAgICAgICAgICAgICAncS1tci14bCc6ICRxLnNjcmVlbi5ndC54cyxcbiAgICAgICAgICAgICAgICAnZnVsbC13aWR0aCBxLW1iLW1kJzogJHEuc2NyZWVuLmx0LnNtXG4gICAgICAgICAgICAgIH1cIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8RmxpcHBlckRldGFpbEluZm8gLz5cbiAgICAgICAgICAgICAgPEZsaXBwZXJJbmZvIGNsYXNzPVwicS1weC14cyBxLXByLXNtXCIgdi1iaW5kPVwiaW5mb1wiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgY2xhc3M9XCJjb2xcIlxuICAgICAgICAgICAgICA6Y2xhc3M9XCJ7XG4gICAgICAgICAgICAgICAgJ2Z1bGwtaGVpZ2h0JzogJHEuc2NyZWVuLmd0LnhzLFxuICAgICAgICAgICAgICAgICdmdWxsLXdpZHRoJzogJHEuc2NyZWVuLmx0LnNtXG4gICAgICAgICAgICAgIH1cIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8RmxpcHBlclVwZGF0ZSBAdXBkYXRlSW5Qcm9ncmVzcz1cInN0b3BTY3JlZW5TdHJlYW1cIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICA8L3RlbXBsYXRlPlxuICAgIDx0ZW1wbGF0ZSB2LWVsc2U+XG4gICAgICA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktY2VudGVyIHEtbXktbWRcIj5cbiAgICAgICAgPExvYWRpbmcgbGFiZWw9XCJMb2FkaW5nIGluZm8uLi5cIiAvPlxuICAgICAgPC9kaXY+XG4gICAgPC90ZW1wbGF0ZT5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHtcbiAgcmVmLFxuICBjb21wdXRlZCxcbiAgLyogb25CZWZvcmVNb3VudCwgKi8gb25Nb3VudGVkLFxuICBvbkJlZm9yZVVubW91bnQsXG4gIHdhdGNoLFxuICBuZXh0VGlja1xufSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJ3NoYXJlZC9saWIvdXRpbHMvdXNlTG9nJ1xuaW1wb3J0IHsgcnBjRXJyb3JIYW5kbGVyIH0gZnJvbSAnc2hhcmVkL2xpYi91dGlscy91c2VScGNVdGlscydcblxuaW1wb3J0IHsgTG9hZGluZyB9IGZyb20gJ3NoYXJlZC9jb21wb25lbnRzL0xvYWRpbmcnXG5pbXBvcnQgeyBGbGlwcGVyVXBkYXRlLCBGbGlwcGVyRGV0YWlsSW5mbyB9IGZyb20gJ2ZlYXR1cmVzL0ZsaXBwZXInXG5pbXBvcnQgeyBGbGlwcGVyQm9keSwgRmxpcHBlckluZm8sIEZsaXBwZXJNb2RlbCB9IGZyb20gJ2VudGl0eS9GbGlwcGVyJ1xuY29uc3QgZmxpcHBlclN0b3JlID0gRmxpcHBlck1vZGVsLnVzZUZsaXBwZXJTdG9yZSgpXG5cbmZsaXBwZXJTdG9yZS5wYWdlV2l0aFNjcmVlblN0cmVhbSA9IHRydWVcblxuaW1wb3J0IHsgYnl0ZXNUb1NpemUgfSBmcm9tICdzaGFyZWQvbGliL3V0aWxzL2J5dGVzVG9TaXplJ1xuXG5pbXBvcnQgeyBGbGlwcGVyRnJhbWVSZW5kZXJlciB9IGZyb20gJ3NoYXJlZC9saWIvZmxpcHBlckpzJ1xuXG4vLyBvbkJlZm9yZU1vdW50KCgpID0+IHtcbi8vICAgaWYgKGZsaXBwZXJTdG9yZS5pc0VsZWN0cm9uKSB7XG4vLyAgICAgaWYgKGZsaXBwZXJTdG9yZS5pbmZvKSB7XG4vLyAgICAgICBpZiAoZmxpcHBlclN0b3JlLmZsaXBwZXIpIHtcbi8vICAgICAgICAgZmxpcHBlclN0b3JlLmZsaXBwZXIuaW5mbyA9IG51bGxcbi8vICAgICAgIH1cbi8vICAgICB9XG4vLyAgIH1cbi8vIH0pXG5cbmNvbnN0IGNvbXBvbmVudE5hbWUgPSAnRGV2aWNlSW5mbydcblxuY29uc3Qgc2RDYXJkVXNhZ2UgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGlmIChcbiAgICBmbGlwcGVyU3RvcmUuaW5mbz8uc3RvcmFnZS5zZGNhcmQ/LnRvdGFsU3BhY2UgJiZcbiAgICBmbGlwcGVyU3RvcmUuaW5mbz8uc3RvcmFnZS5zZGNhcmQ/LmZyZWVTcGFjZVxuICApIHtcbiAgICByZXR1cm4gYCR7Ynl0ZXNUb1NpemUoXG4gICAgICBmbGlwcGVyU3RvcmUuaW5mbz8uc3RvcmFnZS5zZGNhcmQ/LnRvdGFsU3BhY2UgLVxuICAgICAgICBmbGlwcGVyU3RvcmUuaW5mbz8uc3RvcmFnZS5zZGNhcmQ/LmZyZWVTcGFjZVxuICAgICl9IC8gJHtieXRlc1RvU2l6ZShmbGlwcGVyU3RvcmUuaW5mbz8uc3RvcmFnZS5zZGNhcmQ/LnRvdGFsU3BhY2UpfWBcbiAgfVxuXG4gIHJldHVybiAnTm8gU0QgY2FyZCdcbn0pXG5cbmNvbnN0IGhhcmR3YXJlVmVyc2lvbiA9IGNvbXB1dGVkKCgpID0+IHtcbiAgcmV0dXJuIChcbiAgICBmbGlwcGVyU3RvcmUuaW5mbz8uaGFyZHdhcmUudmVyICtcbiAgICAnLkYnICtcbiAgICBmbGlwcGVyU3RvcmUuaW5mbz8uaGFyZHdhcmUudGFyZ2V0ICtcbiAgICAnQicgK1xuICAgIGZsaXBwZXJTdG9yZS5pbmZvPy5oYXJkd2FyZS5ib2R5ICtcbiAgICAnQycgK1xuICAgIGZsaXBwZXJTdG9yZS5pbmZvPy5oYXJkd2FyZS5jb25uZWN0XG4gIClcbn0pXG5cbmNvbnN0IHJhZGlvVmVyc2lvbiA9IGNvbXB1dGVkKCgpID0+IHtcbiAgcmV0dXJuIGZsaXBwZXJTdG9yZS5pbmZvPy5yYWRpby5hbGl2ZSAhPT0gJ2ZhbHNlJ1xuICAgID8gZmxpcHBlclN0b3JlLmluZm8/LnJhZGlvLnN0YWNrLm1ham9yICtcbiAgICAgICAgJy4nICtcbiAgICAgICAgZmxpcHBlclN0b3JlLmluZm8/LnJhZGlvLnN0YWNrLm1pbm9yICtcbiAgICAgICAgJy4nICtcbiAgICAgICAgZmxpcHBlclN0b3JlLmluZm8/LnJhZGlvLnN0YWNrLnN1YlxuICAgIDogJ2NvcnJ1cHQnXG59KVxuXG5jb25zdCBpbmZvID0gcmVmKHtcbiAgZmlybXdhcmVWZXJzaW9uOiBjb21wdXRlZCgoKSA9PiB7XG4gICAgaWYgKGZsaXBwZXJTdG9yZS5pbmZvPy5maXJtd2FyZS5icmFuY2gubmFtZSA9PT0gJ2RldicpIHtcbiAgICAgIHJldHVybiBgRGV2ICR7ZmxpcHBlclN0b3JlLmluZm8/LmZpcm13YXJlLmNvbW1pdC5oYXNofWBcbiAgICB9XG4gICAgcmV0dXJuIGZsaXBwZXJTdG9yZS5pbmZvPy5maXJtd2FyZS52ZXJzaW9uXG4gIH0pLFxuICBidWlsZERhdGU6IGNvbXB1dGVkKCgpID0+IGZsaXBwZXJTdG9yZS5pbmZvPy5maXJtd2FyZS5idWlsZC5kYXRlKSxcbiAgc2RDYXJkVXNhZ2U6IGNvbXB1dGVkKCgpID0+IHNkQ2FyZFVzYWdlLnZhbHVlKSxcbiAgZGF0YWJhc2VTdGF0dXM6IGNvbXB1dGVkKCgpID0+IGZsaXBwZXJTdG9yZS5pbmZvPy5zdG9yYWdlLmRhdGFiYXNlcz8uc3RhdHVzKSxcbiAgaGFyZHdhcmVWZXJzaW9uOiBjb21wdXRlZCgoKSA9PiBoYXJkd2FyZVZlcnNpb24udmFsdWUpLFxuICByYWRpb1ZlcnNpb246IGNvbXB1dGVkKCgpID0+IHJhZGlvVmVyc2lvbi52YWx1ZSksXG4gIHJhZGlvU3RhY2tUeXBlOiBjb21wdXRlZCgoKSA9PiBmbGlwcGVyU3RvcmUuaW5mbz8ucmFkaW8uc3RhY2sudHlwZSlcbn0pXG5cbmNvbnN0IGZsaXBwZXJCb2R5ID0gcmVmKHtcbiAgZmxpcHBlck5hbWU6IGNvbXB1dGVkKCgpID0+IGZsaXBwZXJTdG9yZS5pbmZvPy5oYXJkd2FyZS5uYW1lKSxcbiAgZmxpcHBlckNvbG9yOiBjb21wdXRlZCgoKSA9PiBmbGlwcGVyU3RvcmUuaW5mbz8uaGFyZHdhcmUuY29sb3IpXG59KVxuXG5jb25zdCByZWZGbGlwcGVyQm9keSA9IHJlZjx0eXBlb2YgRmxpcHBlckJvZHk+KClcbmNvbnN0IHNjcmVlblN0cmVhbUNhbnZhcyA9IGNvbXB1dGVkPEhUTUxDYW52YXNFbGVtZW50PihcbiAgKCkgPT4gcmVmRmxpcHBlckJvZHkudmFsdWU/LnNjcmVlblN0cmVhbUNhbnZhc1xuKVxuY29uc3QgZnJhbWVSZW5kZXJlciA9IHJlZjxGbGlwcGVyRnJhbWVSZW5kZXJlcj4oKVxuXG5jb25zdCBleHBhbmRWaWV3ID0gYXN5bmMgKCkgPT4ge1xuICBmbGlwcGVyU3RvcmUuZXhwYW5kVmlldyA9IHRydWVcbn1cblxuY29uc3QgdW5iaW5kRnJhbWUgPSByZWYoKVxuY29uc3Qgb3JpZW50YXRpb24gPSByZWYoMClcblxuY29uc3Qgc3RhcnRTY3JlZW5TdHJlYW0gPSBhc3luYyAoKSA9PiB7XG4gIGF3YWl0IGZsaXBwZXJTdG9yZVxuICAgIC5zdGFydFNjcmVlblN0cmVhbSgpXG4gICAgLnRoZW4oKCkgPT4ge1xuICAgICAgbG9nZ2VyLmRlYnVnKHtcbiAgICAgICAgY29udGV4dDogY29tcG9uZW50TmFtZSxcbiAgICAgICAgbWVzc2FnZTogJ2d1aVN0YXJ0U2NyZWVuU3RyZWFtOiBPSydcbiAgICAgIH0pXG5cbiAgICAgIHVuYmluZEZyYW1lLnZhbHVlID0gZmxpcHBlclN0b3JlLmZsaXBwZXI/LmVtaXR0ZXIub24oXG4gICAgICAgICdzY3JlZW5TdHJlYW0vZnJhbWUnLFxuICAgICAgICAoZGF0YTogVWludDhBcnJheSwgZnJhbWVPcmllbnRhdGlvbjogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgb3JpZW50YXRpb24udmFsdWUgPSBOdW1iZXIoZnJhbWVPcmllbnRhdGlvbilcblxuICAgICAgICAgIGlmIChzY3JlZW5TdHJlYW1DYW52YXMudmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChmcmFtZVJlbmRlcmVyLnZhbHVlKSB7XG4gICAgICAgICAgICAgIGZyYW1lUmVuZGVyZXIudmFsdWUucmVuZGVyRnJhbWUoeyBkYXRhIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApXG4gICAgfSlcbiAgICAuY2F0Y2goKGVycm9yOiBFcnJvcikgPT4ge1xuICAgICAgcnBjRXJyb3JIYW5kbGVyKHtcbiAgICAgICAgY29tcG9uZW50TmFtZSxcbiAgICAgICAgZXJyb3IsXG4gICAgICAgIGNvbW1hbmQ6ICdndWlTdGFydFNjcmVlblN0cmVhbSdcbiAgICAgIH0pXG4gICAgfSlcbn1cblxuY29uc3Qgc3RvcFNjcmVlblN0cmVhbSA9IGFzeW5jICgpID0+IHtcbiAgYXdhaXQgZmxpcHBlclN0b3JlXG4gICAgLnN0b3BTY3JlZW5TdHJlYW0oKVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIGxvZ2dlci5kZWJ1Zyh7XG4gICAgICAgIGNvbnRleHQ6IGNvbXBvbmVudE5hbWUsXG4gICAgICAgIG1lc3NhZ2U6ICdndWlTdG9wU2NyZWVuU3RyZWFtOiBPSydcbiAgICAgIH0pXG5cbiAgICAgIGlmICh1bmJpbmRGcmFtZS52YWx1ZSkge1xuICAgICAgICB1bmJpbmRGcmFtZS52YWx1ZSgpXG4gICAgICB9XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycm9yOiBFcnJvcikgPT4ge1xuICAgICAgcnBjRXJyb3JIYW5kbGVyKHtcbiAgICAgICAgY29tcG9uZW50TmFtZSxcbiAgICAgICAgZXJyb3IsXG4gICAgICAgIGNvbW1hbmQ6ICdndWlTdG9wU2NyZWVuU3RyZWFtJ1xuICAgICAgfSlcbiAgICB9KVxufVxuXG5vbk1vdW50ZWQoYXN5bmMgKCkgPT4ge1xuICAvLyBpZiAoZmxpcHBlclN0b3JlLm9sZEZsaXBwZXIpIHtcbiAgLy8gICBpZiAoZmxpcHBlclN0b3JlLm9sZEZsaXBwZXIgaW5zdGFuY2VvZiBGbGlwcGVyRWxlY3Ryb24pIHtcbiAgLy8gICAgIGZsaXBwZXJTdG9yZS5vbGRGbGlwcGVyLnN0b3BTY3JlZW5TdHJlYW0oKVxuICAvLyAgIH1cbiAgLy8gfVxuXG4gIGlmIChmbGlwcGVyU3RvcmUuZmxpcHBlclJlYWR5KSB7XG4gICAgaWYgKCFmbGlwcGVyU3RvcmUucnBjQWN0aXZlKSB7XG4gICAgICBhd2FpdCBmbGlwcGVyU3RvcmUuZmxpcHBlcj8uc3RhcnRSUENTZXNzaW9uKClcbiAgICB9XG5cbiAgICBpZiAoIWZsaXBwZXJTdG9yZS5pbmZvKSB7XG4gICAgICBhd2FpdCBmbGlwcGVyU3RvcmUuZmxpcHBlcj8uZ2V0SW5mbygpXG4gICAgfVxuXG4gICAgaWYgKGZsaXBwZXJTdG9yZS5ycGNBY3RpdmUpIHtcbiAgICAgIGlmICghZmxpcHBlclN0b3JlLmlzU2NyZWVuU3RyZWFtKSB7XG4gICAgICAgIGF3YWl0IHN0YXJ0U2NyZWVuU3RyZWFtKClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoc2NyZWVuU3RyZWFtQ2FudmFzLnZhbHVlKSB7XG4gICAgZnJhbWVSZW5kZXJlci52YWx1ZSA9IG5ldyBGbGlwcGVyRnJhbWVSZW5kZXJlcihzY3JlZW5TdHJlYW1DYW52YXMudmFsdWUpXG5cbiAgICBpZiAoZmxpcHBlclN0b3JlLmZsaXBwZXI/LmZyYW1lRGF0YSkge1xuICAgICAgZnJhbWVSZW5kZXJlci52YWx1ZS5yZW5kZXJGcmFtZSh7XG4gICAgICAgIGRhdGE6IGZsaXBwZXJTdG9yZS5mbGlwcGVyLmZyYW1lRGF0YVxuICAgICAgfSlcbiAgICB9XG4gIH1cbn0pXG5cbndhdGNoKFxuICAoKSA9PiBmbGlwcGVyU3RvcmUuZmxpcHBlclJlYWR5LFxuICBhc3luYyAobmV3VmFsdWUpID0+IHtcbiAgICBpZiAobmV3VmFsdWUpIHtcbiAgICAgIGlmICghZmxpcHBlclN0b3JlLmlzU2NyZWVuU3RyZWFtKSB7XG4gICAgICAgIGF3YWl0IHN0YXJ0U2NyZWVuU3RyZWFtKClcbiAgICAgIH1cbiAgICB9XG4gIH1cbilcblxud2F0Y2goXG4gICgpID0+IGZsaXBwZXJTdG9yZS5mbGFncy51cGRhdGVJblByb2dyZXNzLFxuICBhc3luYyAobmV3VmFsdWUpID0+IHtcbiAgICBpZiAoIW5ld1ZhbHVlKSB7XG4gICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgIGZyYW1lUmVuZGVyZXIudmFsdWUgPSBuZXcgRmxpcHBlckZyYW1lUmVuZGVyZXIoc2NyZWVuU3RyZWFtQ2FudmFzLnZhbHVlKVxuICAgICAgfSlcbiAgICB9XG4gIH1cbilcblxub25CZWZvcmVVbm1vdW50KGFzeW5jICgpID0+IHtcbiAgaWYgKCFmbGlwcGVyU3RvcmUuZmxhZ3Muc3dpdGNoRmxpcHBlcikge1xuICAgIGF3YWl0IHN0b3BTY3JlZW5TdHJlYW0oKS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpXG4gICAgfSlcbiAgfVxuXG4gIGZsaXBwZXJTdG9yZS5wYWdlV2l0aFNjcmVlblN0cmVhbSA9IGZhbHNlXG59KVxuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gIDxxLXBhZ2UgY2xhc3M9XCJmbGV4LWNlbnRlciBjb2x1bW5cIiBwYWRkaW5nPlxuICAgIDxEZXZpY2VJbmZvIC8+XG4gIDwvcS1wYWdlPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCB7IERldmljZUluZm8gfSBmcm9tICd3aWRnZXRzL0RldmljZS9JbmZvJ1xuPC9zY3JpcHQ+XG4iXSwibmFtZXMiOlsiX2hvaXN0ZWRfMSIsIl9ob2lzdGVkXzIiLCJfb3BlbkJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfdG9EaXNwbGF5U3RyaW5nIiwiX25vcm1hbGl6ZUNsYXNzIiwiX2hvaXN0ZWRfMyIsIl9ub3JtYWxpemVTdHlsZSIsIl9jcmVhdGVWTm9kZSIsIl9ob2lzdGVkXzQiLCJjb21wb25lbnROYW1lIiwiRmxpcHBlck1vZGVsLnVzZUZsaXBwZXJTdG9yZSIsIkZsaXBwZXJBcGkiLCJtZXNzYWdlIiwiX2EiLCJfYiIsImFzeW5jU2xlZXAiLCJfY3JlYXRlQmxvY2siLCJfY3JlYXRlQ29tbWVudFZOb2RlIiwiX0ZyYWdtZW50IiwiX2hvaXN0ZWRfNSIsIl9ob2lzdGVkXzYiLCJfaG9pc3RlZF83IiwiX2NyZWF0ZVRleHRWTm9kZSIsIl93aXRoQ3R4IiwiX25vcm1hbGl6ZVByb3BzIiwiX2d1YXJkUmVhY3RpdmVQcm9wcyIsIl93aXRoRGlyZWN0aXZlcyIsIl9y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
