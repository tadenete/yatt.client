import { useState, useRef } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Alert,
  AlertTitle,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";

const theme = createTheme();

function ForgotPassword() {
  const emailInputRef = useRef("");
  function handleSubmit() {}
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <VpnKeyOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Update Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 2 }}
          >
            <Typography variant="h7">
              Enter your email address below and we'll send an email with a link
              to update your password.
            </Typography>
            <TextField
              margin="normal"
              fullWidth
              required
              ref={emailInputRef}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              sx={{ mt: 3}}
              autoFocus
            />
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              sx={{mb: 2 }}>
              submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default ForgotPassword;
