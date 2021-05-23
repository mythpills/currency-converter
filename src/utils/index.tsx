import moment from "moment";
export const getDaysArray = function (start: Date, end: Date): string[] {
  for (
    var arr = [], dt = new Date(start);
    dt <= end;
    dt.setDate(dt.getDate() + 1)
  ) {
    arr.push(new Date(dt));
  }
  return arr.map((v) => moment(v).format("YYYY-MM-DD"));
};
