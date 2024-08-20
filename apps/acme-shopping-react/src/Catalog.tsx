import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Stack, Typography } from "@mui/material";
import { fetchProducts, Product } from './api/productClient';
import Bike from './assets/img.png';  // Fallback image or placeholder

export default function Home() {
    const [catalog, setCatalog] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const products = await fetchProducts();
                setCatalog(products);
                console.log(products);
            } catch (error) {
                setError('Failed to load products');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleProductClick = (id: string) => {
        navigate(`/products/${id}`);
    };

    return (
        <Stack alignItems='center'>
            <h2>Products</h2>
            <h5>Best in Class Products to keep you fit</h5>

            <Grid container spacing={3} sx={{width: "75%"}}>
                {catalog.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Paper>
                            <Stack alignItems='center' spacing={2}>
                                <img src={item.imageUrl1} width="200px"></img>
                                <Typography>{item.name}</Typography>
                                <Typography>{`USD ${item.price}`}</Typography>
                            </Stack>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
}