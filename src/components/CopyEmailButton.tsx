'use client';

import { useState } from 'react';

export default function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('manav.shah0304@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <button
      onClick={handleCopyEmail}
      className="flex items-center justify-center p-6 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors group w-full"
    >
      <div className="text-center">
        <div className="text-3xl mb-3">📧</div>
        <h3 className="text-lg font-semibold mb-2 group-hover:text-white">
          {copied ? 'Copied!' : 'Copy Email'}
        </h3>
        <p className="text-sm text-neutral-400">manav.shah0304@gmail.com</p>
      </div>
    </button>
  );
}

