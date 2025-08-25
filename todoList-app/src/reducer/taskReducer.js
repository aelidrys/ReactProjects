
let intial_tasks = [
    {id: 1, title: "قراءة كتاب", status: "done", detils: "خلال شهر"},
    {id: 2, title: "حل مسألة رياضية", status: "todo", detils: ""},
    {id: 3, title: "تعلم مهارة جديدة", status: "todo", detils: ""},
    {id: 4, title: "ممارسة الرياضة", status: "todo", detils: ""},
]



export function taskReducer(currentTasks, action){

    switch (action.type) {
        case "addTask": {
            let newTask = {
                id: action.pyload.id,
                title: action.pyload.taskTitle,
                detils: "",
                status: "todo",
            }
            let updatedTasks = [...currentTasks, newTask];
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
            return updatedTasks
        }
        case "toglleTaskStatus": {
            let updatedTasks = currentTasks.map((task) => {
                if (task.id === action.pyload.id){
                    let taskStatus = task.status === "done"? "todo": "done";
                    let updatedTask = {...task, status: taskStatus };
                    return updatedTask
                }
                return task
            })
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
            return updatedTasks;
        }
        case "deleteTask": {
            let updatedTasks = currentTasks.filter((task) => {return task.id !== action.pyload.taskId})
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
            return updatedTasks;
        }
        case "editTask": {

            let updatedTasks = currentTasks.map((task) => {
                if (task.id === action.pyload.taskId){
                    task.title = action.pyload.taskTitle;
                    task.detils = action.pyload.taskDetils;
                }
                return task;
            })
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
            return updatedTasks;
        }
        case "initTasks": {
            let storedTasks = []
            try{

                storedTasks =  JSON.parse(localStorage.getItem('tasks')) ?? intial_tasks;
            }
            catch {
                return intial_tasks
            }
            return storedTasks
        }
        default : {
            throw Error("Unkown Action: ", action.type)
        }
    }

}

