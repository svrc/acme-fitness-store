import axios from 'axios';

export interface CartItemData {
    itemid: string;
    name: string;
    price: string;
    quantity: number;
    shortDescription: string;
}

export interface CartData {
    cart: CartItemData[];
    userid: string;
}

export const getCart = async (userId: string): Promise<CartData> => {
    const response = await axios.get<CartData>(`/cart/items/${userId}`);
    return response.data;
};
