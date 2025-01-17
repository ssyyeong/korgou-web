import React from "react";
import { useNavigate } from "react-router-dom";

import { Box, Typography, TypographyProps } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

interface IHeaderProps {
  back?: boolean;
  title?: string;
  styles?: TypographyProps;
  icon?: any;
}

const Header = (props: IHeaderProps) => {
  const navigate = useNavigate();

  return (
    <Box
      width={"100%"}
      bgcolor={"white"}
      display={"flex"}
      height={"10px"}
      flexDirection={"row"}
      sx={{
        paddingBlock: 3,
      }}
      zIndex={1000}
    >
      <Box display={"flex"} width={props.icon && "100%"}>
        {props.back !== false && (
          <ArrowBackIosNewIcon
            sx={{
              cursor: "pointer",
              color: "#B1B2B6",
              width: "15px",
              height: "15px",
            }}
            onClick={() => {
              navigate(-1);
            }}
          />
        )}
      </Box>
      <Box
        display={"flex"}
        sx={{
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Typography
          {...props.styles}
          sx={{
            fontSize: "18px",
            fontWeight: 700,
            color: "#282930",
          }}
        >
          {props.title}
        </Typography>
      </Box>
      {props.icon && (
        <Box
          display={"flex"}
          sx={{
            width: "100%",
            justifyContent: "center",
          }}
        >
          {props.icon}
        </Box>
      )}
    </Box>
  );
};

export default Header;
