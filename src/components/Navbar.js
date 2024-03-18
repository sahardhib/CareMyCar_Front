import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseUser,
  faAddressCard,
  faMessage,
  faUser,
  faCar,
  faRightFromBracket,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";





function Navbar() {
  return (
    
    <div className="bodyy">
      <nav className="nav">
        <ul>
          <li>
            <a href="/" className="logoo" >
              <img src="/img/download.jpeg" alt="" />
            </a>
          </li>
          <li>
            <a href="/" className="aaa">
              <FontAwesomeIcon icon={faHouseUser}  className="fff"/>
              <span className="nav-item">home</span>
            </a>
          </li>
          <li>
            <a href="/About" className="aaa">
              <FontAwesomeIcon icon={faAddressCard}className="fff" />
              <span className="nav-item">about us</span>
            </a>
          </li>
          <li>
            <a href="/Contact" className="aaa">
              <FontAwesomeIcon icon={faMessage}className="fff" />
              <span className="nav-item">contact</span>
            </a>
          </li>
          {localStorage.getItem("user") ? (
            <>
              <li>
                <a href="/UserInfo"className="aaa">
                  <FontAwesomeIcon icon={faUser}className="fff" />
                  <span className="nav-item">Account</span>
                </a>
              </li>
              <li>
                <a href="/ListeVoiture"className="aaa" >
                  <FontAwesomeIcon icon={faCar} className="fff" />
                  <span className="nav-item">Mes Véhicules</span>
                </a>
              </li>
              <li>
                <a href="/Logout"className="lll">
                  <FontAwesomeIcon icon={faRightFromBracket} className="fff" />
                  <span className="nav-item">logout</span>
                </a>
              </li>
            </>
          ) : (
            <>
              <li>
                <a href="/logiin"className="aaa">
                  <FontAwesomeIcon icon={faRightToBracket} className="fff" />
                  <span className="nav-item">login</span>
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;