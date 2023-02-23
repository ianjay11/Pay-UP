import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import '/src/components/navbar.css'

export default function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" id='navcontainer1'>
      <div className="container-fluid" id='navcontainer2'>
        <a href="/dashboard/home"><img className="my-2" src="/src/assets/1.png" alt="logo"  id="logo"/></a>    
        <div className="d-flex mx-5" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link mx-3" href="/dashboard/home" id='navnames'>
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link mx-4" href="/dashboard/deals" id='navnames'>
                Deals
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
              id='navnames'
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                <AccountCircleIcon />
              </a>
              <ul className="dropdown-menu" style={{marginLeft: "-50px"}}>
                <li>
                  <a className="dropdown-item" href="/dashboard/profile">
                    Profile
                  </a>
                </li>
                <li className="dropdown-item" style={{cursor: "pointer"}} onClick={() => handleLogout()}>
                    Logout
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
