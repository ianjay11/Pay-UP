import React from 'react';
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

const App = () => {
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
            alert('Username or Password is incorrect');
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
          action={async ({ request }) => {
            const data = Object.fromEntries(await request.formData());
            console.log(request);
            try {
              if (request.method === 'POST') {
                const {
                  amount,
                  buyer_id,
                  courier_name,
                  courier_tracking,
                  item_description,
                  quantity,
                } = data;
                if (
                  amount &&
                  buyer_id &&
                  courier_name &&
                  courier_tracking &&
                  item_description &&
                  quantity
                ) {
                  await app.post('/deal', data);
                  location.reload();
                } else {
                  alert('Please input all required fields');
                }
              } else if (request.method === 'PUT') {
                await app.put('/deal/', data);
                window.location.reload(true);
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
          path="deals/mypurchases"
          element={<Purchases />}
          loader={async () => {
            try {
              const [purchase, balance] = await Promise.all([
                app.get('/me/deal'),
                app.get('/balance'),
              ]);
              return {
                purchases: purchase.data,
                balance: balance.data,
              };
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
            let counter = 0;
            while (counter < 3) {
              try {
                const [balance, transaction] = await Promise.all([
                  app.get('/balance'),
                  app.get('/transactions'),
                ]);

                if (balance.status === 200 && transaction.status === 200) {
                  return {
                    balance: balance.data,
                    transactions: transaction.data,
                  };
                }
              } catch (err) {
                console.log(err);
                if (err.response.status === 403) {
                  alert('Session is expired');
                  return redirect('/');
                }
              }
              counter++;
            }
            alert('Failed to load data');
            return redirect('/');
          }}
          action={async ({ request }) => {
            const data = Object.fromEntries(await request.formData());
            try {
              if (data.type == 'Cash In') {
                {
                  const { amount, gateway_option } = data;
                  if (amount && gateway_option) {
                    await app.post('/cashIn', data);
                  } else {
                    alert('Please input all required fields');
                  }
                }
              }

            } catch (error) {
              console.log(error);
              throw error;
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
            const {
              first_name,
              last_name,
              barangay,
              city,
              region,
              email,
              phone_number,
              username,
              password,
            } = data;
            if (
              first_name &&
              last_name &&
              barangay &&
              city &&
              region &&
              email &&
              phone_number &&
              username &&
              password
            ) {
              const res = await app.post('/register', data);
              alert('You have Successfully registered');
              return redirect('/');
            } else {
              alert('Please input all required fields');
            }
          } catch (error) {
            console.log(error);
            throw error;
          }
        }}
        errorElement={<SignUp hasError />}
      />,
    ])
  );

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

export default App;
