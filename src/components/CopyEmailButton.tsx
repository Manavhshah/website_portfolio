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
      className="flex items-center justify-center p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors group w-full border border-border"
    >
      <div className="text-center">
        <div className="text-2xl mb-2">📧</div>
        <h3 className="text-sm font-semibold mb-1 group-hover:text-foreground">
          {copied ? 'Copied!' : 'Copy Email'}
        </h3>
        <p className="text-xs text-muted-foreground">manav.shah0304@gmail.com</p>
      </div>
    </button>
  );
}

