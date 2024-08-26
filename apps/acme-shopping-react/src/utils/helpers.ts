import {CartItem} from "../types/Order.ts";

export default function constructOrder(
    cartItems: CartItem[],
    total: number,
    addressData: any,
    deliveryMethod: string,
    paymentData: any,
    userId: string
) {

    const cart = cartItems.map(item => ({
        id: item.itemid,
        description: item.name,
        quantity: item.quantity,
        price: item.price.toString(),
    }));


    const address = {
        street: addressData.street,
        city: addressData.city,
        zip: addressData.zipCode,
        state: addressData.state,
        country: addressData.country,
    };


    const card = {
        type: paymentData.cardType,
        number: paymentData.cardNumber,
        ccv: paymentData.ccv,
        expMonth: paymentData.expMonth,
        expYear: paymentData.expYear,
    };


    const order = {
        userId: userId,
        cart: cart,
        total: total.toString(),
        address: address,
        delivery: deliveryMethod,
        card: card,
        firstname: addressData.firstname,
        lastname: addressData.lastname,
        email: addressData.email
    };

    return order;
}
