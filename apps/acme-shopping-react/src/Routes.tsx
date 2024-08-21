import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import React, {lazy, ReactNode, Suspense} from "react";
import AcmeAppBar from "./AcmeAppBar.tsx";
import {Box} from "@mui/material";
import AcmeFooter from "./AcmeFooter.tsx";
import ProductDetails from "./ProductDetails.tsx";
import { UserInfo, getUserInfo } from "./api/userClient.ts";
import { UserInfoContext } from "./UserInfoContext.tsx";
import Cookies from "js-cookie";

const Home = lazy(() => import('./Home.tsx'));
const Catalog = lazy(() => import('./Catalog.tsx'));
const Contact = lazy(() => import('./Contact.tsx'));
const Cart = lazy(() => import('./Cart.tsx'));

type AppLayoutProps = {
    children: ReactNode
}

function AppLayout({children}: AppLayoutProps) {
    const [userInfo, setUserInfo] = React.useState<UserInfo | null>(null);

    React.useEffect(() => {
        
        const fetchUserInfo = async () => {
            const user = await getUserInfo();
            setUserInfo(user);
        };

        fetchUserInfo();
    }, []);

    const handleLogin = () => {
        if (userInfo) {
            alert(`You are already logged in as ${userInfo.userName}`);
        } else {
            Cookies.set('user_id', ''); 
            window.location.href = '/acme-login';
        }
    };

    const handleLogout = () => {
        window.location.href = '/scg-logout?redirect=/';
    };


    return (
        <UserInfoContext.Provider value={userInfo}>
            <Box>
                <AcmeAppBar handleLogin={handleLogin} handleLogout={handleLogout}/>
                <Box>
                    {children}
                </Box>
                <AcmeFooter/>
            </Box>
        </UserInfoContext.Provider>
    );
}

const mainLayout = (
    <AppLayout>
        <Suspense>
            <Outlet/>
        </Suspense>
    </AppLayout>
);

export default function AppRoutes() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: mainLayout,
            children: [
                {
                    path: "/",
                    element: <Home/>
                },
                {
                    path: "catalog",
                    element: <Catalog/>
                },
                {
                    path: "contact",
                    element: <Contact/>
                },
                {
                    path: "product/:productId",
                    element: <ProductDetails/>
                },
                {
                    path: "cart",
                    element: <Cart/>
                },
            ],
        },
    ]);

    return (<RouterProvider router={router} fallbackElement={<div>Unknown Route</div>}>
        </RouterProvider>
    );
}

