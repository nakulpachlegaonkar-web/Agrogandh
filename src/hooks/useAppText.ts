import { useTranslation } from "react-i18next";

export function useAppText() {
  const { t, i18n } = useTranslation();

  return {
    lang: i18n.language,

    // Header
    brand: t("brand"),
    tagline: t("tagline"),

    // Sections
    newsTitle: t("newsTitle"),
    testimonialsTitle: t("testimonialsTitle"),
    aiTitle: t("aiTitle"),
    dealerTitle: t("dealerTitle"),

    // Actions
    submit: t("submit"),
    selectClimate: t("selectClimate"),
  };
}