import React from "react";
import Helmet from "react-helmet";

import "react-day-picker/lib/style.css";
import "../App.css";

import DayPickerInput from "react-day-picker/DayPickerInput";
import LocaleUtils from "react-day-picker/moment";

interface Props {
  from: any,
  to: any,
  modifiers: object,
  handleDayClick: any
}


const DatePicker = ({ from, to, modifiers, handleDayClick }: Props) => {
  return (
    <div className="InputFromTo">
      <DayPickerInput
        value={from}
        placeholder="From"
        format="LL"
        formatDate={LocaleUtils.formatDate}
        parseDate={LocaleUtils.parseDate}
        dayPickerProps={{
          selectedDays: [from, { from, to }],
          disabledDays: { after: to },
          toMonth: to,
          modifiers,
          numberOfMonths: 2,
          onDayClick: () => to.getInput().focus(),
        }}
        onDayChange={handleDayClick}
      />
      —
      <span className="InputFromTo-to">
        <DayPickerInput
          ref={(el) => (to = el)}
          value={to}
          placeholder="To"
          format="LL"
          formatDate={LocaleUtils.formatDate}
          parseDate={LocaleUtils.parseDate}
          dayPickerProps={{
            selectedDays: [from, { from, to }],
            disabledDays: [{ before: from }, { after: new Date() }],
            modifiers,
            month: from,
            fromMonth: from,
            numberOfMonths: 2,
          }}
          onDayChange={handleDayClick}
        />
      </span>
      <Helmet> <style>{`
  .InputFromTo .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #f0f8ff !important;
    color: #4a90e2;
  }
  .InputFromTo .DayPicker-Day {
    border-radius: 0 !important;
  }
  .InputFromTo .DayPicker-Day--start {
    border-top-left-radius: 50% !important;
    border-bottom-left-radius: 50% !important;
  }
  .InputFromTo .DayPicker-Day--end {
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
  }
  .InputFromTo .DayPickerInput-Overlay {
    width: 550px;
  }
  .InputFromTo-to .DayPickerInput-Overlay {
    margin-left: -198px;
  }
`}</style></Helmet>
    </div>
  );
};

export default DatePicker;
