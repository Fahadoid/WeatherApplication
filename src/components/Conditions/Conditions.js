import React, {useEffect, useState} from 'react';
import sunnyicon from '../../assets/sunnyicon.png';
import cloudyicon from '../../assets/cloudyicon.png';
import rainyicon from '../../assets/rainyicon.png';
import windyicon from '../../assets/windyicon.png';
import snowicon from '../../assets/snowicon.png';


// Main Forecast value
const Conditions = ({ responseObj, mainCity, sendBackground, locale, units, check }) => {

    let [langSet, setLangSet] = useState ('en')
    let [unitsSet, setUnitsSet] = useState ('metric');
    let [checkUpdate, setCheckUpdate] = useState(0);

    useEffect(() => {
        if (checkUpdate !== check) {
            // Checks for update from Forecast.js
            setCheckUpdate(check)
            // Sends needed background data to App.js of final city value
            sendBackground(responseObj, mainCity)

            var type = responseObj.list[mainCity].weather[0].main
            if (type === "Clear") {
                document.getElementById('photo').src = `${sunnyicon}`
            } else if (type === "Clouds") {
                document.getElementById('photo').src = `${cloudyicon}`
            } else if (type === "Rain") {
                document.getElementById('photo').src = `${rainyicon}`
            } else if (type === "Storm") {
                document.getElementById('photo').src = `${windyicon}`
            } else if (type === "Snow") {
                document.getElementById('photo').src = `${snowicon}`
            }
            
        }
        if (langSet !== locale) {
            setLangSet(locale)
            getLanguage()
        }

        if (unitsSet !== units) {
            setUnitsSet(units)
            getNewUnits()
        }
    })

    // Updates units
    const getNewUnits = async() => {
        if (units === "metric") {
            var data = await getSpecificForecast()
            if (data !== "") {
                document.getElementById('temperature').textContent = Math.round(data.main.temp) + "°C"
            }
        } else if (units === "imperial") {
            var data = await getSpecificForecast()
            if (data !== "") {
                document.getElementById('temperature').textContent = Math.round(data.main.temp) + "°F"
            }
        }
    }

    // Updates description value
    const getLanguage = async() => {
        if (locale === "es" || locale == "fr") {
            var data = await getSpecificForecast()
            if (data !== "") {
                document.getElementById('description').textContent = data.weather[0].description;
            }
        } else if (locale === "en") {
            document.getElementById('description').textContent = responseObj.list[mainCity].weather[0].description
        }
    }

    // API calls to find the translated description value from a great variety
    const getSpecificForecast = async() => {

        const res = await fetch(`https://community-open-weather-map.p.rapidapi.com/weather?id=${responseObj.list[mainCity].id}&lang=${locale}&units=${units}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
                "x-rapidapi-key": "0a1494a602msh705260b0e4c166dp1cb901jsn36fcf81fb794"

            }
        })

        // Checks if API overloaded
        if (res.status === 429) {
            return ""
        } else {
            const data = await res.json()
            console.log("getSpecificForecast:")
            console.log(data)
            return data
        }

    }

    return (
        <div>
            <div className='fadeBackground'>
                <h2 id='cityName'>{responseObj.list[mainCity].name}, {responseObj.list[mainCity].sys.country}</h2>
                <h1 id='temperature'>{Math.round(responseObj.list[mainCity].main.temp)}°C </h1>
                <img id='photo' src={sunnyicon} />
                <h4 id='description'>{responseObj.list[mainCity].weather[0].description}</h4>
            </div>
        </div>
    )
}

export default Conditions