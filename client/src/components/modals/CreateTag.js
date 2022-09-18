import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getAllTags, editTags } from '../../utils/API'

function CreateTag({ show, onHide, onClick, setShow, token, fileId, rerenderFile }) {
  const [tagState, setTagState] = useState('')
  const [selectedTagsState, setSelectedTagsState] = useState([...show.tags])

  useEffect(() => {
    getAllTags(token, fileId, setTagState)
  }, [])

  useEffect(() => {
    setSelectedTagsState(show.tags)
  }, [show])

  const handleChange = (event) => {
    const { name, value } = event.target;

    setShow({
      ...show,
      [name]: value,
    });
  };

  const removeTag = (id) => {
    const tags = selectedTagsState.filter((tag) => tag !== id)
    setSelectedTagsState([...tags])
  }

  const selectTag = (id) => {
    // runs remove function if id is already in state
    if (selectedTagsState.includes(id)) {
      removeTag(id)
      return
    }

    setSelectedTagsState([
      ...selectedTagsState,
      id
    ])
  }

  return (
    <Modal show={show.boolean} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create and add tag
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="display-flex justify-center">
        <input id="input-field" name="name" placeholder="Tag Name" onChange={handleChange}></input>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onClick}>
          Create Tag
        </Button>
      </Modal.Footer>
      {tagState ? (
        <>
          <Modal.Header>
            <Modal.Title>Add/Edit existing tags</Modal.Title>
          </Modal.Header>
          <Modal.Body className="flex-row">
            {tagState.map((tag) => {
              return (
                <Button key={tag.id} variant={selectedTagsState.includes(tag.id) ? ('primary') : ('outline-primary')} className='m-1'
                  onClick={() => selectTag(tag.id)}>{tag.title}</Button>
              )
            })}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => {editTags(token, fileId, show.content_id, selectedTagsState, onHide, rerenderFile)}}>
              Edit Tags
            </Button>
          </Modal.Footer>
        </>
      ) : (null)}
    </Modal>
  );
}

export default CreateTag