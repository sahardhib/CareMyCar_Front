// components/Layout.js
import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>

        <div className="row">
            <div className=" col-1">
                <Navbar />
            </div>
            <div className="col ">
                {children}
            </div>

        </div>

    </>
  );
};

export default Layout;
