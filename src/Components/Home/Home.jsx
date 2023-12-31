import React from "react";
import Style from "./Home.module.css";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";
import { Helmet } from "react-helmet";


export default function Home() {
    return <>
        <Helmet>
            <meta name="description" content="" />
            <title>Fresh Market</title>
        </Helmet>
        
        <MainSlider />
        <CategorySlider />
        <FeaturedProducts />

    </>
}