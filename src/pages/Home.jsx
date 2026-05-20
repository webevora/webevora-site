import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import serviceOneImage from '../image/Service-1.jpg';
import serviceTwoImage from '../image/Service-2.jpg';
import serviceThreeImage from '../image/Service-3.jpg';
import serviceFourImage from '../image/Service-4.jpg';
import serviceFiveImage from '../image/Service-5.jpg';
import serviceSixImage from '../image/Service-6.jpg';
import serviceSevenImage from '../image/Service-7.jpg';
import heroBannerVisual from '../image/services-hero-visual.svg';
import {
  FaArrowRight,
  FaBolt,
  FaBullhorn,
  FaChartLine,
  FaCheckCircle,
  FaCode,
  FaCompass,
  FaGlobe,
  FaMobileAlt,
  FaPalette,
  FaRobot,
  FaServer,
  FaShieldAlt,
  FaUsers
} from 'react-icons/fa';

const processSteps = [
  {
    title: 'Discover',
    text: 'We start by understanding your business goals, target audience, and key challenges. Through research and planning, we define a clear strategy that sets the foundation for a successful and goal-oriented digital solution.',
    icon: <FaCompass aria-hidden="true" />,
    colorVariant: 'icon-variant-blue'
  },
  {
    title: 'Build',
    text: 'Our team brings your ideas to life with clean design, robust development, and careful execution. We focus on quality at every stage, ensuring your product is reliable, scalable, and delivers a seamless user experience.',
    icon: <FaBolt aria-hidden="true" />,
    colorVariant: 'icon-variant-purple'
  },
  {
    title: 'Optimize',
    text: 'After launch, we continuously monitor performance and make improvements to enhance speed, user engagement, and conversions. Our goal is to help your business grow consistently with data-driven optimization.',
    icon: <FaChartLine aria-hidden="true" />,
    colorVariant: 'icon-variant-emerald'
  }
];

const highlights = [
  {
    title: 'Business-First Thinking',
    text: 'We prioritize your business goals above everything else. Every strategy we create is aligned with practical outcomes, ensuring that our solutions not only look good but also deliver measurable growth and real business value.',
    icon: <FaGlobe aria-hidden="true" />,
    colorVariant: 'icon-variant-blue'
  },
  {
    title: 'Reliable Delivery',
    text: 'We believe in transparency, clear communication, and meeting commitments. With well-defined timelines and a structured workflow, we ensure every project is delivered on time with accountability and consistent quality.',
    icon: <FaUsers aria-hidden="true" />,
    colorVariant: 'icon-variant-purple'
  },
  {
    title: 'Performance and Security',
    text: 'We build fast, scalable, and secure digital platforms that perform seamlessly under all conditions. Our focus on strong architecture and data protection ensures long-term stability and a safe user experience.',
    icon: <FaShieldAlt aria-hidden="true" />,
    colorVariant: 'icon-variant-emerald'
  }
];

const trustStats = [
  {
    title: 'Fresh Thinking',
    text: 'We bring innovative and practical ideas that turn complex challenges into simple, effective digital solutions tailored to your business needs.'
  },
  {
    title: 'Custom Strategy',
    text: 'Every solution we create is carefully planned around your goals, audience, and budget to ensure maximum impact and long-term value.'
  },
  {
    title: 'Quality Delivery',
    text: 'We follow a structured approach, ensuring every project is delivered with precision, consistency, and high-quality standards.'
  },
  {
    title: 'Long-Term Support',
    text: 'Our work doesn’t end at launch — we stay connected to help you improve, maintain, and scale your digital presence over time.'
  }
];

const bannerVisual = {
  image: heroBannerVisual,
  title: 'Web development'
};

const ringCards = [
  {
    icon: <FaCode aria-hidden="true" />,
    title: "Web Development",
    desc: "We create high-performance websites, landing pages, and custom web applications designed for speed, SEO, and business growth. Our team focuses on building modern, scalable, and user-friendly solutions that help your brand stand out and generate real results online.",
    image: serviceOneImage,
    colorVariant: 'icon-variant-blue',
    points: [
      "Corporate & Business Websites",
      "Responsive & Mobile-Friendly Design",
      "SEO-Optimized Structure",
      "E-commerce Website Development"
    ],
  },
  {
    icon: <FaMobileAlt aria-hidden="true" />,
    title: "App Development",
    desc: "We develop high-performance mobile applications tailored to your business needs. Our apps are built for speed, scalability, and a seamless user experience across both Android and iOS platforms. From concept to launch, we deliver powerful and user-friendly solutions that drive engagement and business growth.",
    image: serviceTwoImage,
    colorVariant: 'icon-variant-purple',
    points: [
      "Android App Development",
      "IOS App Development",
      "Custom Business Applications",
      "UI/UX-Focused Design"
    ],
  },
  {
    icon: <FaRobot aria-hidden="true" />,
    title: "AI Agent Development",
    desc: "We build intelligent AI agents that automate tasks, enhance customer interactions, and improve business efficiency. Our AI solutions are designed to understand, learn, and respond in real-time, helping you streamline operations and deliver smarter user experiences.",
    image: serviceThreeImage,
    colorVariant: 'icon-variant-cyan',
    points: [
      "Smart AI Chatbots for Customer Engagement",
      "AI Automation to Save Time & Costs",
      "Seamless AI Integration into Your Business",
      "NLP-Based Smart Conversations"
    ],
  },
  {
    icon: <FaServer aria-hidden="true" />,
    title: "Hosting & Infrastructure",
    desc: "We provide reliable hosting and scalable infrastructure solutions to ensure your website and applications run smoothly, securely, and efficiently. Our services are designed to deliver high performance, maximum uptime, and strong data protection for your business.",
    image: serviceFourImage,
    colorVariant: 'icon-variant-orange',
    points: [
      "Cloud Hosting & Server Management",
      "Scalable Infrastructure Solutions",
      "Backup & Disaster Recovery",
      "High Security & Data Protection"],
  },
  {
    icon: <FaGlobe aria-hidden="true" />,
    title: "Domain & Brand Presence",
    desc: "We help businesses establish a strong digital identity through strategic domain setup and branding solutions. Our approach ensures your brand looks professional and builds trust online. We focus on consistency across all platforms to strengthen your brand presence. This helps your business be come easily discoverable and stand out in the digital world.",
    image: serviceFiveImage,
    colorVariant: 'icon-variant-rose',
    points: [
      "Domain Registration & Management",
      "Professional Business Email Setup",
      "Brand Identity & Online Presence",
      "SEO-Friendly Domain Strategy"
    ],
  },
  {
    icon: <FaPalette aria-hidden="true" />,
    title: "Graphic Design",
    desc: "We create visually appealing designs that represent your brand and capture audience attention. Our designs focus on creativity, clarity, and strong brand communication. We ensure consistency across all digital and print materials for a professional look. This helps your brand stand out and leave a lasting impression.",
    image: serviceSixImage,
    colorVariant: 'icon-variant-rose',
    points: [
      "Logo Design & Brand Identity",
      "Social Media Creatives",
      "Marketing & Advertising Designs",
      "UI/UX Design Elements"
    ],
  },
  {
    icon: <FaBullhorn aria-hidden="true" />,
    title: "Digital Marketing",
    desc: "We help businesses grow online through strategic and result-driven digital marketing solutions. Our approach focuses on increasing brand visibility, engagement, and lead generation. We use advanced tools and data-driven strategies to reach the right audience effectively. This helps your business achieve consistent growth and a strong online presence.",
    image: serviceSevenImage,
    colorVariant: 'icon-variant-orange',
    points: [
      "Search Engine Optimization (SEO)",
      "Social Media Marketing (SMM)",
      "Google Ads & Paid Campaigns",
      "Content Marketing Strategy"
    ],
  },
];

function Home() {

  return (
    <>
      <section className="home-top-banner" aria-label="Main banner">
        <div className="home-top-banner__animated-bg" aria-hidden="true">
          <span className="home-top-banner__orb home-top-banner__orb--one" />
          <span className="home-top-banner__orb home-top-banner__orb--two" />
          <span className="home-top-banner__orb home-top-banner__orb--three" />
          <span className="home-top-banner__grid" />
          <span className="home-top-banner__beam" />
          <span className="home-top-banner__beam home-top-banner__beam--two" />
          <span className="home-top-banner__overlay" />
        </div>
        <span className="home-top-banner__cursor-glow" aria-hidden="true" />
        <span className="home-top-banner__rings" aria-hidden="true" />
        <span className="home-top-banner__pulse-line home-top-banner__pulse-line--one" aria-hidden="true" />
        <span className="home-top-banner__pulse-line home-top-banner__pulse-line--two" aria-hidden="true" />
        <span className="home-top-banner__glow home-top-banner__glow--one" aria-hidden="true" />
        <span className="home-top-banner__glow home-top-banner__glow--two" aria-hidden="true" />
        <span className="home-top-banner__spark home-top-banner__spark--one" aria-hidden="true" />
        <span className="home-top-banner__spark home-top-banner__spark--two" aria-hidden="true" />
        <span className="home-top-banner__spark home-top-banner__spark--three" aria-hidden="true" />
        <span className="home-top-banner__spark home-top-banner__spark--four" aria-hidden="true" />
        <span className="home-top-banner__spark home-top-banner__spark--five" aria-hidden="true" />

        <div className="home-top-banner__content">
          <div className="home-top-banner__copy">
            <p className="home-top-banner__kicker">Webevora Digital Studio</p>
            <h1 className="home-top-banner__title">
              Build a strong
              <span className="home-top-banner__title-accent"> digital presence </span>
              with one reliable team.
            </h1>
            <p className="home-top-banner__text">
              We design websites, apps, AI tools, and marketing systems that help your business
              look professional, work smoothly, and grow with clarity.
            </p>
            <div className="home-top-banner__actions">
              <Link to="/contact" className="home-btn home-btn--primary">
                Start Project
              </Link>
              <Link to="/services" className="home-btn home-btn--secondary">
                Explore Services <FaArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="home-top-banner__visual" aria-hidden="true">
            <figure className="home-top-banner__visual-card home-top-banner__visual-card--main">
              <img
                src={bannerVisual.image}
                alt=""
                className="home-top-banner__visual-image"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
              <div className="home-top-banner__visual-overlay" />
              <div className="home-top-banner__visual-caption">
                <span className="home-top-banner__visual-caption-kicker">
                  Selected Work
                </span>
                <span className="home-top-banner__visual-caption-title">
                  {bannerVisual.title}
                </span>
              </div>
            </figure>

            <div className="home-top-banner__visual-strip">
              <span>Strategy-led</span>
              <span>Responsive builds</span>
              <span>Growth ready</span>
            </div>
          </div>
        </div>
      </section>

      <section className="home-page" aria-labelledby="home-services-title">
        <section className="home-highlights sr-reveal" aria-label="About Webevora">
          <div className="home-section-head sr-reveal">
            <p className="home-section-head__kicker">About Webevora</p>
            <h2 className="home-section-head__title">
              A DIGITAL PARTNER FOR YOUR BUSINESS GROWTH
            </h2>
            <p className="home-section-head__text">
              At Webevora, we partner with businesses to create impactful digital
              experiences that drive real growth. From understanding your vision
              to executing powerful solutions, we ensure every step is aligned with
              your business goals.
              Our team blends creativity, technology, and data-driven
              strategies to build websites, develop applications, and
              run marketing campaigns that deliver measurable results.
              We focus not just on launching projects, but on optimizing
              and scaling them for long-term success.
              Whether you're a startup looking to establish your presence
              or an established business aiming to grow further, we provide
              the right tools, strategy, and continuous support to help you
              succeed in the digital world.
            </p>
          </div>
          <div className="home-highlights__grid">
            <article className="home-highlight-card sr-reveal">
              <span className={`home-highlight-card__icon ${highlights[0].colorVariant}`}>
                {highlights[0].icon}
              </span>
              <h3 className="home-highlight-card__title">{highlights[0].title}</h3>
              <p className="home-highlight-card__text">
                {highlights[0].text}
              </p>
            </article>
            <article className="home-highlight-card sr-reveal">
              <span className={`home-highlight-card__icon ${highlights[1].colorVariant}`}>
                {highlights[1].icon}
              </span>
              <h3 className="home-highlight-card__title">{highlights[1].title}</h3>
              <p className="home-highlight-card__text">
                {highlights[1].text}
              </p>
            </article>
            <article className="home-highlight-card sr-reveal">
              <span className={`home-highlight-card__icon ${highlights[2].colorVariant}`}>
                {highlights[2].icon}
              </span>
              <h3 className="home-highlight-card__title">{highlights[2].title}</h3>
              <p className="home-highlight-card__text">
                {highlights[2].text}
              </p>
            </article>
          </div>
        </section>

        <div className="home-section-head sr-reveal">
          <p className="home-section-head__kicker">Our Core Services</p>
          <h2 id="home-services-title" className="home-section-head__title">
            Services designed around your goals.
          </h2>
        </div>

        <section className="home-services-slider-wrap sr-reveal" aria-label="Featured services slider">
          <div className="services-slider__meta sr-reveal">
            <h3 className="services-slider__meta-title">Featured Service Areas</h3>
            <p className="services-slider__meta-text">
              A quick look at the key digital services we provide to build a strong and connected online presence.
            </p>
          </div>
          
          <div className="services-slider-container">
            <Swiper
              modules={[Navigation, Autoplay, Pagination]}
              effect="slide"
              spaceBetween={0}
              slidesPerView={1}
              centeredSlides={false}
              loop={true}
              loopAdditionalSlides={0}
              allowSlidePrev={true}
              allowSlideNext={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              pagination={{
                type: 'progressbar',
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 0,
                },
                768: {
                  slidesPerView: 1,
                  spaceBetween: 0,
                },
                1024: {
                  slidesPerView: 1,
                  spaceBetween: 0,
                },
                1280: {
                  slidesPerView: 1,
                  spaceBetween: 0,
                },
              }}
              className="services-swiper"
            >
              {ringCards.map((card, index) => (
                <SwiperSlide key={`${card.title}-swiper-home`}>
                  <article className="services-slider-card">
                    <img
                      src={card.image}
                      alt={`${card.title} service`}
                      className="services-slider-card__image"
                      loading="lazy"
                      onError={(e) => {
                        console.log('Image load error:', e.target.src);
                        console.log('Card image import:', card.image);
                      }}
                      onLoad={() => {
                        console.log('Image loaded successfully:', card.title);
                      }}
                    />
                    <div className="services-slider-card__overlay" />
                    <div className="services-slider-card__content">
                      <span className={`services-slider-card__icon ${card.colorVariant}`}>{card.icon}</span>
                      <h3 className="services-slider-card__title">{card.title}</h3>
                      <p className="services-slider-card__desc">{card.desc}</p>
                      <ul className="services-slider-card__list">
                        {card.points.slice(0, 2).map((point) => (
                          <li key={`${card.title}-${point}`} className="services-slider-card__list-item">
                            <FaCheckCircle aria-hidden="true" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
            
            <div className="swiper-button-prev">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="swiper-button-next">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </section>

        <section className="services-grid-wrap services-stack-wrap home-services-stack-wrap sr-reveal" aria-label="All services">
          <div className="home-services-stack-head sr-reveal">
            <p className="home-services-stack-head__kicker">Service Details</p>
            <h3 className="home-services-stack-head__title">
              Explore each service in a simple, structured format.
            </h3>
            <p className="home-services-stack-head__text">
              This layer gives a quick breakdown of what each service includes
              and how it supports your business goals.
            </p>
          </div>

          <div className="services-stack">
            {ringCards.map((card, index) => {
              return (
                <article
                  key={`${card.title}-home-stack`}
                  className="service-card service-card--stack sr-reveal"
                  style={{ '--card-index': index }}
                >
                  <span className="service-card__badge" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="service-card__text-content">
                    <span className={`service-card__icon ${card.colorVariant}`}>{card.icon}</span>
                    <h2 className="service-card__title">{card.title}</h2>
                    <p className="service-card__text">{card.desc}</p>

                    <ul className="service-card__points" aria-label={`${card.title} key points`}>
                      {card.points.map((point) => (
                        <li key={`${card.title}-${point}-home`} className="service-card__point">
                          <FaCheckCircle aria-hidden="true" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <figure
                    className="service-card__media service-card__media--stack"
                  >
                    <img
                      src={card.image}
                      alt={`${card.title} service visual`}
                      className="service-card__image"
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                    />
                  </figure>
                </article>
              );
            })}
          </div>
        </section>

        <section className="home-process sr-reveal" aria-label="How we work">
          <div className="home-section-head sr-reveal">
            <p className="home-section-head__kicker">Our Process</p>
            <h2 className="home-section-head__title">A clear process from idea to launch.</h2>
          </div>
          <div className="home-process__grid">
            {processSteps.map((step) => (
              <article key={step.title} className="home-process-card sr-reveal">
                <span className={`home-process-card__icon ${step.colorVariant}`}>{step.icon}</span>
                <h3 className="home-process-card__title">{step.title}</h3>
                <p className="home-process-card__text">{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="home-highlights sr-reveal" aria-label="Why choose us">
          <div className="home-section-head sr-reveal">
            <p className="home-section-head__kicker">Why Webevora</p>
            <h2 className="home-section-head__title">A dependable partner for ongoing digital growth.</h2>
          </div>
          <div className="home-highlights__grid">
            {highlights.map((item) => (
              <article key={item.title} className="home-highlight-card sr-reveal">
                <span className="home-highlight-card__icon">{item.icon}</span>
                <h3 className="home-highlight-card__title">{item.title}</h3>
                <p className="home-highlight-card__text">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="home-trust sr-reveal" aria-label="What you can expect">
          {trustStats.map((stat) => (
            <article key={stat.title} className="home-trust__item sr-reveal">
              <h3 className="home-trust__value">{stat.title}</h3>
              <p className="home-trust__label">{stat.text}</p>
            </article>
          ))}
        </div>

        <div className="home-cta sr-reveal">
          <h2 className="home-cta__title">BUILD A STRONG DIGITAL PRESENCE
            WITH ONE RELIABLE TEAM</h2>
          <p className="home-cta__text">
            Tell us about your goals, and we’ll create a clear and practical
            roadmap with the right technology, design, and execution strategy
            to grow your business.
          </p>
          <div className="home-cta__actions">
            <Link to="/contact" className="home-btn home-btn--primary">
              Book Free Consultation
            </Link>
            <Link to="/about" className="home-btn home-btn--secondary">
              Know More About Us <FaArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
