import React, { useContext, useEffect, useState } from "react";
import Style from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import { BallTriangle } from "react-loader-spinner";
import { Link } from "react-router-dom";

export default function Cart() {

    let { getLoggedUserCart, removeCartItem, updateProductQuantity } = useContext(CartContext);
    const [cartDetails, setCartDetails] = useState(null);

    async function getCart() {
        let { data } = await getLoggedUserCart();
        console.log(data);
        setCartDetails(data);
    }

    async function removeItem(id) {
        let { data } = await removeCartItem(id);
        setCartDetails(data);
    }

    async function updateCart(id, count) {
        let { data } = await updateProductQuantity(id, count);
        setCartDetails(data);

    }


    useEffect(() => {
        getCart();
    }, [])
    return <>
        {cartDetails ? <div className="w-75 my-3 mx-auto p-3 bg-main-light">
            <h3>Shopping Cart</h3>
            <h4 className="h6 text-main">Cart Items : {cartDetails.numOfCartItems} </h4>
            <h4 className="h6 text-main">Total Cart Price : {cartDetails.data.totalCartPrice} EGP</h4>

            {cartDetails.data.products.map((product) => <div key={product.product.id} className="row border-bottom py-2 px-2">
                <div className="col-md-1">
                    <img src={product.product.imageCover} alt="" className="w-100" />
                </div>
                <div className="col-md-11">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h3 className="h6 ">{product.product.title.split(' ').slice(0, 3).join(' ')}</h3>
                            <h6 className="text-main">Price : {product.price} EGP</h6>
                        </div>

                        <div>
                            <button onClick={() => updateCart(product.product.id, product.count + 1)} className="btn brdr-main p-2">+</button>
                            <span className="mx-2"> {product.count}</span>
                            <button onClick={() => updateCart(product.product.id, product.count - 1)} className="btn brdr-main p-2">-</button>
                        </div>

                    </div>
                    <button onClick={() => removeItem(product.product.id)} className="btn p-0"><i className="text-danger font-sm fas fa-trash-can"></i> Remove</button>
                </div>
            </div>)}

            <Link to={'/address'} className="btn bg-main w-25 m-2 text-white">Online Payment</Link>
            <button className="btn bg-main w-25 m-2 text-white">Cash on Delivrey</button>

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