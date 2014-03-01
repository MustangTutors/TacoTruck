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
                var newOption = $("<option value='"+json.rice[i].name+"'></option>");
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
                var newOption = $("<option value='"+json.beans[i].name+"'></option>");
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
                var newOption = $("<option value='"+json.cheese[i].name+"'></option>");
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
                var newOption = $("<option value='"+json.sauce[i].name+"'></option>");
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
                var newOption = $("<div class='checking'><input type='checkbox' name='vegetables' id='vegetable"+i+"' value='" + json.vegetable[i].name + "'><label for='vegetable"+i+"' class='smallFont'></label></div>");
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
                var newOption = $("<div class='checking'><input type='checkbox' name='extras' id='extra"+i+"' value='" + json.extra[i].name + "'><label for='extra"+i+"' class='smallFont'></label></div>");
                newOption.insertBefore('#extraSelection div.center');

                // Add information from JSON
                $("#extraSelection .checking label").eq(i).html(json.extra[i].name);
            }
        }
    });
});

  