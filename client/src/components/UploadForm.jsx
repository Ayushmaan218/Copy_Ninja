import React, { useState } from 'react';
import axios from 'axios';

function UploadForm() {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [code, setCode] = useState('');

  const uploadText = async () => {
    try {
      const res = await axios.post(`https://copy-ninja-backend.onrender.com/api/clipboard/text`, { text });
      setCode(res.data.code);
    } catch (err) {
      console.error("Text upload failed", err);
    }
  };

  const uploadFile = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await axios.post(`https://copy-ninja-backend.onrender.com/api/clipboard/upload`, formData);
      setCode(res.data.code);
    } catch (err) {
      console.error("File upload failed", err);
    }
  };

  return (
    <div className="upload-section">
      <h2>Upload</h2>
      <textarea
        placeholder="Enter text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button onClick={uploadText}>Upload Text</button>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={uploadFile}>Upload File</button>

      {code && <p className="code-display">Your Code: {code}</p>}
    </div>
  );
}

export default UploadForm;
