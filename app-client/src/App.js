import React, {useState, useEffect} from "react";

import './App.css';

function App() {

  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    gender: "male",
    course: "",
  });

  const [list, setList] = useState([])

  useEffect(() => {
    listData();
  }, [])

  const listData = () => {
    fetch('http://localhost:5555/list', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(res => res.json())
      .then(result => setList(result))
      .catch(err => console.log(err))
  }


  const submitHandler = (e) => {
    e.preventDefault();
      fetch('http://localhost:5555/student-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
      })
      .then(res => res.json())
      .then(result => {
        
      })
      .catch(err => console.log(err))

      setTimeout(() => {
        listData();
      }, 1000);
  }



  const changeHandler = (e, key) => {
    let value = e.target.value;
    let objectCopy = {...student};
    objectCopy[key] = value;
    setStudent(objectCopy)
  }

  const form = () => {
    const { firstName, lastName, gender, course} = student;
    return (
      <form onSubmit={submitHandler}>
        <h1 className="text-center">Student information</h1>
        <div className="container">
          <div className="row form-group">
            <div className="col-sm-6 ">
              <label>Enter First Name</label>
              <input type="text" onChange={(e) => changeHandler(e, 'firstName')} value={firstName} className="form-control" />
            </div>

            <div className="col-sm-6 ">
              <label>Enter Last Name</label>
              <input type="text" onChange={(e) => changeHandler(e, 'lastName')} value={lastName} className="form-control" />
            </div>
          </div>


          <div className="row form-group">
            <div className="col-sm-6">
              <label>Gender </label>
              <label><input onChange={(e) => changeHandler(e, 'gender')} checked={gender === 'male'} type="radio" name="gender" id="male" value="male" /> Male</label>
              <label><input onChange={(e) => changeHandler(e, 'gender')} checked={gender === 'female'} type="radio" name="gender" id="female" value="female" /> Female</label>
            </div>
          </div>

          <div className="row form-group">
            <div className="col-sm-6">
              <label>Course </label>
              <select className="form-control" onChange={(e) => changeHandler(e, 'course')} > 
                <option>Please Select</option>
                <option selected={course === "BCA"} value="BCA">BCA</option>
                <option selected={course === "MCA"} value="MCA">MCA</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 text-right">
              <button className="btn btn-primary">Submit</button>
            </div>
          </div>
        </div>
      </form>
    )
  }
  console.log(list);

  const listRecord = () => {
    return (
      <table className="table">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Gender</th>
          <th>Course</th>
        </tr>
      </thead>

      <tbody>
        {list.map((val, i) => {
          return(
            <tr>
              <td>{val.firstName}</td>
              <td>{val.lastName}</td>
              <td>{val.gender}</td>
              <td>{val.course}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
    )
  }
  return (
    <div className="App">
     <h1>Text</h1>
     <div className="form">
      {form()}
     </div>

     <div className="container">
      {listRecord()}
     </div>
    </div>
  );
}

export default App;
