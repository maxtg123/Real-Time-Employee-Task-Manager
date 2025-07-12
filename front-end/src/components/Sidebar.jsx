import './Sidebar.css';

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Manager Panel</h2>
      <nav className="sidebar-menu">
        <div
          className={`menu-item ${activeTab === 'employee' ? 'active' : ''}`}
          onClick={() => setActiveTab('employee')}
        >
          Manage Employee
        </div>
        <div
          className={`menu-item ${activeTab === 'task' ? 'active' : ''}`}
          onClick={() => setActiveTab('task')}
        >
          Manage Task
        </div>
        <div
          className={`menu-item ${activeTab === 'message' ? 'active' : ''}`}
          onClick={() => setActiveTab('message')}
        >
          Message
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
