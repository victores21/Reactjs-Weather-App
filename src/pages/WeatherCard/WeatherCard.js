import React, { useState, useEffect } from 'react';
import "./WeatherCard.css";


const WeatherCard = () => {

    const [weather, setWeather] = useState({
        data: null,
        loading: true
    })
    const place = "Adelaide";
    const fetchData = async () => {

        const query = `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=4b4754a65698bacce3396cc517e79381`;
        const req = await fetch(query);
        const data = await req.json();

        let newState = []
        for (let i = 0; i < data.list.length; i++) {
            if (i % 8 === 0) {
                newState.push(data.list[i]);
            }
        }

        setWeather({ data: newState, loading: false })

    }

    useEffect(() => {
        fetchData();
    }, [])

    if (weather.loading === true) {
        return "Loading...";
    }

    if (weather.loading === false) {
        const weatherData = weather.data;
        //Date

        const getDay = (newDay) => {
            const dayDate = new Date().getDay();
            const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
            const day = days[(dayDate + newDay) % 7];
            return day;
        }

        console.log(weatherData)
        //Icon
        const getIcon = () => {
            for (let i = 0; i < weatherData.length; i++) {
                if (weatherData[i].weather[0].main === "Clouds") {
                    return "fas fa-cloud-sun";
                }
                if (weatherData[i].weather[0].main === "Clear") {
                    return "fas fa-sun";
                }
            }

        }



        return (
            <>
                <div className="container">
                    <p>Buaramanga</p>
                    {weatherData.map((weatherDay, index) =>
                        <div className="weather_card">
                            <div className="day">
                                <p>{getDay(index)}</p>
                            </div>
                            <div className="weather_image">
                                <i className={getIcon()}></i>
                            </div>
                            <div className="weather_temperature">
                                <p>{parseInt(weatherDay.main.temp_max - 273)}° <span>{parseInt(weatherDay.main.temp_min - 273)}°</span></p>
                            </div>
                        </div>
                    )}
                </div>
            </>
        )
    }

}

export default WeatherCard;