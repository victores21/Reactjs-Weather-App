import React, { useState, useEffect } from 'react';
import "./WeatherCard.css";


const WeatherCard = () => {

    const [weather, setWeather] = useState({
        data: null,
        loading: true
    })
    const place = "Barrancabermeja";
    const fetchData = async () => {

        const query = `http://api.openweathermap.org/data/2.5/weather?q=${place}&appid=4b4754a65698bacce3396cc517e79381`;
        const req = await fetch(query);
        const data = await req.json();

        setWeather({ data: data, loading: false });

    }

    useEffect(() => {
        fetchData();
    }, [])

    if (weather.loading === true) {
        return "Loading...";
    }

    if (weather.loading === false) {
        const weatherData = weather.data;
        console.log(weatherData)
        const dayDate = new Date().getDay();
        const days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
        const day = days[dayDate - 1];

        const weatherIcon = weatherData.weather[0].main;
        let icon = "";
        if (weatherIcon === "Clouds") {
            icon = "fas fa-cloud-sun";
        }
        if (weatherIcon === "Clear") {
            icon = "fas fa-sun";
        }


        return (
            <>
                <div className="container">
                    <p>{place}</p>
                    <div className="weather_card">
                        <div className="day">
                            <p>Wed</p>
                        </div>
                        <div className="weather_image">
                            <i className={icon}></i>
                        </div>
                        <div className="weather_temperature">
                            <p>{parseInt(weatherData.main.temp_max - 273)} ° <span>{parseInt(weatherData.main.temp_min - 273)} °</span></p>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}

export default WeatherCard;