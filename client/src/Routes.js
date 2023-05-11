import {
    ABOUT_ROUTE,
    CATALOG_ROUTE,
    HOME_ROUTE,
    LOGIN_ROUTE,
    ORDERS_ADMIN,
    PRODUCTS_ADMIN,
    REGISTRATION_ROUTE
} from "./utils/consts";
import ProductAdmin from "./Pages/ProductAdmin";
import OrderAdmin from "./Pages/OrderAdmin";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Catalog from "./Pages/Catalog";
import Auth from "./Pages/Auth";


export const authRoutes = [
    {
        path: PRODUCTS_ADMIN,
        Element: ProductAdmin
    },
    {
        path: ORDERS_ADMIN,
        Element: OrderAdmin
    },
]

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Element: Home
    },
    {
        path: ABOUT_ROUTE,
        Element: About
    },
    {
        path: CATALOG_ROUTE,
        Element: Catalog
    },
    {
        path: LOGIN_ROUTE,
        Element: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Element: Auth
    },

]