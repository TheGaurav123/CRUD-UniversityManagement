import React, { useEffect } from 'react'
import './data.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Data = () => {

  const [studentData, setStudentData] = useState([])


  const fetchAPI = async () => {
    let result = await fetch('http://localhost:5000/getstudent')

    result = await result.json()
    setStudentData(result.result)
  }


  // Search API
  const searchAPI = async (e) => {
    if (e.target.value) {
      let result = await fetch(`http://localhost:5000/search/${e.target.value}`)
      result = await result.json()

      if (result.result !== 'Student Not Found...') {
        setStudentData([result.result])
      }
      else {
        fetchAPI()
      }
    }
    else {
      fetchAPI()
    }
  }



  // Delete API

  const [delID, setDelID] = useState(null)

  const deleteAPI = async () => {
    let result = await fetch(`http://localhost:5000/delete/${delID}`, {  //eslint-disable-line
      method: 'DELETE'
    })

//     result = await result.json()

    toast.success('Student Deleted Successfully...', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });

    setDelID(null)
  }


  useEffect(() => {
    fetchAPI()
  }, [delID])


  return (
    <>
      <div className="container-fluid">

        {/* Back */}
        <div className="container-fluid my-3">
          <Link className='anchor-btn' to='/'>Back</Link>
        </div>


        <div className="table-responsive mx-auto mt-2">
          <div className="search-box pt-2">
            <input type="text" id='search-btn' onChange={searchAPI} placeholder='Search (Aadhaar No.)' />
          </div>
          <table className="table text-center">
            <thead className='table-heading'>
              <tr>
                <td>Aadhaar No.</td>
                <td>Student Name</td>
                <td>Father's Name</td>
                <td>Mother's Name</td>
                <td>Phone</td>
                <td>Email</td>
                <td>DOB</td>
                <td>Course</td>
                <td>Branch</td>
                <td>Action</td>
              </tr>
            </thead>

            <tbody className='table-body'>
              {studentData.map((val, index) => [
                <tr key={index}>
                  <td className='fw-bold'>{val.Aadhaar}</td>
                  <td>{val.Student_Name}</td>
                  <td>{val.Father_Name}</td>
                  <td>{val.Mother_Name}</td>
                  <td>{val.Phone}</td>
                  <td>{val.Email}</td>
                  <td>{val.DOB}</td>
                  <td>{val.Course}</td>
                  <td>{val.Branch}</td>
                  <td><button className='action-btn'><Link to={`/update/${val.Aadhaar}`}><i className="fa-solid fa-pen-to-square"></i></Link></button> <button onClick={() => setDelID(val.Aadhaar)} className='action-btn mt-1 ms-2 ms-md-3 mt-md-0' data-bs-toggle="modal" data-bs-target="#deletemodal"><i className="fa-solid fa-trash"></i>
                  </button></td>
                </tr>

              ])}
            </tbody>
          </table>

          {/* No Data Div */}
          {studentData.length === 0 ? <div className="no-Data">
            <h4>No Data</h4>
          </div> : null}

        </div>
      </div>

      {/* D E L E T E   M O D A L */}
      <div className="modal fade" id="deletemodal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body text-center">
              <h4 className='fw-bold'>Confirm Delete Data ?</h4>
            </div>
            <div className="modal-footer d-flex justify-content-center">
              <button type="button" className="btn me-4 delete-btn confirm-del-btn" data-bs-dismiss="modal" onClick={deleteAPI}>Confirm</button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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

export default Data
