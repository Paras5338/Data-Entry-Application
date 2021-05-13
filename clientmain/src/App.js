import React, { useState, useEffect } from "react";
import './App.css';
import Axios from 'axios';



function App() {

  const [studName,setstudName] = useState("");
  const [detail,setdetail] = useState("");
  const [studDetailList,setstudList] =useState([]);
  const [newdetail, setnewdetail]=useState("");


  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((Response) =>{
      setstudList(Response.data)
    });
  },[]);

  const submitdetail=() =>{
    Axios.post("http://localhost:3001/api/insert", {
      studName: studName,
      studDetail: detail,
    });

      setstudList([...studDetailList,
         {studName: studName, studDetail: detail },
        ]);

  };


  const deletedetail = (stud) => {
    Axios.delete(`http://localhost:3001/api/delete/${stud}`);
  }

  const updatedetail = (stud) => {
    Axios.put("http://localhost:3001/api/update",{
      studName: stud,
      studDetail: newdetail,
    });
    setnewdetail("")
  }

  return (
  <div className="App">
  <h1>Data Entry Application</h1>
    <div className="form">
      <label>Student Name:</label>
      <input type="text" name="studName"  
        onChange={(e)=>{
        setstudName(e.target.value);
      }}/>

      <label>Student Detail:</label>
      <input type="text" name="detail"
        onChange={(e)=>{
        setdetail(e.target.value);
      }}/> 


      <button onClick={submitdetail}>Submit</button>

      {studDetailList.map((val) => {

        return (
          <div class="flip-card">
            <div class="flip-card-inner">
            <div class="flip-card-front">
            <h1>{val.studName}</h1> 
            </div>
            <div class="flip-card-back">
            <h1>{val.studName}</h1> 
            <p>{val.studDetail}</p>
  

            <button onClick ={ () => {deletedetail(val.studName)}}>Delete</button>
            <input type="text" id="updateInput" onChange={(e) =>{
              setnewdetail(e.target.value)
            }} />
           <button on onClick = { () => {updatedetail(val.studName)}}>Update</button>
           </div>
          </div>
          </div>
        );
      })}
    </div>
</div>
);
}

export default App;
