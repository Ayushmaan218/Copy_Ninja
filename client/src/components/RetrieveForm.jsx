import React, { useState } from 'react';
import axios from 'axios';
import './RetrieveForm.css';

function RetrieveForm() {
  const [code, setCode] = useState('');
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const retrieve = async (e) => {
    if (e) e.preventDefault(); // Prevent form from reloading page
    try {
      const res = await axios.get(`https://copy-ninja-backend.onrender.com/api/clipboard/${code}`);
      const data = res.data;
      setResult(data);
      setCopied(false);

      // Handle file download
      if (data.type !== 'text') {
        const fileRes = await axios.get(`https://copy-ninja-backend.onrender.com/api/clipboard/${code}/download`, {
          responseType: 'blob',
        });

        const blob = new Blob([fileRes.data]);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = data.originalName || 'downloaded_file';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error(err);
      setResult({ error: 'Not found or expired' });
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="retrieve-section">
      <h2>Retrieve</h2>
      <form onSubmit={retrieve}>
        <input
          type="text"
          placeholder="Enter Code"
          className="code-input"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button type="submit">Get</button>
      </form>

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

      {result?.error && <p className="error">{result.error}</p>}
    </div>
  );
}

export default RetrieveForm;
