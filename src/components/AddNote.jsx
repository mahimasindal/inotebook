import React, { useContext, useEffect, useState } from "react";
import noteContext from "../context/notes/noteContext";
import { useParams } from "react-router-dom";

const AddNote = (props) => {
  const host = "http://localhost:5000";
  const context = useContext(noteContext);
  const { addNote, getNoteWithId, editNote,selectedNote, setSelectedNote, selectedNoteIsLoading,setSelectedNoteIsLoading } = context;
  var { id } = useParams();



  useEffect(async() => {
    if (id) {
      
      console.log("loading=",selectedNoteIsLoading)
      const resCode=await getNoteWithId(id)
      console.log("loading2=",selectedNoteIsLoading)

      if(resCode===200){
        console.log("selectedNote=",selectedNote)
        props.showAlert("Note Fetched successfully", "success");
      }
        else{
          props.showAlert("Some error ocurred, your note could not be fetched", "danger");
        }


      }
      
      setSelectedNoteIsLoading(false)
      
      
     
  },[]);

  useEffect(()=>{
    return()=>{
        console.log("setting it true")
        setSelectedNote({title:"",description:"",tag:""})
        setSelectedNoteIsLoading(true)
      }
  },[])

  const handleAddClick = async(e) => {
    e.preventDefault(); 
    //console.log("in Add");
    const resCode= await addNote();
    
    if(resCode===200){
      props.showAlert("Note added successfully", "success");
      id=selectedNote.id
      console.log("id=",id)
    }
    else{
      props.showAlert("Some error ocurred, your note is not created", "danger");

    }
    
  };

  const handleEditClick = async(e) => {
    e.preventDefault();
    console.log("in Edit", id);
    const resCode=await editNote(id);
    if(resCode===200){
      props.showAlert("Note updated successfully", "success");
    }
    else{
      props.showAlert("Some error ocurred, your data is not saved", "danger");

    }
  };

  const onChange = (e) => {
    /*console.log(note) */
    setSelectedNote((prev)=>({ ...prev, [e.target.name]: e.target.value }));
    console.log("selectedNote:",selectedNote)
    //console.log(note)
  };
  return (
    <div className="container ">
      <div className="row">
        <div className="col-lg-3 col-md-2"></div>
        <div className="col-lg-6 col-md-8 addNoteCard">
          <h1>{id?"Your Note":"Create new note"}</h1>
          <form className="my-4">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
             {selectedNoteIsLoading?<div>Loading...</div>:
                <input
                type="text"
                className="form-control"
                name="title"
                id="title"
                value={selectedNote.title}
                aria-describedby="title"
                onChange={onChange}
                minLength={5}
                required
              />}
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              {selectedNoteIsLoading?<div>Loading...</div>:
              <textarea
                type="text"
                className="form-control"
                name="description"
                id="description"
                value={selectedNote.description}
                onChange={onChange}
                minLength={5}
                rows="8"
                required
              />}
            </div>
            <div className="mb-3">
              <label htmlFor="tag" className="form-label">
                Tag
              </label>
              {selectedNoteIsLoading?<div>Loading...</div>:
              <input
                type="text"
                className="form-control"
                name="tag"
                id="tag"
                value={selectedNote.tag}
                onChange={onChange}
              />}
            </div>
            <button
              type="submit"
              onClick={(id || (selectedNote.id)) ? handleEditClick : handleAddClick}
              className="btn btn1"
              disabled={selectedNoteIsLoading}
            >
              {id || (selectedNote.id) ? "Edit Note" : "Add Note"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNote;
