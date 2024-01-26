import React, { useState } from "react";
import AddNewListingForm from "./AddNewListingForm";
import { useMediaQuery } from "@mui/material";
import "./DashboardCard.css";
import { motion, easeOut, AnimatePresence } from "framer-motion";

function DashboardCard() {
  const isSmallScreen = useMediaQuery("(max-width:1000px)");

  const [addNewResponsiveVisible, setAddNewResponsiveVisible] = useState(false);

  return (
    <AnimatePresence>
      <motion.div
        layout
        key={0 + "-DashboardCard"}
        initial={ isSmallScreen ? { opacity: 0, x: 0 } : { opacity: 0, x: -250 }}
        animate={ isSmallScreen ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
        transition={isSmallScreen ? 
          {
          duration: 1,
          ease: easeOut,
          type: "spring",
          bounce: 0.35,
          delay: 0,
        }
        :
        {
          duration: 1,
          ease: easeOut,
          type: "spring",
          bounce: 0.35,
          delay: 0.3,
        }}
        className="DashboardCard"
      >
        <motion.div
          className="DashboardCardTopBar"
          layout
          key={0 + "-DashboardCardTopBar"}
        >
          {isSmallScreen ? (
            <button
              className={
                addNewResponsiveVisible
                  ? "DashboardCardAddButtonActive-Responsive"
                  : "DashboardCardAddButton-Responsive"
              }
              onClick={() =>
                setAddNewResponsiveVisible(!addNewResponsiveVisible)
              }
            >
              Add a New Listing!{" "}
              <p style={{ fontWeight: "900", color: "var(--white)" }}>+</p>
            </button>
          ) : (
            <h3>Add a New Listing</h3>
          )}
        </motion.div>

        {isSmallScreen ? (
          <AnimatePresence>
            {addNewResponsiveVisible && (
              <motion.div
                layout
                key={1 + "-DashboardCard"}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
              >
                <AddNewListingForm 
                  closeForm={() => setAddNewResponsiveVisible()}
                />
              </motion.div>
            )}
          </AnimatePresence>
        ) : (
          <AddNewListingForm />
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default DashboardCard;
