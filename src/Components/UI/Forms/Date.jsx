"use client";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoMdCalendar } from "react-icons/io";

const DateInput = ({
  label,
  placeholder,
  text,
  register,
  setValue,
  require = true,
}) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const [day, setDay] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setDay(date?.getDate() || null);
    setMonth(date?.getMonth() + 1 || null);
    setYear(date?.getFullYear() || null);
  };

  useEffect(() => {
    if (selectedDate) {
      const formattedDate = `${day}/${month}/${year}`;
      setValue(text, formattedDate);
    }
  }, [selectedDate, day, month, year, setValue, text]);

  return (
    <div className="space-y-1">
      <label className="text-sm text-white">
        {label}{" "}
        <abbr
          className={`${require ? " " : "hidden"} pl-1 text-lg text-[#FF4234]`}
        >
          *
        </abbr>
      </label>
      <div className="relative h-10">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          placeholderText={placeholder}
          className="h-10 w-full p-2 bg-[#131517] text-[#fff]/50 rounded focus:outline-none placeholder:text-[#B9BABB] placeholder:text-xs text-xs"
          autoComplete="off"
        />
        <IoMdCalendar className="absolute right-2 top-3 text-base text-[secondary-base] pointer-events-none" />
      </div>
    </div>
  );
};

export default DateInput;
