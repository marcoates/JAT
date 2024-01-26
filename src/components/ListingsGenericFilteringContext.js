import React, { useContext, useState } from "react";

const FilteredValuesContext = React.createContext();
const FilteredValuesContextUpdate = React.createContext();
const FilteredListContext = React.createContext();
const FilteredListContextUpdate = React.createContext();

export function useFilteredValueContext() {
  return useContext(FilteredValuesContext);
}
export function useFilteredValuesContextUpdate() {
  return useContext(FilteredValuesContextUpdate);
}
export function useFilteredListContext() {
  return useContext(FilteredListContext);
}
export function useFilteredListContextUpdate() {
  return useContext(FilteredListContextUpdate);
}
export function ListingsGenericFilteringContextProvider({ children }) {
  const [filteredValue, setFilteredValue] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  return (
    <FilteredValuesContext.Provider value={filteredValue}>
    <FilteredListContext.Provider value={filteredList}>
      <FilteredValuesContextUpdate.Provider value={{ setFilteredValue }}>
          <FilteredListContextUpdate.Provider value={{ setFilteredList }}>
            {children}
          </FilteredListContextUpdate.Provider>
      </FilteredValuesContextUpdate.Provider>
        </FilteredListContext.Provider>
    </FilteredValuesContext.Provider>
  );
}
