import * as React from "react";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

interface DropDownProps {
  value: string;
  items: string[];
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleClose: (item: string) => void;
  anchorEl: null | HTMLElement;
}

export default function DropDown(props: DropDownProps) {
  return (
    <>
      <Button
        id="demo-customized-button"
        aria-controls={
          Boolean(props.anchorEl) ? "demo-customized-menu" : undefined
        }
        aria-haspopup="true"
        aria-expanded={Boolean(props.anchorEl) ? "true" : undefined}
        variant="outlined"
        disableElevation
        onClick={props.handleClick}
        endIcon={<KeyboardArrowDownOutlinedIcon />}
        sx={{
          border: 0,
          fontSize: "12px",
          color: "#61636C",
        }}
      >
        {props.value}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={props.anchorEl}
        open={Boolean(props.anchorEl)}
        onClose={() => props.handleClose("")}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {props.items.map((item) => (
          <MenuItem onClick={() => props.handleClose(item)}>{item}</MenuItem>
        ))}
      </Menu>
    </>
  );
}
