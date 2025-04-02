import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';



// This is a high order component(bcoz this will wrap the admin layout), we want that only the admin user can access the admin routes , this component will take the role as prop(which is admin)
// first it will fetch the user object from redux store 
// second it check if user is logged in or role of the user is same as role passed in props , if any condition failed user is redirected to login page
// If the user passes the authentication and role check, the component renders children which is admin layout 
function ProtectedRoute({children ,role}) {
    const {user} = useSelector((state)=>state.auth);
    if(!user || (role && user.role!== role)){
        return <Navigate to='/login' replace/>
    }
  return children; //admin layout
}

export default ProtectedRoute