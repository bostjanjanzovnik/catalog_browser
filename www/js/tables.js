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
});
