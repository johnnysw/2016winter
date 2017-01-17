var oContainer = document.getElementById("container");
var oBigImg = document.getElementById("big-img");
var aBigImgs = oBigImg.getElementsByTagName("img");
var oSmallImg = document.getElementById("small-img");
var aSmallImgs = oSmallImg.getElementsByTagName("img");
var oPrev = document.getElementById("prev");
var oNext = document.getElementById("next");
var oInfo = document.getElementById("info");
var oCurrentPage = document.getElementById("current-page");
var iNow = 0;//保存当前显示图片的索引
var zIndex = 9;
var timer;

//设置大图片的z-index，调整层级关系
for(var i=0; i<aBigImgs.length; i++){
    aBigImgs[i].style.zIndex = aBigImgs.length - i;
}

//设置小图片的透明度，第一张默认不透明
for(var i=0; i<aSmallImgs.length; i++){
    aSmallImgs[i].style.opacity = 0.3;
    aSmallImgs[i].style.filter = "alpha(opacity=30)";
}
aSmallImgs[0].style.opacity = 1;
aSmallImgs[0].style.filter = "alpha(opacity=100)";

//设置前后按钮的显示隐藏
oPrev.onmouseover = oNext.onmouseover = function(){
    animate(this, {
        opacity : 100
    });
};
oPrev.onmouseout = oNext.onmouseout = function(){
    animate(this, {
        opacity : 0
    });
};

//前后按钮绑定点击事件，切换图片
oPrev.onclick = oNext.onclick = function(){
    if(this == oNext){
        iNow++;
        if(iNow == aBigImgs.length){
            iNow = 0;
        }
    }else{
        iNow--;
        if(iNow == -1){
            iNow = aBigImgs.length - 1;
        }
    }
    changImg();
};

//小图片绑定单击事件，切换图片
for(var i=0; i<aSmallImgs.length; i++){
    aSmallImgs[i].index = i;
    aSmallImgs[i].onclick = function(){
        //当显示的图片和点击的图片不是同一张的时候，才切换图片
        if(iNow != this.index){
            iNow = this.index;
            changImg();
        }
    };
}

oContainer.onmouseover = function(){
    clearInterval(timer);
};
oContainer.onmouseout = function(){
    play();
};
play();

function play(){
    timer = setInterval(function(){
        oNext.onclick();
    }, 1000);
}

function changImg(){
    //当前要是图片淡入淡出方式显示
    aBigImgs[iNow].style.opacity = 0;
    aBigImgs[iNow].style.filter = "alpha(opacity=0)";
    aBigImgs[iNow].style.zIndex = zIndex++;
    oInfo.style.zIndex = oPrev.style.zIndex = oNext.style.zIndex = zIndex++;
    animate(aBigImgs[iNow], {
        opacity : 100
    });

    //info里面的信息切换
    oCurrentPage.innerHTML = iNow + 1;

    //小图片所有都透明，当前图片不透明
    for(var i=0; i<aSmallImgs.length; i++){
        aSmallImgs[i].style.opacity = 0.3;
        aSmallImgs[i].style.filter = "alpha(opacity=30)";
    }
    aSmallImgs[iNow].style.opacity = 1;
    aSmallImgs[iNow].style.filter = "alpha(opacity=100)";

    //小图片运动规律
    /*
        iNow    移动的距离
        0       0*width
        1       0*width

        2       1*width
        3       2*width
        4       3*width
        5       4*width

        6       4*width
        7       4*width
    * */
    var left = 0;
    if(iNow == 0 || iNow == 1){
        left= 0;
    }else if(iNow == aSmallImgs.length - 1 || iNow == aSmallImgs.length - 2){
        left = aSmallImgs.length / 2;//4
    }else{
        left = iNow - 1;
    }
    animate(oSmallImg, {
        left: -left * aSmallImgs[0].offsetWidth
    });

}




