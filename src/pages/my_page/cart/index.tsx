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
import { useTranslation } from "react-i18next";
import NoData from "../../../components/NoData";
const Cart = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { memberId, refreshMemberData } = useAppMember();
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

  // 드래그 스크롤을 위한 상태
  const [isDragging, setIsDragging] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [scrollLeft, setScrollLeft] = React.useState(0);
  const scrollRef = React.useRef<HTMLDivElement>(null);

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
        APP_MEMBER_ID: memberId,
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
        refreshMemberData();
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

  // 드래그 스크롤 이벤트 핸들러들
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !scrollRef.current) return;
      e.preventDefault();

      const x = e.pageX - scrollRef.current.offsetLeft;
      const walk = (x - startX) * 1.5;
      const currentScrollLeft = scrollRef.current.scrollLeft;
      const newScrollLeft = currentScrollLeft - walk;

      // 스크롤 범위를 자연스럽게 제한 (무한스크롤 방지)
      const maxScrollLeft =
        scrollRef.current.scrollWidth - scrollRef.current.clientWidth;

      // 경계에서 완전히 멈추도록 처리
      if (newScrollLeft < 0) {
        scrollRef.current.scrollLeft = 0;
      } else if (newScrollLeft > maxScrollLeft) {
        scrollRef.current.scrollLeft = maxScrollLeft;
      } else {
        scrollRef.current.scrollLeft = newScrollLeft;
      }
    },
    [isDragging, startX]
  );

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
                    {t("cart.select_all")} [{selectedCartList.length}/
                    {cartList.length}]
                  </Typography>
                </Box>
                <OriginButton
                  variant="text"
                  onClick={() => {
                    deleteCart(
                      selectedCartList.map(
                        (cart) => cart.CART_IDENTIFICATION_CODE
                      )
                    );
                  }}
                  contents={
                    <Typography fontSize={12} color="#282930">
                      {t("cart.delete_selected_items")}
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
                    {t("cart.selected_item_count")}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#282930",
                      fontSize: "14px",
                    }}
                  >
                    {t("common.field.count.count", {
                      count: selectedCartList.length,
                    })}
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
                    {t("cart.total_selected_item_price")}
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
                    {t("cart.total_domestic_shipping_fee")}
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
                    {t("cart.purchase_fee")}
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
                  {t("cart.cart_total_price")}
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
                        {t("cart.total", {
                          count: selectedCartList.length,
                        })}
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
                      ${selectedCartTotal.toFixed(2)} {t("common.button.order")}
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
              <NoData text="장바구니에 담긴 상품이 없습니다." />

              {/* 추천 상품 카드들 */}
              <Box
                ref={scrollRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                sx={{
                  display: "flex",
                  gap: "12px",
                  mt: "75px",
                  mb: "20px",
                  width: "100%",
                  overflowX: "auto", // 가로 스크롤 활성화
                  overflowY: "hidden", // 세로 스크롤 숨김
                  padding: "0 16px",
                  cursor: isDragging ? "grabbing" : "grab", // 드래그 상태에 따른 커서 변경
                  userSelect: "none", // 텍스트 선택 방지
                  // 성능 최적화
                  willChange: "scroll-position", // 브라우저에게 스크롤 최적화 힌트
                  transform: "translateZ(0)", // 하드웨어 가속 활성화
                  backfaceVisibility: "hidden", // 3D 변환 최적화
                  // 스크롤바 숨기기
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                  scrollbarWidth: "none", // Firefox
                  msOverflowStyle: "none", // IE/Edge
                }}
              >
                {[1, 2, 3].map((index) => (
                  <Box
                    key={index}
                    sx={{
                      minWidth: "128px",
                      height: "104px",
                      backgroundColor: "#f8f9fa",
                      borderRadius: "8px",
                      position: "relative",
                      cursor: "pointer",
                      overflow: "hidden",
                      flexShrink: 0, // 카드가 줄어들지 않도록
                      // 성능 최적화
                      willChange: "transform",
                      transform: "translateZ(0)",
                      backfaceVisibility: "hidden",
                    }}
                    onClick={() => navigate("/shop/best")}
                  >
                    <img
                      src="/images/shop/recommend_product.svg"
                      alt="recommend product"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                ))}
              </Box>

              <OriginButton
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => {
                  navigate("/shop");
                }}
                contents={
                  <Typography fontSize={16} color="#ffffff" fontWeight={700}>
                    추천 상품 보러가기
                  </Typography>
                }
                style={{ height: "48px" }}
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
            <NoData text="장바구니에 담긴 상품이 없습니다." />

            {/* 추천 상품 카드들 */}
            <Box
              ref={scrollRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              sx={{
                display: "flex",
                gap: "12px",
                mt: "75px",
                mb: "20px",
                width: "100%",
                overflowX: "auto", // 가로 스크롤 활성화
                overflowY: "hidden", // 세로 스크롤 숨김
                padding: "0 16px",
                cursor: isDragging ? "grabbing" : "grab", // 드래그 상태에 따른 커서 변경
                userSelect: "none", // 텍스트 선택 방지
                // 성능 최적화
                willChange: "scroll-position", // 브라우저에게 스크롤 최적화 힌트
                transform: "translateZ(0)", // 하드웨어 가속 활성화
                backfaceVisibility: "hidden", // 3D 변환 최적화
                // 스크롤바 숨기기
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                scrollbarWidth: "none", // Firefox
                msOverflowStyle: "none", // IE/Edge
              }}
            >
              {[1, 2, 3].map((index) => (
                <Box
                  key={index}
                  sx={{
                    minWidth: "128px",
                    height: "104px",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "8px",
                    position: "relative",
                    cursor: "pointer",
                    overflow: "hidden",
                    flexShrink: 0, // 카드가 줄어들지 않도록
                    // 성능 최적화
                    willChange: "transform",
                    transform: "translateZ(0)",
                    backfaceVisibility: "hidden",
                  }}
                  onClick={() => navigate("/shop/best")}
                >
                  <img
                    src="/images/shop/recommend_product.svg"
                    alt="recommend product"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              ))}
            </Box>

            <OriginButton
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => {
                navigate("/shop/best");
              }}
              contents={
                <Typography fontSize={16} color="#ffffff" fontWeight={700}>
                  추천 상품 보러가기
                </Typography>
              }
              style={{ height: "48px" }}
            />
          </Box>
        </Box>
      </TabPanel>
    </Box>
  );
};
export default Cart;
