import React, { useEffect, useState } from "react";
import Slider from 'react-slick';
import Container from "@mui/material/Container";
import { fetchProducts, Product } from './api/productClient'; 

export default function CatalogCarousel() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const settings = {
        dots: true,
        infinite: false, 
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const fetchedProducts = await fetchProducts();
                setProducts(fetchedProducts.slice(0, 15)); 
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

    return (
        <Container sx={{ py: "10px" }}>
            <Slider {...settings}>
                {products.map((product) => (
                    <div key={product.id}>
                        <img src={product.imageUrl1} alt={product.name} style={{ width: "100%" }} />
                        <p style={{ textAlign: "center", marginTop: "10px" }}>{product.name}</p>
                    </div>
                ))}
            </Slider>
        </Container>
    );
}