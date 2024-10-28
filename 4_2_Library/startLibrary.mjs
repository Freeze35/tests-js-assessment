import rl from '../utils/utils.mjs';
import { Book } from './library.mjs'; // Убедитесь, что путь корректный и файл содержит класс Book

export function startLibrary(library) {
    console.log('');
    console.log('Добро пожаловать в библиотеку!');

    rl.question('Выберите действие (1 - добавить книгу, 2 - взять книгу, 3 - вернуть книгу, 4 - показать доступные книги, q - выйти): ', (action) => {
        switch (action) {
            case '1':
                rl.question('Введите название книги: ', (title) => {
                    rl.question('Введите автора книги: ', (author) => {
                        rl.question('Введите ISBN книги: ', (isbn) => {
                            const newBook = new Book(title, author, isbn);
                            library.addBook(newBook);
                            startLibrary(library); // Возвращаемся к меню
                        });
                    });
                });
                break;
            case '2':
                rl.question('Введите ISBN книги для заимствования: ', (isbn) => {
                    library.borrowBook(isbn);
                    startLibrary(library); // Возвращаемся к меню
                });
                break;
            case '3':
                rl.question('Введите ISBN книги для возврата: ', (isbn) => {
                    library.returnBook(isbn);
                    startLibrary(library); // Возвращаемся к меню
                });
                break;
            case '4':
                library.listAvailableBooks();
                startLibrary(library); // Возвращаемся к меню
                break;
            case 'q':
                console.log('Выход из библиотеки.');
                rl.close();
                break;
            default:
                console.log('Некорректный ввод. Попробуйте снова.');
                startLibrary(library); // Возвращаемся к меню
                break;
        }
    });
}
