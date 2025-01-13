import { Box, Typography, Divider } from "@mui/material";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";

const ProfileHeader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        px: "16px",
        py: "12px",
        backgroundColor: "#3966AE",
      }}
    >
      {/* 상단 프로필 정보 */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: "16px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src="/images/icon/my_page/badge.svg"
            alt="badge"
            style={{ width: "55px", height: "55px", marginRight: "12px" }}
          />
          <Box>
            <Typography
              sx={{
                color: "white",
                fontSize: "22px",
                fontWeight: "bold",
                lineHeight: "28px",
              }}
            >
              SOMI KIM
            </Typography>
            <Typography
              sx={{
                color: "#D9E2FF",
                fontSize: "14px",
              }}
            >
              influencer
            </Typography>
          </Box>
        </Box>
        <img
          src="/images/icon/my_page/character.png"
          alt="character"
          style={{ width: "60px", height: "60px" }}
        />
      </Box>

      {/* 등급 및 ID */}
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "16px",
          mb: "16px",
        }}
      >
        <Typography
          sx={{
            color: "#61636C",
            fontSize: "10px",
            textAlign: "right",
            mb: "8px",
          }}
        >
          GOLD 등급까지
        </Typography>
        <img
          src="/images/icon/my_page/bar.png"
          alt="progress bar"
          style={{ width: "100%", marginBottom: "16px" }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Typography
            sx={{
              color: "#282930",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            P1234567
          </Typography>
          <Typography
            sx={{
              color: "#919298",
              fontSize: "12px",
              marginLeft: "8px",
              pt: "2px",
            }}
          >
            kim@gmail.com
          </Typography>
        </Box>
        <Divider sx={{ borderColor: "#ECECED", mb: "16px" }} />

        <Typography
          sx={{
            color: "#282930",
            fontSize: "12px",
            mb: "8px",
          }}
        >
          My free Korean Address
        </Typography>
        <Typography
          sx={{
            color: "#282930",
            fontSize: "12px",
            fontWeight: "bold",
            mb: "16px",
          }}
        >
          경기도 성남시 중원구 상대원동 순환로79 [A123456]
        </Typography>
        <Divider sx={{ borderColor: "#ECECED", mb: "16px" }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {[
            { label: "발란스", value: "5,000" },
            { label: "쿠폰", value: "1" },
            { label: "포인트", value: "5,000" },
          ].map((item, index) => (
            <Box key={index} sx={{ textAlign: "center" }}>
              <Typography
                sx={{
                  color: "#282930",
                  fontSize: "12px",
                }}
              >
                {item.label}
              </Typography>
              <Typography
                sx={{
                  color: "#282930",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                {item.value}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* 하단 상태 정보 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          borderRadius: "8px",
          paddingLeft: "10px",
          paddingRight: "8px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottom: "1px solid #ECECED",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "50%",
              alignItems: "center",
              justifyContent: "space-between",
              borderRight: "1px solid #ECECED",
              padding: "8px",
            }}
          >
            <Typography
              sx={{
                fontSize: "12px",
              }}
            >
              창고 현황
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                }}
              >
                3
              </Typography>
              <KeyboardArrowRightOutlinedIcon
                sx={{
                  width: " 16px",
                  height: "16px",
                  color: "#B1B2B6",
                  alignSelf: "center",
                }}
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "50%",
              alignItems: "center",
              justifyContent: "space-between",
              pl: "8px",
            }}
          >
            <Typography
              sx={{
                fontSize: "12px",
              }}
            >
              배송신청 현황
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                }}
              >
                3
              </Typography>
              <KeyboardArrowRightOutlinedIcon
                sx={{
                  width: " 16px",
                  height: "16px",
                  color: "#B1B2B6",
                  alignSelf: "center",
                }}
              />{" "}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            py: "8px",
            pl: "8px",
          }}
        >
          <Typography
            sx={{
              fontSize: "12px",
            }}
          >
            구매대행 현황
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
              }}
            >
              3
            </Typography>
            <KeyboardArrowRightOutlinedIcon
              sx={{
                width: " 16px",
                height: "16px",
                color: "#B1B2B6",
                alignSelf: "center",
              }}
            />{" "}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileHeader;
