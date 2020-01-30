import React, { useEffect, useState } from 'react';
import WeatherCard from '../WeatherCard/WeatherCard';
import "./WeatherPage.css";
import * as moment from 'moment';
import { CircleLoader } from "react-spinners";




const WeatherPage = () => {
    let now = moment().format('LL');
    const [weather, setWeather] = useState({
        data: {},
        loading: true,
        error: null
    })
    const [city, setCity] = useState("madrid");

    useEffect(() => {
        const fetchData = async () => {

            const query = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=4b4754a65698bacce3396cc517e79381`;
            const req = await fetch(query);
            const data = await req.json();
            let newState = [];
            if (data.cod === "200") {
                for (let i = 0; i < data.list.length; i++) {
                    if (i % 8 === 0) {
                        newState.push(data.list[i]);
                    }
                }

                setWeather({ data: newState, dataFull: data, loading: false, error: null })
            } else if (data.cod !== "200") {
                setWeather({ loading: false, error: true })
            }
        }
        fetchData();
    }, [city])

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

    const handleSearch = e => {
        if (e.key === "Enter") {
            let value = e.target.value;
            let valueLowerCase = value.toLowerCase();
            setCity(valueLowerCase);
            setWeather({ loading: true })
        }
    }

    console.log(weather)

    if (weather.loading === false && weather.error === true) {
        return (
            <>
                <div className="container_error">
                    <p>City Not Found                     {setTimeout(() => {
                        window.location.reload()
                    }, 2000)}</p>
                </div>
            </>
        )
    }
    if (weather.loading === true) {
        return (
            <>
                <div className="container_loading">
                    <CircleLoader
                        size={150}
                        //size={"150px"} this also works
                        color={"#fff"}
                        loading={weather.loading}
                    />
                </div>
            </>
        )
    }

    if (weather.loading === false && weather.error !== true) {
        console.log("page", weather.data[0].main)
        const weatherData = weather.data;
        return (<>
            <div className="container_page">
                <div className="weather_search">
                    <input type="text" name="search-weather" id="search-weather" placeholder="Search City... Example: Madrid,Es " onKeyPress={e => handleSearch(e)} />
                </div>
                <div className="weather_page">
                    <div className="weather_left">
                        <div className="weather_location">
                            <p>{weather.dataFull.city.name}, {weather.dataFull.city.country}</p>
                        </div>
                        <div className="weather_date">
                            <p>{now}</p>
                        </div>
                        <div className="weather_weather">
                            <i className={getIcon(weatherData[0].weather[0].main)}></i>
                        </div>
                    </div>
                    <div className="weather_right">
                        <div className="weather_max_temp">
                            <p>{parseInt(weatherData[0].main.temp - 273)}°</p>
                        </div>
                        <div className="weather_min_temp">
                            <p>{parseInt(weatherData[0].main.temp_min - 273)}°</p>
                        </div>
                    </div>
                    <div className="weather_bottom">
                        <WeatherCard data={weatherData} fullData={weather.dataFull} state={weather} />
                    </div>
                </div>
            </div>
        </>)
    }
}

export default WeatherPage;