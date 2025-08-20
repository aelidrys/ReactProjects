import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import { useState } from "react";
import Button from "@mui/material/Button";
// import { taskContext } from "./taskContext";
import { Task } from "./task";
import { useContext, useEffect } from "react";
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
    let [taskTitle, setTaskTitle] = useState('')
    let {infoHandelClick, popUpHandle} = useContext(handleClickContext);

    useEffect(() => {
        let storedTasks = JSON.parse(localStorage.getItem('tasks')) ?? intial_tasks;
        console.log("tasks", storedTasks)
        setTasks(storedTasks)
    }, [])


    function setTaskDone(taskId){
        let updatedTasks = tasks.map((task) => {
            if (task.id === taskId)
                task.status = task.status === "todo" ? "done": "todo";
            return task
        })
        setTasks(updatedTasks)
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        infoHandelClick("تم التعديل بنجاح")
    }
    function editTask(taskId){
        let task = tasks.find((element) => element.id===taskId)

        let elem = (<>
            <h2 style={{width:'100%', textAlign: 'center'}}>تعديل المهمة </h2>
            <TextField
                sx={{
                    "& .MuiInputBase-root": {
                    fontSize: "25px",
                    },
                    "& .MuiInputLabel-root": {
                    fontSize: "25px",
                    }
                }}
                label="العنوان" defaultValue={task.name} size="medium" variant="standard" id="title"
            />
            <TextField
                sx={{
                    marginTop: '10px',
                    "& .MuiInputBase-root": {
                    fontSize: "25px",
                    },
                    "& .MuiInputLabel-root": {
                    fontSize: "25px",
                    }
                }}
                label="التفاصيل" defaultValue={task.detils} variant="standard" id="detils"
            />
            <div style={{width: "100%", display: 'flex', justifyContent: 'flex-end', marginTop: "10px"}}>
                <Button style={{color: "rgb(165, 63, 248)", fontSize: '20px'}} 
                    onClick={popUpHandle} sx={{"&:hover": {backgroundColor: "rgba(165, 63, 248, 0.6)",color: 'white !important'}}}>
                    إلغاء
                </Button>
                <Button style={{marginRight: '5px', color: "rgba(91, 187, 27, 0.99)", fontSize: '20px'}} 
                    onClick={()=>{
                        let title = document.getElementById('title').value
                        let detils = document.getElementById('detils').value
                        if (!title)
                            return
                        let updatedTasks = tasks.map((task) => {
                            if (task.id === taskId){
                                task.name = title
                                task.detils = detils
                            }
                            return task
                        })
                        setTasks(updatedTasks)
                        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
                        popUpHandle()
                        infoHandelClick("تم التعديل بنجاح")
                    }}
                    sx={{"&:hover": {backgroundColor: "rgba(91, 187, 27, 0.7)",color: 'white !important'}}}>
                    تعديل
                </Button>
            </div>
        </>)
        popUpHandle(elem)
    }
    function deleteTask(taskId){
        let elem = (<>
            <h2>هل أنت متأكد من رغبة في حذف هذه المهمة؟</h2>
            <h4 style={{color: 'gray'}}>بمجرد حذف المهمة لن تتمكن من إسترجاعها</h4>
            <div  style={{width: "100%", display: 'flex', justifyContent: 'flex-end'}}>
                <Button style={{color: "rgb(165, 63, 248)", fontSize: '20px'}} 
                    onClick={popUpHandle} sx={{"&:hover": {backgroundColor: "rgba(165, 63, 248, 0.6)",color: 'white !important'}}}>
                    إلغاء
                </Button>
                <Button sx={{"&:hover": {backgroundColor: "rgba(241, 25, 25, 0.6)", color: 'white !important'}}}  
                    style={{color: "rgba(241, 25, 25, 0.8)", marginRight: '5px', fontSize: '20px'}} 
                    onClick={()=>{
                        let updatedTasks = tasks.filter((task) => {return task.id !== taskId})
                        setTasks(updatedTasks)
                        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
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
                <Task key={task.id} task={task} setTaskDone={setTaskDone} editTask={editTask} deleteTask={deleteTask}/>
            )
        return <></>
    } )

    function addTask(){
        console.log("Name: ",taskTitle)
        if (taskTitle){
            let updatedTasks = [...tasks, {id: tasks[tasks.length-1].id+1, name: taskTitle, status: 'todo', deadline: ""}];
            setTasks(updatedTasks);
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        }
    }


    return (
    <div dir='rtl' style={{width: "100%",}} >
        <Stack spacing={3} style={{}} className="tasksContainer" >
            {tastsList}
        </Stack>
        <Grid container spacing={4} style={{marginTop: '20px'}}>
            <Grid size={8} style={{borderRadius: '16px'}}>
                <input id="newTask" type="text" placeholder="عنوان المهمة" style={{
                    border: '1px solid black', borderRadius: '6px',
                    width: "100%", height: "100%", 
                    color: 'balck', fontSize:"25px",
                    padding: "0px 8px"
                }} onChange={(e) => {setTaskTitle(e.target.value)}}/>
            </Grid>
            <Grid onClick={addTask} size={4} style={{ borderRadius: '6px', padding: "0px"}}>
                <Button disabled={taskTitle.length === 0} color="add"  variant="contained" sx={{"&:hover": {backgroundColor: "rgb(104, 17, 17)"}}}
                    style={{color: 'white', padding: "10px", width: '100%', height: '100%',
                    textAlign: "center", fontSize:"25px"}}>إضافة</Button>
            </Grid>
        </Grid>
    </div>
    )
}
