import { Box, Typography } from "@mui/material";

interface SocialLinkProps {
  mt?: string;
}
const SocialLink = (props: SocialLinkProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mb: "24px",
        mt: props.mt,
      }}
    >
      <Typography
        sx={{
          color: "#919298",
          fontSize: "12px",
          fontWeight: 700,
          mb: "8px",
        }}
      >
        SOCIAL LINKS
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "24px",
        }}
      >
        <img
          src="/images/icon/social/insta.svg"
          alt="logo"
          style={{ cursor: "pointer" }}
          onClick={() => {
            window.open("https://www.instagram.com/korgou_official/");
          }}
        />
        <img
          src="/images/icon/social/tiktok.svg"
          alt="logo"
          style={{ cursor: "pointer" }}
          onClick={() => {
            window.open("https://www.tiktok.com/@t.o.k.k__korgou");
          }}
        />
        <img
          src="/images/icon/social/x.svg"
          alt="logo"
          style={{ cursor: "pointer" }}
          onClick={() => {
            window.open("https://x.com/kor_gou");
          }}
        />

        <img
          src="/images/icon/social/youtube.svg"
          alt="logo"
          style={{ cursor: "pointer" }}
          onClick={() => {
            window.open("https://www.youtube.com/@KorGou_official");
          }}
        />
      </Box>
    </Box>
  );
};

export default SocialLink;
