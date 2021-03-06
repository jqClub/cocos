(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Player.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '67d55VqQdZBoZ/jVEqWYXyM', 'Player', __filename);
// scripts/Player.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var log = console.log.bind(console);

cc.Class({
    extends: cc.Component,
    // 规定一个节点具有的全部属性，都需要写在properties里面
    properties: {
        // 主角跳跃高度
        jumpHeight: 0,
        // 主角跳跃持续时间
        jumpDuration: 0,
        // 最大移动速度
        maxMoveSpeed: 0,
        // 加速度
        accel: 0,
        // -------------------------
        // 1.7新增配置参数
        // 加速方向的开关
        accLeft: false,
        accRight: false,
        // 水平方向的加速度
        xSpeed: 0,

        // 跳跃音效资源
        jumpAudio: {
            default: null,
            type: cc.AudioClip
        }
    },
    // 播放音效
    playJumpSound: function playJumpSound() {
        // 调用声音引擎播放声音
        cc.audioEngine.playEffect(this.jumpAudio, false);
    },
    setJumpAction: function setJumpAction() {
        var that = this;
        // 跳跃上升
        var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        // 下落
        var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        //  增加一个音效的回调函数
        var callback = cc.callFunc(this.playJumpSound, that);

        // 不断重复
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown, callback));
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var that = this;
        // 初始化跳跃动作
        this.jumpAction = this.setJumpAction();
        this.node.runAction(this.jumpAction);
        // // 创建一个移动动作
        // var actionTo = cc.scaleTo(2, 0.5);
        // // 执行动作
        // this.node.runAction(actionTo);

        // 让节点左右来回移动
        // var seq = cc.sequence(cc.moveBy(0.5, 200, 0), cc.moveBy(0.5, -200, 0));
        // 让节点上下来回移动
        // var seq = cc.sequence(cc.moveBy(0.5, 200, 200), cc.moveBy(0.5, -200, -200));
        // var lastSeq = cc.repeatForever(seq);

        // // 不停旋转的封面图片
        // var lastSeq = cc.repeatForever(cc.rotateBy(1.0, 360));
        // that.node.runAction(lastSeq);

        // 初始化键盘输入监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        // 使用枚举类型来注册，点击的事件
        // that.node.on(cc.Node.EventType.TOUCH_START, function (event) {
        //     console.log('Mouse down');
        // }, this);

        // 使用事件名来注册，点击的事件
        // that.node.on('touchstart', function (event) {
        //     console.log(event)
        //     console.log('Mouse down', event.getLocation());
        // }, this);
    },

    // 监听移动控制的事件
    onKeyDown: function onKeyDown(event) {
        // 键盘按下
        var that = this;
        var keyCode = event.keyCode;
        var macroKey = cc.macro.KEY;
        if (keyCode == macroKey.a) {
            this.accLeft = true;
        } else if (keyCode == macroKey.d) {
            this.accRight = true;
        }
        // log(11111, that.accLeft, this.accRight)
    },
    onKeyUp: function onKeyUp(event) {
        // 键盘松开
        var that = this;
        var keyCode = event.keyCode;
        var macroKey = cc.macro.KEY;
        if (keyCode == macroKey.a) {
            this.accLeft = false;
        } else if (keyCode == macroKey.d) {
            this.accRight = false;
        }
        // log(11111, that.accLeft, this.accRight)
    },

    start: function start() {},

    // 更新节点的坐标和速度，update在场景加载后，就会每帧调用一次，
    // 一般把经常需要计算或更新的放在这里
    update: function update(dt) {
        var that = this;
        if (that.accLeft) {
            that.xSpeed -= that.accel * dt;
        } else if (that.accRight) {
            that.xSpeed += that.accel * dt;
        }
        if (Math.abs(that.xSpeed) > that.maxMoveSpeed) {
            // 乘以对应的符号，Math.abs是取绝对值
            var symbol = that.xSpeed / Math.abs(that.xSpeed);
            that.xSpeed = that.maxMoveSpeed * symbol;
        }

        // var width = that.game.background.width
        // if(Math.abs(that.xSpeed) > width) {
        //             //     // 乘以对应的符号，Math.abs是取绝对值
        //     var symbol = that.xSpeed / Math.abs(that.xSpeed)
        //     that.xSpeed = width * symbol
        // }
        this.node.x = that.xSpeed;
    },


    // 在销毁的时候，不去监听键盘的事件
    onDestroy: function onDestroy() {
        // 取消键盘输入监听
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },


    hidePlayer: function hidePlayer() {
        var that = this;
        var active = that.node.active;
        that.node.active = !active;
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Player.js.map
        