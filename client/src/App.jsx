import React from 'react';
import UploadForm from './components/UploadForm';
import RetrieveForm from './components/RetrieveForm';

export default function App() {
  return (
    <div className="container">
      <h1>📋 Copy Ninja</h1>
      <UploadForm />
      <hr />
      <RetrieveForm />
    </div>
  );
}
