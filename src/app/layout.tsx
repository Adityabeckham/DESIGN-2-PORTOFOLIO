import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Caveat, Kalam, Fira_Code } from 'next/font/google';
import './globals.css';
import {
  Navbar,
  Footer,
  PaperPlaneRunner,
  InteractiveBackground,
  CustomCursor,
  ScrollObserver,
} from '@/components';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
});

const kalam = Kalam({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-kalam',
  display: 'swap',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Aditya Beckham — Web Developer Portfolio (React & Neon DB)',
  description:
    'Official Portfolio of Aditya Beckham — Web Developer specializing in React, Next.js, Full-Stack Web Development, and Neon PostgreSQL Database integration.',
  keywords: [
    'Aditya Beckham',
    'Web Developer',
    'Frontend Engineer',
    'Full-Stack Developer',
    'React',
    'Next.js',
    'Neon Database',
    'PostgreSQL',
    'Tailwind CSS',
    'TypeScript Portfolio'
  ],
  authors: [{ name: 'Aditya Beckham' }],
  creator: 'Aditya Beckham',
  publisher: 'Aditya Beckham',
  robots: { index: true, follow: true },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://github.com/Adityabeckham/DESIGN-2-PORTOFOLIO'),
  openGraph: {
    type: 'website',
    url: 'https://github.com/Adityabeckham/DESIGN-2-PORTOFOLIO',
    title: 'Aditya Beckham — Web Developer Portfolio',
    description:
      'Official Portfolio of Aditya Beckham — Web Developer specializing in React, Next.js, and Full-Stack Web Development.',
    siteName: 'Aditya Beckham Portfolio',
    images: [
      {
        url: '/assets/images/profile/foto-about.png',
        width: 800,
        height: 600,
        alt: 'Aditya Beckham Profile'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aditya Beckham — Web Developer Portfolio',
    description:
      'Official Portfolio of Aditya Beckham — Web Developer specializing in React, Next.js, and Full-Stack Web Development.',
    images: ['/assets/images/profile/foto-about.png']
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`paper-texture ${plusJakartaSans.variable} ${caveat.variable} ${kalam.variable} ${firaCode.variable}`}
    >
      <body>
        <ScrollObserver />
        <InteractiveBackground />
        <PaperPlaneRunner />
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
