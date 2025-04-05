import React, { useState } from 'react';
import axios from 'axios';
import './RetrieveForm.css';

function RetrieveForm() {
  const [code, setCode] = useState('');
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const retrieve = async () => {
    try {
      const res = await axios.get(`https://copy-ninja-backend.onrender.com/api/clipboard/${code}`);
      const data = res.data;
      setResult(data);
      setCopied(false); // Reset copy state

      // If it's a file, download it automatically
      if (data.type === 'file' && data.fileUrl) {
        const fileRes = await axios.get(data.fileUrl, {
          responseType: 'blob',
        });

        const blob = new Blob([fileRes.data]);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = data.originalName || 'download';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      }
    } catch (err) {
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

      {/* Removed file link display since we're auto-downloading */}

      {result?.error && <p className="error">{result.error}</p>}
    </div>
  );
}

export default RetrieveForm;
