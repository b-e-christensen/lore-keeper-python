import { useEffect, useState } from 'react'
import FileList from './FileList';
import Button from 'react-bootstrap/Button';
import PopupModal from './PopupModal';
import { getUserData, makeFile } from '../utils/API'


function Profile(props) {

  const [profileData, setProfileData] = useState(null)
  const [show, setShow] = useState({ boolean: false, name: '' });
  const [title, setTitle] = useState('What do you want this file to be called?')
  const [item, setItem] = useState('File')
  const handleClose = () => setShow({ boolean: false, name: '' });
  const handleShow = () => setShow({ boolean: true, name: '' });

  let files
  useEffect(() => {
    getUserData(props.token, setProfileData)
  }, [])

  if (profileData) {
    files = Object.values(profileData)
    console.log(files)
  }

  return (
    <div className="Profile">
      <Button variant="primary" onClick={handleShow}>
        Make New File
      </Button>
      <PopupModal show={show} handleClose={handleClose} title={title} item={item} onClick={() => makeFile(show.name, props.token, handleClose)} setShow={setShow} />
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

