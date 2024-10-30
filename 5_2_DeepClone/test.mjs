
function deepClone(obj, cache = new WeakMap()) {
    //Использование WeakMap позволяет хранить ссылки на уже клонированные объекты, что предотвращает бесконечные циклы
    //Если объект уже находится в кэше, функция возвращает его клонированную версию, предотвращая повторное выполнение
    // Проверка на null или не объект
    if (obj === null || typeof obj !== 'object') {
        return obj; // Если это не объект, возвращаем его
    }

    // Проверка на циклические ссылки
    if (cache.has(obj)) {
        return cache.get(obj); // Возвращаем уже склонированный объект
    }

    // Добавляем объект в кэш
    const clonedObj = Array.isArray(obj) ? [] : {};
    cache.set(obj, clonedObj); // Сохраняем клонированный объект в кэше

    // Клонируем каждое свойство
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            clonedObj[key] = deepClone(obj[key], cache); // Рекурсивный вызов для вложенных объектов
        }
    }

    return clonedObj; // Возвращаем склонированный объект
}



function cloneObject(obj) {

    const copy = deepClone(obj);

//Заменяем название нашего города в копии
    copy.address.city = 'Los Angeles';

// New York (оригинальный объект не должен измениться)
    console.log(obj.address.city);

// Los Angeles
    console.log(copy.address.city);
}

// Создадим копию объекта с заменой :
const original = {
    name: 'John',
    address: {
        city: 'New York',
        country: 'USA'
    }
};

const objFunc = {
    name: 'John',
    greet() {
        console.log(`Hello, my name is ${this.name}`);
    },
    address: {
        city: 'New York',
        country: 'USA'
    }
};

//Проведет тест проверки глубокго клонирования объекта с заменой
cloneObject(original)

console.log("Клонирование функции в объекте")
cloneObject(objFunc)

console.log("Клонирование с цикличностью в объекте")

// Создание циклической ссылки
original.self = original;

const copy = deepClone(original);

//Проверка безопасности цикличного объекта
if(copy.self === copy){
    console.log("Копирование объекта безопасно для зацикленности"); // true, это безопасно
}





