import React, { useContext, useEffect } from "react";
import {Link, useLocation} from "react-router-dom";
import noteiconImg from "../images/noteIcon.png";
import { useNavigate} from 'react-router-dom';
import UserContext from "../context/user/userContext";


const Navbar = (props) => {
  const {user,setUser,isAuth,setIsAuth, getUser}=useContext(UserContext);
  let navigate=useNavigate();
  //console.log(navigate)
  let location = useLocation();
  console.log("user=",user)
  const handleLogout=(e)=>{
    e.preventDefault();
    localStorage.removeItem('token');
    setUser({name:"", email:""})
    setIsAuth(false)
    navigate('/login');
    props.showAlert("Logged out","success");


  }
  
   useEffect(()=>{
    //console.log(location.pathname);
    if(localStorage.getItem('token') && isAuth===false){
      console.log("in useeffect nav")
      getUser()
    }
  },[]); 
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark navbar-customclass">
        <div className="container-fluid">
          
          
          <div className="mx-2 d-flex align-items-center"><i className="fa-solid fa-angle-left arrow" onClick={() => navigate(-1)}></i>
          <Link className="navbar-brand mx-2" to="/"> <img src={noteiconImg}></img>
          </Link>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/create-note"?"active":""}`} to="/create-note">
                  New Note
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">
                  About
                </Link>
              </li>
             
            </ul>

           {localStorage.getItem('token')?
           <div className="d-flex">
             <div className="vertical-align"> Hi {user?user.name:"unknown"} !</div>
             <button className="btn btn1" onClick={handleLogout} role="button">Logout</button>
           </div>: 
           <form>
              <Link className="btn btn1" to="/login" role="button">Login</Link>
              <Link className="btn btn2 mx-2" to="/signup" role="button">Signup</Link>
            </form>
            }
           {/*  <div className="mx-2 arrow"><i class="fa-solid fa-arrow-right"></i></div>  */}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
