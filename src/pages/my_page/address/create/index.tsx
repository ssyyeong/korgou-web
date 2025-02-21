import React, { useState } from "react";
import { Box, Typography, Button, Grid2 } from "@mui/material";
import Header from "../../../../components/Header/Header";
import OriginButton from "../../../../components/Button/OriginButton";
import { useNavigate } from "react-router-dom";
import Input from "../../../../components/Input";
import { countryList } from "../../../../configs/data/CountryConfig";
import { countryNumberList } from "../../../../configs/data/CountryNumberConfig";
import ControllerAbstractBase from "../../../../controller/Controller";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddressCreate = () => {
  const navigator = useNavigate();
  const method = ["DHL", "FEDEX", "EMS", "기타"];

  const [shippingType, setShippingType] = useState("FOREIGN");
  const [country, setCountry] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [countryNumber, setCountryNumber] = useState("");
  const [contact, setContact] = useState("");
  const [addressMethod, setAddressMethod] = useState("DHL");

  const save = async () => {
    const appMemberId = await localStorage.getItem(
      "APP_MEMBER_IDENTIFICATION_CODE"
    );
    const controller = new ControllerAbstractBase({
      modelName: "Address",
      modelId: "address",
    });

    if (
      country === "" ||
      firstName === "" ||
      lastName === "" ||
      address === "" ||
      detailAddress === "" ||
      province === "" ||
      city === "" ||
      postalCode === "" ||
      countryNumber === "" ||
      contact === "" ||
      addressMethod === ""
    ) {
      toast.error("모든 항목을 입력해주세요.", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
      });
      return;
    }

    controller
      .create({
        APP_MEMBER_IDENTIFICATION_CODE: appMemberId,
        SHIPPING_TYPE: shippingType,
        COUNTRY: country,
        FIRST_NAME: firstName,
        LAST_NAME: lastName,
        ADDRESS: address,
        DETAILED_ADDRESS: detailAddress,
        PROVINCE: province,
        CITY: city,
        POSTAL_CODE: postalCode,
        COUNTRY_NUMBER: countryNumber,
        CONTACT: contact,
        ADDRESS_METHOD: addressMethod,
      })
      .then((res) => {
        navigator("/my_page/address");
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        flexDirection: "column",
        backgroundColor: "white",
        mb: "40px",
      }}
    >
      <Header title="배송지 추가" />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          py: "20px",
          gap: "40px",
        }}
      >
        {/* 배송 유형 */}
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          width="100%"
        >
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 700,
              mb: "8px",
            }}
          >
            배송 유형
          </Typography>
          <Box display="flex" flexDirection="row" width="100%" gap="8px">
            <OriginButton
              fullWidth
              variant={shippingType === "FOREIGN" ? "contained" : "outlined"}
              color={shippingType === "FOREIGN" ? "#282930" : "white"}
              onClick={() => {
                setShippingType("FOREIGN");
              }}
              contents={
                <Typography
                  fontSize={16}
                  fontWeight={700}
                  color={shippingType === "FOREIGN" ? "white" : "#282930"}
                >
                  해외 배송
                </Typography>
              }
              style={{ padding: "8px 16px", height: "48px" }}
            />
            <OriginButton
              fullWidth
              variant={shippingType === "DOMESTIC" ? "contained" : "outlined"}
              color={shippingType === "DOMESTIC" ? "#282930" : "white"}
              onClick={() => {
                setShippingType("DOMESTIC");
              }}
              contents={
                <Typography
                  fontSize={16}
                  fontWeight={700}
                  color={shippingType === "DOMESTIC" ? "white" : "#282930"}
                >
                  국내 배송
                </Typography>
              }
              style={{
                padding: "8px 16px",
                height: "48px",
                borderColor: "#B1B2B6",
              }}
            />
          </Box>
        </Box>

        {/* 주소 정보 */}
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          width="100%"
          gap="10px"
        >
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 700,
            }}
          >
            주소 정보
          </Typography>
          <Input
            label="국가"
            dataList={countryList}
            value={country}
            setValue={setCountry}
            type="select"
            style={{ maxHeight: "48px" }}
          />
          <Box display="flex" flexDirection="row" width="100%" gap="8px">
            <Input
              label="성(영문)"
              value={firstName}
              setValue={setFirstName}
              type="text"
              style={{ maxHeight: "48px" }}
            />
            <Input
              label="이름(영문)"
              value={lastName}
              setValue={setLastName}
              type="text"
              style={{ maxHeight: "48px" }}
            />
          </Box>
          <Input
            label="주소"
            value={address}
            setValue={setAddress}
            type="text"
            style={{ maxHeight: "48px" }}
          />
          <Box display="flex" flexDirection="row" width="100%" gap="8px">
            <Input
              label="상세주소"
              value={detailAddress}
              setValue={setDetailAddress}
              type="text"
              style={{ maxHeight: "48px" }}
            />
            <Input
              label="주(Province)"
              value={province}
              setValue={setProvince}
              type="text"
              style={{ maxHeight: "48px" }}
            />
          </Box>
          <Input
            label="도시(City)"
            value={city}
            setValue={setCity}
            type="text"
            style={{ maxHeight: "48px" }}
          />
          <Input
            label="우편번호 (Postal Code)"
            value={postalCode}
            setValue={setPostalCode}
            type="text"
            style={{ maxHeight: "48px" }}
          />
          <Box display="flex" flexDirection="row" width="100%" gap="8px">
            <Input
              label="-"
              dataList={countryNumberList}
              value={countryNumber}
              setValue={setCountryNumber}
              type="select"
              style={{ maxHeight: "48px", width: "100px" }}
            />
            <Input
              label="-제외 입력"
              value={contact}
              setValue={setContact}
              type="text"
              style={{ maxHeight: "48px", width: "220px" }}
            />
          </Box>
        </Box>
        {/* 배송 수단 */}
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          width="100%"
          gap="10px"
        >
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 700,
            }}
          >
            배송 수단
          </Typography>
          <Grid2
            container
            spacing={2}
            sx={{
              gap: "8px",
            }}
          >
            {method.map((item, index) => (
              <Grid2 size={6} key={index}>
                <Button
                  fullWidth
                  variant={addressMethod === item ? "contained" : "outlined"}
                  onClick={() => {
                    setAddressMethod(item);
                  }}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "1px",
                    borderColor: addressMethod === item ? "#282930" : "61636C",
                    backgroundColor:
                      addressMethod === item ? "#282930" : "white",
                  }}
                >
                  <Typography
                    fontSize={16}
                    fontWeight={700}
                    sx={{
                      color: addressMethod === item ? "white" : "#61636C",
                    }}
                  >
                    {item}
                  </Typography>
                </Button>
              </Grid2>
            ))}
          </Grid2>
        </Box>

        <OriginButton
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => {
            save();
          }}
          contents={
            <Typography fontSize={16} fontWeight={700}>
              저장
            </Typography>
          }
          style={{ padding: "16px 8px", height: "48px" }}
        />
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default AddressCreate;
