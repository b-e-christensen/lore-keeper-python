import { useState } from 'react';
import axios from "axios";
import { login } from '../utils/API'

function Login(props) {

    const [loginForm, setloginForm] = useState({
      email: "",
      password: ""
    })

    function loginUser(event) {
      event.preventDefault()

      login(loginForm.email, loginForm.password, props.setToken)

      setloginForm(({
        email: "",
        password: ""}))

    }

    function handleChange(event) { 
      const {value, name} = event.target
      setloginForm({
          ...loginForm, 
          [name]: value
        })
      }

    return (
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
    );
}

export default Login;
