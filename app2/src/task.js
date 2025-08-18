import { taskContext } from "./taskContext";
import { useContext } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { useTheme } from "@mui/material/styles";


export function Task({setTaskDone, editTask, deleteTask}){
    let task = useContext(taskContext);
    let bgColor =  task.status === "done" ? 'green': 'white';
    let textColor =  task.status === "done" ? 'white': 'green';
    // console.log("bgColor: ", bgColor)
    // console.log("task: ", task)

    const primary = useTheme().palette.primary;

    let nvbar = document.querySelector('.nvbar');
    let nvbarBtns = document.querySelectorAll('.nvbar Button');
    if (nvbar){
        
        nvbar.addEventListener("click", (e) => {
            if (e.target.tagName === "BUTTON") {
                nvbarBtns.forEach(element => {
                    if (element === e.target) {
                        element.classList.add('active');
                    } else {
                        element.classList.remove('active');
                    }
                });
            }
        });
    }

    return (
        <div className='task' style={{ backgroundColor: primary.dark,}}>
            <Grid  key={task.id} container spacing={2} className='content'
            sx={{borderRadius: '5px', width: '100%'}}
            >
                <Grid  size={8} >
                    <Grid  size={12} style={{fontSize: "25px"}}>
                        {task.name} 
                    </Grid>
                    <Grid  size={12} >
                        <h4 style={{margin: '0px',}}>{task.detils}</h4>
                    </Grid>
                </Grid>
                <Grid display="flex" alignItems="center" justifyContent="flex-end" gap='8px' size={4}>
                    <Button onClick={() => setTaskDone(task.id)} className="btn done" style={{backgroundColor: bgColor, color: textColor, border: '1px solid green'}}>
                        <CheckOutlinedIcon ></CheckOutlinedIcon >
                    </Button>
                    <Button onClick={() => editTask(task.id)} className="btn edit" style={{backgroundColor: 'white', border: '1px solid cyan'}}>
                        <EditOutlinedIcon color="action"></EditOutlinedIcon>
                    </Button>
                    <Button onClick={() => deleteTask(task.id)} className="btn delete" style={{backgroundColor: 'white', border: '1px solid red'}}>
                        <DeleteOutlinedIcon color="error"></DeleteOutlinedIcon>
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}