import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { traces } from "./MockJson2";

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

const TabletRenewed = (props: any) => {
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

  return (
    <div>
      {/* <DragDropContext onDragEnd={onDragEnd}>
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
                   
                  
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>*/}
      <Plot
        config={{
          displayModeBar: false,
          displaylogo: false,
        }}
        data={[
          {
            name: "RDEP",

            x: [
              15, 9, 12, 15, 18, 12, 11, 16, 10, 17, 16, 8, 15, 6, 12, 10, 18,
              12, 20, 18, 19, 5, 12, 11, 14, 16, 16, 11, 9, 17, 19, 13, 8, 10,
              15, 20, 13, 21, 18, 8, 7, 20, 16, 17, 20, 12, 14, 17, 5, 13, 11,
              13, 9, 12, 15, 11, 19, 7, 16, 9, 11, 7, 14, 16, 13, 13, 8, 19, 18,
              10, 18, 12, 13, 16, 18, 12, 17, 20, 20, 13, 6, 6, 17, 9, 13, 5, 5,
              12, 11, 20, 18, 21,
            ],
            y: [
              577, 592, 626, 629, 667, 674, 681, 710, 737, 745, 785, 787, 794,
              794, 820, 873, 902, 933, 952, 970, 1007, 1014, 1019, 1034, 1075,
              1105, 1112, 1128, 1138, 1167, 1251, 1283, 1300, 1339, 1383, 1401,
              1414, 1437, 1442, 1510, 1519, 1543, 1565, 1592, 1664, 1677, 1678,
              1702, 1722, 1733, 1736, 1747, 1821, 1859, 1879, 1918, 1922, 1933,
              1934, 1981, 1984, 1996, 2011, 2037, 2053, 2122, 2140, 2175, 2186,
              2277, 2285, 2370, 2411, 2415, 2471, 2480, 2483, 2514, 2537, 2593,
              2607, 2612, 2630, 2656, 2682, 2713, 2720, 2729, 2741, 2791, 2838,
              2866,
            ],
          },
        ]}
        layout={{
          dragmode: false,
          showlegend: false,
          hoverdistance: 1,
          width: 350,
          height: 750,

          xaxis: {
            side: "top",
            anchor: "y",
            domain: [0, 30],
            linecolor: "black",
            linewidth: 2,
            mirror: true,
            showline: true,
            tickangle: 0,
            ticks: "inside",
            title: { text: "item.name" },
          },
          yaxis: {
            anchor: "x",
            autorange: "reversed",
            dtick: 250,
            linecolor: "black",
            linewidth: 2,
            mirror: true,
            showticklabels: true,
            tick0: 0,
            tickmode: "linear",
          },
        }}
      />
    </div>
  );
};

export default TabletRenewed;
