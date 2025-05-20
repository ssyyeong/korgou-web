import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import Header from "../../../components/Header/Header";
import React from "react";
import TextFieldCustom from "../../../components/TextField";
import OriginButton from "../../../components/Button/OriginButton";
import { useNavigate } from "react-router-dom";
import { useBuying, ProductData } from "../../../contexts/BuyingContext";
import { useTranslation } from "react-i18next";

const BuyingCreate: React.FC = () => {
  const navigation = useNavigate();
  const { t } = useTranslation();

  // 전역 상태 사용
  const {
    authYn,
    setAuthYn,
    shoppingMallUrl,
    setShoppingMallUrl,
    shoppingMallId,
    setShoppingMallId,
    shoppingMallPw,
    setShoppingMallPw,
    deliveryRequest,
    setDeliveryRequest,
    process,
    setProcess,
    productList,
    setProductList,
  } = useBuying();

  // 상품 추가
  const handleAddProduct = () => {
    setProductList([
      ...productList,
      { URL: "", OPTION: "", QUANTITY: "", PRICE: "", REQUEST: "" },
    ]);
  };

  // 상품 정보 변경
  const handleProductChange = (
    index: number,
    field: keyof ProductData,
    value: string
  ) => {
    const updatedProducts = [...productList];
    updatedProducts[index][field] = value;
    setProductList(updatedProducts);
  };

  // 상품 삭제
  const handleRemoveProduct = (index: number) => {
    const updatedProducts = productList.filter((_, idx) => idx !== index);
    setProductList(updatedProducts);
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
      <Box sx={{ display: "flex", flexDirection: "column", mt: "20px" }}>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#282930",
              width: "50%",
              mb: "10px",
            }}
          >
            {t("buying_it.shopping_auth")}
          </Typography>
          <ToggleButtonGroup
            value={authYn}
            exclusive
            onChange={(e, value) => {
              value && setAuthYn(value);
            }}
            aria-label="auth toggle"
            style={{ width: "50%" }}
          >
            <ToggleButton
              style={{
                width: "80px",
                height: "32px",
                backgroundColor: authYn === "Y" ? "#282930" : "white",
                color: authYn === "Y" ? "white" : "#282930",
              }}
              value="Y"
            >
              Y
            </ToggleButton>
            <ToggleButton
              style={{
                width: "80px",
                height: "32px",
                backgroundColor: authYn === "N" ? "#282930" : "white",
                color: authYn === "N" ? "white" : "#282930",
              }}
              value="N"
            >
              N
            </ToggleButton>
          </ToggleButtonGroup>
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

        {authYn === "Y" ? (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextFieldCustom
              fullWidth
              value={shoppingMallUrl}
              type="shoppingMallUrl"
              sx={{ mb: "10px" }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setShoppingMallUrl(e.target.value)
              }
              placeholder={t("buying_it.shopping_placeholder1")}
            />
            <TextFieldCustom
              fullWidth
              value={shoppingMallId}
              type="shoppingMallId"
              sx={{ mb: "10px" }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setShoppingMallId(e.target.value)
              }
              placeholder={t("buying_it.shopping_placeholder2")}
            />
            <TextFieldCustom
              fullWidth
              value={shoppingMallPw}
              type="shoppingMallPw"
              sx={{ mb: "10px" }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setShoppingMallPw(e.target.value)
              }
              placeholder={t("buying_it.shopping_placeholder3")}
            />
            <Typography sx={{ fontSize: "14px", color: "#61636C" }}>
              {t("buying_it.shopping_description")}
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#282930",
                mb: "10px",
              }}
            >
              {t("buying_it.product_list")}
            </Typography>
            {productList.map((product, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: "10px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "16px",
                      color: "#3966AE",
                      fontWeight: 700,
                    }}
                  >
                    {t("buying_it.product", { count: index + 1 })}
                  </Typography>
                  <OriginButton
                    variant="contained"
                    color="#ECECED"
                    style={{
                      padding: "4px 10px",
                      width: "41px",
                      height: "30px",
                      borderRadius: "0px",
                    }}
                    onClick={() => handleRemoveProduct(index)}
                    contents={
                      <Typography
                        sx={{
                          fontSize: "12px",
                          color: "#919298",
                        }}
                      >
                        {t("common.button.delete")}
                      </Typography>
                    }
                  />
                </Box>
                <TextFieldCustom
                  fullWidth
                  sx={{
                    mb: "10px",
                  }}
                  placeholder={t("buying_it.product_placeholder1")}
                  value={product.URL}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleProductChange(index, "URL", e.target.value)
                  }
                />
                <TextFieldCustom
                  fullWidth
                  sx={{
                    mb: "10px",
                  }}
                  placeholder={t("buying_it.product_placeholder2")}
                  value={product.OPTION}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleProductChange(index, "OPTION", e.target.value)
                  }
                />
                <TextFieldCustom
                  fullWidth
                  sx={{
                    mb: "10px",
                  }}
                  placeholder={t("buying_it.product_placeholder3")}
                  value={product.QUANTITY}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleProductChange(index, "QUANTITY", e.target.value)
                  }
                />
                <TextFieldCustom
                  fullWidth
                  sx={{
                    mb: "10px",
                  }}
                  placeholder={t("buying_it.product_placeholder4")}
                  value={product.PRICE}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleProductChange(index, "PRICE", e.target.value)
                  }
                />
                <TextFieldCustom
                  fullWidth
                  sx={{
                    mb: "10px",
                  }}
                  placeholder={t("buying_it.product_placeholder5")}
                  value={product.REQUEST}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleProductChange(index, "REQUEST", e.target.value)
                  }
                />
              </Box>
            ))}
            <OriginButton
              variant="contained"
              color="#282930"
              onClick={handleAddProduct}
              contents={
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  {t("common.button.add")}
                </Typography>
              }
            />
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
        sx={{ fontSize: "20px", fontWeight: 700, color: "#282930", mb: "10px" }}
      >
        {t("buying_it.address")}
      </Typography>
      <RadioGroup
        value={"warehouse"}
        onChange={(e) => {}}
        sx={{ flexDirection: "row", gap: 2 }}
      >
        <FormControlLabel
          value="domestic"
          control={
            <Radio
              style={{
                color: "#3966AE",
                marginBottom: "30px",
              }}
            />
          }
          label={
            <Box>
              <Typography
                sx={{ fontSize: "16px", color: "#282930", mb: "4px" }}
              >
                <strong>국내배송</strong>
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#282930" }}>
                국내 주소로 배송받기
              </Typography>
            </Box>
          }
        />
        <FormControlLabel
          value="overseas"
          control={
            <Radio
              style={{
                color: "#3966AE",
                marginBottom: "30px",
              }}
            />
          }
          label={
            <Box>
              <Typography
                sx={{ fontSize: "16px", color: "#282930", mb: "4px" }}
              >
                <strong>해외배송</strong>
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#282930" }}>
                해외 주소로 배송받기
              </Typography>
            </Box>
          }
        />
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
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  color: "#282930",
                  mb: "8px",
                }}
              >
                <strong>{t("buying_it.address_type")}</strong>{" "}
                {t("buying_it.address_type_description")}
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#282930",
                }}
              >
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
        sx={{ fontSize: "20px", fontWeight: 700, color: "#282930", mb: "10px" }}
      >
        {t("buying_it.address_request")}
      </Typography>
      <TextFieldCustom
        fullWidth
        value={deliveryRequest}
        type="deliveryRequest"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setDeliveryRequest(e.target.value)
        }
        multiline
        rows={5}
        placeholder={t("buying_it.address_request_placeholder")}
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
      {/* 품절 시 진행방식 */}
      <Typography
        sx={{ fontSize: "20px", fontWeight: 700, color: "#282930", mb: "4px" }}
      >
        {t("buying_it.proceee")}
      </Typography>
      <Typography sx={{ fontSize: "12px", color: "#919298", mb: "20px" }}>
        {t("buying_it.proceee_description")}
      </Typography>
      <RadioGroup
        value={process}
        onChange={(e) => {
          setProcess(e.target.value);
        }}
      >
        <FormControlLabel
          value="progress"
          control={
            <Radio
              style={{
                color: "#3966AE",
                marginBottom: "30px",
              }}
            />
          }
          label={t("buying_it.proceee_option1")}
        />
        <FormControlLabel
          value="stop"
          control={
            <Radio
              style={{
                color: "#3966AE",
              }}
            />
          }
          label={t("buying_it.proceee_option2")}
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

      <FormControlLabel
        control={
          <Checkbox
            checked={true}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              // 약관 동의 관련 추가 로직이 필요하면 작성하세요.
            }}
            sx={{
              color: "#3b5998",
              "&.Mui-checked": { color: "#3966AE" },
            }}
          />
        }
        label={t("terms.all")}
        sx={{ fontSize: "16px", color: "#282930", mb: "24px" }}
      />

      <OriginButton
        fullWidth
        variant="contained"
        color="#3966AE"
        onClick={() => {
          navigation("/buying/submit", {
            state: {
              authYn,
              shoppingMallUrl,
              shoppingMallId,
              shoppingMallPw,
              deliveryRequest,
              process,
              productList,
            },
          });
        }}
        contents={
          <Typography fontSize={16} fontWeight={700}>
            {t("common.button.order_request")}
          </Typography>
        }
        style={{ padding: "16px 8px", mb: "8px", height: "48px" }}
      />
    </Box>
  );
};

export default BuyingCreate;
