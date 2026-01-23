$().ready(function () {
    var width = $(window).width();
    if (width <= 960) {
        var navbarChildren = $('.navbar-right').children();
        switch (navbarChildren.length) {
            case 2:
                break
            case 1:
                navbarChildren.attr('style', 'float: none; width: 100% !important;');
                break;
            case 0:
                $('.subnav').hide();
                break;
        }
    }
})    