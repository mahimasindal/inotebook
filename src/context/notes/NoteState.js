import { useState } from "react";
import NoteContext from "./noteContext";
import axios from "axios";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)
    const [notesIsLoading, setNotesIsLoading] = useState(true)
    const [selectedNote, setSelectedNote] = useState({ "title": "", "description": "", "tag": "","id":"" })
    const [selectedNoteIsLoading, setSelectedNoteIsLoading] = useState(true)


    
    const getNotes = () => {
        //TODO: API Call
         axios(
            {
                url:`${host}/api/notes/fetchallnotes`, 
                method: 'GET',
                headers: { 'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')}
            }
        ).then(
            (res)=>{
                const data = res.data
                console.log("res=",res)
                setNotes(data)
                setNotesIsLoading(false)   
            }
        )
    }

    //get note when not available in client
    const getNote= async (id)=>{
        const response = await fetch(`${host}/api/notes/getnote/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              'auth-token': localStorage.getItem('token')
            }
          });
          const json = await response.json();
          console.log(json);
          //setNote(json.note)
       
    
      }
    //Get note with a given id
    const getNoteWithId = async (id) => {
        var noteWithId={}
        console.log("notes=",notes, notes.length===0)
        if(notes.length !== 0)
        {
        noteWithId = notes.filter((note) => { return note._id === id })
        
         setSelectedNote({
            "title": noteWithId[0].title,
            "description": noteWithId[0].description,
            "tag": noteWithId[0].tag,
            "id":id
        })
         setSelectedNoteIsLoading(false)
        return 200
       }
       else{
        let response = await fetch(`${host}/api/notes/getnote/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              'auth-token': localStorage.getItem('token')
            }
          });
          response = await response.json()
          //let code= await response.status
          console.log("response body",response.note);
          const note=response.note
          setSelectedNoteIsLoading(false)
          setSelectedNote({title:note.title, description:note.title, tag:note.tag})
          
          return 200
          
       }

       
        //console.log(selectedNote)
        
    }


    //add a note
    const addNote = async() => {
        //TODO: API Call
        console.log("title = ",selectedNote.title)
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify(selectedNote)
        })

        if(await response.status===200)
        {       const new_note=await response.json()
                //console.log("add note response",new_note)
                selectedNote.id=new_note._id
                setNotes((prev)=>{return [...prev,selectedNote]})
        }
        return (response.status)
    } 

    //delete a note
    const deleteNote = async(id) => {
        //API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });

        if(response.status===200){
            const newNotes = notes.filter((note) => { return note._id !== id });
            //console.log("newNotes=" + newNotes);
            setNotes(newNotes);

        }
        return response.status

        {/*const json = await response.json();
        console.log(json);
        //console.log("deleting the note with id =" + id);
        const newNotes = notes.filter((note) => { return note._id !== id });
        //console.log("newNotes=" + newNotes);
        setNotes(newNotes);
        //console.log("newNotes" + newNotes)
        return await json*/}
    }

    //edit a note
    const editNote = async(id) => {
        //API Call
        const response = await fetch(`${host}/api/notes/updatenote/${selectedNote.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify(selectedNote)
            })
            //Logic to edit in client
        if(await response.status===200)
        {
            console.log("response=",response, "id=",id)
            console.log("notes=",notes)
            for (let index = 0; index < notes.length; index++) {
                const element = notes[index];
                console.log("element.id=",element._id,"id=",id)
                if (element._id === id) {
                    console.log("here in loop")
                    element.title = selectedNote.title;
                    element.description = selectedNote.description;
                    element.tag = selectedNote.tag;
                }

            }
        }

        return response.status

    }

    return ( <NoteContext.Provider value = {{ notes, getNotes,notesIsLoading, addNote, deleteNote, editNote, setNotes, getNoteWithId, selectedNote, setSelectedNote, selectedNoteIsLoading, setSelectedNoteIsLoading}} > 
    { props.children } 
    </NoteContext.Provider>
    )
}

export default NoteState;