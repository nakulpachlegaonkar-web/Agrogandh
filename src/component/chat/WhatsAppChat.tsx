import "./whatsappChat.css";
import { useSiteContent } from "../../hooks/useSiteContent";

export default function WhatsAppChat() {
  const { content } = useSiteContent();

  const whatsappUrl = `https://wa.me/${content.contactInfo.whatsappPhone}?text=${encodeURIComponent(
    content.whatsappMessage
  )}`;

  return (
    <a
      href={whatsappUrl}
      className="whatsapp-chat"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      💬
    </a>
  );
}
