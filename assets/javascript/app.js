$(document).ready(function() {

var topics = ["dogs", "cats", "animals", "Game of Thrones", "The Leftovers", "Rick and Morty", "Stepbrothers", "LeBron James", "Javale McGee"];

function displayTopicButtons(){
    $("#topicButtonsView").empty();

    for(var i = 0; i < topics.length; i++) {
        var topicButton = $("<button>");
        topicButton.addClass("topic");
        topicButton.addClass("btn btn-primary");
        topicButton.attr("data-name", topics[i]);
        topicButton.text(topics[i]);
        $("#topicButtonsView").append(topicButton);
    };
};

function addNewButton(){
    $("#addTopic").on("click", function() {
        var topic = $("#topic-input").val().trim();
        topics.push(topic);
        displayTopicButtons();
        return false;
    });
};

function displayTopics(){
    var x = $(this).data("search");
    console.log(x);
    
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=JYrjJYK2oiCfHfbOI3FpNJffeDuGeFBj&limit=10";
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        var results = response.data;
        console.log(results);
        $("#topicsView").empty();

        if(results === "") {
            alert("There isn't a topic for this selected button");
        };

        for(var i = 0; i < results.length; i++) {
            var showDiv = $("<div class='col-md-3 GIF'>");
            showDiv.attr = ("margin", "5px");

        	var rating = results[i].rating;
        	var defaultAnimatedSrc = results[i].images.fixed_height.url;
        	var staticSrc = results[i].images.fixed_height_still.url;
        	var showImage = $("<img>");
        	var p = $("<p>").text("");

        	showImage.attr("src", staticSrc);
        	showImage.addClass("image");
        	showImage.attr("data-state", "still");
        	showImage.attr("data-still", staticSrc);
        	showImage.attr("data-animate", defaultAnimatedSrc);
        	showDiv.append(p);
        	showDiv.append(showImage);

            $("#topicsView").prepend(showDiv);
        }
    });
}

$("#addTopic").on("click", function(event) {
    event.preventDefault();
    var newShow = $("#topic-input").val().trim();
    topics.push(newShow);
    console.log(topics);
    $("#topic-input").val('');
    displayTopicButtons();
  });


displayTopicButtons();
addNewButton();
displayTopics();

$(document).on("open", ".action", displayTopics);
$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});

});