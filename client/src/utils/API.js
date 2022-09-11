import axios from "axios";

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
