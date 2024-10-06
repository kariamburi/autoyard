import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

interface CircularProgressWithLabelProps {
  value: number; // Progress value (percentage)
}

const CircularProgressWithLabel: React.FC<CircularProgressWithLabelProps> = ({
  value,
}) => {
  return (
    <Box position="relative" display="inline-flex">
      {/* CircularProgress component */}
      <CircularProgress
        sx={{ color: "green" }}
        size={30}
        variant="determinate"
        value={value}
      />

      {/* Text inside the CircularProgress */}
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="green">
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

export default CircularProgressWithLabel;
