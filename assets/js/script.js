// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// TODO: Add a listener for click events on the save button. This code should
// use the id in the containing time-block as a key to save the user input in
// local storage. HINT: What does `this` reference in the click listener
// function? How can DOM traversal be used to get the "hour-x" id of the
// time-block containing the button that was clicked? How might the id be
// useful when saving the description in local storage?

$(function () {
    // TODO: Add a listener for click events on the save button.
    $(".saveBtn").on("click", function () {
        // Get the user input from the textarea.
        var userInput = $(this).siblings(".description").val();
        console.log("User input:", userInput);

        // Get the id of the corresponding time-block.
        var timeBlockId = $(this).parent().attr("id");
        console.log("Time block ID:", timeBlockId);

        // Save the user input in local storage using the time-block id as the key.
        localStorage.setItem(timeBlockId, userInput);
        console.log("User input saved in local storage.");
    });

    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?

    function updateHourStyles() {
        var currentHour = dayjs().hour();
        console.log("Current hour:", currentHour);

        $(".time-block").each(function () {
            var timeBlockHour = parseInt($(this).attr("id").split("-")[1]);
            console.log("Time block hour:", timeBlockHour);

            if (timeBlockHour < currentHour) {
                $(this).removeClass("present future").addClass("past");
                console.log("Time block is in the past.");
            } else if (timeBlockHour === currentHour) {
                $(this).removeClass("past future").addClass("present");
                console.log("Time block is in the present.");
            } else {
                $(this).removeClass("past present").addClass("future");
                console.log("Time block is in the future.");
            }
        });
    }

    updateHourStyles();

    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?

    $(".time-block").each(function () {
        var timeBlockId = $(this).attr("id");
        console.log("Getting user input for time block ID:", timeBlockId);

        var userInput = localStorage.getItem(timeBlockId);
        console.log("Retrieved user input:", userInput);

        $(this).find(".description").val(userInput);
    });

    // TODO: Add code to display the current date in the header of the page.

    var currentDate = dayjs().format("dddd, MMMM D");
    console.log("Current date:", currentDate);
    $("#currentDay").text(currentDate);
});
