import './App.css';
import Forecast from "./components/Forecast/Forecast";
import React, {useState, useEffect} from "react";
// Intl used to navigate languages
import { IntlProvider, FormattedDate, FormattedTime, FormattedMessage } from 'react-intl';
import Settings from './components/Settings/Settings';
import windy1 from './assets/windy1.jpg';
import windy2 from './assets/windy2.jpg';
import windy3 from './assets/windy3.jpg';
import sunny1 from './assets/sunny1.jpg';
import sunny2 from './assets/sunny2.jpg';
import sunny3 from './assets/sunny3.jpg';
import rainy1 from './assets/rainy1.jpg';
import rainy2 from './assets/rainy2.jpg';
import rainy3 from './assets/rainy3.jpg';
import thunder1 from './assets/thunder1.jpg';
import thunder2 from './assets/thunder2.jpg';
import thunder3 from './assets/thunder3.jpg';
import cloudy1 from './assets/cloudy1.jpg';
import cloudy2 from './assets/cloudy2.jpg';
import cloudy3 from './assets/cloudy3.jpg';
import snowy1 from './assets/snowy1.jpg';
import snowy2 from './assets/snowy2.jpg';
import snowy3 from './assets/snowy3.jpg';
import refreshicon from './assets/refreshicon.png'; 
import settingsIcon from './assets/settingsicon.png';
import getForecast from './components/Forecast/Forecast';
import SocialMediaTab from './components/SocialMediaTab/SocialMediaTab';


// Hookcago
function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });
    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
}

//Number generator to randomly select background
const random_bg = Math.floor((Math.random() * 3) + 1);

// Variable titles by language
const messages = {
    en: {
        heading:"Forecast",
        langSettings:"App Language:",
        tempSettings:"Temperature Metric:"
    },
    es: {
        heading: "Pronóstico",
        langSettings: "Langue de l'application:",
        tempSettings:"Métrica de temperatura:",
    },
    fr: {
        heading: "Prévision",
        langSettings: "Idioma de la aplicación:",
        tempSettings:"Mesure de la température:",
    },
};

// Variables for language setting by language
const langSettings = [
    [
        "English",
        "Spanish",
        "French",
    ],
    [
        "Inglesa",
        "Espagnol",
        "Francés",
    ],
    [
        "Anglais",
        "Espagnol",
        "Français",
    ]
]

// Main App
function App(props, nextProps) {

    const size = useWindowSize()
    const [locale, setLocale] = useState('en')                //     Local set language
    const [dateTime, setDateTime] = useState('English')       //     Set the variable for current language setting select menu
    const [units, setUnits] = useState('metric')              //     Local set temperature metric
    const [temp, setTemp] = useState('Celcius')               //     Set the variable for metric setting select menu
    const [buttonPopup, setButtonPopup] = useState(false);    //     Settings option
    const [langSet, setLangSet] = useState(0);                //     Values to map to select menu

    // Change background by weather type
    function changeBackground(weatherType) {
        if (weatherType === "Clear") {
            if (random_bg === 1) {
                document.getElementById('App').style.background = `url(${sunny1})`
            } else if (random_bg === 2) {
                document.getElementById('App').style.background = `url(${sunny2})`
            } else if (random_bg === 3) {
                document.getElementById('App').style.background = `url(${sunny3})`
            }

        } else if (weatherType === "Clouds") {

            if (random_bg === 1) {
                document.getElementById('App').style.background = `url(${cloudy1})`
            } else if (random_bg === 2) {
                document.getElementById('App').style.background = `url(${cloudy2})`
            } else if (random_bg === 3) {
                document.getElementById('App').style.background = `url(${cloudy3})`
            }
        } else if (weatherType === "Rain" || weatherType === "Drizzle") {
            if (random_bg === 1) {
                document.getElementById('App').style.background = `url(${rainy1})`
            } else if (random_bg === 2) {
                document.getElementById('App').style.background = `url(${rainy2})`
            } else if (random_bg === 3) {
                document.getElementById('App').style.background = `url(${rainy3})`
            }
        } else if (weatherType === "Thunderstorm") {
            if (random_bg === 1) {
                document.getElementById('App').style.background = `url(${thunder1})`
            } else if (random_bg === 2) {
                document.getElementById('App').style.background = `url(${thunder2})`
            } else if (random_bg === 3) {
                document.getElementById('App').style.background = `url(${thunder3})`
            }
        }

        else if (weatherType === "Snow") {
            if (random_bg === 1) {
                document.getElementById('App').style.background = `url(${snowy1})`
            } else if (random_bg === 2) {
                document.getElementById('App').style.background = `url(${snowy2})`
            } else if (random_bg === 3) {
                document.getElementById('App').style.background = `url(${snowy3})`
            }
        } else{
            if (random_bg === 1) {
                document.getElementById('App').style.background = `url(${windy1})`
            } else if (random_bg === 2) {
                document.getElementById('App').style.background = `url(${windy2})`
            } else if (random_bg === 3) {
                document.getElementById('App').style.background = `url(${windy3})`
            }
    }
    document.getElementById('App').style.backgroundRepeat = "no-repeat"
    document.getElementById('App').style.backgroundSize = "cover"
 }

    // Change local language and language select menu
    const langChange = (e) => {
        if (e.target.value === "English" || e.target.value === "Inglesa" || e.target.value === "Anglais"){
            setLocale('en')
            setLangSet(0)
            setDateTime(langSettings[0][0])
        } else if (e.target.value === "Spanish" || e.target.value === "Espagnol") {
            setLocale('es')
            setLangSet(1)
            setDateTime(langSettings[1][1])
        } else if (e.target.value === "French" || e.target.value === "Francés" || e.target.value === "Français") {
            setLocale('fr')
            setLangSet(2)
            setDateTime(langSettings[2][2])
        }
    }

    // Change local units set and current value in metric settings select menu
    const unitsChange = (e) => {
        setTemp(e.target.value)
        if (e.target.value === "Celcius"){
            setUnits('metric')
        } else if (e.target.value === "Farenheit") {
            setUnits('imperial')
        }
    }

    return (

        <div className="body">
            <div style={{background: `url(${windy1})`, color:"white" }} id="App">
                <img className='settingsIcon' src={settingsIcon} onClick={() => setButtonPopup(true)}/>

                {/* /////////////////////////////////// */}
            {/* SETTINGS TAB - TRIGGERED WHEN GEAR ICON IS CLICKED */}

                <Settings trigger={buttonPopup} setTrigger={setButtonPopup} locale = {locale}>
                <div className='settingChoice'>
                    <div className='settingsText'>
                        <IntlProvider locale={locale} messages={messages[locale]}>
                            <>
                                <FormattedMessage id="langSettings" defaultMessage="App Language:" value={{locale}}></FormattedMessage>
                            </>
                        </IntlProvider>
                            <select onChange={langChange} value = {dateTime}>
                                {langSettings[langSet].map((x) => (
                                    <option key={x}>{x}</option>
                                ))}
                            </select>
                    </div>
                <div className='settingsText'><IntlProvider locale={locale} messages={messages[locale]}>
                    <>
                        <FormattedMessage id="tempSettings" defaultMessage="Temperature Metric:" value={{locale}}></FormattedMessage>
                    </>
                </IntlProvider>
                <select onChange={unitsChange} defaultValue={temp}>
                    {['Celcius', 'Farenheit'].map((x) => (
                        <option key={x}>{x}</option>
                    ))}
                </select>
                </div>
                    </div>
                </Settings>
                <br></br>

                {/* END OF SETTINGS TAB  */}
                {/* Date & Time */}
                <IntlProvider locale={locale} messages={messages[locale]}>
                    <h1 id='dateText'>
                        <FormattedDate value = {props.date} year="numeric" month = "long" day="numeric" weekday="long" />
                    </h1>
                    <h1 id = "timeText">
                        <FormattedTime value = {props.time} />
                    </h1>
                </IntlProvider>
                {/* Weather fetching component */}
                <Forecast changeBackground = {changeBackground} locale={locale} units={units} />
            </div>
        </div>
    );
}

export default App;