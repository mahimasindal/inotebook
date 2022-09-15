import { useState } from 'react';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import AddNote from "./components/AddNote";
import NoteState from "./context/notes/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from "./components/Alert";
import PrivateRoute from './components/PrivateRoute';
import UserState from './context/user/UserState';
//import noteContext from "./context/notes/noteContext"

//ye master ka change h

function App() {

    const [alert, setAlert] = useState(null)

    const showAlert = (message, type) => {
        console.log(message + type);
        setAlert({
            msg: message,
            type: type
        });
        setTimeout(() => {
            setAlert(null);
        }, 1500);
    }

    return (
            <>
            <NoteState>
            <UserState>
            <Router>
            <div className = "mostOuterContainer">
            <Navbar showAlert = { showAlert }/> 
            <Alert alert = { alert }/> 
            <div className = "container">
            <Routes>
            <Route exact path = "/" element = { < PrivateRoute > < Home showAlert = { showAlert } /></ PrivateRoute> }/> 
            <Route exact path = "/about" element = { <About /> }/>
            <Route exact path = "/login" element = { < Login showAlert = { showAlert } />}/>
            <Route exact path = "/signup" element = { < Signup showAlert = { showAlert }/>} />
            <Route exact path = "/create-note" element = { <PrivateRoute > < AddNote key = { 1 }showAlert = { showAlert } /></ PrivateRoute> }/>
            <Route exact path = "/note/:id" element = { < PrivateRoute > < AddNote key = { 2 } showAlert = { showAlert } /></PrivateRoute >}/>
             </Routes > 
             </div>
              </div > 
              </Router>
               </UserState>
               </NoteState> 
               </>
                );
            }

            export default App;