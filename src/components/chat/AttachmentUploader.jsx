'use client'
import React, { useState } from "react";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUD_UPLOAD_PRESET;
// Prefer your backend multer->Cloudinary endpoint; fallback to NEXT_PUBLIC_URL/api/messages/upload
const UPLOAD_ENDPOINT =
  process.env.NEXT_PUBLIC_UPLOAD_ENDPOINT ||
  (process.env.NEXT_PUBLIC_URL ? `${process.env.NEXT_PUBLIC_URL}/api/messages/upload` : "");

export default function AttachmentUploader({ onPick }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [mime, setMime] = useState("");
  const [progress, setProgress] = useState(0);

  const choose = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setMime(f.type || "application/octet-stream");
    if (f.type?.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setPreview(String(reader.result || ""));
      reader.readAsDataURL(f);
    } else {
      setPreview("");
    }
    setProgress(0);
  };

  const reset = () => {
    setFile(null);
    setPreview("");
    setMime("");
    setProgress(0);
  };

  const sendAttachment = async () => {
    if (!file) return;

    // 1) Backend upload (multer -> Cloudinary) if configured or fallback resolved
    if (UPLOAD_ENDPOINT) {
      try {
        const fd = new FormData();
        fd.append("file", file);
        setProgress(10);
        const res = await fetch(UPLOAD_ENDPOINT, {
          method: "POST",
          body: fd,
          credentials: "include",
        });
        setProgress(70);
        const data = await res.json();
        setProgress(100);
        const secureUrl = data?.secure_url || data?.url;
        if (secureUrl) onPick?.(secureUrl, mime);
        reset();
        return;
      } catch {
        // fall through to Cloudinary preset/base64
      }
    }

    // 2) Direct Cloudinary preset if available
    if (CLOUD_NAME && UPLOAD_PRESET) {
      try {
        const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;
        const fd = new FormData();
        fd.append("file", file);
        fd.append("upload_preset", UPLOAD_PRESET);
        setProgress(10);
        const res = await fetch(url, { method: "POST", body: fd });
        setProgress(70);
        const data = await res.json();
        setProgress(100);
        const secureUrl = data?.secure_url;
        if (secureUrl) onPick?.(secureUrl, mime);
        reset();
        return;
      } catch {
        // fall through to base64
      }
    }

    // 3) Fallback base64 (images only)
    if (preview) {
      onPick?.(preview, mime);
      reset();
    }
  };

  return (
    <div className="px-3 py-2 border-t bg-white flex flex-wrap gap-3 items-center">
      <input type="file" onChange={choose} className="text-sm" />
      {file && (
        <div className="flex items-center gap-3">
          {preview ? (
            <img src={preview} alt="preview" className="w-12 h-12 object-cover rounded border" />
          ) : (
            <span className="text-xs text-gray-600">{file.name}</span>
          )}
          <div className="h-2 w-24 bg-gray-200 rounded">
            <div className="h-2 bg-emerald-600 rounded transition-all" style={{ width: `${progress}%` }} />
          </div>
          <button
            onClick={sendAttachment}
            className="text-xs px-3 py-1 rounded bg-emerald-600 text-white hover:bg-emerald-700"
          >
            Send attachment
          </button>
          <button
            onClick={reset}
            className="text-xs px-3 py-1 rounded border hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
