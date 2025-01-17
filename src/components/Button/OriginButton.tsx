import React from "react";
import { Button, ButtonProps, SxProps } from "@mui/material";

interface OriginButtonProps {
  /**
   * 버튼 내용
   */
  contents: any;
  /**
   * 버튼 클릭 핸들러
   */
  onClick: (config?: any) => void;
  /**
   * 버튼 비활성화 여부
   */
  disabled?: boolean;
  /**
   * 버튼 컬러
   */
  color?: string;
  /**
   * 버튼 전체 너비
   */
  fullWidth?: boolean;
  /**
   * 버튼 타입
   */
  variant?: "text" | "outlined" | "contained" | undefined;
  /**
   * 버튼 내부 padding 제거 여부
   */
  disabledGutters?: boolean;
  /**
   * 버튼 스타일
   */
  style?: SxProps;
  /**
   * mui 버튼 속성
   */
  muiButtonProps?: ButtonProps;
}

const OriginButton = (props: OriginButtonProps) => {
  return (
    <Button
      fullWidth={props.fullWidth}
      variant={props.variant}
      onClick={props.onClick}
      sx={{
        padding: props.disabledGutters ? "0px" : "17px 16px",
        height: "48px",
        ...props.style,
        backgroundColor: props.color,
        "&.MuiButton-root:hover": { bgcolor: props.color },
        "&.MuiButton-root:active": { bgcolor: "transparent" },
      }}
      disabled={props.disabled}
      {...props.muiButtonProps}
    >
      {props.contents}
    </Button>
  );
};

export default OriginButton;
