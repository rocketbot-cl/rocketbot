$(document).ready(function() {
	$("#loading").hide();
	$("#btn_view").hide();
	$("#btn_start").click(function() {
		$("#circle").hide();
		$("#loading").show();
		$.ajax({
			url: "/performance/start",
			type: "GET",
			success: function(data) {
				console.log(data);
				data = JSON.parse(data);
				$("#cpu").text(data.cpu2 + "%")
				$("#mem").text(data.memory + "%")
				$("#process").text(data.memory_process)
			}
		});
	});
	$("#btn_stop").click(function() {
		$("#circle").show();
		$("#loading").hide();
		$.ajax({
			url: "/performance/stop",
			type: "GET",
			success: function(data) {
				$("#btn_view").show();

				console.log(data);
				data = JSON.parse(data);
				$("#cpu").text(data.cpu2 + "%")
				$("#mem").text(data.memory + "%")
				$("#process").text(data.memory_process)
				// Open new tab with the data
				window.open("/performance/visor.html", "_blank");
			}
		});
	});
});