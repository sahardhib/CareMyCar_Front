import logo from './logo.svg';
import './App.css';
import axios  from 'axios';
import React,{ useState,useEffect } from 'react' ;
import Home from './Home';
import Function from './Function';

function App() {

  const [user , setUser] = useState("");

  /*const fetchData  = () => {
    return axios .get('http://127.0.0.1:8000/api/users')
    .then((response) => setUser(response.data["user"]));
  }*/

  const fetchData  = ()=>{
        return fetch ('http://127.0.0.1:8000/api/users')
        .then ( response => response.json())
         .then ((data)=>{setUser(data["user"])})
  };
  useEffect (()=>{fetchData();},[]);
  return (
    <div className="App">
      <Function />
     <Home /> 
     <h1>User Liste</h1>
     <ul>
      {user && user.length>0 && user.map((userObj , index)=>
      (<li key = {userObj.id}>{userObj.name}<br></br>{userObj.email}</li>))}
     </ul>
    </div>
  );
}

export default App;
