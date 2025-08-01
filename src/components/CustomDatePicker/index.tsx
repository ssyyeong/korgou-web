import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Box } from "@mui/material";

interface ICustomDatePickerProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

const CustomDatePicker = (props: ICustomDatePickerProps) => {
  return (
    <Box sx={styles.container}>
      <img src="/images/icon/calendar.svg" alt="calendar" />
      <DatePicker
        selected={props.selectedDate}
        onChange={(date: any) => props.setSelectedDate(date)}
        dateFormat="yy.MM.dd" // 원하는 날짜 포맷
        customInput={<CustomInput />}
      />
    </Box>
  );
};

// Custom Input Component
const CustomInput = React.forwardRef(({ value, onClick }: any, ref: any) => (
  <Box style={styles.customInput} onClick={onClick} ref={ref}>
    {value}
  </Box>
));
const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #B1B2B6",
    borderRadius: "5px",
    fontSize: "14px",
    cursor: "pointer",
    justifyContent: "center",
    px: "2px",
    backgroundColor: "white",
    minWidth: "100px",
    minHeight: "40px",
  },
  customInput: {
    height: "100%", // 부모 컨테이너의 높이를 상속
    display: "flex", // 중앙 정렬을 위해 추가
    alignItems: "center", // 텍스트를 세로 중앙 정렬
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
