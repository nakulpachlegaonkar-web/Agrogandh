import { type FormEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { logoImage } from "./assets";
import AboutPage from "./component/company/AboutPage";
import { fadeUp, staggerContainer, viewportSettings } from "./component/common/sectionMotion";
import ProductsPage from "./component/products/ProductsPage";
import { designImages } from "./designImages";
import { useSiteContent } from "./hooks/useSiteContent";
import { saveEnquiry } from "./lib/enquiryStorage";

const uiCopy = {
  en: {
    heroBadge: "ROOTED IN TRUST",
    heroTitleLead: "High-Quality Onion Seeds for",
    heroTitleAccent: "Stronger Crops",
    heroDescription:
      "Agrogandh Seeds Pvt. Ltd. combines dependable seed quality, field-focused support, and a premium presentation for modern agriculture.",
    trustIcons: ["verified", "agriculture", "support_agent", "forum"] as const,
    journeyTitle: "Our Seed Journey",
    journeyQuote: '"Rooted in Trust. Growing with Science."',
    journeyMetrics: [
      { value: "Onion Focus", label: "Reliable onion seed performance" },
      { value: "2 Products", label: "Specialized seed portfolio" },
    ],
    processBadge: "PRODUCT JOURNEY",
    impactTitle: "Guided by Long-Term Impact",
    valuesTitle: "Rooted in Strong Values",
    valuesDescription:
      "Our operating principles are designed to support farmer confidence, careful quality control, and long-term agricultural partnerships.",
    collectionTitle: "Our Premium Collection",
    collectionDescription:
      "A focused catalog built around dependable seed quality and clear product information.",
    collectionCta: "Explore all products",
    collectionBadge: "PREMIUM VARIETY",
    collectionLink: "Product Specifications",
    workTitle: "Work With Us",
    workDescription:
      "Connect with our team for dealership opportunities, field inquiries, and tailored support.",
    workCta: "Start the Conversation",
    mediaTitle: "Media and Insights",
    mediaCta: "Follow Our Updates",
    contactLead:
      "For product inquiries, dealership discussions, or direct support, reach out to our team and we’ll guide you to the right seed solution.",
    formNote: "Your inquiry will be saved securely and shared with our team.",
    formSuccess: "Thanks. Your inquiry has been saved successfully.",
    formError: "We could not save your inquiry right now. Please try again.",
    formSaving: "Saving...",
    mailSubjectPrefix: "Seed inquiry",
    newsletterTitle: "Newsletter",
    newsletterPlaceholder: "Your email",
    newsletterButton: "arrow_forward",
    newsletterSubject: "Newsletter interest",
    footerQuickLinks: "Quick Links",
    footerSupport: "Support",
    navLabel: "Primary navigation",
    languageLabel: "Select language",
    emailAria: "Email",
    whatsappAria: "WhatsApp",
    instagramAria: "Instagram",
    facebookAria: "Facebook",
    chatAria: "Chat on WhatsApp",
    valuesItems: [
      {
        title: "Integrity",
        description:
          "We uphold honesty, transparency, and strong ethics in every relationship and decision.",
      },
      {
        title: "Quality",
        description:
          "We are dedicated to delivering superior seeds that ensure reliability and consistent crop performance.",
      },
      {
        title: "Farmer Focus",
        description:
          "Farmers are at the center of everything we do, and we work to support their growth and success.",
      },
      {
        title: "Commitment",
        description:
          "We remain committed to excellence, delivering dependable products and lasting partnerships.",
      },
      {
        title: "Transparency",
        description:
          "We believe in open communication and accountability with farmers, partners, and stakeholders.",
      },
      {
        title: "Innovation",
        description:
          "We continuously pursue new ideas and advancements to develop better seeds for the future of farming.",
      },
    ],
    mediaDescription:
      "Follow our journey as we focus on innovation, strict quality standards, and sustainable agricultural growth.",
    whatsappLabel: "WhatsApp",
  },
  mr: {
    heroBadge: "विश्वासावर आधारित",
    heroTitleLead: "उच्च-गुणवत्तेची कांदा आणि चिया बियाणे",
    heroTitleAccent: "मजबूत पिकांसाठी",
    heroDescription:
      "ॲग्रोगंध सीड्स प्रा. लि. विश्वासार्ह बियाण्यांची गुणवत्ता, शेतकऱ्यांवर केंद्रित सहाय्य आणि आधुनिक शेतीसाठी प्रीमियम सादरीकरण यांचा समन्वय करते.",
    trustIcons: ["verified", "agriculture", "support_agent", "forum"] as const,
    journeyTitle: "आमचा बियाणे प्रवास",
    journeyQuote: '"विश्वासातून रुजलेले. विज्ञानातून वाढणारे."',
    journeyMetrics: [
      { value: "कांदा केंद्रित", label: "विश्वासार्ह कांदा बियाणे कामगिरी" },
      { value: "2 उत्पादने", label: "विशेष बियाणे संच" },
    ],
    processBadge: "उत्पादन प्रवास",
    impactTitle: "दीर्घकालीन परिणामासाठी मार्गदर्शित",
    valuesTitle: "मजबूत मूल्यांमध्ये रुजलेले",
    valuesDescription:
      "आमची कार्यपद्धती शेतकऱ्यांचा विश्वास, काटेकोर गुणवत्ता नियंत्रण आणि दीर्घकालीन कृषी भागीदारी यांना बळकटी देण्यासाठी तयार केली आहे.",
    collectionTitle: "आमचा प्रीमियम संग्रह",
    collectionDescription:
      "विश्वासार्ह बियाण्यांची गुणवत्ता आणि प्रीमियम उत्पादन स्थाननिर्धारण यांवर आधारित केंद्रित उत्पादन संच.",
    collectionCta: "सर्व उत्पादने पहा",
    collectionBadge: "प्रीमियम वाण",
    collectionLink: "उत्पादन तपशील",
    workTitle: "आमच्यासोबत काम करा",
    workDescription:
      "डीलरशिप, शेतावरील चौकशी आणि वैयक्तिक सहाय्यासाठी आमच्या टीमशी संपर्क साधा.",
    workCta: "संवाद सुरू करा",
    mediaTitle: "मीडिया आणि माहिती",
    mediaCta: "आमचे अपडेट्स पहा",
    contactLead:
      "उत्पादन चौकशी, डीलरशिप चर्चा किंवा थेट सहाय्यासाठी आमच्या टीमशी संपर्क साधा आणि आम्ही योग्य बियाणे उपाय सुचवू.",
    formNote: "तुमची चौकशी सुरक्षितपणे जतन केली जाईल आणि आमच्या टीमपर्यंत पोहोचवली जाईल.",
    formSuccess: "धन्यवाद. तुमची चौकशी यशस्वीरित्या जतन झाली आहे.",
    formError: "सध्या तुमची चौकशी जतन करता आली नाही. कृपया पुन्हा प्रयत्न करा.",
    formSaving: "जतन करत आहे...",
    mailSubjectPrefix: "बियाणे चौकशी",
    newsletterTitle: "न्यूजलेटर",
    newsletterPlaceholder: "तुमचा ईमेल",
    newsletterButton: "arrow_forward",
    newsletterSubject: "न्यूजलेटर रुची",
    footerQuickLinks: "द्रुत दुवे",
    footerSupport: "सहाय्य",
    navLabel: "मुख्य नेव्हिगेशन",
    languageLabel: "भाषा निवडा",
    emailAria: "ईमेल",
    whatsappAria: "व्हॉट्सअॅप",
    instagramAria: "इन्स्टाग्राम",
    facebookAria: "फेसबुक",
    chatAria: "व्हॉट्सअॅपवर चॅट करा",
    valuesItems: [
      {
        title: "सचोटी",
        description:
          "प्रत्येक नातेसंबंध आणि निर्णयामध्ये आम्ही प्रामाणिकपणा, पारदर्शकता आणि मजबूत नैतिकता जपतो.",
      },
      {
        title: "गुणवत्ता",
        description:
          "विश्वासार्हता आणि सातत्यपूर्ण पीक कामगिरी सुनिश्चित करणारी उत्कृष्ट बियाणे देण्यासाठी आम्ही समर्पित आहोत.",
      },
      {
        title: "शेतकरी केंद्रित",
        description:
          "शेतकरी आमच्या प्रत्येक कामाच्या केंद्रस्थानी आहेत आणि त्यांच्या वाढीस व यशाला आम्ही साथ देतो.",
      },
      {
        title: "बांधिलकी",
        description:
          "विश्वासार्ह उत्पादने आणि दीर्घकालीन भागीदारी देत उत्कृष्टतेबद्दल आम्ही कटिबद्ध आहोत.",
      },
      {
        title: "पारदर्शकता",
        description:
          "शेतकरी, भागीदार आणि हितधारकांसोबत खुल्या संवादावर आणि जबाबदारीवर आम्ही विश्वास ठेवतो.",
      },
      {
        title: "नवोन्मेष",
        description:
          "शेतीच्या भविष्यासाठी अधिक चांगली बियाणे विकसित करण्यासाठी आम्ही सतत नवीन कल्पना आणि प्रगती शोधत राहतो.",
      },
    ],
    mediaDescription:
      "नवोन्मेष, कठोर गुणवत्ता निकष आणि शाश्वत कृषी वाढ यांवर लक्ष केंद्रित करत आमचा प्रवास पाहत राहा.",
    whatsappLabel: "WhatsApp",
  },
} as const;

type SitePage = "home" | "products" | "about";

function getCurrentPage(): SitePage {
  if (typeof window === "undefined") {
    return "home";
  }

  const page = new URLSearchParams(window.location.search).get("page");
  return page === "products" || page === "about" ? page : "home";
}

function App() {
  const { content, language } = useSiteContent();
  const { i18n } = useTranslation();
  const copy = uiCopy[language];
  const currentPage = getCurrentPage();
  const isProductsPage = currentPage === "products";
  const isAboutPage = currentPage === "about";
  const [isSavingInquiry, setIsSavingInquiry] = useState(false);
  const [inquiryStatus, setInquiryStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const currentPath = typeof window !== "undefined" ? window.location.pathname : "/";
  const buildPageHref = (page: SitePage = "home", hash = "") => {
    const params = new URLSearchParams();

    if (page !== "home") {
      params.set("page", page);
    }

    const query = params.toString();
    return `${currentPath}${query ? `?${query}` : ""}${hash}`;
  };
  const homeHref = buildPageHref("home");
  const aboutHref = buildPageHref("about");
  const journeyHref = buildPageHref("home", "#journey");
  const productsHref = buildPageHref("products");
  const contactHref = buildPageHref("home", "#contact");
  const whatsappUrl = `https://wa.me/${content.contactInfo.whatsappPhone}?text=${encodeURIComponent(
    content.whatsappMessage
  )}`;
  const navigationItems = [
    { href: homeHref, label: content.nav.home, page: "home" as const },
    { href: aboutHref, label: content.nav.about, page: "about" as const },
    { href: journeyHref, label: content.nav.journey },
    { href: productsHref, label: content.nav.products, page: "products" as const },
    { href: contactHref, label: content.nav.contact },
  ];

  useEffect(() => {
    document.title = isProductsPage
      ? `${content.nav.products} | ${content.brand.full}`
      : isAboutPage
        ? `${content.nav.about} | ${content.brand.full}`
      : content.brand.full;
    document.documentElement.lang = language;
  }, [content.brand.full, content.nav.about, content.nav.products, isAboutPage, isProductsPage, language]);

  const switchLanguage = (nextLanguage: "en" | "mr") => {
    i18n.changeLanguage(nextLanguage);

    if (typeof window !== "undefined") {
      window.localStorage.setItem("appLang", nextLanguage);
    }
  };

  const handleInquirySubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    setInquiryStatus(null);
    setIsSavingInquiry(true);

    try {
      await saveEnquiry({
        name,
        phone,
        email,
        message,
        language,
        sourcePage: isProductsPage ? "products" : "home",
      });

      form.reset();
      setInquiryStatus({
        type: "success",
        message: copy.formSuccess,
      });
    } catch (error) {
      console.error("Failed to save enquiry", error);
      setInquiryStatus({
        type: "error",
        message: error instanceof Error && error.message ? error.message : copy.formError,
      });
    } finally {
      setIsSavingInquiry(false);
    }
  };

  const handleNewsletterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("newsletterEmail") ?? "").trim();
    const subject = encodeURIComponent(copy.newsletterSubject);
    const body = encodeURIComponent(email);
    window.location.href = `mailto:${content.contactInfo.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div
      key={language}
      className={`app-shell app-shell--${language} app-shell--page-${currentPage}`}
    >
      <div className="shell">
        <div className="topbar">
          <a className="brand" href={homeHref} aria-label={content.brand.full}>
            <img src={logoImage} alt={content.brand.full} />
            <div>
              <strong>{content.brand.short}</strong>
              <span>{content.brand.sub}</span>
            </div>
          </a>

          <div className="topbar__actions">
            <nav className="mini-nav" aria-label={copy.navLabel}>
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={item.page === currentPage ? "page" : undefined}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="language-switch" role="group" aria-label={copy.languageLabel}>
              <button
                type="button"
                className={language === "en" ? "is-active" : undefined}
                onClick={() => switchLanguage("en")}
              >
                EN
              </button>
              <button
                type="button"
                className={language === "mr" ? "is-active" : undefined}
                onClick={() => switchLanguage("mr")}
              >
                MR
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="page-shell">
        {isProductsPage ? (
          <ProductsPage homeHref={homeHref} contactHref={contactHref} />
        ) : isAboutPage ? (
          <AboutPage content={content} />
        ) : (
          <>
            <section className="section hero-section" id="home">
              <div className="shell">
                <motion.div
                  className="hero-card"
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                >
                  <img
                    className="hero-card__image"
                    src={designImages.hero ?? ""}
                    alt={content.products.items[0].name}
                  />
                  <div className="hero-card__overlay" />
                  <div className="hero-card__content">
                    <span className="tag tag--gold">{copy.heroBadge}</span>
                    <h1 className="display-title">
                      {copy.heroTitleLead} <em>{copy.heroTitleAccent}</em>
                    </h1>
                    <p>{copy.heroDescription}</p>

                    <div className="button-row">
                      <a className="button button--primary" href={productsHref}>
                        {content.hero.primaryCta}
                      </a>
                      <a className="button button--soft" href={contactHref}>
                        {content.hero.secondaryCta}
                      </a>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="trust-grid"
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportSettings}
                  variants={staggerContainer}
                >
                  {content.reasons.items.map((item, index) => (
                    <motion.article key={item.title} className="trust-card" variants={fadeUp}>
                      <span className="trust-card__icon material-symbols-outlined" aria-hidden="true">
                        {copy.trustIcons[index]}
                      </span>
                      <h2>{item.title}</h2>
                      <p>{item.description}</p>
                    </motion.article>
                  ))}
                </motion.div>
              </div>
            </section>

            <section className="section story-section" id="about">
              <div className="shell story-layout">
                <motion.div
                  className="story-visual"
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportSettings}
                  variants={fadeUp}
                >
                  {designImages.storyField ? (
                    <img
                      className="story-visual__image"
                      src={designImages.storyField}
                      alt={copy.journeyTitle}
                    />
                  ) : (
                    <div
                      className="story-visual__field story-visual__field--placeholder"
                      aria-hidden="true"
                    />
                  )}
                  <div className="story-quote">{copy.journeyQuote}</div>
                </motion.div>

                <motion.div
                  className="story-copy"
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportSettings}
                  variants={fadeUp}
                >
                  <h2 className="headline">{copy.journeyTitle}</h2>
                  <p>{content.about.paragraphs[0]}</p>
                  <p>{content.about.paragraphs[1]}</p>

                  <div className="metric-row">
                    {copy.journeyMetrics.map((metric) => (
                      <article key={metric.value} className="metric-card">
                        <strong>{metric.value}</strong>
                        <span>{metric.label}</span>
                      </article>
                    ))}
                  </div>
                </motion.div>
              </div>
            </section>

            <section className="section section--band" id="journey">
              <div className="shell">
                <motion.div
                  className="section-heading section-heading--center"
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportSettings}
                  variants={fadeUp}
                >
                  <span className="tag tag--rose">{copy.processBadge}</span>
                  <h2 className="headline">{content.journey.title}</h2>
                  <p>{content.journey.description}</p>
                </motion.div>

                <motion.div
                  className="journey-grid"
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportSettings}
                  variants={staggerContainer}
                >
                  {content.journey.steps.map((step, index) => (
                    <motion.article key={step.title} className="journey-card" variants={fadeUp}>
                      <span className="journey-card__index">{`0${index + 1}`}</span>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </motion.article>
                  ))}
                </motion.div>
              </div>
            </section>

            <section className="section">
              <div className="shell">
                <motion.div
                  className="section-heading section-heading--center"
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportSettings}
                  variants={fadeUp}
                >
                  <h2 className="headline headline--underlined">{copy.impactTitle}</h2>
                </motion.div>

                <div className="impact-grid">
                  <motion.article
                    className="impact-card"
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportSettings}
                    variants={fadeUp}
                  >
                    <span className="impact-card__icon material-symbols-outlined" aria-hidden="true">
                      visibility
                    </span>
                    <span className="impact-card__ghost material-symbols-outlined" aria-hidden="true">
                      visibility
                    </span>
                    <h3>{content.visionMission.vision.label}</h3>
                    <p>{content.visionMission.vision.description}</p>
                  </motion.article>

                  <motion.article
                    className="impact-card impact-card--gold"
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportSettings}
                    variants={fadeUp}
                  >
                    <span className="impact-card__icon material-symbols-outlined" aria-hidden="true">
                      my_location
                    </span>
                    <span className="impact-card__ghost material-symbols-outlined" aria-hidden="true">
                      power_settings_new
                    </span>
                    <h3>{content.visionMission.mission.label}</h3>
                    <p>{content.visionMission.mission.description}</p>
                  </motion.article>
                </div>
              </div>
            </section>

            <section className="section">
              <div className="shell values-layout">
                <motion.div
                  className="values-copy"
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportSettings}
                  variants={fadeUp}
                >
                  <h2 className="headline">{copy.valuesTitle}</h2>
                  <p>{copy.valuesDescription}</p>
                  <div className="values-photo">
                    <img
                      src={designImages.values ?? content.products.items[0].image}
                      alt={content.products.items[0].name}
                    />
                  </div>
                </motion.div>

                <motion.div
                  className="values-grid"
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportSettings}
                  variants={staggerContainer}
                >
                  {copy.valuesItems.map((item, index) => (
                    <motion.article
                      key={item.title}
                      className={`value-card ${
                        index === 3 || index === 4 ? "value-card--highlight" : ""
                      }`}
                      variants={fadeUp}
                    >
                      <span className="value-card__icon material-symbols-outlined" aria-hidden="true">
                        {index % 2 === 0 ? "eco" : "workspace_premium"}
                      </span>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </motion.article>
                  ))}
                </motion.div>
              </div>
            </section>

            <section className="section section--band">
              <div className="shell">
                <motion.div
                  className="products-preview"
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportSettings}
                  variants={fadeUp}
                >
                  <div>
                    <span className="tag tag--rose">{content.products.kicker}</span>
                    <h2 className="headline">{copy.collectionTitle}</h2>
                    <p>{copy.collectionDescription}</p>
                  </div>

                  <a className="button button--primary button--compact" href={productsHref}>
                    {content.hero.primaryCta}
                  </a>
                </motion.div>
              </div>
            </section>

            <section className="section section--contact" id="contact">
              <div className="shell contact-layout">
                <motion.div
                  className="contact-copy"
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportSettings}
                  variants={fadeUp}
                >
                  <h2 className="headline">{content.contact.title}</h2>
                  <p>{copy.contactLead}</p>

                  <div className="contact-points">
                    <article className="contact-point">
                      <span className="material-symbols-outlined" aria-hidden="true">
                        location_on
                      </span>
                      <div>
                        <strong>{content.contact.officeLabel}</strong>
                        <p>{content.contactInfo.office}</p>
                      </div>
                    </article>

                    <article className="contact-point">
                      <span className="material-symbols-outlined" aria-hidden="true">
                        call
                      </span>
                      <div>
                        <strong>{content.contact.phoneLabel}</strong>
                        <div className="stack-links">
                          {content.contactInfo.phones.map((phone) => (
                            <a key={phone} href={`tel:${phone}`}>
                              {phone}
                            </a>
                          ))}
                        </div>
                      </div>
                    </article>

                    <article className="contact-point">
                      <span className="material-symbols-outlined" aria-hidden="true">
                        mail
                      </span>
                      <div>
                        <strong>{content.contact.emailLabel}</strong>
                        <a href={`mailto:${content.contactInfo.email}`}>{content.contactInfo.email}</a>
                      </div>
                    </article>
                  </div>

                  <a
                    className="contact-whatsapp"
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {copy.whatsappLabel}
                  </a>
                </motion.div>

                <motion.form
                  className="contact-form"
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportSettings}
                  variants={fadeUp}
                  onSubmit={handleInquirySubmit}
                >
                  <div className="form-grid">
                    <label className="field">
                      <span>{content.contact.fields.name}</span>
                      <input
                        required
                        name="name"
                        type="text"
                        placeholder={content.contact.fields.placeholders.name}
                      />
                    </label>

                    <label className="field">
                      <span>{content.contact.fields.phone}</span>
                      <input
                        required
                        name="phone"
                        type="tel"
                        placeholder={content.contact.fields.placeholders.phone}
                      />
                    </label>

                    <label className="field field--full">
                      <span>{content.contact.fields.email}</span>
                      <input
                        required
                        name="email"
                        type="email"
                        placeholder={content.contact.fields.placeholders.email}
                      />
                    </label>

                    <label className="field field--full">
                      <span>{content.contact.fields.message}</span>
                      <textarea
                        required
                        rows={5}
                        name="message"
                        placeholder={content.contact.fields.placeholders.message}
                      />
                    </label>
                  </div>

                  <p className="form-note">{copy.formNote}</p>

                  {inquiryStatus ? (
                    <p
                      className={`form-status ${
                        inquiryStatus.type === "success"
                          ? "form-status--success"
                          : "form-status--error"
                      }`}
                      role="status"
                    >
                      {inquiryStatus.message}
                    </p>
                  ) : null}

                  <button
                    className="button button--primary button--block"
                    type="submit"
                    disabled={isSavingInquiry}
                  >
                    {isSavingInquiry ? copy.formSaving : content.contact.fields.submit}
                  </button>
                </motion.form>
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="site-footer">
        <div className="shell footer-layout">
          <div className="footer-brand">
            <h2>{content.brand.short}</h2>
            <p>{content.about.description}</p>
            <div className="footer-socials">
              <a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label={copy.whatsappAria}>
                <span className="material-symbols-outlined" aria-hidden="true">
                  forum
                </span>
              </a>
              <a
                href={content.contactInfo.instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={copy.instagramAria}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 1.8A3.7 3.7 0 0 0 3.8 7.5v9a3.7 3.7 0 0 0 3.7 3.7h9a3.7 3.7 0 0 0 3.7-3.7v-9a3.7 3.7 0 0 0-3.7-3.7h-9Zm9.75 1.35a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8A3.2 3.2 0 1 0 12 15.2 3.2 3.2 0 0 0 12 8.8Z" />
                </svg>
              </a>
              <a
                href={content.contactInfo.facebookUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={copy.facebookAria}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M13.33 22v-8.2h2.76l.42-3.2h-3.18V8.56c0-.93.26-1.56 1.59-1.56h1.7V4.14A22.3 22.3 0 0 0 14.14 4c-2.45 0-4.13 1.5-4.13 4.24v2.36H7.22v3.2H10V22h3.33Z" />
                </svg>
              </a>
              <a href={`mailto:${content.contactInfo.email}`} aria-label={copy.emailAria}>
                <span className="material-symbols-outlined" aria-hidden="true">
                  mail
                </span>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <h3>{copy.footerQuickLinks}</h3>
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={item.page === currentPage ? "page" : undefined}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="footer-links">
            <h3>{copy.footerSupport}</h3>
            <a href={`mailto:${content.contactInfo.email}`}>{content.contactInfo.email}</a>
            {content.contactInfo.phones.map((phone) => (
              <a key={phone} href={`tel:${phone}`}>
                {phone}
              </a>
            ))}
            <a href={contactHref}>{content.nav.contact}</a>
          </div>

          <div className="footer-newsletter">
            <h3>{copy.newsletterTitle}</h3>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input
                required
                name="newsletterEmail"
                type="email"
                placeholder={copy.newsletterPlaceholder}
              />
              <button type="submit" aria-label={copy.newsletterTitle}>
                <span className="material-symbols-outlined" aria-hidden="true">
                  {copy.newsletterButton}
                </span>
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">{content.footer.copy}</div>
      </footer>

      <a
        className="whatsapp-fab"
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={copy.chatAria}
      >
        <span className="material-symbols-outlined" aria-hidden="true">
          forum
        </span>
        <span>{copy.whatsappLabel}</span>
      </a>
    </div>
  );
}

export default App;
