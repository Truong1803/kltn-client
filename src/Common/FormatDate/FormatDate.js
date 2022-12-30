import moment from "moment";

export const formatDate = (date) => {
  const newDate = moment(date).format("DD-MM-YYYY");
  return newDate;
};
export const addCommas = (num, style = ".") => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, style);
};
export const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, "");
export const formatMoney = (money, style = ".") => {
  return addCommas(removeNonNumeric(money), style);
};
