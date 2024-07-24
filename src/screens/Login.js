import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3005/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        credentials: 'include'
      });

      const data = await res.json();
      console.log(data);

      if (!data.success) {
        alert("Enter Valid Credentials");
      } else {
        localStorage.setItem("useremail", credentials.email);
        localStorage.setItem("authToken",data.token);
        console.log("token",data.token)
        navigate('/');
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
      <div className='container'>
        <form className='w-50 m-auto mt-5 border bg-dark border-info rounded' onSubmit={handleSubmit}>
          <div className="m-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} />
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' />
          </div>
          <button type="submit" className="m-3 btn btn-info">Submit</button>
          <Link to="/signup" className="m-3 mx-1 btn btn-danger">I'm a new user</Link>
        </form>
      </div>
  );
}

export default Login;
