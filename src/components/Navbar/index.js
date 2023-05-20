import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import useLogin from "@/src/utils/useLogin";

const semiBoldPoppins = Poppins({ weight: "600", subsets: ["latin"] });
const regularPoppins = Poppins({ weight: "400", subsets: ["latin"] });

export default function Navbar(props) {
    const {logout} = useLogin()

    function handleLogout() {
        logout()
    }

    return (
        <div
            className={`${regularPoppins.className} flex px-20 h-24 w-full min-w-[1534px] justify-start items-center text-xl`}
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
                    Food App
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
                <Link className="border rounded-2xl border-[#3A86FF] flex h-10 items-center bg-[#3A86FF] text-white px-5" href={"/login"}>
                    <div>Login</div>
                </Link>
                <button type="button" className="h-10" onClick={() => handleLogout()}>Logout</button>
            </div>
        </div>
    );
}
