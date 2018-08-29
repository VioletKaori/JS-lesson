;(function ($) {
    $.fn.carouselImage = function (options) {
        var defaults = {
            changeTime: 2000, // 切换图片间隔时间
            changeSpeed: 300, // 切换图片的速度
            index: 0, // 初始导航点
        };
        options = $.extend(defaults, options);
        // console.log(options.changeTime);

        var switchWidth = $("img").width() //默认滑动长度
        //每个固定的时间移动图片
        //setInterval() 方法可按照指定的周期（以毫秒计）来调用函数或计算表达式。
        var timer = setInterval(picLoop, options.changeTime); 
        // console.log(setInterval(picLoop, 1000));

        $(window).resize(function(){ // 实时监控窗口宽度，调整轮播图滑动长度
            var w = $(window).width();
            switchWidth = w * 0.8
            // console.info("窗口宽度：" + switchWidth);
        });
        function picLoop(){
            options.index++;
            if(options.index == 4){
                options.index = 0;
            }
            $(".content").animate({"left": -switchWidth * options.index}, options.changeSpeed);
            //animate() 方法执行 CSS 属性集的自定义动画，时间为changeTimems
            $("li").eq(options.index).css("background-color","rgb(90, 90, 90)")
                .siblings().css("background-color","rgba(100,100,100,0.3)");
            //eq()为选择器,siblings()遍历
        }
        $("#stop").click(function(){
            clearInterval(timer);
            // console.log(timer);
        })

        $(".pic").hover(function(){//hover()鼠标悬停事件
            clearInterval(timer);//停止滑动
            $(".left").fadeIn();
            $(".right").fadeIn();
        },function(){
            timer = setInterval(picLoop, options.changeTime);
            $(".left").fadeOut();
            $(".right").fadeOut();
        })

        $("li").mouseover(function(){
            $(this).css("background-color","rgb(90, 90, 90)")
            .siblings().css("background-color","rgba(100,100,100,0.3)")
            options.index = $(this).index();
            $(".content").animate({"left": -switchWidth * options.index}, options.changeSpeed);
        })

        $(".left").click(function(){
            options.index--;
            if (options.index == -1) {
                options.index = 3;
            }
            $(".content").animate({"left": -switchWidth * options.index}, options.changeSpeed);
            $("li").eq(options.index).css("background-color", "rgb(90, 90, 90)")
                .siblings().css("background-color", "rgba(100,100,100,0.3)");
        })

        $(".right").click(function(){
            options.index++;
            if (options.index == 4) {
                options.index = 0;
            }
            $(".content").animate({"left": -switchWidth * options.index}, options.changeSpeed);
            $("li").eq(options.index).css("background-color", "rgb(90, 90, 90)")
                .siblings().css("background-color", "rgba(100,100,100,0.3)"); 
        })
    }
})(jQuery);
