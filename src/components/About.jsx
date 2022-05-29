import React, { useRef, useEffect, useState } from "react";
//import NoteContext from "../context/notes/noteContext";

const About = () => {
  
  return (
    <div className="container">
      
      <div className="row">
      
      <div className="col-lg-3 col-md-2"></div>
        <h1 className="col-lg-6 col-md-8">
        In About
        </h1>
        <div className="col-lg-3 col-md-2"></div>

        <div className="col-lg-3 col-md-2"></div>
        <div className="col-lg-6 col-md-8 note-item">
         iNotebook is a notes app that help you secure your notes and categorize them easily.
          It contains all the basic functionalities that any notes app must have. You can add, edit and delete your notes.
          You can also search your notes very easily using the search form. We provide login and registration for now without verification.
          But in future a OTP verification process will be added. Also we do not have password change and adding user profile section
          but in future version we will certain release these necessary features. For now please remember your passwords.
          This app is created and owned by Mahima Sindal. It has been built with Mongo DB, Express, React JS and Node.
        </div>
        <div className="col-lg-3 col-md-2"></div>
      </div>

     
    </div>
  );
};

export default About;
