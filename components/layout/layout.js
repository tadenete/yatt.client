import { Fragment } from "react";
import MainNavigation from "./main-navigation";
import Footer from "./footer";

function Layout(props) {
  return (
    <Fragment>
      <MainNavigation />
      <main className="container py-5 d-flex justify-content-center">
        {props.children}
      </main>
      <Footer />
    </Fragment>
  );
}

export default Layout;
