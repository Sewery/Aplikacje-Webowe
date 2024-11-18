let startButton = document.getElementById("start");
let stopButton = document.getElementById("stop");
let resetButton = document.getElementById("reset");

let currMinutes = 0;
let currSeconds = 0;
let timerVariable;
let timeMinutes = document.getElementById("time-minutes");
let timeSeconds = document.getElementById("time-seconds");
startButton.onclick = function () {
  window.clearInterval(timerVariable);
  timerVariable = window.setInterval(startTimer, 1000);
};
stopButton.onclick = function () {
  window.clearInterval(timerVariable);
};
resetButton.onclick = function () {
  window.clearInterval(timerVariable);
  currSeconds = "0s";
  currMinutes = "";
  timeMinutes.innerHTML = currMinutes;
  timeSeconds.innerHTML = currSeconds;
};
function startTimer() {
  currSeconds++;
  if (currSeconds >= 60) {
    currSeconds = 0;
    currMinutes++;
  }
  if (currMinutes >= 1) timeMinutes.innerHTML = currMinutes + "min ";
  timeSeconds.innerHTML = currSeconds + "s";
}
