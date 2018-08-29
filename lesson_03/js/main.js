$(function (){
    //每个固定的时间移动图片
    //setInterval() 方法可按照指定的周期（以毫秒计）来调用函数或计算表达式。
    var speed = 3000;
    var timer = setInterval(picLoop, speed); 
    var index = 0; // 初始导航点
    var switchWidth = $("img").width(); //默认滑动长度
    console.log($("img").width())
    $(window).resize(function(){ // 实时监控窗口宽度，调整轮播图滑动长度
        var w = $(window).width();
        switchWidth = w * 0.8
        // console.info("窗口宽度：" + switchWidth);
    });
    function picLoop(){
        index++;
        if(index == 4){
            index = 0;
        }
        $(".content").animate({"left": -switchWidth * index}, 400);
        //animate() 方法执行 CSS 属性集的自定义动画，时间为300ms
        $("li").eq(index).css("background-color","rgb(90, 90, 90)")
               .siblings().css("background-color","rgba(100,100,100,0.3)");
        //eq()为选择器,siblings()遍历
    }
    $("#confirm").click(function(){
        clearInterval(timer);
        if($("#spaceTime").val() >= 100){
            timer = setInterval(picLoop, $("#spaceTime").val());
        }
         else{
             alert("请输入大于等于100的数字");
         }
    })
    $("#stop").click(function(){
        clearInterval(timer);
    })


    $(".pic").hover(function(){//hover()鼠标悬停事件
        clearInterval(timer);//停止滑动
        $(".left").fadeIn();
        $(".right").fadeIn();
    },function(){
        timer = setInterval(picLoop, speed);
        $(".left").fadeOut();
        $(".right").fadeOut();
    })

    $("li").mouseover(function(){
        $(this).css("background-color","rgb(90, 90, 90)")
        .siblings().css("background-color","rgba(100,100,100,0.3)")
        index = $(this).index();
        $(".content").animate({"left":-switchWidth*index}, 300);
    })

    $(".left").click(function(){
        index--;
        if (index == -1) {
            index = 3;
        }
        $(".content").animate({"left":-switchWidth*index},300);
        $("li").eq(index).css("background-color","rgb(90, 90, 90)")
               .siblings().css("background-color","rgba(100,100,100,0.3)");
    })

    $(".right").click(function(){
        index++;
        if (index == 4) {
            index = 0;
        }
        $(".content").animate({"left":-switchWidth*index},300);
        $("li").eq(index).css("background-color","rgb(90, 90, 90)")
               .siblings().css("background-color","rgba(100,100,100,0.3)"); 
    })
})