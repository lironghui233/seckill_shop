var __wxsModules={};

__wxsModules.afd46426 = (() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // <stdin>
  var require_stdin = __commonJS({
    "<stdin>"(exports, module) {
      var MIN_DISTANCE = 10;
      var IS_HTML5 = false;
      if (typeof window === "object")
        IS_HTML5 = true;
      function showWatch(newVal, oldVal, ownerInstance, instance) {
        var state = instance.getState();
        getDom(instance, ownerInstance);
        if (newVal && newVal !== "none") {
          openState(newVal, instance, ownerInstance);
          return;
        }
        if (state.left) {
          openState("none", instance, ownerInstance);
        }
        resetTouchStatus(instance);
      }
      function touchstart(e, ownerInstance) {
        var instance = e.instance;
        var disabled = instance.getDataset().disabled;
        var state = instance.getState();
        getDom(instance, ownerInstance);
        disabled = (typeof disabled === "string" ? JSON.parse(disabled) : disabled) || false;
        if (disabled)
          return;
        instance.requestAnimationFrame(function() {
          instance.removeClass("ani");
          ownerInstance.callMethod("closeSwipe");
        });
        state.x = state.left || 0;
        stopTouchStart(e, ownerInstance);
      }
      function touchmove(e, ownerInstance) {
        var instance = e.instance;
        var disabled = instance.getDataset().disabled;
        var state = instance.getState();
        disabled = (typeof disabled === "string" ? JSON.parse(disabled) : disabled) || false;
        if (disabled)
          return;
        stopTouchMove(e);
        if (state.direction !== "horizontal") {
          return;
        }
        if (e.preventDefault) {
          e.preventDefault();
        }
        move(state.x + state.deltaX, instance, ownerInstance);
      }
      function touchend(e, ownerInstance) {
        var instance = e.instance;
        var disabled = instance.getDataset().disabled;
        var state = instance.getState();
        disabled = (typeof disabled === "string" ? JSON.parse(disabled) : disabled) || false;
        if (disabled)
          return;
        moveDirection(state.left, instance, ownerInstance);
      }
      function move(value, instance, ownerInstance) {
        value = value || 0;
        var state = instance.getState();
        var leftWidth = state.leftWidth;
        var rightWidth = state.rightWidth;
        state.left = range(value, -rightWidth, leftWidth);
        instance.requestAnimationFrame(function() {
          instance.setStyle({
            transform: "translateX(" + state.left + "px)",
            "-webkit-transform": "translateX(" + state.left + "px)"
          });
        });
      }
      function getDom(instance, ownerInstance) {
        var state = instance.getState();
        var leftDom = ownerInstance.selectComponent(".button-group--left");
        var rightDom = ownerInstance.selectComponent(".button-group--right");
        var leftStyles = {
          width: 0
        };
        var rightStyles = {
          width: 0
        };
        leftStyles = leftDom.getBoundingClientRect();
        rightStyles = rightDom.getBoundingClientRect();
        state.leftWidth = leftStyles.width || 0;
        state.rightWidth = rightStyles.width || 0;
        state.threshold = instance.getDataset().threshold;
      }
      function range(num, min, max) {
        return Math.min(Math.max(num, min), max);
      }
      function moveDirection(left, ins, ownerInstance) {
        var state = ins.getState();
        var threshold = state.threshold;
        var position = state.position;
        var isopen = state.isopen || "none";
        var leftWidth = state.leftWidth;
        var rightWidth = state.rightWidth;
        if (state.deltaX === 0) {
          openState("none", ins, ownerInstance);
          return;
        }
        if (isopen === "none" && rightWidth > 0 && -left > threshold || isopen !== "none" && rightWidth > 0 && rightWidth + left < threshold) {
          openState("right", ins, ownerInstance);
        } else if (isopen === "none" && leftWidth > 0 && left > threshold || isopen !== "none" && leftWidth > 0 && leftWidth - left < threshold) {
          openState("left", ins, ownerInstance);
        } else {
          openState("none", ins, ownerInstance);
        }
      }
      function openState(type, ins, ownerInstance) {
        var state = ins.getState();
        var leftWidth = state.leftWidth;
        var rightWidth = state.rightWidth;
        var left = "";
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
        ins.requestAnimationFrame(function() {
          ins.addClass("ani");
          move(left, ins, ownerInstance);
        });
      }
      function getDirection(x, y) {
        if (x > y && x > MIN_DISTANCE) {
          return "horizontal";
        }
        if (y > x && y > MIN_DISTANCE) {
          return "vertical";
        }
        return "";
      }
      function resetTouchStatus(instance) {
        var state = instance.getState();
        state.direction = "";
        state.deltaX = 0;
        state.deltaY = 0;
        state.offsetX = 0;
        state.offsetY = 0;
      }
      function stopTouchStart(event) {
        var instance = event.instance;
        var state = instance.getState();
        resetTouchStatus(instance);
        var touch = event.touches[0];
        if (IS_HTML5 && isPC()) {
          touch = event;
        }
        state.startX = touch.clientX;
        state.startY = touch.clientY;
      }
      function stopTouchMove(event) {
        var instance = event.instance;
        var state = instance.getState();
        var touch = event.touches[0];
        if (IS_HTML5 && isPC()) {
          touch = event;
        }
        state.deltaX = touch.clientX - state.startX;
        state.deltaY = touch.clientY - state.startY;
        state.offsetY = Math.abs(state.deltaY);
        state.offsetX = Math.abs(state.deltaX);
        state.direction = state.direction || getDirection(state.offsetX, state.offsetY);
      }
      function isPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length - 1; v++) {
          if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
          }
        }
        return flag;
      }
      var movable = false;
      function mousedown(e, ins) {
        if (!IS_HTML5)
          return;
        if (!isPC())
          return;
        touchstart(e, ins);
        movable = true;
      }
      function mousemove(e, ins) {
        if (!IS_HTML5)
          return;
        if (!isPC())
          return;
        if (!movable)
          return;
        touchmove(e, ins);
      }
      function mouseup(e, ins) {
        if (!IS_HTML5)
          return;
        if (!isPC())
          return;
        touchend(e, ins);
        movable = false;
      }
      function mouseleave(e, ins) {
        if (!IS_HTML5)
          return;
        if (!isPC())
          return;
        movable = false;
      }
      module.exports = {
        showWatch,
        touchstart,
        touchmove,
        touchend,
        mousedown,
        mousemove,
        mouseup,
        mouseleave
      };
    }
  });
  return require_stdin();
})();


__wxsModules["812594ec"] = (() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // <stdin>
  var require_stdin = __commonJS({
    "<stdin>"(exports, module) {
      var inlineTags = {
        abbr: true,
        b: true,
        big: true,
        code: true,
        del: true,
        em: true,
        i: true,
        ins: true,
        label: true,
        q: true,
        small: true,
        span: true,
        strong: true,
        sub: true,
        sup: true
      };
      module.exports = {
        isInline: function(tagName, style) {
          return inlineTags[tagName] || (style || "").indexOf("display:inline") !== -1;
        }
      };
    }
  });
  return require_stdin();
})();
