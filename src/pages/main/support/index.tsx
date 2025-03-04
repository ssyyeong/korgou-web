import { Box, Typography } from "@mui/material";
import Header from "../../../components/Header/Header";
import OriginButton from "../../../components/Button/OriginButton";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Support = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <Header title={t("support.title")} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
        }}
      >
        <OriginButton
          variant="outlined"
          onClick={() => {
            navigate("/support/notice");
          }}
          contents={
            <Typography fontSize={16} fontWeight={700} color="#3966AE">
              {t("support.notice")}
            </Typography>
          }
          style={{ marginTop: "32px", width: "160px" }}
        />
        <OriginButton
          variant="outlined"
          onClick={() => {
            navigate("/support/faq");
          }}
          contents={
            <Typography fontSize={16} fontWeight={700} color="#3966AE">
              FAQ
            </Typography>
          }
          style={{ marginTop: "32px", width: "160px" }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#F5F5F5",
          padding: "20px 8px",
          justifyContent: "center",
          mt: "16px",
        }}
      >
        <Typography
          sx={{
            fontSize: "16px",
            color: "#282930",
          }}
        >
          고객센터 번호 정보
        </Typography>
      </Box>
    </Box>
  );
};

export default Support;
