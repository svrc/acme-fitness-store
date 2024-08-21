import React from 'react';
import { useGetCart } from './api/cartClient'; // Assuming you have a custom hook for fetching the cart data

interface OrderSummaryProps {
    userId: string;
}

export default function OrderSummary({ userId }: OrderSummaryProps){
    const { data: cartData, isLoading, error } = useGetCart(userId);

    if (isLoading) {
        return <div>Loading cart...</div>;
    }

    if (error) {
        return <div>Error loading cart items.</div>;
    }

    const cartItems = cartData?.cart ?? [];
    const total = cartItems.reduce((acc, curr) => acc + (curr.quantity * parseFloat(curr.price)), 0);

    return (
        <div className="col-lg-3">
            <div id="order-summary" className="box">
                <div className="box-header">
                    <h3>Order summary</h3>
                </div>
                <p className="text-muted">Shipping and additional costs may vary</p>
                <div className="table-responsive">
                    <table className="table">
                        <tbody>
                        <tr>
                            <td>Order subtotal</td>
                            <th id="orderSubtotal">${total.toFixed(2)}</th>
                        </tr>
                        <tr>
                            <td>Shipping and handling</td>
                            <th>Free</th>
                        </tr>
                        <tr>
                            <td>Tax</td>
                            <th>$0.00</th>
                        </tr>
                        <tr className="total">
                            <td>Total</td>
                            <th id="orderTotal">${total.toFixed(2)}</th>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
