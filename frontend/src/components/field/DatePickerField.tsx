import React from "react";
import { CDatePicker } from "@coreui/react-pro";
import { stringDDMMYYYYToMoment } from "utils/DateHelper";

interface Props {
  fieldName: string;
  handleChange: any;
  value?: string;
}
export const DatePickerField = ({ fieldName, handleChange, value }: Props) => {
  const preHandle = (selectedVal: any) => {
    handleChange({
      target: {
        name: fieldName,
        value: selectedVal,
      },
    });
  };

  return (
    <CDatePicker
      rangesButtonsSize="sm"
      placeholder="Выберите дату"
      locale="ru-RU"
      onDateChange={(_date, formattedDate) => preHandle(formattedDate)}
      date={value ? stringDDMMYYYYToMoment(value) : null}
    />
  );
};
