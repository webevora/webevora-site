import React from "react";
import { Link } from "react-router-dom";
import { FaShieldAlt, FaCookieBite, FaLock } from "react-icons/fa";
import PageBanner from "../components/PageBanner";

const bannerImage =
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=2000&q=80";

const policySections = [
  {
    title: "Information We Collect",
    text:
      "We may collect basic contact details that you share with us through forms, email, or direct communication. This can include your name, email address, phone number, company name, and project details you choose to provide.",
  },
  {
    title: "How We Use Information",
    text:
      "We use the information you share to respond to enquiries, understand your requirements, provide services, improve our website, and keep communication clear during a project or support request.",
  },
  {
    title: "Cookies And Analytics",
    text:
      "Our website may use cookies or similar tools to understand visitor behavior, improve performance, and enhance user experience. You can control cookies through your browser settings.",
  },
  {
    title: "Data Security",
    text:
      "We take reasonable technical and organizational measures to help protect your information from unauthorized access, misuse, or disclosure.",
  },
  {
    title: "Third-Party Services",
    text:
      "Some site features may rely on trusted third-party services such as analytics, hosting, or social platforms. Their own privacy policies will also apply when you use those services.",
  },
  {
    title: "Your Choices",
    text:
      "You may contact us at any time to ask about the information we hold, request updates, or ask us to remove details where applicable and permitted by law.",
  },
];

const highlights = [
  {
    icon: <FaShieldAlt aria-hidden="true" />,
    title: "Respect for Privacy",
    text: "We keep the information you share limited to what is needed for service and communication.",
  },
  {
    icon: <FaCookieBite aria-hidden="true" />,
    title: "Cookie Transparency",
    text: "We use simple browser-based tools to support performance, security, and usability.",
  },
  {
    icon: <FaLock aria-hidden="true" />,
    title: "Safe Handling",
    text: "We aim to handle data responsibly and keep access restricted to relevant team members.",
  },
];

function PrivacyPolicy() {
  return (
    <>
      <PageBanner
        eyebrow="Legal"
        title="Privacy Policy"
        text="This page explains how we collect, use, and safeguard information when you visit or contact WebEntra."
        image={bannerImage}
        alt="Secure digital privacy and data protection visual"
        pageName="Privacy Policy"
      />

      <section className="privacy-page sr-reveal" aria-labelledby="privacy-title">
        <div className="privacy-intro sr-reveal">
          <p className="privacy-kicker">Your Privacy Matters</p>
          <h2 id="privacy-title" className="privacy-title">
            Clear, simple information about how we handle your data.
          </h2>
          <p className="privacy-subtitle">
            We keep this policy straightforward so you can understand what we
            collect, why we collect it, and how we keep it protected.
          </p>
        </div>

        <div className="privacy-highlights sr-reveal" aria-label="Privacy highlights">
          {highlights.map((item) => (
            <article key={item.title} className="privacy-highlight-card sr-reveal">
              <span className="privacy-highlight-card__icon">{item.icon}</span>
              <h3 className="privacy-highlight-card__title">{item.title}</h3>
              <p className="privacy-highlight-card__text">{item.text}</p>
            </article>
          ))}
        </div>

        <div className="privacy-grid sr-reveal">
          {policySections.map((item) => (
            <article key={item.title} className="privacy-card sr-reveal">
              <h3 className="privacy-card__title">{item.title}</h3>
              <p className="privacy-card__text">{item.text}</p>
            </article>
          ))}
        </div>

        <section className="privacy-contact sr-reveal" aria-label="Privacy contact">
          <div>
            <p className="privacy-contact__kicker">Questions?</p>
            <h2 className="privacy-contact__title">Need help understanding any part of this policy?</h2>
            <p className="privacy-contact__text">
              You can contact us anytime if you have questions about your
              information or want to discuss privacy-related concerns.
            </p>
          </div>
          <Link to="/contact" className="privacy-contact__link">
            Contact Us
          </Link>
        </section>

        <p className="privacy-note">
          This policy may be updated from time to time. Any changes will be
          reflected on this page with the updated version.
        </p>
      </section>
    </>
  );
}

export default PrivacyPolicy;
