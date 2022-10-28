import { formDate } from "./calendar";
import { Project, bodySelect, projectArray } from "./projectsAdd";

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
                    <input class="nameTask" type="txt" placeholder="set a name">
                    <input class="form-control" type="datetime-local" placeholder="selec DateTime">
                </form>
                <div id="btn-task">
                    <button id="add-task">Submit</button>
                </div>
            `;
            contentMain.prepend(mainBox);
            formDate();
            setTask();
        };
    });
};



class Task{
    constructor(name,date){
        this.name = name;
        this.date = date;
    };
};

function setTask(){
    const btnAddtask = document.querySelector("#add-task");
    const formControl = document.querySelector(".form-control");
    const formTxt = document.querySelector(".nameTask");
    const index = projectArray.map(object => object.status).indexOf(true);
    btnAddtask.addEventListener('click', () => {

        if(formControl.value === "" || formTxt.value === ""){
            alert("Please, fill all the fields");
        } else{
            createTask(index, formTxt.value, formControl.value);
            const deleteForm = document.querySelector("#remover");
            deleteForm.remove();
            showTask(formTxt.value, formControl.value);
            deleteTask();
        };
        selectTask();
        localStorage.setItem("project", JSON.stringify(projectArray));
    });
};

function createTask(id, nameTask, date){
    const tarea = new Task(`${nameTask}`, `${date}`);
    projectArray[`${id}`].tasks.push(tarea);
};

function showTask(name, date){
    const mainBox = document.createElement("div");
    const indexStatus = projectArray.map(object => object.status).indexOf(true);

    mainBox.classList.add("main-box");
    mainBox.innerHTML = `

        <div class="mb-circle"></div>
        <div class="mb-info">${name}</div>
        <div class="timeSet">${date}</div>
        <i class="fa-solid fa-trash remove-task"></i>

    `;
    contentMain.prepend(mainBox);

    for(let i = 0; i < projectArray[indexStatus].tasks.length; i++){
       mainBox.setAttribute("id", `0${i}`);
    };

};

function selectTask(){
    const checkTask = document.querySelector(".mb-circle");
    const checkInfo = document.querySelector(".mb-info");
    const checkDate = document.querySelector(".timeSet")
    checkTask.addEventListener("click", () => {
        checkTask.classList.toggle("complete");
        checkInfo.classList.toggle("complete");
        checkDate.classList.toggle("complete");
    })
}

function deleteTask(){
        contentMain.addEventListener("click", (e) => {
            const indexStatus = projectArray.map(object => object.status).indexOf(true);

           if(projectArray[indexStatus].tasks.length>1){
            if(e.target.classList.contains("remove-task")){
                const indexTask = projectArray[indexStatus].tasks.map(todo => todo.name).indexOf(e.target.parentElement.children[1].innerText);
                projectArray[indexStatus].tasks.splice(indexTask, 1);
                document.getElementById(e.target.parentElement.id).remove();
                localStorage.setItem("project", JSON.stringify(projectArray));
               };
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
        <i class="fa-solid fa-trash remove-task"></i>
    `;
    contentMain.prepend(creteDiv);
};

export {addTask, showTask, createDefaultTask, createTask, selectTask};