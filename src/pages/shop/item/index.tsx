import { Box, Grid2, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LikeButton from "../../../components/LikeButton/LikeButton";

interface ItemProps {
  itemList: any[];
}

const Item = (props: ItemProps) => {
  const { itemList } = props;
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
      }}
    >
      <Grid2
        container
        spacing={2}
        sx={{
          justifyContent: "flex-start",
          margin: 0,
          width: "100%",
        }}
      >
        {itemList.map((item, index) => (
          <Grid2
            key={item.PRODUCT_IDENTIFICATION_CODE}
            size={6}
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              mb: 2,
              pl: "0 !important",
            }}
            onClick={() => {
              navigate(`/shop/detail/${item.PRODUCT_IDENTIFICATION_CODE}`);
            }}
          >
            <ItemCard item={item} index={index} />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

const ItemCard = (props: any) => {
  const { item } = props;
  const thumbnail = JSON.parse(item.THUMBNAIL)[0];

  return (
    <Box
      sx={{
        width: "160px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "160px",
          height: "180px",
          backgroundColor: "#F5F5F5",
          borderRadius: "8px",
          border: "1px solid #ECECED",
          overflow: "hidden",
        }}
      >
        {item.LABEL !== "null" && item.LABEL !== "" && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              backgroundColor: "#EB1F81",
              borderRadius: "0 4px 0 4px",
              padding: "2px 8px",
              zIndex: 1,
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              {item.LABEL}
            </Typography>
          </Box>
        )}

        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "85px",
            height: "133px",
            backgroundImage: `url(${thumbnail})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <LikeButton
          productId={item.PRODUCT_IDENTIFICATION_CODE}
          size="medium"
          position="absolute"
          sx={{
            right: 4,
            bottom: 4,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.9)",
            },
          }}
        />
      </Box>

      <Box sx={{ mt: 1 }}>
        <Typography
          sx={{
            color: "black",
            fontSize: "12px",
            fontWeight: 700,
            mb: "8px",
          }}
        >
          {item.ProductBrand.BRAND_NAME}
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            color: "#282930",
            mb: 1,
            lineHeight: 1.2,
          }}
        >
          {item.LABEL !== "null" &&
            item.LABEL !== "" &&
            "[" + item.LABEL.toUpperCase() + "] "}{" "}
          {item.PRODUCT_NAME}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Typography
            sx={{
              fontSize: "16px",
              color: "#EB1F81",
              fontWeight: "bold",
            }}
          >
            {item.PRICE.toLocaleString()}원
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#919298",
              textDecoration: "line-through",
            }}
          >
            {item.DISCOUNT_PRICE.toLocaleString()}원
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Item;
