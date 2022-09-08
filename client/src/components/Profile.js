import { useEffect, useState } from 'react'
import axios from "axios";
import FileList from './FileList';


function Profile(props) {

  const [profileData, setProfileData] = useState(null)

  let files
  useEffect(() => {
    getUserData()
  }, [])

  if(profileData) {
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

  return (
    <div className="Profile">

      <div className='content'>
          {files ? (files.map((file) => {
            return(
              <FileList key={file.id} file={file}/>
            )
          })) : (null)}
      </div>


    </div>
  );
}

export default Profile;

