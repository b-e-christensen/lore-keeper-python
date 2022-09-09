import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import axios from "axios";
import Button from 'react-bootstrap/Button';
import PopupModal from '../components/PopupModal';


function File(props) {

  const [fileData, setFileData] = useState(null)
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('What do you want this content to be called?')
  const [item, setItem] = useState('Content')

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getFile()
  }, [])

  let fileId = useParams()
  console.log(fileId.id)

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
        console.log(response)
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
    axios({
      method: "POST",
      url: "/file/content",
      headers: {
        Authorization: 'Bearer ' + props.token
      },
      data: {
        contentName: document.querySelector("#input-field").value,
        contentNumber: document.querySelector("#number-input").value
      }
    })
      .then((response) => {
        handleClose()
        // const res = response.data
        // res.access_token && props.setToken(res.access_token)
        console.log(document.querySelector("#input-field").value)
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
      <PopupModal show={show} handleClose={handleClose} title={title} item={item} onClick={() => makeContent} />
    </>
  )

}

export default File