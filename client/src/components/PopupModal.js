import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function PopupModal({ show, handleClose, title, item, onClick }) {
  const [modalType, setModalType] = useState(false)

  useEffect(() => {
    if (item == 'Content') {
      setModalType('content')
    }
  }, [])

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="display-flex justify-center">
        <input id="input-field" placeholder="File Name"></input>
      </Modal.Body>
      <Modal.Body className="display-flex justify-center">
        {modalType ? <input id='number-input' type='number' placeholder='Number for the order of your content'></input> : null}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onClick}>
          Create {item}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default PopupModal