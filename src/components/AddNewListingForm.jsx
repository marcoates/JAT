import React from "react";
import GradeIcon from "@mui/icons-material/Grade";
import { useMediaQuery } from "@mui/material";
import "./DashboardCard.css";
import { motion, AnimatePresence } from "framer-motion";
import {
  useJobApplicationsItemContext,
  useJobApplicationsItemContextUpdate,
  useJobApplicationsIsFavoriteContext,
  useJobApplicationsIsFavoritetUpdate,
} from "./JobApplicationsListContext";

function AddNewListingForm(props) {
  const isSmallScreen = useMediaQuery("(max-width:1000px)");

  const newListing = useJobApplicationsItemContext();
  const { handleChange, handleSubmit, handleFavorite } =
    useJobApplicationsItemContextUpdate();
  const isFavorite = useJobApplicationsIsFavoriteContext();
  const { setIsFavorite } = useJobApplicationsIsFavoritetUpdate();

  return (
    <motion.div
    layout
      key={0 + "-AddNewListingForm"}
      className="DashboardCardContainer"
    >
      <div className="DashboardCardAddNew">
        <form
          id="newListingForm"
          className="DashboardNewJobApplicationForm"
          onSubmit={handleSubmit}
        >
          <div className="DashboardNewJobApplicationFormWrapper">
            <div className="DashboardNewJobApplicationFormSet">
              <label className="DashboardNewJobApplicationFormSetTitle">
                Link:
              </label>
              <input
                value={newListing.link}
                name="link"
                type="url"
                onChange={handleChange}
              />
            </div>
            <div className="DashboardNewJobApplicationFormSet">
              <label className="DashboardNewJobApplicationFormSetTitle">
                Company Name:
              </label>
              <input
                value={newListing.companyName}
                name="companyName"
                type="text"
                onChange={handleChange}
                required
              />
            </div>
            <div className="DashboardNewJobApplicationFormSet">
              <label className="DashboardNewJobApplicationFormSetTitle">
                Job TItle:
              </label>
              <input
                value={newListing.jobTitle}
                name="jobTitle"
                type="text"
                onChange={handleChange}
                required
              />
            </div>
            <div className="DashboardNewJobApplicationFormSet">
              <label className="DashboardNewJobApplicationFormSetTitle">
                Salary:
              </label>
              <input
                value={newListing.salary}
                name="salary"
                type="text"
                onChange={handleChange}
              />
            </div>
            <div
              className={
                newListing.tags.length > 3
                  ? "DashboardNewJobApplicationFormSetError"
                  : "DashboardNewJobApplicationFormSet"
              }
            >
              <label className="DashboardNewJobApplicationFormSetTitle">
                Tags:
              </label>
              <input
                value={newListing.tags}
                name="tags"
                type="text"
                onChange={handleChange}
              />
              <AnimatePresence mode="wait">
                {newListing.tags.length > 3 ? (
                  <motion.div
                    key={
                      0 + "-DashboardNewJobApplicationFormSetSuggestionError"
                    }
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
                    layout
                    key={0 + "-DashboardNewJobApplicationFormSetSuggestion"}
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
                    <b>Insert a maximum of 3 Tags!</b> <br /> For example:
                    "Remote, Flexible, HTML"
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="DashboardNewJobApplicationFormSetButton">
            <button
              type="button"
              className={
                isFavorite
                  ? "DashboardNewJobApplicationFormFavoriteButtonFocus"
                  : "DashboardNewJobApplicationFormFavoriteButton"
              }
              value={isFavorite}
              name="favorite"
              onClick={handleFavorite}
            >
              Favorite! <GradeIcon fontSize="small" />
            </button>
            <button
              className="DashboardNewJobApplicationFormSubmitButton"
              type="submit"
              onClick={() => {
                setIsFavorite(false);
                isSmallScreen && props.closeForm(false);
              }}
            >
              +
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

export default AddNewListingForm;
