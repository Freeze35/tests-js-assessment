// Получаем элементы DOM
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const filterCompletedBtn = document.getElementById('filterCompletedBtn');
const filterAllBtn = document.getElementById('filterAllBtn');

//добавляем общий флаг скрытия элементов
let hidden = false

// Функция для добавления задачи
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== '') {

        const li = document.createElement('li');
        if (hidden){
            li.style.display = "none"
        }
        li.textContent = taskText;

        // Добавляем событие клика для отметки задачи как выполненной
        li.addEventListener('click', () => {
            li.classList.toggle('completed');
        });

        // Создаем контейнер для кнопки удаления
        const deleteBtnContainer = document.createElement('div');
        deleteBtnContainer.className = 'delete-btn-container'; // Добавляем класс для стилизации

        //Создаём кнопку удаления
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Удалить';
        deleteBtn.className = 'delete-btn';

        // Обработчик события клика на кнопке удаления
        deleteBtn.addEventListener('click', (e) => {
            // Предотвращаем срабатывание события на li
            e.stopPropagation();
            // Удаляем задачу
            taskList.removeChild(li);
        });

        // Обработчик события клика на контейнере
        deleteBtnContainer.addEventListener('click', (e) => {
            // Предотвращаем срабатывание события на li
            e.stopPropagation();
            // Удаляем задачу
            taskList.removeChild(li);
        });


        // Добавляем кнопку удаления в контейнер чтобы предотвратить мисклик выборки элеменета перед удалением
        deleteBtnContainer.appendChild(deleteBtn);

        // Добавляем контейнер в элемент списка
        li.appendChild(deleteBtnContainer);
        taskList.appendChild(li);
        taskInput.value = ''; // Очищаем поле ввода
    }
}

// Функция для фильтрации задач
function filterTasks(showAll) {
    const tasks = taskList.querySelectorAll('li');

    hidden = !showAll

    tasks.forEach(task => {

        if (showAll) {

            // Если нужно показать все задачи
            task.style.display = ''; // Показать все задачи

        } else {

            // Если нужно показать завершенные задачи
            if (task.classList.contains('completed')) {
                task.style.display = ''; // Показать завершенные
            } else {
                task.style.display = 'none'; // Скрыть незавершенные
            }

        }
    });
}

// Добавляем события
addTaskBtn.addEventListener('click', addTask);

filterCompletedBtn.addEventListener('click', () => { // Переключаем класс 'active' на кнопке

        if(hidden){
            filterCompletedBtn.classList.remove('active');
            filterTasks(true)
        }else{
            //Включаем кнопку активации показа только
            filterCompletedBtn.classList.add('active');
            filterTasks(false)
        }

    }
);

filterAllBtn.addEventListener('click', () => {

        filterCompletedBtn.classList.remove('active');
        filterTasks(true)
    }

);
