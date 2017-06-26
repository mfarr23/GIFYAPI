$(document).ready(function() {

  // Initial array of athletes
      var athletes = ["Usain Bolt", "Vince Carter", "Lebron James", "Christiano Ronaldo"];

// how the info will be displayed
// call API and spit out data onto page

function displayAthleteInfo() {
      // Grabbing and storing the data-athlete property value from the button
      var athlete = $(this).attr("data-name");

      console.log(this);
      // Constructing a queryURL using the athlete name
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        athlete + "&api_key=77b907aff3e64d0c9c6363e3c6e72aee&limit=10";

      // Perfoming an AJAX GET request to our queryURL
      $.ajax({
        url: queryURL,
        method: "GET"
      })

      // After the data from the AJAX request comes back
      .done(function(response) {
        console.log(queryURL);
        console.log(response);

      // storing the data from the AJAX request in the results variable
      var results = response.data;
 
    // Looping through each result item
    for (var i = 0; i < results.length; i++) {

      // Creating and storing a div tag
      var athleteDiv = $("<div>");

      // Creating a paragraph tag with the result item's rating
      var p = $("<p>").text("Rating: " + results[i].rating);
        
      // Creating and storing an image tag
      var athleteImage = $("<img>");

      // Setting the src attribute of the image to a property pulled off the result item
      athleteImage.attr("src", results[i].images.fixed_height_still.url);

      // Appending the paragraph and image tag to the athleteDiv
      athleteDiv.append(p);
      athleteDiv.append(athleteImage);

      // setting state of image and url's for still image and animated image
      athleteImage.attr("data-still", results[i].images.fixed_height_still.url);
      athleteImage.attr("data-animate", results[i].images.fixed_height.url);
      athleteImage.attr("data-state", "still");
      athleteImage.attr("class", "gif")

      // Prepending the athleteImage to the images div
      $("#gifs-appear-here").prepend(athleteDiv);
        } 
      })
    };

// Function for creating athlete buttons
      function renderButtons() {

        // Deleting the athletes prior to adding new athletes
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of athletes
        for (var i = 0; i < athletes.length; i++) {

          // Then dynamicaly generating buttons for each athlete in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of athlete to our button
          a.addClass("athlete");
          // Adding a data-attribute
          a.attr("data-name", athletes[i]);
          // Providing the initial button text
          a.text(athletes[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      };

      // This function handles events where a athlete button is clicked
      $("#add-athlete").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var athleteInput = $("#athlete-input").val().trim();

        // Adding athlete from the textbox to our array
        athletes.push(athleteInput);

        // Calling renderButtons which handles the processing of our athlete array
        renderButtons();
      });

    $(document.body).on("click", ".gif", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
      });

    // Adding a click event listener to all elements with a class of "athlete"
    $(document).on("click", ".athlete", displayAthleteInfo);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();
    
    });














