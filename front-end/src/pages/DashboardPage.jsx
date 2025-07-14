import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import EmployeeList from '../features/employees/EmployeeList';
import MessageBox from '../features/chat/MessageBox'; 
import TaskManager from '../features/tasks/TaskManager'; 
import './DashboardPage.css';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('employee'); // default tab
  const role = localStorage.getItem('userRole'); 

 const renderContent = () => {
    if (activeTab === 'employee') {
      return role === 'admin' ? <EmployeeList /> : <p>You don't have permission to view employees.</p>;
    }
    if (activeTab === 'message') return <MessageBox />;
    if (activeTab === 'task') return <TaskManager />;
    return null;
  };

  return (
    <div className="dashboard-container">
    <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} role={role} />
    <div className="dashboard-main">
      <Header />
      <main className="dashboard-content">
        {renderContent()}
      </main>
    </div>
  </div>
  
  );
};

export default DashboardPage;
