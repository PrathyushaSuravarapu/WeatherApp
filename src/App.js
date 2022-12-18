import {useState } from "react";
import Search from "./Components/Search";
import Weather from "./Components/Weather";
import Forecast from "./Components/Forecast";
import { openWeatherUrl, openApiKey } from "./Api";
import "./Style.css";
const App = ()=> {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [valid, setvalid] = useState("true")
  

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const weatherFetch = fetch(
      `${openWeatherUrl}/weather?lat=${lat}&lon=${lon}&appid=${openApiKey}&units=metric&cnt=7`
    );
    const forecastFetch = fetch(
      `${openWeatherUrl}/forecast?lat=${lat}&lon=${lon}&appid=${openApiKey}&units=metric&cnt=7`
    );
    Promise.all([weatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        setvalid("true")
        setWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch(error => console.log(error))
      setWeather("")
      setForecast("")
  };
  const validCheck = ()=>{
    setvalid("")
  }
  
  return (
    <>
      <center>
        <h1>Weather App</h1>
        
          <Search onSearchChange={handleOnSearchChange} onChange={validCheck}/>
          
          <div className="Prathyu">
            {forecast && valid.length!==0 && <Forecast data={forecast} />}
            {weather && valid.length!==0 &&  <Weather data={weather} />}
        </div>
      <div className="valid"> 
       {valid.length===0 &&<div className = "Notvalid"> <h1> Sorry, No specific data found</h1> </div>} 
      </div>
      </center>
    </>
  );
}

export default App;

