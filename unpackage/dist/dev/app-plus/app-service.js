if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global2 = uni.requireGlobal();
  ArrayBuffer = global2.ArrayBuffer;
  Int8Array = global2.Int8Array;
  Uint8Array = global2.Uint8Array;
  Uint8ClampedArray = global2.Uint8ClampedArray;
  Int16Array = global2.Int16Array;
  Uint16Array = global2.Uint16Array;
  Int32Array = global2.Int32Array;
  Uint32Array = global2.Uint32Array;
  Float32Array = global2.Float32Array;
  Float64Array = global2.Float64Array;
  BigInt64Array = global2.BigInt64Array;
  BigUint64Array = global2.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  const ON_LOAD = "onLoad";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return typeof component === "string" ? easycom : component;
  }
  const createHook = (lifecycle) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onLoad = /* @__PURE__ */ createHook(ON_LOAD);
  const TabEnum = {
    SECKILLING: 1,
    SECKILLWILL: 2
  };
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$p = {
    __name: "seckill-card",
    props: {
      id: Number,
      goods: {
        type: Object,
        required: true
      },
      type: {
        type: Number,
        validator(value) {
          return [TabEnum.SECKILLING, TabEnum.SECKILLWILL].includes(value);
        },
        default: TabEnum.SECKILLING
      }
    },
    setup(__props, { expose: __expose }) {
      __expose();
      const props = __props;
      const __returned__ = { props, get TabEnum() {
        return TabEnum;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "bg-white rounded-10 mt-2 mx-2 d-flex p-2" }, [
      vue.createElementVNode("view", {
        style: { "width": "226rpx", "height": "226rpx" },
        class: "rounded over-hidden"
      }, [
        vue.createElementVNode("image", {
          src: $setup.props.goods.photo,
          class: "w-100 h-100"
        }, null, 8, ["src"])
      ]),
      vue.createElementVNode("view", { class: "flex-1 ml-2" }, [
        vue.createElementVNode(
          "view",
          {
            class: "font-md text-black over-hidden",
            style: { "height": "70rpx" }
          },
          vue.toDisplayString($setup.props.goods.title),
          1
          /* TEXT */
        ),
        vue.createElementVNode("view", { class: "mt-2" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.props.goods.tags, (tag) => {
              return vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  class: "font-sm text-grey",
                  key: tag
                },
                vue.toDisplayString(tag),
                1
                /* TEXT */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        vue.createElementVNode("view", { class: "mt-1" }, [
          vue.createElementVNode(
            "text",
            { class: "font-theme-color font-md" },
            "秒杀价￥" + vue.toDisplayString($setup.props.goods.seckill_price),
            1
            /* TEXT */
          ),
          vue.createElementVNode(
            "text",
            { class: "ml-2 text-gray font line-through" },
            "原价￥" + vue.toDisplayString($setup.props.goods.origin_price),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "mt-1 d-flex j-sb a-center" }, [
          vue.createElementVNode("text", { class: "text-grey font-sm" }, [
            $setup.props.type == $setup.TabEnum.SECKILLING ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 0 },
              [
                vue.createTextVNode(" 剩余10分钟结束 ")
              ],
              64
              /* STABLE_FRAGMENT */
            )) : (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 1 },
              [
                vue.createTextVNode(" 15:00准时开始 ")
              ],
              64
              /* STABLE_FRAGMENT */
            ))
          ]),
          vue.createElementVNode("view", { class: "text-white px-2 py-1 font bg-theme rounded" }, [
            $setup.props.type == $setup.TabEnum.SECKILLING ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 0 },
              [
                vue.createTextVNode("任性抢")
              ],
              64
              /* STABLE_FRAGMENT */
            )) : (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 1 },
              [
                vue.createTextVNode("预约")
              ],
              64
              /* STABLE_FRAGMENT */
            ))
          ])
        ])
      ])
    ]);
  }
  const seckillCard = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$o], ["__scopeId", "data-v-ac71f453"], ["__file", "D:/project/uni-app/leoh-seckill-shop/pages/index/components/seckill-card.vue"]]);
  const _sfc_main$o = {
    __name: "index",
    setup(__props, { expose: __expose }) {
      __expose();
      let selectedTab = vue.ref(TabEnum.SECKILLING);
      let goods_list = vue.ref([
        {
          id: 1,
          photo: "/static/product/ae86.jpg",
          title: "sd第四季第七集温泉恩请问窃取欧文去我去饿我去看而且门前我n",
          tags: ["分期付款"],
          origin_price: 5999,
          seckill_price: 1999
        },
        {
          id: 2,
          photo: "/static/product/ae86.jpg",
          title: "sdsad的撒地区青蛙大撒大撒n",
          tags: ["分期付款"],
          origin_price: 12312,
          seckill_price: 123
        },
        {
          id: 3,
          title: "sd武清区恶气热望亲热亲热去的撒v问起我n",
          photo: "/static/product/ae86.jpg",
          tags: ["分期付款"],
          origin_price: 4124,
          seckill_price: 132
        }
      ]);
      const onTabTap = (index) => {
        selectedTab.value = index;
      };
      const onSeckillCardTap = (index) => {
        formatAppLog("log", "at pages/index/index.vue:68", index);
        uni.navigateTo({
          url: "/pages/goods/goods"
        });
      };
      const __returned__ = { get selectedTab() {
        return selectedTab;
      }, set selectedTab(v) {
        selectedTab = v;
      }, get goods_list() {
        return goods_list;
      }, set goods_list(v) {
        goods_list = v;
      }, onTabTap, onSeckillCardTap, ref: vue.ref, get TabEnum() {
        return TabEnum;
      }, seckillCard };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode("view", { class: "px-4 py-2 d-flex bg-white" }, [
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["flex-1 d-flex j-center a-center tab border seckilling border-theme broder-right-0", $setup.selectedTab == $setup.TabEnum.SECKILLING ? "text-white bg-theme" : "font-theme-color bg-white"]),
              onClick: _cache[0] || (_cache[0] = ($event) => $setup.onTabTap($setup.TabEnum.SECKILLING))
            },
            "秒杀中",
            2
            /* CLASS */
          ),
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["flex-1 d-flex j-center a-center tab border seckillwill border-theme", $setup.selectedTab == $setup.TabEnum.SECKILLWILL ? "text-white bg-theme" : "font-theme-color bg-white"]),
              onClick: _cache[1] || (_cache[1] = ($event) => $setup.onTabTap($setup.TabEnum.SECKILLWILL))
            },
            "即将秒杀",
            2
            /* CLASS */
          )
        ]),
        $setup.selectedTab == $setup.TabEnum.SECKILLING ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.goods_list, (goods, index) => {
              return vue.openBlock(), vue.createBlock($setup["seckillCard"], {
                onClick: ($event) => $setup.onSeckillCardTap(index),
                goods,
                key: goods.title
              }, null, 8, ["onClick", "goods"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])) : (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.goods_list, (goods) => {
              return vue.openBlock(), vue.createBlock($setup["seckillCard"], {
                type: $setup.TabEnum.SECKILLWILL,
                goods,
                key: goods.title
              }, null, 8, ["type", "goods"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]))
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$n], ["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/project/uni-app/leoh-seckill-shop/pages/index/index.vue"]]);
  const _imports_0$3 = "/static/product/ae86.jpg";
  const _sfc_main$n = {};
  function _sfc_render$m(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "mt-2 py-2 bg-white" }, [
      vue.createElementVNode("view", { class: "px-2 d-flex j-sb font" }, [
        vue.createElementVNode("text", { class: "text-dark" }, "订单号: 2030121212312123"),
        vue.createElementVNode("text", { class: "font-theme-color" }, "交易成功")
      ]),
      vue.createElementVNode("view", { class: "d-flex mt-2 px-2" }, [
        vue.createElementVNode("view", {
          style: { "width": "148rpx", "height": "148rpx" },
          class: "rounded over-hidden"
        }, [
          vue.createElementVNode("image", {
            src: _imports_0$3,
            class: "w-100 h-100"
          })
        ]),
        vue.createElementVNode("view", { class: "flex-1 font text-dark pl-2" }, " 算hi读取和我iu恶气呢亲我呢请问你可能看全额瓦讷区请问窃取为两千五，而目前看我 "),
        vue.createElementVNode("view", {
          style: { "width": "139rpx" },
          class: "text-right"
        }, [
          vue.createElementVNode("view", { class: "font text-dark" }, "￥1399"),
          vue.createElementVNode("view", { class: "font-sm text-grey" }, "×1")
        ])
      ]),
      vue.createElementVNode("view", { class: "mt-2 border-top border-bottom py-2 text-right pr-2" }, [
        vue.createElementVNode("text", { class: "font text-dark" }, "实付：￥1399")
      ]),
      vue.createElementVNode("view", { class: "mt-2 px-2 d-flex j-end font" }, [
        vue.createElementVNode("view", { class: "border px-2 py-1 border-dark rounded" }, "删除订单")
      ])
    ]);
  }
  const PagesOrderOrder = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$m], ["__file", "D:/project/uni-app/leoh-seckill-shop/pages/order/order.vue"]]);
  const fontData = [
    {
      "font_class": "arrow-down",
      "unicode": ""
    },
    {
      "font_class": "arrow-left",
      "unicode": ""
    },
    {
      "font_class": "arrow-right",
      "unicode": ""
    },
    {
      "font_class": "arrow-up",
      "unicode": ""
    },
    {
      "font_class": "auth",
      "unicode": ""
    },
    {
      "font_class": "auth-filled",
      "unicode": ""
    },
    {
      "font_class": "back",
      "unicode": ""
    },
    {
      "font_class": "bars",
      "unicode": ""
    },
    {
      "font_class": "calendar",
      "unicode": ""
    },
    {
      "font_class": "calendar-filled",
      "unicode": ""
    },
    {
      "font_class": "camera",
      "unicode": ""
    },
    {
      "font_class": "camera-filled",
      "unicode": ""
    },
    {
      "font_class": "cart",
      "unicode": ""
    },
    {
      "font_class": "cart-filled",
      "unicode": ""
    },
    {
      "font_class": "chat",
      "unicode": ""
    },
    {
      "font_class": "chat-filled",
      "unicode": ""
    },
    {
      "font_class": "chatboxes",
      "unicode": ""
    },
    {
      "font_class": "chatboxes-filled",
      "unicode": ""
    },
    {
      "font_class": "chatbubble",
      "unicode": ""
    },
    {
      "font_class": "chatbubble-filled",
      "unicode": ""
    },
    {
      "font_class": "checkbox",
      "unicode": ""
    },
    {
      "font_class": "checkbox-filled",
      "unicode": ""
    },
    {
      "font_class": "checkmarkempty",
      "unicode": ""
    },
    {
      "font_class": "circle",
      "unicode": ""
    },
    {
      "font_class": "circle-filled",
      "unicode": ""
    },
    {
      "font_class": "clear",
      "unicode": ""
    },
    {
      "font_class": "close",
      "unicode": ""
    },
    {
      "font_class": "closeempty",
      "unicode": ""
    },
    {
      "font_class": "cloud-download",
      "unicode": ""
    },
    {
      "font_class": "cloud-download-filled",
      "unicode": ""
    },
    {
      "font_class": "cloud-upload",
      "unicode": ""
    },
    {
      "font_class": "cloud-upload-filled",
      "unicode": ""
    },
    {
      "font_class": "color",
      "unicode": ""
    },
    {
      "font_class": "color-filled",
      "unicode": ""
    },
    {
      "font_class": "compose",
      "unicode": ""
    },
    {
      "font_class": "contact",
      "unicode": ""
    },
    {
      "font_class": "contact-filled",
      "unicode": ""
    },
    {
      "font_class": "down",
      "unicode": ""
    },
    {
      "font_class": "bottom",
      "unicode": ""
    },
    {
      "font_class": "download",
      "unicode": ""
    },
    {
      "font_class": "download-filled",
      "unicode": ""
    },
    {
      "font_class": "email",
      "unicode": ""
    },
    {
      "font_class": "email-filled",
      "unicode": ""
    },
    {
      "font_class": "eye",
      "unicode": ""
    },
    {
      "font_class": "eye-filled",
      "unicode": ""
    },
    {
      "font_class": "eye-slash",
      "unicode": ""
    },
    {
      "font_class": "eye-slash-filled",
      "unicode": ""
    },
    {
      "font_class": "fire",
      "unicode": ""
    },
    {
      "font_class": "fire-filled",
      "unicode": ""
    },
    {
      "font_class": "flag",
      "unicode": ""
    },
    {
      "font_class": "flag-filled",
      "unicode": ""
    },
    {
      "font_class": "folder-add",
      "unicode": ""
    },
    {
      "font_class": "folder-add-filled",
      "unicode": ""
    },
    {
      "font_class": "font",
      "unicode": ""
    },
    {
      "font_class": "forward",
      "unicode": ""
    },
    {
      "font_class": "gear",
      "unicode": ""
    },
    {
      "font_class": "gear-filled",
      "unicode": ""
    },
    {
      "font_class": "gift",
      "unicode": ""
    },
    {
      "font_class": "gift-filled",
      "unicode": ""
    },
    {
      "font_class": "hand-down",
      "unicode": ""
    },
    {
      "font_class": "hand-down-filled",
      "unicode": ""
    },
    {
      "font_class": "hand-up",
      "unicode": ""
    },
    {
      "font_class": "hand-up-filled",
      "unicode": ""
    },
    {
      "font_class": "headphones",
      "unicode": ""
    },
    {
      "font_class": "heart",
      "unicode": ""
    },
    {
      "font_class": "heart-filled",
      "unicode": ""
    },
    {
      "font_class": "help",
      "unicode": ""
    },
    {
      "font_class": "help-filled",
      "unicode": ""
    },
    {
      "font_class": "home",
      "unicode": ""
    },
    {
      "font_class": "home-filled",
      "unicode": ""
    },
    {
      "font_class": "image",
      "unicode": ""
    },
    {
      "font_class": "image-filled",
      "unicode": ""
    },
    {
      "font_class": "images",
      "unicode": ""
    },
    {
      "font_class": "images-filled",
      "unicode": ""
    },
    {
      "font_class": "info",
      "unicode": ""
    },
    {
      "font_class": "info-filled",
      "unicode": ""
    },
    {
      "font_class": "left",
      "unicode": ""
    },
    {
      "font_class": "link",
      "unicode": ""
    },
    {
      "font_class": "list",
      "unicode": ""
    },
    {
      "font_class": "location",
      "unicode": ""
    },
    {
      "font_class": "location-filled",
      "unicode": ""
    },
    {
      "font_class": "locked",
      "unicode": ""
    },
    {
      "font_class": "locked-filled",
      "unicode": ""
    },
    {
      "font_class": "loop",
      "unicode": ""
    },
    {
      "font_class": "mail-open",
      "unicode": ""
    },
    {
      "font_class": "mail-open-filled",
      "unicode": ""
    },
    {
      "font_class": "map",
      "unicode": ""
    },
    {
      "font_class": "map-filled",
      "unicode": ""
    },
    {
      "font_class": "map-pin",
      "unicode": ""
    },
    {
      "font_class": "map-pin-ellipse",
      "unicode": ""
    },
    {
      "font_class": "medal",
      "unicode": ""
    },
    {
      "font_class": "medal-filled",
      "unicode": ""
    },
    {
      "font_class": "mic",
      "unicode": ""
    },
    {
      "font_class": "mic-filled",
      "unicode": ""
    },
    {
      "font_class": "micoff",
      "unicode": ""
    },
    {
      "font_class": "micoff-filled",
      "unicode": ""
    },
    {
      "font_class": "minus",
      "unicode": ""
    },
    {
      "font_class": "minus-filled",
      "unicode": ""
    },
    {
      "font_class": "more",
      "unicode": ""
    },
    {
      "font_class": "more-filled",
      "unicode": ""
    },
    {
      "font_class": "navigate",
      "unicode": ""
    },
    {
      "font_class": "navigate-filled",
      "unicode": ""
    },
    {
      "font_class": "notification",
      "unicode": ""
    },
    {
      "font_class": "notification-filled",
      "unicode": ""
    },
    {
      "font_class": "paperclip",
      "unicode": ""
    },
    {
      "font_class": "paperplane",
      "unicode": ""
    },
    {
      "font_class": "paperplane-filled",
      "unicode": ""
    },
    {
      "font_class": "person",
      "unicode": ""
    },
    {
      "font_class": "person-filled",
      "unicode": ""
    },
    {
      "font_class": "personadd",
      "unicode": ""
    },
    {
      "font_class": "personadd-filled",
      "unicode": ""
    },
    {
      "font_class": "personadd-filled-copy",
      "unicode": ""
    },
    {
      "font_class": "phone",
      "unicode": ""
    },
    {
      "font_class": "phone-filled",
      "unicode": ""
    },
    {
      "font_class": "plus",
      "unicode": ""
    },
    {
      "font_class": "plus-filled",
      "unicode": ""
    },
    {
      "font_class": "plusempty",
      "unicode": ""
    },
    {
      "font_class": "pulldown",
      "unicode": ""
    },
    {
      "font_class": "pyq",
      "unicode": ""
    },
    {
      "font_class": "qq",
      "unicode": ""
    },
    {
      "font_class": "redo",
      "unicode": ""
    },
    {
      "font_class": "redo-filled",
      "unicode": ""
    },
    {
      "font_class": "refresh",
      "unicode": ""
    },
    {
      "font_class": "refresh-filled",
      "unicode": ""
    },
    {
      "font_class": "refreshempty",
      "unicode": ""
    },
    {
      "font_class": "reload",
      "unicode": ""
    },
    {
      "font_class": "right",
      "unicode": ""
    },
    {
      "font_class": "scan",
      "unicode": ""
    },
    {
      "font_class": "search",
      "unicode": ""
    },
    {
      "font_class": "settings",
      "unicode": ""
    },
    {
      "font_class": "settings-filled",
      "unicode": ""
    },
    {
      "font_class": "shop",
      "unicode": ""
    },
    {
      "font_class": "shop-filled",
      "unicode": ""
    },
    {
      "font_class": "smallcircle",
      "unicode": ""
    },
    {
      "font_class": "smallcircle-filled",
      "unicode": ""
    },
    {
      "font_class": "sound",
      "unicode": ""
    },
    {
      "font_class": "sound-filled",
      "unicode": ""
    },
    {
      "font_class": "spinner-cycle",
      "unicode": ""
    },
    {
      "font_class": "staff",
      "unicode": ""
    },
    {
      "font_class": "staff-filled",
      "unicode": ""
    },
    {
      "font_class": "star",
      "unicode": ""
    },
    {
      "font_class": "star-filled",
      "unicode": ""
    },
    {
      "font_class": "starhalf",
      "unicode": ""
    },
    {
      "font_class": "trash",
      "unicode": ""
    },
    {
      "font_class": "trash-filled",
      "unicode": ""
    },
    {
      "font_class": "tune",
      "unicode": ""
    },
    {
      "font_class": "tune-filled",
      "unicode": ""
    },
    {
      "font_class": "undo",
      "unicode": ""
    },
    {
      "font_class": "undo-filled",
      "unicode": ""
    },
    {
      "font_class": "up",
      "unicode": ""
    },
    {
      "font_class": "top",
      "unicode": ""
    },
    {
      "font_class": "upload",
      "unicode": ""
    },
    {
      "font_class": "upload-filled",
      "unicode": ""
    },
    {
      "font_class": "videocam",
      "unicode": ""
    },
    {
      "font_class": "videocam-filled",
      "unicode": ""
    },
    {
      "font_class": "vip",
      "unicode": ""
    },
    {
      "font_class": "vip-filled",
      "unicode": ""
    },
    {
      "font_class": "wallet",
      "unicode": ""
    },
    {
      "font_class": "wallet-filled",
      "unicode": ""
    },
    {
      "font_class": "weibo",
      "unicode": ""
    },
    {
      "font_class": "weixin",
      "unicode": ""
    }
  ];
  const getVal = (val) => {
    const reg = /^[0-9]*$/g;
    return typeof val === "number" || reg.test(val) ? val + "px" : val;
  };
  const _sfc_main$m = {
    name: "UniIcons",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: ""
      },
      color: {
        type: String,
        default: "#333333"
      },
      size: {
        type: [Number, String],
        default: 16
      },
      customPrefix: {
        type: String,
        default: ""
      },
      fontFamily: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        icons: fontData
      };
    },
    computed: {
      unicode() {
        let code = this.icons.find((v) => v.font_class === this.type);
        if (code) {
          return code.unicode;
        }
        return "";
      },
      iconSize() {
        return getVal(this.size);
      },
      styleObj() {
        if (this.fontFamily !== "") {
          return `color: ${this.color}; font-size: ${this.iconSize}; font-family: ${this.fontFamily};`;
        }
        return `color: ${this.color}; font-size: ${this.iconSize};`;
      }
    },
    methods: {
      _onClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "text",
      {
        style: vue.normalizeStyle($options.styleObj),
        class: vue.normalizeClass(["uni-icons", ["uniui-" + $props.type, $props.customPrefix, $props.customPrefix ? $props.type : ""]]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options._onClick && $options._onClick(...args))
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_3 = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$l], ["__scopeId", "data-v-d31e1c47"], ["__file", "D:/project/uni-app/leoh-seckill-shop/uni_modules/uni-icons/components/uni-icons/uni-icons.vue"]]);
  const _sfc_main$l = {
    name: "UniBadge",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: "error"
      },
      inverted: {
        type: Boolean,
        default: false
      },
      isDot: {
        type: Boolean,
        default: false
      },
      maxNum: {
        type: Number,
        default: 99
      },
      absolute: {
        type: String,
        default: ""
      },
      offset: {
        type: Array,
        default() {
          return [0, 0];
        }
      },
      text: {
        type: [String, Number],
        default: ""
      },
      size: {
        type: String,
        default: "small"
      },
      customStyle: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {};
    },
    computed: {
      width() {
        return String(this.text).length * 8 + 12;
      },
      classNames() {
        const {
          inverted,
          type,
          size,
          absolute
        } = this;
        return [
          inverted ? "uni-badge--" + type + "-inverted" : "",
          "uni-badge--" + type,
          "uni-badge--" + size,
          absolute ? "uni-badge--absolute" : ""
        ].join(" ");
      },
      positionStyle() {
        if (!this.absolute)
          return {};
        let w = this.width / 2, h = 10;
        if (this.isDot) {
          w = 5;
          h = 5;
        }
        const x = `${-w + this.offset[0]}px`;
        const y = `${-h + this.offset[1]}px`;
        const whiteList = {
          rightTop: {
            right: x,
            top: y
          },
          rightBottom: {
            right: x,
            bottom: y
          },
          leftBottom: {
            left: x,
            bottom: y
          },
          leftTop: {
            left: x,
            top: y
          }
        };
        const match = whiteList[this.absolute];
        return match ? match : whiteList["rightTop"];
      },
      dotStyle() {
        if (!this.isDot)
          return {};
        return {
          width: "10px",
          minWidth: "0",
          height: "10px",
          padding: "0",
          borderRadius: "10px"
        };
      },
      displayValue() {
        const {
          isDot,
          text,
          maxNum
        } = this;
        return isDot ? "" : Number(text) > maxNum ? `${maxNum}+` : text;
      }
    },
    methods: {
      onClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-badge--x" }, [
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
      $props.text ? (vue.openBlock(), vue.createElementBlock(
        "text",
        {
          key: 0,
          class: vue.normalizeClass([$options.classNames, "uni-badge"]),
          style: vue.normalizeStyle([$options.positionStyle, $props.customStyle, $options.dotStyle]),
          onClick: _cache[0] || (_cache[0] = ($event) => $options.onClick())
        },
        vue.toDisplayString($options.displayValue),
        7
        /* TEXT, CLASS, STYLE */
      )) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const __easycom_1$2 = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$k], ["__scopeId", "data-v-c97cb896"], ["__file", "D:/project/uni-app/leoh-seckill-shop/uni_modules/uni-badge/components/uni-badge/uni-badge.vue"]]);
  const _sfc_main$k = {
    name: "UniListItem",
    emits: ["click", "switchChange"],
    props: {
      direction: {
        type: String,
        default: "row"
      },
      title: {
        type: String,
        default: ""
      },
      note: {
        type: String,
        default: ""
      },
      ellipsis: {
        type: [Number, String],
        default: 0
      },
      disabled: {
        type: [Boolean, String],
        default: false
      },
      clickable: {
        type: Boolean,
        default: false
      },
      showArrow: {
        type: [Boolean, String],
        default: false
      },
      link: {
        type: [Boolean, String],
        default: false
      },
      to: {
        type: String,
        default: ""
      },
      showBadge: {
        type: [Boolean, String],
        default: false
      },
      showSwitch: {
        type: [Boolean, String],
        default: false
      },
      switchChecked: {
        type: [Boolean, String],
        default: false
      },
      badgeText: {
        type: String,
        default: ""
      },
      badgeType: {
        type: String,
        default: "success"
      },
      badgeStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      rightText: {
        type: String,
        default: ""
      },
      thumb: {
        type: String,
        default: ""
      },
      thumbSize: {
        type: String,
        default: "base"
      },
      showExtraIcon: {
        type: [Boolean, String],
        default: false
      },
      extraIcon: {
        type: Object,
        default() {
          return {
            type: "",
            color: "#000000",
            size: 20,
            customPrefix: ""
          };
        }
      },
      border: {
        type: Boolean,
        default: true
      },
      customStyle: {
        type: Object,
        default() {
          return {
            padding: "",
            backgroundColor: "#FFFFFF"
          };
        }
      },
      keepScrollPosition: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      "customStyle.padding": {
        handler(padding) {
          if (typeof padding == "number") {
            padding += "";
          }
          let paddingArr = padding.split(" ");
          if (paddingArr.length === 1) {
            const allPadding = paddingArr[0];
            this.padding = {
              "top": allPadding,
              "right": allPadding,
              "bottom": allPadding,
              "left": allPadding
            };
          } else if (paddingArr.length === 2) {
            const [verticalPadding, horizontalPadding] = paddingArr;
            this.padding = {
              "top": verticalPadding,
              "right": horizontalPadding,
              "bottom": verticalPadding,
              "left": horizontalPadding
            };
          } else if (paddingArr.length === 4) {
            const [topPadding, rightPadding, bottomPadding, leftPadding] = paddingArr;
            this.padding = {
              "top": topPadding,
              "right": rightPadding,
              "bottom": bottomPadding,
              "left": leftPadding
            };
          }
        },
        immediate: true
      }
    },
    // inject: ['list'],
    data() {
      return {
        isFirstChild: false,
        padding: {
          top: "",
          right: "",
          bottom: "",
          left: ""
        }
      };
    },
    mounted() {
      this.list = this.getForm();
      if (this.list) {
        if (!this.list.firstChildAppend) {
          this.list.firstChildAppend = true;
          this.isFirstChild = true;
        }
      }
    },
    methods: {
      /**
       * 获取父元素实例
       */
      getForm(name = "uniList") {
        let parent = this.$parent;
        let parentName = parent.$options.name;
        while (parentName !== name) {
          parent = parent.$parent;
          if (!parent)
            return false;
          parentName = parent.$options.name;
        }
        return parent;
      },
      onClick() {
        if (this.to !== "") {
          this.openPage();
          return;
        }
        if (this.clickable || this.link) {
          this.$emit("click", {
            data: {}
          });
        }
      },
      onSwitchChange(e) {
        this.$emit("switchChange", e.detail);
      },
      openPage() {
        if (["navigateTo", "redirectTo", "reLaunch", "switchTab"].indexOf(this.link) !== -1) {
          this.pageApi(this.link);
        } else {
          this.pageApi("navigateTo");
        }
      },
      pageApi(api) {
        let callback = {
          url: this.to,
          success: (res) => {
            this.$emit("click", {
              data: res
            });
          },
          fail: (err) => {
            this.$emit("click", {
              data: err
            });
          }
        };
        switch (api) {
          case "navigateTo":
            uni.navigateTo(callback);
            break;
          case "redirectTo":
            uni.redirectTo(callback);
            break;
          case "reLaunch":
            uni.reLaunch(callback);
            break;
          case "switchTab":
            uni.switchTab(callback);
            break;
          default:
            uni.navigateTo(callback);
        }
      }
    }
  };
  function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_3);
    const _component_uni_badge = resolveEasycom(vue.resolveDynamicComponent("uni-badge"), __easycom_1$2);
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass([{ "uni-list-item--disabled": $props.disabled }, "uni-list-item"]),
      style: vue.normalizeStyle({ "background-color": $props.customStyle.backgroundColor }),
      "hover-class": !$props.clickable && !$props.link || $props.disabled || $props.showSwitch ? "" : "uni-list-item--hover",
      onClick: _cache[1] || (_cache[1] = (...args) => $options.onClick && $options.onClick(...args))
    }, [
      !$data.isFirstChild ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          class: vue.normalizeClass(["border--left", { "uni-list--border": $props.border }])
        },
        null,
        2
        /* CLASS */
      )) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass(["uni-list-item__container", { "container--right": $props.showArrow || $props.link, "flex--direction": $props.direction === "column" }]),
          style: vue.normalizeStyle({ paddingTop: $data.padding.top, paddingLeft: $data.padding.left, paddingRight: $data.padding.right, paddingBottom: $data.padding.bottom })
        },
        [
          vue.renderSlot(_ctx.$slots, "header", {}, () => [
            vue.createElementVNode("view", { class: "uni-list-item__header" }, [
              $props.thumb ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "uni-list-item__icon"
              }, [
                vue.createElementVNode("image", {
                  src: $props.thumb,
                  class: vue.normalizeClass(["uni-list-item__icon-img", ["uni-list--" + $props.thumbSize]])
                }, null, 10, ["src"])
              ])) : $props.showExtraIcon ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "uni-list-item__icon"
              }, [
                vue.createVNode(_component_uni_icons, {
                  customPrefix: $props.extraIcon.customPrefix,
                  color: $props.extraIcon.color,
                  size: $props.extraIcon.size,
                  type: $props.extraIcon.type
                }, null, 8, ["customPrefix", "color", "size", "type"])
              ])) : vue.createCommentVNode("v-if", true)
            ])
          ], true),
          vue.renderSlot(_ctx.$slots, "body", {}, () => [
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["uni-list-item__content", { "uni-list-item__content--center": $props.thumb || $props.showExtraIcon || $props.showBadge || $props.showSwitch }])
              },
              [
                $props.title ? (vue.openBlock(), vue.createElementBlock(
                  "text",
                  {
                    key: 0,
                    class: vue.normalizeClass(["uni-list-item__content-title", [$props.ellipsis !== 0 && $props.ellipsis <= 2 ? "uni-ellipsis-" + $props.ellipsis : ""]])
                  },
                  vue.toDisplayString($props.title),
                  3
                  /* TEXT, CLASS */
                )) : vue.createCommentVNode("v-if", true),
                $props.note ? (vue.openBlock(), vue.createElementBlock(
                  "text",
                  {
                    key: 1,
                    class: "uni-list-item__content-note"
                  },
                  vue.toDisplayString($props.note),
                  1
                  /* TEXT */
                )) : vue.createCommentVNode("v-if", true)
              ],
              2
              /* CLASS */
            )
          ], true),
          vue.renderSlot(_ctx.$slots, "footer", {}, () => [
            $props.rightText || $props.showBadge || $props.showSwitch ? (vue.openBlock(), vue.createElementBlock(
              "view",
              {
                key: 0,
                class: vue.normalizeClass(["uni-list-item__extra", { "flex--justify": $props.direction === "column" }])
              },
              [
                $props.rightText ? (vue.openBlock(), vue.createElementBlock(
                  "text",
                  {
                    key: 0,
                    class: "uni-list-item__extra-text"
                  },
                  vue.toDisplayString($props.rightText),
                  1
                  /* TEXT */
                )) : vue.createCommentVNode("v-if", true),
                $props.showBadge ? (vue.openBlock(), vue.createBlock(_component_uni_badge, {
                  key: 1,
                  type: $props.badgeType,
                  text: $props.badgeText,
                  "custom-style": $props.badgeStyle
                }, null, 8, ["type", "text", "custom-style"])) : vue.createCommentVNode("v-if", true),
                $props.showSwitch ? (vue.openBlock(), vue.createElementBlock("switch", {
                  key: 2,
                  disabled: $props.disabled,
                  checked: $props.switchChecked,
                  onChange: _cache[0] || (_cache[0] = (...args) => $options.onSwitchChange && $options.onSwitchChange(...args))
                }, null, 40, ["disabled", "checked"])) : vue.createCommentVNode("v-if", true)
              ],
              2
              /* CLASS */
            )) : vue.createCommentVNode("v-if", true)
          ], true)
        ],
        6
        /* CLASS, STYLE */
      ),
      $props.showArrow || $props.link ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
        key: 1,
        size: 16,
        class: "uni-icon-wrapper",
        color: "#bbb",
        type: "arrowright"
      })) : vue.createCommentVNode("v-if", true)
    ], 14, ["hover-class"]);
  }
  const __easycom_4 = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$j], ["__scopeId", "data-v-c7524739"], ["__file", "D:/project/uni-app/leoh-seckill-shop/uni_modules/uni-list/components/uni-list-item/uni-list-item.vue"]]);
  const _sfc_main$j = {
    name: "uniList",
    "mp-weixin": {
      options: {
        multipleSlots: false
      }
    },
    props: {
      stackFromEnd: {
        type: Boolean,
        default: false
      },
      enableBackToTop: {
        type: [Boolean, String],
        default: false
      },
      scrollY: {
        type: [Boolean, String],
        default: false
      },
      border: {
        type: Boolean,
        default: true
      },
      renderReverse: {
        type: Boolean,
        default: false
      }
    },
    // provide() {
    // 	return {
    // 		list: this
    // 	};
    // },
    created() {
      this.firstChildAppend = false;
    },
    methods: {
      loadMore(e) {
        this.$emit("scrolltolower");
      },
      scroll(e) {
        this.$emit("scroll", e);
      }
    }
  };
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-list uni-border-top-bottom" }, [
      $props.border ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "uni-list--border-top"
      })) : vue.createCommentVNode("v-if", true),
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
      $props.border ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "uni-list--border-bottom"
      })) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const __easycom_5 = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$i], ["__scopeId", "data-v-c2f1266a"], ["__file", "D:/project/uni-app/leoh-seckill-shop/uni_modules/uni-list/components/uni-list/uni-list.vue"]]);
  const _imports_0$2 = "/static/mine-bg.png";
  const _imports_0$1 = "/static/avatar.jpeg";
  const _sfc_main$i = {
    __name: "mine",
    setup(__props, { expose: __expose }) {
      __expose();
      const onExit = () => {
        uni.navigateTo({
          url: "/pages/login/login"
        });
      };
      const __returned__ = { onExit };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_list_item = resolveEasycom(vue.resolveDynamicComponent("uni-list-item"), __easycom_4);
    const _component_uni_list = resolveEasycom(vue.resolveDynamicComponent("uni-list"), __easycom_5);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode("view", {
          style: { "height": "320rpx" },
          class: "w-100 d-flex j-center a-center position-relative"
        }, [
          vue.createElementVNode("image", {
            src: _imports_0$2,
            class: "w-100 h-100 position-absolute left-0 top-0 right-0 bottom-0"
          }),
          vue.createElementVNode("view", {
            style: { "width": "300rpx", "z-index": "100" },
            class: "d-flex flex-column a-center"
          }, [
            vue.createElementVNode("image", {
              src: _imports_0$1,
              style: { "width": "100rpx", "height": "100rpx" },
              class: "rounded-circle"
            }),
            vue.createElementVNode("view", { class: "font text-white mt-2" }, "钢铁侠")
          ])
        ]),
        vue.createVNode(_component_uni_list, null, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_uni_list_item, {
              showArrow: "",
              title: "修改信息",
              to: "/pages/userinfo/userinfo"
            }),
            vue.createVNode(_component_uni_list_item, {
              showArrow: "",
              title: "我的地址",
              to: "/pages/address/address"
            })
          ]),
          _: 1
          /* STABLE */
        }),
        vue.createElementVNode("button", {
          type: "warn",
          plain: "",
          class: "mt-3 mx-2",
          onClick: $setup.onExit
        }, "退出登陆")
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesMineMine = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$h], ["__file", "D:/project/uni-app/leoh-seckill-shop/pages/mine/mine.vue"]]);
  const popup = {
    data() {
      return {};
    },
    created() {
      this.popup = this.getParent();
    },
    methods: {
      /**
       * 获取父元素实例
       */
      getParent(name = "uniPopup") {
        let parent = this.$parent;
        let parentName = parent.$options.name;
        while (parentName !== name) {
          parent = parent.$parent;
          if (!parent)
            return false;
          parentName = parent.$options.name;
        }
        return parent;
      }
    }
  };
  const isObject = (val) => val !== null && typeof val === "object";
  const defaultDelimiters = ["{", "}"];
  class BaseFormatter {
    constructor() {
      this._caches = /* @__PURE__ */ Object.create(null);
    }
    interpolate(message, values, delimiters = defaultDelimiters) {
      if (!values) {
        return [message];
      }
      let tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    }
  }
  const RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
  const RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
  function parse(format, [startDelimiter, endDelimiter]) {
    const tokens = [];
    let position = 0;
    let text = "";
    while (position < format.length) {
      let char = format[position++];
      if (char === startDelimiter) {
        if (text) {
          tokens.push({ type: "text", value: text });
        }
        text = "";
        let sub = "";
        char = format[position++];
        while (char !== void 0 && char !== endDelimiter) {
          sub += char;
          char = format[position++];
        }
        const isClosed = char === endDelimiter;
        const type = RE_TOKEN_LIST_VALUE.test(sub) ? "list" : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? "named" : "unknown";
        tokens.push({ value: sub, type });
      } else {
        text += char;
      }
    }
    text && tokens.push({ type: "text", value: text });
    return tokens;
  }
  function compile(tokens, values) {
    const compiled = [];
    let index = 0;
    const mode = Array.isArray(values) ? "list" : isObject(values) ? "named" : "unknown";
    if (mode === "unknown") {
      return compiled;
    }
    while (index < tokens.length) {
      const token = tokens[index];
      switch (token.type) {
        case "text":
          compiled.push(token.value);
          break;
        case "list":
          compiled.push(values[parseInt(token.value, 10)]);
          break;
        case "named":
          if (mode === "named") {
            compiled.push(values[token.value]);
          } else {
            {
              console.warn(`Type of token '${token.type}' and format of value '${mode}' don't match!`);
            }
          }
          break;
        case "unknown":
          {
            console.warn(`Detect 'unknown' type of token!`);
          }
          break;
      }
      index++;
    }
    return compiled;
  }
  const LOCALE_ZH_HANS = "zh-Hans";
  const LOCALE_ZH_HANT = "zh-Hant";
  const LOCALE_EN = "en";
  const LOCALE_FR = "fr";
  const LOCALE_ES = "es";
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  const hasOwn = (val, key) => hasOwnProperty.call(val, key);
  const defaultFormatter = new BaseFormatter();
  function include(str, parts) {
    return !!parts.find((part) => str.indexOf(part) !== -1);
  }
  function startsWith(str, parts) {
    return parts.find((part) => str.indexOf(part) === 0);
  }
  function normalizeLocale(locale, messages2) {
    if (!locale) {
      return;
    }
    locale = locale.trim().replace(/_/g, "-");
    if (messages2 && messages2[locale]) {
      return locale;
    }
    locale = locale.toLowerCase();
    if (locale === "chinese") {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf("zh") === 0) {
      if (locale.indexOf("-hans") > -1) {
        return LOCALE_ZH_HANS;
      }
      if (locale.indexOf("-hant") > -1) {
        return LOCALE_ZH_HANT;
      }
      if (include(locale, ["-tw", "-hk", "-mo", "-cht"])) {
        return LOCALE_ZH_HANT;
      }
      return LOCALE_ZH_HANS;
    }
    let locales = [LOCALE_EN, LOCALE_FR, LOCALE_ES];
    if (messages2 && Object.keys(messages2).length > 0) {
      locales = Object.keys(messages2);
    }
    const lang = startsWith(locale, locales);
    if (lang) {
      return lang;
    }
  }
  class I18n {
    constructor({ locale, fallbackLocale, messages: messages2, watcher, formater: formater2 }) {
      this.locale = LOCALE_EN;
      this.fallbackLocale = LOCALE_EN;
      this.message = {};
      this.messages = {};
      this.watchers = [];
      if (fallbackLocale) {
        this.fallbackLocale = fallbackLocale;
      }
      this.formater = formater2 || defaultFormatter;
      this.messages = messages2 || {};
      this.setLocale(locale || LOCALE_EN);
      if (watcher) {
        this.watchLocale(watcher);
      }
    }
    setLocale(locale) {
      const oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      if (oldLocale !== this.locale) {
        this.watchers.forEach((watcher) => {
          watcher(this.locale, oldLocale);
        });
      }
    }
    getLocale() {
      return this.locale;
    }
    watchLocale(fn) {
      const index = this.watchers.push(fn) - 1;
      return () => {
        this.watchers.splice(index, 1);
      };
    }
    add(locale, message, override = true) {
      const curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else {
          Object.keys(message).forEach((key) => {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else {
        this.messages[locale] = message;
      }
    }
    f(message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join("");
    }
    t(key, locale, values) {
      let message = this.message;
      if (typeof locale === "string") {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn(`Cannot translate the value of keypath ${key}. Use the value of keypath as default.`);
        return key;
      }
      return this.formater.interpolate(message[key], values).join("");
    }
  }
  function watchAppLocale(appVm, i18n) {
    if (appVm.$watchLocale) {
      appVm.$watchLocale((newLocale) => {
        i18n.setLocale(newLocale);
      });
    } else {
      appVm.$watch(() => appVm.$locale, (newLocale) => {
        i18n.setLocale(newLocale);
      });
    }
  }
  function getDefaultLocale() {
    if (typeof uni !== "undefined" && uni.getLocale) {
      return uni.getLocale();
    }
    if (typeof global !== "undefined" && global.getLocale) {
      return global.getLocale();
    }
    return LOCALE_EN;
  }
  function initVueI18n(locale, messages2 = {}, fallbackLocale, watcher) {
    if (typeof locale !== "string") {
      const options = [
        messages2,
        locale
      ];
      locale = options[0];
      messages2 = options[1];
    }
    if (typeof locale !== "string") {
      locale = getDefaultLocale();
    }
    if (typeof fallbackLocale !== "string") {
      fallbackLocale = typeof __uniConfig !== "undefined" && __uniConfig.fallbackLocale || LOCALE_EN;
    }
    const i18n = new I18n({
      locale,
      fallbackLocale,
      messages: messages2,
      watcher
    });
    let t2 = (key, values) => {
      if (typeof getApp !== "function") {
        t2 = function(key2, values2) {
          return i18n.t(key2, values2);
        };
      } else {
        let isWatchedAppLocale = false;
        t2 = function(key2, values2) {
          const appVm = getApp().$vm;
          if (appVm) {
            appVm.$locale;
            if (!isWatchedAppLocale) {
              isWatchedAppLocale = true;
              watchAppLocale(appVm, i18n);
            }
          }
          return i18n.t(key2, values2);
        };
      }
      return t2(key, values);
    };
    return {
      i18n,
      f(message, values, delimiters) {
        return i18n.f(message, values, delimiters);
      },
      t(key, values) {
        return t2(key, values);
      },
      add(locale2, message, override = true) {
        return i18n.add(locale2, message, override);
      },
      watch(fn) {
        return i18n.watchLocale(fn);
      },
      getLocale() {
        return i18n.getLocale();
      },
      setLocale(newLocale) {
        return i18n.setLocale(newLocale);
      }
    };
  }
  const en$1 = {
    "uni-popup.cancel": "cancel",
    "uni-popup.ok": "ok",
    "uni-popup.placeholder": "pleace enter",
    "uni-popup.title": "Hint",
    "uni-popup.shareTitle": "Share to"
  };
  const zhHans$1 = {
    "uni-popup.cancel": "取消",
    "uni-popup.ok": "确定",
    "uni-popup.placeholder": "请输入",
    "uni-popup.title": "提示",
    "uni-popup.shareTitle": "分享到"
  };
  const zhHant$1 = {
    "uni-popup.cancel": "取消",
    "uni-popup.ok": "確定",
    "uni-popup.placeholder": "請輸入",
    "uni-popup.title": "提示",
    "uni-popup.shareTitle": "分享到"
  };
  const messages$1 = {
    en: en$1,
    "zh-Hans": zhHans$1,
    "zh-Hant": zhHant$1
  };
  const {
    t: t$1
  } = initVueI18n(messages$1);
  const _sfc_main$h = {
    name: "uniPopupDialog",
    mixins: [popup],
    emits: ["confirm", "close", "update:modelValue", "input"],
    props: {
      inputType: {
        type: String,
        default: "text"
      },
      showClose: {
        type: Boolean,
        default: true
      },
      modelValue: {
        type: [Number, String],
        default: ""
      },
      placeholder: {
        type: [String, Number],
        default: ""
      },
      type: {
        type: String,
        default: "error"
      },
      mode: {
        type: String,
        default: "base"
      },
      title: {
        type: String,
        default: ""
      },
      content: {
        type: String,
        default: ""
      },
      beforeClose: {
        type: Boolean,
        default: false
      },
      cancelText: {
        type: String,
        default: ""
      },
      confirmText: {
        type: String,
        default: ""
      },
      maxlength: {
        type: Number,
        default: -1
      },
      focus: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        dialogType: "error",
        val: ""
      };
    },
    computed: {
      okText() {
        return this.confirmText || t$1("uni-popup.ok");
      },
      closeText() {
        return this.cancelText || t$1("uni-popup.cancel");
      },
      placeholderText() {
        return this.placeholder || t$1("uni-popup.placeholder");
      },
      titleText() {
        return this.title || t$1("uni-popup.title");
      }
    },
    watch: {
      type(val) {
        this.dialogType = val;
      },
      mode(val) {
        if (val === "input") {
          this.dialogType = "info";
        }
      },
      value(val) {
        if (this.maxlength != -1 && this.mode === "input") {
          this.val = val.slice(0, this.maxlength);
        } else {
          this.val = val;
        }
      },
      val(val) {
        this.$emit("update:modelValue", val);
      }
    },
    created() {
      this.popup.disableMask();
      if (this.mode === "input") {
        this.dialogType = "info";
        this.val = this.value;
        this.val = this.modelValue;
      } else {
        this.dialogType = this.type;
      }
    },
    methods: {
      /**
       * 点击确认按钮
       */
      onOk() {
        if (this.mode === "input") {
          this.$emit("confirm", this.val);
        } else {
          this.$emit("confirm");
        }
        if (this.beforeClose)
          return;
        this.popup.close();
      },
      /**
       * 点击取消按钮
       */
      closeDialog() {
        this.$emit("close");
        if (this.beforeClose)
          return;
        this.popup.close();
      },
      close() {
        this.popup.close();
      }
    }
  };
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-popup-dialog" }, [
      vue.createElementVNode("view", { class: "uni-dialog-title" }, [
        vue.createElementVNode(
          "text",
          {
            class: vue.normalizeClass(["uni-dialog-title-text", ["uni-popup__" + $data.dialogType]])
          },
          vue.toDisplayString($options.titleText),
          3
          /* TEXT, CLASS */
        )
      ]),
      $props.mode === "base" ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "uni-dialog-content"
      }, [
        vue.renderSlot(_ctx.$slots, "default", {}, () => [
          vue.createElementVNode(
            "text",
            { class: "uni-dialog-content-text" },
            vue.toDisplayString($props.content),
            1
            /* TEXT */
          )
        ], true)
      ])) : (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "uni-dialog-content"
      }, [
        vue.renderSlot(_ctx.$slots, "default", {}, () => [
          vue.withDirectives(vue.createElementVNode("input", {
            class: "uni-dialog-input",
            maxlength: $props.maxlength,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.val = $event),
            type: $props.inputType,
            placeholder: $options.placeholderText,
            focus: $props.focus
          }, null, 8, ["maxlength", "type", "placeholder", "focus"]), [
            [vue.vModelDynamic, $data.val]
          ])
        ], true)
      ])),
      vue.createElementVNode("view", { class: "uni-dialog-button-group" }, [
        $props.showClose ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "uni-dialog-button",
          onClick: _cache[1] || (_cache[1] = (...args) => $options.closeDialog && $options.closeDialog(...args))
        }, [
          vue.createElementVNode(
            "text",
            { class: "uni-dialog-button-text" },
            vue.toDisplayString($options.closeText),
            1
            /* TEXT */
          )
        ])) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["uni-dialog-button", $props.showClose ? "uni-border-left" : ""]),
            onClick: _cache[2] || (_cache[2] = (...args) => $options.onOk && $options.onOk(...args))
          },
          [
            vue.createElementVNode(
              "text",
              { class: "uni-dialog-button-text uni-button-color" },
              vue.toDisplayString($options.okText),
              1
              /* TEXT */
            )
          ],
          2
          /* CLASS */
        )
      ])
    ]);
  }
  const __easycom_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$g], ["__scopeId", "data-v-d78c88b7"], ["__file", "D:/project/uni-app/leoh-seckill-shop/uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.vue"]]);
  class MPAnimation {
    constructor(options, _this) {
      this.options = options;
      this.animation = uni.createAnimation({
        ...options
      });
      this.currentStepAnimates = {};
      this.next = 0;
      this.$ = _this;
    }
    _nvuePushAnimates(type, args) {
      let aniObj = this.currentStepAnimates[this.next];
      let styles = {};
      if (!aniObj) {
        styles = {
          styles: {},
          config: {}
        };
      } else {
        styles = aniObj;
      }
      if (animateTypes1.includes(type)) {
        if (!styles.styles.transform) {
          styles.styles.transform = "";
        }
        let unit = "";
        if (type === "rotate") {
          unit = "deg";
        }
        styles.styles.transform += `${type}(${args + unit}) `;
      } else {
        styles.styles[type] = `${args}`;
      }
      this.currentStepAnimates[this.next] = styles;
    }
    _animateRun(styles = {}, config2 = {}) {
      let ref = this.$.$refs["ani"].ref;
      if (!ref)
        return;
      return new Promise((resolve, reject) => {
        nvueAnimation.transition(ref, {
          styles,
          ...config2
        }, (res) => {
          resolve();
        });
      });
    }
    _nvueNextAnimate(animates, step = 0, fn) {
      let obj = animates[step];
      if (obj) {
        let {
          styles,
          config: config2
        } = obj;
        this._animateRun(styles, config2).then(() => {
          step += 1;
          this._nvueNextAnimate(animates, step, fn);
        });
      } else {
        this.currentStepAnimates = {};
        typeof fn === "function" && fn();
        this.isEnd = true;
      }
    }
    step(config2 = {}) {
      this.animation.step(config2);
      return this;
    }
    run(fn) {
      this.$.animationData = this.animation.export();
      this.$.timer = setTimeout(() => {
        typeof fn === "function" && fn();
      }, this.$.durationTime);
    }
  }
  const animateTypes1 = [
    "matrix",
    "matrix3d",
    "rotate",
    "rotate3d",
    "rotateX",
    "rotateY",
    "rotateZ",
    "scale",
    "scale3d",
    "scaleX",
    "scaleY",
    "scaleZ",
    "skew",
    "skewX",
    "skewY",
    "translate",
    "translate3d",
    "translateX",
    "translateY",
    "translateZ"
  ];
  const animateTypes2 = ["opacity", "backgroundColor"];
  const animateTypes3 = ["width", "height", "left", "right", "top", "bottom"];
  animateTypes1.concat(animateTypes2, animateTypes3).forEach((type) => {
    MPAnimation.prototype[type] = function(...args) {
      this.animation[type](...args);
      return this;
    };
  });
  function createAnimation(option, _this) {
    if (!_this)
      return;
    clearTimeout(_this.timer);
    return new MPAnimation(option, _this);
  }
  const _sfc_main$g = {
    name: "uniTransition",
    emits: ["click", "change"],
    props: {
      show: {
        type: Boolean,
        default: false
      },
      modeClass: {
        type: [Array, String],
        default() {
          return "fade";
        }
      },
      duration: {
        type: Number,
        default: 300
      },
      styles: {
        type: Object,
        default() {
          return {};
        }
      },
      customClass: {
        type: String,
        default: ""
      },
      onceRender: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isShow: false,
        transform: "",
        opacity: 1,
        animationData: {},
        durationTime: 300,
        config: {}
      };
    },
    watch: {
      show: {
        handler(newVal) {
          if (newVal) {
            this.open();
          } else {
            if (this.isShow) {
              this.close();
            }
          }
        },
        immediate: true
      }
    },
    computed: {
      // 生成样式数据
      stylesObject() {
        let styles = {
          ...this.styles,
          "transition-duration": this.duration / 1e3 + "s"
        };
        let transform = "";
        for (let i in styles) {
          let line = this.toLine(i);
          transform += line + ":" + styles[i] + ";";
        }
        return transform;
      },
      // 初始化动画条件
      transformStyles() {
        return "transform:" + this.transform + ";opacity:" + this.opacity + ";" + this.stylesObject;
      }
    },
    created() {
      this.config = {
        duration: this.duration,
        timingFunction: "ease",
        transformOrigin: "50% 50%",
        delay: 0
      };
      this.durationTime = this.duration;
    },
    methods: {
      /**
       *  ref 触发 初始化动画
       */
      init(obj = {}) {
        if (obj.duration) {
          this.durationTime = obj.duration;
        }
        this.animation = createAnimation(Object.assign(this.config, obj), this);
      },
      /**
       * 点击组件触发回调
       */
      onClick() {
        this.$emit("click", {
          detail: this.isShow
        });
      },
      /**
       * ref 触发 动画分组
       * @param {Object} obj
       */
      step(obj, config2 = {}) {
        if (!this.animation)
          return;
        for (let i in obj) {
          try {
            if (typeof obj[i] === "object") {
              this.animation[i](...obj[i]);
            } else {
              this.animation[i](obj[i]);
            }
          } catch (e) {
            formatAppLog("error", "at uni_modules/uni-transition/components/uni-transition/uni-transition.vue:148", `方法 ${i} 不存在`);
          }
        }
        this.animation.step(config2);
        return this;
      },
      /**
       *  ref 触发 执行动画
       */
      run(fn) {
        if (!this.animation)
          return;
        this.animation.run(fn);
      },
      // 开始过度动画
      open() {
        clearTimeout(this.timer);
        this.transform = "";
        this.isShow = true;
        let { opacity, transform } = this.styleInit(false);
        if (typeof opacity !== "undefined") {
          this.opacity = opacity;
        }
        this.transform = transform;
        this.$nextTick(() => {
          this.timer = setTimeout(() => {
            this.animation = createAnimation(this.config, this);
            this.tranfromInit(false).step();
            this.animation.run();
            this.$emit("change", {
              detail: this.isShow
            });
          }, 20);
        });
      },
      // 关闭过度动画
      close(type) {
        if (!this.animation)
          return;
        this.tranfromInit(true).step().run(() => {
          this.isShow = false;
          this.animationData = null;
          this.animation = null;
          let { opacity, transform } = this.styleInit(false);
          this.opacity = opacity || 1;
          this.transform = transform;
          this.$emit("change", {
            detail: this.isShow
          });
        });
      },
      // 处理动画开始前的默认样式
      styleInit(type) {
        let styles = {
          transform: ""
        };
        let buildStyle = (type2, mode) => {
          if (mode === "fade") {
            styles.opacity = this.animationType(type2)[mode];
          } else {
            styles.transform += this.animationType(type2)[mode] + " ";
          }
        };
        if (typeof this.modeClass === "string") {
          buildStyle(type, this.modeClass);
        } else {
          this.modeClass.forEach((mode) => {
            buildStyle(type, mode);
          });
        }
        return styles;
      },
      // 处理内置组合动画
      tranfromInit(type) {
        let buildTranfrom = (type2, mode) => {
          let aniNum = null;
          if (mode === "fade") {
            aniNum = type2 ? 0 : 1;
          } else {
            aniNum = type2 ? "-100%" : "0";
            if (mode === "zoom-in") {
              aniNum = type2 ? 0.8 : 1;
            }
            if (mode === "zoom-out") {
              aniNum = type2 ? 1.2 : 1;
            }
            if (mode === "slide-right") {
              aniNum = type2 ? "100%" : "0";
            }
            if (mode === "slide-bottom") {
              aniNum = type2 ? "100%" : "0";
            }
          }
          this.animation[this.animationMode()[mode]](aniNum);
        };
        if (typeof this.modeClass === "string") {
          buildTranfrom(type, this.modeClass);
        } else {
          this.modeClass.forEach((mode) => {
            buildTranfrom(type, mode);
          });
        }
        return this.animation;
      },
      animationType(type) {
        return {
          fade: type ? 0 : 1,
          "slide-top": `translateY(${type ? "0" : "-100%"})`,
          "slide-right": `translateX(${type ? "0" : "100%"})`,
          "slide-bottom": `translateY(${type ? "0" : "100%"})`,
          "slide-left": `translateX(${type ? "0" : "-100%"})`,
          "zoom-in": `scaleX(${type ? 1 : 0.8}) scaleY(${type ? 1 : 0.8})`,
          "zoom-out": `scaleX(${type ? 1 : 1.2}) scaleY(${type ? 1 : 1.2})`
        };
      },
      // 内置动画类型与实际动画对应字典
      animationMode() {
        return {
          fade: "opacity",
          "slide-top": "translateY",
          "slide-right": "translateX",
          "slide-bottom": "translateY",
          "slide-left": "translateX",
          "zoom-in": "scale",
          "zoom-out": "scale"
        };
      },
      // 驼峰转中横线
      toLine(name) {
        return name.replace(/([A-Z])/g, "-$1").toLowerCase();
      }
    }
  };
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.withDirectives((vue.openBlock(), vue.createElementBlock("view", {
      ref: "ani",
      animation: $data.animationData,
      class: vue.normalizeClass($props.customClass),
      style: vue.normalizeStyle($options.transformStyles),
      onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 14, ["animation"])), [
      [vue.vShow, $data.isShow]
    ]);
  }
  const __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$f], ["__file", "D:/project/uni-app/leoh-seckill-shop/uni_modules/uni-transition/components/uni-transition/uni-transition.vue"]]);
  const _sfc_main$f = {
    name: "uniPopup",
    components: {},
    emits: ["change", "maskClick"],
    props: {
      // 开启动画
      animation: {
        type: Boolean,
        default: true
      },
      // 弹出层类型，可选值，top: 顶部弹出层；bottom：底部弹出层；center：全屏弹出层
      // message: 消息提示 ; dialog : 对话框
      type: {
        type: String,
        default: "center"
      },
      // maskClick
      isMaskClick: {
        type: Boolean,
        default: null
      },
      // TODO 2 个版本后废弃属性 ，使用 isMaskClick
      maskClick: {
        type: Boolean,
        default: null
      },
      backgroundColor: {
        type: String,
        default: "none"
      },
      safeArea: {
        type: Boolean,
        default: true
      },
      maskBackgroundColor: {
        type: String,
        default: "rgba(0, 0, 0, 0.4)"
      },
      borderRadius: {
        type: String
      }
    },
    watch: {
      /**
       * 监听type类型
       */
      type: {
        handler: function(type) {
          if (!this.config[type])
            return;
          this[this.config[type]](true);
        },
        immediate: true
      },
      isDesktop: {
        handler: function(newVal) {
          if (!this.config[newVal])
            return;
          this[this.config[this.type]](true);
        },
        immediate: true
      },
      /**
       * 监听遮罩是否可点击
       * @param {Object} val
       */
      maskClick: {
        handler: function(val) {
          this.mkclick = val;
        },
        immediate: true
      },
      isMaskClick: {
        handler: function(val) {
          this.mkclick = val;
        },
        immediate: true
      },
      // H5 下禁止底部滚动
      showPopup(show) {
      }
    },
    data() {
      return {
        duration: 300,
        ani: [],
        showPopup: false,
        showTrans: false,
        popupWidth: 0,
        popupHeight: 0,
        config: {
          top: "top",
          bottom: "bottom",
          center: "center",
          left: "left",
          right: "right",
          message: "top",
          dialog: "center",
          share: "bottom"
        },
        maskClass: {
          position: "fixed",
          bottom: 0,
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)"
        },
        transClass: {
          backgroundColor: "transparent",
          borderRadius: this.borderRadius || "0",
          position: "fixed",
          left: 0,
          right: 0
        },
        maskShow: true,
        mkclick: true,
        popupstyle: "top"
      };
    },
    computed: {
      getStyles() {
        let res = { backgroundColor: this.bg };
        if (this.borderRadius || "0") {
          res = Object.assign(res, { borderRadius: this.borderRadius });
        }
        return res;
      },
      isDesktop() {
        return this.popupWidth >= 500 && this.popupHeight >= 500;
      },
      bg() {
        if (this.backgroundColor === "" || this.backgroundColor === "none") {
          return "transparent";
        }
        return this.backgroundColor;
      }
    },
    mounted() {
      const fixSize = () => {
        const {
          windowWidth: windowWidth2,
          windowHeight,
          windowTop,
          safeArea,
          screenHeight,
          safeAreaInsets
        } = uni.getSystemInfoSync();
        this.popupWidth = windowWidth2;
        this.popupHeight = windowHeight + (windowTop || 0);
        if (safeArea && this.safeArea) {
          this.safeAreaInsets = safeAreaInsets.bottom;
        } else {
          this.safeAreaInsets = 0;
        }
      };
      fixSize();
    },
    // TODO vue3
    unmounted() {
      this.setH5Visible();
    },
    activated() {
      this.setH5Visible(!this.showPopup);
    },
    deactivated() {
      this.setH5Visible(true);
    },
    created() {
      if (this.isMaskClick === null && this.maskClick === null) {
        this.mkclick = true;
      } else {
        this.mkclick = this.isMaskClick !== null ? this.isMaskClick : this.maskClick;
      }
      if (this.animation) {
        this.duration = 300;
      } else {
        this.duration = 0;
      }
      this.messageChild = null;
      this.clearPropagation = false;
      this.maskClass.backgroundColor = this.maskBackgroundColor;
    },
    methods: {
      setH5Visible(visible = true) {
      },
      /**
       * 公用方法，不显示遮罩层
       */
      closeMask() {
        this.maskShow = false;
      },
      /**
       * 公用方法，遮罩层禁止点击
       */
      disableMask() {
        this.mkclick = false;
      },
      // TODO nvue 取消冒泡
      clear(e) {
        e.stopPropagation();
        this.clearPropagation = true;
      },
      open(direction) {
        if (this.showPopup) {
          return;
        }
        let innerType = ["top", "center", "bottom", "left", "right", "message", "dialog", "share"];
        if (!(direction && innerType.indexOf(direction) !== -1)) {
          direction = this.type;
        }
        if (!this.config[direction]) {
          formatAppLog("error", "at uni_modules/uni-popup/components/uni-popup/uni-popup.vue:310", "缺少类型：", direction);
          return;
        }
        this[this.config[direction]]();
        this.$emit("change", {
          show: true,
          type: direction
        });
      },
      close(type) {
        this.showTrans = false;
        this.$emit("change", {
          show: false,
          type: this.type
        });
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.showPopup = false;
        }, 300);
      },
      // TODO 处理冒泡事件，头条的冒泡事件有问题 ，先这样兼容
      touchstart() {
        this.clearPropagation = false;
      },
      onTap() {
        if (this.clearPropagation) {
          this.clearPropagation = false;
          return;
        }
        this.$emit("maskClick");
        if (!this.mkclick)
          return;
        this.close();
      },
      /**
       * 顶部弹出样式处理
       */
      top(type) {
        this.popupstyle = this.isDesktop ? "fixforpc-top" : "top";
        this.ani = ["slide-top"];
        this.transClass = {
          position: "fixed",
          left: 0,
          right: 0,
          backgroundColor: this.bg,
          borderRadius: this.borderRadius || "0"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
        this.$nextTick(() => {
          this.showPoptrans();
          if (this.messageChild && this.type === "message") {
            this.messageChild.timerClose();
          }
        });
      },
      /**
       * 底部弹出样式处理
       */
      bottom(type) {
        this.popupstyle = "bottom";
        this.ani = ["slide-bottom"];
        this.transClass = {
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          paddingBottom: this.safeAreaInsets + "px",
          backgroundColor: this.bg,
          borderRadius: this.borderRadius || "0"
        };
        if (type)
          return;
        this.showPoptrans();
      },
      /**
       * 中间弹出样式处理
       */
      center(type) {
        this.popupstyle = "center";
        this.ani = ["zoom-out", "fade"];
        this.transClass = {
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: this.borderRadius || "0"
        };
        if (type)
          return;
        this.showPoptrans();
      },
      left(type) {
        this.popupstyle = "left";
        this.ani = ["slide-left"];
        this.transClass = {
          position: "fixed",
          left: 0,
          bottom: 0,
          top: 0,
          backgroundColor: this.bg,
          borderRadius: this.borderRadius || "0",
          display: "flex",
          flexDirection: "column"
        };
        if (type)
          return;
        this.showPoptrans();
      },
      right(type) {
        this.popupstyle = "right";
        this.ani = ["slide-right"];
        this.transClass = {
          position: "fixed",
          bottom: 0,
          right: 0,
          top: 0,
          backgroundColor: this.bg,
          borderRadius: this.borderRadius || "0",
          display: "flex",
          flexDirection: "column"
        };
        if (type)
          return;
        this.showPoptrans();
      },
      showPoptrans() {
        this.$nextTick(() => {
          this.showPopup = true;
          this.showTrans = true;
        });
      }
    }
  };
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_transition = resolveEasycom(vue.resolveDynamicComponent("uni-transition"), __easycom_0$2);
    return $data.showPopup ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["uni-popup", [$data.popupstyle, $options.isDesktop ? "fixforpc-z-index" : ""]])
      },
      [
        vue.createElementVNode(
          "view",
          {
            onTouchstart: _cache[1] || (_cache[1] = (...args) => $options.touchstart && $options.touchstart(...args))
          },
          [
            $data.maskShow ? (vue.openBlock(), vue.createBlock(_component_uni_transition, {
              key: "1",
              name: "mask",
              "mode-class": "fade",
              styles: $data.maskClass,
              duration: $data.duration,
              show: $data.showTrans,
              onClick: $options.onTap
            }, null, 8, ["styles", "duration", "show", "onClick"])) : vue.createCommentVNode("v-if", true),
            vue.createVNode(_component_uni_transition, {
              key: "2",
              "mode-class": $data.ani,
              name: "content",
              styles: $data.transClass,
              duration: $data.duration,
              show: $data.showTrans,
              onClick: $options.onTap
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["uni-popup__wrapper", [$data.popupstyle]]),
                    style: vue.normalizeStyle($options.getStyles),
                    onClick: _cache[0] || (_cache[0] = (...args) => $options.clear && $options.clear(...args))
                  },
                  [
                    vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
                  ],
                  6
                  /* CLASS, STYLE */
                )
              ]),
              _: 3
              /* FORWARDED */
            }, 8, ["mode-class", "styles", "duration", "show", "onClick"])
          ],
          32
          /* NEED_HYDRATION */
        )
      ],
      2
      /* CLASS */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_7 = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$e], ["__scopeId", "data-v-4dd3c44b"], ["__file", "D:/project/uni-app/leoh-seckill-shop/uni_modules/uni-popup/components/uni-popup/uni-popup.vue"]]);
  const _sfc_main$e = {
    __name: "userinfo",
    setup(__props, { expose: __expose }) {
      __expose();
      let inputDialog = vue.ref();
      const onAvatarTap = () => {
        uni.chooseImage({
          count: 1,
          success(tempFilePaths) {
            formatAppLog("log", "at pages/userinfo/userinfo.vue:30", tempFilePaths);
          }
        });
      };
      const onUsernameTap = () => {
        inputDialog.value.open();
      };
      const onUsernameConfirm = (value) => {
        formatAppLog("log", "at pages/userinfo/userinfo.vue:40", "用户输入: ", value);
      };
      const __returned__ = { get inputDialog() {
        return inputDialog;
      }, set inputDialog(v) {
        inputDialog = v;
      }, onAvatarTap, onUsernameTap, onUsernameConfirm, ref: vue.ref };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_list_item = resolveEasycom(vue.resolveDynamicComponent("uni-list-item"), __easycom_4);
    const _component_uni_list = resolveEasycom(vue.resolveDynamicComponent("uni-list"), __easycom_5);
    const _component_uni_popup_dialog = resolveEasycom(vue.resolveDynamicComponent("uni-popup-dialog"), __easycom_2$1);
    const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_7);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createVNode(_component_uni_list, null, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_uni_list_item, {
              showArrow: "",
              onClick: $setup.onAvatarTap,
              link: ""
            }, {
              header: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "d-flex a-center" }, "头像")
              ]),
              footer: vue.withCtx(() => [
                vue.createElementVNode("image", {
                  class: "rounded",
                  style: { "height": "80rpx", "width": "80rpx" },
                  src: _imports_0$1,
                  mode: "widthFix"
                })
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createVNode(_component_uni_list_item, {
              onClick: $setup.onUsernameTap,
              showArrow: "",
              title: "用户名",
              "right-text": "蜘蛛侠",
              link: ""
            })
          ]),
          _: 1
          /* STABLE */
        }),
        vue.createVNode(
          _component_uni_popup,
          {
            ref: "inputDialog",
            type: "dialog"
          },
          {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_popup_dialog, {
                mode: "input",
                title: "修改用户名",
                value: "原来的用户名",
                placeholder: "请输入用户名",
                onConfirm: $setup.onUsernameConfirm
              })
            ]),
            _: 1
            /* STABLE */
          },
          512
          /* NEED_PATCH */
        )
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesUserinfoUserinfo = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$d], ["__file", "D:/project/uni-app/leoh-seckill-shop/pages/userinfo/userinfo.vue"]]);
  let mpMixins = {};
  mpMixins = {
    data() {
      return {
        is_show: "none"
      };
    },
    watch: {
      show(newVal) {
        this.is_show = this.show;
      }
    },
    created() {
      this.swipeaction = this.getSwipeAction();
      if (this.swipeaction && Array.isArray(this.swipeaction.children)) {
        this.swipeaction.children.push(this);
      }
    },
    mounted() {
      this.is_show = this.show;
    },
    methods: {
      // wxs 中调用
      closeSwipe(e) {
        if (this.autoClose && this.swipeaction) {
          this.swipeaction.closeOther(this);
        }
      },
      change(e) {
        this.$emit("change", e.open);
        if (this.is_show !== e.open) {
          this.is_show = e.open;
        }
      },
      appTouchStart(e) {
        const {
          clientX
        } = e.changedTouches[0];
        this.clientX = clientX;
        this.timestamp = (/* @__PURE__ */ new Date()).getTime();
      },
      appTouchEnd(e, index, item, position) {
        const {
          clientX
        } = e.changedTouches[0];
        let diff = Math.abs(this.clientX - clientX);
        let time = (/* @__PURE__ */ new Date()).getTime() - this.timestamp;
        if (diff < 40 && time < 300) {
          this.$emit("click", {
            content: item,
            index,
            position
          });
        }
      },
      onClickForPC(index, item, position) {
        return;
      }
    }
  };
  const mpwxs = mpMixins;
  let bindIngXMixins = {};
  let otherMixins = {};
  const block0$1 = (Comp) => {
    (Comp.$wxs || (Comp.$wxs = [])).push("wxsswipe");
    (Comp.$wxsModules || (Comp.$wxsModules = {}))["wxsswipe"] = "afd46426";
  };
  const block1 = (Comp) => {
    (Comp.$renderjs || (Comp.$renderjs = [])).push("renderswipe");
    (Comp.$renderjsModules || (Comp.$renderjsModules = {}))["renderswipe"] = "5a1e922e";
  };
  const _sfc_main$d = {
    mixins: [mpwxs, bindIngXMixins, otherMixins],
    emits: ["click", "change"],
    props: {
      // 控制开关
      show: {
        type: String,
        default: "none"
      },
      // 禁用
      disabled: {
        type: Boolean,
        default: false
      },
      // 是否自动关闭
      autoClose: {
        type: Boolean,
        default: true
      },
      // 滑动缺省距离
      threshold: {
        type: Number,
        default: 20
      },
      // 左侧按钮内容
      leftOptions: {
        type: Array,
        default() {
          return [];
        }
      },
      // 右侧按钮内容
      rightOptions: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    // TODO vue3
    unmounted() {
      this.__isUnmounted = true;
      this.uninstall();
    },
    methods: {
      uninstall() {
        if (this.swipeaction) {
          this.swipeaction.children.forEach((item, index) => {
            if (item === this) {
              this.swipeaction.children.splice(index, 1);
            }
          });
        }
      },
      /**
       * 获取父元素实例
       */
      getSwipeAction(name = "uniSwipeAction") {
        let parent = this.$parent;
        let parentName = parent.$options.name;
        while (parentName !== name) {
          parent = parent.$parent;
          if (!parent)
            return false;
          parentName = parent.$options.name;
        }
        return parent;
      }
    }
  };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createCommentVNode(" 在微信小程序 app vue端 h5 使用wxs 实现"),
        vue.createElementVNode("view", { class: "uni-swipe" }, [
          vue.createElementVNode("view", {
            class: "uni-swipe_box",
            "change:prop": _ctx.wxsswipe.showWatch,
            prop: vue.wp(_ctx.is_show),
            "data-threshold": $props.threshold,
            "data-disabled": $props.disabled,
            onTouchstart: _cache[2] || (_cache[2] = (...args) => _ctx.wxsswipe.touchstart && _ctx.wxsswipe.touchstart(...args)),
            onTouchmove: _cache[3] || (_cache[3] = (...args) => _ctx.wxsswipe.touchmove && _ctx.wxsswipe.touchmove(...args)),
            onTouchend: _cache[4] || (_cache[4] = (...args) => _ctx.wxsswipe.touchend && _ctx.wxsswipe.touchend(...args))
          }, [
            vue.createCommentVNode(" 在微信小程序 app vue端 h5 使用wxs 实现"),
            vue.createElementVNode("view", { class: "uni-swipe_button-group button-group--left" }, [
              vue.renderSlot(_ctx.$slots, "left", {}, () => [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($props.leftOptions, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      key: index,
                      style: vue.normalizeStyle({
                        backgroundColor: item.style && item.style.backgroundColor ? item.style.backgroundColor : "#C7C6CD"
                      }),
                      class: "uni-swipe_button button-hock",
                      onTouchstart: _cache[0] || (_cache[0] = vue.withModifiers((...args) => _ctx.appTouchStart && _ctx.appTouchStart(...args), ["stop"])),
                      onTouchend: vue.withModifiers(($event) => _ctx.appTouchEnd($event, index, item, "left"), ["stop"]),
                      onClick: vue.withModifiers(($event) => _ctx.onClickForPC(index, item, "left"), ["stop"])
                    }, [
                      vue.createElementVNode(
                        "text",
                        {
                          class: "uni-swipe_button-text",
                          style: vue.normalizeStyle({ color: item.style && item.style.color ? item.style.color : "#FFFFFF", fontSize: item.style && item.style.fontSize ? item.style.fontSize : "16px" })
                        },
                        vue.toDisplayString(item.text),
                        5
                        /* TEXT, STYLE */
                      )
                    ], 44, ["onTouchend", "onClick"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ], true)
            ]),
            vue.createElementVNode("view", { class: "uni-swipe_text--center" }, [
              vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ]),
            vue.createElementVNode("view", { class: "uni-swipe_button-group button-group--right" }, [
              vue.renderSlot(_ctx.$slots, "right", {}, () => [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($props.rightOptions, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      key: index,
                      style: vue.normalizeStyle({
                        backgroundColor: item.style && item.style.backgroundColor ? item.style.backgroundColor : "#C7C6CD"
                      }),
                      class: "uni-swipe_button button-hock",
                      onTouchstart: _cache[1] || (_cache[1] = vue.withModifiers((...args) => _ctx.appTouchStart && _ctx.appTouchStart(...args), ["stop"])),
                      onTouchend: vue.withModifiers(($event) => _ctx.appTouchEnd($event, index, item, "right"), ["stop"]),
                      onClick: vue.withModifiers(($event) => _ctx.onClickForPC(index, item, "right"), ["stop"])
                    }, [
                      vue.createElementVNode(
                        "text",
                        {
                          class: "uni-swipe_button-text",
                          style: vue.normalizeStyle({ color: item.style && item.style.color ? item.style.color : "#FFFFFF", fontSize: item.style && item.style.fontSize ? item.style.fontSize : "16px" })
                        },
                        vue.toDisplayString(item.text),
                        5
                        /* TEXT, STYLE */
                      )
                    ], 44, ["onTouchend", "onClick"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ], true)
            ])
          ], 40, ["change:prop", "prop", "data-threshold", "data-disabled"])
        ]),
        vue.createCommentVNode(" app nvue端 使用 bindingx "),
        vue.createCommentVNode(" 其他平台使用 js ，长列表性能可能会有影响")
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    );
  }
  if (typeof block0$1 === "function")
    block0$1(_sfc_main$d);
  if (typeof block1 === "function")
    block1(_sfc_main$d);
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$c], ["__scopeId", "data-v-8ff2a577"], ["__file", "D:/project/uni-app/leoh-seckill-shop/uni_modules/uni-swipe-action/components/uni-swipe-action-item/uni-swipe-action-item.vue"]]);
  const _sfc_main$c = {
    name: "uniSwipeAction",
    data() {
      return {};
    },
    created() {
      this.children = [];
    },
    methods: {
      // 公开给用户使用，重制组件样式
      resize() {
      },
      // 公开给用户使用，关闭全部 已经打开的组件
      closeAll() {
        this.children.forEach((vm) => {
          vm.is_show = "none";
        });
      },
      closeOther(vm) {
        if (this.openItem && this.openItem !== vm) {
          this.openItem.is_show = "none";
        }
        this.openItem = vm;
      }
    }
  };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.renderSlot(_ctx.$slots, "default")
    ]);
  }
  const __easycom_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$b], ["__file", "D:/project/uni-app/leoh-seckill-shop/uni_modules/uni-swipe-action/components/uni-swipe-action/uni-swipe-action.vue"]]);
  var isVue2 = false;
  function set(target, key, val) {
    if (Array.isArray(target)) {
      target.length = Math.max(target.length, key);
      target.splice(key, 1, val);
      return val;
    }
    target[key] = val;
    return val;
  }
  function del(target, key) {
    if (Array.isArray(target)) {
      target.splice(key, 1);
      return;
    }
    delete target[key];
  }
  function getDevtoolsGlobalHook() {
    return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
  }
  function getTarget() {
    return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
  }
  const isProxyAvailable = typeof Proxy === "function";
  const HOOK_SETUP = "devtools-plugin:setup";
  const HOOK_PLUGIN_SETTINGS_SET = "plugin:settings:set";
  let supported;
  let perf;
  function isPerformanceSupported() {
    var _a;
    if (supported !== void 0) {
      return supported;
    }
    if (typeof window !== "undefined" && window.performance) {
      supported = true;
      perf = window.performance;
    } else if (typeof global !== "undefined" && ((_a = global.perf_hooks) === null || _a === void 0 ? void 0 : _a.performance)) {
      supported = true;
      perf = global.perf_hooks.performance;
    } else {
      supported = false;
    }
    return supported;
  }
  function now() {
    return isPerformanceSupported() ? perf.now() : Date.now();
  }
  class ApiProxy {
    constructor(plugin, hook) {
      this.target = null;
      this.targetQueue = [];
      this.onQueue = [];
      this.plugin = plugin;
      this.hook = hook;
      const defaultSettings = {};
      if (plugin.settings) {
        for (const id in plugin.settings) {
          const item = plugin.settings[id];
          defaultSettings[id] = item.defaultValue;
        }
      }
      const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
      let currentSettings = Object.assign({}, defaultSettings);
      try {
        const raw = localStorage.getItem(localSettingsSaveId);
        const data = JSON.parse(raw);
        Object.assign(currentSettings, data);
      } catch (e) {
      }
      this.fallbacks = {
        getSettings() {
          return currentSettings;
        },
        setSettings(value) {
          try {
            localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
          } catch (e) {
          }
          currentSettings = value;
        },
        now() {
          return now();
        }
      };
      if (hook) {
        hook.on(HOOK_PLUGIN_SETTINGS_SET, (pluginId, value) => {
          if (pluginId === this.plugin.id) {
            this.fallbacks.setSettings(value);
          }
        });
      }
      this.proxiedOn = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target.on[prop];
          } else {
            return (...args) => {
              this.onQueue.push({
                method: prop,
                args
              });
            };
          }
        }
      });
      this.proxiedTarget = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target[prop];
          } else if (prop === "on") {
            return this.proxiedOn;
          } else if (Object.keys(this.fallbacks).includes(prop)) {
            return (...args) => {
              this.targetQueue.push({
                method: prop,
                args,
                resolve: () => {
                }
              });
              return this.fallbacks[prop](...args);
            };
          } else {
            return (...args) => {
              return new Promise((resolve) => {
                this.targetQueue.push({
                  method: prop,
                  args,
                  resolve
                });
              });
            };
          }
        }
      });
    }
    async setRealTarget(target) {
      this.target = target;
      for (const item of this.onQueue) {
        this.target.on[item.method](...item.args);
      }
      for (const item of this.targetQueue) {
        item.resolve(await this.target[item.method](...item.args));
      }
    }
  }
  function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
    const descriptor = pluginDescriptor;
    const target = getTarget();
    const hook = getDevtoolsGlobalHook();
    const enableProxy = isProxyAvailable && descriptor.enableEarlyProxy;
    if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
      hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
    } else {
      const proxy = enableProxy ? new ApiProxy(descriptor, hook) : null;
      const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
      list.push({
        pluginDescriptor: descriptor,
        setupFn,
        proxy
      });
      if (proxy)
        setupFn(proxy.proxiedTarget);
    }
  }
  /*!
   * pinia v2.1.7
   * (c) 2023 Eduardo San Martin Morote
   * @license MIT
   */
  let activePinia;
  const setActivePinia = (pinia) => activePinia = pinia;
  const getActivePinia = () => vue.hasInjectionContext() && vue.inject(piniaSymbol) || activePinia;
  const piniaSymbol = Symbol("pinia");
  function isPlainObject(o) {
    return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
  }
  var MutationType;
  (function(MutationType2) {
    MutationType2["direct"] = "direct";
    MutationType2["patchObject"] = "patch object";
    MutationType2["patchFunction"] = "patch function";
  })(MutationType || (MutationType = {}));
  const IS_CLIENT = typeof window !== "undefined";
  const USE_DEVTOOLS = IS_CLIENT;
  const _global = /* @__PURE__ */ (() => typeof window === "object" && window.window === window ? window : typeof self === "object" && self.self === self ? self : typeof global === "object" && global.global === global ? global : typeof globalThis === "object" ? globalThis : { HTMLElement: null })();
  function bom(blob, { autoBom = false } = {}) {
    if (autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
      return new Blob([String.fromCharCode(65279), blob], { type: blob.type });
    }
    return blob;
  }
  function download(url, name, opts) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.onload = function() {
      saveAs(xhr.response, name, opts);
    };
    xhr.onerror = function() {
      console.error("could not download file");
    };
    xhr.send();
  }
  function corsEnabled(url) {
    const xhr = new XMLHttpRequest();
    xhr.open("HEAD", url, false);
    try {
      xhr.send();
    } catch (e) {
    }
    return xhr.status >= 200 && xhr.status <= 299;
  }
  function click(node2) {
    try {
      node2.dispatchEvent(new MouseEvent("click"));
    } catch (e) {
      const evt = document.createEvent("MouseEvents");
      evt.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
      node2.dispatchEvent(evt);
    }
  }
  const _navigator = typeof navigator === "object" ? navigator : { userAgent: "" };
  const isMacOSWebView = /* @__PURE__ */ (() => /Macintosh/.test(_navigator.userAgent) && /AppleWebKit/.test(_navigator.userAgent) && !/Safari/.test(_navigator.userAgent))();
  const saveAs = !IS_CLIENT ? () => {
  } : (
    // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
    typeof HTMLAnchorElement !== "undefined" && "download" in HTMLAnchorElement.prototype && !isMacOSWebView ? downloadSaveAs : (
      // Use msSaveOrOpenBlob as a second approach
      "msSaveOrOpenBlob" in _navigator ? msSaveAs : (
        // Fallback to using FileReader and a popup
        fileSaverSaveAs
      )
    )
  );
  function downloadSaveAs(blob, name = "download", opts) {
    const a = document.createElement("a");
    a.download = name;
    a.rel = "noopener";
    if (typeof blob === "string") {
      a.href = blob;
      if (a.origin !== location.origin) {
        if (corsEnabled(a.href)) {
          download(blob, name, opts);
        } else {
          a.target = "_blank";
          click(a);
        }
      } else {
        click(a);
      }
    } else {
      a.href = URL.createObjectURL(blob);
      setTimeout(function() {
        URL.revokeObjectURL(a.href);
      }, 4e4);
      setTimeout(function() {
        click(a);
      }, 0);
    }
  }
  function msSaveAs(blob, name = "download", opts) {
    if (typeof blob === "string") {
      if (corsEnabled(blob)) {
        download(blob, name, opts);
      } else {
        const a = document.createElement("a");
        a.href = blob;
        a.target = "_blank";
        setTimeout(function() {
          click(a);
        });
      }
    } else {
      navigator.msSaveOrOpenBlob(bom(blob, opts), name);
    }
  }
  function fileSaverSaveAs(blob, name, opts, popup2) {
    popup2 = popup2 || open("", "_blank");
    if (popup2) {
      popup2.document.title = popup2.document.body.innerText = "downloading...";
    }
    if (typeof blob === "string")
      return download(blob, name, opts);
    const force = blob.type === "application/octet-stream";
    const isSafari = /constructor/i.test(String(_global.HTMLElement)) || "safari" in _global;
    const isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);
    if ((isChromeIOS || force && isSafari || isMacOSWebView) && typeof FileReader !== "undefined") {
      const reader = new FileReader();
      reader.onloadend = function() {
        let url = reader.result;
        if (typeof url !== "string") {
          popup2 = null;
          throw new Error("Wrong reader.result type");
        }
        url = isChromeIOS ? url : url.replace(/^data:[^;]*;/, "data:attachment/file;");
        if (popup2) {
          popup2.location.href = url;
        } else {
          location.assign(url);
        }
        popup2 = null;
      };
      reader.readAsDataURL(blob);
    } else {
      const url = URL.createObjectURL(blob);
      if (popup2)
        popup2.location.assign(url);
      else
        location.href = url;
      popup2 = null;
      setTimeout(function() {
        URL.revokeObjectURL(url);
      }, 4e4);
    }
  }
  function toastMessage(message, type) {
    const piniaMessage = "🍍 " + message;
    if (typeof __VUE_DEVTOOLS_TOAST__ === "function") {
      __VUE_DEVTOOLS_TOAST__(piniaMessage, type);
    } else if (type === "error") {
      console.error(piniaMessage);
    } else if (type === "warn") {
      console.warn(piniaMessage);
    } else {
      console.log(piniaMessage);
    }
  }
  function isPinia(o) {
    return "_a" in o && "install" in o;
  }
  function checkClipboardAccess() {
    if (!("clipboard" in navigator)) {
      toastMessage(`Your browser doesn't support the Clipboard API`, "error");
      return true;
    }
  }
  function checkNotFocusedError(error) {
    if (error instanceof Error && error.message.toLowerCase().includes("document is not focused")) {
      toastMessage('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn");
      return true;
    }
    return false;
  }
  async function actionGlobalCopyState(pinia) {
    if (checkClipboardAccess())
      return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(pinia.state.value));
      toastMessage("Global state copied to clipboard.");
    } catch (error) {
      if (checkNotFocusedError(error))
        return;
      toastMessage(`Failed to serialize the state. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  async function actionGlobalPasteState(pinia) {
    if (checkClipboardAccess())
      return;
    try {
      loadStoresState(pinia, JSON.parse(await navigator.clipboard.readText()));
      toastMessage("Global state pasted from clipboard.");
    } catch (error) {
      if (checkNotFocusedError(error))
        return;
      toastMessage(`Failed to deserialize the state from clipboard. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  async function actionGlobalSaveState(pinia) {
    try {
      saveAs(new Blob([JSON.stringify(pinia.state.value)], {
        type: "text/plain;charset=utf-8"
      }), "pinia-state.json");
    } catch (error) {
      toastMessage(`Failed to export the state as JSON. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  let fileInput;
  function getFileOpener() {
    if (!fileInput) {
      fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = ".json";
    }
    function openFile() {
      return new Promise((resolve, reject) => {
        fileInput.onchange = async () => {
          const files = fileInput.files;
          if (!files)
            return resolve(null);
          const file = files.item(0);
          if (!file)
            return resolve(null);
          return resolve({ text: await file.text(), file });
        };
        fileInput.oncancel = () => resolve(null);
        fileInput.onerror = reject;
        fileInput.click();
      });
    }
    return openFile;
  }
  async function actionGlobalOpenStateFile(pinia) {
    try {
      const open2 = getFileOpener();
      const result = await open2();
      if (!result)
        return;
      const { text, file } = result;
      loadStoresState(pinia, JSON.parse(text));
      toastMessage(`Global state imported from "${file.name}".`);
    } catch (error) {
      toastMessage(`Failed to import the state from JSON. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  function loadStoresState(pinia, state) {
    for (const key in state) {
      const storeState = pinia.state.value[key];
      if (storeState) {
        Object.assign(storeState, state[key]);
      } else {
        pinia.state.value[key] = state[key];
      }
    }
  }
  function formatDisplay(display) {
    return {
      _custom: {
        display
      }
    };
  }
  const PINIA_ROOT_LABEL = "🍍 Pinia (root)";
  const PINIA_ROOT_ID = "_root";
  function formatStoreForInspectorTree(store) {
    return isPinia(store) ? {
      id: PINIA_ROOT_ID,
      label: PINIA_ROOT_LABEL
    } : {
      id: store.$id,
      label: store.$id
    };
  }
  function formatStoreForInspectorState(store) {
    if (isPinia(store)) {
      const storeNames = Array.from(store._s.keys());
      const storeMap = store._s;
      const state2 = {
        state: storeNames.map((storeId) => ({
          editable: true,
          key: storeId,
          value: store.state.value[storeId]
        })),
        getters: storeNames.filter((id) => storeMap.get(id)._getters).map((id) => {
          const store2 = storeMap.get(id);
          return {
            editable: false,
            key: id,
            value: store2._getters.reduce((getters, key) => {
              getters[key] = store2[key];
              return getters;
            }, {})
          };
        })
      };
      return state2;
    }
    const state = {
      state: Object.keys(store.$state).map((key) => ({
        editable: true,
        key,
        value: store.$state[key]
      }))
    };
    if (store._getters && store._getters.length) {
      state.getters = store._getters.map((getterName) => ({
        editable: false,
        key: getterName,
        value: store[getterName]
      }));
    }
    if (store._customProperties.size) {
      state.customProperties = Array.from(store._customProperties).map((key) => ({
        editable: true,
        key,
        value: store[key]
      }));
    }
    return state;
  }
  function formatEventData(events) {
    if (!events)
      return {};
    if (Array.isArray(events)) {
      return events.reduce((data, event) => {
        data.keys.push(event.key);
        data.operations.push(event.type);
        data.oldValue[event.key] = event.oldValue;
        data.newValue[event.key] = event.newValue;
        return data;
      }, {
        oldValue: {},
        keys: [],
        operations: [],
        newValue: {}
      });
    } else {
      return {
        operation: formatDisplay(events.type),
        key: formatDisplay(events.key),
        oldValue: events.oldValue,
        newValue: events.newValue
      };
    }
  }
  function formatMutationType(type) {
    switch (type) {
      case MutationType.direct:
        return "mutation";
      case MutationType.patchFunction:
        return "$patch";
      case MutationType.patchObject:
        return "$patch";
      default:
        return "unknown";
    }
  }
  let isTimelineActive = true;
  const componentStateTypes = [];
  const MUTATIONS_LAYER_ID = "pinia:mutations";
  const INSPECTOR_ID = "pinia";
  const { assign: assign$1 } = Object;
  const getStoreType = (id) => "🍍 " + id;
  function registerPiniaDevtools(app, pinia) {
    setupDevtoolsPlugin({
      id: "dev.esm.pinia",
      label: "Pinia 🍍",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes,
      app
    }, (api) => {
      if (typeof api.now !== "function") {
        toastMessage("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html.");
      }
      api.addTimelineLayer({
        id: MUTATIONS_LAYER_ID,
        label: `Pinia 🍍`,
        color: 15064968
      });
      api.addInspector({
        id: INSPECTOR_ID,
        label: "Pinia 🍍",
        icon: "storage",
        treeFilterPlaceholder: "Search stores",
        actions: [
          {
            icon: "content_copy",
            action: () => {
              actionGlobalCopyState(pinia);
            },
            tooltip: "Serialize and copy the state"
          },
          {
            icon: "content_paste",
            action: async () => {
              await actionGlobalPasteState(pinia);
              api.sendInspectorTree(INSPECTOR_ID);
              api.sendInspectorState(INSPECTOR_ID);
            },
            tooltip: "Replace the state with the content of your clipboard"
          },
          {
            icon: "save",
            action: () => {
              actionGlobalSaveState(pinia);
            },
            tooltip: "Save the state as a JSON file"
          },
          {
            icon: "folder_open",
            action: async () => {
              await actionGlobalOpenStateFile(pinia);
              api.sendInspectorTree(INSPECTOR_ID);
              api.sendInspectorState(INSPECTOR_ID);
            },
            tooltip: "Import the state from a JSON file"
          }
        ],
        nodeActions: [
          {
            icon: "restore",
            tooltip: 'Reset the state (with "$reset")',
            action: (nodeId) => {
              const store = pinia._s.get(nodeId);
              if (!store) {
                toastMessage(`Cannot reset "${nodeId}" store because it wasn't found.`, "warn");
              } else if (typeof store.$reset !== "function") {
                toastMessage(`Cannot reset "${nodeId}" store because it doesn't have a "$reset" method implemented.`, "warn");
              } else {
                store.$reset();
                toastMessage(`Store "${nodeId}" reset.`);
              }
            }
          }
        ]
      });
      api.on.inspectComponent((payload, ctx) => {
        const proxy = payload.componentInstance && payload.componentInstance.proxy;
        if (proxy && proxy._pStores) {
          const piniaStores = payload.componentInstance.proxy._pStores;
          Object.values(piniaStores).forEach((store) => {
            payload.instanceData.state.push({
              type: getStoreType(store.$id),
              key: "state",
              editable: true,
              value: store._isOptionsAPI ? {
                _custom: {
                  value: vue.toRaw(store.$state),
                  actions: [
                    {
                      icon: "restore",
                      tooltip: "Reset the state of this store",
                      action: () => store.$reset()
                    }
                  ]
                }
              } : (
                // NOTE: workaround to unwrap transferred refs
                Object.keys(store.$state).reduce((state, key) => {
                  state[key] = store.$state[key];
                  return state;
                }, {})
              )
            });
            if (store._getters && store._getters.length) {
              payload.instanceData.state.push({
                type: getStoreType(store.$id),
                key: "getters",
                editable: false,
                value: store._getters.reduce((getters, key) => {
                  try {
                    getters[key] = store[key];
                  } catch (error) {
                    getters[key] = error;
                  }
                  return getters;
                }, {})
              });
            }
          });
        }
      });
      api.on.getInspectorTree((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          let stores = [pinia];
          stores = stores.concat(Array.from(pinia._s.values()));
          payload.rootNodes = (payload.filter ? stores.filter((store) => "$id" in store ? store.$id.toLowerCase().includes(payload.filter.toLowerCase()) : PINIA_ROOT_LABEL.toLowerCase().includes(payload.filter.toLowerCase())) : stores).map(formatStoreForInspectorTree);
        }
      });
      api.on.getInspectorState((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
          if (!inspectedStore) {
            return;
          }
          if (inspectedStore) {
            payload.state = formatStoreForInspectorState(inspectedStore);
          }
        }
      });
      api.on.editInspectorState((payload, ctx) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
          if (!inspectedStore) {
            return toastMessage(`store "${payload.nodeId}" not found`, "error");
          }
          const { path } = payload;
          if (!isPinia(inspectedStore)) {
            if (path.length !== 1 || !inspectedStore._customProperties.has(path[0]) || path[0] in inspectedStore.$state) {
              path.unshift("$state");
            }
          } else {
            path.unshift("state");
          }
          isTimelineActive = false;
          payload.set(inspectedStore, path, payload.state.value);
          isTimelineActive = true;
        }
      });
      api.on.editComponentState((payload) => {
        if (payload.type.startsWith("🍍")) {
          const storeId = payload.type.replace(/^🍍\s*/, "");
          const store = pinia._s.get(storeId);
          if (!store) {
            return toastMessage(`store "${storeId}" not found`, "error");
          }
          const { path } = payload;
          if (path[0] !== "state") {
            return toastMessage(`Invalid path for store "${storeId}":
${path}
Only state can be modified.`);
          }
          path[0] = "$state";
          isTimelineActive = false;
          payload.set(store, path, payload.state.value);
          isTimelineActive = true;
        }
      });
    });
  }
  function addStoreToDevtools(app, store) {
    if (!componentStateTypes.includes(getStoreType(store.$id))) {
      componentStateTypes.push(getStoreType(store.$id));
    }
    setupDevtoolsPlugin({
      id: "dev.esm.pinia",
      label: "Pinia 🍍",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes,
      app,
      settings: {
        logStoreChanges: {
          label: "Notify about new/deleted stores",
          type: "boolean",
          defaultValue: true
        }
        // useEmojis: {
        //   label: 'Use emojis in messages ⚡️',
        //   type: 'boolean',
        //   defaultValue: true,
        // },
      }
    }, (api) => {
      const now2 = typeof api.now === "function" ? api.now.bind(api) : Date.now;
      store.$onAction(({ after, onError, name, args }) => {
        const groupId = runningActionId++;
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            title: "🛫 " + name,
            subtitle: "start",
            data: {
              store: formatDisplay(store.$id),
              action: formatDisplay(name),
              args
            },
            groupId
          }
        });
        after((result) => {
          activeAction = void 0;
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now2(),
              title: "🛬 " + name,
              subtitle: "end",
              data: {
                store: formatDisplay(store.$id),
                action: formatDisplay(name),
                args,
                result
              },
              groupId
            }
          });
        });
        onError((error) => {
          activeAction = void 0;
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now2(),
              logType: "error",
              title: "💥 " + name,
              subtitle: "end",
              data: {
                store: formatDisplay(store.$id),
                action: formatDisplay(name),
                args,
                error
              },
              groupId
            }
          });
        });
      }, true);
      store._customProperties.forEach((name) => {
        vue.watch(() => vue.unref(store[name]), (newValue, oldValue) => {
          api.notifyComponentUpdate();
          api.sendInspectorState(INSPECTOR_ID);
          if (isTimelineActive) {
            api.addTimelineEvent({
              layerId: MUTATIONS_LAYER_ID,
              event: {
                time: now2(),
                title: "Change",
                subtitle: name,
                data: {
                  newValue,
                  oldValue
                },
                groupId: activeAction
              }
            });
          }
        }, { deep: true });
      });
      store.$subscribe(({ events, type }, state) => {
        api.notifyComponentUpdate();
        api.sendInspectorState(INSPECTOR_ID);
        if (!isTimelineActive)
          return;
        const eventData = {
          time: now2(),
          title: formatMutationType(type),
          data: assign$1({ store: formatDisplay(store.$id) }, formatEventData(events)),
          groupId: activeAction
        };
        if (type === MutationType.patchFunction) {
          eventData.subtitle = "⤵️";
        } else if (type === MutationType.patchObject) {
          eventData.subtitle = "🧩";
        } else if (events && !Array.isArray(events)) {
          eventData.subtitle = events.type;
        }
        if (events) {
          eventData.data["rawEvent(s)"] = {
            _custom: {
              display: "DebuggerEvent",
              type: "object",
              tooltip: "raw DebuggerEvent[]",
              value: events
            }
          };
        }
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: eventData
        });
      }, { detached: true, flush: "sync" });
      const hotUpdate = store._hotUpdate;
      store._hotUpdate = vue.markRaw((newStore) => {
        hotUpdate(newStore);
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            title: "🔥 " + store.$id,
            subtitle: "HMR update",
            data: {
              store: formatDisplay(store.$id),
              info: formatDisplay(`HMR update`)
            }
          }
        });
        api.notifyComponentUpdate();
        api.sendInspectorTree(INSPECTOR_ID);
        api.sendInspectorState(INSPECTOR_ID);
      });
      const { $dispose } = store;
      store.$dispose = () => {
        $dispose();
        api.notifyComponentUpdate();
        api.sendInspectorTree(INSPECTOR_ID);
        api.sendInspectorState(INSPECTOR_ID);
        api.getSettings().logStoreChanges && toastMessage(`Disposed "${store.$id}" store 🗑`);
      };
      api.notifyComponentUpdate();
      api.sendInspectorTree(INSPECTOR_ID);
      api.sendInspectorState(INSPECTOR_ID);
      api.getSettings().logStoreChanges && toastMessage(`"${store.$id}" store installed 🆕`);
    });
  }
  let runningActionId = 0;
  let activeAction;
  function patchActionForGrouping(store, actionNames, wrapWithProxy) {
    const actions = actionNames.reduce((storeActions, actionName) => {
      storeActions[actionName] = vue.toRaw(store)[actionName];
      return storeActions;
    }, {});
    for (const actionName in actions) {
      store[actionName] = function() {
        const _actionId = runningActionId;
        const trackedStore = wrapWithProxy ? new Proxy(store, {
          get(...args) {
            activeAction = _actionId;
            return Reflect.get(...args);
          },
          set(...args) {
            activeAction = _actionId;
            return Reflect.set(...args);
          }
        }) : store;
        activeAction = _actionId;
        const retValue = actions[actionName].apply(trackedStore, arguments);
        activeAction = void 0;
        return retValue;
      };
    }
  }
  function devtoolsPlugin({ app, store, options }) {
    if (store.$id.startsWith("__hot:")) {
      return;
    }
    store._isOptionsAPI = !!options.state;
    patchActionForGrouping(store, Object.keys(options.actions), store._isOptionsAPI);
    const originalHotUpdate = store._hotUpdate;
    vue.toRaw(store)._hotUpdate = function(newStore) {
      originalHotUpdate.apply(this, arguments);
      patchActionForGrouping(store, Object.keys(newStore._hmrPayload.actions), !!store._isOptionsAPI);
    };
    addStoreToDevtools(
      app,
      // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
      store
    );
  }
  function createPinia() {
    const scope = vue.effectScope(true);
    const state = scope.run(() => vue.ref({}));
    let _p = [];
    let toBeInstalled = [];
    const pinia = vue.markRaw({
      install(app) {
        setActivePinia(pinia);
        {
          pinia._a = app;
          app.provide(piniaSymbol, pinia);
          app.config.globalProperties.$pinia = pinia;
          if (USE_DEVTOOLS) {
            registerPiniaDevtools(app, pinia);
          }
          toBeInstalled.forEach((plugin) => _p.push(plugin));
          toBeInstalled = [];
        }
      },
      use(plugin) {
        if (!this._a && !isVue2) {
          toBeInstalled.push(plugin);
        } else {
          _p.push(plugin);
        }
        return this;
      },
      _p,
      // it's actually undefined here
      // @ts-expect-error
      _a: null,
      _e: scope,
      _s: /* @__PURE__ */ new Map(),
      state
    });
    if (USE_DEVTOOLS && typeof Proxy !== "undefined") {
      pinia.use(devtoolsPlugin);
    }
    return pinia;
  }
  const isUseStore = (fn) => {
    return typeof fn === "function" && typeof fn.$id === "string";
  };
  function patchObject(newState, oldState) {
    for (const key in oldState) {
      const subPatch = oldState[key];
      if (!(key in newState)) {
        continue;
      }
      const targetValue = newState[key];
      if (isPlainObject(targetValue) && isPlainObject(subPatch) && !vue.isRef(subPatch) && !vue.isReactive(subPatch)) {
        newState[key] = patchObject(targetValue, subPatch);
      } else {
        {
          newState[key] = subPatch;
        }
      }
    }
    return newState;
  }
  function acceptHMRUpdate(initialUseStore, hot) {
    return (newModule) => {
      const pinia = hot.data.pinia || initialUseStore._pinia;
      if (!pinia) {
        return;
      }
      hot.data.pinia = pinia;
      for (const exportName in newModule) {
        const useStore = newModule[exportName];
        if (isUseStore(useStore) && pinia._s.has(useStore.$id)) {
          const id = useStore.$id;
          if (id !== initialUseStore.$id) {
            console.warn(`The id of the store changed from "${initialUseStore.$id}" to "${id}". Reloading.`);
            return hot.invalidate();
          }
          const existingStore = pinia._s.get(id);
          if (!existingStore) {
            console.log(`[Pinia]: skipping hmr because store doesn't exist yet`);
            return;
          }
          useStore(pinia, existingStore);
        }
      }
    };
  }
  const noop = () => {
  };
  function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
    subscriptions.push(callback);
    const removeSubscription = () => {
      const idx = subscriptions.indexOf(callback);
      if (idx > -1) {
        subscriptions.splice(idx, 1);
        onCleanup();
      }
    };
    if (!detached && vue.getCurrentScope()) {
      vue.onScopeDispose(removeSubscription);
    }
    return removeSubscription;
  }
  function triggerSubscriptions(subscriptions, ...args) {
    subscriptions.slice().forEach((callback) => {
      callback(...args);
    });
  }
  const fallbackRunWithContext = (fn) => fn();
  function mergeReactiveObjects(target, patchToApply) {
    if (target instanceof Map && patchToApply instanceof Map) {
      patchToApply.forEach((value, key) => target.set(key, value));
    }
    if (target instanceof Set && patchToApply instanceof Set) {
      patchToApply.forEach(target.add, target);
    }
    for (const key in patchToApply) {
      if (!patchToApply.hasOwnProperty(key))
        continue;
      const subPatch = patchToApply[key];
      const targetValue = target[key];
      if (isPlainObject(targetValue) && isPlainObject(subPatch) && target.hasOwnProperty(key) && !vue.isRef(subPatch) && !vue.isReactive(subPatch)) {
        target[key] = mergeReactiveObjects(targetValue, subPatch);
      } else {
        target[key] = subPatch;
      }
    }
    return target;
  }
  const skipHydrateSymbol = Symbol("pinia:skipHydration");
  function skipHydrate(obj) {
    return Object.defineProperty(obj, skipHydrateSymbol, {});
  }
  function shouldHydrate(obj) {
    return !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
  }
  const { assign } = Object;
  function isComputed(o) {
    return !!(vue.isRef(o) && o.effect);
  }
  function createOptionsStore(id, options, pinia, hot) {
    const { state, actions, getters } = options;
    const initialState = pinia.state.value[id];
    let store;
    function setup() {
      if (!initialState && !hot) {
        {
          pinia.state.value[id] = state ? state() : {};
        }
      }
      const localState = hot ? (
        // use ref() to unwrap refs inside state TODO: check if this is still necessary
        vue.toRefs(vue.ref(state ? state() : {}).value)
      ) : vue.toRefs(pinia.state.value[id]);
      return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
        if (name in localState) {
          console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${name}" in store "${id}".`);
        }
        computedGetters[name] = vue.markRaw(vue.computed(() => {
          setActivePinia(pinia);
          const store2 = pinia._s.get(id);
          return getters[name].call(store2, store2);
        }));
        return computedGetters;
      }, {}));
    }
    store = createSetupStore(id, setup, options, pinia, hot, true);
    return store;
  }
  function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
    let scope;
    const optionsForPlugin = assign({ actions: {} }, options);
    if (!pinia._e.active) {
      throw new Error("Pinia destroyed");
    }
    const $subscribeOptions = {
      deep: true
      // flush: 'post',
    };
    {
      $subscribeOptions.onTrigger = (event) => {
        if (isListening) {
          debuggerEvents = event;
        } else if (isListening == false && !store._hotUpdating) {
          if (Array.isArray(debuggerEvents)) {
            debuggerEvents.push(event);
          } else {
            console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug.");
          }
        }
      };
    }
    let isListening;
    let isSyncListening;
    let subscriptions = [];
    let actionSubscriptions = [];
    let debuggerEvents;
    const initialState = pinia.state.value[$id];
    if (!isOptionsStore && !initialState && !hot) {
      {
        pinia.state.value[$id] = {};
      }
    }
    const hotState = vue.ref({});
    let activeListener;
    function $patch(partialStateOrMutator) {
      let subscriptionMutation;
      isListening = isSyncListening = false;
      {
        debuggerEvents = [];
      }
      if (typeof partialStateOrMutator === "function") {
        partialStateOrMutator(pinia.state.value[$id]);
        subscriptionMutation = {
          type: MutationType.patchFunction,
          storeId: $id,
          events: debuggerEvents
        };
      } else {
        mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
        subscriptionMutation = {
          type: MutationType.patchObject,
          payload: partialStateOrMutator,
          storeId: $id,
          events: debuggerEvents
        };
      }
      const myListenerId = activeListener = Symbol();
      vue.nextTick().then(() => {
        if (activeListener === myListenerId) {
          isListening = true;
        }
      });
      isSyncListening = true;
      triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
    }
    const $reset = isOptionsStore ? function $reset2() {
      const { state } = options;
      const newState = state ? state() : {};
      this.$patch(($state) => {
        assign($state, newState);
      });
    } : (
      /* istanbul ignore next */
      () => {
        throw new Error(`🍍: Store "${$id}" is built using the setup syntax and does not implement $reset().`);
      }
    );
    function $dispose() {
      scope.stop();
      subscriptions = [];
      actionSubscriptions = [];
      pinia._s.delete($id);
    }
    function wrapAction(name, action) {
      return function() {
        setActivePinia(pinia);
        const args = Array.from(arguments);
        const afterCallbackList = [];
        const onErrorCallbackList = [];
        function after(callback) {
          afterCallbackList.push(callback);
        }
        function onError(callback) {
          onErrorCallbackList.push(callback);
        }
        triggerSubscriptions(actionSubscriptions, {
          args,
          name,
          store,
          after,
          onError
        });
        let ret;
        try {
          ret = action.apply(this && this.$id === $id ? this : store, args);
        } catch (error) {
          triggerSubscriptions(onErrorCallbackList, error);
          throw error;
        }
        if (ret instanceof Promise) {
          return ret.then((value) => {
            triggerSubscriptions(afterCallbackList, value);
            return value;
          }).catch((error) => {
            triggerSubscriptions(onErrorCallbackList, error);
            return Promise.reject(error);
          });
        }
        triggerSubscriptions(afterCallbackList, ret);
        return ret;
      };
    }
    const _hmrPayload = /* @__PURE__ */ vue.markRaw({
      actions: {},
      getters: {},
      state: [],
      hotState
    });
    const partialStore = {
      _p: pinia,
      // _s: scope,
      $id,
      $onAction: addSubscription.bind(null, actionSubscriptions),
      $patch,
      $reset,
      $subscribe(callback, options2 = {}) {
        const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
        const stopWatcher = scope.run(() => vue.watch(() => pinia.state.value[$id], (state) => {
          if (options2.flush === "sync" ? isSyncListening : isListening) {
            callback({
              storeId: $id,
              type: MutationType.direct,
              events: debuggerEvents
            }, state);
          }
        }, assign({}, $subscribeOptions, options2)));
        return removeSubscription;
      },
      $dispose
    };
    const store = vue.reactive(assign(
      {
        _hmrPayload,
        _customProperties: vue.markRaw(/* @__PURE__ */ new Set())
        // devtools custom properties
      },
      partialStore
      // must be added later
      // setupStore
    ));
    pinia._s.set($id, store);
    const runWithContext = pinia._a && pinia._a.runWithContext || fallbackRunWithContext;
    const setupStore = runWithContext(() => pinia._e.run(() => (scope = vue.effectScope()).run(setup)));
    for (const key in setupStore) {
      const prop = setupStore[key];
      if (vue.isRef(prop) && !isComputed(prop) || vue.isReactive(prop)) {
        if (hot) {
          set(hotState.value, key, vue.toRef(setupStore, key));
        } else if (!isOptionsStore) {
          if (initialState && shouldHydrate(prop)) {
            if (vue.isRef(prop)) {
              prop.value = initialState[key];
            } else {
              mergeReactiveObjects(prop, initialState[key]);
            }
          }
          {
            pinia.state.value[$id][key] = prop;
          }
        }
        {
          _hmrPayload.state.push(key);
        }
      } else if (typeof prop === "function") {
        const actionValue = hot ? prop : wrapAction(key, prop);
        {
          setupStore[key] = actionValue;
        }
        {
          _hmrPayload.actions[key] = prop;
        }
        optionsForPlugin.actions[key] = prop;
      } else {
        if (isComputed(prop)) {
          _hmrPayload.getters[key] = isOptionsStore ? (
            // @ts-expect-error
            options.getters[key]
          ) : prop;
          if (IS_CLIENT) {
            const getters = setupStore._getters || // @ts-expect-error: same
            (setupStore._getters = vue.markRaw([]));
            getters.push(key);
          }
        }
      }
    }
    {
      assign(store, setupStore);
      assign(vue.toRaw(store), setupStore);
    }
    Object.defineProperty(store, "$state", {
      get: () => hot ? hotState.value : pinia.state.value[$id],
      set: (state) => {
        if (hot) {
          throw new Error("cannot set hotState");
        }
        $patch(($state) => {
          assign($state, state);
        });
      }
    });
    {
      store._hotUpdate = vue.markRaw((newStore) => {
        store._hotUpdating = true;
        newStore._hmrPayload.state.forEach((stateKey) => {
          if (stateKey in store.$state) {
            const newStateTarget = newStore.$state[stateKey];
            const oldStateSource = store.$state[stateKey];
            if (typeof newStateTarget === "object" && isPlainObject(newStateTarget) && isPlainObject(oldStateSource)) {
              patchObject(newStateTarget, oldStateSource);
            } else {
              newStore.$state[stateKey] = oldStateSource;
            }
          }
          set(store, stateKey, vue.toRef(newStore.$state, stateKey));
        });
        Object.keys(store.$state).forEach((stateKey) => {
          if (!(stateKey in newStore.$state)) {
            del(store, stateKey);
          }
        });
        isListening = false;
        isSyncListening = false;
        pinia.state.value[$id] = vue.toRef(newStore._hmrPayload, "hotState");
        isSyncListening = true;
        vue.nextTick().then(() => {
          isListening = true;
        });
        for (const actionName in newStore._hmrPayload.actions) {
          const action = newStore[actionName];
          set(store, actionName, wrapAction(actionName, action));
        }
        for (const getterName in newStore._hmrPayload.getters) {
          const getter = newStore._hmrPayload.getters[getterName];
          const getterValue = isOptionsStore ? (
            // special handling of options api
            vue.computed(() => {
              setActivePinia(pinia);
              return getter.call(store, store);
            })
          ) : getter;
          set(store, getterName, getterValue);
        }
        Object.keys(store._hmrPayload.getters).forEach((key) => {
          if (!(key in newStore._hmrPayload.getters)) {
            del(store, key);
          }
        });
        Object.keys(store._hmrPayload.actions).forEach((key) => {
          if (!(key in newStore._hmrPayload.actions)) {
            del(store, key);
          }
        });
        store._hmrPayload = newStore._hmrPayload;
        store._getters = newStore._getters;
        store._hotUpdating = false;
      });
    }
    if (USE_DEVTOOLS) {
      const nonEnumerable = {
        writable: true,
        configurable: true,
        // avoid warning on devtools trying to display this property
        enumerable: false
      };
      ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((p) => {
        Object.defineProperty(store, p, assign({ value: store[p] }, nonEnumerable));
      });
    }
    pinia._p.forEach((extender) => {
      if (USE_DEVTOOLS) {
        const extensions = scope.run(() => extender({
          store,
          app: pinia._a,
          pinia,
          options: optionsForPlugin
        }));
        Object.keys(extensions || {}).forEach((key) => store._customProperties.add(key));
        assign(store, extensions);
      } else {
        assign(store, scope.run(() => extender({
          store,
          app: pinia._a,
          pinia,
          options: optionsForPlugin
        })));
      }
    });
    if (store.$state && typeof store.$state === "object" && typeof store.$state.constructor === "function" && !store.$state.constructor.toString().includes("[native code]")) {
      console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${store.$id}".`);
    }
    if (initialState && isOptionsStore && options.hydrate) {
      options.hydrate(store.$state, initialState);
    }
    isListening = true;
    isSyncListening = true;
    return store;
  }
  function defineStore(idOrOptions, setup, setupOptions) {
    let id;
    let options;
    const isSetupStore = typeof setup === "function";
    if (typeof idOrOptions === "string") {
      id = idOrOptions;
      options = isSetupStore ? setupOptions : setup;
    } else {
      options = idOrOptions;
      id = idOrOptions.id;
      if (typeof id !== "string") {
        throw new Error(`[🍍]: "defineStore()" must be passed a store id as its first argument.`);
      }
    }
    function useStore(pinia, hot) {
      const hasContext = vue.hasInjectionContext();
      pinia = // in test mode, ignore the argument provided as we can always retrieve a
      // pinia instance with getActivePinia()
      pinia || (hasContext ? vue.inject(piniaSymbol, null) : null);
      if (pinia)
        setActivePinia(pinia);
      if (!activePinia) {
        throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
      }
      pinia = activePinia;
      if (!pinia._s.has(id)) {
        if (isSetupStore) {
          createSetupStore(id, setup, options, pinia);
        } else {
          createOptionsStore(id, options, pinia);
        }
        {
          useStore._pinia = pinia;
        }
      }
      const store = pinia._s.get(id);
      if (hot) {
        const hotId = "__hot:" + id;
        const newStore = isSetupStore ? createSetupStore(hotId, setup, options, pinia, true) : createOptionsStore(hotId, assign({}, options), pinia, true);
        hot._hotUpdate(newStore);
        delete pinia.state.value[hotId];
        pinia._s.delete(hotId);
      }
      if (IS_CLIENT) {
        const currentInstance = vue.getCurrentInstance();
        if (currentInstance && currentInstance.proxy && // avoid adding stores that are just built for hot module replacement
        !hot) {
          const vm = currentInstance.proxy;
          const cache = "_pStores" in vm ? vm._pStores : vm._pStores = {};
          cache[id] = store;
        }
      }
      return store;
    }
    useStore.$id = id;
    return useStore;
  }
  let mapStoreSuffix = "Store";
  function setMapStoreSuffix(suffix) {
    mapStoreSuffix = suffix;
  }
  function mapStores(...stores) {
    if (Array.isArray(stores[0])) {
      console.warn(`[🍍]: Directly pass all stores to "mapStores()" without putting them in an array:
Replace
	mapStores([useAuthStore, useCartStore])
with
	mapStores(useAuthStore, useCartStore)
This will fail in production if not fixed.`);
      stores = stores[0];
    }
    return stores.reduce((reduced, useStore) => {
      reduced[useStore.$id + mapStoreSuffix] = function() {
        return useStore(this.$pinia);
      };
      return reduced;
    }, {});
  }
  function mapState(useStore, keysOrMapper) {
    return Array.isArray(keysOrMapper) ? keysOrMapper.reduce((reduced, key) => {
      reduced[key] = function() {
        return useStore(this.$pinia)[key];
      };
      return reduced;
    }, {}) : Object.keys(keysOrMapper).reduce((reduced, key) => {
      reduced[key] = function() {
        const store = useStore(this.$pinia);
        const storeKey = keysOrMapper[key];
        return typeof storeKey === "function" ? storeKey.call(this, store) : store[storeKey];
      };
      return reduced;
    }, {});
  }
  const mapGetters = mapState;
  function mapActions(useStore, keysOrMapper) {
    return Array.isArray(keysOrMapper) ? keysOrMapper.reduce((reduced, key) => {
      reduced[key] = function(...args) {
        return useStore(this.$pinia)[key](...args);
      };
      return reduced;
    }, {}) : Object.keys(keysOrMapper).reduce((reduced, key) => {
      reduced[key] = function(...args) {
        return useStore(this.$pinia)[keysOrMapper[key]](...args);
      };
      return reduced;
    }, {});
  }
  function mapWritableState(useStore, keysOrMapper) {
    return Array.isArray(keysOrMapper) ? keysOrMapper.reduce((reduced, key) => {
      reduced[key] = {
        get() {
          return useStore(this.$pinia)[key];
        },
        set(value) {
          return useStore(this.$pinia)[key] = value;
        }
      };
      return reduced;
    }, {}) : Object.keys(keysOrMapper).reduce((reduced, key) => {
      reduced[key] = {
        get() {
          return useStore(this.$pinia)[keysOrMapper[key]];
        },
        set(value) {
          return useStore(this.$pinia)[keysOrMapper[key]] = value;
        }
      };
      return reduced;
    }, {});
  }
  function storeToRefs(store) {
    {
      store = vue.toRaw(store);
      const refs = {};
      for (const key in store) {
        const value = store[key];
        if (vue.isRef(value) || vue.isReactive(value)) {
          refs[key] = // ---
          vue.toRef(store, key);
        }
      }
      return refs;
    }
  }
  const PiniaVuePlugin = function(_Vue) {
    _Vue.mixin({
      beforeCreate() {
        const options = this.$options;
        if (options.pinia) {
          const pinia = options.pinia;
          if (!this._provided) {
            const provideCache = {};
            Object.defineProperty(this, "_provided", {
              get: () => provideCache,
              set: (v) => Object.assign(provideCache, v)
            });
          }
          this._provided[piniaSymbol] = pinia;
          if (!this.$pinia) {
            this.$pinia = pinia;
          }
          pinia._a = this;
          if (IS_CLIENT) {
            setActivePinia(pinia);
          }
          if (USE_DEVTOOLS) {
            registerPiniaDevtools(pinia._a, pinia);
          }
        } else if (!this.$pinia && options.parent && options.parent.$pinia) {
          this.$pinia = options.parent.$pinia;
        }
      },
      destroyed() {
        delete this._pStores;
      }
    });
  };
  const Pinia = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    get MutationType() {
      return MutationType;
    },
    PiniaVuePlugin,
    acceptHMRUpdate,
    createPinia,
    defineStore,
    getActivePinia,
    mapActions,
    mapGetters,
    mapState,
    mapStores,
    mapWritableState,
    setActivePinia,
    setMapStoreSuffix,
    skipHydrate,
    storeToRefs
  }, Symbol.toStringTag, { value: "Module" }));
  const useAddressStore = defineStore("address", {
    state: () => {
      return { address: null };
    },
    // 也可以这样定义
    // state: () => ({ count: 0 })
    actions: {
      clearAddress() {
        this.address = null;
      }
    }
  });
  const _sfc_main$b = {
    __name: "address",
    setup(__props, { expose: __expose }) {
      __expose();
      const addressStore = useAddressStore();
      const FromEnum = {
        SECKILL: 1,
        MINE: 2
      };
      let from = vue.reactive(FromEnum.MINE);
      onLoad((option) => {
        uni.$on("address-edit", (params) => {
          formatAppLog("log", "at pages/address/address.vue:44", params);
        });
        if (option.from == "seckill") {
          from = FromEnum.SECKILL;
        }
      });
      let options = vue.ref([
        {
          text: "编辑",
          style: {
            backgroundColor: "#007aff"
          }
        },
        {
          text: "删除",
          style: {
            backgroundColor: "#F56C6C"
          }
        }
      ]);
      const onOptionsClick = (e) => {
        formatAppLog("log", "at pages/address/address.vue:69", e);
        if (e.index == 0) {
          addressStore.address = {
            id: "1",
            realname: "wangwu",
            telephone: "199999999",
            region: "广东省广州市番禺区",
            detail: "荣耀大厦"
          };
          uni.navigateTo({
            url: "/pages/address-edit/address-edit"
          });
        }
      };
      const onAddressClick = (index) => {
        formatAppLog("log", "at pages/address/address.vue:88", index);
        if (from == FromEnum.SECKILL) {
          const address = {
            realname: "zhangsan",
            telephone: "1999999999",
            region: "北京市朝阳区",
            detail: "白家庄"
          };
          uni.$emit("choose-address", { "address": address });
          uni.navigateBack();
        }
      };
      const onAddAddressClick = () => {
        formatAppLog("log", "at pages/address/address.vue:104", "点击了添加地址");
        addressStore.clearAddress();
        uni.navigateTo({
          url: "/pages/address-edit/address-edit"
        });
      };
      const __returned__ = { addressStore, FromEnum, get from() {
        return from;
      }, set from(v) {
        from = v;
      }, get options() {
        return options;
      }, set options(v) {
        options = v;
      }, onOptionsClick, onAddressClick, onAddAddressClick, reactive: vue.reactive, ref: vue.ref, get onLoad() {
        return onLoad;
      }, get userAddressStore() {
        return useAddressStore;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_swipe_action_item = resolveEasycom(vue.resolveDynamicComponent("uni-swipe-action-item"), __easycom_0$1);
    const _component_uni_swipe_action = resolveEasycom(vue.resolveDynamicComponent("uni-swipe-action"), __easycom_1$1);
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_3);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createVNode(_component_uni_swipe_action, null, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_uni_swipe_action_item, {
            "right-options": $setup.options,
            onClick: $setup.onOptionsClick
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", {
                class: "bg-white px-2 py-2 border-bottom",
                onClick: _cache[0] || (_cache[0] = ($event) => $setup.onAddressClick(1))
              }, [
                vue.createElementVNode("view", { class: "font text-dark" }, [
                  vue.createElementVNode("text", null, "张三"),
                  vue.createElementVNode("text", { class: "ml-2" }, "1999999999")
                ]),
                vue.createElementVNode("view", { class: "font-sm text-grey mt-2" }, " 北京市朝阳区白家庄东里19栋 ")
              ])
            ]),
            _: 1
            /* STABLE */
          }, 8, ["right-options"])
        ]),
        _: 1
        /* STABLE */
      }),
      vue.createElementVNode("view", { class: "mt-2 text-center" }, [
        vue.createElementVNode("button", {
          onClick: $setup.onAddAddressClick,
          type: "warn",
          plain: "",
          size: "mini"
        }, [
          vue.createVNode(_component_uni_icons, {
            type: "plusempty",
            color: "warn"
          }),
          vue.createTextVNode("添加地址")
        ])
      ])
    ]);
  }
  const PagesAddressAddress = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$a], ["__file", "D:/project/uni-app/leoh-seckill-shop/pages/address/address.vue"]]);
  var provinceData = [
    {
      "label": "北京市",
      "value": "11"
    },
    {
      "label": "天津市",
      "value": "12"
    },
    {
      "label": "河北省",
      "value": "13"
    },
    {
      "label": "山西省",
      "value": "14"
    },
    {
      "label": "内蒙古自治区",
      "value": "15"
    },
    {
      "label": "辽宁省",
      "value": "21"
    },
    {
      "label": "吉林省",
      "value": "22"
    },
    {
      "label": "黑龙江省",
      "value": "23"
    },
    {
      "label": "上海市",
      "value": "31"
    },
    {
      "label": "江苏省",
      "value": "32"
    },
    {
      "label": "浙江省",
      "value": "33"
    },
    {
      "label": "安徽省",
      "value": "34"
    },
    {
      "label": "福建省",
      "value": "35"
    },
    {
      "label": "江西省",
      "value": "36"
    },
    {
      "label": "山东省",
      "value": "37"
    },
    {
      "label": "河南省",
      "value": "41"
    },
    {
      "label": "湖北省",
      "value": "42"
    },
    {
      "label": "湖南省",
      "value": "43"
    },
    {
      "label": "广东省",
      "value": "44"
    },
    {
      "label": "广西壮族自治区",
      "value": "45"
    },
    {
      "label": "海南省",
      "value": "46"
    },
    {
      "label": "重庆市",
      "value": "50"
    },
    {
      "label": "四川省",
      "value": "51"
    },
    {
      "label": "贵州省",
      "value": "52"
    },
    {
      "label": "云南省",
      "value": "53"
    },
    {
      "label": "西藏自治区",
      "value": "54"
    },
    {
      "label": "陕西省",
      "value": "61"
    },
    {
      "label": "甘肃省",
      "value": "62"
    },
    {
      "label": "青海省",
      "value": "63"
    },
    {
      "label": "宁夏回族自治区",
      "value": "64"
    },
    {
      "label": "新疆维吾尔自治区",
      "value": "65"
    },
    {
      "label": "台湾",
      "value": "66"
    },
    {
      "label": "香港",
      "value": "67"
    },
    {
      "label": "澳门",
      "value": "68"
    }
  ];
  var cityData = [
    [{
      "label": "市辖区",
      "value": "1101"
    }],
    [{
      "label": "市辖区",
      "value": "1201"
    }],
    [
      {
        "label": "石家庄市",
        "value": "1301"
      },
      {
        "label": "唐山市",
        "value": "1302"
      },
      {
        "label": "秦皇岛市",
        "value": "1303"
      },
      {
        "label": "邯郸市",
        "value": "1304"
      },
      {
        "label": "邢台市",
        "value": "1305"
      },
      {
        "label": "保定市",
        "value": "1306"
      },
      {
        "label": "张家口市",
        "value": "1307"
      },
      {
        "label": "承德市",
        "value": "1308"
      },
      {
        "label": "沧州市",
        "value": "1309"
      },
      {
        "label": "廊坊市",
        "value": "1310"
      },
      {
        "label": "衡水市",
        "value": "1311"
      }
    ],
    [
      {
        "label": "太原市",
        "value": "1401"
      },
      {
        "label": "大同市",
        "value": "1402"
      },
      {
        "label": "阳泉市",
        "value": "1403"
      },
      {
        "label": "长治市",
        "value": "1404"
      },
      {
        "label": "晋城市",
        "value": "1405"
      },
      {
        "label": "朔州市",
        "value": "1406"
      },
      {
        "label": "晋中市",
        "value": "1407"
      },
      {
        "label": "运城市",
        "value": "1408"
      },
      {
        "label": "忻州市",
        "value": "1409"
      },
      {
        "label": "临汾市",
        "value": "1410"
      },
      {
        "label": "吕梁市",
        "value": "1411"
      }
    ],
    [
      {
        "label": "呼和浩特市",
        "value": "1501"
      },
      {
        "label": "包头市",
        "value": "1502"
      },
      {
        "label": "乌海市",
        "value": "1503"
      },
      {
        "label": "赤峰市",
        "value": "1504"
      },
      {
        "label": "通辽市",
        "value": "1505"
      },
      {
        "label": "鄂尔多斯市",
        "value": "1506"
      },
      {
        "label": "呼伦贝尔市",
        "value": "1507"
      },
      {
        "label": "巴彦淖尔市",
        "value": "1508"
      },
      {
        "label": "乌兰察布市",
        "value": "1509"
      },
      {
        "label": "兴安盟",
        "value": "1522"
      },
      {
        "label": "锡林郭勒盟",
        "value": "1525"
      },
      {
        "label": "阿拉善盟",
        "value": "1529"
      }
    ],
    [
      {
        "label": "沈阳市",
        "value": "2101"
      },
      {
        "label": "大连市",
        "value": "2102"
      },
      {
        "label": "鞍山市",
        "value": "2103"
      },
      {
        "label": "抚顺市",
        "value": "2104"
      },
      {
        "label": "本溪市",
        "value": "2105"
      },
      {
        "label": "丹东市",
        "value": "2106"
      },
      {
        "label": "锦州市",
        "value": "2107"
      },
      {
        "label": "营口市",
        "value": "2108"
      },
      {
        "label": "阜新市",
        "value": "2109"
      },
      {
        "label": "辽阳市",
        "value": "2110"
      },
      {
        "label": "盘锦市",
        "value": "2111"
      },
      {
        "label": "铁岭市",
        "value": "2112"
      },
      {
        "label": "朝阳市",
        "value": "2113"
      },
      {
        "label": "葫芦岛市",
        "value": "2114"
      }
    ],
    [
      {
        "label": "长春市",
        "value": "2201"
      },
      {
        "label": "吉林市",
        "value": "2202"
      },
      {
        "label": "四平市",
        "value": "2203"
      },
      {
        "label": "辽源市",
        "value": "2204"
      },
      {
        "label": "通化市",
        "value": "2205"
      },
      {
        "label": "白山市",
        "value": "2206"
      },
      {
        "label": "松原市",
        "value": "2207"
      },
      {
        "label": "白城市",
        "value": "2208"
      },
      {
        "label": "延边朝鲜族自治州",
        "value": "2224"
      }
    ],
    [
      {
        "label": "哈尔滨市",
        "value": "2301"
      },
      {
        "label": "齐齐哈尔市",
        "value": "2302"
      },
      {
        "label": "鸡西市",
        "value": "2303"
      },
      {
        "label": "鹤岗市",
        "value": "2304"
      },
      {
        "label": "双鸭山市",
        "value": "2305"
      },
      {
        "label": "大庆市",
        "value": "2306"
      },
      {
        "label": "伊春市",
        "value": "2307"
      },
      {
        "label": "佳木斯市",
        "value": "2308"
      },
      {
        "label": "七台河市",
        "value": "2309"
      },
      {
        "label": "牡丹江市",
        "value": "2310"
      },
      {
        "label": "黑河市",
        "value": "2311"
      },
      {
        "label": "绥化市",
        "value": "2312"
      },
      {
        "label": "大兴安岭地区",
        "value": "2327"
      }
    ],
    [{
      "label": "市辖区",
      "value": "3101"
    }],
    [
      {
        "label": "南京市",
        "value": "3201"
      },
      {
        "label": "无锡市",
        "value": "3202"
      },
      {
        "label": "徐州市",
        "value": "3203"
      },
      {
        "label": "常州市",
        "value": "3204"
      },
      {
        "label": "苏州市",
        "value": "3205"
      },
      {
        "label": "南通市",
        "value": "3206"
      },
      {
        "label": "连云港市",
        "value": "3207"
      },
      {
        "label": "淮安市",
        "value": "3208"
      },
      {
        "label": "盐城市",
        "value": "3209"
      },
      {
        "label": "扬州市",
        "value": "3210"
      },
      {
        "label": "镇江市",
        "value": "3211"
      },
      {
        "label": "泰州市",
        "value": "3212"
      },
      {
        "label": "宿迁市",
        "value": "3213"
      }
    ],
    [
      {
        "label": "杭州市",
        "value": "3301"
      },
      {
        "label": "宁波市",
        "value": "3302"
      },
      {
        "label": "温州市",
        "value": "3303"
      },
      {
        "label": "嘉兴市",
        "value": "3304"
      },
      {
        "label": "湖州市",
        "value": "3305"
      },
      {
        "label": "绍兴市",
        "value": "3306"
      },
      {
        "label": "金华市",
        "value": "3307"
      },
      {
        "label": "衢州市",
        "value": "3308"
      },
      {
        "label": "舟山市",
        "value": "3309"
      },
      {
        "label": "台州市",
        "value": "3310"
      },
      {
        "label": "丽水市",
        "value": "3311"
      }
    ],
    [
      {
        "label": "合肥市",
        "value": "3401"
      },
      {
        "label": "芜湖市",
        "value": "3402"
      },
      {
        "label": "蚌埠市",
        "value": "3403"
      },
      {
        "label": "淮南市",
        "value": "3404"
      },
      {
        "label": "马鞍山市",
        "value": "3405"
      },
      {
        "label": "淮北市",
        "value": "3406"
      },
      {
        "label": "铜陵市",
        "value": "3407"
      },
      {
        "label": "安庆市",
        "value": "3408"
      },
      {
        "label": "黄山市",
        "value": "3410"
      },
      {
        "label": "滁州市",
        "value": "3411"
      },
      {
        "label": "阜阳市",
        "value": "3412"
      },
      {
        "label": "宿州市",
        "value": "3413"
      },
      {
        "label": "六安市",
        "value": "3415"
      },
      {
        "label": "亳州市",
        "value": "3416"
      },
      {
        "label": "池州市",
        "value": "3417"
      },
      {
        "label": "宣城市",
        "value": "3418"
      }
    ],
    [
      {
        "label": "福州市",
        "value": "3501"
      },
      {
        "label": "厦门市",
        "value": "3502"
      },
      {
        "label": "莆田市",
        "value": "3503"
      },
      {
        "label": "三明市",
        "value": "3504"
      },
      {
        "label": "泉州市",
        "value": "3505"
      },
      {
        "label": "漳州市",
        "value": "3506"
      },
      {
        "label": "南平市",
        "value": "3507"
      },
      {
        "label": "龙岩市",
        "value": "3508"
      },
      {
        "label": "宁德市",
        "value": "3509"
      }
    ],
    [
      {
        "label": "南昌市",
        "value": "3601"
      },
      {
        "label": "景德镇市",
        "value": "3602"
      },
      {
        "label": "萍乡市",
        "value": "3603"
      },
      {
        "label": "九江市",
        "value": "3604"
      },
      {
        "label": "新余市",
        "value": "3605"
      },
      {
        "label": "鹰潭市",
        "value": "3606"
      },
      {
        "label": "赣州市",
        "value": "3607"
      },
      {
        "label": "吉安市",
        "value": "3608"
      },
      {
        "label": "宜春市",
        "value": "3609"
      },
      {
        "label": "抚州市",
        "value": "3610"
      },
      {
        "label": "上饶市",
        "value": "3611"
      }
    ],
    [
      {
        "label": "济南市",
        "value": "3701"
      },
      {
        "label": "青岛市",
        "value": "3702"
      },
      {
        "label": "淄博市",
        "value": "3703"
      },
      {
        "label": "枣庄市",
        "value": "3704"
      },
      {
        "label": "东营市",
        "value": "3705"
      },
      {
        "label": "烟台市",
        "value": "3706"
      },
      {
        "label": "潍坊市",
        "value": "3707"
      },
      {
        "label": "济宁市",
        "value": "3708"
      },
      {
        "label": "泰安市",
        "value": "3709"
      },
      {
        "label": "威海市",
        "value": "3710"
      },
      {
        "label": "日照市",
        "value": "3711"
      },
      {
        "label": "莱芜市",
        "value": "3712"
      },
      {
        "label": "临沂市",
        "value": "3713"
      },
      {
        "label": "德州市",
        "value": "3714"
      },
      {
        "label": "聊城市",
        "value": "3715"
      },
      {
        "label": "滨州市",
        "value": "3716"
      },
      {
        "label": "菏泽市",
        "value": "3717"
      }
    ],
    [
      {
        "label": "郑州市",
        "value": "4101"
      },
      {
        "label": "开封市",
        "value": "4102"
      },
      {
        "label": "洛阳市",
        "value": "4103"
      },
      {
        "label": "平顶山市",
        "value": "4104"
      },
      {
        "label": "安阳市",
        "value": "4105"
      },
      {
        "label": "鹤壁市",
        "value": "4106"
      },
      {
        "label": "新乡市",
        "value": "4107"
      },
      {
        "label": "焦作市",
        "value": "4108"
      },
      {
        "label": "濮阳市",
        "value": "4109"
      },
      {
        "label": "许昌市",
        "value": "4110"
      },
      {
        "label": "漯河市",
        "value": "4111"
      },
      {
        "label": "三门峡市",
        "value": "4112"
      },
      {
        "label": "南阳市",
        "value": "4113"
      },
      {
        "label": "商丘市",
        "value": "4114"
      },
      {
        "label": "信阳市",
        "value": "4115"
      },
      {
        "label": "周口市",
        "value": "4116"
      },
      {
        "label": "驻马店市",
        "value": "4117"
      },
      {
        "label": "省直辖县级行政区划",
        "value": "4190"
      }
    ],
    [
      {
        "label": "武汉市",
        "value": "4201"
      },
      {
        "label": "黄石市",
        "value": "4202"
      },
      {
        "label": "十堰市",
        "value": "4203"
      },
      {
        "label": "宜昌市",
        "value": "4205"
      },
      {
        "label": "襄阳市",
        "value": "4206"
      },
      {
        "label": "鄂州市",
        "value": "4207"
      },
      {
        "label": "荆门市",
        "value": "4208"
      },
      {
        "label": "孝感市",
        "value": "4209"
      },
      {
        "label": "荆州市",
        "value": "4210"
      },
      {
        "label": "黄冈市",
        "value": "4211"
      },
      {
        "label": "咸宁市",
        "value": "4212"
      },
      {
        "label": "随州市",
        "value": "4213"
      },
      {
        "label": "恩施土家族苗族自治州",
        "value": "4228"
      },
      {
        "label": "省直辖县级行政区划",
        "value": "4290"
      }
    ],
    [
      {
        "label": "长沙市",
        "value": "4301"
      },
      {
        "label": "株洲市",
        "value": "4302"
      },
      {
        "label": "湘潭市",
        "value": "4303"
      },
      {
        "label": "衡阳市",
        "value": "4304"
      },
      {
        "label": "邵阳市",
        "value": "4305"
      },
      {
        "label": "岳阳市",
        "value": "4306"
      },
      {
        "label": "常德市",
        "value": "4307"
      },
      {
        "label": "张家界市",
        "value": "4308"
      },
      {
        "label": "益阳市",
        "value": "4309"
      },
      {
        "label": "郴州市",
        "value": "4310"
      },
      {
        "label": "永州市",
        "value": "4311"
      },
      {
        "label": "怀化市",
        "value": "4312"
      },
      {
        "label": "娄底市",
        "value": "4313"
      },
      {
        "label": "湘西土家族苗族自治州",
        "value": "4331"
      }
    ],
    [
      {
        "label": "广州市",
        "value": "4401"
      },
      {
        "label": "韶关市",
        "value": "4402"
      },
      {
        "label": "深圳市",
        "value": "4403"
      },
      {
        "label": "珠海市",
        "value": "4404"
      },
      {
        "label": "汕头市",
        "value": "4405"
      },
      {
        "label": "佛山市",
        "value": "4406"
      },
      {
        "label": "江门市",
        "value": "4407"
      },
      {
        "label": "湛江市",
        "value": "4408"
      },
      {
        "label": "茂名市",
        "value": "4409"
      },
      {
        "label": "肇庆市",
        "value": "4412"
      },
      {
        "label": "惠州市",
        "value": "4413"
      },
      {
        "label": "梅州市",
        "value": "4414"
      },
      {
        "label": "汕尾市",
        "value": "4415"
      },
      {
        "label": "河源市",
        "value": "4416"
      },
      {
        "label": "阳江市",
        "value": "4417"
      },
      {
        "label": "清远市",
        "value": "4418"
      },
      {
        "label": "东莞市",
        "value": "4419"
      },
      {
        "label": "中山市",
        "value": "4420"
      },
      {
        "label": "潮州市",
        "value": "4451"
      },
      {
        "label": "揭阳市",
        "value": "4452"
      },
      {
        "label": "云浮市",
        "value": "4453"
      }
    ],
    [
      {
        "label": "南宁市",
        "value": "4501"
      },
      {
        "label": "柳州市",
        "value": "4502"
      },
      {
        "label": "桂林市",
        "value": "4503"
      },
      {
        "label": "梧州市",
        "value": "4504"
      },
      {
        "label": "北海市",
        "value": "4505"
      },
      {
        "label": "防城港市",
        "value": "4506"
      },
      {
        "label": "钦州市",
        "value": "4507"
      },
      {
        "label": "贵港市",
        "value": "4508"
      },
      {
        "label": "玉林市",
        "value": "4509"
      },
      {
        "label": "百色市",
        "value": "4510"
      },
      {
        "label": "贺州市",
        "value": "4511"
      },
      {
        "label": "河池市",
        "value": "4512"
      },
      {
        "label": "来宾市",
        "value": "4513"
      },
      {
        "label": "崇左市",
        "value": "4514"
      }
    ],
    [
      {
        "label": "海口市",
        "value": "4601"
      },
      {
        "label": "三亚市",
        "value": "4602"
      },
      {
        "label": "三沙市",
        "value": "4603"
      },
      {
        "label": "儋州市",
        "value": "4604"
      },
      {
        "label": "省直辖县级行政区划",
        "value": "4690"
      }
    ],
    [
      {
        "label": "市辖区",
        "value": "5001"
      },
      {
        "label": "县",
        "value": "5002"
      }
    ],
    [
      {
        "label": "成都市",
        "value": "5101"
      },
      {
        "label": "自贡市",
        "value": "5103"
      },
      {
        "label": "攀枝花市",
        "value": "5104"
      },
      {
        "label": "泸州市",
        "value": "5105"
      },
      {
        "label": "德阳市",
        "value": "5106"
      },
      {
        "label": "绵阳市",
        "value": "5107"
      },
      {
        "label": "广元市",
        "value": "5108"
      },
      {
        "label": "遂宁市",
        "value": "5109"
      },
      {
        "label": "内江市",
        "value": "5110"
      },
      {
        "label": "乐山市",
        "value": "5111"
      },
      {
        "label": "南充市",
        "value": "5113"
      },
      {
        "label": "眉山市",
        "value": "5114"
      },
      {
        "label": "宜宾市",
        "value": "5115"
      },
      {
        "label": "广安市",
        "value": "5116"
      },
      {
        "label": "达州市",
        "value": "5117"
      },
      {
        "label": "雅安市",
        "value": "5118"
      },
      {
        "label": "巴中市",
        "value": "5119"
      },
      {
        "label": "资阳市",
        "value": "5120"
      },
      {
        "label": "阿坝藏族羌族自治州",
        "value": "5132"
      },
      {
        "label": "甘孜藏族自治州",
        "value": "5133"
      },
      {
        "label": "凉山彝族自治州",
        "value": "5134"
      }
    ],
    [
      {
        "label": "贵阳市",
        "value": "5201"
      },
      {
        "label": "六盘水市",
        "value": "5202"
      },
      {
        "label": "遵义市",
        "value": "5203"
      },
      {
        "label": "安顺市",
        "value": "5204"
      },
      {
        "label": "毕节市",
        "value": "5205"
      },
      {
        "label": "铜仁市",
        "value": "5206"
      },
      {
        "label": "黔西南布依族苗族自治州",
        "value": "5223"
      },
      {
        "label": "黔东南苗族侗族自治州",
        "value": "5226"
      },
      {
        "label": "黔南布依族苗族自治州",
        "value": "5227"
      }
    ],
    [
      {
        "label": "昆明市",
        "value": "5301"
      },
      {
        "label": "曲靖市",
        "value": "5303"
      },
      {
        "label": "玉溪市",
        "value": "5304"
      },
      {
        "label": "保山市",
        "value": "5305"
      },
      {
        "label": "昭通市",
        "value": "5306"
      },
      {
        "label": "丽江市",
        "value": "5307"
      },
      {
        "label": "普洱市",
        "value": "5308"
      },
      {
        "label": "临沧市",
        "value": "5309"
      },
      {
        "label": "楚雄彝族自治州",
        "value": "5323"
      },
      {
        "label": "红河哈尼族彝族自治州",
        "value": "5325"
      },
      {
        "label": "文山壮族苗族自治州",
        "value": "5326"
      },
      {
        "label": "西双版纳傣族自治州",
        "value": "5328"
      },
      {
        "label": "大理白族自治州",
        "value": "5329"
      },
      {
        "label": "德宏傣族景颇族自治州",
        "value": "5331"
      },
      {
        "label": "怒江傈僳族自治州",
        "value": "5333"
      },
      {
        "label": "迪庆藏族自治州",
        "value": "5334"
      }
    ],
    [
      {
        "label": "拉萨市",
        "value": "5401"
      },
      {
        "label": "日喀则市",
        "value": "5402"
      },
      {
        "label": "昌都市",
        "value": "5403"
      },
      {
        "label": "林芝市",
        "value": "5404"
      },
      {
        "label": "山南市",
        "value": "5405"
      },
      {
        "label": "那曲地区",
        "value": "5424"
      },
      {
        "label": "阿里地区",
        "value": "5425"
      }
    ],
    [
      {
        "label": "西安市",
        "value": "6101"
      },
      {
        "label": "铜川市",
        "value": "6102"
      },
      {
        "label": "宝鸡市",
        "value": "6103"
      },
      {
        "label": "咸阳市",
        "value": "6104"
      },
      {
        "label": "渭南市",
        "value": "6105"
      },
      {
        "label": "延安市",
        "value": "6106"
      },
      {
        "label": "汉中市",
        "value": "6107"
      },
      {
        "label": "榆林市",
        "value": "6108"
      },
      {
        "label": "安康市",
        "value": "6109"
      },
      {
        "label": "商洛市",
        "value": "6110"
      }
    ],
    [
      {
        "label": "兰州市",
        "value": "6201"
      },
      {
        "label": "嘉峪关市",
        "value": "6202"
      },
      {
        "label": "金昌市",
        "value": "6203"
      },
      {
        "label": "白银市",
        "value": "6204"
      },
      {
        "label": "天水市",
        "value": "6205"
      },
      {
        "label": "武威市",
        "value": "6206"
      },
      {
        "label": "张掖市",
        "value": "6207"
      },
      {
        "label": "平凉市",
        "value": "6208"
      },
      {
        "label": "酒泉市",
        "value": "6209"
      },
      {
        "label": "庆阳市",
        "value": "6210"
      },
      {
        "label": "定西市",
        "value": "6211"
      },
      {
        "label": "陇南市",
        "value": "6212"
      },
      {
        "label": "临夏回族自治州",
        "value": "6229"
      },
      {
        "label": "甘南藏族自治州",
        "value": "6230"
      }
    ],
    [
      {
        "label": "西宁市",
        "value": "6301"
      },
      {
        "label": "海东市",
        "value": "6302"
      },
      {
        "label": "海北藏族自治州",
        "value": "6322"
      },
      {
        "label": "黄南藏族自治州",
        "value": "6323"
      },
      {
        "label": "海南藏族自治州",
        "value": "6325"
      },
      {
        "label": "果洛藏族自治州",
        "value": "6326"
      },
      {
        "label": "玉树藏族自治州",
        "value": "6327"
      },
      {
        "label": "海西蒙古族藏族自治州",
        "value": "6328"
      }
    ],
    [
      {
        "label": "银川市",
        "value": "6401"
      },
      {
        "label": "石嘴山市",
        "value": "6402"
      },
      {
        "label": "吴忠市",
        "value": "6403"
      },
      {
        "label": "固原市",
        "value": "6404"
      },
      {
        "label": "中卫市",
        "value": "6405"
      }
    ],
    [
      {
        "label": "乌鲁木齐市",
        "value": "6501"
      },
      {
        "label": "克拉玛依市",
        "value": "6502"
      },
      {
        "label": "吐鲁番市",
        "value": "6504"
      },
      {
        "label": "哈密市",
        "value": "6505"
      },
      {
        "label": "昌吉回族自治州",
        "value": "6523"
      },
      {
        "label": "博尔塔拉蒙古自治州",
        "value": "6527"
      },
      {
        "label": "巴音郭楞蒙古自治州",
        "value": "6528"
      },
      {
        "label": "阿克苏地区",
        "value": "6529"
      },
      {
        "label": "克孜勒苏柯尔克孜自治州",
        "value": "6530"
      },
      {
        "label": "喀什地区",
        "value": "6531"
      },
      {
        "label": "和田地区",
        "value": "6532"
      },
      {
        "label": "伊犁哈萨克自治州",
        "value": "6540"
      },
      {
        "label": "塔城地区",
        "value": "6542"
      },
      {
        "label": "阿勒泰地区",
        "value": "6543"
      },
      {
        "label": "自治区直辖县级行政区划",
        "value": "6590"
      }
    ],
    [
      {
        "label": "台北",
        "value": "6601"
      },
      {
        "label": "高雄",
        "value": "6602"
      },
      {
        "label": "基隆",
        "value": "6603"
      },
      {
        "label": "台中",
        "value": "6604"
      },
      {
        "label": "台南",
        "value": "6605"
      },
      {
        "label": "新竹",
        "value": "6606"
      },
      {
        "label": "嘉义",
        "value": "6607"
      },
      {
        "label": "宜兰",
        "value": "6608"
      },
      {
        "label": "桃园",
        "value": "6609"
      },
      {
        "label": "苗栗",
        "value": "6610"
      },
      {
        "label": "彰化",
        "value": "6611"
      },
      {
        "label": "南投",
        "value": "6612"
      },
      {
        "label": "云林",
        "value": "6613"
      },
      {
        "label": "屏东",
        "value": "6614"
      },
      {
        "label": "台东",
        "value": "6615"
      },
      {
        "label": "花莲",
        "value": "6616"
      },
      {
        "label": "澎湖",
        "value": "6617"
      }
    ],
    [
      {
        "label": "香港岛",
        "value": "6701"
      },
      {
        "label": "九龙",
        "value": "6702"
      },
      {
        "label": "新界",
        "value": "6703"
      }
    ],
    [
      {
        "label": "澳门半岛",
        "value": "6801"
      },
      {
        "label": "氹仔岛",
        "value": "6802"
      },
      {
        "label": "路环岛",
        "value": "6803"
      },
      {
        "label": "路氹城",
        "value": "6804"
      }
    ]
  ];
  var areaData = [
    [
      [
        {
          "label": "东城区",
          "value": "110101"
        },
        {
          "label": "西城区",
          "value": "110102"
        },
        {
          "label": "朝阳区",
          "value": "110105"
        },
        {
          "label": "丰台区",
          "value": "110106"
        },
        {
          "label": "石景山区",
          "value": "110107"
        },
        {
          "label": "海淀区",
          "value": "110108"
        },
        {
          "label": "门头沟区",
          "value": "110109"
        },
        {
          "label": "房山区",
          "value": "110111"
        },
        {
          "label": "通州区",
          "value": "110112"
        },
        {
          "label": "顺义区",
          "value": "110113"
        },
        {
          "label": "昌平区",
          "value": "110114"
        },
        {
          "label": "大兴区",
          "value": "110115"
        },
        {
          "label": "怀柔区",
          "value": "110116"
        },
        {
          "label": "平谷区",
          "value": "110117"
        },
        {
          "label": "密云区",
          "value": "110118"
        },
        {
          "label": "延庆区",
          "value": "110119"
        }
      ]
    ],
    [
      [
        {
          "label": "和平区",
          "value": "120101"
        },
        {
          "label": "河东区",
          "value": "120102"
        },
        {
          "label": "河西区",
          "value": "120103"
        },
        {
          "label": "南开区",
          "value": "120104"
        },
        {
          "label": "河北区",
          "value": "120105"
        },
        {
          "label": "红桥区",
          "value": "120106"
        },
        {
          "label": "东丽区",
          "value": "120110"
        },
        {
          "label": "西青区",
          "value": "120111"
        },
        {
          "label": "津南区",
          "value": "120112"
        },
        {
          "label": "北辰区",
          "value": "120113"
        },
        {
          "label": "武清区",
          "value": "120114"
        },
        {
          "label": "宝坻区",
          "value": "120115"
        },
        {
          "label": "滨海新区",
          "value": "120116"
        },
        {
          "label": "宁河区",
          "value": "120117"
        },
        {
          "label": "静海区",
          "value": "120118"
        },
        {
          "label": "蓟州区",
          "value": "120119"
        }
      ]
    ],
    [
      [
        {
          "label": "长安区",
          "value": "130102"
        },
        {
          "label": "桥西区",
          "value": "130104"
        },
        {
          "label": "新华区",
          "value": "130105"
        },
        {
          "label": "井陉矿区",
          "value": "130107"
        },
        {
          "label": "裕华区",
          "value": "130108"
        },
        {
          "label": "藁城区",
          "value": "130109"
        },
        {
          "label": "鹿泉区",
          "value": "130110"
        },
        {
          "label": "栾城区",
          "value": "130111"
        },
        {
          "label": "井陉县",
          "value": "130121"
        },
        {
          "label": "正定县",
          "value": "130123"
        },
        {
          "label": "行唐县",
          "value": "130125"
        },
        {
          "label": "灵寿县",
          "value": "130126"
        },
        {
          "label": "高邑县",
          "value": "130127"
        },
        {
          "label": "深泽县",
          "value": "130128"
        },
        {
          "label": "赞皇县",
          "value": "130129"
        },
        {
          "label": "无极县",
          "value": "130130"
        },
        {
          "label": "平山县",
          "value": "130131"
        },
        {
          "label": "元氏县",
          "value": "130132"
        },
        {
          "label": "赵县",
          "value": "130133"
        },
        {
          "label": "石家庄高新技术产业开发区",
          "value": "130171"
        },
        {
          "label": "石家庄循环化工园区",
          "value": "130172"
        },
        {
          "label": "辛集市",
          "value": "130181"
        },
        {
          "label": "晋州市",
          "value": "130183"
        },
        {
          "label": "新乐市",
          "value": "130184"
        }
      ],
      [
        {
          "label": "路南区",
          "value": "130202"
        },
        {
          "label": "路北区",
          "value": "130203"
        },
        {
          "label": "古冶区",
          "value": "130204"
        },
        {
          "label": "开平区",
          "value": "130205"
        },
        {
          "label": "丰南区",
          "value": "130207"
        },
        {
          "label": "丰润区",
          "value": "130208"
        },
        {
          "label": "曹妃甸区",
          "value": "130209"
        },
        {
          "label": "滦县",
          "value": "130223"
        },
        {
          "label": "滦南县",
          "value": "130224"
        },
        {
          "label": "乐亭县",
          "value": "130225"
        },
        {
          "label": "迁西县",
          "value": "130227"
        },
        {
          "label": "玉田县",
          "value": "130229"
        },
        {
          "label": "唐山市芦台经济技术开发区",
          "value": "130271"
        },
        {
          "label": "唐山市汉沽管理区",
          "value": "130272"
        },
        {
          "label": "唐山高新技术产业开发区",
          "value": "130273"
        },
        {
          "label": "河北唐山海港经济开发区",
          "value": "130274"
        },
        {
          "label": "遵化市",
          "value": "130281"
        },
        {
          "label": "迁安市",
          "value": "130283"
        }
      ],
      [
        {
          "label": "海港区",
          "value": "130302"
        },
        {
          "label": "山海关区",
          "value": "130303"
        },
        {
          "label": "北戴河区",
          "value": "130304"
        },
        {
          "label": "抚宁区",
          "value": "130306"
        },
        {
          "label": "青龙满族自治县",
          "value": "130321"
        },
        {
          "label": "昌黎县",
          "value": "130322"
        },
        {
          "label": "卢龙县",
          "value": "130324"
        },
        {
          "label": "秦皇岛市经济技术开发区",
          "value": "130371"
        },
        {
          "label": "北戴河新区",
          "value": "130372"
        }
      ],
      [
        {
          "label": "邯山区",
          "value": "130402"
        },
        {
          "label": "丛台区",
          "value": "130403"
        },
        {
          "label": "复兴区",
          "value": "130404"
        },
        {
          "label": "峰峰矿区",
          "value": "130406"
        },
        {
          "label": "肥乡区",
          "value": "130407"
        },
        {
          "label": "永年区",
          "value": "130408"
        },
        {
          "label": "临漳县",
          "value": "130423"
        },
        {
          "label": "成安县",
          "value": "130424"
        },
        {
          "label": "大名县",
          "value": "130425"
        },
        {
          "label": "涉县",
          "value": "130426"
        },
        {
          "label": "磁县",
          "value": "130427"
        },
        {
          "label": "邱县",
          "value": "130430"
        },
        {
          "label": "鸡泽县",
          "value": "130431"
        },
        {
          "label": "广平县",
          "value": "130432"
        },
        {
          "label": "馆陶县",
          "value": "130433"
        },
        {
          "label": "魏县",
          "value": "130434"
        },
        {
          "label": "曲周县",
          "value": "130435"
        },
        {
          "label": "邯郸经济技术开发区",
          "value": "130471"
        },
        {
          "label": "邯郸冀南新区",
          "value": "130473"
        },
        {
          "label": "武安市",
          "value": "130481"
        }
      ],
      [
        {
          "label": "桥东区",
          "value": "130502"
        },
        {
          "label": "桥西区",
          "value": "130503"
        },
        {
          "label": "邢台县",
          "value": "130521"
        },
        {
          "label": "临城县",
          "value": "130522"
        },
        {
          "label": "内丘县",
          "value": "130523"
        },
        {
          "label": "柏乡县",
          "value": "130524"
        },
        {
          "label": "隆尧县",
          "value": "130525"
        },
        {
          "label": "任县",
          "value": "130526"
        },
        {
          "label": "南和县",
          "value": "130527"
        },
        {
          "label": "宁晋县",
          "value": "130528"
        },
        {
          "label": "巨鹿县",
          "value": "130529"
        },
        {
          "label": "新河县",
          "value": "130530"
        },
        {
          "label": "广宗县",
          "value": "130531"
        },
        {
          "label": "平乡县",
          "value": "130532"
        },
        {
          "label": "威县",
          "value": "130533"
        },
        {
          "label": "清河县",
          "value": "130534"
        },
        {
          "label": "临西县",
          "value": "130535"
        },
        {
          "label": "河北邢台经济开发区",
          "value": "130571"
        },
        {
          "label": "南宫市",
          "value": "130581"
        },
        {
          "label": "沙河市",
          "value": "130582"
        }
      ],
      [
        {
          "label": "竞秀区",
          "value": "130602"
        },
        {
          "label": "莲池区",
          "value": "130606"
        },
        {
          "label": "满城区",
          "value": "130607"
        },
        {
          "label": "清苑区",
          "value": "130608"
        },
        {
          "label": "徐水区",
          "value": "130609"
        },
        {
          "label": "涞水县",
          "value": "130623"
        },
        {
          "label": "阜平县",
          "value": "130624"
        },
        {
          "label": "定兴县",
          "value": "130626"
        },
        {
          "label": "唐县",
          "value": "130627"
        },
        {
          "label": "高阳县",
          "value": "130628"
        },
        {
          "label": "容城县",
          "value": "130629"
        },
        {
          "label": "涞源县",
          "value": "130630"
        },
        {
          "label": "望都县",
          "value": "130631"
        },
        {
          "label": "安新县",
          "value": "130632"
        },
        {
          "label": "易县",
          "value": "130633"
        },
        {
          "label": "曲阳县",
          "value": "130634"
        },
        {
          "label": "蠡县",
          "value": "130635"
        },
        {
          "label": "顺平县",
          "value": "130636"
        },
        {
          "label": "博野县",
          "value": "130637"
        },
        {
          "label": "雄县",
          "value": "130638"
        },
        {
          "label": "保定高新技术产业开发区",
          "value": "130671"
        },
        {
          "label": "保定白沟新城",
          "value": "130672"
        },
        {
          "label": "涿州市",
          "value": "130681"
        },
        {
          "label": "定州市",
          "value": "130682"
        },
        {
          "label": "安国市",
          "value": "130683"
        },
        {
          "label": "高碑店市",
          "value": "130684"
        }
      ],
      [
        {
          "label": "桥东区",
          "value": "130702"
        },
        {
          "label": "桥西区",
          "value": "130703"
        },
        {
          "label": "宣化区",
          "value": "130705"
        },
        {
          "label": "下花园区",
          "value": "130706"
        },
        {
          "label": "万全区",
          "value": "130708"
        },
        {
          "label": "崇礼区",
          "value": "130709"
        },
        {
          "label": "张北县",
          "value": "130722"
        },
        {
          "label": "康保县",
          "value": "130723"
        },
        {
          "label": "沽源县",
          "value": "130724"
        },
        {
          "label": "尚义县",
          "value": "130725"
        },
        {
          "label": "蔚县",
          "value": "130726"
        },
        {
          "label": "阳原县",
          "value": "130727"
        },
        {
          "label": "怀安县",
          "value": "130728"
        },
        {
          "label": "怀来县",
          "value": "130730"
        },
        {
          "label": "涿鹿县",
          "value": "130731"
        },
        {
          "label": "赤城县",
          "value": "130732"
        },
        {
          "label": "张家口市高新技术产业开发区",
          "value": "130771"
        },
        {
          "label": "张家口市察北管理区",
          "value": "130772"
        },
        {
          "label": "张家口市塞北管理区",
          "value": "130773"
        }
      ],
      [
        {
          "label": "双桥区",
          "value": "130802"
        },
        {
          "label": "双滦区",
          "value": "130803"
        },
        {
          "label": "鹰手营子矿区",
          "value": "130804"
        },
        {
          "label": "承德县",
          "value": "130821"
        },
        {
          "label": "兴隆县",
          "value": "130822"
        },
        {
          "label": "滦平县",
          "value": "130824"
        },
        {
          "label": "隆化县",
          "value": "130825"
        },
        {
          "label": "丰宁满族自治县",
          "value": "130826"
        },
        {
          "label": "宽城满族自治县",
          "value": "130827"
        },
        {
          "label": "围场满族蒙古族自治县",
          "value": "130828"
        },
        {
          "label": "承德高新技术产业开发区",
          "value": "130871"
        },
        {
          "label": "平泉市",
          "value": "130881"
        }
      ],
      [
        {
          "label": "新华区",
          "value": "130902"
        },
        {
          "label": "运河区",
          "value": "130903"
        },
        {
          "label": "沧县",
          "value": "130921"
        },
        {
          "label": "青县",
          "value": "130922"
        },
        {
          "label": "东光县",
          "value": "130923"
        },
        {
          "label": "海兴县",
          "value": "130924"
        },
        {
          "label": "盐山县",
          "value": "130925"
        },
        {
          "label": "肃宁县",
          "value": "130926"
        },
        {
          "label": "南皮县",
          "value": "130927"
        },
        {
          "label": "吴桥县",
          "value": "130928"
        },
        {
          "label": "献县",
          "value": "130929"
        },
        {
          "label": "孟村回族自治县",
          "value": "130930"
        },
        {
          "label": "河北沧州经济开发区",
          "value": "130971"
        },
        {
          "label": "沧州高新技术产业开发区",
          "value": "130972"
        },
        {
          "label": "沧州渤海新区",
          "value": "130973"
        },
        {
          "label": "泊头市",
          "value": "130981"
        },
        {
          "label": "任丘市",
          "value": "130982"
        },
        {
          "label": "黄骅市",
          "value": "130983"
        },
        {
          "label": "河间市",
          "value": "130984"
        }
      ],
      [
        {
          "label": "安次区",
          "value": "131002"
        },
        {
          "label": "广阳区",
          "value": "131003"
        },
        {
          "label": "固安县",
          "value": "131022"
        },
        {
          "label": "永清县",
          "value": "131023"
        },
        {
          "label": "香河县",
          "value": "131024"
        },
        {
          "label": "大城县",
          "value": "131025"
        },
        {
          "label": "文安县",
          "value": "131026"
        },
        {
          "label": "大厂回族自治县",
          "value": "131028"
        },
        {
          "label": "廊坊经济技术开发区",
          "value": "131071"
        },
        {
          "label": "霸州市",
          "value": "131081"
        },
        {
          "label": "三河市",
          "value": "131082"
        }
      ],
      [
        {
          "label": "桃城区",
          "value": "131102"
        },
        {
          "label": "冀州区",
          "value": "131103"
        },
        {
          "label": "枣强县",
          "value": "131121"
        },
        {
          "label": "武邑县",
          "value": "131122"
        },
        {
          "label": "武强县",
          "value": "131123"
        },
        {
          "label": "饶阳县",
          "value": "131124"
        },
        {
          "label": "安平县",
          "value": "131125"
        },
        {
          "label": "故城县",
          "value": "131126"
        },
        {
          "label": "景县",
          "value": "131127"
        },
        {
          "label": "阜城县",
          "value": "131128"
        },
        {
          "label": "河北衡水经济开发区",
          "value": "131171"
        },
        {
          "label": "衡水滨湖新区",
          "value": "131172"
        },
        {
          "label": "深州市",
          "value": "131182"
        }
      ]
    ],
    [
      [
        {
          "label": "小店区",
          "value": "140105"
        },
        {
          "label": "迎泽区",
          "value": "140106"
        },
        {
          "label": "杏花岭区",
          "value": "140107"
        },
        {
          "label": "尖草坪区",
          "value": "140108"
        },
        {
          "label": "万柏林区",
          "value": "140109"
        },
        {
          "label": "晋源区",
          "value": "140110"
        },
        {
          "label": "清徐县",
          "value": "140121"
        },
        {
          "label": "阳曲县",
          "value": "140122"
        },
        {
          "label": "娄烦县",
          "value": "140123"
        },
        {
          "label": "山西转型综合改革示范区",
          "value": "140171"
        },
        {
          "label": "古交市",
          "value": "140181"
        }
      ],
      [
        {
          "label": "城区",
          "value": "140202"
        },
        {
          "label": "矿区",
          "value": "140203"
        },
        {
          "label": "南郊区",
          "value": "140211"
        },
        {
          "label": "新荣区",
          "value": "140212"
        },
        {
          "label": "阳高县",
          "value": "140221"
        },
        {
          "label": "天镇县",
          "value": "140222"
        },
        {
          "label": "广灵县",
          "value": "140223"
        },
        {
          "label": "灵丘县",
          "value": "140224"
        },
        {
          "label": "浑源县",
          "value": "140225"
        },
        {
          "label": "左云县",
          "value": "140226"
        },
        {
          "label": "大同县",
          "value": "140227"
        },
        {
          "label": "山西大同经济开发区",
          "value": "140271"
        }
      ],
      [
        {
          "label": "城区",
          "value": "140302"
        },
        {
          "label": "矿区",
          "value": "140303"
        },
        {
          "label": "郊区",
          "value": "140311"
        },
        {
          "label": "平定县",
          "value": "140321"
        },
        {
          "label": "盂县",
          "value": "140322"
        },
        {
          "label": "山西阳泉经济开发区",
          "value": "140371"
        }
      ],
      [
        {
          "label": "城区",
          "value": "140402"
        },
        {
          "label": "郊区",
          "value": "140411"
        },
        {
          "label": "长治县",
          "value": "140421"
        },
        {
          "label": "襄垣县",
          "value": "140423"
        },
        {
          "label": "屯留县",
          "value": "140424"
        },
        {
          "label": "平顺县",
          "value": "140425"
        },
        {
          "label": "黎城县",
          "value": "140426"
        },
        {
          "label": "壶关县",
          "value": "140427"
        },
        {
          "label": "长子县",
          "value": "140428"
        },
        {
          "label": "武乡县",
          "value": "140429"
        },
        {
          "label": "沁县",
          "value": "140430"
        },
        {
          "label": "沁源县",
          "value": "140431"
        },
        {
          "label": "山西长治高新技术产业园区",
          "value": "140471"
        },
        {
          "label": "潞城市",
          "value": "140481"
        }
      ],
      [
        {
          "label": "城区",
          "value": "140502"
        },
        {
          "label": "沁水县",
          "value": "140521"
        },
        {
          "label": "阳城县",
          "value": "140522"
        },
        {
          "label": "陵川县",
          "value": "140524"
        },
        {
          "label": "泽州县",
          "value": "140525"
        },
        {
          "label": "高平市",
          "value": "140581"
        }
      ],
      [
        {
          "label": "朔城区",
          "value": "140602"
        },
        {
          "label": "平鲁区",
          "value": "140603"
        },
        {
          "label": "山阴县",
          "value": "140621"
        },
        {
          "label": "应县",
          "value": "140622"
        },
        {
          "label": "右玉县",
          "value": "140623"
        },
        {
          "label": "怀仁县",
          "value": "140624"
        },
        {
          "label": "山西朔州经济开发区",
          "value": "140671"
        }
      ],
      [
        {
          "label": "榆次区",
          "value": "140702"
        },
        {
          "label": "榆社县",
          "value": "140721"
        },
        {
          "label": "左权县",
          "value": "140722"
        },
        {
          "label": "和顺县",
          "value": "140723"
        },
        {
          "label": "昔阳县",
          "value": "140724"
        },
        {
          "label": "寿阳县",
          "value": "140725"
        },
        {
          "label": "太谷县",
          "value": "140726"
        },
        {
          "label": "祁县",
          "value": "140727"
        },
        {
          "label": "平遥县",
          "value": "140728"
        },
        {
          "label": "灵石县",
          "value": "140729"
        },
        {
          "label": "介休市",
          "value": "140781"
        }
      ],
      [
        {
          "label": "盐湖区",
          "value": "140802"
        },
        {
          "label": "临猗县",
          "value": "140821"
        },
        {
          "label": "万荣县",
          "value": "140822"
        },
        {
          "label": "闻喜县",
          "value": "140823"
        },
        {
          "label": "稷山县",
          "value": "140824"
        },
        {
          "label": "新绛县",
          "value": "140825"
        },
        {
          "label": "绛县",
          "value": "140826"
        },
        {
          "label": "垣曲县",
          "value": "140827"
        },
        {
          "label": "夏县",
          "value": "140828"
        },
        {
          "label": "平陆县",
          "value": "140829"
        },
        {
          "label": "芮城县",
          "value": "140830"
        },
        {
          "label": "永济市",
          "value": "140881"
        },
        {
          "label": "河津市",
          "value": "140882"
        }
      ],
      [
        {
          "label": "忻府区",
          "value": "140902"
        },
        {
          "label": "定襄县",
          "value": "140921"
        },
        {
          "label": "五台县",
          "value": "140922"
        },
        {
          "label": "代县",
          "value": "140923"
        },
        {
          "label": "繁峙县",
          "value": "140924"
        },
        {
          "label": "宁武县",
          "value": "140925"
        },
        {
          "label": "静乐县",
          "value": "140926"
        },
        {
          "label": "神池县",
          "value": "140927"
        },
        {
          "label": "五寨县",
          "value": "140928"
        },
        {
          "label": "岢岚县",
          "value": "140929"
        },
        {
          "label": "河曲县",
          "value": "140930"
        },
        {
          "label": "保德县",
          "value": "140931"
        },
        {
          "label": "偏关县",
          "value": "140932"
        },
        {
          "label": "五台山风景名胜区",
          "value": "140971"
        },
        {
          "label": "原平市",
          "value": "140981"
        }
      ],
      [
        {
          "label": "尧都区",
          "value": "141002"
        },
        {
          "label": "曲沃县",
          "value": "141021"
        },
        {
          "label": "翼城县",
          "value": "141022"
        },
        {
          "label": "襄汾县",
          "value": "141023"
        },
        {
          "label": "洪洞县",
          "value": "141024"
        },
        {
          "label": "古县",
          "value": "141025"
        },
        {
          "label": "安泽县",
          "value": "141026"
        },
        {
          "label": "浮山县",
          "value": "141027"
        },
        {
          "label": "吉县",
          "value": "141028"
        },
        {
          "label": "乡宁县",
          "value": "141029"
        },
        {
          "label": "大宁县",
          "value": "141030"
        },
        {
          "label": "隰县",
          "value": "141031"
        },
        {
          "label": "永和县",
          "value": "141032"
        },
        {
          "label": "蒲县",
          "value": "141033"
        },
        {
          "label": "汾西县",
          "value": "141034"
        },
        {
          "label": "侯马市",
          "value": "141081"
        },
        {
          "label": "霍州市",
          "value": "141082"
        }
      ],
      [
        {
          "label": "离石区",
          "value": "141102"
        },
        {
          "label": "文水县",
          "value": "141121"
        },
        {
          "label": "交城县",
          "value": "141122"
        },
        {
          "label": "兴县",
          "value": "141123"
        },
        {
          "label": "临县",
          "value": "141124"
        },
        {
          "label": "柳林县",
          "value": "141125"
        },
        {
          "label": "石楼县",
          "value": "141126"
        },
        {
          "label": "岚县",
          "value": "141127"
        },
        {
          "label": "方山县",
          "value": "141128"
        },
        {
          "label": "中阳县",
          "value": "141129"
        },
        {
          "label": "交口县",
          "value": "141130"
        },
        {
          "label": "孝义市",
          "value": "141181"
        },
        {
          "label": "汾阳市",
          "value": "141182"
        }
      ]
    ],
    [
      [
        {
          "label": "新城区",
          "value": "150102"
        },
        {
          "label": "回民区",
          "value": "150103"
        },
        {
          "label": "玉泉区",
          "value": "150104"
        },
        {
          "label": "赛罕区",
          "value": "150105"
        },
        {
          "label": "土默特左旗",
          "value": "150121"
        },
        {
          "label": "托克托县",
          "value": "150122"
        },
        {
          "label": "和林格尔县",
          "value": "150123"
        },
        {
          "label": "清水河县",
          "value": "150124"
        },
        {
          "label": "武川县",
          "value": "150125"
        },
        {
          "label": "呼和浩特金海工业园区",
          "value": "150171"
        },
        {
          "label": "呼和浩特经济技术开发区",
          "value": "150172"
        }
      ],
      [
        {
          "label": "东河区",
          "value": "150202"
        },
        {
          "label": "昆都仑区",
          "value": "150203"
        },
        {
          "label": "青山区",
          "value": "150204"
        },
        {
          "label": "石拐区",
          "value": "150205"
        },
        {
          "label": "白云鄂博矿区",
          "value": "150206"
        },
        {
          "label": "九原区",
          "value": "150207"
        },
        {
          "label": "土默特右旗",
          "value": "150221"
        },
        {
          "label": "固阳县",
          "value": "150222"
        },
        {
          "label": "达尔罕茂明安联合旗",
          "value": "150223"
        },
        {
          "label": "包头稀土高新技术产业开发区",
          "value": "150271"
        }
      ],
      [
        {
          "label": "海勃湾区",
          "value": "150302"
        },
        {
          "label": "海南区",
          "value": "150303"
        },
        {
          "label": "乌达区",
          "value": "150304"
        }
      ],
      [
        {
          "label": "红山区",
          "value": "150402"
        },
        {
          "label": "元宝山区",
          "value": "150403"
        },
        {
          "label": "松山区",
          "value": "150404"
        },
        {
          "label": "阿鲁科尔沁旗",
          "value": "150421"
        },
        {
          "label": "巴林左旗",
          "value": "150422"
        },
        {
          "label": "巴林右旗",
          "value": "150423"
        },
        {
          "label": "林西县",
          "value": "150424"
        },
        {
          "label": "克什克腾旗",
          "value": "150425"
        },
        {
          "label": "翁牛特旗",
          "value": "150426"
        },
        {
          "label": "喀喇沁旗",
          "value": "150428"
        },
        {
          "label": "宁城县",
          "value": "150429"
        },
        {
          "label": "敖汉旗",
          "value": "150430"
        }
      ],
      [
        {
          "label": "科尔沁区",
          "value": "150502"
        },
        {
          "label": "科尔沁左翼中旗",
          "value": "150521"
        },
        {
          "label": "科尔沁左翼后旗",
          "value": "150522"
        },
        {
          "label": "开鲁县",
          "value": "150523"
        },
        {
          "label": "库伦旗",
          "value": "150524"
        },
        {
          "label": "奈曼旗",
          "value": "150525"
        },
        {
          "label": "扎鲁特旗",
          "value": "150526"
        },
        {
          "label": "通辽经济技术开发区",
          "value": "150571"
        },
        {
          "label": "霍林郭勒市",
          "value": "150581"
        }
      ],
      [
        {
          "label": "东胜区",
          "value": "150602"
        },
        {
          "label": "康巴什区",
          "value": "150603"
        },
        {
          "label": "达拉特旗",
          "value": "150621"
        },
        {
          "label": "准格尔旗",
          "value": "150622"
        },
        {
          "label": "鄂托克前旗",
          "value": "150623"
        },
        {
          "label": "鄂托克旗",
          "value": "150624"
        },
        {
          "label": "杭锦旗",
          "value": "150625"
        },
        {
          "label": "乌审旗",
          "value": "150626"
        },
        {
          "label": "伊金霍洛旗",
          "value": "150627"
        }
      ],
      [
        {
          "label": "海拉尔区",
          "value": "150702"
        },
        {
          "label": "扎赉诺尔区",
          "value": "150703"
        },
        {
          "label": "阿荣旗",
          "value": "150721"
        },
        {
          "label": "莫力达瓦达斡尔族自治旗",
          "value": "150722"
        },
        {
          "label": "鄂伦春自治旗",
          "value": "150723"
        },
        {
          "label": "鄂温克族自治旗",
          "value": "150724"
        },
        {
          "label": "陈巴尔虎旗",
          "value": "150725"
        },
        {
          "label": "新巴尔虎左旗",
          "value": "150726"
        },
        {
          "label": "新巴尔虎右旗",
          "value": "150727"
        },
        {
          "label": "满洲里市",
          "value": "150781"
        },
        {
          "label": "牙克石市",
          "value": "150782"
        },
        {
          "label": "扎兰屯市",
          "value": "150783"
        },
        {
          "label": "额尔古纳市",
          "value": "150784"
        },
        {
          "label": "根河市",
          "value": "150785"
        }
      ],
      [
        {
          "label": "临河区",
          "value": "150802"
        },
        {
          "label": "五原县",
          "value": "150821"
        },
        {
          "label": "磴口县",
          "value": "150822"
        },
        {
          "label": "乌拉特前旗",
          "value": "150823"
        },
        {
          "label": "乌拉特中旗",
          "value": "150824"
        },
        {
          "label": "乌拉特后旗",
          "value": "150825"
        },
        {
          "label": "杭锦后旗",
          "value": "150826"
        }
      ],
      [
        {
          "label": "集宁区",
          "value": "150902"
        },
        {
          "label": "卓资县",
          "value": "150921"
        },
        {
          "label": "化德县",
          "value": "150922"
        },
        {
          "label": "商都县",
          "value": "150923"
        },
        {
          "label": "兴和县",
          "value": "150924"
        },
        {
          "label": "凉城县",
          "value": "150925"
        },
        {
          "label": "察哈尔右翼前旗",
          "value": "150926"
        },
        {
          "label": "察哈尔右翼中旗",
          "value": "150927"
        },
        {
          "label": "察哈尔右翼后旗",
          "value": "150928"
        },
        {
          "label": "四子王旗",
          "value": "150929"
        },
        {
          "label": "丰镇市",
          "value": "150981"
        }
      ],
      [
        {
          "label": "乌兰浩特市",
          "value": "152201"
        },
        {
          "label": "阿尔山市",
          "value": "152202"
        },
        {
          "label": "科尔沁右翼前旗",
          "value": "152221"
        },
        {
          "label": "科尔沁右翼中旗",
          "value": "152222"
        },
        {
          "label": "扎赉特旗",
          "value": "152223"
        },
        {
          "label": "突泉县",
          "value": "152224"
        }
      ],
      [
        {
          "label": "二连浩特市",
          "value": "152501"
        },
        {
          "label": "锡林浩特市",
          "value": "152502"
        },
        {
          "label": "阿巴嘎旗",
          "value": "152522"
        },
        {
          "label": "苏尼特左旗",
          "value": "152523"
        },
        {
          "label": "苏尼特右旗",
          "value": "152524"
        },
        {
          "label": "东乌珠穆沁旗",
          "value": "152525"
        },
        {
          "label": "西乌珠穆沁旗",
          "value": "152526"
        },
        {
          "label": "太仆寺旗",
          "value": "152527"
        },
        {
          "label": "镶黄旗",
          "value": "152528"
        },
        {
          "label": "正镶白旗",
          "value": "152529"
        },
        {
          "label": "正蓝旗",
          "value": "152530"
        },
        {
          "label": "多伦县",
          "value": "152531"
        },
        {
          "label": "乌拉盖管委会",
          "value": "152571"
        }
      ],
      [
        {
          "label": "阿拉善左旗",
          "value": "152921"
        },
        {
          "label": "阿拉善右旗",
          "value": "152922"
        },
        {
          "label": "额济纳旗",
          "value": "152923"
        },
        {
          "label": "内蒙古阿拉善经济开发区",
          "value": "152971"
        }
      ]
    ],
    [
      [
        {
          "label": "和平区",
          "value": "210102"
        },
        {
          "label": "沈河区",
          "value": "210103"
        },
        {
          "label": "大东区",
          "value": "210104"
        },
        {
          "label": "皇姑区",
          "value": "210105"
        },
        {
          "label": "铁西区",
          "value": "210106"
        },
        {
          "label": "苏家屯区",
          "value": "210111"
        },
        {
          "label": "浑南区",
          "value": "210112"
        },
        {
          "label": "沈北新区",
          "value": "210113"
        },
        {
          "label": "于洪区",
          "value": "210114"
        },
        {
          "label": "辽中区",
          "value": "210115"
        },
        {
          "label": "康平县",
          "value": "210123"
        },
        {
          "label": "法库县",
          "value": "210124"
        },
        {
          "label": "新民市",
          "value": "210181"
        }
      ],
      [
        {
          "label": "中山区",
          "value": "210202"
        },
        {
          "label": "西岗区",
          "value": "210203"
        },
        {
          "label": "沙河口区",
          "value": "210204"
        },
        {
          "label": "甘井子区",
          "value": "210211"
        },
        {
          "label": "旅顺口区",
          "value": "210212"
        },
        {
          "label": "金州区",
          "value": "210213"
        },
        {
          "label": "普兰店区",
          "value": "210214"
        },
        {
          "label": "长海县",
          "value": "210224"
        },
        {
          "label": "瓦房店市",
          "value": "210281"
        },
        {
          "label": "庄河市",
          "value": "210283"
        }
      ],
      [
        {
          "label": "铁东区",
          "value": "210302"
        },
        {
          "label": "铁西区",
          "value": "210303"
        },
        {
          "label": "立山区",
          "value": "210304"
        },
        {
          "label": "千山区",
          "value": "210311"
        },
        {
          "label": "台安县",
          "value": "210321"
        },
        {
          "label": "岫岩满族自治县",
          "value": "210323"
        },
        {
          "label": "海城市",
          "value": "210381"
        }
      ],
      [
        {
          "label": "新抚区",
          "value": "210402"
        },
        {
          "label": "东洲区",
          "value": "210403"
        },
        {
          "label": "望花区",
          "value": "210404"
        },
        {
          "label": "顺城区",
          "value": "210411"
        },
        {
          "label": "抚顺县",
          "value": "210421"
        },
        {
          "label": "新宾满族自治县",
          "value": "210422"
        },
        {
          "label": "清原满族自治县",
          "value": "210423"
        }
      ],
      [
        {
          "label": "平山区",
          "value": "210502"
        },
        {
          "label": "溪湖区",
          "value": "210503"
        },
        {
          "label": "明山区",
          "value": "210504"
        },
        {
          "label": "南芬区",
          "value": "210505"
        },
        {
          "label": "本溪满族自治县",
          "value": "210521"
        },
        {
          "label": "桓仁满族自治县",
          "value": "210522"
        }
      ],
      [
        {
          "label": "元宝区",
          "value": "210602"
        },
        {
          "label": "振兴区",
          "value": "210603"
        },
        {
          "label": "振安区",
          "value": "210604"
        },
        {
          "label": "宽甸满族自治县",
          "value": "210624"
        },
        {
          "label": "东港市",
          "value": "210681"
        },
        {
          "label": "凤城市",
          "value": "210682"
        }
      ],
      [
        {
          "label": "古塔区",
          "value": "210702"
        },
        {
          "label": "凌河区",
          "value": "210703"
        },
        {
          "label": "太和区",
          "value": "210711"
        },
        {
          "label": "黑山县",
          "value": "210726"
        },
        {
          "label": "义县",
          "value": "210727"
        },
        {
          "label": "凌海市",
          "value": "210781"
        },
        {
          "label": "北镇市",
          "value": "210782"
        }
      ],
      [
        {
          "label": "站前区",
          "value": "210802"
        },
        {
          "label": "西市区",
          "value": "210803"
        },
        {
          "label": "鲅鱼圈区",
          "value": "210804"
        },
        {
          "label": "老边区",
          "value": "210811"
        },
        {
          "label": "盖州市",
          "value": "210881"
        },
        {
          "label": "大石桥市",
          "value": "210882"
        }
      ],
      [
        {
          "label": "海州区",
          "value": "210902"
        },
        {
          "label": "新邱区",
          "value": "210903"
        },
        {
          "label": "太平区",
          "value": "210904"
        },
        {
          "label": "清河门区",
          "value": "210905"
        },
        {
          "label": "细河区",
          "value": "210911"
        },
        {
          "label": "阜新蒙古族自治县",
          "value": "210921"
        },
        {
          "label": "彰武县",
          "value": "210922"
        }
      ],
      [
        {
          "label": "白塔区",
          "value": "211002"
        },
        {
          "label": "文圣区",
          "value": "211003"
        },
        {
          "label": "宏伟区",
          "value": "211004"
        },
        {
          "label": "弓长岭区",
          "value": "211005"
        },
        {
          "label": "太子河区",
          "value": "211011"
        },
        {
          "label": "辽阳县",
          "value": "211021"
        },
        {
          "label": "灯塔市",
          "value": "211081"
        }
      ],
      [
        {
          "label": "双台子区",
          "value": "211102"
        },
        {
          "label": "兴隆台区",
          "value": "211103"
        },
        {
          "label": "大洼区",
          "value": "211104"
        },
        {
          "label": "盘山县",
          "value": "211122"
        }
      ],
      [
        {
          "label": "银州区",
          "value": "211202"
        },
        {
          "label": "清河区",
          "value": "211204"
        },
        {
          "label": "铁岭县",
          "value": "211221"
        },
        {
          "label": "西丰县",
          "value": "211223"
        },
        {
          "label": "昌图县",
          "value": "211224"
        },
        {
          "label": "调兵山市",
          "value": "211281"
        },
        {
          "label": "开原市",
          "value": "211282"
        }
      ],
      [
        {
          "label": "双塔区",
          "value": "211302"
        },
        {
          "label": "龙城区",
          "value": "211303"
        },
        {
          "label": "朝阳县",
          "value": "211321"
        },
        {
          "label": "建平县",
          "value": "211322"
        },
        {
          "label": "喀喇沁左翼蒙古族自治县",
          "value": "211324"
        },
        {
          "label": "北票市",
          "value": "211381"
        },
        {
          "label": "凌源市",
          "value": "211382"
        }
      ],
      [
        {
          "label": "连山区",
          "value": "211402"
        },
        {
          "label": "龙港区",
          "value": "211403"
        },
        {
          "label": "南票区",
          "value": "211404"
        },
        {
          "label": "绥中县",
          "value": "211421"
        },
        {
          "label": "建昌县",
          "value": "211422"
        },
        {
          "label": "兴城市",
          "value": "211481"
        }
      ]
    ],
    [
      [
        {
          "label": "南关区",
          "value": "220102"
        },
        {
          "label": "宽城区",
          "value": "220103"
        },
        {
          "label": "朝阳区",
          "value": "220104"
        },
        {
          "label": "二道区",
          "value": "220105"
        },
        {
          "label": "绿园区",
          "value": "220106"
        },
        {
          "label": "双阳区",
          "value": "220112"
        },
        {
          "label": "九台区",
          "value": "220113"
        },
        {
          "label": "农安县",
          "value": "220122"
        },
        {
          "label": "长春经济技术开发区",
          "value": "220171"
        },
        {
          "label": "长春净月高新技术产业开发区",
          "value": "220172"
        },
        {
          "label": "长春高新技术产业开发区",
          "value": "220173"
        },
        {
          "label": "长春汽车经济技术开发区",
          "value": "220174"
        },
        {
          "label": "榆树市",
          "value": "220182"
        },
        {
          "label": "德惠市",
          "value": "220183"
        }
      ],
      [
        {
          "label": "昌邑区",
          "value": "220202"
        },
        {
          "label": "龙潭区",
          "value": "220203"
        },
        {
          "label": "船营区",
          "value": "220204"
        },
        {
          "label": "丰满区",
          "value": "220211"
        },
        {
          "label": "永吉县",
          "value": "220221"
        },
        {
          "label": "吉林经济开发区",
          "value": "220271"
        },
        {
          "label": "吉林高新技术产业开发区",
          "value": "220272"
        },
        {
          "label": "吉林中国新加坡食品区",
          "value": "220273"
        },
        {
          "label": "蛟河市",
          "value": "220281"
        },
        {
          "label": "桦甸市",
          "value": "220282"
        },
        {
          "label": "舒兰市",
          "value": "220283"
        },
        {
          "label": "磐石市",
          "value": "220284"
        }
      ],
      [
        {
          "label": "铁西区",
          "value": "220302"
        },
        {
          "label": "铁东区",
          "value": "220303"
        },
        {
          "label": "梨树县",
          "value": "220322"
        },
        {
          "label": "伊通满族自治县",
          "value": "220323"
        },
        {
          "label": "公主岭市",
          "value": "220381"
        },
        {
          "label": "双辽市",
          "value": "220382"
        }
      ],
      [
        {
          "label": "龙山区",
          "value": "220402"
        },
        {
          "label": "西安区",
          "value": "220403"
        },
        {
          "label": "东丰县",
          "value": "220421"
        },
        {
          "label": "东辽县",
          "value": "220422"
        }
      ],
      [
        {
          "label": "东昌区",
          "value": "220502"
        },
        {
          "label": "二道江区",
          "value": "220503"
        },
        {
          "label": "通化县",
          "value": "220521"
        },
        {
          "label": "辉南县",
          "value": "220523"
        },
        {
          "label": "柳河县",
          "value": "220524"
        },
        {
          "label": "梅河口市",
          "value": "220581"
        },
        {
          "label": "集安市",
          "value": "220582"
        }
      ],
      [
        {
          "label": "浑江区",
          "value": "220602"
        },
        {
          "label": "江源区",
          "value": "220605"
        },
        {
          "label": "抚松县",
          "value": "220621"
        },
        {
          "label": "靖宇县",
          "value": "220622"
        },
        {
          "label": "长白朝鲜族自治县",
          "value": "220623"
        },
        {
          "label": "临江市",
          "value": "220681"
        }
      ],
      [
        {
          "label": "宁江区",
          "value": "220702"
        },
        {
          "label": "前郭尔罗斯蒙古族自治县",
          "value": "220721"
        },
        {
          "label": "长岭县",
          "value": "220722"
        },
        {
          "label": "乾安县",
          "value": "220723"
        },
        {
          "label": "吉林松原经济开发区",
          "value": "220771"
        },
        {
          "label": "扶余市",
          "value": "220781"
        }
      ],
      [
        {
          "label": "洮北区",
          "value": "220802"
        },
        {
          "label": "镇赉县",
          "value": "220821"
        },
        {
          "label": "通榆县",
          "value": "220822"
        },
        {
          "label": "吉林白城经济开发区",
          "value": "220871"
        },
        {
          "label": "洮南市",
          "value": "220881"
        },
        {
          "label": "大安市",
          "value": "220882"
        }
      ],
      [
        {
          "label": "延吉市",
          "value": "222401"
        },
        {
          "label": "图们市",
          "value": "222402"
        },
        {
          "label": "敦化市",
          "value": "222403"
        },
        {
          "label": "珲春市",
          "value": "222404"
        },
        {
          "label": "龙井市",
          "value": "222405"
        },
        {
          "label": "和龙市",
          "value": "222406"
        },
        {
          "label": "汪清县",
          "value": "222424"
        },
        {
          "label": "安图县",
          "value": "222426"
        }
      ]
    ],
    [
      [
        {
          "label": "道里区",
          "value": "230102"
        },
        {
          "label": "南岗区",
          "value": "230103"
        },
        {
          "label": "道外区",
          "value": "230104"
        },
        {
          "label": "平房区",
          "value": "230108"
        },
        {
          "label": "松北区",
          "value": "230109"
        },
        {
          "label": "香坊区",
          "value": "230110"
        },
        {
          "label": "呼兰区",
          "value": "230111"
        },
        {
          "label": "阿城区",
          "value": "230112"
        },
        {
          "label": "双城区",
          "value": "230113"
        },
        {
          "label": "依兰县",
          "value": "230123"
        },
        {
          "label": "方正县",
          "value": "230124"
        },
        {
          "label": "宾县",
          "value": "230125"
        },
        {
          "label": "巴彦县",
          "value": "230126"
        },
        {
          "label": "木兰县",
          "value": "230127"
        },
        {
          "label": "通河县",
          "value": "230128"
        },
        {
          "label": "延寿县",
          "value": "230129"
        },
        {
          "label": "尚志市",
          "value": "230183"
        },
        {
          "label": "五常市",
          "value": "230184"
        }
      ],
      [
        {
          "label": "龙沙区",
          "value": "230202"
        },
        {
          "label": "建华区",
          "value": "230203"
        },
        {
          "label": "铁锋区",
          "value": "230204"
        },
        {
          "label": "昂昂溪区",
          "value": "230205"
        },
        {
          "label": "富拉尔基区",
          "value": "230206"
        },
        {
          "label": "碾子山区",
          "value": "230207"
        },
        {
          "label": "梅里斯达斡尔族区",
          "value": "230208"
        },
        {
          "label": "龙江县",
          "value": "230221"
        },
        {
          "label": "依安县",
          "value": "230223"
        },
        {
          "label": "泰来县",
          "value": "230224"
        },
        {
          "label": "甘南县",
          "value": "230225"
        },
        {
          "label": "富裕县",
          "value": "230227"
        },
        {
          "label": "克山县",
          "value": "230229"
        },
        {
          "label": "克东县",
          "value": "230230"
        },
        {
          "label": "拜泉县",
          "value": "230231"
        },
        {
          "label": "讷河市",
          "value": "230281"
        }
      ],
      [
        {
          "label": "鸡冠区",
          "value": "230302"
        },
        {
          "label": "恒山区",
          "value": "230303"
        },
        {
          "label": "滴道区",
          "value": "230304"
        },
        {
          "label": "梨树区",
          "value": "230305"
        },
        {
          "label": "城子河区",
          "value": "230306"
        },
        {
          "label": "麻山区",
          "value": "230307"
        },
        {
          "label": "鸡东县",
          "value": "230321"
        },
        {
          "label": "虎林市",
          "value": "230381"
        },
        {
          "label": "密山市",
          "value": "230382"
        }
      ],
      [
        {
          "label": "向阳区",
          "value": "230402"
        },
        {
          "label": "工农区",
          "value": "230403"
        },
        {
          "label": "南山区",
          "value": "230404"
        },
        {
          "label": "兴安区",
          "value": "230405"
        },
        {
          "label": "东山区",
          "value": "230406"
        },
        {
          "label": "兴山区",
          "value": "230407"
        },
        {
          "label": "萝北县",
          "value": "230421"
        },
        {
          "label": "绥滨县",
          "value": "230422"
        }
      ],
      [
        {
          "label": "尖山区",
          "value": "230502"
        },
        {
          "label": "岭东区",
          "value": "230503"
        },
        {
          "label": "四方台区",
          "value": "230505"
        },
        {
          "label": "宝山区",
          "value": "230506"
        },
        {
          "label": "集贤县",
          "value": "230521"
        },
        {
          "label": "友谊县",
          "value": "230522"
        },
        {
          "label": "宝清县",
          "value": "230523"
        },
        {
          "label": "饶河县",
          "value": "230524"
        }
      ],
      [
        {
          "label": "萨尔图区",
          "value": "230602"
        },
        {
          "label": "龙凤区",
          "value": "230603"
        },
        {
          "label": "让胡路区",
          "value": "230604"
        },
        {
          "label": "红岗区",
          "value": "230605"
        },
        {
          "label": "大同区",
          "value": "230606"
        },
        {
          "label": "肇州县",
          "value": "230621"
        },
        {
          "label": "肇源县",
          "value": "230622"
        },
        {
          "label": "林甸县",
          "value": "230623"
        },
        {
          "label": "杜尔伯特蒙古族自治县",
          "value": "230624"
        },
        {
          "label": "大庆高新技术产业开发区",
          "value": "230671"
        }
      ],
      [
        {
          "label": "伊春区",
          "value": "230702"
        },
        {
          "label": "南岔区",
          "value": "230703"
        },
        {
          "label": "友好区",
          "value": "230704"
        },
        {
          "label": "西林区",
          "value": "230705"
        },
        {
          "label": "翠峦区",
          "value": "230706"
        },
        {
          "label": "新青区",
          "value": "230707"
        },
        {
          "label": "美溪区",
          "value": "230708"
        },
        {
          "label": "金山屯区",
          "value": "230709"
        },
        {
          "label": "五营区",
          "value": "230710"
        },
        {
          "label": "乌马河区",
          "value": "230711"
        },
        {
          "label": "汤旺河区",
          "value": "230712"
        },
        {
          "label": "带岭区",
          "value": "230713"
        },
        {
          "label": "乌伊岭区",
          "value": "230714"
        },
        {
          "label": "红星区",
          "value": "230715"
        },
        {
          "label": "上甘岭区",
          "value": "230716"
        },
        {
          "label": "嘉荫县",
          "value": "230722"
        },
        {
          "label": "铁力市",
          "value": "230781"
        }
      ],
      [
        {
          "label": "向阳区",
          "value": "230803"
        },
        {
          "label": "前进区",
          "value": "230804"
        },
        {
          "label": "东风区",
          "value": "230805"
        },
        {
          "label": "郊区",
          "value": "230811"
        },
        {
          "label": "桦南县",
          "value": "230822"
        },
        {
          "label": "桦川县",
          "value": "230826"
        },
        {
          "label": "汤原县",
          "value": "230828"
        },
        {
          "label": "同江市",
          "value": "230881"
        },
        {
          "label": "富锦市",
          "value": "230882"
        },
        {
          "label": "抚远市",
          "value": "230883"
        }
      ],
      [
        {
          "label": "新兴区",
          "value": "230902"
        },
        {
          "label": "桃山区",
          "value": "230903"
        },
        {
          "label": "茄子河区",
          "value": "230904"
        },
        {
          "label": "勃利县",
          "value": "230921"
        }
      ],
      [
        {
          "label": "东安区",
          "value": "231002"
        },
        {
          "label": "阳明区",
          "value": "231003"
        },
        {
          "label": "爱民区",
          "value": "231004"
        },
        {
          "label": "西安区",
          "value": "231005"
        },
        {
          "label": "林口县",
          "value": "231025"
        },
        {
          "label": "牡丹江经济技术开发区",
          "value": "231071"
        },
        {
          "label": "绥芬河市",
          "value": "231081"
        },
        {
          "label": "海林市",
          "value": "231083"
        },
        {
          "label": "宁安市",
          "value": "231084"
        },
        {
          "label": "穆棱市",
          "value": "231085"
        },
        {
          "label": "东宁市",
          "value": "231086"
        }
      ],
      [
        {
          "label": "爱辉区",
          "value": "231102"
        },
        {
          "label": "嫩江县",
          "value": "231121"
        },
        {
          "label": "逊克县",
          "value": "231123"
        },
        {
          "label": "孙吴县",
          "value": "231124"
        },
        {
          "label": "北安市",
          "value": "231181"
        },
        {
          "label": "五大连池市",
          "value": "231182"
        }
      ],
      [
        {
          "label": "北林区",
          "value": "231202"
        },
        {
          "label": "望奎县",
          "value": "231221"
        },
        {
          "label": "兰西县",
          "value": "231222"
        },
        {
          "label": "青冈县",
          "value": "231223"
        },
        {
          "label": "庆安县",
          "value": "231224"
        },
        {
          "label": "明水县",
          "value": "231225"
        },
        {
          "label": "绥棱县",
          "value": "231226"
        },
        {
          "label": "安达市",
          "value": "231281"
        },
        {
          "label": "肇东市",
          "value": "231282"
        },
        {
          "label": "海伦市",
          "value": "231283"
        }
      ],
      [
        {
          "label": "加格达奇区",
          "value": "232701"
        },
        {
          "label": "松岭区",
          "value": "232702"
        },
        {
          "label": "新林区",
          "value": "232703"
        },
        {
          "label": "呼中区",
          "value": "232704"
        },
        {
          "label": "呼玛县",
          "value": "232721"
        },
        {
          "label": "塔河县",
          "value": "232722"
        },
        {
          "label": "漠河县",
          "value": "232723"
        }
      ]
    ],
    [
      [
        {
          "label": "黄浦区",
          "value": "310101"
        },
        {
          "label": "徐汇区",
          "value": "310104"
        },
        {
          "label": "长宁区",
          "value": "310105"
        },
        {
          "label": "静安区",
          "value": "310106"
        },
        {
          "label": "普陀区",
          "value": "310107"
        },
        {
          "label": "虹口区",
          "value": "310109"
        },
        {
          "label": "杨浦区",
          "value": "310110"
        },
        {
          "label": "闵行区",
          "value": "310112"
        },
        {
          "label": "宝山区",
          "value": "310113"
        },
        {
          "label": "嘉定区",
          "value": "310114"
        },
        {
          "label": "浦东新区",
          "value": "310115"
        },
        {
          "label": "金山区",
          "value": "310116"
        },
        {
          "label": "松江区",
          "value": "310117"
        },
        {
          "label": "青浦区",
          "value": "310118"
        },
        {
          "label": "奉贤区",
          "value": "310120"
        },
        {
          "label": "崇明区",
          "value": "310151"
        }
      ]
    ],
    [
      [
        {
          "label": "玄武区",
          "value": "320102"
        },
        {
          "label": "秦淮区",
          "value": "320104"
        },
        {
          "label": "建邺区",
          "value": "320105"
        },
        {
          "label": "鼓楼区",
          "value": "320106"
        },
        {
          "label": "浦口区",
          "value": "320111"
        },
        {
          "label": "栖霞区",
          "value": "320113"
        },
        {
          "label": "雨花台区",
          "value": "320114"
        },
        {
          "label": "江宁区",
          "value": "320115"
        },
        {
          "label": "六合区",
          "value": "320116"
        },
        {
          "label": "溧水区",
          "value": "320117"
        },
        {
          "label": "高淳区",
          "value": "320118"
        }
      ],
      [
        {
          "label": "锡山区",
          "value": "320205"
        },
        {
          "label": "惠山区",
          "value": "320206"
        },
        {
          "label": "滨湖区",
          "value": "320211"
        },
        {
          "label": "梁溪区",
          "value": "320213"
        },
        {
          "label": "新吴区",
          "value": "320214"
        },
        {
          "label": "江阴市",
          "value": "320281"
        },
        {
          "label": "宜兴市",
          "value": "320282"
        }
      ],
      [
        {
          "label": "鼓楼区",
          "value": "320302"
        },
        {
          "label": "云龙区",
          "value": "320303"
        },
        {
          "label": "贾汪区",
          "value": "320305"
        },
        {
          "label": "泉山区",
          "value": "320311"
        },
        {
          "label": "铜山区",
          "value": "320312"
        },
        {
          "label": "丰县",
          "value": "320321"
        },
        {
          "label": "沛县",
          "value": "320322"
        },
        {
          "label": "睢宁县",
          "value": "320324"
        },
        {
          "label": "徐州经济技术开发区",
          "value": "320371"
        },
        {
          "label": "新沂市",
          "value": "320381"
        },
        {
          "label": "邳州市",
          "value": "320382"
        }
      ],
      [
        {
          "label": "天宁区",
          "value": "320402"
        },
        {
          "label": "钟楼区",
          "value": "320404"
        },
        {
          "label": "新北区",
          "value": "320411"
        },
        {
          "label": "武进区",
          "value": "320412"
        },
        {
          "label": "金坛区",
          "value": "320413"
        },
        {
          "label": "溧阳市",
          "value": "320481"
        }
      ],
      [
        {
          "label": "虎丘区",
          "value": "320505"
        },
        {
          "label": "吴中区",
          "value": "320506"
        },
        {
          "label": "相城区",
          "value": "320507"
        },
        {
          "label": "姑苏区",
          "value": "320508"
        },
        {
          "label": "吴江区",
          "value": "320509"
        },
        {
          "label": "苏州工业园区",
          "value": "320571"
        },
        {
          "label": "常熟市",
          "value": "320581"
        },
        {
          "label": "张家港市",
          "value": "320582"
        },
        {
          "label": "昆山市",
          "value": "320583"
        },
        {
          "label": "太仓市",
          "value": "320585"
        }
      ],
      [
        {
          "label": "崇川区",
          "value": "320602"
        },
        {
          "label": "港闸区",
          "value": "320611"
        },
        {
          "label": "通州区",
          "value": "320612"
        },
        {
          "label": "海安县",
          "value": "320621"
        },
        {
          "label": "如东县",
          "value": "320623"
        },
        {
          "label": "南通经济技术开发区",
          "value": "320671"
        },
        {
          "label": "启东市",
          "value": "320681"
        },
        {
          "label": "如皋市",
          "value": "320682"
        },
        {
          "label": "海门市",
          "value": "320684"
        }
      ],
      [
        {
          "label": "连云区",
          "value": "320703"
        },
        {
          "label": "海州区",
          "value": "320706"
        },
        {
          "label": "赣榆区",
          "value": "320707"
        },
        {
          "label": "东海县",
          "value": "320722"
        },
        {
          "label": "灌云县",
          "value": "320723"
        },
        {
          "label": "灌南县",
          "value": "320724"
        },
        {
          "label": "连云港经济技术开发区",
          "value": "320771"
        },
        {
          "label": "连云港高新技术产业开发区",
          "value": "320772"
        }
      ],
      [
        {
          "label": "淮安区",
          "value": "320803"
        },
        {
          "label": "淮阴区",
          "value": "320804"
        },
        {
          "label": "清江浦区",
          "value": "320812"
        },
        {
          "label": "洪泽区",
          "value": "320813"
        },
        {
          "label": "涟水县",
          "value": "320826"
        },
        {
          "label": "盱眙县",
          "value": "320830"
        },
        {
          "label": "金湖县",
          "value": "320831"
        },
        {
          "label": "淮安经济技术开发区",
          "value": "320871"
        }
      ],
      [
        {
          "label": "亭湖区",
          "value": "320902"
        },
        {
          "label": "盐都区",
          "value": "320903"
        },
        {
          "label": "大丰区",
          "value": "320904"
        },
        {
          "label": "响水县",
          "value": "320921"
        },
        {
          "label": "滨海县",
          "value": "320922"
        },
        {
          "label": "阜宁县",
          "value": "320923"
        },
        {
          "label": "射阳县",
          "value": "320924"
        },
        {
          "label": "建湖县",
          "value": "320925"
        },
        {
          "label": "盐城经济技术开发区",
          "value": "320971"
        },
        {
          "label": "东台市",
          "value": "320981"
        }
      ],
      [
        {
          "label": "广陵区",
          "value": "321002"
        },
        {
          "label": "邗江区",
          "value": "321003"
        },
        {
          "label": "江都区",
          "value": "321012"
        },
        {
          "label": "宝应县",
          "value": "321023"
        },
        {
          "label": "扬州经济技术开发区",
          "value": "321071"
        },
        {
          "label": "仪征市",
          "value": "321081"
        },
        {
          "label": "高邮市",
          "value": "321084"
        }
      ],
      [
        {
          "label": "京口区",
          "value": "321102"
        },
        {
          "label": "润州区",
          "value": "321111"
        },
        {
          "label": "丹徒区",
          "value": "321112"
        },
        {
          "label": "镇江新区",
          "value": "321171"
        },
        {
          "label": "丹阳市",
          "value": "321181"
        },
        {
          "label": "扬中市",
          "value": "321182"
        },
        {
          "label": "句容市",
          "value": "321183"
        }
      ],
      [
        {
          "label": "海陵区",
          "value": "321202"
        },
        {
          "label": "高港区",
          "value": "321203"
        },
        {
          "label": "姜堰区",
          "value": "321204"
        },
        {
          "label": "泰州医药高新技术产业开发区",
          "value": "321271"
        },
        {
          "label": "兴化市",
          "value": "321281"
        },
        {
          "label": "靖江市",
          "value": "321282"
        },
        {
          "label": "泰兴市",
          "value": "321283"
        }
      ],
      [
        {
          "label": "宿城区",
          "value": "321302"
        },
        {
          "label": "宿豫区",
          "value": "321311"
        },
        {
          "label": "沭阳县",
          "value": "321322"
        },
        {
          "label": "泗阳县",
          "value": "321323"
        },
        {
          "label": "泗洪县",
          "value": "321324"
        },
        {
          "label": "宿迁经济技术开发区",
          "value": "321371"
        }
      ]
    ],
    [
      [
        {
          "label": "上城区",
          "value": "330102"
        },
        {
          "label": "下城区",
          "value": "330103"
        },
        {
          "label": "江干区",
          "value": "330104"
        },
        {
          "label": "拱墅区",
          "value": "330105"
        },
        {
          "label": "西湖区",
          "value": "330106"
        },
        {
          "label": "滨江区",
          "value": "330108"
        },
        {
          "label": "萧山区",
          "value": "330109"
        },
        {
          "label": "余杭区",
          "value": "330110"
        },
        {
          "label": "富阳区",
          "value": "330111"
        },
        {
          "label": "临安区",
          "value": "330112"
        },
        {
          "label": "桐庐县",
          "value": "330122"
        },
        {
          "label": "淳安县",
          "value": "330127"
        },
        {
          "label": "建德市",
          "value": "330182"
        }
      ],
      [
        {
          "label": "海曙区",
          "value": "330203"
        },
        {
          "label": "江北区",
          "value": "330205"
        },
        {
          "label": "北仑区",
          "value": "330206"
        },
        {
          "label": "镇海区",
          "value": "330211"
        },
        {
          "label": "鄞州区",
          "value": "330212"
        },
        {
          "label": "奉化区",
          "value": "330213"
        },
        {
          "label": "象山县",
          "value": "330225"
        },
        {
          "label": "宁海县",
          "value": "330226"
        },
        {
          "label": "余姚市",
          "value": "330281"
        },
        {
          "label": "慈溪市",
          "value": "330282"
        }
      ],
      [
        {
          "label": "鹿城区",
          "value": "330302"
        },
        {
          "label": "龙湾区",
          "value": "330303"
        },
        {
          "label": "瓯海区",
          "value": "330304"
        },
        {
          "label": "洞头区",
          "value": "330305"
        },
        {
          "label": "永嘉县",
          "value": "330324"
        },
        {
          "label": "平阳县",
          "value": "330326"
        },
        {
          "label": "苍南县",
          "value": "330327"
        },
        {
          "label": "文成县",
          "value": "330328"
        },
        {
          "label": "泰顺县",
          "value": "330329"
        },
        {
          "label": "温州经济技术开发区",
          "value": "330371"
        },
        {
          "label": "瑞安市",
          "value": "330381"
        },
        {
          "label": "乐清市",
          "value": "330382"
        }
      ],
      [
        {
          "label": "南湖区",
          "value": "330402"
        },
        {
          "label": "秀洲区",
          "value": "330411"
        },
        {
          "label": "嘉善县",
          "value": "330421"
        },
        {
          "label": "海盐县",
          "value": "330424"
        },
        {
          "label": "海宁市",
          "value": "330481"
        },
        {
          "label": "平湖市",
          "value": "330482"
        },
        {
          "label": "桐乡市",
          "value": "330483"
        }
      ],
      [
        {
          "label": "吴兴区",
          "value": "330502"
        },
        {
          "label": "南浔区",
          "value": "330503"
        },
        {
          "label": "德清县",
          "value": "330521"
        },
        {
          "label": "长兴县",
          "value": "330522"
        },
        {
          "label": "安吉县",
          "value": "330523"
        }
      ],
      [
        {
          "label": "越城区",
          "value": "330602"
        },
        {
          "label": "柯桥区",
          "value": "330603"
        },
        {
          "label": "上虞区",
          "value": "330604"
        },
        {
          "label": "新昌县",
          "value": "330624"
        },
        {
          "label": "诸暨市",
          "value": "330681"
        },
        {
          "label": "嵊州市",
          "value": "330683"
        }
      ],
      [
        {
          "label": "婺城区",
          "value": "330702"
        },
        {
          "label": "金东区",
          "value": "330703"
        },
        {
          "label": "武义县",
          "value": "330723"
        },
        {
          "label": "浦江县",
          "value": "330726"
        },
        {
          "label": "磐安县",
          "value": "330727"
        },
        {
          "label": "兰溪市",
          "value": "330781"
        },
        {
          "label": "义乌市",
          "value": "330782"
        },
        {
          "label": "东阳市",
          "value": "330783"
        },
        {
          "label": "永康市",
          "value": "330784"
        }
      ],
      [
        {
          "label": "柯城区",
          "value": "330802"
        },
        {
          "label": "衢江区",
          "value": "330803"
        },
        {
          "label": "常山县",
          "value": "330822"
        },
        {
          "label": "开化县",
          "value": "330824"
        },
        {
          "label": "龙游县",
          "value": "330825"
        },
        {
          "label": "江山市",
          "value": "330881"
        }
      ],
      [
        {
          "label": "定海区",
          "value": "330902"
        },
        {
          "label": "普陀区",
          "value": "330903"
        },
        {
          "label": "岱山县",
          "value": "330921"
        },
        {
          "label": "嵊泗县",
          "value": "330922"
        }
      ],
      [
        {
          "label": "椒江区",
          "value": "331002"
        },
        {
          "label": "黄岩区",
          "value": "331003"
        },
        {
          "label": "路桥区",
          "value": "331004"
        },
        {
          "label": "三门县",
          "value": "331022"
        },
        {
          "label": "天台县",
          "value": "331023"
        },
        {
          "label": "仙居县",
          "value": "331024"
        },
        {
          "label": "温岭市",
          "value": "331081"
        },
        {
          "label": "临海市",
          "value": "331082"
        },
        {
          "label": "玉环市",
          "value": "331083"
        }
      ],
      [
        {
          "label": "莲都区",
          "value": "331102"
        },
        {
          "label": "青田县",
          "value": "331121"
        },
        {
          "label": "缙云县",
          "value": "331122"
        },
        {
          "label": "遂昌县",
          "value": "331123"
        },
        {
          "label": "松阳县",
          "value": "331124"
        },
        {
          "label": "云和县",
          "value": "331125"
        },
        {
          "label": "庆元县",
          "value": "331126"
        },
        {
          "label": "景宁畲族自治县",
          "value": "331127"
        },
        {
          "label": "龙泉市",
          "value": "331181"
        }
      ]
    ],
    [
      [
        {
          "label": "瑶海区",
          "value": "340102"
        },
        {
          "label": "庐阳区",
          "value": "340103"
        },
        {
          "label": "蜀山区",
          "value": "340104"
        },
        {
          "label": "包河区",
          "value": "340111"
        },
        {
          "label": "长丰县",
          "value": "340121"
        },
        {
          "label": "肥东县",
          "value": "340122"
        },
        {
          "label": "肥西县",
          "value": "340123"
        },
        {
          "label": "庐江县",
          "value": "340124"
        },
        {
          "label": "合肥高新技术产业开发区",
          "value": "340171"
        },
        {
          "label": "合肥经济技术开发区",
          "value": "340172"
        },
        {
          "label": "合肥新站高新技术产业开发区",
          "value": "340173"
        },
        {
          "label": "巢湖市",
          "value": "340181"
        }
      ],
      [
        {
          "label": "镜湖区",
          "value": "340202"
        },
        {
          "label": "弋江区",
          "value": "340203"
        },
        {
          "label": "鸠江区",
          "value": "340207"
        },
        {
          "label": "三山区",
          "value": "340208"
        },
        {
          "label": "芜湖县",
          "value": "340221"
        },
        {
          "label": "繁昌县",
          "value": "340222"
        },
        {
          "label": "南陵县",
          "value": "340223"
        },
        {
          "label": "无为县",
          "value": "340225"
        },
        {
          "label": "芜湖经济技术开发区",
          "value": "340271"
        },
        {
          "label": "安徽芜湖长江大桥经济开发区",
          "value": "340272"
        }
      ],
      [
        {
          "label": "龙子湖区",
          "value": "340302"
        },
        {
          "label": "蚌山区",
          "value": "340303"
        },
        {
          "label": "禹会区",
          "value": "340304"
        },
        {
          "label": "淮上区",
          "value": "340311"
        },
        {
          "label": "怀远县",
          "value": "340321"
        },
        {
          "label": "五河县",
          "value": "340322"
        },
        {
          "label": "固镇县",
          "value": "340323"
        },
        {
          "label": "蚌埠市高新技术开发区",
          "value": "340371"
        },
        {
          "label": "蚌埠市经济开发区",
          "value": "340372"
        }
      ],
      [
        {
          "label": "大通区",
          "value": "340402"
        },
        {
          "label": "田家庵区",
          "value": "340403"
        },
        {
          "label": "谢家集区",
          "value": "340404"
        },
        {
          "label": "八公山区",
          "value": "340405"
        },
        {
          "label": "潘集区",
          "value": "340406"
        },
        {
          "label": "凤台县",
          "value": "340421"
        },
        {
          "label": "寿县",
          "value": "340422"
        }
      ],
      [
        {
          "label": "花山区",
          "value": "340503"
        },
        {
          "label": "雨山区",
          "value": "340504"
        },
        {
          "label": "博望区",
          "value": "340506"
        },
        {
          "label": "当涂县",
          "value": "340521"
        },
        {
          "label": "含山县",
          "value": "340522"
        },
        {
          "label": "和县",
          "value": "340523"
        }
      ],
      [
        {
          "label": "杜集区",
          "value": "340602"
        },
        {
          "label": "相山区",
          "value": "340603"
        },
        {
          "label": "烈山区",
          "value": "340604"
        },
        {
          "label": "濉溪县",
          "value": "340621"
        }
      ],
      [
        {
          "label": "铜官区",
          "value": "340705"
        },
        {
          "label": "义安区",
          "value": "340706"
        },
        {
          "label": "郊区",
          "value": "340711"
        },
        {
          "label": "枞阳县",
          "value": "340722"
        }
      ],
      [
        {
          "label": "迎江区",
          "value": "340802"
        },
        {
          "label": "大观区",
          "value": "340803"
        },
        {
          "label": "宜秀区",
          "value": "340811"
        },
        {
          "label": "怀宁县",
          "value": "340822"
        },
        {
          "label": "潜山县",
          "value": "340824"
        },
        {
          "label": "太湖县",
          "value": "340825"
        },
        {
          "label": "宿松县",
          "value": "340826"
        },
        {
          "label": "望江县",
          "value": "340827"
        },
        {
          "label": "岳西县",
          "value": "340828"
        },
        {
          "label": "安徽安庆经济开发区",
          "value": "340871"
        },
        {
          "label": "桐城市",
          "value": "340881"
        }
      ],
      [
        {
          "label": "屯溪区",
          "value": "341002"
        },
        {
          "label": "黄山区",
          "value": "341003"
        },
        {
          "label": "徽州区",
          "value": "341004"
        },
        {
          "label": "歙县",
          "value": "341021"
        },
        {
          "label": "休宁县",
          "value": "341022"
        },
        {
          "label": "黟县",
          "value": "341023"
        },
        {
          "label": "祁门县",
          "value": "341024"
        }
      ],
      [
        {
          "label": "琅琊区",
          "value": "341102"
        },
        {
          "label": "南谯区",
          "value": "341103"
        },
        {
          "label": "来安县",
          "value": "341122"
        },
        {
          "label": "全椒县",
          "value": "341124"
        },
        {
          "label": "定远县",
          "value": "341125"
        },
        {
          "label": "凤阳县",
          "value": "341126"
        },
        {
          "label": "苏滁现代产业园",
          "value": "341171"
        },
        {
          "label": "滁州经济技术开发区",
          "value": "341172"
        },
        {
          "label": "天长市",
          "value": "341181"
        },
        {
          "label": "明光市",
          "value": "341182"
        }
      ],
      [
        {
          "label": "颍州区",
          "value": "341202"
        },
        {
          "label": "颍东区",
          "value": "341203"
        },
        {
          "label": "颍泉区",
          "value": "341204"
        },
        {
          "label": "临泉县",
          "value": "341221"
        },
        {
          "label": "太和县",
          "value": "341222"
        },
        {
          "label": "阜南县",
          "value": "341225"
        },
        {
          "label": "颍上县",
          "value": "341226"
        },
        {
          "label": "阜阳合肥现代产业园区",
          "value": "341271"
        },
        {
          "label": "阜阳经济技术开发区",
          "value": "341272"
        },
        {
          "label": "界首市",
          "value": "341282"
        }
      ],
      [
        {
          "label": "埇桥区",
          "value": "341302"
        },
        {
          "label": "砀山县",
          "value": "341321"
        },
        {
          "label": "萧县",
          "value": "341322"
        },
        {
          "label": "灵璧县",
          "value": "341323"
        },
        {
          "label": "泗县",
          "value": "341324"
        },
        {
          "label": "宿州马鞍山现代产业园区",
          "value": "341371"
        },
        {
          "label": "宿州经济技术开发区",
          "value": "341372"
        }
      ],
      [
        {
          "label": "金安区",
          "value": "341502"
        },
        {
          "label": "裕安区",
          "value": "341503"
        },
        {
          "label": "叶集区",
          "value": "341504"
        },
        {
          "label": "霍邱县",
          "value": "341522"
        },
        {
          "label": "舒城县",
          "value": "341523"
        },
        {
          "label": "金寨县",
          "value": "341524"
        },
        {
          "label": "霍山县",
          "value": "341525"
        }
      ],
      [
        {
          "label": "谯城区",
          "value": "341602"
        },
        {
          "label": "涡阳县",
          "value": "341621"
        },
        {
          "label": "蒙城县",
          "value": "341622"
        },
        {
          "label": "利辛县",
          "value": "341623"
        }
      ],
      [
        {
          "label": "贵池区",
          "value": "341702"
        },
        {
          "label": "东至县",
          "value": "341721"
        },
        {
          "label": "石台县",
          "value": "341722"
        },
        {
          "label": "青阳县",
          "value": "341723"
        }
      ],
      [
        {
          "label": "宣州区",
          "value": "341802"
        },
        {
          "label": "郎溪县",
          "value": "341821"
        },
        {
          "label": "广德县",
          "value": "341822"
        },
        {
          "label": "泾县",
          "value": "341823"
        },
        {
          "label": "绩溪县",
          "value": "341824"
        },
        {
          "label": "旌德县",
          "value": "341825"
        },
        {
          "label": "宣城市经济开发区",
          "value": "341871"
        },
        {
          "label": "宁国市",
          "value": "341881"
        }
      ]
    ],
    [
      [
        {
          "label": "鼓楼区",
          "value": "350102"
        },
        {
          "label": "台江区",
          "value": "350103"
        },
        {
          "label": "仓山区",
          "value": "350104"
        },
        {
          "label": "马尾区",
          "value": "350105"
        },
        {
          "label": "晋安区",
          "value": "350111"
        },
        {
          "label": "闽侯县",
          "value": "350121"
        },
        {
          "label": "连江县",
          "value": "350122"
        },
        {
          "label": "罗源县",
          "value": "350123"
        },
        {
          "label": "闽清县",
          "value": "350124"
        },
        {
          "label": "永泰县",
          "value": "350125"
        },
        {
          "label": "平潭县",
          "value": "350128"
        },
        {
          "label": "福清市",
          "value": "350181"
        },
        {
          "label": "长乐市",
          "value": "350182"
        }
      ],
      [
        {
          "label": "思明区",
          "value": "350203"
        },
        {
          "label": "海沧区",
          "value": "350205"
        },
        {
          "label": "湖里区",
          "value": "350206"
        },
        {
          "label": "集美区",
          "value": "350211"
        },
        {
          "label": "同安区",
          "value": "350212"
        },
        {
          "label": "翔安区",
          "value": "350213"
        }
      ],
      [
        {
          "label": "城厢区",
          "value": "350302"
        },
        {
          "label": "涵江区",
          "value": "350303"
        },
        {
          "label": "荔城区",
          "value": "350304"
        },
        {
          "label": "秀屿区",
          "value": "350305"
        },
        {
          "label": "仙游县",
          "value": "350322"
        }
      ],
      [
        {
          "label": "梅列区",
          "value": "350402"
        },
        {
          "label": "三元区",
          "value": "350403"
        },
        {
          "label": "明溪县",
          "value": "350421"
        },
        {
          "label": "清流县",
          "value": "350423"
        },
        {
          "label": "宁化县",
          "value": "350424"
        },
        {
          "label": "大田县",
          "value": "350425"
        },
        {
          "label": "尤溪县",
          "value": "350426"
        },
        {
          "label": "沙县",
          "value": "350427"
        },
        {
          "label": "将乐县",
          "value": "350428"
        },
        {
          "label": "泰宁县",
          "value": "350429"
        },
        {
          "label": "建宁县",
          "value": "350430"
        },
        {
          "label": "永安市",
          "value": "350481"
        }
      ],
      [
        {
          "label": "鲤城区",
          "value": "350502"
        },
        {
          "label": "丰泽区",
          "value": "350503"
        },
        {
          "label": "洛江区",
          "value": "350504"
        },
        {
          "label": "泉港区",
          "value": "350505"
        },
        {
          "label": "惠安县",
          "value": "350521"
        },
        {
          "label": "安溪县",
          "value": "350524"
        },
        {
          "label": "永春县",
          "value": "350525"
        },
        {
          "label": "德化县",
          "value": "350526"
        },
        {
          "label": "金门县",
          "value": "350527"
        },
        {
          "label": "石狮市",
          "value": "350581"
        },
        {
          "label": "晋江市",
          "value": "350582"
        },
        {
          "label": "南安市",
          "value": "350583"
        }
      ],
      [
        {
          "label": "芗城区",
          "value": "350602"
        },
        {
          "label": "龙文区",
          "value": "350603"
        },
        {
          "label": "云霄县",
          "value": "350622"
        },
        {
          "label": "漳浦县",
          "value": "350623"
        },
        {
          "label": "诏安县",
          "value": "350624"
        },
        {
          "label": "长泰县",
          "value": "350625"
        },
        {
          "label": "东山县",
          "value": "350626"
        },
        {
          "label": "南靖县",
          "value": "350627"
        },
        {
          "label": "平和县",
          "value": "350628"
        },
        {
          "label": "华安县",
          "value": "350629"
        },
        {
          "label": "龙海市",
          "value": "350681"
        }
      ],
      [
        {
          "label": "延平区",
          "value": "350702"
        },
        {
          "label": "建阳区",
          "value": "350703"
        },
        {
          "label": "顺昌县",
          "value": "350721"
        },
        {
          "label": "浦城县",
          "value": "350722"
        },
        {
          "label": "光泽县",
          "value": "350723"
        },
        {
          "label": "松溪县",
          "value": "350724"
        },
        {
          "label": "政和县",
          "value": "350725"
        },
        {
          "label": "邵武市",
          "value": "350781"
        },
        {
          "label": "武夷山市",
          "value": "350782"
        },
        {
          "label": "建瓯市",
          "value": "350783"
        }
      ],
      [
        {
          "label": "新罗区",
          "value": "350802"
        },
        {
          "label": "永定区",
          "value": "350803"
        },
        {
          "label": "长汀县",
          "value": "350821"
        },
        {
          "label": "上杭县",
          "value": "350823"
        },
        {
          "label": "武平县",
          "value": "350824"
        },
        {
          "label": "连城县",
          "value": "350825"
        },
        {
          "label": "漳平市",
          "value": "350881"
        }
      ],
      [
        {
          "label": "蕉城区",
          "value": "350902"
        },
        {
          "label": "霞浦县",
          "value": "350921"
        },
        {
          "label": "古田县",
          "value": "350922"
        },
        {
          "label": "屏南县",
          "value": "350923"
        },
        {
          "label": "寿宁县",
          "value": "350924"
        },
        {
          "label": "周宁县",
          "value": "350925"
        },
        {
          "label": "柘荣县",
          "value": "350926"
        },
        {
          "label": "福安市",
          "value": "350981"
        },
        {
          "label": "福鼎市",
          "value": "350982"
        }
      ]
    ],
    [
      [
        {
          "label": "东湖区",
          "value": "360102"
        },
        {
          "label": "西湖区",
          "value": "360103"
        },
        {
          "label": "青云谱区",
          "value": "360104"
        },
        {
          "label": "湾里区",
          "value": "360105"
        },
        {
          "label": "青山湖区",
          "value": "360111"
        },
        {
          "label": "新建区",
          "value": "360112"
        },
        {
          "label": "南昌县",
          "value": "360121"
        },
        {
          "label": "安义县",
          "value": "360123"
        },
        {
          "label": "进贤县",
          "value": "360124"
        }
      ],
      [
        {
          "label": "昌江区",
          "value": "360202"
        },
        {
          "label": "珠山区",
          "value": "360203"
        },
        {
          "label": "浮梁县",
          "value": "360222"
        },
        {
          "label": "乐平市",
          "value": "360281"
        }
      ],
      [
        {
          "label": "安源区",
          "value": "360302"
        },
        {
          "label": "湘东区",
          "value": "360313"
        },
        {
          "label": "莲花县",
          "value": "360321"
        },
        {
          "label": "上栗县",
          "value": "360322"
        },
        {
          "label": "芦溪县",
          "value": "360323"
        }
      ],
      [
        {
          "label": "濂溪区",
          "value": "360402"
        },
        {
          "label": "浔阳区",
          "value": "360403"
        },
        {
          "label": "柴桑区",
          "value": "360404"
        },
        {
          "label": "武宁县",
          "value": "360423"
        },
        {
          "label": "修水县",
          "value": "360424"
        },
        {
          "label": "永修县",
          "value": "360425"
        },
        {
          "label": "德安县",
          "value": "360426"
        },
        {
          "label": "都昌县",
          "value": "360428"
        },
        {
          "label": "湖口县",
          "value": "360429"
        },
        {
          "label": "彭泽县",
          "value": "360430"
        },
        {
          "label": "瑞昌市",
          "value": "360481"
        },
        {
          "label": "共青城市",
          "value": "360482"
        },
        {
          "label": "庐山市",
          "value": "360483"
        }
      ],
      [
        {
          "label": "渝水区",
          "value": "360502"
        },
        {
          "label": "分宜县",
          "value": "360521"
        }
      ],
      [
        {
          "label": "月湖区",
          "value": "360602"
        },
        {
          "label": "余江县",
          "value": "360622"
        },
        {
          "label": "贵溪市",
          "value": "360681"
        }
      ],
      [
        {
          "label": "章贡区",
          "value": "360702"
        },
        {
          "label": "南康区",
          "value": "360703"
        },
        {
          "label": "赣县区",
          "value": "360704"
        },
        {
          "label": "信丰县",
          "value": "360722"
        },
        {
          "label": "大余县",
          "value": "360723"
        },
        {
          "label": "上犹县",
          "value": "360724"
        },
        {
          "label": "崇义县",
          "value": "360725"
        },
        {
          "label": "安远县",
          "value": "360726"
        },
        {
          "label": "龙南县",
          "value": "360727"
        },
        {
          "label": "定南县",
          "value": "360728"
        },
        {
          "label": "全南县",
          "value": "360729"
        },
        {
          "label": "宁都县",
          "value": "360730"
        },
        {
          "label": "于都县",
          "value": "360731"
        },
        {
          "label": "兴国县",
          "value": "360732"
        },
        {
          "label": "会昌县",
          "value": "360733"
        },
        {
          "label": "寻乌县",
          "value": "360734"
        },
        {
          "label": "石城县",
          "value": "360735"
        },
        {
          "label": "瑞金市",
          "value": "360781"
        }
      ],
      [
        {
          "label": "吉州区",
          "value": "360802"
        },
        {
          "label": "青原区",
          "value": "360803"
        },
        {
          "label": "吉安县",
          "value": "360821"
        },
        {
          "label": "吉水县",
          "value": "360822"
        },
        {
          "label": "峡江县",
          "value": "360823"
        },
        {
          "label": "新干县",
          "value": "360824"
        },
        {
          "label": "永丰县",
          "value": "360825"
        },
        {
          "label": "泰和县",
          "value": "360826"
        },
        {
          "label": "遂川县",
          "value": "360827"
        },
        {
          "label": "万安县",
          "value": "360828"
        },
        {
          "label": "安福县",
          "value": "360829"
        },
        {
          "label": "永新县",
          "value": "360830"
        },
        {
          "label": "井冈山市",
          "value": "360881"
        }
      ],
      [
        {
          "label": "袁州区",
          "value": "360902"
        },
        {
          "label": "奉新县",
          "value": "360921"
        },
        {
          "label": "万载县",
          "value": "360922"
        },
        {
          "label": "上高县",
          "value": "360923"
        },
        {
          "label": "宜丰县",
          "value": "360924"
        },
        {
          "label": "靖安县",
          "value": "360925"
        },
        {
          "label": "铜鼓县",
          "value": "360926"
        },
        {
          "label": "丰城市",
          "value": "360981"
        },
        {
          "label": "樟树市",
          "value": "360982"
        },
        {
          "label": "高安市",
          "value": "360983"
        }
      ],
      [
        {
          "label": "临川区",
          "value": "361002"
        },
        {
          "label": "东乡区",
          "value": "361003"
        },
        {
          "label": "南城县",
          "value": "361021"
        },
        {
          "label": "黎川县",
          "value": "361022"
        },
        {
          "label": "南丰县",
          "value": "361023"
        },
        {
          "label": "崇仁县",
          "value": "361024"
        },
        {
          "label": "乐安县",
          "value": "361025"
        },
        {
          "label": "宜黄县",
          "value": "361026"
        },
        {
          "label": "金溪县",
          "value": "361027"
        },
        {
          "label": "资溪县",
          "value": "361028"
        },
        {
          "label": "广昌县",
          "value": "361030"
        }
      ],
      [
        {
          "label": "信州区",
          "value": "361102"
        },
        {
          "label": "广丰区",
          "value": "361103"
        },
        {
          "label": "上饶县",
          "value": "361121"
        },
        {
          "label": "玉山县",
          "value": "361123"
        },
        {
          "label": "铅山县",
          "value": "361124"
        },
        {
          "label": "横峰县",
          "value": "361125"
        },
        {
          "label": "弋阳县",
          "value": "361126"
        },
        {
          "label": "余干县",
          "value": "361127"
        },
        {
          "label": "鄱阳县",
          "value": "361128"
        },
        {
          "label": "万年县",
          "value": "361129"
        },
        {
          "label": "婺源县",
          "value": "361130"
        },
        {
          "label": "德兴市",
          "value": "361181"
        }
      ]
    ],
    [
      [
        {
          "label": "历下区",
          "value": "370102"
        },
        {
          "label": "市中区",
          "value": "370103"
        },
        {
          "label": "槐荫区",
          "value": "370104"
        },
        {
          "label": "天桥区",
          "value": "370105"
        },
        {
          "label": "历城区",
          "value": "370112"
        },
        {
          "label": "长清区",
          "value": "370113"
        },
        {
          "label": "章丘区",
          "value": "370114"
        },
        {
          "label": "平阴县",
          "value": "370124"
        },
        {
          "label": "济阳县",
          "value": "370125"
        },
        {
          "label": "商河县",
          "value": "370126"
        },
        {
          "label": "济南高新技术产业开发区",
          "value": "370171"
        }
      ],
      [
        {
          "label": "市南区",
          "value": "370202"
        },
        {
          "label": "市北区",
          "value": "370203"
        },
        {
          "label": "黄岛区",
          "value": "370211"
        },
        {
          "label": "崂山区",
          "value": "370212"
        },
        {
          "label": "李沧区",
          "value": "370213"
        },
        {
          "label": "城阳区",
          "value": "370214"
        },
        {
          "label": "即墨区",
          "value": "370215"
        },
        {
          "label": "青岛高新技术产业开发区",
          "value": "370271"
        },
        {
          "label": "胶州市",
          "value": "370281"
        },
        {
          "label": "平度市",
          "value": "370283"
        },
        {
          "label": "莱西市",
          "value": "370285"
        }
      ],
      [
        {
          "label": "淄川区",
          "value": "370302"
        },
        {
          "label": "张店区",
          "value": "370303"
        },
        {
          "label": "博山区",
          "value": "370304"
        },
        {
          "label": "临淄区",
          "value": "370305"
        },
        {
          "label": "周村区",
          "value": "370306"
        },
        {
          "label": "桓台县",
          "value": "370321"
        },
        {
          "label": "高青县",
          "value": "370322"
        },
        {
          "label": "沂源县",
          "value": "370323"
        }
      ],
      [
        {
          "label": "市中区",
          "value": "370402"
        },
        {
          "label": "薛城区",
          "value": "370403"
        },
        {
          "label": "峄城区",
          "value": "370404"
        },
        {
          "label": "台儿庄区",
          "value": "370405"
        },
        {
          "label": "山亭区",
          "value": "370406"
        },
        {
          "label": "滕州市",
          "value": "370481"
        }
      ],
      [
        {
          "label": "东营区",
          "value": "370502"
        },
        {
          "label": "河口区",
          "value": "370503"
        },
        {
          "label": "垦利区",
          "value": "370505"
        },
        {
          "label": "利津县",
          "value": "370522"
        },
        {
          "label": "广饶县",
          "value": "370523"
        },
        {
          "label": "东营经济技术开发区",
          "value": "370571"
        },
        {
          "label": "东营港经济开发区",
          "value": "370572"
        }
      ],
      [
        {
          "label": "芝罘区",
          "value": "370602"
        },
        {
          "label": "福山区",
          "value": "370611"
        },
        {
          "label": "牟平区",
          "value": "370612"
        },
        {
          "label": "莱山区",
          "value": "370613"
        },
        {
          "label": "长岛县",
          "value": "370634"
        },
        {
          "label": "烟台高新技术产业开发区",
          "value": "370671"
        },
        {
          "label": "烟台经济技术开发区",
          "value": "370672"
        },
        {
          "label": "龙口市",
          "value": "370681"
        },
        {
          "label": "莱阳市",
          "value": "370682"
        },
        {
          "label": "莱州市",
          "value": "370683"
        },
        {
          "label": "蓬莱市",
          "value": "370684"
        },
        {
          "label": "招远市",
          "value": "370685"
        },
        {
          "label": "栖霞市",
          "value": "370686"
        },
        {
          "label": "海阳市",
          "value": "370687"
        }
      ],
      [
        {
          "label": "潍城区",
          "value": "370702"
        },
        {
          "label": "寒亭区",
          "value": "370703"
        },
        {
          "label": "坊子区",
          "value": "370704"
        },
        {
          "label": "奎文区",
          "value": "370705"
        },
        {
          "label": "临朐县",
          "value": "370724"
        },
        {
          "label": "昌乐县",
          "value": "370725"
        },
        {
          "label": "潍坊滨海经济技术开发区",
          "value": "370772"
        },
        {
          "label": "青州市",
          "value": "370781"
        },
        {
          "label": "诸城市",
          "value": "370782"
        },
        {
          "label": "寿光市",
          "value": "370783"
        },
        {
          "label": "安丘市",
          "value": "370784"
        },
        {
          "label": "高密市",
          "value": "370785"
        },
        {
          "label": "昌邑市",
          "value": "370786"
        }
      ],
      [
        {
          "label": "任城区",
          "value": "370811"
        },
        {
          "label": "兖州区",
          "value": "370812"
        },
        {
          "label": "微山县",
          "value": "370826"
        },
        {
          "label": "鱼台县",
          "value": "370827"
        },
        {
          "label": "金乡县",
          "value": "370828"
        },
        {
          "label": "嘉祥县",
          "value": "370829"
        },
        {
          "label": "汶上县",
          "value": "370830"
        },
        {
          "label": "泗水县",
          "value": "370831"
        },
        {
          "label": "梁山县",
          "value": "370832"
        },
        {
          "label": "济宁高新技术产业开发区",
          "value": "370871"
        },
        {
          "label": "曲阜市",
          "value": "370881"
        },
        {
          "label": "邹城市",
          "value": "370883"
        }
      ],
      [
        {
          "label": "泰山区",
          "value": "370902"
        },
        {
          "label": "岱岳区",
          "value": "370911"
        },
        {
          "label": "宁阳县",
          "value": "370921"
        },
        {
          "label": "东平县",
          "value": "370923"
        },
        {
          "label": "新泰市",
          "value": "370982"
        },
        {
          "label": "肥城市",
          "value": "370983"
        }
      ],
      [
        {
          "label": "环翠区",
          "value": "371002"
        },
        {
          "label": "文登区",
          "value": "371003"
        },
        {
          "label": "威海火炬高技术产业开发区",
          "value": "371071"
        },
        {
          "label": "威海经济技术开发区",
          "value": "371072"
        },
        {
          "label": "威海临港经济技术开发区",
          "value": "371073"
        },
        {
          "label": "荣成市",
          "value": "371082"
        },
        {
          "label": "乳山市",
          "value": "371083"
        }
      ],
      [
        {
          "label": "东港区",
          "value": "371102"
        },
        {
          "label": "岚山区",
          "value": "371103"
        },
        {
          "label": "五莲县",
          "value": "371121"
        },
        {
          "label": "莒县",
          "value": "371122"
        },
        {
          "label": "日照经济技术开发区",
          "value": "371171"
        },
        {
          "label": "日照国际海洋城",
          "value": "371172"
        }
      ],
      [
        {
          "label": "莱城区",
          "value": "371202"
        },
        {
          "label": "钢城区",
          "value": "371203"
        }
      ],
      [
        {
          "label": "兰山区",
          "value": "371302"
        },
        {
          "label": "罗庄区",
          "value": "371311"
        },
        {
          "label": "河东区",
          "value": "371312"
        },
        {
          "label": "沂南县",
          "value": "371321"
        },
        {
          "label": "郯城县",
          "value": "371322"
        },
        {
          "label": "沂水县",
          "value": "371323"
        },
        {
          "label": "兰陵县",
          "value": "371324"
        },
        {
          "label": "费县",
          "value": "371325"
        },
        {
          "label": "平邑县",
          "value": "371326"
        },
        {
          "label": "莒南县",
          "value": "371327"
        },
        {
          "label": "蒙阴县",
          "value": "371328"
        },
        {
          "label": "临沭县",
          "value": "371329"
        },
        {
          "label": "临沂高新技术产业开发区",
          "value": "371371"
        },
        {
          "label": "临沂经济技术开发区",
          "value": "371372"
        },
        {
          "label": "临沂临港经济开发区",
          "value": "371373"
        }
      ],
      [
        {
          "label": "德城区",
          "value": "371402"
        },
        {
          "label": "陵城区",
          "value": "371403"
        },
        {
          "label": "宁津县",
          "value": "371422"
        },
        {
          "label": "庆云县",
          "value": "371423"
        },
        {
          "label": "临邑县",
          "value": "371424"
        },
        {
          "label": "齐河县",
          "value": "371425"
        },
        {
          "label": "平原县",
          "value": "371426"
        },
        {
          "label": "夏津县",
          "value": "371427"
        },
        {
          "label": "武城县",
          "value": "371428"
        },
        {
          "label": "德州经济技术开发区",
          "value": "371471"
        },
        {
          "label": "德州运河经济开发区",
          "value": "371472"
        },
        {
          "label": "乐陵市",
          "value": "371481"
        },
        {
          "label": "禹城市",
          "value": "371482"
        }
      ],
      [
        {
          "label": "东昌府区",
          "value": "371502"
        },
        {
          "label": "阳谷县",
          "value": "371521"
        },
        {
          "label": "莘县",
          "value": "371522"
        },
        {
          "label": "茌平县",
          "value": "371523"
        },
        {
          "label": "东阿县",
          "value": "371524"
        },
        {
          "label": "冠县",
          "value": "371525"
        },
        {
          "label": "高唐县",
          "value": "371526"
        },
        {
          "label": "临清市",
          "value": "371581"
        }
      ],
      [
        {
          "label": "滨城区",
          "value": "371602"
        },
        {
          "label": "沾化区",
          "value": "371603"
        },
        {
          "label": "惠民县",
          "value": "371621"
        },
        {
          "label": "阳信县",
          "value": "371622"
        },
        {
          "label": "无棣县",
          "value": "371623"
        },
        {
          "label": "博兴县",
          "value": "371625"
        },
        {
          "label": "邹平县",
          "value": "371626"
        }
      ],
      [
        {
          "label": "牡丹区",
          "value": "371702"
        },
        {
          "label": "定陶区",
          "value": "371703"
        },
        {
          "label": "曹县",
          "value": "371721"
        },
        {
          "label": "单县",
          "value": "371722"
        },
        {
          "label": "成武县",
          "value": "371723"
        },
        {
          "label": "巨野县",
          "value": "371724"
        },
        {
          "label": "郓城县",
          "value": "371725"
        },
        {
          "label": "鄄城县",
          "value": "371726"
        },
        {
          "label": "东明县",
          "value": "371728"
        },
        {
          "label": "菏泽经济技术开发区",
          "value": "371771"
        },
        {
          "label": "菏泽高新技术开发区",
          "value": "371772"
        }
      ]
    ],
    [
      [
        {
          "label": "中原区",
          "value": "410102"
        },
        {
          "label": "二七区",
          "value": "410103"
        },
        {
          "label": "管城回族区",
          "value": "410104"
        },
        {
          "label": "金水区",
          "value": "410105"
        },
        {
          "label": "上街区",
          "value": "410106"
        },
        {
          "label": "惠济区",
          "value": "410108"
        },
        {
          "label": "中牟县",
          "value": "410122"
        },
        {
          "label": "郑州经济技术开发区",
          "value": "410171"
        },
        {
          "label": "郑州高新技术产业开发区",
          "value": "410172"
        },
        {
          "label": "郑州航空港经济综合实验区",
          "value": "410173"
        },
        {
          "label": "巩义市",
          "value": "410181"
        },
        {
          "label": "荥阳市",
          "value": "410182"
        },
        {
          "label": "新密市",
          "value": "410183"
        },
        {
          "label": "新郑市",
          "value": "410184"
        },
        {
          "label": "登封市",
          "value": "410185"
        }
      ],
      [
        {
          "label": "龙亭区",
          "value": "410202"
        },
        {
          "label": "顺河回族区",
          "value": "410203"
        },
        {
          "label": "鼓楼区",
          "value": "410204"
        },
        {
          "label": "禹王台区",
          "value": "410205"
        },
        {
          "label": "祥符区",
          "value": "410212"
        },
        {
          "label": "杞县",
          "value": "410221"
        },
        {
          "label": "通许县",
          "value": "410222"
        },
        {
          "label": "尉氏县",
          "value": "410223"
        },
        {
          "label": "兰考县",
          "value": "410225"
        }
      ],
      [
        {
          "label": "老城区",
          "value": "410302"
        },
        {
          "label": "西工区",
          "value": "410303"
        },
        {
          "label": "瀍河回族区",
          "value": "410304"
        },
        {
          "label": "涧西区",
          "value": "410305"
        },
        {
          "label": "吉利区",
          "value": "410306"
        },
        {
          "label": "洛龙区",
          "value": "410311"
        },
        {
          "label": "孟津县",
          "value": "410322"
        },
        {
          "label": "新安县",
          "value": "410323"
        },
        {
          "label": "栾川县",
          "value": "410324"
        },
        {
          "label": "嵩县",
          "value": "410325"
        },
        {
          "label": "汝阳县",
          "value": "410326"
        },
        {
          "label": "宜阳县",
          "value": "410327"
        },
        {
          "label": "洛宁县",
          "value": "410328"
        },
        {
          "label": "伊川县",
          "value": "410329"
        },
        {
          "label": "洛阳高新技术产业开发区",
          "value": "410371"
        },
        {
          "label": "偃师市",
          "value": "410381"
        }
      ],
      [
        {
          "label": "新华区",
          "value": "410402"
        },
        {
          "label": "卫东区",
          "value": "410403"
        },
        {
          "label": "石龙区",
          "value": "410404"
        },
        {
          "label": "湛河区",
          "value": "410411"
        },
        {
          "label": "宝丰县",
          "value": "410421"
        },
        {
          "label": "叶县",
          "value": "410422"
        },
        {
          "label": "鲁山县",
          "value": "410423"
        },
        {
          "label": "郏县",
          "value": "410425"
        },
        {
          "label": "平顶山高新技术产业开发区",
          "value": "410471"
        },
        {
          "label": "平顶山市新城区",
          "value": "410472"
        },
        {
          "label": "舞钢市",
          "value": "410481"
        },
        {
          "label": "汝州市",
          "value": "410482"
        }
      ],
      [
        {
          "label": "文峰区",
          "value": "410502"
        },
        {
          "label": "北关区",
          "value": "410503"
        },
        {
          "label": "殷都区",
          "value": "410505"
        },
        {
          "label": "龙安区",
          "value": "410506"
        },
        {
          "label": "安阳县",
          "value": "410522"
        },
        {
          "label": "汤阴县",
          "value": "410523"
        },
        {
          "label": "滑县",
          "value": "410526"
        },
        {
          "label": "内黄县",
          "value": "410527"
        },
        {
          "label": "安阳高新技术产业开发区",
          "value": "410571"
        },
        {
          "label": "林州市",
          "value": "410581"
        }
      ],
      [
        {
          "label": "鹤山区",
          "value": "410602"
        },
        {
          "label": "山城区",
          "value": "410603"
        },
        {
          "label": "淇滨区",
          "value": "410611"
        },
        {
          "label": "浚县",
          "value": "410621"
        },
        {
          "label": "淇县",
          "value": "410622"
        },
        {
          "label": "鹤壁经济技术开发区",
          "value": "410671"
        }
      ],
      [
        {
          "label": "红旗区",
          "value": "410702"
        },
        {
          "label": "卫滨区",
          "value": "410703"
        },
        {
          "label": "凤泉区",
          "value": "410704"
        },
        {
          "label": "牧野区",
          "value": "410711"
        },
        {
          "label": "新乡县",
          "value": "410721"
        },
        {
          "label": "获嘉县",
          "value": "410724"
        },
        {
          "label": "原阳县",
          "value": "410725"
        },
        {
          "label": "延津县",
          "value": "410726"
        },
        {
          "label": "封丘县",
          "value": "410727"
        },
        {
          "label": "长垣县",
          "value": "410728"
        },
        {
          "label": "新乡高新技术产业开发区",
          "value": "410771"
        },
        {
          "label": "新乡经济技术开发区",
          "value": "410772"
        },
        {
          "label": "新乡市平原城乡一体化示范区",
          "value": "410773"
        },
        {
          "label": "卫辉市",
          "value": "410781"
        },
        {
          "label": "辉县市",
          "value": "410782"
        }
      ],
      [
        {
          "label": "解放区",
          "value": "410802"
        },
        {
          "label": "中站区",
          "value": "410803"
        },
        {
          "label": "马村区",
          "value": "410804"
        },
        {
          "label": "山阳区",
          "value": "410811"
        },
        {
          "label": "修武县",
          "value": "410821"
        },
        {
          "label": "博爱县",
          "value": "410822"
        },
        {
          "label": "武陟县",
          "value": "410823"
        },
        {
          "label": "温县",
          "value": "410825"
        },
        {
          "label": "焦作城乡一体化示范区",
          "value": "410871"
        },
        {
          "label": "沁阳市",
          "value": "410882"
        },
        {
          "label": "孟州市",
          "value": "410883"
        }
      ],
      [
        {
          "label": "华龙区",
          "value": "410902"
        },
        {
          "label": "清丰县",
          "value": "410922"
        },
        {
          "label": "南乐县",
          "value": "410923"
        },
        {
          "label": "范县",
          "value": "410926"
        },
        {
          "label": "台前县",
          "value": "410927"
        },
        {
          "label": "濮阳县",
          "value": "410928"
        },
        {
          "label": "河南濮阳工业园区",
          "value": "410971"
        },
        {
          "label": "濮阳经济技术开发区",
          "value": "410972"
        }
      ],
      [
        {
          "label": "魏都区",
          "value": "411002"
        },
        {
          "label": "建安区",
          "value": "411003"
        },
        {
          "label": "鄢陵县",
          "value": "411024"
        },
        {
          "label": "襄城县",
          "value": "411025"
        },
        {
          "label": "许昌经济技术开发区",
          "value": "411071"
        },
        {
          "label": "禹州市",
          "value": "411081"
        },
        {
          "label": "长葛市",
          "value": "411082"
        }
      ],
      [
        {
          "label": "源汇区",
          "value": "411102"
        },
        {
          "label": "郾城区",
          "value": "411103"
        },
        {
          "label": "召陵区",
          "value": "411104"
        },
        {
          "label": "舞阳县",
          "value": "411121"
        },
        {
          "label": "临颍县",
          "value": "411122"
        },
        {
          "label": "漯河经济技术开发区",
          "value": "411171"
        }
      ],
      [
        {
          "label": "湖滨区",
          "value": "411202"
        },
        {
          "label": "陕州区",
          "value": "411203"
        },
        {
          "label": "渑池县",
          "value": "411221"
        },
        {
          "label": "卢氏县",
          "value": "411224"
        },
        {
          "label": "河南三门峡经济开发区",
          "value": "411271"
        },
        {
          "label": "义马市",
          "value": "411281"
        },
        {
          "label": "灵宝市",
          "value": "411282"
        }
      ],
      [
        {
          "label": "宛城区",
          "value": "411302"
        },
        {
          "label": "卧龙区",
          "value": "411303"
        },
        {
          "label": "南召县",
          "value": "411321"
        },
        {
          "label": "方城县",
          "value": "411322"
        },
        {
          "label": "西峡县",
          "value": "411323"
        },
        {
          "label": "镇平县",
          "value": "411324"
        },
        {
          "label": "内乡县",
          "value": "411325"
        },
        {
          "label": "淅川县",
          "value": "411326"
        },
        {
          "label": "社旗县",
          "value": "411327"
        },
        {
          "label": "唐河县",
          "value": "411328"
        },
        {
          "label": "新野县",
          "value": "411329"
        },
        {
          "label": "桐柏县",
          "value": "411330"
        },
        {
          "label": "南阳高新技术产业开发区",
          "value": "411371"
        },
        {
          "label": "南阳市城乡一体化示范区",
          "value": "411372"
        },
        {
          "label": "邓州市",
          "value": "411381"
        }
      ],
      [
        {
          "label": "梁园区",
          "value": "411402"
        },
        {
          "label": "睢阳区",
          "value": "411403"
        },
        {
          "label": "民权县",
          "value": "411421"
        },
        {
          "label": "睢县",
          "value": "411422"
        },
        {
          "label": "宁陵县",
          "value": "411423"
        },
        {
          "label": "柘城县",
          "value": "411424"
        },
        {
          "label": "虞城县",
          "value": "411425"
        },
        {
          "label": "夏邑县",
          "value": "411426"
        },
        {
          "label": "豫东综合物流产业聚集区",
          "value": "411471"
        },
        {
          "label": "河南商丘经济开发区",
          "value": "411472"
        },
        {
          "label": "永城市",
          "value": "411481"
        }
      ],
      [
        {
          "label": "浉河区",
          "value": "411502"
        },
        {
          "label": "平桥区",
          "value": "411503"
        },
        {
          "label": "罗山县",
          "value": "411521"
        },
        {
          "label": "光山县",
          "value": "411522"
        },
        {
          "label": "新县",
          "value": "411523"
        },
        {
          "label": "商城县",
          "value": "411524"
        },
        {
          "label": "固始县",
          "value": "411525"
        },
        {
          "label": "潢川县",
          "value": "411526"
        },
        {
          "label": "淮滨县",
          "value": "411527"
        },
        {
          "label": "息县",
          "value": "411528"
        },
        {
          "label": "信阳高新技术产业开发区",
          "value": "411571"
        }
      ],
      [
        {
          "label": "川汇区",
          "value": "411602"
        },
        {
          "label": "扶沟县",
          "value": "411621"
        },
        {
          "label": "西华县",
          "value": "411622"
        },
        {
          "label": "商水县",
          "value": "411623"
        },
        {
          "label": "沈丘县",
          "value": "411624"
        },
        {
          "label": "郸城县",
          "value": "411625"
        },
        {
          "label": "淮阳县",
          "value": "411626"
        },
        {
          "label": "太康县",
          "value": "411627"
        },
        {
          "label": "鹿邑县",
          "value": "411628"
        },
        {
          "label": "河南周口经济开发区",
          "value": "411671"
        },
        {
          "label": "项城市",
          "value": "411681"
        }
      ],
      [
        {
          "label": "驿城区",
          "value": "411702"
        },
        {
          "label": "西平县",
          "value": "411721"
        },
        {
          "label": "上蔡县",
          "value": "411722"
        },
        {
          "label": "平舆县",
          "value": "411723"
        },
        {
          "label": "正阳县",
          "value": "411724"
        },
        {
          "label": "确山县",
          "value": "411725"
        },
        {
          "label": "泌阳县",
          "value": "411726"
        },
        {
          "label": "汝南县",
          "value": "411727"
        },
        {
          "label": "遂平县",
          "value": "411728"
        },
        {
          "label": "新蔡县",
          "value": "411729"
        },
        {
          "label": "河南驻马店经济开发区",
          "value": "411771"
        }
      ],
      [{
        "label": "济源市",
        "value": "419001"
      }]
    ],
    [
      [
        {
          "label": "江岸区",
          "value": "420102"
        },
        {
          "label": "江汉区",
          "value": "420103"
        },
        {
          "label": "硚口区",
          "value": "420104"
        },
        {
          "label": "汉阳区",
          "value": "420105"
        },
        {
          "label": "武昌区",
          "value": "420106"
        },
        {
          "label": "青山区",
          "value": "420107"
        },
        {
          "label": "洪山区",
          "value": "420111"
        },
        {
          "label": "东西湖区",
          "value": "420112"
        },
        {
          "label": "汉南区",
          "value": "420113"
        },
        {
          "label": "蔡甸区",
          "value": "420114"
        },
        {
          "label": "江夏区",
          "value": "420115"
        },
        {
          "label": "黄陂区",
          "value": "420116"
        },
        {
          "label": "新洲区",
          "value": "420117"
        }
      ],
      [
        {
          "label": "黄石港区",
          "value": "420202"
        },
        {
          "label": "西塞山区",
          "value": "420203"
        },
        {
          "label": "下陆区",
          "value": "420204"
        },
        {
          "label": "铁山区",
          "value": "420205"
        },
        {
          "label": "阳新县",
          "value": "420222"
        },
        {
          "label": "大冶市",
          "value": "420281"
        }
      ],
      [
        {
          "label": "茅箭区",
          "value": "420302"
        },
        {
          "label": "张湾区",
          "value": "420303"
        },
        {
          "label": "郧阳区",
          "value": "420304"
        },
        {
          "label": "郧西县",
          "value": "420322"
        },
        {
          "label": "竹山县",
          "value": "420323"
        },
        {
          "label": "竹溪县",
          "value": "420324"
        },
        {
          "label": "房县",
          "value": "420325"
        },
        {
          "label": "丹江口市",
          "value": "420381"
        }
      ],
      [
        {
          "label": "西陵区",
          "value": "420502"
        },
        {
          "label": "伍家岗区",
          "value": "420503"
        },
        {
          "label": "点军区",
          "value": "420504"
        },
        {
          "label": "猇亭区",
          "value": "420505"
        },
        {
          "label": "夷陵区",
          "value": "420506"
        },
        {
          "label": "远安县",
          "value": "420525"
        },
        {
          "label": "兴山县",
          "value": "420526"
        },
        {
          "label": "秭归县",
          "value": "420527"
        },
        {
          "label": "长阳土家族自治县",
          "value": "420528"
        },
        {
          "label": "五峰土家族自治县",
          "value": "420529"
        },
        {
          "label": "宜都市",
          "value": "420581"
        },
        {
          "label": "当阳市",
          "value": "420582"
        },
        {
          "label": "枝江市",
          "value": "420583"
        }
      ],
      [
        {
          "label": "襄城区",
          "value": "420602"
        },
        {
          "label": "樊城区",
          "value": "420606"
        },
        {
          "label": "襄州区",
          "value": "420607"
        },
        {
          "label": "南漳县",
          "value": "420624"
        },
        {
          "label": "谷城县",
          "value": "420625"
        },
        {
          "label": "保康县",
          "value": "420626"
        },
        {
          "label": "老河口市",
          "value": "420682"
        },
        {
          "label": "枣阳市",
          "value": "420683"
        },
        {
          "label": "宜城市",
          "value": "420684"
        }
      ],
      [
        {
          "label": "梁子湖区",
          "value": "420702"
        },
        {
          "label": "华容区",
          "value": "420703"
        },
        {
          "label": "鄂城区",
          "value": "420704"
        }
      ],
      [
        {
          "label": "东宝区",
          "value": "420802"
        },
        {
          "label": "掇刀区",
          "value": "420804"
        },
        {
          "label": "京山县",
          "value": "420821"
        },
        {
          "label": "沙洋县",
          "value": "420822"
        },
        {
          "label": "钟祥市",
          "value": "420881"
        }
      ],
      [
        {
          "label": "孝南区",
          "value": "420902"
        },
        {
          "label": "孝昌县",
          "value": "420921"
        },
        {
          "label": "大悟县",
          "value": "420922"
        },
        {
          "label": "云梦县",
          "value": "420923"
        },
        {
          "label": "应城市",
          "value": "420981"
        },
        {
          "label": "安陆市",
          "value": "420982"
        },
        {
          "label": "汉川市",
          "value": "420984"
        }
      ],
      [
        {
          "label": "沙市区",
          "value": "421002"
        },
        {
          "label": "荆州区",
          "value": "421003"
        },
        {
          "label": "公安县",
          "value": "421022"
        },
        {
          "label": "监利县",
          "value": "421023"
        },
        {
          "label": "江陵县",
          "value": "421024"
        },
        {
          "label": "荆州经济技术开发区",
          "value": "421071"
        },
        {
          "label": "石首市",
          "value": "421081"
        },
        {
          "label": "洪湖市",
          "value": "421083"
        },
        {
          "label": "松滋市",
          "value": "421087"
        }
      ],
      [
        {
          "label": "黄州区",
          "value": "421102"
        },
        {
          "label": "团风县",
          "value": "421121"
        },
        {
          "label": "红安县",
          "value": "421122"
        },
        {
          "label": "罗田县",
          "value": "421123"
        },
        {
          "label": "英山县",
          "value": "421124"
        },
        {
          "label": "浠水县",
          "value": "421125"
        },
        {
          "label": "蕲春县",
          "value": "421126"
        },
        {
          "label": "黄梅县",
          "value": "421127"
        },
        {
          "label": "龙感湖管理区",
          "value": "421171"
        },
        {
          "label": "麻城市",
          "value": "421181"
        },
        {
          "label": "武穴市",
          "value": "421182"
        }
      ],
      [
        {
          "label": "咸安区",
          "value": "421202"
        },
        {
          "label": "嘉鱼县",
          "value": "421221"
        },
        {
          "label": "通城县",
          "value": "421222"
        },
        {
          "label": "崇阳县",
          "value": "421223"
        },
        {
          "label": "通山县",
          "value": "421224"
        },
        {
          "label": "赤壁市",
          "value": "421281"
        }
      ],
      [
        {
          "label": "曾都区",
          "value": "421303"
        },
        {
          "label": "随县",
          "value": "421321"
        },
        {
          "label": "广水市",
          "value": "421381"
        }
      ],
      [
        {
          "label": "恩施市",
          "value": "422801"
        },
        {
          "label": "利川市",
          "value": "422802"
        },
        {
          "label": "建始县",
          "value": "422822"
        },
        {
          "label": "巴东县",
          "value": "422823"
        },
        {
          "label": "宣恩县",
          "value": "422825"
        },
        {
          "label": "咸丰县",
          "value": "422826"
        },
        {
          "label": "来凤县",
          "value": "422827"
        },
        {
          "label": "鹤峰县",
          "value": "422828"
        }
      ],
      [
        {
          "label": "仙桃市",
          "value": "429004"
        },
        {
          "label": "潜江市",
          "value": "429005"
        },
        {
          "label": "天门市",
          "value": "429006"
        },
        {
          "label": "神农架林区",
          "value": "429021"
        }
      ]
    ],
    [
      [
        {
          "label": "芙蓉区",
          "value": "430102"
        },
        {
          "label": "天心区",
          "value": "430103"
        },
        {
          "label": "岳麓区",
          "value": "430104"
        },
        {
          "label": "开福区",
          "value": "430105"
        },
        {
          "label": "雨花区",
          "value": "430111"
        },
        {
          "label": "望城区",
          "value": "430112"
        },
        {
          "label": "长沙县",
          "value": "430121"
        },
        {
          "label": "浏阳市",
          "value": "430181"
        },
        {
          "label": "宁乡市",
          "value": "430182"
        }
      ],
      [
        {
          "label": "荷塘区",
          "value": "430202"
        },
        {
          "label": "芦淞区",
          "value": "430203"
        },
        {
          "label": "石峰区",
          "value": "430204"
        },
        {
          "label": "天元区",
          "value": "430211"
        },
        {
          "label": "株洲县",
          "value": "430221"
        },
        {
          "label": "攸县",
          "value": "430223"
        },
        {
          "label": "茶陵县",
          "value": "430224"
        },
        {
          "label": "炎陵县",
          "value": "430225"
        },
        {
          "label": "云龙示范区",
          "value": "430271"
        },
        {
          "label": "醴陵市",
          "value": "430281"
        }
      ],
      [
        {
          "label": "雨湖区",
          "value": "430302"
        },
        {
          "label": "岳塘区",
          "value": "430304"
        },
        {
          "label": "湘潭县",
          "value": "430321"
        },
        {
          "label": "湖南湘潭高新技术产业园区",
          "value": "430371"
        },
        {
          "label": "湘潭昭山示范区",
          "value": "430372"
        },
        {
          "label": "湘潭九华示范区",
          "value": "430373"
        },
        {
          "label": "湘乡市",
          "value": "430381"
        },
        {
          "label": "韶山市",
          "value": "430382"
        }
      ],
      [
        {
          "label": "珠晖区",
          "value": "430405"
        },
        {
          "label": "雁峰区",
          "value": "430406"
        },
        {
          "label": "石鼓区",
          "value": "430407"
        },
        {
          "label": "蒸湘区",
          "value": "430408"
        },
        {
          "label": "南岳区",
          "value": "430412"
        },
        {
          "label": "衡阳县",
          "value": "430421"
        },
        {
          "label": "衡南县",
          "value": "430422"
        },
        {
          "label": "衡山县",
          "value": "430423"
        },
        {
          "label": "衡东县",
          "value": "430424"
        },
        {
          "label": "祁东县",
          "value": "430426"
        },
        {
          "label": "衡阳综合保税区",
          "value": "430471"
        },
        {
          "label": "湖南衡阳高新技术产业园区",
          "value": "430472"
        },
        {
          "label": "湖南衡阳松木经济开发区",
          "value": "430473"
        },
        {
          "label": "耒阳市",
          "value": "430481"
        },
        {
          "label": "常宁市",
          "value": "430482"
        }
      ],
      [
        {
          "label": "双清区",
          "value": "430502"
        },
        {
          "label": "大祥区",
          "value": "430503"
        },
        {
          "label": "北塔区",
          "value": "430511"
        },
        {
          "label": "邵东县",
          "value": "430521"
        },
        {
          "label": "新邵县",
          "value": "430522"
        },
        {
          "label": "邵阳县",
          "value": "430523"
        },
        {
          "label": "隆回县",
          "value": "430524"
        },
        {
          "label": "洞口县",
          "value": "430525"
        },
        {
          "label": "绥宁县",
          "value": "430527"
        },
        {
          "label": "新宁县",
          "value": "430528"
        },
        {
          "label": "城步苗族自治县",
          "value": "430529"
        },
        {
          "label": "武冈市",
          "value": "430581"
        }
      ],
      [
        {
          "label": "岳阳楼区",
          "value": "430602"
        },
        {
          "label": "云溪区",
          "value": "430603"
        },
        {
          "label": "君山区",
          "value": "430611"
        },
        {
          "label": "岳阳县",
          "value": "430621"
        },
        {
          "label": "华容县",
          "value": "430623"
        },
        {
          "label": "湘阴县",
          "value": "430624"
        },
        {
          "label": "平江县",
          "value": "430626"
        },
        {
          "label": "岳阳市屈原管理区",
          "value": "430671"
        },
        {
          "label": "汨罗市",
          "value": "430681"
        },
        {
          "label": "临湘市",
          "value": "430682"
        }
      ],
      [
        {
          "label": "武陵区",
          "value": "430702"
        },
        {
          "label": "鼎城区",
          "value": "430703"
        },
        {
          "label": "安乡县",
          "value": "430721"
        },
        {
          "label": "汉寿县",
          "value": "430722"
        },
        {
          "label": "澧县",
          "value": "430723"
        },
        {
          "label": "临澧县",
          "value": "430724"
        },
        {
          "label": "桃源县",
          "value": "430725"
        },
        {
          "label": "石门县",
          "value": "430726"
        },
        {
          "label": "常德市西洞庭管理区",
          "value": "430771"
        },
        {
          "label": "津市市",
          "value": "430781"
        }
      ],
      [
        {
          "label": "永定区",
          "value": "430802"
        },
        {
          "label": "武陵源区",
          "value": "430811"
        },
        {
          "label": "慈利县",
          "value": "430821"
        },
        {
          "label": "桑植县",
          "value": "430822"
        }
      ],
      [
        {
          "label": "资阳区",
          "value": "430902"
        },
        {
          "label": "赫山区",
          "value": "430903"
        },
        {
          "label": "南县",
          "value": "430921"
        },
        {
          "label": "桃江县",
          "value": "430922"
        },
        {
          "label": "安化县",
          "value": "430923"
        },
        {
          "label": "益阳市大通湖管理区",
          "value": "430971"
        },
        {
          "label": "湖南益阳高新技术产业园区",
          "value": "430972"
        },
        {
          "label": "沅江市",
          "value": "430981"
        }
      ],
      [
        {
          "label": "北湖区",
          "value": "431002"
        },
        {
          "label": "苏仙区",
          "value": "431003"
        },
        {
          "label": "桂阳县",
          "value": "431021"
        },
        {
          "label": "宜章县",
          "value": "431022"
        },
        {
          "label": "永兴县",
          "value": "431023"
        },
        {
          "label": "嘉禾县",
          "value": "431024"
        },
        {
          "label": "临武县",
          "value": "431025"
        },
        {
          "label": "汝城县",
          "value": "431026"
        },
        {
          "label": "桂东县",
          "value": "431027"
        },
        {
          "label": "安仁县",
          "value": "431028"
        },
        {
          "label": "资兴市",
          "value": "431081"
        }
      ],
      [
        {
          "label": "零陵区",
          "value": "431102"
        },
        {
          "label": "冷水滩区",
          "value": "431103"
        },
        {
          "label": "祁阳县",
          "value": "431121"
        },
        {
          "label": "东安县",
          "value": "431122"
        },
        {
          "label": "双牌县",
          "value": "431123"
        },
        {
          "label": "道县",
          "value": "431124"
        },
        {
          "label": "江永县",
          "value": "431125"
        },
        {
          "label": "宁远县",
          "value": "431126"
        },
        {
          "label": "蓝山县",
          "value": "431127"
        },
        {
          "label": "新田县",
          "value": "431128"
        },
        {
          "label": "江华瑶族自治县",
          "value": "431129"
        },
        {
          "label": "永州经济技术开发区",
          "value": "431171"
        },
        {
          "label": "永州市金洞管理区",
          "value": "431172"
        },
        {
          "label": "永州市回龙圩管理区",
          "value": "431173"
        }
      ],
      [
        {
          "label": "鹤城区",
          "value": "431202"
        },
        {
          "label": "中方县",
          "value": "431221"
        },
        {
          "label": "沅陵县",
          "value": "431222"
        },
        {
          "label": "辰溪县",
          "value": "431223"
        },
        {
          "label": "溆浦县",
          "value": "431224"
        },
        {
          "label": "会同县",
          "value": "431225"
        },
        {
          "label": "麻阳苗族自治县",
          "value": "431226"
        },
        {
          "label": "新晃侗族自治县",
          "value": "431227"
        },
        {
          "label": "芷江侗族自治县",
          "value": "431228"
        },
        {
          "label": "靖州苗族侗族自治县",
          "value": "431229"
        },
        {
          "label": "通道侗族自治县",
          "value": "431230"
        },
        {
          "label": "怀化市洪江管理区",
          "value": "431271"
        },
        {
          "label": "洪江市",
          "value": "431281"
        }
      ],
      [
        {
          "label": "娄星区",
          "value": "431302"
        },
        {
          "label": "双峰县",
          "value": "431321"
        },
        {
          "label": "新化县",
          "value": "431322"
        },
        {
          "label": "冷水江市",
          "value": "431381"
        },
        {
          "label": "涟源市",
          "value": "431382"
        }
      ],
      [
        {
          "label": "吉首市",
          "value": "433101"
        },
        {
          "label": "泸溪县",
          "value": "433122"
        },
        {
          "label": "凤凰县",
          "value": "433123"
        },
        {
          "label": "花垣县",
          "value": "433124"
        },
        {
          "label": "保靖县",
          "value": "433125"
        },
        {
          "label": "古丈县",
          "value": "433126"
        },
        {
          "label": "永顺县",
          "value": "433127"
        },
        {
          "label": "龙山县",
          "value": "433130"
        },
        {
          "label": "湖南吉首经济开发区",
          "value": "433172"
        },
        {
          "label": "湖南永顺经济开发区",
          "value": "433173"
        }
      ]
    ],
    [
      [
        {
          "label": "荔湾区",
          "value": "440103"
        },
        {
          "label": "越秀区",
          "value": "440104"
        },
        {
          "label": "海珠区",
          "value": "440105"
        },
        {
          "label": "天河区",
          "value": "440106"
        },
        {
          "label": "白云区",
          "value": "440111"
        },
        {
          "label": "黄埔区",
          "value": "440112"
        },
        {
          "label": "番禺区",
          "value": "440113"
        },
        {
          "label": "花都区",
          "value": "440114"
        },
        {
          "label": "南沙区",
          "value": "440115"
        },
        {
          "label": "从化区",
          "value": "440117"
        },
        {
          "label": "增城区",
          "value": "440118"
        }
      ],
      [
        {
          "label": "武江区",
          "value": "440203"
        },
        {
          "label": "浈江区",
          "value": "440204"
        },
        {
          "label": "曲江区",
          "value": "440205"
        },
        {
          "label": "始兴县",
          "value": "440222"
        },
        {
          "label": "仁化县",
          "value": "440224"
        },
        {
          "label": "翁源县",
          "value": "440229"
        },
        {
          "label": "乳源瑶族自治县",
          "value": "440232"
        },
        {
          "label": "新丰县",
          "value": "440233"
        },
        {
          "label": "乐昌市",
          "value": "440281"
        },
        {
          "label": "南雄市",
          "value": "440282"
        }
      ],
      [
        {
          "label": "罗湖区",
          "value": "440303"
        },
        {
          "label": "福田区",
          "value": "440304"
        },
        {
          "label": "南山区",
          "value": "440305"
        },
        {
          "label": "宝安区",
          "value": "440306"
        },
        {
          "label": "龙岗区",
          "value": "440307"
        },
        {
          "label": "盐田区",
          "value": "440308"
        },
        {
          "label": "龙华区",
          "value": "440309"
        },
        {
          "label": "坪山区",
          "value": "440310"
        }
      ],
      [
        {
          "label": "香洲区",
          "value": "440402"
        },
        {
          "label": "斗门区",
          "value": "440403"
        },
        {
          "label": "金湾区",
          "value": "440404"
        }
      ],
      [
        {
          "label": "龙湖区",
          "value": "440507"
        },
        {
          "label": "金平区",
          "value": "440511"
        },
        {
          "label": "濠江区",
          "value": "440512"
        },
        {
          "label": "潮阳区",
          "value": "440513"
        },
        {
          "label": "潮南区",
          "value": "440514"
        },
        {
          "label": "澄海区",
          "value": "440515"
        },
        {
          "label": "南澳县",
          "value": "440523"
        }
      ],
      [
        {
          "label": "禅城区",
          "value": "440604"
        },
        {
          "label": "南海区",
          "value": "440605"
        },
        {
          "label": "顺德区",
          "value": "440606"
        },
        {
          "label": "三水区",
          "value": "440607"
        },
        {
          "label": "高明区",
          "value": "440608"
        }
      ],
      [
        {
          "label": "蓬江区",
          "value": "440703"
        },
        {
          "label": "江海区",
          "value": "440704"
        },
        {
          "label": "新会区",
          "value": "440705"
        },
        {
          "label": "台山市",
          "value": "440781"
        },
        {
          "label": "开平市",
          "value": "440783"
        },
        {
          "label": "鹤山市",
          "value": "440784"
        },
        {
          "label": "恩平市",
          "value": "440785"
        }
      ],
      [
        {
          "label": "赤坎区",
          "value": "440802"
        },
        {
          "label": "霞山区",
          "value": "440803"
        },
        {
          "label": "坡头区",
          "value": "440804"
        },
        {
          "label": "麻章区",
          "value": "440811"
        },
        {
          "label": "遂溪县",
          "value": "440823"
        },
        {
          "label": "徐闻县",
          "value": "440825"
        },
        {
          "label": "廉江市",
          "value": "440881"
        },
        {
          "label": "雷州市",
          "value": "440882"
        },
        {
          "label": "吴川市",
          "value": "440883"
        }
      ],
      [
        {
          "label": "茂南区",
          "value": "440902"
        },
        {
          "label": "电白区",
          "value": "440904"
        },
        {
          "label": "高州市",
          "value": "440981"
        },
        {
          "label": "化州市",
          "value": "440982"
        },
        {
          "label": "信宜市",
          "value": "440983"
        }
      ],
      [
        {
          "label": "端州区",
          "value": "441202"
        },
        {
          "label": "鼎湖区",
          "value": "441203"
        },
        {
          "label": "高要区",
          "value": "441204"
        },
        {
          "label": "广宁县",
          "value": "441223"
        },
        {
          "label": "怀集县",
          "value": "441224"
        },
        {
          "label": "封开县",
          "value": "441225"
        },
        {
          "label": "德庆县",
          "value": "441226"
        },
        {
          "label": "四会市",
          "value": "441284"
        }
      ],
      [
        {
          "label": "惠城区",
          "value": "441302"
        },
        {
          "label": "惠阳区",
          "value": "441303"
        },
        {
          "label": "博罗县",
          "value": "441322"
        },
        {
          "label": "惠东县",
          "value": "441323"
        },
        {
          "label": "龙门县",
          "value": "441324"
        }
      ],
      [
        {
          "label": "梅江区",
          "value": "441402"
        },
        {
          "label": "梅县区",
          "value": "441403"
        },
        {
          "label": "大埔县",
          "value": "441422"
        },
        {
          "label": "丰顺县",
          "value": "441423"
        },
        {
          "label": "五华县",
          "value": "441424"
        },
        {
          "label": "平远县",
          "value": "441426"
        },
        {
          "label": "蕉岭县",
          "value": "441427"
        },
        {
          "label": "兴宁市",
          "value": "441481"
        }
      ],
      [
        {
          "label": "城区",
          "value": "441502"
        },
        {
          "label": "海丰县",
          "value": "441521"
        },
        {
          "label": "陆河县",
          "value": "441523"
        },
        {
          "label": "陆丰市",
          "value": "441581"
        }
      ],
      [
        {
          "label": "源城区",
          "value": "441602"
        },
        {
          "label": "紫金县",
          "value": "441621"
        },
        {
          "label": "龙川县",
          "value": "441622"
        },
        {
          "label": "连平县",
          "value": "441623"
        },
        {
          "label": "和平县",
          "value": "441624"
        },
        {
          "label": "东源县",
          "value": "441625"
        }
      ],
      [
        {
          "label": "江城区",
          "value": "441702"
        },
        {
          "label": "阳东区",
          "value": "441704"
        },
        {
          "label": "阳西县",
          "value": "441721"
        },
        {
          "label": "阳春市",
          "value": "441781"
        }
      ],
      [
        {
          "label": "清城区",
          "value": "441802"
        },
        {
          "label": "清新区",
          "value": "441803"
        },
        {
          "label": "佛冈县",
          "value": "441821"
        },
        {
          "label": "阳山县",
          "value": "441823"
        },
        {
          "label": "连山壮族瑶族自治县",
          "value": "441825"
        },
        {
          "label": "连南瑶族自治县",
          "value": "441826"
        },
        {
          "label": "英德市",
          "value": "441881"
        },
        {
          "label": "连州市",
          "value": "441882"
        }
      ],
      [{
        "label": "东莞市",
        "value": "441900"
      }],
      [{
        "label": "中山市",
        "value": "442000"
      }],
      [
        {
          "label": "湘桥区",
          "value": "445102"
        },
        {
          "label": "潮安区",
          "value": "445103"
        },
        {
          "label": "饶平县",
          "value": "445122"
        }
      ],
      [
        {
          "label": "榕城区",
          "value": "445202"
        },
        {
          "label": "揭东区",
          "value": "445203"
        },
        {
          "label": "揭西县",
          "value": "445222"
        },
        {
          "label": "惠来县",
          "value": "445224"
        },
        {
          "label": "普宁市",
          "value": "445281"
        }
      ],
      [
        {
          "label": "云城区",
          "value": "445302"
        },
        {
          "label": "云安区",
          "value": "445303"
        },
        {
          "label": "新兴县",
          "value": "445321"
        },
        {
          "label": "郁南县",
          "value": "445322"
        },
        {
          "label": "罗定市",
          "value": "445381"
        }
      ]
    ],
    [
      [
        {
          "label": "兴宁区",
          "value": "450102"
        },
        {
          "label": "青秀区",
          "value": "450103"
        },
        {
          "label": "江南区",
          "value": "450105"
        },
        {
          "label": "西乡塘区",
          "value": "450107"
        },
        {
          "label": "良庆区",
          "value": "450108"
        },
        {
          "label": "邕宁区",
          "value": "450109"
        },
        {
          "label": "武鸣区",
          "value": "450110"
        },
        {
          "label": "隆安县",
          "value": "450123"
        },
        {
          "label": "马山县",
          "value": "450124"
        },
        {
          "label": "上林县",
          "value": "450125"
        },
        {
          "label": "宾阳县",
          "value": "450126"
        },
        {
          "label": "横县",
          "value": "450127"
        }
      ],
      [
        {
          "label": "城中区",
          "value": "450202"
        },
        {
          "label": "鱼峰区",
          "value": "450203"
        },
        {
          "label": "柳南区",
          "value": "450204"
        },
        {
          "label": "柳北区",
          "value": "450205"
        },
        {
          "label": "柳江区",
          "value": "450206"
        },
        {
          "label": "柳城县",
          "value": "450222"
        },
        {
          "label": "鹿寨县",
          "value": "450223"
        },
        {
          "label": "融安县",
          "value": "450224"
        },
        {
          "label": "融水苗族自治县",
          "value": "450225"
        },
        {
          "label": "三江侗族自治县",
          "value": "450226"
        }
      ],
      [
        {
          "label": "秀峰区",
          "value": "450302"
        },
        {
          "label": "叠彩区",
          "value": "450303"
        },
        {
          "label": "象山区",
          "value": "450304"
        },
        {
          "label": "七星区",
          "value": "450305"
        },
        {
          "label": "雁山区",
          "value": "450311"
        },
        {
          "label": "临桂区",
          "value": "450312"
        },
        {
          "label": "阳朔县",
          "value": "450321"
        },
        {
          "label": "灵川县",
          "value": "450323"
        },
        {
          "label": "全州县",
          "value": "450324"
        },
        {
          "label": "兴安县",
          "value": "450325"
        },
        {
          "label": "永福县",
          "value": "450326"
        },
        {
          "label": "灌阳县",
          "value": "450327"
        },
        {
          "label": "龙胜各族自治县",
          "value": "450328"
        },
        {
          "label": "资源县",
          "value": "450329"
        },
        {
          "label": "平乐县",
          "value": "450330"
        },
        {
          "label": "荔浦县",
          "value": "450331"
        },
        {
          "label": "恭城瑶族自治县",
          "value": "450332"
        }
      ],
      [
        {
          "label": "万秀区",
          "value": "450403"
        },
        {
          "label": "长洲区",
          "value": "450405"
        },
        {
          "label": "龙圩区",
          "value": "450406"
        },
        {
          "label": "苍梧县",
          "value": "450421"
        },
        {
          "label": "藤县",
          "value": "450422"
        },
        {
          "label": "蒙山县",
          "value": "450423"
        },
        {
          "label": "岑溪市",
          "value": "450481"
        }
      ],
      [
        {
          "label": "海城区",
          "value": "450502"
        },
        {
          "label": "银海区",
          "value": "450503"
        },
        {
          "label": "铁山港区",
          "value": "450512"
        },
        {
          "label": "合浦县",
          "value": "450521"
        }
      ],
      [
        {
          "label": "港口区",
          "value": "450602"
        },
        {
          "label": "防城区",
          "value": "450603"
        },
        {
          "label": "上思县",
          "value": "450621"
        },
        {
          "label": "东兴市",
          "value": "450681"
        }
      ],
      [
        {
          "label": "钦南区",
          "value": "450702"
        },
        {
          "label": "钦北区",
          "value": "450703"
        },
        {
          "label": "灵山县",
          "value": "450721"
        },
        {
          "label": "浦北县",
          "value": "450722"
        }
      ],
      [
        {
          "label": "港北区",
          "value": "450802"
        },
        {
          "label": "港南区",
          "value": "450803"
        },
        {
          "label": "覃塘区",
          "value": "450804"
        },
        {
          "label": "平南县",
          "value": "450821"
        },
        {
          "label": "桂平市",
          "value": "450881"
        }
      ],
      [
        {
          "label": "玉州区",
          "value": "450902"
        },
        {
          "label": "福绵区",
          "value": "450903"
        },
        {
          "label": "容县",
          "value": "450921"
        },
        {
          "label": "陆川县",
          "value": "450922"
        },
        {
          "label": "博白县",
          "value": "450923"
        },
        {
          "label": "兴业县",
          "value": "450924"
        },
        {
          "label": "北流市",
          "value": "450981"
        }
      ],
      [
        {
          "label": "右江区",
          "value": "451002"
        },
        {
          "label": "田阳县",
          "value": "451021"
        },
        {
          "label": "田东县",
          "value": "451022"
        },
        {
          "label": "平果县",
          "value": "451023"
        },
        {
          "label": "德保县",
          "value": "451024"
        },
        {
          "label": "那坡县",
          "value": "451026"
        },
        {
          "label": "凌云县",
          "value": "451027"
        },
        {
          "label": "乐业县",
          "value": "451028"
        },
        {
          "label": "田林县",
          "value": "451029"
        },
        {
          "label": "西林县",
          "value": "451030"
        },
        {
          "label": "隆林各族自治县",
          "value": "451031"
        },
        {
          "label": "靖西市",
          "value": "451081"
        }
      ],
      [
        {
          "label": "八步区",
          "value": "451102"
        },
        {
          "label": "平桂区",
          "value": "451103"
        },
        {
          "label": "昭平县",
          "value": "451121"
        },
        {
          "label": "钟山县",
          "value": "451122"
        },
        {
          "label": "富川瑶族自治县",
          "value": "451123"
        }
      ],
      [
        {
          "label": "金城江区",
          "value": "451202"
        },
        {
          "label": "宜州区",
          "value": "451203"
        },
        {
          "label": "南丹县",
          "value": "451221"
        },
        {
          "label": "天峨县",
          "value": "451222"
        },
        {
          "label": "凤山县",
          "value": "451223"
        },
        {
          "label": "东兰县",
          "value": "451224"
        },
        {
          "label": "罗城仫佬族自治县",
          "value": "451225"
        },
        {
          "label": "环江毛南族自治县",
          "value": "451226"
        },
        {
          "label": "巴马瑶族自治县",
          "value": "451227"
        },
        {
          "label": "都安瑶族自治县",
          "value": "451228"
        },
        {
          "label": "大化瑶族自治县",
          "value": "451229"
        }
      ],
      [
        {
          "label": "兴宾区",
          "value": "451302"
        },
        {
          "label": "忻城县",
          "value": "451321"
        },
        {
          "label": "象州县",
          "value": "451322"
        },
        {
          "label": "武宣县",
          "value": "451323"
        },
        {
          "label": "金秀瑶族自治县",
          "value": "451324"
        },
        {
          "label": "合山市",
          "value": "451381"
        }
      ],
      [
        {
          "label": "江州区",
          "value": "451402"
        },
        {
          "label": "扶绥县",
          "value": "451421"
        },
        {
          "label": "宁明县",
          "value": "451422"
        },
        {
          "label": "龙州县",
          "value": "451423"
        },
        {
          "label": "大新县",
          "value": "451424"
        },
        {
          "label": "天等县",
          "value": "451425"
        },
        {
          "label": "凭祥市",
          "value": "451481"
        }
      ]
    ],
    [
      [
        {
          "label": "秀英区",
          "value": "460105"
        },
        {
          "label": "龙华区",
          "value": "460106"
        },
        {
          "label": "琼山区",
          "value": "460107"
        },
        {
          "label": "美兰区",
          "value": "460108"
        }
      ],
      [
        {
          "label": "海棠区",
          "value": "460202"
        },
        {
          "label": "吉阳区",
          "value": "460203"
        },
        {
          "label": "天涯区",
          "value": "460204"
        },
        {
          "label": "崖州区",
          "value": "460205"
        }
      ],
      [
        {
          "label": "西沙群岛",
          "value": "460321"
        },
        {
          "label": "南沙群岛",
          "value": "460322"
        },
        {
          "label": "中沙群岛的岛礁及其海域",
          "value": "460323"
        }
      ],
      [{
        "label": "儋州市",
        "value": "460400"
      }],
      [
        {
          "label": "五指山市",
          "value": "469001"
        },
        {
          "label": "琼海市",
          "value": "469002"
        },
        {
          "label": "文昌市",
          "value": "469005"
        },
        {
          "label": "万宁市",
          "value": "469006"
        },
        {
          "label": "东方市",
          "value": "469007"
        },
        {
          "label": "定安县",
          "value": "469021"
        },
        {
          "label": "屯昌县",
          "value": "469022"
        },
        {
          "label": "澄迈县",
          "value": "469023"
        },
        {
          "label": "临高县",
          "value": "469024"
        },
        {
          "label": "白沙黎族自治县",
          "value": "469025"
        },
        {
          "label": "昌江黎族自治县",
          "value": "469026"
        },
        {
          "label": "乐东黎族自治县",
          "value": "469027"
        },
        {
          "label": "陵水黎族自治县",
          "value": "469028"
        },
        {
          "label": "保亭黎族苗族自治县",
          "value": "469029"
        },
        {
          "label": "琼中黎族苗族自治县",
          "value": "469030"
        }
      ]
    ],
    [
      [
        {
          "label": "万州区",
          "value": "500101"
        },
        {
          "label": "涪陵区",
          "value": "500102"
        },
        {
          "label": "渝中区",
          "value": "500103"
        },
        {
          "label": "大渡口区",
          "value": "500104"
        },
        {
          "label": "江北区",
          "value": "500105"
        },
        {
          "label": "沙坪坝区",
          "value": "500106"
        },
        {
          "label": "九龙坡区",
          "value": "500107"
        },
        {
          "label": "南岸区",
          "value": "500108"
        },
        {
          "label": "北碚区",
          "value": "500109"
        },
        {
          "label": "綦江区",
          "value": "500110"
        },
        {
          "label": "大足区",
          "value": "500111"
        },
        {
          "label": "渝北区",
          "value": "500112"
        },
        {
          "label": "巴南区",
          "value": "500113"
        },
        {
          "label": "黔江区",
          "value": "500114"
        },
        {
          "label": "长寿区",
          "value": "500115"
        },
        {
          "label": "江津区",
          "value": "500116"
        },
        {
          "label": "合川区",
          "value": "500117"
        },
        {
          "label": "永川区",
          "value": "500118"
        },
        {
          "label": "南川区",
          "value": "500119"
        },
        {
          "label": "璧山区",
          "value": "500120"
        },
        {
          "label": "铜梁区",
          "value": "500151"
        },
        {
          "label": "潼南区",
          "value": "500152"
        },
        {
          "label": "荣昌区",
          "value": "500153"
        },
        {
          "label": "开州区",
          "value": "500154"
        },
        {
          "label": "梁平区",
          "value": "500155"
        },
        {
          "label": "武隆区",
          "value": "500156"
        }
      ],
      [
        {
          "label": "城口县",
          "value": "500229"
        },
        {
          "label": "丰都县",
          "value": "500230"
        },
        {
          "label": "垫江县",
          "value": "500231"
        },
        {
          "label": "忠县",
          "value": "500233"
        },
        {
          "label": "云阳县",
          "value": "500235"
        },
        {
          "label": "奉节县",
          "value": "500236"
        },
        {
          "label": "巫山县",
          "value": "500237"
        },
        {
          "label": "巫溪县",
          "value": "500238"
        },
        {
          "label": "石柱土家族自治县",
          "value": "500240"
        },
        {
          "label": "秀山土家族苗族自治县",
          "value": "500241"
        },
        {
          "label": "酉阳土家族苗族自治县",
          "value": "500242"
        },
        {
          "label": "彭水苗族土家族自治县",
          "value": "500243"
        }
      ]
    ],
    [
      [
        {
          "label": "锦江区",
          "value": "510104"
        },
        {
          "label": "青羊区",
          "value": "510105"
        },
        {
          "label": "金牛区",
          "value": "510106"
        },
        {
          "label": "武侯区",
          "value": "510107"
        },
        {
          "label": "成华区",
          "value": "510108"
        },
        {
          "label": "龙泉驿区",
          "value": "510112"
        },
        {
          "label": "青白江区",
          "value": "510113"
        },
        {
          "label": "新都区",
          "value": "510114"
        },
        {
          "label": "温江区",
          "value": "510115"
        },
        {
          "label": "双流区",
          "value": "510116"
        },
        {
          "label": "郫都区",
          "value": "510117"
        },
        {
          "label": "金堂县",
          "value": "510121"
        },
        {
          "label": "大邑县",
          "value": "510129"
        },
        {
          "label": "蒲江县",
          "value": "510131"
        },
        {
          "label": "新津县",
          "value": "510132"
        },
        {
          "label": "都江堰市",
          "value": "510181"
        },
        {
          "label": "彭州市",
          "value": "510182"
        },
        {
          "label": "邛崃市",
          "value": "510183"
        },
        {
          "label": "崇州市",
          "value": "510184"
        },
        {
          "label": "简阳市",
          "value": "510185"
        }
      ],
      [
        {
          "label": "自流井区",
          "value": "510302"
        },
        {
          "label": "贡井区",
          "value": "510303"
        },
        {
          "label": "大安区",
          "value": "510304"
        },
        {
          "label": "沿滩区",
          "value": "510311"
        },
        {
          "label": "荣县",
          "value": "510321"
        },
        {
          "label": "富顺县",
          "value": "510322"
        }
      ],
      [
        {
          "label": "东区",
          "value": "510402"
        },
        {
          "label": "西区",
          "value": "510403"
        },
        {
          "label": "仁和区",
          "value": "510411"
        },
        {
          "label": "米易县",
          "value": "510421"
        },
        {
          "label": "盐边县",
          "value": "510422"
        }
      ],
      [
        {
          "label": "江阳区",
          "value": "510502"
        },
        {
          "label": "纳溪区",
          "value": "510503"
        },
        {
          "label": "龙马潭区",
          "value": "510504"
        },
        {
          "label": "泸县",
          "value": "510521"
        },
        {
          "label": "合江县",
          "value": "510522"
        },
        {
          "label": "叙永县",
          "value": "510524"
        },
        {
          "label": "古蔺县",
          "value": "510525"
        }
      ],
      [
        {
          "label": "旌阳区",
          "value": "510603"
        },
        {
          "label": "罗江区",
          "value": "510604"
        },
        {
          "label": "中江县",
          "value": "510623"
        },
        {
          "label": "广汉市",
          "value": "510681"
        },
        {
          "label": "什邡市",
          "value": "510682"
        },
        {
          "label": "绵竹市",
          "value": "510683"
        }
      ],
      [
        {
          "label": "涪城区",
          "value": "510703"
        },
        {
          "label": "游仙区",
          "value": "510704"
        },
        {
          "label": "安州区",
          "value": "510705"
        },
        {
          "label": "三台县",
          "value": "510722"
        },
        {
          "label": "盐亭县",
          "value": "510723"
        },
        {
          "label": "梓潼县",
          "value": "510725"
        },
        {
          "label": "北川羌族自治县",
          "value": "510726"
        },
        {
          "label": "平武县",
          "value": "510727"
        },
        {
          "label": "江油市",
          "value": "510781"
        }
      ],
      [
        {
          "label": "利州区",
          "value": "510802"
        },
        {
          "label": "昭化区",
          "value": "510811"
        },
        {
          "label": "朝天区",
          "value": "510812"
        },
        {
          "label": "旺苍县",
          "value": "510821"
        },
        {
          "label": "青川县",
          "value": "510822"
        },
        {
          "label": "剑阁县",
          "value": "510823"
        },
        {
          "label": "苍溪县",
          "value": "510824"
        }
      ],
      [
        {
          "label": "船山区",
          "value": "510903"
        },
        {
          "label": "安居区",
          "value": "510904"
        },
        {
          "label": "蓬溪县",
          "value": "510921"
        },
        {
          "label": "射洪县",
          "value": "510922"
        },
        {
          "label": "大英县",
          "value": "510923"
        }
      ],
      [
        {
          "label": "市中区",
          "value": "511002"
        },
        {
          "label": "东兴区",
          "value": "511011"
        },
        {
          "label": "威远县",
          "value": "511024"
        },
        {
          "label": "资中县",
          "value": "511025"
        },
        {
          "label": "内江经济开发区",
          "value": "511071"
        },
        {
          "label": "隆昌市",
          "value": "511083"
        }
      ],
      [
        {
          "label": "市中区",
          "value": "511102"
        },
        {
          "label": "沙湾区",
          "value": "511111"
        },
        {
          "label": "五通桥区",
          "value": "511112"
        },
        {
          "label": "金口河区",
          "value": "511113"
        },
        {
          "label": "犍为县",
          "value": "511123"
        },
        {
          "label": "井研县",
          "value": "511124"
        },
        {
          "label": "夹江县",
          "value": "511126"
        },
        {
          "label": "沐川县",
          "value": "511129"
        },
        {
          "label": "峨边彝族自治县",
          "value": "511132"
        },
        {
          "label": "马边彝族自治县",
          "value": "511133"
        },
        {
          "label": "峨眉山市",
          "value": "511181"
        }
      ],
      [
        {
          "label": "顺庆区",
          "value": "511302"
        },
        {
          "label": "高坪区",
          "value": "511303"
        },
        {
          "label": "嘉陵区",
          "value": "511304"
        },
        {
          "label": "南部县",
          "value": "511321"
        },
        {
          "label": "营山县",
          "value": "511322"
        },
        {
          "label": "蓬安县",
          "value": "511323"
        },
        {
          "label": "仪陇县",
          "value": "511324"
        },
        {
          "label": "西充县",
          "value": "511325"
        },
        {
          "label": "阆中市",
          "value": "511381"
        }
      ],
      [
        {
          "label": "东坡区",
          "value": "511402"
        },
        {
          "label": "彭山区",
          "value": "511403"
        },
        {
          "label": "仁寿县",
          "value": "511421"
        },
        {
          "label": "洪雅县",
          "value": "511423"
        },
        {
          "label": "丹棱县",
          "value": "511424"
        },
        {
          "label": "青神县",
          "value": "511425"
        }
      ],
      [
        {
          "label": "翠屏区",
          "value": "511502"
        },
        {
          "label": "南溪区",
          "value": "511503"
        },
        {
          "label": "宜宾县",
          "value": "511521"
        },
        {
          "label": "江安县",
          "value": "511523"
        },
        {
          "label": "长宁县",
          "value": "511524"
        },
        {
          "label": "高县",
          "value": "511525"
        },
        {
          "label": "珙县",
          "value": "511526"
        },
        {
          "label": "筠连县",
          "value": "511527"
        },
        {
          "label": "兴文县",
          "value": "511528"
        },
        {
          "label": "屏山县",
          "value": "511529"
        }
      ],
      [
        {
          "label": "广安区",
          "value": "511602"
        },
        {
          "label": "前锋区",
          "value": "511603"
        },
        {
          "label": "岳池县",
          "value": "511621"
        },
        {
          "label": "武胜县",
          "value": "511622"
        },
        {
          "label": "邻水县",
          "value": "511623"
        },
        {
          "label": "华蓥市",
          "value": "511681"
        }
      ],
      [
        {
          "label": "通川区",
          "value": "511702"
        },
        {
          "label": "达川区",
          "value": "511703"
        },
        {
          "label": "宣汉县",
          "value": "511722"
        },
        {
          "label": "开江县",
          "value": "511723"
        },
        {
          "label": "大竹县",
          "value": "511724"
        },
        {
          "label": "渠县",
          "value": "511725"
        },
        {
          "label": "达州经济开发区",
          "value": "511771"
        },
        {
          "label": "万源市",
          "value": "511781"
        }
      ],
      [
        {
          "label": "雨城区",
          "value": "511802"
        },
        {
          "label": "名山区",
          "value": "511803"
        },
        {
          "label": "荥经县",
          "value": "511822"
        },
        {
          "label": "汉源县",
          "value": "511823"
        },
        {
          "label": "石棉县",
          "value": "511824"
        },
        {
          "label": "天全县",
          "value": "511825"
        },
        {
          "label": "芦山县",
          "value": "511826"
        },
        {
          "label": "宝兴县",
          "value": "511827"
        }
      ],
      [
        {
          "label": "巴州区",
          "value": "511902"
        },
        {
          "label": "恩阳区",
          "value": "511903"
        },
        {
          "label": "通江县",
          "value": "511921"
        },
        {
          "label": "南江县",
          "value": "511922"
        },
        {
          "label": "平昌县",
          "value": "511923"
        },
        {
          "label": "巴中经济开发区",
          "value": "511971"
        }
      ],
      [
        {
          "label": "雁江区",
          "value": "512002"
        },
        {
          "label": "安岳县",
          "value": "512021"
        },
        {
          "label": "乐至县",
          "value": "512022"
        }
      ],
      [
        {
          "label": "马尔康市",
          "value": "513201"
        },
        {
          "label": "汶川县",
          "value": "513221"
        },
        {
          "label": "理县",
          "value": "513222"
        },
        {
          "label": "茂县",
          "value": "513223"
        },
        {
          "label": "松潘县",
          "value": "513224"
        },
        {
          "label": "九寨沟县",
          "value": "513225"
        },
        {
          "label": "金川县",
          "value": "513226"
        },
        {
          "label": "小金县",
          "value": "513227"
        },
        {
          "label": "黑水县",
          "value": "513228"
        },
        {
          "label": "壤塘县",
          "value": "513230"
        },
        {
          "label": "阿坝县",
          "value": "513231"
        },
        {
          "label": "若尔盖县",
          "value": "513232"
        },
        {
          "label": "红原县",
          "value": "513233"
        }
      ],
      [
        {
          "label": "康定市",
          "value": "513301"
        },
        {
          "label": "泸定县",
          "value": "513322"
        },
        {
          "label": "丹巴县",
          "value": "513323"
        },
        {
          "label": "九龙县",
          "value": "513324"
        },
        {
          "label": "雅江县",
          "value": "513325"
        },
        {
          "label": "道孚县",
          "value": "513326"
        },
        {
          "label": "炉霍县",
          "value": "513327"
        },
        {
          "label": "甘孜县",
          "value": "513328"
        },
        {
          "label": "新龙县",
          "value": "513329"
        },
        {
          "label": "德格县",
          "value": "513330"
        },
        {
          "label": "白玉县",
          "value": "513331"
        },
        {
          "label": "石渠县",
          "value": "513332"
        },
        {
          "label": "色达县",
          "value": "513333"
        },
        {
          "label": "理塘县",
          "value": "513334"
        },
        {
          "label": "巴塘县",
          "value": "513335"
        },
        {
          "label": "乡城县",
          "value": "513336"
        },
        {
          "label": "稻城县",
          "value": "513337"
        },
        {
          "label": "得荣县",
          "value": "513338"
        }
      ],
      [
        {
          "label": "西昌市",
          "value": "513401"
        },
        {
          "label": "木里藏族自治县",
          "value": "513422"
        },
        {
          "label": "盐源县",
          "value": "513423"
        },
        {
          "label": "德昌县",
          "value": "513424"
        },
        {
          "label": "会理县",
          "value": "513425"
        },
        {
          "label": "会东县",
          "value": "513426"
        },
        {
          "label": "宁南县",
          "value": "513427"
        },
        {
          "label": "普格县",
          "value": "513428"
        },
        {
          "label": "布拖县",
          "value": "513429"
        },
        {
          "label": "金阳县",
          "value": "513430"
        },
        {
          "label": "昭觉县",
          "value": "513431"
        },
        {
          "label": "喜德县",
          "value": "513432"
        },
        {
          "label": "冕宁县",
          "value": "513433"
        },
        {
          "label": "越西县",
          "value": "513434"
        },
        {
          "label": "甘洛县",
          "value": "513435"
        },
        {
          "label": "美姑县",
          "value": "513436"
        },
        {
          "label": "雷波县",
          "value": "513437"
        }
      ]
    ],
    [
      [
        {
          "label": "南明区",
          "value": "520102"
        },
        {
          "label": "云岩区",
          "value": "520103"
        },
        {
          "label": "花溪区",
          "value": "520111"
        },
        {
          "label": "乌当区",
          "value": "520112"
        },
        {
          "label": "白云区",
          "value": "520113"
        },
        {
          "label": "观山湖区",
          "value": "520115"
        },
        {
          "label": "开阳县",
          "value": "520121"
        },
        {
          "label": "息烽县",
          "value": "520122"
        },
        {
          "label": "修文县",
          "value": "520123"
        },
        {
          "label": "清镇市",
          "value": "520181"
        }
      ],
      [
        {
          "label": "钟山区",
          "value": "520201"
        },
        {
          "label": "六枝特区",
          "value": "520203"
        },
        {
          "label": "水城县",
          "value": "520221"
        },
        {
          "label": "盘州市",
          "value": "520281"
        }
      ],
      [
        {
          "label": "红花岗区",
          "value": "520302"
        },
        {
          "label": "汇川区",
          "value": "520303"
        },
        {
          "label": "播州区",
          "value": "520304"
        },
        {
          "label": "桐梓县",
          "value": "520322"
        },
        {
          "label": "绥阳县",
          "value": "520323"
        },
        {
          "label": "正安县",
          "value": "520324"
        },
        {
          "label": "道真仡佬族苗族自治县",
          "value": "520325"
        },
        {
          "label": "务川仡佬族苗族自治县",
          "value": "520326"
        },
        {
          "label": "凤冈县",
          "value": "520327"
        },
        {
          "label": "湄潭县",
          "value": "520328"
        },
        {
          "label": "余庆县",
          "value": "520329"
        },
        {
          "label": "习水县",
          "value": "520330"
        },
        {
          "label": "赤水市",
          "value": "520381"
        },
        {
          "label": "仁怀市",
          "value": "520382"
        }
      ],
      [
        {
          "label": "西秀区",
          "value": "520402"
        },
        {
          "label": "平坝区",
          "value": "520403"
        },
        {
          "label": "普定县",
          "value": "520422"
        },
        {
          "label": "镇宁布依族苗族自治县",
          "value": "520423"
        },
        {
          "label": "关岭布依族苗族自治县",
          "value": "520424"
        },
        {
          "label": "紫云苗族布依族自治县",
          "value": "520425"
        }
      ],
      [
        {
          "label": "七星关区",
          "value": "520502"
        },
        {
          "label": "大方县",
          "value": "520521"
        },
        {
          "label": "黔西县",
          "value": "520522"
        },
        {
          "label": "金沙县",
          "value": "520523"
        },
        {
          "label": "织金县",
          "value": "520524"
        },
        {
          "label": "纳雍县",
          "value": "520525"
        },
        {
          "label": "威宁彝族回族苗族自治县",
          "value": "520526"
        },
        {
          "label": "赫章县",
          "value": "520527"
        }
      ],
      [
        {
          "label": "碧江区",
          "value": "520602"
        },
        {
          "label": "万山区",
          "value": "520603"
        },
        {
          "label": "江口县",
          "value": "520621"
        },
        {
          "label": "玉屏侗族自治县",
          "value": "520622"
        },
        {
          "label": "石阡县",
          "value": "520623"
        },
        {
          "label": "思南县",
          "value": "520624"
        },
        {
          "label": "印江土家族苗族自治县",
          "value": "520625"
        },
        {
          "label": "德江县",
          "value": "520626"
        },
        {
          "label": "沿河土家族自治县",
          "value": "520627"
        },
        {
          "label": "松桃苗族自治县",
          "value": "520628"
        }
      ],
      [
        {
          "label": "兴义市",
          "value": "522301"
        },
        {
          "label": "兴仁县",
          "value": "522322"
        },
        {
          "label": "普安县",
          "value": "522323"
        },
        {
          "label": "晴隆县",
          "value": "522324"
        },
        {
          "label": "贞丰县",
          "value": "522325"
        },
        {
          "label": "望谟县",
          "value": "522326"
        },
        {
          "label": "册亨县",
          "value": "522327"
        },
        {
          "label": "安龙县",
          "value": "522328"
        }
      ],
      [
        {
          "label": "凯里市",
          "value": "522601"
        },
        {
          "label": "黄平县",
          "value": "522622"
        },
        {
          "label": "施秉县",
          "value": "522623"
        },
        {
          "label": "三穗县",
          "value": "522624"
        },
        {
          "label": "镇远县",
          "value": "522625"
        },
        {
          "label": "岑巩县",
          "value": "522626"
        },
        {
          "label": "天柱县",
          "value": "522627"
        },
        {
          "label": "锦屏县",
          "value": "522628"
        },
        {
          "label": "剑河县",
          "value": "522629"
        },
        {
          "label": "台江县",
          "value": "522630"
        },
        {
          "label": "黎平县",
          "value": "522631"
        },
        {
          "label": "榕江县",
          "value": "522632"
        },
        {
          "label": "从江县",
          "value": "522633"
        },
        {
          "label": "雷山县",
          "value": "522634"
        },
        {
          "label": "麻江县",
          "value": "522635"
        },
        {
          "label": "丹寨县",
          "value": "522636"
        }
      ],
      [
        {
          "label": "都匀市",
          "value": "522701"
        },
        {
          "label": "福泉市",
          "value": "522702"
        },
        {
          "label": "荔波县",
          "value": "522722"
        },
        {
          "label": "贵定县",
          "value": "522723"
        },
        {
          "label": "瓮安县",
          "value": "522725"
        },
        {
          "label": "独山县",
          "value": "522726"
        },
        {
          "label": "平塘县",
          "value": "522727"
        },
        {
          "label": "罗甸县",
          "value": "522728"
        },
        {
          "label": "长顺县",
          "value": "522729"
        },
        {
          "label": "龙里县",
          "value": "522730"
        },
        {
          "label": "惠水县",
          "value": "522731"
        },
        {
          "label": "三都水族自治县",
          "value": "522732"
        }
      ]
    ],
    [
      [
        {
          "label": "五华区",
          "value": "530102"
        },
        {
          "label": "盘龙区",
          "value": "530103"
        },
        {
          "label": "官渡区",
          "value": "530111"
        },
        {
          "label": "西山区",
          "value": "530112"
        },
        {
          "label": "东川区",
          "value": "530113"
        },
        {
          "label": "呈贡区",
          "value": "530114"
        },
        {
          "label": "晋宁区",
          "value": "530115"
        },
        {
          "label": "富民县",
          "value": "530124"
        },
        {
          "label": "宜良县",
          "value": "530125"
        },
        {
          "label": "石林彝族自治县",
          "value": "530126"
        },
        {
          "label": "嵩明县",
          "value": "530127"
        },
        {
          "label": "禄劝彝族苗族自治县",
          "value": "530128"
        },
        {
          "label": "寻甸回族彝族自治县",
          "value": "530129"
        },
        {
          "label": "安宁市",
          "value": "530181"
        }
      ],
      [
        {
          "label": "麒麟区",
          "value": "530302"
        },
        {
          "label": "沾益区",
          "value": "530303"
        },
        {
          "label": "马龙县",
          "value": "530321"
        },
        {
          "label": "陆良县",
          "value": "530322"
        },
        {
          "label": "师宗县",
          "value": "530323"
        },
        {
          "label": "罗平县",
          "value": "530324"
        },
        {
          "label": "富源县",
          "value": "530325"
        },
        {
          "label": "会泽县",
          "value": "530326"
        },
        {
          "label": "宣威市",
          "value": "530381"
        }
      ],
      [
        {
          "label": "红塔区",
          "value": "530402"
        },
        {
          "label": "江川区",
          "value": "530403"
        },
        {
          "label": "澄江县",
          "value": "530422"
        },
        {
          "label": "通海县",
          "value": "530423"
        },
        {
          "label": "华宁县",
          "value": "530424"
        },
        {
          "label": "易门县",
          "value": "530425"
        },
        {
          "label": "峨山彝族自治县",
          "value": "530426"
        },
        {
          "label": "新平彝族傣族自治县",
          "value": "530427"
        },
        {
          "label": "元江哈尼族彝族傣族自治县",
          "value": "530428"
        }
      ],
      [
        {
          "label": "隆阳区",
          "value": "530502"
        },
        {
          "label": "施甸县",
          "value": "530521"
        },
        {
          "label": "龙陵县",
          "value": "530523"
        },
        {
          "label": "昌宁县",
          "value": "530524"
        },
        {
          "label": "腾冲市",
          "value": "530581"
        }
      ],
      [
        {
          "label": "昭阳区",
          "value": "530602"
        },
        {
          "label": "鲁甸县",
          "value": "530621"
        },
        {
          "label": "巧家县",
          "value": "530622"
        },
        {
          "label": "盐津县",
          "value": "530623"
        },
        {
          "label": "大关县",
          "value": "530624"
        },
        {
          "label": "永善县",
          "value": "530625"
        },
        {
          "label": "绥江县",
          "value": "530626"
        },
        {
          "label": "镇雄县",
          "value": "530627"
        },
        {
          "label": "彝良县",
          "value": "530628"
        },
        {
          "label": "威信县",
          "value": "530629"
        },
        {
          "label": "水富县",
          "value": "530630"
        }
      ],
      [
        {
          "label": "古城区",
          "value": "530702"
        },
        {
          "label": "玉龙纳西族自治县",
          "value": "530721"
        },
        {
          "label": "永胜县",
          "value": "530722"
        },
        {
          "label": "华坪县",
          "value": "530723"
        },
        {
          "label": "宁蒗彝族自治县",
          "value": "530724"
        }
      ],
      [
        {
          "label": "思茅区",
          "value": "530802"
        },
        {
          "label": "宁洱哈尼族彝族自治县",
          "value": "530821"
        },
        {
          "label": "墨江哈尼族自治县",
          "value": "530822"
        },
        {
          "label": "景东彝族自治县",
          "value": "530823"
        },
        {
          "label": "景谷傣族彝族自治县",
          "value": "530824"
        },
        {
          "label": "镇沅彝族哈尼族拉祜族自治县",
          "value": "530825"
        },
        {
          "label": "江城哈尼族彝族自治县",
          "value": "530826"
        },
        {
          "label": "孟连傣族拉祜族佤族自治县",
          "value": "530827"
        },
        {
          "label": "澜沧拉祜族自治县",
          "value": "530828"
        },
        {
          "label": "西盟佤族自治县",
          "value": "530829"
        }
      ],
      [
        {
          "label": "临翔区",
          "value": "530902"
        },
        {
          "label": "凤庆县",
          "value": "530921"
        },
        {
          "label": "云县",
          "value": "530922"
        },
        {
          "label": "永德县",
          "value": "530923"
        },
        {
          "label": "镇康县",
          "value": "530924"
        },
        {
          "label": "双江拉祜族佤族布朗族傣族自治县",
          "value": "530925"
        },
        {
          "label": "耿马傣族佤族自治县",
          "value": "530926"
        },
        {
          "label": "沧源佤族自治县",
          "value": "530927"
        }
      ],
      [
        {
          "label": "楚雄市",
          "value": "532301"
        },
        {
          "label": "双柏县",
          "value": "532322"
        },
        {
          "label": "牟定县",
          "value": "532323"
        },
        {
          "label": "南华县",
          "value": "532324"
        },
        {
          "label": "姚安县",
          "value": "532325"
        },
        {
          "label": "大姚县",
          "value": "532326"
        },
        {
          "label": "永仁县",
          "value": "532327"
        },
        {
          "label": "元谋县",
          "value": "532328"
        },
        {
          "label": "武定县",
          "value": "532329"
        },
        {
          "label": "禄丰县",
          "value": "532331"
        }
      ],
      [
        {
          "label": "个旧市",
          "value": "532501"
        },
        {
          "label": "开远市",
          "value": "532502"
        },
        {
          "label": "蒙自市",
          "value": "532503"
        },
        {
          "label": "弥勒市",
          "value": "532504"
        },
        {
          "label": "屏边苗族自治县",
          "value": "532523"
        },
        {
          "label": "建水县",
          "value": "532524"
        },
        {
          "label": "石屏县",
          "value": "532525"
        },
        {
          "label": "泸西县",
          "value": "532527"
        },
        {
          "label": "元阳县",
          "value": "532528"
        },
        {
          "label": "红河县",
          "value": "532529"
        },
        {
          "label": "金平苗族瑶族傣族自治县",
          "value": "532530"
        },
        {
          "label": "绿春县",
          "value": "532531"
        },
        {
          "label": "河口瑶族自治县",
          "value": "532532"
        }
      ],
      [
        {
          "label": "文山市",
          "value": "532601"
        },
        {
          "label": "砚山县",
          "value": "532622"
        },
        {
          "label": "西畴县",
          "value": "532623"
        },
        {
          "label": "麻栗坡县",
          "value": "532624"
        },
        {
          "label": "马关县",
          "value": "532625"
        },
        {
          "label": "丘北县",
          "value": "532626"
        },
        {
          "label": "广南县",
          "value": "532627"
        },
        {
          "label": "富宁县",
          "value": "532628"
        }
      ],
      [
        {
          "label": "景洪市",
          "value": "532801"
        },
        {
          "label": "勐海县",
          "value": "532822"
        },
        {
          "label": "勐腊县",
          "value": "532823"
        }
      ],
      [
        {
          "label": "大理市",
          "value": "532901"
        },
        {
          "label": "漾濞彝族自治县",
          "value": "532922"
        },
        {
          "label": "祥云县",
          "value": "532923"
        },
        {
          "label": "宾川县",
          "value": "532924"
        },
        {
          "label": "弥渡县",
          "value": "532925"
        },
        {
          "label": "南涧彝族自治县",
          "value": "532926"
        },
        {
          "label": "巍山彝族回族自治县",
          "value": "532927"
        },
        {
          "label": "永平县",
          "value": "532928"
        },
        {
          "label": "云龙县",
          "value": "532929"
        },
        {
          "label": "洱源县",
          "value": "532930"
        },
        {
          "label": "剑川县",
          "value": "532931"
        },
        {
          "label": "鹤庆县",
          "value": "532932"
        }
      ],
      [
        {
          "label": "瑞丽市",
          "value": "533102"
        },
        {
          "label": "芒市",
          "value": "533103"
        },
        {
          "label": "梁河县",
          "value": "533122"
        },
        {
          "label": "盈江县",
          "value": "533123"
        },
        {
          "label": "陇川县",
          "value": "533124"
        }
      ],
      [
        {
          "label": "泸水市",
          "value": "533301"
        },
        {
          "label": "福贡县",
          "value": "533323"
        },
        {
          "label": "贡山独龙族怒族自治县",
          "value": "533324"
        },
        {
          "label": "兰坪白族普米族自治县",
          "value": "533325"
        }
      ],
      [
        {
          "label": "香格里拉市",
          "value": "533401"
        },
        {
          "label": "德钦县",
          "value": "533422"
        },
        {
          "label": "维西傈僳族自治县",
          "value": "533423"
        }
      ]
    ],
    [
      [
        {
          "label": "城关区",
          "value": "540102"
        },
        {
          "label": "堆龙德庆区",
          "value": "540103"
        },
        {
          "label": "林周县",
          "value": "540121"
        },
        {
          "label": "当雄县",
          "value": "540122"
        },
        {
          "label": "尼木县",
          "value": "540123"
        },
        {
          "label": "曲水县",
          "value": "540124"
        },
        {
          "label": "达孜县",
          "value": "540126"
        },
        {
          "label": "墨竹工卡县",
          "value": "540127"
        },
        {
          "label": "格尔木藏青工业园区",
          "value": "540171"
        },
        {
          "label": "拉萨经济技术开发区",
          "value": "540172"
        },
        {
          "label": "西藏文化旅游创意园区",
          "value": "540173"
        },
        {
          "label": "达孜工业园区",
          "value": "540174"
        }
      ],
      [
        {
          "label": "桑珠孜区",
          "value": "540202"
        },
        {
          "label": "南木林县",
          "value": "540221"
        },
        {
          "label": "江孜县",
          "value": "540222"
        },
        {
          "label": "定日县",
          "value": "540223"
        },
        {
          "label": "萨迦县",
          "value": "540224"
        },
        {
          "label": "拉孜县",
          "value": "540225"
        },
        {
          "label": "昂仁县",
          "value": "540226"
        },
        {
          "label": "谢通门县",
          "value": "540227"
        },
        {
          "label": "白朗县",
          "value": "540228"
        },
        {
          "label": "仁布县",
          "value": "540229"
        },
        {
          "label": "康马县",
          "value": "540230"
        },
        {
          "label": "定结县",
          "value": "540231"
        },
        {
          "label": "仲巴县",
          "value": "540232"
        },
        {
          "label": "亚东县",
          "value": "540233"
        },
        {
          "label": "吉隆县",
          "value": "540234"
        },
        {
          "label": "聂拉木县",
          "value": "540235"
        },
        {
          "label": "萨嘎县",
          "value": "540236"
        },
        {
          "label": "岗巴县",
          "value": "540237"
        }
      ],
      [
        {
          "label": "卡若区",
          "value": "540302"
        },
        {
          "label": "江达县",
          "value": "540321"
        },
        {
          "label": "贡觉县",
          "value": "540322"
        },
        {
          "label": "类乌齐县",
          "value": "540323"
        },
        {
          "label": "丁青县",
          "value": "540324"
        },
        {
          "label": "察雅县",
          "value": "540325"
        },
        {
          "label": "八宿县",
          "value": "540326"
        },
        {
          "label": "左贡县",
          "value": "540327"
        },
        {
          "label": "芒康县",
          "value": "540328"
        },
        {
          "label": "洛隆县",
          "value": "540329"
        },
        {
          "label": "边坝县",
          "value": "540330"
        }
      ],
      [
        {
          "label": "巴宜区",
          "value": "540402"
        },
        {
          "label": "工布江达县",
          "value": "540421"
        },
        {
          "label": "米林县",
          "value": "540422"
        },
        {
          "label": "墨脱县",
          "value": "540423"
        },
        {
          "label": "波密县",
          "value": "540424"
        },
        {
          "label": "察隅县",
          "value": "540425"
        },
        {
          "label": "朗县",
          "value": "540426"
        }
      ],
      [
        {
          "label": "乃东区",
          "value": "540502"
        },
        {
          "label": "扎囊县",
          "value": "540521"
        },
        {
          "label": "贡嘎县",
          "value": "540522"
        },
        {
          "label": "桑日县",
          "value": "540523"
        },
        {
          "label": "琼结县",
          "value": "540524"
        },
        {
          "label": "曲松县",
          "value": "540525"
        },
        {
          "label": "措美县",
          "value": "540526"
        },
        {
          "label": "洛扎县",
          "value": "540527"
        },
        {
          "label": "加查县",
          "value": "540528"
        },
        {
          "label": "隆子县",
          "value": "540529"
        },
        {
          "label": "错那县",
          "value": "540530"
        },
        {
          "label": "浪卡子县",
          "value": "540531"
        }
      ],
      [
        {
          "label": "那曲县",
          "value": "542421"
        },
        {
          "label": "嘉黎县",
          "value": "542422"
        },
        {
          "label": "比如县",
          "value": "542423"
        },
        {
          "label": "聂荣县",
          "value": "542424"
        },
        {
          "label": "安多县",
          "value": "542425"
        },
        {
          "label": "申扎县",
          "value": "542426"
        },
        {
          "label": "索县",
          "value": "542427"
        },
        {
          "label": "班戈县",
          "value": "542428"
        },
        {
          "label": "巴青县",
          "value": "542429"
        },
        {
          "label": "尼玛县",
          "value": "542430"
        },
        {
          "label": "双湖县",
          "value": "542431"
        }
      ],
      [
        {
          "label": "普兰县",
          "value": "542521"
        },
        {
          "label": "札达县",
          "value": "542522"
        },
        {
          "label": "噶尔县",
          "value": "542523"
        },
        {
          "label": "日土县",
          "value": "542524"
        },
        {
          "label": "革吉县",
          "value": "542525"
        },
        {
          "label": "改则县",
          "value": "542526"
        },
        {
          "label": "措勤县",
          "value": "542527"
        }
      ]
    ],
    [
      [
        {
          "label": "新城区",
          "value": "610102"
        },
        {
          "label": "碑林区",
          "value": "610103"
        },
        {
          "label": "莲湖区",
          "value": "610104"
        },
        {
          "label": "灞桥区",
          "value": "610111"
        },
        {
          "label": "未央区",
          "value": "610112"
        },
        {
          "label": "雁塔区",
          "value": "610113"
        },
        {
          "label": "阎良区",
          "value": "610114"
        },
        {
          "label": "临潼区",
          "value": "610115"
        },
        {
          "label": "长安区",
          "value": "610116"
        },
        {
          "label": "高陵区",
          "value": "610117"
        },
        {
          "label": "鄠邑区",
          "value": "610118"
        },
        {
          "label": "蓝田县",
          "value": "610122"
        },
        {
          "label": "周至县",
          "value": "610124"
        }
      ],
      [
        {
          "label": "王益区",
          "value": "610202"
        },
        {
          "label": "印台区",
          "value": "610203"
        },
        {
          "label": "耀州区",
          "value": "610204"
        },
        {
          "label": "宜君县",
          "value": "610222"
        }
      ],
      [
        {
          "label": "渭滨区",
          "value": "610302"
        },
        {
          "label": "金台区",
          "value": "610303"
        },
        {
          "label": "陈仓区",
          "value": "610304"
        },
        {
          "label": "凤翔县",
          "value": "610322"
        },
        {
          "label": "岐山县",
          "value": "610323"
        },
        {
          "label": "扶风县",
          "value": "610324"
        },
        {
          "label": "眉县",
          "value": "610326"
        },
        {
          "label": "陇县",
          "value": "610327"
        },
        {
          "label": "千阳县",
          "value": "610328"
        },
        {
          "label": "麟游县",
          "value": "610329"
        },
        {
          "label": "凤县",
          "value": "610330"
        },
        {
          "label": "太白县",
          "value": "610331"
        }
      ],
      [
        {
          "label": "秦都区",
          "value": "610402"
        },
        {
          "label": "杨陵区",
          "value": "610403"
        },
        {
          "label": "渭城区",
          "value": "610404"
        },
        {
          "label": "三原县",
          "value": "610422"
        },
        {
          "label": "泾阳县",
          "value": "610423"
        },
        {
          "label": "乾县",
          "value": "610424"
        },
        {
          "label": "礼泉县",
          "value": "610425"
        },
        {
          "label": "永寿县",
          "value": "610426"
        },
        {
          "label": "彬县",
          "value": "610427"
        },
        {
          "label": "长武县",
          "value": "610428"
        },
        {
          "label": "旬邑县",
          "value": "610429"
        },
        {
          "label": "淳化县",
          "value": "610430"
        },
        {
          "label": "武功县",
          "value": "610431"
        },
        {
          "label": "兴平市",
          "value": "610481"
        }
      ],
      [
        {
          "label": "临渭区",
          "value": "610502"
        },
        {
          "label": "华州区",
          "value": "610503"
        },
        {
          "label": "潼关县",
          "value": "610522"
        },
        {
          "label": "大荔县",
          "value": "610523"
        },
        {
          "label": "合阳县",
          "value": "610524"
        },
        {
          "label": "澄城县",
          "value": "610525"
        },
        {
          "label": "蒲城县",
          "value": "610526"
        },
        {
          "label": "白水县",
          "value": "610527"
        },
        {
          "label": "富平县",
          "value": "610528"
        },
        {
          "label": "韩城市",
          "value": "610581"
        },
        {
          "label": "华阴市",
          "value": "610582"
        }
      ],
      [
        {
          "label": "宝塔区",
          "value": "610602"
        },
        {
          "label": "安塞区",
          "value": "610603"
        },
        {
          "label": "延长县",
          "value": "610621"
        },
        {
          "label": "延川县",
          "value": "610622"
        },
        {
          "label": "子长县",
          "value": "610623"
        },
        {
          "label": "志丹县",
          "value": "610625"
        },
        {
          "label": "吴起县",
          "value": "610626"
        },
        {
          "label": "甘泉县",
          "value": "610627"
        },
        {
          "label": "富县",
          "value": "610628"
        },
        {
          "label": "洛川县",
          "value": "610629"
        },
        {
          "label": "宜川县",
          "value": "610630"
        },
        {
          "label": "黄龙县",
          "value": "610631"
        },
        {
          "label": "黄陵县",
          "value": "610632"
        }
      ],
      [
        {
          "label": "汉台区",
          "value": "610702"
        },
        {
          "label": "南郑区",
          "value": "610703"
        },
        {
          "label": "城固县",
          "value": "610722"
        },
        {
          "label": "洋县",
          "value": "610723"
        },
        {
          "label": "西乡县",
          "value": "610724"
        },
        {
          "label": "勉县",
          "value": "610725"
        },
        {
          "label": "宁强县",
          "value": "610726"
        },
        {
          "label": "略阳县",
          "value": "610727"
        },
        {
          "label": "镇巴县",
          "value": "610728"
        },
        {
          "label": "留坝县",
          "value": "610729"
        },
        {
          "label": "佛坪县",
          "value": "610730"
        }
      ],
      [
        {
          "label": "榆阳区",
          "value": "610802"
        },
        {
          "label": "横山区",
          "value": "610803"
        },
        {
          "label": "府谷县",
          "value": "610822"
        },
        {
          "label": "靖边县",
          "value": "610824"
        },
        {
          "label": "定边县",
          "value": "610825"
        },
        {
          "label": "绥德县",
          "value": "610826"
        },
        {
          "label": "米脂县",
          "value": "610827"
        },
        {
          "label": "佳县",
          "value": "610828"
        },
        {
          "label": "吴堡县",
          "value": "610829"
        },
        {
          "label": "清涧县",
          "value": "610830"
        },
        {
          "label": "子洲县",
          "value": "610831"
        },
        {
          "label": "神木市",
          "value": "610881"
        }
      ],
      [
        {
          "label": "汉滨区",
          "value": "610902"
        },
        {
          "label": "汉阴县",
          "value": "610921"
        },
        {
          "label": "石泉县",
          "value": "610922"
        },
        {
          "label": "宁陕县",
          "value": "610923"
        },
        {
          "label": "紫阳县",
          "value": "610924"
        },
        {
          "label": "岚皋县",
          "value": "610925"
        },
        {
          "label": "平利县",
          "value": "610926"
        },
        {
          "label": "镇坪县",
          "value": "610927"
        },
        {
          "label": "旬阳县",
          "value": "610928"
        },
        {
          "label": "白河县",
          "value": "610929"
        }
      ],
      [
        {
          "label": "商州区",
          "value": "611002"
        },
        {
          "label": "洛南县",
          "value": "611021"
        },
        {
          "label": "丹凤县",
          "value": "611022"
        },
        {
          "label": "商南县",
          "value": "611023"
        },
        {
          "label": "山阳县",
          "value": "611024"
        },
        {
          "label": "镇安县",
          "value": "611025"
        },
        {
          "label": "柞水县",
          "value": "611026"
        }
      ]
    ],
    [
      [
        {
          "label": "城关区",
          "value": "620102"
        },
        {
          "label": "七里河区",
          "value": "620103"
        },
        {
          "label": "西固区",
          "value": "620104"
        },
        {
          "label": "安宁区",
          "value": "620105"
        },
        {
          "label": "红古区",
          "value": "620111"
        },
        {
          "label": "永登县",
          "value": "620121"
        },
        {
          "label": "皋兰县",
          "value": "620122"
        },
        {
          "label": "榆中县",
          "value": "620123"
        },
        {
          "label": "兰州新区",
          "value": "620171"
        }
      ],
      [{
        "label": "嘉峪关市",
        "value": "620201"
      }],
      [
        {
          "label": "金川区",
          "value": "620302"
        },
        {
          "label": "永昌县",
          "value": "620321"
        }
      ],
      [
        {
          "label": "白银区",
          "value": "620402"
        },
        {
          "label": "平川区",
          "value": "620403"
        },
        {
          "label": "靖远县",
          "value": "620421"
        },
        {
          "label": "会宁县",
          "value": "620422"
        },
        {
          "label": "景泰县",
          "value": "620423"
        }
      ],
      [
        {
          "label": "秦州区",
          "value": "620502"
        },
        {
          "label": "麦积区",
          "value": "620503"
        },
        {
          "label": "清水县",
          "value": "620521"
        },
        {
          "label": "秦安县",
          "value": "620522"
        },
        {
          "label": "甘谷县",
          "value": "620523"
        },
        {
          "label": "武山县",
          "value": "620524"
        },
        {
          "label": "张家川回族自治县",
          "value": "620525"
        }
      ],
      [
        {
          "label": "凉州区",
          "value": "620602"
        },
        {
          "label": "民勤县",
          "value": "620621"
        },
        {
          "label": "古浪县",
          "value": "620622"
        },
        {
          "label": "天祝藏族自治县",
          "value": "620623"
        }
      ],
      [
        {
          "label": "甘州区",
          "value": "620702"
        },
        {
          "label": "肃南裕固族自治县",
          "value": "620721"
        },
        {
          "label": "民乐县",
          "value": "620722"
        },
        {
          "label": "临泽县",
          "value": "620723"
        },
        {
          "label": "高台县",
          "value": "620724"
        },
        {
          "label": "山丹县",
          "value": "620725"
        }
      ],
      [
        {
          "label": "崆峒区",
          "value": "620802"
        },
        {
          "label": "泾川县",
          "value": "620821"
        },
        {
          "label": "灵台县",
          "value": "620822"
        },
        {
          "label": "崇信县",
          "value": "620823"
        },
        {
          "label": "华亭县",
          "value": "620824"
        },
        {
          "label": "庄浪县",
          "value": "620825"
        },
        {
          "label": "静宁县",
          "value": "620826"
        },
        {
          "label": "平凉工业园区",
          "value": "620871"
        }
      ],
      [
        {
          "label": "肃州区",
          "value": "620902"
        },
        {
          "label": "金塔县",
          "value": "620921"
        },
        {
          "label": "瓜州县",
          "value": "620922"
        },
        {
          "label": "肃北蒙古族自治县",
          "value": "620923"
        },
        {
          "label": "阿克塞哈萨克族自治县",
          "value": "620924"
        },
        {
          "label": "玉门市",
          "value": "620981"
        },
        {
          "label": "敦煌市",
          "value": "620982"
        }
      ],
      [
        {
          "label": "西峰区",
          "value": "621002"
        },
        {
          "label": "庆城县",
          "value": "621021"
        },
        {
          "label": "环县",
          "value": "621022"
        },
        {
          "label": "华池县",
          "value": "621023"
        },
        {
          "label": "合水县",
          "value": "621024"
        },
        {
          "label": "正宁县",
          "value": "621025"
        },
        {
          "label": "宁县",
          "value": "621026"
        },
        {
          "label": "镇原县",
          "value": "621027"
        }
      ],
      [
        {
          "label": "安定区",
          "value": "621102"
        },
        {
          "label": "通渭县",
          "value": "621121"
        },
        {
          "label": "陇西县",
          "value": "621122"
        },
        {
          "label": "渭源县",
          "value": "621123"
        },
        {
          "label": "临洮县",
          "value": "621124"
        },
        {
          "label": "漳县",
          "value": "621125"
        },
        {
          "label": "岷县",
          "value": "621126"
        }
      ],
      [
        {
          "label": "武都区",
          "value": "621202"
        },
        {
          "label": "成县",
          "value": "621221"
        },
        {
          "label": "文县",
          "value": "621222"
        },
        {
          "label": "宕昌县",
          "value": "621223"
        },
        {
          "label": "康县",
          "value": "621224"
        },
        {
          "label": "西和县",
          "value": "621225"
        },
        {
          "label": "礼县",
          "value": "621226"
        },
        {
          "label": "徽县",
          "value": "621227"
        },
        {
          "label": "两当县",
          "value": "621228"
        }
      ],
      [
        {
          "label": "临夏市",
          "value": "622901"
        },
        {
          "label": "临夏县",
          "value": "622921"
        },
        {
          "label": "康乐县",
          "value": "622922"
        },
        {
          "label": "永靖县",
          "value": "622923"
        },
        {
          "label": "广河县",
          "value": "622924"
        },
        {
          "label": "和政县",
          "value": "622925"
        },
        {
          "label": "东乡族自治县",
          "value": "622926"
        },
        {
          "label": "积石山保安族东乡族撒拉族自治县",
          "value": "622927"
        }
      ],
      [
        {
          "label": "合作市",
          "value": "623001"
        },
        {
          "label": "临潭县",
          "value": "623021"
        },
        {
          "label": "卓尼县",
          "value": "623022"
        },
        {
          "label": "舟曲县",
          "value": "623023"
        },
        {
          "label": "迭部县",
          "value": "623024"
        },
        {
          "label": "玛曲县",
          "value": "623025"
        },
        {
          "label": "碌曲县",
          "value": "623026"
        },
        {
          "label": "夏河县",
          "value": "623027"
        }
      ]
    ],
    [
      [
        {
          "label": "城东区",
          "value": "630102"
        },
        {
          "label": "城中区",
          "value": "630103"
        },
        {
          "label": "城西区",
          "value": "630104"
        },
        {
          "label": "城北区",
          "value": "630105"
        },
        {
          "label": "大通回族土族自治县",
          "value": "630121"
        },
        {
          "label": "湟中县",
          "value": "630122"
        },
        {
          "label": "湟源县",
          "value": "630123"
        }
      ],
      [
        {
          "label": "乐都区",
          "value": "630202"
        },
        {
          "label": "平安区",
          "value": "630203"
        },
        {
          "label": "民和回族土族自治县",
          "value": "630222"
        },
        {
          "label": "互助土族自治县",
          "value": "630223"
        },
        {
          "label": "化隆回族自治县",
          "value": "630224"
        },
        {
          "label": "循化撒拉族自治县",
          "value": "630225"
        }
      ],
      [
        {
          "label": "门源回族自治县",
          "value": "632221"
        },
        {
          "label": "祁连县",
          "value": "632222"
        },
        {
          "label": "海晏县",
          "value": "632223"
        },
        {
          "label": "刚察县",
          "value": "632224"
        }
      ],
      [
        {
          "label": "同仁县",
          "value": "632321"
        },
        {
          "label": "尖扎县",
          "value": "632322"
        },
        {
          "label": "泽库县",
          "value": "632323"
        },
        {
          "label": "河南蒙古族自治县",
          "value": "632324"
        }
      ],
      [
        {
          "label": "共和县",
          "value": "632521"
        },
        {
          "label": "同德县",
          "value": "632522"
        },
        {
          "label": "贵德县",
          "value": "632523"
        },
        {
          "label": "兴海县",
          "value": "632524"
        },
        {
          "label": "贵南县",
          "value": "632525"
        }
      ],
      [
        {
          "label": "玛沁县",
          "value": "632621"
        },
        {
          "label": "班玛县",
          "value": "632622"
        },
        {
          "label": "甘德县",
          "value": "632623"
        },
        {
          "label": "达日县",
          "value": "632624"
        },
        {
          "label": "久治县",
          "value": "632625"
        },
        {
          "label": "玛多县",
          "value": "632626"
        }
      ],
      [
        {
          "label": "玉树市",
          "value": "632701"
        },
        {
          "label": "杂多县",
          "value": "632722"
        },
        {
          "label": "称多县",
          "value": "632723"
        },
        {
          "label": "治多县",
          "value": "632724"
        },
        {
          "label": "囊谦县",
          "value": "632725"
        },
        {
          "label": "曲麻莱县",
          "value": "632726"
        }
      ],
      [
        {
          "label": "格尔木市",
          "value": "632801"
        },
        {
          "label": "德令哈市",
          "value": "632802"
        },
        {
          "label": "乌兰县",
          "value": "632821"
        },
        {
          "label": "都兰县",
          "value": "632822"
        },
        {
          "label": "天峻县",
          "value": "632823"
        },
        {
          "label": "大柴旦行政委员会",
          "value": "632857"
        },
        {
          "label": "冷湖行政委员会",
          "value": "632858"
        },
        {
          "label": "茫崖行政委员会",
          "value": "632859"
        }
      ]
    ],
    [
      [
        {
          "label": "兴庆区",
          "value": "640104"
        },
        {
          "label": "西夏区",
          "value": "640105"
        },
        {
          "label": "金凤区",
          "value": "640106"
        },
        {
          "label": "永宁县",
          "value": "640121"
        },
        {
          "label": "贺兰县",
          "value": "640122"
        },
        {
          "label": "灵武市",
          "value": "640181"
        }
      ],
      [
        {
          "label": "大武口区",
          "value": "640202"
        },
        {
          "label": "惠农区",
          "value": "640205"
        },
        {
          "label": "平罗县",
          "value": "640221"
        }
      ],
      [
        {
          "label": "利通区",
          "value": "640302"
        },
        {
          "label": "红寺堡区",
          "value": "640303"
        },
        {
          "label": "盐池县",
          "value": "640323"
        },
        {
          "label": "同心县",
          "value": "640324"
        },
        {
          "label": "青铜峡市",
          "value": "640381"
        }
      ],
      [
        {
          "label": "原州区",
          "value": "640402"
        },
        {
          "label": "西吉县",
          "value": "640422"
        },
        {
          "label": "隆德县",
          "value": "640423"
        },
        {
          "label": "泾源县",
          "value": "640424"
        },
        {
          "label": "彭阳县",
          "value": "640425"
        }
      ],
      [
        {
          "label": "沙坡头区",
          "value": "640502"
        },
        {
          "label": "中宁县",
          "value": "640521"
        },
        {
          "label": "海原县",
          "value": "640522"
        }
      ]
    ],
    [
      [
        {
          "label": "天山区",
          "value": "650102"
        },
        {
          "label": "沙依巴克区",
          "value": "650103"
        },
        {
          "label": "新市区",
          "value": "650104"
        },
        {
          "label": "水磨沟区",
          "value": "650105"
        },
        {
          "label": "头屯河区",
          "value": "650106"
        },
        {
          "label": "达坂城区",
          "value": "650107"
        },
        {
          "label": "米东区",
          "value": "650109"
        },
        {
          "label": "乌鲁木齐县",
          "value": "650121"
        },
        {
          "label": "乌鲁木齐经济技术开发区",
          "value": "650171"
        },
        {
          "label": "乌鲁木齐高新技术产业开发区",
          "value": "650172"
        }
      ],
      [
        {
          "label": "独山子区",
          "value": "650202"
        },
        {
          "label": "克拉玛依区",
          "value": "650203"
        },
        {
          "label": "白碱滩区",
          "value": "650204"
        },
        {
          "label": "乌尔禾区",
          "value": "650205"
        }
      ],
      [
        {
          "label": "高昌区",
          "value": "650402"
        },
        {
          "label": "鄯善县",
          "value": "650421"
        },
        {
          "label": "托克逊县",
          "value": "650422"
        }
      ],
      [
        {
          "label": "伊州区",
          "value": "650502"
        },
        {
          "label": "巴里坤哈萨克自治县",
          "value": "650521"
        },
        {
          "label": "伊吾县",
          "value": "650522"
        }
      ],
      [
        {
          "label": "昌吉市",
          "value": "652301"
        },
        {
          "label": "阜康市",
          "value": "652302"
        },
        {
          "label": "呼图壁县",
          "value": "652323"
        },
        {
          "label": "玛纳斯县",
          "value": "652324"
        },
        {
          "label": "奇台县",
          "value": "652325"
        },
        {
          "label": "吉木萨尔县",
          "value": "652327"
        },
        {
          "label": "木垒哈萨克自治县",
          "value": "652328"
        }
      ],
      [
        {
          "label": "博乐市",
          "value": "652701"
        },
        {
          "label": "阿拉山口市",
          "value": "652702"
        },
        {
          "label": "精河县",
          "value": "652722"
        },
        {
          "label": "温泉县",
          "value": "652723"
        }
      ],
      [
        {
          "label": "库尔勒市",
          "value": "652801"
        },
        {
          "label": "轮台县",
          "value": "652822"
        },
        {
          "label": "尉犁县",
          "value": "652823"
        },
        {
          "label": "若羌县",
          "value": "652824"
        },
        {
          "label": "且末县",
          "value": "652825"
        },
        {
          "label": "焉耆回族自治县",
          "value": "652826"
        },
        {
          "label": "和静县",
          "value": "652827"
        },
        {
          "label": "和硕县",
          "value": "652828"
        },
        {
          "label": "博湖县",
          "value": "652829"
        },
        {
          "label": "库尔勒经济技术开发区",
          "value": "652871"
        }
      ],
      [
        {
          "label": "阿克苏市",
          "value": "652901"
        },
        {
          "label": "温宿县",
          "value": "652922"
        },
        {
          "label": "库车县",
          "value": "652923"
        },
        {
          "label": "沙雅县",
          "value": "652924"
        },
        {
          "label": "新和县",
          "value": "652925"
        },
        {
          "label": "拜城县",
          "value": "652926"
        },
        {
          "label": "乌什县",
          "value": "652927"
        },
        {
          "label": "阿瓦提县",
          "value": "652928"
        },
        {
          "label": "柯坪县",
          "value": "652929"
        }
      ],
      [
        {
          "label": "阿图什市",
          "value": "653001"
        },
        {
          "label": "阿克陶县",
          "value": "653022"
        },
        {
          "label": "阿合奇县",
          "value": "653023"
        },
        {
          "label": "乌恰县",
          "value": "653024"
        }
      ],
      [
        {
          "label": "喀什市",
          "value": "653101"
        },
        {
          "label": "疏附县",
          "value": "653121"
        },
        {
          "label": "疏勒县",
          "value": "653122"
        },
        {
          "label": "英吉沙县",
          "value": "653123"
        },
        {
          "label": "泽普县",
          "value": "653124"
        },
        {
          "label": "莎车县",
          "value": "653125"
        },
        {
          "label": "叶城县",
          "value": "653126"
        },
        {
          "label": "麦盖提县",
          "value": "653127"
        },
        {
          "label": "岳普湖县",
          "value": "653128"
        },
        {
          "label": "伽师县",
          "value": "653129"
        },
        {
          "label": "巴楚县",
          "value": "653130"
        },
        {
          "label": "塔什库尔干塔吉克自治县",
          "value": "653131"
        }
      ],
      [
        {
          "label": "和田市",
          "value": "653201"
        },
        {
          "label": "和田县",
          "value": "653221"
        },
        {
          "label": "墨玉县",
          "value": "653222"
        },
        {
          "label": "皮山县",
          "value": "653223"
        },
        {
          "label": "洛浦县",
          "value": "653224"
        },
        {
          "label": "策勒县",
          "value": "653225"
        },
        {
          "label": "于田县",
          "value": "653226"
        },
        {
          "label": "民丰县",
          "value": "653227"
        }
      ],
      [
        {
          "label": "伊宁市",
          "value": "654002"
        },
        {
          "label": "奎屯市",
          "value": "654003"
        },
        {
          "label": "霍尔果斯市",
          "value": "654004"
        },
        {
          "label": "伊宁县",
          "value": "654021"
        },
        {
          "label": "察布查尔锡伯自治县",
          "value": "654022"
        },
        {
          "label": "霍城县",
          "value": "654023"
        },
        {
          "label": "巩留县",
          "value": "654024"
        },
        {
          "label": "新源县",
          "value": "654025"
        },
        {
          "label": "昭苏县",
          "value": "654026"
        },
        {
          "label": "特克斯县",
          "value": "654027"
        },
        {
          "label": "尼勒克县",
          "value": "654028"
        }
      ],
      [
        {
          "label": "塔城市",
          "value": "654201"
        },
        {
          "label": "乌苏市",
          "value": "654202"
        },
        {
          "label": "额敏县",
          "value": "654221"
        },
        {
          "label": "沙湾县",
          "value": "654223"
        },
        {
          "label": "托里县",
          "value": "654224"
        },
        {
          "label": "裕民县",
          "value": "654225"
        },
        {
          "label": "和布克赛尔蒙古自治县",
          "value": "654226"
        }
      ],
      [
        {
          "label": "阿勒泰市",
          "value": "654301"
        },
        {
          "label": "布尔津县",
          "value": "654321"
        },
        {
          "label": "富蕴县",
          "value": "654322"
        },
        {
          "label": "福海县",
          "value": "654323"
        },
        {
          "label": "哈巴河县",
          "value": "654324"
        },
        {
          "label": "青河县",
          "value": "654325"
        },
        {
          "label": "吉木乃县",
          "value": "654326"
        }
      ],
      [
        {
          "label": "石河子市",
          "value": "659001"
        },
        {
          "label": "阿拉尔市",
          "value": "659002"
        },
        {
          "label": "图木舒克市",
          "value": "659003"
        },
        {
          "label": "五家渠市",
          "value": "659004"
        },
        {
          "label": "铁门关市",
          "value": "659006"
        }
      ]
    ],
    [
      [{
        "label": "台北",
        "value": "660101"
      }],
      [{
        "label": "高雄",
        "value": "660201"
      }],
      [{
        "label": "基隆",
        "value": "660301"
      }],
      [{
        "label": "台中",
        "value": "660401"
      }],
      [{
        "label": "台南",
        "value": "660501"
      }],
      [{
        "label": "新竹",
        "value": "660601"
      }],
      [{
        "label": "嘉义",
        "value": "660701"
      }],
      [{
        "label": "宜兰",
        "value": "660801"
      }],
      [{
        "label": "桃园",
        "value": "660901"
      }],
      [{
        "label": "苗栗",
        "value": "661001"
      }],
      [{
        "label": "彰化",
        "value": "661101"
      }],
      [{
        "label": "南投",
        "value": "661201"
      }],
      [{
        "label": "云林",
        "value": "661301"
      }],
      [{
        "label": "屏东",
        "value": "661401"
      }],
      [{
        "label": "台东",
        "value": "661501"
      }],
      [{
        "label": "花莲",
        "value": "661601"
      }],
      [{
        "label": "澎湖",
        "value": "661701"
      }]
    ],
    [
      [{
        "label": "香港岛",
        "value": "670101"
      }],
      [{
        "label": "九龙",
        "value": "670201"
      }],
      [{
        "label": "新界",
        "value": "670301"
      }]
    ],
    [
      [{
        "label": "澳门半岛",
        "value": "680101"
      }],
      [{
        "label": "氹仔岛",
        "value": "680201"
      }],
      [{
        "label": "路环岛",
        "value": "680301"
      }],
      [{
        "label": "路氹城",
        "value": "680401"
      }]
    ]
  ];
  formatAppLog("log", "at components/mpvue-citypicker/mpvueCityPicker.vue:28", provinceData);
  const _sfc_main$a = {
    data() {
      return {
        pickerValue: [0, 0, 0],
        provinceDataList: provinceData,
        cityDataList: cityData[0],
        areaDataList: areaData[0][0],
        /* 是否显示控件 */
        showPicker: false
      };
    },
    created() {
      this.init();
    },
    props: {
      /* 默认值 */
      pickerValueDefault: {
        type: Array,
        default() {
          return [0, 0, 0];
        }
      },
      /* 主题色 */
      themeColor: String
    },
    watch: {
      pickerValueDefault() {
        this.init();
      }
    },
    methods: {
      init() {
        this.handPickValueDefault();
        const pickerValueDefault = this.pickerValueDefault;
        this.cityDataList = cityData[pickerValueDefault[0]];
        this.areaDataList = areaData[pickerValueDefault[0]][pickerValueDefault[1]];
        this.pickerValue = pickerValueDefault;
      },
      show() {
        setTimeout(() => {
          this.showPicker = true;
        }, 0);
      },
      maskClick() {
        this.pickerCancel();
      },
      pickerCancel() {
        this.showPicker = false;
        this._$emit("onCancel");
      },
      pickerConfirm(e) {
        this.showPicker = false;
        this._$emit("onConfirm");
      },
      showPickerView() {
        this.showPicker = true;
      },
      handPickValueDefault() {
        const pickerValueDefault = this.pickerValueDefault;
        let provinceIndex = pickerValueDefault[0];
        let cityIndex = pickerValueDefault[1];
        const areaIndex = pickerValueDefault[2];
        if (provinceIndex !== 0 || cityIndex !== 0 || areaIndex !== 0) {
          if (provinceIndex > provinceData.length - 1) {
            this.pickerValueDefault[0] = provinceIndex = provinceData.length - 1;
          }
          if (cityIndex > cityData[provinceIndex].length - 1) {
            this.pickerValueDefault[1] = cityIndex = cityData[provinceIndex].length - 1;
          }
          if (areaIndex > areaData[provinceIndex][cityIndex].length - 1) {
            this.pickerValueDefault[2] = areaData[provinceIndex][cityIndex].length - 1;
          }
        }
      },
      pickerChange(e) {
        let changePickerValue = e.detail.value;
        if (this.pickerValue[0] !== changePickerValue[0]) {
          this.cityDataList = cityData[changePickerValue[0]];
          this.areaDataList = areaData[changePickerValue[0]][0];
          changePickerValue[1] = 0;
          changePickerValue[2] = 0;
        } else if (this.pickerValue[1] !== changePickerValue[1]) {
          this.areaDataList = areaData[changePickerValue[0]][changePickerValue[1]];
          changePickerValue[2] = 0;
        }
        this.pickerValue = changePickerValue;
        this._$emit("onChange");
      },
      _$emit(emitName) {
        let pickObj = {
          label: this._getLabel(),
          value: this.pickerValue,
          cityCode: this._getCityCode()
        };
        this.$emit(emitName, pickObj);
      },
      _getLabel() {
        let pcikerLabel = this.provinceDataList[this.pickerValue[0]].label + "-" + this.cityDataList[this.pickerValue[1]].label + "-" + this.areaDataList[this.pickerValue[2]].label;
        return pcikerLabel;
      },
      _getCityCode() {
        return this.areaDataList[this.pickerValue[2]].value;
      }
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("div", { class: "mpvue-picker" }, [
      vue.createElementVNode(
        "div",
        {
          class: vue.normalizeClass({ "pickerMask": $data.showPicker }),
          onClick: _cache[0] || (_cache[0] = (...args) => $options.maskClick && $options.maskClick(...args)),
          catchtouchmove: "true"
        },
        null,
        2
        /* CLASS */
      ),
      vue.createElementVNode(
        "div",
        {
          class: vue.normalizeClass(["mpvue-picker-content", { "mpvue-picker-view-show": $data.showPicker }])
        },
        [
          vue.createElementVNode("div", {
            class: "mpvue-picker__hd",
            catchtouchmove: "true"
          }, [
            vue.createElementVNode("div", {
              class: "mpvue-picker__action",
              onClick: _cache[1] || (_cache[1] = (...args) => $options.pickerCancel && $options.pickerCancel(...args))
            }, "取消"),
            vue.createElementVNode(
              "div",
              {
                class: "mpvue-picker__action",
                style: vue.normalizeStyle({ color: $props.themeColor }),
                onClick: _cache[2] || (_cache[2] = (...args) => $options.pickerConfirm && $options.pickerConfirm(...args))
              },
              "确定",
              4
              /* STYLE */
            )
          ]),
          vue.createElementVNode("picker-view", {
            "indicator-style": "height: 40px;",
            class: "mpvue-picker-view",
            value: $data.pickerValue,
            onChange: _cache[3] || (_cache[3] = (...args) => $options.pickerChange && $options.pickerChange(...args))
          }, [
            vue.createElementVNode("picker-view-column", null, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($data.provinceDataList, (item, index) => {
                  return vue.openBlock(), vue.createElementBlock(
                    "div",
                    {
                      class: "picker-item",
                      key: index
                    },
                    vue.toDisplayString(item.label),
                    1
                    /* TEXT */
                  );
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ]),
            vue.createElementVNode("picker-view-column", null, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($data.cityDataList, (item, index) => {
                  return vue.openBlock(), vue.createElementBlock(
                    "div",
                    {
                      class: "picker-item",
                      key: index
                    },
                    vue.toDisplayString(item.label),
                    1
                    /* TEXT */
                  );
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ]),
            vue.createElementVNode("picker-view-column", null, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($data.areaDataList, (item, index) => {
                  return vue.openBlock(), vue.createElementBlock(
                    "div",
                    {
                      class: "picker-item",
                      key: index
                    },
                    vue.toDisplayString(item.label),
                    1
                    /* TEXT */
                  );
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])
          ], 40, ["value"])
        ],
        2
        /* CLASS */
      )
    ]);
  }
  const mpvueCityPicker = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["__scopeId", "data-v-8341ddc5"], ["__file", "D:/project/uni-app/leoh-seckill-shop/components/mpvue-citypicker/mpvueCityPicker.vue"]]);
  const _sfc_main$9 = {
    __name: "address-edit",
    setup(__props, { expose: __expose }) {
      __expose();
      const addressStore = useAddressStore();
      let regionPicker = vue.ref();
      let formData = vue.reactive({
        id: "",
        realname: "",
        telephone: "",
        region: "",
        detail: ""
      });
      vue.onMounted(() => {
        const address = addressStore.address;
        if (address) {
          uni.setNavigationBarTitle({
            title: "编辑地址"
          });
          formData.id = address.id;
          formData.realname = address.realname;
          formData.telephone = address.telephone;
          formData.region = address.region;
          formData.detail = address.detail;
        }
      });
      const onRegionInputClick = () => {
        regionPicker.value.show();
      };
      const onSubmit = () => {
        uni.$emit("address-edit", { "address": formData });
        uni.navigateBack();
      };
      const onRegionConfirm = (e) => {
        formatAppLog("log", "at pages/address-edit/address-edit.vue:72", e);
        let addresses = e.label.split("-");
        let province = addresses[0];
        let city = addresses[1] == "市辖区" ? "" : addresses[1];
        let district = addresses[2];
        formData.region = province + city + district;
      };
      const __returned__ = { addressStore, get regionPicker() {
        return regionPicker;
      }, set regionPicker(v) {
        regionPicker = v;
      }, get formData() {
        return formData;
      }, set formData(v) {
        formData = v;
      }, onRegionInputClick, onSubmit, onRegionConfirm, mpvueCityPicker, ref: vue.ref, reactive: vue.reactive, onMounted: vue.onMounted, get useAddressStore() {
        return useAddressStore;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "mt-2" }, [
      vue.createElementVNode("view", { class: "d-flex a-center py-2 border-bottom bg-white" }, [
        vue.createElementVNode("text", { class: "font-md text-dark px-2" }, "姓名"),
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.formData.realname = $event),
            type: "text",
            placeholder: "请输入姓名",
            "placeholder-style": "font-size: 30rpx"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $setup.formData.realname]
        ])
      ]),
      vue.createElementVNode("view", { class: "d-flex a-center py-2 border-bottom bg-white" }, [
        vue.createElementVNode("text", { class: "font-md text-dark px-2" }, "电话"),
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.formData.telephone = $event),
            type: "text",
            placeholder: "请输入电话",
            "placeholder-style": "font-size: 30rpx"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $setup.formData.telephone]
        ])
      ]),
      vue.createElementVNode("view", { class: "d-flex a-center py-2 border-bottom bg-white" }, [
        vue.createElementVNode("text", { class: "font-md text-dark px-2" }, "区域"),
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.formData.region = $event),
            onClick: $setup.onRegionInputClick,
            type: "text",
            placeholder: "请选择区域",
            "placeholder-style": "font-size: 30rpx",
            disabled: ""
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $setup.formData.region]
        ]),
        vue.createVNode(
          $setup["mpvueCityPicker"],
          {
            ref: "regionPicker",
            onOnConfirm: $setup.onRegionConfirm
          },
          null,
          512
          /* NEED_PATCH */
        )
      ]),
      vue.createElementVNode("view", { class: "d-flex a-center py-2 border-bottom bg-white" }, [
        vue.createElementVNode("text", { class: "font-md text-dark px-2" }, "地址"),
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.formData.detail = $event),
            type: "text",
            placeholder: "请输入详细地址",
            "placeholder-style": "font-size: 30rpx"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $setup.formData.detail]
        ])
      ]),
      vue.createElementVNode("view", { class: "mt-3 px-2" }, [
        vue.createElementVNode("button", {
          type: "warn",
          onClick: $setup.onSubmit
        }, "提交")
      ])
    ]);
  }
  const PagesAddressEditAddressEdit = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__file", "D:/project/uni-app/leoh-seckill-shop/pages/address-edit/address-edit.vue"]]);
  const _sfc_main$8 = {
    name: "UniTag",
    emits: ["click"],
    props: {
      type: {
        // 标签类型default、primary、success、warning、error、royal
        type: String,
        default: "default"
      },
      size: {
        // 标签大小 normal, small
        type: String,
        default: "normal"
      },
      // 标签内容
      text: {
        type: String,
        default: ""
      },
      disabled: {
        // 是否为禁用状态
        type: [Boolean, String],
        default: false
      },
      inverted: {
        // 是否为空心
        type: [Boolean, String],
        default: false
      },
      circle: {
        // 是否为圆角样式
        type: [Boolean, String],
        default: false
      },
      mark: {
        // 是否为标记样式
        type: [Boolean, String],
        default: false
      },
      customStyle: {
        type: String,
        default: ""
      }
    },
    computed: {
      classes() {
        const {
          type,
          disabled,
          inverted,
          circle,
          mark,
          size,
          isTrue
        } = this;
        const classArr = [
          "uni-tag--" + type,
          "uni-tag--" + size,
          isTrue(disabled) ? "uni-tag--disabled" : "",
          isTrue(inverted) ? "uni-tag--" + type + "--inverted" : "",
          isTrue(circle) ? "uni-tag--circle" : "",
          isTrue(mark) ? "uni-tag--mark" : "",
          // type === 'default' ? 'uni-tag--default' : 'uni-tag-text',
          isTrue(inverted) ? "uni-tag--inverted uni-tag-text--" + type : "",
          size === "small" ? "uni-tag-text--small" : ""
        ];
        return classArr.join(" ");
      }
    },
    methods: {
      isTrue(value) {
        return value === true || value === "true";
      },
      onClick() {
        if (this.isTrue(this.disabled))
          return;
        this.$emit("click");
      }
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return $props.text ? (vue.openBlock(), vue.createElementBlock(
      "text",
      {
        key: 0,
        class: vue.normalizeClass(["uni-tag", $options.classes]),
        style: vue.normalizeStyle($props.customStyle),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
      },
      vue.toDisplayString($props.text),
      7
      /* TEXT, CLASS, STYLE */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__scopeId", "data-v-1f94d070"], ["__file", "D:/project/uni-app/leoh-seckill-shop/uni_modules/uni-tag/components/uni-tag/uni-tag.vue"]]);
  const block0 = (Comp) => {
    (Comp.$wxs || (Comp.$wxs = [])).push("handler");
    (Comp.$wxsModules || (Comp.$wxsModules = {}))["handler"] = "812594ec";
  };
  const _sfc_main$7 = {
    name: "node",
    options: {},
    data() {
      return {
        ctrl: {}
      };
    },
    props: {
      name: String,
      attrs: {
        type: Object,
        default() {
          return {};
        }
      },
      childs: Array,
      opts: Array
    },
    components: {},
    mounted() {
      this.$nextTick(() => {
        for (this.root = this.$parent; this.root.$options.name !== "uv-parse"; this.root = this.root.$parent)
          ;
      });
      if (this.opts[0]) {
        let i;
        for (i = this.childs.length; i--; ) {
          if (this.childs[i].name === "img")
            break;
        }
        if (i !== -1) {
          this.observer = uni.createIntersectionObserver(this).relativeToViewport({
            top: 500,
            bottom: 500
          });
          this.observer.observe("._img", (res) => {
            if (res.intersectionRatio) {
              this.$set(this.ctrl, "load", 1);
              this.observer.disconnect();
            }
          });
        }
      }
    },
    beforeDestroy() {
      if (this.observer) {
        this.observer.disconnect();
      }
    },
    methods: {
      /**
       * @description 播放视频事件
       * @param {Event} e
       */
      play(e) {
        this.root.$emit("play");
      },
      /**
       * @description 图片点击事件
       * @param {Event} e
       */
      imgTap(e) {
        const node2 = this.childs[e.currentTarget.dataset.i];
        if (node2.a) {
          this.linkTap(node2.a);
          return;
        }
        if (node2.attrs.ignore)
          return;
        node2.attrs.src = node2.attrs.src || node2.attrs["data-src"];
        this.root.$emit("imgtap", node2.attrs);
        if (this.root.previewImg) {
          uni.previewImage({
            current: parseInt(node2.attrs.i),
            urls: this.root.imgList
          });
        }
      },
      /**
       * @description 图片长按
       */
      imgLongTap(e) {
        const attrs = this.childs[e.currentTarget.dataset.i].attrs;
        if (this.opts[3] && !attrs.ignore) {
          uni.showActionSheet({
            itemList: ["保存图片"],
            success: () => {
              const save = (path) => {
                uni.saveImageToPhotosAlbum({
                  filePath: path,
                  success() {
                    uni.showToast({
                      title: "保存成功"
                    });
                  }
                });
              };
              if (this.root.imgList[attrs.i].startsWith("http")) {
                uni.downloadFile({
                  url: this.root.imgList[attrs.i],
                  success: (res) => save(res.tempFilePath)
                });
              } else {
                save(this.root.imgList[attrs.i]);
              }
            }
          });
        }
      },
      /**
       * @description 图片加载完成事件
       * @param {Event} e
       */
      imgLoad(e) {
        const i = e.currentTarget.dataset.i;
        if (!this.childs[i].w) {
          this.$set(this.ctrl, i, e.detail.width);
        } else if (this.opts[1] && !this.ctrl[i] || this.ctrl[i] === -1) {
          this.$set(this.ctrl, i, 1);
        }
        this.checkReady();
      },
      /**
       * @description 检查是否所有图片加载完毕
       */
      checkReady() {
        if (this.root && !this.root.lazyLoad) {
          this.root._unloadimgs -= 1;
          if (!this.root._unloadimgs) {
            setTimeout(() => {
              this.root.getRect().then((rect) => {
                this.root.$emit("ready", rect);
              }).catch(() => {
                this.root.$emit("ready", {});
              });
            }, 350);
          }
        }
      },
      /**
       * @description 链接点击事件
       * @param {Event} e
       */
      linkTap(e) {
        const node2 = e.currentTarget ? this.childs[e.currentTarget.dataset.i] : {};
        const attrs = node2.attrs || e;
        const href = attrs.href;
        this.root.$emit("linktap", Object.assign({
          innerText: this.root.getText(node2.children || [])
          // 链接内的文本内容
        }, attrs));
        if (href) {
          if (href[0] === "#") {
            this.root.navigateTo(href.substring(1)).catch(() => {
            });
          } else if (href.split("?")[0].includes("://")) {
            if (this.root.copyLink) {
              plus.runtime.openWeb(href);
            }
          } else {
            uni.navigateTo({
              url: href,
              fail() {
                uni.switchTab({
                  url: href,
                  fail() {
                  }
                });
              }
            });
          }
        }
      },
      /**
       * @description 错误事件
       * @param {Event} e
       */
      mediaError(e) {
        const i = e.currentTarget.dataset.i;
        const node2 = this.childs[i];
        if (node2.name === "video" || node2.name === "audio") {
          let index = (this.ctrl[i] || 0) + 1;
          if (index > node2.src.length) {
            index = 0;
          }
          if (index < node2.src.length) {
            this.$set(this.ctrl, i, index);
            return;
          }
        } else if (node2.name === "img") {
          if (this.opts[2]) {
            this.$set(this.ctrl, i, -1);
          }
          this.checkReady();
        }
        if (this.root) {
          this.root.$emit("error", {
            source: node2.name,
            attrs: node2.attrs,
            errMsg: e.detail.errMsg
          });
        }
      }
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_node = vue.resolveComponent("node", true);
    return vue.openBlock(), vue.createElementBlock("view", {
      id: $props.attrs.id,
      class: vue.normalizeClass("_block _" + $props.name + " " + $props.attrs.class),
      style: vue.normalizeStyle($props.attrs.style)
    }, [
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($props.childs, (n, i) => {
          return vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            { key: i },
            [
              vue.createCommentVNode(" 图片 "),
              vue.createCommentVNode(" 占位图 "),
              n.name === "img" && !n.t && ($props.opts[1] && !$data.ctrl[i] || $data.ctrl[i] < 0) ? (vue.openBlock(), vue.createElementBlock("image", {
                key: 0,
                class: "_img",
                style: vue.normalizeStyle(n.attrs.style),
                src: $data.ctrl[i] < 0 ? $props.opts[2] : $props.opts[1],
                mode: "widthFix"
              }, null, 12, ["src"])) : vue.createCommentVNode("v-if", true),
              vue.createCommentVNode(" 显示图片 "),
              vue.createCommentVNode(" 表格中的图片，使用 rich-text 防止大小不正确 "),
              n.name === "img" && n.t ? (vue.openBlock(), vue.createElementBlock("rich-text", {
                key: 1,
                style: vue.normalizeStyle("display:" + n.t),
                nodes: [{ attrs: { style: n.attrs.style, src: n.attrs.src }, name: "img" }],
                "data-i": i,
                onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.imgTap && $options.imgTap(...args), ["stop"]))
              }, null, 12, ["nodes", "data-i"])) : n.name === "img" ? (vue.openBlock(), vue.createElementBlock("image", {
                key: 2,
                id: n.attrs.id,
                class: vue.normalizeClass("_img " + n.attrs.class),
                style: vue.normalizeStyle(($data.ctrl[i] === -1 ? "display:none;" : "") + "width:" + ($data.ctrl[i] || 1) + "px;" + n.attrs.style),
                src: n.attrs.src || ($data.ctrl.load ? n.attrs["data-src"] : ""),
                mode: !n.h ? "widthFix" : !n.w ? "heightFix" : "",
                "data-i": i,
                onLoad: _cache[1] || (_cache[1] = (...args) => $options.imgLoad && $options.imgLoad(...args)),
                onError: _cache[2] || (_cache[2] = (...args) => $options.mediaError && $options.mediaError(...args)),
                onClick: _cache[3] || (_cache[3] = vue.withModifiers((...args) => $options.imgTap && $options.imgTap(...args), ["stop"])),
                onLongpress: _cache[4] || (_cache[4] = (...args) => $options.imgLongTap && $options.imgLongTap(...args))
              }, null, 46, ["id", "src", "mode", "data-i"])) : n.text ? (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                { key: 3 },
                [
                  vue.createCommentVNode(" 文本 "),
                  vue.createElementVNode(
                    "text",
                    { decode: "" },
                    vue.toDisplayString(n.text),
                    1
                    /* TEXT */
                  )
                ],
                2112
                /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
              )) : n.name === "br" ? (vue.openBlock(), vue.createElementBlock("text", { key: 4 }, "\\n")) : n.name === "a" ? (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                { key: 5 },
                [
                  vue.createCommentVNode(" 链接 "),
                  vue.createElementVNode("view", {
                    id: n.attrs.id,
                    class: vue.normalizeClass((n.attrs.href ? "_a " : "") + n.attrs.class),
                    "hover-class": "_hover",
                    style: vue.normalizeStyle("display:inline;" + n.attrs.style),
                    "data-i": i,
                    onClick: _cache[5] || (_cache[5] = vue.withModifiers((...args) => $options.linkTap && $options.linkTap(...args), ["stop"]))
                  }, [
                    vue.createVNode(_component_node, {
                      name: "span",
                      childs: n.children,
                      opts: $props.opts,
                      style: { "display": "inherit" }
                    }, null, 8, ["childs", "opts"])
                  ], 14, ["id", "data-i"])
                ],
                2112
                /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
              )) : n.html ? (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                { key: 6 },
                [
                  vue.createCommentVNode(" 视频 "),
                  vue.createElementVNode("view", {
                    id: n.attrs.id,
                    class: vue.normalizeClass("_video " + n.attrs.class),
                    style: vue.normalizeStyle(n.attrs.style),
                    innerHTML: n.html,
                    onVplay: _cache[6] || (_cache[6] = vue.withModifiers((...args) => $options.play && $options.play(...args), ["stop"]))
                  }, null, 46, ["id", "innerHTML"])
                ],
                2112
                /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
              )) : n.name === "iframe" ? (vue.openBlock(), vue.createElementBlock("iframe", {
                key: 7,
                style: vue.normalizeStyle(n.attrs.style),
                allowfullscreen: n.attrs.allowfullscreen,
                frameborder: n.attrs.frameborder,
                src: n.attrs.src
              }, null, 12, ["allowfullscreen", "frameborder", "src"])) : n.name === "embed" ? (vue.openBlock(), vue.createElementBlock("embed", {
                key: 8,
                style: vue.normalizeStyle(n.attrs.style),
                src: n.attrs.src
              }, null, 12, ["src"])) : n.name === "table" && n.c || n.name === "li" ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 9,
                id: n.attrs.id,
                class: vue.normalizeClass("_" + n.name + " " + n.attrs.class),
                style: vue.normalizeStyle(n.attrs.style)
              }, [
                n.name === "li" ? (vue.openBlock(), vue.createBlock(_component_node, {
                  key: 0,
                  childs: n.children,
                  opts: $props.opts
                }, null, 8, ["childs", "opts"])) : (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  { key: 1 },
                  vue.renderList(n.children, (tbody, x) => {
                    return vue.openBlock(), vue.createElementBlock(
                      "view",
                      {
                        key: x,
                        class: vue.normalizeClass("_" + tbody.name + " " + tbody.attrs.class),
                        style: vue.normalizeStyle(tbody.attrs.style)
                      },
                      [
                        tbody.name === "td" || tbody.name === "th" ? (vue.openBlock(), vue.createBlock(_component_node, {
                          key: 0,
                          childs: tbody.children,
                          opts: $props.opts
                        }, null, 8, ["childs", "opts"])) : (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          { key: 1 },
                          vue.renderList(tbody.children, (tr, y) => {
                            return vue.openBlock(), vue.createElementBlock(
                              vue.Fragment,
                              { key: y },
                              [
                                tr.name === "td" || tr.name === "th" ? (vue.openBlock(), vue.createElementBlock(
                                  "view",
                                  {
                                    key: 0,
                                    class: vue.normalizeClass("_" + tr.name + " " + tr.attrs.class),
                                    style: vue.normalizeStyle(tr.attrs.style)
                                  },
                                  [
                                    vue.createVNode(_component_node, {
                                      childs: tr.children,
                                      opts: $props.opts
                                    }, null, 8, ["childs", "opts"])
                                  ],
                                  6
                                  /* CLASS, STYLE */
                                )) : (vue.openBlock(), vue.createElementBlock(
                                  "view",
                                  {
                                    key: 1,
                                    class: vue.normalizeClass("_" + tr.name + " " + tr.attrs.class),
                                    style: vue.normalizeStyle(tr.attrs.style)
                                  },
                                  [
                                    (vue.openBlock(true), vue.createElementBlock(
                                      vue.Fragment,
                                      null,
                                      vue.renderList(tr.children, (td, z) => {
                                        return vue.openBlock(), vue.createElementBlock(
                                          "view",
                                          {
                                            key: z,
                                            class: vue.normalizeClass("_" + td.name + " " + td.attrs.class),
                                            style: vue.normalizeStyle(td.attrs.style)
                                          },
                                          [
                                            vue.createVNode(_component_node, {
                                              childs: td.children,
                                              opts: $props.opts
                                            }, null, 8, ["childs", "opts"])
                                          ],
                                          6
                                          /* CLASS, STYLE */
                                        );
                                      }),
                                      128
                                      /* KEYED_FRAGMENT */
                                    ))
                                  ],
                                  6
                                  /* CLASS, STYLE */
                                ))
                              ],
                              64
                              /* STABLE_FRAGMENT */
                            );
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ],
                      6
                      /* CLASS, STYLE */
                    );
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ], 14, ["id"])) : !n.c ? (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                { key: 10 },
                [
                  vue.createCommentVNode(" 富文本 "),
                  vue.createElementVNode("rich-text", {
                    id: n.attrs.id,
                    style: vue.normalizeStyle("display:inline;" + n.f),
                    preview: false,
                    selectable: $props.opts[4],
                    "user-select": $props.opts[4],
                    nodes: [n]
                  }, null, 12, ["id", "selectable", "user-select", "nodes"])
                ],
                2112
                /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
              )) : n.c === 2 ? (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                { key: 11 },
                [
                  vue.createCommentVNode(" 继续递归 "),
                  vue.createElementVNode("view", {
                    id: n.attrs.id,
                    class: vue.normalizeClass("_block _" + n.name + " " + n.attrs.class),
                    style: vue.normalizeStyle(n.f + ";" + n.attrs.style)
                  }, [
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList(n.children, (n2, j) => {
                        return vue.openBlock(), vue.createBlock(_component_node, {
                          key: j,
                          style: vue.normalizeStyle(n2.f),
                          name: n2.name,
                          attrs: n2.attrs,
                          childs: n2.children,
                          opts: $props.opts
                        }, null, 8, ["style", "name", "attrs", "childs", "opts"]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ], 14, ["id"])
                ],
                2112
                /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
              )) : (vue.openBlock(), vue.createBlock(_component_node, {
                key: 12,
                style: vue.normalizeStyle(n.f),
                name: n.name,
                attrs: n.attrs,
                childs: n.children,
                opts: $props.opts
              }, null, 8, ["style", "name", "attrs", "childs", "opts"]))
            ],
            64
            /* STABLE_FRAGMENT */
          );
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ], 14, ["id"]);
  }
  if (typeof block0 === "function")
    block0(_sfc_main$7);
  const node = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__scopeId", "data-v-513852e0"], ["__file", "D:/project/uni-app/leoh-seckill-shop/uni_modules/uv-parse/components/uv-parse/node/node.vue"]]);
  const config = {
    // 信任的标签（保持标签名不变）
    trustTags: makeMap("a,abbr,ad,audio,b,blockquote,br,code,col,colgroup,dd,del,dl,dt,div,em,fieldset,h1,h2,h3,h4,h5,h6,hr,i,img,ins,label,legend,li,ol,p,q,ruby,rt,source,span,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,title,ul,video"),
    // 块级标签（转为 div，其他的非信任标签转为 span）
    blockTags: makeMap("address,article,aside,body,caption,center,cite,footer,header,html,nav,pre,section"),
    // 行内标签
    inlineTags: makeMap("abbr,b,big,code,del,em,i,ins,label,q,small,span,strong,sub,sup"),
    // 要移除的标签
    ignoreTags: makeMap("area,base,canvas,embed,frame,head,iframe,input,link,map,meta,param,rp,script,source,style,textarea,title,track,wbr"),
    // 自闭合的标签
    voidTags: makeMap("area,base,br,col,circle,ellipse,embed,frame,hr,img,input,line,link,meta,param,path,polygon,rect,source,track,use,wbr"),
    // html 实体
    entities: {
      lt: "<",
      gt: ">",
      quot: '"',
      apos: "'",
      ensp: " ",
      emsp: " ",
      nbsp: " ",
      semi: ";",
      ndash: "–",
      mdash: "—",
      middot: "·",
      lsquo: "‘",
      rsquo: "’",
      ldquo: "“",
      rdquo: "”",
      bull: "•",
      hellip: "…",
      larr: "←",
      uarr: "↑",
      rarr: "→",
      darr: "↓"
    },
    // 默认的标签样式
    tagStyle: {
      address: "font-style:italic",
      big: "display:inline;font-size:1.2em",
      caption: "display:table-caption;text-align:center",
      center: "text-align:center",
      cite: "font-style:italic",
      dd: "margin-left:40px",
      mark: "background-color:yellow",
      pre: "font-family:monospace;white-space:pre",
      s: "text-decoration:line-through",
      small: "display:inline;font-size:0.8em",
      strike: "text-decoration:line-through",
      u: "text-decoration:underline"
    },
    // svg 大小写对照表
    svgDict: {
      animatetransform: "animateTransform",
      lineargradient: "linearGradient",
      viewbox: "viewBox",
      attributename: "attributeName",
      repeatcount: "repeatCount",
      repeatdur: "repeatDur"
    }
  };
  const tagSelector = {};
  const {
    windowWidth
  } = uni.getSystemInfoSync();
  const blankChar = makeMap(" ,\r,\n,	,\f");
  let idIndex = 0;
  config.ignoreTags.iframe = void 0;
  config.trustTags.iframe = true;
  config.ignoreTags.embed = void 0;
  config.trustTags.embed = true;
  function makeMap(str) {
    const map = /* @__PURE__ */ Object.create(null);
    const list = str.split(",");
    for (let i = list.length; i--; ) {
      map[list[i]] = true;
    }
    return map;
  }
  function decodeEntity(str, amp) {
    let i = str.indexOf("&");
    while (i !== -1) {
      const j = str.indexOf(";", i + 3);
      let code;
      if (j === -1)
        break;
      if (str[i + 1] === "#") {
        code = parseInt((str[i + 2] === "x" ? "0" : "") + str.substring(i + 2, j));
        if (!isNaN(code)) {
          str = str.substr(0, i) + String.fromCharCode(code) + str.substr(j + 1);
        }
      } else {
        code = str.substring(i + 1, j);
        if (config.entities[code] || code === "amp" && amp) {
          str = str.substr(0, i) + (config.entities[code] || "&") + str.substr(j + 1);
        }
      }
      i = str.indexOf("&", i + 1);
    }
    return str;
  }
  function mergeNodes(nodes) {
    let i = nodes.length - 1;
    for (let j = i; j >= -1; j--) {
      if (j === -1 || nodes[j].c || !nodes[j].name || nodes[j].name !== "div" && nodes[j].name !== "p" && nodes[j].name[0] !== "h" || (nodes[j].attrs.style || "").includes("inline")) {
        if (i - j >= 5) {
          nodes.splice(j + 1, i - j, {
            name: "div",
            attrs: {},
            children: nodes.slice(j + 1, i + 1)
          });
        }
        i = j - 1;
      }
    }
  }
  function Parser(vm) {
    this.options = vm || {};
    this.tagStyle = Object.assign({}, config.tagStyle, this.options.tagStyle);
    this.imgList = vm.imgList || [];
    this.imgList._unloadimgs = 0;
    this.plugins = vm.plugins || [];
    this.attrs = /* @__PURE__ */ Object.create(null);
    this.stack = [];
    this.nodes = [];
    this.pre = (this.options.containerStyle || "").includes("white-space") && this.options.containerStyle.includes("pre") ? 2 : 0;
  }
  Parser.prototype.parse = function(content) {
    for (let i = this.plugins.length; i--; ) {
      if (this.plugins[i].onUpdate) {
        content = this.plugins[i].onUpdate(content, config) || content;
      }
    }
    new Lexer(this).parse(content);
    while (this.stack.length) {
      this.popNode();
    }
    if (this.nodes.length > 50) {
      mergeNodes(this.nodes);
    }
    return this.nodes;
  };
  Parser.prototype.expose = function() {
    for (let i = this.stack.length; i--; ) {
      const item = this.stack[i];
      if (item.c || item.name === "a" || item.name === "video" || item.name === "audio")
        return;
      item.c = 1;
    }
  };
  Parser.prototype.hook = function(node2) {
    for (let i = this.plugins.length; i--; ) {
      if (this.plugins[i].onParse && this.plugins[i].onParse(node2, this) === false) {
        return false;
      }
    }
    return true;
  };
  Parser.prototype.getUrl = function(url) {
    const domain = this.options.domain;
    if (url[0] === "/") {
      if (url[1] === "/") {
        url = (domain ? domain.split("://")[0] : "http") + ":" + url;
      } else if (domain) {
        url = domain + url;
      } else {
        url = plus.io.convertLocalFileSystemURL(url);
      }
    } else if (!url.includes("data:") && !url.includes("://")) {
      if (domain) {
        url = domain + "/" + url;
      } else {
        url = plus.io.convertLocalFileSystemURL(url);
      }
    }
    return url;
  };
  Parser.prototype.parseStyle = function(node2) {
    const attrs = node2.attrs;
    const list = (this.tagStyle[node2.name] || "").split(";").concat((attrs.style || "").split(";"));
    const styleObj = {};
    let tmp = "";
    if (attrs.id && !this.xml) {
      if (this.options.useAnchor) {
        this.expose();
      } else if (node2.name !== "img" && node2.name !== "a" && node2.name !== "video" && node2.name !== "audio") {
        attrs.id = void 0;
      }
    }
    if (attrs.width) {
      styleObj.width = parseFloat(attrs.width) + (attrs.width.includes("%") ? "%" : "px");
      attrs.width = void 0;
    }
    if (attrs.height) {
      styleObj.height = parseFloat(attrs.height) + (attrs.height.includes("%") ? "%" : "px");
      attrs.height = void 0;
    }
    for (let i = 0, len = list.length; i < len; i++) {
      const info = list[i].split(":");
      if (info.length < 2)
        continue;
      const key = info.shift().trim().toLowerCase();
      let value = info.join(":").trim();
      if (value[0] === "-" && value.lastIndexOf("-") > 0 || value.includes("safe")) {
        tmp += `;${key}:${value}`;
      } else if (!styleObj[key] || value.includes("import") || !styleObj[key].includes("import")) {
        if (value.includes("url")) {
          let j = value.indexOf("(") + 1;
          if (j) {
            while (value[j] === '"' || value[j] === "'" || blankChar[value[j]]) {
              j++;
            }
            value = value.substr(0, j) + this.getUrl(value.substr(j));
          }
        } else if (value.includes("rpx")) {
          value = value.replace(/[0-9.]+\s*rpx/g, ($) => parseFloat($) * windowWidth / 750 + "px");
        }
        styleObj[key] = value;
      }
    }
    node2.attrs.style = tmp;
    return styleObj;
  };
  Parser.prototype.onTagName = function(name) {
    this.tagName = this.xml ? name : name.toLowerCase();
    if (this.tagName === "svg") {
      this.xml = (this.xml || 0) + 1;
      config.ignoreTags.style = void 0;
    }
  };
  Parser.prototype.onAttrName = function(name) {
    name = this.xml ? name : name.toLowerCase();
    if (name.substr(0, 5) === "data-") {
      if (name === "data-src" && !this.attrs.src) {
        this.attrName = "src";
      } else if (this.tagName === "img" || this.tagName === "a") {
        this.attrName = name;
      } else {
        this.attrName = void 0;
      }
    } else {
      this.attrName = name;
      this.attrs[name] = "T";
    }
  };
  Parser.prototype.onAttrVal = function(val) {
    const name = this.attrName || "";
    if (name === "style" || name === "href") {
      this.attrs[name] = decodeEntity(val, true);
    } else if (name.includes("src")) {
      this.attrs[name] = this.getUrl(decodeEntity(val, true));
    } else if (name) {
      this.attrs[name] = val;
    }
  };
  Parser.prototype.onOpenTag = function(selfClose) {
    const node2 = /* @__PURE__ */ Object.create(null);
    node2.name = this.tagName;
    node2.attrs = this.attrs;
    if (this.options.nodes.length) {
      node2.type = "node";
    }
    this.attrs = /* @__PURE__ */ Object.create(null);
    const attrs = node2.attrs;
    const parent = this.stack[this.stack.length - 1];
    const siblings = parent ? parent.children : this.nodes;
    const close = this.xml ? selfClose : config.voidTags[node2.name];
    if (tagSelector[node2.name]) {
      attrs.class = tagSelector[node2.name] + (attrs.class ? " " + attrs.class : "");
    }
    if (node2.name === "embed") {
      this.expose();
    }
    if (node2.name === "video" || node2.name === "audio") {
      if (node2.name === "video" && !attrs.id) {
        attrs.id = "v" + idIndex++;
      }
      if (!attrs.controls && !attrs.autoplay) {
        attrs.controls = "T";
      }
      node2.src = [];
      if (attrs.src) {
        node2.src.push(attrs.src);
        attrs.src = void 0;
      }
      this.expose();
    }
    if (close) {
      if (!this.hook(node2) || config.ignoreTags[node2.name]) {
        if (node2.name === "base" && !this.options.domain) {
          this.options.domain = attrs.href;
        } else if (node2.name === "source" && parent && (parent.name === "video" || parent.name === "audio") && attrs.src) {
          parent.src.push(attrs.src);
        }
        return;
      }
      const styleObj = this.parseStyle(node2);
      if (node2.name === "img") {
        if (attrs.src) {
          if (attrs.src.includes("webp")) {
            node2.webp = "T";
          }
          if (attrs.src.includes("data:") && !attrs["original-src"]) {
            attrs.ignore = "T";
          }
          if (!attrs.ignore || node2.webp || attrs.src.includes("cloud://")) {
            for (let i = this.stack.length; i--; ) {
              const item = this.stack[i];
              if (item.name === "a") {
                node2.a = item.attrs;
              }
              if (item.name === "table" && !node2.webp && !attrs.src.includes("cloud://")) {
                if (!styleObj.display || styleObj.display.includes("inline")) {
                  node2.t = "inline-block";
                } else {
                  node2.t = styleObj.display;
                }
                styleObj.display = void 0;
              }
              item.c = 1;
            }
            attrs.i = this.imgList.length.toString();
            let src = attrs["original-src"] || attrs.src;
            this.imgList.push(src);
            if (!node2.t) {
              this.imgList._unloadimgs += 1;
            }
            if (this.options.lazyLoad) {
              attrs["data-src"] = attrs.src;
              attrs.src = void 0;
            }
          }
        }
        if (styleObj.display === "inline") {
          styleObj.display = "";
        }
        if (attrs.ignore) {
          styleObj["max-width"] = styleObj["max-width"] || "100%";
          attrs.style += ";-webkit-touch-callout:none";
        }
        if (parseInt(styleObj.width) > windowWidth) {
          styleObj.height = void 0;
        }
        if (!isNaN(parseInt(styleObj.width))) {
          node2.w = "T";
        }
        if (!isNaN(parseInt(styleObj.height)) && (!styleObj.height.includes("%") || parent && (parent.attrs.style || "").includes("height"))) {
          node2.h = "T";
        }
      } else if (node2.name === "svg") {
        siblings.push(node2);
        this.stack.push(node2);
        this.popNode();
        return;
      }
      for (const key in styleObj) {
        if (styleObj[key]) {
          attrs.style += `;${key}:${styleObj[key].replace(" !important", "")}`;
        }
      }
      attrs.style = attrs.style.substr(1) || void 0;
    } else {
      if ((node2.name === "pre" || (attrs.style || "").includes("white-space") && attrs.style.includes("pre")) && this.pre !== 2) {
        this.pre = node2.pre = 1;
      }
      node2.children = [];
      this.stack.push(node2);
    }
    siblings.push(node2);
  };
  Parser.prototype.onCloseTag = function(name) {
    name = this.xml ? name : name.toLowerCase();
    let i;
    for (i = this.stack.length; i--; ) {
      if (this.stack[i].name === name)
        break;
    }
    if (i !== -1) {
      while (this.stack.length > i) {
        this.popNode();
      }
    } else if (name === "p" || name === "br") {
      const siblings = this.stack.length ? this.stack[this.stack.length - 1].children : this.nodes;
      siblings.push({
        name,
        attrs: {
          class: tagSelector[name] || "",
          style: this.tagStyle[name] || ""
        }
      });
    }
  };
  Parser.prototype.popNode = function() {
    const node2 = this.stack.pop();
    let attrs = node2.attrs;
    const children = node2.children;
    const parent = this.stack[this.stack.length - 1];
    const siblings = parent ? parent.children : this.nodes;
    if (!this.hook(node2) || config.ignoreTags[node2.name]) {
      if (node2.name === "title" && children.length && children[0].type === "text" && this.options.setTitle) {
        uni.setNavigationBarTitle({
          title: children[0].text
        });
      }
      siblings.pop();
      return;
    }
    if (node2.pre && this.pre !== 2) {
      this.pre = node2.pre = void 0;
      for (let i = this.stack.length; i--; ) {
        if (this.stack[i].pre) {
          this.pre = 1;
        }
      }
    }
    const styleObj = {};
    if (node2.name === "svg") {
      if (this.xml > 1) {
        this.xml--;
        return;
      }
      let src = "";
      const style = attrs.style;
      attrs.style = "";
      attrs.xmlns = "http://www.w3.org/2000/svg";
      (function traversal(node3) {
        if (node3.type === "text") {
          src += node3.text;
          return;
        }
        const name = config.svgDict[node3.name] || node3.name;
        src += "<" + name;
        for (const item in node3.attrs) {
          const val = node3.attrs[item];
          if (val) {
            src += ` ${config.svgDict[item] || item}="${val}"`;
          }
        }
        if (!node3.children) {
          src += "/>";
        } else {
          src += ">";
          for (let i = 0; i < node3.children.length; i++) {
            traversal(node3.children[i]);
          }
          src += "</" + name + ">";
        }
      })(node2);
      node2.name = "img";
      node2.attrs = {
        src: "data:image/svg+xml;utf8," + src.replace(/#/g, "%23"),
        style,
        ignore: "T"
      };
      node2.children = void 0;
      this.xml = false;
      config.ignoreTags.style = true;
      return;
    }
    if (attrs.align) {
      if (node2.name === "table") {
        if (attrs.align === "center") {
          styleObj["margin-inline-start"] = styleObj["margin-inline-end"] = "auto";
        } else {
          styleObj.float = attrs.align;
        }
      } else {
        styleObj["text-align"] = attrs.align;
      }
      attrs.align = void 0;
    }
    if (attrs.dir) {
      styleObj.direction = attrs.dir;
      attrs.dir = void 0;
    }
    if (node2.name === "font") {
      if (attrs.color) {
        styleObj.color = attrs.color;
        attrs.color = void 0;
      }
      if (attrs.face) {
        styleObj["font-family"] = attrs.face;
        attrs.face = void 0;
      }
      if (attrs.size) {
        let size = parseInt(attrs.size);
        if (!isNaN(size)) {
          if (size < 1) {
            size = 1;
          } else if (size > 7) {
            size = 7;
          }
          styleObj["font-size"] = ["x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large"][size - 1];
        }
        attrs.size = void 0;
      }
    }
    if ((attrs.class || "").includes("align-center")) {
      styleObj["text-align"] = "center";
    }
    Object.assign(styleObj, this.parseStyle(node2));
    if (node2.name !== "table" && parseInt(styleObj.width) > windowWidth) {
      styleObj["max-width"] = "100%";
      styleObj["box-sizing"] = "border-box";
    }
    if (config.blockTags[node2.name]) {
      node2.name = "div";
    } else if (!config.trustTags[node2.name] && !this.xml) {
      node2.name = "span";
    }
    if (node2.name === "a" || node2.name === "ad" || node2.name === "iframe") {
      this.expose();
    } else if (node2.name === "video") {
      if ((styleObj.height || "").includes("auto")) {
        styleObj.height = void 0;
      }
      let str = '<video style="width:100%;height:100%"';
      for (const item in attrs) {
        if (attrs[item]) {
          str += " " + item + '="' + attrs[item] + '"';
        }
      }
      if (this.options.pauseVideo) {
        str += ` onplay="this.dispatchEvent(new CustomEvent('vplay',{bubbles:!0}));for(var e=document.getElementsByTagName('video'),t=0;t<e.length;t++)e[t]!=this&&e[t].pause()"`;
      }
      str += ">";
      for (let i = 0; i < node2.src.length; i++) {
        str += '<source src="' + node2.src[i] + '">';
      }
      str += "</video>";
      node2.html = str;
    } else if ((node2.name === "ul" || node2.name === "ol") && node2.c) {
      const types = {
        a: "lower-alpha",
        A: "upper-alpha",
        i: "lower-roman",
        I: "upper-roman"
      };
      if (types[attrs.type]) {
        attrs.style += ";list-style-type:" + types[attrs.type];
        attrs.type = void 0;
      }
      for (let i = children.length; i--; ) {
        if (children[i].name === "li") {
          children[i].c = 1;
        }
      }
    } else if (node2.name === "table") {
      let padding = parseFloat(attrs.cellpadding);
      let spacing = parseFloat(attrs.cellspacing);
      const border = parseFloat(attrs.border);
      const bordercolor = styleObj["border-color"];
      const borderstyle = styleObj["border-style"];
      if (node2.c) {
        if (isNaN(padding)) {
          padding = 2;
        }
        if (isNaN(spacing)) {
          spacing = 2;
        }
      }
      if (border) {
        attrs.style += `;border:${border}px ${borderstyle || "solid"} ${bordercolor || "gray"}`;
      }
      if (node2.flag && node2.c) {
        styleObj.display = "grid";
        if (spacing) {
          styleObj["grid-gap"] = spacing + "px";
          styleObj.padding = spacing + "px";
        } else if (border) {
          attrs.style += ";border-left:0;border-top:0";
        }
        const width = [];
        const trList = [];
        const cells = [];
        const map = {};
        (function traversal(nodes) {
          for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].name === "tr") {
              trList.push(nodes[i]);
            } else {
              traversal(nodes[i].children || []);
            }
          }
        })(children);
        for (let row = 1; row <= trList.length; row++) {
          let col = 1;
          for (let j = 0; j < trList[row - 1].children.length; j++) {
            const td = trList[row - 1].children[j];
            if (td.name === "td" || td.name === "th") {
              while (map[row + "." + col]) {
                col++;
              }
              let style = td.attrs.style || "";
              let start = style.indexOf("width") ? style.indexOf(";width") : 0;
              if (start !== -1) {
                let end = style.indexOf(";", start + 6);
                if (end === -1) {
                  end = style.length;
                }
                if (!td.attrs.colspan) {
                  width[col] = style.substring(start ? start + 7 : 6, end);
                }
                style = style.substr(0, start) + style.substr(end);
              }
              style += ";display:flex";
              start = style.indexOf("vertical-align");
              if (start !== -1) {
                const val = style.substr(start + 15, 10);
                if (val.includes("middle")) {
                  style += ";align-items:center";
                } else if (val.includes("bottom")) {
                  style += ";align-items:flex-end";
                }
              } else {
                style += ";align-items:center";
              }
              start = style.indexOf("text-align");
              if (start !== -1) {
                const val = style.substr(start + 11, 10);
                if (val.includes("center")) {
                  style += ";justify-content: center";
                } else if (val.includes("right")) {
                  style += ";justify-content: right";
                }
              }
              style = (border ? `;border:${border}px ${borderstyle || "solid"} ${bordercolor || "gray"}` + (spacing ? "" : ";border-right:0;border-bottom:0") : "") + (padding ? `;padding:${padding}px` : "") + ";" + style;
              if (td.attrs.colspan) {
                style += `;grid-column-start:${col};grid-column-end:${col + parseInt(td.attrs.colspan)}`;
                if (!td.attrs.rowspan) {
                  style += `;grid-row-start:${row};grid-row-end:${row + 1}`;
                }
                col += parseInt(td.attrs.colspan) - 1;
              }
              if (td.attrs.rowspan) {
                style += `;grid-row-start:${row};grid-row-end:${row + parseInt(td.attrs.rowspan)}`;
                if (!td.attrs.colspan) {
                  style += `;grid-column-start:${col};grid-column-end:${col + 1}`;
                }
                for (let rowspan = 1; rowspan < td.attrs.rowspan; rowspan++) {
                  for (let colspan = 0; colspan < (td.attrs.colspan || 1); colspan++) {
                    map[row + rowspan + "." + (col - colspan)] = 1;
                  }
                }
              }
              if (style) {
                td.attrs.style = style;
              }
              cells.push(td);
              col++;
            }
          }
          if (row === 1) {
            let temp = "";
            for (let i = 1; i < col; i++) {
              temp += (width[i] ? width[i] : "auto") + " ";
            }
            styleObj["grid-template-columns"] = temp;
          }
        }
        node2.children = cells;
      } else {
        if (node2.c) {
          styleObj.display = "table";
        }
        if (!isNaN(spacing)) {
          styleObj["border-spacing"] = spacing + "px";
        }
        if (border || padding) {
          (function traversal(nodes) {
            for (let i = 0; i < nodes.length; i++) {
              const td = nodes[i];
              if (td.name === "th" || td.name === "td") {
                if (border) {
                  td.attrs.style = `border:${border}px ${borderstyle || "solid"} ${bordercolor || "gray"};${td.attrs.style || ""}`;
                }
                if (padding) {
                  td.attrs.style = `padding:${padding}px;${td.attrs.style || ""}`;
                }
              } else if (td.children) {
                traversal(td.children);
              }
            }
          })(children);
        }
      }
      if (this.options.scrollTable && !(attrs.style || "").includes("inline")) {
        const table = Object.assign({}, node2);
        node2.name = "div";
        node2.attrs = {
          style: "overflow:auto"
        };
        node2.children = [table];
        attrs = table.attrs;
      }
    } else if ((node2.name === "td" || node2.name === "th") && (attrs.colspan || attrs.rowspan)) {
      for (let i = this.stack.length; i--; ) {
        if (this.stack[i].name === "table") {
          this.stack[i].flag = 1;
          break;
        }
      }
    } else if (node2.name === "ruby") {
      node2.name = "span";
      for (let i = 0; i < children.length - 1; i++) {
        if (children[i].type === "text" && children[i + 1].name === "rt") {
          children[i] = {
            name: "div",
            attrs: {
              style: "display:inline-block;text-align:center"
            },
            children: [{
              name: "div",
              attrs: {
                style: "font-size:50%;" + (children[i + 1].attrs.style || "")
              },
              children: children[i + 1].children
            }, children[i]]
          };
          children.splice(i + 1, 1);
        }
      }
    } else if (node2.c) {
      (function traversal(node3) {
        node3.c = 2;
        for (let i = node3.children.length; i--; ) {
          const child = node3.children[i];
          if (child.name && (config.inlineTags[child.name] || (child.attrs.style || "").includes("inline") && child.children) && !child.c) {
            traversal(child);
          }
          if (!child.c || child.name === "table") {
            node3.c = 1;
          }
        }
      })(node2);
    }
    if ((styleObj.display || "").includes("flex") && !node2.c) {
      for (let i = children.length; i--; ) {
        const item = children[i];
        if (item.f) {
          item.attrs.style = (item.attrs.style || "") + item.f;
          item.f = void 0;
        }
      }
    }
    const flex = parent && ((parent.attrs.style || "").includes("flex") || (parent.attrs.style || "").includes("grid")) && !node2.c;
    if (flex) {
      node2.f = ";max-width:100%";
    }
    if (children.length >= 50 && node2.c && !(styleObj.display || "").includes("flex")) {
      mergeNodes(children);
    }
    for (const key in styleObj) {
      if (styleObj[key]) {
        const val = `;${key}:${styleObj[key].replace(" !important", "")}`;
        if (flex && (key.includes("flex") && key !== "flex-direction" || key === "align-self" || key.includes("grid") || styleObj[key][0] === "-" || key.includes("width") && val.includes("%"))) {
          node2.f += val;
          if (key === "width") {
            attrs.style += ";width:100%";
          }
        } else {
          attrs.style += val;
        }
      }
    }
    attrs.style = attrs.style.substr(1) || void 0;
  };
  Parser.prototype.onText = function(text) {
    if (!this.pre) {
      let trim = "";
      let flag;
      for (let i = 0, len = text.length; i < len; i++) {
        if (!blankChar[text[i]]) {
          trim += text[i];
        } else {
          if (trim[trim.length - 1] !== " ") {
            trim += " ";
          }
          if (text[i] === "\n" && !flag) {
            flag = true;
          }
        }
      }
      if (trim === " ") {
        if (flag)
          return;
        else {
          const parent = this.stack[this.stack.length - 1];
          if (parent && parent.name[0] === "t")
            return;
        }
      }
      text = trim;
    }
    const node2 = /* @__PURE__ */ Object.create(null);
    node2.type = "text";
    node2.text = decodeEntity(text);
    if (this.hook(node2)) {
      const siblings = this.stack.length ? this.stack[this.stack.length - 1].children : this.nodes;
      siblings.push(node2);
    }
  };
  function Lexer(handler) {
    this.handler = handler;
  }
  Lexer.prototype.parse = function(content) {
    this.content = content || "";
    this.i = 0;
    this.start = 0;
    this.state = this.text;
    for (let len = this.content.length; this.i !== -1 && this.i < len; ) {
      this.state();
    }
  };
  Lexer.prototype.checkClose = function(method) {
    const selfClose = this.content[this.i] === "/";
    if (this.content[this.i] === ">" || selfClose && this.content[this.i + 1] === ">") {
      if (method) {
        this.handler[method](this.content.substring(this.start, this.i));
      }
      this.i += selfClose ? 2 : 1;
      this.start = this.i;
      this.handler.onOpenTag(selfClose);
      if (this.handler.tagName === "script") {
        this.i = this.content.indexOf("</", this.i);
        if (this.i !== -1) {
          this.i += 2;
          this.start = this.i;
        }
        this.state = this.endTag;
      } else {
        this.state = this.text;
      }
      return true;
    }
    return false;
  };
  Lexer.prototype.text = function() {
    this.i = this.content.indexOf("<", this.i);
    if (this.i === -1) {
      if (this.start < this.content.length) {
        this.handler.onText(this.content.substring(this.start, this.content.length));
      }
      return;
    }
    const c = this.content[this.i + 1];
    if (c >= "a" && c <= "z" || c >= "A" && c <= "Z") {
      if (this.start !== this.i) {
        this.handler.onText(this.content.substring(this.start, this.i));
      }
      this.start = ++this.i;
      this.state = this.tagName;
    } else if (c === "/" || c === "!" || c === "?") {
      if (this.start !== this.i) {
        this.handler.onText(this.content.substring(this.start, this.i));
      }
      const next = this.content[this.i + 2];
      if (c === "/" && (next >= "a" && next <= "z" || next >= "A" && next <= "Z")) {
        this.i += 2;
        this.start = this.i;
        this.state = this.endTag;
        return;
      }
      let end = "-->";
      if (c !== "!" || this.content[this.i + 2] !== "-" || this.content[this.i + 3] !== "-") {
        end = ">";
      }
      this.i = this.content.indexOf(end, this.i);
      if (this.i !== -1) {
        this.i += end.length;
        this.start = this.i;
      }
    } else {
      this.i++;
    }
  };
  Lexer.prototype.tagName = function() {
    if (blankChar[this.content[this.i]]) {
      this.handler.onTagName(this.content.substring(this.start, this.i));
      while (blankChar[this.content[++this.i]])
        ;
      if (this.i < this.content.length && !this.checkClose()) {
        this.start = this.i;
        this.state = this.attrName;
      }
    } else if (!this.checkClose("onTagName")) {
      this.i++;
    }
  };
  Lexer.prototype.attrName = function() {
    let c = this.content[this.i];
    if (blankChar[c] || c === "=") {
      this.handler.onAttrName(this.content.substring(this.start, this.i));
      let needVal = c === "=";
      const len = this.content.length;
      while (++this.i < len) {
        c = this.content[this.i];
        if (!blankChar[c]) {
          if (this.checkClose())
            return;
          if (needVal) {
            this.start = this.i;
            this.state = this.attrVal;
            return;
          }
          if (this.content[this.i] === "=") {
            needVal = true;
          } else {
            this.start = this.i;
            this.state = this.attrName;
            return;
          }
        }
      }
    } else if (!this.checkClose("onAttrName")) {
      this.i++;
    }
  };
  Lexer.prototype.attrVal = function() {
    const c = this.content[this.i];
    const len = this.content.length;
    if (c === '"' || c === "'") {
      this.start = ++this.i;
      this.i = this.content.indexOf(c, this.i);
      if (this.i === -1)
        return;
      this.handler.onAttrVal(this.content.substring(this.start, this.i));
    } else {
      for (; this.i < len; this.i++) {
        if (blankChar[this.content[this.i]]) {
          this.handler.onAttrVal(this.content.substring(this.start, this.i));
          break;
        } else if (this.checkClose("onAttrVal"))
          return;
      }
    }
    while (blankChar[this.content[++this.i]])
      ;
    if (this.i < len && !this.checkClose()) {
      this.start = this.i;
      this.state = this.attrName;
    }
  };
  Lexer.prototype.endTag = function() {
    const c = this.content[this.i];
    if (blankChar[c] || c === ">" || c === "/") {
      this.handler.onCloseTag(this.content.substring(this.start, this.i));
      if (c !== ">") {
        this.i = this.content.indexOf(">", this.i);
        if (this.i === -1)
          return;
      }
      this.start = ++this.i;
      this.state = this.text;
    } else {
      this.i++;
    }
  };
  const plugins = [];
  const _sfc_main$6 = {
    name: "uv-parse",
    data() {
      return {
        nodes: []
      };
    },
    props: {
      containerStyle: {
        type: String,
        default: ""
      },
      content: {
        type: String,
        default: ""
      },
      copyLink: {
        type: [Boolean, String],
        default: true
      },
      domain: String,
      errorImg: {
        type: String,
        default: ""
      },
      lazyLoad: {
        type: [Boolean, String],
        default: false
      },
      loadingImg: {
        type: String,
        default: ""
      },
      pauseVideo: {
        type: [Boolean, String],
        default: true
      },
      previewImg: {
        type: [Boolean, String],
        default: true
      },
      scrollTable: [Boolean, String],
      selectable: [Boolean, String],
      setTitle: {
        type: [Boolean, String],
        default: true
      },
      showImgMenu: {
        type: [Boolean, String],
        default: true
      },
      tagStyle: Object,
      useAnchor: [Boolean, Number]
    },
    emits: ["load", "ready", "imgtap", "linktap", "play", "error"],
    components: {
      node
    },
    watch: {
      content(content) {
        this.setContent(content);
      }
    },
    created() {
      this.plugins = [];
      for (let i = plugins.length; i--; ) {
        this.plugins.push(new plugins[i](this));
      }
    },
    mounted() {
      if (this.content && !this.nodes.length) {
        this.setContent(this.content);
      }
    },
    beforeDestroy() {
      this._hook("onDetached");
    },
    methods: {
      /**
       * @description 将锚点跳转的范围限定在一个 scroll-view 内
       * @param {Object} page scroll-view 所在页面的示例
       * @param {String} selector scroll-view 的选择器
       * @param {String} scrollTop scroll-view scroll-top 属性绑定的变量名
       */
      in(page, selector, scrollTop) {
        if (page && selector && scrollTop) {
          this._in = {
            page,
            selector,
            scrollTop
          };
        }
      },
      /**
       * @description 锚点跳转
       * @param {String} id 要跳转的锚点 id
       * @param {Number} offset 跳转位置的偏移量
       * @returns {Promise}
       */
      navigateTo(id, offset) {
        return new Promise((resolve, reject) => {
          if (!this.useAnchor) {
            reject(Error("Anchor is disabled"));
            return;
          }
          offset = offset || parseInt(this.useAnchor) || 0;
          let deep = " ";
          const selector = uni.createSelectorQuery().in(this._in ? this._in.page : this).select((this._in ? this._in.selector : "._root") + (id ? `${deep}#${id}` : "")).boundingClientRect();
          if (this._in) {
            selector.select(this._in.selector).scrollOffset().select(this._in.selector).boundingClientRect();
          } else {
            selector.selectViewport().scrollOffset();
          }
          selector.exec((res) => {
            if (!res[0]) {
              reject(Error("Label not found"));
              return;
            }
            const scrollTop = res[1].scrollTop + res[0].top - (res[2] ? res[2].top : 0) + offset;
            if (this._in) {
              this._in.page[this._in.scrollTop] = scrollTop;
            } else {
              uni.pageScrollTo({
                scrollTop,
                duration: 300
              });
            }
            resolve();
          });
        });
      },
      /**
       * @description 获取文本内容
       * @return {String}
       */
      getText(nodes) {
        let text = "";
        (function traversal(nodes2) {
          for (let i = 0; i < nodes2.length; i++) {
            const node2 = nodes2[i];
            if (node2.type === "text") {
              text += node2.text.replace(/&amp;/g, "&");
            } else if (node2.name === "br") {
              text += "\n";
            } else {
              const isBlock = node2.name === "p" || node2.name === "div" || node2.name === "tr" || node2.name === "li" || node2.name[0] === "h" && node2.name[1] > "0" && node2.name[1] < "7";
              if (isBlock && text && text[text.length - 1] !== "\n") {
                text += "\n";
              }
              if (node2.children) {
                traversal(node2.children);
              }
              if (isBlock && text[text.length - 1] !== "\n") {
                text += "\n";
              } else if (node2.name === "td" || node2.name === "th") {
                text += "	";
              }
            }
          }
        })(nodes || this.nodes);
        return text;
      },
      /**
       * @description 获取内容大小和位置
       * @return {Promise}
       */
      getRect() {
        return new Promise((resolve, reject) => {
          uni.createSelectorQuery().in(this).select("#_root").boundingClientRect().exec((res) => res[0] ? resolve(res[0]) : reject(Error("Root label not found")));
        });
      },
      /**
       * @description 暂停播放媒体
       */
      pauseMedia() {
        for (let i = (this._videos || []).length; i--; ) {
          this._videos[i].pause();
        }
        const command = 'for(var e=document.getElementsByTagName("video"),i=e.length;i--;)e[i].pause()';
        let page = this.$parent;
        while (!page.$scope)
          page = page.$parent;
        page.$scope.$getAppWebview().evalJS(command);
      },
      /**
       * @description 设置媒体播放速率
       * @param {Number} rate 播放速率
       */
      setPlaybackRate(rate) {
        this.playbackRate = rate;
        for (let i = (this._videos || []).length; i--; ) {
          this._videos[i].playbackRate(rate);
        }
        const command = 'for(var e=document.getElementsByTagName("video"),i=e.length;i--;)e[i].playbackRate=' + rate;
        let page = this.$parent;
        while (!page.$scope)
          page = page.$parent;
        page.$scope.$getAppWebview().evalJS(command);
      },
      /**
       * @description 设置内容
       * @param {String} content html 内容
       * @param {Boolean} append 是否在尾部追加
       */
      setContent(content, append) {
        if (!append || !this.imgList) {
          this.imgList = [];
        }
        const nodes = new Parser(this).parse(content);
        this.$set(this, "nodes", append ? (this.nodes || []).concat(nodes) : nodes);
        this._videos = [];
        this.$nextTick(() => {
          this._hook("onLoad");
          this.$emit("load");
        });
        if (this.lazyLoad || this.imgList._unloadimgs < this.imgList.length / 2) {
          let height = 0;
          const callback = (rect) => {
            if (!rect || !rect.height)
              rect = {};
            if (rect.height === height) {
              this.$emit("ready", rect);
            } else {
              height = rect.height;
              setTimeout(() => {
                this.getRect().then(callback).catch(callback);
              }, 350);
            }
          };
          this.getRect().then(callback).catch(callback);
        } else {
          if (!this.imgList._unloadimgs) {
            this.getRect().then((rect) => {
              this.$emit("ready", rect);
            }).catch(() => {
              this.$emit("ready", {});
            });
          }
        }
      },
      /**
       * @description 调用插件钩子函数
       */
      _hook(name) {
        for (let i = plugins.length; i--; ) {
          if (this.plugins[i][name]) {
            this.plugins[i][name]();
          }
        }
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_node = vue.resolveComponent("node");
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        id: "_root",
        class: vue.normalizeClass(($props.selectable ? "_select " : "") + "_root"),
        style: vue.normalizeStyle($props.containerStyle)
      },
      [
        !$data.nodes[0] ? vue.renderSlot(_ctx.$slots, "default", { key: 0 }, void 0, true) : (vue.openBlock(), vue.createBlock(_component_node, {
          key: 1,
          childs: $data.nodes,
          opts: [$props.lazyLoad, $props.loadingImg, $props.errorImg, $props.showImgMenu, $props.selectable],
          name: "span"
        }, null, 8, ["childs", "opts"]))
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__scopeId", "data-v-570b219a"], ["__file", "D:/project/uni-app/leoh-seckill-shop/uni_modules/uv-parse/components/uv-parse/uv-parse.vue"]]);
  const en = {
    "uni-goods-nav.options.shop": "shop",
    "uni-goods-nav.options.cart": "cart",
    "uni-goods-nav.buttonGroup.addToCart": "add to cart",
    "uni-goods-nav.buttonGroup.buyNow": "buy now"
  };
  const zhHans = {
    "uni-goods-nav.options.shop": "店铺",
    "uni-goods-nav.options.cart": "购物车",
    "uni-goods-nav.buttonGroup.addToCart": "加入购物车",
    "uni-goods-nav.buttonGroup.buyNow": "立即购买"
  };
  const zhHant = {
    "uni-goods-nav.options.shop": "店鋪",
    "uni-goods-nav.options.cart": "購物車",
    "uni-goods-nav.buttonGroup.addToCart": "加入購物車",
    "uni-goods-nav.buttonGroup.buyNow": "立即購買"
  };
  const messages = {
    en,
    "zh-Hans": zhHans,
    "zh-Hant": zhHant
  };
  const { t } = initVueI18n(messages);
  const _sfc_main$5 = {
    name: "UniGoodsNav",
    emits: ["click", "buttonClick"],
    props: {
      options: {
        type: Array,
        default() {
          return [{
            icon: "shop",
            text: t("uni-goods-nav.options.shop")
          }, {
            icon: "cart",
            text: t("uni-goods-nav.options.cart")
          }];
        }
      },
      buttonGroup: {
        type: Array,
        default() {
          return [
            {
              text: t("uni-goods-nav.buttonGroup.addToCart"),
              backgroundColor: "linear-gradient(90deg, #FFCD1E, #FF8A18)",
              color: "#fff"
            },
            {
              text: t("uni-goods-nav.buttonGroup.buyNow"),
              backgroundColor: "linear-gradient(90deg, #FE6035, #EF1224)",
              color: "#fff"
            }
          ];
        }
      },
      fill: {
        type: Boolean,
        default: false
      },
      stat: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      onClick(index, item) {
        this.$emit("click", {
          index,
          content: item
        });
      },
      buttonClick(index, item) {
        if (uni.report && this.stat) {
          uni.report(item.text, item.text);
        }
        this.$emit("buttonClick", {
          index,
          content: item
        });
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_3);
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-goods-nav" }, [
      vue.createCommentVNode(" 底部占位 "),
      vue.createElementVNode("view", { class: "uni-tab__seat" }),
      vue.createElementVNode("view", { class: "uni-tab__cart-box flex" }, [
        vue.createElementVNode("view", { class: "flex uni-tab__cart-sub-left" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($props.options, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                key: index,
                class: "flex uni-tab__cart-button-left uni-tab__shop-cart",
                onClick: ($event) => $options.onClick(index, item)
              }, [
                vue.createElementVNode("view", { class: "uni-tab__icon" }, [
                  vue.createVNode(_component_uni_icons, {
                    type: item.icon,
                    size: "20",
                    color: "#646566"
                  }, null, 8, ["type"]),
                  vue.createCommentVNode(' <image class="image" :src="item.icon" mode="widthFix" /> ')
                ]),
                vue.createElementVNode(
                  "text",
                  { class: "uni-tab__text" },
                  vue.toDisplayString(item.text),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("view", { class: "flex uni-tab__dot-box" }, [
                  item.info ? (vue.openBlock(), vue.createElementBlock(
                    "text",
                    {
                      key: 0,
                      class: vue.normalizeClass([{ "uni-tab__dots": item.info > 9 }, "uni-tab__dot"]),
                      style: vue.normalizeStyle({
                        "backgroundColor": item.infoBackgroundColor ? item.infoBackgroundColor : "#ff0000",
                        color: item.infoColor ? item.infoColor : "#fff"
                      })
                    },
                    vue.toDisplayString(item.info),
                    7
                    /* TEXT, CLASS, STYLE */
                  )) : vue.createCommentVNode("v-if", true)
                ])
              ], 8, ["onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass([{ "uni-tab__right": $props.fill }, "flex uni-tab__cart-sub-right"])
          },
          [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($props.buttonGroup, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: index,
                  style: vue.normalizeStyle({ background: item.backgroundColor, color: item.color }),
                  class: "flex uni-tab__cart-button-right",
                  onClick: ($event) => $options.buttonClick(index, item)
                }, [
                  vue.createElementVNode(
                    "text",
                    {
                      style: vue.normalizeStyle({ color: item.color }),
                      class: "uni-tab__cart-button-right-text"
                    },
                    vue.toDisplayString(item.text),
                    5
                    /* TEXT, STYLE */
                  )
                ], 12, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ],
          2
          /* CLASS */
        )
      ])
    ]);
  }
  const __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-8226c5e1"], ["__file", "D:/project/uni-app/leoh-seckill-shop/uni_modules/uni-goods-nav/components/uni-goods-nav/uni-goods-nav.vue"]]);
  const _sfc_main$4 = {
    name: "UniNumberBox",
    emits: ["change", "input", "update:modelValue", "blur", "focus"],
    props: {
      value: {
        type: [Number, String],
        default: 1
      },
      modelValue: {
        type: [Number, String],
        default: 1
      },
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 100
      },
      step: {
        type: Number,
        default: 1
      },
      background: {
        type: String,
        default: "#f5f5f5"
      },
      color: {
        type: String,
        default: "#333"
      },
      disabled: {
        type: Boolean,
        default: false
      },
      width: {
        type: Number,
        default: 40
      }
    },
    data() {
      return {
        inputValue: 0
      };
    },
    watch: {
      value(val) {
        this.inputValue = +val;
      },
      modelValue(val) {
        this.inputValue = +val;
      }
    },
    computed: {
      widthWithPx() {
        return this.width + "px";
      }
    },
    created() {
      if (this.value === 1) {
        this.inputValue = +this.modelValue;
      }
      if (this.modelValue === 1) {
        this.inputValue = +this.value;
      }
    },
    methods: {
      _calcValue(type) {
        if (this.disabled) {
          return;
        }
        const scale = this._getDecimalScale();
        let value = this.inputValue * scale;
        let step = this.step * scale;
        if (type === "minus") {
          value -= step;
          if (value < this.min * scale) {
            return;
          }
          if (value > this.max * scale) {
            value = this.max * scale;
          }
        }
        if (type === "plus") {
          value += step;
          if (value > this.max * scale) {
            return;
          }
          if (value < this.min * scale) {
            value = this.min * scale;
          }
        }
        this.inputValue = (value / scale).toFixed(String(scale).length - 1);
        this.$emit("input", +this.inputValue);
        this.$emit("update:modelValue", +this.inputValue);
        this.$emit("change", +this.inputValue);
      },
      _getDecimalScale() {
        let scale = 1;
        if (~~this.step !== this.step) {
          scale = Math.pow(10, String(this.step).split(".")[1].length);
        }
        return scale;
      },
      _onBlur(event) {
        this.$emit("blur", event);
        let value = event.detail.value;
        if (isNaN(value)) {
          this.inputValue = this.value;
          return;
        }
        value = +value;
        if (value > this.max) {
          value = this.max;
        } else if (value < this.min) {
          value = this.min;
        }
        const scale = this._getDecimalScale();
        this.inputValue = value.toFixed(String(scale).length - 1);
        this.$emit("input", +this.inputValue);
        this.$emit("update:modelValue", +this.inputValue);
        this.$emit("change", +this.inputValue);
      },
      _onFocus(event) {
        this.$emit("focus", event);
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-numbox" }, [
      vue.createElementVNode(
        "view",
        {
          onClick: _cache[0] || (_cache[0] = ($event) => $options._calcValue("minus")),
          class: "uni-numbox__minus uni-numbox-btns",
          style: vue.normalizeStyle({ background: $props.background })
        },
        [
          vue.createElementVNode(
            "text",
            {
              class: vue.normalizeClass(["uni-numbox--text", { "uni-numbox--disabled": $data.inputValue <= $props.min || $props.disabled }]),
              style: vue.normalizeStyle({ color: $props.color })
            },
            "-",
            6
            /* CLASS, STYLE */
          )
        ],
        4
        /* STYLE */
      ),
      vue.withDirectives(vue.createElementVNode("input", {
        disabled: $props.disabled,
        onFocus: _cache[1] || (_cache[1] = (...args) => $options._onFocus && $options._onFocus(...args)),
        onBlur: _cache[2] || (_cache[2] = (...args) => $options._onBlur && $options._onBlur(...args)),
        class: "uni-numbox__value",
        type: $props.step < 1 ? "digit" : "number",
        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.inputValue = $event),
        style: vue.normalizeStyle({ background: $props.background, color: $props.color, width: $options.widthWithPx })
      }, null, 44, ["disabled", "type"]), [
        [vue.vModelDynamic, $data.inputValue]
      ]),
      vue.createElementVNode(
        "view",
        {
          onClick: _cache[4] || (_cache[4] = ($event) => $options._calcValue("plus")),
          class: "uni-numbox__plus uni-numbox-btns",
          style: vue.normalizeStyle({ background: $props.background })
        },
        [
          vue.createElementVNode(
            "text",
            {
              class: vue.normalizeClass(["uni-numbox--text", { "uni-numbox--disabled": $data.inputValue >= $props.max || $props.disabled }]),
              style: vue.normalizeStyle({ color: $props.color })
            },
            "+",
            6
            /* CLASS, STYLE */
          )
        ],
        4
        /* STYLE */
      )
    ]);
  }
  const __easycom_6 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__scopeId", "data-v-7ae2ee72"], ["__file", "D:/project/uni-app/leoh-seckill-shop/uni_modules/uni-number-box/components/uni-number-box/uni-number-box.vue"]]);
  const _sfc_main$3 = {
    __name: "goods",
    setup(__props, { expose: __expose }) {
      __expose();
      const popup2 = vue.ref();
      let currentAddress = vue.ref("aaa，19999999999999，北京市朝阳区xx");
      let goods = vue.reactive({
        id: 1,
        title: "茅台酒",
        photos: [
          "/static/product/goods1.jpg",
          "/static/product/goods2.jpg",
          "/static/product/goods3.jpg"
        ],
        detail: `
			123123123123
			123123132
		`
      });
      let options = [{
        icon: "chat",
        text: "客服"
      }];
      let customButtonGroup = [{
        text: "立即抢购",
        backgroundColor: "linear-gradient(90deg, #FE6035, #EF1224)",
        color: "#fff"
      }];
      onLoad(() => {
        uni.$on("choose-address", (params) => {
          const address = params.address;
          currentAddress.value = address.realname + "," + address.telephone + "," + address.region + address.detail;
        });
      });
      const onSwiperItemTap = (index) => {
        formatAppLog("log", "at pages/goods/goods.vue:120", index);
        uni.previewImage({
          urls: goods.photos,
          current: index
        });
      };
      const onGoodsNavOptionsClick = (e) => {
        formatAppLog("log", "at pages/goods/goods.vue:128", e);
      };
      const onGoodsNavButtonClick = (e) => {
        formatAppLog("log", "at pages/goods/goods.vue:132", e);
        popup2.value.open();
      };
      const onClosePopup = () => {
        popup2.value.close();
      };
      const __returned__ = { popup: popup2, get currentAddress() {
        return currentAddress;
      }, set currentAddress(v) {
        currentAddress = v;
      }, get goods() {
        return goods;
      }, set goods(v) {
        goods = v;
      }, get options() {
        return options;
      }, set options(v) {
        options = v;
      }, get customButtonGroup() {
        return customButtonGroup;
      }, set customButtonGroup(v) {
        customButtonGroup = v;
      }, onSwiperItemTap, onGoodsNavOptionsClick, onGoodsNavButtonClick, onClosePopup, ref: vue.ref, reactive: vue.reactive, get onLoad() {
        return onLoad;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_tag = resolveEasycom(vue.resolveDynamicComponent("uni-tag"), __easycom_0);
    const _component_uv_parse = resolveEasycom(vue.resolveDynamicComponent("uv-parse"), __easycom_1);
    const _component_uni_goods_nav = resolveEasycom(vue.resolveDynamicComponent("uni-goods-nav"), __easycom_2);
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_3);
    const _component_uni_list_item = resolveEasycom(vue.resolveDynamicComponent("uni-list-item"), __easycom_4);
    const _component_uni_list = resolveEasycom(vue.resolveDynamicComponent("uni-list"), __easycom_5);
    const _component_uni_number_box = resolveEasycom(vue.resolveDynamicComponent("uni-number-box"), __easycom_6);
    const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_7);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode("view", null, [
          vue.createElementVNode("swiper", {
            class: "swiper",
            circular: "",
            "indicator-dots": true
          }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.goods.photos, (photo, index) => {
                return vue.openBlock(), vue.createElementBlock("swiper-item", {
                  key: photo,
                  onClick: ($event) => $setup.onSwiperItemTap(index)
                }, [
                  vue.createElementVNode("view", { class: "h-100" }, [
                    vue.createElementVNode("image", {
                      src: photo,
                      class: "h-100"
                    }, null, 8, ["src"])
                  ])
                ], 8, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ]),
        vue.createElementVNode("view", { class: "p-2 border-bottom bg-white" }, [
          vue.createElementVNode("view", { class: "d-flex a-center" }, [
            vue.createElementVNode("text", { class: "font-theme-color font-md" }, "秒杀价￥1399"),
            vue.createElementVNode("text", { class: "ml-2 font-sm text-grey line-through" }, "原价￥3999")
          ]),
          vue.createElementVNode("view", { class: "mt-2 font-md" }, " 飞天茅台收到机器就委屈呢你去 "),
          vue.createElementVNode("view", { class: "mt-2" }, [
            vue.createVNode(_component_uni_tag, {
              class: "mr-1",
              inverted: true,
              text: "原装正品",
              type: "success"
            }),
            vue.createVNode(_component_uni_tag, {
              inverted: true,
              text: "假一罚十",
              type: "warning"
            })
          ])
        ]),
        vue.createElementVNode("view", { class: "p-2 bg-white font-sm text-grey" }, "全场包邮·七天无理由退货"),
        vue.createElementVNode("view", {
          class: "mt-2 bg-white",
          style: { "padding-bottom": "100rpx" }
        }, [
          vue.createElementVNode("view", { class: "font-md text-dark p-2" }, "商品详情"),
          vue.createVNode(_component_uv_parse, {
            content: $setup.goods.detail,
            selectable: true,
            tagStyle: { img: "display: block;" }
          }, null, 8, ["content"])
        ]),
        vue.createElementVNode("view", { class: "position-fixed left-0 right-0 bottom-0" }, [
          vue.createVNode(_component_uni_goods_nav, {
            fill: true,
            options: $setup.options,
            "button-group": $setup.customButtonGroup,
            onClick: $setup.onGoodsNavOptionsClick,
            onButtonClick: $setup.onGoodsNavButtonClick,
            style: { "margin-top": "20px" }
          }, null, 8, ["options", "button-group"])
        ]),
        vue.createVNode(
          _component_uni_popup,
          {
            type: "bottom",
            ref: "popup"
          },
          {
            default: vue.withCtx(() => [
              vue.createElementVNode("scroll-view", {
                "scroll-y": "",
                style: { "height": "700rpx" },
                class: "bg-white"
              }, [
                vue.createElementVNode("view", { class: "px-2 py-1 border-bottom text-right" }, [
                  vue.createVNode(_component_uni_icons, {
                    type: "closeempty",
                    size: "20",
                    onClick: $setup.onClosePopup
                  })
                ]),
                vue.createVNode(_component_uni_list, null, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uni_list_item, {
                      link: "",
                      to: "/pages/address/address?from=seckill",
                      "show-extra-icon": true,
                      showArrow: "",
                      "extra-icon": { size: "22", type: "location" },
                      title: $setup.currentAddress
                    }, null, 8, ["title"])
                  ]),
                  _: 1
                  /* STABLE */
                }),
                vue.createElementVNode("view", { class: "d-flex p-2" }, [
                  vue.createElementVNode("view", {
                    style: { "width": "176rpx", "height": "175rpx" },
                    class: ""
                  }, [
                    vue.createElementVNode("image", {
                      src: $setup.goods.photos[0],
                      class: "w-100 h-100"
                    }, null, 8, ["src"])
                  ]),
                  vue.createElementVNode("view", { class: "flex-1 ml-2 d-flex flex-column j-sb" }, [
                    vue.createElementVNode("view", { class: "font-md text-dark" }, " 飞天茅台萨尔亲王和驱蚊器我尽可能可能去玩呢看 "),
                    vue.createVNode(_component_uni_number_box, {
                      min: 0,
                      max: 9
                    })
                  ])
                ])
              ]),
              vue.createElementVNode("view", { class: "position-fixed left-0 right-0 bottom-0" }, [
                vue.createElementVNode("button", {
                  type: "warn",
                  class: "rounded-0 border-0"
                }, "立即抢购￥1399")
              ])
            ]),
            _: 1
            /* STABLE */
          },
          512
          /* NEED_PATCH */
        )
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesGoodsGoods = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__scopeId", "data-v-7e2880f6"], ["__file", "D:/project/uni-app/leoh-seckill-shop/pages/goods/goods.vue"]]);
  const _sfc_main$2 = {
    __name: "tll-countdown",
    props: {
      seconds: {
        type: Number,
        default: 60
      }
    },
    emits: ["timeup"],
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props;
      let seconds = vue.ref(props.seconds);
      const emit = __emit;
      let timer = null;
      const start = () => {
        if (timer) {
          return;
        }
        timer = setInterval(() => {
          seconds.value -= 1;
          if (seconds.value <= 0) {
            clearInterval(timer);
            timer = null;
            seconds.value = props.seconds;
            emit("timeup");
          }
        }, 1e3);
      };
      __expose({ start });
      const __returned__ = { props, get seconds() {
        return seconds;
      }, set seconds(v) {
        seconds = v;
      }, emit, get timer() {
        return timer;
      }, set timer(v) {
        timer = v;
      }, start, ref: vue.ref };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["border font-sm px-2 py-1 rounded-10", $setup.seconds == $setup.props.seconds ? "font-theme-color border-theme" : "text-grey border"])
      },
      vue.toDisplayString($setup.seconds == $setup.props.seconds ? "获取验证码" : $setup.seconds),
      3
      /* TEXT, CLASS */
    );
  }
  const tllCountdown = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__file", "D:/project/uni-app/leoh-seckill-shop/components/tll-countdown.vue"]]);
  const _imports_0 = "/static/logo.png";
  const _sfc_main$1 = {
    __name: "login",
    setup(__props, { expose: __expose }) {
      __expose();
      let countdown = vue.ref();
      const onTimeup = () => {
        formatAppLog("log", "at pages/login/login.vue:30", "倒计时结束");
      };
      const onCountDownClick = () => {
        countdown.value.start();
      };
      const __returned__ = { get countdown() {
        return countdown;
      }, set countdown(v) {
        countdown = v;
      }, onTimeup, onCountDownClick, tllCountdown, ref: vue.ref };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "mt-4 p-2" }, [
      vue.createElementVNode("view", { class: "text-center" }, [
        vue.createElementVNode("image", {
          src: _imports_0,
          style: { "width": "140rpx", "height": "140rpx" }
        })
      ]),
      vue.createElementVNode("view", { class: "mt-4" }, [
        vue.createElementVNode("view", { class: "p-2 border-bottom" }, [
          vue.createElementVNode("input", {
            type: "text",
            placeholder: "请输入手机号码"
          })
        ]),
        vue.createElementVNode("view", { class: "p-2 border-bottom d-flex" }, [
          vue.createElementVNode("input", {
            type: "text",
            placeholder: "请输入验证码",
            class: "flex-1"
          }),
          vue.createVNode(
            $setup["tllCountdown"],
            {
              ref: "countdown",
              seconds: 6,
              onTimeup: $setup.onTimeup,
              onClick: $setup.onCountDownClick
            },
            null,
            512
            /* NEED_PATCH */
          )
        ])
      ]),
      vue.createElementVNode("view", { class: "mt-4" }, [
        vue.createElementVNode("button", { type: "warn" }, "登录")
      ])
    ]);
  }
  const PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "D:/project/uni-app/leoh-seckill-shop/pages/login/login.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/order/order", PagesOrderOrder);
  __definePage("pages/mine/mine", PagesMineMine);
  __definePage("pages/userinfo/userinfo", PagesUserinfoUserinfo);
  __definePage("pages/address/address", PagesAddressAddress);
  __definePage("pages/address-edit/address-edit", PagesAddressEditAddressEdit);
  __definePage("pages/goods/goods", PagesGoodsGoods);
  __definePage("pages/login/login", PagesLoginLogin);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "D:/project/uni-app/leoh-seckill-shop/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    app.use(createPinia());
    return {
      app,
      Pinia
      // 此处必须将 Pinia 返回
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
