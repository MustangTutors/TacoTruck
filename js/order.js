$(document).ready(function(){
	// Adds/removes selected box around tortilla on click
	$(document).on('click', "#tortillaSelection .pictureBox", function(event){
		// Remove the class from the previous selection
		$("#tortillaSelection .pictureBox[class~='selected']").removeClass("selected");
		
		// Add the class to the new selection	
		$(this).addClass("selected");
	});

	// Adds/removes selected box around filling on click
	$(document).on('click', "#fillingSelection .pictureBox", function(event){
		// Remove the class from the previous selection
		$("#fillingSelection .pictureBox[class~='selected']").removeClass("selected");
		
		// Add the class to the new selection
		$(this).addClass("selected");
	});

    // Picture for rice
    $(document).on('change', "#riceSelection .dropdown", function(event){
        var id = $(this).val();
        var url;
        if (id === "none") {
            url = "img/none.png";
        }
        else {
            url = "img/rice/" + id + ".png";
        }
        $("#riceSelection img").attr('src', url);
    });

    // Picture for beans
    $(document).on('change', "#beanSelection .dropdown", function(event){
        var id = $(this).val();
        var url;
        if (id === "none") {
            url = "img/none.png";
        }
        else {
            url = "img/beans/" + id + ".png";
        }
        $("#beanSelection img").attr('src', url);
    });

    // Picture for cheese
    $(document).on('change', "#cheeseSelection .dropdown", function(event){
        var id = $(this).val();
        var url;
        if (id === "none") {
            url = "img/none.png";
        }
        else {
            url = "img/cheese/" + id + ".png";
        }
        $("#cheeseSelection img").attr('src', url);
    });

    // Picture for sauce
    $(document).on('change', "#sauceSelection .dropdown", function(event){
        var id = $(this).val();
        var url;
        if (id === "none") {
            url = "img/none.png";
        }
        else {
            url = "img/sauce/" + id + ".png";
        }
        $("#sauceSelection img").attr('src', url);
    });

	// Select/deselect all vegetables
	$(document).on('click', "#selectAllVegetables", function(event){
		// If not selected, select all
		if($("#selectAllVegetables").html() === "Select All"){
			$("#vegetableSelection input[type='checkbox']").prop('checked', true);
			$("#selectAllVegetables").html("Deselect All");
		}
		// If selected, deselect all
		else {
			$("#vegetableSelection input[type='checkbox']").prop('checked', false);
			$("#selectAllVegetables").html("Select All");
		}
	});

	// Select/deselect all extras
	$(document).on('click', "#selectAllExtras", function(event){
		// If not selected, select all
		if($("#selectAllExtras").html() === "Select All"){
			$("#extraSelection input[type='checkbox']").prop('checked', true);
			$("#selectAllExtras").html("Deselect All");
		}
		// If selected, deselect all
		else {
			$("#extraSelection input[type='checkbox']").prop('checked', false);
			$("#selectAllExtras").html("Select All");
		}
	});

    // Update total price when the previous order is added/removed from order.
    $(document).on('change', '#useLastOrder', function() {
        updateTotalPrice();
    });

    // Update total price whenever a quantity is changed.
    $(document).on('change', '.tacoQuantity input[name="quantity"]', function() {
        updateTotalPrice();
    });

    // Remove a taco from order
    $(document).on('click', '.delete', function() {
        var taco = $(this).parent();
        taco.remove();
        updateTotalPrice();
    });

    // Open the payment window when "Pay" is clicked.
    $(document).on('click', '#submitOrder', function() {
        $("#payment").show();
    });

    // Close the payment window when "Cancel" in the Payment window is clicked.
    $(document).on('click', '#cancelPayment', function() {
        $("#payment").hide();
    });


	// Cancel taco and clear all selections
	$(document).on('click', "#cancelTaco", function(event){
		// Remove the class from the previous tortilla and filling selections
		$("#tortillaSelection .pictureBox[class~='selected']").removeClass("selected");
		$("#fillingSelection .pictureBox[class~='selected']").removeClass("selected");
		
		// Add the class to the first option for tortilla and filling	
		$("#tortillaSelection .pictureBox:first-of-type").addClass("selected");
		$("#fillingSelection .pictureBox:first-of-type").addClass("selected");

		// Make dropdowns be 'none'
		$("#createTaco .dropdown").val('none');

        // Change pictures back to question mark
        $("#riceSelection img").attr('src', 'img/none.png');
        $("#beanSelection img").attr('src', 'img/none.png');
        $("#cheeseSelection img").attr('src', 'img/none.png');
        $("#sauceSelection img").attr('src', 'img/none.png');

		// Deselect all vegetables
		$("#vegetableSelection input[type='checkbox']").prop('checked', false);
		$("#selectAllVegetables").html("Select All");

		// Deselect all extras
		$("#extraSelection input[type='checkbox']").prop('checked', false);
		$("#selectAllExtras").html("Select All");

		// Reset Quantity
		$("#quantitySelection input[name='quantity']").val(1);

		// Reset Price
		$("#indivPrice .price").html("$0.00");
		$("#totalPrice .price").html("$0.00");
	});

	// Cancel entire order
	$(document).on('click', "#cancelOrder", function(event){
		// Uncheck "Add to Order"
		$("#useLastOrder").prop('checked', false);

		// Remove all tacos
		$("#currentOrder .taco").remove();

		// Reset price
		$("#totalOrderPrice .subtitle").html("Total price for 0 tacos: ");
		$("#totalOrderPrice .price").html("$0.00");
	});

    // Parse JSON for Tortilla
    $.ajax({
        url: "js/getTortillas.json",
        success: function(json) {
            for(var i = 0; i < json.tortilla.length; i++) {
                // Create and append new node
                var newDiv = $("<div class='pictureBox'><img src=''><br/><span></span></div>");
                newDiv.insertBefore("#tortillaSelection div.holder");

                // Add information from JSON
                $("#tortillaSelection .pictureBox span").eq(i).html(json.tortilla[i].name);
                var url = "img/tortilla/" + json.tortilla[i].id + ".png";
                $("#tortillaSelection .pictureBox img").eq(i).attr('src', url);

                // Save id
                jQuery.data($("#tortillaSelection .pictureBox span")[i], 'id', json.tortilla[i].id);
            }

            // Add the class to the first option for tortilla 
            $("#tortillaSelection .pictureBox:first-of-type").addClass("selected");
        }
    });

    // Parse JSON for Filling
    $.ajax({
        url: "js/getFillings.json",
        success: function(json) {
            for(var i = 0; i < json.filling.length; i++) {
                // Create and append new node
                var newDiv = $("<div class='pictureBox'><img src=''><br/><span></span></div>");
                newDiv.insertBefore("#fillingSelection div.holder");

                // Add information from JSON
                $("#fillingSelection .pictureBox span").eq(i).html(json.filling[i].name);
                var url = "img/filling/" + json.filling[i].id + ".png";
                $("#fillingSelection .pictureBox img").eq(i).attr('src', url);

                // Save id
                jQuery.data($("#fillingSelection .pictureBox span")[i], 'id', json.filling[i].id);
            }

            // Add the class to the first option for filling 
            $("#fillingSelection .pictureBox:first-of-type").addClass("selected");
        }
    });

    // Parse JSON for Rice
    $.ajax({
        url: "js/getRice.json",
        success: function(json) {
            for(var i = 0; i < json.rice.length; i++) {
                // Create and append new node
                var newOption = $("<option value='"+json.rice[i].id+"'></option>");
                $("#riceSelection .dropdown").append(newOption);

                // Add information from JSON
                $("#riceSelection .dropdown option").eq(i+1).html(json.rice[i].name);
            }
        }
    });

    // Parse JSON for Beans
    $.ajax({
        url: "js/getBeans.json",
        success: function(json) {
            for(var i = 0; i < json.beans.length; i++) {
                // Create and append new node
                var newOption = $("<option value='"+json.beans[i].id+"'></option>");
                $("#beanSelection .dropdown").append(newOption);

                // Add information from JSON
                $("#beanSelection .dropdown option").eq(i+1).html(json.beans[i].name);
            }
        }
    });

    // Parse JSON for Cheese
    $.ajax({
        url: "js/getCheese.json",
        success: function(json) {
            for(var i = 0; i < json.cheese.length; i++) {
                // Create and append new node
                var newOption = $("<option value='"+json.cheese[i].id+"'></option>");
                $("#cheeseSelection .dropdown").append(newOption);

                // Add information from JSON
                $("#cheeseSelection .dropdown option").eq(i+1).html(json.cheese[i].name);
            }
        }
    });

    // Parse JSON for Sauces
    $.ajax({
        url: "js/getSauces.json",
        success: function(json) {
            for(var i = 0; i < json.sauce.length; i++) {
                // Create and append new node
                var newOption = $("<option value='"+json.sauce[i].id+"'></option>");
                $("#sauceSelection .dropdown").append(newOption);

                // Add information from JSON
                $("#sauceSelection .dropdown option").eq(i+1).html(json.sauce[i].name + " (" + json.sauce[i].heatRating + ")");
            }
        }
    });

    // Parse JSON for Vegetables
    $.ajax({
        url: "js/getVegetables.json",
        success: function(json) {
            for(var i = 0; i < json.vegetable.length; i++) {
                // Create and append new node
                var newOption = $("<div class='checking'><input type='checkbox' name='vegetables' id='vegetable"+i+"' value='" + json.vegetable[i].id + "'><label for='vegetable"+i+"' class='smallFont'></label></div>");
                newOption.insertBefore('#vegetableSelection div.center');

                // Add information from JSON
                $("#vegetableSelection .checking label").eq(i).html(json.vegetable[i].name);
            }
        }
    });

    // Parse JSON for Extras
    $.ajax({
        url: "js/getExtras.json",
        success: function(json) {
            for(var i = 0; i < json.extra.length; i++) {
                // Create and append new node
                var newOption = $("<div class='checking'><input type='checkbox' name='extras' id='extra"+i+"' value='" + json.extra[i].id + "'><label for='extra"+i+"' class='smallFont'></label></div>");
                newOption.insertBefore('#extraSelection div.center');

                // Add information from JSON
                $("#extraSelection .checking label").eq(i).html(json.extra[i].name);
            }
        }
    });

    // Parse JSON for Previous Order
    $.ajax({
        url: "js/getPreviousOrder.json",
        success: function(json) {
            for(var i = 0; i < json.previousOrder.length; i++) {
                var taco = json.previousOrder[i];

                // Create a taco
                var newTaco = $('<div class=taco>'+'<div class="tacoItem tortilla"><img src="img/tortilla/' + taco.toppings[1].topping_id + '.png">'+
                                '<span class="smallFont">' + taco.toppings[1].topping_name + '</span></div>' +
                                '<div class="tacoItem filling"><img src="img/filling/' + taco.toppings[0].topping_id + '.png">'+
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
                        newTopping = $('<div class="tacoItem"><img src="img/vegetable.png"><span class="smallFont">' + taco.toppings[j].topping_name + '</span></div>');
                        newTopping.insertBefore("#previousOrder div.tacoQuantity");
                        price += taco.toppings[j].topping_price;
                    }
                    else if(taco.toppings[j].topping_type === "extra") {
                        newTopping = $('<div class="tacoItem"><img src="img/extra.png"><span class="smallFont">' + taco.toppings[j].topping_name + '</span></div>');
                        newTopping.insertBefore("#previousOrder div.tacoQuantity");
                        price += taco.toppings[j].topping_price;
                    }
                    else {
                        newTopping = $('<div class="tacoItem"><img src="img/' + taco.toppings[j].topping_type + '/' + taco.toppings[j].topping_id + 
                                        '.png"><span class="smallFont">' + taco.toppings[j].topping_name + '</span></div>');
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
            }
        }
    });

    
});

function updateTotalPrice() {
    // Determine if the total price should include items in previous order.
    var quantitySelector = ".taco .tacoQuantity input[name='quantity']";
    var priceSelector = ".taco .tacoPrice";
    if (!$('#useLastOrder').is(":checked")) {
        quantitySelector = "#currentOrder " + quantitySelector;
        priceSelector = "#currentOrder " + priceSelector;
    }

    // Get arrays of elements with quantities and prices.
    var quantities = $(quantitySelector);
    var prices = $(priceSelector);

    // Loop through each taco and accumulate the total tacos/price.
    var totalTacos = 0;
    var total = 0;
    for (var i = 0; i < quantities.length; i++) {
        // Get the quantity of a taco.
        var quantity = Number(quantities.eq(i).val());
        // Get the price of a taco and convert it to a number.
        var price = prices.eq(i).html();
        price = Number(price.replace(/[^0-9\.]+/g,""));
        // Update the total using the quantity and price.
        totalTacos += quantity;
        total += quantity * price;
    }

    // Replace the total price with the updated price.
    $("#totalOrderPrice .subtitle").html("Total price for " + totalTacos + " tacos:");
    $("#totalOrderPrice .price").html("$" + total.toFixed(2));

    // Replace the total price with the updated price.
    $("#paymentWindowPrice").html("Total price for " + totalTacos + " tacos: $" + total.toFixed(2));
}