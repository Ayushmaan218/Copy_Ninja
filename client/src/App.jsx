import React, { useEffect } from 'react';
import UploadForm from './components/UploadForm';
import RetrieveForm from './components/RetrieveForm';

export default function App() {
  useEffect(() => {
    // If you had other side effects, you can keep them here
  }, []);

  return (
    <div className="container">
      <h1>📋 Copy Ninja</h1>

      <UploadForm />
      <hr />
      <RetrieveForm />
    </div>
  );
}
