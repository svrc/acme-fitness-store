import React from "react";
import Bike from './assets/img.png';
import {Grid, Paper, Stack, Typography} from "@mui/material";

export default function Home() {

    const catalog = [
        {name: "Foobar", image: Bike, price: 599},
        {name: "Foobar", image: Bike, price: 599},
        {name: "Foobar", image: Bike, price: 599},
        {name: "Foobar", image: Bike, price: 599},
        {name: "Foobar", image: Bike, price: 599},
        {name: "Foobar", image: Bike, price: 599},
        {name: "Foobar", image: Bike, price: 599},
        {name: "Foobar", image: Bike, price: 599},
        {name: "Foobar", image: Bike, price: 599},
        {name: "Foobar", image: Bike, price: 599},
        {name: "Foobar", image: Bike, price: 599},
        {name: "Foobar", image: Bike, price: 599},
        {name: "Foobar", image: Bike, price: 599},
        {name: "Foobar", image: Bike, price: 599},
        {name: "Foobar", image: Bike, price: 599},
        {name: "Foobar", image: Bike, price: 599},
        {name: "Foobar", image: Bike, price: 599},
        {name: "Foobar", image: Bike, price: 599},
        {name: "Foobar", image: Bike, price: 599},
        {name: "Foobar", image: Bike, price: 599},
        {name: "Foobar", image: Bike, price: 599},
        {name: "Foobar", image: Bike, price: 599},
    ]
    return (
        <Stack alignItems='center'>
            <h2>Products</h2>
            <h5>Best in Class Products to keep you fit</h5>

            <Grid container spacing={3} sx={{width: "75%"}}>
                {catalog.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Paper>
                            <Stack alignItems='center' spacing={2}>
                                <img src={item.image} width="200px"></img>
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
