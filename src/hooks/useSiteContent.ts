import { useTranslation } from "react-i18next";
import { siteContent, type SiteLanguage } from "../data/siteContent";

export function useSiteContent() {
  const { i18n } = useTranslation();
  const language: SiteLanguage = i18n.language.startsWith("mr") ? "mr" : "en";

  return {
    language,
    content: siteContent[language],
  };
}
