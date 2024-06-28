import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';

interface DatePickerProps {
  date: string;
  setDate: (date: string) => void;
  editing: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({ date, setDate, editing }) => {

  return (
    <>
      <div className="dateContainer">

        {!editing ? (
          date
        ) : (
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        )}
      </div>
    </>
  );
};

export default DatePicker;
