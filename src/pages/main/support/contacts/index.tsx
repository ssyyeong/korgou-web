import React, { useState } from "react";

import { Box, Divider, Typography } from "@mui/material";

import Header from "../../../../components/Header/Header";
import TextFieldCustom from "../../../../components/TextField";
import Input from "../../../../components/Input";
import AccordianBox from "../../../../components/AccordianBox/AccordianBox";
import OriginButton from "../../../../components/Button/OriginButton";
import { useTranslation } from "react-i18next";
const Contacts = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [suiteNumber, setSuitNumber] = useState("");
  const [category, setCategory] = useState("");

  const textStyle = {
    fontSize: "14px",
    fontWeight: 700,
    mb: "8px",
  };

  const essential = (
    <Typography
      sx={{
        fontSize: "14px",
        fontWeight: 700,
        mb: "8px",
        color: "#EB1F81",
      }}
    >
      *
    </Typography>
  );

  const categoryList = [{ value: " ", label: "" }];

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        flexDirection: "column",
        mb: "48px",
      }}
    >
      <Header />
      <Typography
        sx={{
          fontSize: "16px",
          color: "#282930",
          marginBottom: "24px",
        }}
      >
        {t("contact_us.description")}
      </Typography>
      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: 700,
          color: "#282930",
        }}
      >
        Phone support
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Typography
          sx={{
            fontSize: "16px",
            color: "#282930",
          }}
        >
          English:&nbsp;
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            color: "#007AFF",
            textDecorationLine: "underline",
          }}
          onClick={() => {
            window.location.href = "tel:+82-70-4408-7580";
          }}
        >
          +82-70-4408-7580
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Typography
          sx={{
            fontSize: "16px",
            color: "#282930",
          }}
        >
          Korean:&nbsp;
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            color: "#007AFF",
            marginBottom: "24px",
            textDecorationLine: "underline",
          }}
          onClick={() => {
            window.location.href = "tel:+82-70-4250-0440";
          }}
        >
          +82-70-4250-0440
        </Typography>
      </Box>
      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: 700,
          color: "#282930",
        }}
      >
        Email support
      </Typography>
      <Typography
        sx={{
          fontSize: "16px",
          color: "#007AFF",
          marginBottom: "24px",
          textDecorationLine: "underline",
        }}
        onClick={() => {
          window.location.href = "mailto:contact@korgou.com";
        }}
      >
        contact@korgou.com
      </Typography>
      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: 700,
          color: "#282930",
        }}
      >
        office location <br /> #811, 48 ,centum jungang-ro, haeundae-gu, busan,
        south korea
      </Typography>
      <Typography
        sx={{
          fontSize: "16px",
          color: "#282930",
          mb: "5px",
        }}
      >
        #811, 48 ,centum jungang-ro, haeundae-gu, busan, south korea
      </Typography>
      <img src="/images/main/map.svg" alt="map" style={{}} />

      <Divider
        sx={{
          color: "#ECECED",
          borderWidth: "8px",
          my: "40px",
          position: "relative",
          width: "calc(100% + 15px)",
          left: -15,
        }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Typography
          sx={{
            fontSize: "20px",
            color: "#282930",
            fontWeight: 700,
          }}
        >
          Korgou Support
        </Typography>
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
              gap: "1px",
            }}
          >
            <Typography sx={textStyle}>{t("contact_us.email")}</Typography>
            {essential}
          </Box>
          <TextFieldCustom
            fullWidth
            value={email}
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder=""
          />
        </Box>
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
              gap: "1px",
            }}
          >
            <Typography sx={textStyle}>{t("contact_us.subject")}</Typography>
            {essential}
          </Box>
          <TextFieldCustom
            fullWidth
            value={subject}
            type="Subject"
            onChange={(e) => {
              setSubject(e.target.value);
            }}
            placeholder=""
          />
        </Box>
        <TextFieldCustom
          fullWidth
          value={subject}
          type="Subject"
          multiline
          onChange={(e) => {
            setSubject(e.target.value);
          }}
          placeholder=""
          rows={5}
          sx={{
            "& .MuiInputBase-root": { height: "160px" },
          }}
        />
      </Box>
      <Divider
        sx={{
          color: "#ECECED",
          borderWidth: "8px",
          my: "40px",
          position: "relative",
          width: "calc(100% + 15px)",
          left: -15,
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
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
              gap: "1px",
            }}
          >
            <Typography sx={textStyle}>{t("contact_us.number")}</Typography>
          </Box>
          <TextFieldCustom
            fullWidth
            value={suiteNumber}
            type="SuiteNumber"
            onChange={(e) => {
              setSuitNumber(e.target.value);
            }}
            placeholder=""
          />
        </Box>
      </Box>
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
            gap: "1px",
          }}
        >
          <Typography sx={textStyle}>{t("contact_us.category")}</Typography>
          {essential}
        </Box>
        <Input
          dataList={categoryList}
          value={category}
          setValue={setCategory}
          type="select"
          style={{ mb: "20px", maxHeight: "48px" }}
        />
      </Box>
      <Divider
        sx={{
          color: "#ECECED",
          borderWidth: "8px",
          my: "40px",
          position: "relative",
          width: "calc(100% + 15px)",
          left: -15,
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <AccordianBox
          title={
            <Input
              type="checkbox"
              value={true}
              setValue={() => {}}
              label={t("terms.all")}
              style={{ fontSize: "16px" }}
            />
          }
          constents={null}
        />
        <OriginButton
          fullWidth
          variant="contained"
          onClick={() => {}}
          contents={
            <Typography fontSize={16} fontWeight={700} color="#ffffff">
              {t("common.button.order_request")}
            </Typography>
          }
          style={{ width: "328px" }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
