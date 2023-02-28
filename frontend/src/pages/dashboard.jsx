import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router-dom';
import app from '../../lib/axios-config';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';

export default function Dashboard() {
  const navigate = useNavigate();
  const [token, setToken] = useState(undefined)

  useEffect(() => {
    const init = async () => {
      const token = await localStorage.getItem('token');
      try {
        const res = await app.get('/verify');
        if (res.status == '200') {
          setToken(token)
          localStorage.setItem('token', token);
          return;
        }
      } catch (error) {
        navigate('/');
      }
    };
    init();
  }, [token]);

  return (
    <div style={{marginTop: "-20px"}}>
      <Navbar/>
      <Outlet />
    </div>
  );
}
