import React from "react";
import AppContentPageWrapper from "../EmployeePage/Wrapper/AppContentPageWrapper";
import EmployeeFormWrapper from "./components/EmployeeFormWrapper";

const EmployeeCreatePage = (props: any) => {

    const handleSubmit = () => {}
    const handleCancel = () => {}
    const handleChange = () => {}

    return (
        <AppContentPageWrapper
            pageTitle="Добавление сотрудника"
            actionButtons={[]}
            onClickActionButtons={[]}
            content={
                <EmployeeFormWrapper
                    model={{}}
                    errors={{}}
                    saving={false}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    handleCancel={handleCancel}
                />
            }
        />
    )
}

export default EmployeeCreatePage;
