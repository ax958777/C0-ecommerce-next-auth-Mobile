
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import ClientLayout from "../components/ClientLayout";
import { SocketProvider } from "../lib/SocketProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AX Next ECommerce",
  description: "The products from future",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            const sendTrafficData = async () => {
              const page = window.location.pathname;
              const referrer = document.referrer;

              try {
                await fetch('/api/traffic', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ page, referrer }),
                });
              } catch (error) {
                console.error('Error sending traffic data:', error);
              }
            };

            sendTrafficData();
          `
        }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <ClientLayout>
          <Navbar />
          {children}
        </ClientLayout>

      </body>
    </html>
  );
}
