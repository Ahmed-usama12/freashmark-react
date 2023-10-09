import axios from "axios";
import { createContext } from "react";

export let WishListContext = createContext();

export default function WishListContextProvider(props) {

    let headers = {
        token: localStorage.getItem('userToken')
    }

    function AddToWishlist(id) {

        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
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

    function getLoggedUserWishList() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            headers
        }).then((response) => response)
            .catch((err) => err)
    }

    function removeWishItem(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
            {
                headers
            }).then((response) => response)
            .catch((error) => error)
    }

    return <WishListContext.Provider value={{ AddToWishlist, getLoggedUserWishList, removeWishItem }}>
        {props.children}
    </WishListContext.Provider>
}