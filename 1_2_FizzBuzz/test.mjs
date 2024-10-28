
//Функция проверки
function fizzBuzz() {

    //Запускам цикл с 1 до 100 включительно
    for (let i = 1; i <= 100; i++) {

        //Проверяем делится число на 3 и 5 без остатка, ставим в условие предварительно чтобы поймать оба условия
        if (i % 3 === 0 && i % 5 === 0) {
            console.log("FizzBuzz");
        }
        // Проверяем делится число на 3 без остатка
        else if (i % 3 === 0) {
            console.log("Fizz");
        }
        // Проверяем делится число на 5 без остатка
        else if (i % 5 === 0) {
            console.log("Buzz");
        }
        //Выводим число
        else {
            console.log(i);
        }
    }
}

//Запуск
fizzBuzz();