import React, {ChangeEventHandler} from "react";
import {CFormSelect} from "@coreui/react-pro";

interface Props {
    fieldName: string;
    fieldLabel?: string;
    optionLabel?: string;
    options: { id: string, label: string }[];
    handleChange: ChangeEventHandler<HTMLSelectElement>;
}

export const RefOptionsField = ({fieldName, optionLabel, options, handleChange}: Props) => {

    const preparedOptions: { label?: string, value?: string }[] = [
        {
            value: '',
            label: optionLabel || 'Не выбрано'
        }
    ];

    if (options) {
        options.forEach((value) => {
            preparedOptions.push({
                value: value.id,
                label: value.label
            })
        })
    }

    return (
        <CFormSelect
            name={fieldName}
            className="demonstration__select"
            aria-label={optionLabel || 'Не выбрано'}
            onChange={handleChange}
            options={preparedOptions}
        />
    )
}
