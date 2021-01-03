轮播图插件
API文档如下：
1.selector：轮播图容器，支持css选择器和直接DOM元素

2.options配置项：

initialSlide: 0, //初始展示图片索引，默认值0
speed: 300, //动画播放速度，默认值300
autoplayDuration: 3000, //图片切换间隔，默认值3000
pagination: {
    el: null, //分页器选择器，如果为null，则禁用分页器功能
    triggerEvent: 'click' //分页器触发方式，默认为点击触发
},
navigation: {
    nextEl: null,//'.button-next', //下一张按钮
    prevEl: null,//'.button-prev', //上一张按钮
    hide: true //默认隐藏，移入容器后显式
},
on: {
    init: function(examp){}
}
