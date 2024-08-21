import React, { useState } from 'react';
import {
    Container,
    Grid,
    TextField,
    Select,
    MenuItem,
    Button,
    Typography,
    Box,
    FormControl,
    InputLabel,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import StateSelect from "./StateSelect.tsx";
import AddressForm from "./AddressForm.tsx";
import OrderSummary from "./OrderSummary.tsx";

export default function Checkout() {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        company: '',
        street: '',
        city: '',
        zip: '',
        state: 'CA',
        country: 'USA',
        phone: '',
        email: '',
    });

    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | { value: unknown }>) => {
        const { name, value } = event.target as HTMLInputElement;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // navigate('/checkout/delivery', { state: formData });
        console.log(formData);
    };

    return (
        <Container>
            <Box mt={5}>
                <Typography variant="h4" align="center">
                    Checkout - Address
                </Typography>
            </Box>

            <Box mt={3}>
                <AddressForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit}/>
            </Box>
        </Container>
    );
}