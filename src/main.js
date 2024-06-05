import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { showImages } from './js/pixabay-api.js';
import { createMarkup } from './js/render-functions.js';

const searchForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const list = document.querySelector('ul');
const loaders = document.getElementById('spinner');
const loadMoreButton = document.getElementById('load-more');

// searchInput.addEventListener('input', handleInput);
searchForm.addEventListener('submit', handleSubmit);
loadMoreButton.addEventListener('click', handleLoadMore);

let userRequest = ''; // Змінна для запиту користувача
let lightbox; // Змінна для SimpleLightbox
let page = 1; // Поточна сторінка

// function handleInput(event) {
//   userRequest = event.target.value.trim().toLowerCase();
// }

async function handleSubmit(event) {
  event.preventDefault();
  list.innerHTML = ''; // Очищення списку перед новим пошуком
  page = 1; // Скидання сторінки до 1
  loadMoreButton.style.display = 'none'; // Ховає кнопку "Load more"

  userRequest = searchInput.value.trim().toLowerCase(); // Оновлення userRequest

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

  try {
    const { images, totalHits } = await showImages(userRequest, page);
    list.innerHTML = ''; // Очищення списку перед новим пошуком
    list.insertAdjacentHTML('beforeend', createMarkup(images));
    // list.innerHTML = createMarkup(images);
    if (images.length < 15 || list.children.length >= totalHits) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        backgroundColor: '#5A5A5A',
        messageColor: '#FAFAFB',
        position: 'topRight',
      }); // Додано повідомлення про кінець колекції
      loadMoreButton.style.display = 'none'; // Ховати кнопку "Load more", якщо досягнуто кінець колекції
    } else {
      loadMoreButton.style.display = 'block'; // Показує кнопку "Load more", якщо ще є зображення для завантаження
    }
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
    if (images.length === 15) {
      loadMoreButton.style.display = 'block';
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  } finally {
    loaders.style.display = 'none'; // Приховує спінер
    searchInput.value = ''; // Очищення поля вводу
    userRequest = ''; // Обнулення змінної userRequest
  }
}

async function handleLoadMore() {
  page += 1;
  loaders.style.display = 'block'; // Показує спінер
  try {
    const { images, totalHits } = await showImages(userRequest, page);
    list.insertAdjacentHTML('beforeend', createMarkup(images));
    lightbox.refresh();
    if (images.length < 15 || list.children.length >= totalHits) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        backgroundColor: '#5A5A5A',
        messageColor: '#FAFAFB',
        position: 'topRight',
      }); // Додано повідомлення про кінець колекції
      loadMoreButton.style.display = 'none'; // Ховати кнопку "Load more", якщо досягнуто кінець колекції
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  } finally {
    loaders.style.display = 'none'; // Приховує спінер
  }
}
