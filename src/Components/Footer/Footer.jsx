import React from "react";
import Style from "./Footer.module.css";

export default function Footer() {
    return <>
        <div className="footer  py-4">
            <div className="container">
                <h3>Get The FreshCart app</h3>
                <p>We Will Send You a Link, Open it on Your Phone to download the app</p>
                {/* <div className="container d-flex align-items-center justify-content-between"> */}
                <div className="container ">
                    <div className="row py-3">
                        <div className="col-md-10">
                            <input type="text" className="form-control " placeholder="Email .." />
                        </div>
                        <div className="col-md-2">
                            <button type="submit" className="btn bg-main text-light px-4">Share App Link</button>
                        </div>
                    </div>
                    <hr />
                    <div className="d-flex align-items-center py-3">
                        <h4>Payment Partners</h4>
                        <i class="fa-brands fa-amazon-pay px-2"></i>
                        <i class="fa-brands fa-cc-amex px-2"></i>
                        <i class="fa-brands fa-cc-mastercard px-2"></i>
                        <i class="fa-brands fa-paypal px-2"></i>
                    </div>
                    <hr />
                </div>
            </div>
        </div>

    </>
}