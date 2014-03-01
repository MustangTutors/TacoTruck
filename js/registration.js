$(document).ready(function(){
	$("form input[type='submit']").click(function(event){
		var password = $("#registration_password").val();
		var checkPass = $("#registration_confirm").val();

		if(password !== checkPass) {
			event.preventDefault();
			$(".error").html("Error: Password confirmation did not match.<br/><br/>");
		}
		else{
			$(".error").html("");
		}
	})
});