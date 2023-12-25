import React, { useState } from "react";
import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CAvatar,
  CButton,
  CButtonGroup,
  CCloseButton,
  COffcanvas,
  COffcanvasBody,
  COffcanvasHeader,
  COffcanvasTitle,
} from "@coreui/react-pro";
import CIcon from "@coreui/icons-react";
import { cilHamburgerMenu } from "@coreui/icons";
import { CChart, CChartLine } from "@coreui/react-chartjs";
import Plot from "react-plotly.js";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { getStyle } from "@coreui/utils";
import tower from "assets/images/electric-tower.png";
import CanvasMenu from "./CanvasMenu";
import Drag from "components/Drag";
import MockJson2 from "./MockJson2";
import TabletChart from "./TabletChart";

// a little function to help us with reordering the result
const reorder = (list: any, startIndex: any, endIndex: any) => {
  const result = Array.from(list);

  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 0;

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 ${grid}px 0 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: any) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  display: "flex",
  padding: grid,
  overflow: "auto",
});

let result = new Array(100);
result = result
  .fill(0)
  .map(() => Math.round(Math.random() * (25000 - 8000 + 1)) + 8000);

let res = new Array(100);
res = res

  .fill(0)
  .map(() => Math.round(Math.random() * (3200 - 500 + 1)) + 500)
  .sort((a, b) => a - b);
let res2 = new Array(100);
res2 = res2.fill(0).map(() => Math.round(Math.random() * (20 - 5 + 1)) + 5);

const TabletPage = (props: any) => {
  const [items, setItems] = useState<any>(MockJson2);
  const [canvas, setCanvas] = useState<boolean>(false);
  const [screenType, setScreenType] = useState(3);
  const [well, setWell] = useState("");

  return (
    <div>
      <CIcon
        style={{ cursor: "pointer" }}
        onClick={() => setCanvas(true)}
        icon={cilHamburgerMenu}
        size="xl"
      />
      {screenType === 1 ? <></> : screenType === 2 ? <></> : <TabletChart />}

      <CanvasMenu
        canvas={canvas}
        well={well}
        handleCanvas={() => setCanvas(false)}
        handleClick={(item: any) => setWell(item)}
        handleScreenType={(t: any) => setScreenType(t)}
      />
    </div>
  );
};

export default TabletPage;
