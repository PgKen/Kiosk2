import React, { useState, useEffect } from "react";
import "../css/Display.css";
import imgLogo from "../img/logo_srimaung.png";
import axios from "axios";
import ReactPlayer from "react-player";

// import ReactPlayer from "react-player";

let dataArray = [];
let baseUrl = "http://taladsrimuang.com:5180";
// let baseUrl = "http://localhost:5180";

let g_i = 0;
let g_dura = 360000;

const Displayled = () => {
  const [Display, setDisplay] = useState(null);

  const [videolink, setVideolink] = useState();
  const [Video, setVideo] = useState(0);
  // setInterval(() => {
  //     loop(1);
  // }, 3000);

  async function chkReboot() {
    await axios
      .get(baseUrl + "/kiosk-chkReboot-led")
      .then((resp) => {
        console.log("Active reboot = " + resp.data[0].active);
        if (resp.data[0].active == "1") {
          console.log(" Reboot = 1 ");
          axios.get(baseUrl + "/kiosk-unboot-led").then(() => {
            fnReloadPage();
          });
        } else {
          console.log(" Reboot = 0 ");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function fnReloadPage() {
    window.location.reload();
  }

  async function loop(i, dura) {
    chkReboot();
    console.log("dataArray.length = " + dataArray.length);
    console.log(dataArray);
    let id = i + 1;
    g_i = id
    console.log("id = "+id);
    if (id == dataArray.length) {
      id = 0;
      g_i = 0;
    }
    //set video or picture
    if (dataArray[i].type == 1) {
      dura = 3600000;
      g_dura = 3600000;
      setVideo(1);
    } else {
      setVideo(0);
    }
    setDisplay(dataArray[i].picture);
    // end
    console.log("i get loop = " + i);
    console.log("loop = " + i);
    console.log("loop = " + dura);
    console.log(dataArray[i].title);
    setTimeout(() => {
      loop(id, dataArray[id].duration);
    }, dura);
  }

  async function loadData() {
    console.log("ok");
    await axios
      .get(baseUrl + "/kiosk-list-led")
      .then((resp) => {
        // console.log(resp.data);
        dataArray = resp.data;
        // fnSet();
        loop(0, dataArray[0].duration);
        // loop(1000,0);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function onplayvideo() {
    console.log("Play.................!!!!");
  }

  async function fnEnd() {
    console.log("End");
   
    console.log("g_i = " + g_i);
    console.log("dataArray.length = " + dataArray.length);
    if(g_i == (dataArray.length) ){
      g_i = 0;
    }else{
      // g_i = g_i + 1
    }
    loop(g_i,dataArray[g_i].duration)
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="box-led14">
      {Video == 1 ? (
        <ReactPlayer
          // url="../video/videoplayback.mp4"
          url={Display}
          width="100%"
          height="100%"
          controls={true}
          playing={true}
          onPlay={onplayvideo}
          // onDuration={handleDuration}
          onEnded={fnEnd}
          muted={true}
          // vimeoConfig={{ iframeParams: { fullscreen: 0 } }}
        />
      ) : Display == null ? null : (
        <img src={Display} />
      )}
    </div>
  );
};

export default Displayled;
