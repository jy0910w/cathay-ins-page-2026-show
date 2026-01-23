;(function(){
    var getPageY = function() { return window.pageYOffset || ((('clientHeight' in document.documentElement))?document.documentElement:document.body).scrollTop; };
    var getWinH = function() { return window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight||$(window).height(); };

    $.fn.isInView = function(ratio1, ratio2){
        if(!this[0]) { return false; } 
        var y = getPageY(),
            ph = getWinH(),
            t = this.offset().top,
            h = this.outerHeight(),
            r1 = ratio1, // 往下捲，內容由下往上進場， ratio1, 
            r2 = ratio2; // 往回捲，內容由上往下進場
            
        if(r1 == undefined) { r1 = 1; }
        if(r2 == undefined) { r2 = r1; }
        return (
                y > t - ph + ph*(1-r1)*.5  //往下捲
                && y < (t+h)  - ph*(1-r2)*.5  //往回捲
        );
    };


    
    $(function(){
        
        var img2Bg = function(){

            var scope = $('main');
            var imgWrap = $('[cathay-img2bg]',scope);

            imgWrap.each(function(i){

                var _this = $(this);
                var d = new Date();
                var time = d.valueOf();
                var class_name = 'cathay-img2bg-'+i+'-'+time;
                var inlineStyle = "";
                inlineStyle += '<style id="cathay-img2bg-'+time+'">';
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
                    _this.addClass(class_name);
                    $(inlineStyle).appendTo("head");
                }
            })
        }();

        $(window).on('scroll resize orientationchange touchmove touchstart load', scroll);
        setTimeout(scroll,500);
        function scroll(){
            if($('.uspa:not(.state-started)').isInView(1)) {
                $('.uspa').addClass('state-started');
                var duration = parseFloat($('.uspa').css('transition-duration') || 1.5)*1000;
                setTimeout(function(){
                    $('.uspa').addClass('state-hit');

                    $(' .uspa-car.L, .uspa-col.L').bind('mouseover',function(){
                        $('.uspa-col.L').addClass('hover');
                        $('.uspa-car.R').addClass('disabled');
                        $('.uspa-col.R').addClass('disabled');
                    })
                    $(' .uspa-car.L, .uspa-col.L').bind('mouseout',function(){
                        $('.uspa-col.L').removeClass('hover');
                        $('.uspa-col.R').removeClass('disabled');
                        $('.uspa-car.R').removeClass('disabled');
                    })
                    
                    $(' .uspa-car.R, .uspa-col.R').bind('mouseover',function(){
                        $('.uspa-col.R').addClass('hover');
                        $('.uspa-col.L').addClass('disabled');
                        $('.uspa-car.L').addClass('disabled');
                    })
                    
                    $(' .uspa-car.R, .uspa-col.R').bind('mouseout',function(){
                        $('.uspa-col.R').removeClass('hover');
                        $('.uspa-car.L').removeClass('disabled');
                        $('.uspa-col.L').removeClass('disabled');
                    })
                }, duration);
            }
        }
    });
})(); 