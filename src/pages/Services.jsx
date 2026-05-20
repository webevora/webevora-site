import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import PageBanner from "../components/PageBanner";
import serviceOneImage from '../image/Service-1.jpg';
import serviceTwoImage from '../image/Service-2.jpg';
import serviceThreeImage from '../image/Service-3.jpg';
import serviceFourImage from '../image/Service-4.jpg';
import serviceFiveImage from '../image/Service-5.jpg';
import serviceSixImage from '../image/Service-6.jpg';
import serviceSevenImage from '../image/Service-7.jpg';
import ServiceBanner from "../image/service-banner.jpg";
import {
  FaBullhorn,
  FaCheckCircle,
  FaCode,
  FaGlobe,
  FaMobileAlt,
  FaPalette,
  FaRobot,
  FaServer,
  FaShieldAlt,
  FaUsers,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

const bannerImage = ServiceBanner;

const services = [
  {
    icon: <FaCode aria-hidden="true" />,
    title: "Web Development",
    desc: "We create high-performance websites, landing pages, and custom web applications designed for speed, SEO, and business growth. Our team focuses on building modern, scalable, and user-friendly solutions that help your brand stand out and generate real results online.",
    image: serviceOneImage,
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
    points: [
      "Search Engine Optimization (SEO)",
      "Social Media Marketing (SMM)",
      "Google Ads & Paid Campaigns",
      "Content Marketing Strategy"
    ],
  },
];

const whyChoose = [
  {
    icon: <FaGlobe aria-hidden="true" />,
    title: "Business-First Thinking",
    text: "We prioritize your business goals above everything else. Every strategy we create is aligned with practical outcomes, ensuring that our solutions not only look good but also deliver measurable growth and real business value.",
  },
  {
    icon: <FaUsers aria-hidden="true" />,
    title: "Reliable Delivery",
    text: "We believe in transparency, clear communication, and meeting commitments. With well-defined timelines and a structured workflow, we ensure every project is delivered on time with accountability and consistent quality.",
  },
  {
    icon: <FaShieldAlt aria-hidden="true" />,
    title: "Performance and Security",
    text: "We build fast, scalable, and secure digital platforms that perform seamlessly under all conditions. Our focus on strong architecture and data protection ensures long-term stability and a safe user experience.",
  },
];

function Services() {

  return (
    <>
      <PageBanner
        eyebrow="Our Expertise"
        title="Complete Digital Services for Modern Business Growth"
        text="From strategy and design to development, marketing, SEO, and AI automation, Webentra delivers end-to-end digital solutions under one roof—helping your business grow faster, perform better, and scale with confidence."
        image={bannerImage}
        alt="Modern city skyline representing digital growth and connected services"
        pageName="Services"
      />

      <section className="services-page sr-reveal" aria-labelledby="services-title">
        <header className="services-top sr-reveal">
          <p className="services-kicker">What We Offer</p>
          <h1 id="services-title" className="services-title">
            END-TO-END DIGITAL SERVICES TO LAUNCH, SCALE, AND GROW YOUR BUSINESS ONLINE
          </h1>
          <p className="services-subtitle">
            From planning to execution, we provide integrated digital services that help you build, scale, and lead in the online space with measurable results.
          </p>
        </header>

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
              {services.map((card, index) => (
                <SwiperSlide key={`${card.title}-swiper-services`}>
                  <article className="services-slider-card">
                    <img
                      src={card.image}
                      alt={`${card.title} service`}
                      className="services-slider-card__image"
                      loading="lazy"
                    />
                    <div className="services-slider-card__content">
                      <span className="services-slider-card__icon">{card.icon}</span>
                      <h3 className="services-slider-card__title">{card.title}</h3>
                      <p className="services-slider-card__desc">{card.desc}</p>
                      <ul className="services-slider-card__list">
                        {card.points.map((point) => (
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
              <FaArrowLeft />
            </div>
            <div className="swiper-button-next">
              <FaArrowRight />
            </div>
          </div>
        </section>


        <section className="services-highlight-band services-summary-band sr-reveal" aria-label="Services summary">
          <div className="services-summary-band__copy">
            <h2 className="services-highlight-band__title">
              One connected system for design, development, and growth.
            </h2>
            <p className="services-highlight-band__text">
              We connect design, development, and growth into one smooth workflow, 
              making it easier to move from ideas to real results.
            </p>
          </div>
        </section>

        <section className="services-grid-wrap services-stack-wrap sr-reveal" aria-label="All services">
          <div className="services-stack">
            {services.map((service, index) => {
              return (
                <article
                  key={service.title}
                  className="service-card service-card--stack"
                  style={{ '--card-index': index }}
                >
                  <span className="service-card__badge" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="service-card__text-content">
                    <span className="service-card__icon">{service.icon}</span>
                    <h2 className="service-card__title">{service.title}</h2>
                    <p className="service-card__text">{service.desc}</p>

                    <ul
                      className="service-card__points"
                      aria-label={`${service.title} key points`}
                    >
                      {service.points.map((point) => (
                        <li key={point} className="service-card__point">
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
                      src={service.image}
                      alt={`${service.title} service visual`}
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

        <section className="services-why" aria-label="Why choose us">
          <h2 className="services-why__title">
            A dependable partner for ongoing digital growth.
          </h2>
          <div className="services-why__grid">
            {whyChoose.map((item) => (
              <article key={item.title} className="services-why__card">
                <span className="services-why__icon">{item.icon}</span>
                <h3 className="services-why__card-title">{item.title}</h3>
                <p className="services-why__card-text">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="services-cta sr-reveal">
          <h2 className="services-cta__title">
            NEED A CUSTOM DIGITAL SERVICE PACKAGE?
          </h2>
          <p className="services-cta__text">
            Every business is unique — that’s why we design customized 
            digital solutions that align perfectly with your goals, 
            budget, and growth plans.
          </p>
          <Link to="/contact" className="services-cta__link">
            GET A CUSTOM PLAN →
          </Link>
        </section>
      </section>
    </>
  );
}

export default Services;
