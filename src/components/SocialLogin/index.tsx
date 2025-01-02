import React from "react";
import { Box } from "@mui/system";

interface Props {
  clientId: string;
  callbackUrl: string;
  children: React.ReactNode;
  type: string;
  state?: string;
}

const SocialLogin = (props: Props) => {
  const login =
    props.type === "google"
      ? `https://accounts.google.com/o/oauth2/v2/auth?client_id=${props.clientId}&redirect_uri=${props.callbackUrl}&response_type=code&scope=email%20profile`
      : `https://accounts.google.com/o/oauth2/v2/auth?client_id=${props.clientId}&redirect_uri=${props.callbackUrl}&response_type=code&scope=email%20profile`;
  return (
    <Box
      onClick={() => {
        window.location.href = login;
      }}
      width={48}
      height={48}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
      boxShadow={"0px 2px 4px rgba(0, 0, 0, 0.1)"}
      sx={{
        borderRadius: "50px",
        cursor: "pointer",
        marginRight: "21px",
      }}
    >
      {props.children}
    </Box>
  );
};

export default SocialLogin;
