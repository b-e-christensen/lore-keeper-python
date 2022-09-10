
function File({ file }) {

  // listgroup from bootstrap could be a good addition here. 
  return (
  <a href={'/file/' + file.id}>
  <ul>
    <li className='file-name' >{file.title}</li>
    <li><i>Authored by you{file.collaborators ? file.collaborators.map((collab) => {
      return (
        <p>, {collab}</p>
      )
    }) : (null)}</i></li>
  </ul></a>
  )
}

export default File