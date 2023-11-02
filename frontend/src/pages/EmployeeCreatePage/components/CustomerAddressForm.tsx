import React from "react";
import {CCard, CCardBody, CCardHeader, CFormInput} from "@coreui/react-pro";

const CustomerAddressForm = (props: any) => {
    const {model, errors, handleChange} = props
    return (
        <CCard>
            <CCardHeader>
                {model.name || 'Введите название адреса'}
            </CCardHeader>
            <CCardBody>
                <CFormInput
                    label="Название адреса"
                    placeholder={'Например: Домашнии адрес'}
                    type="text"
                    value={model.name ? model.name : ''}
                    onChange={handleChange}
                    invalid={errors.name ? true : false}
                    feedback={errors.name ? errors.name : ''}
                />
            </CCardBody>
        </CCard>
    )
}

export default CustomerAddressForm;
