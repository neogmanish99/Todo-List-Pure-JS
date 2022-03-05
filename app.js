const form = document.querySelector('#todo-form');
// const add = document.querySelector('#add-on');
const input = document.querySelector('#add-todo');
const lists = document.querySelector('.collection');
const clear = document.querySelector('.btn-primary');

loadAllEventListeners();

function loadAllEventListeners() {

    document.addEventListener('DOMContentLoaded',getTasks);
    form.addEventListener('submit',addTodo);

    lists.addEventListener('click', removeItem);

    clear.addEventListener('click',removeAll);
}


//Creating Todo
function addTodo(e){
    if(input.value ===''){
        // document.write("<h1>Hello</h1>");
        alert('Please enter your todo')
    }else{
        // creating link
        const li = document.createElement('li');
        li.className = 'list';

        // Appending input value to li
        li.appendChild(document.createTextNode(input.value));

        //Creating the icon
        const icon = document.createElement('i');

        // adding className to icon
        icon.className = "fa-solid fa-trash-can";

        //Creating link
        const link = document.createElement('a');

        //Appending icon to link
        link.appendChild(icon);

        //Appending link to li
        li.appendChild(link);

        lists.appendChild(li);

        storeInLocalStorage(input.value);

        input.value = '';

    }
    e.preventDefault();
}

function getTasks() {
    let tasks;

    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        // creating link
        const li = document.createElement('li');
        li.className = 'list';

        // Appending input value to li
        li.appendChild(document.createTextNode(task));

        //Creating the icon
        const icon = document.createElement('i');

        // adding className to icon
        icon.className = "fa-solid fa-trash-can";

        //Creating link
        const link = document.createElement('a');

        //Appending icon to link
        link.appendChild(icon);

        //Appending link to li
        li.appendChild(link);

        lists.appendChild(li);
    })
}


//Removing tasks

function removeItem(e) {
    if(e.target.classList.contains("fa-solid")){
        e.target.parentElement.parentElement.remove();
        // console.log(e.target);

        removeFromLocalStorage(e.target.parentElement.parentElement);
    }
    e.preventDefault()
}

//Removing from localStorage
function removeFromLocalStorage(data){
    let tasks;

    if(localStorage.getItem('tasks')=== null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task,index){
        if(data.textContent===task){
            tasks.splice(index,1);
        }
    })

    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//Clear All tasks
function removeAll(e){
    // lists.innerHTML='';

    if(lists.firstChild){
        lists.innerHTML='';
    }

    clearAllFromLS();
    e.preventDefault();
}

    function clearAllFromLS(){
        localStorage.clear();
    }
// storeInLocalStorage

function storeInLocalStorage(task){

    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));



}