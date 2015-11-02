var lastImg = 1;


$(document).on("swipeleft", "#tables-page", function(e) {
	var activeTab = $(".navbar .ui-btn-active").attr("id");
	var activeTabNum = activeTab.split("_")[1];

	switch(activeTabNum) {
		case "1":
			$("#tab_2").trigger("click");
			break;
		case "2":
			$("#tab_3").trigger("click");
			break;
		case "3":
			$("#tab_4").trigger('click');
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
		case "1":
			$("#tab_0").trigger('click');
			break;
	}
	$(".ui-page-theme-a.ui-btn:focus")
});

$(document).on('pageshow', '#tables-page', function(event) {
	var curr_tab = "tab_1";
	if(sessionStorage.getItem('curr_tab') != null){
		curr_tab = sessionStorage.getItem('curr_tab');
	}
    if(curr_tab == 'undefined') curr_tab = "tab_1";
	$("#" + curr_tab).addClass("ui-btn-active");

	$("#table1-container").show();
	$("#catalog-wrapper").hide();
	var el = $("div div[data-role=content]");

	window.ImagEffectInterval = setInterval(function(){
    	$("div.glow-effect-img").removeClass("glow-effect-img");
    	var activeTab = $(".navbar .ui-btn-active").attr("id");
    	var id = activeTab.split("_")[1];
    	var imgs = $("#table"+id+"-images-container img");
    	if(lastImg > imgs.length){
    		lastImg = 1;
    	}
    	var el = $(".img"+id+"_" + lastImg++);
    	el.toggleClass('glow-effect-img');

    }, 3000);
});


$(document).on("pageinit", "#tables-page", function(e) {

	$("#table1-container").css("display", "inline");
	$("#table2-container").css("display", "none");
	$("#table3-container").css("display", "none");
	$.idleTimer({
		timeout: 2 * 60 * 1000
	});
	$(document).on('idle.idleTimer', function(event, elem, obj){
		if(window.ImagEffectInterval) clearInterval(window.ImagEffectInterval);
		$.mobile.navigate( "#lister-page" );
	})

	$(document).on('vclick', function(event) {
		$( document ).idleTimer("reset");
	});

	$(".navbar a").click(function(e) {
		var tabId = $(this).attr("id");
		var tab = tabId.split("_")[1];

		$("#catalog-wrapper").hide();
		$("div div[data-role=content]").css('padding', 16);
		lastImg = 1;


		switch(tab) {
			case "0":
				showFlipbook(4);
				break;
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
			case "4":
				showFlipbook(5);
				break;
		}
	});


	var el = $('.flipbook_2');
    el.turn({
        display: 'single',
        width: 980,
        height: 730,
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
        left: 130,
        top: 0
    });

    $(".flipbook-viewport").find('.page-wrapper').removeClass('ui-page-theme-a');

    setInterval('$(".video-ikona").toggleClass("glow-effect");', 1000);

    $("#popupVideo iframe")
    	.attr("width", 0)
        .attr("height", 0);

    $("#popupVideo").on({
        popupbeforeposition: function() {
            var size = scale(910, 510, 15, 1);
            w = size.width;
            h = size.height;

            $("#popupVideo iframe")
                .attr("width", w)
                .attr("height", h);
        },
        popupafteropen: function(){
            var el = $("video");
            el[0].play();
            var elem = el[0];
			if (elem.requestFullscreen) {
			  elem.requestFullscreen();
			} else if (elem.msRequestFullscreen) {
			  elem.msRequestFullscreen();
			} else if (elem.mozRequestFullScreen) {
			  elem.mozRequestFullScreen();
			} else if (elem.webkitRequestFullscreen) {
			  elem.webkitRequestFullscreen();
			}
            el.bind('ended', function(){
            	elem.webkitExitFullScreen();
                $("#popupVideo").popup("close");
                $( document ).idleTimer("reset");
            });
            $( document ).idleTimer("pause");
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

	//klik na sliko tabele
	$("[class^='img1_'], [class^='img2_']").click(function() {
		var page = $(this).attr("id");
		page = page.split("_")[1];
		showFlipbook(page);
	});

	//animacija obrob slik
	//TODO: slike se bodo osvetljevale eno za drugo, vsakih 3 sekund konstantno
	//setInterval('$("[class^=img1_]").toggleClass("glow-effect");', 2000);
});

function showFlipbook(page){
	$(".tabble-wrapper").hide();
	$("#catalog-wrapper").show();
	var el = $("div div[data-role=content]");
	el.css({'padding': 0});
	$(".flipbook_2").turn('size', 980, $(window).height() - $("#tables-header").height() - 2);
	$(".flipbook_2").turn('page', page);
}

$(document).on("swipeleft", "#catalog-wrapper", function(e) {
	e.preventDefault();
	e.stopPropagation();
	$(".flipbook_2").turn("next");
});

$(document).on("swiperight", "#catalog-wrapper", function(e) {
	e.preventDefault();
	e.stopPropagation();
	$(".flipbook_2").turn("previous");
});