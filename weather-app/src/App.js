import Button from '@mui/material/Button';
import './App.css';
import { CityWeather } from './cityWeaher';
import { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';

let API_KEY = "441c9533336230f99f98e46acfc0f4a5"

function App() {
  let [language, setLanguage] = useState("ar")
  let [city, setCity] = useState("jeddah")
  let [data, setData] = useState(null)

  function handleClick(){
    setLanguage((l) => {
      return l === "ar" ? "en": "ar"; 
    })
  }



  useEffect(() => {
    let cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=${language}`;
    axios.get(cityUrl)
    .then((response) => {
        setData(response.data)
    })
    .catch((error) => {
        console.log("Error message: ", error.message)
    });
  }, [city, language])

  return (
    <>
      <CityWeather data={data} dir={language === "ar"? "rtl": "ltr"} lang={language}/>
      <Button variant="contained" color='warning' sx={{margin: "10px", fontSize: '20px'}} 
        onClick={handleClick}>{language === "ar"? "arabe": "إنجليزي"}</Button>
      <TextField variant='filled' sx={{margin:'10px'}} value={city} onChange={(e) => {setCity(e.target.value)}} />
    </>
  );
}

export default App;
