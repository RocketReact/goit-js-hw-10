
import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

const customAlert = document.querySelector("#custom-alert");
const buttonCustomAlert = document.querySelector("#close-alert");



let alertTimeout
buttonCustomAlert.addEventListener("click", () => {
  customAlert.classList.add("hidden")

  if (alertTimeout) {
    clearTimeout(alertTimeout)
    alertTimeout = null
  }
});

function openAlert() {
  if (alertTimeout) {
    clearTimeout(alertTimeout);
  }
  customAlert.classList.remove("hidden");
  alertTimeout =  setTimeout(() => {
    customAlert.classList.add("hidden");  alertTimeout=null}, 5000);
}
const startBtn = document.querySelector("button[data-start]");
let userSelectedDate = '';
const options = {
  enableTime: true,
  time_24hr: true,
  dateFormat: "Y-m-d H:i",
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates;
    const selected = selectedDates[0];
    const now = Date.now();
    if (selected < now) {
      openAlert();
    }
    selected < now? startBtn.disabled = true : startBtn.disabled=false;
  }
};



const input = document.querySelector("#datetime-picker");
flatpickr(input, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}




