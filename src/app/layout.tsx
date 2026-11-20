import type { Metadata, Viewport } from "next";
import { caveat, fredoka, playfair } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Date Night with Engineer",
  description:
    "A cozy, romantic dress-up & dating game. Get ready, call Engineer, and make memories together.",
  applicationName: "Date Night with Engineer",
  appleWebApp: { capable: true, title: "Date Night", statusBarStyle: "black-translucent" },
};

export const viewport: Viewport = {
  themeColor: "#2a1640",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fredoka.variable} ${caveat.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
