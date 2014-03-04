$(document).ready(function(){
	// Adds/removes selected box around tortilla on click
	$(document).on('click', "#tortillaSelection .pictureBox", function(event){
		// Remove the class from the previous selection
		$("#tortillaSelection .pictureBox[class~='selected']").removeClass("selected");
		
		// Add the class to the new selection	
		$(this).addClass("selected");

        // Update price
        updateTacoPrice();
	});

	// Adds/removes selected box around filling on click
	$(document).on('click', "#fillingSelection .pictureBox", function(event){
		// Remove the class from the previous selection
		$("#fillingSelection .pictureBox[class~='selected']").removeClass("selected");
		
		// Add the class to the new selection
		$(this).addClass("selected");

        // Update price
        updateTacoPrice();
	});

    // Picture for rice
    $(document).on('change', "#riceSelection .dropdown", function(event){
        var id = $(this).val();
        var url;
        if (id === "none") {
            url = "img/none.png";
            $("#riceSelection img").css('visibility', 'hidden');
        }
        else {
            url = "img/rice/" + id + ".png";
            $("#riceSelection img").css('visibility', 'visible');
        }
        $("#riceSelection img").attr('src', url);

        // Update price
        updateTacoPrice();
    });

    // Picture for beans
    $(document).on('change', "#beanSelection .dropdown", function(event){
        var id = $(this).val();
        var url;
        if (id === "none") {
            url = "img/none.png";
            $("#beanSelection img").css('visibility', 'hidden');
        }
        else {
            url = "img/beans/" + id + ".png";
            $("#beanSelection img").css('visibility', 'visible');
        }
        $("#beanSelection img").attr('src', url);

        // Update price
        updateTacoPrice();
    });

    // Picture for cheese
    $(document).on('change', "#cheeseSelection .dropdown", function(event){
        var id = $(this).val();
        var url;
        if (id === "none") {
            url = "img/none.png";
            $("#cheeseSelection img").css('visibility', 'hidden');
        }
        else {
            url = "img/cheese/" + id + ".png";
            $("#cheeseSelection img").css('visibility', 'visible');
        }
        $("#cheeseSelection img").attr('src', url);

        // Update price
        updateTacoPrice();
    });

    // Picture for sauce
    $(document).on('change', "#sauceSelection .dropdown", function(event){
        var id = $(this).val();
        var url;
        if (id === "none") {
            url = "img/none.png";
            $("#sauceSelection img").css('visibility', 'hidden');
        }
        else {
            url = "img/sauce/" + id + ".png";
            $("#sauceSelection img").css('visibility', 'visible');
        }
        $("#sauceSelection img").attr('src', url);

        // Update price
        updateTacoPrice();
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

        // Update price
        updateTacoPrice();
	});

    // Select/deselect individual vegetables (price)
    $(document).on('click', "#vegetableSelection input[type='checkbox']", function(event){
        // Update price
        updateTacoPrice();
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

        // Update price
        updateTacoPrice();
	});

    // Select/deselect individual extras (price)
    $(document).on('click', "#extraSelection input[type='checkbox']", function(event){
        // Update price
        updateTacoPrice();
    });

    // Change quantity (price)
    $(document).on('change', '#quantitySelection input[name="quantity"]', function() {
        // Update price
        updateTacoPrice();
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
        if($("#totalOrderPrice .price").html() === "$0.00"){
            alert("Please order some tacos before paying!");
        }
        else {
            $("#payment").show();
            $("#paymentForm").show();
            $("#proceedToLocation").hide();
        }
    });

    // Close the payment window when "Cancel" in the Payment window is clicked
    // Or close when "Close" is pressed
    $(document).on('click', '.close', function() {
        $("#payment").hide();
    });

    $(document).on('submit', '#paymentForm', function(event){
        event.preventDefault();
        cancelOrder();
        $("#payment").show();
        $("#paymentForm").hide();
        $("#proceedToLocation").show();
    });

	// Cancel taco and clear all selections
	$(document).on('click', "#cancelTaco", cancelTaco);

	// Cancel entire order
	$(document).on('click', "#cancelOrder", cancelOrder);

    // Add taco to order
    $(document).on('click', "#addToOrder", function(event) {
        // Create a taco
        // Array of toppings
        var toppings = new Array();

        // Tortilla object, push onto array
        var topping = new Object();
        topping.name = $("#tortillaSelection .pictureBox[class~='selected'] span").html();
        topping.topping_id = jQuery.data($("#tortillaSelection .pictureBox[class~='selected'] span")[0], 'id');
        topping.url = $("#tortillaSelection .pictureBox[class~='selected'] img").attr('src');
        toppings.push(topping);

        // Filling object, push onto array
        topping = new Object();
        topping.name = $("#fillingSelection .pictureBox[class~='selected'] span").html();
        topping.topping_id = jQuery.data($("#fillingSelection .pictureBox[class~='selected'] span")[0], 'id');
        topping.url = $("#fillingSelection .pictureBox[class~='selected'] img").attr('src');
        toppings.push(topping);

        // Rice object, push onto array
        topping = new Object();
        topping.topping_id = $("#riceSelection .dropdown").val();
        // If rice is not none, proceed
        if(topping.topping_id !== "none"){
            topping.name = $("#riceSelection .dropdown option[value='" + topping.id + "']").html();
            topping.url = $("#riceSelection img.toppingPic").attr('src'); 
            toppings.push(topping);
        }

        // Beans object, push onto array
        topping = new Object();
        topping.topping_id = $("#beanSelection .dropdown").val();
        // If beans is not none, proceed
        if(topping.topping_id !== "none"){
            topping.name = $("#beanSelection .dropdown option[value='" + topping.id + "']").html();
            topping.url = $("#beanSelection img.toppingPic").attr('src'); 
            toppings.push(topping);
        }

        // Cheese object, push onto array
        topping = new Object();
        topping.topping_id = $("#cheeseSelection .dropdown").val();
        // If beans is not none, proceed
        if(topping.topping_id !== "none"){
            topping.name = $("#cheeseSelection .dropdown option[value='" + topping.id + "']").html();
            topping.url = $("#cheeseSelection img.toppingPic").attr('src'); 
            toppings.push(topping);
        }

        // Sauce object, push onto array
        topping = new Object();
        topping.topping_id = $("#sauceSelection .dropdown").val();
        // If sauce is not none, proceed
        if(topping.topping_id !== "none"){
            topping.name = $("#sauceSelection .dropdown option[value='" + topping.id + "']").html();
            topping.url = $("#sauceSelection img.toppingPic").attr('src'); 
            toppings.push(topping);
        }

        // Get all selected vegetables
        var veggies = $("#vegetableSelection input[type='checkbox']:checked").parent();
        for(var i = 0; i < veggies.length; i++) {
            // Each vegetable object, push onto array
            topping = new Object();
            topping.name = veggies.eq(i).children("label").html();
            topping.topping_id = veggies.eq(i).children("input").val();
            topping.url = "img/vegetable.png";
            toppings.push(topping);
        }

        // Get all selected extras
        var extras = $("#extraSelection input[type='checkbox']:checked").parent();
        for(var i = 0; i < extras.length; i++) {
            // Each extra object, push onto array
            topping = new Object();
            topping.name = extras.eq(i).children("label").html();
            topping.topping_id = extras.eq(i).children("input").val();
            topping.url = "img/extra.png";
            toppings.push(topping);
        }

        var quantity = $("#quantitySelection input[name='quantity']").val();
        var price = $("div#price article#indivPrice span.price").html();

        var newTaco = $('<div class=taco><button class="button delete">X</button><br/><div class="tacoItem tortilla"><img src="' + 
                        toppings[0].url + '"><span class="smallFont">' + toppings[0].name + '</span></div>' +
                        '<div class="tacoItem filling"><img src="' + toppings[1].url + '">'+
                        '<span class="smallFont">' + toppings[1].name + '</span></div><hr>' +
                        '<div class="tacoQuantity"><span class="tacoLabel">Quantity:</span>'+
                        '<input type="number" value="' + quantity + '" min="1" max="100" name="quantity">' + 
                        '</div><div class="indivTacoPrice"><span class="tacoPrice">' + price + '</span><span class="tacoLabel">/ea</span></div></div>');
        
        $("#currentOrder").append(newTaco);

        // Add topping title
        if(toppings.length > 2) {
            var toppingTitle = $('<span class="tacoLabel">Toppings</span><br/>');
            toppingTitle.insertBefore("#currentOrder .taco:last div.tacoQuantity");
        }

        // Add all toppings
        var newTopping;
        for(var j = 2; j < toppings.length; j++) {
            newTopping = $('<div class="tacoItem"><img src="' + toppings[j].url + '"><span class="smallFont">' + toppings[j].name + '</span></div>');
            newTopping.insertBefore("#currentOrder .taco:last div.tacoQuantity");
        }

        // Add line break
        if(toppings.length > 2) {
            var lineBreak = $('<hr>');
            lineBreak.insertBefore("#currentOrder .taco:last div.tacoQuantity");
        }

        // Update price and cancel current taco
        updateTotalPrice();
        cancelTaco();

        // JSON object stuff
        var tacoObject = new Object();
        tacoObject.quantity = quantity;
        tacoObject.toppings = toppings;
        jQuery.data($("#currentOrder .taco:last")[0], 'taco', JSON.stringify(tacoObject));
    });

    // Parse JSON for Tortilla
    $.ajax({
        url: "js/getTortillas.json",
        success: function(json) {
            for(var i = 0; i < json.tortilla.length; i++) {
                // Create and append new node
                var newDiv = $("<div class='pictureBox'><img src='' alt='tortilla'><br/><span></span></div>");
                newDiv.insertBefore("#tortillaSelection div.holder");

                // Add information from JSON
                $("#tortillaSelection .pictureBox span").eq(i).html(json.tortilla[i].name);
                var url = "img/tortilla/" + json.tortilla[i].id + ".png";
                $("#tortillaSelection .pictureBox img").eq(i).attr('src', url);
                $("#tortillaSelection .pictureBox img").eq(i).attr('alt', 'tortilla');

                // Save id
                jQuery.data($("#tortillaSelection .pictureBox span")[i], 'id', json.tortilla[i].id);
                jQuery.data($("#tortillaSelection .pictureBox span")[i], 'price', json.tortilla[i].price);
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
                var newDiv = $("<div class='pictureBox'><img src='' alt='filling'><br/><span></span></div>");
                newDiv.insertBefore("#fillingSelection div.holder");

                // Add information from JSON
                $("#fillingSelection .pictureBox span").eq(i).html(json.filling[i].name);
                var url = "img/filling/" + json.filling[i].id + ".png";
                $("#fillingSelection .pictureBox img").eq(i).attr('src', url);
                $("#fillingSelection .pictureBox img").eq(i).attr('alt', 'filling');

                // Save id
                jQuery.data($("#fillingSelection .pictureBox span")[i], 'id', json.filling[i].id);
                jQuery.data($("#fillingSelection .pictureBox span")[i], 'price', json.filling[i].price);
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
                var newOption = $("<option value='"+json.rice[i].id+"' price='" + json.rice[i].price + "'></option>");
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
                var newOption = $("<option value='"+json.beans[i].id+"' price='" + json.beans[i].price + "'></option>");
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
                var newOption = $("<option value='"+json.cheese[i].id+"' price='" + json.cheese[i].price + "'></option>");
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
                var newOption = $("<option value='"+json.sauce[i].id+"' price='" + json.sauce[i].price + "'></option>");
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
                var newOption = $("<div class='checking'><input type='checkbox' name='vegetables' id='vegetable"+i+"' value='" + json.vegetable[i].id + "' price='" + json.vegetable[i].price + "'><label for='vegetable"+i+"' class='smallFont'></label></div>");
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
                var newOption = $("<div class='checking'><input type='checkbox' name='extras' id='extra"+i+"' value='" + json.extra[i].id + "' price='" + json.extra[i].price + "'><label for='extra"+i+"' class='smallFont'></label></div>");
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
                jQuery.data($("#previousOrder .taco:last")[0], 'taco', taco);
            }
        }
    });
    
});

// Update price for total order
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

// Update price for each taco
function updateTacoPrice() {
    var price = 0;

    // Add price for tortilla and filling
    price += jQuery.data($("#tortillaSelection .pictureBox[class~='selected'] span")[0], 'price');
    price += jQuery.data($("#fillingSelection .pictureBox[class~='selected'] span")[0], 'price');

    // Add price for dropdown options
    // Rice
    var id = $("#riceSelection .dropdown").val();
    price += Number($("#riceSelection .dropdown option[value='" + id + "']").attr("price"));

    // Beans
    id = $("#beanSelection .dropdown").val();
    price += Number($("#beanSelection .dropdown option[value='" + id + "']").attr("price"));

    // Cheese
    id = $("#cheeseSelection .dropdown").val();
    price += Number($("#cheeseSelection .dropdown option[value='" + id + "']").attr("price"));

    // Sauce
    id = $("#sauceSelection .dropdown").val();
    price += Number($("#sauceSelection .dropdown option[value='" + id + "']").attr("price"));

    // Add price for vegetables and extras
    // Vegetables
    var veggies = $("#vegetableSelection input[type='checkbox']:checked");
    for(var i = 0; i < veggies.length; i++){
        price += Number(veggies.eq(i).attr("price"));
    }

    // Extras
    var extras = $("#extraSelection input[type='checkbox']:checked");
    for(var i = 0; i < extras.length; i++){
        price += Number(extras.eq(i).attr("price"));
    }

    $("div#price article#indivPrice span.price").html("$" + price.toFixed(2));

    var quantity = $("#quantitySelection input[name='quantity']").val();
    price *= quantity;

    $("div#price article#totalPrice span.price").html("$" + price.toFixed(2));
}

function cancelTaco() {
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
    $("#riceSelection img").attr('alt', 'rice');
    $("#beanSelection img").attr('src', 'img/none.png');
    $("#beanSelection img").attr('alt', 'beans');
    $("#cheeseSelection img").attr('src', 'img/none.png');
    $("#cheeseSelection img").attr('alt', 'cheese');
    $("#sauceSelection img").attr('src', 'img/none.png');
    $("#sauceSelection img").attr('alt', 'sauce');

    // Hide pictures
    $("#riceSelection img").css('visibility', 'hidden');
    $("#beanSelection img").css('visibility', 'hidden');
    $("#cheeseSelection img").css('visibility', 'hidden');
    $("#sauceSelection img").css('visibility', 'hidden');

    // Deselect all vegetables
    $("#vegetableSelection input[type='checkbox']").prop('checked', false);
    $("#selectAllVegetables").html("Select All");

    // Deselect all extras
    $("#extraSelection input[type='checkbox']").prop('checked', false);
    $("#selectAllExtras").html("Select All");

    // Reset Quantity
    $("#quantitySelection input[name='quantity']").val(1);

    // Reset Price
    updateTacoPrice();
}

function cancelOrder() {
    // Uncheck "Add to Order"
    $("#useLastOrder").prop('checked', false);

    // Remove all tacos
    $("#currentOrder .taco").remove();

    // Reset price
    updateTotalPrice();
}