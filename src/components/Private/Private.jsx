import {Navigate, Outlet} from 'react-router-dom'



const Private = () =>{

    const auth = localStorage.getItem('usr')

    return  auth ?  <Outlet /> : <Navigate to='/login' />
}


export default Private;


