import { formDate } from "./calendar";
import { bodySelect, projectArray } from "./projectsAdd";

const btnTask = document.querySelector("#btn-task");
const contentMain = document.querySelector("#content-main");

function addTask(){
    btnTask.addEventListener("click", () => {
        if(projectArray.length === 0){
            alert("Please, create a new project");
        } else{
            const mainBox = document.createElement("div");
            mainBox.classList.add("main-box");
            mainBox.setAttribute("id", "remover");
            mainBox.innerHTML = `
                <form>
                    <input class="nameTask inputClass" type="txt" placeholder="set a name">
                    <input class="form-control inputClass" type="datetime-local" placeholder="select date">
                </form>
                <div id="btn-task">
                    <button id="add-task">Submit</button>
                </div>
                <img class="icon remove-form-task" src="/assets/x-mark.svg">
            `;
            contentMain.prepend(mainBox);
            formDate();
            setTask();
            removeForm();
        };
    });
};

function removeForm(){
    const btnRemoveForm = document.querySelector('.remove-form-task');
    const removeFormDOM = document.querySelector('#remover');
    btnRemoveForm.addEventListener('click', () => {
        removeFormDOM.remove();
    })
}

function setTask(){
    const btnAddtask = document.querySelector("#add-task");
    const formControl = document.querySelector(".form-control");
    const formTxt = document.querySelector(".nameTask");
    btnAddtask.addEventListener('click', () => {

        if(formControl.value === "" || formTxt.value === ""){
            alert("Please, fill all the fields");
        } else{
            const deleteForm = document.querySelector("#remover");
            createTask(formTxt.value, formControl.value);
            deleteForm.remove();
            showTask(formTxt.value, formControl.value, false);
            selectTask();
        };
        deleteTask();
        localStorage.setItem("project", JSON.stringify(projectArray));
    });
};

function createTask(nameTask, date){
    projectArray.find(({status}) => status === true).tasks.push({name: nameTask, date: date, status: false});
};

function showTask(name, date, status){
    const mainBox = document.createElement("div");

    mainBox.classList.add("main-box");
    if(status){
        mainBox.innerHTML = `

        <div class="mb-circle complete"></div>
        <div class="mb-info complete">${name}</div>
        <div class="timeSet complete">${date}</div>
        <img class="icon delete-project" src="/assets/trash.svg">

    `;
    } else{
        mainBox.innerHTML = `
    
            <div class="mb-circle"></div>
            <div class="mb-info">${name}</div>
            <div class="timeSet">${date}</div>
            <img class="icon delete-project" src="/assets/trash.svg">
    
        `;
    }
    contentMain.prepend(mainBox);
};

function selectTask(){
    const checkTask = document.querySelector(".mb-circle");
    const checkInfo = document.querySelector(".mb-info");
    const checkDate = document.querySelector(".timeSet");
    checkTask.addEventListener("click", (e) => {
        checkTask.classList.toggle("complete");
        checkInfo.classList.toggle("complete");
        checkDate.classList.toggle("complete");
        if(projectArray.find(({status}) => status === true).tasks.find(({name}) => name === e.target.nextElementSibling.innerText).status === false){
            projectArray.find(({status}) => status === true).tasks.find(({name}) => name === e.target.nextElementSibling.innerText).status = true;
        } else{
            projectArray.find(({status}) => status === true).tasks.find(({name}) => name === e.target.nextElementSibling.innerText).status = false;
        };
    });
}

function deleteTask(){
    const taskArr = projectArray.find(({status}) => status === true).tasks;
    
        contentMain.addEventListener('click', (e) => {
            if(e.target.classList.contains('delete-project') && taskArr.length>1){
                taskArr.splice(taskArr.findIndex(({name}) => name === e.target.parentElement.children[1].innerText), 1);
                e.target.parentElement.remove();
            };
        });

};


function createDefaultTask(){
    const contentMain = document.querySelector("#content-main");
    const creteDiv = document.createElement("div");
    creteDiv.classList.add("main-box");
    creteDiv.innerHTML = `
        <div class="mb-circle complete"></div>
        <div class="mb-info complete">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, libero!</div>
        <div class="timeSet">28-10-2022</div>
        <img class="icon delete-task" src="/assets/trash.svg">
    `;
    contentMain.prepend(creteDiv);
};

export {addTask, showTask, createDefaultTask, createTask, selectTask};