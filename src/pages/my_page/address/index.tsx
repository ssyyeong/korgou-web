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
  const { memberCode } = useAppMember();
  const { t } = useTranslation();

  const [addressList, setAddressList] = useState([]);

  useEffect(() => {
    const controller = new ControllerAbstractBase({
      modelName: "Address",
      modelId: "address",
    });

    controller
      .findAll({
        APP_MEMBER_IDENTIFICATION_CODE: memberCode,
      })
      .then((res) => {
        console.log("res", res.result.rows);
        setAddressList(res.result.rows);
      });
  }, [memberCode]);

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
        }}
      >
        {addressList.map((item: any, index) => {
          const addr = item.ADDRESS + " " + item.DETAILED_ADDRESS;

          return (
            <AddressCard
              key={index}
              item={item}
              name={item.FIRST_NAME + " " + item.LAST_NAME}
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
                      APP_MEMBER_IDENTIFICATION_CODE: memberCode,
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
              phone={item.CONTACT}
            />
          );
        })}
      </Box>
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
  );
};

export default Address;
