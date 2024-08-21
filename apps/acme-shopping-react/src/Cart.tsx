import { useState } from 'react';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { CartItemData } from "./api/cartClient";
import { Link, Stack, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import { NavLink } from "react-router-dom";
import { useDeleteCartItem, useGetCart } from './hooks/cartHooks';
import { useGetUserInfo } from './hooks/userHooks';

export default function Cart() {
    const { data: userInfo, isLoading: isUserInfoLoading } = useGetUserInfo();
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        pageSize: 5,
        page: 0,
    });

    if (isUserInfoLoading || !userInfo) {
        return <div>Loading user information...</div>;
    }

    const { data: cartData, isLoading, error } = useGetCart(userInfo.userId);
    const deleteCartItemMutation = useDeleteCartItem(userInfo.userId);

    if (isLoading) {
        return <div>Loading cart...</div>;
    }

    if (error) {
        return <div>Error loading cart items.</div>;
    }

    const cartItems = cartData?.cart ?? [];
    const total = cartItems.reduce((acc, curr) => acc + (curr.quantity * parseFloat(curr.price)), 0);

    const columns: GridColDef[] = [
        {
            field: 'productImage',
            headerName: 'Product',
            resizable: false,
            sortable: false,
            width: 150,
            renderCell: (params) => {
                const row = params.row as CartItemData;
                return (
                    <NavLink to={`/product/${row.itemid}`}>
                        <img
                            src='/static/images/new_bikes_3.jpg'
                            alt="Product"
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        />
                    </NavLink>
                );
            },
        },
        {
            field: 'name',
            headerName: 'Product Name',
            resizable: false,
            width: 250,
            renderCell: (params) => {
                const row = params.row as CartItemData;
                return <Link href={`/product/${row.itemid}`} color='inherit'>{row.name}</Link>
            }
        },
        { field: 'quantity', headerName: 'Quantity', resizable: false, width: 120 },
        { field: 'price', headerName: 'Unit Price', resizable: false, width: 120 },
        { field: 'discount', headerName: 'Discount', resizable: false, width: 120 },
        {
            field: 'total',
            headerName: 'Total',
            resizable: false,
            width: 100,
            sortable: false,
            renderCell: (params) => {
                const row = params.row as CartItemData;
                const total = parseFloat(row.price) * row.quantity;
                return `$${total.toFixed(2)}`;
            }
        },
        {
            field: 'delete',
            headerName: '',
            resizable: false,
            width: 100,
            sortable: false,
            align: 'center',
            renderCell: (params) => {
                return <IconButton color='inherit' onClick={() => removeItemFromCart(params.row as CartItemData)}>
                    <DeleteIcon />
                </IconButton>
            }
        },
    ];

    function getRowId(row: { itemid: string; }) {
        return row.itemid;
    }

    function removeItemFromCart(item: CartItemData) {
        deleteCartItemMutation.mutate({
            itemid: item.itemid, quantity: 0,
            name: item.name,
            price: item.price,
            shortDescription: ''
        });
    }

    function CustomTotalFooter() {
        return (
            <Stack direction='row' sx={{ p: 1 }} justifyContent='space-between'>
                <Typography>Total</Typography>
                <Typography sx={{ pr: '8rem' }}>${total.toFixed(2)}</Typography>
            </Stack>
        );
    }

    return (
        <Stack alignItems='center' sx={{ width: '100%', my: '2rem' }} spacing={3}>
            <Typography variant='h3'>Your Shopping cart awaits!</Typography>
            {cartItems.length > 0 ? (
                <>
                    <Typography>You currently have {cartItems.length} item(s) in your cart</Typography>
                    <DataGrid
                        sx={{ '& .MuiDataGrid-columnSeparator': { display: 'none' } }}
                        rows={cartItems}
                        columns={columns}
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                        getRowId={getRowId}
                        rowSelection={false}
                        disableColumnMenu
                        disableColumnFilter
                        disableColumnSelector
                        slots={{
                            footer: CustomTotalFooter
                        }}
                    />
                </>
            ) : (
                <Typography>Your cart is empty.</Typography>
            )}
        </Stack>
    );
}