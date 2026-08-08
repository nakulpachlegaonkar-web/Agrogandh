import "./footer.css";
import { useSiteContent } from "../../hooks/useSiteContent";

export default function Footer() {
  const { content } = useSiteContent();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <p>{content.footer.copy}</p>
        <p>{content.contactInfo.office}</p>
        <p>
          <a href={`tel:${content.contactInfo.phones[0]}`}>{content.contactInfo.phones[0]}</a>
          <span>|</span>
          <a href={`tel:${content.contactInfo.phones[1]}`}>{content.contactInfo.phones[1]}</a>
          <span>|</span>
          <a href={`mailto:${content.contactInfo.email}`}>{content.contactInfo.email}</a>
        </p>
      </div>
    </footer>
  );
}
