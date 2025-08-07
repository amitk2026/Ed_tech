import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const Navigate=useNavigate();
    const {token}=useSelector(state=>state.auth);
    if(token) return children
    else return <Navigate to='/login'/>
}

export default PrivateRoute
