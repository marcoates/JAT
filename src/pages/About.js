import React from "react";
import "./About.css";
import { easeOut, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

export default function About() {
  const isSmallScreen = useMediaQuery("(max-width:1000px)");

  return (
    <motion.div
      className="AboutWrapper"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: easeOut, type: "spring", bounce: 0.5 }}
    >
      {isSmallScreen ? (
        <ul className="AboutWrapperList">
          <li className="AboutWrapperListItem">
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.3,
                type: "spring",
                bounce: 0.5,
                delay: 0.3,
              }}
              className="decoration"
            ></motion.div>
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.3,
                type: "spring",
                bounce: 0.5,
                delay: 0.5,
              }}
              className="decoration"
            ></motion.div>
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.3,
                type: "spring",
                bounce: 0.5,
                delay: 0.7,
              }}
              className="decoration"
            ></motion.div>
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.3,
                type: "spring",
                bounce: 0.5,
                delay: 1,
              }}
              className="decoration"
            ></motion.div>
            <img
              alt="JAT-Job-Applications-Tracker-Marco-Braggion-Developer-Designer-Pic"
              className="AboutPic"
              src={require("../assets/Picture.jpeg")}
            />

          </li>
            <li className="AboutWrapperListItem">
              <h1>About the Creator</h1>
              <h3>Marco Braggion - Front End Dev</h3>
              <p>
                Hello! I'm Marco Braggion, the developer and creative force
                behind{" "}
                <bold className="enhanchedText">
                  JAT: Job Applications Tracker
                </bold>
                . With my roots in design and a profound shift towards software
                development, I've blended aesthetics with functionality in{" "}
                <bold className="enhanchedText">JAT</bold>.
              </p>
            </li>
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="AboutCallToActionList"
            >
              <Link
                className="AboutCallToActionListItemWrapper"
                to="https://marcobraggion.com"
              >
                <li className="AboutCallToActionListItem">
                  <h3>Visit my website!</h3>
                </li>
                <li className="AboutCallToActionListItemLogo">
                  <img
                    alt="JAT-Job-Applications-Tracker-Marco-Braggion-Developer-Designer-Logo"
                    className="AboutMBLogo"
                    src={require("../assets/Stondato.png")}
                  />
                </li>
              </Link>
            </motion.ul>
        </ul>
      ) : (
        <ul className="AboutWrapperList">
          <li className="AboutWrapperListItem">
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.3,
                type: "spring",
                bounce: 0.5,
                delay: 0.3,
              }}
              className="decoration"
            ></motion.div>
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.3,
                type: "spring",
                bounce: 0.5,
                delay: 0.5,
              }}
              className="decoration"
            ></motion.div>
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.3,
                type: "spring",
                bounce: 0.5,
                delay: 0.7,
              }}
              className="decoration"
            ></motion.div>
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.3,
                type: "spring",
                bounce: 0.5,
                delay: 1,
              }}
              className="decoration"
            ></motion.div>
            <img
              alt="JAT-Job-Applications-Tracker-Marco-Braggion-Developer-Designer-Pic"
              className="AboutPic"
              src={require("../assets/Picture.jpeg")}
            />
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="AboutCallToActionList"
            >
              <Link
                className="AboutCallToActionListItemWrapper"
                to="https://marcobraggion.com"
              >
                <li className="AboutCallToActionListItem">
                  <h3>Visit my website!</h3>
                </li>
                <li className="AboutCallToActionListItemLogo">
                  <img
                    alt="JAT-Job-Applications-Tracker-Marco-Braggion-Developer-Designer-Logo"
                    className="AboutMBLogo"
                    src={require("../assets/Stondato.png")}
                  />
                </li>
              </Link>
            </motion.ul>
          </li>
          <li className="AboutWrapperListItem">
            <h1>About the Creator</h1>
            <h3>Marco Braggion: From Design to Development</h3>
            <p>
              Hello! I'm Marco Braggion, the developer and creative force behind{" "}
              <bold className="enhanchedText">
                JAT: Job Applications Tracker
              </bold>
              . With my roots in design and a profound shift towards software
              development, I've blended aesthetics with functionality in{" "}
              <bold className="enhanchedText">JAT</bold>.
            </p>
            <p>
              This web app is built using React! My journey in creating{" "}
              <bold className="enhanchedText">JAT</bold> has been about bridging
              the gap between design sensibilities and technical prowess,
              ensuring that your job application process is as seamless and
              effective as your pursuits.
            </p>
          </li>
        </ul>
      )}
    </motion.div>
  );
}
