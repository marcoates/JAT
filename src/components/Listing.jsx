import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import PaidIcon from "@mui/icons-material/Paid";
import { useMediaQuery } from "@mui/material";

function Listing(props) {
  const isSmallScreen = useMediaQuery("(max-width:1000px)");

  return (
    <motion.div
      key={props.item.id + "-DashboardMainAreaItemDescriptionWrapper"} // Adjust key to ensure uniqueness
      layout
      className="DashboardMainAreaItemDescriptionWrapper"
    >
      <motion.div
        key={props.item.id + "-DescriptionContainer"} // Adjust key to ensure uniqueness
        layout
        className="DescriptionContainer"
      >
        <motion.div
          key={props.item.id + "-mainDivDescriptionContainer"} // Adjust key to ensure uniqueness
          layout
          className={
            isSmallScreen
              ? props.JobTitleWidthHandlingWhenCheckboxesAppear1
                ? "DashboardMainAreaItemDescriptionContainerStretch"
                : props.JobTitleWidthHandlingWhenCheckboxesAppear2
                ? "DashboardMainAreaItemDescriptionContainerStretch"
                : "DashboardMainAreaItemDescriptionContainer"
              : "DashboardMainAreaItemDescriptionContainer"
          }
        >
          <AnimatePresence>
            <motion.span
              key={props.item.id + "-mainDivDescriptionCompanyName"}
              initial={{ opacity: 0, x: -5, y: 0 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{
                opacity: 0,
                x: 5,
                y: 0,
              }}
              transition={{ duration: 0.3 }}
              layout
              className="DashboardMainAreaItemDescriptionEmployerName"
            >
              {props.item.companyName}
            </motion.span>
            <motion.span
              key={props.item.id + "-mainDivDescriptionJobTitle"}
              initial={{ opacity: 0, x: -5, y: 0 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{
                opacity: 0,
                x: 5,
                y: 0,
              }}
              transition={{ duration: 0.1 }}
              layout
              className="DashboardMainAreaItemDescriptionJobTitle"
            >
              {props.item.jobTitle}
            </motion.span>
            {props.item.salary !== "" && (
              <motion.span
                key={props.item.id + "-mainDivDescriptionSalary"}
                initial={{ opacity: 0, x: -5, y: 0 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{
                  opacity: 0,
                  x: 5,
                  y: 0,
                }}
                transition={{ duration: 0.3 }}
                layout
                className="DashboardMainAreaItemTagsSalary"
              >
                <PaidIcon fontSize="small" style={{ color: "#96E6B3" }} />{" "}
                {props.item.salary}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        {Array.isArray(props.item.tags) && props.item.tags !== undefined && (
          <motion.div
            key={props.item.id + "-TagsContainer"}
            layout
            className="TagsContainer"
          >
            <AnimatePresence>
              {props.item.tags.map((tag, index) => (
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
      </motion.div>
    </motion.div>
  );
}

export default Listing;
