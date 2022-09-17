import Button from 'react-bootstrap/Button';

function Tag({ title, id, fileId }) {

  return(
    <div>
    <Button key={id} variant='light' className='m-1' onClick={() => window.location.href = `/tagged/${fileId}/${id}`}>{title}</Button>
    </div>
  )
}

export default Tag