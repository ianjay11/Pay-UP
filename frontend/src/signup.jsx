import { Form } from 'react-router-dom';
import './signup.css';

// {hasError && <p>An error has occurred. Please try again...</p>}

export function SignUp({ hasError }) {
  return (
    <center>
      <section className="main">
        <h1>Sign Up</h1>
        <div className="containers">
          <Form action="/sign-up" method="post">
            <div className="box">
              <div>
                <label htmlFor="firstname"> First Name:</label>
                <input type="text" id="firstname" name="first_name" />
              </div>

              <div>
                <label htmlFor="lastname"> Last Name:</label>
                <input type="text" id="lastname" name="last_name" />
              </div>

              <div>
                <label htmlFor="barangay"> Barangay:</label>
                <input type="text" id="barangay" name="barangay" />
              </div>

              <div>
                <label htmlFor="city"> City:</label>
                <input type="text" id="city" name="city" />
              </div>

              <div>
                <label htmlFor="region"> Region:</label>
                <input type="text" id="region" name="region" />
              </div>

              <div>
                <label htmlFor="Email"> Email:</label>
                <input type="text" id="Email" name="email" />
              </div>
              <label htmlFor="phonenumber">Phone Number:</label>
              <input type="text" id="phonenumber" name="phone_number" />
              <div>
                <label htmlFor="username"> Username:</label>
                <input type="text" id="usernames" name="username" />
              </div>

              <div>
                <label htmlFor="password"> Password:</label>
                <input type="password" id="passwords" name="password" />
              </div>

              <div>
                <input id="signup" type="submit" value="Sign Up" />
              </div>
            </div>
          </Form>
        </div>
        <div>
          <p>
            If you already have an account <a href="/">Click Here</a>
          </p>
        </div>
      </section>
    </center>
  );
}
