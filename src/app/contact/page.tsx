'use client';

import { useState } from 'react';
import ContactForm from '@/components/forms/contact-form';
import CopyEmailButton from '@/components/CopyEmailButton';
import ResumeDownloadModal from '@/components/ResumeDownloadModal';
import Link from 'next/link';

export default function ContactPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="section-padding gradient-subtle">
        <div className="container-max">
          <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-6">← Back to home</Link>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Contact</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-8">
            I&apos;m always open to new conversations, whether it&apos;s about startup strategy, business development, or finance-tech intersections.
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mb-12">
            Let&apos;s talk!
          </p>
        </div>
      </header>

      {/* Quick Contact Buttons */}
      <section className="section-padding bg-card">
        <div className="container-max">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {/* Copy Email Button */}
            <div className="col-span-2 lg:col-span-1">
              <CopyEmailButton />
            </div>

            {/* LinkedIn Button */}
            <a
              href="https://linkedin.com/in/manav-hitesh-shah"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors group"
            >
              <div className="text-center">
                <div className="text-2xl mb-2">🔗</div>
                <h3 className="text-sm font-semibold mb-1 group-hover:text-foreground">LinkedIn</h3>
                <p className="text-xs text-muted-foreground">Connect with me</p>
              </div>
            </a>

            {/* Book Meeting Button */}
            <a
              href="https://calendar.app.google/zdiDM4Z64SCFxFJb6"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors group"
            >
              <div className="text-center">
                <div className="text-2xl mb-2">📅</div>
                <h3 className="text-sm font-semibold mb-1 group-hover:text-foreground">Book Meeting</h3>
                <p className="text-xs text-muted-foreground">30 min chat</p>
              </div>
            </a>

            {/* Download Resume Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors group w-full"
            >
              <div className="text-center">
                <div className="text-2xl mb-2">📄</div>
                <h3 className="text-sm font-semibold mb-1 group-hover:text-foreground">Resume</h3>
                <p className="text-xs text-muted-foreground">Download PDF</p>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <main className="section-padding">
        <div className="container-max">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Or send me a message</h2>
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
