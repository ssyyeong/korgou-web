import React, { useEffect } from "react";

import { Box, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

interface IAccordianBoxProps {
  title: any; //위에 나올 컨텐츠
  constents: any; //아래에 나올 컨텐츠
  openAccordian?: boolean;
}

const AccordianBox = (props: IAccordianBoxProps) => {
  //* State
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (props.openAccordian !== undefined) {
      setOpen(props.openAccordian);
    }
  }, [props.openAccordian]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: open ? "" : "center",
        width: "100%",
        borderBottom: "1px solid #E5E5E5",
        px: "16px",
        pb: "16px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => {
            if (props?.openAccordian !== undefined) {
              setOpen(props.openAccordian);
            } else setOpen(!open);
          }}
        >
          {props.title}
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Box>
        {open && props.constents}
      </Box>
    </Box>
  );
};

export default AccordianBox;
