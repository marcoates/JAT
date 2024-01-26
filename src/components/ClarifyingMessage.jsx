import React, { useEffect, useState } from "react";
import "./ClarifyingMessage.css";
import { AnimatePresence, motion } from "framer-motion";

function ClarifyingMessage(props) {
  return (
    <AnimatePresence>
      {props.setClaryfingMessage && (
        <motion.div
          key={0 + "-ClaryfingMessage"}
          className="ClaryfingMessage"
          initial={{ x: 5, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          exit={{ x: 5, opacity: 0 }}
        >
          <span>
            Select <strong>All</strong> or <strong>Some</strong> Listings first,
            than click here to do a <strong>{props.action}</strong>
          </span>
          <div className="ClaryfingMessageArrow" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ClarifyingMessage;
