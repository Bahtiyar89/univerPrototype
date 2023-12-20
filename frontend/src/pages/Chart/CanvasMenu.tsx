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
import ChartCanvasMenu from "./ChartCanvasMenu";

interface Props {
  canvas: boolean;
  well: string;
  handleCanvas?: () => void;
  handleChartColumn: () => void;
  handleClick?: (item: any) => void;
  handleScreenType?: (type: any) => void;
  newColumn?: (name: any) => void;
}

const CanvasMenu = ({
  canvas,
  well,
  handleCanvas,
  handleClick,
  handleChartColumn,
  handleScreenType,
  newColumn,
}: Props) => {
  const [items, setItems] = useState<any>(ChartCanvasMenu);

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
        {items.map((item: any, index: number) => (
          <>
            <CAccordion
              style={{ paddingTop: index == 0 ? "30%" : 10 }}
              activeItemKey={2}
            >
              <CAccordionItem itemKey={1}>
                <CAccordionHeader onClick={() => handleClick?.("1")}>
                  {item.name}
                </CAccordionHeader>
                <CAccordionBody>
                  <div className="d-grid gap-2">
                    {item.params.map((i: any, index: number) => {
                      return (
                        <CButton
                          onClick={() => handleChartColumn()}
                          color={i.color}
                        >
                          {i.name}
                        </CButton>
                      );
                    })}
                  </div>
                </CAccordionBody>
              </CAccordionItem>
            </CAccordion>
          </>
        ))}
      </COffcanvasBody>
    </COffcanvas>
  );
};

export default CanvasMenu;
