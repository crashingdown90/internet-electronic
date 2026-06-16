"use client";

import { useEffect, useState } from "react";

// Reading Progress Bar Component
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-[73px] md:top-[69px] left-0 w-full h-[3px] z-50 pointer-events-none">
      <div 
        className="h-full bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 transition-all duration-75 ease-out" 
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

// Table of Contents Section item
interface TocItem {
  id: string;
  text: string;
  level: "h2" | "h3";
}

// Table of Contents Scroll-Spy Component
export function TableOfContents() {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Select headers from the article body
    const articleBody = document.querySelector(".prose");
    if (!articleBody) return;

    const headers = Array.from(articleBody.querySelectorAll("h2, h3"));
    const items: TocItem[] = headers.map((header, index) => {
      // If header doesn't have an ID, assign one
      if (!header.id) {
        const cleanText = (header.textContent || "")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        header.id = `${cleanText || "section"}-${index}`;
      }
      return {
        id: header.id,
        text: header.textContent || "",
        level: header.tagName.toLowerCase() as "h2" | "h3"
      };
    });

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToc(items);

    // IntersectionObserver to spy on scroll position and highlight active header
    const observerOptions = {
      root: null,
      rootMargin: "-100px 0px -70% 0px",
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    headers.forEach((header) => observer.observe(header));

    return () => {
      headers.forEach((header) => observer.unobserve(header));
      observer.disconnect();
    };
  }, []);

  if (toc.length === 0) return null;

  return (
    <div className="space-y-4">
      <p className="text-xs font-black tracking-widest text-slate-400 uppercase">
        Table of Contents
      </p>
      <nav className="space-y-2 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin">
        {toc.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(item.id)?.scrollIntoView({
                behavior: "smooth",
                block: "start"
              });
              setActiveId(item.id);
            }}
            className={`block text-xs leading-relaxed transition-all duration-200 border-l-2 pl-3 ${
              item.level === "h3" ? "ml-3 text-[11px]" : "font-semibold"
            } ${
              activeId === item.id
                ? "text-sky-600 border-sky-500 font-bold translate-x-0.5"
                : "text-slate-500 border-slate-200 hover:text-slate-900 hover:border-slate-400"
            }`}
          >
            {item.text}
          </a>
        ))}
      </nav>
    </div>
  );
}
