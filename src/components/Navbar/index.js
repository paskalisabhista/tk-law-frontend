import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import useLogin from "@/src/utils/useLogin";
import { useState, useEffect } from "react";

const semiBoldPoppins = Poppins({ weight: "600", subsets: ["latin"] });
const regularPoppins = Poppins({ weight: "400", subsets: ["latin"] });

export default function Navbar(props) {
    const [username, setUsername] = useState(null);
    const [role, setRole] = useState(null);
    const {logout, detail} = useLogin()
    
    useEffect(() => {
        getDetail()
    }, []);

    const getDetail = async () => {
        try {
            await detail().then((res) => {
                console.log(res);
                setUsername(res["username"]);
                setRole(res["role"]);
            });
        } catch (err) {
            console.log(err);
        }
    };

    function handleLogout() {
        logout()
    }

    

    return (
        <div
            className={`${regularPoppins.className} flex px-20 h-24 w-full min-w-[1313px] justify-start items-center text-xl`}
        >
            <div className="flex space-x-2">
                <Image
                    src="/chef-hat.png"
                    alt="Chef Hat Icon"
                    width={32}
                    height={32}
                    priority
                />
                <div className={`${semiBoldPoppins.className} text-3xl w-60`}>
                    LAW Cafe
                </div>
            </div>

            <div className="grow"></div>
            <div className="flex justify-self-end space-x-16 h-10">
                <Link className="flex h-10 items-center" href={"/"}>
                    <div>Home</div>
                </Link>
                <Link className="flex h-10 items-center" href={"/menu"}>
                    <div>Menu</div>
                </Link>
                <Link className="flex h-10 items-center" href={"/order"}>
                    <div>Order</div>
                </Link>
                <Link className={`${role == "Admin"? "" : "hidden"} flex h-10 items-center`} href={"/dashboard"}>
                    <div>Dashboard</div>
                </Link>
                <button type="button" className="h-10 rounded-[84px] px-5 bg-[#E63946] text-white opacity-75" onClick={() => handleLogout()}>Logout</button>
            </div>
        </div>
    );
}
