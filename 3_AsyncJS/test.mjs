import {UserProfile} from './classes/userPofile.mjs';

// Хранилище для пользователей, чтобы использовать в карусели
let users = [];
// Индекс текущего изображения в карусели
let currentIndex = 0;
// Идентификатор таймера для автоматической смены изображений
let intervalId;

async function fetchRandomUsers() {
    const userList = document.getElementById('userList');

    try {
        const response = await fetch('https://randomuser.me/api/?results=10'); // Запросить 10 пользователей
        if (!response.ok) {
            throw new Error('Ошибка загрузки данных');
        }
        const data = await response.json();

        userList.innerHTML = ''; // Очистить сообщение о загрузке

        // Преобразовать каждый профиль в объект класса UserProfile
        users = data.results.map(user => {
            const name = `${user.name.first} ${user.name.last}`;
            const email = user.email;
            const profilePicture = {
                large: user.picture.large,
                medium: user.picture.medium,
                thumbnail: user.picture.thumbnail
            };
            return new UserProfile(name, email, profilePicture);
        });

        // Отобразить первый элемент карусели
        displayCurrentImage();

        // Запуск таймера для автоматической смены изображений
        startCarousel();

    } catch (error) {
        userList.innerHTML = `<p>Не удалось загрузить пользователей: ${error.message}</p>`;
    }
}

// Функция отображения текущего изображения
function displayCurrentImage() {
    const carouselContainer = document.getElementById('carousel');
    const user = users[currentIndex];

    if (user) {
        // Создаем или находим контейнер для информации о пользователе
        let userInfoContainer = document.querySelector('.user-info-container');
        if (!userInfoContainer) {
            userInfoContainer = document.createElement('div');
            userInfoContainer.className = 'user-info-container';

            const nameElement = document.createElement('p');
            nameElement.className = 'user-name';
            nameElement.innerHTML = `<strong class="name">Имя:</strong> Загрузка...`;

            const emailElement = document.createElement('p');
            emailElement.className = 'user-email';
            emailElement.innerHTML = `<strong class="email">Email:</strong> Загрузка...`;

            userInfoContainer.appendChild(nameElement);
            userInfoContainer.appendChild(emailElement);

            const buttonsContainer = document.querySelector('.carousel-buttons');
            buttonsContainer.insertAdjacentElement('beforebegin', userInfoContainer);
        }

        // Обновляем текст на "Загрузка..." сразу
        userInfoContainer.querySelector('.user-name').innerHTML = `<strong class="name">Имя:</strong> Загрузка...`;
        userInfoContainer.querySelector('.user-email').innerHTML = `<strong class="email">Email:</strong> Загрузка...`;

        // Очищаем контейнер карусели и добавляем заполнитель
        carouselContainer.innerHTML = '';
        const placeholder = document.createElement('div');
        placeholder.className = 'loading-placeholder';
        placeholder.innerText = 'Загрузка...';
        carouselContainer.appendChild(placeholder);

        // Используем setTimeout для отложенной загрузки изображения и обновления данных
        setTimeout(() => {
            const img = document.createElement('img');
            img.src = user.profilePicture.large;
            img.loading = 'lazy';
            img.alt = user.name;
            img.style.opacity = '0';

            img.onload = () => {
                placeholder.style.display = 'none';
                img.style.opacity = '1';

                // Обновляем имя и email после полной загрузки
                userInfoContainer.querySelector('.user-name').innerHTML = `<strong class="name">Имя:</strong> ${user.name}`;
                userInfoContainer.querySelector('.user-email').innerHTML = `<strong class="email">Email:</strong> ${user.email}`;
            };

            // Оборачиваем изображение и добавляем его в карусель
            const imageContainer = document.createElement('div');
            imageContainer.className = 'image-container';
            imageContainer.appendChild(img);
            imageContainer.appendChild(placeholder);

            carouselContainer.appendChild(imageContainer);
        }, 0); // Отложенная загрузка
    }
}

// Функция запуска карусели
function startCarousel() {
    intervalId = setInterval(() => {
        currentIndex = (currentIndex + 1) % users.length; // Переключение на следующее изображение
        displayCurrentImage();
    }, 3000);
}

// Функция остановки карусели
function stopCarousel() {
    clearInterval(intervalId);
}

// Обработчики кнопки «Назад»
document.getElementById('prevButton').addEventListener('click', () => {
    stopCarousel();
    currentIndex = (currentIndex - 1 + users.length) % users.length; // Переключение на предыдущее изображение
    displayCurrentImage();
    startCarousel(); // Перезапуск карусели
});

// Обработчики кнопки «Вперед»
document.getElementById('nextButton').addEventListener('click', () => {
    stopCarousel();
    currentIndex = (currentIndex + 1) % users.length; // Переключение на следующее изображение
    displayCurrentImage();
    startCarousel(); // Перезапуск карусели
});

// Запуск функции при загрузке страницы
document.addEventListener('DOMContentLoaded', fetchRandomUsers);
