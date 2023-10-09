import axios from 'axios';
import { useState } from 'react';
import { createContext, useEffect } from 'react';
export let CartContext = createContext();

let headers = {
    token: localStorage.getItem('userToken')
}

function AddToCart(id) {

    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
        {
            //Body
            productId: id
        },
        {
            //Headers
            // headers:headers 
            headers
        }).then((respons) => respons)
        .catch((error) => error)
}

function getLoggedUserCart() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers
    }).then((response) => response)
        .catch((err) => err)
}

function removeCartItem(productId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers }).then((response) => response).catch((error) => error)
}
function updateProductQuantity(productId, count) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count }
        , { headers }).
        then((response) => response)
        .catch((error) => error)
}
function onlinePaymet(cartId, url, values) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        { shippingAddress: values }
        , { headers }).
        then((response) => response)
        .catch((error) => error)
}


export default function CartContextProvider(props) {
    const [cartId, setCartId] = useState(null)
    async function getCart() {
        let { data } = await getLoggedUserCart();
        setCartId(data?.data._id);
        console.log(data?.data._id);
    }
    useEffect(() => {
        getCart();
    }, [])

    return <CartContext.Provider value={{ cartId, AddToCart, getLoggedUserCart, onlinePaymet, removeCartItem, updateProductQuantity }}>
        {props.children}
    </CartContext.Provider>
}
