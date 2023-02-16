import '../pages/deals.css';
import { Form } from 'react-router-dom';
import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import app from '../../lib/axios-config';

function Deals() {
  const [deals, setDeals] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const navigate = useNavigate();
  const [itemId, setItemId] = useState();
  const item = useMemo(() => deals?.find((d) => d.deal_id == itemId), [itemId]);
  const [select, setSelect] = useState();

  async function deleteDeal(deal_id) {
    await app.delete('/deal/' + deal_id);
    navigate(0);
  }

  useEffect(() => {
    const init = async () => {
      const res = await app.get(`/dealme/${selectedStatus}`);
      if (res.status == 200) {
        setDeals(res.data);
      }
    };
    init();
  }, [selectedStatus]);

  return (
    <section className="bg-light p-1 container-bordered" id="container">
      {/* start nav */}
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a
            className="nav-link active"
            aria-current="page"
            href="deals"
            id="active"
          >
            My Deals
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" aria-current="page" href="deals/mypurchases">
            My Purchases
          </a>
        </li>
      </ul>
      <div>
        {/* end nav */}
        <div className="d-flex mb-2 mt-2">
          <h3 className="mt-3 flex-grow-1">Created Deals</h3>
          <button
            type="button"
            className="btn btn-primary m-2 mx-2"
            data-bs-toggle="modal"
            data-bs-target="#createDeal"
          >
            Create Deal
          </button>
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle p-2 m-2 mx-3"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {selectedStatus}
            </button>
            <ul className="dropdown-menu">
              {['ALL', 'PENDING', 'ONGOING', 'COMPLETED', 'DECLINED'].map(
                (item) => (
                  <li className="dropdown-item text-center">
                    <a onClick={() => setSelectedStatus(item)}>{item}</a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/*------------------------ create deal modal------------------------- */}
        <Form method="post" action="/dashboard/deals">
          <div
            className="modal fade"
            id="createDeal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Create Deal
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  {/* <!-- Form Group (item description)--> */}
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="inputUsername">
                      Item Description
                    </label>
                    <input
                      name="item_description"
                      className="form-control"
                      id="inputUsername"
                      type="text"
                    />
                  </div>
                  {/* <!-- Form Row--> */}
                  <div className="row gx-3 mb-3">
                    {/* <!-- Form Group (courier name)--> */}
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputFirstName">
                        Courier Name
                      </label>
                      <select
                        className="form-select form-select-lg mb-3"
                        aria-label="Default select example"
                        name="courier_name"
                      >
                        <option value="J&T">J&T</option>
                        <option value="LBC">LBC</option>
                        <option value="Black Arrow Express">
                          Black Arrow Express
                        </option>
                        <option value="JRS Express">JRS Express</option>
                        <option value="Ninja Van Integrated">
                          Ninja Van Integrated
                        </option>
                        <option value="DHL">DHL</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputLastName">
                        Quantity
                      </label>
                      <input
                        className="form-control"
                        name="quantity"
                        id="inputLastName"
                        type="text"
                      />
                    </div>
                    {/* <!-- Form Group (amount)--> */}
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputLastName">
                        Amount
                      </label>
                      <input
                        className="form-control"
                        name="amount"
                        id="inputLastName"
                        type="text"
                      />
                    </div>
                    {/* <!-- Form Group (courier tracking)--> */}
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputOrgName">
                        Courier Tracking
                      </label>
                      <input
                        className="form-control"
                        name="courier_tracking"
                        id="inputOrgName"
                        type="text"
                      />
                    </div>
                    {/* <!-- Form Group (buyer id)--> */}
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputOrgName">
                        Buyer ID
                      </label>
                      <input
                        className="form-control"
                        name="buyer_id"
                        id="inputOrgName"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                    type="submit"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Form>
        {/* -----------------------create deal modal end---------------------------------- */}

        {/* -------------------------------------table ----------------------------------------*/}
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
                    data-title="First Name"
                  >
                    {item.courier_name}
                  </td>
                  <td
                    className="text-center"
                    scope="row"
                    data-title="Last Name"
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
                  <td className="text-center PX-1">
                    <button
                      href="#"
                      className="btn btn-success"
                      data-bs-toggle="modal"
                      data-bs-target="#editModal"
                      disabled={
                        item.status != 'PENDING' && item.status != 'DECLINED'
                      }
                      onClick={() => {
                        setItemId(item.deal_id);
                        setSelect(item.courier_name);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger ms-1"
                      disabled={item.status != 'PENDING'}
                      onClick={() => deleteDeal(item.deal_id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/*------------------------------ table end ------------------------------------*/}

      {/* edit deal modal */}
      {
        <Form method="put" action={`/dashboard/deals/${itemId}`}>
          <div
            className="modal fade"
            id="editModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Edit Deal
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  {/* <!-- Form Group (item description)--> */}
                  <div className="mb-3">
                    <label className="small mb-1">Item Description</label>
                    <input
                      defaultValue={item?.item_description}
                      name="item_description"
                      className="form-control"
                      id="inputUsername"
                      type="text"
                    />
                  </div>
                  {/* <!-- Form Row--> */}
                  <div className="row gx-3 mb-3">
                    {/* <!-- Form Group (courier name)--> */}
                    <div className="col-md-6">
                      <label className="small mb-1">Courier Name</label>
                      <select
                        value={select}
                        onChange={(e) => setSelect(e.target.value)}
                        className="form-select form-select-lg mb-3"
                        aria-label="Default select example"
                        name="courier_name"
                      >
                        <option value="J&T">J&T</option>
                        <option value="LBC">LBC</option>
                        <option value="Black Arrow Express">
                          Black Arrow Express
                        </option>
                        <option value="JRS Express">JRS Express</option>
                        <option value="Ninja Van Integrated">
                          Ninja Van Integrated
                        </option>
                        <option value="DHL">DHL</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="small mb-1">Quantity</label>
                      <input
                        defaultValue={item?.quantity}
                        className="form-control"
                        name="quantity"
                        type="text"
                      />
                    </div>
                    {/* <!-- Form Group (amount)--> */}
                    <div className="col-md-6">
                      <label className="small mb-1">Amount</label>
                      <input
                        defaultValue={item?.amount}
                        className="form-control"
                        name="amount"
                        type="text"
                      />
                    </div>
                    {/* <!-- Form Group (courier tracking)--> */}
                    <div className="col-md-6">
                      <label className="small mb-1">Courier Tracking</label>
                      <input
                        defaultValue={item?.courier_tracking}
                        className="form-control"
                        name="courier_tracking"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                    type="submit"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Form>
        /* --------------------------------modal end for edit Deal----------------------------- */
      }
    </section>
  );
}

export default Deals;
