import HomePage from "../pages/HomePage/HomePage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import UserInforPage from "../pages/UserInfor/UserInforPage";

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
    },
    {
        path:'/:type',
        page:TypeProductPage,
        header: true
    },
    {
        path:'/signin',
        page:SignInPage,
        header: false
    },
    {
        path:'/signup',
        page:SignUpPage,
        header: false
    },
    {
        path:'/productdetail',
        page:ProductDetailPage,
        header: true
    },
    {
        path:'/userinfor',
        page:UserInforPage,
        header: true
    },
]