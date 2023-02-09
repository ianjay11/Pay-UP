import { Form, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';
import { useEffect, useState } from 'react';

export function Login({ hasError }) {
  const [user, setUser] = useState(undefined);
  const navigate = useNavigate();
  useEffect(() => {
    const init = async () => {
      const currentUser = await localStorage.getItem('user');
      setUser(JSON.parse(currentUser));
      if (currentUser) {
        navigate('/dashboard', { replace: true });
      }
    };
    init();
  }, []);

  return (
    <section class="gradient-form" style={{ backgroundColor: '#eee' ,marginLeft: '-300px'}}>
      <div class="container py-5">
        <div class="row d-flex justify-content-center align-items-center">
          <div class="col-xl-8">
            <div class="card rounded-3 text-black">
              <div class="row g-0">
                <div class="col-lg-6">
                  <div class="card-body p-md-6 mx-md-5">
                    <div class="text-center">
                      <img
                        src="./src/assets/3.png"
                        style={{ width: '100px' }}
                        alt="logo"
                      />
                      <h4 class="mt-3 mb-3 pb-1">Welcome to Pay up</h4>
                    </div>

                    <Form action="/" method="post">
                      <p>Please login to your account</p>
                      {hasError && (
                        <p style={{ color: 'red' }}>Wrong Credentials!!</p>
                      )}
                      <div class="form-outline mb-4">
                        <input
                          type="text"
                          name="username"
                          id="form2Example11"
                          class="form-control"
                        />
                        <label class="form-label" for="form2Example11">
                          Username
                        </label>
                      </div>

                      <div class="form-outline mb-2">
                        <input
                          type="password"
                          name="password"
                          id="form2Example22"
                          class="form-control"
                        />
                        <label class="form-label" for="form2Example22">
                          Password
                        </label>
                      </div>

                      <div class="text-center pt-1 mb-5 pb-1">
                        <button
                          class="btn btn-primary-1 btn-block fa-lg gradient-custom-2"
                          type="submit"
                        >
                          Log in
                        </button>
                      </div>

                      <div class="d-flex align-items-center justify-content-center pb-4">
                        <p class="mb-0 me-2">Don't have an account?</p>
                        <a href="/sign-up">
                          {' '}
                          <button type="button" class="btn btn-outline-danger">
                            Create new
                          </button>
                        </a>
                      </div>
                    </Form>
                  </div>
                </div>
                <div class="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h2 class="mb-4">
                      "Protecting your money, every step of the way."
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;

//<script>
//if (hasError == 'false') {(window.alert('Wrong Credentials!'))
// }else {
// params.register == "true" && (window.alert('You have successfully registered! Please login to continue.'))};
// </script>
//<p>Wrong Credentials</p>

/*<center>
    <section class='section'>
      <h2>Welcome Back!</h2>
      {hasError && <p>Wrong Credentials</p>}
      <div class='container'>
        <Form action='/login' method="post">
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />
         </div>
         <div>
            <input id='login' type="submit" value="Log In" />
         </div>
        </Form>
        <p>No Account? <a href="/sign-up">Create Account</a></p>
      </div>
    </section>
    </center>
    */
