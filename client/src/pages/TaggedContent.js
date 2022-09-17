import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getTag } from '../utils/API'

function TaggedContent({ token }) {

  let params = useParams()
  const [taggedState, setTaggedState] = useState('')

  useEffect(() => {
    getTag(token, params.tag_id, params.file_id, setTaggedState)
  }, [])

  return (
    <>
      <h1>it works</h1>
    </>
  )
}

export default TaggedContent