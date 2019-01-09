// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var log = console.log.bind(console)

cc.Class({
    extends: cc.Component,

    properties: {
        starPrefab: {
            default: null,
            type: cc.Prefab, // 引用预制节点
        },
        // 星星产生后消失时间的随机范围
        maxStarDuration: 0,
        minStarDuration: 0,
        // 地面节点，用于确定星星生成的高度
        ground: {
            default: null,
            type: cc.Node
        },
        // player 节点，用于获取主角弹跳的高度，和控制主角行动开关
        player: {
            default: null,
            type: cc.Node
        },
        // background 节点，用于获取主角弹跳的高度，和控制主角行动开关
        background: {
            default: null,
            type: cc.Node
        },

         // 得分 节点，用于获取主角弹跳的高度，和控制主角行动开关
        scoreDisplay: {
            default: null,
            type: cc.Label  //*这里的类型换成了Label */
        },
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

    onLoad () {
        var that = this
        // 初始化计时器
        that.timer = 0
        that.starDuration  = 0 //设置随机消失的时间

        // 获取地平面的坐标(锚点默认在节点的中心)
        var y = that.ground.y
        var height = that.ground.height
        that.groundY = y + height / 2
        log(888888, y, height, that.groundY)
        // log(that.node.children)   //这里可以获取所有的节点

        // // var jumpHeight = that.player.jumpHeight
        // var jumpHeight = this.player.getComponent('Player').jumpHeight
        
        // 生成一个新的星星
        this.spawnNewStar();

        // 初始化计分
        this.score = 0;

        // // 19.1.8如何在星星组件上，获取主角的坐标
        // // 在主角组件上暂存 Game 对象的引用
        // that.player.getComponent('Player').game = this;
    },
    spawnNewStar: function() {
        var that = this
        // 使用给定的模板在场景中生成一个新节点
        var newStar = cc.instantiate(this.starPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newStar);
        // 为星星设置一个随机位置
        newStar.setPosition(that.getNewStarPosition());

        // 19.1.8如何在星星组件上，获取主角的坐标
        // 在星星组件上暂存 Game 对象的引用
        newStar.getComponent('Star').game = this;


        // 重置计时器，根据消失时间范围随机取一个值
        this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
    },
    getNewStarPosition: function () {
        var randX = 0;
        // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标
        var randY = this.groundY + Math.random() * this.player.getComponent('Player').jumpHeight + 50;
        // 根据屏幕宽度，随机得到一个星星 x 坐标
        var maxX = this.node.width/2;
        randX = (Math.random() - 0.5) * 2 * maxX;
        // 返回星星坐标
        return cc.v2(randX, randY);
    },
    addScore: function() {
        var that = this
        that.score  += 1
        that.scoreDisplay.string = 'score: ' + that.score
    },
    start () {},

    update (dt) {
        var that = this
        // 每帧更新计时器，超过限度还没有生成新的星星
        // 就会调用游戏失败逻辑
        if (this.timer > this.starDuration) {
            this.gameOver();
            return;
        }
        this.timer += dt;
    },
    gameOver: function () {
        this.timer = 0
        this.player.stopAllActions(); //停止 player 节点的跳跃动作
        // 切换到结束游戏的场景
        cc.director.loadScene("gameOver")
    }
});
