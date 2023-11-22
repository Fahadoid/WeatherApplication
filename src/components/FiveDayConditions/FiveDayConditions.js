import React, {useEffect, useState} from 'react';
import moment from 'moment';
import SimpleDateTime  from 'react-simple-timestamp-to-date';


const FiveDayConditions = ({ fiveDay, units, locale }) => {

    let [langSet, setLangSet] = useState ('en')

    useEffect (() => {
        if (langSet !== locale) {
            for (var i = 0 ; i < 5 ;i++) {
                var ar = document.getElementById(`fiveDayTemp${i}`).textContent
                var input = ""
                console.log(ar)
                // Way to circumnavigate the moment library default language to allow multiple language
                if (locale === "fr") {
                    if (ar.includes("Monday") ) {
                        input = ar.replace("Monday", "Lundi")
                    } else if (ar.includes("Lunes") ){
                        input = ar.replace("Lunes", "Lundi")
                    } else if (ar.includes("Tuesday")) {
                        input = ar.replace("Tuesday", "Mardi")
                    } else if (ar.includes("Martes")){
                        input = ar.replace("Martes", "Mardi")
                    } else if (ar.includes("Wednesday")) {
                        input = ar.replace("Wednesday", "Mecredi")
                    } else if (ar.includes("Miércoles")) {
                        input = ar.replace("Miércoles", "Mecredi")
                    } else if (ar.includes("Thursday")) {
                        input = ar.replace("Thursday", "Jeudi")
                    }else if (ar.includes("Jueves")) {
                        input = ar.replace("Jueves", "Jeudi")
                    } else if (ar.includes("Friday")) {
                        input = ar.replace("Friday", "Vendredi")
                    } else if (ar.includes("Viernes")) {
                        input = ar.replace("Viernes", "Vendredi")
                    } else if (ar.includes("Saturday")) {
                        input = ar.replace("Saturday", "Samedi")
                    }else if (ar.includes("Sábado")) {
                        input = ar.replace("Sábado", "Samedi")
                    } else if (ar.includes("Sunday")) {
                        input = ar.replace("Sunday", "Dimanche")
                    } else if (ar.includes("Domingo")) {
                        input = ar.replace("Domingo", "Dimanche")
                    }
                } else if (locale === "es") {
                    if (ar.includes("Monday")) {
                        input = ar.replace("Monday", "Lunes")
                    } else if (ar.includes("Lundi")) {
                        input = ar.replace("Lundi", "Lunes")
                    } else if (ar.includes("Tuesday")) {
                        input = ar.replace("Tuesday", "Martes")
                    } else if (ar.includes("Mardi")) {
                        input = ar.replace("Mardi", "Martes")
                    } else if (ar.includes("Wednesday")) {
                        input = ar.replace("Wednesday", "Miércoles")
                    } else if (ar.includes("Mecredi")) {
                        input = ar.replace("Mecredi", "Miércoles")
                    } else if (ar.includes("Thursday")) {
                        input = ar.replace("Thursday", "Jueves")
                    } else if (ar.includes("Jeudi")) {
                        input = ar.replace("Jeudi", "Jueves")
                    } else if (ar.includes("Friday")) {
                        input = ar.replace("Friday", "Viernes")
                    } else if (ar.includes("Vendredi")) {
                        input = ar.replace("Vendredi", "Viernes")
                    } else if (ar.includes("Saturday")) {
                        input = ar.replace("Saturday", "Sábado")
                    } else if (ar.includes("Samedi")) {
                        input = ar.replace("Samedi", "Sábado")
                    } else if (ar.includes("Sunday")) {
                        input = ar.replace("Sunday", "Domingo")
                    } else if (ar.includes("Dimanche")) {
                        input = ar.replace("Dimanche", "Domingo")
                    }
                } else if (locale === "en") {
                    if (ar.includes("Lunes")) {
                        input = ar.replace("Monday", "Monday")
                        input = ar.replace("Lunes", "Monday")
                    } else if (ar.includes("Lundi")) {
                        input = ar.replace("Lundi", "Monday")
                    } else if (ar.includes("Martes")) {
                        input = ar.replace("Martes", "Tuesday")
                    } else if (ar.includes("Mardi")) {
                        input = ar.replace("Mardi", "Tuesday")
                    } else if (ar.includes("Mecredi")) {
                        input = ar.replace("Mecredi", "Wednesday")
                    } else if (ar.includes("Mecredi")) {
                        input = ar.replace("Mecredi", "Wednesday")
                    } else if (ar.includes("Jueves")) {
                        input = ar.replace("Jueves", "Thursday")
                    } else if (ar.includes("Jeudi")) {
                        input = ar.replace("Jeudi", "Thursday")
                    } else if (ar.includes("Viernes") ) {
                        input = ar.replace("Viernes", "Friday")
                    } else if (ar.includes("Vendredi")) {
                        input = ar.replace("Vendredi", "Friday")
                    } else if (ar.includes("Sábado")) {
                        input = ar.replace("Sábado", "Saturday")
                    } else if ( ar.includes("Samedi")){
                        input = ar.replace("Samedi", "Saturday")
                    } else if (ar.includes("Domingo")) {
                        input = ar.replace("Domingo", "Sunday")
                    } else if (ar.includes("Dimanche")) {
                        input = ar.replace("Dimanche", "Sunday")
                    } else if (ar.includes("Miércoles")) {
                    input = ar.replace("Miércoles", "Wednesday")
                    }
                }
                if (input !== "") {
                    document.getElementById(`fiveDayTemp${i}`).textContent = input
                }
            }
        }

        setLangSet(locale)
    })



    return (
        <div>
                <div className='forecastRow'>
                <h4 className = 'fiveDayTemp' id='fiveDayTemp0'> {moment(fiveDay.list[1].dt*1000).format('dddd Do')}: </h4><a className='fiveDayTemp'><h4 className='fiveDayNumTemp'>{Math.round(fiveDay.list[1].temp.day)}°</h4></a>
                </div>

                <div className='forecastRow'>
                    <h4 className = 'fiveDayTemp' id='fiveDayTemp1'>{moment(fiveDay.list[2].dt*1000).format('dddd Do')}: </h4><a className='fiveDayTemp'><h4 className='fiveDayNumTemp'>{Math.round(fiveDay.list[2].temp.day)}°</h4></a>
                </div>

                <div className='forecastRow'>
                    <h4 className = 'fiveDayTemp' id='fiveDayTemp2'> {moment(fiveDay.list[3].dt*1000).format('dddd Do')}: </h4><a className='fiveDayTemp'><h4 className='fiveDayNumTemp'>{Math.round(fiveDay.list[3].temp.day)}°</h4></a>
                </div>

                <div className='forecastRow'>
                    <h4 className = 'fiveDayTemp' id='fiveDayTemp3'> {moment(fiveDay.list[4].dt*1000).format('dddd Do')}: </h4><a className='fiveDayTemp'><h4 className='fiveDayNumTemp'>{Math.round(fiveDay.list[4].temp.day)}°</h4></a>
                </div>

                <div className='forecastRow'>
                    <h4 className = 'fiveDayTemp' id='fiveDayTemp4'> {moment(fiveDay.list[5].dt*1000).format('dddd Do')}: </h4><a className='fiveDayTemp'><h4 className='fiveDayNumTemp'>{Math.round(fiveDay.list[5].temp.day)}°</h4></a>
                </div>

        </div>
    )
}

export default FiveDayConditions;