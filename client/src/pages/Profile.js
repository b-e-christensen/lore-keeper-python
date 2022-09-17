import { useEffect, useState } from 'react'
import FileList from '../components/FileList';
import Button from 'react-bootstrap/Button';
import CreateFile from '../components/modals/CreateFile';
import ConfirmModal from "../components/modals/Confirm";
import { getUserData, makeFile } from '../utils/API'


function Profile(props) {

  const [profileData, setProfileData] = useState(null)
  const [show, setShow] = useState({ boolean: false, name: '' });
  const handleClose = () => setShow({ boolean: false, name: '' });
  const handleShow = () => setShow({ boolean: true, name: '' });

  const [modalShow, setModalShow] = useState({boolean: false, number: '', title: '', id: ''})

  console.log(modalShow)

  let files
  useEffect(() => {
    getUserData(props.token, setProfileData)
  }, [])

  if (profileData) {
    files = Object.values(profileData)
  }

  const refetchUserData = () => {
    getUserData(props.token, setProfileData)
  }

  return (
    <div className="Profile">
    <ConfirmModal show={modalShow.boolean} onHide={() => setModalShow({boolean: false, number: '', title: '', content_id: ''})} refetchUserData={refetchUserData} id={modalShow.id} deletefile={'true'} />
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

      <CreateFile show={show} handleClose={handleClose} onClick={() => makeFile(show.name, props.token, handleClose, getUserData, setProfileData)} setShow={setShow} />
      <main>
        <ul id="cards" className='line-class'>
          {files ? (files.map((file) => {
            return (
              <FileList key={file.id} file={file} token={props.token} setModalShow={setModalShow} refetchUserData={refetchUserData}/>
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

