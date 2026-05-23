import { Link, NavLink, useLocation } from 'react-router-dom';
import { Fragment, useEffect, useRef, useState } from 'react';
import logo from '../image/Webevora.png';

const navItems = [
  {
    label: 'Home',
    to: '/'
  },
  {
    label: 'About',
    to: '/about'
  },
  {
    label: 'Services',
    megaMenuContent: {
      categories: [
        {
          title: 'Web Development',
          subcategories: [
            { label: 'Business Websites', description: 'Professional websites for small to medium businesses' },
            { label: 'E-Commerce Websites', description: 'Online stores with payment integration' },
            { label: 'SaaS Platforms', description: 'Scalable software-as-a-service applications' },
            { label: 'SEO Optimized Development', description: 'Websites built for search engine optimization' }
          ]
        },
        {
          title: 'App Development',
          subcategories: [
            { label: 'Android Apps', description: 'Native Android smartphone and tablet applications' },
            { label: 'iOS Apps', description: 'Native iPhone and iPad applications' },
            { label: 'Flutter Apps', description: 'Cross-platform mobile applications' },
            { label: 'Cross Platform Solutions', description: 'React Native and Flutter applications' }
          ]
        },
        {
          title: 'AI Agent Development',
          subcategories: [
            { label: 'AI Chatbots', description: 'Intelligent conversational AI assistants' },
            { label: 'Workflow Automation', description: 'Automated business process solutions' },
            { label: 'Smart AI Assistants', description: 'Intelligent virtual assistant systems' },
            { label: 'AI Business Solutions', description: 'Custom AI solutions for business needs' }
          ]
        },
        {
          title: 'Hosting & Infrastructure',
          subcategories: [
            { label: 'Cloud Hosting', description: 'Scalable cloud hosting solutions' },
            { label: 'Server Management', description: 'Professional server maintenance and support' },
            { label: 'Infrastructure Scaling', description: 'Auto-scaling infrastructure solutions' },
            { label: 'Security & Backup', description: 'Comprehensive security and backup systems' }
          ]
        },
        {
          title: 'Domain & Brand Presence',
          subcategories: [
            { label: 'Domain Registration', description: 'Professional domain name registration' },
            { label: 'Brand Identity', description: 'Complete brand visual identity systems' },
            { label: 'Business Email Setup', description: 'Professional email configuration' },
            { label: 'SEO Domain Strategy', description: 'Domain optimization for search engines' }
          ]
        },
        {
          title: 'Graphic Design',
          subcategories: [
            { label: 'Logo Design', description: 'Professional logo creation and branding' },
            { label: 'Social Media Creatives', description: 'Social media graphics and content' },
            { label: 'Marketing Designs', description: 'Marketing materials and promotional graphics' },
            { label: 'UI/UX Graphics', description: 'User interface and experience design' }
          ]
        },
        {
          title: 'Digital Marketing',
          subcategories: [
            { label: 'SEO Optimization', description: 'Search engine optimization services' },
            { label: 'Social Media Marketing', description: 'Social media marketing and management' },
            { label: 'Google Ads Campaigns', description: 'Google advertising campaign management' },
            { label: 'Content Marketing', description: 'Content creation and marketing strategies' }
          ]
        }
      ]
    }
  },
  {
    label: 'What We Do',
    children: [
      {
        label: 'Technologies',
        to: '/technologies'
      },
      {
        label: 'Our Works',
        to: '/our-works'
      },
      {
        label: 'Our Products',
        to: '/our-products'
      }
    ]
  },
  {
    label: 'Contact',
    to: '/contact'
  }
];

function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [simpleDropdownOpen, setSimpleDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const progressLineRef = useRef(null);

  // Toggle mega menu on click
  const handleMegaMenuToggle = (e) => {
    e.stopPropagation();
    setMegaMenuOpen((prev) => !prev);
    if (simpleDropdownOpen) {
      setSimpleDropdownOpen(false);
    }
  };

  // Toggle simple dropdown on click
  const handleSimpleDropdownToggle = (e) => {
    e.stopPropagation();
    setSimpleDropdownOpen((prev) => !prev);
    if (megaMenuOpen) {
      setMegaMenuOpen(false);
      setActiveCategory(null);
    }
  };

  // Handle category click instead of hover
  const handleCategoryClick = (catIdx) => {
    setActiveCategory(catIdx);
  };

  // Close all menus
  const closeAllMenus = () => {
    setMegaMenuOpen(false);
    setSimpleDropdownOpen(false);
    setActiveCategory(null);
  };

  // Click outside to close menus
  useEffect(() => {
    const handleClickOutside = (e) => {
      const clickedInsideNav = navRef.current && navRef.current.contains(e.target);
      const clickedInsideMobileMenu = mobileMenuRef.current && mobileMenuRef.current.contains(e.target);
      if (!clickedInsideNav && !clickedInsideMobileMenu) {
        closeAllMenus();
      }
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllMenus();
      }
    };

    if (megaMenuOpen || simpleDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [megaMenuOpen, simpleDropdownOpen]);

  // Close menus on route change
  useEffect(() => {
    closeAllMenus();
  }, [location.pathname]);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const isScrolled = scrollY > 20;
          setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));

          // Calculate scroll progress
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight - windowHeight;
          const progress = documentHeight > 0 ? Math.min((scrollY / documentHeight) * 100, 100) : 0;
          
          if (progressLineRef.current) {
            progressLineRef.current.style.width = `${progress}%`;
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    // Run once to initialize
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
    <header className={`floating-navbar ${scrolled ? 'scrolled' : ''}`}>
      {/* Scroll Progress Line */}
      <div
        ref={progressLineRef}
        className="navbar-progress-line"
        style={{ width: '0%' }}
      />
      <div className="navbar-container" ref={navRef}>
        {/* Logo */}
        <Link to="/" className="navbar-brand" aria-label="Webevora home">
          <img
            className="navbar-logo"
            src={logo}
            alt="Webevora logo"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </Link>

        {/* Center Navigation */}
        <nav className="navbar-nav" aria-label="Primary">
          {navItems.map((item, idx) => (
            <Fragment key={item.label || item.to}>
              {idx !== 0 && <span className="nav-divider" />}
              {item.megaMenuContent ? (
                <div className="nav-dropdown-container">
                  <button
                    className={`nav-link ${megaMenuOpen ? 'is-active' : ''}`}
                    onClick={handleMegaMenuToggle}
                    aria-expanded={megaMenuOpen}
                    aria-haspopup="true"
                    aria-label={`${item.label} menu`}
                    type="button"
                  >
                    {item.label}
                    <span className={`nav-dropdown-arrow ${megaMenuOpen ? 'is-open' : ''}`}>▼</span>
                  </button>
                  {megaMenuOpen && (
                    <div
                      className="nav-dropdown"
                      role="menu"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className={`nested-dropdown-content ${activeCategory !== null ? 'has-active' : ''}`}>
                        {/* Left Categories Column */}
                        <div className="categories-column">
                          <h4 className="dropdown-title">Services</h4>
                          <div className="categories-list">
                            {item.megaMenuContent.categories.map((category, catIdx) => (
                              <button
                                key={catIdx}
                                className={`category-item ${activeCategory === catIdx ? 'active' : ''}`}
                                onClick={() => handleCategoryClick(catIdx)}
                                type="button"
                                role="menuitem"
                              >
                                <div className="category-content">
                                  <span className="category-icon">{category.icon}</span>
                                  <span className="category-title">{category.title}</span>
                                  <span className="category-arrow">→</span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Right Nested Panel - Conditional Rendering */}
                        {activeCategory !== null && (
                          <div className="nested-panel active">
                            <div className="nested-content">
                              <div className="nested-header">
                                <span className="nested-icon">
                                  {item.megaMenuContent.categories[activeCategory].icon}
                                </span>
                                <h5 className="nested-title">
                                  {item.megaMenuContent.categories[activeCategory].title}
                                </h5>
                              </div>
                              <div className="nested-items">
                                {item.megaMenuContent.categories[activeCategory].subcategories.map((subcategory, subIdx) => (
                                  <Link
                                    key={subIdx}
                                    to={`/services#${item.megaMenuContent.categories[activeCategory].title.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="nested-item"
                                    onClick={() => closeAllMenus()}
                                    role="menuitem"
                                  >
                                    <span className="nested-item-label">{subcategory.label}</span>
                                    <span className="nested-item-desc">{subcategory.description}</span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : item.children ? (
                <div className="nav-dropdown-container">
                  <button
                    className={`nav-link ${simpleDropdownOpen ? 'is-active' : ''}`}
                    onClick={handleSimpleDropdownToggle}
                    aria-expanded={simpleDropdownOpen}
                    aria-haspopup="true"
                    aria-label={`${item.label} menu`}
                    type="button"
                  >
                    {item.label}
                    <span className={`nav-dropdown-arrow ${simpleDropdownOpen ? 'is-open' : ''}`}>▼</span>
                  </button>
                  {simpleDropdownOpen && (
                    <div
                      className={`nav-dropdown simple-dropdown ${simpleDropdownOpen ? 'dropdown-open' : ''}`}
                      role="menu"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="simple-dropdown-content">
                        {item.children.map((child, childIdx) => (
                          <Link
                            key={childIdx}
                            to={child.to}
                            className="simple-dropdown-item"
                            onClick={() => closeAllMenus()}
                            role="menuitem"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}
                  onClick={() => closeAllMenus()}
                >
                  {item.label}
                </NavLink>
              )}
            </Fragment>
          ))}
        </nav>

        {/* CTA Button */}
        <Link to="/contact" className="navbar-cta">
          Schedule a Call
        </Link>

        {/* Mobile Toggle */}
        <button
          type="button"
          className={`navbar-toggle ${menuOpen ? 'is-open' : ''}`}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>

    {/* Mobile Menu — rendered outside header to avoid transform containment breaking fixed positioning */}
    <div ref={mobileMenuRef} className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} id="mobile-nav">
      <div className="mobile-menu-content">
        {navItems.map((item, idx) => (
          <div key={item.label || item.to} className="mobile-nav-item">
            {item.megaMenuContent ? (
              <div className="mobile-dropdown">
                <button
                  className="mobile-dropdown-toggle"
                  onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                >
                  {item.label}
                  <span className={`mobile-dropdown-arrow ${megaMenuOpen ? 'is-open' : ''}`}>▼</span>
                </button>
                {megaMenuOpen && (
                  <div className="mobile-dropdown-content">
                    {item.megaMenuContent.categories.map((category, catIdx) => (
                      <div key={catIdx} className="mobile-dropdown-column">
                        <h5 className="mobile-dropdown-title">
                          <span className="mobile-category-icon">{category.icon}</span>
                          {category.title}
                        </h5>
                        {category.subcategories.map((subcategory, subIdx) => (
                          <Link
                            key={subIdx}
                            to={`/services#${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                            className="mobile-dropdown-item"
                            onClick={() => setMenuOpen(false)}
                          >
                            {subcategory.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : item.children ? (
              <div className="mobile-dropdown">
                <button
                  className="mobile-dropdown-toggle"
                  onClick={() => setSimpleDropdownOpen(!simpleDropdownOpen)}
                >
                  {item.label}
                  <span className={`mobile-dropdown-arrow ${simpleDropdownOpen ? 'is-open' : ''}`}>▼</span>
                </button>
                {simpleDropdownOpen && (
                  <div className="mobile-dropdown-content simple-mobile-dropdown">
                    {item.children.map((child, childIdx) => (
                      <Link
                        key={childIdx}
                        to={child.to}
                        className="mobile-dropdown-item"
                        onClick={() => {
                          setMenuOpen(false);
                          setSimpleDropdownOpen(false);
                        }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                to={item.to}
                className="mobile-nav-link"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
        <Link to="/contact" className="mobile-cta" onClick={() => setMenuOpen(false)}>
          Schedule a Call
        </Link>
      </div>
    </div>
    </>
  );
}

export default Navbar;
