import Navbar from "../components/Navbar";

function LandingPage() {
  return (
    <>
    <Navbar /> 
    <div className="display-flex flex-column h-100 justify-space-around">
      <div className="flex-row">
      <button className="btn">The Lore Keeper</button>
      <button className="btn">Get Started</button>
      </div>
      <div>
      <button className="btn">Go on an adventure</button>
      <form>
        <input 
        type='text'
        placeholder='search'></input>
      </form>
      </div>
    </div>
    </>
  )
}

export default LandingPage