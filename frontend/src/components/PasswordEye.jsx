import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const PasswordEye = ({ passwordRef }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <FormControl
      fullWidth
      variant="outlined"
      sx={{
        mb: 3,
        "& .MuiOutlinedInput-root": {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#6B46C1", // Set default border color
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#6B46C1", // Set hover border color
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#6B46C1", // Set focused border color
          },
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "#6B46C1", // Set label color on focus
        },
      }}
    >
      <InputLabel htmlFor="password" sx={{ bgcolor: "white" }}>
        Password
      </InputLabel>
      <OutlinedInput
        type={showPassword ? "text" : "password"}
        id="password"
        inputRef={passwordRef}
        name="password"
        endAdornment={
          <InputAdornment>
            <IconButton onClick={handleClickShowPassword}>
              {showPassword ? <EyeOff /> : <Eye />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default PasswordEye;
