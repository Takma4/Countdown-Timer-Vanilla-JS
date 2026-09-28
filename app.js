function resolveEndDate() {
  // How many days until the giveaway ends?
  const giveawayDuration = 9;

  // The time of day after which the giveaway will expire
  const giveawayEndHour = 11;
  const giveawayEndMinute = 30;

  const endDate = new Date();

  // setDate() automatically resolves month/year changes
  endDate.setDate(endDate.getDate() + giveawayDuration);
  endDate.setHours(giveawayEndHour);
  endDate.setMinutes(giveawayEndMinute);
  endDate.setSeconds(0);

  return endDate;
}

function updateDeadline() {
  const now = Date.now();
  // This gives us the remaining time in milliseconds
  const remaining = endDate - now;

  if (remaining < 0) {
    deadline.innerHTML = `<h4 class="expired">This giveaway has expired.</h4>`;
    clearInterval(updateDeadline);

    return;
  }

  // Calculate the total duration in seconds, minutes, hours and days
  const totalSeconds = remaining / 1000;
  const totalMinutes = totalSeconds / 60;
  const totalHours = totalMinutes / 60;
  const days = Math.floor(totalHours / 24);

  // Convert the total durations
  // i.e. if there are more than 59 seconds remaining, that difference will
  // reflect on the minutes, so we keep that value between 0 and 59.

  // We don't need to do this for the days since that is the largest
  // measurement of time here
  const seconds = Math.floor(totalSeconds % 60);
  const minutes = Math.floor(totalMinutes % 60);
  const hours = Math.floor(totalHours % 24);

  // Format the durations so they always use at least 2 characters
  const daysString = formatNumber(days);
  const hoursString = formatNumber(hours);
  const minutesString = formatNumber(minutes);
  const secondsString = formatNumber(seconds);

  // Display the info
  daysLabel.textContent = daysString;
  hoursLabel.textContent = hoursString;
  minutesLabel.textContent = minutesString;
  secondsLabel.textContent = secondsString;
}

// Formats a number into a string that takes a minimum of 2 spaces
// For example: 3 will get converted to '03'
function formatNumber(number) {
  let result = `${number}`;
  if (number < 10) result = `0${number}`;

  return result;
}

// Select elements
const dateHeading = document.querySelector(".date");

const daysLabel = document.getElementById("days");
const hoursLabel = document.getElementById("hours");
const minutesLabel = document.getElementById("minutes");
const secondsLabel = document.getElementById("seconds");

// Used for after the giveaway expiration
const deadline = document.querySelector(".deadline");

// Find the end date, format the string and display on screen
const endDate = resolveEndDate();

let dateString = new Intl.DateTimeFormat("en-US", {
  dateStyle: "full",
  timeStyle: "short",
}).format(endDate);
dateString = dateString.replace("at ", "");

dateHeading.textContent = `Giveaway ends on ${dateString}`;

// Update the deadline on load to display the correct time without
// having to wait for the first interval
window.addEventListener("DOMContentLoaded", updateDeadline);

// Update the deadline every second (1000 ms)
setInterval(updateDeadline, 1000);
