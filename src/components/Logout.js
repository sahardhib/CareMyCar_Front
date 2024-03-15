import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        function logout() {
            localStorage.clear();
            navigate("/logiin");
        }

        logout();
    }, [navigate]);

    return null; // You can also return a message or UI element if needed
}

export default Logout;
