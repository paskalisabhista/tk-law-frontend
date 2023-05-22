import axios from "axios";
import { Poppins } from "next/font/google";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useLogin from "@/src/utils/useLogin";

const boldPoppins = Poppins({ weight: "700", subsets: ["latin"] });
const semiBoldPoppins = Poppins({ weight: "600", subsets: ["latin"] });
const regularPoppins = Poppins({ weight: "400", subsets: ["latin"] });

export default function SignUpForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [role, setRole] = useState("");
    const { register } = useLogin();

    function handleRegister() {
        register(username, password, passwordConfirmation, role);
    }

    return (
        <>
            <div
                className={`${regularPoppins.className} w-80 h-100 rounded-xl bg-[#fbf8f4] p-2`}
            >
                <Link href={"/login"}>
                    <div className="flex w-[16px] ml-2 mt-2">
                        <img src="back-icon.png"></img>
                    </div>
                </Link>
                <div
                    className={`${boldPoppins.className} text-center mt-3 text-2xl text-[#FF7E00]`}
                >
                    Sign Up
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
                    <div className="flex flex-col">
                        <label className={`${semiBoldPoppins.className}`}>
                            Password Confirmation
                        </label>
                        <input
                            type="text"
                            className="border border-[#909090] text-center rounded-md"
                            id="passwordConfirmation"
                            value={passwordConfirmation}
                            placeholder="Password Confirmation"
                            onChange={(e) =>
                                setPasswordConfirmation(e.target.value)
                            }
                        ></input>
                    </div>
                    <div className="flex flex-col">
                        <label className={`${semiBoldPoppins.className}`}>
                            Role
                        </label>
                        <select
                            className="border border-[#909090] text-center rounded-md"
                            onChange={(e) => setRole(e.target.value.toLowerCase())}
                        >
                            <option disabled selected value>
                                {" "}
                                Choose role{" "}
                            </option>
                            <option>Customer</option>
                            <option>Kitchen</option>
                            <option>Courier</option>
                            <option>Admin</option>
                        </select>
                    </div>
                    <div className="relative flex justify-center item-center mt-20">
                        <button
                            type="button"
                            className={`${semiBoldPoppins.className}bottom-2 bg-[#2F2F2F] w-28 h-8 rounded-xl text-[#F4ECE1] drop-shadow-2xl mt-10`}
                            onClick={() => handleRegister()}
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
