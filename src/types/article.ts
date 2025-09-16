export interface Article {
  id: number;
  title: string;
  url: string;
  image_url: string;
  summary: string;
  published_at: string;
  updated_at: string;
  featured: boolean;
  launches: any[];
  events: any[];
}

export interface CreateArticleData {
  title: string;
  summary: string;
  image_url?: string;
}