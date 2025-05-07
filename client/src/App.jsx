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
    <div className="container">
      <h1>📋 Copy Ninja</h1>

      <ins className="adsbygoogle"
        style={{
          display: 'block',
          textAlign: 'center',
          margin: '20px 0',
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
