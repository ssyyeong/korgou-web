import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Header from "../../../components/Header/Header";
import OriginButton from "../../../components/Button/OriginButton";
import { useNavigate } from "react-router-dom";
import ControllerAbstractBase from "../../../controller/Controller";
import { useAppMember } from "../../../hooks/useAppMember";
import AddressCard from "./AddressCard";
import AddressController from "../../../controller/AddressController";
import { useTranslation } from "react-i18next";

const Address = () => {
  const navigator = useNavigate();
  const { memberId } = useAppMember();
  const { t } = useTranslation();

  const [addressList, setAddressList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // memberId가 null이 아닐 때만 API 호출하도록 수정
    if (memberId) {
      setIsLoading(true);
      const controller = new ControllerAbstractBase({
        modelName: "Address",
        modelId: "address",
      });

      controller
        .findAll({
          APP_MEMBER_ID: memberId,
        })
        .then((res) => {
          setAddressList(res.result.rows);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("주소 목록 조회 실패:", error);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [memberId]);

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
      <Header title={t("my_page.delivery_address")} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "16px",
          flexGrow: 1,
          minHeight: "calc(100vh - 120px)",
        }}
      >
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "16px",
              height: "100%",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <img src="/images/main/character.svg" alt="character" />
            <Typography sx={{ color: "#61636C" }}>
              주소 목록을 불러오는 중...
            </Typography>
          </Box>
        ) : addressList.length > 0 ? (
          <>
            {addressList.map((item: any, index) => {
              const addr = item.ADDRESS + " " + item.DETAILED_ADDRESS;

              return (
                <AddressCard
                  key={item.ADDRESS_IDENTIFICATION_CODE || index}
                  item={item}
                  name={item.NAME}
                  type={item.SHIPPING_TYPE}
                  isDefault={item.DEFAULT_YN === "Y"}
                  onClick={(id) => {
                    navigator("/my_page/address/modify", {
                      state: {
                        id: id,
                      },
                    });
                  }}
                  setIsDefault={(value) => {
                    if (value) {
                      const addressController = new AddressController({
                        modelName: "Address",
                        modelId: "address",
                      });
                      addressController
                        .changeDefaultAddress({
                          APP_MEMBER_ID: memberId,
                          ADDRESS_IDENTIFICATION_CODE:
                            item.ADDRESS_IDENTIFICATION_CODE,
                          DEFAULT_YN: "Y",
                        })
                        .then((res) => {
                          setAddressList(res.data.result);
                        });
                    }
                  }}
                  address={addr}
                  phone={item.COUNTRY_NUMBER + " " + item.CONTACT}
                />
              );
            })}
            <Box sx={{ mt: "16px", mb: "80px" }}>
              <OriginButton
                fullWidth
                variant="contained"
                color="#282930"
                onClick={() => {
                  navigator("/my_page/address/create");
                }}
                contents={
                  <Typography fontSize={16} fontWeight={700}>
                    {t("common.button.add_address")}
                  </Typography>
                }
                style={{ padding: "16px 8px", height: "48px" }}
              />
            </Box>
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "16px",
              flex: 1,
              minHeight: "100%",
            }}
          >
            <img src="/images/main/character.svg" alt="character" />
            <Typography sx={{ color: "#61636C", fontSize: "16px" }}>
              등록된 배송지가 없습니다.
            </Typography>
            <OriginButton
              fullWidth
              variant="contained"
              color="#282930"
              onClick={() => {
                navigator("/my_page/address/create");
              }}
              contents={
                <Typography fontSize={16} fontWeight={700}>
                  {t("common.button.add_address")}
                </Typography>
              }
              style={{ padding: "16px 8px", height: "48px", maxWidth: "300px" }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Address;
