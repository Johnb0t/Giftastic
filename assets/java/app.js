//Array of preset cars for buttons
		var carArray = ["Toyota Supra", "Ferrari Enzo", "Nissan 240SX", "Nissan GTR", "Audi R8", "R32 Skyline", "Subaru BRZ", "Acura NSX", "Volkswagen GTI"];
		
		
	    function displayGifs() {

        	var car = $(this).attr("data-name");    
			var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
	        		car + "&api_key=dc6zaTOxFJmzC&limit=10";

	     	$.ajax({
				url: queryURL,
				method: "GET"
				})
				.done(function(response){
					console.log(response)
					var results = response.data
					for(i = 0; i < results.length; i++) {
						var rate = results[i].rating;
						var upperRate = rate.toUpperCase();
						var carDiv = $("<div>");
        				var p = $("<h3>").text("Rating: " + upperRate);
        				var carStill = results[i].images.fixed_width_still.url;
        				var carAnimate = results[i].images.fixed_width.url;

        				var carGif = $("<img>").attr("src", carStill).attr("data-still", carStill).attr("data-animate", carAnimate).attr("data-state", "still").attr("class", "gif");

        				carDiv.append(p);
        				// debugger;
        				carDiv.append(carGif);
        				// debugger;
        				$("#gifs").prepend(carDiv);

        				
          			}
          			$(".gif").on("click", function() {
							var state = $(this).attr("data-state");
							if (state == "still") {
					        	$(this).attr("src", $(this).data("animate"));
					        	$(this).attr("data-state", "animate");
					      	};
					      	if (state !== "still") {
					        	$(this).attr("src", $(this).data("still"));
					        	$(this).attr("data-state", "still");
					      	};
						});
				});
			}	

		$("#gifs").empty();	

		function renderButtons() {
			$("#presetButtons").empty();

			for (var i = 0; i < carArray.length; i++) {

          	var btn = $("<button>");
          
          	btn.addClass("car");
          
          	btn.attr("data-name", carArray[i]);
          
          	btn.text(carArray[i]);
          
          	$("#presetButtons").append(btn);
		}
	};

	$(document).on("click", ".car", displayGifs);

	$("#add-car").on("click", function(event) {

        event.preventDefault();

        // Write code to grab the text the user types into the input field
        var gifValue = $('#car-input').val();
        // Write code to add the new movie into the movies array
        carArray.push(gifValue);
        // The renderButtons function is called, rendering the list of movie buttons
        renderButtons();
        $('#car-input').val("");
      });

	renderButtons();
	$(".gif").on("click", function() {
		var state = $(this).attr("data-state");
			if (state == "still") {
				$(this).attr("src", $(this).data("animate"));
	        	$(this).attr("data-state", "animate");		    
	        };
	      	if (state !== "still") {
	        	$(this).attr("src", $(this).data("still"));
	        	$(this).attr("data-state", "still");
			};
		});