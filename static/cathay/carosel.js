$(function() {

    var DEFAULT_BREAKPOINT = [480,769,993,1200,1600]
    
    window.initSlider = function(){
      $(".cathay-carosel").each(function(){
      
        var _this = $(this);

        var template = _this.attr("data-template");

        console.log('template',template);
        switch(template){

            case "layout-tab":
              //斜槓人生 tab
              _this.attr("data-layout","tab");
              _this.attr("data-arrows","1");
              _this.attr("data-arrows-position","inside");
              _this.attr("data-dots","0");
              _this.attr("data-dots-position","inside");
              _this.attr("data-sm","3");
              _this.attr("data-md","3");
              _this.attr("data-lg","6");
              _this.attr("data-xl","6");
              _this.attr("data-xxl","6");
              _this.attr("data-infinite","0");
              _this.attr("data-scroll","1");
              _this.attr("data-width","100p");
              _this.attr("data-custom-classname","my_slider");
              _this.attr("data-center-mode","0");
              _this.attr("data-focus-on-select","0");
              _this.attr("data-gutter","0");
              _this.attr("data-speed","300");
              if(_this.attr('data-autoplay')==undefined){
                _this.attr("data-autoplay","0");
              }
              if(_this.attr('data-autoplay-speed')==undefined){
                _this.attr("data-autoplay-speed","3000");
              }
            break;

            

            case "layout-tab-link":
              //知識專區 tab
               var _childNum = $('.cs-slider>div',_this).length;
              _this.attr("data-layout","tab-link");
              _this.attr("data-arrows","1");
              _this.attr("data-arrows-position","inside");
              _this.attr("data-dots","0");
              _this.attr("data-dots-position","inside");
              if(_childNum<2){
                _this.attr("data-sm",_childNum);
              }else{
                _this.attr("data-sm","2");
              }
              
              if(_childNum<3){
                _this.attr("data-md",_childNum);
              }else{
                _this.attr("data-md","3");
              }
              
              if(_childNum<5){
                _this.attr("data-lg",_childNum);
              }else{
                _this.attr("data-lg","5");
              }
              
              if(_childNum<5){
                _this.attr("data-xl",_childNum);
              }else{
                _this.attr("data-xl","5");
              }
              
              if(_childNum<5){
                _this.attr("data-xxl",_childNum);
              }else{
                _this.attr("data-xxl","5");
              }
              _this.attr("data-infinite","0");
              _this.attr("data-scroll","1");
              _this.attr("data-width","100p");
              _this.attr("data-custom-classname","my_slider");
              _this.attr("data-center-mode","0");
              _this.attr("data-focus-on-select","0");
              _this.attr("data-gutter","0");
              _this.attr("data-speed","300");
              if(_this.attr('data-autoplay')==undefined){
                _this.attr("data-autoplay","0");
              }
              if(_this.attr('data-autoplay-speed')==undefined){
                _this.attr("data-autoplay-speed","3000");
              }
            break;

            case "layout-01":
              _this.attr("data-layout","01");
              _this.attr("data-arrows","0");
              _this.attr("data-arrows-position","inside");
              _this.attr("data-dots","1");
              _this.attr("data-dots-position","inside");
              _this.attr("data-sm","1");
              _this.attr("data-md","1");
              _this.attr("data-lg","1");
              _this.attr("data-xl","1");
              _this.attr("data-xxl","1");
              _this.attr("data-infinite","0");
              _this.attr("data-scroll","1");
              _this.attr("data-width","100p");
              _this.attr("data-custom-classname","my_slider");
              _this.attr("data-center-mode","0");
              _this.attr("data-focus-on-select","0");
              _this.attr("data-gutter","0");
              _this.attr("data-speed","300");
              if(_this.attr('data-autoplay')==undefined){
                _this.attr("data-autoplay","1");
              }
              if(_this.attr('data-autoplay-speed')==undefined){
                _this.attr("data-autoplay-speed","3000");
              }
            break;

            case "layout-01-s":
              _this.attr("data-layout","01-s");
              _this.attr("data-arrows","0");
              _this.attr("data-arrows-position","inside");
              _this.attr("data-dots","1");
              _this.attr("data-dots-position","inside");
              _this.attr("data-sm","1");
              _this.attr("data-md","1");
              _this.attr("data-lg","1");
              _this.attr("data-xl","1");
              _this.attr("data-xxl","1");
              _this.attr("data-infinite","0");
              _this.attr("data-scroll","1");
              _this.attr("data-width","100p");
              _this.attr("data-custom-classname","my_slider");
              _this.attr("data-center-mode","0");
              _this.attr("data-focus-on-select","0");
              _this.attr("data-gutter","0");
              _this.attr("data-speed","300");
              if(_this.attr('data-autoplay')==undefined){
                _this.attr("data-autoplay","1");
              }
              if(_this.attr('data-autoplay-speed')==undefined){
                _this.attr("data-autoplay-speed","3000");
              }
            break;

            case "layout-02":
              _this.attr("data-layout","02");
              _this.attr("data-arrows","1");
              _this.attr("data-arrows-position","inside");
              _this.attr("data-dots","0");
              _this.attr("data-dots-position","inside");
              _this.attr("data-sm","0");
              _this.attr("data-md","0");
              _this.attr("data-lg","4");
              _this.attr("data-xl","5");
              _this.attr("data-xxl","6");
              _this.attr("data-infinite","0");
              _this.attr("data-scroll","1");
              _this.attr("data-width","1280");
              _this.attr("data-center-mode","0");
              _this.attr("data-focus-on-select","0");
              _this.attr("data-gutter","1");
              _this.attr("data-speed","300");
              if(_this.attr('data-autoplay')==undefined){
                _this.attr("data-autoplay","0");
              }
              if(_this.attr('data-autoplay-speed')==undefined){
                _this.attr("data-autoplay-speed","3000");
              }
            break;

            case "layout-05":
              _this.attr("data-layout","05");
              _this.attr("data-arrows","1");
              _this.attr("data-arrows-position","inside");
              _this.attr("data-dots","0");
              _this.attr("data-dots-position","inside");
              _this.attr("data-sm","0");
              _this.attr("data-md","0");
              _this.attr("data-lg","4");
              _this.attr("data-xl","4");
              _this.attr("data-xxl","4");
              _this.attr("data-infinite","0");
              _this.attr("data-scroll","1");
              _this.attr("data-width","1180");
              _this.attr("data-center-mode","0");
              _this.attr("data-focus-on-select","0");
              _this.attr("data-gutter","1");
              _this.attr("data-speed","300");
              if(_this.attr('data-autoplay')==undefined){
                _this.attr("data-autoplay","0");
              }
              if(_this.attr('data-autoplay-speed')==undefined){
                _this.attr("data-autoplay-speed","3000");
              }
            break;

            case "layout-top3":
              _this.attr("data-layout","top3");
              _this.attr("data-arrows","1");
              _this.attr("data-arrows-position","inside");
              _this.attr("data-dots","0");
              _this.attr("data-dots-position","inside");
              _this.attr("data-sm","0");
              _this.attr("data-md","0");
              _this.attr("data-lg","3");
              _this.attr("data-xl","3");
              _this.attr("data-xxl","3");
              _this.attr("data-infinite","0");
              _this.attr("data-scroll","1");
              _this.attr("data-width","1280");
              _this.attr("data-center-mode","0");
              _this.attr("data-focus-on-select","0");
              _this.attr("data-gutter","1");
              _this.attr("data-speed","300");
              if(_this.attr('data-autoplay')==undefined){
                _this.attr("data-autoplay","0");
              }
              if(_this.attr('data-autoplay-speed')==undefined){
                _this.attr("data-autoplay-speed","3000");
              }

            break;


            case "layout-03":
              _this.attr("data-layout","03");
              _this.attr("data-arrows","1");
              _this.attr("data-arrows-position","inside");
              _this.attr("data-dots","0");
              _this.attr("data-dots-position","inside");
              _this.attr("data-sm","0");
              _this.attr("data-md","3");
              _this.attr("data-lg","3");
              _this.attr("data-xl","3");
              _this.attr("data-xxl","3");
              _this.attr("data-infinite","0");
              _this.attr("data-scroll","1");
              _this.attr("data-width","1280");
              _this.attr("data-center-mode","0");
              _this.attr("data-focus-on-select","0");
              _this.attr("data-gutter","1");
              _this.attr("data-speed","300");
              if(_this.attr('data-autoplay')==undefined){
                _this.attr("data-autoplay","0");
              }
              if(_this.attr('data-autoplay-speed')==undefined){
                _this.attr("data-autoplay-speed","3000");
              }
            break;

            case "layout-04":
              _this.attr("data-layout","04");
              _this.attr("data-arrows","1");
              _this.attr("data-arrows-position","inside");
              _this.attr("data-dots","0");
              _this.attr("data-dots-position","inside");
              _this.attr("data-sm","1");
              _this.attr("data-md","1");
              _this.attr("data-lg","1");
              _this.attr("data-xl","1");
              _this.attr("data-xxl","1");
              _this.attr("data-infinite","0");
              _this.attr("data-scroll","1");
              _this.attr("data-width","100p");
              _this.attr("data-custom-classname","my_slider");
              _this.attr("data-center-mode","0");
              _this.attr("data-focus-on-select","0");
              _this.attr("data-gutter","0");
              _this.attr("data-speed","300");
              _this.attr("data-autoplay","0");
              _this.attr("data-autoplay-speed","3000");
            break;



            case "layout-video":
              _this.attr("data-layout","video");
              _this.attr("data-arrows","1");
              _this.attr("data-arrows-position","inside");
              _this.attr("data-dots","0");
              _this.attr("data-dots-position","outside");
              _this.attr("data-sm","1");
              _this.attr("data-md","1");
              _this.attr("data-lg","1");
              _this.attr("data-xl","1");
              _this.attr("data-xxl","1");
              _this.attr("data-infinite","0");
              _this.attr("data-scroll","1");
              _this.attr("data-width","100p");
              _this.attr("data-custom-classname","my_slider");
              _this.attr("data-center-mode","0");
              _this.attr("data-focus-on-select","0");
              _this.attr("data-gutter","0");
              _this.attr("data-speed","300");
              _this.attr("data-autoplay","0");
              _this.attr("data-autoplay-speed","3000");
            break;

            case "layout-video-rtl":
              _this.attr("data-layout","video-rtl");
              _this.attr("data-arrows","1");
              _this.attr("data-arrows-position","inside");
              _this.attr("data-dots","0");
              _this.attr("data-dots-position","outside");
              _this.attr("data-sm","1");
              _this.attr("data-md","1");
              _this.attr("data-lg","1");
              _this.attr("data-xl","1");
              _this.attr("data-xxl","1");
              _this.attr("data-infinite","0");
              _this.attr("data-scroll","1");
              _this.attr("data-width","100p");
              _this.attr("data-custom-classname","my_slider");
              _this.attr("data-center-mode","0");
              _this.attr("data-focus-on-select","0");
              _this.attr("data-gutter","0");
              _this.attr("data-speed","300");
              _this.attr("data-autoplay","0");
              _this.attr("data-autoplay-speed","3000");
            break;

            case "layout-video-full":
              _this.attr("data-layout","video-full");
              _this.attr("data-arrows","1");
              _this.attr("data-arrows-position","inside");
              _this.attr("data-dots","0");
              _this.attr("data-dots-position","outside");
              _this.attr("data-sm","1");
              _this.attr("data-md","1");
              _this.attr("data-lg","1");
              _this.attr("data-xl","1");
              _this.attr("data-xxl","1");
              _this.attr("data-infinite","0");
              _this.attr("data-scroll","1");
              _this.attr("data-width","100p");
              _this.attr("data-custom-classname","my_slider");
              _this.attr("data-center-mode","0");
              _this.attr("data-focus-on-select","0");
              _this.attr("data-gutter","0");
              _this.attr("data-speed","300");
              _this.attr("data-autoplay","0");
              _this.attr("data-autoplay-speed","3000");
            break;
        }

        // $(".cs-slider>*",_this).each(function(){
        $(".cs-slider>div",_this).each(function(){
          var o = $(this);
          if($(".cs-title",o).html()==""){
              $(".cs-title",o).remove();
          }
          if($(".cs-subtitle",o).html()==""){
            $(".cs-subtitle",o).remove();
          }

          if($(".cs-content",o).html()==""){
              $(".cs-content",o).remove();
          }

          if($(".cs-more",o).html()==""){
              $(".cs-more",o).remove();
          }
        })
        
        var _slidesToScroll =parseInt( _this.attr("data-scroll"));
        var _speed = parseInt(_this.attr("data-speed"));
        var _arrows = Boolean(parseInt(_this.attr("data-arrows")));
        var _dots = Boolean(parseInt(_this.attr("data-dots")));
        var _infinite = Boolean(parseInt(_this.attr("data-infinite")));
        var _screenXXL =parseInt(_this.attr("data-xxl"));
        var _screenXL =parseInt(_this.attr("data-xl"));
        var _screenLG =parseInt(_this.attr("data-lg"));
        var _screenSM = parseInt(_this.attr("data-sm"));
        var _screenMD = parseInt(_this.attr("data-md"));

  
        var _dotsPosition = _this.attr("data-dots-position");
        var _arrowsPosition = _this.attr("data-arrows-position");
        var _centerMode = Boolean(parseInt(_this.attr("data-center-mode")));
        var _focusOnSelect = Boolean(parseInt(_this.attr("data-focus-on-select")));
        var _gutter = Boolean(parseInt(_this.attr("data-gutter")));
        ;
        var _layout = _this.attr("data-layout");
        var _unit = _this.attr("data-unit");
        var _width = _this.attr("data-width");
        var _customClassname = _this.attr("data-custom-classname");
        
        var _autoplay = Boolean(parseInt(_this.attr("data-autoplay")));
        var _autoplaySpeed = parseInt(_this.attr("data-autoplay-speed"));
        
        if(_gutter){
          _this.addClass('cs--gutter');
        }
        if(_layout!=""){
          _this.addClass('cs--layout-'+_layout);
          _this.addClass('cs--img-to-bg');
        }
        
        if(_customClassname!=""){
          _this.addClass(_customClassname);
        }
        if(_width){
          //set width
          _this.addClass('cs--w'+_width);
          var isPercentage = 0;
          if(_width.substr(_width.length-1) == 'p'){
            isPercentage = 1;
          }
          var num = parseInt(_width.substr(0,_width.length-isPercentage));
          if(!isNaN(num)){
            var className = '.cathay-carosel.cs--w'+_width;
            if(isPercentage){
              var unit = '%';
              _width = _width.replace(/p/gi,'');
            }else{
              var unit = 'px';
            }
            _width = parseInt(_width);

            var inlineStyle = "";
            inlineStyle += '<style>';
            //md
            var breakpoint = DEFAULT_BREAKPOINT.concat();
            breakpoint.push(_width);
            breakpoint.sort(function (a, b) {  return a - b;  });

            switch(unit){
              case 'px':
                inlineStyle += className+'{ width: '+'auto'+';}\n';
                for(var k=0;k<breakpoint.length;k++){
                  inlineStyle += '@media (min-width: '+breakpoint[k]+'px){';
                  if(unit=='px'){
                    if(_width<=breakpoint[k]){
                      inlineStyle += className+'{ width: '+_width+unit+';}';
                    }else{
                      inlineStyle += className+'{ width: '+'auto'+';}';
                    }
                  }
                  inlineStyle += '}\n';
                }
              break;

              case '%':
                inlineStyle += className+'{ width: '+_width+unit+';}\n';
              break;
            }
            
            inlineStyle += "</style>";
     
            $(inlineStyle).appendTo("head");

          }
        }

        if(_dots){
            _this.addClass("cs--dots-"+_dotsPosition);
        }
        if(_dots){
            _this.addClass("cs--dots-"+_dotsPosition);
        }
        if(_arrows){
            _this.addClass("cs--arrows-"+_arrowsPosition);
        }
        if(_screenXXL<=0 || isNaN(_screenXXL) || _screenXXL==undefined){
          _screenXXL = 1;
        }
        if(_screenXL==undefined){
          _screenXL = _screenXXL;
        }

        if(_screenLG==undefined){
          _screenLG = _screenXL;
        }

        if(_screenMD==undefined){
          _screenMD = _screenLG;
        }
        var responsive = [];


        switch(_screenXXL){
          default:
            responsive.push({
                breakpoint: DEFAULT_BREAKPOINT[4],
                settings: {
                    slidesToShow: _screenXXL,
                    slidesToScroll: _screenXXL,
                    infinite: _infinite,
                    dots: _dots
                }
            });
          break;
        }
        
        // return false;

        switch(_screenXL){
          case 0:
            $(this).addClass("cs--xl-list");
            responsive.push({
                breakpoint: DEFAULT_BREAKPOINT[3],
                settings: "unslick"
            });
          break;

          default:
            responsive.push({
                breakpoint: DEFAULT_BREAKPOINT[3],
                settings: {
                    slidesToShow: _screenXL,
                    slidesToScroll: _screenXL,
                    infinite: _infinite,
                    dots: _dots
                }
            });
          break;
        }

        switch(_screenLG){
          case 0:
            $(this).addClass("cs--lg-list");
            responsive.push({
                breakpoint: DEFAULT_BREAKPOINT[2],
                settings: "unslick"
            });
          break;

          default:
            responsive.push({
                breakpoint: DEFAULT_BREAKPOINT[2],
                settings: {
                    slidesToShow: _screenLG,
                    slidesToScroll: _screenLG,
                    infinite: _infinite,
                    dots: _dots
                }
            });
          break;
        }
        
        // return false;


        switch(_screenMD){
          case 0:
            $(this).addClass("cs--md-list");
            responsive.push({
                breakpoint: DEFAULT_BREAKPOINT[1],
                settings: "unslick"
            });
          break;

          default:
            responsive.push({
                breakpoint: DEFAULT_BREAKPOINT[1],
                settings: {
                    slidesToShow: _screenMD,
                    slidesToScroll: _screenMD,
                    infinite: _infinite,
                    dots: _dots
                }
            });
          break;
        }

        //_screenXs
        switch(_screenSM){
          case 0:
            $(this).addClass("cs--sm-list");
            responsive.push({
                breakpoint: DEFAULT_BREAKPOINT[0],
                settings: "unslick"
            });
          break;

          default:
            responsive.push({
                breakpoint: DEFAULT_BREAKPOINT[0],
                settings: {
                    slidesToShow: _screenSM,
                    slidesToScroll: _screenSM,
                    infinite: _infinite,
                    dots: _dots
                }
            });
          break;
        }

        var slick_target = $('.cs-slider',_this).not('.slick-initialized');
        slick_target.on('init', function(slick){
     

          var imgWrap = $('.cs-img-wrap',$(this));

          imgWrap.each(function(i){

            var _this = $(this);
            var d = new Date();
            var time = d.valueOf();
            var class_name = 'cs-img-wrap-'+i+'-'+time;
            var inlineStyle = "";
            inlineStyle += '<style id="cathay-carosel-'+time+'">';
            _this.addClass(class_name);
            var media_ary = [0,768,992];
            if(_this.attr('data-sm')!=undefined && _this.attr('data-sm')!=''){
              inlineStyle += '@media (min-width: '+media_ary[0]+'px){';
              inlineStyle += '  .'+class_name+'{';
              inlineStyle += '    background-image:url("'+_this.attr('data-sm')+'");';
              inlineStyle += '  }';
              inlineStyle += '}';
              media_ary.shift();
            }
            if(_this.attr('data-md')!=undefined && _this.attr('data-md')!=''){
              inlineStyle += '@media (min-width: '+media_ary[0]+'px){';
              inlineStyle += '  .'+class_name+'{';
              inlineStyle += '    background-image:url("'+_this.attr('data-md')+'");';
              inlineStyle += '  }';
              inlineStyle += '}';
              media_ary.shift();
            }

            if(_this.attr('data-lg')!=undefined && _this.attr('data-lg')!=''){
              inlineStyle += '@media (min-width: '+media_ary[0]+'px){';
              inlineStyle += '  .'+class_name+'{';
              inlineStyle += '    background-image:url("'+_this.attr('data-lg')+'");';
              inlineStyle += '  }';
              inlineStyle += '}';
              media_ary.shift();
            }

            inlineStyle += "</style>";

            if(media_ary.length<3){
              $(inlineStyle).appendTo("head");
            }
          })

          //////
          switch($(this).parent().attr("data-template")){

            case "layout-tab-link":
              var o = $(this);
              var total = $(".slick-slide",o).length;
              if(total==0){
                var target = $(">*",o);
              }else{
                var target = $(".slick-slide",o);
              }
              o.addClass('cs-length-'+total);

              var target_flex = o.parent().parent().parent();
              var target_fix_tab = o.parent().parent().prev();
              var target_rwd_tab = o.parent().parent();
              //
              $(window).resize(function() {
                var total_w = Math.floor(target_flex.width());
                var sm_length = o.parent().attr('data-sm');
                var md_length = o.parent().attr('data-md');
                var lg_length = o.parent().attr('data-lg');
                var xl_length = o.parent().attr('data-xl');
                var xxl_length = o.parent().attr('data-xxl');
                var target_prev_btn = o.find('.slick-prev');
                var window_w = $(window).width();
                var item_num;
                if(window_w<=DEFAULT_BREAKPOINT[0]){
                  item_num = parseInt(sm_length);
                }else if(window_w>DEFAULT_BREAKPOINT[0] && window_w<DEFAULT_BREAKPOINT[1]){
                  item_num = parseInt(md_length);
                }else if(window_w>DEFAULT_BREAKPOINT[1] && window_w<DEFAULT_BREAKPOINT[2]){
                  item_num = parseInt(lg_length);
                }else if(window_w>DEFAULT_BREAKPOINT[2] && window_w<DEFAULT_BREAKPOINT[3]){
                  item_num = parseInt(xl_length);
                }else{
                  item_num = parseInt(xxl_length);
                }
                // console.log(item_num,total);
                // var less_than_rule = false;
                // if(item_num>total){
                //   item_num = total;
                //   less_than_rule = true;
                // }

                var a_item_w = Math.round(total_w /(item_num+1));
                var prev_btn_left = -a_item_w -10;
                // if(less_than_rule){
                //   $('.slick-track',o).width('100%');
                //   // $('.slick-track',o).css('background-color','#ddd');
                //   $('.slick-slide',o).css('width',a_item_w);
                //   // $('.slick-slide',o).css('opacity',.5);
                // }
                target_fix_tab.css('width',a_item_w);
                target_rwd_tab.css('width',total_w - a_item_w);
                target_prev_btn.css('left',prev_btn_left);
              })
              $(".cs-img-wrap",o).remove();

              if(target.length==1){
                o.parents('.ctc-tab').addClass('d-none');
              }
              target.each(function(){
                if(!$('.cs-txt-wrap',$(this)).parent().hasClass('cs-link')){
                  $('.cs-txt-wrap',$(this)).parent().wrapInner($('.cs-txt-wrap .cs-link',$(this)));
                  $('.cs-txt-wrap .cs-link',$(this)).remove();
                }
              });

              o.on('beforeChange', function(e, slick, currentSlide, nextSlide){
                // $('.slick-slide',o).removeClass('slick-current');
                e.preventDefault(); 
              })

              o.on('afterChange', function(e, slick, currentSlide, nextSlide){
                // $('.slick-slide',o).removeClass('slick-current');
                e.preventDefault(); 
              })
            break;
            case "layout-tab":
              var o = $(this);
              if($(".slick-slide",o).length==0){
                var target = $(">*",o);
              }else{
                var target = $(".slick-slide",o);
              }
              o.addClass('cs-length-'+target.length);
              $(".cs-img-wrap",o).remove();

              if(target.length==1){
                o.parents('.ctc-tab').addClass('d-none');
              }
              target.each(function(){
                if(!$('.cs-txt-wrap',$(this)).parent().hasClass('cs-link')){
                  $('.cs-txt-wrap',$(this)).parent().wrapInner($('.cs-txt-wrap .cs-link',$(this)));
                  $('.cs-txt-wrap .cs-link',$(this)).remove();
                }
              });

              
              $(".slick-slide",o).on('click', function(e){
  
                e.preventDefault();

                var _this = $(this);
                var index = _this.index();
                
                ////
                _this.siblings().removeClass('slick-current').removeClass('slick-active');
                _this.addClass('slick-current').addClass('slick-active');
                ////
                var holder = o.parents('.cathay-tab-comp')
                $('.ctc-tabpane',holder).hide();

                var target_tabpane = $('.ctc-tabpane',holder).eq(index);
                target_tabpane.show();
                $('.cs-slider',target_tabpane).trigger('afterChange');

              });

              $(".slick-slide",o).eq(0).trigger('click');

            break;

            case "layout-01":
            case "layout-01-s":
              var o = $(this);
              if($(".slick-slide",o).length==0){
                var target = $(">*",o);
              }else{
                var target = $(".slick-slide",o);
              }
              o.addClass('cs-length-'+target.length);
              //
              $(".slick-slide",o).each(function(){
                var color = $('.cs-txt-wrap',$(this)).attr('data-color');
                $('.cs-title',$(this)).css('color',color);
                $('.cs-subtitle',$(this)).css('color',color);
                $('.cs-content',$(this)).css('color',color);
              });
              //
              if($(".slick-slide:not(.slick-cloned)",o).length>1){
                $(".slick-dots",o).removeClass("d-none");
              }else{
                $(".slick-dots",o).addClass("d-none");
              }
              //
              o.on('afterChange', function(event, slick, currentSlide, nextSlide){
                $(this).slick('setPosition');
             })
              //
            break;

            case "layout-02":
            case "layout-03":
            case "layout-05":
              var o = $(this);
              if($(".slick-slide",o).length==0){
                var target = $(">*",o);
              }else{
                var target = $(".slick-slide",o);
              }
              o.addClass('cs-length-'+target.length);
              //
              target.each(function(){
                if(!$('.cs-txt-wrap',$(this)).parent().hasClass('cs-link')){
                  $('.cs-txt-wrap',$(this)).parent().wrapInner($('.cs-txt-wrap .cs-link',$(this)));
                  $('.cs-txt-wrap .cs-link',$(this)).remove();
                }
              });
              //
              o.on('afterChange', function(event, slick, currentSlide, nextSlide){
                $(this).slick('setPosition');
              })
              //
            break;

            case "layout-top3":
              var o = $(this);
              if($(".slick-slide",o).length==0){
                var target = $(">*",o);
              }else{
                var target = $(".slick-slide",o);
              }
              o.addClass('cs-length-'+target.length);
              //

              //
              target.each(function(i){
                var scope = $(this);
                var d = new Date();
                var t = d.getTime();

                // $('.cs-more-content',$(this)).mCustomScrollbar({
                //   theme:"default"
                // });
                $('.cs-more-content',$(this)).scrollbar();
                var color_title = scope.attr('color-title');
                var color_price = scope.attr('color-price');
                var color_btn = scope.attr('color-btn');
                var color_ribbon = scope.attr('color-ribbon');
                var color_border = scope.attr('color-border');
                var random_name = 'cathay-top3-id-'+t+'-'+i;
                scope.addClass(random_name);
                
                var RegExp = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i; 
  
             
                if(RegExp.test(color_border))
                  scope.css('border-color',color_border);

                if(RegExp.test(color_title))
                  $('.cs-title',scope).css('color',color_title);
                
                if(RegExp.test(color_price))
                  $('.cs-price',scope).css('color',color_price);
                
                if(RegExp.test(color_btn))
                  $('.cs-link',scope).css('background-color',color_btn);
                
                var styles = "<style id='"+random_name+"' type='text/css'>";
               
                if(RegExp.test(color_ribbon)){
                  styles += ".cathay-carosel.cs--layout-top3 "+"."+random_name+" .cs-more-content.scrollbar-inner > .scroll-element .scroll-bar{background-color: "+color_ribbon+"}";
                  styles += ".cathay-carosel.cs--layout-top3 "+"."+random_name+" .cs-ribbon{background-color: "+color_ribbon+";}";
                  styles += ".cathay-carosel.cs--layout-top3 "+"."+random_name+" .cs-ribbon:before{color: "+color_ribbon+";filter:brightness(80%);}";
                  styles += ".cathay-carosel.cs--layout-top3 "+"."+random_name+" .cs-more:hover{color: "+color_title+";}";
                  styles += ".cathay-carosel.cs--layout-top3 "+"."+random_name+" .cs-more:hover:after{border-top: 2px solid "+color_title+";border-right: 2px solid "+color_title+";}";
                }
                styles += "</style>";  
                $(styles).appendTo('head');
                

                $('.cs-more',scope).attr('status','off');
                $('.cs-more',scope).unbind().bind('click',function(e){
                  $('.cs-more-content',scope).slideToggle();
                  if($(this).attr('status') == 'on'){
                    $(this).attr('status','off');
                    $('.cs-more-content',scope).attr('status','off');
                    //
                    $(this).html('展開詳細內容');
                  }else{
                    $(this).attr('status','on');
                    setTimeout(function(){
                      $('.cs-more-content',scope).attr('status','on');
                    },500)
                    $(this).html('收起詳細內容');
                  }
                })
              });
            break;

            case "layout-video":
            case "layout-video-rtl":
              var o = $(this);
              if($(".slick-slide",o).length==0){
                var target = $(">*",o);
              }else{
                var target = $(".slick-slide",o);
              }
              o.addClass('cs-length-'+target.length);
            break;
            case "layout-04":
              var o = $(this);
              if($(".slick-slide",o).length==0){
                var target = $(">*",o);
              }else{
                var target = $(".slick-slide",o);
              }
              o.addClass('cs-length-'+target.length);
              //
              target.each(function(){
                if(!$('.cs-txt-wrap',$(this)).parent().hasClass('cs-link')){
                  $('.cs-txt-wrap',$(this)).parent().wrapInner($('.cs-txt-wrap .cs-link',$(this)));
                  $('.cs-txt-wrap .cs-link',$(this)).remove();
                }
              });
              //
              var comp_holder = $(this).parents('.cathay-tab-comp');

              $('.ctc-tab .slick-slide',comp_holder).off('click');
              $('.ctc-tab .slick-slide',comp_holder).on('click',function(e){
                e.preventDefault();
                e.stopPropagation();
                var _this = $(this);
                var index = _this.index();
                var target = $('.ctc-tabpane .cs-slider.slick-initialized',comp_holder);
                target.slick('slickGoTo',index);
                return false;
              });


              $('.ctc-tabpane .cs-slider',comp_holder).on('afterChange', function(event, slick, currentSlide, nextSlide){
                var holder = $('.ctc-tabpane .cs-slider.slick-initialized .slick-current',comp_holder);
                var index = holder.index();
                var bgcolor = $('.cs-txt-wrap',holder).attr('data-bgcolor');

                var target_bg = $('.ctc-bg',comp_holder);
                target_bg.css('background-color',bgcolor);

                var target = $('.ctc-tab .cs-slider.slick-initialized',comp_holder)
                target.slick('slickGoTo',currentSlide);

                var target_tab =  $('.ctc-tab .cs-slider.slick-initialized .slick-slide',comp_holder);
                target_tab.removeClass('slick-current').removeClass('slick-active');
                target_tab.eq(index).addClass('slick-current').addClass('slick-active');
              })

            break;
          }

          $(this).parent().css('opacity',1);
        });

        slick_target.on('init', function(slick){
          var template = $(this).parent().attr("data-template")
          var o = $(this);
          switch(template){
            case 'layout-tab':
              setTimeout(function(){
                $('.slick-slide.slick-current',o).trigger('click');
              },500);
              
            break;

            case 'layout-tab-link':
              var file = window.location.pathname;
              file = file.replace(/\//gi,'');
              $('.slick-slide',o).each(function(){
                if($('.cs-link',$(this)).attr('href')==file){
                  $('.slick-slide',o).removeClass('slick-current').removeClass('slick-custom-current');
                  $(this).addClass('slick-custom-current');
                }
              })
              
              $('.cs-fix-tab .slick-slide').each(function(){
                if($('.cs-link',$(this)).attr('href')==file){
                  $('.cs-fix-tab .slick-slide').removeClass('slick-current').removeClass('slick-custom-current');
                  $(this).addClass('slick-custom-current');
                }
              })
            
              
              $(window).scroll(function() {
                var pos = $(this).scrollTop();
                if(pos>127){
                  $('html').addClass('cathay-subnav-sticky');

                }else{
                  $('html').removeClass('cathay-subnav-sticky');
                }
              })

              $(window).trigger('resize');
            break;
          }
        });

        slick_target.on('reInit', function(slick){
              console.log('reInit');
        });

        slick_target.on('destroy', function(slick){
        });

        slick_target.on('breakpoint', function(slick){
          var o = $(this);
          if($(".cli-dots-container",o).length>0){

          }
          switch($(this).parent().attr("data-template")){
            case "layout-01_full_label":
              var o = $(this);
              $(".slick-slide:not(.slick-cloned)",o).each(function(idx){
                $(".slick-dots button",o).eq(idx).html($(this).attr("title"));
              })
              
              $('.slick-dots',o).addClass("container");
            break;
            case "layout-tab-link":
              $(window).trigger('resize');
              break;

          }
        });

        var slick_option = {
          dots: _dots,
          infinite: _infinite,
          speed: _speed,
          arrows:_arrows,
          autoplay: _autoplay,
          autoplaySpeed: _autoplaySpeed,
          slidesToShow: _screenXXL,
          slidesToScroll: _slidesToScroll,
          centerMode: _centerMode,
          focusOnSelect: _focusOnSelect,
          responsive: responsive,
          touchThreshold:5
        }


        if ( template === "layout-tab-link"  && matchMedia('screen and (max-width:480px)').matches ) {
            slick_target.slick({
                infinite: false,
                slidesToShow: 2,
                slidesToScroll: 1
          });

        }
        else{
          slick_target.slick_option = slick_option;
          slick_target.slick(slick_target.slick_option);
        }
      
        slick_target.slick('setPosition');
        $(window).bind("resize",function(e){
          if(!slick_target.hasClass("slick-initialized")){
            slick_target.slick(slick_target.slick_option);
          }
        });

      })
    }

    initSlider();
})