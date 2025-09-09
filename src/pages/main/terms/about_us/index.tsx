import { Box, Typography, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Header from "../../../../components/Header/Header";
import Controller from "../../../../controller/Controller";
import ControllerAbstractBase from "../../../../controller/Controller";

const AboutUs = () => {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchAboutUsContent();
  }, []);

  const fetchAboutUsContent = async () => {
    try {
      setLoading(true);
      const controller = new ControllerAbstractBase({
        modelName: "AboutUsTerm",
        modelId: "about_us_term",
      });

      controller.findAll({}).then((res) => {
        setContent(res.result.rows[0].CONTENT);
      });
    } catch (err) {
      console.error("약관 데이터 로딩 오류:", err);
      setError("약관 내용을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        position: "relative",
        mb: "48px",
      }}
    >
      <Header title={"About Us"} />
      <Box
        sx={{
          width: "100%",
          maxWidth: "800px",
          padding: "20px 16px",
        }}
      >
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography
            sx={{
              color: "error.main",
              textAlign: "center",
              padding: "20px",
            }}
          >
            {error}
          </Typography>
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              h1: ({ children }) => (
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "#282930",
                    marginBottom: "16px",
                    marginTop: "24px",
                    lineHeight: "130%",
                  }}
                >
                  {children}
                </Typography>
              ),
              h2: ({ children }) => (
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: "20px",
                    fontWeight: 600,
                    color: "#282930",
                    marginBottom: "12px",
                    marginTop: "20px",
                    lineHeight: "130%",
                  }}
                >
                  {children}
                </Typography>
              ),
              h3: ({ children }) => (
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "#282930",
                    marginBottom: "10px",
                    marginTop: "16px",
                    lineHeight: "130%",
                  }}
                >
                  {children}
                </Typography>
              ),
              p: ({ children }) => (
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#61636C",
                    marginBottom: "12px",
                    lineHeight: "160%",
                    whiteSpace: "pre-line",
                  }}
                >
                  {children}
                </Typography>
              ),
              ul: ({ children }) => (
                <Box
                  component="ul"
                  sx={{
                    marginBottom: "12px",
                    paddingLeft: "20px",
                  }}
                >
                  {children}
                </Box>
              ),
              ol: ({ children }) => (
                <Box
                  component="ol"
                  sx={{
                    marginBottom: "12px",
                    paddingLeft: "20px",
                  }}
                >
                  {children}
                </Box>
              ),
              li: ({ children }) => (
                <Typography
                  component="li"
                  sx={{
                    fontSize: "14px",
                    color: "#61636C",
                    marginBottom: "6px",
                    lineHeight: "160%",
                  }}
                >
                  {children}
                </Typography>
              ),
              strong: ({ children }) => (
                <Typography
                  component="strong"
                  sx={{
                    fontWeight: 600,
                    color: "#282930",
                  }}
                >
                  {children}
                </Typography>
              ),
              br: () => <br />,
              span: ({ children, style }) => (
                <span style={style}>{children}</span>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        )}
      </Box>
    </Box>
  );
};

export default AboutUs;
