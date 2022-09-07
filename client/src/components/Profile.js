import { useState } from 'react'
import axios from "axios";

function Profile(props) {

  const [profileData, setProfileData] = useState(null)
  function getData() {
    axios({
      method: "GET",
      url: "/profile",
      headers: {
        Authorization: 'Bearer ' + props.token
      }
    })
      .then((response) => {
        console.log(response)
        const res = response.data
        console.log(res)
        res.access_token && props.setToken(res.access_token)
        setProfileData(({
          profile_name: res.username,
          about_me: res.email
        }))
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
        }
      })
  }

  function getFiles() {
    axios({
      method: 'GET',
      url: "/profile",
      headers: {
        Authorization: 'Bearer ' + props.token
      }
    })
      .then((response) => {
        console.log(response)
        const res = response.data
        console.log(res)
        res.access_token && props.setToken(res.access_token)
        setProfileData(({
          files: res.files,
        }))
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

      <p>To get your profile details: </p><button onClick={getData}>Click me</button>
      {profileData && <div>
        <p>Username: {profileData.profile_name}</p>
        <p>Email: {profileData.about_me}</p>
      </div>
      }

      <div className='content'>

      </div>


    </div>
  );
}

export default Profile;

