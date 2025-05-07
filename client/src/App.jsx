import React, { useEffect } from 'react';
import UploadForm from './components/UploadForm';
import RetrieveForm from './components/RetrieveForm';

export default function App() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});

      // Hide the ad container if no content is rendered
      setTimeout(() => {
        const ad = document.querySelector('.adsbygoogle');
        if (ad && ad.innerHTML.trim() === '') {
          ad.style.display = 'none';
        }
      }, 3000); // Give the ad a few seconds to load
    } catch (e) {
      console.error('AdsbyGoogle error:', e);
    }
  }, []);

  return (
    <div className="container">
      <h1>📋 Copy Ninja</h1>

      {/* ✅ AdSense Ad Unit */}
      <ins className="adsbygoogle"
        style={{
          display: 'block',
          textAlign: 'center',
          margin: '20px 0'
        }}
        data-ad-client="ca-pub-1405273524056171"
        data-ad-slot="1234567890"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>

      <UploadForm />
      <hr />
      <RetrieveForm />
    </div>
  );
}
