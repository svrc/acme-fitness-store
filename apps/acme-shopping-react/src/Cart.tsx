import React from 'react';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {CartData, CartItemData} from "./CartService.ts";
import {Link, Stack, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import {NavLink} from "react-router-dom";

export default function Cart() {

    // TODO: hook upto API ============
    const tempCart: CartData = {
        cart: [
            {
                itemid: "42ca484d-1e2a-4a3c-bc65-556df7d8f3cd",
                name: "Blaze X1",
                price: "799.99",
                quantity: 1,
                shortDescription: "Blaze X1 is a high-performance road bike that offers superior speed and agility, making it perfect for competitive racing or fast-paced group rides. The bike features a lightweight carbon frame, aerodynamic tube shapes, a 12-speed Shimano Ultegra drivetrain, and hydraulic disc brakes for precise stopping power. With its sleek design and cutting-edge technology, Blaze X1 is a bike that is built to perform and dominate on any road."
            },
            {
                itemid: "cd546ace-f14f-4222-9381-50afd13ce33b",
                name: "Celerity X5",
                price: "399.99",
                quantity: 1,
                shortDescription: "Celerity X5 is a versatile and reliable road bike that is designed for experienced and amateur riders alike. It's designed to provide smooth and comfortable rides over long distances. With an ultra-lightweight and responsive carbon fiber frame, Shimano 105 groupset, hydraulic disc brakes, and 28mm wide tires, this bike ensures efficient power transfer, precise handling, and superior stopping power."
            }
        ],
        userid: 'foobar'
    }

    const total = tempCart.cart.reduce((acc, curr) => acc + (curr.quantity * curr.price), 0);
    // =====================

    const columns: GridColDef[] = [
        {
            field: 'productImage',
            headerName: 'Product',
            resizable: false,
            sortable: false,
            width: 150,
            renderCell: (params) => {
                const row = params.row as CartItemData;
                return (<NavLink to={`/product/${row.itemid}`}>
                    <img
                        src='/static/images/new_bikes_3.jpg'
                        alt="Product"
                        style={{width: '50px', height: '50px', objectFit: 'cover'}}
                    />
                </NavLink>);
            },
        },
        {field: 'name', headerName: 'Product Name', resizable: false, width: 250, renderCell: (params) => {
                const row = params.row as CartItemData;
                return <Link href={`/product/${row.itemid}`} color='inherit'>{row.name}</Link>
            }},
        {field: 'quantity', headerName: 'Quantity', resizable: false, width: 120},
        {field: 'price', headerName: 'Unit Price', resizable: false, width: 120},
        {field: 'discount', headerName: 'Discount', resizable: false, width: 120},
        {
            field: 'total',
            headerName: 'Total',
            resizable: false,
            width: 100,
            sortable: false,
            renderCell: (params) => {
                const row = params.row as CartItemData;
                const total = row.price * row.quantity;
                return `$${total.toFixed(2)}`;
            }
        },
        {
            field: 'delete', headerName: '', resizable: false, width: 100, sortable: false, align: 'center', renderCell: (params) => {
                return <IconButton color='inherit' onClick={removeItemFromCart}>
                    <DeleteIcon/>
                </IconButton>
            }
        },
    ];

    return (
        <Stack alignItems='center' sx={{height: 400, width: '100%', my: '2rem'}} spacing={3}>
            <Typography variant='h3'>Your Shopping cart awaits!</Typography>
            <Typography>You currently have {tempCart.cart.length} item(s) in your cart</Typography>
            <DataGrid
                sx={{ '& .MuiDataGrid-columnSeparator': { display: 'none' } }}
                rows={tempCart.cart}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                getRowId={getRowId}
                rowSelection={false}
                disableColumnMenu
                disableColumnFilter
                disableColumnSelector
                slots={{
                    footer: CustomTotalFooter
                }}
            />
        </Stack>
    );

    function getRowId(row) {
        return row.itemid;
    }

    function removeItemFromCart() {
        // TODO
    }

    function CustomTotalFooter(props) {
        return (
            <Stack direction='row' sx={{p: 1}} justifyContent='space-between'>
                <Typography>Total</Typography>
                <Typography sx={{pr: '8rem'}}>${total}</Typography>
            </Stack>
        );
    }
}
