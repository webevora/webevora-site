import React, { useState } from "react";
import PageBanner from "../components/PageBanner";
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { apiFetch, parseApiResponse } from "../utils/api";

const contactPhotoUrl =
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80";

const quickItems = [
  {
    icon: <FaEnvelope aria-hidden="true" />,
    label: "Mail",
    value: "info@webevora.com",
    href: "mailto:info@webevora.com",
  },
  {
    icon: <FaPhoneAlt aria-hidden="true" />,
    label: "Call",
    value: "+91 81606 82894",
    href: "tel:+918160682894",
  },
  {
    icon: <FaWhatsapp aria-hidden="true" />,
    label: "WhatsApp",
    value: "+91 70412 66313",
    href: "https://wa.me/917041266313",
  },
  {
    icon: <FaMapMarkerAlt aria-hidden="true" />,
    label: "Location",
    value: "Ahmedabad, India",
    href: "https://maps.google.com",
  },
];

const socialLinks = [
  {
    name: "Instagram",
    handle: "@webentra14",
    href: "https://www.instagram.com/webentra14",
    icon: <FaInstagram aria-hidden="true" />,
    colorClass: "contact-social-card--instagram",
  },
  {
    name: "LinkedIn",
    handle: "Webevora Studio",
    href: "https://www.linkedin.com/company/webentra/",
    icon: <FaLinkedinIn aria-hidden="true" />,
    colorClass: "contact-social-card--linkedin",
  },
  {
    name: "Facebook",
    handle: "Webevora",
    href: "https://www.facebook.com/WebEntra",
    icon: <FaFacebookF aria-hidden="true" />,
    colorClass: "contact-social-card--facebook",
  },
  {
    name: "WhatsApp",
    handle: "Start Chat",
    href: "https://wa.me/917041266313",
    icon: <FaWhatsapp aria-hidden="true" />,
    colorClass: "contact-social-card--whatsapp",
  },
  {
    name: "Email",
    handle: "info@webevora.com",
    href: "mailto:info@webevora.com",
    icon: <FaEnvelope aria-hidden="true" />,
    colorClass: "contact-social-card--mail",
  },
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

function Contact() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await apiFetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          phone: form.phone.trim() || null,
          service: form.service || null,
          message: form.message.trim(),
        }),
      });
      const data = await parseApiResponse(response);
      setSuccessMessage(data.message || "Your inquiry was submitted successfully.");
      setForm(initialForm);
    } catch (requestError) {
      setErrorMessage(
        requestError.message || "Unable to submit your inquiry right now."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageBanner
        eyebrow="Get In Touch"
        title="Let’s discuss your project and build something impactful together."
        text="Share your requirements, timeline, and goals — our team will help you with the right digital execution plan."
        image="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1900&q=80"
        alt="Team discussion and client communication in modern office"
        pageName="Contact"
      />

      <section className="contact-page sr-reveal" aria-labelledby="contact-title">
        <div className="contact-bg contact-bg--one" aria-hidden="true" />
        <div className="contact-bg contact-bg--two" aria-hidden="true" />

        <div className="contact-top sr-reveal">
          <div className="contact-top-layout">
            <div className="contact-top-copy sr-reveal">
              <p className="contact-kicker">
                Let&apos;s Build Something Meaningful
              </p>
              <h1 id="contact-title" className="contact-title">
                Tell us your idea. We&apos;ll shape it into a fast, clear,
                high-converting digital solution.
              </h1>
              <p className="contact-subtitle">
                Whether you need a growth-ready website, a full platform, or a
                redesign that performs, our team is ready to collaborate.
              </p>
            </div>

            <figure className="contact-photo-wrap sr-reveal">
            <img
              src={contactPhotoUrl}
              alt="Professional team discussing a project"
              className="contact-photo"
              loading="lazy"
              decoding="async"
              fetchPriority="low"
            />
            </figure>
          </div>
        </div>

        <div className="contact-grid sr-reveal">
          <aside className="contact-panel sr-reveal" aria-label="Direct contact options">
            <h2 className="contact-panel__title">Reach Out Directly</h2>
            <p className="contact-panel__text">
              Prefer direct communication? Use any channel below and we&apos;ll
              respond quickly.
            </p>

            <div className="contact-quick-list">
              {quickItems.map((item) => (
                <a
                  className="contact-quick sr-reveal"
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  <span className="contact-quick__icon">{item.icon}</span>
                  <span className="contact-quick__meta">
                    <span className="contact-quick__label">{item.label}</span>
                    <span className="contact-quick__value">{item.value}</span>
                  </span>
                </a>
              ))}
            </div>

            <div className="contact-note">
              <strong>Typical Response Time:</strong> Within 2-4 working hours.
            </div>
          </aside>

          <div className="contact-form-wrap sr-reveal">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form__row">
                <label className="contact-label" htmlFor="name">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="contact-input"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="contact-form__row contact-form__row--two">
                <div>
                  <label className="contact-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="contact-input"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="name@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="contact-label" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="contact-input"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 xxxxx xxxxx"
                  />
                </div>
              </div>

              <div className="contact-form__row">
                <label className="contact-label" htmlFor="service">
                  Service Needed
                </label>
                <select
                  id="service"
                  name="service"
                  className="contact-input"
                  value={form.service}
                  onChange={handleChange}
                >
                  <option value="">
                    Select a service
                  </option>
                  <option value="web-design">Website Design</option>
                  <option value="development">Web App Development</option>
                  <option value="design-strategy">Design & Strategy</option>
                  <option value="seo">SEO & Growth</option>
                </select>
              </div>

              <div className="contact-form__row">
                <label className="contact-label" htmlFor="message">
                  Project Brief
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="contact-input contact-input--textarea"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us your goals, timeline and expectations..."
                  required
                />
              </div>

              {successMessage ? (
                <p className="contact-feedback contact-feedback--success">
                  {successMessage}
                </p>
              ) : null}

              {errorMessage ? (
                <p className="contact-feedback contact-feedback--error">
                  {errorMessage}
                </p>
              ) : null}

              <button type="submit" className="contact-submit" disabled={submitting}>
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>

        <section
          className="contact-social-section sr-reveal"
          aria-label="Social media links"
        >
          <div className="contact-social-head">
            <p className="contact-social-kicker">Connect Socially</p>
            <h2 className="contact-social-title">
              Follow Webevora on Social Platforms
            </h2>
            <p className="contact-social-subtitle">
              Pick the channel you use most and reach us there.
            </p>
          </div>

          <div className="contact-social-grid">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`contact-social-card ${item.colorClass}`}
                aria-label={`Open ${item.name}`}
              >
                <span className="contact-social-card__icon">{item.icon}</span>
                <span className="contact-social-card__meta">
                  <span className="contact-social-card__name">{item.name}</span>
                  <span className="contact-social-card__handle">
                    {item.handle}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </section>
      </section>
    </>
  );
}

export default Contact;
