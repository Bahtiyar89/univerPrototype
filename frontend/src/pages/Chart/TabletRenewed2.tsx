import React, { useState, useEffect, Fragment } from "react";
import Plot from "react-plotly.js";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { graphs } from "./MockJson2";

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

const TabletRenewed2 = (props: any) => {
  const [items, setItems] = useState<any>([]);

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

  useEffect(() => {
    const lastEl = props.chartObjects.length - 1;
    const newArr = props.chartObjects.map((item: any, index: any) => {
      if (index == 0) {
        return { ...item, yshowticklabels: true, l: 50, r: 1 };
      } else if (lastEl == index) {
        return { ...item, yshowticklabels: false, l: 1, r: 50 };
      } else {
        return { ...item, yshowticklabels: false, l: 1, r: 1 };
      }
    });

    setItems(newArr);
  }, [props.chartObjects]);

  const trace1 = {
    x: [1, 2, 3, 4, 5],
    y: [1, 3, 2, 3, 1],
    mode: "lines+markers",
    name: "linear",
    line: { shape: "linear" },
    type: "scatter",
  };

  var trace2 = {
    x: [1, 2, 3, 4, 5],
    y: [6, 8, 7, 8, 6],
    mode: "lines+markers",
    name: "spline",
    text: [
      'tweak line smoothness<br>with "smoothing" in line object',
      'tweak line smoothness<br>with "smoothing" in line object',
      'tweak line smoothness<br>with "smoothing" in line object',
      'tweak line smoothness<br>with "smoothing" in line object',
      'tweak line smoothness<br>with "smoothing" in line object',
      'tweak line smoothness<br>with "smoothing" in line object',
    ],
    line: { shape: "spline" },
    type: "scatter",
  };

  const trace3 = {
    x: [1, 2, 3, 4, 5],
    y: [11, 13, 12, 13, 11],
    mode: "lines+markers",
    name: "vhv",
    line: { shape: "vhv" },
    type: "scatter",
  };

  const trace4 = {
    x: [1, 2, 3, 4, 5],
    y: [16, 18, 17, 18, 16],
    mode: "lines+markers",
    name: "hvh",
    line: { shape: "hvh" },
    type: "scatter",
  };

  const trace5 = {
    x: [1, 2, 3, 4, 5],
    y: [21, 23, 22, 23, 21],
    mode: "lines+markers",
    name: "vh",
    line: { shape: "vh" },
    type: "scatter",
  };

  const trace6 = {
    x: [1, 2, 3, 4, 5],
    y: [26, 28, 27, 28, 26],
    mode: "lines+markers",
    name: "hv",
    line: { shape: "hv" },
    type: "scatter",
  };

  return (
    <div>
      {/*<DragDropContext onDragEnd={onDragEnd}>
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
                          width: index === 0 ? 250 : 200,
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
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>*/}

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              {graphs.map((item: any, index: any) => (
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
                        data={item.traces}
                        layout={{
                          dragmode: false,
                          showlegend: true,
                          hoverdistance: 1,
                          width: index === 0 ? 200 : 200,
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
                          legend: {
                            x: 0,
                            font: {
                              size: 8,
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

export default TabletRenewed2;
