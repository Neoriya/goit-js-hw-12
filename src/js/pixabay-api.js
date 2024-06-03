// функції для HTTP-запитів.

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

//----замінити ключ на свій, коли вийде зареєструватися-------------
const API_KEY = '43173775-fc7269b10cca3a5d436001063';

export function fetchImages(userRequest) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: userRequest,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  return fetch(`https://pixabay.com/api/?${params}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status); // Перевірка статусу відповіді сервера
      }
      return response.json();
    })
    .then(data => {
      if (data.hits.length === 0) {
        //перевірка наявності зображень у відповіді
        throw new Error(
          'Sorry, there are no images matching <br>your search query.Please try again!'
        ); // Генерується помилка, якщо список зображень порожній
      }
      return data.hits;
    })
    .catch(error => {
      console.error('Error fetching images:', error);
      iziToast.error({
        message: error.message,
        backgroundColor: '#EF4040',
        messageColor: '#FAFAFB',
        position: 'topRight',
      });
      throw error;
    });
}
