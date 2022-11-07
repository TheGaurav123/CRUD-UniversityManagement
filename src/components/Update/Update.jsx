import './../Add/add.css'
import { useFormik } from 'formik'
import { updateSchema } from '../../Schemas/UpdateSchema'
import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';



const Update = () => {
    // Params 
    const params = useParams()

    const requestID = params.id





    // Formik
    const [initialValues, setInitialValues] = useState({
        Student_Name: '',
        Father_Name: '',
        Mother_Name: '',
        Phone: '',
        DOB: '',
        Branch: '',
        Email: ''
    })

    const { values, errors, handleChange, handleSubmit, touched } = useFormik({
        initialValues,
        validationSchema: updateSchema,
        enableReinitialize: true,
        onSubmit: () => {
            updateAPI()
        }
    })




    // Get API
    const [studentData, setStudentData] = useState({})

    const getAPI = async () => {

        if (requestID) {

            let result = await fetch(`https://studentmanagement-backend.onrender.com/update/${requestID}`)

            result = await result.json()

            if (result === 'Student Not Found...' || result === 'Request ID not found...') {
                toast.error('Something went wrong !', {
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
            else {
                setStudentData(result.result)
                setInitialValues({
                    Student_Name: `${studentData.Student_Name}`,
                    Father_Name: `${studentData.Father_Name}`,
                    Mother_Name: `${studentData.Mother_Name}`,
                    Phone: `${studentData.Phone}`,
                    DOB: `${studentData.DOB}`,
                    Branch: `${studentData.Branch}`,
                    Email: `${studentData.Email}`
                })
            }

        }

        else {
            toast.error('Something went wrong !', {
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



    
    // Update API

    const updateAPI = async () => {
        let result = await fetch(`https://studentmanagement-backend.onrender.com/update/${requestID}`, {
            method: 'PUT',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        result = await result.json()

        if (result.result === 'Data Updated Successfully...') {
            toast.success('Data Updated Successfully...', {
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

        else {
            toast.error('Something went wrong !', {
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


    useEffect(() => {
        getAPI()
    }, [studentData])  //eslint-disable-line





    return (
        <>
            <div className='main-add-container pb-2'>
                <div className="container d-flex mt-2 mt-md-3 mb-5 mb-md-4 justify-content-between px-5 px-md-0">
                    <Link to='/data' id='data-btn'>Back</Link>
                </div>

                <h4 className='pt-5'>Update</h4>

                <div className='add-container  w-100'>
                    <div className="container">
                        <div className="row pt-3 d-flex justify-content-center align-item-center flex-column">
                            <form onSubmit={handleSubmit}>
                                <div id='input-width' style={{ marginTop: '1rem' }} className="col-12 input-style mb-4 mb-md-4 d-flex flex-column w-50 mx-auto">
                                    <div className="span">Student Name</div>
                                    <input type="text" onChange={handleChange} value={values.Student_Name} placeholder='Student Name' name='Student_Name' />
                                    {errors.Student_Name && touched.Student_Name ? <span className='error mt-1'>{errors.Student_Name}</span> : null}
                                </div>
                                <div id='input-width' style={{ marginTop: '1rem' }} className="col-12 input-style mb-4 mb-md-4 d-flex flex-column w-50 mx-auto">
                                    <div className="span">Father's Name</div>
                                    <input type="text" onChange={handleChange} value={values.Father_Name} placeholder="Father's Name" name='Father_Name' />
                                    {errors.Father_Name && touched.Father_Name ? <span className='error mt-1'>{errors.Father_Name}</span> : null}
                                </div>
                                <div id='input-width' style={{ marginTop: '1rem' }} className="col-12 input-style mb-4 mb-md-4 d-flex flex-column w-50 mx-auto">
                                    <div className="span">Mother's Name</div>
                                    <input type="text" onChange={handleChange} value={values.Mother_Name} placeholder="Mother's Name" name='Mother_Name' />
                                    {errors.Mother_Name && touched.Mother_Name ? <span className='error mt-1'>{errors.Mother_Name}</span> : null}
                                </div>
                                <div id='input-width' style={{ marginTop: '1rem' }} className="col-12 input-style mb-4 mb-md-4 d-flex flex-column w-50 mx-auto">
                                    <div className="span">Phone</div>
                                    <input type="text" onChange={handleChange} value={values.Phone} placeholder="Phone" name='Phone' />
                                    {errors.Phone && touched.Phone ? <span className='error mt-1'>{errors.Phone}</span> : null}
                                </div>
                                <div id='input-width' style={{ marginTop: '1rem' }} className="col-12 input-style mb-4 mb-md-4 d-flex flex-column w-50 mx-auto">
                                    <div className="span">DOB</div>
                                    <input type="date" onChange={handleChange} value={values.DOB} placeholder="DOB" name='DOB' />
                                    {errors.DOB && touched.DOB ? <span className='error mt-1'>{errors.DOB}</span> : null}
                                </div>
                                <div id='input-width' style={{ marginTop: '1rem' }} className="col-12 input-style mb-4 mb-md-4 d-flex flex-column w-50 mx-auto">
                                    <div className="span">Email</div>
                                    <input type="email" onChange={handleChange} name='Email' value={values.Email} placeholder="Email (optional)" />
                                </div>

                                <div id='input-width' className="col-12 input-style mb-4 mb-md-5 d-flex flex-column w-50 mx-auto">
                                    <div className="span">Branch</div>
                                    <select onChange={handleChange} name='Branch' value={values.Branch} >
                                        <option value="Computer Science">Computer Science</option>
                                        <option value="Mechanical">Mechanical</option>
                                        <option value="Civil">Civil</option>
                                        <option value="Electrical">Electrical</option>
                                    </select>
                                    {errors.Branch && touched.Branch ? <span className='error mt-1'>{errors.Branch}</span> : null}
                                </div>
                                <div id='input-width' className="col-12 input-style mt-4 mb-md-5 d-flex flex-column w-50 mx-auto">
                                    <button type='submit'>Update</button>
                                </div>
                            </form>
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

export default Update
