import { useEffect, useState } from "react"
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import ConfirmModal from "./ConfirmModal";
import { saveText, updateContent } from "../utils/API"
import { useParams } from "react-router-dom";



function ContentBlock({ contents, title, token, rerenderFile }) {
  const [contentData, setContentData] = useState()
  const [editState, setEditState] = useState([])
  const [textState, setTextState] = useState({})
  const [formState, setFormState] = useState({title: '', number: null, image: ''})
  const [modalShow, setModalShow] = useState({boolean: false, number: '', title: '', content_id: ''})


  useEffect(() => {
    setContentData(contents)
  })

  let fileId = useParams()

  const handleChange = (event) => {
    const { name, value } = event.target;

    setTextState({
      ...textState,
      [name]: value,
    });
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target
    let formObject = formState
    formObject[`${name}`] = value
    console.log(formState)
    setFormState(formObject)
  }

  let textArray = []

  if (editState[0]) {
    textArray = editState
  } else {
    textArray = Object.keys(editState)
  }

  const showTextArea = (id) => {
    setEditState({
      ...editState,
      [id]: { text: true }
    })
  }
  const closeTextArea = (id, originalValue, save) => {
    if (textState[`${id}`] && textState[`${id}`] != originalValue && !save) {
      let close = window.confirm('You have unsaved changes!')
      if (!close) {
        return
      }
    }
    const textareas = textArray.filter((area) => area !== String(id))
    setEditState([...textareas])
  }

  let content
  if (contentData) {
    content = Object.values(contentData)
  }

  function anchorTag(id) {
    return `#${id}`
  }

  return (
    <>
      <ConfirmModal show={modalShow.boolean} onHide={() => setModalShow({boolean: false, number: '', title: '', content_id: ''})} number={modalShow.number} title={modalShow.title} id={modalShow.content_id} file={fileId.id} rerenderFile={rerenderFile}/>
      <div className="table-of-contents">
        <table className="m-4">
          <tbody>
            <tr><td>{title}</td></tr>
            {content ? (content.map((content) => {
              return (
                <tr key={content.id}><td className="pl-15"><a href={anchorTag(content.title)}>{content.number}. {content.title}</a></td></tr>
              )
            })) : (null)}
          </tbody>
        </table>
      </div>

      {content ? (content.map((content) => {
        return (
          <div key={content.id} id={content.title} className="content-block">
            <div className="d-flex justify-space-between">
              <div className="d-flex">
                <h1>{content.number}. {content.title}</h1>

                <Dropdown onClick={() => setFormState({title: content.title, number: content.number, image: content.image})}>
                  <Dropdown.Toggle split variant="success" id="dropdown-split-basic"/>
                  <Dropdown.Menu onClick={(event) => event.stopPropagation()}>
                    <div>
                    <h5>Change values to edit</h5>
                      <form>
                        <input name="title" className="m-2" type='text' placeholder="name change" defaultValue={content.title} onChange={handleFormChange}></input>
                        <input name="number" className="m-2" type='number' step="0.01" placeholder="number change" defaultValue={content.number} onChange={handleFormChange}></input>
                        <input name="image" className="m-2" placeholder="picture change" defaultValue={content.image} onChange={handleFormChange}></input>
                      </form>
                    </div>
                    <Dropdown.Item onClick={() => updateContent(content.id, fileId.id, formState.title, formState.number, formState.image, token, rerenderFile)}>Save Changes</Dropdown.Item>
                    <Dropdown.Item  onClick={() => setModalShow({boolean: true, number: content.number, title: content.title, content_id: content.id})}><span className="delete">Delete</span></Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <Button variant="success" onClick={() => showTextArea(content.id)}>Add Description</Button>

            </div>

            {textArray.includes(String(content.id)) ? (
              <div className="d-flex justify-space-between mt-2">
                <div className="w-75">

                  {content.content ? <textarea name={content.id} defaultValue={content.content} onChange={handleChange} placeholder='description' className="w-100"></textarea> : <textarea name={content.id} onChange={handleChange} placeholder='description' className="w-100"></textarea>}

                </div>
                <div className="d-flex flex-column align-items-center btn-div">
                  <Button variant="secondary" className="custom-btn-attr" onClick={() => saveText(content.id, textState, token, rerenderFile, closeTextArea, content.id, content.content, true)}>Save</Button>
                  <Button variant="dark" className="custom-btn-attr" onClick={() => closeTextArea(content.id, content.content)}>Close</Button>
                </div>
              </div>
            ) : (<p>{content.content}</p>)}
          </div>
        )
      })) : (null)}
    </>
  )
}

export default ContentBlock