"use strict";
cc._RF.push(module, '3a50dj6H4xJD5rj/HVH9CFU', 'MyComponent');
// scripts/MyComponent.js

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

cc.Class({
    extends: cc.Component,

    properties: {
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

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        // var clickEventHandler = new cc.Component.EventHandler();
        // clickEventHandler.target = this.node; //这个node节点是你的事件处理代码组件所属的节点
        // clickEventHandler.component = "MyComponent";//这个是代码文件名
        // clickEventHandler.handler = "callback";
        // clickEventHandler.customEventData = "foobar";

        // var button = this.node.getComponent(cc.Button);
        // button.clickEvents.push(clickEventHandler);
    },

    callback: function callback(event, customEventData) {
        //这里 event 是一个 Touch Event 对象，你可以通过 event.target 取到事件的发送节点
        var node = event.target;
        var button = node.getComponent(cc.Button);
        //这里的 customEventData 参数就等于你之前设置的 "foobar"
        console.log("para is: ", customEventData);

        cc.director.loadScene('game'); //重新加载资源--重新开始
    },

    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();