import React from "react";

function PageBanner({
  eyebrow,
  title,
  text,
  image,
  alt,
  pageName,
  showBreadcrumb = true,
}) {
  return (
    <section className="page-banner sr-reveal" aria-label={title}>
      <div className="page-banner__media">
        <img
          className="page-banner__image sr-reveal"
          src={image}
          alt={alt}
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </div>

      <div className="page-banner__overlay" />

      <div className="page-banner__content sr-reveal sr-reveal--delay-1">
        {eyebrow ? <p className="page-banner__eyebrow">{eyebrow}</p> : null}
        <h1 className="page-banner__title">{title}</h1>
        {text ? <p className="page-banner__text">{text}</p> : null}

        {showBreadcrumb ? (
          <div className="page-banner__path" aria-label="Page path">
            <span className="page-banner__path-home">Home</span>
            <span className="page-banner__path-sep">/</span>
            <span className="page-banner__path-current">
              {pageName || title}
            </span>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default PageBanner;
