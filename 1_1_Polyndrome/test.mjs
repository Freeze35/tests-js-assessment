//Импорт интерфейса для тестирования ввода строки
import rl from '../utils/utils.mjs';

function isPalindrome(str) {
    // Приводим строку к нижнему регистру,
    // удаления всех символов, которые не являются буквами или цифрами с помощью Regex
    const cleanedStr = str.toLowerCase().replace(/[^a-z0-9а-яё]/g, '');


    // Строгое сравниваем очищенную строку с её перевернутой версией (reverse), соединяем с заменой пробелов при проверке (join)
    if (cleanedStr === cleanedStr.split('').reverse().join('')) {
        console.log("Это палиндром!");
    } else {
        console.log("Это не палиндром.");
    }
}

// Примеры использования
console.log("А роза упала на лапу Азора");
isPalindrome("А роза упала на лапу Азора");

console.log("Привет");
isPalindrome("Привет");

// Функция для запроса ввода и проверки палиндрома
function askPalindrome() {
    rl.question('Введите строку для проверки (или "q" для выхода): ', (input) => {
        if (input.toLowerCase() === 'q') {
            console.log('Выход из программы.');
            rl.close(); // Закрываем интерфейс при команде "exit"
        } else {
            isPalindrome(input)
            askPalindrome(); // Рекурсивно вызываем снова для следующего ввода
        }
    });
}

// Запускаем первый запрос
askPalindrome();