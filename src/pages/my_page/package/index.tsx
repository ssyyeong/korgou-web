import React, { useState } from "react";
import { Box, Divider, Typography } from "@mui/material";
import Header from "../../../components/Header/Header";
import OriginButton from "../../../components/Button/OriginButton";
import Input from "../../../components/Input";
import TextFieldCustom from "../../../components/TextField";
import AlertModal from "../../../components/Modal/AlertModal";
import { useTranslation } from "react-i18next";
import ControllerAbstractBase from "../../../controller/Controller";
import { unidentifiedPackageCourierData } from "../../../configs/data/UnidentifiedPackageCourierConfig";
import UnidentifiedPackageAuthModal from "../../../components/Modal/UnidentifiedPackageAuthModal";
import { useNavigate } from "react-router-dom";

const Package = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [courier, setCourier] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [unidentifiedPackageList, setUnidentifiedPackageList] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [
    unidentifiedPackageAuthModalOpen,
    setUnidentifiedPackageAuthModalOpen,
  ] = useState(false);

  const handleSearch = () => {
    const controller = new ControllerAbstractBase({
      modelName: "UnidentifiedPackage",
      modelId: "unidentified_package",
    });

    controller
      .findAll({
        TRACKING_NUMBER: trackingNumber,
      })
      .then((res) => {
        if (res.result.rows.length > 0) {
          setUnidentifiedPackageList(res.result.rows);
          setIsSearch(true);
        } else {
          setUnidentifiedPackageList([]);
          setIsSearch(false);
          setModalOpen(true);
        }
      });
  };

  const authPackage = (item: any) => {};

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

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
      <Header title="" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "16px",
          mt: "100px",
          mb: "32px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          fontSize={16}
          fontWeight={700}
          sx={{
            fontSize: "24px",
            mb: "10px",
            fontWeight: 700,
          }}
        >
          {t("unidentified_package.title")}
        </Typography>
        <Typography
          fontSize={16}
          textAlign={"center"}
          sx={{
            fontSize: "14px",
            color: "#61636C",
          }}
        >
          {t("unidentified_package.description")}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          px: "16px",
          py: "20px",
          bgcolor: "#F5F5F5",
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", gap: "2px", mb: "8px" }}
        >
          <Typography
            fontSize={16}
            fontWeight={700}
            sx={{
              fontSize: "14px",
              color: "#2E2F37",
              fontWeight: 700,
            }}
          >
            {t("unidentified_package.delivery_company")}
          </Typography>
          <Typography
            sx={{ color: "#EB1F81", fontSize: "14px", fontWeight: 700 }}
          >
            *
          </Typography>
        </Box>
        <Input
          dataList={unidentifiedPackageCourierData}
          value={courier}
          setValue={setCourier}
          type="select"
          style={{ mb: "20px", maxHeight: "48px" }}
          additionalProps={{
            MenuProps: {
              PaperProps: {
                style: {
                  width: "120px",
                  maxHeight: 300,
                  marginTop: "8px",
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                },
              },
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "left",
              },
            },
          }}
        />
        <Box
          sx={{ display: "flex", alignItems: "center", gap: "2px", mb: "8px" }}
        >
          <Typography
            fontSize={14}
            fontWeight={700}
            sx={{
              fontSize: "14px",
            }}
          >
            {t("unidentified_package.tracking_number")}
          </Typography>
          <Typography
            sx={{ color: "#EB1F81", fontSize: "14px", fontWeight: 700 }}
          >
            *
          </Typography>
        </Box>
        <TextFieldCustom
          fullWidth
          value={trackingNumber}
          type="shoppingMallUrl"
          sx={{
            mb: "10px",
          }}
          onChange={(e) => {
            setTrackingNumber(e.target.value);
          }}
          placeholder={t("unidentified_package.tracking_number_description")}
        />
      </Box>
      {!isSearch ? (
        <OriginButton
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSearch}
          contents={
            <Typography fontSize={16} fontWeight={700}>
              조회하기
            </Typography>
          }
          style={{ marginTop: "16px", padding: "16px 8px", height: "48px" }}
        />
      ) : (
        <OriginButton
          fullWidth
          variant="outlined"
          onClick={handleSearch}
          contents={
            <Typography fontSize={16} fontWeight={700}>
              재검색
            </Typography>
          }
          style={{
            marginTop: "16px",
            padding: "16px 8px",
            height: "48px",
            borderColor: "#3966AE",
            color: "#3966AE",
          }}
        />
      )}
      <OriginButton
        fullWidth
        variant="contained"
        color="#282930"
        onClick={() => {
          navigate("/my_page/package/history");
        }}
        contents={
          <Typography fontSize={16} fontWeight={700}>
            히스토리
          </Typography>
        }
        style={{ marginTop: "16px", padding: "16px 8px", height: "48px" }}
      />
      {unidentifiedPackageList.length > 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: "32px",
            pb: "80px",
          }}
        >
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#3966AE",
            }}
          >
            {courier} {trackingNumber}에 대한 검색 결과(
            {unidentifiedPackageList.length})
          </Typography>
          {unidentifiedPackageList.map((item) => (
            <Box
              key={item.UNIDENTIFIED_PACKAGE_IDENTIFICATION_CODE}
              sx={{
                display: "flex",
                flexDirection: "column",
                my: "10px",
                gap: "10px",
              }}
            >
              <Divider sx={{ borderColor: "#ECECED" }} />

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
                    fontSize: "14px",
                    color: "#61636C",
                  }}
                >
                  Arrival date
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#282930",
                    fontWeight: 700,
                  }}
                >
                  {formatDate(item.CREATED_AT)}
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
                    fontSize: "14px",
                    color: "#61636C",
                  }}
                >
                  Courier
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#282930",
                    fontWeight: 700,
                  }}
                >
                  {item.COURIER}
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
                    fontSize: "14px",
                    color: "#61636C",
                  }}
                >
                  Tracking number
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#282930",
                    fontWeight: 700,
                  }}
                >
                  {item.TRACKING_NUMBER}
                </Typography>
              </Box>
              <Divider sx={{ borderColor: "#ECECED" }} />
            </Box>
          ))}
          <OriginButton
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => {
              setUnidentifiedPackageAuthModalOpen(true);
            }}
            contents={
              <Typography fontSize={16} fontWeight={700}>
                내 물건 인증하기
              </Typography>
            }
            style={{ marginTop: "16px", padding: "16px 8px", height: "48px" }}
          />
        </Box>
      )}
      <AlertModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        contents={
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              gap: "10px",
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                color: "#282930",
                fontWeight: 700,
              }}
            >
              안내
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#61636C",
              }}
            >
              조회되는 미확인 패키지가 없습니다.
            </Typography>
          </Box>
        }
        button1={{
          text: "확인",
          onClick: () => {
            setModalOpen(false);
          },
          color: "#282930",
        }}
      />
      <UnidentifiedPackageAuthModal
        packageId={
          unidentifiedPackageList[0]?.UNIDENTIFIED_PACKAGE_IDENTIFICATION_CODE
        }
        courier={courier}
        trackingNumber={trackingNumber}
        arrivalDate={formatDate(unidentifiedPackageList[0]?.CREATED_AT)}
        open={unidentifiedPackageAuthModalOpen}
        onClose={() => {
          setUnidentifiedPackageAuthModalOpen(false);
        }}
        onAuth={() => {
          setUnidentifiedPackageAuthModalOpen(false);
        }}
      />
    </Box>
  );
};

export default Package;
