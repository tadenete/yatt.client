import NextLink from "next/link";
import { Fragment } from "react";
import { AppBar, Toolbar, CssBaseline, Typography, Link } from "@mui/material";
import BusinessIcon from "@mui/icons-material/BusinessOutlined";

function MainNavigation() {
  return (
    <Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <NextLink href={"/"} passHref>
          <Toolbar>
            <BusinessIcon sx={{ marginRight: 2 }} />
            <Typography variant="h6" color="inherit" noWrap>
              YATT Career
            </Typography>
          </Toolbar>
        </NextLink>
      </AppBar>
    </Fragment>
  );
}

export default MainNavigation;
