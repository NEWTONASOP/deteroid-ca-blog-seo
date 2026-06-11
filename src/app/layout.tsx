import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { client } from "@/sanity/client";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries";
import { urlForImage } from "@/sanity/image";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://saroracompany.com'

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await client.fetch(SITE_SETTINGS_QUERY).catch(() => null);

  const siteName = siteSettings?.siteName || "Shalini Arora & Company";
  const title = siteSettings?.title || "Blog | Shalini Arora & Company - CA in Noida";
  const description = siteSettings?.description || "Expert financial insights, tax updates, and compliance guides from Shalini Arora & Company, Chartered Accountants in Noida.";

  const ogImageUrl = siteSettings?.defaultShareImage
    ? urlForImage(siteSettings.defaultShareImage)?.width(1200).height(630).url()
    : null;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      template: `%s | ${siteName}`,
      default: title,
    },
    description,
    alternates: {
      canonical: '/',
    },
    manifest: '/site.webmanifest',
    openGraph: {
      title,
      description,
      siteName,
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630 }] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImageUrl ? [ogImageUrl] : [],
    },
    robots: siteSettings?.noIndexAll ? {
      index: false,
      follow: false,
    } : {
      index: true,
      follow: true,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased min-h-screen flex flex-col bg-white`}
      >
        {children}
      </body>
    </html>
  );
}
