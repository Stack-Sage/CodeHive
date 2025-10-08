export default function MorphBlob() {
  return (
    <div className="w-full flex justify-center items-center my-[-32px]">
      <svg width="100%" height="80" viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,40 Q360,80 720,40 Q1080,0 1440,40 V80 H0 Z" fill="url(#blobGradient)" />
        <defs>
          <linearGradient id="blobGradient" x1="0" y1="0" x2="1440" y2="80" gradientUnits="userSpaceOnUse">
            <stop stopColor="#a5b4fc" />
            <stop offset="0.5" stopColor="#c4b5fd" />
            <stop offset="1" stopColor="#fbcfe8" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
