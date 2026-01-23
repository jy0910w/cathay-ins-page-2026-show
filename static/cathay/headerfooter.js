var HeaderFooter = (function (window) {

    $(function() {
        //constant 
        var DEVICE_BREAK_POINT = 991;
        var HEADER_STICKY_CLASS = 'sticky';
        var HEADER_STICKY_POS = 80;
        var OPEN_MASK_CLASS = 'mask-on';
        var OPEN_NAV_CLASS = 'menu-on';
        var LOCK_BODY_CLASS = 'body-lock';
        var FOOTER_GO_TOP = $('.gotop');
        var GO_TOP_DISPLAY_Y = 100;
        
        //variables
        var mobileMode;
        var windowScrollTop = $(window).scrollTop();
        
        //element
        var scope = $(".cli-wrap");
        var html = $('html');
        var body = $('body')
        var navbar = $('.navbar', scope)
        var megamenu = $('.navbar-mega-menu', scope)
        var megadropdown = $('.mega-dropdown', scope)
        var movableWrap = $('main')
        var linkedSection = movableWrap.children('section');
        var toggler = $('.navbar-toggler', scope)
        var megatoggler = megadropdown.children('.dropdown-toggle');
        //

        var checkDevice = function() {
            //console.log($(window).width())
            var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

            //console.log("checkDevice:", isMobile, $(window).width() < DEVICE_BREAK_POINT)

            //if (isMobile || $(window).width() < DEVICE_BREAK_POINT) {
            if ($(window).width() < DEVICE_BREAK_POINT) {

                if (mobileMode != true) {
                    mobileMode = true
                    switchMode();
                }

            } else {

                if (mobileMode != false) {
                    mobileMode = false
                    switchMode();
                }
            }
        }

        var initMobileMode = function() {
            //console.log("mobile mode");
            $('.dropdown-submenu').addClass('dropdown-submenu dropdown-menu')
            //
            navbar.removeClass(HEADER_STICKY_CLASS)
            body.removeClass(HEADER_STICKY_CLASS)
            var initDropdown = function() {
                $(".nav-link",scope).unbind();

                $('.dropdown').unbind();
                $('.dropdown-toggle', scope).unbind().bind("click", function(e) {
                    var o = $(this);
                    
                    if($(o).siblings(".dropdown-menu").length>0){
                        e.preventDefault();
                        e.stopPropagation();

                        if (o.attr("aria-expanded") == 'true') {
                            o.attr("aria-expanded", 'false');
                            $('~.dropdown-menu', o).removeClass('show');
                        } else {
                            o.attr("aria-expanded", 'true');
                            $('~.dropdown-menu', o).addClass('show');
                        }
                        return false;
                    }
                });

                $('.dropdown-item',scope).unbind().bind('click',function(e){
                    e.preventDefault();
                    e.stopPropagation();
                    var href = $(this).attr("href");
                    var target = $(this).attr("target"); 

                    switch(target){
                        case "_blank":
                        case "_top":
                        case "_parent":
                            window.open(
                              href,target
                            );
                        break;

                        case "_self":
                            location.href = href;
                        break;

                        default:
                            location.href = href;
                        break;
                    }
                })
            }

            var initToggler = function(){

               
                toggler.unbind().bind("click", function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if ($(this).hasClass("moving")) {
                        return false;
                    }
                    console.log('init Toggler',$(this).hasClass("collapsed"));

                    if ($(this).hasClass("collapsed")) {
                        // bodyScrollLock.enableBodyScroll(megamenu);
                        lastScrollTop = $(window).scrollTop();

                        toggler.attr('aria-expanded', true)
                        if (!navbar.hasClass(HEADER_STICKY_CLASS)){
                            $('.navbar-mega-menu',navbar).show();
                            navbar.addClass(HEADER_STICKY_CLASS);
                            toggler.addClass('moving');
                            setTimeout(function(){
                                toggler.removeClass('moving');
                            },500)
                        }

                        if (!html.hasClass(OPEN_NAV_CLASS)){
                            html.addClass(OPEN_MASK_CLASS)
                            html.addClass(OPEN_NAV_CLASS)
                            html.addClass(LOCK_BODY_CLASS)
                            body.css('top',-lastScrollTop);
                        }


                       body.off('move');
                       body.off('moveend');
                       body.off('click.closeNav');
                       body.on('move', function(e) {
                            console.log('move');

                        }).on('moveend', function(e) {
                            var x = Math.abs(e.deltaX);
                            var y = Math.abs(e.deltaY);
                            if(x>y && x>5){
                                toggler.trigger('click');
                            }else{
                                $('#debug_panel').html('s '+e.deltaX+','+e.deltaY+','+x+','+y);
                            }
                        });

                        
                       body.on('click.closeNav', function(e) {
                            toggler.trigger('click');
                        })

                        // $('#debug_panel').html('add slide event');

                    } else {
                       body.off('move');
                       body.off('moveend');
                        body.off('click.closeNav');
                        navbar.removeClass(HEADER_STICKY_CLASS)
                        html.removeClass(OPEN_MASK_CLASS)
                        html.removeClass(OPEN_NAV_CLASS)
                        html.removeClass(LOCK_BODY_CLASS)
                        html.removeClass(HEADER_STICKY_CLASS)
                        body.css('top','auto');
                        $(window).scrollTop(lastScrollTop);
                        toggler.addClass('moving');
                        setTimeout(function(){
                            $('.navbar-mega-menu',navbar).hide();
                            toggler.removeClass('moving');
                            toggler.attr('aria-expanded', false);
                        },500)

                        // $('#debug_panel').html('remove slide event');
                    }
                    $(this).toggleClass('collapsed');
                    return false;
                })
            }

            var initScrollEvent = function(){

                $(window).scroll(function() {
                    var pos = $(this).scrollTop();
                    if(pos>GO_TOP_DISPLAY_Y){
                        if(!html.hasClass('mask-on')){
                            FOOTER_GO_TOP.fadeIn();
                        }
                    }else{
                        FOOTER_GO_TOP.fadeOut();
                    }
                });
                //     if (pos > HEADER_STICKY_POS) {
                //         navbar.addClass(HEADER_STICKY_CLASS)
                //     } else {
                //         navbar.removeClass(HEADER_STICKY_CLASS)
                //     }
                // })
            }

            var init = function(){

                // movableWrap.addClass('movable-content');
                // linkedSection.addClass('movable-section');
                // megamenu.addClass('is-mobile-mega-menu');
                // navbar.addClass(HEADER_STICKY_CLASS);
                initScrollEvent();
                initDropdown();
                initToggler();

                megadropdown.hover(
                    function() {
                        var $this = $(this)
                        var hoverSrc = $(this).find('.dropdown-toggle img').attr('data-hover')
                        $this.find('.dropdown-toggle img').attr('src', hoverSrc)
                    },
                    function() {
                        var $this = $(this)
                        var src = $(this).find('.dropdown-toggle img').attr('data-img')
                        $this.find('.dropdown-toggle img').attr('src', src)
                    }
                )

            }
            init();
        }
        var initDefaultMode = function() {

      
      
            $('.navbar-mega-menu',navbar).show();
            navbar.removeClass(HEADER_STICKY_CLASS)
            html.removeClass(OPEN_MASK_CLASS)
            html.removeClass(OPEN_NAV_CLASS)
            html.removeClass(LOCK_BODY_CLASS)
            html.removeClass(HEADER_STICKY_CLASS)
            body.css('top','auto');
            html.removeClass('safari-addressbar-off');
            toggler.removeClass('moving');
            toggler.attr('aria-expanded', false);
            
            // console.log('mask-on body',$('.mask-on body').length);

           body.off('move');
           body.off('moveend');
           body.off('click.closeNav');


            if (windowScrollTop > HEADER_STICKY_POS) {
                navbar.addClass(HEADER_STICKY_CLASS)
                body.addClass(HEADER_STICKY_CLASS)
              
            } else {

                navbar.removeClass(HEADER_STICKY_CLASS);
                body.removeClass(HEADER_STICKY_CLASS);
            }

            // dropdown-menu
            $(".nav-link",scope).unbind().bind("click",function(e){
                e.preventDefault();
                e.stopPropagation();
                
                if($(this).siblings('.dropdown-menu').length==0){
                    var href = $(this).attr("href");
                    var target = $(this).attr("target"); 

                    switch(target){
                        case "_blank":
                        case "_top":
                        case "_parent":
                            window.open(
                              href,target
                            );
                        break;

                        case "_self":
                            location.href = href;
                        break;

                        default:
                            location.href = href;
                        break;
                    }  
                }
                return false;
            });

            $(".dropdown-item,.dropdown-title",scope).unbind().bind("click",function(e){
                e.preventDefault();
                e.stopPropagation();
                var href = $(this).attr("href");
                var target = $(this).attr("target"); 

                switch(target){
                    case "_blank":
                    case "_top":
                    case "_parent":
                        window.open(
                          href,target
                        );
                    break;

                    case "_self":
                        location.href = href;
                    break;

                    default:
                        location.href = href;
                    break;
                }
            })

            $(window).scroll(function() {
                var pos = $(this).scrollTop();
                if(mobileMode){
                    return false;
                }

                if(pos>GO_TOP_DISPLAY_Y){
                    if(!html.hasClass('mask-on')){
                        FOOTER_GO_TOP.fadeIn();
                    }
                }else{
                    FOOTER_GO_TOP.fadeOut();
                }

                if (pos > HEADER_STICKY_POS) {
                    navbar.addClass(HEADER_STICKY_CLASS)
                    body.addClass(HEADER_STICKY_CLASS)
                } else {
                    navbar.removeClass(HEADER_STICKY_CLASS)
                    body.removeClass(HEADER_STICKY_CLASS)
                }
            })
        }
        var switchMode = function() {
            if (mobileMode) {
                initMobileMode()

            } else {
               initDefaultMode()
            }
        }

        var img2Bg = function(){

            $('.navbar-nav>.nav-item',$('#navbarHeader')).each(function(i){
                
                
                $('.mega-dropdown-menu-inner',$(this)).addClass('mega-dropdown-menu-inner-length-'+$('.mega-dropdown-menu-inner>li',$(this)).length);
                var scope = $(this);
                var imgWrap = $('[cathay-img2bg]',scope);

                var d = new Date();
                var time = d.valueOf();
                var nav_class_name = 'cathay-hf-nav-'+i+'-'+time;

                $(this).addClass(nav_class_name);
                imgWrap.each(function(i){
                  var _this = $(this);
                  var d = new Date();
                  var time = d.valueOf();
                  var class_name = 'img2bg-'+i+'-'+time;;//'cathay-hf-img2bg-'+i+'-'+time;
                  var inlineStyle = "";
                  inlineStyle += '<style id="cathay-hf-img2bg-'+time+'">';
                  var media_ary = [0];
                  var img_ary = ['img','hover','sticky'];

                  var has_img = false;
                  for(var i in img_ary){
                    if(_this.attr('data-'+img_ary[i])!=undefined && _this.attr('data-'+img_ary[i])!=''){
                        has_img = true;
                    }
                  }
                  for(var i in img_ary){
                        
                      if(_this.attr('data-'+img_ary[i])!=undefined && _this.attr('data-'+img_ary[i])!=''){
                        has_img = true;
                        inlineStyle += '@media (min-width: '+media_ary[0]+'px){';
                        switch(img_ary[i]){
                            case 'img':
                                inlineStyle += '.'+nav_class_name+'  .'+class_name+'{';
                                // inlineStyle += '    background-size: 25px 25px;';
                                inlineStyle += '    background-image:url("'+_this.attr('data-'+img_ary[i])+'");';
                                inlineStyle += '  }';
                            break;

                            case 'hover':
                                inlineStyle += '.'+nav_class_name+':hover  .'+class_name+'{';
                                inlineStyle += '    background-image:url("'+_this.attr('data-'+img_ary[i])+'");';
                                inlineStyle += '  }';

                                inlineStyle += '.sticky .'+nav_class_name+':hover  .'+class_name+'{';
                                inlineStyle += '    background-image:url("'+_this.attr('data-'+img_ary[i])+'");';
                                inlineStyle += '  }';
                            break;

                            case 'sticky':
                                inlineStyle += '.sticky .'+nav_class_name+'  .'+class_name+'{';
                                inlineStyle += '    background-image:url("'+_this.attr('data-'+img_ary[i])+'");';
                                inlineStyle += '  }';
                        }

                        inlineStyle += '}';
                      } 
                  }

                  inlineStyle += "</style>";

                  if(!has_img){
                    _this.remove();
                  }else{
                    if(media_ary.length<3){
                      _this.addClass(class_name);
                      $(inlineStyle).appendTo("head");
                    }
                  }
                })
            })
        }
        var init = function(){

            img2Bg();

            var scope = $(".cli-header");
            $('*',scope).removeAttr('title');

            $(window).on('resize', function() {
                checkDevice();
            }).trigger('resize');

            
            //add footer go top
            FOOTER_GO_TOP.on('click',function(){
                $('html,body').animate({
                    scrollTop:0
                },500);
            });
        }

        init();
    })

})(window);