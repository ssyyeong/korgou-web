import React from "react";
import { useNavigate } from "react-router-dom";

import { Box, Typography, TypographyProps } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

interface IHeaderProps {
  back?: boolean;
  title?: string;
  adornment?: React.ReactNode;
  styles?: TypographyProps;
  logout?: boolean;
  backpath?: string;
}

const Header = (props: IHeaderProps) => {
  const navigate = useNavigate();

  return (
    <Box
      width={"100%"}
      bgcolor={"white"}
      display={"flex"}
      height={"10px"}
      alignItems={"center"}
      sx={{
        paddingBlock: 4,
      }}
      zIndex={1000}
    >
      <Box display={"flex"}>
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
          width: "100%",
          justifyContent: "center",
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
    </Box>
  );
};

export default Header;
