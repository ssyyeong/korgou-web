import React from "react";
import { Box, Typography } from "@mui/material";

interface CustomCheckboxProps {
  checked: boolean;
  onChange: () => void;
  label: string;
  labelStyle?: React.CSSProperties;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onChange,
  label,
  labelStyle,
}) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
      <Box
        onClick={onChange}
        sx={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {checked ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
          >
            <rect
              x="2"
              y="2.91699"
              width="20"
              height="20"
              rx="4"
              fill="#3966AE"
            />
            <path
              d="M7.5 12.917L10.5 15.917L16.5 9.917"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M19.5 4.58366H4.5C4.03976 4.58366 3.66667 4.95675 3.66667 5.41699V20.417C3.66667 20.8772 4.03976 21.2503 4.5 21.2503H19.5C19.9602 21.2503 20.3333 20.8772 20.3333 20.417V5.41699C20.3333 4.95675 19.9602 4.58366 19.5 4.58366ZM4.5 2.91699C3.11929 2.91699 2 4.03628 2 5.41699V20.417C2 21.7977 3.11929 22.917 4.5 22.917H19.5C20.8807 22.917 22 21.7977 22 20.417V5.41699C22 4.03628 20.8807 2.91699 19.5 2.91699H4.5Z"
              fill="#B1B2B6"
            />
          </svg>
        )}
      </Box>
      <Typography
        sx={{
          fontSize: "14px",
          color: "#282930",
          cursor: "pointer",
          ...labelStyle,
        }}
        onClick={onChange}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default CustomCheckbox;
