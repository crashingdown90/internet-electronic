import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s | Internet Electronic',
    default: 'Internet Electronic - Your Guide to Connectivity and Gadgets',
  },
  description: 'The ultimate source for internet connectivity guides, electronic gadget reviews, and smart home tips. Stay connected with Internet Electronic.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-50 text-slate-900 relative`}>
        {/* Global subtle dot pattern for texture */}
        <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none z-0"></div>

        <header className="sticky top-0 z-50 glass-panel shadow-sm border-b border-slate-200/50">
          {/* Subtle gradient line at the top of the header */}
          <div className="h-1 w-full bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500"></div>
          <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center relative">
            <Link href="/" className="group flex items-center gap-2 text-2xl font-black tracking-tighter text-slate-900">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center shadow-md transform group-hover:rotate-12 transition-transform duration-300">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span>Internet<span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600">Electronic</span></span>
            </Link>
            <nav className="hidden md:flex gap-8 font-bold text-sm tracking-wide uppercase text-slate-600">
              <Link href="/" className="hover:text-sky-600 transition-colors">Home</Link>
              <Link href="/about" className="hover:text-sky-600 transition-colors">About</Link>
              <Link href="/contact" className="hover:text-sky-600 transition-colors">Contact</Link>
            </nav>
          </div>
        </header>
        
        <main className="flex-grow w-full max-w-6xl mx-auto px-6 py-12 relative z-10">
          {children}
        </main>
        
        <footer className="relative bg-slate-900 text-slate-400 py-16 mt-auto border-t-4 border-sky-500 z-10 overflow-hidden">
          {/* Footer background decor */}
          <div className="absolute top-0 left-0 w-full h-full bg-dot-pattern opacity-10 pointer-events-none"></div>
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-sky-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>

          <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
            <div className="flex flex-wrap justify-center gap-8 mb-10 text-sm font-bold tracking-wider uppercase text-slate-300">
              <Link href="/about" className="hover:text-sky-400 transition-colors">About Us</Link>
              <Link href="/contact" className="hover:text-sky-400 transition-colors">Contact</Link>
              <Link href="/privacy-policy" className="hover:text-sky-400 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-sky-400 transition-colors">Terms of Service</Link>
            </div>
            
            <div className="mb-6">
              <p className="font-black text-white text-2xl tracking-tighter mb-2">Internet<span className="text-sky-400">Electronic</span></p>
              <p className="max-w-md mx-auto text-slate-400 leading-relaxed">Dedicated to bringing you the best insights in internet infrastructure and electronic technology for a connected future.</p>
            </div>
            <div className="pt-8 border-t border-slate-800/50">
              <p className="text-xs font-semibold tracking-widest uppercase">&copy; {new Date().getFullYear()} internet-electronic.com. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
