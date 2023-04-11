import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
const Noteitem = (props) => {
  const context = useContext(noteContext);
  const {deleteNote} = context;
  const { note,updateNote} = props;

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-item-center">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text"> {note.description}</p>
            <i className="fa-solid fa-square-minus fa-lg mx-2"onClick={()=>{deleteNote(note._id)}}></i>
            <i className="fa-solid fa-pen-to-square fa-lg mx-2"onClick={()=>{updateNote(note)}}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
