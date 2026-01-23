
//將外站傳來的白名單Query帶至所有<a>上
$(function () {
    if (!(typeof Querys === 'undefined')) {
        $("a").each(function (index) {
            if ($(this).prop('href')) {
                var a = document.createElement('a');
                a.href = $(this).prop('href');
                var query = '';
                var flag = true;
                $.each(Querys, function (index, value) {
                    if (flag && !a.search) {
                        query += '?' + index + '=' + value;
                        flag = false;
                    }
                    else {
                        query += '&' + index + '=' + value;
                        flag = false;
                    }
                });
                $(this).attr('href', $(this).prop('href') + query);
            }
        });
    }

    //// 登入URL附加客製的 query string
    function getLoginUrlAppendQs(loginUrl) {
        var resultUrl = loginUrl;
        var appendQs = {
            "regFrom": "regFrom=cathayins",
            "loginForwardTrx": "loginForwardTrx=" + window.location.href
        };

        var loginPathAndQueryArr = loginUrl.split('?');
        switch (loginPathAndQueryArr.length) {
            case 1:
                {
                    resultUrl = loginPathAndQueryArr[0] + '?' + Object.values(appendQs).join('&');
                    break;
                }
            case 2:
                {
                    var loginUrlQs = loginPathAndQueryArr[1];
                    var qsArr = [loginUrlQs];
                    var keys = Object.keys(appendQs);
                    for (var i = 0; i < keys.length; i++) {
                        if (loginUrlQs.indexOf(keys[i]) < 0) {
                            qsArr.push(appendQs[keys[i]]);
                        }
                    }

                    resultUrl = loginPathAndQueryArr[0] + '?' + qsArr.join('&');
                    break;
                }
        }

        return resultUrl;
    }
    $.each($('[data-login-btn="getLoginUrlAppendQs"]'), function (index, obj) {
        var appendUrl = getLoginUrlAppendQs($(obj).attr('href'));
        $(obj).attr('href', appendUrl);
    });
});