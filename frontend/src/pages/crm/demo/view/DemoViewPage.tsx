import React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardText,
  CCardTitle,
  CCol,
  CCollapse,
  CContainer,
  CFormInput,
  CRow,
} from "@coreui/react-pro";

const DemoViewPage = () => {
  return (
    <CCard>
      <CCardHeader>Просмотр демонстрации</CCardHeader>
      <CCardHeader>
        <CButton href="#">Проставить результат</CButton>
      </CCardHeader>
      <CCardBody>
        <CCardTitle>Special title treatment</CCardTitle>
        <CRow>
          <CCol lg>
            <CFormInput
              disabled
              placeholder="First name"
              aria-label="First name"
              value={"240"}
              label={"Рег номер."}
            />
          </CCol>
          <CCol lg>
            <CFormInput
              disabled
              placeholder="First name"
              aria-label="First name"
              value={"240"}
              label={"Рег номер."}
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol lg>
            <CFormInput
              disabled
              placeholder="First name"
              aria-label="First name"
              value={"240"}
              label={"Рег номер."}
            />
          </CCol>
          <CCol lg>
            <CFormInput
              disabled
              placeholder="First name"
              aria-label="First name"
              value={"240"}
              label={"Рег номер."}
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol lg>
            <CFormInput
              disabled
              placeholder="First name"
              aria-label="First name"
              value={"240"}
              label={"Рег номер."}
            />
          </CCol>
          <CCol lg>
            <CFormInput
              disabled
              placeholder="First name"
              aria-label="First name"
              value={"240"}
              label={"Рег номер."}
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol lg>
            <CFormInput
              disabled
              placeholder="First name"
              aria-label="First name"
              value={"240"}
              label={"Рег номер."}
            />
          </CCol>
          <CCol lg>
            <CFormInput
              disabled
              placeholder="First name"
              aria-label="First name"
              value={"240"}
              label={"Рег номер."}
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol lg>
            <CFormInput
              disabled
              placeholder="First name"
              aria-label="First name"
              value={"240"}
              label={"Рег номер."}
            />
          </CCol>
          <CCol lg>
            <CFormInput
              disabled
              placeholder="First name"
              aria-label="First name"
              value={"240"}
              label={"Рег номер."}
            />
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  );
};

export default DemoViewPage;
