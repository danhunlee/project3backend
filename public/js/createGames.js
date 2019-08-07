$(document).ready(function() {
  // Getting jQuery references to the gameEvent body, title, form, and user select
  var gameDescript = $("#gameDescript");
  var gameTitleInput = $("#gameTitle");
  var createGamesForm = $("#createGames");
  var userSelect = $("#user");
  // Adding an event listener for when the form is submitted
  $(createGamesForm).on("submit", handleFormSubmit);
  // Gets the part of the url that comes after the "?" (which we have if we're updating a gameEvent)
  var url = window.location.search;
  var gameEventId;
  var userId;
  // Sets a flag for whether or not we're updating a gameEvent to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the gameEvent id from the url
  // In '?gameEvent_id=1', gameEventId is 1
  if (url.indexOf("?gameEvent_id=") !== -1) {
    gameEventId = url.split("=")[1];
    getGameEventData(gameEventId, "gameEvent");
  }
  // Otherwise if we have an user_id in our url, preset the user select box to be our user
  else if (url.indexOf("?user_id=") !== -1) {
    userId = url.split("=")[1];
  }

  // Getting the users, and their gameEvents
  getUsers();

  // A function for handling what happens when the form to create a new gameEvent is submitted
  function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the gameEvent if we are missing a body, gameTitle, or user
    if (!gameTitleInput.val().trim() || !gameDescript.val().trim() || !userSelect.val()) {
      return;
    }
    // Constructing a newGameEvent object to hand to the database
    var newGameEvent = {
      gameTitle: gameTitleInput.val().trim(),
      gameDescript: gameDescript.val().trim(),
      UserId: userSelect.val()
    };

    // If we're updating a gameEvent run updateGameEvent to update a gameEvent
    // Otherwise run submitGameEvent to create a whole new gameEvent
    if (updating) {
      newGameEvent.id = gameEventId;
      updateGameEvent(newGameEvent);
    }
    else {
      submitGameEvent(newGameEvent);
    }
  }

  // Submits a new gameEvent and brings user to games page upon completion
  function submitGameEvent(gameEvent) {
    $.post("/api/gameEvents", gameEvent, function() {
      window.location.href = "/games";
    });
  }

  // Gets gameEvent data for the current gameEvent if we're editing, or if we're adding to an user's existing gameEvents
  function getGameEventData(id, type) {
    var queryUrl;
    switch (type) {
    case "gameEvent":
      queryUrl = "/api/gameEvents/" + id;
      break;
    case "user":
      queryUrl = "/api/users/" + id;
      break;
    default:
      return;
    }
    $.get(queryUrl, function(data) {
      if (data) {
        console.log(data.UserId || data.id);
        // If this gameEvent exists, prefill our createGames forms with its data
        gameTitleInput.val(data.gameTitle);
        gameDescript.val(data.gameDescript);
        userId = data.UserId || data.id;
        // If we have a gameEvent with this id, set a flag for us to know to update the gameEvent
        // when we hit submit
        updating = true;
      }
    });
  }

  // A function to get user and then render our list of user
  function getUsers() {
    $.get("/api/users", renderUserList);
  }
  // Function to either render a list of user, or if there are none, direct the user to the page
  // to create an user first
  function renderUserList(data) {
    if (!data.length) {
      window.location.href = "/users";
    }
    $(".hidden").removeClass("hidden");
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createUserRow(data[i]));
    }
    userSelect.empty();
    console.log(rowsToAdd);
    console.log(userSelect);
    userSelect.append(rowsToAdd);
    userSelect.val(userId);
  }

  // Creates the user options in the dropdown
  function createUserRow(user) {
    var listOption = $("<option>");
    listOption.attr("value", user.id);
    listOption.text(user.name);
    return listOption;
  }

  // Update a given gameEvent, bring user to the games page when done
  function updateGameEvent(post) {
    $.ajax({
      method: "PUT",
      url: "/api/gameEvents",
      data: post
    })
      .then(function() {
        window.location.href = "/games";
      });
  }
});
