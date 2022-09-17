import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function CreateFile({ show, handleClose, onClick, setShow }) {

  const handleChange = (event) => {
    const { name, value } = event.target;

    setShow({
      ...show,
      [name]: value,
    });
  };

  return (
    <Modal show={show.boolean} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>What do you want this file to be called?</Modal.Title>
      </Modal.Header>
      <Modal.Body className="display-flex justify-center">
        <input id="input-field" name="name" placeholder="File Name" onChange={handleChange}></input>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onClick}>
          Create File
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateFile