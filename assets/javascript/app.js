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
    var topic = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=JYrjJYK2oiCfHfbOI3FpNJffeDuGeFBj&limit=10";
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        console.log(response);
        $("#topicsView").empty();
        var results = response.data;

        if(results === "") {
            alert("There isn't a topic for this selected button");
        };

        for(var i = 0; i < results.length; i++) {
            var topicDiv = $("<div>");
            topicDiv.addClass("topicDiv");

            var topicImage = $("<img>");
            topicImage.attr("src", results[i].images.fixed_height_small_still.url);
            topicImage.attr("data-still",results[i].images.fixed_height_small_still.url);
            topicImage.attr("data-animate",results[i].images.fixed_height_small.url);
            topicImage.attr("data-state", "still");
            topicImage.addClass("image");
            topicDiv.append(topicImage);

            $("#topicsView").prepend(topicDiv);
        }
    });
}

displayTopicButtons();
addNewButton();

$(document).on("click", ".action", displayTopics);
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