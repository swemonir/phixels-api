export type TProduct = {
  name: string;
  description: string;
  features: string[];
  pricing: number;
  demoLink?: string;
  images: string[];
  category: string;
  isDeleted?: boolean;
};
