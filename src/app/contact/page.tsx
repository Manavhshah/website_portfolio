'use client';

import { useState } from 'react';
import ContactForm from '@/components/forms/contact-form';
import CopyEmailButton from '@/components/CopyEmailButton';
import ResumeDownloadModal from '@/components/ResumeDownloadModal';
import Link from 'next/link';

export default function ContactPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Header */}
      <header className="px-6 py-16 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center text-neutral-400 hover:text-white transition-colors mb-6">← Back to home</Link>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Contact</h1>
          <p className="text-xl text-neutral-300 max-w-2xl mb-8">
            I&apos;m always open to new conversations, whether it&apos;s about startup strategy, business development, or finance-tech intersections.
          </p>
          <p className="text-lg text-neutral-300 max-w-2xl mb-12">
            If you need a fast learner who can bridge business and technical execution, let&apos;s talk! We can learn from each other.
          </p>
        </div>
      </header>

      {/* Quick Contact Buttons */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Copy Email Button */}
            <CopyEmailButton />

            {/* LinkedIn Button */}
            <a
              href="https://linkedin.com/in/manav-hitesh-shah"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-6 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors group"
            >
              <div className="text-center">
                <div className="text-3xl mb-3">🔗</div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-white">LinkedIn</h3>
                <p className="text-sm text-neutral-400">linkedin.com/in/manav-hitesh-shah</p>
              </div>
            </a>

            {/* Book Meeting Button */}
            <a
              href="https://calendar.app.google/zdiDM4Z64SCFxFJb6"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-6 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors group"
            >
              <div className="text-center">
                <div className="text-3xl mb-3">📅</div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-white">Book 30 Minutes</h3>
                <p className="text-sm text-neutral-400">Schedule a quick chat</p>
              </div>
            </a>

            {/* Download Resume Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center p-6 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors group w-full"
            >
              <div className="text-center">
                <div className="text-3xl mb-3">📄</div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-white">Download Resume</h3>
                <p className="text-sm text-neutral-400">Get my latest resume</p>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <main className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Or send me a message</h2>
            <p className="text-neutral-400">Prefer to write? Use the form below and I&apos;ll get back to you soon.</p>
          </div>
          <ContactForm />
        </div>
      </main>

      {/* Resume Download Modal */}
      <ResumeDownloadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
