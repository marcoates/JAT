import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./Header.css";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

function StartNow(props) {

    const [ appStarted, setAppStarted ] = useState(false);

  return (
    <Link to="/App"
    onClick={() => setAppStarted(true)}
    >
      <button className={appStarted ? "IntroCallToActionHidden" : "IntroCallToAction" } style={{scale:props.scale}}>
        START NOW
        <KeyboardDoubleArrowRightIcon/>
      </button>
    </Link>
  )
}

export default StartNow