import React from "react";
import {useParams} from "react-router-dom";
import {useGetProduct} from "./hooks/catalogHooks.ts";
import {Card, CardActionArea, Divider, Stack, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import Markdown from "marked-react";

export default function ProductDetails() {

    const {productId} = useParams() as { productId: string };

    const {data, error, isLoading} = useGetProduct(productId);
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data</div>;

    const product = data.data;

    return (
        <Stack alignItems='center'>
            <Stack alignItems='center' spacing={5} sx={{my: '5rem'}}>
                <h2>{product.name}</h2>
                <Typography align='center'>{product.shortDescription}</Typography>
                <Divider sx={{width: "50%"}}/>
                <Stack direction='row' spacing={4} alignItems='center'>
                    <img src={product.imageUrl1} width="350px" alt={`image-${product.name}`}></img>
                    <Stack alignItems='center' spacing={2}>
                        <Typography>Available Now</Typography>
                        <Typography>{`USD ${product.price}`}</Typography>
                        <Stack direction='row' spacing={1}>
                            <Button variant='outlined' color='inherit' startIcon={<ShoppingCartIcon/>}>Add to
                                Cart</Button>
                            <Button variant='outlined' color='inherit'>
                                <FavoriteIcon/>
                            </Button>
                        </Stack>
                        <Divider sx={{width: "100%"}}/>
                        <Stack direction='row' spacing={2}>
                            <Card elevation={0}>
                                <CardActionArea href={product.imageUrl1} alt={`image1-${product.name}`}>
                                    <img src={product.imageUrl1} width="100px" alt={`image-${product.name}`}></img>
                                </CardActionArea>
                            </Card>
                            <Card elevation={0}>
                                <CardActionArea href={product.imageUrl2} alt={`image1-${product.name}`}>
                                    <img src={product.imageUrl2} width="100px" alt={`image-${product.name}`}></img>
                                </CardActionArea>
                            </Card>
                            <Card elevation={0}>
                                <CardActionArea href={product.imageUrl3} alt={`image1-${product.name}`}>
                                    <img src={product.imageUrl3} width="100px" alt={`image-${product.name}`}></img>
                                </CardActionArea>
                            </Card>
                        </Stack>
                    </Stack>
                </Stack>
                <Divider sx={{width: "50%"}}/>
            </Stack>
            <Stack alignItems='left' sx={{mx: '25rem'}}>
                <Typography variant='h3'>Product details</Typography>
                <Markdown>{product.description}</Markdown>
            </Stack>
        </Stack>
    )
}
