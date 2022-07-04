import React from "react";
import NextLink from "next/link";
import { CssBaseline, Typography, Container, Link } from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {"Copyright © "}
      <NextLink href={"/"} passHref>
        <Link variant="body2" color="inherit">YATT Consulting LLC</Link>
      </NextLink>{" "}
      {new Date().getFullYear()} {"."}
    </Typography>
  );
}
function Footer() {
  return (
    <div style={{ display: "flex", flexDirection: "column"}}>
      <CssBaseline />
      <footer className="footer">
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}
export default Footer;
