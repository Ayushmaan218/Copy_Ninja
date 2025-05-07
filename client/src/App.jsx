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

    const timeoutId = setTimeout(() => {
      const ad = document.querySelector('.adsbygoogle');
      if (ad) {
        const height = ad.offsetHeight;
        if (height < 50) {
          ad.style.display = 'none';
        }
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

      {/* ✅ Ad at the bottom */}
      <div style={{ marginTop: 'auto', padding: '20px 0' }}>
        <ins className="adsbygoogle"
          style={{
            display: 'block',
            textAlign: 'center',
            width: '100%',
            height: 'auto',
            overflow: 'hidden'
          }}
          data-ad-client="ca-pub-1405273524056171"
          data-ad-slot="YOUR_REAL_SLOT_ID"  {/* Replace this with your actual ad slot ID */}
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    </div>
  );
}
