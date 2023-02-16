import '../pages/profile.css';
import { Form, useLoaderData } from 'react-router-dom';
import React from 'react';

const Profile = () => {
  const user = useLoaderData();
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
                    defaultValue={user.username}
                    name="username"
                    className="form-control"
                    id="inputUsername"
                    type="text"
                  />
                </div>
                {/* <!-- Form Group (use id)--> */}
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputPhone">
                    User ID
                  </label>
                  <input
                    disabled
                    className="form-control"
                    name="user_id"
                    id="inputPhone"
                    type="text"
                    defaultValue={user.user_id}
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
                    defaultValue={user.first_name}
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
                    defaultValue={user.last_name}
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
                    defaultValue={user.barangay}
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
                    defaultValue={user.city}
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
                    defaultValue={user.region}
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
                    defaultValue={user.email}
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
                    defaultValue={user.phone_number}
                  />
                </div>
              </div>
              {/* <!-- Save changes button--> */}
              <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Edit
              </button>
              <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">
                        Confirmation
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">Are you sure you want to edit?</div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="submit" reset="button" className="btn btn-primary" data-bs-dismiss="modal">
                        Confirm Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
