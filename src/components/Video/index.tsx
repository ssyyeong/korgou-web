import { Box, Typography } from "@mui/material";
import React, { useState } from "react";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";

interface VideoCardProps {
  thumbnailUrl: string; // 썸네일로 사용할 이미지 경로
  videoId: string; // 유튜브 비디오 ID (예: "ZbhaV3_Wqr8")
  title: string; // 영상 제목
  playButtonColor?: string; // 재생 버튼 배경색
}

const VideoCard: React.FC<VideoCardProps> = ({
  thumbnailUrl,
  videoId,
  title,
  playButtonColor = "#2563EB", // 기본 파랑
}) => {
  // 썸네일 대신 실제 영상을 보여줄지 여부
  const [showVideo, setShowVideo] = useState(false);

  const handlePlayVideo = () => {
    setShowVideo(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "329px",
        cursor: "pointer",
        mb: "16px",
      }}
    >
      {/* 썸네일 or 동영상 영역 */}
      <div style={{ position: "relative", width: "100%", height: "180px" }}>
        {showVideo ? (
          // 실제 유튜브 영상 표시
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          // 썸네일 + 재생 버튼
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundImage: `url(${thumbnailUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              cursor: "pointer",
            }}
            onClick={handlePlayVideo}
          >
            {/* 왼쪽 상단 재생 버튼 */}
            <div
              style={{
                position: "absolute",
                top: 16,
                left: 16,
                width: 35,
                height: 35,
                background: playButtonColor,
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            >
              <PlayArrowIcon
                sx={{
                  color: "#fff",
                  width: 35,
                  height: 35,
                }}
              />
            </div>
            {/* 영상 제목 및 설명 */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
              }}
            >
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#49413c",
                  mb: "10px",
                }}
              >
                {title}
              </Typography>
            </Box>
          </div>
        )}
      </div>
    </Box>
  );
};

export default VideoCard;
