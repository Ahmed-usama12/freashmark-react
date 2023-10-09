import React, { useContext, useState } from "react";
import Style from "./Login.module.css";
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";



export default function Login() {

    let { setUserToken } = useContext(UserContext);
    let navigate = useNavigate();

    const [error, seterror] = useState(null);
    const [isLoading, setisLoading] = useState(false)

    async function loginSubmit(values) {
        setisLoading(true);
        let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
            .catch((err) => {
                setisLoading(false);
                seterror(err.response.data.message)
            }
            )
        console.log(data);
        if (data.message === "success") {
            console.log(data.token);
            localStorage.setItem('userToken', data.token);
            setUserToken(data.token)
            navigate('/')
        }
    }



    let validateScheme = Yup.object({
        email: Yup.string().email("envalid email").required('email is required'),
        password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, "Password is invalid").required("Password Is Required"),
    })

    let formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        }, validationSchema: validateScheme,
        onSubmit: loginSubmit
    })


    return <>

        <div className="mx-auto w-75 py-5 ">


            {error !== null ? <div className="alert alert-danger ">{error}</div> : ''}
            <h3>Login Now</h3>
            <form onSubmit={formik.handleSubmit}>


                <label htmlFor="email">Email :</label>
                <input type="email" onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control" name="email" id="email" value={formik.values.email} />
                {formik.errors.email && formik.touched.email ? <div className="alert alert-danger p-2 mt-2">{formik.errors.email}</div> : ''}


                <label htmlFor="password">Password :</label>
                <input type="password" onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control" name="password" id="password" value={formik.values.password} />
                {formik.errors.password && formik.touched.password ? <div className="alert alert-danger p-2 mt-2">{formik.errors.password}</div> : ''}



                {isLoading ? <button className="btn bg-main mt-2 text-white" type="button">
                    <i className="fas fa-spinner fa-spin"></i>
                </button> : <>
                    <div className="d-flex align-items-center">
                        <button disabled={!(formik.isValid && formik.dirty)} className="btn bg-main mt-2 mx-2 text-white" type="submit">Login</button>
                        <Link className="btn" to={'/register'}>Sign Up</Link>
                        <Link className="btn" to={'/forget'} >Forget pass</Link>

                    </div>


                </>}


            </form>
        </div>

    </>


}