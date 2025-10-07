'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ResumeDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeDownloadModal({ isOpen, onClose }: ResumeDownloadModalProps) {
  const [email, setEmail] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleDownload = async () => {
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsDownloading(true);
    setError('');

    try {
      // Here you could send the email to your backend for lead capture
      // For now, we'll just log it and proceed with download
      console.log('Resume download requested by:', email);
      
      // Simulate a small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Trigger the download
      const link = document.createElement('a');
      link.href = '/documents/Resume Manav September 25.pdf';
      link.download = 'Manav_Shah_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Close the modal
      onClose();
      setEmail('');
      
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleDownload();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-neutral-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">Download Resume</h3>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <p className="text-neutral-300 mb-4">
          I&apos;d love to connect! Please share your email and I&apos;ll send you my latest resume.
        </p>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              onKeyPress={handleKeyPress}
              placeholder="your.email@example.com"
              className="w-full"
              disabled={isDownloading}
            />
            {error && (
              <p className="mt-1 text-sm text-red-400">{error}</p>
            )}
          </div>
          
          <div className="flex gap-3">
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex-1"
            >
              {isDownloading ? 'Downloading...' : 'Download Resume'}
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              disabled={isDownloading}
            >
              Cancel
            </Button>
          </div>
        </div>
        
        <p className="text-xs text-neutral-400 mt-4 text-center">
          Your email will be used to send you updates about my work and opportunities.
        </p>
      </div>
    </div>
  );
}

