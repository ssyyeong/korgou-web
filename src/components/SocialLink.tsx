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
          fontSize: "18px",
          fontWeight: 700,
          mb: "12px",
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
          width={32}
          height={32}
          style={{ cursor: "pointer" }}
          onClick={() => {
            window.open("https://www.instagram.com/korgou_official/");
          }}
        />
        <img
          src="/images/icon/social/twitter.svg"
          alt="logo"
          width={32}
          height={32}
          style={{ cursor: "pointer" }}
          onClick={() => {
            window.open("https://x.com/kor_gou");
          }}
        />
        <img
          src="/images/icon/social/tiktok.svg"
          alt="logo"
          width={32}
          height={32}
          style={{ cursor: "pointer" }}
          onClick={() => {
            window.open("https://www.tiktok.com/@t.o.k.k__korgou");
          }}
        />
      </Box>
    </Box>
  );
};

export default SocialLink;
