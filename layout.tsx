import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.vercel.app";
const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT; // e.g. ca-pub-1234567890123456

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "URL.IO — Short links that just work",
    template: "%s · URL.IO"
  },
  description:
    "Turn long links into short, memorable ones in seconds. Free custom aliases, no sign-up required.",
  openGraph: {
    title: "URL.IO — Short links that just work",
    description:
      "Turn long links into short, memorable ones in seconds. Free custom aliases, no sign-up required.",
    url: siteUrl,
    siteName: "URL.IO",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "URL.IO — Short links that just work",
    description: "Turn long links into short, memorable ones in seconds."
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {adsenseClient ? (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        ) : null}
      </head>
      <body>{children}</body>
    </html>
  );
}
