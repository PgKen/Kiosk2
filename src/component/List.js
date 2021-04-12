import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import preview from "../img/preview.png";

// import "./css/App.css";

import "bootstrap/dist/css/bootstrap.min.css";

let baseUrl = "http://taladsrimuang.com:5180";
// let baseUrl = "http://localhost:5180";
// let baseUrl = "http://172.16.1.238:5180/kiosk-chkReboot";
let DataAll = [];

const List = () => {
  const [Data, setData] = useState([]);
  const [Tump, setTump] = useState([]);
  const [videolink, setvideolink] = useState();
  const [Type, setType] = useState(3);
  const [showDuration, setshowDuration] = useState(0);
  const [editId, setEditId] = useState(0);
  const [Duration, setDuration] = useState(60);

  async function loadData() {
    console.log("load Data()");
    await axios
      // .get("http://localhost:5180/kiosk-list-backend")
      .get(baseUrl + "/kiosk-list-backend")
      .then((resp) => {
        console.log(resp.data);
        setData(resp.data);
        DataAll = resp.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function delDisplay(e, i, id_list) {
    // let id = e.target.value;
    // console.log(i);
    console.log("del = " + i);
    let id_type = 0;
    // let id =
    await axios
      .get(baseUrl + "/kiosk-del/" + i + "/" + id_list + "/" + id_type)
      .then(() => {
        loadData();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function upDateStatus(e, id, i) {
    console.log(" status = " + i);
    await axios
      .get(baseUrl + "/kiosk-status/" + id + "/" + i)
      .then(() => {
        loadData();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function newList(e, i, type) {
    console.log("newList= " + i);
    let l = 0;

    let lengName = document.getElementsByName("namelist").length;
    console.log("lengName = " + lengName);
    if (i == 1) {
    } else {
      if (i == lengName) {
        l = i - 1;
      } else {
        l = i;
      }
      let x = (document.getElementsByName("namelist")[l].style.margin =
        "46px 0 0 0 ");
      let x1 = (document.getElementsByName("namelist")[i - 1].style.margin =
        "-46px 0 0 0 ");
      setTimeout(() => {
        let y = (document.getElementsByName("namelist")[l].style.margin =
          "0px 0 0 0 ");
        let y2 = (document.getElementsByName("namelist")[i - 1].style.margin =
          "0px 0 0 0 ");
      }, 1600);
    }

    await axios
      .get(baseUrl + "/kiosk-updata-order/" + i + "/" + type)
      .then(() => {
        setTimeout(() => {
          loadData();
        }, 1600);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function newListDown(e, i, type) {
    console.log("order= " + i);
    let lengName = document.getElementsByName("namelist").length;
    console.log("lengName = " + lengName);
    if (i == lengName) {
    } else {
      // let x = document.getElementById('test').style.margin = "10px 0 0 0"
      let x = (document.getElementsByName("namelist")[i - 1].style.margin =
        "46px 0 0 0 ");
      let x1 = (document.getElementsByName("namelist")[i].style.margin =
        "-46px 0 0 0 ");

      // let x1 = document.getElementsByName('namelist')[i+1].style.margin = "-40px 0 0 0 "
      setTimeout(() => {
        let y = (document.getElementsByName("namelist")[i].style.margin =
          "0px 0 0 0 ");
        let y2 = (document.getElementsByName("namelist")[i - 1].style.margin =
          "0px 0 0 0 ");
      }, 1600);
    }

    await axios
      .get(baseUrl + "/kiosk-updata-order-down/" + i + "/" + type)
      .then(() => {
        setTimeout(() => {
          loadData();
        }, 1600);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function showTump(e, i) {
    //
    let x = document.getElementsByName("nameTemp")[0];

    // x.style.display = "none";
    setTump([]);
    setEditId(0); // cancel Edit
    // x.style.display = "flex";
    x.style.margin = "100px 0px 0 0";
    setTimeout(() => {
      x.style.margin = "10px 0px 0 0";
      let xx = DataAll.filter((item) => item.id == i);
      console.log(xx);
      console.log(xx[0].picture);
      console.log(xx[0].type);
      setType(xx[0].type);
      setTump(xx[0].picture);
    }, 500);
    // console.log(DataAll);
  }

  function editDuration(e, id) {
    console.log("duration = ", id);
    setshowDuration(1);
    setEditId(id);
  }

  async function onChengeDuration(e) {
    setshowDuration(0);
    setDuration(e.target.value);
    let duration = e.target.value;
    await axios
      .get(baseUrl + "/editDuration/" + duration + "/" + editId)
      .then((resp) => {
        console.log("ok");
        loadData();
      });
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="box-list">
      <ul>
        <li id="test">
          <span>Status</span>

          <span style={{ flex: "2" }}>Title</span>
          <span>Adjust</span>
          {/* <span>detail</span> */}
          <span>Delay</span>

          <span>Edit Delay</span>
          <span>Order</span>

          <span>Del</span>
        </li>

        {Data.map((item, index) => {
          return (
            <li name="namelist" key={index}>
              {item.status == 1 ? (
                <span
                  className="material-icons"
                  style={{ color: "green", cursor: "pointer" }}
                  onClick={(e) => {
                    upDateStatus(e, item.id, 0);
                  }}
                >
                  check_box
                </span>
              ) : (
                <span
                  className="material-icons"
                  style={{ color: "#CCC", cursor: "pointer" }}
                  onClick={(e) => {
                    upDateStatus(e, item.id, 1);
                  }}
                >
                  check_box_outline_blank
                </span>
              )}

              <span
                style={{
                  flex: "2",
                  justifyContent: "flex-start",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  showTump(e, item.id);
                }}
              >
                {item.title}
              </span>

              <span style={{ cursor: "pointer" }}>
                <i
                  className="material-icons"
                  style={{ color: "#f38e12" }}
                  onClick={(e) => {
                    newList(e, item.order_list, item.displaytype);
                  }}
                >
                  arrow_upward
                </i>
                <i
                  className="material-icons"
                  style={{ color: "#007bff" }}
                  onClick={(e) => {
                    newListDown(e, item.order_list, item.displaytype);
                  }}
                >
                  arrow_downward
                </i>
              </span>
              {/* <span>{item.duration}</span> */}
              <span>{item.duration_list}</span>
              {showDuration == 1 && editId == item.id ? (
                <span>
                  <select
                    id="lang"
                    onChange={onChengeDuration}
                    value={Duration}
                  >
                    <option selected value="60">
                      -โปรดเลือก-
                    </option>
                    <option value="1">1 sec.</option>
                    <option value="5">5 sec.</option>
                    <option value="10">10 sec.</option>
                    <option value="30">30 sec.</option>
                    <option value="60">1 min.</option>
                    <option value="120">2 min.</option>
                    <option value="300">5 min.</option>
                    <option value="600">10 min.</option>
                    <option value="900">15 min.</option>
                    <option value="1200">20 min.</option>
                  </select>
                </span>
              ) : (
                <span
                  onClick={(e) => {
                    editDuration(e, item.id);
                  }}
                >
                  <i
                    class="material-icons"
                    style={{ color: "orange", cursor: "pointer" }}
                  >
                    create
                  </i>
                </span>
              )}

              <span>{item.order_list}</span>
              <span
                // onClick={(e) => {
                //   delDisplay(e, item.id);
                // }}
                onClick={(e) => {
                  if (window.confirm("Delete the item?")) {
                    delDisplay(e, item.id, item.order_list);
                  }
                }}
                style={{ cursor: "pointer" }}
              >
                <i className="material-icons" style={{ color: "red" }}>
                  backspace
                </i>
              </span>
              {/* <span>{item.picture}</span> */}
            </li>
          );
        })}
      </ul>
      <ul className="box-tump" name="nameTemp">
        <li>
          {Type == 3 ? <img src={preview} /> : null}
          {Tump != "" && Type == 0 ? <img src={Tump} /> : null}
          {Tump != "" && Type == 1 ? (
            <ReactPlayer
              // url="../video/videoplayback.mp4"
              url={Tump}
              width="100%"
              // height="100%"
              controls={true}
              playing={true}
              //  onPlay={onplayvideo}
              // onDuration={handleDuration}
              //  onEnded={fnEnd}
              muted={true}
              //  vimeoConfig={{ iframeParams: { fullscreen: 0 } }}
            />
          ) : null}
        </li>
      </ul>
    </div>
  );
};

export default List;
