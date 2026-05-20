import { useEffect, useState } from 'react';

const MIN_VISIBLE_MS = 800;

function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    document.body.classList.add('page-loading');
    const start = Date.now();
    let finished = false;
    let fallbackId = null;

    const finish = () => {
      if (finished) return;
      finished = true;
      const wait = Math.max(0, MIN_VISIBLE_MS - (Date.now() - start));
      window.setTimeout(() => {
        setExiting(true);
        window.setTimeout(() => {
          setVisible(false);
          document.body.classList.remove('page-loading');
        }, 560);
      }, wait);
    };

    if (document.readyState === 'complete') {
      finish();
    } else {
      window.addEventListener('load', finish, { once: true });
    }
    fallbackId = window.setTimeout(finish, 4000);

    return () => {
      if (fallbackId != null) window.clearTimeout(fallbackId);
      window.removeEventListener('load', finish);
      document.body.classList.remove('page-loading');
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`page-loader${exiting ? ' page-loader--exit' : ''}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className={`page-loader__inner${exiting ? ' page-loader__inner--exit' : ''}`}>
        <div className="loader" aria-hidden="true">
          <svg viewBox="0 0 1200 1020" className="page-loader__svg">
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0a2540" />
                <stop offset="100%" stopColor="#0e7490" />
              </linearGradient>
            </defs>
            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text">
              WEBEVORA
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default PageLoader;





