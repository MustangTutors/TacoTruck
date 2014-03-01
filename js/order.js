$(document).ready(function(){
	// Adds/removes selected box around tortilla on click
	$("#tortillaSelection .pictureBox").click(function(event){
		// Remove the class from the previous selection
		$("#tortillaSelection .pictureBox[class~='selected']").removeClass("selected");
		
		// Add the class to the new selection	
		$(this).addClass("selected");
	})

	// Adds/removes selected box around filling on click
	$("#fillingSelection .pictureBox").click(function(event){
		// Remove the class from the previous selection
		$("#fillingSelection .pictureBox[class~='selected']").removeClass("selected");
		
		// Add the class to the new selection
		$(this).addClass("selected");
	})

	// Select/deselect all vegetables
	$("#selectAllVegetables").click(function(event){
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
	})

	// Select/deselect all extras
	$("#selectAllExtras").click(function(event){
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
	})

	// Cancel taco and clear all selections
	$("#cancelTaco").click(function(event){
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
	})

	// Cancel entire order
	$("#cancelOrder").click(function(event){
		// Uncheck "Add to Order"
		$("#useLastOrder").prop('checked', false);

		// Remove all tacos
		$("#currentOrder .taco").remove();

		// Reset price
		$("#totalOrderPrice .subtitle").html("Total price for 0 tacos: ");
		$("#totalOrderPrice .price").html("$0.00");
	})
});