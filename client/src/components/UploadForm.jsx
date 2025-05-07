import React, { useState } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';
import './RetrieveForm.css'; // reuse the same CSS

function UploadForm() {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [code, setCode] = useState('');
  const [mode, setMode] = useState('text'); // 'text' or 'file'
  const [displayMode, setDisplayMode] = useState('code'); // 'code' or 'qr'

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mode === 'text') {
      try {
        const res = await axios.post(`https://copy-ninja-backend.onrender.com/api/clipboard/text`, { text });
        setCode(res.data.code);
        setText('');
      } catch (err) {
        console.error("Text upload failed", err);
      }
    } else {
      if (!file) return;
      const formData = new FormData();
      formData.append('file', file);
      try {
        const res = await axios.post(`https://copy-ninja-backend.onrender.com/api/clipboard/upload`, formData);
        setCode(res.data.code);
        setFile(null);
      } catch (err) {
        console.error("File upload failed", err);
      }
    }
  };

  const getQRCodeURL = () => `https://copy-ninja-backend.onrender.com/api/clipboard/${code}`;

  return (
    <div className="upload-section">
      <h2>Upload</h2>

      {/* Mode Toggle */}
      <div className="toggle-upload">
        <label>
          <input
            type="radio"
            value="text"
            checked={mode === 'text'}
            onChange={() => setMode('text')}
          /> Text
        </label>
        <label>
          <input
            type="radio"
            value="file"
            checked={mode === 'file'}
            onChange={() => setMode('file')}
          /> File
        </label>
      </div>

      {/* Upload Form */}
      <form onSubmit={handleSubmit}>
        {mode === 'text' ? (
          <>
            <textarea
              placeholder="Enter text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
            <button type="submit">Upload Text</button>
          </>
        ) : (
          <>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button type="submit">Upload File</button>
          </>
        )}
      </form>

      {/* Code / QR Toggle */}
      {code && (
        <>
          <div className="toggle-upload" style={{ marginTop: '16px' }}>
            <label>
              <input
                type="radio"
                value="code"
                checked={displayMode === 'code'}
                onChange={() => setDisplayMode('code')}
              /> Show Code
            </label>
            <label>
              <input
                type="radio"
                value="qr"
                checked={displayMode === 'qr'}
                onChange={() => setDisplayMode('qr')}
              /> Show QR Code
            </label>
          </div>

          {displayMode === 'code' ? (
            <p className="code-display">Your Code: {code}</p>
          ) : (
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <QRCode value={getQRCodeURL()} size={180} />
              <p style={{ marginTop: '10px', fontWeight: 'bold', color: '#007BFF' }}>
                Scan to retrieve
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default UploadForm;
