import '../pages/deals.css';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import app from '../../lib/axios-config';
import { useNavigate } from 'react-router-dom';

export default function Purchases() {
  const purchases = useLoaderData();
  const navigate = useNavigate();
  const updateStatus = async (status, id) => {
    try {
      const res = await app.put(`/me/deal_status/${id}`, { status });
      navigate(0);
    } catch (error){
      console.log(error)
    }
  };

const receive = async (deal_id) => {
  try {
    const res = await app.post(`/receive/${deal_id}`)
    
  } catch (error) {
    console.log(error);
  }
}

const accept = async (deal_id) => {
  try {
    const res = await app.post(`/accept/${deal_id}`)
  } catch (error) {
    console.log(error);
  }
}


  return (
    <section className="bg-light p-1 container-bordered" id="purcontainer">
      {/* start nav */}
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className="nav-link" aria-current="page" href="/dashboard/deals">
            My Deals
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link active"
            aria-current="page"
            href="mypurchases"
            id="active"
          >
            My Purchases
          </a>
        </li>
      </ul>
      {/* end nav */}
      <div
        className="table-responsive shadow p-3 mb-5 bg-body-tertiary rounded"
        id="table"
      >
        <h3 className="mb-3">My Purchases</h3>
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
            {purchases.map((item, index) => (
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
                  {item.status == 'ONGOING' || item.status == 'COMPLETED'? (
                    <button
                      className="btn btn-primary"
                      disabled={item.status == 'COMPLETED'}
                      onClick={() => {updateStatus(`COMPLETED`, item.deal_id); receive(item.deal_id)}}
                    >
                    RECEIVED
                    </button>
                  ) : (
                    <>
                      <button
                        className="btn btn-primary"
                        disabled={item.status != 'PENDING'}
                        onClick={() => {updateStatus(`ONGOING`, item.deal_id); accept(item.deal_id)}}
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-danger ms-1"
                        disabled={item.status != 'PENDING'}
                        onClick={() => updateStatus(`DECLINED`, item.deal_id)}
                      >
                        <i className="fa fa-trash"></i>Decline
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
