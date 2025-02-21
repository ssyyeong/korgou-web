import { Box, Typography } from "@mui/material";
import AccordianBox from "../../../../../components/AccordianBox/AccordianBox";

interface IFaqProps {
  title: string;
  content: string;
}

const Faq = (props: IFaqProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
      }}
    >
      <AccordianBox
        title={
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 700,
                color: "#3966AE",
              }}
            >
              Q
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#282930",
              }}
            >
              {props.title}
            </Typography>
          </Box>
        }
        constents={
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#F5F5F5",
              padding: "16px",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 700,
                color: "#3966AE",
              }}
            >
              A
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#282930",
              }}
            >
              {props.content}
            </Typography>
          </Box>
        }
      />
    </Box>
  );
};
export default Faq;
