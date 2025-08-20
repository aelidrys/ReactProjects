// import { taskContext } from "./taskContext";
// import { useContext } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { useTheme } from "@mui/material/styles";


export function Task({task, setTaskDone, editTask, deleteTask}){
    // let task = useContext(taskContext);
    let bgColor =  task.status === "done" ? 'green': 'white';
    let textColor =  task.status === "done" ? 'white': '#8bc34a';

    const primary = useTheme().palette.primary;

    return (
        <div className='task' style={{ backgroundColor: primary.dark, color: task.status === "done"? "rgb(113, 194, 20)" : "rgb(224, 224, 224)"}}>
            <Grid  key={task.id} container spacing={2} className='content'
            sx={{borderRadius: '5px', width: '100%'}}
            >
                <Grid  size={8} spacing={4}>
                    <Grid  size={12} style={{fontSize: "25px",
                       }}>
                        {task.name} 
                    </Grid>
                    <Grid  size={12} >
                        <h4 style={{paddingTop: "4px", margin: '0px'}}>{task.detils}</h4>
                    </Grid>
                </Grid>
                <Grid display="flex" alignItems="center" justifyContent="flex-end" gap='8px' size={4}>
                    <Button onClick={() => setTaskDone(task.id)} className="btn done" 
                        style={{backgroundColor: bgColor, color: textColor, border: '2px solid #8bc34a'}}>
                        <CheckOutlinedIcon ></CheckOutlinedIcon >
                    </Button>
                    <Button onClick={() => editTask(task.id)} className="btn edit"
                        style={{backgroundColor: 'white', border: '2px solid #2f8bd6ff', color: '#2f8bd6ff'}}>
                        <EditOutlinedIcon ></EditOutlinedIcon>
                    </Button>
                    <Button onClick={() => deleteTask(task.id)} className="btn delete" style={{backgroundColor: 'white', border: '2px solid red'}}>
                        <DeleteOutlinedIcon color="error"></DeleteOutlinedIcon>
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}