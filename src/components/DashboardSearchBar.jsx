import React, { useRef, useState, useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import GradeIcon from "@mui/icons-material/Grade";
import PaidIcon from "@mui/icons-material/Paid";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  useJobApplicationsListContext,
  useJobApplicationsListContextUpdate,
  useJobApplicationsEditingItemContext,
  useJobApplicationsEditingItemContextUpdate,
  useEditWidgetIsOpenContext,
  useEditWidgetIsOpenContextUpdate,
} from "./JobApplicationsListContext";
import {
  useFilteredValueContext,
  useFilteredValuesContextUpdate,
  useFilteredListContext,
  useFilteredListContextUpdate,
} from "./ListingsGenericFilteringContext";
import EditWidget from "../components/EditWidget";
import "./DashboardSearchBar.css";

function DashboardSearchBar() {
  const list = useJobApplicationsListContext();
  const updateList = useJobApplicationsListContextUpdate();
  const editWidgetIsOpen = useEditWidgetIsOpenContext();
  const { setEditWidgetIsOpen } = useEditWidgetIsOpenContextUpdate();

  const filteredValue = useFilteredValueContext();
  const { setFilteredValue } = useFilteredValuesContextUpdate();
  const filteredList = useFilteredListContext();
  const { setFilteredList } = useFilteredListContextUpdate();

  const editingItem = useJobApplicationsEditingItemContext();
  const { setEditingItem } = useJobApplicationsEditingItemContextUpdate();

  // const [editFilteredListing, setEditFilteredListing] = useState([]);
  const [editWidgetFilteredIsOpen, setEditWidgetFilteredIsOpen] =
    useState(false);

  const wrapperRef = useRef(null);

  const wrapperRefEditWidget = useRef(null);

  // Updating filteredList every time any Item inside list updates

  useEffect(() => {
    // Function to handle filtering

    filteredList.length !== 0 &&
      setFilteredList(
        list.filter((item) => {
          return Object.values(item).some((value) => {
            return value.toString().toLowerCase().includes(filteredValue);
          });
        })
      );

    setEditWidgetFilteredIsOpen(false);
  }, [list, filteredValue, filteredList.length, setFilteredList]); // Depend on list and filteredValue

  // Close searcbar dropdown when click outside it is detected

  useEffect(() => {
    // Define the handleClickOutside function
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setFilteredList([]);
      }
    };

    // Attach the event listener after the component is mounted
    document.addEventListener("click", handleClickOutside, false);

    // Remove the event listener when the component is unmounted
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, [setFilteredList, filteredList]); // Empty dependency array ensures it runs after mount

  // Search bar handleChange function

  function handleChange(event) {
    setFilteredValue(event.target.value.toLowerCase()); // Convert to lowercase for case-insensitive comparison

    setFilteredList(
      list.filter((item) => {
        return Object.values(item).some((value) => {
          // Ensure the value is a string before calling .includes()
          return value.toString().toLowerCase().includes(filteredValue);
        });
      })
    );
  }

  const isSmallScreen = useMediaQuery("(max-width:1000px)");

  return (
    <motion.div
      key={0 + "-DashboardSearchBar"}
      layout
      className="DashboardSearchBarWrapper"
      style={
        isSmallScreen
          ? filteredList.length !== 0
            ? { borderRadius: "0px" }
            : { borderRadius: "0px 0px 15px 15px" }
          : filteredList.length !== 0
          ? { borderRadius: "15px 15px 0px 0px" }
          : { borderRadius: "15px" }
      }
    >
      <div className="DashboardSearchBar" ref={wrapperRef}>
        <SearchIcon className="DashboardSearchBarIcon" />
        <input
          className="DashboardSearchBarBar"
          placeholder={
            isSmallScreen
              ? "Just write anything to filter your listings here!"
              : "Write anything like Employer Name, Job Title, Tags or whatever could find the listing!"
          }
          type="text"
          onChange={handleChange}
          onClick={() => setFilteredList(filteredList)}
          // onBlur={() => setFilteredList([])}
        ></input>
        {filteredList.length === 0 ? null : (
          <motion.div
            key={1 + "-DashboardSearchBar"}
            id="notReset"
            layout
            className="DashboardMainAreaFilteredListingsWrapper"
          >
            <motion.ul
              key={2 + "-DashboardSearchBar"}
              id="notReset"
              layout
              className="DashboardMainAreaFilteredListingsList"
            >
              <AnimatePresence>
                {filteredList.map((filteredItem, filteredIndex) => (
                  <motion.li
                    id="notReset"
                    className="DashboardMainAreaItemWrapper"
                    key={filteredItem.id + "-DashboardMainAreaItem"}
                    layout
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                  >
                    <Link
                    className="DashboardMainAreaItemLink"
                      to={filteredItem.link}
                      target="blank"
                    >
                      <div
                        id="notReset"
                        className={
                          filteredItem.favorite === false
                            ? "DashboardMainAreaItem"
                            : "DashboardMainAreaItemFavorite"
                        }
                        key={filteredIndex}
                      >

    <motion.div
      key={filteredItem.id + "-DashboardMainAreaItemDescriptionWrapper"} // Adjust key to ensure uniqueness
      layout
      className="DashboardMainAreaItemDescriptionWrapper"
    >
      <motion.div
        key={filteredItem.id + "-DescriptionContainer"} // Adjust key to ensure uniqueness
        layout
        className="DescriptionContainer"
      >
                        <div
                          id="notReset"
                          className="DashboardMainAreaItemDescriptionContainer"
                        >
                          <span
                            className="DashboardMainAreaItemDescriptionEmployerName"
                            id="notReset"
                          >
                            {filteredItem.companyName}
                          </span>
                          <span
                            className="DashboardMainAreaItemDescriptionJobTitle"
                            id="notReset"
                          >
                            {filteredItem.jobTitle.length > 16 ? filteredItem.jobTitle.substr(0, 13) + "\u2026" : filteredItem.jobTitle}
                          </span>
                          {filteredItem.salary !== "" && (
                            <span
                              className="DashboardMainAreaItemTagsSalary"
                              id="notReset"
                            >
                              <PaidIcon
                                fontSize="small"
                                style={{ color: "#96E6B3" }}
                              />{" "}
                              {filteredItem.salary}
                            </span>
                          )}
                        </div>
                        
                        {Array.isArray(filteredItem.tags) && filteredItem.tags !== undefined && (
          <motion.div
            key={filteredItem.id + "-TagsContainer"}
            layout
            className="TagsContainer"
          >

            <AnimatePresence>
              {filteredItem.tags.map((tag, index) => (
                <motion.span
                  key={index + "-mainDivDescriptionTags"}
                  layout
                  className="DashboardMainAreaItemTagsTags"
                >
                  {tag}
                </motion.span>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
                          
                        <div
                          className="DashboardMainAreaItemTagsContainer"
                          id="notReset"
                        >
                          {filteredItem.favorite && (
                            <span
                              className="DashboardMainAreaItemTagsFavorite"
                              id="notReset"
                            >
                              <GradeIcon fontSize="medium" />
                            </span>
                          )}
                          <span
                            type="button"
                            id="notReset"
                            className="DashboardMainAreaItemTagsEdit"
                            ref={wrapperRefEditWidget}
                            onClick={(event) => {
                              event.preventDefault();
                              event.stopPropagation(); // Prevent event from bubbling up
                              setEditingItem(filteredItem);
                              setEditWidgetFilteredIsOpen(
                                !editWidgetFilteredIsOpen
                              );
                              // Ensure that only one widget is open at a time
                              if (editWidgetIsOpen) {
                                setEditWidgetIsOpen(false);
                              }
                            }}
                          >
                            <EditIcon fontSize="medium" />

                            <AnimatePresence>
                              {editWidgetFilteredIsOpen &&
                                editingItem &&
                                editingItem.id === filteredItem.id && (
                                  <EditWidget
                                    handleChange={handleChange}
                                    id={filteredItem.id}
                                    link={filteredItem.link}
                                    CompanyName={filteredItem.companyName}
                                    jobTitle={filteredItem.jobTitle}
                                    salary={filteredItem.salary}
                                    favorite={filteredItem.favorite}
                                    item={filteredItem}
                                  />
                                )}
                            </AnimatePresence>
                          </span>
                          <span
                            className="DashboardMainAreaFilteredItemTagsDelete"
                            id="notReset"
                            onClick={(event) => {
                              event.preventDefault();
                              updateList((prevList) => {
                                const updatedList = prevList.filter(
                                  (_, i) => _.id !== filteredItem.id
                                );
                                setFilteredList(updatedList); // Also update the filteredList
                                return updatedList;
                              });
                              filteredList.length === 0 && setFilteredList([]);
                            }}
                          >
                            <DeleteIcon fontSize="medium" />
                          </span>
                        </div>
                        </motion.div>
                        </motion.div>
                      </div>
                    </Link>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </motion.div>
        )}
        <button type="submit" className="DashboardSearchBarButton">
          Search!
        </button>
      </div>
    </motion.div>
  );
}

export default DashboardSearchBar;
