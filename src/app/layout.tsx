import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s | Internet Electronic',
    default: 'Internet Electronic - Your Guide to Connectivity and Gadgets',
  },
  description: 'The ultimate source for internet connectivity guides, electronic gadget reviews, and smart home tips. Stay connected with Internet Electronic.',
  keywords: ['internet', 'electronics', 'smart home', 'routers', 'wi-fi', 'IoT', 'connectivity'],
  authors: [{ name: 'Internet Electronic Team' }],
  creator: 'Internet Electronic',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://internet-electronic.com',
    siteName: 'Internet Electronic',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-white text-gray-900`}>
        <header className="border-b border-gray-200 sticky top-0 bg-white/90 backdrop-blur-md z-50 shadow-sm">
          <div className="max-w-5xl mx-auto px-4 py-5 flex justify-between items-center">
            <a href="/" className="text-2xl font-extrabold tracking-tight text-gray-900 hover:text-blue-600 transition-colors">
              Internet<span className="text-blue-600">Electronic</span>
            </a>
            <nav className="hidden md:flex gap-8 font-semibold text-sm">
              <a href="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Reviews</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Guides</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
            </nav>
          </div>
        </header>
        
        <main className="flex-grow w-full max-w-5xl mx-auto px-4 py-12">
          {children}
        </main>
        
        <footer className="border-t border-gray-200 bg-gray-50 py-12 mt-auto">
          <div className="max-w-5xl mx-auto px-4 text-center text-gray-500 text-sm">
            <p className="font-medium text-gray-700 text-lg mb-2">Internet Electronic</p>
            <p>&copy; {new Date().getFullYear()} internet-electronic.com. All rights reserved.</p>
            <p className="mt-4 max-w-md mx-auto">Dedicated to bringing you the best insights in internet infrastructure and electronic technology for a connected future.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
