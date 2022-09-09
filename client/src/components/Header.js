import axios from "axios";
import { useState } from "react";
import Button from 'react-bootstrap/Button';

function Header(props) {

  function logout() {
    axios({
      method: "POST",
      url: "/logout",
    })
      .then((response) => {
        props.removeToken()
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
        }
      })
  }

  return (
    <header className="App-header flex-row">
      {props.loggedIn ?
        (
          <>
            <Button variant="success" className="justify-flex-end" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          null
        )
      }
    </header>
  )
}

export default Header;

