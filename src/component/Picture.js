import React, { useState } from "react";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
// import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";

import axios, { post } from "axios";

import waitLoad from "../img/wait.gif";

let baseUrl = "http://taladsrimuang.com:5180";
// let baseUrl = "http://localhost:5180";
// let baseUrl = "http://172.16.1.238:5180/kiosk-chkReboot";

const Picture = () => {
  const [file, setfile] = useState(null);
  const [text, setText] = useState(null);
  const [Duration, setDuration] = useState(60);
  const [DisplayType, setDisplayType] = useState(0)

  const [Wait, setWait] = useState(0);

  async function onFormSubmit(e) {
    setWait(1);
    e.preventDefault(); // Stop form submit
    setTimeout(() => {
      fileUpload(file).then((resp) => {
        // console.log(resp.data);
        console.log("TEST File");
        console.log(file);
      });
    }, 10000);
  }

  function fileUpload(file) {
    setWait(0);
    const url = baseUrl + "/kiosk-upload";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("text", text);
    formData.append("duration", Duration);
    formData.append("displaytype", DisplayType);
    const config = {
      headers: {
        // "Accept": "application/json, text/plain, */*",
        "content-type": "multipart/form-data",
      },
    };
    return post(url, formData, config);
  }

  function onChange(e) {
    // this.setState({file:e.target.files[0]})
    console.log("test file");
    // setfile({ file: e.target.files[0] });
    setfile(e.target.files[0]);
    console.log(file);
  }

  function onChangeText(e) {
    setText(e.target.value);
  }

  function onChengeDuration(e) {
    setDuration(e.target.value);
  }

  function onChangeDisplay(e){
    setDisplayType(e.target.value)
  }

  return (
    <div className="box-picture">
      {Wait == 1 ? (
        <div className="upload-wait">
          <img src={waitLoad} />
        </div>
      ) : null}
      <form onSubmit={onFormSubmit}>
        {/* <form id="onForm"> */}
        <ul>
          <li>
            <span className="hedePicture">Image show</span>
          </li>
          <li>
            <span>Tilte</span>
            <input onChange={onChangeText} />
          </li>
          <li>
            <input type="file" onChange={onChange} />
            <span style={{ fontSize: 12, color: "orangered" }}>
              Base size : w: 700px h: 1020px
            </span>
            <span style={{ fontSize: 12, color: "orangered" }}>
              OR w: 1080px h: 1520px
            </span>
          </li>
          <li>
            <span>Duration</span>
            <span>&nbsp;</span>
            <span>&nbsp;</span>
            <select id="lang" onChange={onChengeDuration} value={Duration}>
              <option value="60">-โปรดเลือก-</option>
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
            <span style={{ margin: "0 0 0 8px" }}></span>
          </li>
          <li>
          <span>Display Type</span>
            <span>&nbsp;</span>
            <span>&nbsp;</span>
            <select onChange={onChangeDisplay} value={DisplayType}>
              <option value="0">KIOSK</option>
              <option value="1">LED</option>
            </select>
            <span style={{ margin: "0 0 0 8px" }}></span>
          </li>
          {/* <button className="btn btn-danger" onClick={() => {if(window.confirm('Delete the item?')){this.removeToCollection(key, e)};}}>Supprimer</button> */}

          <li style={{ justifyContent: "center" }}>
            <Button
              type="submit"
              variant="primary"
              // onClick={() => {
              //   if(window.confirm('Delete the item?')){
              //     onFormSubmit();
              //   }
              // }}
            >
              ตกลง
            </Button>{" "}
            {/* <Button variant="success">Success</Button>{' '} */}
          </li>
        </ul>
      </form>
    </div>
  );
};

export default Picture;
