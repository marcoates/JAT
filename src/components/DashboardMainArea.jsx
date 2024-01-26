import React from "react";
import "./DashboardMainArea.css";
import { AnimatePresence, motion } from "framer-motion";
import FilterBar from "./FilterBar";
import DashboardSearchBar from "./DashboardSearchBar";
import DashboardMainAreaListings from "./DashboardMainAreaListings";
import DashboardMainAreaNoListings from "./DashboardMainAreaNoListings";
import DashboardMainAreaNoFavoriteListings from "./DashboardMainAreaNoFavoriteListings";
import { useShowFavoritesContext } from "./ShowFavoritesContext";

function DashboardMainArea() {
  const showFavorites = useShowFavoritesContext();

  return (
    <AnimatePresence>
      <motion.div
      layout
        key={0 + "-DashboardMainArea"}
        className="DashboardMainArea"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <DashboardSearchBar />
        <FilterBar />
        <DashboardMainAreaListings />

        {showFavorites ? (
          <DashboardMainAreaNoFavoriteListings />
        ) : (
          <DashboardMainAreaNoListings />
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default DashboardMainArea;
