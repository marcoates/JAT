import React from "react";
import "./Dashboard.css";
import DashboardCard from "../components/DashboardCard";
import DashboardMainArea from "../components/DashboardMainArea";
import { JobApplicationsListContextProvider } from "../components/JobApplicationsListContext";
import { ListingsSelectionContextProvider } from "../components/ListingsSelectionContext";
import { ListingsGenericFilteringContextProvider } from "../components/ListingsGenericFilteringContext";
import { ListingsEditingContextMainAreaProvider } from "../components/ListingsEditingContextMainArea";
import { ShowFavoritesContextProvider } from "../components/ShowFavoritesContext";
import { AnimatePresence, motion } from "framer-motion";

export default function Dashboard() {
  return (
    <motion.div layout key={0 + "-Dashboard"} className="DashboardWrapper">
      <motion.div layout key={1 + "-Dashboard"} className="DashboardContainer">
        <JobApplicationsListContextProvider>
          <ListingsSelectionContextProvider>
            <ListingsGenericFilteringContextProvider>
              <ListingsEditingContextMainAreaProvider>
                <ShowFavoritesContextProvider>
                  <DashboardCard />
                  <DashboardMainArea />
                </ShowFavoritesContextProvider>
              </ListingsEditingContextMainAreaProvider>
            </ListingsGenericFilteringContextProvider>
          </ListingsSelectionContextProvider>
        </JobApplicationsListContextProvider>
      </motion.div>
    </motion.div>
  );
}
