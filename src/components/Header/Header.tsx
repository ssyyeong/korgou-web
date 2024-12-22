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
      width={"360px"}
      bgcolor={"white"}
      display={"flex"}
      height={"10px"}
      alignItems={"center"}
      sx={{
        paddingBlock: 4,
      }}
      zIndex={1000}
    >
      <Box display={"flex"} alignItems={"center"} pl={1} width={"20%"}>
        {props.back !== false && (
          <ArrowBackIosNewIcon
            sx={{
              cursor: "pointer",
              color: "#B1B2B6",
              width: 20,
              height: 20,
              pl: 2,
            }}
            onClick={() => {
              navigate(-1);
            }}
          />
        )}
      </Box>
      <Box
        display={"flex"}
        alignItems={"center"}
        width={"60%"}
        justifyContent={"center"}
      >
        <Typography {...props?.styles}>{props.title}</Typography>
      </Box>
    </Box>
  );
};

export default Header;
