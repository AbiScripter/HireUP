// theme.js
import { createTheme } from "@mui/material/styles";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#6b46c1", // Purple color for primary actions
    },
    secondary: {
      main: "#f3e8ff", // Light purple
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#6b46c1", // Default border color
            },
            "&:hover fieldset": {
              borderColor: "#6b46c1", // Hover border color
            },
            "&.Mui-focused fieldset": {
              borderColor: "#6b46c1", // Focused border color
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          backgroundColor: "#6b46c1",
          "&:hover": {
            backgroundColor: "#553c9a",
          },
        },
      },
    },
  },
});

export default customTheme;
