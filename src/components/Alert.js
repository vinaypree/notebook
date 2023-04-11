import React from "react";

const Alert = (props) => {
  const capitalize = (word)=>{
    if(word==="danger")
    {
      
      return "Error";
    }

  } 
  return (
    props.alert && (
      <div
        className={`alert alert-${props.alert.typ} alert-dismissible fade show`}
        role="alert"
      >
        <strong>{capitalize(props.alert.typ)}</strong> :{props.alert.msg}
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>)
  );
};

export default Alert;
