import React, { useContext, useState, useEffect } from "react";
import { useJobApplicationsListContext } from "./JobApplicationsListContext";

const ShowFavoritesContext = React.createContext();
const ShowFavoritesContextUpdate = React.createContext();
const FavoritesListContext = React.createContext();
const FavoritesListContextUpdate = React.createContext();

export function useShowFavoritesContext() {
  return useContext(ShowFavoritesContext);
}
export function useShowFavoritesContextUpdate() {
  return useContext(ShowFavoritesContextUpdate);
}
export function useFavoritesListContext() {
  return useContext(FavoritesListContext);
}
export function useFavoritesListContextUpdate() {
  return useContext(FavoritesListContextUpdate);
}

export function ShowFavoritesContextProvider({ children }) {
  const list = useJobApplicationsListContext();

  const [showFavorites, setShowFavorites] = useState(false);
  const [favoriteList, setFavoriteList] = useState([]);

  useEffect(() => {
    if (showFavorites) {
      setFavoriteList(list.filter((item) => item.favorite === true));
    }
  }, [showFavorites, setFavoriteList, list]);

  return (
    <ShowFavoritesContext.Provider value={favoriteList}>
      <ShowFavoritesContextUpdate.Provider value={{ setFavoriteList }}>
        <ShowFavoritesContext.Provider value={showFavorites}>
          <ShowFavoritesContextUpdate.Provider value={{ setShowFavorites }}>
            {children}
          </ShowFavoritesContextUpdate.Provider>
        </ShowFavoritesContext.Provider>
      </ShowFavoritesContextUpdate.Provider>
    </ShowFavoritesContext.Provider>
  );
}
