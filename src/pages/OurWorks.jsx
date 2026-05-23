import React, { useState, useEffect, useRef } from 'react';
import './OurWorks.css';

const OurWorks = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const heroTitleRef = useRef(null);
  const heroDescRef = useRef(null);
  const featuredCardsRef = useRef([]);
  const projectCardsRef = useRef([]);

  useEffect(() => {
    const timeouts = [];

    // Animate hero title with CSS
    if (heroTitleRef.current) {
      const t1 = setTimeout(() => {
        if (heroTitleRef.current) {
          heroTitleRef.current.classList.add('animate-in');
        }
      }, 400);
      timeouts.push(t1);
    }

    // Animate hero description with CSS
    if (heroDescRef.current) {
      const t2 = setTimeout(() => {
        if (heroDescRef.current) {
          heroDescRef.current.classList.add('animate-in');
        }
      }, 1400);
      timeouts.push(t2);
    }

    // Animate featured cards with stagger
    featuredCardsRef.current.forEach((card, index) => {
      if (card) {
        const t3 = setTimeout(() => {
          card.classList.add('animate-in');
        }, 2500 + (index * 150));
        timeouts.push(t3);
      }
    });

    // Animate project cards with stagger
    projectCardsRef.current.forEach((card, index) => {
      if (card) {
        const t4 = setTimeout(() => {
          card.classList.add('animate-in');
        }, 4000 + (index * 100));
        timeouts.push(t4);
      }
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Web Development' },
    { id: 'app', name: 'App Development' },
    { id: 'ai', name: 'AI Agent Development' },
    { id: 'hosting', name: 'Hosting & Infrastructure' },
    { id: 'design', name: 'Graphic Design' },
    { id: 'marketing', name: 'Digital Marketing' },
    { id: 'brand', name: 'Domain & Brand Presence' }
  ];

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'web',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      description: 'Modern online shopping experience with advanced features',
      technologies: ['React', 'Node.js', 'MongoDB'],
      featured: true
    },
    {
      id: 2,
      title: 'AI Customer Service Bot',
      category: 'ai',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
      description: 'Intelligent chatbot for automated customer support',
      technologies: ['Python', 'OpenAI', 'TensorFlow'],
      featured: true
    },
    {
      id: 3,
      title: 'Fitness Tracking App',
      category: 'app',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
      description: 'Cross-platform mobile app for health and fitness',
      technologies: ['React Native', 'Firebase', 'Redux'],
      featured: true
    },
    {
      id: 4,
      title: 'Cloud Infrastructure Setup',
      category: 'hosting',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop',
      description: 'Scalable cloud architecture for enterprise applications',
      technologies: ['AWS', 'Docker', 'Kubernetes'],
      featured: false
    },
    {
      id: 5,
      title: 'Brand Identity Design',
      category: 'design',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
      description: 'Complete brand visual identity system',
      technologies: ['Figma', 'Adobe Creative Suite'],
      featured: false
    },
    {
      id: 6,
      title: 'SEO Optimization Campaign',
      category: 'marketing',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      description: 'Comprehensive SEO strategy and implementation',
      technologies: ['Google Analytics', 'SEMrush', 'Ahrefs'],
      featured: false
    },
    {
      id: 7,
      title: 'Corporate Website',
      category: 'web',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop',
      description: 'Professional corporate website with CMS',
      technologies: ['Next.js', 'Strapi', 'PostgreSQL'],
      featured: false
    },
    {
      id: 8,
      title: 'Domain Portfolio Management',
      category: 'brand',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop',
      description: 'Strategic domain acquisition and management',
      technologies: ['Domain Tools', 'Analytics'],
      featured: false
    }
  ];

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <div className="our-works-page">
      {/* Hero Section */}
      <div className="works-hero">
        <div className="works-hero-content">
          <h1 
            ref={heroTitleRef}
            className="works-hero-title animate-text"
          >
            Our Works
          </h1>
          <p 
            ref={heroDescRef}
            className="works-hero-description animate-text"
          >
            Explore our portfolio of innovative digital solutions and successful projects
          </p>
        </div>
      </div>

      {/* Featured Projects */}
      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <div className="featured-grid">
            {featuredProjects.map((project, index) => (
              <div 
                key={project.id} 
                ref={el => featuredCardsRef.current[index] = el}
                className="featured-card animate-card"
              >
                <div className="featured-image">
                  <img src={project.image} alt={project.title} loading="lazy" decoding="async" />
                  <div className="featured-overlay">
                    <div className="featured-content">
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <div className="featured-tech">
                        {project.technologies.map((tech, index) => (
                          <span key={index} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                      <div className="featured-actions">
                        <button className="btn-primary">View Project</button>
                        <button className="btn-secondary">Start Similar Project</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="filter-section">
        <div className="container">
          <div className="category-filter">
            {categories.map(category => (
              <button
                key={category.id}
                className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects Grid */}
      <section className="projects-section">
        <div className="container">
          <div className="projects-grid">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id} 
                ref={el => projectCardsRef.current[index] = el}
                className="project-card animate-card"
              >
                <div className="project-image">
                  <img src={project.image} alt={project.title} loading="lazy" decoding="async" />
                  <div className="project-overlay">
                    <div className="project-content">
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <div className="project-tech">
                        {project.technologies.map((tech, index) => (
                          <span key={index} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                      <div className="project-actions">
                        <button className="btn-primary">View Project</button>
                        <button className="btn-secondary">Start Similar Project</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurWorks;
