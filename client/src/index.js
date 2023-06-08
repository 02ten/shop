import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from "./stores/userStore";
import CategoriesStore from "./stores/categoriesStore";
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap';
import OrdersStore from "./stores/ordersStore";
import ProductsStore from "./stores/productsStore";
import CartStore from "./stores/cartStore";
export const Context = createContext(null)
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Context.Provider value={{
            user: new UserStore(),
            categories: new CategoriesStore(),
            orders: new OrdersStore(),
            products: new ProductsStore(),
            cart: new CartStore(),
        }}>
            <App />
        </Context.Provider>
    </React.StrictMode>
);

