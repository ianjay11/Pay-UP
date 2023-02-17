import { Form } from 'react-router-dom';
import './sign-up.css';


export function SignUp({ hasError }) {
  return (
    <div className="wrapper">
        <div className="form-left">
            <h2 className="text-uppercase">Hi there!</h2>
            <p>
                Welcome to Pay UP, the secure and easy-to-use digital wallet app that provides a trusted platform for online transactions. To get started, please complete the registration form below. By creating an account with Pay UP, you will gain access to our intermediary service, as well as other unique features that simplify the transaction process and protect both buyers and sellers. Thank you for choosing Pay UP!
            </p>
            <div className="form-field">
                <a href="/"><input type="submit" className="account" value="Already have an Account?"/></a>
            </div>
        </div>
        <Form method="post" action="/sign-up" className="form-right">
            <h2 className="text-uppercase">Registration form</h2>
            <div className="row">
                <div className="col-sm-6 mb-3">
                    <label>First Name</label>
                    <input type="text" name="first_name" className="input-field" required/>
                </div>
                <div className="col-sm-6 mb-3">
                    <label>Last Name</label>
                    <input type="text" name="last_name" className="input-field" required/>
                </div>
                <div className="col-sm-6 mb-3">
                    <label>Barangay</label>
                    <input type="text" name="barangay"className="input-field" required/>
                </div>
                <div className="col-sm-6 mb-3">
                    <label>City</label>
                    <input type="text" name="city"className="input-field" required/>
                </div>
                <div className="col-sm-6 mb-3">
                    <label>Region</label>
                    <input type="text" name="region" className="input-field" required/>
                </div>
                <div className="col-sm-6 mb-3">
                    <label>Phone Number</label>
                    <input type="text" name="phone_number" className="input-field" required/>
                </div>
            </div>
            <div className="mb-3">
                <label>Your Email</label>
                <input type="email" className="input-field" name="email" required/>
            </div>
            <div className="mb-3">
                <label>Username</label>
                <input type="text" name="username" className="input-field" required/>
            </div>
            <div className="mb-3">
                <label>Password</label>
                <input type="password" name="password" className="input-field" required/>
            </div>
            <div className="form-field">
                <input type="submit" value="Register" className="register"/>
            </div>
        </Form>
    </div>
  );
}
