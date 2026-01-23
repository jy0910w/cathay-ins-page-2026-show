const defaultNum = 10;
var storage = [];
var result = [];

$(function () {
    if($('#selectFilter').length>0){
        $('#selectFilter').select2();
    }
    //儲存該分類顯示消息的id
    $('.news.card:visible').each(function () {
        storage.push($(this));
    });
    storage.reverse();
    $('.news.card').hide();
    functionlist.defaultArticle(defaultNum);
    functionlist.showBtn(storage);
    functionlist.showArticle(result);

    $('#more-text').click(function () {
        $('.news.card').hide();
        functionlist.defaultArticle(defaultNum);
        functionlist.showBtn(storage);
        functionlist.showArticle(result);
    });
});

var functionlist = {
    startAction: function () {
        $('.news.card:visible').each(function () {
            storage.push($(this));
        });
        storage.reverse();
        $('.news.card').hide();
        functionlist.defaultArticle(defaultNum);
        functionlist.showBtn(storage);
        functionlist.showArticle(result);
    }
    ,
    defaultArticle: function (num) {
        $.each(storage, function (idx) {
            if (idx >= num) {
                return;
            }
            result.push(storage.pop());
        });
    }
    ,
    showArticle: function (r) {
        $.each(r, function (index, value) {
            $(value).show();
        });
    }
    ,
    showBtn: function (arr) {
        if (arr.length > 0) {
            $('#more-text').show();
        }
        else {
            $('#more-text').hide();
        }
    }
    ,
    reset: function () {
        storage = [];
        result = [];
        functionlist.startAction();
    }
};
//mobile
$('input[type="search"]').keypress(function (e) {
    let key = e.keyCode;
    if (key === 13) {
        e.preventDefault();
        const searchValue = $('input[type="search"]').val();
        window.location = 'https://www.cathay-ins.com.tw/INSPFWeb/servlet/HttpDispatcher/PFA1_0110/prompt?keywords=' + encodeURIComponent(searchValue);
    }
});

//web
function webSearchDirect() {    
    const searchValue = $('input[type="keyword"]').val();
    window.location = 'https://www.cathay-ins.com.tw/INSPFWeb/servlet/HttpDispatcher/PFA1_0110/prompt?keywords=' + encodeURIComponent(searchValue);
}

$('.btn.btn-text').click(function (e) {
    webSearchDirect();
});

$('input[type="keyword"]').keypress(function (e) {
    let key = e.keyCode;
    if (key === 13) {
        e.preventDefault();
        webSearchDirect();
    }
});

function getCookie(cookieName) {
  var name = cookieName + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1);
      if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
  }
  return "";
}

window.onload = function() {
	if(getCookie("CMFirstTimeFlag") == undefined || getCookie("CMFirstTimeFlag")!="1")
		$('.cookie').show();
};