
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
// import { useContext } from "react";
// import { handleClickContext } from "./taskContext";



export function PopUp({open, children}){
  
    // let {popUpHandle} = useContext(handleClickContext)
  
    return (
        <Popper open={open} style={{}} className='poperContainer' dir='rtl'>
          <Box style={{}} className='poperContent'>
            {children}
          </Box>
        </Popper>
    );
}