import { useState, useEffect } from "react";
import { Poppins } from "next/font/google";
import axios from "axios";

const regularPoppins = Poppins({ weight: "400", subsets: ["latin"] });
const AUTH_BACKEND_URL = "http://localhost:8000";
// const AUTH_BACKEND_URL = "http://orchestrator-service:8000"

export default function Home(props) {
    const [username, setUsername] = useState(null);
    const [role, setRole] = useState(null);
    const url = `${AUTH_BACKEND_URL}/token/detail`;

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");

        axios
            .get(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((res) => {
                setUsername(res.data["username"]);
                setRole(res.data["role"]);
            })
            .catch(function name(err) {
                console.log(err);
            });
    }, []);

    return (
        <>
            <div className={`${regularPoppins.className}`}>
                <p>Username:</p>
                {username}
                <p>Role:</p>
                {role}
            </div>
        </>
    );
}
