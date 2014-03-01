$(document).ready(function() {
	$(document).on('click', "form#loginForm input[type='submit']", function(event) {
		//var request = new XMLHttpRequest();
		//var url = "localhost/TacoTruck/index.html";

		var email = $("#login_email").val();
		var password = $("#login_password").val();
		console.log(email);
		console.log(password);
		console.log("help");


		//request.open("POST", url, false);
		//request.send();
	});
});