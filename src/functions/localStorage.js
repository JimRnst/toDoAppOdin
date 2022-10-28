import { createDefaultProject, getNameProject, projectArray, runApp,setDOM } from "./projectsAdd";
import { showTask, createDefaultTask, selectTask } from "./task";



function localStorageReview(){

    if(localStorage.length === 0){
        createDefaultProject();
        createDefaultTask();
    } else{
        projectArray = JSON.parse(localStorage.getItem("project"));

        projectArray.map(object => {object.status = false})
        projectArray[0].status = true;

        const indexStatus = projectArray.map(object => object.status).indexOf(true);
        
        getNameProject(projectArray[indexStatus].name);

        projectArray.map(object => {
            setDOM(object.name);
        });

        projectArray[indexStatus].tasks.map(task => {
            showTask(task.name, task.date);
        });

        selectTask()
    }

};

export default localStorageReview