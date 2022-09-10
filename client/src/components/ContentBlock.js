import { useEffect, useState } from "react"
import Button from 'react-bootstrap/Button';

function ContentBlock({ contents, title }) {
  const [contentData, setContentData] = useState()
  const [textState, settextState] = useState([])

  useEffect(() => {
    setContentData(contents)
  })

  let textArray = []

  if (textState[0]) {
    textArray = textState
  } else {
    textArray = Object.keys(textState)
  }

  const showTextArea = (id) => {
    settextState({
      ...textState,
      [id]: { text: true }
    })
  }

  let content
  if (contentData) {
    content = Object.values(contentData)
  }

  function anchorTag(id) {
    return `#${id}`
  }

  // bootstrap popovers for tags
  return (
    <>
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
              <h1>{content.number}. {content.title}</h1>
              <Button variant="success" onClick={() => showTextArea(content.id)}>Add Description</Button>
            </div>
            {textArray.includes(String(content.id)) ? (
              <>
                <textarea placeholder='description' value={content.content}></textarea>
                {/* add save button to the text area. changes some classes on it. Include the button inside of this conditional to be able to change the value of it to close. Will also want to not display the content.content if it is open, so include that in here. Need to add routing to be able to save this info. */}
              </>
            ) : (null)}
            <p>{content.content}</p>
          </div>
        )
      })) : (null)}
    </>
  )
}

export default ContentBlock