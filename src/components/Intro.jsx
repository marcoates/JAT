import React from "react";
import "./Intro.css";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import SearchIcon from "@mui/icons-material/Search";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { easeOut, motion } from "framer-motion";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

function Intro() {
  const isSmallScreen = useMediaQuery("(max-width:1000px)");

  return (
    <div className="IntroWrapper">
      <div className="IntroImageContainer">
        <motion.img
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 1,
            ease: easeOut,
            type: "spring",
            bounce: 0.5,
          }}
          className="IntroImage"
          alt="job-applications-tracker-homepage-graphic"
          src={require("../assets/JAT_graphic-01.png")}
        />
      </div>
      <motion.div
        className="IntroMessage"
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 1,
          ease: easeOut,
          delay: 0.5,
          type: "spring",
          bounce: 0.5,
        }}
      >
        <ul className="IntroMessageList">
          <li className="IntroMessageListItem">
            <h1 className="IntroMessageListItemTitle">Track... Triumph!</h1>
            {isSmallScreen ?
              <span className="IntroMessageListItemTitleWrapper">
             <p> Revolutionize your job search with seamless tracking and
              organization.
              </p>
              <span className="IntroMessageListItemTitleWrapperContainer">
              <h1 className="IntroMessageListItemTitle" style={{scale: "0.75"}}>Stay Prepared!</h1>
            <p className="IntroMessageListItemText"> Effortlessly monitor every application and stay one
              step ahead. Be perfectly prepared for every recruiter call, and
              turn job hunting from stressful to successful.
            </p>
            </span>
            </span>
            :
            <p className="IntroMessageListItemText">
              Revolutionize your job search with seamless tracking and
              organization. Effortlessly monitor every application and stay one
              step ahead. Be perfectly prepared for every recruiter call, and
              turn job hunting from stressful to successful.
            </p>
            }
          </li>
          <motion.li
            className="IntroMessageListItem"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 1,
              ease: easeOut,
              delay: 0.75,
              type: "spring",
              bounce: 0.5,
            }}
          >
            <div className="IntroFeatureWrapper">
              <FormatListBulletedIcon
                fontSize="large"
                className="IntroFeatureIcon"
              />
              <p className="IntroFeatureText">
                Track fast & simple all your Job Applications.
              </p>
            </div>
          </motion.li>
          <motion.li
            className="IntroMessageListItem"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 1,
              ease: easeOut,
              delay: 1,
              type: "spring",
              bounce: 0.5,
            }}
          >
            <div className="IntroFeatureWrapper">
              <SearchIcon fontSize="large" className="IntroFeatureIcon" />
              <p className="IntroFeatureText">
                Quick save, search and find flow.
              </p>
            </div>
          </motion.li>
          <motion.li
            className="IntroMessageListItem"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 1,
              ease: easeOut,
              delay: 1.25,
              type: "spring",
              bounce: 0.5,
            }}
          >
            <div className="IntroFeatureWrapper">
              <ThumbUpAltIcon fontSize="large" className="IntroFeatureIcon" />
              <p className="IntroFeatureText">
                Always prepared when recruiters will call you.
              </p>
            </div>
          </motion.li>
        </ul>
        {isSmallScreen && (
          <Link to="/App">
            <button className="IntroCallToActionBigger">
              START NOW
              <KeyboardDoubleArrowRightIcon />
            </button>
          </Link>
        )}
      </motion.div>
    </div>
  );
}

export default Intro;
