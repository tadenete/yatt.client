import Link from "next/link";
import { Nav } from "react-bootstrap";

function MainNavigation() {
  return (
    <Nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-fixed-top">
      <div className="container">
        <Link href={"/"}>
          <a className="navbar-brand logo">YATT Career</a>
        </Link>
      </div>
    </Nav>
  );
}

export default MainNavigation;
