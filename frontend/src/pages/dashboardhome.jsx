import '../pages/dashboardhome.css';
import { Form } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';

export default function Home() {
  const { balance } = useLoaderData();

  return (
    <div className="d-flex" id="container2">
      <div className="card text-center mb-5" id="balance">
        <div className="card-body mb-3">
          <h5 className="card-title">Balance</h5>
          <p className="card-text mt-3 mb-4">{0 + balance}</p>
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
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Cash In Details
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
                    <input className="form-control" name="amount" type="text" />
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
      <Form method="post" action={`/dashboard/home`}>
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
                    <input className="form-control" name="amount" type="text" />
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
                  value="withdraw"
                  name="type"
                >
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}
