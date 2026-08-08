import "./header.css";
import { logoImage } from "../../assets";
import LanguageToggle from "../common/LanguageToggle";
import { useSiteContent } from "../../hooks/useSiteContent";

const Header = () => {
  const { content } = useSiteContent();

  return (
    <header className="header">
      <div className="header-container">
        <a className="logo" href="#home" aria-label={content.brand.full}>
          <img src={logoImage} alt={content.brand.full} />
          <div className="brand-copy">
            <strong>{content.brand.short}</strong>
            <span>{content.brand.sub}</span>
          </div>
        </a>

        <nav className="nav">
          <a href="#home">{content.nav.home}</a>
          <a href="#about">{content.nav.about}</a>
          <a href="#journey">{content.nav.journey}</a>
          <a href="#products">{content.nav.products}</a>
          <a href="#contact">{content.nav.contact}</a>
        </nav>

        <div className="header-actions">
          <LanguageToggle />
          <a className="header-cta" href={`tel:${content.contactInfo.phones[0]}`}>
            {content.header.callUs}
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
