import { Box, Divider, Typography } from "@mui/material";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";

interface NoticeProps {
  id: number;
  date: string;
  title: string;
  import: string;
  event: string;
  onClick: (id: number) => void;
}

const Notice = (props: NoticeProps) => {
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
          flexDirection: "column",
          width: "100%",
          padding: "16px",
          gap: "8px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "4px",
            backgroundColor: props.event === "Y" ? "#3966AE" : "#EBF0F7",
            padding: "2px 4px",
            mr: "4px",
            width: "44px",
          }}
        >
          <Typography
            sx={{
              fontSize: "10px",
              color: props.event === "Y" ? "white" : "#3966AE",
            }}
          >
            {props.event === "Y" ? "EVENT" : "NOTICE"}
          </Typography>
        </Box>
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
            {props.import === "Y" && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "4px",
                  backgroundColor: "#EB1F81",
                  padding: "4px 10px",
                  mr: "4px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "white",
                  }}
                >
                  중요
                </Typography>
              </Box>
            )}
            <KeyboardArrowRightOutlinedIcon
              sx={{
                color: "#B1B2B6",
                fontSize: "16px",
              }}
            />
          </Box>
        </Box>
        <Typography sx={{ fontSize: "10px", color: "#61636C" }}>
          {props.date}
        </Typography>
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
export default Notice;
