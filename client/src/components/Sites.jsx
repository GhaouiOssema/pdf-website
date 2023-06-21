import React, { useEffect, useRef, useState } from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { Box } from "@mui/material";

function MultiSelectTreeView() {
  const [expanded, setExpanded] = useState([]);
  const contentRef = useRef(null);

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const isExpanded = (nodeId) => {
    return expanded.includes(nodeId);
  };

  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.clientHeight;
      if (isExpanded("1")) {
        contentRef.current.style.height = `${contentHeight}px`;
      } else {
        contentRef.current.style.height = "auto";
      }
    }
  }, [expanded, isExpanded]);

  return (
    <Box
      sx={{
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        borderRadius: "8px",
        overflow: "hidden",
        transition: "height 0.3s",
        height: isExpanded("1") ? "auto" : "32px",
      }}
    >
      <TreeView
        aria-label="multi-select"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        multiSelect
        expanded={expanded}
        onNodeToggle={handleToggle}
        sx={{ height: "100%" }}
      >
        <TreeItem nodeId="1" label="Applications">
          <TreeItem nodeId="2" label="Calendar" />
          <TreeItem nodeId="3" label="Chrome" />
          <TreeItem nodeId="4" label="Webstorm" />
          <TreeItem nodeId="5" label="Webstorm" />
          <TreeItem nodeId="6" label="Webstorm" />
        </TreeItem>
      </TreeView>
      <div style={{ height: 0, overflow: "hidden" }}>
        <TreeView
          aria-label="multi-select"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          multiSelect
          expanded={expanded}
          onNodeToggle={handleToggle}
          ref={contentRef}
          sx={{ height: "auto" }}
        >
          <TreeItem nodeId="1" label="Applications">
            <TreeItem nodeId="2" label="Calendar" />
            <TreeItem nodeId="3" label="Chrome" />
            <TreeItem nodeId="4" label="Webstorm" />
            <TreeItem nodeId="5" label="Webstorm" />
            <TreeItem nodeId="6" label="Webstorm" />
          </TreeItem>
        </TreeView>
      </div>
    </Box>
  );
}

const Sites = () => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <h1 className=" w-screen text-3xl text-center font-bold mt-10">
        votre Sites
      </h1>
      <div className={`mt-10 ${screenSize.width < 700 ? "w-[20rem]" : null} `}>
        <div
          className={`${
            screenSize.width < 700
              ? "h-screen "
              : "flex justify-arround flex-wrap gap-4"
          }`}
        >
          {[1, 2, 3, 4].map((el, i) => (
            <div
              className={`${
                screenSize.width < 700 ? "w-[100%] mt-5" : "w-[20%]"
              }`}
              key={i}
            >
              <MultiSelectTreeView />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sites;
