import React, { useState } from 'react';
import './Technologies.css';

const Technologies = () => {
  const [activeCategory, setActiveCategory] = useState('all');


  const categories = [
    {
      id: 'all',
      name: 'All Technologies',
      description: 'Explore our comprehensive technology stack',
      icon: '🚀'
    },
    {
      id: 'frontend',
      name: 'Frontend Development',
      description: 'Modern web interfaces and user experiences',
      icon: '🎨'
    },
    {
      id: 'backend',
      name: 'Backend Development',
      description: 'Robust server-side architecture and APIs',
      icon: '⚙️'
    },
    {
      id: 'mobile',
      name: 'Mobile Development',
      description: 'Native iOS and Android applications',
      icon: '📱'
    },
    {
      id: 'ai',
      name: 'AI & Automation',
      description: 'Intelligent automation and AI solutions',
      icon: '🤖'
    },
    {
      id: 'cloud',
      name: 'Cloud & Infrastructure',
      description: 'Scalable cloud solutions and hosting',
      icon: '☁️'
    },
    {
      id: 'design',
      name: 'Design & Creative',
      description: 'UI/UX design and creative services',
      icon: '🎨'
    }
  ];

  const technologies = {
    frontend: [
      {
        name: 'React JS',
        icon: '⚛️',
        description: 'Component-based UI framework for modern web applications',
        features: ['Fast Rendering', 'SEO Friendly', 'Component Library', 'Hooks System'],
        color: '#61DAFB'
      },
      {
        name: 'Next JS',
        icon: '▲',
        description: 'Full-stack React framework with SSR and SSG',
        features: ['Server-Side Rendering', 'Static Generation', 'API Routes', 'Image Optimization'],
        color: '#000000'
      },
      {
        name: 'Vue.js',
        icon: '💚',
        description: 'Progressive JavaScript framework for building UIs',
        features: ['Reactive Data Binding', 'Template Syntax', 'Component System', 'Performance Focused'],
        color: '#4FC08D'
      },
      {
        name: 'TypeScript',
        icon: '�',
        description: 'Type-safe JavaScript for scalable applications',
        features: ['Static Typing', 'ES6+ Features', 'Tooling Support', 'Interface Safety'],
        color: '#3178C6'
      },
      {
        name: 'Tailwind CSS',
        icon: '🎨',
        description: 'Utility-first CSS framework for rapid development',
        features: ['Responsive Design', 'Component Library', 'Performance Optimized', 'Developer Experience'],
        color: '#06B6D4'
      }
    ],
    backend: [
      {
        name: 'Node.js',
        icon: '🟢',
        description: 'JavaScript runtime for scalable server applications',
        features: ['Event-Driven', 'Non-Blocking I/O', 'NPM Ecosystem', 'Microservices Ready'],
        color: '#339933'
      },
      {
        name: 'Python',
        icon: '🐍',
        description: 'Versatile programming language for backend development',
        features: ['Clean Syntax', 'Large Libraries', 'AI Integration', 'Data Science Ready'],
        color: '#3776AB'
      },
      {
        name: 'PostgreSQL',
        icon: '🐘',
        description: 'Powerful open-source relational database',
        features: ['ACID Compliance', 'Full Text Search', 'JSON Support', 'High Performance'],
        color: '#336791'
      },
      {
        name: 'MongoDB',
        icon: '🍃',
        description: 'Flexible NoSQL database for modern applications',
        features: ['Document Database', 'Flexible Schema', 'Horizontal Scaling', 'Aggregation Pipeline'],
        color: '#47A248'
      },
      {
        name: 'Docker',
        icon: '�',
        description: 'Container platform for application deployment',
        features: ['Container Orchestration', 'Microservices', 'DevOps Integration', 'Cross-Platform'],
        color: '#2496ED'
      }
    ],
    mobile: [
      {
        name: 'React Native',
        icon: '📱',
        description: 'Build native mobile apps with React',
        features: ['Cross-Platform', 'Native Performance', 'Hot Reloading', 'Code Sharing'],
        color: '#61DAFB'
      },
      {
        name: 'Flutter',
        icon: '🦋',
        description: 'Google\'s UI toolkit for beautiful mobile apps',
        features: ['Single Codebase', 'Fast Development', 'Beautiful UIs', 'Expressive Design'],
        color: '#02569B'
      },
      {
        name: 'Swift',
        icon: '🍎',
        description: 'Powerful programming language for Apple platforms',
        features: ['Type Safe', 'High Performance', 'Modern Syntax', 'Interoperability'],
        color: '#FA7343'
      }
    ],
    ai: [
      {
        name: 'OpenAI GPT',
        icon: '🧠',
        description: 'Advanced language models for AI applications',
        features: ['Natural Language', 'Code Generation', 'API Integration', 'Custom Training'],
        color: '#10A37F'
      },
      {
        name: 'TensorFlow',
        icon: '🤖',
        description: 'Open-source machine learning framework',
        features: ['Deep Learning', 'Model Deployment', 'Production Ready', 'Flexible Architecture'],
        color: '#FF6F00'
      },
      {
        name: 'Automation Tools',
        icon: '⚙️',
        description: 'Business process automation solutions',
        features: ['Workflow Builder', 'API Integration', 'Scheduled Tasks', 'Analytics Dashboard'],
        color: '#8B5CF6'
      }
    ],
    cloud: [
      {
        name: 'AWS',
        icon: '🔶',
        description: 'Comprehensive cloud computing platform',
        features: ['Global Infrastructure', 'Scalable Services', 'Enterprise Grade', 'Pay-As-You-Go'],
        color: '#FF9900'
      },
      {
        name: 'Vercel',
        icon: '▲',
        description: 'Frontend deployment platform for modern applications',
        features: ['Edge Functions', 'Global CDN', 'Automatic Scaling', 'Zero Config Deployments'],
        color: '#000000'
      },
      {
        name: 'Cloudflare',
        icon: '☁️',
        description: 'Performance-focused cloud platform and CDN',
        features: ['Edge Computing', 'DDoS Protection', 'Global Network', 'Analytics Dashboard'],
        color: '#F38020'
      }
    ],
    design: [
      {
        name: 'Figma',
        icon: '🎯',
        description: 'Collaborative interface design tool',
        features: ['Real-time Collaboration', 'Component Libraries', 'Prototyping', 'Design Systems'],
        color: '#F24E1E'
      },
      {
        name: 'Adobe Creative Cloud',
        icon: '🎨',
        description: 'Creative suite for design and marketing',
        features: ['Cloud Documents', 'Version Control', 'Asset Management', 'Team Collaboration'],
        color: '#DA1F26'
      },
      {
        name: 'Sketch',
        icon: '🎨',
        description: 'Digital design platform for UI/UX',
        features: ['Vector Editing', 'Prototyping', 'Design Systems', 'Plugin Ecosystem'],
        color: '#F7B500'
      }
    ]
  };

  const filteredTechnologies = activeCategory === 'all'
    ? Object.values(technologies).flat()
    : technologies[activeCategory] || [];

  return (
    <div className="technologies-page">
      {/* Hero Section */}
      <section className="tech-hero">
        <div className="hero-background">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Modern Technologies Behind<br />
                <span className="hero-title-highlight">Powerful Digital Solutions</span>
              </h1>
              <p className="hero-description">
                We combine cutting-edge technologies with innovative design to build scalable,
                high-performance digital experiences that drive business growth.
              </p>
              <div className="hero-actions">
                <button className="btn-primary">Start Your Project</button>
                <button className="btn-secondary">Explore Services</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="tech-categories">
        <div className="container">
          <div className="category-tabs">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Showcase */}
      <section className="tech-showcase">
        <div className="container">
          <div className="tech-grid">
            {filteredTechnologies.map((tech, index) => (
              <div
                key={tech.name}
                className="tech-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="tech-card-header">
                  <div className="tech-icon" style={{ color: tech.color }}>
                    {tech.icon}
                  </div>
                  <div className="tech-info">
                    <h3 className="tech-name">{tech.name}</h3>
                    <p className="tech-description">{tech.description}</p>
                    <div className="tech-features">
                      {tech.features.map((feature, idx) => (
                        <span key={idx} className="tech-feature">{feature}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="tech-visual">
                  <div className="tech-illustration">
                    <div className="tech-pattern"></div>
                    <div className="tech-glow"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="tech-cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Build Something Amazing?</h2>
            <p className="cta-description">
              Let's discuss how our technology expertise can bring your vision to life.
            </p>
            <div className="cta-actions">
              <button className="btn-primary btn-large">Book a Consultation</button>
              <button className="btn-secondary btn-large">View Our Work</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Technologies;
