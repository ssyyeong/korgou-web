import React, { useState } from "react";
import { Box, Typography, Button, Divider } from "@mui/material";
import Header from "../../../components/Header/Header";
import OriginButton from "../../../components/Button/OriginButton";
import CustomDatePicker from "../../../components/CustomDatePicker";
import DropDown from "../../../components/Dropdown";

const Delivery = () => {
  const filterings = [
    { value: 0, label: "최근 1개월" },
    { value: 1, label: "최근 3개월" },
    { value: 2, label: "최근 6개월" },
  ];
  const [filter, setFilter] = useState("전체");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [filtering, setFiltering] = useState(0); //날짜 필터링

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (item: string) => {
    setAnchorEl(null);
    if (item) setFilter(item);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        flexDirection: "column",
        backgroundColor: "white",
      }}
    >
      <Header title="배송 신청 현황" />

      {/* 컴포넌트화 필요 */}
      <Box sx={{ display: "flex", gap: 1, flexDirection: "row", my: "10px" }}>
        {filterings.map((filter, index) => (
          <Button
            key={index}
            variant={filtering === index ? "contained" : "outlined"}
            sx={{
              color: filtering === index ? "white" : "#61636C",
              border: "1px solid #B1B2B6",
              borderRadius: "4px",
              backgroundColor: filtering === index ? "#282930" : "white",
              height: "32px",
            }}
            onClick={() => setFiltering(filter.value)}
          >
            {filter.label}
          </Button>
        ))}
      </Box>
      {/* 컴포넌트화 필요 */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <CustomDatePicker
          selectedDate={startDate}
          setSelectedDate={setStartDate}
        />
        ~
        <CustomDatePicker selectedDate={endDate} setSelectedDate={setEndDate} />
        <OriginButton
          fullWidth
          variant="contained"
          color="#2E2F37"
          onClick={() => {}}
          contents={
            <Typography fontSize={16} fontWeight={700} color="#ffffff">
              조회
            </Typography>
          }
          style={{
            marginTop: "0px",
            width: "100px",
            height: "40px",
            borderRadius: "4px",
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            fontSize: "12px",
          }}
        >
          배송 상태
        </Typography>
        {/* <DropDown
          value={filter}
          handleClick={handleClick}
          anchorEl={anchorEl}
          handleClose={handleClose}
          items={["전체", "미입고", "입고완료", "반품"]}
        /> */}
      </Box>
    </Box>
  );
};

export default Delivery;
