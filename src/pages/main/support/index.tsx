import { Box, Typography, Divider } from "@mui/material";
import Header from "../../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Phone, Email, VolumeUp, QuestionAnswer } from "@mui/icons-material";

const Support = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header title="고객 센터" />

      {/* 메인 타이틀 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: "38px",
          px: "8px",
        }}
      >
        <Typography
          sx={{
            fontSize: "28px",
            fontWeight: 700,
            color: "#282930",
            mb: "23px",
          }}
        >
          고객 센터
        </Typography>

        {/* 운영시간 */}
        <Typography
          sx={{
            fontSize: "14px",
            color: "#6D6D6D",
            lineHeight: "130%",
            mb: "23px",
          }}
        >
          Monday - Friday : 10:00 ~ 17:00
          <br />
          in Korean standard time Saturday,
          <br />
          Sunday & National Holiday : Day off
        </Typography>

        {/* 연락처 버튼들 */}
        <Box
          sx={{
            borderRadius: "20px",
            background: "linear-gradient(180deg, #4B70BF 0%, #2F5096 100%)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: "34px",
            px: "10px",
            py: "17px",
          }}
        >
          {/* English Phone */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flex: 1,
              position: "relative",
              cursor: "pointer",
            }}
            onClick={() => {
              window.open("tel:+82-70-4408-7580", "_blank");
            }}
          >
            <img src="/images/icon/support/eng.svg" alt="eng" />
          </Box>

          {/* 구분선 */}
          <Box
            sx={{
              width: "1px",
              height: "60px",
              backgroundColor: "white",
              opacity: 0.3,
            }}
          />

          {/* Korean Phone */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flex: 1,
            }}
            onClick={() => {
              window.open("tel:+82-70-4250-0440", "_blank");
            }}
          >
            <img src="/images/icon/support/kor.svg" alt="kor" />
          </Box>

          {/* 구분선 */}
          <Box
            sx={{
              width: "1px",
              height: "60px",
              backgroundColor: "white",
              opacity: 0.3,
            }}
          />

          {/* English Email */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flex: 1,
              cursor: "pointer",
            }}
            onClick={() => {
              window.open("mailto:contact@korgou.com", "_blank");
            }}
          >
            <img src="/images/icon/support/email.svg" alt="email" />
          </Box>
        </Box>

        {/* 구분선 */}
        <Divider
          sx={{
            color: "#ECECED",
            borderWidth: "5px",
            position: "relative",
            width: "calc(100% + 38px)",
            left: -24,
          }}
        />
        {/* 지원 항목들 */}
        <Box sx={{ display: "flex", flexDirection: "column", pt: "10px" }}>
          {/* Notice */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "22px",
              cursor: "pointer",
              flexDirection: "row",
              py: "12px",

              borderBottom: "1px solid #ECECED",
            }}
            onClick={() => navigate("/support/notice")}
          >
            <img src="/images/icon/support/notice.svg" alt="notice" />
            <Typography
              sx={{
                fontSize: "14px",
                color: "#282930",
                fontWeight: 500,
              }}
            >
              Notice
            </Typography>
          </Box>

          {/* Q&A */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "22px",
              cursor: "pointer",
              flexDirection: "row",
              py: "12px",
              borderBottom: "1px solid #ECECED",
            }}
            onClick={() => navigate("/support/faq")}
          >
            <img src="/images/icon/support/qa.svg" alt="qa" />
            <Typography
              sx={{
                fontSize: "14px",
                color: "#282930",
                fontWeight: 500,
              }}
            >
              Q&A
            </Typography>
          </Box>

          {/* FAQ */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "22px",
              cursor: "pointer",
              flexDirection: "row",
              py: "12px",
              borderBottom: "1px solid #ECECED",
            }}
            onClick={() => navigate("/support/faq")}
          >
            <img src="/images/icon/support/faq.svg" alt="faq" />
            <Typography
              sx={{
                fontSize: "14px",
                color: "#282930",
                fontWeight: 500,
              }}
            >
              FAQ
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Support;
