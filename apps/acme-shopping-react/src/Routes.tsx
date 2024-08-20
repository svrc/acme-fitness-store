import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import React, {lazy, ReactNode, Suspense} from "react";
import AcmeAppBar from "./AcmeAppBar.tsx";
import {Box} from "@mui/material";
import AcmeFooter from "./AcmeFooter.tsx";

const Home = lazy(() => import('./Home.tsx'));
const Catalog = lazy(() => import('./Catalog.tsx'));
const Contact = lazy(() => import('./Contact.tsx'));

type AppLayoutProps = {
    children: ReactNode
}

function AppLayout({children}: AppLayoutProps) {
    return (<Box>
        <AcmeAppBar/>
        <Box>
            {children}
        </Box>
        <AcmeFooter/>
    </Box>);
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
            ],
        },
    ]);

    return (<RouterProvider router={router} fallbackElement={<div>Unknown Route</div>}>
        </RouterProvider>
    );
}

