import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import Button from '@mui/material/Button';
import { TasksList } from './tasksList.js'



export function TodoBord(){
    return (
    <div  className='todoContainer'>
        <h1 style={{fontSize: "50px", height: "60px", margin: "0", padding: "none"}}>مهامي</h1>
        <hr style={{width: "100%"}}></hr>
        <div className="nvbar">
            <Link to='/tasks/all'>
                <Button   className='navbrBtn'>
                    الكل
                </Button>
            </Link>
            <Link to='/tasks/done'>
                <Button  className='navbrBtn' style={{}}>
                    منجز
                </Button>
            </Link>
            <Link to="/tasks/todo">
                <Button className='navbrBtn active'  style={{}}>
                    غير منجز
                </Button>
            </Link>
        </div>

        <Routes>
            <Route path='/' element={<TasksList status={'any'}/>}/>
            <Route path='/tasks'>
            <Route path='all' element={<TasksList status={'any'}/>}/>
            <Route path='done' element={<TasksList status={'done'}/>}/>
            <Route path='todo' element={<TasksList status={'todo'}/>}/>
            </Route>
            <Route path='*' element={<h2 style={{textAlign: "center", marginTop: '50px'}}>404 Page Not Found</h2>}/>
        </Routes>
    </div>
    )
}