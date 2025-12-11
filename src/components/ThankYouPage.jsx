import { useEffect } from 'react';

const ThankYouPage = ({ candidate }) => {
  useEffect(() => {
    // Prevent back navigation
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, '', window.location.href);
    };

    return () => {
      window.onpopstate = null;
    };
  }, []);

  return (
    <div className="thank-you-page">
      <div className="thank-you-content">
        <div className="thank-you-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="#ffdd66" strokeWidth="2"/>
            <path d="M8 12L11 15L16 9" stroke="#ffdd66" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h1 className="thank-you-title">Terima Kasih!</h1>
        <p className="thank-you-message">
          Vote Anda telah berhasil tercatat. Terima kasih atas partisipasi Anda dalam pemilihan Ketua MPK.
        </p>

        <div className="candidate-info">
          <div className="candidate-badge">
            <span className="badge-number">{candidate.number}</span>
          </div>
          <h2 className="candidate-name">{candidate.name}</h2>
        </div>

        <div className="slogan-container">
          <div className="slogan-icon">&#10077;</div>
          <p className="slogan-text">{candidate.slogan}</p>
          <div className="slogan-icon slogan-icon-right">&#10078;</div>
        </div>

        <div className="final-message">
          <p>Suara Anda sangat berarti untuk masa depan MPK yang lebih baik.</p>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
