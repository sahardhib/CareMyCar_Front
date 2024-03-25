import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from "./components/Layout";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Registre from "./components/Registre";
import UsersPages from "./components/UsersPages";
import Logiin from "./components/Logiin";
import Logout from "./components/Logout";
import Visits from "./components/Visits";
import Account from "./components/Account";
import ForgetPassword from "./components/ForgetPassword";
import Authen from "./components/Authen";
import AuthGuard from './components/AuthGuard'; // Import the AuthGuard HOC
import Voiture from "./components/Voiture";
import ListeVoiture from "./components/ListeVoiture";
import AjouterVoiture from "./components/AjouterVoiture";
import Editvoiture from  './components/Editvoiture';
import Client from "./components/Client";
import UserInfo from "./components/UserInfo";
import Service from "./components/Service";
import Edit from "./components/Edit";





function App() {
    return (
        <Router>
            <Routes>

                <Route path="/Home" element={<Layout><Home /></Layout>} />
                <Route path="/UserInfo" element={<AuthGuard><Layout><UserInfo /></Layout></AuthGuard>} />
                <Route path="/Client" element={<Layout><Client /></Layout>} />
                <Route path="/about" element={<Layout><About /></Layout>} />
                <Route path="/contact" element={<Layout><Contact /></Layout>} />
                <Route path="/Account" element={<AuthGuard><Layout><Account /></Layout></AuthGuard>} />
                <Route path="/Logout" element={<Layout><Logout /></Layout>} />
                <Route path="/registre" element={<Registre />} />
                <Route path="/ForgetPassword" element={<ForgetPassword />} />
                <Route path="/" element={<Logiin />} />
                <Route path="/Client" element={<Client />} />
                <Route path="/Service" element={<Service />} />
                <Route path="/Authen" element={<Authen />} />
                <Route path="/Visits" element={<AuthGuard><Layout><Visits /></Layout></AuthGuard>} />
                <Route path="/ListeVoiture" element={<AuthGuard><Layout><ListeVoiture /></Layout></AuthGuard>} />
                <Route path="/AjouterVoiture" element={<AjouterVoiture />} />
                <Route path="/editvoiture/:id/edit" element={<Editvoiture />} />

            </Routes>
        </Router>
    );
}

export default App;
