import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

function Header() {

  const location = useLocation();
  const [appStarted, setAppStarted] = useState(false);

  useEffect(() => {
    // Check the location pathname to set appStarted
    setAppStarted(location.pathname === "/App");
  }, [location.pathname]);

  return (
    <>
      <div className="HeaderContainer">
        <ul className="HeaderList">
          <li className="HeaderItem">
            <img
              alt="JAT-Job-Applications-Tracker-Header-Logo"
              className="HeaderLogo"
              src={require("../assets/JAT_logo.svg").default}
            />
          </li>
          <li className="HeaderItem">
            <Link to="/" className="HeaderMenuItem"
                        onClick={() => setAppStarted(false)}
>
              Home
            </Link>
            <Link to="/About" className="HeaderMenuItem"
                        onClick={() => setAppStarted(false)}
>
              About
            </Link>
          </li>
          <li className="HeaderItem">
            <Link to="/App"
            // onClick={() => setAppStarted(true)}
            >
              <button className={appStarted ? "IntroCallToActionHidden" : "IntroCallToAction" }>
                START NOW
                <KeyboardDoubleArrowRightIcon/>
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Header;
