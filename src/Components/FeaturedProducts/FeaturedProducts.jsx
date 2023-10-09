import React, { useContext, useEffect, useState } from "react";
import Style from "./FeaturedProducts.module.css";
import axios from "axios";
import { useQuery } from "react-query";
import { BallTriangle } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishListContext } from "../../Context/WishlistContext";


export default function FeaturedProducts() {
    let { AddToCart } = useContext(CartContext);
    let { AddToWishlist } = useContext(WishListContext);

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

    async function addProductToWishlist(id) {
        let response = await AddToWishlist(id);
        if (response.data.status === 'success') {
            toast.success('product is successfully added to wish list', {
                duration: 3000,
                position: 'top-right',
                style: { backgroundColor: 'teal' }
            });
        }
        else {
            toast.error('error adding product to wish list')
        }
        console.log(response);
    }


    function getFeaturedProducts() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    }

    let { isError, isLoading, isFetching, data } = useQuery('featuredProduct', getFeaturedProducts, {
        // cacheTime: 3000
    });

    // console.log(data?.data.data);

    // const [products, setProducts] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);

    // async function getFeaturedProducts() {
    //     setIsLoading(true);
    //     let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    //     setProducts(data.data);
    //     setIsLoading(false);
    // }

    // useEffect(() => {
    //     getFeaturedProducts();
    // }, [])


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
            <div className="row">
                {data?.data.data.map((product) => <div key={product.id} className="col-md-2">
                    <div className="product cursor-pointer py-3 px-2">
                        <Link to={`/productdetails/${product.id}`}>
                            <img src={product.imageCover} alt={product.title} className="w-100" />
                            <span className="text-main font-sm fw-bolder">{product.category.name}</span>
                            <h3 className="h6">{product.title.split(" ").slice(0, 2).join(' ')}</h3>

                            <div className="d-flex justify-content-between mt-3">
                                <span>{product.price}EGP</span>

                                <span><i className="fas fa-star rating-color"></i> {product.ratingsAverage}</span>
                            </div>
                        </Link>
                        <button onClick={() => addProductToWishlist(product.id)} className="btn "><i className="fa-solid fa-heart p-3 "></i></button>
                        <button onClick={() => addProductToCart(product.id)} className="btn bg-main text-white w-100 btn-sm mt-2">add to cart</button>
                    </div>
                </div>)}
            </div>
        </div>}



    </>
}

