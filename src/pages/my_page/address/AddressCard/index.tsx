import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Checkbox,
  Box,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

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
  return (
    <Card
      sx={{
        mb: "10px",
        backgroundColor: "#F5F5F5",
        borderRadius: "1px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
        border: props.isDefault ? "1px solid #3966AE" : "1px solid #F5F5F5",
      }}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            mb: "10px",
          }}
        >
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
                label="해외배송"
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
                label="국내배송"
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
            <Checkbox
              checked={props.isDefault}
              onChange={() => props.setIsDefault(!props.isDefault)}
              sx={{
                width: "16px",
                height: "16px",
                borderColor: props.isDefault ? "primary" : "#B1B2B6",
              }}
            />
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 700,
                color: props.isDefault ? "primary" : "#282930",
              }}
            >
              기본 배송지
            </Typography>
          </Box>
        </Box>

        <Typography
          sx={{
            fontSize: "14px",
            color: "#282930",
            mb: "10px",
          }}
        >
          {props.address}
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            color: "#282930",
            mb: "10px",
          }}
        >
          {props.phone}
        </Typography>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#ECECED",
            color: "black",
            fontSize: "12px",
            borderRadius: "4px",
          }}
          onClick={() => {
            props.onClick(props.item.ADDRESS_IDENTIFICATION_CODE);
          }}
        >
          수정
        </Button>
      </CardContent>
    </Card>
  );
};

export default AddressCard;
