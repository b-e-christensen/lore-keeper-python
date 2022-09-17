import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function CreateTag({ show, onHide, onClick, setShow }) {

  const handleChange = (event) => {
    const { name, value } = event.target;

    setShow({
      ...show,
      [name]: value,
    });
  };

  return (
    <Modal show={show.boolean} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create or Add Tags
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="display-flex justify-center">
        <input id="input-field" name="name" placeholder="Tag Name" onChange={handleChange}></input>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onClick}>
          Create Tag
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateTag