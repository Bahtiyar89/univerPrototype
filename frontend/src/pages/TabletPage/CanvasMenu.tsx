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

interface Props {
  canvas: boolean;
  well: string;
  handleCanvas?: () => void;
  handleClick?: (item: any) => void;
  handleScreenType?: (type: any) => void;
}

const CanvasMenu = ({
  canvas,
  well,
  handleCanvas,
  handleClick,
  handleScreenType,
}: Props) => {
  return (
    <COffcanvas
      style={{ width: 300 }}
      backdrop="static"
      placement="start"
      visible={canvas}
      onHide={handleCanvas}
    >
      <COffcanvasHeader>
        <COffcanvasTitle>Скважина</COffcanvasTitle>
        <CCloseButton className="text-reset" onClick={handleCanvas} />
      </COffcanvasHeader>
      <COffcanvasBody>
        <CAccordion style={{ paddingTop: "30%" }} activeItemKey={2}>
          <CAccordionItem itemKey={1}>
            <CAccordionHeader onClick={() => handleClick?.("1")}>
              Скважина
            </CAccordionHeader>
            <CAccordionBody>
              <div className="d-grid gap-2">
                <CButton onClick={() => handleScreenType?.(3)} color="success">
                  Параметр 1
                </CButton>
                <CButton onClick={() => handleScreenType?.(1)} color="danger">
                  Параметр 2
                </CButton>
                <CButton onClick={() => handleScreenType?.(2)} color="warning">
                  Параметр 3
                </CButton>
              </div>
            </CAccordionBody>
          </CAccordionItem>
        </CAccordion>
      </COffcanvasBody>
    </COffcanvas>
  );
};

export default CanvasMenu;
