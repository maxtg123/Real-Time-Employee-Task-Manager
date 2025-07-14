import axiosInstance from '../../services/axiosInstance';

export const createEmployee = (employeeData) =>
  axiosInstance.post('/employees/create', employeeData);

export const getEmployees = () =>
  axiosInstance.get('/employees');

export const deleteEmployee = (employeeId) =>
  axiosInstance.post('/employees/delete', { employeeId });

export const getEmployeeById = (employeeId) =>
  axiosInstance.post('/employees/get', { employeeId });

export const updateEmployee = (employeeData) =>
  axiosInstance.post('/employees/update', employeeData);
