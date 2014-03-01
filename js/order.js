$(document).ready(function(){
	// Adds/removes selected box around tortilla on click
	$("#tortillaSelection .pictureBox").click(function(event){
		$("#tortillaSelection .pictureBox[class~='selected']").removeClass("selected");
		$(this).addClass("selected");
	})

	// Adds/removes selected box around filling on click
	$("#fillingSelection .pictureBox").click(function(event){
		$("#fillingSelection .pictureBox[class~='selected']").removeClass("selected");
		$(this).addClass("selected");
	})

	// Select/deselect all vegetables
	$("#selectAllVegetables").click(function(event){
		if($("#selectAllVegetables").html() === "Select All"){
			$("#vegetableSelection input[type='checkbox']").prop('checked', true);
			$("#selectAllVegetables").html("Deselect All");
		}
		else {
			$("#vegetableSelection input[type='checkbox']").prop('checked', false);
			$("#selectAllVegetables").html("Select All");
		}
	})

	// Select/deselect all extras
	$("#selectAllExtras").click(function(event){
		if($("#selectAllExtras").html() === "Select All"){
			$("#extraSelection input[type='checkbox']").prop('checked', true);
			$("#selectAllExtras").html("Deselect All");
		}
		else {
			$("#extraSelection input[type='checkbox']").prop('checked', false);
			$("#selectAllExtras").html("Select All");
		}
	})
});