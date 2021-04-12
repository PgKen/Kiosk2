import React, { useState, useEffect } from "react";

const ShowDisplay = (props) => {
  let gData = props.data;
  console.log(gData);
  // let gData = props.data[0].duration;
  let i = 0;

  const [Data, setData] = useState([]);
  const [showData, setshowData] = useState();
  console.log("testxxxxxxxxx");
  // setData(setData)
  // console.log(props.data);
  // console.log(gData.length);

  function loadData(){
    console.log("set");
    console.log(gData);
    setData(props.data)
    renderShow();
  }

  function renderShow(){

    setInterval(() => {
      console.log("TEST render");
      console.log(Data);
      console.log("TEST render2");
    }, 3000);
  }



  useEffect(() => {
    loadData()

   // renderShow();
  }, []);

  return (
    <ul className="box-price" id="inData">
      {Data}xx
    </ul>
  );
};

export default ShowDisplay;
