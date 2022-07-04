import NextLink from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

//material ui components
import Avatar from "@mui/material/Avatar";
import {
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
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme();

function Login() {
  const emailInputRef = useRef("");
  const passwordInputRef = useRef("");
  const [loginError, setLoginError] = useState("");
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status]);

  const handleLogin = async (event) => {
    event.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
    });
    console.log(result);
    if (result.error) {
      setLoginError(result.error);
    } else {
      router.replace("/");
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <NextLink href={"/auth/forgot-password"} passHref>
                <Link variant="body2">
                  Forgot password?
                </Link>
              </NextLink>
            </Grid>
            <Grid item>
              <NextLink href={"/auth/register"} passHref>
                <Link variant="body2">Don't have an account? Sign Up</Link>
              </NextLink>
            </Grid>
          </Grid>
          {loginError && (
            <Alert severity="error" sx={{ mt: 3, mb: 2 }}>
              <AlertTitle>Error</AlertTitle>
              {loginError}
            </Alert>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
