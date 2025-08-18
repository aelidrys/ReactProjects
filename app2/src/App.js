import './App.css';
import { TodoBord } from './todoBord.js';
import { handleClickContext } from './taskContext.js'; 
import { useState } from 'react';
import { SnackBar } from './snackbar.js';
import { PopUp } from './popUp.js';




function App() {

  const [open, setOpen] = useState(false);
  let [message, setMessage] = useState('');
  const informHandleClick = (msg) => {
      setOpen((o) => {return !o});
      setMessage(msg);
    };
  const handleClose = () => {
    setOpen((o) => {return !o});
  }

  let [popContent, setPopContent] = useState((<></>))
  const [popOpen, setPopOpen] = useState(null);
  const popUpHandleClick = (element) => {
    console.log("element: ",element)
    setPopContent(element)
    setPopOpen((o) => {return !o});
  };
  return (
    <div className="parent">
      <handleClickContext.Provider value={{infoHandelClick: informHandleClick, popUpHandle :popUpHandleClick}}>
        <TodoBord />

      <PopUp open={popOpen}>{popContent}</PopUp>

        <SnackBar open={open} message={message} handleClose={handleClose}/>
      </handleClickContext.Provider>

    </div>
  );
}

export default App;
