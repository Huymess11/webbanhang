import HomePage from "../pages/HomePage/HomePage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductPage from "../pages/ProductPage/ProductPage";

export const routes = [
    {
        path:'/',
        page:HomePage,
        header: true
    },
    {
        path:'/order',
        page:OrderPage,
        header: true
    },
    {
        path:'/product',
        page:ProductPage,
        header: true
    }
]