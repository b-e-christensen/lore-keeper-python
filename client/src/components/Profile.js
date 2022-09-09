import { useEffect, useState } from 'react'
import axios from "axios";
import FileList from './FileList';
import Button from 'react-bootstrap/Button';
import PopupModal from './PopupModal';


function Profile(props) {

  const [profileData, setProfileData] = useState(null)

  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('What do you want this file to be called?')
  const [item, setItem] = useState('File')

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let files
  useEffect(() => {
    getUserData()
  }, [])

  if (profileData) {
    files = Object.values(profileData)
    console.log(files)
  }

  function getUserData() {
    axios({
      method: 'GET',
      url: "/profile",
      headers: {
        Authorization: 'Bearer ' + props.token
      }
    })
      .then((response) => {
        const res = response.data
        res.access_token && props.setToken(res.access_token)
        setProfileData(res.files)
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
        fileName: document.querySelector("#input-field").value
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
    <div className="Profile">

      <Button variant="primary" onClick={handleShow}>
        Make New File
      </Button>
      <PopupModal show={show} handleClose={handleClose} title={title} item={item} onClick={makeFile} />


      <div className='content'>
        {files ? (files.map((file) => {
          return (
            <FileList key={file.id} file={file} />
          )
        })) : (null)}
      </div>


    </div>
  );
}

export default Profile;

