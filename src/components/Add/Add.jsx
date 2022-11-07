import React from 'react'
import { useState } from 'react'
import './add.css'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { studentSchema } from '../../Schemas/StudentSchema'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const initialValues = {
    Student_Name: '',
    Father_Name: '',
    Mother_Name: '',
    Aadhaar: '',
    Phone: '',
    DOB: '',
    Course: 'B.Tech',
    Branch: 'Computer Science',
    Email: ''
}

const Add = () => {

    const navigate = useNavigate()

    // Formik 
    const { values, errors, handleChange, handleSubmit, touched } = useFormik({
        initialValues,
        validationSchema: studentSchema,
        onSubmit: (values, action) => {
            fetchAPI()
            action.resetForm()
        }
    })



    const fetchAPI = async () => {
        let result = await fetch('https://studentmanagement-backend.onrender.com/streg', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        result = await result.json()

        if (result.result === 'Student Already Exist !') {
            toast.error('Student Already Exist !', {
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

        else{
            toast.success('Student Added Successfully !', {
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


    // Logout Function

    const logOut = () => {
        localStorage.removeItem('usr')
        navigate('/login')
    }

    // Nav Toggle
    const [gear, setGear] = useState(false)
    return (

        <>
            <div className='main-add-container pb-2'>
                <div className="container d-flex mt-2 mt-md-3 mb-5 mb-md-4 justify-content-between px-5 px-md-0">
                    <Link to='/data' id='data-btn'>Data</Link>
                    <div className="row">
                        <div className="col-12">
                            <i onClick={() => setGear(!gear)} style={{ color: `${gear ? 'var(--primary)' : 'black'}`, cursor: 'pointer' }} className="fa-solid fa-gear mt-2"></i>
                            <div className="col-12">
                                {gear ? <button className='position-absolute mt-3 logout-btn' onClick={logOut}>Logout</button> : null}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='add-container  w-100'>
                    <div className="container">
                        <div className="h4 text-center">Hey <span className='fw-bold' style={{ color: 'var(--primary' }}>{localStorage.getItem('usr')} !</span> </div>
                        <div className="row pt-3 d-flex justify-content-center align-item-center flex-column">
                            <div id='input-width' style={{ marginTop: '1rem' }} className="col-12 input-style mb-4 mb-md-4 d-flex flex-column w-50 mx-auto">
                                <input onChange={handleChange} value={values.Student_Name} type="text" placeholder='Student Name' name='Student_Name' />
                                {errors.Student_Name && touched.Student_Name ? <span className='error'>{errors.Student_Name}</span> : null}
                            </div>
                            <div id='input-width' style={{ marginTop: '1rem' }} className="col-12 input-style mb-4 mb-md-4 d-flex flex-column w-50 mx-auto">
                                <input onChange={handleChange} type="text" value={values.Father_Name} placeholder="Father's Name" name='Father_Name' />
                                {errors.Father_Name && touched.Father_Name ? <span className='error'>{errors.Father_Name}</span> : null}
                            </div>
                            <div id='input-width' style={{ marginTop: '1rem' }} className="col-12 input-style mb-4 mb-md-4 d-flex flex-column w-50 mx-auto">
                                <input onChange={handleChange} type="text" value={values.Mother_Name} placeholder="Mother's Name" name='Mother_Name' />
                                {errors.Mother_Name && touched.Mother_Name ? <span className='error'>{errors.Mother_Name}</span> : null}
                            </div>
                            <div id='input-width' style={{ marginTop: '1rem' }} className="col-12 input-style mb-4 mb-md-4 d-flex flex-column w-50 mx-auto">
                                <input onChange={handleChange} type="text" value={values.Aadhaar} placeholder="Aadhaar" name='Aadhaar' />
                                {errors.Aadhaar && touched.Aadhaar ? <span className='error'>{errors.Aadhaar}</span> : null}
                            </div>
                            <div id='input-width' style={{ marginTop: '1rem' }} className="col-12 input-style mb-4 mb-md-4 d-flex flex-column w-50 mx-auto">
                                <input onChange={handleChange} type="text" value={values.Phone} placeholder="Phone" name='Phone' />
                                {errors.Phone && touched.Phone ? <span className='error'>{errors.Phone}</span> : null}
                            </div>
                            <div id='input-width' style={{ marginTop: '1rem' }} className="col-12 input-style mb-4 mb-md-4 d-flex flex-column w-50 mx-auto">
                                <input onChange={handleChange} type="date" value={values.DOB} placeholder="DOB" name='DOB' />
                                {errors.DOB && touched.DOB ? <span className='error'>{errors.DOB}</span> : null}
                            </div>
                            <div id='input-width' style={{ marginTop: '1rem' }} className="col-12 input-style mb-4 mb-md-4 d-flex flex-column w-50 mx-auto">
                                <input onChange={handleChange} type="email" name='Email' value={values.Email} placeholder="Email (optional)" />
                            </div>
                            <div id='input-width' style={{ marginTop: '1rem' }} className="col-12 input-style mb-4 mb-md-4 d-flex flex-column w-50 mx-auto">
                                <select onChange={handleChange} name='Course' value={values.Course}>
                                    <option value="B.Tech">B.Tech</option>
                                    <option value="Diploma">Diploma</option>
                                </select>
                                {errors.Course && touched.Course ? <span className='error'>{errors.Course}</span> : null}
                            </div>
                            <div id='input-width' className="col-12 input-style mb-4 mb-md-5 d-flex flex-column w-50 mx-auto">
                                <select onChange={handleChange} name='Branch' value={values.Branch}>
                                    <option value="Computer Science">Computer Science</option>
                                    <option value="Mechanical">Mechanical</option>
                                    <option value="Civil">Civil</option>
                                    <option value="Electrical">Electrical</option>
                                </select>
                                {errors.Branch && touched.Branch ? <span className='error'>{errors.Branch}</span> : null}

                            </div>
                            <div id='input-width' className="col-12 input-style mt-4 mb-md-5 d-flex flex-column w-50 mx-auto">
                                <button type='submit' onClick={handleSubmit}>Submit</button>
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

export default Add
