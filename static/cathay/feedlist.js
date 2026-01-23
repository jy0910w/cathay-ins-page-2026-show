$(function(){

    var updateCathayFeedList = function(){
        $('[cathay-feedlist-truncate]').each(function(){
            var o = $(this);
            
            $(".cathay-feeditem",o).each(function(){
                var window_w = $(window).width();
                var elm_w = $('.cathay-feeditem-img',$(this)).width();

                //title
                var title_elm = $(".cathay-feeditem-title",$(this));
                var font_size = parseInt(title_elm.css('font-size'));
                var line_height = parseInt(title_elm.css('line-height'));
                var display = title_elm.css('display')
                if(title_elm.attr('ori-text')==undefined){
                    title_elm.attr('ori-text',title_elm.text())
                }
                var txt = title_elm.attr('ori-text');
                var row = 2;
                title_elm.css('height','auto');
                title_elm.css('max-height','none');
                title_elm.text('國');
                title_elm.css('display','inline');
                var word_width = title_elm.width();
                var word_height = title_elm.height();
                title_elm.text(txt);
                title_elm.css('display',display);
                var a_word_num = Math.floor(title_elm.width()/word_width);
                var word_num =a_word_num * row;
                title_elm.attr('max-word',word_num);
                if(txt.length>word_num){
                    title_elm.text(txt.substr(0,word_num-2)+'...');
                }else{
                    title_elm.text(txt);
                }
                title_elm.css('height',line_height*2);
                /////////////////////////////////
                //descr
                /////////////////////////////////
                var descr_elm = $(".cathay-feeditem-descr",$(this));
                var font_size = parseInt(descr_elm.css('font-size'));
                var line_height = parseInt(descr_elm.css('line-height'));
                var display = descr_elm.css('display')
                if(descr_elm.attr('ori-text')==undefined){
                    descr_elm.attr('ori-text',descr_elm.text())
                }
                var txt = descr_elm.attr('ori-text');
                var row = 2;
                descr_elm.css('height','auto');
                descr_elm.css('max-height','none');
                descr_elm.text('國');
                descr_elm.css('display','inline');
                var word_width = descr_elm.width();
                var word_height = descr_elm.height();
                descr_elm.text(txt);
                descr_elm.css('display',display);
                var a_word_num = Math.floor(descr_elm.width()/word_width);
                var word_num =a_word_num * row;
                descr_elm.attr('max-word',word_num);
                if(txt.length>word_num){
                    descr_elm.text(txt.substr(0,word_num-2)+'...');
                }else{
                    descr_elm.text(txt);
                }
                descr_elm.css('height',line_height*2);
            })
        })
    }
    var initCathayFeedList = function(){
        if($('.cathay-feedlist').length>0){
            $(window).bind('resize',function(){
                updateCathayFeedList();
            }).trigger('resize');


        }
    };

    var initCathayMoreList = function(){
        $('[cathay-more-content]').each(function(){
            var scope;
            var child_class_name;
            var children;
            var trigger;
            var current_page;
            var total_page;
            var page_num;
            
            scope = $(this);
            trigger = $(scope.attr("data-trigger"));
            child_class_name = scope.attr("data-child").replace('.','');
            children = scope.get(0).getElementsByClassName(child_class_name);
            current_page = parseInt(scope.attr('data-current-page'));
            page_num = parseInt(scope.attr('data-page-num'));
            total_page = Math.ceil(children.length/page_num);
            //
            
            var update = function(){
                var child_total = children.length
                var max = current_page*page_num+1;
                scope.attr('data-current-page',current_page);
                for (var i = 0; i < child_total; ++i) {
                    var item = children[i];  
                    if(i>max){
                        item.style.display = "none";
                    }else{
                        item.style.display = "";
                    }
                }
            }

            var next = function(){
                current_page+=1;
                if(current_page == total_page){
                    trigger.get(0).style.display = "none";
                }else{
                    trigger.get(0).style.display = "";
                }
                update();
            }

            scope.attr('data-total-page',total_page);
            trigger.unbind().bind('click',next);
                
            update();
        });
    }
    
    $("img.lazyload").lazyload();
    initCathayFeedList();
    initCathayMoreList();
})