import { useState, useEffect } from "react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import useLogin from "@/src/utils/useLogin";
import Link from "next/link";

const regularPoppins = Poppins({ weight: "400", subsets: ["latin"] });
const boldPoppins = Poppins({ weight: "700", subsets: ["latin"] });

export async function getStaticProps() {
    return { props: { title: "Home" , withNavbar: true} };
}

export default function Home(props) {
    const [username, setUsername] = useState(null);
    const [role, setRole] = useState(null);
    const { detail } = useLogin();

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

    return (
        <div
            className={`${regularPoppins.className} flex justify-center mt-12 min-w-max`}
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
                    <h3>Hi, {username}</h3>
                    <h4>Kamu di sini sebagai: {role}</h4>
                </div>
                <div>
                    <Link className="flex justify-center items-center bg-[#2F2F2F] text-[#F4ECE1] w-48 h-16 rounded-[84px] text-xl drop-shadow-2xl " href={"/order"}>
                        Order Now
                    </Link>
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
