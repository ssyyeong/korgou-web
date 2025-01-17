import { Box, Divider, Typography } from "@mui/material";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";

import Header from "../../../../../components/Header/Header";
import OriginButton from "../../../../../components/Button/OriginButton";
import { useNavigate } from "react-router-dom";

const NoticeDetail = () => {
  const navigate = useNavigate();

  const list = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
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

      <Divider
        sx={{
          color: "#ECECED",
          position: "relative",
          width: "calc(100% + 30px)",
          left: -15,
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 700,
            color: "#282930",
            my: "16px",
          }}
        >
          이벤트 혜택 확대 및 상품약관 계정 안내
        </Typography>
        <Divider
          sx={{
            color: "#ECECED",
            position: "relative",
            width: "calc(100% + 30px)",
            left: -15,
            mb: "20px",
          }}
        />
        <Typography
          sx={{
            fontSize: "14px",
            color: "#282930",
          }}
        >
          공지사항 내용
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            mt: "16px",
            mb: "20px",
          }}
        >
          <Typography
            sx={{
              fontSize: "12px",
              color: "#282930",
            }}
          >
            2022-03-02 16:50
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              color: "#61636C",
            }}
          >
            KORGOU운영팀
          </Typography>
        </Box>
        <Divider
          sx={{
            color: "#ECECED",
            position: "relative",
            width: "calc(100% + 30px)",
            left: -15,
            mb: "20px",
          }}
        />
      </Box>
      <OriginButton
        variant="contained"
        color="#282930"
        onClick={() => {
          navigate(-1);
        }}
        contents={
          <Typography fontSize={14} fontWeight={700} color="white">
            목록
          </Typography>
        }
        style={{
          marginTop: "32px",
          height: "40px",
          width: "160px",
          borderRadius: 0,
          alignSelf: "center",
        }}
      />
    </Box>
  );
};

export default NoticeDetail;
