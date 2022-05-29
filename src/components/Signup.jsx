import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import userContext from "../context/user/userContext"

const Signup = (props) => {
  const {setIsAuth, setUser}=useContext(userContext)
  const showAlert = props.showAlert;
  const host = "http://localhost:5000";
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.cpassword) {
      showAlert("passwords do not match", "danger");
      return;
    }
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      showAlert("user created and Logged in", "success");
      //save the authtoken and redirect to home
      localStorage.setItem("token", json.authToken);
      setIsAuth(true)
      setUser({email:credentials.email, name:credentials.name})
      navigate("/");
      //console.log(localStorage.getItem("token"));
    } else {
      showAlert(json.error, "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="row">
      <div className="col-lg-4 col-md-3"></div>
      <div className="col-lg-4 col-md-6 addNoteCard">
      <h2 className="my-3"> Signup </h2>
      <form className="my-3" onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={credentials.name}
            onChange={onChange}
            aria-describedby="name"
            minLength={3}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            onChange={onChange}
            aria-describedby="email"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            value={credentials.cpassword}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="btn btn1">
          Submit
        </button>
      </form>
    </div>
    </div>
        
        </>
  );
};

export default Signup;
