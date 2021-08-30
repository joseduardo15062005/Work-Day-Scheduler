//Hide the message save localStorage
$("#saveMessage").hide();

//Create the current Day from momentjs
const currentDay = moment();
//Show the current day
$("#currentDay").html(currentDay.format("dddd, MMMM Do YYYY"));

//Validate each hour format
validateHour();

//handler click for buttons inside the time-block class
$(".time-block").on("click", "button", function () {
  var hour = $(this).attr("data-hour");
  const descriptionEl = "#description" + hour;
  const description = $(descriptionEl).val();

  saveStorage(hour, description);
});

//Validate the hour if is past present of futture. and assign value from localStorage
function validateHour() {
  $(".form-control").each(function (index) {
    const hourTimeBlock = $(this).attr("aria-label");
    const dateTimeBlock = moment(hourTimeBlock, "ha");
    const description = localStorage.getItem(hourTimeBlock);

    $(this).val(description);

    if (!currentDay.isBefore(dateTimeBlock, "hour")) {
      if (currentDay.isSame(dateTimeBlock, "hour")) {
        $(this).addClass("present");
      } else {
        $(this).addClass("past");
      }
    } else if (!currentDay.isAfter(dateTimeBlock, "hour")) {
      $(this).addClass("future");
    }
  });
}

//save Information in localStorage
function saveStorage(name, description) {
  showSaveMessage();
  localStorage.setItem(name, description);
}

//Create a timeout to show and hide the save message
function showSaveMessage() {
  $("#saveMessage").show();
  setTimeout(function () {
    $("#saveMessage").hide();
  }, 2000);
}
