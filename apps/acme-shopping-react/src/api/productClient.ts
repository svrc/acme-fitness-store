export interface Product {
  id: string;
  name: string;
  imageUrl1: string;
  price: number;
}

export interface ProductDetail {
  id: string;
  name: string;
  description: string; 
  shortDescription: string; 
  price: number; 
  imageUrl1: string;
  imageUrl2: string;
  imageUrl3: string; 
  tags: string[]; 
}

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch('/products', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await response.json();
  return data.data as Product[];
};

export async function fetchProductDetails(productId: string): Promise<ProductDetail> {
  const response = await fetch(`/products/${productId}`);
  if (!response.ok) {
      throw new Error('Failed to fetch product details');
  }
  const product = await response.json();
  return product.data;
}