import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLeads from "./pages/AdminLeads";
import AdminServicesManage from "./pages/AdminServicesManage";
import Technologies from "./pages/Technologies";
import OurWorks from "./pages/OurWorks";
import Products from "./pages/Products";
import AdminBlogsManage from "./pages/AdminBlogsManage";
import Navbar from "./components/Navbar";
import PageLoader from "./components/PageLoader";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import SeoManager from "./components/SeoManager";
import Chatbot from "./components/Chatbot";

function ScrollRevealManager() {
  const location = useLocation();

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll(".sr-reveal"));
    if (!nodes.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      {
        threshold: [0.08, 0.15, 0.25, 0.45, 0.7],
        rootMargin: "0px 0px -8% 0px",
      },
    );

    nodes.forEach((node, index) => {
      node.style.setProperty("--reveal-delay", `${(index % 8) * 70}ms`);
      observer.observe(node);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  return null;
}

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isBlogArticle = location.pathname.startsWith("/blog/");
  const isHomeRoute = location.pathname === "/";

  const pageMeta = {
    "/": {
      title: "Webevora | Complete Digital Growth Partner",
      description:
        "Get complete digital services in one place: websites, apps, AI agents, SEO, and marketing by Webevora.",
    },
    "/about": {
      title: "About Webevora | Strategy, Design, Development & Growth",
      description:
        "Learn about Webevora's mission, values, and approach to building growth-focused digital experiences.",
    },
    "/services": {
      title: "Services | Web Development, Apps, AI, SEO & Marketing",
      description:
        "Explore Webevora services: web development, app development, AI automation, SEO, digital marketing, hosting and branding support.",
    },
    "/privacy-policy": {
      title: "Privacy Policy | Webevora",
      description:
        "Read Webevora's privacy policy to understand how we collect, use, and protect information.",
    },
    "/blog": {
      title: "Insights | Webevora Blog on SEO, Web, AI & Growth",
      description:
        "Read practical insights on website performance, SEO, AI automation, branding, and digital growth strategy.",
    },
    "/contact": {
      title: "Contact Webevora | Start Your Digital Project",
      description:
        "Connect with Webevora to discuss your website, app, AI, SEO, or marketing requirements.",
    },
    "/admin/login": {
      title: "Admin Login | Webevora Dashboard Access",
      description: "Secure login for Webevora administrators.",
      noindex: true,
    },
    "/admin/dashboard": {
      title: "Admin Dashboard | Webevora",
      description: "Webevora admin dashboard for analytics and content management.",
      noindex: true,
    },
    "/admin/leads": {
      title: "Lead Inbox | Webevora Admin",
      description: "Manage and review incoming website leads in the Webevora admin panel.",
      noindex: true,
    },
    "/admin/services": {
      title: "Services Manage | Webevora Admin",
      description: "Manage website services from the Webevora admin panel.",
      noindex: true,
    },
    "/technologies": {
      title: "Technologies | Webevora Tech Stack",
      description:
        "Explore the cutting-edge technologies Webevora uses: React, Node.js, AI, cloud services, and modern development tools.",
    },
    "/our-works": {
      title: "Our Works | Webevora Portfolio",
      description:
        "View Webevora's portfolio of successful projects: websites, apps, AI solutions, and digital marketing campaigns.",
    },
    "/our-products": {
      title: "Our Products | Premium SaaS Solutions",
      description:
        "Explore Webevora's suite of premium software products and platforms designed to accelerate growth and streamline operations.",
    },
    "/admin/blogs": {
      title: "Blog Manage | Webevora Admin",
      description: "Manage blog content from the Webevora admin panel.",
      noindex: true,
    },
  };

  const currentSeo = isBlogArticle
    ? {
        title: "Article | Webevora Insights",
        description:
          "Read Webevora insight articles on growth strategy, SEO, website performance, and automation.",
        ogType: "article",
        canonicalPath: location.pathname,
      }
    : {
        ...(pageMeta[location.pathname] || {
          title: "Webevora | Web Development, App Development, AI & SEO Services",
          description:
            "Webevora Digital Studio provides web development, app development, AI agent solutions, SEO services, and digital marketing to grow your business online.",
        }),
        canonicalPath: location.pathname,
        noindex: pageMeta[location.pathname]?.noindex || false,
      };

  return (
    <div className="app-shell">
      <SeoManager {...currentSeo} />
      <ScrollRevealManager />
      <PageLoader />
      {!isAdminRoute ? <Navbar /> : null}

      <main className={`container${isHomeRoute ? " main--home" : ""}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogArticle />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/technologies" element={<Technologies />} />
          <Route path="/our-works" element={<OurWorks />} />
          <Route path="/our-products" element={<Products />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/leads"
            element={
              <ProtectedRoute>
                <AdminLeads />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/services"
            element={
              <ProtectedRoute>
                <AdminServicesManage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blogs"
            element={
              <ProtectedRoute>
                <AdminBlogsManage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      {!isAdminRoute ? <Footer /> : null}
      {!isAdminRoute ? <Chatbot /> : null}
    </div>
  );
}

export default App;
