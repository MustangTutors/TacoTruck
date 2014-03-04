$(document).ready(function() {
	$(document).on('submit', "form#loginForm", function(event) {
		event.preventDefault(); //Prevent page from refreshing

		$.ajax({
			type: "GET",
			url: "api/toppings/sauces",
			data: {
				email: $("input[name='email']").val(),
				password: $("input[name='password']").val()
			},
			success: function(data) {
				// Add logic for if failed to login
				// If not logged in correctly
				// alert("Incorrect login information.");

				// Welcome Message
				$("form#loginForm").hide();
		        $("#welcomeMessage").show();
		        // $("#welcomeMessage span.welcome").html("Weclome, " + data.first_name + "!");

		        // Logout button
		        $("nav a[href='registration.html']").html("Logout");
		        $("nav a[href='registration.html']").attr('id', 'logout');
		        $("#logout").attr('href', "#");

		        // Clear username and password
		        $("#login_email").val('');
		        $("#login_password").val('');

		        // Clear previous order
		        $("#previousOrder .taco").remove();

		        // Parse JSON for Previous Order
			    $.ajax({
			        url: "js/getPreviousOrder.json",
			        success: function(json) {
			        	//Hide previous order if no previous order
			        	if(json.previousOrder.length === 0){
			        		$("#previousOrder").hide();
			        	}
			        	else {
			        		$("#previousOrder").show();
			        	}

			            for(var i = 0; i < json.previousOrder.length; i++) {
			                var taco = json.previousOrder[i];

			                // Create a taco
			                var newTaco = $('<div class=taco>'+'<div class="tacoItem tortilla"><img src="img/tortilla/' + taco.toppings[1].topping_id + '.png" alt="tortilla">'+
			                                '<span class="smallFont">' + taco.toppings[1].topping_name + '</span></div>' +
			                                '<div class="tacoItem filling"><img src="img/filling/' + taco.toppings[0].topping_id + '.png" alt="filling">'+
			                                '<span class="smallFont">' + taco.toppings[0].topping_name + '</span></div><hr>' +
			                                '<div class="tacoQuantity"><span class="tacoLabel">Quantity:</span>'+
			                                '<input type="number" value="' + taco.quantity + '" min="1" max="100" name="quantity"></div><div class="indivTacoPrice"><span class="tacoLabel">/ea</span></div></div>');
			                
			                newTaco.insertBefore("#previousOrder div.center");

			                // Add topping title
			                if(taco.toppings.length > 2) {
			                    var toppingTitle = $('<span class="tacoLabel">Toppings</span><br/>');
			                    toppingTitle.insertBefore("#previousOrder div.tacoQuantity");
			                }

			                // Add all toppings
			                var newTopping;
			                var price = taco.toppings[0].topping_price + taco.toppings[1].topping_price;
			                for(var j = 2; j < taco.toppings.length; j++) {
			                    if(taco.toppings[j].topping_type === "vegetable") {
			                        newTopping = $('<div class="tacoItem"><img src="img/vegetable.png" alt="vegetable"><span class="smallFont">' + taco.toppings[j].topping_name + '</span></div>');
			                        newTopping.insertBefore("#previousOrder div.tacoQuantity");
			                        price += taco.toppings[j].topping_price;
			                    }
			                    else if(taco.toppings[j].topping_type === "extra") {
			                        newTopping = $('<div class="tacoItem"><img src="img/extra.png" alt="extra"><span class="smallFont">' + taco.toppings[j].topping_name + '</span></div>');
			                        newTopping.insertBefore("#previousOrder div.tacoQuantity");
			                        price += taco.toppings[j].topping_price;
			                    }
			                    else {
			                        newTopping = $('<div class="tacoItem"><img src="img/' + taco.toppings[j].topping_type + '/' + taco.toppings[j].topping_id + 
			                                        '.png" alt="topping"><span class="smallFont">' + taco.toppings[j].topping_name + '</span></div>');
			                        newTopping.insertBefore("#previousOrder div.tacoQuantity");
			                        price += taco.toppings[j].topping_price;
			                    }
			                }

			                // Add line break
			                if(taco.toppings.length > 2) {
			                    var lineBreak = $('<hr>');
			                    lineBreak.insertBefore("#previousOrder div.tacoQuantity");
			                }

			                // Add price
			                var newPrice = $('<span class="tacoPrice">$' + price.toFixed(2) + '</span>');
			                newPrice.insertBefore("#previousOrder .taco:last .indivTacoPrice span.tacoLabel");

			                // JSON object stuff
			                jQuery.data($("#previousOrder .taco:last")[0], 'taco', JSON.stringify(taco));
			            }
			        }
			    });
			}
		});
	});

	$(document).on('click', '#logout', function(){
		$.ajax({
			type: "GET",
			url: "api/toppings/sauces",
			success: function(data){
				// Login Message
				$("form#loginForm").show();
		        $("#welcomeMessage").hide();

		        // Log out button
		        $("#logout").attr('href', "registration.html");
		        $("nav a[href='registration.html']").attr('id', '');
		        $("nav a[href='registration.html']").html("Register");

		        // Previous Order
		        $("#previousOrder #useLastOrder").prop('checked', false);
		        $("#previousOrder").hide();

		        updateTotalPrice();
			}
		});
	});
});