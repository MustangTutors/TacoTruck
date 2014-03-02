$(document).ready(function(){
	$(document).on('submit', 'form', function(event){
        event.preventDefault();

		var password = $("#registration_password").val();
		var checkPass = $("#registration_confirm").val();

		if(password !== checkPass) {
			$(".error").html("Error: Password confirmation did not match.<br/><br/>");
		}
		else {
            $.ajax({
                type: "POST",
                url: "phpdoc/addUser.php",
                data: $(this).serialize(),
                success: function(output) {
                    if (output === "1") {
                        window.location.replace("index.html");
                    }
                    else {
                        $(".error").html("Error: That email already exists.<br/><br/>");
                    }
                }
            });
			$(".error").html("");
		}
	});
});