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

  return (
    <article className="max-w-3xl mx-auto">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors">
          <svg className="mr-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Articles
        </Link>
      </div>
      
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 md:p-14 mb-12 relative overflow-hidden">
        <header className="mb-12 border-b border-gray-100 pb-10">
          <div className="flex items-center space-x-2 text-sm text-blue-600 font-bold tracking-wider uppercase mb-6">
            <span>{article.date}</span>
            <span className="text-gray-300">&bull;</span>
            <span className="text-gray-600">By {article.author}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl font-medium">
            {article.excerpt}
          </p>
        </header>

        <div 
          className="prose prose-blue mx-auto"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </article>
  );
}
