import './App.css';
import { TasksList } from './tasksList.js'
import { useState } from 'react';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';



export function TodoBord(){
    let [status, setStatus] = useState("any")

    function changeStatus(e){
        setStatus(e.target.value)
    }
    return (
        <div  className='todoContainer'>
            <h1 className='todoTitle' style={{margin: '0px',fontSize: "50px", height: "60px", padding: "0"}}>مهامي</h1>
            <hr style={{width: "100%"}}></hr>
            <div className="nvbar">
                <ToggleButtonGroup
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