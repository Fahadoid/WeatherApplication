import React, {useEffect, useState} from 'react';
import Conditions from '../Conditions/Conditions';
import { IntlProvider, FormattedMessage } from 'react-intl';
import FiveDayForecast from '../../components/FiveDayForecast/FiveDayForecast';
import FiveDayConditions from "../FiveDayConditions/FiveDayConditions";
import SocialMedia from '../../SocialMedia'
import SocialMediaTab from '../../components/SocialMediaTab/SocialMediaTab';
import './Forecast.css';
import refreshicon from "../../assets/refreshicon.png";


// Variable values by language

const messages = {
    en: {
        noSearch:"No Cities Searched",
        alertText:"Please enter a location.",
        heading:"Forecast",
        search:"Search",
        posts:"Posts",
        noPosts:"No posts!",
    },
    es: {
        noSearch:"No se han buscado ciudades",
        alertText:"Por favor ingrese una ubicación",
        heading:"Pronóstico",
        search:"Búsqueda",
        posts:"Publicaciones",
        noPosts:"Sin publicaciones!",
    },
    fr: {
        noSearch:"Aucune ville recherchée",
        alertText:"Veuillez saisir un lieu",
        heading:"Prévision",
        search:"Chercher",
        posts:"Des Postes",
        noPosts:"Pas de messages!",
    }
};

// Main weather forecasting component
const Forecast = ({ changeBackground, locale, units }) => {

    let [search, setSearch] = useState('');                 //     Search value
    let [mainCity, setMainCity] = useState('');             //     Position in array of cities that is select
    let [responseObj, setResponseObj] = useState({});       //     Array of cities returned from API
    const [buttonPopup, setButtonPopup] = useState(false);  //     Button value for Social Media Tab
    let [check, setCheck] = useState(0);                    /*     Variable used to check if a successful search has gone through for components to update
                                                                            Checks for error codes (API overload, Bad request) and variable array length                                                                                     */
    useEffect(() => {
        if (locale === "en") {
            document.getElementById('searchInput').placeholder = "Search Cities"
        } else if (locale === "es") {
            document.getElementById('searchInput').placeholder = "Buscar Ciudades"
        } else if (locale === "fr") {
            document.getElementById('searchInput').placeholder = "Rechercher Des Villes"
        }
    })

    // Main function triggered by submission
    const onSubmit = async(e) => {
        e.preventDefault()

        if(!search){
            document.getElementById('forecast').textContent = messages[locale].alertText;
        }
        else {
            var data = await getForecast({search})
            if (data.count === 0 ) {
                setMainCity('')
                document.getElementById('searchInput').value = ''
            } else {

                var removeIt = document.getElementById('tempList');

                if (removeIt != null) {
                    removeIt.remove()
                }
                if (data.count > 1) {
                    setResponseObj(data)
                    var t = document.createElement('ul');
                    t.setAttribute('id', 'tempList')

                    for (var i = 0; i < (data.count); i++) {
                        var listOptions = document.createElement('li');
                        listOptions.textContent = data.list[i].name + ", " + data.list[i].sys.country;
                        listOptions.setAttribute('id', i)
                        listOptions.addEventListener('click', clickList)
                        t.appendChild(listOptions)
                    }
                    document.getElementById('wrapper').appendChild(t)
                } else if (data.count === 1) {
                    setCheck(check + 1)
                    setMainCity('0')
                    setResponseObj(data)
                }
            }
        }
    }

    // Function triggered when list of cities are selected
    function clickList(e){
        setMainCity(e.target.id)
        setCheck(check + 1)

        document.getElementById('searchInput').value = ''
        var removeIt = document.getElementById('tempList');
        if (removeIt != null) {
            removeIt.remove()
        }
    }

    // Sends final city array value to App.js to update background
    function sendBackground(finalRes, finalCity) {
        changeBackground(finalRes.list[finalCity].weather[0].main)
    }

    // Used to reload page on an API error aswell as reload forecast if one is searched
    const reloadButton = async() => {
        var ch = document.getElementById('forecast').textContent
        if ( ch === 'API is overloaded, reload page and try again' || JSON.stringify(responseObj) === '{}' ) {
            window.location.reload()
        } else {
            setResponseObj = await (getForecast())
        }
    }

    // Main API call
    const getForecast = async() => {
        //weather data fetch function will go here
        const res = await fetch(`https://community-open-weather-map.p.rapidapi.com/find?q=${search}&cnt=6&units=${units}`, {
            // const res = await fetch(`https://community-open-weather-map.p.rapidapi.com/find?q=${search}&cnt=5&units=metric`, {

            "method": "GET",
            "headers": {
                "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
                "x-rapidapi-key": "0a1494a602msh705260b0e4c166dp1cb901jsn36fcf81fb794"
            }
        })

        // Checks for API overload
        if (res.status === 429) {
            setMainCity('');
            document.getElementById('forecast').textContent = 'API is overloaded, reload page and try again'
            document.getElementById('searchInput').value = ''
            const data = {count: 0}
            return data
        } else {
            const data = await res.json()
            console.log("getForecast:")
            console.log(data)
            return data
        }
    }

    return (
        <div>
            <img className="refreshIcon" onClick={reloadButton} src={refreshicon} alt=""/>
            <div>
                <form className="searchBar"  onSubmit={onSubmit}>
                    <input type = "text" placeholder='Search Cities' id="searchInput" onChange={(e) => setSearch(e.target.value)} />
                    <button type="submit" className="submit-button">
                        <IntlProvider locale={locale} messages={messages[locale]}>
                            <FormattedMessage id="search" defaultMessage="Overview" value={{locale}}></FormattedMessage>
                        </IntlProvider>
                    </button>
                    {/*CITIES ARRAY SELECT MENU*/}
                    <div id="wrapper"></div>
                </form>
                <br></br>
                {/*MAIN FORECAST HERE*/}
                <div id="forecast">
                    {mainCity !== '' ? <Conditions check={check} responseObj={responseObj} mainCity = {mainCity} sendBackground={sendBackground} locale = {locale} units = {units}/> : <div className="loader"></div> }
                </div>
            </div>
            <div className='bottomTab'>
                <IntlProvider locale={locale} messages={messages[locale]}>
                    <h2 className='tabTitleText'>
                    <div className='tabTitleWords'>
                        <FormattedMessage id="heading" defaultMessage="Forecast" value={{locale}}></FormattedMessage>
                        </div>
                    </h2>
                    <h2 className='tabTitleText' onClick={() => setButtonPopup(true)}>
                        <div className='tabTitleWords'>
                        <FormattedMessage id="posts" defaultMessage="Posts" value={{locale}}></FormattedMessage>
                        </div>
                    </h2>
                </IntlProvider>
                {/*TAB SYSTEM HERE*/}

                <SocialMediaTab trigger={buttonPopup} setTrigger={setButtonPopup}>
                {mainCity !== '' ? <SocialMedia responseObj={responseObj} mainCity = {mainCity} /> :
                    <IntlProvider locale={locale} messages={messages[locale]}>
                        <p>
                            <FormattedMessage id="noPosts" defaultMessage="No posts!" value={{locale}}></FormattedMessage>
                        </p>
                    </IntlProvider>}
                </SocialMediaTab>  
                              
                {mainCity !== '' ? <FiveDayForecast check = {check} responseObj = {responseObj} mainCity = {mainCity} locale = {locale} units = {units} /> :
                    <IntlProvider locale={locale} messages={messages[locale]}>
                    <p>
                        <FormattedMessage id="noSearch" defaultMessage="No cities searched!" value={{locale}}></FormattedMessage>
                    </p>
                    </IntlProvider>}

            </div>
        </div>
    )
}

export default Forecast;