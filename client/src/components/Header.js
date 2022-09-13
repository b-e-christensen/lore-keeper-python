import Button from 'react-bootstrap/Button';
import { logout } from "../utils/API"

function Header(props) {

  return (
    <header className="header display-flex justify-space-between">
    <a href='/'><h3>Lore Keeper</h3></a>
      {props.loggedIn ?
        (
          <>
            <Button variant="dark" className='h-fit-content mr-3' onClick={() => logout(props.removeToken)}>
              Logout
            </Button>
          </>
        ) : (
          null
        )
      }
    </header>
  )
}

export default Header;

