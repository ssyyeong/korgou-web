import { Box, Grid2, Typography } from "@mui/material";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { useNavigate } from "react-router-dom";

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
  const { item, index } = props;
  const thumbnail = JSON.parse(item.THUMBNAIL)[0].FILE_URL;

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
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            display: "flex",
            backgroundColor: "#172845",
            borderRadius: "8px 0 4px 0",
            width: "35px",
            height: "30px",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            {index + 1}
          </Typography>
        </Box>

        {item.PRE_ORDER_YN === "Y" && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              backgroundColor: "#EB1F81",
              borderRadius: "0 8px 0 4px",
              padding: "4px 8px",
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
              pre-order
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

        <FavoriteOutlinedIcon
          sx={{
            position: "absolute",
            right: 8,
            bottom: 8,
            color: "#41434E80",
          }}
        />
      </Box>

      <Box sx={{ mt: 1 }}>
        <Typography
          sx={{
            color: "#EB1F81",
            fontSize: "12px",
            fontWeight: 700,
            mb: 0.5,
          }}
        >
          {item.BRAND_NAME}
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            color: "#282930",
            mb: 1,
            lineHeight: 1.2,
          }}
        >
          {item.PRODUCT_NAME}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Typography
            sx={{
              fontSize: "16px",
              color: "#282930",
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
