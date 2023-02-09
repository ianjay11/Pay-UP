import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../components/sidebar';
import { Outlet } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  
  );
}
