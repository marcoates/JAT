import React, { useContext, useState } from "react";

const JobApplicationsListContext = React.createContext();
const JobApplicationsListContextUpdate = React.createContext();
const JobApplicationsItemContext = React.createContext();
const JobApplicationsItemContextUpdate = React.createContext();
const JobApplicationsEditingItemContext = React.createContext();
const JobApplicationsEditingItemContextUpdate = React.createContext();
const JobApplicationsIsFavoriteContext = React.createContext();
const JobApplicationsIsFavoritetUpdate = React.createContext();
const EditListingContext = React.createContext();
const EditListingContextUpdate = React.createContext();
const EditWidgetIsOpenContext = React.createContext();
const EditWidgetIsOpenContextUpdate = React.createContext();
const MultipleEditWidgetIsOpenContext = React.createContext();
const MultipleEditWidgetIsOpenContextUpdate = React.createContext();

export function useJobApplicationsListContext() {
  return useContext(JobApplicationsListContext);
}
export function useJobApplicationsListContextUpdate() {
  return useContext(JobApplicationsListContextUpdate);
}
export function useJobApplicationsItemContext() {
  return useContext(JobApplicationsItemContext);
}
export function useJobApplicationsItemContextUpdate() {
  return useContext(JobApplicationsItemContextUpdate);
}
export function useJobApplicationsEditingItemContext() {
  return useContext(JobApplicationsEditingItemContext);
}
export function useJobApplicationsEditingItemContextUpdate() {
  return useContext(JobApplicationsEditingItemContextUpdate);
}
export function useJobApplicationsIsFavoriteContext() {
  return useContext(JobApplicationsIsFavoriteContext);
}
export function useJobApplicationsIsFavoritetUpdate() {
  return useContext(JobApplicationsIsFavoritetUpdate);
}
export function useEditListingContext() {
  return useContext(EditListingContext);
}
export function useEditListingContextUpdate() {
  return useContext(EditListingContextUpdate);
}
export function useEditWidgetIsOpenContext() {
  return useContext(EditWidgetIsOpenContext);
}
export function useEditWidgetIsOpenContextUpdate() {
  return useContext(EditWidgetIsOpenContextUpdate);
}
export function useMultipleEditWidgetIsOpenContext() {
  return useContext(MultipleEditWidgetIsOpenContext);
}
export function useMultipleEditWidgetIsOpenContextUpdate() {
  return useContext(MultipleEditWidgetIsOpenContextUpdate);
}

export function JobApplicationsListContextProvider({ children }) {
  const [list, updateList] = useState([]);

  const [editListings, setEditListings] = useState([]);
  const [editWidgetIsOpen, setEditWidgetIsOpen] = useState(false);
  const [multipleEditWidgetIsOpen, setMultipleEditWidgetIsOpen] =
    useState(false);

  const [isFavorite, setIsFavorite] = useState(false);

  // Be aware of the ID in newListing when backend will be created... not sure is gonna work properly. The number needs to never "reset" to 0.

  const [newListing, setNewListing] = useState({
    id: list.length,
    link: "",
    companyName: "",
    jobTitle: "",
    salary: "",
    tags: "",
    favorite: false,
  });

  const [editingItem, setEditingItem] = useState({
    id: 0,
    link: "",
    companyName: "",
    jobTitle: "",
    salary: "",
    tags: "",
    favorite: false,
  });

  function handleChange(event) {
    const { name, value } = event.target;

    name === "tags"
      ? setNewListing((prevState) => ({
          ...prevState,
          [name]: value.split(","),
        }))
      : setNewListing((prevState) => ({
          ...prevState,
          [name]: value,
        }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    updateList((prevState) => [...prevState, newListing]);
    setNewListing({
      id: ++list.length,
      link: "",
      companyName: "",
      jobTitle: "",
      salary: "",
      tags: "",
      favorite: false,
    });
  }

  function handleChangeEdit(event) {
    const { name, value } = event.target;

    name === "tags"
      ? setEditingItem((prevState) => ({
          ...prevState,
          [name]: value.split(","),
        }))
      : setEditingItem((prevState) => ({
          ...prevState,
          [name]: value,
        }));
  }

  function handleSubmitEdit(event) {
    event.preventDefault(); // prevent the default form submission behavior

    // Filter out empty strings from tags
    const editedTagsList =
      Array.isArray(editingItem.tags) &&
      editingItem.tags !== undefined &&
      editingItem.tags !== "" &&
      editingItem.tags
        .filter((item) => item.trim() !== "")
        .filter((item, index) => index < 3);

    // Create a new editingItem with the updated tags
    const updatedEditingItem = Array.isArray(editingItem.tags) &&
      editingItem.tags !== undefined &&
      editingItem.tags !== "" && {
        ...editingItem,
        tags: editedTagsList,
      };

    // Updating list
    const newList = list.map((item) =>
      item.id === updatedEditingItem.id ? { ...updatedEditingItem } : item
    );
    updateList([...newList]); // Update the list in your context
    setEditWidgetIsOpen(false); // Optionally close the edit widget
    setEditingItem({
      id: 0,
      link: "",
      companyName: "",
      jobTitle: "",
      salary: "",
      tags: "",
      favorite: false,
    });
  }

  function handleFavorite() {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite); // Toggle the state
    setNewListing((prevState) => ({
      ...prevState,
      favorite: !isFavorite, // Use the opposite of the current state
    }));
  }

  function handleFavoriteEdit() {
    setEditingItem((prevState) => ({
      ...prevState,
      favorite: !prevState.favorite, // Use the opposite of the current state
    }));
    console.log(editingItem);
  }

  return (
    <JobApplicationsListContext.Provider value={list}>
      <JobApplicationsListContextUpdate.Provider value={updateList}>
        <JobApplicationsItemContext.Provider value={newListing}>
          <JobApplicationsItemContextUpdate.Provider
            value={{
              handleChange,
              handleSubmit,
              setNewListing,
              handleFavorite,
            }}
          >
            <JobApplicationsEditingItemContext.Provider value={editingItem}>
              <JobApplicationsEditingItemContextUpdate.Provider
                value={{
                  setEditingItem,
                  handleChangeEdit,
                  handleFavoriteEdit,
                  handleSubmitEdit,
                }}
              >
                <JobApplicationsIsFavoriteContext.Provider value={isFavorite}>
                  <JobApplicationsIsFavoritetUpdate.Provider
                    value={{ setIsFavorite, handleFavorite }}
                  >
                    <EditListingContext.Provider value={editListings}>
                      <EditListingContextUpdate.Provider
                        value={{ setEditListings }}
                      >
                        <EditWidgetIsOpenContext.Provider
                          value={editWidgetIsOpen}
                        >
                          <EditWidgetIsOpenContextUpdate.Provider
                            value={{ setEditWidgetIsOpen }}
                          >
                            <MultipleEditWidgetIsOpenContext.Provider
                              value={multipleEditWidgetIsOpen}
                            >
                              <MultipleEditWidgetIsOpenContextUpdate.Provider
                                value={{ setMultipleEditWidgetIsOpen }}
                              >
                                {children}
                              </MultipleEditWidgetIsOpenContextUpdate.Provider>
                            </MultipleEditWidgetIsOpenContext.Provider>
                          </EditWidgetIsOpenContextUpdate.Provider>
                        </EditWidgetIsOpenContext.Provider>
                      </EditListingContextUpdate.Provider>
                    </EditListingContext.Provider>{" "}
                  </JobApplicationsIsFavoritetUpdate.Provider>
                </JobApplicationsIsFavoriteContext.Provider>
              </JobApplicationsEditingItemContextUpdate.Provider>
            </JobApplicationsEditingItemContext.Provider>
          </JobApplicationsItemContextUpdate.Provider>
        </JobApplicationsItemContext.Provider>
      </JobApplicationsListContextUpdate.Provider>
    </JobApplicationsListContext.Provider>
  );
}
