function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        &copy;{new Date().toLocaleDateString("en-US", { year: "numeric" })} YATT
        Consulting LLC
      </div>
    </footer>
  );
}
export default Footer;
