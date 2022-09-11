import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import axios from "axios";
import Button from 'react-bootstrap/Button';
import PopupModal from '../components/PopupModal';
import Modal from 'react-bootstrap/Modal';
import ContentBlock from "../components/ContentBlock";


function File(props) {

  const [fileData, setFileData] = useState()
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('What do you want this content to be called?')
  const [item, setItem] = useState('Content')

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    getFile()
  }, [])

  let fileId = useParams()

  function getFile() {
    axios({
      method: "POST",
      url: "/file/single",
      headers: {
        Authorization: 'Bearer ' + props.token
      },
      data: {
        fileId: fileId.id
      }
    })
      .then((response) => {
        const res = response.data
        res.access_token && props.setToken(res.access_token)
        console.log(res)
        setFileData({ contents: res.contents, title: res.file.title })
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
        }
      })
  }

  function makeContent() {
    console.log('make content function running')
    console.log(document.querySelector("#input-field").value)
    console.log(document.querySelector("#number-input").value)
    console.log(typeof document.querySelector("#number-input").value)
    console.log(parseFloat(document.querySelector("#number-input").value))
    console.log(fileId.id)
    axios({
      method: "POST",
      url: "/file/content",
      headers: {
        Authorization: 'Bearer ' + props.token
      },
      data: {
        fileId: fileId.id,
        contentName: document.querySelector("#input-field").value,
        contentNumber: parseFloat(document.querySelector("#number-input").value)
      }
    })
      .then((response) => {
        handleClose()
        const res = response.data
        res.access_token && props.setToken(res.access_token)
        getFile()
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
        }
      })
  }

  return (
    <>
      {/* <div className='plus radius'></div> */}
      <Button variant="primary" onClick={handleShow}>
        Make New Content
      </Button>
      {/* <PopupModal show={show} handleClose={handleClose} title={title} item={item} onClick={makeContent} /> */}
      <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="display-flex justify-center">
        <input id="input-field" placeholder="File Name"></input>
      </Modal.Body>
      <Modal.Body className="display-flex justify-center">
      <input id='number-input' type='number' step="0.01" placeholder='Number for the order of your content'></input>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={makeContent}>
          Create {item}
        </Button>
      </Modal.Footer>
    </Modal>
    {fileData ? <ContentBlock token={props.token} contents={fileData.contents} title={fileData.title} /> : null}
    
    
    </>
  )

}

export default File