import React from "react";
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Button,
  Chip,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid2,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import OriginButton from "../../components/Button/OriginButton";
import TextFieldCustom from "../../components/TextField";

const Search = () => {
  const [searchText, setSearchText] = React.useState("");

  const recentSearches = ["선크림", "선쿠션"];
  const popularSearches = Array(10).fill("선크림");

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        mt: 2,
        flexDirection: "column",
        backgroundColor: "white",
      }}
    >
      {/* Search Bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
          mb: "16px",
          height: "48px",
        }}
      >
        <TextFieldCustom
          fullWidth
          value={searchText}
          type="search"
          sx={{
            mb: "10px",
          }}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          placeholder="Please enter the URL"
        />
        <IconButton
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <SearchIcon />
        </IconButton>
      </Box>
      {/* Buying Button */}
      <OriginButton
        fullWidth
        variant="contained"
        onClick={() => {}}
        style={{
          borderRadius: "8px",
        }}
        contents={
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "12px",
              }}
            >
              원하는 샵 상품을 대신해서 구매해드려요.
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 700,
              }}
            >
              Buying it 바로가기
            </Typography>
          </Box>
        }
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          borderBottom: "1px solid #ECECED",
          my: "20px",
          pb: "20px",
        }}
      >
        {/* Recent Searches */}
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 700,
            color: "#282930",
            mb: "16px",
          }}
        >
          최근 검색어
        </Typography>
        <Grid2 container rowSpacing={2} columnSpacing={2}>
          {recentSearches.map((item, index) => (
            <Grid2 key={index} size={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#282930",
                  }}
                >
                  {item}
                </Typography>
                <IconButton
                  sx={{
                    padding: 0,
                    width: "16px",
                    height: "16px",
                    color: "#B1B2B6",
                  }}
                >
                  <CloseIcon sx={{}} />
                </IconButton>
              </Box>
            </Grid2>
          ))}
        </Grid2>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Recent Searches */}
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 700,
            color: "#282930",
            mb: "16px",
          }}
        >
          인기 검색어
        </Typography>
        <Grid2 container rowSpacing={2} columnSpacing={2}>
          {popularSearches.map((item, index) => (
            <Grid2 key={index} size={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "8px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#EB1F81",
                    fontWeight: 700,
                  }}
                >
                  {index + 1}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#282930",
                  }}
                >
                  {item}
                </Typography>
              </Box>
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </Box>
  );
};

export default Search;
