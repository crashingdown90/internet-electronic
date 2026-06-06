import { articles } from "@/data/articles";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return [
    { slug: "networking" },
    { slug: "smart-home" },
    { slug: "cybersecurity" },
    { slug: "productivity" }
  ];
}

// Map slugs to display categories
const slugToCategory = (slug: string) => {
  switch (slug) {
    case "networking":
      return "Networking";
    case "smart-home":
      return "Smart Home";
    case "cybersecurity":
      return "Cybersecurity";
    case "productivity":
      return "Productivity";
    default:
      return null;
  }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const categoryName = slugToCategory(slug);
  
  if (!categoryName) {
    return { title: "Category Not Found" };
  }

  return {
    title: `${categoryName} Guides & Reviews | Internet Electronic`,
    description: `Browse the latest expert guides, setup tutorials, and electronic reviews in ${categoryName} on Internet Electronic.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const categoryName = slugToCategory(slug);

  if (!categoryName) {
    notFound();
  }

  // Filter articles by category
  const categoryArticles = articles.filter(a => a.category === categoryName);

  const getCategoryStyles = (cat: string) => {
    switch(cat) {
      case "Networking":
        return { bg: "bg-sky-50 text-sky-600 border-sky-100", header: "from-sky-400 to-indigo-600" };
      case "Smart Home":
        return { bg: "bg-emerald-50 text-emerald-600 border-emerald-100", header: "from-emerald-400 to-cyan-600" };
      case "Cybersecurity":
        return { bg: "bg-indigo-50 text-indigo-600 border-indigo-100", header: "from-indigo-500 to-pink-600" };
      case "Productivity":
        return { bg: "bg-amber-50 text-amber-600 border-amber-100", header: "from-amber-400 to-rose-600" };
      default:
        return { bg: "bg-slate-50 text-slate-600 border-slate-100", header: "from-slate-400 to-slate-600" };
    }
  };

  const styles = getCategoryStyles(categoryName);

  return (
    <div className="space-y-12 pb-12 animate-fade-in-up">
      {/* Category Header */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-200/60 p-8 md:p-14 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500"></div>
        <div className="space-y-4 max-w-2xl">
          <Link href="/" className="inline-flex items-center text-xs font-black text-slate-400 hover:text-sky-600 transition-colors uppercase tracking-widest">
            <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Home
          </Link>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            {categoryName} <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600">Articles</span>
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            Discover the latest, comprehensive guides and setups compiled by our experts on {categoryName.toLowerCase()}. Stay secure, fast, and connected.
          </p>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
        {categoryArticles.map((article) => (
          <article 
            key={article.id} 
            className="group flex flex-col bg-white border border-slate-200/60 rounded-2xl md:rounded-[2rem] overflow-hidden shadow-[0_4px_15px_rgb(0,0,0,0.01)] hover:shadow-[0_20px_40px_-15px_rgba(14,165,233,0.12)] hover:border-sky-200 transition-all duration-500 transform hover:-translate-y-1 relative"
          >
            {/* Visual Cover */}
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
                <span className={`text-[8px] md:text-[10px] font-black tracking-widest uppercase px-2 py-0.5 md:px-2.5 md:py-1 rounded border ${styles.bg}`}>
                  {article.category}
                </span>
                <span className="text-slate-400 text-[8px] md:text-[10px] font-bold uppercase tracking-wider flex items-center">
                  {article.date}
                </span>
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
                <div>
                  <span className="text-[9px] md:text-[10px] font-bold text-slate-600 uppercase tracking-wider block">{article.author}</span>
                  <span className="text-[8px] md:text-[9px] text-slate-400 block">{article.readingTime} min read</span>
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
        ))}
      </div>
    </div>
  );
}
