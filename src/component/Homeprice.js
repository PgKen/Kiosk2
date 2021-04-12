import React, { useEffect, useState } from "react";
import axios from "axios";

// import vtest from '../video/21_01_19_09_03_08Video_2021-01-16_160331.wmv'
import vtest from '../video/videoplayback.mp4'

// import ReactPlayer from "react-player/youtube";
import ReactPlayer from "react-player";
// import YouTube from "react-youtube";

const Homeprice = () => {
  //   const initialState = [];
  const [dataprice, setdataprice] = useState([]);

  async function loadData() {
    await axios
      // .get("http://taladsrimuang.com:3200/checkB1")
      // .get("https://taladsrimuang.com:5100/imgPrice")
      .get("https://taladsrimuang.com:5100/imgPrice_web")
      .then((resp) => {
        setdataprice(resp.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // async function loadData2() {
  //   // console.log(dataprice[0].length);
  //   // console.log(dataprice);
  // }

  function fnOnstart() {
    console.log("start");
  }

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      //https://www.youtube.com/watch?v=1WxQBYHUN20,
      autoplay: 1,
    },
  };

  function onplayvedeo(){
    console.log("play");
    ReactPlayer.muted = false
    // muted={true}
  }

  function handleDuration (duration){
    console.log('onDuration = ', duration)
    // this.setState({ duration })
  }

  function fnEnd(){
    console.log("END");
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      {/* <YouTube videoId="1WxQBYHUN20" opts={opts} /> */}
      {/* <ReactPlayer  
       url="http://172.16.1.238:5180/kiosk/21_01_19_09_03_08Video_2021-01-16_160331_test.wmv"
       url="../video/v_test.wmv"
       url={vtest}
       url="../video/videoplayback.mp4"
             width='100%'
             height='100%'
             controls = {true}
             playing = {true}
             onPlay={onplayvedeo}
             onDuration={handleDuration}
             onEnded={fnEnd}
             muted={true}
       />
       */}
      <ul className="box-price-list">
        {dataprice.map((item) => {
          return (
            <li key={item.id}>
              <span>
                <img src={item.name_img} alt="new" />
              </span>
              <span style={{ fontWeight: "bold" }}>{item.name_pro}</span>
              <span>
                {item.diff === "0" ? (
                  <i
                    className="fas fa-angle-double-down"
                    style={{ color: "red" }}
                  ></i>
                ) : null}
                {item.diff === "1" ? (
                  <i className="fas fa-equals" style={{ color: "blue" }}></i>
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
  );
};

export default Homeprice;
