import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { login, signup } from '../utils/API'

function Login(props) {

  const [loginForm, setloginForm] = useState({ email: "", password: "" })
  const [signupForm, setSignupForm] = useState({ username: "", email: "", password: "", checkPassword: "" })
  const [alertState, setAlertState] = useState({ show: false, message: '' });
  const [loginState, setLoginState] = useState(true)

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


      {loginState ? (
        <div className='flex-column align-content-center justify-content-center min-100-vh'>
        <div className='login-div mt-5'>
        <h4 className='text-center mt-2'>Login</h4>
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
            <Button variant="dark" className='m-4' onClick={loginUser}>Login</Button>
        </form>
        </div>
        <p className='text-center login-change' onClick={() => setLoginState(false)}>Don't have an account? Signup!</p>
      </div>
      ) : ( 
        <div className='flex-column align-content-center justify-content-center min-100-vh'>
        <div className='login-div mt-5'>
        <h4 className='text-center mt-2'>Signup</h4>
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
            placeholder="Repeat password"
            value={signupForm.checkPassword} />
            <Button variant="dark" className='m-4' onClick={signupUser}>Signup</Button>
        </form>
        </div>
        <p className='text-center login-change' onClick={() => setLoginState(true)}>Already have an account? Login!</p>
      </div>
      )}
    </>
  );
}

export default Login;
