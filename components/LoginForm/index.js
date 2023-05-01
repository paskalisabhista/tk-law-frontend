import axios from "axios";
import { Poppins } from "next/font/google";
import { useRouter } from "next/router";
import { useState } from "react";

const semiBoldPoppins = Poppins({ weight: "600", subsets: ["latin"] });
const regularPoppins = Poppins({ weight: "400", subsets: ["latin"] });
// const AUTH_BACKEND_URL = "http://localhost:8000" // local
const AUTH_BACKEND_URL = "http://orchestrator-service:8000"


export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter()
    const url = `${AUTH_BACKEND_URL}/token/login`

    function handleSubmit(){
        axios.post(url, {
            username: username,
            password: password
        }).then(res => {
            console.log(res.data)
            console.log(res.data['access'])
            console.log(res.data['refresh'])
            localStorage.setItem("accessToken", res.data["access"])
            localStorage.setItem("refreshToken", res.data["refresh"])
            console.log("accessToken from localStorage : " + localStorage.getItem("accessToken"))
            router.push("/")
        }).catch(function name(err) {
            console.log(err)            
        })
    }

    return (
        <>
            <div className={`${regularPoppins.className} w-80 h-72 border border-black rounded-md`}>
                <form className="flex w-full h-full flex-col p-2">
                    <div className="flex flex-col">
                        <label className={`${semiBoldPoppins.className}`}>
                            Username
                        </label>
                        <input
                            type="text"
                            className="border border-black text-center rounded-md"
                            id="username"
                            value={username}
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                        ></input>
                    </div>
                    <div className="flex flex-col">
                        <label className={`${semiBoldPoppins.className}`}>
                            Password
                        </label>
                        <input
                            type="text"
                            className="border border-black text-center rounded-md"
                            id="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
                    </div>
                    <div className="flex">
                        <div>Need an account?</div>
                        <div className="grow"></div>
                        <div>Sign up</div>
                    </div>
                    <div className="relative flex justify-center item-center h-full">
                        <button type="button" className={`${semiBoldPoppins.className} absolute bottom-2 bg-#3A86FF w-28 h-8 rounded-md text-white`} onClick={() => handleSubmit()}>Login</button>
                    </div>
                    
                </form>
            </div>
        </>
    );
}
