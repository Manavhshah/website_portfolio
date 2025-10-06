import ContactForm from '@/components/forms/contact-form';
import Link from 'next/link';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Manav Shah. Have a project in mind or want to discuss opportunities? Let's work together to build something amazing.",
  openGraph: {
    title: "Contact | Manav Shah",
    description: "Get in touch with Manav Shah. Have a project in mind or want to discuss opportunities? Let's work together to build something amazing.",
    url: "/contact",
  },
  twitter: {
    title: "Contact | Manav Shah",
    description: "Get in touch with Manav Shah. Have a project in mind or want to discuss opportunities? Let's work together to build something amazing.",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Header */}
      <header className="px-6 py-16 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center text-neutral-400 hover:text-white transition-colors mb-6">← Back to home</Link>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Contact</h1>
          <p className="text-xl text-neutral-300 max-w-2xl">
            Let&apos;s work together to build something amazing.
          </p>
        </div>
      </header>

      {/* Contact Form */}
      <main className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <ContactForm />
        </div>
      </main>
    </div>
  );
}
