import { articles, type Article } from "@/data/articles";

export function getAllArticles() {
  return articles;
}

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getPublishedArticles() {
  return articles.filter((article) => article.status === "published");
}

export function shouldNoIndexArticle(article: Article) {
  return article.status !== "published";
}

export function getArticlesByRelatedSoftware(softwareId: string) {
  return articles.filter((article) => article.relatedSoftwareIds.includes(softwareId));
}