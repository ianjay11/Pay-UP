import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../components/sidebar';
import { Outlet } from 'react-router-dom';
import app from '../../lib/axios-config';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    const init = async () => {
      const token = await localStorage.getItem('token');
      try {
        const res = await app.get('/verify');
        if (res.status == '200') {
          localStorage.setItem('token', token);
          return;
        }
      } catch (error) {
        navigate('/');
      }
    };
    init();
  }, []);
  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  );
}
