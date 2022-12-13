import { createDefaultProject, getNameProject, projectArray, runApp,setDOM } from "./projectsAdd";
import { showTask, createDefaultTask, selectTask } from "./task";



function localStorageReview(){

    if(localStorage.length === 0){
        createDefaultProject();
        createDefaultTask();
    } else{
        projectArray = JSON.parse(localStorage.getItem("project"));

        projectArray.filter(todo => todo).forEach(todo => todo.status = false);
        
        projectArray[0].status = true;
        
        getNameProject(projectArray.find(({status}) => status === true).name);

        projectArray.filter(todo => setDOM(todo.name));

        projectArray.find(({status}) => status === true).tasks.forEach(task => showTask(task.name, task.date));

        selectTask();
    }

};

export default localStorageReview