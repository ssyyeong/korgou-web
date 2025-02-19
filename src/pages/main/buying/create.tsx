import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Header from "../../../components/Header/Header";
import React, { useState } from "react";
import TextFieldCustom from "../../../components/TextField";
import OriginButton from "../../../components/Button/OriginButton";

// 타입 정의
interface ProductData {
  URL: string;
  OPTION: string;
  QUANTITY: string;
  PRICE: string;
  REQUEST: string;
}

const BuyingCreate: React.FC = () => {
  const [authYn, setAuthYn] = useState<string>("Y");
  const [shoppingMallUrl, setShoppingMallUrl] = useState<string>("");
  const [shoppingMallId, setShoppingMallId] = useState<string>("");
  const [shoppingMallPw, setShoppingMallPw] = useState<string>("");
  const [deliveryRequest, setDeliveryRequest] = useState<string>("");
  const [isAgree, setIsAgree] = useState<boolean>(false);
  const [productList, setProductList] = useState<ProductData[]>([]);

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
            쇼핑몰 계정여부
          </Typography>
          <ToggleButtonGroup
            value={authYn}
            exclusive
            onChange={(e, value) => {
              console.log(value);
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
              placeholder="쇼핑몰 URL"
            />
            <TextFieldCustom
              fullWidth
              value={shoppingMallId}
              type="shoppingMallId"
              sx={{ mb: "10px" }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setShoppingMallId(e.target.value)
              }
              placeholder="쇼핑몰 ID"
            />
            <TextFieldCustom
              fullWidth
              value={shoppingMallPw}
              type="shoppingMallPw"
              sx={{ mb: "10px" }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setShoppingMallPw(e.target.value)
              }
              placeholder="쇼핑몰 PASS"
            />
            <Typography sx={{ fontSize: "14px", color: "#61636C" }}>
              *쇼핑몰 접속 {">"} 장바구니에 추가된 상품을 구매합니다.
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
              주문상품 목록
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
                    sx={{ fontSize: "16px", color: "#3966AE", fontWeight: 700 }}
                  >
                    상품 {index + 1}
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
                  placeholder="주문상품 URL을 입력하세요."
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
                  placeholder="주문 옵션(최종 옵션값)을 입력하세요."
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
                  placeholder="수량을 선택하세요."
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
                  placeholder="최종 상품 금액을 입력하세요."
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
                  placeholder="요청사항을 입력하세요."
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
                  + add
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
        배송지 설정
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
                <strong> 창고배송</strong>(창고 보유상품과 합포장)
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#282930",
                }}
              >
                경기도 성남시 중원구 순환로 79 3층 <strong>C128405</strong>
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
        배송 요청사항
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
        placeholder="배송 요청사항을 입력해주세요."
        sx={{ "& .MuiInputBase-root": { height: "160px" } }}
      />

      <Divider sx={{ my: "20px", color: "#ECECED" }} />

      <FormControlLabel
        control={
          <Checkbox
            checked={isAgree}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setIsAgree(e.target.checked)
            }
            sx={{
              color: "#3b5998",
              "&.Mui-checked": { color: "#3966AE" },
            }}
          />
        }
        label="약관 전체 동의"
        sx={{ fontSize: "16px", color: "#282930", mb: "24px" }}
      />

      <OriginButton
        fullWidth
        variant="contained"
        color="#3966AE"
        onClick={() => {}}
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
