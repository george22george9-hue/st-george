import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "St. George Church - Sandbis API & Foundation",
  description: "Production Backend & Infrastructure Foundation for St. George Church - Sandbis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
