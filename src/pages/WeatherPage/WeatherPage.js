import React from 'react';
import WeatherCard from '../WeatherCard/WeatherCard';
import "./WeatherPage.css";

const WeatherPage = () => {
    return (<>
        <div className="container_page">
            <div className="weather_page">
                <div className="weather_left">
                    <div className="weather_location">
                        <p>Bucaramanga, Co</p>
                    </div>
                    <div className="weather_date">
                        <p>September 25, 2015</p>
                    </div>
                    <div className="weather_weather">
                        <i className="fas fa-cloud-showers-heavy"></i>
                    </div>
                </div>
                <div className="weather_right">
                    <div className="weather_max_temp">
                        <p>72°</p>
                    </div>
                    <div className="weather_min_temp">
                        <p>68°</p>
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