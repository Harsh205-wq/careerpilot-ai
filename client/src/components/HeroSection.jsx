import { Link } from "react-router-dom";
import homeHeroScene from "../assets/images/home-hero-scene.svg";
import {
  HOME_HERO_METRICS,
  HOME_HIGHLIGHT_TAGS,
} from "../utils/constants.js";

function HeroSection() {
  return (
    <article className="home-hero-card">
      <div className="home-hero-copy">
        <p className="eyebrow">CareerPilot AI</p>
        <h1>Build your career roadmap with AI</h1>
        <p className="lead-text">
          CareerPilot AI helps students create resumes, prepare for interviews,
          and follow personalized roadmaps to become job-ready.
        </p>

        <div className="button-row">
          <Link className="button button-primary" to="/signup">
            Get started
          </Link>
          <Link className="button button-ghost" to="/login">
            Log in
          </Link>
        </div>

        <div className="home-pill-row" aria-label="CareerPilot highlights">
          {HOME_HIGHLIGHT_TAGS.map((tag) => (
            <span className="home-pill" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="home-hero-visual">
        <div className="home-dashboard-panel">
          <div className="home-dashboard-topline">
            <span className="home-dashboard-chip">AI Career Guidance</span>
            <strong>Job-ready dashboard</strong>
            <p>
              Track the parts of your preparation that actually move you closer
              to internships and full-time roles.
            </p>
          </div>

          <div className="home-dashboard-illustration">
            <div className="home-dashboard-glow" aria-hidden="true" />
            <img
              alt="Illustrated AI career guidance dashboard with roadmap and interview preparation"
              className="home-hero-image"
              src={homeHeroScene}
            />
          </div>

          <div className="home-dashboard-grid" aria-label="Career progress snapshot">
            {HOME_HERO_METRICS.map((item) => (
              <article className="home-dashboard-stat" key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </article>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default HeroSection;
