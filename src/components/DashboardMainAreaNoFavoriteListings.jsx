import React from "react";
import { motion } from "framer-motion";
import "./DashboardMainAreaNoListings.css";
import { useJobApplicationsListContext } from "./JobApplicationsListContext";

function DashboardMainAreaNoFavoriteListings() {
  const list = useJobApplicationsListContext();

  return list.filter((item) => item.favorite === true).length === 0 ? (
    <div className="DashboardSuggestionWrapperWhenEmpty">
      <motion.span
        key={0 + "-DashboardSuggestion"}
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
        You do not have added any{" "}
        <strong style={{ color: "var(--gold)", fontWeight: "500" }}>
          Favorite
        </strong>{" "}
        Job Applications to your listings yet!
      </motion.span>
      <motion.span
        key={0 + "-DashboardSuggestionCallToActionFavorite"}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.5,
          delay: 1.5,
          type: "spring",
          bounce: 0.5,
        }}
        className="DashboardSuggestionCallToActionFavorite"
      >
        {" "}
        <h3>👈</h3>
        <span>
          Just add you first{" "}
          <strong style={{ color: "var(--gold)", fontWeight: "500" }}>
            Favorite
          </strong>{" "}
          listing using the menu on the left! <br />
          Or Edit one of your listings adding the{" "}
          <strong style={{ color: "var(--gold)", fontWeight: "500" }}>
            Favorite
          </strong>{" "}
          property to it!
        </span>
      </motion.span>
    </div>
  ) : (
    list.length < 7 && (
      <span className="DashboardSuggestion">
        Click on the application to open its link!
      </span>
    )
  );
}

export default DashboardMainAreaNoFavoriteListings;
