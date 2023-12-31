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
  console.log("result: ", result);

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
    if (result.destination.index === result.source.index) {
      const newItems = items.filter(
        (item: any) => item.id !== result.draggableId
      );
      setItems(newItems);
      return;
    }

    const itemss = reorder(
      items,
      result.source.index,
      result.destination.index
    );
    setItems(itemss);
  };

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
                      <CChartLine
                        width={200}
                        height={item.height}
                        data={{
                          labels: item.xlabels,
                          datasets: [
                            {
                              label: item.title,
                              backgroundColor: "transparent",
                              borderColor: getStyle("--cui-success"),
                              pointHoverBackgroundColor:
                                getStyle("--cui-success"),
                              borderWidth: 2,
                              data: item.data,
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
                              position: "top",
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
                              beginAtZero: true,
                              reverse: true,
                              grid: {
                                color: getStyle(
                                  "--cui-border-color-translucent"
                                ),
                              },
                              ticks: {
                                color: getStyle("--cui-body-color"),
                                stepSize: 10,
                                autoSkip: false,
                                display: item.ydisplay,
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
