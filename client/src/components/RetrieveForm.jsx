import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RetrieveForm.css';

function RetrieveForm() {
  const [code, setCode] = useState('');
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false); // For preventing multiple downloads

  const retrieve = async () => {
    try {
      const res = await axios.get(`https://copy-ninja-backend.onrender.com/api/clipboard/${code}`);
      setResult(res.data);
      setCopied(false);
      setDownloaded(false); // Reset download state
    } catch {
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

  // Auto download logic when fileUrl is available
  useEffect(() => {
    if (result?.fileUrl && !downloaded) {
      const link = document.createElement('a');
      link.href = result.fileUrl;
      link.download = result.originalName || 'file';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloaded(true);
    }
  }, [result, downloaded]);

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

      {result?.fileUrl && downloaded && (
        <div className="file-output">
          <p><strong>File Shared:</strong> {result.originalName}</p>
          <p>Download started automatically.</p>
        </div>
      )}

      {result?.error && <p className="error">{result.error}</p>}
    </div>
  );
}

export default RetrieveForm;
