import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import axios from "axios";

function File(props) {
  
  const [fileData, setFileData] = useState(null)
  
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


  // make a post passing the id.id as data to search for the 
}

export default File