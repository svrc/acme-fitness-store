import React from "react";
import {Card, CardActionArea, Grid, Stack, Typography} from "@mui/material";
import {useGetProducts} from "./hooks/ProductHooks.ts";
import {Link as RouterLink} from "react-router-dom";

export default function Catalog() {

    const { data, error, isLoading } = useGetProducts();
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data</div>;

    return (
        <Stack alignItems='center'>
            <h2>Products</h2>
            <h5>Best in Class Products to keep you fit</h5>

            <Grid container spacing={3} sx={{width: "75%"}}>
                {data.data.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Card>
                            <CardActionArea sx={{height: "300px", p:"20px"}} component={RouterLink} to={`/product/${item.id}`}>
                                <Stack alignItems='center' spacing={2}>
                                    <img src={item.imageUrl1} width="160px" alt={`image-${item.name}`}></img>
                                    <Typography align='center'>{item.name}</Typography>
                                    <Typography>{`USD ${item.price}`}</Typography>
                                </Stack>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
}
