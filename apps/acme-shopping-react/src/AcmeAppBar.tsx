import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Logo from './assets/logo.png';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Stack } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AssistIcon from '@mui/icons-material/TipsAndUpdates';
import UserIcon from '@mui/icons-material/AccountCircle';


const pages = [
    { name: 'Home', navigateTo: '/' },
    { name: 'Catalog', navigateTo: 'catalog' },
    { name: 'Contact', navigateTo: 'contact' }
];

interface AcmeAppBarProps {
    handleLogin: () => void;
    handleLogout: () => void;
}

export default function AcmeAppBar({ handleLogin, handleLogout }: AcmeAppBarProps) {
    const navigate = useNavigate();

    let itemsInCart = 0;

    const handleClick = () => {
        navigate('/cart');
    }



    return (
        <>
            <AppBar position="static" color="inherit">
                <Container maxWidth="xl">
                    <Stack direction='row' alignItems='center' justifyContent='space-between' spacing={10}>
                        <Stack direction='row'>
                            <IconButton component={RouterLink} to={'/'} disableRipple>
                                <img src={Logo} alt="acme-logo" />
                            </IconButton>
                            {pages.map((page) => (
                                <Button sx={{ color: 'secondary.contrastText' }}
                                    key={page.name}
                                    component={RouterLink} to={page.navigateTo}>
                                    {page.name}
                                </Button>
                            ))}
                        </Stack>
                        <Stack direction='row' alignContent='right' spacing={4}>
                            <IconButton onClick={handleLogin} color='inherit'>
                                <UserIcon />
                            </IconButton>
                            <Button variant='outlined' color='inherit' onClick={handleClick} startIcon={<ShoppingCartIcon />}>{itemsInCart} items in Cart</Button>
                            <Button variant='outlined' color='inherit' startIcon={<AssistIcon />}>Ask FitAssist</Button>
                        </Stack>
                    </Stack>
                </Container>
            </AppBar>
        </>
    );
}
