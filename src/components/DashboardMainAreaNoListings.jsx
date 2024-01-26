import React from "react";
import { motion } from "framer-motion";
import { useJobApplicationsListContext } from "./JobApplicationsListContext";
import "./DashboardMainAreaNoListings.css";
import { useMediaQuery } from "@mui/material";

function DashboardMainAreaNoListings() {

  const list = useJobApplicationsListContext();

  const isSmallScreen = useMediaQuery("(max-width:1000px)");

  return list.length === 0 ? (
    <motion.div
      key={0 + "-DashboardMainAreaNoListings"}
      className="DashboardSuggestionWrapperWhenEmpty"
    >
      <motion.span
        key={1 + "-DashboardMainAreaNoListings"}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.5,
          delay: 1,
          type: "spring",
          bounce: 0.5,
        }}
        className="DashboardSuggestion"
      >
        You didn't add any Job Applications to your listings yet!
      </motion.span>
      <motion.span
        key={2 + "-DashboardMainAreaNoListings"}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.5,
          delay: 1.5,
          type: "spring",
          bounce: 0.5,
        }}
        className="DashboardSuggestionCallToAction"
      >
        {" "}
        {isSmallScreen ? <p style={{display:"flex", flexDirection:"column", gap:"10px", alignItems:"center"}}><h3 style={{fontSize:"2rem"}}>👆</h3> Just add you first listing clicking on the button up here!</p> : <p style={{display:"flex", gap:"15px", alignItems:"center"}}><h3>👈</h3> Just add you first listing using the menu on the left!</p>}
      </motion.span>
    </motion.div>
  ) : (
    list.length < 5 && (
      <motion.span
        key={3 + "-DashboardMainAreaNoListings"}
        className="DashboardSuggestion"
      >
        Click on the application to open its link!
      </motion.span>
    )
  );
}

export default DashboardMainAreaNoListings;
