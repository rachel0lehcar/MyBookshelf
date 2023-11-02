import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './pagestyles/AddToCols.css'


function AddToCols() {
  const { objectid } = useParams();
  const [collections, setCollections] = useState([]);
  const [checked, setChecked] = useState([]);
  const [newList, setNewList] = useState("");
  const [NLCounter, setNLCounter] = useState(0);
  const checkboxesEnd = useRef();
  const navigate = useNavigate();


  useEffect(() => {
    //console.log("here");
    fetch('/getcollections')
    .then(response => response.json())
    .then(data => setCollections(data));
    //.then(console.log(collections));
  },[NLCounter]);
  
  useEffect(() => {
    if(NLCounter > 0)
      checkboxesEnd.current?.scrollIntoView({ behavior: "smooth" });
  },[collections]);

  function handleNewList(event) {
    const nL = event.target.value;
    setNewList(nL);
  }

  function handleCheck(event) {
    if(!event.target.checked) 
      setChecked(cols => cols.filter(val => val !== event.target.value));
    else
      setChecked([...checked, event.target.value]);
    console.log(checked);
  }

  function addNewList(event) {
    event.preventDefault();
    console.log("working 🙃");
    console.log(newList);
    fetch('/newcollection', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        newList: newList
      })
    }).then(response => response.json()
    .then( data => {
      if(data === "Already a List")
        console.log(data);
      else {
        console.log(data);
        setNLCounter(NLCounter +1);
        //checkboxesEnd.current?.scrollIntoView({ behavior: "smooth" });
        //window.location.reload();
      }
    }));
  }

  function saveToCollections(event) {
    event.preventDefault();
    fetch('/savetocollections', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        objectid: objectid,
        collections: checked
      })
    }).then(response => response.json())
    .then(response => console.log(response))
    .then(navigate('/'));
  }

  return (
    <div className='page-content add-to-cols'>
      <form 
        id="collection-form" 
        action="" 
        className="select-cols"
      >
        <h2>My Collections</h2>
        <div className='select-options-list'>
          {collections.map((collection,index) => {
            return(
              <div className='select-option'>
                <input type="checkbox" 
                  key={index} 
                  id={index} 
                  value={collection.name}
                  onClick={handleCheck}
                />
                <label htmlFor={index} key={"label" + index}>{collection.name}</label>
              </div>
            )
          })}
          <div ref={checkboxesEnd}/>
        </div>
        <input id="new-list" type="text" onChange={handleNewList} placeholder='add new list'/>
        <button htmlFor="new-list" onClick={addNewList}>+</button>
        
      </form>
      <input form='collection-form' type="submit" value="Submit" onClick={saveToCollections}/>

    </div>
  )
}

export default AddToCols;