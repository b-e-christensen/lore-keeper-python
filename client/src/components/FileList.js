import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { postFile } from '../utils/API'

function File({ file, token, setModalShow, refetchUserData }) {


  const [formState, setFormState] = useState({title: '', tagline: '', image: ''})

  const handleFormChange = (event) => {
    const { name, value } = event.target
    let formObject = formState
    formObject[`${name}`] = value
    setFormState(formObject)
  }

  return (
    <>
      <li className="card card_1" id={file.title}>
        <div className="card__content h-100">
          <div>
            <div className='d-flex mb-3'>
            <h2 className='mr-2'>{file.title}</h2> 
            <Dropdown className='mt-2 unique-dropdown' onClick={() => setFormState({title: file.title, tagline: file.tagline, image: file.image})} >
                  <Dropdown.Toggle split variant="dark" id="dropdown-split-basic"/>
                  <Dropdown.Menu className='dropdown-menu' onClick={(event) => event.stopPropagation()}>
                    <div>
                    <h5>Edit</h5>
                      <form>
                        <input name="title" className="m-2" type='text' placeholder="name change" defaultValue={file.title} onChange={handleFormChange}></input>
                        <input name="tagline" className="m-2" type='text' step="0.01" placeholder="tagline" defaultValue={file.tagline} onChange={handleFormChange}></input>
                        <input name="image" className="m-2" placeholder="picture change" defaultValue={file.image} onChange={handleFormChange}></input>
                      </form>
                    </div>
                    <Dropdown.Item onClick={() => postFile(token, file.id, formState.title, formState.tagline, formState.image, refetchUserData)}>Save Changes</Dropdown.Item>
                    <Dropdown.Item  onClick={() => setModalShow({boolean: true, title: file.title, id: file.id})}><span className="delete">Delete</span></Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
            </div>
            <p>{file.tagline}</p>
            <a href={'/file/' + file.id}><Button variant="dark">Go to file</Button></a>
            <a href='#top'><Button variant="dark">Back to top</Button></a>
          </div>
          {file.image ?
            (
              <figure>
                <img src={file.image} alt="Image description"></img>
              </figure>
            ) : (
              <figure>
                <img src="http://www.nasa.gov/sites/default/files/thumbnails/image/main_image_deep_field_smacs0723-5mb.jpg" alt="Image description"></img>
              </figure>
            )}

        </div>
      </li>
    </>
  )
}

export default File