import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import { useMemo, useState } from "react";
import Button from "@mui/material/Button";

import { Task } from "./task";
import { useContext, useEffect } from "react";
import { handleClickContext } from './contexts/taskContext.js';
import TextField from "@mui/material/TextField";
import { TaskOperationsProvider } from "./contexts/taskOperations";
import { useReducer } from "react";
import { taskReducer } from "./reducer/taskReducer.js";






export function TasksList({status}){
    let [tasks, dispatch] = useReducer(taskReducer, [])
    let [taskTitle, setTaskTitle] = useState('')
    let {showToast, popUpHandle} = useContext(handleClickContext);

    useEffect(() => {
        dispatch({type: "initTasks"})
    }, [])


    function setTaskDone(task){
        dispatch({type: "toglleTaskStatus", pyload: task})
        showToast("تم تعديل المهمة بنجاح")
    }
    function editTask(task){

        let elem = (<>
            <h2 style={{width:'100%', textAlign: 'center'}}> تعديل المهمة </h2>
            <TextField
                sx={{ "& .MuiInputBase-root": {backgroundColor: "transparent"} }}
                label="العنوان" defaultValue={task.title} size="medium" variant="standard" id="title" />
            <TextField sx={{ "& .MuiInputBase-root": {backgroundColor: "transparent"} }}
                label="التفاصيل" defaultValue={task.detils} variant="standard" id="detils" />
            
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
                        dispatch({type: "editTask", pyload: {taskId: task.id, taskTitle: title, taskDetils: detils}})
                        popUpHandle()
                        showToast("تم تعديل المهمة بنجاح")
                    }}
                    sx={{"&:hover": {backgroundColor: "rgba(91, 187, 27, 0.7)",color: 'white !important'}}}>
                    تعديل
                </Button>
            </div>
        </>)
        popUpHandle(elem)
    }
    function deleteTask(task){
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
                        dispatch({type: "deleteTask", pyload: {taskId: task.id}})
                        popUpHandle()
                        showToast("تم حذف المهمة بنجاح")
                    }}>
                    حذف المهمة
                </Button>
            </div>
        </>)
        popUpHandle(elem)
        
    }


    let completedTasts = useMemo(() => {
        return tasks.filter((task) => {
            return (task.status === "done")
        })
    }, [tasks])
    let notCompletedTasts = useMemo(() => {
        return tasks.filter((task) => {
            return (task.status === "todo")
        })
    }, [tasks])

    let tasksToBeRendred = tasks
    if (status === "done")
        tasksToBeRendred = completedTasts
    if (status === "todo")
        tasksToBeRendred = notCompletedTasts

    let JsxTasksList = tasksToBeRendred.map((task) => {
        return (
            <Task key={task.id} task={task}/>
        )
    })

    function addTask(){
        let taskId = tasks.length ? tasks[tasks.length-1].id+1: 1
        if (taskTitle){
            dispatch({type: 'addTask', pyload: {id: taskId, taskTitle: taskTitle}})
            setTaskTitle("")
            showToast("تمت إضافة المهمة بنجاح")
        }
    }


    return (
        <div dir='rtl' style={{width: "100%",}} >
            <Stack spacing={3} style={{}} className="tasksContainer" >
                <TaskOperationsProvider value={{setTaskDone: setTaskDone, editTask: editTask, deleteTask: deleteTask}}>
                    {JsxTasksList}
                </TaskOperationsProvider>
            </Stack>
            <Grid container spacing={4} style={{marginTop: '20px'}}>
                <Grid size={8}  style={{borderRadius: '16px'}}>
                    <TextField  value={taskTitle} className="addTaskTitle" label="عنوان المهمة" variant="outlined" 
                        onChange={(e) => {setTaskTitle(e.target.value)}}/>
                </Grid>
                <Grid onClick={addTask} size={4} style={{ borderRadius: '6px', padding: "0px"}}>
                    <Button className="addTaskTitleBtn" disabled={taskTitle.length === 0} color="add"  variant="contained" sx={{"&:hover": {backgroundColor: "rgb(104, 17, 17)"}}}
                        style={{color: 'white', padding: "10px", width: '100%', height: '100%',
                        textAlign: "center", fontSize:"25px"}}>إضافة</Button>
                </Grid>
            </Grid>
        </div>
    )
}
