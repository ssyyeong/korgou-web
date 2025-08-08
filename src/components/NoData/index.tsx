import { Box, Typography } from "@mui/material";

interface INoDataProps {
  text: string;
}

const NoData = ({
  text = "데이터가 없습니다.", // 기본값 설정
  ...props
}: INoDataProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "30px",
        mt: "100px",
      }}
    >
      <img
        src="/images/main/character.svg"
        alt="empty"
        style={{ width: "135px", height: "169px" }}
      />
      <Typography
        sx={{
          fontSize: "14px",
          color: "#B1B2B6",
          fontWeight: 600,
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default NoData;
