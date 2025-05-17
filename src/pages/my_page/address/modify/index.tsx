import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Grid2 } from "@mui/material";
import Header from "../../../../components/Header/Header";
import OriginButton from "../../../../components/Button/OriginButton";
import { useLocation, useNavigate } from "react-router-dom";
import Input from "../../../../components/Input";
import { countryList } from "../../../../configs/data/CountryConfig";
import { countryNumberList } from "../../../../configs/data/CountryNumberConfig";
import ControllerAbstractBase from "../../../../controller/Controller";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
const AddressModify = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const [addressId, setAddressId] = useState("");
  const [shippingMethodList, setShippingMethodList] = useState([]);
  const [shippingType, setShippingType] = useState("FOREIGN");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [countryNumber, setCountryNumber] = useState("");
  const [contact, setContact] = useState("");
  const [addressMethod, setAddressMethod] = useState(1);
  const [addressMethodLabel, setAddressMethodLabel] = useState("");

  useEffect(() => {
    if (!location.state) return;

    const controller = new ControllerAbstractBase({
      modelName: "Address",
      modelId: "address",
    });

    const { id } = location.state;
    setAddressId(id);

    controller
      .findOne({
        ADDRESS_IDENTIFICATION_CODE: id,
      })
      .then((res) => {
        getShippingMethodList();
        setShippingType(res.result.SHIPPING_TYPE);
        setCountry(res.result.COUNTRY);
        setName(res.result.NAME);
        setAddress(res.result.ADDRESS);
        setDetailAddress(res.result.DETAILED_ADDRESS);
        setProvince(res.result.PROVINCE);
        setCity(res.result.CITY);
        setPostalCode(res.result.POSTAL_CODE);
        setCountryNumber(res.result.COUNTRY_NUMBER);
        setContact(res.result.CONTACT);
        setAddressMethod(res.result.COURIER_IDENTIFICATION_CODE);
        setAddressMethodLabel(res.result.ADDRESS_METHOD);
      });
  }, [location.state]);

  const getShippingMethodList = async () => {
    const controller = new ControllerAbstractBase({
      modelName: "Courier",
      modelId: "courier",
    });

    const list = [];
    controller
      .findAll({
        ACTIVE_YN: "Y",
      })
      .then(async (res) => {
        res.result.rows.forEach((item) => {
          list.push({
            label: item.ENGLISH_NAME,
            value: item.COURIER_IDENTIFICATION_CODE,
          });
        });
        setShippingMethodList(list);
      });
  };

  const update = async () => {
    const appMemberId = await localStorage.getItem(
      "APP_MEMBER_IDENTIFICATION_CODE"
    );

    const controller = new ControllerAbstractBase({
      modelName: "Address",
      modelId: "address",
    });
    console.log("addressMethod", addressMethod);

    if (
      address === "" ||
      postalCode === "" ||
      countryNumber === "" ||
      contact === ""
    ) {
      toast.error("모든 항목을 입력해주세요.", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
      });
      return;
    }

    controller
      .update({
        ADDRESS_IDENTIFICATION_CODE: addressId,
        APP_MEMBER_IDENTIFICATION_CODE: appMemberId,
        COURIER_IDENTIFICATION_CODE: addressMethod,
        SHIPPING_TYPE: shippingType,
        COUNTRY: country,
        NAME: name,
        ADDRESS: address,
        DETAILED_ADDRESS: detailAddress,
        PROVINCE: province,
        CITY: city,
        POSTAL_CODE: postalCode,
        COUNTRY_NUMBER: countryNumber,
        CONTACT: contact,
        ADDRESS_METHOD: addressMethodLabel,
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
      <Header title={t("delivery_address.modify_delivery_address")} />
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
            {t("delivery_address.delivery_type")}
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
                  {t("delivery.type.overseas")}
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
                  {t("delivery.type.domestic")}
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
            {t("delivery_address.address_info")}
          </Typography>
          {shippingType === "FOREIGN" ? (
            <>
              <Input
                label={t("common.field.country.label")}
                dataList={countryList}
                value={country}
                setValue={setCountry}
                type="select"
                style={{ maxHeight: "48px" }}
              />
              <Box display="flex" flexDirection="row" width="100%" gap="8px">
                <Input
                  label={t("common.field.name.first") + "(영문)"}
                  value={name}
                  setValue={setName}
                  type="text"
                  style={{ maxHeight: "48px" }}
                />
              </Box>
              <Input
                label={t("common.field.address.label")}
                value={address}
                setValue={setAddress}
                type="text"
                style={{ maxHeight: "48px" }}
              />
              <Box display="flex" flexDirection="row" width="100%" gap="8px">
                <Input
                  label={t("common.field.address.detail")}
                  value={detailAddress}
                  setValue={setDetailAddress}
                  type="text"
                  style={{ maxHeight: "48px" }}
                />
                <Input
                  label={t("common.field.address.province")}
                  value={province}
                  setValue={setProvince}
                  type="text"
                  style={{ maxHeight: "48px" }}
                />
              </Box>
              <Input
                label={t("common.field.address.city")}
                value={city}
                setValue={setCity}
                type="text"
                style={{ maxHeight: "48px" }}
              />
              <Input
                label={t("common.field.address.postal_code")}
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
                  label={t("common.field.phone.placeholder")}
                  value={contact}
                  setValue={setContact}
                  type="text"
                  style={{ maxHeight: "48px", width: "220px" }}
                />
              </Box>
            </>
          ) : (
            <>
              <Input
                label={t("common.field.name.label")}
                value={name}
                setValue={setName}
                type="text"
                style={{ maxHeight: "48px" }}
              />
              <Input
                label={t("common.field.address.postal_code")}
                value={postalCode}
                setValue={setPostalCode}
                type="text"
                style={{ maxHeight: "48px" }}
              />
              <Input
                label={t("common.field.address.label")}
                value={address}
                setValue={setAddress}
                type="text"
                style={{ maxHeight: "48px" }}
              />
              <Input
                label={t("common.field.address.detail")}
                value={detailAddress}
                setValue={setDetailAddress}
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
                  label={t("common.field.phone.placeholder")}
                  value={contact}
                  setValue={setContact}
                  type="text"
                  style={{ maxHeight: "48px", width: "220px" }}
                />
              </Box>
            </>
          )}
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
            {t("forward_request1.delivery_method")}
          </Typography>
          <Grid2
            container
            spacing={2}
            sx={{
              gap: "8px",
            }}
          >
            {shippingMethodList.map((item, index) => (
              <Grid2 size={6} key={index}>
                <Button
                  fullWidth
                  variant={
                    addressMethod === item.value ? "contained" : "outlined"
                  }
                  onClick={() => {
                    setAddressMethod(item.value);
                    setAddressMethodLabel(item.label);
                  }}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "1px",
                    borderColor:
                      addressMethod === item.value ? "#282930" : "61636C",
                    backgroundColor:
                      addressMethod === item.value ? "#282930" : "white",
                  }}
                >
                  <Typography
                    fontSize={16}
                    fontWeight={700}
                    sx={{
                      color: addressMethod === item.value ? "white" : "#61636C",
                    }}
                  >
                    {item.label}
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
            update();
          }}
          contents={
            <Typography fontSize={16} fontWeight={700}>
              {t("common.button.save")}
            </Typography>
          }
          style={{ padding: "16px 8px", height: "48px" }}
        />
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default AddressModify;
