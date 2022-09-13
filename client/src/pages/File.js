import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ContentBlock from "../components/ContentBlock";
import { getFile, makeContent } from "../utils/API"


function File(props) {

  const [fileData, setFileData] = useState()
  const [show, setShow] = useState({boolean: false, name: '', number: null})
  const handleClose = () => setShow({boolean: false, name: '', number: null})
  const handleShow = () => setShow({boolean: true, name: '', number: null})

  let fileId = useParams()
  useEffect(() => {
    getFile(fileId.id, props.token, setFileData)
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target;

    setShow({
      ...show,
      [name]: value,
    });
  };

  const rerenderFile = () => {
    getFile(fileId.id, props.token, setFileData)
  }

  return (
    <>

      <Modal show={show.boolean} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>What do you want this content to be called?</Modal.Title>
      </Modal.Header>
      <Modal.Body className="display-flex justify-center">
        <input id="input-field" name="name" placeholder="File Name" onChange={handleChange}></input>
      </Modal.Body>
      <Modal.Body className="display-flex justify-center">
      <input id='number-input' name='number' type='number' step="0.01" placeholder='Number for the order of your content' onChange={handleChange}></input>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => makeContent(fileId.id, show.name, show.number, props.token, handleClose, getFile, setFileData)}>
          Create Content
        </Button>
      </Modal.Footer>
    </Modal>

    {fileData ? <ContentBlock token={props.token} contents={fileData.contents} title={fileData.title} rerenderFile={rerenderFile} handleShow={handleShow} /> : null}
    
    
    </>
  )

}

export default File