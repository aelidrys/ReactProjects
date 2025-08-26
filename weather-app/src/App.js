import Button from '@mui/material/Button';
import './App.css';
import './media.css';
import { CityWeather } from './cityWeaher';
import { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import moment from 'moment'
import 'moment/min/locales';


let API_KEY = "441c9533336230f99f98e46acfc0f4a5"

function App() {
  let [language, setLanguage] = useState("ar")
  let [city, setCity] = useState("jeddah")
  let [cityInput, setCityInput] = useState(city)
  let [data, setData] = useState(null)
  let [open, setOpen] = useState(false)
  let [dateTime, setDateTime] = useState("")

  function handleClose(){
    setOpen(false);
  }
  function handleClick(){
    setLanguage((l) => {
      return l === "ar" ? "en": "ar"; 
    })
  }


  moment.locale(language)
  useEffect(() => {
    setDateTime(moment().format("MMM-DD-YYYY"))
    let cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=${language}`;
    axios.get(cityUrl)
    .then((response) => {
        setData(response.data)
    })
    .catch((error) => {
        console.log("Error message: ", error.message)
        setOpen(true)
    });
  }, [city, language])

  return (
    <>
      <CityWeather data={data} dateTime={dateTime} lang={language}/>
        <Grid container spacing={2} sx={{margin:'10px'}}>
          <Grid size={3}>
            <Button variant="contained" color='warning' sx={{fontSize: '20px'}} 
              onClick={handleClick}>{language === "ar"? "إنجليزي": "arabe"}</Button>
          </Grid>
          <Grid className="searchBar" size={9} sx={{borderRadius: "5px",  backgroundColor: "#1565c0"}}
            display='flex' justifyContent="space-between">
            <TextField variant='filled' sx={{width: "90%"}} value={cityInput} onChange={(e) => {setCityInput(e.target.value)}}/>
            <IconButton color='warning' onClick={() => {setCity(cityInput)}}>
              <SearchIcon  sx={{margin: "0px 5px", fontSize: "30px"}}/>
            </IconButton>
          </Grid>
        </Grid>
        <Snackbar 
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          message="City Not Found"
        />

    </>
  );
}

export default App;
