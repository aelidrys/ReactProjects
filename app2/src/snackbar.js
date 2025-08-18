import Snackbar from "@mui/material/Snackbar"
import SnackbarContent from "@mui/material/SnackbarContent"
import TaskAltIcon from '@mui/icons-material/TaskAlt';


export function SnackBar({open, message, handleClose}){

    let action = (<TaskAltIcon style={{color: 'white', fontSize: '35px'}}/>)
    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            >  
          <SnackbarContent
            className="snkBar"
            message={message}
            style={{backgroundColor: 'green'}}
            action={action}
          />
        </Snackbar>
    )
}