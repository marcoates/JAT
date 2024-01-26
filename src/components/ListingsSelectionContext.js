import React, { useContext, useState } from "react";

const SelectAllListingsContext = React.createContext();
const SelectAllListingsContextUpdate = React.createContext();
const SelectSomeListingsContext = React.createContext();
const SelectSomeListingsContextUpdate = React.createContext();
const SelectionContext = React.createContext();
const SelectionContextUpdate = React.createContext();

export function useSelectAllListingsContext() {
  return useContext(SelectAllListingsContext);
}
export function useSelectAllListingsContextUpdate() {
  return useContext(SelectAllListingsContextUpdate);
}
export function useSelectSomeListingsContext() {
  return useContext(SelectSomeListingsContext);
}
export function useSelectSomeListingsContextUpdate() {
  return useContext(SelectSomeListingsContextUpdate);
}
export function useSelectionContext() {
  return useContext(SelectionContext);
}
export function useSelectionContextUpdate() {
  return useContext(SelectionContextUpdate);
}

export function ListingsSelectionContextProvider({ children }) {
  
  const [selectAllListings, setSelectAllListings] = useState(false);
  const [selectSomeListings, setSelectSomeListings] = useState(false);
  const [selection, setSelection] = useState([]);

  return (
    <SelectAllListingsContext.Provider value={selectAllListings}>
      <SelectAllListingsContextUpdate.Provider value={{ setSelectAllListings }}>
        <SelectSomeListingsContext.Provider value={selectSomeListings}>
          <SelectSomeListingsContextUpdate.Provider
            value={{ setSelectSomeListings }}
          >
            <SelectionContext.Provider value={selection}>
              <SelectionContextUpdate.Provider value={{ setSelection }}>
                {children}
              </SelectionContextUpdate.Provider>
            </SelectionContext.Provider>
          </SelectSomeListingsContextUpdate.Provider>
        </SelectSomeListingsContext.Provider>
      </SelectAllListingsContextUpdate.Provider>
    </SelectAllListingsContext.Provider>
  );
}
