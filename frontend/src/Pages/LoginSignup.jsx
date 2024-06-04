import React, { useState } from 'react'
import '../Pages/Css/LoginSignup.css'

const LoginSignup = () => {
const [state, setState] = useState('Login')
const [formData, setFormData] = useState({
  username : '',
  password : '',
  email : ''
})

const changeHandler = (e)=>{
  setFormData({...formData, [e.target.name] : e.target.value})
}

const login = async()=>{
  console.log('login', formData);
  let responseData;
  await fetch('http://localhost:8080/login', {
    method : 'POST',
    headers : {
      Accept : 'application/form-data',
      "Content-Type" : 'application/json'
    },
    body : JSON.stringify(formData)
  }).then((res)=> res.json()).then((data)=> responseData = data)
  if(responseData.success){
    localStorage.setItem('auth-token', responseData.token)
    window.location.replace('/');
  }else{
    alert(responseData.errors)
  }
}

const signup = async()=>{
  console.log('Signup', formData);
  let responseData;
  await fetch('http://localhost:8080/signup', {
    method : 'POST',
    headers : {
      Accept : 'application/form-data',
      "Content-Type" : 'application/json'
    },
    body : JSON.stringify(formData)
  }).then((res)=> res.json()).then((data)=> responseData = data)
  if(responseData.success){
    localStorage.setItem('auth-token', responseData.token)
    window.location.replace('/');
  }
  else{
    alert(responseData.error)
  }
}

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? <input type="text" onChange={changeHandler} name='username' value={formData.username}  placeholder='User name' /> : <></> }
          <input type="email" onChange={changeHandler} name='email' value={formData.email} placeholder='Email address' />
          <input type="password" onChange={changeHandler} name='password' value={formData.password} placeholder='Password' />
        </div>
        <button onClick={()=> {state === "Login" ? login() : signup()}}>Continue</button>
        {state === 'Sign Up' ? <p className="loginsignup-login">Already have an account <span onClick={()=>setState('Login')}>Login here</span></p> : <p className="loginsignup-login">Create an account <span onClick={()=>setState('Sign Up')}>Click here</span></p>}        
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup