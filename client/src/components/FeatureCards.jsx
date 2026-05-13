import { HOME_FEATURES } from "../utils/constants.js";

function FeatureCards() {
  return (
    <section className="home-feature-section" id="features">
      <div className="home-section-copy">
        <p className="eyebrow">Features</p>
        <h2>Everything you need to become job-ready with confidence.</h2>
        <p className="muted-text">
          CareerPilot AI brings planning, resume building, and interview
          preparation together so students can focus on real progress.
        </p>
      </div>

      <div className="home-feature-grid">
        {HOME_FEATURES.map((feature, index) => (
          <article className="home-feature-card" key={feature.title}>
            <span className="home-feature-index">
              0{index + 1}
            </span>
            <strong>{feature.title}</strong>
            <p>{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default FeatureCards;
