export interface Product {
  id_producto: number;
  title: string;
  description: string;
  images: string[];
  inStock: number;        // cantidad disponible
  price: number;          // precio
  slug: string;           // nombre + id (kebab-case)
  tags: string[];         // palabras clave
  isActive: boolean;      // activo o no
  category: Category;     // categoría principal
  subcategory?: Subcategory; // subcategoría opcional
  brand?: string;         // marca opcional
  specs?: Record<string, string | number | boolean>; // atributos técnicos
}

export type Category =
  | 'technology'
  | 'appliances'
  | 'home'
  | 'fashion'
  | 'beauty'
  | 'sports'
  | 'toys'
  | 'groceries'
  | 'automotive'
  | 'office';

export type Subcategory =
  | 'smart-home'
  | 'security-cameras'
  | 'smart-plugs'
  | 'smart-lighting'
  | 'smart-speakers'
  | 'audio'
  | 'computers'
  | 'phones'
  | 'accessories';
