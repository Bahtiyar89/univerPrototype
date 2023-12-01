import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardText,
  CCardTitle,
  CCol,
  CCollapse,
  CContainer,
  CFormInput,
  CRow,
} from "@coreui/react-pro";
import Plot from "react-plotly.js";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import FirstColumn from "./FirstColumn";
import SecondColumn from "./SecondColumn";
import MockJson2 from "pages/Chart/MockJson2";
import "./style.css";

// a little function to help us with reordering the result
const reorder = (list: any, startIndex: any, endIndex: any) => {
  const result = Array.from(list);
  console.log("startIndex: ", startIndex);
  console.log("endIndex: ", endIndex);

  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: 0,
  margin: `0 0px 0 -75px`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: any) => ({
  background: "grey",
  display: "flex",
  padding: "0px",
});

const DemoViewPage = () => {
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

  const [items, setItems] = useState<any>(MockJson2);

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

    const newArr = itemss.map((item: any, index: any) => {
      if (index == 0) {
        return { ...item, yshowticklabels: true };
      } else {
        return { ...item, yshowticklabels: false };
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
                            type: "scatter",
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
                          width: 300,
                          height: 750,
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

export default DemoViewPage;
