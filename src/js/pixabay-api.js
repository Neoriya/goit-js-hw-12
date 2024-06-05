// функції для HTTP-запитів.

import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

//----замінити ключ на свій, коли вийде зареєструватися-------------
const API_KEY = '43173775-fc7269b10cca3a5d436001063';
const BASE_URL = 'https://pixabay.com/api/';

export async function showImages(userRequest, page = 1) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: userRequest,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: 15,
        page: page,
      },
    });

    if (response.status !== 200) {
      throw new Error('Request failed with status: ' + response.status); // Перевірка статусу відповіді сервера
    }

    if (response.data.hits.length === 0) {
      //перевірка наявності зображень у відповіді
      throw new Error(
        'Sorry, there are no images matching <br>your search query.Please try again!'
      ); // Генерується помилка, якщо список зображень порожній
    }
    return response.data.hits;
  } catch (error) {
    console.error('Error fetching images:', error);
    iziToast.error({
      message: error.message,
      backgroundColor: '#EF4040',
      messageColor: '#FAFAFB',
      position: 'topRight',
    });
    throw error;
  }
}
