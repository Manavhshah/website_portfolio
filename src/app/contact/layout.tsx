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

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

