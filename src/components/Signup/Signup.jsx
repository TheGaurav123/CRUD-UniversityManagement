import React, { useState, useEffect } from 'react'
import './signup.css'
import signupBg from '../../Images/signupBg.svg'
import { useFormik } from 'formik'
import { signupSchema } from '../../Schemas/SignupSchema'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const initialValues = {
    Employee_ID: '',
    Phone: '',
    Email: '',
    Password: '',
    Confirm_Password: ''
}

const Signup = () => {

    //  HideShow
    const [view, setView] = useState(false)

    const navigate = useNavigate()

    const { values, errors, touched, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema: signupSchema,
        onSubmit: () => {
            fetchAPI()
        }
    })


    // Already LoggedIn redirection
    useEffect(() => {
        const checkAuth = localStorage.getItem('usr')

        if (checkAuth) {
            navigate('/')
        }
    }, []) //eslint-disable-line


    // A P I    I N T E G R A T I O N
    const fetchAPI = async () => {
        let result = await fetch('https://studentmanagement-backend.onrender.com//register', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        result = await result.json();

        if (result.result === 'User Already Exist') {
            toast.error('User already exist', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }

        else if (result.result === 'Employee ID not found') {
            toast.warn("Employee ID not found...", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else if (result.result === "User Doesn't Exist") {
            navigate('/')
        }

        else {
            toast.error('Something went wrong...', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }


    return (
        <>

            <div className="signup-container p-1">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-12 mb-md-0 mb-4 d-flex">
                            <img src={signupBg} className='img-fluid' alt="Signup" />
                        </div>
                        <div className="col-md-6 col-12">
                            <div className="row input-style">
                                <div className="col-12 d-flex mb-md-4 flex-column mb-5">
                                    <input onChange={handleChange} type="text" placeholder='Employee ID' name='Employee_ID' />
                                    {errors.Employee_ID && touched.Employee_ID ? <span className='error mt-1'>{errors.Employee_ID}</span> : null}
                                </div>
                                <div className="col-12 d-flex mb-md-4 flex-column mb-5">
                                    <input onChange={handleChange} type="phone" placeholder='Phone' name='Phone' />
                                    {errors.Phone && touched.Phone ? <span className='error mt-1'>{errors.Phone}</span> : null}

                                </div>
                                <div className="col-12 d-flex mb-md-4 flex-column mb-5">
                                    <input onChange={handleChange} type="email" placeholder='Email' name='Email' />
                                    {errors.Email && touched.Email ? <span className='error mt-1'>{errors.Email}</span> : null}
                                </div>
                                <div className="col-12 d-flex mb-md-4 flex-column mb-5">
                                    <input onChange={handleChange} type="password" placeholder='Password' name='Password' />
                                    {errors.Password && touched.Password ? <span className='error mt-1'>{errors.Password}</span> : null}
                                </div>
                                <div className="col-12 d-flex mb-md-4 flex-column mb-5">
                                    <input onChange={handleChange} type={`${view ? 'text' : 'password'}`} placeholder='Confirm Password' name='Confirm_Password' /> <span className='d-flex justify-content-end' onClick={() => setView(!view)}> {view ? <i className="fa-solid fa-eye input-icon"></i> : <i className="fa-sharp fa-solid fa-eye-slash input-icon"></i>}</span>
                                    {errors.Confirm_Password && touched.Confirm_Password ? <span className='error mt-1'>{errors.Confirm_Password}</span> : null}
                                </div>
                                <div className="col-12 d-flex mt-md-0 mt-3 flex-column mb-3 mb-md-0">
                                    <button type='submit' onClick={handleSubmit}>Register</button>
                                    <Link className='mt-3 mx-auto anchor-tag' to='/login'>Already have an account?</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    )
}

export default Signup
