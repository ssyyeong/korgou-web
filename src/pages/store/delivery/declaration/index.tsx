import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import Header from "../../../../components/Header/Header";
import Input from "../../../../components/Input";
import { useAppMember } from "../../../../hooks/useAppMember";
import ControllerAbstractBase from "../../../../controller/Controller";
import OriginButton from "../../../../components/Button/OriginButton";
import { useNavigate } from "react-router-dom";
import TextFieldCustom from "../../../../components/TextField";
import MultiImageUploader from "../../../../components/MultiImageUploader";

interface DeclarationItem {
  id: string;
  contents: string;
  quantity: string;
  amount: string;
  images: File[];
}

const DeliveryDeclaration = () => {
  const navigator = useNavigate();
  const { memberCode } = useAppMember();

  // 저장된 신고서 목록
  const [savedItems, setSavedItems] = useState<DeclarationItem[]>([]);

  // 현재 작성 중인 폼 데이터
  const [currentForm, setCurrentForm] = useState<DeclarationItem>({
    id: "",
    contents: "",
    quantity: "",
    amount: "",
    images: [],
  });

  // 폼 표시 모드 (true: 폼 표시, false: 목록만 표시)
  const [showForm, setShowForm] = useState(true);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length + currentForm.images.length <= 5) {
      const validFiles = files.filter((file) => file.size <= 2 * 1024 * 1024); // 2MB 이하
      setCurrentForm((prev) => ({
        ...prev,
        images: [...prev.images, ...validFiles],
      }));
    } else {
      alert("최대 5장까지 업로드 가능합니다.");
    }
  };

  const handleRemoveImage = (index: number) => {
    setCurrentForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleFormChange = (field: keyof DeclarationItem, value: any) => {
    setCurrentForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (!currentForm.contents || !currentForm.quantity || !currentForm.amount) {
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }

    const newItem: DeclarationItem = {
      ...currentForm,
      id: Date.now().toString(),
    };

    setSavedItems((prev) => [...prev, newItem]);

    // 폼 초기화
    setCurrentForm({
      id: "",
      contents: "",
      quantity: "",
      amount: "",
      images: [],
    });

    // 목록 모드로 전환
    setShowForm(false);
  };

  const handleAdd = () => {
    setShowForm(true);
  };

  const handleModify = (item: DeclarationItem) => {
    setCurrentForm(item);
    setShowForm(true);
  };

  const handleDelete = (itemId: string) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleNext = () => {
    if (savedItems.length === 0) {
      alert("최소 하나의 신고서를 작성해주세요.");
      return;
    }
    // 다음 단계로 이동
    navigator("/store/delivery/next-step");
  };

  const handleCancel = () => {
    // 이전 단계로 이동
    navigator("/store/delivery/service");
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
      <Header title={"배송 요청[신고서 작성]"} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          mt: "20px",
          gap: "16px",
          overflowY: "auto",
          pb: "140px", // 하단 버튼 공간 확보
        }}
      >
        {/* 저장된 신고서 목록 */}
        {savedItems.map((item, index) => (
          <Box>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 700,
                color: "#3966AE",
                mb: "12px",
              }}
            >
              내용물 ({index + 1})
            </Typography>
            <Card
              key={item.id}
              sx={{
                backgroundColor: "#F8F9FA",
                borderRadius: "8px",
                border: "1px solid #ECECED",
              }}
            >
              <CardContent sx={{ p: "10px 16px" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    mb: "10px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#61636C",
                      fontWeight: 500,
                    }}
                  >
                    내용물 정보
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#282930",
                    }}
                  >
                    {item.contents}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    mb: "10px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#61636C",
                      fontWeight: 500,
                    }}
                  >
                    수량 정보
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#282930",
                    }}
                  >
                    {item.quantity}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    mb: "10px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#61636C",
                      fontWeight: 500,
                    }}
                  >
                    금액 정보
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#282930",
                    }}
                  >
                    {item.amount}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    gap: "8px",
                    flexDirection: "row",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                  }}
                >
                  <OriginButton
                    variant="outlined"
                    onClick={() => handleModify(item)}
                    color="#ECECED"
                    contents={
                      <Typography
                        sx={{
                          fontSize: "12px",
                          fontWeight: 500,
                          color: "#2E2F37",
                        }}
                      >
                        수정
                      </Typography>
                    }
                    style={{
                      height: "24px",
                      borderRadius: "4px",
                      padding: "4px 10px",
                      border: "1px solid #ECECED",
                    }}
                  />
                  <OriginButton
                    variant="contained"
                    onClick={() => handleDelete(item.id)}
                    color="#282930"
                    contents={
                      <Typography
                        sx={{
                          fontSize: "12px",
                          fontWeight: 500,
                          color: "white",
                        }}
                      >
                        삭제
                      </Typography>
                    }
                    style={{
                      height: "24px",
                      borderRadius: "4px",
                      padding: "4px 10px",
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}

        {/* 신고서 작성 폼 */}
        {showForm && (
          <Card
            sx={{
              backgroundColor: "#F8F9FA",
              borderRadius: "8px",
              border: "1px solid #ECECED",
            }}
          >
            <CardContent sx={{ p: "16px" }}>
              {/* 내용물 정보 */}
              <Box sx={{ mb: "16px" }}>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#2E2F37",
                    mb: "8px",
                  }}
                >
                  내용물 정보
                </Typography>
                <TextFieldCustom
                  fullWidth
                  value={currentForm.contents}
                  onChange={(e) => handleFormChange("contents", e.target.value)}
                  placeholder="1자 이상 15자 이하 입력"
                  sx={{
                    mb: "4px",
                    "& .MuiInputBase-root": {
                      height: "48px",
                      border: "1px solid #ECECED",
                      borderRadius: "1px",
                    },
                  }}
                />
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "#919298",
                    fontWeight: 500,
                  }}
                >
                  물품에 대한 정보를 입력합니다
                </Typography>
              </Box>

              {/* 수량 정보 */}
              <Box sx={{ mb: "16px" }}>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#2E2F37",
                    mb: "8px",
                  }}
                >
                  수량 정보
                </Typography>
                <TextFieldCustom
                  fullWidth
                  value={currentForm.quantity}
                  onChange={(e) => {
                    const value = e.target.value;
                    // 숫자와 쉼표만 허용
                    if (/^[0-9,]*$/.test(value)) {
                      handleFormChange("quantity", value);
                    }
                  }}
                  placeholder="수량 입력 (ex. 1,2,3)"
                  sx={{
                    mb: "4px",
                    "& .MuiInputBase-root": {
                      height: "48px",
                      border: "1px solid #ECECED",
                      borderRadius: "1px",
                    },
                  }}
                />
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "#61636C",
                    fontWeight: 500,
                  }}
                >
                  물품에 대한 수량을 입력합니다.
                </Typography>
              </Box>

              {/* 금액 정보 */}
              <Box sx={{ mb: "16px" }}>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#2E2F37",
                    mb: "8px",
                  }}
                >
                  금액 정보
                </Typography>
                <TextFieldCustom
                  fullWidth
                  value={currentForm.amount}
                  onChange={(e) => {
                    const value = e.target.value;
                    // 숫자만 허용
                    if (/^[0-9]*$/.test(value)) {
                      handleFormChange("amount", value);
                    }
                  }}
                  placeholder="0원 입력 불가 (ex. USD 150)"
                  sx={{
                    mb: "4px",
                    "& .MuiInputBase-root": {
                      height: "48px",
                      border: "1px solid #ECECED",
                      borderRadius: "1px",
                    },
                  }}
                />
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "#61636C",
                    fontWeight: 500,
                  }}
                >
                  물품에 대한 총 비용을 입력합니다.
                </Typography>
              </Box>

              {/* 사실확인 인증이미지 */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  mb: "16px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#2E2F37",
                    mb: "10px",
                  }}
                >
                  사실확인 인증이미지
                </Typography>
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "#61636C",
                    fontWeight: 500,
                  }}
                >
                  • 구매 영수증, 거래내역/실물사진 등
                </Typography>
                <Divider sx={{ borderColor: "#ECECED", my: "10px" }} />
                <MultiImageUploader
                  images={currentForm.images}
                  setImages={(images) => handleFormChange("images", images)}
                  handleRemoveImage={handleRemoveImage}
                  handleImageUpload={handleImageUpload}
                  width="70px"
                  height="70px"
                  backgroundColor="#fff"
                  maxCount={5}
                />
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "#61636C",
                    fontWeight: 500,
                    mt: "10px",
                  }}
                >
                  • 이미지는 2MB이하 5장까지 업로드 가능합니다.
                </Typography>
              </Box>

              {/* 저장 버튼 */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <OriginButton
                  variant="contained"
                  onClick={handleSave}
                  contents={
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: 500,
                        color: "white",
                      }}
                    >
                      저장
                    </Typography>
                  }
                  style={{
                    height: "24px",
                    borderRadius: "4px",
                    padding: "4px 10px",
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        )}

        {/* Add 버튼 */}
        <OriginButton
          variant="contained"
          onClick={handleAdd}
          color="#282930"
          contents={
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 700,
                color: "white",
              }}
            >
              + add
            </Typography>
          }
          style={{
            borderRadius: "4px",
            padding: "8px",
          }}
        />

        {/* 신고서 작성 유의사항 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              color: "#282930",
            }}
          >
            <strong>[신고서 작성 유의사항]</strong>
            <br />
            • 상품 당 내용물에 대한 정보를 별도로 입력해주세요.
            <br />
            • 관련 정보를 입력하지 않으면 배송이 처리되지 않습니다.
            <br />• 내용물 정보는 "상품" 또는 "선물"과 같은 이름 모를 항목으로
            입력할 수 없습니다.
          </Typography>
        </Box>
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
                취소
              </Typography>
            }
            style={{
              height: "48px",
              borderRadius: "1px",
              padding: "8px",
              width: "44px",
              border: "1px solid #B1B2B6",
            }}
          />
          <OriginButton
            variant="contained"
            onClick={() => {}}
            fullWidth
            contents={
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "white",
                }}
              >
                다음 [3/4]
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

export default DeliveryDeclaration;
