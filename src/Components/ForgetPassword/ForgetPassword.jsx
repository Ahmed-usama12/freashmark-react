import React from "react";
import Style from "./ForgetPassword.module.css";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";


export default function ForgetPassword() {

    let navigate = useNavigate();

    async function sendMail(value) {
        let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, value)
        console.log(data?.statusMsg);
        if (data?.statusMsg === 'success') {
            navigate('/verifycode')
        }
    }


    let validateScheme = Yup.object({
        email: Yup.string().email("envalid email").required('email is required'),
    })

    let formik = useFormik({
        initialValues: {
            email: '',
        }, validationSchema: validateScheme,
        onSubmit: sendMail
    })


    return <>
        <div className="mx-auto w-75 py-5 ">

            <form onSubmit={formik.handleSubmit} >
                <label htmlFor="email">Email :</label>
                <input type="email" onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control" name="email" id="email" value={formik.values.email} />
                {formik.errors.email && formik.touched.email ? <div className="alert alert-danger p-2 mt-2">{formik.errors.email}</div> : ''}

                <button disabled={!(formik.isValid && formik.dirty)} className="btn bg-main mt-2 mx-2 text-white" type="submit">Send</button>

            </form>

        </div>

    </>
}