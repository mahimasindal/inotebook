import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/user/userContext";

const Login = (props) => {
  const showAlert = props.showAlert;
  const host = "http://localhost:5000";
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const context=useContext(UserContext)
  const {isAuth, setIsAuth, getUser}=context
  let navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    //console.log(json);
    if (json.success) {
      showAlert("Successfully Logged in", "success");
      //save the authtoken and redirect to home
      localStorage.setItem("token", json.authToken);
      setIsAuth(true)
      getUser()
      navigate("/");
      //console.log(localStorage.getItem('token'))
    } else {
      console.log("here");
      //alert("Invalid credentials");
      showAlert(json.error, "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <div className="row">
      <div className="col-lg-4 col-md-3"></div>
      <div className="col-lg-4 col-md-6 addNoteCard">
      <h2 className="my-3"> Login </h2>
      <form className="my-3" onSubmit={onSubmit}>
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
          />
        </div>
        <button type="submit" className="btn btn1">
          Submit
        </button>
      </form>
      </div>
      </div>
    </div>
  );
};

export default Login;
