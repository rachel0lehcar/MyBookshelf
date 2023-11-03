import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
  //let auth = {'token':false}
  let status = useState(() => {
    fetch('/isLoggedIn').then(status => status.json())
    .then(status => {
      return status;
    })

  });

  /*function checkStatus() {
    fetch('/isLoggedIn').then(status => status.json())
    .then(status => setStatus(status));
  }
  useEffect(() => {
    checkStatus();
    console.log(status);

  },[])*/

  return( status ? <Outlet/> : <Navigate to={'/login'}/> )
}

export default PrivateRoutes