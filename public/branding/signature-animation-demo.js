const replay = document.querySelector('#replay');
const signatures = document.querySelectorAll('.signature');

replay?.addEventListener('click', () => {
  for (const image of signatures) {
    const base = image.getAttribute('src').split('?')[0];
    image.setAttribute('src', `${base}?replay=${Date.now()}`);
  }
});
