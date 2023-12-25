import React, { useEffect, useState } from "react";
import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CAvatar,
  CButton,
  CButtonGroup,
  CCloseButton,
  CFormInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  COffcanvas,
  COffcanvasBody,
  COffcanvasHeader,
  COffcanvasTitle,
} from "@coreui/react-pro";
import CIcon from "@coreui/icons-react";
import { cilHamburgerMenu } from "@coreui/icons";
import CanvasMenu from "./CanvasMenu";
import { graphs, traces } from "./MockJson2";
import GraphicScreen from "./GraphicScreen";
import ChartMapScreen from "./ChartMapScreen";
import TabletRenewed from "./TabletRenewed";
import TabletRenewed2 from "./TabletRenewed2";

// a little function to help us with reordering the result
const reorder = (list: any, startIndex: any, endIndex: any) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const ChartPage = (props: any) => {
  const [modal, setModal] = useState<boolean>(false);
  const [modal2, setModal2] = useState<boolean>(false);
  const [modal3, setModal3] = useState<boolean>(false);
  const [canvas, setCanvas] = useState<boolean>(false);
  const [well, setWell] = useState("");
  const [screenType, setScreenType] = useState(3);
  const [columnName, setColumnName] = useState<string>("");
  const [newObjectColumn, setNewObjectColumn] = useState<string>("");
  const [items, setItems] = useState<any>(graphs);

  const newColumn = (name: any) => {
    const found = traces.filter((element) => element.name === name);
    console.log("found: ", found);
    if (Object.keys(found).length) {
      const search = items.find((el: any) => el.name === name);
      console.log("search: ", search);
      if (search) {
      } else {
        const mergedArray = [...found, ...items];
        setItems(mergedArray);
      }
    } else {
      let out = items.map((c: any, idx: number) => {
        return {
          id: c.id,
          name: c.name,
          yshowticklabels: c.yshowticklabels,
          l: idx === 0 ? 50 : 1,
          r: 1,
          traces: c.traces,
        };
      });

      const column = {
        id: "3",
        name: "RHOB",
        l: out.length > 0 ? 1 : 50,
        r: out.length > 0 ? 1 : 50,
        traces: [
          {
            x: [
              1.79868138, 1.7956413, 1.80073333, 8.24981689, 8.30395889,
              8.33829117,
            ],
            y: [494.528, 494.68, 494.832, 3271.72, 3271.872, 3272.024],
          },
          {
            marker: {
              color: "transparent",
              size: 0,
            },
            x: [10],
            y: [3300],
            name: "",
          },
        ],
        color: "goldenrod",
        yshowticklabels: false,
      };

      const mergedArray = [...out, column];
      setItems(mergedArray);
    }
  };

  const newObjectToColumn = (name: string) => {
    console.log("name: ", name);
    const newItems = [];
    let fountObj;
    for (const key in items) {
      if (items[key].id === "1") {
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
              x: [10, 20],
              y: [550, 2900],
              name: "RHOB",
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

    /*
    const found = items.filter((element) => element.name === name);
    console.log("name: ", name);
    console.log("found: ", found);
    const search = items.find((el: any) => el.name === name);
    console.log("search: ", search);
    if (search) {
    } else {
      const mergedArray = [...found, ...items];
      //   setItems(mergedArray);
    }*/
  };

  const handleChartColumn = (val: any) => {
    setColumnName(val);
    setModal(true);
    setCanvas(false);
  };

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
    const lastEl = items.length - 1;
    const newArr = items.map((item: any, index: any) => {
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

  console.log("items: ", items);
  console.log("columnName: ", columnName);

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
        canvas={canvas}
        well={well}
        newObjectToColumn={() => setModal3(true)}
        handleChartColumn={handleChartColumn}
        handleCanvas={() => setCanvas(false)}
        handleClick={(item: any) => setWell(item)}
        handleScreenType={(t: any) => setScreenType(t)}
        newColumn={(n: any) => newColumn(n)}
      />
      <CModal
        size="lg"
        visible={modal}
        onClose={() => setModal(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader closeButton={true}>
          <CModalTitle id="LiveDemoExampleLabel">
            Добавление параметр
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            {items.length > 0 && (
              <CButton onClick={() => console.log("dddd")} color="primary">
                Добавление в текуший колонку
              </CButton>
            )}
            <CButton
              onClick={() => {
                setModal(false);
                setModal2(true);
              }}
              color="success"
            >
              Добавление в новую колонку
            </CButton>
          </div>
        </CModalBody>
      </CModal>

      <CModal
        visible={modal2}
        onClick={() => {
          setModal2(false);
        }}
        aria-labelledby="ToggleBetweenModalsExample2"
      >
        <CModalHeader>
          <CModalTitle id="ToggleBetweenModalsExample2">
            Наименование новой колонки
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormInput
            disabled={true}
            type="text"
            placeholder="Large input"
            aria-label="lg input example"
            onChange={(val: any) => setColumnName(val)}
            value={columnName}
          />
        </CModalBody>
        <CModalFooter>
          <CButton
            color="primary"
            onClick={() => {
              setModal2(false);
              newColumn(columnName);
            }}
          >
            Добавить
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal
        size="lg"
        visible={modal3}
        onClick={() => {
          //    setModal3(false);
        }}
        aria-labelledby="ToggleBetweenModalsExample2"
      >
        <CModalHeader>
          <CModalTitle id="ToggleBetweenModalsExample2">
            Добавление нового обьекта к колонке "GL"
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CButton
            onClick={() => newObjectToColumn("GL")}
            style={{ margin: 10 }}
            color="primary"
          >
            GL
          </CButton>
          <CButton
            onClick={() => newObjectToColumn("CALI")}
            style={{ margin: 10 }}
            color="secondary"
          >
            CALI
          </CButton>
          <CButton
            onClick={() => newObjectToColumn("RDEP")}
            style={{ margin: 10 }}
            color="success"
          >
            RDEP
          </CButton>
          <CButton
            onClick={() => newObjectToColumn("RHOB")}
            style={{ margin: 10 }}
            color="danger"
          >
            RHOB
          </CButton>
          <CButton
            onClick={() => newObjectToColumn("NPHI")}
            style={{ margin: 10 }}
            color="info"
          >
            NPHI
          </CButton>
          <CButton
            onClick={() => newObjectToColumn("SP")}
            style={{ margin: 10 }}
            color="light"
          >
            SP
          </CButton>
          <CButton
            onClick={() => newObjectToColumn("DTC")}
            style={{ margin: 10 }}
            color="dark"
          >
            DTC
          </CButton>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="primary"
            onClick={() => {
              //   setModal3(false);
              newObjectToColumn(columnName);
            }}
          >
            Закрыть
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default ChartPage;
