import React from "react";
import Style from "./Categories.module.css";
import axios from "axios";
import { useQuery } from "react-query";

export default function Categories() {

    function getAllCategories() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    }

    let { isError, data, isLoading } = useQuery('allCategories', getAllCategories);
    console.log(data?.data.data);


    return <>
        <div className="container">
            <div className="mx-auto w-25 mt-5 mb-5">
                <h1 className="text-main mx-auto">All Categories</h1>
            </div>

            <div className="row g-5">
                {data?.data.data.map((category)=><div key={category.id} className="col-md-4  categoryBox">
                    <img src={category.image} alt={category.name} className="w-100" height={330} />
                    <div className=" py-2 mx-auto text-center bg-danger"><span className="h6">{category.name}</span></div>
                </div>)}
            </div>

        </div>

    </>
}