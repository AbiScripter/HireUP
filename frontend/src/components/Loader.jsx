import { Box, LinearProgress } from "@mui/material";

const Loader = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-transparent color">
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    </div>
  );
};

export default Loader;
