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
});