import React, { useState } from "react";
import {
  CButton,
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

interface Props {
  addChart: (type: any) => void;
}

const AddNewChart = ({ addChart }: Props) => {
  const [modal, setModal] = useState(false);
  const [canvas, setCanvas] = useState<boolean>(false);
  const [newChart, setNewChart] = useState({
    id: Math.floor(Math.random() * 100).toString(),
    name: "",
    l: 1,
    r: 50,
    x: [1.79868138, 1.7956413, 1.80073333, 8.24981689, 8.30395889, 8.33829117],
    y: [494.528, 494.68, 494.832, 3271.72, 3271.872, 3272.024],
    color: "blue",
    yshowticklabels: false,
  });

  return (
    <div>
      <CIcon
        onClick={() => setCanvas(true)}
        icon={cilHamburgerMenu}
        size="xl"
      />
      <CModal
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
          <CFormInput
            type="text"
            placeholder="Название колонки"
            aria-label="default input example"
            onChange={(val) =>
              setNewChart({
                ...newChart,
                id: Math.floor(Math.random() * 10).toString(),
                name: val.target.value,
              })
            }
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModal(false)}>
            Close
          </CButton>
          <CButton onClick={() => addChart(newChart)} color="primary">
            Save changes
          </CButton>
        </CModalFooter>
      </CModal>

      <COffcanvas
        style={{ width: 300 }}
        backdrop="static"
        placement="start"
        visible={canvas}
        onHide={() => setCanvas(false)}
      >
        <COffcanvasHeader>
          <COffcanvasTitle>Настройки</COffcanvasTitle>
          <CCloseButton
            className="text-reset"
            onClick={() => setCanvas(false)}
          />
        </COffcanvasHeader>
        <COffcanvasBody>
          {/* <h5 style={{ textTransform: "uppercase", textAlign: "right" }}></h5>*/}
          <div style={{ paddingTop: "30%" }} className="d-grid gap-2">
            <CButton
              onClick={() => {
                setCanvas(false);
                setModal(true);
              }}
              color="warning"
              variant="outline"
            >
              Добавить колонку
            </CButton>
            <CButton color="warning" variant="outline">
              Восстановить колонки
            </CButton>
          </div>
        </COffcanvasBody>
      </COffcanvas>
    </div>
  );
};

export default AddNewChart;
