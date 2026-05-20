import { Link } from 'react-router-dom';
import { FaWhatsapp, FaInstagram, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import logo from '../image/Webevora.png';

function Footer() {
  const year = new Date().getFullYear();
  const whatsappNumber = '917041266313';
  const whatsappLink = `https://wa.me/${whatsappNumber}`;
  const socialLinks = [
    {
      label: 'WhatsApp',
      href: whatsappLink,
      icon: <FaWhatsapp size={18} aria-hidden="true" />,
      ariaLabel: 'WhatsApp 7041266313',
      title: 'WhatsApp 7041266313',
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/webevora_01?igsh=NTkwdHo2MnNpdW44',
      icon: <FaInstagram size={18} aria-hidden="true" />,
      ariaLabel: 'Instagram',
    },
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/share/1CRNRVx6zf/',
      icon: <FaFacebookF size={17} aria-hidden="true" />,
      ariaLabel: 'Facebook',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/webevora-webevora-175a12409?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      icon: <FaLinkedinIn size={17} aria-hidden="true" />,
      ariaLabel: 'LinkedIn',
    },
  ];

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner sr-reveal">
        <div className="site-footer__intro">
          <div>
            <img
              className="site-footer__logo"
              src={logo}
              alt="Webevora logo"
              loading="eager"
              decoding="async"
            />
          </div>
          <div className="site-footer__intro-content">
            <p className="site-footer__eyebrow">Webevora Studio</p>
            <p className="site-footer__text">
              We build websites, apps, AI solutions, and marketing systems 
              that make your business look professional, perform better, 
              and grow faster.
            </p>
          </div>
        </div>

        <div className="site-footer__right">
          <nav className="site-footer__links" aria-label="Social links">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                className="site-footer__link"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.ariaLabel}
                title={link.title || link.ariaLabel}
              >
                {link.icon}
              </a>
            ))}
          </nav>
        </div>

        <div className="site-footer__bottom">
          <p className="site-footer__copy">&copy; {year} Webevora. All rights reserved.</p>
          <Link to="/privacy-policy" className="site-footer__policy">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
