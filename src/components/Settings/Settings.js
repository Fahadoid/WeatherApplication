import React from 'react'
import './Settings.css'

function Settings(props) {

    return (props.trigger) ? (
    <div className='popup'>
        <div className="popup-inner">
            <button className='close-btn' onClick={() => props.setTrigger(false)}>
                {props.locale === 'en' ? "Close" : props.locale === 'fr' ? "Fermer" : "Cerrar"}</button>
            {props.children}
        </div>
    </div>
    ) : "";
}

export default Settings;