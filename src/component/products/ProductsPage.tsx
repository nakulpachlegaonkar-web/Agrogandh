import { type ChangeEvent, type FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { analyzeDisease, type DiseaseAnalysisResult } from "../../lib/diseaseDetection";
import { useSiteContent } from "../../hooks/useSiteContent";
import { fadeUp, staggerContainer, viewportSettings } from "../common/sectionMotion";
import "./productsPage.css";

type ProductsPageProps = {
  homeHref: string;
  contactHref: string;
};

type GuidanceResult = {
  locationNote: string;
  cropTitle: string;
  reason: string;
  tips: string[];
};

export default function ProductsPage({ homeHref, contactHref }: ProductsPageProps) {
  const { content, language } = useSiteContent();
  const pageContent = content.productsPage;
  const [guidanceForm, setGuidanceForm] = useState({
    location: "",
    season: pageContent.ai.guidance.seasons[0].value,
    soilType: pageContent.ai.guidance.soils[0].value,
  });
  const [guidanceResult, setGuidanceResult] = useState<GuidanceResult | null>(null);
  const [diseaseForm, setDiseaseForm] = useState({
    cropType: pageContent.ai.disease.crops[0].value,
    photoName: "",
    photo: null as File | null,
  });
  const [diseaseResult, setDiseaseResult] = useState<DiseaseAnalysisResult | null>(null);
  const [diseaseError, setDiseaseError] = useState("");
  const [isAnalyzingDisease, setIsAnalyzingDisease] = useState(false);

  const handleGuidanceChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setGuidanceForm((current) => ({ ...current, [name]: value }));
  };

  const handleGuidanceSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const recommendOnion =
      guidanceForm.season === "rabi" ||
      guidanceForm.soilType === "black" ||
      guidanceForm.soilType === "loamy";
    const recommendation = recommendOnion
      ? pageContent.ai.guidance.recommendations.onion
      : pageContent.ai.guidance.recommendations.chia;
    const cropTitle = recommendOnion
      ? content.products.items[0].name
      : content.products.items[1].name;

    setGuidanceResult({
      locationNote: guidanceForm.location,
      cropTitle,
      reason: recommendation.reason,
      tips: recommendation.tips,
    });
  };

  const handleDiseaseChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const input = event.target as HTMLInputElement;

    if (input.name === "photo") {
      const selectedFile = input.files?.[0] ?? null;
      setDiseaseForm((current) => ({
        ...current,
        photo: selectedFile,
        photoName: selectedFile?.name ?? "",
      }));
      setDiseaseResult(null);
      setDiseaseError("");
      return;
    }

    setDiseaseForm((current) => ({
      ...current,
      [input.name]: input.value,
    }));
  };

  const handleDiseaseSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!diseaseForm.photo) {
      setDiseaseError(pageContent.ai.disease.fileMissingError);
      return;
    }

    setDiseaseError("");
    setDiseaseResult(null);
    setIsAnalyzingDisease(true);

    try {
      const result = await analyzeDisease({
        cropType: diseaseForm.cropType as "onion" | "chia",
        file: diseaseForm.photo,
        language,
      });

      setDiseaseResult(result);
    } catch (error) {
      console.error("Failed to analyze crop image", error);
      setDiseaseError(
        error instanceof Error && error.message
          ? error.message
          : pageContent.ai.disease.errorMessage
      );
    } finally {
      setIsAnalyzingDisease(false);
    }
  };

  return (
    <section className="section products-page">
      <div className="shell">
        <motion.div
          className="products-page__intro"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <div className="products-page__intro-copy">
            <span className="tag tag--gold">{content.products.kicker}</span>
            <h1 className="headline products-page__title">{content.products.title}</h1>
            <p>{content.products.description}</p>
          </div>

          <div className="products-page__actions">
            <a className="button button--primary" href={contactHref}>
              {content.hero.secondaryCta}
            </a>
            <a className="button button--soft" href={homeHref}>
              {content.nav.home}
            </a>
          </div>
        </motion.div>

        <motion.section
          className="products-page__feature"
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeUp}
        >
          <span className="tag tag--gold">{pageContent.onion.kicker}</span>
          <h2 className="headline products-page__feature-title">{pageContent.onion.title}</h2>
          <p className="products-page__feature-subtitle">{pageContent.onion.subtitle}</p>

          <div className="products-page__cta-row">
            <a className="button button--primary" href="#product-catalog">
              {pageContent.knowMore}
            </a>
            <a className="button button--soft" href={contactHref}>
              {content.hero.secondaryCta}
            </a>
          </div>

          <div className="products-page__benefits">
            <h3>{pageContent.onion.whyTitle}</h3>
            <div className="products-page__benefit-grid">
              {pageContent.onion.points.map((point) => (
                <article key={point} className="products-page__benefit-card">
                  <span className="products-page__benefit-icon" aria-hidden="true">
                    ✓
                  </span>
                  <p>{point}</p>
                </article>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.div
          id="product-catalog"
          className="products-page__grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
        >
          {content.products.items.map((product) => (
            <motion.article
              key={`${product.name}-${product.variant}`}
              className="products-page__card"
              variants={fadeUp}
            >
              <div className="products-page__image">
                <img src={product.image} alt={product.name} />
              </div>

              <div className="products-page__copy">
                <span className="products-page__badge">{product.variant}</span>
                <h2>{product.name}</h2>
                <p>{product.description}</p>

                <ul className="products-page__list">
                  {product.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.section
          className="products-page__feature products-page__feature--soft"
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeUp}
        >
          <span className="tag tag--rose">{pageContent.chia.kicker}</span>
          <h2 className="headline products-page__feature-title">{pageContent.chia.title}</h2>
          <p className="products-page__feature-subtitle">{pageContent.chia.subtitle}</p>
          <p>{pageContent.chia.description}</p>

          <ul className="products-page__list">
            {content.products.items[1].highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </motion.section>

        <section className="products-page__ai">
          <motion.div
            className="section-heading section-heading--center"
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeUp}
          >
            <span className="tag tag--gold">{pageContent.ai.kicker}</span>
            <h2 className="headline">{pageContent.ai.title}</h2>
            <p>{pageContent.ai.description}</p>
          </motion.div>

          <motion.div
            className="products-page__ai-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
          >
            <motion.article className="ai-feature-card" variants={fadeUp}>
              <div className="ai-feature-card__header">
                <span className="material-symbols-outlined" aria-hidden="true">
                  agriculture
                </span>
                <div>
                  <h3>{pageContent.ai.guidance.title}</h3>
                  <p>{pageContent.ai.guidance.description}</p>
                </div>
              </div>

              <form className="ai-tool-form" onSubmit={handleGuidanceSubmit}>
                <div className="ai-tool-grid">
                  <label className="ai-tool-field ai-tool-field--full">
                    <span>{pageContent.ai.guidance.fields.location}</span>
                    <input
                      required
                      name="location"
                      type="text"
                      value={guidanceForm.location}
                      onChange={handleGuidanceChange}
                      placeholder={pageContent.ai.guidance.placeholders.location}
                    />
                  </label>

                  <label className="ai-tool-field">
                    <span>{pageContent.ai.guidance.fields.season}</span>
                    <select
                      name="season"
                      value={guidanceForm.season}
                      onChange={handleGuidanceChange}
                    >
                      {pageContent.ai.guidance.seasons.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="ai-tool-field">
                    <span>{pageContent.ai.guidance.fields.soilType}</span>
                    <select
                      name="soilType"
                      value={guidanceForm.soilType}
                      onChange={handleGuidanceChange}
                    >
                      {pageContent.ai.guidance.soils.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <button className="button button--soft button--compact" type="submit">
                  {pageContent.ai.guidance.action}
                </button>
              </form>

              {guidanceResult ? (
                <div className="ai-result">
                  <span className="ai-feature-card__label">{pageContent.ai.guidance.resultLabel}</span>
                  <h4>{guidanceResult.cropTitle}</h4>
                  <p>{guidanceResult.reason}</p>
                  <p className="ai-result__meta">
                    {pageContent.ai.guidance.locationInsight}: {guidanceResult.locationNote}
                  </p>
                  <ul className="ai-result__list">
                    {guidanceResult.tips.map((tip) => (
                      <li key={tip}>{tip}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </motion.article>

            <motion.article className="ai-feature-card ai-feature-card--accent" variants={fadeUp}>
              <div className="ai-feature-card__header">
                <span className="material-symbols-outlined" aria-hidden="true">
                  biotech
                </span>
                <div>
                  <h3>{pageContent.ai.disease.title}</h3>
                  <p>{pageContent.ai.disease.description}</p>
                </div>
              </div>

              <form className="ai-tool-form" onSubmit={handleDiseaseSubmit}>
                <div className="ai-tool-grid">
                  <label className="ai-tool-field">
                    <span>{pageContent.ai.disease.fields.cropType}</span>
                    <select
                      name="cropType"
                      value={diseaseForm.cropType}
                      onChange={handleDiseaseChange}
                    >
                      {pageContent.ai.disease.crops.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="ai-tool-field ai-tool-field--full">
                    <span>{pageContent.ai.disease.fields.photo}</span>
                    <input
                      required
                      name="photo"
                      type="file"
                      accept="image/*"
                      onChange={handleDiseaseChange}
                    />
                    <small className="ai-upload-note">
                      {diseaseForm.photoName || pageContent.ai.disease.uploadHint}
                    </small>
                  </label>
                </div>

                {diseaseError ? (
                  <p className="ai-status ai-status--error" role="alert">
                    {diseaseError}
                  </p>
                ) : null}

                {isAnalyzingDisease ? (
                  <p className="ai-status" role="status">
                    {pageContent.ai.disease.loadingLabel}
                  </p>
                ) : null}

                <button
                  className="button button--primary button--compact"
                  type="submit"
                  disabled={isAnalyzingDisease}
                >
                  {isAnalyzingDisease
                    ? pageContent.ai.disease.loadingLabel
                    : pageContent.ai.disease.action}
                </button>
              </form>

              {diseaseResult ? (
                <div className="ai-result">
                  <span className="ai-feature-card__label">{pageContent.ai.disease.resultLabel}</span>
                  <h4>{diseaseResult.disease}</h4>
                  <p>{diseaseResult.summary}</p>

                  <div className="ai-result__facts">
                    <p>
                      <strong>{pageContent.ai.disease.confidenceLabel}:</strong>{" "}
                      {diseaseResult.confidence}
                    </p>
                    <p>
                      <strong>{pageContent.ai.disease.severityLabel}:</strong>{" "}
                      {diseaseResult.severity}
                    </p>
                  </div>

                  <span className="ai-feature-card__label">
                    {pageContent.ai.disease.symptomsLabel}
                  </span>
                  <ul className="ai-result__list">
                    {diseaseResult.visibleSymptoms.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  <span className="ai-feature-card__label">
                    {pageContent.ai.disease.likelyCausesLabel}
                  </span>
                  <ul className="ai-result__list">
                    {diseaseResult.likelyCauses.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  <span className="ai-feature-card__label">
                    {pageContent.ai.disease.immediateActionsLabel}
                  </span>
                  <ul className="ai-result__list">
                    {diseaseResult.immediateActions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  <span className="ai-feature-card__label">
                    {pageContent.ai.disease.preventionLabel}
                  </span>
                  <ul className="ai-result__list">
                    {diseaseResult.prevention.map((item: string) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  {diseaseResult.needsExpertReview ? (
                    <p className="ai-result__meta">
                      {pageContent.ai.disease.expertReviewLabel}
                    </p>
                  ) : null}

                  <p className="ai-result__disclaimer">{diseaseResult.disclaimer}</p>
                </div>
              ) : null}
            </motion.article>
          </motion.div>
        </section>

        <motion.div
          className="products-page__footer"
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeUp}
        >
          <div>
            <h2>{content.contact.title}</h2>
            <p>{content.contact.description}</p>
          </div>

          <a className="inline-link" href={contactHref}>
            {content.contact.fields.submit}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
