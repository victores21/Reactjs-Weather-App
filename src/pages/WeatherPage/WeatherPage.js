import React, { useEffect, useState } from 'react';
import WeatherCard from '../WeatherCard/WeatherCard';
import "./WeatherPage.css";

const WeatherPage = () => {

    const [weather, setWeather] = useState({
        data: null,
        loading: true
    })
    const place = "San diego,ve";
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

        setWeather({ data: newState, dataFull: data, loading: false })

    }

    useEffect(() => {
        fetchData();
    }, [])


    const getIcon = (dayWeather) => {
        if (dayWeather === "Clear") {
            return "fas fa-sun";
        }
        if (dayWeather === "Clouds") {
            return "fas fa-cloud-sun";
        }
        if (dayWeather === "Rain") {
            return "fas fa-cloud-showers-heavy";
        }
    }

    if (weather.loading === true) {
        return "Loading...";
    }
    console.log("s", weather.data[0].main)
    return (<>
        <div className="container_page">
            <div className="weather_page">
                <div className="weather_left">
                    <div className="weather_location">
                        <p>{weather.dataFull.city.name}, {weather.dataFull.city.country}</p>
                    </div>
                    <div className="weather_date">
                        <p>{weather.data[0].dt_txt}</p>
                    </div>
                    <div className="weather_weather">
                        <i className={getIcon(weather.data[0].weather[0].main)}></i>
                    </div>
                </div>
                <div className="weather_right">
                    <div className="weather_max_temp">
                        <p>{parseInt(weather.data[0].main.temp - 273)}°</p>
                    </div>
                    <div className="weather_min_temp">
                        <p>{parseInt(weather.data[0].main.temp_min - 273)}°</p>
                    </div>
                </div>
                <div className="weather_bottom">
                    .
                            <WeatherCard />
                </div>
            </div>
        </div>
    </>)
}

export default WeatherPage;