const button = document.querySelector('.open-form');
const form = document.querySelector('#new-task-form');
const buttonNewTask = document.getElementById('new-task');
const input = document.getElementById('new-task-input');
const list = document.getElementById('list');
let taskovi = [];

checkLocalStorage();

//SHOWING THE FORM
button.addEventListener('click', e => {
    form.classList.remove("hidden");
    form.classList.add("open");
    button.classList.add('hidden');
});

//ADDING A NEW TASK
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const task = {
        text: input.value,
        completed: false
    };

    if (!task.text) {
        alert('Please add a task!')
        return;
    }

    taskovi.push(task);

    render();

    setToLocalStorage();


});


function render() {

    let html = '<p>TODO</p>';
    taskovi.forEach((task, index) => {

        html += `<div class="task-list" data-index="${index}"><span class="${task.completed ? 'overline' : ''} toggle input-item">${task.text}</span><div class="task-controls"><button class="remove">Delete</button><button class="done">✓</button></div></div>`

    });

    list.innerHTML = html;

    //DELETING TASK
    const listRemoveTask = document.querySelectorAll(".remove");

    listRemoveTask.forEach((button, index) => {
        button.addEventListener('click', e => {

            const index = Number(button.closest('.task-list').getAttribute('data-index'));
            taskovi.splice(index, 1);
            render();
            setToLocalStorage();
        });
        input.value = '';

    });

    const markTaskAsCompleted = function (index) {
        taskovi[index].completed = !taskovi[index].completed;

        render();
        setToLocalStorage();
    }

    //COMPLETED TASK

    const listButtonCompleted = document.querySelectorAll(".done");
    listButtonCompleted.forEach((button, index) => {
        button.addEventListener('click', e => {
            markTaskAsCompleted(index);
        });
    });


    //CREATING TOGGLE FUNCTION

    const listSpan = document.querySelectorAll(".toggle");
    listSpan.forEach((span, index) => {
        span.addEventListener('click', e => {
            markTaskAsCompleted(index);
        });

    });

}


// check Local Storage
function checkLocalStorage() {
    if (localStorage.getItem('taskovi')) {
        const taskFromLocalStorage = JSON.parse(localStorage.getItem('taskovi'));
        taskovi = taskFromLocalStorage;
        render();
    }
}


// set data to Local Storage
function setToLocalStorage() {
    const taskoviJson = JSON.stringify(taskovi);
    localStorage.setItem('taskovi', taskoviJson);
}









