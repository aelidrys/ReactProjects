import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import { useState } from "react";
import Button from "@mui/material/Button";
import { taskContext } from "./taskContext";
import { Task } from "./task";
import { useContext } from "react";
import { handleClickContext } from "./taskContext";
import TextField from "@mui/material/TextField";





let intial_tasks = [
    {id: 1, name: "قراءة كتاب", status: "done", detils: "خلال شهر"},
    {id: 2, name: "حل مسألة رياضية", status: "todo", detils: ""},
    {id: 3, name: "تعلم مهارة جديدة", status: "todo", detils: ""},
    {id: 4, name: "ممارسة الرياضة", status: "todo", detils: ""},
]

export function TasksList({status}){
    let [tasks, setTasks] = useState(intial_tasks)
    let {infoHandelClick, popUpHandle} = useContext(handleClickContext);

    function setTaskDone(taskId){
        infoHandelClick("تم التعديل بنجاح")
        setTasks(tasks.map((task) => {
            if (task.id === taskId)
                task.status = task.status === "todo" ? "done": "todo";
            return task
        }))
    }
    function editTask(taskId){
        let task = tasks.find((element) => element.id===taskId)
        console.log(taskId)
        console.log(task)
        let elem = (<>
            <TextField
                sx={{
                    "& .MuiInputBase-root": {
                    fontSize: "25px",
                    },
                    "& .MuiInputLabel-root": {
                    fontSize: "25px",
                    }
                }}
                label="العنوان"
                defaultValue={task.name}
                size="medium"
                variant="standard"
                id="title"
            />
            <TextField
                sx={{
                    "& .MuiInputBase-root": {
                    fontSize: "25px",
                    },
                    "& .MuiInputLabel-root": {
                    fontSize: "25px",
                    }
                }}
                label="التفاصيل"
                defaultValue={task.detils}
                variant="standard"
                id="detils"
            />
            <div style={{width: "95%", display: 'flex', justifyContent: 'flex-end', padding: '10px'}}>
                <Button style={{color: "purple", fontSize: '20px'}} 
                    onClick={popUpHandle}>
                    إلغاء
                </Button>
                <Button style={{color: "purple", fontSize: '20px'}} 
                    onClick={()=>{
                        let title = document.getElementById('title').value
                        let detils = document.getElementById('detils').value
                        console.log("title: ",title)
                        console.log(title.value)
                        setTasks(tasks.map((task) => {
                            if (task.id === taskId){
                                task.name = title
                                task.detils = detils
                            }
                            return task
                        }))
                        popUpHandle()
                        infoHandelClick("تم التعديل بنجاح")
                    }}>
                    تعديل
                </Button>
            </div>
        </>)
        popUpHandle(elem)
    }
    function deleteTask(taskId){
        let elem = (<>
            <h3>هل أنت متأكيد من رغبة في جذف هذه المهمة؟</h3>
            <h4>بمجرد حذف المهمة لن تتمكن من إسترجاعها</h4>
            <div style={{width: "95%", display: 'flex', justifyContent: 'flex-end', padding: '10px'}}>
                <Button style={{color: "purple", fontSize: '20px'}} 
                    onClick={popUpHandle}>
                    إلغاء
                </Button>
                <Button style={{color: "purple", fontSize: '20px'}} 
                    onClick={()=>{
                        setTasks(tasks.filter((task) => {
                            return task.id !== taskId
                        }))
                        popUpHandle()
                        infoHandelClick("تم الحدف بنجاح")
                    }}>
                    حذف المهمة
                </Button>
            </div>
        </>)
        popUpHandle(elem)
        
    }


    let tastsList = tasks.map((task) => {
        if (task.status === status || status === "any")
            return (
                <taskContext.Provider key={task.id}  value={task}>
                    <Task setTaskDone={setTaskDone} editTask={editTask} deleteTask={deleteTask}/>
                </taskContext.Provider>
            )
    } )

    function addTask(){
        let taskName = document.getElementById("newTask").value;
        console.log("Name: ",taskName)
        if (taskName)
            setTasks([...tasks, {id: tasks[tasks.length-1].id+1, name: taskName, status: 'todo', deadline: ""}]);
    }


    return (
    <div dir='rtl' style={{width: "100%",}}>
        <Stack spacing={3}>
            {tastsList}
        </Stack>
        <Grid container spacing={4} style={{marginTop: '20px'}}>
            <Grid size={8} style={{}}>
                <input id="newTask" type="text" placeholder="عنوان المهمة" style={{
                    border: '1px solid black',
                    width: "100%", height: "100%", 
                    color: 'balck', fontSize:"25px",
                    padding: "0px 5px"
                }}/>
            </Grid>
            <Grid onClick={addTask} size={4} style={{ backgroundColor: 'maroon', borderRadius: '6px', padding: "0px"}}>
                <Button style={{color: 'white', padding: "10px", width: '100%', height: '100%', textAlign: "center", fontSize:"25px"}}>إضافة</Button>
            </Grid>
        </Grid>
    </div>
    )
}
