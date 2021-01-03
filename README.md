# 轮播图插件
## 配置项参数说明如下

1. 调用说明
   new Banner(selector[,options])

2. selector：轮播图容器选择器，支持传入css选择器或DOM元素，必填。

3. options配置项：




    | 属性               | 描述    |  默认值  |  是否必填  |
    | --------          | -----:  | :----:  |   :----:  |
    | initialSlide      | 初始展示图片索引     |   0    | x  |
    | autoplayDuration        | 图片切换时间间隔      |   2000   | x |
    |    speed     | 动画播放速度      |   300    |   x   |
    | pagination.el       | 分页器容器选择器，不填或设置为null，表示禁用分页器      |   null    |   x   |
    | pagination.triggerEvent        | 分页器触发事件,设置为null，不会手动触发      |   click    |   x   |
    | navigation.nextEl        | 下一张播放按钮选择器      |   null    |   x   |
    | navigation.prevEl        | 上一张播放按钮选择器      |   null    |   x   |
    | navigation.hide        | 是否默认隐藏，移入容器后显示      |   true    |   x   |
    | on.init        | 轮播图初始化完毕后执行的钩子函数      |   空函数    |   x   |
    | on.beforAnimation       | 每次切换图片执行动画前执行的钩子函数      |   空函数    |   x   |
    | on.afterAnimation        | 每次切换图片执行动画后执行的钩子函数      |   空函数    |   x   |


`
{ 
    initialSlide: 0, 
    speed: 300, 
    autoplayDuration: 3000, 
    pagination: {
        el: null, 
        triggerEvent: 'click' 
    },
    navigation: {
        nextEl: null,
        prevEl: null,
        hide: true
    },
    on: {
        init: function(examp){}
    }
}
`