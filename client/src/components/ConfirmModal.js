import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useToken from './useToken';
import { deleteContent } from "../utils/API"

function ConfirmModal(props) {

  const { token, removeToken, setToken } = useToken();


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className='delete'>
          Delete Warning!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          This action will permanently delete the section <strong>{props.number}. {props.title}</strong> and all of its contents. Do you wish to continue?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Cancel</Button>
        <Button variant="danger" onClick={() => {deleteContent(props.id, token, props.onHide)}}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal