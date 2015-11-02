/* main page controller */
/*$(document).on("pageinit", "#lister-page", function () {
	$(this).on('vmousedown', function() {
		$.mobile.changePage("#tables-page", { transition: "slidedown", reverse: true });
	});
});*/

/* tables page controller */
/*$(document).on("swipeleft", "#tables-page", function(e) {
	var activeTab = $(".navbar .ui-btn-active").attr("id");
	var activeTabNum = activeTab.split("_")[1];

	switch(activeTabNum) {
		case "1":
			$("#tab_2").trigger("click");
			break;
		case "2":
			$("#tab_3").trigger("click");
			break;
	}
});

$(document).on("swiperight", "#tables-page", function(e) {
	var activeTab = $(".navbar .ui-btn-active").attr("id");
	var activeTabNum = activeTab.split("_")[1];

	switch(activeTabNum) {
		case "3":
			$("#tab_2").trigger("click");
			break;
		case "2":
			$("#tab_1").trigger("click");
			break;
	}
});

$(document).on('pageshow', '#tables-page', function(event) {
	var curr_tab = "tab_1";
	if(sessionStorage.getItem('curr_tab') != null){
		curr_tab = sessionStorage.getItem('curr_tab');
	}
    if(curr_tab == 'undefined') curr_tab = "tab_1";
	$("#" + curr_tab).addClass("ui-btn-active");
});

$(document).on("pageinit", "#tables-page", function(e) {
	$("#table1-container").css("display", "inline");
	$("#table2-container").css("display", "none");
	$("#table3-container").css("display", "none");

	$(".navbar a").click(function(e) {
		var tabId = $(this).attr("id");
		var tab = tabId.split("_")[1];

		switch(tab) {
			case "1":
				$("#table1-container").css("display", "inline");
				$("#table2-container").css("display", "none");
				$("#table3-container").css("display", "none");
				break;
			case "2":
				$("#table1-container").css("display", "none");
				$("#table2-container").css("display", "inline");
				$("#table3-container").css("display", "none");
				break;
			case "3":
				$("#table1-container").css("display", "none");
				$("#table2-container").css("display", "none");
				$("#table3-container").css("display", "inline");
				break;
		}
	});

	//klik na sliko tabele
	$("[class^='img1_'], [class^='img2_']").click(function() {
		var page = $(this).attr("id");
		page = page.split("_")[1];

		$("#catalog-page").data("info", page);
		$.mobile.changePage("#catalog-page", { transition: "none" });
	});

	//animacija obrob slik
	//TODO: slike se bodo osvetljevale eno za drugo, vsakih 3 sekund konstantno
	//setInterval('$("[class^=img1_]").toggleClass("glow-effect");', 2000);
});*/

/* catalog page controller */
$(document).on("pagebeforeshow", "#catalog-page", function () {
	sessionStorage.setItem("curr_page", $(this).data("info"));
	sessionStorage.setItem('curr_tab', $(".ui-btn-active").attr('id'));
});

$(document).on("pageshow", "#catalog-page", function () {
	var page = 1;
	if (sessionStorage.getItem("curr_page") != null) {
		page = sessionStorage.getItem("curr_page");
	}
    if(page == 'undefined') page = 1;
	$('.flipbook_2').turn('page', page);

	$(".flipbook-viewport").css({"height": "94.5%"});
});

$(document).on("pageinit", "#catalog-page", function () {
	$(".flipbook-viewport").css({"height": "94.5%"});

    //katalog flipbook
	var el = $('.flipbook_2');
    el.turn({
        display: 'single',
        width: 1050,
        height: 730,
        elevation: 50,
        gradients: true,
        duration: 1000
    });
    el.bind({
        start: function (event, pageObject, corner) {
            if (corner == 'tr') {
                event.preventDefault();
            }
        }
    });
    el.css({
        left: 115,
        top: 13
    });

    $(".flipbook-viewport").find('.page-wrapper').removeClass('ui-page-theme-a');

    //video player
    $("#popupVideo iframe")
    	.attr("width", 0)
        .attr("height", 0);

    $("#popupVideo").on({
        popupbeforeposition: function() {
            var size = scale(560, 315, 15, 1);
            w = size.width;
            h = size.height;

            $("#popupVideo iframe")
                .attr("width", w)
                .attr("height", h);
        },
        popupafteropen: function(){
            var el = $("video");
            el[0].play();
            el.bind('ended', function(){
                $("#popupVideo").popup("close");
            });
        },
        popupafterclose: function() {
            $("#popupVideo iframe")
                .attr("width", 0)
                .attr("height", 0);

            var el = $("video");
            el.currentTime = 0;
            el.load();
        }
    });

    function scale(width, height, padding, border) {
        var scrWidth = $( window ).width() - 30,
            scrHeight = $( window ).height() - 30,
            ifrPadding = 2 * padding,
            ifrBorder = 2 * border,
            ifrWidth = width + ifrPadding + ifrBorder,
            ifrHeight = height + ifrPadding + ifrBorder,
            h, w;

        if ( ifrWidth < scrWidth && ifrHeight < scrHeight ) {
            w = ifrWidth;
            h = ifrHeight;
        } else if ( ( ifrWidth / scrWidth ) > ( ifrHeight / scrHeight ) ) {
            w = scrWidth;
            h = ( scrWidth / ifrWidth ) * ifrHeight;
        } else {
            h = scrHeight;
            w = ( scrHeight / ifrHeight ) * ifrWidth;
        }

        return {
            'width': w - ( ifrPadding + ifrBorder ),
            'height': h - ( ifrPadding + ifrBorder )
        };
    };
});

$(document).on("swipeleft", "#catalog-page", function(e) {
	$(".flipbook_2").turn("next");
});

$(document).on("swiperight", "#catalog-page", function(e) {
	$(".flipbook_2").turn("previous");
});
