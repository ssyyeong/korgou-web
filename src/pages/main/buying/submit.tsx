import React from "react";
import {
  Box,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import Header from "../../../components/Header/Header";
import TextFieldCustom from "../../../components/TextField";
import OriginButton from "../../../components/Button/OriginButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useBuying } from "../../../contexts/BuyingContext"; // 경로는 상황에 맞게 수정
import ControllerAbstractBase from "../../../controller/Controller";
import { useAppMember } from "../../../hooks/useAppMember";
import { useTranslation } from "react-i18next";

const BuyingSubmit: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { memberCode } = useAppMember();

  // BuyingContext의 setter 함수들 사용
  const {
    setAuthYn,
    setShoppingMallUrl,
    setShoppingMallId,
    setShoppingMallPw,
    setDeliveryRequest,
    setProcess,
    setProductList,
  } = useBuying();

  const {
    authYn = "",
    shoppingMallUrl = "",
    shoppingMallId = "",
    shoppingMallPw = "",
    deliveryRequest = "",
    process = "progress",
    productList = [],
  } = location?.state || {};

  // 랜덤 코드 생성 함수
  const generateRandomCode = (): string => {
    const prefix = "G1000";
    const randomNumber = Math.floor(100000 + Math.random() * 900000); // 6자리 숫자 생성
    return `${prefix}${randomNumber}`;
  };

  const handleSubmit = () => {
    const controller = new ControllerAbstractBase({
      modelName: "BuyingIt",
      modelId: "buying_it",
    });
    controller
      .create({
        APP_MEMBER_IDENTIFICATION_CODE: memberCode,
        BUYING_IT_ID: generateRandomCode(),
        SHOP_URL: shoppingMallUrl,
        SHOP_ID: shoppingMallId,
        SHOP_PASS: shoppingMallPw,
        PRODUCT_LIST: JSON.stringify(productList),
        REQUEST: deliveryRequest,
        PROCESS: process,
      })
      .then((res) => {
        // 제출 후 글로벌 상태 초기화
        setAuthYn("Y");
        setShoppingMallUrl("");
        setShoppingMallId("");
        setShoppingMallPw("");
        setDeliveryRequest("");
        setProcess("progress");
        setProductList([]);

        navigate("/");
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        mb: "48px",
      }}
    >
      <Header title="Buying it" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: "20px",
        }}
      >
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 700,
            color: "#282930",
            width: "50%",
            mb: "10px",
          }}
        >
          {authYn === "Y"
            ? t("buying_it.shopping_account")
            : t("buying_it.order_list")}
        </Typography>

        <Divider sx={{ color: "#ECECED", my: "20px" }} />

        {authYn === "Y" ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ fontSize: "14px", color: "#61636C" }}>
                SHOP URL
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#282930" }}>
                {shoppingMallUrl}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ fontSize: "14px", color: "#61636C" }}>
                ID
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#282930" }}>
                {shoppingMallId}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ fontSize: "14px", color: "#61636C" }}>
                PASS
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#282930" }}>
                {shoppingMallPw}
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            {productList.map((product, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <Typography
                  sx={{ fontSize: "16px", color: "#3966AE", fontWeight: 700 }}
                >
                  {t("buying_it.product", { count: index + 1 })}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography sx={{ fontSize: "14px", color: "#61636C" }}>
                      SHOP URL
                    </Typography>
                    <Typography sx={{ fontSize: "14px", color: "#282930" }}>
                      {product.URL}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography sx={{ fontSize: "14px", color: "#61636C" }}>
                      OPTION
                    </Typography>
                    <Typography sx={{ fontSize: "14px", color: "#282930" }}>
                      {product.OPTION}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography sx={{ fontSize: "14px", color: "#61636C" }}>
                      QTY
                    </Typography>
                    <Typography sx={{ fontSize: "14px", color: "#282930" }}>
                      {product.QUANTITY}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography sx={{ fontSize: "14px", color: "#61636C" }}>
                      TOTAL
                    </Typography>
                    <Typography sx={{ fontSize: "14px", color: "#282930" }}>
                      {product.QUANTITY} * {product.PRICE}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>
      <Divider
        sx={{
          color: "#ECECED",
          position: "relative",
          width: "calc(100% + 20px)",
          my: "20px",
          border: "5px solid #ECECED",
          alignSelf: "center",
        }}
      />
      {/* 배송지 설정 */}
      <Typography
        sx={{
          fontSize: "20px",
          fontWeight: 700,
          color: "#282930",
          mb: "10px",
        }}
      >
        {t("buying_it.address")}
      </Typography>
      <RadioGroup value={"warehouse"} onChange={(e) => {}}>
        <FormControlLabel
          value="warehouse"
          control={
            <Radio
              style={{
                color: "#3966AE",
                marginBottom: "30px",
              }}
            />
          }
          label={
            <Box
              sx={{ display: "flex", flexDirection: "column", width: "100%" }}
            >
              <Typography
                sx={{ fontSize: "16px", color: "#282930", mb: "8px" }}
              >
                <strong>{t("buying_it.address_type")}</strong>{" "}
                {t("buying_it.address_type_description")}
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#282930" }}>
                {t("buying_it.address_detail")} <strong>C128405</strong>
              </Typography>
            </Box>
          }
        />
      </RadioGroup>

      <Divider
        sx={{
          color: "#ECECED",
          position: "relative",
          width: "calc(100% + 20px)",
          my: "20px",
          border: "5px solid #ECECED",
          alignSelf: "center",
        }}
      />
      <Typography
        sx={{
          fontSize: "20px",
          fontWeight: 700,
          color: "#282930",
          mb: "10px",
        }}
      >
        {t("buying_it.address_request")}
      </Typography>
      <TextFieldCustom
        fullWidth
        value={deliveryRequest}
        disabled
        type="deliveryRequest"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => () => {}}
        multiline
        rows={5}
        sx={{ "& .MuiInputBase-root": { height: "160px" } }}
      />

      <Divider
        sx={{
          color: "#ECECED",
          position: "relative",
          width: "calc(100% + 20px)",
          my: "20px",
          border: "5px solid #ECECED",
          alignSelf: "center",
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
            fontWeight: 700,
            color: "#282930",
          }}
        >
          {t("buying_it.proceee")}
        </Typography>
        <Typography sx={{ fontSize: "16px", color: "#282930" }}>
          {process === "progress"
            ? t("buying_it.proceee_option1")
            : t("buying_it.proceee_option2")}
        </Typography>
      </Box>
      <Divider
        sx={{
          color: "#ECECED",
          position: "relative",
          width: "calc(100% + 20px)",
          my: "20px",
          border: "5px solid #ECECED",
          alignSelf: "center",
        }}
      />
      <Typography sx={{ fontSize: "14px", color: "#282930" }}>
        buying it 주문사항 관련 유의사항 및 안내 사항이 노출됩니다.
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          gap: "8px",
          mt: "40px",
        }}
      >
        <OriginButton
          fullWidth
          variant="outlined"
          onClick={() => {
            navigate(-1);
          }}
          contents={
            <Typography fontSize={16} fontWeight={700} color="#61636C">
              {t("common.button.previous")}
            </Typography>
          }
          style={{
            width: "50%",
            border: "1px solid var(--Grey-G75, #B1B2B6)",
            borderRadius: "0px",
          }}
        />
        <OriginButton
          fullWidth
          variant="contained"
          color="#3966AE"
          onClick={handleSubmit}
          contents={
            <Typography fontSize={16} fontWeight={700}>
              {t("common.button.submit")}
            </Typography>
          }
          style={{ borderRadius: "0px" }}
        />
      </Box>
    </Box>
  );
};

export default BuyingSubmit;
