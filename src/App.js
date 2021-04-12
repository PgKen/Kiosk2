import imgLogo from "./img/logo_srimaung.png";
import "./css/App.css";
import Homeprice from "./component/Homeprice";
import List from "./component/List";
import Picture from "./component/Picture";
import Display from "./component/Display";
import Display2 from "./component/Displaytwo";
import Displayled from "./component/Displayled";
import Listled from './component/Listled';

import axios from "axios";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

let baseUrl = "http://taladsrimuang.com:5180";
// let baseUrl = "http://localhost:5180";
// let baseUrl = "http://172.16.1.238:5180/kiosk-chkReboot";

function App() {
  async function reboot() {
    console.log("click reboot");
    await axios
      .get(baseUrl + "/kiosk-reboot")
      .then((resp) => {
        console.log(resp.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function reboot2() {
    console.log("click reboot");
    await axios
      .get(baseUrl + "/kiosk-reboot2")
      .then((resp) => {
        console.log(resp.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function rebootLed() {
    console.log("Led Reboot");
    await axios
      .get(baseUrl + "/kiosk-reboot-led")
      .then((resp) => {
        console.log(resp.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  

  return (
    <Router>
      <Switch>
        <Route exact path="/display" component={Display}></Route>
        <Route exact path="/display2" component={Display2}></Route>
        <Route exact path="/Displayled" component={Displayled}></Route>

        <div className="App">
          {/* <Homeprice /> */}
          <div className="banner">
            <img src={imgLogo} />
          </div>
          <div className="content">
            <div className="Menu">
              <ul>
                <li>
                  <Link to="/list">Kiosk list</Link>
                </li>
                <li>
                  <Link to="/listled">LED list</Link>
                </li>
                <li>
                  <Link to="/picture">Picture upload</Link>
                </li>
                <li>
                  <Link to="/text">Text(wait)</Link>
                </li>
                <li>
                  <Link onClick={reboot}>Reboot Display</Link>
                </li>
                <li>
                  <Link onClick={reboot2}>Reboot Display 2</Link>
                </li>
                <li>
                  <Link onClick={rebootLed}>Reboot LED</Link>
                </li>
                <li>
                  <Link to="/Displayled">Displayled</Link>
                </li>

                <li>
                  <Link to="/display">Display preview</Link>
                </li>
                {/* <li>
                <Link to="/display2">Display2 preview</Link>
              </li> */}
                {/* <li>Cradit</li> */}
              </ul>
            </div>
            <div className="Article">
              <Switch>
                <Route exact path="/" component={List}></Route>
                <Route path="/list">
                  <List />
                </Route>
                <Route path="/listled">
                  <Listled />
                </Route>
                
                <Route path="/picture">
                  <Picture />
                </Route>
                <Route path="/text">
                  <Homeprice />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
