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

//TODO === Convert milliseconds to object vs days, hours, minutes, seconds
const convertMs = ms => {
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

let interval = null;

//TODO === Btn listener 'click' => Start Interval
startBtn.addEventListener('click', () => {
  if (interval) {
    clearInterval(interval);
  }
  startBtn.disabled = true;

  //TODO === Clear interval if time left === 0 => update new value in HTML
  function updateTimer() {
    const currentTime = Date.now();
    const timeDifference = userSelectedDate - currentTime;

    //TODO === If interval ended => clear interval => show '00' => and success message
    if (timeDifference <= 0) {
      clearInterval(interval);
      interval = null;
      startBtn.disabled = false;

      ['days', 'hours', 'minutes', 'seconds'].forEach(key => {
        const element = document.querySelector(`[data-${key}]`);
        if (element) {
          element.textContent = '00';
        }
      });
      iziToast.success({
        message: 'Countdown finished!',
        timeout: 4000,
        position: 'topRight',
        close: true,
        backgroundColor: 'rgba(82, 196, 26, 0.8)',
        messageColor: 'white',
      });
      return;
    }

    const timeLeft = convertMs(timeDifference);

    //TODO === Rewrite new value in HTML => using time left
    Object.entries(timeLeft).forEach(([key, value]) => {
      const element = document.querySelector(`[data-${key}]`);
      if (element) {
        element.textContent = String(value).padStart(2, '0');
      }
    });
  }

  updateTimer();

  interval = setInterval(updateTimer, 1000);
});
