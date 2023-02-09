import React from 'react';
import '../app.css';
import { SidebarData } from './sidebardata';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="Sidebar">
      <ul className="sidebarList">
        {SidebarData.map((val, key) => {
          return (
            <li
              key={key}
              className="row"
              onClick={() => {
                window.location.pathname = val.link;
              }}
            >
              <div>
                {val.icon} {val.title}
              </div>
            </li>
          );
        })}
        <li>
          <button id="logout" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
