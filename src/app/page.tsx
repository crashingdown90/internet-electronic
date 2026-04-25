import { articles } from "@/data/articles";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="text-center py-16 md:py-24 px-6 rounded-[2.5rem] bg-gradient-to-b from-blue-50 to-white border border-blue-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent pointer-events-none"></div>
        <h1 className="relative text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6 z-10 leading-tight">
          Empowering Your <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Digital Connection</span>
        </h1>
        <p className="relative text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed z-10 font-medium">
          Discover the latest insights on high-speed internet, smart home electronics, and networking gear to keep you seamlessly connected.
        </p>
      </section>

      <section>
        <div className="flex items-center justify-between mb-10 border-b border-gray-200 pb-4">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Latest Articles</h2>
          <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Expert Insights</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {articles.map((article) => (
            <article 
              key={article.id} 
              className="group flex flex-col bg-white border border-gray-200 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1.5"
            >
              <div className="p-8 flex-grow flex flex-col relative h-full">
                <div className="text-sm text-blue-600 font-bold tracking-wide mb-4 uppercase">{article.date}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors line-clamp-3 leading-snug">
                  <Link href={`/blog/${article.slug}`} className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    {article.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-8 flex-grow line-clamp-3 leading-relaxed text-base">
                  {article.excerpt}
                </p>
                <div className="mt-auto flex items-center text-sm font-bold text-gray-900">
                  <span className="text-blue-600 group-hover:translate-x-2 transition-transform duration-300 inline-flex items-center">
                    Read full article
                    <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
