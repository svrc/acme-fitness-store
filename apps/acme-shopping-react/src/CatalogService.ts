import axios from 'axios';

export interface ProductData {
    id: string;
    imageUrl1: string;
    imageUrl2: string;
    imageUrl3: string;
    name: string;
    shortDescription: string;
    description: string;
    price: number;
    tags: string[];
}

export const getProducts = async (): Promise<ProductData[]> => {
    const response = await axios.get<ProductData[]>('/products');
    return response.data;
};

export const getProduct = async (productId: string): Promise<ProductData> => {
    const response = await axios.get<ProductData>(`/products/${productId}`);
    return response.data;
};
