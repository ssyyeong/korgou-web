import React from "react";
import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import { useTranslation } from "react-i18next";
import OriginButton from "../../../../components/Button/OriginButton";
import CustomCheckbox from "../../../../components/Button/CustomCheckbox";
interface AddressCardProps {
  item: any;
  name: string;
  type: string;
  isDefault: boolean;
  setIsDefault: (value: boolean) => void;
  address: string;
  phone: string;
  onClick: (id: number) => void;
}

const AddressCard = (props: AddressCardProps) => {
  const { t } = useTranslation();
  return (
    <Card
      sx={{
        mb: "10px",
        backgroundColor: "#F8FAFC",
        border: props.isDefault ? "1px solid #3966AE" : "1px solid #F5F5F5",
        borderRadius: "0px",
        paddingX: "16px",
        paddingTop: "16px",
      }}
    >
      <CardContent sx={{ padding: "0px" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" flexDirection="row" gap="8px" alignItems="center">
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 700,
              }}
            >
              {props.name}
            </Typography>
            {props.type === "FOREIGN" ? (
              <Chip
                label={t("delivery.type.overseas")}
                sx={{
                  fontSize: 12,
                  color: "white",
                  backgroundColor: "#282930",
                  borderRadius: "4px",
                  height: "24px",
                }}
              />
            ) : (
              <Chip
                label={t("delivery.type.domestic")}
                color="default"
                size="small"
                sx={{
                  fontSize: 12,
                  color: "white",
                  backgroundColor: "#282930",
                  borderRadius: "4px",
                  height: "24px",
                }}
              />
            )}
          </Box>
          <Box display="flex" alignItems={"center"} gap="3px">
            <CustomCheckbox
              checked={props.isDefault}
              onChange={() => props.setIsDefault(!props.isDefault)}
              label={t("delivery_address.default_delivery_address")}
              labelStyle={{
                fontSize: "12px",
                fontWeight: 700,
                color: props.isDefault ? "#3966AE" : "#282930",
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            height: "63px",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              color: "#282930",
              my: "10px",
            }}
          >
            {props.address}
          </Typography>
        </Box>

        <Typography
          sx={{
            fontSize: "14px",
            color: "#282930",
            mb: "10px",
          }}
        >
          {props.phone}
        </Typography>
        <OriginButton
          variant="contained"
          color="#ECECED"
          style={{
            height: "24px",
            borderRadius: "4px",
            minWidth: "41px",
            padding: "4px 10px",
            boxShadow: "none",
          }}
          onClick={() => {
            props.onClick(props.item.ADDRESS_IDENTIFICATION_CODE);
          }}
          contents={
            <Typography fontSize={12} color="#2E2F37">
              수정
            </Typography>
          }
        />
      </CardContent>
    </Card>
  );
};

export default AddressCard;
