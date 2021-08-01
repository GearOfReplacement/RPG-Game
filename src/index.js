import './index.scss';
import ClientGame from './client/ClientGame';

window.addEventListener('load', () => {
  const $form = document.querySelector('#nameForm');

  $form.addEventListener('submit', (e) => {
    e.preventDefault();

    const $input = document.querySelector('.input');
    const characterName = $input.value === '' ? 'Stranger' : $input.value;

    document.querySelector('.start-game').style.display = 'none';
    ClientGame.init({ tagId: 'game', name: characterName });
  });
});
