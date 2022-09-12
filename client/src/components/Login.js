import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import { login, signup } from '../utils/API'

function Login(props) {

  const [loginForm, setloginForm] = useState({ email: "", password: "" })
  const [signupForm, setSignupForm] = useState({ username: "", email: "", password: "", checkPassword: "" })
  const [alertState, setAlertState] = useState({ show: false, message: '' });

  function loginUser(event) {
    event.preventDefault()

    login(loginForm.email, loginForm.password, props.setToken)

    setloginForm(({
      email: "",
      password: ""
    }))
  }

  function signupUser(event) {
    event.preventDefault()
    if (signupForm.password != signupForm.checkPassword) {
      setAlertState({ show: true, message: 'Passwords did not match.' })
      setSignupForm({
        email: "",
        password: "",
        checkPassword: ""
      })
      return
    }
    if (!signupForm.username || !signupForm.email || !signupForm.password || !signupForm.checkPassword) {
      setAlertState({ show: true, message: 'You must enter a value for each input.' })
      setSignupForm({
        email: "",
        password: "",
        checkPassword: ""
      })
      return
    }

    signup(signupForm.username, signupForm.email, signupForm.password, props.setToken)

    setSignupForm({
      email: "",
      password: "",
      checkPassword: ""
    })
  }

  function handleChange(event) {
    const { value, name } = event.target
    setloginForm({
      ...loginForm,
      [name]: value
    })
  }

  function handleSignupChange(event) {
    const { value, name } = event.target
    setSignupForm({
      ...signupForm,
      [name]: value
    })
  }

  return (
    <>
      {alertState.show ? <Alert key='danger' variant='danger' onClose={() => setAlertState({ show: false, message: '' })}>
        {alertState.message}
      </Alert> : (null)}

      <div>
        <h1>Login</h1>
        <form className="login">
          <input onChange={handleChange}
            type="email"
            text={loginForm.email}
            name="email"
            placeholder="Email"
            value={loginForm.email} />
          <input onChange={handleChange}
            type="password"
            text={loginForm.password}
            name="password"
            placeholder="Password"
            value={loginForm.password} />

          <button onClick={loginUser}>Submit</button>
        </form>
      </div>

      <div>
        <h1>Signup</h1>
        <form className="login">
          <input onChange={handleSignupChange}
            type="text"
            text={signupForm.email}
            name="username"
            placeholder="Username"
            value={signupForm.username} />
          <input onChange={handleSignupChange}
            type="email"
            text={signupForm.email}
            name="email"
            placeholder="Email"
            value={signupForm.email} />
          <input onChange={handleSignupChange}
            type="password"
            text={signupForm.password}
            name="password"
            placeholder="Password"
            value={signupForm.password} />
          <input onChange={handleSignupChange}
            type="password"
            text={signupForm.password}
            name="checkPassword"
            placeholder="Password"
            value={signupForm.checkPassword} />

          <button onClick={signupUser}>Submit</button>
        </form>
      </div>
    </>
  );
}

export default Login;
