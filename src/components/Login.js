import React,{useState} from "react";
import {useNavigate} from "react-router-dom";

const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"",password:""})
    const navigate  = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent the reload of page
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "auth-token":""
      },
      body: JSON.stringify({ email:credentials.email, password:credentials.password}),
    });

    const json = await response.json();
    console.log(json);
    if(json.success){
        // save auth-token and redirect
        localStorage.setItem('token',json.authtoken);
        navigate("/");
        props.showAlert("successfully logined","success"); 
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
    <div className="mt-3">
      <h2>Login Here</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="email"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            onChange={onChange}
            className="form-control"
            id="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
