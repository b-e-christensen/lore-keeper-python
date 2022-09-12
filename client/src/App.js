import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Profile from './components/Profile'
import Header from './components/Header'
import useToken from './components/useToken'
import File from './pages/File'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './cards.css'
function App() {
  const { token, removeToken, setToken } = useToken();

  return (
    <BrowserRouter>
      <div className="App">
        {!token && token!=="" &&token!== undefined?
       ( <>
        <Header token={token} removeToken={removeToken} loggedIn={false}/>  
        <Login setToken={setToken} />
        </>)
        :(
          <>
          <Header token={token} removeToken={removeToken} loggedIn={true}/> 
            <Routes>
              <Route exact path="/" element={<Profile token={token} setToken={setToken}/>}></Route>
              <Route path="/file/:id" element={<File token={token} setToken={setToken}/>}></Route>
            </Routes>
          </>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;

