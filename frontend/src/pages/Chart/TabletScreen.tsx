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
import { CChart } from "@coreui/react-chartjs";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { getStyle } from "@coreui/utils";
import tower from "assets/images/electric-tower.png";
import CanvasMenu from "./CanvasMenu";
import Drag from "components/Drag";
import MockJson from "./MockJson";

// fake data generator
const getItems = (count: any) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

// a little function to help us with reordering the result
const reorder = (list: any, startIndex: any, endIndex: any) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

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

const TabletScreen = (props: any) => {
  const [items, setItems] = useState<any>(MockJson);

  const onDragEnd = (result: any) => {
    // dropped outside the list

    if (!result.destination) {
      return;
    }

    const itemss = reorder(
      items,
      result.source.index,
      result.destination.index
    );
    setItems(itemss);
  };
  console.log("result: ", MockJson);
  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              {items.map((item: any, index: any) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <CChart
                        type="line"
                        width={200}
                        height={item.height}
                        data={{
                          labels: item.label,
                          datasets: [
                            {
                              indexAxis: "y",
                              label: item.title,
                              backgroundColor: "rgba(151, 187, 205, 0.2)",
                              borderColor: "rgba(151, 187, 205, 1)",
                              pointBackgroundColor: "rgba(151, 187, 205, 1)",
                              pointBorderColor: "#fff",
                              data: [50, 12, 28, 29, 7, 25, 12, 70, 60, 100],
                            },
                          ],
                        }}
                        options={{
                          plugins: {
                            legend: {
                              labels: {
                                color: getStyle("--cui-body-color"),
                              },
                            },
                          },
                          scales: {
                            x: {
                              grid: {
                                color: getStyle(
                                  "--cui-border-color-translucent"
                                ),
                              },
                              ticks: {
                                color: getStyle("--cui-body-color"),
                              },
                            },
                            y: {
                              grid: {
                                color: getStyle(
                                  "--cui-border-color-translucent"
                                ),
                              },
                              ticks: {
                                color: getStyle("--cui-body-color"),
                              },
                            },
                          },
                        }}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TabletScreen;
