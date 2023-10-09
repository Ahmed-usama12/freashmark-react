import React from "react";
import Style from "./Brands.module.css";
import axios from "axios";
import { useQuery } from "react-query";

export default function Brands() {


    function getAllBrands() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    }

    let { isError, isLoading, data } = useQuery('allBrands', getAllBrands);
    console.log(data?.data.data);



    return <>
        <div className="container">
            <div className="mx-auto w-25 mt-5 mb-3">
                <h1 className="text-main mx-auto">All Brands</h1>
            </div>

            <div className="row ">
                {data?.data.data.map((brand) => <div key={brand.id} className="col-md-3 brandcol p-3  ">
                    <div className="brandBox">
                        <img src={brand.image} alt={brand.name} className="w-100" />
                        <div className="w-50 py-2 mx-auto text-center">
                        <span className="h6">{brand.name}</span>
                        </div>
                    </div>
                </div>)}
            </div>
        </div>

    </>
}