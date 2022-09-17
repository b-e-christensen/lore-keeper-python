import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Profile from './pages/Profile'
import Header from './components/Header'
import useToken from './components/useToken'
import File from './pages/File'
import LandingPage from './pages/LandingPage'
import TaggedContent from './pages/TaggedContent'
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/cards.css'

function App() {
  const { token, removeToken, setToken } = useToken();

  return (
    <BrowserRouter>
      <div className="App">
        {!token && token !== "" && token !== undefined ?
          (<>
            <Header
              token={token}
              removeToken={removeToken}
              loggedIn={false}
            />
            <LandingPage
              setToken={setToken}
            />
          </>)
          : (
            <>
              <Header
                token={token}
                removeToken={removeToken}
                loggedIn={true}
              />
              <Routes>

                <Route
                  path="/"
                  element={<Profile token={token} setToken={setToken} />}>
                </Route>
                <Route
                  path="/file/:id"
                  element={<File token={token} setToken={setToken} />}>
                </Route>
                <Route
                  path="/tagged/:file_id/:tag_id"
                  element={<TaggedContent token={token} />}>
                </Route>
                <Route
                  path="/hello"
                  element={<h1>Hello!</h1>}>
                </Route>

              </Routes>
            </>
          )}
      </div>
    </BrowserRouter>
  );
}

export default App;

