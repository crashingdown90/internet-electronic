import { articlesPart1 } from "./articles_part1";
import { articlesPart2 } from "./articles_part2";
import { articlesPart3 } from "./articles_part3";
import { articlesPart4 } from "./articles_part4";
import { articlesPart5 } from "./articles_part5";

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
}

export interface ArticleWithMeta extends Article {
  category: "Networking" | "Smart Home" | "Cybersecurity" | "Productivity" | "Tech Insight";
  readingTime: number;
  image: string;
}

const rawArticles = [
  ...articlesPart1, 
  ...articlesPart2, 
  ...articlesPart3, 
  ...articlesPart4, 
  ...articlesPart5
];

export const articles: ArticleWithMeta[] = rawArticles
  .map((article) => {
    // Determine Category
    let category: ArticleWithMeta["category"] = "Tech Insight";
    const lowercaseSlug = article.slug.toLowerCase();
    const lowercaseTitle = article.title.toLowerCase();

    if (
      lowercaseSlug.includes("smart") || 
      lowercaseSlug.includes("iot") ||
      lowercaseTitle.includes("smart") ||
      lowercaseTitle.includes("home automation")
    ) {
      category = "Smart Home";
    } else if (
      lowercaseSlug.includes("cybersecurity") || 
      lowercaseSlug.includes("security") || 
      lowercaseSlug.includes("secure") || 
      lowercaseSlug.includes("privacy") || 
      lowercaseSlug.includes("encryption") ||
      lowercaseTitle.includes("cybersecurity") ||
      lowercaseTitle.includes("security")
    ) {
      category = "Cybersecurity";
    } else if (
      lowercaseSlug.includes("work") || 
      lowercaseSlug.includes("remote") || 
      lowercaseSlug.includes("accessory") || 
      lowercaseSlug.includes("productivity") || 
      lowercaseSlug.includes("ergonomic") ||
      lowercaseSlug.includes("monitor") ||
      lowercaseTitle.includes("remote") ||
      lowercaseTitle.includes("productivity") ||
      lowercaseTitle.includes("workplace")
    ) {
      category = "Productivity";
    } else if (
      lowercaseSlug.includes("internet") || 
      lowercaseSlug.includes("5g") || 
      lowercaseSlug.includes("fiber") || 
      lowercaseSlug.includes("network") || 
      lowercaseSlug.includes("wi-fi") || 
      lowercaseSlug.includes("wifi") || 
      lowercaseSlug.includes("broadband") || 
      lowercaseSlug.includes("connectivity") ||
      lowercaseTitle.includes("internet") ||
      lowercaseTitle.includes("network") ||
      lowercaseTitle.includes("fiber") ||
      lowercaseTitle.includes("broadband")
    ) {
      category = "Networking";
    }

    // Determine Image based on keywords
    let image = "/images/digital_network.png"; // Default fallback
    
    if (
      lowercaseSlug.includes("cybersecurity") || 
      lowercaseSlug.includes("security") || 
      lowercaseSlug.includes("vpn") || 
      lowercaseSlug.includes("password")
    ) {
      image = "/images/cyber_security.png";
    } else if (
      lowercaseSlug.includes("lighting") || 
      lowercaseSlug.includes("tv") || 
      lowercaseSlug.includes("smart-home") || 
      lowercaseSlug.includes("hub")
    ) {
      image = "/images/smart_home.png";
    } else if (lowercaseSlug.includes("5g")) {
      image = "/images/five_g_network.png";
    } else if (lowercaseSlug.includes("fiber")) {
      image = "/images/fiber_optics.png";
    } else if (
      lowercaseSlug.includes("remote") || 
      lowercaseSlug.includes("work") || 
      lowercaseSlug.includes("accessory") || 
      lowercaseSlug.includes("monitor") || 
      lowercaseSlug.includes("office") || 
      lowercaseSlug.includes("ergonomic") || 
      lowercaseSlug.includes("keyboard")
    ) {
      image = "/images/remote_work.png";
    } else if (
      lowercaseSlug.includes("router") || 
      lowercaseSlug.includes("wifi") || 
      lowercaseSlug.includes("wi-fi") || 
      lowercaseSlug.includes("mesh")
    ) {
      image = "/images/wifi_router.png";
    } else if (
      lowercaseSlug.includes("ethernet") || 
      lowercaseSlug.includes("cable") || 
      lowercaseSlug.includes("switch")
    ) {
      image = "/images/ethernet_cables.png";
    } else if (
      lowercaseSlug.includes("cloud") || 
      lowercaseSlug.includes("backup") || 
      lowercaseSlug.includes("nas")
    ) {
      image = "/images/cloud_computing.png";
    } else if (
      lowercaseSlug.includes("iot") || 
      lowercaseSlug.includes("sensor")
    ) {
      image = "/images/iot_concept.png";
    }

    // Estimate Reading Time
    const wordCount = article.content.split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 220));

    return {
      ...article,
      category,
      image,
      readingTime
    };
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

