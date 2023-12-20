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

const ChartPage = (props: any) => {
  const [modal, setModal] = useState<boolean>(false);
  const [canvas, setCanvas] = useState<boolean>(false);
  const [well, setWell] = useState("");
  const [screenType, setScreenType] = useState(3);
  const [chartObjects, setChartObjects] = useState<any>([]);

  const newColumn = (name: any) => {
    console.log("name: ", name);
    const found = traces.filter((element) => element.name === name);
    console.log("found: ", Object.keys(found).length);
    if (Object.keys(found).length) {
      const search = chartObjects.find((el: any) => el.name === name);
      console.log("search: ", search);
      if (search) {
      } else {
        const mergedArray = [...found, ...chartObjects];
        setChartObjects(mergedArray);
      }
    }
  };
  console.log("traces: ", traces);

  const handleChartColumn = () => {
    setModal(true);
    setCanvas(false);
  };
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
        <TabletRenewed2 chartObjects={graphs} />
      )}

      <CanvasMenu
        canvas={canvas}
        well={well}
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
            <CButton onClick={() => console.log("dddd")} color="primary">
              Добавление в текуший колонку
            </CButton>
            <CButton onClick={() => console.log("dddd")} color="success">
              Добавление в новую колонку
            </CButton>
          </div>
        </CModalBody>
      </CModal>
    </>
  );
};

export default ChartPage;
