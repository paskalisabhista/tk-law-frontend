import { Poppins } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import useLogin from "@/src/utils/useLogin";

const boldPoppins = Poppins({ weight: "700", subsets: ["latin"] });
const semiBoldPoppins = Poppins({ weight: "600", subsets: ["latin"] });
const regularPoppins = Poppins({ weight: "400", subsets: ["latin"] });
const AUTH_BACKEND_URL = "http://localhost:8000"; // local
// const AUTH_BACKEND_URL = "http://orchestrator-service:8000"

export default function SignInForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useLogin()

    function handleSubmit() {
        login(username, password)
    }

    return (
        <>
            <div
                className={`${regularPoppins.className} w-80 h-80 rounded-xl bg-[#fbf8f4] p-2`}
            >
                <div
                    className={`${boldPoppins.className} text-center mt-3 text-2xl text-[#FF7E00]`}
                >
                    Sign In
                </div>
                <form className="flex w-full h-full flex-col p-2 space-y-3">
                    <div className="flex flex-col">
                        <label className={`${semiBoldPoppins.className}`}>
                            Username
                        </label>
                        <input
                            type="text"
                            className="border border-[#909090] text-center rounded-md"
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
                            className="border border-[#909090] text-center rounded-md"
                            id="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
                    </div>
                    <div className="flex">
                        <div>Need an account?</div>
                        <div className="grow"></div>
                        <Link href={"/register"}>
                            <div className="underline">Sign up</div>
                        </Link>
                    </div>
                    <div className="relative flex justify-center item-center mt-20">
                        <button
                            type="button"
                            className={`${semiBoldPoppins.className}bottom-2 bg-[#2F2F2F] w-28 h-8 rounded-xl text-[#F4ECE1] drop-shadow-2xl mt-10`}
                            onClick={() => handleSubmit()}
                        >
                            Log In
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
