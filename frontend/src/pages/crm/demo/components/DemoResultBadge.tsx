import React from "react";
import { CBadge } from "@coreui/react-pro";
import {DemoResult} from "../../CrmClasses";


interface Props {
    result: string;
    resultName: string;
}

const DemoResultBadge = ({result, resultName}: Props) => {
    let color;
    switch (result) {
        case DemoResult.NEW:
            color = 'light';
            break
        case DemoResult.DONE:
            color = 'success';
            break
        case DemoResult.CANCELLED:
            color = 'danger';
            break
        case DemoResult.RESCHEDULED:
            color = 'warning';
            break

        default:
            color = 'dark';
            break
    }

    return (
        <CBadge color={color}>
            {resultName}
        </CBadge>
    );
}

export default DemoResultBadge;
