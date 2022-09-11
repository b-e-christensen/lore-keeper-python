import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useToken from './useToken';

function ConfirmModal(props) {

  const { token, removeToken, setToken } = useToken();

  const deleteContent = (id) => {
    console.log(props.id)
    console.log(id)
    console.log('delete running')
    axios({
      method: "DELETE",
      url: "/file/content",
      headers: {
        Authorization: 'Bearer ' + token
      },
      data: {
        content_id: id
      }
    })
    .then((response) => {
      props.onHide()
      const res = response.data
      res.access_token && setToken(res.access_token)
      console.log(res)
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
      }
    })
  }

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
        <Button variant="danger" onClick={() => {deleteContent(props.id)}}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal