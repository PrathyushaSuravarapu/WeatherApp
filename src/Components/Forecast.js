import React from "react";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Sunrise from '../Images/Sunrise.svg'
import Sunset from '../Images/Sunset.svg'
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./Forecast.css";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 60,
    padding: 15,
  },
  card: {
    padding: theme.spacing(2),
  },
  section: {
    height: "100%",
    paddingTop: 5,
    backgroundColor: 'rgba(5,4,2,0.1)',
  },
  main: {
    overflow: 'auto',
    padding: 5,
  },
  icon: {
    width: 22,
    height: 22,
    alignSelf: 'center',
    marginRight: 4,
    marginLeft: 20,
  },
  spacing: {
width :400
  }
}));
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'Nocvember',
  'December',
]
const Days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Forecast = ({ data }) => {
  const currentDate = new Date()
  const date = `${Days[currentDate.getDay()]} ${currentDate.getDate()} ${
    months[currentDate.getMonth()]
  }`;
  const sunset = new Date(data.city.sunset * 1000).toLocaleTimeString().slice(0, 4)
  const sunrise = new Date(data.city.sunrise * 1000).toLocaleTimeString().slice(0, 4)
  const dayInAWeek = new Date().getDay();
  const forecastDays = Days.slice(dayInAWeek, Days.length).concat(Days.slice(0, dayInAWeek));
  const classes = useStyles();
  return (
    <>
    <center>
    <div className={classes.root}>
        <Grid className="grid-box1" >
        <Card className={classes.section} >
        <CardContent >
            <Typography variant="h4" gutterBottom>
            {data.city.name},{data.city.country}
            </Typography>
            <Typography variant="h5" gutterBottom>
                {date}
            </Typography>
            <Typography variant="h6" gutterBottom>
                Population: {data.city.population.toLocaleString()}
            </Typography>
                <Typography variant="h6" gutterBottom>
                  Sunrise:<img src={Sunrise} alt="Logo" className={classes.icon} />{sunrise} A.M
                  </Typography>
                <Typography variant="h6" gutterBottom>
                Sunset:<img src={Sunset} alt="Logo" className={classes.icon} />{sunset} P.M
                </Typography>
        </CardContent>
        </Card> 
         </Grid>
        </div><br/><br/>
        <div className="forecast">
          {/* <Card className={classes.section}> */}
            <label className="title">Daily Forecast</label><br/>
      <Accordion allowZeroExpanded>
        {data.list.slice(0, 7).map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="day-box">
                  <img src={`icons/${item.weather[0].icon}.png`} className="icon" alt="Logo" />
                  <label className="day">{forecastDays[idx]}</label>
                  <label className="description">({item.weather[0].description})</label>
                  <label className="temp">{Math.round(item.main.temp_max)}°C - {Math.round(item.main.temp_min)}°C</label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="grid">
                <div className="grid-element">
                  <label>Pressure: </label>
                 <label>{item.main.pressure}hpa</label>
                </div>
                <div className="grid-element">
                  <label>Humidity: </label>
                  <label>{item.main.humidity}%</label>
                </div>
                <div className="grid-element">
                  <label>Clouds:</label>
                  <label>{item.clouds.all}%</label>
                </div>
                <div className="grid-element">
                  <label>Wind speed:</label>
                  <label>{item.wind.speed} m/s</label>
                </div>
                <div className="grid-element">
                  <label>Sea level:</label>
                  <label>{item.main.sea_level}m</label>
                </div>
                <div className="grid-element">
                  <label>Feels like:</label>
                  <label>{item.main.feels_like}°C</label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
      {/* </Card> */}
      </div>
      </center>
    </>
  );
};
      

export default Forecast;
