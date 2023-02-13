import React from 'react';
import ReactDOM from 'react-dom/client';
import { Login } from './login';
import { SignUp } from './signup';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
} from 'react-router-dom';
import Dashboard from './pages/dashboard';
import app from '../lib/axios-config';
import Profile from './pages/Profile';
import Deals from './pages/Deals';
import Purchases from './pages/mypurchases';
import Home from './pages/dashboardhome';

if (localStorage.getItem('token')) {
  app.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
    'token'
  )}`;
}

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route
      path="/"
      element={<Login />}
      action={async ({ request }) => {
        const data = Object.fromEntries(await request.formData());
        try {
          const res = await app.post('/login', data);
          localStorage.setItem('token', res.data.token);
          app.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${res.data.token}`;
          return redirect('/dashboard/home');
        } catch (err) {
          console.log(err);
          throw err;
        }
      }}
      errorElement={<Login hasError />}
    />,
    <Route path="dashboard" element={<Dashboard />}>
      <Route
        path="profile"
        element={<Profile />}
        loader={async () => {
          try {
            const res = await app.get('/users/me');
            return res.data;
          } catch (err) {
            console.log(err);
            throw err;
          }
        }}
        action={async ({ request }) => {
          const data = Object.fromEntries(await request.formData());
          try {
            await app.put('/users/me', data);
          } catch (error) {
            console.log(error);
            throw err;
          }
          return null;
        }}
      />
      ,
      <Route
        path="deals"
        element={<Deals />}
        loader={async () => {
          try {
            const res = await app.get('/dealme');
            return res.data;
          } catch (err) {
            console.log(err);
          }
          return null;
        }}
        action={async ({ request }) => {
          const data = Object.fromEntries(await request.formData());
          console.log(request);
          try {
            if (request.method === 'POST') {
              await app.post('/deal', data);
            } else if (request.method === 'PUT') {
              await app.put('/deal/', data);
            }
          } catch (error) {
            console.log(error);
            throw err;
          }
          return null;
        }}
      />
      ,
      <Route
        path="deals/:id"
        action={async ({ request, params }) => {
          const data = Object.fromEntries(await request.formData());
          try {
            await app.put(`/deal/${params.id}`, data);
          } catch (error) {
            console.log(error);
            throw error;
          }
          return redirect(`/dashboard/deals`);
        }}
      />
      ,
      <Route
        path="deals/mypurchases/"
        element={<Purchases />}
        loader={async () => {
          try {
            const res = await app.get('/me/deal');
            return res.data;
          } catch (err) {
            console.log(err);
          }
          return null;
        }}
      />
      ,
      <Route
        path="home"
        element={<Home />}
        loader={async () => {
          try {
            const res = await app.get('/balance');
            return res.data;
          } catch (err) {
            console.log(err);
            throw err;
          }
        }}
        action={async ({ request }) => {
          const data = Object.fromEntries(await request.formData());
          try {
            if (data.type == 'Cash In') {
              await app.post('/cashIn', data);
            } else if (data.type == 'withdraw') {
              await app.post('/withdraw', data);
            }
          } catch (error) {
            console.log(error);
            throw err;
          }
          return null;
        }}
      />
    </Route>,

    <Route
      path="sign-up"
      element={<SignUp />}
      action={async ({ request }) => {
        const data = Object.fromEntries(await request.formData());
        try {
          console.log(data);
          const res = await app.post('/register', data);
          console.log(res.data.token);
          return redirect('/login');
        } catch (err) {
          console.error(err);
          throw err;
        }
      }}
      errorElement={<SignUp hasError />}
    />,
  ])
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
