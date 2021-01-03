(function(){
    class Banner{
        constructor(selector,options = {}) {
            this.params(selector,options);
            this.activeIndex = this.initialSlide;
            this.wrapper = this.container.querySelector('.wrapper');
            this.slideList = this.wrapper.querySelectorAll('.slider');
            this.imageCount = this.slideList.length;
            this.intervalTimer = null;
            this.hasPagination = this.pagination && this.pagination.el;
            this.hasNavigation = this.navigation && this.navigation.nextEl && this.navigation.prevEl;
            //基础功能
            this.initFirstImage();           
            if(this.autoplayDuration){
                this.intervalTimer = setInterval(this.autoMove.bind(this),this.autoplayDuration);
            }
            this.pauseStart();
            //可选功能
            if(this.hasPagination) {
                this.initPagination();
                this.paginationEvent();
            }
            if(this.hasNavigation){
                this.navigationEvent();
            }
            this.on && this.on.init && this.on.init.call(this,this)
        }
        //params
        params(selector,options) {
            let defaultParams = {
                initialSlide: 0, //初始展示图片索引
                speed: 300, //动画播放速度
                autoplayDuration: 3000, //图片切换间隔
                pagination: {
                    el: null, //分页器选择器
                    triggerEvent: 'click' //分页器触发方式
                },
                navigation: {
                    nextEl: null,//'.button-next', //下一张按钮
                    prevEl: null,//'.button-prev', //上一张按钮
                    hide: true //默认隐藏，移入容器后显式
                },
                on: {
                    init: function(examp){},
                    beforAnimation: function(){},
                    afterAnimation: function(){}
                }
            };
            if(!selector){
                throw new Error('selector is requiered')
            }else{
                if(typeof selector === 'string') {
                    this.container = document.querySelector(selector)
                }
                if(selector.nodeType) {
                    this.container = selector;
                }
            }
            let excludeKeys = ['pagination','navigation','on'];
            for (const key in options) {
                if (Object.hasOwnProperty.call(defaultParams, key) && excludeKeys.indexOf(key) === -1) {
                    defaultParams[key] = options[key]                    
                }
            }
            let pagination = options.pagination,
                navigation = options.navigation,
                on = options.on;
            if(pagination != null) {
                pagination = options.pagination || {};
                for (const key in pagination) {
                    if (Object.hasOwnProperty.call(pagination, key)) {
                        defaultParams.pagination[key] = pagination[key]
                    }
                }
            }else{
                defaultParams.pagination = null;
            }
            if(navigation != null) {
                navigation = options.navigation || {};
                for (const key in navigation) {
                    if (Object.hasOwnProperty.call(navigation, key)) {
                        defaultParams.navigation[key] = navigation[key];
                    }
                }

            }else{
                defaultParams.navigation = null;
            }
            if(on != null) {
                on = options.on || {};
                for (const key in on) {
                    if (Object.hasOwnProperty.call(on, key)) {
                        defaultParams.on[key] = on[key];
                        
                    }
                }
            }else{
                defaultParams.on = null;
            }

            for (const key in defaultParams) {
                if (Object.hasOwnProperty.call(defaultParams, key)) {
                    this[key] = defaultParams[key];
                }
            }
        }
        //initFirstImage
        initFirstImage() {
            [].forEach.call(this.slideList,(slide,index) => {
                if(index === this.initialSlide) {
                    slide.style.opacity = 1;
                    return;
                }
                slide.style.opacity = 0;
            })
        }
        //imageToggle
        imageToggle() {
            [].forEach.call(this.slideList,(slide,index) => {
                if(index === this.activeIndex) {
                    slide.style.transition = `opacity ${this.speed}ms`
                    return;
                }
                slide.style.transition = `opacity 0ms`
            })
            this.on && this.on.beforAnimation && this.on.beforAnimation.call(this,this)
            this.slideList[this.activeIndex].style.opacity = 1;
            this.slideList[this.activeIndex].addEventListener('transitionend',() => {
                [].forEach.call(this.slideList,(slide,index) => {
                    if(index !== this.activeIndex){
                        slide.style.opacity = 0
                    }
                })
                //钩子函数，动画执行完毕后，用户自定义传入的方法
                this.on && this.on.afterAnimation && this.on.afterAnimation.call(this,this)
            })
            if(this.hasPagination) {
                this.paginationDotToggle();
            }
            
        }
        //autoMove
        autoMove() {
            this.activeIndex++;
            if(this.activeIndex === this.imageCount) {
                this.activeIndex = 0;
            }
            this.imageToggle();
        }
        //listener:mouseenter mouseout container
        pauseStart() {
            this.container.addEventListener('mouseenter',() => {
                clearInterval(this.intervalTimer);
                this.intervalTimer = null;
                if(this.navigation.hide) {
                    this.navigationPrev.style.display = 'block';
                    this.navigationNext.style.display = 'block';
                }
            })
            this.container.addEventListener('mouseleave',() => {
                this.intervalTimer = setInterval(this.autoMove.bind(this),this.autoplayDuration);
                if(this.navigation.hide) {
                    this.navigationPrev.style.display = 'none';
                    this.navigationNext.style.display = 'none';
                }
            })
        }
        //pagination
        initPagination() {
            this.paginationSelector = document.querySelector(this.pagination.el);
            let dotStr = ``;
            for (let i = 0; i < this.imageCount; i++) {
                if(i === this.initialSlide){
                    dotStr += `<span class="dot selected"></span>`;
                }else{
                    dotStr += `<span class="dot"></span>`;
                }
            }
            this.paginationSelector.innerHTML = dotStr;
            this.dotList = this.paginationSelector.querySelectorAll('.dot');
        }
        //paginationEvent
        paginationDotToggle() {
            this.dotList.forEach((dot,index) => {
                if(index === this.activeIndex) {
                    dot.classList.add('selected');
                    return;
                }
                dot.classList.remove('selected');
            })
        }
        //paginationEvent
        paginationEvent() {
            [].forEach.call(this.dotList,(dot,index) => {
                dot.addEventListener(this.pagination.triggerEvent,() => {
                    this.activeIndex = index;
                    this.imageToggle();
                    this.paginationDotToggle();
                })
            })
        }
        //navigationEvent
        navigationEvent() {
            this.navigationPrev = document.querySelector(this.navigation.prevEl);
            this.navigationNext = document.querySelector(this.navigation.nextEl);
            if(this.navigation.hide) {
                this.navigationPrev.style.display = 'none';
                this.navigationNext.style.display = 'none';
            }
            this.navigationPrev.addEventListener('click',Banner.trottle(() => {
                this.activeIndex--;
                if(this.activeIndex < 0) {
                    this.activeIndex = this.imageCount - 1;
                }
                this.imageToggle();
                this.paginationDotToggle();
            },500))
            this.navigationNext.addEventListener('click',Banner.trottle(() => {
                this.activeIndex++;
                if(this.activeIndex === this.imageCount) {
                    this.activeIndex = 0;
                }
                this.imageToggle();
                this.paginationDotToggle();
            },500))
        }
        //trottle
        static trottle(fn,wait) {
            let context = null,
                previous = 0,
                args = null;
            return function() {
                let now = new Date,
                    context = this,
                    args = [...arguments];
                if(now - previous > wait) {
                    previous = now;
                    fn.call(context,args)
                }
            }
        }
    }
    window.Banner = Banner;
})()