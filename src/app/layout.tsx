import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { siteMeta } from '@/content/meta';
import { MotionProvider } from '@/context/MotionContext';
import { SkipLink } from '@/components/common/SkipLink';
import { ScrollProgressBar } from '@/components/common/ScrollProgressBar';
import { HeroBackdrop3D } from '@/components/3d/HeroBackdrop3D';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMeta.domain),
  title: {
    default: `${siteMeta.name} — ${siteMeta.role}`,
    template: `%s | ${siteMeta.name}`,
  },
  description: siteMeta.pitch,
  keywords: [
    'Ankit Bhandari',
    'Fullstack Software Engineer',
    'MERN Stack Developer',
    'Next.js Engineer',
    'Machine Learning',
    'LSTM',
    'Dehradun Software Engineer',
  ],
  authors: [{ name: siteMeta.name, url: siteMeta.domain }],
  creator: siteMeta.name,
  alternates: {
    canonical: siteMeta.domain,
  },
  openGraph: {
    type: 'website',
    locale: siteMeta.locale,
    url: siteMeta.domain,
    title: `${siteMeta.name} — ${siteMeta.role}`,
    description: siteMeta.pitch,
    siteName: `${siteMeta.name} Portfolio`,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${siteMeta.name} - ${siteMeta.role}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteMeta.name} — ${siteMeta.role}`,
    description: siteMeta.pitch,
    creator: '@bhandariji1298',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#030303',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteMeta.personSchema),
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-foreground selection:text-background font-sans relative">
        <MotionProvider>
          {/* Top scroll progress indicator */}
          <ScrollProgressBar />

          {/* 3D Atmospheric Canvas & Masked Portrait Backdrop */}
          <HeroBackdrop3D />

          <SkipLink />
          <Header />
          <main id="main" tabIndex={-1} className="relative z-10 focus:outline-none">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
