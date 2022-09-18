import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ContentBlock from "../components/ContentBlock";
import CreateContent from "../components/modals/CreateContent";
import { getFile, makeContent } from "../utils/API"


function File(props) {

  const [fileData, setFileData] = useState()
  const [show, setShow] = useState({ boolean: false, name: '', number: null })
  const handleClose = () => setShow({ boolean: false, name: '', number: null })
  const handleShow = () => setShow({ boolean: true, name: '', number: null })
  let fileId = useParams()
  useEffect(() => {
    getFile(fileId.id, props.token, setFileData)
  }, [])

  const rerenderFile = () => {
    getFile(fileId.id, props.token, setFileData)
  }

  const postContent = () => {
    makeContent(fileId.id, show.name, show.number, props.token, handleClose, getFile, setFileData)
  }

  return (
    <>
      <CreateContent show={show} handleClose={handleClose} onClick={() => makeContent(fileId.id, show.name, show.number, props.token, handleClose, getFile, setFileData)} setShow={setShow} />

      {fileData ? <ContentBlock token={props.token} contents={fileData.contents} title={fileData.title} rerenderFile={rerenderFile} handleShow={handleShow} /> : null}


    </>
  )

}

export default File