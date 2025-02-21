import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import Header from "../../../components/Header/Header";
import OriginButton from "../../../components/Button/OriginButton";
import TextFieldCustom from "../../../components/TextField";

const Setting = () => {
  const [isPush, setIsPush] = useState(false);
  const [isAlarm, setIsAlarm] = useState(false);

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
      <Header title="앱 설정" />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "16px",
        }}
      >
        <Typography
          sx={{
            fontSize: "14px",
            mb: "4px",
          }}
        >
          간편 로그인 연동
        </Typography>
        <TextFieldCustom
          fullWidth
          value={"kim@gmail.com"}
          type="outlined"
          sx={{
            mb: "10px",
          }}
          placeholder="쇼핑몰 url"
          onChange={() => {}}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Avatar
              src="/images/logo/apple.svg"
              sx={{ width: 45, height: 48 }}
            />
            <Typography
              sx={{
                fontSize: "14px",
              }}
            >
              애플
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Avatar
              src="/images/logo/google.svg"
              sx={{ width: 35, height: 40 }}
            />
            <Typography
              sx={{
                fontSize: "14px",
              }}
            >
              구글
            </Typography>
          </Box>
          <OriginButton
            variant="outlined"
            onClick={() => {}}
            contents={
              <Typography fontSize={14} color="#2E2F37">
                연동하기
              </Typography>
            }
            style={{
              py: "16px",
              height: "32px",
              border: "1px solid #2E2F37",
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            my: "40px",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#282930",
            }}
          >
            알림 설정
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              mb: "10px",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                color: "#282930",
                fontWeight: 700,
              }}
            >
              푸시 알림
            </Typography>
            <ToggleButtonGroup
              value={isPush}
              exclusive
              onChange={() => setIsPush(!isPush)}
              aria-label="text alignment"
              style={{
                width: "50%",
              }}
            >
              <ToggleButton
                style={{
                  width: "80px",
                  height: "32px",
                  backgroundColor: isPush ? "#282930" : "white",
                  color: isPush ? "white" : "#282930",
                }}
                value={true}
              >
                ON
              </ToggleButton>
              <ToggleButton
                style={{
                  width: "80px",
                  height: "32px",
                  backgroundColor: !isPush ? "#282930" : "white",
                  color: !isPush ? "white" : "#282930",
                }}
                value={false}
              >
                OFF
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
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
                color: "#282930",
                fontWeight: 700,
              }}
            >
              알림톡
            </Typography>
            <ToggleButtonGroup
              value={isAlarm}
              exclusive
              onChange={() => setIsAlarm(!isAlarm)}
              aria-label="text alignment"
              style={{
                width: "50%",
              }}
            >
              <ToggleButton
                style={{
                  width: "80px",
                  height: "32px",
                  backgroundColor: isAlarm ? "#282930" : "white",
                  color: isAlarm ? "white" : "#282930",
                }}
                value={true}
              >
                ON
              </ToggleButton>
              <ToggleButton
                style={{
                  width: "80px",
                  height: "32px",
                  backgroundColor: !isAlarm ? "#282930" : "white",
                  color: !isAlarm ? "white" : "#282930",
                }}
                value={false}
              >
                OFF
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 700,
              color: "#282930",
            }}
          >
            버전 정보
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#282930",
            }}
          >
            1.0 V
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Setting;
