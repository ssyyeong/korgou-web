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
import React, { useState } from "react";
import TextFieldCustom from "../../../components/TextField";
import OriginButton from "../../../components/Button/OriginButton";
import { useNavigate } from "react-router-dom";
import { useBuying, ProductData } from "../../../contexts/BuyingContext";
import { useTranslation } from "react-i18next";
import { useAppMember } from "../../../hooks/useAppMember";

const BuyingCreate: React.FC = () => {
  const navigation = useNavigate();
  const { t } = useTranslation();
  const { memberId } = useAppMember();
  const [isAgree, setIsAgree] = useState(false);

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
    deliveryType,
    setDeliveryType,
    process,
    setProcess,
    productList,
    setProductList,
    shoppingMallAmount,
    setShoppingMallAmount,
  } = useBuying();

  // 상품 추가
  const handleAddProduct = () => {
    setProductList([
      ...productList,
      { URL: "", OPTION: "", QUANTITY: "", AMOUNT: "", REMARK: "" },
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: "20px",
          gap: "10px",
        }}
      >
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
            쇼핑몰 계정여부
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
              placeholder={"URL(필수)"}
            />
            <TextFieldCustom
              fullWidth
              value={shoppingMallId}
              type="shoppingMallId"
              sx={{ mb: "10px" }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setShoppingMallId(e.target.value)
              }
              placeholder={"ID(필수)"}
            />
            <TextFieldCustom
              fullWidth
              value={shoppingMallPw}
              type="shoppingMallPw"
              sx={{ mb: "10px" }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setShoppingMallPw(e.target.value)
              }
              placeholder={"PASS(필수)"}
            />
            <TextFieldCustom
              fullWidth
              value={shoppingMallAmount}
              type="shoppingMallAmount"
              sx={{ mb: "10px" }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setShoppingMallAmount(e.target.value)
              }
              placeholder={"Amount(필수)"}
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
                    {"상품 " + (index + 1)}
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
                        삭제
                      </Typography>
                    }
                  />
                </Box>
                <TextFieldCustom
                  fullWidth
                  sx={{
                    mb: "10px",
                  }}
                  placeholder={"URL(필수)"}
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
                  placeholder={"OPTION(필수)"}
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
                  placeholder={"Quantity(필수)"}
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
                  placeholder={"Amount(필수)"}
                  value={product.AMOUNT}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleProductChange(index, "AMOUNT", e.target.value)
                  }
                />
                <TextFieldCustom
                  fullWidth
                  sx={{
                    mb: "10px",
                  }}
                  placeholder={"Remark(선택)"}
                  value={product.REMARK}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleProductChange(index, "REMARK", e.target.value)
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
                  상품 추가
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
        sx={{ fontSize: "20px", fontWeight: 700, color: "#282930", mb: "20px" }}
      >
        배송지 설정
      </Typography>
      <RadioGroup
        value={deliveryType}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setDeliveryType(e.target.value);
        }}
        sx={{ flexDirection: "row", gap: "20px" }}
      >
        <FormControlLabel
          value="domestic"
          control={
            <Radio
              style={{
                color: "#3966AE",
              }}
            />
          }
          label={
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  color: "#282930",
                  letterSpacing: "-0.16px",
                  lineHeight: "130%",
                  fontWeight: 700,
                }}
              >
                국내배송
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  color: "#282930",
                  letterSpacing: "-0.16px",
                  lineHeight: "130%",
                  fontWeight: 500,
                }}
              >
                (한국주소)
              </Typography>
            </Box>
          }
        />
        <FormControlLabel
          value="overseas"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDeliveryType(e.target.value);
          }}
          control={
            <Radio
              style={{
                color: "#3966AE",
              }}
            />
          }
          label={
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  color: "#282930",
                  letterSpacing: "-0.16px",
                  lineHeight: "130%",
                  fontWeight: 700,
                }}
              >
                해외배송
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  color: "#282930",
                  letterSpacing: "-0.16px",
                  lineHeight: "130%",
                  fontWeight: 500,
                }}
              >
                (단일사이트 주문 한정)
              </Typography>
            </Box>
          }
        />
        <FormControlLabel
          value="warehouse"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDeliveryType(e.target.value);
          }}
          control={
            <Radio
              style={{
                color: "#3966AE",
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
                  letterSpacing: "-0.16px",
                  lineHeight: "130%",
                  fontWeight: 700,
                }}
              >
                창고 배송 (창고 보유상품과 합포장)
                <br />
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#282930",
                    letterSpacing: "-0.14px",
                    lineHeight: "130%",
                    fontWeight: 500,
                  }}
                >
                  경기도 성남시 중원구 순환로 79 3층
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#282930",
                    letterSpacing: "-0.14px",
                    lineHeight: "130%",
                    fontWeight: 700,
                  }}
                >
                  &nbsp;
                  {memberId}
                </Typography>
              </Box>
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
        구매 요청사항
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
        placeholder="구매 시 요청사항을 입력해주세요."
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
        sx={{
          fontSize: "20px",
          mt: "20px",
          fontWeight: 700,
          color: "#282930",
          mb: "4px",
        }}
      >
        품절 시 진행방식
      </Typography>
      <Typography
        sx={{
          fontSize: "12px",
          lineHeight: "130%",
          color: "#919298",
          mb: "20px",
        }}
      >
        *요청 상품 중 품절된 상품이 발생했을때, 결제 처리 방법
      </Typography>
      <RadioGroup
        value={process}
        onChange={(e) => {
          setProcess(e.target.value);
        }}
        sx={{
          gap: "10px",
        }}
      >
        <FormControlLabel
          value="progress"
          control={
            <Radio
              style={{
                color: "#3966AE",
              }}
            />
          }
          label={
            <Typography
              sx={{
                fontSize: "16px",
                letterSpacing: "-0.16px",
                lineHeight: "130%",
                fontWeight: 500,
              }}
            >
              품절 상품을 건너뛰고 나머지 상품들만 결제 진행
            </Typography>
          }
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
          label={
            <Typography
              sx={{
                fontSize: "16px",
                letterSpacing: "-0.16px",
                lineHeight: "130%",
                fontWeight: 500,
              }}
            >
              주문서 처리를 중지
            </Typography>
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

      <FormControlLabel
        control={
          <Checkbox
            checked={isAgree}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setIsAgree(!isAgree);
            }}
            sx={{
              color: "#3b5998",
              "&.Mui-checked": { color: "#3966AE" },
            }}
          />
        }
        label={
          <Typography
            sx={{
              fontSize: "16px",
              color: "#282930",
              letterSpacing: "-0.16px",
              lineHeight: "130%",
              fontWeight: 500,
            }}
          >
            약관 전체 동의
          </Typography>
        }
        sx={{ fontSize: "16px", color: "#282930", mb: "24px" }}
      />

      <OriginButton
        fullWidth
        variant="contained"
        color="#3966AE"
        onClick={() => {
          if (!isAgree) {
            alert("약관 전체 동의를 해주세요.");
            return;
          }
          navigation("/buying/submit", {
            state: {
              authYn,
              shoppingMallUrl,
              shoppingMallId,
              shoppingMallPw,
              shoppingMallAmount,
              deliveryRequest,
              process,
              productList,
            },
          });
        }}
        contents={
          <Typography fontSize={16} fontWeight={700}>
            주문 요청
          </Typography>
        }
        style={{ padding: "16px 8px", mb: "8px", height: "48px" }}
      />
    </Box>
  );
};

export default BuyingCreate;
