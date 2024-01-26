import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ListingsList from "./ListingsList";
import "./DashBoardMainAreaListings.css";
import {
  useSelectAllListingsContextUpdate,
  useSelectSomeListingsContextUpdate,
  useSelectionContext,
} from "./ListingsSelectionContext";
import { useJobApplicationsListContext } from "./JobApplicationsListContext";
import {
  useShowFavoritesContext,
  useShowFavoritesContextUpdate,
} from "./ShowFavoritesContext";

function DashboardMainAreaListings() {
  const list = useJobApplicationsListContext();

  const { setSelectAllListings } = useSelectAllListingsContextUpdate();
  const { setSelectSomeListings } = useSelectSomeListingsContextUpdate();
  const selection = useSelectionContext();

  const showFavorites = useShowFavoritesContext();
  const { setShowFavorites } = useShowFavoritesContextUpdate();

  // useEffect for handling selectAllListings and selectSomeListings based on list length
  useEffect(() => {
    if (selection.length === list.length) {
      setSelectAllListings(true);
      setSelectSomeListings(false);
    }
    if (selection.length < list.length) {
      if (list.length <= 1) {
        setSelectAllListings(false);
        setSelectSomeListings(false);
      }
    }
  }, [
    list.length,
    selection.length,
    setSelectAllListings,
    setSelectSomeListings,
  ]);

  return (
    <motion.ul layout className="DashboardMainAreaList" key={0 + "-DashboardMainAreaList"}>
      <AnimatePresence>
        {showFavorites ? 
          list.filter((_)=> _.favorite === true).map((item, index) => (
          <ListingsList
            key={item.id} // Add the key prop here
            id={item.id}
            link={item.link}
            companyName={item.companyName}
            jobTitle={item.jobTitle}
            salary={item.salary}
            tags={item.tags}
            favorite={item.favorite}
            index={index}
            item={item}
          />
        ))
        :
        list.map((item, index) => (
          <ListingsList
            key={item.id} // Add the key prop here
            id={item.id}
            link={item.link}
            companyName={item.companyName}
            jobTitle={item.jobTitle}
            salary={item.salary}
            tags={item.tags}
            favorite={item.favorite}
            index={index}
            item={item}
          />
        ))
        }
      </AnimatePresence>
    </motion.ul>
  );
}

export default DashboardMainAreaListings;
