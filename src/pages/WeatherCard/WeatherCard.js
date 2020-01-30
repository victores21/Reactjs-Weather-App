import React, { useState, useEffect } from 'react';
import "./WeatherCard.css";


const WeatherCard = () => {

    const [weather, setWeather] = useState({
        data: null,
        loading: true
    })
    const place = "Bucaramanga";
    const fetchData = async () => {

        const query = `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=4b4754a65698bacce3396cc517e79381`;
        const req = await fetch(query);
        const data = await req.json();

        for (let i = 0; i < data.list.length; i++) {
            if (i % 8 === 0) {
                setWeather({ data: data.list[i], loading: false })
            }
        }


    }

    useEffect(() => {
        fetchData();
    }, [])

    if (weather.loading === true) {
        return "Loading...";
    }

    if (weather.loading === false) {
        const weatherData = weather.data.list;
        const dayDate = new Date().getDay();
        const days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
        const day = days[dayDate - 1];
        console.log(weather);
        /*        const weatherIcon = weatherData.weather[0].main;
               let icon = "";
               if (weatherIcon === "Clouds") {
                   icon = "fas fa-cloud-sun";
               }
               if (weatherIcon === "Clear") {
                   icon = "fas fa-sun";
               } */





        return (
            <>
                <div className="container">
                    <p>Buaramanga</p>

                    <div className="weather_card">
                        <div className="day">
                            <p>{day}</p>
                        </div>
                        <div className="weather_image">
                            <i className="fas fa-cloud-sun"></i>
                        </div>
                        <div className="weather_temperature">
                            <p>24 ° <span>24 °</span></p>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}

export default WeatherCard;