
$(function(){
    var cathayCloud = function(){
        var scope = $('[cathay-tag-cloud]');
        if(scope.length==0){
            return false;
        }
        var data = [];
        
        var shuffle = function(){
            var currentIndex = data.length, temporaryValue, randomIndex;
            while (0 !== currentIndex) {
                randomIndex = Math.floor(window.crypto.getRandomValues(new Uint8Array(1)) / 444 * currentIndex);
                currentIndex -= 1;
                temporaryValue = data[currentIndex];
                data[currentIndex] = data[randomIndex];
                data[randomIndex] = temporaryValue;
            }
        }
        var collect = function(){
            data = [];
            $('li',scope).each(function(){
                var o = $(this);
                var feq = o.attr('data-feq');
                var link = $.trim(o.html());
                data.push({'link':link,'feq':feq});
            })
        }
        var sort = function(){
            var html = '';
            for(var i in data){
                var d = data[i];
                html += '<li class="ctc-item ctc-item--lv'+d.feq+'">';
                html += d.link;
                html += '</li>';
            }
            scope.html(html);
        }
        collect();
        shuffle();
        sort();
    }();
})