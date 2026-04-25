import { articles } from "@/data/articles";
import Link from "next/link";
import ImageSlider from "@/components/ImageSlider";

export default function Home() {
  return (
    <div className="space-y-24 pb-10">
      {/* Premium Hero Image Slider Section */}
      <section className="pt-2">
        <ImageSlider />
      </section>

      {/* Article Grid Section */}
      <section>
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-12 pb-6 border-b border-slate-200 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center shadow-lg text-white">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H14" />
              </svg>
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Latest Editorial</h2>
          </div>
          <p className="text-slate-500 mt-4 md:mt-0 font-bold uppercase tracking-widest text-sm">Deep Dives & Reviews</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {articles.map((article, index) => {
            const delay = 0.2 + (index * 0.1);
            
            return (
              <article 
                key={article.id} 
                className="group flex flex-col bg-white border border-slate-200/60 rounded-[2rem] overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_-15px_rgba(14,165,233,0.15)] hover:border-sky-200 transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up relative"
                style={{ animationDelay: `${delay}s` }}
              >
                {/* Subtle gradient line on top of card on hover */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                <div className="p-8 flex-grow flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-black text-sky-600 tracking-widest uppercase bg-sky-50 px-3 py-1.5 rounded-md border border-sky-100">
                      Expert Guide
                    </span>
                    <div className="flex items-center text-slate-400 text-xs font-bold uppercase tracking-wider">
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {article.date}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-sky-500 group-hover:to-indigo-600 transition-all duration-300 line-clamp-3 leading-snug tracking-tighter">
                    <Link href={`/blog/${article.slug}`} className="focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true" />
                      {article.title}
                    </Link>
                  </h3>
                  
                  <p className="text-slate-600 mb-8 flex-grow line-clamp-3 leading-relaxed text-base">
                    {article.excerpt}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs group-hover:bg-sky-100 group-hover:text-sky-600 transition-colors">
                        {article.author.charAt(0)}
                      </div>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{article.author}</span>
                    </div>
                    
                    <span className="w-10 h-10 rounded-full bg-slate-50 group-hover:bg-gradient-to-r group-hover:from-sky-500 group-hover:to-indigo-500 flex items-center justify-center transition-all duration-500 shadow-sm">
                      <svg className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors duration-300 transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Newsletter Subscription Section */}
      <section className="relative mt-20 rounded-[3rem] overflow-hidden bg-gradient-to-br from-slate-900 to-indigo-950 p-10 md:p-20 text-center shadow-2xl border border-indigo-500/20 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-dot-pattern opacity-10 pointer-events-none"></div>
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-sky-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20"></div>
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="w-16 h-16 mx-auto bg-white/10 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md border border-white/10">
            <svg className="w-8 h-8 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
            Stay Ahead of the Curve
          </h2>
          <p className="text-lg text-indigo-200 mb-10 leading-relaxed">
            Join 10,000+ tech enthusiasts. Get the latest guides on smart home automation and high-speed networking delivered straight to your inbox every week.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" action="#">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-grow px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all backdrop-blur-sm"
              required
            />
            <button 
              type="submit" 
              className="px-8 py-4 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-2xl transition-all hover:scale-105 shadow-[0_0_20px_rgba(14,165,233,0.3)] whitespace-nowrap"
            >
              Subscribe Now
            </button>
          </form>
          <p className="text-sm text-indigo-400 mt-6">
            We respect your privacy. No spam, ever.
          </p>
        </div>
      </section>
    </div>
  );
}
