import React from "react";
import { Box, Button, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= maxVisiblePages; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - maxVisiblePages + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }

    return pages;
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
        py: "16px",
        backgroundColor: "white",
        mb: "30px",
      }}
    >
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        sx={{
          minWidth: "32px",
          width: "32px",
          height: "32px",
          padding: 0,
          color: currentPage === 1 ? "#B1B2B6" : "#282930",
          "&:disabled": {
            color: "#B1B2B6",
          },
        }}
      >
        <ChevronLeftIcon sx={{ fontSize: "20px" }} />
      </Button>

      {getPageNumbers().map((page) => (
        <Button
          key={page}
          onClick={() => onPageChange(page)}
          sx={{
            minWidth: "32px",
            width: "32px",
            height: "32px",
            padding: 0,
            backgroundColor: currentPage === page ? "#282930" : "transparent",
            color: currentPage === page ? "white" : "#282930",
            borderRadius: "4px",
            fontSize: "14px",
            fontWeight: currentPage === page ? 600 : 400,
            "&:hover": {
              backgroundColor: currentPage === page ? "#282930" : "#F5F5F5",
            },
          }}
        >
          {page}
        </Button>
      ))}

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        sx={{
          minWidth: "32px",
          width: "32px",
          height: "32px",
          padding: 0,
          color: currentPage === totalPages ? "#B1B2B6" : "#282930",
          "&:disabled": {
            color: "#B1B2B6",
          },
        }}
      >
        <ChevronRightIcon sx={{ fontSize: "20px" }} />
      </Button>
    </Box>
  );
};

export default Pagination;
