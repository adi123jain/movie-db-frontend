import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { userLogin } from "../services/Auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [userIdError, setUserIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async () => {
    let valid = true;

    setUserIdError("");
    setPasswordError("");

    if (!userId.trim()) {
      setUserIdError("User ID is required");
      valid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        setPasswordError(
          "Password must be at least 8 chars with uppercase, lowercase, number & special char"
        );
        valid = false;
      }
    }

    if (!valid) return;

    try {
      const payload = {
        username: userId,
        password: password,
        deviceId: "",
        requestMode: "",
      };

      const response = await userLogin(payload);
      console.log(response);
      if (response.data.code == "200") {
        const token = response.headers.authorization;
        const userName = response.data.list[0].fullName;
        localStorage.setItem("token", token);
        localStorage.setItem("userName", userName);
        navigate("/createMovies");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log("error", error);
    }

    // If valid, log values
    console.log("UserID:", userId);
    console.log("Password:", password);
    console.log("Remember Me:", remember);
  };

  return (
    <Box className="login-page">
      <Paper elevation={6} className="login-card">
        <Typography variant="h3" className="login-title">
          Sign in
        </Typography>

        <Box className="login-form">
          <TextField
            placeholder="Enter User ID"
            variant="outlined"
            fullWidth
            value={userId}
            onChange={(e) => {
              const value = e.target.value;

              if (/^\d*$/.test(value)) {
                setUserId(value);
                setUserIdError("");
              }
            }}
            className="login-input"
            error={!!userIdError}
            helperText={userIdError}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineIcon className="login-icon" />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />

          <TextField
            placeholder="Enter Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            error={!!passwordError}
            helperText={passwordError}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon className="login-icon" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? (
                      <VisibilityOff className="login-icon" />
                    ) : (
                      <Visibility className="login-icon" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 1 }}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                color="primary"
              />
            }
            label="Remember me"
            className="remember-label"
            sx={{ mb: 2 }}
          />

          <Button
            variant="contained"
            fullWidth
            className="login-btn"
            onClick={handleSubmit}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
