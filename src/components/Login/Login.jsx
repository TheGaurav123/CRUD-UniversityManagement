import LoginBg from '../../Images/loginBg.svg'
import './login.css'
import { useFormik } from 'formik'
import { loginSchema } from '../../Schemas/LoginSchema'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react'
import { useEffect } from 'react'

const initialValues = {
    Email: '',
    Password: ''
}

const Login = () => {

    // HideShow
    const [view, setView] = useState(false)


    const navigate = useNavigate()

    const { values, errors, touched, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit: () => {
            fetchAPI()
        }
    })



    // Already LoggedIn redirection
  useEffect(()=>{
    const checkAuth = localStorage.getItem('usr')

    if(checkAuth){
        navigate('/')
    }
  },[]) //eslint-disable-line
    

    const fetchAPI = async () => {
        let result = await fetch('http://localhost:5000/login', {
            body: JSON.stringify(values),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        result = await result.json()

        if (result.result !== 'User not found...') {
            localStorage.setItem('usr', result.result)
            navigate('/')
        }

        else {
            toast.error('Check Credentials', {
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
            <div className="login-container p-1">
                <div className="container">

                    <div className="row">
                        <div className="col-md-6 col-12 d-flex justify-content-center flex-column align-item-center">
                            <img src={LoginBg} className='img-fluid pb-3' alt="Login" />
                            <Link to='/register' className='mx-auto anchor-tag' style={{ textDecoration: 'none' }}>New Here?</Link>
                        </div>

                        <div className="col-md-6 col-12 mt-0 mt-md-4">
                            <div className="row mt-md-0 mt-5  h-100">
                                <div className="col-12 d-flex mb-md-5 mb-5 flex-column input-style">
                                    <input onChange={handleChange} type="text" placeholder='Email' name='Email' />
                                    {errors.Email && touched.Email ? <span className='error mt-1'>{errors.Email}</span> : null}
                                </div>
                                <div className="col-12 d-flex mb-md-5 mb-5 flex-column input-style">
                                    <input onChange={handleChange} type={`${view ? 'text' : 'password'}`} placeholder='Password' name='Password' /> <span className='d-flex justify-content-end' onClick={()=>setView(!view)}> {view ? <i className="fa-solid fa-eye input-icon"></i> : <i className="fa-sharp fa-solid fa-eye-slash input-icon"></i>}</span>
                                    {errors.Password && touched.Password ? <span className='error mt-1'>{errors.Password}</span> : null}
                                </div>
                                <div className="col-12 d-flex mt-2 flex-column input-style">
                                    <button type='submit' onClick={handleSubmit}>Login</button>
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

export default Login