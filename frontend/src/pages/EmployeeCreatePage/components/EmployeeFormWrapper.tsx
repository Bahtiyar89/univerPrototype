import React from "react";
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CContainer,
    CLoadingButton,
    CRow
} from "@coreui/react-pro";
import EmployeeForm from "./EmployeeForm";
import CustomerAddressForm from "./CustomerAddressForm";

const EmployeeFormWrapper = (props: any) => {
    const {saving, handleSubmit, handleCancel} = props
    return (
        <CContainer>
            <CCard>
                <CCardBody>
                    <CRow>
                        <CCol xs={6} md={6}>
                            <EmployeeForm {...props}/>
                        </CCol>

                        <CCol xs={6} md={6}>
                            <CustomerAddressForm {...props}/>
                        </CCol>

                    </CRow>
                </CCardBody>
                <CCardFooter>
                    <CRow lg={{ gutterY: 50 }}>
                        <CCol xs={2} md={2}>
                            <CButton color="light" onClick={handleCancel}>
                                Отмена
                            </CButton>
                        </CCol>
                        <CCol xs={8} md={8}></CCol>
                        <CCol xs={2} md={2}>
                            <CLoadingButton loading={saving} onClick={handleSubmit}>
                                {saving ? 'Ждите...' : 'Сохранить'}
                            </CLoadingButton>
                        </CCol>
                    </CRow>
                </CCardFooter>
            </CCard>
        </CContainer>
    )
}

export default EmployeeFormWrapper;
