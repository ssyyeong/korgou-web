import { Box, Typography } from "@mui/material";
import React, { useState } from "react";

interface VideoCardProps {
  thumbnailUrl: string; // 썸네일로 사용할 이미지 경로
  videoId: string; // 유튜브 비디오 ID (예: "ZbhaV3_Wqr8")
  title: string; // 영상 제목
  description?: string; // 부가 설명 (선택)
}

const VideoCard: React.FC<VideoCardProps> = ({
  thumbnailUrl,
  videoId,
  title,
  description,
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
            {/* 가운데 재생 버튼 아이콘 */}
            <div
              style={{
                position: "absolute",
                top: "30%",
                left: "50%",
                transform: "translate(-30%, -30%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src="/images/icon/play.svg"
                alt="재생"
                style={{ width: "56px", height: "56px" }}
              />
            </div>
            {/* 영상 제목 및 설명 */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                top: "55%",
                width: "100%",
              }}
            >
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "white",
                }}
              >
                {title}
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "white",
                }}
              >
                {description}
              </Typography>
            </Box>
          </div>
        )}
      </div>
    </Box>
  );
};

export default VideoCard;
