import { articles } from "@/data/articles";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ReadingProgress, TableOfContents } from "@/components/BlogHelper";

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  
  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.date,
      authors: [article.author],
    }
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  // Get related articles (same category, excluding this one)
  const relatedArticles = articles
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  // If we don't have enough related articles, pad with latest ones
  if (relatedArticles.length < 3) {
    const idsToExclude = [article.id, ...relatedArticles.map(r => r.id)];
    const padArticles = articles
      .filter((a) => !idsToExclude.includes(a.id))
      .slice(0, 3 - relatedArticles.length);
    relatedArticles.push(...padArticles);
  }

  const getCategoryStyles = (cat: string) => {
    switch(cat) {
      case "Networking":
        return "bg-sky-50 text-sky-600 border-sky-100";
      case "Smart Home":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "Cybersecurity":
        return "bg-indigo-50 text-indigo-600 border-indigo-100";
      case "Productivity":
        return "bg-amber-50 text-amber-600 border-amber-100";
      default:
        return "bg-slate-50 text-slate-600 border-slate-100";
    }
  };

  return (
    <>
      {/* Scroll Progress Indicator */}
      <ReadingProgress />

      <div className="max-w-6xl mx-auto space-y-12 pb-12 animate-fade-in-up">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-slate-200/60 pb-5">
          <Link href="/" className="group inline-flex items-center text-xs font-black text-slate-500 hover:text-sky-600 transition-colors uppercase tracking-widest">
            <span className="w-8 h-8 rounded-full bg-white border border-slate-200 group-hover:bg-sky-50 flex items-center justify-center mr-2.5 transition-colors">
              <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </span>
            Back to Home
          </Link>
          <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            Reading Room
          </div>
        </div>

        {/* Article Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Sidebar: Sticky ToC & Back link (Desktop Only) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-28 space-y-8">
            <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
              <TableOfContents />
            </div>
            
            <div className="p-6 bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl text-white space-y-4 relative overflow-hidden shadow-md">
              <div className="absolute inset-0 bg-dot-pattern opacity-10"></div>
              <h4 className="text-sm font-black tracking-wide uppercase relative z-10">Have questions?</h4>
              <p className="text-xs text-slate-300 leading-relaxed relative z-10">
                Contact our tech authors directly if you need clarification on home networking or automation steps.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-sky-400 hover:text-sky-300 transition-colors relative z-10">
                Ask an Expert
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-9 space-y-12">
            <article className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-200/60 p-6 md:p-14 relative overflow-hidden">
              {/* Header strip */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500"></div>

              <header className="mb-10 pb-8 border-b border-slate-100 space-y-6">
                <div className="flex flex-wrap items-center gap-3.5 text-[10px] font-black tracking-wider uppercase">
                  <span className={`px-3 py-1.5 rounded-xl border ${getCategoryStyles(article.category)}`}>
                    {article.category}
                  </span>
                  <span className="text-slate-300">&bull;</span>
                  <span className="text-slate-500 flex items-center">
                    <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {article.date}
                  </span>
                  <span className="text-slate-300">&bull;</span>
                  <span className="text-slate-500 flex items-center">
                    <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {article.readingTime} min read
                  </span>
                </div>
                
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[1.2]">
                  {article.title}
                </h1>
                
                <p className="text-lg md:text-xl text-slate-500 leading-relaxed font-medium">
                  {article.excerpt}
                </p>

                <div className="flex items-center pt-4">
                  <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-black flex items-center justify-center text-sm shadow-sm">
                    {article.author.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-bold text-slate-900 leading-none">{article.author}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Contributor & Technical Writer</p>
                  </div>
                </div>
              </header>

              {/* Rich Text Editor Body */}
              <div 
                className="prose prose-sky mx-auto max-w-none prose-headings:font-black prose-headings:tracking-tight prose-p:leading-relaxed prose-p:text-slate-600 prose-img:rounded-3xl"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Share & Social elements */}
              <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col items-center justify-center space-y-4">
                <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Share this guide</p>
                <div className="flex gap-3">
                  <button className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#1DA1F2] hover:border-[#1DA1F2] hover:bg-[#1DA1F2]/10 transition-all hover:scale-105 cursor-pointer" aria-label="Share on X">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#0A66C2] hover:border-[#0A66C2] hover:bg-[#0A66C2]/10 transition-all hover:scale-105 cursor-pointer" aria-label="Share on LinkedIn">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#1877F2] hover:border-[#1877F2] hover:bg-[#1877F2]/10 transition-all hover:scale-105 cursor-pointer" aria-label="Share on Facebook">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>

            {/* Related Articles Widgets */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-200/60">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Recommended For You</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((rel) => (
                  <Link 
                    key={rel.id} 
                    href={`/blog/${rel.slug}`}
                    className="group bg-white border border-slate-200/60 rounded-3xl p-5 hover:border-sky-200 shadow-[0_4px_20px_rgb(0,0,0,0.01)] hover:shadow-[0_15px_30px_-10px_rgba(14,165,233,0.1)] transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <span className="text-[8px] font-black uppercase tracking-wider text-sky-600 block">
                        {rel.category}
                      </span>
                      <h4 className="text-sm font-black text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-2 leading-snug">
                        {rel.title}
                      </h4>
                      <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">
                        {rel.excerpt}
                      </p>
                    </div>
                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                      <span>{rel.date}</span>
                      <span className="group-hover:text-sky-600 transition-colors flex items-center gap-1">
                        Read
                        <svg className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
