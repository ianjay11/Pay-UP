import { Form } from 'react-router-dom';

export default function Withdrawals() {
  return (
    <div className="container-xl px-4" style={{ marginTop: '20px' }}>
      <div className="col-xl-8">
        {/* <!-- Account details card--> */}
        <div className="card mb-4">
          <div className="card-header">Account Details</div>
          <div className="card-body">
            <Form method="post">
              <div className="row gx-2 mb-1">
                {/* <!-- Form Group (username)--> */}
                <div className="col-md-6 mb-3">
                  <label className="small mb-1" htmlFor="inputUsername">
                    Username
                  </label>
                  <input
                    name="username"
                    className="form-control"
                    id="inputUsername"
                    type="text"
                  />
                </div>
              </div>
              {/* <!-- Form Row--> */}
              <div className="row gx-2 mb-1">
                {/* <!-- Form Group (full name)--> */}
                <div className="col-md-6 mb-3">
                  <label className="small mb-1" htmlFor="inputFirstName">
                    First Name
                  </label>
                  <input
                    className="form-control"
                    name="first_name"
                    id="inputFirstName"
                    type="text"
                  />
                </div>

                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputLastName">
                    Last Name
                  </label>
                  <input
                    className="form-control"
                    name="last_name"
                    id="inputLastName"
                    type="text"
                  />
                </div>
                {/* <!-- Form Group (barangay)--> */}
                <div className="col-md-6 mb-3">
                  <label className="small mb-1" htmlFor="inputLastName">
                    Barangay
                  </label>
                  <input
                    className="form-control"
                    name="barangay"
                    id="inputLastName"
                    type="text"
                  />
                </div>
                {/* <!-- Form Group (city)--> */}
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputOrgName">
                    City
                  </label>
                  <input
                    className="form-control"
                    name="city"
                    id="inputOrgName"
                    type="text"
                  />
                </div>
              </div>
              {/* <!-- Form Row        --> */}
              <div className="row gx-2 mb-3">
                {/* <!-- Form Group (region)--> */}
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputLocation">
                    Region
                  </label>
                  <input
                    className="form-control"
                    name="region"
                    id="inputLocation"
                    type="text"
                  />
                </div>

                {/* <!-- Form Group (email address)--> */}
                <div className="col-md-6 mb-1">
                  <label className="small mb-1" htmlFor="inputEmailAddress">
                    Email address
                  </label>
                  <input
                    className="form-control"
                    name="email"
                    id="inputEmailAddress"
                    type="email"
                  />
                </div>
              </div>

              {/* <!-- Form Row--> */}
              <div className="row gx-3 mb-3">
                {/* <!-- Form Group (phone number)--> */}
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputPhone">
                    Phone number
                  </label>
                  <input
                    className="form-control"
                    name="phone_number"
                    id="inputPhone"
                    type="tel"
                  />
                </div>
              </div>
              {/* <!-- Save changes button--> */}
              <button className="btn btn-primary" type="submit">
                Withdraw
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
