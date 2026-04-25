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

// Combine all 25 articles
export const articles: Article[] = [
  ...articlesPart1, 
  ...articlesPart2, 
  ...articlesPart3, 
  ...articlesPart4, 
  ...articlesPart5
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by newest first
