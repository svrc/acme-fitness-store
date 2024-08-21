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

export const addItemToCart = async (userId: string, item: CartItemData): Promise<void> => {
  await axios.post(`/cart/item/add/${userId}`, item, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const modifyCartItem = async (userId: string, itemData: CartItemData): Promise<void> => {
  try {
    const response = await axios.post(`/cart/item/modify/${userId}`, itemData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      throw new Error('Failed to modify cart item');
    }

  } catch (error) {
    throw error;
  }
};