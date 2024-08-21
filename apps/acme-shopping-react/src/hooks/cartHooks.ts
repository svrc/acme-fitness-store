import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CartData, getCart, CartItemData, addItemToCart, modifyCartItem } from "../api/cartClient.ts";

export const useGetCart = (userId: string, userInfo) => {
    return useQuery<CartData, Error>({
        queryKey: ['getCart', userId],
        queryFn: () => getCart(userId),
        enabled: !!userInfo,
    });
};


export const useAddToCart = (userId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (item: CartItemData) => {
            await addItemToCart(userId, item);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getCart', userId] });
        },
        onError: (error: Error) => {
            console.error('Error adding item to cart:', error.message);
        },
    });
};

export const useDeleteCartItem = (userId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (item: CartItemData) => {
            await modifyCartItem(userId, item);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getCart', userId] });
        },
        onError: (error: Error) => {
            console.error('Error deleting or modifying cart item:', error.message);
        },
    });
};