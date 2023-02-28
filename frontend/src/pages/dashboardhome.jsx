import '../pages/dashboardhome.css';
import { Form, useNavigate } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
import app from '../../lib/axios-config';
import { useState, useRef, useEffect } from 'react';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css';
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js';

export default function Home() {
  const { balance, transactions } = useLoaderData();
  const newbal = Number(balance.balance).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const [cashOut, setCashOut] = useState({ amount: 0, gateway_option: 'Bank' });
  const navigate = useNavigate();
  const updatedAmount = Number(cashOut.amount).toFixed(2);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);

  useEffect(() => {
    $(startDateRef.current).datepicker({
      format: 'yyyy-mm-dd',
    });
    $(endDateRef.current).datepicker({
      format: 'yyyy-mm-dd',
    });
  }, []);

  const handleSubmit = async () => {
    console.log(startDateRef.current.value, endDateRef.current.value);
    if (startDateRef.current.value && endDateRef.current.value) {
      const result = await app.get('/transactions', {
        params: {
          startDate: startDateRef.current.value,
          endDate: endDateRef.current.value,
        },
      });
      if (result.status == 200) {
        setFilteredTransactions(result.data);
        console.log(result);
      }
    }
  };

  useEffect(() => {
    const startDateInput = startDateRef.current;
    const endDateInput = endDateRef.current;

    startDateInput.setAttribute('max', endDateInput.value);
    endDateInput.setAttribute('min', startDateInput.value);

    setIsButtonDisabled(
        new Date(startDateInput.value) > new Date(endDateInput.value)
    );
  }, [startDateRef, endDateRef]);

  const handleInputChange = () => {
    const startDateInput = startDateRef.current;
    const endDateInput = endDateRef.current;

    startDateInput.setAttribute('max', endDateInput.value);
    endDateInput.setAttribute('min', startDateInput.value);

    setIsButtonDisabled(
        new Date(startDateInput.value) > new Date(endDateInput.value)
    );
  };

  const withdraw = async (event) => {
    if (cashOut.amount && cashOut.gateway_option && newbal < updatedAmount) {
      alert('Insufficient Balance');
      setCashOut({ amount: 0, gateway_option: 'Bank' });
      return;
    }
    if (cashOut.amount && cashOut.gateway_option && newbal >= updatedAmount) {
      console.log('withdraw successful');
      await app.post('/withdraw', cashOut);
      navigate(0);
    } else {
      alert('Please input required fields');
      setCashOut({ amount: 0, gateway_option: 'Bank' });
    }
    event.persist();
  };

  const handleChange = (event) => {
    setCashOut({ ...cashOut, [event.target.name]: event.target.value });
  };

  return (
    <div className="d-flex flex-column" id="container2">
      <div className="card text-center mb-5" id="balance">
        <div className="card-body mb-3">
          <h5 className="card-title">Wallet Balance</h5>
          <p className="card-text mt-3 mb-4"> &#8369; {newbal}</p>
          <button
            className="btn btn-outline-danger mx-3"
            data-bs-toggle="modal"
            data-bs-target="#CashIn"
          >
            Cash In
          </button>
          <button
            className="btn btn-outline-danger"
            data-bs-toggle="modal"
            data-bs-target="#CashOut"
          >
            Cash Out
          </button>
        </div>
      </div>

      {/* --------------------modal for Cash In ------------------*/}
      <Form method="post" action={`/dashboard/home`}>
        <div
          className="modal fade"
          id="CashIn"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5">Cash In Details</h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {/* <!-- Form Group (item description)--> */}
                {/* <!-- Form Row--> */}
                <div className="row gx-3 mb-3">
                  <div className="col-md-6">
                    <label className="small mb-1">Amount</label>
                    <input
                      id="validationCustom03"
                      className="form-control"
                      name="amount"
                      type="text"
                    />
                  </div>
                  {/* <!-- Form Group (courier name)--> */}
                  <div className="col-md-6">
                    <label className="small mb-1">Gateway Payment Option</label>
                    <select
                      className="form-select form-select-lg mb-3"
                      aria-label="Default select example"
                      name="gateway_option"
                    >
                      <option value="Bank">Bank</option>
                      <option value="Coins.ph">Coins.ph</option>
                      <option value="Gcash">Gcash</option>
                      <option value="Maya">Maya</option>
                      <option value="Paypal">Paypal</option>
                    </select>
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
                  value="Cash In"
                  name="type"
                >
                  Cash In
                </button>
              </div>
            </div>
          </div>
        </div>
      </Form>

      {/* --------------------modal for Cash Out ------------------*/}

      <div
        className="modal fade"
        id="CashOut"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Withdrawal Details
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
              {/* <!-- Form Row--> */}
              <div className="row gx-3 mb-3">
                <div className="col-md-6">
                  <label className="small mb-1">Amount</label>
                  <input
                    onChange={(event) => handleChange(event)}
                    className="form-control"
                    name="amount"
                    type="number"
                    required
                  />
                </div>
                {/* <!-- Form Group (courier name)--> */}
                <div className="col-md-6">
                  <label className="small mb-1">Gateway Payment Option</label>
                  <select
                    onChange={(event) => handleChange(event)}
                    className="form-select form-select-lg mb-3"
                    aria-label="Default select example"
                    name="gateway_option"
                    required
                  >
                    <option value="Bank">Bank</option>
                    <option value="Coins.ph">Coins.ph</option>
                    <option value="Gcash">Gcash</option>
                    <option value="Maya">Maya</option>
                    <option value="Paypal">Paypal</option>
                  </select>
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
                name="type"
                onClick={() => withdraw()}
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="table-responsive shadow p-3 mb-5 bg-body-tertiary rounded w-100"
        id="table2"
      >
        {/* -------------------Search Transactions----------------------- */}
        <Form method="post" action={`/dashboard/home`}>
          <section className="d-flex mb-2 mt-2">
            <h3>Transaction History</h3>
            <div className="input-group input-daterange" id="search">
              <input
                id="start"
                placeholder="Start Date"
                type="date"
                name="startDate"
                className="form-control"
                ref={startDateRef}
                max={endDateRef.current?.value}
                required
                onChange={handleInputChange}
              />
              <input
                id="end"
                placeholder="End Date"
                type="date"
                name="endDate"
                className="form-control"
                ref={endDateRef}
                min={startDateRef.current?.value}
                required
                onChange={handleInputChange}
              />
              <button
                className="btn btn-primary"
                type="submit"
                value="Request"
                name="type"
                onClick={handleSubmit}
                disabled={isButtonDisabled}
              >
                Request
              </button>
            </div>
          </section>
        </Form>

        <table className="table table-striped table-bordered">
          <thead>
            <tr className="text-center">
              <th>Payment From/To</th>
              <th>Transaction Type</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((item, index) => (
              <tr key={index}>
                <td
                  className="text-center"
                  scope="row"
                  data-title="Paymemt Option"
                >
                  {item.gateway_option}
                </td>
                <td
                  className="text-center"
                  scope="row"
                  data-title="Transaction Type"
                >
                  {item.transaction_type}
                </td>

                <td
                  className="text-center"
                  scope="row"
                  data-title="Amount"
                  style={{
                    color:
                      item.transaction_type === 'Deposit' ||
                      item.transaction_type === 'Sell'
                        ? 'green'
                        : 'red',
                  }}
                >
                  {`${
                    item.transaction_type === 'Deposit' ||
                    item.transaction_type === 'Sell'
                      ? '+'
                      : '-'
                  } ${item.amount}`}
                </td>

                <td className="text-center" scope="row" data-title="Date">
                  {item.inserted_at}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
