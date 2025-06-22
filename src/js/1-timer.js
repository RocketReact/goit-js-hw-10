import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('button[data-start]');
let userSelectedDate = '';
const options = {
  enableTime: true,
  time_24hr: true,
  dateFormat: 'Y-m-d H:i',
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0].getTime();
    const now = Date.now();
    if (userSelectedDate < now) {
      iziToast.error({
        message: 'Please choose a date in the future',
        timeout: 4000,
        position: 'topRight',
        close: true,
        backgroundColor: 'rgba(244,63,63,0.77)',
        messageColor: 'white',
        class: 'my-toast',
        rtl: true,
      });
    }
    userSelectedDate < now
      ? (startBtn.disabled = true)
      : (startBtn.disabled = false);
  },
};

const input = document.querySelector('#datetime-picker');
flatpickr(input, options);

const convertMs = ms => {
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
};

startBtn.addEventListener('click', () => {
  const userChoosingData = convertMs(userSelectedDate - new Date().getTime());

  function updateTimer() {
    Object.entries(userChoosingData).forEach(([key, value]) => {
      const element = document.querySelector(`[data-${key}]`);
      if (element) {
        element.textContent = String(value).padStart(2, '0');
      }
    });
  }

  ///////////////// Interval/////////////////

  setInterval(() => {
    console.log(userChoosingData);
    if (userChoosingData.seconds > 0) {
      userChoosingData.seconds--;
    } else if (userChoosingData.minutes > 0) {
      userChoosingData.seconds = 59;
      userChoosingData.minutes--;
    } else if (userChoosingData.hours > 0) {
      userChoosingData.minutes = 59;
      userChoosingData.hours--;
    } else if (userChoosingData.days > 0) {
      userChoosingData.hours = 59;
      userChoosingData.days--;
    }

    updateTimer(userChoosingData);
  }, 1000);
});
