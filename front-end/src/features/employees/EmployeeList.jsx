import { useState } from 'react';
import CreateEmployeeModal from './CreateEmployeeModal';


import './EmployeeList.css';

const employees = [
  { name: "Employee 1", email: "emp1@example.com", status: "Active" },
  { name: "Employee 2", email: "emp2@example.com", status: "Active" },
  { name: "Employee 3", email: "emp3@example.com", status: "Active" },
  { name: "Employee 4", email: "emp4@example.com", status: "Active" },
];



const EmployeeList = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="employee-list">
      <h2 className="section-title">Manage Employee</h2>
      <h3 className="count">4 Employees</h3>

      <div className="actions">
          <input type="text" placeholder="Filter" className="filter-input" />
          <button className="create-btn" onClick={() => setShowModal(true)}>
              + Create Employee
          </button>
      </div>

      <table className="employee-table">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, idx) => (
            <tr key={idx}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>
                <span className="status">{emp.status}</span>
              </td>
              <td>
              <div className="action-buttons">
                <button className="edit">Edit</button>
                <button className="delete">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && <CreateEmployeeModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default EmployeeList;
