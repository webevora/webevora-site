import React from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaCalendarAlt,
  FaClock,
  FaSearch,
  FaUserAlt,
} from "react-icons/fa";
import PageBanner from "../components/PageBanner";

const bannerImage =
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1920&q=80";

const featuredPost = {
  slug: "high-performance-website-increases-leads",
  title:
    "How a High-Performance Website Increases Leads for Service Businesses",
  excerpt:
    "A fast and well-structured website directly improves trust, SEO visibility, and conversion quality. Here is a practical approach to make your website a lead generation asset.",
  category: "Growth Strategy",
  author: "Webevora Team",
  date: "10 Jan 2026",
  readTime: "7 min read",
  image:
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=80",
};

const posts = [
  {
    slug: "website-redesign-checklist-better-conversion",
    title: "Website Redesign Checklist for Better Conversion",
    excerpt:
      "A clean UI alone is not enough. Learn the exact redesign checkpoints that improve engagement and reduce drop-offs.",
    category: "Web Design",
    author: "Editorial Desk",
    date: "04 Jan 2026",
    readTime: "5 min read",
  },
  {
    slug: "seo-foundations-for-new-business-website",
    title: "SEO Foundations Every New Business Website Needs",
    excerpt:
      "From technical setup to on-page structure, these basics help your website rank faster and attract quality traffic.",
    category: "SEO",
    author: "Webevora Team",
    date: "28 Dec 2025",
    readTime: "6 min read",
  },
  {
    slug: "ai-agents-for-faster-lead-qualification",
    title: "Using AI Agents for Faster Lead Qualification",
    excerpt:
      "Discover how AI agents can automate repetitive conversations and hand over only high-intent leads to your team.",
    category: "AI Automation",
    author: "Product Team",
    date: "22 Dec 2025",
    readTime: "8 min read",
  },
];

function Blog() {
  return (
    <>
      <PageBanner
        eyebrow="Webevora Insights"
        title="Ideas, strategies, and practical guides to grow your digital business."
        text="Explore articles on website performance, branding, SEO, marketing, and AI-powered workflows."
        image={bannerImage}
        alt="Modern workspace with laptop and analytics dashboard"
        pageName="Insights"
      />

      <section className="blog-page sr-reveal" aria-labelledby="blog-title">
        <div className="blog-top sr-reveal">
          <h1 id="blog-title" className="blog-title">
            Latest Articles
          </h1>
          <p className="blog-subtitle">
            Actionable insights to help you improve your online presence and
            business outcomes.
          </p>

          <button
            type="button"
            className="blog-search-btn"
            aria-label="Search articles"
          >
            <FaSearch aria-hidden="true" />
            Search Insights
          </button>
        </div>

        <article className="blog-featured sr-reveal" aria-label="Featured article">
          <figure className="blog-featured__media sr-reveal">
            <img
              src={featuredPost.image}
              alt={featuredPost.title}
              className="blog-featured__image"
              loading="lazy"
              decoding="async"
              fetchPriority="low"
            />
          </figure>

          <div className="blog-featured__content sr-reveal">
            <p className="blog-chip">{featuredPost.category}</p>
            <h2 className="blog-featured__title">{featuredPost.title}</h2>
            <p className="blog-featured__excerpt">{featuredPost.excerpt}</p>

            <div className="blog-meta" aria-label="Article meta">
              <span className="blog-meta__item">
                <FaUserAlt aria-hidden="true" /> {featuredPost.author}
              </span>
              <span className="blog-meta__item">
                <FaCalendarAlt aria-hidden="true" /> {featuredPost.date}
              </span>
              <span className="blog-meta__item">
                <FaClock aria-hidden="true" /> {featuredPost.readTime}
              </span>
            </div>

            <Link
              to={`/blog/${featuredPost.slug}`}
              className="blog-read-link"
              aria-label={`Read article: ${featuredPost.title}`}
            >
              Read Article <FaArrowRight aria-hidden="true" />
            </Link>
          </div>
        </article>

        <div className="blog-grid sr-reveal" aria-label="More articles">
          {posts.map((post) => (
            <article key={post.slug} className="blog-card sr-reveal">
              <p className="blog-chip">{post.category}</p>
              <h3 className="blog-card__title">{post.title}</h3>
              <p className="blog-card__excerpt">{post.excerpt}</p>

              <div className="blog-meta">
                <span className="blog-meta__item">
                  <FaUserAlt aria-hidden="true" /> {post.author}
                </span>
                <span className="blog-meta__item">
                  <FaCalendarAlt aria-hidden="true" /> {post.date}
                </span>
                <span className="blog-meta__item">
                  <FaClock aria-hidden="true" /> {post.readTime}
                </span>
              </div>

              <Link
                to={`/blog/${post.slug}`}
                className="blog-read-link"
                aria-label={`Read article: ${post.title}`}
              >
                Read Article <FaArrowRight aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>

        <div className="blog-cta sr-reveal">
          <h2 className="blog-cta__title">
            Need tailored guidance for your business?
          </h2>
          <p className="blog-cta__text">
            Tell us your goals and we will recommend the best strategy for your
            website, marketing, and digital growth.
          </p>
          <Link to="/contact" className="blog-cta__link">
            Talk to Webevora
          </Link>
        </div>
      </section>
    </>
  );
}

export default Blog;
