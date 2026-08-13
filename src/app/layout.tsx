import type { Metadata } from 'next';
import { Cairo, Amiri, Reem_Kufi } from 'next/font/google';
import '@/styles/globals.css';
import ThreeBackground from '@/components/shared/ThreeBackground';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { LanguageProvider } from '@/context/LanguageContext';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cairo',
  display: 'swap',
});

const amiri = Amiri({
  subsets: ['arabic', 'latin'],
  weight: ['400', '700'],
  variable: '--font-amiri',
  display: 'swap',
});

const reemKufi = Reem_Kufi({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-reem-kufi',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'كنيسة الشهيد العظيم مارجرجس بسندبيس | St. George Church – Sandbis',
  description: 'الموقع الرسمي لكنيسة الشهيد العظيم مارجرجس بسندبيس - مطرانية شبرا الخيمة وتوابعها',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${amiri.variable} ${reemKufi.variable}`}>
      <head>
        {/* Bootstrap 5 RTL CSS */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.rtl.min.css"
        />

        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        />
      </head>
      <body>
        <LanguageProvider>
          {/* 3D WebGL Background Canvas */}
          <ThreeBackground />

          <div id="app-router-view">
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <main style={{ minHeight: '80vh' }}>{children}</main>

            {/* Footer */}
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
