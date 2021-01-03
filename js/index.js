let _DATA = [];
let container = document.querySelector('.container');
let queryData = function() {
    _DATA = [
        {'imgUrl': 'images/banner01.png'},
        {'imgUrl': 'images/banner02.jpg'},
        {'imgUrl': 'images/banner03.png'},
        {'imgUrl': 'images/banner04.png'},
        {'imgUrl': 'images/banner05.png'}
    ]
}

let bindHTML = function() {
    let wrapper = container.querySelector('.wrapper'),
        imgStr = ``;
    _DATA.forEach((img) => {
        imgStr += `<div class="slider"><img src="${img.imgUrl}" alt=""></div>`
    })
    wrapper.innerHTML = imgStr;
}

//////////////
queryData();
bindHTML();
new Banner(container,{
    initialSlide: 1,
    pagination: {
        el: '.pagination',
        triggerEvent: 'click',
    },
    navigation: {
        nextEl: '.next',
        prevEl: '.prev',
        hide: true
    }
});

