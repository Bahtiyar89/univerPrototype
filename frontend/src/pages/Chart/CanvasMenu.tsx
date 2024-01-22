import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CAvatar,
  CButton,
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
  allWells: any[];
  allSystemParametersOptionsQuery: any[];
  handleCanvas?: () => void;
  handleChartColumn: (well: string, parametre: string) => void;
  handleClick?: (item: any) => void;
}

const CanvasMenu = ({
  allWells,
  allSystemParametersOptionsQuery,
  canvas,
  well,
  handleCanvas,
  handleClick,
  handleChartColumn,
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
        {allWells?.map((item: any, index: number) => {
          return (
            <div key={item.RecID}>
              <CAccordion
                style={{ paddingTop: index == 0 ? "30%" : 10 }}
                activeItemKey={2}
              >
                <CAccordionItem itemKey={1}>
                  <CAccordionHeader onClick={() => handleClick?.("1")}>
                    {item.RecName}
                  </CAccordionHeader>
                  <CAccordionBody>
                    <div className="d-grid gap-2">
                      {[
                        {
                          RecID: 88,
                          RecSymbols: "azim_gn",
                          RecDescr: ":",
                          RecFamilyID: -1,
                          RecUnit: ".",
                        },
                        {
                          RecID: 89,
                          RecSymbols: "azim_tn",
                          RecDescr: ":",
                          RecFamilyID: -1,
                          RecUnit: ".",
                        },
                        {
                          RecID: 90,
                          RecSymbols: "dls",
                          RecDescr: ":",
                          RecFamilyID: -1,
                          RecUnit: ".",
                        },
                        {
                          RecID: 91,
                          RecSymbols: "dx",
                          RecDescr: ":",
                          RecFamilyID: -1,
                          RecUnit: ".",
                        },
                        {
                          RecID: 92,
                          RecSymbols: "dy",
                          RecDescr: ":",
                          RecFamilyID: -1,
                          RecUnit: ".",
                        },
                        {
                          RecID: 93,
                          RecSymbols: "incl",
                          RecDescr: ":",
                          RecFamilyID: -1,
                          RecUnit: ".",
                        },
                        {
                          RecID: 94,
                          RecSymbols: "tvd",
                          RecDescr: ":",
                          RecFamilyID: -1,
                          RecUnit: ".",
                        },
                        {
                          RecID: 95,
                          RecSymbols: "x",
                          RecDescr: ":",
                          RecFamilyID: -1,
                          RecUnit: ".",
                        },
                        {
                          RecID: 96,
                          RecSymbols: "y",
                          RecDescr: ":",
                          RecFamilyID: -1,
                          RecUnit: ".",
                        },
                        {
                          RecID: 97,
                          RecSymbols: "z",
                          RecDescr: ":",
                          RecFamilyID: -1,
                          RecUnit: ".",
                        },
                      ]?.map((i: any, index: number) => {
                        return (
                          <CButton
                            key={index}
                            onClick={() => handleChartColumn?.(item, i)}
                            color={i.color}
                          >
                            {i.RecSymbols}
                          </CButton>
                        );
                      })}
                    </div>
                  </CAccordionBody>
                </CAccordionItem>
              </CAccordion>
            </div>
          );
        })}
      </COffcanvasBody>
    </COffcanvas>
  );
};

export default CanvasMenu;
