$(function () {
    // creates function to save text entered by user
    $(".saveBtn").on("click", function () {
        let timeElement = $(this).parent().children("div");
        let textAreaElement = $(this).parent().children("textarea");

        localStorage.setItem(timeElement.text(), textAreaElement.val());
    });

    // function to apply either present, past, and future to time-block based on the time
    $(".time-block div").each(function () {
        let parentElement = $(this).parent();
        let elementTime = $(this).text().split(" ");
        let currentTime = parseInt(dayjs().format("H"));
        let elementTimeAsNumber = parseInt(elementTime[0]);
        if (elementTime[1] == "PM") {
            elementTimeAsNumber += 12;
        }

        if (elementTimeAsNumber == currentTime) {
            parentElement.addClass("present");
            parentElement.removeClass("past");
            parentElement.removeClass("future");
        }
        else if (elementTimeAsNumber > currentTime) {
            parentElement.removeClass("present");
            parentElement.removeClass("past");
            parentElement.addClass("future");
        }
        else {
            parentElement.removeClass("present");
            parentElement.addClass("past");
            parentElement.removeClass("future");
        }
    });

    // displays the user input if it was saved in local storage
    $(".time-block textarea").each(function () {
        let timeElement = $(this).parent().children("div");
        let userInput = localStorage.getItem(timeElement.text());

        if (userInput !== null) {
            $(this).val(userInput);
        }
    })


    // display the current date in the header of the page
    function displayCurrentTime() {
        const currentDay = dayjs();
        const formattedDate = currentDay.format("dddd, MMMM D, YYYY");
        $("#currentDay").text(formattedDate);
    }

    displayCurrentTime();
});
