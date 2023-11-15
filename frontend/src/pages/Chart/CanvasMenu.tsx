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
import tower from "assets/images/electric-tower.png";

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
        <COffcanvasTitle>
          <CAvatar
            style={{
              filter:
                "saturate(500%) contrast(800%) brightness(500%) invert(80%) sepia(50%) hue-rotate(120deg)",
            }}
            src={tower}
            size="md"
          />
          Скважина {well}
        </COffcanvasTitle>
        <CCloseButton className="text-reset" onClick={handleCanvas} />
      </COffcanvasHeader>
      <COffcanvasBody>
        <CAccordion style={{ paddingTop: "30%" }} activeItemKey={2}>
          <CAccordionItem itemKey={1}>
            <CAccordionHeader onClick={() => handleClick?.("1")}>
              Скважина 1
            </CAccordionHeader>
            <CAccordionBody>
              <CButtonGroup
                role="group"
                aria-label="Basic mixed styles example"
              >
                <CButton onClick={() => handleScreenType?.(1)} color="danger">
                  Карта
                </CButton>
                <CButton onClick={() => handleScreenType?.(2)} color="warning">
                  График
                </CButton>
                <CButton onClick={() => handleScreenType?.(3)} color="success">
                  Планшет
                </CButton>
              </CButtonGroup>
            </CAccordionBody>
          </CAccordionItem>
        </CAccordion>
      </COffcanvasBody>
    </COffcanvas>
  );
};

export default CanvasMenu;
