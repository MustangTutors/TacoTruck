$(document).ready(function() {
	$(document).on('click', "form#loginForm input[type='submit']", function(event) {
		//var request = new XMLHttpRequest();
		//var url = "localhost/TacoTruck/index.html";
		event.preventDefault();

		var email = $("#login_email").val();

		var welcome = "<h2>Welcome, <span>"+email+"</span></h2>";

		$("form#loginForm").hide();
		$("section#login").html(welcome);

	});
});