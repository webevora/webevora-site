import React from 'react';
import './Products.css';

const featuredProjects = [
  {
    id: 'stakehawk',
    name: 'Stakehawk Solutions',
    category: 'IT Staffing Platform',
    websiteUrl: 'https://stake-hawk.com/',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop',
    description: 'A premium IT staffing and consulting platform connecting top-tier tech talent with industry-leading enterprises across the USA.',
    features: ['Tech Recruitment', 'Corporate Staffing', 'Enterprise Consulting', 'USA Focused'],
    styleClass: 'product-card-corporate'
  },
  {
    id: 'nordiclegal',
    name: 'Nordic Legal Consulting',
    category: 'Legal Services',
    websiteUrl: 'https://www.nordiclegalconsulting.dk/',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=1200&h=800&fit=crop',
    description: 'A premium Scandinavian legal consulting firm specializing in complex immigration law and family reunification services.',
    features: ['Immigration Law', 'Family Reunification', 'Consulting Services', 'Scandinavian Brand'],
    styleClass: 'product-card-nordic'
  }
];

const demoProjects = [
  {
    id: 'nexusai',
    name: 'NexusAI CRM',
    category: 'AI SaaS Dashboard',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
    description: 'An intelligent customer relationship management system powered by AI to automate sales pipelines and support.',
    tech: ['React', 'Node.js', 'OpenAI'],
  },
  {
    id: 'pulsefit',
    name: 'PulseFit',
    category: 'Fitness Tracking App',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop',
    description: 'Cross-platform mobile application providing real-time health metrics, personalized workouts, and social fitness challenges.',
    tech: ['React Native', 'Firebase', 'GraphQL'],
  },
  {
    id: 'aurora',
    name: 'Aurora Fashion',
    category: 'E-Commerce Store',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&fit=crop',
    description: 'High-performance headless e-commerce storefront designed for seamless checkouts and luxury brand aesthetics.',
    tech: ['Next.js', 'Shopify', 'Tailwind'],
  },
  {
    id: 'vaultpay',
    name: 'VaultPay',
    category: 'Fintech Banking Platform',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=500&fit=crop',
    description: 'Secure digital banking interface featuring cross-border transactions, crypto analytics, and instant virtual cards.',
    tech: ['Vue.js', 'Go', 'PostgreSQL'],
  },
  {
    id: 'haven',
    name: 'Haven Real Estate',
    category: 'Property Platform',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop',
    description: 'Modern property discovery platform with 3D virtual tours, instant agent booking, and smart mortgage calculators.',
    tech: ['React', 'Django', 'AWS'],
  },
  {
    id: 'medicare',
    name: 'CareSync Pro',
    category: 'Healthcare Management',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop',
    description: 'HIPAA-compliant medical clinic management system streamlining patient records, tele-health, and billing.',
    tech: ['Next.js', 'Express', 'MongoDB'],
  },
  {
    id: 'savor',
    name: 'Savor & Reserve',
    category: 'Restaurant Booking App',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=500&fit=crop',
    description: 'Premium dining reservation platform connecting food enthusiasts with exclusive, high-end culinary experiences.',
    tech: ['Flutter', 'Node.js', 'Stripe'],
  },
  {
    id: 'wander',
    name: 'WanderLuxe',
    category: 'Travel & Tourism',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=500&fit=crop',
    description: 'Bespoke travel booking engine offering curated luxury itineraries, private jet charters, and exclusive villa rentals.',
    tech: ['React', 'Ruby on Rails', 'Redis'],
  }
];

const Products = () => {
  return (
    <div className="products-page">
      <div className="products-page-inner">
        {/* Hero Section */}
        <div className="products-hero">
          <div className="products-badge">
            <span className="products-badge-dot" />
            Our Products & Case Studies
          </div>
          
          <h1 className="products-title">
            Products We’ve <br />
            <span className="gradient-text">Built</span>
          </h1>
          
          <p className="products-subtitle">
            Explore a selection of premium digital platforms we've designed and engineered 
            for industry-leading businesses worldwide.
          </p>
        </div>

        {/* Featured Projects (Large Format) */}
        <div className="products-showcase">
          {featuredProjects.map((product, index) => (
            <div key={product.id} className={`product-showcase-card ${product.styleClass}`} style={{ animationDelay: `${(index + 1) * 0.15}s` }}>
              
              <div className="product-image-wrap">
                <div className="product-mockup-frame">
                  <div className="browser-header">
                    <span className="dot dot-close"></span>
                    <span className="dot dot-min"></span>
                    <span className="dot dot-max"></span>
                  </div>
                  <img src={product.image} alt={product.name} loading="lazy" />
                </div>
              </div>
              
              <div className="product-details">
                <span className="product-category-pill">{product.category}</span>
                <h2 className="product-brand-name">{product.name}</h2>
                <p className="product-brand-desc">{product.description}</p>
                
                <div className="product-feature-list">
                  {product.features.map(feature => (
                    <span key={feature} className="feature-item">{feature}</span>
                  ))}
                </div>
                
                <div className="product-action-bar">
                  <a href={product.websiteUrl} target="_blank" rel="noopener noreferrer" className="btn-visit">
                    Visit Website
                  </a>
                  <button className="btn-case-study">
                    View Case Study
                  </button>
                </div>
              </div>
              
            </div>
          ))}
        </div>

        {/* More Projects Section */}
        <div className="more-projects-section">
          <h3 className="more-projects-title">More Digital Experiences</h3>
          <p className="more-projects-subtitle">A wider look at platforms, apps, and systems we've engineered.</p>
          
          <div className="products-grid">
            {demoProjects.map((project, index) => (
              <div key={project.id} className="grid-card" style={{ animationDelay: `${0.2 + (index * 0.05)}s` }}>
                <div className="grid-image-container">
                  <img src={project.image} alt={project.name} loading="lazy" />
                </div>
                <div className="grid-content">
                  <span className="grid-tag">{project.category}</span>
                  <h4 className="grid-title">{project.name}</h4>
                  <p className="grid-desc">{project.description}</p>
                  
                  <div className="grid-tech-stack">
                    {project.tech.map(tech => (
                      <span key={tech} className="grid-tech-badge">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Products;
