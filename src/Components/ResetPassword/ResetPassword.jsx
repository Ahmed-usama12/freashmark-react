import React, { useContext, useState } from "react";
import Style from "./ResetPassword.module.css";
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";



export default function ResetPassword() {

    // let { setUserToken } = useContext(UserContext);
    let navigate = useNavigate();

    // const [error, seterror] = useState(null);
    const [isLoading, setisLoading] = useState(false)

    async function resetPassword(values) {
        setisLoading(true);
        let { data } = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values)

        // console.log(data?.data);
        if (data?.token) {
            navigate('/login');

        }
        setisLoading(false)

    }



    let validateScheme = Yup.object({
        email: Yup.string().email("envalid email").required('email is required'),
        newPassword: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, "Password is invalid").required("Password Is Required"),
    })

    let formik = useFormik({
        initialValues: {
            email: '',
            newPassword: '',
        }, validationSchema: validateScheme,
        onSubmit: resetPassword
    })


    return <>

        <div className="mx-auto w-75 py-5 ">


            {/* {error !== null ? <div className="alert alert-danger ">{error}</div> : ''} */}
            <h3>reset Now</h3>
            <form onSubmit={formik.handleSubmit}>


                <label htmlFor="email">Email :</label>
                <input type="email" onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control" name="email" id="email" value={formik.values.email} />
                {formik.errors.email && formik.touched.email ? <div className="alert alert-danger p-2 mt-2">{formik.errors.email}</div> : ''}


                <label htmlFor="newPassword">New Password :</label>
                <input type="password" onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control" name="newPassword" id="newPassword" value={formik.values.newPassword} />
                {formik.errors.newPassword && formik.touched.newPassword ? <div className="alert alert-danger p-2 mt-2">{formik.errors.newPassword}</div> : ''}



                {isLoading ? <button className="btn bg-main mt-2 text-white" type="button">
                    <i className="fas fa-spinner fa-spin"></i>
                </button> : <>
                    <div className="d-flex align-items-center">
                        <button disabled={!(formik.isValid && formik.dirty)} className="btn bg-main mt-2 mx-2 text-white" type="submit">submit</button>


                    </div>


                </>}


            </form>
        </div>

    </>


}