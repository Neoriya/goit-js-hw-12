// Імпорт SimpleLightbox та інших залежностей

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { showImages } from './js/pixabay-api.js';
import { createMarkup } from './js/render-functions.js';

// Пошук елементів DOM
const searchForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const list = document.querySelector('ul');
const loaders = document.getElementById('spinner');
const loadMoreButton = document.getElementById('load-more');
const loadMoreSpinner = document.getElementById('spinner-load-more');

// Додавання обробників подій
searchForm.addEventListener('submit', handleSubmit);
loadMoreButton.addEventListener('click', handleLoadMore);

let userRequest = ''; // Змінна для запиту користувача
let lightbox; // Змінна для SimpleLightbox
let page = 1; // Поточна сторінка
let totalHits = 0; // Загальна кількість результатів пошуку

// Функція обробки події submit
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
    const { images, totalHits: hits } = await showImages(userRequest, page);
    totalHits = hits; // Оновлення загальної кількості результатів пошуку
    list.innerHTML = ''; // Очищення списку перед новим пошуком
    list.insertAdjacentHTML('beforeend', createMarkup(images));

    if (images.length < 15 || list.children.length >= totalHits) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        backgroundColor: '#5A5A5A',
        messageColor: '#FAFAFB',
        position: 'topRight',
      });
      loadMoreButton.style.display = 'none'; // Ховає кнопку "Load more", якщо досягнуто кінець колекції
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
  } catch (error) {
    console.error('Error fetching images:', error);
  } finally {
    loaders.style.display = 'none'; // Приховує спінер
    searchInput.value = ''; // Очищення поля вводу
  }
}

// Функція обробки події натискання на кнопку "Load more"
async function handleLoadMore() {
  page += 1;
  loadMoreSpinner.style.display = 'block'; // Показує нижній спінер
  try {
    const { images } = await showImages(userRequest, page);
    list.insertAdjacentHTML('beforeend', createMarkup(images));
    lightbox.refresh();

    // Отримання висоти однієї карти
    const { height: cardHeight } =
      list.firstElementChild.getBoundingClientRect();
    // Прокрутка сторінки на дві висоти картки
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (images.length < 15 || list.children.length >= totalHits) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        backgroundColor: '#5A5A5A',
        messageColor: '#FAFAFB',
        position: 'topRight',
      });

      loadMoreButton.style.display = 'none'; // Ховає кнопку "Load more", якщо досягнуто кінець колекції
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  } finally {
    loadMoreSpinner.style.display = 'none'; // Приховує нижній спінер
  }
}
