import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Chip,
  Card,
  CardContent,
} from "@mui/material";
import Header from "../../../../components/Header/Header";
import { countryList } from "../../../../configs/data/CountryConfig";
import TextFieldCustom from "../../../../components/TextField";
import Input from "../../../../components/Input";
import { countryNumberList } from "../../../../configs/data/CountryNumberConfig";
import { useAppMember } from "../../../../hooks/useAppMember";
import ControllerAbstractBase from "../../../../controller/Controller";
import OriginButton from "../../../../components/Button/OriginButton";
import CustomCheckbox from "../../../../components/Button/CustomCheckbox";
import { useNavigate, useLocation } from "react-router-dom";

interface Address {
  id: string;
  name: string;
  type: "domestic" | "international";
  address: string;
  phone: string;
  isSelected?: boolean;
}

const DeliveryAddress = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const { memberCode, memberId } = useAppMember();

  const [addressType, setAddressType] = useState<"select" | "direct">("select");
  const [shippingType, setShippingType] = useState<
    "international" | "domestic"
  >("international");
  const [addressList, setAddressList] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [deliveryCompanyList, setDeliveryCompanyList] = useState<any[]>([]);
  const [deliveryCompany, setDeliveryCompany] = useState("DHL");

  // 배송사 목록은 마운트 시 한 번만 로드
  useEffect(() => {
    fetchDeliveryCompanyList();
  }, []);

  // 배송 타입이 변경되면 선택된 주소 초기화
  useEffect(() => {
    setSelectedAddress("");
  }, [shippingType]);

  const fetchAddressList = useCallback(async () => {
    if (!memberId) return;
    const controller = new ControllerAbstractBase({
      modelName: "Address",
      modelId: "address",
    });

    controller
      .findAll({
        APP_MEMBER_ID: memberId,
      })
      .then((res) => {
        console.log(res.result.rows);
        // 데이터베이스에서 가져온 주소를 매핑
        const mappedAddresses = res.result.rows.map((addr: any) => {
          // 주소 문자열 구성
          let fullAddress = addr.ADDRESS || "";
          if (addr.DETAILED_ADDRESS) {
            fullAddress += `, ${addr.DETAILED_ADDRESS}`;
          }
          if (addr.CITY) {
            fullAddress += `, ${addr.CITY}`;
          }
          if (addr.PROVINCE) {
            fullAddress += `, ${addr.PROVINCE}`;
          }
          if (addr.POSTAL_CODE) {
            fullAddress = `[${addr.POSTAL_CODE}] ${fullAddress}`;
          }
          if (addr.COUNTRY) {
            fullAddress += `, ${addr.COUNTRY}`;
          }

          // 전화번호 문자열 구성
          const phoneNumber = addr.COUNTRY_NUMBER
            ? `${addr.COUNTRY_NUMBER}+ ${addr.CONTACT}`.replace(
                /(\d)(\d{3})(\d{4})/,
                "$1 $2 $3 $4",
              )
            : addr.CONTACT || "";

          return {
            id: addr.ADDRESS_IDENTIFICATION_CODE?.toString() || addr.id,
            name: addr.NAME || "",
            type:
              addr.SHIPPING_TYPE === "FOREIGN" ? "international" : "domestic",
            address: fullAddress,
            phone: phoneNumber,
            isSelected: false,
          };
        });
        setAddressList(mappedAddresses);
      });
  }, [memberId]);

  // 주소 목록은 memberId가 있을 때만 한 번 로드
  useEffect(() => {
    if (!memberId) return;
    fetchAddressList();
  }, [memberId, fetchAddressList]);

  const fetchDeliveryCompanyList = async () => {
    const controller = new ControllerAbstractBase({
      modelName: "Courier",
      modelId: "courier",
    });

    controller.findAll({}).then((res) => {
      setDeliveryCompanyList(res.result.rows);
    });
  };

  // 직접 입력 폼 데이터
  const [directForm, setDirectForm] = useState({
    country: "",
    name: "",
    postalCode: "",
    city: "",
    province: "",
    postalCode2: "",
    phonePrefix: "",
    phoneNumber: "",
    company: "",
    accountNo: "",
  });

  const handleDirectFormChange = (field: string, value: string) => {
    setDirectForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddressSelect = (addressId: string) => {
    setSelectedAddress(addressId);
  };

  // 마우스 드래그 스크롤을 위한 상태
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleCardClick = (e: React.MouseEvent, addressId: string) => {
    if (isDragging) {
      e.preventDefault();
      return;
    }
    handleAddressSelect(addressId);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        flexDirection: "column",
        backgroundColor: "white",
        position: "relative",
      }}
    >
      <Header title={"배송 요청[주소 선택]"} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: "20px",
          mb: "40px",
        }}
      >
        {/* 배송지 정보 섹션 */}
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 700,
            color: "#282930",
            lineHeight: "130%",
            letterSpacing: "-0.2px",
          }}
        >
          배송지 정보
        </Typography>

        {/* 배송지 선택 방식 */}
        <RadioGroup
          value={addressType}
          onChange={(e) =>
            setAddressType(e.target.value as "select" | "direct")
          }
          sx={{
            display: "flex",
            flexDirection: "column",
            columnGap: "10px",
          }}
        >
          <FormControlLabel
            value="select"
            control={
              <Radio
                sx={{
                  color: "#B1B2B6",
                  "&.Mui-checked": {
                    color: "#41434E",
                  },
                }}
              />
            }
            label="배송지 선택"
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: "14px",
                color: "#282930",
              },
            }}
          />
          <FormControlLabel
            value="direct"
            control={
              <Radio
                sx={{
                  color: "#B1B2B6",
                  "&.Mui-checked": {
                    color: "#41434E",
                  },
                }}
              />
            }
            label="직접 입력"
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: "14px",
                color: "#282930",
              },
            }}
          />
        </RadioGroup>

        {/* 배송 타입 선택 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: "10px",
            mb: "40px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "8px",
              mb: "16px",
            }}
          >
            <Button
              variant={
                shippingType === "international" ? "contained" : "outlined"
              }
              onClick={() => {
                setShippingType("international");
                setSelectedAddress(""); // 타입 변경 시 선택 초기화
              }}
              sx={{
                flex: 1,
                height: "48px",
                backgroundColor:
                  shippingType === "international" ? "#282930" : "white",
                color: shippingType === "international" ? "white" : "#282930",
                border: "1px solid #B1B2B6",
                textTransform: "none",
                fontSize: "16px",
                fontWeight: 700,
              }}
            >
              해외 배송
            </Button>
            <Button
              variant={shippingType === "domestic" ? "contained" : "outlined"}
              onClick={() => {
                setShippingType("domestic");
                setSelectedAddress(""); // 타입 변경 시 선택 초기화
              }}
              sx={{
                flex: 1,
                height: "48px",
                backgroundColor:
                  shippingType === "domestic" ? "#282930" : "white",
                color: shippingType === "domestic" ? "white" : "#282930",
                border: "1px solid #B1B2B6",
                textTransform: "none",
                fontSize: "16px",
                fontWeight: 700,
              }}
            >
              국내 배송
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {/* 배송지 정보 폼 */}
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#282930",
              mb: "16px",
            }}
          >
            배송지 정보
          </Typography>

          {addressType === "select" ? (
            /* 배송지 선택 모드 */
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {addressList.filter((addr) => addr.type === shippingType).length >
              0 ? (
                <>
                  {/* 가로 스크롤 주소 카드 영역 */}
                  <Box
                    ref={scrollContainerRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    sx={{
                      display: "flex",
                      overflowX: "auto",
                      overflowY: "hidden",
                      gap: "12px",
                      pb: "8px",
                      mb: "16px",
                      whiteSpace: "nowrap",
                      WebkitOverflowScrolling: "touch",
                      cursor: isDragging ? "grabbing" : "grab",
                      userSelect: "none",
                      "&::-webkit-scrollbar": {
                        display: "none",
                      },
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                  >
                    {addressList
                      .filter((addr) => addr.type === shippingType)
                      .map((address) => (
                        <Card
                          key={address.id}
                          sx={{
                            minWidth: "280px",
                            flexShrink: 0,
                            border:
                              address.isSelected ||
                              address.id === selectedAddress
                                ? "1px solid #3966AE"
                                : "1px solid #ECECED",
                            borderRadius: "1px",
                            cursor: "pointer",
                            position: "relative",
                          }}
                          onClick={(e) => handleCardClick(e, address.id)}
                        >
                          <CardContent sx={{ p: "16px" }}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: "10px",
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: "18px",
                                  fontWeight: 700,
                                  color: "#282930",
                                  mr: "8px",
                                }}
                              >
                                {address.name}
                              </Typography>
                              <Chip
                                label={
                                  address.type === "international"
                                    ? "해외배송"
                                    : "국내배송"
                                }
                                size="small"
                                sx={{
                                  backgroundColor: "#282930",
                                  color: "white",
                                  fontSize: "12px",
                                  height: "24px",
                                  borderRadius: "4px",
                                }}
                              />

                              {(address.isSelected ||
                                address.id === selectedAddress) && (
                                <Box
                                  sx={{
                                    ml: "auto",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px",
                                  }}
                                >
                                  <CustomCheckbox
                                    checked={
                                      address.isSelected ||
                                      address.id === selectedAddress
                                    }
                                    onChange={() =>
                                      handleAddressSelect(address.id)
                                    }
                                    label="배송지 선택"
                                    labelStyle={{
                                      fontSize: "12px",
                                      color: "#3966AE",
                                      fontWeight: 700,
                                    }}
                                  />
                                </Box>
                              )}
                            </Box>
                            <Typography
                              sx={{
                                fontSize: "14px",
                                color: "#282930",
                                mb: "8px",
                                fontWeight: 500,
                                lineHeight: "-0.14px",
                              }}
                            >
                              {address.address}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "14px",
                                color: "#282930",
                                mb: "12px",
                                fontWeight: 500,
                                lineHeight: "-0.14px",
                              }}
                            >
                              {address.phone}
                            </Typography>
                            <Button
                              onClick={() => {
                                navigator("/my_page/address/modify", {
                                  state: {
                                    id: address.id,
                                    type: "store",
                                  },
                                });
                              }}
                              variant="outlined"
                              size="small"
                              sx={{
                                padding: "4px 10px",
                                borderRadius: "4px",
                                backgroundColor: "#ECECED",
                                border: "1px solid #ECECED",
                                color: "#282930",
                                fontSize: "12px",
                                fontWeight: 500,
                                lineHeight: "-0.14px",
                              }}
                            >
                              수정
                            </Button>
                          </CardContent>
                        </Card>
                      ))}

                    {/* 새로운 배송지 등록 카드 (맨 마지막) */}
                    <Card
                      sx={{
                        width: "280px",
                        border: "1px solid #3966AE",
                        borderRadius: "1px",
                        cursor: "pointer",
                        backgroundColor: "white",
                        flexShrink: 0,
                      }}
                      onClick={() => {
                        navigator("/my_page/address/create", {
                          state: {
                            type: "store",
                          },
                        });
                        // 새로운 배송지 등록 페이지로 이동하거나 모달을 열기
                        // 여기에 적절한 핸들러를 추가하세요
                      }}
                    >
                      <CardContent
                        sx={{
                          p: "16px",
                          display: "flex",
                          flexDirection: "column",
                          height: "100%",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={"/images/icon/circle_button.svg"}
                          alt="plus"
                          style={{
                            width: "48px",
                            height: "48px",
                            alignSelf: "center",
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: "#282930",
                            textAlign: "center",
                            fontWeight: 500,
                            mt: "20px",
                          }}
                        >
                          새로운 배송지를 등록합니다.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                </>
              ) : (
                /* 등록된 배송지가 없을 때 */
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "40px 20px",
                    backgroundColor: "#F8F9FA",
                    borderRadius: "12px",
                    marginBottom: "16px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "16px",
                      color: "#61636C",
                      marginBottom: "20px",
                      textAlign: "center",
                    }}
                  >
                    등록된 배송지가 없습니다.
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#424242",
                      color: "white",
                      textTransform: "none",
                      fontSize: "14px",
                      padding: "12px 24px",
                      borderRadius: "8px",
                      "&:hover": {
                        backgroundColor: "#616161",
                      },
                    }}
                    onClick={() => {
                      navigator("/my_page/address/create", {
                        state: {
                          type: "store",
                        },
                      });
                    }}
                  >
                    배송지 추가
                  </Button>
                </Box>
              )}
            </Box>
          ) : (
            /* 직접 입력 모드 */
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Input
                dataList={countryList}
                value={directForm.country}
                setValue={(e) => handleDirectFormChange("country", e)}
                type="select"
                style={{ maxHeight: "48px", mb: "10px" }}
              />

              <TextFieldCustom
                fullWidth
                placeholder="성+이름(영문)"
                value={directForm.name}
                onChange={(e) => handleDirectFormChange("name", e.target.value)}
                sx={{ mb: "10px" }}
              />

              <TextFieldCustom
                fullWidth
                placeholder="우편번호 (postal code)"
                value={directForm.postalCode}
                onChange={(e) =>
                  handleDirectFormChange("postalCode", e.target.value)
                }
                sx={{ mb: "10px" }}
              />

              <TextFieldCustom
                fullWidth
                placeholder="도시(city)"
                value={directForm.city}
                onChange={(e) => handleDirectFormChange("city", e.target.value)}
                sx={{ mb: "10px" }}
              />

              <TextFieldCustom
                fullWidth
                placeholder="주 (province)"
                value={directForm.province}
                onChange={(e) =>
                  handleDirectFormChange("province", e.target.value)
                }
                sx={{ mb: "10px" }}
              />

              <TextFieldCustom
                fullWidth
                placeholder="우편번호 (Postal code)"
                value={directForm.postalCode2}
                onChange={(e) =>
                  handleDirectFormChange("postalCode2", e.target.value)
                }
                sx={{ mb: "10px" }}
              />

              <Box
                display="flex"
                flexDirection="row"
                width="100%"
                gap="8px"
                mb="10px"
              >
                <Input
                  label="-"
                  dataList={countryNumberList}
                  value={directForm.phonePrefix}
                  setValue={(e) => handleDirectFormChange("phonePrefix", e)}
                  type="select"
                  style={{ maxHeight: "48px", width: "100px" }}
                />
                <Input
                  label={""}
                  value={directForm.phoneNumber}
                  setValue={(e) => handleDirectFormChange("phoneNumber", e)}
                  type="text"
                  style={{ maxHeight: "48px", width: "220px" }}
                />
              </Box>
              <TextFieldCustom
                fullWidth
                placeholder="회사명(선택입력)"
                value={directForm.company}
                onChange={(e) =>
                  handleDirectFormChange("company", e.target.value)
                }
                sx={{ mb: "10px" }}
              />
              <TextFieldCustom
                fullWidth
                placeholder="Account NO 또는 TAX/CPF"
                value={directForm.accountNo}
                onChange={(e) =>
                  handleDirectFormChange("accountNo", e.target.value)
                }
                sx={{ mb: "10px" }}
              />
            </Box>
          )}

          {/* 안내 문구 */}
          {addressType === "select" &&
            addressList.filter((addr) => addr.type === shippingType).length >
              0 && (
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#282930",
                  mb: "24px",
                  fontWeight: 500,
                }}
              >
                * 등록한 배송지로 배송을 신청합니다.
              </Typography>
            )}
        </Box>
        {addressType === "direct" && shippingType === "international" && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                color: "#3966AE",
                textDecoration: "underline",
                cursor: "pointer",
                textAlign: "right",
              }}
            >
              배송사별 주의사항
            </Typography>
            {/* 배송사 선택 */}
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 700,
                color: "#282930",
                mb: "8px",
              }}
            >
              배송사
            </Typography>

            <Input
              label="-"
              dataList={deliveryCompanyList}
              value={deliveryCompany}
              setValue={(e) => setDeliveryCompany(e)}
              type="select"
              style={{ maxHeight: "48px", mb: "80px" }}
            />
          </Box>
        )}
      </Box>

      {/* 하단 버튼 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          bottom: "0px",
          height: "120px",
          position: "fixed",
          width: "330px",
          backgroundColor: "white",
          borderTop: "1px solid #ECECED",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "8px",
            width: "100%",
          }}
        >
          <OriginButton
            variant="outlined"
            onClick={() => {}}
            contents={
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#61636C",
                }}
              >
                이전 단계로
              </Typography>
            }
            style={{
              height: "48px",
              borderRadius: "1px",
              padding: "8px",
              width: "130px",
            }}
          />
          <OriginButton
            variant="contained"
            onClick={() => {
              // 배송지 선택 모드일 때 선택한 주소 ID 전달
              if (addressType === "select" && selectedAddress) {
                navigator("/store/delivery/service", {
                  state: {
                    ...(location.state || {}),
                    addressId: selectedAddress,
                    shippingType: shippingType,
                  },
                });
              } else if (addressType === "direct") {
                // 직접 입력 모드일 때 입력한 주소 정보 전달
                navigator("/store/delivery/service", {
                  state: {
                    ...(location.state || {}),
                    directAddress: directForm,
                    shippingType: shippingType,
                    deliveryCompany:
                      shippingType === "international" ? deliveryCompany : null,
                  },
                });
              }
            }}
            fullWidth
            contents={
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "white",
                }}
              >
                다음 [1/4]
              </Typography>
            }
            style={{
              height: "48px",
              borderRadius: "1px",
              padding: "8px",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default DeliveryAddress;
