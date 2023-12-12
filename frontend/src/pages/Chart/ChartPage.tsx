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
import { getStyle } from "@coreui/utils";
import tower from "assets/images/electric-tower.png";
import CanvasMenu from "./CanvasMenu";
import MockJson2 from "./MockJson2";
import GraphicScreen from "./GraphicScreen";
import ChartMapScreen from "./ChartMapScreen";
import TabletScreen from "./TabletScreen";
import TabletRenewed from "./TabletRenewed";
import ChartCanvasMenu from "./ChartCanvasMenu";

const ChartPage = (props: any) => {
  const [canvas, setCanvas] = useState<boolean>(false);
  const [well, setWell] = useState("");
  const [screenType, setScreenType] = useState(3);
  const [chartObjects, setChartObjects] = useState<any>([]);

  const newColumn = (name: any) => {
    console.log("name: ", name);
    const found = MockJson2.filter((element) => element.name === name);
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
        <TabletRenewed chartObjects={chartObjects} />
      )}

      <CanvasMenu
        canvas={canvas}
        well={well}
        handleCanvas={() => setCanvas(false)}
        handleClick={(item: any) => setWell(item)}
        handleScreenType={(t: any) => setScreenType(t)}
        newColumn={(n: any) => newColumn(n)}
      />
    </>
  );
};

export default ChartPage;
