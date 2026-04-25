import { articles } from "@/data/articles";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

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

  // Calculate a rough reading time based on 200 words per minute
  const wordCount = article.content.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <article className="max-w-3xl mx-auto animate-fade-in-up">
      <div className="mb-10">
        <Link href="/" className="group inline-flex items-center text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-widest">
          <span className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-blue-50 flex items-center justify-center mr-3 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </span>
          Back to Home
        </Link>
      </div>
      
      <div className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 md:p-16 mb-12 relative overflow-hidden">
        <header className="mb-14 pb-10 border-b border-gray-100">
          <div className="flex flex-wrap items-center gap-4 text-sm font-bold tracking-wider uppercase mb-8">
            <span className="text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Connectivity Guide</span>
            <span className="text-slate-300">&bull;</span>
            <span className="text-slate-500 flex items-center">
              <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {article.date}
            </span>
            <span className="text-slate-300">&bull;</span>
            <span className="text-slate-500 flex items-center">
              <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {readingTime} min read
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.15]">
            {article.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-medium">
            {article.excerpt}
          </p>

          <div className="mt-10 flex items-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
              {article.author.charAt(0)}
            </div>
            <div className="ml-4">
              <p className="text-base font-bold text-slate-900">{article.author}</p>
              <p className="text-sm text-slate-500">Internet Electronic Editorial</p>
            </div>
          </div>
        </header>

        <div 
          className="prose prose-sky mx-auto"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Social Share & Interaction */}
        <div className="mt-16 pt-10 border-t border-slate-100 flex flex-col items-center justify-center">
          <p className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-6">Share this guide</p>
          <div className="flex gap-4">
            <button className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#1DA1F2] hover:border-[#1DA1F2] hover:bg-[#1DA1F2]/10 transition-all hover:scale-110" aria-label="Share on X (Twitter)">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </button>
            <button className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#0A66C2] hover:border-[#0A66C2] hover:bg-[#0A66C2]/10 transition-all hover:scale-110" aria-label="Share on LinkedIn">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#1877F2] hover:border-[#1877F2] hover:bg-[#1877F2]/10 transition-all hover:scale-110" aria-label="Share on Facebook">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-sky-500 hover:border-sky-500 hover:bg-sky-50 transition-all hover:scale-110" aria-label="Copy Link">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
