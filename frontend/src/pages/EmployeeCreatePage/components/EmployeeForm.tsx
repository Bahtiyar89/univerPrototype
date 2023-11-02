import React from "react";
import {CCard, CCardBody, CCardHeader, CFormInput} from "@coreui/react-pro";

const EmployeeForm = (props: any) => {
    const {model, errors, handleChange} = props
    return (
        <CCard>
            <CCardHeader>
                Данные сотрудника
            </CCardHeader>
            <CCardBody>
                <CFormInput
                    label="Фамилия"
                    type="text"
                    value={model.lastName ? model?.lastName : ''}
                    onChange={handleChange}
                    invalid={errors.lastName ? true : false}
                    feedback={errors.lastName ? errors.lastName : ''}
                />
                <br/>
                <CFormInput
                    label="Имя"
                    type="text"
                    value={model.lastName ? model?.lastName : ''}
                    onChange={handleChange}
                    invalid={errors.lastName ? true : false}
                    feedback={errors.lastName ? errors.lastName : ''}
                />
                <br/>
                <CFormInput
                    label="Отчество"
                    type="text"
                    value={model.lastName ? model?.lastName : ''}
                    onChange={handleChange}
                    invalid={errors.lastName ? true : false}
                    feedback={errors.lastName ? errors.lastName : ''}
                />
                <br/>
                <CFormInput
                    label="ИИН"
                    type="text"
                    value={model.lastName ? model?.lastName : ''}
                    onChange={handleChange}
                    invalid={errors.lastName ? true : false}
                    feedback={errors.lastName ? errors.lastName : ''}
                />
            </CCardBody>
        </CCard>
    )
}

export default EmployeeForm;
