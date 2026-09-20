import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LibraryHub",
  description: "Sistema de gerenciamento de biblioteca",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${playfair.variable} h-full antialiased font-sans`}
    >
      <body className="min-h-full flex flex-col md:flex-row bg-library-paper text-library-graphite">
        <Sidebar />
        <main className="flex-1 flex flex-col min-h-screen md:ml-0 mt-16 md:mt-0 w-full overflow-x-hidden">
          {children}
        </main>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
