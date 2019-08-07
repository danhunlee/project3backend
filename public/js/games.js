$(document).ready(function() {
  /* global moment */

  // gamesContainer holds all of our gameEvents
  var gamesContainer = $(".games-container");
  var gameEventCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handleGameEventDelete);
  $(document).on("click", "button.edit", handleGameEventEdit);
  // Variable to hold our gameEvents
  var gameEvents;

  // The code below handles the case where we want to get games gameEvents for a specific user
  // Looks for a query param in the url for user_id
  var url = window.location.search;
  var userId;
  if (url.indexOf("?user_id=") !== -1) {
    userId = url.split("=")[1];
    getGameEvents(userId);
  }
  // If there's no userId we just get all gameEvents as usual
  else {
    getGameEvents();
  }


  // This function grabs gameEvents from the database and updates the view
  function getGameEvents(user) {
    userId = user || "";
    if (userId) {
      userId = "/?user_id=" + userId;
    }
    $.get("/api/gameEvents" + userId, function(data) {
      console.log("gameEvents", data);
      gameEvents = data;
      if (!gameEvents || !gameEvents.length) {
        displayEmpty(user);
      }
      else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete gameEvents
  function deleteGameEvent(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/gameEvents/" + id
    })
      .then(function() {
        getGameEvents(gameEventCategorySelect.val());
      });
  }

  // InitializeRows handles appending all of our constructed gameEvent HTML inside gamesContainer
  function initializeRows() {
    gamesContainer.empty();
    var gameEventsToAdd = [];
    for (var i = 0; i < gameEvents.length; i++) {
      gameEventsToAdd.push(createNewRow(gameEvents[i]));
    }
    gamesContainer.append(gameEventsToAdd);
  }

  // This function constructs a gameEvent's HTML
  function createNewRow(gameEvent) {
    var formattedDate = new Date(gameEvent.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    var newGameEventCard = $("<div>");
    newGameEventCard.addClass("card");
    var newGameEventCardHeading = $("<div>");
    newGameEventCardHeading.addClass("card-header");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-info");
    var newGameEventGameTitle = $("<h2>");
    var newGameEventDate = $("<small>");
    var newGameEventUser = $("<h5>");
    newGameEventUser.text("Written by: " + gameEvent.User.name);
    newGameEventUser.css({
      float: "right",
      color: "blue",
      "margin-top":
      "-10px"
    });
    var newGameEventCardBody = $("<div>");
    newGameEventCardBody.addClass("card-body");
    var newGameEventBody = $("<p>");
    newGameEventGameTitle.text(gameEvent.gameTitle + " ");
    newGameEventBody.text(gameEvent.gameDescript);
    newGameEventDate.text(formattedDate);
    newGameEventGameTitle.append(newGameEventDate);
    newGameEventCardHeading.append(deleteBtn);
    newGameEventCardHeading.append(editBtn);
    newGameEventCardHeading.append(newGameEventGameTitle);
    newGameEventCardHeading.append(newGameEventUser);
    newGameEventCardBody.append(newGameEventBody);
    newGameEventCard.append(newGameEventCardHeading);
    newGameEventCard.append(newGameEventCardBody);
    newGameEventCard.data("gameEvent", gameEvent);
    return newGameEventCard;
  }

  // This function figures out which gameEvent we want to delete and then calls deleteGameEvent
  function handleGameEventDelete() {
    var currentGameEvent = $(this)
      .parent()
      .parent()
      .data("gameEvent");
    deleteGameEvent(currentGameEvent.id);
  }

  // This function figures out which gameEvent we want to edit and takes it to the appropriate url
  function handleGameEventEdit() {
    var currentGameEvent = $(this)
      .parent()
      .parent()
      .data("gameEvent");
    window.location.href = "/createGames?gameEvent_id=" + currentGameEvent.id;
  }

  // This function displays a message when there are no gameEvents
  function displayEmpty(id) {
    var query = window.location.search;
    var partial = "";
    if (id) {
      partial = " for User #" + id;
    }
    gamesContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No gameEvents yet" + partial + ", navigate <a href='/createGames" + query +
    "'>here</a> in order to get started.");
    gamesContainer.append(messageH2);
  }

});
