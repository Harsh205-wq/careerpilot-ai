import { Link } from "react-router-dom";
import { APP_NAME } from "../utils/constants.js";

const footerLinks = [
  { label: "Home", to: "/" },
  { label: "Features", to: "/#features" },
  { label: "Login", to: "/login" },
  { label: "Signup", to: "/signup" },
];

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="footer-brand">
          <span className="brand-dot" aria-hidden="true" />
          <div className="footer-copy">
            <strong>{APP_NAME}</strong>
            <p>Roadmaps, resume work, and interview prep in one focused workspace.</p>
          </div>
        </div>

        <nav className="footer-links" aria-label="Footer navigation">
          {footerLinks.map((item) => (
            <Link className="footer-link" key={item.label} to={item.to}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
