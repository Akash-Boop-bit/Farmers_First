import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const Check = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    let auth = localStorage.getItem('user')
    if(auth){
      navigate('/')
    }
  },[])

  return (
    <div>
      <h1>Please check your inbox for verification mail.</h1>
    </div>
  )
}

export default Check