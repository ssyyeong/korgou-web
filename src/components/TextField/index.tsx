import { SxProps, TextField } from "@mui/material";

interface ITextFieldCustomProps {
  /**
   * 텍스트 필드의 placeholder
   */
  placeholder?: string;
  /**
   * 텍스트 필드의 value
   */
  value: string;
  /**
   * 텍스트 필드의 value 변경 핸들러
   */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * 텍스트 필드의 type
   */
  type?: string;
  /**
   * 텍스트 필드의 error 여부
   */
  error?: boolean;
  /**
   * 텍스트 필드의 error message
   */
  helperText?: string;
  /**
   * 텍스트 필드의 fullWidth 여부
   */
  fullWidth?: boolean;
  /**
   * 텍스트 필드의 variant
   */
  variant?: "standard" | "outlined" | "filled";
  /**
   * 텍스트 필드의 스타일
   */
  sx?: SxProps;

  multiline?: boolean;

  rows?: number;
}

const TextFieldCustom = (props: ITextFieldCustomProps) => {
  return (
    <TextField
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      type={props.type}
      error={props.error}
      helperText={props.helperText}
      fullWidth={props.fullWidth}
      variant={props.variant || "outlined"}
      multiline={props.multiline}
      rows={props.rows}
      sx={{
        ...props.sx,
        mb: "20px",
        bgcolor: "white",
        "& .MuiInputBase-root": { height: "48px" },
      }}
    />
  );
};

export default TextFieldCustom;
