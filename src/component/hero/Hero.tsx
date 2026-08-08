import "./Hero.css";
import { motion } from "framer-motion";
import { heroBackgroundImage } from "../../assets";
import { fadeUp, staggerContainer } from "../common/sectionMotion";
import { useSiteContent } from "../../hooks/useSiteContent";

const Hero = () => {
  const { content } = useSiteContent();

  return (
    <section id="home" className="hero">
      <div
        className="hero-banner"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(18, 18, 18, 0.82) 0%, rgba(18, 18, 18, 0.48) 42%, rgba(18, 18, 18, 0.22) 100%), url(${heroBackgroundImage})`,
        }}
      >
        <div className="hero-graphic hero-graphic-one" />
        <div className="hero-graphic hero-graphic-two" />
        <div className="hero-grid" />
        <div className="hero-inner">
          <motion.div
            className="hero-content"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.span className="hero-eyebrow" variants={fadeUp}>
              {content.hero.eyebrow}
            </motion.span>
            <motion.h1 variants={fadeUp}>{content.hero.title}</motion.h1>
            <motion.p variants={fadeUp}>{content.hero.description}</motion.p>

            <motion.div className="hero-actions" variants={fadeUp}>
              <a className="hero-button hero-button-primary" href="#products">
                {content.hero.primaryCta}
              </a>
              <a className="hero-button hero-button-secondary" href="#contact">
                {content.hero.secondaryCta}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
