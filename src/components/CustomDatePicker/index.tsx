import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa"; // 캘린더 아이콘 사용

interface ICustomDatePickerProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

const CustomDatePicker = (props: ICustomDatePickerProps) => {
  return (
    <div style={styles.container}>
      <FaCalendarAlt style={styles.icon} />
      <DatePicker
        selected={props.selectedDate}
        onChange={(date: any) => props.setSelectedDate(date)}
        dateFormat="yy.MM.dd" // 원하는 날짜 포맷
        customInput={<CustomInput />}
      />
    </div>
  );
};

// Custom Input Component
const CustomInput = React.forwardRef(({ value, onClick }: any, ref: any) => (
  <div style={styles.customInput} onClick={onClick} ref={ref}>
    {value}
  </div>
));

const styles = {
  container: {
    height: "48px",
    display: "flex",
    alignItems: "center",
    border: "1px solid #d1d1d1",
    borderRadius: "4px",
    fontFamily: "Arial, sans-serif",
    fontSize: "14px",
    width: "50%",
    cursor: "pointer",
    paddingLeft: "8px",
  },
  icon: {
    color: "#B1B2B6",
    fontSize: "20px",
  },
  customInput: {
    flex: 1,
    color: "#282930",
    background: "transparent",
    border: "none",
    outline: "none",
    cursor: "pointer",
    fontSize: "14px",
    paddingLeft: "4px",
  },
};

export default CustomDatePicker;
