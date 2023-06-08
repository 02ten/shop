import {
    ABOUT_ROUTE, ADMIN_CATEGORIES_ROUTE, ADMIN_ORDERS_ROUTE, ADMIN_PRODUCTS_ROUTE, ADMIN_ROUTE, CART_ROUTE,
    CATALOG_ROUTE,
    HOME_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE
} from "./utils/consts";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Catalog from "./Pages/Catalog";
import Auth from "./Pages/Auth";
import Cart from "./Pages/Cart";
import AdminCategories from "./Pages/AdminCategories";
import AdminOrders from "./Pages/AdminOrders";
import AdminProducts from "./Pages/AdminProducts";


export const authRoutes = [

    {
        path: CART_ROUTE,
        Element: Cart
    }
]
export const adminRoutes =[
    {
        path: ADMIN_CATEGORIES_ROUTE,
        Element: AdminCategories

    },
    {
        path: ADMIN_ORDERS_ROUTE,
        Element: AdminOrders

    },
    {
        path: ADMIN_PRODUCTS_ROUTE,
        Element: AdminProducts

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
        path: CATALOG_ROUTE+':id',
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