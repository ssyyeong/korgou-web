import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import OriginButton from "../../../../components/Button/OriginButton";
import { useTranslation } from "react-i18next";
import Header from "../../../../components/Header/Header";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

const Type = () => {
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
      <Header title="GOU IT" />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          p: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 600,
            textAlign: "center",
            mb: 2,
            mt: "140px",
          }}
        >
          주문서 유형을 선택하세요!
        </Typography>

        <OriginButton
          fullWidth
          variant="outlined"
          onClick={() => {
            navigate("/buying/transfer_money");
          }}
          contents={
            <Typography fontSize={16} fontWeight={500} color={"primary"}>
              Transfer money to seller
            </Typography>
          }
        />

        <OriginButton
          fullWidth
          variant="contained"
          onClick={() => {
            navigate("/buying/create");
          }}
          contents={
            <Box display="flex" justifyContent="center" alignItems="center">
              <CheckOutlinedIcon sx={{ color: "white", mr: 1 }} />
              <Typography fontSize={16} fontWeight={500} color="white">
                쇼핑몰 URL
              </Typography>
            </Box>
          }
        />
      </Box>
    </Box>
  );
};

export default Type;
