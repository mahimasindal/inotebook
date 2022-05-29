import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Notes from "./Notes";

const Home = (props) => {

  
  return (
    <div className="container">
      
      <Notes showAlert={props.showAlert}/>
      <Link to='/create-note'>
      <i className="fa-solid fa-circle-plus plus-float"></i>
      </Link>
    </div>
  );
};

export default Home;
