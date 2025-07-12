import { useState } from "react";
import "./CreateEmployeeModal.css"; 

const CreateEmployeeModal = ({ onClose }) => {
  const [employee, setEmployee] = useState({
    name: "",
    phone: "",
    email: "",
    role: "",
    address: "",
  });

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Employee Created:", employee);
    // TODO: call API
    onClose(); 
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Create Employee</h2>
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-group">
            <label>Employee Name</label>
            <input
              name="name"
              value={employee.name}
              onChange={handleChange}
              placeholder="Enter name"
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              name="phone"
              value={employee.phone}
              onChange={handleChange}
              placeholder="Enter phone"
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              name="email"
              value={employee.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <input
              name="role"
              value={employee.role}
              onChange={handleChange}
              placeholder="Enter role"
            />
          </div>

          <div className="form-group full-width">
            <label>Address</label>
            <input
              name="address"
              value={employee.address}
              onChange={handleChange}
              placeholder="Enter address"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Create
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

export default CreateEmployeeModal;
