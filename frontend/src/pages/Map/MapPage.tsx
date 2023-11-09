import React, { useState } from "react";
import {
  CButton,
  CCloseButton,
  COffcanvas,
  COffcanvasBody,
  COffcanvasHeader,
  COffcanvasTitle,
} from "@coreui/react-pro";
import { YMaps, Map } from "react-yandex-maps";
import CIcon from "@coreui/icons-react";
import { cilHamburgerMenu } from "@coreui/icons";

const MapPage = (props: any) => {
  const [canvas, setCanvas] = useState<boolean>(false);
  return (
    <YMaps>
      <CIcon
        onClick={() => setCanvas(true)}
        icon={cilHamburgerMenu}
        size="xl"
      />
      <Map
        width="100%"
        height={"70vh"}
        defaultState={{ center: [68.135378, 71.027863], zoom: 5.35 }}
      />
      <COffcanvas
        style={{ width: 300 }}
        backdrop="static"
        placement="start"
        visible={canvas}
        onHide={() => setCanvas(false)}
      >
        <COffcanvasHeader>
          <COffcanvasTitle>Выбор обьекта</COffcanvasTitle>
          <CCloseButton
            className="text-reset"
            onClick={() => setCanvas(false)}
          />
        </COffcanvasHeader>
        <COffcanvasBody>
          {/* <h5 style={{ textTransform: "uppercase", textAlign: "right" }}></h5>*/}
          <div style={{ paddingTop: "30%" }} className="d-grid gap-2">
            <CButton color="warning" variant="outline">
              ПО КАРТЕ
            </CButton>
            <CButton color="warning" variant="outline">
              ПО РЕГИОНУ
            </CButton>
            <CButton color="warning" variant="outline">
              ПО АЛФАВИТУ
            </CButton>
          </div>
        </COffcanvasBody>
      </COffcanvas>
    </YMaps>
  );
};

export default MapPage;
