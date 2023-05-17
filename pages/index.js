import { useState, useEffect } from "react";
import { Poppins } from "next/font/google";
import axios from "axios";
import Image from "next/image";

const regularPoppins = Poppins({ weight: "400", subsets: ["latin"] });
const boldPoppins = Poppins({ weight: "700", subsets: ["latin"] });
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
        <div
            className={`${regularPoppins.className} flex justify-center mx-28 mt-12 min-w-max`}
        >
            <div className="space-y-8 w-[35rem] pt-[120px]">
                <div className={`${boldPoppins.className} relative flex`}>
                    <div className="text-9xl mr-4 text-[#FF7E00]">Fast</div>
                    <div className="flex text-5xl justify-center items-center">
                        Food <br></br> Delivery
                    </div>
                    <div className="absolute min-w-fit right-1 -top-28 rotate-[18deg]">
                        <Image
                            className="min-w-fit min-h-fit"
                            src="/rope.png"
                            alt="Rope Image"
                            width={140}
                            height={176}
                            priority
                        ></Image>
                    </div>
                </div>
                <div className="text-[#909090] text-xl w-[35rem]">
                    Sed ut perspiciatis unde omnis iste natus sit voluptatem
                    accusantium doloremque laudantium
                </div>
                <div>
                    <button className="flex justify-center items-center bg-#2F2F2F text-#F4ECE1 w-48 h-16 rounded-[84px] text-xl drop-shadow-2xl">
                        Order Now
                    </button>
                </div>
            </div>
            <div className="min-w-fit min-h-fit">
                <Image
                    className="min-w-fit min-h-fit"
                    src="/food-bag.png"
                    alt="Food Bag Image"
                    width={750}
                    height={712}
                    priority
                ></Image>
            </div>
        </div>
    );
}
