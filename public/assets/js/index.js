const $noteTitleOfNote = $(".note-title");
const $noteTextArea = $(".note-textarea");
const $noteSaveButton = $(".save-note");
const $noteCreateNewNoteButton = $(".new-note");
const $noteList = $(".list-container .list-group");

// activeNote is used to keep track of the note in the textarea
const activeNote = {};

// A function to get notes from the db
const getNotes = function() {
  return $.ajax({
    url: "/api/notes",
    method: "GET"
  });
};

// A function for saving note to the db
const saveNote = function(note) {
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST"
  });
};

// // deleting note from the db
// const noteDeleteNote = function(id) {
//   return $.ajax({
//     url: "api/notes/" + id,
//     method: "DELETE"
//   });
// };

// If there is an activeNote, display it, otherwise render empty inputs
const renderActiveNote = function() {
  $noteSaveButton.hide();

  if (activeNote.id) {
    $noteTitleOfNote.attr("readonly", true);
    $noteTextArea.attr("readonly", true);
    $noteTitleOfNote.val(activeNote.title);
    $noteTextArea.val(activeNote.text);
  } else {
    $noteTitleOfNote.attr("readonly", false);
    $noteTextArea.attr("readonly", false);
    $noteTitleOfNote.val("");
    $noteTextArea.val("");
  }
};

// Get the note data from the inputs, save it to the db and update the view
const handleNoteSave = function() {
  const newNote = {
    title: $noteTitleOfNote.val(),
    text: $noteTextArea.val()
  };

  saveNote(newNote).then(function(data) {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// // Delete the clicked note
// const preventClickListenerDeleteNote = function(event) {
//   // prevents the click listener for the list from being called when the button inside of it is clicked
//   event.stopPropagation();

//   const note = $(this)
//     .parent(".list-group-item")
//     .data();

//   if (activeNote.id === note.id) {
//     activeNote = {};
//   }

//   noteDeleteNote(note.id).then(function() {
//     getAndRenderNotes();
//     renderActiveNote();
//   });
// };
//look at this -the delete operator https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete


// Sets the activeNote and displays it
const handleNoteView = function() {
  activeNote = $(this).data();
  renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
const handleNewNoteView = function() {
  activeNote = {};
  renderActiveNote();
};

// If a note's title or text are empty, hide the save button
// Or else show it
const handleRenderSaveBtn = function() {
  if (!$noteTitleOfNote.val().trim() || !$noteTextArea.val().trim()) {
    $noteSaveButton.hide();
  } else {
    $noteSaveButton.show();
  }
};

// Render's the list of note titles
const displayListOfNotes = function(notes) {
  $noteList.empty();

  const noteListItems = [];

  for (const i = 0; i < notes.length; i++) {
    const note = notes[i];

    const $li = $("<li class='list-group-item'>").data(note);
    const $span = $("<span>").text(note.title);
    // const $delBtn = $(
    //   "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
  };

    // $li.append($span, $delBtn);
    // noteListItems.push($li);


  $noteList.append(noteListItems);
};

// Gets notes from the db and renders them to the sidebar
const getAndRenderNotes = function() {
  return getNotes().then(function(data) {
    displayListOfNotes(data);
  });
};

$noteSaveButton.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$noteCreateNewNoteButton.on("click", handleNewNoteView);
// $noteList.on("click", ".delete-note", preventClickListenerDeleteNote);
$noteTitleOfNote.on("keyup", handleRenderSaveBtn);
$noteTextArea.on("keyup", handleRenderSaveBtn);

// Gets and renders the initial list of notes
getAndRenderNotes();
