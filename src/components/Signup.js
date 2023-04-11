import React,{useState} from 'react'
import {useNavigate} from "react-router-dom";
const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""})
    const navigate  = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent the reload of page
   const {name,email,password,cpassword} = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      
    method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "auth-token":""
      },
      body: JSON.stringify({ name,email,password}),
    });

    const json = await response.json();
    console.log(json);
    if(json.success){
        // save auth-token and redirect
        localStorage.setItem('token',json.authtoken);
        navigate("/");
        props.showAlert("successfully signed up","success"); 
    }
    else
    {
      props.showAlert("invalid","danger"); 
    }
  }
    const onChange = (e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value});
    }
  return (
    <div className='container mt-3'>
      <h2>Sign Up Here</h2>
        <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" onChange={onChange} name='name' id="name" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" onChange={onChange}  name='email' id="email" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" onChange={onChange} minLength={5} required name='password' id="password"/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" onChange={onChange} minLength={5} required name='cpassword' id="cpassword"/>
  </div>
 
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup