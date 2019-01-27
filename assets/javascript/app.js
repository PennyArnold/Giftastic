var reactions = ["happy", "frustrated", "mic drop", "success"];

      // displayReactionInfo function re-renders the HTML to display the appropriate content
      function displayReactionInfo() {

        var reaction = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + reaction + "&api_key=EpzDHjowuhbQ6mB0p2AlEEIfIM3c0XDF";

        // Creates AJAX call for the specific reaction button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          console.log(response);
          // Creates a div to hold the reaction
       
          for (var i=0;i<10;i++)
          {
            var new_Reaction= $("<div>");
            new_Reaction.addClass("newReaction");

            var reactionRat= $("<h6>");

            console.log(JSON.stringify(response.data[i].rating));
            reactionRat.text("Rating :" + response.data[i].rating);
        

            var reactionImg = $("<img>");
            reactionImg.addClass("imgReaction");
            console.log(response.data[i].images.fixed_width.url);
            reactionImg.attr("src", response.data[i].images.fixed_width_still.url);
            reactionImg.attr("data-still-url",response.data[i].images.fixed_width_still.url);
            reactionImg.attr("data-animated-url",response.data[i].images.fixed_width.url);

            new_Reaction.append(reactionRat);  
            new_Reaction.append(reactionImg);
            $("#gifArea").prepend(new_Reaction);
            }
          });
        }

      // Function for displaying reactions data
      function renderButtons() {

        // Deletes the reactions prior to adding new reactions
        // (this is necessary otherwise you will have repeat buttons)
        $("#myButtons").empty();
        $("#reactionInput").val("");
        // Loops through the array of reactions
        for (var i = 0; i < reactions.length; i++) {

          // Then dynamicaly generates buttons for each reaction in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adds a class of reaction to our button
          a.addClass("reaction btn btn-gradient-light border border-dark m-2");
          // Added a data-attribute
          a.attr("data-name", reactions[i]);
          
          // Provided the initial button text
          a.text(reactions[i]);
          // Added the button to the buttons-view div
          $("#myButtons").append(a);
        }
      }

      // This function handles events where the add reaction button is clicked
      $("#addReaction").on("click", function(event) {
        //tells the user agent that if the event does not get explicitly handled, its default action should not be taken as it normally would be.
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var reaction = $("#reactionInput").val().trim();

        // Pushes the react.ion from the textbox into the array
        reactions.push(reaction);

        // Calling renderButtons which handles the processing of our reactions array
        renderButtons();
      });

      // Adding click event listeners to all elements with a class of "reaction"
      $(document).on("click", ".reaction", displayReactionInfo);
      $(document).on("click", ".imgReaction", startStopGif);
      // Calling the renderButtons function to display the intial buttons
      renderButtons();

      function startStopGif()
      {
           if ($(this).attr("src")===$(this).attr("data-still-url"))
           {
            $(this).attr("src",$(this).attr("data-animated-url"))
           }else if ($(this).attr("src")===$(this).attr("data-animated-url"))
           {
            $(this).attr("src",$(this).attr("data-still-url"))
           }
      }
