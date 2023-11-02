import moment from "moment";

export const stringDDMMYYYYToMoment = (str: string) => {
    return moment(str,'DD.MM.YYYY').toDate()
}
