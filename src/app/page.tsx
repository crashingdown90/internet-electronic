"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { articles } from "@/data/articles";

function BlogHomeContent() {
  const searchParams = useSearchParams();
  
  // Category state
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  // Search query state
  const [searchQuery, setSearchQuery] = useState<string>("");
  // View mode state (grid vs list)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  // Pagination limit state (show only latest articles by default)
  const [visibleCount, setVisibleCount] = useState<number>(6);

  // Reset pagination limit on filter changes during render phase (React best practice)
  const [prevCategory, setPrevCategory] = useState("All");
  const [prevSearchQuery, setPrevSearchQuery] = useState("");
  if (prevCategory !== selectedCategory || prevSearchQuery !== searchQuery) {
    setPrevCategory(selectedCategory);
    setPrevSearchQuery(searchQuery);
    setVisibleCount(6);
  }

  // Sync with search queries from layout header form
  useEffect(() => {
    const q = searchParams.get("q");
    const cat = searchParams.get("cat");
    if (q) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSearchQuery(q);
    }
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  // Categories list
  const categories = ["All", "Networking", "Smart Home", "Cybersecurity", "Productivity"];

  // Filter articles
  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Featured article is the newest one (index 0) in the default list
  const featuredArticle = articles[0];
  // Main article list (excluding featured article, unless a filter is active)
  const isFiltering = selectedCategory !== "All" || searchQuery !== "";
  const displayArticles = isFiltering 
    ? filteredArticles 
    : filteredArticles.filter(a => a.id !== featuredArticle.id);

  // Paginated articles to display
  const displayedPaginatedArticles = displayArticles.slice(0, visibleCount);

  // Category Accent Colors
  const getCategoryStyles = (cat: string) => {
    switch(cat) {
      case "Networking":
        return { bg: "bg-sky-50 text-sky-600 border-sky-100", dot: "bg-sky-500", text: "text-sky-600" };
      case "Smart Home":
        return { bg: "bg-emerald-50 text-emerald-600 border-emerald-100", dot: "bg-emerald-500", text: "text-emerald-600" };
      case "Cybersecurity":
        return { bg: "bg-indigo-50 text-indigo-600 border-indigo-100", dot: "bg-indigo-500", text: "text-indigo-600" };
      case "Productivity":
        return { bg: "bg-amber-50 text-amber-600 border-amber-100", dot: "bg-amber-500", text: "text-amber-600" };
      default:
        return { bg: "bg-slate-50 text-slate-600 border-slate-100", dot: "bg-slate-500", text: "text-slate-600" };
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Internet Electronic",
    "url": "https://internet-electronic.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://internet-electronic.com/?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div className="space-y-16 pb-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="sr-only">Internet Electronic - Your Guide to Connectivity and Gadgets</h1>
      {/* Featured Editorial Section (Only shows when not searching/filtering) */}
      {!isFiltering && featuredArticle && (
        <section className="animate-fade-in-up">
          <div className="relative group overflow-hidden rounded-[2.5rem] bg-white border border-slate-200/60 shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] transition-all duration-500">
            {/* Top accent bar */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 md:p-12 items-center">
              {/* Featured content */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center gap-4">
                  <span className={`text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-xl border ${getCategoryStyles(featuredArticle.category).bg}`}>
                    Featured: {featuredArticle.category}
                  </span>
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-wider flex items-center">
                    <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {featuredArticle.date}
                  </span>
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-wider flex items-center">
                    <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {featuredArticle.readingTime} min read
                  </span>
                </div>
                
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight group-hover:text-sky-600 transition-colors">
                  <Link href={`/blog/${featuredArticle.slug}`}>
                    {featuredArticle.title}
                  </Link>
                </h2>
                
                <p className="text-slate-600 text-lg leading-relaxed line-clamp-3">
                  {featuredArticle.excerpt}
                </p>
                
                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-sky-500 text-white font-black flex items-center justify-center text-sm shadow-sm">
                      {featuredArticle.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{featuredArticle.author}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Lead Editor</p>
                    </div>
                  </div>
                  
                  <Link 
                    href={`/blog/${featuredArticle.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-sky-600 text-white font-bold rounded-2xl transition-all duration-300 hover:scale-105 shadow-md shadow-slate-950/10 hover:shadow-sky-500/25"
                  >
                    Read Article
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Decorative side illustration card */}
              <div className="lg:col-span-5 h-64 lg:h-96 rounded-3xl bg-gradient-to-tr from-sky-400 via-blue-500 to-indigo-600 p-8 flex flex-col justify-between text-white relative overflow-hidden shadow-inner">
                <div className="absolute inset-0 bg-dot-pattern opacity-10"></div>
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-black/15 rounded-full blur-xl"></div>
                
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/10">
                    Hot Editorial
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>

                <div className="relative z-10 space-y-2 mt-auto">
                  <h3 className="text-2xl font-black tracking-tight leading-snug">
                    Deep insights on network protocols & future-proofing electronics.
                  </h3>
                  <p className="text-xs text-blue-100 font-medium">Updated every week by top network engineers.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Blog Hub Area */}
      <section className="space-y-8">
        {/* Dynamic Controls Header */}
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center pb-6 border-b border-slate-200">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              {isFiltering ? "Search Results" : "Explore Articles"}
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              {filteredArticles.length} articles found
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
            {/* Real-time search inside container */}
            <div className="relative flex-grow lg:flex-grow-0 max-w-sm">
              <input 
                type="text" 
                placeholder="Filter current view..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full lg:w-64 pl-10 pr-8 py-2 bg-white border border-slate-200 rounded-2xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
              />
              <svg className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full p-0.5"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Layout Mode Toggle */}
            <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200/50">
              <button 
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${viewMode === "grid" ? "bg-white shadow-sm text-sky-600" : "text-slate-500 hover:text-slate-800"}`}
                title="Grid view"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button 
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${viewMode === "list" ? "bg-white shadow-sm text-sky-600" : "text-slate-500 hover:text-slate-800"}`}
                title="List view"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-200">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                selectedCategory === cat
                  ? "bg-slate-900 text-white border-slate-900 shadow-md shadow-slate-950/10 scale-105"
                  : "bg-white text-slate-600 border-slate-200/60 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[2rem] border border-slate-200/60 p-8">
            <div className="w-16 h-16 mx-auto bg-slate-100 rounded-2xl flex items-center justify-center mb-6 text-slate-400">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">No articles match your criteria</h3>
            <p className="text-slate-500 max-w-sm mx-auto text-sm leading-relaxed">
              Try adjusting your filters, modifying your search text, or selecting another category.
            </p>
            <button 
              onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
              className="mt-6 px-6 py-2.5 bg-sky-500 hover:bg-sky-600 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Articles Feed */}
        {filteredArticles.length > 0 && (
          <div className="space-y-12">
            <div className={
              viewMode === "grid" 
                ? "grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8" 
                : "space-y-6"
            }>
              {displayedPaginatedArticles.map((article) => {
                const catStyles = getCategoryStyles(article.category);
                
                if (viewMode === "grid") {
                  return (
                    <article 
                      key={article.id} 
                      className="group flex flex-col bg-white border border-slate-200/60 rounded-2xl md:rounded-[2rem] overflow-hidden shadow-[0_4px_15px_rgb(0,0,0,0.01)] hover:shadow-[0_20px_40px_-15px_rgba(14,165,233,0.12)] hover:border-sky-200 transition-all duration-500 transform hover:-translate-y-1 relative"
                    >
                      {/* Visual Card Header */}
                      <div className="h-24 sm:h-32 md:h-44 w-full relative overflow-hidden select-none bg-slate-50 border-b border-slate-100">
                        <img 
                          src={article.image} 
                          alt={article.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          loading="lazy"
                        />
                      </div>

                      <div className="p-4 md:p-7 flex-grow flex flex-col h-full space-y-3 md:space-y-5">
                        <div className="flex items-center justify-between">
                          <span className={`text-[8px] md:text-[10px] font-black tracking-widest uppercase px-2 py-0.5 md:px-2.5 md:py-1 rounded border ${catStyles.bg}`}>
                            {article.category}
                          </span>
                          <div className="flex items-center gap-3 text-slate-400 text-[8px] md:text-[10px] font-bold uppercase tracking-wider">
                            <span className="flex items-center">
                              <svg className="w-3.5 h-3.5 mr-1 hidden sm:inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {article.date}
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-1.5 md:space-y-2.5">
                          <h3 className="text-sm md:text-xl font-bold md:font-black text-slate-900 group-hover:text-sky-600 transition-all duration-300 line-clamp-3 md:line-clamp-2 leading-snug">
                            <Link href={`/blog/${article.slug}`} className="focus:outline-none">
                              {article.title}
                            </Link>
                          </h3>
                          <p className="text-slate-500 line-clamp-3 text-sm leading-relaxed hidden sm:block">
                            {article.excerpt}
                          </p>
                        </div>

                        <div className="mt-auto pt-3 md:pt-5 border-t border-slate-100 flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 rounded-full bg-slate-100 hidden md:flex items-center justify-center text-slate-600 font-black text-[9px] uppercase group-hover:bg-sky-50 group-hover:text-sky-600 transition-colors">
                              {article.author.charAt(0)}
                            </div>
                            <div>
                              <span className="text-[9px] md:text-[10px] font-bold text-slate-600 uppercase tracking-wider block">{article.author}</span>
                              <span className="text-[8px] md:text-[9px] text-slate-400 block">{article.readingTime} min read</span>
                            </div>
                          </div>
                          
                          <Link 
                            href={`/blog/${article.slug}`}
                            className="w-6 h-6 md:w-8 md:h-8 rounded-lg md:rounded-xl bg-slate-50 group-hover:bg-gradient-to-r group-hover:from-sky-500 group-hover:to-indigo-500 flex items-center justify-center transition-all duration-500 shadow-sm cursor-pointer"
                            aria-label={`Read ${article.title}`}
                          >
                            <svg className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors duration-300 transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                } else {
                  // List View
                  return (
                    <article 
                      key={article.id} 
                      className="group bg-white border border-slate-200/60 rounded-3xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.01)] hover:shadow-[0_15px_30px_rgba(14,165,233,0.08)] hover:border-sky-200 transition-all duration-500 transform hover:-translate-y-0.5 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center relative"
                    >
                      <div className="space-y-3 flex-grow max-w-4xl">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className={`text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded border ${catStyles.bg}`}>
                            {article.category}
                          </span>
                          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider flex items-center">
                            <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {article.date}
                          </span>
                          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider flex items-center">
                            <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {article.readingTime} min read
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-black text-slate-900 group-hover:text-sky-600 transition-all duration-300 leading-snug">
                          <Link href={`/blog/${article.slug}`}>
                            {article.title}
                          </Link>
                        </h3>
                        <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                          {article.excerpt}
                        </p>
                      </div>

                      <div className="flex md:flex-col items-center md:items-end gap-4 md:gap-2 w-full md:w-auto justify-between border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-[9px] uppercase">
                            {article.author.charAt(0)}
                          </div>
                          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">{article.author}</span>
                        </div>
                        <Link 
                          href={`/blog/${article.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-sky-600 group-hover:text-indigo-600 transition-colors cursor-pointer"
                        >
                          Read
                          <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </article>
                  );
                }
              })}
            </div>

            {/* Load More Button */}
            {visibleCount < displayArticles.length && (
              <div className="flex justify-center pt-4">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="px-8 py-3 bg-slate-900 hover:bg-sky-600 text-white text-xs font-black uppercase tracking-widest rounded-2xl transition-all hover:scale-102 cursor-pointer shadow-lg shadow-slate-900/10 hover:shadow-sky-500/20"
                >
                  Load More Articles
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Newsletter Subscription Section */}
      <section className="relative mt-12 rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 p-8 md:p-16 text-center shadow-2xl border border-indigo-500/10 animate-fade-in-up">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-dot-pattern opacity-5 pointer-events-none"></div>
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-sky-500 rounded-full mix-blend-screen filter blur-[80px] opacity-15"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-500 rounded-full mix-blend-screen filter blur-[80px] opacity-15"></div>
        
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <div className="w-14 h-14 mx-auto bg-white/5 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10">
            <svg className="w-7 h-7 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">
            Stay Ahead of the Curve
          </h2>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Join 10,000+ tech enthusiasts. Get the latest guides on smart home automation and high-speed networking delivered straight to your inbox every week.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-grow px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all backdrop-blur-sm text-sm"
              required
            />
            <button 
              type="submit" 
              className="px-8 py-3.5 bg-sky-500 hover:bg-sky-400 text-white text-sm font-black uppercase tracking-wider rounded-2xl transition-all hover:scale-102 shadow-lg shadow-sky-500/20 whitespace-nowrap cursor-pointer"
            >
              Subscribe Now
            </button>
          </form>
          <p className="text-xs text-slate-500">
            We respect your privacy. No spam, ever.
          </p>
        </div>
      </section>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-sky-500 rounded-full animate-spin"></div>
      </div>
    }>
      <BlogHomeContent />
    </Suspense>
  );
}
