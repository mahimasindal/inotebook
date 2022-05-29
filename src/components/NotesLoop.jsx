import React from 'react'
import Noteitem from "./Noteitem";

const NotesLoop = (props) => {
  return (
    <div className="notes-layout">
        {props.notes.map((note) => {
          return (
            <Noteitem key={note._id} note={note} showAlert={props.showAlert} />
          );
        })}
      </div>
  )
}

export default NotesLoop
