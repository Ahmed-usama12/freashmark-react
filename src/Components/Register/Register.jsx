import React, { useState } from "react";
import Style from "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { useNavigate } from "react-router-dom";



export default function Register() {

    let navigate = useNavigate();
    const [error, seterror] = useState(null);
    const [isLoading, setisLoading] = useState(false)

    async function RegisterSubmit(values) {
        console.log(values);
        setisLoading(true);
        let  {data}  = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
            .catch((err) => {
                setisLoading(false);
                console.log(err);
                seterror(err.response.data.message)
            }
            )
        console.log(data);
        if (data?.message === "success") {
            navigate('login')
        }
    }







    let phoneRegex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    let validateScheme = Yup.object({
        name: Yup.string().min(3, 'name minLength is 3').max(10, 'name maxLengtrh is 10').required("name is required"),
        email: Yup.string().email("envalid email").required('email is required'),
        password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, "Password is invalid").required("Password Is Required"),
        rePassword: Yup.string().oneOf([Yup.ref("password")], 'diffrent password').required('is required'),
        phone: Yup.string().matches(phoneRegex, "Phone is invalid").required("Phone is required")
    })

    let formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: '',
        }, validationSchema: validateScheme,
        onSubmit: RegisterSubmit
    })


    return <>

        <div className="mx-auto w-75 py-5 ">


            {error? <div className="alert alert-danger ">{error}</div> : ''}
            <h3>Register Now</h3>
            <form onSubmit={formik.handleSubmit}>

                <label htmlFor="name">Name :</label>
                <input type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control" name="name" id="name" value={formik.values.name} />
                {formik.errors.name && formik.touched.name ? <div className="alert alert-danger p-2 mt-2">{formik.errors.name}</div> : ''}

                <label htmlFor="email">Email :</label>
                <input type="email" onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control" name="email" id="email" value={formik.values.email} />
                {formik.errors.email && formik.touched.email ? <div className="alert alert-danger p-2 mt-2">{formik.errors.email}</div> : ''}

                <label htmlFor="phone">Phone :</label>
                <input type="tel" onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control" name="phone" id="phone" value={formik.values.phone} />
                {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger p-2 mt-2">{formik.errors.phone}</div> : ''}

                <label htmlFor="password">Password :</label>
                <input type="password" onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control" name="password" id="password" value={formik.values.password} />
                {formik.errors.password && formik.touched.password ? <div className="alert alert-danger p-2 mt-2">{formik.errors.password}</div> : ''}

                <label htmlFor="rePassword">rePassword :</label>
                <input type="password" onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control" name="rePassword" id="rePassword" value={formik.values.rePassword} />
                {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger p-2 mt-2">{formik.errors.rePassword}</div> : ''}


                {isLoading ?  <button className="btn bg-main mt-2 text-white" type="button">
                    <i className="fas fa-spinner fa-spin"></i>
                </button> :<button disabled={!(formik.isValid && formik.dirty)} className="btn bg-main mt-2 text-white" type="submit">Register</button> }


            </form>
        </div>

    </>


}