import {startLibrary} from "./startLibrary.mjs";

export class Book {
    constructor(title, author, isbn) {
        this.title = title;        // Название книги
        this.author = author;      // Автор книги
        this.isbn = isbn;          // ISBN книги
        this.status = 'available';  // Статус книги (доступна по умолчанию)
    }
}

export class Library {
    constructor() {
        this.books = []; // Массив для хранения книг
    }

    //Добавляем книгу в библиотеку
    addBook(book) {
        this.books.push(book); // Добавляем книгу в библиотеку
        console.log(`Книга "${book.title}" добавлена в библиотеку.`);
    }

    //Берём книгу из библиотеки
    async borrowBook(isbn) {
        // Ищем книгу по ISBN
        const book = this.books.find(b => b.isbn === isbn);
        if (book) {
            if (book.status === 'available') {
                book.status = 'borrowed'; // Изменяем статус на "взята"
                console.log(`Книга "${book.title}" взята.`);
            } else {
                console.log(`Книга "${book.title}" уже взята.`);
            }
        } else {
            console.log('Книга с таким ISBN не найдена.');
        }
        // Добавляем задержку для симуляции времени выполнения
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    //Возвращаем наши книги
    async returnBook(isbn) {
        const book = this.books.find(b => b.isbn === isbn); // Ищем книгу по ISBN
        if (book) {
            if (book.status === 'borrowed') {
                book.status = 'available'; // Изменяем статус на "доступна"
                console.log(`Книга "${book.title}" возвращена.`);
            } else {
                console.log(`Книга "${book.title}" не была взята.`);
            }
        } else {
            console.log('Книга с таким ISBN не найдена.');
        }
        // Добавляем задержку для симуляции времени выполнения
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    //Запрашиваем доступные книги в библиотеке для взятия
    listAvailableBooks() {
        // Фильтруем доступные книги
        const availableBooks = this.books.filter(b => b.status === 'available');
        console.log("")
        console.log("Всего числящихся книг в библиотеке:", this.books.length, "Доступные книги:", availableBooks.length, "\n");

        if (availableBooks.length > 0) {
            console.log('Доступные книги:');
            availableBooks.forEach(b => {
                console.log(`- ${b.title} (Автор: ${b.author}, ISBN: ${b.isbn})`);
            });
        } else {
            console.log('Нет доступных книг.');
        }

        // Добавляем разделитель для удобства чтения
        console.log('\n' + '-'.repeat(40) + '\n');
    }
}

// Вызовим тестовый запуск обращения к библиотеке
// Для того чтобы предотвратить возникновения конкурирующих запрсов для порядка вызваем async -> await
// С ожиданием исполнения предыдущих вызывов
async function main() {
    // Пример использования:
    const library = new Library();

    // Создаем книги
    const book1 = new Book('Мастер и Маргарита', 'Михаил Булгаков', '978-5-699-40873-8');
    const book2 = new Book('451 градус по Фаренгейту', 'Рэй Брэдбери', '978-0-7432-0592-0');
    const book3 = new Book('Преступление и наказание', 'Фёдор Достоевский', '978-5-9703-0138-7');
    const book4 = new Book('Убить пересмешника', 'Харпер Ли', '978-0-06-112008-4');

    // Добавляем книги в библиотеку
    library.addBook(book1);
    library.addBook(book2);
    library.addBook(book3);
    library.addBook(book4);

    // Список доступных книг
    library.listAvailableBooks(); // Показываем доступные книги
    console.log(``);

    // Заимствуем несколько книг последовательно
    await library.borrowBook('978-5-699-40873-8'); // Берем "Мастер и Маргарита"
    await library.borrowBook('978-0-7432-0592-0'); // Берем "451 градус по Фаренгейту"

    // Проверяем доступные книги после взятия
    library.listAvailableBooks();
    console.log(``);

    // Возвращаем одну из книг
    await library.returnBook('978-5-699-40873-8'); // Возвращаем "Мастер и Маргарита"
    console.log(``);

    // Проверяем доступные книги после возврата
    library.listAvailableBooks();
    console.log(``);

    // Попробуем вернуть книгу, которая не была взята
    await library.returnBook('978-0-7432-0592-0'); // Возвращаем "451 градус по Фаренгейту"
    console.log(``);

    // Проверяем доступные книги снова
    library.listAvailableBooks();
    console.log(``);
    return library
}

// Запускаем библиотеку
main().then(library =>
{
    // Запускаем библиотеку
    startLibrary(library);
});



