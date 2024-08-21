import React from 'react';
import {
    Grid,
    TextField,
    Select,
    MenuItem,
    Button,
    Box,
    FormControl,
    InputLabel,
} from '@mui/material';
import { Link } from 'react-router-dom';
import StateSelect from "./StateSelect";

interface AddressFormProps {
    formData: {
        firstname: string;
        lastname: string;
        company: string;
        street: string;
        city: string;
        zip: string;
        state: string;
        country: string;
        phone: string;
        email: string;
    };
    handleChange: (event: React.ChangeEvent<HTMLInputElement | { value: unknown }>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function AddressForm({ formData, handleChange, handleSubmit } : AddressFormProps){
    return (
        <form id="addressInfo" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="firstname"
                        name="firstname"
                        label="First Name"
                        fullWidth
                        value={formData.firstname}
                        onChange={handleChange}
                        required
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#ccc' },
                                '&:hover fieldset': { borderColor: '#000' },
                                '&.Mui-focused fieldset': { borderColor: '#000' },
                            },
                            '& .MuiInputLabel-root.Mui-focused': { color: '#000' },
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="lastname"
                        name="lastname"
                        label="Last Name"
                        fullWidth
                        value={formData.lastname}
                        onChange={handleChange}
                        required
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#ccc' },
                                '&:hover fieldset': { borderColor: '#000' },
                                '&.Mui-focused fieldset': { borderColor: '#000' },
                            },
                            '& .MuiInputLabel-root.Mui-focused': { color: '#000' },
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="company"
                        name="company"
                        label="Company"
                        fullWidth
                        value={formData.company}
                        onChange={handleChange}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#ccc' },
                                '&:hover fieldset': { borderColor: '#000' },
                                '&.Mui-focused fieldset': { borderColor: '#000' },
                            },
                            '& .MuiInputLabel-root.Mui-focused': { color: '#000' },
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="street"
                        name="street"
                        label="Street"
                        fullWidth
                        value={formData.street}
                        onChange={handleChange}
                        required
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#ccc' },
                                '&:hover fieldset': { borderColor: '#000' },
                                '&.Mui-focused fieldset': { borderColor: '#000' },
                            },
                            '& .MuiInputLabel-root.Mui-focused': { color: '#000' },
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="city"
                        name="city"
                        label="City"
                        fullWidth
                        value={formData.city}
                        onChange={handleChange}
                        required
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#ccc' },
                                '&:hover fieldset': { borderColor: '#000' },
                                '&.Mui-focused fieldset': { borderColor: '#000' },
                            },
                            '& .MuiInputLabel-root.Mui-focused': { color: '#000' },
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        id="zip"
                        name="zip"
                        label="ZIP"
                        fullWidth
                        value={formData.zip}
                        onChange={handleChange}
                        required
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#ccc' },
                                '&:hover fieldset': { borderColor: '#000' },
                                '&.Mui-focused fieldset': { borderColor: '#000' },
                            },
                            '& .MuiInputLabel-root.Mui-focused': { color: '#000' },
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <FormControl fullWidth required>
                        <InputLabel id="state-label" sx={{ color: 'black' }}>
                            State
                        </InputLabel>
                        <StateSelect  onChange={handleChange}/>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="phone"
                        name="phone"
                        label="Telephone"
                        fullWidth
                        value={formData.phone}
                        onChange={handleChange}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#ccc' },
                                '&:hover fieldset': { borderColor: '#000' },
                                '&.Mui-focused fieldset': { borderColor: '#000' },
                            },
                            '& .MuiInputLabel-root.Mui-focused': { color: '#000' },
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="email"
                        name="email"
                        label="Email"
                        fullWidth
                        value={formData.email}
                        onChange={handleChange}
                        required
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#ccc' },
                                '&:hover fieldset': { borderColor: '#000' },
                                '&.Mui-focused fieldset': { borderColor: '#000' },
                            },
                            '& .MuiInputLabel-root.Mui-focused': { color: '#000' },
                        }}
                    />
                </Grid>
            </Grid>
            <Box mt={3} display="flex" justifyContent="space-between">
                <Button component={Link} to="/cart" variant="outlined">
                    Back to Cart
                </Button>
                <Button type="submit" variant="contained" color="primary">
                    Continue to Delivery Method
                </Button>
            </Box>
        </form>
    );
};

