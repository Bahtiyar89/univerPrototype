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
import CanvasMenu from "./";
import Drag from "components/Drag";
import MockJson2 from "./MockJson2";

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

const TabletChart = (props: any) => {
  const [items, setItems] = useState<any>(MockJson2);
  const [canvas, setCanvas] = useState<boolean>(false);

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

    const lastEl = itemss.length - 1;
    const newArr = itemss.map((item: any, index: any) => {
      if (index == 0) {
        return { ...item, yshowticklabels: true, l: 50, r: 1 };
      } else if (lastEl == index) {
        return { ...item, yshowticklabels: false, l: 1, r: 50 };
      } else {
        return { ...item, yshowticklabels: false, l: 1, r: 1 };
      }
    });

    setItems(newArr);
  };

  const addNewChart = (item: any) => {
    const newEventId = [...items, item];

    const lastEl = newEventId.length - 1;
    const newArr = newEventId.map((item: any, index: any) => {
      if (index == 0) {
        return { ...item, yshowticklabels: true, l: 50, r: 1 };
      } else if (lastEl == index) {
        return { ...item, yshowticklabels: false, l: 1, r: 50 };
      } else {
        return { ...item, yshowticklabels: false, l: 1, r: 1 };
      }
    });

    setItems(newArr);
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
                      <Plot
                        config={{
                          displayModeBar: false,
                          displaylogo: false,
                        }}
                        data={[
                          {
                            mode: "lines+markers",
                            line: { color: item.color },
                            fillcolor: "red",
                            fill: "tozeroy",
                            x: item.x,
                            xaxis: "x",
                            y: item.y,
                            yaxis: "y",
                          },
                        ]}
                        layout={{
                          dragmode: false,
                          showlegend: false,
                          hoverdistance: 1,
                          width: 200,
                          height: 750,
                          margin: { l: item.l, r: item.r },

                          xaxis: {
                            side: "top",
                            anchor: "y",
                            domain: [0, 20],
                            linecolor: "black",
                            linewidth: 2,
                            mirror: true,
                            showline: true,
                            tickangle: 0,
                            ticks: "inside",
                            title: { text: item.name },
                          },
                          yaxis: {
                            anchor: "x",
                            autorange: "reversed",
                            dtick: 250,
                            linecolor: "black",
                            linewidth: 2,
                            mirror: true,
                            showticklabels: item.yshowticklabels,
                            tick0: 0,
                            tickmode: "linear",
                          },
                        }}
                      />
                      {/* <CChartLine
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
                      />*/}
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

export default TabletChart;
