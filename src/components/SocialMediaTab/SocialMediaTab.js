import React from 'react'
import './SocialMediaTab.css';


function SocialMediaTab(props) {
    return (props.trigger) ? (
    <div className='popup'>
        <div className="popup-inner">
            <button className='instagramCloseBtn' onClick={() => props.setTrigger(false)}>Close</button>
            {props.children}
        </div>
    </div>
    ) : "";
}

  export default SocialMediaTab;