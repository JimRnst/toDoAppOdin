import { showTask, createDefaultTask, createTask, addTask, selectTask } from "./task";


const bodySelect = document.querySelector("body");
const contentMain = document.querySelector("#content-main");

let projectArray = [];

// crear objeto
export class Project{
    constructor(name, tasks){
        this.name = name;
        this.tasks = [];
        this.status = false;
    }
}

function runApp(){
    addTask();
    bodySelect.addEventListener("click", (e) => {

        if(e.target.className === "project-box"){
           
                const index = projectArray.map(object => object.name).indexOf(e.target.innerText);
                const indexStatus = projectArray.map(object => object.status).indexOf(true);
                contentMain.innerHTML = "";
                if(projectArray[index].status === false){
                    projectArray.map(object => {object.status = false})
                    projectArray[index].status = true;

                    projectArray[index].tasks.map(task => {
                        showTask(task.name, task.date)
                    });
                    selectTask();
                } else{
                    projectArray[indexStatus].tasks.map(task => {
                        showTask(task.name, task.date);
                    });
                    selectTask();
                }
                getNameProject(projectArray[index].name);
            
        };

        if(e.target.id === "btn-add"){
            overlay();
        };

        if(e.target.className === "fa-solid fa-x"){
            removeOverlay();
        };

        if(e.target.id === "submit"){
            const getName = document.querySelector("#productName");
            if(getName.value === ""){
                alert("Please, set a project name");
            } else{
                contentMain.innerHTML = "";
                createNewProject(getName.value, "array");
                removeOverlay();
                const index = projectArray.map(object => object.name).indexOf(getName.value);
                //convierte el status del proyecto agregado en true, y los demas en false
                if(projectArray[index].status === false){
                    projectArray.map(object => {object.status = false})
                    contentMain.innerHTML = "";
                    projectArray[index].status = true;
                }
                
                if(projectArray[index].tasks.length === 0){
                    contentMain.innerHTML = "";
                    createTask(index, `${getName.value} example task`, `${getName.value} example date`);
                    showTask(`${getName.value} example task`, `${getName.value} example date`)
                    selectTask();
                };

                localStorage.setItem("project", JSON.stringify(projectArray))
            };

        };

        if(e.target.classList.contains("delete-project")){
            const index = projectArray.map(object => object.name).indexOf(e.target.parentElement.innerText) //Search project name in array

            if(projectArray[index].status === true){
            
                if(projectArray.length>1){

                    if(e.target.parentElement.id >= 1){
                        projectArray.map(object => {object.status = false})
                        projectArray[parseInt(e.target.parentElement.id)-1].status = true;
                    } 
                    
                    
                   if(e.target.parentElement.id == 0){
                        projectArray[parseInt(e.target.parentElement.id)+1].status = true;
                   }

                    projectArray.splice(index, 1); //delete project of array
                    document.getElementById(e.target.parentElement.id).remove(); //remove of DOM
                    
                }
              
                const indexStatus = projectArray.map(object => object.status).indexOf(true);
                console.log(indexStatus)
                getNameProject(projectArray[indexStatus].name);
                projectArray[indexStatus].tasks.map(task => {
                    contentMain.innerHTML = "";
                    showTask(task.name, task.date)
                });

                localStorage.setItem("project", JSON.stringify(projectArray));
            } else{

                if(projectArray.length>1){
                    projectArray.splice(index, 1); //delete project of array
                    document.getElementById(e.target.parentElement.id).remove(); //remove of DOM
                    localStorage.setItem("project", JSON.stringify(projectArray));
                };
            };
        };
    });

};

function overlay(){
    const creteDiv = document.createElement("div");
    creteDiv.setAttribute("id", "overlay");
     creteDiv.innerHTML = `
         <div id="card-add-new-project">
             <div id="close"><i class="fa-solid fa-x"></i></div>
             <div id="card-title">Project Name</div>
             <div id="card-sub">Max length: 20</div>
             <input type="text" name="productName" id="productName" maxlength="20" autofocus>
             <div id="btn-submit">
                 <button id="submit">Submit</button>
             </div>
         </div>
     `
    bodySelect.prepend(creteDiv);

    const inputForm = document.querySelector("#productName");
    inputForm.addEventListener("keyup", () => {
        const validate = projectArray.map(object => object.name).indexOf(inputForm.value)
        if(validate >= 0){
            alert("This project name is already exist")
        }
    })
};

function removeOverlay(){
    const deleteAll = document.getElementById("overlay");
    deleteAll.remove();
};

function createNewProject(name){
    const projectName = new Project(`${name}`, "task");
    projectArray = [...projectArray, projectName]; //usando spreed operator .push() es posible
    setDOM(projectName.name);
    getNameProject(projectName.name);
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
            <span>${projectArray[i].name}</span><i id="" class="fa-solid fa-trash delete-project">
        `;

        //<i class="fa-solid fa-trash">

        projectBox.appendChild(creteDiv); //agregar al document
    };
};


function createDefaultProject(){

    const containProject = document.querySelector("#contain-project");
    const creteDiv = document.createElement("div");
    creteDiv.innerHTML = `
        <div class="project-box">example project<i class="fa-solid fa-trash"></i></div>
    `
    containProject.prepend(creteDiv)
}

export {runApp, bodySelect, projectArray, createDefaultProject, createDefaultTask, setDOM, getNameProject};


// <div class="project">Project 1 <i class="fa-solid fa-trash"></i></div>