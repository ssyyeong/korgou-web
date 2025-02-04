import { Box, Button, Divider, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import OriginButton from "../../../components/Button/OriginButton";
import Header from "../../../components/Header/Header";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { useNavigate } from "react-router-dom";
import DropDown from "../../../components/Dropdown";
import CustomDatePicker from "../../../components/CustomDatePicker";

const Purchase = () => {
  const navigate = useNavigate();

  const [tab, setTab] = React.useState(0);
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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const TabPanel = (props: any) => {
    const { children, value, index, ...other } = props;

    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== tab}
        {...other}
      >
        {value === tab && <Box>{children}</Box>}
      </Typography>
    );
  };

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
        width: "100%",
        height: "100%",
        flexDirection: "column",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Header title="구매 현황" />
      <Tabs
        value={tab}
        onChange={handleChange}
        aria-label="Second Tabs"
        centered
        variant="fullWidth"
        sx={{
          position: "relative",
          width: "360px",
          "& .MuiTabs-indicator": {
            backgroundColor: "#282930",
            height: 2,
          },
          "& .MuiTab-root.Mui-selected": {
            color: "#282930",
          },
          borderBottom: "1px solid #919298", // 탭 아래쪽 보더 설정
        }}
      >
        <Tab label="SHOP" />
        <Tab label="Buying it" />
      </Tabs>

      <TabPanel value={0} width="100%">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Box
            sx={{ display: "flex", gap: 1, flexDirection: "row", my: "10px" }}
          >
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
            <CustomDatePicker
              selectedDate={endDate}
              setSelectedDate={setEndDate}
            />
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
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontSize: "12px",
              }}
            >
              구매대행 상태
            </Typography>
            <DropDown
              value={filter}
              handleClick={handleClick}
              anchorEl={anchorEl}
              handleClose={handleClose}
              items={["전체", "미입고", "입고완료", "반품"]}
            />
          </Box>
          <Typography
            sx={{
              fontSize: "14px",
            }}
          >
            1개
          </Typography>
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
                color: "#919298",
              }}
            >
              ID 1013213156412313
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                color: "#919298",
              }}
            >
              07.13(목) {">"}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              justifyContent: "space-between",
              cursor: "pointer",
              mb: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <img
                  src="/images/main/product.svg"
                  alt="review"
                  style={{ width: "70px", height: "70px" }}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    mt: "8px",
                    cursor: "pointer",
                  }}
                  onClick={() => {}}
                >
                  <Typography
                    sx={{ fontSize: "16px", color: "#282930", fontWeight: 700 }}
                  >
                    브랜드명 {">"}
                  </Typography>
                  <Typography sx={{ fontSize: "12px", color: "#61636C" }}>
                    상품명1234
                  </Typography>
                </Box>
              </Box>
              <Typography
                sx={{
                  width: "100px",
                  fontSize: "14px",
                  color: "#3966AE",
                  fontWeight: 700,
                }}
              >
                확인 대기중
              </Typography>
            </Box>
          </Box>
          <Divider
            sx={{
              color: "#ECECED",
              position: "relative",
              width: "calc(100% + 30px)",
              left: -15,
            }}
          />
        </Box>
      </TabPanel>
      <TabPanel value={1} width="100%">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Box
            sx={{ display: "flex", gap: 1, flexDirection: "row", my: "10px" }}
          >
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
            <CustomDatePicker
              selectedDate={endDate}
              setSelectedDate={setEndDate}
            />
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
              구매대행 상태
            </Typography>
            <DropDown
              value={filter}
              handleClick={handleClick}
              anchorEl={anchorEl}
              handleClose={handleClose}
              items={["전체", "미입고", "입고완료", "반품"]}
            />
          </Box>
          <Typography
            sx={{
              fontSize: "14px",
            }}
          >
            1개
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: "10px",
            }}
          >
            <Typography
              sx={{
                fontSize: "12px",
                color: "#919298",
              }}
            >
              ID 1013213156412313
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                color: "#919298",
              }}
            >
              07.13(목) {">"}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              justifyContent: "space-between",
              cursor: "pointer",
              mb: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    mt: "8px",
                    cursor: "pointer",
                  }}
                  onClick={() => {}}
                >
                  <Typography sx={{ fontSize: "14px", color: "#282930" }}>
                    [해외배송]셀퓨전시 선크림
                  </Typography>
                  <Typography sx={{ fontSize: "12px", color: "#919298" }}>
                    상세 옵션
                  </Typography>
                  <Typography sx={{ fontSize: "14px", color: "#282930" }}>
                    26,400
                  </Typography>
                </Box>
              </Box>
              <Typography
                sx={{
                  width: "100px",
                  fontSize: "14px",
                  color: "#3966AE",
                  fontWeight: 700,
                }}
              >
                결제 대기중
              </Typography>
            </Box>
          </Box>
          <Divider
            sx={{
              color: "#ECECED",
              position: "relative",
              width: "calc(100% + 30px)",
              left: -15,
            }}
          />
        </Box>
      </TabPanel>
    </Box>
  );
};
export default Purchase;
