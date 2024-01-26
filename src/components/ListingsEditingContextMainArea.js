import React, { useContext, useState } from "react";

const EditListingContext = React.createContext();
const EditListingContextUpdate = React.createContext();
const EditWidgetIsOpenContext = React.createContext();
const EditWidgetIsOpenContextUpdate = React.createContext();

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
export function ListingsEditingContextMainAreaProvider({ children }) {
  const [editListing, setEditListing] = useState({
    id: 0,
    link: "",
    companyName: "",
    jobTitle: "",
    salary: "",
    tags: "",
    favorite: false,
  });

  const [editWidgetIsOpen, setEditWidgetIsOpen] = useState(false);

  return (
    <EditListingContext.Provider value={editListing}>
      <EditListingContextUpdate.Provider value={{ setEditListing }}>
        <EditWidgetIsOpenContext.Provider value={editWidgetIsOpen}>
          <EditWidgetIsOpenContextUpdate.Provider
            value={{ setEditWidgetIsOpen }}
          >
            {children}
          </EditWidgetIsOpenContextUpdate.Provider>
        </EditWidgetIsOpenContext.Provider>
      </EditListingContextUpdate.Provider>
    </EditListingContext.Provider>
  );
}
