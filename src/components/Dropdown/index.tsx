import React from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

interface SimpleDropdownProps {
  items: string[];
  selectedItem: string;
  onSelect: (selectedItem: string) => void;
}
export default function SimpleDropdown(props: SimpleDropdownProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // 버튼 클릭 시 메뉴 표시
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // 메뉴 닫기 및 항목 선택 처리
  const handleClose = (selectedItem?: string) => {
    setAnchorEl(null);
    if (selectedItem) {
      if (props.onSelect) {
        props.onSelect(selectedItem);
      }
    }
  };

  return (
    <>
      <Button
        onClick={handleClick}
        sx={{
          color: "#61636C",
          backgroundColor: "transparent",
          fontSize: "14px",
          textTransform: "none", // 대문자 변환 방지
          padding: 0, // 기본 패딩 제거
          minWidth: 0, // 버튼 최소 너비 제거
          display: "flex",
          alignItems: "center",
        }}
      >
        {props.selectedItem}
        <KeyboardArrowDownOutlinedIcon sx={{ fontSize: "14px" }} />
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {props.items.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => handleClose(item)}
            sx={{
              fontSize: "14px",
              color: "#282930",
            }}
          >
            {item}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
