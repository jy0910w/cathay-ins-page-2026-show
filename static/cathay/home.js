$(function(){

    var addEventListener = function(){

    }

    var img2Bg = function(){

        var scope = $('main');
        var imgWrap = $('.cathay-img2bg',scope);

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
    }

    var init = function(){
        addEventListener();
        img2Bg();
    }

    init()
})