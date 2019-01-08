(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Star.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '60a9bquxORK2Y/7xrQs/WHP', 'Star', __filename);
// scripts/Star.js

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

    properties: {
        // 星星和主角的收集最小间距
        pickRadius: 0

        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },
    // 对于重复的节点，可以把他保存成Prefab（预制资源）

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {
        var that = this;
    },

    getDist: function getDist() {
        var that = this;
        // 根据player节点位置来判断
        var playerLocal = that.game.player.getPosition();
        // log(that.game, playerLocal)
        // 返回2点间的坐标
        var dist = that.node.position.sub(playerLocal);
        // 计算2点间的坐标
        dist = dist.mag();
        return dist;
    },
    // 收集星星的函数
    onPicked: function onPicked() {
        var that = this;
        // 生成一个新的星星
        that.game.spawnNewStar();

        // 19.1.8加上分数
        that.game.addScore();

        // 销毁当前的星星
        that.node.destroy();
    },

    update: function update(dt) {
        var that = this;
        if (that.getDist() < that.pickRadius) {
            that.onPicked();
            return;
        }
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
        //# sourceMappingURL=Star.js.map
        