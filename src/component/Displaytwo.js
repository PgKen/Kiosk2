import React, { useState, useEffect } from "react";
import "../css/Display.css";
import imgLogo from "../img/logo_srimaung.png";
import axios from "axios";
import ReactPlayer from "react-player";

import $ from "jquery";

import ShowDisplay from "./ShowDisplay";

let i = 0;
let g_i = 0;
let dataArray = [];


const Displaytwo = () => {
  console.log("Display2");
  let gal_i = 0;

  const [Display, setDisplay] = useState();
  const [Databanner, setDatabanner] = useState([]);

  const [counter, setCounter] = useState(0);

  const [showTitle, setshowTitle] = useState();
  const [showTime, setshowTime] = useState();
  const [showPicture, setshowPicture] = useState();

  const [videolink, setVideolink] = useState();
  const [Video, setVideo] = useState(0);

  const [dataprice, setdataprice] = useState([]);

  const [ThisDate, setThisDate] = useState("");

  let baseUrl = "http://taladsrimuang.com:5180";
  // let baseUrl = "http://localhost:5180";
  // let baseUrl = "http://172.16.1.238:5180/kiosk-chkReboot";

  let varLoot;
  /*
  ///////////////////
  // const doSomething = () => {
  //   setCounter(123);
  // };
  // useEffect(() => {
  //   console.log("Do something after counter has changed", counter);
  // }, [counter]);
  //////////////////
  */

  async function chkReboot() {
    await axios
      // .get("http://localhost:5180/kiosk-chkReboot")
      // .get("http://172.16.1.238:5180/kiosk-chkReboot")
      .get(baseUrl + "/kiosk-chkReboot2")
      .then((resp) => {
        console.log("Active reboot = " + resp.data[0].active);
        if (resp.data[0].active == "1") {
          console.log(" Reboot = 1 ");
          axios
            // .get("http://localhost:5180/kiosk-unboot")
            .get(baseUrl + "/kiosk-unboot2")
            .then(() => {
              fnReloadPage();
            });
        } else {
          console.log(" Reboot = 0 ");
        }
      })
      // .then(()=>{

      // })
      .catch(function (error) {
        console.log(error);
      });
  }

  function fnReloadPage() {
    // setTimeout(() => {
    window.location.reload();
    // }, 3000);
  }

  async function loadData() {
    console.log("ok");
    setDatabanner([]);
    await axios
      // .get("http://localhost:5180/kiosk-list")
      // .get("http://172.16.1.238:5180/kiosk-list")
      .get(baseUrl + "/kiosk-list")
      .then((resp) => {
        console.log(resp.data);
        console.log("11111");

        setDatabanner(resp.data);
        dataArray = resp.data;
        // fnSet();
        // loop(1000,0);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function fnSet() {
    console.log("fnSet");
    console.log(Databanner);
  }

  async function loop(time_delay, i) {
    chkReboot();
    let Duration = 0;
    gal_i = i;
    // if(i == dataArray.length){
    //   g_i = 0
    // }else{
    //   g_i = g_i + 1;
    // }

    console.log("loop");
    console.log(dataArray);
    // varLoot = setTimeout(() => {
    await setTimeout(() => {
      console.log("i =" + g_i);
      console.log("type =" + dataArray[g_i].type);
      console.log(dataArray[g_i].title);
      console.log(dataArray[g_i].duration);
      if (dataArray[g_i].type == 1) {
       
        // Duration = dataArray[g_i].duration;
        setVideo(1);
        Duration = 3600000;
        setshowTitle(dataArray[g_i].title);
        setVideolink(dataArray[g_i].picture);
        setshowTime(dataArray[g_i].duration);
        loadPrice();
      } else {
        setVideo(0);
        Duration = dataArray[g_i].duration;
        setshowTitle(dataArray[g_i].title);
        setshowTime(dataArray[g_i].duration);
        setshowPicture(dataArray[g_i].picture);
      }

      // Duration = dataArray[g_i].duration;
      g_i = g_i + 1;
      if (g_i > (dataArray.length - 1)) {
        g_i = 0;
      }
      // Duration = dataArray[g_i].duration;
      
      loop(Duration, g_i);

    }, time_delay);
  }

  function jq() {
    $(document).ready(function () {
      setTimeout(() => {
        console.log("jqery");
        $("#auClick").trigger("click");
        loop();
      }, 2000);
    });
  }

  function onplayvideo() {
    console.log("Play.................!!!!");
  }
  async function fnEnd() {
    // clearTimeout(varLoot);
    // await loadData();
    console.log("END...................!!!!");
    console.log("gol_var = " + g_i);
    // console.log(dataArray);
    console.log(dataArray.length);
    console.log("befor gal_i = " + g_i);
    i = i + 1; // Go next index in Array
    console.log("gal_i = " + g_i);
    if (g_i > dataArray.length - 1) {
      g_i = 0;
    }
    console.log("Duration = " + dataArray[g_i].duration);
    let end_duration = dataArray[g_i].duration;
    // clearTimeout(varLoot);
    // clearTimeout(0);
    console.log("end duration = " + dataArray[g_i].duration);
    console.log("gal_i = " + g_i);
    // setTimeout(loop(1000,1));
    setTimeout(() => {
      // loop(dataArray[g_i].duration, g_i);
      loop(500, g_i);
    }, 1000);
    // setTimeout(() => {
    //   loop(end_duration, gal_i);
    // }, 2000);

    // loop(end_duration, gal_i);
  }

  function clk() {
    console.log(Databanner);
    fnSet();
  }

  async function loadPrice() {
    setdataprice([]);
    await axios
      // .get("http://taladsrimuang.com:3200/checkB1")
      // .get("https://taladsrimuang.com:5100/imgPrice")
      .get("https://taladsrimuang.com:5100/imgPrice_web")
      .then((resp) => {
        setdataprice(resp.data);
        setThisDate(resp.data[0].date_check);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    loadData();
    loadPrice();
    // chkReboot();
    // jq();
    loop(1000, 0);
    // fnSet();
    // console.log("Chang+++++", Databanner);
  }, []);

  return (
    <div className="box-display">
      <ul className="header-top">
        <li>
          <img src={imgLogo} alt="" />
        </li>
      </ul>
      <ul className="txt-banner">
        <li>
          <span id="auClick" onClick={fnSet}>
            {" "}
            www.taladsrimuang.com{" "}
          </span>
        </li>
      </ul>
      <ul className="displayShow">
        <li className="display-header">
          <span>
            <div className="sub_span_1"></div>
            <div className="sub_span_1"></div>
          </span>
          <span
            className="span_title"
            style={{
              backgroundColor: "#009548",
              padding: "2px 10px",
              color: "white",
              width: "400px",
            }}
          >
            {showTitle ? showTitle : null}
          </span>
          <span>
            <div className="sub_span"></div>
            <div className="sub_span"></div>
          </span>
        </li>
        <li className="box-display-img">
          {Video == 1 ? (
            <div>
              <ReactPlayer
                // url="../video/videoplayback.mp4"
                url={videolink}
                width="100%"
                // height="100%"
                controls={true}
                playing={true}
                onPlay={onplayvideo}
                // onDuration={handleDuration}
                onEnded={fnEnd}
                // muted={true}
                vimeoConfig={{ iframeParams: { fullscreen: 0 } }}
              />
              <div className="head-video-price">
                ราคาผัก-ผลไม้ ประจำวันที่&nbsp;&nbsp; {ThisDate}
              </div>
              <ul className="box-price-list">
                {dataprice.map((item) => {
                  return (
                    <li key={item.id}>
                      <span>
                        <img
                          style={{ width: "auto" }}
                          src={item.name_img}
                          alt="new"
                        />
                      </span>
                      <span style={{ fontWeight: "bold" }}>
                        {item.name_pro}
                      </span>
                      <span>
                        {item.diff === "0" ? (
                          <i
                            className="fas fa-angle-double-down"
                            style={{ color: "red" }}
                          ></i>
                        ) : null}
                        {item.diff === "1" ? (
                          <i
                            className="fas fa-equals"
                            style={{ color: "blue" }}
                          ></i>
                        ) : null}
                        {item.diff === "2" ? (
                          <i
                            className="fas fa-angle-double-up"
                            style={{ color: "green" }}
                          ></i>
                        ) : null}
                        &nbsp;{item.price_pro}&nbsp;บาท/{item.unitname}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <img src={showPicture} />
          )}
        </li>
        <li className="delay-time">{showTime ? showTime : null}</li>
        <li className="bypower">Copyright&copy;2021&nbsp;&nbsp;by IT Srimuang</li>
      </ul>

      {/* <ShowDisplay data={Databanner}/> */}
      {/* <li onClick={showData}>xxx</li> */}
    </div>
  );
};

export default Displaytwo;
