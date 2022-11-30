export interface Product {
  id?: string;
  name: string;
  description: string;
  richDescription: string;
  brand?: string;
  price: number;
  category: string;
  countInStock: number;
  rating?: number;
  numReviews?: number;
  isFeatured: boolean;
  images: any;
}
