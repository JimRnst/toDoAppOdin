import { showTask, createDefaultTask, createTask, addTask, selectTask } from "./task";


const bodySelect = document.querySelector("body");
const contentMain = document.querySelector("#content-main");

let projectArray = [];

function runApp(){
    addTask();
    bodySelect.addEventListener("click", (e) => {

        if(e.target.className === "project-box"){
            const findWtName = projectArray.find(({name}) => name === e.target.innerText);
            const findWtStatus = projectArray.find(({status}) => status === true);
                
            contentMain.innerHTML = "";

            if(!findWtName.status){
                findWtStatus.status = false;
                findWtName.status = true;
                findWtName.tasks.forEach(task => {
                    task.status ? showTask(task.name, task.date, true) : showTask(task.name, task.date, false);
                });
            } else{
                findWtName.tasks.forEach(task => {
                    task.status ? showTask(task.name, task.date, true) : showTask(task.name, task.date, false);
                });
            };

            getNameProject(e.target.innerText);
            selectTask(); 
        };

        if(e.target.id === "btn-add"){
            overlay();
        };

        if(e.target.className === "icon fa-x"){
            removeOverlay();
        };

        if(e.target.id === "submit"){
            const getName = document.querySelector("#productName");
            if(getName.value === ""){
                alert("Please, set a project name");
            } else{
                contentMain.innerHTML = "";
                createNewProject(getName.value);
                removeOverlay();
                projectArray.filter(todo => todo).forEach(todo => todo.status = false);
                projectArray.find(({name}) => name === getName.value).status = true;
                createTask(`${getName.value} example task`, `${getName.value} example date`);
                showTask(`${getName.value} example task`, `${getName.value} example date`);
                localStorage.setItem("project", JSON.stringify(projectArray))
            };
            selectTask();
        };

        if(e.target.classList.contains("delete-project") && projectArray.length > 1){
            //Search project name in array
            const findTodo = projectArray.find(({name}) => name === e.target.parentElement.innerText);
            
            if(findTodo.status === true){
            
                const index = projectArray.findIndex(todo => todo.name === e.target.parentElement.innerText);
                if(index == 0){
                    projectArray[parseInt(index)+1].status = true;
                };

                if(index >= 1){
                    projectArray[parseInt(index)-1].status = true;
                    projectArray.splice(index, 1);
                };

                document.getElementById(e.target.parentElement.id).remove(); //remove of DOM

                const searchTodoActive = projectArray.find(({status}) => status === true);
                contentMain.innerHTML = "";
                getNameProject(searchTodoActive.name)
                searchTodoActive.tasks.forEach(todo => {
                    todo.status ? showTask(todo.name, todo.date, true) : showTask(todo.name, todo.date, false);
                });

                localStorage.setItem("project", JSON.stringify(projectArray));
            } else{
                projectArray.splice(projectArray.findIndex(todo => todo.name === e.target.parentElement.innerText), 1); //delete project of array
                document.getElementById(e.target.parentElement.id).remove(); //remove of DOM
                localStorage.setItem("project", JSON.stringify(projectArray));
            };
        };
    });

};

function overlay(){
    const creteDiv = document.createElement("div");
    creteDiv.setAttribute("id", "overlay");
    creteDiv.innerHTML = `
        <div id="card-add-new-project">
            <div id="close"><img class="icon fa-x" src="/assets/x-mark.svg"></div>
            <div id="card-title">Project Name</div>
            <div id="card-sub">Max length: 20</div>
            <input type="text" name="productName" id="productName" maxlength="20" autofocus>
            <div id="btn-submit">
                <button id="submit">Submit</button>
            </div>
        </div>
    `;
    bodySelect.prepend(creteDiv);

    const inputForm = document.querySelector("#productName");
    inputForm.addEventListener("keyup", () => {
        const validate = projectArray.find(({name}) => name === inputForm.value);
        if(validate){
            alert("This project name is already exist");
        }
    })
};

function removeOverlay(){
    const deleteAll = document.getElementById("overlay");
    deleteAll.remove();
};

function createNewProject(name){
    projectArray.push({name: name, tasks: [], status: false});
    setDOM(name);
    getNameProject(name);
};

function getNameProject(name){
    const headerTitle = document.querySelector("#header-title");
    headerTitle.innerText = name;
};

function setDOM(name){
    const projectBox = document.getElementById("contain-project");
    projectBox.innerHTML = "" //vaciar projectBox para agregar uno nuevo
    for(let i = 0; i < projectArray.length; i++){ //establecer id en incremento
        const creteDiv = document.createElement("div");
        creteDiv.setAttribute("id", `${i}`)
        creteDiv.classList.add("project-box");
        creteDiv.innerHTML = `
            <span>${projectArray[i].name}</span><img class="icon delete-project" src="/assets/trash.svg">
        `;

        // <span>${projectArray[i].name}</span><i class="fa-solid fa-trash delete-project">
        //<i class="fa-solid fa-trash">

        projectBox.appendChild(creteDiv); //agregar al document
    };
};


function createDefaultProject(){

    const containProject = document.querySelector("#contain-project");
    const creteDiv = document.createElement("div");
    creteDiv.innerHTML = `
        <div class="project-box">example project<img class="icon delete-project" src="/assets/trash.svg"></div>
    `
    containProject.prepend(creteDiv)
}

export {runApp, bodySelect, projectArray, createDefaultProject, createDefaultTask, setDOM, getNameProject};