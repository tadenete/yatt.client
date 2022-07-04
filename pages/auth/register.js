import NextLink from "next/link";
import { useEffect, useRef, useState } from "react";

//material ui components
import Avatar from "@mui/material/Avatar";
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Alert,
  AlertTitle,
} from "@mui/material";
import LockOpenlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme();

function Register() {
  const emailInputRef = useRef("");
  const passwordInputRef = useRef("");
  const confirmPasswordInputRef = useRef("");

  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setError(""), setMessage("");
  }, [error, message]);

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          email: emailInputRef.current.value,
          password: passwordInputRef.current.value,
          confirmPassword: confirmPasswordInputRef.current.value,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (!res.ok) {
        throw data.message;
      }
      setMessage(data.message);
    } catch (error) {
      setError(error);
    }
  };
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
            <LockOpenlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
        </Box>
        <Box
          component="form"
          onSubmit={handleRegister}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            ref={emailInputRef}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            ref={passwordInputRef}
            id="password"
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            ref={confirmPasswordInputRef}
            id="confirmPassword"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <NextLink href={"/auth/login"} passHref>
                <Link variant="body2">Already have an account? Sign in</Link>
              </NextLink>
            </Grid>
          </Grid>
          {error && (
            <Alert severity="error" sx={{ mt: 3, mb: 2 }}>
              <AlertTitle>Error</AlertTitle>
              {error}
            </Alert>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Register;
