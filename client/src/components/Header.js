import axios from "axios";

function Header(props) {

  function logout() {
    axios({
      method: "POST",
      url:"/logout",
    })
    .then((response) => {
       props.token()
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

    return(
        <header className="App-header">
            {/* <img className="App-logo" alt="logo" /> */}
            <button onClick={logout}> 
                Logout
            </button>
        </header>
    )
}

export default Header;

