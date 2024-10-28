//Импорт интерфейса для тестирования ввода строки
import rl from '../utils/utils.mjs';

class Calculator {

    add(a, b) {
        return a + b;
    }

    subtract(a, b) {
        return a - b;
    }

    multiply(a, b) {
        return a * b;
    }

    divide(a, b) {
        if (b === 0) {
            return "Ошибка: деление на ноль.";
        }
        return a / b;
    }
}

// Создание экземпляра класса
const calculator = new Calculator();

const numbersTest1= 120;
const numbersTest2=  2;

const operations = [
    { name: 'Сложение', operator: 'add', symbol: '+' },
    { name: 'Вычитание', operator: 'subtract', symbol: '-' },
    { name: 'Умножение', operator: 'multiply', symbol: '*' },
    { name: 'Деление', operator: 'divide', symbol: '/' },
];

// Цикл для выполнения операций
for (const { name, operator, symbol } of operations) {
    const result = calculator[operator](numbersTest1, numbersTest2);
    console.log(`${name} ${numbersTest1} ${symbol} ${numbersTest2} = `, result);
}

//Проверка на преобоазование в число
function isNumber(value) {
    console.log("")
    //Проврека с помощью Regex
    return !/^-?\d+(\.\d+)?$/.test(value);
}

// Калькуляция из пользовательского ввода, возврат через рекурсию.Выход через q
function startCalculator() {

    //Отступ для консоли
    console.log("")
    //Запрос первого числа от пользователя
    rl.question('Введите первое число (или q для выхода): ', (num1) => {

        //Проверка команды на выход
        if (num1.toLowerCase() === 'q') {
            console.log('Завершение работы калькулятора.');
            rl.close(); // Закрываем интерфейс
            return;
        }

        //Проверка целочисленной единицы
        if (isNumber(num1.trim())){
            console.log("Это не числовое значение.");
            startCalculator(); // Запрашиваем ввод снова
            return;
        }

        //Запрос второго числа от пользователя
        rl.question('Введите второе число: ', (num2) => {

            //Проверка команды на выход
            if (num2.toLowerCase() === 'q') {
                console.log('Завершение работы калькулятора.');
                rl.close(); // Закрываем интерфейс
                return;
            }

            //Проверка целочисленной единицы
            if (isNumber(num2.trim())){
                console.log("Это не числовое значение.");
                startCalculator(); // Запрашиваем ввод снова
                return;
            }

            rl.question('Введите операцию (add(1), subtract(2), multiply(3), divide(4)): ', (operation) => {
                const a = parseFloat(num1);
                const b = parseFloat(num2);
                let result;

                switch (operation) {
                    case 'add':
                    case '1':
                        result = calculator.add(a, b);
                        break;
                    case 'subtract':
                    case '2':
                        result = calculator.subtract(a, b);
                        break;
                    case 'multiply':
                    case '3':
                        result = calculator.multiply(a, b);
                        break;
                    case 'divide':
                    case '4':
                        result = calculator.divide(a, b);
                        break;
                    default:
                        console.log('Ошибка: не распознана операция.');
                        startCalculator(); // Запрашиваем ввод снова
                        return;
                }

                console.log(`Результат: ${result}`);
                startCalculator(); // Запрашиваем ввод снова
            });
        });
    });
}


// Запуск калькулятора
startCalculator();