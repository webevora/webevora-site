import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaClock,
  FaTag,
  FaUserAlt,
} from "react-icons/fa";
import PageBanner from "../components/PageBanner";

const articleBanner =
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2000&q=80";

const articles = {
  "high-performance-website-increases-leads": {
    title: "How a High-Performance Website Increases Leads for Service Businesses",
    category: "Growth Strategy",
    author: "Webevora Team",
    date: "10 Jan 2026",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1800&q=80",
    intro:
      "A high-performance website is more than design. It directly influences trust, search visibility, and lead quality. For service businesses, website performance often decides whether a visitor converts or exits.",
    sections: [
      {
        heading: "1) Speed impacts trust and conversion",
        text: "Users judge credibility in seconds. Slow-loading pages reduce confidence and increase bounce rates. A fast site keeps visitors engaged, helps them consume more content, and improves form completion rates.",
      },
      {
        heading: "2) Better structure improves lead intent",
        text: "Clear service pages, focused CTAs, and clean navigation qualify users naturally. Visitors who understand your offer quickly are more likely to submit high-intent inquiries.",
      },
      {
        heading: "3) SEO and performance go together",
        text: "Technical performance, mobile responsiveness, and structured content support search ranking. Higher visibility means more relevant traffic, and relevant traffic means better lead quality.",
      },
      {
        heading: "4) Continuous optimization gives long-term growth",
        text: "A website should evolve with user behavior. Heatmaps, analytics, and conversion tracking help identify friction points. Small improvements over time create significant growth in inquiry volume.",
      },
    ],
    conclusion:
      "If your business depends on lead generation, your website must be treated as a growth system, not a brochure. Performance, clarity, and conversion-focused execution are the foundation of reliable digital growth.",
  },

  "website-redesign-checklist-better-conversion": {
    title: "Website Redesign Checklist for Better Conversion",
    category: "Web Design",
    author: "Editorial Desk",
    date: "04 Jan 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1800&q=80",
    intro:
      "A redesign should solve business problems, not just visual issues. This checklist helps ensure your new website improves conversion outcomes.",
    sections: [
      {
        heading: "1) Define conversion goals first",
        text: "Before visual decisions, define what success means: inquiries, demo requests, calls, or signups.",
      },
      {
        heading: "2) Audit current user journeys",
        text: "Identify where users drop off, which pages perform well, and where friction blocks decision-making.",
      },
      {
        heading: "3) Strengthen messaging hierarchy",
        text: "Improve headline clarity, service positioning, social proof, and CTA placement across key pages.",
      },
      {
        heading: "4) Launch with measurement setup",
        text: "Track forms, clicks, scroll depth, and campaign attribution from day one to validate redesign impact.",
      },
    ],
    conclusion:
      "A redesign becomes valuable when it improves outcomes. Treat conversion data and user flow as first-class design inputs.",
  },

  "seo-foundations-for-new-business-website": {
    title: "SEO Foundations Every New Business Website Needs",
    category: "SEO",
    author: "Webevora Team",
    date: "28 Dec 2025",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?auto=format&fit=crop&w=1800&q=80",
    intro:
      "Early SEO setup creates long-term ranking advantages. These foundational steps help new business websites gain visibility faster.",
    sections: [
      {
        heading: "1) Build strong technical basics",
        text: "Clean URLs, indexable pages, fast load speed, and mobile optimization are critical from the start.",
      },
      {
        heading: "2) Map keywords to service intent",
        text: "Assign each service page a clear target keyword and search intent to avoid overlap and confusion.",
      },
      {
        heading: "3) Optimize on-page clarity",
        text: "Use strong titles, meta descriptions, headings, and internal linking to improve crawlability and relevance.",
      },
      {
        heading: "4) Publish authority-supporting content",
        text: "Blog articles, case insights, and FAQs improve topical authority and capture long-tail search opportunities.",
      },
    ],
    conclusion:
      "Strong SEO foundations reduce dependency on paid traffic and build sustainable visibility over time.",
  },

  "ai-agents-for-faster-lead-qualification": {
    title: "Using AI Agents for Faster Lead Qualification",
    category: "AI Automation",
    author: "Product Team",
    date: "22 Dec 2025",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&w=1800&q=80",
    intro:
      "AI agents can handle repetitive lead conversations, collect context, and route only qualified opportunities to human teams.",
    sections: [
      {
        heading: "1) Respond instantly, 24/7",
        text: "AI agents reduce response delays and improve first-touch engagement for incoming website leads.",
      },
      {
        heading: "2) Ask structured qualification questions",
        text: "Capture budget, timeline, requirement type, and decision stage before handoff to sales.",
      },
      {
        heading: "3) Route high-intent leads efficiently",
        text: "Automated routing ensures priority inquiries reach the right team members without operational delays.",
      },
      {
        heading: "4) Learn and improve with data",
        text: "Conversation logs reveal common objections, helping teams improve scripts, offers, and sales readiness.",
      },
    ],
    conclusion:
      "AI lead qualification does not replace teams — it amplifies them by reducing noise and improving focus on real opportunities.",
  },
};

function BlogArticle() {
  const { slug } = useParams();
  const article = slug ? articles[slug] : null;

  if (!article) {
    return (
      <>
        <PageBanner
          eyebrow="Webevora Insights"
          title="Article not found"
          text="The article you are looking for may have moved or is unavailable."
          image={articleBanner}
          alt="Insights and publishing workspace"
          pageName="Article"
        />

        <section className="blog-article-page sr-reveal" aria-labelledby="not-found-title">
          <div className="blog-article-card sr-reveal">
            <h1 id="not-found-title" className="blog-article-title">
              Sorry, this article is unavailable.
            </h1>
            <p className="blog-article-intro">
              Please go back to insights and select another article.
            </p>
            <Link to="/blog" className="blog-article-back">
              <FaArrowLeft aria-hidden="true" /> Back to Insights
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageBanner
        eyebrow="Webevora Insights"
        title={article.title}
        text="Practical insights to help you improve website performance, growth strategy, and digital execution."
        image={articleBanner}
        alt="Insights and publishing workspace"
        pageName="Article"
      />

      <section className="blog-article-page sr-reveal" aria-labelledby="article-title">
        <article className="blog-article-card sr-reveal">
          <Link to="/blog" className="blog-article-back">
            <FaArrowLeft aria-hidden="true" /> Back to Insights
          </Link>

          <div className="blog-article-meta sr-reveal" aria-label="Article information">
            <span className="blog-article-meta__item">
              <FaTag aria-hidden="true" /> {article.category}
            </span>
            <span className="blog-article-meta__item">
              <FaUserAlt aria-hidden="true" /> {article.author}
            </span>
            <span className="blog-article-meta__item">
              <FaCalendarAlt aria-hidden="true" /> {article.date}
            </span>
            <span className="blog-article-meta__item">
              <FaClock aria-hidden="true" /> {article.readTime}
            </span>
          </div>

          <h1 id="article-title" className="blog-article-title">
            {article.title}
          </h1>

          <figure className="blog-article-media sr-reveal">
            <img
              src={article.image}
              alt={article.title}
              className="blog-article-image"
              loading="lazy"
              decoding="async"
              fetchPriority="low"
            />
          </figure>

          <p className="blog-article-intro sr-reveal">{article.intro}</p>

          <div className="blog-article-body sr-reveal">
            {article.sections.map((section) => (
              <section key={section.heading} className="blog-article-section sr-reveal">
                <h2 className="blog-article-section__title">{section.heading}</h2>
                <p className="blog-article-section__text">{section.text}</p>
              </section>
            ))}
          </div>

          <div className="blog-article-conclusion sr-reveal">
            <h2 className="blog-article-section__title">Final Takeaway</h2>
            <p className="blog-article-section__text">{article.conclusion}</p>
          </div>
        </article>
      </section>
    </>
  );
}

export default BlogArticle;
