$(function(){

    var scope = $('.cathay-toolbar');
    var FOOTER_GO_TOP = $('[role="page-go-top"]');
    var GO_TOP_DISPLAY_Y = 100;
    var html = $('html');
    var body = $('body');
    var OPEN_MASK_CLASS = 'mask-on';
    var LOCK_BODY_CLASS = 'body-lock';
    var OPEN_TOOLBAR_CLASS = 'toolbar-on';
    var SHOW_TOOLBAR_CLASS = 'toolbar-show';

    var addEventListener = function(){
      $('[cathay-toolbar-main-btn]',scope).unbind().bind('click',function(e){
        
        if($(this).hasClass('ct-link--active')){
              html.removeClass(SHOW_TOOLBAR_CLASS);
            setTimeout(function(){
              $('.ct-list').hide();
            html.removeClass(OPEN_TOOLBAR_CLASS);
            html.removeClass(OPEN_MASK_CLASS);
            },300);
            
            if($(window).scrollTop()>GO_TOP_DISPLAY_Y){
                FOOTER_GO_TOP.fadeIn();
            }else{
                FOOTER_GO_TOP.fadeOut();
            }
          $(this).removeClass('ct-link--active');
        }
        else{
            $(this).addClass('ct-link--active');
            FOOTER_GO_TOP.hide();
            $('.ct-list').show();
            html.addClass(OPEN_MASK_CLASS);  
            html.addClass(OPEN_TOOLBAR_CLASS);  
            setTimeout(function(){
              html.addClass(SHOW_TOOLBAR_CLASS);  
            },100);

            
        }
      });


      $('[cathay-toolbar-close-btn]',scope).unbind().bind('click',function(e){
        $('[cathay-toolbar-main-btn]',scope).trigger('click');
      });

      var height = window.innerHeight;

      var resize = function() {
          if(window.innerHeight>height){
            html.addClass('safari-addressbar-off');
            // $('#debug_panel').html('addressbar-off')
          }else if(window.innerHeight == height){
            html.removeClass('safari-addressbar-off');
            // $('#debug_panel').html('addressbar-show1')
          }else{
            html.removeClass('safari-addressbar-off');
            // $('#debug_panel').html('addressbar-show2')
          }
          if(window.innerHeight != height) {
              height = window.innerHeight;
          }
      };

      $(window).on('resize', function() {
          resize();
      }).trigger('resize');

    }

    var img2Bg = function(){

        var imgWrap = $('[cathay-img2bg]',scope);

        imgWrap.each(function(i){

          var _this = $(this);
          var d = new Date();
          var time = d.valueOf();
          var class_name = 'cathay-img2bg-'+i+'-'+time;
          var inlineStyle = "";
          inlineStyle += '<style id="cathay-img2bg-'+time+'">';
          var media_ary = [0];
          if(_this.attr('data-img')!=undefined && _this.attr('data-img')!=''){
            inlineStyle += '@media (min-width: '+media_ary[0]+'px){';
            inlineStyle += '  .'+class_name+'{';
            inlineStyle += '    background-image:url("'+_this.attr('data-img')+'");';
            inlineStyle += '  }';
            inlineStyle += '}';
          }
          
          if(_this.attr('data-img-hover')!=undefined && _this.attr('data-img-hover')!=''){
            inlineStyle += '@media (min-width: '+media_ary[0]+'px){';
            inlineStyle += '  .'+class_name+':hover{';
            inlineStyle += '    background-image:url("'+_this.attr('data-img-hover')+'");';
            inlineStyle += '  }';
            inlineStyle += '}';
          }

          inlineStyle += "</style>";

          
          _this.addClass(class_name);
          $(inlineStyle).appendTo("head");
        })
    }

    var init = function(){
        html.addClass('has-toolbar');
        addEventListener();
        img2Bg();
    }

    init()
})