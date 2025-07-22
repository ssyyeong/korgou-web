import React, { useState } from "react";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  sx?: any;
  fullWidth?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  placeholder = "비밀번호",
  error = false,
  helperText,
  sx,
  fullWidth = true,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    onChange("");
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box>
      <TextField
        fullWidth={fullWidth}
        type={!showPassword ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        error={error}
        sx={{
          "& .MuiInputBase-root": {
            height: "48px",
            borderRadius: "8px",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: error ? "#FF3B30" : "#E0E0E0",
            },
            "&:hover fieldset": {
              borderColor: "#BDBDBD",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#007AFF",
            },
          },
          ...sx,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {value && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    handleClear();
                  }}
                >
                  <img
                    src="/images/icon/close_round.svg"
                    alt="close"
                    style={{
                      width: "20px",
                      height: "20px",
                      cursor: "pointer",
                      marginRight: "4px",
                    }}
                  />
                </Box>
              )}
              <IconButton
                onClick={handleTogglePasswordVisibility}
                edge="end"
                sx={{
                  color: "#9E9E9E",
                  padding: "4px",
                }}
              >
                {showPassword ? (
                  <VisibilityOff sx={{ fontSize: "20px" }} />
                ) : (
                  <Visibility sx={{ fontSize: "20px" }} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {helperText && (
        <Typography
          sx={{
            fontSize: "14px",
            color: error ? "#EB1F81" : "#3966AE",
            mt: "8px",
            fontWeight: 500,
            lineHeight: "130%",
            letterSpacing: "-0.14px",
          }}
        >
          {helperText}
        </Typography>
      )}
    </Box>
  );
};

export default PasswordInput;
