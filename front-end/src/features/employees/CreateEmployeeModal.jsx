import { useState, useEffect } from "react";
import "./CreateEmployeeModal.css";
import { createEmployee,updateEmployee  } from "./employeeApi"; 

const CreateEmployeeModal = ({ onClose, onEmployeeCreated,editingEmployee = null, isEdit = false   }) => {
  const [employee, setEmployee] = useState({
    name: "",
    phone: "",
    email: "",
    role: "",
    address: "",
  });

  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);     
  // Set initial values if editing
   useEffect(() => {
    if (editingEmployee) {
      setEmployee(editingEmployee);
    }
  }, [editingEmployee]);
  

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Employee Created:", employee);
    // TODO: call API
    // TODO: Gọi API tạo nhân viên nếu cần
    onClose(); 
  try {
      if (isEdit) {
        await updateEmployee({ ...employee, employeeId: editingEmployee.id });
        console.log(" Employee Updated:", employee);
      } else {
        await createEmployee(employee);
        console.log(" Employee Created:", employee);
      }
      onClose();
      onEmployeeCreated();
    } catch (err) {
      console.error(" Failed:", err);
      setError("Operation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>{isEdit ? "Edit Employee" : "Create Employee"}</h2>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-group">
            <label>Employee Name</label>
            <input
              name="name"
              value={employee.name}
              onChange={handleChange}
              placeholder="Enter name"
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              name="phone"
              value={employee.phone}
              onChange={handleChange}
              placeholder="Enter phone"
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              name="email"
              value={employee.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <input
              name="role"
              value={employee.role}
              onChange={handleChange}
              placeholder="Enter role"
              required
            />
          </div>

          <div className="form-group full-width">
            <label>Address</label>
            <input
              name="address"
              value={employee.address}
              onChange={handleChange}
              placeholder="Enter address"
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn" disabled={loading}>
               {loading ? (isEdit ? "Updating..." : "Creating...") : (isEdit ? "Update" : "Create")}
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEmployeeModal ;
