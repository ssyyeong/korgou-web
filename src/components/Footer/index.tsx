import React from "react";
import { Box, Typography, Button } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        backgroundColor: "#F8FAFC",
        padding: "40px 16px",
        gap: "40px",
        pb: "40px",
      }}
    >
      {/* Company Info - Top Center */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src="/images/logo/logo.svg"
          alt="logo"
          style={{
            marginBottom: "14px",
          }}
        />
        <Typography
          sx={{
            fontSize: "10px",
            color: "#41434E",
            lineHeight: "130%",
            textAlign: "center",
          }}
        >
          사업자등록번호 : 823-87-01612
          <br />
          통신판매 신고번호 : 제 2019-성남중원-0664호
          <br />
        </Typography>
        <Typography
          sx={{
            fontSize: "12px",
            color: "#41434E",
            lineHeight: "130%",
            textAlign: "center",
            fontWeight: 500,
            mt: "3px",
          }}
        >
          Byunghun Kim
        </Typography>
      </Box>

      {/* Bottom Grid - 2x2 Layout */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
          width: "100%",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        {/* Left Column - Top */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "4px",
          }}
        >
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 500,
              color: "#41434E",
              lineHeight: "130%",
              textDecoration: "underline",
            }}
          >
            Quick Links
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Button
              sx={{
                fontSize: "10px",
                fontWeight: 400,
                color: "#767676",
                textTransform: "none",
                padding: "0",
                justifyContent: "flex-start",
                minWidth: "auto",
              }}
              onClick={() => {
                window.location.href = "/about";
              }}
            >
              About US
            </Button>
            <Button
              sx={{
                fontSize: "10px",
                fontWeight: 400,
                color: "#767676",
                textTransform: "none",
                padding: "0",
                justifyContent: "flex-start",
                minWidth: "auto",
              }}
              onClick={() => {
                window.location.href = "/terms";
              }}
            >
              Terms Of Service
            </Button>
            <Button
              sx={{
                fontSize: "10px",
                fontWeight: 400,
                color: "#767676",
                textTransform: "none",
                padding: "0",
                justifyContent: "flex-start",
                minWidth: "auto",
              }}
              onClick={() => {
                window.location.href = "/privacy";
              }}
            >
              Privacy Policy
            </Button>
          </Box>
        </Box>

        {/* Right Column - Top */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "4px",
          }}
        >
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 500,
              color: "#41434E",
              lineHeight: "130%",
            }}
          >
            Contact
          </Typography>
          <Typography
            sx={{
              fontSize: "10px",
              fontWeight: 400,
              color: "#767676",
              lineHeight: "130%",
            }}
          >
            EN: +82-70-4408-7580
            <br />
            KR: +82-70-4250-0440
            <br />
            Email: contact@korgou.com
          </Typography>
        </Box>

        {/* Left Column - Bottom */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "4px",
          }}
        >
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 500,
              color: "#41434E",
              lineHeight: "130%",
            }}
          >
            Address
          </Typography>
          <Typography
            sx={{
              fontSize: "10px",
              fontWeight: 400,
              color: "#767676",
              lineHeight: "130%",
            }}
          >
            79, Sunhwan-ro, Jungwon-gu,
            <br />
            Seongnam-si,
            <br />
            Gyeonggi-do, Republic of Korea
          </Typography>
        </Box>

        {/* Right Column - Bottom */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "4px",
          }}
        >
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 500,
              color: "#41434E",
              lineHeight: "130%",
            }}
          >
            Working Hours
          </Typography>
          <Typography
            sx={{
              fontSize: "10px",
              fontWeight: 400,
              color: "#767676",
              lineHeight: "130%",
            }}
          >
            mon-fri 10:00-17:00 (KST)
            <br />
            day off: sat, sun & national holiday
          </Typography>
        </Box>
      </Box>
      <img src="/images/main/payments.svg" alt="payments" />
    </Box>
  );
};

export default Footer;
