import Login from "../components/Login";
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

const popover = (
  <Popover id="popover-basic">
    {/* <Popover.Header as="h3">Popover right</Popover.Header> */}
    <Popover.Body>
    Lore Keeper is built with stories in mind. We are all natural story tellers, so we here at Lore Keeper wanted to aid people in telling them.
    <br></br>
      <ol>
        <li>Create an account.</li>
        <li>Make files.</li>
        <li>Add sections.</li>
        <li>Exapand your world.</li>
      </ol>
      It's as simple as that! 
    </Popover.Body>
  </Popover>
);

function LandingPage({ setToken }) {
  return (

    <div className="landing-page-div w-100">
      <div className="display-flex justify-content-center">
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
          <h4 className="mt-2 login-change">Make a world</h4>
        </OverlayTrigger>
      </div>
      <Login setToken={setToken} />

    </div>

  )
}

export default LandingPage