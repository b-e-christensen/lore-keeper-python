import axios from "axios";

// WORKS and RERENDERS
export const saveText = (id, text, token, func, close, param1, param2, param3) => {
  if (!text[`${id}`]) {
    return
  }
  axios({
    method: "POST",
    url: "/file/text/update",
    headers: {
      Authorization: 'Bearer ' + token
    },
    data: {
      content_id: id,
      text: text[`${id}`]
    }
  })
    .then((response) => {
      // function call to close the text area after save
      close(param1, param2, param3)
      // function call to refetch the file data
      func()
    })
}
// WORKS and RERENDERS
export const updateContent = (content_id, file_id, title, number, image, token, func) => {
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
    .then(response => func())
}
// WORKS and RERENDERS
export const deleteContent = (id, fileId, token, onHide, func) => {
  axios({
    method: "DELETE",
    url: "/file/content",
    headers: {
      Authorization: 'Bearer ' + token
    },
    data: {
      content_id: id,
      fileId
    }
  })
    .then((response) => {
      // function to hide modal
      onHide()
      // function call to refetch the file data
      func()
    })
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
    .then((response) => {
      setState(response.data.files)
    })
}
// WORKS and RERENDERS
export const makeFile = (name, token, close, func, setState) => {
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
    .then((response) => {
      close()
      func(token, setState)
    })
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
    .then((response) => {
      if (!response.data.file) {
        window.location.href = '/'
      }
      setState({ contents: response.data.contents, title: response.data.file.title })
    }
    )
}
// WORKS and RERENDERS
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
      // function call to close modal
      close()
      // function call to refetch newly updated data.
      func(fileId, token, setState)
    })
}
// WORKS and RERENDERS
export const postFile = (token, id, title, tagline, image, func, setState) => {
  axios({
    method: "POST",
    url: "/file/update",
    headers: {
      Authorization: 'Bearer ' + token
    },
    data: {
      id,
      title,
      tagline,
      image
    }
  })
    .then(response => func())
}

// WORKS and RERENDERS
export const deleteFile = (token, id, onHide, func) => {
  axios({
    method: "DELETE",
    url: "/file/update",
    headers: {
      Authorization: 'Bearer ' + token
    },
    data: {
      id
    }
  })
    .then((response) => {
      onHide()
      func()
    })
}

export const addTag = (token, title, file_id, content_id, hide, func) => {
  axios({
    method: "POST",
    url: "/tag",
    headers: {
      Authorization: 'Bearer ' + token
    },
    data: {
      title,
      file_id,
      content_id
    }
  })
    .then((response) => {
      hide()
      func()
    })
}

export const getTag = (token, tag_id, file_id, setState) => {
  axios({
    method: "POST",
    url: "/tag/content",
    headers: {
      Authorization: 'Bearer ' + token
    },
    data: {
      tag_id,
      file_id
    }
  })
    .then(response => setState(response.data.contents))
}

// WORKS
export const login = (email, password, setState) => {
  axios({
    method: "POST",
    url: "/login",
    data: {
      email,
      password
    }
  })
    .then((response) => setState(response.data.access_token))
}
// WORKS
export const signup = (username, email, password, setState) => {
  axios({
    method: "POST",
    url: "/signup",
    data: {
      username,
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