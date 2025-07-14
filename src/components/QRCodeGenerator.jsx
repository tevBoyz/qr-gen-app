import React from 'react'

import QRCode from 'qrcode'
import { useState, useEffect } from 'react';


const QRCodeGenerator = () => {
  const [text, setText] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    if(text.trim() == ''){
      setQrCodeUrl('');
      return;
    }
    QRCode.toDataURL(text).then((url) => {
      setQrCodeUrl(url);
    })
    .catch((e) => console.error(e));
  }, [text]);



  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col items-center justify-start p-4">
  <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-700 mt-10 mb-4 drop-shadow-md">QR Generator</h1>

  <input
    type="text"
    value={text}
    onChange={(e) => setText(e.target.value)}
    placeholder="Enter text to generate QR"
    className="w-full max-w-md p-3 rounded-xl border-2 border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-md text-gray-800 placeholder:text-gray-400"
  />

  <div className="mt-10 bg-white rounded-2xl shadow-xl w-full max-w-md p-6 flex flex-col items-center transition-all duration-300">
    {qrCodeUrl ? (
      <div className="flex flex-col items-center">
        <img
          key={qrCodeUrl}
          src={qrCodeUrl}
          alt="Generated QR Code"
          className="w-64 h-64 object-contain transition-opacity duration-700 ease-in-out opacity-100"
        />

        {navigator.canShare ? (
          <button
            onClick={() => handleShare(qrCodeUrl)}
            className="mt-6 px-5 py-2 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition"
          >
            🔗 Share QR Code
          </button>
        ) : (
          <div className="flex gap-4 mt-6">
            <a
              href={qrCodeUrl}
              download="qr-code.png"
              className="px-4 py-2 bg-green-500 text-white font-medium rounded-full hover:bg-green-600 transition"
            >
              ⬇️ Download
            </a>
            <button
              onClick={() => handleCopyToClipboard(qrCodeUrl)}
              className="px-4 py-2 bg-gray-500 text-white font-medium rounded-full hover:bg-gray-600 transition"
            >
              📋 Copy Image
            </button>
          </div>
        )}
      </div>
    ) : (
      <p className="text-gray-400">QR code will appear here...</p>
    )}
  </div>
</div>

  )
}

async function handleShare(dataUrl) {
  try {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    const file = new File([blob], 'qr-code.png', { type: blob.type });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: 'My QR Code',
        text: 'Check out this QR code!',
      });
    } else {
      alert("Sharing not supported on this device.");
    }
  } catch (error) {
    console.error("Sharing failed", error);
    alert("Something went wrong while trying to share.");
  }
}

async function handleCopyToClipboard(dataUrl) {
  try {
    const res = await fetch(dataUrl);
    const blob = await res.blob();

    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob
      })
    ]);

    alert("QR code copied to clipboard!");
  } catch (err) {
    console.error("Copy failed", err);
    alert("Copy not supported or failed.");
  }
}



export default QRCodeGenerator