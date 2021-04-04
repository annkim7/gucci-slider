$(function(){

    var video = $(".rotating-slider .slides .short-video");
    var videoLong = $(".rotating-slider .slides .long-video");
    var videoIntro = $(".intro .intro-video");
    var videopop = $(".popup-wrap .pop-video");

    /*===== 새로고침 =====*/
    window.onbeforeunload = function () {window.scrollTo(0, 0);}; 
    // $('html, body').stop().animate({scrollTop : $('html, body').offset().top});
    videoIntro.trigger("pause");
    setTimeout(function () {
      videoIntro.trigger("play");
      $(".logo").addClass("loaded");
    }, 1200);

    videoIntro.on('ended', function(){
      $("body").addClass("scroll");
      $(".intro").addClass("finish");
      $(".slider_wrap").addClass("up");
      $(this).fadeOut('100', function(){});
    });
    /*=====// 새로고침 =====*/

    /*===== 영상 슬라이드 =====*/
    /*최초 재생*/
    $(".rotating-slider .slides li").eq(3).addClass("on");
    video.eq(3).trigger("play");

    /*재생 버튼 클릭*/
    $(".rotating-slider .slides .play-btn").each(function(i){
      $(this).click(function(e){
        e.preventDefault();

        videoLong.eq(i).addClass("active").fadeIn();

        if (videoLong.prop('muted')) {
          videoLong.prop('muted', false);
        } else {
          videoLong.prop('muted', true);
        }

        videoLong.trigger("pause");
        videoLong.eq(i).trigger("play");
        videoLong.eq(i)[0].currentTime = 0;

        $(".rotating-slider .slides .btn").addClass("click").fadeOut();
      });
    });

    /*영상 재생 종료 후*/
    videoLong.on('ended', function(){
      $(this).fadeOut('1000', function(){
        $(this).removeClass("active");
        $(".rotating-slider .slides .btn").removeClass("click").fadeIn();
      });
    });
    /*=====// 영상 슬라이드 =====*/
    

    /*===== 팝업 =====*/
    $(".popbtn").click(function(){
      $(".popup-wrap").addClass("open");
      $(".popup-wrap video")[0].currentTime = 0;
      if ($(".pop-video").prop('muted')) {
        $(".pop-video").prop('muted', false);
      } else {
        $(".pop-video").prop('muted', true);
      }
    });
    $('.pop .close').click(function(e) {
      if(!$(e.target).hasClass("pop-video")) {
        $(".popup-wrap").removeClass("open");
        if ($(".pop-video").prop('muted')) {
          $(".pop-video").prop('muted', false);
        } else {
          $(".pop-video").prop('muted', true);
        }
      } 
    });
    videopop.on('ended', function(){
      $(this).fadeOut('1000', function(){
        $(".popup-wrap").removeClass("open");
      });
    });
    /*=====// 팝업 =====*/

    /*===== 배경 자동 변경 =====*/
    var classIndex = 0;
    var bwIndex = 0;
    var Index = 0;
    var bgColor = ['pink', 'red', 'yellow', 'purple', 'green'];
    var bgColorBw = ['pink', 'red', 'yellow', 'purple', 'green'];
    var Color = ['pink', 'red', 'yellow', 'purple', 'green'];
    var roll=1;

    $(".change").addClass(bgColor[classIndex]);
    $(".backward").addClass(bgColorBw[bwIndex]);
    $(".color").addClass(Color[Index]);
    setInterval(function () {
        $(".change")
        .removeClass(bgColor[classIndex])
        .addClass(bgColor[classIndex = (classIndex + 1) % bgColor.length]);

        $(".backward")
        .removeClass(bgColorBw[bwIndex])
        .addClass(bgColorBw[bwIndex = (bwIndex + 1) % bgColorBw.length]);

        $(".color")
        .removeClass(Color[Index])
        .addClass(Color[Index = (Index + 1) % Color.length]);

        roll++;
        if(roll>5){roll=1;}
        $("#roll").attr("src","./images/mirror"+roll+".jpg");
        $("#roll_mob").attr("src","./images/mob_mirror"+roll+".jpg");
    }, 1000);
    /*=====// 배경 자동 변경 =====*/

    /*===== 스크롤 이벤트 =====*/
    var offsetSec01 = $(".sec01").offset().top;
    var offsetSec02 = $(".sec02").offset().top;
    var offsetSec03 = $(".sec03").offset().top;
    var offsetSec04 = $(".sec04").offset().top;
    var sec01Height = $(".sec01").height();
    var sec02Height = $(".sec02").height();
    var sec03Height = $(".sec03").height();
    var swatchHeight = $(".swatch").height();
    var sec04Height = $(".sec04").height();

    $(window).scroll(function() {
        var recentOffset = $(document).scrollTop();

        if (recentOffset > offsetSec01 + (sec01Height/2) && recentOffset < offsetSec03){
            $(".mirror").addClass("show");
        }else{
            $(".mirror").removeClass("show");
        }

        //1900 1000
        if(recentOffset > offsetSec02 + (sec02Height*0.8) && recentOffset < offsetSec03 + (swatchHeight/2)){
            $(".txt-box .txt").addClass("on");
        }else{
            $(".txt-box .txt").removeClass("on");
        }

        //3200 2000
        if(recentOffset > offsetSec03 + (swatchHeight*0.5) && recentOffset < offsetSec04){
          $(".chip-wrap").addClass("on");
          $(".pre-line").addClass("on");
        }else{
            $(".chip-wrap").removeClass("on");
            $(".pre-line").removeClass("on");
        }

        //4400 2800
        if(recentOffset > offsetSec03 + (sec03Height*0.9) && recentOffset < offsetSec04 + (sec04Height*0.7)){
          $(".qna-wrap").addClass("on");
        }else{
            $(".qna-wrap").removeClass("on");
        }

        if(recentOffset > offsetSec04 + (sec04Height/2)){
          $(".bg05").addClass("on");
        }else{
            $(".bg05").removeClass("on");
        }

    });
    /*=====// 스크롤 이벤트 =====*/

    /*===== 밀려나는 탭 =====*/
    var target = $(".palette_btn");

    target.on('click', function(e){
      var index = $(this).index();
      var chipIndex = index*8;
      var tarTran = 40-(index*20);
      var tarDeg = -index*72;
      
      $(this).addClass("on");
      target.not($(this)).removeClass("on");

      $(".palette .tab").css({
        transform: 'translateX(' + tarTran + '%)'
      });

      var m = matchMedia("screen and (max-width: 569px)");
      m.media // -> "screen and (max-width: 569px)"
      m.matches // -> true

      if (matchMedia("screen and (max-width: 569px)").matches) {
        // var tarTran = 60-(index*30);

        // $(".palette .tab").css({
        //   transform: 'translateX(' + tarTran + '%)'
        // });
      } else {
        // 569px 이상에서 사용할 JavaScript
      }

      $(".circle-slider .slides").css({
        transform: 'translateX(-50%) rotate(' + tarDeg + 'deg)',
        transition: 'all 0.8s'
      });

      $(".chip").eq(chipIndex).css({
        transform: 'scale(1.3)',
        transition: 'all 0.4s 0.5s'
      });
      $(".chip").not($(".chip").eq(chipIndex)).css({transform: 'scale(1)'});

      $(".chip-txt").eq(chipIndex).addClass("on");
      $(".chip-txt").not($(".chip-txt").eq(chipIndex)).removeClass("on");
    });

    /*=====// 밀려나는 탭 =====*/

    /*===== Q&A =====*/
    $(".qna_bg").eq(11).css({transform: 'scale(1)'});
    $(".qna-slider li").eq(11).addClass("swipe");

    $(".btn-box .btn").click(function(e) {
      $(this).parents("li").find(".qna-style").addClass("jellyMove");
      $(this).parents("li").find(".btn-box").addClass("jellyBtn");
      
      $(this).parents("li").addClass("check");
      $(this).addClass("visible");
      $(this).siblings().addClass("none");
      
      if($(this).hasClass("yes")){
        $(this).parents("li").find(".qna-style.answer .yes").addClass("on");
        $(this).parents("li").find(".qna-style.answer .no").removeClass("on");
      }else if($(this).hasClass("no")){
        $(this).parents("li").find(".qna-style.answer .yes").removeClass("on");
        $(this).parents("li").find(".qna-style.answer .no").addClass("on");
      }

    });

    $(".return").click(function(e) {
      $(this).parents("li").find(".qna-style").removeClass("jellyMove");
      $(this).parents("li").find(".btn-box").removeClass("jellyBtn");

      $(this).parents("li").removeClass("check");
      $(this).parents("li").find(".qna-style.answer span").removeClass("on");

      $(this).parents("li").find(".btn-box .btn").removeClass("visible");
      $(this).parents("li").find(".btn-box .btn").removeClass("none");
    });
    /*=====// Q&A =====*/

});
