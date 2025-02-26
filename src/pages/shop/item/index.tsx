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
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
      }}
    >
      <Grid2 container spacing={2}>
        {itemList.map((item, index) => (
          <Grid2
            key={item.PRODUCT_IDENTIFICATION_CODE}
            size={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              mb: "24px",
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
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 상품 이미지 컨테이너 */}
      <Box
        sx={{
          display: "flex",
          width: "160px",
          height: "160px",
          backgroundColor: "#F5F5F5",
          borderRadius: "8px 8px 0px 0px",
          border: "1px solid #ECECED",
          cursor: "pointer",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {/* numbering and pre-order */}

        {/* <Box
            sx={{
              display: "flex",
              backgroundColor: "#172845",
              borderRadius: "4px 0px",
              width: "35px",
              height: "30px",
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontSize: "16px",
                fontWeight: "bold",
                margin: "auto",
              }}
            >
              {index + 1}
            </Typography>
          </Box> */}
        {/* pre-order */}
        <Box
          sx={{
            display: "flex",
            backgroundColor: "#EB1F81",
            borderRadius: "0px 4px",
            padding: "2px 8px",
            alignSelf: "flex-end",
            height: "20px",
            width: "fit-content",
            visibility: item.MD_PICK_CONTENT ? "visible" : "hidden",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            {item.MD_PICK_CONTENT}
          </Typography>
        </Box>
        {/* thumbnail */}
        <Box
          sx={{
            display: "flex",
            width: "85px",
            height: "133px",
            backgroundImage: `url(${thumbnail})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            top: "-3px",
            position: "relative",
            alignSelf: "center",
          }}
        ></Box>
        <FavoriteOutlinedIcon
          sx={{
            position: "absolute",
            right: 0, // 오른쪽 정렬
            bottom: 0, // 아래쪽 정렬
            margin: "8px", // 여백 추가 (선택사항)
            color: "#41434E80",
          }}
        />
      </Box>
      {/* 상품 정보 컨테이너 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: "8px",
        }}
      >
        <Typography
          sx={{
            color: "#EB1F81",
            fontSize: "12px",
            fontWeight: 700,
          }}
        >
          {item.BRAND_NAME}
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            color: "#282930",
          }}
        >
          {item.PRODUCT_NAME}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            mt: "8px",
          }}
        >
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
              ml: "2px",
              mt: "2px",
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
