import React from "react";
import { Box, Grid, Typography } from "@mui/material";

const StatusSection: React.FC = () => {
  return (
    <Box sx={{ bgcolor: "white", borderRadius: 2, p: 2, mb: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography variant="subtitle2" color="textSecondary">
            발송
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            5,000
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle2" color="textSecondary">
            쿠폰
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            1
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle2" color="textSecondary">
            포인트
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            5,000
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StatusSection;
