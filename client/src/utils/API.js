import axios from "axios";

// WORKS 
export const saveText = (id, text, token) => {
  if (!text[`${id}`]) {
    return
  }
  axios({
    method: "POST",
    url: "/file/update",
    headers: {
      Authorization: 'Bearer ' + token
    },
    data: {
      content_id: id,
      text: text[`${id}`]
    }
  })
}
// WORKS 
export const updateContent = (content_id, file_id, title, number, image, token) => {
  axios({
    method: "POST",
    url: "/file/content/update",
    headers: {
      Authorization: 'Bearer ' + token
    },
    data: {
      content_id, file_id,
      title,
      number,
      image
    }
  })
}
// WORKS
export const deleteContent = (id, token, onHide) => {
  axios({
    method: "DELETE",
    url: "/file/content",
    headers: {
      Authorization: 'Bearer ' + token
    },
    data: {
      content_id: id
    }
  })
  .then(onHide())
}
// WORKS
export const getUserData = (token, setState) => {
  axios({
    method: 'GET',
    url: "/profile",
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
    .then((response) => setState(response.data.files))
}
// WORKS
export const makeFile = (name, token, close) => {
  axios({
    method: "POST",
    url: "/api/file",
    data: {
      fileName: name
    },
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  .then(close())
}
// WORKS
export const getFile = (fileId, token, setState) => {
  axios({
    method: "POST",
    url: "/file/single",
    headers: {
      Authorization: 'Bearer ' + token
    },
    data: {
      fileId
    }
  })
    .then((response) => setState({ contents: response.data.contents, title: response.data.file.title })
    )
}
// WORKS
export const makeContent = (fileId, contentName, contentNumber, token, close, func, setState) => {
  axios({
    method: "POST",
    url: "/file/content",
    headers: {
      Authorization: 'Bearer ' + token
    },
    data: {
      fileId,
      contentName,
      contentNumber: parseFloat(contentNumber)
    }
  })
    .then((response) => {
      close()
      func(fileId, token, setState)
    })
}



// WORKS
export const login = (email, password, setState) => {
  axios({
    method: "POST",
    url:"/login",
    data:{
      email,
      password
     }
  })
  .then((response) => setState(response.data.access_token))
}

// WORKS (though experienced some strange interaction with it, so going to leave it commented out for now in Header.js)
export const logout = (removeToken) => {
  axios({
    method: "POST",
    url: "/logout",
  })
    .then(removeToken())
}