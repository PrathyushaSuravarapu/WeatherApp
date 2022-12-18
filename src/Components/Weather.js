import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import '../Style.css'
import pressure from '../Images/pressure.svg'
import wind_speed from '../Images/wind_speed.svg'
import humidity from '../Images/humidity.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 60,
    padding: 15,
    marginLeft:10,
  },
  card: {
    padding: theme.spacing(2),
  },
  section: {
    height: "100%",
    paddingTop: 5,
    backgroundColor: 'rgba(5,4,2,0.1)',
  },
  icon: {
    width: 22,
    height: 22,
    alignSelf: 'center',
    marginRight: 4,
    marginLeft: 20,
  },
  weather: {
    width: 90,
    height: 75,
    Top: 0,
  },
  main: {
    overflow: 'auto',
    padding: 5,
  },
  span: {
    fontWeight: 'bold',
  }
}));

const Weather = ({ data }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid>
        <Grid className="grid-box2" >
        <Card className={classes.section} >
          <CardContent>
            <div className={classes.main}>
              <div >
                <img src={`icons/${data.weather[0].icon}.png`} alt="Logo" className={classes.weather} />
                <Typography variant="h4" gutterBottom >
                  {Math.round(data.main.temp)}°C
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {data.weather[0].main}  ,  {data.weather[0].description}
                </Typography>
              </div>
            </div>
              <div>
              <img src={pressure} alt="Logo" className={classes.icon} /><span className={classes.span}>{data.main.pressure} hpa</span>
                <img src={humidity} alt="Logo" className={classes.icon} /><span className={classes.span}>{data.main.humidity} %</span>
                <img src={wind_speed} alt="Logo" className={classes.icon} /><span className={classes.span}>{data.wind.speed} m/s N</span>
              </div>
          </CardContent>
        </Card>
        </Grid>
        </Grid>
        
    </div>
    
  );
};

export default Weather
