// seclect all elements
let form = document.querySelector('#task_form');
let newTask = document.querySelector('#new_task');
let findTask = document.querySelector('#find_task');
let taskList = document.querySelector('#task_list');
let clearTask = document.querySelector('#clear_task');

// add even listener
form.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);
clearTask.addEventListener('click', clearAll);
findTask.addEventListener('keyup', searchTask);
// local storage
document.addEventListener('DOMContentLoaded', getData);


// add function
function addTask(event) {
    if(newTask.value === ""){
        window.alert("Mr. Maruf, Please enter your value.")
    }
    else{
        // create li
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(newTask.value + " "));
        // create ancor tag
        let link = document.createElement('a');
        link.setAttribute('href','#');
        link.classList.add('btn');
        // link.style.textDecoration = 'none';
        // create icon    
        let icon = document.createElement('i');
        icon.classList = "fa fa-trash";
        // link.appendChild(document.createTextNode('x'));
        link.appendChild(icon);
        li.appendChild(link);
        taskList.appendChild(li);
        // push local storage
        storeLocalStorage(newTask.value);
        // null value
        newTask.value = "";
       
    }    
     event.preventDefault();    
}

// add remove function
function removeTask(r){
    if(r.target.parentElement.hasAttribute('href')){
        if(confirm("Are you sure to remove this?")){
            let ele = r.target.parentElement.parentElement;
            ele.remove();
            removeLocalStorage(ele);
        }
    }   
        else{
            window.alert('click trash area')
        }
    
}

// add function clearAll
function clearAll(){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();
}

// add find task function
function searchTask(s){
    let text = s.target.value.toLowerCase();
    // console.log(text);
    let selectLi = document.querySelectorAll('li');
    // console.log(selectLi)
    selectLi.forEach(item =>{
        let liText = item.firstChild.textContent.toLocaleLowerCase();
        // console.log(liText)
        if(liText.indexOf(text) == -1){
            item.style.display = 'none';
        }
        else{
            item.style.display = 'block';
        }
    })
}

// store local storage
function storeLocalStorage(store){
    
    let data;
    if(localStorage.getItem('tasks') === null){
        data = [];
    }
    else{
        data = JSON.parse(localStorage.getItem('tasks'));
    }
    // console.log(data)
    data.push(store);
    localStorage.setItem('tasks', JSON.stringify(data));
}

// get data from local storage
function getData(){
    
    let data;
    if(localStorage.getItem('tasks') === null){
        data = [];
    }
    else{
        data = JSON.parse(localStorage.getItem('tasks'));
    }
    data.forEach(d =>{
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(d + " "));
        // create ancor tag
        let link = document.createElement('a');
        link.setAttribute('href','#');
        link.classList.add('btn');   
        let icon = document.createElement('i');
        icon.classList = "fa fa-trash";
        link.appendChild(icon);
        li.appendChild(link);
        taskList.appendChild(li);
    })
}

// remove task from local storage
function removeLocalStorage(d){
    let data;
    if(localStorage.getItem('tasks') === null){
        data = [];
    }
    else{
        data = JSON.parse(localStorage.getItem('tasks'));
    }
    let li = d;
    li.removeChild(li.lastChild);
    data.forEach((value,index)=>{
        if(li.textContent.trim() === value){
            data.splice(index, 1);
        }
    })
    localStorage.setItem('tasks', JSON.stringify(data));
    // console.log(li);
} 
