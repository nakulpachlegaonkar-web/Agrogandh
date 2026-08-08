import "./aboutPage.css";
import { motion } from "framer-motion";
import aboutExpoGroupImage from "../../public/images/about/about-expo-group.jpeg";
// import aboutKisanBannerImage from "../../public/images/about/about-kisan-banner.jpeg";
import aboutStallGroupImage from "../../public/images/about/about-stall-group.jpeg";
import cropFieldImage from "../../public/images/seeds/crop.png";
import type { SiteContent } from "../../data/siteContent";
import { fadeUp, staggerContainer, viewportSettings } from "../common/sectionMotion";
import VerticalImageGallery, {
  type VerticalImageGalleryItem,
} from "./VerticalImageGallery";

type AboutPageProps = {
  content: SiteContent;
};

const pillarIcons = ["handshake", "workspace_premium", "lightbulb", "groups_2"] as const;
const valueIcons = ["groups", "eco", "trending_up", "diversity_3"] as const;

export default function AboutPage({ content }: AboutPageProps) {
  const galleryItems: VerticalImageGalleryItem[] = [
    {
      src: aboutStallGroupImage,
      alt: content.aboutPage.gallery.galleryLargeAlt,
      label: content.aboutPage.pillars[0],
    },
    {
      src: aboutExpoGroupImage,
      alt: content.aboutPage.gallery.galleryTopAlt,
      label: content.aboutPage.pillars[1],
    },
  ];

  return (
    <section className="section about-page-section">
      <div className="shell about-page-shell">
        <motion.article
          className="about-page-card"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <div className="about-page-flow">
            <section className="about-hero">
              <div className="about-hero__copy">
                <span className="tag tag--gold">{content.nav.about}</span>
                <h1 className="about-hero__title">{content.aboutPage.title}</h1>
                <p>
                  {content.aboutPage.hero.paragraphStart}{" "}
                  <strong>{content.aboutPage.hero.leader}</strong>{" "}
                  {content.aboutPage.hero.paragraphEnd}
                </p>
                <p>{content.aboutPage.hero.paragraph}</p>
              </div>

              <div className="about-hero__media">
                <img
                  className="about-hero__field"
                  src={cropFieldImage}
                  alt={`${content.aboutPage.title} - ${content.brand.full}`}
                />
                <div className="about-hero__field-glow" aria-hidden="true" />

                <div className="about-pillars">
                  {content.aboutPage.pillars.map((pillar, index) => (
                    <article key={pillar} className="about-pillars__item">
                      <span className="material-symbols-outlined" aria-hidden="true">
                        {pillarIcons[index % pillarIcons.length]}
                      </span>
                      <strong>{pillar}</strong>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section className="about-gallery">
              <figure className="about-photo-card about-photo-card--feature">
                <img src={aboutExpoGroupImage} alt={content.aboutPage.gallery.galleryTopAlt} />
              </figure>

              <VerticalImageGallery
                className="about-gallery__stack"
                items={galleryItems}
                durationMs={16000}
              />
            </section>

            <section className="about-journey">
              <div className="about-journey__copy">
                <span className="about-section-kicker">{content.aboutPage.hero.bridge}</span>
                <h2 className="about-section-title">{content.aboutPage.journey.title}</h2>
                {content.aboutPage.journey.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <figure className="about-photo-card about-photo-card--journey">
                <img src={aboutStallGroupImage} alt={content.aboutPage.gallery.journeyAlt} />
              </figure>
            </section>

            <section className="about-quote">
              <div className="about-quote__badge" aria-hidden="true">
                <span className="material-symbols-outlined">eco</span>
              </div>
              <p>{content.aboutPage.quote}</p>
            </section>

            <motion.section
              className="about-values"
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={staggerContainer}
            >
              {content.aboutPage.values.map((value, index) => (
                <motion.article key={value} className="about-value" variants={fadeUp}>
                  <span className="about-value__icon material-symbols-outlined" aria-hidden="true">
                    {valueIcons[index % valueIcons.length]}
                  </span>
                  <div>
                    <strong>{value}</strong>
                    <span>{content.aboutPage.pillars[index % content.aboutPage.pillars.length]}</span>
                  </div>
                </motion.article>
              ))}
            </motion.section>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
