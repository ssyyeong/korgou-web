import { Box, Checkbox, Divider, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect } from "react";
import OriginButton from "../../../components/Button/OriginButton";
import Header from "../../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import ControllerAbstractBase from "../../../controller/Controller";
import { useAppMember } from "../../../hooks/useAppMember";
import CartCard from "./CartCard";
import { useExchange } from "../../../hooks/useExchange";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const Cart = () => {
  const navigate = useNavigate();
  const { memberCode } = useAppMember();
  const { usd } = useExchange();

  const [tab, setTab] = React.useState(0);
  const [cartList, setCartList] = React.useState([]);
  const [selectedCartList, setSelectedCartList] = React.useState([]);

  // 계산된 값들을 위한 상태
  const [selectedCartPrice, setSelectedCartPrice] = React.useState(0);
  const [selectedCartDeliveryFee, setSelectedCartDeliveryFee] =
    React.useState(0);
  const [selectedCartCommission, setSelectedCartCommission] = React.useState(0);
  const [selectedCartTotal, setSelectedCartTotal] = React.useState(0);

  const controller = new ControllerAbstractBase({
    modelName: "Cart",
    modelId: "cart",
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  // 모든 계산을 처리하는 useEffect
  useEffect(() => {
    const price =
      selectedCartList.length > 0
        ? selectedCartList.reduce(
            (acc, cart) => acc + cart.QUANTITY * cart.PRODUCT.PRICE,
            0
          ) / usd.replace(/,/g, "")
        : 0;

    const deliveryFee =
      selectedCartList.length > 0 ? 2.28 * selectedCartList.length : 0;

    const commission = selectedCartList.length > 0 ? 0.05 * price : 0;

    setSelectedCartPrice(price);
    setSelectedCartDeliveryFee(deliveryFee);
    setSelectedCartCommission(commission);
    setSelectedCartTotal(price + deliveryFee + commission);
  }, [selectedCartList, usd]);

  useEffect(() => {
    getCartList();
  }, []);

  const TabPanel = (props: any) => {
    const { children, value, index, ...other } = props;
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== tab}
        {...other}
      >
        {value === tab && <Box>{children}</Box>}
      </Typography>
    );
  };

  const getCartList = () => {
    controller
      .findAll({
        APP_MEMBER_IDENTIFICATION_CODE: memberCode,
      })
      .then((res) => {
        setCartList(res.result.rows);
      });
  };

  const deleteCart = (cartId: any) => {
    controller
      .delete({
        CART_IDENTIFICATION_CODE: cartId,
      })
      .then((res) => {
        getCartList();
        setSelectedCartList([]);
        setSelectedCartPrice(0);
        setSelectedCartDeliveryFee(0);
        setSelectedCartCommission(0);
        setSelectedCartTotal(0);
      });
  };

  const updateCartQuantity = (cartId: any, quantity: number) => {
    controller
      .update({
        CART_IDENTIFICATION_CODE: cartId,
        QUANTITY: quantity,
      })
      .then((res) => {
        setCartList(
          cartList.map((cart) => {
            return cart?.CART_IDENTIFICATION_CODE === cartId
              ? res.result[0]
              : cart;
          })
        );

        setSelectedCartList(
          selectedCartList.map((selectedCart) => {
            return selectedCart.CART_IDENTIFICATION_CODE === cartId
              ? res.result[0]
              : selectedCart;
          })
        );
      });
  };

  const updateCartRequestComment = (cartId: any, comment: string) => {
    controller
      .update({
        CART_IDENTIFICATION_CODE: cartId,
        REQUEST_COMMENT: comment,
      })
      .then((res) => {
        setCartList(
          cartList.map((cart) => {
            return cart?.CART_IDENTIFICATION_CODE === cartId
              ? res.result[0]
              : cart;
          })
        );
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        mb: "50px",
      }}
    >
      <Header title="장바구니" />
      <Tabs
        value={tab}
        onChange={handleChange}
        aria-label="Second Tabs"
        centered
        variant="fullWidth"
        sx={{
          position: "relative",
          width: "360px",
          "& .MuiTabs-indicator": {
            backgroundColor: "#282930",
            height: 2,
          },
          "& .MuiTab-root.Mui-selected": {
            color: "#282930",
          },
          borderBottom: "1px solid #919298", // 탭 아래쪽 보더 설정
        }}
      >
        <Tab label="SHOP" />
        <Tab label="상생마켓" />
      </Tabs>

      <TabPanel value={0} width="100%">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {cartList.length > 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Checkbox
                    size="small"
                    checked={selectedCartList.length === cartList.length}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setSelectedCartList(
                        selectedCartList.length === cartList.length
                          ? []
                          : [...cartList]
                      );
                    }}
                    sx={{
                      width: "16px",
                      height: "16px",
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: "12px",
                    }}
                  >
                    전체 선택 [{selectedCartList.length}/{cartList.length}]
                  </Typography>
                </Box>
                <OriginButton
                  variant="text"
                  onClick={() => {
                    setSelectedCartList(
                      selectedCartList.filter((cart) => cartList.includes(cart))
                    );
                  }}
                  contents={
                    <Typography fontSize={12} color="#282930">
                      선택 상품 삭제
                    </Typography>
                  }
                  disabled={selectedCartList.length === 0}
                />
              </Box>
              {cartList.map((cart) => (
                <CartCard
                  key={cart.CART_IDENTIFICATION_CODE}
                  cart={cart}
                  selectedCartList={selectedCartList}
                  setSelectedCartList={setSelectedCartList}
                  deleteCart={deleteCart}
                  updateCartQuantity={updateCartQuantity}
                  updateCartRequestComment={updateCartRequestComment}
                />
              ))}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  mt: "10px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#61636C",
                      fontSize: "14px",
                    }}
                  >
                    선택 상품 수
                  </Typography>
                  <Typography
                    sx={{
                      color: "#282930",
                      fontSize: "14px",
                    }}
                  >
                    {selectedCartList.length}개
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#61636C",
                      fontSize: "14px",
                    }}
                  >
                    총 선택 상품금액
                  </Typography>
                  <Typography
                    sx={{
                      color: "#282930",
                      fontSize: "14px",
                    }}
                  >
                    {selectedCartPrice.toFixed(2)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#61636C",
                      fontSize: "14px",
                    }}
                  >
                    총 국내 배송비
                  </Typography>
                  <Typography
                    sx={{
                      color: "#282930",
                      fontSize: "14px",
                    }}
                  >
                    ${selectedCartDeliveryFee.toFixed(2)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#61636C",
                      fontSize: "14px",
                    }}
                  >
                    구매대행 수수료
                  </Typography>
                  <Typography
                    sx={{
                      color: "#282930",
                      fontSize: "14px",
                    }}
                  >
                    ${selectedCartCommission.toFixed(2)}
                  </Typography>
                </Box>
              </Box>
              <Divider
                sx={{
                  color: "#B1B2B6",
                  my: "20px",
                  borderStyle: "dashed",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={{
                    color: "#EB1F81",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  장바구니 합계
                </Typography>
                <Typography
                  sx={{
                    color: "#EB1F81",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  ${selectedCartTotal.toFixed(2)}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: "8px",
                  mt: "30px",
                }}
              >
                <OriginButton
                  fullWidth
                  variant="outlined"
                  onClick={() => {}}
                  style={{
                    width: "30%",
                    borderColor: "#ECECED",
                  }}
                  contents={
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <KeyboardArrowUpIcon
                        sx={{
                          color: "#B1B2B6",
                          width: "16px",
                          height: "16px",
                        }}
                      />
                      <Typography fontSize={14} color="#282930">
                        총 {selectedCartList.length}개
                      </Typography>
                    </Box>
                  }
                />
                <OriginButton
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => {}}
                  contents={
                    <Typography fontSize={16} color="#ffffff">
                      ${selectedCartTotal.toFixed(2)} 주문하기
                    </Typography>
                  }
                />
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                mt: "100px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  color: "#282930",
                  mb: "20px",
                }}
              >
                장바구니에 담긴 상품이 없습니다.
              </Typography>
              <OriginButton
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => {
                  navigate("/shop/best");
                }}
                contents={
                  <Typography fontSize={16} color="#ffffff">
                    추천 상품 보러가기
                  </Typography>
                }
                style={{ height: "48px", width: "160px" }}
              />
            </Box>
          )}
        </Box>
      </TabPanel>
      <TabPanel value={1} width="100%">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              mt: "100px",
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                color: "#282930",
                mb: "20px",
              }}
            >
              장바구니에 담긴 상품이 없습니다.
            </Typography>
            <OriginButton
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => {}}
              contents={
                <Typography fontSize={16} color="#ffffff">
                  추천 상품 보러가기
                </Typography>
              }
              style={{ height: "48px", width: "160px" }}
            />
          </Box>
        </Box>
      </TabPanel>
    </Box>
  );
};
export default Cart;
