import React from "react";
import Function from "./Function";
import Test from "./Function";
import User from  "./User";
import Home from "./Home";

function App () {
  return (
    <div>
      <Function  text="Hello World!" />
      <Test text="Hello World1!" />
      <User name={{data:'amit'}}/>
      <Home  text="Hello World!!!!!!" />
    </div> 
  )
  }

export default App;