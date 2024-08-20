import React from "react";
import Slider from 'react-slick';
import Bike from './assets/img.png';
import Container from "@mui/material/Container";

export default function CatalogCarousel() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };
    return (
        <Container sx={{py: "10px"}}>
            <Slider {...settings}>
                <img src={Bike} alt="payment-options"/>
                <img src={Bike} alt="payment-options"/>
                <img src={Bike} alt="payment-options"/>
                <img src={Bike} alt="payment-options"/>
                <img src={Bike} alt="payment-options"/>
                <img src={Bike} alt="payment-options"/>
                <img src={Bike} alt="payment-options"/>
            </Slider>
        </Container>
    );
}
