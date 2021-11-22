import React, { useState, useEffect } from 'react'
import axios from 'axios';
import "./Modal.scss"

const API_KEY = '8d8697124e4f451d9c5162915212111';
const CITY = "Ekaterinburg";

const Modal = ({ visibility, onClose, day }) => {
    const [weather, setWeather] = useState()

    /*
        ToDo:
        Можно сделать хук useFetch, если будет больше запросов..
    */
    const getDayWeather = async () => {
        const data = day && await axios.get(`http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=${API_KEY}&q=${CITY}&format=json&date=${day}`).then(r => r.data.data.weather[0].avgtempC);
        setWeather(data);
    }

    useEffect(() => {
        getDayWeather();
    }, [day])

    return (
        <div className={visibility ? "modal active" : "modal"} onClick={onClose}>
            <div className={visibility ? "modal__content active" : "modal__content"}>
                {weather ? `${day} - Погода в городе Екатеринбург: ${weather}°C` : 'Loading...'}
            </div>
        </div>
    )
}

export default Modal;