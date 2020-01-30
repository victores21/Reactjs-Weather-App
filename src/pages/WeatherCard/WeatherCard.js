import React, { useState, useEffect } from 'react';
import "./WeatherCard.css";


const WeatherCard = (props) => {

    if (props.state.loading === true) {
        return "Loading...";
    }
    if (props.state.loading === false) {

        //Date

        const getDay = (newDay) => {
            const dayDate = new Date().getDay();
            const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
            const day = days[(dayDate + newDay) % 7];
            return day;
        }

        //Icon
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

        console.log("Card", props.fullData);
        return (
            <>
                <div className="container_card">
                    {props.data.map((weatherDay, index) =>
                        <div className="weather_card" key={weatherDay.dt}>
                            <div className="day">
                                <p>{getDay(index)}</p>
                            </div>
                            <div className="weather_image">
                                <i className={getIcon(weatherDay.weather[0].main)}></i>
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