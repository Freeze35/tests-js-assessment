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
        // Создаем заполнитель с фиксированной высотой
        const placeholder = document.createElement('div');
        placeholder.className = 'loading-placeholder';
        placeholder.textContent = 'Загрузка...';

        // Очищаем контейнер перед загрузкой нового изображения
        carouselContainer.innerHTML = ''; // Удаляем старое содержимое
        // Добавляем заполнитель в контейнер
        carouselContainer.appendChild(placeholder);

        // Создаем изображение
        const img = document.createElement('img');
        img.src = user.profilePicture.medium;
        // Задаём систему изображеняи под экран
        img.srcset = `${user.profilePicture.thumbnail} 150w, ${user.profilePicture.medium} 300w, ${user.profilePicture.large} 600w`;
        img.sizes = '(max-width: 600px) 150px, (max-width: 1200px) 300px, 600px';
        img.src = user.profilePicture.medium; // Добавляем основной src на случай, если браузер не поддерживает srcset
        //Добавляем систему отображения
        img.loading = 'lazy';
        img.alt = user.name;

        // Скрываем изображение до полной загрузки
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease'; // Добавляем плавный переход для появления

        // Устанавливаем обработчик события загрузки
        img.onload = () => {
            // Очищаем контейнер, удаляя заполнитель
            carouselContainer.innerHTML = ''; // Очищаем контейнер
            carouselContainer.appendChild(img); // Добавляем изображение

            // Удаляем старые элементы имени и email, если они существуют
            const userInfoContainer = document.querySelector('.user-info-container');
            if (userInfoContainer) {
                userInfoContainer.remove(); // Удаляем контейнер с информацией
            }

            // Создаем новый контейнер для информации о пользователе
            const newUserInfoContainer = document.createElement('div');
            newUserInfoContainer.className = 'user-info-container'; // Создаем контейнер для информации о пользователе

            // Создаем элементы для отображения имени и email
            const nameElement = document.createElement('p');
            nameElement.className = 'user-name'; // Добавляем класс для идентификации
            nameElement.innerHTML = `<strong class="name">Имя:</strong> ${user.name}`;

            const emailElement = document.createElement('p');
            emailElement.className = 'user-email'; // Добавляем класс для идентификации
            emailElement.innerHTML = `<strong class="email">Email:</strong> ${user.email}`;

            // Добавляем элементы в новый контейнер
            newUserInfoContainer.appendChild(nameElement);
            newUserInfoContainer.appendChild(emailElement);

            // Добавляем новый контейнер над кнопками
            const buttonsContainer = document.querySelector('.carousel-buttons');
            buttonsContainer.insertAdjacentElement('beforebegin', newUserInfoContainer);

            // Плавно показываем изображение
            img.style.opacity = '1'; // Показываем изображение
        };

        // Устанавливаем изображение для загрузки
        carouselContainer.appendChild(img); // Добавляем изображение в контейнер сразу после создания
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
