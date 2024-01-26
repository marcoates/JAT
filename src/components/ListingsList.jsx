import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import EditWidget from "./EditWidget";
import Listing from "./Listing";
import { useMediaQuery } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import GradeIcon from "@mui/icons-material/Grade";
import { motion, AnimatePresence } from "framer-motion";
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
  useJobApplicationsEditingItemContext,
  useJobApplicationsEditingItemContextUpdate,
  useEditWidgetIsOpenContext,
  useEditWidgetIsOpenContextUpdate,
} from "./JobApplicationsListContext";

function ListingsList(props) {
  const list = useJobApplicationsListContext();
  const updateList = useJobApplicationsListContextUpdate();

  const editingItem = useJobApplicationsEditingItemContext();
  const { setEditingItem } = useJobApplicationsEditingItemContextUpdate();
  const editWidgetIsOpen = useEditWidgetIsOpenContext();
  const { setEditWidgetIsOpen } = useEditWidgetIsOpenContextUpdate();

  const selectAllListings = useSelectAllListingsContext();
  const { setSelectAllListings } = useSelectAllListingsContextUpdate();
  const selectSomeListings = useSelectSomeListingsContext();
  const { setSelectSomeListings } = useSelectSomeListingsContextUpdate();
  const selection = useSelectionContext();
  const { setSelection } = useSelectionContextUpdate();

  const wrapperRefEditWidget = useRef(null);

  useEffect(() => {
    console.log(selection);
  }, [selection]); // Dependencies array (optional)

  useEffect(() => {
    console.log("ListingsList Rendered", list);
  }, [list]);

  function toggleSelection(item, event) {
    const isSelected = selection.some(
      (selectedItem) => selectedItem.id === item.id
    );
    if (isSelected) {
      setSelection((prevValues) =>
        prevValues.filter((selectedItem) => selectedItem.id !== item.id)
      );
      if (selection.length > 1) {
        setSelectAllListings(false);
        setSelectSomeListings(true);
      }
    } else {
      setSelection((prevValues) => [...prevValues, item]);
    }
  }

  const isSmallScreen = useMediaQuery("(max-width:1000px)");

  return (
    <motion.li
      layout
      className="DashboardMainAreaItemWrapper"
      key={props.item.id}
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
    >
      {selectAllListings && (
        <AnimatePresence>
          <motion.div
            layout
            key={props.item.id + "-selectAll"} // Adjust key to ensure uniqueness
            className="DashboardMainAreaItemCheckboxFocus"
            initial={{ opacity: 0, x: -5, y: 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{
              opacity: 0,
              x: 5,
              y: 0,
            }}
            transition={{ duration: 0.3 }}
            onClick={(event) => toggleSelection(props.item, event)}
          >
            <input
              type="checkbox"
              className="DashboardFiltersBarItemCheckbox"
              checked={
                selection.some(
                  (selectedItem) => selectedItem.id === props.item.id
                )
                  ? true
                  : false
              }
              onChange={(event) => {
                event.stopPropagation(); // Prevents the event from bubbling up to the parent element
              }}
            />
          </motion.div>
        </AnimatePresence>
      )}

      {selectSomeListings && list.length > 1 && (
        <AnimatePresence>
          <motion.div
            key={props.item.id + "-selectSome"} // Adjust key to ensure uniqueness
            layout
            className={
              selection.some(
                (selectedItem) => selectedItem.id === props.item.id
              )
                ? "DashboardMainAreaItemCheckboxFocus"
                : "DashboardMainAreaItemCheckboxContainer"
            }
            initial={{ opacity: 0, x: -5, y: 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{
              opacity: 0,
              x: 5,
              y: 0,
            }}
            transition={{ duration: 0.3 }}
            onClick={(event) => toggleSelection(props.item, event)}
          >
            <input
              type="checkbox"
              className="DashboardFiltersBarItemCheckbox"
              checked={selection.some(
                (selectedItem) => selectedItem.id === props.item.id
              )}
              onChange={(event) => {
                event.stopPropagation(); // Prevents the event from bubbling up to the parent element
              }}
            />
          </motion.div>
        </AnimatePresence>
      )}

      <motion.div
        layout
        className={
          props.item.favorite === false
            ? "DashboardMainAreaItem"
            : "DashboardMainAreaItemFavorite"
        }
        key={props.item.id + "-mainDiv"} // Adjust key to ensure uniqueness
      >
        {" "}
        <Link
          className="DashboardMainAreaItemLink"
          to={props.item.link}
          target="blank"
        >
          <Listing item={props.item}
          JobTitleWidthHandlingWhenCheckboxesAppear1={selectSomeListings}
          JobTitleWidthHandlingWhenCheckboxesAppear2={selectAllListings}
          />

          <motion.div
            layout
            className="DashboardMainAreaItemTagsContainer"
            key={props.item.id + "-mainDivTagsContainer"} // Adjust key to ensure uniqueness
          >
            {props.item.favorite && (
              <motion.span
                className="DashboardMainAreaItemTagsFavorite"
                key={props.item.id + "-mainDivDescriptionFavorite"}
                layout
              >
                <GradeIcon fontSize="medium" />
              </motion.span>
            )}
            <motion.span
              key={props.item.id + "-mainDivDescriptionEdit"}
              layout
              className="DashboardMainAreaItemTagsEdit"
              ref={wrapperRefEditWidget}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation(); // Prevent event from bubbling up
                setEditWidgetIsOpen(!editWidgetIsOpen);
                // Ensure that only one widget is open at a time
                // if (editWidgetFilteredIsOpen) {
                //   setEditWidgetFilteredIsOpen(false);
                // }
                setEditingItem(props.item);
              }}
            >
              <EditIcon fontSize="medium" />
              <AnimatePresence>
                {editWidgetIsOpen &&
                  editingItem !== undefined &&
                  editingItem.id === props.item.id && (
                    <EditWidget
                      key={props.item.id + "-editWidget"} // Adjust key to ensure uniqueness
                      id={props.item.id}
                      link={props.item.link}
                      companyName={props.item.companyName}
                      jobTitle={props.item.jobTitle}
                      salary={props.item.salary}
                      favorite={props.item.favorite}
                      item={props.item}
                    />
                  )}
              </AnimatePresence>
            </motion.span>
            {isSmallScreen ? (
              selectAllListings ? null : selectSomeListings ? null : (
                <motion.span
                  key={props.item.id + "-mainDivDescriptionDelete"}
                  layout
                  className="DashboardMainAreaItemTagsDelete"
                  onClick={(event) => {
                    event.preventDefault();
                    updateList(list.filter((_, i) => _.id !== props.item.id));
                  }}
                >
                  <DeleteIcon fontSize="medium" />
                </motion.span>
              )
            ) : (
              <motion.span
                key={props.item.id + "-mainDivDescriptionDelete"}
                layout
                className="DashboardMainAreaItemTagsDelete"
                onClick={(event) => {
                  event.preventDefault();
                  updateList(list.filter((_, i) => _.id !== props.item.id));
                }}
              >
                <DeleteIcon fontSize="medium" />
              </motion.span>
            )}
          </motion.div>
        </Link>
      </motion.div>
    </motion.li>
  );
}

export default ListingsList;
