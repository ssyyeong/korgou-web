import { Box, Checkbox, Divider, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useExchange } from "../../../../hooks/useExchange";
import QuantitySelector from "./QuantitySelector";
import TextFieldCustom from "../../../../components/TextField";
import { useTranslation } from "react-i18next";
interface CartCardProps {
  cart: any;
  selectedCartList: any[];
  setSelectedCartList: (list: any[]) => void;
  deleteCart: (cartId: any) => void;
  updateCartQuantity: (cartId: any, quantity: number) => void;
  updateCartRequestComment: (cartId: any, comment: string) => void;
}

const CartCard = (props: CartCardProps) => {
  const { t } = useTranslation();
  const { cart, selectedCartList, setSelectedCartList, deleteCart } = props;
  const { usd } = useExchange();

  const pricePerItem =
    (cart.QUANTITY * Number(cart.PRODUCT.PRICE)) /
    Number(usd.replace(/,/g, ""));

  return (
    <Box
      sx={{
        display: "flex",
        p: "16px",
        borderRadius: "4px",
        backgroundColor: "#F8FAFC",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Checkbox
          checked={selectedCartList.some(
            (item) =>
              item.CART_IDENTIFICATION_CODE === cart.CART_IDENTIFICATION_CODE
          )}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSelectedCartList(
              selectedCartList.some(
                (item) =>
                  item.CART_IDENTIFICATION_CODE ===
                  cart.CART_IDENTIFICATION_CODE
              )
                ? selectedCartList.filter(
                    (item) =>
                      item.CART_IDENTIFICATION_CODE !==
                      cart.CART_IDENTIFICATION_CODE
                  )
                : [...selectedCartList, cart]
            );
          }}
        />
        <Typography
          sx={{
            fontSize: "14px",
            color: "#282930",
          }}
        >
          KORGOU
        </Typography>
      </Box>
      <Divider sx={{ color: "#EBF0F7", mt: "8px", mb: "16px" }} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "8px",
        }}
      >
        <img
          src={JSON.parse(cart.PRODUCT.THUMBNAIL)[0]}
          alt="product"
          style={{
            width: "70px",
            height: "70px",
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <Typography
            sx={{
              fontSize: "12px",
            }}
          >
            {cart.PRODUCT.PRODUCT_NAME}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                color: "#282930",
              }}
            >
              $
              {(
                Number(
                  cart.PRODUCT.DISCOUNT_PRICE
                    ? cart.PRODUCT.DISCOUNT_PRICE
                    : cart.PRODUCT.PRICE
                ) / Number(usd.replace(/,/g, ""))
              ).toFixed(2)}{" "}
              /{"  "}
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#919298",
              }}
            >
              {"  "}
              {cart.PRODUCT.DISCOUNT_PRICE
                ? cart.PRODUCT.DISCOUNT_PRICE.toLocaleString()
                : cart.PRODUCT.PRICE.toLocaleString()}
            </Typography>
          </Box>
        </Box>
        <img
          src="/images/shop/close.svg"
          alt="delete"
          onClick={() => {
            deleteCart(cart.CART_IDENTIFICATION_CODE);
          }}
          style={{
            cursor: "pointer",
            width: "16px",
            height: "16px",
            alignSelf: "center",
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          p: "10px",
          borderRadius: "8px",
          backgroundColor: "#FFF",
          gap: "10px",
        }}
      >
        <Typography
          sx={{
            fontSize: "12px",
            color: "#282930",
          }}
        >
          {cart.QUANTITY}개 / FREE
        </Typography>

        <QuantitySelector
          initialQuantity={cart.QUANTITY}
          pricePerItem={pricePerItem}
          onQuantityChange={(quantity) => {
            props.updateCartQuantity(cart.CART_IDENTIFICATION_CODE, quantity);
          }}
        />
        <TextFieldCustom
          fullWidth
          value={cart.REQUEST_COMMENT}
          type="text"
          onChange={(e) => {
            props.updateCartRequestComment(
              cart.CART_IDENTIFICATION_CODE,
              e.target.value
            );
          }}
          placeholder={t("cart.request_description")}
          sx={{
            "& .MuiInputBase-root": {
              height: "38px",
            },
            borderRadius: "1px",
            mb: "0px",
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          mt: "16px",
        }}
      >
        <Typography
          sx={{
            color: "#61636C",
            fontSize: "14px",
          }}
        >
          {t("cart.selected_item_price")}
        </Typography>
        <Typography
          sx={{
            color: "#282930",
            fontSize: "14px",
          }}
        >
          ${pricePerItem.toFixed(2)}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          mt: "10px",
        }}
      >
        <Typography
          sx={{
            color: "#61636C",
            fontSize: "14px",
          }}
        >
          {t("cart.domestic_shipping_fee")}
        </Typography>
        <Typography
          sx={{
            color: "#282930",
            fontSize: "14px",
          }}
        >
          $2.28
        </Typography>
      </Box>
      <Divider
        sx={{
          color: "#B1B2B6",
          my: "10px",
          borderStyle: "dashed",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            color: "#282930",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          {t("cart.total_price")}
        </Typography>
        <Typography
          sx={{
            color: "#282930",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          ${pricePerItem.toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
};

export default CartCard;
