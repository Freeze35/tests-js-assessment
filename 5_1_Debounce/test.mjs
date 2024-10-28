import readline from 'readline';

// Флаг активности приложения
let isActive = true;

// Функция debounce принимает функцию и задержку срабатывания,
// после возвращает вызов функции с задержкой если она не была вызвана повторно
function debounce(func, delay) {
    let timeoutId; // ID текущего таймера
    return function(...args) {
        // Очищаем таймер, если функция вызвана снова до истечения задержки
        clearTimeout(timeoutId);
        // Устанавливаем новый таймер для отложенного выполнения
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Настройка для `keypress` события
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

console.log('Начните вводить текст. Я покажу сообщение, если вы остановитесь на 3 секунды. "backspace" - Выход.');

// Наше сохраненное сообщение (так как не видно, что мы что-то вводим в консоли)
let userInput = "";

// Функция для ввода данных, для проверки
const debouncedAlert = debounce(() => {
    if (isActive) {
        console.log('Задержка на 3 сек.');
        console.log(`Сообщение: ${userInput}`);
        userInput = ""; // Очищаем пользовательский ввод
    }
}, 3000);

// Обработчик для события keypress
process.stdin.on('keypress', (str, key) => {
    // Проверяем, активна ли программа
    if (!isActive) return;

    // Добавляем символ к `userInput`, только если `str` является строкой
    if (typeof str === 'string') {
        userInput += str;
    }
    //из за того что отельные символы не выводят кирилицу выводом в консоль. Выводим значение userInput
    console.log(userInput)
    // Каждое нажатие клавиши перезапускает debouncedAlert
    debouncedAlert();

    // Проверка на выход, если нажата "backspace"
    if (key && key.name === "backspace") {
        console.log('Выход.');
        isActive = false; // Меняем флаг активности
        process.exit(); // Завершаем процесс
    }
});
