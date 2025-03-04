import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Header from "../../../components/Header/Header";
import OriginButton from "../../../components/Button/OriginButton";
import Input from "../../../components/Input";
import TextFieldCustom from "../../../components/TextField";
import AlertModal from "../../../components/Modal/AlertModal";
import { useTranslation } from "react-i18next";
const Package = () => {
  const { t } = useTranslation();
  const [courier, setCourier] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

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
      <Header title="" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "16px",
          mt: "100px",
          mb: "32px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          fontSize={16}
          fontWeight={700}
          sx={{
            fontSize: "24px",
            mb: "10px",
            fontWeight: 700,
          }}
        >
          {t("unidentified_package.title")}
        </Typography>
        <Typography
          fontSize={16}
          fontWeight={700}
          sx={{
            fontSize: "14px",
            color: "#61636C",
          }}
        >
          {t("unidentified_package.description")}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          px: "16px",
          py: "20px",
          bgcolor: "#F5F5F5",
        }}
      >
        <Typography
          fontSize={16}
          fontWeight={700}
          sx={{
            fontSize: "14px",
            color: "#2E2F37",
            fontWeight: 700,
            mb: "8px",
          }}
        >
          {t("unidentified_package.delivery_company")}
        </Typography>
        <Input
          dataList={[
            { value: "1", label: "DHL" },
            { value: "4", label: "USPS" },
          ]}
          value={courier}
          setValue={setCourier}
          type="select"
          style={{ mb: "20px", maxHeight: "48px" }}
        />
        <Typography
          fontSize={14}
          fontWeight={700}
          sx={{
            fontSize: "14px",
            mb: "8px",
          }}
        >
          {t("unidentified_package.tracking_number")}
        </Typography>
        <TextFieldCustom
          fullWidth
          value={trackingNumber}
          type="shoppingMallUrl"
          sx={{
            mb: "10px",
          }}
          onChange={(e) => {
            setTrackingNumber(e.target.value);
          }}
          placeholder={t("unidentified_package.tracking_number_description")}
        />
      </Box>
      <OriginButton
        fullWidth
        variant="contained"
        color="primary"
        onClick={() => {}}
        contents={
          <Typography fontSize={16} fontWeight={700}>
            {t("common.button.search")}
          </Typography>
        }
        style={{ marginTop: "16px", padding: "16px 8px", height: "48px" }}
      />
      <AlertModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        contents={
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              gap: "10px",
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                color: "#282930",
                fontWeight: 700,
              }}
            >
              안내
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#61636C",
              }}
            >
              조회되는 미확인 패키지가 없습니다.
            </Typography>
          </Box>
        }
        button1={{
          text: "확인",
          onClick: () => {
            setModalOpen(false);
          },
          color: "#282930",
        }}
      />
    </Box>
  );
};

export default Package;
