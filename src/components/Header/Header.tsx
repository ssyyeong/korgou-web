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
      height={"56px"}
      display={"flex"}
      flexDirection={"row"}
      sx={{
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
      zIndex={1000}
    >
      <Box
        display={"flex"}
        sx={{
          position: "absolute",
          left: "0px",
          cursor: "pointer",
        }}
        onClick={() => props.back !== false && navigate(-1)} // Box에 onClick 이벤트 추가
      >
        {props.back !== false && (
          <ArrowBackIosNewIcon
            sx={{
              color: "#B1B2B6",
              width: "15px",
              height: "15px",
            }}
          />
        )}
      </Box>
      <Box
        display={"flex"}
        sx={{
          justifyContent: "center",
          position: "absolute",
          alignItems: "center",
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
            justifyContent: "end",
            display: "flex",
          }}
        >
          {props.icon}
        </Box>
      )}
    </Box>
  );
};

export default Header;
