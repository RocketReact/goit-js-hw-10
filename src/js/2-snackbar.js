const btnSubmit =
  document.getElementById('btnSubmit');

btnSubmit.addEventListener('submit', e => {
  const input = document.getElementById('input');
  e.preventDefault();
  const promise = new Promise((resolve, reject) =>
    setTimeout(resolve, 1000)
  );
});
