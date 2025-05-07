import React, { useEffect } from 'react';
import UploadForm from './components/UploadForm';
import RetrieveForm from './components/RetrieveForm';

export default function App() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdsbyGoogle error:', e);
    }

    // Hide the ad if it doesn't load properly
    const timeoutId = setTimeout(() => {
      const ad = document.querySelector('.adsbygoogle');
      if (ad && ad.offsetHeight < 50) {
        ad.style.display = 'none';
      }
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <h1>📋 Copy Ninja</h1>

      <UploadForm />
      <hr />
      <RetrieveForm />

      {/* ✅ AdSense ad at the bottom */}
      <div style={{ marginTop: 'auto', padding: '20px 0' }}>
        <ins
          className="adsbygoogle"
          style={{
            display: 'block',
            textAlign: 'center',
            width: '100%',
            height: 'auto',
            overflow: 'hidden'
          }}
          data-ad-client="ca-pub-1405273524056171"
          data-ad-slot="4914352073"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    </div>
  );
}
