import { Box, Divider, Typography } from "@mui/material";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";

interface NoticeProps {
  id: number;
  date: string;
  title: string;
  onClick: (id: number) => void;
}

const Previous = (props: NoticeProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        cursor: "pointer",
      }}
      onClick={() => {
        props.onClick(props.id);
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          padding: "16px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ fontSize: "14px", color: "#282930" }}>
              {props.title}
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "#61636C",
                }}
              >
                이전글
              </Typography>
              <KeyboardArrowRightOutlinedIcon
                sx={{
                  color: "#B1B2B6",
                  fontSize: "16px",
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      <Divider
        sx={{
          color: "#ECECED",
          position: "relative",
          width: "calc(100% + 30px)",
        }}
      />
    </Box>
  );
};
export default Previous;
