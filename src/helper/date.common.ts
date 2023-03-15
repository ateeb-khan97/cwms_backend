import moment from "moment";

export default function myDate(): string {
  return moment().format("DD-MM-YYYY | hh:mm A");
}
