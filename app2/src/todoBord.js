import './App.css';
import { TasksList } from './tasksList.js'
import { useState } from 'react';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';



export function TodoBord(){
    let [status, setStatus] = useState("any")

    function changeStatus(e){
        console.log("Value: ",e.target.value)
        setStatus(e.target.value)
    }
    return (
    <div  className='todoContainer'>
        <h1 style={{fontSize: "50px", height: "60px", margin: "0", padding: "none"}}>مهامي</h1>
        <hr style={{width: "100%"}}></hr>
        <div className="nvbar">
            <ToggleButtonGroup className='nvbar'
                color="primary"
                value={status}
                exclusive
                onChange={changeStatus}
                aria-label=""
            >
                <ToggleButton className='navbrBtn' value="any">
                    الكل
                </ToggleButton>
                <ToggleButton className='navbrBtn' value="done">
                    المنجز
                </ToggleButton>
                <ToggleButton className='navbrBtn' value="todo">
                    الغير منجز
                </ToggleButton>
            </ToggleButtonGroup>
        </div>
        <TasksList status={status} />
    </div>
    )
}