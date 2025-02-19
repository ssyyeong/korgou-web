import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Divider, Paper } from "@mui/material";
import Header from "../../components/Header/Header";
import OriginButton from "../../components/Button/OriginButton";
import CustomDatePicker from "../../components/CustomDatePicker";
import Input from "../../components/Input";
import DropDown from "../../components/Dropdown";
import { useAppMember } from "../../hooks/useAppMember";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Store = () => {
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [filter, setFilter] = useState("전체");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/sign_in");
    }
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (item: string) => {
    setAnchorEl(null);
    if (item) setFilter(item);
  };

  const monthBtn = (month: string) => {
    return (
      <Button
        variant="outlined"
        sx={{
          color: "#61636C",
          border: "1px solid #B1B2B6",
          borderRadius: "4px",
        }}
      >
        {month}
      </Button>
    );
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
      <Header title="창고 현황" back={false} />

      {/* Section Title */}
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: "20px",
          mb: "10px",
        }}
      >
        도착완료 물건
      </Typography>

      {/* Date Range Selection */}
      <Box sx={{ display: "flex", gap: 1, flexDirection: "row", mb: "10px" }}>
        {monthBtn("1개월")}
        {monthBtn("3개월")}
        {monthBtn("6개월")}
      </Box>

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
          물건 상태
        </Typography>
        <DropDown
          value={filter}
          handleClick={handleClick}
          anchorEl={anchorEl}
          handleClose={handleClose}
          items={["전체", "미입고", "입고완료", "반품"]}
        />
      </Box>

      <Divider
        sx={{
          color: "#ECECED",
          borderWidth: "1px",
          my: "10px",
          position: "relative",
          width: "calc(100% + 30px)",
          left: -15,
        }}
      />

      {/* Item List */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <Input
          type="checkbox"
          value={isAllChecked}
          setValue={() => {
            setIsAllChecked(!isAllChecked);
          }}
          label={"전체 선택"}
          style={{ fontSize: "14px", color: "#282930" }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "calc(100% + 30px)",
              left: -15,
              backgroundColor: "#F5F6F8",
              position: "relative",
            }}
          >
            <Typography sx={{ fontSize: "12px", pl: "16px", py: "8px" }}>
              24.05.01(토)
            </Typography>
          </Box>
          <Paper
            elevation={0}
            sx={{
              pt: "10px",
              pb: "8px",
            }}
          >
            <Input
              type="checkbox"
              value={isAllChecked}
              setValue={() => {
                setIsAllChecked(!isAllChecked);
              }}
              label={"입고번호 012345"}
              style={{ fontSize: "12px", color: "#61636C" }}
            />

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <img src={"/images/store/store.svg"} alt="item" />
              <Box sx={{ flexGrow: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    mb: "5px",
                  }}
                >
                  <img src={"/images/store/box.svg"} alt="item" />
                  <Typography
                    sx={{
                      color: "#61636C",
                      fontSize: "12px",
                    }}
                  >
                    {" "}
                    012345
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  [해외배송] 셀퓨전시 선크림
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 0.5,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#282930",
                      }}
                    >
                      무게(g)
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#EB1F81",
                        fontWeight: "bold",
                      }}
                    >
                      1,230
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    D-180
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
          <Divider
            sx={{
              color: "#ECECED",
              borderWidth: "1px",
              my: "8px",
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          bottom: "48px",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1,
          }}
        >
          <OriginButton
            variant="outlined"
            onClick={() => {}}
            contents={
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 0.5,
                }}
              >
                <Typography fontSize={16} fontWeight={700} color="#61636C">
                  포토 서비스
                </Typography>
                <img src={"/images/icon/camera.svg"} alt="camera" />
              </Box>
            }
            style={{ marginTop: "32px", width: "160px" }}
          />
          <OriginButton
            fullWidth
            variant="contained"
            color="#2E2F37"
            onClick={() => {}}
            contents={
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 0.5,
                }}
              >
                <Typography fontSize={16} fontWeight={700} color="#ffffff">
                  디스포절
                </Typography>
                <img src={"/images/icon/dispose.svg"} alt="dispose" />
              </Box>
            }
            style={{ marginTop: "32px", width: "160px" }}
          />
        </Box>
        <OriginButton
          variant="contained"
          onClick={() => {}}
          contents={
            <Typography fontSize={16} fontWeight={700} color="white">
              배송 요청{" "}
            </Typography>
          }
          style={{ marginTop: "16px", width: "328px" }}
        />
      </Box>
    </Box>
  );
};

export default Store;
