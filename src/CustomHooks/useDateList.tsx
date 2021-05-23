import { useEffect, useState } from "react";
import { getDaysArray } from "../utils/index";
import { IDateRange } from '../Interfaces'

export const useDateList = (dateRange: IDateRange) => {
  const [dateList, setDateList] = useState(
    getDaysArray(new Date(), new Date())
  );

  useEffect(() => {
    setDateList(getDaysArray(dateRange.from, dateRange.to));
  }, [dateRange]);

  return { dateList };
};
