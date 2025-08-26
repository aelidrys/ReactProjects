import Grid from "@mui/material/Grid";
import CloudIcon from '@mui/icons-material/Cloud';
import CircularProgress from "@mui/material/CircularProgress";



export function CityWeather({data, dateTime, lang}){

    
    let iconCode = data?.weather[0]?.icon;
    let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    let dir = lang === "ar"? "rtl": "ltr"

    return (
        <>
            <Grid dir={dir} className="weatherCard" sx={{bgcolor: "#1565c0"}} container spacing={2}>
                <Grid display="flex" alignItems="end" size={12} sx={{borderBottom: "1px solid white"}}>
                    <h1 style={{margin: '3px', marginBottom: "2px", fontSize: "60px"}}>{data?.name}</h1>
                    <span className="date" style={{margin: '30px', marginBottom: "10px"}}>{dateTime}</span>
                </Grid>

                <Grid display="flex" alignItems="flex-start" flexDirection="column" size={6} sx={{}}>
                    {(data && (<>
                        <div className="temp" style={{fontSize: "60px", margin: "10px", display: "flex", alignItems: "center"}}>
                            {(data?.main?.temp-273).toFixed(0)}
                            <img src={iconUrl} alt="Loading..." />
                        </div>
                        <h4 style={{margin: "10px"}}>{data?.weather[0].description}</h4>
                        <div className="exTempDiv" style={{fontSize: "20px", margin: "10px", display: "flex", gap: "10px"}}>
                            <span className="exTemp">{dir==="ltr" ?"max:": "الكبرى:"} {(data?.main?.temp_max-272.15).toFixed(0)}</span>
                            |<span className="exTemp">{dir==="ltr" ?"min:": "الصغرى:"} {(data?.main?.temp_min-272.15).toFixed(0)}</span>
                        </div>
                    </>)) ||  (
                        <CircularProgress
                            size={68}
                            sx={{
                            color: 'white',
                            }}
                        />
                    )}
                </Grid>
                <Grid size={6} display='flex' justifyContent="center">
                    <CloudIcon className="cloud" sx={{fontSize: "200px"}}></CloudIcon>
                </Grid>
            </Grid>
        </>
    )
}