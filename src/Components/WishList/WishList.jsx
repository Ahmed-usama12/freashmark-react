import React, { useContext, useEffect, useState } from "react";
import Style from "./WishList.module.css";
import { WishListContext } from "../../Context/WishlistContext";
import { BallTriangle } from "react-loader-spinner";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function WishList() {

    let { getLoggedUserWishList, removeWishItem } = useContext(WishListContext);
    let { AddToCart } = useContext(CartContext);

    const [wishDetails, setWishDetails] = useState(null);

    async function getWishlist() {
        let { data } = await getLoggedUserWishList();
        console.log(data);
        setWishDetails(data);
    }

    async function addProductToCart(id) {
        let response = await AddToCart(id);
        if (response.data.status === 'success') {
            toast.success('product is successfully added to cart', {
                duration: 3000,
                position: 'top-right',
                style: { backgroundColor: 'teal' }
            });
        }
        else {
            toast.error('error adding product to cart')
        }
        console.log(response);
    }

    async function removeItem(id) {
        let { data } = await removeWishItem(id);
        setWishDetails(data);
    }

    useEffect(() => {
        getWishlist();
    }, [])

    return <>
        {wishDetails ? <div className="w-75 my-3 mx-auto p-3 bg-main-light">
            <h3>Wish List</h3>

            {wishDetails?.data.map((product) => <div key={product.id} className="row border-bottom py-2 px-2">
                <div className="col-md-1">
                    <img src={product.imageCover} alt="" className="w-100" />
                </div>
                <div className="col-md-11">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h3 className="h6 ">{product.title.split(' ').slice(0, 3).join(' ')}</h3>
                            <h6 className="text-main">Price : {product.price} EGP</h6>
                        </div>

                        <button onClick={() => addProductToCart(product.id)} className="btn bg-main text-light"> Add to cart</button>

                    </div>
                    <button className="btn p-0"><i className="text-danger font-sm fas fa-trash-can"></i> Remove</button>
                </div>
            </div>)}

        </div> : <section id="loading" className="d-flex justify-content-center align-items-center">
            <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#4fa94d"
                ariaLabel="ball-triangle-loading"
                wrapperClass={{}}
                wrapperStyle=""
                visible={true}
            />
        </section>}


    </>
}