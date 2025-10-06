import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Manav Shah - Portfolio",
    template: "%s | Manav Shah"
  },
  description: "Portfolio website showcasing projects, insights, and professional experience. Building systems that scale and exploring the intersection of technology and business.",
  keywords: ["portfolio", "software engineer", "developer", "technology", "business", "projects", "insights"],
  authors: [{ name: "Manav Shah" }],
  creator: "Manav Shah",
  publisher: "Manav Shah",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Manav Shah - Portfolio',
    description: 'Portfolio website showcasing projects, insights, and professional experience. Building systems that scale and exploring the intersection of technology and business.',
    siteName: 'Manav Shah Portfolio',
    images: [
      {
        url: '/images/og.png',
        width: 1200,
        height: 630,
        alt: 'Manav Shah - Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Manav Shah - Portfolio',
    description: 'Portfolio website showcasing projects, insights, and professional experience. Building systems that scale and exploring the intersection of technology and business.',
    images: ['/images/og.png'],
    creator: '@manavshah',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Skip link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-black px-4 py-2 rounded-md font-medium z-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Skip to main content
        </a>
        <Navigation />
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
