"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      router.push(`/?q=${encodeURIComponent(searchVal.trim())}`);
      setSearchVal("");
      setMobileMenuOpen(false);
    }
  };

  const categories = [
    { name: "Networking", slug: "Networking" },
    { name: "Smart Home", slug: "Smart Home" },
    { name: "Cybersecurity", slug: "Cybersecurity" },
    { name: "Productivity", slug: "Productivity" }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-[0_2px_15px_rgba(0,0,0,0.01)]">
      {/* Top Premium Gradient Line */}
      <div className="h-1 w-full bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500"></div>

      {/* Primary Header Row */}
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <Link href="/" className="group flex items-center gap-2.5 text-2xl font-black tracking-tighter text-slate-900 select-none">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center shadow-md transform group-hover:rotate-12 transition-transform duration-300">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span>Internet<span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600">Electronic</span></span>
        </Link>

        {/* Center: Search Bar (Desktop only) */}
        <form onSubmit={handleSearchSubmit} className="hidden md:relative md:block max-w-xs w-full mx-4">
          <input 
            type="text" 
            placeholder="Search guides, setup tips..." 
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="w-full px-4 py-2 pl-9 bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-2xl text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white focus:border-transparent transition-all"
          />
          <svg className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </form>

        {/* Right: Actions, Dropdown Menu & Socials */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-6 font-black text-xs uppercase tracking-wider text-slate-500">
            <Link href="/" className="hover:text-sky-600 transition-colors">
              Home
            </Link>

            {/* Hover Dropdown for Categories */}
            <div 
              className="relative py-2"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 hover:text-sky-600 transition-colors cursor-pointer focus:outline-none uppercase font-black text-xs">
                Topics
                <svg className={`w-3.5 h-3.5 transform transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {dropdownOpen && (
                <div className="absolute left-0 mt-1.5 w-48 bg-white border border-slate-100 rounded-2xl shadow-xl p-2 z-50 animate-fade-in-up">
                  <Link 
                    href="/" 
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2.5 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-600 hover:text-sky-600 transition-colors"
                  >
                    All Topics
                  </Link>
                  {categories.map((cat) => (
                    <Link 
                      key={cat.slug} 
                      href={`/?cat=${encodeURIComponent(cat.slug)}`}
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2.5 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-600 hover:text-sky-600 transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/about" className="hover:text-sky-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-sky-600 transition-colors">
              Contact
            </Link>
          </nav>

          <div className="h-4 w-[1px] bg-slate-200"></div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#1DA1F2] transition-colors" aria-label="X/Twitter">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-800 transition-colors" aria-label="GitHub">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
              </svg>
            </a>
          </div>

          {/* CTA Button */}
          <Link 
            href="/contact" 
            className="px-4 py-2 bg-slate-900 hover:bg-sky-600 text-white text-[10px] font-black uppercase tracking-wider rounded-xl transition-all shadow-sm hover:scale-102 cursor-pointer"
          >
            Subscribe
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-3">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-500 hover:text-slate-800 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Secondary Row: Quick Topics Shortcuts (Desktop only) */}
      <div className="hidden md:block border-t border-slate-100 bg-slate-50/50">
        <div className="max-w-6xl mx-auto px-6 py-2.5 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-500">
          <div className="flex gap-6 items-center">
            <span className="text-[10px] font-black text-slate-400 select-none">Quick Links:</span>
            <Link href="/" className="hover:text-sky-600 transition-colors py-0.5">All Topics</Link>
            {categories.map((cat) => (
              <Link 
                key={cat.slug} 
                href={`/?cat=${encodeURIComponent(cat.slug)}`}
                className="hover:text-sky-600 transition-colors py-0.5"
              >
                {cat.name}
              </Link>
            ))}
          </div>
          <div className="flex gap-4 items-center">
            <span className="text-[10px] font-black text-slate-300 uppercase select-none">Trending:</span>
            <Link href="/blog/high-speed-internet-smart-electronics" className="text-[10px] text-slate-400 hover:text-sky-600 normal-case font-medium">Wi-Fi 6E Guide</Link>
            <span className="text-slate-200">|</span>
            <Link href="/blog/understanding-5g-home-internet" className="text-[10px] text-slate-400 hover:text-sky-600 normal-case font-medium">5G Home Internet</Link>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white p-6 space-y-6 shadow-inner animate-fade-in-up">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input 
              type="text" 
              placeholder="Search guides, setup tips..." 
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="w-full px-4 py-2.5 pl-10 bg-slate-50 border border-slate-200 rounded-2xl text-sm placeholder-slate-400 focus:outline-none"
            />
            <svg className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </form>

          {/* Mobile Categories */}
          <div className="space-y-2.5">
            <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Categories</p>
            <div className="grid grid-cols-2 gap-2">
              <Link 
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 bg-slate-50 hover:bg-sky-50 hover:text-sky-600 rounded-xl text-center text-xs font-black uppercase tracking-wider text-slate-600 border border-slate-100 transition-colors"
              >
                All Topics
              </Link>
              {categories.map((cat) => (
                <Link 
                  key={cat.slug} 
                  href={`/?cat=${encodeURIComponent(cat.slug)}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 bg-slate-50 hover:bg-sky-50 hover:text-sky-600 rounded-xl text-center text-xs font-black uppercase tracking-wider text-slate-600 border border-slate-100 transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* General Links */}
          <div className="flex flex-col gap-4 border-t border-slate-100 pt-5">
            <Link 
              href="/" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-black text-slate-600 hover:text-sky-600 uppercase tracking-wider"
            >
              Home
            </Link>
            <Link 
              href="/about" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-black text-slate-600 hover:text-sky-600 uppercase tracking-wider"
            >
              About
            </Link>
            <Link 
              href="/contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-black text-slate-600 hover:text-sky-600 uppercase tracking-wider"
            >
              Contact
            </Link>
            <Link 
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 bg-slate-900 hover:bg-sky-600 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all"
            >
              Subscribe to Newsletter
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
