import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import CIcon from "@coreui/icons-react";
import { cilHamburgerMenu } from "@coreui/icons";
import CanvasMenu from "./CanvasMenu";
import { graphs, traces } from "./MockJson2";
import GraphicScreen from "./GraphicScreen";
import ChartMapScreen from "./ChartMapScreen";
import TabletRenewed2 from "./TabletRenewed2";
import { useSystemParametersOptionsQuery } from "../../hook/query/reference/useSystemParametersOptionsQuery";
import { useAllWellOptionsQuery, useWellsListQuery } from "hook/query";
import { makeuid } from "../../utils/UriUtil";
import ModalSelectNewCurrent from "./components/ModalSelectNewCurrent";
import ModalNewColumn from "./components/ModalNewColumn";
import ModalCurrentColumn from "./components/ModalCurrentColumn";
// a little function to help us with reordering the result
const reorder = (list: any, startIndex: any, endIndex: any) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const ChartPage = (props: any) => {
  const systemParametersOptionsQuery = useSystemParametersOptionsQuery({
    enabled: true,
  });
  const allWellOptionsQuery = useAllWellOptionsQuery(true);
  const [searchParams, setSearchParams] = useState({
    wellId: undefined,
    docId: undefined,
  });
  const wellListQuery = useWellsListQuery(searchParams, false);

  const [modal, setModal] = useState<boolean>(false);
  const [modal2, setModal2] = useState<boolean>(false);
  const [modal3, setModal3] = useState<boolean>(false);
  const [canvas, setCanvas] = useState<boolean>(false);
  const [well, setWell] = useState("");
  const [screenType, setScreenType] = useState(3);
  const [columnName, setColumnName] = useState<string>("");
  const [newObjectColumn, setNewObjectColumn] = useState<any>({});
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

  const handleGraphsColumn = (data: any) => {
    if (!data) {
      return [];
    }
    const newRoles = [];
    const xValues = Object.keys(data).map(function (k) {
      return parseInt(data[k].RecValue);
    });

    const yValues = Object.keys(data).map(function (k) {
      return parseFloat(data[k].RecDepth);
    });

    if (items.length) {
      for (let index = 0; index < items.length; index++) {
        if (index === items.length - 1) {
          const element = items[index];
          element.r = 1;
          newRoles.push(element);
        } else {
          const element = items[index];
          newRoles.push(element);
        }
      }

      const newObj = {
        id: makeuid(5)?.toString(),
        name: columnName,
        l: 1,
        r: 50,
        traces: [
          {
            fill: "tonextx",
            fillpattern: {
              shape: "+",
              fillmode: "overlay",
              bgcolor: "green",
              fgcolor: "red",
              size: 1000,
              solidity: 2,
            },
            x: xValues,
            y: yValues,
            marker: {
              color: "green",
              size: 10,
              type: "scatter",
            },
            name: "GR",
          },
        ],
        color: "goldenrod",
        yshowticklabels: false,
      };
      setItems([...newRoles, newObj]);
    } else {
      const newColumn = {
        id: makeuid(5)?.toString(),
        name: columnName,
        showticklabels: true,
        l: 50,
        r: 50,
        traces: [
          {
            fill: "tonextx",
            fillpattern: {
              shape: "-",
              fillmode: "overlay",
              bgcolor: "green",
              fgcolor: "red",
              size: 1000,
              solidity: 2,
            },
            x: xValues,
            y: yValues,
            name: columnName,
          },
        ],
      };

      setItems([newColumn]);
    }
  };

  const handleColumntAdd = () => {
    wellListQuery
      .refetch()
      .then(({ data }) =>
        handleGraphsColumn(data?.Result?.Rocks[0]?.Searches[0]?.values || [])
      );
    setModal2(false);
  };

  const newObjectToColumn = (el: any) => {
    console.log("ddd: ", el);
    console.log("items: ", items);
    const found = items.find(
      (column: any) => column.name === newObjectColumn.name
    );
    console.log("newObjectColumn: ", newObjectColumn);
    console.log("found: ", found);
    if (found) {
      toast.error("Колонна уже выбрано !");
    } else {
      const newItems = [];
      let fountObj;
      for (const key in items) {
        if (items[key].id === el.id) {
          fountObj = {
            id: items[key].id,
            name: items[key].name,
            l: items[key].l,
            r: items[key].r,
            traces: [
              ...items[key].traces,
              {
                marker: {
                  color: "red",
                  size: 0,
                },
                x: newObjectColumn.traces[0].x,
                y: newObjectColumn.traces[0].y,
                name: newObjectColumn.name,
              },
            ],
            color: "red",
            yshowticklabels: items[key].yshowticklabels,
          };
        } else {
          newItems.push(items[key]);
        }
      }

      const mergedArray = [...newItems, fountObj];
      setItems(
        mergedArray.sort(function (a, b) {
          return a.id - b.id;
        })
      );

      const found = items.filter((element: any) => element.id === el.id);
      console.log("id: ", el.id);
      console.log("found: ", found);
      const search = items.find((el: any) => el.id === el.id);
      console.log("search: ", search);
      if (search) {
      } else {
        const mergedArray = [...found, ...items];
        console.log("22:,", mergedArray);
        //   setItems(mergedArray);
      }
    }
    /*  const newItems = [];
    let fountObj;
    for (const key in items) {
      if (items[key].id === el.id) {
        fountObj = {
          id: items[key].id,
          name: items[key].name,
          l: items[key].l,
          r: items[key].r,
          traces: [
            ...items[key].traces,
            {
              marker: {
                color: "red",
                size: 0,
              },
              x: newObjectColumn.traces[0].x,
              y: newObjectColumn.traces[0].y,
              name: newObjectColumn.name,
            },
          ],
          color: "red",
          yshowticklabels: items[key].yshowticklabels,
        };
      } else {
        newItems.push(items[key]);
      }
    }

    const mergedArray = [...newItems, fountObj];

    console.log("22:,", mergedArray);

    /*  setItems(
      mergedArray.sort(function (a, b) {
        return a.id - b.id;
      })
    );
 
    const found = items.filter((element: any) => element.id === el.id);
    console.log("id: ", el.id);
    console.log("found: ", found);
    const search = items.find((el: any) => el.id === el.id);
    console.log("search: ", search);
    if (search) {
    } else {
      const mergedArray = [...found, ...items];
      console.log("22:,", mergedArray);
      //   setItems(mergedArray);
    }*/
  };

  const handleChartColumn = (item: any, subItem: any) => {
    setSearchParams({
      wellId: item.RecID,
      docId: subItem.RecID,
    });

    setColumnName(subItem.RecSymbols);
    setModal(true);
    setCanvas(false);
  };

  const handleCurrentGraphs = (data: any) => {
    if (!data) {
      return [];
    }
    const xValues = Object.keys(data).map(function (k) {
      return parseInt(data[k].RecValue);
    });

    const yValues = Object.keys(data).map(function (k) {
      return parseFloat(data[k].RecDepth);
    });

    const newObj = {
      name: columnName,
      traces: [
        {
          fill: "tonextx",
          fillpattern: {
            shape: "+",
            fillmode: "overlay",
            bgcolor: "green",
            fgcolor: "red",
            size: 1000,
            solidity: 2,
          },
          x: xValues,
          y: yValues,
          marker: {
            color: "green",
            size: 10,
            type: "scatter",
          },
          name: "GR",
        },
      ],
      color: "goldenrod",
      yshowticklabels: false,
    };
    setNewObjectColumn(newObj);
  };

  const handleCurrentColumn = () => {
    setModal(false);
    setModal3(true);
  };

  useEffect(() => {
    if (searchParams.docId != undefined) {
      console.log("cccc");

      wellListQuery
        .refetch()
        .then(({ data }) =>
          handleCurrentGraphs(data?.Result?.Rocks[0]?.Searches[0]?.values || [])
        );
    }
  }, [searchParams.docId]);
  console.log("newObjectColumn: ", newObjectColumn);
  console.log("modal3", modal3);
  return (
    <>
      <CIcon
        onClick={() => setCanvas(true)}
        icon={cilHamburgerMenu}
        size="xl"
      />
      {screenType === 1 ? (
        <ChartMapScreen />
      ) : screenType === 2 ? (
        <GraphicScreen />
      ) : (
        <TabletRenewed2 chartObjects={items} onDragEnd={onDragEnd} />
      )}

      <CanvasMenu
        allWells={allWellOptionsQuery.data}
        allSystemParametersOptionsQuery={systemParametersOptionsQuery.data}
        canvas={canvas}
        well={well}
        handleChartColumn={handleChartColumn}
        handleCanvas={() => setCanvas(false)}
        handleClick={(item: any) => setWell(item)}
      />
      <ModalSelectNewCurrent
        modal={modal}
        items={items}
        handleModal={(el) => setModal(el)}
        handleModal2={(el) => setModal2(el)}
        handleCurrentColumn={handleCurrentColumn}
      />
      <ModalNewColumn
        modal2={modal2}
        columnName={columnName}
        handleColumnName={(el) => setColumnName(el)}
        handleColumntAdd={handleColumntAdd}
      />

      <ModalCurrentColumn
        items={items}
        columnName={columnName}
        modal3={modal3}
        onClose={() => setModal3(false)}
        newObjectToColumn={newObjectToColumn}
      />
      <ToastContainer />
    </>
  );
};

export default ChartPage;
