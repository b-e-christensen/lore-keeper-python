import axios from "axios";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Header(props) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  function makeFile() {
    axios({
      method: "POST",
      url: "/api/file",
      data: {
        fileName: document.querySelector("#fileName").value
      },
      headers: {
        Authorization: 'Bearer ' + props.token
      }
    })
    .then((response) => {
      handleClose()
      props.setToken(response.data.access_token)
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
            <>
              <Button variant="primary" onClick={handleShow}>
                Make New File
              </Button>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>What do you want this file to be called?</Modal.Title>
                </Modal.Header>
                <Modal.Body className="display-flex justify-center">
                  <input id="fileName" placeholder="File Name"></input>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={makeFile}>
                    Make File
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          </>
        ) : (
          null
        )
      }
    </header>
  )
}

export default Header;

