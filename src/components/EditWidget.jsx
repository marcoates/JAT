import React, { useEffect, useRef, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GradeIcon from "@mui/icons-material/Grade";
import EditIcon from "@mui/icons-material/Edit";
import "./EditWidget.css";
import {
  useJobApplicationsListContext,
  // useJobApplicationsListContextUpdate,
  useEditWidgetIsOpenContext,
  useEditWidgetIsOpenContextUpdate,
  useJobApplicationsEditingItemContext,
  useJobApplicationsEditingItemContextUpdate,
  // useMultipleEditWidgetIsOpenContext,
  useMultipleEditWidgetIsOpenContextUpdate,
} from "./JobApplicationsListContext";
// import {
//   useSelectionContext,
// } from "./ListingsSelectionContext";

const EditWidget = forwardRef((props, ref) => {
  const list = useJobApplicationsListContext();
  // const updateList = useJobApplicationsListContextUpdate();
  const editWidgetIsOpen = useEditWidgetIsOpenContext();
  const { setEditWidgetIsOpen } = useEditWidgetIsOpenContextUpdate();
  const editingItem = useJobApplicationsEditingItemContext();
  const {
    handleChangeEdit,
    handleFavoriteEdit,
    handleSubmitEdit,
  } = useJobApplicationsEditingItemContextUpdate();
  // const selection = useSelectionContext();

  // const multipleEditWidgetIsOpen = useMultipleEditWidgetIsOpenContext();
  const { setMultipleEditWidgetIsOpen } = useMultipleEditWidgetIsOpenContextUpdate();

  const wrapperRefEditWidget = useRef(null);
  // const [tempEditingValues, setTempEditingValues] = useState({});

  useEffect(() => {
    let timeoutId;
    const handleClickOutside = (event) => {
      if (
        wrapperRefEditWidget.current &&
        !wrapperRefEditWidget.current.contains(event.target)
      ) {
        setEditWidgetIsOpen(false);
        setMultipleEditWidgetIsOpen(false);
      }
    };

    // Add event listener with a delay to ignore the initial click
    if (editWidgetIsOpen) {
      timeoutId = setTimeout(() => {
        document.addEventListener("click", handleClickOutside, false);
      }, 100); // Delay in ms
    }

    // Cleanup function
    return () => {
      clearTimeout(timeoutId); // Clear the timeout
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, [list, editWidgetIsOpen, setEditWidgetIsOpen, editingItem, setMultipleEditWidgetIsOpen]);

  // function handleChangeEditMultiple(event) {
  //   const { name, value } = event.target;
  //   setTempEditingValues((prevValues) => ({
  //     ...prevValues,
  //     [name]: name === "tags" ? value.split(",") : value,
  //   }));
  // }

  // function handleSubmitEditMultiple(event) {
  //   event.preventDefault(); // Prevent default form submission behavior
  
  //   const updatedList = list.map(item => {
  //     // Check if the current item is in the selection
  //     if (selection.some(sel => sel.id === item.id)) {
  //       return { 
  //         ...item,  // Keep all existing item properties
  //         // Update properties only if tempEditingValues has a non-empty value for them
  //         link: tempEditingValues.link !== "" ? tempEditingValues.link : item.link,
  //         companyName: tempEditingValues.companyName !== "" ? tempEditingValues.companyName : item.companyName,
  //         jobTitle: tempEditingValues.jobTitle !== "" ? tempEditingValues.jobTitle : item.jobTitle,
  //         salary: tempEditingValues.salary !== "" ? tempEditingValues.salary : item.salary,
  //         tags: tempEditingValues.tags && tempEditingValues.tags.length > 0 ? tempEditingValues.tags : item.tags,
  //         favorite: tempEditingValues.favorite !== undefined ? tempEditingValues.favorite : item.favorite,
  //       };
  //     }
  //     return item;
  //   });
  
  //   updateList(updatedList); // Update the list in the context
  //   setEditWidgetIsOpen(false); // Close the edit widget
  // }

  // function handleSubmitEditMultiple(event) {
  //   event.preventDefault(); // Prevent default form submission behavior
  
  //   console.log("Initial list:", list);
  //   console.log("Selection:", selection);
  
  //   const updatedList = list.map(item => {
  //     const selectedItem = selection.find(sel => sel.id === item.id);
  
  //     if (selectedItem) {
  //       console.log("Updating item with ID:", item.id);
  //       return {
  //         ...item,
  //         ...Object.keys(selectedItem).reduce((acc, key) => {
  //           if (selectedItem[key] != null) {
  //             acc[key] = selectedItem[key];
  //           }
  //           return acc;
  //         }, {})
  //       };
  //     }
  
  //     return item;
  //   });
  
  //   updateList(updatedList); // Update the list in the context
  
  //   console.log("Updated list (before state update completes):", updatedList);
  // }

  return (
    <motion.div
      ref={wrapperRefEditWidget}
      key={props.id + "-editWidgetWrapper"}
      className="editWidgetWrapper"
      initial={{ x: 5, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      exit={{ x: 5, opacity: 0 }}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
    >
      <div
        key={props.id + "-editWidgetContainer"}
        className="editWidgetContainer"
      >
        <div key={props.id + "-editWidgetTopBar"} className="editWidgetTopBar">
          Edit Listing
        </div>
        <div key={props.id + "-editWidget"} className="editWidget">
          <form key={props.id + "-editWidgetForm"} className="editWidgetForm">
            <div key={0 + "-editWidgetFormSet"} className="editWidgetFormSet">
              <label key={0 + "-editWidgetFormSetLabel"}>Link:</label>
              <input
                key={0 + "-editWidgetFormSetInput"}
                className="editWidgetFormSetInput"
                onChange= {handleChangeEdit}
                value={editingItem.link}
                name="link"
                type="url"
                required
              ></input>
            </div>
            <div key={1 + "-editWidgetFormSet"} className="editWidgetFormSet">
              <label key={1 + "-editWidgetFormSetLabel"}>Company Name:</label>
              <input
                key={1 + "-editWidgetFormSetInput"}
                className="editWidgetFormSetInput"
                onChange={handleChangeEdit}
                value={editingItem.companyName}
                name="companyName"
                type="text"
                required
              ></input>
            </div>
            <div key={2 + "-editWidgetFormSet"} className="editWidgetFormSet">
              <label key={2 + "-editWidgetFormSetLabel"}>Job Title:</label>
              <input
                key={2 + "-editWidgetFormSetInput"}
                className="editWidgetFormSetInput"
                onChange={handleChangeEdit}
                value={editingItem.jobTitle}
                name="jobTitle"
                type="text"
                required
              ></input>
            </div>
            <div key={3 + "-editWidgetFormSet"} className="editWidgetFormSet">
              <label key={3 + "-editWidgetFormSetLabel"}>Salary:</label>
              <input
                key={3 + "-editWidgetFormSetInput"}
                className="editWidgetFormSetInput"
                onChange={handleChangeEdit}
                value={editingItem.salary}
                name="salary"
                type="text"
              ></input>
            </div>
            <div
              key={editingItem.id + "-editWidgetFormSetTags"}
              className="editWidgetFormSet"
            >
              <label key={editingItem.id + "-editWidgetFormSetLabel"}>
                Tags:
              </label>
              <input
                key={editingItem.id + "-editWidgetFormSetInput"}
                className={
                  Array.isArray(editingItem.tags) &&
                  editingItem.tags !== undefined &&
                  editingItem.tags.length > 3
                    ? "editWidgetFormSetInputError"
                    : "editWidgetFormSetInput"
                }
                onChange={handleChangeEdit}
                value={editingItem.tags}
                name="tags"
                type="text"
              ></input>
              <AnimatePresence>
                {Array.isArray(editingItem) &&
                editingItem.tags !== undefined &&
                editingItem.tags.length > 3 ? (
                  <motion.div
                  key={0 + "-DashboardNewJobApplicationFormSetSuggestionError"}
                    layout
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      type: "spring",
                      bounce: 0.5,
                    }}
                    className="DashboardNewJobApplicationFormSetSuggestionError"
                  >
                    Please, remove some tags, <b>the maximum is 3!</b>
                  </motion.div>
                ) : (
                  <motion.div
                  key={0 + "-DashboardNewJobApplicationFormSetSuggestion"}
                    layout
                    className="DashboardNewJobApplicationFormSetSuggestion"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      type: "spring",
                      bounce: 0.5,
                    }}
                  >
                    <b>Insert a maximum of 3 Tags!</b> For example: "Remote,
                    Flexible, HTML"
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div
              key={editingItem.id + "-editWidgetFormButtonSet"}
              className="editWidgetFormButtonSet"
            >
              <button
                type="button"
                className={
                  editingItem.favorite
                    ? "EditWidgetFavoriteButtonFocus"
                    : "EditWidgetFavoriteButton"
                }
                value={editingItem.favorite}
                name="favorite"
                onClick={handleFavoriteEdit}
              >
                Favorite! <GradeIcon fontSize="small" />
              </button>
              <button
                onClick={(event) => {
                  event.preventDefault(); // Prevent default form submission behavior
                  // if (props.item === "FilterBar") {
                  //   handleSubmitEditMultiple(event);
                  //   setMultipleEditWidgetIsOpen(!multipleEditWidgetIsOpen);
                  // } else {
                  //   handleSubmitEdit(event);
                  //   setEditWidgetIsOpen(!editWidgetIsOpen);
                  // }
                    handleSubmitEdit(event);
                    setEditWidgetIsOpen(false);
                }}
                type="submit"
                className="DashboardMainAreaItemTagsEdit"
              >
                <EditIcon fontSize="medium" />
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="editWidgetArrow" />
    </motion.div>
  );
});

export default EditWidget;
