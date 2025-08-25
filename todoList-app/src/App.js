import './App.css';
import './media.css';
import { TodoBord } from './todoBord.js';
import { handleClickContext } from './contexts/taskContext.js'; 
import { useState } from 'react';
import { SnackBar } from './snackbar.js';
import { PopUp } from './popUp.js';




function App() {

  const [open, setOpen] = useState(false);
  let [message, setMessage] = useState('');
  const showToast = (msg) => {
      setOpen((o) => {return !o});
      setMessage(msg);
  };
  const handleClose = () => {
    setOpen((o) => {return !o});
  }

  let [popContent, setPopContent] = useState((<></>))
  const [popOpen, setPopOpen] = useState(null);
  const popUpHandleClick = (element) => {
    setPopContent(element)
    setPopOpen((o) => {return !o});
  };
  return (
    <div className="parent" dir='rtl'>
      <handleClickContext.Provider value={{showToast: showToast, popUpHandle :popUpHandleClick}}>
        <TodoBord />

        <PopUp open={popOpen}>{popContent}</PopUp>

        <SnackBar open={open} message={message} handleClose={handleClose}/>
      </handleClickContext.Provider>

    </div>
  );
}

export default App;
