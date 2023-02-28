import '../pages/deals.css';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import app from '../../lib/axios-config';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Purchases() {
  const  balance  = useLoaderData();
  const bal = balance.balance;
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [deals, setDeals] = useState([]);

  const navigate = useNavigate();
  const updateStatus = async (status, id) => {
    try {
      const res = await app.put(`/me/deal_status/${id}`, { status });
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };

  const receive = async (deal_id) => {
    try {
      const res = await app.post(`/receive/${deal_id}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const init = async () => {
      const res = await app.get(`/purchaseme/${selectedStatus}`);
      if (res.status == 200) {
        setDeals(res.data);
      }
    };
    init();
  }, [selectedStatus]);

  const accept = async (deal_id, amount) => {
    try {
      if (bal >= amount) {
        const res = await app.post(`/accept/${deal_id}`);
      } else {
        alert('Insufficient balance');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="bg-light p-1 container-bordered" id="purcontainer">
      {/* start nav */}
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className="nav-link" aria-current="page" href="/dashboard/deals">
            Deals
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link active"
            aria-current="page"
            href="mypurchases"
            id="active"
          >
            Purchases
          </a>
        </li>
      </ul>
      {/* end nav */}
      <div className="d-flex mb-2 mt-2">
        <h3 className="mb-2 my-2 flex-grow-1">My Purchases</h3>
        <div className="dropdown mx-4 my-2">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {selectedStatus}
            </button>
            <ul className="dropdown-menu">
              {['ALL', 'PENDING', 'ONGOING', 'COMPLETED', 'DECLINED'].map(
                (item) => (
                  <li key={item} className="dropdown-item text-center">
                    <a
                      style={{ cursor: 'pointer' }}
                      onClick={() => setSelectedStatus(item)}
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
          </div>
      <div
        className="table-responsive shadow p-3 mb-5 bg-body-tertiary rounded"
        id="table"
      >
        <table className="table table-striped table-bordered">
          <thead>
            <tr className="text-center">
              <th>Item Description</th>
              <th>Courier Name</th>
              <th>Tracking Number</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((item, index) => (
              <tr key={index}>
                <td scope="row" data-title="Item Description">
                  {item.item_description}
                </td>
                <td
                  className="text-center"
                  scope="row"
                  data-title="Courier Name"
                >
                  {item.courier_name}
                </td>
                <td
                  className="text-center"
                  scope="row"
                  data-title="Tracking Number"
                >
                  {item.courier_tracking}
                </td>
                <td className="text-center" scope="row" data-title="Quantity">
                  {item.quantity}
                </td>
                <td className="text-center" scope="row" data-title="Amount">
                  {item.amount}
                </td>
                <td className="text-center" scope="row" data-title="Status">
                  {item.status}
                </td>
                <td className="text-center">
                  {item.status == 'ONGOING' || item.status == 'COMPLETED' ? (
                    <button
                      className="btn btn-primary"
                      disabled={item.status == 'COMPLETED'}
                      onClick={() => {
                        updateStatus(`COMPLETED`, item.deal_id);
                        receive(item.deal_id);
                      }}
                    >
                      RECEIVED
                    </button>
                  ) : (
                    <>
                      <button
                        className="btn btn-primary"
                        disabled={
                          item.status !== 'PENDING' || item.amount > bal
                        }
                        onClick={() => {
                          updateStatus(`ONGOING`, item.deal_id);
                          accept(item.deal_id, item.amount);
                        }}
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-danger ms-1"
                        disabled={item.status != 'PENDING'}
                        onClick={() => updateStatus(`DECLINED`, item.deal_id)}
                      >
                        Decline
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* table end */}
      </div>
    </section>
  );
}
