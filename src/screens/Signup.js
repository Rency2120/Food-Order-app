import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {

    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        geolocation: ""
    });
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3005/api/createuser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
            });

            const data = await res.json();
            console.log(data);

            if (!data.success) {
                //save the auth toke to local storage and redirect
                // localStorage.setItem('token', json.authToken)
                // navigate("/login")
                alert("Enter Valid Credentials")
            }else{
                navigate("/login")
            }


        } catch (error) {
            console.log("Error", error)
        }

    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        
            <div className='container' >
                <form className='w-50 m-auto mt-5 border bg-dark border-info rounded' onSubmit={handleSubmit}>
                    <div className="m-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
                    </div>
                    <div className="m-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} />
                    </div>
                    <div className="m-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input type="text" onChange={onChange} className="form-control" name='geolocation' value={credentials.geolocation} />
                    </div>
                    <div className="m-3">
                        <button type="button" name="geolocation" className=" btn btn-success">Click for current Location </button>
                    </div>
                    <div className="m-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' />
                    </div>
                    <button type="submit" className="m-3 btn btn-info">Submit</button>
                    <Link to="/login" className="m-3 mx-1 btn btn-danger">Already a user</Link>
                </form>
            </div>
    )
}

export default Signup
