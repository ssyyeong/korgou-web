import { Box, Divider, Typography } from "@mui/material";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";

import Header from "../../../../components/Header/Header";
import { useNavigate } from "react-router-dom";

const Notice = () => {
  const navigate = useNavigate();

  const list = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
        }}
        onClick={() => {
          navigate("/support/notice/detail");
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: "16px",
          }}
        >
          <Typography
            sx={{
              fontSize: "10px",
              textAlign: "left",
            }}
          >
            2022-03-02
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
              }}
            >
              이벤트 혜택 확대 및 상품약관 개정 안내
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "4px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  backgroundColor: "#EB1F81",
                  padding: "4px 10px",
                  borderRadius: "4px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "white",
                  }}
                >
                  중요
                </Typography>
              </Box>
              <KeyboardArrowRightOutlinedIcon
                sx={{
                  color: "#B1B2B6",
                }}
              />
            </Box>
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
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <Header title="공지 사항" />
      <Typography
        sx={{
          fontSize: "12px",
          color: "#282930",
          my: "11px",
        }}
      >
        1개
      </Typography>
      <Divider
        sx={{
          color: "#ECECED",
          position: "relative",
          width: "calc(100% + 30px)",
          left: -15,
        }}
      />
      {list()}
    </Box>
  );
};

export default Notice;
