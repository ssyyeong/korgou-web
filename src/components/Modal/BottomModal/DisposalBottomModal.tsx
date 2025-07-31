import { Box, Divider, IconButton, Typography } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";

import BottomModal from "./BottomModal";
import TextFieldCustom from "../../TextField";
import MultiImageUploader from "../../MultiImageUploader";
import CustomCheckbox from "../../Button/CustomCheckbox";

interface IDisposalBottomModalProps {
  bottomModalOpen: boolean;
  setBottomModalOpen: (value: boolean) => void;
  checkedOrders: any[];
  isProductExpanded: boolean;
  setIsProductExpanded: (value: boolean) => void;
  otherRequests: string;
  handleOtherRequestsChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  charCount: number;
  maxCharCount: number;
  isConfirmed: boolean;
  setIsConfirmed: (value: boolean) => void;
}

const DisposalBottomModal = (props: IDisposalBottomModalProps) => {
  return (
    <BottomModal
      title={
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: "24px 16px 0 16px",
            gap: "20px",
          }}
        >
          <IconButton
            onClick={() => props.setBottomModalOpen(false)}
            sx={{
              position: "absolute",
              right: "16px",
              top: "16px",
              color: "#B1B2B6",
            }}
          >
            <CloseIcon />
          </IconButton>
          {/* 헤더 */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: "16px",
            }}
          >
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#282930",
              }}
            >
              디스포절&스플릿 서비스
            </Typography>
          </Box>

          {/* 요청 상품 */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: "12px",
                cursor: "pointer",
              }}
              onClick={() =>
                props.setIsProductExpanded(!props.isProductExpanded)
              }
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#282930",
                }}
              >
                요청 상품({props.checkedOrders.length})
              </Typography>
              <KeyboardArrowUp
                sx={{
                  transform: props.isProductExpanded
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                  transition: "transform 0.3s",
                  color: "#B1B2B6",
                  fontSize: "20px",
                }}
              />
            </Box>
            {props.isProductExpanded &&
              props.checkedOrders.map((order) => (
                <>
                  <Box
                    sx={{
                      borderTop: "1px solid #E5E7EB",
                      display: "flex",
                      flexDirection: "column",
                      pt: "10px",
                      mb: "4px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#61636C",
                      }}
                    >
                      패키지번호 {order.PACKAGE_ID}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#282930",
                        fontWeight: 500,
                      }}
                    >
                      {order.CONTENTS}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#282930",
                        fontWeight: 500,
                      }}
                    >
                      무게(g)
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#EB1F81",
                        fontWeight: 500,
                      }}
                    >
                      {order.WEIGHT}
                    </Typography>
                  </Box>
                </>
              ))}
          </Box>

          {/* 요청 사항 */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 700,
                color: "#2E2F37",
                mb: "8px",
              }}
            >
              요청 사항
            </Typography>
            <TextFieldCustom
              fullWidth
              value={props.otherRequests}
              type="otherRequests"
              onChange={props.handleOtherRequestsChange}
              multiline
              rows={5}
              placeholder="상세 요청사항을 작성 해주세요."
              sx={{
                mb: "4px",
                "& .MuiInputBase-root": {
                  height: "160px",
                  border: "1px solid #ECECED",
                  borderRadius: "1px",
                },
              }}
              placeholderFontSize="16px"
            />
            <Typography
              sx={{
                textAlign: "right",
                fontSize: "12px",
                color: "#919298",
                fontWeight: 500,
              }}
            >
              {props.charCount}/{props.maxCharCount}
            </Typography>
          </Box>

          {/* 포토 업로드 */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 700,
                color: "#282930",
              }}
            >
              포토 업로드
            </Typography>
            <Divider
              sx={{
                color: "#ECECED",
                borderWidth: "1px",
                my: "10px",
                width: "100%",
                alignSelf: "center",
              }}
            />
            <Box
              sx={{
                display: "flex",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              <MultiImageUploader
                images={[]}
                setImages={() => {}}
                handleRemoveImage={() => {}}
                handleImageUpload={() => {}}
                width="70px"
                height="70px"
                maxCount={5}
              />
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                color: "#61636C",
                mt: "10px",
                fontWeight: 500,
              }}
            >
              • 이미지는 2MB이하 5장까지 업로드 가능합니다.
            </Typography>
          </Box>

          {/* 디스포절 정책 */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 700,
                color: "#282930",
              }}
            >
              디스포절
            </Typography>
            <Divider
              sx={{
                color: "#ECECED",
                borderWidth: "1px",
                my: "10px",
                width: "100%",
                alignSelf: "center",
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                mb: "32px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "#61636C",
                  lineHeight: "130%",
                  fontWeight: 500,
                }}
              >
                • 선택 상품을 나의 창고에서 폐기 또는 부분폐기 합니다.
                <br /> • 폐기 동의 후 요청시 즉시 폐기처리 되며, 취소는
                불가합니다.
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: "16px",
                borderRadius: "10px",
                backgroundColor: "#F8FAFC",
                width: "328px",
                height: "48px",
                pl: "16px",
              }}
            >
              <CustomCheckbox
                checked={props.isConfirmed}
                onChange={() => props.setIsConfirmed(!props.isConfirmed)}
                label="상품 분류 및 폐기에 동의"
                labelStyle={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#282930",
                }}
              />
            </Box>
          </Box>
        </Box>
      }
      bottomModalOpen={props.bottomModalOpen}
      setBottomModalOpen={() => {
        props.setBottomModalOpen(true);
      }}
      handleClose={() => {
        props.setBottomModalOpen(false);
      }}
      btnText={"요청하기"}
      btnClick={() => {
        // 요청 처리 로직
        props.setBottomModalOpen(false);
      }}
    />
  );
};

export default DisposalBottomModal;
