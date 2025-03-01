import {useEffect, useState} from 'react'
import {resolvePath, useNavigate} from 'react-router-dom'
import { getloggedUser } from '../apiCalls/user'
function ProtectedRoute({children}){
  const [user,setUser]=useState(null)
  const navigate=useNavigate()

 const getloggedInUser=async ()=>{
  try{
    const response=await getloggedUser()
    if(response.success)
       setUser(response.data)
    else
     navigate('/login')
  }
  catch(error){
    navigate('/login')
  }
 }

 useEffect(()=>{
    if(localStorage.getItem('token')){
        getloggedInUser();
    }
    else{
        navigate('/login')
    }
 })
  return(
    <div>
        <p>Name:{user?.firstName+' '+user?.LastName}</p>
        <br></br>
        <p>Email:{user?.email}</p>
        <br></br>
      
        {children}
    </div>
  )
}
export default ProtectedRoute