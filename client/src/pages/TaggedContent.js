import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getTag, makeContent } from '../utils/API'
import ContentBlock from "../components/ContentBlock";
import CreateContent from "../components/modals/CreateContent";

function TaggedContent({ token }) {

  let params = useParams()

  const [taggedState, setTaggedState] = useState()
  const [show, setShow] = useState({ boolean: false, name: '', number: null })
  const handleClose = () => setShow({ boolean: false, name: '', number: null })
  const handleShow = () => setShow({ boolean: true, name: '', number: null })
  console.log(taggedState)
  let fileId = useParams()
  useEffect(() => {
    getTag(token, params.tag_id, params.id, setTaggedState)
  }, [])

  const rerenderFile = () => {
    getTag(token, params.tag_id, params.id, setTaggedState)
  }

  return (
    <>
      <CreateContent show={show} handleClose={handleClose} onClick={() => makeContent(fileId.id, show.name, show.number, token, handleClose, getTag, setTaggedState)} setShow={setShow} />

      {taggedState ? <>
        <h3 className="m-1">Viewing {taggedState.tag}</h3>
        <ContentBlock
          token={token}
          contents={taggedState.contents}
          title={taggedState.title}
          rerenderFile={rerenderFile}
          handleShow={handleShow}
        />
      </> : null}


    </>
  )
}

export default TaggedContent