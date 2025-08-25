import Snackbar from "@mui/material/Snackbar"
import SnackbarContent from "@mui/material/SnackbarContent"
import TaskAltIcon from '@mui/icons-material/TaskAlt';


export function SnackBar({open, message, handleClose}){

    let action = (<TaskAltIcon className="snkBarIcon" style={{color: 'white', fontSize: '35px',}}/>)
    return (
        <Snackbar dir='rtl' className="snkBar"
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            >  
          <SnackbarContent
            className="snkBarContent"
            message={message}
            style={{backgroundColor: 'green'}}
            action={action}
            
          />
        </Snackbar>
    )
}