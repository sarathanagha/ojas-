import React from 'react';
import './App.css';
import data from "./data.json";

// Importing employees list from a json file
// creating an object map for managers(including the root employee/CEO)  
// by their employee id and assigning the list of direct reportees

let empList = {};
let totalSalary = 0;
data.data.reduce((acc, obj)=>{ 
  totalSalary+=obj.salary; 
  let finalObj = { ...acc, [obj.id]: obj }
  let managerId = obj.managerId;
  if(managerId) {
    empList[managerId] = empList[managerId] || [];
    empList[managerId].push(obj);
  } else {
    // This is for the root employee(if managerId is null assuming it as a root employee),
    // Boss is the key used for better identification
    empList['Boss'] = obj;
  }
  return finalObj;
}, {})

// This component renders name of the employee and if the employee has reportees then a it displays sub header
const Employee = ({ name, showSubHeader }) => (<div> {name} <br/> { showSubHeader && `Employees of : ${ name }` } </div>)

// This component is a recursive component, to render list of employees and if the employee has reportees 
// it will call the same component recursively
const EmployeeList= ({ empList={}, id }) => {
  // Sorting the employees by their name
  let list = empList[id].sort((emp1, emp2)=> emp1.empName>emp2.empName ? 1 : -1)
  return list.map(emp => {  
    return (
      <div key={emp.empName} style={{"marginLeft": "25px", "marginTop": "10px"}}>
          <Employee name={emp.empName} showSubHeader={empList[emp.id]}/>
          { empList[emp.id] && <EmployeeList empList={empList} id={emp.id} /> }
      </div>
    )
  })
}

function App() {
  return (
      <div className="App-header">
          <Employee name={empList.Boss.empName} showSubHeader={empList[empList.Boss.id]}/>
          { empList[empList.Boss.id] && <EmployeeList empList={empList} id={empList.Boss.id}/> }
          <div className="salary"> Total salary: ${totalSalary} </div>
      </div>
  );
}

export default App;
