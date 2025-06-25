import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');

form.addEventListener('submit', e => {
  e.preventDefault();
  const input =
    document.querySelector('input');
  const inputValue = Number(input.value);

  const inputRatioValue =
    document.querySelector(
      '.input-ratio:checked'
    ).value;
  //TODOPromise
  const promise = new Promise(
    (resolve, reject) => {
      if (inputRatioValue === 'rejected') {
        setTimeout(() => {
          iziToast.error({
            message: `❌ Rejected promise in ${inputValue}ms`,
            position: 'topRight',
            timeout: 2000,
          });
          reject(inputValue);
        }, inputValue);
      } else if (
        inputRatioValue === 'fulfilled'
      ) {
        setTimeout(() => {
          iziToast.success({
            message: `✅ Fulfilled promise in ${inputValue}ms`,
            position: 'topRight',
            timeout: 2000,
          });
          resolve(inputValue);
        }, inputValue);
      }
    }
  );
  promise
    .then(delay => {
      console.log(
        'Promise resolved:',
        delay
      );
    })
    .catch(delay => {
      console.log(
        'Promise rejected:',
        delay
      );
    });
});
