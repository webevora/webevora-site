import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaBolt,
  FaBullseye,
  FaCompass,
  FaHandshake,
  FaLightbulb,
  FaRocket,
  FaShieldAlt,
  FaUsers,
} from "react-icons/fa";
import PageBanner from "../components/PageBanner";
import AboutBanner from "../image/abour-banner.jpg";
import AboutHero from "../image/about-hero.jpg";
import AboutValues from "../image/about.jpg";

const bannerImage = AboutBanner;

const values = [
  {
    title: "Integrity in Execution",
    text: "We believe in honest timelines, clear communication, and full transparency. Every project is delivered with accountability, ensuring trust and consistency in every engagement.",
    tag: "01",
  },
  {
    title: "Innovation with Purpose",
    text: "We use modern technology and AI thoughtfully—only where it adds real value. Our focus is on practical innovation that drives measurable results, not unnecessary complexity.",
    tag: "02",
  },
  {
    title: "Client-Centric Collaboration",
    text: "Your goals are at the center of everything we do. We work closely with you to align strategy, design, and development with outcomes that truly matter for your business.",
    tag: "03",
  },
  {
    title: "Long-Term Partnership",
    text: "We aim to build lasting relationships, not just complete projects. Beyond launch, we support continuous improvement, optimization, and sustainable growth.",
    tag: "04",
  },
];

const heroImage = AboutHero;

const purposeCards = [
  {
    label: "Mission",
    title: "Build practical digital solutions that accelerate business growth.",
    text: "We build practical and impactful digital solutions that help businesses grow faster and perform better. Our focus is on creating clear, reliable, and user-friendly systems that deliver real results. We combine strategy, design, and technology to ensure every project adds measurable value. From planning to execution, we prioritize quality, performance, and scalability. Our goal is to improve customer experience, increase conversions, and support long-term success. We believe in delivering solutions that not only work today but continue to grow with your business.",
    icon: <FaRocket aria-hidden="true" />,
  },
  {
    label: "Vision",
    title:
      "Become the most trusted digital growth partner for modern businesses.",
    text: "Our vision is to become a trusted digital partner for modern businesses worldwide. We aim to combine innovation, technology, and clear communication to help clients grow with confidence. We focus on building long-term partnerships that create consistent and meaningful results. Our goal is to develop scalable and future-ready digital solutions that adapt to changing needs. We strive to make digital growth simple, effective, and sustainable for every business. We believe in creating solutions that continue to deliver value over time.",
    icon: <FaLightbulb aria-hidden="true" />,
  },
];

const pillars = [
  {
    title: "Strategic Clarity",
    text: "We begin by understanding your goals, audience, and priorities. Every decision is guided by a clear strategy to ensure meaningful outcomes and focused growth.",
    icon: <FaBullseye aria-hidden="true" />,
  },
  {
    title: "Quality-First Execution",
    text: "From design to development, we focus on clean, secure, and high-performance solutions that deliver reliability and long-term value.",
    icon: <FaShieldAlt aria-hidden="true" />,
  },
  {
    title: "Transparent Communication",
    text: "We maintain open communication with clear timelines, regular updates, and honest feedback at every stage of the project.",
    icon: <FaUsers aria-hidden="true" />,
  },
  {
    title: "Ongoing Growth Support",
    text: "Our work continues beyond launch. We provide continuous optimization, improvements, and performance tracking to support your long-term success.",
    icon: <FaHandshake aria-hidden="true" />,
  },
];

const process = [
  {
    title: "Discover",
    text: "We begin by understanding your business, audience, and goals. Through research and planning, we define a clear direction to build the right digital solution.",
    icon: <FaCompass aria-hidden="true" />,
  },
  {
    title: "Build",
    text: "We turn ideas into reality with clean design, strong development, and careful execution. Every step focuses on quality, performance, and a smooth user experience.",
    icon: <FaBolt aria-hidden="true" />,
  },
  {
    title: "Grow",
    text: "After launch, we continuously improve and optimize your platform. Our focus is on increasing performance, user engagement, and long-term business growth.",
    icon: <FaHandshake aria-hidden="true" />,
  },
];

function About() {
  useEffect(() => {
    const revealItems = document.querySelectorAll(".ar-values-node");

    // Set per-card stagger index for smooth reveal timing
    revealItems.forEach((item, index) => {
      item.style.setProperty("--reveal-delay", `${index * 90}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0.22) {
            entry.target.classList.add("is-visible");
          } else {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      {
        threshold: [0, 0.12, 0.22, 0.4, 0.65, 1],
        rootMargin: "0px 0px -10% 0px",
      },
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <PageBanner
        eyebrow="About Webevora"
        title="WE DESIGN AND BUILD GROWTH-FOCUSED DIGITAL EXPERIENCES"
        text="We combine strategy, creativity, and technology to build digital experiences that not only look great but also perform, scale, and deliver real business results."
        image={bannerImage}
        alt="Team collaboration for digital product strategy"
        pageName="About"
      />

      <section className="about-redesign" aria-labelledby="about-title">
        <div className="ar-hero sr-reveal">
          <div className="ar-hero__copy sr-reveal">
            <p className="ar-badge">About Webevora</p>
            <h1 id="about-title" className="ar-title">
             WE BUILD WEBSITES, APPS, AND DIGITAL SYSTEMS THAT MAKE BUSINESSES STRONGER ONLINE
            </h1>
            <p className="ar-subtitle">
              We blend strategy, design, and technology to build digital 
              solutions that perform, scale, and drive real business growth.
            </p>

            <div className="ar-chips" aria-label="What defines our work">
              <span className="ar-chip">Clarity First</span>
              <span className="ar-chip">Performance Driven</span>
              <span className="ar-chip">Built for Growth</span>
            </div>

            <div className="ar-actions">
              <Link to="/contact" className="ar-btn ar-btn--primary">
                Start Your Project
              </Link>
              <Link to="/services" className="ar-btn ar-btn--ghost">
                View Services <FaArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>

          <figure className="ar-hero__media sr-reveal">
            <img
              src={heroImage}
              alt="Team collaborating on a digital project"
              className="ar-hero__image"
              loading="lazy"
              decoding="async"
              fetchPriority="low"
            />
          </figure>
        </div>

        <section className="ar-belief sr-reveal" aria-label="Mission and vision">
          <aside className="ar-belief__left sr-reveal">
            <p className="ar-belief__kicker">What We Believe</p>
            <h2 className="ar-belief__title">
              What We <span>Believe In</span>
            </h2>
            <p className="ar-belief__text">
              We believe in clarity, innovation, and results. Our goal 
              is to create digital solutions that deliver real value 
              and build long-term business success.
            </p>
            <Link to="/contact" className="ar-belief__cta">
              Let&apos;s Connect <FaArrowRight aria-hidden="true" />
            </Link>
          </aside>

          <div
            className="ar-belief__right"
            aria-label="Mission and vision scroll area"
          >
            {purposeCards.map((card) => (
              <article key={card.label} className="ar-belief-card sr-reveal">
                <p className="ar-belief-card__label">
                  <span className="ar-belief-card__icon">{card.icon}</span>
                  {card.label}
                </p>
                <h3 className="ar-belief-card__title">{card.title}</h3>
                <p className="ar-belief-card__text">{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="ar-values-unique sr-reveal" aria-label="Our values section">
          <div className="ar-section-head ar-section-head--center sr-reveal">
            <h2 className="ar-section-head__title ar-section-head__title--bungee">
              Our Values
            </h2>
            <p className="ar-section-head__subtitle">
              Principles that shape every decision, design, and delivery.
            </p>
          </div>

          <div className="ar-values-showcase sr-reveal">
            <div className="ar-values-timeline" aria-label="Values timeline">
              <div className="ar-values-timeline__line" aria-hidden="true" />
              {values.map((item) => (
                <article
                  key={item.title}
                  className={`ar-values-node ar-values-node--${item.tag}`}
                  data-value-number={item.tag}
                >
                  <span className="ar-values-node__dot" aria-hidden="true" />
                  <span className="ar-values-node__tag">{item.tag}</span>
                  <div className="ar-values-node__content">
                    <h3 className="ar-values-node__title">{item.title}</h3>
                    <p className="ar-values-node__text">{item.text}</p>
                  </div>
                </article>
              ))}
            </div>

            <aside
              className="ar-values-visual sr-reveal"
              aria-label="Values visual panel"
            >
              <figure className="ar-values-visual__media">
                <img
                  src={AboutValues}
                  alt="Team values and collaboration visual"
                  className="ar-values-visual__image"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                />
              </figure>

              <div
                className="ar-values-visual__chips"
                aria-label="Value keywords"
              >
                <span className="ar-values-visual__chip">GOALS</span>
                <span className="ar-values-visual__chip">INNOVATION</span>
                <span className="ar-values-visual__chip">TEAMWORK</span>
                <span className="ar-values-visual__chip">INTEGRITY</span>
                <span className="ar-values-visual__chip">RESPONSIBILITY</span>
                <span className="ar-values-visual__chip">CLIENT SUCCESS</span>
              </div>
            </aside>
          </div>
        </section>

        <section
          className="home-process sr-reveal"
          aria-label="How we work section"
        >
          <div className="home-section-head sr-reveal">
            <p className="home-section-head__kicker">Our Process</p>
            <h2 className="home-section-head__title">
              How We Work With You
            </h2>
            <p className="home-section-head__text">
              A simple process from idea to growth.
            </p>
          </div>

          <div className="home-process__grid" aria-label="How we work">
            {process.map((step) => (
              <article key={step.title} className="home-process-card sr-reveal">
                <span className="home-process-card__icon">{step.icon}</span>
                <h3 className="home-process-card__title">{step.title}</h3>
                <p className="home-process-card__text">{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="ar-block ar-block--strengths ar-block--strengths-unique sr-reveal"
          aria-label="Core values section"
        >
          <div className="ar-section-head ar-section-head--center ar-section-head--strengths-unique sr-reveal">
            <h2 className="ar-section-head__title ar-section-head__title--bungee">
              Why Choose Us
            </h2>
            <p className="ar-section-head__subtitle">
              Four reasons businesses trust Webevora for digital growth.
            </p>
          </div>

          <div className="ar-strength-orbit" aria-label="Why choose us">
            {pillars.map((item, index) => (
              <article
                key={item.title}
                className={`ar-strength-card ar-strength-card--${index + 1} sr-reveal`}
              >
                <div className="ar-strength-card__glow" aria-hidden="true" />
                <span className="ar-strength-card__icon">{item.icon}</span>
                <h3 className="ar-strength-card__title">{item.title}</h3>
                <p className="ar-strength-card__text">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="ar-cta sr-reveal">
          <h2 className="ar-cta__title">
            LET&apos;S BUILD YOUR NEXT DIGITAL MILESTONE.
          </h2>
          <p className="ar-cta__text">
            Tell us what you want to create or improve, and our team 
            will design a clear, practical plan to bring your vision 
            to life with the right strategy, technology, and execution.
          </p>
          <Link to="/contact" className="ar-btn ar-btn--primary">
            Start Your Project
          </Link>
        </div>
      </section>
    </>
  );
}

export default About;
