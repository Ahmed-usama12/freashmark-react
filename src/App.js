import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Cart from './Components/Cart/Cart';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Notfound from './Components/Notfound/Notfound';
import Products from './Components/Products/Products';
import Categories from './Components/Categories/Categories';
import Brands from './Components/Brands/Brands';

import CounterContextProvider from './Context/CounterContext';
import UserContextProvider, { UserContext } from './Context/UserContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import Productetails from './Components/Productetails/ProductDetails';
import CartContextProvider from './Context/CartContext';
import Profile from './Components/Profile/Profile';
import Address from './Components/Address/Address';
import Orders from './Components/Orders/Orders';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import WishList from './Components/WishList/WishList';
import VerifyCode from './Components/VerifyCode/VerifyCode';
import WishListContextProvider from './Context/WishlistContext';
import ResetPassword from './Components/ResetPassword/ResetPassword';

// import { useContext, useEffect } from 'react';


let routers = createHashRouter([
  {
    path: '/', element: <Layout />, children: [
      { index: true, element: <ProtectedRoute> <Home /> </ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute> <Cart /> </ProtectedRoute> },
      { path: 'login', element: <Login /> },
      { path: 'forget', element: <ForgetPassword /> },
      { path: 'verifycode', element: <VerifyCode /> },
      { path: 'resetpassword', element: <ResetPassword /> },
      { path: 'register', element: <Register /> },
      { path: 'products', element: <ProtectedRoute> <Products /> </ProtectedRoute> },
      { path: 'categories', element: <ProtectedRoute> <Categories /> </ProtectedRoute> },
      { path: 'productdetails/:id', element: <ProtectedRoute> <Productetails /> </ProtectedRoute> },
      { path: 'brands', element: <ProtectedRoute> <Brands /> </ProtectedRoute> },
      { path: 'wishlist', element: <ProtectedRoute> <WishList /> </ProtectedRoute> },
      { path: 'profile', element: <ProtectedRoute> <Profile /> </ProtectedRoute> },
      { path: 'address', element: <ProtectedRoute> <Address /> </ProtectedRoute> },
      { path: 'allorders', element: <ProtectedRoute> <Orders /> </ProtectedRoute> },

      { path: '*', element: <Notfound /> },
    ]
  }
])


function App() {


  return <CartContextProvider>
    <WishListContextProvider>
      <UserContextProvider>
        <CounterContextProvider>
          <RouterProvider router={routers}></RouterProvider>
        </CounterContextProvider>
      </UserContextProvider>
    </WishListContextProvider>
    <Toaster />
  </CartContextProvider>


}

export default App;
