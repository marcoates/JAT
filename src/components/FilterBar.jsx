import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
import GradeIcon from "@mui/icons-material/Grade";
import {
  useSelectAllListingsContext,
  useSelectAllListingsContextUpdate,
  useSelectSomeListingsContext,
  useSelectSomeListingsContextUpdate,
  useSelectionContext,
  useSelectionContextUpdate,
} from "./ListingsSelectionContext";
import {
  useJobApplicationsListContext,
  useJobApplicationsListContextUpdate,
  // useJobApplicationsEditingItemContext,
  // useJobApplicationsEditingItemContextUpdate,
  // useMultipleEditWidgetIsOpenContext,
  // useMultipleEditWidgetIsOpenContextUpdate,
} from "./JobApplicationsListContext";
import {
  useShowFavoritesContext,
  useShowFavoritesContextUpdate,
} from "./ShowFavoritesContext";
import "./FilterBar.css";
// import EditWidget from "./EditWidget";
import ClarifyingMessage from "./ClarifyingMessage";
import { useMediaQuery } from "@mui/material";

function FilterBar() {
  const list = useJobApplicationsListContext();
  const updateList = useJobApplicationsListContextUpdate();

  // const editingItem = useJobApplicationsEditingItemContext();
  // const { setEditingItem } = useJobApplicationsEditingItemContextUpdate();

  const selectAllListings = useSelectAllListingsContext();
  const { setSelectAllListings } = useSelectAllListingsContextUpdate();
  const selectSomeListings = useSelectSomeListingsContext();
  const { setSelectSomeListings } = useSelectSomeListingsContextUpdate();

  const selection = useSelectionContext();
  const { setSelection } = useSelectionContextUpdate();

  const showFavorites = useShowFavoritesContext();
  const { setShowFavorites } = useShowFavoritesContextUpdate();

  // const multipleEditWidgetIsOpen = useMultipleEditWidgetIsOpenContext();
  // const { setMultipleEditWidgetIsOpen } =
  //   useMultipleEditWidgetIsOpenContextUpdate();

  // const wrapperRefEditWidget = useRef(null);

  // useEffect(() => {
  //   console.log(editingItem);
  // }, [editingItem]); // Dependencies array (optional)

  ////////////////////////////////////////////////////////////////////// ClaryfingMessage

  // const [showClarifyngEditMessage, setShowClarifyngEditMessage] =
  //   useState(false);
  const [showClarifyngDeleteMessage, setShowClarifyngDeleteMessage] =
    useState(false);

  // useEffect(
  //   (props) => {
  //     // Clear the existing timeout when the component rerenders
  //     const timeoutId = setTimeout(() => {
  //       setShowClarifyngEditMessage(false);
  //     }, 3000);

  //     // Return a cleanup function that clears the timeout
  //     // if the component unmounts or rerenders
  //     return () => {
  //       clearTimeout(timeoutId);
  //     };
  //   },
  //   [showClarifyngEditMessage]
  // ); // Depend on `showElement` to reset the timeout on every render

  useEffect(
    (props) => {
      // Clear the existing timeout when the component rerenders
      const timeoutId = setTimeout(() => {
        setShowClarifyngDeleteMessage(false);
      }, 3000);

      // Return a cleanup function that clears the timeout
      // if the component unmounts or rerenders
      return () => {
        clearTimeout(timeoutId);
      };
    },
    [showClarifyngDeleteMessage]
  ); // Depend on `showElement` to reset the timeout on every render

  //////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////// Closing EditWidget When detecting click outside it

  // useEffect(() => {
  //   let timeoutId;
  //   const handleClickOutside = (event) => {
  //     if (
  //       wrapperRefEditWidget.current &&
  //       !wrapperRefEditWidget.current.contains(event.target)
  //     ) {
  //       setMultipleEditWidgetIsOpen(false);
  //     }
  //   };

  //   // Add event listener with a delay to ignore the initial click
  //   if (multipleEditWidgetIsOpen) {
  //     timeoutId = setTimeout(() => {
  //       document.addEventListener("click", handleClickOutside, false);
  //     }, 100); // Delay in ms
  //   }

  //   // Cleanup function
  //   return () => {
  //     clearTimeout(timeoutId); // Clear the timeout
  //     document.removeEventListener("click", handleClickOutside, false);
  //   };
  // }, [multipleEditWidgetIsOpen, setMultipleEditWidgetIsOpen]);

  //////////////////////////////////////////////////////////////////////

  function multipleDeletion () {
    const selectionIds = new Set(selection.map(obj => obj.id));
    const filteredList = list.filter(obj => !selectionIds.has(obj.id));
    updateList(filteredList);
    setSelectAllListings(false);
    setSelectSomeListings(false);
    setSelection([]);
  };

  function handleSelectAllChange() {
    const newSelectAllState = !selectAllListings;
    setSelectAllListings(newSelectAllState);
    setSelectSomeListings(false);

    // Update selection only if new state is true
    if (newSelectAllState) {
      setSelection(list);
    }
  }

  function handleSelectSomeChange() {
    const newSelectSomeState = !selectSomeListings;
    setSelectSomeListings(newSelectSomeState);
    setSelectAllListings(false);

    // Reset selection only if new state is true
    if (newSelectSomeState) {
      setSelection([]);
    }
  }

  const isSmallScreen = useMediaQuery("(max-width:1000px)");

  return (
    <AnimatePresence>
      {list.length > 1 && (
        <motion.div
        key={0 + "-DashboardFiltersBar"}
        layout
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
          className="DashboardFiltersBar"
        >
          <ul className="DashboardFiltersBarList">
            <li className="DashboardFiltersBarItem">
              <div
                className={
                  selectAllListings
                    ? "DashboardFiltersBarItemContainerFocus"
                    : "DashboardFiltersBarItemContainer"
                }
                onClick={handleSelectAllChange}
              >
                <input
                  checked={selectAllListings}
                  type="checkbox"
                  className="DashboardFiltersBarItemCheckbox"
                  onChange={handleSelectAllChange}
                />
                <label>Select All</label>
              </div>
              <div
                className={
                  selectSomeListings
                    ? "DashboardFiltersBarItemContainerFocus"
                    : "DashboardFiltersBarItemContainer"
                }
                onClick={handleSelectSomeChange}
              >
                <label>Select Some</label>
              </div>
              {/* <div
                className="DashboardMainAreaItemTagsEdit"
                onClick={(event) => {
                  event.preventDefault();
                  setShowClarifyngDeleteMessage(false);
                  setMultipleEditWidgetIsOpen(!multipleEditWidgetIsOpen);
                  multipleEditWidgetIsOpen
                    ? setEditingItem({
                        id: 0,
                        link: "",
                        companyName: "",
                        jobTitle: "",
                        salary: "",
                        tags: "",
                        favorite: false,
                      })
                    : setEditingItem(editingItem);
                  setShowClarifyngEditMessage(!showClarifyngEditMessage);
                  console.log(editingItem);
                }}
              >
                <EditIcon fontSize="medium" />
                <AnimatePresence>
                  {selectAllListings ? (
                    multipleEditWidgetIsOpen && (
                      <div
                        ref={wrapperRefEditWidget}
                        style={{
                          position: "absolute",
                          display: "flex",
                          alignItems: "center",
                          right: "100%",
                          zIndex: "100",
                          cursor: "auto",
                        }}
                      >
                        <EditWidget
                          ref={wrapperRefEditWidget}
                          key={0 + "-editWidget"} // Adjust key to ensure uniqueness
                          id={0}
                          link={""}
                          companyName={""}
                          jobTitle={""}
                          salary={""}
                          favorite={false}
                          item={"FilterBar"}
                        />
                      </div>
                    )
                  ) : selection.length !== 0 ? (
                    multipleEditWidgetIsOpen && (
                      <div
                        ref={wrapperRefEditWidget}
                        style={{
                          position: "absolute",
                          display: "flex",
                          alignItems: "center",
                          right: "100%",
                          zIndex: "100",
                          cursor: "auto",
                        }}
                      >
                        <EditWidget
                          ref={wrapperRefEditWidget}
                          key={0 + "-editWidget"} // Adjust key to ensure uniqueness
                          id={0}
                          link={""}
                          companyName={""}
                          jobTitle={""}
                          salary={""}
                          favorite={false}
                          item={"FilterBar"}
                        />
                      </div>
                    )
                  ) : (
                    <ClarifyingMessage
                      setClaryfingMessage={showClarifyngEditMessage}
                      action="Multiple Edit!"
                    />
                  )}
                </AnimatePresence>
              </div> */}
              <span
                className="DashboardFiltersBarTagsDelete"
                onClick={(event) => {
                  event.preventDefault();
                  // setShowClarifyngEditMessage(false);
                  setShowClarifyngDeleteMessage(!showClarifyngDeleteMessage);
                  multipleDeletion();
                }}
              >
                <DeleteIcon fontSize="medium" />
                <AnimatePresence>
                  {selectAllListings ? null : selection.length !== 0 ? null : (
                    <ClarifyingMessage
                      setClaryfingMessage={showClarifyngDeleteMessage}
                      action="Multiple Deletion!"
                    />
                  )}
                </AnimatePresence>
              </span>
            </li>
            <li className="DashboardFiltersBarItem">
              <button
                type="button"
                className={
                  showFavorites
                    ? "EditWidgetFavoriteButtonFocus"
                    : "EditWidgetFavoriteButton"
                }
                onClick={() => setShowFavorites(!showFavorites)}
              >
                Favorites! <GradeIcon fontSize="small" />
              </button>
            </li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default FilterBar;
