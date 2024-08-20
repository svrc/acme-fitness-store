import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Logo from './assets/logo.png';
import {Link as RouterLink} from 'react-router-dom';
import {Stack} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AssistIcon from '@mui/icons-material/TipsAndUpdates';
import UserIcon from '@mui/icons-material/AccountCircle';

const pages = [
    {name: 'Home', navigateTo: '/'},
    {name: 'Catalog', navigateTo: 'catalog'},
    {name: 'Contact', navigateTo: 'contact'}
];

export default function AcmeAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    let itemsInCart = 0;

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static" color="inherit">
            <Container maxWidth="xl">
                <Stack direction='row' alignItems='center' justifyContent='space-between' spacing={10}>
                    <Stack direction='row'>
                        <IconButton component={RouterLink} to={'/'} disableRipple>
                            <img src={Logo} alt="acme-logo"/>
                        </IconButton>
                        {pages.map((page) => (
                            <Button sx={{color: 'secondary.contrastText'}}
                                    key={page.name}
                                    component={RouterLink} to={page.navigateTo}>
                                {page.name}
                            </Button>
                        ))}
                    </Stack>
                    <Stack direction='row' alignContent='right' spacing={4}>
                        <IconButton variant='text' color='inherit'>
                            <UserIcon/>
                        </IconButton>
                        <Button variant='outlined' color='inherit' startIcon={<ShoppingCartIcon/>}>{itemsInCart} items in Cart</Button>
                        <Button variant='outlined' color='inherit' startIcon={<AssistIcon/>}>Ask FitAssist</Button>
                    </Stack>
                </Stack>
            </Container>
        </AppBar>
    );
}
