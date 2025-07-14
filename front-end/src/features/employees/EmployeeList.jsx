import { useState, useEffect } from "react";
import CreateEmployeeModal from "./CreateEmployeeModal";
import { getEmployees } from "./employeeApi";
import { deleteEmployee } from "./employeeApi";
import "./EmployeeList.css";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [filterText, setFilterText] = useState("");



  // Fetch employees when component mounts
  // and whenever the employee list changes
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees();
      setEmployees(response.data);
    } catch (error) {
      console.error("Failed to load employees:", error);
    }
  };

  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this employee?")) return;

  try {
    await deleteEmployee(id);
    fetchEmployees();
  } catch (err) {
    console.error("Failed to delete:", err);
  }
};
const filteredEmployees = employees.filter(emp =>
  emp.name.toLowerCase().includes(filterText.toLowerCase()) ||
  emp.email.toLowerCase().includes(filterText.toLowerCase()) ||
  (emp.role && emp.role.toLowerCase().includes(filterText.toLowerCase()))
);



  return (
    <div className="employee-list">
      <h2 className="section-title">Manage Employee</h2>
      <h3 className="count">{employees.length} Employees</h3>

      <div className="actions">
       <input
  type="text"
  placeholder="Filter by name, email or role"
  className="filter-input"
  value={filterText}
  onChange={(e) => setFilterText(e.target.value)}
/>
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
  {filteredEmployees.map((emp) => (
    <tr key={emp.id}>
      <td>{emp.name}</td>
      <td>{emp.email}</td>
      <td><span className="status">{emp.status || "Active"}</span></td>
      <td>
        <div className="action-buttons">
          <button className="edit" onClick={() => {
            setEditingEmployee(emp);
            setIsEdit(true);
            setShowModal(true);
          }}>Edit</button>
          <button className="delete" onClick={() => handleDelete(emp.id)}>Delete</button>
        </div>
      </td>
    </tr>
  ))}
</tbody>
      </table>

    {showModal && (
  <CreateEmployeeModal
    onClose={() => {
      setShowModal(false);
      setEditingEmployee(null); // reset
      setIsEdit(false);
    }}
    onEmployeeCreated={fetchEmployees}
    editingEmployee={editingEmployee}
    isEdit={isEdit}
  />
)}

    </div>
  );
};

export default EmployeeList;
