import React, { useState } from 'react'
//import Select from 'react-select'
import { useNavigate } from 'react-router-dom'
import './pagestyles/NotesRating.css'

function NotesRating() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState(sessionStorage.getItem('notes'));
  const [startMonth, setSM] = useState(sessionStorage.getItem('startMonth'));
  //const startYear = useRef();
  const [finishMonth, setFM ] = useState(sessionStorage.getItem('finishMonth'));
  //const finishYear = useRef();
  //const currYear = new Date().getFullYear()

  function handleNotes(event) {
    const notes = event.target.value;
    setNotes(notes);
    console.log(notes);
  }

  function handleSM(event) {
    const sm = event.target.value;
    setSM(sm);
    console.log(sm);
  }

  function handleFM(event) {
    const fm = event.target.value;
    setFM(fm);
    console.log(fm);
  }

  function saveData() {
    sessionStorage.setItem('notes',notes);
    sessionStorage.setItem('startMonth',startMonth);
    //sessionStorage.setItem('startYear',startYear);
    sessionStorage.setItem('finishMonth',finishMonth);
    //sessionStorage.setItem('finishYear',finishYear);
    //console.log(notes);
  }

  /*const months = [{January: "January"}, {February: "February"}, {March: "March"}, {April: "April"}, {May: "May"}, {June: "June"}, {July: "July"}, {August: "August"}, {September: "September"}, {October: "October"}, {November: "November"}, {December: "December"}];*/

  return (
    <div className="page-content notes-rating-content">
      <h1 className="title">Book Title</h1>
      <span className="start-date">
        <h3>Started: </h3>
        <select name="start-month" id="" defaultValue={sessionStorage.getItem('startMonth')} onChange={handleSM}>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May>">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
        {/*<select name="finish-year" id="" ref={startYear} defaultValue={sessionStorage.getItem('startYear')}>
          {
            [...Array(30)].map((_,i=currYear) => i-1)
                .map(i => <option key={i} value={i}>{i}</option>)
          }
        </select>*/}
      </span>
      <span className="finish-date">
        <h3>Finished: </h3>
        <select name="finish-month" id="" defaultValue={sessionStorage.getItem('finishMonth')} onChange={handleFM}>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May>">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
        {/*<select name="finish-year" id="" ref={finishYear}>
          {
            [...Array(31)].map((_,i) => i+1)
                .map(i => <option key={i} value={i}>{i}</option>)
          }
        </select>*/}
      </span>
 
      <textarea className="user-notes" defaultValue={sessionStorage.getItem('notes')} onChange={handleNotes}/>
      <button onClick={() => saveData()}>Save</button>
      <button onClick={() => navigate(-1)}>Return to Search Results</button>
      <button onClick={() => {navigate('/reviewnb'); saveData(); }}>Review</button>
    </div>
  )
}

export default NotesRating