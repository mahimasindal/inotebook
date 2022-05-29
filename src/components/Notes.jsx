import React, { useContext, useEffect, useState } from "react";
import noteContext from "../context/notes/noteContext";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import NotesLoop from "./NotesLoop";

const Notes = (props) => {
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes, notesIsLoading } = context;
  const [searchKey, setSearchKey]=useState("");
  const [filteredNote, setFilteredNote]=useState([])

  const searchHandler=(e)=>{
    setSearchKey(e.target.value)
    //console.log("searchKey=",e.target.value)
    if(searchKey!==""){
      const selectedNotes=notes.filter((note)=>{return Object.values(note)
                                                .join(" ")
                                                .toLowerCase()
                                                .includes(searchKey.toLowerCase());
                                              });
      setFilteredNote(selectedNotes)
     // console.log(selectedNotes)
    }
    else{
      setFilteredNote(notes)

    }
  }
  
  useEffect(() => {
    //console.log("loading=", notesIsLoading);
    if (localStorage.getItem("token")) {
      getNotes();
      //console.log("got notes");
    } else {
      navigate("/login");
    }
  }, []);

 
  return (
    <div className="row my-2">
      
      <h2 className="my-2 col-12 col-sm-4 col-md-4 col-lg-5">Your Notes</h2>
      <form className="d-flex col-12 col-sm-8 col-md-8 col-lg-7 my-2">
        <input className="form-control me-2" type="search" value={searchKey} onChange={searchHandler} placeholder="Search" aria-label="Search"/>
      </form>
      {notesIsLoading==true?
      <div>Loading data...</div>
      :
      <>
      <div>
        {notes.length === 0 && "No notes to show" } 
      </div>
      <NotesLoop notes={searchKey.length===0?notes:filteredNote} showAlert={props.showAlert}/>
      </>}
    </div>
  );
};

export default Notes;
