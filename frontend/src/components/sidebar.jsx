import React from 'react';
import '../app.css';
import { SidebarData } from './sidebardata';
import { Link, useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="Sidebar">
      <div>
        <Link to="/dashboard/home">
          <img id="sidebarlogo" src="/src/assets/4.png" alt="logo" />
        </Link>
      </div>

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
