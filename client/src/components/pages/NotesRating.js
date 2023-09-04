import React from 'react'
//import Select from 'react-select'
import './pagestyles/NotesRating.css'

function NotesRating() {

  /*const months = [{January: "January"}, {February: "February"}, {March: "March"}, {April: "April"}, {May: "May"}, {June: "June"}, {July: "July"}, {August: "August"}, {September: "September"}, {October: "October"}, {November: "November"}, {December: "December"}];*/

  return (
    <div className="page-content notes-rating-content">
      <h1 className="title">Book Title</h1>
      <span className="finish-date">
        <h3>Finish Date: </h3>
        <select name="finish-month" id="">
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
        <select name="finish-year" id="">
          {
            [...Array(31)].map((_,i) => i+1)
                .map(i => <option key={i} value={i}>{i}</option>)
          }
        </select>
      </span>
 
      <textarea className="user-notes" type="text" />
    </div>
  )
}

export default NotesRating