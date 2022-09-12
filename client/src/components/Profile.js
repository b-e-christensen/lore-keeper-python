import { useEffect, useState } from 'react'
import FileList from './FileList';
import Button from 'react-bootstrap/Button';
import PopupModal from './PopupModal';
import ConfirmModal from "./ConfirmModal";
import { getUserData, makeFile } from '../utils/API'


function Profile(props) {

  const [profileData, setProfileData] = useState(null)
  const [show, setShow] = useState({ boolean: false, name: '' });
  const handleClose = () => setShow({ boolean: false, name: '' });
  const handleShow = () => setShow({ boolean: true, name: '' });

  const [modalShow, setModalShow] = useState({boolean: false, number: '', title: '', file_id: ''})

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

    <ConfirmModal show={modalShow.boolean} onHide={() => setModalShow({boolean: false, number: '', title: '', content_id: ''})} number={modalShow.number} title={modalShow.title} id={modalShow.file_id} />

      <div className="table-of-contents">
        <table className="m-4">
          <tbody>
            <tr><td>Files</td></tr>
            {files ? (files.map((file) => {
              return (
                <tr key={file.id}><td className="pl-15"><a href={'/file/' + file.id}>{file.title}</a></td></tr>
              )
            })) : (null)}
          </tbody>
        </table>
        <Button variant="dark" className='m-3 mt-0' onClick={handleShow}>
        Make New File
      </Button>
      </div>

      <PopupModal show={show} handleClose={handleClose} title='What do you want this file to be called?' item='File' onClick={() => makeFile(show.name, props.token, handleClose, getUserData, setProfileData)} setShow={setShow} />
      <main>
        <ul id="cards">
          {files ? (files.map((file) => {
            return (
              <FileList key={file.id} file={file} token={props.token} setModalShow={setModalShow}/>
            )
          })) : (null)}
        </ul>
      </main>
      <aside>

      </aside>
    </div>
  );
}

export default Profile;

