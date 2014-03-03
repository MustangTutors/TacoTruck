$(document).ready(function() {
	$(document).on('click', "form#loginForm input[type='submit']", function(event) {
		event.preventDefault(); //Prevent page from refreshing

		var email = $("#login_email").val();

		//Add welcome message for when person is successfully logged in
		var welcome = "<h2>Welcome, <span>"+email+"</span></h2>";

		$("form#loginForm").hide();
		$("section#login").html(welcome);

	});
});