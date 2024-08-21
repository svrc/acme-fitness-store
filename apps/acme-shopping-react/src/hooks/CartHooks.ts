import {useQuery} from '@tanstack/react-query';
import {CartData, getCart} from "../CartService.ts";

export const useGetCart = (userId: string) => {
    return useQuery<CartData, Error>({
        queryKey: ['getCart', userId],
        queryFn: () => getCart(userId),
    });
};
