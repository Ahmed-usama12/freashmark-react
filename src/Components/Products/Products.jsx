import React, { useContext, useEffect, useState } from "react";
import Style from "./Products.module.css";
import axios from "axios";
import { useQuery } from "react-query";
import { BallTriangle } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";


export default function Products() {
    let { AddToCart } = useContext(CartContext);

    async function addProductToCart(id) {
        let response = await AddToCart(id);
        if (response.data.status === 'success') {
            toast.success('product is successfully added',{
                duration: 3000,
                position: 'top-right',
                style:{backgroundColor:'teal'}
            });
        } 
        else {
            toast.error('error adding product')
        }
        console.log(response);
    }


    function getFeaturedProducts() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    }

    let { isError, isLoading, isFetching, data } = useQuery('featuredProduct', getFeaturedProducts, {
        // cacheTime: 3000
    });



    return <>
        {isLoading ? <div className="w-100 py-5 d-flex justify-content-center">
            ;<BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#4fa94d"
                ariaLabel="ball-triangle-loading"
                wrapperClass={{}}
                wrapperStyle=""
                visible={true}
            />
        </div> : <div className="container py-2">

            <div className="searchin w-75 mx-auto">
                <input type="text" className="form-control py-2 " />
            </div>

            <div className="row">
                {data?.data.data.map((product) => <div key={product.id} className="col-md-3">
                    <div className="product cursor-pointer py-3 px-2">
                        <Link to={`/productdetails/${product.id}`}>
                            <img src={product.imageCover} alt={product.title} className="w-100" />
                            <span className="text-main font-sm fw-bolder">{product.category.name}</span>
                            <h3 className="h6">{product.title.split(" ").slice(0, 2).join(' ')}</h3>

                            <div className="d-flex justify-content-between mt-3">
                                <span>{product.price}EGP</span>

                                <span><i className="fas fa-star rating-color"></i> {product.ratingsAverage}</span>
                            </div>
                            <div><Link to={'/wishlist'}><i className="fa-solid fa-heart p-3 "></i></Link></div>
                        </Link>
                        <button onClick={() => addProductToCart(product.id)} className="btn bg-main text-white w-100 btn-sm mt-2">add to cart</button>
                    </div>
                </div>)}
            </div>
        </div>}



    </>
}

