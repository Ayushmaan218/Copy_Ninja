import React, { useState } from 'react';
import axios from 'axios';
import './RetrieveForm.css';

function RetrieveForm() {
  const [code, setCode] = useState('');
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const retrieve = async () => {
    try {
        const res = await axios.get(https://copy-ninja-backend.onrender.com/api/clipboard/${code});
        setResult(res.data);
      setCopied(false); // reset copied state
    } catch {
      setResult({ error: 'Not found or expired' });
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2s
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="retrieve-section">
      <h2>Retrieve</h2>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter code"
      />
      <button onClick={retrieve}>Get</button>

      {result?.type && <p><strong>Type:</strong> {result.type === 'text' ? 'Text' : 'File'}</p>}

      {result?.content && (
        <div className="text-output">
          <div className="text-header">
            <p><strong>Content:</strong></p>
            <button className="copy-btn" onClick={handleCopy}>
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre>{result.content}</pre>
        </div>
      )}

      {result?.fileUrl && (
        <div className="file-output">
          <p><strong>File Shared:</strong></p>
          <a href={result.fileUrl} target="_blank" rel="noreferrer">
            Download: {result.originalName}
          </a>
        </div>
      )}

      {result?.error && <p className="error">{result.error}</p>}
    </div>
  );
}

export default RetrieveForm;
