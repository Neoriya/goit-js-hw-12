import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchImages } from './js/pixabay-api.js';
import { createMarkup } from './js/render-functions.js';

const searchForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const list = document.querySelector('ul');
const loaders = document.getElementById('spinner');

searchInput.addEventListener('input', handleInput);
searchForm.addEventListener('submit', handleSubmit);

let userRequest; // Змінна для запиту користувача
let lightbox; // Змінна для SimpleLightbox

function handleInput(event) {
  userRequest = event.target.value.trim().toLowerCase();
}

function handleSubmit(event) {
  event.preventDefault();
  list.innerHTML = ''; // Очищення списку перед новим пошуком

  if (!userRequest || userRequest.trim() === '') {
    iziToast.error({
      message: 'Sorry, the query field is empty.',
      backgroundColor: '#EF4040',
      messageColor: '#FAFAFB',
      position: 'topRight',
    });
    searchInput.value = ''; // Очищення поля вводу
    userRequest = ''; // Обнулення змінної userRequest
    return;
  }

  loaders.style.display = 'block'; // Показує спінер

  fetchImages(userRequest)
    .then(images => {
      list.innerHTML = ''; // Очищення списку перед новим пошуком
      list.insertAdjacentHTML('beforeend', createMarkup(images));
      // Ініціалізація SimpleLightbox
      if (!lightbox) {
        lightbox = new SimpleLightbox('.gallery a', {
          nav: true,
          captions: true,
          captionsData: 'alt',
          captionDelay: 250,
        });
      } else {
        lightbox.refresh(); // Оновлення SimpleLightbox
      }
    })
    .catch(error => {
      console.error('Error fetching images:', error);
    })
    .finally(() => {
      loaders.style.display = 'none'; // Приховує спінер
      searchInput.value = ''; // Очищення поля вводу
      userRequest = ''; // Обнулення змінної userRequest
    });
}
