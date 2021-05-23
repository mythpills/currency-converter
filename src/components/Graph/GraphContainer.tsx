import React, { useState, useEffect } from "react";
import { useFetchHistoricalData } from "../../CustomHooks/useFetchRates";
import { useDateList } from "../../CustomHooks/useDateList";
import { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import DatePicker from "../DatePicker";
import LineGraph from "./LineGraph";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../store/ducks/loading";
import { useSelector } from "react-redux";
import ErrorText from "../ErrorText";

import { RootState, IDateRange } from "../../Interfaces";

interface Props {
  fromCurrency: string, toCurrency: string
}

const GraphContainer = ({ fromCurrency, toCurrency }: Props) => {
  const isLoading = useSelector((state: RootState) => state.isLoading.isLoading);
  const dispatch = useDispatch();
  const [dateRange, setDateRange] = useState<IDateRange>({
    from: new Date(),
    to: new Date(),
  });
  const { dateList } = useDateList(dateRange);
  const {
    currencyValues,
    loading,
    historyDataErrorText,
  } = useFetchHistoricalData(fromCurrency, toCurrency, dateList);

  useEffect(() => {
    loading && loading !== isLoading
      ? dispatch(showLoading())
      : dispatch(hideLoading());
  }, [loading]);

  const handleDayClick = (day: Date) => {
    const range: any = DateUtils.addDayToRange(day, dateRange);
    setDateRange(range);
  };
  const { from, to } = dateRange;
  const modifiers = { start: from, end: to };

  return (
    <>
      <div className="historicalDates">
        <h6>Historical Dates</h6>
        <DatePicker
          from={from}
          to={to}
          modifiers={modifiers}
          handleDayClick={handleDayClick}
        />
        <div className="instruction">Choose range</div>
      </div>

      {isLoading ? null : (
        <LineGraph currencyValues={currencyValues} dateList={dateList} />
      )}
      {historyDataErrorText !== "" && (
        <ErrorText errorText={historyDataErrorText} />
      )}
    </>
  );
};

export default GraphContainer;
