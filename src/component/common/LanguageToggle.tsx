import { useTranslation } from "react-i18next";
import "./LanguageToggle.css";

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const activeLanguage = i18n.language.startsWith("mr") ? "mr" : "en";

  const setLanguage = (language: "en" | "mr") => {
    i18n.changeLanguage(language);

    if (typeof window !== "undefined") {
      window.localStorage.setItem("appLang", language);
    }
  };

  return (
    <div className="lang-toggle" role="group" aria-label="Select language">
      <button
        type="button"
        className={activeLanguage === "en" ? "active" : ""}
        aria-pressed={activeLanguage === "en"}
        onClick={() => setLanguage("en")}
      >
        English
      </button>

      <button
        type="button"
        className={activeLanguage === "mr" ? "active" : ""}
        aria-pressed={activeLanguage === "mr"}
        onClick={() => setLanguage("mr")}
      >
        मराठी
      </button>
    </div>
  );
}
