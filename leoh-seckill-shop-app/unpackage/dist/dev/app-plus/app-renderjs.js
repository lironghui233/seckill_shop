var __renderjsModules={};

__renderjsModules["5a1e922e"] = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // <stdin>
  var stdin_exports = {};
  __export(stdin_exports, {
    default: () => stdin_default
  });

  // D:/project/uni-app/leoh-seckill-shop/uni_modules/uni-swipe-action/components/uni-swipe-action-item/render.js
  var MIN_DISTANCE = 10;
  var render_default = {
    showWatch(newVal, oldVal, ownerInstance, instance, self) {
      var state = self.state;
      var $el = ownerInstance.$el || ownerInstance.$vm && ownerInstance.$vm.$el;
      if (!$el)
        return;
      this.getDom(instance, ownerInstance, self);
      if (newVal && newVal !== "none") {
        this.openState(newVal, instance, ownerInstance, self);
        return;
      }
      if (state.left) {
        this.openState("none", instance, ownerInstance, self);
      }
      this.resetTouchStatus(instance, self);
    },
    /**
     * 开始触摸操作
     * @param {Object} e
     * @param {Object} ins
     */
    touchstart(e, ownerInstance, self) {
      let instance = e.instance;
      let disabled = instance.getDataset().disabled;
      let state = self.state;
      this.getDom(instance, ownerInstance, self);
      disabled = this.getDisabledType(disabled);
      if (disabled)
        return;
      instance.requestAnimationFrame(function() {
        instance.removeClass("ani");
        ownerInstance.callMethod("closeSwipe");
      });
      state.x = state.left || 0;
      this.stopTouchStart(e, ownerInstance, self);
    },
    /**
     * 开始滑动操作
     * @param {Object} e
     * @param {Object} ownerInstance
     */
    touchmove(e, ownerInstance, self) {
      let instance = e.instance;
      if (!instance)
        return;
      let disabled = instance.getDataset().disabled;
      let state = self.state;
      disabled = this.getDisabledType(disabled);
      if (disabled)
        return;
      this.stopTouchMove(e, self);
      if (state.direction !== "horizontal") {
        return;
      }
      if (e.preventDefault) {
        e.preventDefault();
      }
      let x = state.x + state.deltaX;
      this.move(x, instance, ownerInstance, self);
    },
    /**
     * 结束触摸操作
     * @param {Object} e
     * @param {Object} ownerInstance
     */
    touchend(e, ownerInstance, self) {
      let instance = e.instance;
      let disabled = instance.getDataset().disabled;
      let state = self.state;
      disabled = this.getDisabledType(disabled);
      if (disabled)
        return;
      this.moveDirection(state.left, instance, ownerInstance, self);
    },
    /**
     * 设置移动距离
     * @param {Object} value
     * @param {Object} instance
     * @param {Object} ownerInstance
     */
    move(value, instance, ownerInstance, self) {
      value = value || 0;
      let state = self.state;
      let leftWidth = state.leftWidth;
      let rightWidth = state.rightWidth;
      state.left = this.range(value, -rightWidth, leftWidth);
      instance.requestAnimationFrame(function() {
        instance.setStyle({
          transform: "translateX(" + state.left + "px)",
          "-webkit-transform": "translateX(" + state.left + "px)"
        });
      });
    },
    /**
     * 获取元素信息
     * @param {Object} instance
     * @param {Object} ownerInstance
     */
    getDom(instance, ownerInstance, self) {
      var state = self.state;
      var $el = ownerInstance.$el || ownerInstance.$vm && ownerInstance.$vm.$el;
      var leftDom = $el.querySelector(".button-group--left");
      var rightDom = $el.querySelector(".button-group--right");
      state.leftWidth = leftDom.offsetWidth || 0;
      state.rightWidth = rightDom.offsetWidth || 0;
      state.threshold = instance.getDataset().threshold;
    },
    getDisabledType(value) {
      return (typeof value === "string" ? JSON.parse(value) : value) || false;
    },
    /**
     * 获取范围
     * @param {Object} num
     * @param {Object} min
     * @param {Object} max
     */
    range(num, min, max) {
      return Math.min(Math.max(num, min), max);
    },
    /**
     * 移动方向判断
     * @param {Object} left
     * @param {Object} value
     * @param {Object} ownerInstance
     * @param {Object} ins
     */
    moveDirection(left, ins, ownerInstance, self) {
      var state = self.state;
      var threshold = state.threshold;
      var position = state.position;
      var isopen = state.isopen || "none";
      var leftWidth = state.leftWidth;
      var rightWidth = state.rightWidth;
      if (state.deltaX === 0) {
        this.openState("none", ins, ownerInstance, self);
        return;
      }
      if (isopen === "none" && rightWidth > 0 && -left > threshold || isopen !== "none" && rightWidth > 0 && rightWidth + left < threshold) {
        this.openState("right", ins, ownerInstance, self);
      } else if (isopen === "none" && leftWidth > 0 && left > threshold || isopen !== "none" && leftWidth > 0 && leftWidth - left < threshold) {
        this.openState("left", ins, ownerInstance, self);
      } else {
        this.openState("none", ins, ownerInstance, self);
      }
    },
    /**
     * 开启状态
     * @param {Boolean} type
     * @param {Object} ins
     * @param {Object} ownerInstance
     */
    openState(type, ins, ownerInstance, self) {
      let state = self.state;
      let leftWidth = state.leftWidth;
      let rightWidth = state.rightWidth;
      let left = "";
      state.isopen = state.isopen ? state.isopen : "none";
      switch (type) {
        case "left":
          left = leftWidth;
          break;
        case "right":
          left = -rightWidth;
          break;
        default:
          left = 0;
      }
      if (state.isopen !== type) {
        state.throttle = true;
        ownerInstance.callMethod("change", {
          open: type
        });
      }
      state.isopen = type;
      ins.requestAnimationFrame(() => {
        ins.addClass("ani");
        this.move(left, ins, ownerInstance, self);
      });
    },
    getDirection(x, y) {
      if (x > y && x > MIN_DISTANCE) {
        return "horizontal";
      }
      if (y > x && y > MIN_DISTANCE) {
        return "vertical";
      }
      return "";
    },
    /**
     * 重置滑动状态
     * @param {Object} event
     */
    resetTouchStatus(instance, self) {
      let state = self.state;
      state.direction = "";
      state.deltaX = 0;
      state.deltaY = 0;
      state.offsetX = 0;
      state.offsetY = 0;
    },
    /**
     * 设置滑动开始位置
     * @param {Object} event
     */
    stopTouchStart(event, ownerInstance, self) {
      let instance = event.instance;
      let state = self.state;
      this.resetTouchStatus(instance, self);
      var touch = event.touches[0];
      state.startX = touch.clientX;
      state.startY = touch.clientY;
    },
    /**
     * 滑动中，是否禁止打开
     * @param {Object} event
     */
    stopTouchMove(event, self) {
      let instance = event.instance;
      let state = self.state;
      let touch = event.touches[0];
      state.deltaX = touch.clientX - state.startX;
      state.deltaY = touch.clientY - state.startY;
      state.offsetY = Math.abs(state.deltaY);
      state.offsetX = Math.abs(state.deltaX);
      state.direction = state.direction || this.getDirection(state.offsetX, state.offsetY);
    }
  };

  // <stdin>
  var stdin_default = {
    mounted(e, ins, owner) {
      this.state = {};
    },
    methods: {
      showWatch(newVal, oldVal, ownerInstance, instance) {
        render_default.showWatch(newVal, oldVal, ownerInstance, instance, this);
      },
      touchstart(e, ownerInstance) {
        render_default.touchstart(e, ownerInstance, this);
      },
      touchmove(e, ownerInstance) {
        render_default.touchmove(e, ownerInstance, this);
      },
      touchend(e, ownerInstance) {
        render_default.touchend(e, ownerInstance, this);
      }
    }
  };
  return __toCommonJS(stdin_exports);
})();
