$(document).on("pageinit", "#lister-page", function () {
    var el = $('.flipbook');
    el.turn({
            // Width
        width: 1280,
        display: 'single',
        // Height
        height: 800,
        // Elevation
        elevation: 50,
        // Enable gradients
        gradients: true,
    });
    el.css({
        left: 0,
        top: 0
    })
    el.bind('start',
        function (event, pageObject, corner)
        {
            if (corner == 'tl' || corner == 'tr' || corner == 'bl' || corner == 'br')
            {
                event.preventDefault();
                $.mobile.changePage("#tables-page", { transition: "slidedown", reverse: true });
            }
        }
    );
    //el.css('top', (el.height() - 100) * -1);
    window.catalogInterval = setInterval(function(){
        var pages = $('.flipbook').turn("pages");
        var page = $('.flipbook').turn('page');
        if(page == pages){
            $('.flipbook').turn('page', 1);
            //bindClickEvent();
        }
        else
            $('.flipbook').turn('next');

    }, 5000);
    $(".flipbook-viewport").find('.page-wrapper').removeClass('ui-page-theme-a');
});
$(document).on("pageinit", "#catalog-page", function () {

});


function bindClickEvent () {
    $(".flipbook div.page").bind('vclick', function(event) {
        console.log($(this));
        clearInterval(window.catalogInterval);
    });
}
