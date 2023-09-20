import React, { useEffect } from 'react';


function AddToCols() {

  useEffect(() => {
    fetch('/getcollections');
  },[]);

  return (
    <div className='page-content'>
      <form action="" className="select-cols">
        <input type="checkbox" />
      </form>
    
    </div>
  )
}

export default AddToCols;